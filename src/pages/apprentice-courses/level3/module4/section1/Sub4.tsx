/**
 * Module 4 · Section 1 · Subsection 4 — Safe working procedures for fault diagnosis
 * Maps to C&G 2365-03 / Unit 303 / LO1 / AC 1.3 + LO4 / AC 4.1
 *   AC 1.3 — "specify safe working procedures that should be adopted for fault diagnosis and correction work"
 *   AC 4.1 — "state precautions that must be taken when carrying out fault diagnosis"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.1 — safe working procedures for
 * fault diagnosis and correction work.
 *
 * Frame: brings together the precaution rulebook for live and dead fault work
 * — barriers and signage, work area control, witnessing requirements, energy
 * source verification, the precaution checklist that becomes muscle memory.
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
  'Safe working procedures for fault diagnosis (1.4) | Level 3 Module 4.1.4 | Elec-Mate';
const DESCRIPTION =
  'The precaution rulebook for live and dead fault work — barriers and signage, work area control, witnessing for live work, energy-source verification, the everyday precaution checklist that becomes muscle memory.';

const checks = [
  {
    id: 'mod4-s1-sub4-barrier',
    question:
      "You're working on an exposed busbar inside a Schneider Acti9 DB at a small office reception. The reception is in normal use during the work. What barrier and signage are required?",
    options: [
      "A single 'Danger — Electrical Work' sign taped to the front of the open DB is enough — the sign warns anyone approaching and a busy reception can't have a barrier blocking pedestrian flow. Signage alone does not satisfy the duty to non-employees; a sign with no physical separation lets a bystander walk straight into the danger zone of exposed live conductors.",
      "Verbally ask the receptionist to keep people away from the DB while you work and rely on them to challenge anyone who approaches. Delegating bystander control to an untrained occupant with no physical barrier is not a 'suitable precaution'; physical separation of the work area is required, not a verbal request.",
      "Close the reception entirely and ask all staff and visitors to leave the building until the work is finished. Total evacuation is disproportionate for a localised DB task and usually impractical; the correct control is a physical barrier around the 2 m work area plus signage and a briefing, allowing the rest of the reception to function.",
      "A physical barrier at 2 m around the open DB (Skipper screen or similar), warning signage (BS EN ISO 7010 W012, 'no unauthorised access'), and a briefing to a named responsible person who will challenge anyone crossing it. The barrier is non-negotiable; signage alone doesn't satisfy the HSWA Section 3 duty to non-employees.",
    ],
    correctIndex: 3,
    explanation:
      "Work-area control is one of the EAWR Reg 14(c) 'suitable precautions' for live work. The Construction (Design and Management) Regulations 2015 (CDM) Reg 22 requires barriers between work and bystanders. The Workplace (Health, Safety and Welfare) Regulations 1992 Reg 5 puts a maintenance duty on the employer for safe access routes. All three combine to require physical separation of the work area from public access. Skipper barriers, telescopic post barriers, hi-vis tape with stanchions — all acceptable. Verbal warnings without barriers are not.",
  },
  {
    id: 'mod4-s1-sub4-witness',
    question:
      "When is a SECOND COMPETENT PERSON (a witness, accompanying operative, safety observer) required for fault diagnosis work?",
    options: [
      "Required only on three-phase commercial work above 1000 V — single-phase domestic and small-commercial fault diagnosis is always a one-person job because the risks are low. This sets the threshold far too high; a second person is needed for live work above 50 V AC, confined spaces, work at height and remote locations, not only above 1000 V.",
      "Required on every fault-diagnosis visit without exception, because BS 7671 mandates two operatives for all inspection and testing. There is no blanket two-person rule for testing; low-risk dead-circuit diagnosis can be done solo, and the second person is reserved for higher-risk situations such as live work and confined spaces.",
      "Required only when the customer requests it or when the firm wants a trainee to gain experience — it is a commercial / training decision, not a safety one. The second-person requirement is a safety control driven by HSE guidance and the RAMS, not a customer preference or a training convenience.",
      "Required for live work above 50 V AC where the operative can't self-rescue (confined space, height, remote lone working), for systems where a single fault could be fatal (HV, large industrial 3-phase), or where the firm's H&S policy specifies it. The accompanying person observes, challenges, raises the alarm and assists with isolation or rescue, and must themselves be competent.",
    ],
    correctIndex: 3,
    explanation:
      "The 'second person' requirement comes from HSE HSG85 'Electricity at work — safe working practices' and from the firm's own RAMS. Two-person working is the default for higher-risk tasks because the single point of failure (the working operative) is supplemented by the observer. For an L3 apprentice, working alone on live equipment is normally OUTSIDE the scope of supervised competence — the apprentice IS the second-person on a senior's work, not the lead operative on their own.",
  },
  {
    id: 'mod4-s1-sub4-checklist',
    question:
      "What's the everyday 'pre-work precaution checklist' an L3 apprentice should mentally run through at every fault diagnosis job, before opening any enclosure?",
    options: [
      "Six items: RAMS read and signed; permit signed where commercial/industrial; isolation plan with lock-off to hand; instruments calibrated and proving unit functional; PPE for the voltage and environment; comms with supervisor and lone-working check-in. If any item is missing, STOP and escalate before starting work.",
      "Just two things matter before opening an enclosure: prove the circuit dead and put your gloves on. Everything else (RAMS, permits, comms) is office paperwork that doesn't change what you do on the tools. The pre-work checklist is exactly the discipline that catches missing RAMS, an out-of-date tester or no lone-working cover before they cause harm; reducing it to 'prove dead and gloves on' is how incidents happen.",
      "Run a full Schedule of Test Results on every circuit in the property first, so you have a complete baseline before opening anything. Baseline-testing the whole installation is neither required nor practical before every fault job; the pre-work checklist is a quick safety run-through (RAMS, permit, isolation, instruments, PPE, comms), not a full periodic test.",
      "Photograph the consumer unit and post it to the firm's group chat so the supervisor can confirm it's safe to proceed before you touch anything. Remote photo approval is no substitute for the operative's own pre-work checks; the checklist is a personal safety routine the apprentice runs on site, supported by phone comms, not replaced by a photo.",
    ],
    correctIndex: 0,
    explanation:
      "The pre-work checklist is what professional pilots, surgeons, divers and competent electricians all use — a structured run-through that catches the easy-to-forget item before it kills you. The six-item L3 version (RAMS, permit, isolation plan, instruments, PPE, comms) covers the failure modes that show up in HSE prosecution reports. Most firms will have a printed or laminated version that lives in the toolbag; some have an app version (Field Service Lightning, simPRO) with a tick-box. The point is the discipline of running through it every time.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the difference between 'safe system of work' and 'safe place of work' under HSWA, and why do both matter for fault diagnosis?",
    options: [
      "They mean the same thing — 'safe system of work' and 'safe place of work' are two names for the firm's written RAMS document, and the distinction is just terminology. They are distinct concepts: the safe system is the procedure and controls that make the task safe, while the safe place is the physical environment; conflating them misses that a perfect method statement can't make an unsafe cellar or loft safe.",
      "Safe system of work is the procedure, controls and competencies that make the TASK safe (RAMS, isolation, PPE, supervision). Safe place of work is the physical environment being suitable (access, lighting, space, ventilation, escape routes). HSWA Section 2 requires the employer to provide both, and for fault diagnosis the on-site operative judges whether the place is safe.",
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
      "EAWR 1989 Reg 4 requires electrical systems to be 'so constructed and so maintained as to prevent danger'. What's the L3 fault-diagnosis interpretation?",
    options: [
      "Reg 4 applies only at the design and installation stage; once a system is energised and handed over, the duty falls away and any later faults are the duty-holder's problem under different legislation. Reg 4 applies continuously — at installation, in service, during fault and after repair — not just at design and install.",
      "Reg 4 means you must always work the circuit live so you can confirm it is functioning before declaring it safe; dead testing alone can't prove a system prevents danger. Reg 4 does not require live working; safe diagnosis is normally done dead, and the duty is about the system's condition, not about energising it to test.",
      "Assess the system's 'as-found' safety before starting (CU, supply, bonding, damage); record any departures and don't make them worse; leave the corrected system satisfying Reg 4 (no worse than found); and escalate any defect you can't safely fix for further work or advisory documentation.",
      "Reg 4 only obliges you to fix the specific fault you were called to; pre-existing defects you notice elsewhere are outside its scope and can be left for a future EICR. The 'as-found' assessment under Reg 4 means you must not leave the system in a worse state and must act on dangerous defects you find, not ignore them as out of scope.",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 4 is the umbrella duty under EAWR and it applies continuously — at installation, in service, during fault, after repair. For fault diagnosis it bites at three points: the as-found assessment (does the system you're about to work on satisfy Reg 4 right now?), the work-in-progress state (don't make it less safe), and the post-repair state (your repair must satisfy Reg 4). The 2391 / 2394 inspection-and-test qualifications go deeper into how to assess Reg 4 compliance; L3 introduces the framework.",
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
      "When a fault investigation requires you to work at height (loft, ceiling void, equipment platform), what additional precautions apply on top of the electrical-safety procedure?",
    options: [
      "The Work at Height Regulations 2005 apply alongside EAWR. Assess the height work specifically (fall distance, platform type, duration); use a ladder only for short access and a platform for longer work; secure the ladder (1:4, anti-slip, three points of contact); secure tools against dropping; board out loft working areas and never stand on plasterboard; and observe the lone-working restriction.",
      "No additional precautions — the electrical-isolation procedure already covers everything, and a loft or platform is just another work location once the circuit is dead. Working at height introduces a separate, often greater, fall hazard that the Work at Height Regulations 2005 require to be assessed and controlled in addition to electrical safety.",
      "Only a harness and fall-arrest lanyard are needed; clip on at any height above floor level and the fall risk is dealt with. Fall-arrest is a last resort under the WaHR hierarchy, not the first control; the priority is to avoid the height risk or use a stable platform, and a harness alone doesn't address ladder footing, plasterboard or dropped tools.",
      "Just put down dust sheets and warn the customer the work is overhead — domestic loft work is low-risk and doesn't engage the Work at Height Regulations. The WaHR 2005 apply to any work where a person could fall a distance liable to cause injury, including domestic lofts; dust sheets and a verbal warning don't satisfy the duty.",
    ],
    correctAnswer: 0,
    explanation:
      "Falls from height kill more electricians than electric shock. The Work at Height Regulations 2005 reverse the old hierarchy — avoid working at height where possible, use a platform if you must, fall-arrest only as a last resort. For fault diagnosis in lofts and ceiling voids, the practical L3 approach is — board the access, use a torch-assistant if possible, restrict tool weight, never stand on plasterboard, document the risk in the RAMS addendum. CDM 2015 Reg 8 expects the contractor to plan for these.",
  },
  {
    id: 5,
    question:
      "What's the 'three-step' check that confirms an instrument is safe to use BEFORE you trust its readings?",
    options: [
      "Two steps: switch it on to confirm the screen lights up, and check the battery icon is full. If both pass, the instrument is good to use. Power-on and a battery icon don't confirm the leads are sound, the calibration is in date or that it reads correctly on a known source; the three-step visual / calibration / function check is needed.",
      "Visual (case, leads and probe finger-barriers undamaged, no burns), calibration (label in date, certificate available), and function (proves on a known live source and a known dead source, healthy battery, clean selector). Any failure on any step and the instrument is not used until rectified.",
      "Three steps: send the instrument for calibration, store it in its case, and record the serial number in the asset register. These are good asset-management habits but they happen in the workshop, not at the point of use; the pre-use check the operative performs on site is visual, calibration-date and function (prove-dead/prove-live).",
      "Three steps: compare its reading against a second instrument, average the two results, and use that average as the true value. Cross-checking against a second meter is a useful sanity check but is not the standard pre-use safety routine; you confirm the instrument is fit to trust by checking its condition, calibration date and proving function first.",
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
      "Leave the panel in FAULT and tell the customer it will sort itself out overnight once the batteries recharge — fire panels self-clear. A fire panel in FAULT means the life-safety system is compromised and will not silently fix itself; the responsible person must be informed and the cause investigated and rectified.",
      "Disconnect the fire alarm panel from its mains and battery so the fault light goes out, then complete your other work and hand the building back. Powering down a fire alarm leaves the building with no fire detection and is unacceptable; the correct response is to diagnose, rectify, restore and document, with the responsible person informed.",
      "Read the panel to tell a system fault (clears on reset) from a circuit fault (suggests your work caused damage). Reset and document a system fault; for a circuit fault STOP, re-isolate, retest and rectify. The building's fire safety was compromised while in fault, so the RR(FS)O responsible person should have been told beforehand with a fire watch in place — record the fault period in the log and inform the alarm-receiving centre.",
    ],
    correctAnswer: 3,
    explanation:
      "Fire alarm work is governed by BS 5839-1 (commercial) or BS 5839-6 (domestic) PLUS the Regulatory Reform (Fire Safety) Order 2005 PLUS BS 7671. The L3 apprentice doesn't normally lead fire-alarm work but does need to know the safe-working implications of any fault-diagnosis task that affects fire-alarm circuits — pre-work briefing, fire watch during isolation, post-work verification, log book entry. Botching this is a regulatory issue with the local fire authority, not just a customer-service issue.",
  },
  {
    id: 8,
    question:
      "What's the disposal-and-housekeeping requirement under safe-working principles, and why does it matter for fault diagnosis specifically?",
    options: [
      "Make safe (temporary leads, exposed conductors and removed accessories terminated, capped or isolated before leaving); tidy (area returned to pre-work state, debris disposed of correctly, hazardous items routed properly); and document what was found, done and disposed of. Compromised-but-normal-looking parts must be made obviously safe so no-one re-energises them.",
      "Housekeeping just means sweeping up so the customer is happy with the look of the job; it has no safety dimension and matters only for customer relations. Tidying after fault work is a genuine safety duty — debris hides hazards and damaged parts left lying can be re-energised — not merely a cosmetic courtesy.",
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
    question: "How rigid should I be about following safe-working procedures when the customer is impatient?",
    answer:
      "Completely rigid. The procedures exist because they prevent the failure modes that have killed and injured electricians. Customer impatience doesn't reduce the failure rate; it just creates pressure to skip steps. The professional response is — explain calmly that the procedure takes a fixed amount of time and skipping it isn't an option, the work will be completed within the quoted timescale, and the customer is welcome to wait inside while you work. Firms that pressure operatives to bypass procedure are the firms whose insurance excludes injury claims for procedural breach. The customer can wait 90 seconds for the safe-isolation procedure; you don't have a 90-second alternative if you take a fatal shock.",
  },
  {
    question: "What's the difference between an 'authorised person', a 'competent person' and a 'skilled person' in HSE language?",
    answer:
      "Three distinct concepts. AUTHORISED PERSON — appointed in writing by the duty-holder for a specific role (e.g. authorised to issue permits-to-work, to verify isolation, to approve live working). COMPETENT PERSON — has the knowledge, training, experience and behaviours to carry out a task safely (the EAWR Reg 16 concept). SKILLED PERSON — used in BS 7671 to mean someone with the technical knowledge or experience to avoid dangers; aligns broadly with 'competent' but specifically in electrical-installation context. An L3 apprentice is moving toward COMPETENT (under supervision) for some fault tasks, is becoming SKILLED in BS 7671 terms, and is unlikely to be AUTHORISED until improver level.",
  },
  {
    question: "Do I need to wear high-vis on a domestic fault job?",
    answer:
      "On the public road outside the property — yes (PPE Regs 1992 + risk assessment for traffic). Inside the property — depends on the firm's policy. Some firms make high-vis mandatory on all jobs as a discipline; others only require it when there's vehicle activity or the customer site requires it (commercial sites usually do). The L3 apprentice's default — wear what your firm's PPE matrix says, plus what the site-specific RAMS adds. A high-vis vest is £8 and lives in the van; better to wear it unnecessarily than not have it when you need it.",
  },
  {
    question: "If I find a fault that's outside the scope of the original call-out, what's my safe-working duty?",
    answer:
      "Three duties. (1) Make safe immediately if you can do so within your competence — isolate, label, document. (2) Inform the customer in writing — what you found, what action you took, what further work is needed and at what cost. (3) Inform your supervisor and update the job sheet. You do NOT do the additional work without customer authorisation (commercial issue) AND your supervisor's agreement (competence / scope issue). The exception is if the additional fault is an immediate danger to life — then your duty under HSWA s.7 to take reasonable care of others requires you to act, document, and communicate after the fact.",
  },
  {
    question: "Are there any precautions specific to elderly or vulnerable customers I should consider?",
    answer:
      "Yes. (1) Loss of supply has heavier impact — electric heating is essential, stairlifts may stop, oxygen concentrators may run on battery only briefly. Brief the customer before isolation; coordinate with carers if needed; offer alternative heating during the work. (2) Communication — confirm understanding of any safety briefing; some elderly customers are too polite to say they don't follow. (3) Trust — vulnerable customers are targets for cowboy traders; show your ID, your firm's accreditation, and offer the customer the chance to call your office to verify. (4) Time pressure — rushing a job to suit the customer's routine is not a reason to skip safety procedure. The Care Act 2014 doesn't apply directly but the spirit of safeguarding vulnerable adults applies to every visit.",
  },
  {
    question: "What's the most-overlooked safe-working precaution on routine fault jobs?",
    answer:
      "The pre-work briefing of the customer / occupants on what's about to happen. Apprentices arrive, isolate, work, restore — without telling the customer that the lights are about to go out, that the freezer will be off for an hour, that the fire alarm will go into fault, that the heating will stop. The result is customer confusion, calls to the office, and occasionally a customer who walks into a darkened stairwell. Two minutes of explanation at the start of the job — what will happen, when, for how long, and what the customer should do — prevents 90% of the customer-side issues that follow.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 4"
            title="Safe working procedures for fault diagnosis"
            description="The everyday precaution rulebook for live and dead fault work — barriers and signage, work-area control, witnessing for live work, energy-source verification, the six-item pre-work checklist that becomes muscle memory, and what to do when you find a dangerous condition outside the scope of your original call-out."
            tone="emerald"
          />

          <TLDR
            points={[
              "Safe working procedures = barriers + signage + work-area control + appropriate witnessing + verified instruments + the pre-work checklist. All six together.",
              "Finding a Code 1 defect outside the scope of your call-out triggers a duty to act — make safe, document, inform customer in writing, escalate to supervisor.",
              "Apprentice-as-cover-holder for a senior's live work is unsafe — the senior's RA doesn't include the apprentice as a participant. Decline politely, escalate.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Specify the safe working procedures for fault diagnosis — barriers, signage, work-area control, witnessing.",
              "Apply the six-item pre-work precaution checklist (RAMS, permit, isolation plan, instruments, PPE, comms) at every job.",
              "Determine when a second competent person (witness, observer) is required and what their role is.",
              "Apply the visual / calibration / function three-step instrument check before trusting any reading.",
              "Recognise and act on dangerous defects discovered outside the scope of the original call-out.",
              "Apply the Work at Height Regulations 2005 alongside electrical-safety procedure for loft and ceiling-void fault work.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The pre-work precaution checklist</ContentEyebrow>

          <ConceptBlock
            title="Six items, every job, no exceptions"
            plainEnglish="The pre-work checklist is what professional pilots, surgeons, divers and competent electricians all use — a structured run-through that catches the easy-to-forget item before it kills you. The L3 version is six items, takes 30 seconds, and protects you from every common cause of post-incident regret."
            onSite="Most firms have a printed or laminated checklist that lives in the toolbag, or an app version (simPRO, Joblogic, BigChange) with a digital tick-box. The point is the discipline of running through it every time, not the medium it's recorded in."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. RAMS</strong> — read, signed, fault-specific addendum present and current.</li>
              <li><strong>2. Permit</strong> — if commercial / industrial, signed by the authorised manager, scope matches the planned work.</li>
              <li><strong>3. Isolation plan</strong> — primary isolation point identified, lock-off device to hand, multi-source check completed.</li>
              <li><strong>4. Instruments</strong> — GS38 two-pole tester calibration in date, MFT calibration in date, batteries fresh, proving unit functional, leads inspected.</li>
              <li><strong>5. PPE</strong> — appropriate to voltage and environment, available and worn.</li>
              <li><strong>6. Comms</strong> — supervisor available by phone, lone-working check-in scheduled if alone, customer briefing complete.</li>
            </ul>
            <p>
              If any item is missing — STOP, escalate, don't start work.
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

          <ContentEyebrow>Work-area control — barriers, signage, briefing</ContentEyebrow>

          <ConceptBlock
            title="Physical separation between the work and the bystanders"
            onSite="A reception, a corridor, a stockroom, a domestic kitchen with kids running through — every fault-diagnosis location has bystanders, and EAWR Reg 14(c) requires \'suitable precautions' to keep them safe. Verbal warnings alone don't satisfy it; physical separation does."
          >
            <p>
              The standard work-area control:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Physical barrier</strong> — Skipper barrier, telescopic post barrier, hi-vis tape with stanchions, A-frame signs at access points. 2 m clearance from any exposed conductor is the working figure.</li>
              <li><strong>Signage</strong> — BS EN ISO 7010 W012 (warning — electricity), prohibition sign at access point, \'NO UNAUTHORISED ACCESS', firm name and operative contact.</li>
              <li><strong>Briefing</strong> — verbal briefing to anyone in the area before opening the enclosure; named responsible person on site who's aware of the work and will challenge breaches.</li>
              <li><strong>Comms</strong> — phone available to call the office or emergency services from the work area; not in a different room.</li>
              <li><strong>Lighting</strong> — adequate lighting (LED work-light if the room lighting is the affected circuit); torch as backup.</li>
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
            title="The \'two-up' principle for higher-risk work"
            plainEnglish="Working alone is acceptable for low-risk dead-circuit fault diagnosis. Working alone on live equipment, in confined spaces, at height, in remote locations, or on systems where a single fault could be fatal — is not. The accompanying person\'s role is not to do the work, but to observe, challenge, raise the alarm and assist with rescue."
          >
            <p>
              Second-person required when:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Live working is planned at any voltage above 50 V AC where the operative can\'t safely self-rescue.</li>
              <li>Work is on a system where a single fault could cause death (HV, large industrial 3-phase).</li>
              <li>Work is in a confined space (cellar, void, plant room with single access).</li>
              <li>Work is at height where a fall would prevent self-rescue.</li>
              <li>Work is in a remote location with no immediate help available.</li>
              <li>The firm\'s H&S policy specifies it for the task type.</li>
            </ul>
            <p>
              The second person must themselves be competent — typically an Approved Electrician or higher — and must not be doing other work that prevents observation. An apprentice can be the second person to a senior; an apprentice should not BE the lead operative on a job that requires a second person.
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
            onSite="An instrument that gives a wrong reading is more dangerous than no instrument at all — it gives you false confidence. The three-step check takes 60 seconds per instrument and is non-negotiable. PUWER 1998 Reg 5 puts the duty on the employer; the operative\'s pre-use inspection is how it\'s discharged."
          >
            <p>
              The three-step:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Visual</strong> — case undamaged, leads not nicked or crushed, probes have intact finger barriers, no visible burn marks or melted plastic, screen clean and legible.</li>
              <li><strong>Calibration</strong> — calibration label in date (annual for MFT, two-yearly for two-pole testers, manufacturer\'s interval for multimeters); calibration certificate available.</li>
              <li><strong>Function</strong> — proves on a known live source AND on a known dead source; battery indication healthy; selector switch operates cleanly; self-test (if fitted) passes.</li>
            </ul>
            <p>
              Standard kit and typical calibration intervals:
            </p>
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
                "Periodic inspection and testing shall not cause danger to persons or livestock and shall not cause damage to property or equipment even if the circuit is defective. Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no less a degree of performance and safety."
              </>
            }
            meaning={
              <>
                Reg 651.3 lifts the same duty into the testing space &mdash; instruments must be chosen against BS EN 61557 (the standard your Megger MFT1741+ or Kewtech KT64 is built to). It also makes the &ldquo;equivalent or better&rdquo; rule explicit: if you&apos;re using anything that isn&apos;t specifically BS EN 61557 marked, the burden is on you to demonstrate equivalence. That&apos;s why budget eBay testers don&apos;t belong on a fault-diagnosis job.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.3, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.4"
            clause={
              <>
                "Precautions shall be taken to avoid danger to persons and livestock, and to avoid damage to property and installed equipment, during inspection and testing."
              </>
            }
            meaning={
              <>
                The pre-work checklist, the barriers, the signage, the witnessing rule and the instrument verification routine all sit underneath this single Regulation. The duty is twofold &mdash; protect people AND protect equipment. Skipping the equipment-side precaution (e.g. running a 500&nbsp;V IR test through a connected LED driver) breaches 641.4 just as cleanly as skipping the people-side one.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.4, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.1"
            clause={
              <>
                "Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
              </>
            }
            meaning={
              <>
                The order is fixed: look first, test second, and the look is normally done dead. On a fault-diagnosis visit that means a structured visual inspection of the CU, the cabling, the accessory and the supply arrangement before you put a tester on it. Most diagnostic dead-ends are caused by skipping this step and going straight to a meter.
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
                Apprentice is at a domestic property to investigate a faulty kitchen socket.
                During the work they notice the loft junction box has a disconnected CPC. They
                think &quot;not my job, here for the kitchen&quot; and ignore it. They complete
                the kitchen work, leave, send the invoice. Two months later the customer\'s child
                touches a metal bedside lamp and takes a 230&nbsp;V shock through the lifted CPC.
                The HSE investigation finds the apprentice\'s job sheet recorded the loft
                inspection; the customer\'s solicitor argues the apprentice had a duty to act on
                what they saw. The firm\'s professional indemnity insurer refuses cover (failure
                to act on known defect). The apprentice is named in the prosecution alongside the
                firm.
              </>
            }
            doInstead={
              <>
                Code 1 defects discovered during ANY visit trigger a duty to make safe AND inform
                the customer in writing AND escalate to the supervisor. The minimum action is to
                isolate the affected circuit and label &quot;OUT OF SERVICE &mdash; DO NOT
                RE-ENERGISE&mdash;CPC FAULT&quot;, then document on the job sheet and on a
                Dangerous Condition Notification form to the customer. Most firms have a DCN
                template. The customer can choose whether to authorise the additional work; what
                they can\'t do is have you withhold the warning.
              </>
            }
          />

          <CommonMistake
            title="Trusting an instrument because it\'s the firm\'s only one"
            whatHappens={
              <>
                Apprentice arrives at a job with the firm\'s MFT &mdash; calibration sticker is two
                months out of date. They use it anyway because there\'s no spare and the job is
                booked. Insulation resistance reading shows 200&nbsp;M&Omega; on a circuit
                that&apos;s actually got a wet fault giving 0.3&nbsp;M&Omega; (the MFT\'s IR
                circuit has drifted out of spec). Apprentice signs the circuit off as compliant
                and leaves. Two weeks later the wet fault grows, the customer\'s RCD trips
                repeatedly, the firm gets called back. The customer\'s complaint says they paid for
                a fault investigation that didn\'t find the fault &mdash; refund + remedial costs.
                Insurance excludes claim because the instrument was out of calibration at the time
                of test.
              </>
            }
            doInstead={
              <>
                An instrument with expired calibration is not a usable instrument. The job is
                rebooked when a calibrated instrument is available, OR a different instrument is
                obtained (rental, borrow from another office). The cost of one rescheduled job is
                trivial compared to the cost of an uncalibrated reading that misses a real fault.
                Most firms have a \'no calibration, no work' rule and will pay for emergency
                calibration / instrument hire to avoid a re-visit.
              </>
            }
          />

          <Scenario
            title="Reception-area DB fault investigation during business hours"
            situation={
              <>
                You\'re at a small accountancy firm to investigate a recurring nuisance trip on the
                upstairs office RCBO. The DB is in the reception area, behind the receptionist\'s
                desk. The reception is in normal use during the work &mdash; deliveries, clients,
                staff. The receptionist asks how long the work will take and whether they can
                stay at their desk.
              </>
            }
            whatToDo={
              <>
                (1) Brief the receptionist on the four-category impact &mdash; affected circuit
                will be off, your work area extends 2&nbsp;m around the open DB, no-one should
                cross the barrier without speaking to you. (2) Set up barrier (Skipper or A-frame)
                at 2&nbsp;m radius around the DB; place &quot;DANGER &mdash; ELECTRICAL WORK&quot;
                signage at all approaches. (3) Brief the office manager (the named responsible
                person) who agrees to keep clients clear of reception during the work. (4) Tell
                the receptionist they CAN stay at their desk if it\'s outside the barrier; if
                they\'re inside the barrier they need to relocate. (5) Apply isolation, lock-off,
                prove dead, work. (6) Throughout the work, periodically check the barrier hasn\'t
                been moved by deliveries or clients walking past. (7) On completion, retest, restore
                supply, remove barrier, document. Brief the office manager that work is complete.
              </>
            }
            whyItMatters={
              <>
                Real-world fault diagnosis is rarely in a quiet empty room. Public-area work
                requires deliberate work-area control AND deliberate communication with the
                people who share the space. The HSE investigates incidents where a bystander
                contacts live equipment in a busy area &mdash; the firm\'s defence is &quot;we had
                barriers and briefed the responsible person&quot;, not &quot;we put a sign
                up&quot;. The discipline of physical separation + named responsible person +
                documented briefing is what makes the work defensible.
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
              <li><strong>Competent witness</strong> — must understand the work, be physically capable of operating the isolation, know first aid (HSE-approved 1-day or 3-day course), have access to a phone with signal.</li>
              <li><strong>Position</strong> — within arm's reach of the isolation point; clear line of sight to the operative; not in the arc-flash boundary.</li>
              <li><strong>Briefing</strong> — explicit verbal briefing on what to do if the operative is shocked, including isolation, emergency call, CPR / AED.</li>
              <li><strong>Lone live work</strong> — never acceptable above 50 V AC. If the firm sends an operative to do live work alone, that's an EAWR Reg 14(c) breach (suitable precautions not taken).</li>
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
              <li><strong>Final touch-test</strong> — at the moment of first contact, touch L-N, L-E and N-E with the two-pole. Less than a second per pair. Re-prove on the known live source after.</li>
              <li><strong>Insulated-glove back-of-hand</strong> — for inaccessible conductors, the back-of-hand contact through Class 0 1000 V AC gloves provides a residual safety margin (if there's voltage, your muscles spasm AWAY rather than gripping).</li>
              <li><strong>Re-test after breaks</strong> — after lunch, after any interruption, after any other operative has been near the DB — re-prove dead before resuming work.</li>
              <li><strong>Suspicious readings</strong> — any unexpected reading (e.g. 30 V appearing on what should be dead) STOPS the work immediately. Investigate the source before continuing.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The precaution checklist — pre-work mental model</ContentEyebrow>

          <ConceptBlock
            title="The pre-work mental model — the eight things you check before starting"
            plainEnglish="Experienced fault investigators run an eight-item mental checklist before opening any enclosure. The checklist takes 60 seconds and catches the conditions that turn a routine job into an incident."
            onSite="Recite the checklist out loud on your first jobs — it builds the habit faster. After 50-100 fault investigations the checklist becomes automatic and the recitation isn't needed. The L3 apprentice is at the stage where conscious application is still appropriate."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Supply identification</strong> — TN-S / TN-C-S / TT / IT / PNB confirmed.</li>
              <li><strong>2. Multi-source check</strong> — PV, battery, EV, generator identified and isolated where in scope.</li>
              <li><strong>3. RAMS reviewed</strong> — task RAMS read, addendum updated for actual conditions, EAWR Reg 14 live-work justification documented if applicable.</li>
              <li><strong>4. PPE on</strong> — Class 0 gloves, arc-rated top, safety glasses, insulated tools (Wera VDE, Knipex VDE).</li>
              <li><strong>5. Instruments verified</strong> — calibration date in date, daily prove-test passed, leads inspected.</li>
              <li><strong>6. Witness present</strong> — for live work above 50 V AC, witness briefed and positioned.</li>
              <li><strong>7. Barrier and signage</strong> — work area defined, public access controlled.</li>
              <li><strong>8. Emergency response</strong> — isolation point known, first-aid kit / AED location known, emergency contact ready.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Decision points and stop-work triggers</ContentEyebrow>

          <ConceptBlock
            title="Knowing when to stop and call the supervisor"
            plainEnglish="Fault diagnosis is hypothesis-driven. As tests progress, the hypothesis is either confirmed or revised. Some test results trigger an immediate STOP — these are the conditions where the L3 apprentice escalates rather than pushes on."
            onSite="The stop-work trigger list is short but absolute. The HSE prosecution archive is full of cases where an apprentice or improver pushed through a stop-work condition and was killed. Knowing where your authority ends is the L3 competence test in EAWR Reg 16."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Open PEN suspected</strong> — N-E voltage at cut-out above 30 V on TN-C-S = STOP, DNO call, never an apprentice fix.</li>
              <li><strong>Supply-side fault</strong> — anything upstream of the cut-out is the DNO's domain. Apprentice does not investigate or repair.</li>
              <li><strong>Compromised CU enclosure</strong> — water ingress, signs of arcing, melted plastic, exposed busbar with no cover available — STOP, full installation isolation, then assess.</li>
              <li><strong>Unexpected reading</strong> — voltage where you expected zero, current where you expected nothing, Zs above protection limit — STOP, re-think the hypothesis, escalate if you can't explain.</li>
              <li><strong>Out-of-scope discovery</strong> — finding 3-phase equipment when you were briefed for single-phase, finding ATEX zoning that wasn't on the brief, finding a working environment that doesn't meet EAWR Reg 15 (space, access, light) — STOP, escalate, update RAMS.</li>
              <li><strong>Customer dispute</strong> — if the customer challenges the diagnosis or refuses safety advice, STOP, document, escalate to supervisor. Don't argue on site.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "The pre-work precaution checklist has six items: RAMS, permit, isolation plan, instruments, PPE, comms. Run through it every job, every time, no exceptions.",
              "Work-area control = physical barrier + signage + briefing of named responsible person. Verbal warnings alone don't satisfy EAWR Reg 14(c).",
              "Second person required for live working, confined space, work at height, remote locations, HV, large industrial 3-phase. Their role is observation and rescue, not work.",
              "Three-step instrument check: visual / calibration / function. Every instrument, every shift. Out-of-calibration instrument = unusable instrument.",
              "Code 1 defect found outside the call-out scope triggers a duty to make safe, inform customer in writing (Dangerous Condition Notification), escalate to supervisor.",
              "Work at Height Regulations 2005 apply alongside electrical-safety procedure for loft and ceiling-void fault work — risk assessment, secured access, no plasterboard standing.",
              "Apprentice-as-cover-holder for a senior's live work is unsafe — politely decline, suggest a prop, escalate to supervisor if pressed.",
              "Make-safe-and-tidy at job end protects the next operative and the customer. Temporary terminations capped, removed accessories returned, area documented.",
            ]}
          />

          <Quiz title="Safe working procedures — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 Safe isolation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                §2 Test instruments
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
