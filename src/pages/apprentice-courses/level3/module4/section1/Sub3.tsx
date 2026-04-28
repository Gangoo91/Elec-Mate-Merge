/**
 * Module 4 · Section 1 · Subsection 3 — Safe isolation in fault diagnosis
 * Maps to C&G 2365-03 / Unit 303 / LO1 / AC 1.3
 *   AC 1.3 — "specify safe working procedures that should be adopted for fault diagnosis and correction work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 1.1, 1.2, 1.3 — safe isolation
 * procedure for individual circuits and complete installations, plus the
 * implications of isolating (or NOT isolating) for self, others, customers,
 * public and building systems.
 *
 * Frame: applies the JIB six-step in fault-diagnosis context — including
 * full installation isolation at the cut-out, multi-source isolation (PV,
 * EV, generator), and the implications of loss-of-supply for the customer.
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
  'Safe isolation in fault diagnosis (1.3) | Level 3 Module 4.1.3 | Elec-Mate';
const DESCRIPTION =
  'Applying the JIB six-step safe isolation procedure to fault-diagnosis work — circuit, sub-main and full installation isolation, multi-source disconnection (PV / EV / generator) and weighing the customer-impact of loss-of-supply against the safety case.';

const checks = [
  {
    id: 'mod4-s1-sub3-pv',
    question:
      "You're investigating an earth-leakage fault on a domestic CU that has a 4 kWp solar PV system on the roof. What's the special isolation requirement?",
    options: [
      "Just turn off the main switch.",
      "PV systems back-feed energy from the array into the inverter's DC input. Switching the AC isolator at the CU only kills the AC side — the DC side from the array to the inverter remains live during daylight hours, at typically 200–600 V DC. Full isolation needs (1) AC isolator OFF (consumer-unit side AND inverter side), (2) DC isolator OFF (between the array and the inverter — usually a Santon or Enwitec rotary), (3) verify with a DC-rated voltage tester (Fluke T6-1000 or Megger MFT1741 set to DC). The PV array can't be 'turned off' — only disconnected — so cover with a non-transparent sheet if you need it dark.",
      "Wait for sunset.",
      "Switch the array off.",
    ],
    correctIndex: 1,
    explanation:
      "Multi-source isolation is the L3 step-up. Modern installations have multiple energy sources — PV, EV, battery storage, standby generator, microCHP. Each source needs its own isolation step, and your tester must be rated for the energy type (DC for PV, AC for everything else). MIS 3002 (PV installation guide) and BS 7671 712 / 722 / 826 cover the specifics. The most common L3 mistake is killing the AC side and assuming the system is dead — the DC side will give you a 400 V DC shock that an AC tester won't see.",
  },
  {
    id: 'mod4-s1-sub3-fullisol',
    question:
      "When is FULL INSTALLATION isolation (at the main switch) required for fault diagnosis, rather than just isolating the affected circuit?",
    options: [
      "Always.",
      "When (a) the fault is on the supply / cut-out / tails / main switch / busbar itself, OR (b) you can't reliably identify which circuit feeds the fault location, OR (c) the work involves removing or refitting the consumer unit cover where the busbar is exposed, OR (d) the fault has compromised the integrity of the CU (water ingress, burnt terminal block, melted enclosure). Full isolation has bigger customer impact (whole property loses supply) so weigh it against the alternative of working live or working with limited isolation — but if the safety case requires full isolation, the customer impact doesn't change the answer.",
      "Only on commercial.",
      "Never.",
    ],
    correctAnswer: 1,
    explanation:
      "Full isolation is the right answer in fewer cases than apprentices initially expect — but the cases where it's right, it's the only safe option. The decision is a Reg 14 risk assessment in real time: 'is it reasonable for this conductor to be live while I work near it?'. For a burnt CU enclosure with the busbar exposed, the answer is no — even if the customer loses freezer supply for an hour. The customer impact is a customer-service problem; the live busbar is a safety problem. Safety wins.",
  },
  {
    id: 'mod4-s1-sub3-impact',
    question:
      "A small business runs a butcher's shop. The chest freezer holds £1500 of stock. You need to isolate the supply for 90 minutes to investigate a fault. What's the right way to handle the loss-of-supply impact?",
    options: [
      "Just isolate.",
      "(1) Inform the customer in writing of the planned outage, expected duration, and any contingency they need (move stock, brief staff, sign at door). (2) Check whether the affected circuit has any safety-critical loads — fire alarm sounders, emergency lighting central battery, intruder alarm — and if so, brief the customer to put out a 'system off' note and inform their alarm-receiving centre. (3) Plan the isolation window to minimise impact (early morning, lunchtime closure). (4) Document the conversation on the job sheet — customer agreed to isolation, accepted impact, etc. (5) ONLY THEN isolate. The customer's commercial loss is real and your firm carries professional liability for unannounced outages.",
      "Tell them after.",
      "Just text them.",
    ],
    correctIndex: 1,
    explanation:
      "Loss of supply has consequences and the customer is entitled to be informed before, not after. EAWR Reg 4 and HSWA Section 3 (employer's duty to non-employees) both put a duty on the firm to consider the impact of its work on third parties. The Consumer Rights Act 2015 makes it a contractual issue too — services must be performed with 'reasonable care and skill', and that includes communicating impact. A documented pre-isolation briefing protects you from a 'you cost me £1500 of stock' complaint after the fact.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "An L3 apprentice is asked to specify the safe isolation procedure for a single 32 A radial circuit that's tripped its RCBO. What's the full sequence including the equipment used at each step?",
    options: [
      "Flip the breaker and crack on.",
      "(1) Identify circuit from schedule and labels. (2) Switch the RCBO OFF and confirm by visual inspection. (3) Apply a personal padlock + tag (e.g. Brady 65681 lock-out hasp + LOTO tag with apprentice's name and date) to the RCBO toggle. (4) Prove a GS38 two-pole tester (Martindale VI-13800) on a known live source — typically a known-live socket on a different circuit OR a Martindale GVD2 proving unit. Confirm full lamp / LED / audible. (5) Test the work-point — at the accessory or junction box, between L–N, L–E and N–E. All three must read zero. (6) Re-prove the tester on the same known live source. (7) Begin work. (8) On completion, remove personal padlock, restore supply, retest the RCBO operation with an MFT.",
      "Just lock-off.",
      "Just put a sign up.",
    ],
    correctAnswer: 1,
    explanation:
      "The single-circuit isolation is the most-frequently tested practical skill on L3 assessments. The instruments are specific: GS38 two-pole tester (Martindale, Fluke T130, Kewtech KT1780) for the prove-dead steps; proving unit (Martindale GVD2 or equivalent) OR a known live socket for the prove-tester steps; lock-off device (Brady, Master Lock, Idesco) plus tag for the lock-off step. Multimeters and socket testers do NOT replace the two-pole. The end-of-job retest with the MFT (typically RCD trip-time test on the RCBO) confirms the protective device is still working before you sign off.",
  },
  {
    id: 2,
    question:
      "Implications of isolating a circuit — what's the IMPACT category for each of: (a) other personnel, (b) customer/client, (c) public, (d) building systems?",
    options: [
      "All low impact.",
      "(a) OTHER PERSONNEL — other trades on site lose lighting / power for tools, may need to stop work; the firm's lone-working procedure may need adjusting. (b) CUSTOMER/CLIENT — loss of business activity, freezer stock at risk, computers go down (data loss risk), contractual penalties on commercial sites, customer dissatisfaction. (c) PUBLIC — emergency exits may go dark, public-area lighting fails, accessible plant rooms become hazardous, security systems may shut down. (d) BUILDING SYSTEMS — fire alarm goes into fault (with audible alert), emergency lighting batteries enter discharge cycle, lift goes to ground floor and stops, BMS may fault and require manual reset, refrigeration cycles interrupt, motors may auto-restart on power restoration with safety implications.",
      "Only customer matters.",
      "Only safety matters.",
    ],
    correctAnswer: 1,
    explanation:
      "The four-category impact assessment is the 2357 ELTK07 1.2 syllabus item, and it's the right way to think about isolation decisions before you flip the breaker. A simple isolation can have unexpected consequences — flipping the kitchen lighting circuit at a small care home stops the kitchen lift and trips the fire-alarm fault relay, and the manager has to inform the alarm-receiving centre, brief staff, and document the impact. Knowing what your isolation will do BEFORE you do it is the L3 competence.",
  },
  {
    id: 3,
    question:
      "Implications of NOT isolating — what dangers does failure to isolate present to (a) self, (b) other personnel, (c) customer/client, (d) public, (e) building systems?",
    options: [
      "Only self at risk.",
      "(a) SELF — direct shock, arc-flash burn, fall from a recoil reaction. (b) OTHER PERSONNEL — assistant or apprentice working with you may contact live conductor; bystanders may be in arc range. (c) CUSTOMER/CLIENT — equipment damage from accidental short, fire risk from compromised insulation, customer staff injury if they touch exposed live parts. (d) PUBLIC — collapse of structure if a fire results, contamination if hazardous materials escape (e.g. transformer oil), wider supply outage if a fault propagates upstream. (e) BUILDING SYSTEMS — cascade failures (a botched isolation can take out the wrong circuit, knocking out fire alarm AND lifts AND emergency lighting at once), data loss on IT systems, equipment damage on plant restart.",
      "Only the customer.",
      "Only the firm.",
    ],
    correctAnswer: 1,
    explanation:
      "The 2357 ELTK07 1.3 syllabus is explicit about the five-category 'failure to isolate' impact — it's not just self-harm, it's the whole web of consequences. The HSE prosecutes both the personal injury AND the wider impact. A botched fault diagnosis at a hospital that took out the lighting in an operating theatre is the kind of case that closes a firm. The five-category thinking is what separates a competent L3 from a dangerous one.",
  },
  {
    id: 4,
    question:
      "A modern installation has a 7 kW EV charger, a 5 kWp solar PV array, a 9.6 kWh battery storage system AND a standby generator. You're investigating a fault on the main DB. How many isolation points do you operate?",
    options: [
      "Just the main switch.",
      "All of them, plus the main switch. (1) Open main switch / DNO cut-out cap (DNO call only) for incoming supply. (2) Open the EV charger isolator AND verify EV is unplugged (the EVSE may have its own contactor that closes on demand). (3) Open the PV AC isolator at the inverter AND the PV DC isolator at the array. (4) Open the battery storage AC isolator AND the battery DC isolator. (5) Confirm standby generator changeover switch is in MAINS position and lock-off the generator manual start. Then prove dead at the work point with a GS38 two-pole, AND a DC-rated tester for the PV/battery DC sides if you'll be near them.",
      "Two — DC and AC.",
      "Three.",
    ],
    correctAnswer: 1,
    explanation:
      "Multi-source installations are increasingly common and each source has its own isolation point. BS 7671 Chapter 71 (special installations) has dedicated requirements for each — Section 712 (PV), Section 722 (EV), Section 826 (battery storage). The L3 apprentice doesn't need to commission these systems but does need to know they exist and know to isolate them all before fault work near the DB. Missing one source is the cause of multiple recent industry incidents.",
  },
  {
    id: 5,
    question:
      "What's the difference between 'isolation' and 'switching off for mechanical maintenance' in BS 7671 terms, and which applies to fault diagnosis?",
    options: [
      "Same thing.",
      "BS 7671 Chapter 46 distinguishes four switching functions: ISOLATION (Reg 462) — all live conductors disconnected, lockable in OFF position, designed to prevent re-energisation; SWITCHING OFF FOR MECHANICAL MAINTENANCE (Reg 463) — hand-operable, lockable, prevents accidental re-energisation; EMERGENCY SWITCHING (Reg 464) — fast-acting, immediately accessible, removes danger from personnel; FUNCTIONAL SWITCHING (Reg 465) — normal operation. For fault diagnosis you use ISOLATION every time. The breaker label and the actual function of the device must match — many older switches that look like isolators are actually only functional switches and don't satisfy Reg 462.",
      "Only commercial.",
      "Only domestic.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 462–465 sets out the four switching functions and the L3 apprentice needs to know which function applies to which task. Modern MCBs and RCBOs satisfy isolation duty (they're labelled as such), but some older switchgear (rotary switches, certain types of contactor) is only functional and won't lock-off. If the device on the DB doesn't satisfy Reg 462, you need to isolate further upstream (typically the main switch) instead.",
  },
  {
    id: 6,
    question:
      "You've isolated a circuit, locked off, proved dead. While you're working, another operative arrives at the DB and starts to remove a different breaker. What should you do?",
    options: [
      "Carry on.",
      "Stop them and verify they understand what's locked off and why. Show them your padlock and tag. Confirm they're not about to remove your lock or restore your circuit. If they need to do work that affects YOUR isolation (e.g. they're investigating the busbar), the work must coordinate — both operatives' locks stay on, both operatives complete their work, both operatives remove their own locks. The 'multi-lock hasp' (Brady 65681 takes 6 padlocks) is designed for this — multiple operatives, one device, no operative removes their lock until they're personally finished.",
      "Let them swap your lock.",
      "Tell the boss.",
    ],
    correctAnswer: 1,
    explanation:
      "Multi-operative isolation is a real scenario on commercial sites — different trades working on different parts of the same DB, or one trade working while another commissions. The 'group lock-off' procedure with a multi-lock hasp is the industry standard. Each operative attaches their own padlock to the hasp; the device cannot be operated until ALL padlocks are removed; each operative removes only their own lock when they're finished. The hasp + padlock approach prevents the 'someone removed my lock thinking it was a leftover' scenario that has killed apprentices.",
  },
  {
    id: 7,
    question:
      "A fault investigation requires you to isolate the lighting circuit feeding a stairwell in a multi-occupancy building. What additional steps cover the public-safety implications?",
    options: [
      "None.",
      "(1) Inform the building manager / managing agent BEFORE isolation. (2) Check whether emergency lighting will activate (BS 5266 self-test should give 3 hours of cover; verify before isolation by running a manual test or checking the central battery indicator). (3) Place 'lighting under maintenance' signage at each landing. (4) Brief any concierge / security staff on the affected route. (5) Plan isolation outside peak occupancy where possible. (6) Have a torch / temporary lighting (LED work-light) available for residents who pass during the work. (7) Document the public-safety briefing in the RAMS addendum. Public access routes can't simply be plunged into darkness without these controls — Building Regs Part B (fire safety) and the Regulatory Reform (Fire Safety) Order 2005 both apply.",
      "Just isolate.",
      "Tell residents after.",
    ],
    correctAnswer: 1,
    explanation:
      "Public-area isolation is one of the higher-risk fault-diagnosis tasks because the consequences spill out beyond the customer. A stairwell in darkness is a fire-escape hazard regardless of whether there's a fire. The Regulatory Reform (Fire Safety) Order 2005 puts a duty on the 'responsible person' (usually the building manager) to maintain emergency lighting — and your isolation is a temporary departure from compliance that has to be controlled. Most managing agents have a documented procedure for emergency-lighting outages; you fit into it.",
  },
  {
    id: 8,
    question:
      "After fault correction, you restore supply to a circuit that was isolated for 90 minutes. The circuit feeds a 7.5 kW three-phase induction motor on a workshop extractor. What restart precaution applies?",
    options: [
      "Just switch on.",
      "Three-phase induction motors with no inherent restart protection will RESTART AUTOMATICALLY when supply is restored. If anyone is near the motor, the impeller, the belt drive or the driven plant, they're in immediate danger. The standard precaution: (1) Verify the local motor isolator is OFF before restoring the upstream supply. (2) Restore upstream supply, retest. (3) Walk to the motor location, brief anyone nearby that you're about to restart, visually check the area is clear. (4) Operate the local isolator. (5) Confirm correct operation and rotation. BS 7671 463.1 / 463.2 (mechanical maintenance switching) and PUWER 1998 Reg 19 (isolation from sources of energy) both apply.",
      "Stand back.",
      "Wear gloves.",
    ],
    correctAnswer: 1,
    explanation:
      "Auto-restart of motors on supply restoration is one of the main causes of post-fault-investigation injuries. The motor was running before isolation, the contactor / relay closed on its 'hold' coil, the supply went off, the contactor opened — when supply returns the contactor doesn't re-close (it needs a manual start) UNLESS the motor has a 2-wire control or the original control circuit is still calling for run. PUWER Reg 19 requires isolation from ALL sources of energy AND verification that a restart will not cause injury. The discipline is: local isolator off before upstream restoration, walk the area, then restart deliberately.",
  },
];

const faqs = [
  {
    question: "Can I isolate at the consumer-unit main switch instead of the individual breaker, just to be safe?",
    answer:
      "You can — and for some faults you MUST — but you have to weigh the impact. Full installation isolation kills every circuit including the freezer, the boiler, the alarm, the broadband router, the smart meter (which then takes 5–15 minutes to re-handshake on restore). For a simple radial-circuit fault, individual breaker isolation with a personal lock is normally enough and is more proportionate. The decision is part of your RAMS — what's the safety case AND what's the customer impact, and which is the smaller compromise?",
  },
  {
    question: "What if the breaker I want to isolate doesn't have a lock-off mechanism — it's an old re-wireable fuse holder?",
    answer:
      "Three options. (1) Remove the fuse-link entirely and put it in your pocket / your toolbox — no-one can re-energise without it. Some firms supply a 'dummy' fuse-link with a lock-off slot for exactly this. (2) Apply a Brady 'wedge' lock-off that fits inside the fuse-holder cavity. (3) If neither is possible, isolate further upstream at a device that does lock off — typically the main switch. Whatever you do, the principle is unchanged: the circuit must be PROVABLY in the off state with a defence against accidental re-energisation. A hand-written note that says 'do not switch on' is not a defence.",
  },
  {
    question: "The customer wants to keep their freezer running. Can I leave it on a temporary supply while I isolate the rest?",
    answer:
      "Yes, if you can do it safely. Standard approach: connect the freezer to a known-live socket on a different circuit via an extension lead, mark the lead with tape and a 'TEMPORARY — DO NOT REMOVE' label, document on the job sheet. The temporary supply must satisfy the same protection requirements (RCD on the host circuit, adequate cable rating). Don't run the extension across walkways or under doors where it can be damaged. After the work, restore the freezer to its original circuit and remove the temporary lead.",
  },
  {
    question: "Why does it matter who removes the lock-off — surely anyone can if the circuit needs to be back on?",
    answer:
      "It matters for two reasons. First — accountability. If someone other than you removes your lock and re-energises a circuit you thought was still safe, and you take a shock as a result, the prosecution will ask 'whose lock was removed by whom and why?'. The answer 'somebody removed it, I don't know who' is not defensible. Second — communication. Your lock means YOU are working on the circuit. Removing it without telling you means you might be in the middle of a termination when the supply comes back. Personal lock + personal removal is the only safe rule. Industry term — LOTO (lock out, tag out) — and it's universal.",
  },
  {
    question: "If a circuit has a CIRCUIT BREAKER LOCK at the DB, do I still need my own personal padlock on top?",
    answer:
      "Yes. A built-in breaker lock is a circuit-control device — it stops the breaker being toggled accidentally. Your personal padlock is a personal-safety device — it identifies that YOU specifically are working on the circuit and only YOU can re-energise. The two have different purposes and the LOTO discipline requires both: lock the device AND apply the personal padlock + tag. On a multi-trade site this matters even more — your tag tells the next sparks, the maintenance fitter and the fire alarm engineer that the circuit is being worked on by a named person who hasn't yet finished.",
  },
  {
    question: "Is 'I'll just be 30 seconds' ever a valid reason to skip safe isolation?",
    answer:
      "No. The HSE prosecution archive is full of '30 second' jobs that ended in fatality. The shock that kills you takes 50 milliseconds; the procedure that prevents it takes 90 seconds. The maths is one-sided. The discipline of always isolating, even for the smallest job, is what makes safe-isolation an automatic habit instead of a 'when I remember' habit. The senior who tells you a quick job doesn't need isolation is testing your discipline; the right answer is to isolate anyway, and explain that you've been trained to follow the procedure every time.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 3"
            title="Safe isolation in fault diagnosis"
            description="Applying the JIB six-step in fault-diagnosis context — circuit, sub-main and full installation isolation, multi-source disconnection (PV, EV, battery, generator), the four-category impact assessment of loss of supply, and the BS 7671 distinction between isolation and switching off for mechanical maintenance."
            tone="emerald"
          />

          <TLDR
            points={[
              "Modern installations have multiple energy sources — PV, EV, battery, generator. Each needs its own isolation step. AC isolation alone leaves DC sources live.",
              "BS 7671 Chapter 46 distinguishes four switching functions. Only ISOLATION (Reg 462 — lockable, prevents re-energisation) is acceptable for fault diagnosis.",
              "Loss of supply has impact across four categories: other personnel, customer, public, building systems. Document the impact briefing before isolation, not after.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the JIB six-step safe isolation procedure to single-circuit, sub-main and full-installation isolation in fault-diagnosis context.",
              "Identify all energy sources in a multi-source installation (PV, EV, battery, generator) and specify the isolation point for each.",
              "Distinguish ISOLATION (BS 7671 Reg 462), switching off for mechanical maintenance (Reg 463), emergency switching (Reg 464) and functional switching (Reg 465).",
              "Assess the impact of loss-of-supply across four categories: other personnel, customer/client, public, building systems.",
              "Apply group lock-off (multi-lock hasp) where multiple operatives are working on the same isolation point.",
              "Recognise the auto-restart hazard for motors on supply restoration and apply PUWER Reg 19 isolation discipline.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Single-circuit isolation — the eight-step in detail</ContentEyebrow>

          <ConceptBlock
            title="The L3 single-circuit isolation procedure"
            plainEnglish="Sub 1.2 introduced the JIB six-step. In fault-diagnosis context the procedure has eight micro-steps when you include the lead-in (identify) and the lead-out (retest). Every L3 practical exam tests this sequence. Learn it as muscle memory."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Identify</strong> from schedule, labels, customer information. Hypothesis only.</li>
              <li><strong>2. Switch off</strong> the circuit's protective device. Confirm visually that it\'s in the OFF position.</li>
              <li><strong>3. Lock-off</strong> with personal padlock and tag. Use a multi-lock hasp if multiple operatives are working.</li>
              <li><strong>4. Prove tester</strong> on a known live source — Martindale GVD2 proving unit OR a known-live socket on a different circuit.</li>
              <li><strong>5. Test work-point</strong> at the accessory or junction box. L–N, L–E, N–E. All three must read zero on the GS38 two-pole.</li>
              <li><strong>6. Re-prove tester</strong> on the same known live source. Catches a tester that has failed during the test.</li>
              <li><strong>7. Carry out work.</strong> Stay within the scope of the isolation; if the work expands, re-isolate accordingly.</li>
              <li><strong>8. Retest and restore.</strong> Continuity of CPC, ring continuity (if a ring), insulation resistance, polarity, then RCD trip-time on the protective device. Remove personal padlock, restore supply, document.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 462.1.1 (Isolation)"
            clause={
              <>
                "Every circuit shall be capable of being isolated from each of the live supply conductors except where Regulation 461 applies. Provision shall be made for the disconnection of the neutral conductor where it cannot be relied upon to be at earth potential."
              </>
            }
            meaning={
              <>
                Two requirements. First &mdash; every circuit must have a means of isolation from EVERY live conductor (line and neutral on TT systems where the neutral isn\'t reliably at earth potential). Second &mdash; on TN-S and TN-C-S where the neutral IS at earth potential, you only need to isolate the line. The L3 apprentice needs to know which supply arrangement they\'re working on, and isolate accordingly.
              </>
            }
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 462.1.1 — verbatim from the bs7671_regulations dataset."
          />

          <SectionRule />

          <ContentEyebrow>Multi-source installations</ContentEyebrow>

          <ConceptBlock
            title="Modern installations have multiple energy sources — each needs its own isolation"
            plainEnglish="A residential installation in 2026 may have grid supply (TN-C-S), solar PV (DC up to 600 V), battery storage (DC up to 800 V), EV charger (back-feed via V2G in some installations), microCHP (back-feed AC), and a standby generator. Each is an independent energy source and each has its own isolation point. Killing the main switch only kills the grid input — everything else stays live until you isolate it separately."
            onSite="The growth of low-carbon technology means most domestic CUs you\'ll work on by mid-decade will have at least one supplementary source. Knowing where to isolate each one is part of the L3 fault-diagnosis competence. Inverter-DC isolators are usually rotary devices on the wall next to the inverter (Santon, Enwitec, BPV); battery DC isolators are often inside the battery housing; generator isolation is usually a changeover switch with a manual lockable position."
          >
            <p>
              Isolation points for common multi-source installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Solar PV</strong> — AC isolator at the inverter output (BS 7671 712.537.2.2.1) AND DC isolator between array and inverter input (Reg 712.537.2.2). Cover the array if working in daylight to reduce DC voltage. Verify with DC-rated tester (Fluke T6-1000, Megger MFT1741 set to DC).</li>
              <li><strong>EV charger</strong> — local isolator at the charger AND verify the EV is unplugged. Modern EVSEs (Zappi, Ohme, Pod Point) have internal contactors but the local isolator is the lockable point.</li>
              <li><strong>Battery storage</strong> — AC isolator at the inverter AND battery DC isolator (often inside the cabinet, Tesla Powerwall has it on the side, GivEnergy and Solax have similar). Battery DC voltage can be 48–800 V depending on system.</li>
              <li><strong>Standby generator</strong> — changeover switch in the MAINS-OFF / GEN-OFF position, lock-off the generator manual start, disconnect the start battery if extended work.</li>
              <li><strong>microCHP / fuel cell</strong> — AC isolator at the unit; some units have an internal contactor that re-closes on grid restoration so lock-off is essential.</li>
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

          <ContentEyebrow>Full-installation isolation</ContentEyebrow>

          <ConceptBlock
            title="When the safety case requires the whole property goes off"
            onSite="Full isolation has the biggest customer impact and is rightly used sparingly — but when it\'s the right answer, the customer impact doesn\'t change the answer. The decision is a Reg 14 risk assessment in real time."
          >
            <p>
              Full installation isolation is required when:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The fault is on the supply / cut-out / tails / main switch / busbar itself.</li>
              <li>You can\'t reliably identify which circuit feeds the fault location (e.g. a downlighter that takes power from one circuit\'s L and another circuit\'s N — borrowed neutral).</li>
              <li>The work involves removing or refitting the consumer unit cover where the busbar is exposed.</li>
              <li>The fault has compromised the integrity of the CU — water ingress, burnt terminal block, melted enclosure, signs of arcing.</li>
              <li>The DB is not labelled or the labels are demonstrably wrong (no reliable way to isolate just the affected circuit).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 537.2.4"
            clause={
              <>
                "Devices for isolation shall be selected and/or installed so as to prevent unwanted or unintentional closure (see Regulation 462.3). This may be achieved by locating the device in a lockable space or lockable enclosure or by padlocking or by other suitable means."
              </>
            }
            meaning={
              <>
                Lock-off is mandated by BS 7671, not just by good practice. A padlock through the MCB hasp, a captive-key main switch, a Brady SafeKey lockout box across the consumer unit &mdash; pick one and use it every isolation, every time. An &ldquo;I just popped the breaker off&rdquo; isolation does not satisfy 537.2.4.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 537.2.4, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 514.13.1"
            clause={
              <>
                "A warning notice clearly and durably marked with the words &lsquo;Safety Electrical Connection &mdash; Do Not Remove&rsquo; shall be securely fixed in a visible position at or near: (a) the point of connection of every earthing conductor to an earth electrode; and (b) the point of connection of every bonding conductor to an extraneous-conductive-part; and (c) the main earthing terminal, where separate from main switchgear."
              </>
            }
            meaning={
              <>
                On any isolation that touches the MET or main bonding (boilers, gas / water cocks, sub-main isolation), the safety-electrical-connection labels must remain in place when you put the installation back. If you&apos;ve had to remove a label to access a connection, replace it before you sign the job off &mdash; missing labels are a Code 3 on a future EICR and a real hazard for the next sparks.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 514.13.1, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>The four-category impact assessment</ContentEyebrow>

          <ConceptBlock
            title="What does this isolation do, beyond the circuit being worked on?"
            plainEnglish="Loss of supply has consequences. A simple isolation on a small site can cascade into customer impact, public safety issues and building-systems faults. The four-category assessment is the structured way to think about consequences before flipping the breaker."
          >
            <p>
              The four categories on the 2357 ELTK07 1.2 syllabus:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Other personnel</strong> — other trades on site lose lighting / power for tools; lone-working procedures may need adjusting; supervision arrangements may need updating.</li>
              <li><strong>Customer / client</strong> — loss of business activity, freezer stock at risk, computers go down (data loss risk), contractual penalties on commercial sites, customer dissatisfaction.</li>
              <li><strong>Public</strong> — emergency exits may go dark, public-area lighting fails, accessible plant rooms become hazardous, security systems may shut down, fire-alarm route compromised.</li>
              <li><strong>Building systems</strong> — fire alarm fault, emergency lighting batteries enter discharge, lift goes to ground floor, BMS may fault, refrigeration cycles interrupt, motors may auto-restart.</li>
            </ul>
            <p>
              The standard practice is to brief the customer in writing on each category that applies, get their acknowledgement, and document on the job sheet before isolation.
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

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Isolating only the AC side of a PV-equipped CU"
            whatHappens={
              <>
                Apprentice arrives at a domestic property with a 4&nbsp;kWp solar PV system to
                investigate an earth-leakage fault. They isolate at the main switch and prove dead
                at the affected circuit\'s accessory. They start cutting back to a junction box.
                Halfway through the cut they hit the inverter\'s DC input cable that runs through
                the same containment. The DC side is at 480&nbsp;V (it\'s noon in June); the cut
                arcs, the apprentice gets a DC arc-flash burn, and the inverter is ruined.
                Diagnosis: AC isolation didn\'t kill the DC side of the PV system, and the
                apprentice\'s AC-only tester didn\'t see the DC voltage on the cable being cut.
              </>
            }
            doInstead={
              <>
                Identify ALL energy sources before isolation. Isolate AC and DC separately.
                Confirm with a DC-rated voltage tester (Fluke T6-1000, Megger MFT1741 in DC mode)
                on any cable that might carry DC. If unsure whether a cable is AC or DC, treat as
                live until verified with the appropriate tester. Cover the PV array with an opaque
                sheet to drop DC voltage to near-zero if you\'ll be working near DC cables for an
                extended period.
              </>
            }
          />

          <CommonMistake
            title="Restoring supply without checking what restarts"
            whatHappens={
              <>
                Apprentice has isolated a workshop sub-main to investigate a fault. After repair
                they restore at the main switch. A 7.5&nbsp;kW three-phase induction motor on the
                lathe restarts automatically (the contactor was left in the run state when supply
                went off, and the holding circuit re-energises on power return). An apprentice
                machinist standing at the lathe has their hand inside the chuck guard; the
                spindle starts; the machinist loses two fingers. Cause: no check that the motor\'s
                local isolator was OFF before upstream restoration.
              </>
            }
            doInstead={
              <>
                Before restoring upstream supply, walk the area, identify every motor / pump / fan
                / heating element on the affected circuit, ensure local isolators are OFF, brief
                anyone in the work area. Restore upstream, then deliberately restart each motor at
                its local isolator after confirming the area is clear. PUWER Reg 19 makes this a
                legal duty &mdash; isolation from sources of energy AND verification that restart
                will not cause injury.
              </>
            }
          />

          <Scenario
            title="Multi-source domestic CU fault investigation"
            situation={
              <>
                Customer reports a 30 mA RCD trip on the kitchen radial that resets briefly then
                trips again. The Hager CU has main switch incomer, 6 RCBOs feeding the circuits,
                AND a dedicated way feeding a Solis 4&nbsp;kW solar PV inverter (with a Givenergy
                9.6&nbsp;kWh battery on a separate way), AND a way feeding an Ohme 7&nbsp;kW EV
                charger. You need to investigate the kitchen circuit fault. Sun is shining, EV is
                plugged in, battery is charging.
              </>
            }
            whatToDo={
              <>
                (1) Brief the customer on the four-category impact &mdash; their freezer is on the
                affected circuit, they\'ll lose 60&ndash;90 minutes of supply. Agree the timing.
                (2) Make a list of all the energy sources: grid, PV, battery, EV. (3) Isolate the
                kitchen RCBO, lock-off, prove dead at the work point, start investigating. (4) For
                this fault you do NOT need to isolate the PV / battery / EV &mdash; their feeds
                run via separate ways and don\'t share conductors with the kitchen circuit. BUT
                check the kitchen circuit doesn\'t have a borrowed neutral from the PV feed (older
                installations sometimes do). If it does, escalate to multi-source isolation. (5)
                Find and rectify the fault. Retest with an MFT &mdash; insulation resistance, RCD
                trip-time, polarity. (6) Restore, document, brief the customer.
              </>
            }
            whyItMatters={
              <>
                Multi-source CUs are the new normal. The L3 apprentice has to think through the
                isolation for every energy source independently, decide which ones the fault
                investigation actually touches, and isolate accordingly. Over-isolating wastes
                customer time; under-isolating risks lethal contact with a source that\'s still
                live. The structured approach &mdash; identify every source, decide which the
                work touches, isolate those &mdash; is the L3 step-up from the L2 \'just flip the
                main switch' habit.
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
              <li><strong>Identify both ends</strong> — confirm the sub-main goes from upstream device A to downstream DB B (cable labelling, drawings, continuity test if cables are unmarked).</li>
              <li><strong>Isolate at upstream</strong> — operate the upstream MCCB / switch-fuse, lock-off with the manufacturer's kit + personal padlock + tag.</li>
              <li><strong>Prove dead at downstream</strong> — open the downstream DB cover, prove the GS38 two-pole on a known live source, test L-N / L-E / N-E at the downstream DB's incomer terminals. All zero before work starts.</li>
              <li><strong>Beware back-feed</strong> — on installations with on-site generation (PV, battery, generator) downstream of the sub-main, the downstream DB can back-feed even with the upstream isolated. Multi-source isolation procedures apply.</li>
              <li><strong>Re-prove at the end</strong> — after retest and restoration, re-prove the tester. The upstream device may have changed state during the work (someone may have operated it).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS 7671 Chapter 46 — the four switching functions</ContentEyebrow>

          <ConceptBlock
            title="Isolation, mechanical maintenance, emergency, functional — four jobs, four devices"
            plainEnglish="BS 7671 Chapter 46 was completely revised at A4:2026. It distinguishes four switching functions and the L3 apprentice needs to know which device is rated for which function. The MCB on the consumer unit is rated for isolation (Reg 462) AND functional switching (Reg 465), but a rotary functional switch on a piece of plant is NOT rated for isolation — using it for fault-diagnosis isolation is a Chapter 46 breach."
            onSite="Read the device label and the manufacturer data sheet. Look for the lock-off mechanism (mandatory for isolation per Reg 462.3); look for the breaking capacity rating; look for the BS reference number. If the device cannot lock off and prevent unintentional closure, it is not rated for isolation regardless of what the customer thinks. Isolate further upstream at a device that does meet Reg 462."
          >
            <p>
              The four functions, in plain L3 terms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolation (Reg 462)</strong> — disconnects every live conductor,
                designed to prevent re-energisation. Lock-off mandatory per Reg 462.3.
                Used for fault diagnosis, alteration, addition, periodic inspection.
                Examples: main switch, distribution board incomer with lock-off, RCBO
                with lock-off accessory.
              </li>
              <li>
                <strong>Switching off for mechanical maintenance (Reg 463)</strong> —
                hand-operable, lockable in OFF, prevents accidental re-energisation. Used
                when a non-electrician needs to work on plant (cleaning a fan, replacing
                a belt). Local plant isolators are typical examples.
              </li>
              <li>
                <strong>Emergency switching (Reg 464 / 465.1)</strong> — fast-acting,
                immediately accessible, removes danger from personnel. Mushroom-head red
                stop button on a workshop, kill switch on a hob, pump-stop at a
                refrigeration room.
              </li>
              <li>
                <strong>Functional switching (Reg 465)</strong> — normal operation
                control. Light switches, MCB toggle for everyday on / off, contactor
                control. Not rated for isolation; using one for isolation work is a
                Chapter 46 breach.
              </li>
            </ul>
            <p>
              Practical L3 check: before locking off, confirm the device is rated for
              isolation by reading the label and the manufacturer data sheet. If in doubt,
              isolate upstream at a device you know is rated. Cheap, generic
              functional-only switches still appear on legacy installations and they look
              identical to isolators from across the room.
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
              <li><strong>Isolation certificate fields</strong> — date, time on, time off, operative name, equipment isolated, isolation point, lock-off applied (yes/no, padlock serial), tester used (make / model / cal date), proven on (proving unit / known live source).</li>
              <li><strong>Fault-diagnosis record</strong> — symptom reported, hypothesis, tests performed, results, root cause identified, remedial action, retest results, customer briefing.</li>
              <li><strong>Photo evidence</strong> — most firms now expect a photo of the isolation (lock-off applied to the breaker, tester reading zero on the work-point) on the job sheet. Use the firm's job-management app (ServiceM8, Tradify, simPRO) or just send to the office WhatsApp.</li>
              <li><strong>Retention</strong> — fault-diagnosis records typically retained for 7 years (matches the EICR retention recommendation). Keep digital copies; paper degrades.</li>
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
              <li><strong>Dead-test sequence (BS 7671 643)</strong> — continuity of CPC and ring; insulation resistance L-L, L-E, N-E at 500 V (at 250 V if electronic loads can't be disconnected); polarity.</li>
              <li><strong>Live-test sequence</strong> — Zs at the furthest accessory (compare to design value); RCD trip-time at 1× and 5× rated trip current; RCD ramp test (verify trip current within 50-100% of rated value); functional test of any control gear.</li>
              <li><strong>Recording</strong> — the MFT (Megger MFT1741+, Fluke 1664FC) records every reading with timestamp; download via PowerSuite (Megger), FlukeView Forms (Fluke), or Patguard (Seaward) to produce a printable retest record.</li>
              <li><strong>Customer briefing on restoration</strong> — explain what was done, what tests passed, any follow-up needed (e.g. "the original fault was a damaged cable in the loft; I've repaired it and tested; the circuit is safe to use; you may want to consider a CU upgrade in the next 5 years because the existing one is from 1996").</li>
              <li><strong>Update certificates</strong> — if remedial work was done, issue a Minor Works Certificate (MWC) for single-circuit work or an EICR for multi-circuit. Issue a copy to the customer.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Single-circuit isolation in fault diagnosis is the eight-step JIB sequence: identify, switch off, lock-off, prove tester, test work-point, re-prove tester, carry out work, retest and restore.",
              "Multi-source installations have multiple isolation points — PV (AC + DC), EV, battery (AC + DC), generator. Each needs its own step. AC isolation alone leaves DC sources live.",
              "BS 7671 Reg 462 (isolation) requires lockable, designed-to-prevent re-energisation. Some older switches don't satisfy Reg 462 and need upstream isolation instead.",
              "Full installation isolation is needed when the fault is on the supply / cut-out / busbar, when circuit ID is unreliable, when the CU is compromised, or when removing the CU cover.",
              "Loss of supply has impact across four categories — other personnel, customer/client, public, building systems. Document the briefing before isolation, not after.",
              "Multi-operative isolation uses a multi-lock hasp (Brady 65681, Master Lock 421). Each operative attaches their own padlock; no operative removes anyone else\'s lock.",
              "Auto-restart of motors on supply restoration is a major cause of post-fault injuries. PUWER Reg 19 requires local isolators OFF before upstream restoration.",
              "Personal padlock + tag is a personal-safety device, not just a circuit-control device. Only the operative who applied the lock removes it. LOTO discipline is universal.",
            ]}
          />

          <Quiz title="Safe isolation in fault diagnosis — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 H&S framework
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Safe working procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
