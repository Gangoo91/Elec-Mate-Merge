/**
 * Module 4 · Section 5 · Subsection 3 — Restoring building fabric and finishes
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.3 (partial)
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.5 — methods for restoring the
 * condition of building fabric.
 *
 * Frame: when the rectification has involved disturbance to plaster, brick,
 * tile, joist, ceiling, flooring — what's the L3 apprentice's responsibility
 * for restoration vs the customer's, and what techniques apply.
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
  'Restoring building fabric (5.3) | Level 3 Module 4.5.3 | Elec-Mate';
const DESCRIPTION =
  'When fault rectification has disturbed plaster / brick / tile / joist / ceiling / flooring — the L3 apprentice responsibility, the techniques, the customer brief and the trade boundaries with plasterer / decorator / tiler.';

const checks = [
  {
    id: 'mod4-s5-sub3-scope',
    question:
      "What's the typical electrician's scope for building-fabric restoration after fault rectification?",
    options: [
      "No. RAMS must be task-specific and current. A generic 'electrical works' document doesn't capture this fault, this DB, this circuit, this customer's environment, or the unknowns of an investigation. The L3 expectation is a fault-specific addendum to the RAMS that captures (a) the reported symptom, (b) the suspected cause and your diagnostic approach, (c) the live-vs-dead working decision under EAWR Reg 14, (d) the specific instruments you'll use and how they meet GS38, (e) emergency contacts. Without that, the firm's RAMS doesn't meet HSWA Section 2 / 3 duties for THIS task.",
      "Three categories. (1) MAKE GOOD — close holes left by chasing / drilling, refit removed accessories, ensure no exposed cable / live parts. Always within the electrician's scope. (2) BASIC PATCH — bond and skim small areas of plaster (1–2 m² on internal walls), patch small cable entry holes. Within scope at apprentice level under supervision; some firms include in standard quote. (3) FULL RESTORATION — re-plaster larger areas, re-tile, re-paint, re-floor. Outside the electrician's scope; coordinated with plasterer / decorator / tiler. The customer often expects make-good as standard; basic patching as quoted; full restoration as separate.",
      "Test instruments (MFTs and voltage indicators), insulated tools, electrical PPE (gloves, mats, face shields where applicable), lock-off devices, warning labels — all of it. Reg 4(4) is why your MFT must be in calibration, why your voltage indicator must comply with HSE GS38, why your insulated tools must be in date and undamaged, and why your lock-off kit has to actually work. Use unsuitable equipment and you breach Reg 4(4) regardless of whether the install itself is sound.",
      "Whether the work activity can be eliminated, substituted or engineered to avoid producing the silica dust at source — the COSHH hierarchy of control. PPE (FFP3 mask) is the LAST resort, not the first. On-tool extraction connected to an M-class vacuum, water suppression and route-planning that minimises chasing are all higher in the hierarchy than mask-only working. The HSE workplace exposure limit (WEL) for respirable crystalline silica is currently 0.1 mg/m3 8-hour TWA and is under regulatory review.",
    ],
    correctIndex: 1,
    explanation:
      "Scope clarity prevents disputes. The electrician's responsibility is normally make-good (functional / safety) plus basic patch (small areas). Full restoration is a separate trade. The customer's quote should be explicit about which is included.",
  },
  {
    id: 'mod4-s5-sub3-fire',
    question:
      "What's the special restoration requirement when a cable passes through a fire-rated wall or floor?",
    options: [
      "(1) Visual — case undamaged, leads not nicked, probes have intact finger barriers, no melted plastic, screen clean. (2) Calibration — sticker date in date for every instrument; calibration register up to date. (3) Function — two-pole tester proves on Martindale GVD2; multimeter shows expected voltage on a known-live socket; MFT self-test passes; clamp meter reads expected current on a known load; socket tester shows correct lights on a known-good socket; VDE drivers show no crack in insulation. 5–8 minutes per shift; the routine catches every instrument fault that has caused an incident.",
      "WEEE removed during install or repair must be segregated from general waste and routed to an Approved Authorised Treatment Facility (AATF) for recovery and recycling. The waste producer (you or your employer) holds the Duty of Care under the Environmental Protection Act 1990 to ensure the waste is properly described, transferred to an authorised waste carrier, and accompanied by a waste transfer note that is retained for at least two years. Many electrical wholesalers operate as WEEE collection points under the Distributor Take-Back Scheme.",
      "STOP. Asbestos is a notifiable hazardous material under the Control of Asbestos Regulations 2012 — even a small amount in an old DB. (1) STOP work immediately, do not disturb further. (2) ISOLATE the area (the customer and other trades out of the room). (3) DOCUMENT what you found (mobile photo from a safe distance — do NOT touch). (4) ESCALATE to the supervisor — the supervisor coordinates a licensed asbestos contractor (HSE-licensed for asbestos removal work). (5) NEVER attempt removal yourself; an L3 apprentice is not licensed for asbestos. The cost of getting this wrong is health-life — asbestos-related disease has a 20–40 year latency, and the legal liability is criminal.",
      "BS 7671 527.2 + Building Regs Approved Document B require fire-stopping at the cable penetration. The hole around the cable must be sealed with intumescent material that maintains the fire rating of the wall / floor (typically 60 minutes for compartment walls, 30 minutes for protected escape routes). Standard products: Promat PROMASEAL, Hilti CP series, FireFly fire collars. The electrician fits the fire-stop; the customer's responsible person under RR(FS)O 2005 needs to know it's been done. Skipping fire-stopping creates a fire-spread path that defeats the building's compartmentation strategy. Code 1 (Danger Present) finding on EICR if not done.",
    ],
    correctIndex: 3,
    explanation:
      "Fire-stopping is a regulated requirement at compartment-wall penetrations. BS 7671 527.2 + Approved Document B + RR(FS)O 2005 all combine to make this non-negotiable. The L3 apprentice should know to fit fire-stop and document on the job sheet.",
  },
  {
    id: 'mod4-s5-sub3-handback',
    question:
      "How should you brief the customer on the restoration scope at the start of the work?",
    options: [
      "The location, the specific activity (gas torch, grinding, welding), the operative names, the permit validity window (start time, end time), the precautions in place (combustibles cleared, fire blanket / extinguisher to hand, fire watch arranged for after work), the cool-down / fire-watch requirement (typically 30-60 minutes after work ceases), and signatures from issuer, operative and (on completion) the fire-watch confirming no smouldering.",
      "Three points. (1) WHAT'S INCLUDED — make-good (no holes, no exposed cable, accessories refitted) is part of the work. Basic patching of small areas (if your firm includes this) is part of the quote. Full restoration (re-plaster / re-tile / re-paint) is separate. (2) WHAT'S NOT INCLUDED — be explicit about what the customer will need a separate trade for. (3) WHO TO USE — recommend a plasterer / decorator / tiler if the customer needs one (referrals are good business). The brief upfront prevents the post-work dispute about 'why isn't the wall finished?'.",
      "A wiring-side fault lives in the fixed installation — cables, accessories, terminations, JBs, switchgear. You can isolate the load and the fault remains. An equipment-side fault lives in the connected appliance / load — element, motor, driver, control board. You can isolate at the load and the fault disappears from the fixed installation. The diagnostic move that separates them is to disconnect the load at the SFCU / plug / terminal block and re-test the fixed wiring; if the fixed wiring is healthy, the fault is in the equipment, and the customer's recourse is the manufacturer's warranty / a service engineer, not your fix.",
      "Plan budget: scheme membership and update events typically £400-800/year if scheme-affiliated (NICEIC, NAPIT) include some CPD; one BS 7671 refresher per amendment year £150-300; one specialist training £400-800; IET Academy / scheme platform online learning typically included with subscription; manufacturer training often free; trade events (ECA Live etc.) £100-300. Total CPD spend typically £1,000-2,500/year for an active QS.",
    ],
    correctIndex: 1,
    explanation:
      "Customer briefing on restoration scope is part of the upfront work. Most disputes about 'unfinished work' come from unclear scope at the start. The clear brief at quote stage + the visual confirmation at the end manages expectations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's a 'make-good' standard for an electrician after rectifying a fault that involved chasing a wall?",
    options: [
      "The MCS Code of Practice is the over-arching code that all MCS-certified installers must comply with. It covers consumer protection (sales practices, contracts, performance estimates honestly disclosed), installation quality, commissioning records, customer handover documentation, complaints handling and after-sales support. The installer's MCS certification can be withdrawn for breaches of the Code. The Code references the technology-specific MCS Installation Standards (MIS 3001 solar thermal, 3002 PV, 3003 wind, 3004 biomass boiler, 3005 heat pump, 3006 biomass stove, 3007 EV, 3008 hydro, 3012 battery storage) for the technical detail.",
      "Three deliverables. (1) NO HOLES — any chase or drilled hole is filled with bonding compound (Knauf bonding plaster, Thistle Bonding) to flush with the surrounding wall. (2) NO EXPOSED CABLE — any cable that was exposed during the work is properly clipped, secured, sleeved if appropriate. (3) NO LIVE PARTS exposed — accessory plates fitted, blanking plates on unused boxes, fire-stops on penetrations. Make-good is the electrician's responsibility; full re-skim and re-paint are the plasterer / decorator's. The boundary is 'safe and finished to fill stage' — beyond that needs other trades.",
      "Where equipment is connected and is likely to influence the test or be damaged by the test voltage, a 250 V DC IR test shall be used following connection of the equipment, as clarified in the A4:2026 redraft. Practical implication for fault diagnosis: when you re-IR-test a circuit AFTER fixing a fault and reconnecting electronics (LED drivers, dimmers, electronic timers, smart sockets), use the 250 V range on the MFT to verify the post-fix IR without damaging the kit. The 500 V test still applies before the equipment is connected — that's how you confirm the wiring itself is healthy. The two-stage test (500 V isolated + 250 V with kit re-connected) is the A4:2026-aligned procedure.",
      "The install can't commission until the DNO has approved the G99 application. Approval timeline 2-12 weeks depending on local network conditions. Customer needs to know this up front — booking holiday around an install date that depends on G99 approval is a recipe for disappointment. The MCS-certified installer normally manages the application and provides timeline expectations. As the apprentice you should never quote a commission date for a G99 install without confirmation from the certified installer.",
    ],
    correctAnswer: 1,
    explanation:
      "Make-good is the electrician's professional standard. The work is done when the wall / ceiling / floor is safe AND filled to a state where the next trade (plasterer, decorator) can finish. Leaving exposed cable or unfilled chases isn't make-good; it's incomplete work.",
  },
  {
    id: 2,
    question: "When chasing has been required to access a fault, what's the trade convention for cable depth and protection?",
    options: [
      "Day-rate: customer pays an agreed daily (or hourly) rate for time spent plus materials at agreed markup. Risk on time-overrun sits with the customer. Fixed-price: you quote a single all-in price for the defined scope. Risk on time-overrun sits with you. Customers typically prefer fixed-price (predictable budget); contractors typically prefer day-rate (no overrun risk). Practical compromise: fixed-price for well-defined scopes, day-rate for variable or fault-finding work.",
      "Common adjustments include written schedules for the day and week, advance notice of any changes, clear and unambiguous instructions ('start at the kitchen, do the back-boxes first, the cable will be in the loft' — not 'sort the kitchen out'), avoidance of 'common sense' assumptions, predictable routine where the role allows, designated quiet space for breaks where sensory overload is a factor, and one-to-one briefings rather than large group sessions where the apprentice prefers. Adjustments are agreed with the individual — autism is a spectrum and people vary enormously.",
      "BS 7671 522.6 + Approved Document B / Part P require: (1) Cables in walls within 50 mm of the surface must be in a 'safe zone' (above socket level, vertical from socket / switch position, within 150 mm of ceiling / wall edge) OR mechanically protected (steel conduit, capping / channel, RCD-protected supply). (2) Cables BELOW 50 mm depth — no zone restriction. (3) Cables in plastered chases — capping (PVC channel) over the cable before plastering OR steel conduit. The chase depth and the cable protection are inspected during EICR; non-compliance is Code 2 (Potentially Dangerous) typically.",
      "The type-test certificate is the manufacturer's evidence — issued by an accredited test lab — that the inverter model has been tested to the EREC G98 / G99 / EN 50549 protection requirements. It records the LoM detection method (ROCOF, vector shift, hybrid), the trip thresholds for over-voltage / under-voltage / over-frequency / under-frequency, the disconnection time, and the recovery delay. The DNO accepts the type-test certificate at face value — they do not retest each inverter on each install. Without a current type-test certificate, the DNO will refuse to accept G98 / G99 notification and the install cannot legally export.",
    ],
    correctAnswer: 2,
    explanation:
      "Cable burial requirements are detailed in BS 7671 522.6 and Approved Document B. The L3 apprentice ensures cables run in safe zones with appropriate protection; the customer doesn't need the technical detail but should be reassured 'all cables are protected per current standards'.",
  },
  {
    id: 3,
    question: "What's the L3 apprentice's role when a fault rectification damages a customer's tiles?",
    options: [
      "In approximate frequency order: (1) Socket terminals — back-of-socket screw terminals on the loop-in conductors; loosen over time; expose under load. (2) The ring break — at any point a previous installer cut the ring and rejoined into a JB, that joint is the weak point; particularly common when a kitchen extension was added and the ring was extended. (3) Spurs — single-socket spurs from the ring; the join into the ring is in a JB or behind the spur socket and is often wired with insufficient cable length. (4) The ring continuity itself — undersized or damaged cable through walls, particularly where chased cables have been re-plastered over and the chase has been dampened, accelerating insulation degradation.",
      "CAT III 600 V minimum (CAT IV 600 V preferred). The DB is a fixed-installation distribution location, which is CAT III by definition. The Fluke 376FC is CAT IV 600 V / CAT III 1000 V — adequate. The Megger DCM340 is CAT IV 300 V / CAT III 600 V — adequate for 230/400 V three-phase. Cheap clamp meters with only CAT II rating are not safe at this location — they can fail catastrophically on a transient. Always check the CAT rating before using a borrowed or new clamp meter at a DB.",
      "The MCS certificate, accompanied by the G98 (or G99) DNO notification copy. The customer applies to a Smart Export Guarantee licensee (typically a major electricity supplier) and uploads both. Without the MCS certificate the supplier will not register the customer for export payments. The smart export meter (the customer's existing smart meter, usually) provides the half-hourly export data that the tariff is paid against.",
      "Three steps. (1) MINIMISE the damage during the work — score around the tile carefully; remove only the affected tile(s); save them for re-fit if intact. (2) MAKE SAFE the tile area — no exposed substrate, no sharp edges, no water-ingress path. (3) BRIEF THE CUSTOMER — explain what tiles were affected; recommend a tiler for re-fit (referrals are good business); document the damage on the job sheet. The electrician doesn't normally re-tile (specialist trade with tile-cutting tools, adhesives, grout) but is responsible for minimising damage AND informing the customer.",
    ],
    correctAnswer: 3,
    explanation:
      "Tile damage during fault work is a real customer concern. Minimising damage + informing customer + recommending specialist trade is the L3 expectation. Pre-existing tile damage should be photographed and documented at the start of the work to prevent disputes.",
  },
  {
    id: 4,
    question: "When you've cut into plasterboard to access a junction box, what's the right way to make-good?",
    options: [
      "Three options depending on hole size. (1) SMALL HOLE (≤50 mm) — fit a junction box with a screw-on lid that becomes the access point; 'make-good' is the box itself. Future access without re-cutting. (2) MEDIUM HOLE (50–200 mm) — patch with plasterboard offcut, screwed to a backing batten, scrim tape, bond and skim flush. Customer's painter finishes. (3) LARGE HOLE (&gt;200 mm) — full plasterboard repair, scrim, bond, skim, customer's painter / decorator. Always leave the area swept clean and the dust contained where possible (sheet over furniture, vacuum on completion).",
      "Annual visual inspection (panels secure, free of physical damage, free of significant soiling); array frame and connections check (no corrosion, no loose mountings); cable inspection (UV degradation, rodent damage, MC4 connector integrity); inverter inspection (error log review, ventilation clear, no overheating signs); meter / monitoring check (datalog producing readings, expected output for season); signage check (durable warning signs still in place at consumer unit / meter / inverter / DC isolators). Periodic 5-year EICR for the electrical condition. Soiling cleaning may be needed in dusty / urban / coastal locations — specialist PV cleaners use deionised water.",
      "One per RCBO. Each RCBO is an independent RCD device. Test each at 1 x I delta n, record trip time on the Schedule of Test Results against the circuit number. Standard MFT workflow: select RCD test mode, set I delta n to 30 mA (or other rating per device), AC test, plug into the circuit\\\\'s socket or test from the RCBO load terminals, press TEST, record trip time, move to next circuit. 12 RCBOs = 12 tests + 12 readings on the schedule. Modern MFTs auto-fill the schedule when they\\\\'re paired with certification software.",
      "Battery hazards are different from AC hazards: (1) DC shock — once your hand is on a DC busbar, your muscles can't release because there's no zero-crossing — DC at 60 V upward is treated as a let-go hazard; (2) hydrogen gas — lead-acid cells gas during charge, hydrogen accumulates in poorly-ventilated rooms, explosive at 4% LEL — battery rooms have forced ventilation for this reason; (3) electrolyte — sulphuric acid contact with skin / eyes — face shield, acid-resistant gloves, eye-wash station; (4) thermal runaway — a damaged or shorted cell can catch fire, with toxic fumes; (5) short-circuit current — a 100 Ah lead-acid string can deliver 5–10 kA short-circuit, enough to weld a spanner.",
    ],
    correctAnswer: 0,
    explanation:
      "Plasterboard repair scales with hole size. The smallest holes can be turned into permanent access points (good practice for junction boxes that may need future inspection). Medium holes need patching; large holes need full repair. The L3 apprentice does the basic patching; the painter / decorator finishes.",
  },
  {
    id: 5,
    question: "What's the trade boundary between an electrician and a builder / plasterer / tiler?",
    options: [
      "The training-provider tutor first — they have responsibility for the quality of the apprentice's training experience and the authority to intervene with the employer. The apprenticeship agreement is a tripartite document (apprentice, employer, training provider) and the training provider can hold the employer to account on training delivery. If that doesn't resolve it, the apprentice can raise a formal grievance with the employer under the ACAS Code, escalate to ACAS conciliation, and ultimately to an employment tribunal.",
      "Five trades, five scopes. ELECTRICIAN — electrical work + make-good (filling, sealing, fire-stopping). PLASTERER — preparation, scrim, bond, skim of larger areas; finishing plaster surface. TILER — cutting, adhesive, fitting, grouting tiles; specialist tools. PAINTER / DECORATOR — preparation, primer, top-coat, decorative finishes. BUILDER — structural / load-bearing work; brick / block / concrete repair. Each trade has its competence boundary; the electrician's work is electrical + minimal building-fabric restoration. Specialist trades for finishing.",
      "Because the principal contractor (or main installer) carries practical and often legal responsibility for what happens on their site, including the conduct, safety and quality of sub-contractor work. CDM 2015 places duties on the PC for site coordination. The firm's policies typically require sub-contractors to be vetted, briefed, given clear scope, paid promptly and held to the same conduct standards as employees.",
      "Building Regulations Part L (Conservation of Fuel and Power) applies to new build, extensions and major renovations. Heat pump installs in those contexts must demonstrate compliance with the relevant Part L primary energy and carbon emissions targets, typically through SAP (Standard Assessment Procedure) for dwellings. The Future Homes Standard expected to bring fossil-fuel boilers off new-build from 2025 elevates heat pumps to the default route for new-build. MCS MIS 3005 sits alongside Part L — MCS proves the installer is competent, Part L sets the building energy targets, and the SAP calculation that informs Part L compliance uses MCS-style heat-loss and SCOP methodology.",
    ],
    correctAnswer: 1,
    explanation:
      "Trade boundaries exist for competence reasons (each trade has specific training and tools) and for professional indemnity (each trade carries cover for their own work). The L3 apprentice's role is to do the electrical work + make-good, and recommend / refer specialist trades for finishing.",
  },
  {
    id: 6,
    question: "What additional materials should an L3 apprentice carry for routine make-good work?",
    options: [
      "RESOLUTION — the smallest increment the instrument can detect and display, usually expressed as a count of the least-significant digit (e.g. 0.01 Omega resolution means the display can show changes of 0.01 Omega). ACCURACY — how close the displayed reading is to the true value, expressed as a percentage tolerance plus a digit count (e.g. plus or minus 5 percent plus or minus 3 digits at full mode, plus or minus 10 percent at no-trip mode). A high-resolution instrument with poor accuracy gives precise-looking but unreliable readings; a high-accuracy instrument with low resolution gives reliable but imprecise readings. You need both — modern MFTs typically achieve 0.01 Omega resolution and plus or minus 5-10 percent accuracy depending on mode.",
      "The Climate Change Act 2008 (as amended) commits the UK to net-zero greenhouse gas emissions by 2050. Buildings are roughly 17% of UK emissions; the Future Homes Standard and successive Part L revisions are the regulatory mechanism for hitting that target. Each Part L revision tightens the SAP / SBEM target rate — meaning new builds have to demonstrate progressively lower regulated CO₂ emissions to gain Building Regs approval.",
      "Six standard items. (1) Bonding plaster (Knauf bonding or Thistle Bonding, 5 kg bag) — for filling small chases. (2) Filler (Polycell, Tetrion) — for very small holes and screw holes. (3) Plasterboard offcuts — for patching plasterboard holes. (4) Scrim tape — for plasterboard joins. (5) Fire-stop sealant (FireFly, Hilti CP series) — for cable penetrations through fire-rated walls. (6) Touch-up paint (white emulsion small tin, customer-supplied paint where possible) — for minor wall finishing where the customer is unlikely to repaint. Cost £40–60 for the kit; lasts months.",
      "EPAO (End-Point Assessment Organisation) assessors deliver the End-Point Assessment for Apprenticeship Standards — the formal independent assessment at the end of the apprenticeship. EPAOs are independent bodies (separate from the training college) — examples include NET (National Electrotechnical Training), JTL, City & Guilds. EPAO assessors typically need TAQA L3 plus EPAO-specific training and current industry experience.",
    ],
    correctAnswer: 2,
    explanation:
      "The make-good kit is part of the L3 apprentice's van. Carrying the basics means you can complete the make-good on-site rather than leaving the customer with unfilled holes. Most experienced electricians carry this without thinking.",
  },
  {
    id: 7,
    question: "What's the right way to document building-fabric damage / restoration on the job sheet?",
    options: [
      "LLP = Limited Liability Partnership, a hybrid form created by the Limited Liability Partnerships Act 2000. Partners have limited liability (like Ltd directors) but the partnership is taxed as a partnership (members file Self Assessment on share of profits, no Corporation Tax). Common in professional services (law, accountancy) but rare in trades. For an electrical firm with multiple working partners LLP is sometimes considered as an alternative to Ltd.",
      "Five-bag setup, all clearly labelled: (1) WEEE — failed devices, scorched accessories, electronic components. (2) BATTERIES — taped terminals, separate from metalwork. (3) HAZARDOUS — fluorescent tubes (intact, in tube tube), CFLs, mercury switches. (4) COPPER SCRAP — cable offcuts (insulation on, never stripped by burning), bare copper offcuts. (5) GENERAL — packaging, plastic offcuts, non-recyclable. Each bag goes to its correct route at the next wholesaler trip OR firm scrap collection. The five-bag system makes compliance routine, not a special effort.",
      "Workplace mentor is the unpaid (or informally paid) day-job mentor allocated to a specific apprentice within the employing firm. Different from college assessor (paid, formally qualified, employed by college). The mentor signs portfolio entries as evidence of on-site competence, attends three-way reviews, calibrates progress with the college tutor. Mentor competence is evidenced by JIB Approved Electrician grade plus experience — no specific qualification required.",
      "Three sections. (1) PRE-WORK — photographs of any pre-existing damage to walls / floors / tiles / surfaces near the work area. Protects against 'you damaged that' disputes. (2) WORK SCOPE — what fabric was disturbed during the work (chasing, drilling, plasterboard cutting, tile removal). (3) RESTORATION — what make-good was done, what's outstanding for other trades, customer's acknowledgment. The photographs + scope + restoration record protects the firm from misunderstandings about what was done vs what was pre-existing.",
    ],
    correctAnswer: 3,
    explanation:
      "Documentation of pre-existing damage is the firm's defence. Five-second mobile photo of the work area at arrival, attached to the job sheet, settles 90% of damage disputes. The restoration record (what was done vs what's outstanding) closes the loop with the customer.",
  },
  {
    id: 8,
    question: "When should you use intumescent / fire-resistant materials in restoration?",
    options: [
      "Whenever a cable / conduit / fitting penetrates a fire-rated wall or floor. Standard locations: party walls between dwellings; compartment walls in HMOs / commercial buildings; floors between flats; ducts and risers; protected escape stairwells. Fire-stopping products: intumescent sealant (Hilti CP 606, Promat PROMASEAL), fire-rated batts (Rockwool Firepro), fire collars on conduit / pipe penetrations. The fire rating of the seal must match or exceed the wall / floor rating (typically 30 / 60 / 90 / 120 minutes). Documented on the job sheet; updated on building's fire-safety log.",
      "AFDDs, RCBOs, RCCBs and SPDs all have internal electronic components that can present low resistance during a 500 V IR test, potentially skewing results or causing unacceptable current flow during testing. GN3 explicitly identifies these device categories. The standard practice is to either disconnect the device for the IR test (re-test after re-fitting), use 250 V if the device can\\\\\\\\'t tolerate 500 V (check manufacturer manual), or apply IR test only to the wiring (not through the device) by isolating at the load terminals.",
      "Continuity proving (sometimes 'continuity check') is a quick low-current test (typically 200 mA on the MFT or multimeter on continuity range) to confirm a connection exists — yes/no, not a precise measurement. R1+R2 is a precise measurement of the loop resistance of a complete circuit (line + protective conductor). For fault diagnosis: continuity proving is used to quickly verify that an isolation has fully disconnected a circuit (continuity from supply to load reads OPEN); R1+R2 is used to precisely characterise a circuit's loop resistance for comparison against expected design values. Both have their place; the L3 apprentice uses them at different stages.",
      "Speak directly to the customer, identify yourself by name when you arrive and when you leave a room, describe what you're doing and where ('I'm just going to the consumer unit by the front door now'), don't move furniture or leave tools where they could be a trip hazard for the guide dog or the customer, ask before touching the guide dog (don't pet a working guide dog without asking), and offer to provide written documentation in large print, audio or accessible PDF as required. Equality Act 2010 makes this a service-provider duty.",
    ],
    correctAnswer: 0,
    explanation:
      "Fire-stopping is a regulated requirement at compartment penetrations. BS 7671 527.2 + Approved Document B + RR(FS)O 2005 all combine to make this non-negotiable. Intumescent products expand under heat to seal the penetration; without them, fire / smoke spreads through the cable hole.",
  },
];

const faqs = [
  {
    question: "Does my firm's quote include make-good or do I need to bill separately?",
    answer:
      "Depends on the firm's standard practice and the size of the make-good. Most firms include basic make-good (filling small holes, refitting accessories, fire-stopping) in the labour price. Larger restoration (full plasterboard patching, multi-tile re-fit, re-painting) is usually a separate line item or a separate trade's work. The L3 apprentice's quote should be explicit about scope; ambiguity leads to dispute.",
  },
  {
    question: "What's the customer's right to expect a 'finished' job?",
    answer:
      "The customer is entitled to a SAFE and FUNCTIONAL job. They are entitled to make-good (no holes, no exposed cable, accessories refitted, fire-stopping). They are NOT entitled to full decorative finish (re-plastering, re-painting, re-tiling) unless that was explicitly quoted. The Consumer Rights Act 2015 governs — services must be 'performed with reasonable care and skill'. Make-good is part of reasonable workmanship; decorative finish is not, unless agreed.",
  },
  {
    question: "What about cable runs in chased walls — what depth do I need to chase?",
    answer:
      "BS 7671 522.6.202 + Approved Document A: cable in chase must be deep enough that the chase doesn't compromise the wall's structural integrity. Standard practice: chase no deeper than 1/3 of wall thickness on internal walls; no deeper than 1/6 on load-bearing external walls. Horizontal chases limited in length (usually no more than 1/4 of the wall length). For modern installations, chases are usually 25–35 mm deep on a 100 mm internal wall — well within the limit. Capping / channel over the cable before plastering is the standard protection.",
  },
  {
    question: "What if the customer wants me to do the full restoration to save them calling a plasterer?",
    answer:
      "Consider whether you have the competence and time. If you've done basic plastering training and the area is small (1–2 m²), it can be a value-add to the customer. Charge appropriately for the additional work. If the area is larger or the finish needs to match an existing decorative scheme, refer to a plasterer / decorator — better to do less work to a high standard than more work badly. Document the scope agreement clearly.",
  },
  {
    question: "How do I handle damage to expensive finishes (marble worktops, hardwood floors, parquet)?",
    answer:
      "Avoid creating the damage where possible — protect the surfaces with dust sheets, hardboard, or floor protection film before starting work. If damage occurs despite precautions, document immediately (photo, job sheet entry), brief the customer, and discuss restoration options. The firm's professional indemnity insurance typically covers accidental damage to customer property; check the policy's excess and notification requirements. For very expensive finishes, the right approach is to sub-contract the floor / surface protection to a specialist (e.g. floor sanders for hardwood floor patches).",
  },
  {
    question: "What's 'fire-stopping' specifically and how do I do it?",
    answer:
      "Fire-stopping = sealing penetrations through fire-rated walls / floors with intumescent materials that maintain the fire rating. For a single cable through a plasterboard wall: clean the hole; apply intumescent sealant (Hilti CP 606, Promat PROMASEAL) around the cable, filling the gap; allow to cure. For a cable bundle or larger penetration: use a fire-rated batt (Rockwool Firepro) cut to fit, with intumescent sealant around the edges. For conduit penetrations: fire-rated collars (Promat). The sealant / collar maintains the wall's fire rating (typically 60 minutes for compartment walls). Document on job sheet AND fire-safety log if applicable.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 3"
            title="Restoring building fabric"
            description="When fault rectification has disturbed plaster / brick / tile / joist / ceiling / flooring — the L3 apprentice scope, the techniques, the customer brief on scope boundaries, and the trade coordination with plasterer / decorator / tiler / builder."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three categories: make-good (always electrician), basic patch (often electrician), full restoration (separate trade). Scope clarity in the quote prevents disputes.",
              "Fire-stopping at compartment-wall penetrations is non-negotiable. BS 7671 527.2 + Building Regs Approved Document B + RR(FS)O 2005 require intumescent sealing.",
              "Photograph pre-existing damage at start of work. Five-second mobile photo prevents 90% of 'you damaged that' disputes.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish make-good (electrician scope) from full restoration (specialist trade) and brief the customer accordingly.",
              "Apply BS 7671 522.6 cable depth and safe-zone requirements for cables in chased walls.",
              "Apply fire-stopping at cable penetrations through fire-rated walls / floors using intumescent materials (Hilti CP 606, Promat PROMASEAL).",
              "Carry the standard make-good kit — bonding, filler, plasterboard offcuts, scrim tape, fire-stop sealant, touch-up paint.",
              "Document pre-existing damage and restoration work on the job sheet to manage customer expectations and disputes.",
              "Recognise trade boundaries between electrician, plasterer, tiler, decorator, and builder; refer specialist trades when needed.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Make-good vs full restoration</ContentEyebrow>

          <ConceptBlock
            title="Three scope categories — clarify which apply"
            plainEnglish="The customer expects the work to be 'finished'. The trade's definition of finished varies. Make-good (no holes, no exposed cable, fire-stopping) is always the electrician's responsibility. Full restoration (re-plaster, re-paint, re-tile) is a separate trade. Quote upfront which applies."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MAKE-GOOD</strong> — close holes left by chasing / drilling, refit accessories, ensure no exposed cable / live parts, fire-stop penetrations. Always electrician's scope.</li>
              <li><strong>BASIC PATCH</strong> — bond and skim small areas (1–2 m² internal), patch small plasterboard holes. Within scope at apprentice level under supervision; some firms include in standard quote.</li>
              <li><strong>FULL RESTORATION</strong> — re-plaster larger areas, re-tile, re-paint, re-floor. Separate trade (plasterer, decorator, tiler).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 527.2 (Sealing of penetrations)"
            clause={<>"Where a wiring system passes through elements of building construction such as floors, walls, roofs, ceilings, partitions or cavity barriers, the openings remaining after passage of the wiring system shall be sealed according to the degree of fire resistance prescribed for the respective element of building construction (if any)."</>}
            meaning={<>Reg 527.2 requires fire-stopping at any penetration of a fire-rated element. For domestic work — compartment walls (party walls between dwellings), floors between flats, fire-rated ceilings. For commercial — much broader. The intumescent sealing is the responsibility of the operative who created the penetration; the L3 apprentice fits it as part of make-good.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 527.2."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Cable burial and safe zones</ContentEyebrow>

          <ConceptBlock
            title="BS 7671 522.6 + Approved Document B"
            onSite="Cables in chased walls within 50 mm of the surface must be in a \'safe zone' OR mechanically protected. The L3 apprentice ensures cables run in safe zones (above socket level, vertical from sockets / switches, near edges) with capping / channel protection over the cable before plastering."
          >
            <p>Safe zones (cables &lt; 50 mm depth):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Vertical zones from sockets / switches.</li>
              <li>Horizontal zones above accessory level.</li>
              <li>Zones within 150 mm of ceiling / wall edge.</li>
            </ul>
            <p>Outside safe zones (≤ 50 mm depth) requires mechanical protection: steel conduit, capping / channel before plastering, OR RCD protection (30 mA on the supply).</p>
            <p>Cables &gt; 50 mm depth — no zone restriction (already protected by depth).</p>
            <p>Chase depth: no more than 1/3 of wall thickness on internal walls; no more than 1/6 on load-bearing external walls. Horizontal chases limited to about 1/4 of wall length.</p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fire-stopping at penetrations</ContentEyebrow>

          <ConceptBlock
            title="Intumescent materials at compartment penetrations"
            plainEnglish="Fire-stopping seals cable / conduit / fitting penetrations through fire-rated walls and floors with intumescent materials. The sealant maintains the fire rating of the element — fire / smoke can't spread through the cable hole. Without it, the building\'s compartmentation strategy is defeated."
          >
            <p>Standard fire-stopping products:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hilti CP 606 / CP 611A</strong> — intumescent sealant cartridge for cable penetrations through plasterboard / brick / block.</li>
              <li><strong>Promat PROMASEAL</strong> — intumescent sealant range for various penetration sizes.</li>
              <li><strong>Rockwool Firepro</strong> — fire-rated batts for larger penetrations and risers.</li>
              <li><strong>Promat fire collars</strong> — for conduit / PVC pipe penetrations.</li>
              <li><strong>FireFly intumescent</strong> — UK trade standard for general-purpose fire-stopping.</li>
            </ul>
            <p>
              Standard locations requiring fire-stopping: party walls between dwellings; compartment walls in HMOs / commercial; floors between flats; ducts and risers; protected escape stairwells. The fire rating of the seal must match the element rating (typically 60 minutes for compartment walls).
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Customer brief on restoration scope</ContentEyebrow>

          <ConceptBlock
            title="Three-point upfront brief prevents post-work dispute"
            onSite="Most disputes about \'unfinished work' come from unclear scope at the start. The clear brief at quote stage + the visual confirmation at the end manages expectations."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WHAT\'S INCLUDED</strong> — make-good (no holes, no exposed cable, accessories refitted, fire-stopping). Basic patching of small areas if your firm includes this.</li>
              <li><strong>WHAT\'S NOT INCLUDED</strong> — full restoration (re-plaster / re-paint / re-tile / re-floor). The customer needs a separate trade.</li>
              <li><strong>WHO TO USE</strong> — recommend a plasterer / decorator / tiler if the customer needs one. Referrals are good business; the customer appreciates the help; the recommended trade may return the favour.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Hidden cable identification for the next sparks</ContentEyebrow>

          <ConceptBlock
            title="Mark the route, document the depth, save the next visit"
            plainEnglish="Cables you bury today are someone else's investigation tomorrow. The L3 expectation is to leave enough breadcrumbs that a future fault-finder can trace the route without opening a wall."
            onSite="Photograph the cable run before plastering or boarding back up. Mark depth and route on a simple sketch on the job sheet, with reference points (joist counts from a fixed corner, distances from a window head). Where the cable doesn&apos;t sit in a prescribed zone, document the alternative compliance route (RCD plus zone, earthed metallic covering, conduit) so the next sparks can verify it instead of reopening the wall."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Photo before close-up</strong> &mdash; phone camera, route visible, reference object in frame for scale.</li>
              <li><strong>Sketch on job sheet</strong> &mdash; rough plan, distances, depth, prescribed zone or 522.6.204 alternative used.</li>
              <li><strong>Schedule of circuits update</strong> &mdash; if the repair changed circuit layout, update the CU schedule before you leave.</li>
              <li><strong>Customer copy</strong> &mdash; give the customer the photo and sketch alongside the certificate. They keep them with the property file.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 522.6.202"
            clause={
              <>
                "A cable installed in a wall or partition shall comply with the requirements set out in Table 52.1: (a) be installed in a prescribed zone; and (b) be provided with additional protection by means of an RCD having the characteristics specified in Regulation 415.1.1; or (c) comply with Regulation 522.6.204."
              </>
            }
            meaning={
              <>
                When you re-route a cable during fault correction, it has to land in a prescribed zone OR be RCD-protected to 415.1.1 OR carry a 522.6.204-compliant covering. There is no &ldquo;buried straight across the middle of the wall and hoped for the best&rdquo; option in BS 7671.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 522.6.202 / Table 52.1, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 514.1.2"
            clause={
              <>
                "So far as is reasonably practicable, wiring shall be so arranged or marked that it can be identified for inspection, testing, repair or alteration of the installation."
              </>
            }
            meaning={
              <>
                The duty to leave wiring identifiable applies on every repair, not just first install. Updating the CU schedule, leaving a sketch, photographing the route &mdash; that&apos;s how you discharge 514.1.2 on a fault-correction visit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 514.1.2, verbatim."
          />

          <ConceptBlock
            title="Make-good kit on the van — what to carry as standard"
            plainEnglish="A repair that ends with a tidy patched wall feels like a finished job; one that ends with a hole feels half-done. The standard make-good kit on a typical UK van is small, cheap and saves the return visit. Filler, scrim tape, plasterboard offcuts, fire-stop sealant, touch-up paint and a small trowel handle the vast majority of domestic patches in 20-30 minutes."
            onSite="Build the kit once, replenish weekly. Bonding plaster (Thistle Bonding) for deeper patches, finishing plaster (Multi-Finish) for the skim coat, easy-fill (Polyfilla) for small holes, intumescent sealant (Hilti CP 606 or similar) for cable penetrations through compartment walls, scrim tape for joints, plasterboard offcuts in 12.5 mm and 15 mm. A small artist's brush plus a tin of trade emulsion in white covers most touch-ups. The kit fits in a single tote tray on the van."
          >
            <p>
              Standard van make-good kit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Filler</strong> — bonding plaster bag, multi-finish bag,
                ready-mix small tub, easy-fill tube.
              </li>
              <li>
                <strong>Plasterboard offcuts</strong> — 12.5 mm and 15 mm in
                manageable sizes; useful for cutting custom patches over old
                back boxes.
              </li>
              <li>
                <strong>Fire-stop sealant</strong> — Hilti CP 606 or
                equivalent intumescent acrylic; cartridge gun.
              </li>
              <li>
                <strong>Scrim tape and joint compound</strong> — for
                taping plasterboard joints flush.
              </li>
              <li>
                <strong>Touch-up paint</strong> — small tin of trade white
                emulsion plus a fine brush; covers patch repair after the
                filler has dried and been sanded.
              </li>
              <li>
                <strong>Tools</strong> — small trowel, sanding block, dust
                sheet, masking tape, measuring stick.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Photographing pre-existing damage — the dispute prevention habit"
            plainEnglish="Customers occasionally claim that damage to a wall, ceiling or finish was caused by the rectification work when in fact it was already there. The single most effective defence against this is a 30-second mobile photo at the start of the visit. Wide shot of the work area, close shots of any pre-existing scuff, crack or stain, time-stamped on the camera roll. Five seconds per photo, lives in the job record alongside the certificate."
            onSite="Make the photos a habit, not an afterthought. Walk the work area when the customer first lets you in — phone out, half a dozen photos, reference shots of the consumer unit, the room you'll be working in, the floor or carpet, any visible existing damage. The customer sees you doing it and notes the professionalism. If a dispute arises later, the photo is conclusive. Most disputes never reach that point because the photos exist and the customer knows."
          >
            <p>
              Standard pre-work photo set:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wide of the work area</strong> — orientation shot.
              </li>
              <li>
                <strong>Wide of the consumer unit</strong> — board face plus
                surrounding wall.
              </li>
              <li>
                <strong>Close of any pre-existing damage</strong> — scuff,
                crack, stain, hole, paint mismatch.
              </li>
              <li>
                <strong>Floor / carpet condition</strong> — particularly if work
                involves drilling overhead or pulling cable through ceiling
                voids.
              </li>
              <li>
                <strong>Customer's adjacent items</strong> — anything
                breakable, valuable or specifically positioned by the customer.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When to refer to a specialist trade — and how to do it well"
            plainEnglish="The electrician's make-good covers basic patching. Restoration of a tiled wall, an ornate plaster cornice, a polished hardwood floor, a wallpapered feature wall — those need the relevant specialist trade. The L3 apprentice's job is to recognise the boundary, brief the customer at the start of the visit, and where possible recommend a trusted local trade. Done well, the multi-trade handover feels coordinated; done badly, it leaves the customer feeling abandoned with an unfinished room."
            onSite="At the upfront brief, name the boundary explicitly. 'I'll do the electrical work and the basic patching of the wall. The wallpaper match needs a decorator — I can recommend a local one if you don't have one.' Most customers understand and appreciate the honesty. Keep a short list of trusted local trades for the office to share — tilers, decorators, joiners, plasterers, carpet fitters. The L3 apprentice does not personally arrange the third-party visit but does provide the contact and the context."
          >
            <p>
              Common specialist-trade handover patterns:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tiler</strong> — for tile removal, cutting, re-fit,
                grout match.
              </li>
              <li>
                <strong>Decorator</strong> — for wallpaper match, paint
                large-area finish, high-end finish work.
              </li>
              <li>
                <strong>Plasterer</strong> — for ornate cornice, ceiling rose,
                large-area skim coat, lime plaster on heritage properties.
              </li>
              <li>
                <strong>Carpet fitter</strong> — for carpet pulled back to
                access floorboards.
              </li>
              <li>
                <strong>Joiner</strong> — for skirting, architrave, door frame
                damage.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping fire-stopping because 'it\'s only domestic\'"
            whatHappens={<>Apprentice runs a new cable through a party wall between two terraced houses. Doesn\'t fit fire-stop because \'it\'s only domestic\'. Eight months later there\'s a fire in next door\'s lounge; smoke and flames travel through the unsealed cable hole into the customer\'s loft, igniting stored materials. Fire damage to the customer\'s property; insurance investigation finds the unsealed penetration; the firm is liable for failing to fit fire-stop required by BS 7671 527.2 + Approved Document B.</>}
            doInstead={<>Always fire-stop penetrations through compartment walls / floors. The Hilti CP 606 cartridge is £15 and takes 2 minutes to apply. Cheap insurance against a fire-spread incident. Document the fire-stopping on the job sheet AND on the building\'s fire-safety log if applicable.</>}
          />

          <CommonMistake
            title="Leaving make-good \'for the customer to sort out\'"
            whatHappens={<>Apprentice completes electrical rectification work, leaves a 200 mm hole in the kitchen wall where they accessed a junction box. Customer is shocked — they thought the work would include making the wall good. Customer complaint to the firm; firm has to send the apprentice back to patch the hole; customer charged again or work done at firm\'s cost. Either way, customer is unhappy; firm\'s reputation suffers. The 30-minute patch at the end of the original visit would have prevented the comeback.</>}
            doInstead={<>Make-good is the electrician\'s responsibility. Carry the kit; do the make-good before leaving. The 30-minute investment at the end of the job is part of the work, not optional polish.</>}
          />

          <Scenario
            title="Fault rectification requires chasing through a tiled bathroom wall"
            situation={<>Investigation reveals an HRJ in the bathroom lighting circuit at a hidden junction box behind the tiled wall. To access, you need to remove 2–3 tiles, chase the cable, fit the junction box, and restore.</>}
            whatToDo={<>(1) Brief the customer BEFORE work — explain the access requirement, the tile removal, the restoration scope: \'I\'ll need to remove 2–3 tiles to access the junction box. I\'ll do the electrical work and the make-good (chase, cable, junction box, fire-stop, basic plaster fill). The tiles need to be re-fit by a specialist tiler — I can recommend one if you don\'t have one. The tiler may need 1–2 days lead time to source matching tiles if yours aren\'t in stock\'. (2) Get customer agreement to the scope and timing. (3) Photograph the area before work (insurance / dispute protection). (4) Score around the affected tiles carefully (Bahco BK60 tile cutter or similar); remove tiles intact where possible; save them for re-fit. (5) Chase the wall to access the junction box; fit / replace the junction box; restore cable; fire-stop the chase; bond and skim flush. (6) Hand back to customer with: tiles set aside; surface ready for tiler; junction box accessible; certificate documenting the work. (7) Recommend tiler contact details; customer arranges tile re-fit.</>}
            whyItMatters={<>The structured approach manages the multi-trade nature of the work. Customer knows what to expect; the electrician\'s scope is clear; the tiler\'s role is identified; the documentation supports both trades. Without the upfront brief, the customer would be shocked at \'unfinished' work; with it, they\'re a partner in the multi-trade coordination.</>}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three categories: make-good (electrician scope), basic patch (often electrician), full restoration (specialist trade). Quote upfront which applies.",
              "Make-good standard: no holes, no exposed cable, accessories refitted, fire-stops fitted, surface filled flush.",
              "Fire-stopping at compartment-wall penetrations is non-negotiable. BS 7671 527.2 + Approved Document B + RR(FS)O 2005.",
              "Cable burial: BS 7671 522.6 safe zones (above accessory level, vertical from sockets, near edges) for cables &lt; 50 mm depth, OR mechanical protection.",
              "Standard make-good kit: bonding plaster, filler, plasterboard offcuts, scrim tape, fire-stop sealant, touch-up paint. £40–60 cost, lasts months.",
              "Document pre-existing damage at start of work — 5-second mobile photo prevents 90% of damage disputes.",
              "Trade boundaries: electrician = electrical + make-good; plasterer / tiler / decorator = finishing trades. Refer for specialist work.",
              "Customer brief on scope (what's included / not included / who to use) at the start of work prevents post-work disputes.",
            ]}
          />

          <Quiz title="Restoring building fabric — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.2 Verification + retesting</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.4 Safe disposal + leave area safe</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
