/**
 * Module 2 · Section 2 · Subsection 3 — BS 7671 Section 753 (heating systems) deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 (regulations and standards)
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 2.1 (regulations) and AC 2.2 (statutory framework);
 * 2357 Unit 312 ELTP02 / AC 2.1 (regulatory framework for environmental technology systems).
 *
 * Note: Unit 301 is overview-level. This subsection covers the BS 7671 Section 753 framework
 * for heating cables and embedded heating systems, plus the broader regulatory map for
 * heat-pump electrical work — F-Gas Regulations boundary, MCS MIS 3005 and Building Regs
 * Part L compliance.
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
  'BS 7671 Section 753 (heating) deeper (2.3) | Level 3 Module 2.2.3 | Elec-Mate';
const DESCRIPTION =
  "BS 7671 Section 753 (heating systems) and the broader regulatory map for heat-pump electrical work at recognition level for the L3 electrician — heating cables and embedded systems, the F-Gas Regulations boundary, MCS MIS 3005 install standard, Building Regs Part L compliance and the apprentice's electrical scope on a heat pump install.";

const checks = [
  {
    id: "l3-m2-s2-sub3-section-753",
    question:
      "What does BS 7671 Section 753 actually cover and where does it apply on a heat pump install?",
    options: [
      "Section 753 covers heating cables and embedded heating systems — the electrical heating elements buried in floors, walls, ceilings or pipework. It applies to underfloor electric heating, trace heating on pipework (frost protection), heated mirrors / heated handrails. On a heat pump install, Section 753 applies if the wet system includes any electric trim heaters or electric pre-heat / boost elements; it does not cover the heat pump itself, which falls under general BS 7671 plus manufacturer's instructions plus MCS MIS 3005. The refrigerant circuit is not BS 7671 territory at all — it is F-Gas Regulations.",
      "Significantly. (1) New components have manufacturer warranty (Hager 5 years on RCBOs, Schneider 5–10 years on Acti9, BG 10 years on accessories). Repaired components typically don't carry the warranty into the repair life. (2) Some manufacturers explicitly void warranty if the device has been opened / repaired — repairs DIY void the cover. (3) For domestic appliances, the customer's home insurance / appliance warranty may cover replacement but not repair, or vice versa. The L3 apprentice should ask 'is this still under warranty?' before quoting any repair — an in-warranty issue is the manufacturer's problem, not the firm's.",
      "They allow two independent strings to run at their own MPP. A roof with both an east-facing and a west-facing slope gets one string per slope, each tracked independently — the east string MPPs in the morning, the west string MPPs in the afternoon, and the inverter combines the AC outputs. Without dual-MPPT, mixing east and west panels in one string forces a compromise MPP that wastes 10-20% of the available energy. Many domestic UK installs benefit from dual-MPPT given typical roof geometries.",
      "Unwanted conduct related to a protected characteristic (or unwanted conduct of a sexual nature) which has the purpose or effect of violating a person's dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment. The conduct doesn't have to be 'severe' to count — repeated 'banter' related to race, sex, disability or another protected characteristic can be harassment if it has the proscribed effect on the recipient.",
    ],
    correctIndex: 0,
    explanation:
      "Section 753 is specifically about embedded electrical heating elements. On a typical air-source heat pump install in the UK, Section 753 may or may not apply depending on whether any electric heating elements are integrated into the wet system. The heat pump itself is a piece of equipment with its own electrical supply — covered by general BS 7671. The refrigerant work is F-Gas-certified personnel only.",
  },
  {
    id: "l3-m2-s2-sub3-fgas",
    question:
      "What does the F-Gas Regulations mean for the L3 apprentice on a heat pump install?",
    options: [
      "EPR is the umbrella permitting framework for waste activities, water discharges, radioactive substances and certain installations in England and Wales. Anyone carrying, brokering, treating, transferring or disposing of waste needs the appropriate authorisation under EPR — typically a waste carrier registration (lower tier), a broker / dealer registration, or a full environmental permit for a treatment site. As an electrical contractor you most likely need a lower-tier waste carrier registration to lawfully transport your own controlled waste. Anyone you transfer waste to must hold their own appropriate authorisation.",
      "IT (Isolated Terra) — neutral isolated from earth (or connected via high impedance). Single earth fault doesn't cause significant fault current; alarm only. Typically used in continuous-process industries (chemical plants, hospitals), where one fault must not stop the process. TN-S (Terra Neutral Separated) — neutral and earth separately distributed from transformer; standard UK domestic / commercial older arrangement; faults clear normally via overcurrent / RCD. The L3 apprentice rarely meets IT outside specialist sites; if you're diagnosing in a hospital ITU or specialist process plant, the supply may be IT and the fault behaviour is fundamentally different.",
      "F-Gas (Fluorinated Greenhouse Gases Regulations) governs work on refrigerant circuits containing fluorinated refrigerants (R32, R290, R410A, R134a). Anyone doing refrigerant work — installing refrigerant pipework, charging the system, recovering refrigerant during service — must hold the relevant F-Gas certification (City & Guilds 2079 or equivalent). The L3 apprentice on a heat pump install does NOT do refrigerant work unless they hold separate F-Gas certification. The electrical scope (supply, isolation, controls, bonding) is BS 7671 territory and within the apprentice's scope; the refrigerant scope is F-Gas territory and requires separate certification. The two trades work alongside each other on a heat pump install.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712 plus MCS MIS 3002 plus the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property before they start touching things.",
    ],
    correctIndex: 2,
    explanation:
      "F-Gas is a hard boundary between trades. The electrician sizes the supply, fits the isolation, terminates the controls, bonds the chassis. The F-Gas-certified engineer handles every refrigerant-side activity. Crossing the line without certification is a regulatory offence and an insurance issue. Modern domestic heat pumps using R290 (propane, natural refrigerant) have less F-Gas burden but the F-Gas Regulations still apply where fluorinated refrigerants are present.",
  },
  {
    id: "l3-m2-s2-sub3-mcs-3005",
    question:
      "What does MCS MIS 3005 cover on a heat pump install and how does it relate to BS 7671?",
    options: [
      "Hazardous waste. Fluorescent tubes contain mercury vapour (typically 3–5 mg per 5-foot tube) — that's enough to make the tube a Hazardous Waste under the Hazardous Waste (England and Wales) Regulations 2005. NEVER smash on site (releases mercury vapour). Transport intact in the original sleeve or a tube-tube; route via a licensed hazardous waste carrier or a wholesaler with a tube-recycling scheme (CEF, Edmundson run these). The firm needs to hold the Consignment Note (or Hazardous Waste Annual Return registration if they generate over 500 kg / year). Disposal cost is around £1–2 per tube.",
      "MCS MIS 3005 is the installer competence and product certification standard for heat pump installations (air-source, ground-source, water-source). It covers system design (heat-loss calculation methodology, emitter sizing, SCOP estimate), product selection (eligible MCS-certified equipment), installation quality (refrigerant work by F-Gas certified personnel, electrical work to BS 7671), commissioning (flow temperature setup, control validation), and customer handover. Required for the customer to claim Boiler Upgrade Scheme grants and demonstrate quality assurance. BS 7671 covers the electrical safety side; MIS 3005 covers the broader install quality and the design competence. Both apply to most UK domestic heat pump installs.",
      "During the EFLI test the instrument briefly draws fault current through the L-E loop. That current creates a voltage drop along the CPC equal to I_test x R_CPC. Any exposed-conductive-part connected to that CPC briefly rises above true earth by that voltage. For a 25 A test current and a 0.4 Omega CPC, that\\\\'s 10 V — small but noticeable to a person touching the metalwork. The duration is brief (a few cycles) but the risk is real, especially in installations where the public can access the metalwork during testing.",
      "Three categories. (1) Smart meter / utility meter failures — internal electronic failure (the meter itself stops measuring); diagnosis: voltage on the consumer side normal, customer reports billing issues; DNO call to replace meter. (2) Sub-metering installations (kWh meters at apartment level) — internal CT failure, terminal corrosion, comms link failure to BMS. (3) Specific instrument circuits in commercial buildings — temperature sensors, level sensors, flow meters; usually low-voltage SELV but with sensitive signal levels easily disrupted by EMI from nearby high-current cables. Diagnostic approach: substitute the suspect sensor with a known-good unit; if symptom moves, the sensor was at fault.",
    ],
    correctIndex: 1,
    explanation:
      "MCS MIS 3005 is the heat pump install standard. It works alongside BS 7671 (electrical safety), F-Gas (refrigerant), Part L of the Building Regs (energy efficiency) and PAS 2035 (retrofit standard where applicable). The MCS-certified designer holds the documentation map together; the apprentice contributes the electrical scope.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the typical electrical interface for a domestic air-source heat pump?",
    options: [
      "(1) The site / customer's existing risk-assessment and method statement — what the principal contractor has identified as on-site hazards. (2) Your firm's task RAMS — the document specific to fault diagnosis at this premises, which you may need to produce or update on arrival. (3) A permit-to-work or equivalent authorisation — for commercial / industrial sites only, signed by the authorised manager, defining what you're allowed to do. Without these three you don't have a defensible position if something goes wrong, and the customer's safety policy will record you as an unauthorised worker.",
      "A dedicated final circuit from the consumer unit. Typical sizes: 32 A radial on 6 mm cable for a 5-7 kW unit; 40 A radial on 10 mm cable for a 9-12 kW unit. Type C MCB or RCBO (the high inrush from the compressor start can nuisance-trip a Type B). Local means of isolation outside near the outdoor unit. Manufacturer-specified controls cabling between outdoor unit, indoor controller and any zone valves / pumps. Bonding of the outdoor chassis where the manufacturer specifies or where it is an extraneous-conductive-part. The heat pump's nameplate gives the maximum rated current; the MCS designer specifies the cable and protective device.",
      "REPAIRABLE: cable terminations, accessory faceplates, individual lampholders, switch modules, dimmer cores, individual MCBs / RCBOs (within a CU), circuit cables (mid-run patch with junction box). REPLACEMENT-ONLY (typically): consumer units (sealed enclosures, integrated busbar), transformers and ballasts (factory-sealed), most LED drivers (sealed pots), AFDDs (electronic devices), most modern accessories (one-piece moulded). The boundary is usually 'is the failed item a single field-replaceable unit?'. Sealed devices are replacement-only; assembled devices with field-accessible components are repairable.",
      "Three criteria. (1) Safety — dead tests before live, low-energy before high-energy. (2) Discrimination — choose the test whose result will most narrow the candidate hypotheses (e.g. an IR test that distinguishes 'short circuit' from 'open circuit' is more useful than a continuity test that only distinguishes one). (3) Cost — quick tests before slow tests, free tests before tests that cost the customer (e.g. visual inspection before opening the CU). The order is safety first, then discrimination, then cost. Most efficient diagnostic path is shortest sequence of tests that distinguishes between the surviving hypotheses.",
    ],
    correctAnswer: 1,
    explanation:
      "Heat pump electrical supply is straightforward but specific. Type C protection is important because of the compressor inrush. Cable sizing follows the manufacturer's nameplate. The controls cabling is often the time-consuming part — multiple zone valves, room thermostats, weather compensation sensors, smart-home integration.",
  },
  {
    id: 2,
    question:
      "What does Building Regs Part L require for a new-build property with a heat pump?",
    options: [
      "Multiple — typically one or more CT clamps on the main supply tails (live and sometimes neutral) feeding the EV charger's load management, the battery inverter's grid-export control, the HEMS's whole-property monitoring, and sometimes the heat pump's load-shifting logic. On a fully integrated install you may have 3-4 CT clamps in or near the consumer unit, each reading the same physical conductor and feeding a different consumer of that data. The apprentice's job is to install each clamp around the correct conductor in the correct orientation per the manufacturer's instructions for each consuming device.",
      "Adding a battery changes the maximum potential export from the property and changes the inverter behaviour as seen from the network. ENA G98 (single-phase up to 16 A per phase) and G99 (above 16 A or three-phase) require the combined system to be notified. For a connect-and-notify install (G98) the installer notifies the DNO within 28 days of energising. For G99 the installer applies in advance and the DNO returns connection conditions before energising. The MCS-certified installer handles the paperwork; the apprentice should understand that the existing PV notification does not cover the added storage.",
      "Part L (Conservation of Fuel and Power) requires every new build and every notifiable refurbishment to demonstrate compliance via a SAP calculation that meets the Target Emission Rate (TER) and Target Fabric Energy Efficiency (TFEE) for the property type. A heat pump's contribution to the SAP calculation depends on its SCOP and the carbon intensity of grid electricity. Modern heat pumps in well-designed homes pass Part L comfortably. The Future Homes Standard (in force from 2025) effectively rules out fossil-fuel boilers from new-build because the SAP calculation cannot reach compliance with a gas boiler under the tightening targets. The MCS designer's SCOP estimate feeds the SAP calculation.",
      "Hazardous-area work (ATEX zones, confined spaces, working at height in remote locations, work near live HV) carries higher risk than standard work. The 'lone working' precautions of Sub 1.2 are NOT enough — the risk profile demands two-person working as default. EAWR Reg 14(c) suitable precautions and HSE INDG73 + HSG85 + Confined Spaces Regulations 1997 + Work at Height Regulations 2005 all combine to require: documented permit-to-work, named authorised person, second person stationed within sight or comms, defined rescue procedure, dedicated emergency response. L3 apprentice never works hazardous-area solo; firm policy will explicitly forbid.",
    ],
    correctAnswer: 2,
    explanation:
      "Part L is the construction-side energy regulation that drives much of the UK push toward heat pumps and electrification. Successive Part L revisions tighten the SAP target rate; the Future Homes Standard takes fossil-fuel boilers off new-build from 2025. The L3 apprentice should recognise Part L as the underlying driver behind heat pump uptake, even though the day-to-day work focuses on the BS 7671 electrical side.",
  },
  {
    id: 3,
    question:
      "What is the difference between an air-source heat pump and a ground-source heat pump from the apprentice's electrical perspective?",
    options: [
      "Treat it as 'asbestos suspect until proven otherwise'. Buildings constructed before 2000 (and refurbished before 2000) can contain asbestos in textured ceilings, insulation board, cement products, floor tiles and pipe lagging. Stop and check the asbestos register if the building has one (commercial buildings are required to have one under the Control of Asbestos Regulations 2012). For a domestic property without a register, assume suspect material is present and avoid disturbance until you can verify or arrange a survey.",
      "G98 is post-notification — install, commission, notify within 28 days. The whole transaction completes inside 28 days from commissioning. G99 is pre-application — submit the application before commissioning, wait for the DNO to model the network, receive a Connection Offer, accept the Offer (which may contain export limits or fault-level conditions), then commission. Typical G99 timeline is 4-12 weeks for a domestic system; longer for commercial. On a fast-moving install programme the G99 paperwork is usually the long pole — start it early.",
      "The EIC carries the standard schedule of inspections and schedule of test results for the new circuit(s). For a PV install that includes the DC string circuits (with DC voltages and DC IR test results), the AC isolator and AC final connection back into the consumer unit, the labelling and signage at every isolation point, and the dual-supply warning at the consumer unit. Section 712 of BS 7671 (extensively revised in A4:2026) drives the inspection items. The 'designer' / 'constructor' / 'inspector and tester' boxes on the EIC may all be the MCS-certified installer's lead engineer; signatures still have to be physically present.",
      "Both are predominantly single-phase domestic in the UK. The differences are in the install scope, not the electrical interface. Air-source has an outdoor unit on the property exterior — a single electrical supply, refrigerant pipework to the indoor cylinder/buffer, controls cabling. Ground-source has either horizontal slinky coils in trenches or vertical boreholes — much larger civils scope, ground-loop pumps that are themselves loads on the electrical supply, and an indoor unit that contains the compressor (so no outdoor unit). Electrical sizing is similar (5-12 kW typical); cable runs are different (ground-source indoor unit is fed from the CU; air-source has cable to the outdoor unit). MCS MIS 3005 covers both.",
    ],
    correctAnswer: 3,
    explanation:
      "From the apprentice's wiring perspective, ASHP and GSHP are similar — single-phase final circuit, 32-40 A typical, controls cabling. The big differences are the civils scope (boreholes / trenches for GSHP) and the indoor unit location (GSHP has compressor indoor; ASHP has compressor outdoor). MCS MIS 3005 covers both technology types.",
  },
  {
    id: 4,
    question:
      "What does PAS 2035 mean and when does it apply to a heat pump retrofit?",
    options: [
      "PAS 2035 (Publicly Available Specification — Retrofitting dwellings for improved energy efficiency) is the standard that governs domestic energy efficiency retrofit projects. It requires a 'whole-house' approach — fabric assessment, ventilation strategy, moisture risk management, and any retrofit measures (including heat pump installation) must be coordinated by a Retrofit Coordinator and designed by a Retrofit Designer. Required for grant-funded retrofits (ECO4, Boiler Upgrade Scheme in some cases, local authority schemes). Helps avoid the failure mode where a heat pump is fitted to an uninsulated leaky house and posts a poor SCOP. The MCS-certified heat pump installer works within the PAS 2035 framework on grant-funded projects.",
      "PQ analyser (Fluke 1748, Megger PQM, Dranetz HDPQ) is a long-term monitoring instrument — connect it at the supply or DB for a few days / weeks, it logs voltage, current, harmonic spectrum, transient events, sags / swells / interruptions, frequency, power factor, flicker. The multimeter shows you NOW; the PQ analyser shows you the past 7 days. Essential for diagnosing intermittent faults on commercial installations where the symptom only appears occasionally — the PQ log captures the moment of the fault and the conditions around it.",
      "A boiler drives a wet heating system — pumps hot water around radiators / underfloor circuits and a hot-water cylinder. Typical output 10-50 kW, located in a utility room or outhouse, automatic fuel feed (auger from a hopper), automatic ignition, automatic ash handling. A stove is a room heater — radiates heat directly into the room it sits in, plus optional back-boiler for some hot water. Lower output (5-15 kW typical), manual loading (logs or pellets), no automatic ash removal. Different installation regulations, different MCS standards, different customer expectations.",
      "The apprentice typically contributes the cable run from the consumer unit to the charge-point location (often a 6 mm or 10 mm meter-tails route through a wall), the supplementary bonding (where required), the supply-side termination at the consumer unit including any new RCBO or AFDD, the CT clamp installation around the supply tail, the labelling, and assists with first-fix mounting of the unit enclosure. The MCS-certified person handles the design, the OZEV-compliant unit selection, the commissioning and the regulatory paperwork (including the DNO notification under ENA G98 if export is enabled, and registration with OZEV for any grant claim).",
    ],
    correctAnswer: 0,
    explanation:
      "PAS 2035 is the 'fabric first' regulatory framework for retrofit. Its existence pushes back against the bad-practice failure mode of fitting heat pumps to unsuitable buildings. The L3 apprentice may not interact with PAS 2035 paperwork directly but should recognise its existence as part of the regulatory landscape on grant-funded retrofit projects.",
  },
  {
    id: 5,
    question:
      "Why does a heat pump typically use a Type C MCB or RCBO rather than a Type B?",
    options: [
      "Loss-of-mains (LoM) protection, commonly called anti-islanding. The inverter monitors voltage, frequency, vector shift and rate of change of frequency on the AC side. When the grid reference is lost or moves outside the permitted window defined in ENA G98 / G99, the inverter ceases to export within the specified timing. The intent is to protect DNO engineers, prevent asynchronous reclosure damage and stop a small generator attempting to support a much larger network it cannot stabilise.",
      "The compressor in a heat pump produces a substantial inrush current at start-up — typically 5-10x the steady-state running current for a fraction of a second. A Type B MCB (3-5x trip threshold) can nuisance-trip on this inrush; a Type C MCB (5-10x trip threshold) is more tolerant and is the standard recommendation. Modern inverter-driven heat pumps with soft-start typically have lower inrush than older fixed-speed units, but Type C is still the typical specification. The MCS-certified designer specifies the protective device per the manufacturer's installation manual.",
      "Reg 14(2) requires every employee to inform their employer (or any other employee with specific responsibility for safety) of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND any matter which they reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety. The duty extends to near-misses, defective safe systems of work, and any condition the employee believes presents danger.",
      "The apprentice typically contributes the cable run from the consumer unit to the charge-point location (often a 6 mm or 10 mm meter-tails route through a wall), the supplementary bonding (where required), the supply-side termination at the consumer unit including any new RCBO or AFDD, the CT clamp installation around the supply tail, the labelling, and assists with first-fix mounting of the unit enclosure. The MCS-certified person handles the design, the OZEV-compliant unit selection, the commissioning and the regulatory paperwork (including the DNO notification under ENA G98 if export is enabled, and registration with OZEV for any grant claim).",
    ],
    correctAnswer: 1,
    explanation:
      "Type C protection is standard on heat pump final circuits because of compressor inrush. Inverter-driven units with soft-start reduce the inrush but Type C is still the conservative specification. Always check the manufacturer's installation manual — some modern units are explicitly compatible with Type B; others require Type C.",
  },
  {
    id: 6,
    question:
      "What is the Boiler Upgrade Scheme (BUS) and how does it interact with the heat pump electrical install?",
    options: [
      "SECR is a statutory disclosure regime introduced in 2019 under the Companies (Directors Report) and Limited Liability Partnerships (Energy and Carbon Report) Regulations 2018. It requires large UK companies (typically meeting two of: turnover above 36 million pounds, balance sheet above 18 million pounds, or above 250 employees) to disclose their UK energy use and associated greenhouse gas emissions in their annual report. The disclosure covers scope 1, scope 2 and a defined subset of scope 3 (business travel in employee-owned vehicles), along with intensity metrics and a narrative on energy efficiency actions taken.",
      "Stop and verify before testing. Unusual supply arrangements suggest either (a) the property is genuinely TT (rural, older, or specifically designed) which may need different fault-diagnosis approach, OR (b) the customer's installation isn't what you expected from the booking (e.g. an older commercial site with three-phase supply you weren't briefed on). Either way, the test plan needs to match the actual supply. Escalate to supervisor if unsure; update the RAMS to reflect the actual installation; brief the customer if the work scope changes. Never just push ahead with the test plan you arrived with if it doesn't match what you find.",
      "BUS is the UK government grant scheme that contributes a fixed amount (currently £7,500) toward the cost of replacing a fossil-fuel boiler with a heat pump or biomass boiler. The customer applies via an MCS-certified installer who handles the application paperwork. Eligibility requires the install to be MCS-certified, the property to meet basic insulation standards (loft and cavity wall insulation where applicable), and the system to be designed per MCS MIS 3005. The grant does not change the electrical install — Section 753 (where applicable), general BS 7671, F-Gas boundary still apply. The L3 apprentice's wiring scope is unaffected; the customer's financial decision often is grant-dependent.",
      "A boiler drives a wet heating system — pumps hot water around radiators / underfloor circuits and a hot-water cylinder. Typical output 10-50 kW, located in a utility room or outhouse, automatic fuel feed (auger from a hopper), automatic ignition, automatic ash handling. A stove is a room heater — radiates heat directly into the room it sits in, plus optional back-boiler for some hot water. Lower output (5-15 kW typical), manual loading (logs or pellets), no automatic ash removal. Different installation regulations, different MCS standards, different customer expectations.",
    ],
    correctAnswer: 2,
    explanation:
      "BUS is the headline grant for domestic heat pumps in 2024-2026. Eligibility ties directly to MCS certification — the installer must hold MCS, the install must be MCS-compliant. The L3 apprentice does not touch the BUS paperwork (the MCS-certified designer handles it) but should recognise that the customer's financial decision is often grant-driven.",
  },
  {
    id: 7,
    question:
      "What labelling is required on a domestic heat pump installation per BS 7671?",
    options: [
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The DNO emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). Required by BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. The signage protects future maintainers who may not realise there's a generator on the property.",
      "The EPC should be re-issued to reflect the new performance — heat pump, PV, MVHR, insulation upgrades all change the SAP rating. The MCS-certified installer normally arranges the EPC update. An updated EPC matters for: (a) future house sale (the buyer's solicitor sees current performance); (b) mortgage applications (lenders increasingly weight EPC ratings); (c) insurance (some insurers now adjust premium for low-EPC properties); (d) BUS grant requires a valid EPC at the time of install. EPCs are valid for 10 years from issue.",
      "Significant. A south-facing roof at 30-40° pitch is the optimal UK orientation, posting 100% of reference yield. East-facing or west-facing roofs typically produce 80-85% of optimal. North-facing produces 50-65% (still positive but with much longer payback). Steeper pitches favour winter performance; shallower pitches favour summer performance. Flat roofs get an A-frame mount to set a target pitch and azimuth. The MCS Yield Calculator handles all of this — produces the kWh figure for the SAP and the customer handover.",
      "Standard Section 514 identification — the heat pump final circuit at the consumer unit clearly identified; the local isolator labelled and the location of the upstream RCBO referenced; any controls cabling identified at termination points. Where Section 753 applies (e.g. integrated trim heaters) the relevant section signage applies. The MCS-certified designer's commissioning paperwork includes a SCOP estimate, the system design parameters, and a customer-facing handover document. The label is for the customer (so they know which isolator does what), the next electrician (so they understand the install years later), and the service engineer (so they can isolate safely).",
    ],
    correctAnswer: 3,
    explanation:
      "Heat pump labelling follows the same Section 514 framework as the rest of the install. The MCS-certified designer's commissioning pack adds the SCOP estimate, design heat-loss calculation summary and handover documentation. The combination is what the customer needs to evidence the install for grant claims and warranty.",
  },
  {
    id: 8,
    question:
      "What is the apprentice's electrical scope on a typical air-source heat pump install?",
    options: [
      "First-fix supply cable from consumer unit to outdoor unit location (typically 6 mm or 10 mm radial, Type C RCBO). Local isolator outside near the outdoor unit. Controls cabling between outdoor unit, indoor cylinder/controller, any zone valves, room thermostats and weather compensation sensor. Bonding of the outdoor chassis where the manufacturer specifies or where extraneous-conductive-part criteria apply. Power and controls to any electric trim heater (Section 753 where applicable). Where the install includes smart-home integration or HEMS dispatch, Cat5e/Cat6 to the indoor controller. Commissioning of the electrical side. The refrigerant work is F-Gas-certified scope — the apprentice does not touch refrigerant pipework or do any refrigerant charging unless they hold separate F-Gas certification.",
      "Hazardous-area work (ATEX zones, confined spaces, working at height in remote locations, work near live HV) carries higher risk than standard work. The 'lone working' precautions of Sub 1.2 are NOT enough — the risk profile demands two-person working as default. EAWR Reg 14(c) suitable precautions and HSE INDG73 + HSG85 + Confined Spaces Regulations 1997 + Work at Height Regulations 2005 all combine to require: documented permit-to-work, named authorised person, second person stationed within sight or comms, defined rescue procedure, dedicated emergency response. L3 apprentice never works hazardous-area solo; firm policy will explicitly forbid.",
      "L–L (phase-to-phase) fault is a direct connection between two phases of a three-phase supply (e.g. L1 and L2). Continuity between the phases reads near zero. Fault current is high (limited only by supply + cable impedance) — typically 5–10 kA on a typical commercial supply. Operates the magnetic element of the protective device on at least one of the affected phases. The unaffected phase remains live; loads connected line-to-neutral on the unaffected phase continue working. Common cause: insulation breakdown in three-phase cable or motor windings, accidental contact between phases at a terminal block.",
      "G100 (active export limitation scheme) applies where the customer wants to install a system bigger than the DNO would otherwise accept, on the basis that an active limiter will cap exported power to a level the network can accommodate. It is a way to install (say) a 12 kWp PV array on a network that cannot accept 12 kW export, by limiting export to 3.68 kW with self-consumption and battery storage soaking up the rest. G100 sits within the broader G99 process — the DNO Connection Offer will include the G100 export limit and the limiter type-test requirement. The L3 apprentice will not run the G100 application but should recognise it as the technical mechanism behind 'oversized array, limited export' designs.",
    ],
    correctAnswer: 0,
    explanation:
      "Heat pump electrical installs are now mainstream UK domestic work. The L3 apprentice's scope is the electrical side — supply, isolation, controls, bonding, labelling. The F-Gas-certified engineer handles all refrigerant work. The MCS-certified designer holds the overall scope together. Recognising the trade boundary is a Unit 301 expectation.",
  },
];

const faqs = [
  {
    question: "Why doesn't BS 7671 cover the refrigerant side of a heat pump?",
    answer:
      "Because the refrigerant circuit is a different regulatory regime entirely. The Fluorinated Greenhouse Gases Regulations (F-Gas) govern work on circuits containing fluorinated refrigerants and require F-Gas certification for the personnel doing the work. BS 7671 is the Wiring Regulations — it covers electrical installations. The two trades work alongside each other on a heat pump install: the F-Gas certified engineer handles the refrigerant pipework and charging; the electrician handles the supply, isolation, controls and bonding. Crossing the line without certification is a regulatory offence.",
  },
  {
    question: "Does Section 753 apply to underfloor heating fed from a heat pump?",
    answer:
      "Section 753 applies to embedded electric heating cables (resistive elements buried in the floor or wall). Wet underfloor heating fed from a heat pump is not electrically heated at the floor — the heat pump's wet system circulates warm water through pipework in the floor, with the water itself heated by the heat pump compressor. Section 753 does not apply to the wet pipework. It would apply if the install includes any embedded electric heating elements (e.g. an electric boost element in a particular zone, or electric trim heaters in bathrooms).",
  },
  {
    question: "How does a heat pump's flow temperature affect its SCOP and why does the apprentice care?",
    answer:
      "Lower flow temperature gives higher SCOP — a heat pump driving an underfloor system at 35-40 degC posts a much better SCOP than the same unit driving 60 degC radiators. The MCS designer sets the flow temperature based on the emitter design and the building heat loss. The apprentice does not adjust flow temperature on commissioning — that is the MCS designer's call, set during the system commissioning. But the apprentice should understand that the flow temperature is the single biggest driver of SCOP and therefore of the customer's running cost and Part L compliance score.",
  },
  {
    question: "What happens if the customer has a heat pump and an immersion heater — how does that fit Part L?",
    answer:
      "Most heat pump cylinders include a backup electric immersion heater for legionella protection (heating to 60 degC weekly to kill legionella bacteria — a Health and Safety at Work Act requirement) and as a backup for the compressor. The immersion's contribution to the property's running cost and carbon footprint is small (used briefly for legionella, occasionally for backup) and Part L SAP calculation accounts for it. The apprentice's electrical scope includes wiring the immersion controls (typically programmable timer plus thermostat). Section 753 may apply if the immersion is integrated into the cylinder unusually, but typically the immersion is a discrete element with its own thermostat.",
  },
  {
    question: "Are there any heat pump installs that do not require MCS certification?",
    answer:
      "Off-grid systems, very large commercial / industrial installs, and customers who do not need to claim Boiler Upgrade Scheme grants or demonstrate quality assurance for some other reason can technically be done without MCS certification. But the install must still comply with BS 7671 (electrical), F-Gas (refrigerant) and Building Regs Part L (where applicable). MCS is the dominant route for UK domestic because it bundles the regulatory compliance with the grant access. As an apprentice you should expect virtually every domestic heat pump install you encounter to be MCS-certified.",
  },
  {
    question: "How do air-source and ground-source heat pumps compare on Part L compliance?",
    answer:
      "Both are heat pumps and both contribute to Part L SAP compliance via their SCOP. Ground-source typically posts a slightly higher SCOP (4.0-4.5 typical) than air-source (3.5-4.0 typical) because ground temperature is more stable than air temperature across the heating season. Both pass Part L comfortably in well-designed homes. The choice between air-source and ground-source is normally driven by site conditions (ground space for trenches or boreholes, garden access for civils, planning constraints) and capital cost (ground-source is typically 2-3x the install cost of air-source) rather than by Part L compliance alone.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 3"
            title="BS 7671 Section 753 (heating) and the heat pump regulatory map"
            description="Section 753 covers heating cables and embedded heating systems. The broader heat pump install draws on general BS 7671, F-Gas Regulations for refrigerant work, MCS MIS 3005 for design and installer competence, and Building Regs Part L for Part L compliance. The L3 apprentice's electrical scope sits within this regulatory map."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 Section 753 covers heating cables and embedded heating systems — underfloor electric heating, trace heating on pipework, integrated electric trim heaters in heat pump systems. Wet underfloor heating fed from a heat pump is not Section 753.",
              "F-Gas Regulations are a hard boundary — refrigerant work requires separate F-Gas certification. The L3 electrician handles supply, isolation, controls and bonding; the F-Gas engineer handles all refrigerant work.",
              "MCS MIS 3005 is the heat pump install standard — covers system design, product certification, installer competence, commissioning. Required for Boiler Upgrade Scheme grant eligibility.",
              "Building Regs Part L drives the underlying push toward heat pumps via the SAP target rate. Future Homes Standard takes fossil-fuel boilers off new-build from 2025. PAS 2035 governs grant-funded retrofit projects.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the scope of BS 7671 Section 753 and identify which heat pump install scenarios fall within it.",
              "Describe the F-Gas Regulations boundary and explain which heat pump install activities are F-Gas-only and which are within the L3 apprentice's electrical scope.",
              "Identify the role of MCS MIS 3005 alongside BS 7671 and explain its requirement for Boiler Upgrade Scheme grant eligibility.",
              "Recognise Building Regs Part L as the underlying driver behind the UK push toward heat pumps and identify the Future Homes Standard implications for new-build.",
              "Describe the typical electrical interface for a domestic heat pump — supply rating, protective device type, isolation, bonding, controls.",
              "Identify the apprentice's electrical scope on a typical air-source heat pump install.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>BS 7671 Section 753 — what it covers</ContentEyebrow>

          <ConceptBlock
            title="Section 753 covers heating cables and embedded heating systems"
            plainEnglish="BS 7671 Section 753 (Heating cables and embedded heating systems) covers electric heating elements buried in floors, walls, ceilings or pipework. It applies to underfloor electric heating, trace heating on pipework (frost protection on outdoor pipework, cold-room pipework, etc.), heated mirrors, heated handrails, and integrated electric trim heaters in heat pump or HVAC systems."
            onSite="On a typical air-source heat pump install in the UK, Section 753 may or may not apply depending on whether any embedded electrical heating elements are integrated. The wet system itself (water circulating through pipework in the floor) is not Section 753 — the floor pipework is not electrically heated, the water is heated by the heat pump compressor. Section 753 would apply if the install includes an electric trim heater integrated into a particular zone, an electric boost element in the cylinder beyond the standard immersion, or any other embedded electrical heating element."
          >
            <p>
              Section 753 typical applications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor electric heating</strong> — heating cable or mat embedded in floor screed, fed from a thermostat / programmer. Common in bathrooms and kitchens.
              </li>
              <li>
                <strong>Trace heating</strong> — heating cable wrapped around or run alongside pipework to prevent freezing. Common on external pipework, cold rooms, drainage in cold climates.
              </li>
              <li>
                <strong>Heated mirrors and handrails</strong> — small heating elements integrated into bathroom mirrors (anti-fogging) or commercial handrails (anti-icing).
              </li>
              <li>
                <strong>Integrated electric trim / boost in HVAC</strong> — secondary electric heating elements integrated into heat pump systems for specific zones or duties.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 753 (Heating cables and embedded heating systems)"
            clause={
              <>
                "The requirements of this section apply to electrical heating systems with embedded heating cables or embedded heating film, and to surface heating systems on roofs, in gutters, and on pipework, vessels and walkways. The requirements supplement and modify the general requirements of this Standard."
              </>
            }
            meaning={
              <>
                Section 753 covers embedded electrical heating in its various forms. On a typical UK domestic heat pump install Section 753 applies where any electric heating element is integrated; the wet pipework circulating water from the heat pump is not Section 753. A4:2026 has refined Section 753 alongside the broader updates. The IET Codes of Practice for specific heating technologies (underfloor electric, trace heating) give the practical implementation guidance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 753 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>F-Gas Regulations — the trade boundary</ContentEyebrow>

          <ConceptBlock
            title="Refrigerant work requires F-Gas certification — the L3 electrician does not touch refrigerant"
            plainEnglish="The Fluorinated Greenhouse Gases Regulations (F-Gas) govern work on refrigerant circuits containing fluorinated refrigerants (R32, R290 propane, R410A, R134a etc.). Anyone installing refrigerant pipework, charging the system, or recovering refrigerant during service must hold F-Gas certification (City & Guilds 2079 or equivalent). The L3 electrician on a heat pump install does NOT do refrigerant work unless they hold separate F-Gas certification."
            onSite="On a typical heat pump install the trade split is clear. The F-Gas-certified engineer: connects and pressure-tests refrigerant pipework, charges the system with refrigerant, leaks-tests to F-Gas standards, recovers refrigerant during service or end-of-life. The L3 electrician: sizes and runs the supply cable, fits the local isolator, terminates the controls cabling, bonds the outdoor chassis where required, fits any electric trim heater per Section 753, commissions the electrical side. Crossing the line without F-Gas certification is a regulatory offence and an insurance issue."
          >
            <p>
              The F-Gas trade split:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas scope (NOT the L3 electrician without F-Gas cert)</strong> — refrigerant pipework, charging, recovery, leak testing, refrigerant disposal.
              </li>
              <li>
                <strong>L3 electrician scope</strong> — electrical supply, isolation, controls, bonding, embedded heating per Section 753, commissioning of electrical side.
              </li>
              <li>
                <strong>Joint scope</strong> — first-fix coordination (cable routes, refrigerant pipe routes, condensate drainage), final commissioning sign-off, customer handover.
              </li>
              <li>
                <strong>Refrigerant choice trends</strong> — R32 dominant in 2020-2024 modern systems; R290 (propane, natural refrigerant) increasingly common in 2024-2026 for low-GWP regulatory reasons. R290 has its own additional safety requirements (flammability) but reduces F-Gas regulatory burden.
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

          <ContentEyebrow>MCS MIS 3005 and Building Regs Part L</ContentEyebrow>

          <ConceptBlock
            title="MCS covers install quality and grant access; Part L covers building energy performance"
            plainEnglish="MCS MIS 3005 is the installer competence and product certification standard for heat pump installations. It covers system design (heat-loss calculation methodology, emitter sizing, SCOP estimate), product selection (eligible MCS-certified equipment), installation quality (refrigerant work by F-Gas certified personnel, electrical work to BS 7671), commissioning (flow temperature setup, control validation), and customer handover. Required for Boiler Upgrade Scheme (BUS) grant eligibility — currently £7,500 toward the cost of replacing a fossil-fuel boiler with a heat pump."
            onSite="Building Regs Part L (Conservation of Fuel and Power) is the construction-side energy regulation. New builds and notifiable refurbishments must demonstrate compliance via a SAP calculation that meets the Target Emission Rate (TER). A heat pump's SCOP feeds the SAP calculation; modern heat pumps in well-designed homes pass Part L comfortably. The Future Homes Standard (in force from 2025) effectively rules out fossil-fuel boilers from new-build because the SAP calculation cannot reach compliance with a gas boiler under the tightening targets. PAS 2035 (Publicly Available Specification — Retrofitting dwellings) governs grant-funded retrofit projects with a 'whole-house' fabric-first approach."
          >
            <p>
              The four-document map for a UK domestic heat pump install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 (general plus Section 753 where applicable)</strong> — electrical safety. Mandatory.
              </li>
              <li>
                <strong>F-Gas Regulations</strong> — refrigerant work. Mandatory for refrigerant scope; requires F-Gas certification.
              </li>
              <li>
                <strong>MCS MIS 3005</strong> — install quality and BUS grant access. Required for grant eligibility; effectively mandatory for UK domestic.
              </li>
              <li>
                <strong>Building Regs Part L</strong> — energy efficiency. Mandatory for new-build and notifiable refurbishment; the SAP calculation includes the heat pump's SCOP.
              </li>
              <li>
                <strong>PAS 2035 (where applicable)</strong> — whole-house retrofit standard for grant-funded projects.
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

          <ContentEyebrow>The electrical interface in detail</ContentEyebrow>

          <ConceptBlock
            title="Supply rating, OCPD, RCD, isolation — the electrician's checklist for a domestic ASHP"
            plainEnglish="A typical UK domestic 5-12 kW ASHP draws between 16 A and 40 A on full compressor load, depending on size and conditions. The electrician sizes the supply, the protective device, the cable, the RCD and the isolation per the manufacturer&apos;s installation manual and the BS 7671 framework. The headline numbers are predictable, but the detail matters — under-sizing trips the OCPD on cold-morning compressor inrush, over-sizing wastes the customer&apos;s money on cable."
            onSite="Read the manual before specifying. Most modern inverter-driven heat pumps publish the recommended OCPD rating and type, the maximum cable run for each cable size, and any specific RCD type requirement. The MCS-certified designer should specify; the apprentice verifies and installs. Always factor in: the maximum continuous load (compressor plus fan plus controls), the inrush current (especially on non-soft-start units), the cable installation method (T+E in trunking vs SWA buried vs through-loft) and the ambient temperature derating, and the disconnection time requirement on the protective device per Section 411."
          >
            <p>
              The electrical interface in numbers (typical UK domestic ASHP):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply rating</strong> — typically 32 A or 40 A radial single-phase
                for 5-12 kW units. Three-phase units (large or commercial) sit above.
              </li>
              <li>
                <strong>OCPD type</strong> — Type C MCB or RCBO is the standard. Some
                modern soft-start inverter units accept Type B; check the manual.
              </li>
              <li>
                <strong>Cable size</strong> — 6 mm or 10 mm T+E typical for 32 A or 40 A
                circuits respectively, depending on length and method. SWA for outdoor
                runs to the unit.
              </li>
              <li>
                <strong>RCD</strong> — Type A typically acceptable for inverter-driven
                heat pumps; some larger or three-phase units may need Type B per Section
                531. Manufacturer&apos;s manual is the binding source.
              </li>
              <li>
                <strong>Local isolator</strong> — outdoor-rated rotary or padlockable
                isolator within sight of the outdoor unit per Section 537. Allows safe
                isolation for service without going to the consumer unit.
              </li>
              <li>
                <strong>Bonding</strong> — outdoor unit chassis bonded if it forms an
                extraneous-conductive-part. Typically the case where the unit connects
                via metallic refrigerant pipes to the indoor system; check at install.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cylinder immersion and legionella protection</ContentEyebrow>

          <ConceptBlock
            title="The immersion heater on a heat pump cylinder is for legionella, not heating"
            plainEnglish="A heat pump cylinder typically runs at flow temperatures of 45-55 degC. Legionella bacteria can grow in stored water at temperatures between 20 and 45 degC. To kill any legionella that establishes itself, the cylinder must be raised to at least 60 degC for an hour at least once a week — too hot for the heat pump to deliver efficiently, so a backup electric immersion heater handles the weekly thermal disinfection cycle. The heat pump does the routine heating; the immersion does the legionella cycle."
            onSite="The L3 apprentice scope on the immersion side: a 16 A radial on 2.5 mm T+E from the consumer unit to the immersion heater terminal box (rated 3 kW typical), a programmable thermostat / timer that triggers the weekly disinfection cycle, RCBO at the consumer unit. The MCS-certified designer specifies the disinfection schedule (typically Sunday morning for low-tariff utilisation); the apprentice configures the timer per the design. Brief the customer that the immersion is not a backup heater for general heating — running it routinely defeats the heat pump&apos;s economic case. The L8 ACoP (Approved Code of Practice for legionella) is the underlying regulation; the heat pump cylinder design typically incorporates a controller that handles the cycle automatically once the immersion is wired."
          >
            <p>
              Immersion and legionella considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Legionella cycle requirement</strong> — typically 60 degC for an
                hour at least once a week per L8 ACoP guidance for stored hot water.
              </li>
              <li>
                <strong>Immersion rating</strong> — typically 3 kW on 16 A circuit. Some
                larger cylinders or commercial use 6 kW on 32 A.
              </li>
              <li>
                <strong>Programmable thermostat / timer</strong> — triggers the weekly
                cycle; some heat pump cylinder controllers handle this internally given
                only a switched supply to the immersion.
              </li>
              <li>
                <strong>Customer brief</strong> — do not run the immersion routinely;
                the legionella cycle is automated; if the heat pump fails the immersion
                can hold hot water as emergency backup but at higher running cost.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Controls integration — the unsung half of the install</ContentEyebrow>

          <ConceptBlock
            title="Heat pump performance lives or dies on the controls"
            plainEnglish="A heat pump with poor controls runs at high flow temperatures and posts a poor SCOP. A heat pump with good controls — weather compensation, room compensation, tariff awareness, multi-zone scheduling — runs at the lowest flow temperature that meets demand and posts SCOP near the manufacturer&apos;s headline. The control wiring is typically a small portion of the total cable scope but a large portion of the install&apos;s eventual performance."
            onSite="The L3 apprentice scope on controls: pull the manufacturer-specified controls cable between the outdoor unit, the indoor cylinder controller and any remote room controllers; terminate per the manufacturer&apos;s wiring diagram; commission per the manufacturer&apos;s sequence (typically with the MCS designer present). Modern controls cables vary by manufacturer — Mitsubishi uses the M-NET protocol on a 2-core polarity-sensitive cable; Daikin uses S21 or P1/P2 protocols on similar 2-core; Samsung uses F1/F2; Vaillant uses eBUS. Cross-reference with the install manual; do not assume cables are interchangeable between manufacturers."
          >
            <p>
              The controls layer typically includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Weather compensation</strong> — outdoor sensor (sometimes built
                into the outdoor unit, sometimes a separate sensor near the eaves)
                feeds outdoor temperature; controller drops flow temperature on milder
                days. Single biggest SCOP improvement available.
              </li>
              <li>
                <strong>Room compensation</strong> — primary room sensor (typically the
                living room) feeds room temperature; controller modulates output to
                hit setpoint without overshoot.
              </li>
              <li>
                <strong>Multi-zone scheduling</strong> — separate zones (downstairs,
                upstairs, hot water) each with their own setpoint and schedule.
              </li>
              <li>
                <strong>Tariff awareness</strong> — increasingly available; heat pump
                pre-heats the cylinder during cheap-rate windows, defers compressor run
                during peak windows.
              </li>
              <li>
                <strong>Remote / app control</strong> — customer-facing app for schedule
                changes, holiday mode, monitoring.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Refrigerant landscape — R32, R290 and the GWP push</ContentEyebrow>

          <ConceptBlock
            title="Refrigerants are migrating from R32 to R290 (propane) for low-GWP compliance"
            plainEnglish="The Global Warming Potential (GWP) of a refrigerant measures how much it warms the atmosphere relative to CO2 if it escapes. R410A (older systems) has GWP 2088. R32 (current dominant) has GWP 675. R290 (propane, natural refrigerant) has GWP 3 — effectively zero. UK and EU F-Gas regulation is progressively tightening on high-GWP refrigerants, pushing the manufacturers toward lower-GWP options. R290 is now common on new ASHP launches in 2024-2026."
            onSite="The L3 electrician does not handle refrigerant — that is F-Gas territory. But the apprentice should recognise that R290 systems have additional safety considerations because R290 is flammable. Outdoor unit siting on R290 systems requires clearance from openings (windows, vents) and from sources of ignition; some indoor configurations are restricted. The MCS-certified designer applies the manufacturer&apos;s clearance rules; the apprentice verifies the install conforms. There is no electrical scope difference between R32 and R290 systems — the supply, isolation, controls and bonding are the same — but the install location and clearances may differ."
          >
            <p>
              The refrigerant landscape in 2026:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R410A (legacy)</strong> — GWP 2088. Phased out for new equipment;
                still in service on 2010-2018 systems. Recovery and disposal under
                F-Gas.
              </li>
              <li>
                <strong>R32 (current dominant)</strong> — GWP 675. Mildly flammable
                (A2L). Most 2018-2024 systems. F-Gas-certified install and service.
              </li>
              <li>
                <strong>R290 / propane (rising)</strong> — GWP 3. Fully flammable (A3).
                Outdoor units only typically; clearance rules to openings and ignition
                sources. F-Gas-certified plus additional ATEX-style safety
                considerations for the engineer.
              </li>
              <li>
                <strong>CO2 / R744 (commercial / DHW)</strong> — GWP 1. Used in some
                high-temperature commercial DHW heat pumps. Very high operating
                pressures.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>When the property supply needs an upgrade</ContentEyebrow>

          <ConceptBlock
            title="Heat pump install can push the existing supply past its limit — flag it early"
            plainEnglish="A 9 kW ASHP on full load draws around 20 A continuous. Add an EV charger, a cooker, a shower running concurrently, and a typical 60-80 A single-phase main fuse can be exceeded. Heat pump installs are one of the common triggers for a DNO supply upgrade conversation alongside EV charging. The MCS-certified designer runs the diversity calculation; the apprentice flags the constraint when the headline maximum looks suspicious."
            onSite="The supply-upgrade decision tree mirrors the EV one. 60 A single-phase: heat pump alone fits; combined with EV usually needs load management or upgrade. 80 A single-phase: heat pump + EV with load management normally fits; combined with shower + oven concurrent draw is borderline. 100 A single-phase: comfortable for heat pump + EV + typical domestic loads. Three-phase: significant DNO works (4-12 weeks) but unlocks 22 kW EV charging and headroom for full electrification. Flag the constraint early; DNO supply upgrades take time and the customer needs the timeline. Some DNOs offer free or subsidised upgrades for low-carbon installs as part of network reinforcement programmes."
          >
            <p>
              The supply-upgrade trigger conditions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Existing 60 A main fuse plus heat pump plus EV</strong> —
                load management essential; upgrade to 80 A or 100 A worth discussing.
              </li>
              <li>
                <strong>Existing 80 A plus heat pump plus EV plus other heavy loads</strong>
                — normally fits with HEMS dispatch and load management; borderline at
                concurrent peak.
              </li>
              <li>
                <strong>Customer planning full electrification within 5 years</strong>
                — push for 100 A or three-phase upgrade now while the supply is being
                touched.
              </li>
              <li>
                <strong>Three-phase already present</strong> — opens 22 kW EV charging
                and headroom for full electrification; flag the opportunity.
              </li>
              <li>
                <strong>Network reinforcement programmes</strong> — Some DNOs subsidise
                or free-fund supply upgrades for low-carbon installs. Check before
                quoting.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Crossing the F-Gas line without certification because 'it is just connecting a couple of pipes'"
            whatHappens={
              <>
                Apprentice or non-F-Gas-certified electrician handles refrigerant pipework on the basis that 'it is the same as plumbing'. It is not. F-Gas Regulations are a regulatory regime with their own competence requirements, leak-test standards, refrigerant handling rules and certification. Crossing the line without certification: regulatory offence, insurance void, F-Gas leakage risk to atmosphere (refrigerants are powerful greenhouse gases — R32 has 675x the GWP of CO2), system failure risk if the joint is not properly tested. Not worth it.
              </>
            }
            doInstead={
              <>
                Stay strictly within the electrical scope unless you hold F-Gas certification (City &amp; Guilds 2079 or equivalent). Coordinate with the F-Gas-certified engineer on first fix (cable routes alongside pipe routes), but never handle refrigerant pipework or charging without the certification. If the apprentice wants to expand into the refrigerant trade later, the route is the F-Gas qualification — there is no shortcut.
              </>
            }
          />

          <CommonMistake
            title="Using a Type B MCB on a heat pump final circuit and getting nuisance trips on compressor inrush"
            whatHappens={
              <>
                Apprentice fits a Type B MCB on the heat pump final circuit because that is what the consumer unit happened to have spare. The compressor's start-up inrush (5-10x steady-state) trips the Type B (3-5x trip threshold) on the first cold morning. Customer's heating is off; callback to swap the device for a Type C; reputation damage avoidable.
              </>
            }
            doInstead={
              <>
                Use Type C MCB or RCBO unless the manufacturer's installation manual specifies otherwise. Some modern inverter-driven heat pumps with soft-start are explicitly compatible with Type B; most still recommend Type C. Read the manual before specifying the protective device. The MCS-certified designer should specify; the apprentice should verify on site.
              </>
            }
          />

          <Scenario
            title="Apprentice on an ASHP install — replacing a 1990s combi boiler"
            situation={
              <>
                You are the apprentice on a Mitsubishi Ecodan 8.5 kW air-source heat pump install replacing a 1990s combi boiler at a 4-bed semi. The MCS-certified designer (holding MIS 3005) has produced the system design — flow temperature 45 degC into upsized radiators, a 250 L unvented cylinder with backup immersion, weather compensation control, BUS grant claim. The F-Gas-certified engineer is handling the outdoor unit, refrigerant pipework, indoor cylinder coil and refrigerant charging. Your electrical scope: 40 A radial on 10 mm T+E from the consumer unit to the outdoor unit location, Type C RCBO at the consumer unit, local isolator outside near the outdoor unit, controls cabling between outdoor unit and indoor cylinder controller (manufacturer-specified pairs), bonding of the outdoor chassis (extraneous-conductive-part criteria met because of the wet system connection), 16 A radial on 2.5 mm T+E to the immersion heater with programmable thermostat. No Section 753 elements (no electric trim heaters in this design).
              </>
            }
            whatToDo={
              <>
                First fix: pull the 10 mm T+E cable through wall to outdoor unit location; pull the 2.5 mm T+E to immersion location; pull the controls cabling per manufacturer's wiring diagram; coordinate cable routes with the F-Gas engineer's refrigerant pipe routes. Second fix: terminate at consumer unit on new Type C RCBO; install local isolator outside; terminate at outdoor unit per wiring diagram; terminate controls; install immersion thermostat and programmable timer; bond outdoor chassis. Coordinate commissioning with the F-Gas engineer — they handle refrigerant charge and pressure-test, you handle electrical commissioning and controls validation. MCS designer signs off the system commissioning including SCOP estimate and customer handover documentation. Customer briefing: which isolator does what, how the immersion programmer works, what to expect from the heat pump in cold weather.
              </>
            }
            whyItMatters={
              <>
                ASHP installs are now mainstream UK domestic work. The L3 apprentice's role on the electrical side is real and significant — the supply, the controls, the bonding, the immersion, the labelling. Recognising the trade boundary (F-Gas separate, MCS designer overall, electrician electrical) is part of working effectively on a multi-trade install. The customer's BUS grant depends on the MCS sign-off; the install's electrical safety depends on the electrician's BS 7671 work; the refrigerant safety depends on F-Gas. All three trades contribute; none can skip the boundary.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (RCD additional protection)"
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
                Heat-pump installs typically include local socket-outlets at the outdoor unit
                or the cylinder cupboard for service work. Those sockets fall under 411.3.3 and
                must have RCD protection at the 32 A threshold and below. In a dwelling there
                is no risk-assessment exemption.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.3.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs in AC final circuits)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc
                fault detection devices (AFDDs) to mitigate the risk of fire in AC final
                circuits of a fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning={
              <>
                A heat-pump radial circuit is a fixed-load AC final circuit drawing high
                current for hours at a time — exactly the scenario AFDDs target. The regulation
                uses &quot;recommending&quot;, so AFDDs are not blanket-mandatory under BS 7671
                for a domestic heat pump, but a competent designer will normally specify them
                anyway and HRRBs bring AFDDs in via the Building Safety Act framework.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 Section 753 covers heating cables and embedded heating systems — underfloor electric, trace heating, integrated electric trim heaters. Wet pipework fed from a heat pump is not Section 753.",
              "F-Gas Regulations are a hard trade boundary. Refrigerant work requires F-Gas certification (City & Guilds 2079). The L3 electrician handles supply, isolation, controls, bonding; not refrigerant.",
              "MCS MIS 3005 is the heat pump install standard. Required for Boiler Upgrade Scheme grant eligibility. Covers system design, product selection, installer competence, commissioning.",
              "Building Regs Part L drives the underlying push toward heat pumps via SAP target rate. Future Homes Standard takes fossil-fuel boilers off new-build from 2025.",
              "PAS 2035 governs grant-funded retrofit projects with a 'whole-house' fabric-first approach. Coordinated by Retrofit Coordinator and Retrofit Designer.",
              "Type C MCB or RCBO is the standard on heat pump final circuits because of compressor inrush. Type B can nuisance-trip even on inverter-driven units in some conditions.",
              "Cylinder immersion heater wiring is part of the apprentice's scope — programmable thermostat for legionella protection (60 degC weekly per HSWA) and as compressor backup.",
              "The four-document map for UK domestic heat pump install — BS 7671, F-Gas, MCS MIS 3005, Building Regs Part L (plus PAS 2035 on grant-funded retrofit). All apply; none can be skipped.",
            ]}
          />

          <Quiz title="BS 7671 Section 753 and heat pump regulatory map — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 BS 7671 Section 722 (EV)
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 ENA G98 / G99 grid notification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
