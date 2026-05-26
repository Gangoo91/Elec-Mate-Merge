/**
 * Module 3 · Section 1 · Subsection 5 — BS 7671 deep dive
 * Maps to City & Guilds 2365-02 / Unit 203 / LO1 / AC 1.2, 1.4
 *   AC 1.2 — "Identify non statutory regulations/guidance"
 *   AC 1.4 — "State implications of non-statutory regulations"
 *
 * Frame: the IET Wiring Regulations. Not statutory but treated as such.
 * Goes deeper than Sub2's overview by walking the 8-Part structure, the
 * Part 2 definitions vocabulary, the deemed-to-comply doctrine, navigation
 * technique, and the A4:2026 headline changes (411.3.4, 514.16.1, 421.1.7,
 * 521.11.201, redrafted Section 443, redrafted 411.3.3).
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
  'BS 7671 deep dive — 8-Part structure, Part 2 definitions, A4:2026 (1.2, 1.4) | Level 2 Module 3.1.5 | Elec-Mate';
const DESCRIPTION =
  "The IET Wiring Regulations unpacked — the eight Parts of BS 7671:2018+A4:2026, the appendices that matter, the Part 2 definitions discipline, the deemed-to-comply doctrine, the A4:2026 headline changes, and how to navigate the standard rather than memorise it.";

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod3-s1-sub5-part-locator',
    question:
      "A site question comes up about whether a 30 mA RCD is required on a domestic socket circuit. Which Part of BS 7671 do you reach for first?",
    options: [
      "Part 4 — protection for safety. Specifically Chapter 41 (protection against electric shock), where Reg 411.3.3 (RCD on socket-outlets up to 32 A) and Reg 411.3.4 (RCD on luminaires in domestic premises) live. Part 4 is where every shock / overcurrent / thermal protection question lands.",
      "That pressing the emergency stop immediately de-energises all hazardous motion, that the stop is maintained (latched) until manually reset, and that the machine cannot restart until the stop is released and a deliberate start action is taken",
      "Be reviewed by the inspector before signing — instrument glitches, mis-set test ranges or transcription errors during import can introduce nonsense values that the certification software will accept without complaint. The inspector\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s signature attests to the values, not the auto-import process.",
      "Competence = having the technical knowledge / skill / experience to do the work safely. Authority = being permitted by the firm or a regulator to do it. Both are required. An L3 may be competent on a task but not authorised (e.g. EIC sign-off requires Qualified Supervisor authority); or authorised by job title but not yet competent on a specific item (e.g. CompEx work).",
    ],
    correctIndex: 0,
    explanation:
      "Part 4 ('Protection for safety') is the chapter you'll open most often as an installer. It covers shock protection (Chapter 41), thermal effects (Chapter 42), overcurrent (Chapter 43), voltage disturbances (Chapter 44) and isolation/switching (Chapter 46 — newly expanded by A4:2026). Knowing each Part's scope means you find the reg by topic, not by remembering a four-digit number.",
  },
  {
    id: 'mod3-s1-sub5-part2-definitions',
    question:
      "An EICR comes back with a C2 against an 'extraneous-conductive-part' that wasn't bonded. The customer asks 'what's an extraneous-conductive-part?'. Where in BS 7671 do you go to read the legally precise definition?",
    options: [
      "Part 2 — definitions. Every key term in BS 7671 has a verbatim definition in Part 2, and that definition is the legal vocabulary the inspector and the courts use. 'Extraneous-conductive-part' = 'a conductive part liable to introduce a potential, generally Earth potential, and not forming part of the electrical installation' — that exact wording is what decides whether the metal pipework needs main bonding.",
      "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger, unless they possess such knowledge or experience or are under appropriate supervision having regard to the nature of the work. So either you're competent yourself OR you're being supervised by someone who is. Working outside your competence without supervision is a Reg 16 breach.",
      "The Health and Safety Executive (HSE). Construction sites are higher-risk premises under the Health and Safety (Enforcing Authority) Regulations 1998, so HSE inspectors take the lead. They enforce HASAWA, EAWR, CDM 2015, MHSWR, COSHH, RIDDOR and the rest of the workplace H&S regime on site.",
      "Reg 510.3 — 'Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions.' Selection AND erection. The 'take account of manufacturers' instructions' clause is what makes the data sheet effectively part of the standard.",
    ],
    correctIndex: 0,
    explanation:
      "Part 2 is the legal vocabulary. Definitions are verbatim, are used consistently throughout the standard, and are what scheme inspectors and the HSE quote when they're testing whether something is or isn't in scope of a particular reg. Get the Part 2 definitions discipline right and most of the rest of the standard reads cleanly. Get them wrong and you'll mis-classify circuits, mis-bond, and fail EICRs.",
  },
  {
    id: 'mod3-s1-sub5-a4-changes',
    question:
      "Which of the following is one of the headline new regulations introduced by BS 7671:2018+A4:2026?",
    options: [
      "(1) Verify CPP exists and reflects the work. (2) Verify client awareness conversation. (3) Brief operatives on the CPP. (4) Identify hazards via dynamic risk assessment. (5) Manage and monitor work in practice. (6) Document the day\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safety actions. (7) Escalate issues. (8) Close out at end of project — lessons, records, cleanup.",
      "Being proactive within your level of authority — asking questions, volunteering for learning opportunities, suggesting improvements, and taking appropriate action when you identify issues — while recognising when to seek guidance",
      "On commercial sites, the permit names the circuit / equipment to be worked on, the precautions required (which include safe isolation per the JIB procedure), the time window, the worker and the responsible person — the JIB procedure is the practical execution of the permit&rsquo;s isolation requirement.",
      "Regulation 411.3.4 — additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires within domestic (household) premises. This is genuinely new in A4:2026 and changes the design pattern for all new domestic lighting circuits.",
    ],
    correctIndex: 3,
    explanation:
      "411.3.4 is one of the most consequential A4:2026 changes for domestic work. Combined with the redrafted 411.3.3 (RCD on socket-outlets up to 32 A) and the expanded AFDD scope under 421.1.7, A4:2026 substantially raises the protection floor on a typical domestic install. Knowing the new regs by number isn't the goal — knowing they EXIST and being able to find the verbatim wording in Part 4 is.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "BS 7671 has eight numbered Parts. Match the Part to its primary purpose.",
    options: [
      "Sit-down with your tutor, get the per-topic mark breakdown, focus revision on the weakest areas, sit 2-3 more full mocks under exam conditions until you average 70%+, then book the re-sit. Failing one paper by 4 marks is a fixable gap, not a verdict on the qualification.",
      "Part 1 = scope, object, fundamental principles. Part 2 = definitions. Part 3 = assessment of general characteristics. Part 4 = protection for safety. Part 5 = selection and erection. Part 6 = inspection and testing. Part 7 = special installations or locations. Part 8 = functional requirements (energy efficiency, prosumer's installations).",
      "It’s the single common connection point inside the installation where the earthing conductor (back to the source/electrode), the main protective bonding conductors (out to extraneous parts) and the installation CPCs all meet — bringing every earthed and bonded conductor to the same potential.",
      "To plan, manage, monitor and co-ordinate matters relating to H&S during the pre-construction phase. The PD identifies, eliminates or controls foreseeable risks via the design, ensures designers comply with their Reg 9 duties, prepares the pre-construction information and liaises with the Principal Contractor for the duration of the appointment.",
    ],
    correctAnswer: 1,
    explanation:
      "Carry the eight-Part map in your head. The most-used Parts on a typical install are Part 4 (protection), Part 5 (selection and erection) and Part 6 (inspection and testing). Part 7 comes up for any bathroom, pool, EV-charger, agricultural or marina job. Part 2 (definitions) is the silent-but-essential reference whenever a reg's meaning is in dispute.",
  },
  {
    id: 2,
    question:
      "Under the BS 7671 reg-numbering convention, what does the regulation number 411.3.4 tell you about where the regulation lives in the standard?",
    options: [
      "Don't move tools, equipment, locks, voltage indicators or anything else. Don't restore power. Don't continue work. Photograph the scene from multiple angles. Identify witnesses and ask them to record their observations. Notify the firm's responsible person. The scene as it was is the evidence.",
      "Photos of the scene as it was when evacuated; identity and contact of witnesses; written first-hand account from yourself and any colleagues; equipment positions; any recordings (CCTV near you); customer / building-manager contact information; any fault you noted that may have caused or contributed; tool and instrument condition before and after.",
      "Part 4, Chapter 41, Section 411, sub-section 3, regulation 4. So it lives in Part 4 (protection for safety), Chapter 41 (protection against electric shock), Section 411 (protective measure: automatic disconnection of supply), sub-section 411.3 (additional protection), regulation 411.3.4 (RCD on luminaires in domestic premises). The numbering encodes the location.",
      "Initially, work quality may be high, but over time: team members feel overwhelmed and inadequate, initiative decreases (people fear not meeting the standard), morale drops, burnout increases, and the leader becomes a bottleneck because they end up doing everything themselves rather than trusting others — ultimately reducing both performance and wellbeing",
    ],
    correctAnswer: 2,
    explanation:
      "The numbering is a navigation system, not a label. First digit = Part. First two digits = Chapter. First three digits = Section. The rest is sub-section and regulation within. Once you internalise this, jumping to Reg 411.3.4 in a 600-page book takes seconds without an index.",
  },
  {
    id: 3,
    question:
      "What does the 'deemed to comply' doctrine mean for an electrician who follows BS 7671?",
    options: [
      "Hazardous touch potentials on conductive parts during the test. The test current creates a voltage drop across the loop impedance — exposed-conductive-parts in the circuit may briefly rise toward line voltage during the test. Testers must control access to exposed conductive parts during these tests, follow safe working practices, and not allow others to touch the installation while testing.",
      "Acknowledge the alarm, check the UPS control panel for specific fault details, perform battery impedance or resistance testing, check battery terminal voltages and connections, assess the remaining battery autonomy, and report the findings with a recommendation for battery replacement if required",
      "Cable lubricant (for pulling into containment), contact cleaner / electronic cleaner (typically isopropyl-based), masonry sealant (for chase repairs), two-pack epoxy resin (for fixings and panel repairs), brick acid (for cleaning chased surfaces), dust suppressant. All have hazard ratings and all need an SDS in the firm's COSHH register.",
      "Following BS 7671 raises a presumption that the underlying statutory duty (EAWR Reg 4) has been met. The legal logic: HSR25 (HSE's guidance to EAWR) cites BS 7671 as a means of demonstrating EAWR compliance. So evidence of BS 7671 compliance = evidence of EAWR compliance, by reference. Departing from BS 7671 is allowed but flips the burden — you have to prove your alternative method was at least as safe.",
    ],
    correctAnswer: 3,
    explanation:
      "Deemed-to-comply is the doctrine that gives BS 7671 its legal weight despite being non-statutory. Following the standard = presumption of statutory compliance. Departing from it = burden flips onto you to prove equivalent safety. Most defendants can't carry that burden in a witness box — which is why everyone in the trade follows BS 7671 even though no statute literally orders them to.",
  },
  {
    id: 4,
    question:
      "Where in BS 7671 would you find the model forms for an Electrical Installation Certificate (EIC), an Electrical Installation Condition Report (EICR) and a Minor Electrical Installation Works Certificate?",
    options: [
      "Appendix 6 — model forms for certification and reporting. The appendices to BS 7671 also include Appendix 1 (British Standards referenced), Appendix 4 (cable current-carrying capacity tables), Appendix 12 (voltage drop), Appendix 15 (ring and radial circuit arrangements) and Appendix 17 (protective measures against environmental influences). Knowing the appendices by topic is half of installer navigation.",
      "Reg 3 puts the duty on EVERY employer, every self-employed person, and every employee — including apprentices — engaged in any work activity covered by the Regulations. The employee duty is to co-operate with the employer in complying with EAWR, AND to comply themselves with EAWR insofar as the matters relate to things within the employee's control. So an apprentice has a personal EAWR duty, not just an employer-mediated one.",
      "It continuously monitors the insulation resistance between the live DC conductors and earth, throughout the life of the array. A drop in insulation (a damaged cable, water in a connector) triggers an alarm or shuts down the inverter — catching insulation faults before they become DC arcing fires.",
      "Carry out a more extensive visual survey to establish the installation arrangement (reverse engineering from observation), document the limitation on the report front sheet under Section D, agree the scope of inspection with the duty holder, and note \\\"no documentation available\\\" as a limitation against affected items on the schedule.",
    ],
    correctAnswer: 0,
    explanation:
      "The appendices are where the practical reference material lives — current-carrying tables, voltage drop tables, model certification forms, ring-final guidance. Appendix 6 holds the model forms (substantially redrafted under A4:2026 to introduce new schedule columns). Working knowledge of the appendices is what separates a confident installer from one who has to ask their supervisor every five minutes.",
  },
  {
    id: 5,
    question:
      "Why does Part 2 (Definitions) matter so much that experienced installers reach for it before reaching for the technical chapters?",
    options: [
      "BS 7671 Chapter 46 distinguishes four switching functions: ISOLATION (Reg 462) — all live conductors disconnected, lockable in OFF position, designed to prevent re-energisation; SWITCHING OFF FOR MECHANICAL MAINTENANCE (Reg 463) — hand-operable, lockable, prevents accidental re-energisation; EMERGENCY SWITCHING (Reg 464) — fast-acting, immediately accessible, removes danger from personnel; FUNCTIONAL SWITCHING (Reg 465) — normal operation. For fault diagnosis you use ISOLATION every time. The breaker label and the actual function of the device must match — many older switches that look like isolators are actually only functional switches and don't satisfy Reg 462.",
      "Because the standard's enforcement and interpretation hinges on the precise definitions. 'Exposed-conductive-part' (a conductive part of equipment that can be touched and which is liable to become live in fault conditions) and 'extraneous-conductive-part' (a conductive part liable to introduce a potential, generally Earth, not forming part of the electrical installation) are different categories with different bonding rules. Mis-classify one as the other and you mis-bond, you fail the EICR, you potentially leave the customer unprotected. Definitions ARE the technical content.",
      "Plain English is writing or speaking that the intended audience can understand on first reading or hearing. Common standards include short sentences (15-20 words on average), common words rather than technical jargon, active voice rather than passive, one idea per sentence, and a reading age around 9-11 (that's not patronising — most UK adults read most comfortably at that level for safety-critical information). The Plain English Campaign provides guidance and the Crystal Mark accreditation. For safety briefings, RAMS summaries, customer-facing letters and apprentice-training material, plain English isn't 'dumbing down' — it's 'comprehensible' under MHSWR 1999 Reg 10.",
      "Whenever the chosen EV charger doesn't include integrated open-PEN protection. Section 722 of BS 7671 (significantly amended in A4:2026) requires that the PEN-fault risk on PME supplies is managed — either by the charger's built-in open-PEN protection function, or by providing a TT earth electrode for the EV chassis at the charge point. Most modern chargers from major manufacturers include the open-PEN protection function, simplifying the install. Where they don't, the local TT electrode is the fallback. The certified installer reads the charger spec and chooses the architecture.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 is built on Part 2's vocabulary. Reg 411.3.1.1 says 'exposed-conductive-parts shall be connected to a protective conductor'. Reg 411.3.1.2 says 'extraneous-conductive-parts shall be connected to the main earthing terminal by means of main protective bonding'. Same regulation block, two completely different actions, decided entirely by which Part 2 category the conductive part falls into. Get that wrong and the install is wrong.",
  },
  {
    id: 6,
    question:
      "BS 7671 Reg 134.1.1 requires 'good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation. The installation of electrical equipment shall take account of manufacturers' instructions.' What does this regulation hook to that BS 7671's other technical chapters don't directly cover?",
    options: [
      "An SDS-Max or larger SDS with a 100 mm core bit (sometimes called a diamond core drill) for the through-wall hole. Smaller SDS-Plus tools struggle with cores above 50 mm; SDS-Max is the bigger chuck system designed for it. Wet-coring (water flood) is preferred for diamond cores because it controls dust and stops the bit overheating, but dry-coring with intermittent withdrawal is acceptable for short single holes.",
      "OZEV requires installations to comply with the Electric Vehicles (Smart Charge Points) Regulations 2021 and to be installed by an OZEV-authorised installer. Periodic inspection follows the BS 7671 framework — typically 5-yearly EICR for domestic, plus EV-specific tests including RCD operation (Type B or RDC-DD), open-PEN protection function (where the charger has built-in open-PEN), and Zs at the charge point. Landlord properties additionally subject to the Electrical Safety Standards Regulations 2020 (5-year EICR plus change of tenancy).",
      "The 'workmanship' standard and 'manufacturers' instructions' obligation. So a faulty cable joint that's electrically OK at the moment of test but executed with poor workmanship breaches 134.1.1, AND ignoring an SPD lead-length spec or a CU manufacturer's torque setting also breaches 134.1.1. This is the regulation a scheme inspector quotes when they're calling out poor workmanship without it being a specific technical-test failure.",
      "Loss of the ability to self-certify domestic notifiable work under Part P of the Building Regulations. Every notifiable job must then be notified to Local Authority Building Control (LABC) and inspected separately, which is slower and more expensive. Loss of the scheme membership badge that customers actively look for when choosing a contractor. Likely loss of insurance cover that depends on scheme membership. Significant reputational damage in trade directories and customer-facing search results. Many domestic contractors don't survive a scheme withdrawal.",
    ],
    correctAnswer: 2,
    explanation:
      "134.1.1 sits in Part 1 (fundamental principles) precisely because workmanship isn't just one technical chapter — it's the foundation of compliance with every chapter. Combined with Reg 510.3 (selection and erection takes account of manufacturers' instructions), 134.1.1 is the legal hook for taking manufacturer literature seriously. Ignoring an SPD lead-length spec, a CU torque setting, an MCB compatibility statement — all are 134.1.1 / 510.3 breaches even if the technical test results pass.",
  },
  {
    id: 7,
    question:
      "Where in BS 7671:2018+A4:2026 would you find the new requirement for a label indicating the presence of a Surge Protective Device (SPD)?",
    options: [
      "Specific cover for theft of tools and equipment from your van or work vehicle, typically with a per-claim limit (e.g. £5,000) and conditions about secure storage (alarmed van, specific locking systems, overnight storage location). Tool theft is a major UK trades risk — police-reported tool theft from vans runs into hundreds per week. Annual premium £100-300; high deductibles common.",
      "Manages the power flow between the PV array, battery, household loads and the grid — deciding when to charge the battery from PV, when to discharge to loads, when to export to grid, and when to import from grid, based on tariff schedules and user preferences",
      "Neuroscience research (including Antonio Damasio\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"somatic marker hypothesis\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\") demonstrates that emotions are essential to effective decision-making, and people who believe they are making purely rational decisions are simply unaware of the emotional influences operating below conscious awareness",
      "Reg 514.16.1 — introduced by A4:2026, requiring a label to indicate the presence of SPDs (with an exception for domestic / household premises). Located in Part 5 (selection and erection), Chapter 51 (common rules), Section 514 (identification and notices). Knowing the labelling regs live in Section 514 is faster than searching by reg number.",
    ],
    correctAnswer: 3,
    explanation:
      "Section 514 is the home of identification and notices in BS 7671. Reg 514.16.1 was a new addition under A4:2026 to require an SPD-presence label. Knowing 'Section 514 = labels' rather than memorising the exact reg number is how working installers navigate. Same for 'Section 522 = external influences', 'Section 526 = electrical connections', 'Section 543 = protective conductors'.",
  },
  {
    id: 8,
    question:
      "BS 7671 is a 'living' standard — substantially amended every few years. What's the practical implication for a job you complete today and certify under the current edition?",
    options: [
      "The certificate references the edition in force on the date of installation (e.g. BS 7671:2018+A4:2026). Subsequent amendments don't make the install non-compliant retrospectively, but they DO change what's required for any future addition / alteration / EICR you do on the same installation. Periodic inspection (EICR) is carried out to the standard in force at the time of the inspection — so a 2026 install will be EICR'd against whatever amendment is current in 2031.",
      "One per RCBO. Each RCBO is an independent RCD device. Test each at 1 x I delta n, record trip time on the Schedule of Test Results against the circuit number. Standard MFT workflow: select RCD test mode, set I delta n to 30 mA (or other rating per device), AC test, plug into the circuit\\\\\\\\'s socket or test from the RCBO load terminals, press TEST, record trip time, move to next circuit. 12 RCBOs = 12 tests + 12 readings on the schedule. Modern MFTs auto-fill the schedule when they\\\\\\\\'re paired with certification software.",
      "Report to the JIB ECS team immediately and request a replacement (small admin fee, typically £15-20). Get a temporary letter of confirmation from JIB or your employer to maintain site access while the new card is in production (typically 5-10 working days). Most sites will accept an ECS register printout temporarily; some won't, in which case you can't work until the new card arrives.",
      "Apprentice is a formal JIB grade for someone in a registered apprenticeship — typically a learner working towards the C&G 2365 (or NVQ Level 3) and the AM2. 'Improver' is not a formal JIB grade — it's a colloquial industry term sometimes used for the post-college, pre-AM2 stage where the learner has completed the technical qualifications but not yet sat the AM2. Once AM2 is passed and JIB processes the upgrade, the worker becomes an Electrician on the JIB scale.",
    ],
    correctAnswer: 0,
    explanation:
      "The standard moves; the certificate is a snapshot in time. The install was compliant when certified — that's a permanent record. But the EICR five years later is judged against the current standard, and any addition / alteration you do today on an older install brings the altered part of the system up to current. Working installers need to track which amendment is current at the time of each piece of work — A4:2026 NOW, but the next amendment is already in development.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Do I have to memorise BS 7671 reg numbers for the Level 2 exam?",
    answer:
      "No. You do have to know the structure (eight Parts, what each Part contains), the Part 2 definitions discipline, and the headline regs (411.3.3 and 411.3.4 RCDs, 421.1.7 AFDDs, 514.16.1 SPD labels, 134.1.1 and 510.3 manufacturer's instructions). For everything else, knowing where to look is the working skill — open the Part / Chapter / Section that fits the topic and the regs are right there.",
  },
  {
    question: "What's the difference between BS 7671 'Parts', 'Chapters', 'Sections' and 'Regulations'?",
    answer:
      "BS 7671 nests four levels deep. Eight Parts (1 to 8). Each Part contains Chapters (numbered with the first digit matching the Part — e.g. Chapter 41 is in Part 4). Each Chapter contains Sections (numbered with the first two digits matching the Chapter — e.g. Section 411 is in Chapter 41). Each Section contains numbered Regulations. The reg number 411.3.4 = Part 4 / Chapter 41 / Section 411 / Sub-section 3 / Reg 4.",
  },
  {
    question: "Why does the cover say '18th Edition' but the standard is BS 7671:2018+A4:2026?",
    answer:
      "Because BS 7671 has been published in numbered Editions since the IEE Wiring Regulations were first issued. The 18th Edition is the 2018 base edition — that's where '2018' in the citation comes from. Since publication it's been amended four times: A1:2020, A2:2022, A3:2024 and A4:2026. Each amendment supersedes the previous one. So 'BS 7671:2018+A4:2026' literally means '18th Edition base from 2018, currently amended to A4 dated 2026'.",
  },
  {
    question: "Are the IET Guidance Notes part of BS 7671?",
    answer:
      "No — they're separate companion publications by the same publisher (the IET). BS 7671 is the standard; the GNs explain how to apply it. GN1 supports Part 5 (selection and erection), GN3 supports Part 6 (inspection and testing), GN8 supports Chapter 54 (earthing and bonding). Sub 2 covered the GN family in detail. The headline rule: where BS 7671 and a GN appear to conflict on a fine point, BS 7671 is the standard and wins.",
  },
  {
    question: "What's a 'deemed-to-comply' route again — why does this keep coming up?",
    answer:
      "Because it's the doctrine that turns a non-statutory standard (BS 7671) into a quasi-statutory document. The HSE's HSR25 guidance to EAWR cites BS 7671 as a way of demonstrating compliance with EAWR. So if you follow BS 7671, you're presumed to have met EAWR (which IS statutory). If you depart from BS 7671, the burden is on you to prove your alternative was at least as safe. Most working electricians can't carry that burden — so in practice everyone follows BS 7671. That's deemed-to-comply.",
  },
  {
    question: "Where do I find the EIC / EICR / Minor Works model forms?",
    answer:
      "Appendix 6 of BS 7671. A4:2026 substantially redrafted these forms to add new schedule columns and update the inspection items (e.g. AFDD presence, SPD labelling, RCD on luminaires, explicit recognition of PNB as a TN-C-S sub-arrangement on the inspection schedules). If you're using an old template that pre-dates A4:2026 you'll be missing required fields and your scheme inspector will flag it.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 5"
            title="BS 7671 deep dive"
            description="The IET Wiring Regulations. Not statutory but treated as such. The eight-Part structure, the Part 2 definitions discipline, the deemed-to-comply doctrine, the appendices, and the A4:2026 headline changes — how to navigate the book rather than memorise it."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671:2018+A4:2026 is the IET Wiring Regulations — non-statutory but the deemed-to-comply route to EAWR Reg 4. The structure is eight numbered Parts plus appendices.",
              "Part 2 (Definitions) is the legal vocabulary the standard runs on. 'Exposed-conductive-part' and 'extraneous-conductive-part' are different categories with different bonding rules — get the definitions right and most of the rest reads cleanly.",
              "A4:2026 brought new headline regs — 411.3.4 (30 mA RCD on domestic luminaires), 514.16.1 (SPD label), expanded 421.1.7 (AFDDs), redrafted 411.3.3 (RCD on socket-outlets up to 32 A) and a redrafted Section 443 (transient overvoltage protection).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify BS 7671:2018+A4:2026 as the IET Wiring Regulations and explain its non-statutory but quasi-mandatory status via the deemed-to-comply doctrine.",
              "Describe the eight-Part structure of BS 7671 and the topic each Part covers.",
              "Use the BS 7671 reg-numbering convention (Part / Chapter / Section / Reg) to navigate to a specific regulation without an index.",
              "Apply the Part 2 definitions discipline — 'exposed-conductive-part', 'extraneous-conductive-part', 'circuit', 'conductor' — when classifying installation features.",
              "Identify the headline appendices (Appendix 1 referenced standards, Appendix 4 current-carrying capacity, Appendix 6 model forms, Appendix 12 voltage drop) and what each one is for.",
              "State the headline A4:2026 changes (Reg 411.3.4, Reg 514.16.1, expanded 421.1.7, redrafted 411.3.3, redrafted Section 443, model form updates) and where to find the verbatim text.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters at deep-dive level</ContentEyebrow>

          <ConceptBlock
            title="Knowing the structure beats memorising regs"
            plainEnglish="BS 7671 is a 600-page reference book, not a textbook to learn cover-to-cover. The working skill is being able to find what you need. That depends on knowing the eight-Part map, the chapter-numbering convention, the Part 2 definitions and the appendix list. Once those are in your head the regs find themselves."
            onSite="Watch a senior electrician with a copy of BS 7671. They don't flip pages randomly. They go straight to a Part / Chapter / Section because they know what topic lives where. That's the navigational skill this Sub is teaching — not the reg numbers, the structural knowledge."
          >
            <p>
              Sub 2 introduced BS 7671 as a non-statutory document with statutory weight via
              HSR25. This Sub goes deeper into how the standard is actually built and how working
              installers navigate it. The four pillars of BS 7671 fluency:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The eight-Part map</strong> — knowing what topic lives in which Part.
              </li>
              <li>
                <strong>The reg-numbering convention</strong> — first digit is the Part, first
                two are the Chapter, first three are the Section.
              </li>
              <li>
                <strong>The Part 2 definitions discipline</strong> — using terms with their
                exact BS 7671 meaning, not their conversational meaning.
              </li>
              <li>
                <strong>The appendices</strong> — knowing where the practical tables (cable
                ratings, voltage drop, model forms) live.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The eight-Part structure</ContentEyebrow>

          <ConceptBlock
            title="What lives in each Part — the navigational map"
            plainEnglish="BS 7671 is structured by topic, not by trade. Each Part covers one major topic area, with chapters and sections drilling deeper. Carry this map in your head and you'll save hours of flipping through indices."
          >
            <p>
              The eight Parts:
            </p>
            <ul className="space-y-2 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part 1 — Scope, object and fundamental principles.</strong> What the
                standard covers, what it doesn&apos;t, and the foundational principles.
                Regulations 110 to 134 — including Reg 134.1.1 (workmanship and manufacturer&apos;s
                instructions), the foundation regulation that backstops every chapter.
              </li>
              <li>
                <strong>Part 2 — Definitions.</strong> The legal vocabulary. Every key term used
                elsewhere in the standard is defined here. Read this Part as glossary first, then
                refer back whenever a reg&apos;s meaning hinges on a defined term.
              </li>
              <li>
                <strong>Part 3 — Assessment of general characteristics.</strong> The
                pre-design assessment. What&apos;s the supply (TN-S, TN-C-S/PNB, TT)? What&apos;s
                the loading? What&apos;s the maintenance regime? What external influences apply?
                Chapters 31 to 36.
              </li>
              <li>
                <strong>Part 4 — Protection for safety.</strong> The most-used Part. Chapter 41
                (shock protection), 42 (thermal effects), 43 (overcurrent), 44 (voltage
                disturbances and electromagnetic), 46 (isolation and switching, expanded
                substantially under A4:2026). Reg 411.3.3 (RCD on socket-outlets), Reg 411.3.4
                (RCD on domestic luminaires) and Reg 421.1.7 (AFDDs) all live here.
              </li>
              <li>
                <strong>Part 5 — Selection and erection of equipment.</strong> The other
                most-used Part. Chapter 51 (common rules — including Reg 510.3 manufacturer&apos;s
                instructions and Section 514 identification &amp; notices), 52 (wiring systems),
                53 (protection / isolation / switching / control / monitoring), 54 (earthing
                arrangements and protective conductors), 55 (other equipment).
              </li>
              <li>
                <strong>Part 6 — Inspection and testing.</strong> Chapter 64 (initial
                verification — what an EIC certifies) and Chapter 65 (periodic inspection — what
                an EICR certifies). The test sequence and the condition-coding framework live
                here. IET GN3 is the practical companion.
              </li>
              <li>
                <strong>Part 7 — Special installations or locations.</strong> The 700-series
                regulations covering bathrooms (Section 701), swimming pools (702), saunas (703),
                construction sites (704), agricultural (705), exhibitions and shows (711), solar
                PV (712), caravans (721), EV charging (722), prefabricated buildings (730),
                medical locations (710), and many more. Each special location modifies or adds
                to the general rules in Parts 4 and 5.
              </li>
              <li>
                <strong>Part 8 — Functional requirements.</strong> Energy efficiency (Chapter
                81), prosumer&apos;s installations (Chapter 82). The newest Part — added to
                accommodate solar PV exports, battery storage and on-site generation.
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

          <ContentEyebrow>The reg-numbering convention</ContentEyebrow>

          <ConceptBlock
            title="Reg numbers as a navigation system, not a label"
            plainEnglish="BS 7671 reg numbers encode location. The first digit tells you the Part. The first two digits tell you the Chapter. The first three digits tell you the Section. The rest tell you the sub-section and individual regulation. So Reg 411.3.4 is Part 4, Chapter 41, Section 411, Sub-section 3, Regulation 4."
            onSite="Once this clicks, you stop looking up reg numbers in the index and start jumping straight to them. A senior electrician hears '411.3.4' and immediately knows it's about shock protection (Part 4), specifically about additional protection (Section 411 + Sub-section 3). The number is a navigation address."
          >
            <p>
              Worked example: Reg 522.8.1 (wiring system selection to avoid damage during
              installation, use or maintenance).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>5</strong> — Part 5, selection and erection.
              </li>
              <li>
                <strong>52</strong> — Chapter 52, wiring systems.
              </li>
              <li>
                <strong>522</strong> — Section 522, external influences (the section governs how
                wiring systems are selected to cope with their environment).
              </li>
              <li>
                <strong>522.8</strong> — Sub-section 8, mechanical stresses.
              </li>
              <li>
                <strong>522.8.1</strong> — the specific regulation about avoiding damage during
                installation.
              </li>
            </ul>
            <p>
              Same logic for any reg number. Practice on a few — Reg 411.3.4, Reg 421.1.7,
              Reg 514.16.1 — and the structure becomes second nature.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Part 2 — the definitions that matter</ContentEyebrow>

          <ConceptBlock
            title="Why scheme inspectors quote Part 2 verbatim"
            plainEnglish="Part 2 is the legal vocabulary. The technical regulations elsewhere in the standard use defined terms — 'exposed-conductive-part', 'extraneous-conductive-part', 'circuit', 'conductor', 'enclosure' — and those terms have ONE meaning across the whole document, set in Part 2. Use a term loosely and the reg you're trying to apply doesn't bite the way you thought."
            onSite="The classic worked example: 'exposed-conductive-part' (a conductive part of equipment that can be touched and is liable to become live in fault conditions — e.g. the metal casing of a Class I appliance) vs 'extraneous-conductive-part' (a conductive part liable to introduce a potential, generally Earth potential, NOT forming part of the electrical installation — e.g. a metallic water pipe coming in from outside). Same metallic object can fall into one category in one installation and the other in a different installation, depending on whether it's part of the electrical system or the building services. The bonding obligation is different for each."
          >
            <p>
              Eight Part 2 terms an apprentice should be able to define from memory:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit</strong> — an assembly of electrical equipment supplied from the
                same origin and protected against overcurrent by the same protective device(s).
              </li>
              <li>
                <strong>Conductor</strong> — a conductive part intended to carry electric
                current.
              </li>
              <li>
                <strong>Live part</strong> — a conductor or conductive part intended to be
                energised in normal use, including a neutral conductor (but, by convention, NOT
                the PEN conductor).
              </li>
              <li>
                <strong>Exposed-conductive-part</strong> — a conductive part of equipment which
                can be touched and which is not normally live, but which can become live under
                fault conditions.
              </li>
              <li>
                <strong>Extraneous-conductive-part</strong> — a conductive part liable to
                introduce a potential, generally Earth potential, and not forming part of the
                electrical installation.
              </li>
              <li>
                <strong>Earth electrode</strong> — a conductive part, which may be embedded in
                the soil or in a specific conductive medium (e.g. concrete or coke), in
                electrical contact with the Earth.
              </li>
              <li>
                <strong>Earth fault loop impedance (Zs)</strong> — the impedance of the earth
                fault current loop starting and ending at the point of an earth fault.
              </li>
              <li>
                <strong>Skilled person (electrically)</strong> — person who possesses, as
                appropriate to the nature of the electrical work to be undertaken, adequate
                education, training and practical skills, and who is able to perceive risks and
                avoid hazards which electricity can create.
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

          <ContentEyebrow>The deemed-to-comply doctrine</ContentEyebrow>

          <ConceptBlock
            title="Why a non-statutory standard runs the trade"
            plainEnglish="BS 7671 is published by BSI / IET, not by Parliament. Strictly speaking, ignoring it is not a criminal offence in itself. But the HSE's HSR25 guidance to EAWR cites BS 7671 as a means of demonstrating compliance with EAWR. So following BS 7671 = presumed to have met EAWR. Departing from it = burden flips onto you to prove your alternative was at least as safe."
          >
            <p>
              The legal logic in three steps:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                EAWR Reg 4 is statutory and requires that &apos;all systems shall at all times be
                of such construction as to prevent danger&apos;. Statutory means criminal
                sanction.
              </li>
              <li>
                EAWR doesn&apos;t tell you HOW to prevent danger — it&apos;s technology-agnostic.
                That detail is delegated to industry standards.
              </li>
              <li>
                HSR25 (the HSE&apos;s own guidance to EAWR) explicitly cites BS 7671 as a way of
                demonstrating compliance with EAWR for fixed installations. So evidence of BS
                7671 compliance becomes evidence of EAWR compliance.
              </li>
            </ol>
            <p>
              The result: BS 7671 is non-statutory by status but quasi-mandatory in practice.
              Departing from it is technically allowed if you can prove an equivalent safety
              level — but that burden is heavy and rarely worth the fight. The trade follows BS
              7671 because departing from it would expose you on the EAWR charge.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.1.1"
            clause={
              <>
                &quot;Good workmanship by one or more skilled or instructed persons and proper
                materials shall be used in the erection of the electrical installation. The
                installation of electrical equipment shall take account of manufacturers&apos;
                instructions.&quot;
              </>
            }
            meaning={
              <>
                The foundation regulation. Two phrases worth dwelling on. &apos;Skilled or
                instructed persons&apos; is the BS 7671 equivalent of EAWR Reg 16 — competence is
                required. &apos;Take account of manufacturers&apos; instructions&apos; is the
                hook that turns ignoring an SPD lead-length spec or a CU manufacturer&apos;s
                torque setting into a regs breach. 134.1.1 backstops every other chapter — the
                regulation a scheme inspector quotes when calling out poor workmanship without it
                being a specific technical-test failure.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.1.1 — verbatim from the published standard."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 510.3"
            clause={
              <>
                &quot;Every item of equipment shall be selected and erected so as to allow
                compliance with the regulations stated in this chapter and the relevant
                regulations in other parts of BS 7671 and shall take account of manufacturers&apos;
                instructions.&quot;
              </>
            }
            meaning={
              <>
                The Part 5 (selection and erection) version of the manufacturer&apos;s-instruction
                obligation. 134.1.1 is the principle; 510.3 is the operational rule. Selection
                AND erection both have to take account of the manufacturer&apos;s literature. So
                fitting a CU to one brand&apos;s schematic and stuffing it with another
                brand&apos;s modules — without checking compatibility — puts you in breach of
                510.3 even if every individual component is fine on its own.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 510.3 — verbatim from the published standard."
          />

          <SectionRule />

          <ContentEyebrow>Part 7 — special installations or locations</ContentEyebrow>

          <ConceptBlock
            title="Where the rules change for non-standard environments"
            plainEnglish="Part 7 (the 700-series sections) covers installations where the general rules in Parts 4 and 5 need to be modified or added to because of the environment — wet, hot, public, agricultural, medical, exhibition, prefabricated. Each special location has its own section and the rules in that section override or supplement the general rules for that location only."
            onSite="The Part 7 section you'll meet first as a domestic apprentice is Section 701 — locations containing a bath or shower. It defines zones (0, 1, 2 — abolished old zone 3), restricts what equipment can go where, and sets supplementary bonding requirements. Bathrooms are also one of the few domestic spaces where Part P notification is mandatory for additions/alterations to existing circuits, regardless of whether the circuit itself is new."
          >
            <p>
              The Part 7 sections an apprentice will meet most often:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 701</strong> — locations containing a bath or shower.
                Zone-based equipment selection, supplementary bonding rules.
              </li>
              <li>
                <strong>Section 702</strong> — swimming pools and other basins.
              </li>
              <li>
                <strong>Section 704</strong> — construction and demolition site installations.
                Where temporary supplies and harder RCD protection requirements live.
              </li>
              <li>
                <strong>Section 705</strong> — agricultural and horticultural premises.
              </li>
              <li>
                <strong>Section 711</strong> — exhibitions, shows and stands.
              </li>
              <li>
                <strong>Section 712</strong> — solar PV power supply systems. Increasingly
                relevant for any domestic install with a roof array.
              </li>
              <li>
                <strong>Section 721</strong> — caravans and motor caravans.
              </li>
              <li>
                <strong>Section 722</strong> — electric vehicle charging installations. The
                fast-growing area for new install work; the section sets DC fault protection
                requirements (Type B RCD or equivalent), labelling, isolation and energy
                management rules.
              </li>
              <li>
                <strong>Section 730</strong> — onshore units of inland navigation vessels (and
                similar prefabricated buildings).
              </li>
            </ul>
            <p>
              The cross-reference rule for Part 7: each section adds to or modifies the general
              rules elsewhere in BS 7671 for the location it covers. So you read the relevant
              700-series section AND the underlying general rules together — the Part 7 wording
              tells you what&apos;s different in this special location, not the entire ruleset.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The appendices that matter</ContentEyebrow>

          <ConceptBlock
            title="Where the practical reference material lives"
            plainEnglish="The numbered Parts hold the regulations. The appendices hold the practical reference data — current-carrying capacity tables, voltage drop tables, model forms, installation guidance. Working installers reach for the appendices as often as the chapters."
          >
            <p>
              The appendices an installer pulls regularly:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Appendix 1</strong> — British Standards referenced in BS 7671. The
                lookup table for every BS EN cited (BS EN 60898 MCBs, BS EN 61008/61009
                RCDs/RCBOs, BS EN 62606 AFDDs, BS EN 61439 assemblies, etc).
              </li>
              <li>
                <strong>Appendix 3</strong> — Time/current characteristics of overcurrent
                protective devices. Used for adiabatic and disconnection-time calculations.
              </li>
              <li>
                <strong>Appendix 4</strong> — Current-carrying capacity and voltage drop for
                cables. The big tables (Tables 4D1A, 4D2A, 4D5 etc) for sizing cables under
                different installation methods. Most-used appendix on a typical design.
              </li>
              <li>
                <strong>Appendix 6</strong> — Model forms for certification and reporting.
                EIC, EICR, Minor Works, schedule of test results, schedule of inspections.
                Substantially redrafted under A4:2026 to add new schedule columns.
              </li>
              <li>
                <strong>Appendix 12</strong> — Voltage drop in consumer&apos;s installations.
                The 3% lighting / 5% other-use limits and the worked-example tables.
              </li>
              <li>
                <strong>Appendix 15</strong> — Ring and radial final circuit arrangements,
                Regulation 433.1.204. The classic ring-final guidance for domestic socket
                circuits.
              </li>
              <li>
                <strong>Appendix 17</strong> — Energy efficiency. Used for Part 8 (functional
                requirements) compliance.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>A4:2026 — the headline changes</ContentEyebrow>

          <ConceptBlock
            title="What's new in the current amendment"
            plainEnglish="A4:2026 is the fourth amendment to the 2018 base edition. It introduces some genuinely new regulations and substantially redrafts others. Knowing the headline changes by topic is more important than memorising the exact reg numbers."
            onSite="Three categories of change in A4:2026 — brand new regulations, substantially redrafted regulations, and updated model forms. The new regs raise the protection floor. The redrafted regs tighten the existing rules. The model forms add new columns to capture the new requirements (so an out-of-date EIC template will now miss required fields)."
          >
            <p>
              The brand-new regulations introduced by A4:2026:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 411.3.4</strong> — additional protection by an RCD with a rated
                residual operating current not exceeding 30 mA shall be provided for AC final
                circuits supplying luminaires within domestic (household) premises. Genuinely
                new, changes the design pattern for all new domestic lighting circuits.
              </li>
              <li>
                <strong>Reg 514.16.1</strong> — a label is required to indicate the presence of
                an SPD (with an exception for domestic / household premises). New labelling
                requirement.
              </li>
              <li>
                <strong>Reg 521.11.201</strong> — escape route cabling requirements (newly
                introduced provisions on cables along escape routes — to limit fire/smoke
                propagation along evacuation paths).
              </li>
            </ul>
            <p>
              The substantially redrafted regulations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 411.3.3</strong> — revised: now applies to socket-outlets with a
                rated current not exceeding 32 A (previously 20 A). Exception to omit RCD
                protection where, other than for a dwelling, a documented risk assessment
                determines that RCD protection is not necessary.
              </li>
              <li>
                <strong>Reg 421.1.7</strong> — expanded: the existing AFDD recommendation
                strengthened, with broader application to AC final circuits in fixed
                installations to mitigate fire risk from arc fault currents.
              </li>
              <li>
                <strong>Section 443</strong> — redrafted: protection against transient
                overvoltages of atmospheric origin or due to switching. The decision tree for
                when SPDs are required moved to a risk-assessment basis with specific scenarios
                listed (consequences for human life, public services, commercial/industrial
                activity, large numbers of co-located individuals).
              </li>
            </ul>
            <p>
              Plus model form revisions in Appendix 6 — new schedule columns to capture the new
              AFDD presence, SPD presence and labelling, RCD-on-luminaires verification, and the
              explicit recognition of PNB (Protective Neutral Bonding) as a TN-C-S sub-arrangement
              on the inspection schedules.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.4 (NEW)"
            clause={
              <>
                &quot;Regulation 411.3.4 requires that, within domestic (household) premises,
                additional protection by an RCD with a rated residual operating current not
                exceeding 30 mA shall be provided for AC final circuits supplying luminaires.&quot;
              </>
            }
            meaning={
              <>
                Brand new under A4:2026. Until A4 came in, 30 mA RCD protection on a domestic
                lighting circuit was a recommendation, not a requirement, and was commonly
                designed-out on cost grounds. From A4:2026 onwards every new domestic lighting
                circuit needs 30 mA additional protection. The implication on site: every CU
                spec for a new dwelling or rewire from A4:2026 onwards needs RCBO protection on
                lighting circuits, not just on socket circuits.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Section 411 — verbatim from the published amendment text."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.16.1 (NEW)"
            clause={
              <>
                &quot;Regulation 514.16.1 has been introduced requiring a label to indicate the
                presence of SPDs. However, there is an exception for domestic (household)
                premises or similar.&quot;
              </>
            }
            meaning={
              <>
                New SPD-presence labelling requirement under A4:2026. The label has to be at the
                origin of the installation or at a location accessible to a competent person
                undertaking inspection or maintenance, so that anyone subsequently working on the
                installation knows an SPD is present. Domestic exception aside, every commercial
                / industrial install with an SPD needs the label — no excuse for not knowing it&apos;s
                there.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Section 514 — verbatim from the published amendment text."
          />

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
            title="Mis-classifying an extraneous-conductive-part as exposed (or vice versa) and bonding wrong"
            whatHappens={
              <>
                Apprentice on a domestic CU change sees an incoming metallic water pipe and a
                metal radiator. Bonds both with 10 mm&sup2; main protective bonding to the MET.
                Inspector visits later and codes a C2 — the radiator is fed from a plastic
                heating system, isn&apos;t introducing an external Earth potential, and is NOT
                an extraneous-conductive-part under Part 2&apos;s definition. Bonding it
                incorrectly suggests confusion about what the bonding is for and may even
                introduce risk by creating an unintended Earth path through the radiator.
              </>
            }
            doInstead={
              <>
                Read the Part 2 definitions before bonding decisions. Test extraneous-conductive
                status by checking insulation resistance to Earth (BS 7671 doesn&apos;t mandate
                a specific test but a reading above ~22 kΩ to Earth indicates the part is NOT
                introducing Earth potential). Bond what needs bonding under Reg 411.3.1.2; leave
                what doesn&apos;t. Document the decision on the EIC.
              </>
            }
          />

          <CommonMistake
            title="Working to an out-of-date amendment because that's the book on the firm's shelf"
            whatHappens={
              <>
                Firm bought the 18th Edition base book in 2019 and never renewed the IET
                subscription. Apprentice is signing certs in 2026 referencing &apos;BS
                7671:2018&apos; without the A4 amendment. The cert is missing the new schedule
                columns introduced by A4 (AFDD presence, SPD label, RCD-on-luminaires
                verification), the lighting circuit isn&apos;t designed with the new 411.3.4 RCD
                requirement, and the SPD on the install isn&apos;t labelled per 514.16.1. The
                next EICR or scheme audit will pick up all three.
              </>
            }
            doInstead={
              <>
                Always work to the current amendment. Renew the IET subscription so everyone has
                the live edition. Check the model form templates against Appendix 6 of the
                current edition — if the columns don&apos;t match, the template is out of date.
                The technical content moves; staying current is part of competence under EAWR
                Reg 16.
              </>
            }
          />

          <Scenario
            title="EICR fail because the SPD label is missing on a new commercial install"
            situation={
              <>
                Your firm completed a small commercial unit fit-out in early 2026 with an SPD
                fitted at the origin per the customer&apos;s spec. EIC issued. Customer
                commissions a periodic EICR three years later — different firm. Inspector codes a
                C3 (improvement recommended) for the absence of the SPD-presence label required
                under Reg 514.16.1, which was new under A4:2026 and was therefore in force when
                the install was completed. Customer is on the phone asking why the original cert
                says &apos;compliant&apos; when the inspector has now flagged a regs breach.
              </>
            }
            whatToDo={
              <>
                Two issues to separate. (1) The label is straightforward to retrofit — fit the
                label, document the remediation in writing to the customer, and the C3 closes
                out. (2) The original EIC is technically incorrect because the install
                wasn&apos;t fully compliant with A4:2026 at the time of certification — the firm
                needs to issue an amended EIC noting the corrective action. Don&apos;t argue the
                point with the inspector — the requirement was in force, the label wasn&apos;t
                fitted, the C3 stands. Use the experience to update the firm&apos;s commissioning
                checklist for A4:2026 requirements going forward.
              </>
            }
            whyItMatters={
              <>
                A4:2026 introduced multiple small requirements that a 2018-base-only checklist
                will miss — SPD label, RCD on domestic luminaires, expanded AFDD scope, escape
                route cabling provisions. None are individually expensive to comply with. All are
                expensive to fix retrospectively after a scheme audit or an EICR. Update the
                commissioning checklist once and the new requirements become routine.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671:2018+A4:2026 is the IET Wiring Regulations. Eight Parts plus appendices. Non-statutory but the deemed-to-comply route to EAWR Reg 4 via HSR25.",
              "Eight-Part map — Part 1 principles, Part 2 definitions, Part 3 assessment, Part 4 protection, Part 5 selection and erection, Part 6 inspection and testing, Part 7 special locations, Part 8 functional requirements.",
              "Reg numbers encode location — first digit = Part, first two = Chapter, first three = Section. Reg 411.3.4 = Part 4 / Chapter 41 / Section 411 / Sub-section 3 / Reg 4.",
              "Part 2 (Definitions) is the legal vocabulary. 'Exposed-conductive-part' and 'extraneous-conductive-part' are different categories with different bonding obligations. Use the defined terms with their defined meanings.",
              "Reg 134.1.1 (workmanship and manufacturer's instructions) and Reg 510.3 (selection and erection takes account of manufacturer's instructions) backstop every other technical chapter.",
              "A4:2026 headline new regs — 411.3.4 (30 mA RCD on domestic luminaires), 514.16.1 (SPD label), 521.11.201 (escape route cabling). Substantially redrafted — 411.3.3 (RCD on socket-outlets up to 32 A), 421.1.7 (AFDDs), Section 443 (transient overvoltage). Plus updated model forms in Appendix 6.",
              "Working installer skill is navigation, not memorisation. Know the Part / Chapter / Section convention and the appendix list — the regs find themselves.",
              "Always work to the current amendment. Out-of-date editions miss new schedule columns, miss new protection requirements, and produce certs that fail later EICRs and scheme audits.",
            ]}
          />

          <Quiz title="BS 7671 deep dive — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 EAWR 1989 deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.6 Competent Person Schemes and insurance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
