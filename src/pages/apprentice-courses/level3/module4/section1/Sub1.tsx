/**
 * Module 4 · Section 1 · Subsection 1 — Dangers of electricity in fault diagnosis
 * Maps to C&G 2365-03 / Unit 303 / LO1 / AC 1.1
 *   AC 1.1 — "state the dangers of electricity in relation to fault diagnosis work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.1 — dangers in the nature of fault
 * diagnosis work.
 *
 * Frame: fault diagnosis is fundamentally different from installation. The
 * conditions that present hazards are themselves the symptoms — partial
 * isolation, induced voltage, residual charge, hidden parallel paths,
 * unverified circuit identification. Walks the seven categories of electrical
 * danger an L3 apprentice meets on diagnosis work.
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
  'Dangers of electricity in fault diagnosis (1.1) | Level 3 Module 4.1.1 | Elec-Mate';
const DESCRIPTION =
  'Why fault diagnosis is the most electrically dangerous task an electrician does — partial isolation, induced voltage, capacitive charge, hidden parallel paths, unverified circuits — and how the BS 7671 / EAWR / HSG85 framework keeps you alive.';

const checks = [
  {
    id: 'mod4-s1-sub1-induced',
    question:
      "You've isolated the lighting circuit at a Hager DB to chase a switch fault. Your Martindale VI-13800 reads 23 V L–E on the dead conductor before it falls to zero. Where's that voltage coming from?",
    options: [
      "The MFT is faulty.",
      "Induced voltage from a parallel cable run. Your dead lighting cable runs through the same ceiling void as the live ring final and the live shower circuit. Capacitive coupling and electromagnetic induction will leak a small voltage onto the dead conductor — it's not enough to kill on its own but it's enough to remind you the cable is in a live environment, and it can rise sharply if there's a fault on the parallel circuit.",
      "The DB is wired wrong.",
      "It's safe — ignore it.",
    ],
    correctIndex: 1,
    explanation:
      "Induced voltage is the silent hazard of fault diagnosis on a live installation. Cables sharing a containment system or a joist void with energised conductors will pick up a few tens of volts through capacitive coupling. The voltage is high impedance — a high-impedance multimeter (10 MΩ) reads it; a low-impedance two-pole tester (Martindale VI-13800) loads it down to near zero almost immediately and that's why GS38 prefers the two-pole. The hazard isn't the induced voltage itself, it's what happens if the parallel circuit faults to earth while you're working — that small induced trickle becomes a full-voltage shock path.",
  },
  {
    id: 'mod4-s1-sub1-capacitive',
    question:
      "You're diagnosing a faulty 230 V single-phase capacitor-start motor on a workshop extractor fan. The motor's been off for two minutes. What's the residual hazard before you put a meter on the windings?",
    options: [
      "Nothing — the motor's off.",
      "The run capacitor (typically 8–25 µF on a single-phase motor of that size) holds a charge. A 16 µF cap charged to 230 V peak (≈ 325 V) stores about 0.85 J — enough to throw your hand off a terminal if you bridge it. Standard discharge: short the capacitor terminals through a 10 kΩ resistor (NOT directly with a screwdriver — that pits the contacts and can weld). Test for residual voltage with the MFT before you touch.",
      "Just the dust.",
      "Heat from the windings.",
    ],
    correctIndex: 1,
    explanation:
      "Capacitive charge is one of the EAWR Reg 13 'reasonably foreseeable danger' hazards — capacitors in motor circuits, drive units, fluorescent ballasts, UPS systems, and electronic equipment will hold a lethal charge for minutes to hours after isolation. The discharge is brief but high-current. EAWR Reg 13 requires that conductors are 'either disconnected from every source of electrical energy OR otherwise rendered electrically safe'. A charged capacitor isn't 'electrically safe' even though it's disconnected. Bleed it through a discharge resistor, then verify with the meter.",
  },
  {
    id: 'mod4-s1-sub1-parallel',
    question:
      "An apprentice has 'isolated' a lighting circuit at the breaker, but a downstairs landing light is still working. What's gone wrong?",
    options: [
      "The breaker's faulty.",
      "There's a parallel supply path you didn't account for. Common causes — borrowed neutral from another circuit (very common in older installations where a sparks 'borrowed' a neutral from the ring final to feed a new lighting point), a cross-connection inside an old joint box, or a circuit labelled wrong at the DB and you've actually isolated something else. Bottom line — proving dead at every accessible point on the circuit is non-negotiable. The breaker label is a hint, not a guarantee.",
      "It's running on battery.",
      "It's the neighbour's circuit.",
    ],
    correctIndex: 1,
    explanation:
      "Parallel paths and borrowed neutrals are why you prove dead at the work point, not at the DB. EAWR Reg 14 makes you the one responsible for confirming dead — and 'I switched the right breaker off' is not a defence if you killed someone because the circuit had a borrowed neutral. The standard L3 procedure is: test, isolate, lock-off, prove dead at the work point with a GS38 two-pole tester proved on a known live source before AND after — every time, no shortcuts, no exceptions for 'small jobs'.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Why is fault diagnosis considered electrically more dangerous than installation work, even when you've been trained on both?",
    options: [
      "It's not — they're the same.",
      "On installation work the system arrives dead and stays dead until you hand it over. On fault diagnosis the system is the patient — it's already energised, the fault itself may be intermittent or unpredictable, and the very condition you're investigating may have created hidden parallel paths, damaged insulation, or a partially-broken protective conductor. You're working in a system whose state you don't fully know — that's the structural reason fault diagnosis sits higher on the risk register.",
      "Because you're holding more tools.",
      "Because customers watch you.",
    ],
    correctAnswer: 1,
    explanation:
      "The system being 'in fault' is itself the hazard amplifier. A fault means something has departed from the design — and that something might be a missing CPC, a damaged neutral, a wet insulation join, a half-tripped breaker, or a piece of plant that is still partially live through a back-feed. HSG85 (electricity at work — safe working practices) sets out the underlying principle: live or potentially-live working is only acceptable when dead working is unreasonable, AND a written risk assessment + permit + competent supervision are in place. Fault diagnosis is the canonical case where dead working isn't always possible (you can't diagnose voltage if there's no voltage), so the controls have to be proportionately tighter.",
  },
  {
    id: 2,
    question:
      "Electricity at Work Regulations 1989 (EAWR) Regulation 14 sets out the conditions under which live work is permitted. What are the three conjoint tests?",
    options: [
      "Just have a permit.",
      "Three tests, ALL of which must be satisfied: (a) it is unreasonable in all the circumstances for the conductor to be dead, AND (b) it is reasonable in all the circumstances for the work to be carried out live, AND (c) suitable precautions are taken to prevent injury. All three — not any one. Most fault diagnosis live working passes test (a) (you need voltage to measure) but tests (b) and (c) are where most risk-assessment failures sit.",
      "Wear gloves.",
      "Have a witness.",
    ],
    correctAnswer: 1,
    explanation:
      "EAWR Reg 14 is the legal foundation under which any live working — including diagnosis with the supply on — is permitted. Test (a) is normally easy to satisfy for diagnosis (you need the fault present to find it). Test (b) means the firm has weighed up the risk and concluded live working is justified — that's where the written risk assessment lives. Test (c) is the practical bit — GS38 instruments, insulated tools, defined work area, accompanied where required, PPE. Falling short on ANY of the three breaches Reg 14, regardless of intent.",
  },
  {
    id: 3,
    question:
      "You're investigating a fault on a TN-C-S (PME) installation that's tripping the 30 mA RCD on the kitchen radial. The customer says it trips when the kettle boils. What additional shock hazard does the supply earthing arrangement add?",
    options: [
      "None.",
      "Under TN-C-S the neutral and the protective earth share a combined PEN conductor between the transformer and the cut-out. A break in the PEN somewhere upstream (the DNO side, not the consumer side) lifts the neutral — and therefore the customer's bonded metalwork — to a fraction of phase voltage relative to true earth. While you're investigating an unrelated fault, the system can be carrying a hidden TT-equivalent hazard if the PEN is compromised. Always read the voltage L–N AND L–E AND N–E at the cut-out before you start; if N–E is more than a few volts, stop and call the DNO.",
      "It's safer than TT.",
      "The earth is more reliable.",
    ],
    correctAnswer: 1,
    explanation:
      "PEN faults (Open PEN) are the hidden killer on TN-C-S installations. A4:2026 reinforces protective measures (Protective Equipotential Bonding — PEB — at the cut-out, S-type RCDs upstream of certain installations) precisely because of this risk. A normal RCD won't see a PEN open, because there's no residual current — the lifted-neutral shock voltage flows through the bonding network as an L–E volt-drop, not as an imbalance. This is the L3-level supply-arrangement hazard the L2 apprentice didn't have to worry about.",
  },
  {
    id: 4,
    question:
      "What's the practical difference between a high-impedance multimeter (e.g. Fluke 117 on V AC, 10 MΩ input) and a low-impedance two-pole voltage tester (Martindale VI-13800) when you're proving dead?",
    options: [
      "No difference.",
      "The multimeter has 10 MΩ input impedance and will read induced voltages and 'phantom' voltages that aren't a real source — it can show 30–80 V on a dead conductor that has nothing dangerous on it, leading you to assume the circuit is live when it isn't (a false positive). The two-pole tester has low input impedance (typically a few kΩ) and 'loads' the circuit — phantom voltages collapse to zero, real sources hold. GS38 specifically prefers two-pole testers for proving dead because the low impedance gives an unambiguous answer.",
      "The multimeter is more accurate.",
      "Two-pole testers are obsolete.",
    ],
    correctAnswer: 1,
    explanation:
      "This is the core GS38 lesson: 'proving dead' isn't 'reading 0 V on a multimeter'. The multimeter is the wrong tool because it can't distinguish a live source from an induced ghost voltage. The two-pole tester (Martindale VI-13800, Fluke T130, Kewtech KT1780) is built for the job — low impedance, lamp + LED + audible indication, GS38 finger guards, ATEX-rated for hazardous areas. Carry a multimeter for measurement, carry a two-pole for proving dead.",
  },
  {
    id: 5,
    question:
      "An installation has a 1.2 kW thermal store with a 230 V immersion. After you isolate at the breaker and prove dead at the immersion terminal, you should still take what additional precaution before unscrewing the head?",
    options: [
      "None — it's dead.",
      "Treat the immersion element as a stored-thermal hazard even after electrical isolation — the water in the cylinder is at 60–80 °C and the element is in direct contact. The metal flange transfers heat for 10–15 minutes after isolation. Use a glove or an insulated spanner; don't grab the brass nut bare-handed. Separate from the electrical hazards, fault diagnosis on heating equipment carries a thermal-burn risk that's easy to forget once your head is in 'is it dead?' mode.",
      "Wear ear defenders.",
      "Wait three days.",
    ],
    correctAnswer: 1,
    explanation:
      "Fault diagnosis isn't only an electrical-shock problem. Heating elements, motors that have just stopped, battery banks, capacitors, hydraulic accumulators, pneumatic systems — all carry stored energy in non-electrical forms after electrical isolation. EAWR Reg 13 says the conductor or equipment must be made 'electrically safe' — but the broader HSWA Section 2 and 3 duties cover all the other forms of stored energy too. L3 fault diagnosis is the level at which apprentices start meeting the multi-energy hazards; spotting them is part of the competence test.",
  },
  {
    id: 6,
    question:
      "What's the EAWR Regulation 16 'competence' duty and why does it apply specifically to fault diagnosis?",
    options: [
      "It only applies to installation.",
      "EAWR Reg 16 — 'No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger... unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate'. Fault diagnosis sits squarely inside the regulation because the 'knowledge or experience' you need is exactly what stops you misinterpreting a meter reading and walking into an energised cable. An L3 apprentice does fault diagnosis under direct supervision — solo unsupervised diagnosis on live installations is JIB Approved Electrician work, not apprentice work.",
      "It's about training duration.",
      "Only the firm needs to be competent.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 16 is the 'competence' regulation and it bites hardest on fault diagnosis. The HSE has prosecuted multiple cases where an inadequately-supervised improver was given a fault to investigate, made a wrong assumption (typically about isolation or about supply identification), and was killed. As an L3 apprentice you have the knowledge to assist diagnosis under supervision; you do not yet have the knowledge to lead diagnosis on a live installation alone. Knowing where your authority stops is part of being competent.",
  },
  {
    id: 7,
    question:
      "A senior electrician hands you a Megger MFT1741 and says 'go and IR-test the lighting circuit at 500 V'. The circuit was reported faulty by the customer. Before you press Test, what dangers do you specifically need to think about?",
    options: [
      "Just press Test.",
      "Three layers. (1) Confirm the circuit is fully isolated AND proved dead with a separate two-pole tester — the MFT is a tester, not a prover. (2) Confirm there are no electronic loads on the circuit (LED drivers, presence sensors, dimmer modules) that 500 V will damage; if there are, disconnect them or test at 250 V on the MFT. (3) Confirm no parallel paths back to other circuits via shared neutrals; a 500 V test current finds those paths and can damage equipment on the OTHER circuit. The IR test is one of the highest-energy tests on the MFT and the rules around it are layered for a reason.",
      "Watch the screen.",
      "Hope for the best.",
    ],
    correctAnswer: 1,
    explanation:
      "Insulation resistance testing at 500 V is the most damage-prone test in the MFT's repertoire. Modern installations are full of electronics — LED drivers, dimmer plates, RCBOs with electronic detection, energy monitoring CTs, surge protection devices — and a 500 V test will damage them silently. BS 7671 643.3 reminds you to disconnect or shunt-out devices that can't handle the test voltage. The dangers are both to the apprentice (if isolation isn't watertight) and to the equipment (if parallel paths or sensitive loads are still connected). The L3 expectation is that you check all three layers before pressing the button.",
  },
  {
    id: 8,
    question:
      "The HSE's HSG85 'Electricity at work — safe working practices' lists the categories of electrical hazard. Which set captures the FAULT-DIAGNOSIS-specific hazards the L2 installation apprentice didn't have to worry about?",
    options: [
      "Just shock.",
      "Six fault-specific categories on top of the generic shock + arc + burn list: (1) hidden parallel paths and borrowed neutrals, (2) induced voltages from adjacent live circuits, (3) capacitive / inductive stored energy in equipment, (4) compromised protective conductors (CPC missing or high-resistance), (5) compromised supply earthing (open PEN, lost main earth), (6) unverified circuit identification (the breaker label says 'lights' but actually feeds the boiler). All six are present BECAUSE the system is in fault — the fault itself created or revealed the hazard.",
      "Only damp.",
      "Only height.",
    ],
    correctAnswer: 1,
    explanation:
      "These six are the L3 step-up. At L2 you assumed your CPC was intact, your circuit ID was right, your neutral was unique, your isolation was complete. At L3 fault diagnosis, ALL of those assumptions are explicitly suspended — you're investigating exactly because something has departed from the design, and you can't know in advance which assumption has broken. HSG85 frames this as 'always assume worst case until verified'. That's the mindset shift L3 fault-diagnosis training is built around.",
  },
];

const faqs = [
  {
    question: "Why can't I just rely on the breaker being off when I diagnose a fault?",
    answer:
      "Three reasons. First — the breaker label might be wrong (very common on older boards where circuits have been added or moved). Second — the circuit might have a borrowed neutral from another circuit, so the cable is dead L–E but live N–E. Third — the breaker itself might be faulty (a stuck contact in a worn MCB will switch off mechanically but stay electrically closed on one pole). EAWR Reg 14 makes proving dead at the work point — not at the DB — your duty as the operative. The standard procedure is test, isolate, lock-off, prove dead at the work point with a separate GS38 two-pole tester proved on a known live source before and after.",
  },
  {
    question: "What's a 'borrowed neutral' and why is it a fault-diagnosis nightmare?",
    answer:
      "A borrowed neutral is when a sparks at some point in the past wired a new circuit's neutral back to a different circuit's neutral terminal — usually because they ran out of capacity in a cable run and 'borrowed' from the nearest other neutral. It looks fine in normal operation. The problem appears the moment you isolate one of the two circuits — the OTHER circuit is still live, and current is now flowing through the 'isolated' circuit's neutral back to the supply. Worst case: you cut the dead-looking cable and 16 A appears across your cutters. Borrowed neutrals are illegal under BS 7671 (Reg 314.4 — each circuit shall be electrically separate from every other) but they exist in older installations and they're the classic 'I thought it was dead' shock cause.",
  },
  {
    question: "Is a multimeter ever acceptable for proving dead?",
    answer:
      "Not as the primary instrument. HSE GS38 is explicit — proving dead should be done with a two-pole voltage tester (low impedance, GS38 finger guards, lamp + LED + audible). A multimeter has the wrong impedance characteristic (too high — sees phantom voltages), wrong probe geometry (long uninsulated tips fail GS38), and wrong indication mode (a digit on a screen, not a definitive lit lamp). The multimeter is your measurement instrument; the two-pole is your proving instrument. The two are not interchangeable, and the cost of getting it wrong is fatal.",
  },
  {
    question: "How do I know when a fault diagnosis job is beyond my L3 apprentice level and I should call the supervisor?",
    answer:
      "Four red flags. (1) The fault involves the supply side of the cut-out — that's a DNO call, never an apprentice call. (2) The fault is on three-phase equipment you've not been trained on (motor controls, VSDs, large heating banks). (3) The customer description doesn't match what you find on the meter (e.g. they report 'all lights out' but you're reading 230 V on every lamp holder — that suggests a measurement error or a hidden hazard). (4) Anything where you've isolated, proved dead, started work, and a reading appears that you can't immediately explain. EAWR Reg 16 makes 'I'll work it out' a non-defence — competent supervision is a phone call away and using it is the L3 apprentice's defence.",
  },
  {
    question: "What's the difference between EAWR and HSWA — they both seem to apply?",
    answer:
      "HSWA (Health and Safety at Work etc. Act 1974) is the umbrella legislation — primary duty on the employer to provide a safe system of work and on the employee to take reasonable care. EAWR (Electricity at Work Regulations 1989) is made UNDER HSWA and is the specific electrical-work code. HSWA gives you the headline duty; EAWR gives you the regulations that translate it into electrical practice — Reg 4 (systems shall be safe), Reg 13 (dead working is the default), Reg 14 (live working only with three tests passed), Reg 16 (competence). On any prosecution, the HSE charges under EAWR for the specific failure and HSWA for the umbrella failure together.",
  },
  {
    question: "Can I use an LED indicator screwdriver to prove dead?",
    answer:
      "No. The 'neon' or 'LED' indicator screwdrivers (sometimes called test screwdrivers) work by passing a small current through your body to ground to light an internal lamp. They're capacitively coupled and will light on induced voltages and phantom voltages while missing real low-voltage hazards. They're not GS38-compliant and they've been the cause of multiple fatalities where an electrician thought a circuit was dead because the screwdriver didn't light. They have one legitimate use — a quick first-pass continuity check on a known-live circuit (e.g. 'is this socket live before I plug in?'). They are NEVER the instrument that confirms dead before you put your hand on a conductor.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 4 · Section 1 · Subsection 1"
            title="Dangers of electricity in fault diagnosis"
            description="Fault diagnosis is structurally more dangerous than installation — the system is the patient, the fault may have created hidden parallel paths, induced voltages and compromised protective conductors. Walks the seven categories of electrical danger an L3 apprentice meets on diagnosis work and the EAWR / HSG85 framework that keeps you alive."
            tone="emerald"
          />

          <TLDR
            points={[
              "Fault diagnosis is more dangerous than installation because the very condition you're investigating may have created the hazard — borrowed neutrals, induced voltage, compromised CPCs, lost neutral.",
              "EAWR 1989 Reg 13 says dead working is the default. Reg 14 sets three conjoint tests for when live working is allowed. Reg 16 says you only do work you're competent to do — under supervision if not.",
              "Always prove dead at the WORK POINT with a GS38 two-pole tester proved on a known live source BEFORE and AFTER. The breaker label is a hint, not a guarantee.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the dangers of electricity that are specific to fault diagnosis work — induced voltage, capacitive charge, parallel paths, borrowed neutrals, compromised protective conductors, open PEN.",
              "Explain why EAWR 1989 Reg 13 (dead working as the default) and Reg 14 (three conjoint tests for live working) apply to every fault diagnosis decision.",
              "Distinguish a high-impedance instrument (multimeter, 10 MΩ) from a low-impedance two-pole tester (GS38-compliant) and state when each is the right tool.",
              "Describe the additional supply-side hazards of TN-C-S (PME) installations including open PEN faults that a normal RCD does not detect.",
              "Recognise stored energy hazards in equipment after electrical isolation — capacitors, batteries, thermal stores, hydraulic accumulators.",
              "Apply EAWR Reg 16 (competence) to know when a fault diagnosis task exceeds L3 apprentice authority and requires escalation.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub matters</ContentEyebrow>

          <ConceptBlock
            title="Fault diagnosis is structurally more dangerous than installation"
            plainEnglish="On installation work the system arrives dead and stays dead until commissioning. On fault diagnosis you're working with an installation that's already energised, the fault is the symptom, and the very condition you're investigating may have created hidden hazards — a missing CPC, a damaged neutral, a wet insulation join, a borrowed neutral from a circuit you didn't know existed."
            onSite="HSE prosecution data shows fault diagnosis and maintenance accounts for a disproportionate share of fatal electrical accidents to electricians — the system being 'in fault' is itself the hazard amplifier. That's why the L3 syllabus elevates the safe-working content above what L2 covered."
          >
            <p>
              The L3 step-up rests on six fault-specific hazards on top of the generic shock, arc-flash and burn risks the L2 apprentice already knows about:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hidden parallel paths and borrowed neutrals</strong> — a circuit you've isolated may still carry current through a shared neutral with another live circuit.</li>
              <li><strong>Induced voltages</strong> — capacitive and inductive coupling from adjacent live cables raises a few tens of volts on the dead conductor.</li>
              <li><strong>Stored energy</strong> — capacitors in motor circuits, drives, fluorescent ballasts, UPS systems hold lethal charge for minutes after isolation.</li>
              <li><strong>Compromised protective conductors</strong> — a CPC that\'s broken or high-resistance won\'t trigger an RCD on a fault but DOES allow exposed metalwork to rise to phase voltage.</li>
              <li><strong>Compromised supply earthing</strong> — open PEN on TN-C-S (PME) lifts customer earth toward phase voltage. RCDs don\'t detect it.</li>
              <li><strong>Unverified circuit identification</strong> — a circuit labelled \'lights' may actually feed the boiler. The label is a starting hypothesis, not a guarantee.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The legal framework — EAWR + HSWA + GS38</ContentEyebrow>

          <ConceptBlock
            title="EAWR 1989 — three regulations you live by every fault job"
            onSite="Every fault diagnosis breach the HSE prosecutes lands on at least one of EAWR Regs 13, 14 or 16. Knowing how the three interlock isn't legal trivia — it's how you defend your own decisions on site when something goes wrong."
          >
            <p>
              The three EAWR regulations that frame fault work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reg 13 — dead working is the default.</strong> No work shall be carried out on or near a conductor that\'s been or could become live unless \'either it is disconnected from every source of electrical energy OR otherwise rendered electrically safe\'.</li>
              <li><strong>Reg 14 — three conjoint tests for live working.</strong> Live work is permitted only when (a) it\'s unreasonable for the conductor to be dead, AND (b) it\'s reasonable in all the circumstances for the work to be carried out live, AND (c) suitable precautions are taken. ALL three.</li>
              <li><strong>Reg 16 — competence.</strong> No person shall be engaged in work activity where technical knowledge or experience is necessary to prevent danger unless they possess that knowledge or are under appropriate supervision.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 14"
            clause={
              <>
                "No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless &mdash; (a) it is unreasonable in all the circumstances for it to be dead; (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; AND (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
              </>
            }
            meaning={
              <>
                Three conjoint tests, all of which must be satisfied before live working is permitted. Fault diagnosis usually clears (a) by necessity (you need voltage to measure). Test (b) requires a documented risk assessment justifying live over dead. Test (c) is the practical layer &mdash; GS38 instruments, insulated tools, defined work area, accompanied where required. Falling short on any one breaches the regulation.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (S.I. 1989/635), Reg 14."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Induced voltage — the silent ghost</ContentEyebrow>

          <ConceptBlock
            title="Why a \'dead' cable can read 30–80 V on a multimeter"
            plainEnglish="When two cables run in the same containment or joist void, the live cable couples electromagnetically and capacitively to its dead neighbour. The induced voltage is high impedance — there\'s no real source behind it — so a high-impedance multimeter (10 MΩ) reads it as a real voltage when it isn\'t a real shock hazard. A low-impedance two-pole tester loads it down to zero in a fraction of a second."
            onSite="On a typical domestic landing where the lighting cable runs alongside the ring final and the shower cable, you\'ll routinely read 20–60 V on the dead lighting conductor with a Fluke 117. Switch to your Martindale VI-13800 and the indication drops to zero. That\'s the GS38 difference in practice."
          >
            <p>
              The danger isn\'t the induced voltage itself — it\'s three-fold:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Misinterpretation</strong> — apprentice sees 60 V on the meter, assumes the breaker is wrong, walks away from a circuit that is actually safe to work on.</li>
              <li><strong>Escalation under fault</strong> — if the parallel live circuit develops an L–E fault while you\'re working, the induced trickle becomes a full-voltage path through your dead cable.</li>
              <li><strong>False-positive isolation</strong> — apprentice sees 5 V on the meter, dismisses it as \'induced', and starts work. But the 5 V is actually a real source from a borrowed neutral. The two-pole tester would have made the difference clear.</li>
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

          <ContentEyebrow>Stored energy — capacitors, batteries, thermal stores</ContentEyebrow>

          <ConceptBlock
            title="Electrical isolation isn't the same as 'electrically safe'"
            onSite="Every motor with a run cap (single-phase induction motors — workshop extractors, kitchen extractors, cooling fans, CH circulator pumps), every fluorescent fitting with a power-factor cap, every drive unit, every UPS, every emergency lighting battery pack — all hold stored energy after the supply is isolated. EAWR Reg 13 requires the conductor or equipment to be 'electrically safe', not just 'disconnected'. Discharging stored energy is part of making it safe."
          >
            <p>
              The standard discharge routine for site-encountered stored energy:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Capacitors</strong> — wait the manufacturer's bleed-down period (usually 1–5 minutes), then short the terminals through a 5–10 kΩ resistor with insulated leads. Verify with the meter. NEVER short a capacitor with a screwdriver — the discharge arc pits the contacts and can weld the metal.</li>
              <li><strong>Battery banks (UPS, emergency lighting)</strong> — isolation switches the load, NOT the battery. The battery remains energised until physically disconnected. Treat every UPS battery cabinet as live until proved dead at every cell terminal.</li>
              <li><strong>Thermal stores</strong> — cylinders carry stored heat for hours after the immersion is isolated. Burn risk is real — use insulated tools, gloves.</li>
              <li><strong>Drive capacitors (VSDs, soft starters)</strong> — much larger capacitance than motor caps. Manufacturer\'s manual gives the bleed-down period (typically 5–15 minutes). Pre-discharge bleed resistors are usually built in but verify with the meter.</li>
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

          <ContentEyebrow>Compromised supply earthing — TN-C-S open PEN</ContentEyebrow>

          <ConceptBlock
            title="Why an open PEN on TN-C-S is the L3 hazard you didn\'t meet at L2"
            plainEnglish="On TN-C-S (the most common UK supply arrangement), the neutral and protective earth share a combined PEN conductor between the transformer and your cut-out. If that PEN breaks anywhere upstream, your customer\'s earth bonding rises toward phase voltage relative to true earth. RCDs don\'t see it (no residual current). The first sign is a tingle on a metal kitchen tap or a 30+ V reading N–E at the cut-out."
            onSite="A4:2026 reinforced the protective measures around TN-C-S precisely because of open PEN — Protective Equipotential Bonding (PEB) at the cut-out, S-type RCDs upstream of EV chargers (because the EV connects the customer\'s bonded metalwork to the chassis of a vehicle that someone might be touching from true earth). Knowing the hazard exists is half the protection."
          >
            <p>
              The L3 fault diagnosis routine on TN-C-S installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Take an L–N, L–E and N–E reading at the cut-out before any work. L–E should equal L–N (within a volt or two). N–E should be near zero.</li>
              <li>If N–E reads more than 5 V — STOP. Possible PEN compromise. DNO call, not your job.</li>
              <li>If voltages all check out, proceed — but log them on the job sheet so there\'s a record of the supply state at the start of the visit.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.4.1"
            clause={
              <>
                "In a TN system, the integrity of the earthing of the installation depends on the reliable and effective connection of the PEN or PE conductors to Earth. Where the earthing is provided from a public or other supply system, compliance with the necessary conditions external to the installation is the responsibility of the distributor."
              </>
            }
            meaning={
              <>
                On every TN-C-S supply you investigate, the reliability of the earth path lives outside the consumer&apos;s installation &mdash; in the DNO&apos;s PEN. The Regulation makes that plain: the distributor owns the upstream integrity and you have no way of testing it from the customer side. That&apos;s why an unexpected N&ndash;E reading at the cut-out is a STOP-and-call moment, not something you try to chase yourself.
              </>
            }
            cite="Source: BS 7671:2018 incorporating Amendment 4:2026 — Reg 411.4.1, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Trusting the breaker label without proving dead at the work point"
            whatHappens={
              <>
                Apprentice flips the breaker labelled "kitchen sockets", goes upstairs to the
                ceiling void, cuts a cable to make a join. The label was wrong &mdash; the breaker
                they actually flipped was the spare. The cable they cut was the kitchen ring,
                still live at 230 V. The cutters arc, the breaker upstairs trips, the customer
                hears a bang, the apprentice is lucky to walk away with a singed hand instead of a
                fatality. The post-incident investigation finds the firm in breach of EAWR Reg 14
                (no safe system of work) and Reg 16 (inadequate supervision of an apprentice).
              </>
            }
            doInstead={
              <>
                Test, isolate, lock-off, prove dead at the work point with a GS38 two-pole tester
                (Martindale VI-13800, Fluke T130, Kewtech KT1780) proved on a known live source
                BEFORE and AFTER the test &mdash; every time. The work-point test is the one that
                counts. The breaker label is a hypothesis you verify with the tester. No
                exceptions, no shortcuts, no "this is a small job".
              </>
            }
          />

          <CommonMistake
            title="Reading 60 V on a multimeter and assuming the breaker is wrong"
            whatHappens={
              <>
                Apprentice has correctly isolated the lighting circuit at the DB. Probes the cable
                at the switch with a Fluke 117 &mdash; reads 58 V L&ndash;E. Assumes the breaker
                label is wrong, opens the DB to investigate, and starts probing live conductors at
                the busbar to find which breaker is "really" the lighting. Now in unnecessary live
                work, in a live consumer unit, with no permit, no risk assessment, no supervision
                and an instrument that doesn\'t meet GS38 for live work. EAWR Reg 14 breach
                wholesale.
              </>
            }
            doInstead={
              <>
                When a multimeter shows a small voltage on a circuit you\'ve isolated, repeat the
                test with a low-impedance two-pole tester. If the two-pole says zero, the
                multimeter was reading induced voltage and the circuit is genuinely dead. If the
                two-pole says voltage, you have a real source &mdash; STOP, escalate to the
                supervisor, and don\'t open the DB on your own initiative.
              </>
            }
          />

          <Scenario
            title="The faulty downlight that\'s still live"
            situation={
              <>
                Customer reports a downlight in the kitchen has stopped working. You isolate the
                lighting circuit at the Hager DB, lock-off, prove dead at the switch with your
                Martindale VI-13800, and start to remove the failed lamp. As you withdraw the GU10
                connector you feel a tingle on the chrome ring of the housing.
              </>
            }
            whatToDo={
              <>
                Stop. Do not touch the housing again. Re-test the connector and the housing with
                the two-pole tester &mdash; if it reads voltage, you have a parallel path. The
                most common cause: the lighting circuit shares a neutral with the under-cabinet
                LED strip on a separate circuit that\'s still live, OR the housing is bonded to a
                gas / water service that\'s at a different potential because of an open PEN
                upstream. Move the cable safely to one side, test L&ndash;N, L&ndash;E and
                N&ndash;E at the cut-out. If anything other than the expected 230&nbsp;V L&ndash;E
                shows up, call the supervisor &mdash; this is a supply-side or
                cross-circuit-neutral problem, not an apprentice fix.
              </>
            }
            whyItMatters={
              <>
                The "dead circuit that gives you a tingle" is the canonical L3 fault-diagnosis
                hazard. Almost every reported electrocution of an electrician on diagnosis work
                comes back to a parallel path the operative didn\'t know about &mdash; borrowed
                neutral, shared neutral, lost main earth, open PEN, or wrong circuit
                identification. Knowing to STOP at the first unexpected reading, rather than push
                through assuming "it\'s just induced", is the competence test EAWR Reg 16 is
                actually checking.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Compromised CPC — the silent killer</ContentEyebrow>

          <ConceptBlock
            title="A broken or high-resistance CPC defeats the protection you assumed was there"
            plainEnglish="The circuit protective conductor (CPC) is the green/yellow you bond every accessory to. If it's broken, corroded, or has a high-resistance joint somewhere along its length, an L-E fault won't drive enough current to trip the MCB or RCD — and the exposed metalwork it bonds rises to phase voltage. Standard fault-diagnosis check: R1+R2 with the Megger MFT1741+ at the end of every dead circuit; verify against design value. Anything more than +50% of expected = suspect joint."
            onSite="Common CPC failure points: green/yellow tail crushed inside a back-box (clip-fix or screw onto braid); aluminium-on-copper corrosion at older twin-and-earth terminations; loose grub screw in a junction box; CPC spurred onto an SWA gland that has lost mechanical bond; CPC accidentally disconnected during a previous accessory change. The Megger MFT1741+ continuity test (200 mA, autoranging) reads R1+R2 in seconds; a Kewtech KT64+ does the same with a wander-lead mode for long radials."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R1+R2 expected ranges</strong> — a 32 A 4 mm² ring final at 30 m: R1+R2 ≈ 0.45 Ω. A 6 A 1 mm² lighting radial at 15 m: ≈ 0.40 Ω. Compare to BS 7671 Appendix 8 / on-site guide values.</li>
              <li><strong>Live-only check</strong> — Zs at the furthest accessory should match (R1+R2 + Ze). Big mismatch = broken CPC somewhere between origin and accessory.</li>
              <li><strong>Touch-voltage test</strong> — Megger MFT1741+ "touch voltage" mode reports the voltage that would appear on the exposed metalwork during an L-E fault. Above 50 V AC = unsafe even with RCD protection.</li>
              <li><strong>Diagnosis routine</strong> — split the circuit at the midpoint, retest each half, walk it back to the joint with the elevated resistance. Don't trust visual inspection alone — hidden CPC breaks inside conduit are common.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Working space, lighting and access</ContentEyebrow>

          <ConceptBlock
            title="EAWR Reg 15 — adequate working space, access and lighting"
            plainEnglish="Reg 15 makes the firm provide enough working space, enough access, and enough lighting to do the work safely. On fault diagnosis this matters more than installation — you're often investigating in cramped voids, dark cellars, plant rooms with no fixed lighting, or a CU mounted behind a freezer."
            onSite="The L3 expectation is to recognise when the working environment doesn't satisfy Reg 15 and to STOP and address it — bring temporary lighting (Unilite SP-750R rechargeable LED, Milwaukee M18 ROVER), clear obstructions (move the freezer, remove the boiler casing access panel), or escalate if the access is genuinely unsafe. A CU you can't reach safely is a CU you don't work on alone."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Working space</strong> — at least 700 mm clear in front of any LV switchgear (HSG85 guidance), with no obstructions that would prevent rapid retreat in a fault.</li>
              <li><strong>Access</strong> — safe approach AND safe egress, no climbing over stored material, no balancing on unstable surfaces. Use podium steps (Youngman Boss / Werner) for ceiling-void work, never a stepladder.</li>
              <li><strong>Lighting</strong> — minimum 200 lux at the work face for general electrical work; 500 lux for fine terminations. Clip-on LED inspection lamps (Milwaukee 2367-20, Unilite PS-FL12) bring the lux level up where fixed lighting is poor.</li>
              <li><strong>Temperature / damp</strong> — humid plant rooms or unheated lofts increase shock risk (skin resistance drops). Dry the work area where possible; use a vapour-barrier cloth on damp masonry.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations) and Regulation 513.1 (accessibility)"
            clause={
              <>
                "No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
              </>
            }
            meaning={
              <>
                Working space is a regulation, not a nice-to-have. If you&apos;ve been sent to investigate a fault on a CU stuffed behind a freezer or a switch panel jammed against a stud wall, you&apos;ve already got a Reg 132.16 / 513.1 problem before you&apos;ve picked up a meter — the existing access conditions are inadequate for the work proposed. Recognise it, log it on the job sheet, and address access before testing &mdash; not during.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 (verbatim) and Regulation 513.1."
          />

          <SectionRule />

          <ContentEyebrow>Arc-flash on fault investigation</ContentEyebrow>

          <ConceptBlock
            title="The arc-flash hazard is highest at the cut-out and the main switchgear"
            plainEnglish="An arc-flash is the explosive plasma release that follows a phase-to-phase or phase-to-earth short on energised equipment. Even a 230 V single-phase fault at a UK domestic cut-out can release 1-3 cal/cm² of incident energy — enough to cause second-degree burns to unprotected skin. On commercial 400 V three-phase the figures climb to 8-25 cal/cm². The PPE matrix in Sub 1.2 is what stands between you and the burn."
            onSite="The L3 fault investigator who works on cut-outs, main switches or distribution boards is in the highest-arc-flash zone of the installation. Standard precaution: minimise the time the cover is off, never work close to the busbar with metallic tools (always insulated to IEC 60900 / 1000 V AC, e.g. Wera Kraftform Kompakt VDE), keep your face out of the plane of the busbar, and wear an arc-flash face shield (Oberon AFW or NSA AS-50) for any work that requires opening a live enclosure."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sources of arc</strong> — dropped tool across busbars, loose terminal arcing under load, insulation failure on a cable inside switchgear, water ingress bridging phases.</li>
              <li><strong>Arc-flash boundary</strong> — the distance at which incident energy drops to 1.2 cal/cm² (the threshold for second-degree burn). For a 230 V CU: ~600 mm. For a 400 V commercial DB: 1.0-1.5 m. Outside the boundary, base PPE; inside, full arc-rated kit.</li>
              <li><strong>Working position</strong> — stand to the side of the enclosure, never directly in front. The arc-blast direction is forwards out of the open door. A side-stance reduces the dose by 60-80%.</li>
              <li><strong>Single-handed working</strong> — when probing inside live enclosures keep your other hand in your pocket. Hand-to-hand current path is the lethal one (across the chest); single-handed limits the path to ground via your boots.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Fault diagnosis is structurally more dangerous than installation because the fault itself may have created hidden hazards — borrowed neutrals, induced voltage, compromised CPCs, open PEN.",
              "EAWR Reg 13 says dead working is the default. Reg 14 sets three conjoint tests for live working. Reg 16 says you only do work you're competent to do — under supervision if not.",
              "Always prove dead at the WORK POINT with a GS38 two-pole tester (Martindale VI-13800, Fluke T130, Kewtech KT1780) proved on a known live source BEFORE and AFTER. Every time.",
              "A multimeter is a measurement instrument, not a proving instrument. Its 10 MΩ input reads induced and phantom voltages as if they were real. The two-pole's low impedance loads them out.",
              "Stored energy in capacitors, drives, UPS batteries and thermal stores survives electrical isolation. Discharge through a resistor, never with a screwdriver, and verify with the meter.",
              "TN-C-S open PEN is the supply-side hazard a normal RCD doesn't detect. Read N–E at the cut-out before any work — anything more than a few volts means STOP.",
              "Borrowed neutrals are illegal under BS 7671 314.4 but exist in older installations. They're the classic 'I thought it was dead' cause of electrician shock.",
              "Knowing where your apprentice authority stops — and calling the supervisor — is part of the EAWR Reg 16 competence duty, not a sign of weakness.",
            ]}
          />

          <Quiz title="Dangers of electricity in fault diagnosis — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 H&S framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
