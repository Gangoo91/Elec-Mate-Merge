/**
 * Module 4 · Section 1 · Subsection 5 — Implications of isolation for self, others, customers and building systems
 * Maps to C&G 2365-03 / Unit 303 / LO1 / AC 1.3
 *   AC 1.3 — "specify safe working procedures that should be adopted for fault diagnosis and correction work"
 * Layered: 2357 Unit 608 ELTK07 / AC 1.2 — "describe the implications of carrying out (or not carrying out) safe isolation procedures upon self, other personnel, customer / client, public, building systems"
 * Also layers: 2357 ELTK07 / AC 1.4 (lone working, special precautions) and AC 4.1 (precautions before work).
 *
 * Frame: isolation isn't a switch flip — it's a planned event that has consequences for the people in
 * the building, the equipment in the building, the customer's business, and your own legal exposure if
 * you didn't think them through. This Sub builds the pre-isolation continuity-planning discipline that
 * separates an L3 fault diagnostician from an L2 installer.
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
  'Implications of isolation (1.5) | Level 3 Module 4.1.5 | Elec-Mate';
const DESCRIPTION =
  "Isolation has consequences — for you, for other operatives, for the customer's business, for the public, and for the building's life-safety, refrigeration, IT, fire alarm and emergency lighting systems. Walks the L3 pre-isolation continuity-planning discipline you need before flipping the main switch.";

const checks = [
  {
    id: 'mod4-s1-sub5-fridge',
    question:
      "You're called to a small Co-op convenience store at 09:30 on a Monday for an intermittent RCBO trip on the lighting circuit. To complete the safe-isolation procedure on the lighting RCBO you'd normally also pull the main switch on the Schneider DB to access the busbar. What's the implication you must think through first?",
    options: [
      "None — pull the main switch.",
      "Pulling the main switch drops the entire shop — including the chest freezers, the refrigerated display cabinets and the till system. A typical convenience store carries £2,000–£8,000 of stock at risk if the freezers warm above −18 °C for more than 30–60 minutes (the Food Standards Agency's safe-temperature window before stock has to be discarded). The till system holds the day's transactions in volatile memory if it's not on a UPS. The right L3 move is to isolate ONLY the affected RCBO at the device, not the whole DB; if you do need to drop the main switch, you book it in advance with the manager so they can prepare (move stock to a back-up freezer, run an end-of-shift on the till, switch to manual sales).",
      "Compensate the shop later.",
      "Just do it quickly.",
    ],
    correctIndex: 1,
    explanation:
      "The 2357 ELTK07 AC 1.2 outcome is exactly this — recognising that 'safe isolation' isn't only about your shock risk; it's about the consequence of dropping the supply on the customer's business, equipment and stock. An L3 apprentice who shuts a shop's freezers down without warning has caused a foreseeable £2k+ stock loss that's avoidable with one phone call. Plan the isolation to the smallest scope that's safe to work on, and warn the customer before you cut anything they care about.",
  },
  {
    id: 'mod4-s1-sub5-firealarm',
    question:
      "You're investigating a borrowed-neutral fault on a small commercial unit's lighting. The fire alarm panel is on a separate dedicated circuit but you're about to drop the lighting main to chase the neutral back through a JB. What's the L3 procedure for the fire alarm?",
    options: [
      "Ignore it — it's a separate circuit.",
      "Even though the alarm is on a separate circuit, BS 5839-1 (the fire alarm standard) requires the responsible person on site is informed before any work that might cause unwanted alarms or compromise alarm coverage — a dropped lighting circuit can cause a smoke detector to false-trigger from disturbed dust, and any work in a ceiling void where detectors live is prep work that needs the alarm putting into 'engineer test' or 'isolated' mode (with a fire watch in place, signed in/out at the panel). The customer's responsible person makes that call, not you. Isolating the alarm without authorisation puts the building outside its insurance cover and breaches the Regulatory Reform (Fire Safety) Order 2005.",
      "Pull the alarm circuit too.",
      "Cover the smokes with bin bags.",
    ],
    correctIndex: 1,
    explanation:
      "Fire alarm isolation is a managed event — the responsible person under the Regulatory Reform (Fire Safety) Order 2005 is the only one who can authorise it, a fire watch must be put in place to maintain life-safety cover, the panel goes to engineer test (logged), and the system is reinstated and re-tested before you leave site. Bin bags over smoke heads is an old-school short-cut that's NOT compliant with BS 5839-1 — the heads can be triggered by dust on removal of the bag, and any false alarm during the work is a chargeable fire-service callout. Always loop in the fire-alarm contractor or the building's responsible person.",
  },
  {
    id: 'mod4-s1-sub5-emergencylight',
    question:
      "Customer reports an intermittent trip on the cleaning cupboard's lighting circuit in a 4-storey commercial office. You isolate the lighting circuit at the floor's Hager DB. The emergency lighting on that floor is on the SAME circuit as the normal lighting (a common older installation). What's the implication?",
    options: [
      "None.",
      "Maintained 3-hour emergency light fittings (BS 5266) charge from the lighting circuit and will stay lit on internal battery for 3 hours after isolation — that's expected. BUT the BMS / fire panel may flag a 'lighting circuit fail' alarm to the building manager (which they need to know is your work, not a real fault), and after 3 hours you've drained the battery — a fresh discharge requires 24 hours to recharge fully. So if you isolate for 4+ hours and a real power cut hits the next morning, the floor has no emergency light. L3 thinking: scope the work to under 3 hours OR coordinate with the M&E manager so they know the floor's emergency-light cover is reduced for the recharge window.",
      "It's safer this way.",
      "Compensate the building.",
    ],
    correctIndex: 1,
    explanation:
      "Emergency-lighting batteries take ~24 hours to recharge after a full 3-hour discharge under BS 5266-1 / BS EN 50172. Isolating a lit-and-charging circuit for an extended period AND then leaving site is foreseeable as a life-safety risk — the next power cut leaves the route unlit. The L3 procedure is: scope the work duration; if it can't fit in 3 hours, coordinate with the building manager so they know the floor needs supplementary cover (torches at fire points, fire watch, etc.) and so they can record the reduced cover in the fire log book.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does the 2357 ELTK07 / AC 1.2 outcome mean by 'implications of safe isolation upon self, other personnel, customer / client, public and building systems'?",
    options: [
      "Just shock risk.",
      "Five distinct stakeholders to think about BEFORE you isolate. (1) SELF — your shock / arc / stored-energy risk drops once isolation is verified. (2) OTHER PERSONNEL — operatives elsewhere on the same building may be working on equipment your isolation feeds; if they've not been told, they walk into a circuit they thought was live and assumed dead in the wrong direction. (3) CUSTOMER / CLIENT — the business is operating; your isolation might drop their tills, servers, refrigeration, production line. (4) PUBLIC — escalators, lifts, automatic doors, traffic signals, ATMs all stop working when supply drops, which is a public-safety event in some buildings. (5) BUILDING SYSTEMS — fire alarm, emergency lighting, BMS, security, refrigeration, IT, HVAC are all dependent on supply continuity and have separate compliance frameworks (BS 5839, BS 5266, GDPR, the Fire Safety Order). The L3 apprentice considers ALL FIVE before flipping the switch.",
      "Only the customer.",
      "Only your own safety.",
    ],
    correctAnswer: 1,
    explanation:
      "The five-stakeholder framework is the L3 step-up from the L2 'safe isolation' lesson. At L2 you learned the JIB six-step (test the tester, isolate, lock-off, prove dead, test the tester again). At L3 you ALSO learn that the act of isolating has knock-on effects you have a duty to plan for. EAWR Reg 3 makes the 'duty-holder' obligation explicit — it includes you, the employer, the building occupier and any other person who has control of an electrical system or who can cause danger. Causing avoidable danger because you didn't tell the third-floor tenant their server was about to die is not a defence.",
  },
  {
    id: 2,
    question:
      "Why is it a problem for the L3 apprentice to isolate the main switch on a small business installation without warning the customer in advance?",
    options: [
      "It isn't.",
      "Three reasons stack up. (1) Foreseeable financial loss — refrigerated stock, in-flight tills, in-flight card payments, in-flight server transactions, in-flight CNC jobs in a workshop, all of which the customer has cause to claim against you if you didn't warn them. (2) Customer trust and repeat business — a contractor who 'just turns the power off' without a heads-up is the contractor the customer doesn't call back. (3) Competence under EAWR Reg 16 — part of competence is foreseeing the consequences of your actions; failing to plan the isolation is itself an EAWR Reg 16 issue, because a competent person would have foreseen and managed the impact.",
      "It's only a courtesy.",
      "Only on Sundays.",
    ],
    correctAnswer: 1,
    explanation:
      "EAWR Reg 16 'competence' isn't only about technical knowledge of the tester — it covers the whole job-planning skill. The HSE has prosecuted cases where an electrician dropped supply to a building without warning, equipment was lost, and the prosecution found the absence of a method statement / customer notification was itself a breach of the safe-system-of-work duty. Plan the isolation, scope it small, warn early, document the time window in writing on the job sheet.",
  },
  {
    id: 3,
    question:
      "BS 5839-1 (fire alarm code of practice) and BS 5266-1 (emergency lighting code of practice) — what's the L3 fault-diagnosis duty when your isolation will affect the alarm panel or the emergency lights?",
    options: [
      "No duty.",
      "Three layers. (1) The Regulatory Reform (Fire Safety) Order 2005 makes the 'responsible person' (usually the building owner or appointed M&E manager) the only person who can authorise putting the alarm panel into 'engineer test' or 'isolated' mode — you cannot do it on your own initiative. (2) BS 5839-1 requires a fire watch be in place during the isolation to maintain life-safety cover, and the work is logged in the fire log book. (3) BS 5266 / BS EN 50172 require emergency lights have a 3-hour duration AND a 24-hour recharge after a full discharge — if your isolation drains the lights, you've left the building outside its compliance for the recharge window, which is a separate notifiable event.",
      "Just isolate.",
      "Bin bags work.",
    ],
    correctAnswer: 1,
    explanation:
      "Fire alarm and emergency lighting are LIFE-SAFETY systems with their own British Standards and their own legal framework. The L3 apprentice does not interfere with them on their own authority — the responsible person under the Fire Safety Order authorises any isolation, and the work is documented in the fire log book. Compromising life-safety systems without authorisation is a separate criminal offence under the Fire Safety Order, distinct from any electrical breach.",
  },
  {
    id: 4,
    question:
      "You're investigating a fault on a sub-main feeding a comms cabinet that contains the building's network switch and a Synology NAS. What's the IT-isolation discipline?",
    options: [
      "Just kill the supply.",
      "Three steps. (1) Notify the IT manager / customer in advance — they need to do a controlled shutdown of any servers, NAS units, switches, telephone systems and CCTV recorders that depend on the supply. Pulling the plug on a NAS mid-write corrupts the file system; pulling on a server can corrupt the database. (2) Wait for the IT side to confirm 'safe to power off' before you isolate — typically 5–15 minutes for a small server / NAS, longer for a domain controller or VM host. (3) After the fault work, restore power and let the IT side bring the systems back up in dependency order (switches → routers → servers → user devices); don't expect everything to 'just come back'. The L3 apprentice respects the IT system as a managed asset, not just a load.",
      "Compensate later.",
      "Wait for sundown.",
    ],
    correctAnswer: 1,
    explanation:
      "IT systems have their own shutdown order and recovery order. A network switch or NAS that loses supply mid-write can corrupt its file system and require hours of recovery. The L3 procedure mirrors the planned-maintenance protocol — notify, wait for controlled shutdown, isolate, work, restore, let IT bring up. Doing it any other way is foreseeable damage to customer property and a breach of the EAWR Reg 16 'competence' duty.",
  },
  {
    id: 5,
    question:
      "A loss of supply to a tenanted commercial building can affect the public — name three building-system categories where this matters.",
    options: [
      "It can't affect the public.",
      "(1) Lifts — passengers can be trapped between floors when a lift loses supply mid-travel; modern lifts have an auto-rescue battery that returns to the nearest floor before opening, but you cannot assume; the lift contractor is informed and the lift is taken out of service before isolation. (2) Automatic doors and disabled-access — wheelchair users cannot exit a building whose powered doors fail; the building manager needs to staff the doors during the isolation. (3) Fire escape lighting + fire alarm + sprinkler pumps — public escape routes lose their indicated path and any fire detection during the isolation; this is a Fire Safety Order issue and the responsible person plans the cover. Other categories: ATMs, CCTV (insurance / security), public Wi-Fi (less critical), traffic signals on adjacent works (rare but possible).",
      "Only at night.",
      "Only on weekends.",
    ],
    correctAnswer: 1,
    explanation:
      "The public-safety category is what separates a domestic isolation from a commercial isolation in terms of impact. The L3 apprentice working on a commercial building plans for trapped lift passengers, blocked accessible exits, lost fire-detection cover and lost CCTV evidence — and books the building manager to coordinate the human cover (lift staffed-rescue, door watchers, fire watch). Skipping this is a public-safety failing the HSE and the local authority will both take an interest in.",
  },
  {
    id: 6,
    question:
      "What's the implication of NOT isolating — i.e. choosing to investigate live to avoid the disruption?",
    options: [
      "It's always fine.",
      "Live working is permitted under EAWR Reg 14 only when (a) it's unreasonable for the conductor to be dead, (b) it's reasonable for work to be carried out live, and (c) suitable precautions are taken — ALL three. Choosing live work to avoid customer inconvenience does NOT pass test (a) — convenience isn't 'unreasonable for the conductor to be dead'. The L3 apprentice doesn't get to make that trade-off; the firm's risk assessment makes it, with documented justification, and the supervisor authorises it. The 'I'll just do it live, the customer doesn't want the power off' is the exact failure mode the HSE prosecutes after the inevitable shock.",
      "Always isolate.",
      "Customer preference rules.",
    ],
    correctAnswer: 1,
    explanation:
      "EAWR Reg 14 is strict liability — all three tests must be passed, and the test for (a) is OBJECTIVE (would a reasonable employer say it's unreasonable for the conductor to be dead?), not subjective (the customer doesn't want the power off). Live working to avoid disruption fails (a) and is a Reg 14 breach. The right L3 move is to plan the isolation to the smallest scope, warn the customer, schedule the disruption, and isolate properly — not to bypass the rules to please the customer.",
  },
  {
    id: 7,
    question:
      "Lone-working implications when isolating a fault on a small commercial site outside normal hours — what does the L3 apprentice need in place?",
    options: [
      "Just go.",
      "Five lone-working controls before you start. (1) Documented lone-working policy from your employer authorising you to be on site alone for this category of work. (2) Buddy / check-in system — typically a phone call or text to the office every 30–60 minutes; failure to check in triggers an escalation. (3) First-aider known to be reachable, or HSE first-aid arrangements appropriate to the site (lone-worker apps with man-down detection are increasingly standard). (4) Rescue / extraction plan — if you suffered a shock, who knows where you are and who has the keys / access? (5) Authority limits — solo unsupervised diagnosis on a live installation is JIB Approved Electrician work, NOT apprentice work; an L3 apprentice should not be alone on a fault job that involves any live testing without explicit supervision arrangement.",
      "Just take a phone.",
      "Lock the door.",
    ],
    correctAnswer: 1,
    explanation:
      "Lone working on fault diagnosis is a layered competence issue — EAWR Reg 16 (the work matches your competence), HSWA Section 2 (the employer has organised a safe system of work for the lone worker), and the firm's lone-working policy. An L3 apprentice doing live diagnosis alone, out of hours, without supervision, with no check-in regime, is multiple breaches stacked together. Lone working is acceptable for non-live diagnosis (e.g. dead-circuit IR testing, visual inspection) within a documented framework — it is not acceptable for live investigation.",
  },
  {
    id: 8,
    question:
      "What's the right way to communicate the isolation event to the customer in writing on the job sheet?",
    options: [
      "Don't bother.",
      "Five fields, on the sheet, signed and timed. (1) Time isolation started + circuits / equipment affected. (2) Verification that customer was informed and consented (with name of person you spoke to). (3) Any compensating measures the customer agreed to (e.g. 'fridge stock moved to back-up unit', 'fire watch in place', 'IT shutdown completed by site IT manager'). (4) Time supply restored + circuits / equipment re-energised. (5) Confirmation that protective devices reset, circuits tested live, customer's systems brought back up correctly. This becomes the EAWR Reg 4(2) / HSR25 maintenance record and your defence if the customer later claims damage you didn't cause.",
      "Just say 'isolated'.",
      "Email later.",
    ],
    correctAnswer: 1,
    explanation:
      "The job-sheet record IS the legal defence. EAWR Reg 4(2) and HSE HSR25 both recommend maintenance records be kept for the working life of the installation. A customer who later says 'you killed my server' has to prove it — and your contemporaneous record showing the IT manager signed off the controlled shutdown is decisive. Sloppy documentation is the gift to the claimant; clear documentation is your protection.",
  },
];

const faqs = [
  {
    question: "Isn't safe isolation just the JIB six-step? Why does this Sub add more?",
    answer:
      "The JIB six-step (test the tester, isolate, lock-off, prove dead at the work point, test the tester again, work on the now-confirmed-dead circuit) protects YOU from electric shock. That's the Level 2 lesson. The Level 3 lesson on top is: isolation has consequences for the customer's business, the public in the building, the life-safety systems and the equipment in the building — and you have a duty to plan and coordinate those consequences before you flip the switch. The six-step is necessary but not sufficient at L3.",
  },
  {
    question: "Why do refrigerated stock and till systems get singled out so often?",
    answer:
      "Because they're the two business-impact items most often forgotten, and because both have well-defined £ values you can cause loss against. The Food Standards Agency's safe-temperature window for chilled stock is 0–8 °C (any rise beyond ambient compounds quickly with shop lighting + customer fridge openings); for frozen stock it's −18 °C as the trigger for discard. Tills hold the day's takings in volatile memory and uncommitted card-payment confirmations on the till's local store — pulling the supply mid-transaction can void those transactions and require manual reconciliation. Both are foreseeable losses you've caused if you didn't warn.",
  },
  {
    question: "What if the customer says 'just turn it off, I don't care' — does that release me from the duty?",
    answer:
      "Partially — the customer can consent to disruption to their business (fridge stock, tills, IT) and that consent is your defence against THEIR claim against you. It does NOT release you from the life-safety duties (fire alarm, emergency lighting under the Regulatory Reform (Fire Safety) Order 2005 — those need the responsible person, not the customer at the till) and it does NOT release you from EAWR Reg 16 competence duty (you still have to be competent to plan and execute the isolation). Get the consent on the job sheet, signed and timed, then proceed.",
  },
  {
    question: "How do I 'plan' isolation scope to be minimal?",
    answer:
      "Three principles. (1) Isolate at the device, not the DB — if the fault is on one RCBO, isolate that RCBO (lock-off the breaker, prove dead at the work point), don't kill the whole DB. (2) Isolate at the DB, not the main switch — if you do need to access the busbar, isolate the DB only, leaving the rest of the supply alive. (3) Isolate at the main switch only when the work genuinely requires it (sub-main, tails, meter tails) — and then schedule the work to minimise disruption duration. The smaller the scope, the smaller the consequences, the easier the plan.",
  },
  {
    question: "Lifts and isolation — what's the procedure?",
    answer:
      "Lifts are a separate trade and a separate compliance regime (LOLER 1998 — Lifting Operations and Lifting Equipment Regulations, plus BS EN 81 series). The lift contractor is told in advance, the lift is parked at the ground floor with doors open and powered off at the lift isolator (NOT at the building's main switch — the lift has its own dedicated isolator at the motor room or shaft), a 'lift out of service' notice is posted, and the lift contractor is on site or contactable for the duration. You as the L3 apprentice do NOT isolate a lift on your own authority — the lift contractor or the building's responsible person does, and they confirm to you in writing it's safe before you proceed.",
  },
  {
    question: "Do I need to record the isolation time window on the certificate or the job sheet — and where does that live legally?",
    answer:
      "Job sheet / minor works / EICR observations — all three carry the record depending on the work. The legal anchor is EAWR Reg 4(2) (systems and equipment shall be maintained, and the records demonstrating that) and HSE HSR25 (recommends records kept for the working life of the installation). For a one-off fault visit, the job sheet is the primary record; for a periodic inspection where you isolated to test, the EICR observations / extent / limitations sections carry the record. Either way, the contemporaneous note (time start, scope, who consented, time end, what was tested live on restoration) is the document that protects you if anything is later disputed.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 5"
            title="Implications of isolation"
            description="Isolation isn't a switch flip — it's a planned event with consequences for you, other operatives, the customer's business, the public in the building, and life-safety / IT / refrigeration / fire alarm / emergency lighting systems. The L3 pre-isolation continuity-planning discipline."
            tone="emerald"
          />

          <TLDR
            points={[
              "Isolation has five stakeholders to think about — self, other personnel, customer, public and building systems. The L3 apprentice plans for ALL FIVE before flipping the switch.",
              "Plan the isolation scope to the smallest workable footprint — device first, DB second, main switch only when genuinely required. Smaller scope, smaller consequences, easier plan.",
              "Life-safety systems (fire alarm, emergency lighting) sit under the Regulatory Reform (Fire Safety) Order 2005 — only the building's responsible person can authorise isolation, and a fire watch + log book entry are mandatory.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the five stakeholder categories affected by isolation — self, other personnel, customer / client, public, building systems.",
              "Plan an isolation scope to minimise impact on the customer's business, refrigerated stock, tills, IT systems and production equipment.",
              "Coordinate isolation that affects fire alarm, emergency lighting and other life-safety systems with the building's responsible person under the Regulatory Reform (Fire Safety) Order 2005.",
              "Manage IT system shutdown and restart in dependency order to avoid file-system corruption and data loss.",
              "Apply lone-working controls (buddy / check-in, first-aider, rescue plan, authority limits) when isolating outside normal hours.",
              "Record the isolation event on the job sheet with sufficient detail to satisfy EAWR Reg 4(2) and HSE HSR25 record-keeping recommendations.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The five-stakeholder framework</ContentEyebrow>

          <ConceptBlock
            title="Self, other personnel, customer, public, building systems — all five matter"
            plainEnglish="At Level 2 you learned isolation protects YOU from electric shock. At Level 3 you learn that the act of isolating also affects four other categories of stakeholder, and you have a duty to plan and coordinate those impacts before you flip the switch."
            onSite="The L3 step-up the assessor watches for is whether you walk in, find the fault, and immediately reach for the main switch — or whether you stop, scope the impact, and plan the isolation event. The first behaviour is L2; the second is the L3 outcome the 2357 ELTK07 AC 1.2 verbatim text is asking for."
          >
            <p>
              Run this five-stakeholder check before any isolation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Self</strong> — your shock / arc / stored-energy risk after JIB six-step verification. The L2 lesson, still essential at L3.</li>
              <li><strong>Other personnel</strong> — operatives elsewhere on the same building working on equipment your isolation feeds. Tell them, in writing if practical, before you start.</li>
              <li><strong>Customer / client</strong> — the business is operating; tills, servers, refrigeration, production lines, telephone systems may depend on the supply you're about to drop.</li>
              <li><strong>Public</strong> — escalators, lifts, automatic doors, ATMs, CCTV all stop when supply drops. Trapped lift passengers and blocked accessible exits are foreseeable.</li>
              <li><strong>Building systems</strong> — fire alarm, emergency lighting, BMS, security, refrigeration, IT, HVAC have their own compliance frameworks (BS 5839, BS 5266, the Fire Safety Order, GDPR, LOLER, BS EN 50172).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 16 (competence)"
            clause={
              <>
                "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
              </>
            }
            meaning={
              <>
                Competence under Reg 16 covers the WHOLE planning skill, not just the technical knowledge of the meter. Foreseeing the consequences of isolation on the building&apos;s systems and the customer&apos;s business is part of competence; failing to plan is a Reg 16 issue regardless of whether anyone was hurt. An L3 apprentice does this kind of planning under documented supervision &mdash; which is also what Reg 16 requires when the apprentice doesn&apos;t yet have the experience.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (S.I. 1989/635), Reg 16."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Customer business impact — the £ consequences</ContentEyebrow>

          <ConceptBlock
            title="Refrigeration, tills, IT, production — the foreseeable losses"
            plainEnglish="Every business has supply-dependent assets that lose money or value when the power drops. The L3 apprentice scopes those before isolating, warns the customer, and either schedules the disruption to a low-impact window or scopes the isolation small enough to leave the dependent assets alive."
            onSite="A typical convenience store carries £2–8k of refrigerated stock. A small office with a NAS holds the firm's records on it; corruption is days of recovery. A small workshop with CNC equipment has work-in-progress that scraps if mid-cycle power drops. Knowing what's behind the customer's door tells you where to scope the isolation."
          >
            <p>
              The standard categories the L3 apprentice scopes before isolating:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Refrigeration / freezers</strong> — Food Standards Agency safe-temperature windows: chilled 0–8 °C (warming above 8 °C for &gt;30 min triggers discard), frozen below −18 °C (warming above −15 °C for &gt;30–60 min triggers discard). Domestic fridges are slower; commercial cabinets warm faster because they&apos;re lit and customer-opened.</li>
              <li><strong>Tills / EPOS / card terminals</strong> — uncommitted transactions in volatile memory; chargeable losses if dropped mid-payment.</li>
              <li><strong>Servers / NAS / network switches</strong> — file-system corruption from uncontrolled power loss; controlled shutdown takes 5–15 min for small kit, longer for VM hosts.</li>
              <li><strong>Production equipment</strong> — CNC, injection moulders, automated test rigs all scrap work-in-progress if mid-cycle power drops; some need re-homing of axes after re-power.</li>
              <li><strong>Telephone / VoIP / alarm dialler</strong> — call-out alarms (intruder, lift entrapment, fridge over-temp) lose their notification path while supply is off.</li>
              <li><strong>HVAC / BMS</strong> — the building management system holds setpoints in NV memory but logs lose continuity; large chillers may need a re-start cycle.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Life-safety systems — fire alarm and emergency lighting</ContentEyebrow>

          <ConceptBlock
            title="The Regulatory Reform (Fire Safety) Order 2005 sits above EAWR for life-safety isolation"
            plainEnglish="Fire alarm and emergency lighting are LIFE-SAFETY systems. The Fire Safety Order makes the building's 'responsible person' (owner, occupier or appointed M&E manager) the only person with authority to put them out of service. You as the L3 apprentice do not have that authority on your own initiative — even if your work needs it."
            onSite="The L3 apprentice loops the responsible person in BEFORE the isolation, the responsible person authorises 'engineer test' or 'isolated' mode at the panel, a fire watch is put in place, the work is logged in the fire log book, and the system is reinstated and re-tested before you sign off."
          >
            <p>
              The fire-alarm + emergency-lighting isolation discipline:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Notify the responsible person</strong> in advance — they're the legal duty-holder under the Fire Safety Order. Without their authorisation you cannot isolate.</li>
              <li><strong>Fire alarm to engineer test / isolated mode</strong> at the panel — logged at the panel and in the fire log book. Some panels send a test signal to the ARC (alarm receiving centre) — the ARC also needs to know.</li>
              <li><strong>Fire watch in place</strong> for the duration — a competent person walks the building or watches a live CCTV feed of the protected area, with phone access to the fire service.</li>
              <li><strong>Emergency lighting</strong> — maintained fittings stay lit on internal battery for 3 hours under BS 5266-1; recharge takes 24 hours after a full discharge. Plan the work to stay inside the 3-hour battery window OR coordinate supplementary cover with the responsible person.</li>
              <li><strong>Restore + test</strong> — reinstate the panel from engineer mode, test that the alarm sounds, log the reinstate time. Emergency lights are visually checked for healthy status indication.</li>
              <li><strong>Bin bags over smoke heads is NOT compliant</strong> — disturbed dust on removal triggers false alarms, the head is removed from the loop without the panel knowing, and the practice is rejected by BS 5839-1.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 (4th edition) — Electrical test equipment for use by electricians"
            clause={
              <>
                "Before starting any work, even of a routine nature, you should always check that... arrangements are in place to deal with the loss of supply to vital systems and to safeguard others who may be affected by the work."
              </>
            }
            meaning={
              <>
                GS38 is normally cited for test instruments and probe design, but it also carries the planning duty &mdash; you check, before starting, that arrangements are in place to deal with the loss of supply. That sentence is the regulatory anchor for the &lsquo;coordinate with the building&rsquo;s responsible person&rsquo; obligation. The L3 apprentice doing fault diagnosis on a building with life-safety systems treats GS38 as both an instrument standard AND a planning standard.
              </>
            }
            cite="Source: HSE GS38 (4th edition, 2015)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>IT systems — controlled shutdown discipline</ContentEyebrow>

          <ConceptBlock
            title="Servers, NAS units and switches need a managed shutdown — not a yanked plug"
            plainEnglish="A server, NAS or network switch that loses power mid-write can corrupt its file system. Recovery takes hours. The L3 apprentice notifies the IT side, waits for them to do a controlled shutdown, then isolates."
            onSite="On a small commercial site the IT side is often a managed-service provider you have to phone in advance. On a larger site it's an in-house IT manager. Either way, give them at least 24 hours' notice for a planned isolation; for an emergency fault, phone them as the first call after assessing the fault, before reaching for the main switch."
          >
            <p>
              The IT-coordination steps:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Notify in advance</strong> — name the affected equipment (servers, NAS, network switches, telephone, CCTV recorder, building access control). Estimate the duration.</li>
              <li><strong>Wait for IT to confirm safe-to-power-off</strong> — typical small NAS or single server: 5&ndash;15 minutes. Domain controller or VM host: longer, possibly hours.</li>
              <li><strong>Isolate at the smallest scope</strong> that achieves the fault-diagnosis aim. Don&apos;t drop the comms-cabinet supply to fix a problem on a different sub-main if you can help it.</li>
              <li><strong>On restore</strong>, let the IT side power up in dependency order &mdash; switches first, then routers / firewalls, then servers, then user devices. Don&apos;t expect everything to &lsquo;just come back&rsquo;.</li>
              <li><strong>Document who you spoke to</strong>, when, and what they confirmed. The job-sheet entry is your defence if a system later turns out to be corrupted and the customer claims you caused it.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS 7671 514.10 — the warning notice that supports your isolation</ContentEyebrow>

          <ConceptBlock
            title="The 'alternative supply' notice tells the next sparks the building has more than one source"
            plainEnglish="BS 7671 Reg 514.10 (warning notice — alternative supply) requires a notice at the consumer unit, the meter and any inverter or battery point on installations with on-site generation. The next person opening the consumer unit must see at a glance that opening the DNO main switch does NOT necessarily de-energise everything — they need to also operate the AC isolator on the inverter, the battery DC isolator and any standby generator changeover."
            onSite="As the L3 apprentice on a fault job, the notice is your first prompt. If you walk in and see a 'Caution — alternative supply' label on the consumer unit, you know the property has on-site generation and your isolation plan needs to cover every source. If you walk in and the property obviously has PV on the roof but no notice on the consumer unit, raise that as an EICR observation — the missing notice is a maintainer hazard."
          >
            <p>
              How the warning-notice scheme supports the five-stakeholder isolation plan:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 514.10 alternative-supply notice</strong> — at the consumer
                unit, the meter and the inverter / battery / generator. Wording typically
                'Caution — this installation has more than one source of supply'. Identifies
                every isolation point.
              </li>
              <li>
                <strong>Reg 514.10.1 'voltage exceeding 230 V' notice</strong> — where
                voltage to earth exceeds 230 V at a point of access (some PV array DC
                strings, three-phase distribution boards). Required so anyone opening the
                enclosure sees the elevated voltage warning before live parts are
                accessible.
              </li>
              <li>
                <strong>Reg 514.13.1 'Safety Electrical Connection — Do Not Remove'</strong>
                — at every earthing conductor connection, every bonding conductor
                connection and the MET. Tells you the connection is safety-critical even
                if it looks redundant.
              </li>
              <li>
                <strong>Reg 514.11 isolation notice</strong> — at every point of isolation
                where the device is not adjacent to the equipment it controls. Tells the
                operative which circuit / equipment the isolator serves.
              </li>
              <li>
                <strong>Section 514 documentation chain</strong> — the warning notices on
                site mirror the SLD and schedules in the install pack. Notice missing on
                site or schedule mismatch with the SLD is a documentation defect that goes
                in the EICR observations.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Public-impact isolation — lifts, doors, escalators</ContentEyebrow>

          <ConceptBlock
            title="Lifts, accessible doors and escalators are public-safety equipment with their own regimes"
            plainEnglish="In a tenanted commercial building or any building accessed by the public, isolation can affect equipment that the public depends on for safety and access. Lifts under LOLER, accessible doors under the Equality Act, escalators under their own British Standards. The L3 apprentice plans for human cover."
            onSite="On a small commercial unit this is rarely a factor. On a multi-storey office block, retail unit or anywhere the public has access, the building manager is your route into coordinating the human cover (lift contractor, door watchers, fire watch). The L3 apprentice proposes the work, the building manager makes it safe to do."
          >
            <p>
              Public-equipment categories to scope:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lifts (LOLER 1998 + BS EN 81)</strong> &mdash; lift contractor parks the car at ground floor before isolation; &lsquo;lift out of service&rsquo; notice; lift contractor on site or contactable. You don&apos;t isolate the lift on your own authority.</li>
              <li><strong>Automatic doors / accessible doors (Equality Act 2010)</strong> &mdash; powered doors fail closed in most designs; wheelchair users and pushchair users cannot exit; building manager staffs the doors during the isolation.</li>
              <li><strong>Escalators</strong> &mdash; isolated at the local control panel by the escalator service contractor before main supply isolation; barriered off for the duration; watcher on duty if the public is in the building.</li>
              <li><strong>ATMs</strong> &mdash; bank notified in advance; queues redirected; security implications because cash dispensers in a powered-off state still hold the cassettes.</li>
              <li><strong>CCTV / building access control</strong> &mdash; recording continuity breaks; access-control magnetic locks may fail safe (open) or fail secure (locked) depending on design; security manager makes the call on cover.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Lone working — when isolation happens out of hours</ContentEyebrow>

          <ConceptBlock
            title="Lone working on fault diagnosis is a layered competence issue"
            plainEnglish="Out-of-hours fault calls are common — the customer can't lose business hours so they want you in at 19:00 or 06:00. Lone working at those times stacks the EAWR Reg 16 competence question, the HSWA Section 2 employer's safe-system duty, and the firm's lone-working policy."
            onSite="An L3 apprentice should not be lone-working on live diagnosis. Dead-circuit visual / IR / continuity work within a documented framework is acceptable; live testing alone is not. If the customer pushes for after-hours, the supervised approved electrician takes the live work; the apprentice is in for the planning, documentation and dead-side work."
          >
            <p>
              The lone-working framework:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Documented lone-working policy</strong> from your employer covering this category of work and authorising you to do it.</li>
              <li><strong>Buddy / check-in</strong> &mdash; phone or app at 30&ndash;60 minute intervals; failure to check in triggers an escalation. Lone-worker apps with man-down accelerometer detection are standard on larger contractors.</li>
              <li><strong>First-aid arrangements</strong> &mdash; HSE first-aid policy appropriate to the site; for lone working at a remote site, your phone &amp; the emergency services are your first-aider.</li>
              <li><strong>Rescue / extraction plan</strong> &mdash; if you suffered a shock, who knows where you are, who has the keys, who comes? A site induction with an emergency contact name and number on the job sheet covers this.</li>
              <li><strong>Authority limits</strong> &mdash; live work is a JIB Approved Electrician task with documented supervision arrangement; an apprentice does not lone-work live diagnosis.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Documentation &mdash; the job-sheet record</ContentEyebrow>

          <ConceptBlock
            title="Five fields on the job sheet protect you for the working life of the installation"
            plainEnglish="Your contemporaneous record is the single most valuable defensive document if anything is later disputed. Five short fields, signed and timed."
            onSite="The job sheet, the isolation log, the fire log book entry, the IT shutdown confirmation, the supervisor sign-off &mdash; together they form the audit trail HSE expects for any electrical work that affected supply or life-safety systems. None of it takes long; all of it matters."
          >
            <p>
              The five fields:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Time isolation started + scope</strong> &mdash; what circuits, what equipment, signed.</li>
              <li><strong>Customer notified + consented</strong> &mdash; who you spoke to, when, what they agreed to.</li>
              <li><strong>Compensating measures in place</strong> &mdash; fire watch, IT shutdown completed, fridge stock moved, supervisor on site, etc.</li>
              <li><strong>Time supply restored + circuits re-energised</strong> &mdash; signed.</li>
              <li><strong>Confirmation of safe restoration</strong> &mdash; protective devices reset, customer&apos;s systems back up, post-work test completed.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 (Inspection and Testing) — referencing HSE HSR25 'Memorandum of guidance on the Electricity at Work Regulations 1989'"
            clause={
              <>
                "The HSE&apos;s publication HSR25 recommends that records of all maintenance, including test results, be kept throughout the working life of an installation. This recommendation supports compliance with the Electricity at Work Regulations 1989 (EAWR), Regulation 4(2)."
              </>
            }
            meaning={
              <>
                Your isolation event IS a maintenance event in EAWR terms &mdash; you&apos;ve interacted with the system to keep it safe, you&apos;ve restored it, you&apos;ve tested it. The HSR25 / EAWR Reg 4(2) framework wants those records kept for the working life of the installation. The job sheet is the entry-level record; on a larger contract the firm&apos;s asset-management system holds the master copy. Either way, the contemporaneous note is the audit trail.
              </>
            }
            cite="Source: IET Guidance Note 3 (Inspection and Testing) referencing HSE HSR25 (Memorandum of guidance on the Electricity at Work Regulations 1989)."
          />

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 17"
            clause={
              <>
                "Where necessary in order to safeguard the safety of relevant persons the responsible person must ensure that the premises and any facilities, equipment and devices provided in respect of the premises... are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order and in good repair."
              </>
            }
            meaning={
              <>
                Article 17 puts the maintenance duty (which includes isolation and re-instatement of fire-alarm and emergency-lighting systems) on the &lsquo;responsible person&rsquo; for the premises &mdash; usually the owner, occupier or appointed M&amp;E manager. As the L3 electrician you support that duty by coordinating with the responsible person before isolation; you do not assume the duty yourself.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (S.I. 2005/1541), Article 17."
          />

          <RegsCallout
            source="BS 7671 Reg 134.1.1 — selection and erection / good workmanship"
            clause={
              <>
                "Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation."
              </>
            }
            meaning={
              <>
                Reg 134.1.1 is the &lsquo;good workmanship&rsquo; anchor BS 7671 inherits as a competence test. Restoration of supply after fault diagnosis is part of erection in the wider sense &mdash; it has to be done by a skilled person, with proper materials, and to the standard the regulation expects. A sloppy restoration that leaves a circuit live but tests not done, or a fire-alarm panel still in engineer mode after you&apos;ve left, is a Reg 134.1.1 failing.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 134.1.1."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Killing the main switch on a small shop without warning the manager"
            whatHappens={
              <>
                Apprentice arrives at a Tesco Express at 10:00 for an RCBO fault on the lighting.
                Walks straight to the Schneider DB, throws the main switch to access the busbar,
                starts work. Twenty minutes later the manager comes back from the cash run to find
                the chest freezers warming, the tills offline, the card terminals offline, queues
                building, and the in-store music silent. Stock loss when the freezers exceeded
                &minus;15&nbsp;&deg;C: &pound;1,800. Lost trade across the 90&nbsp;minutes the shop
                was effectively closed: another &pound;1,500. The contractor&apos;s firm carries the
                liability because the apprentice didn&apos;t plan or warn. EAWR Reg 16 (competence)
                breach because a competent person would have foreseen the impact.
              </>
            }
            doInstead={
              <>
                Stop. Phone or speak to the manager BEFORE flipping anything. Confirm the scope you
                need (is it really the main switch, or is it just the affected RCBO?). Agree a time
                window (the shop&apos;s quietest 30&nbsp;minutes is usually mid-afternoon). Offer to
                isolate at the device level if the work allows it. Document the consent on the job
                sheet. THEN execute.
              </>
            }
          />

          <CommonMistake
            title="Putting a bin bag over a smoke head to 'isolate' the fire alarm"
            whatHappens={
              <>
                Apprentice is working on a lighting circuit in a ceiling void above an open-plan
                office. There&apos;s a smoke head right where they need to be. They put a bin bag
                over the head with masking tape and crack on. Two hours in, they finish the work,
                pull the bag off, the trapped dust drifts down through the head, the alarm
                triggers, the building evacuates, the fire service attends, the building&apos;s
                responsible person reports it, the local fire authority writes to the contractor.
                BS 5839-1 breach because an unauthorised person isolated detection. Fire Safety
                Order issue because the responsible person was bypassed. Chargeable false-alarm
                callout from the fire service.
              </>
            }
            doInstead={
              <>
                Speak to the responsible person before any work. They put the relevant zone(s) into
                isolated / engineer-test mode at the panel (logged in the fire log book), they
                arrange a fire watch for the duration, you do the work, the system is reinstated and
                tested before you leave. Bin bags over heads are not BS 5839-compliant and never
                were &mdash; they&apos;re an old short-cut that only worked when no-one was watching.
              </>
            }
          />

          <Scenario
            title="The Friday-afternoon comms-cabinet isolation"
            situation={
              <>
                You&apos;re sent to a small accountancy firm at 15:30 on a Friday to investigate a
                dead sub-main feeding the comms cabinet. The cabinet contains the firm&apos;s
                Synology NAS holding 3&nbsp;TB of client tax records, a network switch feeding 18
                desks, an internal VoIP phone system, and the building&apos;s CCTV recorder. The
                customer wants the fault fixed before Monday. You&apos;ve isolated at the cut-out
                and proved dead at the sub-main &mdash; but not before the IT side has shut anything
                down. The NAS was mid-snapshot when the supply dropped.
              </>
            }
            whatToDo={
              <>
                Stop the diagnostic work. Phone the firm&apos;s IT contact (managed-service provider
                or in-house) immediately and explain. They will need to run a controlled boot-up of
                the NAS, check file-system integrity, restore from the most recent good snapshot if
                corruption is found, and confirm the VoIP system has come back up correctly. Document
                on the job sheet: time of unplanned isolation, nature of the IT impact, who you
                phoned, what they confirmed, and the timeline of restoration. If client tax-record
                data is corrupted, GDPR and the firm&apos;s professional-indemnity arrangements
                bring further obligations. Restore supply only when the IT side is ready to receive
                it; bring the cabinet up in dependency order (switch&nbsp;&rarr;&nbsp;NAS&nbsp;&rarr;
                &nbsp;phones&nbsp;&rarr;&nbsp;CCTV).
              </>
            }
            whyItMatters={
              <>
                The L3 outcome from the 2357 ELTK07 AC 1.2 verbatim is recognising that an
                uncoordinated isolation has consequences far beyond the electrical system &mdash;
                data corruption, lost client records, GDPR exposure, professional-indemnity claims.
                The L3 apprentice phones the IT contact BEFORE isolating in any normal scenario; in
                an emergency dead-supply scenario where the supply is already lost, the apprentice
                phones IT as the first call AFTER making the system electrically safe and BEFORE
                starting diagnostic work. Knowing the order matters.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Isolation has five stakeholders — self, other personnel, customer, public, building systems. The L3 apprentice plans for ALL FIVE before flipping the switch.",
              "Plan the scope to the smallest workable footprint — device first, DB second, main switch only if the work genuinely requires it.",
              "Refrigeration, tills, IT, production equipment all carry foreseeable £ consequences if dropped without warning. Phone the customer before you cut anything they care about.",
              "Fire alarm and emergency lighting are LIFE-SAFETY — only the building's responsible person under the Fire Safety Order can authorise isolation. Fire watch + fire log book entry are mandatory.",
              "IT systems need a controlled shutdown in dependency order (switch first, then NAS / servers, then phones, then user devices). Reverse on restore.",
              "Public-impact equipment (lifts, accessible doors, escalators, ATMs) needs human cover during isolation — the building manager coordinates, you don't isolate on your own authority.",
              "Lone working out of hours stacks EAWR Reg 16 (competence), HSWA Section 2 (employer duty) and firm policy. An L3 apprentice does not lone-work live diagnosis.",
              "Document on the job sheet — time started, scope, customer consent, compensating measures, time restored, post-work test confirmed. EAWR Reg 4(2) and HSR25 want the record for the working life of the installation.",
            ]}
          />

          <Quiz title="Implications of isolation — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> 1.4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Safe working procedures
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
                Section 2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
