/**
 * Module 2 · Section 3 · Subsection 3 — MVHR, wind, micro-CHP, biomass overview
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2
 *   AC 1.2 — "specify the main types, characteristics, and purposes of environmental
 *             technology systems"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.2 (applications and limitations of
 * environmental technology systems) and Unit 312 ELTP02 / AC 3.1 (provide information
 * on operational requirements and benefits).
 *
 * Note: Unit 301 is a 6-AC overview unit. The five technologies covered here (MVHR,
 * micro-wind, micro-hydro, micro-CHP, biomass) sit at recognition-level — you should
 * be able to describe them, identify their regulatory home, and explain their
 * limitations. Detailed install competence belongs in technology-specific quals.
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
  'MVHR, wind, micro-CHP, biomass overview (3.3) | Level 3 Module 2.3.3 | Elec-Mate';
const DESCRIPTION =
  'Recognition-level overview of MVHR, micro-wind, micro-hydro, micro-CHP and biomass for the L3 electrician — operating principle, electrical interface, regulatory home and current UK market relevance. Why some of these are still common (MVHR) and some are increasingly rare (micro-CHP, domestic wind).';

const checks = [
  {
    id: 'l3-m2-s3-sub3-mvhr-airtight',
    question:
      'A customer in a 1960s detached house with single-glazed windows and uninsulated cavity walls asks about MVHR. What\'s the responsible answer?',
    options: [
      "The MFT (Megger MFT1741+, Kewtech KT64+) injects different test currents based on the RCD type. Type AC test: pure sinusoidal AC at I∆n. Type A test: pure sinusoidal AC AT I∆n PLUS pulsating DC at 1.4× I∆n (because Type A must detect both). Type F test: all of the above PLUS composite multi-frequency. Type B test: all of the above PLUS smooth DC at twice I∆n. Selecting the wrong type on the MFT may show 'pass' on a Type B device (because you're only testing the AC capability, not the DC) — false confidence. Modern MFTs auto-detect or have explicit type selection.",
      "Directly — every tool in the cable-prep kit (auto strippers, ratchet crimpers, preset torque drivers, calibrated test instruments) exists to deliver consistent, repeatable, manufacturer-spec terminations. 'Good workmanship' is delivered through the tools as much as through the operative's skill. An apprentice using the right tool the right way produces 134.1.1-compliant work; using the wrong tool (knife strip, plier crimp, eyeballed torque) produces work that fails 134.1.1 even if it tests OK on the day.",
      "Not yet. MVHR only delivers net energy benefit in airtight, well-insulated buildings where controlled ventilation is the dominant air-change pathway. In a leaky 1960s house with single glazing, the building loses heat through uncontrolled air leakage faster than the MVHR can recover it from the extract air. The fan power consumed (typically 50-150 W continuous) outweighs the heat recovered. Fabric upgrades — insulation, glazing, draught-proofing, air permeability test below ~3 m³/h/m² @ 50 Pa — must come first. Then MVHR earns its keep.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The DNO emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). Required by BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. The signage protects future maintainers who may not realise there's a generator on the property.",
    ],
    correctIndex: 2,
    explanation:
      "MVHR is a recovery technology — it can only recover what's flowing through it. In a leaky building, the bulk of the air change happens through cracks in the envelope, not through the MVHR ducts, so most ventilation heat loss escapes the recovery exchanger entirely. SAP and SBEM credit MVHR with significant savings only at low air permeability. Fabric first, MVHR second — same logic as fabric first, heat pump second.",
  },
  {
    id: 'l3-m2-s3-sub3-micro-chp-decline',
    question:
      'Why has micro-CHP largely disappeared from new UK domestic installs?',
    options: [
      "Six questions in order. (1) WHAT exactly happens? (in customer's own words). (2) WHEN does it happen — time of day, day of week, season, weather, after specific activity? (3) WHERE in the property — single room, multiple rooms, only when specific accessories used? (4) HOW LONG has it been happening — first noticed when, getting worse / better / same? (5) WHAT have you tried — reset breakers, unplug appliances, anything else? (6) WHAT CHANGED recently — new appliance, building work, leak, anything? The answers narrow the fault hypothesis from infinity to a small set. Most apprentices skip the interview; the senior who built habits saves an hour per call-out by spending 5 minutes on it.",
      "The economic and carbon case has eroded. Micro-CHP burns gas to generate electricity locally and uses the waste heat for the wet system. It made sense when grid electricity was carbon-intensive (~500 gCO₂/kWh) and gas was cheap. As the grid has decarbonised (~200 gCO₂/kWh now), the relative carbon advantage of generating electricity locally from gas has shrunk. Heat pumps (driven by increasingly clean grid electricity) deliver lower running carbon per kWh of heat. Plus the Future Homes Standard effectively rules out fossil-fuel heat in new-build from 2025, taking the new-install market away from micro-CHP altogether.",
      "The mechanical operation of the device — the test button injects a small simulated residual current through an internal resistor that bypasses the load side, exercising the trip mechanism. It does NOT verify trip time or trip current accuracy. The instrument test (single AC at 1 x I delta n) is the verification of trip current and time. Both are part of the test set: instrument test for performance verification, manufacturer test button as a periodic functional check that the customer can perform between professional inspections.",
      "Coordinate with the customer's IT contact BEFORE isolation. Standard procedure: (1) Identify the IT lead (in-house IT, MSP, on-call provider). (2) Brief them on the planned outage window. (3) IT performs graceful shutdown of servers / NAS / RAID arrays via OS or UPS interface — typically 5–15 minutes. (4) Confirm shutdown complete via UPS status / server console. (5) Then isolate. (6) After work: restore supply, IT verifies system boot, confirms application availability. Skipping the IT coordination = hard power-off = potential data corruption, RAID degradation, application downtime hours longer than the electrical work itself. UPS-protected systems may auto-shutdown gracefully but verify.",
    ],
    correctIndex: 1,
    explanation:
      "Micro-CHP was a sensible technology for its time but the time has passed in the UK domestic market. You may still meet existing units (typically Stirling-engine or fuel-cell types from 2010-2015 era installs) and you may see engine-based CHP at 5-50 kWe scale in commercial / institutional sites where heat demand is constant and high. As an apprentice you should recognise CHP as a category but not over-pitch its current relevance for new domestic work.",
  },
  {
    id: 'l3-m2-s3-sub3-domestic-wind',
    question:
      'A customer wants to fit a 5 kW vertical-axis wind turbine on a pole in their suburban back garden. What\'s the honest assessment?',
    options: [
      "No, for several reasons. The refrigerant work requires F-Gas certification (criminal offence to do without). The Building Regulations Part L compliance pathway requires installation by an MCS-certified installer for the customer to claim Smart Export Guarantee or similar incentives. The Boiler Upgrade Scheme grant requires MCS sign-off. Manufacturer warranties typically require certified installation. The MCS install pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule, commissioning records — all required for the system to perform as designed. DIY heat-pump install is unsafe and uneconomic.",
      "Directly — every tool in the cable-prep kit (auto strippers, ratchet crimpers, preset torque drivers, calibrated test instruments) exists to deliver consistent, repeatable, manufacturer-spec terminations. 'Good workmanship' is delivered through the tools as much as through the operative's skill. An apprentice using the right tool the right way produces 134.1.1-compliant work; using the wrong tool (knife strip, plier crimp, eyeballed torque) produces work that fails 134.1.1 even if it tests OK on the day.",
      "The firm probably won't recover the cost of the additional work in court because there's no documented variation, no agreed price and no signed scope change. The half-day of labour, the additional materials, and the late completion of the job all sit on the firm's profit margin. If the customer's dispute escalates to the certification scheme (NICEIC, NAPIT, ELECSA) or to the local Trading Standards office, there's also reputational and scheme-membership risk. The variation should have been written, signed, and agreed before the work commenced.",
      "It will almost certainly disappoint. Domestic-scale wind turbines need clean laminar wind, which only happens at hub heights well clear of surrounding obstacles — typically 30+ m up in open rural settings. A suburban back garden sits in turbulent air shed by surrounding houses; the turbine spends most of its time below cut-in wind speed or cycling wildly. Real-world yield from sub-10 kW turbines in suburban settings has historically been a fraction of the manufacturer's wind-tunnel claim. Plus planning permission, noise / vibration objections from neighbours, and ongoing maintenance. The honest answer is that wind only works where the wind is — and a suburban back garden almost certainly isn't where the wind is.",
    ],
    correctIndex: 3,
    explanation:
      "Several high-profile small-wind installations from the 2008-2012 era posted yields well below the manufacturer's claim. The market for sub-10 kW domestic turbines has contracted accordingly. Where wind genuinely makes sense — open rural sites with tall masts and clean wind — the answer is professional siting plus a properly engineered installation, not an off-the-shelf back-garden unit. As an apprentice your role is to recognise the unrealistic site request and refer the customer to a wind specialist for an honest site assessment.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What\'s the operating principle of MVHR (mechanical ventilation with heat recovery)?',
    options: [
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit / meter, at the main isolation, at the inverter and at the DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property.",
      "Stale warm extract air from kitchens, bathrooms and utility rooms is drawn through one side of a counter-flow heat exchanger. Cold fresh supply air for bedrooms and living rooms is drawn through the other side. 80-90% of the heat in the extract air transfers to the supply air through the exchanger plates, with no mixing of the two streams. Net effect: controlled ventilation with most of the ventilation heat loss recovered. The fan power consumed is small (typically 50-150 W continuous) compared to the heat recovered in airtight buildings.",
      "Refuse the unsafe instruction and raise the concern with the supervisor or higher. HASAWA s.7 puts the personal duty on the apprentice — a direct order from a senior is not a defence to a s.7 prosecution. The Employment Rights Act 1996 s.44 also gives the apprentice statutory protection from victimisation for raising H&S concerns. Document the refusal and the reason in writing (text, email, app note) at the time.",
      "Politely tell the Site Manager you've been tasked by your own supervisor on a different priority, and offer to ask your supervisor to come over so the two managers can re-prioritise. You take instructions on the work face from your own contractor's chain (Site Supervisor → Project Engineer → Contracts Manager). The main contractor's Site Manager co-ordinates between contractors but does not give direct instructions to a sub-contractor's apprentice.",
    ],
    correctAnswer: 1,
    explanation:
      "MVHR is the recovery principle in its clearest form. The heat exchanger is a passive component (no moving parts in the heat-transfer path); the fans drive the supply and extract. Counter-flow exchangers achieve the highest efficiency by maintaining a temperature differential along the entire exchanger length. Modern MVHR units include summer bypass dampers and frost protection (the supply pre-heater or recirculation mode prevents the exchanger freezing in cold weather).",
  },
  {
    id: 2,
    question:
      'What\'s the typical electrical interface for a domestic MVHR unit?',
    options: [
      "The employer's firm needs Competent Person Scheme registration (NICEIC / NAPIT / ELECSA) to self-certify the firm's notifiable domestic work. The apprentice carries: (a) a JIB Industrial Determination card showing their grade and apprenticeship year (issued through the apprenticeship); (b) ECS card for site access on most major commercial sites; (c) evidence of their college enrolment and progression. The apprentice does NOT need personal CPS membership — that's a contractor-level registration.",
      "A self-sustaining exothermic chain reaction inside a Li-ion cell. Damage, overcharge, internal manufacturing defect or external heat triggers an internal short circuit, which generates heat, which decomposes the organic electrolyte, which generates more heat and flammable / toxic gas, which can ignite. Once the chain reaction has started in one cell the heat can propagate to neighbouring cells in the pack. The fire is intense, fast, and self-fuelling because the cell carries its own oxidiser within the cathode material.",
      "Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, in 1.5 mm² T&E to the unit location (utility room, loft, plant cupboard). Local DP isolator. Boost wiring from kitchens and bathrooms — sometimes via humidity sensors or PIR, sometimes via pull-cord switches in bathrooms or push-buttons in kitchens. Some units include a low-voltage commissioning interface (e.g. for installer-set air-flow rates). The unit's nameplate is typically 50-300 W on full load — modest demand. The bulk of the electrical work is the boost wiring network, not the unit supply.",
      "Every employee must (a) take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions at work, and (b) co-operate with the employer or any other person in the discharge of any duty placed on the employer or that other person under the relevant statutory provisions. 'Following orders' is not a defence — the personal duty stays with the employee regardless of what they were told to do.",
    ],
    correctAnswer: 2,
    explanation:
      "MVHR unit supply is straightforward. The complexity is in the room-by-room boost network and any commissioning sensors. The ducting and air-flow commissioning is the ventilation specialist's domain (Part F of the Building Regs); you wire the unit and the boost network. Cat5e/Cat6 increasingly common where the MVHR unit integrates with smart home / Home Energy Management systems.",
  },
  {
    id: 3,
    question:
      'Where does micro-CHP still make commercial sense?',
    options: [
      "A 'pay when paid' clause says the main contractor only pays the sub-contractor when the main contractor has been paid by the client. These clauses are largely UNENFORCEABLE in UK construction contracts under the Housing Grants, Construction and Regeneration Act 1996 ('the Construction Act'), except in cases of upstream insolvency. So most 'pay when paid' clauses you see in sub-contracts can be challenged.",
      "Battery hazards are different from AC hazards: (1) DC shock — once your hand is on a DC busbar, your muscles can't release because there's no zero-crossing — DC at 60 V upward is treated as a let-go hazard; (2) hydrogen gas — lead-acid cells gas during charge, hydrogen accumulates in poorly-ventilated rooms, explosive at 4% LEL — battery rooms have forced ventilation for this reason; (3) electrolyte — sulphuric acid contact with skin / eyes — face shield, acid-resistant gloves, eye-wash station; (4) thermal runaway — a damaged or shorted cell can catch fire, with toxic fumes; (5) short-circuit current — a 100 Ah lead-acid string can deliver 5–10 kA short-circuit, enough to weld a spanner.",
      "Industrial LOTO is a multi-person, multi-lock system. Each operative working on a piece of plant fits their OWN lock to a hasp on the isolation device, so the supply cannot be re-energised until every individual lock has been removed by the operative who fitted it. Tags identify each operative and the work they're doing. It interfaces with plant operations because the same isolation can affect mechanical, hydraulic, pneumatic and electrical sources of stored energy. Domestic safe isolation is a single-operative procedure on a single circuit.",
      "Larger commercial / institutional sites where heat demand is constant and high — hospitals, hotels, leisure centres, large care homes, schools with swimming pools. Engine-based CHP at 5-50 kWe scale generates electricity locally (offsetting expensive day-rate import) and the waste heat displaces a boiler load. Sized correctly, the heat-led design ensures the heat is always useful (the unit is sized to follow the property's baseload heat demand). Domestic micro-CHP is essentially over in new installs but commercial CHP remains a niche but live technology.",
    ],
    correctAnswer: 3,
    explanation:
      "Commercial CHP is a different conversation from domestic micro-CHP. The economics work because the site has a constant high-load heat demand (so the CHP runs at high capacity factor) and the electricity is consumed on-site (so the financial value of the generated electricity is the import-displacement rate, not the export rate). On a typical domestic install with intermittent low heat demand, those conditions don't hold and the CHP under-runs.",
  },
  {
    id: 4,
    question:
      'What\'s the regulatory framework for biomass heating in UK domestic properties?',
    options: [
      "Multiple frameworks: Building Regs Part J (combustion appliances, flues, ventilation); Clean Air Act (smoke control areas — many urban areas restrict what can be burned and require Defra-exempt appliances); Ecodesign Directive (new appliance emissions standards); MCS MIS 3004 / 3006 (installer competence and installation quality for solid biomass boilers and stoves). Plus the F-Gas-equivalent for any chiller / heat-pump component. Biomass is operationally heavier than gas or heat pumps because of fuel storage, ash handling and the regulatory layer on emissions.",
      "Customer name and address; installer name and MCS certification number; install date; technology and rating (e.g. 5 kWp PV with 10 kWh battery); manufacturer and model details for the major components; performance estimate (annual generation kWh, SCOP, etc.); MCS Installation Standard reference (e.g. MIS 3002 v6.0); Workmanship Warranty period and what it covers; aftercare contact details. The certificate is the customer's proof of MCS-certified installation, used for BUS grant, SEG enrolment, manufacturer warranty registration and future house sale.",
      "Because a ladder is a personal access platform that doesn't have a guardrail and depends on the user's three-point contact and footing for stability. It provides minimal collective protection. INDG401 and INDG402 (HSE guidance) limit ladder use to short-duration tasks (typically up to 30 minutes at one location), light work (one-handed work where reasonably practicable, with a free hand for grip) and where a higher control isn't reasonably practicable.",
      "Directly. A correctly-sized stripper removes only the insulation, leaving the copper undamaged — full cross-section preserved, full current-carrying capacity, full mechanical strength. A knife strip nicks the copper, reducing the cross-section and creating a stress-riser fracture point. A few months of thermal cycling and the conductor breaks at the nick — high resistance, hot terminal, eventual failure on EICR or worse, on fire alarm. The stripping tool is part of the 526.1 chain.",
    ],
    correctAnswer: 0,
    explanation:
      "Biomass had a boost from the Renewable Heat Incentive (RHI) which closed in 2022. New domestic biomass installs are now relatively rare — heat pumps have taken over the off-gas-grid retrofit market and air-quality regulation in urban areas has further squeezed it. Existing installs you may meet on commissioning or maintenance work; new installs are increasingly niche.",
  },
  {
    id: 5,
    question:
      'What\'s the difference between a domestic biomass boiler and a biomass stove?',
    options: [
      "First-year MCS registration cost typically £600-1,000 application fee plus the Quality Management System certification (often via NICEIC or NAPIT MCS umbrella) at £400-700. Annual ongoing MCS fees similar. Plus the underlying PV training (AM2S or equivalent, £400-600) and potentially MCS-recognised installer course (£500-1,000). Total first-year investment for a sole trader entering PV is roughly £2,000-3,500.",
      "A boiler drives a wet heating system — pumps hot water around radiators / underfloor circuits and a hot-water cylinder. Typical output 10-50 kW, located in a utility room or outhouse, automatic fuel feed (auger from a hopper), automatic ignition, automatic ash handling. A stove is a room heater — radiates heat directly into the room it sits in, plus optional back-boiler for some hot water. Lower output (5-15 kW typical), manual loading (logs or pellets), no automatic ash removal. Different installation regulations, different MCS standards, different customer expectations.",
      "Most HASAWA offences are triable either way — the prosecution chooses Magistrates' (summary) or Crown (indictment). Magistrates' Court can impose unlimited fines on H&S offences (since 2015) and up to 6 months imprisonment. Crown Court can impose unlimited fines and up to 2 years imprisonment for individuals (longer for some related offences like Corporate Manslaughter — life). The Sentencing Council Definitive Guideline applies in both courts.",
      "Pre-Construction Information is the H&S information that the Client (with help from the Principal Designer) provides to designers and contractors before they start on the project. It covers the site (location, existing structures, services, ground conditions), the project (description, programme, key dates, design assumptions), the relevant H&S information (asbestos surveys, condition reports, environmental risks) and the Client's H&S file from any previous works.",
    ],
    correctAnswer: 1,
    explanation:
      "The boiler-vs-stove split matters because the install scope is so different. A biomass boiler is a major plant-room install with civils, fuel storage, flue, controls integration. A stove is a single-room install — chimney, hearth, surround, single-room thermostat. The MCS standards (MIS 3004 boilers, MIS 3006 stoves) reflect that.",
  },
  {
    id: 6,
    question:
      'What signage is required at the point of supply for a parallel-connected micro-wind installation?',
    options: [
      "Generators (PV, wind, micro-CHP) put energy into the system that wasn't there before from the user's point of view. Demand-reduction tech (LED lighting, smart controls, MVHR, insulation) makes the existing energy do more useful work. From a carbon perspective the cheapest watt is the one you don't use — demand reduction usually has a shorter payback than generation. From a Building Regs perspective both count toward Part L compliance via the SAP / SBEM calculation.",
      "Six standard items. (1) Bonding plaster (Knauf bonding or Thistle Bonding, 5 kg bag) — for filling small chases. (2) Filler (Polycell, Tetrion) — for very small holes and screw holes. (3) Plasterboard offcuts — for patching plasterboard holes. (4) Scrim tape — for plasterboard joins. (5) Fire-stop sealant (FireFly, Hilti CP series) — for cable penetrations through fire-rated walls. (6) Touch-up paint (white emulsion small tin, customer-supplied paint where possible) — for minor wall finishing where the customer is unlikely to repaint. Cost £40–60 for the kit; lasts months.",
      "Same as PV — durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. Wind connections fall under the same ENA G98 (≤16 A per phase) or G99 (&gt;16 A per phase) framework as PV. The DNO needs to know the installation exists; the maintainer who turns up to a fault call needs to know there's a parallel generator.",
      "To identify hazards, set out the controls, allocate responsibility, and provide a defensible record of the safe system of work. RAMS and risk assessments are statutory under MHSWR 1999 Reg 3. COSHH data sheets are statutory under COSHH 2002. Permits-to-work cover higher-risk activities. The fire muster and welfare info satisfy the Workplace (Health, Safety and Welfare) Regulations 1992. Together they convert legal duty into specific instructions.",
    ],
    correctAnswer: 2,
    explanation:
      "All parallel-connected generators in the UK now fall under G98 / G99 — PV, wind, micro-hydro, micro-CHP, battery storage. The signage and notification requirements are technology-agnostic. As an apprentice you should recognise that a wind install is fundamentally the same regulatory framework as a PV install on the electrical interface side, even though the physical install is very different.",
  },
  {
    id: 7,
    question:
      'A customer in a rural Scottish glen has a year-round stream with 30 m of head and 100 l/s flow. What\'s the realistic micro-hydro framing?',
    options: [
      "Multiple frameworks: Building Regs Part J (combustion appliances, flues, ventilation); Clean Air Act (smoke control areas — many urban areas restrict what can be burned and require Defra-exempt appliances); Ecodesign Directive (new appliance emissions standards); MCS MIS 3004 / 3006 (installer competence and installation quality for solid biomass boilers and stoves). Plus the F-Gas-equivalent for any chiller / heat-pump component. Biomass is operationally heavier than gas or heat pumps because of fuel storage, ash handling and the regulatory layer on emissions.",
      "A boiler drives a wet heating system — pumps hot water around radiators / underfloor circuits and a hot-water cylinder. Typical output 10-50 kW, located in a utility room or outhouse, automatic fuel feed (auger from a hopper), automatic ignition, automatic ash handling. A stove is a room heater — radiates heat directly into the room it sits in, plus optional back-boiler for some hot water. Lower output (5-15 kW typical), manual loading (logs or pellets), no automatic ash removal. Different installation regulations, different MCS standards, different customer expectations.",
      "Plain English is writing or speaking that the intended audience can understand on first reading or hearing. Common standards include short sentences (15-20 words on average), common words rather than technical jargon, active voice rather than passive, one idea per sentence, and a reading age around 9-11 (that's not patronising — most UK adults read most comfortably at that level for safety-critical information). The Plain English Campaign provides guidance and the Crystal Mark accreditation. For safety briefings, RAMS summaries, customer-facing letters and apprentice-training material, plain English isn't 'dumbing down' — it's 'comprehensible' under MHSWR 1999 Reg 10.",
      "This is a strong micro-hydro site. With 30 m head and 100 l/s flow, theoretical hydraulic power is approximately ρ × g × h × Q = 1000 × 9.81 × 30 × 0.1 ≈ 29 kW. After turbine and generator efficiency (typically 70-85%) the realistic output is 20-25 kW continuous — significant baseload renewable energy. Practical issues: SEPA (Scottish equivalent of Environment Agency) abstraction licensing, fish-friendly intake design, civils for weir / intake / penstock / power-house, grid connection (G99 for an installation of this size), and the cost of a buried cable from the power-house to the property. The right site is rare; where it exists, micro-hydro outperforms PV and wind by a wide margin on capacity factor.",
    ],
    correctAnswer: 3,
    explanation:
      "Micro-hydro is genuinely site-specific. The product of head × flow gives the available hydraulic power. Where head and flow exist, hydro delivers consistent output with low intermittency (much higher capacity factor than wind or PV). The capital cost (turbine, civils, grid connection) is the headline barrier; the operational cost is low and the equipment life is long. MCS MIS 3008 covers small-hydro installation standards.",
  },
  {
    id: 8,
    question:
      'Why is MVHR almost a default on Future Homes Standard new-build?',
    options: [
      "Because Future Homes Standard requires very low fabric U-values, very low air permeability, and Part F controlled ventilation. At those airtightness levels the building cannot rely on infiltration for air change — it needs deliberate mechanical ventilation. MVHR provides that mechanical ventilation while recovering 80-90% of the heat. SAP credits MVHR with significant carbon savings in airtight new-build, contributing materially to the Part L target rate. Fitting MEV (mechanical extract ventilation only, no recovery) instead loses the recovery benefit and harms the SAP score.",
      "Some MFTs have multiple Zs measurement ranges (e.g. low range 0-2 Omega, high range 0-200 Omega). If you\\\\\\\\'re testing a TT installation with expected Zs of 80-200 Omega and the meter is set to the low range, the reading will saturate or read inaccurately. GN3 wants you to consciously check the range matches the expected reading before pressing TEST — a failed test or wildly wrong reading wastes time and may damage the instrument if test current exceeds the range capacity.",
      "Day-rate: customer pays an agreed daily (or hourly) rate for time spent plus materials at agreed markup. Risk on time-overrun sits with the customer. Fixed-price: you quote a single all-in price for the defined scope. Risk on time-overrun sits with you. Customers typically prefer fixed-price (predictable budget); contractors typically prefer day-rate (no overrun risk). Practical compromise: fixed-price for well-defined scopes, day-rate for variable or fault-finding work.",
      "WAHR 2005 Reg 12 requires a tower used for working at height to be inspected before use after assembly, after any event likely to have affected it (high winds, impact, alteration), and at intervals not exceeding 7 days. The pre-use check covers stability (level base, outriggers deployed, brakes on), structural integrity (no missing components, all connectors locked), platform fully boarded with guardrails and toeboards, and a current inspection record (Form 91 / scaff tag). The user does the daily check; a more thorough inspection is by a competent person.",
    ],
    correctAnswer: 0,
    explanation:
      "Future Homes Standard, expected to take fossil-fuel boilers off new-build from 2025, is the regulatory driver pushing all-electric ventilation and heating in new homes. MVHR fits the airtight building context and delivers the SAP credit. As the electrician on a Future Homes Standard new-build install you'll see MVHR as standard kit alongside heat pump and PV.",
  },
];

const faqs = [
  {
    question: "What's a Passive House and how does it relate to MVHR?",
    answer:
      "Passive House (Passivhaus) is a building standard that targets very low space-heating demand (typically &lt;15 kWh/m²/year) through extreme insulation, air-tightness (≤0.6 air changes per hour @ 50 Pa) and triple glazing. At Passivhaus airtightness levels the building must have MVHR — there's no other way to provide adequate ventilation. Passivhaus pre-dates Future Homes Standard but the underlying logic is the same. Most new UK Passivhaus projects fit MVHR + heat pump + PV as standard.",
  },
  {
    question: "Are wood-burning stoves still legal in UK urban areas?",
    answer:
      "Subject to restrictions. The Clean Air Act and successive Defra regulations restrict what can be burned in smoke-control areas and require Defra-exempt appliances (designed to meet emission limits when burning approved fuels). The Ecodesign Directive sets emission limits for new appliances. Burning wet/unseasoned wood, treated timber or general waste in a stove is illegal in smoke-control areas regardless of appliance. Customers with stoves in urban areas should have a Defra-exempt appliance and use only approved fuels (kiln-dried logs, manufactured pellets).",
  },
  {
    question: "Can MVHR be retrofitted into an existing house?",
    answer:
      "Sometimes. The barriers are airtightness (the host building must be tight enough that MVHR delivers net benefit) and ductwork space (running supply and extract ducts to every habitable room is invasive in a finished house). A whole-house refurbishment with insulation upgrade, replacement glazing and air-sealing can support MVHR retrofit; a casual single-room intervention typically can't. Some manufacturers offer single-room heat-recovery units (room-by-room MVHR) that side-step the duct problem at lower per-room recovery efficiency.",
  },
  {
    question: "What's the operating life of a domestic biomass boiler?",
    answer:
      "Typically 15-25 years for a quality wood-pellet boiler with proper maintenance. Major service every 1-2 years (auger, igniter, ash handling, flue clean). Boilers in hard service or burning poor fuel quality have shorter lives. Pellet quality matters — high-ash or wet pellets foul the burner and shorten component life. Customers committing to biomass need to commit to the maintenance schedule.",
  },
  {
    question: "What's the carbon footprint of biomass compared to a heat pump?",
    answer:
      "Debated within the carbon accounting community. Biomass is conventionally counted as 'low-carbon' because the CO₂ released during combustion is offset by what the trees absorbed during growth — but the timing mismatch (release now, regrowth over 30-80 years) and the displacement of mature woodland for plantation use complicate the picture. A heat pump driven by an increasingly clean grid (~200 gCO₂/kWh now, falling) delivers heat at ~57 gCO₂/kWh of useful heat with SCOP 3.5. Biomass conventionally accounts in the 20-30 gCO₂/kWh range using the IPCC offset assumption, but the lifecycle picture is contested. For most UK domestic situations the heat pump is the cleaner choice on most accounting bases.",
  },
  {
    question: "If domestic wind is a poor bet, what about wind on a farm site?",
    answer:
      "Different conversation. A farm with a clear wind-exposed field, room for a tall mast (typically 15-30 m hub height for a sub-100 kW turbine), and a willing planning authority can get a viable installation. The capital cost is significant; the planning timeline is long; the noise impact assessment matters. Where the site genuinely works the financial and carbon case can be strong. Always engage a wind specialist for the site assessment — generic 'a turbine here would work' opinions are not a substitute for proper wind-resource modelling.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 3"
            title="MVHR, wind, micro-CHP, biomass — recognition-level overview"
            description="Operating principles, electrical interface, regulatory home and current UK market relevance for the five remaining environmental technology families an L3 electrician should recognise."
            tone="emerald"
          />

          <TLDR
            points={[
              "MVHR is the recovery default in airtight new-build — recovers 80-90% of ventilation heat loss. Only delivers net benefit when the building envelope is airtight enough.",
              "Domestic wind almost always disappoints in suburban back gardens because of wind shear from surrounding buildings. Genuine wind sites are rare and need professional siting.",
              "Micro-CHP made sense when grid was carbon-intensive and gas was cheap. Both conditions have reversed — heat pumps now deliver lower running carbon. Domestic micro-CHP is largely over.",
              "Biomass suits rural off-gas-grid properties with fuel storage. Air-quality regulation tightening; new domestic installs increasingly rare since the RHI closed in 2022.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the operating principle of MVHR — counter-flow heat exchanger recovering heat from extract air to supply air — and explain why it depends on building airtightness.",
              "State the typical electrical interface for a domestic MVHR unit and identify the boost-wiring network as the bulk of the electrical scope.",
              "State the typical electrical interface for a domestic micro-wind installation and recognise that it falls under the same ENA G98 / G99 framework as PV.",
              "Explain why domestic micro-CHP is largely over in the UK new-install market and identify where commercial CHP still makes sense.",
              "Identify the regulatory framework for domestic biomass — Building Regs Part J, Clean Air Act, Ecodesign Directive, MCS MIS 3004 / 3006 — and recognise the air-quality constraints in urban areas.",
              "Recognise micro-hydro as a site-specific technology with strong baseload performance where head and flow exist; identify the licensing and capital-cost barriers.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>MVHR — the recovery default</ContentEyebrow>

          <ConceptBlock
            title="Mechanical ventilation with heat recovery"
            plainEnglish="MVHR supplies fresh air to bedrooms and living rooms, extracts stale air from kitchens, bathrooms and utility rooms, and passes both streams through a counter-flow heat exchanger. 80-90% of the heat in the extract air transfers to the supply air through the exchanger plates without the two streams ever mixing. Net effect: controlled ventilation with most of the ventilation heat loss recovered."
            onSite="Standard kit on Future Homes Standard new-build and a viable retrofit option for properties that have been airtight-upgraded. Building Regs Part F covers ventilation requirements; Part L credits MVHR with significant SAP improvements in airtight buildings."
          >
            <p>
              The electrical interface for a typical domestic MVHR unit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unit supply</strong> — dedicated 13 A or 16 A supply on a 6 A or 10 A
                MCB, 1.5 mm² T&E to the unit location. Local DP isolator. Unit nameplate
                typically 50-300 W full load.
              </li>
              <li>
                <strong>Boost wiring</strong> — kitchens and bathrooms have boost overrides
                (humidity sensors, PIR, push-buttons or pull-cords) that increase the unit's
                fan speed temporarily. The boost network is the bulk of the electrical
                scope.
              </li>
              <li>
                <strong>Commissioning sensors</strong> — some units include CO₂ sensors,
                humidity sensors or temperature probes that feed back to the unit\'s controls.
              </li>
              <li>
                <strong>Smart-home integration</strong> — Cat5e/Cat6 to the unit increasingly
                common for IP-based controls, integration with Home Energy Management
                systems and tenant-facing apps.
              </li>
            </ul>
            <p>
              The ducting, terminal placement and air-flow commissioning is the ventilation
              specialist\'s domain. Your scope is the unit supply, the boost network, the
              isolation and any commissioning sensor wiring.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010, Approved Document F (Ventilation) — paraphrased"
            clause={
              <>
                Approved Document F sets minimum ventilation rates for habitable rooms,
                kitchens, bathrooms and utility rooms in new and refurbished dwellings.
                Mechanical ventilation systems (including MEV and MVHR) must be designed,
                installed, commissioned and balanced to deliver the specified flow rates,
                and the commissioning records must be retained for the building owner.
              </>
            }
            meaning={
              <>
                Part F is the regulatory home for ventilation. It applies regardless of
                whether the ventilation is natural, mechanical extract (MEV) or
                mechanical-with-recovery (MVHR). The commissioning records — air-flow rates
                at every supply and extract terminal — are part of the Building Regs hand-
                over pack. As the electrician you\'re not the lead trade on Part F compliance
                but you need to recognise where it sits in the regulatory map.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document F (paraphrased from the published Approved Document available via gov.uk)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Micro-wind — recognise but expect to disappoint</ContentEyebrow>

          <ConceptBlock
            title="Domestic-scale wind turbines and where they actually work"
            plainEnglish="Wind turbines convert moving air into rotational energy via the rotor and into electrical energy via the generator. Domestic-scale turbines (sub-10 kW) need clean laminar wind to deliver their rated output. Suburban back gardens deliver turbulent air shed by surrounding houses; the turbine spends most of its time below cut-in wind speed or cycling wildly. Real-world yields are usually a fraction of the manufacturer\'s wind-tunnel claim."
            onSite="Where wind genuinely works — open rural sites with tall masts (15-30 m hub height) and clean wind — domestic-scale wind can deliver useful baseload renewable. The capital cost, planning timeline, noise assessment and ongoing maintenance are all non-trivial. As the electrician on a wind install you\'d see a similar electrical chain to PV: turbine → rectifier (for DC turbines) or AC output → inverter (where required) → grid-connection isolator → consumer unit. ENA G98 (≤16 A per phase) or G99 (&gt;16 A per phase) applies as for PV."
          >
            <p>
              The typical electrical interface:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Turbine</strong> — variable-speed permanent-magnet alternator inside
                the nacelle. Outputs variable-frequency AC or DC depending on the design.
              </li>
              <li>
                <strong>Power conversion</strong> — rectifier and inverter (or DC-DC + DC-AC
                inverter chain) converts the variable turbine output to grid-synchronised
                AC. Located at the base of the mast or in the property.
              </li>
              <li>
                <strong>Grid interface</strong> — AC isolator, generation meter, dedicated
                MCB into the consumer unit. ENA G98 or G99 notification per the inverter
                rating.
              </li>
              <li>
                <strong>Anti-islanding and safety</strong> — same loss-of-mains detection as
                PV. Inverter must disconnect on grid failure. MCS MIS 3003 covers small
                wind installer competence.
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

          <ContentEyebrow>Micro-CHP — niche commercial, almost dead domestic</ContentEyebrow>

          <ConceptBlock
            title="Combined heat and power for the L3 electrician"
            plainEnglish="Micro-CHP burns gas (or sometimes other fuels) to generate electricity locally, using the waste heat from the engine or fuel-cell to drive the wet heating system. The economic case worked when grid electricity was carbon-intensive (~500 gCO₂/kWh) and gas was cheap. As the grid has decarbonised (~200 gCO₂/kWh now), the relative carbon advantage has shrunk; heat pumps deliver lower running carbon per kWh of heat. Future Homes Standard takes fossil-fuel heat off new-build from 2025, removing the new-install market for domestic micro-CHP."
            onSite="Commercial-scale CHP at 5-50 kWe still makes sense in sites with high constant heat demand — hospitals, hotels, leisure centres, large care homes. The economics work because the site has constant heat demand (high capacity factor), the electricity offsets expensive day-rate import, and the combined efficiency (heat + power) outperforms separate plant. As the electrician on a commercial CHP install you handle the AC export side (G99 for anything material), the controls integration and the safety interlocks."
          >
            <p>
              The categories of CHP you may meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stirling-engine domestic</strong> — typically 1 kWe / 6-7 kW heat,
                gas-fired. Largely 2010-2015 era installs; new install market essentially
                gone.
              </li>
              <li>
                <strong>Fuel-cell domestic</strong> — typically 0.7-1.5 kWe, gas-fired
                reformer. Pilot installs only; not mainstream.
              </li>
              <li>
                <strong>Engine-based commercial</strong> — 5-50 kWe internal combustion
                engine driving a generator, with heat exchanger recovering jacket water and
                exhaust heat. Mature technology, live commercial market.
              </li>
              <li>
                <strong>Biomass CHP</strong> — gasification or steam-cycle plants at 50 kW+
                scale. Niche; usually associated with agricultural / forestry sites with
                fuel availability.
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

          <ContentEyebrow>Biomass — rural off-gas-grid niche</ContentEyebrow>

          <ConceptBlock
            title="Biomass boilers and stoves"
            plainEnglish="Biomass appliances burn sustainably-sourced wood (logs, pellets, chips) to drive a wet heating system (boiler) or to heat a single room (stove). Counts as \'low-carbon' under conventional accounting because the CO₂ released during combustion is offset by what the trees absorbed during growth — though the timing mismatch is debated. Best fit: rural off-gas-grid properties with space for a fuel store and ash handling. Worst fit: urban smoke-control areas with poor air quality."
            onSite="The electrical interface is straightforward — typically 13 A or 16 A supply on a 6 A or 10 A MCB to the boiler / stove location, with controls integration into the wet system pumps, three-port valves and thermostats. The fuel auger, ignition element, fan and ash-handling motor are all electrically driven and the controller manages the start-stop / modulation cycle. Building Regs Part J covers combustion appliances, flues and combustion-air provision; Clean Air Act compliance covers smoke-control area restrictions; MCS MIS 3004 (boilers) / 3006 (stoves) covers installer competence."
          >
            <p>
              Practical considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fuel storage</strong> — pellets in a hopper (auto-feed) or logs in a
                wood store (manual loading). Pellet hoppers need annual delivery; log
                stores need seasoning and stacking.
              </li>
              <li>
                <strong>Ash handling</strong> — ash pan empties weekly to monthly depending
                on use. Customer-facing operational task. Some boilers offer auto-ash
                handling at higher cost.
              </li>
              <li>
                <strong>Air quality</strong> — Clean Air Act smoke-control areas restrict
                what can be burned and require Defra-exempt appliances. Many UK urban
                postcodes are in smoke-control areas.
              </li>
              <li>
                <strong>Maintenance</strong> — annual service essential. Auger, igniter,
                fan, ash-handling components have wear lives. Pellet quality matters —
                high-ash or wet pellets foul the burner and shorten component life.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Micro-hydro — site-specific but excellent where it fits</ContentEyebrow>

          <ConceptBlock
            title="Small-scale hydroelectric for the L3 electrician"
            plainEnglish="Micro-hydro converts the kinetic and potential energy of flowing water into electrical energy via a turbine and generator. Output depends on head (vertical drop) × flow (volume per unit time). Where the site has both head and flow, micro-hydro delivers consistent baseload renewable energy with very high capacity factor (typically 50-80% — much higher than wind or PV). The capital cost (turbine, intake, civils, grid connection) is the headline barrier; the operational cost is low and the equipment life is long."
            onSite="The right site is rare — a year-round flowing stream, sufficient drop, and adjacent property with reasonable cable run. Where the site exists, micro-hydro outperforms PV and wind by a wide margin. The regulatory framework includes the Environment Agency / SEPA / NRW abstraction licensing, fish-friendly intake design, planning permission, and the standard ENA G98 / G99 grid-connection regime. MCS MIS 3008 covers small-hydro installer competence."
          >
            <p>
              Typical electrical interface:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Turbine and generator</strong> — Pelton, Turgo or Crossflow for high-
                head sites; Francis or Kaplan for low-head high-flow. Generator output is
                AC or DC depending on the design.
              </li>
              <li>
                <strong>Power conversion</strong> — inverter / converter chain converts the
                generator output to grid-synchronised AC.
              </li>
              <li>
                <strong>Grid interface</strong> — long cable run from power-house to
                property (often hundreds of metres of buried SWA), grid-connection isolator,
                generation meter, dedicated MCB into the consumer unit. ENA G99 typically
                applies given the size of viable installs.
              </li>
              <li>
                <strong>Civils</strong> — weir, intake, penstock, power-house. The civils
                cost typically dominates the install budget.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Solar thermal — recognition for retrofit and maintenance</ContentEyebrow>

          <ConceptBlock
            title="Solar thermal — heat collection rather than electricity generation"
            plainEnglish="Solar thermal collectors absorb sunlight to heat a glycol-based fluid in a primary loop. The hot fluid runs through a coil in the bottom of a twin-coil hot water cylinder; a small pump circulates it; a controller decides when to run the pump based on collector temperature versus cylinder temperature. Output is heat for hot water, not electricity. Two collector types — flat plate (cheaper, less efficient at low irradiance) and evacuated tube (more efficient, especially at low light, more expensive)."
            onSite="Solar thermal new-install volume in the UK has fallen sharply since 2014 as PV costs collapsed and PV-plus-immersion (or PV-plus-heat-pump) outcompeted thermal on cost-per-kWh-of-hot-water. The L3 apprentice will encounter solar thermal mainly on EICR and maintenance work — replacing a tired pump, swapping a controller, decommissioning a stagnated system. The electrical scope is small: typically a 13 A supply to the controller, a 2-core to the pump, and the controller&apos;s sensor wiring (collector temperature probe, cylinder temperature probe). MCS MIS 3001 is the install standard. Watch for stagnation damage on systems that have been left unattended over hot summer periods — the glycol breaks down and the system needs flushing."
          >
            <p>
              Solar thermal field-recognition guide:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flat plate collector</strong> — glazed metal panel, looks like
                a flat radiator. Cheaper; less efficient at low light.
              </li>
              <li>
                <strong>Evacuated tube collector</strong> — array of glass tubes with
                vacuum insulation. Higher efficiency at low light; more expensive;
                more visually distinctive.
              </li>
              <li>
                <strong>Twin-coil cylinder</strong> — distinguishing feature of a
                solar thermal install. Lower coil from solar primary, upper coil from
                boiler / immersion top-up.
              </li>
              <li>
                <strong>Primary loop pump and controller</strong> — typical 13 A
                supply, controller mounted near the cylinder. Watch for failed pumps
                and degraded glycol on systems unattended for years.
              </li>
              <li>
                <strong>Stagnation damage</strong> — common failure on systems where
                the customer was away during hot weather and the cylinder filled. The
                primary loop overheats; glycol degrades. Flush, replace glycol,
                inspect for corrosion damage.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>MVHR commissioning detail</ContentEyebrow>

          <ConceptBlock
            title="The MVHR balance-and-commission step is what makes the install actually work"
            plainEnglish="MVHR delivers its design performance only when each supply terminal and each extract terminal is delivering the design air flow rate. Out of the box every install needs balancing — adjusting the diffuser dampers and the unit&apos;s flow settings until each room&apos;s supply and extract match the design schedule. Building Regs Part F requires the commissioning records (measured flow rate at every terminal) be retained as part of the building handover. The ventilation specialist runs the balance; the L3 electrician&apos;s scope is the supply, isolation and boost wiring."
            onSite="A poorly commissioned MVHR install is a common and avoidable failure mode. Symptoms: rooms that feel stuffy or stale, condensation on bedroom windows in the mornings, perceived noise from the unit running at higher speed than necessary because the airflow is throttled by miscommissioned terminals. The commissioning records are the customer&apos;s evidence base — without them, the install is non-compliant under Part F and the customer cannot demonstrate that the system is delivering design ventilation. As the L3 electrician verifying an MVHR install at EICR, ask to see the commissioning records; a missing record is a failure to flag."
          >
            <p>
              The MVHR commissioning checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air flow at every terminal</strong> — measured with an
                anemometer at every supply and extract terminal; recorded against the
                design schedule.
              </li>
              <li>
                <strong>Unit flow rate</strong> — measured at the unit&apos;s outlet
                ducts; verified against the sum of terminal flows.
              </li>
              <li>
                <strong>Boost function</strong> — kitchen and bathroom boost
                operating; humidity / PIR sensors triggering; unit responding.
              </li>
              <li>
                <strong>Bypass operation</strong> — many MVHR units include a summer
                bypass that disengages the heat exchanger when outdoor air is cooler
                than indoor. Verify operation per design.
              </li>
              <li>
                <strong>Filter access and replacement schedule</strong> — clearly
                briefed to the customer. Filter clogging is the most common cause of
                MVHR underperformance over time.
              </li>
              <li>
                <strong>Commissioning records retained</strong> — Part F requires the
                records be provided to the customer at handover and retained for
                building inspection.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EAHP and Passivhaus integration</ContentEyebrow>

          <ConceptBlock
            title="Exhaust-air heat pumps and the Passivhaus integration story"
            plainEnglish="Passivhaus and similar very-low-energy designs (Future Homes Standard high-spec, AECB Silver / Gold) reduce the building&apos;s heat demand to a fraction of conventional construction. Total heat demand may be only 15-25 kWh per m2 per year, against 100+ for typical Building Regs minimum. At that demand level a small exhaust-air heat pump (1-3 kW) integrated with the MVHR can supply both the ventilation and the heating from a single unit. Genvex Combi 185, NIBE F750 and Vaillant aroSTOR are typical examples."
            onSite="The L3 apprentice will encounter EAHP / Passivhaus integration mainly on new-build and major retrofit. The electrical interface is relatively simple — a single dedicated supply to the integrated unit, controls cabling for room sensors and temperature probes, boost wiring from kitchens and bathrooms (same as standard MVHR), and a small immersion heater on the integrated DHW cylinder for legionella protection. Performance depends heavily on the building envelope being genuinely airtight and well-insulated; an EAHP fitted to a leaky building will not deliver. The install is typically signed off by an MCS-certified designer holding both MIS 3005 (heat pump) and MVHR competence."
          >
            <p>
              When EAHP / Passivhaus integration fits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New-build to Passivhaus or similar standard</strong> — air
                permeability ≤0.6 air changes per hour at 50 Pa; low total heat
                demand. Single integrated unit replaces separate heat pump and MVHR.
              </li>
              <li>
                <strong>Major retrofit to EnerPHit or AECB Silver</strong> —
                whole-house fabric upgrade brings demand into EAHP range; integrated
                unit avoids needing two separate systems.
              </li>
              <li>
                <strong>Conventional new-build or retrofit</strong> — separate ASHP
                plus separate MVHR is the typical configuration; integrated EAHP not
                applicable because the heating demand exceeds what a 1-3 kW unit can
                deliver.
              </li>
              <li>
                <strong>Performance dependence</strong> — building envelope
                airtightness and insulation are non-negotiable. An EAHP in a leaky
                building underperforms because the extracted air does not carry
                enough heat to drive a useful heat pump duty.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Recommending MVHR for a leaky uninsulated property"
            whatHappens={
              <>
                Customer in a 1960s detached with single glazing and uninsulated cavity walls
                asks about MVHR. Apprentice (or marketing they&apos;ve seen) recommends it.
                System is fitted at significant cost. The building&apos;s air permeability
                is so high that the bulk of air change happens through the envelope, not
                the MVHR ducts. The MVHR fan power consumed (continuous 50-150 W) outweighs
                the heat recovered. Customer&apos;s bills go up, not down.
              </>
            }
            doInstead={
              <>
                MVHR only earns its keep in airtight buildings. The MCS / Passivhaus /
                AECB MVHR design guides specify air permeability thresholds (typically
                ≤3 m³/h/m² @ 50 Pa) below which MVHR pays back. Above that threshold the
                fabric needs upgrading first. The honest customer-facing answer: &quot;MVHR
                is the right next step after you&apos;ve done the insulation, glazing and
                draught-proofing — before that, you&apos;re burning fan power for no
                recovery.&quot;
              </>
            }
          />

          <CommonMistake
            title="Quoting wind manufacturer claims as if they were the realistic suburban yield"
            whatHappens={
              <>
                Customer reads a 5 kW turbine&apos;s spec sheet promising &quot;up to 12,000
                kWh per year&quot;. Apprentice doesn&apos;t challenge it. Customer spends
                £12-18k on the install. Real-world yield in their suburban back garden is
                2,500-4,000 kWh per year due to wind shear from surrounding buildings.
                Customer is unhappy; the trade gets the blame.
              </>
            }
            doInstead={
              <>
                Manufacturer yield claims are quoted at clean reference wind speeds — they
                are essentially never achievable in suburban gardens. Where the customer
                wants wind, refer them to a wind specialist for a proper site assessment
                with anemometer-derived wind-resource modelling, not an off-the-shelf
                back-garden turbine. For most suburban customers asking about wind, the
                honest answer is &quot;wind is unlikely to deliver — battery storage / EV
                smart charging / heat pump are better next steps&quot;.
              </>
            }
          />

          <Scenario
            title="Rural off-gas-grid retrofit — biomass vs heat pump"
            situation={
              <>
                Customer has a 1980s detached cottage in a rural off-gas-grid area, currently
                heated by an oil boiler. Property has a single-storey extension housing the
                existing boiler and oil tank. Customer wants to decarbonise heating and is
                weighing biomass (wood-pellet boiler with hopper) against air-source heat
                pump. Property has cavity wall insulation, double glazing, and reasonable
                airtightness. Garden has space for either option. Annual heat demand
                estimated at 18,000 kWh.
              </>
            }
            whatToDo={
              <>
                The realistic comparison: ASHP (10-12 kW) at typical SCOP 3.0-3.5 would
                consume around 5,500-6,000 kWh of electricity annually — at current grid
                carbon ~200 gCO₂/kWh, that&apos;s ~1.1-1.2 tonnes CO₂. Pellet boiler at ~85%
                efficiency burning ~21,000 kWh of pellets — ash, weekly hopper top-up,
                annual service. Pellet cost varies but typically £1,200-1,800/year at recent
                rates. Heat pump electricity cost depends on tariff (~£1,500-1,700/year on
                standard tariff, can drop with time-of-use tariffs). Carbon: heat pump on
                current grid is the cleaner choice and gets cleaner each year as the grid
                cleans up. Pellet is conventionally low-carbon but the grid trajectory
                favours the heat pump. Boiler Upgrade Scheme grant available for both.
                Honest recommendation: heat pump unless the customer particularly values the
                fuel independence of biomass or has biomass fuel availability on-site
                (forestry / agricultural).
              </>
            }
            whyItMatters={
              <>
                Off-gas-grid retrofit is the segment where biomass historically had the
                strongest claim. Heat pumps have largely taken over this segment as costs
                have fallen and SCOP has improved. The customer-facing answer needs the
                operating-cost comparison, the carbon-trajectory comparison and the
                lifestyle comparison (auto-running heat pump vs hands-on pellet management).
                The L3 electrician is the customer-trusted trade who can frame the
                comparison honestly.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (PV power supply systems)"
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
                Solar thermal sits under Building Regs Part L and MCS MIS 3001 rather than
                Section 712. PV — including the panels and the immersion-diverter logic that
                often replaces a solar-thermal twin-coil cylinder — is governed by Section 712
                as fully revised in A4:2026.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc
                fault detection devices (AFDDs) to mitigate the risk of fire in AC final
                circuits of a fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning={
              <>
                Where a PV-driven immersion or storage tank is wired as an AC final circuit,
                the AFDD recommendation in 421.1.7 applies. It is advisory under BS 7671 but
                mandatory in high-rise residential buildings via the Building Safety Act
                framework.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "MVHR recovers 80-90% of ventilation heat loss in airtight buildings. In leaky buildings the fan power outweighs the heat recovered — fabric first, MVHR second.",
              "MVHR electrical interface — dedicated 13/16 A supply, local isolation, boost wiring from kitchens and bathrooms. The boost network is usually the bulk of the scope.",
              "Domestic micro-wind almost always disappoints in suburban back gardens. Wind shear from surrounding buildings means yields are well below manufacturer claims.",
              "All parallel-connected generators (PV, wind, micro-hydro, micro-CHP, battery) fall under ENA G98 (≤16 A/phase) or G99 (&gt;16 A/phase).",
              "Domestic micro-CHP is essentially over in new installs — grid carbon has fallen to where heat pumps win the carbon comparison. Commercial CHP at 5-50 kWe still works in constant-heat-demand sites.",
              "Biomass suits rural off-gas-grid properties with fuel storage and ash handling. Air quality regulation (Clean Air Act, Ecodesign) tightening; new installs uncommon.",
              "Micro-hydro is site-specific but excellent where head and flow exist — much higher capacity factor than wind or PV. Capital cost and licensing are the headline barriers.",
              "Each of the five technologies has a regulatory home — Building Regs Part F (MVHR), MCS MIS 3003 / 3004 / 3006 / 3008 (wind, biomass boiler, biomass stove, hydro), ENA G98/G99 (any grid-connected generator).",
            ]}
          />

          <Quiz title="MVHR, wind, micro-CHP, biomass — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Heat pumps overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4 — Regulatory framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
