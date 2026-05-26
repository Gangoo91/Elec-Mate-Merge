/**
 * Module 2 · Section 6 · Subsection 3 — Hazardous Waste Regs 2005, EPR 2016 and the waste hierarchy
 * City & Guilds 2365-03 / Unit 301 / Sustainable working practices
 *
 * Layered depth: 2357 Unit 602 ELTK02 / LO2 supplementary — UK hazardous waste consignment
 * regime, the Environmental Permitting (England and Wales) Regulations 2016 framework, and
 * the statutory waste hierarchy (prevention → re-use → recycling → recovery → disposal).
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
  'Hazardous Waste, EPR and the waste hierarchy (6.3) | Level 3 Module 2.6.3 | Elec-Mate';
const DESCRIPTION =
  'Hazardous Waste (England and Wales) Regulations 2005, the Environmental Permitting Regulations 2016, and the statutory waste hierarchy. How fluorescent tubes, asbestos-bearing accessories, oil-filled transformers and other hazardous electrical waste must be consigned, where the waste hierarchy applies on a typical electrical install, and how to use the European Waste Catalogue codes correctly.';

const checks = [
  {
    id: 'l3-m2-s6-sub3-fluorescents',
    question:
      "You are stripping out a 1990s commercial unit and removing 60 fluorescent tubes plus several PCB-suspected ballasts. Which UK waste regime applies and what paperwork do you need?",
    options: [
      "(1) Identify circuit (label, drawings, customer info — hypothesis only). (2) Isolate (operate the breaker / switch — confirm it's the right one). (3) Lock-off (apply a personal padlock + tag with your name + date). (4) Prove the tester on a known live source (Martindale GVD2 proving unit OR a known live socket nearby) — voltage tester only. (5) Test the circuit at the work point (between L–N, L–E, N–E) — voltage tester only. (6) Re-prove the tester on the same known live source. Multimeters do NOT prove dead. Socket testers do NOT prove dead. Only a GS38 voltage tester does.",
      "Significantly. A repair that's exposed to harsh environment (outdoor, kitchen, plant room, washroom) may not last as long as the same repair in benign environment. The repair-vs-replace decision should consider: (a) what's the IP / environmental rating of the repaired vs replacement component? (b) Will the repair retain the original IP rating? (c) Is the new component IP-rated for the actual environment? Replacement often comes with current IP / environmental ratings; repair preserves the existing rating (which may have degraded). For harsh environments, replacement is usually the right call.",
      "Both WEEE and the Hazardous Waste Regulations apply. Fluorescent tubes contain mercury and are absolute hazardous waste under the European Waste Catalogue (EWC code 20 01 21*). Older ballasts may contain PCBs (polychlorinated biphenyls) which are also hazardous waste. Each transfer requires a Hazardous Waste Consignment Note (not just a waste transfer note), the carrier and the destination must hold the appropriate environmental permits, and the producer (you) must keep the consignment notes for at least three years. Tubes must be transported intact (not crushed) to prevent mercury vapour release.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
    ],
    correctIndex: 2,
    explanation:
      "Hazardous waste sits under a stricter regime than non-hazardous WEEE. The Hazardous Waste Consignment Note is the controlling document; the Environment Agency uses the consignment data to track movements end-to-end. Crushing fluorescent tubes on site without an appropriate permit is a separate breach because of the mercury release. The PCB ballast issue is real for older fittings — pre-1986 ballasts in particular may contain PCBs and require specialist treatment.",
  },
  {
    id: 'l3-m2-s6-sub3-hierarchy',
    question:
      "A customer is replacing all the fluorescent fittings in their warehouse with LED panels. Apply the waste hierarchy to the old fluorescent fittings — what is the correct order of preference?",
    options: [
      "Prevention (could the existing fittings be retrofitted with LED tubes instead of replaced?) first, then preparation for re-use (could the fittings be cleaned and resold for second-hand commercial reuse?), then recycling (separate the metal, glass and plastic components for material recovery), then other recovery (energy from waste for non-recyclable plastic), and only then disposal as the last resort. The Waste (England and Wales) Regulations 2011 (regulation 12) require waste producers to apply this hierarchy and to take all reasonable steps to apply it in order of preference.",
      "Rarely, in the modern UK context. Micro-CHP burns gas to generate electricity locally and uses the waste heat to drive the wet system. It made sense when grid electricity was carbon-intensive (~500 gCO₂/kWh) and gas was cheap. As the grid decarbonises (~200 gCO₂/kWh now), the relative carbon advantage shrinks. Heat pumps deliver lower running carbon per kWh of heat. Micro-CHP is now mostly seen in larger commercial / institutional applications where heat demand is constant and high. For domestic UK new-build, the Future Homes Standard effectively rules it out.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "No. EAWR Reg 14(c) requires 'suitable precautions including where necessary the provision of suitable protective equipment'. The risk being 'low' doesn't dispense with the precaution — it informs which precaution. For 230 V live work, Class 0 insulated gloves (rated 1000 V AC) plus insulated tools are the standard precaution. The senior is exposing both themselves and the firm to liability under EAWR (failure to take suitable precautions) and HSWA Section 7 (employee duty to take reasonable care of own and others' safety). The apprentice's defence: 'I followed the firm's PPE matrix' — so make sure there IS one and it specifies gloves for live work.",
    ],
    correctIndex: 0,
    explanation:
      "The waste hierarchy is the legal framework for waste decision-making in the UK. Regulation 12 of the Waste (England and Wales) Regulations 2011 imposes a duty on waste producers to take all reasonable steps to apply the hierarchy in order. On a fluorescent-to-LED retrofit, prevention via tube-only retrofit and preparation for re-use of the fittings should both be considered before bulk recycling. The hierarchy is the right answer to the customer who asks whether the old fittings can be used somewhere else.",
  },
  {
    id: 'l3-m2-s6-sub3-permits',
    question:
      "What is the role of the Environmental Permitting Regulations 2016 (EPR) in waste handling on an electrical contracting business?",
    options: [
      "Run the customer through: how the system operates (continuous low-temperature heating, not on-off cycles like a gas boiler); how to set the room thermostat (set and forget at desired temperature, modest setbacks only); how to use the hot water schedule (typically once or twice a day); when to expect higher running costs (cold spells push up consumption); what the smart controls do; what the warning lights / app notifications mean; who to call for support (warranty contact, manufacturer support, installer aftercare); annual service requirement. Five-to-ten minutes that prevents months of customer confusion.",
      "Personally bound under s.110 (helping someone else commit an unlawful act, e.g. participating in harassment) and as a witness who is duty-bound to co-operate with internal investigations. The apprentice's reputational and legal exposure grows if they participate in or condone discriminatory or harassing behaviour. The apprentice also has a route to RAISE concerns — internal complaints procedure, ACAS conciliation, Employment Tribunal claim — and is protected against victimisation under s.27 for raising them in good faith.",
      "Bond each extraneous service (gas, water) separately back to the MET per Reg 544.1.2 (within 600 mm of intake). Bond the structural steel frame at multiple accessible points back to the MET. Bond the LPS earth network to the MET via direct bond or spark gap per BS EN 62305. Each system has its own dedicated bonding cable to the MET — no daisy-chaining. The MET is the single common reference for the entire integrated earth and bonding network.",
      "EPR is the umbrella permitting framework for waste activities, water discharges, radioactive substances and certain installations in England and Wales. Anyone carrying, brokering, treating, transferring or disposing of waste needs the appropriate authorisation under EPR — typically a waste carrier registration (lower tier), a broker / dealer registration, or a full environmental permit for a treatment site. As an electrical contractor you most likely need a lower-tier waste carrier registration to lawfully transport your own controlled waste. Anyone you transfer waste to must hold their own appropriate authorisation.",
    ],
    correctIndex: 3,
    explanation:
      "EPR 2016 consolidated dozens of older permitting regimes into one framework. For an electrical contractor the immediate practical effects are: register as a waste carrier (free for lower-tier registration if you only carry your own waste), check the waste carrier registration of anyone removing waste from your sites, and check the environmental permit of the destination treatment facility. The Environment Agency operates a free public register where these checks take 30 seconds.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the difference between a waste transfer note and a Hazardous Waste Consignment Note?",
    options: [
      "Stop and ask the supervisor for the missing items — RAMS, risk assessment, COSHH for any chemicals, the rest of the drawings (single line, schedule of circuits), the schematic, the schedule of test results from the existing install, BS 7671 and the OSG, mfr data for the new board, and the permit if any of the work is hot. Without that information you can't show your work was done to a 'suitable and sufficient' standard under MHSWR Reg 3 and you can't show compliance with BS 7671 Reg 132.13.",
      "A waste transfer note is the standard document used for non-hazardous controlled waste under the Duty of Care. A Hazardous Waste Consignment Note is the stricter document used for hazardous waste under the Hazardous Waste Regulations 2005 — it requires more information including the precise EWC code, the hazardous properties (HP codes), the chemical composition, the carrier and destination authorisations, and a signature from each party in the chain. Consignment notes must be retained for at least three years (waste transfer notes for two years).",
      "The programme tells you the sequence and the deadline — miss it and your firm is at risk of liquidated damages. The snag list is your end-of-job homework. Variations and delay notices are how additional work or extra time is recorded so the firm can claim it. Your firm's cash flow — and ultimately your wages — depend on this paperwork being right. Even as an apprentice, learning to read the programme and the snag list is part of becoming a tradesperson.",
      "Anti-islanding — the inverter detects loss of grid reference and shuts down within the time limits of G98 / G99 (typically loss-of-mains protection per ENA EREC G98 / G99). This protects DNO engineers who may be working on what they believe is a dead supply, prevents asynchronous reclosure damage, and stops a small generator trying to support a much larger network it cannot stabilise. To run through a power cut you need a hybrid inverter with explicit islanded-mode capability and a transfer arrangement that isolates the property from the grid first.",
    ],
    correctAnswer: 1,
    explanation:
      "The hazardous waste regime layers extra duties on top of the general Duty of Care. The consignment note is the audit trail the Environment Agency uses to follow hazardous waste from cradle to grave. Skipping it because it feels like extra paperwork is a documented enforcement target. The notes are simple to complete once the team has done it a few times.",
  },
  {
    id: 2,
    question:
      "What does the waste hierarchy require waste producers to do under regulation 12 of the Waste (England and Wales) Regulations 2011?",
    options: [
      "Hot work (gas torch, grinding sparks, welding) on commercial premises, confined-space entry (ducts, voids, lift shafts), live electrical work under EAWR Reg 14, and high-energy switching on industrial / healthcare sites. The permit is a formal document authorising the specific activity within a specific time window, listing the precautions, and signed by the issuing authority and the operative.",
      "Install a separate earth electrode (earth rod) for the EV charging circuit, creating TT earthing for that circuit, with an RCD providing earth fault protection — or use an EVSE that the manufacturer confirms has integral open-PEN protection meeting the requirements of BS 7671 Regulation 722.411.4",
      "Take all such measures available to it as are reasonable in the circumstances to apply the waste hierarchy in order of priority: prevention, preparation for re-use, recycling, other recovery (including energy recovery), and disposal as the last resort. The producer must record the steps taken to apply the hierarchy on the waste transfer note. Departures from the order must be justified on environmental grounds.",
      "Report it to your insurer promptly within the timeframe specified in the policy (often within 7-30 days). Preserve evidence (photos, statements, certificates). Don't admit liability — let the insurer handle the negotiation. Failure to notify within the policy timeframe can void cover for that claim.",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 12 turns the hierarchy from policy into duty. The waste transfer note now includes a tick-box requiring the producer to confirm the hierarchy has been applied. On a typical electrical install the practical application is: design out waste at order stage (prevention), keep usable accessories aside for re-use, separate cable copper for recycling, and only what genuinely cannot be recovered goes to disposal.",
  },
  {
    id: 3,
    question:
      "Which of these is classed as absolute hazardous waste and triggers the consignment note regime regardless of quantity?",
    options: [
      "Read it, follow it, sign on, work to the controls and steps as written, and flag anything on site that doesn't match what the document describes. Writing RAMS is a Level 3 / 4 / supervisor competency — at Level 2 you're a reader and follower of RAMS, and a flagger when reality doesn't match.",
      "Most HASAWA offences are triable either way — the prosecution chooses Magistrates' (summary) or Crown (indictment). Magistrates' Court can impose unlimited fines on H&S offences (since 2015) and up to 6 months imprisonment. Crown Court can impose unlimited fines and up to 2 years imprisonment for individuals (longer for some related offences like Corporate Manslaughter — life). The Sentencing Council Definitive Guideline applies in both courts.",
      "Each operative working on the isolated circuit fits their own lock to the isolation point (or to a hasp / multi-lock if multiple operatives). Tag identifies the operative, the circuit, the date / time, and the work. Lock removed only by the operative who fitted it (and only when their work is complete and safe to re-energise).",
      "Fluorescent tubes (mercury-containing, EWC 20 01 21* — the asterisk denotes hazardous), oil-filled transformers and capacitors containing PCBs (EWC 16 02 09*), batteries containing lead, mercury or cadmium (EWC 16 06 01* and similar), asbestos-cement consumer unit backplates from older installations (EWC 17 06 05*), and waste oils. The asterisk in the EWC code is the marker for absolute hazardous waste.",
    ],
    correctAnswer: 3,
    explanation:
      "The EWC (now the List of Waste in UK terminology) is the single catalogue of waste types. Codes ending in * are absolute hazardous waste — always hazardous regardless of concentration or other tests. Other codes are mirror entries — hazardous only if certain hazardous properties (HP codes) are present above thresholds. Knowing which EWC codes apply to common electrical waste streams is part of the consignment note completion task.",
  },
  {
    id: 4,
    question:
      "Why has the lower-tier waste carrier registration regime become essentially mandatory for electrical contractors in the UK?",
    options: [
      "Because under the Environmental Permitting Regulations and the Waste (England and Wales) Regulations any business that transports waste it has produced from a customer site to a disposal point is carrying controlled waste and requires a waste carrier registration. Lower-tier registration (for businesses carrying only their own waste) is free and renewable; upper-tier (for businesses carrying other parties waste, or carrying construction and demolition waste from third parties) carries a fee. Failure to register is a criminal offence.",
      "Take all such measures available to it as are reasonable in the circumstances to apply the waste hierarchy in order of priority: prevention, preparation for re-use, recycling, other recovery (including energy recovery), and disposal as the last resort. The producer must record the steps taken to apply the hierarchy on the waste transfer note. Departures from the order must be justified on environmental grounds.",
      "All work equipment — anything used by an employee at work, including tools, machinery, vehicles, ladders, lifting equipment and apparatus. The duties cover suitability (Reg 4), maintenance (Reg 5), inspection (Reg 6), specific risks (Reg 7), information and instructions (Reg 8), training (Reg 9), conformity (Reg 10), dangerous parts protection (Reg 11), specified hazards (Reg 12), high/low temperature (Reg 13), controls (Reg 14–17), isolation (Reg 19) and stability (Reg 20).",
      "A proving unit is a small portable source of low-voltage AC (typically 240 V or 110 V output) used to verify a voltage tester is functioning BEFORE and AFTER each safe-isolation test. The 'prove dead' routine: prove tester on the unit (should read live), test the circuit (should read dead), prove tester again on the unit (still reads live = tester is working = circuit really IS dead). Without proving the tester at both ends, a faulty tester reading 'dead' on a live circuit could kill you.",
    ],
    correctAnswer: 0,
    explanation:
      "Most electrical contractors carry waste they have produced themselves (offcuts, removed kit, packaging) and qualify for lower-tier registration which is free. The Environment Agency online registration takes about ten minutes. Upper-tier registration is needed for anyone carrying third-party waste or third-party construction and demolition waste. The check on the wholesaler or skip operator removing waste from your site needs to confirm they hold the correct tier of registration for the activity.",
  },
  {
    id: 5,
    question:
      "A customer in Wales asks you to remove an old asbestos-cement consumer unit backplate during a rewire. What is the correct response?",
    options: [
      "Anti-islanding is the inverter's ability to detect when the grid has gone down and to disconnect itself within milliseconds — preventing the inverter from continuing to feed a portion of the local network ('islanding') with the DNO's workers expecting that section to be dead. ENA G98 (and G99 for larger systems) defines the protection settings the inverter must implement (typically G99/1-7 or earlier G83/G59 protection settings depending on inverter age). Modern inverters self-test the anti-islanding regularly. A4:2026 has refined the BS 7671 cross-references to G98/G99.",
      "Asbestos-containing material work is restricted under the Control of Asbestos Regulations 2012. Even non-licensed removal of low-risk asbestos-containing materials requires the worker to be trained to non-licensable asbestos work standard, and the resulting waste is hazardous waste (EWC 17 06 05*) requiring consignment to a permitted asbestos waste site. The simple answer is do not remove asbestos-bearing accessories yourself unless you and your employer hold the appropriate non-licensable asbestos training and authorisation. Refer to a licensed or competent contractor as appropriate.",
      "A boiler drives a wet heating system — pumps hot water around radiators / underfloor circuits and a hot-water cylinder. Typical output 10-50 kW, located in a utility room or outhouse, automatic fuel feed (auger from a hopper), automatic ignition, automatic ash handling. A stove is a room heater — radiates heat directly into the room it sits in, plus optional back-boiler for some hot water. Lower output (5-15 kW typical), manual loading (logs or pellets), no automatic ash removal. Different installation regulations, different MCS standards, different customer expectations.",
      "Pregnancy and maternity (s.18). The Act prohibits unfavourable treatment of women because of pregnancy or maternity leave during the 'protected period' (broadly, from the start of pregnancy to the end of maternity leave). This is a separate category to sex discrimination — pregnancy / maternity claims don't need a male comparator. It's one of the most enforced parts of the Act and a leading source of Employment Tribunal awards.",
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos work crosses both the Health and Safety at Work Act regime (Control of Asbestos Regulations 2012) and the hazardous waste regime. The right answer is rarely to handle it yourself. The customer house may have an asbestos register; commercial premises always should. The cost of a competent referral is small relative to the cost of an HSE prosecution or a long-term health consequence to you.",
  },
  {
    id: 6,
    question:
      "What does the European Waste Catalogue code with an asterisk (e.g. 16 06 01*) tell you?",
    options: [
      "The single shared online platform where all project information is stored, controlled and exchanged — drawings, models, schedules, RFIs, change orders, all under structured access control and revision management. Examples include Autodesk Construction Cloud, Procore, Asite, Aconex, Viewpoint For Projects.",
      "Typical materials markup is 15-30% on top of cost — covers the time sourcing, collecting, returning, managing stock, dealing with wholesaler accounts, and wastage. Higher markup on stocked items you carry in van inventory; potentially lower markup on large special orders where you don't add much value.",
      "It marks the entry as absolute hazardous waste — always hazardous regardless of concentration or test result. Non-asterisked entries are non-hazardous; entries with mirror codes (one starred, one not) require a hazardous-property assessment on the specific waste before deciding which code applies. The List of Waste regulations and the Environment Agency technical guidance set out the assessment methodology.",
      "The Scottish Joint Industry Board (SJIB) is the equivalent of the JIB for the electrical contracting industry in Scotland. It sets working rules, pay rates and grades for Scottish electricians, working alongside SELECT (the Scottish trade association). SJIB grading uses similar terminology (Apprentice, Approved Electrician, Technician) but the rates and the ECS card variants are Scottish-specific.",
    ],
    correctAnswer: 2,
    explanation:
      "Reading the EWC code is part of being a competent waste producer. Most electrical hazardous waste streams have well-known absolute codes — 20 01 21* for fluorescent tubes, 16 06 01* for lead-acid batteries, 16 06 02* for nickel-cadmium batteries, 16 02 09* for PCB-containing transformers, 17 06 05* for asbestos-containing construction materials. Memorising the half-dozen common codes for your trade saves time on consignment note completion.",
  },
  {
    id: 7,
    question:
      "Why is energy recovery (incineration with energy capture) ranked below recycling in the waste hierarchy?",
    options: [
      "A generic RAMS is template wording that could apply to any job — 'electrical hazards', 'working at height', 'use of PPE'. A site-specific RAMS names the actual site, the actual tasks, the hazards identified on the walk-round, the specific access kit, the specific controls and the specific steps. The HSE 'suitable and sufficient' test under MHSWR Reg 3 effectively requires site-specific content.",
      "'So far as is reasonably practicable' (SFAIRP) — the duty-holder weighs the risk against the cost, time and effort of further precautions. The bar is set by what a competent person would have done. Established in Edwards v National Coal Board (1949). Trivially expensive controls against serious risk = required. Disproportionately expensive controls against trivial residual risk = not required.",
      "Significant. A south-facing roof at 30-40° pitch is the optimal UK orientation, posting 100% of reference yield. East-facing or west-facing roofs typically produce 80-85% of optimal. North-facing produces 50-65% (still positive but with much longer payback). Steeper pitches favour winter performance; shallower pitches favour summer performance. Flat roofs get an A-frame mount to set a target pitch and azimuth. The MCS Yield Calculator handles all of this — produces the kWh figure for the SAP and the customer handover.",
      "Because recycling preserves the material value (the metal, the polymer, the glass) for re-use in new manufacturing, whereas energy recovery destroys the material and recovers only the chemical energy. Under the waste hierarchy, keeping materials in productive use is preferred over extracting one-time energy from them. Energy from waste sits above landfill because at least some value (electricity / heat) is recovered, but it sits below recycling because the material is lost.",
    ],
    correctAnswer: 3,
    explanation:
      "The hierarchy reflects the circular-economy principle that materials should stay in use as long as possible. Recycling extends material life; energy recovery ends it. Energy recovery is still preferable to landfill because at least the chemical energy is captured, but the loss of the original material value is permanent. The hierarchy gives the waste producer a clear ladder to climb in any given decision.",
  },
  {
    id: 8,
    question:
      "Which UK regulator enforces the Hazardous Waste Regulations 2005 and the EPR 2016 regimes in England?",
    options: [
      "The Environment Agency. The EA operates the consignment note tracking system, the waste carrier registration system, the environmental permit register and the public lookup tools. SEPA (Scotland), Natural Resources Wales (NRW) and the Northern Ireland Environment Agency (NIEA) cover the equivalent functions in their respective territories. Civil sanctions, variable monetary penalties and criminal prosecution are all available where breaches are detected, and the agencies publish enforcement bulletins regularly.",
      "Professional Indemnity (PI) — covers the firm against claims arising from errors, omissions or negligent advice in their professional capacity (design, specification, recommendation). PL covers physical damage / injury from the contractor's activities; PI covers economic loss caused by bad advice or design. Increasingly relevant as installers move into design-and-build, EV charging design, solar PV design and prosumer's installations under BS 7671 Part 8.",
      "Operation of mechanical interlocks (e.g. door interlock prevents opening while energised, key interlock prevents racking out a circuit-breaker without permit), confirmation that emergency-off devices break the supply, manual operation of the main switch under load (where safe), and that any control circuit logic (contactors, relays, time delays) operates as designed.",
      "Automated bank feed (transactions imported from your bank), invoice generation and tracking (sent invoices visible, paid status tracked), VAT return preparation (Making Tax Digital compliant), expense tracking with photo receipts, integration with payroll for staff/apprentices, real-time profit and loss view. Cost £15-30/month for sole trader; saves hours of manual bookkeeping each month.",
    ],
    correctAnswer: 0,
    explanation:
      "The EA is the lead environmental regulator in England across the waste regimes. Their enforcement activity is data-driven — the consignment note system flags anomalies which trigger compliance visits. As a contractor your best defence is well-kept paperwork and correctly registered carriers. The free Environment Agency public registers (waste carriers, environmental permits, hazardous waste producers) are the right tool for routine compliance checks.",
  },
];

const faqs = [
  {
    question: "Do I need to register as a hazardous waste producer with the Environment Agency?",
    answer:
      "Since 1 April 2016 hazardous waste producer premises registration in England has been abolished — you no longer need to pre-register the premises with the Environment Agency. However the consignment note duties remain in full force: every transfer of hazardous waste needs a consignment note, the carrier and destination must hold the appropriate environmental permit and waste carrier registration, and the producer must retain the consignment note for at least three years. In Wales premises notification still applies; in Scotland the SEPA consignment note (Special Waste Consignment Note) and pre-notification regime applies. Always check the regional rules where you work.",
  },
  {
    question: "What is a mirror code in the European Waste Catalogue?",
    answer:
      "A mirror code is a pair of EWC entries — one with an asterisk (hazardous) and one without (non-hazardous) — describing the same general waste stream. The producer must assess the specific waste against the hazardous property (HP) thresholds to decide which code applies. For example, paint waste has both a hazardous and a non-hazardous mirror code; the right code depends on the actual paint composition. Absolute entries (always asterisked, no non-hazardous mirror) bypass the assessment — they are always hazardous. Most electrical-trade waste streams use absolute codes, simplifying the decision.",
  },
  {
    question: "Are LED lamps hazardous waste like fluorescent tubes?",
    answer:
      "Generally no — LED lamps do not contain mercury and so do not fall under the absolute hazardous EWC code 20 01 21* that catches fluorescents. LED lamps are still WEEE (Cat 3 Lamps) and must be routed via the WEEE channels for recycling. Some LED lamps contain small electronic components or specific materials that might trigger hazardous classification under specific assessment, but the general consumer LED lamp is non-hazardous WEEE. Fluorescent tubes, CFLs, sodium lamps, metal halide lamps and similar gas-discharge sources do contain mercury or other regulated substances and follow the hazardous waste regime.",
  },
  {
    question: "What is the European Waste Catalogue called now in UK law?",
    answer:
      "After Brexit the catalogue is referred to as the List of Waste in UK regulations (the List of Wastes (England) Regulations 2005 originally implemented it and remain in force). The structure and codes remain the same six-digit format inherited from the EU Waste Framework Directive — chapter, sub-chapter and entry, with an asterisk for absolute hazardous entries. Most waste documentation still calls it the EWC code in everyday usage and either term is understood by waste carriers and treatment facilities.",
  },
  {
    question: "What is an environmental permit and which destinations need one?",
    answer:
      "An environmental permit under EPR 2016 is a site-specific authorisation issued by the Environment Agency (or SEPA / NRW / NIEA) covering a regulated activity — typically waste treatment, energy from waste, water discharge or installation operations. Any waste treatment facility you transfer waste to must hold the appropriate permit for the waste types and operations involved. The EA public register lets you confirm by site name or permit reference that the destination is properly authorised. A 30-second check at the point of transfer is the standard compliance step. Where the destination is operating without a valid permit, the Duty of Care passes the liability for any subsequent illegal disposal back to the producer.",
  },
  {
    question: "Where does the waste hierarchy duty actually apply on a small electrical job?",
    answer:
      "On every job. The most practical application is at three points. First, at order stage — order accurately to avoid surplus that becomes waste. Second, at strip-out — segregate accessories that could be cleaned and resold for re-use, copper for recycling, mixed waste for recovery. Third, at the documentation step — the waste transfer note now requires the producer to declare the hierarchy has been applied. The whole exercise is light-touch on a small job once the team is in the habit; on a large strip-out it can save real money by identifying re-usable kit before it goes to bulk recycling.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 3"
            title="Hazardous Waste Regs, EPR and the waste hierarchy"
            description="The Hazardous Waste Regulations 2005, the Environmental Permitting Regulations 2016, and the statutory waste hierarchy under regulation 12 of the Waste (England and Wales) Regulations 2011. The complete framework for what counts as hazardous, who needs what permit, and the legal order of preference for disposing of any waste an electrician produces."
            tone="emerald"
          />

          <TLDR
            points={[
              "The Hazardous Waste Regulations 2005 require a Hazardous Waste Consignment Note for every transfer of hazardous waste — fluorescent tubes, PCB ballasts, batteries, oil-filled transformers, asbestos-bearing accessories. Retain for at least three years.",
              "The Environmental Permitting Regulations 2016 are the umbrella permitting framework — waste carrier registration, environmental permits for treatment facilities, brokers and dealers all sit under EPR.",
              "The waste hierarchy (prevention then preparation for re-use then recycling then other recovery then disposal) is a legal duty under regulation 12 of the Waste (England and Wales) Regulations 2011 — the producer must take all reasonable steps to apply it in order.",
              "EWC codes with an asterisk (e.g. 20 01 21* fluorescent tubes) are absolute hazardous waste, always hazardous regardless of concentration. Mirror codes require a hazardous-property assessment.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish a Hazardous Waste Consignment Note from a standard waste transfer note and identify which document is required for which waste stream on a typical electrical strip-out.",
              "Apply the waste hierarchy under regulation 12 of the Waste (England and Wales) Regulations 2011 to a real strip-out scenario and justify departures from the order on environmental grounds.",
              "Identify the role of the Environmental Permitting Regulations 2016 in waste carrier registration, brokerage, treatment site authorisation and producer compliance.",
              "Recognise the absolute hazardous waste EWC codes for the common electrical-trade waste streams (fluorescent tubes, PCB ballasts, lead-acid batteries, nickel-cadmium batteries, asbestos-bearing construction materials).",
              "Use the Environment Agency public registers to verify waste carrier registration and environmental permit authorisation at the point of transfer.",
              "Describe the consequence chain for breach of Duty of Care, including civil sanctions, variable monetary penalties and criminal prosecution under the Environmental Protection Act 1990 and the Environmental Permitting Regulations 2016.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Hazardous waste — what counts and what to do with it</ContentEyebrow>

          <ConceptBlock
            title="Hazardous Waste Regulations 2005 — a stricter regime layered on the Duty of Care"
            plainEnglish="The Hazardous Waste (England and Wales) Regulations 2005 (and the equivalent Special Waste Regulations 1996 in Scotland) define waste as hazardous when it has one or more of the hazardous properties listed in the Waste Framework Directive — flammable, toxic, ecotoxic, irritant, infectious, carcinogenic and similar. The catalogue (List of Waste, formerly EWC) provides codes for every recognised waste stream; codes with an asterisk are absolute hazardous, codes without are non-hazardous, and mirror codes require an assessment. Hazardous waste must travel under a Hazardous Waste Consignment Note rather than a standard waste transfer note, and the regime imposes additional duties on the producer, carrier and destination."
            onSite="Most electrical strip-outs generate at least some hazardous waste — fluorescent tubes from any commercial site refit, lead-acid batteries from older alarm or emergency-light installations, nickel-cadmium batteries from older battery-backed kit, oil-filled transformers in rare commercial applications, and asbestos-bearing items in older installations. Identifying the hazardous fraction at strip-out and routing it correctly is part of the waste segregation routine. Mixing hazardous and non-hazardous waste contaminates the entire stream and is itself a breach. A two-bin segregation (hazardous in one container, general WEEE in another) is the simplest control."
          >
            <p>
              The hazardous electrical-trade waste streams you will most commonly meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fluorescent tubes (EWC 20 01 21*)</strong> — mercury-containing,
                absolute hazardous. Transport intact (do not crush) to prevent mercury
                vapour release. Specialist tube-recycling collection is the standard
                route; many wholesalers provide a take-back tube.
              </li>
              <li>
                <strong>Compact fluorescent lamps and other discharge lamps</strong> — same
                EWC code as tubes, same handling rules, same mercury content.
              </li>
              <li>
                <strong>Older transformer / capacitor units containing PCBs (EWC 16 02 09*)</strong>{' '}
                — pre-1986 ballasts and transformer oils may contain polychlorinated
                biphenyls. Specialist PCB disposal route, never general WEEE.
              </li>
              <li>
                <strong>Lead-acid batteries (EWC 16 06 01*)</strong> — old emergency
                lighting battery packs, alarm system battery packs, UPS battery strings.
                Lead is a regulated heavy metal; battery recycling is well-established.
              </li>
              <li>
                <strong>Nickel-cadmium batteries (EWC 16 06 02*)</strong> — older battery
                backed equipment. Cadmium is highly toxic; specialist recycling route.
              </li>
              <li>
                <strong>Lithium-ion batteries</strong> — listed under EWC 16 06 05 (and
                related codes); some categorisations treat damaged Li-ion as hazardous and
                some not, but the safer site practice is to treat all Li-ion as
                requiring specialist recycling and to treat damaged Li-ion as hazardous
                regardless.
              </li>
              <li>
                <strong>Asbestos-containing electrical accessories (EWC 17 06 05*)</strong>{' '}
                — pre-2000 consumer unit backplates, distribution board enclosures,
                cement-bound wiring containment in older industrial installations. Falls
                under the Control of Asbestos Regulations 2012 in addition to the
                hazardous waste regime.
              </li>
              <li>
                <strong>Waste oils (EWC 13 02 05* and related)</strong> — transformer oil,
                some heating system oils. Specialist oil recovery contractors handle the
                transport and treatment.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), regulation 35 (Consignment notes)"
            clause={
              <>
                Hazardous waste shall not be removed from any premises unless a
                consignment note has been completed in accordance with the regulations,
                accompanies the waste throughout its transfer, and is signed by the
                producer or holder, the carrier, and the consignee. The producer (and
                where different the holder) shall retain a copy of the consignment note
                for a period of at least three years.
              </>
            }
            meaning={
              <>
                The consignment note is the legal instrument that distinguishes the
                hazardous waste regime from the standard Duty of Care. Skipping the
                consignment note (because it feels like extra paperwork or because the
                quantity feels small) is one of the most commonly enforced breaches in
                the hazardous waste regime. The Environment Agency uses consignment data
                to track flows and identify anomalies; producers whose hazardous waste
                outflows do not match expected production are routinely flagged for
                compliance review. Proper paperwork is the simplest defence.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005, regulation 35 (paraphrased); full text at legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The waste hierarchy — a legal duty, not a slogan</ContentEyebrow>

          <ConceptBlock
            title="Prevention beats re-use beats recycling beats recovery beats disposal"
            plainEnglish="The waste hierarchy is the order of preference for handling any waste stream. Prevention sits at the top — the best waste is the waste that never gets created. Preparation for re-use is next — repurposing items in their original form for the same or a different use. Recycling follows — material recovery for use in new manufacturing. Other recovery — including energy recovery from non-recyclable waste — sits below recycling because the material is destroyed even if some energy is captured. Disposal (typically landfill) is the last resort. Regulation 12 of the Waste (England and Wales) Regulations 2011 makes the hierarchy a legal duty on waste producers."
            onSite="On a typical electrical job the hierarchy applies in three places. First, at the order stage — accurate ordering prevents surplus material. Second, at strip-out — segregate items that could be re-used (working accessories, intact luminaires) from items destined for recycling (cable copper, plastic) from items destined for recovery or disposal (irreparable broken kit). Third, at the documentation step — the standard waste transfer note now includes a producer declaration that the hierarchy has been applied. The exercise is light-touch on a small job; on a large commercial strip-out it can identify thousands of pounds of re-usable kit that would otherwise have been bulk-recycled."
          >
            <p>
              The five levels of the hierarchy with practical electrical-trade examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Prevention</strong> — order accurately, design out waste at
                specification stage, choose modular accessories that can be partially
                replaced rather than fully discarded. The cheapest waste is the waste that
                never existed.
              </li>
              <li>
                <strong>2. Preparation for re-use</strong> — clean and resell working
                accessories on second-hand commercial markets, donate working kit to
                community projects or charities (some accept stripped-out commercial
                lighting), retain spare parts for stock.
              </li>
              <li>
                <strong>3. Recycling</strong> — separate cable copper for scrap merchant
                sale, separate aluminium for scrap, route plastic and glass through
                appropriate recycling streams, route WEEE through AATFs for material
                recovery.
              </li>
              <li>
                <strong>4. Other recovery</strong> — non-recyclable plastics into
                energy-from-waste plant which captures the chemical energy as electricity
                and heat. Above landfill in the hierarchy because some value is recovered.
              </li>
              <li>
                <strong>5. Disposal</strong> — landfill or incineration without energy
                recovery. The last resort, used only where no higher hierarchy step is
                practicable on environmental grounds.
              </li>
            </ul>
            <p>
              Departures from the order are allowed where they deliver a better
              environmental outcome on a life-cycle assessment basis — but the burden of
              justifying the departure sits on the waste producer. In practice that means
              recording the reasoning on the waste transfer note or in the project waste
              management plan.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Waste (England and Wales) Regulations 2011 (SI 2011/988), regulation 12 (Duty in relation to the waste hierarchy)"
            clause={
              <>
                An establishment or undertaking which imports, produces, collects,
                transports, recovers or disposes of waste, or which as a dealer or broker
                has control of waste, must on the transfer of waste take all such measures
                available to it as are reasonable in the circumstances to apply the
                following waste hierarchy as a priority order: prevention; preparation
                for re-use; recycling; other recovery (including energy recovery); and
                disposal.
              </>
            }
            meaning={
              <>
                Regulation 12 is the legal hook that elevates the waste hierarchy from
                guidance to duty. Every waste transfer note in England and Wales now
                includes a producer declaration that the hierarchy has been applied. A
                contractor who routinely defaults to bulk skip disposal without
                considering re-use or recycling is in breach even if the disposal route is
                otherwise legal. The Environment Agency does not normally enforce against
                isolated minor cases but does use the regulation as a basis for systemic
                action against contractors with no demonstrable hierarchy practice.
              </>
            }
            cite="Source: Waste (England and Wales) Regulations 2011, regulation 12 (paraphrased); full text at legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EPR 2016 — the permitting umbrella</ContentEyebrow>

          <ConceptBlock
            title="Environmental Permitting Regulations 2016 — one framework, many activities"
            plainEnglish="The Environmental Permitting (England and Wales) Regulations 2016 (EPR 2016) consolidated dozens of older permitting regimes into one framework. EPR covers waste activities (carrying, brokering, treating, transferring, depositing), water discharges, radioactive substances and certain installations. For an electrical contractor the relevant parts of EPR are the waste carrier registration regime (lower-tier free for own-waste-only businesses, upper-tier paid for businesses carrying third-party or construction waste), the broker / dealer registration, and the environmental permitting of waste treatment destinations. Anyone the contractor transfers waste to must hold the appropriate authorisation under EPR."
            onSite="The practical compliance routine is short. Register the business as a lower-tier waste carrier with the Environment Agency (free, online, takes about ten minutes). Where waste is collected by a third party, check their waste carrier registration on the EA public register at the point of transfer. Where waste goes to a treatment destination, check the environmental permit on the EA public register before the first transfer. Keep records of the checks. The whole compliance overhead, once set up, is small per job; the cost of being caught transferring waste to an unauthorised carrier or destination is large."
          >
            <p>
              The EPR-relevant activities for an electrical contracting business:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lower-tier waste carrier registration</strong> — free, for
                businesses carrying only their own controlled waste. Mandatory for any
                contractor transporting waste from customer sites in their own vehicles.
              </li>
              <li>
                <strong>Upper-tier waste carrier registration</strong> — paid (currently
                around 150 pounds for three years), for businesses carrying third-party
                waste or carrying construction and demolition waste from sites they did
                not generate it on. Required if the business operates as a waste
                clearance contractor in addition to electrical contracting.
              </li>
              <li>
                <strong>Broker or dealer registration</strong> — for businesses that
                arrange waste transfers without taking physical possession. Less common
                in the electrical trade.
              </li>
              <li>
                <strong>Environmental permit</strong> — for businesses operating a waste
                treatment site, energy from waste plant, or other regulated installation.
                Not normally relevant to electrical contractors but always relevant to
                the destination they send waste to.
              </li>
              <li>
                <strong>Exempt waste activities</strong> — certain low-impact waste
                activities are exempt from full permitting but require registration with
                the EA. Storage of small quantities of certain wastes pending transfer
                may fall here.
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

          <ContentEyebrow>Reading and using EWC codes correctly</ContentEyebrow>

          <ConceptBlock
            title="The List of Waste structure — six digits, with the asterisk telling you everything"
            plainEnglish="The List of Waste (formerly the European Waste Catalogue, EWC) is a single hierarchical catalogue of every recognised waste type. Every entry has a six-digit code structured as chapter (first two digits, e.g. 16 for waste not otherwise specified), sub-chapter (next two digits, e.g. 06 for batteries and accumulators) and entry (final two digits, e.g. 01 for lead-acid batteries). The asterisk on an entry (e.g. 16 06 01*) marks it as absolute hazardous waste — always hazardous regardless of any test or assessment. Non-asterisked entries are non-hazardous. Mirror entries (a hazardous and a non-hazardous code describing the same general waste type) require a hazardous-property assessment to choose between them."
            onSite="Reading the EWC code is part of the waste consignment note completion task. Most electrical-trade waste streams have well-known absolute codes, so consignment note completion is mostly a matter of looking up the standard code for the waste type. Memorising the half-dozen codes you will use most often (fluorescents, batteries, asbestos-bearing materials) makes the paperwork quick. Where the waste falls under a mirror code, a competent waste contractor will handle the hazardous-property assessment and recommend the right code; you then record it on the consignment note and retain the documentation."
          >
            <p>
              The EWC chapter structure with the chapters most relevant to the
              electrical trade highlighted:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 13</strong> — oil wastes and wastes of liquid fuels
                (transformer oils, hydraulic oils).
              </li>
              <li>
                <strong>Chapter 16</strong> — wastes not otherwise specified in the
                List. Includes batteries (16 06), end-of-life vehicles, transformers
                and capacitors (16 02), out-of-spec products. The most-used chapter for
                electrical-trade hazardous waste.
              </li>
              <li>
                <strong>Chapter 17</strong> — construction and demolition wastes,
                including asbestos-containing construction materials (17 06 05*) and
                cables (17 04 11 for non-hazardous, 17 04 10* for cables containing oil
                or hazardous substances).
              </li>
              <li>
                <strong>Chapter 19</strong> — wastes from waste management facilities
                (typically downstream of the original waste generator; less relevant to
                site work).
              </li>
              <li>
                <strong>Chapter 20</strong> — municipal wastes including separately
                collected fractions. Fluorescent tubes (20 01 21*), discarded
                electrical and electronic equipment (20 01 35* hazardous, 20 01 36
                non-hazardous mirror).
              </li>
            </ul>
            <p>
              Common electrical-trade absolute hazardous codes worth memorising:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>20 01 21*</strong> — fluorescent tubes and other mercury-containing waste</li>
              <li><strong>20 01 35*</strong> — discarded EEE containing hazardous components</li>
              <li><strong>16 06 01*</strong> — lead-acid batteries</li>
              <li><strong>16 06 02*</strong> — Ni-Cd batteries</li>
              <li><strong>16 02 09*</strong> — transformers and capacitors containing PCBs</li>
              <li><strong>16 02 13*</strong> — discarded equipment containing hazardous components other than those covered by 16 02 09 to 16 02 12</li>
              <li><strong>17 06 05*</strong> — construction materials containing asbestos</li>
              <li><strong>13 02 05*</strong> — non-chlorinated mineral-based engine, gear and lubricating oils</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Verifying carriers and destinations on the EA register</ContentEyebrow>

          <ConceptBlock
            title="The 30-second compliance check — using the Environment Agency public registers"
            plainEnglish="The Environment Agency operates a public online register of authorised waste carriers, brokers and dealers. SEPA (Scotland), NRW (Wales) and NIEA (Northern Ireland) operate equivalent registers. The register lets anyone look up a carrier by registration number, business name or location to confirm the carrier is currently authorised, the tier of registration (lower or upper) and the activities permitted. A second register lists environmental permits issued under EPR 2016, allowing verification of waste treatment destinations. Both registers are free to use and the look-up takes about 30 seconds per check."
            onSite="The right routine before any first waste transfer to a new carrier or destination: ask for the carrier registration number (or environmental permit number for a treatment site), look it up on the EA public register, confirm it is current and covers the waste types and activities involved, and note the result in the project waste records. Repeat the check periodically for repeat carriers — registrations lapse and carriers occasionally lose authorisation. The cost of a 30-second check before a transfer is small; the cost of being part of a chain that routes waste to an unauthorised destination is significant under the Duty of Care."
          >
            <p>
              The compliance check routine for a new waste carrier or destination:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ask for the registration number</strong> — every authorised
                waste carrier has a registration number issued by the EA, SEPA, NRW or
                NIEA. The number should be displayed on the carrier vehicle and on
                paperwork.
              </li>
              <li>
                <strong>Look up on the EA register</strong> — gov.uk hosts the EA Waste
                Carrier register; SEPA, NRW and NIEA host equivalent regional registers.
                Look up by registration number, business name or location.
              </li>
              <li>
                <strong>Confirm tier and activities</strong> — lower-tier covers
                businesses carrying only their own waste; upper-tier covers third-party
                and construction waste. Check the registration covers the activity
                involved.
              </li>
              <li>
                <strong>For destinations, look up the environmental permit</strong> —
                the EA Environmental Permit register lists permitted waste treatment
                sites. Confirm the permit covers the waste types and activities
                involved.
              </li>
              <li>
                <strong>Document the check</strong> — record the lookup date,
                registration / permit number and result in the project waste records.
                A simple spreadsheet log is enough.
              </li>
              <li>
                <strong>Repeat periodically</strong> — annually for repeat carriers, or
                if any concern arises about the carrier credibility.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Departures from the hierarchy — when they are justifiable</ContentEyebrow>

          <ConceptBlock
            title="When can a producer go down the hierarchy rather than up?"
            plainEnglish="Regulation 12 of the Waste (England and Wales) Regulations 2011 requires producers to take all reasonable steps to apply the waste hierarchy in order. But the regulation also recognises that strict adherence is not always the best environmental outcome — sometimes a lower hierarchy step delivers better whole-life environmental performance than a higher one when transport, treatment energy and cross-contamination are factored in. A producer may depart from the hierarchy where the departure delivers a better environmental outcome on a life-cycle assessment basis, but the burden of justification sits on the producer."
            onSite="Departures arise rarely on a typical electrical strip-out but they do occur. Examples: heavily contaminated cable that cannot be cleanly recycled may be better handled through energy recovery than through a low-quality recycling stream that produces poor-grade output. Bulky obsolete switchgear with little material recovery value may be more efficiently handled through energy from waste than through a long-distance transport to a specialist recycler. The key is to record the reasoning. The waste transfer note should note the hierarchy decision and the reason; on a larger project the project waste management plan should document the departure with supporting evidence (life-cycle considerations, transport distances, treatment options)."
          >
            <p>
              Examples of legitimate departures from the strict hierarchy order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heavily contaminated material</strong> — where the recycling
                output would be very low quality or where the recycling process itself
                would generate hazardous secondary waste, energy recovery may deliver
                better whole-life performance.
              </li>
              <li>
                <strong>Long-distance transport for marginal recycling gain</strong> —
                where the transport carbon outweighs the recycling benefit, local
                energy recovery can be more environmentally sound than long-distance
                specialist recycling.
              </li>
              <li>
                <strong>Negligible quantity</strong> — for very small quantities the
                administrative and environmental cost of a separate specialist stream
                may exceed the benefit; aggregation through a general WEEE stream may
                be the pragmatic answer.
              </li>
              <li>
                <strong>Health and safety risk in handling</strong> — where preparation
                for re-use or recycling would create a disproportionate health and
                safety risk to the workers handling it, a lower hierarchy step may be
                justified.
              </li>
            </ul>
            <p>
              In all cases the reasoning must be documented. An undocumented departure
              from the hierarchy looks like a Duty of Care breach; a documented one is
              defensible.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Project Waste Management Plans</ContentEyebrow>

          <ConceptBlock
            title="On larger projects, a Site Waste Management Plan is the working tool"
            plainEnglish="Site Waste Management Plans (SWMPs) were a statutory requirement for construction projects above a value threshold in England under the Site Waste Management Plans Regulations 2008 — that statutory requirement was repealed in 2013 in England, but SWMPs remain widely used as a voluntary best-practice tool and are required by some clients (BREEAM, public sector procurement, large prime contractors). A SWMP forecasts the waste types and quantities to be generated by a project, identifies the disposal routes, sets reduction and recycling targets, and tracks actual outcomes against the plan. On large electrical fit-outs and rewires the SWMP often sits within the broader project quality and environmental management documentation."
            onSite="As an apprentice on a project that uses a SWMP your role is normally data collection and segregation rather than plan authorship. The SWMP will define which waste streams are segregated on site (e.g. cable copper to one container, fluorescent tubes to another, general WEEE to a third, mixed builder waste to the skip) and which carriers are authorised for each. Following the segregation discipline accurately is part of the apprentice contribution to the SWMP. The same disciplines feed into the BREEAM Wst credits, the firm Carbon Reduction Plan scope 3 reporting and the customer sustainability questionnaires."
          >
            <p>
              The typical structure of a SWMP for an electrical fit-out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Project description</strong> — scope, value, expected duration
                and the responsible site manager and waste champion.
              </li>
              <li>
                <strong>Waste forecast</strong> — anticipated waste streams (WEEE
                categories, hazardous waste, cable copper, packaging, mixed
                construction waste) with estimated quantities by stream.
              </li>
              <li>
                <strong>Segregation strategy</strong> — which streams are segregated on
                site, what containers are provided, which areas they are placed in.
              </li>
              <li>
                <strong>Authorised carriers and destinations</strong> — named carriers
                and destinations for each stream with registration / permit numbers
                pre-verified against the EA register.
              </li>
              <li>
                <strong>Hierarchy targets</strong> — minimum recycling rate, minimum
                re-use rate, maximum landfill rate. BREEAM-certified projects normally
                target above-95% diversion from landfill.
              </li>
              <li>
                <strong>Tracking and reporting</strong> — actual waste tonnages by
                stream, transfer note and consignment note references, comparison
                against forecast and targets.
              </li>
              <li>
                <strong>Lessons learned</strong> — captured at project closeout for
                feedback into future SWMPs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Enforcement and the consequence chain</ContentEyebrow>

          <ConceptBlock
            title="What actually happens when the Environment Agency catches a breach"
            plainEnglish="The Environment Agency operates a graduated enforcement model that scales the regulatory response to the seriousness of the breach. Minor or first-instance breaches typically attract advice and guidance with a request to take corrective action. Repeated or more serious breaches attract civil sanctions including compliance notices, restoration notices and variable monetary penalties. The most serious breaches, including deliberate or repeated illegal disposal, attract criminal prosecution under the Environmental Protection Act 1990, the Environmental Permitting Regulations 2016 or the Hazardous Waste Regulations 2005. Penalties on conviction can include unlimited fines and, in extreme cases, imprisonment of company directors and officers personally."
            onSite="For an electrical contractor the practical exposure is mostly civil sanctions on minor breaches and reputational damage on the rest. A formal warning or variable monetary penalty appears on the public Environment Agency enforcement bulletin and will be picked up by procurement teams of any large customer doing supplier due diligence. The reputational consequences typically outweigh the direct financial penalty. The defence against this exposure is the routine compliance discipline this whole subsection has covered: segregate at source, use the right paperwork, verify carriers and destinations, retain records for the required periods, document hierarchy decisions. None of it is hard once embedded as habit; the cost of doing it well is small relative to the cost of doing it badly."
          >
            <p>
              The graduated EA enforcement model in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Advice and guidance</strong> — first-instance minor breach,
                typically a written request to take corrective action with no formal
                penalty.
              </li>
              <li>
                <strong>Compliance notice</strong> — formal notice requiring specific
                corrective action by a specific date. Failure to comply escalates to
                further sanction.
              </li>
              <li>
                <strong>Restoration notice</strong> — notice requiring the operator to
                restore the environmental damage caused by the breach.
              </li>
              <li>
                <strong>Variable monetary penalty</strong> — civil financial penalty
                proportionate to the breach. Published on the EA enforcement bulletin.
              </li>
              <li>
                <strong>Enforcement undertaking</strong> — voluntary agreement between
                operator and regulator to take specified action in lieu of formal
                sanction.
              </li>
              <li>
                <strong>Stop notice</strong> — formal notice prohibiting an activity
                pending compliance.
              </li>
              <li>
                <strong>Criminal prosecution</strong> — for the most serious or repeated
                breaches. Penalties on conviction include unlimited fines for the
                company and personal liability for directors and officers in extreme
                cases.
              </li>
            </ul>
            <p>
              The graduated model means most breaches do not escalate to criminal
              prosecution — but the lower steps still carry public reporting and
              reputational consequence that affects future tendering. The compliance
              discipline is its own defence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating fluorescent tubes as ordinary WEEE and routing them through the general lamp recycling stream"
            whatHappens={
              <>
                A commercial site refit generates a hundred old fluorescent tubes. The
                contractor bundles them into the WEEE collection at the wholesaler with
                the LED replacements. The wholesaler take-back is set up for non-hazardous
                lamps and accessories — not mercury-containing fluorescents. The tubes
                contaminate the lamp recycling stream, the wholesaler raises a complaint,
                and the contractor is exposed for failing to consign the hazardous waste
                correctly. The Environment Agency picks it up at the wholesaler audit.
                Civil sanction or formal warning follows.
              </>
            }
            doInstead={
              <>
                Segregate fluorescent tubes (and CFLs and other discharge lamps) into a
                dedicated container at strip-out. Transport intact — do not crush. Use a
                specialist fluorescent tube recycling carrier with the appropriate
                hazardous waste authorisation. Complete a Hazardous Waste Consignment
                Note for the transfer. Retain the consignment note for at least three
                years. The cost difference between general WEEE collection and specialist
                tube collection is small per tube and the compliance benefit is
                significant.
              </>
            }
          />

          <CommonMistake
            title="Defaulting to bulk skip disposal without considering re-use or recycling"
            whatHappens={
              <>
                A commercial fit-out generates several hundred working luminaires that the
                client wants stripped out as part of a brand refresh. The contractor
                sticks them all in a skip bound for landfill or general recycling. The
                luminaires were five years old, working, and in good condition — a
                second-hand commercial lighting market would have paid for some of them
                or taken the rest free. The waste hierarchy duty under regulation 12 has
                been ignored. On a competitive tender review the contractor cannot
                evidence any hierarchy practice and loses repeat work to a competitor
                that can.
              </>
            }
            doInstead={
              <>
                At pre-strip survey identify items that could be prepared for re-use.
                Maintain relationships with second-hand commercial fixture buyers,
                community re-use schemes and charities. Document the hierarchy decisions
                in a project waste management plan and reference them on the waste
                transfer note. The activity is largely common sense once established as
                routine; the regulatory benefit and the customer marketing benefit both
                line up with the environmental benefit.
              </>
            }
          />

          <Scenario
            title="Old commercial unit strip-out — the asbestos surprise"
            situation={
              <>
                You arrive at a small commercial unit for a full electrical strip-out
                ahead of a refit. The customer mentioned the building dates from the late
                1970s. As you start removing the old consumer unit you notice the
                backplate is a dense, fibrous, cement-like board rather than the metal or
                plastic of modern boards. The customer cannot find an asbestos register
                for the building. You have not received non-licensable asbestos training.
                What do you do?
              </>
            }
            whatToDo={
              <>
                Stop work immediately on that fitting. Do not disturb the backplate
                further. Asbestos-cement consumer unit backplates were used in some
                installations from the 1960s through the 1970s and into the 1980s; the
                visual cues you have noted are consistent with possible asbestos content.
                Without an asbestos register and without your own non-licensable asbestos
                training the right answer is to defer the work. Notify the customer in
                writing, request that they commission an asbestos survey from a UKAS
                accredited surveyor, and once the material is confirmed (or ruled out)
                arrange for either a licensed asbestos contractor or a competent
                non-licensable contractor to remove the backplate as appropriate. Do not
                proceed yourself. The waste, once removed, is hazardous waste under EWC
                17 06 05* and requires a Hazardous Waste Consignment Note to a permitted
                asbestos disposal facility.
              </>
            }
            whyItMatters={
              <>
                Asbestos remains one of the leading causes of occupational disease deaths
                in the UK trades and the regulatory regime is correspondingly strict.
                Even non-licensable asbestos work requires specific training and
                competence. The cost of a survey and a competent asbestos contractor is
                small relative to the cost of a disturbed asbestos exposure event. As an
                apprentice the safe answer is always to stop, document, and refer up.
                Customers may grumble at the delay; nobody complains in retrospect about
                an electrician who did not give them an asbestos exposure.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Chapter 57 (stationary secondary battery installations)"
            clause={
              <>
                For the purposes of Chapter 57, &apos;stationary secondary battery installations&apos;
                refers to batteries whose designed purpose is for storage and supply of electrical
                installations. Where a stationary secondary battery is incorporated into a product
                that is covered by product safety standards, Chapter 57 is not applicable to that
                battery installation.
              </>
            }
            meaning={
              <>
                When decommissioning end-of-life kit, the line between &quot;Chapter 57 stationary
                battery&quot; (home BESS) and &quot;product-integrated battery&quot; (UPS, emergency
                lighting unit) decides which disposal route applies. Get this wrong and you risk
                applying the wrong waste classification — fire-risk packaging, transport rules and
                producer-responsibility paperwork all differ.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 57."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Hazardous Waste Regulations 2005 require a Hazardous Waste Consignment Note for every transfer of hazardous waste — fluorescent tubes, PCB ballasts, batteries, asbestos-bearing items.",
              "Retain consignment notes for at least three years (versus two years for standard waste transfer notes).",
              "Environmental Permitting Regulations 2016 are the umbrella permitting framework — register as a lower-tier waste carrier (free) and check carriers / destinations on the Environment Agency public registers.",
              "The waste hierarchy under regulation 12 of the Waste (England and Wales) Regulations 2011 is a legal duty: prevention, preparation for re-use, recycling, other recovery, disposal.",
              "EWC codes ending with an asterisk (e.g. 20 01 21*) are absolute hazardous waste regardless of concentration. Mirror codes require a hazardous-property assessment.",
              "Common electrical-trade hazardous waste streams: fluorescent tubes, PCB ballasts, lead-acid batteries, nickel-cadmium batteries, asbestos-bearing electrical materials, waste oils.",
              "Mixing hazardous and non-hazardous waste contaminates the entire stream and is itself a breach. Segregate at source.",
              "The Environment Agency, SEPA, NRW and NIEA enforce. Civil sanctions, variable monetary penalties and criminal prosecution are all available.",
            ]}
          />

          <Quiz title="Hazardous waste, EPR and the hierarchy — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 WEEE and lithium-ion safety
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 EPDs and cable manufacturer disclosures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
