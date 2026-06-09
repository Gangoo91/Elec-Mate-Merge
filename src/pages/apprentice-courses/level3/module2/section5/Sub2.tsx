/**
 * Module 2 · Section 5 · Subsection 2 — Commissioning and customer handover
 * Maps to City & Guilds 2365-03 / Unit 301 / LO3 / AC 3.1
 *   AC 3.1 — "describe the considerations for installation and commissioning of
 *             environmental technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 3.1 (provide information on operational
 * requirements and benefits of environmental technology systems).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed commissioning competence belongs in
 * MCS standalone quals. This Sub gives the L3 electrician the commissioning and
 * handover framework that applies across the environmental tech family.
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
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Commissioning and handover (5.2) | Level 3 Module 2.5.2 | Elec-Mate';
const DESCRIPTION =
  'Commissioning and customer handover for environmental technology systems — BS 7671 inspection and test, system functional test, performance verification, customer training, handover documentation pack. The work that converts a physical install into a working, accountable system.';

const checks = [
  {
    id: 'l3-m2-s5-sub2-eic-vs-mcs',
    question:
      'After completing the electrical work on a heat-pump install, you complete the BS 7671 Electrical Installation Certificate. Does that finish your involvement with the install pack?',
    options: [
      "No — the EIC covers the BS 7671 inspection and test of your electrical work, but the heat-pump install pack is broader. The MCS-certified installer compiles the full pack: EIC (your contribution), F-Gas commissioning records, wet-system pressure-test, refrigerant charge log, SCOP estimate, MCS install certificate, BUS grant claim, EPC update arrangement, customer operating instructions. The EIC is one document in the pack — essential, but not sufficient. Your contribution to the broader handover is the verified electrical install.",
      "Under TN-C-S the neutral and the protective earth share a combined PEN conductor between the transformer and the cut-out. A break in the PEN somewhere upstream (the DNO side, not the consumer side) lifts the neutral — and therefore the customer's bonded metalwork — to a fraction of phase voltage relative to true earth. While you're investigating an unrelated fault, the system can be carrying a hidden TT-equivalent hazard if the PEN is compromised. Always read the voltage L–N AND L–E AND N–E at the cut-out before you start; if N–E is more than a few volts, stop and call the DNO.",
      "Each brand has known failure modes that point you to likely fault locations. Hager 6 kA RCBOs (popular UK domestic) — known for thermal element drift after 15+ years, busbar terminations need annual re-torque. Wylex NHX — known for plastic enclosure stress fractures around the busbar after thermal cycling. Schneider Acti9 — generally robust, known for incoming terminal block failures on the larger 100 A units. MK Sentry — known for poor manufacturer warranty support but generally reliable hardware. Crabtree Starbreaker — older series, RCBO trip-time slows significantly past 12 years. The brand tells you where to look first.",
      "Whenever the chosen EV charger doesn't include integrated open-PEN protection. Section 722 of BS 7671 (significantly amended in A4:2026) requires that the PEN-fault risk on PME supplies is managed — either by the charger's built-in open-PEN protection function, or by providing a TT earth electrode for the EV chassis at the charge point. Most modern chargers from major manufacturers include the open-PEN protection function, simplifying the install. Where they don't, the local TT electrode is the fallback. The certified installer reads the charger spec and chooses the architecture.",
    ],
    correctIndex: 0,
    explanation:
      "The EIC is the BS 7671 documentation for the electrical install — your professional certification. The MCS install pack wraps the EIC into a broader customer handover document. As the L3 electrician your responsibility is the EIC; you contribute the EIC into the certified installer's wider pack. Knowing where your responsibility ends and the certified installer's begins is part of the trade-boundary discipline.",
  },
  {
    id: 'l3-m2-s5-sub2-customer-training',
    question:
      'After heat-pump commissioning the customer asks "so do I just leave the thermostat at 21°C and forget about it?". What\'s the right answer?',
    options: [
      "The control pilot is a low-voltage PWM signal between the charge point and the vehicle that negotiates charging current, communicates protection status, signals connection / disconnection events and triggers safe shutdown on fault. The signal is part of the IEC 61851 Mode 3 protocol. The car uses the duty cycle of the PWM signal to determine the maximum current the charge point can supply; the charge point uses the signal level to know whether the cable is connected, whether the car is ready to charge, and whether a fault has occurred. The signalling is built into the unit and the cable; the apprentice does not configure it but should recognise its role.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712 plus MCS MIS 3002 plus the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property before they start touching things.",
      "Heat pumps work best with steady operation rather than aggressive setback / boost cycles. The right answer is closer to 'leave the system to run continuously at low flow temperature, with modest setbacks if any (e.g. 1-2°C overnight). Avoid 5°C overnight setbacks — that's a gas-boiler control strategy and costs you SCOP'. The MCS install pack should include customer operating instructions covering this. Walk the customer through it at handover; otherwise they fall back on gas-boiler habits and don't get the SCOP they're paying for.",
      "Institution of Engineering and Technology — UK-based professional body for engineering and technology, with around 156,000 members worldwide. For electrical practitioners IET offers: technical resources (BS 7671 publication, Wiring Matters magazine, IET Standards), professional registration via Engineering Council (EngTech, IEng, CEng), member events and CPD via IET Academy, and the credibility signal of MIET / FIET membership.",
    ],
    correctIndex: 2,
    explanation:
      "Heat-pump operation is genuinely different from gas-boiler operation. Customers who try to run a heat pump like a gas boiler (aggressive setbacks, on-off scheduling) post poor SCOP and disappointing comfort. The five-minute customer-training conversation at handover is one of the highest-leverage interactions in the entire install. It costs nothing and prevents months of customer dissatisfaction.",
  },
  {
    id: 'l3-m2-s5-sub2-handover-pack',
    question:
      'A customer phones six months after their PV install asking what they need for a house sale. What documents do they need from the original handover pack?',
    options: [
      "EIC for the new electrical circuit, MCS install certificate, Building Regs Part P compliance certificate (from the firm's competent-person scheme), updated EPC reflecting the PV, smart meter / SEG enrolment confirmation, manufacturer warranties, ENA G98 (or G99) DNO connection confirmation, system operating manual. Plus a copy of the install drawings if available. The buyer's solicitor will ask for all of this. Without it the buyer's solicitor flags the install as 'unverified' and the sale can stall. Customers should keep the handover pack as carefully as they keep their EPC and gas safety certificate.",
      "FAIL — well above the BS 7671 Table 41.3 maximum of 1.37 Ω for B32 at 0.4 s disconnection. The protective device cannot guarantee disconnection within the required time. Action: (1) Verify the reading. (2) Check supply Ze first — is the high Zs caused by high origin Ze (possible PEN issue) or by added impedance on the circuit (HRJ, undersized cable)? (3) Make safe — isolate the affected circuit. (4) Investigate and rectify. (5) Document as Code 1 if safety is at imminent risk; Code 2 if safety is compromised but not immediately dangerous.",
      "Engineering compromise = solution that's less than ideal but acceptable given constraints (cost, time, building fabric, customer budget). Examples: (1) Add a dedicated circuit for high-load appliance instead of full kitchen rewire. (2) Replace one tripping RCBO instead of upgrading to all-RCBO CU. (3) Patch a damaged cable section instead of replacing the full run. Each compromise is acceptable IF: (a) it brings the installation to BS 7671 compliance, (b) the limitations are documented and communicated to the customer, (c) the customer has accepted the compromise in writing, (d) the firm's professional indemnity covers the chosen approach. Compromise is engineering, not corner-cutting.",
      "A4:2026 introduced AFDD (Arc Fault Detection Device) acknowledgement on the model forms — where AFDD is fitted, the form records the type, location and test result; where AFDD is not fitted (most existing installations), the form records an explicit 'AFDD not present' note rather than a blank field. A4 also tightened the supply earthing arrangement field (TN-S, TN-C-S / PNB, TT) and added explicit Protective Equipotential Bonding (PEB) verification fields. The MWC field for 'departures from BS 7671' is unchanged but now references A4:2026 by edition. Always check the latest model form from the IET — the field set has moved.",
    ],
    correctIndex: 0,
    explanation:
      "The handover pack is the long-term proof of the install. Conveyancing solicitors ask for it; mortgage lenders ask for it; insurers ask for it. A complete pack at handover is what makes the customer feel confident and what protects the trade from disputes years later. The pack should be physical (folder) and digital (PDF) — the digital version is what survives a house move.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What\'s the BS 7671 inspection and test sequence for a new dedicated radial circuit (e.g. heat pump or EV charger)?',
    options: [
      "Confirm: (1) clamp is on consumer side of the meter and on hard metal pipework before any branch; (2) within 600 mm of the meter outlet union where practicable; (3) pipe cleaned to bare metal under the clamp jaw; (4) jointing paste applied; (5) clamp screw torqued to manufacturer spec; (6) \\\"Safety Electrical Connection — Do Not Remove\\\" warning label fitted on the clamp body or conductor; (7) bonding conductor secure and labelled at the MET end.",
      "The standard initial verification: continuity of protective conductors (R1+R2 method or equivalent), continuity of ring circuits (N/A for a radial), insulation resistance (between live conductors and to earth), polarity, earth electrode resistance (where applicable), Zs at the most distant point of the circuit, RCD test (operating time, in some cases automatic disconnection time). Plus the visual inspection — labelling, accessibility of isolators, conductor identification, mechanical protection, terminal tightness. All recorded on the EIC. Mandatory before energising the circuit.",
      "Three layers operating together: (1) operative pre-use visual inspection every shift — cable, plug, casing, guard, switch, anti-restart; (2) periodic in-service inspection by a competent person at a documented interval (monthly for harsh site use is typical); (3) formal Portable Appliance Test (PAT) on the documented cycle — every 3 months for 110 V site tools is HSE-recommended typical. Missing any one layer weakens the Reg 5 defence at any post-incident investigation.",
      "The supervision is appropriate when the supervisor is themselves competent for the task, has direct visibility of the work AND the trainee, can intervene before a danger materialises, and the degree of supervision is matched to BOTH the task danger AND the trainee's experience level. A second-year on socket extensions is light supervision; a first-year on a CU change is direct, hands-on supervision throughout. Token oversight from elsewhere on site doesn't meet the regulation.",
    ],
    correctAnswer: 1,
    explanation:
      "Initial verification is the BS 7671 Part 6 process. It applies to all new electrical work regardless of the load type. The EIC records the inspection and test results. The visual inspection is part of it — labelling, isolation accessibility and conductor identification matter as much as the electrical readings.",
  },
  {
    id: 2,
    question:
      'What does heat-pump functional commissioning involve beyond the BS 7671 electrical test?',
    options: [
      "BS 7671 (A4:2026 Reg 421.1.7) recommends AFDDs in specified locations including dwellings — but the wording is \\\\\\\"recommending\\\\\\\", not mandating. They are not strictly required by BS 7671 for a typical owner-occupied house. They ARE mandatory in Higher Risk Residential Buildings (HRRBs — typically blocks of flats over 18 m or 7 storeys) under the Building Safety Act 2022. For your house, they are a strongly recommended best-practice fire protection. Cost is roughly 60-100 GBP per AFDD-RCBO; protecting all socket and lighting circuits typically adds 600-1200 GBP to a CU change. Many domestic specifiers now include AFDDs as standard.",
      "Type A RCDs detect AC residual currents and pulsating DC residual currents. They cannot detect smooth (continuous) DC residual currents — these can blind the device. Type B RCDs detect AC, pulsating DC and smooth DC residual currents. EV charge points produce smooth DC fault currents that a Type A alone cannot reliably trip. Two acceptable solutions per Section 722: (1) the unit includes its own RDC-DD (6 mA DC detection per IEC 62752 / 61851-1) and the upstream RCD can be Type A; (2) the unit does not include an RDC-DD and the upstream device must be Type B. Modern UK domestic units almost universally include the RDC-DD, so Type A upstream is the dominant choice. Always confirm against the unit's data sheet.",
      "F-Gas commissioning — refrigerant charge weight verified per manufacturer's instructions, leak test, pressure / temperature checks across the cycle. Wet system commissioning — pressure test, fill and bleed, flow rate verification per emitter, balancing. Heat pump system commissioning — flow temperature setpoint configured, defrost cycle verified, weather compensation curve set, smart controls integration tested, hot water cylinder priority confirmed, anti-legionella cycle verified. Performance check — measure flow temperature and ambient at first run; verify against design SCOP estimate. All recorded in the MCS commissioning records as part of the install pack.",
      "The DNO (Distribution Network Operator) is the company that owns and maintains the local low-voltage and medium-voltage distribution network — the poles, cables and substations between the National Grid and the customer meter. There are six DNO regions in Great Britain (UK Power Networks, Northern Powergrid, SP Energy Networks, Electricity North West, National Grid Electricity Distribution, SSEN). The DNO is NOT the supplier — the supplier sends the customer bill but does not own wires. You find the DNO from the postcode (the ENA Distribution map) or from the MPAN supply number at the customer meter (digit 1 of the bottom-line MPAN identifies the supply area). G98 / G99 notifications go to the relevant DNO, not to OFGEM, not to the supplier.",
    ],
    correctAnswer: 2,
    explanation:
      "Heat-pump commissioning is a multi-trade activity. Each trade commissions their own scope — F-Gas for refrigerant, plumber for wet system, electrician for electrical, certified installer for the integrated system performance. The commissioning records combine into the customer handover pack. Skipping commissioning checks is the headline cause of post-install issues.",
  },
  {
    id: 3,
    question:
      'What does PV commissioning involve beyond the BS 7671 electrical test?',
    options: [
      "Multiple bodies. (1) Emergency services — ambulance / fire / police as appropriate at the time. (2) Police — investigate scene, especially in fatalities (corporate manslaughter / individual gross-negligence manslaughter potential). (3) HSE — H&S investigation (HASAWA, EAWR, CDM, MHSWR, RIDDOR). (4) Building Control — where there's a building-regs / structural angle. (5) DNO — if mains supply was involved (ESQCR). (6) Insurers — both the firm's and the client's. The HSE and police typically work in parallel, especially after fatal incidents.",
      "(1) Lifts — passengers can be trapped between floors when a lift loses supply mid-travel; modern lifts have an auto-rescue battery that returns to the nearest floor before opening, but you cannot assume; the lift contractor is informed and the lift is taken out of service before isolation. (2) Automatic doors and disabled-access — wheelchair users cannot exit a building whose powered doors fail; the building manager needs to staff the doors during the isolation. (3) Fire escape lighting + fire alarm + sprinkler pumps — public escape routes lose their indicated path and any fire detection during the isolation; this is a Fire Safety Order issue and the responsible person plans the cover. Other categories: ATMs, CCTV (insurance / security), public Wi-Fi (less critical), traffic signals on adjacent works (rare but possible).",
      "BUS provides £7,500 for ASHP / GSHP and £5,000 for biomass — but the biomass strand is restricted to properties that are not connected to the gas grid AND in defined rural categories AND meet Ecodesign emission limits. The intent: heat pumps are the policy default, biomass is a fallback for properties where heat pumps are not viable (very high heat load, no electrical capacity for the heat pump, off-gas-grid rural) and where the air-quality impact is minimal (rural distance from neighbours, Defra-approved Ecodesign appliance). For a typical suburban property the BUS biomass strand is closed. For a rural off-gas-grid farmhouse with a 30 kW heat load, BUS biomass is sometimes the only viable grant route. The L3 electrician sees biomass overwhelmingly in rural settings.",
      "DC-side checks — string voltage at open circuit (matched against design Voc), string short-circuit current (matched against design Isc), polarity at the inverter input. AC-side checks — inverter switch-on, anti-islanding test (simulated grid disconnect), generation meter accuracy, export verification with smart meter. System functional check — inverter MPPT operation under load, error log review. Performance check — irradiance at commissioning, instantaneous output compared against expected output for current irradiance. All recorded in the MCS commissioning records and the inverter datalog. Plus the safety signage at all isolation points and the meter position.",
    ],
    correctAnswer: 3,
    explanation:
      "PV commissioning is the test that the design has converted to a working system. The DC-side checks verify the strings as installed match the design intent; the AC-side checks verify the grid interface; the performance check verifies the system delivers what was estimated. The MCS-certified installer signs off the commissioning records.",
  },
  {
    id: 4,
    question:
      'What\'s the customer-training conversation that needs to happen at heat-pump handover?',
    options: [
      "Run the customer through: how the system operates (continuous low-temperature heating, not on-off cycles like a gas boiler); how to set the room thermostat (set and forget at desired temperature, modest setbacks only); how to use the hot water schedule (typically once or twice a day); when to expect higher running costs (cold spells push up consumption); what the smart controls do; what the warning lights / app notifications mean; who to call for support (warranty contact, manufacturer support, installer aftercare); annual service requirement. Five-to-ten minutes that prevents months of customer confusion.",
      "Part P (Electrical Safety in Dwellings) requires certain types of electrical work in dwellings to be notified to Building Control — either via a registered competent-person scheme (NICEIC, NAPIT, etc.) or directly to the Local Authority. Notifiable work currently includes new circuits, consumer unit changes, and work in special locations (bathrooms / locations 700). Most environmental tech installs are notifiable — adding a PV inverter circuit, an EV charging circuit or a heat-pump dedicated radial all create new circuits and trigger Part P notification. Non-notifiable work (e.g. like-for-like socket replacement on an existing circuit) doesn't trigger Part P.",
      "PQ analyser (Fluke 1748, Megger PQM, Dranetz HDPQ) is a long-term monitoring instrument — connect it at the supply or DB for a few days / weeks, it logs voltage, current, harmonic spectrum, transient events, sags / swells / interruptions, frequency, power factor, flicker. The multimeter shows you NOW; the PQ analyser shows you the past 7 days. Essential for diagnosing intermittent faults on commercial installations where the symptom only appears occasionally — the PQ log captures the moment of the fault and the conditions around it.",
      "Carbon payback for typical UK PV is 1-3 years (the time taken for operating CO₂ savings to offset the manufacturing CO₂ cost). Financial payback depends on system cost, self-consumption, export tariff and electricity price — typically 6-12 years for a standalone PV install in 2026, often shorter if a battery is added (improves self-consumption from 25-40% to 70-90%). After payback the system continues for the rest of its 25-year warranted life essentially as free energy. The carbon case is much stronger than the financial case in isolation; together they make PV the dominant UK domestic environmental tech.",
    ],
    correctAnswer: 0,
    explanation:
      "Customer training is the highest-leverage interaction in the entire install. Done well, the customer becomes a happy long-term advocate. Skipped, the customer reverts to gas-boiler habits, posts poor SCOP, and complains. The MCS install pack should include written customer operating instructions; the spoken handover walks the customer through them.",
  },
  {
    id: 5,
    question:
      'What signage is required at the consumer unit / meter position after a PV install?',
    options: [
      "All construction work in Great Britain, with proportionate duties based on project type and size. Notifiable projects (more than 30 working days with 20+ workers simultaneously, or exceeding 500 person-days) trigger additional duties including HSE notification (F10) and the appointment of Principal Designer and Principal Contractor for multi-contractor projects.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The DNO emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). Required by BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. The signage protects future maintainers who may not realise there's a generator on the property.",
      "(1) T+E shears or rotary cable stripper to crop the conductor square and to the right length. (2) Auto-stripper or preset 4 mm² stripper to remove insulation cleanly without nicking strands. (3) (Optional but preferred) — slip a grey 4 mm² bootlace ferrule on, ratchet-crimp it. (4) Insert into terminal. (5) Tighten with preset torque driver to manufacturer's value (typically 2–3 Nm for Schneider isolators).",
      "Bond each extraneous service (gas, water) separately back to the MET per Reg 544.1.2 (within 600 mm of intake). Bond the structural steel frame at multiple accessible points back to the MET. Bond the LPS earth network to the MET via direct bond or spark gap per BS EN 62305. Each system has its own dedicated bonding cable to the MET — no daisy-chaining. The MET is the single common reference for the entire integrated earth and bonding network.",
    ],
    correctAnswer: 1,
    explanation:
      "Signage is a safety-critical commissioning task. A maintainer arriving for an unrelated fault call can put themselves at risk if they isolate the main switch and assume the property is dead — the PV continues exporting at the inverter terminals until the DC and AC isolators are both operated. The signage tells them. This matters at commissioning because installing the kit without signage leaves the future maintainer exposed.",
  },
  {
    id: 6,
    question:
      'What\'s the role of the electrical generation meter in a PV install\'s commissioning?',
    options: [
      "Because EFLI is a LIVE test — the MFT injects a small fault current through the loop and measures the impedance from the response. If the supply is off, no fault current flows; the meter shows OPEN or undefined reading. If the protective device is OFF, the loop is broken upstream of your test point; same result. Both conditions are pre-requisites for a meaningful EFLI test. The MFT (Megger MFT1741+) typically warns 'NO VOLTAGE' or 'CIRCUIT OPEN' if either condition isn't met — but the apprentice should know to check before the warning.",
      "Fracture (other than to fingers, thumbs and toes); amputation; permanent loss of sight or reduction of sight; crush injuries leading to internal organ damage; serious burns covering more than 10% of the body or causing significant damage to eyes, respiratory system or other vital organs; scalpings requiring hospital treatment; loss of consciousness from head injury or asphyxia; any other injury arising from work in an enclosed space leading to hypothermia, heat-induced illness or requiring resuscitation or admittance to hospital for more than 24 hours.",
      "An MID-compliant generation meter measures the total electrical output of the PV array. Required by Smart Export Guarantee (the supplier needs accurate metering to pay the export tariff) and increasingly by BUS / SEG-equivalent schemes for performance monitoring. At commissioning the meter is verified to read correctly (display zero before energising, increment as the inverter delivers, accumulate accurately over the first day's run). The customer can read the meter themselves to verify ongoing performance. The smart meter at the property handles the import / export reading for the supplier.",
      "Older fixed-speed heat pumps run the compressor at full output or off — short-cycling repeatedly to match a partial load. Each start consumes electricity and stresses the compressor. Modern inverter-driven units vary the compressor speed continuously to match the actual heat demand — running at 30 to 100 percent capacity smoothly. The result is better SCOP (less wasted starting energy), longer compressor life, quieter operation and more comfortable indoor temperatures. Almost every new domestic ASHP sold in the UK is inverter-driven. The L3 electrician sizes the supply to the rated nameplate current (the compressor at full speed); the variable-speed control is internal to the unit.",
    ],
    correctAnswer: 2,
    explanation:
      "The generation meter is the system's accountability instrument. Customers (and SEG suppliers) need to trust the reading. Commissioning verifies it. MCS sign-off requires the meter to be present and verified. Older installs without a separate generation meter may struggle with SEG enrolment.",
  },
  {
    id: 7,
    question:
      'What\'s the typical content of the MCS install certificate that the customer receives at handover?',
    options: [
      "Three. (1) Test readings — pre-rectification (the failed reading) and post-rectification (the corrected reading), with timestamps and instrument IDs. (2) Functional test outcomes — what was tested, what worked, any anomalies. (3) Customer hand-back record — what was demonstrated, what documentation provided, customer's signed acceptance. The records become the diagnostic narrative on the job sheet — defensible audit trail of what was found, what was done, what was verified.",
      "Apprentice is a formal JIB grade for someone in a registered apprenticeship — typically a learner working towards the C&G 2365 (or NVQ Level 3) and the AM2. 'Improver' is not a formal JIB grade — it's a colloquial industry term sometimes used for the post-college, pre-AM2 stage where the learner has completed the technical qualifications but not yet sat the AM2. Once AM2 is passed and JIB processes the upgrade, the worker becomes an Electrician on the JIB scale.",
      "Stage 1: try to discuss and resolve — most disputes resolve through conversation. Stage 2: if unresolved, follow your written complaints procedure. Stage 3: if still unresolved, signpost ADR (RECC for MCS work, NICEIC/NAPIT for scheme work, generic ADR providers like Centre for Effective Dispute Resolution). Stage 4: as last resort, small claims court (under £10k, online process). Document everything in writing throughout.",
      "Customer name and address; installer name and MCS certification number; install date; technology and rating (e.g. 5 kWp PV with 10 kWh battery); manufacturer and model details for the major components; performance estimate (annual generation kWh, SCOP, etc.); MCS Installation Standard reference (e.g. MIS 3002 v6.0); Workmanship Warranty period and what it covers; aftercare contact details. The certificate is the customer's proof of MCS-certified installation, used for BUS grant, SEG enrolment, manufacturer warranty registration and future house sale.",
    ],
    correctAnswer: 3,
    explanation:
      "The MCS certificate is the headline document the customer keeps. It's the gateway to incentives, warranties and future house sale credibility. The MCS-certified installer issues it; the customer should keep it permanently with the rest of the install pack.",
  },
  {
    id: 8,
    question:
      'What happens to the customer\'s EPC after an environmental tech install, and why does it matter?',
    options: [
      "The EPC should be re-issued to reflect the new performance — heat pump, PV, MVHR, insulation upgrades all change the SAP rating. The MCS-certified installer normally arranges the EPC update. An updated EPC matters for: (a) future house sale (the buyer's solicitor sees current performance); (b) mortgage applications (lenders increasingly weight EPC ratings); (c) insurance (some insurers now adjust premium for low-EPC properties); (d) BUS grant requires a valid EPC at the time of install. EPCs are valid for 10 years from issue.",
      "Because the standard's enforcement and interpretation hinges on the precise definitions. 'Exposed-conductive-part' (a conductive part of equipment that can be touched and which is liable to become live in fault conditions) and 'extraneous-conductive-part' (a conductive part liable to introduce a potential, generally Earth, not forming part of the electrical installation) are different categories with different bonding rules. Mis-classify one as the other and you mis-bond, you fail the EICR, you potentially leave the customer unprotected. Definitions ARE the technical content.",
      "To co-operate with the client, principal designer, principal contractor, contractor and any other person performing a duty under CDM, AND to report to the principal contractor (or contractor where there is no principal contractor) anything that they consider is likely to endanger their own or another person's health or safety, AND to comply with the requirements of CDM.",
      "The CO2-equivalent refrigerant charge — kg of refrigerant multiplied by the refrigerant's global warming potential, divided by 1000. Mandatory intervals: 5+ tonnes CO2e annual; 50+ tonnes CO2e six-monthly; 500+ tonnes CO2e three-monthly. Most domestic ASHPs sit below 5 tonnes CO2e and are not subject to the mandatory regulatory intervals — but manufacturer warranty terms typically require annual servicing anyway.",
    ],
    correctAnswer: 0,
    explanation:
      "EPC update is part of the broader install handover, not just the technical commissioning. Customers often forget about it; the certified installer should arrange or remind. An out-of-date EPC understates the property's actual performance and costs the customer money on sale / mortgage / insurance.",
  },
];

const faqs = [
  {
    question: "If I'm not the MCS-certified installer, what's my commissioning sign-off responsibility?",
    answer:
      "Your responsibility is the BS 7671 inspection and test of the electrical work you carried out — recorded on the Electrical Installation Certificate (EIC). The EIC is your professional certification of the electrical install. The MCS-certified installer is responsible for the broader system commissioning (functional, performance, safety) and the MCS install certificate. Your EIC contributes to the broader pack but doesn't replace the MCS sign-off.",
  },
  {
    question: "What's the practical difference between commissioning and handover?",
    answer:
      "Commissioning is the technical activity of bringing the system from installed-but-not-running to fully-operational-and-verified. It includes electrical inspection and test, functional test, performance verification, settings configuration. Handover is the customer-facing activity that follows commissioning — walking the customer through the operating procedure, warning of common gotchas, answering questions, completing the handover documentation pack, registering warranties. Commissioning is technical; handover is communication. Both are essential.",
  },
  {
    question: "Why is the customer-training conversation more important than people realise?",
    answer:
      "Because customers can break the system through bad operation. A heat pump operated like a gas boiler (aggressive setbacks, on-off scheduling) posts poor SCOP and the customer thinks the system is faulty. A PV system without smart export setup leaves the customer not claiming SEG and undermining the financial case. An MVHR with the boost permanently disabled doesn't ventilate the property. Five-to-ten minutes of training at handover prevents months of dissatisfaction. The MCS Code requires installers to provide customer-facing operating instructions; the spoken handover reinforces the written ones.",
  },
  {
    question: "What if the customer isn't around at commissioning?",
    answer:
      "Schedule a separate handover visit. Commissioning can be completed without the customer (the technical activity doesn't need them) but handover is intrinsically a face-to-face activity. A telephone or video walkthrough is acceptable as a backstop but in-person is better. Leaving documentation alone without explanation is the worst case — the customer files it without reading it and the operating-knowledge transfer doesn't happen.",
  },
  {
    question: "How long does heat-pump commissioning typically take?",
    answer:
      "Half a day to a full day for the F-Gas and wet-system scopes; an hour or two for the electrical commissioning; an hour or two for functional test and customer handover. Total elapsed time including the wet system fill, pressurisation and balancing is usually a full day. Smart controls integration and weather-compensation tuning may extend into a second visit. The MCS-certified installer schedules the trades to overlap where possible.",
  },
  {
    question: "What's the customer's expected involvement in commissioning?",
    answer:
      "Generally none in the technical commissioning, then full attention for the handover. Provide secure access for the trades during commissioning; be present for the handover walkthrough. Some customers prefer to observe the commissioning to understand how the system works — that's fine but isn't required. The handover is where the customer's understanding gets transferred.",
  },
];

export default function Sub2() {
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
            eyebrow="Module 2 · Section 5 · Subsection 2"
            title="Commissioning and customer handover"
            description="The work that converts a physical install into a working, accountable system — BS 7671 inspection and test, functional test, performance verification, customer training, handover documentation pack."
            tone="emerald"
          />

          <TLDR
            points={[
              "Commissioning is the technical activity of bringing the system from installed to operational. Handover is the customer-facing communication that follows. Both essential.",
              "BS 7671 inspection and test (continuity, IR, polarity, Zs, RCD test) is your contribution as the L3 electrician — recorded on the EIC. The MCS install pack wraps the EIC into the broader commissioning and handover documentation.",
              "Customer training at handover is the highest-leverage interaction in the entire install. Heat-pump customers particularly benefit from understanding that heat pumps run differently from gas boilers.",
              "The handover pack — EIC, MCS certificate, Part P compliance, updated EPC, warranties, commissioning records, operating instructions — is what the customer keeps. Future house sale, mortgage and insurance depend on it.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the BS 7671 initial verification sequence for a new dedicated radial circuit (continuity, IR, polarity, Zs, RCD test) and identify it as the basis for the EIC.",
              "Distinguish electrical commissioning from system functional commissioning and from customer handover.",
              "Describe the components of heat-pump functional commissioning beyond the BS 7671 electrical test — F-Gas refrigerant, wet system, weather compensation, controls integration.",
              "Describe the components of PV commissioning beyond the BS 7671 electrical test — DC-side verification, AC-side verification, performance check, signage.",
              "Identify the customer-training conversation as a high-leverage interaction at handover, particularly for heat pumps where operating habits differ from gas-boiler operation.",
              "List the components of the customer handover documentation pack and identify their role in future house sale, mortgage applications, insurance and warranty claims.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>BS 7671 inspection and test — your contribution</ContentEyebrow>

          <ConceptBlock
            title="Initial verification — what the EIC actually certifies"
            plainEnglish="When you complete the electrical work on a new circuit (heat-pump radial, PV inverter circuit, EV charger, battery storage circuit, MVHR supply), BS 7671 Part 6 requires initial verification before the circuit is energised. The verification has a visual inspection part and a test part. Results are recorded on the Electrical Installation Certificate (EIC). The EIC is your professional certification that the electrical work meets BS 7671."
            onSite="The standard initial verification sequence is well-rehearsed by the time you reach Level 3 — continuity of protective conductors, insulation resistance, polarity, earth-electrode resistance where applicable, Zs at the most distant point of the circuit, RCD operating-time test. Plus the visual — labelling, isolation accessibility, conductor identification, mechanical protection, terminal tightness. All recorded with measured values, not just 'pass / fail'."
          >
            <p>
              What the EIC certifies for an environmental tech circuit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection</strong> — labelling at consumer unit, at local
                isolation, at the equipment. Conductor identification correct (brown / blue
                / green-and-yellow). Cable mechanical protection adequate. Terminal
                tightness verified. Equipment securely mounted. Manufacturer&apos;s
                instructions followed.
              </li>
              <li>
                <strong>Continuity of protective conductors</strong> — R1+R2 method (or
                equivalent) confirms the CPC is continuous from earth bar to the most
                distant terminal.
              </li>
              <li>
                <strong>Insulation resistance</strong> — measured at 500 V DC for LV
                circuits, between live conductors and between live conductors and earth.
                Minimum 1 MΩ per BS 7671 Table 64.
              </li>
              <li>
                <strong>Polarity</strong> — line, neutral and earth correctly connected at
                every accessory and termination.
              </li>
              <li>
                <strong>Zs at the most distant point</strong> — measured loop impedance
                used to confirm automatic disconnection times (Section 411.3) are met.
              </li>
              <li>
                <strong>RCD test</strong> — operating time at I△n and 5×I△n, confirming
                BS EN 61008 / BS EN 61009 thresholds are met. Type B RCDs require
                additional smooth-DC tests.
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

          <ConsumerUnit />

          <SectionRule />

          <ContentEyebrow>System functional commissioning</ContentEyebrow>

          <ConceptBlock
            title="Beyond the EIC — the system has to actually work"
            plainEnglish="The EIC certifies the electrical work in BS 7671 terms. Beyond that, the system has to be commissioned as an integrated whole — the heat pump has to deliver heat at the design flow temperature, the PV array has to produce expected output for the irradiance, the EV charger has to handshake with the vehicle, the MVHR has to deliver design air-flow rates. System functional commissioning is the verification that the design intent has been realised."
            onSite="Different trades commission their own scope. F-Gas commissions refrigerant. Plumber commissions wet system. Electrician commissions electrical. The certified installer (often the lead trade) commissions the integrated system. Records combine into the customer handover pack."
          >
            <p>
              Heat-pump system commissioning:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas refrigerant</strong> — charge weight verified, leak test,
                pressure / temperature checks across the cycle.
              </li>
              <li>
                <strong>Wet system</strong> — pressure test, fill and bleed, flow rate
                verification per emitter, balancing, anti-corrosion inhibitor dose.
              </li>
              <li>
                <strong>Heat pump system</strong> — flow temperature setpoint configured
                per design, defrost cycle verified, weather compensation curve set, smart
                controls integration tested, hot water cylinder priority confirmed, anti-
                legionella cycle verified.
              </li>
              <li>
                <strong>Performance check</strong> — flow temperature and ambient at first
                run, instantaneous COP estimated, compared against design SCOP estimate.
              </li>
            </ul>
            <p>
              PV system commissioning:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC-side</strong> — string Voc and Isc measured, matched against
                design. Polarity at inverter input confirmed.
              </li>
              <li>
                <strong>AC-side</strong> — inverter switch-on, anti-islanding test
                (simulated grid disconnect verifies disconnection within G98/G99 time
                limits), generation meter accuracy, export verification with smart meter.
              </li>
              <li>
                <strong>Functional check</strong> — inverter MPPT operating, error log
                clean, datalog producing readings.
              </li>
              <li>
                <strong>Performance check</strong> — irradiance at commissioning measured
                or estimated, instantaneous output compared against expected output.
              </li>
              <li>
                <strong>Signage</strong> — durable warning signs at consumer unit, meter
                position, inverter, DC isolators.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Customer training at handover</ContentEyebrow>

          <ConceptBlock
            title="Five minutes that prevents months of confusion"
            plainEnglish="Customer training is the highest-leverage interaction in the entire install. Heat pumps in particular operate differently from gas boilers — and customers who fall back on gas-boiler habits post poor SCOP and complain. The handover walkthrough transfers the operating knowledge."
            onSite="Run the customer through how the system operates, how to set / not set the controls, what to expect in different conditions, what the warning indicators mean, who to call. Five-to-ten minutes face-to-face after the technical commissioning. Combine with the written operating instructions in the handover pack."
          >
            <p>
              The heat-pump handover talking points:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>How it works</strong> — &quot;the heat pump runs continuously at low
                temperature, not on-off cycles like a gas boiler. The flow temperature has
                been set to deliver the SCOP we estimated.&quot;
              </li>
              <li>
                <strong>Thermostat strategy</strong> — &quot;set the room thermostat to your
                desired temperature and leave it. Avoid 5°C overnight setbacks — that&apos;s
                a gas-boiler control strategy and costs you SCOP. A modest 1-2°C overnight
                setback is fine if you want it.&quot;
              </li>
              <li>
                <strong>Hot water schedule</strong> — &quot;the cylinder is heated once or
                twice a day, typically morning and evening. The smart controls handle this
                automatically.&quot;
              </li>
              <li>
                <strong>Cold spells</strong> — &quot;in cold spells the heat pump consumes
                more electricity because the temperature lift is bigger. This is normal.
                The SCOP estimate already accounts for it.&quot;
              </li>
              <li>
                <strong>Defrost</strong> — &quot;the unit briefly stops heating during
                defrost (a few minutes every hour or two in cold weather). The buffer tank
                rides through this without temperature drop.&quot;
              </li>
              <li>
                <strong>Annual service</strong> — &quot;the unit needs an annual service to
                keep the warranty valid and the SCOP at design level. We&apos;ll be in touch
                in 12 months.&quot;
              </li>
              <li>
                <strong>Aftercare contacts</strong> — installer aftercare, manufacturer
                support, warranty contact, emergency contact (e.g. for a refrigerant leak).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The first-winter follow-up — closing the SCOP loop"
            plainEnglish="A heat pump's design SCOP is an estimate based on the heat-loss calc and the assumed flow temperature. The actual SCOP only reveals itself across a winter of running. The professional installer schedules a follow-up visit eight to twelve weeks after handover (during the heating season) to read the inverter or system datalog, compare actual electricity use against the kWh-of-heat metric, and flag any operational drift before it becomes a complaint."
            onSite="Schedule the follow-up at handover so it is on the customer's calendar. Capture the meter reading and the system runtime on the day, plus any customer-reported behavioural changes (room thermostat setpoint, hot water schedule). If actual SCOP is below 0.5 of the design figure, investigate — common causes are oversized buffer tank short-cycling, weather-compensation curve set wrong, customer running aggressive setbacks. Adjust the configuration once and the customer's bills track the design figure for the rest of the system life."
          >
            <p>
              The follow-up visit checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat meter reading</strong> — kWh of heat delivered since
                commissioning (most modern systems include an MID-class heat meter as
                part of the BUS grant requirement).
              </li>
              <li>
                <strong>Electricity meter reading</strong> — kWh of electricity consumed
                by the heat pump and ancillaries since commissioning.
              </li>
              <li>
                <strong>SCOP-to-date</strong> — heat / electricity. Compare to design SCOP.
              </li>
              <li>
                <strong>Datalog review</strong> — flow / return temperatures, ambient,
                defrost frequency, any error codes since commissioning.
              </li>
              <li>
                <strong>Customer feedback</strong> — what the customer has noticed (good or
                bad). Often surfaces a control-strategy issue you can correct in five
                minutes.
              </li>
              <li>
                <strong>Adjustment record</strong> — any changes made (weather-comp curve,
                schedule, setpoint) recorded with date and reason. Goes back into the
                handover pack so the next visit has the history.
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

          <ContentEyebrow>The handover documentation pack</ContentEyebrow>

          <ConceptBlock
            title="What the customer actually keeps"
            plainEnglish="The handover documentation pack is what the customer keeps for the rest of the system's life. Conveyancing solicitors, mortgage lenders, insurers and warranty providers all reference it. A complete pack at handover protects the customer from future hassle and protects the trade from future disputes."
            onSite="Compile the pack physically (folder) and digitally (PDF). Walk the customer through it at handover so they know what each document is and where it sits. Set up an aftercare reminder — annual service for heat pumps, periodic inspection for PV / EV / battery."
          >
            <p>
              Standard handover pack contents:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical Installation Certificate (EIC)</strong> — your BS 7671
                inspection and test record for the new electrical work.
              </li>
              <li>
                <strong>MCS Install Certificate</strong> — issued by the MCS-certified
                installer, confirming compliance with the relevant MIS standard.
              </li>
              <li>
                <strong>Building Regs Part P compliance certificate</strong> — issued by
                the firm&apos;s competent-person scheme (NICEIC, NAPIT etc.), typically
                posted within 30 days of install.
              </li>
              <li>
                <strong>Updated EPC</strong> — reflecting the new SAP rating after the
                install.
              </li>
              <li>
                <strong>BUS / SEG enrolment confirmation</strong> — proof the customer is
                receiving the relevant funding stream.
              </li>
              <li>
                <strong>Manufacturer warranties</strong> — heat pump unit, indoor cylinder,
                inverter, panels, battery, MVHR unit. Plus the MCS Workmanship Warranty.
              </li>
              <li>
                <strong>Commissioning records</strong> — F-Gas, wet system, electrical,
                functional. Combined into a single pack.
              </li>
              <li>
                <strong>System operating instructions</strong> — written customer-facing
                manual, plain-English. Reinforces the spoken handover.
              </li>
              <li>
                <strong>System diagrams</strong> — schematic of the install, isolator
                locations, key components labelled.
              </li>
              <li>
                <strong>Aftercare and service contacts</strong> — installer, manufacturer,
                emergency.
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

          <RegsCallout
            source="MCS Code of Practice — paraphrased on customer handover requirements"
            clause={
              <>
                The MCS Code of Practice requires certified installers to provide customers
                with a complete handover pack including: the MCS install certificate;
                relevant manufacturer documentation; commissioning records; operating
                instructions; performance estimate; warranty information; and aftercare
                contact details. The Code also requires the installer to walk the customer
                through the operating procedure at handover.
              </>
            }
            meaning={
              <>
                The Code makes the handover pack and walkthrough mandatory parts of MCS-
                certified installation. Skipping or skimping on either is a Code breach
                that can affect the installer&apos;s certification. As an apprentice on an
                MCS install your contribution to the pack (the EIC) is your professional
                responsibility; the broader pack is the certified installer&apos;s.
              </>
            }
            cite="Source: MCS Code of Practice (paraphrased from the published Code available via the MCS website)."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the customer-training walkthrough at handover"
            whatHappens={
              <>
                Apprentice (or installer) finishes commissioning, hands the customer the
                manual, and leaves. Customer files the manual without reading it. Customer
                operates the heat pump like a gas boiler — aggressive overnight setbacks,
                on-off scheduling, sometimes &quot;turning the radiators off in unused
                rooms&quot; (which messes up the system&apos;s flow rate balancing).
                SCOP posts at 2.5 instead of the design 3.5. Customer&apos;s bills are
                higher than promised. Negative review, unhappy customer, lost referrals.
              </>
            }
            doInstead={
              <>
                Make the spoken handover non-negotiable. Schedule it as a separate
                walkthrough if the customer wasn&apos;t around for commissioning. Walk
                them through how the system operates, what to expect, what to avoid, and
                where to get help. Five-to-ten minutes that prevents months of
                dissatisfaction. The MCS Code requires it; the customer relationship
                depends on it.
              </>
            }
          />

          <CommonMistake
            title="Issuing the EIC without verifying the labelling and signage"
            whatHappens={
              <>
                Apprentice completes the electrical commissioning — continuity, IR,
                polarity, Zs, RCD test all pass. EIC issued. But the labelling at the
                consumer unit / inverter / DC isolator hasn&apos;t been done, the warning
                signs at the meter position aren&apos;t fitted, and the system diagram
                isn&apos;t in the install pack. A maintainer six months later
                doesn&apos;t realise there&apos;s a parallel generator on the property,
                isolates the main switch, and gets a shock from the still-live PV inverter
                terminals.
              </>
            }
            doInstead={
              <>
                The visual inspection is part of the BS 7671 initial verification — and
                that includes labelling and signage. Don&apos;t issue the EIC until the
                labels are on, the warning signs are durable and visible at every isolation
                point, and the system identification is recorded. The signage is safety-
                critical for future maintainers; treat it with the same seriousness as the
                continuity reading.
              </>
            }
          />

          <Scenario
            title="Heat-pump handover — customer is the homeowner&apos;s mother who hasn&apos;t been involved in the project"
            situation={
              <>
                You&apos;re commissioning a heat-pump install. The homeowner who
                commissioned the work is overseas; their elderly mother lives in the
                property and is the day-to-day user. She&apos;s sceptical about the new
                system, prefers her old gas boiler, and wants to know &quot;how she keeps
                warm&quot;. The MCS-certified installer asks you to do the customer
                handover walkthrough.
            </>
            }
            whatToDo={
              <>
                Slow down. The technical handover scripts assume a customer who&apos;s
                bought into the system; this customer hasn&apos;t. Start with empathy:
                &quot;the new system works differently from your old gas boiler — let me
                show you how to keep it simple.&quot; Walk her through: thermostat at her
                desired temperature, leave the system on, hot water comes on at the
                cylinder schedule, smart controls handle the rest. Show her where the
                emergency stop is and which button summons help. Explain that the unit
                outdoors is normal and will sound like a quiet refrigerator. Leave the
                operating manual but also write a single-side &quot;quick reference&quot;
                in plain English. Confirm the aftercare contact and reassure her that
                she can call. Don&apos;t leave until you&apos;re satisfied she knows how
                to use it. This is the highest-leverage handover you&apos;ll do all month.
              </>
            }
            whyItMatters={
              <>
                Customer-facing handovers vary wildly by customer. The technical install
                is the same; the communication is bespoke. An apprehensive elderly user
                needs simplification and reassurance; a tech-curious owner needs the
                detail. Reading the customer in the room and adapting the handover is
                the soft skill that separates a good install from a great one. The MCS-
                certified installer values an apprentice who can do this well — and the
                customer remembers the trade fondly.
              </>
            }
          />

          <ConceptBlock
            title="DNO acceptance — G98 confirmation and the export MPAN"
            plainEnglish="On a parallel-generation install (PV, battery export, micro-CHP) the DNO has to be told the property is now exporting. For type-tested inverters under 16 A per phase the route is G98 'connect and notify within 28 days'. For larger systems the route is G99 'apply, get a Connection Offer, then install'. Until the DNO has the notification on file, the export side is not lawfully connected — and the supplier cannot pay Smart Export Guarantee tariff because the export MPAN is not registered."
            onSite="The MCS-certified installer files the G98 short-form within 28 days of energising. The customer pack should include a copy of the submission and the DNO reply. On the EIC you record the inverter make, model, type-test certificate reference and AC isolator location — the same evidence the G98 form needs. For G99 jobs, the Connection Offer conditions (protection settings, fault-level limits, network reinforcement contributions) are part of the design pack and must be evidenced on commissioning."
          >
            <p>
              What the customer pack carries on the DNO side:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>G98 notification copy</strong> — installer name, MCS reference,
                inverter make / model / serial, type-test certificate (BS EN 50549-1 / -2),
                AC isolator type and location, energisation date.
              </li>
              <li>
                <strong>DNO acknowledgement reply</strong> — the email or portal record
                proving the DNO received the notification. Without this the customer cannot
                evidence lawful connection on a future house sale.
              </li>
              <li>
                <strong>Export MPAN</strong> — the supplier registers an export MPAN once
                the G98 is filed. The customer needs the MPAN to apply for Smart Export
                Guarantee tariff with a chosen supplier. Six-month delays here are common
                if the paperwork chain breaks.
              </li>
              <li>
                <strong>G99 Connection Offer</strong> (where applicable) — full Offer
                document, signed acceptance, evidenced commissioning settings, witness test
                record where the DNO required one.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BUS grant claim — paperwork the heat-pump customer needs"
            plainEnglish="On a Boiler Upgrade Scheme heat-pump install the customer is owed a £7,500 grant (England and Wales 2026 rates). The grant is claimed by the MCS-certified installer on the customer's behalf — the customer signs an authorisation, the installer submits the claim through the Ofgem portal, the grant is paid as a discount against the install price. The handover pack carries the evidence trail."
            onSite="The grant claim hangs on three documents being right: the MCS Installation Certificate (proving MCS-eligible kit and installer), the heat-loss calculation in MCS MIS 3005-D format (proving the property design basis), and a valid EPC for the property (energy performance baseline). Missing or stale EPC is the most common reason claims stall. The L3 apprentice contributes the EIC and the install evidence; the certified installer compiles the claim."
          >
            <p>
              BUS claim moving parts at handover:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer authorisation</strong> — signed at handover; lets the
                installer submit the Ofgem claim on the customer's behalf.
              </li>
              <li>
                <strong>MCS Installation Certificate reference</strong> — uploaded by the
                installer to the MCS database; the Ofgem portal cross-checks the reference.
              </li>
              <li>
                <strong>EPC currency</strong> — the property must hold a valid EPC
                (typically less than 10 years old, no outstanding loft / cavity
                recommendations unless exempted). A lapsed EPC blocks the claim.
              </li>
              <li>
                <strong>Property eligibility</strong> — owner-occupied or private rental in
                England / Wales; not new-build (different scheme); not previously claimed.
              </li>
              <li>
                <strong>Discount appearing on the customer invoice</strong> — the
                installer takes the £7,500 hit upfront; Ofgem reimburses the installer once
                the claim is approved. Customers should check the invoice line.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer-facing commissioning records — what evidence to leave behind"
            plainEnglish="A clean commissioning pack pays for itself the first time the customer phones with a query. The pack should include test sheet results, photographs of every isolator, every label, and the consumer unit, the inverter app login the customer is going to need, the warranty documents from the manufacturer, and a one-page operating summary that explains what each unit does and how to isolate it in an emergency. The competent installer treats this as a deliverable, not paperwork."
            onSite="Capture the photographs as you go — final-fix photos of every isolator and every label, plus a wide shot of the consumer unit and the inverter. Email or share the pack to the customer the same day. The customer who has the pack on their phone never feels &quot;what did the installer actually do?&quot; — and you have a defensible record if any question comes up later."
          >
            <p>What the commissioning pack should contain:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 EIC plus schedule of test results and schedule of inspections.</li>
              <li>Manufacturer commissioning records (inverter, battery BMS, EV charger).</li>
              <li>MCS Installation Certificate (where MCS-certified install).</li>
              <li>DNO paperwork — G98 acceptance reply or G99 connection agreement.</li>
              <li>Photographs — isolators, labels, consumer unit, inverter, battery, charger.</li>
              <li>One-page operating summary with isolation procedure and emergency contacts.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 133.1.3 (equipment usage on certification)"
            clause={
              <>
                Regulation 133.1.3 (Selection of equipment) has been modified and now requires
                that certain usage of equipment shall be recorded on the appropriate electrical
                certification specified in Part 6 of BS 7671. Designers, installers, and
                inspectors shall ensure that where BS 7671 calls for the usage of particular
                equipment to be identified, that usage is explicitly entered on the
                certification associated with the work covered by Part 6.
              </>
            }
            meaning={
              <>
                Commissioning paperwork is the home of these entries. Where BS 7671 calls for a
                specific piece of equipment to be identified by role on the certificate (for
                example an EV charger&apos;s open-PEN protection device), put it explicitly on
                the EIC. Future inspectors rely on those entries to verify the protective
                measures.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 133.1.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (RCD test redraft)"
            clause={
              <>
                Regulation 643.3 has been redrafted. Where equipment is connected and the
                equipment is likely to influence the insulation resistance verification test or
                be damaged by other test voltages, a 250 V DC insulation resistance test
                following connection of the equipment shall be used. Regardless of RCD Type
                (AC, A, F, B etc.), an alternating current test at rated residual operating
                current (IΔn) shall be used to verify the effectiveness of the RCD.
              </>
            }
            meaning={
              <>
                Two practical commissioning changes — drop the IR voltage to 250 V DC where
                connected electronics could be damaged, and run a single AC test at 1×IΔn for
                every RCD type. The old multi-current sequence is gone. Test pro-formas and
                toolbox-talks need updating to match.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 643.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Commissioning is technical (bringing the system from installed to operational); handover is customer-facing (transferring operating knowledge). Both essential.",
              "BS 7671 initial verification (continuity, IR, polarity, Zs, RCD test) is the basis for the EIC — your professional certification of the electrical work.",
              "System functional commissioning extends beyond the EIC — F-Gas refrigerant, wet system, weather compensation, smart controls integration, performance check.",
              "PV commissioning includes DC-side verification, AC-side anti-islanding test, generation meter check, signage at every isolation point.",
              "Customer training at handover is the highest-leverage interaction in the entire install. Heat pumps particularly need the operating-strategy walkthrough.",
              "The handover pack — EIC, MCS certificate, Part P compliance, updated EPC, warranties, commissioning records, operating instructions — is what the customer keeps long-term.",
              "Conveyancing solicitors, mortgage lenders, insurers and warranty providers all reference the handover pack. Complete pack at handover protects everyone.",
              "Adapt the handover communication to the customer in the room — apprehensive users need simplification, tech-curious users need detail.",
            ]}
          />

          <Quiz title="Commissioning and handover — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 Pre-installation considerations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Maintenance requirements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
