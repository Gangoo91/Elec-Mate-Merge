/**
 * Module 4 · Section 5 · Subsection 2 — Verification, functional testing and retesting
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.2
 *   AC 5.2 — "specify the procedures for verifying that the fault has been corrected suitably using technical analysis"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.2 — specify the procedures for
 * functional testing and identify tests that can verify fault correction.
 *
 * Frame: the post-rectification verification — what tests prove the fault
 * is corrected, BS 7671 643 retest cycle, functional testing on safety
 * systems, the customer hand-back demonstration.
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
  'Verification + functional testing (5.2) | Level 3 Module 4.5.2 | Elec-Mate';
const DESCRIPTION =
  'The post-rectification verification — what tests prove the fault is corrected, BS 7671 643 retest cycle, functional testing on safety systems, the customer hand-back demonstration.';

const checks = [
  {
    id: 'mod4-s5-sub2-retest',
    question:
      "After rectifying a fault on a domestic ring final, what BS 7671 643 tests should you run as part of the verification?",
    options: [
      "A Statutory Instrument is secondary legislation — passed under the authority of an Act of Parliament. Breach is a criminal offence and the HSE can prosecute. A British Standard is a voluntary technical document published by the British Standards Institution. Breach is not in itself a criminal offence — but where another statute (e.g. Approved Document P, which references BS 7671) effectively requires compliance, departure becomes evidence of a statutory breach.",
      "Building Regulations Part L (Conservation of Fuel and Power) applies to new build, extensions and major renovations. Heat pump installs in those contexts must demonstrate compliance with the relevant Part L primary energy and carbon emissions targets, typically through SAP (Standard Assessment Procedure) for dwellings. The Future Homes Standard expected to bring fossil-fuel boilers off new-build from 2025 elevates heat pumps to the default route for new-build. MCS MIS 3005 sits alongside Part L — MCS proves the installer is competent, Part L sets the building energy targets, and the SAP calculation that informs Part L compliance uses MCS-style heat-loss and SCOP methodology.",
      "Workplace mentor is the unpaid (or informally paid) day-job mentor allocated to a specific apprentice within the employing firm. Different from college assessor (paid, formally qualified, employed by college). The mentor signs portfolio entries as evidence of on-site competence, attends three-way reviews, calibrates progress with the college tutor. Mentor competence is evidenced by JIB Approved Electrician grade plus experience — no specific qualification required.",
      "Five tests on the affected circuit. (1) Continuity — R1+R2 verifies the corrected joint reduces loop resistance to expected value. (2) Ring continuity (three-step) verifies ring topology is intact. (3) IR test verifies insulation hasn't been damaged during the work. (4) Polarity verifies any disturbed accessory was reconnected correctly. (5) EFLI Zs verifies the protective device disconnect time meets BS 7671 Table 41.3. Plus on RCD-protected: RCD trip-time test verifies the device operates correctly. The retest is documented on the certificate AND the job sheet — proof that the rectification worked.",
    ],
    correctIndex: 3,
    explanation:
      "Post-rectification retest is what proves the fix worked. Skipping it = no evidence of correct repair = comeback risk + regulatory exposure. Standard L3 practice is the relevant BS 7671 643 tests on the affected circuit — five tests for a typical ring final.",
  },
  {
    id: 'mod4-s5-sub2-functional',
    question:
      "What's 'functional testing' and how is it different from BS 7671 643 testing?",
    options: [
      "Yes, but only after preparing — switch off any sensitive loads on the same RCD, brief any occupants the supply may briefly trip, and be ready to reset the RCBO. Full trip-current mode is more accurate (typically plus or minus 5 percent vs plus or minus 10 percent for no-trip), and on a borderline result it can confirm whether the no-trip reading was accurate or whether you have a margin you can rely on. If the full mode confirms the reading you can document with higher confidence; if it differs significantly, investigate further.",
      "RIDDOR Reg 7 specifies a list of 'dangerous occurrences' that must be reported even if no-one was hurt — they're near-misses with serious potential. The list (RIDDOR Schedule 2) includes electrical short circuits or overloads that cause a fire or explosion, certain types of plant collapse, scaffolding failure, dangerous occurrences in or near a pipeline, and so on. So yes — an electrical incident causing fire or explosion in a fixed installation is reportable as a dangerous occurrence even with no injury.",
      "Three. (1) Test readings — pre-rectification (the failed reading) and post-rectification (the corrected reading), with timestamps and instrument IDs. (2) Functional test outcomes — what was tested, what worked, any anomalies. (3) Customer hand-back record — what was demonstrated, what documentation provided, customer's signed acceptance. The records become the diagnostic narrative on the job sheet — defensible audit trail of what was found, what was done, what was verified.",
      "BS 7671 643 = ELECTRICAL tests (continuity, IR, polarity, EFLI, RCD trip-time). Functional testing = OPERATIONAL tests — does the system actually do what it's supposed to do? Examples: switch operates the correct circuit; light dims correctly across the dimmer range; smoke alarm sounds when test button pressed; emergency lighting illuminates on simulated mains failure; fire alarm panel signals out to ARC during a 'walk test'. Functional testing is essential for systems where the electrical compliance doesn't fully prove the operation. Standard L3 practice: BS 7671 643 + functional test on the affected system.",
    ],
    correctIndex: 3,
    explanation:
      "Functional testing complements BS 7671 643. The electrical tests prove the installation is electrically safe; the functional tests prove it actually works as intended. Both are needed for a defensible hand-back.",
  },
  {
    id: 'mod4-s5-sub2-handback',
    question:
      "What's the standard customer hand-back at the end of a fault-rectification visit?",
    options: [
      "Five-step. (1) DEMONSTRATE the fix — show the customer that the original symptom is no longer present (e.g. 'the breaker's not tripping any more — try plugging in your kettle'). (2) WALK THROUGH the work done — what was found, what was fixed, what tests confirmed. (3) PROVIDE documentation — job sheet copy, any certificates, customer-friendly summary. (4) EDUCATE on prevention — what behaviours / conditions might cause recurrence, what to watch for. (5) AGREE next steps — any further work recommended, follow-up visit if needed, payment terms. The hand-back is what turns a job from 'work done' to 'customer satisfied'. Skipping it leaves customer feeling unfinished.",
      "Because the standard's enforcement and interpretation hinges on the precise definitions. 'Exposed-conductive-part' (a conductive part of equipment that can be touched and which is liable to become live in fault conditions) and 'extraneous-conductive-part' (a conductive part liable to introduce a potential, generally Earth, not forming part of the electrical installation) are different categories with different bonding rules. Mis-classify one as the other and you mis-bond, you fail the EICR, you potentially leave the customer unprotected. Definitions ARE the technical content.",
      "WEEE applies to electrical and electronic equipment that has reached end-of-life — and a failed protective device is exactly that. The Regulations make the producer (Hager, MK, Schneider) responsible for funding end-of-life recovery, with the distributor (CEF, Edmundson, Rexel) operating the Take-Back Scheme at the counter. The contractor's role is to ROUTE the WEEE into that scheme rather than into general waste — the firm holds the Duty of Care under Environmental Protection Act 1990 s.34 for any waste it produces. Skipping the scheme and putting WEEE in the customer's bin breaches both the producer-responsibility framework and the Duty of Care.",
      "Battery end-of-life in the residential storage context is usually defined as when usable capacity falls to around 70-80% of nameplate (varies by manufacturer warranty wording). A 10 kWh battery delivering 7 kWh of usable capacity is at roughly 70% — close to the typical 10-year warranty threshold. Whether the customer replaces depends on economics: the existing battery may still serve daily PV self-consumption usefully even at 70% capacity; the manufacturer warranty may trigger a free or subsidised replacement; second-life battery applications are emerging. Decommissioning is hazardous-waste handling, not skip handling.",
    ],
    correctIndex: 0,
    explanation:
      "Customer hand-back is the closing act of every job. It's the moment the customer decides whether they're satisfied — and whether they'll call you back next time. The five-step structure makes the hand-back consistent and reduces post-job complaints.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is the post-rectification retest non-negotiable, not 'usually a good idea'?",
    options: [
      "PV systems remain energised during a fire — water from a hose hitting an energised DC string can produce a shock hazard for the fire-fighter. The IET Code of Practice for Grid-Connected Solar Photovoltaic Systems (currently 4th edition with 2026 update) addresses this through (1) clear external labelling identifying the property as having PV, (2) DC isolation accessible from outside the building where practicable, (3) emergency switching that de-energises the strings as far as is practical, and (4) optional rapid-shutdown technology that drops module-level voltage to safe levels on a signal. Section 712 references the IET CoP as the practical implementation guide. Some manufacturers now bake rapid-shutdown into the panel optimisers as standard.",
      "Three reasons. (1) PROVES THE FIX — confirms your repair actually worked, before the customer puts loads on it. (2) DETECTS NEW FAULTS — your work may have introduced a new fault (over-tightened terminal, repositioned cable chafing, swap component DOA). The retest catches it before the customer does. (3) GENERATES THE EVIDENCE — the post-rectification readings on the job sheet are the proof of compliance. Skipping the retest = no evidence of correct repair = comeback risk + regulatory exposure if anything goes wrong subsequently. The retest is part of the job, not optional polish.",
      "A dedicated radial circuit, typically 32 A or 40 A (Type C MCB to handle the inrush from the compressor and fan), in 6 mm² or 10 mm² T&E or SWA depending on length and method. RCD protection per BS 7671 Section 411.3.3 / 415.1. A local rotary or DP isolator outdoors at the unit. Smart controls integration via dedicated low-voltage cable. Cyclic-rated cable selection — heat pumps run for hours, not minutes. Bonding to the unit chassis if it forms an extraneous-conductive part.",
      "Five tests on the affected circuit. (1) Continuity — R1+R2 verifies the corrected joint reduces loop resistance to expected value. (2) Ring continuity (three-step) verifies ring topology is intact. (3) IR test verifies insulation hasn't been damaged during the work. (4) Polarity verifies any disturbed accessory was reconnected correctly. (5) EFLI Zs verifies the protective device disconnect time meets BS 7671 Table 41.3. Plus on RCD-protected: RCD trip-time test verifies the device operates correctly. The retest is documented on the certificate AND the job sheet — proof that the rectification worked.",
    ],
    correctAnswer: 1,
    explanation:
      "The retest is the closing of the diagnostic loop. Without it, you have a hypothesis confirmed by symptoms + tests + visual finding, then a fix — but no evidence the fix actually worked. The retest provides that evidence. BS 7671 643 + your job sheet documentation make it defensible.",
  },
  {
    id: 2,
    question: "What functional test verifies that an emergency lighting circuit is actually working?",
    options: [
      "Independent verification. The dead-test calculation depends on Ze (one measurement) plus R1+R2 (one or many readings, depending on circuit). The live Zs measurement is one direct reading. Comparing the two catches errors in either method, gives confidence in the result, and provides a single value to compare against Table 41.3 with the 0.8 multiplier applied.",
      "Where an offence under HASAWA is committed by a body corporate (a limited company) and is proved to have been committed with the consent or connivance of, or attributable to neglect on the part of, a director, manager, secretary or similar officer, that individual ALSO commits the offence and is liable to personal prosecution. Relevant once you become Approved Electrician, then a senior, then potentially a director — your personal liability scales with your role.",
      "BS 5266-1 monthly self-test (push the panel test button) AND annual 3-hour discharge test (simulate mains failure for 3 hours, verify illumination throughout). The 3-hour test is the definitive functional verification — confirms battery capacity, lamp operation, switching circuit. After fault rectification on an EL system, perform a 1-hour discharge test as minimum (verifies switching + lamp operation; full battery capacity confirmed at next annual test). Document on the EL log book.",
      "Starting each week by asking your team: \\\\\\\"What obstacles are you facing that I can help remove?\\\\\\\" — then using empathy to understand the real blockers (which may be emotional as well as practical), self-regulation to resist the urge to micromanage the solutions, coaching to develop the team\\\\\\\\\\\\\\\\\\\\\\\\'s own problem-solving capability, and genuine follow-through that builds trust. The leader serves by enabling, not by doing everything themselves",
    ],
    correctAnswer: 2,
    explanation:
      "Emergency lighting functional testing is its own discipline under BS 5266-1. The monthly self-test confirms switching + lamp; the annual 3-hour confirms battery capacity. After fault work, a partial discharge test verifies operation without depleting the battery; the next scheduled 3-hour confirms full capacity.",
  },
  {
    id: 3,
    question: "What's a 'walk test' on a fire alarm system and when is it required?",
    options: [
      "Electrical burns are usually small at the surface but deep at the tissue level — current passing through tissue heats it from the inside out. Thermal burns are usually obvious at the surface. Electrical burns may have separate entry and exit wounds. Both need cooling (10-20 min cool running water for thermal; less aggressive for electrical because of underlying tissue damage), covering with a clean non-adherent dressing, and medical assessment.",
      "Where the employee knew or ought reasonably to have known about the hazard, where they had an opportunity to communicate it to the colleague or supervisor, and where the failure to communicate caused or contributed to the colleague being exposed to risk. HSE has prosecuted individual employees under s.7 for failing to brief a successor on a permit-to-work, for not communicating that a circuit was still live, and for not raising a concern about a defective safe system of work. The s.7 duty is personal and cannot be delegated.",
      "Cool, dry, ventilated location away from sources of ignition; not directly above or below escape routes; minimum clearances per the manufacturer's instructions for thermal management; not in a habitable room without a fire-rated enclosure or adequate fire separation; not in a loft (high temperature in summer, restricted access for emergency response); accessible for emergency isolation. The IET Code of Practice for Electrical Energy Storage Systems gives the framework. The manufacturer's installation manual is the binding instruction set; deviating from it voids the warranty and the BS 7671 compliance basis.",
      "Walk test = activating each detector in turn (using a heat / smoke / pull station test tool) and verifying the panel correctly identifies the zone. BS 5839-1 requires a walk test as part of the annual service AND after any change to the system OR rectification of a fault that affected a zone. The L3 apprentice doesn't normally do fire-alarm walk tests (specialist work) but supports the senior fire-alarm engineer. The walk test verifies the addressable / zone identification AND the sounder operation. Documented in the fire alarm log book.",
    ],
    correctAnswer: 3,
    explanation:
      "Fire alarm walk testing is the operational verification that confirms each detector reports correctly to the panel. BS 5839-1 mandates it. After fault rectification on a fire-alarm zone, a walk test of that zone is the standard verification.",
  },
  {
    id: 4,
    question: "What records should you keep of the post-rectification verification?",
    options: [
      "Three. (1) Test readings — pre-rectification (the failed reading) and post-rectification (the corrected reading), with timestamps and instrument IDs. (2) Functional test outcomes — what was tested, what worked, any anomalies. (3) Customer hand-back record — what was demonstrated, what documentation provided, customer's signed acceptance. The records become the diagnostic narrative on the job sheet — defensible audit trail of what was found, what was done, what was verified.",
      "(1) Strict liability — pollution incidents are offences regardless of intent; (2) duty of care under EPA 1990 s.34 + the Polluter Pays principle; (3) MHSWR Reg 14 (employee duty to report shortcomings); (4) operator's environmental permit conditions; (5) reputational and commercial consequences of an undetected pollution event downstream; (6) personal liability under HASAWA s.7 if the environmental hazard also creates a worker safety hazard.",
      "It sits in the standards / technical family alongside BS 7671 and the IET OSG. BS 7671 Reg 510.3 ties equipment selection and erection to manufacturer's instructions. Reg 526.1 ties the connection itself (torque, ferrule requirement, mechanical strength) to those instructions. The data sheet is the authoritative source for how the unit is meant to be installed. Treat it as part of the site folder, not the bin.",
      "A UK charity providing financial, emotional and practical support specifically to people working in the electrical industry and their families. The charity provides financial assistance grants (cost-of-living support, bereavement, illness, redundancy), emotional support and counselling, debt advice, apprentice support, and a careers service. The charity is funded by donations from across the electrical industry. Apprentices and qualified electricians, employees and self-employed workers, are all eligible for support.",
    ],
    correctAnswer: 0,
    explanation:
      "Documentation is the audit trail. Pre-vs-post readings prove the fix worked. Functional test records prove the system operates correctly. Customer hand-back record proves the customer was satisfied and informed. The combination is the defensible record.",
  },
  {
    id: 5,
    question: "What if the post-rectification retest shows a NEW fault that wasn't present before?",
    options: [
      "Shorter cycles than the standard for the parent property type because the elevated risk in special locations justifies more frequent inspection. EV charge points are commonly inspected annually by the EV-charging-equipment manufacturer's recommendation; swimming pools annually for plant room; agricultural premises every 3 years given the harsh environment; caravans and marinas have their own GN3 Chapter 66 frequencies.",
      "Stop, investigate. The new fault may have been (a) introduced by your work (terminal damaged, cable chafed, component DOA), (b) revealed by your work (a latent fault that the original fault was masking), (c) a pre-existing fault that the original work didn't touch. Treat as a new diagnostic problem — five-step action chain (verify, identify, make safe, document, rectify or escalate). Don't dismiss as 'must have been there before' without investigation. Customer brief: 'we found and fixed the original fault, but a new issue showed up on retest; we're investigating'.",
      "Five high-frequency locations. (1) Outdoor sockets (BG / MK weatherproof) — gasket degradation, water ingress at the unused socket, RCD trip on rain. (2) Garden lighting transformers / converters — internal moisture from condensation; replacement standard. (3) Outdoor lighting fittings (security lights, post lights) — sealed fittings break their seal over years; water gets in, IR fails. (4) Conduit / containment — UV degradation of PVC, frost cracking, rodent damage. (5) Cable runs underground — settlement, root damage, archaeological dig damage; rare but significant. Brand patterns: BG / MK weatherproof outdoor sockets typically last 10 years before gasket replacement; cheap unbranded outdoor sockets fail in 2–3 years.",
      "CALIBRATION — measurement of the instrument's response against reference standards, with results documented in a certificate. The instrument is unchanged; you get a certificate that says 'at the time of test, this instrument read X when measuring Y'. ADJUSTMENT — physical or software adjustment of the instrument to bring it into specification. Some calibration labs do both (calibrate, then adjust if out of spec, then re-calibrate); some do calibration-only (and you make the decision whether to adjust based on the report). The calibration certificate normally states whether adjustment was performed and the as-found vs as-left readings.",
    ],
    correctAnswer: 1,
    explanation:
      "New faults at retest are not unusual. Investigation is the right response — never dismiss. The action chain (Sub 4.3) applies. The customer brief should be honest about the new issue and the investigation; covering it up creates worse problems later.",
  },
  {
    id: 6,
    question: "What's the customer-friendly summary that should accompany the technical job sheet?",
    options: [
      "Reg 134.1.1 requires that 'good workmanship by competent persons and proper materials shall be used in the erection of the electrical installation'. This is the workmanship hook — how the install is physically put together has to meet trade-standard quality. Includes correct torque, correct conductor preparation, neat termination, secure containment, proper labelling. Workmanship is what distinguishes a competent install from one that just barely passes test.",
      "When the fault is obvious AND the obvious fix is risk-free AND the customer has been informed. Example: a blown bulb in an emergency-bulb socket — replace the bulb, verify operation, document. No need for full hypothesis. But — even the 'obvious' fix benefits from a quick stage check: is the customer's report consistent with the fix (yes, blown bulb explains 'no light'); is the bulb the correct rating; is the lampholder undamaged. The 5-second mental check catches the cases where 'obvious' wasn't actually right. Apprentices who skip even the mental check create comeback work.",
      "A 1-page document in plain English: (1) WHAT YOU REPORTED — customer's symptom in their words. (2) WHAT WE FOUND — the fault, in plain English. (3) WHAT WE DID — the fix, in plain English. (4) WHAT WE TESTED — the verification, in plain English. (5) RECOMMENDATIONS — anything further the customer should consider. (6) WARRANTY — what's covered for what period. (7) NEXT STEPS — any follow-up work, retest schedule, contact info. Most modern firms have a customer summary template; the apprentice fills it in at the end of each job. Customer keeps the summary; firm keeps the technical job sheet.",
      "Inadmissible for any purpose where the accuracy of the measurement matters legally — BS 7671 certification, EAWR evidence, EICR coding, dispute resolution. The reasoning: without UKAS-traceable calibration in date, you can't prove the measurement is accurate to the stated tolerance, so the measurement itself is unreliable. A circuit signed off as 'satisfactory IR ≥ 1 MΩ' using an instrument with expired calibration may actually have been 0.1 MΩ (instrument drift) — and any subsequent fire / shock incident will trace back to that signature. The instrument's calibration sticker is the front-line evidence; the certificate is the back-up.",
    ],
    correctAnswer: 2,
    explanation:
      "Customer-friendly summary is the bridge between technical work and customer understanding. The technical job sheet is for the trade; the customer summary is for the customer. Both are needed; neither replaces the other.",
  },
  {
    id: 7,
    question: "Should you ever skip the customer demonstration step at hand-back?",
    options: [
      "Ensure the earthing conductor is RECONNECTED BEFORE the supply is re-energised. The temporary disconnection during the test must be undone or the installation will operate without its protective earth path on first energisation — exposed-conductive-parts would have no defined potential relative to earth and a downstream fault could not disconnect.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "F-Gas Regulations (assimilated EU Regulation 517/2014, retained in UK law post-Brexit, with some divergence) require any work on systems containing fluorinated greenhouse gases (the refrigerants used in heat pumps and air conditioning) to be done by F-Gas-certified personnel. Connecting refrigerant pipework, charging, recovering refrigerant, leak testing — all require certification. The Environment Agency enforces in England; equivalents in the devolved nations. Working without certification is a criminal offence and invalidates manufacturer warranties.",
      "Only when the demonstration would put the customer at risk (e.g. testing a high-voltage three-phase circuit where the customer shouldn't be in the work area). For domestic and most commercial work, the demonstration is the moment that confirms to the customer that the work is done. Skipping it leaves the customer uncertain — 'is it really fixed?' — and creates the doubt that turns into complaints. The 5-second 'try plugging in your kettle now — see, no trip' is worth the time.",
    ],
    correctAnswer: 3,
    explanation:
      "Demonstration converts the customer from passive recipient to verified beneficiary. The customer who sees the fix work has nothing to complain about; the customer who only sees the invoice has plenty to complain about. The demonstration is a 30-second customer-confidence investment.",
  },
  {
    id: 8,
    question: "What documentation should accompany a fault-rectification visit on an EICR-coded installation?",
    options: [
      "Three documents. (1) Updated EICR (or supplementary report) — codes the previously-failed item as now compliant; references the rectification work. (2) Minor Electrical Installation Works Certificate (MEIWC) for the rectification work — formal compliance certificate for the new / repaired work under BS 7671. (3) Customer-friendly summary — what the certificates mean in plain English. The customer keeps all three; the firm retains copies for 7+ years. NICEIC / NAPIT registration audits will check the certificate trail.",
      "Workplace mentor is the unpaid (or informally paid) day-job mentor allocated to a specific apprentice within the employing firm. Different from college assessor (paid, formally qualified, employed by college). The mentor signs portfolio entries as evidence of on-site competence, attends three-way reviews, calibrates progress with the college tutor. Mentor competence is evidenced by JIB Approved Electrician grade plus experience — no specific qualification required.",
      "Building Control is the local-authority enforcement of the Building Regulations. For most environmental tech installs the route is via a competent-person scheme (the installer's firm is registered with NICEIC / NAPIT / similar, and self-certifies the work) — Building Control is notified by the scheme but doesn't visit. For non-notifiable work (e.g. some maintenance) Building Control isn't involved. For installs that fall outside competent-person schemes, or for major works, Building Control may inspect on-site. The customer receives a Building Regs compliance certificate — either from the competent-person scheme or from Building Control directly.",
      "Two reasons. (1) Auditability — readings are stored against a circuit ID and timestamp, providing tamper-evident evidence at scheme audit and dispute. (2) Cert generation — test results download directly into certificate software (NICEIC PartnerNet, NAPIT, custom firm software, Elec-Mate) and auto-populate the EIC / EICR test schedule, eliminating transcription errors. The combination saves the time previously spent hand-writing and double-checking test schedules.",
    ],
    correctAnswer: 0,
    explanation:
      "Certification follows the work. EICR-coded items rectified need updated coding; new / repaired work needs MEIWC; customer needs plain-English summary. The trade certifies the work; the customer needs to understand it. NICEIC / NAPIT firms have certification software (NICEIC Cert Plus, Easycert) that handles the formats.",
  },
];

const faqs = [
  {
    question: "Do I need to test the entire installation after a single-circuit fault rectification?",
    answer:
      "No — only the affected circuit and any circuit your work touched. The BS 7671 643 retest is targeted at proving your work didn't compromise compliance and that the rectified fault is now corrected. Full-installation retesting is for periodic inspection (EICR), not for fault rectification. Most fault-rectification jobs need 4–6 tests on the affected circuit; takes 15–30 minutes.",
  },
  {
    question: "What if the customer doesn't want to wait for the retest — they want me out the door?",
    answer:
      "Politely insist. Explain the retest is part of the work, not an extra. 'I need to confirm the repair is good before I leave — it'll take 15 minutes; I won't charge separately for it'. Customers who understand it's quality assurance usually accept. If they refuse outright, document on the job sheet that retest was declined; this protects the firm if a subsequent issue arises. The retest is non-negotiable from the firm's professional standards perspective.",
  },
  {
    question: "Can I skip retesting if the fix is 'obviously' good?",
    answer:
      "No. Obvious-looking repairs sometimes hide subtle problems — over-tightened terminals can crack, repositioned cables can chafe, swap components can be DOA. The retest catches what visual inspection misses. The 5-minute retest costs less than a return visit if the 'obvious' fix turned out not to be.",
  },
  {
    question: "How do I retest an RCD-protected circuit without tripping the RCD?",
    answer:
      "Use Hi-Z (no-trip) mode for EFLI testing (Sub 2.4). For RCD trip-time test, the RCD WILL trip (that's the test) — coordinate with customer for that brief outage. Other tests (continuity, IR, polarity) are dead tests and don't trip the RCD. Plan the test sequence to do trip-time last, after all other tests are complete.",
  },
  {
    question: "What's a 'partial discharge test' on emergency lighting and when is it appropriate?",
    answer:
      "Partial discharge = simulate mains failure for less than the full BS 5266 3-hour duration. Used after fault rectification to verify the EL system switches and operates correctly without depleting the battery (which then needs days to recharge). Typically 30–60 minutes is enough to verify operation. The next scheduled annual 3-hour test confirms full capacity. Document the partial discharge on the EL log book and note that full capacity will be verified at next scheduled.",
  },
  {
    question: "What customer-friendly format works for the work summary?",
    answer:
      "One side of A4. Plain English. Five sections — what reported, what found, what done, what tested, what recommended. Each section 1–3 sentences. No jargon (or define it: 'IR test = checking the insulation is good'). End with warranty info and contact for follow-up. Most firms have a customer summary template that auto-fills from the job sheet. The customer reads it once; understands what they paid for; references it if anything happens later.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 2"
            title="Verification, functional testing and retesting"
            description="The post-rectification verification — BS 7671 643 retest cycle on the affected circuit, functional testing on safety systems (emergency lighting, fire alarm, RCD), the structured customer hand-back demonstration, and the certification trail."
            tone="emerald"
          />

          <TLDR
            points={[
              "Post-rectification retest is non-negotiable. Five tests on the affected circuit (continuity, ring, IR, polarity, EFLI + RCD trip-time if RCD-protected). Proves the fix worked.",
              "Functional testing complements BS 7671 643 — does the system actually do what it's supposed to do? EL discharge, fire alarm walk test, RCD trip-time.",
              "Customer hand-back is five steps: demonstrate, walk through, provide docs, educate, agree next steps. Skipping leaves customer uncertain and creates complaints.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Specify the BS 7671 643 retest cycle for a rectified fault on each circuit type — continuity, IR, polarity, EFLI, RCD trip-time.",
              "Distinguish electrical testing (BS 7671 643) from functional testing (does the system operate correctly?).",
              "Apply functional tests appropriate to safety systems — EL discharge, fire alarm walk test, RCD trip-time, smoke alarm activation.",
              "Conduct the five-step customer hand-back: demonstrate, walk through, provide documentation, educate, agree next steps.",
              "Produce the certification trail — updated EICR / supplementary, MEIWC for the rectification work, customer-friendly summary.",
              "Recognise and investigate new faults that appear at the post-rectification retest stage.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The post-rectification retest cycle</ContentEyebrow>

          <ConceptBlock
            title="Five tests on the affected circuit + RCD trip-time if RCD-protected"
            plainEnglish="The retest is the closing of the diagnostic loop. Without it, you have a fix without evidence it worked. The BS 7671 643 tests on the affected circuit are the proof."
            onSite="Standard L3 retest on a typical domestic ring final after rectification: continuity (R1+R2), ring continuity (three-step), IR, polarity, EFLI Zs, RCD trip-time. Six tests, 15–30 minutes, complete documented evidence of compliance."
          >
            <p>The retest by circuit type:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ring final</strong> — continuity R1+R2, ring continuity three-step, IR, polarity, EFLI, RCD trip-time.</li>
              <li><strong>Radial final</strong> — continuity R1+R2, IR, polarity, EFLI, RCD trip-time.</li>
              <li><strong>Lighting circuit</strong> — continuity R2, IR (250 V if electronic loads), polarity, EFLI, RCD trip-time.</li>
              <li><strong>Sub-main</strong> — continuity R1+R2, IR, polarity, EFLI Zs at sub-DB.</li>
              <li><strong>Supply origin</strong> — Ze, PSCC, polarity at cut-out.</li>
            </ul>
            <p>
              Document pre-rectification (failed) reading + post-rectification (corrected) reading with timestamps. The before/after pair is the proof.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.2.1 (Inspection and testing on completion)"
            clause={<>"During erection and on completion of an installation or an addition or alteration to an installation, and before it is put into service, appropriate inspection and testing shall be carried out by one or more skilled persons competent to verify that the requirements of BS 7671 have been met. Appropriate certification shall be issued in accordance with Chapter 64."</>}
            meaning={<>For fault rectification, the rectified work counts as an 'addition or alteration' under Reg 134.2.1; the post-work inspection and testing verify BS 7671 compliance. The minimum is the Chapter 64 tests applied to the affected circuit. The certification (MEIWC for the alteration) records the verification result.</>}
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.2.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Functional testing — does it actually work?</ContentEyebrow>

          <ConceptBlock
            title="Electrical compliance is necessary but not sufficient"
            onSite="BS 7671 643 tests prove the installation is electrically safe. Functional tests prove it operates as intended. Both are needed for a defensible hand-back."
          >
            <p>Common functional tests for fault-rectification verification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Light switch</strong> — operates the correct light(s); no other lights affected.</li>
              <li><strong>Dimmer</strong> — full range operation, no flicker, no overheat at full / minimum.</li>
              <li><strong>Smoke alarm</strong> — test button activates sounder; LED indicators correct.</li>
              <li><strong>Emergency lighting</strong> — partial discharge test (30–60 min); illumination throughout; switching at mains-fail simulation.</li>
              <li><strong>Fire alarm</strong> — walk test of affected zone (specialist work, but L3 supports).</li>
              <li><strong>RCD</strong> — trip-time test at I∆n and 1×IΔn.</li>
              <li><strong>Heating element / motor / pump</strong> — runs at expected current; no abnormal heating; correct rotation (3-phase).</li>
              <li><strong>EV charger</strong> — handshake completes; charge cycle starts; current ramps as expected.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The customer hand-back</ContentEyebrow>

          <ConceptBlock
            title="Five steps that turn 'work done' into 'customer satisfied\'"
            plainEnglish="The hand-back is what the customer remembers. The technical work was the value; the hand-back is the evidence. Skipping it leaves customer uncertain and creates the post-job complaints."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. DEMONSTRATE</strong> — show the customer that the original symptom is no longer present. 'Try plugging in your kettle — see, no trip.' 30 seconds; converts uncertainty to certainty.</li>
              <li><strong>2. WALK THROUGH</strong> — what was found, what was fixed, what tests confirmed. Plain English, 2–3 minutes.</li>
              <li><strong>3. PROVIDE DOCUMENTATION</strong> — job sheet copy, certificates (MEIWC + updated EICR if relevant), customer-friendly summary.</li>
              <li><strong>4. EDUCATE ON PREVENTION</strong> — what behaviours / conditions might cause recurrence, what to watch for. The 60–80% of customer-behaviour faults this prevents.</li>
              <li><strong>5. AGREE NEXT STEPS</strong> — any further work recommended, follow-up visit if needed, payment terms, contact for issues.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>The post-repair certificate decision</ContentEyebrow>

          <ConceptBlock
            title="EIC, MEIWC or no certificate at all"
            plainEnglish="Different repairs trigger different paperwork. The L3 apprentice needs to recognise which document goes with which scope of work and who signs it."
            onSite="Domestic kitchen socket faceplate replaced &mdash; no certificate (no circuit altered). Single RCBO swapped on a CU &mdash; MEIWC with the customer&apos;s permission. Distribution board replaced or new circuit added &mdash; full EIC. Notifiable work under Building Regulations Part P (kitchens, bathrooms, garden circuits) goes through a competent-person scheme (NICEIC, NAPIT, ECA) regardless of certificate type."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIC</strong> &mdash; new circuit, replacement CU / DB, major alteration. Three signatures: design, construction, verification.</li>
              <li><strong>MEIWC</strong> &mdash; addition or alteration to a single circuit that doesn&apos;t involve a new circuit or DB. One signature.</li>
              <li><strong>EICR</strong> &mdash; if the visit was a periodic inspection rather than a fault job, the report is the EICR; the repair becomes a referenced supporting document.</li>
              <li><strong>No formal certificate</strong> &mdash; like-for-like accessory swap, lamp change, fault diagnosis without alteration. Job sheet entry is enough but keep the photographic record.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Retest scope &mdash; what to test, what to skip</ContentEyebrow>

          <ConceptBlock
            title="Targeted retest, not full commissioning"
            plainEnglish="A post-repair retest verifies the fix and the circuit&apos;s safety case. It doesn&apos;t need to repeat every initial verification test on every circuit; it needs to retest the ones the repair could have affected."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>The repaired circuit</strong> &mdash; full continuity, IR, polarity, Zs / EFLI, RCD operation. The whole point of the retest.</li>
              <li><strong>Adjacent circuits sharing the same DB / RCD group</strong> &mdash; functional check that nothing else has been disturbed during the repair.</li>
              <li><strong>The CU as a whole</strong> &mdash; visual check that all breakers reset, RCD test button operates, no warmth or smell post-load.</li>
              <li><strong>Skip</strong> &mdash; circuits genuinely unrelated to the repair scope (e.g. don&apos;t IR-test the upstairs lighting if the repair was a downstairs socket).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Functional testing of safety systems — emergency lighting and fire alarm"
            plainEnglish="When a rectification touches a safety system, functional testing extends beyond the BS 7671 electrical retest. Emergency lighting tests under BS 5266 verify the duration of run on battery (typically 3 hours for non-maintained luminaires); fire alarm work under BS 5839-1 verifies the affected detector and any zone wiring; these are separate certificates issued alongside the BS 7671 paperwork. Skipping the safety-system functional test leaves the customer with a maintenance gap that the next inspector will flag."
            onSite="On a property with emergency lighting that has been disturbed during the rectification, run the BS 5266 monthly function test (5 second flash test) and document the result. For a 6-month or 3-year duration test, schedule with the customer's facilities team. On a fire alarm system, the BS 5839 weekly function test exercises a different MCP each week; if your work touched a detector, test that detector in person. Issue the BS 5266 / BS 5839 certificate alongside the MWC."
          >
            <p>
              Safety-system retest items by system type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Emergency lighting (BS 5266)</strong> — flash test
                (monthly), full duration test (six-monthly or annually depending
                on system class). Issue the EL completion certificate.
              </li>
              <li>
                <strong>Fire alarm (BS 5839-1)</strong> — silent and audible
                tests of the affected detector / zone, panel event log review,
                customer brief on disabling and re-enabling the system. Issue
                the FA completion certificate.
              </li>
              <li>
                <strong>Smoke and CO alarms (LD3 / BS 5839-6)</strong> — for
                domestic, test every alarm with the test button after work;
                cross-reference any dates printed on the alarm body.
              </li>
              <li>
                <strong>Bonding to extraneous-conductive parts</strong> — if
                gas, water or oil pipework was disturbed during the work, test
                continuity from the part to the MET and update the bonding
                record on the EIC.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Witness sign-off — when the customer or supervisor signs the test"
            plainEnglish="Safety-critical or commercially-sensitive rectifications often require a witness signature on the test result — a customer's facilities engineer, a building manager, the firm's supervisor, or in some cases the contracting principal. The witness signature is documentary evidence that the test was carried out, the result was correct, and the witness saw it. The witness column on the EIC schedule formalises this."
            onSite="On commercial work, schedule the witness in advance — facilities engineers do not appreciate ad-hoc same-day requests. Walk the witness through the test setup, the instrument used (calibration in date, sticker visible), the test result on the screen, and the recording on the schedule. The witness signs the relevant column. The L3 apprentice gains a useful exposure to test discipline; the customer gains a defensible record; the firm gains a faster sign-off than chasing a remote signature later."
          >
            <p>
              When a witness signature is appropriate or required:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High-risk environment</strong> — hospitals, food
                production, hazardous-area locations under DSEAR, public-assembly
                premises.
              </li>
              <li>
                <strong>Commercial customer policy</strong> — large customers
                often require a witnessed test on every visit; the contract
                spec states it.
              </li>
              <li>
                <strong>Apprentice supervision sign-off</strong> — for
                apprentice-led tests where the supervising electrician signs the
                test and certifies the apprentice's work.
              </li>
              <li>
                <strong>Disputed prior work</strong> — where a previous
                contractor's work is in question; an independent witnessed test
                creates an unimpeachable record.
              </li>
              <li>
                <strong>Insurance-required testing</strong> — building insurer
                or product warranty conditions may require witnessed testing as
                evidence of the install standard.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Adjacent-circuit retest — proving Reg 641.5 second clause"
            plainEnglish="Reg 641.5 has two clauses — the new work complies, AND the existing installation is not impaired. The retest needs to evidence both. Adjacent-circuit functional tests (lights still work, sockets still energised, controls still respond) are the practical proof that the work has not damaged the rest of the installation. A quick walk through the adjacent rooms with the supply restored is the L3 apprentice's standard discipline before signing the certificate."
            onSite="After the targeted retest of the affected circuit, restore supply to all circuits and walk the property: lights on / off in every room sharing the affected DB, sockets energised (lamp test or trial-load), heating / hot water cycles started, smart controls still online. Each is a 30-second functional check. The adjacent-circuit walk is what catches accidental disturbance — a knocked terminal, a momentarily lifted neutral, a switch wired wrong on a multi-gang plate. Easier to find now than after the customer reports it."
          >
            <p>
              Adjacent-circuit functional check items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting in every room sharing the affected DB</strong>
                — switch on / off, dimmers respond, two-way circuits operate.
              </li>
              <li>
                <strong>Socket outlets in adjacent rooms</strong> — lamp test
                or trial-load to verify polarity and supply.
              </li>
              <li>
                <strong>Fixed appliances</strong> — boiler / heat pump fires up,
                immersion heats, EV charger handshake (if relevant).
              </li>
              <li>
                <strong>Smart controls</strong> — thermostats responsive, hub
                online, app reporting.
              </li>
              <li>
                <strong>Customer-reported items</strong> — the customer often
                mentions a 'while you're here' issue at the door; address or
                quote it on the way out.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness of the RCD."
              </>
            }
            meaning={
              <>
                Post-repair RCD verification is a single AC test at rated I&Delta;n in A4:2026 &mdash; the 5&times;I&Delta;n test is gone and Table 3A is deleted. One button press on the MFT, captured against the device-standard limit, and you have your verification.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 643.3 (RCD testing redraft)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.5"
            clause={
              <>
                "For an addition or alteration to an existing installation, it shall be verified that the addition or alteration complies with BS 7671 and does not impair the safety of the existing installation."
              </>
            }
            meaning={
              <>
                The retest verifies both halves of Reg 641.5: the repaired bit complies with BS 7671 AND the rest of the installation hasn&apos;t been made worse by the work. That second half is what the &ldquo;adjacent-circuit functional check&rdquo; is for &mdash; you&apos;re evidencing that nothing else has been disturbed.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.5."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the retest because 'the fix is obvious'"
            whatHappens={<>Apprentice rectifies an HRJ at a socket terminal — re-stripped, re-terminated, looks perfect. They don't retest because \'it\'s obvious\'. Customer plugs in the kettle five minutes after the apprentice leaves; the new termination wasn\'t quite tight enough; immediate trip. Customer calls back; apprentice returns; 30-minute drive each way; firm bears the cost. The retest would have caught the marginal termination in 30 seconds.</>}
            doInstead={<>Always retest after rectification. The retest is part of the job, not optional polish. EFLI Zs + continuity R1+R2 on the affected circuit is the minimum; full BS 7671 643 sequence for non-trivial fixes. The 15-minute retest investment saves the 90-minute return visit when retest would have caught the issue.</>}
          />

          <CommonMistake
            title="Walking out without the customer hand-back demonstration"
            whatHappens={<>Apprentice completes the rectification, retest passes, packs up and leaves. Customer is in another room and didn\'t see the work. They go back to the kitchen and see no obvious change; they\'re not sure if it\'s fixed. They call the office to query; office calls the apprentice; the apprentice has to explain over the phone. Customer satisfaction down; firm\'s call-handling time up; relationship at risk. The 30-second \'come and look' before leaving would have prevented all this.</>}
            doInstead={<>Five-step hand-back, every job. The 30 seconds of demonstration converts the customer from uncertain bystander to verified beneficiary. Customer\'s confidence is what generates repeat work and referrals.</>}
          />

          <Scenario
            title="Hand-back after kitchen circuit rectification"
            situation={<>You\'ve rectified a recurring kitchen RCBO trip by replacing a leaking dishwasher heater element. Retest passes. Customer is in the lounge.</>}
            whatToDo={<>Five-step hand-back. (1) Invite customer to the kitchen. \'Come and have a look — I\'d like to show you what I did and confirm it\'s working\'. (2) Demonstrate. \'Watch the breaker — I\'ll switch on the dishwasher\'. Switch on; breaker holds. \'And the kettle on top\'. Switch on; breaker holds. \'There you go — no trip even with both running\'. (3) Walk through. \'Your old dishwasher heater had developed a small earth leak — about 18 mA when it was on heat cycle. Combined with the everyday electronics in your kitchen, that pushed the total earth leakage past the breaker\'s 30 mA threshold and tripped it. I\'ve replaced the heater; the leak\'s gone; the breaker\'s no longer at risk of nuisance trips\'. (4) Provide docs. \'Here\'s your job sheet, the test results showing the breaker is now well within spec, and a one-page summary in plain English. The dishwasher heater is covered by a 12-month parts warranty; the workmanship is covered by my firm\'s standard 2-year warranty\'. (5) Next steps. \'No further work needed unless you notice trips returning. Any questions, call us anytime; the number\'s at the bottom of the summary\'. Job done.</>}
            whyItMatters={<>The hand-back closes the loop with the customer. They\'ve seen the fix, understood what was wrong, got the documentation, know the warranty, know how to contact you. The 5-minute hand-back generates 5-star reviews, repeat work, and referrals. Skipping it loses all that.</>}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Post-rectification retest is non-negotiable. BS 7671 643 tests on the affected circuit — continuity, IR, polarity, EFLI, RCD trip-time. Proves the fix worked.",
              "Document pre-rectification (failed) reading AND post-rectification (corrected) reading. The before/after pair is the proof.",
              "Functional testing complements electrical testing — does the system actually do what it's supposed to do? EL discharge, fire alarm walk test, RCD trip-time, smoke alarm activation.",
              "Customer hand-back is five steps: demonstrate, walk through, provide docs, educate, agree next steps. 5 minutes; converts work-done to customer-satisfied.",
              "Demonstration step (30 seconds): show the original symptom is gone. Customer goes from uncertain bystander to verified beneficiary.",
              "Customer-friendly summary in plain English (1 page) accompanies the technical job sheet. Customer reads once; references later.",
              "Certification trail: updated EICR / supplementary if pre-existing codes affected; MEIWC for the rectification work.",
              "New faults at retest are not unusual — investigate as new diagnostic problem; never dismiss as 'must have been there before'.",
            ]}
          />

          <Quiz title="Verification + functional testing — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.1 Repair vs replace</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.3 Restoring building fabric</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
