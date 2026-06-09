/**
 * Module 1 · Section 1 · Subsection 4 — RIDDOR, PUWER, COSHH, LOLER: depth refresher
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.1
 *   AC 1.1 — "identify roles and responsibilities with regard to current relevant
 *            Health and Safety legislation"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 1.2 — particular Health and Safety risks
 *
 * The four daughter regulations introduced at L2. L3 goes deeper — what
 * actually triggers a RIDDOR report, the supervisor judgement calls in
 * COSHH, PUWER risk assessment and LOLER inspection regimes.
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
  'RIDDOR, PUWER, COSHH, LOLER — depth refresher (1.1) | Level 3 Module 1.1.4 | Elec-Mate';
const DESCRIPTION =
  'L3 depth refresher on the four daughter regulations — RIDDOR reportable events, PUWER work equipment duties, COSHH substance assessment and LOLER lifting equipment inspection.';

const checks = [
  {
    id: 'l3-m1-s1-sub4-riddor-trigger',
    question:
      "An apprentice gets a 230V shock from a back-box that wasn't isolated properly. They're unhurt — no burn, no medical attention sought, back to work the same morning. Is this RIDDOR reportable?",
    options: [
      "Five-step. (1) Power on — confirm self-test passes (Megger and Kewtech both run automatic self-tests on power-up). (2) Continuity — short the leads together; reading should be the lead resistance (typically 0.10–0.30 Ω) with audible buzzer; null the leads if the unit supports it. (3) Insulation resistance — connect leads together, press test at 250 V — should read &gt;999 MΩ (open circuit). (4) Loop / EFLI — connect to a known live socket; reading should match known reference for that location (or be plausible — typically 0.4–1.5 Ω at a domestic socket). (5) RCD — check on a known-good RCD outlet; trip-time should match the RCD's rating. Five minutes; catches drift, battery issues, lead damage.",
      "Yes, even though there's no injury. RIDDOR Reg 7 lists 'dangerous occurrences' separately from injuries. Schedule 2 includes 'any explosion or fire which results in stoppage of the affected equipment for more than 24 hours' but the more directly applicable list is the 'electrical short circuit or overload attended by fire or explosion which results in the stoppage of the plant involved for more than 24 hours...' — for a personal contact event without injury the actual report category is more nuanced. In practice the firm should treat any unintended live contact as a near-miss for internal logging; some categories also become formally reportable depending on the facts. The L3 instinct: log it, report it internally, then check the formal RIDDOR list before deciding to send the F2508.",
      "Each product's commissioning depends on the others being in a known state. The battery commissioning needs the inverter live; the inverter needs the PV strings energised; the EV charger's load management needs the CT clamp reading correctly; the heat pump's smart controller needs network access to the HEMS; the HEMS needs all four products visible before it can configure dispatch logic. Doing them in the wrong order produces commissioning faults that are hard to diagnose because each individual product 'works' but the integrated behaviour fails. The MCS-certified designer should provide a commissioning sequence; the apprentice follows it.",
      "A UK charity providing emotional, physical and financial wellbeing support specifically to the construction community and their families. Headline services include a 24/7 confidential helpline (0345 605 1956), a Helpline app, financial assistance grants for trade workers in difficulty, mental health and wellbeing training (Mental Health First Aid, Wellbeing Training), and signposting to appropriate professional services. The helpline is staffed by trained advisers and is free. Anyone in the construction industry — apprentices, qualified tradespeople, family members — can call.",
    ],
    correctIndex: 1,
    explanation:
      "RIDDOR reportable events fall into four buckets: (a) deaths, (b) specified injuries (Schedule 1), (c) over-7-day injuries, and (d) dangerous occurrences (Schedule 2). 'Near-miss' isn't a RIDDOR category in itself, but the dangerous occurrence list catches some near-misses (e.g. unintentional electrical short circuit causing 24-hour plant stoppage). At L3 the right reflex is: log internally, check the formal list, escalate to the responsible person (Reg 4–6 of MHSWR Reg 7) and document the decision either way.",
  },
  {
    id: 'l3-m1-s1-sub4-puwer',
    question:
      "Your firm hires in a battery-powered SDS drill from a hire shop. Under PUWER 1998, who's responsible for ensuring it's safe to use?",
    options: [
      "No — the plastic incomer means the copper pipework cannot introduce a dangerous potential from outside. The note to Reg 411.3.1.2 is explicit: where non-metallic pipes enter a building and are then connected to metallic pipes within the building, the metallic pipes within the building do not normally require protective bonding as they are unlikely to be extraneous-conductive-parts.",
      "It continuously monitors the insulation resistance between the live DC conductors and earth, throughout the life of the array. A drop in insulation (a damaged cable, water in a connector) triggers an alarm or shuts down the inverter — catching insulation faults before they become DC arcing fires.",
      "Test instruments (MFTs and voltage indicators), insulated tools, electrical PPE (gloves, mats, face shields where applicable), lock-off devices, warning labels — all of it. Reg 4(4) is why your MFT must be in calibration, why your voltage indicator must comply with HSE GS38, why your insulated tools must be in date and undamaged, and why your lock-off kit has to actually work. Use unsuitable equipment and you breach Reg 4(4) regardless of whether the install itself is sound.",
      "The hire shop has duties as a supplier and (if they manage maintenance) under PUWER itself; YOUR firm has duties as the user — Reg 4 (suitability), Reg 5 (maintenance), Reg 6 (inspection), Reg 8 (information and instructions), Reg 9 (training). PUWER duties don't transfer with hire — they sit with whoever uses the equipment in the course of work. The hire ticket and the user-firm's pre-use check both have to happen.",
    ],
    correctIndex: 3,
    explanation:
      "Hired equipment is one of the most-prosecuted PUWER traps. Firms assume the hire shop owns the duty; the HSE prosecutes the user firm because they're the ones who operated it. The visual pre-use check, the test certificate review, the operator competence sign-off — all sit on the user firm under PUWER Reg 4–9.",
  },
  {
    id: 'l3-m1-s1-sub4-coshh',
    question:
      "You're cutting masonry chases in a 1980s commercial building. The dust contains respirable crystalline silica. Under COSHH 2002, what's the first thing the assessment should consider?",
    options: [
      "That the installation has more than one source of supply (mains plus PV, battery, generator, etc.), that opening the main switch does NOT isolate the entire installation, what additional isolation is needed, and where each isolation point is located. Critical for anyone working on the system because back-feed from PV/battery can energise the install with the main switch open.",
      "Risk Assessment + Method Statement. The risk assessment identifies hazards, evaluates the risk and lists the controls (required by Management of Health & Safety at Work Regs 1999 Reg 3). The method statement sets out HOW the work will be done safely, step by step. Together they're the working H&S document for a job — the inspector after an incident asks for both.",
      "Public Liability (PL, typically £5-10m cover, £200-500/year), Employers' Liability (EL, statutory minimum £5m under the Employers' Liability (Compulsory Insurance) Act 1969 — required if you have any employees), Professional Indemnity (PI, £1-2m cover for design liability if you do any design work, £300-800/year), Tools-in-Transit insurance, Business Vehicle insurance for company vans. Plus director and officer cover for the directors personally.",
      "Whether the work activity can be eliminated, substituted or engineered to avoid producing the silica dust at source — the COSHH hierarchy of control. PPE (FFP3 mask) is the LAST resort, not the first. On-tool extraction connected to an M-class vacuum, water suppression and route-planning that minimises chasing are all higher in the hierarchy than mask-only working. The HSE workplace exposure limit (WEL) for respirable crystalline silica is currently 0.1 mg/m3 8-hour TWA and is under regulatory review.",
    ],
    correctIndex: 3,
    explanation:
      "COSHH Reg 7 is built around the hierarchy of control: eliminate, substitute, totally enclose, partial enclosure with extraction, system of work, and finally PPE. Respirable crystalline silica is a HSE priority — it's now the second-biggest cause of occupational lung disease after asbestos. The L3 step: assess the activity, not just the substance. 'Cut less, capture at source, mask as last resort.'",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does RIDDOR 2013 stand for and what does it require?",
    options: [
      "Plan, manage and monitor construction work carried out either by the contractor or by workers under their control, to ensure that, so far as reasonably practicable, it is carried out without risks to health or safety. Includes complying with any directions of the principal designer / principal contractor and applying the general principles of prevention.",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — requires the responsible person (employer / self-employed / person in control of premises) to report to the HSE certain work-related deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences. Reports are made via the F2508 forms / online RIDDOR portal.",
      "The supervisor might notice: decreasing patience with apprentices' problems, emotional numbness when hearing about difficulties, cynicism about whether support makes a difference, withdrawal from mentoring conversations, and irritability — all signs that their empathic capacity is depleted and they need to restore their own emotional resources",
      "A fixed appliance is contributing leakage. Disconnect the dishwasher at its connection unit, retest. If IR rises above 1 MΩ the dishwasher was the cause. Disconnect the LED driver at the downlights, retest. The reading should now reflect the cable insulation alone — typically tens or hundreds of MΩ.",
    ],
    correctAnswer: 1,
    explanation:
      "Remember from L2 — RIDDOR is the reporting regulation. At L3 the depth: knowing which categories trigger which form, the timescales (immediate by phone for fatality / specified injury; F2508 within 10 days for the rest; F2508A within 15 days for over-7-day injury identified later), and the responsible-person identification.",
  },
  {
    id: 2,
    question: "Which of these is a 'specified injury' under RIDDOR Schedule 1?",
    options: [
      "(1) T+E shears or rotary cable stripper to crop the conductor square and to the right length. (2) Auto-stripper or preset 4 mm² stripper to remove insulation cleanly without nicking strands. (3) (Optional but preferred) — slip a grey 4 mm² bootlace ferrule on, ratchet-crimp it. (4) Insert into terminal. (5) Tighten with preset torque driver to manufacturer's value (typically 2–3 Nm for Schneider isolators).",
      "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger, unless they possess such knowledge or experience or are under appropriate supervision having regard to the nature of the work. So either you're competent yourself OR you're being supervised by someone who is. Working outside your competence without supervision is a Reg 16 breach.",
      "Fracture (other than to fingers, thumbs and toes); amputation; permanent loss of sight or reduction of sight; crush injuries leading to internal organ damage; serious burns covering more than 10% of the body or causing significant damage to eyes, respiratory system or other vital organs; scalpings requiring hospital treatment; loss of consciousness from head injury or asphyxia; any other injury arising from work in an enclosed space leading to hypothermia, heat-induced illness or requiring resuscitation or admittance to hospital for more than 24 hours.",
      "Pregnancy and maternity (s.18). The Act prohibits unfavourable treatment of women because of pregnancy or maternity leave during the 'protected period' (broadly, from the start of pregnancy to the end of maternity leave). This is a separate category to sex discrimination — pregnancy / maternity claims don't need a male comparator. It's one of the most enforced parts of the Act and a leading source of Employment Tribunal awards.",
    ],
    correctAnswer: 2,
    explanation:
      "Specified injuries are the serious-but-not-fatal category that requires immediate reporting. The 'crush', 'burn' and 'enclosed space' categories all routinely catch electrical incidents — arc-flash burns, falls from height, confined-space asphyxiation.",
  },
  {
    id: 3,
    question: "What's the timescale for reporting an over-7-day injury under RIDDOR?",
    options: [
      "Protection against transient overvoltages must be provided where the consequence could result in serious injury to, or loss of, human life (limb (a)), or significant financial or data loss (limb (c)) — limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023). For all other cases protection is required unless the owner declares it is not, accepting the risk. Regulation 443.4.1.",
      "A standard AC rotary switch has no DC breaking capacity. Opening it under load on a high-voltage DC string draws an arc that does not self-extinguish at zero crossing (DC has no zero crossing) and can sustain inside the switch — starting a fire. Reg 712.537 and the broader Section 462 require a switch suitable for DC isolation, normally a purpose-built PV DC isolator.",
      "AutoCAD is primarily a 2D drafting tool with 3D extensions; it is the lingua franca for drawings and works well for SLDs, layouts and schedules. Revit is a 3D BIM authoring tool — every object carries metadata and is part of a coordinated model with structural, mechanical and architectural disciplines.",
      "Within 15 days of the incident — Reg 4(2). The over-7-day injury is one where the worker is incapacitated for more than 7 consecutive days (excluding the day of the accident) and unable to perform their normal duties. The day-of-incident counting trips firms up — the count starts the day AFTER.",
    ],
    correctAnswer: 3,
    explanation:
      "Over-7-day = 8+ days off normal duties. Day of incident not counted. F2508A is the form. The timescale is 15 days from the incident (NOT from when the injury was reported).",
  },
  {
    id: 4,
    question: "What does PUWER 1998 cover?",
    options: [
      "All work equipment — anything used by an employee at work, including tools, machinery, vehicles, ladders, lifting equipment and apparatus. The duties cover suitability (Reg 4), maintenance (Reg 5), inspection (Reg 6), specific risks (Reg 7), information and instructions (Reg 8), training (Reg 9), conformity (Reg 10), dangerous parts protection (Reg 11), specified hazards (Reg 12), high/low temperature (Reg 13), controls (Reg 14–17), isolation (Reg 19) and stability (Reg 20).",
      "(1) Take the tool out of service immediately — don't try to use it 'gently'. (2) Apply the firm's quarantine tag ('do not use', signed and dated). (3) Move the tool to the firm's quarantine area (or, on site, to the supervisor's box). (4) Log the defect in the firm's tool register or defect log. (5) Tell the supervisor — verbally as well as written. (6) Get an alternative tool to continue the work. The fix happens later by a competent person; the apprentice's job ends at quarantine + report.",
      "Address fabric first — insulation and glazing — then size any heat pump to the reduced load. A heat pump in a leaky house works at high flow temperatures, runs constantly, and posts a poor SCOP, blowing the customer's bills past where they were on gas. The MCS heat-loss calculation methodology assumes a reasonably insulated envelope. The honest answer is fabric upgrade first, then size the kit to the new load — which often ends up being smaller and cheaper.",
      "Written grievance following the employer's documented grievance procedure (which the employer is required to provide under the ACAS Code of Practice on Discipline and Grievance). The written grievance triggers a structured response with timescales and right of appeal. Verbal complaints are easy to ignore; documented grievances are not. ACAS conciliation is available if the internal process fails.",
    ],
    correctAnswer: 0,
    explanation:
      "PUWER is the broadest equipment regulation in the UK. It covers everything from your screwdriver to a 32-tonne MEWP. The L3 depth: PUWER Reg 6 (inspection) drives the documented pre-use, periodic and after-event inspection regime that catches failing kit before it injures someone.",
  },
  {
    id: 5,
    question: "What does COSHH 2002 require?",
    options: [
      "IET Online = large technical document archive (standards, journals, conference papers) for searching and reference. IET Academy = structured online learning platform with bite-sized courses on technical topics (BS 7671, PV, EV, motor control, power quality, etc.). Both included with MIET membership. Online for reference; Academy for structured learning.",
      "Assessment of the risks from substances hazardous to health (Reg 6); prevention or control of exposure (Reg 7) using the hierarchy of control (eliminate, substitute, engineer, system of work, PPE); use and maintenance of control measures (Reg 8–9); monitoring of exposure (Reg 10); health surveillance where appropriate (Reg 11); information, instruction and training (Reg 12); arrangements for accidents, incidents and emergencies (Reg 13).",
      "Carry out visual inspection (cable condition, connector pins, enclosure integrity, ventilation), electrical testing (earth continuity, insulation resistance, RCD operation, loop impedance), verify smart functionality (communication, scheduling, firmware version), and check the control pilot signal is within specification",
      "A proving unit is a small portable source of low-voltage AC (typically 240 V or 110 V output) used to verify a voltage tester is functioning BEFORE and AFTER each safe-isolation test. The 'prove dead' routine: prove tester on the unit (should read live), test the circuit (should read dead), prove tester again on the unit (still reads live = tester is working = circuit really IS dead). Without proving the tester at both ends, a faulty tester reading 'dead' on a live circuit could kill you.",
    ],
    correctAnswer: 1,
    explanation:
      "COSHH covers far more than 'labelling' — it's the full assessment-and-control regime. The hierarchy of control is the core principle: eliminate the substance entirely first; if you can't, substitute for a less hazardous one; if you can't, engineer it out (extraction, enclosure); only then administrative controls and PPE. PPE is the last resort, not the first.",
  },
  {
    id: 6,
    question: "What does LOLER 1998 require for lifting equipment?",
    options: [
      "The Climate Change Act 2008 (as amended) commits the UK to net-zero greenhouse gas emissions by 2050. Buildings are roughly 17% of UK emissions; the Future Homes Standard and successive Part L revisions are the regulatory mechanism for hitting that target. Each Part L revision tightens the SAP / SBEM target rate — meaning new builds have to demonstrate progressively lower regulated CO₂ emissions to gain Building Regs approval.",
      "Where an offence under HASAWA is committed by a body corporate (a limited company) and is proved to have been committed with the consent or connivance of, or attributable to neglect on the part of, a director, manager, secretary or similar officer, that individual ALSO commits the offence and is liable to personal prosecution. Relevant once you become Approved Electrician, then a senior, then potentially a director — your personal liability scales with your role.",
      "That lifting equipment be of adequate strength and stability (Reg 4); positioned and installed to minimise risk (Reg 5); marked to indicate safe working loads (Reg 7); used in accordance with a written plan, supervised by a competent person, in a safe manner (Reg 8); thoroughly examined before first use, after assembly, periodically (every 6 months for lifting persons; every 12 months for other lifting equipment, or in accordance with an examination scheme) and after exceptional circumstances (Reg 9); examination reports kept (Reg 10).",
      "Yes, but only after preparing — switch off any sensitive loads on the same RCD, brief any occupants the supply may briefly trip, and be ready to reset the RCBO. Full trip-current mode is more accurate (typically plus or minus 5 percent vs plus or minus 10 percent for no-trip), and on a borderline result it can confirm whether the no-trip reading was accurate or whether you have a margin you can rely on. If the full mode confirms the reading you can document with higher confidence; if it differs significantly, investigate further.",
    ],
    correctAnswer: 2,
    explanation:
      "LOLER is the lifting-equipment subset of PUWER. The 6-month / 12-month periodic thorough examination intervals are the most-asked exam point — 6 months for anything lifting people (passenger hoists, MEWPs, accessibility lifts), 12 months for other lifting equipment (cranes, slings, hoists). The 'thorough examination' is performed by a competent person and recorded.",
  },
  {
    id: 7,
    question: "Under RIDDOR, what's the difference between a 'reportable disease' and a 'reportable dangerous occurrence'?",
    options: [
      "Re-make every disconnected termination, double-check via visual inspection that each conductor goes back to its correct terminal (brown to line, blue to neutral, green/yellow to CPC), refit all lamps and accessories, complete any remaining dead tests (e.g. earth electrode), then energise per the live test sequence in Section 4 — starting with Ze, PFC, then Zs and RCD/AFDD operation.",
      "A workmanship warranty is your written guarantee that the work you've done will be free from workmanship defects for a specified period — typically 1-2 years for standard electrical work, sometimes longer for renewables (RECC requires minimum 2-year workmanship warranty for MCS-registered work). Materials usually carry separate manufacturer warranties (passed through to customer). Clear warranty terms reduce disputes by setting expectations upfront.",
      "Apprentice is a formal JIB grade for someone in a registered apprenticeship — typically a learner working towards the C&G 2365 (or NVQ Level 3) and the AM2. 'Improver' is not a formal JIB grade — it's a colloquial industry term sometimes used for the post-college, pre-AM2 stage where the learner has completed the technical qualifications but not yet sat the AM2. Once AM2 is passed and JIB processes the upgrade, the worker becomes an Electrician on the JIB scale.",
      "Reportable diseases (Reg 8 + Schedule 3) are work-related ill-health diagnoses — carpal tunnel syndrome from repetitive work, occupational asthma, hand-arm vibration syndrome, certain cancers attributable to a known carcinogen at work. Reportable dangerous occurrences (Reg 7 + Schedule 2) are events that COULD have caused injury — collapse of lifting equipment, escape of dangerous substances, electrical short circuit causing 24+ hours plant stoppage, structural collapse, certain hazardous-area incidents.",
    ],
    correctAnswer: 3,
    explanation:
      "Diseases (F2508A) are diagnostic — a doctor confirms a specified work-related condition. Dangerous occurrences (F2508) are event-based — something happened that could have hurt someone. The L3 depth shift: knowing both lists exist means you don't miss a 'no-injury' event that's still RIDDOR reportable.",
  },
  {
    id: 8,
    question: "How does the COSHH hierarchy of control apply to silica dust from masonry chasing?",
    options: [
      "(1) Eliminate — can the chase be avoided entirely (surface mount, alternative route)? (2) Substitute — can a less dust-producing tool be used (resin-bonded chase saw with extraction vs hammer-and-bolster)? (3) Engineer — on-tool extraction connected to an M-class vacuum, water suppression. (4) Administrative — limit duration, rotate operatives, restrict access. (5) PPE — FFP3 mask as the LAST line, not the first. RPE alone is not COSHH-compliant for routine silica work.",
      "A document setting out how building safety risks are being identified, mitigated and managed for the HRRB. Includes the fire and structural risks, the strategies for managing them, the residents' engagement strategy, and the golden thread links. Must be kept under review and updated. Submitted to the BSR with the building registration.",
      "Bonding required per Reg 411.3.1.2 — the metal oil supply pipe is an extraneous-conductive-part liable to introduce a potential. Bond per Reg 544.1.2 — consumer side, before any branch, within 600 mm of point of entry where practicable. Use a BS 951 clamp suitable for oil application (similar specification to gas — DSEAR considerations apply).",
      "One per RCBO. Each RCBO is an independent RCD device. Test each at 1 x I delta n, record trip time on the Schedule of Test Results against the circuit number. Standard MFT workflow: select RCD test mode, set I delta n to 30 mA (or other rating per device), AC test, plug into the circuit\\\\\\\\'s socket or test from the RCBO load terminals, press TEST, record trip time, move to next circuit. 12 RCBOs = 12 tests + 12 readings on the schedule. Modern MFTs auto-fill the schedule when they\\\\\\\\'re paired with certification software.",
    ],
    correctAnswer: 0,
    explanation:
      "Silica is classed as a Group 1 carcinogen by IARC. The HSE WEL is 0.1 mg/m3 8-hour TWA and the limit is being kept under review (likely to fall). Mask-only working has been tested in court and routinely found inadequate where engineering controls were reasonably practicable. The L3 step: do the activity assessment, not just the substance assessment.",
  },
];

const faqs = [
  {
    question: "Who's the 'responsible person' under RIDDOR?",
    answer:
      "RIDDOR Reg 3 defines it as the employer (for employees), the self-employed person (for themselves), or the person in control of the premises (in some cases). For a typical electrical contractor incident on a customer's site, the firm's H&S manager or contracts manager makes the report. At L3 you might be the first person to identify a reportable event — your job is to escalate to the responsible person, not to make the report yourself.",
  },
  {
    question: "Does PUWER apply to my own personal hand tools I bring on site?",
    answer:
      "If you use them in the course of work, yes. PUWER Reg 2 defines 'work equipment' broadly. The fact you bought your own SDS drill doesn't change the duty — the firm still has Reg 4–9 duties towards you using it. In practice firms either issue tools or require evidence of competence and condition for personal kit. Very few firms permit fully unchecked personal kit on site.",
  },
  {
    question: "What's the LOLER difference between 'inspection' and 'thorough examination'?",
    answer:
      "Inspection (PUWER Reg 6 + LOLER Reg 9) is the routine pre-use, daily or periodic visual check by the user. Thorough examination (LOLER Reg 9) is a deeper, scheduled examination by a competent person who is independent of the user (often a third party) — typically every 6 months for lifting people and every 12 months for lifting loads. Both are required; they're not alternatives.",
  },
  {
    question: "When does COSHH apply to electrical work?",
    answer:
      "More often than apprentices think. Solder fume, flux, cleaning solvents, batteries (especially lithium), masonry dust, MDF dust, lead from old paint disturbed during chasing, asbestos (separately covered by CAR 2012), refrigerants from disturbed AC kit. Anything labelled with a CLP pictogram is automatic COSHH territory; many things without are too.",
  },
  {
    question: "If I think a near-miss should be RIDDOR reportable but my supervisor disagrees, what should I do?",
    answer:
      "Document your view in writing — short note, email to the supervisor, follow-up to the H&S manager. RIDDOR is a duty on the responsible person, not on you, but the duty to escalate sits with you under MHSWR Reg 14 (and HASAWA s.7). If you've raised it in writing and the responsible person decides not to report, the decision is on them. ERA 1996 s.44 protects you from detriment for raising it.",
  },
  {
    question: "Are the RIDDOR forms (F2508 etc.) still paper, or all online now?",
    answer:
      "The HSE strongly prefers online via riddor.hse.gov.uk. The F2508 series remains the form name but is submitted online. Telephone reporting (0345 300 9923) is available for fatalities and specified injuries that require immediate notification. The 10-day window (15 for over-7-day injuries) starts at the incident, not the report.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 4"
            title="RIDDOR, PUWER, COSHH, LOLER — depth refresher"
            description="The four daughter regulations you met at L2. L3 goes deeper — what actually triggers a RIDDOR report, supervisor judgement on COSHH and PUWER, and the LOLER inspection regime for the lifting kit you're using more often now."
            tone="emerald"
          />

          <TLDR
            points={[
              "Remember from L2 — RIDDOR is what gets reported, PUWER is your tools and equipment, COSHH is hazardous substances, LOLER is lifting kit. At L3 the question shifts from 'which one is this?' to 'who's the responsible person, what's the timescale, and where does the supervisor judgement land?'.",
              "RIDDOR has four buckets — deaths, specified injuries, over-7-day injuries and dangerous occurrences. The 'dangerous occurrences' list (Schedule 2) catches many no-injury events that L2 framing wouldn't have flagged.",
              "COSHH hierarchy of control puts PPE last. Activity-level assessment (eliminate / substitute / engineer / administer / PPE) is the L3 move. RPE-only working on routine silica chasing is rarely defensible.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the four RIDDOR reportable categories — deaths, specified injuries, over-7-day injuries, dangerous occurrences — and the relevant timescales (immediate / 10 days / 15 days).",
              "State the main PUWER 1998 duties — suitability, maintenance, inspection, training, controls, isolation — and apply them to hired and personal kit.",
              "Apply the COSHH 2002 hierarchy of control to a typical electrical job (silica dust, solder fume, cleaning solvents).",
              "Identify the LOLER 1998 thorough examination intervals — 6 months for lifting persons, 12 months for other lifting equipment — and the difference between examination and inspection.",
              "Identify the 'responsible person' under each regulation and the L3-level escalation route when judgement calls land on you.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>RIDDOR — depth on the four buckets</ContentEyebrow>

          <ConceptBlock
            title="Knowing what's reportable is half the battle"
            plainEnglish="RIDDOR Regs 4–9 set out four categories of reportable event. Each has its own timescale and form. The L3 depth: knowing the dangerous-occurrences list (Schedule 2) by structure, not just by name, so you don't miss a 'no-injury' event."
            onSite="Most firms over-report by a margin (good — defensive logging is fine). The L3 risk is under-reporting because the event 'wasn't that bad'. After-incident HSE attendance routinely uncovers events that should have been reported and weren't — the firm gets prosecuted under RIDDOR Reg 6 (failure to report) on top of the underlying breach."
          >
            <p>The four reportable buckets:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Deaths (Reg 6)</strong> — work-related fatality. Telephone immediately;
                F2508 within 10 days.
              </li>
              <li>
                <strong>Specified injuries (Reg 4 + Schedule 1)</strong> — fractures (excl
                fingers/thumbs/toes), amputations, sight loss, crush injuries, serious burns,
                scalpings, head-injury unconsciousness, enclosed-space injuries. F2508 within 10
                days.
              </li>
              <li>
                <strong>Over-7-day injuries (Reg 4(2))</strong> — incapacity for normal duties
                for more than 7 consecutive days (excl day of accident). F2508A within 15 days.
              </li>
              <li>
                <strong>Dangerous occurrences (Reg 7 + Schedule 2)</strong> — listed events that
                COULD cause injury: lifting equipment collapse, escape of dangerous substances,
                electrical short circuit causing 24+ hours plant stoppage, structural collapse,
                pipeline incidents, certain hazardous-area events. F2508 within 10 days.
              </li>
              <li>
                <strong>Reportable diseases (Reg 8 + Schedule 3)</strong> — diagnosed
                work-related conditions: carpal tunnel from repetitive work, occupational
                asthma, HAVS, certain cancers from listed carcinogens. F2508A.
              </li>
              <li>
                <strong>Gas incidents (Regs 11–12)</strong> — separate scheme for gas suppliers
                and Gas Safe registered engineers; not normally electrical-trade territory but
                worth knowing exists.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 4(1)"
            clause={
              <>
                &quot;Where any person dies as a result of a work-related accident, the
                responsible person must follow the reporting procedure.&quot; And Reg 4(2):
                &quot;Where any person at work suffers a specified injury (Schedule 1) as a
                result of a work-related accident, the responsible person must follow the
                reporting procedure.&quot;
              </>
            }
            meaning={
              <>
                The reporting procedure (Reg 6) is: notify the HSE without delay; send a report
                within 10 days of the incident. For specified injuries notification by phone is
                normally expected before the F2508 follows. The L3 step: knowing the procedure
                exists and the timescales lets you escalate accurately to the responsible person
                — &quot;this looks like a Schedule 1 specified injury, you need to phone the
                HSE today and submit the F2508 within 10 days&quot;.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 4."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PUWER — every tool, every job</ContentEyebrow>

          <ConceptBlock
            title="PUWER is broader than apprentices realise"
            plainEnglish="PUWER 1998 covers ALL work equipment — your screwdriver, your SDS, the customer's stepladder you borrow, the hire-shop MEWP. Reg 4 (suitability), Reg 5 (maintenance), Reg 6 (inspection), Reg 8 (information and instructions), Reg 9 (training) are the main duties, with controls/isolation/dangerous-parts/stability covered by Regs 11–20."
            onSite="The L3 trap: hired equipment. Firms assume the hire shop owns the duty; the HSE prosecutes the user firm because the user is the one who operated it. The pre-use visual check is your defence — and it must be genuine, not a tick-box."
          >
            <p>PUWER duties broken out:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — suitability</strong> — equipment fit for its intended use, used
                only for that purpose. Your fish-tape isn&apos;t a torque wrench.
              </li>
              <li>
                <strong>Reg 5 — maintenance</strong> — kept in efficient working order and good
                repair. Equipment maintenance log.
              </li>
              <li>
                <strong>Reg 6 — inspection</strong> — formal inspection at intervals appropriate
                to the equipment, after exposure to deteriorating conditions, and (where there
                are higher risks) by a competent person.
              </li>
              <li>
                <strong>Reg 8 — information &amp; instructions</strong> — the user gets adequate
                health and safety information, including written instructions where appropriate.
              </li>
              <li>
                <strong>Reg 9 — training</strong> — adequate training, including the methods
                that may be adopted and the precautions to be taken.
              </li>
              <li>
                <strong>Reg 11 — dangerous parts</strong> — protection from contact with moving
                or dangerous parts (guards, fixed enclosures, jigs, supervision).
              </li>
              <li>
                <strong>Reg 19 — isolation</strong> — work equipment must be capable of
                isolation from energy sources (the equipment-side echo of EAWR Reg 12).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>COSHH — assess the activity, not just the substance</ContentEyebrow>

          <ConceptBlock
            title="The hierarchy of control puts PPE last"
            plainEnglish="COSHH 2002 isn't 'wear a mask and tick the box'. Reg 7 builds in a hierarchy: eliminate the substance entirely first; if you can't, substitute for a less hazardous one; if you can't, engineer the exposure out (extraction, enclosure); then administrative controls (rotate, time-limit); then PPE as the last resort. RPE-only on routine silica chasing rarely satisfies COSHH."
            onSite="The L3 step: assess the activity, not just the substance. 'Cut less, capture at source, mask as last resort' is the supervisor framing. On-tool extraction with an M-class vacuum + FFP3 mask + restricted area is far more defensible than mask-only."
          >
            <p>Substances that catch electricians under COSHH:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Respirable crystalline silica</strong> — masonry chasing, brick cutting,
                concrete drilling. WEL 0.1 mg/m3 8-hour TWA, under review.
              </li>
              <li>
                <strong>Wood dust</strong> — particularly hardwood and MDF. Sensitiser; some
                hardwoods are Group 1 carcinogens.
              </li>
              <li>
                <strong>Lead</strong> — old paint disturbed during chasing in pre-1992 housing.
                Separately covered by Control of Lead at Work Regs 2002.
              </li>
              <li>
                <strong>Solder fume + flux</strong> — particularly rosin-based fluxes. Asthma
                trigger.
              </li>
              <li>
                <strong>Cleaning solvents</strong> — degreasers, contact cleaners.
              </li>
              <li>
                <strong>Battery electrolyte</strong> — particularly large-format lithium and
                lead-acid in installation work.
              </li>
              <li>
                <strong>Refrigerants</strong> — disturbed AC kit. F-Gas regulations also apply.
              </li>
              <li>
                <strong>Asbestos</strong> — pre-2000 buildings. Separately covered by CAR 2012
                (full Sub later in this module).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7(1)"
            clause={
              <>
                &quot;Every employer shall ensure that the exposure of his employees to
                substances hazardous to health is either prevented or, where this is not
                reasonably practicable, adequately controlled.&quot;
              </>
            }
            meaning={
              <>
                Prevention first; control second. &quot;Adequately controlled&quot; is defined
                in Reg 7(7) and tied to the workplace exposure limit and the hierarchy in Reg
                7(3). PPE is the last line. The HSE prosecutes COSHH cases hardest where the
                hierarchy was inverted — &quot;mask only, no extraction, no time limit&quot; on
                routine silica or solder work.
              </>
            }
            cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>LOLER — examination intervals matter</ContentEyebrow>

          <ConceptBlock
            title="6 months for lifting people; 12 months for everything else"
            plainEnglish="LOLER 1998 is the lifting-equipment subset of PUWER. Reg 9 sets the thorough examination cycle: 6 months for equipment that lifts people; 12 months for other lifting equipment; OR according to a written examination scheme. Plus after exceptional circumstances (overload, drop, modification)."
            onSite="On site you'll meet LOLER mostly through MEWPs, scaffold hoists, accessibility lifts, lifting slings and (occasionally) cable-pulling winches. The thorough examination certificate must be on site; check it before use. An out-of-date cert is a Reg 9 breach and the user firm gets prosecuted, not the hire shop."
          >
            <p>LOLER duties at L3 level:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — strength &amp; stability</strong> — equipment of adequate
                strength for the load and stable in use.
              </li>
              <li>
                <strong>Reg 7 — marking</strong> — Safe Working Load (SWL) clearly marked.
              </li>
              <li>
                <strong>Reg 8 — organisation of operations</strong> — every lifting operation is
                planned by a competent person, supervised, and carried out safely.
              </li>
              <li>
                <strong>Reg 9 — thorough examination &amp; inspection</strong> — before first
                use, after assembly, periodically (6/12 months), after exceptional circumstances.
              </li>
              <li>
                <strong>Reg 10 — reports &amp; defects</strong> — examination reports kept;
                defects reported to enforcing authority where appropriate.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PUWER Reg 6 — inspection in practice</ContentEyebrow>

          <ConceptBlock
            title="The inspection regime that catches failing kit before it injures"
            plainEnglish="PUWER Reg 6 requires inspection where the safety of work equipment depends on the installation conditions or where the equipment is exposed to deteriorating conditions liable to cause dangerous situations. Inspection runs in tiers — pre-use visual by the user, periodic detailed by a competent person, and after-event re-inspection following exceptional circumstances. The Reg 6 inspection isn&apos;t the same as PAT testing of portable electrical equipment, and it isn&apos;t the same as LOLER thorough examination — it&apos;s the broader equipment-fitness check."
            onSite="On site this looks like the Friday-afternoon test-instrument calibration check, the daily MEWP control check before raising the platform, the visual examination of a step ladder before climbing it. The L3 supervisor habit: never take kit out of the van without a 30-second visual; never put kit back without flagging anything that&apos;s changed."
          >
            <p>The PUWER Reg 6 inspection tiers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-use visual</strong> — performed by the user before each use. Cracks,
                damage, missing guards, loose fixings, wear. 30 seconds.
              </li>
              <li>
                <strong>Periodic detailed</strong> — by a competent person at intervals
                appropriate to the equipment, the use and the environment. Documented in the
                equipment register.
              </li>
              <li>
                <strong>After exceptional circumstances</strong> — drop, overload, accident,
                modification, exposure to weather. The next use waits for re-inspection.
              </li>
              <li>
                <strong>After installation or relocation</strong> — for equipment that depends
                on installation for safety. Lifting equipment, scaffold towers, fixed plant.
              </li>
              <li>
                <strong>Records</strong> — periodic and after-event inspections recorded.
                Pre-use checks usually only logged as exception when something is found.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>LOLER Reg 8 — planning the lifting operation</ContentEyebrow>

          <ConceptBlock
            title="Every lift is planned by a competent person"
            plainEnglish="LOLER Reg 8 requires that every lifting operation involving lifting equipment be (a) properly planned by a competent person; (b) appropriately supervised; and (c) carried out in a safe manner. The plan can be brief for routine lifts (an experienced operative on a familiar lift, low risk, light load) and detailed for complex lifts (multiple crane lifts, tandem lifts, lifts over occupied areas, persons in the load path)."
            onSite="On a typical electrical job the LOLER Reg 8 plan is mostly verbal for a quick cable pull or a small light fitting; it gets written when you&apos;re using a MEWP, a passenger hoist, a scaffold-mounted hoist or any load over a couple of hundred kilos. Knowing where the line sits between &quot;quick verbal plan&quot; and &quot;written plan&quot; is part of the L3 judgement."
          >
            <p>What a LOLER lift plan covers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load</strong> — weight, dimensions, centre of gravity, attachment
                points.
              </li>
              <li>
                <strong>Equipment</strong> — Safe Working Load, current LOLER thorough
                examination certificate, any restrictions on use.
              </li>
              <li>
                <strong>Path</strong> — start, route, end. Clearances overhead and to the side.
                People kept clear of the load path.
              </li>
              <li>
                <strong>Operatives</strong> — competent operator, banksman where required,
                signaller. Comms agreed.
              </li>
              <li>
                <strong>Conditions</strong> — wind speed limit (for outdoor lifts), ground
                stability for outriggers, weather forecast.
              </li>
              <li>
                <strong>Stop conditions</strong> — what triggers a pause and re-plan (wind,
                visibility, unexpected obstruction, change of load).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Lifting Operations and Lifting Equipment Regulations 1998 — Reg 8(1)"
            clause={
              <>
                &quot;Every employer shall ensure that every lifting operation involving lifting
                equipment is — (a) properly planned by a competent person; (b) appropriately
                supervised; and (c) carried out in a safe manner.&quot;
              </>
            }
            meaning={
              <>
                The lift-planning duty. The plan must be appropriate to the complexity — short
                verbal plan for a routine lift, written plan for a complex one. HSE&apos;s
                guidance L113 (Safe use of lifting equipment) sets out what counts as
                proportionate. At L3 you&apos;ll often be the person doing or supervising the
                lift — that means you&apos;re the one Reg 8 expects to have planned it.
              </>
            }
            cite="Source: Lifting Operations and Lifting Equipment Regulations 1998 (SI 1998/2307), Reg 8."
          />

          <SectionRule />

          <ContentEyebrow>COSHH — Workplace Exposure Limits and monitoring</ContentEyebrow>

          <ConceptBlock
            title="WELs are limits, not targets — and most fall over time"
            plainEnglish="The Workplace Exposure Limit (WEL) for a substance is published in HSE&apos;s EH40 — currently around 500 substances listed. Two reference periods: 8-hour Time-Weighted Average (long-term exposure) and 15-minute Short-Term Exposure Limit (acute exposure). The WEL is the legal CEILING; you should be aiming for &quot;as low as reasonably practicable&quot; below it. WELs trend downward over time as evidence of harm accumulates."
            onSite="The L3 trap: treating the WEL as a target. The Reg 7 hierarchy of control says &apos;prevented or adequately controlled&apos; — &apos;adequately controlled&apos; means as low as is reasonably practicable, not just at the WEL. For carcinogens (silica, hardwood dust, some solvents) there&apos;s no &quot;safe&quot; level — exposure should be minimised, not maintained at the limit."
          >
            <p>WELs that catch electricians most often:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Respirable crystalline silica</strong> — 0.1 mg/m³ 8-hour TWA. Under
                review for reduction. Carcinogen.
              </li>
              <li>
                <strong>Hardwood dust</strong> — 3 mg/m³ 8-hour TWA. Carcinogen.
              </li>
              <li>
                <strong>Softwood dust</strong> — 5 mg/m³ 8-hour TWA. Sensitiser.
              </li>
              <li>
                <strong>Lead</strong> — separate Lead at Work Regs 2002. Action level 50
                µg/m³ 8-hour TWA; biological monitoring also required.
              </li>
              <li>
                <strong>Solder fume (rosin-based flux)</strong> — 0.05 mg/m³ 8-hour TWA.
                Asthma trigger.
              </li>
              <li>
                <strong>Diesel engine exhaust emissions</strong> — under review; significant
                in confined-space and tunnel work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RIDDOR Schedule 2 — the dangerous-occurrence categories</ContentEyebrow>

          <ConceptBlock
            title="No-injury events that are still legally reportable"
            plainEnglish="RIDDOR Schedule 2 lists 27 categories of &quot;dangerous occurrence&quot; that must be reported even where nobody is hurt. Several are directly relevant to electrical work — short circuit / overload causing fire or explosion with 24+ hours plant stoppage; collapse of lifting equipment; collapse of scaffold over 5m; unintentional collapse of structure. The L3 reflex is to check the schedule whenever a no-injury event has wider impact."
            onSite="The trap: assuming &quot;no-one was hurt, no need to report&quot;. Some no-injury events are reportable; failure to report is a separate offence. Check the list. The schedule is short and bookmarkable on the HSE site (legislation.gov.uk &gt; SI 2013/1471 &gt; Schedule 2)."
          >
            <p>Schedule 2 categories most relevant to electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Para 19 — electrical short circuit</strong> — short circuit or overload
                attended by fire or explosion which results in stoppage of the affected plant
                for more than 24 hours.
              </li>
              <li>
                <strong>Para 1–3 — lifting equipment collapse / overturn</strong> — applies to
                MEWPs, hoists, cranes, scaffold towers used in electrical work.
              </li>
              <li>
                <strong>Para 6 — scaffold collapse</strong> — over 5m height. Common during
                strip-out and refurbishment work.
              </li>
              <li>
                <strong>Para 9 — biological agents</strong> — rare in electrical but covers
                Legionella exposure during cooling-tower or hot-water-system work.
              </li>
              <li>
                <strong>Para 10–13 — explosion / hazardous substance release</strong> — covers
                F-Gas refrigerant releases above thresholds; some battery-fire scenarios.
              </li>
              <li>
                <strong>Para 24 — collapse of building / structure</strong> — partial collapse
                affecting more than 5 tonnes of material.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating a hired MEWP as 'the hire shop's problem'"
            whatHappens={
              <>
                Apprentice signs out a hired scissor lift for high-level lighting work. The
                hire shop&apos;s LOLER cert is dated 11 months ago — fine. The apprentice
                doesn&apos;t do a pre-use check, doesn&apos;t check the platform load, and
                doesn&apos;t verify the operator competence has been transferred to them.
                The lift suffers a hydraulic leak partway through the day; the apprentice
                falls 3m. HSE prosecutes the FIRM (the user) under PUWER Reg 4–6 + LOLER
                Reg 8–9 — not the hire shop.
              </>
            }
            doInstead={
              <>
                Pre-use visual check on every lifting operation: examination cert in date,
                tyres/wheels intact, platform secure, controls operative, harness anchor
                points sound, SWL marked and within the planned load. PASMA / IPAF
                competence card for the operative. Documented lift plan. None of this is
                optional under LOLER.
              </>
            }
          />

          <CommonMistake
            title="Delaying RIDDOR reports because 'we'll see if it gets worse'"
            whatHappens={
              <>
                Apprentice falls and bruises wrist; goes to A&amp;E next day; X-ray shows
                fracture. Firm decides to &quot;wait and see&quot; before reporting. The
                10-day window passes, the fracture is later confirmed, the firm reports
                late. Two prosecutions follow — the underlying PUWER/MHSWR breach AND
                RIDDOR Reg 4 (failure to report within timescale). The late report
                converts a one-charge case into a two-charge case.
              </>
            }
            doInstead={
              <>
                When in doubt, report. The HSE doesn&apos;t penalise over-reporting. Late
                or missed reports are a separate offence. The 10-day clock starts at the
                incident, not at the diagnosis. F2508 online via riddor.hse.gov.uk;
                phone 0345 300 9923 for fatalities and specified injuries.
              </>
            }
          />

          <Scenario
            title="The dangerous occurrence the firm doesn't want to report"
            situation={
              <>
                You&apos;re fault-finding on a 32A three-phase distribution circuit at a
                small manufacturing client. A sequence of events causes a controlled
                short-circuit at the DB; the upstream breaker trips correctly, no-one is
                hurt, but the client&apos;s production line is down for the rest of the
                day (8 hours) while the fault is rectified. Your supervisor says
                &quot;don&apos;t worry about RIDDOR, no-one was hurt&quot;. The plant
                stoppage will end up being 28 hours by the time the customer is back up
                and running.
              </>
            }
            whatToDo={
              <>
                Pause and check Schedule 2. RIDDOR Schedule 2 includes &quot;the unintended
                or uncontrolled release or escape of any substance which would be likely to
                cause the death of, or major injury to, any person; OR an electrical short
                circuit or overload attended by fire or explosion which results in the
                stoppage of the plant involved for more than 24 hours&quot;. Whether this
                event is reportable depends on (a) was it &quot;attended by fire or
                explosion&quot;? (b) is the plant stoppage more than 24 hours? In this
                scenario the answer to (b) looks like yes (28 hours). The answer to (a)
                determines whether it&apos;s a Schedule 2 dangerous occurrence. Talk to
                the responsible person in your firm with the facts in front of you, and
                document your view in writing. If your supervisor refuses to report a
                Schedule 2 event, escalate to the H&amp;S manager or director. Failure to
                report is a separate offence under Reg 6.
              </>
            }
            whyItMatters={
              <>
                Dangerous occurrences are the &quot;no-injury but reportable&quot; category
                that L2 framing skips. The L3 step is checking Schedule 2 every time —
                it&apos;s not long, the categories are specific, and the cost of missing
                one is a separate Reg 6 prosecution. Your firm&apos;s reluctance to
                report doesn&apos;t change the duty; the duty sits on the responsible
                person and you&apos;ve discharged your part by raising it in writing.
                The customer&apos;s 28-hour line stoppage is also a commercial-impact
                event; the RIDDOR report doesn&apos;t change that, but the absence of one
                later, when the HSE attends for an unrelated reason and finds the
                near-miss in the firm&apos;s logs, makes the conversation much worse.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Remember from L2 — RIDDOR is reporting, PUWER is equipment, COSHH is substances, LOLER is lifting. At L3 the depth is in the Schedule lists, the timescales and the responsible-person identification.",
              "RIDDOR has four reportable buckets — death, specified injury, over-7-day injury, dangerous occurrence — plus diseases and gas incidents. Timescales: immediate phone for fatality / specified injury; F2508 within 10 days; F2508A within 15 days for over-7-day.",
              "Dangerous occurrences (Schedule 2) catch many no-injury events that L2 framing wouldn't have flagged. Check the list every time.",
              "PUWER applies to ALL work equipment, including hired and personal. The duty sits with the user firm, not the hire shop. Pre-use check is the user firm's defence.",
              "COSHH hierarchy of control: eliminate, substitute, engineer, administer, PPE. RPE-only on routine silica is rarely defensible. Assess the activity, not just the substance.",
              "LOLER thorough examination intervals: 6 months for lifting persons, 12 months for other lifting equipment (or per written scheme). Plus after exceptional circumstances.",
              "Late RIDDOR reports are a separate offence (Reg 6). When in doubt, report — the HSE doesn't penalise over-reporting.",
              "At L3 you may be the first to spot a reportable event. Your job is to escalate to the responsible person in writing, not to make the report yourself.",
            ]}
          />

          <Quiz title="RIDDOR, PUWER, COSHH, LOLER — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 MHSWR + CDM 2015
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Environmental legislation and waste
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
