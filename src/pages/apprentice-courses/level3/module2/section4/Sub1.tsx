/**
 * Module 2 · Section 4 · Subsection 1 — Building Regulations Part L + MCS framework
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and
 *             non-statutory requirements for the installation and maintenance of
 *             environmental technology systems"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 1.4 (interpret requirements for electrical
 * installations as outlined in relevant sections of the Building Regulations and the
 * Code for Sustainable Homes) and AC 3.3 (Local Authority Building Control requirements
 * for environmental technology systems).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed MCS sign-off competence belongs in
 * the technology-specific MCS quals (2399 / 2919 / 2921), not 2365-03. This Sub gives
 * the L3 electrician the regulatory map — what governs what, and where the boundaries sit.
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
  'Building Regulations Part L + MCS framework (4.1) | Level 3 Module 2.4.1 | Elec-Mate';
const DESCRIPTION =
  'The regulatory framework for environmental technology systems — Building Regulations Part L (Conservation of Fuel and Power), Future Homes Standard, MCS Code and Installation Standards, Boiler Upgrade Scheme, Smart Export Guarantee. Where each rule sits and what it actually requires of the L3 electrician on a UK install.';

const checks = [
  {
    id: 'l3-m2-s4-sub1-part-l-vs-mcs',
    question:
      'A customer asks "do I need MCS to install a heat pump?". What\'s the precise answer?',
    options: [
      "Via the manufacturer test button. There is no instrument equivalent to the RCD trip-time test for AFDDs because the arc-detection algorithm is internal to the device and operates on waveform signature analysis. Manufacturer test buttons inject a simulated arc-fault signature that exercises the detection circuitry and the trip mechanism. Press the button, the device should trip, reset by switching back on. Customer briefing under Reg 132.13 should include the test-button protocol.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit / meter, at the main isolation, at the inverter and at the DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property.",
      "Stop work, secure the open consumer unit (close the door and lock-off where you can), gather the floor-level tools, and have a quick conversation with the parent about keeping the children out of the work area for the rest of the visit. If that can't be arranged, pack down and reschedule. HASAWA s.3 puts the duty on you to protect non-employees affected by your work — children in your work zone is a textbook s.3 issue.",
      "No, MCS is not legally required to install a heat pump. Building Regulations Part L compliance is required for any new heating system in a notifiable installation, but Part L can be demonstrated by various pathways. MCS is required if the customer wants the Boiler Upgrade Scheme (BUS) grant — currently £7,500 toward an ASHP install. Most manufacturer warranties also require MCS-certified installation. So in practice almost every install is MCS, even though it isn't a legal install requirement. Without MCS the customer can have a working heat pump; they just don't get the grant or the warranty.",
    ],
    correctIndex: 3,
    explanation:
      "The MCS-vs-legal-requirement distinction is one of the most commonly muddled points on environmental tech. MCS is a competence and quality scheme — not a regulator. Its enforcement comes through funding gateways (BUS grant, SEG export tariff) and through manufacturer warranty conditions. Building Regulations Part L is the legal framework that applies regardless of MCS. The customer's pragmatic answer is usually 'go MCS' but the legal answer is 'Part L compliance is the legal floor; MCS is the funding gateway'.",
  },
  {
    id: 'l3-m2-s4-sub1-future-homes',
    question:
      'What is the Future Homes Standard and when does it take effect?',
    options: [
      "Reg 132.13 — 'The designer of the electrical installation shall provide ... the information necessary to allow the safe operation, inspection, alteration, repair, maintenance and dismantling of the electrical installation'. The information has to be available to whoever is going to operate or maintain it. That is the BS 7671 hook for site-folder paperwork (single line diagram, schedule of circuits, certificate, schedule of test results, mfr data).",
      "SEG is a regulated payment scheme requiring electricity suppliers to pay domestic generators for electricity exported to the grid. Replaced the Feed-in Tariff (FiT) which closed to new entrants in 2019. SEG tariffs vary by supplier (typically 5-15p/kWh in 2026); customers shop around for the best rate. To qualify, the install must be MCS-certified and the meter must be capable of recording export (most modern smart meters are). The customer signs up for SEG with their chosen supplier; it isn't automatic.",
      "Treat the DC side as live until proven dead with a meter rated for the voltage. The DC isolator at the array end and the DC isolator at the inverter end must both be operated and locked-off, then verify dead with a meter at both ends of the string. Even with the inverter AC-side isolated and switched off, the array continues to generate as long as light hits the panels. Covering the panels reduces but does not eliminate the DC output. Inverter manufacturer's instructions usually require a dwell time after isolation to allow internal capacitors to discharge.",
      "The Future Homes Standard is the Government's policy framework for new-build dwellings, expected to take effect on a phased basis from 2025. It tightens Part L of the Building Regulations to require new-build homes to produce 75-80% lower CO₂ emissions than the previous standard. In practice it effectively rules out fossil-fuel boilers in new-build (heat pump or hydrogen-ready boiler instead), pushes higher fabric standards, and credits PV / MVHR / smart controls in the SAP calculation. The Future Homes Standard sits downstream of the Climate Change Act 2008 (as amended for the 2050 net-zero duty).",
    ],
    correctIndex: 3,
    explanation:
      "Future Homes Standard is the regulatory mechanism that will normalise heat pumps + PV + MVHR as the default new-build kit. The phased timeline reflects implementation lead-times for the supply chain. As the L3 electrician you'll see Future Homes Standard new-build sites where the integration of heat pump + PV + MVHR + smart controls is the routine kit, not the exotic add-on.",
  },
  {
    id: 'l3-m2-s4-sub1-bus-grant',
    question:
      'A customer wants the £7,500 Boiler Upgrade Scheme grant for an ASHP. What\'s the L3 electrician\'s role in securing it?',
    options: [
      "Unwanted conduct related to a protected characteristic (or unwanted conduct of a sexual nature) which has the purpose or effect of violating a person's dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment. The conduct doesn't have to be 'severe' to count — repeated 'banter' related to race, sex, disability or another protected characteristic can be harassment if it has the proscribed effect on the recipient.",
      "Gas Safe engineers carry out work on gas appliances and pipework — disconnection, reconnection, commissioning. On a kitchen rewire involving a gas hob the Gas Safe engineer disconnects before the electrical work starts and reconnects after. They're a separate trade, with a separate competence scheme (Gas Safe Register, replacing the old CORGI), and only Gas Safe registered engineers can lawfully work on gas under the Gas Safety (Installation and Use) Regulations 1998.",
      "Indirectly — your role is to make sure the install meets the standard the MCS-certified installer is signing off against. The BUS grant requires the installation to be done by an MCS-certified installer, who applies for the grant on the customer's behalf. As the L3 electrician on the install you carry out the electrical work to the certified installer's design, complete the BS 7671 inspection-and-testing, and contribute to the customer handover pack. The certified installer is the named accountable person for the MCS sign-off; you don't sign it yourself unless you're personally MCS-certified for heat pumps.",
      "A multimeter is a general-purpose measuring instrument — DC volts, AC volts, current, resistance, continuity. Designed for bench work and equipment fault-finding. An MFT (Multifunction Tester) is an installation-test instrument designed specifically for BS 7671 verification — continuity (low-resistance ohms), insulation resistance (500 V DC test), loop impedance (Ze, Zs, PFC), RCD operating time and trip current, and on most models earth-electrode resistance. Different tools, different purposes.",
    ],
    correctIndex: 2,
    explanation:
      "The BUS grant is the current main UK government incentive for low-carbon heating retrofits. It replaced the Renewable Heat Incentive (RHI) which closed in 2022. The grant is paid to the installer who passes it through to the customer as a price reduction. Without MCS sign-off the customer can't claim the grant. As the apprentice on the install you support the MCS process; you don't substitute for it.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does Part L of the Building Regulations cover and how does it relate to environmental technology systems?',
    options: [
      "Five-step. (1) VERIFY the reading — repeat the test; check leads / instrument condition; compare with second instrument if available. (2) IDENTIFY the failure mode — what does the unsatisfactory reading indicate (insulation breakdown, HRJ, polarity error, RCD slow trip)? (3) MAKE SAFE — isolate the affected circuit / component; label / signage if you'll be away from site. (4) DOCUMENT — record the failed reading, the verification, the action, on the job sheet AND inform customer in writing if Code 1 (Danger Present). (5) RECTIFY OR ESCALATE — fix if within competence; escalate to supervisor / specialist if not. Never leave a Code 1 fault unactioned even if outside the original call-out scope.",
      "Part L (Conservation of Fuel and Power) is the section of the Building Regulations governing the energy efficiency of buildings. It applies to new dwellings, extensions, replacement boilers, replacement windows, controlled fittings, and major refurbishments. Compliance is demonstrated via the SAP (Standard Assessment Procedure) calculation for dwellings or SBEM (Simplified Building Energy Model) for non-domestic. Environmental technology systems contribute to Part L compliance: PV adds generation credits to the SAP score, heat pumps reduce the regulated carbon emissions, MVHR reduces ventilation losses. Successive Part L revisions have tightened the target rate, pushing more environmental tech into the standard build specification.",
      "A dedicated final circuit from the consumer unit. Typical sizes: 32 A radial on 6 mm cable for a 5-7 kW unit; 40 A radial on 10 mm cable for a 9-12 kW unit. Type C MCB or RCBO (the high inrush from the compressor start can nuisance-trip a Type B). Local means of isolation outside near the outdoor unit. Manufacturer-specified controls cabling between outdoor unit, indoor controller and any zone valves / pumps. Bonding of the outdoor chassis where the manufacturer specifies or where it is an extraneous-conductive-part. The heat pump's nameplate gives the maximum rated current; the MCS designer specifies the cable and protective device.",
      "BS 7671 643.3 specifies 500 V DC for SELV/PELV at 250 V; 500 V DC for LV up to 500 V; 1000 V DC for LV &gt;500 V. BUT — modern installations have electronic devices (LED drivers, dimmers, AFDDs, RCBOs with electronic detection, surge protection devices, smart meters) that 500 V will damage. Standard L3 practice: disconnect or shunt-out electronic devices before IR test, OR test at 250 V (lower, less damaging) and apply manufacturer's compliance criterion. Megger MFT1741+ supports 250 V / 500 V / 1000 V. The risk of damage is high; the cost of a customer-replaced LED driver wall is real.",
    ],
    correctAnswer: 1,
    explanation:
      "Part L is the energy-efficiency regulator for buildings. It applies regardless of whether the customer 'wants' to install environmental tech — the SAP / SBEM target rate has to be met to get Building Regs sign-off for new-build and major refurbishment. Environmental tech is increasingly the routine route to compliance rather than an optional add-on.",
  },
  {
    id: 2,
    question:
      'What is the SAP and why does it matter for an environmental technology install?',
    options: [
      "Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, in 1.5 mm² T&E to the unit location (utility room, loft, plant cupboard). Local DP isolator. Boost wiring from kitchens and bathrooms — sometimes via humidity sensors or PIR, sometimes via pull-cord switches in bathrooms or push-buttons in kitchens. Some units include a low-voltage commissioning interface (e.g. for installer-set air-flow rates). The unit's nameplate is typically 50-300 W on full load — modest demand. The bulk of the electrical work is the boost wiring network, not the unit supply.",
      "It sits in the standards / technical family alongside BS 7671 and the IET OSG. BS 7671 Reg 510.3 ties equipment selection and erection to manufacturer's instructions. Reg 526.1 ties the connection itself (torque, ferrule requirement, mechanical strength) to those instructions. The data sheet is the authoritative source for how the unit is meant to be installed. Treat it as part of the site folder, not the bin.",
      "The Standard Assessment Procedure (SAP) is the methodology for calculating the energy performance of dwellings under Part L of the Building Regulations. It produces a SAP rating (1-100+) and a regulated CO₂ emissions figure that must beat the Target Emission Rate (TER). PV, heat pumps, MVHR, smart controls and fabric measures all feed into the SAP calculation. The MCS-certified installer's design pack typically includes the system's contribution to the SAP score; that contribution is what gets the building Building Regs sign-off.",
      "RIDDOR Reg 7 specifies a list of 'dangerous occurrences' that must be reported even if no-one was hurt — they're near-misses with serious potential. The list (RIDDOR Schedule 2) includes electrical short circuits or overloads that cause a fire or explosion, certain types of plant collapse, scaffolding failure, dangerous occurrences in or near a pipeline, and so on. So yes — an electrical incident causing fire or explosion in a fixed installation is reportable as a dangerous occurrence even with no injury.",
    ],
    correctAnswer: 2,
    explanation:
      "SAP is the calculation engine behind Part L compliance for dwellings (SBEM is the equivalent for non-domestic). Every environmental tech install in a Part L-relevant context contributes to a SAP calculation. As the L3 electrician you don't run the SAP yourself but you should recognise that the installer's design pack feeds into it.",
  },
  {
    id: 3,
    question:
      'What is the MCS Code of Practice and what does it require of installers?',
    options: [
      "Building Control is the local-authority enforcement of the Building Regulations. For most environmental tech installs the route is via a competent-person scheme (the installer's firm is registered with NICEIC / NAPIT / similar, and self-certifies the work) — Building Control is notified by the scheme but doesn't visit. For non-notifiable work (e.g. some maintenance) Building Control isn't involved. For installs that fall outside competent-person schemes, or for major works, Building Control may inspect on-site. The customer receives a Building Regs compliance certificate — either from the competent-person scheme or from Building Control directly.",
      "R32 is the dominant refrigerant in current UK ASHP — moderate Global Warming Potential (GWP ~675), F-Gas regulated, mildly flammable (A2L category), efficient in vapour-compression. R290 (propane) is rapidly increasing in market share — natural refrigerant, very low GWP (~3), highly flammable (A3 category) requiring specific install practices (charge limits per BS EN 378, ventilation around outdoor unit, ignition source clearance). R454B is replacing R410A in some products as a lower-GWP step. R410A and R134a are older refrigerants being phased down under F-Gas. The L3 electrician does not handle refrigerant — that is F-Gas certified personnel — but should recognise the refrigerant on the unit nameplate because A3 (R290) units have additional spacing requirements at install (clearance from windows, vents, ignition sources).",
      "The UPS battery has been substantially discharged during the period of mains isolation. Modern UPS units run on battery during outage; if your isolation lasted longer than the UPS battery capacity (typical 10–20 minutes for office units, hours for server-room units), the battery is depleted. After mains restoration, the UPS recharges over 4–24 hours depending on capacity. During the recharge period the UPS may be unable to provide full backup if a second outage occurs. Brief the customer / IT contact on the recharge timeline; recommend they avoid further isolation work until recharged. Document in the job sheet.",
      "The MCS Code of Practice is the over-arching code that all MCS-certified installers must comply with. It covers consumer protection (sales practices, contracts, performance estimates honestly disclosed), installation quality, commissioning records, customer handover documentation, complaints handling and after-sales support. The installer's MCS certification can be withdrawn for breaches of the Code. The Code references the technology-specific MCS Installation Standards (MIS 3001 solar thermal, 3002 PV, 3003 wind, 3004 biomass boiler, 3005 heat pump, 3006 biomass stove, 3007 EV, 3008 hydro, 3012 battery storage) for the technical detail.",
    ],
    correctAnswer: 3,
    explanation:
      "The MCS Code is the consumer-protection framework for the certified-installer industry. It sits alongside the technical MIS standards. As an apprentice on an MCS-certified install you don't sign off the Code yourself but you should recognise that customer-facing conversations, performance estimates and handover documentation all sit within the Code's framework.",
  },
  {
    id: 4,
    question:
      'What\'s the difference between a notifiable and non-notifiable electrical installation under Building Regs Part P?',
    options: [
      "Part P (Electrical Safety in Dwellings) requires certain types of electrical work in dwellings to be notified to Building Control — either via a registered competent-person scheme (NICEIC, NAPIT, etc.) or directly to the Local Authority. Notifiable work currently includes new circuits, consumer unit changes, and work in special locations (bathrooms / locations 700). Most environmental tech installs are notifiable — adding a PV inverter circuit, an EV charging circuit or a heat-pump dedicated radial all create new circuits and trigger Part P notification. Non-notifiable work (e.g. like-for-like socket replacement on an existing circuit) doesn't trigger Part P.",
      "Rarely, in the modern UK context. Micro-CHP burns gas to generate electricity locally and uses the waste heat to drive the wet system. It made sense when grid electricity was carbon-intensive (~500 gCO₂/kWh) and gas was cheap. As the grid decarbonises (~200 gCO₂/kWh now), the relative carbon advantage shrinks. Heat pumps deliver lower running carbon per kWh of heat. Micro-CHP is now mostly seen in larger commercial / institutional applications where heat demand is constant and high. For domestic UK new-build, the Future Homes Standard effectively rules it out.",
      "L–L (phase-to-phase) fault is a direct connection between two phases of a three-phase supply (e.g. L1 and L2). Continuity between the phases reads near zero. Fault current is high (limited only by supply + cable impedance) — typically 5–10 kA on a typical commercial supply. Operates the magnetic element of the protective device on at least one of the affected phases. The unaffected phase remains live; loads connected line-to-neutral on the unaffected phase continue working. Common cause: insulation breakdown in three-phase cable or motor windings, accidental contact between phases at a terminal block.",
      "Panels are warrantied 25 years and often deliver useful output well beyond. Inverters are warrantied 5-12 years depending on type (string inverters typically 10-12 years; microinverters often 25 years). Most domestic PV systems will need at least one inverter replacement during the 25-year panel lifetime. The replacement is straightforward — disconnect old, fit replacement of compatible spec, recommission, update the EIC. The cost should be factored into the system's whole-life economic case rather than treated as a surprise.",
    ],
    correctAnswer: 0,
    explanation:
      "Part P is the safety regulator for domestic electrical work. Adding any environmental tech circuit (PV, EV, heat pump, battery storage) is notifiable — your firm registers the work via the competent-person scheme and the customer receives a Building Regs compliance certificate. Skipping notification leaves the customer unable to demonstrate Part P compliance to a future buyer / surveyor / insurer.",
  },
  {
    id: 5,
    question:
      'What is the Boiler Upgrade Scheme (BUS) and what does it pay for?',
    options: [
      "Three additional steps. (1) Identify life-safety loads BEFORE isolation — interview the customer / care manager / clinical lead; check for oxygen concentrators, suction pumps, electric beds, mobility lifts, dialysis equipment. (2) Brief the customer / clinical staff that the affected circuit will be off; agree alternative arrangements (battery backup, manual lift operation, transfer of patient if needed). (3) Minimise the outage window; do the work efficiently; communicate during the work if delays occur. The customer's regulatory exposure (CQC for care homes, NHS for hospitals) makes life-safety circuit isolation a multi-stakeholder coordination, not a unilateral electrician decision.",
      "The BUS is the current main UK government grant for low-carbon heating retrofits — currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and lower amounts toward biomass boilers in eligible properties. The grant is administered by Ofgem and paid to the MCS-certified installer who passes it through to the customer as a price reduction. Eligible properties: existing dwellings (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC. The grant has been extended several times and is currently confirmed through the late 2020s.",
      "On a TN-C-S supply the PEN conductor combines neutral and protective earth between the substation and the cut-out. If the PEN breaks open between the substation and the property, the property's earthing rises toward line voltage depending on the load balance on neighbouring properties on the same PEN. For an EV on a driveway, the car body sits at the elevated PME potential while the surrounding ground (concrete, soil, gravel) stays at true earth potential — the touch-voltage between the car body and the ground can be lethal.",
      "Five-yearly EICR (Electrical Installation Condition Report) covering the entire fixed electrical installation, including any PV, EV chargers, heat pump supplies, battery storage circuits and MVHR supplies that have been added. Landlord must provide the EICR to tenants and to the local authority on request. Any C1 (immediate danger) or C2 (potentially dangerous) findings must be remediated within 28 days. Environmental tech additions trigger an updated EICR; they don't escape the regime. The Regulations apply to private rented properties in England; equivalents in the devolved nations.",
    ],
    correctAnswer: 1,
    explanation:
      "BUS is the de facto subsidy that makes heat-pump retrofit financially competitive with fossil-fuel replacement for many UK households. The MCS sign-off is the gateway to the grant. As the L3 electrician on a BUS-funded install you don't claim the grant yourself but your work has to support the MCS install pack that triggers it.",
  },
  {
    id: 6,
    question:
      'What is the Smart Export Guarantee (SEG) and how does it apply to a domestic PV installation?',
    options: [
      "The monthly review brings together the apprentice, the employer (or supervisor) and the training provider's tutor or assessor. The review discusses progress on the apprenticeship standards, on-the-job competence, off-the-job training hours, any concerns from any side, and actions for the next month. The form is a record of the review and is part of the audit trail for the apprenticeship's compliance with the standards.",
      "An MID-compliant generation meter measures the total electrical output of the PV array. Required by Smart Export Guarantee (the supplier needs accurate metering to pay the export tariff) and increasingly by BUS / SEG-equivalent schemes for performance monitoring. At commissioning the meter is verified to read correctly (display zero before energising, increment as the inverter delivers, accumulate accurately over the first day's run). The customer can read the meter themselves to verify ongoing performance. The smart meter at the property handles the import / export reading for the supplier.",
      "SEG is a regulated payment scheme requiring electricity suppliers to pay domestic generators for electricity exported to the grid. Replaced the Feed-in Tariff (FiT) which closed to new entrants in 2019. SEG tariffs vary by supplier (typically 5-15p/kWh in 2026); customers shop around for the best rate. To qualify, the install must be MCS-certified and the meter must be capable of recording export (most modern smart meters are). The customer signs up for SEG with their chosen supplier; it isn't automatic.",
      "(1) Strict liability — pollution incidents are offences regardless of intent; (2) duty of care under EPA 1990 s.34 + the Polluter Pays principle; (3) MHSWR Reg 14 (employee duty to report shortcomings); (4) operator's environmental permit conditions; (5) reputational and commercial consequences of an undetected pollution event downstream; (6) personal liability under HASAWA s.7 if the environmental hazard also creates a worker safety hazard.",
    ],
    correctAnswer: 2,
    explanation:
      "SEG is the current export-payment mechanism for domestic PV. The MCS sign-off is the gateway, the smart meter is the measurement, the supplier is the payer. Customer-facing conversations should mention SEG eligibility — without it the customer's payback calculation is wrong by the export value.",
  },
  {
    id: 7,
    question:
      'Where does the Code for Sustainable Homes sit in the regulatory framework?',
    options: [
      "BUS is the UK government grant scheme that contributes a fixed amount (currently £7,500) toward the cost of replacing a fossil-fuel boiler with a heat pump or biomass boiler. The customer applies via an MCS-certified installer who handles the application paperwork. Eligibility requires the install to be MCS-certified, the property to meet basic insulation standards (loft and cavity wall insulation where applicable), and the system to be designed per MCS MIS 3005. The grant does not change the electrical install — Section 753 (where applicable), general BS 7671, F-Gas boundary still apply. The L3 apprentice's wiring scope is unaffected; the customer's financial decision often is grant-dependent.",
      "S-type (or 'selective time-delayed') RCD has a built-in delay before tripping (typically 100–300 ms intentional delay). Used UPSTREAM of standard 30 mA RCDs for selectivity — the standard RCD trips on a downstream fault before the S-type does, so only the affected sub-circuit loses supply. Common application: TT installation main switch (S-type 100 mA) feeding sub-DBs with 30 mA RCDs on individual circuits. Also: TN-C-S installation with EV charger has S-type 100 mA upstream of EV charger to provide additional protection without nuisance-tripping on the EV's own RCM. Marked 'S' on the device label.",
      "Load management is doing its job. The CT clamp on the main supply detects the rising property total when the heat pump enters defrost cycle or fast-heat mode (drawing 3-7 kW) and the charger throttles its own draw to keep the total below the configured limit (typically the main-fuse rating). This is the design intent — better to throttle the charger temporarily than to trip the cut-out. The customer should be briefed on this at handover so the slowdown is not interpreted as a fault.",
      "The Code for Sustainable Homes was a non-mandatory sustainability rating system (1 to 6 stars) for new-build dwellings, used between 2007 and 2015 in England. It was withdrawn for new applications in March 2015 and replaced by enhanced Part L of the Building Regulations and (for higher-rated developments) by local-authority-specific sustainability requirements. You may still meet the Code referenced on older properties (a Code Level 4 or Level 5 home from 2010-2014 will have been built to Code spec) but it isn't the current standard for new applications.",
    ],
    correctAnswer: 3,
    explanation:
      "The Code is largely historical now in England — replaced by enhanced Part L. The 2357 Unit 602 syllabus references it by name (AC 1.4) because the qualification text pre-dates the withdrawal. As an apprentice in 2026 you should recognise the Code by name and explain its historical role, but you'll meet Part L (and Future Homes Standard) as the live regulators on current work.",
  },
  {
    id: 8,
    question:
      'What\'s the role of Local Authority Building Control in an environmental technology install?',
    options: [
      "Building Control is the local-authority enforcement of the Building Regulations. For most environmental tech installs the route is via a competent-person scheme (the installer's firm is registered with NICEIC / NAPIT / similar, and self-certifies the work) — Building Control is notified by the scheme but doesn't visit. For non-notifiable work (e.g. some maintenance) Building Control isn't involved. For installs that fall outside competent-person schemes, or for major works, Building Control may inspect on-site. The customer receives a Building Regs compliance certificate — either from the competent-person scheme or from Building Control directly.",
      "Research suggests neurodivergence — dyslexia, ADHD, and autism — may be more common in trade roles than the general population. Some studies suggest dyslexia at materially higher rates in trade and creative industries (the visual-spatial reasoning associated with dyslexia is often a strength in hands-on work). ADHD and autism prevalence in the trade is also frequently reported as elevated. The Equality Act 2010 reasonable-adjustments duty (s.20) applies where the condition has a substantial and long-term effect, and Sub 5.2 covers the practical adjustments in detail.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit / meter, at the main isolation, at the inverter and at the DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
    ],
    correctAnswer: 0,
    explanation:
      "The competent-person scheme route is the normal mechanism. The customer doesn't typically deal with Building Control directly — they get the compliance certificate from the installer's scheme. The 2357 Unit 602 syllabus AC 3.3 specifically references Local Authority Building Control because some major environmental tech projects (e.g. commercial-scale hydro, large biomass boilers) bypass the competent-person route and go directly to LABC.",
  },
];

const faqs = [
  {
    question: "If MCS isn't legally required, why is everyone obsessed with it?",
    answer:
      "Because MCS is the gateway to most of the financial incentives. The Boiler Upgrade Scheme grant requires MCS-certified installation. The Smart Export Guarantee requires MCS-certified installation for the customer to claim export payments. Most manufacturer warranties require MCS-certified installation. The Renewable Heat Incentive (closed 2022) and the Feed-in Tariff (closed 2019) historically required MCS too. So while you can technically install non-MCS, the customer almost always loses money by doing so. In practice MCS-certified install is the default, and non-MCS is the exception.",
  },
  {
    question: "Which environmental tech installs are notifiable under Part P?",
    answer:
      "Almost all of them in domestic property. PV: yes (new circuits). EV charging: yes. Heat pump: yes (new dedicated circuit). Battery storage: yes. MVHR: typically yes (new dedicated circuit). Biomass boiler: usually yes (new dedicated circuit for the controls and pump). Wind / hydro: yes. The general rule for Part P notifiability: any new circuit, consumer unit work, or work in a special location (bathroom etc.) is notifiable. Most environmental tech adds a new circuit, so most environmental tech is notifiable. The competent-person scheme handles the notification for the installer's firm.",
  },
  {
    question: "What's the Permitted Development position for ASHP outdoor units?",
    answer:
      "ASHP is generally Permitted Development in England (and broadly similar in the devolved nations) subject to MCS 020 sound-assessment compliance, distance from boundary, and not being installed on a flat roof or on the principal elevation facing a highway. Where MCS 020 isn't met or the install is in a conservation area / on a listed building, full planning permission is required. The MCS-certified installer runs the MCS 020 check at design stage. The customer doesn't normally need to apply for planning unless one of the exclusions applies.",
  },
  {
    question: "Does the customer's EPC need to be updated after an environmental tech install?",
    answer:
      "Yes for major work. Adding PV, a heat pump or insulating the property changes the SAP rating; the EPC should be re-issued to reflect the new performance. The certified installer normally arranges this as part of the handover pack. Mortgage lenders, insurers and future buyers refer to the EPC; an out-of-date EPC understates the property's actual performance. EPCs are valid for 10 years from issue.",
  },
  {
    question: "What happens if I install non-MCS — is there a legal consequence?",
    answer:
      "No legal consequence to the install itself (assuming Part P, BS 7671 and Building Regs are satisfied). The consequence is to the customer: no BUS grant, no SEG export payments, manufacturer warranty likely void. As the L3 electrician you can install non-MCS and the install can be safe and compliant — but you owe the customer an honest conversation about what they're giving up. Most customers, when informed, opt for the MCS-certified route.",
  },
  {
    question: "How does the regulatory framework differ between England, Scotland, Wales and Northern Ireland?",
    answer:
      "Building Regulations are devolved — England, Scotland, Wales and Northern Ireland each have their own. The structure is similar but the detailed targets differ. Scotland's equivalent of Part L is Section 6 of the Scottish Technical Standards. Wales has its own version of Part L within its Building Regulations. Northern Ireland has Part F. MCS is UK-wide. BS 7671 is UK-wide (and Channel Islands / Isle of Man). ENA G98/G99 is UK-wide. Future Homes Standard is England's scheme; the devolved nations have their own equivalents on similar timescales. As the L3 electrician working across borders, check the local Building Regulations equivalent.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 1"
            title="Building Regulations Part L + MCS framework"
            description="The regulatory framework for environmental technology systems — Building Regs Part L (energy), Future Homes Standard, MCS Code and Installation Standards, Boiler Upgrade Scheme, Smart Export Guarantee. Where each rule sits and what it actually requires."
            tone="emerald"
          />

          <TLDR
            points={[
              "Building Regulations Part L (Conservation of Fuel and Power) is the legal framework for energy efficiency in buildings. Compliance demonstrated via SAP (dwellings) or SBEM (non-domestic). Environmental tech is increasingly the standard route to compliance.",
              "Future Homes Standard tightens Part L for new-build from 2025 — effectively rules out fossil-fuel boilers in new-build, normalises heat pump + PV + MVHR + smart controls.",
              "MCS is not legally required to install — it's the funding gateway (Boiler Upgrade Scheme grant for heat pumps, Smart Export Guarantee for PV export). Manufacturer warranties also typically require MCS.",
              "Building Regs Part P makes most environmental tech installs notifiable. The competent-person scheme route (NICEIC, NAPIT) handles notification on the installer's behalf.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify Part L of the Building Regulations as the energy-efficiency framework for buildings, and state how environmental technology systems contribute to Part L compliance via the SAP / SBEM calculation.",
              "Recognise the Future Homes Standard as the upcoming tightening of Part L for new-build dwellings.",
              "Distinguish MCS (funding gateway and quality scheme) from the legal regulatory framework (Building Regs, BS 7671). Identify the Boiler Upgrade Scheme and Smart Export Guarantee as the current main MCS-gated incentives.",
              "Identify Building Regulations Part P as the safety regulator for domestic electrical work and recognise that most environmental tech installs are notifiable under Part P.",
              "Identify the technology-specific MCS Installation Standards (MIS 3001-3012) and their respective scopes.",
              "Recognise the role of Local Authority Building Control and the competent-person scheme route to Part P / Part L sign-off.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Building Regulations Part L — the legal floor</ContentEyebrow>

          <ConceptBlock
            title="Part L is the energy-efficiency regulator for buildings"
            plainEnglish="Part L of the Building Regulations (Conservation of Fuel and Power) sets minimum energy-performance standards for new and refurbished buildings in England (with equivalents in the devolved nations). Compliance is demonstrated through a calculation methodology — SAP for dwellings, SBEM for non-domestic. Successive Part L revisions have tightened the targets, pushing more environmental tech into the standard build specification."
            onSite="On a new-build site or major refurbishment you'll see the Part L compliance pack — heat-loss calc, SAP score, SAP recommendations, contribution from environmental tech (PV credits, heat pump SCOP, MVHR efficiency). The MCS-certified designer typically produces the environmental tech contribution; the SAP assessor compiles the overall compliance pack."
          >
            <p>
              How environmental tech contributes to Part L compliance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV</strong> — generation credits in the SAP calculation reduce the
                regulated CO₂ emission rate, helping the dwelling beat the Target Emission
                Rate (TER).
              </li>
              <li>
                <strong>Heat pumps</strong> — lower regulated CO₂ per kWh of heat than
                fossil-fuel boilers, particularly as the grid carbon intensity falls.
              </li>
              <li>
                <strong>MVHR</strong> — reduces ventilation heat losses in airtight
                buildings, contributing to the fabric energy efficiency score.
              </li>
              <li>
                <strong>Smart controls</strong> — load-shedding / demand-response capability
                gives a (modest) SAP credit.
              </li>
              <li>
                <strong>Fabric measures</strong> — insulation, glazing, airtightness — the
                largest single SAP contribution in most dwellings, and the foundation that
                makes other measures effective.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010, Approved Document L (Conservation of Fuel and Power)"
            clause={
              <>
                Approved Document L sets out the methodology for demonstrating Part L
                compliance and the minimum standards for fabric, services and on-site
                generation. For dwellings, SAP is the assessment methodology and the dwelling
                must meet a Target Emission Rate (TER) and a Target Fabric Energy Efficiency
                (TFEE) calculated for the specific design.
              </>
            }
            meaning={
              <>
                Approved Document L is the live document for Part L compliance — different
                editions apply for different commencement dates, so the install pack needs
                to use the right version. The Future Homes Standard editions (expected
                phased in from 2025) tighten the targets significantly. As the L3 electrician
                you don&apos;t run the SAP yourself, but you should recognise that the
                installer&apos;s design pack feeds into a regulated compliance calculation.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L (paraphrased from the published Approved Document available via gov.uk)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>MCS — the funding gateway and quality scheme</ContentEyebrow>

          <ConceptBlock
            title="MCS is not a regulator — it's a funding gateway"
            plainEnglish="The Microgeneration Certification Scheme (MCS) is a non-statutory competence and quality scheme administered by MCS Service Co. Installers join the scheme, pay annual membership, and submit installs for sign-off against the relevant Installation Standard (MIS). Customers who use MCS-certified installers can access funding incentives — currently the Boiler Upgrade Scheme grant for heat pumps and the Smart Export Guarantee for PV export. Most manufacturer warranties also require MCS-certified installation."
            onSite="The MCS-certified installer is the named accountable person on the install pack. As an apprentice on the install you carry out the work to the certified installer's design and contribute to the install record, but you don't sign off the MCS pack yourself unless you're personally MCS-certified for the technology in question."
          >
            <p>
              The MCS Installation Standards by technology:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MIS 3001</strong> — Solar thermal hot water systems
              </li>
              <li>
                <strong>MIS 3002</strong> — Solar PV systems
              </li>
              <li>
                <strong>MIS 3003</strong> — Small wind turbine systems
              </li>
              <li>
                <strong>MIS 3004</strong> — Biomass boilers
              </li>
              <li>
                <strong>MIS 3005</strong> — Heat pumps (ASHP, GSHP, water-source)
              </li>
              <li>
                <strong>MIS 3006</strong> — Biomass stoves
              </li>
              <li>
                <strong>MIS 3007</strong> — EV chargepoints (selected aspects; not the
                primary EV regulator)
              </li>
              <li>
                <strong>MIS 3008</strong> — Small hydro systems
              </li>
              <li>
                <strong>MIS 3012</strong> — Battery storage systems
              </li>
            </ul>
            <p>
              All MCS Installation Standards reference BS 7671 explicitly for the electrical
              detail. MCS doesn&apos;t replace BS 7671; it adds installer-quality and
              consumer-protection requirements on top.
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

          <ContentEyebrow>The Boiler Upgrade Scheme</ContentEyebrow>

          <ConceptBlock
            title="The current main grant for heat-pump retrofit"
            plainEnglish="The Boiler Upgrade Scheme (BUS) is the UK government's grant for low-carbon heating retrofits. Currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and £5,000 toward a biomass boiler in eligible properties. Administered by Ofgem, paid to the MCS-certified installer who passes it through as a price reduction to the customer. Replaced the Renewable Heat Incentive (RHI) which closed in 2022."
            onSite="The grant requires: the customer's property to be an existing dwelling (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC; the installer to be MCS-certified for the relevant technology; the install to be signed off against the relevant MIS standard. The certified installer applies for the grant on the customer's behalf via the Ofgem portal. As an apprentice on a BUS-funded install your work supports the MCS install pack but you don't apply for the grant."
          >
            <p>
              The customer-facing logic:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                BUS is what makes heat-pump retrofit financially competitive with fossil-
                fuel replacement for many UK households.
              </li>
              <li>
                Without MCS the customer can&apos;t access BUS — and the £7,500 difference
                usually swings the install economics.
              </li>
              <li>
                The grant is currently confirmed through the late 2020s (with periodic
                budget renewals).
              </li>
              <li>
                Eligibility requires no outstanding insulation recommendations on the EPC —
                which means fabric upgrades may be needed before the grant can be claimed.
                The MCS-certified installer guides the customer through this.
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

          <ContentEyebrow>The Smart Export Guarantee</ContentEyebrow>

          <ConceptBlock
            title="Payment for exported PV / wind / hydro generation"
            plainEnglish="The Smart Export Guarantee (SEG) requires electricity suppliers above a customer threshold to offer a tariff for electricity exported to the grid by domestic generators. Replaced the Feed-in Tariff (FiT) which closed to new entrants in 2019. SEG tariffs vary by supplier (5-15p/kWh in 2026); customers shop around. To qualify the install must be MCS-certified and the meter must be capable of recording export."
            onSite="As the L3 electrician on a PV install, the SEG eligibility check is part of the customer handover. The meter must be smart-meter-capable of separate import and export registers. The MCS sign-off paperwork is the gateway to the customer signing up with their chosen supplier. SEG is the financial argument for sizing PV slightly above immediate consumption — the surplus is paid for, not lost."
          >
            <p>
              Practical SEG considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Tariff rates vary widely between suppliers — the customer should shop
                around. Some suppliers offer enhanced rates for customers who also import
                from them (bundled offers).
              </li>
              <li>
                The customer signs up for SEG with their chosen supplier; it isn&apos;t
                automatic. The MCS install pack provides the supporting documentation.
              </li>
              <li>
                Smart meter required — older import-only meters can&apos;t measure export.
                The DNO / supplier arranges meter replacement if required.
              </li>
              <li>
                Some installs use a battery primarily to maximise self-consumption (avoiding
                the modest SEG tariff in favour of the higher avoided-import savings).
                Tariff vs avoided-import is the financial calculation.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Building Regs Part P and notifiable work</ContentEyebrow>

          <ConceptBlock
            title="Most environmental tech installs are notifiable under Part P"
            plainEnglish="Building Regulations Part P (Electrical Safety in Dwellings) requires certain types of electrical work in dwellings to be notified to Building Control — either directly or via a registered competent-person scheme (NICEIC, NAPIT, ELECSA, Stroma, etc.). Most environmental tech installs add new circuits and therefore trigger Part P notification. The competent-person scheme route handles notification on the installer's behalf."
            onSite="As the L3 electrician on the install you work to the certified-installer's design and complete the BS 7671 inspection and testing. The notification is handled by the firm's competent-person scheme registration. The customer receives a Building Regs compliance certificate from the scheme — typically posted within 30 days of the install."
          >
            <p>
              Notifiable work that environmental tech typically triggers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New circuits</strong> — PV inverter circuit, EV charging circuit,
                heat-pump dedicated radial, MVHR supply, biomass controls supply, battery
                storage circuit. All notifiable.
              </li>
              <li>
                <strong>Consumer unit work</strong> — relocating, extending or replacing the
                consumer unit. Notifiable.
              </li>
              <li>
                <strong>Special locations</strong> — work in bathrooms (Part 7 special
                locations) is notifiable.
              </li>
              <li>
                <strong>Non-notifiable</strong> — like-for-like socket replacement on an
                existing circuit, replacing a fitting (no circuit change). Mostly
                housekeeping work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>SAP and SBEM — the calculation methodologies</ContentEyebrow>

          <ConceptBlock
            title="SAP for dwellings, SBEM for non-domestic — the engines behind Part L"
            plainEnglish="SAP (Standard Assessment Procedure) is the government&apos;s methodology for calculating the energy and carbon performance of dwellings. SBEM (Simplified Building Energy Model) does the same job for non-domestic buildings. Both produce a score against a benchmark; both produce an EPC rating (A-G) for the customer. Both are run by an accredited assessor — not by the L3 electrician — but the inputs come from the design pack including the environmental technology contribution."
            onSite="The L3 apprentice does not run a SAP calc but should recognise the inputs the install contributes. Heat pump SCOP, PV kWp and orientation, MVHR efficiency, smart controls capability, fabric U-values, air permeability all feed in. The output is the dwelling&apos;s Dwelling Emission Rate (DER, kgCO2 per m2 per year) and Target Emission Rate (TER, set by Part L per the design specification). DER must beat TER for compliance. The Future Homes Standard reduces TER significantly, effectively requiring environmental tech to hit it."
          >
            <p>
              SAP / SBEM key concepts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DER (Dwelling Emission Rate)</strong> — calculated CO2
                emissions per m2 per year for the actual design.
              </li>
              <li>
                <strong>TER (Target Emission Rate)</strong> — the maximum allowable,
                set by Part L for the type and design.
              </li>
              <li>
                <strong>FEE (Fabric Energy Efficiency)</strong> — fabric heat-loss
                metric independent of services. Future Homes Standard introduces a
                minimum FEE to stop fabric being undersized in favour of services.
              </li>
              <li>
                <strong>Primary energy</strong> — kWh of source energy per kWh
                delivered. Future Homes Standard adds a primary-energy ceiling
                alongside the carbon target.
              </li>
              <li>
                <strong>EPC rating</strong> — A-G banding presented to the customer.
                Built from SAP score; required at sale or rent of any dwelling.
              </li>
              <li>
                <strong>Installer&apos;s contribution</strong> — the design pack
                including heat pump SCOP, PV array spec and orientation, MVHR
                efficiency, smart controls capability all feed in.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Devolved-nation regulatory differences</ContentEyebrow>

          <ConceptBlock
            title="Building Regs differ across the four UK nations — recognise the framework where you are"
            plainEnglish="Building Regulations are devolved. England has Approved Documents L and P. Wales has its own Approved Documents L and P, similar but not identical. Scotland has Building Standards (Section 6 covers energy, Section 4 covers electrical safety) administered by Local Authority Building Standards. Northern Ireland has Technical Booklets (F covers energy, P covers electrical safety, equivalent to England&apos;s Part P). The MCS scheme is UK-wide; the Boiler Upgrade Scheme is Great Britain only (Northern Ireland has separate funding via the Northern Ireland Sustainable Energy Programme)."
            onSite="The L3 apprentice working across the four nations should recognise the framework name and where the rule sits, even if the technical content is broadly similar. The MCS-certified designer applies the local rules; the apprentice executes the install. Documentation differs — in Scotland the Building Standards completion certificate replaces the Building Regs Part P compliance certificate; in Wales the regs are Welsh-language as well as English. Smart Export Guarantee applies UK-wide. Renewables Obligation applies to commercial-scale generation."
          >
            <p>
              The four-nation regulatory map:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>England</strong> — Approved Document L (energy), Approved
                Document P (electrical safety in dwellings). Boiler Upgrade Scheme.
                Smart Export Guarantee.
              </li>
              <li>
                <strong>Wales</strong> — Welsh equivalents of Approved Documents L and
                P. Boiler Upgrade Scheme. Smart Export Guarantee.
              </li>
              <li>
                <strong>Scotland</strong> — Building Standards Section 6 (energy),
                Section 4 (electrical safety). Local Authority Building Standards
                completion certificate. Home Energy Scotland funding alongside Boiler
                Upgrade Scheme.
              </li>
              <li>
                <strong>Northern Ireland</strong> — Technical Booklets F (energy) and
                P (electrical safety). Northern Ireland Sustainable Energy Programme
                instead of Boiler Upgrade Scheme. Smart Export Guarantee.
              </li>
              <li>
                <strong>UK-wide</strong> — MCS scheme, BS 7671, ENA G98 / G99,
                F-Gas Regulations, OZEV Smart Charge Points Regulations 2021.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Future Homes Standard and the heat-pump market trajectory</ContentEyebrow>

          <ConceptBlock
            title="FHS plus Clean Heat Market Mechanism are pushing the trajectory toward 600,000 heat pumps a year by 2028"
            plainEnglish="The Future Homes Standard tightens Part L for new-build dwellings to a level effectively requiring heat pumps and PV as standard. The Clean Heat Market Mechanism (CHMM) places obligations on boiler manufacturers to sell a rising proportion of heat pumps each year, backed by financial penalties for missing the target. Together these measures aim to grow UK domestic heat pump installations from ~60,000 in 2023 to ~600,000 per year by 2028."
            onSite="For the L3 apprentice this is the single biggest career-relevant trend. The volume of environmental tech work is going to grow significantly across the rest of the 2020s. The apprentice who treats Unit 301 as serious foundation, layers the MCS standalone qualifications (2399 PV, 2919 ASHP, 3012 BESS, 2921 EV) on top, and develops competence in integrated installs is going to be in high demand. The apprentice who treats it as a tick-box overview unit will have to catch up later. The market trajectory is clear; the regulatory direction is clear; the apprentice&apos;s career planning should reflect that."
          >
            <p>
              The headline policy and market drivers shaping 2026-2030:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Future Homes Standard</strong> — phased in from 2025 for
                new-build. Effectively requires heat pumps + PV + low-carbon
                services. Eliminates fossil-fuel boilers from new-build.
              </li>
              <li>
                <strong>Clean Heat Market Mechanism</strong> — boiler manufacturers
                obligated to sell rising proportion of heat pumps. Backed by financial
                penalties. Aims to drive market scale.
              </li>
              <li>
                <strong>Boiler Upgrade Scheme</strong> — currently £7,500 grant
                toward heat pump retrofit. Confirmed through 2028. Drives
                retrofit volume.
              </li>
              <li>
                <strong>Phase-out of new fossil-fuel boiler installations</strong> —
                target of 2035 for off-gas-grid, with broader trajectory toward
                phasing out gas boilers in subsequent years.
              </li>
              <li>
                <strong>EV mandate</strong> — Zero Emission Vehicle mandate requires
                rising proportion of new car sales to be electric. Drives EV charging
                install volume.
              </li>
              <li>
                <strong>Network reinforcement</strong> — DNOs investing in network
                capacity to absorb the heat pump and EV load. Periodic free supply
                upgrades for low-carbon installs in some areas.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Telling the customer 'MCS is just paperwork — let's skip it'"
            whatHappens={
              <>
                Apprentice or unscrupulous installer tells the customer MCS &quot;isn&apos;t
                really needed&quot; and offers a cheaper non-MCS install. Customer accepts.
                Install completes; customer applies for BUS grant — refused because the
                installer isn&apos;t MCS-certified. Customer applies for SEG — supplier
                refuses because the install lacks MCS sign-off. Customer&apos;s
                manufacturer warranty is voided. The £1,000-2,000 the customer thought
                they&apos;d saved by going non-MCS is dwarfed by the £7,500 BUS grant
                they&apos;ve just lost.
              </>
            }
            doInstead={
              <>
                Be honest with the customer about what MCS gives them and what it doesn&apos;t.
                MCS is not a legal requirement to install, but it is the gateway to the
                grants and incentives that make the install financially viable for most
                customers. A non-MCS install is technically possible but the customer
                almost always loses money on the deal. The right framing is &quot;MCS-
                certified install for the financial benefits + the manufacturer warranty;
                non-MCS only in unusual cases where the customer specifically declines
                grants and warranties&quot;.
              </>
            }
          />

          <CommonMistake
            title="Confusing Part L (energy) with Part P (electrical safety)"
            whatHappens={
              <>
                Apprentice tells the customer &quot;Part P covers energy efficiency&quot;.
                Customer is confused because the EPC says nothing about Part P. The two
                regulations cover entirely different things and the apprentice has
                conflated them.
              </>
            }
            doInstead={
              <>
                Memorise the split: Part L is energy efficiency (SAP / SBEM, fabric
                standards, services efficiency, on-site generation credits). Part P is
                electrical safety in dwellings (notifiable work, competent-person scheme,
                Building Regs compliance certificate). Both apply to most environmental tech
                installs but they regulate different things. The customer&apos;s EPC
                reflects Part L; the Building Regs compliance certificate reflects Part P.
              </>
            }
          />

          <Scenario
            title="Heat-pump retrofit — what the customer needs to know about the regulatory pack"
            situation={
              <>
                You&apos;re working on a BUS-funded ASHP retrofit. The MCS-certified
                installer has handled the design, the MCS application, the BUS grant
                application and the Building Regs Part L compliance pack. You&apos;ve
                completed the electrical first-fix and the F-Gas engineer is in tomorrow
                for the refrigerant work. The customer asks &quot;so what do I actually
                get at the end of all this paperwork?&quot;.
              </>
            }
            whatToDo={
              <>
                Run the customer through the handover pack they&apos;ll receive: (1) MCS
                install certificate — the formal sign-off that triggers the BUS grant and
                supports the manufacturer warranty; (2) BUS grant payment confirmation —
                deducted from the install invoice as a price reduction; (3) Building Regs
                Part P compliance certificate — from the firm&apos;s competent-person
                scheme, posted within 30 days; (4) updated EPC reflecting the new heat
                pump (typically arranged by the installer); (5) electrical installation
                certificate (EIC) for the new circuit; (6) heat-pump commissioning records,
                SCOP estimate, manufacturer&apos;s instructions, customer operating guide.
                Keep the pack safe — needed for future house sale, mortgage, insurance.
              </>
            }
            whyItMatters={
              <>
                The handover pack is what the customer actually keeps. The work you and the
                F-Gas engineer and the certified installer have done all converges into
                that pack. A future buyer / surveyor / insurer will ask to see it.
                Without it the customer can&apos;t prove the install was done to standard.
                Walking the customer through the pack at handover is the moment the trust
                in the install is built.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (PV) extensive revision"
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
                Building Regs Part L drives the demand for PV through the SAP target rate; BS
                7671 Section 712 governs the electrical installation of the PV that satisfies
                that demand. They sit alongside one another — Part L for energy / SAP credit,
                Section 712 for safe installation. A4:2026 reset the Section 712 wording.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 (EV charging) significant changes"
            clause={
              <>
                Section 722 of Part 7 of BS 7671:2018+A4:2026 covers electric vehicle charging
                installations. The published text indicates that this section contains
                significant changes to the Regulation(s) applicable to EV charging
                installations; installers and certifiers shall consult Section 722 for the
                updated requirements and obligations.
              </>
            }
            meaning={
              <>
                The OZEV Smart Charge Points Regulations 2021 govern what may be sold; BS 7671
                Section 722 governs what may be installed and how. A4:2026 brought significant
                changes to PME / TN-C-S handling that the L3 electrician needs to be aware of
                even if the MCS-certified installer makes the final design call.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Building Regulations Part L (Conservation of Fuel and Power) is the legal energy-efficiency framework. Compliance via SAP / SBEM. Environmental tech contributes to compliance.",
              "Future Homes Standard tightens Part L for new-build from 2025 — effectively rules out fossil-fuel boilers in new-build, normalises heat pump + PV + MVHR.",
              "MCS is not legally required to install — it's the funding gateway. Boiler Upgrade Scheme grant (£7,500 ASHP / GSHP) and Smart Export Guarantee both require MCS sign-off.",
              "MCS Installation Standards (MIS 3001-3012) cover each technology family. All reference BS 7671 explicitly for the electrical detail.",
              "Building Regs Part P (Electrical Safety in Dwellings) makes most environmental tech installs notifiable. Competent-person scheme route (NICEIC, NAPIT) handles notification.",
              "Part L (energy) and Part P (electrical safety) are different regulations. Both apply to most environmental tech installs but regulate different things.",
              "The SAP calculation is the methodology behind Part L compliance for dwellings. PV, heat pumps, MVHR, smart controls and fabric all feed into the SAP score.",
              "The customer's handover pack — MCS certificate, BUS confirmation, Part P compliance certificate, updated EPC, EIC, commissioning records — is what they keep. Future house sale / mortgage / insurance depends on it.",
            ]}
          />

          <Quiz title="Building Regs + MCS framework — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 MVHR, wind, micro-CHP overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 BS 7671 712/722/753 + G98/G99
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
