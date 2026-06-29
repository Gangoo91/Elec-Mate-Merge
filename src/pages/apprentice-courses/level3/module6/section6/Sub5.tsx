/**
 * Module 6 · Section 6 · Subsection 5 — Design package handover + as-installed updates + golden thread (BSA 2022)
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.8, 5.9
 *   AC 5.8 — "Manage handover of the design package and as-installed records to the client and end users"
 *   AC 5.9 — "Recognise the design responsibility for ongoing information accuracy under the Building Safety Act 2022 golden thread"
 *
 * Layered depth: 2366-03 Unit 304 / AC 5.8; Building Safety Act 2022; CDM 2015 Health and Safety File
 *
 * The closeout subsection of Section 6. Covers:
 *   - The handover deliverables (design pack, EIC + schedules, O&M manual, H&S File)
 *   - The as-installed update process (red-line review, calc re-run, schedule update)
 *   - The golden thread under BSA 2022 (HRRBs, lifetime accessibility, dutyholders)
 *   - Reg 644.1.1 as the handover gate
 *   - Reg 132.13 as the lifetime documentation duty
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
  "Design pack handover + as-installed + golden thread (5.8) | Level 3 Module 6.6.5 | Elec-Mate";
const DESCRIPTION =
  "Closeout of Section 6. The handover deliverables, the as-installed update process, the operations and maintenance manual, the CDM Health and Safety File, and the Building Safety Act 2022 golden thread on HRRBs.";

const checks = [
  {
    id: "m6-s6-sub5-handover-deliverables",
    question:
      "At handover of a commercial fit-out the L3 designer's deliverable pack should include which of the following?",
    options: [
      "The EIC alone — once the Electrical Installation Certificate is signed, no drawings, schedules, O&M manual or risk information need to be handed over.",
      "Only a verbal walk-round of the installation with the building owner, with nothing put in writing because the install speaks for itself.",
      "Only the manufacturer's leaflets for the consumer unit and any appliances, since the building owner can work everything else out from those.",
      "The full as-installed design pack, the EIC and its schedules, the O&M manual, the CDM Health and Safety File, the RFI / change-order log, and (on HRRBs) the golden thread.",
    ],
    correctIndex: 3,
    explanation:
      "Handover transfers the project's whole knowledge package to the building owner. The pack must contain everything the next competent person needs to operate, maintain, alter or extend the install — the as-installed design pack (SLD, layouts and all schedules at as-installed revisions), the EIC with its schedules of inspection and test results, the operations and maintenance manual, the CDM Health and Safety File contributions, the RFI register and change-order log, and on HRRBs the golden thread information. That is the Reg 132.13 sufficiency floor. Skimping at handover loads cost on the building owner and leaves the designer exposed when a future contractor cannot find the information.",
  },
  {
    id: "m6-s6-sub5-as-installed",
    question:
      "Why must the design pack be updated to as-installed values BEFORE the EIC issues?",
    options: [
      "It does not have to be — the EIC can be issued first against the design-stage pack, and the as-installed update is done later at the building owner's convenience.",
      "Because the building owner pays for the pack on handover, so updating it first is purely a commercial milestone with no regulatory basis behind it.",
      "Reg 644.1.1 requires defects revealed during inspection and testing to be corrected before the Certificate issues, and a pack that disagrees with the install is such a defect.",
      "Because the DNO will not energise the supply until the as-installed pack has been submitted to them for approval, so the update must precede the EIC.",
    ],
    correctIndex: 2,
    explanation:
      "Reg 644.1.1 makes the EIC conditional on the install matching the documentation. Routes change, lengths change, accessories get substituted, circuits get added — all normal. The as-installed update is what re-aligns the documentation with reality before the EIC signs off. Without it, the EIC certifies an install that the documentation does not describe, which fails Reg 644.1.1 and creates a future verification problem for every periodic inspection.",
  },
  {
    id: "m6-s6-sub5-golden-thread",
    question:
      "Under the Building Safety Act 2022, the golden thread of building information must be:",
    options: [
      "Digital, structured building information kept accurate, accessible and current throughout the building's life, and updated by the dutyholders whenever it changes.",
      "Printed once at handover and archived in a locked store, frozen as a permanent snapshot that is never altered after the building is occupied.",
      "Held only by the original designer, who keeps it private for professional-indemnity reasons and releases it only if a dispute arises years later.",
      "A paper site-folder kept on the wall during construction and discarded once the building is handed over to the owner at completion.",
    ],
    correctIndex: 0,
    explanation:
      "The golden thread is a living information set, not an archive. BSA 2022 makes it a legal duty for higher-risk residential buildings (HRRBs — broadly residential buildings 18 m or seven storeys and above). The dutyholders must keep it accurate, accessible and current. The L3 designer's contribution is the as-installed electrical pack — the SLD, schedules, calc sheets, RFI register and any change orders, all in a format that survives the building's lifetime. The Building Safety Regulator can audit the golden thread at any point in the building's life.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is included in a complete design pack handover at the end of a commercial fit-out?",
    options: [
      "The EIC and a one-page circuit chart only — nothing more is needed because the certificate is the complete record of the installation.",
      "As-installed drawings and schedules, the EIC and its schedules, the O&M manual, the CDM Health and Safety File, the RFI / change log, and (on HRRBs) the golden thread.",
      "A bill of materials and the final invoice — the handover pack is essentially the commercial paperwork that closes out the job.",
      "The design-stage drawings exactly as first issued, with no as-installed updates, since the original design is the definitive record.",
    ],
    correctAnswer: 1,
    explanation:
      "Handover is the formal transfer of the project knowledge from the design and construction team to the building owner. The complete pack is the as-installed SLD and layouts, all schedules at as-installed revisions, the EIC plus inspection and test schedules, the operations and maintenance manual, the CDM 2015 Health and Safety File contributions, the RFI register, the change-order log and, on HRRBs, the golden thread information. Reg 132.13 sets the sufficiency floor — whatever the building owner needs to operate, maintain, alter and extend the install through its life. CDM 2015 adds the Health and Safety File. BSA 2022 adds the golden thread on HRRBs. Skimping here transfers risk and cost to the building owner.",
  },
  {
    id: 2,
    question: "What is the as-installed update process?",
    options: [
      "The building owner marks up the changes themselves after moving in, since they are the ones who will live with the installation and know what was fitted.",
      "The Building Control inspector records the deviations during the final inspection and updates the design pack on the designer's behalf at no charge.",
      "The installer red-lines deviations on a working copy; the designer reviews each one, re-runs affected calcs, updates and re-issues the pack as the as-installed master.",
      "No update is made — the design-stage pack is filed unchanged, and any differences between it and the install are simply accepted as normal site variation.",
    ],
    correctAnswer: 2,
    explanation:
      "The as-installed update closes the loop between design and construction, and is the designer's responsibility because the design pack is the designer's product. The installer red-lines deviations on a working copy of the design pack at handover. The designer reviews each red-line, re-runs any affected calc, updates the affected schedules, the SLD and the layouts, marks the new revision and re-issues. The re-issued pack is the as-installed master that the building owner inherits. Without this step the design pack drifts from reality and every future inspection or modification starts from incorrect information.",
  },
  {
    id: 3,
    question: "Which BS 7671 regulation makes the EIC conditional on as-installed documentation matching the install?",
    options: [
      "Reg 132.13 — the design documentation requirement, which states the EIC depends on the pack matching the as-installed work.",
      "Reg 514.9.1 — the per-DB chart requirement, which makes the EIC conditional on the circuit chart being correct.",
      "Reg 134.1.1 — the workmanship requirement, which makes the EIC conditional on the install matching the as-built record.",
      "Reg 644.1.1 — defects revealed during inspection and testing must be corrected before the Certificate issues, and a documentation mismatch is such a defect.",
    ],
    correctAnswer: 3,
    explanation:
      "Reg 644.1.1 is the regulatory hook for the as-installed update. The inspector finds disagreement between the design pack and the install; that is a defect or omission that must be corrected before the EIC issues. The fix is either to bring the install back to match the design or to update the documentation to as-installed and re-issue. The EIC cannot sign off until the documentation and the install are aligned.",
  },
  {
    id: 4,
    question: "Under the Building Safety Act 2022, what is the 'golden thread' of building information?",
    options: [
      "A digital, structured, accessible, current set of information about an HRRB, maintained by the dutyholders throughout the building's life and used by the Building Safety Regulator.",
      "A single continuous gold-sheathed earthing conductor that must run unbroken from the main earthing terminal to every accessory in a higher-risk building.",
      "The fire-resistant cabling standard for life-safety circuits in higher-risk residential buildings, named for the gold colour of its sheath.",
      "A one-off design certificate issued by the Building Safety Regulator at Gateway 2, after which no further information needs to be retained.",
    ],
    correctAnswer: 0,
    explanation:
      "The golden thread is a living information set, not a static archive. BSA 2022 makes it a legal requirement for HRRBs — broadly residential buildings 18 m or seven storeys and above. It must be accurate, accessible, current and digital. The L3 designer's contribution is the as-installed electrical pack in a format that survives the building's lifetime; the dutyholders maintain it as the building changes.",
  },
  {
    id: 5,
    question: "What is the CDM 2015 Health and Safety File and how does the L3 designer contribute?",
    options: [
      "The site safety file kept during construction only — a register of toolbox talks and RAMS sign-ons that is discarded once the build is complete.",
      "A formal CDM 2015 deliverable handed to the building owner at the end of construction, recording the residual risks; the L3 designer contributes the electrical content.",
      "The risk assessment for a single day's work on site — the L3 designer writes one for each shift and files it with the supervisor at the end of the day.",
      "The fire risk assessment for the occupied building — prepared by the responsible person under the Fire Safety Order, with no electrical-design input.",
    ],
    correctAnswer: 1,
    explanation:
      "The Health and Safety File is a CDM 2015 mandatory deliverable for any project where construction work has been carried out (with limited exceptions for very small domestic work). Prepared by the Principal Designer, it contains the information needed to operate, maintain, clean, alter, demolish and use the building safely — the building owner's permanent record of what was built and what hazards remain. The L3 designer contributes the electrical content: SLD, schedules, residual risks, isolation arrangements, LOTO information and special hazards. The File is sometimes combined with the Operations and Maintenance manual (the O&M); some firms keep them separate. Either way both are needed.",
  },
  {
    id: 6,
    question: "What format should the as-installed design pack be in for handover?",
    options: [
      "Hand-drawn pencil sketches only — a quick freehand markup of the changes is sufficient and avoids the cost of formal CAD output.",
      "A single editable spreadsheet emailed to the client — the schedules alone are enough, with no drawings or structured index needed.",
      "Digital and durable — PDF drawings and schedules, native files where the owner can use them, a structured index, and golden-thread-ready format on HRRBs.",
      "Whatever proprietary CAD format the designer uses — handing over native files the owner cannot open is acceptable because the designer retains the master.",
    ],
    correctAnswer: 2,
    explanation:
      "Format must serve the building owner's actual use case. PDF is the universal long-term format for drawings and schedules — it survives software changes. Native files (DWG, RVT, IFC) are useful where the owner can edit them. A structured index lets future readers navigate quickly. Hard copy is sometimes still required for the on-site DB chart and for some clients. BSA 2022 pushes HRRB packs toward fully digital, structured, accessible formats — the golden thread cannot be paper only.",
  },
  {
    id: 7,
    question: "Who is the Accountable Person under the Building Safety Act 2022?",
    options: [
      "The Principal Designer named under CDM 2015 — the design dutyholder responsible for coordinating safety during the pre-construction phase only.",
      "The named individual who signs the EIC design declaration — the designer of record who carries the design liability for the installation.",
      "The Building Safety Regulator's site inspector — the official who signs the building off at Gateway 3 before occupation begins.",
      "A BSA 2022 dutyholder for an occupied HRRB, responsible for the safety case, building safety risks and the golden thread; the lead one is the Principal Accountable Person.",
    ],
    correctAnswer: 3,
    explanation:
      "BSA 2022 introduces the Accountable Person and Principal Accountable Person as the named dutyholders for occupied HRRBs. The Accountable Person is responsible for the building's safety case, for managing building safety risks and for maintaining the golden thread of information; the Principal Accountable Person is the lead AP where several exist. Their duties also include the residents' engagement strategy and complaints handling. They are not the designer or the contractor — they are the building's responsible owner during occupation. The L3 designer hands the as-installed information set to the AP / PAP at handover so they can take it forward through the building's life.",
  },
  {
    id: 8,
    question: "Why must the L3 designer keep a copy of the as-installed pack after handover?",
    options: [
      "Professional responsibility and PI insurance — the as-installed pack is the evidence needed to defend the work if a claim arises years after handover.",
      "There is no reason to keep a copy — once the pack is handed over the designer's responsibility ends, so the master can be deleted immediately.",
      "Only to re-use the drawings on the next similar job, saving time by copying the previous design rather than starting fresh from a blank sheet.",
      "Because the building owner will lose their copy, so the designer keeps the only surviving record on the owner's behalf purely as a courtesy.",
    ],
    correctAnswer: 0,
    explanation:
      "Retention is part of the designer's professional discipline. PI claims can arise years after handover (typically 1 to 12 years under PI policy retroactive terms), and without the as-installed pack the designer cannot reconstruct what was designed and built. Most firms retain the full pack for the design life of the installation (typically 25 years for fixed wiring) plus the limitation period — 6 years for breach of contract, 12 years if the contract was executed as a deed. Hand the pack to the building owner and keep your own copy — both are needed.",
  },
];

const faqs = [
  {
    question: "Who is responsible for producing the as-installed pack — the designer or the installer?",
    answer:
      "Joint responsibility, but the designer leads. The installer red-lines deviations on a working copy of the design pack as the install progresses or at handover. The designer reviews each red-line, re-runs any affected calc (voltage drop, Zs, discrimination), updates the affected schedules, the SLD and the layouts, marks the new revision, and re-issues. The re-issued pack is the as-installed master. Without the designer's involvement the as-installed pack is just a marked-up working copy; without the installer's input the designer has no record of what actually changed. Both are needed.",
  },
  {
    question: "What is the difference between the operations and maintenance manual (O&M) and the Health and Safety File?",
    answer:
      "Overlapping but distinct documents. The O&M manual is the operational handbook — how to operate the systems, recommended maintenance schedules, lamp replacement guides, RCD test instructions, isolation procedures, contact details for service providers. The CDM 2015 Health and Safety File is the residual-risk record — what hazards remain in the building, what design decisions were made to control them, what residual risks need to be managed during operation, maintenance, cleaning, alteration and demolition. Some firms combine the two into one document; others keep them separate. Either approach is fine if the content is complete and indexed. Both are mandatory deliverables under CDM 2015 and Reg 132.13.",
  },
  {
    question: "What happens if the customer refuses to receive the design pack at handover?",
    answer:
      "Hand it over anyway — by recorded delivery if needed — and keep proof of delivery. The designer's duty under Reg 132.13 and CDM 2015 is to provide the documentation; the building owner's choice not to read it does not discharge the designer's duty to deliver it. Most professional contracts make handover acceptance a payment milestone, so commercial pressure usually resolves the issue. If the customer genuinely refuses, deposit the pack with a third party (solicitor, escrow, building control) and notify the customer in writing that it is held there for their use. Document everything in case of future dispute.",
  },
  {
    question: "Does a small domestic CU upgrade need a Health and Safety File and a golden thread?",
    answer:
      "Health and Safety File: under CDM 2015 the formal File is required where construction work has been carried out, with a limited exception for purely domestic clients on their own home — but even then the designer's duty to provide pre-construction information and residual-risk information remains. Most small domestic jobs satisfy the duty with a one-page Operations and Maintenance note (CU layout, RCD test instructions, isolation procedure, designer contact details). Golden thread: BSA 2022 applies only to higher-risk residential buildings (HRRBs — 18 m or seven storeys and above). A standard domestic CU upgrade in a single house is not in scope. Apartments in HRRBs are in scope and need the full golden thread.",
  },
  {
    question: "How long should the design pack be retained by the designer?",
    answer:
      "Retain for the design life of the installation plus the legal limitation period. Fixed wiring is typically 25 years design life. Limitation period is 6 years for breach of contract under simple contract, 12 years if the contract was executed as a deed (common for larger commercial work). So for a typical commercial fit-out, retain for 25 + 6 = 31 years, or 25 + 12 = 37 years for deed-executed contracts. PI insurers often require 12 to 15 years retention as a condition of cover. On HRRBs the practical retention is the building's lifetime because the golden thread duty runs that long. Modern designers retain digitally — storage cost is trivial.",
  },
  {
    question: "What is a 'safety case' under the Building Safety Act 2022 and how does the L3 designer contribute?",
    answer:
      "The safety case is the BSA 2022 requirement that an occupied HRRB demonstrate, through structured documentation, that all reasonable steps have been taken to manage building safety risks. It is owned by the Principal Accountable Person and submitted to the Building Safety Regulator as the basis for issuing a Building Assessment Certificate. The L3 designer contributes the electrical risk evidence — earthing arrangements, fire-stopping at electrical penetrations, AFDD provision (Reg 421.1.7), emergency lighting design (BS 5266), fire detection wiring (BS 5839), arc flash management and any special-hazard zones. The as-installed electrical pack is part of the safety case evidence base.",
  },
];

export default function Sub5() {
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
            eyebrow="Module 6 · Section 6 · Subsection 5"
            title="Design pack handover, as-installed updates and the golden thread"
            description="Closeout of Section 6. The handover deliverables, the as-installed update process, the operations and maintenance manual, the CDM 2015 Health and Safety File, and the Building Safety Act 2022 golden thread on higher-risk residential buildings."
            tone="amber"
          />

          <TLDR
            points={[
              "Handover is the formal transfer of the project's knowledge package from the design and construction team to the building owner. Reg 132.13 sets the sufficiency floor; CDM 2015 adds the Health and Safety File; BSA 2022 adds the golden thread on HRRBs.",
              "The as-installed update is the designer's responsibility — installer red-lines deviations, designer reviews, re-runs affected calcs, updates schedules / SLD / layouts, marks revision, re-issues. Reg 644.1.1 makes this a precondition of EIC issue.",
              "The Operations and Maintenance manual (O&M) is the operational handbook; the CDM 2015 Health and Safety File is the residual-risk record. Both are required; some firms combine, some keep separate.",
              "Under BSA 2022, the golden thread is a living, digital, accessible, current information set for higher-risk residential buildings (HRRBs — broadly 18 m or seven storeys and above). Maintained by the Accountable Person and Principal Accountable Person throughout the building's life.",
              "Designers retain the as-installed pack for the design life of the installation plus the legal limitation period (typically 25 to 37 years). PI insurers require it; future PI claims defend on it.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "List the deliverables in a complete design pack handover for a commercial fit-out.",
              "Manage the as-installed update process — red-line review, calc re-run on affected items, schedule and SLD revision, re-issue.",
              "Cite BS 7671 Reg 644.1.1 as the regulatory hook making EIC issue conditional on documentation matching install.",
              "Distinguish the Operations and Maintenance manual from the CDM 2015 Health and Safety File and identify the L3 designer's contributions to each.",
              "Describe the Building Safety Act 2022 golden thread duty for higher-risk residential buildings (HRRBs) and identify the dutyholders (Accountable Person, Principal Accountable Person).",
              "Apply professional retention practice — keep master copies of the design pack for 25 to 37 years to support PI cover and future claims defence.",
              "Recognise the L3 designer's residual duty after handover — questions from future contractors, periodic inspection support, contribution to safety-case audits on HRRBs.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Handover — the formal end of the design phase"
            plainEnglish="The moment the design pack, the EIC, the O&M and (on HRRBs) the golden thread information transfer from the project team to the building owner. The end of construction; the start of operation."
            onSite="Handover is also the moment a lot of designers go quiet. That is wrong — handover is when the designer's documentation duty becomes most visible. Take handover seriously and the next 25 years go smoothly."
          >
            <p>
              At project handover the building moves from the design and construction phase into
              operation. The L3 designer's deliverables transfer from the project team to the
              building owner (or the building owner's facilities management team). The complete
              handover pack typically contains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>As-installed design pack</strong> — SLD, layouts, schedules (Accessories, Cables, Luminaires, Circuit Charts), calc sheets, design risk register, all at the as-installed revision.</li>
              <li><strong>Electrical Installation Certificate (EIC)</strong> — signed by designer, constructor, inspector / tester, with the schedule of inspections and the schedule of test results.</li>
              <li><strong>Operations and Maintenance manual (O&M)</strong> — operational handbook for the building owner.</li>
              <li><strong>CDM 2015 Health and Safety File</strong> — residual-risk record, often coordinated by the Principal Designer.</li>
              <li><strong>RFI register and change order log</strong> — the audit trail of design changes during construction.</li>
              <li><strong>Manufacturer documentation</strong> — datasheets, test certificates, warranty documents for installed equipment.</li>
              <li><strong>Commissioning records</strong> — RCD test results, emergency lighting tests, fire alarm cause-and-effect tests, BMS commissioning records.</li>
              <li><strong>Golden thread information (HRRBs only)</strong> — structured digital information set under BSA 2022, handed to the Accountable Person.</li>
            </ul>
            <p>
              Handover is a contractual milestone — typically a payment milestone too, so
              commercial pressure aligns with the discipline. The L3 designer signs off the design
              pack as complete, the constructor signs off the install, the inspector signs off the
              verification. The building owner formally receives the package and signs receipt.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                Reg 132.16 is what gives the handover pack its 25-year sufficiency duty. Every
                future addition or alteration has to be ascertained against the rating and
                condition of the existing equipment — and that ascertainment is only possible if
                the original handover pack carries the cable schedules, single-line diagrams,
                test results and protective-device data. The L3 designer at handover is producing
                documentation that needs to make sense to a stranger in 2051; format choice,
                indexing, naming conventions and version control all matter at that horizon.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 — full text from published amendment."
          />

          <SectionRule />

          <ContentEyebrow>The as-installed update process</ContentEyebrow>

          <ConceptBlock
            title="As-installed update — closing the loop between design and construction"
            plainEnglish="Installer red-lines what changed. Designer reviews each red-line, re-runs any affected calc, updates the SLD, the layouts and the schedules, marks the new revision and re-issues. The re-issued pack is the as-installed master."
            onSite="As-installed is not optional. Reg 644.1.1 will not let the EIC issue if the install and the documentation disagree. Build the as-installed update into the project programme."
          >
            <p>
              The as-installed update is a structured process, not a tidy-up. Standard sequence:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Red-line working copy</strong> — the install team maintains a marked-up
                working copy of the design pack throughout the install, recording every deviation
                in red ink (or red layer in a digital working copy). Cable route changes, length
                changes, accessory substitutions, luminaire substitutions, circuit additions, all
                captured.
              </li>
              <li>
                <strong>Designer review</strong> — at handover (or at agreed milestones during a
                long install) the designer reviews the red-lined working copy. Each red-line is
                assessed for impact: does it require a calc re-run? Does it cross a regs ceiling?
                Does it affect another circuit through grouping derating?
              </li>
              <li>
                <strong>Calc re-run</strong> — for length changes, cable substitutions or
                grouping changes, the designer re-runs the affected voltage drop, Zs and
                discrimination calcs. If anything breaches Reg 525.202 (Vd) or Table 41.3 (Zs)
                the install must be corrected; if everything passes the documentation is updated.
              </li>
              <li>
                <strong>Document update</strong> — the cable schedule, the SLD cable annotations,
                the affected layouts and the affected Circuit Chart entries are all updated to
                as-installed values. Revision letters go up.
              </li>
              <li>
                <strong>Revision history log</strong> — every changed document records the change
                in its revision history table — date, drafter, what changed and why (e.g.
                'Sub-main length updated to 51 m from 42 m due to RFI 027 route change. Vd
                re-checked at 4.6 percent within Reg 525.202 ceiling. Zs re-checked within Table
                41.3 maximum.').
              </li>
              <li>
                <strong>Re-issue</strong> — the as-installed revision is issued to the construction
                team, the inspector and the building owner. Superseded design-stage revisions are
                marked VOID and archived (digitally on the CDE; physically destroyed for hard
                copies).
              </li>
              <li>
                <strong>EIC issue</strong> — only after the documentation matches the install can
                the EIC issue under Reg 644.1.1. Schedule of inspections and schedule of test
                results are signed by the inspector.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (New installation — defects to be corrected before Certificate issued)"
            clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
            meaning={
              <>
                Reg 644.1.1 is the regulatory hook for the handover gate. The inspector compares
                the install against the design pack; any disagreement is a defect or omission
                that must be corrected before the EIC issues. The fix is either to bring the
                install back to the design or to update the documentation to as-installed and
                re-issue. The EIC cannot sign off until the documentation and the install are
                aligned. RFIs done well during construction (Sub 3) and the as-installed update
                done properly at handover make Reg 644.1.1 trivial.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <CommonMistake
            title="Skipping as-installed updates because the install was 'mostly to design'"
            whatHappens={
              <>
                The L3 designer assumes the install matched the design closely enough that no
                update is needed. The EIC is signed against the original design pack. Five years
                later a periodic inspection finds three circuits with slightly elevated Zs
                values; the inspector compares to the design pack and finds the cable lengths
                shown are not the cable lengths installed. The original install was actually
                non-compliant on one circuit but the design-pack values disguised it. The
                building owner pursues a claim against the original designer.
              </>
            }
            doInstead={
              <>
                Treat as-installed as a non-negotiable handover step. Even on small jobs, walk
                the install with the constructor, mark up the working copy, re-run any affected
                calc, update the documentation and re-issue. The cost is one to four hours on a
                small commercial job; the protection is decades of clean defence against future
                claims. PI insurers explicitly underwrite practice that includes as-installed
                discipline.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>O&M manual and CDM Health and Safety File</ContentEyebrow>

          <ConceptBlock
            title="The Operations and Maintenance manual (O&M)"
            plainEnglish="The operational handbook for the building owner. How to operate the systems, when to test, how to isolate, who to call. Built-up across all disciplines; the L3 designer contributes the electrical content."
          >
            <p>
              The O&M manual is the day-to-day handbook for the building owner's facilities
              management team. The L3 designer's contribution typically includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>System overview</strong> — narrative description of the electrical installation, supply arrangement, distribution topology, key features.</li>
              <li><strong>SLD and layout drawings</strong> — as-installed copies, indexed and cross-referenced.</li>
              <li><strong>Schedules</strong> — Accessories, Cables, Luminaires, Circuit Charts at as-installed revisions.</li>
              <li><strong>Operating instructions</strong> — how to use the main switch, how to test RCDs, how to test emergency lighting (monthly function test, annual three-hour duration test under BS 5266), how to test the fire alarm (weekly call point test under BS 5839).</li>
              <li><strong>Maintenance schedule</strong> — recommended frequency for periodic inspection, RCD testing, emergency lighting testing, thermography of switchgear, lamp replacement programme.</li>
              <li><strong>Isolation procedures</strong> — Lock-Out Tag-Out (LOTO) instructions, how to isolate each major circuit, how to identify and prove dead before working.</li>
              <li><strong>Spare parts schedule</strong> — recommended spares for critical equipment (replacement RCBOs of matching rating and curve, emergency lighting batteries, fire alarm sounders).</li>
              <li><strong>Manufacturer documentation</strong> — datasheets, warranty cards, manufacturer service manuals.</li>
              <li><strong>Designer and contractor contact details</strong> — for future questions or claims.</li>
            </ul>
            <p>
              The O&M is a living document — the building owner updates it as they make changes
              over the building's life. The L3 designer's version at handover is the baseline.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The CDM 2015 Health and Safety File"
            plainEnglish="The residual-risk record. What hazards remain in the building, what design choices were made to control them, what residual risks future workers and operators must manage. Mandatory under CDM 2015 for nearly all construction work."
            onSite="The L3 designer's CDM duty does not end at handover — the contribution to the Health and Safety File is part of how the duty is discharged."
          >
            <p>
              CDM 2015 (Construction (Design and Management) Regulations 2015) makes the
              Principal Designer responsible for compiling the Health and Safety File. The L3
              designer contributes electrical-discipline content:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Residual hazards</strong> — anything in the install that future workers or maintainers need to know about (live-bus arrangements, restricted access work areas, special-location zones, hazardous-area classifications).</li>
              <li><strong>Design choices that control hazards</strong> — earthing arrangement (TN-S, TN-C-S PME, PNB, TT), AFDD provision (Reg 421.1.7), RCD types and groupings (Reg 411.3.3), supplementary bonding scope, fire-stopping locations.</li>
              <li><strong>Information for future modifications</strong> — what was assumed about future loads, what spare DB ways were left and for what, what supply capacity remains for future expansion, what coordination decisions were made with other disciplines that must be respected by future modifications.</li>
              <li><strong>Information for safe maintenance</strong> — isolation arrangements, LOTO procedures, special PPE requirements (e.g. arc-flash PPE for switchgear access), restricted-access conditions.</li>
              <li><strong>Information for safe demolition</strong> — at end-of-life, how to safely de-energise and disconnect the installation; particular hazards in the cabling (asbestos in legacy installations, PCBs in legacy capacitors, lead in old solder).</li>
            </ul>
            <p>
              Some firms combine the O&M and the Health and Safety File into one document; others
              keep them separate. Either approach is fine if the content is complete and indexed.
              Both are mandatory deliverables.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Building Safety Act 2022 — the golden thread</ContentEyebrow>

          <ConceptBlock
            title="The Building Safety Act 2022 — what changed"
            plainEnglish="A response to Grenfell. New regulator, new dutyholders, new gateway approvals, new accountability. Higher-risk residential buildings (HRRBs) carry the strictest discipline; commercial work is less affected but the principles apply across construction."
          >
            <p>
              The Building Safety Act 2022 (BSA 2022) is the legislative response to the Grenfell
              Tower fire. It introduced:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>The Building Safety Regulator (BSR)</strong> — within the Health and Safety Executive (HSE). Statutory regulator for HRRBs.</li>
              <li><strong>HRRB definition</strong> — broadly residential buildings 18 m or seven storeys and above with at least two residential units. Care homes and hospitals are also brought into scope. Commercial buildings are not directly captured though related changes affect commercial work.</li>
              <li><strong>Three gateways</strong> — Gateway 1 (planning), Gateway 2 (pre-construction approval by BSR), Gateway 3 (occupation approval by BSR after construction). Each gateway is a hard stop.</li>
              <li><strong>Dutyholders</strong> — Client, Principal Designer, Principal Contractor (CDM 2015 roles, recognised under BSA 2022 with extra duties), plus Accountable Person and Principal Accountable Person for the occupation phase.</li>
              <li><strong>Golden thread</strong> — structured digital information about the building, accurate and current, accessible to dutyholders and BSR, maintained throughout the building's life.</li>
              <li><strong>Safety case</strong> — for occupied HRRBs, formal documented case demonstrating that all reasonable steps have been taken to manage building safety risks. Submitted to BSR for the Building Assessment Certificate.</li>
              <li><strong>Mandatory occurrence reporting</strong> — duty to report safety occurrences to BSR.</li>
              <li><strong>Competence requirements</strong> — designers and contractors on HRRBs must demonstrate competence to a higher standard than general construction.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The golden thread — what it actually requires"
            plainEnglish="A digital, accurate, accessible, current information set for the building. Maintained throughout its life. Available to the BSR, the dutyholders and anyone working on the building."
            onSite="The golden thread is not just the design pack at handover. It is a living information set that the dutyholders update every time the building changes. The L3 designer's role is to deliver a thread-ready as-installed pack at handover."
          >
            <p>
              The golden thread requirements (in summary; consult HSE / BSR guidance for the
              definitive scope):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Digital</strong> — paper-only is not sufficient. Must be in digital format that supports search, structured access and lifetime persistence.</li>
              <li><strong>Accurate</strong> — reflects the actual current state of the building. As-installed updates and ongoing change updates required.</li>
              <li><strong>Accessible</strong> — available to the dutyholders, the BSR and (within reason) the residents. Format must be openable without specialist tooling.</li>
              <li><strong>Current</strong> — updated whenever the building changes. Stale information is a breach of the golden thread duty.</li>
              <li><strong>Structured</strong> — organised so information can be found by topic, system, location or component. BIM-based delivery is well-suited; structured PDFs with indexes are also acceptable.</li>
              <li><strong>Comprehensive</strong> — covers the building's design, construction, alterations, maintenance and safety case. Includes risk assessments, residents' engagement records, complaints handling records.</li>
            </ul>
            <p>
              The L3 designer's contribution is the as-installed electrical pack at handover, in
              a format that supports the golden thread duty. That typically means structured PDF
              plus IFC / Revit native files (if the project ran on BIM), with a clear index and
              metadata that lets the dutyholders find any item quickly.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 132 (Design), generally"
            clause="The electrical equipment and installations shall be so designed as to ensure: (i) the protection of persons, livestock and property in accordance with Part 4; (ii) the proper functioning of the installation for its intended use. The information indicated in Regulations 132.2 to 132.16 shall be taken into account when designing an electrical installation."
            meaning={
              <>
                Section 132 is the umbrella under which the L3 designer's whole duty sits — and
                it does not end at handover. The Section 132 design duty includes Reg 132.13
                (documentation), which sets the lifetime sufficiency floor. On HRRBs the BSA
                2022 golden thread duty layers on top of Reg 132.13: the documentation must be
                not only sufficient (Reg 132.13) but also digital, accurate, accessible, current
                and structured (BSA 2022). The two duties run in parallel; satisfying both is
                the standard for HRRB design work.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Section 132 (Regulations 132.1 to 132.16)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Dutyholders — Accountable Person and Principal Accountable Person"
            plainEnglish="The named owners of the building's safety case during occupation. They maintain the golden thread, manage risks, engage residents and answer to the BSR."
          >
            <p>
              BSA 2022 names the Accountable Person (AP) and Principal Accountable Person (PAP)
              as the dutyholders for occupied HRRBs. Their duties include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maintain the safety case</strong> — keep the documented case for the building's safety current.</li>
              <li><strong>Maintain the golden thread</strong> — keep the building information accurate and accessible.</li>
              <li><strong>Manage building safety risks</strong> — assess, control and review the structural and fire safety risks throughout occupation.</li>
              <li><strong>Engage residents</strong> — implement the residents' engagement strategy, handle complaints, communicate about safety.</li>
              <li><strong>Report mandatory occurrences</strong> — notify the BSR of specified safety incidents.</li>
              <li><strong>Cooperate with BSR audits</strong> — provide information for the Building Assessment Certificate process.</li>
            </ul>
            <p>
              The L3 designer hands the as-installed electrical pack to the AP / PAP at handover
              (typically through the building owner). From that point the AP / PAP is responsible
              for keeping the electrical content current as the building changes — but they may
              come back to the original designer with questions. Maintain professional contact
              details in the pack and respond to such queries within reasonable time as part of
              the designer's residual duty.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="HRRB residential block — golden thread compliance at handover"
            situation={
              <>
                You are the L3 electrical designer for the M&E consultancy on an HRRB project — a
                new-build 12-storey residential block with 96 flats, plus ground-floor concierge
                and plant rooms. Construction is complete; handover is in 4 weeks. The Principal
                Accountable Person (PAP) is the building owner's facilities management arm. The
                BSR will audit the safety case for the Building Assessment Certificate within
                12 months of occupation. Your firm has produced the design through a BIM workflow
                in Revit on Autodesk Construction Cloud; the install team red-lined deviations
                throughout construction.
              </>
            }
            whatToDo={
              <>
                Plan handover as a 4-week structured exercise, not a 1-day handoff. (1) Run the
                as-installed update across the whole pack — review every red-line, re-run
                affected calcs, update the SLD, schedules, layouts and Circuit Charts to as-installed
                revisions. (2) Compile the O&M manual contributions — operating instructions for
                each system, maintenance schedule, isolation procedures, spare parts list. (3)
                Compile the CDM Health and Safety File contributions — residual hazards, design
                choices that control them, information for future modifications, information for
                safe maintenance, end-of-life information. (4) Prepare the golden thread package
                — structured PDF set with full index, native Revit files, IFC export, machine-
                readable schedule data (CSV or JSON for the schedules). Format must support
                lifetime accessibility. (5) Prepare the safety-case contribution — electrical
                risk evidence (earthing, AFDD provision, fire-stopping at electrical penetrations,
                emergency lighting design, fire detection wiring, residual risks). (6) Run an
                internal QC review — second engineer signs off the pack as complete and
                consistent. (7) Hand over to the PAP through a formal handover meeting. PAP
                signs receipt; designer retains master copies. (8) Brief the PAP's facilities
                team on how to use the pack — where to find what, how to update, how to contact
                the original designer for questions. (9) After handover, retain master copies
                indefinitely (or for at least the building's lifetime under PI policy) and
                respond to PAP queries within reasonable time.
              </>
            }
            whyItMatters={
              <>
                HRRB handover is the highest-stakes design pack closeout in UK practice. The BSA
                2022 makes the golden thread a legal duty; the BSR can audit the safety case
                throughout the building's life. The L3 designer's pack quality at handover is the
                evidence base for that audit and for any future investigation if something goes
                wrong. A clean, structured, complete pack protects the designer, supports the
                PAP through occupation, gives future contractors what they need to alter safely,
                and stands up to BSR scrutiny. A scrappy pack at HRRB handover is the start of
                a multi-year compliance problem that only gets worse with time. The 4-week
                investment at handover protects everyone in the chain for decades.
              </>
            }
          />

          <SectionRule />

          <CommonMistake
            title="Designer hands over the pack, deletes their copy, considers the project closed"
            whatHappens={
              <>
                The L3 designer treats handover as the end of their involvement. They hand the
                full pack to the building owner and delete their working copies to free up server
                space. Eight years later a PI claim arrives — the customer's solicitor alleges a
                Vd calc error caused equipment damage. The original calc files are gone. The
                designer has no contemporaneous evidence of what they actually calculated. The PI
                insurer settles in the claimant's favour because there is no defence material.
              </>
            }
            doInstead={
              <>
                Retain the as-installed pack and all working files for the design life of the
                installation plus the legal limitation period — typically 25 years plus 6 years
                (simple contract) or 12 years (deed). Modern digital storage makes this trivial.
                Most firms store on a long-term archive system with structured naming and
                redundancy. Hand over copies to the building owner; keep your masters. PI policies
                often condition cover on retention of relevant project records — losing the
                records can void cover.
              </>
            }
          />

          <ConceptBlock
            title="Retention and ongoing duty after handover"
            plainEnglish="The L3 designer's responsibility does not end at handover. Retain master copies for decades. Respond to future questions. Contribute to BSR safety-case audits on HRRBs."
          >
            <p>
              Retention and ongoing duty:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Retention period</strong> — design life of the installation (typically 25 years for fixed wiring) plus the legal limitation period (6 years for breach of contract, 12 years if executed as a deed). Total typically 25 to 37 years. PI insurers may require shorter or longer; check policy.</li>
              <li><strong>Storage format</strong> — digital archive with structured naming, version control and redundancy. Cloud archive (Glacier, Azure Archive, S3 Deep Archive) is cost-effective for long-term storage. PDF + native files + IFC ensure tool independence.</li>
              <li><strong>Future query response</strong> — respond to PAP, building owner or future contractor queries within reasonable time. This is part of the professional duty even after the contract has closed.</li>
              <li><strong>BSR safety-case contribution</strong> — on HRRBs the original designer may be approached for evidence during BSR audits. Maintain reasonable cooperation as part of professional standards.</li>
              <li><strong>PI cover</strong> — maintain professional indemnity insurance with run-off cover after retirement. Most PI policies have retroactive cover that depends on continuous insurance from the original date of design work.</li>
              <li><strong>CPD on retained projects</strong> — when BS 7671 amendments change the regulatory landscape (A4:2026 brought significant changes), the designer's retained projects do not become non-compliant — they remain compliant with the edition they were designed under. But the designer should understand the changes well enough to advise PAPs and building owners on whether retro-fit work is recommended.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Handover is the formal transfer of the project's knowledge package from the design and construction team to the building owner. Reg 132.13 sets the sufficiency floor; CDM 2015 adds the Health and Safety File; BSA 2022 adds the golden thread on HRRBs.",
              "The handover pack includes: as-installed design pack, EIC and supporting schedules, O&M manual, CDM Health and Safety File, RFI register, change order log, manufacturer documentation, commissioning records, and (on HRRBs) golden thread information.",
              "The as-installed update is the designer's responsibility. Installer red-lines deviations; designer reviews, re-runs affected calcs, updates SLD / schedules / layouts, marks revision, re-issues. Reg 644.1.1 makes this a precondition of EIC issue.",
              "The Operations and Maintenance manual (O&M) is the operational handbook for the building owner. The CDM 2015 Health and Safety File is the residual-risk record. Both are mandatory; can be combined or separate.",
              "The Building Safety Act 2022 introduces the golden thread duty for higher-risk residential buildings (HRRBs — broadly 18 m or seven storeys and above). Information must be digital, accurate, accessible, current and structured throughout the building's life.",
              "The Accountable Person and Principal Accountable Person are the BSA 2022 dutyholders during occupation. They maintain the golden thread, manage building safety risks, engage residents and answer to the Building Safety Regulator.",
              "Designers retain master copies of the as-installed pack for the design life of the installation plus the legal limitation period — typically 25 to 37 years. PI cover often depends on retention. The duty to respond to future queries continues after handover.",
              "Section 132 of BS 7671 sets the L3 designer's overall design duty — and Reg 132.13 within it sets the lifetime documentation sufficiency duty. On HRRBs the BSA 2022 golden thread duty layers on top: documentation must be both sufficient and digital / accurate / accessible / current / structured.",
            ]}
          />

          <Quiz
            title="Handover, as-installed and golden thread — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module6-section6-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.4 BIM, AutoCAD, Revit, Trimble overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section landing <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 6 — Documentation + drawings
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
