/**
 * Ported from the English course, combining:
 *   level3/module4/section6/Sub1.tsx
 *   level3/module4/section3/Sub2.tsx
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
    id: 'mod4-s6-sub1-as-built',
    question:
      "You're sent to rectify a fault on a small-commercial three-phase distribution board. The customer hands you a drawing pack — 'here's the as-built for the board'. Before you read the schematic, what's the first thing you check?",
    options: [
      "Schedule of Remedial Works (or 'Remedial Action Notice') referenced back to the original EICR + Minor Works Certificate for the rectification work itself. The Schedule of Remedial Works lists each EICR-coded item, what was done to rectify, the new test result, the date and signature. Combined with the MWC, it's the documentary proof that the C2 has been cleared. The Duty Holder (the customer, employer or landlord) keeps the EICR + the Schedule + the MWC together — that's the bundle they hand to the next inspector at the next periodic inspection (typically 5 years for domestic, 1 year for commercial / landlord).",
      "Drawing currency and revision. The drawing has a title block in the corner with REV LETTER (A, B, C, D…), DATE, REVISION DESCRIPTION, and DRAWN BY / CHECKED BY / APPROVED BY signatures. If the latest revision is dated three years ago and the customer has had additions since, the drawing is OUT OF DATE — you treat it as a starting hypothesis, not as truth. The apprentice's discipline is to verify the drawing against the actual installation (cross-check at the DB, at least three random circuits) before relying on it. Drawings that don't match the installation are the canonical cause of rectification mistakes.",
      "Decline. The senior is asking you to be inside the danger zone of a live exposed conductor without the operational role of a witness/observer (you're holding a cover, not observing safety). EAWR Reg 14 — three conjoint tests — would not be satisfied: live work is happening, you're in the danger zone, but there's no live-working risk assessment that includes you as a participant. Your appropriate role is OUTSIDE the work area as a barrier-monitor / comms-runner / first-aider. If the senior needs the cover held to access the busbar, the right answer is to use a clip / stand / temporary cover-prop, NOT a human hand. Politely escalate to the supervisor if pressed.",
      "They share components — both depend on R1+R2 (the cable line + CPC resistance for Zs, line + neutral resistance for voltage drop). A high-Zs reading often correlates with a high voltage drop reading because both are dominated by the cable's R1 contribution. If you find one is borderline, check the other. The two tests are complementary — Zs verifies fault-clearance (ADS), voltage drop verifies normal-operation quality. Both use cable resistance as a key input.",
    ],
    correctIndex: 1,
    explanation:
      'Drawing currency is the step-up. It is tempting to assume drawings are correct. In fault rectification you assume instead that drawings are a starting hypothesis to be verified. The title block tells you the revision; cross-checking at the DB tells you whether the drawing matches reality.',
  },
  {
    id: 'mod4-s6-sub1-mfr',
    question:
      "You're replacing a failed Schneider iC60N RCBO. Before you fit the new one, what manufacturer information do you need?",
    options: [
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      'No, for several reasons. The refrigerant work requires F-Gas certification (criminal offence to do without). The Building Regulations Part L compliance pathway requires installation by an MCS-certified installer for the customer to claim Smart Export Guarantee or similar incentives. The Boiler Upgrade Scheme grant requires MCS sign-off. Manufacturer warranties typically require certified installation. The MCS install pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule, commissioning records — all required for the system to perform as designed. DIY heat-pump install is unsafe and uneconomic.',
      'A larger consumer unit (often 16-24 way) with dedicated RCBOs / AFDDs for the PV inverter AC connection, the battery inverter AC connection, the EV charger circuit, the heat pump circuit, plus the existing house circuits. Sometimes a separate sub-board for the PV / battery / heat pump cluster and a CT clamp on the main supply tail back to the EV charger or HEMS. Cable management at the CU becomes a real consideration — main tails plus PV export plus battery in/out plus heat pump and EV feeds is a lot of cable in one box.',
      "Three pieces. (1) The DATA SHEET for the iC60N — confirms terminal torque (typically 2.0–3.0 Nm for a Schneider DIN-rail device), connection diagram, AFDD compatibility flag if any, ambient temperature derating curve. (2) The INSTALLATION INSTRUCTIONS — covers the busbar engagement sequence (the small click as the busbar tab seats), the mounting orientation requirement (always vertical, terminals up or down per the model), the test button function. (3) The TYPE-COMPATIBILITY SHEET — confirms the iC60N is a like-for-like replacement for the device that failed (same In, same Type B/C/D curve, same IΔn on the RCD side, same breaking capacity). Schneider's product page on schneider-electric.co.uk has all three downloadable as PDF.",
    ],
    correctIndex: 3,
    explanation:
      'Manufacturer data is the design authority for the device. Wrong torque means a high-resistance termination that will heat and fail again. Wrong type-class (B vs C) means nuisance-trip behaviour will change. Reading the data sheet is 5 minutes; ignoring it is the cause of the comeback visit.',
  },
  {
    id: 'mod4-s6-sub1-gn3',
    question:
      "You're planning Zs verification on a remote socket after rectifying a kitchen ring. What does IET Guidance Note 3 (Inspection and Testing, current edition) tell you about the test method?",
    options: [
      'The fault is at a point that splits the supply — typically the consumer unit busbar, an MCB / RCBO, or a sub-circuit. If the divide is between RCD-protected zones (e.g. all RCD1 circuits dead, all RCD2 fine), the issue is RCD1 or its busbar. If the divide is between separate buildings on the same supply (main house OK, garage out), the issue is the garage feed. The fault is at the upstream side of the affected portion. Investigation: identify the boundary of dead vs live circuits; trace upstream from the boundary; the fault is at the point where dead becomes live.',
      'Six-point check. (1) ENERGISE the rectified circuit AND verify the affected sockets work (kettle test or known-good appliance). (2) ALL other circuits restored to their pre-visit state — check no breakers left off, no insulation tape on terminals. (3) DB closed and locked, cover screws back in. (4) NO TOOLS / OFFCUTS / WASTE left in the work area — sweep visually before walking out. (5) NO TRIP HAZARDS — cables clipped, carpet replaced, kitchen drawers closed. (6) CUSTOMER HANDOVER — show them the work, demonstrate the fix, hand over the certificate, explain any follow-up. The customer arriving home to a dark kitchen because you forgot to flick a breaker back on is the worst hand-back failure.',
      'GN3 sets the practical method for Zs measurement and the interpretation of results. Key points: (1) Use the TWO-LEAD method on socket-outlets if possible (cleaner reading than the three-lead). (2) Read at the FURTHEST point of the circuit from the protective device, not at the DB. (3) Apply the temperature-correction factor (the measured Zs is at ambient, but the protective device must operate when conductors are at running temperature, normally taken as 70 °C for general PVC); GN3 gives the multiplier (typically 1.20 for cables at 70 °C from 20 °C ambient). (4) Compare the corrected Zs against the BS 7671 maximum for the device type and rating in Tables 41.2 to 41.4 OR use the 0.8 rule of thumb. (5) RECORD the actual reading on the test schedule, not just the pass/fail.',
      "The portfolio captures: (1) WORK EVIDENCE — job sheets, certificates, photos of the work in progress and completed. (2) REFLECTION — written reflections on each significant piece of work, using a structured format (often Gibbs' or Kolb's reflective cycle) — what was the situation, what did you do, what was the result, what would you do differently. (3) WITNESS TESTIMONY — the supervisor / on-site mentor signs off that the work was witnessed and the standard was met. (4) UNIT MAPPING — each piece of evidence is mapped to the relevant 2365 unit and Assessment Criterion. The reflection is the 'learning' part — the portfolio doesn't just prove you DID the work, it proves you LEARNED from it. The L3 to L4 / Approved Electrician progression assesses the portfolio as much as the technical work.",
    ],
    correctIndex: 2,
    explanation:
      "GN3 is the IET's interpretive guidance for BS 7671 Part 6 testing. The apprentice should know GN3 exists, what it covers (test methods, instrument selection, result interpretation), and how to use it as the bridge between the BS 7671 regulation and the practical site test. Guidance Notes are not legal requirements but they are the industry-accepted method.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the difference between an 'as-designed' drawing and an 'as-built' drawing, and which one matters for rectification work?",
    options: [
      'Standard EICR per BS 7671 Part 6 covers the fixed wiring of the property. With env tech additions you must also: verify the PV DC isolator is accessible, labelled and operates correctly; check inverter signage at the consumer unit, meter and DC isolator (BS 7671 Section 712 plus MCS Code requirements); record the PV array Voc and inspect for visible cell or junction-box damage from a roof-safe vantage; test the AC final circuit serving the inverter as a normal final circuit; for the EV charger — verify the open-PEN protection method (built-in, TT electrode, or external device), test the RCD type (Type B or Type A + RDC-DD), check the local isolator is within sight; record findings in the EICR observations alongside the standard codes. Use C1 / C2 / C3 / FI codes per the EICR Best Practice Guide.',
      "Two different documents. AS-DESIGNED is the drawing the designer issued before construction — what the installation was intended to be. AS-BUILT is the drawing updated by the installer at handover to reflect what was actually installed (different cable routes, substituted accessories, additions during construction). Rectification work needs the AS-BUILT — that's the drawing that should match the live installation. If only the as-designed is available, the contractor verifies against the actual installation before relying on it. Many small-commercial installations have only as-designed because the as-built was never produced or has been lost; in that case the contractor's first task is to redraw the affected section before rectification.",
      'Around eight hours of accredited training (typically delivered as a one-day workshop or split over two half-days) covering climate science, the carbon impact of the trainee role and sector, individual and workplace action, and the social and economic context of the climate transition. To become Certified Carbon Literate the trainee must demonstrate understanding through assessment and commit in writing to one personal action and one workplace action. The Carbon Literacy Project (a Manchester-based registered charity) accredits training providers and issues the certifications. Major UK construction and engineering firms run rolling Carbon Literacy programmes for their workforces.',
      'The DNO (Distribution Network Operator) is the company that owns and maintains the local low-voltage and medium-voltage distribution network — the poles, cables and substations between the National Grid and the customer meter. There are six DNO regions in Great Britain (UK Power Networks, Northern Powergrid, SP Energy Networks, Electricity North West, National Grid Electricity Distribution, SSEN). The DNO is NOT the supplier — the supplier sends the customer bill but does not own wires. You find the DNO from the postcode (the ENA Distribution map) or from the MPAN supply number at the customer meter (digit 1 of the bottom-line MPAN identifies the supply area). G98 / G99 notifications go to the relevant DNO, not to OFGEM, not to the supplier.',
    ],
    correctAnswer: 1,
    explanation:
      'Drawing-type literacy is competence. As-designed = intent; as-built = reality. For rectification, you need reality. Where reality drawings are missing, the contractor produces a sketch as part of the rectification scope; the cost of doing so is recovered in the quote.',
  },
  {
    id: 2,
    question:
      'A small-commercial Schedule of Test Results from the original EIC shows R1+R2 = 0.45 ohm and Zs = 0.62 ohm on the affected circuit. You re-test after rectification and get R1+R2 = 0.78 ohm and Zs = 0.95 ohm. What does the comparison tell you?',
    options: [
      "Live working is permitted under EAWR Reg 14 only when (a) it's unreasonable for the conductor to be dead, (b) it's reasonable for work to be carried out live, and (c) suitable precautions are taken — ALL three. Choosing live work to avoid customer inconvenience does NOT pass test (a) — convenience isn't 'unreasonable for the conductor to be dead'. The apprentice doesn't get to make that trade-off; the firm's risk assessment makes it, with documented justification, and the supervisor authorises it. The 'I'll just do it live, the customer doesn't want the power off' is the exact failure mode the HSE prosecutes after the inevitable shock.",
      'Isolate AC and DC sides, lock-off, prove dead. Disconnect strings panel by panel. Remove panels using safe roof-access procedures. Recover the panels for recycling — established PV recycling streams in the UK take aluminium frames, glass, copper wiring and silicon cells separately. Inverter and any battery component handled as WEEE (electronics) and hazardous waste (battery) respectively. Roof penetrations made good. Update the EIC to reflect the removal. The MCS-certified installer (or successor) typically arranges the decommissioning chain through authorised waste carriers.',
      "The increase suggests something in the rectification has added resistance. Possible causes: (1) the new accessory's terminations are higher resistance than the originals (under-torqued, dirty, oxidised), (2) the rectification involved a new joint that wasn't there originally (junction box, Wago connector), (3) the cable conductors were inadvertently nicked during the work, (4) a CPC was missed and the only return path is via the bonding network (high resistance). The apprentice's response is — STOP, recheck terminations to manufacturer torque, retest, and only sign off when the readings are within reasonable tolerance of the original (typically ±10% acceptable for the same circuit / same instrument). Comparison against the original is the catch that prevents 'looks fine' rectifications passing.",
      "The F-Gas Regulations (the EU Fluorinated Greenhouse Gases Regulation retained in UK law plus the UK Fluorinated Greenhouse Gases Regulations 2015) require any work on a sealed refrigerant circuit (charging, recovery, leak testing, brazing into the circuit) to be carried out by an F-Gas-certified person. Companies handling F-Gas refrigerants must hold a company F-Gas certificate. The electrician's scope is the electrical supply, isolation, controls, smart integration and external bonding. The trade boundary is firm — the electrician calls in an F-Gas-certified engineer for any refrigerant work.",
    ],
    correctAnswer: 2,
    explanation:
      'Comparing test results pre- and post-rectification is one of the most powerful techniques for catching subtle errors. A circuit that was 0.45 ohm and is now 0.78 ohm has changed, and the change is not random — it points at the rectification work. The original Schedule of Test Results from the EIC is the baseline; the comparison is the verification step.',
  },
  {
    id: 3,
    question:
      "What's the IET Code of Practice (5th Edition, 2026) for In-service Inspection and Testing of Electrical Equipment, and how does it relate to fault rectification on portable / fixed equipment?",
    options: [
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      'A PCR is a published rulebook that defines the methodology for preparing an EPD for a specific product category — for example installation cable, luminaires, switchgear or insulation. It specifies the functional unit (e.g. one metre of cable of given specification), the system boundary, the data requirements, the calculation methodology and the reporting format. All manufacturers preparing EPDs for that product category follow the same PCR, ensuring like-for-like comparability across competing products. PCRs are managed by EPD programme operators such as EPD International, IBU and INIES.',
      "The IET Code of Practice (5th Edition, 2026) — formerly known as PAT testing guidance, now properly 'In-service Inspection and Testing of Electrical Equipment' — is the industry standard for the inspection and testing of portable, movable and fixed equipment in service. It covers visual inspection, earth continuity, IR, polarity, functional testing. For fault rectification on equipment (a workshop tool, a kitchen appliance, a hand-held inspection lamp), the Code sets the test method, the pass criteria, and the labelling / record-keeping requirements. The apprentice meets the Code on equipment-side rectification (replacing a failed flex on a Class I appliance, replacing a damaged 13 A plug-top), and on hand-back the equipment carries a fresh in-service test sticker with the date and the next test due.",
    ],
    correctAnswer: 3,
    explanation:
      "The IET CoP 5th edition (2026) is the current authoritative guidance for in-service testing. It replaced informal 'PAT testing' terminology with the more accurate 'in-service inspection and testing of electrical equipment'. The 5th edition introduced risk-based test intervals, simplified the test categories, and aligned with the current edition of BS 7671. Equipment rectification work normally produces a fresh in-service test record as part of hand-back.",
  },
  {
    id: 4,
    question:
      'BS 7671 Section 134.1.1 says the installation shall be designed and erected to provide for safety. How does this regulation apply during fault rectification?',
    options: [
      "Reg 134.1.1 applies to ANY work on the installation — design, erection, alteration, repair. It says the work shall be carried out by skilled and instructed persons in accordance with the requirements of BS 7671. For rectification, the practical implication is — the rectified circuit, after the work, must STILL meet the original BS 7671 design intent (correct cable size, correct protective device, correct earthing arrangement, correct supplementary bonding). 'Putting it back as it was' is not enough if the original was non-compliant; the rectification is an opportunity to bring the affected circuit up to the current edition of BS 7671 (A4:2026 in 2026). Where the original design predates current standards, the rectification at least matches like-for-like and any departure from current standards is recorded on the certificate.",
      "Significantly. A repair that's exposed to harsh environment (outdoor, kitchen, plant room, washroom) may not last as long as the same repair in benign environment. The repair-vs-replace decision should consider: (a) what's the IP / environmental rating of the repaired vs replacement component? (b) Will the repair retain the original IP rating? (c) Is the new component IP-rated for the actual environment? Replacement often comes with current IP / environmental ratings; repair preserves the existing rating (which may have degraded). For harsh environments, replacement is usually the right call.",
      'BS 7671 Section 712 (extensively revised in A4:2026) requires specific signage at the consumer unit (presence of PV generator), at the meter (alternative supply source), at the inverter (DC and AC isolation points) and at any external DC isolators. The EICR inspector verifies presence and legibility of each sign; missing or illegible signage is recorded as an observation (typically C3 — improvement recommended — unless the absence creates an immediate safety risk for maintainers, in which case C2). The Code Breakers schedule and the EICR Best Practice Guide give the typical coding choice. Inspector recommendations should call for the missing signage to be reinstated.',
      'Same framework as PV and battery. Any generator connected in parallel with the public distribution network falls under ENA G98 (up to 16 A per phase per inverter / generator) or G99 (above 16 A or where the DNO requires pre-application). Micro-wind turbines, micro-hydro turbines and micro-CHP units output AC and connect via an inverter (or a synchronous generator with grid-tie protection). Biomass boilers without electrical generation (just heat) are not generators — no G98 / G99. ENA G83 was the older fast-track standard for micro-generators; superseded by G98 from 2019. The apprentice should recognise that the document chain (G98 / G99, type-test certificate, MCS commissioning, BS 7671 EIC, install pack) is the same regardless of the generation technology.',
    ],
    correctAnswer: 0,
    explanation:
      "Reg 134.1.1 is the umbrella safety regulation. It applies to rectification because rectification is work on the installation. The apprentice's job is to leave the rectified circuit in a state that meets the design intent and that complies with BS 7671 (current edition for new work, original edition for like-for-like replacement, with departures noted).",
  },
  {
    id: 5,
    question:
      'BS 7671 Reg 526.1 governs electrical connections. Why is this regulation central to fault rectification?',
    options: [
      "Type A RCDs detect AC residual currents and pulsating DC residual currents. They cannot detect smooth (continuous) DC residual currents — these can blind the device. Type B RCDs detect AC, pulsating DC and smooth DC residual currents. EV charge points produce smooth DC fault currents that a Type A alone cannot reliably trip. Two acceptable solutions per Section 722: (1) the unit includes its own RDC-DD (6 mA DC detection per IEC 62752 / 61851-1) and the upstream RCD can be Type A; (2) the unit does not include an RDC-DD and the upstream device must be Type B. Modern UK domestic units almost universally include the RDC-DD, so Type A upstream is the dominant choice. Always confirm against the unit's data sheet.",
      "Because the majority of faults — high-resistance joints, intermittent contact, scorched terminations, RCBO heat-trip — trace back to a connection that has degraded over time. Reg 526.1 says every connection shall be (a) suitable for the conductor and the environment, (b) constructed to maintain the connection over the equipment's life, AND (c) accessible for inspection unless specifically permitted otherwise. For rectification, this means — the new connection has to be made with the right method (screw torque, crimp, Wago / Wieland push-wire, soldered joint as appropriate), with the right material (correct ferrule for stranded into screw, correct lever-actuated connector for solid into Wago), and to the manufacturer's torque. A rectified connection that's done wrong will fail again within months. The apprentice's discipline is to follow Reg 526.1 every time, not just on the obvious connections.",
      "Engineering compromise = solution that's less than ideal but acceptable given constraints (cost, time, building fabric, customer budget). Examples: (1) Add a dedicated circuit for high-load appliance instead of full kitchen rewire. (2) Replace one tripping RCBO instead of upgrading to all-RCBO CU. (3) Patch a damaged cable section instead of replacing the full run. Each compromise is acceptable IF: (a) it brings the installation to BS 7671 compliance, (b) the limitations are documented and communicated to the customer, (c) the customer has accepted the compromise in writing, (d) the firm's professional indemnity covers the chosen approach. Compromise is engineering, not corner-cutting.",
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 526.1 is the connection regulation and it's the single most-violated regulation in fault rectification. Every screw torque, every crimp, every Wago, every soldered joint is governed by 526.1. The apprentice's competence test is to know the right method for the right conductor in the right environment, and to apply it consistently.",
  },
  {
    id: 6,
    question: "What's the apprentice's planning routine for parts before going to site?",
    options: [
      'BUS provides £7,500 for ASHP / GSHP and £5,000 for biomass — but the biomass strand is restricted to properties that are not connected to the gas grid AND in defined rural categories AND meet Ecodesign emission limits. The intent: heat pumps are the policy default, biomass is a fallback for properties where heat pumps are not viable (very high heat load, no electrical capacity for the heat pump, off-gas-grid rural) and where the air-quality impact is minimal (rural distance from neighbours, Defra-approved Ecodesign appliance). For a typical suburban property the BUS biomass strand is closed. For a rural off-gas-grid farmhouse with a 30 kW heat load, BUS biomass is sometimes the only viable grant route. The electrician sees biomass overwhelmingly in rural settings.',
      "Three reasons stack up. (1) Foreseeable financial loss — refrigerated stock, in-flight tills, in-flight card payments, in-flight server transactions, in-flight CNC jobs in a workshop, all of which the customer has cause to claim against you if you didn't warn them. (2) Customer trust and repeat business — a contractor who 'just turns the power off' without a heads-up is the contractor the customer doesn't call back. (3) Competence under EAWR Reg 16 — part of competence is foreseeing the consequences of your actions; failing to plan the isolation is itself an EAWR Reg 16 issue, because a competent person would have foreseen and managed the impact.",
      "Five-step parts planning. (1) IDENTIFY the failed component from the diagnosis report — make, model, part number, electrical rating, mechanical rating. (2) CONFIRM availability — check wholesaler stock (CEF, Edmundson, Rexel online) or in-van stock; for special items (heritage MK accessories, obsolete Wylex parts) source by phone first. (3) LIKE-FOR-LIKE check — confirm the replacement is electrically and mechanically equivalent (same In, same curve, same form factor, same back-box dimensions). (4) UPGRADE check — does current BS 7671 (A4:2026) require something different (e.g. AFDD where previously not required)? Discuss with supervisor and customer if upgrade is being made. (5) SPARE consideration — for critical-life components (commercial 3-phase RCBOs, large MCBs) carry a spare for first-failure replacement on the day. The 5-step routine takes 10 minutes the night before; saves the comeback visit for 'wrong part'.",
      "Where equipment is connected and is likely to influence the test or be damaged by the test voltage, a 250 V DC IR test shall be used following connection of the equipment, as clarified in the A4:2026 redraft. Practical implication for fault diagnosis: when you re-IR-test a circuit AFTER fixing a fault and reconnecting electronics (LED drivers, dimmers, electronic timers, smart sockets), use the 250 V range on the MFT to verify the post-fix IR without damaging the kit. The 500 V test still applies before the equipment is connected — that's how you confirm the wiring itself is healthy. The two-stage test (500 V isolated + 250 V with kit re-connected) is the A4:2026-aligned procedure.",
    ],
    correctAnswer: 2,
    explanation:
      "Parts planning is the practical interpretation of the information sources (diagnosis report, wholesaler catalogues, manufacturer data sheets, BS 7671 chapters). The 5-step routine is industry standard for any rectification visit and the apprentice's competence is to apply it before van loading, not to discover the missing part on site at 14:00.",
  },
  {
    id: 7,
    question:
      "You arrive at the site and the customer says 'while you're here, can you also fix the dim light in the hallway and the sticky kitchen socket?'. What's the planning response?",
    options: [
      'The BUS is the current main UK government grant for low-carbon heating retrofits — currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and lower amounts toward biomass boilers in eligible properties. The grant is administered by Ofgem and paid to the MCS-certified installer who passes it through to the customer as a price reduction. Eligible properties: existing dwellings (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC. The grant has been extended several times and is currently confirmed through the late 2020s.',
      "(a) To use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided in accordance with any training in the use of that equipment and the instructions respecting that use; AND (b) to inform the employer of any work situation which a person with the training and instruction given to them would reasonably consider represented a serious and immediate danger to health and safety, AND of any matter which a person with the training given would reasonably consider represented a shortcoming in the employer's protection arrangements.",
      'Scope 2 emissions for any UK business that draws grid electricity have fallen sharply over the last decade because the carbon intensity of the grid has fallen — from around 500 gCO2/kWh in 2012 to around 200 gCO2/kWh in recent years (varies year-to-year with weather, gas prices and renewables output). A business that has not changed its electricity consumption at all has nonetheless seen its scope 2 emissions roughly halve over that period, simply because the grid has decarbonised. Switching to a renewable electricity tariff (with verifiable certificates of origin) can drive scope 2 lower still under the market-based reporting method.',
      "Three-part response. (1) ACKNOWLEDGE the request — you'd like to help; you're trained to add scope when it's safe. (2) ASSESS each item — is it within today's quoted scope? Does it need additional parts you may not have? Does it need additional time? Does it expand the certification (a new fault on a different circuit means a new rectification, separate cert)? (3) DECIDE — small same-circuit additions can usually be absorbed into the visit (price agreed verbally with customer, separate line on the invoice). Different-circuit additions or large scope changes need a separate quote and possibly a separate visit. The apprentice's discipline is to avoid scope creep that runs the visit late, leaves you without the right parts, or commits to work that needs a separate cert. Speak to the supervisor by phone if unsure.",
    ],
    correctAnswer: 3,
    explanation:
      "Scope-on-arrival is one of the most common planning failures. The customer's request is reasonable; the apprentice's response is to assess against today's plan and decide based on time / parts / cert scope, not to default to either 'no' or 'yes' without thinking. Most firms want their apprentices to bring scope changes back to the supervisor / office for pricing and dispatch.",
  },
  {
    id: 8,
    question:
      "What's the practical kit (information sources) the apprentice should have at hand on every rectification visit?",
    options: [
      "Six essential references. (1) BS 7671:2018+A4:2026 itself (paper or PDF on the laptop/phone) — particularly Chapter 4 (Protection), Chapter 5 (Selection), Chapter 6 (Testing), Appendix 6 (Forms). (2) IET Guidance Note 3 (current edition) for testing methods and result interpretation. (3) IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th Edition, 2026) for equipment-side work. (4) HSE GS38 for proving-dead instruments. (5) Manufacturer data sheets for the devices being replaced (downloaded ahead of the visit to the laptop). (6) The site's as-built drawings + Schedule of Test Results from the original EIC / EICR. The apprentice doesn't memorise any of this; the apprentice KNOWS where to look it up in 30 seconds when the question arises on site.",
      "The MCS designer calculates the predicted SCOP per the heat-loss calc, the chosen emitter design, the unit specification and the design flow temperature. The result is shared with the customer in writing as part of the design proposal — typically alongside an estimated annual electricity consumption (kWh) and an estimated annual running cost using the customer's electricity tariff. This sets honest customer expectations and is the basis on which the customer makes the buy-or-not-buy decision. MCS Code of Practice requires this disclosure. Without the SCOP estimate, the customer is signing off a six-figure decision (especially with retrofit fabric work) on no basis. The apprentice should be able to find the SCOP estimate in the design pack and discuss it at customer level if asked.",
      'Ask the manufacturer directly via their technical support or sustainability team — most major UK cable and accessory manufacturers publish EPDs on their website or supply on request. If the manufacturer does not publish an EPD for that product, that fact alone is relevant to the project specifier because the spec called for EPD-backed products. The right action is to flag the missing EPD to the project specifier and either source an EPD-backed equivalent from another manufacturer or request a written derogation from the spec. Documenting the search and the decision protects the contractor against later challenge.',
      'Approximately 4.6 V or 2.0 percent of 230 V. Calculation: 6 mm copper cable has approximately 7.3 mV per A per metre voltage drop. 32 A x 35 m x 7.3 mV = 8.18 V single-direction. For circuit voltage drop the full path is line + neutral so multiply by 2 / cable factors per GN1: but the standard cable tables give the per-A-per-m value already accounting for the full loop. Check GN1 Table A1 for the exact value for the cable type. For 6 mm flat T+E with thermosetting insulation: typical 7.3 mV/A/m so 32 x 35 x 7.3 / 1000 = 8.18 V or 3.6 percent — within 5 percent socket limit but close. Worth checking the EV charger spec for its actual demand under typical use (often 28-30 A continuous, not full 32 A).',
    ],
    correctAnswer: 0,
    explanation:
      "competence is not memorising the regulations; it's knowing where to find the answer fast on site. The six-reference kit covers regulatory (BS 7671), interpretive (GN3, CoP), legal (GS38), product-specific (manufacturer data) and site-specific (as-built, EIC). All six are accessible on a phone or laptop in seconds.",
  },
];

const faqs = [
  {
    question: 'Where do I get the latest IET Guidance Note 3?',
    answer:
      "GN3 is published by the IET (Institution of Engineering and Technology) and is updated to track BS 7671 amendments. Current edition for 2026 is the post-A4 update. Available as paper book or PDF subscription from the IET shop (theiet.org), and bundled in many of the digital toolkit subscriptions (NICEIC online library, Elec-Mate platform). The GN3 is the standard interpretive reference for inspection-and-testing methods — alongside BS 7671 itself, it's the most-referenced book in the apprentice's kit.",
  },
  {
    question: "What's the IET Code of Practice 5th Edition and when did it change?",
    answer:
      "The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment 5th Edition was published in 2026 and replaces the 4th Edition (2012, with 2020 reprint). The 5th Edition introduces clearer risk-based test intervals, modernised the test classifications (replacing 'PAT testing' terminology with the more accurate 'in-service inspection and testing'), and aligned the test methods with BS 7671 A4:2026. For rectification work on portable / movable / fixed equipment, the 5th Edition is the current authoritative reference for test methods, pass criteria and record-keeping.",
  },
  {
    question: "How do I know if a manufacturer data sheet I've downloaded is current?",
    answer:
      "Manufacturer data sheets carry a publication date and a revision identifier in the footer or title block. For Schneider, Hager, MK, ABB, Eaton — the sheets are republished as products are revised. Always download from the manufacturer's official website (schneider-electric.co.uk, hager.com, mkelectric.com, etc.) rather than from a third-party site; the manufacturer site has the current revision. If the sheet is more than two years old, check the product page for a 'replaced by' note — older protective devices may have been superseded by newer models with different terminal torques or mounting configurations.",
  },
  {
    question: 'What if there are no as-built drawings for the installation?',
    answer:
      "Common situation, especially on small-commercial and older domestic. The apprentice's response is — (1) treat the absence as part of the rectification scope; (2) sketch the affected circuit's path before disturbance (cable routes, accessory positions, DB connection); (3) photograph the existing condition for the firm's job file; (4) update the customer's record with the sketch as a partial as-built. The sketch becomes the customer's record going forward and supports the next inspection. Some firms include as-built sketching in the standard rectification scope; others charge separately. Either way, the absence of drawings is a documentary opportunity, not a blocker.",
  },
  {
    question: 'Is BS 7671 mandatory or is it just guidance?',
    answer:
      "BS 7671 is a non-statutory standard — but it's the standard that the Electricity at Work Regulations 1989 (statutory) require to be met. Reg 4 of EAWR says systems shall be of such construction as to prevent danger; the practical interpretation is 'designed and constructed in accordance with BS 7671'. Departures from BS 7671 are permitted under EAWR but require justification (reg 134.1 of BS 7671 itself recognises departures and requires them to be recorded on the certificate). For an apprentice the working assumption is — BS 7671 is the design and construction standard, departures are exceptional and require supervisor authorisation.",
  },
  {
    question: 'How do I plan testing time into a rectification visit?',
    answer:
      "Verification testing under BS 7671 Part 6 is mandatory but takes time on a real circuit — continuity of CPC + ring (5–10 mins), IR (5 mins), polarity (built-in to other tests), R1+R2 (5 mins), Zs at the furthest point (5 mins), RCD trip-time at IΔn (2 mins). Total testing time on a domestic single circuit is 20–30 minutes. The apprentice plans this into the visit at the start — a 'two-hour rectification visit' is typically 30 minutes diagnosis confirmation, 30 minutes physical work, 20 minutes testing, 20 minutes documentation, 20 minutes contingency. Skipping the test time is the cause of the 'I forgot to test' mistake.",
  },
];

const checks2 = [
  {
    id: 'mod4-s3-sub2-flicker',
    question:
      "Customer reports 'lights flicker every time the fridge cycles on'. What's the engineering interpretation and the most likely fault?",
    options: [
      "The fridge motor's start-up inrush (6–10× running current) causes a brief voltage drop along a shared supply path. If that path has higher-than-design impedance — an HRJ at the tails or undersized cable — the drop is enough to dim the lights momentarily.",
      "The fridge is generating electrical noise that interferes with the lighting circuit through electromagnetic coupling — the compressor's switching pulses radiate onto the adjacent lighting cable. The fix is a mains filter on the fridge. EMI from a domestic fridge does not modulate filament or LED brightness; visible flicker on load cycling is a voltage-drop symptom on a shared supply path, not electromagnetic coupling.",
      "The lights and the fridge are on the same final circuit, so the fridge's running current reduces the current available to the lights. The fix is to move the lights to a separate circuit. Lighting and a fridge socket are not on a shared final circuit in a compliant install, and steady running current does not dim lights; the flicker is caused by the brief inrush voltage drop on the common supply.",
      "The flicker means the lighting circuit's RCD is on the edge of tripping each time the fridge starts, because the inrush adds earth leakage. The fix is a less sensitive RCD. Motor inrush is load current, not earth-leakage current, so it does not push an RCD toward its residual trip threshold; the flicker is a voltage-drop effect, and fitting a less sensitive RCD would be unsafe.",
    ],
    correctIndex: 0,
    explanation:
      "Flicker on a known load cycling is one of the diagnostic gold-standards — it tells you the fault is on the supply side of the lighting circuit (otherwise the load on a separate circuit wouldn't affect the lighting). The voltage drop magnitude scales with impedance times inrush current; an HRJ at the supply tails is the classic cause on older installations, undersized cable on newer ones. Diagnosis: clamp meter on the incoming tail during the fridge cycle reveals the drop magnitude; thermal imaging finds the HRJ.",
  },
  {
    id: 'mod4-s3-sub2-burning',
    question:
      "Customer reports 'smell of burning plastic, can't find the source'. What's the response?",
    options: [
      "Reassure the customer it's probably a new appliance burning off manufacturing residue and ask them to ventilate the room — most burning smells clear in a day or two. Burning-plastic odour from an electrical source signals charring at a heating joint, not a benign burn-off; advising the customer to wait and ventilate leaves a live fire risk in place.",
      'Tell the customer to switch off any recently-fitted LED downlights, since LED drivers commonly emit a faint smell when running hot, then leave and book a return visit for next week. A driver running merely warm does not smell of burning plastic; deferring an unlocated burning smell for a week ignores an active fire-risk window and breaches the duty to make safe.',
      'Use your nose to follow the smell to the strongest point, open only that one accessory, and if nothing is visibly damaged there, conclude the smell is coming from outside the property. Scent-tracking alone is unreliable and stopping at one accessory misses HRJs elsewhere on the circuit; an unlocated electrical burning smell must be treated as a Danger-Present hazard and investigated systematically.',
      'Treat as an immediate Code 1 hazard. A burning-plastic smell almost always means an HRJ already heating to char-point; isolate at the main switch and investigate the affected area systematically before leaving site.',
    ],
    correctIndex: 3,
    explanation:
      'Burning plastic smell is the alarm bell of HRJ progression. By the time the smell is noticeable, charring is happening — the fire-risk window is open. Steps: narrow the location (which floor, which area, when it started); isolate at the main switch if the source is unlocated; open every consumer unit, junction box and accessory in the affected area for visual inspection; use a thermal camera on enclosures during operation only with informed consent. HSE/fire investigators repeatedly find customers reported burning smells for days or weeks before the actual fire. Treating it as urgent is the expectation.',
  },
  {
    id: 'mod4-s3-sub2-interview',
    question:
      "What's the structured interview an apprentice should run with a customer reporting an unspecified electrical problem?",
    options: [
      "Skip the questions and go straight to testing — measurements are objective and the customer's account is unreliable, so the fastest route is a full Schedule of Test Results on every circuit. Blanket-testing every circuit without first narrowing the hypothesis wastes hours; the interview is what focuses the investigation, and the customer holds facts (timing, triggers, recent changes) no test can recover.",
      "Two questions are enough: 'What's wrong?' and 'How much do you want to spend?' — the rest you work out with the meter. A two-question intake misses the when/where/what-changed detail that pins down intermittent faults; the structured interview is six questions precisely because vague complaints need systematic extraction.",
      "Ask the customer to write a full technical description of the fault including suspected circuit and probable cause before you arrive, so you can pre-order parts. Customers rarely describe faults in accurate engineering terms, and pre-diagnosing from a layperson's written guess leads to wrong parts and wrong hypotheses; the on-site structured interview is the reliable method.",
      "Six questions in order: WHAT exactly happens, WHEN, WHERE in the property, HOW LONG it's been happening, WHAT they've tried, and WHAT CHANGED recently. The answers narrow the fault hypothesis from infinity to a small set.",
    ],
    correctIndex: 3,
    explanation:
      "The structured customer interview is the single most under-used fault-diagnosis tool. The six questions — what, when (time/day/season/weather/activity), where, how long (and trending), what tried, what changed — extract the diagnostic detail that lives in the customer's head. Most apprentices skip it; the senior who built the habit saves an hour per call-out by spending five minutes on it, instead of chasing the wrong fault hypothesis.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      "Customer reports 'breaker keeps tripping when I plug in the kettle'. What's the differential diagnosis?",
    options: [
      "It's certainly an overloaded circuit — a 3 kW kettle alone exceeds a 13 A socket rating, so the breaker is doing its job and the only fix is a dedicated kettle circuit. A 3 kW kettle draws about 13 A, within a ring final's capacity; tripping on one specific kettle/socket points to a fault, not a simple overload, so jumping to 'add a circuit' skips the differential diagnosis.",
      'Three hypotheses to test in order: the kettle itself (swap kettle / swap circuit), the socket (IR test with the kettle disconnected), or genuine overload (clamp the existing circuit load before plugging in). The high inrush of a 3 kW kettle exposes any HRJ on the socket.',
      "It's a worn breaker — RCBOs weaken with age and trip below their rated current, so the fix is simply to swap the device for a new one of the same rating without further testing. Replacing the device without identifying why it trips ignores a likely real fault (leaky kettle element or HRJ at the socket); a tripping breaker is a symptom to diagnose, not just a part to replace.",
      "It's a polarity fault — the kettle reverses live and neutral when switched on, which the RCD detects as a residual current. Reversed polarity is a fixed wiring condition, not something a kettle switch creates, and it does not by itself cause RCD tripping; the realistic causes are an earth-leaking element, a socket fault or genuine overload.",
    ],
    correctAnswer: 1,
    explanation:
      "Differential diagnosis — listing the possibilities and testing each — is the method. Three hypotheses cover most cases (load fault, socket fault, circuit fault); the customer's other answers narrow which is most likely. Kettle inrush is high (9–13 A peak for a 3 kW kettle) and exposes any HRJ on the socket / cable run.",
  },
  {
    id: 2,
    question:
      "Customer reports 'the upstairs lights are dim, the downstairs lights are normal'. Engineering interpretation?",
    options: [
      "The upstairs bulbs are simply older or a lower wattage than the downstairs ones — replace them with matching new lamps and the difference disappears. Mismatched lamps cause a constant difference in brightness, but a 'dim circuit' reported as a fault is an electrical symptom (voltage drop), not a lamp-choice issue; swapping bulbs would not fix an HRJ or high-resistance neutral.",
      'The upstairs lighting is on a separate phase of a three-phase supply that is running at a lower voltage. Domestic dwellings are single-phase, and even on three-phase the lines sit at the same nominal voltage; localised dimming on one circuit points to added impedance on that circuit, not a phase difference.',
      'Voltage drop on the upstairs lighting circuit, or a problem at its tap-off — typically an HRJ at a junction box, a loose RCBO terminal, or a high-resistance neutral upstream of the upstairs lights. Measure voltage at an upstairs lampholder under load and trace upstream.',
      'The dimmer switch serving the upstairs lights has failed to its minimum setting; replacing the dimmer restores full brightness. This only applies if those lights are actually on a dimmer and all of them dim together by chance; a whole-circuit dim with no dimmer involved is a supply-side voltage-drop fault to be traced upstream.',
    ],
    correctAnswer: 2,
    explanation:
      'Localised dim lighting is voltage drop on the affected circuit. The differential narrows quickly: if downstairs is fine, the issue is upstream of the upstairs tap-off but downstream of the supply common point. A few targeted voltage measurements pinpoint the HRJ location.',
  },
  {
    id: 3,
    question:
      "Customer reports 'fire alarm panel showing 'EARTH FAULT' on the LCD'. What does this mean and what's the action?",
    options: [
      "An EARTH FAULT on the panel means the mains earth to the panel has been lost, so the panel is running on battery only and must be left to discharge until an engineer attends. Loss of mains earth shows as a separate supply/PSU fault; the panel's EARTH FAULT indication specifically flags a conductor-to-earth leak on the monitored detection or sounder wiring, and leaving it to discharge is wrong.",
      'An EARTH FAULT indication is a routine status message that clears itself once the panel completes its daily self-test — no action is needed beyond noting it in the log. An earth fault is a genuine wiring fault that does not self-clear; it must be investigated and rectified, and recorded under the fire log and RR(FS)O 2005.',
      'An EARTH FAULT means a detector head has been removed for cleaning and the panel has lost the device on that address; refitting the head clears it. A missing device registers as a device/fault-on-address condition, not an earth fault; an earth fault is a low-resistance path from a system conductor to earth, typically water ingress or a damaged cable.',
      'Fire alarm panels under BS 5839-1 monitor for a connection (typically high-resistance) between a system conductor and earth — water ingress at a detector/sounder, damaged cable or a contaminated terminal. It compromises reliable operation and may mask other faults, so it must be documented, investigated and rectified.',
    ],
    correctAnswer: 3,
    explanation:
      "Fire alarm earth faults are a regulated category — BS 5839-1 + RR(FS)O 2005 require documented investigation and rectification within defined timescales. The action sequence: record on the fire log book, isolate the affected zone at the panel, IR test each loop/circuit on that zone, find and rectify, retest and restore, then inform the responsible person. The apprentice does the investigation under supervision (a specialist fire-alarm engineer typically leads); the apprentice's role is correct fault identification + documentation.",
  },
  {
    id: 4,
    question:
      "Customer reports 'the socket in the bathroom feels warm, even when nothing's plugged in'. What does this tell you?",
    options: [
      'The socket has an active heat source — current is flowing through it even with nothing plugged in. The usual cause is an HRJ at a terminal carrying transit current for the rest of the ring. Isolate, prove dead, IR test the socket, and replace it or trace upstream if the socket itself reads sound.',
      "It's residual heat from the bathroom — warm air, towel rails and the immersion cupboard raise the ambient temperature, so the socket only feels warm to the touch. Ambient warmth heats the whole wall evenly; a single socket noticeably warmer than its surroundings with no load is a sign of internal current and heating, which must be investigated.",
      'Nothing to worry about — all sockets run slightly warm because the spring contacts that grip a plug generate friction heat continuously. With no plug inserted there is no contact friction and no current, so a warm socket is abnormal and points to an internal HRJ or leakage path carrying transit current on the ring.',
      "It means the socket's built-in RCD has tripped and is dissipating heat as it holds the circuit open. Standard sockets don't contain an RCD, and a tripped device would not heat up; a socket warm with no load indicates current flowing through an internal fault, not a protective device holding open.",
    ],
    correctAnswer: 0,
    explanation:
      "A socket warm to touch with no load plugged in means current is flowing inside the socket. On a ring final, the socket carries transit current for downstream loads — an HRJ at one terminal heats up under that transit load. Bathroom moisture can accelerate the problem but isn't usually the root cause; the HRJ is.",
  },
  {
    id: 5,
    question:
      "Customer reports 'every Tuesday morning around 7am the broadband router restarts'. How do you investigate?",
    options: [
      "Tell the customer it's almost certainly their broadband provider's scheduled maintenance window and to raise it with their ISP — electrical faults don't follow a weekly clock. A genuinely weekly, time-locked electrical event points to something on the installation switching on at that time; dismissing it as an ISP issue without investigating misses a real marginal-supply fault.",
      'Time-correlated faults are caused by something that switches on at that time. Check the household schedule (heating/immersion timer, washing cycle) and any external supply event, then log it with a power-quality analyser. The router restart is a symptom of a brief voltage dip from whatever switches on then.',
      "Replace the router's plug-top power supply — a restart on a fixed schedule is a failing PSU that browns out as it warms up. A failing PSU would restart on its own internal pattern, not reliably at the same time and day each week; the weekly timing strongly implicates an external switching event, which testing should confirm before replacing the router's PSU.",
      "It's a thermal effect — the loft warms up on Tuesday mornings when the sun comes round, expanding the cable and breaking an HRJ. Solar warming is gradual and not locked to a specific weekday; a precise weekly time signature points to a scheduled load switching on, best captured with a power-quality logger over the week.",
    ],
    correctAnswer: 1,
    explanation:
      "Time-correlated faults are the easiest intermittents to diagnose because the time is the clue. The 'router restarts' symptom is consumer-grade (modern routers reboot on transient under-voltage); the cause is something else operating at the same time. The PQ analyser captures the moment; correlation with household schedule identifies the source.",
  },
  {
    id: 6,
    question:
      "Customer reports 'half the house has no power, the other half is fine'. What does this tell you about the fault location?",
    options: [
      'Half the circuits being dead means an open neutral in the final circuit wiring of those rooms — find the broken neutral in the affected accessories and re-terminate it. A single broken final-circuit neutral kills one circuit, not a whole half of the board; loss of a block of circuits points to a shared upstream device or busbar section, which is where to trace.',
      "It indicates reversed polarity across half the installation, which has disabled those circuits' protective devices. Reversed polarity does not switch circuits off and is not what 'half the house is dead' means; the symptom maps to a failed upstream split point such as one RCD, its busbar, or a sub-main.",
      'The fault is at a point that splits the supply — typically a consumer unit busbar section, one RCD/RCBO, or a sub-main feeding the dead portion. Map the boundary between dead and live circuits and trace upstream; the fault sits where dead becomes live.',
      "It means the prospective fault current has exceeded the board's rating and tripped the main switch on half the busbar. Boards don't selectively de-energise half the busbar on a fault-current basis; a dead block of circuits is a localised supply-split failure (RCD, busbar section or sub-main), traced from the boundary between dead and live.",
    ],
    correctAnswer: 2,
    explanation:
      'Localised power loss reveals the fault location by the boundary it creates. The boundary tells you which protective device or distribution point has failed. Standard method: map the dead zone, trace upstream, find the point where supply is restored, the fault is at that boundary point.',
  },
  {
    id: 7,
    question:
      "Customer reports 'when I turn on the shower, the lights upstairs flicker briefly then settle'. What's the engineering interpretation?",
    options: [
      'The shower and the lights share a neutral that has been borrowed between circuits, so switching the shower forces current down the lighting neutral and the lamps glow brighter, not dimmer. A borrowed neutral is a real and serious fault, but it typically makes lights brighten or behave erratically rather than dim-then-settle on inrush; the described symptom is a classic inrush voltage-drop pattern.',
      "The shower's RCD is sharing a busbar with the lighting RCD and the inrush briefly pulls the lighting RCD toward its trip point, dimming the lamps. Inrush is load current, not residual current, so it does not drive an RCD toward tripping; the dimming is a voltage-drop effect on a shared supply path.",
      'The shower element is partially failed and arcing on start-up, injecting harmonics that distort the lighting supply for a moment. An arcing element would more likely trip the RCD or blow the circuit, and would not produce a clean dim-then-settle; the symptom matches normal-to-marginal inrush voltage drop, assessed against the Appendix 4 limits.',
      'Inrush from the shower heater (35–50 A for an 8.5 kW shower) causes a brief voltage drop on the shared supply path, dimming the lighting branch until the heater reaches steady state. Whether it matters depends on the size of the drop.',
    ],
    correctAnswer: 3,
    explanation:
      "Brief flicker on high-load inrush is sometimes normal (small voltage drop) and sometimes a symptom (large voltage drop). If the drop is significant (>5% of nominal) it suggests high impedance — a shared neutral, undersized supply tail or HRJ at the CU; if small (<2%) it's normal. Diagnose with a clamp meter on the supply tail during shower start plus a voltage measurement at the upstairs lighting, compared against BS 7671 Appendix 4 limits (3% lighting, 5% other).",
  },
  {
    id: 8,
    question:
      "Customer reports 'the RCD trips when it rains heavily but not when it's dry'. What's the most likely fault?",
    options: [
      "Water ingress at an outdoor accessory. Rain creates a leakage path between live and earth; once total leakage exceeds 30 mA the RCD trips. With the customer's permission, simulate rain with a garden hose on each outdoor accessory in turn — the one that triggers the trip is the leak point.",
      'Lightning during the storm is inducing surges that trip the RCD; the fix is to fit a surge protection device at the consumer unit. SPDs clamp transient over-voltages, not residual current, and would not stop weather-driven nuisance tripping; the rain correlation points to moisture creating an earth-leakage path at an outdoor accessory.',
      "Rain cools the consumer unit and the temperature drop shifts the RCD's trip threshold below its rated 30 mA, so it nuisance-trips. RCD trip thresholds are not meaningfully shifted by mild ambient cooling, and the CU is indoors; the real mechanism is water bridging live and earth at an outdoor fitting, raising leakage past 30 mA.",
      'Heavy rain raises the damp in the masonry around the meter tails, increasing the earth resistance until the RCD detects the imbalance and trips. Damp masonry around tails does not create the residual imbalance an RCD responds to; the fault is a moisture-driven leakage path inside an outdoor accessory, located by simulating rain on each one.',
    ],
    correctAnswer: 0,
    explanation:
      "Weather-correlated faults are caused by environmental conditions affecting the installation. Rain triggers earth-leakage on damaged outdoor accessories. The investigation pattern is — when does it happen, what's different at that time, simulate the condition to reproduce and locate. A garden hose simulation is a legitimate diagnostic technique on outdoor accessories.",
  },
];

const faqs2 = [
  {
    question: "How do I tell when a customer's symptom description is unreliable?",
    answer:
      "When the timeline is vague ('it's been a while'), the description is technical-sounding but inconsistent ('the polarity reversed itself'), or there's a clear emotional bias ('the previous electrician put it in wrong'). Treat all customer descriptions as starting hypotheses, not facts. Verify with measurement. Customers describe symptoms accurately about 70% of the time; the other 30% they misremember, exaggerate, or mis-attribute. The structured interview pulls out the verifiable facts — when, what, how often — that you can test against.",
  },
  {
    question: 'Should I trust customer descriptions of intermittent faults?',
    answer:
      "Yes, for the timing pattern. Customers are usually correct about WHEN something happened ('every morning', 'after the storm', 'when I run the washing machine') even if they're wrong about what happened. Time-pattern is gold for diagnosing intermittents — it gives you the trigger to investigate. Use a power quality analyser to capture the actual electrical conditions at the reported time; correlate with the customer's schedule.",
  },
  {
    question: "What should I do if the customer can't reproduce the fault while I'm there?",
    answer:
      "Document the customer's description on the job sheet, run a baseline test of the affected circuits (continuity, IR, EFLI), look for evidence of past faults (scorched terminals, signs of arcing, replaced fuses), recommend either a return visit when the symptom recurs OR installation of a power-quality analyser to log conditions over a week. Don't pretend to find a fault that isn't there; don't dismiss the customer's report. Most intermittent faults need data over time to characterise.",
  },
  {
    question: 'How do I deal with customers who describe symptoms in panic / dramatic terms?',
    answer:
      "Calm, structured interview. 'Tell me exactly what happened — start from the beginning'. Let them tell the full story without interruption first. Then go back through with structured questions — what exactly, when, how often. Acknowledge their concern without dismissing or amplifying. The factual content is usually within the dramatic narrative; you extract it through patient listening + targeted follow-up.",
  },
  {
    question: "What's the most common 'symptom' that turns out to NOT be an electrical fault?",
    answer:
      "'The lights flicker' — about half the time it's actually an LED driver / lamp incompatibility (cheap LED bulb in a dimmable fitting, dimmer not rated for LEDs, mismatched bulbs in the same fitting) rather than a wiring fault. Standard diagnostic: substitute known-good lamps; if flicker stops, it's the original lamp / driver. Other common false alarms: 'the breaker keeps tripping' (sometimes user has an overloaded extension lead pattern, not a circuit fault); 'the socket isn't working' (sometimes a tripped GFCI on a different floor that the customer doesn't know about).",
  },
  {
    question: 'How do I document my customer interview for the job sheet?',
    answer:
      "Standard fault-diagnosis job sheet template includes a 'Symptoms' section: customer's words (in quotes), timeline, conditions, what they've tried. A 'Diagnosis' section: tests run, findings, identified fault category and location. A 'Rectification' section: action taken. A 'Verification' section: post-repair tests. The interview goes in 'Symptoms'; the test results in 'Diagnosis'. The structured format protects the customer (clear record of what was reported and done) and the firm (defensible record if disputed).",
  },
];

export default function Lesson318E_2_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Reading the as-built drawings, the EICR / Schedule of Test Results, the manufacturer data
        sheets, IET Guidance Note 3 and IET Code of Practice 5th Edition BEFORE the van leaves the
        depot — so the rectification visit arrives with the right parts, the right method, and the
        right tests planned.
      </p>

      <TLDR
        points={[
          'Drawings are a starting hypothesis, not truth — verify the as-built revision against the actual installation before relying on it.',
          'Manufacturer data sheets give terminal torque, connection diagram, type-class and AFDD compatibility — read them before fitting the new device.',
          'IET Guidance Note 3 is the current interpretive reference for BS 7671 Part 6 testing methods and result interpretation.',
          'IET Code of Practice 5th Edition (2026) governs in-service inspection and testing of equipment — relevant to equipment-side rectification.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Interpret as-designed and as-built drawings, including title-block revision currency, before relying on them for rectification work.',
          'Cross-reference the original Schedule of Test Results from the EIC / EICR with post-rectification readings to confirm the work has not added unexpected resistance.',
          'Locate and apply manufacturer data sheets for protective devices, accessories and equipment — terminal torque, connection diagram, type-class.',
          'Apply IET Guidance Note 3 (current edition) to inspection-and-testing method and result interpretation.',
          'Apply IET Code of Practice 5th Edition (2026) to in-service inspection and testing of equipment encountered in rectification work.',
          'Plan parts, time, testing and documentation for a rectification visit before van loading — the 5-step parts routine and the 6-reference information kit.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Drawings, schedules and the as-built reality</ContentEyebrow>

      <ConceptBlock
        title="Drawings are a starting hypothesis, not the truth"
        plainEnglish="Every drawing has a title block in the corner with the revision letter, the date, and the signatures of the people who drew, checked and approved it. The apprentice's first move on a rectification visit with drawings is to check those signatures against the actual installation — not to trust the drawing because it's printed."
        onSite="Most small-commercial drawings are 5–15 years out of date relative to the installation. Additions, alterations, accessory replacements happen between revisions. The verification routine is — pick three random circuits from the schedule, walk them at the DB and at the load end, confirm they match what's drawn. If they don't, the drawing is hypothesis only and the rectification has to rely on what's physically installed."
      >
        <p>The two drawing types you meet most often:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>As-designed</strong> — issued by the designer before construction. Shows
            intent. Typically NOT updated to reflect what was actually built.
          </li>
          <li>
            <strong>As-built</strong> — issued at handover, updated to reflect the actual
            installation. The drawing you want for rectification.
          </li>
          <li>
            <strong>Schedule of Test Results</strong> from the original EIC — the baseline
            electrical readings (R1+R2, IR, Zs, RCD trip-time) for each circuit. Compare your
            post-rectification readings against this.
          </li>
          <li>
            <strong>Schedule of Inspections</strong> — the visual inspection record from the
            original EIC. Tells you what was visually verified at handover.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 134.1.1"
        clause={
          <>
            "Good workmanship by one or more skilled or instructed persons and proper materials
            shall be used in the erection of the electrical installation. The installation of
            electrical equipment shall take account of manufacturers' instructions."
          </>
        }
        meaning={
          <>
            Reg 134.1.1 is the umbrella workmanship regulation. It applies to design, erection,
            alteration AND repair &mdash; including rectification. Two practical implications. (1)
            The work must be carried out by skilled or instructed persons (an apprentice
            qualifies as 'instructed' under appropriate supervision; a fully-qualified electrician
            qualifies as 'skilled'). (2) Manufacturer's instructions must be followed — that's the
            data sheet, the installation guide, the torque specification. Rectification work that
            ignores the manufacturer's data is a Reg 134.1.1 breach.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 134.1.1 — IET Wiring Regulations 18th Edition Amendment 4."
      />

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <VideoCard {...videos.safeIsolation} topic="JIB safe isolation — where to test" />

      <SectionRule />

      <ContentEyebrow>Manufacturer data sheets and product literature</ContentEyebrow>

      <ConceptBlock
        title="The data sheet is the design authority for the device"
        onSite="Hager NDN132B 32 A RCBO data sheet says terminal torque 2.5 Nm. Schneider iC60N RCBO says 2.0–3.0 Nm. MK Logic Plus K2747 13 A socket says 0.8 Nm on the rear screw terminals. Each device has its own number; using the wrong torque (under-torqued = high-resistance heat failure; over-torqued = damaged terminal or stripped thread) is the cause of return faults within months. The apprentice carries a torque screwdriver (Wera 7440 Series, Wiha TorqueVario or Felo 100) and looks up the torque before tightening."
      >
        <p>What a typical data sheet contains:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Terminal torque</strong> — the manufacturer-specified screw torque for the
            terminations.
          </li>
          <li>
            <strong>Connection diagram</strong> — which terminal is L, N, load, supply.
          </li>
          <li>
            <strong>Electrical rating</strong> — In, breaking capacity (kA), I&Delta;n for RCDs,
            AFDD compatibility flag.
          </li>
          <li>
            <strong>Mechanical rating</strong> — DIN-rail width (1 module = 17.5 mm typical),
            depth, mounting orientation requirements.
          </li>
          <li>
            <strong>Ambient temperature derating</strong> — In is rated at 30 &deg;C ambient;
            derating curve for higher temperatures (typically 10&ndash;15% reduction at 50
            &deg;C).
          </li>
          <li>
            <strong>Type-compatibility</strong> — which earlier model this device replaces in the
            same range.
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

      <ContentEyebrow>IET Guidance Note 3 + Code of Practice 5th Edition</ContentEyebrow>

      <ConceptBlock
        title="The IET interpretive references that bridge BS 7671 to the site test"
        plainEnglish="BS 7671 says 'verify by measurement'; GN3 says 'here's how to do the measurement and how to interpret the result'. The IET Code of Practice 5th Edition does the same for in-service equipment testing. Both are non-statutory but both are the industry-accepted method, and competence-scheme audits expect to see them on the contractor's bookshelf or laptop."
        onSite="GN3 examples — the temperature correction factor for Zs measurement (multiply measured Zs by ~1.20 to account for cable warming to operating temperature); the rule of thumb that measured Zs should be less than 0.8 of the BS 7671 maximum to allow for the correction; the test sequence for ring final continuity (R1+R2 = ⅛ of the loop). All of these are GN3 content, not BS 7671 content."
      >
        <p>What each reference adds to the rectification visit:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>BS 7671 itself</strong> — the regulation. What must be done.
          </li>
          <li>
            <strong>IET Guidance Note 3</strong> — the practical method. How to do the inspection
            and testing.
          </li>
          <li>
            <strong>IET Code of Practice 5th Edition (2026)</strong> — in-service equipment
            testing. Test method, pass criteria, record-keeping for portable / movable / fixed
            equipment.
          </li>
          <li>
            <strong>HSE GS38</strong> — proving-dead instrument selection and use.
          </li>
          <li>
            <strong>Manufacturer data sheets</strong> — device-specific torque, connection
            diagram, derating.
          </li>
          <li>
            <strong>Site as-built drawings + EIC Schedule of Test Results</strong> — site-specific
            baseline.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="HSE GS38 — Electrical test equipment for use by electricians (4th Edition)"
        clause={
          <>
            "Test probes and leads should incorporate the following features — finger barriers or
            are shaped to guard against inadvertent hand contact with the live conductors under
            test; insulated except for the tip with a maximum of 4 mm of exposed metal at the tip
            (and ideally less); fused at less than 500 mA where appropriate; high-impedance to
            allow for safe testing of dead conductors."
          </>
        }
        meaning={
          <>
            GS38 is the HSE guidance for electrical test instruments. Two-pole testers (Martindale
            VI-13800, Fluke T130, Kewtech KT1780) are designed to GS38; multimeter probes
            typically are not. The apprentice carries a GS38-compliant two-pole tester for
            proving dead and a multimeter for measurement; the two are not interchangeable.
            Rectification work uses both &mdash; the two-pole to confirm isolation before
            touching, the multimeter to measure voltages once the work is in progress.
          </>
        }
        cite="Source: HSE GS38 (4th Edition) — Electrical test equipment for use by electricians."
      />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Spares, tools and the morning kit-check</ContentEyebrow>

      <ConceptBlock
        title="What goes in the van before you set off"
        plainEnglish="The fault-correction visit doesn’t survive a missing 4 mm² conductor or a flat MFT battery. The morning kit-check is short, structured and saves the second visit."
        onSite="Van layout matters: instruments in a foam-cut case (Fluke / Megger / Kewtech all sell branded), spares in labelled bins (Raaco / Stanley sortmaster), consumables in an open caddy. A kit that’s organised gets checked properly; a chaotic van gets a half-check and a returned-for-parts visit."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Test instruments</strong> &mdash; MFT (charged + within calibration), two-pole
            tester, proving unit, clamp meter, multimeter. Calibration stickers in date.
          </li>
          <li>
            <strong>PPE</strong> &mdash; Class 0 gloves (in date, no nicks), insulated tools,
            arc-flash shield, safety glasses, sturdy boots.
          </li>
          <li>
            <strong>Common spares</strong> &mdash; matched-brand 6&nbsp;A / 16&nbsp;A / 32&nbsp;A
            B-curve RCBOs, 13&nbsp;A sockets, 5&nbsp;A switches, sleeving, Wago 221, T+E offcuts.
          </li>
          <li>
            <strong>Lock-off</strong> &mdash; padlock with unique key, hasp, multilock, tags,
            signage.
          </li>
          <li>
            <strong>Consumables</strong> &mdash; plasterboard patch material if make-good is in
            scope, fire-stop cartridge, intumescent putty, cable clips, P-clips, glands.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Pre-visit briefing and customer expectations</ContentEyebrow>

      <ConceptBlock
        title="Five minutes on the phone before you arrive"
        plainEnglish="The preparation visit starts before you’re on site. A short pre-visit call sets expectations, identifies access constraints, surfaces vulnerable occupants and avoids the “we didn’t know you were coming today” conversation."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Confirm appointment</strong> &mdash; date, arrival window, expected duration.
          </li>
          <li>
            <strong>Access</strong> &mdash; who&apos;ll be there, where to park, alarm code or
            key-safe arrangement.
          </li>
          <li>
            <strong>Power-down implications</strong> &mdash; freezers, IT, medication fridges,
            alarms; agree timing and any temporary arrangements.
          </li>
          <li>
            <strong>Vulnerable occupants</strong> &mdash; elderly residents, young children,
            anyone on home oxygen or medical equipment that depends on mains.
          </li>
          <li>
            <strong>Scope and cost</strong> &mdash; what you intend to do today, the call-out fee,
            the basis for any additional cost if scope grows.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Risk assessment and method statement — RAMS as standard discipline"
        plainEnglish="A formal risk assessment and method statement (RAMS) accompanies any non-trivial rectification visit. The risk assessment lists the hazards (electrical, working at height, lone working, confined space, asbestos exposure, customer-vulnerability), evaluates likelihood and severity, and lists the controls. The method statement walks the work step-by-step. RAMS may be a single-page form for a small domestic visit and a multi-page document for a commercial fit-out — the discipline is the same."
        onSite="Most firms have a template RAMS that is customised at the start of each visit. The apprentice fills in the visit-specific items: address, hazards on the day, occupant vulnerability, isolation strategy, escape route, emergency contact. The customer or building manager signs the RAMS at the start of the visit; a copy stays in the customer file. RAMS is not paperwork for the sake of it — it forces the apprentice to think through the visit before lifting a tool, and it satisfies the firm's CDM and Health and Safety at Work obligations."
      >
        <p>Standard RAMS items for a typical rectification visit:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Electrical hazards</strong> — live working risk, identification of supply,
            isolation strategy, prove dead before touching.
          </li>
          <li>
            <strong>Working at height</strong> — ladder, hop-up, MEWP, edge protection; PPE for
            the height worked.
          </li>
          <li>
            <strong>Asbestos</strong> — pre-2000 properties carry asbestos risk; refer to the
            survey if available, do not drill or break ceilings without it.
          </li>
          <li>
            <strong>Lone working</strong> — buddy check, lone-worker app, emergency contact,
            agreed check-in interval.
          </li>
          <li>
            <strong>Customer vulnerability</strong> — elderly, young children, medical equipment,
            pets; agreed power-down strategy that minimises disruption.
          </li>
          <li>
            <strong>Confined space</strong> — loft, cellar, riser duct; ventilation, lighting,
            emergency egress.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Tool calibration and PPE check — the boring discipline that prevents the visit going sideways"
        plainEnglish="Multifunction testers (MFT), insulation testers, loop testers and clamp meters all need annual calibration. PPE — gloves, mats, voltage indicators, lock-off kits — needs visual inspection on every visit and replacement when damaged. The apprentice's pre-visit check is a 30-second routine that prevents the awkward 'my MFT is out of calibration' conversation when the customer asks for the certificate."
        onSite="Calibration sticker on the MFT shows the current calibration date and the next due date. Standard practice is annual calibration (12 months); some high-use kits go six-monthly. Calibration certificate lives in the firm's calibration register; copies attached to the certificate where customers request evidence. PPE — voltage indicator (Martindale or Drummond) self-tests at every use; rubber gloves visually checked for cuts; lock-off kit tags and padlocks present and labelled. Replace anything compromised before leaving the depot."
      >
        <p>Pre-visit kit check items:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>MFT calibration sticker</strong> — date and due date visible, certificate
            available on request.
          </li>
          <li>
            <strong>Voltage indicator</strong> — self-test on every use; replaced when battery low
            or display fails.
          </li>
          <li>
            <strong>Lock-off kit</strong> — padlock, hasp, MCB lock, tag, marker pen; tags are
            firm-branded with apprentice contact.
          </li>
          <li>
            <strong>Insulation gloves and mat</strong> — visual check before live-work or testing.
          </li>
          <li>
            <strong>Test leads</strong> — GS38 compliant, fused tips, finger barriers, no exposed
            conductor at the connector.
          </li>
          <li>
            <strong>First aid kit and fire extinguisher</strong> — in date, accessible in the van.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Customer communication record — the audit trail that protects everyone"
        plainEnglish="Every customer conversation about scope, cost, options or risk should leave a written trace. Phone calls get a brief note; emails are the default for substantive items; texts and WhatsApp are increasingly common but should be backed up to the firm's CRM. The audit trail protects both parties — the customer can prove what was agreed, and the firm can prove what was authorised. Disputes that go to mediation or court hinge on the documentary record more than on memory."
        onSite="At the end of every customer interaction, capture the key points in the firm's CRM or job system. 'Customer agreed to option B at £450; reschedule for next Tuesday morning; customer to ensure access to the cellar.' The note takes 30 seconds and lives forever. Email confirmation of any quote, any change of scope, any cost decision — even a one-line confirmation. Customers appreciate the professionalism; the firm gains the protection."
      >
        <p>Customer-record items worth capturing in writing:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Initial brief</strong> — what the customer reported, date, contact details.
          </li>
          <li>
            <strong>Survey or quote</strong> — what was found, options presented, prices given,
            customer choice.
          </li>
          <li>
            <strong>Scope change during work</strong> — anything that expands or contracts the
            original scope, customer agreement date and amount.
          </li>
          <li>
            <strong>Customer-declined recommendations</strong> — written advisory with the
            customer's signed acknowledgement.
          </li>
          <li>
            <strong>Aftercare commitments</strong> — return visit dates, warranty terms,
            manufacturer registrations.
          </li>
          <li>
            <strong>Complaint or dispute correspondence</strong> — every item routed through the
            firm's complaints process and logged.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations) and Regulation 513.1 (accessibility)"
        clause={
          <>
            "No addition or alteration, temporary or permanent, shall be made to an existing
            installation, unless it has been ascertained that the rating and the condition of any
            existing equipment, including that of the distributor, will be adequate for the
            altered circumstances. Furthermore, the earthing and bonding arrangements, if
            necessary for the protective measure applied for the safety of the addition or
            alteration, shall be adequate."
          </>
        }
        meaning={
          <>
            Preparation includes confirming the working space is actually workable. If the
            consumer unit is buried behind boxed-in pipework or a kitchen unit, the access has to
            be sorted before testing starts &mdash; not as an unplanned escalation halfway
            through. Reg 132.16 binds the duty to ascertain rating and condition before any
            alteration; Reg 513.1 backs it up with the accessibility requirement on every
            accessory and item of equipment.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 (verbatim) and Regulation 513.1."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Trusting an outdated drawing"
        whatHappens={
          <>
            Apprentice arrives at a small-commercial unit to rectify a 32&nbsp;A RCBO that's been
            tripping on the lighting circuit. The customer hands over a drawing pack &mdash; the
            drawing shows the circuit feeds two light fittings in the warehouse. Apprentice
            isolates the breaker, confirms dead at the two warehouse fittings, starts work. Half
            an hour later the cleaner reports the office downlights have stopped working &mdash;
            the actual circuit feeds office lights too. The drawing was as-designed from 2018; an
            addition was made in 2021 that put the office lights on the same breaker. The drawing
            was a starting hypothesis the apprentice treated as truth.
          </>
        }
        doInstead={
          <>
            Verify the drawing against the installation before relying on it. Walk the circuit
            from the DB &mdash; switch the breaker on and off, confirm what goes off, list every
            accessory affected. The five-minute walk-through catches additions and modifications
            the drawing missed.
          </>
        }
      />

      <CommonMistake
        title="Fitting a new RCBO without checking the data sheet for terminal torque"
        whatHappens={
          <>
            Apprentice replaces a failed Hager NDN132B 32&nbsp;A RCBO. Tightens the terminations
            by feel. Three months later the customer reports the new RCBO is tripping under kettle
            load. Investigation finds the line termination has heated and the conductor has
            darkened &mdash; classic under-torque heat failure. The Hager data sheet specifies
            2.5&nbsp;Nm; the apprentice's by-feel torque was probably under 1.5&nbsp;Nm. The fix
            is a re-termination; the cost is a comeback visit and the firm's reputation.
          </>
        }
        doInstead={
          <>
            Look up the torque from the data sheet (5 seconds on the phone). Use a torque
            screwdriver (Wera 7440, Wiha TorqueVario, Felo 100). Set to the specified value.
            Tighten until the screwdriver clicks or slips. Done correctly, the connection lasts
            25&ndash;40 years; done by feel, the connection fails in months.
          </>
        }
      />

      <Scenario
        title="Planning a 32 A RCBO replacement on a small-commercial board"
        situation={
          <>
            The diagnosis report (from yesterday's visit) identifies a failed Hager NDN132B
            32&nbsp;A RCBO on a small-commercial 3-phase Hager board, single-phase circuit feeding
            a kitchenette ring. The customer is open from 09:00; you can be on site from 07:30
            with a 90-minute window before the kitchenette goes back into service.
          </>
        }
        whatToDo={
          <>
            THE NIGHT BEFORE: (1) Confirm parts &mdash; Hager NDN132B in stock at CEF Ardwick
            (open 07:00); reserve via the trade portal. (2) Download the Hager NDN132B data sheet
            to the laptop &mdash; terminal torque 2.5&nbsp;Nm, busbar engagement diagram, AFDD
            compatibility note (no AFDD on this model). (3) Pull the site's most recent EIC
            Schedule of Test Results from the firm's job system &mdash; baseline R1+R2
            0.45&nbsp;&Omega;, Zs 0.62&nbsp;&Omega;, RCD trip-time 18&nbsp;ms at 30&nbsp;mA. (4)
            Confirm the 5-step plan &mdash; isolate, replace, verify torque, retest, certificate.
            (5) Pre-load the MWC template with customer details. ON SITE 07:30: (1) Greet, brief
            the customer on the 90-minute window. (2) Isolate the affected RCBO + lock-off + prove
            dead at the kitchenette. (3) Remove the failed Hager NDN132B; fit the new one with
            torque screwdriver to 2.5&nbsp;Nm; verify busbar engagement clicks. (4) Energise;
            verify the kitchenette fires up; full Part 6 testing with the MFT1741 (R1+R2, IR,
            polarity, Zs, RCD trip-time). (5) Compare results against the EIC baseline &mdash; new
            readings within &plusmn;10% (R1+R2 0.47&nbsp;&Omega;, Zs 0.64&nbsp;&Omega;, RCD
            trip-time 19&nbsp;ms). (6) Issue the MWC + Schedule of Remedial Works on the laptop;
            email to the customer. (7) Hand back at 09:00 with the kitchenette in service.
          </>
        }
        whyItMatters={
          <>
            Planning is the step-up. Turning up with the part is the easy half. The other half is
            turning up with the part, the data sheet, the baseline test results, the MWC template
            pre-loaded, the supervisor's mobile number, and a written plan. The 90-minute window
            holds because the planning collapsed the on-site decision-making to almost zero.
            Without the planning, the same job is a 3-hour scramble with the customer asking why
            the kitchenette isn't ready at 09:00.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Drawings have title-block revisions — verify currency before trusting the drawing for rectification work.',
          'As-designed = intent; as-built = reality; rectification needs as-built (or a fresh sketch where missing).',
          'Manufacturer data sheets give terminal torque, connection diagram, type-class and AFDD compatibility — read before fitting.',
          "BS 7671 134.1.1 mandates good workmanship and adherence to manufacturer's instructions on every install / repair.",
          'BS 7671 526.1 governs every connection — right method, right material, right torque; the most-violated rectification regulation.',
          'IET Guidance Note 3 is the practical interpretive reference for BS 7671 Part 6 testing.',
          "IET Code of Practice 5th Edition (2026) governs in-service equipment testing — the modern replacement for 'PAT' guidance.",
          '5-step parts planning the night before saves the comeback visit; 6-reference information kit on the phone / laptop covers every on-site question.',
        ]}
      />

      <Quiz
        title="Preparation + interpreting information sources — knowledge check"
        questions={quizQuestions}
      />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Customer-language symptoms — flicker, trip, smell of burning, warm to touch, intermittent
        — translated into engineering categories and likely fault hypotheses. The structured
        customer interview that turns a vague complaint into a focused investigation.
      </p>

      <TLDR
        points={[
          'Customer symptoms are starting hypotheses, not facts. Structured interview (what / when / where / how long / what tried / what changed) extracts the verifiable details.',
          'Time-correlated faults are easiest to diagnose — the trigger time identifies the cause. Power quality analyser captures the electrical conditions at the reported moment.',
          'Burning plastic smell is always urgent — HRJ progressing to char point, fire-risk window open. Treat as Code 1.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Translate customer-language symptoms (flicker, trip, dim, warm, smell, intermittent) into engineering fault hypotheses.',
          'Conduct a structured customer interview using the six-question framework — what, when, where, how long, what tried, what changed.',
          'Recognise time-correlated, weather-correlated and load-correlated fault patterns and use the correlation to identify the cause.',
          "Treat 'smell of burning plastic' as a Code 1 immediate-hazard report and respond accordingly.",
          'Distinguish symptoms that are likely electrical faults from symptoms that are usually false alarms (LED flicker from cheap lamps, etc.).',
          'Document customer interviews in the standard fault-diagnosis job sheet format.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The structured customer interview</ContentEyebrow>

      <ConceptBlock
        title="Six questions that turn vague complaints into focused investigations"
        plainEnglish="The customer holds the diagnostic information in their head. The interview extracts it. Most apprentices skip this step and waste time chasing the wrong fault hypothesis. The senior who built the habit saves an hour per call-out."
      >
        <p>The six questions in order:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>WHAT exactly happens?</strong> In customer's own words. Don’t paraphrase or
            interpret yet.
          </li>
          <li>
            <strong>WHEN does it happen?</strong> Time of day, day of week, season, weather, after
            specific activity.
          </li>
          <li>
            <strong>WHERE in the property?</strong> Single room, multiple rooms, only when
            specific accessories used.
          </li>
          <li>
            <strong>HOW LONG has it been happening?</strong> First noticed when, getting worse /
            better / same.
          </li>
          <li>
            <strong>WHAT have you tried?</strong> Reset breakers, unplug appliances, switched off
            / on, called a previous electrician.
          </li>
          <li>
            <strong>WHAT CHANGED recently?</strong> New appliance, building work, leak, anything
            in the last weeks / months.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard
        {...videos.faultFinding}
        topic="Fault finding and how to describe a fault"
        caption={
          <>
            Craig Wiltshire walks through how to describe a fault for an NVQ assessment — the same
            structured language that turns a customer's vague symptom into an engineering
            hypothesis. Watch how the symptom (flicker, trip, smell) is named, then the hypothesis
            is stated, then the test is chosen.
          </>
        }
      />

      <RegsCallout
        source="IET Guidance Note 3 (Inspection and Testing) — fault diagnosis principles (paraphrased framework)"
        clause={
          <>
            Paraphrased framework summary: diagnosis of faults takes a systematic approach — start
            from the reported symptoms, work through inspection of the system, instrument
            verification, and only then formulate an action plan. Premature action without
            diagnosis risks harm to operative, customer and equipment.
          </>
        }
        meaning={
          <>
            The systematic approach starts with the symptom — the customer interview. Without the
            symptom information, the investigation has no anchor and is likely to chase the wrong
            hypothesis. The interview is the first step in the procedure, not an optional
            preamble.
          </>
        }
        cite="Source: IET Guidance Note 3 (Inspection and Testing) — fault diagnosis framework, paraphrased."
      />

      <InlineCheck {...checks2[2]} />

      <SectionRule />

      <ContentEyebrow>The common symptom catalogue</ContentEyebrow>

      <ConceptBlock
        title="Customer language vs engineering interpretation"
        onSite="Each common symptom maps to a small set of engineering hypotheses. The customer’s other answers (when, where, what changed) narrow which hypothesis is most likely."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>‘Lights flicker when X starts'</strong> — voltage drop on supply path during
            X's inrush; HRJ on supply tails or undersized supply cable.
          </li>
          <li>
            <strong>‘Smell of burning plastic'</strong> — HRJ at char point; fire-risk; immediate
            isolation + investigation.
          </li>
          <li>
            <strong>'Socket warm to touch (no load)'</strong> — HRJ at socket terminal carrying
            transit current on a ring; isolate, IR test, replace if poor.
          </li>
          <li>
            <strong>'Half the house has no power'</strong> — fault at boundary; trace upstream
            from boundary to find protective device / distribution point.
          </li>
          <li>
            <strong>'Breaker trips when I plug in X'</strong> — load fault, socket fault, or
            circuit fault; differential diagnosis on each.
          </li>
          <li>
            <strong>'RCD trips when it rains'</strong> — water ingress at outdoor accessory;
            simulate with hose to localise.
          </li>
          <li>
            <strong>'Lights dim only upstairs'</strong> — voltage drop on upstairs circuit; HRJ on
            tap-off or sub-main.
          </li>
          <li>
            <strong>'Fault every Tuesday at 7am'</strong> — time-correlated; identify what runs at
            that time; PQ analyser captures the moment.
          </li>
          <li>
            <strong>'Lights flicker constantly'</strong> — usually LED driver / lamp
            incompatibility; substitute known-good lamps first.
          </li>
          <li>
            <strong>'Tingles when I touch the tap'</strong> — open PEN or compromised main
            bonding; STOP, check N–E voltage at cut-out; possible DNO call.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks2[0]} />

      <SectionRule />

      <ContentEyebrow>Time-, weather- and load-correlated faults</ContentEyebrow>

      <ConceptBlock
        title="Correlation reveals causation"
        plainEnglish="Intermittent faults that correlate with time, weather or load have a trigger that's visible in the correlation. Use the correlation to find the trigger; the trigger leads to the cause."
      >
        <p>Three correlation patterns and their typical causes:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Time-correlated</strong> — domestic schedules (heating timer, immersion timer,
            washing cycle), neighbour activity (street lighting switch-on, industrial start-up),
            weather (overnight cooling causing condensation).
          </li>
          <li>
            <strong>Weather-correlated</strong> — water ingress (rain → outdoor leakage),
            temperature (hot day → cable derating, cold day → contraction at terminations), wind
            (cable swing on overhead supplies, structural movement at terminations).
          </li>
          <li>
            <strong>Load-correlated</strong> — specific appliance use (kettle, shower, oven, EV
            charger), total household load (overloaded ring, marginal supply), inrush current
            (motors, fluorescent ballasts, transformers starting).
          </li>
        </ul>
        <p>
          Investigation method: install a power quality analyser for a week, capture
          voltage / current / harmonic data continuously, correlate the captured electrical events
          with the customer's schedule and weather conditions. The correlation reveals the
          trigger; targeted investigation finds the cause.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks2[1]} />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 651.4"
        clause={
          <>
            "Details of any damage, deterioration, defects or dangerous conditions shall be
            recorded in a report."
          </>
        }
        meaning={
          <>
            Symptoms aren&apos;t just data for your diagnosis &mdash; they&apos;re reportable.
            Anything that points to damage, deterioration, defect or dangerous condition has to
            land on a report. The customer interview produces evidence, the report records it;
            both are part of the audit trail when something goes wrong later.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
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
            The structured symptom hunt sits inside the inspection step &mdash; visual evidence
            (scorch marks, discoloured terminals, soft cable insulation, water staining) before
            any meter goes on. The Regulation makes the order explicit: look first, test second.
            Most missed faults are the visible ones an apprentice rushed past.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 642.1."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Skipping the customer interview"
        whatHappens={
          <>
            Apprentice arrives at a ‘lights flickering' job, immediately starts testing the
            lighting circuits. Spends 90 minutes investigating, finds no fault on the lighting
            circuits. Customer mentions in passing 'oh, it only flickers when the heat pump turns
            on’. Apprentice realises they’ve been investigating the wrong circuit — the issue is
            on the supply tail to the heat pump, dropping voltage on every cycle. 90 minutes
            wasted; customer charged for time; customer dissatisfied.
          </>
        }
        doInstead={
          <>
            Always run the structured interview before opening any enclosure. Five minutes of
            interview saves thirty minutes of misdirected testing. The customer’s ‘oh by the
            way' details are usually the clue that points to the actual fault.
          </>
        }
      />

      <CommonMistake
        title="Treating burning plastic smell as a non-urgent investigation"
        whatHappens={
          <>
            Customer reports a faint burning smell in the meter cupboard. Apprentice books a
            return visit for next week (other jobs in the diary). Three days later the customer
            reports a fire in the meter cupboard — the HRJ that was creating the smell ignited the
            surrounding plastic. Property damage, displaced family, insurance dispute. The HSE /
            fire service investigation finds the firm had been notified of the smell and didn't
            act urgently.
          </>
        }
        doInstead={
          <>
            Burning plastic smell is always immediate. Reschedule lower-priority jobs if needed;
            isolate at the main switch on arrival to remove the heat source; investigate, find,
            rectify before leaving site. The ‘we’ll come back' approach is wrong for any
            fire-risk symptom.
          </>
        }
      />

      <Scenario
        title="Diagnosing 'the lights have been weird for months'"
        situation={
          <>
            Customer is vague — 'the lights have been a bit weird for months, sometimes they
            flicker, sometimes they’re dim, my husband says it’s nothing but I’m worried’.
            They don’t know which lights, when, or what triggers it.
          </>
        }
        whatToDo={
          <>
            Run the structured interview methodically. (1) WHAT — ‘tell me about the most recent
            time you noticed it; what exactly happened?' (Customer recalls: dimming in the kitchen
            yesterday evening). (2) WHEN — 'what time, what was happening?' (7pm, kettle was
            boiling). (3) WHERE — 'just the kitchen, or other rooms?' (Mostly kitchen, sometimes
            hallway). (4) HOW LONG — 'when did you first notice?' (Six months ago, after they had
            the kitchen extension built). (5) WHAT TRIED — 'have you tried anything?' (Replaced
            the bulbs, didn't help). (6) WHAT CHANGED — ‘kitchen extension built' answers it.
            Investigation focuses on the kitchen extension’s wiring — likely an HRJ at the
            junction where the new wiring meets the existing circuit, exposed under high-current
            loads (kettle inrush). Thermal imaging at the kitchen junction box during a controlled
            kettle test confirms the hotspot. Open box, find loose terminal, re-terminate, retest,
            fault corrected.
          </>
        }
        whyItMatters={
          <>
            The customer’s vague initial description hid a clear engineering picture — recent
            building work introduced a high-resistance termination, exposed under load. Without
            the structured interview the apprentice would have wasted hours chasing ‘lights are
            dim’. With the interview, the building-work clue points directly to the fault
            location. This is the step-up — using the interview as the primary diagnostic tool,
            not an optional preamble.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Symptom: lights flicker</ContentEyebrow>

      <ConceptBlock
        title="Flicker — five candidate causes, prioritised by likelihood"
        plainEnglish="Customer reports lights flicker. Five candidate hypotheses to test: (1) loose neutral somewhere on the circuit (HRJ); (2) supply-side voltage instability; (3) LED driver / dimmer incompatibility; (4) heavy intermittent load on the same circuit (immersion thermostat cycling); (5) Open PEN starting to develop on TN-C-S."
        onSite="Diagnostic order: Megger MFT1741+ Zs at lampholder (compares to design); Fluke 117 voltage at lampholder during flicker event (transient dip suggests source); Fluke 369 leakage clamp on circuit (intermittent leakage suggests insulation); thermal camera on suspect terminations; PQ analyser deployment if unable to reproduce."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Loose neutral / HRJ</strong> — Zs above expected; voltage drops on load.
            Likely cause if recent building work, vibration, age.
          </li>
          <li>
            <strong>Supply instability</strong> — multiple properties affected; PQ analyser shows
            correlated dips. DNO call.
          </li>
          <li>
            <strong>LED driver / dimmer</strong> — only on dimmable circuits; flicker pattern
            matches dimmer setting. Replace with compatible driver / dimmer pair (Click Mode
            dimmer + Aurora Enlite drivers, or LightwaveRF leading-edge dimmer + retrofit-rated
            lamps).
          </li>
          <li>
            <strong>Intermittent load</strong> — flicker correlates with appliance cycling
            (boiler, immersion, freezer). Calculate voltage drop on circuit; oversized cable or
            split circuit.
          </li>
          <li>
            <strong>Open PEN developing</strong> — N-E voltage at cut-out elevated. STOP, DNO.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Symptom: smell of burning</ContentEyebrow>

      <ConceptBlock
        title="Burning smell — STOP, isolate, investigate by elimination"
        plainEnglish="A burning smell is a STOP-WORK condition. The customer should be advised to switch the property off at the main switch immediately and stay clear until the fault is located. Burning suggests overheating somewhere — typically a HRJ at a terminal, an overloaded conductor, or a failed component generating heat without yet causing fault current."
        onSite="Investigation: full installation isolation, then thermal camera scan (Fluke Ti401 / FLIR E54) of every accessory in the affected area looking for hot spots that have cooled. Visual inspection for char marks, melted plastic, discolouration. The pattern of damage often points to the fault — burnt back-box = terminal HRJ; melted MCB = chronic overload; charred SWA gland = water ingress and arcing."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Customer brief</strong> — switch off at main, stay clear, ventilate, no
            candles or open flames (carbon monoxide risk if it's a fuel-burning appliance fault).
          </li>
          <li>
            <strong>Visual inspection</strong> — discolouration on plastic accessories, char marks
            at terminations, melted insulation visible at any cable end.
          </li>
          <li>
            <strong>Thermal camera</strong> — even after isolation, thermal mass holds heat for
            10-20 minutes. Scan immediately on arrival.
          </li>
          <li>
            <strong>Smell isolation</strong> — bakelite / phenolic resin smell = old plastic
            accessories overheating; PVC smell = modern accessory melting; ozone = arcing;
            metal-burn smell = busbar damage.
          </li>
          <li>
            <strong>Common locations</strong> — high-current connections (CU incomer, immersion,
            shower, kitchen radial), points where flexes plug into accessories (multi-way
            adaptors, extension leads), inside lamp fittings (especially old halogen downlights).
          </li>
          <li>
            <strong>Document and report</strong> — fault may have caused damage requiring
            replacement of multiple accessories. Issue Dangerous Situation Report to customer;
            recommend full electrical condition review.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Symptom: RCD trip on power-up</ContentEyebrow>

      <ConceptBlock
        title="RCD trips immediately when reset — six candidate causes"
        plainEnglish="The RCD won't stay reset. Either it's catching a real fault, or the RCD itself is faulty, or there's cumulative leakage above the trip threshold from healthy loads."
        onSite="Diagnostic sequence: (1) disconnect ALL loads from the affected circuit; reset RCD; if holds, the fault is in a load. (2) Plug loads back one at a time; the load that trips the RCD is the fault. (3) If the RCD trips with no loads connected, the fault is in the fixed wiring — IR test with the Megger MFT1741+ between L-E, N-E and L-N at 500 V."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Earth fault on fixed wiring</strong> — IR L-E reads low. Locate by halving and
            retest.
          </li>
          <li>
            <strong>Earth fault on appliance</strong> — IR drops when appliance plugged in.
            Replace appliance or PAT-test.
          </li>
          <li>
            <strong>Cumulative leakage</strong> — many electronics on one circuit, each leaking
            1-2 mA, total exceeds 30 mA. Split circuit or upgrade to 100 mA RCD with downstream 30
            mA RCBOs.
          </li>
          <li>
            <strong>Faulty RCD</strong> — Megger MFT1741+ AutoRCD test shows trip outside spec
            (e.g. trip at 8 mA on a 30 mA device).
          </li>
          <li>
            <strong>Wrong-type RCD on DC-injecting load</strong> — Type AC RCD on a circuit
            feeding LED drivers / VSDs / EV charger. DC component blinds the RCD or causes
            nuisance trips. Upgrade to Type A or Type B as appropriate.
          </li>
          <li>
            <strong>Borrowed neutral</strong> — circuit shares neutral with another circuit. RCD
            sees imbalance. BS 7671 314.4 violation. Trace and rectify.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Symptom: warm to touch</ContentEyebrow>

      <ConceptBlock
        title="Warm or hot accessory — early-warning HRJ signal"
        plainEnglish="A socket, switch, accessory or breaker that's warm to touch (>40 °C is noticeable, >60 °C is dangerous) is generating heat — typically from a high-resistance termination or chronic overload. Catch it before it becomes a fire."
        onSite="Diagnosis: thermal camera (Fluke Ti401, FLIR E54) on the affected accessory under load. Compare to identical adjacent accessories — single hot accessory in a row of cold ones is the fault. Then isolate, open the accessory, inspect terminals — typically loose screw, work-hardened conductor, copper-on-aluminium corrosion (rare but seen on older installations)."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Thermal scan under load</strong> — energise circuit at expected load (kettle
            on a kitchen socket, drill on a workshop socket). Image under load; compare to
            ambient.
          </li>
          <li>
            <strong>Touch comparison</strong> — bare hand back-of-fingers comparison between
            suspect and adjacent accessories. Significant temperature difference = fault.
          </li>
          <li>
            <strong>Voltage drop</strong> — Fluke 117 voltage measurement at the suspect accessory
            under load vs at the supply end. Drop above 2-3% = significant resistance somewhere in
            between.
          </li>
          <li>
            <strong>Visual on opening</strong> — discolouration on terminal screws, brown stains
            on conductor insulation near terminals, blackened terminal block, cracked accessory
            body.
          </li>
          <li>
            <strong>Common causes</strong> — terminal screw not torqued to spec (typical 0.8-2.0
            Nm for accessories), conductor partially insulated under terminal screw, multi-strand
            conductor with strands escaping the terminal, repeated plug-in cycles loosening socket
            contacts.
          </li>
          <li>
            <strong>Repair</strong> — cut back to clean conductor, re-strip, re-terminate to
            manufacturer's torque (Wera 7440 1/4" torque screwdriver, Knipex Twistor Plus). Retest
            with thermal camera under load to confirm.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Symptom: intermittent — the hardest fault to diagnose</ContentEyebrow>

      <ConceptBlock
        title="Intermittent faults — when the fault isn't there when you arrive"
        plainEnglish="The customer reports a fault that you can't reproduce. Common intermittent faults: thermal expansion opening a HRJ when warm; humidity bridging an L-E gap; load cycling triggering an RCD only at certain loads; PQ events from supply or neighbouring property."
        onSite="Investigation: PQ analyser deployment (Fluke 1730 / 1760, Hioki PW3198) for 24-72 hours captures the event. Customer interview to identify timing patterns (every morning at 6 AM = correlate with timers; only during rain = water ingress; only on hot days = thermal expansion). Targeted load testing under suspect conditions (heat the circuit with a hairdryer, soak the suspect accessory with a wet cloth — under controlled isolation)."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Customer log</strong> — ask customer to log every event (time, what was on,
            weather, anything unusual). Pattern often reveals the cause.
          </li>
          <li>
            <strong>PQ analyser deployment</strong> — Fluke 1730 logs voltage, current, harmonics,
            dips, swells continuously. Catches the event in real time with timestamp.
          </li>
          <li>
            <strong>Thermal cycling</strong> — heat suspect terminations with hot air gun (Steinel
            HG2120E on low setting), retest immediately. HRJ that's stable cold may open when
            heated.
          </li>
          <li>
            <strong>Humidity testing</strong> — apply controlled moisture (damp cloth at suspect
            accessory under isolation), retest IR. Shows water-ingress faults.
          </li>
          <li>
            <strong>Load testing</strong> — apply expected loads in sequence to reproduce
            conditions. Use a Megger Loadbox or similar to simulate large fixed loads.
          </li>
          <li>
            <strong>Time of day</strong> — correlate with neighbouring property activity (factory
            startup, large equipment cycling, EV charging). Intermittent supply-quality issues
            common in shared-feeder situations.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Structured customer interview (what / when / where / how long / what tried / what changed) is the fault-diagnosis primary tool. 5 minutes saves 30 minutes of misdirected testing.',
          'Customer symptoms are starting hypotheses, not facts. Verify with measurement; treat customer descriptions as approximately 70% accurate.',
          'Time-correlated faults are easiest to diagnose — the trigger time identifies the cause. PQ analyser captures the conditions at the reported moment.',
          'Burning plastic smell is always urgent — HRJ at char point, fire-risk window open. Treat as Code 1; isolate immediately; investigate same visit.',
          "Common false-alarm symptoms: 'lights flicker' often = LED lamp/dimmer incompatibility; 'breaker trips' often = overloaded extension; 'socket dead' sometimes = upstream tripped GFCI.",
          'Weather-correlated faults indicate environmental triggers — rain → outdoor leakage, temperature → cable / termination effects, wind → mechanical movement at supply.',
          'Load-correlated faults reveal the load that exposes the fault — kettle inrush exposes HRJ on the supply, motor start exposes loose terminal in the breaker.',
          "Document interviews in the standard job sheet 'Symptoms' section — customer's words in quotes, timeline, conditions, what they've tried.",
        ]}
      />

      <Quiz title="Common symptoms — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
