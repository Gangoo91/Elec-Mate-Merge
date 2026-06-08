/**
 * Module 2 · Section 6 · Subsection 2 — WEEE Regs 2013, lithium-ion battery fire risk, safe storage
 * City & Guilds 2365-03 / Unit 301 / Sustainable working practices
 *
 * Layered depth: 2357 Unit 602 ELTK02 / LO2 supplementary — UK WEEE producer obligations,
 * collection facility duties, lithium-ion battery thermal runaway hazards, segregation and
 * site storage practice for damaged or end-of-life cells.
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
  'WEEE Regs and lithium-ion battery fire risk (6.2) | Level 3 Module 2.6.2 | Elec-Mate';
const DESCRIPTION =
  'Waste Electrical and Electronic Equipment Regulations 2013 — categories of WEEE, producer responsibility, the role of approved authorised treatment facilities, and the specific fire risk posed by lithium-ion batteries (thermal runaway, segregation, safe storage and transport for site work).';

const checks = [
  {
    id: 'l3-m2-s6-sub2-categories',
    question:
      "You are stripping out an old kitchen rewire. Which of these items is WEEE under the Waste Electrical and Electronic Equipment Regulations 2013?",
    options: [
      "All of them — the old fuse board, the under-cabinet LED strips, the extractor fan motor, the integrated oven, the lighting transformers, the ceiling pendants. WEEE covers any equipment dependent on electric currents or electromagnetic fields to work properly. Cable offcuts and fixings are not WEEE but are still controlled waste under the Environmental Protection Act 1990 Duty of Care.",
      "The 110 V supply on site is centre-tapped earthed (CTE), so the voltage between either leg and earth is only 55 V. A faulty tool that ends up with the case live to one leg only puts 55 V between the casing and the operative, not 230 V. Combined with a 30 mA RCD at the transformer this dramatically reduces shock energy and survivability if something goes wrong.",
      "A heat pump struggles in a poorly-insulated house with undersized radiators — it’s designed to deliver lots of low-temperature heat, not a little high-temperature heat. The realistic CoP will be poor (closer to 2 than 3), the running costs will surprise the customer, and the property may need insulation upgrades and rad-replacement first. Be honest before quoting.",
      "Most electricians take a 1-day refresher course within 3-6 months of an amendment, then sit the updated 2382 within 12 months. CPS schemes typically expect QS-named individuals to be current within 12 months. Working without updated knowledge means signing certificates against outdated standards — both a competence concern and a scheme compliance risk.",
    ],
    correctIndex: 0,
    explanation:
      "WEEE is broadly drawn. Anything that needed electricity to function falls in scope, from a 9 V smoke alarm to a three-phase commercial oven. The old kitchen strip-out is a textbook WEEE-rich job. The waste must be segregated and routed to an Approved Authorised Treatment Facility (AATF), normally via a registered waste carrier. Cable copper goes to scrap separately and is not WEEE but is itself valuable recyclable material.",
  },
  {
    id: 'l3-m2-s6-sub2-thermal-runaway',
    question:
      "You drop a lithium-ion battery pack from a cordless drill onto a concrete floor. The case is dented but the battery is still warm to touch ten minutes later and the connector area looks slightly swollen. What does that combination warn you of?",
    options: [
      "Three steps. (1) MINIMISE the damage during the work — score around the tile carefully; remove only the affected tile(s); save them for re-fit if intact. (2) MAKE SAFE the tile area — no exposed substrate, no sharp edges, no water-ingress path. (3) BRIEF THE CUSTOMER — explain what tiles were affected; recommend a tiler for re-fit (referrals are good business); document the damage on the job sheet. The electrician doesn't normally re-tile (specialist trade with tile-cutting tools, adhesives, grout) but is responsible for minimising damage AND informing the customer.",
      "Possible thermal runaway in progress. Mechanical damage can pierce the internal separator inside a Li-ion cell, creating an internal short circuit. The short discharges energy as heat, which raises cell temperature, which decomposes the electrolyte, which generates more heat — a positive feedback loop. Once started, runaway is essentially unstoppable and can vent flammable / toxic gas (HF, CO, hydrocarbons) and ignite. Move the battery to an open outdoor location away from buildings and other batteries on something non-combustible (sand, brick), evacuate the area, call the fire service and do not put it back in the tool or charger.",
      "Two layers. (1) Check the charger's own diagnostic LEDs / app — the Wallbox app gives a fault code; flashing red on Pulsar Plus typically codes as 'communication or vehicle handshake fail'. The SAE J1772 / IEC 61851 protocol is a low-voltage 12 V handshake (the charger sends a PWM signal on the CP pin; the vehicle pulls the line down through resistors to indicate state); a flaky cable, a dirty plug or an EV-side software issue can fail the handshake without the L–N–E circuit being faulty. (2) Verify with a second known-good vehicle if available — if the second car charges, the fault is in the customer's car, not the charger or the wiring. The L3 apprentice does NOT replace the wallbox without first ruling out the J1772 handshake and the customer's vehicle.",
      "The fridge motor's start-up draws inrush current (typically 6–10× running current). The fridge runs at maybe 1.5 A; inrush is 9–15 A for 100 ms. That sudden current causes a voltage drop along the supply path. If the supply path has higher-than-design impedance — undersized cable, HRJ at a termination, oversized circuit relative to cable — the voltage drop is large enough to dim the lights momentarily. Most likely cause on older installations: HRJ at the consumer-unit incoming tail or the meter tails. On newer installations: undersized cable for the load. Diagnosis: clamp meter on the incoming tail during fridge cycle reveals the voltage drop magnitude; thermal imaging finds the HRJ.",
    ],
    correctAnswer: 1,
    explanation:
      "Thermal runaway is the defining failure mode of lithium-ion cells and the entire reason for the careful storage and transport regime. Heat plus damage plus visible swelling is the classic warning. Once a cell vents it can start a chain reaction in any cells nearby — which is why segregation between battery packs in storage matters. Water is largely ineffective on a Li-ion fire because the cell carries its own oxidiser; lots of water can cool surrounding cells and limit spread but will not put out the burning cell quickly. The London Fire Brigade publishes regular guidance on the rising rate of e-bike, e-scooter and tool battery fires in domestic settings.",
  },
  {
    id: 'l3-m2-s6-sub2-storage',
    question:
      "Your van has been carrying a mix of new tool batteries, used tool batteries due for return, and one obviously damaged battery from a customer site. What is the right way to organise them for storage?",
    options: [
      "Research suggests neurodivergence — dyslexia, ADHD, and autism — may be more common in trade roles than the general population. Some studies suggest dyslexia at materially higher rates in trade and creative industries (the visual-spatial reasoning associated with dyslexia is often a strength in hands-on work). ADHD and autism prevalence in the trade is also frequently reported as elevated. The Equality Act 2010 reasonable-adjustments duty (s.20) applies where the condition has a substantial and long-term effect, and Sub 5.2 covers the practical adjustments in detail.",
      "Three separate containers. New batteries in their original packaging or a dedicated lithium-safe storage box, separated from the others. Used but undamaged batteries in a metal container with terminals taped or with cell-tray separation to prevent short circuits. The damaged battery in a separate fire-resistant container (vermiculite, sand or a purpose-made Li-ion bag), stored away from the van interior and away from other batteries, and returned to a battery recycling collection point as soon as practical. Never stack damaged with undamaged.",
      "DUAL-RCD CU — two main RCDs, each protecting a group of circuits via standard MCBs. Cheaper to install but a single fault on one circuit trips the entire RCD's group (e.g. a fault on the kitchen ring trips all circuits on RCD1, including the freezer and lights). ALL-RCBO CU — every circuit has its own RCBO with both overcurrent and earth-leakage protection. More expensive but a fault on one circuit only affects that circuit. Cumulative leakage is also limited per circuit. A4:2026 reinforces RCBO-per-circuit for higher-occupancy dwellings; trade preference is RCBO-per-circuit for any new install.",
      "Five trades, five scopes. ELECTRICIAN — electrical work + make-good (filling, sealing, fire-stopping). PLASTERER — preparation, scrim, bond, skim of larger areas; finishing plaster surface. TILER — cutting, adhesive, fitting, grouting tiles; specialist tools. PAINTER / DECORATOR — preparation, primer, top-coat, decorative finishes. BUILDER — structural / load-bearing work; brick / block / concrete repair. Each trade has its competence boundary; the electrician's work is electrical + minimal building-fabric restoration. Specialist trades for finishing.",
    ],
    correctAnswer: 1,
    explanation:
      "The reasoning is fire propagation. A single damaged cell going into thermal runaway can ignite cells in physical contact with it. Segregation is the simplest control. Tool batteries returned to a manufacturer scheme or an AATF must be packaged correctly (UN 3480 / 3481 lithium-ion transport rules apply once the battery leaves your direct control). Mixing damaged and undamaged batteries in a single container in a hot van in summer is an easily-avoided fire risk. The Health and Safety Executive and the London Fire Brigade both have site guidance on Li-ion handling.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does the Waste Electrical and Electronic Equipment (WEEE) Regulations 2013 require of someone who removes electrical kit from a customer property as part of a rewire or replacement?",
    options: [
      "Stay with them if you can do so safely. Encourage them to call 999 or go to A&E. If they won't, and you genuinely believe they're at imminent risk, call 999 yourself or take them to A&E. The Samaritans (116 123) is available 24/7 if it helps to talk while you decide what to do. Mind's helpline is available too (0300 123 3393). Don't promise confidentiality you can't keep — be honest that you may need to escalate if you're worried about their safety. After the immediate crisis is managed, look after yourself too — supporting someone through a mental health crisis is heavy and the same charities are available to you.",
      "WEEE removed during install or repair must be segregated from general waste and routed to an Approved Authorised Treatment Facility (AATF) for recovery and recycling. The waste producer (you or your employer) holds the Duty of Care under the Environmental Protection Act 1990 to ensure the waste is properly described, transferred to an authorised waste carrier, and accompanied by a waste transfer note that is retained for at least two years. Many electrical wholesalers operate as WEEE collection points under the Distributor Take-Back Scheme.",
      "Written grievance following the employer's documented grievance procedure (which the employer is required to provide under the ACAS Code of Practice on Discipline and Grievance). The written grievance triggers a structured response with timescales and right of appeal. Verbal complaints are easy to ignore; documented grievances are not. ACAS conciliation is available if the internal process fails.",
      "AFDDs are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series. Acceptance of the exemption requires verification that the EV charging equipment conforms to the BS EN 61851 series (manufacturer declaration, marking, datasheet or test report) and that any socket-outlet or vehicle connector incorporated in the EV charging equipment conforms to BS EN IEC 62196-2.",
    ],
    correctAnswer: 1,
    explanation:
      "The WEEE Regs sit alongside the Environmental Protection Act 1990 Duty of Care. As an electrician removing kit on a customer site you are the waste producer for the WEEE you generate. Routing it to an AATF (often via the wholesaler take-back) is the simplest compliant route. Skipping the segregation step (e.g. dumping a fuse board in a builder skip) is a common breach that the Environment Agency does enforce against.",
  },
  {
    id: 2,
    question:
      "What is thermal runaway in a lithium-ion battery and why is it the key safety hazard for tool batteries on site?",
    options: [
      "Appendix 6 — model forms for certification and reporting. The appendices to BS 7671 also include Appendix 1 (British Standards referenced), Appendix 4 (cable current-carrying capacity and voltage drop tables), Appendix 15 (ring and radial final circuit arrangements) and Appendix 17 (energy efficiency). Knowing the appendices by topic is half of installer navigation.",
      "Explaining the situation in person, leading with the safety reason (\\\\\\\"I have found a section of wiring that does not meet current safety standards\\\\\\\"), showing the specific issue where possible, expressing empathy for the inconvenience (\\\\\\\"I understand this is not what you were expecting\\\\\\\"), presenting options rather than a single demand, and giving the client time to process before requiring a decision",
      "A self-sustaining exothermic chain reaction inside a Li-ion cell. Damage, overcharge, internal manufacturing defect or external heat triggers an internal short circuit, which generates heat, which decomposes the organic electrolyte, which generates more heat and flammable / toxic gas, which can ignite. Once the chain reaction has started in one cell the heat can propagate to neighbouring cells in the pack. The fire is intense, fast, and self-fuelling because the cell carries its own oxidiser within the cathode material.",
      "Three separate containers. New batteries in their original packaging or a dedicated lithium-safe storage box, separated from the others. Used but undamaged batteries in a metal container with terminals taped or with cell-tray separation to prevent short circuits. The damaged battery in a separate fire-resistant container (vermiculite, sand or a purpose-made Li-ion bag), stored away from the van interior and away from other batteries, and returned to a battery recycling collection point as soon as practical. Never stack damaged with undamaged.",
    ],
    correctAnswer: 2,
    explanation:
      "Thermal runaway is the failure mode that drives every other Li-ion safety control. Cell separators, battery management systems, fuses, charge curves and safe-storage rules all exist to prevent it starting and to limit the spread if it does. Tool batteries on site — drilled, dropped, immersed, stored in hot vans and overcharged on cheap aftermarket chargers — have all of the trigger conditions present. Treating them with the same care as you would a small petrol container is the correct mental model.",
  },
  {
    id: 3,
    question:
      "A customer asks you to dispose of a swollen, end-of-life lithium-ion solar battery from their garage. What is the safest correct route?",
    options: [
      "Public Liability (PL, typically £5-10m cover, £200-500/year), Employers' Liability (EL, statutory minimum £5m under the Employers' Liability (Compulsory Insurance) Act 1969 — required if you have any employees), Professional Indemnity (PI, £1-2m cover for design liability if you do any design work, £300-800/year), Tools-in-Transit insurance, Business Vehicle insurance for company vans. Plus director and officer cover for the directors personally.",
      "Rented domestic properties in England — including most assured shorthold tenancies, licences to occupy, and HMOs. Excludes social housing tenancies under separate regulation, lodger arrangements where the landlord shares the dwelling, long leases (7+ years), student halls of residence under separate regimes, and accommodation provided to family members. Wales has its own equivalent (Renting Homes Wales Act 2016 plus the Renting Homes — Fitness for Human Habitation Regulations 2022); Scotland has the Housing (Scotland) Act 2006 plus tolerable standard / repairing standard guidance; Northern Ireland follows similar requirements via the Housing (Northern Ireland) Order 2003.",
      "A JIB-graded employer is a firm that has signed up to the JIB Working Rule Agreement and undertakes to pay at least JIB minimum rates and follow JIB conditions (holiday, sick pay, pension, apprentice training rules). For an apprentice this matters because JIB-graded firms are bound to follow the JIB Apprentice Code of Practice — named mentor, structured training, Stage progression on evidence, paid college time.",
      "Do not transport it in your vehicle without specialist packaging. A swollen battery is a damaged battery and is classed as dangerous goods for transport (UN 3480/3481, Class 9). Photograph the unit, isolate it from other equipment, ventilate the area, and either contact the original manufacturer take-back scheme or arrange collection by a specialist hazardous-waste carrier. Many domestic solar battery manufacturers operate a free end-of-life take-back. The customer holds the Duty of Care for their own household waste; you can advise but should not transport a damaged unit unpackaged.",
    ],
    correctAnswer: 3,
    explanation:
      "A swollen Li-ion cell is in a pre-runaway state and the safe-handling regime treats it accordingly. UK transport of damaged Li-ion batteries is regulated under ADR 2025 and requires specific packaging, labelling and documentation. A polite refusal to transport, plus the right contact details for the manufacturer take-back, is the correct apprentice response. Domestic battery storage systems (Tesla Powerwall, GivEnergy, Sonnen and similar) all have take-back routes. Where doubt exists the local hazardous-waste contractor is the right call.",
  },
  {
    id: 4,
    question:
      "Why is putting all your end-of-life lithium-ion tool batteries in one cardboard box at the back of the van a poor practice?",
    options: [
      "Loose terminals can short against neighbouring batteries or against tools and metal fixings, generating heat and potentially triggering a thermal runaway. Cardboard provides no fire resistance. A van interior in summer can reach 50-60 degC, raising the rest state of every cell. If one cell vents the entire box can propagate the runaway. The right arrangement is a metal or fire-resistant container with cell-tray separation or terminal taping, kept out of direct sun, and emptied to a recycling point regularly.",
      "Where a 'provision, criterion or practice', a physical feature, or a lack of an auxiliary aid puts a disabled person at a substantial disadvantage compared with others, the employer must take such steps as it is reasonable to take to avoid the disadvantage. Three sub-duties — adjust the practice, adjust the physical feature, provide the auxiliary aid. The duty is anticipatory in some contexts (services) and reactive in employment (kicks in when the employer knows or ought reasonably to know).",
      "CDM 2015 Reg 13(1)(a) requires the principal contractor to plan, manage and monitor the construction phase. In practice this includes site sign-in / sign-out registers, attendance at toolbox talks, RAMS sign-on records, and any permit records. These records combine with the apprentice's own records to form a full picture of who was on site doing what when. The records are commonly required after any incident or in any later dispute.",
      "Apprenticeship standards (gov.uk) require evidence of at least 20% of the apprenticeship being off-the-job training. The log records day-release at college, online courses, structured study time, shadowing in unfamiliar areas, and any other learning activity outside normal productive work. Without it, the apprenticeship may not meet the standards required for the End-Point Assessment to be funded and certified.",
    ],
    correctAnswer: 0,
    explanation:
      "Van fires from Li-ion battery accumulation are a well-documented and rising trend among UK trades. The fix is unglamorous: a metal toolbox section, terminal taping or cell trays, regular emptying. The cost is low and the risk reduction is significant. Insurers are increasingly excluding cover for fires arising from accumulated Li-ion stock, so the commercial case lines up with the safety case.",
  },
  {
    id: 5,
    question:
      "Which legal duty sits over the top of the WEEE Regulations and applies to all controlled waste generated by an electrical contractor?",
    options: [
      "An EICR carried out and signed by a competent person (usually a CPS-registered contractor) in accordance with BS 7671 Part 6 / IET GN3, at the recommended frequency for the premises type, with a satisfactory or remediated outcome. Without that, the insurer's claim that the installation wasn't maintained to current standards is hard to refute.",
      "The Duty of Care under section 34 of the Environmental Protection Act 1990. The waste producer must take all reasonable steps to ensure waste is contained, transferred only to authorised persons, properly described in a waste transfer note (or hazardous waste consignment note where applicable), and ultimately recovered or disposed of by an authorised facility. Duty of Care applies regardless of whether the waste is also covered by WEEE, Hazardous Waste Regulations or other regimes.",
      "Roughly £400-800/year for the basic stack: PL £5-10m (£200-500), Tools-in-Transit (£100-300), van insurance (commercial separately, typically £600-1,200/year for a small van). Add EL if you have an apprentice (£200-600). Add PI if you do any design work (£200-500). Total annual insurance bill for a sole trader with apprentice and design work: roughly £1,500-2,500.",
      "Three separate containers. New batteries in their original packaging or a dedicated lithium-safe storage box, separated from the others. Used but undamaged batteries in a metal container with terminals taped or with cell-tray separation to prevent short circuits. The damaged battery in a separate fire-resistant container (vermiculite, sand or a purpose-made Li-ion bag), stored away from the van interior and away from other batteries, and returned to a battery recycling collection point as soon as practical. Never stack damaged with undamaged.",
    ],
    correctAnswer: 1,
    explanation:
      "EPA 1990 section 34 is the umbrella duty for controlled waste. WEEE, Hazardous Waste and the Environmental Permitting Regulations all sit under it. The practical effect is that an electrician removing kit on site must keep waste transfer notes, must use a registered waste carrier, and must check that the destination is an authorised facility (an AATF for WEEE, a hazardous waste consignment for batteries above the threshold).",
  },
  {
    id: 6,
    question:
      "What is the simplest way to verify that a waste carrier removing WEEE from a customer site is properly authorised?",
    options: [
      "Yes — IET subscriptions are tax-deductible against income tax under HMRC's List 3 of approved professional bodies. Effectively reduces the cost by your marginal tax rate. For a higher-rate taxpayer (40%) the £200/year MIET subscription costs £120 net. List 3 covers most major UK professional bodies including IET, RICS, IMechE, IChemE etc.",
      "The Operations and Maintenance (O&M) pack — typically a bound document or PDF with: signed EIC (top-level), Schedule of Inspections, Schedule of Test Results, design pack (single-line, panel schedules, calculations), as-built drawings, Building Control Compliance Certificate (or notification reference), commissioning test results, departures log, manufacturer manuals for installed equipment, recommended maintenance schedule.",
      "Ask for and record their Environment Agency (or SEPA / NRW / NIEA) Waste Carrier Registration number, then verify it on the public Environment Agency Waste Carrier register before transferring the waste. Keep the waste transfer note showing the carrier number, vehicle registration, waste description and EWC code, signed by both parties. Retain for at least two years. A two-minute online check is the difference between compliant and not.",
      "Structured cabling is the standardised installation of data cabling (typically Cat 6/Cat 6A copper, plus single-mode and multi-mode fibre) supporting IT and telephony in commercial buildings. Key standards: BS EN 50173 series, TIA-568. Specific competence in cable termination (RJ45, fibre splicing), patch panels, cabinet installation and certification testing (Fluke DTX-CableAnalyzer or similar). BICSI training is the international standard route.",
    ],
    correctAnswer: 2,
    explanation:
      "The Environment Agency operates a free public register of authorised waste carriers. A two-minute lookup against the carrier registration number is the standard pre-transfer check. Most established waste carriers will have the number printed on the vehicle and will provide a properly drawn-up waste transfer note. Refusing to provide a number is a strong red flag — fly-tipping operators sometimes pose as legitimate carriers and the producer Duty of Care passes back to the original waste producer if the waste is later dumped illegally.",
  },
  {
    id: 7,
    question:
      "Why do the London Fire Brigade and HSE publish regular guidance specifically on lithium-ion battery storage in tradesperson vans and small workshops?",
    options: [
      "Three things. (1) The unit is configured / wired correctly for PEN-fault detection (some units have a DIP switch or software setting for the earthing arrangement; some auto-detect; some require firmware configuration). (2) The detection circuit is operational — many units include a self-test that runs on power-up and the apprentice should observe the test pass. (3) The unit's earthing is connected per the manufacturer's wiring diagram (the protective measure depends on the right conductors being terminated correctly). The MCS-certified designer specifies the test sequence; the apprentice executes per the design and verifies the result.",
      "Advisory, Conciliation and Arbitration Service — a non-departmental public body that provides free, impartial advice on workplace rights and conflict resolution. ACAS publishes the Codes of Practice on Discipline and Grievance, runs early conciliation (mandatory before most employment tribunal claims), provides advice through a national helpline, and trains employers and unions on workplace dispute resolution.",
      "Installation in accordance with the manufacturer's instructions, including torque values, conductor preparation, environmental conditions and any product registration the manufacturer requires. Deviation gives the manufacturer grounds to void the warranty. Some manufacturers (especially EV charger and solar manufacturers) require product registration within a specified period after install.",
      "Because the rate of fires originating from Li-ion batteries (e-bikes, e-scooters, power tools, solar storage) has risen sharply in recent years across the UK as the installed base has grown. Fires in vehicles, garages and small workshops are a recurring incident type. The guidance focuses on segregation, charging on non-combustible surfaces, not charging unattended overnight, and immediate isolation of damaged batteries. The same rules apply in proportion to a tradesperson van as to a battery storage warehouse.",
    ],
    correctAnswer: 3,
    explanation:
      "London Fire Brigade campaigns like #ChargeSafe and HSE bulletins reflect a real and rising risk. The same reasoning that prevents commercial battery storage warehouses from sitting next to occupied buildings applies in miniature to a van or small workshop. Charging Li-ion overnight on a wooden bench in an unattended workshop is the lower-cost equivalent of the same risk profile. Following the published guidance is cheap and the consequences of ignoring it are severe.",
  },
  {
    id: 8,
    question:
      "An apprentice spots a smoke alarm pile up to head height in the corner of the workshop while old fuse boards stack on the floor next to it. What is the responsible response?",
    options: [
      "Raise it with the supervisor and get the WEEE segregated and routed to an AATF promptly. Smoke alarms typically contain small primary batteries and circuit boards (and ionising-chamber units contain a tiny radioactive source — Americium-241 — which has its own disposal route). Old fuse boards contain wiring, plastics and sometimes mercury contactors in older kit. Both are classic WEEE. Letting the pile grow is a Duty of Care breach in the making and is also a fire risk because of the accumulated combustible plastic.",
      "DUAL-RCD CU — two main RCDs, each protecting a group of circuits via standard MCBs. Cheaper to install but a single fault on one circuit trips the entire RCD's group (e.g. a fault on the kitchen ring trips all circuits on RCD1, including the freezer and lights). ALL-RCBO CU — every circuit has its own RCBO with both overcurrent and earth-leakage protection. More expensive but a fault on one circuit only affects that circuit. Cumulative leakage is also limited per circuit. A4:2026 reinforces RCBO-per-circuit for higher-occupancy dwellings; trade preference is RCBO-per-circuit for any new install.",
      "Five-yearly EICR (Electrical Installation Condition Report) covering the entire fixed electrical installation, including any PV, EV chargers, heat pump supplies, battery storage circuits and MVHR supplies that have been added. Landlord must provide the EICR to tenants and to the local authority on request. Any C1 (immediate danger) or C2 (potentially dangerous) findings must be remediated within 28 days. Environmental tech additions trigger an updated EICR; they don't escape the regime. The Regulations apply to private rented properties in England; equivalents in the devolved nations.",
      "C3 — improvement recommended. Reg 421.1.7 uses the language of recommendation, not requirement, for the relevant categories. The absence of an AFDD on an existing circuit is not in itself a defect requiring urgent action — but it is an improvement that brings the installation closer to current best practice. Higher-Risk Residential Buildings under the Building Safety Act 2022 are a separate matter where AFDDs may be a hard requirement.",
    ],
    correctAnswer: 0,
    explanation:
      "Workshop housekeeping is part of the apprentice job. WEEE accumulating in a corner is a paper-trail problem (Duty of Care) and a fire risk in one. Raising it with a supervisor in writing creates a record and gives you cover if it is later mishandled. Ionising-chamber smoke alarms in particular have specific disposal routes; many fire safety contractors operate a take-back scheme.",
  },
];

const faqs = [
  {
    question: "Is a small piece of WEEE — like a single replaced ceiling rose — really regulated waste?",
    answer:
      "Yes. The WEEE Regulations 2013 do not have a de minimis threshold for what counts. Any item that depended on electricity to function is WEEE when discarded. In practice a single ceiling rose can go in the wholesaler take-back bin under the Distributor Take-Back Scheme, which most major UK wholesalers operate. Aggregating WEEE across a job and dropping it off at the wholesaler on the way home is the standard compliant route for small-scale installer waste.",
  },
  {
    question: "What is an Approved Authorised Treatment Facility (AATF) and how do I know if one is local?",
    answer:
      "An AATF is a waste site approved by the Environment Agency (or SEPA / NRW / NIEA) to treat WEEE, recover materials and report tonnages back into the producer-responsibility scheme. The Environment Agency publishes a public register of AATFs. Most large electrical wholesalers either operate an AATF on their site or have a contract with one and accept WEEE under the Distributor Take-Back Scheme. Routing your WEEE through the wholesaler is the most common installer-scale compliance route.",
  },
  {
    question: "What chemistry is in a typical cordless tool battery and why does it matter?",
    answer:
      "Modern cordless tool batteries are almost universally lithium-ion (Li-ion), most often using NMC (nickel manganese cobalt) cathode chemistry though LFP (lithium iron phosphate) is increasingly used in larger packs. NMC has higher energy density (more runtime) but is more thermally sensitive. LFP is more thermally stable and has a higher onset temperature for thermal runaway, which is why many domestic battery storage systems have moved to LFP. From a site-handling perspective both are treated as Li-ion under the safe-storage and transport regime; the chemistry mainly matters to the battery designer and the recycler.",
  },
  {
    question: "Can I throw an end-of-life Li-ion tool battery in the kerbside recycling bin?",
    answer:
      "No. Li-ion batteries are explicitly not accepted in kerbside recycling and are a leading cause of fires at materials recovery facilities and waste-collection vehicles. The right route is a battery recycling collection point — most supermarkets, DIY stores, electrical wholesalers and civic amenity sites accept them. The manufacturer take-back scheme is also an option for tool batteries (particularly the major brands). Domestic solar storage batteries normally go back to the original manufacturer under their take-back commitment.",
  },
  {
    question: "What if a Li-ion battery actually catches fire on site — what do I do?",
    answer:
      "Get clear and call the fire service. Li-ion fires burn hot, fast, and produce toxic gas (hydrogen fluoride, carbon monoxide, hydrocarbons). Do not attempt to extinguish a fully-developed Li-ion battery fire with a small portable extinguisher. Water from a safe distance is the best practical control because it cools surrounding cells and limits spread, but stopping the burning cell itself is essentially impossible until the chemistry exhausts itself. Evacuate the building, raise the alarm, and let the fire service take over with their full kit and specialist Li-ion training. London Fire Brigade and other UK fire services have published guidance specifically for this scenario.",
  },
  {
    question: "Are there any WEEE categories where the rules are different for installer waste versus household waste?",
    answer:
      "The WEEE Regulations apply broadly across both routes but the funding mechanism differs. Household WEEE is funded by Producer Compliance Schemes through the Distributor Take-Back Scheme and civic amenity sites. Business WEEE is the responsibility of the producer or the end user to fund disposal, normally through a contract with a registered waste carrier. As an electrician working on a domestic property the WEEE you generate is generally treated as household-equivalent and can go through the wholesaler take-back. On a commercial fit-out the contract should specify how WEEE is funded and who is the responsible party.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 2"
            title="WEEE Regs 2013 and lithium-ion battery safety"
            description="The Waste Electrical and Electronic Equipment Regulations 2013 set producer-responsibility, take-back and treatment rules for everything that depends on electricity to work. Lithium-ion batteries sit at the high-risk end of WEEE — thermal runaway, segregation in storage and the safe response when a cell goes wrong are core apprentice safety knowledge."
            tone="emerald"
          />

          <TLDR
            points={[
              "WEEE Regulations 2013 cover any equipment dependent on electric currents or electromagnetic fields. Removed kit on a rewire is WEEE and must be routed to an Approved Authorised Treatment Facility.",
              "The Duty of Care under section 34 of the Environmental Protection Act 1990 sits over the top of WEEE — describe the waste, use an authorised carrier, retain transfer notes for at least two years.",
              "Lithium-ion batteries can enter thermal runaway after damage, overcharge or external heat — a self-sustaining exothermic chain reaction that vents flammable and toxic gas and is essentially unstoppable once started.",
              "Segregate damaged Li-ion from undamaged in storage and transport. Fire-resistant container, terminal taping or cell trays, no charging unattended overnight on combustible surfaces. Route to a battery recycling point as soon as practical.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the scope of the WEEE Regulations 2013 and identify what counts as WEEE on a typical electrical install or strip-out job.",
              "Describe the Duty of Care under section 34 of the Environmental Protection Act 1990 and the role of waste transfer notes, registered waste carriers and Approved Authorised Treatment Facilities.",
              "Explain the mechanism of thermal runaway in lithium-ion cells and the typical triggers (mechanical damage, overcharge, external heat, internal manufacturing defect).",
              "Apply correct safe-storage and segregation practice for new, used and damaged Li-ion tool batteries in a van or small workshop.",
              "Apply the correct site response when a Li-ion battery shows pre-runaway signs (heat, swelling, smoke, vapour) including evacuation, isolation and emergency-services notification.",
              "Recognise the manufacturer take-back routes for end-of-life domestic solar storage batteries and the specialist transport regime for damaged Li-ion.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>WEEE — what counts and what to do with it</ContentEyebrow>

          <ConceptBlock
            title="Anything that needed electricity to work is WEEE when it leaves the building"
            plainEnglish="The WEEE Regulations 2013 implement the producer-responsibility framework for waste electrical and electronic equipment in the UK. The definition is broad: any equipment dependent on electric currents or electromagnetic fields to function falls in scope. From a 9 V smoke alarm to a three-phase commercial oven, from a low-voltage downlighter to a heat pump outdoor unit — once it is discarded it is WEEE and the rules attach. Producers fund the collection and treatment system through Producer Compliance Schemes; collectors and treatment facilities operate under Environment Agency authorisation."
            onSite="On a typical rewire or kitchen refit the volume of WEEE generated by the electrical trade is significant — fuse board, switches, sockets, light fittings, downlighters, transformers, smoke alarms, integrated appliances, extractor fans, controls. The compliant route is segregate from general waste, route to an Approved Authorised Treatment Facility (often via the wholesaler Distributor Take-Back Scheme), and keep a waste transfer note. Skipping the segregation and dumping WEEE in the builder skip is a common breach, easily detected and routinely enforced against."
          >
            <p>
              The WEEE category structure (post-2019 simplification) used in UK reporting:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cat 1 Temperature exchange equipment</strong> — fridges, freezers,
                heat pumps, AC units. Often subject to F-Gas rules in addition to WEEE.
              </li>
              <li>
                <strong>Cat 2 Screens, monitors, equipment with screens</strong> — TVs,
                monitors, tablets. Often contains hazardous components.
              </li>
              <li>
                <strong>Cat 3 Lamps</strong> — fluorescent tubes, compact fluorescent
                lamps, certain LED lamps. Mercury content rules apply for fluorescents
                under the Hazardous Waste Regulations.
              </li>
              <li>
                <strong>Cat 4 Large equipment (over 50 cm)</strong> — washing machines,
                ovens, large luminaires, larger consumer units.
              </li>
              <li>
                <strong>Cat 5 Small equipment (50 cm or less)</strong> — most smoke
                alarms, accessories, small switchgear, downlighters, small transformers,
                small luminaires. The single biggest stream by item count.
              </li>
              <li>
                <strong>Cat 6 Small IT and telecoms equipment</strong> — phones, routers,
                small computing kit.
              </li>
            </ul>
            <p>
              Cable, copper offcuts and metallic fixings are not WEEE — they are
              metal-recyclable scrap. Most installers segregate copper for sale to a
              registered scrap merchant (which is itself a controlled waste activity under
              the Scrap Metal Dealers Act 2013). Plastics, packaging and inert builder
              waste fall outside WEEE entirely and follow the general construction waste
              hierarchy.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Waste Electrical and Electronic Equipment Regulations 2013 (SI 2013/3113), regulation 4 (definition of EEE)"
            clause={
              <>
                &quot;Electrical or electronic equipment&quot; means equipment which is
                dependent on electric currents or electromagnetic fields in order to work
                properly and equipment for the generation, transfer and measurement of
                such currents and fields and designed for use with a voltage rating not
                exceeding 1000 volts for alternating current and 1500 volts for direct
                current.
              </>
            }
            meaning={
              <>
                The definition catches almost everything an electrician will install or
                remove. The voltage caps (1000 V AC / 1500 V DC) cover all UK domestic and
                most commercial electrical equipment by a wide margin. Once the equipment
                is discarded it becomes WEEE and the producer-responsibility, take-back
                and treatment rules engage. Distributor Take-Back at the wholesaler is the
                standard installer-scale compliance route for the small-equipment stream
                that dominates rewire and accessory replacement work.
              </>
            }
            cite="Source: Waste Electrical and Electronic Equipment Regulations 2013, regulation 4 (paraphrased); full text at legislation.gov.uk."
          />

          <RegsCallout
            source="Environmental Protection Act 1990, section 34 (Duty of Care)"
            clause={
              <>
                Any person who imports, produces, carries, keeps, treats, disposes of or
                as a broker has control of controlled waste shall take all such measures
                applicable to him in that capacity as are reasonable in the circumstances
                to prevent the escape of waste, to ensure that it is transferred only to
                an authorised person, and that on the transfer there is provided a
                written description of the waste sufficient to enable the recipient to
                avoid contravening the law.
              </>
            }
            meaning={
              <>
                The Duty of Care is the umbrella duty across all controlled waste in the
                UK. It applies to WEEE, hazardous waste, construction waste and Li-ion
                batteries. The practical effect for an electrician is: keep WEEE
                contained, transfer only to a registered waste carrier, use a properly
                drawn-up waste transfer note (or hazardous waste consignment note where
                applicable), and retain the paperwork for at least two years. The
                Environment Agency, SEPA, NRW and NIEA all enforce.
              </>
            }
            cite="Source: Environmental Protection Act 1990, section 34 (paraphrased); full text at legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lithium-ion batteries — the chemistry behind the risk</ContentEyebrow>

          <ConceptBlock
            title="Thermal runaway — a self-sustaining exothermic chain reaction"
            plainEnglish="A lithium-ion cell stores energy in a thin sandwich of cathode (typically NMC nickel-manganese-cobalt or LFP iron-phosphate), separator film, anode (typically graphite) and an organic liquid electrolyte. The separator keeps cathode and anode apart while letting lithium ions through. If the separator is breached — by mechanical damage, overcharge, external heat, manufacturing defect — the cathode and anode contact each other, an internal short circuit forms, and the stored energy discharges as heat inside the cell. The heat decomposes the electrolyte, generating flammable gas and more heat. Once the cycle starts, the cell vents, ignites and can propagate to neighbouring cells in the pack."
            onSite="On site the trigger conditions for thermal runaway are common: cordless tool batteries get dropped, drilled, dunked in water, left in hot vans, charged on cheap aftermarket chargers and stored loose in toolboxes. Each of those is a trigger pathway. Most cells survive most insults most of the time — but the consequence of failure is severe enough that the safe-handling regime is justified for everyday use, not just for known-damaged cells. The cost of a metal storage box, terminal taping and a discipline of not charging overnight on a wooden bench is small. The cost of a van fire is total."
          >
            <p>
              Why Li-ion fires are so hard to put out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The cell carries its own oxidiser</strong> — the cathode material
                contains oxygen that is released during decomposition, so the fire does
                not need atmospheric oxygen to keep burning. Smothering does not work the
                way it does on a hydrocarbon fire.
              </li>
              <li>
                <strong>Self-heating runs the chemistry</strong> — water cools surrounding
                cells but does not interrupt the runaway chemistry inside the burning
                cell. The cell will burn until it exhausts its energy.
              </li>
              <li>
                <strong>Toxic and flammable vent gas</strong> — hydrogen fluoride, carbon
                monoxide, and various hydrocarbons. Breathing the vent gas is dangerous;
                the gas can also accumulate and explode.
              </li>
              <li>
                <strong>Propagation through the pack</strong> — heat from one runaway cell
                heats neighbouring cells through the pack body. Without a thermal break or
                active cooling the runaway propagates in seconds to minutes.
              </li>
              <li>
                <strong>Re-ignition risk</strong> — apparently extinguished cells can
                re-ignite hours later as residual energy redistributes. Treat any
                Li-ion-involved fire as continuing risk for an extended period.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Carriage of Dangerous Goods and Use of Transportable Pressure Equipment Regulations 2009 (CDG) and ADR 2025 — Class 9 Li-ion (UN 3480 / 3481) summary"
            clause={
              <>
                Lithium-ion cells and batteries are classified as Class 9 dangerous goods
                for transport (UN 3480 cells alone, UN 3481 cells contained in or packed
                with equipment). Damaged or defective Li-ion batteries (UN 3480/3481) are
                subject to special provisions including more robust packaging requirements
                and prohibition of carriage by air. The Carriage of Dangerous Goods
                Regulations apply where Li-ion batteries are carried by road in commercial
                quantities.
              </>
            }
            meaning={
              <>
                Carrying a small number of new, undamaged tool batteries between sites in
                a van is generally exempt under the small-quantity provisions. Carrying a
                damaged or swollen battery for disposal is not exempt and triggers the
                full Class 9 packaging, labelling and documentation rules. The simplest
                practical answer for an electrician is: do not transport damaged
                batteries in your own vehicle, arrange a specialist hazardous waste
                collection or use the manufacturer take-back where available.
              </>
            }
            cite="Source: CDG Regulations 2009 and ADR 2025 (paraphrased summary); full provisions in the ADR 2025 published text and the UK CDG Regulations at legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Safe storage, charging and segregation in practice</ContentEyebrow>

          <ConceptBlock
            title="Cheap controls — segregation, terminal protection, and charge discipline"
            plainEnglish="Most Li-ion site-fire incidents trace back to one of three things: a damaged cell stored alongside undamaged ones, loose batteries shorting against tools or other cells, or unattended overnight charging on combustible surfaces. The control measures are inexpensive: a metal toolbox section for storage, terminal taping or purpose-made cell trays, a non-combustible charging tray (sand-filled or metal), and a discipline of charging during the working day with eyes-on rather than overnight unattended. Battery management systems inside modern packs do most of the heavy lifting on overcharge protection, but the BMS cannot help with mechanical damage or external short circuit."
            onSite="The van and the workshop both need a thought-through Li-ion stock plan. New batteries in original packaging or a dedicated lithium-safe storage box. Used but undamaged batteries with terminals taped or in cell trays, in a metal container. Damaged batteries — visible swelling, scorching, leakage, dent or impact damage — in a separate fire-resistant container (vermiculite, sand, or a purpose-made Li-ion safety bag), kept outside the van interior where practical and routed to recycling promptly. The Li-ion bag market is now mature, with several UK suppliers offering containers in various sizes specifically for tool battery storage."
          >
            <p>
              Storage and handling rules of thumb that scale from a van to a small
              workshop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Segregate damaged from undamaged</strong> — never mix in the same
                container. A swollen, dented or leaking cell is in a pre-runaway state and
                should be physically isolated.
              </li>
              <li>
                <strong>Protect terminals</strong> — terminal tape, cell trays, original
                packaging or a partitioned battery storage box. Loose cells in a metal
                toolbox can short against each other or against tools.
              </li>
              <li>
                <strong>Avoid heat</strong> — hot vans in summer reach 50-60 degC, raising
                the rest state of every cell. Park in shade where possible, ventilate the
                van, and do not store in direct sunlight.
              </li>
              <li>
                <strong>Charge attended</strong> — charge during the working day on a
                non-combustible surface within view. Avoid charging overnight unattended
                in unmonitored spaces.
              </li>
              <li>
                <strong>Use approved chargers</strong> — manufacturer chargers or
                recognised compatible alternatives. Cheap aftermarket chargers without
                proper voltage regulation are a documented fire-risk pathway.
              </li>
              <li>
                <strong>Empty regularly</strong> — do not let damaged cells accumulate.
                Route to a battery recycling point or manufacturer take-back as soon as
                practical.
              </li>
              <li>
                <strong>Have a plan if a cell vents</strong> — clear evacuation route, fire
                service notification, and where possible move the venting cell outside
                onto a non-combustible surface and away from buildings.
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

          <ContentEyebrow>Producer responsibility and the take-back system</ContentEyebrow>

          <ConceptBlock
            title="Who pays for WEEE collection — the producer responsibility model"
            plainEnglish="The WEEE Regulations 2013 implement an extended producer responsibility model — the manufacturers and importers placing electrical equipment on the UK market are made financially responsible for the eventual collection and treatment of that equipment when it becomes waste. Producers join Producer Compliance Schemes (PCSs) which collectively fund the WEEE collection infrastructure (civic amenity sites, the Distributor Take-Back Scheme at electrical wholesalers, and various business-WEEE collection routes). The producer pays the PCS based on tonnages placed on market, the PCS funds the collection and treatment, and the householder or business gets a free or low-cost take-back route as a result."
            onSite="As an installer you sit downstream of the producer in the WEEE flow. Your direct compliance task is segregating the WEEE you generate and routing it through the established take-back routes — typically the wholesaler under the Distributor Take-Back Scheme. You do not pay separately for the take-back at the wholesaler because the producer fees have already funded it through the PCS. The model only works if installers actually use the take-back routes; WEEE that ends up in skips or general waste contaminates the recycling stream and undermines the whole system. The compliance ask on you is small (segregate and route correctly), but the system depends on it."
          >
            <p>
              How the WEEE money flows under the producer responsibility model:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Producers register</strong> with the Environment Agency or join a
                PCS that registers them. They report their tonnages of equipment placed
                on market each year by category.
              </li>
              <li>
                <strong>PCSs collect fees</strong> from member producers based on
                tonnages placed on market and use the funds to deliver collection and
                treatment infrastructure.
              </li>
              <li>
                <strong>Approved Authorised Treatment Facilities (AATFs)</strong> are
                paid by the PCS to receive, treat and recycle WEEE. Tonnages treated are
                reported back to the EA to verify producer obligations are met.
              </li>
              <li>
                <strong>Distributor Take-Back Scheme</strong> at wholesalers is funded
                indirectly through the PCS network. Customers (including installers)
                deposit small WEEE free at the wholesaler counter.
              </li>
              <li>
                <strong>Civic amenity sites</strong> accept household WEEE through
                arrangements with PCSs and local authorities.
              </li>
              <li>
                <strong>Business WEEE</strong> is generally the responsibility of the
                end user to fund disposal, normally via a contract with a registered
                waste carrier — though Distributor Take-Back can sometimes accept
                small business WEEE alongside household.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Battery chemistries and recycling routes</ContentEyebrow>

          <ConceptBlock
            title="Different battery chemistries, different end-of-life pathways"
            plainEnglish="The Waste Batteries and Accumulators Regulations 2009 sit alongside the WEEE Regulations and impose specific collection and recycling obligations on battery producers. The chemistry inside the battery determines the recycling route. Lead-acid batteries (UPS strings, older alarm systems, old vehicle batteries) go through long-established lead recycling that achieves recovery rates above 95%. Nickel-cadmium batteries (older battery-backed kit) require specialist cadmium recycling. Lithium-ion batteries are the newest mainstream chemistry and the recycling industry is still developing scaled processes — current Li-ion recycling typically recovers cobalt, nickel and copper but at lower overall recovery rates than lead-acid."
            onSite="As the apprentice on a strip-out you will encounter all three chemistries on different jobs. Lead-acid in older emergency lighting and alarm system battery packs. Nickel-cadmium in legacy battery-backed equipment that is gradually being phased out. Lithium-ion in modern emergency lighting, modern alarm systems, modern battery storage, and every cordless tool battery. The right route is the same for all three: do not bin them, do not stockpile them, route them to a battery collection point — the wholesaler, a civic amenity site, a manufacturer take-back scheme, or a specialist battery recycler. The Battery Compliance Scheme network funds the collection infrastructure under the producer responsibility regime."
          >
            <p>
              Battery chemistries you will commonly meet on UK electrical strip-out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lead-acid (Pb-PbO2)</strong> — UPS battery strings, older
                emergency lighting, older alarm systems, automotive starter batteries.
                EWC 16 06 01* (absolute hazardous, lead is a regulated heavy metal).
                Mature recycling industry with above-95% recovery rates.
              </li>
              <li>
                <strong>Nickel-cadmium (NiCd)</strong> — older battery-backed equipment,
                legacy emergency lighting. EWC 16 06 02* (absolute hazardous, cadmium is
                highly toxic). Specialist recycling route, declining in market share as
                EU Battery Directive restrictions phase out NiCd in many applications.
              </li>
              <li>
                <strong>Nickel-metal hydride (NiMH)</strong> — older portable kit,
                bridging chemistry between NiCd and Li-ion. Less hazardous than NiCd but
                still requires specialist recycling.
              </li>
              <li>
                <strong>Lithium-ion (Li-ion, NMC, LFP and others)</strong> — current
                default for cordless tools, modern emergency lighting, alarm system
                backup, battery storage. Specialist recycling, segregate damaged from
                undamaged, manufacturer take-back where available.
              </li>
              <li>
                <strong>Primary alkaline (single-use)</strong> — smoke alarm batteries,
                small accessory batteries. Not hazardous but still require recycling
                under the Waste Batteries and Accumulators Regulations. Take-back at
                supermarkets, DIY stores and civic amenity sites.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Battery storage system end-of-life</ContentEyebrow>

          <ConceptBlock
            title="Domestic battery storage — manufacturer take-back is the right answer"
            plainEnglish="UK domestic battery storage systems (Tesla Powerwall, GivEnergy, Sonnen, BYD, Pylontech and similar) are typically large lithium-ion battery packs ranging from 3 kWh to 15 kWh or more. End-of-life recycling of these systems is governed by the Waste Batteries and Accumulators Regulations 2009 alongside the WEEE Regulations. Producers of domestic battery storage operate take-back schemes — the customer (or their installer) contacts the manufacturer for collection, the manufacturer arranges specialist transport (Class 9 dangerous goods packaging, ADR-compliant carrier) and the battery is processed at an authorised Li-ion treatment facility."
            onSite="As the electrician on site you do not transport these batteries yourself. Even an apparently undamaged domestic battery pack is too large and too energy-dense for a tradesperson van under the small-quantity dangerous goods exemption. The right routine is: identify the manufacturer from the data plate, contact their take-back team, schedule the collection, and let the specialist carrier handle the transport. If the battery is visibly damaged (swollen, scorched, leaking) treat it as a pre-runaway hazard and follow the safe-storage scenario in this subsection. Customers will often ask you to take it away — the answer is to refer them to the manufacturer take-back, document the advice in writing, and do not transport."
          >
            <p>
              The end-of-life routine for a domestic battery storage system:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the manufacturer</strong> — check the data plate for
                model and serial number. Major UK battery storage brands all operate
                take-back schemes.
              </li>
              <li>
                <strong>Document the condition</strong> — photograph the unit, note any
                damage, capture the data plate. Manufacturer triage often depends on the
                condition data.
              </li>
              <li>
                <strong>Isolate electrically</strong> — open the DC and AC isolators,
                lock off where possible. Do not try to disconnect the battery internals
                yourself.
              </li>
              <li>
                <strong>Contact manufacturer take-back</strong> — they will dispatch a
                specialist carrier with the right packaging and ADR compliance.
              </li>
              <li>
                <strong>Where the manufacturer is no longer trading</strong> — contact a
                specialist hazardous waste contractor licensed for Class 9 Li-ion. The
                EA public register lists licensed carriers and treatment facilities.
              </li>
              <li>
                <strong>Document the chain</strong> — keep the consignment note, the
                manufacturer reference and any photographs in the customer file. The
                customer holds the operator duty under WEEE and Battery Regulations.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cable copper and the scrap merchant route</ContentEyebrow>

          <ConceptBlock
            title="Cable copper is not WEEE — but it is regulated controlled waste"
            plainEnglish="Cable offcuts and stripped cable copper are not WEEE under the WEEE Regulations because they are not equipment — they are recyclable metal feedstock. However copper offcuts are still controlled waste under the Environmental Protection Act 1990 Duty of Care, and the route to a registered scrap metal dealer is itself regulated under the Scrap Metal Dealers Act 2013. The Act was introduced to disrupt the cable theft market and requires scrap dealers to verify the identity of every seller, pay only by traceable means (no cash), and keep records of every transaction. Selling cable scrap to an unregistered dealer or for cash is a criminal offence."
            onSite="On most strip-out jobs the cable copper is the most valuable single waste stream. Stripped clean copper from old singles, T&E and SWA fetches near-spot price at scrap; cable with sheath still attached fetches less because the recycler has to do the separation. Some installers strip on site to maximise scrap value; others sell as is. Either way the route is the same: take to a Scrap Metal Dealers Act registered dealer, present photo ID, accept payment by bank transfer or cheque (not cash), and retain the receipt for the company records. Treating cable copper as part of the waste hierarchy and recycling streams correctly is both legally required and commercially sensible — the scrap value offsets some of the disposal cost on the rest of the WEEE stream."
          >
            <p>
              The cable copper recycling routine:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Segregate at strip-out</strong> — keep cable offcuts separate
                from general WEEE and general site waste. Avoid contamination with steel,
                aluminium or polymer that will lower the scrap grade.
              </li>
              <li>
                <strong>Strip optionally</strong> — bare bright copper fetches near-spot
                price. Sheathed cable fetches less. The decision depends on volume and
                whether stripping is worth your time at the prevailing scrap price.
              </li>
              <li>
                <strong>Use a registered dealer</strong> — verify the Scrap Metal Dealers
                Act 2013 registration before the first transaction. Most established
                dealers display the registration prominently.
              </li>
              <li>
                <strong>Identity check</strong> — present photo ID at first transaction.
                The dealer will record your details against every transaction.
              </li>
              <li>
                <strong>Accept traceable payment</strong> — bank transfer, cheque or
                similar. Cash payment is prohibited under the Scrap Metal Dealers Act.
              </li>
              <li>
                <strong>Retain receipts</strong> — for company records and as evidence
                of the lawful disposal route under the waste Duty of Care.
              </li>
              <li>
                <strong>Confirm BS EN 50625 downstream</strong> — for cable that is sold
                for processing rather than for direct material recovery, confirm the
                downstream recycler holds BS EN 50625 compliance documentation. This
                protects against cable being exported to unregulated open-burning
                operations.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The Distributor Take-Back Scheme in practice</ContentEyebrow>

          <ConceptBlock
            title="Using the wholesaler take-back as the routine WEEE compliance route"
            plainEnglish="The Distributor Take-Back Scheme is a UK-wide voluntary producer-funded scheme that lets electrical wholesalers and retailers act as collection points for household-equivalent WEEE without each store needing its own waste carrier registration. Most major UK electrical wholesalers (Edmundson, CEF, Rexel, Yesss, Newey and Eyre, City Electrical Factors and others) participate in the scheme. The wholesaler accepts WEEE deposited by trade customers as a no-charge service, aggregates it on site and routes it through a contracted Producer Compliance Scheme to an Approved Authorised Treatment Facility for processing. For an installer the practical effect is that the wholesaler trip you are making anyway becomes the WEEE compliance route for the small-equipment stream that dominates rewire and accessory work."
            onSite="The routine compliance flow on a typical small electrical job: segregate WEEE from general waste at the customer site, transport in your van back to the wholesaler at the next visit, deposit in the take-back collection point at the wholesaler, optionally request a deposit confirmation slip for the project records. The whole exercise adds five minutes to the wholesaler trip and discharges the producer Duty of Care correctly. On larger jobs where the WEEE volume exceeds what the wholesaler take-back will accept, escalate to a registered waste carrier collection from site with a proper waste transfer note. Either route is compliant; the wholesaler take-back is just lower friction for the small-equipment stream."
          >
            <p>
              How to use the Distributor Take-Back Scheme correctly:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Segregate at source</strong> — keep WEEE separate from general
                waste, ideally in a labelled tote or bag in the van.
              </li>
              <li>
                <strong>Check the wholesaler participates</strong> — most major UK
                wholesalers do, but smaller independent merchants may not. A two-second
                check at the trade counter confirms.
              </li>
              <li>
                <strong>Deposit in the designated container</strong> — wholesalers have
                a dedicated WEEE collection cage or bin near the trade entrance.
              </li>
              <li>
                <strong>Respect the categories</strong> — most wholesaler take-back is
                set up for non-hazardous WEEE (Cat 5 small equipment dominates). Do not
                deposit hazardous waste (fluorescent tubes, PCB ballasts, batteries) in
                the general WEEE bin — those have their own routes.
              </li>
              <li>
                <strong>Aggregate intelligently</strong> — small WEEE from multiple
                jobs aggregated for a single wholesaler drop is more efficient than
                individual trips per job.
              </li>
              <li>
                <strong>Keep records on larger volumes</strong> — for larger
                quantities ask the wholesaler for a deposit confirmation. Most will
                provide one on request for trade customers.
              </li>
              <li>
                <strong>Escalate to registered carrier above the wholesaler limit</strong>{' '}
                — for large strip-out volumes that exceed the wholesaler take-back
                capacity, arrange a registered waste carrier collection from site with
                a proper waste transfer note.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Dumping a stripped-out fuse board in the builder skip and forgetting the WEEE rules"
            whatHappens={
              <>
                The kitchen rewire generates a small mountain of WEEE: old fuse board,
                downlighters, switches, sockets, integrated appliances, smoke alarms. The
                builder has a skip on site for the kitchen waste. The temptation is to
                throw the electrical waste in with the plasterboard and the timber and
                let the skip operator deal with it. The skip operator is a registered
                waste carrier for inert and mixed construction waste — but probably not
                an Approved Authorised Treatment Facility for WEEE. The Duty of Care is
                breached, no waste transfer note exists for the WEEE specifically, and on
                an Environment Agency audit of either party the trail leads back to the
                electrical contractor.
              </>
            }
            doInstead={
              <>
                Segregate the WEEE on site into a dedicated bag or tote. At the end of the
                job route it through the wholesaler Distributor Take-Back Scheme (most
                large UK electrical wholesalers operate this) or via a registered WEEE
                waste carrier. Keep the waste transfer note for at least two years.
                Document the segregation in the job pack so the customer can see the
                compliant route was followed. The compliance overhead is small once
                established as habit.
              </>
            }
          />

          <CommonMistake
            title="Charging a stack of Li-ion tool batteries overnight on a wooden workshop bench"
            whatHappens={
              <>
                End of day, the apprentice plugs four tool batteries into chargers on the
                wooden bench and leaves. One battery has a manufacturing defect or has
                taken a knock during the day that nobody noticed. Some time during the
                night a cell enters thermal runaway. The bench ignites. The workshop is
                unattended. The fire spreads to the neighbouring batteries, the tools,
                the timber stock and the building. Insurance investigators trace the
                origin to the charging station. The insurer either declines the claim or
                heavily restricts cover going forward.
              </>
            }
            doInstead={
              <>
                Charge during the working day on a non-combustible surface (metal tray,
                sand-filled tray, dedicated lithium-safe charging cabinet) with eyes-on.
                A purpose-made Li-ion charging cabinet is a one-off cost in the low
                hundreds of pounds. Avoid charging overnight unattended where practical
                and where it cannot be avoided do it on a fire-resistant surface in a
                space with smoke detection and ideally automatic suppression. The
                principle scales: never trust a battery you cannot see.
              </>
            }
          />

          <Scenario
            title="The customer hands you their swollen old solar storage battery"
            situation={
              <>
                You arrive at a customer property to fit a new EV charger. While you are
                there the customer mentions that their original 5 kWh lithium-ion solar
                storage battery (installed eight years ago by another contractor) has
                started to look swollen and the casing seems warm to touch. They ask if
                you can take it away when you leave because they have been meaning to get
                rid of it for months. The battery is in the garage, sitting next to the
                consumer unit and a stack of cardboard boxes.
              </>
            }
            whatToDo={
              <>
                Decline politely to take it away in your van. Explain that a swollen Li-ion
                battery is in a pre-runaway state, is classified as dangerous goods for
                transport (UN 3480 Class 9), and requires specialist packaging and
                labelling that you do not carry. Recommend the customer move the battery
                outside (carefully, not by the swollen face) onto a non-combustible
                surface away from the building and any other batteries. Photograph the
                state of the battery for the customer record. Identify the manufacturer
                from the data plate and check the take-back scheme — most UK domestic
                solar storage manufacturers (Tesla Powerwall, GivEnergy, Sonnen, BYD and
                similar) operate a free or low-cost end-of-life take-back. Where the
                manufacturer is no longer trading the customer should arrange a specialist
                hazardous-waste collection. Document the advice in writing (text or
                email) so the customer has a record and you have evidence of the correct
                referral.
              </>
            }
            whyItMatters={
              <>
                Customers will ask you to take dangerous things away in your van because
                you turned up in a van and seem helpful. The right answer is almost
                always to refer rather than to transport. A polite refusal with clear
                practical onward routing protects the customer, you, your employer and
                the environment in one move. The phrase to practise is &quot;that needs a
                specialist hazardous waste route — I will write down the right contact for
                you&quot;.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "WEEE Regulations 2013 cover any equipment that depends on electricity or electromagnetic fields to work. Removed kit on a rewire is WEEE.",
              "The Duty of Care under EPA 1990 section 34 sits over the top of WEEE. Describe waste, use authorised carriers, retain transfer notes for at least two years.",
              "Distributor Take-Back through the wholesaler is the standard installer-scale route for the small-equipment WEEE stream (Cat 5 dominates rewire work).",
              "Lithium-ion thermal runaway is a self-sustaining exothermic chain reaction triggered by damage, overcharge, heat or defect. The cell carries its own oxidiser so the fire is hard to extinguish.",
              "Segregate damaged Li-ion from undamaged in storage. Use fire-resistant containers, terminal protection, and discipline charging on non-combustible surfaces.",
              "Damaged Li-ion is Class 9 dangerous goods for transport (UN 3480/3481). Do not transport in your own van without specialist packaging — refer to manufacturer take-back or specialist collection.",
              "Domestic solar storage manufacturers operate take-back schemes — that is the correct end-of-life route, not the kerbside bin or the civic amenity site.",
              "The cost of compliant WEEE handling and Li-ion segregation is small. The cost of a van fire, a customer fire or an Environment Agency enforcement action is total.",
            ]}
          />

          <Quiz title="WEEE and lithium-ion safety — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.1 F-Gas trade boundary
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Hazardous Waste, EPR and the waste hierarchy
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
