/**
 * Module 4 · Section 1 · Subsection 3 — Safety checks used for tools
 * Maps to City & Guilds 2365-02 / Unit 204 / LO1 / AC 1.3
 *   AC 1.3 — "Describe safety checks used for tools"
 *
 * Frame: the layered inspection routine that keeps hand and power tools fit
 * for use. Pre-use visual every shift, in-service inspection by a competent
 * person, formal PAT on the documented cycle. The PUWER Reg 5 + EAWR Reg 4
 * legal hooks, the tag-out / lock-out routine for damaged tools, and the
 * calibration story for torque drivers and test instruments.
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
  'Safety checks used for tools (1.3) | Level 2 Module 4.1.3 | Elec-Mate';
const DESCRIPTION =
  'The layered tool-inspection routine — pre-use visual every shift, in-service inspection by a competent person, formal PAT on the documented cycle. PUWER Reg 5, EAWR Reg 4, the tag-out / lock-out routine for damaged tools, and the calibration story for torque drivers and test instruments.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod4-s1-sub3-pat-myth',
    question:
      "Your colleague says 'this drill was PAT'd in January, so it's fine all year — no need to check it'. Is he right?",
    options: [
      "Take the tool out of service. Apply a 'do not use' tag (or follow the firm's lock-out / tag-out procedure), put the tool aside, and report it to the supervisor. Insulating tape is NOT a repair on a 110 V (or any voltage) supply lead — once the outer sheath is breached, the cable is damaged and only a competent person can either repair it (replace the lead, not patch it) or condemn it. Your duty is to flag it, not fix it.",
      "No. PAT (Portable Appliance Testing) is one layer of inspection — typically annual for offices, every 3 months for harsh construction-site use. PUWER Reg 5 ALSO requires user pre-use visual checks every shift AND periodic competent-person in-service inspections between PATs. A tool can pass PAT in January and develop a damaged cable in February — the user check is what catches it.",
      "Use physiological regulation (controlled breathing to manage cortisol), cognitive reappraisal (reframe as \\\\\\\"this is a solvable technical challenge, not a personal attack\\\\\\\"), psychological flexibility (accept discomfort while committing to values of professionalism), and measured vulnerability (\\\\\\\"I understand this is frustrating — let me walk you through our resolution plan\\\\\\\")",
      "Electrical burns are usually small at the surface but deep at the tissue level — current passing through tissue heats it from the inside out. Thermal burns are usually obvious at the surface. Electrical burns may have separate entry and exit wounds. Both need cooling (10-20 min cool running water for thermal; less aggressive for electrical because of underlying tissue damage), covering with a clean non-adherent dressing, and medical assessment.",
    ],
    correctIndex: 1,
    explanation:
      "PAT is the formal electrical test on the documented cycle. It's necessary but not sufficient. PUWER Reg 5 expects three layers: pre-use visual by the operative every shift; periodic in-service inspection (a more thorough visual by a competent person at a documented interval — typically monthly for site tools); and PAT on the formal cycle. Treating PAT as the only check is the single most common mistake in real-world tool inspection.",
  },
  {
    id: 'mod4-s1-sub3-damaged-cable',
    question:
      "You're about to use a 110 V SDS and you spot a 20 mm split in the rubber outer sheath of the lead, midway along its length. The inner cores aren't visible but the sheath is clearly compromised. What do you do?",
    options: [
      "The run capacitor (typically 8–25 µF on a single-phase motor of that size) holds a charge. A 16 µF cap charged to 230 V peak (≈ 325 V) stores about 0.85 J — enough to throw your hand off a terminal if you bridge it. Standard discharge: short the capacitor terminals through a 10 kΩ resistor (NOT directly with a screwdriver — that pits the contacts and can weld). Test for residual voltage with the MFT before you touch.",
      "HASAWA s.3 — duty of every employer (and self-employed person) to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons NOT in their employment who may be affected are not exposed to risks to their health or safety. Visitors, neighbours, members of the public — all caught.",
      "Take the tool out of service. Apply a 'do not use' tag (or follow the firm's lock-out / tag-out procedure), put the tool aside, and report it to the supervisor. Insulating tape is NOT a repair on a 110 V (or any voltage) supply lead — once the outer sheath is breached, the cable is damaged and only a competent person can either repair it (replace the lead, not patch it) or condemn it. Your duty is to flag it, not fix it.",
      "Resolve it informally first where possible. The ACAS Code recommends informal resolution as the starting point, then a written grievance under the employer's documented grievance procedure, then a meeting with management with the right to be accompanied by a colleague or trade-union representative, then a written outcome with a right of appeal. ACAS conciliation is available if the internal procedure fails. Employment tribunal is the last resort and tribunals will assess whether both parties followed the Code reasonably.",
    ],
    correctIndex: 2,
    explanation:
      "Damaged supply cable on any portable tool = take out of service. PUWER Reg 5 (maintenance) and Reg 4 (suitability) both bite — a tool with a damaged lead is no longer in efficient working order and is no longer suitable for use. Apply a quarantine tag, put the tool in the firm's quarantine area, fill in the defect log, and tell the supervisor. The fix is a new lead fitted by a competent person — not insulating tape, never insulating tape.",
  },
  {
    id: 'mod4-s1-sub3-torque-cal',
    question:
      "Your firm's preset Wera 3.5 Nm torque screwdriver lives in the cab of the van and gets used every day for distribution-board terminations. The supervisor mentions it's 'due for calibration'. Why does that matter for an electrical install?",
    options: [
      "Torque tools drift over time — the spring inside that gives the click loses tension with use and temperature cycles. A 3.5 Nm preset tool that drifts to 4.5 Nm will over-torque every terminal it touches, deforming the conductor and the screw, and a tool that drifts to 2.5 Nm will under-torque every terminal, leaving high-resistance joints that fail R1+R2 on test and run hot in service. Annual calibration with a certificate is the standard requirement; some firms shorten that to 6-monthly for daily-use tools.",
      "Direct: replacement cable, replastering, redecoration, the second-fix electrician's wasted time, the first-fix electrician's wasted time being called back to identify the route. Indirect: programme delay, customer dissatisfaction, possible warranty claim. Operational: re-pull cable in a partly-finished property is much more disruptive than the original install. Reputational: customer tells the next-door neighbour the kitchen rewire 'went wrong'. The 5-minute discipline of taking phone-camera photos of every chase before plastering and adding a redline to the layout drawing prevents the entire chain.",
      "BS 7671 applies regardless of whether the install is MCS-certified — it's the electrical safety regulation, not an MCS option. On both MCS and non-MCS installs the L3 electrician is responsible for BS 7671 compliance — design, installation, inspection and testing, certification (EIC). On MCS installs the certified installer additionally signs off the MCS install pack and accesses the funding incentives. On non-MCS installs there's no MCS sign-off and no incentive access, but BS 7671 compliance is unchanged. The distinction matters for the customer's funding access; it doesn't matter for the L3 electrician's electrical responsibility.",
      "(a) To use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided in accordance with any training in the use of that equipment and the instructions respecting that use; AND (b) to inform the employer of any work situation which a person with the training and instruction given to them would reasonably consider represented a serious and immediate danger to health and safety, AND of any matter which a person with the training given would reasonably consider represented a shortcoming in the employer's protection arrangements.",
    ],
    correctIndex: 0,
    explanation:
      "Torque drivers and torque wrenches are precision instruments and they drift with use. Annual calibration with a UKAS-traceable certificate is the standard requirement (every 5,000 cycles or 12 months, whichever first, per most manufacturers). A drifted torque driver causes either over-torqued and damaged terminals or under-torqued and high-resistance terminals — both fail BS 7671 526.1, both cause real installation problems on EICR. Calibration certificates live in the firm's tool register and get checked at scheme audits.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "PUWER 1998 Reg 5 requires work equipment to be 'maintained in an efficient state, in efficient working order and in good repair'. Which inspection regime, taken as a whole, discharges that duty for portable site tools?",
    options: [
      "Customer-facing protection — dust sheets and floor protection on the route from van to work area, conversation with the customer about which rooms will be no-go zones during the work, awareness of who else is in the property (children, pets, elderly relatives, vulnerable adults), agreed working hours, and the constant background of HASAWA s.3 duty to non-employees. None of that applies in a void property.",
      "Three layers operating together: (1) operative pre-use visual inspection every shift — cable, plug, casing, guard, switch, anti-restart; (2) periodic in-service inspection by a competent person at a documented interval (monthly for harsh site use is typical); (3) formal Portable Appliance Test (PAT) on the documented cycle — every 3 months for 110 V site tools is HSE-recommended typical. Missing any one layer weakens the Reg 5 defence at any post-incident investigation.",
      "Self-Awareness: recognise the emotional response (possibly frustration or anxiety about change). Self-Regulation: manage the resistance impulse and reappraise the change as professional development. Motivation: connect the update to professional purpose and mastery. Empathy: understand that colleagues may be at different stages of acceptance. Social Skills: communicate the change constructively, help the team adapt, and create a learning environment for the new requirements",
      "Per Reg 643.7.2 (paraphrased): \\\"If any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified.\\\" So: repeat IR on the rectified circuit; also repeat continuity on that circuit (which preceded IR and could have been influenced by the same fault). Document corrected reading on the STR.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 5 expects a layered regime, not a single annual test. Pre-use visual is the operative's daily duty (HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) are the source documents for the layered routine on construction and harsh-environment use). In-service inspection is a competent-person job at a documented interval. PAT is the formal electrical test on the cycle. The three layers together demonstrate the firm has a 'system of work' for tool maintenance — which is what the HSE wants to see at any incident investigation.",
  },
  {
    id: 2,
    question:
      "EAWR 1989 Reg 4(2) requires that all electrical systems are 'maintained so as to prevent, so far as is reasonably practicable, danger'. How does this map onto a portable tool?",
    options: [
      "Multiple sources accepted by CPS schemes: scheme-organised events (NICEIC Connect, NAPIT events, ELECSA training), accredited training providers (JTL, NET, IET Academy, Elec-Mate), trade events (ECA Live, Electric Vehicles Show), online platforms (IET Academy, scheme portals), manufacturer training (sometimes counts), reading and self-study (some schemes accept evidence). Keep a CPD log with date, topic, time, source.",
      "The firm (the contracting business) is the data CONTROLLER — it decides what data to collect, why, and how to process it. The customer is the DATA SUBJECT — the person to whom the data relates. The processor would be a third party processing data on the firm's behalf (e.g. the cloud-hosted CRM, the accounting software, an offshore admin team).",
      "EAWR 'electrical systems' includes portable equipment supplied from those systems. A faulty 110 V SDS on a 110 V site supply is part of the electrical system in EAWR terms. The maintenance duty under Reg 4(2) covers the supply (transformer, leads, sockets) AND the equipment plugged into it. Visual checks, PAT, and competent-person inspection all sit under this duty — EAWR is the second statutory hook alongside PUWER.",
      "Reg 510.3 — 'Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions.' Selection AND erection. The 'take account of manufacturers' instructions' clause is what makes the data sheet effectively part of the standard.",
    ],
    correctAnswer: 2,
    explanation:
      "EAWR's definition of 'electrical system' is broad — it captures the supply chain from generation to point of use, including the portable equipment at the end. So a faulty drill on a site lead is squarely within EAWR Reg 4(2). The result is that PAT and pre-use checks discharge BOTH PUWER Reg 5 AND EAWR Reg 4(2) at the same time — two statutory hooks for the same activity.",
  },
  {
    id: 3,
    question:
      "What's the standard recommended PAT interval for a 110 V Class I (earthed metal-cased) portable tool used daily on a construction site, per HSE guidance HSG107 and the IET Code of Practice for In-service Inspection and Testing?",
    options: [
      "F-Gas Regulations require refrigerant recovery — into a calibrated cylinder, by an F-Gas-certified engineer. Venting fluorinated refrigerants is a criminal offence. The recovered refrigerant goes back to the supplier or a specialist recycling stream. Records are kept of every refrigerant transaction (charge, recovery) under the F-Gas register requirements. As the L3 electrician you don't handle refrigerant — but you should recognise that the F-Gas engineer's recovery activity is the regulated step at decommissioning. Improper venting attracts criminal prosecution under the Environmental Permitting Regulations.",
      "Five things. (1) Customer disputes the extra charge — firm has no signed authority and may have to write off the additional work. (2) Customer claims you did work they didn't authorise — even safety work the firm correctly deemed necessary. (3) Insurance dispute if the additional work later contributes to a problem — without authorisation paperwork, scope is ambiguous. (4) Scheme provider audit picks up the discrepancy between original quote and final invoice. (5) The relationship breaks down — customer feels stitched up, firm feels unappreciated, future work goes elsewhere. The 5-minute VO conversation prevents all five.",
      "Group flow requires all individual flow conditions PLUS additional social conditions: shared goals, close listening, equal participation, familiarity with each other, open communication, forward momentum, and an element of risk. The team must balance individual autonomy with collective coordination, creating a state where the group achieves more than any individual could alone",
      "Every 3 months — formal PAT (combined visual + electrical test) for harsh-environment use. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) publish typical intervals; construction-site Class I portable tools are at the short end at 3 months. Office Class I equipment is 12 months (the low-risk regime in HSE INDG236). Class II (double-insulated) and battery chargers are typically longer.",
    ],
    correctAnswer: 3,
    explanation:
      "The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (currently 5th edition) and HSE HSG107 'Maintaining portable electrical equipment' give typical intervals by class and environment. Construction-site Class I tools are 3-monthly because the environment is rough — cables get crushed, casings get knocked, water and dust get in. Office equipment runs much longer intervals. The interval is risk-based; the firm's appointed competent person sets it based on the specific tools and environment.",
  },
  {
    id: 4,
    question:
      "When you carry out a pre-use visual inspection on a 110 V portable tool, which six things should you check before plugging in?",
    options: [
      "(1) Supply cable — full length for cuts, abrasion, kinks, exposed conductor; (2) Plug — body intact, pins straight, cord-grip in place; (3) Tool casing — cracks, missing screws, contamination ingress; (4) Guard or shield — present, correctly fitted, not damaged; (5) Switch — operates positively, no stuck contacts, anti-restart works after release; (6) PAT label — current, in date, legible. Plus check the tool is the right one for the job.",
      "£150-300 per notifiable job — varies by Local Authority. Each notifiable Part P job (consumer unit replacement, new circuit in kitchen/bathroom, full rewire) requires either a Building Notice or full Building Regulations application before work, plus an LABC inspection during/after. Cost adds up fast for a busy domestic installer; CPS membership pays for itself in a handful of jobs.",
      "PSCC (Prospective Short Circuit Current) = the current that would flow in an L-N short-circuit fault, measured by the MFT applying brief test current via the L-N loop. Represents short-circuit fault scenarios. PEFC (Prospective Earth Fault Current) = the current that would flow in an L-E earth fault, measured by the MFT applying brief test current via the L-E loop. Represents earth-fault scenarios. The two are measured separately during a 3-lead Zs test; the higher value is reported as Ipf (PFC) for breaking-capacity verification.",
      "Stop using it. Apply a 'DO NOT USE' label or tag. Inform the supervisor. At base, do a function check on a known live source, calibration check against a reference instrument, visual inspection. If anything fails — send for repair / re-calibration; substitute with backup. PUWER 1998 Reg 5 + Reg 6 put the duty on the employer; the operative's prompt action protects the next user.",
    ],
    correctAnswer: 0,
    explanation:
      "Six points, every shift, every tool, before plugging in. Cable, plug, casing, guard, switch, label. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) are the apprentice-friendly briefings on this. Most firms produce a small wallet-sized checklist or a sticker on the back of the tool roll; the routine becomes second-nature within a few months and saves you from picking up the one tool with the dodgy lead.",
  },
  {
    id: 5,
    question:
      "You spot a tool in the van with a red 'do not use' tag attached and the supply lead detached. What's the correct response?",
    options: [
      "A workmanship warranty is your written guarantee that the work you've done will be free from workmanship defects for a specified period — typically 1-2 years for standard electrical work, sometimes longer for renewables (RECC requires minimum 2-year workmanship warranty for MCS-registered work). Materials usually carry separate manufacturer warranties (passed through to customer). Clear warranty terms reduce disputes by setting expectations upfront.",
      "Leave the tag in place. The tag means a competent person has identified a fault and quarantined the tool. Removing the tag without authority is a HASAWA s.7 breach (failure to co-operate with the employer's safety arrangements) AND likely a PUWER Reg 4 breach (using equipment that's not been certified suitable). Either find an alternative tool or speak to the supervisor.",
      "No — the STR is the regulatory document. The instrument download is a useful audit trail and a way to capture test data at the point of testing, but the completed STR with all required fields and signatures is what satisfies Reg 642.4 and Section 644. Most professionals use the download to populate the STR rather than as a standalone replacement.",
      "Within 15 days of the incident — Reg 4(2). The over-7-day injury is one where the worker is incapacitated for more than 7 consecutive days (excluding the day of the accident) and unable to perform their normal duties. The day-of-incident counting trips firms up — the count starts the day AFTER.",
    ],
    correctAnswer: 1,
    explanation:
      "Tag-out / lock-out is the formal way unsafe equipment is taken out of service while waiting for repair or condemnation. Removing the tag without authority defeats the safety system AND breaches HASAWA s.7 limb (b) (the duty to co-operate with safety arrangements). Same principle as not removing a colleague's lock-off on an isolated circuit. The tag stays until the competent person who fitted it (or someone with equivalent authority) removes it.",
  },
  {
    id: 6,
    question:
      "Hand tools (no electrical supply) still need safety checks. Which inspection regime applies to a pair of side cutters or an insulated screwdriver?",
    options: [
      "Where a 'provision, criterion or practice', a physical feature, or a lack of an auxiliary aid puts a disabled person at a substantial disadvantage compared with others, the employer must take such steps as it is reasonable to take to avoid the disadvantage. Three sub-duties — adjust the practice, adjust the physical feature, provide the auxiliary aid. The duty is anticipatory in some contexts (services) and reactive in employment (kicks in when the employer knows or ought reasonably to know).",
      "Modern EV chargers can leak smooth DC current under fault conditions — and a Type AC RCD won't trip on smooth DC. So Section 722 requires either a Type B RCD (which detects AC, pulsating DC and smooth DC) OR a Type A RCD plus an RDC-DD (a separate device that adds smooth-DC detection to a Type A RCD). The RDC-DD route is often cheaper than fitting a Type B RCD because Type A RCDs are widely available and inexpensive. The certified installer chooses the architecture; the customer doesn't see the difference but the regulatory compliance requires one or the other.",
      "Operative pre-use visual every shift — check the cutting edges aren't chipped or rolled, the pivot is tight, the handle insulation is intact (especially on VDE-rated drivers — any cracked or chipped insulation = take out of service). Periodic competent-person inspection — annually typical. No 'PAT' equivalent for non-powered hand tools, but the visual regime is just as important. PUWER applies to ALL work equipment, not just powered.",
      "Every 3 months — formal PAT (combined visual + electrical test) for harsh-environment use. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) publish typical intervals; construction-site Class I portable tools are at the short end at 3 months. Office Class I equipment is 12 months (the low-risk regime in HSE INDG236). Class II (double-insulated) and battery chargers are typically longer.",
    ],
    correctAnswer: 2,
    explanation:
      "PUWER applies to all work equipment, powered or not. Hand tools need pre-use visual checks (cutting edges, pivots, handles) and periodic competent-person inspection. VDE-rated insulated tools are particularly important — any visible damage to the insulation invalidates the 1000 V rating and the tool must be withdrawn. The visual routine is fast (a few seconds per tool) but catches the rolled cutter edge before it slips, the cracked driver handle before it shocks you.",
  },
  {
    id: 7,
    question:
      "Test instruments (multimeter, MFT, clamp meter) need calibration at a documented interval. What's the standard requirement and why does it matter?",
    options: [
      "On a monoblock unit the entire refrigerant circuit is contained inside the outdoor unit and only water pipes enter the building. The flammable-refrigerant indoor minimum-room-volume rule (under BS EN 378 and the F-Gas / refrigerant safety standards) only applies where flammable refrigerant is present in occupied indoor space. Splits that route refrigerant pipes indoors do trigger the rule and require detailed room-volume calculations.",
      "The monthly review brings together the apprentice, the employer (or supervisor) and the training provider's tutor or assessor. The review discusses progress on the apprenticeship standards, on-the-job competence, off-the-job training hours, any concerns from any side, and actions for the next month. The form is a record of the review and is part of the audit trail for the apprenticeship's compliance with the standards.",
      "Voltage drop on the upstairs lighting circuit, OR a problem at the upstairs lighting tap-off. Most likely causes: (1) HRJ at a junction box upstream of the upstairs lights, (2) loose terminal at the lighting RCBO, (3) high-resistance neutral on the upstairs circuit (broken or partially connected), (4) under-sized cable retrofit (someone replaced cable with smaller cross-section). Test: measure voltage at an upstairs lampholder under normal load; compare to nominal 230 V. If significantly low (&lt;220 V), trace upstream for the HRJ. Thermal imaging at the suspected location.",
      "Annual calibration to a UKAS-traceable standard, with a calibration certificate kept in the firm's instrument register. Test instruments drift over time — a multimeter that reads 235 V on a 230 V supply, or an insulation tester that reads 200 MΩ on a 100 MΩ test, will produce wrong test results that fail BS 7671 612.x. Most certification schemes (NICEIC, NAPIT) require evidence of in-date calibration as part of audit. Sub 1.5 covers test instruments in detail.",
    ],
    correctAnswer: 3,
    explanation:
      "Annual calibration with a UKAS-traceable certificate is the standard for test instruments used to demonstrate BS 7671 compliance. Megger, Fluke and Kewtech all offer manufacturer or third-party calibration services — typically £40–80 per instrument per year. The certificate is the evidence that the test results on your EIC / EICR are trustworthy. NICEIC, NAPIT and ELECSA all check this at scheme audits. Sub 1.5 unpacks test instruments specifically.",
  },
  {
    id: 8,
    question:
      "A site tool fails its pre-use visual check. What's the correct sequence of actions?",
    options: [
      "(1) Take the tool out of service immediately — don't try to use it 'gently'. (2) Apply the firm's quarantine tag ('do not use', signed and dated). (3) Move the tool to the firm's quarantine area (or, on site, to the supervisor's box). (4) Log the defect in the firm's tool register or defect log. (5) Tell the supervisor — verbally as well as written. (6) Get an alternative tool to continue the work. The fix happens later by a competent person; the apprentice's job ends at quarantine + report.",
      "A genuine shift to: \\\\\\\"This is the most challenging situation I have faced, but I now have a clear action plan to address the specific issues. I have identified three process improvements that will prevent recurrence. I feel motivated to apply these lessons, and this experience will make me a significantly more capable project manager\\\\\\\" — with the motivation to act matching the new belief",
      "Leather (heat-resistant) gloves rather than synthetic, eye protection rated for thermal hazards (EN 166 with thermal-hazard marking is preferable), long sleeves of natural fibre (synthetics melt onto skin), a fire blanket or extinguisher within arm's reach, and clearance of combustible materials from the work area. On commercial premises a hot-works permit is usually required as an admin control on top of the PPE — see Sub 5 of this section.",
      "Personally bound under s.110 (helping someone else commit an unlawful act, e.g. participating in harassment) and as a witness who is duty-bound to co-operate with internal investigations. The apprentice's reputational and legal exposure grows if they participate in or condone discriminatory or harassing behaviour. The apprentice also has a route to RAISE concerns — internal complaints procedure, ACAS conciliation, Employment Tribunal claim — and is protected against victimisation under s.27 for raising them in good faith.",
    ],
    correctAnswer: 0,
    explanation:
      "Six-step quarantine sequence, in that order. Out of service → tag → quarantine area → log → tell supervisor → continue with alternative. The PUWER Reg 5 system depends on damaged tools being taken out of circulation immediately, not used 'one more time'. The defect log gives the firm visibility on which tools fail at which intervals, which feeds back into purchasing and scheduling decisions.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Who actually does the formal PAT testing on a typical firm?",
    answer:
      "Three patterns. (1) The firm employs an in-house PAT tester (often a senior electrician with a City & Guilds 2377 qualification) who works through the inventory on a rolling cycle. (2) The firm contracts a third-party PAT testing service to come round and do the lot annually. (3) On larger sites, the principal contractor may PAT all tools on entry and tag them with a site-specific colour-of-the-quarter sticker. Smaller firms typically use option 2; larger firms often use option 1. Apprentices rarely do the formal test until later in their training, but the 2377 PAT qualification is one of the easier early add-ons most apprentices pick up at college.",
  },
  {
    question: "What do the different PAT label colours mean?",
    answer:
      "The colours aren't a national standard — different firms use different schemes. Most common: green = passed and in date, red = failed (do not use), amber = passed but limited use, white/blank = not tested. Some sites use quarterly colour rotation (red Q1, green Q2, blue Q3, yellow Q4) so anyone can spot a tool that's missed its quarterly retest at a glance. Always check the date on the label rather than relying on the colour alone — colours are firm-specific, dates are universal.",
  },
  {
    question: "If I damage a tool on the job, will I get in trouble?",
    answer:
      "Tools wear out — that's expected. Damaging one through normal use isn't a problem; it's how the wear-and-replace cycle works. Where you'd get in trouble is hiding the damage and putting the tool back — which puts the next user at risk. The right move is the same as for any other defect: take it out of service, tag it, log it, tell the supervisor. Firms much prefer an apprentice who reports a damaged tool to one who hides it. The reporting is what discharges your s.7 duty.",
  },
  {
    question: "Should I be doing user checks on the FIRM's tools, or just my own?",
    answer:
      "Both. PUWER Reg 5 puts the maintenance duty on the firm, but the operative's pre-use visual is a separate layer that applies to every tool you use, regardless of who owns it. The supervisor can't realistically check 50 tools at the start of every shift; the user check at the point of pick-up is what catches the new damage that's developed since the last formal inspection. If you pick up a firm tool, you check it before plugging in. Same routine as your own kit.",
  },
  {
    question: "What about my insulated screwdrivers — do they need PAT?",
    answer:
      "Not PAT — that's for powered equipment. VDE-insulated hand tools are checked visually for damage to the insulation. Any visible crack, chip, melt-mark or peel on the insulation = withdraw the tool from service. Some firms periodically dielectric-test VDE tools (apply a 10 kV AC test to confirm the 1000 V rating still holds) but that's a workshop / laboratory test, not a site one. The everyday check is purely visual: insulation intact, undamaged, undeformed.",
  },
  {
    question: "What's the difference between 'pre-use check' and 'in-service inspection' and 'PAT'?",
    answer:
      "Three different things, three different intervals, three different inspectors. Pre-use check — done by the operative at the start of every shift, takes seconds, purely visual (cable, plug, casing, guard, switch, label). In-service inspection — done by a competent person (often the supervisor or appointed PAT tester) at a documented interval (monthly typical for site tools), more thorough visual including opening the plug to check terminations. PAT — done by a 2377-qualified competent person at the formal cycle (3-monthly for site Class I), full electrical test including earth continuity, insulation resistance and lead polarity. Three layers, all under PUWER Reg 5.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 3"
            title="Safety checks used for tools"
            description="The layered inspection routine that keeps hand and power tools fit for use. Pre-use visual every shift, in-service inspection by a competent person, formal PAT on the documented cycle. The PUWER Reg 5 + EAWR Reg 4 legal hooks, the tag-out / lock-out routine for damaged tools, and the calibration story for torque drivers and test instruments."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three layers, every tool — pre-use visual every shift (operative duty), periodic in-service inspection (competent person, monthly typical for site), formal PAT on the cycle (3-monthly for 110 V site Class I).",
              "Damaged tool = quarantine, tag, log, report, replace. Insulating tape is NEVER a repair on a supply lead. The fix is a competent person fitting a new lead.",
              "Two regs sit behind the inspection routine — PUWER Reg 5 (maintenance) and EAWR Reg 4(2) (electrical systems maintained so as to prevent danger). Both bite at any incident investigation.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the three layers of tool safety inspection — operative pre-use visual every shift, in-service inspection by a competent person, formal Portable Appliance Test (PAT) on the documented cycle.",
              "Identify the six points of a pre-use visual check on a portable power tool — cable, plug, casing, guard, switch, PAT label.",
              "Apply the firm's tag-out / lock-out procedure to a defective tool and identify the HASAWA s.7 duty to leave a quarantine tag in place.",
              "State PUWER 1998 Reg 5 'maintenance' duty and explain how the three-layer regime discharges it.",
              "State EAWR 1989 Reg 4(2) 'electrical systems' maintenance duty and identify portable tools as part of the system.",
              "Recognise the calibration requirement for torque drivers and test instruments — annual UKAS-traceable certificate, kept in the firm's tool register.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub matters</ContentEyebrow>

          <ConceptBlock
            title="Tool maintenance is layered — never a single annual check"
            plainEnglish="The single biggest myth in tool safety is that 'PAT once a year and forget' covers it. PUWER Reg 5 expects a layered routine — the operative checks every shift, a competent person inspects more thoroughly at a documented interval, and PAT happens on the formal cycle. Three layers, three different inspectors, all running together. Missing any one weakens the legal defence and lets dangerous tools through."
            onSite="Walk into a tidy firm's van and you'll see PAT labels on every plug-in tool, a quarantine box for defective kit, a tool register on a clipboard, and a wallet-card pre-use check list in every operative's pocket. That's not bureaucracy — that's PUWER Reg 5 made visible. Walk into a sloppy firm's van and the labels are missing, the quarantine box has working tools in it, and nobody can tell you when the last check happened. That's how HSE prosecutions get built."
          >
            <p>
              The three layers in detail:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Layer 1 — Operative pre-use visual</strong>. Every shift, every tool, before plugging in. Six points: cable, plug, casing, guard, switch, label. Takes seconds per tool. The apprentice&apos;s daily duty.
              </li>
              <li>
                <strong>Layer 2 — In-service inspection</strong>. Documented interval (monthly typical for site tools, less frequent for office). Carried out by a competent person — usually the supervisor or appointed PAT tester. More thorough — may open the plug, check terminations, check brushes (corded tools), check trigger switch contacts.
              </li>
              <li>
                <strong>Layer 3 — Portable Appliance Test (PAT)</strong>. Formal electrical test on the documented cycle (3-monthly for 110 V site Class I tools per HSE HSG107 and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th ed.). Carried out by a 2377-qualified competent person (in-house or contracted). Tests earth continuity (Class I), insulation resistance, lead polarity, switch operation. Produces a pass / fail label.
              </li>
            </ul>
            <p>
              All three together discharge PUWER Reg 5. Take any one out and you&apos;ve got a gap that a damaged tool will eventually slip through.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The legal hooks</ContentEyebrow>

          <ConceptBlock
            title="PUWER Reg 5 and EAWR Reg 4(2) — both bite, simultaneously"
            plainEnglish="Two statutory hooks back the inspection routine. PUWER Reg 5 covers ALL work equipment. EAWR Reg 4(2) covers ELECTRICAL SYSTEMS — and a portable electric tool plugged into a site supply is part of that system. Both regs require the same thing in slightly different words: keep the kit in good working order so it doesn't cause harm."
          >
            <p>
              The two regulations:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Provision and Use of Work Equipment Regulations 1998 — Reg 5"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 5(1)</strong> &mdash; &quot;Every employer shall ensure that work
                  equipment is maintained in an efficient state, in efficient working order and in
                  good repair.&quot;
                </p>
                <p>
                  <strong>Reg 5(2)</strong> &mdash; &quot;Every employer shall ensure that where any
                  machinery has a maintenance log, the log is kept up to date.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 5(1) is the maintenance duty. &quot;Efficient state, working order, good
                repair&quot; is the bar. Reg 5(2) is the documentation duty &mdash; if there&apos;s
                a maintenance log (and for portable tools there always is, in the firm&apos;s tool
                register), it has to be kept current. The HSE asks to see the log at any
                investigation; an empty or out-of-date log is itself evidence of breach.
              </>
            }
            cite="Source: Provision and Use of Work Equipment Regulations 1998 (S.I. 1998/2306), Reg 5 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 4(2)"
            clause={
              <>
                &quot;As may be necessary to prevent danger, all systems shall be maintained so as to
                prevent, so far as is reasonably practicable, such danger.&quot;
              </>
            }
            meaning={
              <>
                EAWR&apos;s definition of &apos;system&apos; in Reg 2 is broad &mdash; it includes
                &quot;an electrical system in which all the electrical equipment is, or may be,
                electrically connected to a common source of electrical energy&quot;. That captures
                the portable tool plugged into a site supply. So PAT, in-service inspection and
                pre-use checks discharge Reg 4(2) at the same time as PUWER Reg 5 &mdash; one
                routine, two regs covered.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (S.I. 1989/635), Reg 4(2) — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Pre-use visual — the daily six-point check</ContentEyebrow>

          <ConceptBlock
            title="Six points, every shift, every tool, before plugging in"
            onSite="The six-point check is the apprentice's most-repeated H&S routine. It takes about 10 seconds per tool once you've done it 100 times. Doing it visibly, every time, is what tells the supervisor you understand PUWER Reg 5 and what stops the one cracked-cable tool getting plugged in on a wet site morning."
          >
            <p>
              The six points, in order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Supply cable</strong> &mdash; whole length. Cuts, abrasion, kinks, exposed conductor, taped repairs (a taped repair = quarantine; it&apos;s not a repair, it&apos;s a marker that something needs replacing). Particular attention to the entry into the plug and entry into the tool body &mdash; those are the two most common failure points.
              </li>
              <li>
                <strong>2. Plug</strong> &mdash; body intact, no cracks. Pins straight and not pitted or burned. Cord-grip clamping the cable sheath, not the conductors. For 110 V CEEform plugs, the screw-collar is properly tight.
              </li>
              <li>
                <strong>3. Tool casing</strong> &mdash; cracks, missing screws, contamination ingress (cement dust, water marks, oil). Vents clear so the motor can breathe.
              </li>
              <li>
                <strong>4. Guard or shield</strong> &mdash; present, correctly fitted, not damaged. Particular attention on angle grinders (the most-removed guard on site) and circular saws.
              </li>
              <li>
                <strong>5. Switch</strong> &mdash; operates positively, no stuck contacts, anti-restart (no-volt release) works after release. Test by trigger-only operation before connecting the supply.
              </li>
              <li>
                <strong>6. PAT label</strong> &mdash; current and in-date. Read the date, not just the colour. If the date is in the past, take it out of service.
              </li>
            </ul>
            <p>
              Six points. Ten seconds. Every tool, every shift. The routine is what catches the cable that got crushed yesterday and the plug that got knocked off the kerb.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PAT — the formal electrical test</ContentEyebrow>

          <ConceptBlock
            title="What PAT actually tests, and how often"
            plainEnglish="PAT (Portable Appliance Testing) is the formal electrical test layer. It's a combined visual inspection and electrical test carried out by a competent person on a documented cycle. Despite the name 'testing' it's NOT just an electrical test — the visual is the bigger half of the job."
            onSite="Most apprentices won't do the formal PAT until they've done the City & Guilds 2377 qualification (a short add-on course, often a single weekend). Until then your job is to (a) do the daily visual, (b) recognise an in-date PAT label, and (c) take any tool with an out-of-date or missing label out of service."
          >
            <p>
              The PAT cycle:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection</strong> &mdash; the same six-point check as the daily routine, but more thorough. The tester may open the plug to inspect terminations, may open the tool body to check internal connections.
              </li>
              <li>
                <strong>Earth continuity test (Class I tools)</strong> &mdash; checks the path from the plug earth pin to any exposed metal of the tool. Limit typically &lt; 0.1 &Omega; per metre of lead.
              </li>
              <li>
                <strong>Insulation resistance test</strong> &mdash; 500 V DC test between live conductors and earth. Limit typically &gt; 1 M&Omega; for hand-held equipment.
              </li>
              <li>
                <strong>Polarity check</strong> &mdash; lead is wired correctly L to L, N to N, E to E.
              </li>
              <li>
                <strong>Switch operation</strong> &mdash; on/off works, no-volt release functions.
              </li>
            </ul>
            <p>
              Pass &rarr; new label with date and tester ID. Fail &rarr; quarantine tag, tool out of service, defect logged, supervisor notified for repair or condemnation. The full PAT regime is governed by the IET&apos;s Code of Practice for In-service Inspection and Testing of Electrical Equipment (currently 5th edition).
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

          <ContentEyebrow>Quarantine and tag-out</ContentEyebrow>

          <ConceptBlock
            title="The 'do not use' tag is a safety system, not a sticker"
            onSite="Quarantine tags work the same way as lock-offs on isolated circuits — they're a formal indication that something is unsafe and not to be used. Removing one without authority is the same s.7 breach as removing someone else's lock-off. The tag stays until the competent person who fitted it (or someone with equivalent authority — usually the supervisor) is satisfied the tool is fixed."
          >
            <p>
              The defective-tool sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Out of service</strong> &mdash; stop using it. Don&apos;t try to use it &apos;gently&apos; or &apos;just for one more job&apos;.
              </li>
              <li>
                <strong>2. Apply quarantine tag</strong> &mdash; the firm&apos;s &quot;do not use&quot; tag, signed by you and dated. Some firms also detach the supply lead as a physical reinforcement.
              </li>
              <li>
                <strong>3. Move to quarantine area</strong> &mdash; firm&apos;s designated spot. On site, the supervisor&apos;s box or an equivalent locked area. Not back in the van&apos;s general tool box.
              </li>
              <li>
                <strong>4. Log the defect</strong> &mdash; firm&apos;s tool register, defect log, or whatever paperwork the firm uses. Include the tool ID, the fault, the date, your name.
              </li>
              <li>
                <strong>5. Tell the supervisor</strong> &mdash; verbally as well as written. Don&apos;t rely on the paperwork being checked.
              </li>
              <li>
                <strong>6. Continue with alternative</strong> &mdash; get a replacement tool from the van or the supervisor. Don&apos;t skip the job; don&apos;t reuse the tagged tool.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Calibration of torque tools and test instruments</ContentEyebrow>

          <ConceptBlock
            title="Calibration is the inspection layer for precision tools"
            plainEnglish="PAT covers electrical safety. Calibration covers measurement accuracy. Torque drivers, torque wrenches, multimeters, MFTs, clamp meters, insulation testers — anything that has a numerical reading drift over time and needs periodic verification against a known reference. Annual calibration with a UKAS-traceable certificate is the standard requirement."
            onSite="When the supervisor sends a torque driver away for calibration it normally goes to a manufacturer (Wera, Wiha) or a UKAS-accredited calibration lab. Cost is £30–60 per tool. The certificate comes back, the date goes in the firm's instrument register, and the cycle repeats annually. Without the certificate the tool can't be used to demonstrate compliance with anything that needs a documented torque value."
          >
            <p>
              The two main families that need calibration:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Torque tools</strong> &mdash; preset torque screwdrivers (Wera Click-Torque, Wiha torqueVario), torque wrenches (Norbar, Teng). Drift caused by spring fatigue and temperature. Annual calibration typical; some manufacturers say every 5,000 cycles. Critical for distribution-board terminations (1.2&ndash;3.5 Nm typical) and any control-gear work where torque is specified.
              </li>
              <li>
                <strong>Test instruments</strong> &mdash; multimeters, MFTs, clamp meters, insulation testers, voltage testers. Drift caused by component ageing and shock. Annual calibration with a UKAS-traceable certificate is required by NICEIC, NAPIT and ELECSA at scheme audits. Sub 1.5 covers test instruments in detail.
              </li>
            </ul>
            <p>
              The firm keeps an instrument register listing every calibrated tool, its serial number, last calibration date, next calibration due date, and the calibration certificate reference. At a scheme audit the assessor asks to see this register and a sample of certificates. An out-of-date instrument used for a documented test result invalidates that test.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The firm&apos;s tool register</ContentEyebrow>

          <ConceptBlock
            title="What the paperwork actually looks like"
            plainEnglish="PUWER Reg 5(2) requires the maintenance log to be kept up to date. For a typical electrical contractor that means a tool register — a list of every tool the firm owns, with its inspection and PAT history. The register is what the HSE and the certification scheme assessor ask to see, and what feeds the supervisor's pre-shift sign-off on whether each tool is fit for work."
            onSite="Most firms run the tool register either as a spreadsheet in Google Sheets / Excel or in a dedicated tool-management app (Trakopolis, ToolWatch, ShareMyToolbox). The register is updated by the appointed PAT tester after each formal test, by supervisors when defects are reported, and by the office when new tools are purchased. Apprentices don't usually edit the register directly but should know how to look up a tool's status if asked."
          >
            <p>
              A typical tool-register entry holds:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tool ID / asset number</strong> &mdash; firm-allocated unique identifier, often punch-marked or barcoded onto the tool body.
              </li>
              <li>
                <strong>Description</strong> &mdash; make, model, serial number (e.g. &quot;Makita HR2811FT 110 V SDS-Plus, S/N 12345&quot;).
              </li>
              <li>
                <strong>Voltage / class</strong> &mdash; 110 V, 230 V, cordless; Class I (earthed metal case) or Class II (double-insulated).
              </li>
              <li>
                <strong>Assigned operative or location</strong> &mdash; named individual or van/site.
              </li>
              <li>
                <strong>Last PAT date and result</strong> &mdash; with tester ID and pass/fail.
              </li>
              <li>
                <strong>Next PAT due date</strong> &mdash; calculated from the interval (3-monthly for 110 V site Class I).
              </li>
              <li>
                <strong>Defect history</strong> &mdash; list of reported faults with dates and resolution (repaired / replaced / condemned).
              </li>
              <li>
                <strong>Calibration date and next-due date</strong> &mdash; for torque tools, test instruments, anything calibratable.
              </li>
            </ul>
            <p>
              The register is the firm&apos;s legal evidence under PUWER Reg 5 / Reg 5(2) and EAWR Reg 4(2) that the &quot;system of work&quot; for tool maintenance exists and is being followed. At a NICEIC / NAPIT scheme audit the assessor asks to see it. At an HSE incident investigation the inspector asks to see it. An empty or out-of-date register is itself evidence of breach.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating PAT as the only check that matters"
            whatHappens={
              <>
                Apprentice picks up a 110 V SDS at the start of a shift. PAT label says
                &apos;tested 6 weeks ago, valid for 3 months&apos;. Apprentice doesn&apos;t look
                further &mdash; PAT is in date, so the tool must be safe. Plugs in. The supply
                lead has been crushed by the van&apos;s sliding door overnight and the inner cores
                are showing through a 30 mm split in the outer sheath. RCD on the transformer trips
                immediately. Tool is destroyed; the apprentice gets a fright and a lecture.
              </>
            }
            doInstead={
              <>
                Pre-use visual check is YOUR daily duty regardless of PAT status. The PAT label
                says the tool was safe SIX WEEKS AGO &mdash; it doesn&apos;t say anything about
                what happened in the van between then and now. Six points: cable, plug, casing,
                guard, switch, label. Ten seconds per tool. The label is one of the six checks,
                not a substitute for the other five.
              </>
            }
          />

          <CommonMistake
            title="Insulating-taping a damaged supply lead and carrying on"
            whatHappens={
              <>
                Apprentice notices a small split in a 110 V supply lead, wraps three turns of
                insulating tape around it, and uses the tool for the rest of the day. Tape works
                fine for the day. Two weeks later the tape has lifted at the edge, water has got
                in, the inner conductor is corroded, and the next user gets a shock when an
                un-RCD&apos;d 230 V tool is used on a parallel circuit and induced voltage hits
                the now-exposed cable. The original apprentice didn&apos;t cause the shock but the
                paper trail leads back.
              </>
            }
            doInstead={
              <>
                Insulating tape is NEVER a repair on a supply lead. The fix is a competent person
                fitting a new lead. As soon as the outer sheath of a portable tool&apos;s lead is
                breached, the tool goes out of service: tag, log, report, replace. The whole point
                of the layered inspection routine is that NO tool with a known fault stays in
                circulation. A taped lead is a fault sticker, not a fix.
              </>
            }
          />

          <Scenario
            title="Pre-use check catches a crushed lead before plug-in"
            situation={
              <>
                You arrive on a fit-out at 7am. The van&apos;s tool box has been knocked about by
                the firm&apos;s overnight stock movements and a 110 V combi drill&apos;s lead has
                been pinched between the sliding door and the bulkhead. There&apos;s a 25 mm flat
                spot in the rubber sheath, the outer is intact but flattened and the cable feels
                stiff at that point when you flex it. PAT label is in date (last tested 8 weeks
                ago). What do you do?
              </>
            }
            whatToDo={
              <>
                Take the drill out of service. The pre-use visual check has done its job &mdash;
                the lead has been mechanically damaged since the last PAT and the integrity of
                the cores can&apos;t be confirmed without an electrical test. Apply the firm&apos;s
                quarantine tag, write the fault on the defect log (&quot;crushed/flattened lead
                25 mm from plug, feels stiff on flex&quot;), put the drill in the supervisor&apos;s
                box, tell the supervisor verbally, and pick up an alternative drill from the van.
                The supervisor will arrange a new lead to be fitted by a competent person back at
                the workshop &mdash; that&apos;s a 10-minute repair that the apprentice doesn&apos;t
                do.
              </>
            }
            whyItMatters={
              <>
                The pre-use check exists for exactly this scenario &mdash; the damage that has
                happened SINCE the last PAT. PAT alone would have missed it. Catching it at
                7am stops a 30 mA RCD trip mid-job (or worse, an un-RCD&apos;d circuit causing a
                shock). The 30 seconds you spent on the visual saved the firm a tool, the
                supervisor an investigation, and you a hospital trip. That&apos;s why the layered
                regime exists and why the operative&apos;s daily duty is as important as the
                competent-person&apos;s formal test.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three layers of inspection — operative pre-use visual every shift, in-service inspection by a competent person at a documented interval, formal PAT on the cycle (3-monthly for 110 V site Class I per HSE HSG107 + IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th ed.).",
              "Six-point pre-use check — cable, plug, casing, guard, switch, PAT label. Every tool, every shift, before plugging in. Ten seconds per tool once it's a habit.",
              "PUWER 1998 Reg 5 (maintenance) and EAWR 1989 Reg 4(2) (electrical systems maintained) both bite at the same time. The three-layer regime discharges both regs simultaneously.",
              "Defective tool sequence = take out of service, quarantine tag, move to quarantine area, log the defect, tell the supervisor, continue with an alternative. Insulating tape is NEVER a repair on a supply lead — the fix is a competent person fitting a new lead. Don't be the apprentice who 'uses it gently' or hides damage.",
              "Quarantine tag is a safety system, not a sticker. Removing it without authority is a HASAWA s.7 breach (failure to co-operate with employer's safety arrangements) — same as removing a colleague's lock-off.",
              "Hand tools (no electrical supply) still need pre-use visual checks under PUWER. VDE-insulated drivers — any visible damage to the insulation = withdraw from service.",
              "Torque tools and test instruments need annual UKAS-traceable calibration. Drifted torque drivers cause over- or under-torqued terminations that fail BS 7671 526.1. Drifted test instruments produce wrong test results that fail BS 7671 612.x.",
              "The firm's tool register is the legal evidence under PUWER Reg 5(2) that the maintenance system exists. NICEIC / NAPIT assessors and HSE inspectors both ask to see it; an empty register is itself evidence of breach.",
            ]}
          />

          <Quiz title="Tool safety checks knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 Power tools
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Cable-prep tools
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
