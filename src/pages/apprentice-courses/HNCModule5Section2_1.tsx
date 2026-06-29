/**
 * Module 5 · Section 2 · Subsection 1 — Procurement Routes
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Choosing the procurement route that fits the project — from traditional design-bid-build to two-stage and management contracting — and the risk profile of each.
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

const TITLE = 'Procurement Routes - HNC Module 5 Section 2.1';
const DESCRIPTION =
  'Understand procurement routes for building services projects: traditional lump sum, design and build, management contracting, construction management, and two-stage tendering approaches for MEP installations.';

const quickCheckQuestions = [
  {
    id: 'traditional-risk',
    question: 'In traditional procurement, who carries the majority of design risk?',
    options: [
      'The main contractor',
      'The quantity surveyor',
      'The client/employer',
      'The MEP subcontractor',
    ],
    correctIndex: 2,
    explanation:
      'In traditional procurement, the client engages designers directly and therefore carries the design risk. The contractor is only responsible for building to the provided design.',
  },
  {
    id: 'design-build-advantage',
    question: 'What is a key advantage of design and build for the client?',
    options: [
      'Longer programme duration',
      'Lower quality standards',
      'Single point of responsibility',
      'More design control',
    ],
    correctIndex: 2,
    explanation:
      "Design and build provides single point of responsibility - the contractor is accountable for both design and construction, simplifying the client's contractual relationships.",
  },
  {
    id: 'construction-management-fee',
    question: 'In construction management, how is the construction manager typically paid?',
    options: [
      'Fixed lump sum',
      'Management fee only',
      'Cost plus percentage',
      'Per trade package',
    ],
    correctIndex: 1,
    explanation:
      'The construction manager is paid a management fee for coordinating trade packages. They do not take construction risk - each trade contractor contracts directly with the client.',
  },
  {
    id: 'two-stage-purpose',
    question: 'What is the primary purpose of two-stage tendering?',
    options: [
      'To reduce overall cost',
      'To enable early contractor involvement',
      'To eliminate design risk',
      'To simplify procurement',
    ],
    correctIndex: 1,
    explanation:
      'Two-stage tendering allows the contractor to be appointed early based on preliminaries and overheads, then work with the design team to develop the scheme before fixing the construction price.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which procurement route provides the client with the most control over design quality for MEP installations?',
    options: [
      "Design and build with contractor's proposals",
      'Traditional with full M&E specification',
      'Construction management with novated design',
      'Management contracting',
    ],
    correctAnswer: 1,
    explanation:
      'Traditional procurement with a full M&E specification gives the client maximum design control as they appoint and direct the M&E consultant throughout the project.',
  },
  {
    id: 2,
    question:
      'A hospital requiring complex medical gas systems and specialist equipment would typically suit which procurement route?',
    options: [
      'Single-stage competitive tender at lowest price',
      'Fixed-price design and build let from concept',
      'Traditional with specialist subcontracts',
      'Management contracting with no design team input',
    ],
    correctAnswer: 2,
    explanation:
      'Healthcare projects with complex M&E requirements typically use traditional procurement, allowing specialist consultants to develop detailed designs and coordination with medical planners.',
  },
  {
    id: 3,
    question: 'Under design and build, when can the client still influence MEP design decisions?',
    options: [
      'Only after practical completion',
      "Never - all design is the contractor's responsibility",
      'Throughout construction without cost implications',
      "During the employer's requirements stage",
    ],
    correctAnswer: 3,
    explanation:
      "The client specifies their requirements in the Employer's Requirements document. Changes after contract award typically attract additional costs as variations.",
  },
  {
    id: 4,
    question:
      'What is a significant disadvantage of traditional procurement for building services?',
    options: [
      'Longer overall programme',
      'No competitive tendering',
      'Poor quality control',
      'Single point of responsibility',
    ],
    correctAnswer: 0,
    explanation:
      'Traditional procurement requires complete design before tendering, leading to longer overall programmes. Design and construction cannot overlap significantly.',
  },
  {
    id: 5,
    question: 'In management contracting, who holds the subcontracts with MEP trade contractors?',
    options: [
      'The client directly',
      'The management contractor',
      'A novated consultant',
      'The lead designer',
    ],
    correctAnswer: 1,
    explanation:
      'In management contracting, the management contractor holds all trade subcontracts. This differs from construction management where trade contractors contract directly with the client.',
  },
  {
    id: 6,
    question: 'Construction management is most suitable when:',
    options: [
      'The client wants fixed price certainty from day one',
      'The project is simple with standard M&E',
      'The client is experienced and wants maximum control',
      'The client wants to transfer all risk to contractors',
    ],
    correctAnswer: 2,
    explanation:
      'Construction management suits sophisticated clients who want direct control over trade contractors and are willing to accept cost and programme risk in exchange for flexibility.',
  },
  {
    id: 7,
    question: 'Two-stage tendering is particularly valuable for MEP when:',
    options: [
      'The M&E design is fully complete',
      'The project has a simple services strategy',
      'The client wants the lowest possible price',
      'Buildability input and early coordination is needed',
    ],
    correctAnswer: 3,
    explanation:
      'Two-stage tendering allows MEP contractors to contribute buildability expertise during design development, improving coordination and reducing on-site problems.',
  },
  {
    id: 8,
    question: 'What is novation in the context of design and build procurement?',
    options: [
      "Transferring the client's consultants to the contractor",
      'Splitting the works into separate trade packages',
      'Setting a guaranteed maximum price for the project',
      'Appointing a second contractor to check the design',
    ],
    correctAnswer: 0,
    explanation:
      "Novation transfers the client's design consultants (including M&E designers) to the contractor post-contract, maintaining design continuity while giving the contractor design responsibility.",
  },
  {
    id: 9,
    question:
      'For a speculative office development requiring cost certainty, which route would typically be recommended?',
    options: [
      'Construction management with direct trade contracts',
      'Design and build with a guaranteed maximum price',
      'Traditional procurement with a full bill of quantities',
      'Management contracting on a cost-reimbursable basis',
    ],
    correctAnswer: 1,
    explanation:
      'Design and build with a guaranteed maximum price (GMP) provides cost certainty whilst maintaining reasonable programme efficiency - ideal for speculative development.',
  },
  {
    id: 10,
    question: "The term 'contractor's designed portion' (CDP) refers to:",
    options: [
      'The proportion of the works the contractor self-delivers',
      'The share of the contract value paid as a management fee',
      'Elements of traditional contracts designed by the contractor',
      'The retention held back until practical completion',
    ],
    correctAnswer: 2,
    explanation:
      'CDP is used within traditional contracts where specific elements (often MEP) are designed by the contractor to a performance specification, combining traditional and D&B approaches.',
  },
  {
    id: 11,
    question: 'Which procurement route typically results in the highest preliminaries costs?',
    options: [
      'Traditional lump sum',
      'Design and build',
      'Single-stage competitive tender',
      'Construction management',
    ],
    correctAnswer: 3,
    explanation:
      "Construction management typically has higher preliminaries because the construction manager's team is on site throughout, plus there are multiple trade contractor preliminaries rather than a single main contractor.",
  },
  {
    id: 12,
    question:
      'For a data centre with rapidly evolving technology requirements, which procurement approach allows the most flexibility?',
    options: [
      'Two-stage or construction management',
      'Single-stage competitive tender',
      'Fixed-price design and build',
      'Traditional lump sum',
    ],
    correctAnswer: 0,
    explanation:
      'Two-stage or construction management allows design development to continue later into the programme, accommodating technology changes that are common in data centre projects.',
  },
];

const faqs = [
  {
    question: 'Which procurement route is best for MEP-intensive projects?',
    answer:
      "There is no single 'best' route - it depends on client priorities. Traditional suits clients wanting design control and quality assurance (hospitals, laboratories). Design and build suits those prioritising cost certainty and programme (commercial offices, retail). Construction management suits sophisticated clients on complex projects where flexibility is valued over cost certainty (major headquarters buildings).",
  },
  {
    question: 'How does procurement route affect MEP coordination?',
    answer:
      'Traditional procurement allows extended coordination time during design but may create coordination issues between separately-procured trades. Design and build places coordination responsibility with the contractor, incentivising early resolution. Construction management can suffer from coordination gaps between multiple direct trade contracts unless actively managed.',
  },
  {
    question: 'What are the implications for MEP contractors in each route?',
    answer:
      'Traditional: MEP contractors bid on complete designs with clear scope. Design and build: May require design responsibility and carry more risk. Management contracting: Similar to traditional but with management contractor oversight. Construction management: Direct relationship with client but fragmented coordination. Two-stage: Opportunity to influence design but open-book pricing scrutiny.',
  },
  {
    question: 'How does novation work for M&E consultants?',
    answer:
      "The client initially appoints M&E consultants to develop the Employer's Requirements. Post-contract award, the consultant's appointment is novated (transferred) to the D&B contractor. The consultant then completes detailed design under the contractor's direction. This maintains design continuity whilst transferring design liability to the contractor.",
  },
  {
    question: 'What is a two-stage tender and when should it be used?',
    answer:
      'Stage one selects a contractor based on preliminaries, overheads, and profit margin against an outline specification. Stage two develops detailed pricing as design progresses. It is ideal when early contractor involvement benefits buildability, the programme is tight, or the design cannot be completed before contractor appointment. Common for complex MEP projects.',
  },
  {
    question: 'How do I choose between management contracting and construction management?',
    answer:
      'Management contracting: Trade contractors contract with the management contractor, who takes some risk. Suitable when the client wants a buffer between themselves and trades. Construction management: Trade contractors contract directly with the client, who accepts more risk but has more control. Suitable for experienced clients with in-house project management capability.',
  },
];

const HNCModule5Section2_1 = () => {
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
            eyebrow="Module 5 · Section 2 · Subsection 1"
            title="Procurement Routes"
            description="Traditional, design and build, management contracting, construction management and two-stage tendering approaches for building services."
            tone="purple"
          />

          <TLDR
            points={[
              "Procurement route fixes who designs, who builds, who carries risk, and how price certainty is achieved — choose deliberately, not by default.",
              "Traditional (design-bid-build): client retains design risk, lump-sum price, longest programme.",
              "Design and build: contractor takes design risk and price risk — fastest, but specification quality is critical.",
              "Management contracting / construction management: client manages multiple trade packages, retains design risk, suits complex MEP.",
              "Two-stage tender: collaboration in stage one, lump sum or target cost in stage two — good for MEP where early contractor input shapes design.",
            ]}
          />

          <RegsCallout
            source="JCT Standard Building Contract 2024 — overview"
            clause="JCT publishes a suite of standard contracts (SBC, IC, MW, DB, MP, CM/A) each tailored to a procurement route. Clauses cover obligations, payment, variations, extensions of time, loss and expense, insurance, and termination."
            meaning={
              <>
                The procurement route you choose determines which JCT contract (or NEC suite, or bespoke) is appropriate. SBC for traditional, DB for design-build, CM/A for construction management. Mismatching contract to route creates ambiguity in risk allocation that surfaces as disputes at month nine.
              </>
            }
            cite="Source: JCT 2024 contracts (refer to JCT published documents for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Compare traditional, D&B, and management procurement routes',
              'Understand risk allocation in each procurement method',
              'Evaluate suitability for different MEP project types',
              'Apply two-stage tendering principles',
              'Analyse advantages and disadvantages for building services',
              'Select appropriate procurement for project circumstances',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Traditional Procurement (Lump Sum)">
            <p>
              Traditional procurement separates design from construction. The client engages
              consultants (architect, structural engineer, M&E consultant) to develop the design,
              then competitively tenders the construction work to contractors who price and build to
              the provided drawings and specification.
            </p>
            <p>
              <strong>Key characteristics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sequential process:</strong> Design complete before construction tender
              </li>
              <li>
                <strong>Client-led design:</strong> Full control over specification and quality
              </li>
              <li>
                <strong>Competitive tendering:</strong> Typically 4-6 contractors bid on same
                information
              </li>
              <li>
                <strong>Fixed price:</strong> Contractor commits to lump sum for defined scope
              </li>
            </ul>
            <p>
              <strong>Risk Allocation in Traditional Procurement (Risk Type — Allocated To — MEP Example):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design adequacy:</strong> Client/consultant — If HVAC undersized, client
                pays to rectify
              </li>
              <li>
                <strong>Construction quality:</strong> Contractor — Poor pipework installation at
                contractor's cost
              </li>
              <li>
                <strong>Cost overrun (variations):</strong> Client — Client changes to BMS
                specification
              </li>
              <li>
                <strong>Programme:</strong> Shared — Design delays = client; construction delays =
                contractor
              </li>
              <li>
                <strong>Coordination errors:</strong> Designer/contractor — Clashes between services
                and structure
              </li>
            </ul>
            <p>
              <strong>Advantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full design coordination before tender</li>
              <li>Clear scope for competitive pricing</li>
              <li>Client maintains design quality control</li>
              <li>Specialist M&E input throughout design</li>
            </ul>
            <p>
              <strong>Disadvantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Longer overall programme</li>
              <li>Limited contractor buildability input</li>
              <li>Late discovery of installation issues</li>
              <li>Adversarial if design incomplete</li>
            </ul>
            <p>
              <strong>Best suited for:</strong> Projects requiring high design quality and control —
              hospitals, laboratories, heritage buildings, and complex specialist installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Design and Build Procurement">
            <p>
              Design and build places responsibility for both design and construction with a single
              contractor. The client prepares Employer's Requirements defining their needs, and
              contractors respond with Contractor's Proposals showing how they will meet those
              requirements.
            </p>
            <p>
              <strong>Employer's Requirements for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Performance specification:</strong> Required temperatures, air change rates,
                lux levels
              </li>
              <li>
                <strong>Equipment standards:</strong> Minimum quality levels, approved manufacturers
              </li>
              <li>
                <strong>Energy targets:</strong> EPC rating, BREEAM requirements
              </li>
              <li>
                <strong>Design criteria:</strong> Room data sheets, load assumptions
              </li>
              <li>
                <strong>Standards compliance:</strong> BS, CIBSE, HTM requirements
              </li>
            </ul>
            <p>
              <strong>Novation of M&E Consultants —</strong> A common hybrid approach where the
              client's M&E consultant develops initial design, then is novated (transferred) to the
              D&B contractor post-contract:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Client appoints M&E consultant to RIBA Stage 3</li>
              <li>Design forms part of Employer's Requirements</li>
              <li>D&B contractor appointed and consultant novated</li>
              <li>Contractor directs completion of Stages 4-5</li>
              <li>Design liability transfers to contractor</li>
            </ul>
            <p>
              <strong>Design and Build Variants (Variant — Client Design Input — MEP Implications):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pure D&B:</strong> Output spec only — Contractor designs all MEP from
                scratch
              </li>
              <li>
                <strong>Develop & construct:</strong> Concept design — Contractor develops from
                Stage 2-3 design
              </li>
              <li>
                <strong>Enhanced D&B:</strong> Detailed design + novation — Near-complete design
                with novated team
              </li>
              <li>
                <strong>Contractor's Designed Portion:</strong> Most design by client — Only
                specified elements (often MEP) by contractor
              </li>
            </ul>
            <p>
              <strong>Advantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single point of responsibility</li>
              <li>Programme overlap - design and build concurrent</li>
              <li>Contractor buildability input</li>
              <li>Fixed price certainty (if ER clear)</li>
            </ul>
            <p>
              <strong>Disadvantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reduced client design control post-contract</li>
              <li>Value engineering may reduce quality</li>
              <li>Variations expensive if ER ambiguous</li>
              <li>Less competitive on complex specialist work</li>
            </ul>
            <p>
              <strong>Best suited for:</strong> Commercial projects with standard MEP requirements
              where programme and cost certainty are priorities — offices, retail, warehousing,
              standard residential.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Management Contracting and Construction Management">
            <p>
              Management routes separate the coordination role from construction risk. A management
              entity is paid a fee to manage the project, whilst trade contractors carry out the
              actual construction work in discrete packages.
            </p>
            <p>
              <strong>Management Contracting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MC holds subcontracts with trade contractors</li>
              <li>MC takes some construction risk</li>
              <li>Client has one main contract (with MC)</li>
              <li>MC paid fee + reimbursable costs</li>
              <li>Buffer between client and trades</li>
            </ul>
            <p>
              <strong>Construction Management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Client holds direct contracts with trades</li>
              <li>CM takes no construction risk</li>
              <li>Multiple trade contracts to manage</li>
              <li>CM paid management fee only</li>
              <li>Maximum client control and risk</li>
            </ul>
            <p>
              <strong>MEP Trade Packages (Package — Typical Scope — Coordination Priority):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mechanical Package:</strong> HVAC, pipework, plant, insulation — Critical,
                largest services
              </li>
              <li>
                <strong>Electrical Package:</strong> Power, lighting, containment — High, interfaces
                with all trades
              </li>
              <li>
                <strong>Public Health:</strong> Drainage, water services — High, gravity constraints
              </li>
              <li>
                <strong>Fire Protection:</strong> Sprinklers, detection, alarms — Medium, ceiling
                coordination
              </li>
              <li>
                <strong>BMS/Controls:</strong> Controls, commissioning — Late, depends on others
              </li>
              <li>
                <strong>Lifts:</strong> Lift installation — Medium, shaft interfaces
              </li>
            </ul>
            <p>
              <strong>Coordination Challenge:</strong> Management routes require exceptional
              coordination between packages. Without a main contractor integrating MEP trades, the
              management entity or client must actively manage interfaces. Common issues include
              ductwork/pipework clashes, containment routing conflicts, and commissioning
              sequencing.
            </p>
            <p>
              <strong>Advantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Early MEP contractor involvement possible</li>
              <li>Design can evolve during construction</li>
              <li>Direct client relationship (CM)</li>
              <li>Specialist packages competitively tendered</li>
            </ul>
            <p>
              <strong>Disadvantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No single point of MEP responsibility</li>
              <li>Coordination gaps between packages</li>
              <li>Cost uncertainty until all packages let</li>
              <li>Client carries cost/programme risk (CM)</li>
            </ul>
            <p>
              <strong>Best suited for:</strong> Large complex projects with experienced clients —
              major headquarters, complex refurbishments, projects where flexibility is essential.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Two-Stage Tendering">
            <p>
              Two-stage tendering bridges the gap between competitive pricing and early contractor
              involvement. The contractor is appointed based on overheads and preliminaries (Stage
              1), then works with the design team to develop and price the detailed works (Stage 2).
            </p>
            <p>
              <strong>Stage 1: Contractor Selection</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tender based on outline design and specification</li>
              <li>Contractors price preliminaries, OH&P percentages</li>
              <li>May include rates for measured work</li>
              <li>Selection on price, track record, team quality</li>
              <li>Pre-construction services agreement signed</li>
            </ul>
            <p>
              <strong>Stage 2: Price Development</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contractor joins design team meetings</li>
              <li>Provides buildability and programming input</li>
              <li>MEP subcontractors may be appointed early</li>
              <li>Open-book pricing as packages tendered</li>
              <li>Contract sum agreed when design complete</li>
            </ul>
            <p>
              <strong>MEP Benefits of Two-Stage (Benefit — How Achieved — MEP Example):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Buildability input:</strong> Contractor reviews design — Plantroom layout
                optimised for installation
              </li>
              <li>
                <strong>Early coordination:</strong> 3D model integration — Clashes resolved before
                site work
              </li>
              <li>
                <strong>Programme certainty:</strong> Contractor programmes early — Long-lead MEP
                plant ordered in time
              </li>
              <li>
                <strong>Market testing:</strong> Subcontract competition — Best MEP subcontractor
                prices obtained
              </li>
              <li>
                <strong>Value engineering:</strong> Collaborative cost review — Alternative systems
                evaluated with full team
              </li>
            </ul>
            <p>
              <strong>Real-World Example — Data Centre Two-Stage:</strong> A 10MW data centre
              project used two-stage tendering to manage technical complexity:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1:</strong> Contractor selected on 15% complete design, pricing
                preliminaries and margins
              </li>
              <li>
                <strong>Pre-construction:</strong> 6 months working with M&E consultant on cooling
                strategy, UPS specification
              </li>
              <li>
                <strong>Early packages:</strong> Generators and transformers ordered during Stage 2
                (26-week lead)
              </li>
              <li>
                <strong>Stage 2 close:</strong> Contract sum fixed at 85% design, remaining works on
                schedule of rates
              </li>
              <li>
                <strong>Outcome:</strong> MEP coordination issues reduced by 40% compared to similar
                single-stage projects
              </li>
            </ul>
            <p>
              <strong>Advantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Early contractor expertise on complex M&E</li>
              <li>Long-lead plant ordered earlier</li>
              <li>Better coordination and fewer site clashes</li>
              <li>Competitive subcontract prices</li>
            </ul>
            <p>
              <strong>Disadvantages for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Less price competition on main contract</li>
              <li>Requires open-book trust</li>
              <li>Stage 2 negotiations can be protracted</li>
              <li>Risk of contractor withdrawal if price not agreed</li>
            </ul>
            <p>
              <strong>Best suited for:</strong> Complex MEP projects where early coordination is
              critical — data centres, hospitals, research facilities, complex refurbishments with
              tight programmes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Procurement Route Comparison">
            <p>
              <strong>Design control:</strong> Traditional High; D&B Low-Medium; Mgt Routes High;
              Two-Stage High.
            </p>
            <p>
              <strong>Cost certainty:</strong> Traditional High; D&B High; Mgt Routes Low; Two-Stage
              Medium.
            </p>
            <p>
              <strong>Programme speed:</strong> Traditional Slow; D&B Fast; Mgt Routes Fast;
              Two-Stage Fast.
            </p>
            <p>
              <strong>Flexibility:</strong> Traditional Low; D&B Low; Mgt Routes High; Two-Stage
              Medium.
            </p>
            <p>
              <strong>Client risk:</strong> Traditional Medium; D&B Low; Mgt Routes High; Two-Stage
              Medium.
            </p>
            <p>
              <strong>MEP coordination:</strong> Traditional Design team; D&B Contractor; Mgt Routes
              Fragmented; Two-Stage Collaborative.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Selection guidance for MEP projects">
            <p>
              <strong>Choose Traditional When:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Complex specialist M&E requiring detailed coordination (hospitals, labs)
              </li>
              <li>Client has strong in-house or consultant M&E expertise</li>
              <li>Quality and compliance are paramount over programme</li>
              <li>Budget allows for complete design before tender</li>
            </ul>
            <p>
              <strong>Choose Design and Build When:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard MEP with well-defined performance requirements</li>
              <li>Programme and cost certainty are priorities</li>
              <li>Client prefers single point of responsibility</li>
              <li>Sufficient market competition exists</li>
            </ul>
            <p>
              <strong>Choose Two-Stage When:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complex MEP requiring early contractor input</li>
              <li>Long-lead plant items need early ordering</li>
              <li>Tight programme requires design/construction overlap</li>
              <li>Client values collaboration over adversarial tendering</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common pitfalls"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Incomplete Employer's Requirements:</strong> Leads to variations and
                  disputes
                </li>
                <li>
                  <strong>Late design changes:</strong> Expensive regardless of procurement route
                </li>
                <li>
                  <strong>Poor coordination management:</strong> Critical in management routes
                </li>
                <li>
                  <strong>Ignoring market conditions:</strong> Limited competition affects pricing
                </li>
              </ul>
            }
            doInstead="Issue clear, complete Employer's Requirements before tender, freeze design before contract award, treat MEP coordination as a critical-path activity in management routes, and assess market conditions to ensure adequate competition."
          />

          <SectionRule />

          <Scenario
            title="Design and build with under-developed employer's requirements"
            situation={
              <>
                A client procures a 12,000 m² office on a JCT DB 2024 contract with employer's requirements that say "BREEAM Excellent, MEP design to RIBA Stage 2". You as contractor accept and mobilise. At Stage 4 your design develops the BMS strategy in detail and the cost rises £400k above tender. The client refuses, citing fixed price; you argue the ER was non-compliant with BREEAM Excellent under standard interpretation.
              </>
            }
            whatToDo={
              <>
                Document every design decision against the original ER. Where the ER is silent or contradicts BREEAM, raise contractor's design submissions (CDP) under the contract. Negotiate change control for genuine scope additions; absorb genuine design development. Avoid escalation by holding monthly value engineering workshops with client and design team. If unresolved, the dispute will turn on the completeness of the original ER — written before mobilisation.
              </>
            }
            whyItMatters={
              <>
                Design and build transfers design risk to the contractor — but only as far as the ER goes. Vague ERs leave the contractor shouldering scope they did not price. The procurement route choice is therefore a design completeness choice — DB is fast only when the ER is properly developed.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Procurement route allocates design risk, price risk and programme risk — choose deliberately.",
              "Traditional: client owns design, lump-sum price, slowest. Quality of design = quality of bid.",
              "Design and build: contractor owns design + price. ER completeness is critical.",
              "Construction management / management contracting: client manages packages directly. Suits complex MEP.",
              "Two-stage tender: ECI in stage one, fixed/target price in stage two. Excellent for collaborative MEP.",
              "Contract suite (JCT, NEC4, FIDIC, bespoke) must match the chosen procurement route.",
              "Single-stage open tender suits standard work; negotiated tender suits complex or repeat work.",
              "Get procurement strategy right at RIBA Stage 1–2 — changing route mid-project is expensive and contentious.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Procurement and contracts
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                JCT contracts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section2_1;
