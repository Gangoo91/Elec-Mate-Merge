/**
 * Module 5 · Section 4 · Subsection 3 — Material and Equipment Approval
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Submittal processes, sample approval, mock-ups and specification compliance — the gate that stops non-conforming products being installed.
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

const TITLE = 'Material and Equipment Approval - HNC Module 5 Section 4.3';
const DESCRIPTION =
  'Master material and equipment approval processes for building services: submittal registers, data sheet requirements, sample approval, mock-ups, alternative products, specification compliance, and approved status tracking.';

const quickCheckQuestions = [
  {
    id: 'submittal-register',
    question: 'What is the primary purpose of a submittal register?',
    options: [
      'To log and track approval status of all submitted items',
      'To record the final account value for each subcontractor',
      'To list the site personnel who have completed induction',
      'To schedule the delivery dates for plant and equipment',
    ],
    correctIndex: 0,
    explanation:
      'A submittal register is a comprehensive log that tracks the approval status of all submitted materials, equipment, and documentation throughout the project lifecycle.',
  },
  {
    id: 'data-sheet-content',
    question: 'Technical data sheets must include which essential information?',
    options: [
      'The unit price and trade discount offered by the supplier',
      'The name of the operative who will install the equipment',
      'The delivery vehicle registration and driver details',
      'Performance specifications, compliance standards, and installation requirements',
    ],
    correctIndex: 3,
    explanation:
      'Technical data sheets must include performance specifications, relevant compliance standards (BS/EN), installation requirements, and maintenance information to verify specification compliance.',
  },
  {
    id: 'mock-up-purpose',
    question: 'When is a mock-up typically required on a building services project?',
    options: [
      'When quality standards need visual verification before bulk installation',
      'Whenever any electrical equipment is delivered to site',
      'Only after the installation has been fully commissioned',
      'When the contract value exceeds a fixed monetary threshold',
    ],
    correctIndex: 0,
    explanation:
      'Mock-ups are required when quality standards need visual and functional verification before bulk installation proceeds, particularly for high-value or visible installations such as exposed containment or feature lighting.',
  },
  {
    id: 'alternative-product',
    question: 'What must be demonstrated when proposing an alternative product?',
    options: [
      'That the alternative is cheaper than the specified item',
      'That the original manufacturer has gone out of business',
      'Equal or better performance to the specified item',
      'That the alternative has a shorter delivery lead time',
    ],
    correctIndex: 2,
    explanation:
      'Alternative products must demonstrate equal or better performance compared to the specified item, including compliance with the same standards and meeting all functional requirements.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Who typically has final authority to approve submittals on a building services project?',
    options: [
      'The installing operative on site',
      'The client or their appointed representative (engineer/architect)',
      'The equipment manufacturer or supplier',
      'The wholesaler supplying the materials',
    ],
    correctAnswer: 1,
    explanation:
      'The client or their appointed representative (consulting engineer or architect) typically has final authority for submittal approval, as defined in the contract documents.',
  },
  {
    id: 2,
    question: 'What information should be included on a submittal register?',
    options: [
      'Operative names and their CSCS card numbers',
      'The site induction date for each subcontractor',
      'Submittal number, description, date submitted, and approval status',
      'The final account value agreed with the client',
    ],
    correctAnswer: 2,
    explanation:
      'A submittal register should include submittal number, description, specification reference, date submitted, date required, reviewer, approval status, and any revision history.',
  },
  {
    id: 3,
    question: "What does 'approved as noted' mean on a returned submittal?",
    options: [
      'Rejected and requiring a completely new product',
      'Approved with no conditions and ready to procure as submitted',
      'Held pending receipt of further documentation only',
      'Approved with comments that must be incorporated',
    ],
    correctAnswer: 3,
    explanation:
      "'Approved as noted' means the submittal is acceptable but comments or modifications noted by the reviewer must be incorporated before procurement or installation.",
  },
  {
    id: 4,
    question: 'What is the typical review period for submittals specified in most contracts?',
    options: [
      '7-14 days',
      '1 day',
      '3 months',
      'No time limit',
    ],
    correctAnswer: 0,
    explanation:
      'Most contracts specify a 7-14 day review period for submittals, though this can vary. Contractors should factor this into their procurement programme.',
  },
  {
    id: 5,
    question: 'Why are material samples required before bulk ordering?',
    options: [
      'To allow the supplier to invoice for the order in advance',
      'To verify quality, colour, and finish match specification requirements',
      'To satisfy the site induction record-keeping requirements',
      'To confirm the delivery date can be met by the supplier',
    ],
    correctAnswer: 1,
    explanation:
      'Material samples verify that quality, colour, finish, and other physical characteristics match the specification requirements before committing to bulk orders.',
  },
  {
    id: 6,
    question:
      'A contractor wishes to substitute a specified luminaire. What documentation is typically required?',
    options: [
      'A signed delivery note from the alternative supplier only',
      'A verbal agreement from the site manager confirming the change',
      'Comparative data sheet, photometric data, and evidence of equivalent performance',
      'A revised programme showing the new installation dates only',
    ],
    correctAnswer: 2,
    explanation:
      'Substitution requests require comparative technical data, photometric data for lighting, evidence of equivalent or better performance, and usually a completed substitution request form.',
  },
  {
    id: 7,
    question: 'What is the purpose of maintaining a record of approved submittals?',
    options: [
      'To calculate the final account value owed to the contractor',
      'To track which operatives have installed each item',
      'To record the site induction status of the supply chain',
      'To provide an audit trail and reference for installation verification',
    ],
    correctAnswer: 3,
    explanation:
      'Approved submittal records provide an audit trail for quality assurance, reference during installation for verification, and documentation for handover and future maintenance.',
  },
  {
    id: 8,
    question: 'When should electrical containment mock-ups typically be installed?',
    options: [
      'Before bulk containment installation commences',
      'During the handover phase',
      'After all containment is complete',
      'Mock-ups are never required for containment',
    ],
    correctAnswer: 0,
    explanation:
      'Containment mock-ups should be installed before bulk installation commences to establish quality benchmarks, verify installation methods, and gain approval for the standard to be achieved.',
  },
  {
    id: 9,
    question: 'What status indicates a submittal cannot proceed without modification?',
    options: [
      'Approved',
      'Rejected - resubmit',
      'Approved as noted',
      'For information only',
    ],
    correctAnswer: 1,
    explanation:
      "'Rejected - resubmit' indicates the submittal does not meet specification requirements and must be revised and resubmitted before approval can be granted.",
  },
  {
    id: 10,
    question:
      'BS 7671 compliance certificates for equipment are typically submitted as part of which process?',
    options: [
      'Tender documentation only',
      'Not required in the UK',
      'Material and equipment submittals',
      'Final handover only',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 compliance certificates and declarations of conformity are submitted as part of material and equipment submittals to verify regulatory compliance before installation.',
  },
  {
    id: 11,
    question: "What is the contractor's responsibility if approved materials become unavailable?",
    options: [
      'Install the nearest available product without informing anyone',
      'Stop all work until the original product becomes available again',
      'Claim an extension of time without proposing any alternative',
      'Notify the client/engineer and submit an alternative for approval',
    ],
    correctAnswer: 3,
    explanation:
      'If approved materials become unavailable, the contractor must promptly notify the client or engineer and submit an alternative product for approval through the formal substitution process.',
  },
  {
    id: 12,
    question: 'How long should approved submittal records typically be retained?',
    options: [
      'Until project completion and through the defects liability period',
      'Only until the relevant item has been installed on site',
      'For seven days after each submittal is approved',
      'Until the next progress meeting with the client',
    ],
    correctAnswer: 0,
    explanation:
      'Approved submittal records should be retained through project completion and the defects liability period (typically 12-24 months), and copies provided as part of the O&M documentation.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a submittal and a shop drawing?',
    answer:
      'A submittal is a broad term covering all documentation submitted for approval including product data, samples, and certifications. Shop drawings are specific detailed drawings prepared by the contractor or fabricator showing how products will be manufactured or installed. Shop drawings are a type of submittal but not all submittals are shop drawings.',
  },
  {
    question: 'Can work proceed while submittals are pending approval?',
    answer:
      "Generally, no. Installing materials before submittal approval carries significant risk as rejected items may need to be removed at the contractor's expense. However, procurement of long lead-time items may commence at contractor's risk with client notification. The contract should specify requirements.",
  },
  {
    question: 'How do I handle a rejected submittal with tight programme constraints?',
    answer:
      'First, understand the rejection reasons by clarifying with the reviewer. Address all comments comprehensively in the resubmission. Request expedited review if contractually permitted. If specification compliance is impossible, submit a formal substitution request with evidence of equivalence. Document all programme impacts for potential extension of time claims.',
  },
  {
    question: 'What happens if the specified product is discontinued?',
    answer:
      'The contractor should notify the client immediately upon discovering discontinuation. Obtain documentation from the manufacturer confirming discontinuation. Identify suitable alternatives that meet or exceed the specification. Submit a formal substitution request with comparative data. The client may issue a variation if the alternative has cost implications.',
  },
  {
    question: 'Are generic products acceptable if the specification names a specific manufacturer?',
    answer:
      "This depends on the specification wording. If the specification states 'or equal approved', generic products meeting all performance criteria may be acceptable subject to approval. If the specification states 'no substitution', only the named product is acceptable. Always seek clarification from the specifier if uncertain.",
  },
  {
    question: 'Who is responsible for the cost of mock-ups?',
    answer:
      'Mock-up costs should be addressed in the contract preliminaries. Typically, the contractor bears the cost of mock-ups as part of their quality management system. However, if mock-ups are instructed beyond those reasonably anticipated at tender, additional costs may be claimable. Mock-up areas that form part of the permanent works avoid duplicate cost.',
  },
];

const HNCModule5Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 3"
            title="Material and Equipment Approval"
            description="Submittal processes, sample approval, mock-up requirements, and specification compliance for building services."
            tone="purple"
          />

          <TLDR
            points={[
              "Submittal process: contractor submits product data, cut sheets, schedules and samples; design team reviews against specification; approves or rejects with comments.",
              "Approval is \"approved\", \"approved as noted\" (with conditions), or \"rejected\" — never \"noted\" or \"received\" which carry no contractual force.",
              "Long-lead items prioritised — submittals lodged early enough that approval, manufacture and delivery fit the programme.",
              "Mock-ups for visible elements (luminaire types, control panels, finishes) — installed once, approved or rectified, then full installation proceeds.",
              "NCRs raised when non-approved equipment is installed — full removal and re-installation at contractor cost.",
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 511.1 (General — Conformity to standards)"
            clause="Every item of equipment shall comply with the appropriate British Standard, harmonised European Standard or its equivalent. The conformity of equipment shall be verified by means of a manufacturer’s declaration, certificate of conformity or other appropriate documentation."
            meaning={
              <>
                BS 7671 requires every item of electrical equipment to comply with the relevant standard, with documented evidence of conformity. The submittal process is how this is verified at design stage; goods-in inspection verifies on delivery. UKCA/CE marking, manufacturer declarations and certificates of conformity are the audit trail.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 511.1."
          />


          <LearningOutcomes
            outcomes={[
              'Establish and maintain a comprehensive submittal register',
              'Prepare technical data sheets for specification compliance',
              'Manage the sample approval process effectively',
              'Understand mock-up requirements for quality benchmarking',
              'Process alternative product and substitution requests',
              'Track approved status and maintain audit trails',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Submittal Register and Process">
            <p>
              The submittal register is the cornerstone of material and equipment approval
              management. It provides a comprehensive log of all items requiring approval, their
              current status, and a complete audit trail throughout the project lifecycle.
            </p>
            <p>
              <strong>Submittal register contents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unique reference number:</strong> Sequential numbering system (e.g.,
                SUB-E-001)
              </li>
              <li>
                <strong>Specification clause:</strong> Reference to relevant specification section
              </li>
              <li>
                <strong>Description:</strong> Clear description of material or equipment
              </li>
              <li>
                <strong>Submission date:</strong> Date submittal was issued for review
              </li>
              <li>
                <strong>Required date:</strong> Date approval is needed for procurement
              </li>
              <li>
                <strong>Revision number:</strong> Track resubmissions (Rev A, B, C)
              </li>
              <li>
                <strong>Status:</strong> Current approval status
              </li>
            </ul>
            <p>
              <strong>Approval status categories:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approved:</strong> Fully compliant, no changes — Proceed with procurement
              </li>
              <li>
                <strong>Approved as Noted:</strong> Acceptable with comments — Incorporate comments,
                then proceed
              </li>
              <li>
                <strong>Revise and Resubmit:</strong> Changes required — Address comments, resubmit
              </li>
              <li>
                <strong>Rejected:</strong> Does not meet specification — Submit compliant
                alternative
              </li>
              <li>
                <strong>For Information:</strong> No approval required — File for record
              </li>
            </ul>
            <p>
              <strong>Programme impact:</strong> Allow 7-14 days for review. Factor submittal
              approval into procurement lead times.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Technical Data Sheets and Documentation">
            <p>
              Technical data sheets form the documentary evidence that proposed materials and
              equipment comply with specification requirements. Complete and accurate documentation
              is essential for efficient review and approval.
            </p>
            <p>
              <strong>Electrical equipment data:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated voltage and current</li>
              <li>IP rating (ingress protection)</li>
              <li>Fault rating (kA)</li>
              <li>Operating temperature range</li>
              <li>Compliance certifications (BS/EN)</li>
              <li>CE/UKCA marking documentation</li>
            </ul>
            <p>
              <strong>Luminaire data:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Photometric data (IES/LDT files)</li>
              <li>Lumen output and efficacy</li>
              <li>Colour temperature (CCT)</li>
              <li>Colour rendering index (CRI)</li>
              <li>Emergency conversion options</li>
              <li>DALI/control compatibility</li>
            </ul>
            <p>
              <strong>Required submittal documentation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Product data sheet:</strong> Technical specifications — All equipment
              </li>
              <li>
                <strong>Declaration of conformity:</strong> Regulatory compliance — All CE/UKCA
                marked items
              </li>
              <li>
                <strong>Test certificates:</strong> Third-party verification — Switchgear, cables,
                containment
              </li>
              <li>
                <strong>Installation instructions:</strong> Correct installation method — All
                equipment
              </li>
              <li>
                <strong>Maintenance schedule:</strong> Lifecycle requirements — Major plant items
              </li>
              <li>
                <strong>Warranty terms:</strong> Guarantee conditions — As specified
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Compile all documentation into a single PDF with clear
              indexing. Highlight specification compliance on each data sheet.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Sample Approval and Mock-ups">
            <p>
              Physical samples and mock-up installations provide tangible verification of quality
              standards that cannot be fully assessed from documentation alone. They establish the
              benchmark against which all subsequent work will be measured.
            </p>
            <p>
              <strong>Sample approval process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Submit sample with data sheet and specification reference
              </li>
              <li>
                <strong>Step 2:</strong> Client/engineer inspects for colour, finish, and quality
              </li>
              <li>
                <strong>Step 3:</strong> Written approval or comments issued
              </li>
              <li>
                <strong>Step 4:</strong> Approved sample retained as project benchmark
              </li>
              <li>
                <strong>Step 5:</strong> Delivered materials compared against approved sample
              </li>
            </ul>
            <p>
              <strong>Typical mock-up — cable containment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3m minimum run of each type</li>
              <li>Include bends, tees, and crossings</li>
              <li>Earthing bonding connections</li>
              <li>Support bracket spacing</li>
              <li>Lid and cover alignment</li>
            </ul>
            <p>
              <strong>Typical mock-up — feature lighting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full luminaire with trim/bezel</li>
              <li>Ceiling integration detail</li>
              <li>Light output demonstration</li>
              <li>Control dimming range</li>
              <li>Emergency function (if applicable)</li>
            </ul>
            <p>
              <strong>Mock-up approval checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Location:</strong> Representative of final installation conditions
              </li>
              <li>
                <strong>Coordination:</strong> Other trades' interfaces included
              </li>
              <li>
                <strong>Documentation:</strong> Photographic record before and after approval
              </li>
              <li>
                <strong>Sign-off:</strong> Written approval from client representative
              </li>
              <li>
                <strong>Retention:</strong> Mock-up retained until bulk installation accepted
              </li>
            </ul>
            <p>
              <strong>Commercial consideration:</strong> Where mock-ups form part of the permanent
              works, coordinate location to avoid abortive work and double handling.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Alternative Products and Specification Compliance">
            <p>
              When specified products are unavailable or the contractor wishes to propose
              alternatives, a formal substitution process ensures that replacement items meet or
              exceed the original specification requirements.
            </p>
            <p>
              <strong>Substitution request requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reason for substitution (cost, availability, improved performance)</li>
              <li>Side-by-side comparison of technical specifications</li>
              <li>Evidence of equal or better performance</li>
              <li>Compliance with same standards and regulations</li>
              <li>Impact on warranties and guarantees</li>
              <li>Cost implication (saving or additional)</li>
            </ul>
            <p>
              <strong>Specification compliance verification — example:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IP rating:</strong> Specified IP65 — Proposed IP66 — Exceeds
              </li>
              <li>
                <strong>Lumen output:</strong> Specified 3000lm — Proposed 3100lm — Exceeds
              </li>
              <li>
                <strong>Colour temp:</strong> Specified 4000K — Proposed 4000K — Meets
              </li>
              <li>
                <strong>CRI:</strong> Specified &gt;90 — Proposed 85 — Below spec
              </li>
              <li>
                <strong>Warranty:</strong> Specified 5 years — Proposed 5 years — Meets
              </li>
              <li>Example: CRI below specification would likely result in rejection</li>
            </ul>
            <p>
              <strong>Approved status tracking:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approved products list:</strong> Maintained and updated throughout project
              </li>
              <li>
                <strong>Distribution:</strong> Issued to procurement, site teams, and QA manager
              </li>
              <li>
                <strong>Goods receipt:</strong> Check delivered materials against approved list
              </li>
              <li>
                <strong>Traceability:</strong> Retain batch numbers and delivery records
              </li>
              <li>
                <strong>Change control:</strong> Any changes require re-approval process
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Never install materials without prior approval. The
              cost of removal always exceeds the cost of waiting for approval.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Managing a rejected submittal:</strong> Cable tray submittal
              rejected - specified perforated base but submitted solid base.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review rejection comments carefully</li>
              <li>Identify correct product from same manufacturer (perforated variant)</li>
              <li>Prepare revised submittal (Rev B) with correct data sheet</li>
              <li>Submittal cover sheet notes: "Resubmission addressing rejection comments.</li>
              <li>Now submitting perforated cable tray per specification</li>
              <li>clause 5.2.3. See highlighted compliance on data sheet."</li>
              <li>
                <strong>Action:</strong> Submit within 3 working days to maintain programme
              </li>
            </ul>
            <p>
              <strong>Example 2 — Substitution request:</strong> Specified distribution board has
              16-week lead time; alternative available in 4 weeks.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specified:</strong> Manufacturer A, Type DB-250
              </li>
              <li>
                <strong>Proposed:</strong> Manufacturer B, Type PowerBoard-250
              </li>
              <li>
                <strong>Reason:</strong> Lead time reduction (16 weeks to 4 weeks)
              </li>
              <li>Same fault rating (25kA)</li>
              <li>Same IP rating (IP41)</li>
              <li>Compatible outgoing ways</li>
              <li>Both BS EN 61439 compliant</li>
              <li>
                <strong>Cost impact:</strong> +£450 per board (6 boards = £2,700)
              </li>
              <li>
                <strong>Action:</strong> Submit with programme showing critical path impact
              </li>
            </ul>
            <p>
              <strong>Example 3 — Mock-up coordination:</strong> Exposed stainless steel containment
              in reception area requires mock-up approval.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>4m straight run with support brackets at 1.2m centres</li>
              <li>One 90° bend with radius piece</li>
              <li>One tee junction</li>
              <li>Earth bonding at each joint</li>
              <li>
                <strong>Location:</strong> Plant room corridor (not visible in final scheme)
              </li>
              <li>
                <strong>Witness inspection — Architect:</strong> finish and alignment
              </li>
              <li>
                <strong>Witness inspection — M&E Engineer:</strong> technical compliance
              </li>
              <li>
                <strong>Witness inspection — Client:</strong> overall acceptance
              </li>
              <li>
                <strong>Action:</strong> Photograph and file approval signatures before bulk install
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Submittal preparation checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reference the specification clause requiring the submittal</li>
              <li>Include complete product data sheets (not just brochures)</li>
              <li>Highlight compliance with each specification requirement</li>
              <li>Attach all relevant certificates and test reports</li>
              <li>Include installation and maintenance information</li>
              <li>Submit as searchable PDF with clear indexing</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Review period: <strong>7-14 days</strong> (check contract)
              </li>
              <li>
                Resubmission target: <strong>3-5 working days</strong>
              </li>
              <li>
                Sample retention: <strong>Until bulk installation accepted</strong>
              </li>
              <li>
                Record retention: <strong>Through defects liability period</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Submitting marketing brochures</strong> — Use technical data sheets
                </li>
                <li>
                  <strong>Not referencing specification</strong> — Always cite the clause
                </li>
                <li>
                  <strong>Installing before approval</strong> — Risk of costly removal
                </li>
                <li>
                  <strong>Ignoring approval conditions</strong> — 'Approved as noted' means action
                  required
                </li>
                <li>
                  <strong>Poor record keeping</strong> — Maintain complete audit trail
                </li>
              </ul>
            }
            doInstead="Submit technical data sheets (not brochures) cited against the spec clause, wait for written approval before installing, action all 'approved as noted' comments, and keep the submittal register live throughout the job."
          />

          <SectionRule />

          <Scenario
            title="Unapproved switchgear installed — full removal demanded"
            situation={
              <>
                The electrical sub orders LV switchgear from an alternative manufacturer to the specified one because of lead time. They do not submit for approval. The switchgear arrives, is installed and is energised. At witness testing, the design team identifies the switchgear is non-compliant — short-circuit rating below specification. The client demands removal and replacement.
              </>
            }
            whatToDo={
              <>
                Confirm the contractual position: installing non-approved equipment is a defect; the cost of removal, replacement and re-installation is the subcontractor's. Issue an NCR. Audit the supply chain to find any other unapproved substitutions. Re-brief the entire site team and supply chain on the submittal process — no order placed without approved submittal. Update the procurement procedure to require approved submittal as a gate before purchase order release.
              </>
            }
            whyItMatters={
              <>
                Submittal discipline is what keeps the client's building compliant with the specification, BS 7671 and the contract. A bypassed submittal is not a process irritation — it is a contractual breach with cost consequences. Better the lead-time impact of waiting for approval than the cost-and-programme impact of rip-out.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Submittal = product data, cut sheets, schedules, samples for design team review against spec.",
              "Approval status: approved / approved as noted / rejected — never \"noted\" or \"received\".",
              "Long-lead items prioritised — approval + manufacture + delivery must fit programme.",
              "Mock-ups for visible elements installed, approved, then rolled out at scale.",
              "Non-approved equipment installed = NCR + removal + re-installation at contractor cost.",
              "BS 7671 Reg 511.1 requires equipment compliance with relevant standards, documented.",
              "Submittal register tracks every item: status, dates, comments, resolution.",
              "Procurement gate: no PO released until submittal approved (or risk-based exception logged).",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Quality management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Installation quality
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section4_3;
