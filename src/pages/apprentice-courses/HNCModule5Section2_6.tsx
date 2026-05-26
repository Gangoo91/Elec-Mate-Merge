/**
 * Module 5 · Section 2 · Subsection 6 — Supply Chain Management
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Approved supplier lists, lead time management, logistics coordination and vendor relationships — the engine room of building services delivery.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Supply Chain Management - HNC Module 5 Section 2.6';
const DESCRIPTION =
  'Master supply chain management for building services: approved supplier lists, lead time management, logistics coordination, material scheduling, vendor relationships and just-in-time delivery strategies.';

const quickCheckQuestions = [
  {
    id: 'supply-chain-def',
    question: 'What is supply chain management in the context of building services projects?',
    options: [
      'The coordination of material flow from suppliers to site',
      'Stop work, reassess, and update the method statement',
      'To verify operation of emergency lighting for a short period',
      'There is no documented evidence of the agreed price',
    ],
    correctIndex: 0,
    explanation:
      'Supply chain management coordinates the entire flow of materials, information and services from suppliers through to installation on site, ensuring the right materials arrive at the right time.',
  },
  {
    id: 'approved-supplier',
    question: 'Why do main contractors maintain approved supplier lists?',
    options: [
      'Increased loss around 1383nm due to hydroxyl ions',
      'To ensure quality, reliability and compliance standards',
      'Design stage BRUKL output and energy model report',
      'Safe working and circuit identification',
    ],
    correctIndex: 1,
    explanation:
      'Approved supplier lists ensure that all vendors meet required quality standards, have appropriate insurances, comply with health and safety requirements, and have demonstrated reliable delivery performance.',
  },
  {
    id: 'lead-time',
    question: "What does 'lead time' mean in procurement?",
    options: [
      'Using a voltage indicator or socket tester',
      'Equal load on each phase with equal phase angles',
      'Traditional with specialist subcontracts',
      'The time between placing an order and receiving delivery',
    ],
    correctIndex: 3,
    explanation:
      'Lead time is the duration between placing a purchase order and the materials arriving on site. Understanding lead times is critical for programming work and avoiding delays.',
  },
  {
    id: 'jit-delivery',
    question: 'What is the primary benefit of just-in-time (JIT) delivery?',
    options: [
      'Reducing heating/cooling setpoints during unoccupied periods',
      'Ensure circuit is isolated and discharged',
      'By analysing high-frequency characteristics of the arc signature',
      'Reduced site storage requirements and working capital',
    ],
    correctIndex: 3,
    explanation:
      'Just-in-time delivery reduces the need for on-site storage, minimises working capital tied up in stock, reduces risk of damage or theft, and improves cash flow by delaying payment until materials are needed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which factor is NOT typically assessed when evaluating a potential supplier for an approved list?',
    options: [
      'Product quality and compliance certifications',
      "The supplier's company logo design",
      'Financial stability and credit rating',
      'Delivery reliability and lead times',
    ],
    correctAnswer: 1,
    explanation:
      'Supplier evaluation focuses on quality, compliance, financial stability, delivery performance, health and safety record, and pricing competitiveness. Visual branding is not relevant to supplier capability.',
  },
  {
    id: 2,
    question:
      'A distribution board has an 8-week lead time. The installation is programmed for week 20. When should the order be placed at the latest?',
    options: [
      'Week 28',
      'Week 8',
      'Week 12',
      'Week 20',
    ],
    correctAnswer: 2,
    explanation:
      'Order must be placed by Week 12 to allow the 8-week lead time for delivery by Week 20. In practice, orders should be placed earlier to allow for potential delays.',
  },
  {
    id: 3,
    question: "What is a 'call-off schedule' in material procurement?",
    options: [
      'Pre-agreed terms, pricing and streamlined ordering',
      'Manufacturing and engineering time required',
      'Supply disruption if the sole supplier fails',
      'A planned series of deliveries from a framework agreement',
    ],
    correctAnswer: 3,
    explanation:
      'A call-off schedule specifies the planned delivery dates and quantities for materials ordered under a framework agreement, allowing staged deliveries to match project progress.',
  },
  {
    id: 4,
    question: 'Which document formally commits a supplier to provide materials at agreed terms?',
    options: [
      'Purchase order',
      'Delivery note',
      'Request for quotation (RFQ)',
      'Bill of quantities',
    ],
    correctAnswer: 0,
    explanation:
      'A purchase order is the formal contract document that commits both parties - the supplier to provide the specified materials and the buyer to pay the agreed price.',
  },
  {
    id: 5,
    question: 'What is the purpose of goods-inward inspection on site?',
    options: [
      'Pre-agreed terms, pricing and streamlined ordering',
      'To verify quantities, quality and condition against the order',
      'Supply disruption if the sole supplier fails',
      'A planned series of deliveries from a framework agreement',
    ],
    correctAnswer: 1,
    explanation:
      'Goods-inward inspection checks that delivered materials match the purchase order in type, quantity and specification, and that items are undamaged. Any discrepancies must be recorded immediately.',
  },
  {
    id: 6,
    question: 'A Key Performance Indicator (KPI) for supplier performance might include:',
    options: [
      "The supplier's head office location",
      'The number of employees',
      'On-time delivery percentage',
      "The supplier's founding date",
    ],
    correctAnswer: 2,
    explanation:
      'Supplier KPIs typically measure on-time delivery rate, order accuracy, quality defect rate, response time to queries, and pricing competitiveness against market benchmarks.',
  },
  {
    id: 7,
    question: 'What risk does single-source procurement present?',
    options: [
      'A planned series of deliveries from a framework agreement',
      'Manufacturing and engineering time required',
      'Review specifications and prepare material schedules',
      'Supply disruption if the sole supplier fails',
    ],
    correctAnswer: 3,
    explanation:
      'Relying on a single supplier creates vulnerability to supply disruption if that supplier experiences production problems, financial difficulties, or logistical issues. Dual-sourcing mitigates this risk.',
  },
  {
    id: 8,
    question:
      'What is the typical first step in the procurement process for a building services project?',
    options: [
      'Review specifications and prepare material schedules',
      'A planned series of deliveries from a framework agreement',
      'To verify quantities, quality and condition against the order',
      'Supply disruption if the sole supplier fails',
    ],
    correctAnswer: 0,
    explanation:
      'The procurement process starts with reviewing project specifications and preparing detailed material schedules showing what is needed, quantities required, and when items are needed on site.',
  },
  {
    id: 9,
    question: 'Framework agreements with suppliers provide which advantage?',
    options: [
      'Review specifications and prepare material schedules',
      'Pre-agreed terms, pricing and streamlined ordering',
      'To verify quantities, quality and condition against the order',
      'Manufacturing and engineering time required',
    ],
    correctAnswer: 1,
    explanation:
      'Framework agreements establish pre-negotiated terms, pricing structures and procedures, allowing faster ordering without re-tendering each purchase while maintaining competitive rates.',
  },
  {
    id: 10,
    question: 'Which factor most affects lead time for bespoke or customised equipment?',
    options: [
      'Supply disruption if the sole supplier fails',
      'Pre-agreed terms, pricing and streamlined ordering',
      'Manufacturing and engineering time required',
      'A delivery note listing contents',
    ],
    correctAnswer: 2,
    explanation:
      'Bespoke equipment requires design, engineering approval, manufacturing and testing before dispatch. This manufacturing time significantly extends lead times compared to standard catalogue items.',
  },
  {
    id: 11,
    question: 'What document should accompany every delivery to site?',
    options: [
      'There is no specified minimum',
      '"EICR_2024_Thompson_42-High-Street.pdf"',
      'Can affect accuracy and safety',
      'A delivery note listing contents',
    ],
    correctAnswer: 3,
    explanation:
      'Every delivery should include a delivery note (also called a packing slip) listing all items in the consignment, allowing site staff to check the delivery against the order and record any discrepancies.',
  },
  {
    id: 12,
    question: 'OTIF stands for:',
    options: [
      'On Time In Full',
      'Outstanding Trade Invoice File',
      'Overdue Transport Issue Flag',
      'Order Transfer Information Form',
    ],
    correctAnswer: 0,
    explanation:
      'OTIF (On Time In Full) is a key supply chain metric measuring the percentage of orders delivered complete (correct items and quantities) by the agreed delivery date.',
  },
];

const faqs = [
  {
    question: 'How do I get a supplier added to the approved list?',
    answer:
      'Submit a supplier approval request to your procurement or quality department. The supplier will need to complete a pre-qualification questionnaire covering insurance, quality certifications, health and safety policies, financial standing and references. Site visits may be conducted for major suppliers. Approval typically takes 2-4 weeks.',
  },
  {
    question: 'What should I do if materials arrive damaged or incorrect?',
    answer:
      "Record the discrepancy on the delivery note immediately and take photographs. Do not sign for goods as 'received in good condition' if they are not. Notify the supplier and your procurement team the same day. Retain damaged goods for inspection if the supplier requests. Follow up in writing to ensure replacement or credit is arranged.",
  },
  {
    question: 'How can I reduce lead times for critical equipment?',
    answer:
      'Early engagement with suppliers during the design phase helps identify long-lead items. Place orders as early as possible once specifications are confirmed. Consider specifying standard catalogue items rather than bespoke products where appropriate. Build relationships with suppliers so they prioritise your orders. Maintain buffer stock of critical consumables.',
  },
  {
    question: 'What is the difference between a quotation and a purchase order?',
    answer:
      "A quotation is the supplier's offer to provide goods at stated prices and terms - it is not binding until accepted. A purchase order is your formal acceptance of that offer and creates a binding contract. The purchase order should reference the quotation number and confirm all agreed terms.",
  },
  {
    question: 'How should materials be stored on site awaiting installation?',
    answer:
      "Store materials in designated secure areas, protected from weather, theft and damage. Keep items off the ground on pallets or racking. Maintain organisation so materials can be located easily. Rotate stock (first in, first out) to prevent degradation. Check manufacturer's storage requirements for sensitive items like electronics or sealants.",
  },
  {
    question: 'What records should be kept for supply chain traceability?',
    answer:
      "Retain copies of purchase orders, delivery notes, goods received notes, quality inspection records, test certificates, manufacturer's declarations of conformity, and payment records. These provide traceability for warranty claims, compliance verification and audit purposes. Digital records should be backed up regularly.",
  },
];

const HNCModule5Section2_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 6"
            title="Supply Chain Management"
            description="Approved supplier lists, lead time management, logistics coordination and vendor relationships for building services projects."
            tone="purple"
          />

          <TLDR
            points={[
              "Approved supplier lists (ASL) protect quality and speed — vetted manufacturers, distributors and specialist installers ready to mobilise.",
              "Lead times for MEP equipment have lengthened post-2020 — switchgear 26–52 weeks, AHUs 16–32 weeks, transformers 40+ weeks. Plan accordingly.",
              "Logistics coordination on tight sites needs delivery slots, lay-down management, and just-in-time delivery — overstock kills sites.",
              "Vendor relationships built on prompt payment, fair dealings and partnership produce better lead-times, better pricing and better problem-solving.",
              "Single-sourcing is risk; dual-sourcing critical components is resilience.",
            ]}
          />

          <RegsCallout
            source="ISO 9001:2015 — Clause 8.4 (Control of externally provided processes, products and services)"
            clause="The organization shall ensure that externally provided processes, products and services conform to requirements. The organization shall determine the controls to be applied to externally provided processes, products and services when the externally provided processes, products and services are intended for incorporation into the organization’s own products and services."
            meaning={
              <>
                ISO 9001 requires you to control your supply chain to the same standard as your own work. Approved supplier lists, supplier audits, goods-in inspection and non-conformance reporting are the practical mechanisms. A QMS-aligned supply chain reduces defects, accelerates delivery and supports earned-value reporting.
              </>
            }
            cite="Source: ISO 9001:2015 — Quality management systems (refer to BSI published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Understand supply chain principles in building services',
              'Manage approved supplier lists and vendor relationships',
              'Calculate and track material lead times effectively',
              'Coordinate logistics and delivery schedules',
              'Apply just-in-time delivery strategies',
              'Monitor supplier performance using KPIs',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Supply Chain Fundamentals">
            <p>
              Effective supply chain management is essential for delivering building services
              projects on time and within budget. It encompasses the entire process from identifying
              material requirements through to delivery, storage and issue for installation.
            </p>
            <p>
              <strong>Key supply chain activities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specification review:</strong> Understanding what materials are required
              </li>
              <li>
                <strong>Supplier selection:</strong> Choosing appropriate vendors
              </li>
              <li>
                <strong>Procurement:</strong> Ordering and contract administration
              </li>
              <li>
                <strong>Logistics:</strong> Transport and delivery coordination
              </li>
              <li>
                <strong>Storage:</strong> Secure holding of materials on site
              </li>
              <li>
                <strong>Issue:</strong> Releasing materials for installation
              </li>
            </ul>
            <p>
              <strong>Supply Chain Flow for Building Services (Stage — Activities — Key Documents):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Requirements:</strong> Review specifications, prepare material schedules —
                Bill of quantities, specifications
              </li>
              <li>
                <strong>Sourcing:</strong> Identify suppliers, request quotations — RFQ, supplier
                database
              </li>
              <li>
                <strong>Selection:</strong> Evaluate quotes, negotiate terms — Quotation
                comparisons, tender reports
              </li>
              <li>
                <strong>Ordering:</strong> Issue purchase orders, confirm delivery — Purchase
                orders, acknowledgements
              </li>
              <li>
                <strong>Receiving:</strong> Check deliveries, inspect quality — Delivery notes, GRN
              </li>
              <li>
                <strong>Payment:</strong> Match invoices, authorise payment — Invoices, payment
                certificates
              </li>
            </ul>
            <p>
              <strong>Project impact:</strong> Poor supply chain management is a leading cause of
              project delays, with material shortages and late deliveries disrupting work sequences
              and increasing costs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Approved Supplier Management">
            <p>
              Approved supplier lists (ASLs) ensure that all vendors used on projects meet minimum
              standards for quality, reliability, health and safety, and financial stability.
              Working with approved suppliers reduces risk and streamlines procurement.
            </p>
            <p>
              <strong>Supplier Evaluation Criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Quality management system (ISO 9001)</li>
              <li>Product compliance certifications</li>
              <li>Health and safety record</li>
              <li>Environmental management</li>
              <li>Financial stability</li>
              <li>Insurance coverage</li>
              <li>Delivery performance history</li>
            </ul>
            <p>
              <strong>Vendor Relationship Benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Preferential pricing through volume</li>
              <li>Priority allocation during shortages</li>
              <li>Technical support and training</li>
              <li>Extended credit terms</li>
              <li>Faster response to urgent orders</li>
              <li>Early warning of price changes</li>
              <li>New product information</li>
            </ul>
            <p>
              <strong>Supplier Performance Metrics (KPIs) — (KPI — Measure — Target):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>On-time delivery (OTD):</strong> % delivered by agreed date — &gt;95%
              </li>
              <li>
                <strong>Order accuracy:</strong> % orders correct first time — &gt;98%
              </li>
              <li>
                <strong>Quality defect rate:</strong> Defects per 1000 items — &lt;5
              </li>
              <li>
                <strong>OTIF (On Time In Full):</strong> % complete and on time — &gt;90%
              </li>
              <li>
                <strong>Query response time:</strong> Hours to respond — &lt;4 hours
              </li>
            </ul>
            <p>
              <strong>Single Source Risk:</strong> Relying on a single supplier for critical items
              creates vulnerability. If that supplier experiences problems, your project stops. Best
              practice is to maintain at least two approved sources for essential materials, even if
              one supplier receives the majority of orders.
            </p>
            <p>
              <strong>Review cycle:</strong> Supplier performance should be formally reviewed
              quarterly, with annual re-approval assessments to maintain approved status.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Lead Time Management">
            <p>
              Lead time is the duration between placing an order and receiving delivery. Accurate
              lead time management is critical for construction programming, ensuring materials
              arrive before they are needed without arriving so early that storage becomes
              problematic.
            </p>
            <p>
              <strong>Typical Lead Times for Electrical Materials (Item — Standard Stock — Non-Stock/Special):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard cable (SWA, XLPE):</strong> 3-5 days — 4-8 weeks
              </li>
              <li>
                <strong>Containment (tray, trunking):</strong> 1-2 weeks — 3-6 weeks
              </li>
              <li>
                <strong>Distribution boards:</strong> 2-4 weeks — 6-12 weeks
              </li>
              <li>
                <strong>Main LV switchgear:</strong> 6-10 weeks — 12-20 weeks
              </li>
              <li>
                <strong>Transformers:</strong> 8-12 weeks — 16-26 weeks
              </li>
              <li>
                <strong>Generator sets:</strong> 10-14 weeks — 20-30 weeks
              </li>
              <li>
                <strong>Lighting (standard fittings):</strong> 1-2 weeks — 4-8 weeks
              </li>
              <li>
                <strong>Fire alarm panels:</strong> 2-4 weeks — 6-10 weeks
              </li>
            </ul>
            <p>
              <strong>Lead Time Calculation:</strong> Order Date = Required Date - Lead Time -
              Buffer. Buffer allows for delivery delays, typically 1-2 weeks for critical items.
            </p>
            <p>
              <strong>Factors Affecting Lead Time:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supplier stock availability</li>
              <li>Manufacturing backlog</li>
              <li>Technical approval requirements</li>
              <li>International shipping times</li>
              <li>Customs clearance</li>
              <li>Site access restrictions</li>
            </ul>
            <p>
              <strong>Reducing Lead Time Impact:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Early design freeze on long-lead items</li>
              <li>Pre-ordering against anticipated needs</li>
              <li>Specifying standard products</li>
              <li>Framework agreements for call-off</li>
              <li>Buffer stock for critical consumables</li>
              <li>Alternative supplier identification</li>
            </ul>
            <p>
              <strong>Programme integration:</strong> Lead times must be built into the project
              programme, with order dates appearing as milestones linked to installation activities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Logistics and Material Scheduling">
            <p>
              Logistics coordination ensures materials arrive at the right place, at the right time,
              in the right condition. This includes delivery scheduling, site access arrangements,
              unloading equipment, and secure storage until installation.
            </p>
            <p>
              <strong>Just-In-Time (JIT) Delivery Principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reduced Storage:</strong> Materials arrive only when needed, minimising
                on-site storage requirements and associated costs
              </li>
              <li>
                <strong>Improved Cash Flow:</strong> Payment delayed until delivery, reducing
                working capital tied up in stock
              </li>
              <li>
                <strong>Lower Risk:</strong> Less material on site means reduced exposure to theft,
                damage and deterioration
              </li>
            </ul>
            <p>
              <strong>Material Call-Off Schedule Example (Week — Zone — Materials — Quantity):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Week 12:</strong> Ground floor — Cable tray, SWA cable — 500m tray, 2000m
                cable
              </li>
              <li>
                <strong>Week 14:</strong> Ground floor — Distribution boards, MCCBs — 4 No. DBs, 24
                No. MCCBs
              </li>
              <li>
                <strong>Week 16:</strong> First floor — Cable tray, conduit, cable — 400m tray,
                1500m conduit
              </li>
              <li>
                <strong>Week 18:</strong> Ground floor — Light fittings, controls — 180 No. fittings
              </li>
              <li>
                <strong>Week 20:</strong> Plant room — Main switchboard — 1 No. MSB
              </li>
            </ul>
            <p>
              <strong>Delivery Coordination Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Access:</strong> Confirm site access route, gate codes, delivery windows
              </li>
              <li>
                <strong>Unloading:</strong> Arrange forklift, telehandler or crane if required
              </li>
              <li>
                <strong>Personnel:</strong> Ensure someone is available to receive and check
                delivery
              </li>
              <li>
                <strong>Storage:</strong> Prepare designated secure storage area
              </li>
              <li>
                <strong>Documentation:</strong> Have purchase order available for checking
              </li>
              <li>
                <strong>Recording:</strong> Complete goods received note (GRN) for all deliveries
              </li>
            </ul>
            <p>
              <strong>Goods Received Note (GRN) Contents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Date and time of delivery</li>
              <li>Supplier name and delivery note number</li>
              <li>Purchase order reference</li>
              <li>Description and quantity of items</li>
              <li>Condition assessment</li>
              <li>Any discrepancies or damage</li>
              <li>Signature of person receiving</li>
              <li>Storage location allocated</li>
            </ul>
            <p>
              <strong>Site coordination:</strong> On busy construction sites, delivery slots must be
              booked through the main contractor's logistics coordinator to avoid congestion and
              ensure unloading equipment is available.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Lead Time Programming:</strong> The main switchboard installation
              is programmed for Week 24. Lead time is 12 weeks. When must the order be placed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required delivery: Week 24</li>
              <li>Lead time: 12 weeks</li>
              <li>Buffer for delays: 2 weeks</li>
              <li>
                Order date = 24 - 12 - 2 = <strong>Week 10</strong>
              </li>
              <li>
                <strong>Order must be placed by Week 10 at the latest.</strong> Design approval and
                technical submittals may need to be complete earlier.
              </li>
            </ul>
            <p>
              <strong>Example 2 — Supplier Performance Assessment:</strong> A supplier made 50
              deliveries last quarter. 45 were on time and complete. 3 were late, 2 had quantity
              errors. Calculate OTIF performance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total deliveries: 50</li>
              <li>On time and in full: 45</li>
              <li>
                OTIF = (45 ÷ 50) × 100 = <strong>90%</strong>
              </li>
              <li>
                <strong>Meets 90% target (just).</strong> Late deliveries and errors should be
                investigated.
              </li>
            </ul>
            <p>
              <strong>Example 3 — Call-Off Schedule Planning:</strong> A project requires 5000m of
              cable over 10 weeks. Storage is limited. Plan a call-off schedule.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total requirement: 5000m</li>
              <li>Installation rate: 500m per week</li>
              <li>Storage capacity: 1000m maximum</li>
              <li>Week 1: 1000m (covers weeks 1-2)</li>
              <li>Week 3: 1000m (covers weeks 3-4)</li>
              <li>Week 5: 1000m (covers weeks 5-6)</li>
              <li>Week 7: 1000m (covers weeks 7-8)</li>
              <li>Week 9: 1000m (covers weeks 9-10)</li>
              <li>
                <strong>5 deliveries, never exceeding storage capacity.</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Procurement process checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review specifications and prepare material schedules</li>
              <li>Identify long-lead items requiring early ordering</li>
              <li>Select suppliers from approved list</li>
              <li>Issue requests for quotation with clear specifications</li>
              <li>Evaluate quotations on price, delivery and terms</li>
              <li>Issue purchase orders with delivery dates</li>
              <li>Track orders and confirm delivery arrangements</li>
              <li>Receive, inspect and record all deliveries</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Main switchgear lead time: <strong>12-20 weeks</strong>
              </li>
              <li>
                Standard cable from stock: <strong>3-5 days</strong>
              </li>
              <li>
                OTIF target: <strong>&gt;90%</strong>
              </li>
              <li>
                Delivery buffer allowance: <strong>1-2 weeks</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Late ordering:</strong> Underestimating lead times causes project delays
                </li>
                <li>
                  <strong>Poor specification:</strong> Vague orders lead to incorrect deliveries
                </li>
                <li>
                  <strong>No backup supplier:</strong> Single source creates vulnerability
                </li>
                <li>
                  <strong>Skipping inspection:</strong> Accepting damaged goods without recording
                </li>
                <li>
                  <strong>Inadequate storage:</strong> Materials damaged before installation
                </li>
              </ul>
            }
            doInstead="Identify long-lead items at programme outset and place orders with buffer, write tightly specified purchase orders, maintain at least two approved sources for critical items, inspect every delivery against the order, and prepare designated weather-protected storage areas before deliveries arrive."
          />

          <SectionRule />

          <Scenario
            title="Switchgear lead-time discovered too late"
            situation={
              <>
                A residential development's LV switchgear is specified at tender as a particular manufacturer with a stated 18-week lead time. At order placement (week 10), the manufacturer quotes 40 weeks — global silicon shortages have extended their build programme. The programme need-by date is week 28. The replacement equivalent manufacturer quotes 22 weeks but at 12% premium and with less favourable warranty terms.
              </>
            }
            whatToDo={
              <>
                Issue early warning under the contract. Convene a supply chain meeting with design, QS and client. Three options: pay the premium for the equivalent manufacturer (cost impact, no programme impact), wait for original (22-week programme slip), or request alternative manufacturer with equivalent specification (need design team approval, mid-spectrum cost and time). Document the trade-off transparently; let the client decide. From here on, always validate lead-times at tender stage, not order stage.
              </>
            }
            whyItMatters={
              <>
                Supply chain volatility is the new normal. Lead-time validation at tender, dual-sourcing critical equipment, and early supplier engagement (ECI) are the responses. The project manager who waits until order placement to discover the lead-time has already lost.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Approved supplier list (ASL) is the first line of supply chain quality and resilience.",
              "Lead times post-2020 are extended — switchgear 26–52 wk, AHUs 16–32 wk, transformers 40+ wk.",
              "Validate lead-times at tender stage — not at order placement.",
              "Logistics: delivery slots, lay-down management, JIT delivery — overstock costs site space and damages.",
              "Dual-sourcing critical components is resilience; single-sourcing is risk.",
              "Vendor relationships: prompt payment, fair dealings, partnership beat aggressive negotiation.",
              "Goods-in inspection and NCR procedure ensure ISO 9001 Clause 8.4 compliance.",
              "Supply chain mapping (Tier 1, 2, 3) reveals hidden risks — the smelter that supplies your transformer manufacturer matters.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Tendering process
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cost management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section2_6;
