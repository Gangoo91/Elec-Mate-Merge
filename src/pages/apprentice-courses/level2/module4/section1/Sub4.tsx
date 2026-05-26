/**
 * Module 4 · Section 1 · Subsection 4 — Cable-prep tools deep dive
 * SUPPLEMENTARY content — sits alongside the AC-tagged subs to give a deep
 * dive into the cable preparation and termination toolkit. No direct AC tag,
 * but reinforces 1.1, 1.2 and the LO3 termination outcomes to come.
 *
 * Frame: strippers (auto vs manual vs preset jaws), cable cutters (rotary,
 * T+E shears, side cutters), crimpers (ratchet H-die for ferrules, hex die
 * for compression lugs, hydraulic for bigger), ferrule colour code, torque
 * tools and the BS 7671 526.1 + 134.1.1 link.
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
  'Cable-prep tools deep dive (supplementary) | Level 2 Module 4.1.4 | Elec-Mate';
const DESCRIPTION =
  'Strippers, cutters, crimpers, ferrule kits, torque drivers — the precision tools that turn a cable end into a BS 7671 526.1-compliant termination. Bootlace ferrule colour codes, ratchet vs hex vs hydraulic crimpers, and the typical 1.2–3.5 Nm torque settings for UK distribution boards.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod4-s1-sub4-ferrule-colour',
    question:
      "You're terminating 2.5 mm² stranded core into a Hager RCBO. The senior electrician hands you a ferrule kit and says 'pick the right colour'. Which one?",
    options: [
      "A pilot drill bit guides the hole saw, cutting fluid/lubricant should be used, speed should be moderate (high speed generates excessive heat), and the workpiece should be clamped or supported",
      "Automatic fault detection, location and isolation (FLISR — Fault Location, Isolation and Service Restoration) — reducing the number of customers affected by faults and the duration of power cuts by automatically reconfiguring the network",
      "Blue — the standard DIN 46228-4 colour code for bootlace ferrules: red 1.0 mm², grey 0.75 mm², black 1.5 mm², blue 2.5 mm², grey 4.0 mm² (some makers use orange or grey here), yellow 6.0 mm², red 10.0 mm². For 2.5 mm² stranded, blue is the universal answer.",
      "Allows EVs to discharge stored battery energy back to the grid or building during peak demand periods — effectively using the EV battery as a distributed energy storage resource, providing grid services and reducing electricity costs for the vehicle owner",
    ],
    correctIndex: 2,
    explanation:
      "DIN 46228-4 is the German standard the whole European ferrule industry follows. The colour-by-CSA chart that matters most to a UK apprentice: black 1.5 mm², blue 2.5 mm², (grey/orange) 4.0 mm², yellow 6.0 mm², red 10.0 mm², blue 16.0 mm², yellow 25.0 mm², red 35.0 mm². Memorise the 2.5 / 4 / 6 / 10 line — they cover 90% of domestic and small commercial work.",
  },
  {
    id: 'mod4-s1-sub4-torque',
    question:
      "Hager's installation literature for a 6 kA RCBO specifies a torque of 2.5 Nm on the conductor terminal screws. You over-torque to 4 Nm. What's the consequence?",
    options: [
      "Internal = report within your firm to the responsible person (H&S manager, contracts manager, director). External = report to a regulator (HSE for H&S, Environment Agency for pollution, local authority for some EHO matters, scheme body like NICEIC for installation defects). Most issues need both — internal first, then the firm\\\\\\\\\\\\\\\\'s responsible person decides on external.",
      "Micro-expressions reveal genuine emotions that a person may be trying to conceal, providing empathic individuals with additional emotional data. Recognising a flash of fear or contempt that someone is hiding can help you respond to their actual emotional state rather than just their words",
      "Over-torque deforms the screw thread and can crack or strip it; deforms the conductor strands; can split the bus-bar pocket on the RCBO; voids the manufacturer's warranty; and breaches BS 7671 526.1 (manufacturer's instructions form part of the 'durable mechanical strength' requirement). The terminal may pass test today but degrades faster than spec — fails on a future EICR.",
      "Reg 514.16.1 — introduced by A4:2026, requiring a label to indicate the presence of SPDs (with an exception for domestic / household premises). Located in Part 5 (selection and erection), Chapter 51 (common rules), Section 514 (identification and notices). Knowing the labelling regs live in Section 514 is faster than searching by reg number.",
    ],
    correctIndex: 2,
    explanation:
      "Over-torque is just as bad as under-torque. The terminal is engineered for a specific clamping force; exceeding it deforms the parts beyond their design envelope. UK consumer-unit terminals typically run 1.2 Nm (small accessory screws) to 3.5 Nm (larger CU bus-bar terminals). Always use a calibrated torque driver (preset Wera Click-Torque or similar) set to the manufacturer's value. BS 7671 134.1.1 (workmanship) and 526.1 both bite when over-torque damages the termination.",
  },
  {
    id: 'mod4-s1-sub4-ratchet-crimper',
    question:
      "You're crimping a blue 2.5 mm² bootlace ferrule onto a stranded core. Why is a ratchet crimper the right tool and not a generic plier crimper?",
    options: [
      "IQA Level 4 (Internal Quality Assurance) is the qualification for verifying assessment quality — you sample and second-mark other assessors' work to ensure consistency. Senior progression beyond TAQA L3. Typical course 5-10 days plus portfolio. Required for IQA roles at colleges and training providers, and for senior assessor positions. Can lead to EQA (External Quality Assurance) at L4 — the awarding body's own QA function.",
      "Wind shear from neighbouring buildings. Domestic-scale turbines need clean laminar wind, which only happens at hub heights well clear of surrounding obstacles. In a typical suburban garden the turbine sits in turbulent air, the yield is well below the manufacturer's wind-tunnel claims, and the noise / vibration interface is poor. Even where the planning application succeeds, the energy yield often disappoints. Wind makes sense in open rural settings with tall masts; it does not make sense in suburban back gardens.",
      "A ratchet crimper applies a controlled, repeatable force and won't release until the full crimp is completed — the ratchet only opens at the bottom of stroke. That guarantees full compression of the ferrule barrel onto the strands every time. A generic plier crimper depends entirely on the operative's hand strength and grip technique — under-crimps are common, the ferrule can pull off in service. BS 7671 526.1 'durable mechanical strength' is what's at stake.",
      "A voltage indicator that complies with HSE Guidance Note GS38 — purpose-built for proving dead, not a multimeter. Features: physically robust, non-current-limiting fuse, finger barriers, suitable probes, low loop impedance through the indicator. A multimeter on the wrong setting can give a false dead reading; GS38 indicators are designed to fail safe.",
    ],
    correctIndex: 2,
    explanation:
      "Ratchet crimpers (Knipex 97 53 04 'self-adjusting', Klauke K30, CK Ratchet Crimper) lock the jaws closed until full compression is reached. That gives a consistent, repeatable, fully-formed crimp that hand-pliers can't match. For ferrules and small lugs (up to 6–10 mm²) the ratchet crimper is the standard. Above 10 mm² you typically move to hex-die ratchet crimpers, then to hydraulic for the largest sizes.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "BS 7671 Reg 526.1 covers connections between conductors and equipment. How does the choice of crimping tool affect compliance?",
    options: [
      "Apprenticeship standards (gov.uk) require evidence of at least 20% of the apprenticeship being off-the-job training. The log records day-release at college, online courses, structured study time, shadowing in unfamiliar areas, and any other learning activity outside normal productive work. Without it, the apprenticeship may not meet the standards required for the End-Point Assessment to be funded and certified.",
      "Directly. 526.1 requires 'durable electrical continuity and adequate mechanical strength'. A ratchet crimper applied to a correctly-sized ferrule produces a controlled, repeatable, fully-compressed connection that holds the strands firmly under thermal cycling. A pliers-style crimp varies with operator strength, gives inconsistent compression, and the connection can loosen — failing both legs of 526.1 (continuity drifts up, mechanical strength inadequate).",
      "No. The right to join (or not join) a trade union is protected by the Trade Union and Labour Relations (Consolidation) Act 1992. Employers cannot dismiss, demote, refuse to hire, or treat less favourably any worker because they're a trade union member or because they take part in lawful trade union activities. Anti-union discrimination is unlawful.",
      "By providing an installation earth electrode connected to the main earthing terminal of the installation by a protective conductor complying with Regulation 544.1.1, used as the means of earthing for the charging point protective conductor contact. The earth electrode resistance is determined per Annex A722.3 to ensure the MET-to-earth voltage does not exceed 70 V RMS under a PEN open-circuit fault.",
    ],
    correctAnswer: 1,
    explanation:
      "526.1 is about the WHOLE termination, not just the screw. The crimp at the conductor end is part of the termination chain — get it wrong and the rest of the chain fails over time. Ratchet crimpers exist precisely so the crimp is no longer dependent on operator strength. The IET Best Practice Guides and most consumer-unit manufacturers' install literature now explicitly recommend ratchet-crimped ferrules for stranded conductors entering screw terminals.",
  },
  {
    id: 2,
    question:
      "Which combination of crimper types covers an apprentice's typical termination range from 0.5 mm² to 50 mm²?",
    options: [
      "Because EAWR is the trade-specific instrument made under HASAWA's enabling powers (s.15) — but HASAWA's general duties (s.2, s.3, s.7) sit underneath the EAWR breach as the broader safe-system / personal-duty obligations. Charging both gives the prosecution two routes to conviction and lets the court assess culpability across both the specific technical reg AND the broader systems-of-work failure.",
      "Phase 1 (Days 1-30): Foundation — self-assessment, identify target competency, establish baseline, begin daily reflection practice, and find an accountability partner. Phase 2 (Days 31-60): Practice — apply new skills in specific situations, gather feedback, adjust approach based on results. Phase 3 (Days 61-90): Integration — embed new behaviours into routine, measure progress against baseline, plan for ongoing development",
      "Three crimpers — (1) ratchet H-die crimper for bootlace ferrules and small insulated lugs (0.5 to 6 mm² covers 90% of domestic / small commercial work, e.g. Knipex 97 53 04). (2) Hex-die ratchet crimper for compression lugs 10 to 25 mm² (e.g. Knipex 97 51 19). (3) Hydraulic crimper for compression lugs and bushings 25 to 240 mm² (e.g. Klauke EK 50 cordless or hand-pump units for one-off work). Layered range, each tool sized to its job.",
      "Apprentice is a formal JIB grade for someone in a registered apprenticeship — typically a learner working towards the C&G 2365 (or NVQ Level 3) and the AM2. 'Improver' is not a formal JIB grade — it's a colloquial industry term sometimes used for the post-college, pre-AM2 stage where the learner has completed the technical qualifications but not yet sat the AM2. Once AM2 is passed and JIB processes the upgrade, the worker becomes an Electrician on the JIB scale.",
    ],
    correctAnswer: 2,
    explanation:
      "Three tools because a single crimper can't span the full range — the force needed for a 50 mm² compression lug is hundreds of times the force needed for a 0.75 mm² ferrule. Ratchet H-die for ferrules and small lugs; hex-die ratchet for medium; hydraulic for large. Apprentices usually inherit the first two from the firm; the hydraulic is shared kit or hire-only on bigger jobs.",
  },
  {
    id: 3,
    question:
      "When stripping the outer sheath of an SWA (steel wire armoured) cable, what's the right tool?",
    options: [
      "To enable the customer to operate the install correctly, recognise fault conditions, perform any user-level routine checks (e.g. weekly fire-alarm test) and know when to call you back. Without them the customer can't discharge their own legal duties (e.g. fire-alarm log under the Regulatory Reform (Fire Safety) Order 2005) and is more likely to mis-use or under-maintain the kit.",
      "Present both statistics in a lessons learnt briefing, analyse why entrapment is increasing despite overall fatality improvements, review all current entrapment prevention measures, implement additional controls such as secondary guarding and enhanced training, set measurable targets for entrapment reduction, and monitor progress quarterly using the PDCA cycle",
      "Set the meter to INRUSH mode. Clamp around one phase (or the L of a single-phase motor). Press start to arm the capture. Operate the load (start the motor). The meter captures the peak current in the first 100 ms after the rising edge of current — typically 6–10× the running current for an induction motor, higher for HVAC compressors. Useful for diagnosing nuisance trips on an undersized breaker (the inrush exceeds the magnetic trip threshold on a Type B breaker; replace with Type C or D for high-inrush loads).",
      "A rotary cable stripper (Jokari Quadro, Knipex 16 95 02, BAHCO 4490) — sized to the SWA outer diameter, runs around the sheath cleanly and removes a length to expose the armour without scoring the inner cores. Stanley knives can do it but the risk of scoring the inner is high; rotary strippers are the standard. For the armour itself — separate tool (armour shears for smaller, angle grinder for bigger) covered in Sub 1.2.",
    ],
    correctAnswer: 3,
    explanation:
      "Rotary cable strippers do for round multi-core cables what auto-strippers do for individual conductors — they remove the outer cleanly without going through to the inner. SWA prep is a multi-tool operation: rotary stripper for outer sheath, armour shears or angle grinder for the steel-wire armour, then individual core strippers for the inner conductors before terminating. Doing all three with a Stanley is asking for trouble.",
  },
  {
    id: 4,
    question:
      "Why does the standard DIN 46228-4 ferrule colour code matter on a panel build?",
    options: [
      "Three reasons. (1) Speed of selection — colour-coded ferrules let you grab the right size at a glance from a sorted ferrule kit. (2) Inspection — supervisor or QA can check at a glance that the ferrule colour matches the conductor CSA on every termination. (3) Standardisation — DIN 46228-4 is recognised across Europe, so any supplier's ferrules match any other's. The colour code IS the inspection mechanism.",
      "Yes — apprentices are workers and Reg 15 applies in full. The competence duty in Reg 15(1)(a) is satisfied because apprentices are 'in the process of obtaining' the competence (which is why they're always supervised). The report-hazards duty (Reg 15(1)(b)) and the co-operation duty (Reg 15(1)(c)) apply identically to apprentices and to fully-qualified electricians.",
      "Main protective bonding equalises potential between extraneous-conductive-parts (gas, water, structure) and the MET. The earthing conductor connects the MET back to the source earth (PEN, sheath, or local electrode) so fault current can actually return to the source — without it, no current flows and no disconnection happens.",
      "(1) T+E shears or rotary cable stripper to crop the conductor square and to the right length. (2) Auto-stripper or preset 4 mm² stripper to remove insulation cleanly without nicking strands. (3) (Optional but preferred) — slip a grey 4 mm² bootlace ferrule on, ratchet-crimp it. (4) Insert into terminal. (5) Tighten with preset torque driver to manufacturer's value (typically 2–3 Nm for Schneider isolators).",
    ],
    correctAnswer: 0,
    explanation:
      "Colour code is a quality-control mechanism. A panel built to DIN 46228-4 has every termination colour-matched to its conductor; an inspector can scan along a row of 200 terminations and immediately spot a mismatch (red ferrule on a 2.5 mm² conductor stands out instantly). Without the code you'd need to verify each individually. Ferrule kits come in pre-sorted boxes (Klauke, Knipex, Weidmüller) with each compartment labelled by CSA and colour.",
  },
  {
    id: 5,
    question:
      "A preset Wera Click-Torque screwdriver set to 2.5 Nm — what does the 'click' mean physically?",
    options: [
      "Stop immediately. Re-isolate at the correct point. Prove dead again. Investigate why the original isolation was incomplete (wrong device locked off, back-fed circuit, alternative supply source, parallel CPC path, induced voltage). Document the near-miss.",
      "The set torque has been reached. Inside the handle is a calibrated spring-loaded cam mechanism. As torque rises the cam loads the spring; at the preset value the cam slips and you feel/hear an audible click and a tactile drop in resistance. That signals 'stop turning' — keep going past the click and you over-torque the connection.",
      "Teams with high collective EI can better understand client concerns, communicate their approach empathetically, build trust during interviews, handle challenging questions with composure, and demonstrate collaborative working relationships — all of which influence bid evaluations",
      "Batteries can respond to frequency deviations within milliseconds (compared to seconds or minutes for conventional generators), injecting or absorbing power almost instantaneously to stabilise the grid frequency at 50 Hz — this fast response is increasingly critical as intermittent renewables replace conventional synchronous generators that provided inherent inertia",
    ],
    correctAnswer: 1,
    explanation:
      "Click-torque is a mechanical signal that the preset value has been reached. The right technique is to apply firm steady force, feel the click, and STOP. Apprentices commonly continue turning after the click — that defeats the whole point of the tool. The click is the stop signal, not a checkpoint to push past. Wera, Wiha, Norbar and Teng all make click-torque drivers and wrenches on the same principle.",
  },
  {
    id: 6,
    question:
      "Why do consumer-unit manufacturers (Hager, Schneider, Wylex) publish specific torque values in their install literature, and why does it matter to an apprentice?",
    options: [
      "HASAWA s.2 requires every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. Section 2(2)(a) explicitly requires the provision of safe systems of work, and a clear management structure with defined supervisory responsibilities is part of that. An employer who can't say who supervises whom is in breach of s.2.",
      "Starting each week by asking your team: \\\\\\\"What obstacles are you facing that I can help remove?\\\\\\\" — then using empathy to understand the real blockers (which may be emotional as well as practical), self-regulation to resist the urge to micromanage the solutions, coaching to develop the team\\\\\\\\\\\\\\\\\\\\\\\\'s own problem-solving capability, and genuine follow-through that builds trust. The leader serves by enabling, not by doing everything themselves",
      "Because the terminal is engineered to clamp at a specific force range — too little, the conductor isn't held firmly and the joint runs hot; too much, the parts deform and crack. The published value is the engineering specification. BS 7671 134.1.1 says installations must comply with manufacturers' instructions; ignoring the published torque value breaches 134.1.1 directly. NICEIC / NAPIT scheme assessments check this at audit.",
      "WEEE removed during install or repair must be segregated from general waste and routed to an Approved Authorised Treatment Facility (AATF) for recovery and recycling. The waste producer (you or your employer) holds the Duty of Care under the Environmental Protection Act 1990 to ensure the waste is properly described, transferred to an authorised waste carrier, and accompanied by a waste transfer note that is retained for at least two years. Many electrical wholesalers operate as WEEE collection points under the Distributor Take-Back Scheme.",
    ],
    correctAnswer: 2,
    explanation:
      "Torque values are engineering data, not marketing fluff. They reflect the design clamping force the terminal needs to maintain electrical contact under thermal cycling. BS 7671 134.1.1 makes manufacturers' instructions part of the workmanship requirement. The standard tool is a preset torque driver matched to the manufacturer's value (1.2 Nm typical for accessory screws, 2.0 Nm for RCBOs, 3.5 Nm for main switch and bus-bar terminals).",
  },
  {
    id: 7,
    question:
      "An apprentice is prepping the end of a 4 mm² stranded conductor for terminating into a Schneider isolator. Which tool sequence gives a tidy, code-compliant termination?",
    options: [
      "A material breach is one which an inspector reasonably opines is sufficiently serious that it warrants written notification — letter, notice or report. The HSE's Enforcement Management Model is the published decision tool. Once a material breach is identified, FFI invoicing starts from the inspector's first time spent on the matter.",
      "Whenever they design, supply or commission an article (including a control panel, a bespoke distribution board, a prefabricated assembly) for use at work — they must ensure it is safe and without risks to health when properly used, and supply adequate information about safe use, installation and dismantling. So a contractor designing a one-off control panel for a commercial customer is captured by s.6 as well as by EAWR.",
      "Management of Health and Safety at Work Regulations 1999, Reg 3 — every employer (and every self-employed person) must make a 'suitable and sufficient' assessment of the risks to the health and safety of employees and of anyone else affected by their undertaking. Where there are five or more employees the significant findings must be recorded.",
      "(1) T+E shears or rotary cable stripper to crop the conductor square and to the right length. (2) Auto-stripper or preset 4 mm² stripper to remove insulation cleanly without nicking strands. (3) (Optional but preferred) — slip a grey 4 mm² bootlace ferrule on, ratchet-crimp it. (4) Insert into terminal. (5) Tighten with preset torque driver to manufacturer's value (typically 2–3 Nm for Schneider isolators).",
    ],
    correctAnswer: 3,
    explanation:
      "Five-step sequence — crop, strip, ferrule, insert, torque. The ferrule is optional for stranded conductors but strongly preferred — it gives a cylindrical, fully-formed end that the screw clamps cleanly without splaying or crushing strands. Without the ferrule, the screw can splay the strands sideways and catch only some of them, leaving the rest unconfined and creating a high-resistance fault waiting to happen.",
  },
  {
    id: 8,
    question:
      "BS 7671 Reg 134.1.1 — 'good workmanship by competent persons and proper materials shall be used in the erection of the electrical installation'. How does this connect to the cable-prep toolkit?",
    options: [
      "Directly — every tool in the cable-prep kit (auto strippers, ratchet crimpers, preset torque drivers, calibrated test instruments) exists to deliver consistent, repeatable, manufacturer-spec terminations. 'Good workmanship' is delivered through the tools as much as through the operative's skill. An apprentice using the right tool the right way produces 134.1.1-compliant work; using the wrong tool (knife strip, plier crimp, eyeballed torque) produces work that fails 134.1.1 even if it tests OK on the day.",
      "Three reasons. (1) Density — many terminations in a small space; many opportunities for one to be wrong. (2) Heat — control electronics generate heat; cooling is often inadequate; thermal cycling stresses components. (3) Vibration — panels in plant rooms and on walls near equipment vibrate; vibration loosens terminations over time. Approach: always work on de-energised, isolated panels under permit-to-work where applicable; identify each component's function from the panel schedule; check terminations with thermal imaging while running; replace components by part number from the schedule; retest each output to verify correct operation.",
      "It marks the entry as absolute hazardous waste — always hazardous regardless of concentration or test result. Non-asterisked entries are non-hazardous; entries with mirror codes (one starred, one not) require a hazardous-property assessment on the specific waste before deciding which code applies. The List of Waste regulations and the Environment Agency technical guidance set out the assessment methodology.",
      "Roughly 60-100 GBP per AFDD-RCBO device times 10 circuits = 600-1000 GBP additional cost over standard RCBO-only protection. Labour is similar (each AFDD-RCBO replaces an RCBO, same install effort). Total upgrade premium for AFDD-protected CU vs RCBO-only typically 600-1200 GBP. Worth quoting on every domestic CU change as a \\\\\\\"premium fire-protection option\\\\\\\" — many customers will pay the premium when the value is explained.",
    ],
    correctAnswer: 0,
    explanation:
      "134.1.1 is the 'workmanship' regulation that sits behind every termination and every connection. The cable-prep toolkit IS how workmanship is delivered in practice — auto strippers protect conductor integrity, ratchet crimpers deliver consistent crimps, preset torque drivers deliver consistent clamping. Take the tools away and the apprentice's 'workmanship' becomes operator-dependent and inconsistent. The right tools turn 134.1.1 from an aspirational sentence into achievable everyday practice.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Do I need a torque driver, or is 'tight enough' fine?",
    answer:
      "Manufacturer's torque values are an engineering spec, not a guideline. BS 7671 134.1.1 makes them part of compliant workmanship. The cheap answer is a preset Wera Click-Torque (around £45) set to 2.5 Nm — covers most CU and consumer-unit terminations. Better firms have a small set of preset drivers (1.2, 2.0, 2.5, 3.5 Nm) covering different equipment. NICEIC / NAPIT assessors check for evidence at audit. Eyeballing torque is how installations end up over-tightened (cracked terminals) or under-tightened (high-resistance hot joints).",
  },
  {
    question: "Are bootlace ferrules required on stranded conductors, or just preferred?",
    answer:
      "Not required by BS 7671, but strongly preferred for stranded conductors entering screw terminals — and explicitly required by some manufacturers (look at the install literature for high-end industrial gear). A ferrule converts a fan of loose strands into a single cylindrical end that the screw clamps cleanly. Without one, the screw splays the strands, catches only some, and you end up with a high-resistance fault that fails on EICR. Many UK contractors now use ferrules as standard practice on all stranded terminations regardless of the manufacturer's stance.",
  },
  {
    question: "How do I know when to use ratchet vs hex-die vs hydraulic crimpers?",
    answer:
      "By conductor size and lug type. Ratchet H-die — bootlace ferrules and small insulated lugs from 0.5 to about 6 mm² (some go to 10 mm²). Hex-die ratchet — compression lugs 10 to 25 mm² typically. Hydraulic — anything larger (25 mm² to 240 mm² for the big stuff). The transition points vary by tool model — read the tool's spec. As an apprentice you'll mostly use the ratchet for ferrules and small lugs; hex and hydraulic come later as you take on bigger jobs.",
  },
  {
    question: "What's the difference between insulated and uninsulated ferrules?",
    answer:
      "Insulated ferrules have a coloured plastic collar at the open end. The colour follows DIN 46228-4 (blue 2.5 mm², yellow 6 mm² etc.) and the plastic collar provides a degree of strain relief and insulation at the cable entry. Uninsulated (bare metal) ferrules are functionally identical for the conductor connection but lack the plastic collar — typically used in space-constrained terminals or where the colour code isn't needed. UK practice almost universally uses insulated ferrules; the colour code IS the visual QA mechanism.",
  },
  {
    question: "How do I know what torque to set the driver to for a given accessory?",
    answer:
      "Three sources, in order of authority. (1) The manufacturer's installation literature (a leaflet in the box, on the manufacturer's website). (2) The product label or stamp on the device itself — many RCBOs have the torque value moulded into the case near the terminal. (3) Generic guidance — 1.2 Nm for accessory screws, 2.0 Nm for typical RCBOs, 3.5 Nm for main switch and bus-bar terminals (Hager / Schneider / Wylex broadly cluster around these values). When in doubt, ask the supervisor or check the product literature — eyeballing is not the answer.",
  },
  {
    question: "What's an 'H-die' vs 'hex-die' crimper — they sound similar?",
    answer:
      "Different geometry for different connectors. H-die (sometimes called 'square' or 'trapezoidal') crimpers have a die that forms an H-shape cross-section — used for bootlace ferrules and most insulated lugs. Hex-die crimpers form a hexagonal cross-section — used for compression lugs (the big bare-metal ring lugs you see on switchgear and battery cables). Different connector type, different die required. Most ratchet crimper bodies have interchangeable dies so you can run ferrules in the morning and lugs in the afternoon with one tool.",
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 1.4 · Supplementary"
            title="Cable-prep tools deep dive"
            description="The precision tools that turn a cable end into a BS 7671 526.1-compliant termination. Strippers, cutters, ratchet crimpers, ferrule kits and preset torque drivers — what each is for, the DIN 46228-4 colour code, and the typical 1.2–3.5 Nm torque settings on UK distribution boards."
            tone="emerald"
          />

          <TLDR
            points={[
              "Cable prep is a four-tool sequence — strip, ferrule (or form), terminate, torque. Each step has a dedicated tool engineered for the job; mixing them up fails BS 7671 526.1 even when the end-result looks fine.",
              "DIN 46228-4 colour-codes bootlace ferrules by CSA — black 1.5, blue 2.5, yellow 6, red 10. Memorise the 2.5 / 4 / 6 / 10 line for domestic and small commercial.",
              "UK distribution-board terminals run 1.2–3.5 Nm torque. Calibrated preset torque drivers (Wera Click-Torque, Wiha) deliver the value every time; eyeballed torque fails 134.1.1 over thermal cycling.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding beyond the formal AC scope.",
              "Identify the four-step cable-prep sequence — strip, ferrule (where appropriate), terminate, torque — and the tool used at each step.",
              "Identify the DIN 46228-4 bootlace ferrule colour code by conductor cross-section, focusing on the 0.75 / 1.5 / 2.5 / 4 / 6 / 10 mm² sizes used in domestic and small commercial work.",
              "Distinguish ratchet H-die crimpers from hex-die crimpers and hydraulic crimpers, and identify the conductor size range each is suited to.",
              "Apply BS 7671 Reg 526.1 (durable mechanical strength) and Reg 134.1.1 (good workmanship) to a real termination decision.",
              "State typical UK distribution-board terminal torque values (1.2 Nm accessory, 2.0 Nm RCBO, 3.5 Nm main switch / bus-bar) and use a preset torque driver correctly.",
              "Recognise when bootlace ferrules are strongly preferred (stranded conductors entering screw terminals) and the consequences of omitting them.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub matters</ContentEyebrow>

          <ConceptBlock
            title="Termination is where 80% of installation faults live"
            plainEnglish="Most BS 7671 EICR failures aren't faulty cable runs or undersized circuits — they're bad terminations. Loose screws, fanned strands, over-tightened bus-bars, no ferrules where they should be. The cable-prep toolkit exists precisely because manual technique alone can't deliver consistent, repeatable terminations across hundreds of connections on a typical install."
            onSite="The senior electrician will spend the first month watching how you prep cable ends. Tidy auto-stripped conductors, the right ferrule colour, a clean ratchet crimp, and a calibrated torque driver clicking off at the published value — that combination is the visual signature of an electrician who's been taught properly. The look of the cable end is more reliable evidence of competence than any test result."
          >
            <p>
              The four-step cable-prep sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 &mdash; Strip</strong>. Remove the insulation from the conductor without nicking the copper. Auto-stripper or preset-jaw stripper for cores; rotary cable stripper or knife (sheath only) for outer sheath.
              </li>
              <li>
                <strong>Step 2 &mdash; Ferrule (where appropriate)</strong>. Slip a colour-coded bootlace ferrule onto the stripped end and ratchet-crimp it. Strongly preferred for stranded conductors entering screw terminals; not used for solid conductors.
              </li>
              <li>
                <strong>Step 3 &mdash; Terminate</strong>. Insert the prepared end into the terminal. Conductor or ferrule fully home; no insulation trapped under the screw.
              </li>
              <li>
                <strong>Step 4 &mdash; Torque</strong>. Tighten with a preset torque driver set to the manufacturer&apos;s specified value. Click-stop signal means &quot;done&quot;.
              </li>
            </ul>
            <p>
              Each step has a dedicated tool. Use the right one at each step and the termination is consistent, repeatable and BS 7671 526.1 / 134.1.1 compliant. Skip the tool or substitute the wrong one and the termination becomes operator-dependent &mdash; and that&apos;s where the failures live.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The legal hooks</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 526.1"
            clause={
              <>
                &quot;Every connection between conductors or between a conductor and other equipment
                shall provide durable electrical continuity and adequate mechanical strength and
                protection.&quot;
              </>
            }
            meaning={
              <>
                Three requirements in one sentence. Durable continuity &mdash; the connection has
                to keep working over time, not just on day one. Adequate mechanical strength
                &mdash; the connection has to stay clamped under thermal cycling, vibration and
                cable pull. Protection &mdash; the connection has to be physically safe (no
                exposed conductor outside the terminal). The cable-prep toolkit delivers all three:
                clean strip preserves continuity, correct ferrule + ratchet crimp + torque deliver
                mechanical strength, terminal seating with no insulation trapped delivers
                protection.
              </>
            }
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Chapter 52, Reg 526.1 — verbatim from the bs7671_regulations dataset."
          />

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 134.1.1"
            clause={
              <>
                &quot;Good workmanship by competent persons and proper materials shall be used in
                the erection of the electrical installation. Erection methods shall be in
                accordance with this section and with manufacturers&apos; instructions.&quot;
              </>
            }
            meaning={
              <>
                134.1.1 is the umbrella workmanship regulation. Two parts &mdash; (a) good
                workmanship + proper materials, (b) compliance with manufacturers&apos;
                instructions. The torque values published by Hager / Schneider / Wylex / MK ARE
                manufacturers&apos; instructions and ignoring them breaches the second leg of
                134.1.1 directly. The cable-prep toolkit (preset torque driver, ratchet crimper,
                ferrule kit) is how 134.1.1 is delivered in practice.
              </>
            }
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Chapter 13, Reg 134.1.1 — paraphrased; the bs7671_regulations dataset confirms the regulation reference."
          />

          <SectionRule />

          <ContentEyebrow>Stripping tools — depth dive</ContentEyebrow>

          <ConceptBlock
            title="Three families of stripping tool, each for a specific cable type"
            onSite="Most apprentices end up with three strippers in their roll — an auto-stripper for varied core sizes, a preset-jaw stripper for repeat work, and a rotary cable stripper for outer sheaths on round multicore. Three tools cover 95% of cable prep on a typical job."
          >
            <p>
              The three families:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Auto-adjusting strippers</strong> (Knipex 12 62 180, CK 495002) &mdash;
                self-adjusting jaws sense conductor diameter. Single tool handles 0.5 to 6 mm&sup2;
                (sometimes 10 mm&sup2;). Fast for varied work; the apprentice&apos;s default. Good
                models also crop the conductor to length in one squeeze.
              </li>
              <li>
                <strong>Preset-jaw strippers</strong> (Knipex 11 06 160, Klein 11061) &mdash; fixed
                stations sized 0.5 / 0.75 / 1.0 / 1.5 / 2.5 / 4.0 mm&sup2;. Slightly cleaner cut on
                each size than auto-adjust because the jaws are exactly sized. Common for
                repeat-volume work like a panel build with hundreds of identical 1.5 mm&sup2;
                terminations.
              </li>
              <li>
                <strong>Rotary cable strippers</strong> (Jokari Quadro, Knipex 16 95 02 SBE) &mdash;
                cylindrical strippers for round multicore cables. Set the diameter, push onto the
                cable, twist a few turns, and the outer sheath comes off cleanly. Standard for SWA
                outer sheath, larger flex outer sheath, and any round-section cable. Saves
                Stanley-knife scoring of the inner cores.
              </li>
            </ul>
            <p>
              Beyond these three: jacket-cutting knives (Stanley with fresh blade) for the outer sheath of T+E only &mdash; never for the inner cores. Sub 1.1 covered the basic categories; this is the deep dive.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Crimpers — ratchet, hex, hydraulic</ContentEyebrow>

          <ConceptBlock
            title="Three families, each sized to its conductor range"
            plainEnglish="Crimping force scales with conductor size. A 0.75 mm² ferrule needs about 200 N of compression; a 50 mm² compression lug needs over 5 kN. No single tool spans both — you need ratchet H-die for small, hex-die ratchet for medium, hydraulic for large."
            onSite="The apprentice's everyday crimper is a ratchet H-die (Knipex 97 53 04 self-adjusting, or interchangeable-die models from Klauke / CK). It handles bootlace ferrules from 0.25 to 6 mm² and small insulated lugs. Above that, the firm's shared hex-die ratchet or hydraulic crimper comes out — usually for one specific job (a control panel, a sub-main termination)."
          >
            <p>
              The three crimper families in detail:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ratchet H-die crimper</strong> &mdash; spring-loaded ratchet locks the jaws
                until full compression, then releases. Forms a square or trapezoidal cross-section
                on the ferrule barrel. Range typically 0.25&ndash;6 mm&sup2; (some go to 10 mm&sup2;).
                Tools: Knipex 97 53 04 (self-adjust, all four faces in one squeeze), Klauke K30
                (interchangeable die plates), CK Ratchet Crimper.
              </li>
              <li>
                <strong>Hex-die ratchet crimper</strong> &mdash; same ratchet body, hexagonal die
                profile. Used for bare compression lugs (the metal ring-terminals on switchgear,
                bonding tails, battery cables). Range typically 10&ndash;25 mm&sup2;, sometimes up
                to 35 mm&sup2;. Tools: Knipex 97 51 19, Cembre HN1, Klauke ES 25.
              </li>
              <li>
                <strong>Hydraulic crimper</strong> &mdash; hand-pumped or battery-electric;
                delivers thousands of newtons of compression force. Range typically 25&ndash;240
                mm&sup2;. Battery-electric models (Klauke EK 50, Cembre B 1300, Milwaukee M18
                Force Logic) are now standard for industrial work; hand-pump units are still
                common for one-off pulls or hire-centre kit. The die is removable so the same body
                handles different lug sizes.
              </li>
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

          <ContentEyebrow>Bootlace ferrules — DIN 46228-4 colour code</ContentEyebrow>

          <ConceptBlock
            title="One colour per CSA — the European panel-build standard"
            plainEnglish="DIN 46228-4 is the German standard that the entire European ferrule industry follows. Every ferrule in every kit (Knipex, Klauke, Weidmüller, Klein, CK) follows the same colour code by conductor cross-section. Once you've memorised the colours you can grab the right ferrule from a sorted kit at a glance."
          >
            <p>
              The standard colour code for insulated bootlace ferrules:
            </p>
            <div className="space-y-3">
              <div className="space-y-2 sm:hidden">
                {[
                  { csa: '0.25 mm²', colour: 'Light blue' },
                  { csa: '0.34 mm²', colour: 'Turquoise' },
                  { csa: '0.5 mm²', colour: 'White' },
                  { csa: '0.75 mm²', colour: 'Grey' },
                  { csa: '1.0 mm²', colour: 'Red' },
                  { csa: '1.5 mm²', colour: 'Black' },
                  { csa: '2.5 mm²', colour: 'Blue' },
                  { csa: '4.0 mm²', colour: 'Grey (or orange)' },
                  { csa: '6.0 mm²', colour: 'Yellow' },
                  { csa: '10.0 mm²', colour: 'Red' },
                  { csa: '16.0 mm²', colour: 'Blue' },
                  { csa: '25.0 mm²', colour: 'Yellow' },
                  { csa: '35.0 mm²', colour: 'Red' },
                  { csa: '50.0 mm²', colour: 'Blue' },
                ].map((row) => (
                  <div
                    key={row.csa}
                    className="rounded-xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-4 py-3 flex items-center justify-between"
                  >
                    <span className="text-[13.5px] font-semibold text-white">{row.csa}</span>
                    <span className="text-[13.5px] text-white/85">{row.colour}</span>
                  </div>
                ))}
              </div>

              <table className="hidden sm:table w-full text-left">
                <thead>
                  <tr className="text-[12px] uppercase tracking-[0.12em] text-white/55">
                    <th className="py-2 pr-4">Conductor CSA</th>
                    <th className="py-2 pr-4">Ferrule colour</th>
                  </tr>
                </thead>
                <tbody className="text-[13.5px] text-white/90">
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">0.25 mm&sup2;</td><td className="py-1.5">Light blue</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">0.34 mm&sup2;</td><td className="py-1.5">Turquoise</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">0.5 mm&sup2;</td><td className="py-1.5">White</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">0.75 mm&sup2;</td><td className="py-1.5">Grey</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">1.0 mm&sup2;</td><td className="py-1.5">Red</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">1.5 mm&sup2;</td><td className="py-1.5">Black</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">2.5 mm&sup2;</td><td className="py-1.5">Blue</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">4.0 mm&sup2;</td><td className="py-1.5">Grey (or orange)</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">6.0 mm&sup2;</td><td className="py-1.5">Yellow</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">10.0 mm&sup2;</td><td className="py-1.5">Red</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">16.0 mm&sup2;</td><td className="py-1.5">Blue</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">25.0 mm&sup2;</td><td className="py-1.5">Yellow</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">35.0 mm&sup2;</td><td className="py-1.5">Red</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">50.0 mm&sup2;</td><td className="py-1.5">Blue</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Notice the same colour repeats at different sizes (red 1.0 / 10 / 35; blue 2.5 / 16 / 50; yellow 6 / 25). The colour-by-size pattern is consistent because of the way the standard cycles. The ferrule barrel diameter still differs &mdash; you can&apos;t fit a 10 mm&sup2; red ferrule onto a 1.0 mm&sup2; conductor, the colour just identifies the family.
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

          <ContentEyebrow>Torque tools — UK distribution-board values</ContentEyebrow>

          <ConceptBlock
            title="Preset, click-torque, calibrated — the three legs"
            onSite="UK distribution-board work clusters around three torque values: 1.2 Nm for small accessory screws, 2.0–2.5 Nm for RCBO and MCB terminals, 3.5 Nm for main switch and bus-bar terminals. The pragmatic apprentice setup is two preset Wera Click-Torque drivers — one at 1.2 Nm, one at 2.5 Nm — plus a switchable-preset driver for the larger values. All calibrated annually."
          >
            <p>
              Typical UK distribution-board terminal torque values (always verify against the manufacturer&apos;s install literature for the specific product):
            </p>
            <div className="space-y-3">
              <div className="space-y-2 sm:hidden">
                {[
                  { item: 'Accessory screws (sockets, switches, plates)', torque: '1.0 – 1.2 Nm' },
                  { item: 'RCBO conductor terminals (typical UK domestic)', torque: '2.0 – 2.5 Nm' },
                  { item: 'MCB conductor terminals (typical UK domestic)', torque: '2.0 – 2.5 Nm' },
                  { item: 'Main switch / isolator conductor terminals', torque: '3.0 – 3.5 Nm' },
                  { item: 'Bus-bar set screws (CU phase / neutral bar)', torque: '3.0 – 3.5 Nm' },
                  { item: 'SWA gland nut (compression)', torque: 'Hand-tight + 1/2 turn typical' },
                ].map((row) => (
                  <div
                    key={row.item}
                    className="rounded-xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-4 py-3"
                  >
                    <div className="text-[13.5px] font-semibold text-white">{row.item}</div>
                    <div className="text-[13px] text-white/80 mt-0.5">{row.torque}</div>
                  </div>
                ))}
              </div>

              <table className="hidden sm:table w-full text-left">
                <thead>
                  <tr className="text-[12px] uppercase tracking-[0.12em] text-white/55">
                    <th className="py-2 pr-4">Termination type</th>
                    <th className="py-2 pr-4">Typical torque (UK)</th>
                  </tr>
                </thead>
                <tbody className="text-[13.5px] text-white/90">
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">Accessory screws (sockets, switches, plates)</td><td className="py-1.5">1.0&ndash;1.2 Nm</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">RCBO conductor terminals (typical UK domestic)</td><td className="py-1.5">2.0&ndash;2.5 Nm</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">MCB conductor terminals (typical UK domestic)</td><td className="py-1.5">2.0&ndash;2.5 Nm</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">Main switch / isolator conductor terminals</td><td className="py-1.5">3.0&ndash;3.5 Nm</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">Bus-bar set screws (CU phase / neutral bar)</td><td className="py-1.5">3.0&ndash;3.5 Nm</td></tr>
                  <tr className="border-t border-white/[0.06]"><td className="py-1.5 pr-4">SWA gland nut (compression)</td><td className="py-1.5">Hand-tight + 1/2 turn typical</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Always verify against the manufacturer&apos;s installation literature. The values above are typical for Hager, Schneider, Wylex, MK and Crabtree UK domestic kit. Industrial gear (Eaton, ABB, Siemens) sometimes runs higher, particularly on bus-bar terminations.
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

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the ferrule on a stranded conductor entering a screw terminal"
            whatHappens={
              <>
                Apprentice strips the end of a 2.5 mm&sup2; stranded core, inserts straight into a
                Hager RCBO terminal, tightens to torque. Looks fine. But under the screw the
                strands have splayed sideways — the screw caught about 70% of the strands and
                pinched the rest outside the clamp. On test the loop impedance reads OK because
                the gripped strands are enough for steady-state current. Six months later thermal
                cycling has loosened the clamp slightly, the loose strands have oxidised, and the
                terminal is running hot. Eventually fails on the next EICR — &quot;loose
                connection at outgoing terminal&quot;.
              </>
            }
            doInstead={
              <>
                For ALL stranded conductors entering screw terminals, slip a colour-coded bootlace
                ferrule on (blue for 2.5 mm&sup2;) and ratchet-crimp it. The ferrule converts the
                fan of strands into a single cylindrical end that the screw clamps cleanly across
                its full circumference. Termination is consistent, repeatable, and stays clamped
                under thermal cycling. The 30 seconds the ferrule adds saves a re-attendance call
                in 18 months.
              </>
            }
          />

          <CommonMistake
            title="Eyeballing torque instead of using a calibrated preset driver"
            whatHappens={
              <>
                Apprentice tightens the conductor terminal screws on a Hager bus-bar with a
                standard VDE Pozidriv driver, &quot;tight enough to feel firm&quot;. Some
                terminations end up at ~5 Nm (over-torqued, screws stripped), some at ~1.5 Nm
                (under-torqued, conductors loose). Manufacturer&apos;s spec is 3.5 Nm. The CU
                tests OK on the day but the over-torqued screws have damaged the bus-bar
                pockets and the under-torqued terminations run hot. Insurance claim a year
                later because of a thermal incident points back to the install date.
                BS 7671 134.1.1 (manufacturer&apos;s instructions) is now in the witness
                statement.
              </>
            }
            doInstead={
              <>
                Use a calibrated preset torque driver (Wera Click-Torque or similar) set to the
                manufacturer&apos;s value. Listen for the click and STOP. For UK consumer-unit
                work, two preset drivers (one at 1.2 Nm, one at 2.5 Nm) plus a switchable preset
                for higher values cover almost every termination. Annual UKAS-traceable
                calibration keeps them honest. The cost of the kit is paid back the first time it
                stops a re-attendance call.
              </>
            }
          />

          <Scenario
            title="Prep&apos;ing 2.5 mm&sup2; stranded for a Hager DB"
            situation={
              <>
                You&apos;re terminating eight 2.5 mm&sup2; stranded cores from a kitchen ring final
                circuit into the outgoing side of eight Hager RCBOs in a domestic CU change. The
                supervisor has handed you a ferrule kit (DIN 46228-4) and a preset Wera
                Click-Torque set to 2.5 Nm. The conductor strips are all the same length and the
                cable entry has been routed tidily. What&apos;s the per-termination sequence and
                how do you know it&apos;s right?
              </>
            }
            whatToDo={
              <>
                Per-termination sequence: (1) Crop end square with side cutters or T+E shears.
                (2) Auto-strip about 10 mm of insulation off the core (auto-stripper
                automatically sized). (3) Slip a blue 2.5 mm&sup2; bootlace ferrule on; insulation
                shoulder of the ferrule butts up against the core insulation. (4) Ratchet-crimp
                the ferrule (Knipex 97 53 04 or similar — squeeze until ratchet releases at
                bottom of stroke). (5) Insert the ferrule into the RCBO terminal until it&apos;s
                fully home. (6) Tighten with the preset Wera at 2.5 Nm — apply firm steady force
                until you feel/hear the click, STOP. Repeat for each of the eight cores. After
                all eight, tug-test each conductor — none should pull out under hand pressure.
              </>
            }
            whyItMatters={
              <>
                Eight terminations, all identical, all consistent, all to the manufacturer&apos;s
                spec. That&apos;s what BS 7671 134.1.1 (good workmanship + manufacturers&apos;
                instructions) and 526.1 (durable continuity + mechanical strength) ask for in
                practice. The cable-prep toolkit makes that level of consistency achievable for
                any operative, regardless of hand strength or how tired they are at the end of
                the shift. Without the toolkit, the same eight terminations would be
                operator-dependent and inconsistent &mdash; and that&apos;s where future EICR
                failures live.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Cable prep is a four-step sequence — strip, ferrule (where appropriate), terminate, torque. Each step has a dedicated tool engineered for the job.",
              "Stripping — auto-strippers and preset-jaw strippers for cores; rotary cable strippers for outer sheath of round multicore (SWA, flex). Knives are for outer sheath of T+E only.",
              "Ratchet H-die crimpers for ferrules and small lugs (0.25–6 mm²); hex-die ratchet for medium lugs (10–25 mm²); hydraulic for large (25 mm² and up). Three families because crimping force scales with size.",
              "Bootlace ferrules follow DIN 46228-4 colour code — black 1.5, blue 2.5, yellow 6, red 10. The colour code IS the inspection mechanism on a panel build.",
              "Bootlace ferrules are strongly preferred (often essential) for stranded conductors entering screw terminals. Without one, the screw splays the strands and catches only some — a high-resistance fault waiting to happen.",
              "UK distribution-board terminal torque values cluster around 1.2 Nm (accessory), 2.0–2.5 Nm (RCBO/MCB), 3.0–3.5 Nm (main switch / bus-bar). Always verify against the manufacturer's literature.",
              "Preset Wera Click-Torque drivers (or equivalent Wiha, Norbar) deliver consistent, repeatable torque. The click is the STOP signal — pushing past defeats the tool.",
              "BS 7671 526.1 (durable mechanical strength) and 134.1.1 (good workmanship + manufacturers' instructions) are both delivered through the cable-prep toolkit. The right tools turn aspirational regs into achievable everyday practice.",
            ]}
          />

          <Quiz title="Cable-prep tools knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 Tool safety checks
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Test instruments overview
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
