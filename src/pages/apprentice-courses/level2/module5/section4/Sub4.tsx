/**
 * Module 5 · Section 4 · Subsection 4 — BS 7671 514.13 warning notices: labels as comms
 * SUPPLEMENTARY content — extends LO2 of Unit 210 but is not directly mapped to a
 * 210 AC. Builds the install-as-communication layer.
 *
 * Frame: BS 7671 treats labels and notices as a regulated form of communication.
 * The install talks to whoever opens the CU next — the customer in an emergency,
 * the next electrician on a fault visit, the EICR engineer in five years' time.
 * Missing or illegible labels are non-conformances on EICR and a real safety
 * issue when somebody needs to find the main earth in a hurry.
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
  'BS 7671 514.13 warning notices — labels as communication | Level 2 Module 5.4.4 | Elec-Mate';
const DESCRIPTION =
  'Main earthing notices, RCD test reminders, mixed-supply warnings, isolator labels and CU schematics — the regs treat the install itself as a communication channel.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s4-sub4-main-earth-label',
    question:
      "You're carrying out a CU change in a domestic property. The main earthing terminal is in the meter cupboard, separate from the CU. The original installer put a 'Safety Electrical Connection — Do Not Remove' label on the CU only. Is that compliant with BS 7671 514.13.1, and what should you do?",
    options: [
      "Yes — one label anywhere is fine.",
      "No. Reg 514.13.1 requires the warning notice 'in a visible position at or near the point of connection of every earthing conductor to an earth electrode' AND at every bonding-conductor connection AND at the main earthing terminal where it's separate from the main switchgear. Each location needs its own notice. The fix on this job: fit a fresh BS 951-style notice at the main earthing terminal in the meter cupboard, and keep one at every bonding clamp (gas, water).",
      "No — but you don't need to fix it, the previous installer's responsibility.",
      "Yes — domestic doesn't need labels.",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 Reg 514.13.1 lists three locations where the 'Safety Electrical Connection — Do Not Remove' notice MUST be fixed: at every earthing conductor connection to an earth electrode, at every bonding conductor connection to an extraneous-conductive-part, AND at the main earthing terminal where it's separate from the main switchgear. The notice is BS 951-aligned and is normally provided on the earthing/bonding clamp itself. Missing notices are non-conformances on an EICR (typically C3) and present a real safety risk because someone unfamiliar with the install might disconnect the conductor thinking it's redundant.",
  },
  {
    id: 'mod5-s4-sub4-pv-mixed-supply',
    question:
      "You're inspecting a property that has solar PV with battery storage feeding back through an inverter to the CU. The CU has a normal main switch but no notice indicating multiple supplies. What does BS 7671 require, and why does it matter?",
    options: [
      "Nothing — the main switch is enough.",
      "A warning notice indicating the presence of additional/alternative supplies is required at or adjacent to the consumer unit. The customer (or any future electrician) needs to know that opening the main switch DOESN'T isolate everything — the PV inverter and battery storage can still energise the bus-bar from the load side. The BS 7671 514 series covers this and the IET Code of Practice for Solar PV adds layout guidance for the notice.",
      "Just a sticker showing the inverter location.",
      "Nothing — the inverter has its own internal switch.",
    ],
    correctIndex: 1,
    explanation:
      "Mixed-supply notices have grown in importance with the rise of PV, battery storage and EV chargers. The principle: anyone working on the install needs to know that more than one supply can energise the system, and what to isolate. BS 7671 Reg 514.15 covers warning notices for alternative or additional supplies, and the IET Code of Practice for Grid-Connected Solar PV adds the practical layout guidance. Missing the notice is both a regulation breach and a real safety hazard — an electrician opening the main switch and assuming the install is dead can be electrocuted by back-feed from the inverter or battery.",
  },
  {
    id: 'mod5-s4-sub4-cu-schematic',
    question:
      "After a domestic CU change you fit individual circuit labels but no overall schematic inside the CU door. Is that enough?",
    options: [
      "Yes — labels per circuit are what matters.",
      "Not really. BS 7671 Reg 514.9.1 requires a diagram, chart or table indicating the type and composition of each circuit, the method of protection, and the information needed to identify protective devices. Even with the simplified domestic exception, a schematic / circuit list inside the CU door is best practice — it gives any future electrician (or customer) a map of the install. Without it the apprentice's circuit labels are isolated facts; the schematic is the map.",
      "No — the schematic must be on the kitchen wall.",
      "Yes — diagrams are only for commercial.",
    ],
    correctIndex: 1,
    explanation:
      "Reg 514.9.1 requires a diagram, chart or table — laminated A4 inside the CU door is the typical domestic answer. The 'simplified equivalent' exception for domestic premises means it doesn't have to be a full CAD single-line diagram, but it does need to show what's there. A circuit-by-circuit list with descriptions ('R1 — kitchen ring', 'L1 — upstairs lighting') plus the protective devices is the minimum. The schematic is what an EICR engineer reads first when they open the CU — without it they're working in the dark.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which BS 7671 regulation requires the 'Safety Electrical Connection — Do Not Remove' notice at the main earthing terminal and at every bonding-conductor connection?",
    options: [
      "Reg 411.3.2",
      "Reg 514.13.1 — 'A warning notice clearly and durably marked with the words \"Safety Electrical Connection — Do Not Remove\" shall be securely fixed in a visible position at or near (a) the point of connection of every earthing conductor to an earth electrode, and (b) the point of connection of every bonding conductor to an extraneous-conductive-part, and (c) the main earthing terminal, where separate from main switchgear.'",
      "Reg 132.16",
      "Reg 644.1.1",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 514.13.1 is the headline label reg. The wording is verbatim from BS 7671:2018+A2:2022 (the current edition at the time of writing). The notice is BS 951-aligned and is normally provided on the earthing/bonding clamp itself. Three locations: every earth electrode connection, every bonding clamp on an extraneous-conductive-part, and the main earthing terminal where separate from main switchgear.",
  },
  {
    id: 2,
    question:
      "Why does BS 7671 treat warning notices as 'communication' rather than just labels?",
    options: [
      "It doesn't — labels are decorative.",
      "Because the install is a long-lived asset that will outlast the original installer's involvement. Notices communicate critical information — main earth location, RCD test interval, mixed supplies, isolator function — to whoever interacts with the install in future, including the customer in an emergency, the next electrician on a fault visit, and the EICR engineer in five years' time. The labels are how the install talks to people when the original installer isn't there.",
      "Because the IET enjoys writing rules.",
      "Because labels are easier to read than the regs book.",
    ],
    correctAnswer: 1,
    explanation:
      "The 'install as comms' framing is what justifies the rigour BS 7671 applies to labels. An EIC tells you what was tested on day one; a label tells you what's there now and what to do next. The customer in an emergency doesn't have your phone number to hand but they can read a label on the CU door. Labels also feed into EICR — missing or illegible labels are typically a C3 (improvement recommended) but missing main-earth notices that hide a safety connection can escalate to C2.",
  },
  {
    id: 3,
    question:
      "What does the RCD test notice (Reg 514.12.2 area) typically tell the user?",
    options: [
      "Nothing — it's just decorative.",
      "That the installation incorporates an RCD, that the user should test it quarterly (or six-monthly per the older guidance) by pressing the test button, that the RCD should trip when tested, and that if it doesn't trip the user should call a competent electrician immediately. Maintains the protection by catching RCD failure before it matters.",
      "How to wire a new circuit.",
      "Where the cut-out is.",
    ],
    correctAnswer: 1,
    explanation:
      "The RCD test notice is the user-facing communication that puts the responsibility for periodic testing on the customer. Without the notice the customer doesn't know they're supposed to do anything — and an RCD that has silently failed (e.g. due to internal contact welding) provides no protection at the moment of need. The traditional notice quotes 6-monthly testing; many modern RCDs are tested less frequently in practice but the principle of user-test-this stands.",
  },
  {
    id: 4,
    question:
      "On a domestic CU change, what's the minimum BS 7671-compliant label set you should leave behind?",
    options: [
      "Just a circuit list.",
      "Main earthing terminal notice (514.13.1), bonding-clamp notices on gas and water bonds (514.13.1), RCD test notice (in the 514 series), single-line diagram or circuit list inside the CU door (514.9.1), individual circuit identification on each MCB/RCBO, isolator labelling, and a warning notice for any additional or alternative supply (PV, battery, generator) where applicable.",
      "Just the cert.",
      "Nothing — labels are optional in domestic.",
    ],
    correctAnswer: 1,
    explanation:
      "The minimum domestic label set covers the regs in the 514 series — main earth, bonding clamps, RCD test, schematic, circuit identification, isolator labels and additional-supply warning where applicable. Most consumer units now ship with a starter pack of labels but you'll want a label-printer or pre-printed BS 951 labels for the earthing/bonding notices. Missing labels are non-conformances on the EICR and a real safety issue.",
  },
  {
    id: 5,
    question:
      "What's the purpose of a single-pole device labelling requirement (Reg 514.16.1)?",
    options: [
      "To make CUs look professional.",
      "To indicate that a device (e.g. a fuse, switch or MCB) only interrupts the line conductor, not the neutral. Important for any future electrician working on the circuit — the neutral may still be live relative to earth even with the device open, so isolation procedures (lock-off, prove dead) must take account of the single-pole nature.",
      "To indicate the device's age.",
      "To indicate the device's price.",
    ],
    correctAnswer: 1,
    explanation:
      "Single-pole devices (most domestic MCBs/RCBOs) only break the line conductor — the neutral remains connected through the bus-bar. For an electrician arriving to work on the circuit later, this matters because: (1) the neutral can still carry current from other circuits sharing the supply, and (2) under fault conditions or with a wandering neutral, the neutral can rise to dangerous voltage relative to earth. The label is the comms channel that tells the next person what they're dealing with.",
  },
  {
    id: 6,
    question:
      "What should the warning notice for additional or alternative supplies (Reg 514.15 area) make clear?",
    options: [
      "Nothing specific.",
      "That the installation has more than one source of supply (mains plus PV, battery, generator, etc.), that opening the main switch does NOT isolate the entire installation, what additional isolation is needed, and where each isolation point is located. Critical for anyone working on the system because back-feed from PV/battery can energise the install with the main switch open.",
      "Only the location of the inverter.",
      "Only the rating of the additional supply.",
    ],
    correctAnswer: 1,
    explanation:
      "Mixed-supply notices have become essential as PV, battery storage and EV bidirectional chargers proliferate. The notice must communicate: more than one supply present, what each supply is, where each isolation is located, the procedure to fully isolate the installation. The IET Code of Practice for Solar PV gives layout guidance; the BS 7671 514.15 area sets the regulation. Missing the notice is both a code C2 on EICR and a serious safety hazard.",
  },
  {
    id: 7,
    question:
      "What does the regulation require for the durability and legibility of warning notices?",
    options: [
      "Pencil on cardboard is fine.",
      "Notices must be 'clearly and durably marked' (Reg 514.13.1) and 'shall be securely fixed in a visible position'. The practical interpretation: typed/printed labels on durable substrate (BS 951 plates for earthing, laminated card for inside-CU notices), securely fixed (screwed, riveted, or industrial adhesive), readable from a normal stand-back distance. Hand-written sticky labels degrade fast and aren't compliant.",
      "Anything legible at 1mm range.",
      "Plastic letters glued individually.",
    ],
    correctAnswer: 1,
    explanation:
      "Durability is the often-missed point. A label that's been in a meter cupboard for 10 years exposed to heat, moisture and dust needs to still be readable. BS 951 plates (engraved metal) are the gold standard for earthing/bonding notices. Laminated A4 inside the CU door is fine for schematics. Hand-written sticky labels fade and curl within months — they aren't compliant with the durability requirement and won't survive an EICR inspection.",
  },
  {
    id: 8,
    question:
      "On an EICR, what code is typically applied to a missing main-earth warning notice (Reg 514.13.1) and what code to a missing schematic (Reg 514.9.1)?",
    options: [
      "Both are C1 — danger present.",
      "A missing 514.13.1 main-earth notice is typically C3 (improvement recommended) where the earthing connection itself is sound, but can escalate to C2 (potentially dangerous) where the connection is at risk of being disturbed. A missing 514.9.1 schematic is normally C3. Codes depend on the specific install context and the inspector's professional judgement — these are typical not absolute.",
      "Both are C1 — immediate danger.",
      "Neither is codeable.",
    ],
    correctAnswer: 1,
    explanation:
      "EICR coding is professional judgement, not mechanical look-up. Missing labels usually fall in C3 territory — improvement recommended, no immediate danger. They escalate to C2 where the absence creates a real risk of someone interacting with the install incorrectly (e.g. disconnecting a main bond thinking it's redundant). They reach C1 only in rare cases where the absence is part of an immediately dangerous situation. The IET Best Practice Guide 4 (Electrical Installation Condition Reporting: Classification Codes for Domestic and Similar Electrical Installations) is the reference for borderline calls.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question:
      "Aren't labels just decoration? Surely the wiring is what matters?",
    answer:
      "BS 7671 explicitly disagrees. The 514 series treats labels and notices as part of the install — required, durable, located per the regs, with specific wording. They communicate critical information to anyone interacting with the install after you've left — the customer in an emergency, the next electrician on a fault visit, the EICR engineer in five years. Missing or illegible labels are non-conformances on an EICR (typically C3) and a real safety issue when someone needs to find the main earth in a hurry. Labels are how the install talks to people when you're not there to explain it.",
  },
  {
    question:
      "What's the difference between a BS 951 label and a generic 'do not remove' sticker?",
    answer:
      "BS 951 is the British Standard for earthing and bonding clamps — it specifies the clamp design AND the warning notice that comes with it. A BS 951-compliant clamp ships with the durable warning plate already attached or supplied for fixing on. A generic sticker isn't compliant with the durability requirement of Reg 514.13.1. For the main earthing terminal and every bonding clamp, use BS 951 plates (or the manufacturer's equivalent durable notice). For inside-CU schematics and circuit lists, laminated card is fine.",
  },
  {
    question:
      "Where's the schematic for a domestic CU supposed to live — inside the CU door, on the wall, or somewhere else?",
    answer:
      "Inside the CU door is the typical domestic location and meets Reg 514.9.1. Some installers also put a copy in the customer's handover pack. On commercial installs the schematic might also be reproduced as a wall-mounted single-line diagram in the plant room. The principle is 'available to whoever needs it' — for the next electrician opening the CU, that's inside the CU door; for the customer's reference, that's the handover pack.",
  },
  {
    question:
      "What about labels for circuits that go to outdoor lights or sheds — anything special?",
    answer:
      "Standard circuit identification on the MCB/RCBO is the minimum (e.g. 'L3 — outdoor lights / shed power'). For socket outlets in special locations (outdoor, bathroom, swimming pool) BS 7671 Section 7 (Special Locations) imposes additional requirements that may include labelling. For the cable run itself, mechanical protection and route warnings (e.g. cable warning tape buried above the cable) are more about physical protection than labelling per se but serve the same function — communicating to the next person that there's a service there.",
  },
  {
    question:
      "If I find missing labels on an EICR I'm carrying out, do I have to add them to fix it, or just code it?",
    answer:
      "On an EICR your job is to inspect and report, not to repair. Missing labels get a C3 (sometimes C2) on the report. The report goes to the customer with a recommendation to remediate. If the customer asks you to do the remediation, that's a separate piece of work — quote it, do it, issue the appropriate cert (MWC if minor). Don't blur the inspection and remediation roles on the same visit because it muddies the EICR's status as an independent assessment.",
  },
  {
    question:
      "What about labels in plain English vs symbols only — do the regs say anything?",
    answer:
      "The regs require notices to be 'clearly' marked, which in UK practice means in plain English (not symbols only). Standardised wording is normally specified in the reg itself (e.g. 'Safety Electrical Connection — Do Not Remove' for 514.13.1). For circuit identification the wording should be informative ('Kitchen ring' rather than 'R1') so a customer or unfamiliar electrician can navigate the install. Multilingual labels are sometimes added in commercial settings serving non-English-speaking users, but the regulation requires English (or the prevailing language) as the baseline.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 4"
            title="BS 7671 514.13 warning notices — labels as communication"
            description="Supplementary to Unit 210 — the install itself is a regulated form of communication. Labels are how the install talks to whoever opens the CU next."
            tone="emerald"
          />

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4 text-[13px] text-amber-200/90 leading-relaxed">
            <p className="font-semibold text-amber-100 mb-1">Supplementary content</p>
            <p>
              This Sub extends LO2 of Unit 210 (Information sources) but is not directly
              mapped to a specific 210 assessment criterion. It builds the
              install-as-communication layer that connects BS 7671 (Section 514) to the
              broader 210 themes about how information flows on a job. Knowledge here is
              also examinable under Modules 6 (Inspection &amp; Testing) and Unit 210
              communication ACs.
            </p>
          </div>

          <TLDR
            points={[
              "BS 7671 Section 514 treats labels and notices as a regulated form of communication. The install is a long-lived asset and the labels are how it talks to whoever opens the CU next — customer, electrician, EICR engineer.",
              "The headline labels for a domestic CU: main earthing notice (514.13.1) and bonding-clamp notices (BS 951), RCD test notice, single-line diagram inside CU door (514.9.1), circuit identification, isolator labels, mixed-supply warning where PV/battery/generator present.",
              "All labels must be 'clearly and durably marked' (514.13.1) and 'securely fixed in a visible position'. Pencil on cardboard isn't compliant. Missing or illegible labels are non-conformances on an EICR (typically C3, sometimes C2).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the BS 7671 regulations that mandate warning notices and labels (Section 514, particularly 514.9.1, 514.13.1, 514.13.2, 514.15, 514.16.1).",
              "State the verbatim wording required by Reg 514.13.1 for the main earth and bonding-clamp warning notice ('Safety Electrical Connection — Do Not Remove').",
              "List the minimum BS 7671-compliant label set for a domestic CU change.",
              "Recognise the durability requirement (BS 951 plates for earthing/bonding, laminated for schematics) and what doesn't meet it (hand-written sticky labels).",
              "Apply EICR coding judgement to missing or illegible labels — typically C3, escalating to C2 where absence creates real safety risk.",
              "Understand the install-as-communication framing — labels exist because the install outlasts the original installer's involvement.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why labels are part of the regulation, not decoration</ContentEyebrow>

          <ConceptBlock
            title="The install is a long-lived asset and the labels are how it talks"
            plainEnglish="An electrical install in a typical UK home will outlast the original installer's involvement by decades. The customer who has the install in 2050 won't have the original electrician's number. The next electrician arriving on a fault visit in 2035 won't have the original drawings. The EICR engineer in 2030 won't have your job sheet. The labels you fix today are how the install communicates with everyone who comes after."
            onSite="Apprentices often see labels as the last thing to do on a job — the bit that gets rushed or skipped if time's tight. Re-frame it: labels are the install's user manual, attached to the install itself. Skipping them isn't saving time, it's transferring cost to the next person who interacts with the system."
          >
            <p>
              Three audiences a label set has to serve:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The customer in an emergency</strong> — burning smell at 11pm, needs
                to find and operate the main switch. The label is the rapid-find tool.
              </li>
              <li>
                <strong>The next electrician on a fault visit</strong> — opens the CU and
                needs to understand the layout before touching anything. The schematic and
                circuit labels are their orientation.
              </li>
              <li>
                <strong>The EICR engineer in five years</strong> — formally inspecting the
                install and recording compliance with BS 7671 as it stood at the date of
                installation. Missing labels = non-conformances on the report.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The label set — what BS 7671 Section 514 actually requires</ContentEyebrow>

          <ConceptBlock
            title="514.13.1 — main earthing terminal and bonding-clamp warning notices"
            plainEnglish="The most important label set on every install. A 'Safety Electrical Connection — Do Not Remove' notice must be fixed at every earth-electrode connection, every bonding clamp on an extraneous-conductive-part, and at the main earthing terminal where it's separate from the main switchgear. The notice is BS 951-aligned and is normally provided on the clamp itself."
            onSite="On a typical domestic install you'll be fixing this label in three locations — the main earthing terminal in the meter cupboard or on the CU, the gas-meter bond clamp, and the water-stopcock bond clamp. Don't rely on the previous installer having done it — check every clamp on a CU change and replace any missing or illegible plates."
          >
            <p>
              Where the 514.13.1 notice is required:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                At every connection of an earthing conductor to an earth electrode (TT
                installs).
              </li>
              <li>
                At every connection of a bonding conductor to an extraneous-conductive-part
                (gas-meter bond, water-stopcock bond, structural-steel bond, lightning
                protection bond).
              </li>
              <li>
                At the main earthing terminal where it's separate from the main switchgear
                (common in installs with a remote MET).
              </li>
              <li>
                The notice may be provided on the clamp itself (BS 951 plate) or on the
                warning label provided with the clamp. Either is compliant.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="514.13.2 — bonding warning for special locations (e.g. medical equipment areas)"
            plainEnglish="A separate warning notice is required where Reg 418.2.5 or 418.3 applies — locations where supplementary bonding is intentionally NOT connected to earth (e.g. some medical equipment scenarios). The notice tells anyone working in the area that the protective bonding here MUST NOT be connected to earth, and that earthed equipment must not be brought into the location."
            onSite="514.13.2 isn't a domestic concern most of the time — it applies to specialised installations where the normal Earth-Equipotential-Bonding model has been intentionally departed from. If you find one of these labels, it means there's a specific design reason and you don't make changes without checking the original design intent."
          >
            <p>
              Wording per the reg:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                "The protective bonding conductors associated with the electrical installation
                in this location MUST NOT BE CONNECTED TO EARTH."
              </li>
              <li>
                "Equipment having exposed-conductive-parts connected to earth must not be
                brought into this location."
              </li>
              <li>
                Notice must be durably marked, securely fixed, in a visible position at the
                relevant location.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="514.15 — alternative or additional supplies (PV, battery, generator)"
            plainEnglish="Where an installation has more than one source of supply — typical examples now include solar PV, battery storage, EV bidirectional chargers, and standby generators — a warning notice must be fixed at the consumer unit (or origin) indicating the additional supplies. Anyone working on the install needs to know that the main switch alone doesn't isolate everything."
            onSite="With the rise of PV, battery storage and EV chargers this label is now relevant on many domestic installs that previously had a single supply. Don't skip it on a PV add-on job — back-feed from the inverter can energise the bus-bar with the main switch off, and an electrician arriving on a future fault visit who doesn't see the warning could be electrocuted."
          >
            <p>
              What the notice needs to communicate:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The presence of more than one supply, with each supply identified.
              </li>
              <li>
                The location of each isolation point (PV DC isolator, battery isolator,
                generator changeover switch).
              </li>
              <li>
                That opening the main switch does NOT necessarily isolate the entire
                installation.
              </li>
              <li>
                The procedure required to safely isolate the install for work (e.g. open
                main switch + open PV DC isolator + lock-off both).
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

          <ConceptBlock
            title="514.16.1 — single-pole device labelling and SPD presence"
            plainEnglish="Single-pole devices (the typical domestic MCB or RCBO) only break the line conductor — the neutral remains connected through the bus-bar. Where this isn't obvious, a label is required so any future electrician knows that opening the device doesn't isolate the neutral. The same regulation area requires labelling for the presence of Surge Protective Devices (SPDs), with an exception for domestic premises."
            onSite="In modern domestic CUs the single-pole nature of MCBs/RCBOs is usually self-evident from the layout. The SPD-presence label is more often needed because SPDs have become standard in newer installs and a future electrician needs to know to check / replace them as part of any maintenance. Many manufacturers ship CUs with the SPD label already in the front panel."
          >
            <p>
              What 514.16 covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Identification of single-pole devices in the line conductor (514.16.1).
              </li>
              <li>
                Indication of SPDs present in the installation (with an exception for
                domestic).
              </li>
              <li>
                Practical implication for the next electrician — single-pole devices need
                isolation procedures that account for the live neutral.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="514.9.1 — diagrams, charts and tables (the schematic inside the CU)"
            plainEnglish="Reg 514.9.1 requires a diagram, chart or table indicating the type and composition of each circuit, the method of protection, and the information needed to identify protective devices. For domestic premises a 'simplified equivalent' is acceptable — typically a circuit list inside the CU door rather than a full CAD single-line diagram."
            onSite="The CU-door schematic is often the first thing an EICR engineer or fault-finding electrician looks at. A clear, laminated, accurate schematic cuts the next visit's time dramatically. A missing or out-of-date schematic forces the next electrician to back-trace from the bus-bar — slow, error-prone and unprofessional."
          >
            <p>
              What a domestic schematic should contain (minimum):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Circuit number, description (e.g. "R1 — kitchen ring", "L2 — upstairs
                lighting").
              </li>
              <li>
                Protective device type and rating (RCBO 32A B, etc.).
              </li>
              <li>
                Cable size and type if it deviates from the assumed (e.g. 4mm² rather than
                2.5mm² on a long ring run).
              </li>
              <li>
                RCD grouping if circuits share an upstream RCD.
              </li>
              <li>
                Any specific notes (e.g. "circuit serves outdoor sockets — RCD-protected at
                consumer unit AND at socket").
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 514.13.1"
            clause={
              <>
                <p className="mb-2">
                  &quot;A warning notice clearly and durably marked with the words &apos;Safety
                  Electrical Connection &mdash; Do Not Remove&apos; shall be securely fixed in a
                  visible position at or near:
                </p>
                <p className="mb-1">(a) the point of connection of every earthing conductor to an earth electrode; and</p>
                <p className="mb-1">(b) the point of connection of every bonding conductor to an extraneous-conductive-part; and</p>
                <p className="mb-2">(c) the main earthing terminal, where separate from main switchgear.</p>
                <p>
                  The warning notice may be provided on the clamp according to BS 951 or on the
                  warning label provided with it.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 514.13.1 is the canonical label reg for an apprentice. Three locations,
                exact wording, BS 951-aligned plates. The reg uses &quot;clearly and durably
                marked&quot; and &quot;securely fixed in a visible position&quot; &mdash; both
                phrases are testable on EICR. Missing labels are normally C3 (improvement
                recommended) but escalate to C2 where the absence creates real risk of the
                connection being inadvertently disturbed (e.g. plumber thinking the bond
                clamp is a redundant earth strap and removing it). On every CU change, every
                consumer unit job, every install you walk away from &mdash; check every
                location and replace any missing or degraded label.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022, Reg 514.13.1 — verbatim from the Wiring Regulations."
          />

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 514.9.1 (paraphrased)"
            clause={
              <>
                Paraphrased: A diagram, chart or table (or equivalent form of information)
                shall be provided indicating in particular the type and composition of each
                circuit (points of utilisation served, number and size of conductors, type of
                wiring), the method used for protection against electric shock, the
                information necessary for the identification of devices performing the
                functions of protection, isolation and switching and their location, and any
                circuit or equipment vulnerable to a typical electrical test. For simple
                installations a simplified equivalent is acceptable for domestic (household)
                premises.
              </>
            }
            meaning={
              <>
                Reg 514.9.1 is the schematic / circuit-list reg. The &quot;simplified
                equivalent&quot; exception for domestic is what allows a laminated A4 inside
                the CU door instead of a full CAD diagram. The reg explicitly mentions that
                the diagram supports identification of devices for protection, isolation and
                switching &mdash; the next electrician needs this to safely work on the
                install. For larger or more complex installs (commercial, multi-supply,
                anything with sub-boards or unusual circuits) the schematic needs to be
                richer and may be reproduced as a wall-mounted single-line diagram.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022, Reg 514.9.1 — paraphrased; refer to the Wiring Regulations for full wording."
          />

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 514.16.1 (paraphrased)"
            clause={
              <>
                Paraphrased: A label shall be provided to indicate the presence of Surge
                Protective Devices (SPDs) in the installation. An exception applies to
                domestic (household) premises or similar. The labelling requirement supports
                future identification, maintenance and replacement of the SPDs by competent
                persons.
              </>
            }
            meaning={
              <>
                Reg 514.16.1 brings SPDs into the visible-label regime. The domestic
                exception reflects the fact that domestic CUs are typically opened only by
                competent electricians who can identify the SPD by sight, but commercial and
                industrial installs benefit from explicit labelling because the install may
                be larger, harder to navigate, and operated by a wider range of people. The
                wider 514.16 area also covers single-pole device identification &mdash; a
                practical safety label that tells the next electrician the neutral may still
                be live with the device open.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022, Reg 514.16.1 — paraphrased; refer to the Wiring Regulations for full wording."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The apprentice's label workflow</ContentEyebrow>

          <ConceptBlock
            title="On install — fix every required label before walking away"
            plainEnglish="Build a 'label checklist' into your end-of-job procedure. On every CU change, addition or alteration, walk through the install one final time with the label set in your hand and tick each location. The five minutes this takes is the difference between an EICR-clean install and one that gets a list of C3s on the next periodic."
            onSite="Many modern field-service apps now include a label-checklist as part of the close-out workflow. If yours doesn't, build one yourself — a laminated A5 card in the van with the standard label locations and a tick-box for each. Pin it to the inside of your toolbox lid where you can see it before you pack down."
          >
            <p>
              The apprentice's standard label checklist for a CU change:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Main earthing terminal — BS 951 'Safety Electrical Connection' notice fitted
                and legible.
              </li>
              <li>
                Gas-meter bond clamp — BS 951 plate fitted and visible.
              </li>
              <li>
                Water-stopcock bond clamp — BS 951 plate fitted and visible.
              </li>
              <li>
                Any other bonded extraneous part (structural steel, oil tank, lightning
                protection) — BS 951 plate fitted.
              </li>
              <li>
                CU door — RCD test notice fitted (where applicable).
              </li>
              <li>
                CU door — single-line diagram / circuit list laminated and fitted inside.
              </li>
              <li>
                Each MCB/RCBO — circuit identification label fitted (kitchen ring, upstairs
                lights, etc.).
              </li>
              <li>
                Isolators — labelled to indicate function (e.g. 'PV DC isolator', 'EV
                charger', 'shed sub-circuit').
              </li>
              <li>
                Mixed-supply notice fitted where PV / battery / generator present.
              </li>
              <li>
                SPD presence label fitted (commercial; optional but good practice in
                domestic).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="On inspection — flag missing or illegible labels as non-conformances"
            plainEnglish="When you're carrying out an EICR your job is to record the install as you find it. Missing or illegible labels go on the schedule of inspections as non-conformances. The coding (typically C3, sometimes C2) reflects the safety significance — a missing schematic is C3 because it inconveniences the next electrician but doesn't immediately endanger anyone; a missing main-earth notice can be C2 if the absence creates real risk of inadvertent disconnection."
            onSite="EICR coding is professional judgement, not mechanical look-up. The IET Best Practice Guide 4 is the reference for borderline calls. Don't get into the habit of auto-C3'ing every label — think about what the absence actually means in this specific install. A missing main-earth notice in a domestic loft where no other trade ever goes is a different risk profile from one in a public-access plant room."
          >
            <p>
              Typical EICR codes for label issues:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Missing main-earth notice (514.13.1) — typically C3, escalates to C2 where
                disturbance risk is real.
              </li>
              <li>
                Missing bonding-clamp notice — typically C3.
              </li>
              <li>
                Illegible / faded notices — C3.
              </li>
              <li>
                Missing schematic / circuit list (514.9.1) — C3.
              </li>
              <li>
                Inadequate or missing circuit identification — C3.
              </li>
              <li>
                Missing mixed-supply notice (PV/battery present) — C2 (real safety issue)
                escalating to C1 only in unusual cases of immediate danger.
              </li>
              <li>
                Missing isolator labels — C3, escalating to C2 where ambiguous isolation
                creates real risk of incorrect operation.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating labels as decoration and skipping them when time's tight"
            whatHappens={
              <>
                Apprentice finishes a CU change late on a Friday and rushes the close-out.
                Schematic isn&apos;t laminated, just slid into the CU door. Main-earth notice
                isn&apos;t replaced because the original looked &quot;fine&quot;. Circuit
                labels are hand-written sticky notes that won&apos;t survive a year in a
                heated meter cupboard. Two years later the property gets an EICR and the
                inspector codes the lot as C3s &mdash; the customer comes back to the firm
                asking why the install they paid £900 for is now showing as
                &quot;unsatisfactory in part&quot;. Reputation hit, free remediation visit,
                lost referral.
              </>
            }
            doInstead={
              <>
                Build the label set into your end-of-job procedure. Print labels off-site
                and bring them with you. Use a label-printer for circuit IDs. Use BS 951
                plates for earthing/bonding (most clamps ship with one already attached).
                Laminate the schematic. Do the labels FIRST (so they&apos;re ready to fix as
                you finish each section) rather than last. Allocate 10-15 minutes at the end
                of the job specifically for the label sweep. The five minutes you save by
                skipping them costs you the EICR-clean reputation that brings repeat
                business.
              </>
            }
          />

          <CommonMistake
            title="Forgetting the mixed-supply notice on a PV add-on"
            whatHappens={
              <>
                Domestic PV install added to an existing CU. PV inverter and DC isolator
                fitted in the loft, AC connection back to the CU. No mixed-supply notice
                fitted at the CU because it &quot;feels obvious&quot; that there&apos;s PV.
                Two years later an electrician comes out for an unrelated fault, opens the
                CU main switch to make safe, and starts work assuming the install is dead.
                Inverter is still energised from the DC side and back-feeds the AC bus-bar
                during a brief sun gap in the cloud cover. Electrician gets a shock. RIDDOR
                report. HSE investigation. The original PV installer&apos;s firm gets named.
              </>
            }
            doInstead={
              <>
                Mixed-supply notices are non-negotiable on any install with PV, battery,
                generator or any second supply source. Fit the notice at the CU and at the
                inverter / battery location. Notice should clearly state: more than one
                supply, locations of isolators, procedure to fully isolate. Use a printed
                BS-style warning label, not a hand-written one. Walk the customer through
                the notice during handover so they understand it too &mdash; they&apos;ll
                often be the one explaining it to the next electrician.
              </>
            }
          />

          <Scenario
            title="1st-fix CU swap-out — your label checklist before walking away"
            situation={
              <>
                You&apos;ve just finished a CU change in a 1970s domestic property. The CU
                is in the under-stairs cupboard, the main earth runs up to a cut-out outside
                in the meter box. The property has a gas supply (boiler in kitchen), a water
                main entering at the front, and a small PV install added five years ago by
                a previous installer (inverter in the loft). The old CU is removed, the new
                one is wired and tested, all circuits energise correctly. You&apos;re ready
                to close up. What&apos;s your label checklist before you walk away?
              </>
            }
            whatToDo={
              <>
                Run the label sweep in order: (1) main earthing terminal in the meter box
                &mdash; check the BS 951 plate is fitted and legible, replace if not. (2)
                Gas-meter bond clamp &mdash; check the BS 951 plate, replace if missing. (3)
                Water-stopcock bond clamp &mdash; same. (4) New CU door &mdash; fit the RCD
                test notice on the inside or outside per the manufacturer&apos;s standard.
                (5) Inside CU door &mdash; fit the laminated single-line diagram / circuit
                list with each circuit identified in plain English. (6) Each MCB/RCBO &mdash;
                fit the circuit ID label (kitchen ring, lights, etc). (7) Loft inverter
                location &mdash; check the PV system has a clear isolation label and that
                the CU has a mixed-supply warning notice indicating PV is present and where
                its isolators are. (8) Any sub-circuit isolators (e.g. shed power) &mdash;
                labelled to indicate function. Walk the customer through what each notice
                means before leaving, especially the mixed-supply warning so they understand
                the install isn&apos;t fully isolated by the main switch alone.
              </>
            }
            whyItMatters={
              <>
                The label set is the install&apos;s user manual attached to the install
                itself. Done well, it serves the customer in an emergency, the next
                electrician on a fault visit, and the EICR engineer at the next periodic.
                Done badly or skipped, it transfers cost and risk to all three. The
                mixed-supply notice in particular is now almost universal on domestic
                installs as PV penetration grows &mdash; missing it is a real safety issue,
                not just a paperwork failure. Five minutes of label-sweep time at the end
                of the job is the difference between an install that earns repeat referrals
                and one that comes back as a complaint after the next EICR.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 Section 514 treats labels and notices as a regulated form of communication. The install outlasts the original installer's involvement and the labels are how it talks to whoever opens the CU next.",
              "Reg 514.13.1 requires a 'Safety Electrical Connection — Do Not Remove' notice at every earth-electrode connection, every bonding clamp on an extraneous-conductive-part, and the main earthing terminal where separate from main switchgear. BS 951-aligned plates.",
              "Reg 514.9.1 requires a diagram / chart / table indicating each circuit, its protection and how to identify devices for protection, isolation and switching. Domestic 'simplified equivalent' = laminated circuit list inside CU door.",
              "Reg 514.15 area requires a warning notice for any install with additional / alternative supplies (PV, battery, generator). Critical now PV and battery are domestic-mainstream — back-feed kills.",
              "All notices must be 'clearly and durably marked' (514.13.1) and 'securely fixed in a visible position'. BS 951 plates for earthing/bonding, laminated A4 for schematics. Hand-written stickies aren't compliant.",
              "Apprentice's job on install — fix every required label before walking away. Build a label checklist into the end-of-job procedure. Five minutes saves a C3 on the next EICR.",
              "Apprentice's job on inspection — flag missing / illegible labels as non-conformances. Typically C3, escalating to C2 where absence creates real safety risk. IET Best Practice Guide 4 is the reference for borderline coding calls.",
              "Walk the customer through the labels at handover. The schematic, the mixed-supply notice and the cut-out location are the three labels they're most likely to need themselves in an emergency or when calling another trade.",
            ]}
          />

          <Quiz title="BS 7671 514.13 warning notices — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.3 GDPR and DPA — customer data
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Back to module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 — Communicate with others
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
