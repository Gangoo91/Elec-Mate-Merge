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
      "Size the cable for the sustained load, the installation method (Method D for buried SWA), the ambient temperature, the volt-drop over 25 m, and the protective device. A 32 A continuous load on Method D buried SWA typically lands at 6 mm² 2-core SWA with a 4 mm² CPC, depending on soil conditions and grouping. Volt-drop check: 32 A × 25 m × tabulated mV/A/m for 6 mm² (~7.3 mV) = 5.8 V = 2.5% — within the 3% Reg 525.1.1 limit for a power circuit. Type C MCB (or Type D) handles compressor inrush. Manufacturer's instructions confirm RCD type required (often Type B or RDC-DD per Section 411.3.3 / 415.1).",
      "Safe system of work — the procedure, sequence, controls and competencies that make the TASK safe (RAMS, isolation, PPE, supervision). Safe place of work — the physical environment is suitable for the work (access, lighting, working space, ventilation, escape routes, no slip/trip hazards). HSWA Section 2 requires the employer to provide both. For fault diagnosis BOTH matter because the work happens in environments the firm doesn't control (customer's premises) — the operative's judgement decides whether the place is safe, and if it isn't, the firm has to take action (improve access, return at a different time, escalate to the supervisor).",
      "The BUS is the current main UK government grant for low-carbon heating retrofits — currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and lower amounts toward biomass boilers in eligible properties. The grant is administered by Ofgem and paid to the MCS-certified installer who passes it through to the customer as a price reduction. Eligible properties: existing dwellings (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC. The grant has been extended several times and is currently confirmed through the late 2020s.",
      "Three things. (1) Physical barrier — typically a folding red-and-white safety screen (Skipper Barrier or similar) at 2 m from the open DB, blocking pedestrian access to the work area. (2) Warning signage — 'Danger — Electrical work in progress — No unauthorised access' (BS EN ISO 7010 yellow triangle, W012). (3) Briefing — verbal briefing to reception staff before opening the DB, with named responsible person who's aware of the barrier and will challenge anyone who crosses it. The barrier is non-negotiable; signage alone doesn't satisfy HSWA Section 3 duty to non-employees.",
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
      "ENA Engineering Recommendation G99 — the 7 kW inverter exceeds the 16 A per phase G98 fast-track limit (3.68 kW at 230 V single-phase). G99 is a pre-installation application to the DNO, who will confirm or reject the connection based on the local network capacity. The application is normally submitted by the MCS-certified installer using the standard G99 application form. Without the G99 approval the DNO can require disconnection. G98 (notification within 28 days of commissioning) only applies to inverters at or below 16 A per phase per inverter.",
      "Section 753 'Heating cables and embedded heating systems' covers electric heating cables embedded in floors, walls or ceilings, plus surface heating systems and de-icing / frost-prevention applications. The A4:2026 amendment completely revised Section 753 — extending its scope, retitling it, and adding new requirements relocated from Chapter 53 covering impact protection and installation of heating cables. Industrial heating systems complying with BS EN 60519, BS EN 62395 and BS EN 60079 are excluded from Section 753.",
      "Possible thermal runaway in progress. Mechanical damage can pierce the internal separator inside a Li-ion cell, creating an internal short circuit. The short discharges energy as heat, which raises cell temperature, which decomposes the electrolyte, which generates more heat — a positive feedback loop. Once started, runaway is essentially unstoppable and can vent flammable / toxic gas (HF, CO, hydrocarbons) and ignite. Move the battery to an open outdoor location away from buildings and other batteries on something non-combustible (sand, brick), evacuate the area, call the fire service and do not put it back in the tool or charger.",
      "Required when (a) live working is planned at any voltage above 50 V AC where the operative can't safely self-rescue (e.g. confined space, working at height, working alone in a remote location), OR (b) the work is on a system where a single fault could cause death (HV, large industrial 3-phase), OR (c) the firm's internal H&S policy specifies it for the task. The accompanying person's job is to (1) observe and challenge unsafe acts, (2) raise the alarm if the operative is incapacitated, (3) assist with isolation / rescue if needed, (4) sign off the safe-system-of-work. The accompanying person must themselves be competent — typically an Approved Electrician or higher.",
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
      "Six items. (1) RAMS — read, signed, fault-specific addendum present. (2) Permit — if commercial/industrial, signed by authorised manager. (3) Isolation plan — primary isolation point identified, lock-off device to hand. (4) Instruments — GS38 two-pole tester calibration in date, MFT calibration in date, batteries fresh, proving unit functional. (5) PPE — appropriate to voltage and environment, available and worn. (6) Comms — supervisor available by phone, lone-working check-in scheduled if alone. If any item is missing — STOP, escalate, don't start work. The checklist takes 30 seconds and protects you from every common cause of post-incident regret.",
      "Treat the immersion element as a stored-thermal hazard even after electrical isolation — the water in the cylinder is at 60–80 °C and the element is in direct contact. The metal flange transfers heat for 10–15 minutes after isolation. Use a glove or an insulated spanner; don't grab the brass nut bare-handed. Separate from the electrical hazards, fault diagnosis on heating equipment carries a thermal-burn risk that's easy to forget once your head is in 'is it dead?' mode.",
      "Micro-hydro can deliver excellent baseload renewable electricity if the site has the head (vertical drop) and flow rate to support it. Unlike wind and PV, hydro runs 24/7 and tracks demand reasonably well. Practical issues: Environment Agency / Natural Resources Wales abstraction licensing, fish protection requirements, weir and intake construction cost, and connection to the property (often hundreds of metres of buried cable). The right site is rare; where it exists, micro-hydro is one of the best-performing renewables per pound spent.",
      "Site rules, welfare arrangements, fire muster point, first-aid arrangements, accident and near-miss reporting routes, the Construction Phase Plan headlines, the specific hazards on this site, the PPE policy, the no-go areas, your duties as a worker under Reg 15, and any project-specific risks (asbestos survey results, live services, traffic management). The induction is the formal mechanism for transferring CDM information from the Principal Contractor to operatives joining the site.",
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
      "No. Part P (Building Regulations Approved Document P) makes NEW circuits in dwellings notifiable to Building Control. Replacement of an existing protective device is NOT a new circuit — it's maintenance. Notifiable work is: new circuits in dwellings; consumer unit replacements; any work in special locations (bathroom Zone 0/1/2 work, swimming pools, saunas). For non-notifiable work, the Minor Works Certificate is the documentary record but no Building Control submission is required. For notifiable work, the contractor must be a registered competent person (NICEIC, NAPIT, ELECSA, STROMA) and the Building Control notification goes via the scheme's online portal.",
      "Safe system of work — the procedure, sequence, controls and competencies that make the TASK safe (RAMS, isolation, PPE, supervision). Safe place of work — the physical environment is suitable for the work (access, lighting, working space, ventilation, escape routes, no slip/trip hazards). HSWA Section 2 requires the employer to provide both. For fault diagnosis BOTH matter because the work happens in environments the firm doesn't control (customer's premises) — the operative's judgement decides whether the place is safe, and if it isn't, the firm has to take action (improve access, return at a different time, escalate to the supervisor).",
      "Three things. (1) The unit is configured / wired correctly for PEN-fault detection (some units have a DIP switch or software setting for the earthing arrangement; some auto-detect; some require firmware configuration). (2) The detection circuit is operational — many units include a self-test that runs on power-up and the apprentice should observe the test pass. (3) The unit's earthing is connected per the manufacturer's wiring diagram (the protective measure depends on the right conductors being terminated correctly). The MCS-certified designer specifies the test sequence; the apprentice executes per the design and verifies the result.",
      "Two-step measurement. (1) Measure the supply voltage at the consumer unit (or the origin of the circuit) under no-load — typically 235-245 V on UK 230 V supply. (2) Apply a known significant load at the furthest point of the circuit (e.g. plug in a 2 kW load — fan heater, kettle, test load resistor). Measure the voltage at the same point. Voltage drop = (no-load voltage) - (loaded voltage). Express as percentage of nominal: drop / 230 x 100. Compare against Reg 525 limits.",
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
      "Wind shear from neighbouring buildings. Domestic-scale turbines need clean laminar wind, which only happens at hub heights well clear of surrounding obstacles. In a typical suburban garden the turbine sits in turbulent air, the yield is well below the manufacturer's wind-tunnel claims, and the noise / vibration interface is poor. Even where the planning application succeeds, the energy yield often disappoints. Wind makes sense in open rural settings with tall masts; it does not make sense in suburban back gardens.",
      "Thermal runaway is a self-sustaining exothermic chemical reaction inside the cell. Once it starts in one cell (typically triggered by internal short circuit, mechanical damage, overcharge, or sustained over-temperature) the heat from that cell propagates to the next cell, which also enters runaway, and so on through the pack. The reaction releases flammable and toxic gases (including hydrogen fluoride and carbon monoxide) and can reach 600+ degC. Standard CO2 or dry-powder extinguishers do not stop a runaway battery — water is used to cool surrounding cells and limit propagation, but the cell itself burns until its energy is spent. This is why siting, fire separation and the BMS exist — to prevent and contain runaway.",
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the L3 apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
      "Building Control is the local-authority enforcement of the Building Regulations. For most environmental tech installs the route is via a competent-person scheme (the installer's firm is registered with NICEIC / NAPIT / similar, and self-certifies the work) — Building Control is notified by the scheme but doesn't visit. For non-notifiable work (e.g. some maintenance) Building Control isn't involved. For installs that fall outside competent-person schemes, or for major works, Building Control may inspect on-site. The customer receives a Building Regs compliance certificate — either from the competent-person scheme or from Building Control directly.",
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
      "You can't make someone seek help, but you can keep listening, keep checking in, and keep signposting gently. Suggest the Lighthouse Club 24/7 helpline (0345 605 1956) — confidential, no referral needed, no qualifying period. Mention Samaritans (116 123). Mention Mates in Mind resources. Don't break their confidence without asking, but if you genuinely believe they're at imminent risk of harm to themselves, the right thing is to call 999 or take them to A&E — that's a safeguarding step, not a betrayal. Look after yourself too — supporting a peer can be heavy. The same charities are available to you.",
      "BUS provides £7,500 for ASHP / GSHP and £5,000 for biomass — but the biomass strand is restricted to properties that are not connected to the gas grid AND in defined rural categories AND meet Ecodesign emission limits. The intent: heat pumps are the policy default, biomass is a fallback for properties where heat pumps are not viable (very high heat load, no electrical capacity for the heat pump, off-gas-grid rural) and where the air-quality impact is minimal (rural distance from neighbours, Defra-approved Ecodesign appliance). For a typical suburban property the BUS biomass strand is closed. For a rural off-gas-grid farmhouse with a 30 kW heat load, BUS biomass is sometimes the only viable grant route. The L3 electrician sees biomass overwhelmingly in rural settings.",
      "When you need to see the SHAPE of the voltage / current waveform over time — not just its RMS value. Typical L3 use cases: (1) Diagnosing harmonic distortion on a circuit where TRMS multimeter readings look fine but the load is mis-behaving. (2) Spotting voltage transients (spikes, sags, swells) that are too brief for a multimeter to capture but trip protective devices. (3) Diagnosing intermittent faults that show up as glitches. (4) Verifying VFD output waveforms. Modern handheld scopes (Fluke 125B, Megger Power Quality analysers, Hantek HT06) are battery-powered and field-usable. L3 apprentices don't usually own one but should know when to ask for one.",
      "STOP the original fault investigation. The disconnected CPC is a Code 1 (Danger Present — immediate action required) defect under the EICR coding system — the metal lampholders, ceiling roses and ceiling-mounted accessories on this circuit have NO earth fault path, so a fault to exposed metalwork won't operate the protective device and the metalwork will sit at phase voltage. Make the situation safe — either re-terminate the CPC properly OR isolate the circuit and label 'OUT OF SERVICE — CPC FAULT — do not re-energise'. Inform the customer in writing. Then resume original fault investigation if the customer agrees to the additional work.",
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
      "Work at Height Regulations 2005 apply. (1) Risk assessment includes the height work specifically — fall distance, type of platform (ladder / step / platform / scaffold), duration. (2) Working platform: ladder for short-duration access tasks (under 30 minutes per task), platform for longer / heavier work. (3) Securing the ladder — stabiliser, person footing, anti-slip feet, 1:4 angle, three points of contact. (4) Tools secured against falling onto people below. (5) Loft work — board out the loft hatch and a working area; do not stand on plasterboard. (6) Single-operative restriction — solo work at height carries higher risk and the firm's lone-working procedure may bar it. WaHR 2005 is enforced by the HSE alongside EAWR — both apply simultaneously.",
      "Five lone-working controls before you start. (1) Documented lone-working policy from your employer authorising you to be on site alone for this category of work. (2) Buddy / check-in system — typically a phone call or text to the office every 30–60 minutes; failure to check in triggers an escalation. (3) First-aider known to be reachable, or HSE first-aid arrangements appropriate to the site (lone-worker apps with man-down detection are increasingly standard). (4) Rescue / extraction plan — if you suffered a shock, who knows where you are and who has the keys / access? (5) Authority limits — solo unsupervised diagnosis on a live installation is JIB Approved Electrician work, NOT apprentice work; an L3 apprentice should not be alone on a fault job that involves any live testing without explicit supervision arrangement.",
      "Three additional steps. (1) Identify life-safety loads BEFORE isolation — interview the customer / care manager / clinical lead; check for oxygen concentrators, suction pumps, electric beds, mobility lifts, dialysis equipment. (2) Brief the customer / clinical staff that the affected circuit will be off; agree alternative arrangements (battery backup, manual lift operation, transfer of patient if needed). (3) Minimise the outage window; do the work efficiently; communicate during the work if delays occur. The customer's regulatory exposure (CQC for care homes, NHS for hospitals) makes life-safety circuit isolation a multi-stakeholder coordination, not a unilateral electrician decision.",
      "Common causes (in approximate frequency order): (1) physical damage — nail / screw through cable during DIY, mouse damage in lofts, abrasion against sharp metalwork. (2) thermal damage — cable run alongside a heating pipe, conductors derated by enclosed installation method, prolonged overload heating. (3) moisture / contamination — water ingress into ceiling void, condensation in unheated buildings, salt-air corrosion in coastal properties. (4) UV degradation — exterior cables exposed to sunlight without UV protection. (5) ageing — polymer insulation breakdown after 30+ years (rubber-insulated cables from pre-1970s installations). (6) chemical attack — cables in contact with PVC pipes, certain adhesives, hydrocarbon spills.",
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
      "The MFT (Megger MFT1741+, Kewtech KT64+) injects different test currents based on the RCD type. Type AC test: pure sinusoidal AC at I∆n. Type A test: pure sinusoidal AC AT I∆n PLUS pulsating DC at 1.4× I∆n (because Type A must detect both). Type F test: all of the above PLUS composite multi-frequency. Type B test: all of the above PLUS smooth DC at twice I∆n. Selecting the wrong type on the MFT may show 'pass' on a Type B device (because you're only testing the AC capability, not the DC) — false confidence. Modern MFTs auto-detect or have explicit type selection.",
      "Three steps: (1) Visual — case undamaged, leads not nicked or crushed, probes have intact finger barriers, no visible burn marks or melted plastic. (2) Calibration — calibration label in date (typically annual for MFT, two-yearly for two-pole testers, manufacturer's interval for multimeters); calibration certificate available if challenged. (3) Function — tester proves on a known live source AND on a known dead source; battery level indication healthy; selector switch operates cleanly. Any failure on any step — the instrument is not used until rectified. Most firms have a pre-use inspection log signed by the operative at the start of each shift.",
      "PAS 2035 (Publicly Available Specification — Retrofitting dwellings for improved energy efficiency) is the standard that governs domestic energy efficiency retrofit projects. It requires a 'whole-house' approach — fabric assessment, ventilation strategy, moisture risk management, and any retrofit measures (including heat pump installation) must be coordinated by a Retrofit Coordinator and designed by a Retrofit Designer. Required for grant-funded retrofits (ECO4, Boiler Upgrade Scheme in some cases, local authority schemes). Helps avoid the failure mode where a heat pump is fitted to an uninsulated leaky house and posts a poor SCOP. The MCS-certified heat pump installer works within the PAS 2035 framework on grant-funded projects.",
      "Carbon payback for typical UK PV is 1-3 years (the time taken for operating CO₂ savings to offset the manufacturing CO₂ cost). Financial payback depends on system cost, self-consumption, export tariff and electricity price — typically 6-12 years for a standalone PV install in 2026, often shorter if a battery is added (improves self-consumption from 25-40% to 70-90%). After payback the system continues for the rest of its 25-year warranted life essentially as free energy. The carbon case is much stronger than the financial case in isolation; together they make PV the dominant UK domestic environmental tech.",
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
      "OZEV requires installations to comply with the Electric Vehicles (Smart Charge Points) Regulations 2021 and to be installed by an OZEV-authorised installer. Periodic inspection follows the BS 7671 framework — typically 5-yearly EICR for domestic, plus EV-specific tests including RCD operation (Type B or RDC-DD), open-PEN protection function (where the charger has built-in open-PEN), and Zs at the charge point. Landlord properties additionally subject to the Electrical Safety Standards Regulations 2020 (5-year EICR plus change of tenancy).",
      "Old radiators were sized for 70-80°C flow temperature from a gas boiler. To deliver the same heat output at lower flow temperature, the radiators need to be larger. If you ask a heat pump to drive undersized old radiators at 70-80°C flow, the temperature lift is much bigger than at 35-40°C flow — so the COP drops sharply. SCOP reflects the actual flow temperature the system runs at across the heating season. Properly designed heat-pump retrofits include a radiator survey and upsize plan, or convert to underfloor where possible.",
      "Decline. The senior is asking you to be inside the danger zone of a live exposed conductor without the operational role of a witness/observer (you're holding a cover, not observing safety). EAWR Reg 14 — three conjoint tests — would not be satisfied: live work is happening, you're in the danger zone, but there's no live-working risk assessment that includes you as a participant. Your appropriate role is OUTSIDE the work area as a barrier-monitor / comms-runner / first-aider. If the senior needs the cover held to access the busbar, the right answer is to use a clip / stand / temporary cover-prop, NOT a human hand. Politely escalate to the supervisor if pressed.",
      "TT-specific differences. (1) Earth electrode is the only return path — measure electrode resistance with a dedicated earth electrode tester (Megger DET3TC) or MFT with earth-stake adaptor. Typical 50–200 Ω; degradation increases over years (drying out, corrosion). (2) BS 7671 411.5 requires 30 mA RCD at origin (S-type if downstream RCDs are also 30 mA). RCD trip-time test on the origin RCD — different from TN where origin protection is overcurrent. (3) EFLI Zs values are MUCH higher than TN — calculate against BS 7671 41.1 limits for TT (often expressed as RA × IΔn ≤ 50 V). (4) Bonding requirements are stricter — bonding network IS the customer's only fault path. The L3 fault investigator approaches TT differently from TN.",
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
      "The install can't commission until the DNO has approved the G99 application. Approval timeline 2-12 weeks depending on local network conditions. Customer needs to know this up front — booking holiday around an install date that depends on G99 approval is a recipe for disappointment. The MCS-certified installer normally manages the application and provides timeline expectations. As the apprentice you should never quote a commission date for a G99 install without confirmation from the certified installer.",
      "Buildings of 18 m or more in height (typically 7 storeys or more) containing two or more residential units. The HRRB regime came in after the Grenfell Tower fire and brings additional fire-safety requirements including (depending on the specific building regulations) recommended AFDDs (Reg 421.1.7) on socket circuits, mandatory linked smoke detection, and enhanced fire compartmentation. The regime is administered by the Health and Safety Executive (Building Safety Regulator) for the highest-risk buildings.",
      "Reg 4(3) — failure to carry out the work activity safely (the safe-isolation procedure) — likely as the lead charge. Reg 13 — failure to take adequate precautions to prevent equipment becoming live again. Reg 14 if there's evidence of deliberate live working without the three conditions met. Reg 16 if the operative was inadequately competent or supervised. Plus HASAWA s.7 against the individual operative and s.2 against the firm. A multi-charge indictment is the norm for serious electrical incidents.",
      "(1) Confirm with the panel display whether it's a system fault (resolved by a panel reset) or a circuit fault (suggests your work has caused damage). (2) If a system fault — reset the panel, confirm restoration, document. (3) If a circuit fault — STOP, isolate again, retest the affected circuit (continuity, IR, polarity), find and rectify the cause. (4) During the period the alarm was in fault — the building's fire-safety arrangements have been compromised; the customer's responsible person under the RR(FS)O 2005 should have been notified BEFORE the work and a fire watch should have been in place during the work. Document the period of fault on the alarm log book. Inform the alarm-receiving centre.",
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
      "Three duties. (1) Make safe — any temporary leads, exposed conductors, removed accessories must be made electrically safe before you leave site (terminated, capped, isolated, signed). (2) Tidy — work area returned to its pre-work state or better; debris collected and disposed of (Hazardous Waste Regs 2005 for asbestos, batteries, fluorescent tubes); broken accessories handed to customer with explanation. (3) Document — what was found, what was done, what's left to do, what was disposed of. For fault diagnosis specifically, the area you've worked in may contain damaged parts that look normal but are actually compromised — those have to be made obviously safe (capped, labelled) so the customer or next tradesperson doesn't re-energise them.",
      "Multiple bodies. (1) Emergency services — ambulance / fire / police as appropriate at the time. (2) Police — investigate scene, especially in fatalities (corporate manslaughter / individual gross-negligence manslaughter potential). (3) HSE — H&S investigation (HASAWA, EAWR, CDM, MHSWR, RIDDOR). (4) Building Control — where there's a building-regs / structural angle. (5) DNO — if mains supply was involved (ESQCR). (6) Insurers — both the firm's and the client's. The HSE and police typically work in parallel, especially after fatal incidents.",
      "On a TN-C-S supply the PEN conductor combines neutral and protective earth between the substation and the cut-out. If the PEN breaks open between the substation and the property, the property's earthing rises toward line voltage depending on the load balance on neighbouring properties on the same PEN. For an EV on a driveway, the car body sits at the elevated PME potential while the surrounding ground (concrete, soil, gravel) stays at true earth potential — the touch-voltage between the car body and the ground can be lethal.",
      "Where equipment is connected and is likely to influence the test or be damaged by the test voltage, a 250 V DC IR test shall be used following connection of the equipment, as clarified in the A4:2026 redraft. Practical implication for fault diagnosis: when you re-IR-test a circuit AFTER fixing a fault and reconnecting electronics (LED drivers, dimmers, electronic timers, smart sockets), use the 250 V range on the MFT to verify the post-fix IR without damaging the kit. The 500 V test still applies before the equipment is connected — that's how you confirm the wiring itself is healthy. The two-stage test (500 V isolated + 250 V with kit re-connected) is the A4:2026-aligned procedure.",
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
