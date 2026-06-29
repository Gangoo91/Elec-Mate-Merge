/**
 * Module 6 · Section 6 · Subsection 3 — RFI workflow + designer-installer-tester chain accountability
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.5, 5.6
 *   AC 5.5 — "Manage formal communication between design, installation and inspection roles"
 *   AC 5.6 — "Maintain a documented chain of accountability across the project lifecycle"
 *
 * Layered depth: 2366-03 Unit 304 / AC 5.5; Building Safety Act 2022 (golden thread)
 *
 * The Request For Information (RFI) is the documented question-and-answer process
 * that keeps the three BS 7671 roles (design, construction, inspection and testing)
 * coordinated when reality on site does not match the design. This Sub covers the
 * full RFI lifecycle, the chain of accountability, and how the workflow underpins
 * EIC validity under Reg 644.1.1.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  "RFI workflow + chain of accountability (5.5) | Level 3 Module 6.6.3 | Elec-Mate";
const DESCRIPTION =
  "The Request For Information lifecycle and the designer-installer-tester chain of accountability that keeps BS 7671 Reg 132 (design), Reg 134.1.1 (construction) and Part 6 (inspection and testing) coordinated.";

const checks = [
  {
    id: "m6-s6-sub3-rfi-trigger",
    question:
      "Which of the following SHOULD trigger a formal RFI rather than a verbal call between site and designer?",
    options: [
      "The installer wants to fit a different manufacturer's socket-outlet of identical rating, finish and specification to the one on the schedule.",
      "The installer needs to know which morning to start second fix so they can book labour, with no change to the design itself.",
      "The installer is choosing the order in which to pull cables on a single distribution board and wants to confirm the sequence.",
      "The installer needs a sub-main re-routed around an unforeseen beam, lengthening the cable 42 m to 51 m and pushing Vd toward the 5 percent ceiling.",
    ],
    correctIndex: 3,
    explanation:
      "An RFI exists for changes that affect the design — anything that may move a calc, a cable spec, a device rating or a regulation compliance line. A route change that pushes voltage drop is exactly the case. Brand-equivalent substitutions of like-for-like spec do not need an RFI; they are normal install discretion. The test is: does this change require the designer to re-run a calc, update a schedule or sign off a deviation? If yes, it is an RFI.",
  },
  {
    id: "m6-s6-sub3-three-roles",
    question:
      "BS 7671 splits installation responsibility into three roles. Which combination is correct?",
    options: [
      "Client under Reg 132, contractor under Reg 134.1.1, and Building Control under Part 6 — the three parties named on the Building Notice.",
      "Designer under Reg 132, constructor under Reg 134.1.1, and inspector / tester under Part 6 — one person on a small job, three on a large one.",
      "Apprentice under Reg 132, electrician under Reg 134.1.1, and supervisor under Part 6 — the three site grades sharing responsibility.",
      "Manufacturer under Reg 132, wholesaler under Reg 134.1.1, and installer under Part 6 — the three points in the supply chain.",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 names three deliberately separable responsibilities: design (Reg 132), construction (Reg 134.1.1), and inspection and testing (Part 6, Chapter 64). The EIC has a separate signature box for each. On a small domestic CU swap one electrician fills all three boxes; on a hospital wing fit-out the three are different people from different organisations. The structural separation is the same regardless of whether one person or three sign.",
  },
  {
    id: "m6-s6-sub3-rfi-format",
    question:
      "A formal RFI should ALWAYS include which of the following?",
    options: [
      "Only the question itself in plain text, sent by email — no number, drawing references or closeout section needed.",
      "Only the cost and programme impact, with the technical question and drawing references recorded on a separate sheet.",
      "A unique number, date, raised-by, drawing references, the proposed change, response date and a closeout section.",
      "Only the name of the designer who must answer it, with the actual question discussed verbally afterwards.",
    ],
    correctIndex: 2,
    explanation:
      "A formal RFI is a self-contained record. The unique number lets it be tracked through the project log. The drawing references show which document the question relates to. The proposed change with sketch lets the designer assess without a site visit. The closeout section captures the answer, the name of the designer who answered, and any revisions triggered. Without this structure the RFI becomes an undocumented chat that nobody can audit.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is an RFI in design and construction practice?",
    options: [
      "A Request For Insurance — the form the contractor submits to the PI insurer before starting any design-and-build package.",
      "A Request For Information — the formal documented question raised when site reality needs the designer to clarify, decide or amend the design.",
      "A Rapid Fault Investigation — the procedure followed on site when a circuit fails during commissioning of the installation.",
      "A Routine Fire Inspection — the periodic check of fire-stopping and escape-route compliance during the construction phase.",
    ],
    correctAnswer: 1,
    explanation:
      "An RFI is the question-and-answer record between the construction team and the design team. It exists because no design is perfect and site always meets reality the design did not anticipate. The RFI captures the question, the proposed change, the designer's decision and any drawing revisions — it is the audit trail of why the build is what it is.",
  },
  {
    id: 2,
    question: "Why is the RFI process structured rather than verbal?",
    options: [
      "Because verbal communication is banned on construction sites under CDM 2015, so every instruction of any kind must be written down by law.",
      "Because a verbal RFI costs the contractor a call-out charge, whereas a written one is free — so the structure is purely a cost-control measure.",
      "Because verbal changes leave no audit trail, and Reg 644.1.1 needs documentation matching the install that a phone call cannot produce.",
      "Because the designer is not allowed to speak to site staff directly, so all questions must be routed through a written form to the project manager first.",
    ],
    correctAnswer: 2,
    explanation:
      "Verbal change is the single largest source of EIC validity problems. Six months after a job, nobody remembers what the phone call decided, who agreed it, or whether the calc was re-run. The RFI structure forces every change through a paper trail that survives. Reg 644.1.1, CDM 2015 designer duty, and Building Safety Act 2022 golden thread all need that trail.",
  },
  {
    id: 3,
    question: "On a typical commercial fit-out, who can RAISE an RFI?",
    options: [
      "Only the Principal Designer — RFIs can be raised solely by the named design dutyholder, and everyone else routes their questions through them.",
      "Only the client — RFIs are a contractual instrument reserved for the appointing party to query the design team during the works.",
      "Only Building Control — RFIs are the mechanism the inspector uses to ask the designer for clarification during a site visit.",
      "Anyone in the construction chain who needs design clarification or wants to propose a change to the design team.",
    ],
    correctAnswer: 3,
    explanation:
      "RFIs are deliberately open at the raise end because design questions arise from anyone touching the work. The closeout end is restricted — only the responsible designer can answer an RFI that affects their design. Open raise, controlled close is the pattern that surfaces issues early without creating a bottleneck on questions.",
  },
  {
    id: 4,
    question: "What is the typical SLA (service-level agreement) on RFI closeout for a commercial fit-out?",
    options: [
      "Typically 5 working days for non-urgent RFIs and 24 hours for urgent ones, set by the contract, with missed SLAs triggering escalation.",
      "There is no SLA — the designer answers RFIs whenever convenient, since the contract never sets a response deadline.",
      "A fixed 28 days for every RFI regardless of urgency, matching the period allowed for remedial work on an EICR.",
      "Within the hour for all RFIs — the contract requires an immediate response to every query no matter how minor.",
    ],
    correctAnswer: 0,
    explanation:
      "RFI SLAs are normally written into the construction contract. 5 working days for non-urgent and 24 hours for urgent is the typical commercial benchmark. Designers who miss SLAs slow the install and become the contractual cause of delay; designers who answer too quickly without checking the calc become the cause of safety issues. The discipline is to acknowledge fast and answer correctly within SLA.",
  },
  {
    id: 5,
    question:
      "Which BS 7671 regulation makes the EIC conditional on the design pack matching the install at handover?",
    options: [
      "Reg 132.13 — the design documentation requirement, which states the EIC cannot issue unless the install matches the pack.",
      "Reg 644.1.1 — any defect or omission revealed during inspection and testing must be corrected before the Certificate issues, and a pack that disagrees with the install is a defect.",
      "Reg 514.9.1 — the per-DB chart requirement, which makes the EIC conditional on the circuit chart matching the installation.",
      "Reg 134.1.1 — the workmanship requirement, which states the EIC depends on the install matching the design pack.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 644.1.1 is the regulatory backstop for the RFI workflow. If the install diverged from the design and the design pack was not updated, the install reveals as defective when the tester compares it to the documentation. The fix is to update the documentation through the RFI workflow at the time of the change, not to scramble at handover. RFIs done well make Reg 644.1.1 trivial; RFIs skipped make it expensive.",
  },
  {
    id: 6,
    question:
      "Under the Building Safety Act 2022, the 'golden thread' of information includes which of the following?",
    options: [
      "Only the final EIC and its supporting schedules — the golden thread is just the certification pack with no drawings, calculations or change history.",
      "Only the fire-safety documentation — the golden thread covers cladding, escape routes and fire-stopping but excludes the electrical design records.",
      "All design information — drawings, calculations, schedules, RFIs, as-installed and O&M records — kept current for the building's life and accessible to its dutyholders.",
      "Only the as-built model in BIM format — the golden thread is the 3D model alone, with paper drawings and RFIs explicitly excluded.",
    ],
    correctAnswer: 2,
    explanation:
      "The golden thread is the BSA 2022 requirement that higher-risk residential buildings (HRRBs) carry a continuous, accessible record of every design and construction decision throughout their life. RFIs are part of that record because they are how design decisions are communicated and confirmed during construction. Sub 5 covers the golden thread in detail; the RFI workflow in this Sub is what feeds it.",
  },
  {
    id: 7,
    question: "What is 'chain of accountability' in the design-construct-inspect model?",
    options: [
      "The sequence in which materials pass from manufacturer to wholesaler to installer — tracing a cable from factory to wall for warranty purposes.",
      "The order in which circuits are energised at commissioning — life-safety first, then critical, then general loads, recorded as a switching sequence.",
      "The list of operatives who worked on the job each day, signed in and out on the site register for attendance and pay records.",
      "The named-person trail across the three BS 7671 roles — designer, constructor and inspector of record — each accountable for the work in their box.",
    ],
    correctAnswer: 3,
    explanation:
      "Chain of accountability is the named-person trail through the three BS 7671 declarations on the EIC. Each name is accountable for the work in that role. The chain is what makes accident investigation, insurance claims and Building Safety Regulator audits work — the regulator can name the responsible person for any phase of the build.",
  },
  {
    id: 8,
    question: "An installer signs the construction declaration on the EIC. They are certifying:",
    options: [
      "That the construction work for which they were responsible is, to the best of their knowledge and belief, in accordance with BS 7671 — not the design, which is a separate box.",
      "That the design itself complies with BS 7671 — the construction declaration is the designer's certificate of the calculations and device selection.",
      "That the inspection and testing has been carried out and the results recorded — the construction declaration covers the verification stage.",
      "That the whole installation including design, construction and testing is compliant — one signature certifies all three responsibilities at once.",
    ],
    correctAnswer: 0,
    explanation:
      "The construction declaration is specifically about workmanship — that the install was carried out competently, with correct materials, to acceptable standards and in accordance with the design pack. It does not certify the design (designer's box) and does not certify the inspection and testing (inspector's box). Each signature certifies its own scope. Honesty about scope is what the EIC structure requires.",
  },
];

const faqs = [
  {
    question: "Are RFIs only for big commercial jobs, or do small jobs need them too?",
    answer:
      "Scope to the job. A small domestic CU upgrade rarely needs formal RFIs — the designer and installer are usually the same person and decisions are made in real time. The discipline only matters when the design and construction roles are separate. For two-electrician jobs, a quick written note in a shared messaging app (date, change, agreement, photo of the affected drawing area) is the proportionate version of an RFI. For a multi-disciplinary commercial fit-out, full RFI tooling on a Common Data Environment (CDE) is the norm. The principle is auditability — produce enough record that anyone investigating six months later can reconstruct the decision.",
  },
  {
    question: "What software do most projects use for RFI management?",
    answer:
      "Common Data Environment (CDE) platforms — Procore, Asite, BIM 360 (now Autodesk Construction Cloud), Aconex, Viewpoint For Projects — all carry built-in RFI modules with auto-numbering, SLA tracking, drawing-link cross-references and audit trails. Smaller jobs run RFIs as numbered emails or in a shared spreadsheet. The platform matters less than the discipline; what matters is unique numbering, traceable closeout, and revision-controlled drawing links.",
  },
  {
    question: "What happens when the designer disagrees with the installer's proposed change?",
    answer:
      "The designer's role is to assess against BS 7671 and the design intent. If the proposal is non-compliant or reduces design margin below acceptable, the designer says no and proposes an alternative. The installer cannot override the designer on a safety or compliance point — Reg 134.1.1 makes the installer responsible for executing the design as specified, not for substituting a non-compliant alternative. If the disagreement is about cost or speed rather than compliance, the conversation moves to the project manager and customer; the designer's compliance line is the floor.",
  },
  {
    question: "How does the RFI workflow interact with CDM 2015 designer duties?",
    answer:
      "CDM 2015 makes the designer responsible for eliminating, reducing or controlling foreseeable risks during construction, maintenance, cleaning, alteration, demolition and use. RFIs that propose changes affecting any of those risk profiles trigger the designer's CDM duty — the response must show that the change has been assessed for new risks, that the design risk register has been updated, and that residual risks have been communicated to the constructor and (via the Health and Safety File) to the building owner. RFIs are one of the routine touchpoints where CDM duty is discharged.",
  },
  {
    question: "What is a 'change order' and how does it differ from an RFI?",
    answer:
      "An RFI is a question. A change order (also called a variation or VO) is the formal contractual record of a change in scope, cost or programme. They are related: most change orders start as RFIs that the designer answers with 'yes, change is approved'; the project manager then raises a change order to capture the cost and programme impact. The RFI is the technical record (what changed, why); the change order is the commercial record (what it cost, who pays, what it does to the programme). Both are needed; the RFI is the designer's tool, the change order is the project manager's.",
  },
  {
    question: "What does the Building Safety Act 2022 add to RFI practice on HRRBs?",
    answer:
      "For higher-risk residential buildings (HRRBs — broadly residential buildings 18 m or seven storeys and above), the BSA 2022 makes the design and construction phases formally gated by the Building Safety Regulator. RFIs that affect the building's safety case must be retained as part of the golden thread of information that survives the building's lifetime. The Principal Designer (a CDM role) is now also a named dutyholder for the BSR. RFIs on HRRBs are higher-stakes than commercial fit-out RFIs — they need rigorous closeout, full traceability and integration into the building's safety case file.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 3"
            title="RFI workflow + designer-installer-tester chain accountability"
            description="The Request For Information lifecycle is the documented question-and-answer process that keeps BS 7671 Reg 132 (design), Reg 134.1.1 (construction) and Part 6 (inspection and testing) coordinated when site reality meets the design. Get the workflow right and Reg 644.1.1 becomes trivial at handover."
            tone="amber"
          />

          <TLDR
            points={[
              "An RFI (Request For Information) is the formal documented question raised when site reality needs the designer to clarify, decide or amend the design. It captures the question, the proposed change, the designer's decision and any drawing revisions — the audit trail of why the build is what it is.",
              "BS 7671 splits installation responsibility into three deliberately separable roles: designer (Reg 132), constructor (Reg 134.1.1) and inspector / tester (Part 6, Chapter 64). The EIC has a separate signature box for each.",
              "The chain of accountability is the named-person trail across the three roles. Designer of record, constructor of record, inspector of record. Each is accountable for the work in their box; the chain is auditable end-to-end.",
              "Reg 644.1.1 makes the EIC conditional on the design pack matching the install. RFIs done well at the time of change keep the pack and the install aligned. RFIs skipped force a scramble at handover.",
              "On HRRBs under the Building Safety Act 2022, RFIs feed the golden thread of information that survives the building's lifetime. The discipline is higher-stakes; the workflow is the same.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define a Request For Information (RFI) and explain when one should be raised rather than handled verbally.",
              "Draft a structured RFI with all standard fields — number, date, drawing references, proposed change, requested response date, closeout section.",
              "Explain the BS 7671 chain of accountability across designer (Reg 132), constructor (Reg 134.1.1) and inspector / tester (Part 6) roles.",
              "Manage an RFI through its lifecycle — raise, acknowledge, technical review, response, drawing revision if triggered, closeout, file in the project record.",
              "Cite BS 7671 Reg 644.1.1 as the regulatory hook that makes RFI discipline part of EIC validity.",
              "Describe how the RFI workflow integrates with CDM 2015 designer duties and Building Safety Act 2022 golden thread requirements on HRRBs.",
              "Apply RFI SLAs (5 working days non-urgent, 24 hours urgent on most commercial contracts) and escalate when SLAs cannot be met.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="What an RFI actually is"
            plainEnglish="A formal question raised by the construction team to the design team when site reality does not match the design and a decision is needed."
            onSite="Every install meets reality the design did not anticipate. The RFI is the documented mechanism that keeps reality and design in sync without anyone having to guess."
          >
            <p>
              A Request For Information (RFI) is the formal documented question raised by the
              construction team — typically the install electrician, site supervisor, M&E
              coordinator or specialist subcontractor — to the design team when site reality
              requires a design clarification, decision or change. The designer's response,
              captured in the same record, is the official answer.
            </p>
            <p>
              RFIs exist because no design is perfect. Sites surface unforeseen structural
              constraints, late client changes, supplier substitutions, fire engineer overrides,
              coordination clashes, and small adjustments that nobody anticipated at design stage.
              Each one is a question for the designer. Without the RFI structure the questions get
              answered by phone or text, the answers are not recorded, and six months later nobody
              can reconstruct why the build is what it is.
            </p>
            <p>
              An RFI also serves as the gate for cost and programme conversations. Most change
              orders start as RFIs that get answered yes-with-changes. The RFI captures the
              technical decision; the change order that follows captures the commercial impact.
              Both are needed; the RFI sits at the designer's end of the chain.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The standard RFI fields"
            plainEnglish="Every RFI carries the same fields. Unique number, date, drawing references, question, proposed change, sketch if helpful, requested response date, designer's response, drawing revisions triggered."
          >
            <p>
              A complete RFI form, whether on a CDE platform or a paper form, carries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RFI number</strong> — unique per project (e.g. RFI-2026-014). Sequential and never reused.</li>
              <li><strong>Project reference</strong> — project number, project name, contract reference.</li>
              <li><strong>Raised by</strong> — name and role of person raising (e.g. Site Supervisor, J. Smith).</li>
              <li><strong>Date raised</strong> — calendar date and time stamp.</li>
              <li><strong>Drawing / document references</strong> — every drawing or document the question relates to, with revision letter (e.g. SLD Rev C, Cable Schedule Rev C, Layout L-G-01 Rev B).</li>
              <li><strong>Question / proposed change</strong> — clear statement of the issue and any proposed solution. Photographs and sketches attached.</li>
              <li><strong>Reason</strong> — why the change is needed (e.g. unforeseen structural beam, fire engineer revision, customer scope change, supplier discontinued part).</li>
              <li><strong>Urgency</strong> — Standard / Urgent / Work-stopping. Drives the SLA.</li>
              <li><strong>Requested response date</strong> — calendar date by which the response is needed to avoid programme impact.</li>
              <li><strong>Cost or programme impact assessed</strong> — initial assessment if known; left blank if assessment depends on the response.</li>
              <li><strong>Designer response</strong> — the answer, signed and dated by the responsible designer.</li>
              <li><strong>Drawing revisions triggered</strong> — list of documents updated as a result, with new revision letters.</li>
              <li><strong>Closeout date</strong> — date the RFI was formally closed.</li>
              <li><strong>Audit trail</strong> — full history of opens, edits and views, captured automatically on a CDE.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
            clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
            meaning={
              <>
                The Reg 132.1 framework is the documentation hook for the whole project record,
                including the RFI register. RFIs are part of the documentation that explains why
                the install is what it is — they record the determinations made under Regs
                132.2–132.5 — and they must survive in the operations and maintenance pack so
                future designers can read them. A design pack with no RFI register is a pack that
                has hidden every change behind closed doors and fails the Chapter 13 sufficiency
                test.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
          />

          <SectionRule />

          <ContentEyebrow>The three BS 7671 roles and the chain of accountability</ContentEyebrow>

          <ConceptBlock
            title="Designer (Reg 132), constructor (Reg 134.1.1), inspector / tester (Part 6)"
            plainEnglish="Three deliberately separable roles. Three signature boxes on the EIC. Same person on a small job; different people on a big one."
          >
            <p>
              BS 7671 names three responsibilities that together produce a compliant installation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Designer (Reg 132)</strong> — the person responsible for producing the
                design that satisfies BS 7671 and the project requirements. Outputs: SLD,
                schedules, circuit charts, calculations, layouts, design risk register, design
                pack. Signs the design declaration on the EIC.
              </li>
              <li>
                <strong>Constructor (Reg 134.1.1)</strong> — the person responsible for executing
                the design on site. Inputs: design pack, materials, labour, programme. Outputs:
                installed work, RFIs raised, red-line as-installed mark-ups, construction record.
                Signs the construction declaration on the EIC.
              </li>
              <li>
                <strong>Inspector / tester (Part 6, Chapter 64)</strong> — the person responsible
                for verifying that the install matches the design and complies with BS 7671.
                Inputs: design pack, installed work. Outputs: schedule of inspections, schedule of
                test results, EIC. Signs the inspection and testing declaration on the EIC.
              </li>
            </ul>
            <p>
              On a small CU swap one electrician fills all three boxes. On a hospital wing fit-out
              the three are different people from different organisations who may never meet. The
              regulatory split is the same in both cases. The EIC asks each signatory to be honest
              about which scope they personally take responsibility for.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 132 (Design), generally"
            clause="The electrical equipment and installations shall be so designed as to ensure: (i) the protection of persons, livestock and property in accordance with Part 4; (ii) the proper functioning of the installation for its intended use. The information indicated in Regulations 132.2 to 132.16 shall be taken into account when designing an electrical installation."
            meaning={
              <>
                Section 132 is the umbrella under which the designer's accountability sits.
                Regulations 132.2 through 132.16 list the design considerations that the designer
                must take into account — supply characteristics, nature of demand, conductors,
                wiring systems, protective measures, isolation and switching, accessibility,
                documentation, and so on. Any RFI response that changes one of these
                considerations engages the designer's accountability under Section 132. The
                response must be made by the designer (or with the designer's authority) and
                recorded.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Section 132 (Regulations 132.1 to 132.16)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Chain of accountability — the named-person trail"
            plainEnglish="Each EIC signature carries a name. The named designer, the named constructor, the named inspector. The chain is auditable from any phase back to the responsible person."
            onSite="Insurers, regulators and accident investigators all start with the name on the box. Make sure the right person's name is on the right box."
          >
            <p>
              Chain of accountability is the named-person trail across the three BS 7671
              declarations on the EIC. Each name carries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Identity</strong> — full name and contact details of the responsible individual.</li>
              <li><strong>Position</strong> — job title and organisation.</li>
              <li><strong>Qualifications</strong> — relevant qualifications evidencing competence (e.g. C&G 2365-03, NICEIC scheme membership, MIET).</li>
              <li><strong>Date of signature</strong> — when the responsibility was accepted.</li>
              <li><strong>Scope</strong> — the work for which the named person is accepting responsibility.</li>
            </ul>
            <p>
              The chain is what makes accident investigation, insurance claims and Building Safety
              Regulator audits work. If something fails, the regulator can name the responsible
              person for any phase of the build and ask them to account for the decisions made.
              That is why honesty about scope at signature time matters — signing for work you did
              not do or did not check is the single most common cause of professional indemnity
              claims that go badly for the signatory.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The RFI lifecycle</ContentEyebrow>

          <ConceptBlock
            title="Lifecycle stages — raise, acknowledge, review, respond, revise, close"
            plainEnglish="Six stages from the question being asked to the closeout being filed. Each has an owner, an SLA and a record."
          >
            <p>
              The standard RFI lifecycle:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Raise</strong> — site team identifies the issue, drafts the RFI with
                drawing references, sketch, photo and proposed change, sets urgency, submits via
                the CDE or email. Unique number assigned automatically or by the design office.
              </li>
              <li>
                <strong>Acknowledge</strong> — design office confirms receipt within 24 hours,
                allocates the RFI to the responsible designer, sets the response SLA. Site has
                certainty that the question is in the system.
              </li>
              <li>
                <strong>Technical review</strong> — responsible designer reviews the question
                against the design, runs any necessary calc, checks against BS 7671 and the
                project's other compliance lines (BS 5266, BS 5839, Part L, fire engineer's
                strategy, BMS interfaces).
              </li>
              <li>
                <strong>Respond</strong> — designer drafts the response, including any conditions
                or qualifications. Response includes a clear yes / no / yes-with-changes decision
                and the technical justification. Response is signed and dated.
              </li>
              <li>
                <strong>Revise</strong> — if the response triggers drawing or schedule changes,
                the designer updates the affected documents, marks the new revision, logs the
                change in the revision history, and re-issues. The RFI captures which documents
                were revised and to what new revision letter.
              </li>
              <li>
                <strong>Close</strong> — site team confirms receipt of response and any revised
                documents. RFI is marked closed in the register. The closed RFI joins the project
                record permanently.
              </li>
            </ol>
            <p>
              On a typical commercial fit-out the cycle takes 3 to 5 working days for a Standard
              RFI, 24 hours for an Urgent RFI, and 4 hours or less for a Work-stopping RFI. The
              SLAs are written into the contract and breach has cost and programme consequences.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="Urgency tiers and SLAs"
            plainEnglish="Standard, Urgent, Work-stopping. Each tier has its own response SLA. Urgency is set by the raiser; the designer can challenge if it looks inflated."
            onSite="If everything is Urgent, nothing is. The discipline is to reserve Work-stopping for genuine work-stopping cases — not for 'we want to keep moving fast'."
          >
            <p>
              Three urgency tiers cover most commercial contracts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard (5 working days)</strong> — the default. Used for questions that
                do not affect the immediate work face. Designer has time to consult colleagues,
                run a full calc, and respond properly.
              </li>
              <li>
                <strong>Urgent (24 hours)</strong> — used when the response is needed to keep the
                next 1 to 3 days of work on programme. Designer prioritises but still has space
                for proper review.
              </li>
              <li>
                <strong>Work-stopping (4 hours or by end of working day)</strong> — used when the
                site is currently unable to proceed pending the response. Reserved for genuine
                work-stopping cases. Triggers immediate designer engagement and may bypass normal
                review queues.
              </li>
            </ul>
            <p>
              Misuse of urgency is itself a discipline issue. A site team that flags everything as
              Urgent loses the trust of the design office and finds genuine urgent items getting
              the same treatment as the rest. The designer can challenge inflated urgency by
              acknowledging at the lower tier with a brief explanation. The contract typically
              includes an escalation route if urgency cannot be agreed.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RFI quality — what good looks like</ContentEyebrow>

          <ConceptBlock
            title="A good RFI vs a bad RFI"
            plainEnglish="A good RFI lets the designer answer it from the desk without a site visit. A bad RFI sends the designer to site to ask the same question."
          >
            <p>
              A good RFI carries enough information for the designer to assess and respond
              without going to site. The features:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Specific drawing references</strong> — exact drawings and revision letters quoted, not 'the SLD' or 'the layout'.</li>
              <li><strong>Photo of the issue</strong> — the actual condition on site, with reference to a known landmark for orientation.</li>
              <li><strong>Sketch of the proposed change</strong> — the install team's proposed solution, drawn over the existing drawing if possible.</li>
              <li><strong>Quantified impact</strong> — measured length change, count of accessories affected, route described in metres or millimetres.</li>
              <li><strong>Reason explained</strong> — why the change is needed (structural beam, fire engineer revision, customer scope, supplier issue).</li>
              <li><strong>Constraint stated</strong> — what cannot move (programme date, customer-facing zone, fire compliance line).</li>
            </ul>
            <p>
              A bad RFI says 'cable route problem on G floor, please advise'. A good RFI says
              'sub-main cable from DB-G1 to DB-G2 (Cable Schedule row CBL-DB-G1-SUB Rev C, length
              42 m, route shown on Layout L-G-02 Rev B) cannot follow the designed route through
              Grid B-3 because of a 200 mm structural downstand we did not see on the structural
              drawing. Proposed re-route shown on attached sketch, additional length approximately
              9 m. Please confirm cable size and Vd still acceptable, or specify alternative.'
              The second one can be answered in 30 minutes from a desk.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Verbal change agreements that never become RFIs"
            whatHappens={
              <>
                The site supervisor phones the designer to discuss a route change. The designer
                says 'yes, fine, increase the cable to the next size up'. Neither party writes it
                down. Six months later at the EIC stage the tester finds the install does not
                match the SLD. The designer does not recall the call. The site team insists they
                got approval. Nobody can prove what was agreed. The EIC is held under Reg 644.1.1
                until the install or the documentation is brought into line at the project's
                expense.
              </>
            }
            doInstead={
              <>
                Every design change goes through the RFI workflow, even if it starts as a phone
                call. A reasonable workflow: phone discussion to scope the question, designer
                says 'OK, raise an RFI, I will respond formally within 24 hours', site raises the
                RFI within the hour, designer responds in writing within 24 hours. The phone call
                is the unblock; the RFI is the record. Without the record, Reg 644.1.1 has no
                evidence to accept.
              </>
            }
          />

          <CommonMistake
            title="RFI raised but designer never closes the loop on drawing revisions"
            whatHappens={
              <>
                The designer responds to RFI 014 with 'change approved, increase cable to
                25 mm sq' but never updates the SLD or the cable schedule. The install team
                installs the new cable but the design pack still shows the old size. At handover
                the schedule disagrees with the install — the EIC is held until the schedule is
                updated.
              </>
            }
            doInstead={
              <>
                The designer's response is not finished until the affected documents are revised
                and re-issued. Make 'drawing revisions triggered' a mandatory field on the RFI
                form so it cannot close without the designer naming the affected documents and
                their new revisions. CDE platforms enforce this automatically; spreadsheet RFI
                logs need a manual discipline.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>RFI register and audit trail</ContentEyebrow>

          <ConceptBlock
            title="The RFI register — the project's master log"
            plainEnglish="One row per RFI. Number, date raised, raised by, status, urgency, response date, closed-by, drawings revised. Sortable, filterable, auditable."
          >
            <p>
              The RFI register is the project's master log of every question ever raised. On a
              CDE platform it is a built-in dashboard. On a smaller project it lives in a shared
              spreadsheet. Either way the columns are:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RFI number</strong> — unique sequential reference.</li>
              <li><strong>Date raised</strong> — when the question entered the system.</li>
              <li><strong>Raised by</strong> — who asked it.</li>
              <li><strong>Subject</strong> — short description of the question.</li>
              <li><strong>Drawing references</strong> — drawings the question relates to, with revisions.</li>
              <li><strong>Urgency tier</strong> — Standard / Urgent / Work-stopping.</li>
              <li><strong>SLA target date</strong> — when the response is due.</li>
              <li><strong>Status</strong> — Open / In Review / Awaiting Information / Closed.</li>
              <li><strong>Allocated to</strong> — responsible designer.</li>
              <li><strong>Date responded</strong> — when the response was issued.</li>
              <li><strong>Drawing revisions triggered</strong> — documents updated, with new revision letters.</li>
              <li><strong>Date closed</strong> — when the RFI was formally closed.</li>
              <li><strong>Cost or programme impact</strong> — initial assessment captured by project manager.</li>
            </ul>
            <p>
              The register is the source of truth at any moment about the project's open
              questions. It is read every morning by the project manager, the design lead and the
              site supervisor. SLA breach on any open RFI triggers an escalation conversation. At
              project closeout the register is a required deliverable in the operations and
              maintenance pack and (on HRRBs) the safety case file.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (New installation — defects to be corrected before Certificate issued)"
            clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
            meaning={
              <>
                Reg 644.1.1 is the regulatory backstop for the RFI workflow. If the install
                diverged from the design pack and the divergence was not captured through RFIs and
                associated drawing revisions, the inspector finds disagreement at handover. That
                is a defect or omission for the purposes of this regulation, and the EIC cannot
                issue until either the install is brought back to the design or the documentation
                is updated to as-installed and re-issued. RFIs done well at the time of change
                make Reg 644.1.1 trivial; RFIs skipped force a documentation scramble at handover
                at the worst possible moment.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
          />

          <SectionRule />

          <Scenario
            title="Commercial fit-out — chain of accountability tested by an EIC dispute"
            situation={
              <>
                Twelve months after handover of a 2,400 sq m office fit-out, the customer reports
                nuisance tripping on a sub-DB feeding open-plan office circuits. An independent
                inspector is called in. The inspector finds that the actual installed cable on the
                sub-main is 16 mm sq XLPE/SWA — the SLD shows 25 mm sq XLPE/SWA. Voltage drop on
                the sub-main is now beyond the design tolerance and downstream Zs measurements are
                close to Table 41.3 ceilings. The customer wants accountability.
              </>
            }
            whatToDo={
              <>
                The investigator goes to the project record. The RFI register is searched for any
                approved cable substitution on the sub-main. RFI 027 is found: site raised that
                25 mm sq stock was unavailable and proposed substitution to 16 mm sq subject to
                designer approval. The designer responded 'rejected, source 25 mm sq from
                alternative supplier, no substitution to 16 mm sq under any circumstance, Vd
                margin too tight'. The site supervisor's signature on the closeout confirms
                receipt of the rejection. But the install was completed with 16 mm sq anyway. The
                installer then signed the construction declaration on the EIC certifying that the
                construction was in accordance with BS 7671 and the design — knowing that the
                substitution was rejected. The chain of accountability puts the installer on the
                hook for the EIC misrepresentation; the designer is in the clear because the RFI
                rejection is on the record. The customer pursues the installer's organisation and
                their PI insurer.
              </>
            }
            whyItMatters={
              <>
                This is exactly why the chain of accountability and the RFI workflow exist
                together. The named designer carries design accountability; the named constructor
                carries construction accountability; the inspector and tester carries verification
                accountability. When something goes wrong, the regulator and the courts trace
                back through the documented record. A designer who maintains rigorous RFI
                discipline can prove what they did and did not approve. A constructor who deviates
                from a rejected RFI and signs the EIC anyway is exposed to professional
                negligence, EIC fraud and PI claim consequences. The discipline protects everyone
                in the chain who plays straight.
              </>
            }
          />

          <SectionRule />

          <ConceptBlock
            title="HRRBs and the Building Safety Act 2022 — RFIs as part of the golden thread"
            plainEnglish="On higher-risk residential buildings, RFIs are formally part of the building's safety case file. They survive the building's lifetime."
            onSite="HRRB work raises the discipline ceiling. The same workflow, but with full traceability for the Building Safety Regulator."
          >
            <p>
              On higher-risk residential buildings (HRRBs — broadly residential buildings 18 m or
              seven storeys and above) the Building Safety Act 2022 introduces formal gateways at
              design, construction and occupation. The Building Safety Regulator (BSR) approves
              the design at gateway 2 and approves the building for occupation at gateway 3. The
              golden thread of information must be maintained throughout the building's life.
            </p>
            <p>
              RFIs on HRRBs are part of the golden thread because they are how design decisions
              get made and recorded during construction. Specific implications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Retention</strong> — RFI register and individual RFIs retained for the building's lifetime, accessible to the dutyholders for the building.</li>
              <li><strong>Material design changes</strong> — any change that affects the safety case may need to be re-presented to the BSR. RFIs are the trail of those changes.</li>
              <li><strong>Principal Designer dutyholder</strong> — the Principal Designer (a CDM 2015 role, also recognised under BSA 2022) is now a formal dutyholder for the design; their RFI responses carry that weight.</li>
              <li><strong>Competence requirements</strong> — designers on HRRBs must demonstrate competence to a higher standard; RFI responses are part of the evidence the BSR can sample to confirm competence.</li>
            </ul>
            <p>
              Sub 5 covers the golden thread in detail. The RFI workflow in this Sub is the
              day-to-day mechanism that feeds it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "An RFI (Request For Information) is the formal documented question raised when site reality requires a design clarification, decision or change. The designer's response, captured in the same record, is the official answer.",
              "RFIs exist because no design is perfect. Without the RFI structure, change happens by phone call, the answers are not recorded, and Reg 644.1.1 has no evidence at handover.",
              "BS 7671 splits installation responsibility into three deliberately separable roles: designer (Reg 132), constructor (Reg 134.1.1) and inspector / tester (Part 6, Chapter 64). Each signs a separate declaration on the EIC.",
              "Chain of accountability is the named-person trail across the three EIC declarations. Each name carries identity, position, qualifications and scope. The chain is auditable end-to-end.",
              "The RFI lifecycle has six stages: raise, acknowledge, technical review, respond, revise, close. Each stage has an owner, an SLA and a record. Standard 5 working days, Urgent 24 hours, Work-stopping 4 hours.",
              "A good RFI lets the designer respond from the desk — specific drawing references, photo, sketch, quantified impact, reason and constraint. A bad RFI sends the designer to site to ask the same question.",
              "The RFI register is the project's master log. Sortable, filterable, auditable. Required deliverable in the operations and maintenance pack at handover; lifetime retention on HRRBs.",
              "Reg 644.1.1 makes the EIC conditional on the design pack matching the install. RFIs done well at the time of change keep the pack and the install aligned. The chain of accountability puts the named person on the hook for any deviation that ends up on the EIC.",
            ]}
          />

          <Quiz
            title="RFI workflow and chain of accountability — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module6-section6-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 Schedules and circuit charts
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module6-section6-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 BIM, AutoCAD, Revit, Trimble overview
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
