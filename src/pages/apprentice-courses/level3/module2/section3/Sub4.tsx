/**
 * Module 2 · Section 3 · Subsection 4 — Heat pump system technology deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2
 *   AC 1.2 — "specify the main types, characteristics, and purposes of environmental
 *             technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 3.1 (provide information on operational
 * requirements and benefits); 2357 Unit 602 ELTK02 / AC 3.2 (applications and
 * limitations of environmental technology systems).
 *
 * Note: Unit 301 is overview-level. This Sub deepens the heat-pump system technology
 * content beyond Sub 3.2 — refrigeration cycle physics, COP / SCOP design at apprentice
 * level, emitter sizing trade-offs, ASHP / GSHP / WSHP comparison, refrigerant
 * options (R32, R290, R454B), the F-Gas trade boundary and how the L3 electrical
 * scope sits alongside refrigeration and plumbing.
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
  'Heat pump system technology deeper (3.4) | Level 3 Module 2.3.4 | Elec-Mate';
const DESCRIPTION =
  "Heat pump system technology at deeper recognition level for the L3 electrician — vapour-compression cycle in plain English, COP / SCOP at apprentice level, emitter sizing trade-offs, ASHP / GSHP / WSHP comparison, refrigerant options (R32, R290, R454B) and the F-Gas trade boundary. The electrical scope sits alongside the refrigeration and plumbing trades.";

const checks = [
  {
    id: "l3-m2-s3-sub4-cycle",
    question:
      "In plain physics terms, what is the vapour-compression cycle and where in it does the electricity actually do its work?",
    options: [
      "BS EN 61557-3 specifies the safety, performance and accuracy requirements for instruments measuring loop impedance. An instrument conforming to BS EN 61557-3 will generally meet the measurement range and resolution requirements for typical UK loop-impedance testing — domestic, commercial, light industrial. The standard also covers the test current characteristics, voltage withstand of the leads, and the accuracy bands the instrument has to meet across its declared measurement range. When you specify \\\\\\\"BS EN 61557-3 compliant\\\\\\\" on a procurement order or on a certificate, you\\\\\\\\\\\\\\\\\\\\\\\\'re relying on the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\'s declaration of conformance.",
      "The vapour-compression cycle has four stages around a closed loop. (1) Evaporator — refrigerant at low pressure absorbs heat from the source (outside air for ASHP, ground brine for GSHP, water for WSHP) and boils to a vapour. (2) Compressor — driven by an electric motor, pressurises the vapour, raising its temperature. The compressor is where the electrical energy enters the cycle as mechanical work. (3) Condenser — the hot high-pressure vapour gives up heat to the wet system (radiators, underfloor) and condenses to a liquid. (4) Expansion valve — the liquid drops in pressure, ready to evaporate again. The first law of thermodynamics is conserved — heat out of the condenser equals heat in at the evaporator plus the electrical work done by the compressor. The COP measures how much heat each kWh of electrical work moves.",
      "When the fault is obvious AND the obvious fix is risk-free AND the customer has been informed. Example: a blown bulb in an emergency-bulb socket — replace the bulb, verify operation, document. No need for full hypothesis. But — even the 'obvious' fix benefits from a quick stage check: is the customer's report consistent with the fix (yes, blown bulb explains 'no light'); is the bulb the correct rating; is the lampholder undamaged. The 5-second mental check catches the cases where 'obvious' wasn't actually right. Apprentices who skip even the mental check create comeback work.",
      "Three locations dominate: (1) Consumer unit busbar terminations — under-torqued by the original installer, oxidised over time, exposed under high inrush loads. Hager / Schneider / Wylex CUs typically. (2) Socket terminals — back-of-socket screw terminals on ring final loop-in, particularly on cheap accessories where the screw stops short of fully clamping the conductor. MK / Crabtree / BG. (3) Junction boxes — particularly Wago push-fit on solid copper conductors (intermittent contact issue) and old porcelain/screw boxes (loose over time). The common factor: terminations are where two conductors meet, mechanical contact is the only thing maintaining electrical contact, and any disturbance loosens the contact.",
    ],
    correctIndex: 1,
    explanation:
      "Four stages, one moving part (the compressor) that consumes the electricity. The L3 apprentice should be able to point to each stage on a unit diagram and explain what happens. The compressor is the only moving part the electrician supplies — sizing the cable to its rated current is part of the electrical scope. The refrigerant work is F-Gas-certified personnel territory.",
  },
  {
    id: "l3-m2-s3-sub4-cop-vs-scop",
    question:
      "Why does the manufacturer quote COP at A7 / W35 conditions and SCOP across the season — and which one matters more for the customer?",
    options: [
      "Significant. Many faults recur because the customer's behaviour caused or contributed to them — overloaded extensions, plug-in heaters on lighting circuits, kettle + microwave + toaster simultaneously. Educating the customer on the actual cause AND how to avoid recurrence is part of preventing the comeback. Format: brief verbal explanation during the work + written summary in the job sheet that the customer signs at completion. 'Your circuit is rated for X amps; running these appliances together exceeds that; consider running them sequentially OR add a dedicated circuit'. The customer's informed cooperation prevents 60–80% of behaviour-related comebacks.",
      "Near-miss = an unsafe condition or unsafe action that could have caused harm but didn't, by chance or by intervention. Examples in fault diagnosis — apprentice cuts a cable they thought was dead and it sparks (lucky there was no harm); a tool drops from a ladder onto an empty workspace; a meter is touched to a live conductor through poor probe technique. Near-miss reporting is the early-warning system — the same condition will eventually cause harm if not addressed. Most major incidents have a trail of near-misses preceding them (the 'Heinrich pyramid' or similar safety models). Reporting near-misses is normalised in safety-mature organisations; suppressing them (because of fear of blame) is the cultural pattern that precedes major incidents. The L3 apprentice's job is to report their near-misses honestly and to learn from others' reports.",
      "The fridge motor's start-up draws inrush current (typically 6–10× running current). The fridge runs at maybe 1.5 A; inrush is 9–15 A for 100 ms. That sudden current causes a voltage drop along the supply path. If the supply path has higher-than-design impedance — undersized cable, HRJ at a termination, oversized circuit relative to cable — the voltage drop is large enough to dim the lights momentarily. Most likely cause on older installations: HRJ at the consumer-unit incoming tail or the meter tails. On newer installations: undersized cable for the load. Diagnosis: clamp meter on the incoming tail during fridge cycle reveals the voltage drop magnitude; thermal imaging finds the HRJ.",
      "COP at A7 / W35 means coefficient of performance measured at outdoor air 7 °C and water flow temperature 35 °C — a mild day driving low-temperature underfloor. It is the manufacturer's headline number and is typically 4 to 5 for a modern ASHP. SCOP (seasonal COP) averages performance across a typical UK heating season — including the cold spells when the unit works hardest at higher flow temperatures and the COP drops. SCOP is the more honest customer number — typical 3.0 to 3.5 for a properly designed UK system on radiators, 3.5 to 4.5 on underfloor heating, lower on undersized emitters. MCS-certified installations are required to provide a SCOP estimate per the actual building heat loss and emitter design. Quote SCOP to customers when discussing running costs.",
    ],
    correctIndex: 3,
    explanation:
      "COP is the headline; SCOP is the bill. Customers told 'COP 4' read it as 'every kWh in produces 4 kWh of heat all winter' — wrong. The COP test point is mild conditions on low-temperature emitters; in real use the unit averages somewhat lower across the season. Modern MCS designers issue the SCOP estimate; the L3 apprentice should not quote COP without explaining the SCOP context.",
  },
  {
    id: "l3-m2-s3-sub4-emitter",
    question:
      "Why do heat-pump installations prefer underfloor heating or oversized radiators over the existing gas-boiler radiators?",
    options: [
      "BS 7671 applies regardless of whether the install is MCS-certified — it's the electrical safety regulation, not an MCS option. On both MCS and non-MCS installs the L3 electrician is responsible for BS 7671 compliance — design, installation, inspection and testing, certification (EIC). On MCS installs the certified installer additionally signs off the MCS install pack and accesses the funding incentives. On non-MCS installs there's no MCS sign-off and no incentive access, but BS 7671 compliance is unchanged. The distinction matters for the customer's funding access; it doesn't matter for the L3 electrician's electrical responsibility.",
      "Heat pumps deliver heat at a lower flow temperature than a gas boiler — typically 35 to 50 °C versus 65 to 75 °C for a boiler. The lower the flow temperature the higher the SCOP. Underfloor heating runs at 35 to 40 °C and gives the highest SCOP. Oversized radiators (larger surface area than the original boiler-sized radiators) deliver the same heat output at the lower flow temperature, keeping SCOP high. Original boiler radiators sized for 70 °C flow forced to run at 50 °C will deliver too little heat output — the room never reaches setpoint, the heat pump runs constantly, the customer is cold and the SCOP is poor. The MCS heat-loss survey identifies which rooms need radiator upgrades; the customer often has to budget for new emitters as part of the install.",
      "Six items. (1) RAMS — read, signed, fault-specific addendum present. (2) Permit — if commercial/industrial, signed by authorised manager. (3) Isolation plan — primary isolation point identified, lock-off device to hand. (4) Instruments — GS38 two-pole tester calibration in date, MFT calibration in date, batteries fresh, proving unit functional. (5) PPE — appropriate to voltage and environment, available and worn. (6) Comms — supervisor available by phone, lone-working check-in scheduled if alone. If any item is missing — STOP, escalate, don't start work. The checklist takes 30 seconds and protects you from every common cause of post-incident regret.",
      "G98 (fast-track) covers grid-connected generation up to and including 16 A per phase per inverter — single-phase 230 V that means 3.68 kW. G99 (pre-application) applies above that limit, on three-phase, on multi-inverter systems whose total exceeds the G98 cap, and on any second generator at a site that already has G98-connected generation. Mode of generation does not decide the document — capacity does. A 4 kWp PV array with a 3.68 kW inverter sits in G98; a 5 kWp array driving a 5 kW single-phase inverter sits in G99. The DNO needs the full G99 connection-application before commissioning, which adds typically 4-12 weeks of paperwork.",
    ],
    correctIndex: 1,
    explanation:
      "Emitter sizing is the difference between a happy customer and an unhappy one. Heat pumps are not 'gas boilers but electric' — they need a different system design because they deliver low-grade heat. Customer expectations need to be set up front: 'we may need to upgrade some radiators to keep your house warm at heat pump flow temperatures'. The MCS heat-loss calc identifies rooms that need emitter upgrades.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the difference between an ASHP, a GSHP and a WSHP and which is most common in UK domestic?",
    options: [
      "Voltage drop on the upstairs lighting circuit, OR a problem at the upstairs lighting tap-off. Most likely causes: (1) HRJ at a junction box upstream of the upstairs lights, (2) loose terminal at the lighting RCBO, (3) high-resistance neutral on the upstairs circuit (broken or partially connected), (4) under-sized cable retrofit (someone replaced cable with smaller cross-section). Test: measure voltage at an upstairs lampholder under normal load; compare to nominal 230 V. If significantly low (&lt;220 V), trace upstream for the HRJ. Thermal imaging at the suspected location.",
      "ASHP (air-source heat pump) takes heat from outside air via a fan-coil outdoor unit. Most common UK domestic install. Cheapest to install, COP varies most with weather. GSHP (ground-source heat pump) takes heat from the ground via a buried slinky pipe array (horizontal, needs garden space) or borehole array (vertical, needs ~£10-20k drilling). Higher SCOP because ground temperature is more stable than air, especially in winter. Higher install cost; rare in UK domestic outside of new-build with planning headroom. WSHP (water-source heat pump) takes heat from a pond, river or large body of water. Rare; site-dependent; needs environmental permitting (Environment Agency) and is mostly commercial / district scheme. The L3 electrician will see ASHPs on most jobs and GSHPs occasionally.",
      "Three categories. (1) Smart meter / utility meter failures — internal electronic failure (the meter itself stops measuring); diagnosis: voltage on the consumer side normal, customer reports billing issues; DNO call to replace meter. (2) Sub-metering installations (kWh meters at apartment level) — internal CT failure, terminal corrosion, comms link failure to BMS. (3) Specific instrument circuits in commercial buildings — temperature sensors, level sensors, flow meters; usually low-voltage SELV but with sensitive signal levels easily disrupted by EMI from nearby high-current cables. Diagnostic approach: substitute the suspect sensor with a known-good unit; if symptom moves, the sensor was at fault.",
      "(1) Why does the breaker trip? — overload current exceeds B-rating magnetic threshold (kettle 12 A inrush + existing load). (2) Why does the existing load + kettle exceed threshold? — too many loads on the same circuit. (3) Why too many loads? — kitchen ring designed in 1995 for fewer high-current appliances; modern kitchen has more. (4) Why the design is inadequate? — original installer specified to current consumption at the time, no margin for future appliance growth. (5) Why no margin? — no design standard for future-proofing kitchen circuits in 1995; standard practice was to size to immediate need. Root cause: undersized circuit for modern usage. Fix: upgrade to 32 A circuit with appropriate protection, OR redistribute appliances across multiple circuits, OR add additional kitchen circuit.",
    ],
    correctAnswer: 1,
    explanation:
      "ASHP dominates UK domestic because the install is straightforward — wall-mounted outdoor unit, pipe penetration through the wall, indoor controller. GSHP requires either garden excavation or borehole drilling, both expensive and disruptive. WSHP is niche. Most L3 apprentices will see ASHP on every install pre-2030; GSHP on the occasional new-build estate or large rural property.",
  },
  {
    id: 2,
    question:
      "What refrigerants are common in modern UK heat pumps and what does it mean for the install?",
    options: [
      "Thermal runaway is a self-sustaining exothermic chemical reaction inside the cell. Once it starts in one cell (typically triggered by internal short circuit, mechanical damage, overcharge, or sustained over-temperature) the heat from that cell propagates to the next cell, which also enters runaway, and so on through the pack. The reaction releases flammable and toxic gases (including hydrogen fluoride and carbon monoxide) and can reach 600+ degC. Standard CO2 or dry-powder extinguishers do not stop a runaway battery — water is used to cool surrounding cells and limit propagation, but the cell itself burns until its energy is spent. This is why siting, fire separation and the BMS exist — to prevent and contain runaway.",
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the L3 apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
      "R32 is the dominant refrigerant in current UK ASHP — moderate Global Warming Potential (GWP ~675), F-Gas regulated, mildly flammable (A2L category), efficient in vapour-compression. R290 (propane) is rapidly increasing in market share — natural refrigerant, very low GWP (~3), highly flammable (A3 category) requiring specific install practices (charge limits per BS EN 378, ventilation around outdoor unit, ignition source clearance). R454B is replacing R410A in some products as a lower-GWP step. R410A and R134a are older refrigerants being phased down under F-Gas. The L3 electrician does not handle refrigerant — that is F-Gas certified personnel — but should recognise the refrigerant on the unit nameplate because A3 (R290) units have additional spacing requirements at install (clearance from windows, vents, ignition sources).",
      "Three categories. (1) Smart meter / utility meter failures — internal electronic failure (the meter itself stops measuring); diagnosis: voltage on the consumer side normal, customer reports billing issues; DNO call to replace meter. (2) Sub-metering installations (kWh meters at apartment level) — internal CT failure, terminal corrosion, comms link failure to BMS. (3) Specific instrument circuits in commercial buildings — temperature sensors, level sensors, flow meters; usually low-voltage SELV but with sensitive signal levels easily disrupted by EMI from nearby high-current cables. Diagnostic approach: substitute the suspect sensor with a known-good unit; if symptom moves, the sensor was at fault.",
    ],
    correctAnswer: 2,
    explanation:
      "R32 dominates today; R290 is the future. F-Gas Regulations are pushing the industry toward natural refrigerants with low GWP. As an apprentice you should recognise the refrigerant from the nameplate and understand that R290 (propane) units need careful siting — windows, vents, ignition sources kept clear per the installation manual.",
  },
  {
    id: 3,
    question:
      "Why is the heat-loss calculation the most important document on a heat pump install?",
    options: [
      "You can't make someone seek help, but you can keep listening, keep checking in, and keep signposting gently. Suggest the Lighthouse Club 24/7 helpline (0345 605 1956) — confidential, no referral needed, no qualifying period. Mention Samaritans (116 123). Mention Mates in Mind resources. Don't break their confidence without asking, but if you genuinely believe they're at imminent risk of harm to themselves, the right thing is to call 999 or take them to A&E — that's a safeguarding step, not a betrayal. Look after yourself too — supporting a peer can be heavy. The same charities are available to you.",
      "EPS / backup is an optional inverter mode that lets the battery continue to feed selected circuits when the grid fails. Limitations: (1) the inverter must drop the grid connection cleanly first (anti-islanding) to keep DNO workers safe; (2) only the circuits wired to the backup output are powered, not the whole house; (3) the heat pump and EV charger usually exceed the backup inverter rating and are excluded; (4) the battery only runs for as long as its kWh lasts at the demand level; (5) PV charging during a cut depends on the inverter design — some hybrids can keep PV running off-grid, many cannot. Customers often expect 'whole-house indefinite backup' and get something much narrower; manage expectations early.",
      "R32 is the dominant refrigerant in current UK ASHP — moderate Global Warming Potential (GWP ~675), F-Gas regulated, mildly flammable (A2L category), efficient in vapour-compression. R290 (propane) is rapidly increasing in market share — natural refrigerant, very low GWP (~3), highly flammable (A3 category) requiring specific install practices (charge limits per BS EN 378, ventilation around outdoor unit, ignition source clearance). R454B is replacing R410A in some products as a lower-GWP step. R410A and R134a are older refrigerants being phased down under F-Gas. The L3 electrician does not handle refrigerant — that is F-Gas certified personnel — but should recognise the refrigerant on the unit nameplate because A3 (R290) units have additional spacing requirements at install (clearance from windows, vents, ignition sources).",
      "The heat-loss calc determines the unit size, the flow temperature, the emitter design, the SCOP estimate and ultimately whether the customer is warm and the running costs match the quote. MCS MIS 3005 mandates a room-by-room heat-loss calculation per BS EN 12831 — fabric-by-fabric, with U-values for each wall / window / floor / roof element, ventilation losses by air change rate, design outdoor temperature for the location, design indoor temperature for each room. The result is the design heat load (kW) which sizes the unit. Skip it or fudge it and the system either oversizes (cycles inefficiently, premature compressor wear, poor SCOP) or undersizes (cannot meet load on cold days, customer freezes, complaint city). The L3 apprentice does not run the heat-loss calc but should recognise it as the foundation document of the whole install.",
    ],
    correctAnswer: 3,
    explanation:
      "The heat-loss calc is to a heat pump install what the design current is to an electrical install — it sets everything downstream. MCS-certified designers spend hours on it because everything else hangs off the answer. As an apprentice on the install team you should be able to point to the heat-loss summary and recognise that the unit specified, the radiator schedule and the design flow temperature all derive from it.",
  },
  {
    id: 4,
    question:
      "How does an inverter-driven heat pump differ from an older fixed-speed unit, and why does it matter for SCOP?",
    options: [
      "Older fixed-speed heat pumps run the compressor at full output or off — short-cycling repeatedly to match a partial load. Each start consumes electricity and stresses the compressor. Modern inverter-driven units vary the compressor speed continuously to match the actual heat demand — running at 30 to 100 percent capacity smoothly. The result is better SCOP (less wasted starting energy), longer compressor life, quieter operation and more comfortable indoor temperatures. Almost every new domestic ASHP sold in the UK is inverter-driven. The L3 electrician sizes the supply to the rated nameplate current (the compressor at full speed); the variable-speed control is internal to the unit.",
      "Anti-islanding is the inverter's ability to detect when the grid has gone down and to disconnect itself within milliseconds — preventing the inverter from continuing to feed a portion of the local network ('islanding') with the DNO's workers expecting that section to be dead. ENA G98 (and G99 for larger systems) defines the protection settings the inverter must implement (typically G99/1-7 or earlier G83/G59 protection settings depending on inverter age). Modern inverters self-test the anti-islanding regularly. A4:2026 has refined the BS 7671 cross-references to G98/G99.",
      "Standard order: (1) Ze at the supply origin (incoming meter tails or the main switch). Establishes the supply impedance baseline. (2) Each circuit at its furthest point in turn — go in label order or by RCD group. Use no-trip mode on RCD-protected circuits. (3) For any borderline reading, retest in full trip mode after preparing for the trip. (4) For any failing reading, investigate (terminations, route length, CPC size). The order isn\\\\'t arbitrary — Ze first gives you the baseline you need to sanity-check the per-circuit readings.",
      "Construction (Design and Management) Regulations 2015 (CDM 2015), Statutory Instrument 2015/51. CDM 2015 covers ALL construction work, with extra duties triggered when the project is 'notifiable' (longer than 30 working days with more than 20 workers simultaneously, or exceeding 500 person-days). It sets duties for clients, principal designers, principal contractors, contractors and workers — including the apprentice's duty under Reg 8 to co-operate, take reasonable care and report defects.",
    ],
    correctAnswer: 0,
    explanation:
      "Inverter-driven (sometimes called 'modulating') is the modern standard. Variable-speed compressors give better SCOP because they avoid the start-stop losses of older fixed-speed units. The cost premium has fallen and is now standard. Type C MCB or RCBO is needed because of the start-up inrush even on inverter units.",
  },
  {
    id: 5,
    question:
      "What does the MCS designer do with the SCOP estimate and why does the customer need to see it?",
    options: [
      "Micro-CHP (Combined Heat and Power) generates electricity locally and uses the waste heat for space heating and hot water. Internal combustion engine (ICE) micro-CHP burns gas in a small reciprocating engine driving a generator; fuel cell micro-CHP combines hydrogen (from natural gas reformation) with oxygen in a fuel cell stack producing electricity directly. Both achieve high overall efficiency by using the waste heat. Both are gas-fired. Market relevance has collapsed because (1) UK grid carbon intensity has fallen below the per-kWh emissions of on-site gas combustion — heat pumps now win the carbon comparison; (2) Future Homes Standard removes new fossil-fuel boilers from new-build 2025; (3) RHI closed; (4) capital cost remained high. New domestic micro-CHP installs are rare today. Commercial CHP at 5-50 kWe still works in constant-heat-demand sites (hospitals, leisure centres, industrial process). The L3 electrician may meet legacy domestic micro-CHP on EICR.",
      "The MCS designer calculates the predicted SCOP per the heat-loss calc, the chosen emitter design, the unit specification and the design flow temperature. The result is shared with the customer in writing as part of the design proposal — typically alongside an estimated annual electricity consumption (kWh) and an estimated annual running cost using the customer's electricity tariff. This sets honest customer expectations and is the basis on which the customer makes the buy-or-not-buy decision. MCS Code of Practice requires this disclosure. Without the SCOP estimate, the customer is signing off a six-figure decision (especially with retrofit fabric work) on no basis. The L3 apprentice should be able to find the SCOP estimate in the design pack and discuss it at customer level if asked.",
      "Lifting equipment used to lift persons (MEWPs, lift platforms, scaffolding hoists carrying personnel) requires thorough examination at 6-monthly intervals. Other lifting equipment (chain blocks, manual hoists, anchor points used for material lifting only) requires 12-monthly thorough examination, OR in accordance with an examination scheme drawn up by a competent person. Per LOLER 1998 Reg 9(3). The examination is by a competent person (typically an independent examiner) and a written report is provided. The current report must be available with the machine.",
      "Anti-islanding is the inverter's ability to detect when the grid has gone down and to disconnect itself within milliseconds — preventing the inverter from continuing to feed a portion of the local network ('islanding') with the DNO's workers expecting that section to be dead. ENA G98 (and G99 for larger systems) defines the protection settings the inverter must implement (typically G99/1-7 or earlier G83/G59 protection settings depending on inverter age). Modern inverters self-test the anti-islanding regularly. A4:2026 has refined the BS 7671 cross-references to G98/G99.",
    ],
    correctAnswer: 1,
    explanation:
      "Honest SCOP disclosure is the difference between a satisfied customer and a complaint case. Customers who are told 'this will save you X per year' on a SCOP basis can verify the saving against their bill within a year. Customers who are sold on COP marketing find their bill higher than promised and the trust collapses. The L3 apprentice on site is the customer's real-time interface; knowing the SCOP estimate matters.",
  },
  {
    id: 6,
    question:
      "What is the typical electrical scope for the L3 apprentice on a domestic ASHP install?",
    options: [
      "Visual inspection happens at stage 1 (collect symptoms) and is structured. Look for: (1) Signs of past faults — scorched terminals, blackened insulation, soot marks, melted plastic, replaced fuses, taped joints. (2) Workmanship issues — over-stripped conductors visible at terminals, exposed conductors past the insulation, unfinished connections. (3) Environmental factors — water marks, condensation, dust accumulation, evidence of vermin, damaged cable runs. (4) System integrity — covers in place, accessories secured, signage current. The visual catches the easy 30% of faults before any instrument is used; the rest requires testing.",
      "Inrush current from the shower heater (typically 35–50 A for an 8.5 kW shower) causes voltage drop on the supply path. The lighting circuit branches off the same supply. The brief drop dims the lights for the duration of the inrush (typically 100–500 ms for the heater to reach steady state). If the inrush voltage drop is significant (&gt;5% of nominal), it suggests high impedance on the supply path — possibly a shared neutral, undersized supply tail, or HRJ at the consumer unit. If it's small (&lt;2%), it's normal behaviour. Diagnosis: clamp meter on the supply tail during shower start; voltage measurement at upstairs lighting at the same moment. Compare to BS 7671 Appendix 4 voltage-drop limits.",
      "The electrical scope: dedicated final circuit from the consumer unit (typical 32 A radial on 6 mm cable for 5-7 kW unit, 40 A on 10 mm for 9-12 kW; Type C MCB or RCBO because of compressor inrush); local means of isolation outside near the outdoor unit (rotary isolator with weatherproof enclosure to BS EN 60947-3); controls cabling between outdoor unit, indoor controller, room thermostats, weather compensation sensor, zone valves, hot water cylinder thermostat; immersion heater wiring on the cylinder (programmable thermostat for legionella protection); bonding of the outdoor chassis where the manufacturer specifies or where it is an extraneous-conductive-part; certification on the EIC. The refrigerant pipework, charge weighing, leak test and commissioning of the refrigeration circuit are F-Gas certified personnel territory and outside the L3 electrical scope.",
      "In approximate frequency order: (1) Socket terminals — back-of-socket screw terminals on the loop-in conductors; loosen over time; expose under load. (2) The ring break — at any point a previous installer cut the ring and rejoined into a JB, that joint is the weak point; particularly common when a kitchen extension was added and the ring was extended. (3) Spurs — single-socket spurs from the ring; the join into the ring is in a JB or behind the spur socket and is often wired with insufficient cable length. (4) The ring continuity itself — undersized or damaged cable through walls, particularly where chased cables have been re-plastered over and the chase has been dampened, accelerating insulation degradation.",
    ],
    correctAnswer: 2,
    explanation:
      "The electrical scope is well-defined and significant — dedicated supply, isolation, controls, bonding, certification. The controls cabling is often the time-consuming part — multiple zone valves, room thermostats, weather sensors, smart-home integration. The refrigeration trade lands separately and runs the refrigerant work; the plumber lands separately and runs the wet system. Three trades on one install.",
  },
  {
    id: 7,
    question:
      "Why does a heat pump need a Type C MCB or RCBO rather than Type B?",
    options: [
      "Cool, dry, ventilated location away from sources of ignition; not directly above or below escape routes; minimum clearances per the manufacturer's instructions for thermal management; not in a habitable room without a fire-rated enclosure or adequate fire separation; not in a loft (high temperature in summer, restricted access for emergency response); accessible for emergency isolation. The IET Code of Practice for Electrical Energy Storage Systems gives the framework. The manufacturer's installation manual is the binding instruction set; deviating from it voids the warranty and the BS 7671 compliance basis.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      "(a) OTHER PERSONNEL — other trades on site lose lighting / power for tools, may need to stop work; the firm's lone-working procedure may need adjusting. (b) CUSTOMER/CLIENT — loss of business activity, freezer stock at risk, computers go down (data loss risk), contractual penalties on commercial sites, customer dissatisfaction. (c) PUBLIC — emergency exits may go dark, public-area lighting fails, accessible plant rooms become hazardous, security systems may shut down. (d) BUILDING SYSTEMS — fire alarm goes into fault (with audible alert), emergency lighting batteries enter discharge cycle, lift goes to ground floor and stops, BMS may fault and require manual reset, refrigeration cycles interrupt, motors may auto-restart on power restoration with safety implications.",
      "Heat-pump compressors have a high inrush current at start-up — typically 5 to 10 times the rated running current for a few cycles as the motor starts. A Type B MCB trips at 3 to 5 times rated current; the compressor inrush can nuisance-trip a Type B even on a healthy install, especially in cold weather when the motor starts hardest. A Type C MCB trips at 5 to 10 times rated current — comfortably above the inrush, still well below the prospective fault current, gives reliable nuisance-trip-free operation while preserving fault protection. Modern inverter-driven units have softer start profiles than older fixed-speed units but Type C remains the standard recommendation. RCBOs in Type C variant are also commonly used to provide both overcurrent and 30 mA earth leakage protection in one device.",
    ],
    correctAnswer: 3,
    explanation:
      "Type C is the standard heat-pump answer. Type B MCBs that nuisance-trip on cold-morning compressor starts produce unhappy customers and emergency call-outs. The MCS-certified designer specifies the protective device on the design pack; the L3 apprentice fits per the design.",
  },
  {
    id: 8,
    question:
      "How does the heat pump deliver hot water and what is the legionella protection requirement?",
    options: [
      "Domestic ASHP installs usually include an unvented hot water cylinder (typically 200 to 300 L for a family home) with two heat sources — the heat pump heating coil (primary, low-temperature) and an electric immersion heater (secondary, higher-temperature). The heat pump heats the cylinder to 45 to 50 °C for normal hot water demand. The immersion heater is run periodically (typically weekly) to lift the cylinder temperature to 60 °C for at least 60 minutes for legionella pasteurisation per the WHS guidance under HSWA 1974 / L8 ACoP. Some heat pumps can do the legionella cycle themselves at high flow temperature without the immersion. The programmable thermostat on the immersion is the L3 electrician's wiring scope. Hot water at 60 °C is hot enough to scald — anti-scald TMVs are required at outlets per Building Regs Part G.",
      "Five lone-working controls before you start. (1) Documented lone-working policy from your employer authorising you to be on site alone for this category of work. (2) Buddy / check-in system — typically a phone call or text to the office every 30–60 minutes; failure to check in triggers an escalation. (3) First-aider known to be reachable, or HSE first-aid arrangements appropriate to the site (lone-worker apps with man-down detection are increasingly standard). (4) Rescue / extraction plan — if you suffered a shock, who knows where you are and who has the keys / access? (5) Authority limits — solo unsupervised diagnosis on a live installation is JIB Approved Electrician work, NOT apprentice work; an L3 apprentice should not be alone on a fault job that involves any live testing without explicit supervision arrangement.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "Significant. Many faults recur because the customer's behaviour caused or contributed to them — overloaded extensions, plug-in heaters on lighting circuits, kettle + microwave + toaster simultaneously. Educating the customer on the actual cause AND how to avoid recurrence is part of preventing the comeback. Format: brief verbal explanation during the work + written summary in the job sheet that the customer signs at completion. 'Your circuit is rated for X amps; running these appliances together exceeds that; consider running them sequentially OR add a dedicated circuit'. The customer's informed cooperation prevents 60–80% of behaviour-related comebacks.",
    ],
    correctAnswer: 0,
    explanation:
      "Hot water is the heat pump's secondary job after space heating. Legionella protection is the safety-critical part — Legionnaires disease is a real risk in tepid stored water. The 60 °C weekly pasteurisation cycle is a non-negotiable. The programmable immersion thermostat that does this is part of the L3 apprentice wiring scope.",
  },
];

const faqs = [
  {
    question: "What is the realistic SCOP I should expect on a properly designed UK ASHP?",
    answer:
      "On a well-designed install with appropriately sized radiators (oversized vs original boiler-sized) or underfloor heating, design flow temperature 45 to 50 °C, modern inverter-driven unit, well-insulated property — SCOP 3.0 to 3.5 on radiators, 3.5 to 4.5 on underfloor. Marginal installs with original undersized radiators forced to run at 55 to 60 °C will post SCOP 2.5 to 3.0. SCOP below 2.5 indicates either poor design (undersized emitters) or poor install (refrigerant leak, controls misconfiguration) and is a warning sign. The MCS designer issues a SCOP estimate per house; comparing actual SCOP after a year against the estimate is a useful health check.",
  },
  {
    question: "Why does the outdoor unit blow cold air in winter?",
    answer:
      "An ASHP extracts heat from outside air. The outdoor coil takes heat from the air, so air leaving the coil is colder than air entering. In winter this can be visibly cold (as low as -10 °C leaving) and on humid cold days you may see frost on the coil and ice forming on the ground below the unit. This is normal and expected — the unit is doing its job. The defrost cycle (a brief reverse of the cycle to warm the outdoor coil and shed accumulated frost) is also normal — typically every 30 to 60 minutes in cold conditions. Customers occasionally report this as a fault; explain it is the unit working as designed.",
  },
  {
    question: "Can a heat pump replace a gas boiler one-for-one?",
    answer:
      "Sometimes, but not always. The honest answer depends on the building fabric and the existing radiator system. A well-insulated property with reasonably sized radiators may accept a heat pump with no fabric work and no emitter upgrades. A leaky 1930s semi with single-glazing and undersized radiators needs fabric upgrades (insulation, double glazing) and emitter upgrades (larger radiators or underfloor) to achieve a good SCOP. The MCS heat-loss survey identifies exactly what is needed. Customers expecting 'rip out the boiler, drop in a heat pump, done' need an honest conversation about the wider scope.",
  },
  {
    question: "What about hybrid systems — heat pump and gas boiler together?",
    answer:
      "Hybrid systems use a heat pump for the bulk of the heating load and a gas boiler for cold-weather peaks and hot water. Justified historically where the existing boiler and radiator system was hard to replace; less attractive now as grid carbon falls and heat pump performance improves. Future Homes Standard takes new fossil-fuel boilers off new-build from 2025; hybrid retrofit may persist for some niche cases but the policy direction is heat-pump-only. The L3 electrician will see fewer hybrids over time.",
  },
  {
    question: "What is the noise level outside and is it a planning issue?",
    answer:
      "Modern domestic ASHP outdoor units are typically rated 45 to 55 dB(A) at 1 metre. Permitted Development rules (England) include MCS planning standard MIS 020 noise assessment that limits noise at the nearest neighbour assessment position to 42 dB(A) — typically achievable with sensible siting (1 metre from boundary, away from neighbour windows). MCS-certified designers complete the MCS noise assessment as part of the design. Local Planning Authority can require a separate planning application if the install falls outside Permitted Development. The L3 apprentice should expect to see the noise assessment in the install pack.",
  },
  {
    question: "Why do MCS designs sometimes specify a buffer tank or volumiser?",
    answer:
      "A buffer tank or volumiser is a small extra hot-water tank (typically 25 to 75 L) plumbed into the heating circuit between the heat pump and the emitters. Its job is to stabilise the heat pump cycle — preventing short-cycling when the heating demand falls below the heat pump minimum modulation level. Modern inverter-driven units modulate well and may not need a buffer; older systems with high turndown ratios benefit. The MCS designer specifies whether a buffer is needed per the heat-loss calc and the unit modulation profile. The buffer is plumbing scope — the L3 electrician installs the controls (immersion if any, sensors) but not the wet pipework.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 4"
            title="Heat pump system technology deeper"
            description="The vapour-compression cycle in plain English. COP / SCOP at apprentice level. Emitter sizing trade-offs. ASHP / GSHP / WSHP comparison. Refrigerant options and the F-Gas trade boundary. The electrical scope sits alongside refrigeration and plumbing — recognise where each starts and stops."
            tone="emerald"
          />

          <TLDR
            points={[
              "Vapour-compression cycle has four stages: evaporator (heat in), compressor (electrical work in), condenser (heat out), expansion valve (reset). The compressor is where the electricity does its work.",
              "COP is the headline at A7 / W35 mild conditions; SCOP averages across the heating season. SCOP 3.0-3.5 on radiators, 3.5-4.5 on underfloor is good; below 2.5 indicates a problem.",
              "Emitter sizing matters — heat pumps deliver low-temperature heat, so emitters need to be larger than gas-boiler-sized to deliver the same room output.",
              "ASHP dominates UK domestic; GSHP is rare outside new-build with garden space. R32 dominates current refrigerants; R290 (propane) is rising and needs careful siting clearances.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the four stages of the vapour-compression cycle in plain physics terms — evaporator, compressor, condenser, expansion valve.",
              "Explain the difference between COP at A7 / W35 and SCOP across the heating season; identify realistic SCOP ranges for UK domestic installs.",
              "Describe why emitter sizing matters for heat pump SCOP and what flow temperatures correspond to underfloor, oversized radiators and original boiler-sized radiators.",
              "Compare ASHP, GSHP and WSHP at recognition level — install cost, SCOP, market prevalence in UK domestic.",
              "Recognise current refrigerants (R32, R290, R454B) on a unit nameplate and identify the F-Gas trade boundary at apprentice level.",
              "Identify the L3 electrical scope on an ASHP install — supply, isolation, controls, bonding, certification — distinct from the F-Gas refrigeration and the wet plumbing.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The vapour-compression cycle in plain English</ContentEyebrow>

          <ConceptBlock
            title="Four stages, one moving part, no magic"
            plainEnglish="A heat pump runs the same physics as your fridge but in the reverse direction. A fridge moves heat from inside the cabinet to the room behind it; a heat pump moves heat from outside the building to inside. The same four-stage closed loop is involved — refrigerant evaporates somewhere cold to absorb heat, gets compressed (electrical work), condenses somewhere warmer to give up heat, then expands back to low pressure for the next cycle. Energy is conserved throughout — heat out of the condenser equals heat in at the evaporator plus the electrical work the compressor did."
            onSite="The L3 electrician supplies one moving part — the compressor motor. Sizing the supply cable to the rated current, fitting Type C protection, providing local isolation, terminating the controls, bonding the chassis. The refrigerant pipework and the four-stage process happen inside the unit; you do not open the refrigerant circuit at any point unless you are F-Gas certified separately."
          >
            <p>
              The four stages, in order around the loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Evaporator (cold side)</strong> — refrigerant at low pressure
                (typically 5-10 bar) is below the source temperature. It absorbs heat from
                the source (outside air for ASHP, ground brine for GSHP, water for WSHP)
                and boils to a vapour. The source loses heat; the refrigerant gains it.
              </li>
              <li>
                <strong>Compressor (electrical work in)</strong> — the heart of the
                system. An electric motor drives a scroll, rotary or piston compressor
                that pressurises the vapour to a high pressure (typically 25-40 bar).
                Compression raises both the pressure and the temperature of the vapour.
                The electrical energy enters the cycle here as mechanical work on the
                refrigerant.
              </li>
              <li>
                <strong>Condenser (hot side)</strong> — the hot high-pressure vapour
                meets the wet system (radiator or underfloor circuit) which is at a lower
                temperature. Heat flows from the refrigerant to the wet system; the
                refrigerant condenses to a liquid. The wet system gains heat; the
                refrigerant loses it.
              </li>
              <li>
                <strong>Expansion valve (pressure reset)</strong> — the high-pressure
                liquid drops in pressure through a metering device (thermal expansion
                valve or electronic expansion valve), cooling sharply as it expands. The
                cycle is now ready to start again at the evaporator.
              </li>
            </ul>
            <p>
              Energy balance: heat delivered to the wet system = heat extracted from the
              source + electrical work done by the compressor. The COP is the ratio of
              the first to the third — useful heat delivered per kWh of electricity
              consumed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="F-Gas Regulations — EU Regulation 517/2014 (retained UK law) and the Fluorinated Greenhouse Gases Regulations 2015"
            clause={
              <>
                Work on equipment containing fluorinated refrigerants requires
                personnel to hold a current F-Gas qualification appropriate to
                the work category (installation, leak checking, recovery,
                servicing). It is a regulatory offence to install, service or
                decommission F-Gas refrigerant circuits without certification.
                The Regulations cover R32, R410A, R134a, R404A, R454B and
                related fluorinated refrigerants. Natural refrigerants (R290
                propane, CO2, ammonia) sit outside F-Gas but inside other
                competence frameworks (BS EN 378 hydrocarbon handling).
              </>
            }
            meaning={
              <>
                F-Gas is a hard trade boundary. The L3 electrician does NOT
                touch the refrigerant circuit unless they hold separate F-Gas
                certification (typically City and Guilds 2079 or equivalent).
                The electrical scope (supply, isolation, controls, bonding) is
                BS 7671 territory and within the L3 scope; the refrigerant
                scope is F-Gas territory and requires separate competence. The
                two trades work alongside each other on a heat pump install.
                Crossing the boundary without certification is a regulatory
                offence and an insurance issue.
              </>
            }
            cite="Source: EU Regulation 517/2014 (retained UK law) and SI 2015/310 — Fluorinated Greenhouse Gases Regulations 2015. Full text on legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>COP and SCOP — the two efficiency numbers</ContentEyebrow>

          <ConceptBlock
            title="COP is the marketing number; SCOP is the bill"
            plainEnglish="COP (Coefficient of Performance) is measured at a specific test point — typically A7 / W35 (outdoor 7 °C, water flow 35 °C). It is a manufacturer headline. SCOP (Seasonal COP) averages performance across a typical UK heating season including the cold spells when the unit works hardest at higher flow temperatures. SCOP is the more honest customer number because it tracks real running cost. The MCS designer issues a SCOP estimate per actual building heat loss and chosen emitter design; that estimate is what the customer should be told about expected running cost."
            onSite="When a customer asks 'how efficient is this thing' the answer should be SCOP-based: 'on your design with these emitters, the MCS estimate is SCOP X — meaning every kWh of electricity moves about X kWh of heat into your house, averaged across the year'. Quoting raw COP without the SCOP context is what generates angry customers a year later when the bills do not match the marketing."
          >
            <p>
              Realistic UK SCOP ranges:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor heating, design flow 35 °C, well-insulated property</strong> —
                SCOP 3.5 to 4.5. The best-case scenario.
              </li>
              <li>
                <strong>Oversized radiators, design flow 45 °C, reasonable insulation</strong> —
                SCOP 3.0 to 3.5. The typical retrofit target.
              </li>
              <li>
                <strong>Mixed system, design flow 50 °C, average insulation</strong> —
                SCOP 2.8 to 3.2. Acceptable but not optimal.
              </li>
              <li>
                <strong>Original boiler-sized radiators, design flow 55-60 °C, marginal
                insulation</strong> — SCOP 2.3 to 2.8. Warning territory; running cost
                may exceed customer expectations.
              </li>
              <li>
                <strong>SCOP below 2.0</strong> — install pathology. Refrigerant
                undercharge, undersized emitters causing constant high-flow operation,
                controls misconfigured, weather compensation off. Warrants investigation.
              </li>
            </ul>
            <p>
              The carbon comparison: gas combustion in a domestic boiler produces about
              210 gCO2 per kWh of useful heat. A heat pump at SCOP 3.0 on a UK grid at
              200 gCO2 per kWh of electricity emits about 67 gCO2 per kWh of heat — roughly
              three times cleaner. As the grid carbon intensity continues to fall, the heat
              pump gets cleaner without any change to the kit; gas boilers do not.
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

          <ContentEyebrow>Emitter sizing — why the radiators matter</ContentEyebrow>

          <ConceptBlock
            title="Lower flow temperature, larger emitters, better SCOP"
            plainEnglish="A radiator delivers heat to the room at a rate proportional to the difference between the radiator surface and the room temperature. A radiator at 70 °C in a 20 °C room delivers a lot of heat per square metre of surface. The same radiator at 50 °C in a 20 °C room delivers about half. To get the same room heat output at the lower flow temperature, you need either more surface area (bigger radiators) or a different emitter (underfloor heating with very large surface area at low temperature)."
            onSite="The MCS heat-loss calc identifies design heat output needed per room. The MCS designer then picks emitters that deliver that output at the chosen design flow temperature. Original boiler-sized radiators sized for 70 °C flow may need replacing with larger units to deliver the same output at 50 °C. The customer needs to know this at design stage — radiator upgrades can add four-figure cost and disruption to the install. The L3 apprentice does not size radiators (plumbing trade) but should recognise the radiator schedule in the install pack and understand why the upgrade list exists."
          >
            <p>
              Practical implications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor heating</strong> — very large emitter surface area
                (whole floor). Runs at 30-40 °C flow. Highest SCOP. Ideal for new-build
                or major retrofit. Cost is the install (screed, manifold, controls).
              </li>
              <li>
                <strong>Oversized radiators</strong> — typical retrofit answer. Replace
                original radiators with larger units (often double-panel double-convector)
                sized for 45-50 °C flow. Lower install cost than underfloor; cosmetic
                impact (larger units in each room).
              </li>
              <li>
                <strong>Original radiators retained</strong> — sometimes feasible in
                rooms where the original radiator was already oversized for the load.
                Force the heat pump to higher flow temperature (55-60 °C) and accept the
                SCOP hit. Often the cheapest install but the worst running cost.
              </li>
              <li>
                <strong>Skirting heating, low-temperature trench convectors</strong> —
                niche emitter types that work well at low flow temperature. Cosmetic
                appeal in some properties.
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

          <ContentEyebrow>ASHP, GSHP, WSHP — what each is</ContentEyebrow>

          <ConceptBlock
            title="Three source options; ASHP dominates UK domestic"
            plainEnglish="ASHP (Air-Source Heat Pump) takes heat from outside air via a fan-coil outdoor unit. Most common UK domestic install. Cheapest. Performance varies most with weather — colder air means lower COP, defrost cycles in cold humid conditions. GSHP (Ground-Source Heat Pump) takes heat from the ground via a buried pipe array. Higher SCOP because ground temperature is more stable. Higher install cost because the ground loop needs garden excavation (slinky) or borehole drilling. WSHP (Water-Source Heat Pump) takes heat from a pond, river or large body of water. Rare; site-specific; needs Environment Agency permitting; mostly commercial / district scheme."
            onSite="Most L3 apprentices will see ASHPs on every install pre-2030; GSHPs occasionally on new-build estates with garden space or large rural retrofit; WSHPs rarely. The electrical scope is broadly similar across all three (supply to a compressor, isolation, controls, bonding) — the differences are in the source-side install (refrigerant circuit for ASHP, ground loop for GSHP, water heat exchanger for WSHP) which is outside the L3 electrical scope."
          >
            <p>
              Practical comparison at apprentice level:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ASHP install cost</strong> — typically £8-15k for a 5-7 kW unit
                including emitter upgrades on a typical UK retrofit. Boiler Upgrade
                Scheme grant (BUS) £7,500 in England / Wales (subject to ongoing scheme
                terms).
              </li>
              <li>
                <strong>GSHP install cost</strong> — typically £15-30k including ground
                loop. Slinky horizontal £4-8k extra; borehole £10-20k extra. BUS grant
                £7,500 (same as ASHP — no premium for GSHP).
              </li>
              <li>
                <strong>WSHP install cost</strong> — site-dependent, plus Environment
                Agency permitting. Mostly commercial.
              </li>
              <li>
                <strong>SCOP comparison</strong> — ASHP 3.0-3.5 typical retrofit; GSHP
                3.5-4.5 typical due to stable ground temperature.
              </li>
              <li>
                <strong>Maintenance burden</strong> — all three need annual service per
                MCS Code and warranty terms. ASHP has the visible outdoor unit needing
                occasional cleaning of fins. GSHP has no outdoor moving parts above
                ground. WSHP needs occasional inspection of the underwater heat exchanger.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Refrigerants — R32 today, R290 increasingly"
            plainEnglish="Modern UK ASHPs use R32, R290 (propane) or R454B refrigerant. R32 dominates current sales — moderate Global Warming Potential (~675), F-Gas regulated, mildly flammable (A2L). R290 is rapidly rising — natural hydrocarbon, very low GWP (~3), highly flammable (A3) requiring specific install practices per BS EN 378 (charge limits, ventilation around the outdoor unit, ignition source clearances). R454B is replacing R410A as a lower-GWP step-change. Older refrigerants (R410A, R134a) are being phased down under F-Gas. The L3 electrician does not handle refrigerant but should recognise the type from the unit nameplate."
            onSite="R290 (propane) units have specific install rules — typically 1 metre clearance from openable windows / vents, 3 metres from ignition sources (spark-producing electrical equipment, hot exhausts), and the outdoor unit must be sited where any leaked propane disperses upwards rather than pooling. The MCS-certified designer checks these clearances at survey; the L3 apprentice should recognise the rules and not site any electrical isolators inside the no-ignition-source zone around an R290 outdoor unit."
          >
            <p>
              Refrigerant categories in plain terms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A1 (non-flammable)</strong> — older refrigerants like R410A,
                R134a. F-Gas regulated, being phased down because of high GWP.
              </li>
              <li>
                <strong>A2L (mildly flammable)</strong> — R32, R454B. F-Gas regulated.
                Some restrictions on charge size and confined space install. Most current
                UK ASHPs.
              </li>
              <li>
                <strong>A3 (highly flammable)</strong> — R290 (propane). Natural,
                non-F-Gas, very low GWP. Specific install rules per BS EN 378 — charge
                limits typically 0.152 kg of propane per cubic metre of room volume
                (indoor), generous clearances outdoor.
              </li>
              <li>
                <strong>B (toxic)</strong> — R717 ammonia. Industrial only; not
                domestic.
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

          <ConceptBlock
            title="Hot water cylinders — sizing, recovery and the legionella cycle"
            plainEnglish="A heat pump's hot water side runs differently from a gas combi. The cylinder is heated to roughly 50 degrees C in normal operation (heat pump SCOP drops sharply above 55 degrees C, so designers keep the temperature low), with a weekly anti-legionella cycle to 60 degrees C using either the heat pump's full output or a backup immersion. Cylinder size is set by the household's hot water demand pattern — a 4-bed family home typically uses a 250-300 L cylinder; a 5-bed with two showers in the morning needs 300-400 L."
            onSite="The L3 apprentice's electrical scope on the cylinder is the immersion supply, the cylinder thermostat, and the controls that command the heat pump to run on hot water priority. The plumber installs the cylinder and the dry pocket for the thermostat; the heat pump installer wires the controls. Ensure the immersion is on its own circuit (typical 3 kW on a 16 A B-curve MCB) so it can run as backup if the heat pump is out of service. Document the anti-legionella schedule on the handover — customers occasionally turn it off to save energy and inadvertently breach the Health and Safety at Work guidance on legionella."
          >
            <p>
              Heat-pump cylinder design factors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cylinder size</strong> — driven by daily peak hot
                water draw; 250-300 L typical for a 4-bed.
              </li>
              <li>
                <strong>Coil rating</strong> — heat-pump-rated cylinders have
                an oversized coil so the heat pump can charge the cylinder at
                its low flow temperature; gas cylinders' undersized coils are
                not suitable.
              </li>
              <li>
                <strong>Storage temperature</strong> — typically 50 degrees C
                normal, 60 degrees C anti-legionella weekly.
              </li>
              <li>
                <strong>Backup immersion</strong> — typical 3 kW on a 16 A
                B-curve MCB with its own thermostat; runs as backup or as the
                anti-legionella heat source.
              </li>
              <li>
                <strong>Smart controls</strong> — controls schedule the heat
                pump for cylinder priority overnight (cheap-rate tariff if
                available); the apprentice should recognise the schedule
                pattern at handover.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Buffer tanks and volumiser — when and why they appear in the install"
            plainEnglish="A buffer tank is a small (50-200 L) insulated water tank between the heat pump and the heating circuit. It provides thermal mass to prevent short-cycling on lightly-loaded systems and to handle defrost cycles smoothly. A volumiser is a similar small tank used to add volume to the system loop without adding mixing capability. The L3 apprentice on a heat-pump install will encounter both in design packs — recognising which is which matters for the controls and the bonding."
            onSite="The buffer tank is typically wired with its own circulating pump that draws from the buffer to the emitters; the heat pump charges the buffer at its own flow rate. Bonding to the buffer tank chassis goes back to the MET via the local CPC. A volumiser is plumbed inline, no extra pump or controls, no bonding implications beyond the existing pipework. Customer brief at handover — the buffer tank is normal and necessary; do not turn off the buffer pump as a 'fuel saving' measure (the heat pump short-cycles and SCOP collapses)."
          >
            <p>
              Buffer tank vs volumiser — recognising the difference:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Buffer tank with separate pump</strong> — adds
                thermal mass and decouples the heat pump cycle from the
                emitter demand; runs the heat pump at its sweet-spot flow
                rate even when the rooms are lightly demanding heat.
              </li>
              <li>
                <strong>Volumiser inline</strong> — adds water volume to
                meet the manufacturer's minimum system volume (often
                30-50 L per kW of heat pump rating); no controls or
                bonding implications.
              </li>
              <li>
                <strong>Anti-cycling on small loads</strong> — buffer
                tank holds the heat output when only one or two
                radiators are calling for heat; without it, the heat pump
                would short-cycle and SCOP would collapse.
              </li>
              <li>
                <strong>Smooth defrost</strong> — buffer water rides through
                the heat pump's defrost cycle (a few minutes once or twice
                an hour in cold weather) so the rooms do not feel the
                temperature drop.
              </li>
              <li>
                <strong>Customer brief</strong> — leave the buffer pump
                running; the buffer is part of the system, not optional.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Backup heating strategy — bivalent, bivalent-parallel and emergency immersion"
            plainEnglish="Heat pumps deliver less heat as the outdoor air drops below the design temperature. On the coldest UK days (-3 to -8 degrees C in southern England, lower in Scotland) the heat pump may not deliver the full design heat output. The design strategy is bivalent (heat pump alone above the bivalent point, electric backup below), bivalent-parallel (heat pump plus electric resistance running together below the bivalent point), or emergency immersion (only used if the heat pump fails)."
            onSite="The L3 apprentice's electrical contribution is the backup heater supply — typically a 3-12 kW electric immersion or inline electric heater, on its own circuit sized to its rated current (3 kW = 16 A B-curve, 9 kW = 40 A B-curve, 12 kW = 50 A B-curve), with its own RCD or RCBO. The controls strategy is set by the heat pump installer — backup activates automatically when the heat pump cannot meet demand, or only when the customer presses the emergency heat button. Document the strategy on handover so the customer knows what to expect on the coldest days."
          >
            <p>
              Backup heating strategy options:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bivalent (heat-pump only above bivalent point)</strong>
                — backup activates below a set outdoor temperature; the
                heat pump shuts down when backup is on.
              </li>
              <li>
                <strong>Bivalent-parallel (both run below bivalent
                point)</strong> — heat pump continues at part-load below
                the bivalent point, supplemented by the electric backup
                to reach demand.
              </li>
              <li>
                <strong>Emergency immersion only</strong> — heat pump runs
                alone year-round; backup only used if the heat pump
                fails. Less expensive on capital but customer is colder
                on the coldest days.
              </li>
              <li>
                <strong>Inline electric resistance vs cylinder
                immersion</strong> — inline heats the system flow water
                directly; immersion heats the cylinder only. Different
                wiring and controls; pick the one the design calls for.
              </li>
              <li>
                <strong>Customer brief</strong> — explain that backup may
                run on cold days; bills will rise; this is normal and
                already in the SCOP estimate.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="MCS MIS 3005 — Heat Pump Installation Standard (paraphrased)"
            clause={
              <>
                MCS MIS 3005 sets requirements for the design, installation,
                commissioning and handover of heat pump systems. It mandates a
                room-by-room heat-loss calculation per BS EN 12831, an emitter
                schedule sized for the chosen design flow temperature, a SCOP
                estimate disclosed to the customer, eligible product selection
                from the MCS-certified product list, refrigerant work by F-Gas
                certified personnel, electrical work to BS 7671, and a
                commissioning certificate issued through the installer MCS
                umbrella scheme.
              </>
            }
            meaning={
              <>
                MIS 3005 is the heat pump install standard. Customer
                eligibility for the Boiler Upgrade Scheme grant depends on an
                MIS 3005-compliant install. The L3 apprentice on a heat pump
                install works under the MCS-certified installer competence. You
                do not need to memorise the MIS 3005 clause numbers but you
                should recognise it as the document that ties the install
                together — heat-loss calc, emitter sizing, SCOP disclosure,
                product selection, F-Gas refrigerant, BS 7671 electrical,
                commissioning evidence.
              </>
            }
            cite="Source: MCS MIS 3005 (paraphrased from the latest published Issue — full text on the MCS website)."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting COP without SCOP and setting customer expectations on the wrong number"
            whatHappens={
              <>
                Customer is told this heat pump is COP 4. They read that as
                every kWh in produces 4 kWh of heat all winter. In practice
                COP 4 is the manufacturer A7 / W35 number — a mild day on
                low-temperature underfloor. The same unit driving 60 °C
                radiators on a -2 °C frost morning is closer to COP 2.0. The
                customer actual seasonal performance is the SCOP — typically
                3.0 to 3.5 on a properly designed UK retrofit, lower for
                marginal installs. When the bills come in higher than
                expected, the apprentice gets the phone call.
              </>
            }
            doInstead={
              <>
                Always quote SCOP, not COP, when discussing running costs with
                the customer. MCS-certified installations are required to
                provide a SCOP estimate based on the actual building heat loss
                and emitter design. If you do not have SCOP at hand, say COP
                at standard conditions — actual seasonal performance will be
                lower and refer them to the MCS designer for the realistic
                figure.
              </>
            }
          />

          <CommonMistake
            title="Siting an electrical isolator inside the no-ignition-source zone of an R290 outdoor unit"
            whatHappens={
              <>
                R290 (propane) heat pump outdoor unit specifies 1 metre clearance
                from openable windows and 3 metres from ignition sources. The
                electrician fits the local rotary isolator (a switching device
                with potential for arc on operation) inside the 3 metre zone
                because that was the easiest cable run. In normal operation,
                no problem. In a leak scenario (refrigerant pipe failure
                releasing propane), the isolator becomes an ignition risk
                during operation. Under BS EN 378 hydrocarbon handling rules
                this is a non-compliance.
              </>
            }
            doInstead={
              <>
                Read the manufacturer install manual at survey stage to
                identify the no-ignition-source zone for the specific R290
                unit. Site the isolator outside the zone — typically on a wall
                3+ metres from the unit, or inside the building near the
                consumer unit if the cable run allows. Coordinate with the
                MCS designer at design stage so the isolator location is on
                the install drawings and not improvised at install time.
              </>
            }
          />

          <Scenario
            title="Survey day — customer asks 'will it heat my house?'"
            situation={
              <>
                You are assisting on a survey for a 1980s 4-bed detached. The
                customer is replacing a 24 kW gas combi with an ASHP. The
                MCS-certified surveyor is running the heat-loss calc. The
                customer asks you while the surveyor is in the loft 'so will
                this heat pump actually heat my house in winter?'.
              </>
            }
            whatToDo={
              <>
                Honest framing: 'the surveyor is calculating exactly that
                right now. Heat pumps deliver heat at a lower flow temperature
                than your old combi — about 45-50 °C versus 70 °C. To get
                the same room temperature at the lower flow, we may need to
                upsize some of your radiators. The surveyor will identify
                which rooms need new radiators and the SCOP estimate will
                tell you the expected running cost. If your insulation is
                reasonable, a properly sized heat pump will keep your house
                warm through every UK winter on record. If your insulation
                is poor, we may recommend cavity wall and loft top-up before
                the heat pump is sized — fabric first is cheaper and more
                effective than oversizing the heat pump.' Avoid promises
                about specific bills until the SCOP estimate is in.
              </>
            }
            whyItMatters={
              <>
                Customers ask the apprentice on site because the apprentice
                is approachable. A trained, honest answer protects the
                customer relationship and the firm reputation. Avoid the
                marketing line ('heat pumps are amazing'); deliver the
                physics line ('they work; the design has to be right; the
                radiators may need an upgrade'). The MCS designer will
                back the conversation with numbers in a few days.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (RCD additional protection — sockets ≤32 A)"
            clause={
              <>
                Regulation 411.3.3 of BS 7671:2018+A4:2026 has been revised and now applies to
                socket-outlets with a rated current not exceeding 32 A. There is an exception to
                omit RCD protection where, other than for a dwelling, a documented risk
                assessment determines that RCD protection is not necessary.
              </>
            }
            meaning={
              <>
                Wind and micro-hydro installs almost always include local socket-outlets at the
                turbine house or controls cabinet for service work. Those sockets fall under the
                411.3.3 32 A threshold and require RCD protection. The risk-assessment exemption
                only applies outside dwellings.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.3.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Vapour-compression cycle — evaporator, compressor, condenser, expansion valve. The compressor is the only moving part the L3 electrician supplies.",
              "F-Gas Regulations are a hard trade boundary. Refrigerant work by F-Gas certified personnel only. Electrical scope is BS 7671 territory and within L3 scope.",
              "COP at A7 / W35 is the marketing headline; SCOP across the season is the bill. SCOP 3.0-3.5 on radiators, 3.5-4.5 on underfloor is the realistic UK target.",
              "Emitter sizing is critical — heat pumps deliver low-temperature heat, so emitters need to be larger than original gas-boiler radiators for the same room output.",
              "ASHP dominates UK domestic; GSHP rare outside new-build with garden space. R32 and R290 (propane) are current refrigerants; R290 needs careful clearances.",
              "MCS MIS 3005 is the install standard — heat-loss calc, emitter schedule, SCOP estimate, product selection, F-Gas refrigerant, BS 7671 electrical, commissioning certificate.",
              "L3 electrical scope on ASHP — 32-40 A radial Type C, local isolator, controls cabling, immersion heater wiring with 60 °C legionella thermostat, EIC certification.",
              "Annual service required for warranty validity; the legionella weekly 60 °C cycle is non-negotiable for safety.",
            ]}
          />

          <Quiz title="Heat pump system technology deeper — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 MVHR, wind, micro-CHP, biomass overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Wind, hydro, CHP, biomass deeper
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
