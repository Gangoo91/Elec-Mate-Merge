/**
 * Module 2 · Section 5 · Subsection 3 — Maintenance requirements for environmental tech
 * Maps to City & Guilds 2365-03 / Unit 301 / LO3 / AC 3.2
 *   AC 3.2 — "state the maintenance requirements for environmental technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 1.1 (workplace procedures for safe handling,
 * storage and disposal of hazardous materials and products) and Unit 602 ELTK02 /
 * AC 1.5 (materials classed as hazardous to the environment / recyclable) and AC 1.6
 * (organisational procedures for processing materials hazardous / recyclable).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed maintenance competence belongs in
 * MCS standalone quals. This Sub gives the L3 electrician the maintenance framework
 * across the environmental tech family — what gets serviced, how often, by whom, and
 * what waste / refrigerant handling applies.
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
  'Maintenance requirements (5.3) | Level 3 Module 2.5.3 | Elec-Mate';
const DESCRIPTION =
  'Maintenance requirements for environmental technology systems — heat pump annual service, PV inspection schedule, EV charger periodic inspection, MVHR filter changes, biomass ash and flue clean. Plus the regulated waste streams — F-Gas refrigerant, lithium-ion batteries, WEEE — and what they mean for the L3 electrician on a maintenance call.';

const checks = [
  {
    id: 'l3-m2-s5-sub3-heat-pump-annual',
    question:
      'A customer phones a year after their heat-pump install asking what "annual service" actually involves. What\'s the right answer?',
    options: [
      "The MFT (Megger MFT1741+, Kewtech KT64+) injects different test currents based on the RCD type. Type AC test: pure sinusoidal AC at I∆n. Type A test: pure sinusoidal AC AT I∆n PLUS pulsating DC at 1.4× I∆n (because Type A must detect both). Type F test: all of the above PLUS composite multi-frequency. Type B test: all of the above PLUS smooth DC at twice I∆n. Selecting the wrong type on the MFT may show 'pass' on a Type B device (because you're only testing the AC capability, not the DC) — false confidence. Modern MFTs auto-detect or have explicit type selection.",
      "Multi-trade activity. F-Gas-certified engineer checks refrigerant charge, leak-tests the system, inspects pipework and joints. Plumber checks the wet-system pressure, inhibitor concentration, expansion vessel charge, system flow rate and emitter balancing. Electrician (sometimes the same firm's certified engineer) checks the supply, isolation, RCD operation, controls integration, smart-controls firmware, error log review. Outdoor-unit cleaning — fins clear of debris, condensate drain clear. Performance check — flow temperature, ambient, instantaneous COP measured, compared against last year's figures. Manufacturer warranty typically requires the annual service for ongoing cover. The MCS-certified installer often offers a service contract covering all of the above.",
      "Refrigerant evaporates at low temperature in the outdoor coil (or ground loop), absorbing heat from the source. The compressor squeezes the resulting low-pressure vapour, raising its pressure and temperature. The hot high-pressure vapour condenses in the indoor heat exchanger, releasing heat into the wet heating system. The liquid refrigerant expands back to low pressure through the expansion valve and the cycle repeats. Electrical work drives the compressor; the heat in the wet system comes from outside, not from the electricity. Energy is conserved.",
      "Recommending — Reg 421.1.7 recommends (NOT mandates) AFDDs in specified locations such as final circuits supplying socket-outlets up to 32 A in dwellings, premises with sleeping accommodation, and certain higher-risk locations. The BS 7671 wording is \\\\\\\"recommending\\\\\\\", which means the regulation is a strong steer but not a strict requirement. Separate from BS 7671, the Building Safety Act 2022 mandates AFDDs in Higher Risk Residential Buildings (HRRBs) via building regulations. Two different regimes — BS 7671 recommends; HRRB-specific regulation mandates.",
    ],
    correctIndex: 1,
    explanation:
      "Annual service is essential for warranty maintenance and SCOP retention. Refrigerant leaks, scale buildup in the wet system, fouled outdoor coil, drifted controls — all gradually erode performance and the customer doesn't notice until the bills jump. The annual service is the planned intervention that keeps the system at design SCOP. As the L3 electrician you may be the contracted service provider for the electrical scope of the annual service.",
  },
  {
    id: 'l3-m2-s5-sub3-pv-periodic-inspection',
    question:
      'A landlord with a PV system asks how often the array should be inspected and tested. What\'s the framework?',
    options: [
      "Because EFLI is a LIVE test — the MFT injects a small fault current through the loop and measures the impedance from the response. If the supply is off, no fault current flows; the meter shows OPEN or undefined reading. If the protective device is OFF, the loop is broken upstream of your test point; same result. Both conditions are pre-requisites for a meaningful EFLI test. The MFT (Megger MFT1741+) typically warns 'NO VOLTAGE' or 'CIRCUIT OPEN' if either condition isn't met — but the apprentice should know to check before the warning.",
      "BS 7671 EICR (Electrical Installation Condition Report) periodic inspection applies — typically every 5 years for domestic, every 5 years or change of tenancy for landlord properties under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. For PV specifically, BS 7671 Section 712 / IET Code of Practice for Grid Connected Solar Photovoltaic Systems recommends an annual visual inspection plus a more comprehensive periodic inspection every 5 years. The MCS-certified installer often offers an annual aftercare visit covering visual inspection, datalog review, performance verification. Aim: catch underperformance before it becomes invisible drift.",
      "Three acceptable methods. (1) The charge point includes built-in PEN-fault detection-and-disconnection — most modern UK domestic units (Zappi, Ohme, Hypervolt, Wallbox, GivEnergy) include this and the manufacturer's spec confirms compliance. (2) The EV side is on a dedicated TT earth electrode separate from the property's TN-C-S earth — used where the unit does not include built-in detection or where the install configuration favours TT. (3) An external PEN-fault detection device (separate enclosure) is fitted upstream of the unit. Method 1 is the dominant approach in 2024-2026; Method 2 is still common; Method 3 is the historical approach that pre-dates built-in detection and is now uncommon. A4:2026 has refined the technical detail of each method.",
      "All batteries store DC. The difference is where the conversion happens. In DC-coupled, the PV array, the battery and the inverter share a common DC bus inside a hybrid inverter; PV energy charges the battery directly with one DC-DC conversion (high efficiency). In AC-coupled, the PV inverter is independent and converts PV DC to AC; a separate battery inverter then converts AC back to DC to charge, and DC back to AC to discharge — two extra conversions, lower round-trip efficiency, but easier to retrofit because the existing PV install stays untouched.",
    ],
    correctIndex: 1,
    explanation:
      "The 5-year EICR is the BS 7671 framework that catches the electrical safety baseline. The annual visual / datalog review catches the performance drift earlier. Both are good practice for a landlord PV install. For owner-occupied properties the EICR isn't legally required at a fixed interval but is recommended at 10 years (or change of occupier).",
  },
  {
    id: 'l3-m2-s5-sub3-battery-disposal',
    question:
      'A customer\'s 10 kWh lithium-ion battery has reached end-of-life and needs replacing. What waste-handling rules apply?',
    options: [
      "BS 7671 (A4:2026 Reg 421.1.7) recommends AFDDs in specified locations including dwellings — but the wording is \\\\\\\"recommending\\\\\\\", not mandating. They are not strictly required by BS 7671 for a typical owner-occupied house. They ARE mandatory in Higher Risk Residential Buildings (HRRBs — typically blocks of flats over 18 m or 7 storeys) under the Building Safety Act 2022. For your house, they are a strongly recommended best-practice fire protection. Cost is roughly 60-100 GBP per AFDD-RCBO; protecting all socket and lighting circuits typically adds 600-1200 GBP to a CU change. Many domestic specifiers now include AFDDs as standard.",
      "C1 is the most serious EICR code — Danger Present, immediate action required. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (and equivalent regulations in Wales / Scotland / NI) require landlords to act on C1 findings within 28 days, and IMMEDIATELY where the danger is live-and-present. The rectification, certificate (MWC), Schedule of Remedial Works closing the C1, and confirmation back to the landlord need to be turned around within the regulation timeline. A landlord who fails to act on a C1 within 28 days faces a fine of up to £30,000 per breach. The L3 apprentice's job is to do the work, document it, and ensure the landlord has the proof of closure to file.",
      "Run the customer through: how the system operates (continuous low-temperature heating, not on-off cycles like a gas boiler); how to set the room thermostat (set and forget at desired temperature, modest setbacks only); how to use the hot water schedule (typically once or twice a day); when to expect higher running costs (cold spells push up consumption); what the smart controls do; what the warning lights / app notifications mean; who to call for support (warranty contact, manufacturer support, installer aftercare); annual service requirement. Five-to-ten minutes that prevents months of customer confusion.",
      "Lithium-ion batteries are classed as hazardous waste under the Hazardous Waste Regulations and Waste Electrical and Electronic Equipment Regulations (WEEE). They cannot go to landfill; they cannot go to general recycling. Authorised battery treatment centres handle them via specialist waste carriers. The battery manufacturer or installer often arranges take-back via the producer compliance scheme. Battery transport is itself regulated (ADR for road transport of hazardous goods); the licensed waste carrier handles this. Improper disposal is a criminal offence with significant fines and creates a material fire risk in waste streams.",
    ],
    correctIndex: 3,
    explanation:
      "Lithium-ion battery fires in waste streams are a real and growing problem — bin lorries and recycling centres have caught fire from carelessly disposed batteries. Domestic battery storage units are large lithium-ion assemblies; they need specialist handling. The 2357 Unit 602 ELTK02 AC 1.6 explicitly requires the L3 electrician to recognise organisational procedures for processing hazardous materials. The MCS-certified installer normally arranges decommissioning; as an apprentice you should never improvise.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'How often does a typical UK domestic ASHP need a service, and what does it involve?',
    options: [
      "Safety Data Sheet — 16-section document supplied by the manufacturer / supplier covering identification, hazard ID, composition, first aid, fire fighting, accidental release, handling and storage, exposure controls and PPE, physical and chemical properties, stability and reactivity, toxicology, ecology, disposal, transport, regulation, other. The label gives headlines; the SDS gives the operational detail.",
      "Annual service is the standard — required by most manufacturer warranties and recommended by MCS aftercare. Involves: F-Gas refrigerant check (charge weight, leak test); wet-system check (pressure, inhibitor, flow rate, balancing); electrical check (supply, isolation, RCD, controls); outdoor unit clean (fins, condensate drain); performance verification (flow temperature, COP estimate, comparison with previous year). Without annual service the SCOP gradually drifts down, the warranty becomes void, and small problems escalate to expensive faults.",
      "When the inspector believes a specific activity involves or will involve a risk of SERIOUS personal injury. The notice prohibits the activity (immediately, or from a stated time) until the risk has been remedied. Like an Improvement Notice, it can be appealed to an Employment Tribunal within 21 days — but the appeal does NOT suspend the notice (unlike an Improvement Notice). The activity must stop while the appeal is heard.",
      "The four stages are: (1) Unconscious incompetence (not aware of EI gaps), (2) Conscious incompetence (aware of gaps but not yet skilled), (3) Conscious competence (able to use EI skills with deliberate effort), (4) Unconscious competence (EI skills are automatic and natural). The final stage looks like effortlessly reading emotional situations, naturally regulating responses, and instinctively supporting others — EI becomes who you are, not what you do",
    ],
    correctAnswer: 1,
    explanation:
      "Annual service is the planned-maintenance interval that keeps a heat pump at design SCOP and the manufacturer warranty valid. Customers who skip the service and 'wait for it to break' typically lose the warranty cover and pay for service-induced faults years later.",
  },
  {
    id: 2,
    question:
      'What does PV array maintenance typically include?',
    options: [
      "Mode 3 is AC charging through a dedicated charger that controls and protects the charging session — typical domestic 7 kW units (single-phase) or 22 kW units (three-phase). The vehicle's onboard charger converts AC to DC for the battery. Mode 4 is DC fast charging — the off-vehicle equipment (typically 50-350 kW public rapid chargers) outputs DC directly to the battery, bypassing the vehicle's onboard charger. Domestic installations are essentially always Mode 3. BS 7671 Section 722 (significantly amended in A4:2026) governs the electrical installation requirements.",
      "The install can't commission until the DNO has approved the G99 application. Approval timeline 2-12 weeks depending on local network conditions. Customer needs to know this up front — booking holiday around an install date that depends on G99 approval is a recipe for disappointment. The MCS-certified installer normally manages the application and provides timeline expectations. As the apprentice you should never quote a commission date for a G99 install without confirmation from the certified installer.",
      "Annual visual inspection (panels secure, free of physical damage, free of significant soiling); array frame and connections check (no corrosion, no loose mountings); cable inspection (UV degradation, rodent damage, MC4 connector integrity); inverter inspection (error log review, ventilation clear, no overheating signs); meter / monitoring check (datalog producing readings, expected output for season); signage check (durable warning signs still in place at consumer unit / meter / inverter / DC isolators). Periodic 5-year EICR for the electrical condition. Soiling cleaning may be needed in dusty / urban / coastal locations — specialist PV cleaners use deionised water.",
      "The Code for Sustainable Homes was a non-mandatory sustainability rating system (1 to 6 stars) for new-build dwellings, used between 2007 and 2015 in England. It was withdrawn for new applications in March 2015 and replaced by enhanced Part L of the Building Regulations and (for higher-rated developments) by local-authority-specific sustainability requirements. You may still meet the Code referenced on older properties (a Code Level 4 or Level 5 home from 2010-2014 will have been built to Code spec) but it isn't the current standard for new applications.",
    ],
    correctAnswer: 2,
    explanation:
      "PV is largely self-maintaining — no moving parts on the array side. The maintenance is preventative and inspection-led rather than intervention-led. Soiling, cable degradation and inverter faults are the main issues. Annual aftercare visits from the MCS-certified installer pick up most issues before they become customer-visible.",
  },
  {
    id: 3,
    question:
      'What does MVHR maintenance typically involve and how often?',
    options: [
      "Annual visual inspection (panels secure, free of physical damage, free of significant soiling); array frame and connections check (no corrosion, no loose mountings); cable inspection (UV degradation, rodent damage, MC4 connector integrity); inverter inspection (error log review, ventilation clear, no overheating signs); meter / monitoring check (datalog producing readings, expected output for season); signage check (durable warning signs still in place at consumer unit / meter / inverter / DC isolators). Periodic 5-year EICR for the electrical condition. Soiling cleaning may be needed in dusty / urban / coastal locations — specialist PV cleaners use deionised water.",
      "Into the customer's installation record — Electrical Installation Certificate, schedule of circuits, schedule of test results, manufacturer data for the new board, and a copy of the final RAMS for your firm's own records. The customer's pack discharges the BS 7671 Reg 132.13 duty to provide information for safe operation, inspection and maintenance. Your firm's pack is what you produce to an HSE inspector if anything is challenged later.",
      "A UK charity focused on improving mental health and wellbeing in the construction industry. Mates in Mind partners with construction firms to deliver mental health awareness training, supports the development of mental health strategies, and provides freely-accessible resources (toolbox-talk templates, signposting cards, manager guidance). Mates in Mind works closely with Mind, the Samaritans and the Health in Construction Leadership Group. The charity does not provide a helpline directly — it signposts to existing helplines including Samaritans (116 123) and the Lighthouse Club (0345 605 1956).",
      "Filter changes every 6-12 months (kitchen and bathroom extract filters can clog faster). Heat exchanger cleaning every 1-2 years (vacuum or wash the exchanger plates per manufacturer's instructions). Ductwork inspection every 3-5 years (look for blockages, condensate accumulation, rodent damage). Boost-control check (humidity sensors / PIRs operating correctly). Air-flow rate verification at major service intervals (anemometer at supply / extract terminals; balanced per design). Without filter changes the unit's efficiency drops sharply and indoor air quality suffers.",
    ],
    correctAnswer: 3,
    explanation:
      "MVHR maintenance is light but essential. Filter changes are the headline item — a blocked filter destroys the whole point of the system. The MCS Code (or its equivalent for non-MCS MVHR installs under Building Regs Part F) requires customer instructions on filter changes. Some smart MVHR units alert the customer when filters need changing.",
  },
  {
    id: 4,
    question:
      'What\'s the maintenance interval for a domestic biomass boiler?',
    options: [
      "Annual service is the standard, with weekly to monthly customer-side tasks. Annual: full strip-down clean, ash compartment service, auger inspection, igniter check, fan check, flue inspection, controls firmware update, performance check. Monthly customer task: empty ash pan. Weekly customer task: top up pellet hopper, check fuel feed, visual check for blockages. Pellet quality matters — high-ash or wet pellets shorten component life. Some boilers need flue cleaning more frequently than annual; chimney sweep is a specialist trade.",
      "Motor circuit analyser (PdMA MCEMAX, AEMC 6505, AVO Megger MIT400 series with motor-test modes) measures the motor's electrical characteristics OFF-LINE — winding resistance balance between phases, IR to ground, polarisation index, surge comparison. Identifies inter-turn shorts, ground faults, contamination, rotor cage damage. ON-LINE analysers (Baker Static Motor Analyser, SKF) measure during operation — current signature analysis, harmonic content. L3 apprentices rarely operate these but the broader principle — a motor has electrical AND mechanical fault modes, and dedicated instruments characterise them — is L3 syllabus knowledge.",
      "Where equipment is connected and is likely to influence the test or be damaged by the test voltage, a 250 V DC IR test shall be used following connection of the equipment, as clarified in the A4:2026 redraft. Practical implication for fault diagnosis: when you re-IR-test a circuit AFTER fixing a fault and reconnecting electronics (LED drivers, dimmers, electronic timers, smart sockets), use the 250 V range on the MFT to verify the post-fix IR without damaging the kit. The 500 V test still applies before the equipment is connected — that's how you confirm the wiring itself is healthy. The two-stage test (500 V isolated + 250 V with kit re-connected) is the A4:2026-aligned procedure.",
      "PUWER 1998 Reg 6 (inspection of work equipment) requires records of inspection results 'kept until the next inspection is recorded'. For test instruments this typically means: (1) calibration certificates from each calibration cycle (kept for the working life of the instrument plus a tail period for legal hold); (2) inspection / function-check log (some firms have a daily sheet, some app-based); (3) defect / repair records; (4) instrument register listing each instrument by ID, type, calibration date, next-due. The records support PUWER compliance AND BS 7671 certification AND legal defence.",
    ],
    correctAnswer: 0,
    explanation:
      "Biomass is operationally heavier than gas or heat-pump systems because of fuel handling and ash. Customers committing to biomass need to commit to the maintenance schedule. Skipped service often means glow-plug (igniter) failure, auger jams or flue blockages — expensive and inconvenient.",
  },
  {
    id: 5,
    question:
      'When and why do EV chargers need periodic inspection?',
    options: [
      "Ask for and record their Environment Agency (or SEPA / NRW / NIEA) Waste Carrier Registration number, then verify it on the public Environment Agency Waste Carrier register before transferring the waste. Keep the waste transfer note showing the carrier number, vehicle registration, waste description and EWC code, signed by both parties. Retain for at least two years. A two-minute online check is the difference between compliant and not.",
      "Annual visual inspection by the user (cable condition, no damage to connector, no signs of overheating). Periodic BS 7671 EICR every 5 years (or change of tenancy for landlord properties under the Electrical Safety Standards Regulations 2020). EV-specific tests: RCD operation (Type B or RDC-DD), open-PEN protection function (where fitted), Zs at the charge point. Manufacturer-recommended firmware updates as available. Where the charger has been involved in a fault event (known surge, vehicle-side incident) bring forward the inspection.",
      "Apprentice (graded by year of apprenticeship) → on completion of Level 3 + AM2/E + 18th Ed → Electrician → with additional experience and competence demonstration → Approved Electrician → with further design / fault-finding competence → Technician. Each grade unlocks higher pay (set by the JIB National Working Rules) and a wider scope of work the operative can carry out unsupervised on JIB-affiliated sites.",
      "Part L (Conservation of Fuel and Power) requires every new build and every notifiable refurbishment to demonstrate compliance via a SAP calculation that meets the Target Emission Rate (TER) and Target Fabric Energy Efficiency (TFEE) for the property type. A heat pump's contribution to the SAP calculation depends on its SCOP and the carbon intensity of grid electricity. Modern heat pumps in well-designed homes pass Part L comfortably. The Future Homes Standard (in force from 2025) effectively rules out fossil-fuel boilers from new-build because the SAP calculation cannot reach compliance with a gas boiler under the tightening targets. The MCS designer's SCOP estimate feeds the SAP calculation.",
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers are subject to mechanical and electrical stress — repeated plug / unplug cycles, weather exposure, sustained high current. Periodic inspection catches wear, RCD drift, software issues. The 5-year EICR baseline is the BS 7671 framework. Landlord properties additionally subject to the Electrical Safety Standards Regulations 2020.",
  },
  {
    id: 6,
    question:
      'What waste-handling rules apply to refrigerant when servicing or decommissioning a heat pump?',
    options: [
      "G98 fast-track applies to fully-type-tested generators with output up to and including 16 A per phase per inverter — that's 16 A × 230 V = 3.68 kW single-phase per inverter. G99 pre-application applies above 16 A per phase, and to all generators (regardless of size) at sites where pre-existing G98 or G99 generators already exist. Most domestic 4 kW PV inverters are deliberately limited to 3.68 kW max output to stay G98-eligible. Anything above triggers G99 with associated DNO assessment timeline (weeks to months depending on local network).",
      "Type A RCDs detect AC residual currents and pulsating DC residual currents. They cannot detect smooth (continuous) DC residual currents — these can blind the device. Type B RCDs detect AC, pulsating DC and smooth DC residual currents. EV charge points produce smooth DC fault currents that a Type A alone cannot reliably trip. Two acceptable solutions per Section 722: (1) the unit includes its own RDC-DD (6 mA DC detection per IEC 62752 / 61851-1) and the upstream RCD can be Type A; (2) the unit does not include an RDC-DD and the upstream device must be Type B. Modern UK domestic units almost universally include the RDC-DD, so Type A upstream is the dominant choice. Always confirm against the unit's data sheet.",
      "F-Gas Regulations require refrigerant recovery — into a calibrated cylinder, by an F-Gas-certified engineer. Venting fluorinated refrigerants is a criminal offence. The recovered refrigerant goes back to the supplier or a specialist recycling stream. Records are kept of every refrigerant transaction (charge, recovery) under the F-Gas register requirements. As the L3 electrician you don't handle refrigerant — but you should recognise that the F-Gas engineer's recovery activity is the regulated step at decommissioning. Improper venting attracts criminal prosecution under the Environmental Permitting Regulations.",
      "EAWR Reg 16 — 'No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger... unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate'. Fault diagnosis sits squarely inside the regulation because the 'knowledge or experience' you need is exactly what stops you misinterpreting a meter reading and walking into an energised cable. An L3 apprentice does fault diagnosis under direct supervision — solo unsupervised diagnosis on live installations is JIB Approved Electrician work, not apprentice work.",
    ],
    correctAnswer: 2,
    explanation:
      "Refrigerant venting is a serious environmental offence — fluorinated refrigerants have global warming potentials hundreds to thousands of times that of CO₂. Recovery is the legal and ethical baseline. The F-Gas-certified engineer carries the responsibility for recovery on heat-pump decommissioning. As an apprentice your role is recognition; you don't break into the refrigerant circuit yourself.",
  },
  {
    id: 7,
    question:
      'What does the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require for environmental tech in landlord properties?',
    options: [
      "Hazardous-area work (ATEX zones, confined spaces, working at height in remote locations, work near live HV) carries higher risk than standard work. The 'lone working' precautions of Sub 1.2 are NOT enough — the risk profile demands two-person working as default. EAWR Reg 14(c) suitable precautions and HSE INDG73 + HSG85 + Confined Spaces Regulations 1997 + Work at Height Regulations 2005 all combine to require: documented permit-to-work, named authorised person, second person stationed within sight or comms, defined rescue procedure, dedicated emergency response. L3 apprentice never works hazardous-area solo; firm policy will explicitly forbid.",
      "Around 10% of the UK population is estimated to have dyslexia (British Dyslexia Association figure), with research suggesting prevalence may be materially higher in trade roles where visual-spatial reasoning is favoured. That means in a typical apprentice cohort of 20, two to four people are likely to be dyslexic. Plain English briefings, visual aids, audio material, extra time on written assessments and the option of practical demonstration are the standard reasonable adjustments — and they help non-dyslexic learners too.",
      "When the fault is obvious AND the obvious fix is risk-free AND the customer has been informed. Example: a blown bulb in an emergency-bulb socket — replace the bulb, verify operation, document. No need for full hypothesis. But — even the 'obvious' fix benefits from a quick stage check: is the customer's report consistent with the fix (yes, blown bulb explains 'no light'); is the bulb the correct rating; is the lampholder undamaged. The 5-second mental check catches the cases where 'obvious' wasn't actually right. Apprentices who skip even the mental check create comeback work.",
      "Five-yearly EICR (Electrical Installation Condition Report) covering the entire fixed electrical installation, including any PV, EV chargers, heat pump supplies, battery storage circuits and MVHR supplies that have been added. Landlord must provide the EICR to tenants and to the local authority on request. Any C1 (immediate danger) or C2 (potentially dangerous) findings must be remediated within 28 days. Environmental tech additions trigger an updated EICR; they don't escape the regime. The Regulations apply to private rented properties in England; equivalents in the devolved nations.",
    ],
    correctAnswer: 3,
    explanation:
      "The Electrical Safety Standards Regulations 2020 made EICR mandatory for private rented sector in England (5-yearly + change of tenancy). Environmental tech additions are part of the fixed installation and fall within the EICR scope. As the L3 electrician carrying out an EICR on a landlord property you'll inspect and test the PV / EV / heat pump circuits along with everything else.",
  },
  {
    id: 8,
    question:
      'What\'s the practical waste hierarchy for environmental tech maintenance and decommissioning?',
    options: [
      "Reduce → reuse → recycle → recover → dispose. Reduce: keep equipment in service longer (annual maintenance prevents premature replacement). Reuse: reusable batteries (some EV battery cells are repurposed for second-life storage), reusable mounting hardware. Recycle: copper cabling, aluminium frames, steel components — established waste streams. Recover: refrigerant recovery (mandated), some plastics. Dispose: hazardous components (lithium-ion batteries, refrigerants, electronic boards) via authorised waste carriers under the Hazardous Waste Regulations and WEEE Regulations. The hierarchy is set out in the Waste (England and Wales) Regulations 2011 implementing the EU Waste Framework Directive.",
      "Three locations. (1) SWA gland terminations — the brass gland's earth path through the armour to the gland body is critical and often poorly made (insufficient compression on the armour, missing earth tag, paint between gland and box). Causes intermittent earth faults. (2) Compound seal at gland — over years the seal hardens / shrinks, water ingress to the cable cores. (3) The cable run itself only when physically damaged (forklift impact, settlement, vermin). Brand patterns: CMP industrial glands and Pratley sealing compound are the trade standard; cheap gland kits (Vinco, generic OEM) often fail at the earth-tag connection.",
      "Circuits supplying heating units shall have additional protection by the use of RCDs in accordance with the characteristics specified in Regulation 415.1.1. Where a resistive fault may cause a fire, for example for overhead heating with heating film elements, the rated residual operating current shall not exceed 30 mA. All underfloor heating installations shall have additional protection by an RCD rated at 30 mA irrespective of location. In areas where occupants are not expected to be completely wet, a circuit supplying heating equipment of Class II construction (or equivalent insulation) shall be provided with additional protection by the use of an RCD with a rated residual operating current not exceeding 30 mA.",
      "BS 7671 applies regardless of whether the install is MCS-certified — it's the electrical safety regulation, not an MCS option. On both MCS and non-MCS installs the L3 electrician is responsible for BS 7671 compliance — design, installation, inspection and testing, certification (EIC). On MCS installs the certified installer additionally signs off the MCS install pack and accesses the funding incentives. On non-MCS installs there's no MCS sign-off and no incentive access, but BS 7671 compliance is unchanged. The distinction matters for the customer's funding access; it doesn't matter for the L3 electrician's electrical responsibility.",
    ],
    correctAnswer: 0,
    explanation:
      "The waste hierarchy is a statutory principle. Reduce-first is cheaper and more environmentally sound than dispose-last. The 2357 Unit 602 ELTK02 AC 1.5 / 1.6 explicitly requires the L3 electrician to recognise hazardous and recyclable material categories and the organisational procedures for processing them. As the trade increasingly works on circular-economy principles, waste-handling discipline matters as a core competence, not a side issue.",
  },
];

const faqs = [
  {
    question: "Who carries out the annual service on a heat pump — the original installer, the manufacturer, or someone else?",
    answer:
      "Usually the original MCS-certified installer or a similarly qualified service company. Many installers offer service contracts covering the annual service. Manufacturer-direct service is also available for some brands. Independent service companies are emerging in the heat-pump aftercare market. Whoever does it must be F-Gas-certified for the refrigerant scope and competent for the wet-system and electrical scopes. As the L3 electrician you may be the contracted electrical-scope service provider, with the F-Gas engineer handling the refrigerant scope.",
  },
  {
    question: "What's the cost of an annual heat-pump service?",
    answer:
      "Typically £150-300 for the annual service, depending on complexity and provider. Service contracts may bundle 5-10 years of annual visits at a discount. Heat-pump warranty cover usually requires evidence of annual servicing — without it the warranty defaults. Customers should treat the annual service as a non-negotiable operating cost, comparable to an annual gas-boiler service.",
  },
  {
    question: "Do PV inverters need replacing during the system's lifetime?",
    answer:
      "Yes, typically once. PV panels are warranted 25 years; inverters are typically warranted 5-12 years. Most domestic PV systems will need at least one inverter replacement during the panel lifetime. The replacement is straightforward — disconnect old, fit replacement of compatible spec, recommission. Some inverter manufacturers offer extended warranty options at install. The cost should be factored into the system's whole-life economic case, not ignored.",
  },
  {
    question: "What happens to a battery storage unit at end-of-life?",
    answer:
      "Authorised disposal via the manufacturer's take-back scheme or a specialist battery treatment centre. Lithium-ion batteries are hazardous waste; they cannot go to landfill or general recycling. Some batteries are repurposed for 'second-life' applications (less demanding storage uses where partial degradation is acceptable). The MCS-certified installer normally arranges decommissioning when the battery is replaced. Customer-side disposal requires the right specialist waste carrier; improper disposal is a criminal offence and a fire risk.",
  },
  {
    question: "What's the customer's responsibility vs the installer's responsibility for ongoing maintenance?",
    answer:
      "Customer-side: weekly / monthly visual checks (filter status indicators, error lights), MVHR filter changes (often DIY-able with right replacement filters), pellet hopper top-up for biomass, EV cable visual check. Installer-side: annual service across all the above, F-Gas refrigerant scope, electrical EICR every 5 years, controls firmware updates, performance verification. The handover pack should clearly state which responsibility lies with each party. Confusion here is the headline cause of customer-installer disputes years after the install.",
  },
  {
    question: "Are there environmental waste considerations specific to the PV / battery / EV install?",
    answer:
      "Yes. Refrigerants (heat pumps) — F-Gas recovery only. Lithium-ion batteries (storage / EV) — hazardous waste under WEEE. Electronic control boards (inverters, smart controls) — WEEE. Copper / aluminium / steel components — recyclable via standard streams. Plastics (panel backsheets, cable insulation) — variable recyclability. Cardboard / pallets from delivery — recycle on-site. The L3 electrician's responsibility is to use authorised waste streams and not improvise — the 2357 Unit 312 ELTP02 AC 1.1 explicitly requires demonstration of safe handling, storage and disposal of hazardous materials per the Hazardous Waste Regulations.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 3"
            title="Maintenance requirements"
            description="Maintenance for environmental technology systems — heat pump annual service, PV inspection, EV charger periodic inspection, MVHR filter changes, biomass ash and flue clean. Plus regulated waste streams (F-Gas, lithium-ion, WEEE) and the L3 electrician's responsibility on a maintenance call."
            tone="emerald"
          />

          <TLDR
            points={[
              "Heat pumps need annual service — F-Gas refrigerant check, wet-system check, electrical check, outdoor unit clean, performance verification. Required for warranty validity and SCOP retention.",
              "PV is largely self-maintaining — annual visual inspection plus 5-year EICR. Inverter typically replaced once during 25-year panel lifetime.",
              "MVHR needs filter changes every 6-12 months and heat exchanger clean every 1-2 years. A blocked filter destroys the whole point of the system.",
              "Lithium-ion batteries are hazardous waste under WEEE — authorised treatment only, never landfill / general recycling. Improper disposal is a criminal offence and a fire risk.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the maintenance interval and scope for the main environmental technology systems — heat pump, PV, EV charger, MVHR, biomass.",
              "Identify the BS 7671 EICR (5-yearly) as the periodic inspection framework, plus the additional landlord requirement under the Electrical Safety Standards Regulations 2020.",
              "Recognise the F-Gas refrigerant recovery requirement at heat-pump service / decommissioning and identify it as F-Gas-certified-only work.",
              "Identify lithium-ion batteries as hazardous waste under the WEEE Regulations and recognise the authorised-disposal requirement.",
              "Apply the waste hierarchy (reduce, reuse, recycle, recover, dispose) to environmental technology decommissioning.",
              "State the customer-side vs installer-side maintenance responsibilities and the role of the handover pack in clarifying them.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Heat pump — annual service is non-negotiable</ContentEyebrow>

          <ConceptBlock
            title="What the annual service actually covers"
            plainEnglish="Heat pumps need annual service — required by most manufacturer warranties and standard MCS aftercare practice. The service is multi-trade: F-Gas-certified engineer for refrigerant; plumber for wet system; electrician for electrical; sometimes the same firm covers all three with appropriately certified personnel. Without annual service the SCOP drifts down, small faults escalate, and the warranty defaults."
            onSite="As the L3 electrician you may be the contracted electrical-scope service provider, working alongside an F-Gas engineer for the refrigerant scope. Document each visit with measured values (Zs, RCD test, electrical condition) — the records support continued warranty cover and provide a baseline for the next year."
          >
            <p>
              Annual service scope by trade:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas refrigerant</strong> — charge weight verified, leak test
                across all joints, sub-cooling and superheat checks, suction / discharge
                pressures recorded.
              </li>
              <li>
                <strong>Wet system</strong> — system pressure, expansion vessel charge,
                inhibitor concentration test, flow rate verification, emitter balancing
                check, sludge / debris check at filter.
              </li>
              <li>
                <strong>Electrical</strong> — supply check, isolation operation, RCD test
                (operating time at I△n and 5×I△n; smooth-DC test for Type B), Zs at the
                outdoor isolator, controls integration test.
              </li>
              <li>
                <strong>Outdoor unit</strong> — fins clean of leaves / debris, condensate
                drain clear, mountings secure, no corrosion, no obstruction to airflow.
              </li>
              <li>
                <strong>Performance check</strong> — flow temperature, return temperature,
                ambient temperature, instantaneous COP measured. Compare with last year&apos;s
                figures and the design SCOP estimate.
              </li>
              <li>
                <strong>Smart controls</strong> — firmware up to date, weather compensation
                curve still appropriate, error log reviewed, customer reports addressed.
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

          <ContentEyebrow>PV — light maintenance, periodic electrical inspection</ContentEyebrow>

          <ConceptBlock
            title="PV is largely self-maintaining — until it isn't"
            plainEnglish="A PV array has no moving parts on the array side — panels, frames, cables, isolators just sit there. The maintenance is preventative inspection rather than active intervention. The inverter is the wear part — typically replaced once during the 25-year panel lifetime. The key risks are gradual: cable UV degradation, MC4 connector corrosion, soiling, inverter overheating in a poorly ventilated location."
            onSite="Annual visual inspection plus 5-year periodic EICR is the framework. Some MCS aftercare contracts include datalog review (catches underperformance trends before the customer notices). Soiling cleaning may be needed in dusty / urban / coastal locations — done by specialist PV cleaners using deionised water, not by the electrician."
          >
            <p>
              PV maintenance schedule:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Annual visual inspection</strong> — panels secure, no physical
                damage, no significant soiling. Mountings firm, no corrosion. Cables in
                conduit / clipping intact, no rodent damage. MC4 connectors firm. Inverter
                ventilation clear, no overheating signs. Signage at consumer unit / meter
                / inverter / DC isolators still present and durable.
              </li>
              <li>
                <strong>Annual datalog review</strong> — total generation kWh,
                daily / weekly profile, error events. Compare against expected for the
                season. Underperformance vs expected suggests soiling, shading, panel
                degradation or inverter issue.
              </li>
              <li>
                <strong>5-year periodic inspection (EICR)</strong> — full BS 7671
                inspection and test. Continuity, IR, polarity, Zs, RCD test on the PV
                circuit. Update certificate. Particularly important on landlord properties
                where the Electrical Safety Standards Regulations 2020 make EICR mandatory.
              </li>
              <li>
                <strong>Inverter replacement</strong> — typically year 8-15 depending on
                manufacturer warranty and inverter type. Replacement is straightforward —
                disconnect old, fit replacement of compatible spec, recommission.
              </li>
              <li>
                <strong>Soiling cleaning</strong> — as needed, typically every 1-3 years
                in urban / coastal / dusty locations. Specialist PV cleaners use deionised
                water and soft brushes; high-pressure jets damage panel surfaces.
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

          <ContentEyebrow>EV chargers, MVHR, biomass — short scope</ContentEyebrow>

          <ConceptBlock
            title="EV charger periodic inspection"
            plainEnglish="EV chargers are subject to mechanical wear (cable, plug), weather exposure, and sustained high-current operation. The standard framework is annual visual inspection by the user plus 5-year BS 7671 EICR. EV-specific tests include RCD operation (Type B or RDC-DD), open-PEN protection function (where fitted), Zs at the charge point. Manufacturer-recommended firmware updates as available."
            onSite="As the L3 electrician on a 5-year EICR for an EV-equipped property, the EV charger circuit gets the standard inspection plus the EV-specific RCD / open-PEN checks. Where the charger has been involved in a fault event (known surge, vehicle-side incident) bring the inspection forward."
          >
            <p>
              EV-specific maintenance points:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Cable and plug condition — look for damage, fraying, melted spots.
              </li>
              <li>
                Mounting and weatherproofing — IP rating intact, no water ingress.
              </li>
              <li>
                RCD operation — Type B or Type A + RDC-DD; smooth-DC test if Type B.
              </li>
              <li>
                Open-PEN protection function — confirmed working per manufacturer&apos;s
                test procedure (where the unit has built-in protection).
              </li>
              <li>
                Earthing — Zs at the charge point, earth electrode resistance if TT
                arrangement.
              </li>
              <li>
                Firmware — update to latest manufacturer-supplied version.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MVHR — filter changes are the key job"
            plainEnglish="MVHR maintenance is light but essential. Filter changes are the headline item — a blocked filter destroys the whole point of the system (no air-flow = no recovery). Heat exchanger cleaning every 1-2 years keeps the recovery efficiency up. Ductwork inspection every 3-5 years catches blockages and rodent damage."
            onSite="Customer-side responsibility for filter changes (often DIY-able with right replacement filters and a quarterly visual check). Annual service by a ventilation specialist for the deeper checks. Some smart MVHR units alert the customer when filters need changing via app notification."
          >
            <p>
              MVHR maintenance schedule:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Filter changes</strong> — every 6-12 months. Kitchen and bathroom
                extract filters can clog faster.
              </li>
              <li>
                <strong>Heat exchanger clean</strong> — every 1-2 years. Vacuum or wash
                exchanger plates per manufacturer&apos;s instructions.
              </li>
              <li>
                <strong>Ductwork inspection</strong> — every 3-5 years. Look for blockages,
                condensate accumulation, rodent damage.
              </li>
              <li>
                <strong>Boost-control check</strong> — humidity sensors / PIRs operating
                correctly.
              </li>
              <li>
                <strong>Air-flow rate verification</strong> — at major service intervals,
                anemometer at supply / extract terminals, balanced per design.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Biomass — operationally heavier than other systems"
            plainEnglish="Biomass appliances need both customer-side weekly tasks (pellet hopper top-up, ash empty, visual check) and an annual professional service (full strip-down clean, auger / igniter / fan check, flue inspection, controls firmware). Skipped service typically means glow-plug failure, auger jam or flue blockage."
            onSite="As the electrician on a biomass install you handle the electrical scope of the annual service — supply check, RCD test, controls integration, firmware. The wet system is plumber's scope; the boiler internals and flue are biomass-specialist scope. Customer-facing instruction on the weekly tasks should have been part of the install handover."
          >
            <p>
              Customer-side weekly / monthly tasks:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Top up pellet hopper as needed.
              </li>
              <li>
                Empty ash compartment monthly (more often in heavy use).
              </li>
              <li>
                Visual check of fuel feed (auger), no obstructions.
              </li>
              <li>
                Check pellet quality — kiln-dried, low-ash, manufacturer-approved.
              </li>
            </ul>
            <p>
              Annual professional service:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Full strip-down clean of combustion chamber and ash compartment.
              </li>
              <li>
                Auger inspection, lubrication, replacement of wear parts.
              </li>
              <li>
                Igniter (glow plug) check and replacement if required.
              </li>
              <li>
                Combustion fan inspection.
              </li>
              <li>
                Flue inspection (often a chimney sweep separately).
              </li>
              <li>
                Controls firmware update, electrical scope check.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Regulated waste streams</ContentEyebrow>

          <ConceptBlock
            title="The waste hierarchy applied to environmental tech"
            plainEnglish="The waste hierarchy — reduce, reuse, recycle, recover, dispose — is a statutory principle under the Waste (England and Wales) Regulations 2011. Applied to environmental tech: reduce by maintaining equipment longer, reuse second-life batteries where appropriate, recycle copper / aluminium / steel via standard streams, recover refrigerant via F-Gas-certified engineer, dispose hazardous components (lithium-ion, electronics, refrigerant) via authorised waste carriers."
            onSite="The L3 electrician's responsibility is to use authorised waste streams and not improvise. The 2357 Unit 312 ELTP02 AC 1.1 explicitly requires demonstration of safe handling, storage and disposal of hazardous materials per the Hazardous Waste Regulations. The 2357 Unit 602 ELTK02 AC 1.5 / 1.6 requires recognition of hazardous and recyclable categories and the organisational procedures for processing them."
          >
            <p>
              The four headline regulated waste categories on environmental tech installs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas refrigerant</strong> — recovery only, by F-Gas-certified
                engineer. Venting is a criminal offence under Environmental Permitting
                Regulations. Recovered refrigerant goes back to the supplier or specialist
                recycling stream. Records kept in the F-Gas register.
              </li>
              <li>
                <strong>Lithium-ion batteries</strong> — hazardous waste under the
                Hazardous Waste Regulations and WEEE Regulations. Cannot go to landfill or
                general recycling. Authorised treatment centres only. Battery transport
                regulated under ADR. Improper disposal is a criminal offence with significant
                fines and material fire risk.
              </li>
              <li>
                <strong>Electronic equipment (inverters, controls, smart kit)</strong> —
                WEEE Regulations. Producer-take-back schemes, household waste recycling
                centres (HWRCs), or licensed WEEE carriers. Cannot go to general waste.
              </li>
              <li>
                <strong>Standard recyclables</strong> — copper cabling, aluminium frames,
                steel components, cardboard packaging. Established recycling streams; the
                installer&apos;s firm should have a waste management plan covering these.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 EICR changes — what the inspector now records on env tech kit"
            plainEnglish="Two changes from A4:2026 affect every periodic inspection on a property with environmental tech additions. First, Reg 643.7 RCD verification is now a single AC test at 1×IΔn — no more multi-current sequence, no more separate five-times test for additional protection. Second, Reg 653.1 / 653.2 require Appendix 6 notes for the report producer and customer-facing recipient guidance to be carried forward on the Condition Report itself."
            onSite="Practical effect on a heat pump or PV property EICR: the RCD test on the inverter circuit, the heat pump supply, the EV charger and the battery storage RCBOs all run as a single 1×IΔn AC test, regardless of RCD type. Operating time recorded in milliseconds against the BS EN 61008 / 61009 limits. Photographs of the inverter label, the heat pump outdoor unit, the EV charger and battery isolator are explicitly permitted as appended evidence — much faster than handwritten descriptions."
          >
            <p>
              What to bring on the EICR visit and what to record:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MFT firmware</strong> — confirm test firmware is updated to the
                A4:2026 RCD test method (single AC test at 1×IΔn). Older firmware may still
                run the multi-current sequence; the value that goes on the schedule is the
                1×IΔn reading.
              </li>
              <li>
                <strong>Camera or phone</strong> — take inverter, heat pump unit, EV
                charger and battery isolator photos. Reg 653.1 / 653.2 explicitly allow
                images appended to the report. One photo of a serial-numbered inverter
                label captures install state cleanly.
              </li>
              <li>
                <strong>Appendix 6 notes</strong> — the EICR producer's notes table is the
                template for guidance to the recipient. Cover the env tech findings with
                C1 / C2 / C3 / FI codes plus the recipient action expected.
              </li>
              <li>
                <strong>Photos of signage</strong> — Section 712 PV signage at consumer
                unit, meter and inverter; EV charger isolator labelling per Section 722;
                battery storage isolator and identification per the 2026-aligned scheme.
                Missing or illegible signage is typically C3.
              </li>
              <li>
                <strong>Test method note</strong> — record that the RCD verification used
                A4:2026 single AC test at 1×IΔn. Older EICRs the inspector compares against
                will quote multi-current readings; document the methodology change.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer-side maintenance briefing — what to leave them on the fridge"
            plainEnglish="Most env tech failures the L3 electrician sees on a service call could have been caught earlier by the customer if they knew what to look for. The handover pack should include a single-page customer maintenance brief — what to check weekly, what to check monthly, and the warning signs that mean ring the installer. A laminated A5 card on the fridge or in the consumer unit cupboard works."
            onSite="Spend ten minutes at handover walking the customer through the brief. Short verbal demonstrations beat written instructions every time — show them how to read the inverter daily kWh, where the heat pump pressure gauge is, how to know when the MVHR filters need changing. A confident customer rings less and rings about the right things; a confused customer rings monthly and often about non-issues."
          >
            <p>
              Customer-side checks by frequency:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Weekly</strong> — heat pump display green-light check; PV inverter
                producing kWh in daylight; MVHR filter status indicator clean; biomass
                pellet hopper level; EV charger plug condition.
              </li>
              <li>
                <strong>Monthly</strong> — heat pump outdoor unit clear of leaves and
                debris; PV array visual from a safe vantage (no obvious cracks or shading);
                MVHR filters changed if indicator says due; biomass ash compartment
                emptied; EV charger plug seated firmly.
              </li>
              <li>
                <strong>Quarterly</strong> — PV daily kWh compared to expected for the
                season; heat pump bills compared to last year for the same month; smoke
                alarm and emergency lighting (flat blocks) functional test.
              </li>
              <li>
                <strong>Warning signs — ring the installer</strong> — heat pump short-cycling
                (turning on and off every few minutes); inverter showing red fault light;
                MVHR fan louder than usual; biomass repeated ignition failure; EV charger
                tripping on every charge attempt; battery storage refusing to charge or
                discharge; sustained higher bills with no obvious cause.
              </li>
              <li>
                <strong>Annual reminders</strong> — heat pump service due (calendar
                reminder); MVHR full filter replacement; PV aftercare visit; biomass full
                strip-down service; 5-year EICR if landlord property approaching the cycle.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Hazardous Waste Regulations (England and Wales) 2005, as amended — paraphrased"
            clause={
              <>
                The producer of hazardous waste (which includes WEEE, refrigerants,
                lithium-ion batteries) must ensure the waste is consigned to an authorised
                disposal or treatment route, accompanied by a consignment note, and
                delivered to an authorised facility. Improper disposal — including
                sending hazardous waste to landfill or to a non-authorised carrier — is a
                criminal offence.
              </>
            }
            meaning={
              <>
                The Hazardous Waste Regulations make the producer (typically the installer
                or service provider on environmental tech) responsible for the waste from
                the moment it&apos;s removed from service. The chain of consignment notes
                proves the waste reached an authorised facility. The Environment Agency
                (England) / Natural Resources Wales / SEPA (Scotland) / NIEA (NI) enforce.
                As the L3 electrician on a service / decommissioning visit you should
                recognise the regulatory obligation and use the firm&apos;s waste-handling
                procedure — never improvise.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (paraphrased from the published Regulations available via legislation.gov.uk)."
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
            title="Customer skipping annual heat-pump service to save money"
            whatHappens={
              <>
                Customer decides to skip the £200 annual service in year 2. SCOP drifts
                down (sludge in wet system, drift in compensation curve, slight refrigerant
                leak undetected). By year 4 the customer&apos;s bills are noticeably higher
                than they were in year 1; warranty has defaulted; small problems have
                cascaded into bigger ones. The £600 saved over three years has cost £2,000
                in higher bills and £1,500 in non-warranty repair work.
              </>
            }
            doInstead={
              <>
                Stress the importance of annual service at handover. Frame it as a
                non-negotiable operating cost — comparable to an annual gas-boiler service
                or an MOT for a car. The MCS-certified installer often offers a service
                contract bundling 5-10 years of annual visits at a discount. Customers
                who opt out should be told plainly what they&apos;re giving up — warranty
                cover and SCOP retention.
              </>
            }
          />

          <CommonMistake
            title="Disposing of an old battery storage unit in general waste"
            whatHappens={
              <>
                Battery has reached end of life. Apprentice / installer removes it and
                drops it in the customer&apos;s general waste skip. Bin lorry catches fire
                en route to landfill (lithium-ion fires in waste streams are a real and
                growing problem). Investigation traces the battery back to the install
                firm. The firm faces a criminal prosecution under the Hazardous Waste
                Regulations, plus the bin firm&apos;s civil claim, plus reputational damage.
              </>
            }
            doInstead={
              <>
                Lithium-ion batteries are hazardous waste — authorised treatment only.
                The MCS-certified installer normally arranges decommissioning via the
                manufacturer&apos;s take-back scheme or a specialist battery recycler.
                Battery transport is itself regulated under ADR. As the L3 electrician on
                a battery decommissioning visit, never improvise — use the firm&apos;s
                waste-handling procedure and the authorised waste carrier.
              </>
            }
          />

          <Scenario
            title="5-year EICR on a property with PV, EV charger and heat pump"
            situation={
              <>
                You&apos;re carrying out a 5-year EICR on a private rented property in
                England — a 3-bed semi with 5 kWp PV (G98), 7 kW EV charger (PME with
                charger&apos;s open-PEN protection), 10 kW ASHP, and a 10 kWh battery.
                The Electrical Safety Standards Regulations 2020 apply. The customer is
                the landlord; the tenants are at home.
              </>
            }
            whatToDo={
              <>
                Plan the EICR before starting. The fixed installation includes the
                original house circuits plus the four added environmental tech circuits.
                Schedule with the tenants for power-down windows. Notify the DNO if
                you&apos;re going to fully isolate the supply. For each circuit: visual
                inspection, continuity, IR, polarity, Zs, RCD test (Type B / RDC-DD for
                EV), open-PEN protection function test (EV charger), DC-side checks (PV
                with both DC and AC isolators locked-off and verified dead), labelling /
                signage check at all isolation points. Issue the EICR with C1 / C2 /
                C3 / FI codings as appropriate. C1 / C2 findings remediated within 28 days
                (legal duty under the Regulations). Provide the report to the landlord and
                signpost the requirement to provide it to the tenants. Update the customer
                handover pack with the new EICR.
              </>
            }
            whyItMatters={
              <>
                Five-year EICR is the BS 7671 baseline + the Electrical Safety Standards
                Regulations legal requirement for landlord properties in England.
                Environmental tech additions are part of the fixed installation and fall
                within scope — the landlord&apos;s legal compliance depends on the EICR
                covering everything. As the L3 electrician your professional reputation
                rests on a thorough, documented inspection. Skipping the PV DC-side check
                or the EV open-PEN check leaves dangerous gaps.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 651.1 (periodic inspection and testing)"
            clause={
              <>
                Where required, periodic inspection and testing of every electrical
                installation shall be carried out in accordance with the regulations of Part 6.
              </>
            }
            meaning={
              <>
                A periodic inspection (EICR) of an installation including PV, EV, battery or
                heat-pump kit follows the standard Part 6 process plus the technology-specific
                checks. The frequency is determined by Regulation 652.1 from the type of
                installation, its use, the quality of maintenance, and external influences.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 651.1 — full text from published amendment."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 653.1 / 653.2 (Condition Report changes)"
            clause={
              <>
                Regulation 653.1 now requires the notes for the person producing the report
                (provided in Appendix 6) to be taken into account on the Condition Report.
                Regulation 653.2 now requires the report to include guidance for the
                recipient(s) based on the model in Appendix 6. A note has also been added
                pointing out that photographic and/or thermographic images can be appended to
                the report.
              </>
            }
            meaning={
              <>
                Two changes affect every EICR you produce — the Appendix 6 notes for the report
                producer must be applied, and customer-facing recipient guidance must be
                included. Photos and thermographic images can be appended; this is particularly
                useful on environmental tech additions where a single image of the inverter,
                battery isolator or EV charger label captures the install state cleanly.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulations 653.1 and 653.2."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Heat pumps need annual service (multi-trade — F-Gas, plumber, electrician). Required for warranty validity and SCOP retention.",
              "PV is largely self-maintaining — annual visual inspection plus 5-year EICR. Inverter typically replaced once during 25-year panel lifetime.",
              "MVHR filter changes every 6-12 months are essential. A blocked filter destroys the whole point of the system.",
              "Biomass is operationally heavier — weekly customer tasks (pellets, ash) plus annual professional service.",
              "EV chargers need 5-yearly EICR + EV-specific RCD / open-PEN protection tests. Landlord properties subject to Electrical Safety Standards Regulations 2020.",
              "F-Gas refrigerant recovery only by F-Gas-certified engineer. Venting is a criminal offence under the Environmental Permitting Regulations.",
              "Lithium-ion batteries are hazardous waste under WEEE — authorised treatment only, never landfill / general recycling. Improper disposal is a criminal offence + fire risk.",
              "Waste hierarchy (reduce, reuse, recycle, recover, dispose) applies. The L3 electrician uses authorised waste streams and never improvises on hazardous categories.",
            ]}
          />

          <Quiz title="Maintenance requirements — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 Commissioning and handover
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module home <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 — Environmental technology
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
