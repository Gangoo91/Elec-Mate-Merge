/**
 * Module 2 · Section 1 · Subsection 1 — Principles of environmental technology systems
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.1
 *   AC 1.1 — "describe the principles of operation and benefits of environmental technology
 *             systems and their significance to the environment"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.1 (operating principles) and Unit 312 ELTP02 / AC 3.1
 * (provide information on operational requirements and benefits).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed PV/HP/EV competence
 * belongs in MCS standalone quals (2399 / 2919 / 2921) not 2365-03.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Principles of environmental technology systems (1.1) | Level 3 Module 2.1.1 | Elec-Mate';
const DESCRIPTION =
  'How environmental technology systems work in principle — energy harvest, energy upgrade, energy recovery and demand reduction. The four operating principles behind PV, heat pumps, MVHR and the rest of the family, plus why they matter for net-zero electrical work.';

const checks = [
  {
    id: 'l3-m2-s1-sub1-principles',
    question:
      'A customer asks why an air-source heat pump can deliver more heat energy than the electrical energy it consumes. What\'s the honest answer?',
    options: [
      "WEEE removed during install or repair must be segregated from general waste and routed to an Approved Authorised Treatment Facility (AATF) for recovery and recycling. The waste producer (you or your employer) holds the Duty of Care under the Environmental Protection Act 1990 to ensure the waste is properly described, transferred to an authorised waste carrier, and accompanied by a waste transfer note that is retained for at least two years. Many electrical wholesalers operate as WEEE collection points under the Distributor Take-Back Scheme.",
      "The Environment Agency. The EA operates the consignment note tracking system, the waste carrier registration system, the environmental permit register and the public lookup tools. SEPA (Scotland), Natural Resources Wales (NRW) and the Northern Ireland Environment Agency (NIEA) cover the equivalent functions in their respective territories. Civil sanctions, variable monetary penalties and criminal prosecution are all available where breaches are detected, and the agencies publish enforcement bulletins regularly.",
      "Refuse politely and escalate. Refrigerant top-up is a regulated F-Gas activity that requires individual F-Gas certification (Category I covers stationary refrigeration, AC and heat pumps) and is only legal when the company also holds an F-Gas company certificate. Doing the work uncertified exposes you, your employer and the customer to enforcement action and voids the manufacturer warranty. The correct answer is to document the request, decline, and rebook the F-Gas engineer.",
      "It doesn't create energy — it moves it. Electrical energy is used to drive a vapour-compression cycle that lifts low-grade heat from outside air up to a useful temperature for the wet system. The electricity provides the work; the heat comes from the air. The ratio of heat output to electrical input is the COP (coefficient of performance), typically 2.5-4.5 depending on conditions. Energy is conserved — the system is an upgrader, not a generator.",
    ],
    correctIndex: 3,
    explanation:
      "Heat pumps are the textbook 'energy upgrade' principle. They consume electrical work to move heat from a cold reservoir (outside air, ground, or water) to a hotter reservoir (the wet heating system). The first law of thermodynamics is satisfied — total energy in equals total energy out. The COP simply measures how much useful heat each kilowatt-hour of electricity moves. Customers often hear 'free heat' marketing claims — the honest framing is 'cheap heat, paid for by clever physics'.",
  },
  {
    id: 'l3-m2-s1-sub1-pv-principle',
    question:
      'In a domestic PV array on a UK roof, what physically happens when photons hit the cell?',
    options: [
      "The duty to make reasonable adjustments. Where a provision, criterion or practice (PCP), a physical feature, or the absence of an auxiliary aid puts a disabled person at a substantial disadvantage compared to non-disabled people, the employer must take such steps as it's reasonable to take to avoid the disadvantage. The duty is positive — the employer must act, not just refrain from discriminating.",
      "Photons with enough energy knock electrons free in the silicon's depletion region. The cell's built-in electric field pushes those free electrons toward the front contact, leaving holes that flow to the back. That separation of charge across the cell is the DC voltage; the DC current is the rate of charge separation. An inverter then converts that DC into mains-synchronised AC for the property and the grid.",
      "Apprentices complete practical tasks (Concrete Experience), reflect during the task (reflection-in-action), discuss afterwards (reflection-on-action and Reflective Observation), draw conclusions (Abstract Conceptualisation), and apply improvements on the next task (Active Experimentation)",
      "Combination pliers — heavy-duty grip, twisting solid conductors, pulling cable through tight runs, light cutting of soft material. Side cutters (sometimes called diagonal cutters or 'snips') — flush cutting of insulated and bare conductor, trimming cable ends. Long-nose pliers — forming loops, reaching into recessed terminals, holding small components while you tighten. One job each, no overlap if you can help it.",
    ],
    correctIndex: 1,
    explanation:
      "PV is the 'energy harvest' principle — photons in, electrons out, no moving parts. The photovoltaic effect is governed by the bandgap of silicon (~1.1 eV); only photons with enough energy generate carriers, the rest is wasted as heat. UK roofs typically yield 800-1100 kWh per kWp per year — modest, but the array runs unattended for 25+ years and the carbon payback is 1-3 years on UK grid mix. Section 712 of BS 7671 (extensively revised in A4:2026) governs the electrical side.",
  },
  {
    id: 'l3-m2-s1-sub1-mvhr-principle',
    question:
      'Why does a well-designed MVHR (mechanical ventilation with heat recovery) system actually reduce a building\'s heating bill rather than increase it?',
    options: [
      "The monthly review brings together the apprentice, the employer (or supervisor) and the training provider's tutor or assessor. The review discusses progress on the apprenticeship standards, on-the-job competence, off-the-job training hours, any concerns from any side, and actions for the next month. The form is a record of the review and is part of the audit trail for the apprenticeship's compliance with the standards.",
      "A BSI Publicly Available Specification — \\\"PAS 63100:2024 Electrical installations. Protection against fire of battery energy storage systems intended for use in dwellings\\\" — that sets out fire safety requirements for domestic battery storage, including location restrictions, separation distances from sleeping accommodation and escape routes, fire detection requirements and segregation from combustibles.",
      "It recovers heat that would otherwise be lost in extracted ventilation air. Stale warm air from kitchens and bathrooms is drawn through one side of a counter-flow heat exchanger; fresh cold supply air is drawn through the other side. 80-90% of the heat in the extract air transfers to the supply air. The fan power consumed is small compared to the heat recovered, especially in well-insulated, airtight homes that need controlled ventilation anyway. Net effect: lower heat-loss bill.",
      "MIS 3002 is the MCS installer-competence and product-certification standard required for the customer to claim Smart Export Guarantee payments and demonstrate quality assurance. The IET Code of Practice is the practical implementation guide that walks through how to apply BS 7671 Section 712 on a real install — system architecture, cable selection, protective devices, labelling, commissioning. Both reference each other; both should be on the bench when the MCS designer is producing the install drawings. Neither replaces BS 7671 — Section 712 is the legal floor; MIS 3002 and the IET CoP build on top.",
    ],
    correctIndex: 2,
    explanation:
      "MVHR is the 'energy recovery' principle. In a leaky house, ventilation heat loss is unavoidable and uncontrolled. In an airtight house, MVHR makes ventilation deliberate and recovers most of the heat. SAP (Standard Assessment Procedure) credits MVHR with significant whole-house energy savings when installed properly. The catch: it only works if the building envelope is airtight enough — fitting MVHR to a draughty Victorian terrace usually loses money.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which four operating principles cover the bulk of environmental technology systems an electrician will see on UK installs?',
    options: [
      "Site induction covering the relevant parts of the construction phase plan, the site rules, the welfare arrangements, the emergency procedures, and the specific hazards on that site. Plus access to relevant information from the pre-construction phase. CDM 2015 Reg 13 makes this a duty on the principal contractor and Reg 15 makes it a duty on the worker to co-operate with it.",
      "Energy harvest (capturing energy already present — solar, wind), energy upgrade (using work to move heat — heat pumps), energy recovery (reclaiming heat that would otherwise be lost — MVHR, waste-water heat recovery), and demand reduction (using less in the first place — LED lighting, controls, smart load management). Most environmental systems combine more than one principle.",
      "Section 722 of BS 7671 (Electric vehicle charging installations) is the regulation anchor. It applies in addition to the rest of BS 7671 and covers the supply, the charging point, the protective measures (especially the PEN-fault and additional protection requirements), the cable rating and the means of isolation. A4:2026 has refined Section 722 alongside the broader updates around TN-C-S systems (now PNB) and AFDD requirements.",
      "Combi drill with a 25 mm flat bit (or auger) — the joist is timber, not masonry. The combi spins fast and cuts cleanly through wood. SDS is rotary-hammer action designed for masonry; using it on timber wastes the tool's capability and the chuck doesn't take standard wood bits anyway. Right tool for the substrate.",
    ],
    correctAnswer: 1,
    explanation:
      "The four-principle frame is a memory aid that maps to almost every environmental system you'll meet. PV harvests, heat pumps upgrade, MVHR and waste-water heat recovery recover, smart controls reduce. Recognising which principle a system uses tells you what its real-world performance limits are — a harvester depends on the resource (sun, wind), an upgrader depends on temperature lift, a recovery system depends on building airtightness.",
  },
  {
    id: 2,
    question:
      'What is the COP (coefficient of performance) of a heat pump and why does it matter?',
    options: [
      "At the start — Reg 132.13 is the design-side documentation requirement that establishes what must be provided for every installation. The design pack flowing from designer to installer is the implementation of Reg 132.13 at the project's start. The same documentation flows through to the customer's O&M pack at handover.",
      "HNC (Higher National Certificate) is a Level 4 qualification, typically 1 year full-time or 2 years part-time. HND (Higher National Diploma) is Level 5, typically 2 years full-time or 3-4 years part-time. Both are recognised academic anchors for Technician JIB grading and IEng professional registration. Most college and FE delivery is part-time evening or day-release for working electricians.",
      "COP = useful heat output (kW) / electrical input (kW). It tells you how much heat each kWh of electricity moves. A COP of 3 means 1 kWh in produces 3 kWh of heat out. COP varies with outdoor temperature, flow temperature and load — manufacturers also quote SCOP (seasonal COP) which averages performance across the heating season. The MCS standard for heat pump installation requires SCOP to be calculated and disclosed to the customer.",
      "At minimum: power topology (cables, breakers, DBs); annotations (ratings, calc results); revision clouds and notes; legend and title block. Some designers add layers for fault current, voltage drop, disconnection time and sub-discipline (e.g. emergency lighting circuits, fire alarm circuits, IT critical) so layers can be turned on or off for clarity.",
    ],
    correctAnswer: 2,
    explanation:
      "COP is the headline efficiency number for heat pumps. SCOP is the more honest one because it accounts for the cold spells where the unit performs worst. A poorly-designed heat pump with oversized radiators can hit SCOP 3.5+; the same unit driving an undersized old radiator system at high flow temperatures might struggle to clear SCOP 2.5. The electrician's job is the electrical side, but understanding SCOP helps you have an informed conversation with the customer about expected running costs.",
  },
  {
    id: 3,
    question:
      'Why does PV array yield in the UK depend more on irradiance than on temperature?',
    options: [
      "It's a positive declaration that you have read the RAMS, understood it, and will work to it. Once your signature is on the sheet you've personally adopted the document — including the working method, the controls and the residual risks. It's the contractor's evidence to the HSE that the operatives were properly briefed, and it's the reason your supervisor will push back if you sign without reading.",
      "Appendix 6 — model forms for certification and reporting. The appendices to BS 7671 also include Appendix 1 (British Standards referenced), Appendix 4 (cable current-carrying capacity tables), Appendix 12 (voltage drop), Appendix 15 (ring and radial circuit arrangements) and Appendix 17 (protective measures against environmental influences). Knowing the appendices by topic is half of installer navigation.",
      "An earth-loop tester is a dedicated instrument (Megger LRCD-M, Kewtech KT200) that measures earth fault loop impedance ONLY — typically faster, more accurate at low impedance values, and with higher injected test current than the EFLI function on a general MFT. Used by 2391 / 2394 testers and by commissioning engineers who need to verify many EFLI values quickly. The MFT's EFLI function is fine for L3 fault-diagnosis use; dedicated loop testers are improver-level kit.",
      "PV output is roughly proportional to the irradiance hitting the panel (W/m²). Cell efficiency does drop slightly as the cells heat up — typically 0.3-0.5% per °C above 25°C — but UK roofs rarely sit above 50°C and the irradiance variation between a sunny and cloudy day is far larger than the temperature derate. So total annual yield (kWh) is dominated by how much sunlight the array sees, not how warm it is.",
    ],
    correctAnswer: 3,
    explanation:
      "UK PV yield is normally quoted as kWh per kWp per year — typically 800-1100 depending on roof orientation and shading. Pitch, azimuth and shading dominate the calculation; temperature derate is a second-order effect. MCS and SAP both use long-run irradiance data to estimate yield, not site temperature.",
  },
  {
    id: 4,
    question:
      'What\'s the difference between an environmental technology that GENERATES energy and one that REDUCES energy demand?',
    options: [
      "Generators (PV, wind, micro-CHP) put energy into the system that wasn't there before from the user's point of view. Demand-reduction tech (LED lighting, smart controls, MVHR, insulation) makes the existing energy do more useful work. From a carbon perspective the cheapest watt is the one you don't use — demand reduction usually has a shorter payback than generation. From a Building Regs perspective both count toward Part L compliance via the SAP / SBEM calculation.",
      "SCOP 3.5 is solid for a UK domestic ASHP install — it means each kWh of electricity delivers 3.5 kWh of heat. On a UK grid carbon intensity of ~200 gCO₂/kWh, that's roughly 57 gCO₂ per kWh of heat — about 3.7× cleaner than burning gas (which emits ~210 gCO₂ per useful kWh). Top-end UK ASHP installs reach SCOP 3.8-4.2; GSHP can reach SCOP 4.5-5.0+. SCOP under 2.8 suggests something is wrong (oversized unit, undersized emitters, poorly insulated property, high flow temperature).",
      "Because EAWR is the trade-specific instrument made under HASAWA's enabling powers (s.15) — but HASAWA's general duties (s.2, s.3, s.7) sit underneath the EAWR breach as the broader safe-system / personal-duty obligations. Charging both gives the prosecution two routes to conviction and lets the court assess culpability across both the specific technical reg AND the broader systems-of-work failure.",
      "Marine electrical work covers commercial shipping, naval, offshore (oil and gas, wind), ports and marinas. Specific competence requirements include marine-grade equipment standards (BS EN 60092), corrosion-protection methods, DC systems (24V/48V common on vessels), shore-power connections. Specialist routes via the Royal Navy, Merchant Navy or commercial marine contractors. Often combined with CompEx for offshore work.",
    ],
    correctAnswer: 0,
    explanation:
      "The 'generate vs reduce' split matters because it changes the design conversation. A customer asking 'how do I cut my carbon footprint?' usually does best to insulate first, control next, generate last — but that's the opposite order from how the marketing typically pushes them. As an electrician you'll work on both, and the SAP calculation in Part L Building Regs reflects the full picture.",
  },
  {
    id: 5,
    question:
      'Why is the carbon intensity of grid electricity falling year on year, and how does that affect electrification choices?',
    options: [
      "The 110 V supply on site is centre-tapped earthed (CTE), so the voltage between either leg and earth is only 55 V. A faulty tool that ends up with the case live to one leg only puts 55 V between the casing and the operative, not 230 V. Combined with a 30 mA RCD at the transformer this dramatically reduces shock energy and survivability if something goes wrong.",
      "The UK grid has decarbonised rapidly: from ~500 gCO₂/kWh in 2012 to under 200 gCO₂/kWh in recent years (varies by year and operating conditions). As the grid gets cleaner, electrified heat (heat pumps) and electrified transport (EVs) get cleaner too — even if the kit itself doesn't change. That's why government policy pushes electrification: every year of grid progress automatically improves the carbon footprint of every heat pump and EV already installed.",
      "Starting each week by asking your team: \\\\\\\"What obstacles are you facing that I can help remove?\\\\\\\" — then using empathy to understand the real blockers (which may be emotional as well as practical), self-regulation to resist the urge to micromanage the solutions, coaching to develop the team\\\\\\\\\\\\\\\\\\\\\\\\'s own problem-solving capability, and genuine follow-through that builds trust. The leader serves by enabling, not by doing everything themselves",
      "Decline. Most firms have a drug-and-alcohol policy that prohibits consumption during working hours, including any time you're still in uniform, on customer premises or driving the van. Even if the working day is officially over, you're still representing the firm and you may have to drive. The policy protects the customer (no impaired work), the firm (no insurance issues, no reputational damage) and you (no DR10 driving conviction).",
    ],
    correctAnswer: 1,
    explanation:
      "The 2012 number was around 500 gCO₂/kWh; the 2023 average sat in the 180-220 gCO₂/kWh band depending on weather, gas prices and renewable output. Burning gas in a domestic boiler is around 210 gCO₂ per kWh of heat; a heat pump with SCOP 3 on a 200 gCO₂/kWh grid is around 67 gCO₂ per kWh of heat — three times cleaner today, and improving. The sales pitch isn't 'heat pumps are zero-carbon' — it's 'heat pumps get cleaner every year while gas boilers don't'.",
  },
  {
    id: 6,
    question:
      'A customer wants a "renewable heating system" but lives in a leaky 1930s semi with single-glazed windows. What\'s the responsible recommendation?',
    options: [
      "One per RCBO. Each RCBO is an independent RCD device. Test each at 1 x I delta n, record trip time on the Schedule of Test Results against the circuit number. Standard MFT workflow: select RCD test mode, set I delta n to 30 mA (or other rating per device), AC test, plug into the circuit\\\\\\\\'s socket or test from the RCBO load terminals, press TEST, record trip time, move to next circuit. 12 RCBOs = 12 tests + 12 readings on the schedule. Modern MFTs auto-fill the schedule when they\\\\\\\\'re paired with certification software.",
      "Apprenticeship standards (gov.uk) require evidence of at least 20% of the apprenticeship being off-the-job training. The log records day-release at college, online courses, structured study time, shadowing in unfamiliar areas, and any other learning activity outside normal productive work. Without it, the apprenticeship may not meet the standards required for the End-Point Assessment to be funded and certified.",
      "Address fabric first — insulation and glazing — then size any heat pump to the reduced load. A heat pump in a leaky house works at high flow temperatures, runs constantly, and posts a poor SCOP, blowing the customer's bills past where they were on gas. The MCS heat-loss calculation methodology assumes a reasonably insulated envelope. The honest answer is fabric upgrade first, then size the kit to the new load — which often ends up being smaller and cheaper.",
      "A 1-page document in plain English: (1) WHAT YOU REPORTED — customer's symptom in their words. (2) WHAT WE FOUND — the fault, in plain English. (3) WHAT WE DID — the fix, in plain English. (4) WHAT WE TESTED — the verification, in plain English. (5) RECOMMENDATIONS — anything further the customer should consider. (6) WARRANTY — what's covered for what period. (7) NEXT STEPS — any follow-up work, retest schedule, contact info. Most modern firms have a customer summary template; the apprentice fills it in at the end of each job. Customer keeps the summary; firm keeps the technical job sheet.",
    ],
    correctAnswer: 2,
    explanation:
      "This is the 'fabric first' principle and it sits at the heart of every honest decarbonisation conversation. PAS 2035 (the retrofit standard) makes this explicit. Heat pumps designed for old high-flow-temperature systems are why you see negative customer reviews — the kit isn't bad, the application is. As an electrician on an MCS heat pump install, the design heat loss calc and the radiator survey are the two documents that decide whether the install will deliver.",
  },
  {
    id: 7,
    question:
      'Which legal duty pushes UK Building Regulations to keep tightening Part L (energy efficiency) every few years?',
    options: [
      "A formal recognition that you hold the specialist solar PV competence — typically gained by passing AM2S (the Solar PV variant of AM2) or by completing an MCS-approved PV installer course alongside time-served PV installation experience. The endorsement allows you to work on PV installations under MCS-registered firms.",
      "Under CDM 2015 Reg 6 a project is notifiable when the construction work is scheduled to last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days. The Client must notify the HSE in writing as soon as practicable before construction starts using F10 notification.",
      "Make suitable arrangements for managing the project (resources, time, competent appointments), provide pre-construction information to designers and contractors, ensure the principal designer and principal contractor (where required) are appointed, and co-operate with all duty-holders. The client duties are real and enforceable — the HSE has prosecuted clients (including domestic clients in some cases) for failing to make those arrangements.",
      "The Climate Change Act 2008 (as amended) commits the UK to net-zero greenhouse gas emissions by 2050. Buildings are roughly 17% of UK emissions; the Future Homes Standard and successive Part L revisions are the regulatory mechanism for hitting that target. Each Part L revision tightens the SAP / SBEM target rate — meaning new builds have to demonstrate progressively lower regulated CO₂ emissions to gain Building Regs approval.",
    ],
    correctAnswer: 3,
    explanation:
      "The 2050 net-zero target is a statutory duty under the Climate Change Act 2008 (amended 2019). Part L of the Building Regulations (Conservation of Fuel and Power) is the construction-side enforcement tool. The Future Homes Standard, expected to bring fossil-fuel boilers off new-build from 2025, follows the same legal lineage. The MCS standards layer competence requirements on top — but the underlying push comes from the Climate Change Act.",
  },
  {
    id: 8,
    question:
      'What\'s the apprentice\'s correct framing when a customer asks "is this system actually green?"',
    options: [
      "Be honest: every environmental technology has a manufacturing carbon cost and an operating carbon benefit. The 'carbon payback time' is when the operating savings cover the manufacturing footprint. UK PV is roughly 1-3 years; heat pumps roughly 2-4 years on UK grid; MVHR varies hugely with airtightness. After payback, the system is in net-environmental-credit. As an apprentice, your job is the install — but the customer deserves an honest framing rather than greenwashed marketing.",
      "Per BS 7671 Section 712 (PV) and Section 426 (electrical equipment for safety services) plus the manufacturer\\\\\\\\'s installation instructions — typically the battery enclosure needs equipotential bonding back to the system earth, the DC busbars require fault-current path provisions, and the AC-coupled inverter must comply with the standard ADS framework. Battery installs add complexity over straight PV.",
      "Mode 3 is AC charging through a dedicated charger that controls and protects the charging session — typical domestic 7 kW units (single-phase) or 22 kW units (three-phase). The vehicle's onboard charger converts AC to DC for the battery. Mode 4 is DC fast charging — the off-vehicle equipment (typically 50-350 kW public rapid chargers) outputs DC directly to the battery, bypassing the vehicle's onboard charger. Domestic installations are essentially always Mode 3. BS 7671 Section 722 (significantly amended in A4:2026) governs the electrical installation requirements.",
      "Two possibilities. (1) Active arc fault on the circuit — there's a real arc happening that the AFDD is correctly detecting and refusing to ignore. Investigate as a real fault: visual inspection, IR test, thermal imaging. (2) AFDD itself has failed in the 'trip' state — internal electronics fault. Test by removing the AFDD from the busbar (load disconnected) and trying to latch it; if it still won't latch, the AFDD is faulty and needs replacement. The L3 apprentice's protocol: investigate as real fault first; only if no fault is found, consider AFDD failure and substitute with known-good unit.",
    ],
    correctAnswer: 0,
    explanation:
      "Greenwashing is a real risk in this industry. The MCS Code of Practice requires installers to give customers honest, evidence-based information about expected performance. As an apprentice you don't sell — but customers ask the person on site. A 'these systems take 1-3 years to pay back their own carbon, then they're in credit for 20+ years' framing is more credible than a 'fully green' line that doesn't survive a Google search.",
  },
];

const faqs = [
  {
    question: "Why does Unit 301 cover environmental tech as an overview rather than a deep dive?",
    answer:
      "Unit 301 is intentionally a 2-credit, 15-GLH breadth-overview unit. It exists to give every Level 3 electrician a working understanding of what environmental systems do, what regulates them, and where the electrical interface sits. The detailed competence — designing PV strings, MCS sign-off, heat-pump heat-loss calcs — lives in the standalone MCS qualifications (2399 PV, 2919 ASHP/GSHP, 2921 EVCP). You take Unit 301 to be a competent electrician on an environmental site; you take 2399/2919/2921 to be the person who designs and signs off the system itself.",
  },
  {
    question: "Is environmental technology actually part of the day-to-day for a 2365-03 electrician?",
    answer:
      "Increasingly yes. Heat pumps, EV chargers and PV are now mainstream domestic work; MVHR is now standard in new-build and many refurbishments. Even on a 'normal' rewire you may be asked to terminate from an existing PV array, leave space in the consumer unit for a future EV charger, or bond an outdoor heat pump unit. Unit 301 gives you the language and the regulation map; the MCS quals add the design competence if you choose to specialise.",
  },
  {
    question: "What's the difference between a PV system that's 'connected' and one that's 'island'?",
    answer:
      "A grid-connected PV system runs in parallel with the public distribution network — when the array generates more than the property consumes, the surplus exports to the grid via a G98 (≤16 A per phase) or G99 (&gt;16 A per phase) connection agreement. An island/standalone system is not connected to the grid at all — it relies on batteries to time-shift the energy and on the inverter to act as the supply reference. BS 7671 Section 712 (extensively revised in A4:2026) covers all three cases: not connected, in parallel, and as an alternative to public distribution.",
  },
  {
    question: "Heat pumps work on the same principle as a fridge — is that a useful framing?",
    answer:
      "Yes — it's the most accurate plain-English explanation. A fridge moves heat from inside the cabinet to the room; a heat pump moves heat from outside the building to inside. Same vapour-compression cycle, different direction, much bigger compressor. The fridge analogy also helps customers understand why the outdoor unit blows cold air in winter (it's the 'inside' of the fridge — heat extracted from outside means cold air leaving the unit). Both systems consume electricity to move heat against a temperature gradient.",
  },
  {
    question: "Will heat pumps work in cold UK winters?",
    answer:
      "Yes, but performance drops as the outdoor temperature falls. Modern variable-speed inverter-driven units in the UK are typically rated to deliver full output down to around -10°C and continue working (at reduced COP) below that. The published SCOP figure averages performance across a typical UK heating season including the cold spells. Properly designed systems with appropriately sized emitters (low-temperature underfloor or upsized radiators) keep working through every cold spell on record. Poorly designed systems on undersized old radiators will struggle and the customer will hate it.",
  },
  {
    question: "If I'm not pursuing MCS, why do I need to know all this for Unit 301?",
    answer:
      "Three reasons. First — every domestic electrician now meets these systems on site, even if you don't install them. Second — Unit 301 is part of the AM2 / NVQ pathway and you can't qualify without it. Third — the regulatory framework (Part L, MCS Code, BS 7671 Section 712 / 722 / 753, ENA G98/G99) affects how you work even on conventional installs. The unit is the floor of competence, not the ceiling.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 2 · Section 1 · Subsection 1"
            title="Principles of environmental technology systems"
            description="Four operating principles cover almost every environmental technology you will meet — energy harvest, energy upgrade, energy recovery and demand reduction. Recognising which principle a system uses tells you what its real-world performance limits are."
            tone="emerald"
          />

          <TLDR
            points={[
              "Environmental technology systems cluster into four operating principles — harvest (PV, wind), upgrade (heat pumps), recovery (MVHR, waste-water HR) and demand reduction (LED, controls, smart load).",
              "Heat pumps don't generate heat — they upgrade low-grade heat to useful temperature using electrical work. COP and SCOP measure how efficiently they do it.",
              "PV is the harvest principle — photons in, electrons out, no moving parts. UK roofs typically yield 800-1100 kWh per kWp per year, dominated by orientation and shading.",
              "The 2050 net-zero duty under the Climate Change Act 2008 is the underlying legal driver behind tightening Part L Building Regs and the broader push toward electrification.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the four operating principles that cover the bulk of environmental technology systems — harvest, upgrade, recovery, demand reduction.",
              "Explain why a heat pump can deliver more heat energy than the electrical energy it consumes, in terms consistent with the first law of thermodynamics.",
              "Describe the photovoltaic effect at a level appropriate for a competent installer — photons, depletion region, free electrons, DC voltage.",
              "Describe the energy recovery principle behind MVHR and explain why it depends on building airtightness for net benefit.",
              "State the carbon significance of grid electrification given the UK grid's falling carbon intensity (from ~500 gCO₂/kWh in 2012 to ~200 gCO₂/kWh in recent years).",
              "Recognise the Climate Change Act 2008 net-zero duty as the underlying legal driver behind Part L Building Regulations and the MCS-regulated environmental technology sector.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four operating principles</ContentEyebrow>

          <ConceptBlock
            title="Harvest, upgrade, recovery, demand reduction — one of these four"
            plainEnglish="Almost every environmental technology you will meet in a UK domestic or small-commercial install runs on one (sometimes two) of four operating principles. Knowing which principle a system uses tells you what its real-world performance limits are, what the customer should expect, and where the kit fails when it does fail."
            onSite="Customers usually frame these systems as 'green tech' as if it's one category. It isn't. A heat pump (upgrade) and a PV array (harvest) have almost nothing in common except that both reduce the customer's grid bill. Treating them as the same kind of system leads to mismatched expectations — the PV does its job in summer when the heat pump barely runs, and vice versa."
          >
            <p>
              The four principles, with examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Harvest</strong> — capturing energy already present in the environment.
                Solar PV (sunlight to DC), solar thermal (sunlight to hot water), wind turbines
                (wind to AC), micro-hydro (flowing water to AC). Output depends on the resource
                — a UK PV array does what the weather lets it do, no more.
              </li>
              <li>
                <strong>Upgrade</strong> — using electrical (or mechanical) work to move heat from
                a cold reservoir to a hot one. Air-source heat pumps, ground-source heat pumps,
                water-source heat pumps. The energy is conserved — the heat in the wet system
                comes from outside, not from the electricity. The electricity does the moving.
              </li>
              <li>
                <strong>Recovery</strong> — reclaiming energy that would otherwise be lost.
                Mechanical ventilation with heat recovery (MVHR — recovers heat from extract
                air), waste-water heat recovery (recovers heat from shower drains), economisers
                on combustion plant. Output depends on what the host process is wasting.
              </li>
              <li>
                <strong>Demand reduction</strong> — using less energy in the first place. LED
                lighting (vs incandescent or fluorescent), smart heating controls, occupancy
                sensors, building management systems, fabric improvements. The cheapest
                kilowatt-hour is the one you don't consume.
              </li>
            </ul>
            <p>
              Many real-world installs combine principles. A modern home might have PV (harvest),
              a heat pump (upgrade), MVHR (recovery) and LED lighting on smart controls (demand
              reduction). Each principle does a different job; together they\'re how you get a
              new-build to Future Homes Standard compliance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Harvest — PV as the worked example</ContentEyebrow>

          <ConceptBlock
            title="PV converts photons to electrons in a silicon junction"
            plainEnglish="A photovoltaic cell is a silicon p-n junction with contacts on both faces. Sunlight passing through the front contact reaches the depletion region in the silicon. Photons with enough energy knock electrons free; the cell\'s built-in electric field pushes free electrons toward the front contact and holes toward the back. That separation of charge is the DC voltage. Connect a load and current flows."
            onSite="The electrical interface is where the unit\'s job ends and yours starts. The DC side runs from the panels through string fuses, an isolator and into the inverter. The AC side runs from the inverter through an AC isolator, a meter and an MCB into the consumer unit. BS 7671 Section 712 (extensively revised in A4:2026) is the regulatory anchor on the electrical side; MCS MIS 3002 governs the design and installation competence."
          >
            <p>
              What the apprentice needs to recognise on a PV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>kWp (kilowatt-peak)</strong> — the array\'s nameplate output under
                Standard Test Conditions (1000 W/m² irradiance, 25°C cell temperature, AM 1.5
                solar spectrum). Real-world output is normally less.
              </li>
              <li>
                <strong>kWh per kWp per year</strong> — the annual yield ratio that converts the
                array\'s peak rating to actual energy harvested. UK roofs typically deliver
                800-1100 depending on orientation, pitch and shading. The MCS yield calculator
                produces this number for the SAP and the customer\'s expectations.
              </li>
              <li>
                <strong>DC strings and the inverter</strong> — multiple panels are wired in
                series to build up DC voltage; the inverter clips, MPPTs and converts to AC.
                String design is MCS-installer territory; you\'ll see it as a fait accompli.
              </li>
              <li>
                <strong>G98 vs G99</strong> — ENA Engineering Recommendation G98 governs grid
                connection up to 16 A per phase (most domestic systems); G99 covers larger
                systems. The DNO notification is the installer\'s job, not the apprentice\'s, but
                it\'s where the system becomes legally allowed to export.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (Solar photovoltaic (PV) power supply systems), scope"
            clause={
              <>
                <p className="mb-2">
                  &quot;The requirements of this section shall apply to PV installations:
                </p>
                <ul className="space-y-1 list-disc pl-5">
                  <li>not connected to a system for distribution of electricity to the public;</li>
                  <li>in parallel with a system for distribution of electricity to the public; and</li>
                  <li>as an alternative to a system for distribution of electricity to the public.&quot;</li>
                </ul>
              </>
            }
            meaning={
              <>
                Section 712 of BS 7671 was extensively revised and expanded for the A4:2026
                amendment. The scope is unambiguous — every PV configuration the apprentice
                will see in the UK is covered, whether grid-connected, off-grid or hybrid
                with battery storage. Designers and installers must apply Section 712 in
                addition to the general requirements of BS 7671. As Unit 301 is overview-level,
                you need to recognise where Section 712 sits in the regulation map; detailed
                application is taught in MCS qualification 2399.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <VideoCard
            url={videos.inverter.url}
            title={videos.inverter.title}
            channel={videos.inverter.channel}
            duration={videos.inverter.duration}
            topic="The inverter — the bridge between DC harvest and AC supply"
            caption="The inverter sits in the middle of nearly every environmental-tech system — PV, battery, EV charging, micro-wind. Knowing what it actually does at the principle level makes the rest of the family easier to read."
          />

          <SectionRule />

          <ContentEyebrow>Upgrade — heat pumps as the worked example</ContentEyebrow>

          <ConceptBlock
            title="Heat pumps move heat — they do not create it"
            plainEnglish="A heat pump runs a vapour-compression cycle. A refrigerant evaporates at low temperature in the outdoor coil, picking up heat from the air (or ground, or water). The compressor then squeezes that vapour, raising its pressure and temperature. The hot high-pressure vapour condenses in the indoor heat exchanger, releasing the heat into the wet system. The liquid refrigerant expands back to low pressure through the expansion valve and the cycle repeats."
            onSite="The electrician\'s interface is the supply, isolation, controls and bonding — not the refrigerant circuit. F-Gas Regulations require refrigerant work to be done by F-Gas-certified personnel only. As the electrical installer on a heat pump install you size the supply (typically 32 A or 40 A radial for a domestic unit, on a Type C MCB), provide the means of isolation outside, bond the outdoor unit chassis if it\'s an extraneous-conductive-part, and integrate any smart controls."
          >
            <p>
              Three numbers the customer will ask about:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>COP (coefficient of performance)</strong> — instantaneous heat output
                divided by electrical input. Quoted at specific conditions (typically A7/W35 —
                outdoor 7°C, flow 35°C). A COP of 4 means 1 kW electrical → 4 kW heat.
              </li>
              <li>
                <strong>SCOP (seasonal COP)</strong> — averages performance across a typical UK
                heating season. More honest because it includes the cold spells where the unit
                works hardest. MCS-certified installs require SCOP to be calculated per house.
              </li>
              <li>
                <strong>Flow temperature</strong> — the temperature of the wet system the heat
                pump is heating. Lower flow = higher SCOP. Underfloor heating (35-40°C) gives
                the best SCOP; old single-panel radiators sized for a 70°C gas boiler force the
                heat pump to run at 55-60°C and post poor SCOP.
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

          <ContentEyebrow>Recovery — MVHR as the worked example</ContentEyebrow>

          <ConceptBlock
            title="Recovery only works where there is something worth recovering"
            plainEnglish="Mechanical ventilation with heat recovery (MVHR) supplies fresh air to bedrooms and living rooms, extracts stale air from kitchens, bathrooms and utility rooms, and passes both streams through a counter-flow heat exchanger. 80-90% of the heat in the extract air transfers to the supply air without the two streams ever mixing. In an airtight, well-insulated building, MVHR delivers controlled ventilation with most of the ventilation heat loss recovered."
            onSite="The electrical interface for MVHR is straightforward — a dedicated supply (typically 13 A on a 6 A or 10 A MCB), a means of isolation, and any boost switching from kitchens and bathrooms. The duct, terminal and commissioning side is the ventilation specialist\'s domain. As the electrician you size the cable for the unit\'s nameplate, provide the isolation and the local boost wiring, and verify continuity and Zs at handover."
          >
            <p>
              Recovery systems share a key constraint: they only work if the host process is
              losing energy in a recoverable form. MVHR depends on the building being airtight
              enough that controlled ventilation is the dominant air-change pathway. Waste-water
              heat recovery (WWHR) depends on the customer using significant volumes of hot
              water (large family homes do well; single-occupant flats less so).
            </p>
            <p>
              The matching question on every recovery install is &quot;is the host flow worth
              recovering from?&quot;. SAP / SBEM credits MVHR with significant savings only when
              air permeability is below threshold values; below that, the fan power consumed
              starts to outweigh the heat recovered.
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

          <ContentEyebrow>Why this matters — the climate framing</ContentEyebrow>

          <ConceptBlock
            title="Net zero by 2050 is a statutory duty, not an industry preference"
            plainEnglish="The Climate Change Act 2008 was amended in 2019 to commit the UK to net-zero greenhouse gas emissions by 2050. Buildings account for around 17% of UK emissions; transport another 22%. The Future Homes Standard, successive Part L revisions of the Building Regulations, the MCS scheme, the EV charging infrastructure regulations and the Smart Export Guarantee are all downstream of that 2050 number. Environmental technology isn\'t a niche — it\'s becoming the default."
            onSite="As the electrician on the ground, you don\'t argue with the Act — you work within the framework it has produced. Part L compliance is a planning condition. MCS certification is a competence prerequisite for Smart Export Guarantee payments. ENA G98/G99 governs grid connection. BS 7671 Section 712 / 722 / 753 governs the electrical detail. The map is dense but the underlying logic is single-sourced from the 2050 target."
          >
            <p>
              Why grid electrification matters for the customer\'s carbon footprint:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                UK grid carbon intensity has fallen from around 500 gCO₂/kWh in 2012 to around
                200 gCO₂/kWh in recent years (varies year-to-year with weather and gas
                prices). It continues to fall as offshore wind and battery storage scale up.
              </li>
              <li>
                Burning gas in a domestic boiler emits about 210 gCO₂ per kWh of useful heat.
                A heat pump with SCOP 3 on a 200 gCO₂/kWh grid emits about 67 gCO₂ per kWh of
                heat — roughly three times cleaner.
              </li>
              <li>
                Every year the grid gets cleaner, every existing heat pump and EV gets
                cleaner with it. A gas boiler doesn\'t.
              </li>
              <li>
                That asymmetry — electrified loads track grid progress, fossil-fuelled loads
                don\'t — is the carbon argument for electrification. It is also why the Future
                Homes Standard takes fossil-fuel boilers off new-build from 2025.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Carbon intensity vs primary energy — two different yardsticks"
            plainEnglish="Customers and regulators use two different ways of measuring how 'green' a building is. Carbon intensity (gCO2 per kWh delivered) tracks the climate impact of every kWh used. Primary energy (kWh of source energy per kWh of delivered energy) tracks how much was burnt at the power station to deliver the kWh that arrives at the meter. Building Regs Part L 2021/2025 uses both — the SAP target is set in carbon, but a primary energy ceiling sits alongside it to discourage 'fix it with a heat pump' installs that ignore fabric losses."
            onSite="As the apprentice you will not run the SAP calculation. But the customer will hear two numbers — the SAP rating (A-G banding) and sometimes the EPC primary energy figure — and may ask which matters. The honest answer is both, for different reasons. Carbon intensity is what the climate sees; primary energy is what the building actually consumes from source. A poorly insulated home heated by an inefficient heat pump can post a low carbon number on a clean grid year and still fail the primary energy ceiling because the heat demand itself is so high."
          >
            <p>
              How the two numbers relate in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Grid electricity</strong> — primary energy factor of around 1.5
                (kWh source per kWh delivered) reflecting transmission and conversion
                losses. Carbon intensity around 200 gCO2/kWh and falling.
              </li>
              <li>
                <strong>Mains gas</strong> — primary energy factor very close to 1.0 (low
                upstream losses for delivered gas). Carbon intensity around 210 gCO2/kWh of
                heat from a 90% efficient condensing boiler.
              </li>
              <li>
                <strong>Heat from an ASHP at SCOP 3</strong> — primary energy factor of
                around 0.5 (1 kWh source per 3 kWh heat output, multiplied by the grid
                primary factor). Carbon intensity around 67 gCO2/kWh of heat on a 200
                gCO2/kWh grid year.
              </li>
              <li>
                <strong>Why both matter</strong> — Part L primary energy ceiling stops
                designers gaming the carbon target by oversizing heat pumps on uninsulated
                shells. Carbon target stops gas designers claiming &quot;efficient enough&quot;
                when the underlying fuel is still fossil.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Climate Change Act 2008 — s.1(1) (as amended by the Climate Change Act 2008 (2050 Target Amendment) Order 2019)"
            clause={
              <>
                &quot;It is the duty of the Secretary of State to ensure that the net UK
                carbon account for the year 2050 is at least 100% lower than the 1990
                baseline.&quot;
              </>
            }
            meaning={
              <>
                The 2019 amendment converted the original 80% target into a net-zero target.
                That single sentence is the legal anchor for every downstream environmental
                technology regulation an electrician will encounter. Part L of the Building
                Regulations, the Future Homes Standard, the MCS scheme rules, the EV
                infrastructure regulations and the Smart Export Guarantee are all
                implementation tools for hitting it. Practitioners do not need to cite the
                Act in everyday work — but recognising it as the source explains why the
                regulatory map keeps tightening.
              </>
            }
            cite="Source: Climate Change Act 2008 (2008 c.27) s.1(1) — paraphrased framework summary as amended; legislation.gov.uk."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (Solar photovoltaic (PV) power supply systems)"
            clause={
              <>
                Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
                extensively revised and expanded in BS 7671:2018+A4:2026. The technical content
                of this section has been extensively revised and expanded and now contains
                updated requirements specific to PV systems.
              </>
            }
            meaning={
              <>
                Solar PV is the harvest principle&apos;s flagship application — and Section 712
                is its regulatory home in the UK Wiring Regulations. A4:2026 brought a wholesale
                rewrite covering grid-tied, off-grid and replacement-supply PV. As an L3
                apprentice you read the manufacturer&apos;s instructions and the Section 712
                clauses your supervisor points you at; the MCS-certified designer makes the
                judgement calls on string fusing, DC isolation and earthing strategy.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Section 712."
          />

          <SectionRule />

          <ContentEyebrow>Demand reduction — the cheapest watt is the unspent one</ContentEyebrow>

          <ConceptBlock
            title="Demand reduction beats generation on cost-per-tonne almost every time"
            plainEnglish="A typical 4 kWp domestic PV array delivers around 3,800 kWh per year and costs roughly £6-8k installed. Replacing every halogen and incandescent lamp in the same house with LED equivalents cuts lighting demand by around 80% and pays for itself in under two years from the energy saved alone. Smart heating controls (per-room TRVs, learning thermostat, time-of-use awareness) save another 10-20% off the heat bill at a fraction of the capital cost. Demand reduction is unglamorous and rarely sells itself, but per pound spent it normally outperforms generation."
            onSite="The L3 electrician sits at the centre of every demand-reduction conversation a customer is going to have. LED retrofits, smart thermostats and zoned controls, occupancy sensors in commercial spaces, daylight dimming on perimeter circuits, voltage optimisation on commercial supplies — all of these are within scope of a competent installer without an MCS sticker. Building Regs Part L credits demand reduction in the SAP / SBEM target rate calculation, and the Energy Saving Trust publishes payback figures that are independent of installer marketing."
          >
            <p>
              Why demand reduction often wins on financial terms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>No grid-connection paperwork</strong> — an LED retrofit doesn&apos;t need
                G98 / G99, doesn&apos;t need a smart export meter, doesn&apos;t need a SAP
                calculation update. It just lowers the import bill from day one.
              </li>
              <li>
                <strong>No conversion losses</strong> — every kWh you don&apos;t consume is a
                kWh saved end-to-end. Generation has inverter losses, battery round-trip
                losses, export-tariff haircut. Avoided demand sees none of those.
              </li>
              <li>
                <strong>Multiplies the value of generation</strong> — a smaller, more
                efficient demand profile means a 4 kWp array covers a higher share of
                consumption. PV + LED + smart controls outperforms PV alone on
                self-consumption percentage.
              </li>
              <li>
                <strong>Fabric first stays the gold standard</strong> — PAS 2035 (the
                domestic retrofit standard) explicitly orders the work — fabric, controls,
                generation. Reversing the order normally wastes capital and underperforms.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The vapour-compression cycle in a bit more detail</ContentEyebrow>

          <ConceptBlock
            title="Compressor, condenser, expansion valve, evaporator — the four-stage cycle"
            plainEnglish="Every heat pump and every domestic fridge runs the same four-stage thermodynamic cycle. A working fluid (the refrigerant) cycles continuously between liquid and vapour states, picking up heat at low temperature in the evaporator and releasing it at high temperature in the condenser. The compressor adds the work that lets the cycle run uphill against the temperature gradient. The expansion valve drops the pressure between the high-side and low-side, completing the loop."
            onSite="The L3 electrician does not touch the refrigerant circuit. F-Gas Regulation 2015 and the EU/UK F-Gas Regulation framework require that any work on a sealed refrigerant circuit (charging, recovery, leak testing, brazing into the circuit) is carried out by an F-Gas-certified person, and that any company handling F-Gas refrigerants holds a company F-Gas certificate. Your electrical scope is the supply, isolation, controls, smart integration and external bonding. The trade boundary is firm — knowing where it sits keeps you legal and keeps the warranty valid."
          >
            <p>
              The four stages, in order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Evaporator (outdoor coil for ASHP)</strong> — cold low-pressure liquid
                refrigerant absorbs heat from the source (outdoor air, ground loop, water),
                evaporating to a cold low-pressure vapour. The fan on the outdoor unit
                blows source air across the coil to keep heat moving in.
              </li>
              <li>
                <strong>Compressor</strong> — the only major moving part. Driven by an
                electric motor (variable-speed inverter on modern units), it squeezes the
                vapour, raising pressure and temperature simultaneously. This is where the
                electrical input to the system actually goes — the work added here is the
                lift between source and sink temperature.
              </li>
              <li>
                <strong>Condenser (indoor heat exchanger)</strong> — hot high-pressure vapour
                releases its heat into the wet system, condensing back to a hot
                high-pressure liquid. This is where the useful heat output is delivered.
              </li>
              <li>
                <strong>Expansion valve</strong> — drops the pressure of the liquid
                refrigerant before it re-enters the evaporator. The pressure drop also
                drops the temperature, restoring the cold state needed to pick up heat at
                the source. Cycle repeats.
              </li>
            </ul>
            <p>
              Refrigerants in current UK domestic kit have moved away from R-410A toward
              lower-GWP options like R-32 and increasingly R-290 (propane) for the lowest
              GWP-and-zero-ODP combination. F-Gas-certified service work is required for
              all of them; R-290 has additional ATEX / flammable-refrigerant handling
              rules for the engineer.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating environmental tech as a single category and giving the customer a one-size-fits-all answer"
            whatHappens={
              <>
                Customer asks &quot;should I get solar or a heat pump?&quot; and the apprentice
                answers as if they\'re alternatives. They aren\'t — they do different jobs.
                Solar harvests electrical energy that the customer mainly uses in summer
                (sunny months); a heat pump consumes electrical energy in winter (cold months).
                The two are complementary, not competitive. The customer ends up with one
                system when the optimal answer for many homes is both, sized to fit. Or the
                customer gets a heat pump in a leaky uninsulated house and posts a poor SCOP
                because nobody talked about fabric first.
              </>
            }
            doInstead={
              <>
                Frame the four principles to the customer in plain English. Harvest covers
                their summer demand; upgrade covers their winter demand; recovery and demand
                reduction help both. Then ask a survey designer (or refer to MCS) for the
                fabric-first answer. The honest sequence is fabric first, controls second,
                generation third — but the conversation needs the four-principle frame to
                make sense.
              </>
            }
          />

          <CommonMistake
            title="Quoting COP without SCOP and setting customer expectations on the wrong number"
            whatHappens={
              <>
                Customer is told &quot;this heat pump is COP 4&quot; — they read that as
                &quot;every kWh in produces 4 kWh of heat all winter&quot;. In practice COP 4
                is the manufacturer\'s number at A7/W35 (a mild day driving low-temperature
                underfloor). The same unit driving 60°C radiators on a -2°C frost morning is
                running closer to COP 2.0. The customer\'s actual seasonal performance is the
                SCOP — typically 3.0-3.5 for a properly designed UK system, lower for
                marginal installs. When the bills come in higher than the customer expected,
                the apprentice gets the phone call.
              </>
            }
            doInstead={
              <>
                Always quote SCOP, not COP, when discussing running costs with the customer.
                MCS-certified installations are required to provide a SCOP estimate based on
                the actual building heat loss and emitter design. If you don\'t have SCOP, say
                &quot;COP at standard conditions — actual seasonal performance will be lower&quot;
                and refer them to the MCS designer for the realistic figure.
              </>
            }
          />

          <Scenario
            title="New-build customer — &quot;just give me the green package&quot;"
            situation={
              <>
                You\'re on a new-build estate handover. The customer asks you, as the electrician
                they trust, what they should do to make their home &quot;as green as possible&quot;.
                The house already has an air-source heat pump (fitted by another contractor),
                MVHR (also already fitted), LED lighting throughout, and a 4 kWp PV array on the
                south-facing roof. The customer is asking about adding a wind turbine in the
                garden.
              </>
            }
            whatToDo={
              <>
                Acknowledge the four principles already covered — upgrade (heat pump), recovery
                (MVHR), demand reduction (LED), harvest (PV). Explain that the marginal carbon
                benefit of a domestic wind turbine in a typical suburban back garden is poor —
                wind shear from neighbouring buildings means yields are usually well below
                manufacturer claims, and the planning / noise / vibration interface is hard.
                The honest next steps for this customer are: smart heating controls (squeeze
                more SCOP from the existing heat pump), battery storage (time-shift the PV
                output to evening loads), and an EV with a smart charger (which actually doubles
                the useful PV self-consumption). All three deliver more measurable carbon
                benefit than a back-garden wind turbine.
              </>
            }
            whyItMatters={
              <>
                Customers ask the trade they trust. As the electrician you don\'t sell the
                system, but your offhand advice has weight. The four-principle frame lets you
                give an honest answer that respects the physics — wind on a suburban site is
                a poor harvester, batteries upgrade the existing harvest, smart controls
                extend the existing upgrade. You aren\'t doing the design — you\'re sending the
                customer to ask the right questions of the right designer.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Four operating principles cover almost every environmental technology — harvest, upgrade, recovery, demand reduction. Most real systems combine more than one.",
              "Heat pumps don't create heat — they upgrade low-grade heat using electrical work. The first law of thermodynamics is conserved; COP and SCOP measure efficiency.",
              "PV is the harvest principle — photons in, electrons out, no moving parts. UK roofs typically yield 800-1100 kWh per kWp per year.",
              "MVHR is energy recovery — but only delivers net benefit in airtight buildings where ventilation heat loss is the dominant flow.",
              "Demand reduction (LED, controls, fabric) is usually the cheapest carbon saving per pound spent. Generation is glamorous; reduction is effective.",
              "UK grid carbon intensity has fallen from ~500 gCO₂/kWh in 2012 to ~200 gCO₂/kWh recently. Electrified loads get cleaner every year; gas boilers don't.",
              "The Climate Change Act 2008 (as amended 2019) commits the UK to net-zero by 2050. Part L Building Regs, MCS, BS 7671 712/722/753 and ENA G98/G99 are downstream of that target.",
              "Unit 301 is an overview unit. Detailed PV / heat-pump / EV competence lives in the standalone MCS qualifications — 2399, 2919, 2921 — not in 2365-03.",
            ]}
          />

          <Quiz title="Environmental technology principles — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 2 home
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 Main types and characteristics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
