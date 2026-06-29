/**
 * Module 5 · Section 2 · Subsection 5 — Tendering Process
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   From invitation to bid to contract award — running a competitive, fair and defensible tender process that gets the right contractor at the right price.
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

const TITLE = 'Tendering Process - HNC Module 5 Section 2.5';
const DESCRIPTION =
  'Master the tendering process for building services contracts: ITT preparation, bid assembly, pricing strategies, tender evaluation, negotiation techniques, and contract award procedures.';

const quickCheckQuestions = [
  {
    id: 'itt-purpose',
    question: 'What is the primary purpose of an Invitation to Tender (ITT)?',
    options: [
      'To negotiate prices with a single contractor',
      'To finalise contract terms after selection',
      'To award contracts without competition',
      'To invite contractors to submit competitive bids for defined work',
    ],
    correctIndex: 3,
    explanation:
      'An ITT formally invites contractors to submit competitive bids for a clearly defined scope of work, enabling the client to compare offerings and select the most suitable contractor.',
  },
  {
    id: 'tender-compliance',
    question:
      'What happens if a tender submission fails to meet a mandatory compliance requirement?',
    options: [
      'It automatically wins if cheapest',
      'It may be rejected without further evaluation',
      'It receives a lower score',
      'The client must request clarification',
    ],
    correctIndex: 1,
    explanation:
      'Non-compliant tenders that fail mandatory requirements may be rejected outright without further evaluation. Compliance with ITT requirements is essential for tender validity.',
  },
  {
    id: 'letter-of-intent',
    question: 'A Letter of Intent (LOI) in tendering:',
    options: [
      'Requires full project completion',
      'Is the same as a signed contract',
      'Indicates intention to award but is not a binding contract',
      'Cannot be issued before contract award',
    ],
    correctIndex: 2,
    explanation:
      "A Letter of Intent indicates the client's intention to award a contract and may authorise limited preliminary works, but it is not a fully binding contract until formal execution.",
  },
  {
    id: 'evaluation-criteria',
    question: 'In public sector procurement, tender evaluation criteria must be:',
    options: [
      'Changed during evaluation if needed',
      'Based solely on lowest price',
      'Kept confidential until after award',
      'Published in advance with weightings',
    ],
    correctIndex: 3,
    explanation:
      'Public sector procurement requires transparency. Evaluation criteria and weightings must be published in advance in the ITT documents, and evaluators must assess bids consistently against these stated criteria.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which document typically forms the basis of the tender submission in building services contracts?',
    options: [
      "The contractor's standard price list",
      'Bills of Quantities or Schedule of Rates',
      'Previous project quotations',
      'Industry benchmark costs',
    ],
    correctAnswer: 1,
    explanation:
      'Bills of Quantities (BoQ) or Schedule of Rates provide a structured pricing document that contractors complete. This ensures all bidders price the same scope and enables fair comparison.',
  },
  {
    id: 2,
    question: "What is 'front-loading' in tender pricing?",
    options: [
      'Submitting the tender before the deadline',
      'Including all costs at the start of the schedule',
      'Pricing early activities higher to improve cash flow',
      'Adding contingencies to the first section',
    ],
    correctAnswer: 2,
    explanation:
      'Front-loading involves pricing early project activities higher than their true cost to improve cash flow through early valuations. This practice is often scrutinised during tender evaluation.',
  },
  {
    id: 3,
    question: 'During a tender interview, the evaluation panel typically assesses:',
    options: [
      'The contractor’s standard payment terms and credit limits',
      'The lowest priced bid against the published budget',
      'Whether the form of tender has been correctly signed',
      'Key personnel, methodology, and understanding of the project',
    ],
    correctAnswer: 3,
    explanation:
      "Tender interviews allow the evaluation panel to assess the proposed key personnel, technical approach, project understanding, and the contractor's ability to deliver beyond what's written in the submission.",
  },
  {
    id: 4,
    question: 'A two-envelope tender system separates:',
    options: [
      'Technical/quality submission from commercial/price submission',
      'Compliant bids from non-compliant bids before scoring',
      'Pre-qualified contractors from the open market applicants',
      'The main contractor’s bid from its subcontractors’ quotes',
    ],
    correctAnswer: 0,
    explanation:
      'The two-envelope system separates technical/quality submissions from commercial submissions. Technical envelopes are evaluated first without knowledge of price, ensuring quality assessment is not influenced by cost.',
  },
  {
    id: 5,
    question:
      'Under UK public procurement regulations, the standstill period before contract award is typically:',
    options: [
      '5 calendar days',
      '10 calendar days minimum',
      'No standstill is required',
      '30 calendar days',
    ],
    correctAnswer: 1,
    explanation:
      "The 'Alcatel' standstill period under UK public procurement regulations is a minimum of 10 calendar days (15 days if notification by post) between notifying tenderers of the award decision and signing the contract.",
  },
  {
    id: 6,
    question: 'What is the purpose of tender clarification questions during the bidding period?',
    options: [
      'To allow the client to renegotiate price before submission',
      'To let bidders privately propose changes to the scope of work',
      'To seek clarity on ITT requirements without gaining unfair advantage',
      'To formally extend the tender deadline for all bidders',
    ],
    correctAnswer: 2,
    explanation:
      'Clarification questions allow bidders to seek clarity on ITT requirements. Responses to questions of general relevance are typically circulated to all bidders to maintain fairness.',
  },
  {
    id: 7,
    question: "A contractor's tender programme should demonstrate:",
    options: [
      'A detailed breakdown of the contractor’s profit margin',
      'The cheapest possible sequence regardless of dependencies',
      'A fixed completion date set by the client with no float',
      'Logical sequencing, resource allocation, and key milestones',
    ],
    correctAnswer: 3,
    explanation:
      'A tender programme should demonstrate logical sequencing of activities, realistic resource allocation, critical path analysis, key milestones, and how the contractor will achieve practical completion.',
  },
  {
    id: 8,
    question: 'In Most Economically Advantageous Tender (MEAT) evaluation, the winning bid is:',
    options: [
      'The best combination of price and quality per stated criteria',
      'Always the lowest compliant price submitted',
      'The bid with the highest technical/quality score alone',
      'The bid from the contractor with the most relevant experience',
    ],
    correctAnswer: 0,
    explanation:
      'MEAT evaluation considers both price and quality factors according to published weightings (e.g., 60% quality, 40% price). The winning bid offers the best overall value, not necessarily the lowest price.',
  },
  {
    id: 9,
    question:
      'What is typically included in a tender method statement for electrical installation?',
    options: [
      'A priced bill of quantities for all measured works',
      'Installation sequence, testing procedures, coordination, and quality assurance',
      'The contractor’s overhead and profit percentages',
      'A list of subcontractors and their financial standing',
    ],
    correctAnswer: 1,
    explanation:
      'A method statement describes how the work will be executed: installation sequence, coordination with other trades, testing and commissioning procedures, quality assurance measures, and health and safety arrangements.',
  },
  {
    id: 10,
    question: 'Post-tender negotiation is typically permitted to:',
    options: [
      'Reopen the competition and invite fresh bids from new contractors',
      'Reduce the winning price without any corresponding change in scope',
      'Clarify scope, refine details, and agree final terms without fundamentally changing the tender',
      'Cherry-pick the cheapest elements from each contractor bid',
    ],
    correctAnswer: 2,
    explanation:
      'Post-tender negotiation allows clarification of scope details, refinement of programme, and agreement of final contract terms. However, fundamental changes to scope or price that would disadvantage other bidders are not permitted.',
  },
  {
    id: 11,
    question: 'A tender bond or bid bond protects the client against:',
    options: [
      'Defective workmanship during the defects liability period',
      'The contractor becoming insolvent mid-construction',
      'Material price inflation over the tender validity period',
      'The contractor withdrawing their bid after submission',
    ],
    correctAnswer: 3,
    explanation:
      'A tender bond is a financial guarantee that the contractor will not withdraw their bid during the tender validity period. If they withdraw, the bond may be forfeit to compensate the client for re-tendering costs.',
  },
  {
    id: 12,
    question: 'Pre-qualification questionnaires (PQQs) are used to:',
    options: [
      'Screen contractors before ITT stage to create a shortlist',
      'Score the priced bids submitted at tender stage',
      'Agree final contract terms with the preferred bidder',
      'Record the contractor’s proposed programme and milestones',
    ],
    correctAnswer: 0,
    explanation:
      'PQQs assess contractor capability, experience, financial standing, and compliance before issuing the ITT. This creates a shortlist of qualified contractors capable of delivering the project.',
  },
];

const faqs = [
  {
    question: 'How long should a tender validity period be for building services contracts?',
    answer:
      'Tender validity periods are typically 90-120 days for building services contracts. This allows time for evaluation, clarification, negotiation, and contract preparation. Contractors should factor this period into their pricing as material costs and resource availability may change. Longer validity periods may require price adjustment mechanisms.',
  },
  {
    question: 'What makes an effective tender submission for electrical installation work?',
    answer:
      'An effective tender submission is compliant with all ITT requirements, clearly structured, and demonstrates understanding of the project. It includes competitive but realistic pricing, a credible programme, relevant experience and CVs of key personnel, detailed method statements, and evidence of quality management. Generic responses score poorly - tailor everything to the specific project.',
  },
  {
    question: 'Can tender prices be negotiated after submission?',
    answer:
      'Limited post-tender negotiation may occur with the preferred bidder to clarify scope, refine details, and agree final terms. However, in public procurement, negotiations that fundamentally change the tender (scope reduction to lower price, cherry-picking elements from different bids) are not permitted as this would breach fair competition principles.',
  },
  {
    question: 'What is the difference between open and selective tendering?',
    answer:
      'Open tendering allows any contractor meeting basic criteria to submit a bid - common in public sector. Selective (or restricted) tendering invites only pre-qualified contractors to bid - typical in private sector. Selective tendering reduces evaluation effort and ensures all bidders are capable, but may limit competition. Negotiated tendering with a single contractor is used for specialist work or emergency situations.',
  },
  {
    question: 'How are tender submissions evaluated and scored?',
    answer:
      'Tenders are evaluated against published criteria with assigned weightings. Technical/quality criteria (methodology, experience, personnel, programme) are typically scored 0-10 by multiple evaluators, with scores moderated for consistency. Price is usually scored with the lowest valid price receiving maximum points and others scored proportionally. Final scores combine quality and price scores per the stated weighting (e.g., 60:40).',
  },
  {
    question:
      'What should contractors do if they discover an error in their tender after submission?',
    answer:
      'If a genuine error is discovered after submission but before the deadline, contact the client immediately to request withdrawal and resubmission if permitted. After the deadline, notify the client of arithmetical errors (which may be corrected) versus pricing errors (which typically cannot). Withdrawing a tender may forfeit any tender bond. Always implement robust checking procedures before submission to minimise errors.',
  },
];

const HNCModule5Section2_5 = () => {
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
            eyebrow="Module 5 · Section 2 · Subsection 5"
            title="Tendering Process"
            description="Invitation to tender, bid preparation, evaluation criteria, negotiation strategies, and contract award procedures."
            tone="purple"
          />

          <TLDR
            points={[
              "Tender process: prequalification → invitation → mid-tender clarifications → submission → evaluation → negotiation → award.",
              "Use balanced evaluation criteria — typically quality 60% / price 40% for complex MEP, 30/70 for commodity work.",
              "Mid-tender Q&A is critical — issue clarifications equally to all bidders, never bilaterally.",
              "Bid evaluation is auditable — score each bidder against documented criteria, not subjective preference.",
              "Negotiation is post-evaluation, with the preferred bidder, on defined matters — never a backdoor price reduction.",
            ]}
          />

          <RegsCallout
            source="Public Contracts Regulations 2015 — Regulation 18 (Principles of procurement)"
            clause="Contracting authorities shall treat economic operators equally and without discrimination and shall act in a transparent and proportionate manner. The design of the procurement shall not be made with the intention of excluding it from the scope of these Regulations or of artificially narrowing competition. Competition shall be considered to be artificially narrowed where the design of the procurement is made with the intention of unduly favouring or disadvantaging certain economic operators."
            meaning={
              <>
                For public-sector tenders above OJEU/UK threshold, equal treatment, transparency and proportionality are legal duties. Even on private tenders, applying the same principles produces better outcomes and defensible decisions. A challenged tender on a public job can be set aside — embed compliance from invitation.
              </>
            }
            cite="Source: Public Contracts Regulations 2015 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Understand the complete tendering cycle from ITT to contract award',
              'Prepare compliant and competitive tender submissions',
              'Apply effective pricing strategies for building services work',
              'Analyse tender evaluation criteria and scoring methodologies',
              'Navigate post-tender interviews and negotiations',
              'Manage the contract award process including Letters of Intent',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Invitation to Tender (ITT)">
            <p>
              The Invitation to Tender is the formal document package issued to contractors inviting
              them to submit competitive bids for defined work. A well-structured ITT ensures all
              bidders have equal information and submit comparable proposals.
            </p>
            <p>
              <strong>ITT Document Contents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Instructions to tenderers:</strong> Submission requirements, deadline,
                format, and process
              </li>
              <li>
                <strong>Form of tender:</strong> The offer document contractors sign and submit
              </li>
              <li>
                <strong>Conditions of contract:</strong> JCT, NEC, or bespoke terms
              </li>
              <li>
                <strong>Specification:</strong> Technical requirements and standards
              </li>
              <li>
                <strong>Drawings:</strong> Design information and layout drawings
              </li>
              <li>
                <strong>Bills of Quantities/Schedule of Rates:</strong> Pricing document
              </li>
              <li>
                <strong>Evaluation criteria:</strong> How submissions will be assessed
              </li>
            </ul>
            <p>
              <strong>Tendering Routes (Route — Description — Typical Use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Open:</strong> Advertised publicly, any contractor may bid — Public sector,
                maximum competition
              </li>
              <li>
                <strong>Selective:</strong> Pre-qualified shortlist invited to bid — Private sector,
                complex projects
              </li>
              <li>
                <strong>Negotiated:</strong> Single contractor negotiation — Specialist work, repeat
                business
              </li>
              <li>
                <strong>Framework:</strong> Pre-agreed terms, mini-competition — Public sector
                programmes
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Hospital M&E ITT:</strong> A new hospital wing
              requires M&E services worth approximately £12M. The ITT package includes: RIBA Stage 4
              drawings, NRM2 Bills of Quantities, NEC4 Option A conditions, 6-week tender period,
              two-envelope submission (technical and commercial separate), mandatory site visit, and
              MEAT evaluation with 60% quality/40% price weighting. Contractors must demonstrate NHS
              experience and HTM compliance capability.
            </p>
            <p>
              <strong>Key principle:</strong> The ITT must provide sufficient information for
              contractors to price accurately. Ambiguity leads to inflated risk pricing or disputes
              later.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Bid Preparation and Pricing Strategies">
            <p>
              Successful tender preparation requires systematic analysis of the ITT, realistic
              pricing, and compelling quality submissions that demonstrate understanding and
              capability.
            </p>
            <p>
              <strong>Bid Assembly Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Compliance matrix against ITT requirements</li>
              <li>Fully completed pricing document</li>
              <li>Method statements and programme</li>
              <li>Key personnel CVs</li>
              <li>Relevant experience and references</li>
              <li>Health and safety documentation</li>
              <li>Quality management procedures</li>
              <li>Signed form of tender</li>
            </ul>
            <p>
              <strong>Pricing Components:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Direct labour costs (site and supervision)</li>
              <li>Material costs with procurement strategy</li>
              <li>Plant and equipment</li>
              <li>Subcontractor packages</li>
              <li>Preliminaries (site setup, management)</li>
              <li>Overheads and profit margin</li>
              <li>Risk allowances</li>
              <li>Design fees if design-build</li>
            </ul>
            <p>
              <strong>Pricing Strategies (Strategy — Approach — Risk/Benefit):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Competitive:</strong> Tight margins to win work — Higher win rate, lower
                profit, variation reliance
              </li>
              <li>
                <strong>Balanced:</strong> Fair price with reasonable margin — Sustainable
                profitability, moderate win rate
              </li>
              <li>
                <strong>Front-loaded:</strong> Higher prices in early activities — Improved cash
                flow, scrutinised by clients
              </li>
              <li>
                <strong>Value-based:</strong> Emphasis on quality and capability — Best for MEAT
                evaluation with high quality weighting
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Commercial Office Tender:</strong> An electrical
              contractor prepares a £2.4M tender for a commercial office fit-out. The pricing
              breakdown: Labour 35% (£840k), Materials 40% (£960k), Plant 5% (£120k), Preliminaries
              12% (£288k), Overheads 5% (£120k), Profit 3% (£72k). The contractor front-loads
              containment installation to improve cash flow but keeps rates within 15% of market
              norms to avoid rejection. Risk allowance of 2% is included for design development.
            </p>
            <p>
              <strong>Best practice:</strong> Build the estimate from first principles, then review
              against benchmarks. Avoid copying previous tender rates without analysis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Tender Evaluation and Interviews">
            <p>
              Tender evaluation follows a structured process to ensure fair and consistent
              assessment. Understanding evaluation methodology helps contractors optimise their
              submissions.
            </p>
            <p>
              <strong>MEAT Evaluation Process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1:</strong> Compliance check - mandatory pass/fail requirements
              </li>
              <li>
                <strong>Stage 2:</strong> Technical/quality scoring by evaluation panel
              </li>
              <li>
                <strong>Stage 3:</strong> Commercial analysis and price scoring
              </li>
              <li>
                <strong>Stage 4:</strong> Combined weighted score calculation
              </li>
              <li>
                <strong>Stage 5:</strong> Moderation and consensus meeting
              </li>
              <li>
                <strong>Stage 6:</strong> Tender interviews (if required)
              </li>
            </ul>
            <p>
              <strong>Typical Evaluation Criteria and Weightings (Criterion — Typical Weight — Assessment Areas):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Technical approach:</strong> 20-25% — Method statements, innovation,
                coordination
              </li>
              <li>
                <strong>Experience:</strong> 10-15% — Similar projects, sector knowledge, references
              </li>
              <li>
                <strong>Personnel:</strong> 10-15% — Key staff CVs, qualifications, availability
              </li>
              <li>
                <strong>Programme:</strong> 10-15% — Realistic sequencing, milestones, resources
              </li>
              <li>
                <strong>Price:</strong> 30-50% — Competitiveness, completeness, value
              </li>
            </ul>
            <p>
              <strong>Price Scoring Formula (Common Method):</strong> Price Score = (Lowest Price /
              Tender Price) x Maximum Points. Example: Lowest bid £1.8M, your bid £2.0M, max points
              40. Score = (1.8/2.0) x 40 = 36 points.
            </p>
            <p>
              <strong>Tender Interview Preparation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ensure proposed personnel attend - substitutes score poorly</li>
              <li>Prepare a brief presentation if permitted</li>
              <li>Know the project inside out - visit the site</li>
              <li>Anticipate technical questions on methodology</li>
              <li>Be ready to discuss risk management approach</li>
              <li>Demonstrate understanding of client priorities</li>
            </ul>
            <p>
              <strong>Interview tip:</strong> The interview assesses the people, not the paperwork.
              Confidence, technical competence, and rapport with the client team often differentiate
              shortlisted bidders.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Negotiation and Contract Award">
            <p>
              Following evaluation, the preferred bidder enters post-tender negotiation before
              formal contract award. Understanding this process and the legal framework ensures
              smooth transition from tender to contract.
            </p>
            <p>
              <strong>Post-Tender Negotiation Scope — Permitted:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Clarifying scope ambiguities</li>
              <li>Refining programme details</li>
              <li>Agreeing payment terms</li>
              <li>Confirming key personnel</li>
              <li>Discussing value engineering options</li>
            </ul>
            <p>
              <strong>Not Permitted:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fundamental scope changes</li>
              <li>Cherry-picking from other bids</li>
              <li>Price reduction without scope change</li>
              <li>Changing published evaluation criteria</li>
              <li>Reopening competition with others</li>
            </ul>
            <p>
              <strong>Contract Award Process (Stage — Action — Duration):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Award decision:</strong> Evaluation complete, preferred bidder selected — -
              </li>
              <li>
                <strong>Standstill notification:</strong> All tenderers informed of decision — Day 0
              </li>
              <li>
                <strong>Standstill period:</strong> Opportunity for challenge (public sector) — 10+
                calendar days
              </li>
              <li>
                <strong>Letter of Intent:</strong> Authorises preliminary works if urgent — Optional
              </li>
              <li>
                <strong>Contract execution:</strong> Formal signing and exchange — After standstill
              </li>
            </ul>
            <p>
              <strong>Letter of Intent — Key Considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LOI is not a contract - it indicates intention to award</li>
              <li>Typically caps liability to a specified sum (e.g., £50,000)</li>
              <li>Work under LOI is at contractor's risk if contract not concluded</li>
              <li>Ensure LOI specifies scope of authorised work clearly</li>
              <li>Formal contract should follow within 2-4 weeks maximum</li>
            </ul>
            <p>
              <strong>Building Services Example — Retail Fit-Out Award:</strong> An M&E contractor
              wins a £1.6M retail fit-out tender. The client issues a Letter of Intent capped at
              £75,000 to enable long-lead equipment ordering and design development while the NEC4
              contract is finalised. The LOI specifies: ordering of distribution boards (8-week
              lead), detailed coordination drawings, and attendance at two design meetings. The
              contractor mobilises but limits exposure to the LOI cap until formal contract
              execution three weeks later.
            </p>
            <p>
              <strong>Legal principle:</strong> Never exceed the LOI cap value. If the contract
              fails to materialise, recovering costs beyond the cap is extremely difficult.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — MEAT Score Calculation:</strong> Calculate the total MEAT score
              for Contractor A. Evaluation weighting: Quality 60%, Price 40%. Quality score: 72/100.
              Tender price: £2.2M. Lowest price: £1.9M.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Quality Score = (72/100) x 60 = <strong>43.2 points</strong>
              </li>
              <li>
                Price Score = (1.9M / 2.2M) x 40 = <strong>34.5 points</strong>
              </li>
              <li>
                <strong>Total MEAT Score</strong> = 43.2 + 34.5 = <strong>77.7 points</strong>
              </li>
              <li>Compare against other bidders to determine ranking</li>
            </ul>
            <p>
              <strong>Example 2 — Tender Pricing Build-Up:</strong> An electrical contractor prices
              a data centre installation. Direct costs total £3.2M. Calculate the tender price using
              standard mark-ups.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Direct costs: £3,200,000</li>
              <li>Preliminaries (15%): £480,000</li>
              <li>Subtotal: £3,680,000</li>
              <li>Overheads (6%): £220,800</li>
              <li>Risk allowance (3%): £110,400</li>
              <li>Profit (4%): £147,200</li>
              <li>
                <strong>Tender Price: £4,158,400</strong>
              </li>
              <li>Margin on direct costs: 30% (competitive for specialist work)</li>
            </ul>
            <p>
              <strong>Example 3 — Standstill Period Timeline:</strong> A public sector client issues
              award notification on Monday 5th January. When is the earliest date for contract
              signature?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Award notification: Monday 5th January (Day 0)</li>
              <li>Standstill period: 10 calendar days minimum</li>
              <li>Standstill ends: Thursday 15th January</li>
              <li>
                <strong>Earliest contract signature: Friday 16th January</strong>
              </li>
              <li>Note: If notification by post, extend to 15 days (20th January)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Tender submission checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify all mandatory documents are included</li>
              <li>Check pricing document is complete with no blank cells</li>
              <li>Ensure form of tender is signed by authorised person</li>
              <li>Review submission against compliance matrix</li>
              <li>Submit before deadline - late submissions rejected</li>
              <li>Keep copies of all submitted documents</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Tender validity: <strong>90-120 days</strong>
              </li>
              <li>
                Standstill period: <strong>10 calendar days</strong> (public sector)
              </li>
              <li>
                Typical quality:price weighting: <strong>60:40</strong>
              </li>
              <li>
                M&E as percentage of building cost: <strong>30-40%</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Non-compliance:</strong> Missing mandatory requirements means rejection
                </li>
                <li>
                  <strong>Generic responses:</strong> Tailor every submission to the specific
                  project
                </li>
                <li>
                  <strong>Pricing errors:</strong> Implement thorough checking procedures
                </li>
                <li>
                  <strong>Late submission:</strong> Deadlines are absolute - build in contingency
                </li>
                <li>
                  <strong>Exceeding LOI cap:</strong> Never commit beyond authorised value
                </li>
              </ul>
            }
            doInstead="Run a compliance matrix before submission, write project-specific narrative responses, double-check pricing arithmetic, build deadline contingency into the bid plan, and respect the LOI cap until the formal contract is executed."
          />

          <SectionRule />

          <Scenario
            title="Bilateral negotiation challenged as anti-competitive"
            situation={
              <>
                You are running a tender for a £4m hospital MEP package. After scoring, the second-placed bidder is £200k cheaper but scored lower on technical quality. The client suggests calling the second-placed bidder to "see if they can match" the technical quality. You agree and have a private call.
              </>
            }
            whatToDo={
              <>
                Stop. Bilateral negotiation in a competitive tender, especially on public-sector work, is a serious procurement breach. If you want to renegotiate, either go back to all bidders with revised requirements (effectively re-tendering) or award against the published criteria. Document the rationale for the award using the original scoring. If you genuinely need to reopen scope, do so transparently with all bidders. Never have a private call with one bidder during evaluation.
              </>
            }
            whyItMatters={
              <>
                Tender fairness is both legal compliance (public sector) and best practice (private sector). A challenged tender can be set aside, costing months of programme. The discipline of a clean process protects both client and bidders, and leads to award decisions you can defend at audit.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Process: prequalification → ITT → clarifications → submission → evaluation → negotiation → award.",
              "Balanced criteria: quality 60 / price 40 for complex MEP; 30/70 for commodity work.",
              "Mid-tender Q&A issued equally to all bidders — never bilateral.",
              "Evaluation scored against documented criteria — auditable, defensible, transparent.",
              "Negotiation post-evaluation only, with preferred bidder, on defined matters.",
              "Public-sector procurement is regulated by PCR 2015 — equal treatment, transparency, proportionality.",
              "Bid review meetings document scoring rationale — important when challenged later.",
              "Award decision recorded with full audit trail; standstill period applied where required (PCR Reg 87).",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Subcontract management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Supply chain management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section2_5;
