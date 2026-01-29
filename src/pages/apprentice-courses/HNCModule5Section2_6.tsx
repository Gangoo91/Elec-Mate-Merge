import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Supply Chain Management - HNC Module 5 Section 2.6";
const DESCRIPTION = "Master supply chain management for building services: approved supplier lists, lead time management, logistics coordination, material scheduling, vendor relationships and just-in-time delivery strategies.";

const quickCheckQuestions = [
  {
    id: "supply-chain-def",
    question: "What is supply chain management in the context of building services projects?",
    options: ["Only purchasing materials at the lowest price", "The coordination of material flow from suppliers to site", "Managing the workforce schedule", "Designing electrical systems"],
    correctIndex: 1,
    explanation: "Supply chain management coordinates the entire flow of materials, information and services from suppliers through to installation on site, ensuring the right materials arrive at the right time."
  },
  {
    id: "approved-supplier",
    question: "Why do main contractors maintain approved supplier lists?",
    options: ["To limit competition", "To ensure quality, reliability and compliance standards", "To increase material costs", "To reduce the number of products available"],
    correctIndex: 1,
    explanation: "Approved supplier lists ensure that all vendors meet required quality standards, have appropriate insurances, comply with health and safety requirements, and have demonstrated reliable delivery performance."
  },
  {
    id: "lead-time",
    question: "What does 'lead time' mean in procurement?",
    options: ["The time to install equipment", "The time between placing an order and receiving delivery", "The warranty period", "The design approval time"],
    correctIndex: 1,
    explanation: "Lead time is the duration between placing a purchase order and the materials arriving on site. Understanding lead times is critical for programming work and avoiding delays."
  },
  {
    id: "jit-delivery",
    question: "What is the primary benefit of just-in-time (JIT) delivery?",
    options: ["Lower material quality", "Reduced site storage requirements and working capital", "Longer project duration", "Increased insurance costs"],
    correctIndex: 1,
    explanation: "Just-in-time delivery reduces the need for on-site storage, minimises working capital tied up in stock, reduces risk of damage or theft, and improves cash flow by delaying payment until materials are needed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which factor is NOT typically assessed when evaluating a potential supplier for an approved list?",
    options: [
      "Product quality and compliance certifications",
      "Financial stability and credit rating",
      "The supplier's company logo design",
      "Delivery reliability and lead times"
    ],
    correctAnswer: 2,
    explanation: "Supplier evaluation focuses on quality, compliance, financial stability, delivery performance, health and safety record, and pricing competitiveness. Visual branding is not relevant to supplier capability."
  },
  {
    id: 2,
    question: "A distribution board has an 8-week lead time. The installation is programmed for week 20. When should the order be placed at the latest?",
    options: ["Week 12", "Week 20", "Week 28", "Week 8"],
    correctAnswer: 0,
    explanation: "Order must be placed by Week 12 to allow the 8-week lead time for delivery by Week 20. In practice, orders should be placed earlier to allow for potential delays."
  },
  {
    id: 3,
    question: "What is a 'call-off schedule' in material procurement?",
    options: [
      "A list of cancelled orders",
      "A planned series of deliveries from a framework agreement",
      "A record of returned materials",
      "A telephone directory of suppliers"
    ],
    correctAnswer: 1,
    explanation: "A call-off schedule specifies the planned delivery dates and quantities for materials ordered under a framework agreement, allowing staged deliveries to match project progress."
  },
  {
    id: 4,
    question: "Which document formally commits a supplier to provide materials at agreed terms?",
    options: [
      "Request for quotation (RFQ)",
      "Delivery note",
      "Purchase order",
      "Bill of quantities"
    ],
    correctAnswer: 2,
    explanation: "A purchase order is the formal contract document that commits both parties - the supplier to provide the specified materials and the buyer to pay the agreed price."
  },
  {
    id: 5,
    question: "What is the purpose of goods-inward inspection on site?",
    options: [
      "To delay the project",
      "To verify quantities, quality and condition against the order",
      "To increase storage costs",
      "To return all deliveries"
    ],
    correctAnswer: 1,
    explanation: "Goods-inward inspection checks that delivered materials match the purchase order in type, quantity and specification, and that items are undamaged. Any discrepancies must be recorded immediately."
  },
  {
    id: 6,
    question: "A Key Performance Indicator (KPI) for supplier performance might include:",
    options: [
      "The supplier's head office location",
      "On-time delivery percentage",
      "The number of employees",
      "The supplier's founding date"
    ],
    correctAnswer: 1,
    explanation: "Supplier KPIs typically measure on-time delivery rate, order accuracy, quality defect rate, response time to queries, and pricing competitiveness against market benchmarks."
  },
  {
    id: 7,
    question: "What risk does single-source procurement present?",
    options: [
      "Too many delivery options",
      "Supply disruption if the sole supplier fails",
      "Lower material costs",
      "Simplified administration"
    ],
    correctAnswer: 1,
    explanation: "Relying on a single supplier creates vulnerability to supply disruption if that supplier experiences production problems, financial difficulties, or logistical issues. Dual-sourcing mitigates this risk."
  },
  {
    id: 8,
    question: "What is the typical first step in the procurement process for a building services project?",
    options: [
      "Issue purchase orders immediately",
      "Review specifications and prepare material schedules",
      "Arrange deliveries",
      "Pay supplier invoices"
    ],
    correctAnswer: 1,
    explanation: "The procurement process starts with reviewing project specifications and preparing detailed material schedules showing what is needed, quantities required, and when items are needed on site."
  },
  {
    id: 9,
    question: "Framework agreements with suppliers provide which advantage?",
    options: [
      "Guaranteed lowest price on every item",
      "Pre-agreed terms, pricing and streamlined ordering",
      "Unlimited credit facilities",
      "Free delivery on all orders"
    ],
    correctAnswer: 1,
    explanation: "Framework agreements establish pre-negotiated terms, pricing structures and procedures, allowing faster ordering without re-tendering each purchase while maintaining competitive rates."
  },
  {
    id: 10,
    question: "Which factor most affects lead time for bespoke or customised equipment?",
    options: [
      "Standard product availability",
      "Manufacturing and engineering time required",
      "Distance from supplier warehouse",
      "Size of the order value"
    ],
    correctAnswer: 1,
    explanation: "Bespoke equipment requires design, engineering approval, manufacturing and testing before dispatch. This manufacturing time significantly extends lead times compared to standard catalogue items."
  },
  {
    id: 11,
    question: "What document should accompany every delivery to site?",
    options: [
      "A purchase order",
      "A delivery note listing contents",
      "An invoice for immediate payment",
      "A product catalogue"
    ],
    correctAnswer: 1,
    explanation: "Every delivery should include a delivery note (also called a packing slip) listing all items in the consignment, allowing site staff to check the delivery against the order and record any discrepancies."
  },
  {
    id: 12,
    question: "OTIF stands for:",
    options: [
      "On Time In Full",
      "Order Transfer Information Form",
      "Overdue Transport Issue Flag",
      "Outstanding Trade Invoice File"
    ],
    correctAnswer: 0,
    explanation: "OTIF (On Time In Full) is a key supply chain metric measuring the percentage of orders delivered complete (correct items and quantities) by the agreed delivery date."
  }
];

const faqs = [
  {
    question: "How do I get a supplier added to the approved list?",
    answer: "Submit a supplier approval request to your procurement or quality department. The supplier will need to complete a pre-qualification questionnaire covering insurance, quality certifications, health and safety policies, financial standing and references. Site visits may be conducted for major suppliers. Approval typically takes 2-4 weeks."
  },
  {
    question: "What should I do if materials arrive damaged or incorrect?",
    answer: "Record the discrepancy on the delivery note immediately and take photographs. Do not sign for goods as 'received in good condition' if they are not. Notify the supplier and your procurement team the same day. Retain damaged goods for inspection if the supplier requests. Follow up in writing to ensure replacement or credit is arranged."
  },
  {
    question: "How can I reduce lead times for critical equipment?",
    answer: "Early engagement with suppliers during the design phase helps identify long-lead items. Place orders as early as possible once specifications are confirmed. Consider specifying standard catalogue items rather than bespoke products where appropriate. Build relationships with suppliers so they prioritise your orders. Maintain buffer stock of critical consumables."
  },
  {
    question: "What is the difference between a quotation and a purchase order?",
    answer: "A quotation is the supplier's offer to provide goods at stated prices and terms - it is not binding until accepted. A purchase order is your formal acceptance of that offer and creates a binding contract. The purchase order should reference the quotation number and confirm all agreed terms."
  },
  {
    question: "How should materials be stored on site awaiting installation?",
    answer: "Store materials in designated secure areas, protected from weather, theft and damage. Keep items off the ground on pallets or racking. Maintain organisation so materials can be located easily. Rotate stock (first in, first out) to prevent degradation. Check manufacturer's storage requirements for sensitive items like electronics or sealants."
  },
  {
    question: "What records should be kept for supply chain traceability?",
    answer: "Retain copies of purchase orders, delivery notes, goods received notes, quality inspection records, test certificates, manufacturer's declarations of conformity, and payment records. These provide traceability for warranty claims, compliance verification and audit purposes. Digital records should be backed up regularly."
  }
];

const HNCModule5Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Supply Chain Management
          </h1>
          <p className="text-white/80">
            Approved supplier lists, lead time management, logistics coordination and vendor relationships for building services projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Supply chain:</strong> Material flow from supplier to site</li>
              <li className="pl-1"><strong>Approved suppliers:</strong> Pre-vetted for quality and reliability</li>
              <li className="pl-1"><strong>Lead time:</strong> Order placement to delivery duration</li>
              <li className="pl-1"><strong>JIT delivery:</strong> Materials arrive when needed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Switchgear:</strong> 6-12 week typical lead time</li>
              <li className="pl-1"><strong>Cable:</strong> Standard 3-5 days, specials 4-8 weeks</li>
              <li className="pl-1"><strong>Containment:</strong> Standard 1-2 weeks from stock</li>
              <li className="pl-1"><strong>Bespoke panels:</strong> 10-16 weeks including design</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand supply chain principles in building services",
              "Manage approved supplier lists and vendor relationships",
              "Calculate and track material lead times effectively",
              "Coordinate logistics and delivery schedules",
              "Apply just-in-time delivery strategies",
              "Monitor supplier performance using KPIs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Supply Chain Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Supply Chain Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective supply chain management is essential for delivering building services projects on time
              and within budget. It encompasses the entire process from identifying material requirements through
              to delivery, storage and issue for installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key supply chain activities:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Specification review:</strong> Understanding what materials are required</li>
                <li className="pl-1"><strong>Supplier selection:</strong> Choosing appropriate vendors</li>
                <li className="pl-1"><strong>Procurement:</strong> Ordering and contract administration</li>
                <li className="pl-1"><strong>Logistics:</strong> Transport and delivery coordination</li>
                <li className="pl-1"><strong>Storage:</strong> Secure holding of materials on site</li>
                <li className="pl-1"><strong>Issue:</strong> Releasing materials for installation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supply Chain Flow for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Requirements</td>
                      <td className="border border-white/10 px-3 py-2">Review specifications, prepare material schedules</td>
                      <td className="border border-white/10 px-3 py-2">Bill of quantities, specifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sourcing</td>
                      <td className="border border-white/10 px-3 py-2">Identify suppliers, request quotations</td>
                      <td className="border border-white/10 px-3 py-2">RFQ, supplier database</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Selection</td>
                      <td className="border border-white/10 px-3 py-2">Evaluate quotes, negotiate terms</td>
                      <td className="border border-white/10 px-3 py-2">Quotation comparisons, tender reports</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ordering</td>
                      <td className="border border-white/10 px-3 py-2">Issue purchase orders, confirm delivery</td>
                      <td className="border border-white/10 px-3 py-2">Purchase orders, acknowledgements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Receiving</td>
                      <td className="border border-white/10 px-3 py-2">Check deliveries, inspect quality</td>
                      <td className="border border-white/10 px-3 py-2">Delivery notes, GRN</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Payment</td>
                      <td className="border border-white/10 px-3 py-2">Match invoices, authorise payment</td>
                      <td className="border border-white/10 px-3 py-2">Invoices, payment certificates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Project impact:</strong> Poor supply chain management is a leading cause of project delays, with material shortages and late deliveries disrupting work sequences and increasing costs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Approved Supplier Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Approved Supplier Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Approved supplier lists (ASLs) ensure that all vendors used on projects meet minimum standards
              for quality, reliability, health and safety, and financial stability. Working with approved
              suppliers reduces risk and streamlines procurement.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supplier Evaluation Criteria</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Quality management system (ISO 9001)</li>
                  <li className="pl-1">Product compliance certifications</li>
                  <li className="pl-1">Health and safety record</li>
                  <li className="pl-1">Environmental management</li>
                  <li className="pl-1">Financial stability</li>
                  <li className="pl-1">Insurance coverage</li>
                  <li className="pl-1">Delivery performance history</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vendor Relationship Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Preferential pricing through volume</li>
                  <li className="pl-1">Priority allocation during shortages</li>
                  <li className="pl-1">Technical support and training</li>
                  <li className="pl-1">Extended credit terms</li>
                  <li className="pl-1">Faster response to urgent orders</li>
                  <li className="pl-1">Early warning of price changes</li>
                  <li className="pl-1">New product information</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supplier Performance Metrics (KPIs)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">KPI</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">On-time delivery (OTD)</td>
                      <td className="border border-white/10 px-3 py-2">% delivered by agreed date</td>
                      <td className="border border-white/10 px-3 py-2">&gt;95%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Order accuracy</td>
                      <td className="border border-white/10 px-3 py-2">% orders correct first time</td>
                      <td className="border border-white/10 px-3 py-2">&gt;98%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quality defect rate</td>
                      <td className="border border-white/10 px-3 py-2">Defects per 1000 items</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">OTIF (On Time In Full)</td>
                      <td className="border border-white/10 px-3 py-2">% complete and on time</td>
                      <td className="border border-white/10 px-3 py-2">&gt;90%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Query response time</td>
                      <td className="border border-white/10 px-3 py-2">Hours to respond</td>
                      <td className="border border-white/10 px-3 py-2">&lt;4 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Single Source Risk</p>
              <p className="text-sm text-white">
                Relying on a single supplier for critical items creates vulnerability. If that supplier
                experiences problems, your project stops. Best practice is to maintain at least two
                approved sources for essential materials, even if one supplier receives the majority of orders.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Review cycle:</strong> Supplier performance should be formally reviewed quarterly, with annual re-approval assessments to maintain approved status.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Lead Time Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Lead Time Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lead time is the duration between placing an order and receiving delivery. Accurate lead time
              management is critical for construction programming, ensuring materials arrive before they are
              needed without arriving so early that storage becomes problematic.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Lead Times for Electrical Materials</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard Stock</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Non-Stock/Special</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard cable (SWA, XLPE)</td>
                      <td className="border border-white/10 px-3 py-2">3-5 days</td>
                      <td className="border border-white/10 px-3 py-2">4-8 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment (tray, trunking)</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">3-6 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">6-12 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main LV switchgear</td>
                      <td className="border border-white/10 px-3 py-2">6-10 weeks</td>
                      <td className="border border-white/10 px-3 py-2">12-20 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">8-12 weeks</td>
                      <td className="border border-white/10 px-3 py-2">16-26 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generator sets</td>
                      <td className="border border-white/10 px-3 py-2">10-14 weeks</td>
                      <td className="border border-white/10 px-3 py-2">20-30 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting (standard fittings)</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">4-8 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm panels</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">6-10 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lead Time Calculation</p>
              <p className="font-mono text-center text-lg mb-2">Order Date = Required Date - Lead Time - Buffer</p>
              <p className="text-xs text-white/70 text-center">Buffer allows for delivery delays, typically 1-2 weeks for critical items</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Lead Time</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Supplier stock availability</li>
                  <li className="pl-1">Manufacturing backlog</li>
                  <li className="pl-1">Technical approval requirements</li>
                  <li className="pl-1">International shipping times</li>
                  <li className="pl-1">Customs clearance</li>
                  <li className="pl-1">Site access restrictions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reducing Lead Time Impact</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Early design freeze on long-lead items</li>
                  <li className="pl-1">Pre-ordering against anticipated needs</li>
                  <li className="pl-1">Specifying standard products</li>
                  <li className="pl-1">Framework agreements for call-off</li>
                  <li className="pl-1">Buffer stock for critical consumables</li>
                  <li className="pl-1">Alternative supplier identification</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Programme integration:</strong> Lead times must be built into the project programme, with order dates appearing as milestones linked to installation activities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Logistics and Material Scheduling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Logistics and Material Scheduling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Logistics coordination ensures materials arrive at the right place, at the right time, in the right
              condition. This includes delivery scheduling, site access arrangements, unloading equipment, and
              secure storage until installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Just-In-Time (JIT) Delivery Principles</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Reduced Storage</p>
                  <p className="text-xs text-white/80">Materials arrive only when needed, minimising on-site storage requirements and associated costs</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Improved Cash Flow</p>
                  <p className="text-xs text-white/80">Payment delayed until delivery, reducing working capital tied up in stock</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Lower Risk</p>
                  <p className="text-xs text-white/80">Less material on site means reduced exposure to theft, damage and deterioration</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Material Call-Off Schedule Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Week</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Zone/Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Materials</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 12</td>
                      <td className="border border-white/10 px-3 py-2">Ground floor</td>
                      <td className="border border-white/10 px-3 py-2">Cable tray, SWA cable</td>
                      <td className="border border-white/10 px-3 py-2">500m tray, 2000m cable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 14</td>
                      <td className="border border-white/10 px-3 py-2">Ground floor</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards, MCCBs</td>
                      <td className="border border-white/10 px-3 py-2">4 No. DBs, 24 No. MCCBs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 16</td>
                      <td className="border border-white/10 px-3 py-2">First floor</td>
                      <td className="border border-white/10 px-3 py-2">Cable tray, conduit, cable</td>
                      <td className="border border-white/10 px-3 py-2">400m tray, 1500m conduit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 18</td>
                      <td className="border border-white/10 px-3 py-2">Ground floor</td>
                      <td className="border border-white/10 px-3 py-2">Light fittings, controls</td>
                      <td className="border border-white/10 px-3 py-2">180 No. fittings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 20</td>
                      <td className="border border-white/10 px-3 py-2">Plant room</td>
                      <td className="border border-white/10 px-3 py-2">Main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">1 No. MSB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Delivery Coordination Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Access:</strong> Confirm site access route, gate codes, delivery windows</li>
                <li className="pl-1"><strong>Unloading:</strong> Arrange forklift, telehandler or crane if required</li>
                <li className="pl-1"><strong>Personnel:</strong> Ensure someone is available to receive and check delivery</li>
                <li className="pl-1"><strong>Storage:</strong> Prepare designated secure storage area</li>
                <li className="pl-1"><strong>Documentation:</strong> Have purchase order available for checking</li>
                <li className="pl-1"><strong>Recording:</strong> Complete goods received note (GRN) for all deliveries</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Goods Received Note (GRN) Contents</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-white">
                <ul className="space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Date and time of delivery</li>
                  <li className="pl-1">Supplier name and delivery note number</li>
                  <li className="pl-1">Purchase order reference</li>
                  <li className="pl-1">Description and quantity of items</li>
                </ul>
                <ul className="space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Condition assessment</li>
                  <li className="pl-1">Any discrepancies or damage</li>
                  <li className="pl-1">Signature of person receiving</li>
                  <li className="pl-1">Storage location allocated</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site coordination:</strong> On busy construction sites, delivery slots must be booked through the main contractor's logistics coordinator to avoid congestion and ensure unloading equipment is available.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Lead Time Programming</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> The main switchboard installation is programmed for Week 24. Lead time is 12 weeks. When must the order be placed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required delivery: Week 24</p>
                <p>Lead time: 12 weeks</p>
                <p>Buffer for delays: 2 weeks</p>
                <p className="mt-2">Order date = 24 - 12 - 2 = <strong>Week 10</strong></p>
                <p className="mt-2 text-green-400">Order must be placed by Week 10 at the latest</p>
                <p className="text-white/60">Design approval and technical submittals may need to be complete earlier</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Supplier Performance Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A supplier made 50 deliveries last quarter. 45 were on time and complete. 3 were late, 2 had quantity errors. Calculate OTIF performance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total deliveries: 50</p>
                <p>On time and in full: 45</p>
                <p className="mt-2">OTIF = (45 ÷ 50) × 100 = <strong>90%</strong></p>
                <p className="mt-2 text-green-400">Meets 90% target (just)</p>
                <p className="text-white/60">Late deliveries and errors should be investigated</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Call-Off Schedule Planning</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A project requires 5000m of cable over 10 weeks. Storage is limited. Plan a call-off schedule.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total requirement: 5000m</p>
                <p>Installation rate: 500m per week</p>
                <p>Storage capacity: 1000m maximum</p>
                <p className="mt-2">Call-off schedule:</p>
                <p>Week 1: 1000m (covers weeks 1-2)</p>
                <p>Week 3: 1000m (covers weeks 3-4)</p>
                <p>Week 5: 1000m (covers weeks 5-6)</p>
                <p>Week 7: 1000m (covers weeks 7-8)</p>
                <p>Week 9: 1000m (covers weeks 9-10)</p>
                <p className="mt-2 text-green-400">5 deliveries, never exceeding storage capacity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Procurement Process Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review specifications and prepare material schedules</li>
                <li className="pl-1">Identify long-lead items requiring early ordering</li>
                <li className="pl-1">Select suppliers from approved list</li>
                <li className="pl-1">Issue requests for quotation with clear specifications</li>
                <li className="pl-1">Evaluate quotations on price, delivery and terms</li>
                <li className="pl-1">Issue purchase orders with delivery dates</li>
                <li className="pl-1">Track orders and confirm delivery arrangements</li>
                <li className="pl-1">Receive, inspect and record all deliveries</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Main switchgear lead time: <strong>12-20 weeks</strong></li>
                <li className="pl-1">Standard cable from stock: <strong>3-5 days</strong></li>
                <li className="pl-1">OTIF target: <strong>&gt;90%</strong></li>
                <li className="pl-1">Delivery buffer allowance: <strong>1-2 weeks</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late ordering:</strong> Underestimating lead times causes project delays</li>
                <li className="pl-1"><strong>Poor specification:</strong> Vague orders lead to incorrect deliveries</li>
                <li className="pl-1"><strong>No backup supplier:</strong> Single source creates vulnerability</li>
                <li className="pl-1"><strong>Skipping inspection:</strong> Accepting damaged goods without recording</li>
                <li className="pl-1"><strong>Inadequate storage:</strong> Materials damaged before installation</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Supply Chain Process</p>
                <ul className="space-y-0.5">
                  <li>Requirements - Specifications and schedules</li>
                  <li>Sourcing - RFQs to approved suppliers</li>
                  <li>Selection - Evaluate and negotiate</li>
                  <li>Ordering - Purchase orders with dates</li>
                  <li>Receiving - Check, inspect, record</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lead Time Management</p>
                <ul className="space-y-0.5">
                  <li>Identify long-lead items early</li>
                  <li>Order date = Required - Lead time - Buffer</li>
                  <li>Build into project programme</li>
                  <li>Track and expedite critical orders</li>
                  <li>Have alternative suppliers ready</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section2_6;
