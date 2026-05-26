/**
 * Module 2 · Section 1 · Subsection 3 — Battery energy storage systems (BESS)
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2 (main types and characteristics)
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.1 (operating principles) + AC 3.2 (applications
 * and limitations); 2357 Unit 312 ELTP02 / AC 3.1 (operational requirements and benefits).
 *
 * Note: Unit 301 is overview-level. Detailed BESS design and commissioning competence
 * sits in standalone MCS qualification 2920 (Battery Storage System Design and Installation).
 * This subsection equips the L3 apprentice to recognise BESS topology, the regulatory map,
 * and the lithium-ion safety story.
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
  VideoList,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Battery energy storage systems (1.3) | Level 3 Module 2.1.3 | Elec-Mate';
const DESCRIPTION =
  "Battery energy storage systems (BESS) at recognition level for the L3 electrician — DC-coupled vs AC-coupled topology, lithium-ion chemistries (NMC vs LFP), the BMS, the inverter interface, the BS 7671 anchor, the IET Code of Practice for Electrical Energy Storage Systems, and the lithium-ion fire safety story.";

const checks = [
  {
    id: "l3-m2-s1-sub3-bess-topology",
    question:
      "A customer has an existing 4 kWp PV array fitted in 2018 with a string inverter. They want to add battery storage. Which topology is the installer most likely to specify and why?",
    options: [
      "Reg 543.3.201 — protective conductors up to and including 6 mm² shall be protected throughout by a covering at least equivalent to a single-core non-sheathed cable of voltage rating 450/750 V. The same insulation requirement extends to bonding conductors. Bare strap is only allowed where it forms part of a metallic conduit/enclosure used as the protective conductor itself.",
      "A consolidated Act of Parliament that brings together earlier UK anti-discrimination legislation (Race Relations Act, Sex Discrimination Act, Disability Discrimination Act and others) into a single framework. It defines nine protected characteristics, prohibits direct and indirect discrimination, harassment and victimisation, and places a duty on employers (and others) to make reasonable adjustments for disabled people. Enforced through Employment Tribunals (workplace) and County Courts (services).",
      "Cable cutters (or T+E shears) to crop the tail square; a stripper sized for 6/10 mm² to remove the green/yellow PVC; long-nose pliers to form the conductor into the clamp aperture OR a ratchet crimper to fit a bootlace ferrule (red for 10 mm², blue for 6 mm²) before insertion. Squared cut + clean strip + correct termination = 526.1 compliant.",
      "AC-coupled — leave the existing PV inverter in place and add a separate battery inverter on the AC side. The PV continues to feed the consumer unit at AC; the battery inverter charges from surplus AC and discharges back to AC when the property load exceeds PV output. Less efficient at one round-trip than DC-coupled (extra DC-AC-DC conversion), but lets the customer keep the existing PV install untouched and avoids a full re-commissioning of the PV system.",
    ],
    correctIndex: 3,
    explanation:
      "AC-coupled retrofits dominate the UK retrofit market because they bolt onto an existing PV install without re-touching the PV side. DC-coupled is more efficient but requires a hybrid inverter to be specified at PV install time (or replacing the existing PV inverter, which is rarely cost-effective). The G98/G99 notification is reissued for the combined system because the export profile changes when batteries are added.",
  },
  {
    id: "l3-m2-s1-sub3-lfp-vs-nmc",
    question:
      "A customer asks why most modern domestic battery systems use LFP (lithium iron phosphate) cells rather than NMC (nickel manganese cobalt). What is the honest electrical-safety answer?",
    options: [
      "Stop, raise it in writing (text the supervisor or log it in the app). The RAMS specifies a podium for a reason — that is the documented control for the working-at-height risk on this task. Verbally swapping it out for a step ladder is an undocumented change to the safe system of work. Either the boxes get cleared and the podium gets used, or the RAMS gets formally amended and re-signed by everyone affected. WAHR 2005 Reg 6 puts the duty on the employer to use the most suitable equipment; verbally downgrading isn't a defence.",
      "LFP has a much higher thermal runaway threshold (around 270 degC vs around 150 degC for NMC) and a flatter, safer failure mode. In a fault scenario LFP releases far less energy and far less toxic gas. Energy density is lower (kWh per kg), so an LFP pack is physically larger than an NMC pack of equivalent capacity, but for a domestic wall-mounted unit space is rarely the binding constraint and the safety margin is worth the size penalty. UK insurers and the IET Code of Practice for Electrical Energy Storage Systems both lean strongly toward LFP for indoor domestic installations.",
      "Test instruments drift over time — components age, shock and vibration cause small errors. A drifted instrument produces wrong test results that fail BS 7671 Chapter 61 verification. Annual calibration to a UKAS-traceable standard (with a calibration certificate) is the standard requirement. NICEIC, NAPIT and ELECSA all check for in-date calibration certificates at scheme audit; an out-of-date instrument used to demonstrate compliance invalidates the certificate it was used to produce.",
      "All batteries store DC. The difference is where the conversion happens. In DC-coupled, the PV array, the battery and the inverter share a common DC bus inside a hybrid inverter; PV energy charges the battery directly with one DC-DC conversion (high efficiency). In AC-coupled, the PV inverter is independent and converts PV DC to AC; a separate battery inverter then converts AC back to DC to charge, and DC back to AC to discharge — two extra conversions, lower round-trip efficiency, but easier to retrofit because the existing PV install stays untouched.",
    ],
    correctIndex: 1,
    explanation:
      "The chemistry choice is the single biggest safety variable in a domestic BESS. LFP dominates UK domestic installs (Tesla Powerwall 3, BYD, Pylontech, GivEnergy, Fox ESS all use LFP for residential lines). NMC still appears in higher-energy-density commercial systems and in EVs where mass matters. As an apprentice you should be able to read the cell chemistry off the data sheet and explain why it matters to the customer.",
  },
  {
    id: "l3-m2-s1-sub3-bms",
    question:
      "What does the battery management system (BMS) actually do and why does it matter for the electrical interface?",
    options: [
      "Phase sequence test confirms the order of phase rotation (L1, L2, L3 or A, B, C in correct sequence) on three-phase supplies. Wrong sequence reverses the rotation of three-phase induction motors and pumps — can cause damage to driven plant and wrong direction of conveyors / lifts. Tested with a phase rotation indicator (Fluke 9040, Megger PRMA1) — three probe leads, instrument indicates correct or reversed sequence. Required at three-phase commissioning and after any maintenance that may have disturbed phase identification (e.g. cable replacement, supply transformer changes).",
      "Section 753 covers heating cables and embedded electric heating systems — including underfloor heating, ceiling heating, wall heating, surface heating, trace heating, and the supply-side electrical work for heat pumps where the heating element forms part of the system. Provisions cover protection against electric shock (ADS, additional RCD protection at 30 mA for various configurations), surface temperature limitation (753.423 / 753.424.201 — 80 degrees Celsius cap), heating-free areas (753.522), heat-resistant cabling (753.522.1.3), and equipotential bonding interactions in special locations (702.55 floor heating in pool areas).",
      "The BMS is the safety-critical electronic controller embedded in the battery pack. It monitors per-cell voltage, per-cell temperature, pack current and state of charge; it balances cells during charge to keep them within their safe operating envelope; it disconnects the pack via internal contactors if any parameter exits the safe range; and it communicates state to the inverter and to remote monitoring. Without a working BMS the pack is unsafe to charge or discharge. The electrical interface includes the power conductors AND the BMS comms cable to the inverter — both must be installed correctly per the manufacturer's instructions or the system will not commission.",
      "Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, in 1.5 mm² T&E to the unit location (utility room, loft, plant cupboard). Local DP isolator. Boost wiring from kitchens and bathrooms — sometimes via humidity sensors or PIR, sometimes via pull-cord switches in bathrooms or push-buttons in kitchens. Some units include a low-voltage commissioning interface (e.g. for installer-set air-flow rates). The unit's nameplate is typically 50-300 W on full load — modest demand. The bulk of the electrical work is the boost wiring network, not the unit supply.",
    ],
    correctIndex: 2,
    explanation:
      "The BMS is the difference between a safe lithium battery and a fire. Every domestic Li-ion pack ships with one built in; the apprentice's job is to make the comms link between the BMS and the inverter, route the power conductors per spec, and not bypass any of the manufacturer's protection. Most failed commissioning attempts trace back to the comms cable (wrong type, wrong polarity, wrong port) — read the install manual before crimping anything.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the difference between DC-coupled and AC-coupled battery storage in plain electrical terms?",
    options: [
      "Stop, talk it through with the joiner, and if you can't agree on the spot fetch your Foreman (or the joiner's Foreman, whichever is on site) to mediate. Trade clashes at first-fix are normal — the resolution is conversation first, then escalation to a Foreman who can re-sequence the work or adjust either trade's plan. The principle is co-operation under HASAWA s.7(b), not 'I was here first'.",
      "All batteries store DC. The difference is where the conversion happens. In DC-coupled, the PV array, the battery and the inverter share a common DC bus inside a hybrid inverter; PV energy charges the battery directly with one DC-DC conversion (high efficiency). In AC-coupled, the PV inverter is independent and converts PV DC to AC; a separate battery inverter then converts AC back to DC to charge, and DC back to AC to discharge — two extra conversions, lower round-trip efficiency, but easier to retrofit because the existing PV install stays untouched.",
      "Direct discrimination (s.13) is treating someone less favourably BECAUSE OF a protected characteristic — e.g. refusing to hire someone because they're female. Indirect discrimination (s.19) is applying a 'provision, criterion or practice' that looks neutral but puts people sharing a protected characteristic at a particular disadvantage and can't be objectively justified — e.g. requiring all apprentices to be over 6ft tall would indirectly discriminate against women on average. Both are unlawful.",
      "When you see signs of abuse, neglect, undue pressure, vulnerability or risk that go beyond the scope of an electrical job. Report internally to your firm\\\\\\\\\\\\'s safeguarding lead (where one exists) or contracts manager; signpost to local authority adult/children\\\\\\\\\\\\'s social care if appropriate. Care Act 2014 (England) places statutory duties on local authorities; you don\\\\\\\\\\\\'t make the assessment but you can raise the concern.",
    ],
    correctAnswer: 1,
    explanation:
      "DC-coupled round-trip efficiencies are typically 90-95 percent; AC-coupled sit nearer 85-90 percent because of the extra conversion stages. For a new build with PV and battery designed together, DC-coupled hybrid inverters are usually specified. For a retrofit onto an existing PV array, AC-coupled is the default because it is bolt-on. Both need notifying to the DNO under ENA G98 (most domestic) or G99 (larger).",
  },
  {
    id: 2,
    question:
      "What does kWh capacity mean in a domestic battery context and how does it differ from usable kWh?",
    options: [
      "Are recommended by Reg 421.1.7 for AC final circuits supplying socket-outlets ≤ 32 A in dwellings — strengthened to a requirement in HRRBs under the Building Safety Act 2022, and treated as effectively required in HMOs / sleeping accommodation / care homes by fire-safety guidance. Not strictly required on this small commercial install, but a sensible fit on the IT rack and EV circuits.",
      "Operative pre-use visual every shift — check the cutting edges aren't chipped or rolled, the pivot is tight, the handle insulation is intact (especially on VDE-rated drivers — any cracked or chipped insulation = take out of service). Periodic competent-person inspection — annually typical. No 'PAT' equivalent for non-powered hand tools, but the visual regime is just as important. PUWER applies to ALL work equipment, not just powered.",
      "Nameplate kWh is the total energy the cells could theoretically deliver. Usable kWh is what the BMS will actually let you cycle between the manufacturer's safe state-of-charge limits. Manufacturers commonly cap usable capacity at 80-95 percent of nameplate to extend cycle life; a 13.5 kWh nameplate Powerwall, for example, ships with 13.5 kWh usable but many other systems are quoted differently. Read the spec sheet — usable kWh is the number that determines how long the battery actually keeps the lights on, not the headline capacity.",
      "An MID-compliant generation meter measures the total electrical output of the PV array. Required by Smart Export Guarantee (the supplier needs accurate metering to pay the export tariff) and increasingly by BUS / SEG-equivalent schemes for performance monitoring. At commissioning the meter is verified to read correctly (display zero before energising, increment as the inverter delivers, accumulate accurately over the first day's run). The customer can read the meter themselves to verify ongoing performance. The smart meter at the property handles the import / export reading for the supplier.",
    ],
    correctAnswer: 2,
    explanation:
      "The depth-of-discharge (DoD) limit is part of how lithium chemistries achieve their cycle life — 6,000+ cycles for LFP at 80-90 percent DoD versus a few hundred for the same cells cycled to 100 percent. The customer's runtime calculation should always use usable kWh, not nameplate. Manufacturers' warranties typically commit to a residual capacity (e.g. 70 percent of nameplate) at end of warranty — this is the cycle-life guarantee in plain English.",
  },
  {
    id: 3,
    question:
      "Where in BS 7671 does the requirement framework for electrical energy storage systems sit?",
    options: [
      "HRC fuses can interrupt very high prospective fault currents safely (1500 A or higher breaking capacity). Glass cartridges have ~35 A breaking capacity; on a high-PSCC circuit (UK domestic 6 kA, commercial 16 kA+) a glass fuse can rupture violently when fault current exceeds its breaking capacity — glass shards, hot metal, no current interruption. Fluke and Martindale lead sets use sand-filled HRC elements.",
      "Explaining the situation in person, leading with the safety reason (\\\\\\\"I have found a section of wiring that does not meet current safety standards\\\\\\\"), showing the specific issue where possible, expressing empathy for the inconvenience (\\\\\\\"I understand this is not what you were expecting\\\\\\\"), presenting options rather than a single demand, and giving the client time to process before requiring a decision",
      "The Apprentice, the College Tutor and the Workplace Mentor (with the Employer's training lead or HR sometimes attending as a fourth voice). The three-way review is the formal sit-down where progress is calibrated, gaps identified, and the next month's targets agreed. It's the structural mechanism that stops academic and practical sides drifting apart.",
      "Section 826 of BS 7671 covers Electrical Energy Storage Systems (EESS) and was added at the 18th Edition. It applies in addition to the rest of BS 7671 and to any product-specific standards (such as the IEC 62619 cell standard). The IET Code of Practice for Electrical Energy Storage Systems supplements Section 826 with practical guidance on siting, ventilation, fire separation, signage and emergency isolation. A4:2026 has refined parts of this framework as the technology has matured.",
    ],
    correctAnswer: 3,
    explanation:
      "Section 826 is the BS 7671 anchor; the IET Code of Practice for Electrical Energy Storage Systems (currently 2nd edition, 2020, with updated guidance for 2026) is the practical companion. MCS MIS 3012 governs the installer competence and product certification for Smart Export Guarantee eligibility. ENA G98 or G99 governs the grid connection. Four documents talk to each other on every BESS install.",
  },
  {
    id: 4,
    question:
      "A 5 kWh LFP wall-mounted battery is being fitted to a domestic garage. What are the headline siting considerations the apprentice should flag to the designer?",
    options: [
      "Cool, dry, ventilated location away from sources of ignition; not directly above or below escape routes; minimum clearances per the manufacturer's instructions for thermal management; not in a habitable room without a fire-rated enclosure or adequate fire separation; not in a loft (high temperature in summer, restricted access for emergency response); accessible for emergency isolation. The IET Code of Practice for Electrical Energy Storage Systems gives the framework. The manufacturer's installation manual is the binding instruction set; deviating from it voids the warranty and the BS 7671 compliance basis.",
      "Where an offence under HASAWA is committed by a body corporate (a limited company) and is proved to have been committed with the consent or connivance of, or attributable to neglect on the part of, a director, manager, secretary or similar officer, that individual ALSO commits the offence and is liable to personal prosecution. Relevant once you become Approved Electrician, then a senior, then potentially a director — your personal liability scales with your role.",
      "The Standard Assessment Procedure (SAP) is the methodology for calculating the energy performance of dwellings under Part L of the Building Regulations. It produces a SAP rating (1-100+) and a regulated CO₂ emissions figure that must beat the Target Emission Rate (TER). PV, heat pumps, MVHR, smart controls and fabric measures all feed into the SAP calculation. The MCS-certified installer's design pack typically includes the system's contribution to the SAP score; that contribution is what gets the building Building Regs sign-off.",
      "Phase 1: Temporary avoiding (separate the parties to prevent escalation while you prepare). Phase 2: Accommodating toward emotional needs (acknowledge both parties' feelings before addressing content). Phase 3: Collaborating on the technical issue (bring both parties together to find the best technical solution). Phase 4: If collaboration stalls on minor points, compromising to maintain progress. This multi-phase approach addresses both the emotional and technical dimensions",
    ],
    correctAnswer: 0,
    explanation:
      "The fire-safety story drives most siting decisions. A garage attached to the property typically passes the test if it has adequate ventilation and is not directly under an escape route. A loft fails on temperature grounds (summer roof voids hit 50+ degC, well outside the cell's safe operating window) and on emergency access grounds (fire service cannot easily reach a loft battery). A habitable room (lounge, hall) usually needs fire-rated enclosure construction to satisfy the Code of Practice.",
  },
  {
    id: 5,
    question:
      "What does the term thermal runaway mean in a lithium-ion context and why does it matter to the electrician?",
    options: [
      "The heat-loss calc determines the unit size, the flow temperature, the emitter design, the SCOP estimate and ultimately whether the customer is warm and the running costs match the quote. MCS MIS 3005 mandates a room-by-room heat-loss calculation per BS EN 12831 — fabric-by-fabric, with U-values for each wall / window / floor / roof element, ventilation losses by air change rate, design outdoor temperature for the location, design indoor temperature for each room. The result is the design heat load (kW) which sizes the unit. Skip it or fudge it and the system either oversizes (cycles inefficiently, premature compressor wear, poor SCOP) or undersizes (cannot meet load on cold days, customer freezes, complaint city). The L3 apprentice does not run the heat-loss calc but should recognise it as the foundation document of the whole install.",
      "Thermal runaway is a self-sustaining exothermic chemical reaction inside the cell. Once it starts in one cell (typically triggered by internal short circuit, mechanical damage, overcharge, or sustained over-temperature) the heat from that cell propagates to the next cell, which also enters runaway, and so on through the pack. The reaction releases flammable and toxic gases (including hydrogen fluoride and carbon monoxide) and can reach 600+ degC. Standard CO2 or dry-powder extinguishers do not stop a runaway battery — water is used to cool surrounding cells and limit propagation, but the cell itself burns until its energy is spent. This is why siting, fire separation and the BMS exist — to prevent and contain runaway.",
      "Treat the DC side as live until proven dead with a meter rated for the voltage. The DC isolator at the array end and the DC isolator at the inverter end must both be operated and locked-off, then verify dead with a meter at both ends of the string. Even with the inverter AC-side isolated and switched off, the array continues to generate as long as light hits the panels. Covering the panels reduces but does not eliminate the DC output. Inverter manufacturer's instructions usually require a dwell time after isolation to allow internal capacitors to discharge.",
      "The MCS-certified installer (or, for non-MCS installs, the contractor energising the system). The duty is set out in the Distribution Connection and Use of System Agreement (DCUSA) and is enforced via the licensee framework Ofgem oversees. Failure to notify is a breach of the connection conditions and can result in disconnection and loss of any export tariff. As an apprentice you do not sign the notification — but you should recognise that on the install team the duty has a named owner and a 28-day clock from energisation.",
    ],
    correctAnswer: 1,
    explanation:
      "The fire risk is real but rare with properly installed LFP packs from reputable manufacturers. The risk concentrates in damaged cells, counterfeit cells, salvage cells, and packs sited in conditions outside the manufacturer's spec (loft heat, no ventilation, mechanical damage). The apprentice's contribution to safety is straightforward: install per manual, do not modify, do not work on a damaged pack, brief the customer on emergency isolation. The IET Code of Practice covers the rest.",
  },
  {
    id: 6,
    question:
      "A customer with a 4 kWp PV array and 10 kWh battery is on a time-of-use tariff (cheap rate 02:00-06:00, expensive rate 16:00-19:00). How does the BESS deliver financial value beyond solar self-consumption?",
    options: [
      "A rotary cable stripper (Jokari Quadro, Knipex 16 95 02, BAHCO 4490) — sized to the SWA outer diameter, runs around the sheath cleanly and removes a length to expose the armour without scoring the inner cores. Stanley knives can do it but the risk of scoring the inner is high; rotary strippers are the standard. For the armour itself — separate tool (armour shears for smaller, angle grinder for bigger) covered in Sub 1.2.",
      "Reportable diseases (Reg 8 + Schedule 3) are work-related ill-health diagnoses — carpal tunnel syndrome from repetitive work, occupational asthma, hand-arm vibration syndrome, certain cancers attributable to a known carcinogen at work. Reportable dangerous occurrences (Reg 7 + Schedule 2) are events that COULD have caused injury — collapse of lifting equipment, escape of dangerous substances, electrical short circuit causing 24+ hours plant stoppage, structural collapse, certain hazardous-area incidents.",
      "Tariff arbitrage. The system controller can charge the battery from the grid during the cheap window and discharge during the expensive window, regardless of solar. On a tariff with a 25-30 p/kWh spread between cheap and expensive rates, the arbitrage saves a few hundred pounds a year on top of the solar self-consumption benefit. Over a 10-15 year battery life this can roughly double the system's lifetime value compared to solar self-consumption alone. The G98/G99 notification covers grid charging if the system can also export.",
      "Wood-pellet or wood-chip boilers and stoves. Burns sustainably-sourced biomass to drive a wet heating system. Counts as 'low-carbon' because the CO₂ released is offset by what the trees absorbed during growth (debated within the carbon accounting community). Fuel storage, ash handling and air-quality regulation (Clean Air Act zones; the Ecodesign Directive for new appliances) make biomass operationally heavier than gas or heat pumps. Best fit: rural off-gas-grid properties with space for a fuel store. Worst fit: urban smoke-control areas with poor PM2.5 ratings.",
    ],
    correctAnswer: 2,
    explanation:
      "Time-of-use arbitrage has become the dominant economic case for UK domestic batteries in 2024-2026 as Octopus Agile, Cosy and similar tariffs spread. The PV self-consumption case alone struggles to pay back a battery in 10 years; add arbitrage and the payback drops into the 6-8 year range. The Smart Export Guarantee covers any grid export. As an apprentice you should recognise that the inverter and the controller settings (charge windows, export profiles, grid-charge enabling) carry as much value as the hardware spec.",
  },
  {
    id: 7,
    question:
      "What is the role of the EPS (emergency power supply) or backup function on a domestic BESS and what is its limitation?",
    options: [
      "Cool, dry, ventilated location away from sources of ignition; not directly above or below escape routes; minimum clearances per the manufacturer's instructions for thermal management; not in a habitable room without a fire-rated enclosure or adequate fire separation; not in a loft (high temperature in summer, restricted access for emergency response); accessible for emergency isolation. The IET Code of Practice for Electrical Energy Storage Systems gives the framework. The manufacturer's installation manual is the binding instruction set; deviating from it voids the warranty and the BS 7671 compliance basis.",
      "Two responsibilities. (1) Identify the option set — what are the realistic repair / replace / redesign options for the specific fault? (2) Quantify the trade-offs — cost, lead time, reliability for each option. The DECISION is typically made by the senior / supervisor for non-trivial cases, OR by the customer based on the apprentice's options brief. The apprentice doesn't normally commit the firm to a specific repair / replace path on their own initiative — escalation to senior is the L3 expectation for commercial-impact decisions.",
      "BUS is the UK government grant scheme that contributes a fixed amount (currently £7,500) toward the cost of replacing a fossil-fuel boiler with a heat pump or biomass boiler. The customer applies via an MCS-certified installer who handles the application paperwork. Eligibility requires the install to be MCS-certified, the property to meet basic insulation standards (loft and cavity wall insulation where applicable), and the system to be designed per MCS MIS 3005. The grant does not change the electrical install — Section 753 (where applicable), general BS 7671, F-Gas boundary still apply. The L3 apprentice's wiring scope is unaffected; the customer's financial decision often is grant-dependent.",
      "EPS / backup is an optional inverter mode that lets the battery continue to feed selected circuits when the grid fails. Limitations: (1) the inverter must drop the grid connection cleanly first (anti-islanding) to keep DNO workers safe; (2) only the circuits wired to the backup output are powered, not the whole house; (3) the heat pump and EV charger usually exceed the backup inverter rating and are excluded; (4) the battery only runs for as long as its kWh lasts at the demand level; (5) PV charging during a cut depends on the inverter design — some hybrids can keep PV running off-grid, many cannot. Customers often expect 'whole-house indefinite backup' and get something much narrower; manage expectations early.",
    ],
    correctAnswer: 3,
    explanation:
      "Backup is sold heavily but delivers narrowly. A typical domestic BESS backup output is a 16 A or 32 A circuit serving lighting, sockets, fridge and boiler controls — not the heat pump, oven or shower. The BS 7671 framework for stand-alone operation sits in Section 712 (where PV is involved) and Section 826 (for the EESS aspects). MCS MIS 3012 covers the backup-mode commissioning requirements.",
  },
  {
    id: 8,
    question:
      "Why does a battery installation always require notification to the DNO even when the property already has a notified PV array?",
    options: [
      "Adding a battery changes the maximum potential export from the property and changes the inverter behaviour as seen from the network. ENA G98 (single-phase up to 16 A per phase) and G99 (above 16 A or three-phase) require the combined system to be notified. For a connect-and-notify install (G98) the installer notifies the DNO within 28 days of energising. For G99 the installer applies in advance and the DNO returns connection conditions before energising. The MCS-certified installer handles the paperwork; the apprentice should understand that the existing PV notification does not cover the added storage.",
      "The IET CoP is the practical implementation guide that walks through how to apply Section 722 on a real install — supply assessment, earthing arrangement choice, protective device selection, cable sizing, isolation, labelling, commissioning. Currently in its 5th edition with regular updates to track BS 7671 amendments and OZEV regulation changes. Not legally mandatory in itself but referenced by reasonable-installer expectations and by MCS / OZEV scheme requirements. The apprentice should recognise it as a practical companion to Section 722 — Section 722 is the legal floor; the IET CoP is the practical playbook.",
      "Multiple — typically one or more CT clamps on the main supply tails (live and sometimes neutral) feeding the EV charger's load management, the battery inverter's grid-export control, the HEMS's whole-property monitoring, and sometimes the heat pump's load-shifting logic. On a fully integrated install you may have 3-4 CT clamps in or near the consumer unit, each reading the same physical conductor and feeding a different consumer of that data. The apprentice's job is to install each clamp around the correct conductor in the correct orientation per the manufacturer's instructions for each consuming device.",
      "Assessment of the risks from substances hazardous to health (Reg 6); prevention or control of exposure (Reg 7) using the hierarchy of control (eliminate, substitute, engineer, system of work, PPE); use and maintenance of control measures (Reg 8–9); monitoring of exposure (Reg 10); health surveillance where appropriate (Reg 11); information, instruction and training (Reg 12); arrangements for accidents, incidents and emergencies (Reg 13).",
    ],
    correctAnswer: 0,
    explanation:
      "Every change to the generation or storage profile triggers a re-notification. The DNO needs to model the local network correctly — a property that previously exported 4 kW peak and now exports 7 kW (with battery support) changes the load on the local feeder. Most domestic BESS retrofits sit comfortably inside G98; larger installs and three-phase properties tip over into G99. A4:2026 has refined the BS 7671 references to G98/G99 alongside the technical updates.",
  },
];

const faqs = [
  {
    question: "Are domestic battery systems safe? The news has stories about lithium fires.",
    answer:
      "Properly installed LFP domestic batteries from reputable manufacturers have an extremely low fire incidence. The fire stories that make the news typically involve e-bike and e-scooter batteries (often counterfeit, often damaged, often charged with non-OEM chargers) or older NMC products fitted in unsuitable locations. A modern LFP wall-mounted unit, sited per the manufacturer's instructions and the IET Code of Practice for Electrical Energy Storage Systems, fitted by an MCS-certified installer, presents a manageable risk that customers should understand but not be alarmed by. The chemistry choice (LFP not NMC) is the single biggest safety factor.",
  },
  {
    question: "Why can a battery sometimes export more than the PV array can produce?",
    answer:
      "Because the battery has its own inverter rating that is independent of the PV inverter's rating. A 4 kWp PV array with a 4 kW inverter can only ever export 4 kW from PV; add a 5 kW battery inverter and the property can export 5 kW from the battery on top, for a peak combined export of around 9 kW. The DNO needs to know about this because the local network has been designed around an assumed peak export. ENA G98 covers up to 16 A per phase (about 3.68 kW single-phase) for connect-and-notify; anything larger needs a G99 application before energising.",
  },
  {
    question: "Does the customer need MCS certification on the battery installation?",
    answer:
      "MCS certification is required for the installer if the customer wants Smart Export Guarantee payments for any electricity exported, and is generally required by reputable insurers and warranty schemes. MIS 3012 is the relevant MCS standard. A non-MCS install may still be technically compliant with BS 7671 Section 826 but the customer loses access to SEG payments and may have insurance complications. As an apprentice on an MCS install you contribute the wiring; the MCS-certified person signs off the design and the commissioning.",
  },
  {
    question: "What is the difference between a hybrid inverter and a battery inverter?",
    answer:
      "A hybrid inverter combines PV input, battery input and AC grid output in one box — used in DC-coupled systems where PV and battery are designed together. A battery inverter handles only the battery's DC-AC conversion; the PV stays on its existing PV inverter. Used in AC-coupled retrofits where the existing PV install is left alone and a separate battery inverter is added. Both are AC-side equipment from the apprentice's wiring perspective; both need DC and AC isolation per BS 7671 Section 712 / 826.",
  },
  {
    question: "Can a battery be fitted without solar PV?",
    answer:
      "Yes — battery-only installs are increasingly common on time-of-use tariffs. The system charges from the grid during the cheap window and discharges during the expensive window, capturing the tariff spread. No solar required. The DNO notification under G98 / G99 still applies because the battery still has an inverter that can export. The MCS certification for the installer is optional in this case (no Smart Export Guarantee involvement) but most reputable installers still hold it.",
  },
  {
    question: "How long does a domestic battery last and what does the warranty actually cover?",
    answer:
      "Modern LFP packs are typically warranted for 10 years or 6,000-10,000 cycles, whichever comes first, with a residual capacity guarantee at end-of-warranty (commonly 70-80 percent of nameplate). At normal domestic cycling (around one cycle per day) you reach the calendar limit before the cycle limit — so plan for around 10-15 years of useful life. The warranty covers manufacturing defects and capacity fade beyond the residual threshold. It does not cover damage from incorrect installation, water ingress, mechanical damage or operation outside the manufacturer's environmental envelope. Following the install manual is the warranty's main pre-condition.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 3"
            title="Battery energy storage systems (BESS)"
            description="Battery storage at recognition level for the L3 electrician — what the topology choices mean, why the chemistry choice matters for safety, where BS 7671 and the IET Code of Practice for Electrical Energy Storage Systems sit, and how the customer financial case actually works."
            tone="emerald"
          />

          <TLDR
            points={[
              "All domestic batteries store DC. The DC-vs-AC-coupled choice is about where the conversion happens — DC-coupled (hybrid inverter, PV+battery designed together) is more efficient; AC-coupled (separate battery inverter) is the retrofit default.",
              "LFP (lithium iron phosphate) dominates UK domestic installs because of its higher thermal runaway threshold and safer failure mode. NMC packs more energy per kg but the safety margin matters more than the size for wall-mounted domestic units.",
              "The BMS (battery management system) is the safety-critical electronic controller embedded in the pack. Comms cable from BMS to inverter is as important as the power conductors — most failed commissionings trace to the comms link.",
              "BS 7671 Section 826 is the EESS regulation anchor; the IET Code of Practice for Electrical Energy Storage Systems is the practical companion; MCS MIS 3012 covers installer competence; ENA G98/G99 covers grid notification.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the difference between DC-coupled and AC-coupled battery topologies and identify when each is typically specified.",
              "Compare LFP and NMC lithium chemistries and explain why LFP dominates UK domestic installations on safety grounds.",
              "Describe the role of the battery management system (BMS) and the comms interface between the BMS and the inverter.",
              "Identify the regulation map for a domestic BESS — BS 7671 Section 826, IET Code of Practice for EESS, MCS MIS 3012, ENA G98 / G99.",
              "Explain the customer financial case for storage including PV self-consumption and time-of-use tariff arbitrage.",
              "Recognise the limitations of the EPS / backup function and brief the customer accurately on what backup actually delivers.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Topology — DC-coupled and AC-coupled</ContentEyebrow>

          <ConceptBlock
            title="All batteries store DC — the choice is where the conversion happens"
            plainEnglish="A battery cell is a DC device. The customer's appliances and the grid run on AC. So every BESS includes a power-conversion stage. The two architectures differ in where that stage sits and how many times energy is converted between DC and AC on its way in and out of the battery."
            onSite="DC-coupled systems put PV array, battery and AC inverter on a single shared DC bus inside a hybrid inverter. PV charges battery with one DC-DC conversion (very efficient). When the battery discharges to the property, one DC-AC conversion. Round-trip efficiency typically 90-95 percent. Best for new builds where PV and battery are designed together. AC-coupled systems leave the existing PV inverter in place — PV runs to AC as before — and add a separate battery inverter on the AC side. The battery converts AC to DC to charge, and DC to AC to discharge — two extra conversions. Round-trip efficiency typically 85-90 percent. The cost of those extra conversions is offset by the freedom to retrofit onto any existing PV install without re-touching the PV side."
          >
            <p>
              Topology comparison at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC-coupled (hybrid inverter)</strong> — single hybrid inverter handles PV, battery and grid. Common manufacturers: SolarEdge StorEdge, GivEnergy AIO, Tesla Powerwall 3 (PV input integrated), Sungrow SH series.
              </li>
              <li>
                <strong>AC-coupled (separate battery inverter)</strong> — existing PV inverter stays untouched; a battery inverter sits on the AC side. Common: Tesla Powerwall 2 (battery inverter built in), Pylontech with separate Victron / Solis inverter, GivEnergy AC-coupled units.
              </li>
              <li>
                <strong>Hybrid retrofit</strong> — replacing the existing PV inverter with a hybrid is sometimes done when the original PV inverter is end-of-life. Increases upfront cost but recovers some round-trip efficiency.
              </li>
            </ul>
            <p>
              The apprentice's job is to follow the system designer's topology choice — not to second-guess it on site. But understanding why one was chosen helps when the customer asks why their system looks different from their neighbour's.
            </p>
          </ConceptBlock>

          <VideoList
            title="Watch — battery chemistry and the inverter that links it to the grid"
            videos={[
              {
                url: videos.batteries.url,
                title: videos.batteries.title,
                channel: videos.batteries.channel,
                duration: videos.batteries.duration,
                topic: 'How a battery cell stores and releases energy',
              },
              {
                url: videos.inverter.url,
                title: videos.inverter.title,
                channel: videos.inverter.channel,
                duration: videos.inverter.duration,
                topic: 'The hybrid / battery inverter at the heart of every BESS',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Chemistry — LFP vs NMC</ContentEyebrow>

          <ConceptBlock
            title="The chemistry choice is the single biggest safety variable"
            plainEnglish="Two lithium chemistries dominate the market. LFP (lithium iron phosphate, LiFePO4) has lower energy density (kWh per kg) but a much higher thermal runaway threshold (around 270 degC) and a safer failure mode. NMC (nickel manganese cobalt) packs more energy per kg but enters thermal runaway at around 150 degC and releases more energy and more toxic gas during a runaway event."
            onSite="UK domestic wall-mounted systems are almost universally LFP in 2024-2026 — Tesla Powerwall 3, BYD Battery-Box Premium HVS / HVM, Pylontech US3000C / Force series, GivEnergy Giv-Bat, Fox ESS EP-series. NMC still appears in EVs (where mass-per-kWh matters more than thermal margin) and in some commercial high-energy-density containerised systems. The IET Code of Practice for Electrical Energy Storage Systems leans strongly toward LFP for domestic indoor applications. As the apprentice, read the chemistry off the data sheet and confirm it is what the customer was sold."
          >
            <p>
              Chemistry trade-offs at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LFP (LiFePO4)</strong> — thermal runaway around 270 degC. Cycle life 6,000-10,000+ at 80-90 percent DoD. Energy density around 90-120 Wh per kg. Slower charge/discharge than NMC but adequate for domestic. Dominant choice for UK domestic.
              </li>
              <li>
                <strong>NMC (lithium nickel manganese cobalt)</strong> — thermal runaway around 150 degC. Cycle life 1,000-3,000 at deeper DoD. Energy density around 150-220 Wh per kg. Higher charge/discharge rates. Used in EVs, high-end performance applications, some commercial.
              </li>
              <li>
                <strong>Older lead-acid / AGM</strong> — found in legacy off-grid and some early BESS installs. Much shorter cycle life (a few hundred cycles), lower DoD, much lower energy density. Effectively obsolete for new domestic installs.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 826 (Electrical Energy Storage Systems)"
            clause={
              <>
                "The requirements of this section apply to electrical installations incorporating Electrical Energy Storage Systems (EESS) operating up to 1500 V DC and 1000 V AC. The requirements supplement and modify the general requirements of this Standard."
              </>
            }
            meaning={
              <>
                Section 826 is the BS 7671 anchor for every electrical energy storage installation. It applies in addition to (not instead of) the general regulations and any product-specific standards (IEC 62619 for industrial cells, IEC 62933 for systems). A4:2026 has refined parts of the framework as the technology has matured — specifically around isolation, signage and the DC side. The IET Code of Practice for Electrical Energy Storage Systems (currently 2nd edition with 2026 update) gives the practical implementation guidance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 826 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026, and the IET Code of Practice for Electrical Energy Storage Systems)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The BMS — what makes a lithium pack safe</ContentEyebrow>

          <ConceptBlock
            title="The battery management system is non-negotiable"
            plainEnglish="A lithium-ion pack without a working BMS is unsafe. The BMS monitors per-cell voltage and temperature, balances cells during charge, disconnects the pack via internal contactors if any parameter exits the safe operating envelope, and reports state to the inverter. Every reputable domestic battery ships with the BMS factory-fitted inside the pack enclosure."
            onSite="The electrical interface to a BESS is two things: the power conductors (DC from battery to inverter, sized per the manufacturer's instructions) AND the BMS comms cable to the inverter. The comms cable is usually CAN-bus or RS485; the connector type and pinout vary by manufacturer; the install manual is the binding source. Most failed commissionings trace to the comms link being wrong (incorrect cable type, swapped polarity, wrong port on the inverter, unterminated bus). The apprentice's job is to follow the install manual exactly — there is no general rule for BMS comms."
          >
            <p>
              What the BMS protects against:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Over-charge</strong> — disconnects the charge path if any cell exceeds its upper voltage limit. Without this, lithium plating and runaway risk rise sharply.
              </li>
              <li>
                <strong>Over-discharge</strong> — disconnects the load path if any cell falls below its lower voltage limit. Cells over-discharged below threshold suffer permanent capacity loss.
              </li>
              <li>
                <strong>Over-temperature</strong> — disconnects if pack temperature exceeds the safe limit. Charging in cold (below 0 degC for most chemistries) is also blocked.
              </li>
              <li>
                <strong>Over-current</strong> — disconnects in the event of a short or sustained over-load.
              </li>
              <li>
                <strong>Cell imbalance</strong> — passive or active balancing during charge keeps individual cells within mV of each other. Without balancing, the weakest cell limits the whole pack and runaway risk concentrates on it.
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

          <ContentEyebrow>The customer financial case</ContentEyebrow>

          <ConceptBlock
            title="Solar self-consumption plus tariff arbitrage drive payback"
            plainEnglish="Two financial mechanisms now define the domestic battery payback equation. First, solar self-consumption — the battery time-shifts surplus PV from midday to evening loads, raising the percentage of solar energy used on-site rather than exported at the lower SEG rate. Second, time-of-use tariff arbitrage — the battery charges from the grid during the cheap window (e.g. Octopus Go 02:00-06:00) and discharges during the expensive window (16:00-19:00) regardless of solar."
            onSite="As an apprentice you do not size or price the system — that is the MCS-certified designer's job. But customers ask the trade they trust, and an honest answer about realistic payback is appropriate. Solar self-consumption alone struggles to pay back a battery in 10 years on UK numbers. Add tariff arbitrage on a modern dynamic tariff (Octopus Agile, Cosy, Intelligent Octopus Go) and the payback drops into the 6-8 year range for a well-sized system. The system controller settings carry as much value as the hardware spec — the inverter has to be told to charge from the grid in the cheap window."
          >
            <p>
              Three numbers the customer will care about:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Usable kWh</strong> — what the BMS will actually let you cycle, not the nameplate. Determines runtime and arbitrage value per day.
              </li>
              <li>
                <strong>Round-trip efficiency</strong> — the percentage of energy that comes back out compared to what went in. Typically 85-95 percent depending on topology and inverter quality. Charging at 30 p/kWh and getting back 0.9 x that on the discharge side erodes margin.
              </li>
              <li>
                <strong>Cycle life and warranty</strong> — total kWh-throughput before capacity drops below the warranty threshold. Determines total lifetime value at any given energy spread.
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

          <ContentEyebrow>Backup function — what it does and does not do</ContentEyebrow>

          <ConceptBlock
            title="EPS / backup is sold as 'whole-house power cut protection' — the reality is narrower"
            plainEnglish="Most modern hybrid and battery inverters offer an Emergency Power Supply (EPS) or backup mode. When the grid drops out, the inverter disconnects from the grid (anti-islanding required by ENA G98/G99) and continues to feed selected backup circuits from the battery. Customers often expect 'whole-house indefinite backup'. The reality is one or two circuits, sized to the inverter's backup output, running for as long as the battery's kWh holds out at the actual demand."
            onSite="Wire the backup circuits per the system designer's sketch — typically lighting, a fridge socket, the boiler controls and one general-purpose socket. Heat pumps, EV chargers, ovens, electric showers and induction hobs almost always exceed the backup inverter rating and are excluded. The changeover is automatic on grid loss; the customer should be briefed on which sockets are 'backup' so they know where to plug critical loads. PV charging during a cut depends on the inverter design — some hybrids can keep PV running off-grid, many cannot."
          >
            <p>
              Backup expectation calibration:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inverter backup rating</strong> — typically 3-7 kW continuous on a domestic system. Sized for lights and small loads, not for showers and ovens.
              </li>
              <li>
                <strong>Battery runtime</strong> — usable kWh divided by load. A 10 kWh battery feeding a 500 W steady backup load runs for 20 hours; feeding a 3 kW load runs for about 3 hours.
              </li>
              <li>
                <strong>Cold start</strong> — some systems need grid present to start the inverter from off; others can cold-start from battery alone. Check the spec.
              </li>
              <li>
                <strong>Anti-islanding</strong> — mandatory under G98/G99. The inverter must drop the grid connection within ms of grid loss to keep DNO workers safe during the outage.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="End-of-life and the WEEE / Hazardous Waste pathway"
            plainEnglish="Lithium battery packs are classed as hazardous waste under the Hazardous Waste Regulations and Waste Electrical and Electronic Equipment Regulations. They cannot go to landfill; they cannot go to general WEEE recycling alongside dead toasters. End-of-life batteries are handled by authorised battery treatment centres via specialist licensed waste carriers, often arranged via the manufacturer&apos;s producer compliance scheme."
            onSite="If a pack is being decommissioned (warranty replacement, customer change of system, fire-damaged unit), do not 'put it in the van and take it to the tip'. Confirm the chemistry, isolate fully, leave terminals safely insulated, and arrange collection through the manufacturer or an authorised battery waste carrier. ADR (Carriage of Dangerous Goods by Road) applies to lithium battery transport above small thresholds — your van and your driver may need ADR competence if you transport packs commercially. The licensed waste carrier handles compliance for you."
          >
            <p>
              The end-of-life decision tree:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manufacturer take-back</strong> — most reputable manufacturers
                (Tesla, BYD, GivEnergy, Pylontech, Fox ESS) offer end-of-life return via
                their own producer compliance scheme. Your first call.
              </li>
              <li>
                <strong>Specialist battery waste carrier</strong> — licensed under the
                Environment Agency / SEPA / NRW. Provides ADR-compliant transport, packs
                the cells safely, and routes to an authorised battery treatment facility.
              </li>
              <li>
                <strong>Fire-damaged or thermally-distressed packs</strong> — do not move
                without specialist advice. The fire service and the battery manufacturer
                are the right first calls. The pack may need to be safely discharged or
                placed in a thermal containment vessel before transport.
              </li>
              <li>
                <strong>Documentation</strong> — every transfer of hazardous waste needs a
                consignment note (Hazardous Waste Consignment Note in England / Wales,
                Special Waste Consignment Note in Scotland). The licensed carrier
                generates this; you keep the copy as evidence of compliant disposal for
                three years.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ENA Engineering Recommendation G98 — Connect-and-notify framework for inverter-connected generation up to 16 A per phase"
            clause={
              <>
                "Generation that may be connected without prior application to the DNO, subject to the installation being notified to the DNO within 28 days of energising. The installer is responsible for ensuring the protection settings, anti-islanding and disconnection arrangements comply with the requirements of EREC G98."
              </>
            }
            meaning={
              <>
                G98 covers most domestic single-phase BESS retrofits — typical inverter ratings of 3-7 kW per phase fit comfortably. Larger or three-phase installations cross into ENA G99 (apply in advance, DNO returns connection conditions before energising). The MCS-certified installer files the notification; the apprentice should understand that adding a battery to an existing notified PV install triggers a re-notification because the export profile changes. A4:2026 has refined the BS 7671 references to G98/G99.
              </>
            }
            cite="Source: ENA Engineering Recommendation G98 (paraphrased from the latest issue published by Energy Networks Association)."
          />

          <SectionRule />

          <ContentEyebrow>DC isolation, signage and the rapid-shutdown question</ContentEyebrow>

          <ConceptBlock
            title="DC isolation has to be local, lockable and labelled — A4:2026 tightened the requirements"
            plainEnglish="A battery cannot be 'switched off' the way an AC supply can. The DC bus from the pack to the inverter remains live as long as the pack is in service, even when the AC side is isolated. So every BESS install needs a DC isolator close to the battery, accessible to firefighters and second-line responders, lockable in the off position, and clearly labelled to identify what it isolates and what it does NOT (the cells inside the pack remain live regardless of any external isolator)."
            onSite="The IET Code of Practice for Electrical Energy Storage Systems is explicit on signage — battery enclosure, DC isolator, AC isolator and consumer unit all need labels identifying the EESS and routing the responder to the master isolation point. A4:2026 has tightened the labelling and isolation requirements for both PV and EESS in residential premises. Standard kit on a competent install: yellow EESS warning triangle on the enclosure, 'isolate before maintenance' sticker by every isolator, and a single-line schematic on the inside of the consumer unit door identifying every generation / storage source on the installation."
          >
            <p>
              The minimum signage and isolation set:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC isolator at the pack</strong> — local, lockable, visible. Identifies
                the battery DC supply to the inverter. Required even when the inverter has
                an integrated DC switch.
              </li>
              <li>
                <strong>AC isolator at the inverter</strong> — local, lockable, visible. The
                grid-side breaker that drops the inverter from the consumer unit.
              </li>
              <li>
                <strong>Master switch identification</strong> — the consumer unit door labels
                every additional source — PV array, BESS, EVCS — with its dedicated MCB and
                isolation route. Helps DNO, fire service and any future installer identify
                what is on the system.
              </li>
              <li>
                <strong>Battery hazard warning</strong> — yellow triangle with battery
                pictogram on the pack enclosure. Some manufacturers also require additional
                fire-service-information signage giving chemistry, capacity and emergency
                shutdown procedure.
              </li>
              <li>
                <strong>Single-line schematic</strong> — fixed inside the consumer-unit door
                or in a dedicated information pack near the meter. Required by the IET Code
                of Practice for any installation with on-site generation or storage.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cable sizing and the DC side</ContentEyebrow>

          <ConceptBlock
            title="DC sizing is high-current at low voltage — voltage drop matters more than CCC"
            plainEnglish="A typical domestic battery pack runs at 48 V or 100-400 V DC. At 48 V a 5 kW discharge means around 100 A flowing in the DC cables; at 400 V the same 5 kW is just 12-13 A. Either way the manufacturer specifies a minimum cable size, a maximum run length and the DC OCPD type and rating. Following those numbers exactly is non-negotiable — DC arcing and DC isolator selection are not the same as AC."
            onSite="Read the manual before you cut anything. Pack manufacturers specify the conductor type (typically tin-plated flexible Class 5/6 multi-strand), the minimum CSA, the maximum run length and the lug crimp standard (usually with a calibrated hex crimp tool). Voltage drop on the DC side is your binding constraint at 48 V — a 6 mm2 run that is fine for 100 A on AC voltage-drop terms is well outside the manufacturer&apos;s spec on a 48 V pack because the relative drop is so much larger. DC isolators must be DC-rated and polarity-marked; an AC-rated isolator on a DC circuit is a fire and arc hazard."
          >
            <p>
              Three sizing rules that catch out apprentices coming in from AC-only work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage drop dominates at low DC voltage</strong> — at 48 V the
                acceptable drop in absolute volts is tiny (1.5 V on a 48 V system is over
                3 percent). Length and CSA are pushed upward to keep within manufacturer
                limits. At 400 V HV battery the same 1.5 V is &lt;0.5 percent and CSA is
                normally driven by current, not drop.
              </li>
              <li>
                <strong>OCPD selection is DC, not AC</strong> — DC fuses (gPV / gBat type)
                or DC MCBs rated for the pack&apos;s short-circuit current. AC MCBs will
                not interrupt a DC fault — the arc does not naturally extinguish at zero
                crossing because there is none.
              </li>
              <li>
                <strong>Polarity is fixed and matters</strong> — DC connectors (MC4,
                Anderson, manufacturer-proprietary) are keyed for polarity. Reversed
                polarity on commissioning normally trips the BMS protection and may
                damage the inverter input stage. Confirm polarity with a multimeter
                before final make-off.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Chapter 57 (stationary secondary battery installations)"
            clause={
              <>
                For the purposes of Chapter 57, &apos;stationary secondary battery installations&apos;
                refers to batteries whose designed purpose is for storage and supply of electrical
                installations. This chapter addresses those stationary batteries intended to provide
                electrical energy storage and supply to installations rather than portable or
                product-integrated batteries.
              </>
            }
            meaning={
              <>
                A wall-mounted home battery sits squarely under Chapter 57 (and Section 712
                where it&apos;s integrated with PV). A pluggable UPS or a battery inside a
                certified emergency-lighting unit does not — those follow their own product
                standards. Knowing which side of the line a given pack sits on tells you which
                rules to read.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 57."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Bypassing the BMS comms link or running 'just the power conductors' to test"
            whatHappens={
              <>
                Pack does not commission. Inverter sits in fault state. Apprentice spends an hour checking power-side terminations when the actual fault is the unconnected (or wrongly-connected) BMS comms cable. Some systems will not even come up to a measurable DC voltage at the terminals without the BMS releasing the contactors — the pack looks 'dead' but is in fact functioning correctly and waiting for a comms handshake.
              </>
            }
            doInstead={
              <>
                Read the manufacturer's commissioning sequence before you crimp anything. Identify the BMS comms cable type and pinout. Confirm which inverter port it lands on and whether bus termination is required. Power up in the order the manual specifies. If the system does not commission, the comms cable is your first suspect, not the power side.
              </>
            }
          />

          <CommonMistake
            title="Siting a wall-mounted lithium battery in a loft or unventilated cupboard"
            whatHappens={
              <>
                The pack runs outside its safe temperature envelope. Summer loft voids hit 50+ degC; an unventilated cupboard with a 3 kW inverter dissipating heat can reach similar levels. The BMS will throttle or trip the pack, and warranty and insurance both risk being voided. In a worst-case fault the lack of ventilation accelerates propagation between cells. The IET Code of Practice for Electrical Energy Storage Systems explicitly excludes lofts as a suitable location for domestic BESS.
              </>
            }
            doInstead={
              <>
                Site per the manufacturer's instructions and the IET Code of Practice — cool, dry, ventilated location away from sources of ignition, accessible for emergency isolation, not above or below escape routes, not in a habitable room without fire-rated separation, not in a loft. Garage and utility room are typical compliant locations for domestic. Confirm minimum clearances around the unit for thermal management.
              </>
            }
          />

          <Scenario
            title="Customer wants 'unlimited backup power' from their new battery"
            situation={
              <>
                You are on site for a 13.5 kWh AC-coupled battery retrofit onto an existing 4 kWp PV array. The customer mentions in passing that the main reason they are buying the battery is so that 'when there is a power cut, the whole house keeps running'. They have a heat pump, an EV charger, an electric oven and an induction hob.
              </>
            }
            whatToDo={
              <>
                Pause and brief the customer before commissioning. The backup inverter on this system is rated at 5 kW continuous and is wired to feed only the lighting circuit, the fridge socket, the boiler controls and one utility-room socket. The heat pump (typically 3-7 kW running), the EV charger (7 kW), the oven (3-4 kW) and the induction hob (3-7 kW) are all on non-backup circuits and will remain dead during a grid outage. The 13.5 kWh pack feeding an average 500 W backup load runs for around 27 hours; feeding a 3 kW load runs for around 4 hours. The customer's 'unlimited' expectation is wrong; their actual backup is real but narrow. Get this conversation out of the way before handover, in writing, ideally with a sticker on the consumer unit identifying the backup circuits.
              </>
            }
            whyItMatters={
              <>
                Backup is the most over-sold and most under-explained part of the BESS proposition. Customers who expect whole-house indefinite backup and get one circuit and a few hours feel mis-sold even when the install is technically perfect. The MCS Code of Practice requires installers to give honest, evidence-based information about expected performance. As the apprentice you are often the person on site at handover; an honest five-minute conversation about what backup actually does saves a complaint call later.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "All batteries store DC. The DC-vs-AC-coupled choice is about where the conversion happens — DC-coupled hybrid (designed-together PV+battery) is more efficient; AC-coupled (separate battery inverter) is the retrofit default.",
              "LFP dominates UK domestic installs. Higher thermal runaway threshold (around 270 degC vs 150 degC for NMC) and safer failure mode outweigh the lower energy density for wall-mounted units.",
              "The BMS is the safety-critical electronic controller embedded in every Li-ion pack. The BMS comms cable to the inverter is as important as the power conductors — most failed commissionings trace to the comms link.",
              "BS 7671 Section 826 covers EESS; the IET Code of Practice for Electrical Energy Storage Systems is the practical companion; MCS MIS 3012 covers installer competence; ENA G98/G99 covers grid notification.",
              "Usable kWh, not nameplate kWh, determines runtime and arbitrage value. Read the spec sheet — manufacturers cap usable capacity to extend cycle life.",
              "Tariff arbitrage on dynamic time-of-use tariffs has become the dominant economic case for UK domestic batteries in 2024-2026. PV self-consumption alone rarely pays back in 10 years; arbitrage drops payback into the 6-8 year range.",
              "EPS / backup is real but narrow — selected circuits at the inverter's backup rating, for as long as the kWh lasts. Heat pumps, EV chargers and ovens are normally excluded. Brief the customer accurately before handover.",
              "Loft installation of a Li-ion pack fails the IET Code of Practice on temperature and emergency-access grounds. Garage and utility room are typical compliant locations for domestic systems.",
            ]}
          />

          <Quiz title="Battery energy storage systems — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 Main types and characteristics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 EV charging deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
