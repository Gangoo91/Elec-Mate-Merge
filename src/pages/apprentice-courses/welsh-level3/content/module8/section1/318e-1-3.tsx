/**
 * Ported from the English course, combining:
 *   level3/module4/section1/Sub4.tsx
 *   level3/module4/section1/Sub3.tsx
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const checks = [
  {
    id: 'mod4-s1-sub4-barrier',
    question:
      "You're working on an exposed busbar inside a Schneider Acti9 DB at a small office reception. The reception is in normal use during the work. What barrier and signage are required?",
    options: [
      "A single 'Danger — Electrical Work' sign taped to the front of the open DB is enough — the sign warns anyone approaching and a busy reception can't have a barrier blocking pedestrian flow. Signage alone does not satisfy the duty to non-employees; a sign with no physical separation lets a bystander walk straight into the danger zone of exposed live conductors.",
      "Verbally ask the receptionist to keep people away from the DB while you work and rely on them to challenge anyone who approaches. Delegating bystander control to an untrained occupant with no physical barrier is not a 'suitable precaution'; physical separation of the work area is required, not a verbal request.",
      'Close the reception entirely and ask all staff and visitors to leave the building until the work is finished. Total evacuation is disproportionate for a localised DB task and usually impractical; the correct control is a physical barrier around the 2 m work area plus signage and a briefing, allowing the rest of the reception to function.',
      "A physical barrier at 2 m around the open DB (Skipper screen or similar), warning signage (BS EN ISO 7010 W012, 'no unauthorised access'), and a briefing to a named responsible person who will challenge anyone crossing it. The barrier is non-negotiable; signage alone doesn't satisfy the HSWA Section 3 duty to non-employees.",
    ],
    correctIndex: 3,
    explanation:
      "Work-area control is one of the EAWR Reg 14(c) 'suitable precautions' for live work. The Construction (Design and Management) Regulations 2015 (CDM) Reg 22 requires barriers between work and bystanders. The Workplace (Health, Safety and Welfare) Regulations 1992 Reg 5 puts a maintenance duty on the employer for safe access routes. All three combine to require physical separation of the work area from public access. Skipper barriers, telescopic post barriers, hi-vis tape with stanchions — all acceptable. Verbal warnings without barriers are not.",
  },
  {
    id: 'mod4-s1-sub4-witness',
    question:
      'When is a SECOND COMPETENT PERSON (a witness, accompanying operative, safety observer) required for fault diagnosis work?',
    options: [
      'Required only on three-phase commercial work above 1000 V — single-phase domestic and small-commercial fault diagnosis is always a one-person job because the risks are low. This sets the threshold far too high; a second person is needed for live work above 50 V AC, confined spaces, work at height and remote locations, not only above 1000 V.',
      'Required on every fault-diagnosis visit without exception, because BS 7671 mandates two operatives for all inspection and testing. There is no blanket two-person rule for testing; low-risk dead-circuit diagnosis can be done solo, and the second person is reserved for higher-risk situations such as live work and confined spaces.',
      'Required only when the customer requests it or when the firm wants a trainee to gain experience — it is a commercial / training decision, not a safety one. The second-person requirement is a safety control driven by HSE guidance and the RAMS, not a customer preference or a training convenience.',
      "Required for live work above 50 V AC where the operative can't self-rescue (confined space, height, remote lone working), for systems where a single fault could be fatal (HV, large industrial 3-phase), or where the firm's H&S policy specifies it. The accompanying person observes, challenges, raises the alarm and assists with isolation or rescue, and must themselves be competent.",
    ],
    correctIndex: 3,
    explanation:
      "The 'second person' requirement comes from HSE HSG85 'Electricity at work — safe working practices' and from the firm's own RAMS. Two-person working is the default for higher-risk tasks because the single point of failure (the working operative) is supplemented by the observer. For an apprentice, working alone on live equipment is normally OUTSIDE the scope of supervised competence — the apprentice IS the second-person on a senior's work, not the lead operative on their own.",
  },
  {
    id: 'mod4-s1-sub4-checklist',
    question:
      "What's the everyday 'pre-work precaution checklist' an apprentice should mentally run through at every fault diagnosis job, before opening any enclosure?",
    options: [
      'Six items: RAMS read and signed; permit signed where commercial/industrial; isolation plan with lock-off to hand; instruments calibrated and proving unit functional; PPE for the voltage and environment; comms with supervisor and lone-working check-in. If any item is missing, STOP and escalate before starting work.',
      "Just two things matter before opening an enclosure: prove the circuit dead and put your gloves on. Everything else (RAMS, permits, comms) is office paperwork that doesn't change what you do on the tools. The pre-work checklist is exactly the discipline that catches missing RAMS, an out-of-date tester or no lone-working cover before they cause harm; reducing it to 'prove dead and gloves on' is how incidents happen.",
      'Run a full Schedule of Test Results on every circuit in the property first, so you have a complete baseline before opening anything. Baseline-testing the whole installation is neither required nor practical before every fault job; the pre-work checklist is a quick safety run-through (RAMS, permit, isolation, instruments, PPE, comms), not a full periodic test.',
      "Photograph the consumer unit and post it to the firm's group chat so the supervisor can confirm it's safe to proceed before you touch anything. Remote photo approval is no substitute for the operative's own pre-work checks; the checklist is a personal safety routine the apprentice runs on site, supported by phone comms, not replaced by a photo.",
    ],
    correctIndex: 0,
    explanation:
      'The pre-work checklist is what professional pilots, surgeons, divers and competent electricians all use — a structured run-through that catches the easy-to-forget item before it kills you. The six-item version (RAMS, permit, isolation plan, instruments, PPE, comms) covers the failure modes that show up in HSE prosecution reports. Most firms will have a printed or laminated version that lives in the toolbag; some have an app version (Field Service Lightning, simPRO) with a tick-box. The point is the discipline of running through it every time.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the difference between 'safe system of work' and 'safe place of work' under HSWA, and why do both matter for fault diagnosis?",
    options: [
      "They mean the same thing — 'safe system of work' and 'safe place of work' are two names for the firm's written RAMS document, and the distinction is just terminology. They are distinct concepts: the safe system is the procedure and controls that make the task safe, while the safe place is the physical environment; conflating them misses that a perfect method statement can't make an unsafe cellar or loft safe.",
      'Safe system of work is the procedure, controls and competencies that make the TASK safe (RAMS, isolation, PPE, supervision). Safe place of work is the physical environment being suitable (access, lighting, space, ventilation, escape routes). HSWA Section 2 requires the employer to provide both, and for fault diagnosis the on-site operative judges whether the place is safe.',
      "Safe system of work is the employer's responsibility; safe place of work is entirely the customer's responsibility, so the operative never has to assess the environment. The duty to provide a safe place rests with the employer too, and in practice the on-site operative judges whether the place is safe; it is not handed off to the customer.",
      "Safe place of work applies only to construction sites under CDM; in a customer's home only the safe system of work applies, because a dwelling is not a workplace. A customer's home becomes a workplace while the operative works there, so both the safe system and the safe place duties apply, not just the system.",
    ],
    correctAnswer: 1,
    explanation:
      "The 'safe system + safe place' distinction is foundational HSWA language. For fault diagnosis the apprentice is often the on-site decision-maker about whether the place is safe — is the ladder secure, is the loft floor strong enough, is the cellar ventilated, can I see what I'm doing? If the answer to any of those is no, the work has to stop until the place is made safe. 'I had to do the job somehow' is not a defence in a prosecution.",
  },
  {
    id: 2,
    question:
      "EAWR 1989 Reg 4 requires electrical systems to be 'so constructed and so maintained as to prevent danger'. What's the fault-diagnosis interpretation?",
    options: [
      "Reg 4 applies only at the design and installation stage; once a system is energised and handed over, the duty falls away and any later faults are the duty-holder's problem under different legislation. Reg 4 applies continuously — at installation, in service, during fault and after repair — not just at design and install.",
      "Reg 4 means you must always work the circuit live so you can confirm it is functioning before declaring it safe; dead testing alone can't prove a system prevents danger. Reg 4 does not require live working; safe diagnosis is normally done dead, and the duty is about the system's condition, not about energising it to test.",
      "Assess the system's 'as-found' safety before starting (CU, supply, bonding, damage); record any departures and don't make them worse; leave the corrected system satisfying Reg 4 (no worse than found); and escalate any defect you can't safely fix for further work or advisory documentation.",
      "Reg 4 only obliges you to fix the specific fault you were called to; pre-existing defects you notice elsewhere are outside its scope and can be left for a future EICR. The 'as-found' assessment under Reg 4 means you must not leave the system in a worse state and must act on dangerous defects you find, not ignore them as out of scope.",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 4 is the umbrella duty under EAWR and it applies continuously — at installation, in service, during fault, after repair. For fault diagnosis it bites at three points: the as-found assessment (does the system you're about to work on satisfy Reg 4 right now?), the work-in-progress state (don't make it less safe), and the post-repair state (your repair must satisfy Reg 4). The 2391 / 2394 inspection-and-test qualifications go deeper into how to assess Reg 4 compliance; this course introduces the framework.",
  },
  {
    id: 3,
    question:
      "On a fault investigation in a domestic loft, you find the CPC has been disconnected from a 1.5 mm² lighting cable at a junction box (someone has cut it short and twisted it back into the box without termination). What's your immediate action under safe-working principles?",
    options: [
      "Leave it — a lighting circuit CPC isn't load-carrying, so a disconnected CPC on lights is only a cosmetic issue and not worth flagging on a job you weren't called out for. A missing CPC removes the earth fault path from every metal fitting on the circuit, which is a Danger-Present defect, not cosmetic; it must be acted on.",
      "Note it on the job sheet as an observation and mention it to the customer verbally, but carry on with the original work and let them decide later — you weren't asked to fix it. A Code 1 defect found on any visit triggers a duty to make safe immediately, not merely to note it for the customer's later consideration.",
      "Re-energise the circuit to test whether the missing CPC actually causes a problem before deciding what to do — if nothing happens, it's safe to leave. Energising a circuit with no CPC to 'see if it's a problem' is exactly the danger; the absence of an earth path means metalwork can sit at phase voltage in a fault, so the circuit must be made safe, not tested live.",
      "STOP the original investigation. A disconnected CPC is a Code 1 (Danger Present) defect — the circuit's metalwork has no earth fault path and can sit at phase voltage. Make safe (re-terminate the CPC, or isolate and label 'OUT OF SERVICE — CPC FAULT'), inform the customer in writing, then resume if they agree to the additional work.",
    ],
    correctAnswer: 3,
    explanation:
      "Finding pre-existing dangerous defects during a fault investigation is common, and it triggers a clear duty under HSWA Section 7 (employee duty) and EAWR Reg 4 (system safety). The standard is — make safe immediately if competent to do so, escalate if not, document in writing, get customer agreement to additional work, charge accordingly. Walking away from a Code 1 defect that you've found is not an option — you've now seen it, you have a duty to act. Most NICEIC / NAPIT firms have a 'dangerous condition notification' form for exactly this scenario.",
  },
  {
    id: 4,
    question:
      'When a fault investigation requires you to work at height (loft, ceiling void, equipment platform), what additional precautions apply on top of the electrical-safety procedure?',
    options: [
      'The Work at Height Regulations 2005 apply alongside EAWR. Assess the height work specifically (fall distance, platform type, duration); use a ladder only for short access and a platform for longer work; secure the ladder (1:4, anti-slip, three points of contact); secure tools against dropping; board out loft working areas and never stand on plasterboard; and observe the lone-working restriction.',
      'No additional precautions — the electrical-isolation procedure already covers everything, and a loft or platform is just another work location once the circuit is dead. Working at height introduces a separate, often greater, fall hazard that the Work at Height Regulations 2005 require to be assessed and controlled in addition to electrical safety.',
      "Only a harness and fall-arrest lanyard are needed; clip on at any height above floor level and the fall risk is dealt with. Fall-arrest is a last resort under the WaHR hierarchy, not the first control; the priority is to avoid the height risk or use a stable platform, and a harness alone doesn't address ladder footing, plasterboard or dropped tools.",
      "Just put down dust sheets and warn the customer the work is overhead — domestic loft work is low-risk and doesn't engage the Work at Height Regulations. The WaHR 2005 apply to any work where a person could fall a distance liable to cause injury, including domestic lofts; dust sheets and a verbal warning don't satisfy the duty.",
    ],
    correctAnswer: 0,
    explanation:
      'Falls from height kill more electricians than electric shock. The Work at Height Regulations 2005 reverse the old hierarchy — avoid working at height where possible, use a platform if you must, fall-arrest only as a last resort. For fault diagnosis in lofts and ceiling voids, the practical approach is — board the access, use a torch-assistant if possible, restrict tool weight, never stand on plasterboard, document the risk in the RAMS addendum. CDM 2015 Reg 8 expects the contractor to plan for these.',
  },
  {
    id: 5,
    question:
      "What's the 'three-step' check that confirms an instrument is safe to use BEFORE you trust its readings?",
    options: [
      "Two steps: switch it on to confirm the screen lights up, and check the battery icon is full. If both pass, the instrument is good to use. Power-on and a battery icon don't confirm the leads are sound, the calibration is in date or that it reads correctly on a known source; the three-step visual / calibration / function check is needed.",
      'Visual (case, leads and probe finger-barriers undamaged, no burns), calibration (label in date, certificate available), and function (proves on a known live source and a known dead source, healthy battery, clean selector). Any failure on any step and the instrument is not used until rectified.',
      'Three steps: send the instrument for calibration, store it in its case, and record the serial number in the asset register. These are good asset-management habits but they happen in the workshop, not at the point of use; the pre-use check the operative performs on site is visual, calibration-date and function (prove-dead/prove-live).',
      'Three steps: compare its reading against a second instrument, average the two results, and use that average as the true value. Cross-checking against a second meter is a useful sanity check but is not the standard pre-use safety routine; you confirm the instrument is fit to trust by checking its condition, calibration date and proving function first.',
    ],
    correctAnswer: 1,
    explanation:
      "The 'visual / calibration / function' three-step is industry standard. PUWER 1998 Reg 5 (maintenance) and Reg 6 (inspection) put the duty on the employer to ensure work equipment is in good condition; the operative's pre-use inspection is how the duty is discharged in practice. Modern instruments often have a self-test on power-up that covers some of the function check, but the visual and calibration checks are still the operative's responsibility every time.",
  },
  {
    id: 6,
    question:
      "A senior asks you to 'just hold the cover off' while they probe a live busbar inside an open DB. What's your response under safe-working principles?",
    options: [
      "Do it, but wear rubber gloves and stand on a dry mat so you're insulated — that makes holding the cover safe. PPE doesn't make it acceptable to place an apprentice inside the danger zone of a live exposed conductor outside any live-working risk assessment; the cover should be held by a prop, not a person.",
      "Do it quickly so the senior isn't kept waiting — the faster the live work is over, the lower everyone's exposure, so speed is the safest option. Rushing live work is not a control; the apprentice should not be in the danger zone at all, and the correct fix is a cover-prop plus escalation, not working faster.",
      "Decline. The request puts you inside the danger zone of a live conductor with no safety role, and EAWR Reg 14's conjoint tests aren't met — there's no live-working risk assessment that includes you. Your place is outside the work area; the cover should be held by a clip or prop, not a hand. Escalate to the supervisor if pressed.",
      "Do it — the senior is the competent person in charge, so following their instruction discharges your duty and any responsibility for the risk rests with them. An apprentice retains a personal duty under HASAWA s.7 to take reasonable care; 'I was told to' is not a defence, and the apprentice should decline an unsafe instruction and escalate.",
    ],
    correctAnswer: 2,
    explanation:
      "Apprentice-as-cover-holder is a real situation that has caused multiple injuries. The senior may not even realise they're putting the apprentice at risk — it's a thoughtless habit. The apprentice's response should be polite, principled and consistent: 'I'm not in the live-working risk assessment; let's use a prop or call the supervisor'. The firm's H&S policy will support this position — every progressive firm now explicitly forbids using apprentices as live-work helpers without their own RA.",
  },
  {
    id: 7,
    question:
      "After a fault investigation that involved isolation of a fire alarm circuit, you restore supply and the fire alarm panel goes into FAULT. What's the safe-working approach?",
    options: [
      "Press the panel's reset/silence repeatedly until the FAULT light clears, then leave — a fault that clears on reset wasn't real. Repeatedly silencing a fault without diagnosing it can mask damage your work caused; you must establish whether it is a clearing system fault or a circuit fault and rectify the latter.",
      'Leave the panel in FAULT and tell the customer it will sort itself out overnight once the batteries recharge — fire panels self-clear. A fire panel in FAULT means the life-safety system is compromised and will not silently fix itself; the responsible person must be informed and the cause investigated and rectified.',
      'Disconnect the fire alarm panel from its mains and battery so the fault light goes out, then complete your other work and hand the building back. Powering down a fire alarm leaves the building with no fire detection and is unacceptable; the correct response is to diagnose, rectify, restore and document, with the responsible person informed.',
      "Read the panel to tell a system fault (clears on reset) from a circuit fault (suggests your work caused damage). Reset and document a system fault; for a circuit fault STOP, re-isolate, retest and rectify. The building's fire safety was compromised while in fault, so the RR(FS)O responsible person should have been told beforehand with a fire watch in place — record the fault period in the log and inform the alarm-receiving centre.",
    ],
    correctAnswer: 3,
    explanation:
      "Fire alarm work is governed by BS 5839-1 (commercial) or BS 5839-6 (domestic) PLUS the Regulatory Reform (Fire Safety) Order 2005 PLUS BS 7671. The apprentice doesn't normally lead fire-alarm work but does need to know the safe-working implications of any fault-diagnosis task that affects fire-alarm circuits — pre-work briefing, fire watch during isolation, post-work verification, log book entry. Botching this is a regulatory issue with the local fire authority, not just a customer-service issue.",
  },
  {
    id: 8,
    question:
      "What's the disposal-and-housekeeping requirement under safe-working principles, and why does it matter for fault diagnosis specifically?",
    options: [
      'Make safe (temporary leads, exposed conductors and removed accessories terminated, capped or isolated before leaving); tidy (area returned to pre-work state, debris disposed of correctly, hazardous items routed properly); and document what was found, done and disposed of. Compromised-but-normal-looking parts must be made obviously safe so no-one re-energises them.',
      'Housekeeping just means sweeping up so the customer is happy with the look of the job; it has no safety dimension and matters only for customer relations. Tidying after fault work is a genuine safety duty — debris hides hazards and damaged parts left lying can be re-energised — not merely a cosmetic courtesy.',
      "Leave all removed accessories, offcuts and packaging on site for the customer to dispose of, since waste disposal is the householder's responsibility once you've handed over. The operative who generated the waste is responsible for disposing of it correctly (including hazardous items); leaving broken accessories and offcuts behind is poor practice and can leave compromised parts in reach.",
      "Bag everything up and put it in the customer's general household bin — electrical offcuts and old accessories are ordinary domestic waste. Items such as batteries, fluorescent tubes and asbestos are hazardous waste with controlled disposal routes and must not go in a household bin; correct segregation and disposal is part of the duty.",
    ],
    correctAnswer: 0,
    explanation:
      "Make-safe-and-tidy is the discipline that protects the customer and the next operative on site. The 'I'll come back to it' tail-end of a fault job is where things get forgotten — a temporary cap that's not really secure, a lead that's been left coiled with bare ends, a junction box left open. PUWER Reg 5 (maintenance) and BS 7671 Chapter 13 (basic principles) both apply at this stage. Most firms have a sign-off sheet that includes a 'site left in safe and clean condition' tick-box for exactly this.",
  },
];

const faqs = [
  {
    question:
      'How rigid should I be about following safe-working procedures when the customer is impatient?',
    answer:
      "Completely rigid. The procedures exist because they prevent the failure modes that have killed and injured electricians. Customer impatience doesn't reduce the failure rate; it just creates pressure to skip steps. The professional response is — explain calmly that the procedure takes a fixed amount of time and skipping it isn't an option, the work will be completed within the quoted timescale, and the customer is welcome to wait inside while you work. Firms that pressure operatives to bypass procedure are the firms whose insurance excludes injury claims for procedural breach. The customer can wait 90 seconds for the safe-isolation procedure; you don't have a 90-second alternative if you take a fatal shock.",
  },
  {
    question:
      "What's the difference between an 'authorised person', a 'competent person' and a 'skilled person' in HSE language?",
    answer:
      "Three distinct concepts. AUTHORISED PERSON — appointed in writing by the duty-holder for a specific role (e.g. authorised to issue permits-to-work, to verify isolation, to approve live working). COMPETENT PERSON — has the knowledge, training, experience and behaviours to carry out a task safely (the EAWR Reg 16 concept). SKILLED PERSON — used in BS 7671 to mean someone with the technical knowledge or experience to avoid dangers; aligns broadly with 'competent' but specifically in electrical-installation context. An apprentice is moving toward COMPETENT (under supervision) for some fault tasks, is becoming SKILLED in BS 7671 terms, and is unlikely to be AUTHORISED until improver level.",
  },
  {
    question: 'Do I need to wear high-vis on a domestic fault job?',
    answer:
      "On the public road outside the property — yes (PPE Regs 1992 + risk assessment for traffic). Inside the property — depends on the firm's policy. Some firms make high-vis mandatory on all jobs as a discipline; others only require it when there's vehicle activity or the customer site requires it (commercial sites usually do). The apprentice's default — wear what your firm's PPE matrix says, plus what the site-specific RAMS adds. A high-vis vest is £8 and lives in the van; better to wear it unnecessarily than not have it when you need it.",
  },
  {
    question:
      "If I find a fault that's outside the scope of the original call-out, what's my safe-working duty?",
    answer:
      "Three duties. (1) Make safe immediately if you can do so within your competence — isolate, label, document. (2) Inform the customer in writing — what you found, what action you took, what further work is needed and at what cost. (3) Inform your supervisor and update the job sheet. You do NOT do the additional work without customer authorisation (commercial issue) AND your supervisor's agreement (competence / scope issue). The exception is if the additional fault is an immediate danger to life — then your duty under HSWA s.7 to take reasonable care of others requires you to act, document, and communicate after the fact.",
  },
  {
    question:
      'Are there any precautions specific to elderly or vulnerable customers I should consider?',
    answer:
      "Yes. (1) Loss of supply has heavier impact — electric heating is essential, stairlifts may stop, oxygen concentrators may run on battery only briefly. Brief the customer before isolation; coordinate with carers if needed; offer alternative heating during the work. (2) Communication — confirm understanding of any safety briefing; some elderly customers are too polite to say they don't follow. (3) Trust — vulnerable customers are targets for cowboy traders; show your ID, your firm's accreditation, and offer the customer the chance to call your office to verify. (4) Time pressure — rushing a job to suit the customer's routine is not a reason to skip safety procedure. The Care Act 2014 doesn't apply directly but the spirit of safeguarding vulnerable adults applies to every visit.",
  },
  {
    question: "What's the most-overlooked safe-working precaution on routine fault jobs?",
    answer:
      "The pre-work briefing of the customer / occupants on what's about to happen. Apprentices arrive, isolate, work, restore — without telling the customer that the lights are about to go out, that the freezer will be off for an hour, that the fire alarm will go into fault, that the heating will stop. The result is customer confusion, calls to the office, and occasionally a customer who walks into a darkened stairwell. Two minutes of explanation at the start of the job — what will happen, when, for how long, and what the customer should do — prevents 90% of the customer-side issues that follow.",
  },
];

const checks2 = [
  {
    id: 'mod4-s1-sub3-pv',
    question:
      "You're investigating an earth-leakage fault on a domestic CU that has a 4 kWp solar PV system on the roof. What's the special isolation requirement?",
    options: [
      "Part P (Electrical Safety in Dwellings) requires certain types of electrical work in dwellings to be notified to Building Control — either via a registered competent-person scheme (NICEIC, NAPIT, etc.) or directly to the Local Authority. Notifiable work currently includes new circuits, consumer unit changes, and work in special locations (bathrooms / locations 700). Most environmental tech installs are notifiable — adding a PV inverter circuit, an EV charging circuit or a heat-pump dedicated radial all create new circuits and trigger Part P notification. Non-notifiable work (e.g. like-for-like socket replacement on an existing circuit) doesn't trigger Part P.",
      "PV systems back-feed energy from the array into the inverter's DC input. Switching the AC isolator at the CU only kills the AC side — the DC side from the array to the inverter remains live during daylight hours, at typically 200–600 V DC. Full isolation needs (1) AC isolator OFF (consumer-unit side AND inverter side), (2) DC isolator OFF (between the array and the inverter — usually a Santon or Enwitec rotary), (3) verify with a DC-rated voltage tester (Fluke T6-1000 or Megger MFT1741 set to DC). The PV array can't be 'turned off' — only disconnected — so cover with a non-transparent sheet if you need it dark.",
      "Mode 3 is AC charging through a dedicated charger that controls and protects the charging session — typical domestic 7 kW units (single-phase) or 22 kW units (three-phase). The vehicle's onboard charger converts AC to DC for the battery. Mode 4 is DC fast charging — the off-vehicle equipment (typically 50-350 kW public rapid chargers) outputs DC directly to the battery, bypassing the vehicle's onboard charger. Domestic installations are essentially always Mode 3. BS 7671 Section 722 (significantly amended in A4:2026) governs the electrical installation requirements.",
      "SCOP 3.5 is solid for a UK domestic ASHP install — it means each kWh of electricity delivers 3.5 kWh of heat. On a UK grid carbon intensity of ~200 gCO₂/kWh, that's roughly 57 gCO₂ per kWh of heat — about 3.7× cleaner than burning gas (which emits ~210 gCO₂ per useful kWh). Top-end UK ASHP installs reach SCOP 3.8-4.2; GSHP can reach SCOP 4.5-5.0+. SCOP under 2.8 suggests something is wrong (oversized unit, undersized emitters, poorly insulated property, high flow temperature).",
    ],
    correctIndex: 1,
    explanation:
      "Multi-source isolation is the step-up. Modern installations have multiple energy sources — PV, EV, battery storage, standby generator, microCHP. Each source needs its own isolation step, and your tester must be rated for the energy type (DC for PV, AC for everything else). MIS 3002 (PV installation guide) and BS 7671 712 / 722 / 826 cover the specifics. The most common mistake is killing the AC side and assuming the system is dead — the DC side will give you a 400 V DC shock that an AC tester won't see.",
  },
  {
    id: 'mod4-s1-sub3-fullisol',
    question:
      'When is FULL INSTALLATION isolation (at the main switch) required for fault diagnosis, rather than just isolating the affected circuit?',
    options: [
      "An Improvement Notice (s.21) is served when the inspector believes a Regulation has been breached and the duty-holder is given a period (minimum 21 days) to put it right. A Prohibition Notice (s.22) is served when the inspector believes there's a risk of SERIOUS PERSONAL INJURY from a specific activity — the activity must stop immediately or by a stated time. Failure to comply with either is a separate criminal offence; both appear on the public HSE Notices database.",
      'F-Gas Regulations (assimilated EU Regulation 517/2014, retained in UK law post-Brexit, with some divergence) require any work on systems containing fluorinated greenhouse gases (the refrigerants used in heat pumps and air conditioning) to be done by F-Gas-certified personnel. Connecting refrigerant pipework, charging, recovering refrigerant, leak testing — all require certification. The Environment Agency enforces in England; equivalents in the devolved nations. Working without certification is a criminal offence and invalidates manufacturer warranties.',
      "When (a) the fault is on the supply / cut-out / tails / main switch / busbar itself, OR (b) you can't reliably identify which circuit feeds the fault location, OR (c) the work involves removing or refitting the consumer unit cover where the busbar is exposed, OR (d) the fault has compromised the integrity of the CU (water ingress, burnt terminal block, melted enclosure). Full isolation has bigger customer impact (whole property loses supply) so weigh it against the alternative of working live or working with limited isolation — but if the safety case requires full isolation, the customer impact doesn't change the answer.",
      "You don't have to break the circuit — the clamp meter senses the magnetic field around the conductor and reads the current without electrical contact. Faster, safer (no need to disconnect), and possible on energised circuits without isolation. Standard for measuring load currents at distribution boards, on submains, on motor circuits, and for energy auditing. Most modern clamp meters also have voltage and continuity functions, making them effectively a multimeter + clamp in one.",
    ],
    correctAnswer: 2,
    explanation:
      "Full isolation is the right answer in fewer cases than apprentices initially expect — but the cases where it's right, it's the only safe option. The decision is a Reg 14 risk assessment in real time: 'is it reasonable for this conductor to be live while I work near it?'. For a burnt CU enclosure with the busbar exposed, the answer is no — even if the customer loses freezer supply for an hour. The customer impact is a customer-service problem; the live busbar is a safety problem. Safety wins.",
  },
  {
    id: 'mod4-s1-sub3-impact',
    question:
      "A small business runs a butcher's shop. The chest freezer holds £1500 of stock. You need to isolate the supply for 90 minutes to investigate a fault. What's the right way to handle the loss-of-supply impact?",
    options: [
      'Heat pumps deliver heat at a lower flow temperature than a gas boiler — typically 35 to 50 °C versus 65 to 75 °C for a boiler. The lower the flow temperature the higher the SCOP. Underfloor heating runs at 35 to 40 °C and gives the highest SCOP. Oversized radiators (larger surface area than the original boiler-sized radiators) deliver the same heat output at the lower flow temperature, keeping SCOP high. Original boiler radiators sized for 70 °C flow forced to run at 50 °C will deliver too little heat output — the room never reaches setpoint, the heat pump runs constantly, the customer is cold and the SCOP is poor. The MCS heat-loss survey identifies which rooms need radiator upgrades; the customer often has to budget for new emitters as part of the install.',
      "Significantly. A repair that's exposed to harsh environment (outdoor, kitchen, plant room, washroom) may not last as long as the same repair in benign environment. The repair-vs-replace decision should consider: (a) what's the IP / environmental rating of the repaired vs replacement component? (b) Will the repair retain the original IP rating? (c) Is the new component IP-rated for the actual environment? Replacement often comes with current IP / environmental ratings; repair preserves the existing rating (which may have degraded). For harsh environments, replacement is usually the right call.",
      'Three separate containers. New batteries in their original packaging or a dedicated lithium-safe storage box, separated from the others. Used but undamaged batteries in a metal container with terminals taped or with cell-tray separation to prevent short circuits. The damaged battery in a separate fire-resistant container (vermiculite, sand or a purpose-made Li-ion bag), stored away from the van interior and away from other batteries, and returned to a battery recycling collection point as soon as practical. Never stack damaged with undamaged.',
      "(1) Inform the customer in writing of the planned outage, expected duration, and any contingency they need (move stock, brief staff, sign at door). (2) Check whether the affected circuit has any safety-critical loads — fire alarm sounders, emergency lighting central battery, intruder alarm — and if so, brief the customer to put out a 'system off' note and inform their alarm-receiving centre. (3) Plan the isolation window to minimise impact (early morning, lunchtime closure). (4) Document the conversation on the job sheet — customer agreed to isolation, accepted impact, etc. (5) ONLY THEN isolate. The customer's commercial loss is real and your firm carries professional liability for unannounced outages.",
    ],
    correctIndex: 3,
    explanation:
      "Loss of supply has consequences and the customer is entitled to be informed before, not after. EAWR Reg 4 and HSWA Section 3 (employer's duty to non-employees) both put a duty on the firm to consider the impact of its work on third parties. The Consumer Rights Act 2015 makes it a contractual issue too — services must be performed with 'reasonable care and skill', and that includes communicating impact. A documented pre-isolation briefing protects you from a 'you cost me £1500 of stock' complaint after the fact.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      "An apprentice is asked to specify the safe isolation procedure for a single 32 A radial circuit that's tripped its RCBO. What's the full sequence including the equipment used at each step?",
    options: [
      "Three reasons. (1) BS 7671 Reg 643.2 requires the test instruments to be appropriate to the test and in calibration — you have to be able to evidence that. (2) If the test result is later disputed (insurance, EICR follow-up, court), the instrument identification lets independent verification of calibration certificate and instrument capability. (3) Scheme providers (NICEIC, NAPIT, Stroma) audit certificates and look for instrument identification as evidence of competent practice. The standard fields are make + model + serial + last calibration date — usually pre-printed onto the certificate template by the firm's certification software.",
      "(1) Identify circuit from schedule and labels. (2) Switch the RCBO OFF and confirm by visual inspection. (3) Apply a personal padlock + tag (e.g. Brady 65681 lock-out hasp + LOTO tag with apprentice's name and date) to the RCBO toggle. (4) Prove a GS38 two-pole tester (Martindale VI-13800) on a known live source — typically a known-live socket on a different circuit OR a Martindale GVD2 proving unit. Confirm full lamp / LED / audible. (5) Test the work-point — at the accessory or junction box, between L–N, L–E and N–E. All three must read zero. (6) Re-prove the tester on the same known live source. (7) Begin work. (8) On completion, remove personal padlock, restore supply, retest the RCBO operation with an MFT.",
      "Document honestly and helpfully. The certificate / report should say something like — 'Reported intermittent symptom: customer reports lighting circuit dimming when kettle is used. On site investigation today: no fault reproduced under current conditions, all tests within BS 7671 limits, full readings as Schedule. Recommendation: customer to record date / time / conditions of any future occurrence and contact us; we will return for further investigation under fault conditions if necessary. No charge for this visit.' That's honest, defensible, and leaves the door open. 'No fault found' alone is too brief and may be challenged later.",
      "Most common cause — degraded shower element with insulation breakdown under heat. The element is a coiled resistive heater inside a sealed metal casing immersed in the water flow. Over time, mineral deposits, thermal cycling and water exposure degrade the insulation between the live coil and the earthed casing — when cold the IR is acceptable but when the element is at running temperature (hot water demand) the IR drops and earth leakage rises above 30 mA, tripping the RCBO. Diagnostic confirmation: IR test the element COLD at 500 V (probably acceptable at over 1 MΩ) and HOT after a few minutes of run-time (drops to under 1 MΩ — that's the failure). CORRECTION: replace the heater element (Mira, Triton, Bristan branded as appropriate) following manufacturer instructions; verify post-replacement IR is over 1 MΩ cold AND hot.",
    ],
    correctAnswer: 1,
    explanation:
      'The single-circuit isolation is the most-frequently tested practical skill on assessment. The instruments are specific: GS38 two-pole tester (Martindale, Fluke T130, Kewtech KT1780) for the prove-dead steps; proving unit (Martindale GVD2 or equivalent) OR a known live socket for the prove-tester steps; lock-off device (Brady, Master Lock, Idesco) plus tag for the lock-off step. Multimeters and socket testers do NOT replace the two-pole. The end-of-job retest with the MFT (typically RCD trip-time test on the RCBO) confirms the protective device is still working before you sign off.',
  },
  {
    id: 2,
    question:
      "Implications of isolating a circuit — what's the IMPACT category for each of: (a) other personnel, (b) customer/client, (c) public, (d) building systems?",
    options: [
      "Five conditions. (1) Cable type at end of life (rubber-insulated, VIR, lead-sheathed pre-1970s) — IR readings declining year-on-year, regular faults. (2) Multiple Code 1 / Code 2 EICR findings on the same installation that aren't economically repairable individually. (3) Repair would require destruction of significant building fabric (chasing whole rooms). (4) Customer planning a renovation — economical to rewire while building work is happening. (5) Property change-of-use (e.g. residential to HMO) requiring different specification. The apprentice doesn't normally make this call — it's improver / Approved Electrician / consultant level — but should recognise the conditions and escalate.",
      "Stop them and verify they understand what's locked off and why. Show them your padlock and tag. Confirm they're not about to remove your lock or restore your circuit. If they need to do work that affects YOUR isolation (e.g. they're investigating the busbar), the work must coordinate — both operatives' locks stay on, both operatives complete their work, both operatives remove their own locks. The 'multi-lock hasp' (Brady 65681 takes 6 padlocks) is designed for this — multiple operatives, one device, no operative removes their lock until they're personally finished.",
      "(a) OTHER PERSONNEL — other trades on site lose lighting / power for tools, may need to stop work; the firm's lone-working procedure may need adjusting. (b) CUSTOMER/CLIENT — loss of business activity, freezer stock at risk, computers go down (data loss risk), contractual penalties on commercial sites, customer dissatisfaction. (c) PUBLIC — emergency exits may go dark, public-area lighting fails, accessible plant rooms become hazardous, security systems may shut down. (d) BUILDING SYSTEMS — fire alarm goes into fault (with audible alert), emergency lighting batteries enter discharge cycle, lift goes to ground floor and stops, BMS may fault and require manual reset, refrigeration cycles interrupt, motors may auto-restart on power restoration with safety implications.",
      'Run the customer through: how the system operates (continuous low-temperature heating, not on-off cycles like a gas boiler); how to set the room thermostat (set and forget at desired temperature, modest setbacks only); how to use the hot water schedule (typically once or twice a day); when to expect higher running costs (cold spells push up consumption); what the smart controls do; what the warning lights / app notifications mean; who to call for support (warranty contact, manufacturer support, installer aftercare); annual service requirement. Five-to-ten minutes that prevents months of customer confusion.',
    ],
    correctAnswer: 2,
    explanation:
      "The four-category impact assessment is the syllabus item, and it is the right way to think about isolation decisions before you flip the breaker. A simple isolation can have unexpected consequences — flipping the kitchen lighting circuit at a small care home stops the kitchen lift and trips the fire-alarm fault relay, and the manager has to inform the alarm-receiving centre, brief staff, and document the impact. Knowing what your isolation will do BEFORE you do it is the competence.",
  },
  {
    id: 3,
    question:
      'Implications of NOT isolating — what dangers does failure to isolate present to (a) self, (b) other personnel, (c) customer/client, (d) public, (e) building systems?',
    options: [
      "Three reasons. (1) Density — many terminations in a small space; many opportunities for one to be wrong. (2) Heat — control electronics generate heat; cooling is often inadequate; thermal cycling stresses components. (3) Vibration — panels in plant rooms and on walls near equipment vibrate; vibration loosens terminations over time. Approach: always work on de-energised, isolated panels under permit-to-work where applicable; identify each component's function from the panel schedule; check terminations with thermal imaging while running; replace components by part number from the schedule; retest each output to verify correct operation.",
      "It depends on competence and supervision. An apprentice typically signs the Constructor panel under supervision (the work was done under the supervisor's oversight). The Inspector panel requires verification competence — the supervisor or a JIB Approved Electrician usually signs that for an apprentice's work. The Designer panel requires design competence, normally a fully-qualified electrician or engineer, not an apprentice. The C&G 2391 / 2394 / 2395 inspection-and-testing qualifications are the typical step that lets a qualified electrician sign Inspector. EAWR Reg 16 (competence) is the underlying duty — sign only what you are competent to sign.",
      'Carbon payback for typical UK PV is 1-3 years (the time taken for operating CO₂ savings to offset the manufacturing CO₂ cost). Financial payback depends on system cost, self-consumption, export tariff and electricity price — typically 6-12 years for a standalone PV install in 2026, often shorter if a battery is added (improves self-consumption from 25-40% to 70-90%). After payback the system continues for the rest of its 25-year warranted life essentially as free energy. The carbon case is much stronger than the financial case in isolation; together they make PV the dominant UK domestic environmental tech.',
      '(a) SELF — direct shock, arc-flash burn, fall from a recoil reaction. (b) OTHER PERSONNEL — assistant or apprentice working with you may contact live conductor; bystanders may be in arc range. (c) CUSTOMER/CLIENT — equipment damage from accidental short, fire risk from compromised insulation, customer staff injury if they touch exposed live parts. (d) PUBLIC — collapse of structure if a fire results, contamination if hazardous materials escape (e.g. transformer oil), wider supply outage if a fault propagates upstream. (e) BUILDING SYSTEMS — cascade failures (a botched isolation can take out the wrong circuit, knocking out fire alarm AND lifts AND emergency lighting at once), data loss on IT systems, equipment damage on plant restart.',
    ],
    correctAnswer: 3,
    explanation:
      "The this criterion syllabus is explicit about the five-category 'failure to isolate' impact — it's not just self-harm, it's the whole web of consequences. The HSE prosecutes both the personal injury AND the wider impact. A botched fault diagnosis at a hospital that took out the lighting in an operating theatre is the kind of case that closes a firm. The five-category thinking is what separates a competent electrician from a dangerous one.",
  },
  {
    id: 4,
    question:
      "A modern installation has a 7 kW EV charger, a 5 kWp solar PV array, a 9.6 kWh battery storage system AND a standby generator. You're investigating a fault on the main DB. How many isolation points do you operate?",
    options: [
      "All of them, plus the main switch. (1) Open main switch / DNO cut-out cap (DNO call only) for incoming supply. (2) Open the EV charger isolator AND verify EV is unplugged (the EVSE may have its own contactor that closes on demand). (3) Open the PV AC isolator at the inverter AND the PV DC isolator at the array. (4) Open the battery storage AC isolator AND the battery DC isolator. (5) Confirm standby generator changeover switch is in MAINS position and lock-off the generator manual start. Then prove dead at the work point with a GS38 two-pole, AND a DC-rated tester for the PV/battery DC sides if you'll be near them.",
      'Micro-hydro can deliver excellent baseload renewable electricity if the site has the head (vertical drop) and flow rate to support it. Unlike wind and PV, hydro runs 24/7 and tracks demand reasonably well. Practical issues: Environment Agency / Natural Resources Wales abstraction licensing, fish protection requirements, weir and intake construction cost, and connection to the property (often hundreds of metres of buried cable). The right site is rare; where it exists, micro-hydro is one of the best-performing renewables per pound spent.',
      'Annual visual inspection (panels secure, free of physical damage, free of significant soiling); array frame and connections check (no corrosion, no loose mountings); cable inspection (UV degradation, rodent damage, MC4 connector integrity); inverter inspection (error log review, ventilation clear, no overheating signs); meter / monitoring check (datalog producing readings, expected output for season); signage check (durable warning signs still in place at consumer unit / meter / inverter / DC isolators). Periodic 5-year EICR for the electrical condition. Soiling cleaning may be needed in dusty / urban / coastal locations — specialist PV cleaners use deionised water.',
      'Protection against electric shock shall be provided by a device which electrically disconnects the vehicle from the live conductors of the supply and from protective earth in accordance with Regulation 543.3.3.101(b) within 5 s in the event of the utilisation voltage at the charging point, between the line and neutral conductors, being greater than 253 V RMS or less than 207 V RMS. The device shall provide isolation and be selected in accordance with Table 537.4.',
    ],
    correctAnswer: 0,
    explanation:
      "Multi-source installations are increasingly common and each source has its own isolation point. BS 7671 Chapter 71 (special installations) has dedicated requirements for each — Section 712 (PV), Section 722 (EV), Section 826 (battery storage). The apprentice doesn't need to commission these systems but does need to know they exist and know to isolate them all before fault work near the DB. Missing one source is the cause of multiple recent industry incidents.",
  },
  {
    id: 5,
    question:
      "What's the difference between 'isolation' and 'switching off for mechanical maintenance' in BS 7671 terms, and which applies to fault diagnosis?",
    options: [
      'The F-Gas Regulation imposes a phased reduction in the tonnes-CO2-equivalent of HFCs placed on the EU/UK market each year and bans certain high-GWP refrigerants in new equipment categories. R-410A has a GWP of around 2,088. R-32 sits around 675 and is a single-component refrigerant making service easier. R-290 (propane) has a GWP of around 3 and is essentially climate-neutral on the F-Gas scale, but is A3 flammable and brings ATEX and minimum-room-volume rules with it.',
      "BS 7671 Chapter 46 distinguishes four switching functions: ISOLATION (Reg 462) — all live conductors disconnected, lockable in OFF position, designed to prevent re-energisation; SWITCHING OFF FOR MECHANICAL MAINTENANCE (Reg 463) — hand-operable, lockable, prevents accidental re-energisation; EMERGENCY SWITCHING (Reg 464) — fast-acting, immediately accessible, removes danger from personnel; FUNCTIONAL SWITCHING (Reg 465) — normal operation. For fault diagnosis you use ISOLATION every time. The breaker label and the actual function of the device must match — many older switches that look like isolators are actually only functional switches and don't satisfy Reg 462.",
      'MCS MIS 3005 is the Microgeneration Certification Scheme installer standard for heat pump systems — covering air-source, ground-source and water-source heat pumps. It sets competence requirements for the installing firm (design competence, installation competence, commissioning competence), defines the heat-loss calculation methodology, sets the SCOP estimation requirement, and defines the customer documentation pack. MCS MIS 3005 sits alongside BS 7671 (electrical install standard) and the F-Gas Regulations (refrigerant competence). The customer needs the MCS certificate to access the Boiler Upgrade Scheme grant and the heat pump SEG-equivalent payment routes.',
      "Speak directly to the customer, identify yourself by name when you arrive and when you leave a room, describe what you're doing and where ('I'm just going to the consumer unit by the front door now'), don't move furniture or leave tools where they could be a trip hazard for the guide dog or the customer, ask before touching the guide dog (don't pet a working guide dog without asking), and offer to provide written documentation in large print, audio or accessible PDF as required. Equality Act 2010 makes this a service-provider duty.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 462–465 sets out the four switching functions and the apprentice needs to know which function applies to which task. Modern MCBs and RCBOs satisfy isolation duty (they're labelled as such), but some older switchgear (rotary switches, certain types of contactor) is only functional and won't lock-off. If the device on the DB doesn't satisfy Reg 462, you need to isolate further upstream (typically the main switch) instead.",
  },
  {
    id: 6,
    question:
      "You've isolated a circuit, locked off, proved dead. While you're working, another operative arrives at the DB and starts to remove a different breaker. What should you do?",
    options: [
      "Use the scheme's documented appeals process first — every CPS publishes a complaints / appeals procedure that members must exhaust before any external challenge. Decisions are typically reviewed by an independent panel within the scheme. After that, if the suspension is alleged to be unfair / wrongful, civil action can theoretically follow but is rarely successful — scheme membership is contractual, the rules were signed up to on enrolment, and courts are reluctant to second-guess scheme decisions on technical compliance. Better strategy: remediate, demonstrate corrective action and re-apply for membership.",
      'Reduce → reuse → recycle → recover → dispose. Reduce: keep equipment in service longer (annual maintenance prevents premature replacement). Reuse: reusable batteries (some EV battery cells are repurposed for second-life storage), reusable mounting hardware. Recycle: copper cabling, aluminium frames, steel components — established waste streams. Recover: refrigerant recovery (mandated), some plastics. Dispose: hazardous components (lithium-ion batteries, refrigerants, electronic boards) via authorised waste carriers under the Hazardous Waste Regulations and WEEE Regulations. The hierarchy is set out in the Waste (England and Wales) Regulations 2011 implementing the EU Waste Framework Directive.',
      "Stop them and verify they understand what's locked off and why. Show them your padlock and tag. Confirm they're not about to remove your lock or restore your circuit. If they need to do work that affects YOUR isolation (e.g. they're investigating the busbar), the work must coordinate — both operatives' locks stay on, both operatives complete their work, both operatives remove their own locks. The 'multi-lock hasp' (Brady 65681 takes 6 padlocks) is designed for this — multiple operatives, one device, no operative removes their lock until they're personally finished.",
      "Modern EV chargers can leak smooth DC current under fault conditions — and a Type AC RCD won't trip on smooth DC. So Section 722 requires either a Type B RCD (which detects AC, pulsating DC and smooth DC) OR a Type A RCD plus an RDC-DD (a separate device that adds smooth-DC detection to a Type A RCD). The RDC-DD route is often cheaper than fitting a Type B RCD because Type A RCDs are widely available and inexpensive. The certified installer chooses the architecture; the customer doesn't see the difference but the regulatory compliance requires one or the other.",
    ],
    correctAnswer: 2,
    explanation:
      "Multi-operative isolation is a real scenario on commercial sites — different trades working on different parts of the same DB, or one trade working while another commissions. The 'group lock-off' procedure with a multi-lock hasp is the industry standard. Each operative attaches their own padlock to the hasp; the device cannot be operated until ALL padlocks are removed; each operative removes only their own lock when they're finished. The hasp + padlock approach prevents the 'someone removed my lock thinking it was a leftover' scenario that has killed apprentices.",
  },
  {
    id: 7,
    question:
      'A fault investigation requires you to isolate the lighting circuit feeding a stairwell in a multi-occupancy building. What additional steps cover the public-safety implications?',
    options: [
      "On TN-C-S, the neutral and protective earth share the PEN conductor between transformer and cut-out. If the PEN breaks anywhere upstream, the customer's neutral floats relative to the transformer star point. Customer's bonded metalwork (kitchen taps, sinks, radiators, EV charger chassis, all bonded to the customer earth terminal) rises toward phase voltage relative to true earth. RCD doesn't see it (no residual current — the lifted-neutral voltage flows through bonding network as L–E volt-drop, not as imbalance). First sign: tingle on metal taps or 30+ V N–E reading at cut-out. A4:2026 added explicit Open PEN protection requirements (Reg 411.3.3, especially for EV chargers).",
      "BS 7671 522.6 + Approved Document B / Part P require: (1) Cables in walls within 50 mm of the surface must be in a 'safe zone' (above socket level, vertical from socket / switch position, within 150 mm of ceiling / wall edge) OR mechanically protected (steel conduit, capping / channel, RCD-protected supply). (2) Cables BELOW 50 mm depth — no zone restriction. (3) Cables in plastered chases — capping (PVC channel) over the cable before plastering OR steel conduit. The chase depth and the cable protection are inspected during EICR; non-compliance is Code 2 (Potentially Dangerous) typically.",
      "Stop them and verify they understand what's locked off and why. Show them your padlock and tag. Confirm they're not about to remove your lock or restore your circuit. If they need to do work that affects YOUR isolation (e.g. they're investigating the busbar), the work must coordinate — both operatives' locks stay on, both operatives complete their work, both operatives remove their own locks. The 'multi-lock hasp' (Brady 65681 takes 6 padlocks) is designed for this — multiple operatives, one device, no operative removes their lock until they're personally finished.",
      "(1) Inform the building manager / managing agent BEFORE isolation. (2) Check whether emergency lighting will activate (BS 5266 self-test should give 3 hours of cover; verify before isolation by running a manual test or checking the central battery indicator). (3) Place 'lighting under maintenance' signage at each landing. (4) Brief any concierge / security staff on the affected route. (5) Plan isolation outside peak occupancy where possible. (6) Have a torch / temporary lighting (LED work-light) available for residents who pass during the work. (7) Document the public-safety briefing in the RAMS addendum. Public access routes can't simply be plunged into darkness without these controls — Building Regs Part B (fire safety) and the Regulatory Reform (Fire Safety) Order 2005 both apply.",
    ],
    correctAnswer: 3,
    explanation:
      "Public-area isolation is one of the higher-risk fault-diagnosis tasks because the consequences spill out beyond the customer. A stairwell in darkness is a fire-escape hazard regardless of whether there's a fire. The Regulatory Reform (Fire Safety) Order 2005 puts a duty on the 'responsible person' (usually the building manager) to maintain emergency lighting — and your isolation is a temporary departure from compliance that has to be controlled. Most managing agents have a documented procedure for emergency-lighting outages; you fit into it.",
  },
  {
    id: 8,
    question:
      'After fault correction, you restore supply to a circuit that was isolated for 90 minutes. The circuit feeds a 7.5 kW three-phase induction motor on a workshop extractor. What restart precaution applies?',
    options: [
      "Three-phase induction motors with no inherent restart protection will RESTART AUTOMATICALLY when supply is restored. If anyone is near the motor, the impeller, the belt drive or the driven plant, they're in immediate danger. The standard precaution: (1) Verify the local motor isolator is OFF before restoring the upstream supply. (2) Restore upstream supply, retest. (3) Walk to the motor location, brief anyone nearby that you're about to restart, visually check the area is clear. (4) Operate the local isolator. (5) Confirm correct operation and rotation. BS 7671 463.1 / 463.2 (mechanical maintenance switching) and PUWER 1998 Reg 19 (isolation from sources of energy) both apply.",
      'Research suggests neurodivergence — dyslexia, ADHD, and autism — may be more common in trade roles than the general population. Some studies suggest dyslexia at materially higher rates in trade and creative industries (the visual-spatial reasoning associated with dyslexia is often a strength in hands-on work). ADHD and autism prevalence in the trade is also frequently reported as elevated. The Equality Act 2010 reasonable-adjustments duty (s.20) applies where the condition has a substantial and long-term effect.',
      "(a) OTHER PERSONNEL — other trades on site lose lighting / power for tools, may need to stop work; the firm's lone-working procedure may need adjusting. (b) CUSTOMER/CLIENT — loss of business activity, freezer stock at risk, computers go down (data loss risk), contractual penalties on commercial sites, customer dissatisfaction. (c) PUBLIC — emergency exits may go dark, public-area lighting fails, accessible plant rooms become hazardous, security systems may shut down. (d) BUILDING SYSTEMS — fire alarm goes into fault (with audible alert), emergency lighting batteries enter discharge cycle, lift goes to ground floor and stops, BMS may fault and require manual reset, refrigeration cycles interrupt, motors may auto-restart on power restoration with safety implications.",
      "Re-make the termination properly, don't just re-tighten. The darkened conductor at the joint has surface oxidation and possibly partially-annealed copper from the heat — both increase contact resistance. The correct technique: (1) Cut back the conductor by 10–15 mm to remove the heat-affected length; (2) Strip fresh insulation; (3) Inspect the back-box and the socket terminal for melt damage — if the plastic is melted or charred, replace the back-box and/or the socket; (4) Re-terminate to manufacturer torque (1.2 Nm typical for MK Logic Plus 2.5 mm²); (5) Visual check that the conductor sits cleanly under the screw with no strands escaping; (6) IR test 500 V; (7) R1+R2 across the affected leg of the ring; (8) Zs at the affected socket. The temptation to 'just tighten' leaves heat-affected copper in the joint; the proper re-make replaces the affected length.",
    ],
    correctAnswer: 0,
    explanation:
      "Auto-restart of motors on supply restoration is one of the main causes of post-fault-investigation injuries. The motor was running before isolation, the contactor / relay closed on its 'hold' coil, the supply went off, the contactor opened — when supply returns the contactor doesn't re-close (it needs a manual start) UNLESS the motor has a 2-wire control or the original control circuit is still calling for run. PUWER Reg 19 requires isolation from ALL sources of energy AND verification that a restart will not cause injury. The discipline is: local isolator off before upstream restoration, walk the area, then restart deliberately.",
  },
];

const faqs2 = [
  {
    question:
      'Can I isolate at the consumer-unit main switch instead of the individual breaker, just to be safe?',
    answer:
      "You can — and for some faults you MUST — but you have to weigh the impact. Full installation isolation kills every circuit including the freezer, the boiler, the alarm, the broadband router, the smart meter (which then takes 5–15 minutes to re-handshake on restore). For a simple radial-circuit fault, individual breaker isolation with a personal lock is normally enough and is more proportionate. The decision is part of your RAMS — what's the safety case AND what's the customer impact, and which is the smaller compromise?",
  },
  {
    question:
      "What if the breaker I want to isolate doesn't have a lock-off mechanism — it's an old re-wireable fuse holder?",
    answer:
      "Three options. (1) Remove the fuse-link entirely and put it in your pocket / your toolbox — no-one can re-energise without it. Some firms supply a 'dummy' fuse-link with a lock-off slot for exactly this. (2) Apply a Brady 'wedge' lock-off that fits inside the fuse-holder cavity. (3) If neither is possible, isolate further upstream at a device that does lock off — typically the main switch. Whatever you do, the principle is unchanged: the circuit must be PROVABLY in the off state with a defence against accidental re-energisation. A hand-written note that says 'do not switch on' is not a defence.",
  },
  {
    question:
      'The customer wants to keep their freezer running. Can I leave it on a temporary supply while I isolate the rest?',
    answer:
      "Yes, if you can do it safely. Standard approach: connect the freezer to a known-live socket on a different circuit via an extension lead, mark the lead with tape and a 'TEMPORARY — DO NOT REMOVE' label, document on the job sheet. The temporary supply must satisfy the same protection requirements (RCD on the host circuit, adequate cable rating). Don't run the extension across walkways or under doors where it can be damaged. After the work, restore the freezer to its original circuit and remove the temporary lead.",
  },
  {
    question:
      'Why does it matter who removes the lock-off — surely anyone can if the circuit needs to be back on?',
    answer:
      "It matters for two reasons. First — accountability. If someone other than you removes your lock and re-energises a circuit you thought was still safe, and you take a shock as a result, the prosecution will ask 'whose lock was removed by whom and why?'. The answer 'somebody removed it, I don't know who' is not defensible. Second — communication. Your lock means YOU are working on the circuit. Removing it without telling you means you might be in the middle of a termination when the supply comes back. Personal lock + personal removal is the only safe rule. Industry term — LOTO (lock out, tag out) — and it's universal.",
  },
  {
    question:
      'If a circuit has a CIRCUIT BREAKER LOCK at the DB, do I still need my own personal padlock on top?',
    answer:
      "Yes. A built-in breaker lock is a circuit-control device — it stops the breaker being toggled accidentally. Your personal padlock is a personal-safety device — it identifies that YOU specifically are working on the circuit and only YOU can re-energise. The two have different purposes and the LOTO discipline requires both: lock the device AND apply the personal padlock + tag. On a multi-trade site this matters even more — your tag tells the next sparks, the maintenance fitter and the fire alarm engineer that the circuit is being worked on by a named person who hasn't yet finished.",
  },
  {
    question: "Is 'I'll just be 30 seconds' ever a valid reason to skip safe isolation?",
    answer:
      "No. The HSE prosecution archive is full of '30 second' jobs that ended in fatality. The shock that kills you takes 50 milliseconds; the procedure that prevents it takes 90 seconds. The maths is one-sided. The discipline of always isolating, even for the smallest job, is what makes safe-isolation an automatic habit instead of a 'when I remember' habit. The senior who tells you a quick job doesn't need isolation is testing your discipline; the right answer is to isolate anyway, and explain that you've been trained to follow the procedure every time.",
  },
];

export default function Lesson318E_1_3() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The everyday precaution rulebook for live and dead fault work — barriers and signage,
        work-area control, witnessing for live work, energy-source verification, the six-item
        pre-work checklist that becomes muscle memory, and what to do when you find a dangerous
        condition outside the scope of your original call-out.
      </p>

      <TLDR
        points={[
          'Safe working procedures = barriers + signage + work-area control + appropriate witnessing + verified instruments + the pre-work checklist. All six together.',
          'Finding a Code 1 defect outside the scope of your call-out triggers a duty to act — make safe, document, inform customer in writing, escalate to supervisor.',
          "Apprentice-as-cover-holder for a senior's live work is unsafe — the senior's RA doesn't include the apprentice as a participant. Decline politely, escalate.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Specify the safe working procedures for fault diagnosis — barriers, signage, work-area control, witnessing.',
          'Apply the six-item pre-work precaution checklist (RAMS, permit, isolation plan, instruments, PPE, comms) at every job.',
          'Determine when a second competent person (witness, observer) is required and what their role is.',
          'Apply the visual / calibration / function three-step instrument check before trusting any reading.',
          'Recognise and act on dangerous defects discovered outside the scope of the original call-out.',
          'Apply the Work at Height Regulations 2005 alongside electrical-safety procedure for loft and ceiling-void fault work.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The pre-work precaution checklist</ContentEyebrow>

      <ConceptBlock
        title="Six items, every job, no exceptions"
        plainEnglish="The pre-work checklist is what professional pilots, surgeons, divers and competent electricians all use — a structured run-through that catches the easy-to-forget item before it kills you. The version is six items, takes 30 seconds, and protects you from every common cause of post-incident regret."
        onSite="Most firms have a printed or laminated checklist that lives in the toolbag, or an app version (simPRO, Joblogic, BigChange) with a digital tick-box. The point is the discipline of running through it every time, not the medium it's recorded in."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1. RAMS</strong> — read, signed, fault-specific addendum present and current.
          </li>
          <li>
            <strong>2. Permit</strong> — if commercial / industrial, signed by the authorised
            manager, scope matches the planned work.
          </li>
          <li>
            <strong>3. Isolation plan</strong> — primary isolation point identified, lock-off
            device to hand, multi-source check completed.
          </li>
          <li>
            <strong>4. Instruments</strong> — GS38 two-pole tester calibration in date, MFT
            calibration in date, batteries fresh, proving unit functional, leads inspected.
          </li>
          <li>
            <strong>5. PPE</strong> — appropriate to voltage and environment, available and worn.
          </li>
          <li>
            <strong>6. Comms</strong> — supervisor available by phone, lone-working check-in
            scheduled if alone, customer briefing complete.
          </li>
        </ul>
        <p>If any item is missing — STOP, escalate, don't start work.</p>
      </ConceptBlock>

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Work-area control — barriers, signage, briefing</ContentEyebrow>

      <ConceptBlock
        title="Physical separation between the work and the bystanders"
        onSite="A reception, a corridor, a stockroom, a domestic kitchen with kids running through — every fault-diagnosis location has bystanders, and EAWR Reg 14(c) requires ‘suitable precautions' to keep them safe. Verbal warnings alone don't satisfy it; physical separation does."
      >
        <p>The standard work-area control:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Physical barrier</strong> — Skipper barrier, telescopic post barrier, hi-vis
            tape with stanchions, A-frame signs at access points. 2 m clearance from any exposed
            conductor is the working figure.
          </li>
          <li>
            <strong>Signage</strong> — BS EN ISO 7010 W012 (warning — electricity), prohibition
            sign at access point, ‘NO UNAUTHORISED ACCESS', firm name and operative contact.
          </li>
          <li>
            <strong>Briefing</strong> — verbal briefing to anyone in the area before opening the
            enclosure; named responsible person on site who's aware of the work and will challenge
            breaches.
          </li>
          <li>
            <strong>Comms</strong> — phone available to call the office or emergency services from
            the work area; not in a different room.
          </li>
          <li>
            <strong>Lighting</strong> — adequate lighting (LED work-light if the room lighting is
            the affected circuit); torch as backup.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Witnessing — when a second person is required</ContentEyebrow>

      <ConceptBlock
        title="The ‘two-up' principle for higher-risk work"
        plainEnglish="Working alone is acceptable for low-risk dead-circuit fault diagnosis. Working alone on live equipment, in confined spaces, at height, in remote locations, or on systems where a single fault could be fatal — is not. The accompanying person’s role is not to do the work, but to observe, challenge, raise the alarm and assist with rescue."
      >
        <p>Second-person required when:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Live working is planned at any voltage above 50 V AC where the operative can’t safely
            self-rescue.
          </li>
          <li>
            Work is on a system where a single fault could cause death (HV, large industrial
            3-phase).
          </li>
          <li>Work is in a confined space (cellar, void, plant room with single access).</li>
          <li>Work is at height where a fall would prevent self-rescue.</li>
          <li>Work is in a remote location with no immediate help available.</li>
          <li>The firm’s H&S policy specifies it for the task type.</li>
        </ul>
        <p>
          The second person must themselves be competent — typically an Approved Electrician or
          higher — and must not be doing other work that prevents observation. An apprentice can
          be the second person to a senior; an apprentice should not BE the lead operative on a
          job that requires a second person.
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

      <ContentEyebrow>Instrument verification — three-step pre-use check</ContentEyebrow>

      <ConceptBlock
        title="Visual / calibration / function — every instrument, every shift"
        onSite="An instrument that gives a wrong reading is more dangerous than no instrument at all — it gives you false confidence. The three-step check takes 60 seconds per instrument and is non-negotiable. PUWER 1998 Reg 5 puts the duty on the employer; the operative’s pre-use inspection is how it’s discharged."
      >
        <p>The three-step:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Visual</strong> — case undamaged, leads not nicked or crushed, probes have
            intact finger barriers, no visible burn marks or melted plastic, screen clean and
            legible.
          </li>
          <li>
            <strong>Calibration</strong> — calibration label in date (annual for MFT, two-yearly
            for two-pole testers, manufacturer’s interval for multimeters); calibration
            certificate available.
          </li>
          <li>
            <strong>Function</strong> — proves on a known live source AND on a known dead source;
            battery indication healthy; selector switch operates cleanly; self-test (if fitted)
            passes.
          </li>
        </ul>
        <p>Standard kit and typical calibration intervals:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Megger MFT1741 / MFT1741+ — 12 months (Megger UK Service or equivalent).</li>
          <li>Martindale VI-13800 — 24 months (Martindale calibration service).</li>
          <li>Fluke 117 multimeter — 12 months (Fluke or accredited lab).</li>
          <li>Kewtech KT200 RCD tester — 12 months.</li>
          <li>Fluke 376 FC clamp meter — 12 months.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 651.3"
        clause={
          <>
            "Periodic inspection and testing shall not cause danger to persons or livestock and
            shall not cause damage to property or equipment even if the circuit is defective.
            Measuring instruments and monitoring equipment and methods shall be chosen in
            accordance with the relevant parts of BS EN 61557. If other measuring equipment is
            used, it shall provide no less a degree of performance and safety."
          </>
        }
        meaning={
          <>
            Reg 651.3 lifts the same duty into the testing space &mdash; instruments must be
            chosen against BS EN 61557 (the standard your Megger MFT1741+ or Kewtech KT64 is built
            to). It also makes the &ldquo;equivalent or better&rdquo; rule explicit: if
            you&apos;re using anything that isn&apos;t specifically BS EN 61557 marked, the burden
            is on you to demonstrate equivalence. That&apos;s why budget eBay testers don&apos;t
            belong on a fault-diagnosis job.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 651.3, verbatim."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 641.4"
        clause={
          <>
            "Precautions shall be taken to avoid danger to persons and livestock, and to avoid
            damage to property and installed equipment, during inspection and testing."
          </>
        }
        meaning={
          <>
            The pre-work checklist, the barriers, the signage, the witnessing rule and the
            instrument verification routine all sit underneath this single Regulation. The duty is
            twofold &mdash; protect people AND protect equipment. Skipping the equipment-side
            precaution (e.g. running a 500&nbsp;V IR test through a connected LED driver) breaches
            641.4 just as cleanly as skipping the people-side one.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 641.4, verbatim."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 642.1"
        clause={
          <>
            "Inspection shall precede testing and shall normally be done with that part of the
            installation under inspection disconnected from the supply."
          </>
        }
        meaning={
          <>
            The order is fixed: look first, test second, and the look is normally done dead. On a
            fault-diagnosis visit that means a structured visual inspection of the CU, the
            cabling, the accessory and the supply arrangement before you put a tester on it. Most
            diagnostic dead-ends are caused by skipping this step and going straight to a meter.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 642.1, verbatim."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Walking away from a Code 1 defect found outside the call-out scope"
        whatHappens={
          <>
            Apprentice is at a domestic property to investigate a faulty kitchen socket. During
            the work they notice the loft junction box has a disconnected CPC. They think
            &quot;not my job, here for the kitchen&quot; and ignore it. They complete the kitchen
            work, leave, send the invoice. Two months later the customer’s child touches a metal
            bedside lamp and takes a 230&nbsp;V shock through the lifted CPC. The HSE
            investigation finds the apprentice’s job sheet recorded the loft inspection; the
            customer’s solicitor argues the apprentice had a duty to act on what they saw. The
            firm’s professional indemnity insurer refuses cover (failure to act on known defect).
            The apprentice is named in the prosecution alongside the firm.
          </>
        }
        doInstead={
          <>
            Code 1 defects discovered during ANY visit trigger a duty to make safe AND inform the
            customer in writing AND escalate to the supervisor. The minimum action is to isolate
            the affected circuit and label &quot;OUT OF SERVICE &mdash; DO NOT
            RE-ENERGISE&mdash;CPC FAULT&quot;, then document on the job sheet and on a Dangerous
            Condition Notification form to the customer. Most firms have a DCN template. The
            customer can choose whether to authorise the additional work; what they can’t do is
            have you withhold the warning.
          </>
        }
      />

      <CommonMistake
        title="Trusting an instrument because it’s the firm’s only one"
        whatHappens={
          <>
            Apprentice arrives at a job with the firm’s MFT &mdash; calibration sticker is two
            months out of date. They use it anyway because there’s no spare and the job is
            booked. Insulation resistance reading shows 200&nbsp;M&Omega; on a circuit that&apos;s
            actually got a wet fault giving 0.3&nbsp;M&Omega; (the MFT’s IR circuit has drifted
            out of spec). Apprentice signs the circuit off as compliant and leaves. Two weeks
            later the wet fault grows, the customer’s RCD trips repeatedly, the firm gets called
            back. The customer’s complaint says they paid for a fault investigation that didn’t
            find the fault &mdash; refund + remedial costs. Insurance excludes claim because the
            instrument was out of calibration at the time of test.
          </>
        }
        doInstead={
          <>
            An instrument with expired calibration is not a usable instrument. The job is rebooked
            when a calibrated instrument is available, OR a different instrument is obtained
            (rental, borrow from another office). The cost of one rescheduled job is trivial
            compared to the cost of an uncalibrated reading that misses a real fault. Most firms
            have a ‘no calibration, no work' rule and will pay for emergency calibration /
            instrument hire to avoid a re-visit.
          </>
        }
      />

      <Scenario
        title="Reception-area DB fault investigation during business hours"
        situation={
          <>
            You’re at a small accountancy firm to investigate a recurring nuisance trip on the
            upstairs office RCBO. The DB is in the reception area, behind the receptionist’s
            desk. The reception is in normal use during the work &mdash; deliveries, clients,
            staff. The receptionist asks how long the work will take and whether they can stay at
            their desk.
          </>
        }
        whatToDo={
          <>
            (1) Brief the receptionist on the four-category impact &mdash; affected circuit will
            be off, your work area extends 2&nbsp;m around the open DB, no-one should cross the
            barrier without speaking to you. (2) Set up barrier (Skipper or A-frame) at 2&nbsp;m
            radius around the DB; place &quot;DANGER &mdash; ELECTRICAL WORK&quot; signage at all
            approaches. (3) Brief the office manager (the named responsible person) who agrees to
            keep clients clear of reception during the work. (4) Tell the receptionist they CAN
            stay at their desk if it’s outside the barrier; if they’re inside the barrier they
            need to relocate. (5) Apply isolation, lock-off, prove dead, work. (6) Throughout the
            work, periodically check the barrier hasn’t been moved by deliveries or clients
            walking past. (7) On completion, retest, restore supply, remove barrier, document.
            Brief the office manager that work is complete.
          </>
        }
        whyItMatters={
          <>
            Real-world fault diagnosis is rarely in a quiet empty room. Public-area work requires
            deliberate work-area control AND deliberate communication with the people who share
            the space. The HSE investigates incidents where a bystander contacts live equipment in
            a busy area &mdash; the firm’s defence is &quot;we had barriers and briefed the
            responsible person&quot;, not &quot;we put a sign up&quot;. The discipline of physical
            separation + named responsible person + documented briefing is what makes the work
            defensible.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Witnessing and the second-person rule</ContentEyebrow>

      <ConceptBlock
        title="Live work above 50 V AC requires a competent witness"
        plainEnglish="HSE GS38 and most firms' H&S policies require a competent witness present whenever live work is being carried out above 50 V AC. The witness is not a passive observer — they are positioned to (a) cut supply at the isolation point if the operative is shocked, (b) call the emergency services, (c) start CPR / use the AED if needed."
        onSite="On a domestic CU change with one electrician + one apprentice, the apprentice IS the witness during any live final-tightening of incomer terminals. They stand beside the cut-out main switch, ready to operate it. Briefing before live work starts: 'If I shout STOP, you flip the main switch and call 999. If I drop, you isolate, then start CPR.' Practiced regularly so the response is automatic."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Competent witness</strong> — must understand the work, be physically capable
            of operating the isolation, know first aid (HSE-approved 1-day or 3-day course), have
            access to a phone with signal.
          </li>
          <li>
            <strong>Position</strong> — within arm's reach of the isolation point; clear line of
            sight to the operative; not in the arc-flash boundary.
          </li>
          <li>
            <strong>Briefing</strong> — explicit verbal briefing on what to do if the operative is
            shocked, including isolation, emergency call, CPR / AED.
          </li>
          <li>
            <strong>Lone live work</strong> — never acceptable above 50 V AC. If the firm sends an
            operative to do live work alone, that's an EAWR Reg 14(c) breach (suitable precautions
            not taken).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Energy-source verification — proving zero</ContentEyebrow>

      <ConceptBlock
        title="The verification step before any direct contact with conductors"
        plainEnglish="Before you put a hand on a conductor — even one you've isolated, locked-off and proved dead at the work point — you do one final verification: a brief touch test with the back of an insulated-gloved hand, or a final two-pole tester touch on the same conductor at the same point. The 30-second cost is the cheapest insurance on site."
        onSite="The Martindale VI-13800 / Fluke T130 / Kewtech KT1780 two-pole tester is small enough to live in your top pocket. You touch-test BEFORE the first cut, BEFORE removing the first terminal, BEFORE the first probe goes in. If anything has changed since your earlier prove-dead — supply restored, parallel path discovered, lock removed — the touch-test catches it before you do."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Final touch-test</strong> — at the moment of first contact, touch L-N, L-E and
            N-E with the two-pole. Less than a second per pair. Re-prove on the known live source
            after.
          </li>
          <li>
            <strong>Insulated-glove back-of-hand</strong> — for inaccessible conductors, the
            back-of-hand contact through Class 0 1000 V AC gloves provides a residual safety
            margin (if there's voltage, your muscles spasm AWAY rather than gripping).
          </li>
          <li>
            <strong>Re-test after breaks</strong> — after lunch, after any interruption, after any
            other operative has been near the DB — re-prove dead before resuming work.
          </li>
          <li>
            <strong>Suspicious readings</strong> — any unexpected reading (e.g. 30 V appearing on
            what should be dead) STOPS the work immediately. Investigate the source before
            continuing.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The precaution checklist — pre-work mental model</ContentEyebrow>

      <ConceptBlock
        title="The pre-work mental model — the eight things you check before starting"
        plainEnglish="Experienced fault investigators run an eight-item mental checklist before opening any enclosure. The checklist takes 60 seconds and catches the conditions that turn a routine job into an incident."
        onSite="Recite the checklist out loud on your first jobs — it builds the habit faster. After 50-100 fault investigations the checklist becomes automatic and the recitation isn't needed. The apprentice is at the stage where conscious application is still appropriate."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1. Supply identification</strong> — TN-S / TN-C-S / TT / IT / PNB confirmed.
          </li>
          <li>
            <strong>2. Multi-source check</strong> — PV, battery, EV, generator identified and
            isolated where in scope.
          </li>
          <li>
            <strong>3. RAMS reviewed</strong> — task RAMS read, addendum updated for actual
            conditions, EAWR Reg 14 live-work justification documented if applicable.
          </li>
          <li>
            <strong>4. PPE on</strong> — Class 0 gloves, arc-rated top, safety glasses, insulated
            tools (Wera VDE, Knipex VDE).
          </li>
          <li>
            <strong>5. Instruments verified</strong> — calibration date in date, daily prove-test
            passed, leads inspected.
          </li>
          <li>
            <strong>6. Witness present</strong> — for live work above 50 V AC, witness briefed and
            positioned.
          </li>
          <li>
            <strong>7. Barrier and signage</strong> — work area defined, public access controlled.
          </li>
          <li>
            <strong>8. Emergency response</strong> — isolation point known, first-aid kit / AED
            location known, emergency contact ready.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Decision points and stop-work triggers</ContentEyebrow>

      <ConceptBlock
        title="Knowing when to stop and call the supervisor"
        plainEnglish="Fault diagnosis is hypothesis-driven. As tests progress, the hypothesis is either confirmed or revised. Some test results trigger an immediate STOP — these are the conditions where the apprentice escalates rather than pushes on."
        onSite="The stop-work trigger list is short but absolute. The HSE prosecution archive is full of cases where an apprentice or improver pushed through a stop-work condition and was killed. Knowing where your authority ends is the competence test in EAWR Reg 16."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Open PEN suspected</strong> — N-E voltage at cut-out above 30 V on TN-C-S =
            STOP, DNO call, never an apprentice fix.
          </li>
          <li>
            <strong>Supply-side fault</strong> — anything upstream of the cut-out is the DNO's
            domain. Apprentice does not investigate or repair.
          </li>
          <li>
            <strong>Compromised CU enclosure</strong> — water ingress, signs of arcing, melted
            plastic, exposed busbar with no cover available — STOP, full installation isolation,
            then assess.
          </li>
          <li>
            <strong>Unexpected reading</strong> — voltage where you expected zero, current where
            you expected nothing, Zs above protection limit — STOP, re-think the hypothesis,
            escalate if you can't explain.
          </li>
          <li>
            <strong>Out-of-scope discovery</strong> — finding 3-phase equipment when you were
            briefed for single-phase, finding ATEX zoning that wasn't on the brief, finding a
            working environment that doesn't meet EAWR Reg 15 (space, access, light) — STOP,
            escalate, update RAMS.
          </li>
          <li>
            <strong>Customer dispute</strong> — if the customer challenges the diagnosis or
            refuses safety advice, STOP, document, escalate to supervisor. Don't argue on site.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The pre-work precaution checklist has six items: RAMS, permit, isolation plan, instruments, PPE, comms. Run through it every job, every time, no exceptions.',
          "Work-area control = physical barrier + signage + briefing of named responsible person. Verbal warnings alone don't satisfy EAWR Reg 14(c).",
          'Second person required for live working, confined space, work at height, remote locations, HV, large industrial 3-phase. Their role is observation and rescue, not work.',
          'Three-step instrument check: visual / calibration / function. Every instrument, every shift. Out-of-calibration instrument = unusable instrument.',
          'Code 1 defect found outside the call-out scope triggers a duty to make safe, inform customer in writing (Dangerous Condition Notification), escalate to supervisor.',
          'Work at Height Regulations 2005 apply alongside electrical-safety procedure for loft and ceiling-void fault work — risk assessment, secured access, no plasterboard standing.',
          "Apprentice-as-cover-holder for a senior's live work is unsafe — politely decline, suggest a prop, escalate to supervisor if pressed.",
          'Make-safe-and-tidy at job end protects the next operative and the customer. Temporary terminations capped, removed accessories returned, area documented.',
        ]}
      />

      <Quiz title="Safe working procedures — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Applying the JIB six-step in fault-diagnosis context — circuit, sub-main and full
        installation isolation, multi-source disconnection (PV, EV, battery, generator), the
        four-category impact assessment of loss of supply, and the BS 7671 distinction between
        isolation and switching off for mechanical maintenance.
      </p>

      <TLDR
        points={[
          'Modern installations have multiple energy sources — PV, EV, battery, generator. Each needs its own isolation step. AC isolation alone leaves DC sources live.',
          'BS 7671 Chapter 46 distinguishes four switching functions. Only ISOLATION (Reg 462 — lockable, prevents re-energisation) is acceptable for fault diagnosis.',
          'Loss of supply has impact across four categories: other personnel, customer, public, building systems. Document the impact briefing before isolation, not after.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Apply the JIB six-step safe isolation procedure to single-circuit, sub-main and full-installation isolation in fault-diagnosis context.',
          'Identify all energy sources in a multi-source installation (PV, EV, battery, generator) and specify the isolation point for each.',
          'Distinguish ISOLATION (BS 7671 Reg 462), switching off for mechanical maintenance (Reg 463), emergency switching (Reg 464) and functional switching (Reg 465).',
          'Assess the impact of loss-of-supply across four categories: other personnel, customer/client, public, building systems.',
          'Apply group lock-off (multi-lock hasp) where multiple operatives are working on the same isolation point.',
          'Recognise the auto-restart hazard for motors on supply restoration and apply PUWER Reg 19 isolation discipline.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Single-circuit isolation — the eight-step in detail</ContentEyebrow>

      <ConceptBlock
        title="The single-circuit isolation procedure"
        plainEnglish="You met the JIB six-step earlier in this course. In fault-diagnosis context the procedure has eight micro-steps when you include the lead-in (identify) and the lead-out (retest). Every practical exam tests this sequence. Learn it as muscle memory."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1. Identify</strong> from schedule, labels, customer information. Hypothesis
            only.
          </li>
          <li>
            <strong>2. Switch off</strong> the circuit's protective device. Confirm visually that
            it’s in the OFF position.
          </li>
          <li>
            <strong>3. Lock-off</strong> with personal padlock and tag. Use a multi-lock hasp if
            multiple operatives are working.
          </li>
          <li>
            <strong>4. Prove tester</strong> on a known live source — Martindale GVD2 proving unit
            OR a known-live socket on a different circuit.
          </li>
          <li>
            <strong>5. Test work-point</strong> at the accessory or junction box. L–N, L–E, N–E.
            All three must read zero on the GS38 two-pole.
          </li>
          <li>
            <strong>6. Re-prove tester</strong> on the same known live source. Catches a tester
            that has failed during the test.
          </li>
          <li>
            <strong>7. Carry out work.</strong> Stay within the scope of the isolation; if the
            work expands, re-isolate accordingly.
          </li>
          <li>
            <strong>8. Retest and restore.</strong> Continuity of CPC, ring continuity (if a
            ring), insulation resistance, polarity, then RCD trip-time on the protective device.
            Remove personal padlock, restore supply, document.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard {...videos.safeIsolation} topic="JIB safe isolation — where to test" />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulations 462.1 (Provisions for isolation) and 537.2.4 (Devices for isolation — prevention of unwanted closure)"
        clause={
          <>
            "462.1 Each electrical installation shall have provisions for isolation from each
            supply. 537.2.4 Devices for isolation shall be selected and/or installed so as to
            prevent unwanted or unintentional closure (see Regulation 462.3). This may be achieved
            by locating the device in a lockable space or lockable enclosure or by padlocking or
            by other suitable means."
          </>
        }
        meaning={
          <>
            Two requirements work together. First &mdash; Reg 462.1 says every installation must
            have provisions for isolation from each supply. Second &mdash; Reg 537.2.4 says the
            isolation device itself must be selected and installed so it can&apos;t be
            unintentionally closed (lockable enclosure, padlock or equivalent). The apprentice
            needs to know that &lsquo;isolation&rsquo; isn&apos;t just turning a switch off
            &mdash; it&apos;s using a device that&apos;s designed and installed to stay off.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 46, Regulations 462.1 and 537.2.4."
      />

      <SectionRule />

      <ContentEyebrow>Multi-source installations</ContentEyebrow>

      <ConceptBlock
        title="Modern installations have multiple energy sources — each needs its own isolation"
        plainEnglish="A residential installation in 2026 may have grid supply (TN-C-S), solar PV (DC up to 600 V), battery storage (DC up to 800 V), EV charger (back-feed via V2G in some installations), microCHP (back-feed AC), and a standby generator. Each is an independent energy source and each has its own isolation point. Killing the main switch only kills the grid input — everything else stays live until you isolate it separately."
        onSite="The growth of low-carbon technology means most domestic CUs you’ll work on by mid-decade will have at least one supplementary source. Knowing where to isolate each one is part of the fault-diagnosis competence. Inverter-DC isolators are usually rotary devices on the wall next to the inverter (Santon, Enwitec, BPV); battery DC isolators are often inside the battery housing; generator isolation is usually a changeover switch with a manual lockable position."
      >
        <p>Isolation points for common multi-source installations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Solar PV</strong> — AC isolator at the inverter output (BS 7671 712.537.2.2.1)
            AND DC isolator between array and inverter input (Reg 712.537.2.2). Cover the array if
            working in daylight to reduce DC voltage. Verify with DC-rated tester (Fluke T6-1000,
            Megger MFT1741 set to DC).
          </li>
          <li>
            <strong>EV charger</strong> — local isolator at the charger AND verify the EV is
            unplugged. Modern EVSEs (Zappi, Ohme, Pod Point) have internal contactors but the
            local isolator is the lockable point.
          </li>
          <li>
            <strong>Battery storage</strong> — AC isolator at the inverter AND battery DC isolator
            (often inside the cabinet, Tesla Powerwall has it on the side, GivEnergy and Solax
            have similar). Battery DC voltage can be 48–800 V depending on system.
          </li>
          <li>
            <strong>Standby generator</strong> — changeover switch in the MAINS-OFF / GEN-OFF
            position, lock-off the generator manual start, disconnect the start battery if
            extended work.
          </li>
          <li>
            <strong>microCHP / fuel cell</strong> — AC isolator at the unit; some units have an
            internal contactor that re-closes on grid restoration so lock-off is essential.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Full-installation isolation</ContentEyebrow>

      <ConceptBlock
        title="When the safety case requires the whole property goes off"
        onSite="Full isolation has the biggest customer impact and is rightly used sparingly — but when it’s the right answer, the customer impact doesn’t change the answer. The decision is a Reg 14 risk assessment in real time."
      >
        <p>Full installation isolation is required when:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>The fault is on the supply / cut-out / tails / main switch / busbar itself.</li>
          <li>
            You can’t reliably identify which circuit feeds the fault location (e.g. a
            downlighter that takes power from one circuit’s L and another circuit’s N — borrowed
            neutral).
          </li>
          <li>
            The work involves removing or refitting the consumer unit cover where the busbar is
            exposed.
          </li>
          <li>
            The fault has compromised the integrity of the CU — water ingress, burnt terminal
            block, melted enclosure, signs of arcing.
          </li>
          <li>
            The DB is not labelled or the labels are demonstrably wrong (no reliable way to
            isolate just the affected circuit).
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 537.2.4"
        clause={
          <>
            "Devices for isolation shall be selected and/or installed so as to prevent unwanted or
            unintentional closure (see Regulation 462.3). This may be achieved by locating the
            device in a lockable space or lockable enclosure or by padlocking or by other suitable
            means."
          </>
        }
        meaning={
          <>
            Lock-off is mandated by BS 7671, not just by good practice. A padlock through the MCB
            hasp, a captive-key main switch, a Brady SafeKey lockout box across the consumer unit
            &mdash; pick one and use it every isolation, every time. An &ldquo;I just popped the
            breaker off&rdquo; isolation does not satisfy 537.2.4.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 537.2.4."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 514.13.1"
        clause={
          <>
            "A warning notice clearly and durably marked with the words ‘Safety Electrical
            Connection — Do Not Remove’ shall be securely fixed in a visible position at or near:
            (a) the point of connection of every earthing conductor to an earth electrode; and (b)
            the point of connection of every bonding conductor to an extraneous-conductive-part;
            and (c) the main earthing terminal, where separate from main switchgear."
          </>
        }
        meaning={
          <>
            On any isolation that touches the MET or main bonding (boilers, gas / water cocks,
            sub-main isolation), the safety-electrical-connection labels must remain in place when
            you put the installation back. If you&apos;ve had to remove a label to access a
            connection, replace it before you sign the job off &mdash; missing labels are a Code 3
            on a future EICR and a real hazard for the next sparks.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 514.13.1."
      />

      <SectionRule />

      <ContentEyebrow>The four-category impact assessment</ContentEyebrow>

      <ConceptBlock
        title="What does this isolation do, beyond the circuit being worked on?"
        plainEnglish="Loss of supply has consequences. A simple isolation on a small site can cascade into customer impact, public safety issues and building-systems faults. The four-category assessment is the structured way to think about consequences before flipping the breaker."
      >
        <p>The four categories on the this criterion syllabus:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Other personnel</strong> — other trades on site lose lighting / power for
            tools; lone-working procedures may need adjusting; supervision arrangements may need
            updating.
          </li>
          <li>
            <strong>Customer / client</strong> — loss of business activity, freezer stock at risk,
            computers go down (data loss risk), contractual penalties on commercial sites,
            customer dissatisfaction.
          </li>
          <li>
            <strong>Public</strong> — emergency exits may go dark, public-area lighting fails,
            accessible plant rooms become hazardous, security systems may shut down, fire-alarm
            route compromised.
          </li>
          <li>
            <strong>Building systems</strong> — fire alarm fault, emergency lighting batteries
            enter discharge, lift goes to ground floor, BMS may fault, refrigeration cycles
            interrupt, motors may auto-restart.
          </li>
        </ul>
        <p>
          The standard practice is to brief the customer in writing on each category that applies,
          get their acknowledgement, and document on the job sheet before isolation.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Isolating only the AC side of a PV-equipped CU"
        whatHappens={
          <>
            Apprentice arrives at a domestic property with a 4&nbsp;kWp solar PV system to
            investigate an earth-leakage fault. They isolate at the main switch and prove dead at
            the affected circuit’s accessory. They start cutting back to a junction box. Halfway
            through the cut they hit the inverter’s DC input cable that runs through the same
            containment. The DC side is at 480&nbsp;V (it’s noon in June); the cut arcs, the
            apprentice gets a DC arc-flash burn, and the inverter is ruined. Diagnosis: AC
            isolation didn’t kill the DC side of the PV system, and the apprentice’s AC-only
            tester didn’t see the DC voltage on the cable being cut.
          </>
        }
        doInstead={
          <>
            Identify ALL energy sources before isolation. Isolate AC and DC separately. Confirm
            with a DC-rated voltage tester (Fluke T6-1000, Megger MFT1741 in DC mode) on any cable
            that might carry DC. If unsure whether a cable is AC or DC, treat as live until
            verified with the appropriate tester. Cover the PV array with an opaque sheet to drop
            DC voltage to near-zero if you’ll be working near DC cables for an extended period.
          </>
        }
      />

      <CommonMistake
        title="Restoring supply without checking what restarts"
        whatHappens={
          <>
            Apprentice has isolated a workshop sub-main to investigate a fault. After repair they
            restore at the main switch. A 7.5&nbsp;kW three-phase induction motor on the lathe
            restarts automatically (the contactor was left in the run state when supply went off,
            and the holding circuit re-energises on power return). An apprentice machinist
            standing at the lathe has their hand inside the chuck guard; the spindle starts; the
            machinist loses two fingers. Cause: no check that the motor’s local isolator was OFF
            before upstream restoration.
          </>
        }
        doInstead={
          <>
            Before restoring upstream supply, walk the area, identify every motor / pump / fan /
            heating element on the affected circuit, ensure local isolators are OFF, brief anyone
            in the work area. Restore upstream, then deliberately restart each motor at its local
            isolator after confirming the area is clear. PUWER Reg 19 makes this a legal duty
            &mdash; isolation from sources of energy AND verification that restart will not cause
            injury.
          </>
        }
      />

      <Scenario
        title="Multi-source domestic CU fault investigation"
        situation={
          <>
            Customer reports a 30 mA RCD trip on the kitchen radial that resets briefly then trips
            again. The Hager CU has main switch incomer, 6 RCBOs feeding the circuits, AND a
            dedicated way feeding a Solis 4&nbsp;kW solar PV inverter (with a Givenergy
            9.6&nbsp;kWh battery on a separate way), AND a way feeding an Ohme 7&nbsp;kW EV
            charger. You need to investigate the kitchen circuit fault. Sun is shining, EV is
            plugged in, battery is charging.
          </>
        }
        whatToDo={
          <>
            (1) Brief the customer on the four-category impact &mdash; their freezer is on the
            affected circuit, they’ll lose 60&ndash;90 minutes of supply. Agree the timing. (2)
            Make a list of all the energy sources: grid, PV, battery, EV. (3) Isolate the kitchen
            RCBO, lock-off, prove dead at the work point, start investigating. (4) For this fault
            you do NOT need to isolate the PV / battery / EV &mdash; their feeds run via separate
            ways and don’t share conductors with the kitchen circuit. BUT check the kitchen
            circuit doesn’t have a borrowed neutral from the PV feed (older installations
            sometimes do). If it does, escalate to multi-source isolation. (5) Find and rectify
            the fault. Retest with an MFT &mdash; insulation resistance, RCD trip-time, polarity.
            (6) Restore, document, brief the customer.
          </>
        }
        whyItMatters={
          <>
            Multi-source CUs are the new normal. The apprentice has to think through the
            isolation for every energy source independently, decide which ones the fault
            investigation actually touches, and isolate accordingly. Over-isolating wastes
            customer time; under-isolating risks lethal contact with a source that’s still live.
            The structured approach &mdash; identify every source, decide which the work touches,
            isolate those &mdash; is the step up from the ‘just flip the main switch'
            habit.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Sub-main isolation</ContentEyebrow>

      <ConceptBlock
        title="When the fault is on a sub-main feeding a downstream DB"
        plainEnglish="Sub-mains feed sub-distribution boards from the main DB. A fault on a sub-main affects every circuit on the downstream board. Isolation point: the upstream DB's protective device for that sub-main, locked-off, then prove dead at the downstream DB's incomer terminals before any work."
        onSite="On commercial sites the sub-main is typically a 4 mm² to 25 mm² SWA cable feeding a sub-DB on a different floor or in a different building. The upstream protective device might be an MCCB (e.g. Schneider NSX series, ABB Tmax XT) rather than an MCB — locking off an MCCB usually requires a manufacturer's lock-off kit (Schneider PADLK or ABB OTPL). Check the lock-off device fits before isolating; some legacy MCCBs need a third-party adaptor."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identify both ends</strong> — confirm the sub-main goes from upstream device A
            to downstream DB B (cable labelling, drawings, continuity test if cables are
            unmarked).
          </li>
          <li>
            <strong>Isolate at upstream</strong> — operate the upstream MCCB / switch-fuse,
            lock-off with the manufacturer's kit + personal padlock + tag.
          </li>
          <li>
            <strong>Prove dead at downstream</strong> — open the downstream DB cover, prove the
            GS38 two-pole on a known live source, test L-N / L-E / N-E at the downstream DB's
            incomer terminals. All zero before work starts.
          </li>
          <li>
            <strong>Beware back-feed</strong> — on installations with on-site generation (PV,
            battery, generator) downstream of the sub-main, the downstream DB can back-feed even
            with the upstream isolated. Multi-source isolation procedures apply.
          </li>
          <li>
            <strong>Re-prove at the end</strong> — after retest and restoration, re-prove the
            tester. The upstream device may have changed state during the work (someone may have
            operated it).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>BS 7671 Chapter 46 — the four switching functions</ContentEyebrow>

      <ConceptBlock
        title="Isolation, mechanical maintenance, emergency, functional — four jobs, four devices"
        plainEnglish="BS 7671 Chapter 46 was completely revised at A4:2026. It distinguishes four switching functions and the apprentice needs to know which device is rated for which function. The MCB on the consumer unit is rated for isolation (Reg 462) AND functional switching (Reg 465), but a rotary functional switch on a piece of plant is NOT rated for isolation — using it for fault-diagnosis isolation is a Chapter 46 breach."
        onSite="Read the device label and the manufacturer data sheet. Look for the lock-off mechanism (mandatory for isolation per Reg 462.3); look for the breaking capacity rating; look for the BS reference number. If the device cannot lock off and prevent unintentional closure, it is not rated for isolation regardless of what the customer thinks. Isolate further upstream at a device that does meet Reg 462."
      >
        <p>The four functions, in plain terms:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Isolation (Reg 462)</strong> — disconnects every live conductor, designed to
            prevent re-energisation. Lock-off mandatory per Reg 462.3. Used for fault diagnosis,
            alteration, addition, periodic inspection. Examples: main switch, distribution board
            incomer with lock-off, RCBO with lock-off accessory.
          </li>
          <li>
            <strong>Switching off for mechanical maintenance (Reg 463)</strong> — hand-operable,
            lockable in OFF, prevents accidental re-energisation. Used when a non-electrician
            needs to work on plant (cleaning a fan, replacing a belt). Local plant isolators are
            typical examples.
          </li>
          <li>
            <strong>Emergency switching (Reg 464 / 465.1)</strong> — fast-acting, immediately
            accessible, removes danger from personnel. Mushroom-head red stop button on a
            workshop, kill switch on a hob, pump-stop at a refrigeration room.
          </li>
          <li>
            <strong>Functional switching (Reg 465)</strong> — normal operation control. Light
            switches, MCB toggle for everyday on / off, contactor control. Not rated for
            isolation; using one for isolation work is a Chapter 46 breach.
          </li>
        </ul>
        <p>
          Practical check: before locking off, confirm the device is rated for isolation by
          reading the label and the manufacturer data sheet. If in doubt, isolate upstream at a
          device you know is rated. Cheap, generic functional-only switches still appear on legacy
          installations and they look identical to isolators from across the room.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Documentation and records</ContentEyebrow>

      <ConceptBlock
        title="The isolation certificate and the fault-diagnosis record"
        plainEnglish="Every safe isolation in fault diagnosis should be recorded — what was isolated, by whom, at what time, by what means, and when supply was restored. On commercial sites this is typically a formal isolation certificate (a one-page form). On domestic it might be a section on the firm's fault-diagnosis job sheet."
        onSite="The record matters for two reasons. First — if a third party is injured during your isolation window, the certificate is your defence (you can show what was isolated and what was not). Second — if you're called back to the same site weeks later for an unrelated issue, the previous record tells you the layout, the labels and any quirks. NICEIC, NAPIT and ELECSA audit isolation records during surveillance visits."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Isolation certificate fields</strong> — date, time on, time off, operative
            name, equipment isolated, isolation point, lock-off applied (yes/no, padlock serial),
            tester used (make / model / cal date), proven on (proving unit / known live source).
          </li>
          <li>
            <strong>Fault-diagnosis record</strong> — symptom reported, hypothesis, tests
            performed, results, root cause identified, remedial action, retest results, customer
            briefing.
          </li>
          <li>
            <strong>Photo evidence</strong> — most firms now expect a photo of the isolation
            (lock-off applied to the breaker, tester reading zero on the work-point) on the job
            sheet. Use the firm's job-management app (ServiceM8, Tradify, simPRO) or just send to
            the office WhatsApp.
          </li>
          <li>
            <strong>Retention</strong> — fault-diagnosis records typically retained for 7 years
            (matches the EICR retention recommendation). Keep digital copies; paper degrades.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Restoration and proof of safe restoration</ContentEyebrow>

      <ConceptBlock
        title="Restoring supply isn't just flipping the breaker back on"
        plainEnglish="Before restoring after fault correction, you have to prove the circuit is safe to re-energise — continuity of CPC, R1+R2, insulation resistance, polarity, RCD trip-time. BS 7671 643 sets the dead-test sequence; live-test sequence is Zs and RCD trip-time. The MFT (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) does all of these."
        onSite="The post-correction retest is non-negotiable. A repaired cable that you've crimped back together has to demonstrate insulation resistance ≥1 MΩ at 500 V (typically you'll see 200+ MΩ on a healthy circuit), CPC continuity matching design, polarity correct (L on the line terminal, N on the neutral), RCD trip within BS EN 61008 / 61009 limits (300 ms at 1×IΔn, 40 ms at 1×IΔn for a Type AC 30 mA RCD)."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Dead-test sequence (BS 7671 643)</strong> — continuity of CPC and ring;
            insulation resistance L-L, L-E, N-E at 500 V (at 250 V if electronic loads can't be
            disconnected); polarity.
          </li>
          <li>
            <strong>Live-test sequence</strong> — Zs at the furthest accessory (compare to design
            value); RCD trip-time at 1× and 5× rated trip current; RCD ramp test (verify trip
            current within 50-100% of rated value); functional test of any control gear.
          </li>
          <li>
            <strong>Recording</strong> — the MFT (Megger MFT1741+, Fluke 1664FC) records every
            reading with timestamp; download via PowerSuite (Megger), FlukeView Forms (Fluke), or
            Patguard (Seaward) to produce a printable retest record.
          </li>
          <li>
            <strong>Customer briefing on restoration</strong> — explain what was done, what tests
            passed, any follow-up needed (e.g. "the original fault was a damaged cable in the
            loft; I've repaired it and tested; the circuit is safe to use; you may want to
            consider a CU upgrade in the next 5 years because the existing one is from 1996").
          </li>
          <li>
            <strong>Update certificates</strong> — if remedial work was done, issue a Minor Works
            Certificate (MWC) for single-circuit work or an EICR for multi-circuit. Issue a copy
            to the customer.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Single-circuit isolation in fault diagnosis is the eight-step JIB sequence: identify, switch off, lock-off, prove tester, test work-point, re-prove tester, carry out work, retest and restore.',
          'Multi-source installations have multiple isolation points — PV (AC + DC), EV, battery (AC + DC), generator. Each needs its own step. AC isolation alone leaves DC sources live.',
          "BS 7671 Reg 462 (isolation) requires lockable, designed-to-prevent re-energisation. Some older switches don't satisfy Reg 462 and need upstream isolation instead.",
          'Full installation isolation is needed when the fault is on the supply / cut-out / busbar, when circuit ID is unreliable, when the CU is compromised, or when removing the CU cover.',
          'Loss of supply has impact across four categories — other personnel, customer/client, public, building systems. Document the briefing before isolation, not after.',
          "Multi-operative isolation uses a multi-lock hasp (Brady 65681, Master Lock 421). Each operative attaches their own padlock; no operative removes anyone else's lock.",
          'Auto-restart of motors on supply restoration is a major cause of post-fault injuries. PUWER Reg 19 requires local isolators OFF before upstream restoration.',
          'Personal padlock + tag is a personal-safety device, not just a circuit-control device. Only the operative who applied the lock removes it. LOTO discipline is universal.',
        ]}
      />

      <Quiz
        title="Safe isolation in fault diagnosis — knowledge check"
        questions={quizQuestions2}
      />
    </div>
  );
}
