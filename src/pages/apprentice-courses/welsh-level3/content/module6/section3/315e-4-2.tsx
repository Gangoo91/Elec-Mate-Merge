/**
 * Ported from the English course, combining:
 *   level3/module6/section6/Sub3.tsx
 *   level3/module4/section4/Sub5.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

const checks = [
  {
    id: 'm6-s6-sub3-rfi-trigger',
    question:
      'Which of the following SHOULD trigger a formal RFI rather than a verbal call between site and designer?',
    options: [
      "The installer wants to fit a different manufacturer's socket-outlet of identical rating, finish and specification to the one on the schedule.",
      'The installer needs to know which morning to start second fix so they can book labour, with no change to the design itself.',
      'The installer is choosing the order in which to pull cables on a single distribution board and wants to confirm the sequence.',
      'The installer needs a sub-main re-routed around an unforeseen beam, lengthening the cable 42 m to 51 m and pushing Vd toward the 5 percent ceiling.',
    ],
    correctIndex: 3,
    explanation:
      'An RFI exists for changes that affect the design — anything that may move a calc, a cable spec, a device rating or a regulation compliance line. A route change that pushes voltage drop is exactly the case. Brand-equivalent substitutions of like-for-like spec do not need an RFI; they are normal install discretion. The test is: does this change require the designer to re-run a calc, update a schedule or sign off a deviation? If yes, it is an RFI.',
  },
  {
    id: 'm6-s6-sub3-three-roles',
    question:
      'BS 7671 splits installation responsibility into three roles. Which combination is correct?',
    options: [
      'Client under Reg 132, contractor under Reg 134.1.1, and Building Control under Part 6 — the three parties named on the Building Notice.',
      'Designer under Reg 132, constructor under Reg 134.1.1, and inspector / tester under Part 6 — one person on a small job, three on a large one.',
      'Apprentice under Reg 132, electrician under Reg 134.1.1, and supervisor under Part 6 — the three site grades sharing responsibility.',
      'Manufacturer under Reg 132, wholesaler under Reg 134.1.1, and installer under Part 6 — the three points in the supply chain.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 names three deliberately separable responsibilities: design (Reg 132), construction (Reg 134.1.1), and inspection and testing (Part 6, Chapter 64). The EIC has a separate signature box for each. On a small domestic CU swap one electrician fills all three boxes; on a hospital wing fit-out the three are different people from different organisations. The structural separation is the same regardless of whether one person or three sign.',
  },
  {
    id: 'm6-s6-sub3-rfi-format',
    question: 'A formal RFI should ALWAYS include which of the following?',
    options: [
      'Only the question itself in plain text, sent by email — no number, drawing references or closeout section needed.',
      'Only the cost and programme impact, with the technical question and drawing references recorded on a separate sheet.',
      'A unique number, date, raised-by, drawing references, the proposed change, response date and a closeout section.',
      'Only the name of the designer who must answer it, with the actual question discussed verbally afterwards.',
    ],
    correctIndex: 2,
    explanation:
      'A formal RFI is a self-contained record. The unique number lets it be tracked through the project log. The drawing references show which document the question relates to. The proposed change with sketch lets the designer assess without a site visit. The closeout section captures the answer, the name of the designer who answered, and any revisions triggered. Without this structure the RFI becomes an undocumented chat that nobody can audit.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is an RFI in design and construction practice?',
    options: [
      'A Request For Insurance — the form the contractor submits to the PI insurer before starting any design-and-build package.',
      'A Request For Information — the formal documented question raised when site reality needs the designer to clarify, decide or amend the design.',
      'A Rapid Fault Investigation — the procedure followed on site when a circuit fails during commissioning of the installation.',
      'A Routine Fire Inspection — the periodic check of fire-stopping and escape-route compliance during the construction phase.',
    ],
    correctAnswer: 1,
    explanation:
      "An RFI is the question-and-answer record between the construction team and the design team. It exists because no design is perfect and site always meets reality the design did not anticipate. The RFI captures the question, the proposed change, the designer's decision and any drawing revisions — it is the audit trail of why the build is what it is.",
  },
  {
    id: 2,
    question: 'Why is the RFI process structured rather than verbal?',
    options: [
      'Because verbal communication is banned on construction sites under CDM 2015, so every instruction of any kind must be written down by law.',
      'Because a verbal RFI costs the contractor a call-out charge, whereas a written one is free — so the structure is purely a cost-control measure.',
      'Because verbal changes leave no audit trail, and Reg 644.1.1 needs documentation matching the install that a phone call cannot produce.',
      'Because the designer is not allowed to speak to site staff directly, so all questions must be routed through a written form to the project manager first.',
    ],
    correctAnswer: 2,
    explanation:
      'Verbal change is the single largest source of EIC validity problems. Six months after a job, nobody remembers what the phone call decided, who agreed it, or whether the calc was re-run. The RFI structure forces every change through a paper trail that survives. Reg 644.1.1, CDM 2015 designer duty, and Building Safety Act 2022 golden thread all need that trail.',
  },
  {
    id: 3,
    question: 'On a typical commercial fit-out, who can RAISE an RFI?',
    options: [
      'Only the Principal Designer — RFIs can be raised solely by the named design dutyholder, and everyone else routes their questions through them.',
      'Only the client — RFIs are a contractual instrument reserved for the appointing party to query the design team during the works.',
      'Only Building Control — RFIs are the mechanism the inspector uses to ask the designer for clarification during a site visit.',
      'Anyone in the construction chain who needs design clarification or wants to propose a change to the design team.',
    ],
    correctAnswer: 3,
    explanation:
      'RFIs are deliberately open at the raise end because design questions arise from anyone touching the work. The closeout end is restricted — only the responsible designer can answer an RFI that affects their design. Open raise, controlled close is the pattern that surfaces issues early without creating a bottleneck on questions.',
  },
  {
    id: 4,
    question:
      'What is the typical SLA (service-level agreement) on RFI closeout for a commercial fit-out?',
    options: [
      'Typically 5 working days for non-urgent RFIs and 24 hours for urgent ones, set by the contract, with missed SLAs triggering escalation.',
      'There is no SLA — the designer answers RFIs whenever convenient, since the contract never sets a response deadline.',
      'A fixed 28 days for every RFI regardless of urgency, matching the period allowed for remedial work on an EICR.',
      'Within the hour for all RFIs — the contract requires an immediate response to every query no matter how minor.',
    ],
    correctAnswer: 0,
    explanation:
      'RFI SLAs are normally written into the construction contract. 5 working days for non-urgent and 24 hours for urgent is the typical commercial benchmark. Designers who miss SLAs slow the install and become the contractual cause of delay; designers who answer too quickly without checking the calc become the cause of safety issues. The discipline is to acknowledge fast and answer correctly within SLA.',
  },
  {
    id: 5,
    question:
      'Which BS 7671 regulation makes the EIC conditional on the design pack matching the install at handover?',
    options: [
      'Reg 132.13 — the design documentation requirement, which states the EIC cannot issue unless the install matches the pack.',
      'Reg 644.1.1 — any defect or omission revealed during inspection and testing must be corrected before the Certificate issues, and a pack that disagrees with the install is a defect.',
      'Reg 514.9.1 — the per-DB chart requirement, which makes the EIC conditional on the circuit chart matching the installation.',
      'Reg 134.1.1 — the workmanship requirement, which states the EIC depends on the install matching the design pack.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 644.1.1 is the regulatory backstop for the RFI workflow. If the install diverged from the design and the design pack was not updated, the install reveals as defective when the tester compares it to the documentation. The fix is to update the documentation through the RFI workflow at the time of the change, not to scramble at handover. RFIs done well make Reg 644.1.1 trivial; RFIs skipped make it expensive.',
  },
  {
    id: 6,
    question:
      "Under the Building Safety Act 2022, the 'golden thread' of information includes which of the following?",
    options: [
      'Only the final EIC and its supporting schedules — the golden thread is just the certification pack with no drawings, calculations or change history.',
      'Only the fire-safety documentation — the golden thread covers cladding, escape routes and fire-stopping but excludes the electrical design records.',
      "All design information — drawings, calculations, schedules, RFIs, as-installed and O&M records — kept current for the building's life and accessible to its dutyholders.",
      'Only the as-built model in BIM format — the golden thread is the 3D model alone, with paper drawings and RFIs explicitly excluded.',
    ],
    correctAnswer: 2,
    explanation:
      'The golden thread is the BSA 2022 requirement that higher-risk residential buildings (HRRBs) carry a continuous, accessible record of every design and construction decision throughout their life. RFIs are part of that record because they are how design decisions are communicated and confirmed during construction. The lesson on the Building Safety Act covers the golden thread in detail; the RFI workflow in this lesson is what feeds it.',
  },
  {
    id: 7,
    question: "What is 'chain of accountability' in the design-construct-inspect model?",
    options: [
      'The sequence in which materials pass from manufacturer to wholesaler to installer — tracing a cable from factory to wall for warranty purposes.',
      'The order in which circuits are energised at commissioning — life-safety first, then critical, then general loads, recorded as a switching sequence.',
      'The list of operatives who worked on the job each day, signed in and out on the site register for attendance and pay records.',
      'The named-person trail across the three BS 7671 roles — designer, constructor and inspector of record — each accountable for the work in their box.',
    ],
    correctAnswer: 3,
    explanation:
      'Chain of accountability is the named-person trail through the three BS 7671 declarations on the EIC. Each name is accountable for the work in that role. The chain is what makes accident investigation, insurance claims and Building Safety Regulator audits work — the regulator can name the responsible person for any phase of the build.',
  },
  {
    id: 8,
    question: 'An installer signs the construction declaration on the EIC. They are certifying:',
    options: [
      'That the construction work for which they were responsible is, to the best of their knowledge and belief, in accordance with BS 7671 — not the design, which is a separate box.',
      "That the design itself complies with BS 7671 — the construction declaration is the designer's certificate of the calculations and device selection.",
      'That the inspection and testing has been carried out and the results recorded — the construction declaration covers the verification stage.',
      'That the whole installation including design, construction and testing is compliant — one signature certifies all three responsibilities at once.',
    ],
    correctAnswer: 0,
    explanation:
      "The construction declaration is specifically about workmanship — that the install was carried out competently, with correct materials, to acceptable standards and in accordance with the design pack. It does not certify the design (designer's box) and does not certify the inspection and testing (inspector's box). Each signature certifies its own scope. Honesty about scope is what the EIC structure requires.",
  },
];

const faqs = [
  {
    question: 'Are RFIs only for big commercial jobs, or do small jobs need them too?',
    answer:
      'Scope to the job. A small domestic CU upgrade rarely needs formal RFIs — the designer and installer are usually the same person and decisions are made in real time. The discipline only matters when the design and construction roles are separate. For two-electrician jobs, a quick written note in a shared messaging app (date, change, agreement, photo of the affected drawing area) is the proportionate version of an RFI. For a multi-disciplinary commercial fit-out, full RFI tooling on a Common Data Environment (CDE) is the norm. The principle is auditability — produce enough record that anyone investigating six months later can reconstruct the decision.',
  },
  {
    question: 'What software do most projects use for RFI management?',
    answer:
      'Common Data Environment (CDE) platforms — Procore, Asite, BIM 360 (now Autodesk Construction Cloud), Aconex, Viewpoint For Projects — all carry built-in RFI modules with auto-numbering, SLA tracking, drawing-link cross-references and audit trails. Smaller jobs run RFIs as numbered emails or in a shared spreadsheet. The platform matters less than the discipline; what matters is unique numbering, traceable closeout, and revision-controlled drawing links.',
  },
  {
    question: "What happens when the designer disagrees with the installer's proposed change?",
    answer:
      "The designer's role is to assess against BS 7671 and the design intent. If the proposal is non-compliant or reduces design margin below acceptable, the designer says no and proposes an alternative. The installer cannot override the designer on a safety or compliance point — Reg 134.1.1 makes the installer responsible for executing the design as specified, not for substituting a non-compliant alternative. If the disagreement is about cost or speed rather than compliance, the conversation moves to the project manager and customer; the designer's compliance line is the floor.",
  },
  {
    question: 'How does the RFI workflow interact with CDM 2015 designer duties?',
    answer:
      "CDM 2015 makes the designer responsible for eliminating, reducing or controlling foreseeable risks during construction, maintenance, cleaning, alteration, demolition and use. RFIs that propose changes affecting any of those risk profiles trigger the designer's CDM duty — the response must show that the change has been assessed for new risks, that the design risk register has been updated, and that residual risks have been communicated to the constructor and (via the Health and Safety File) to the building owner. RFIs are one of the routine touchpoints where CDM duty is discharged.",
  },
  {
    question: "What is a 'change order' and how does it differ from an RFI?",
    answer:
      "An RFI is a question. A change order (also called a variation or VO) is the formal contractual record of a change in scope, cost or programme. They are related: most change orders start as RFIs that the designer answers with 'yes, change is approved'; the project manager then raises a change order to capture the cost and programme impact. The RFI is the technical record (what changed, why); the change order is the commercial record (what it cost, who pays, what it does to the programme). Both are needed; the RFI is the designer's tool, the change order is the project manager's.",
  },
  {
    question: 'What does the Building Safety Act 2022 add to RFI practice on HRRBs?',
    answer:
      "For higher-risk residential buildings (HRRBs — broadly residential buildings 18 m or seven storeys and above), the BSA 2022 makes the design and construction phases formally gated by the Building Safety Regulator. RFIs that affect the building's safety case must be retained as part of the golden thread of information that survives the building's lifetime. The Principal Designer (a CDM role) is now also a named dutyholder for the BSR. RFIs on HRRBs are higher-stakes than commercial fit-out RFIs — they need rigorous closeout, full traceability and integration into the building's safety case file.",
  },
];

const checks2 = [
  {
    id: 'mod4-s4-sub5-rectification-record',
    question: "What's the minimum content of a rectification report after a fault diagnosis job?",
    options: [
      'Just the final invoice. Once the customer has paid for the work the invoice is the only record that matters; the symptom, diagnosis, readings and recommendations are working notes that can be discarded once the job is done and paid for.',
      "Only the post-rectification test readings. The readings prove the circuit is compliant at handover, which is all the firm needs; the customer's symptom, the root cause and any recommendations add nothing to a defensible record.",
      'Reported symptom, diagnostic steps with readings, root cause, rectification carried out, post-rectification verification readings, and residual recommendations.',
      'A photograph of the repaired component, before and after. A pair of photos proves the work was carried out, which covers the firm in any dispute, so there is no need for a written record of the symptom, readings or recommendations.',
    ],
    correctIndex: 2,
    explanation:
      "Six items make a defensible rectification record: (1) the customer's symptom in their own words, (2) diagnostic steps with instrument readings, (3) the root cause identified, (4) the rectification carried out (parts replaced, terminations re-made, settings adjusted), (5) post-rectification verification readings (R1+R2, IR, Zs, RCD trip times as applicable), (6) residual concerns or recommendations. The record is your evidence the work was diagnosed properly, fixed competently and verified before leaving site. Skipping any item leaves a gap a future complaint will exploit. The post-rectification readings prove the fix actually worked — not just that something was changed.",
  },
  {
    id: 'mod4-s4-sub5-variation-order',
    question: 'When does a variation order (VO) need to be raised mid-job?',
    options: [
      'Only at the very end of the job, once you know the final price. The VO is raised after the work so it can carry the exact final figure; raising it mid-job would commit the customer to an estimate that might change, so you wait until everything is finished and present it with the invoice.',
      'Whenever the work scope departs from the original quote or instruction.',
      'Only on commercial contracts. Domestic customers are covered by the original quote whatever happens on site, so a VO is never needed in a house; you simply carry out whatever the fault turns out to need and bill the difference at the end.',
      'Never — a variation order is a design-stage document for new installations. On a fault repair you are restoring an existing circuit, not altering a design, so there is no scope change to capture and a VO does not apply.',
    ],
    correctIndex: 1,
    explanation:
      "A VO is needed whenever scope departs from the quote — e.g. the quote covered one tripping RCBO but you find a high-resistance joint upstream that also needs splicing, or the £180 quote becomes a £450 fix. It captures what changed and why, the new cost, and the customer's written or text authorisation. No VO = no authority = the customer can refuse the difference and the firm wears the loss. The format is short; a domestic 'OK to proceed?' text is enough, a commercial job wants a signed VO form. VOs prevent the 'I never agreed to that' dispute.",
  },
  {
    id: 'mod4-s4-sub5-cert-choice',
    question:
      'You replaced one tripping RCBO and re-made two terminations on a kitchen radial. What certificate do you issue?',
    options: [
      'A Minor Works Certificate, because the work alters an existing circuit without creating a new one.',
      'An Electrical Installation Certificate (EIC) — any work that touches a consumer-unit device requires the full EIC because you have altered the protection. Swapping an RCBO and re-terminating a circuit is a major works event, so the single-page Minor Works form is not adequate.',
      'An Electrical Installation Condition Report (EICR) — because you have tested an existing circuit, the correct output is a condition report with C1/C2/C3 codes. The MWC is only for brand-new circuits, so a repair on an existing circuit is recorded on an EICR.',
      'No certificate at all — a like-for-like RCBO swap and re-termination is routine maintenance, not an alteration, so it falls outside the certification requirement. You simply note the work on the job sheet and take payment.',
    ],
    correctIndex: 0,
    explanation:
      'An MWC covers the altered circuit, the tests performed (continuity of CPC and ring conductors as applicable, IR, Zs, RCD trip time on the replaced device) and the conclusion that the circuit complies after the work. Reg 644.1 makes a certificate mandatory after any work that alters or extends an installation. The EIC is for new installations; the EICR is for periodic inspection. Issuing the wrong form, or none, is a Reg 644 breach and a scheme-provider compliance issue.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      "Why does the rectification report need to capture the customer's reported symptom verbatim, not paraphrased?",
    options: [
      "It doesn't — paraphrasing is preferred because your professional interpretation is more accurate than the customer's vague description. Translating 'lights go funny' into 'intermittent lighting fault' on the record is the correct practice, and the customer's exact words add nothing.",
      "The customer's exact words are objective evidence of what they reported, where your paraphrase is only an inference.",
      "Because BS 7671 requires the customer's exact words on the Minor Works Certificate as a mandatory field. The certificate is invalid without a verbatim symptom in the designated box, so the only reason to capture it is to complete the form correctly.",
      "Because the customer's verbatim words determine which certificate you issue. A symptom described as a 'shock' forces an EICR, while one described as 'flickering' allows an MWC, so the exact wording is what decides the paperwork route rather than the nature of the work.",
    ],
    correctAnswer: 1,
    explanation:
      "Verbatim records the customer's actual experience (useful if the fault recurs and they describe it differently next time), protects the firm if they later claim they reported something else, and helps a different engineer who attends later. Your interpretation is an inference; their words are evidence — on any dispute that lands in court or insurance, the verbatim record is what the firm relies on. Quote them in inverted commas, then your interpretation underneath; date, time and medium the entry.",
  },
  {
    id: 2,
    question:
      'A customer authorises extra work verbally on site but refuses to sign anything. What do you do?',
    options: [
      'Refuse to do the extra work under any circumstances. Without a physically signed variation order there is no valid authorisation, so a verbal yes is worthless; tell the customer you can only proceed once they sign a printed VO form on the spot.',
      "Just do the work on the strength of the verbal yes and invoice afterwards. A spoken agreement is legally binding, so no written trail is needed; the customer's word on site is enough to defend the charge if they later dispute it.",
      "Proceed only after turning the verbal yes into a written trail — text a summary and get the customer's reply confirming it.",
      'Add the extra work to the invoice without mentioning it and let the customer query it if they notice. They authorised it verbally, so it is fair to bill it; raising it again in writing only invites them to change their mind.',
    ],
    correctAnswer: 2,
    explanation:
      "Do the work only if the verbal authorisation is genuine, then immediately text or email a summary — 'You authorised the additional kitchen ring repair at £180, total now £350, please reply YES' — and follow up by phone if there's no reply. In-person authorisation plus written summary plus customer reply gives enough evidence to invoice and defend the charge; if you can't get any written trail, walk away from the extra scope. Even a thumbs-up reply is enough evidence. Keep the messaging on the firm phone or business email — personal WhatsApp loses evidential weight.",
  },
  {
    id: 3,
    question:
      'After repairing a single faulty switch on an existing lighting circuit, what tests do you carry out before issuing the MWC?',
    options: [
      'No tests at all — a single switch swap is too small to need verification. Just confirm the light turns on and off, sign the MWC, and leave; running continuity, IR and Zs on a one-switch job is disproportionate.',
      'Only a visual inspection. Look at the new switch, check it is wired the same way as the old one, and that is sufficient evidence for the MWC; instrument tests are reserved for new circuits, not accessory swaps.',
      'Only an insulation-resistance test at 500 V. The switch swap could only have damaged the insulation, so a single IR reading covers it; continuity, polarity and Zs are unnecessary because the existing circuit already passed those when first installed.',
      'Continuity, insulation resistance, polarity, Zs and (if RCD-protected) RCD trip time on the affected circuit.',
    ],
    correctAnswer: 3,
    explanation:
      "The proportionate MWC test set on the affected circuit is: continuity of CPC at the switch (R2 or R1+R2 if accessible); IR L-E and N-E with switch closed and lamps removed (or 250 V if electronics present); polarity at the switch and lamp positions; Zs at the switch (no-trip mode if RCD-protected); and RCD trip time upstream if the circuit is RCD-protected. The work was small but the verification confirms the circuit is still BS 7671 compliant. The principle is to verify the work hasn't introduced or left a fault — a swap that looks trivial may have disturbed an adjacent termination, and the test set catches it.",
  },
  {
    id: 4,
    question:
      "The customer is non-technical and wants to understand 'what was wrong' after a fault repair. What's the right way to brief them?",
    options: [
      'A three-part plain-English brief: what was happening, what we did, and what to watch for, backed by a written summary.',
      'Give them the full technical detail so they understand it properly. Read out the Zs reading, the Table 41.3 limit, the IR value and the relevant BS 7671 regulation numbers; a customer who hears the precise figures will be reassured the job was done thoroughly.',
      "Say as little as possible. The customer won't understand the wiring, so the professional approach is to tell them it is 'all sorted now' and move on; explaining the fault only risks confusing them or inviting more questions.",
      'Hand them the Minor Works Certificate and let them read it. The certificate already records the fault and the test results, so pointing them to it is the clearest brief; there is no need to explain anything verbally.',
    ],
    correctAnswer: 0,
    explanation:
      "The three parts in worked form: WHAT WAS HAPPENING — 'your kitchen RCBO was tripping because of a small earth leak from a damaged terminal in the ceiling rose'; WHAT WE DID — 'we replaced the terminal, re-tested and confirmed the leak is gone'; WHAT TO WATCH FOR — 'call us if it trips again in the next month'. Reg 132.13 documentation is one half, the verbal brief the other. Plain English means no jargon ('Type B 32 A RCBO with Zs of 0.6 ohms' becomes 'the breaker that protects your kitchen'). The written summary backs up the verbal brief.",
  },
  {
    id: 5,
    question: 'What goes wrong if you skip the variation order on a job that grows in scope?',
    options: [
      'Nothing — skipping the VO simply saves time. As long as the work is done safely and tested properly, the absence of a variation order has no consequence; the customer pays the final invoice regardless of whether the extra scope was agreed in advance.',
      'Charge disputes, unauthorised-work claims, ambiguous scope in any insurance dispute, audit discrepancies and a broken relationship.',
      'The Minor Works Certificate becomes invalid. The MWC must reference the variation order number, so without a VO the certificate cannot be issued and the work is unrecorded; the only consequence is a missing certificate, not a payment dispute.',
      'Building Control rejects the job. A variation order is the document the competent-person scheme submits to Building Control, so skipping it means the work is never notified; the firm gets a compliance failure but the customer is unaffected.',
    ],
    correctAnswer: 1,
    explanation:
      "Without a VO the customer can dispute the extra charge (no signed authority), claim you did unauthorised work (even necessary safety work), leave scope ambiguous in an insurance dispute, fail a scheme-provider audit on the quote-vs-invoice discrepancy, and the relationship breaks down. The fix is 5 minutes: 'while investigating I found X, which needs Y, additional cost £Z, OK to proceed?' — document the answer, proceed or revert. Skipping the VO is the most common cause of small-job disputes.",
  },
  {
    id: 6,
    question:
      "What's the difference between an MWC and an EIC, and why does that matter for a repair job?",
    options: [
      'There is no real difference — MWC and EIC are interchangeable forms and you can use whichever your certification software defaults to. On a repair job you simply pick one; the scheme provider accepts either, so the choice is a matter of habit.',
      'The MWC is for domestic work and the EIC is for commercial work. The forms are split by property type, not by the nature of the work, so a single-circuit repair in a house always takes an MWC and the same repair in an office always takes an EIC.',
      'The MWC covers single-circuit alterations or repairs; the EIC covers new installations or major works — so a single-circuit repair takes an MWC.',
      'The EIC is issued before the work and the MWC after it. The EIC is a design certificate confirming what you intend to do, and the MWC confirms it was completed; on a repair you issue both, the EIC first and the MWC at handover.',
    ],
    correctAnswer: 2,
    explanation:
      "The MWC is a single-page form for additions or alterations to an existing circuit that don't form a new circuit (socket additions, fitting swaps, termination repairs, single accessory/device replacement). The EIC is a multi-page form (with full Schedule of Inspections and Test Results) for new installations or major works — new circuits, full CU upgrades, substantial rewires. For a single-circuit fault repair the MWC is correct; an EIC would be over-certification and may misrepresent the scope. Issuing the wrong form can invalidate warranty / insurance / scheme registration. Reg 644.1 makes certification mandatory; the form follows the nature of the work.",
  },
  {
    id: 7,
    question:
      "A customer asks you to write 'no fault found' on the certificate after you've genuinely been unable to reproduce a reported intermittent fault. What's the professional response?",
    options: [
      "Write exactly what the customer asked — 'no fault found' and nothing more. The customer is paying, so you record the phrase they requested; adding detail about the symptom or your tests only complicates the certificate and is unnecessary.",
      'Refuse to issue any certificate at all. If you could not reproduce the fault there is nothing to certify, so you simply leave site, charge for the visit, and tell the customer to call again if it happens; putting anything in writing would expose the firm.',
      "Invent a plausible fault and a fix so the certificate looks complete. Customers expect a result, so record a likely cause such as a 'loose terminal, re-made' even though you found nothing; this satisfies the customer and avoids an awkward 'no fault found' entry.",
      'Document honestly: record the reported symptom, that no fault reproduced, the passing tests, and a recommendation to capture recurrence data.',
    ],
    correctAnswer: 3,
    explanation:
      "Intermittent faults may not present during the visit. The record should capture the reported symptom, that no fault reproduced under current conditions, that all tests are within BS 7671 limits with full readings as Schedule, and a recommendation that the customer logs date/time/conditions of any recurrence and contacts you for a return visit. Document what you DID find and what you DIDN'T — 'no fault found' alone is too brief and may be challenged later. That's a defensible record and a fair customer relationship.",
  },
  {
    id: 8,
    question:
      'Why does a repair certificate need to identify the specific instrument used (make, model, serial number, last calibration date)?',
    options: [
      'It is the audit trail proving the instrument was appropriate, in calibration, and capable — without it the result is unverifiable.',
      "It doesn't really matter which instrument is recorded — any MFT gives the same reading, so the fields are just a formality. You can leave them blank or enter a generic 'Megger MFT' and the certificate is still valid.",
      'Because the customer needs the serial number to register a warranty on the test instrument. The instrument details on the certificate let the customer claim against the meter manufacturer if a reading is later found to be wrong, which is the sole reason the fields exist.',
      'So the next electrician knows which instrument to borrow. Recording the make and model tells a future engineer what meter the firm owns, helping them plan their own visit; the calibration date and serial number are optional extras with no audit purpose.',
    ],
    correctAnswer: 0,
    explanation:
      "Reg 643.2 requires test instruments appropriate to the test and in calibration, and you must be able to evidence that. The instrument ID (make, model, serial, last calibration date) lets a disputed result be independently verified against the calibration certificate, and scheme providers (NICEIC, NAPIT, Stroma) audit for it as evidence of competent practice. Without it, the result is your word against the world. Certification software auto-fills the fields from the firm's instrument register — but verify the right instrument is recorded for the work you actually did.",
  },
];

const faqs2 = [
  {
    question: 'Do I have to issue a certificate for every repair, even tiny ones?',
    answer:
      "Yes, in principle. BS 7671 Reg 644.1 requires certification for any addition or alteration to an installation. A repair that involves disturbing terminations, swapping a device, or otherwise altering the installation falls within that — and the right form is usually a Minor Works Certificate. The exception is genuinely like-for-like maintenance on equipment (e.g. swapping a blown lamp) which doesn't alter the installation. If in doubt, issue an MWC — over-certification is a minor inconvenience, under-certification is a Reg 644 breach.",
  },
  {
    question: "What's the practical difference between a verbal customer brief and a written one?",
    answer:
      "Both are needed. Verbal brief — happens at the end of the visit, customer present, plain English explanation of what was wrong, what you did, what to watch for. Helps the customer understand and feel informed. Written brief — typically the back of the MWC or a separate job summary, captures the same content for the customer's records and for the firm's audit trail. Verbal alone forgets within hours; written alone feels impersonal. The combination — verbal at handover, written on the certificate / job sheet — is professional standard.",
  },
  {
    question: "How do I price additional work mid-job without sounding like I'm gouging?",
    answer:
      "Honest, transparent, and timed before doing the work. 'I've had a look and the fault is more involved than the quote — instead of just the RCBO swap, I need to investigate the upstream cable. Best estimate is another £180 for the investigation; if it leads to additional work I'll quote that separately before doing it. OK to proceed?' Customer says yes or no, you proceed or revert. The transparency removes the gouging perception. Quoting after the fact is what creates disputes; quoting before is what builds trust.",
  },
  {
    question:
      "What if the customer refuses to authorise additional work that's actually a safety issue?",
    answer:
      "Document the refusal carefully and consider escalation. Standard wording for the certificate: 'Additional remedial work recommended: [describe]. Customer declined to authorise on date [X]. Customer briefed on the implications, including [briefly the risk]. Existing installation remains in service at customer's election.' If the issue is C1 (immediate danger), the firm should consider whether to make safe (isolate the affected circuit) regardless of the customer's preference — and document why. EAWR Reg 4(2) puts the duty on the duty holder, but the firm has its own EAWR Reg 16 competence duty if it leaves a known danger in service.",
  },
  {
    question: "Can a customer's text reply count as authorisation for a variation?",
    answer:
      "Yes, in most domestic and small commercial contexts. The legal test is whether the customer made an informed agreement to the additional work. A clear text — 'You authorised the additional kitchen ring repair at £180, total now £350, please reply YES to confirm' followed by 'YES' from the customer — is contractually sound. Larger commercial contracts may require a formal signed VO form per the contract terms. For everything else, a clear text exchange archived on a business phone is sufficient evidence.",
  },
  {
    question: 'What if I find another fault while fixing the one I was called for?',
    answer:
      "Three options depending on the seriousness. (1) Trivial finding (e.g. a cracked accessory plate) — note on the job sheet, brief the customer verbally, no immediate action. (2) Significant finding (e.g. an undersized CPC on an adjacent circuit) — stop, brief the customer, raise a VO if they want it addressed now or a separate quote if they want it later, document either way. (3) Immediate danger (e.g. a live exposed conductor in a junction box) — make safe immediately (isolate the circuit, don't leave the danger in service), brief the customer urgently, document the make-safe and the recommended remediation, escalate to your supervisor. The L3 apprentice is competent to identify and report; the supervisor / qualified electrician makes the final call on what to do beyond making safe.",
  },
];

export default function Lesson315E_4_2() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The Request For Information lifecycle is the documented question-and-answer process that
        keeps BS 7671 Reg 132 (design), Reg 134.1.1 (construction) and Part 6 (inspection and
        testing) coordinated when site reality meets the design. Get the workflow right and Reg
        644.1.1 becomes trivial at handover.
      </p>

      <TLDR
        points={[
          "An RFI (Request For Information) is the formal documented question raised when site reality needs the designer to clarify, decide or amend the design. It captures the question, the proposed change, the designer's decision and any drawing revisions — the audit trail of why the build is what it is.",
          'BS 7671 splits installation responsibility into three deliberately separable roles: designer (Reg 132), constructor (Reg 134.1.1) and inspector / tester (Part 6, Chapter 64). The EIC has a separate signature box for each.',
          'The chain of accountability is the named-person trail across the three roles. Designer of record, constructor of record, inspector of record. Each is accountable for the work in their box; the chain is auditable end-to-end.',
          'Reg 644.1.1 makes the EIC conditional on the design pack matching the install. RFIs done well at the time of change keep the pack and the install aligned. RFIs skipped force a scramble at handover.',
          "On HRRBs under the Building Safety Act 2022, RFIs feed the golden thread of information that survives the building's lifetime. The discipline is higher-stakes; the workflow is the same.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Define a Request For Information (RFI) and explain when one should be raised rather than handled verbally.',
          'Draft a structured RFI with all standard fields — number, date, drawing references, proposed change, requested response date, closeout section.',
          'Explain the BS 7671 chain of accountability across designer (Reg 132), constructor (Reg 134.1.1) and inspector / tester (Part 6) roles.',
          'Manage an RFI through its lifecycle — raise, acknowledge, technical review, response, drawing revision if triggered, closeout, file in the project record.',
          'Cite BS 7671 Reg 644.1.1 as the regulatory hook that makes RFI discipline part of EIC validity.',
          'Describe how the RFI workflow integrates with CDM 2015 designer duties and Building Safety Act 2022 golden thread requirements on HRRBs.',
          'Apply RFI SLAs (5 working days non-urgent, 24 hours urgent on most commercial contracts) and escalate when SLAs cannot be met.',
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
          construction team — typically the install electrician, site supervisor, M&E coordinator
          or specialist subcontractor — to the design team when site reality requires a design
          clarification, decision or change. The designer's response, captured in the same record,
          is the official answer.
        </p>
        <p>
          RFIs exist because no design is perfect. Sites surface unforeseen structural
          constraints, late client changes, supplier substitutions, fire engineer overrides,
          coordination clashes, and small adjustments that nobody anticipated at design stage.
          Each one is a question for the designer. Without the RFI structure the questions get
          answered by phone or text, the answers are not recorded, and six months later nobody can
          reconstruct why the build is what it is.
        </p>
        <p>
          An RFI also serves as the gate for cost and programme conversations. Most change orders
          start as RFIs that get answered yes-with-changes. The RFI captures the technical
          decision; the change order that follows captures the commercial impact. Both are needed;
          the RFI sits at the designer's end of the chain.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The standard RFI fields"
        plainEnglish="Every RFI carries the same fields. Unique number, date, drawing references, question, proposed change, sketch if helpful, requested response date, designer's response, drawing revisions triggered."
      >
        <p>A complete RFI form, whether on a CDE platform or a paper form, carries:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>RFI number</strong> — unique per project (e.g. RFI-2026-014). Sequential and
            never reused.
          </li>
          <li>
            <strong>Project reference</strong> — project number, project name, contract reference.
          </li>
          <li>
            <strong>Raised by</strong> — name and role of person raising (e.g. Site Supervisor, J.
            Smith).
          </li>
          <li>
            <strong>Date raised</strong> — calendar date and time stamp.
          </li>
          <li>
            <strong>Drawing / document references</strong> — every drawing or document the
            question relates to, with revision letter (e.g. SLD Rev C, Cable Schedule Rev C,
            Layout L-G-01 Rev B).
          </li>
          <li>
            <strong>Question / proposed change</strong> — clear statement of the issue and any
            proposed solution. Photographs and sketches attached.
          </li>
          <li>
            <strong>Reason</strong> — why the change is needed (e.g. unforeseen structural beam,
            fire engineer revision, customer scope change, supplier discontinued part).
          </li>
          <li>
            <strong>Urgency</strong> — Standard / Urgent / Work-stopping. Drives the SLA.
          </li>
          <li>
            <strong>Requested response date</strong> — calendar date by which the response is
            needed to avoid programme impact.
          </li>
          <li>
            <strong>Cost or programme impact assessed</strong> — initial assessment if known; left
            blank if assessment depends on the response.
          </li>
          <li>
            <strong>Designer response</strong> — the answer, signed and dated by the responsible
            designer.
          </li>
          <li>
            <strong>Drawing revisions triggered</strong> — list of documents updated as a result,
            with new revision letters.
          </li>
          <li>
            <strong>Closeout date</strong> — date the RFI was formally closed.
          </li>
          <li>
            <strong>Audit trail</strong> — full history of opens, edits and views, captured
            automatically on a CDE.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
        clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
        meaning={
          <>
            The Reg 132.1 framework is the documentation hook for the whole project record,
            including the RFI register. RFIs are part of the documentation that explains why the
            install is what it is — they record the determinations made under Regs 132.2–132.5 —
            and they must survive in the operations and maintenance pack so future designers can
            read them. A design pack with no RFI register is a pack that has hidden every change
            behind closed doors and fails the Chapter 13 sufficiency test.
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
            <strong>Designer (Reg 132)</strong> — the person responsible for producing the design
            that satisfies BS 7671 and the project requirements. Outputs: SLD, schedules, circuit
            charts, calculations, layouts, design risk register, design pack. Signs the design
            declaration on the EIC.
          </li>
          <li>
            <strong>Constructor (Reg 134.1.1)</strong> — the person responsible for executing the
            design on site. Inputs: design pack, materials, labour, programme. Outputs: installed
            work, RFIs raised, red-line as-installed mark-ups, construction record. Signs the
            construction declaration on the EIC.
          </li>
          <li>
            <strong>Inspector / tester (Part 6, Chapter 64)</strong> — the person responsible for
            verifying that the install matches the design and complies with BS 7671. Inputs:
            design pack, installed work. Outputs: schedule of inspections, schedule of test
            results, EIC. Signs the inspection and testing declaration on the EIC.
          </li>
        </ul>
        <p>
          On a small CU swap one electrician fills all three boxes. On a hospital wing fit-out the
          three are different people from different organisations who may never meet. The
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
            Regulations 132.2 through 132.16 list the design considerations that the designer must
            take into account — supply characteristics, nature of demand, conductors, wiring
            systems, protective measures, isolation and switching, accessibility, documentation,
            and so on. Any RFI response that changes one of these considerations engages the
            designer's accountability under Section 132. The response must be made by the designer
            (or with the designer's authority) and recorded.
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
          Chain of accountability is the named-person trail across the three BS 7671 declarations
          on the EIC. Each name carries:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identity</strong> — full name and contact details of the responsible
            individual.
          </li>
          <li>
            <strong>Position</strong> — job title and organisation.
          </li>
          <li>
            <strong>Qualifications</strong> — relevant qualifications evidencing competence (e.g.
            a relevant Level 3 electrotechnical qualification, competent-person scheme membership,
            professional institution membership).
          </li>
          <li>
            <strong>Date of signature</strong> — when the responsibility was accepted.
          </li>
          <li>
            <strong>Scope</strong> — the work for which the named person is accepting
            responsibility.
          </li>
        </ul>
        <p>
          The chain is what makes accident investigation, insurance claims and Building Safety
          Regulator audits work. If something fails, the regulator can name the responsible person
          for any phase of the build and ask them to account for the decisions made. That is why
          honesty about scope at signature time matters — signing for work you did not do or did
          not check is the single most common cause of professional indemnity claims that go badly
          for the signatory.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The RFI lifecycle</ContentEyebrow>

      <ConceptBlock
        title="Lifecycle stages — raise, acknowledge, review, respond, revise, close"
        plainEnglish="Six stages from the question being asked to the closeout being filed. Each has an owner, an SLA and a record."
      >
        <p>The standard RFI lifecycle:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Raise</strong> — site team identifies the issue, drafts the RFI with drawing
            references, sketch, photo and proposed change, sets urgency, submits via the CDE or
            email. Unique number assigned automatically or by the design office.
          </li>
          <li>
            <strong>Acknowledge</strong> — design office confirms receipt within 24 hours,
            allocates the RFI to the responsible designer, sets the response SLA. Site has
            certainty that the question is in the system.
          </li>
          <li>
            <strong>Technical review</strong> — responsible designer reviews the question against
            the design, runs any necessary calc, checks against BS 7671 and the project's other
            compliance lines (BS 5266, BS 5839, Part L, fire engineer's strategy, BMS interfaces).
          </li>
          <li>
            <strong>Respond</strong> — designer drafts the response, including any conditions or
            qualifications. Response includes a clear yes / no / yes-with-changes decision and the
            technical justification. Response is signed and dated.
          </li>
          <li>
            <strong>Revise</strong> — if the response triggers drawing or schedule changes, the
            designer updates the affected documents, marks the new revision, logs the change in
            the revision history, and re-issues. The RFI captures which documents were revised and
            to what new revision letter.
          </li>
          <li>
            <strong>Close</strong> — site team confirms receipt of response and any revised
            documents. RFI is marked closed in the register. The closed RFI joins the project
            record permanently.
          </li>
        </ol>
        <p>
          On a typical commercial fit-out the cycle takes 3 to 5 working days for a Standard RFI,
          24 hours for an Urgent RFI, and 4 hours or less for a Work-stopping RFI. The SLAs are
          written into the contract and breach has cost and programme consequences.
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
        <p>Three urgency tiers cover most commercial contracts:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Standard (5 working days)</strong> — the default. Used for questions that do
            not affect the immediate work face. Designer has time to consult colleagues, run a
            full calc, and respond properly.
          </li>
          <li>
            <strong>Urgent (24 hours)</strong> — used when the response is needed to keep the next
            1 to 3 days of work on programme. Designer prioritises but still has space for proper
            review.
          </li>
          <li>
            <strong>Work-stopping (4 hours or by end of working day)</strong> — used when the site
            is currently unable to proceed pending the response. Reserved for genuine
            work-stopping cases. Triggers immediate designer engagement and may bypass normal
            review queues.
          </li>
        </ul>
        <p>
          Misuse of urgency is itself a discipline issue. A site team that flags everything as
          Urgent loses the trust of the design office and finds genuine urgent items getting the
          same treatment as the rest. The designer can challenge inflated urgency by acknowledging
          at the lower tier with a brief explanation. The contract typically includes an
          escalation route if urgency cannot be agreed.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>RFI quality — what good looks like</ContentEyebrow>

      <ConceptBlock
        title="A good RFI vs a bad RFI"
        plainEnglish="A good RFI lets the designer answer it from the desk without a site visit. A bad RFI sends the designer to site to ask the same question."
      >
        <p>
          A good RFI carries enough information for the designer to assess and respond without
          going to site. The features:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Specific drawing references</strong> — exact drawings and revision letters
            quoted, not 'the SLD' or 'the layout'.
          </li>
          <li>
            <strong>Photo of the issue</strong> — the actual condition on site, with reference to
            a known landmark for orientation.
          </li>
          <li>
            <strong>Sketch of the proposed change</strong> — the install team's proposed solution,
            drawn over the existing drawing if possible.
          </li>
          <li>
            <strong>Quantified impact</strong> — measured length change, count of accessories
            affected, route described in metres or millimetres.
          </li>
          <li>
            <strong>Reason explained</strong> — why the change is needed (structural beam, fire
            engineer revision, customer scope, supplier issue).
          </li>
          <li>
            <strong>Constraint stated</strong> — what cannot move (programme date, customer-facing
            zone, fire compliance line).
          </li>
        </ul>
        <p>
          A bad RFI says 'cable route problem on G floor, please advise'. A good RFI says
          'sub-main cable from DB-G1 to DB-G2 (Cable Schedule row CBL-DB-G1-SUB Rev C, length 42
          m, route shown on Layout L-G-02 Rev B) cannot follow the designed route through Grid B-3
          because of a 200 mm structural downstand we did not see on the structural drawing.
          Proposed re-route shown on attached sketch, additional length approximately 9 m. Please
          confirm cable size and Vd still acceptable, or specify alternative.' The second one can
          be answered in 30 minutes from a desk.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Verbal change agreements that never become RFIs"
        whatHappens={
          <>
            The site supervisor phones the designer to discuss a route change. The designer says
            'yes, fine, increase the cable to the next size up'. Neither party writes it down. Six
            months later at the EIC stage the tester finds the install does not match the SLD. The
            designer does not recall the call. The site team insists they got approval. Nobody can
            prove what was agreed. The EIC is held under Reg 644.1.1 until the install or the
            documentation is brought into line at the project's expense.
          </>
        }
        doInstead={
          <>
            Every design change goes through the RFI workflow, even if it starts as a phone call.
            A reasonable workflow: phone discussion to scope the question, designer says 'OK,
            raise an RFI, I will respond formally within 24 hours', site raises the RFI within the
            hour, designer responds in writing within 24 hours. The phone call is the unblock; the
            RFI is the record. Without the record, Reg 644.1.1 has no evidence to accept.
          </>
        }
      />

      <CommonMistake
        title="RFI raised but designer never closes the loop on drawing revisions"
        whatHappens={
          <>
            The designer responds to RFI 014 with 'change approved, increase cable to 25 mm sq'
            but never updates the SLD or the cable schedule. The install team installs the new
            cable but the design pack still shows the old size. At handover the schedule disagrees
            with the install — the EIC is held until the schedule is updated.
          </>
        }
        doInstead={
          <>
            The designer's response is not finished until the affected documents are revised and
            re-issued. Make 'drawing revisions triggered' a mandatory field on the RFI form so it
            cannot close without the designer naming the affected documents and their new
            revisions. CDE platforms enforce this automatically; spreadsheet RFI logs need a
            manual discipline.
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
          The RFI register is the project's master log of every question ever raised. On a CDE
          platform it is a built-in dashboard. On a smaller project it lives in a shared
          spreadsheet. Either way the columns are:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>RFI number</strong> — unique sequential reference.
          </li>
          <li>
            <strong>Date raised</strong> — when the question entered the system.
          </li>
          <li>
            <strong>Raised by</strong> — who asked it.
          </li>
          <li>
            <strong>Subject</strong> — short description of the question.
          </li>
          <li>
            <strong>Drawing references</strong> — drawings the question relates to, with
            revisions.
          </li>
          <li>
            <strong>Urgency tier</strong> — Standard / Urgent / Work-stopping.
          </li>
          <li>
            <strong>SLA target date</strong> — when the response is due.
          </li>
          <li>
            <strong>Status</strong> — Open / In Review / Awaiting Information / Closed.
          </li>
          <li>
            <strong>Allocated to</strong> — responsible designer.
          </li>
          <li>
            <strong>Date responded</strong> — when the response was issued.
          </li>
          <li>
            <strong>Drawing revisions triggered</strong> — documents updated, with new revision
            letters.
          </li>
          <li>
            <strong>Date closed</strong> — when the RFI was formally closed.
          </li>
          <li>
            <strong>Cost or programme impact</strong> — initial assessment captured by project
            manager.
          </li>
        </ul>
        <p>
          The register is the source of truth at any moment about the project's open questions. It
          is read every morning by the project manager, the design lead and the site supervisor.
          SLA breach on any open RFI triggers an escalation conversation. At project closeout the
          register is a required deliverable in the operations and maintenance pack and (on HRRBs)
          the safety case file.
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
            Reg 644.1.1 is the regulatory backstop for the RFI workflow. If the install diverged
            from the design pack and the divergence was not captured through RFIs and associated
            drawing revisions, the inspector finds disagreement at handover. That is a defect or
            omission for the purposes of this regulation, and the EIC cannot issue until either
            the install is brought back to the design or the documentation is updated to
            as-installed and re-issued. RFIs done well at the time of change make Reg 644.1.1
            trivial; RFIs skipped force a documentation scramble at handover at the worst possible
            moment.
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
            sub-main is 16 mm sq XLPE/SWA — the SLD shows 25 mm sq XLPE/SWA. Voltage drop on the
            sub-main is now beyond the design tolerance and downstream Zs measurements are close
            to Table 41.3 ceilings. The customer wants accountability.
          </>
        }
        whatToDo={
          <>
            The investigator goes to the project record. The RFI register is searched for any
            approved cable substitution on the sub-main. RFI 027 is found: site raised that 25 mm
            sq stock was unavailable and proposed substitution to 16 mm sq subject to designer
            approval. The designer responded 'rejected, source 25 mm sq from alternative supplier,
            no substitution to 16 mm sq under any circumstance, Vd margin too tight'. The site
            supervisor's signature on the closeout confirms receipt of the rejection. But the
            install was completed with 16 mm sq anyway. The installer then signed the construction
            declaration on the EIC certifying that the construction was in accordance with BS 7671
            and the design — knowing that the substitution was rejected. The chain of
            accountability puts the installer on the hook for the EIC misrepresentation; the
            designer is in the clear because the RFI rejection is on the record. The customer
            pursues the installer's organisation and their PI insurer.
          </>
        }
        whyItMatters={
          <>
            This is exactly why the chain of accountability and the RFI workflow exist together.
            The named designer carries design accountability; the named constructor carries
            construction accountability; the inspector and tester carries verification
            accountability. When something goes wrong, the regulator and the courts trace back
            through the documented record. A designer who maintains rigorous RFI discipline can
            prove what they did and did not approve. A constructor who deviates from a rejected
            RFI and signs the EIC anyway is exposed to professional negligence, EIC fraud and PI
            claim consequences. The discipline protects everyone in the chain who plays straight.
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
          design, construction and occupation. The Building Safety Regulator (BSR) approves the
          design at gateway 2 and approves the building for occupation at gateway 3. The golden
          thread of information must be maintained throughout the building's life.
        </p>
        <p>
          RFIs on HRRBs are part of the golden thread because they are how design decisions get
          made and recorded during construction. Specific implications:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Retention</strong> — RFI register and individual RFIs retained for the
            building's lifetime, accessible to the dutyholders for the building.
          </li>
          <li>
            <strong>Material design changes</strong> — any change that affects the safety case may
            need to be re-presented to the BSR. RFIs are the trail of those changes.
          </li>
          <li>
            <strong>Principal Designer dutyholder</strong> — the Principal Designer (a CDM 2015
            role, also recognised under BSA 2022) is now a formal dutyholder for the design; their
            RFI responses carry that weight.
          </li>
          <li>
            <strong>Competence requirements</strong> — designers on HRRBs must demonstrate
            competence to a higher standard; RFI responses are part of the evidence the BSR can
            sample to confirm competence.
          </li>
        </ul>
        <p>
          The lesson on the Building Safety Act covers the golden thread in detail. The RFI
          workflow in this lesson is the day-to-day
          mechanism that feeds it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          "An RFI (Request For Information) is the formal documented question raised when site reality requires a design clarification, decision or change. The designer's response, captured in the same record, is the official answer.",
          'RFIs exist because no design is perfect. Without the RFI structure, change happens by phone call, the answers are not recorded, and Reg 644.1.1 has no evidence at handover.',
          'BS 7671 splits installation responsibility into three deliberately separable roles: designer (Reg 132), constructor (Reg 134.1.1) and inspector / tester (Part 6, Chapter 64). Each signs a separate declaration on the EIC.',
          'Chain of accountability is the named-person trail across the three EIC declarations. Each name carries identity, position, qualifications and scope. The chain is auditable end-to-end.',
          'The RFI lifecycle has six stages: raise, acknowledge, technical review, respond, revise, close. Each stage has an owner, an SLA and a record. Standard 5 working days, Urgent 24 hours, Work-stopping 4 hours.',
          'A good RFI lets the designer respond from the desk — specific drawing references, photo, sketch, quantified impact, reason and constraint. A bad RFI sends the designer to site to ask the same question.',
          "The RFI register is the project's master log. Sortable, filterable, auditable. Required deliverable in the operations and maintenance pack at handover; lifetime retention on HRRBs.",
          'Reg 644.1.1 makes the EIC conditional on the design pack matching the install. RFIs done well at the time of change keep the pack and the install aligned. The chain of accountability puts the named person on the hook for any deviation that ends up on the EIC.',
        ]}
      />

      <Quiz
        title="RFI workflow and chain of accountability — knowledge check"
        questions={quizQuestions}
      />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Closing out a fault diagnosis job — write up the rectification, raise a variation order if
        scope has grown, issue the right certificate (Minor Works or amended EIC), and brief the
        customer in language they can act on. The discipline that turns a diagnostic visit into a
        defensible record + a satisfied customer.
      </p>

      <TLDR
        points={[
          "A rectification record needs six items: customer's verbatim symptom, diagnostic steps with readings, root cause, work done, post-work verification readings, residual concerns. Skipping any leaves a defence gap.",
          'Variation orders are mandatory whenever scope departs from the original quote. Text-message authorisation is fine for domestic; signed VO for commercial. No VO = no authority = customer can refuse to pay.',
          'Single-circuit alterations / repairs need a Minor Works Certificate. EIC is for new installations; EICR is for periodic inspection. Wrong form = Reg 644 breach.',
          'Customer brief is verbal at handover + written on the certificate. Plain English: what was wrong, what we did, what to watch for. Reg 132.13 documentation is the legal half; the verbal brief is the relationship half.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Produce a rectification report covering symptom, diagnosis, root cause, work performed, verification readings, and residual recommendations.',
          'Raise a variation order when work scope departs from the original quote and capture customer authorisation in a defensible form.',
          'Select the appropriate certificate (Minor Works Certificate, amended EIC, EICR) based on the nature of the work performed.',
          'Carry out the proportionate test set after a repair (continuity, IR, polarity, Zs, RCD trip times) and record results on the certificate.',
          'Brief the customer verbally at handover in plain English — what was wrong, what was done, what to watch for.',
          'Document customer refusal to authorise recommended work, with brief on implications and escalation route where the issue is a safety risk.',
          'Apply Reg 132.13 documentation duties to repair work — circuit chart updates, test method notices, recommended next inspection date.',
          'Identify the instrument used on the certificate (make / model / serial / last calibration) per Reg 643.2 and scheme provider audit requirements.',
        ]}
        initialVisibleCount={4}
      />

      <ContentEyebrow>The rectification record — what good looks like</ContentEyebrow>

      <ConceptBlock
        title="Six items, every rectification, every time"
        plainEnglish="The job's not done when the fault is fixed — it's done when the record is complete. A rectification record that defends the firm in any future dispute and supports any future engineer attending the same installation has six fixed items. Skip any one and the record's got a hole."
        onSite="Use a job-sheet template that prompts for all six. Most firms' diagnostic software (ServiceM8, Tradify, ElectricalCert.app, Powered Now) builds them into the workflow so you can't forget. If you're on paper, write a six-row template at the top of every job sheet and tick off as you go."
      >
        <p>The six items in order:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reported symptom — verbatim.</strong> The customer's own words in inverted
            commas. "Lights flicker when fridge starts" not "intermittent lighting issue".
          </li>
          <li>
            <strong>Diagnostic steps with readings.</strong> What you did, in order, with the
            instrument readings. "1. Visual inspection at CU — RCBO 4 (kitchen ring) labelled
            tripped; 2. R1+R2 at furthest socket = 0.62 Omega expected; 3. IR L-E = greater than
            200 MOhm; 4. Zs at furthest socket = 0.65 Omega — pass."
          </li>
          <li>
            <strong>Root cause identified.</strong> What the actual fault was, why it caused the
            symptom. "Marginal crimp on CPC at socket position 3 — high R2 contribution under load
            caused breaker overload trip during fridge inrush."
          </li>
          <li>
            <strong>Rectification carried out.</strong> What you replaced / re-made / adjusted.
            "Re-made socket position 3 termination with hydraulic crimp tool. Replaced damaged
            grommet. Closed up enclosure."
          </li>
          <li>
            <strong>Post-rectification verification readings.</strong> The proof the fix worked.
            "Post-fix: R1+R2 at socket 3 = 0.55 Omega (was 0.85 Omega), Zs at furthest = 0.58
            Omega (was 0.65 Omega), RCBO held under fridge inrush x 5 cycles."
          </li>
          <li>
            <strong>Residual concerns / recommendations.</strong> Anything you noticed but didn't
            fix. "Customer to monitor; if breaker trips again within 30 days, contact us.
            Recommend EICR within next 12 months — installation is 22 years old and other circuits
            not within scope of today's visit."
          </li>
        </ol>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 644.1 (Initial verification certification)"
        clause="On completion of any installation work, the person responsible for the work shall provide an Electrical Installation Certificate (EIC) or, in the case of an addition or alteration to an existing installation, a Minor Electrical Installation Works Certificate (MWC), to the person ordering the work."
        meaning={
          <>
            Reg 644.1 is the legal source of the certification duty. Any addition or alteration —
            including fault repair work — triggers the requirement to issue a certificate. The MWC
            is the right form for single-circuit alterations / repairs. The EIC is for new
            installations or significant new circuits. Issuing nothing — even on a small repair —
            is a Reg 644 breach.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Variation orders — protecting both sides</ContentEyebrow>

      <ConceptBlock
        title="When the job grows, the paperwork has to grow with it"
        plainEnglish="A variation order (VO) is a short written record that captures (a) what changed from the original quote, (b) why it changed, (c) what the new cost is, (d) the customer's agreement to proceed. Without a VO, the firm has no authority for the additional work and the customer can legitimately refuse to pay. With a VO, both sides are protected."
        onSite="Most disputes on small jobs come from missing VOs. The 5-minute conversation feels awkward at the time but prevents hours of argument later. Standard format is short — a sentence or two on what changed, the new price, customer's text reply confirming. On a domestic job, a quick text exchange is enough; on commercial, the firm's contract usually mandates a signed VO form."
      >
        <p>The standard VO content set:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Original scope and price.</strong> "Original quote: replace tripping RCBO on
            kitchen circuit, GBP 95 plus parts."
          </li>
          <li>
            <strong>Variation — what changed.</strong> "On investigation found high resistance
            joint on upstream cable at junction box J3, which is the underlying cause of the RCBO
            trip. Recommended additional work: re-make joint at J3."
          </li>
          <li>
            <strong>New scope and price.</strong> "Additional work: 1 hour labour plus parts = GBP
            85. Total revised price: GBP 180 plus parts."
          </li>
          <li>
            <strong>Customer authorisation.</strong> Signature, text reply, or email confirming
            "OK to proceed". Date / time / medium recorded.
          </li>
          <li>
            <strong>Schedule impact.</strong> If the additional work pushes the job past the
            original time slot, note it (and re-confirm with the customer if it affects them).
          </li>
        </ul>
        <p>
          For the customer's text reply to count as authorisation, the firm's text needs to be
          clear and complete — not just "extra work needed?" but "[describe], additional cost GBP
          X, total now GBP Y, please reply YES to authorise". The explicit yes / no makes the
          contract sound.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Choosing the right certificate</ContentEyebrow>

      <ConceptBlock
        title="MWC vs EIC vs EICR — the three certificate decision"
        plainEnglish="There are three core BS 7671 certificate forms, and choosing the right one matters for legal, scheme-compliance, and customer-record reasons. MWC for single-circuit alterations and repairs. EIC for new installations or major new work. EICR for periodic inspection of an existing installation. Each has its place and they're not interchangeable."
        onSite="Most fault diagnosis work generates an MWC because you're altering an existing circuit (re-terminating, swapping a device, repairing a damaged section). New circuits or major rewires generate an EIC. Inspection visits generate an EICR. The form follows the nature of the work, not the firm's preference."
      >
        <p>Decision matrix for the typical fault-diagnosis outputs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>
              Single-circuit fault repair (re-terminate, swap device, replace damaged section).
            </strong>
            Minor Works Certificate. Single-page form. Tests on the affected circuit only.
          </li>
          <li>
            <strong>Multiple-circuit repair on the same visit (e.g. two RCBOs failed).</strong>
            Multiple MWCs (one per circuit) OR a single MWC with both circuits referenced — check
            your firm's standard practice. Some scheme providers prefer one MWC per circuit for
            clarity.
          </li>
          <li>
            <strong>
              New circuit added (e.g. dedicated kitchen radial added during the repair visit).
            </strong>
            EIC for the new circuit. The new circuit is a fresh installation, not an alteration.
            MWC alongside if other existing circuits were also altered.
          </li>
          <li>
            <strong>
              Full CU upgrade (replacement of the consumer unit, new RCBOs, all circuits
              re-tested).
            </strong>
            EIC for the new CU and re-verified circuits. The CU upgrade is a substantive
            installation event.
          </li>
          <li>
            <strong>
              Inspection-only visit (no installation work, just verifying condition).
            </strong>
            EICR. Records condition with C1 / C2 / C3 codes. No installation work is permitted
            under an EICR scope without separate certification.
          </li>
          <li>
            <strong>"Make safe" only (isolated a dangerous circuit, no remediation yet).</strong>
            Job sheet with the make-safe described, plus an MWC if you altered the circuit (e.g.
            fitted a temporary blanking plate). Recommend EICR or further investigation in
            writing.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 651.3 (Periodic inspection and testing — safety and instruments)"
        clause="Periodic inspection and testing shall not cause danger to persons or livestock and shall not cause damage to property or equipment even if the circuit is defective. Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no less a degree of performance and safety."
        meaning={
          <>
            Reg 651.3 puts a positive duty on the inspector to use suitable instruments per BS EN
            61557 (or equivalent), and to ensure inspection and testing does not cause danger or
            damage even if the circuit is defective. The certificate has to identify the specific
            instrument used — make, model, serial number, last calibration date. This is what lets
            the test results be trusted and audited. Most firms use certification software that
            auto-fills the instrument fields from the firm's instrument register; verify the right
            instrument is recorded for the actual work.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 65, Regulation 651.3."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
        clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
        meaning={
          <>
            A repair is an alteration in scope of Reg 132.16. The documentation handed to the user
            — MWC, an updated circuit chart if anything changed, the customer brief in writing,
            manufacturer literature for new devices fitted — is the evidence that the rating and
            condition of the existing equipment was ascertained to be adequate for the altered
            circumstances. Without that pack, the user cannot discharge their ongoing EAWR Reg
            4(2) maintenance duty and the next contractor cannot discharge their Reg 132.16 duty
            on the next change.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 — full text from published amendment."
      />

      <SectionRule />

      <ContentEyebrow>The customer brief — verbal + written</ContentEyebrow>

      <ConceptBlock
        title="The three-part plain-English handover"
        plainEnglish="The customer paid for a job and a story. The job is the fix; the story is what was wrong, what you did, and what they should watch for. A clear three-part brief at the end of the visit — in language the customer can repeat to a partner / family member — turns a transactional visit into a relationship."
        onSite="Standard structure: WHAT WAS HAPPENING (in their language), WHAT WE DID (in their language), WHAT TO WATCH FOR (one or two specific things). Two minutes at the end of the job. Then back it up with a written summary on the certificate or job sheet they get to keep."
      >
        <p>The three-part brief in worked example form:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>WHAT WAS HAPPENING.</strong> "Your kitchen breaker — the one labelled 'kitchen
            ring' on the consumer unit — was tripping because there was a small earth leak from a
            damaged terminal in the ceiling rose at the back of the room. Once the fridge motor
            kicked in, the extra current pushed it over the edge and the breaker cut out for
            safety."
          </li>
          <li>
            <strong>WHAT WE DID.</strong> "We replaced the damaged terminal, re-tested the whole
            kitchen circuit, and confirmed the leak is gone. The breaker should now hold with all
            your normal kitchen appliances running."
          </li>
          <li>
            <strong>WHAT TO WATCH FOR.</strong> "If the breaker trips again in the next month —
            even just once — give us a call straight away. That would suggest there's a related
            issue we should look at. After 30 days without a trip, you can treat it as fully
            fixed."
          </li>
        </ul>
        <p>
          Add a written summary to the job sheet / MWC the customer keeps. Same three points, one
          line each. Reg 132.13 calls for the documentation to support the customer's ongoing safe
          use of the installation; the verbal + written brief is how that gets done in practice.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Reg 132.13 documentation — what the customer leaves with"
        plainEnglish="Reg 132.13 puts a duty on the installer / inspector to give the user the information they need to operate, maintain, inspect and test the installation safely. After a repair this typically means a small documentation pack — the certificate, an updated circuit chart if anything changed, and the customer brief."
        onSite="Most domestic customers won't actively read the documentation pack but they will keep it. The duty is discharged by giving them the information; what they do with it is their EAWR Reg 4(2) ongoing-duty problem. Hand the pack over physically or email it as a PDF — get a confirmation either way."
      >
        <p>Standard documentation pack after a fault repair:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>The MWC (or EIC).</strong> Including all required test results, instrument
            identification, signatory and date.
          </li>
          <li>
            <strong>Updated circuit chart, if applicable.</strong> If the repair changed anything
            about the circuit identification, RCD coverage, or device rating, update the chart at
            or near the consumer unit per Reg 514.9.
          </li>
          <li>
            <strong>Job summary / customer brief.</strong> The three-part brief in writing — what
            was happening, what we did, what to watch for.
          </li>
          <li>
            <strong>Recommended next inspection date.</strong> If the installation is approaching
            its next EICR (typically 10 years for owner-occupied domestic, 5 years for rented),
            note it and recommend timing.
          </li>
          <li>
            <strong>Any safety observations.</strong> Things you noticed but didn't fix, anything
            that warrants a follow-up quote, anything the customer should know about the wider
            installation.
          </li>
          <li>
            <strong>Manufacturer literature.</strong> If you fitted a new device (RCBO, AFDD,
            surge protector), include the manufacturer's user information. Most are downloadable
            PDFs you can email straight from the device datasheet page.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Doing extra work without raising a variation order"
        whatHappens={
          <>
            You're on a quoted fault repair (GBP 95 to swap a tripping RCBO). Mid-job you discover
            the upstream cable has a high-resistance joint that's the actual root cause. You think
            — "I'm already here, I'll just sort it out, it's only another hour" — and do the
            additional work without telling the customer. You invoice GBP 180. Customer disputes,
            says they only authorised GBP 95. You can't evidence the authorisation for the extra
            work. Firm has to write off GBP 85. Worse — customer tells friends they got "an
            unexpected bill" and the firm loses two more potential jobs from the network effect.
            The 5-minute VO conversation would have prevented all of it.
          </>
        }
        doInstead={
          <>
            The moment you realise the scope has grown, stop and have the conversation. "I've had
            a look and the fault is more involved than the original quote. Instead of just the
            RCBO swap I need to re-make a joint upstream — best estimate is another GBP 85, total
            job GBP 180. OK to proceed?". Customer says yes or no. If yes, send a confirmation
            text from the firm phone "You authorised additional kitchen ring repair at GBP 85,
            total now GBP 180" and ask them to reply YES. Then proceed. The 3 minutes of
            conversation + 1 minute of texting protects everyone.
          </>
        }
      />

      <CommonMistake
        title="Issuing no certificate because 'it was only a small repair'"
        whatHappens={
          <>
            You re-terminated a damaged socket. Hand over to the customer, take payment, leave. No
            certificate issued — "it's only a re-termination, not worth the paperwork". Six months
            later the socket fails again, customer claims you never repaired it properly, demands
            a refund. You have no evidence the repair was carried out competently — no test
            results, no instrument record, no description of work. Firm is on the back foot in any
            dispute. Scheme provider audit later picks up the missing certificate and the firm
            gets a non-conformance against its registration. Reg 644.1 was breached.
          </>
        }
        doInstead={
          <>
            Issue an MWC for any installation work. Modern certification software (NICEIC Online,
            Easy Certs, ElectricalCert.app, Stroma EasyCert) makes the MWC a 5-minute exercise —
            pre-fills installer / instrument / standard text, you fill in the test results and
            circuit details, customer signs (or you email them the PDF), done. The MWC is your
            evidence the work was carried out, tested, and verified. Without it, you have nothing.
          </>
        }
      />

      <Scenario
        title="Closing out a kitchen ring repair — the full handover"
        situation={
          <>
            Domestic call-out — customer reported "kitchen breaker trips when I use the kettle and
            toaster together". You arrived this morning, diagnosed a high-resistance joint on the
            kitchen ring at junction box behind the cooker, raised a variation order because the
            original quote was just for an RCBO swap (GBP 95) and the actual fix needed an extra
            hour of investigation and re-jointing (additional GBP 85, total GBP 180), customer
            agreed by text, you completed the work. Time to close out.
          </>
        }
        whatToDo={
          <>
            Five-step close-out. (1) Run the post-rectification test set — continuity of CPC from
            CU to furthest socket = R1+R2 0.55 Omega (was 0.85 Omega before fix), IR L-E greater
            than 200 MOhm, polarity correct at all sockets, Zs at furthest socket = 0.58 Omega
            (well within Type B 32 A measured limit of 1.10 Omega), RCBO trip time at 1 x I delta
            n = 25 ms (well within 300 ms limit). Functional check — fridge, kettle and toaster
            all run together for 3 minutes without trip. (2) Issue the MWC — pre-fill from firm's
            certification software, instrument identification (Megger MFT1741+, last calibration
            date from instrument register), test results in the schedule, customer name, address,
            date, signatory. Email the PDF to the customer while still on site. (3) Update the
            firm's record — invoice now GBP 180 (matching the VO), MWC reference number, photos of
            the repaired joint, photos of the pre-fix and post-fix MFT readings. (4) Brief the
            customer verbally — three-part plain English: what was happening (high resistance at
            junction box overheated under load and pushed the breaker over), what we did (re-made
            the joint, re-tested the whole circuit), what to watch for (call us if it trips again
            in the next 30 days). (5) Hand over the documentation pack — printed MWC + job summary
            + recommendation that the next EICR is due in approximately 6 years (installation is 4
            years from last EICR per the customer's records). Customer signs the job sheet
            acknowledging receipt of documentation and brief. Take payment. Leave site.
          </>
        }
        whyItMatters={
          <>
            The five steps turn a diagnostic visit into a closed-out job — defensible record, paid
            invoice, satisfied customer, scheme-compliant certification. Skipping any one step
            opens a gap. Skip the test set and you don't know the fix worked. Skip the MWC and you
            breach Reg 644. Skip the firm record update and the next engineer attending has no
            history. Skip the verbal brief and the customer doesn't understand. Skip the
            documentation handover and you breach Reg 132.13. Each step takes a minute or two; the
            combination is what L3 competence looks like at the close-out stage.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Refusal, escalation, intermittent faults</ContentEyebrow>

      <ConceptBlock
        title="When the customer refuses your recommendation"
        plainEnglish="Sometimes the customer says no — to additional work, to a recommended remediation, to the cost of a proper fix. Your job is to brief them on the implications, document the refusal, and decide whether the residual risk is acceptable to leave in service. For minor matters, document and move on. For safety risks, you may need to escalate or even decline to leave the installation in service."
        onSite="The standard wording on the certificate / job sheet captures the recommendation, the customer's response, and your professional position. This is your protection if anything goes wrong later."
      >
        <p>The standard refusal documentation pattern:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Recommendation made.</strong> "Recommended replacement of damaged junction box
            and re-routing of cable to current best practice."
          </li>
          <li>
            <strong>Customer's response.</strong> "Customer declined on cost grounds, requested
            like-for-like repair only."
          </li>
          <li>
            <strong>Implications briefed.</strong> "Customer briefed that the like-for-like repair
            restores function but the underlying installation issue (cable damage from previous
            DIY work) remains. Risk of recurrence cannot be eliminated without the recommended
            additional work."
          </li>
          <li>
            <strong>Decision and justification.</strong> "Like-for-like repair carried out as
            requested. Installation tested as functional and within BS 7671 limits at point of
            handover. Customer accepts ongoing risk and waives recommendation."
          </li>
          <li>
            <strong>Escalation if applicable.</strong> If the residual risk is C1 (immediate
            danger), the firm should not leave the installation in service even on customer
            request — make safe, document, escalate to senior. The customer's commercial
            preference does not override the firm's EAWR Reg 4 / 16 duties.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Photographic evidence — the audit trail that defends the firm"
        plainEnglish="Photos taken before, during and after a repair are the firm's strongest evidence in any dispute. They cost nothing to take, take seconds, and turn a verbal account into a documented record. Most modern certification software lets you attach photos directly to the job record."
        onSite="Standard photo set: pre-fix condition (the fault as you found it), instrument readings during diagnosis (MFT screen showing the bad reading), the fault component close-up (burnt terminal, damaged cable), the rectification in progress (re-made joint, replaced device), post-fix verification readings (MFT screen showing the good reading), and the final tidied state."
      >
        <p>What to photograph and why:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Pre-fix condition.</strong> Establishes the starting state of the work. Useful
            if the customer later disputes what the installation looked like before you arrived.
          </li>
          <li>
            <strong>Instrument readings during diagnosis.</strong> Photo of the MFT screen showing
            the reading that identified the fault. Time-stamped evidence the test was actually
            carried out.
          </li>
          <li>
            <strong>Component fault close-up.</strong> Burnt terminal, broken conductor, damaged
            accessory — proves the fault existed and required the action you took.
          </li>
          <li>
            <strong>Rectification in progress.</strong> Re-made joint, replaced device,
            mid-installation. Demonstrates competent work practice.
          </li>
          <li>
            <strong>Post-fix verification readings.</strong> MFT screen showing the readings that
            confirm the fix worked. Pairs with the pre-fix instrument photos for a before / after
            evidential trail.
          </li>
          <li>
            <strong>Final tidied state.</strong> Closed-up enclosure, restored building fabric,
            cleaned work area. Shows the customer received a finished job.
          </li>
        </ul>
        <p>
          Store photos in the firm's job record system, not on personal phones. Most certification
          software (NICEIC Online, Easy Certs, ElectricalCert.app, ServiceM8) supports photo
          attachments. Photos taken on personal phones lose evidential weight and create
          data-protection issues.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The intermittent fault — when 'no fault found' is the honest answer"
        plainEnglish="Some faults won't reproduce during the visit. The honest professional response is to document the investigation, confirm what tests passed, recommend the customer captures any future occurrence with date / time / conditions, and offer a return visit if it recurs. 'No fault found' alone is too brief and may be challenged later — back it up with what you DID find."
        onSite="Intermittent faults are the L3 apprentice's hardest call. The temptation is to find SOMETHING to fix so the customer feels they got value. The professional discipline is to resist that urge — fixing the wrong thing may make the actual fault harder to diagnose later, and the customer ends up paying for unnecessary work."
      >
        <p>The intermittent-fault job-sheet wording:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reported symptom — verbatim.</strong> "Customer reports kitchen lighting
            circuit dims briefly when kettle is used. Symptom intermittent — not every kettle use,
            more common in evening."
          </li>
          <li>
            <strong>Investigation.</strong> "On site investigation between 10:00 and 12:00 today.
            Visual inspection of CU, kitchen lighting circuit and kettle circuit. Continuity tests
            on lighting CPC. IR tests. Zs at furthest lighting fitting. Functional test with
            kettle in use under typical load conditions."
          </li>
          <li>
            <strong>Findings.</strong> "All tests within BS 7671 limits. Symptom did not reproduce
            during the test period. No defect identified."
          </li>
          <li>
            <strong>Recommendation.</strong> "Customer to record date, time and conditions of any
            future occurrence and contact us. Recommend return visit during reported peak
            occurrence (typically evening) if symptom recurs. Suggest also monitoring whether
            symptom correlates with neighbour activity (shared supply transformer) — pattern may
            indicate supply-side voltage drop rather than a customer-side defect."
          </li>
          <li>
            <strong>Charge.</strong> Most firms charge a reduced "investigation only" fee for
            no-fault-found visits, or no charge if the customer reports recurrence within an
            agreed period.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Six items in every rectification record: verbatim symptom, diagnostic steps with readings, root cause, work done, post-rectification verification, residual concerns.',
          'Variation orders capture every scope change. Domestic — text exchange is fine. Commercial — signed VO form. Without a VO the firm has no authority for the additional work.',
          'Choose the right certificate: MWC for single-circuit alterations / repairs, EIC for new installations or major works, EICR for periodic inspection. Reg 644.1 makes certification mandatory.',
          'Post-repair test set is proportionate to the work — typically continuity, IR, polarity, Zs and (where applicable) RCD trip time on the affected circuit. Record on the certificate.',
          'Customer brief is verbal + written. Three-part plain English: what was happening, what we did, what to watch for. Reg 132.13 backs it up with the documentation pack.',
          "Reg 643.2 mandates calibrated instruments and instrument identification on the certificate. Modern software auto-fills from the firm's register but verify the right instrument is recorded.",
          "Document customer refusal with recommendation made, response, implications briefed, professional position. For C1 issues the firm's duty overrides customer preference — make safe and escalate.",
          'Intermittent faults: document what you DID find, recommend customer captures recurrence data, offer return visit. Resist the temptation to fix something just to feel like you got value for the visit.',
        ]}
      />

      <Quiz
        title="Rectification + variation orders + certs — knowledge check"
        questions={quizQuestions2}
      />
    </div>
  );
}
