/**
 * Module 2 · Section 1 · Subsection 5 — Whole-system integration
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.1 (principles) and AC 1.2 (types)
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.1 + 3.2; 2357 Unit 312 ELTP02 / AC 3.1.
 *
 * Note: Unit 301 is overview-level. This subsection ties together PV, battery, heat pump
 * and EV charging into a single integrated system view — the way modern UK domestic projects
 * are increasingly designed and the way the L3 apprentice will encounter them on site.
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
  'Whole-system integration (1.5) | Level 3 Module 2.1.5 | Elec-Mate';
const DESCRIPTION =
  "How PV, battery storage, heat pumps and EV charging are integrated as one system on a modern UK domestic site — Home Energy Management Systems, the consumer unit layout, the role of the inverter and BMS comms layer, the diversity calculation across the full load mix, and the apprentice's role in keeping the install coherent.";

const checks = [
  {
    id: "l3-m2-s1-sub5-hems",
    question:
      "What does a Home Energy Management System (HEMS) do that the individual product apps cannot?",
    options: [
      "BS 7671 Section 712 (extensively revised in A4:2026) requires specific signage at the consumer unit (presence of PV generator), at the meter (alternative supply source), at the inverter (DC and AC isolation points) and at any external DC isolators. The EICR inspector verifies presence and legibility of each sign; missing or illegible signage is recorded as an observation (typically C3 — improvement recommended — unless the absence creates an immediate safety risk for maintainers, in which case C2). The Code Breakers schedule and the EICR Best Practice Guide give the typical coding choice. Inspector recommendations should call for the missing signage to be reinstated.",
      "A HEMS is the supervisory layer that sits above the individual product controllers — PV inverter, battery inverter, heat pump controller, EV charger controller. It reads the property's net flow at the meter, knows the time-of-use tariff schedule, knows the weather forecast (so it knows the predicted PV output), and dispatches the controllable loads to optimise across all of them. Without a HEMS the EV charger app does not know what the heat pump is doing; the heat pump does not know the battery is full; the battery does not know to discharge through the EV charger. With a HEMS the whole property behaves as one optimised system. Examples: Octopus Intelligent control, ev.energy aggregator services, GivEnergy GivEcoLink, Loxone, Home Assistant with appropriate integrations.",
      "The firm probably won't recover the cost of the additional work in court because there's no documented variation, no agreed price and no signed scope change. The half-day of labour, the additional materials, and the late completion of the job all sit on the firm's profit margin. If the customer's dispute escalates to the certification scheme (NICEIC, NAPIT, ELECSA) or to the local Trading Standards office, there's also reputational and scheme-membership risk. The variation should have been written, signed, and agreed before the work commenced.",
      "(1) Lifts — passengers can be trapped between floors when a lift loses supply mid-travel; modern lifts have an auto-rescue battery that returns to the nearest floor before opening, but you cannot assume; the lift contractor is informed and the lift is taken out of service before isolation. (2) Automatic doors and disabled-access — wheelchair users cannot exit a building whose powered doors fail; the building manager needs to staff the doors during the isolation. (3) Fire escape lighting + fire alarm + sprinkler pumps — public escape routes lose their indicated path and any fire detection during the isolation; this is a Fire Safety Order issue and the responsible person plans the cover. Other categories: ATMs, CCTV (insurance / security), public Wi-Fi (less critical), traffic signals on adjacent works (rare but possible).",
    ],
    correctIndex: 1,
    explanation:
      "Integrated systems are increasingly designed and sold as a HEMS-orchestrated whole rather than four separate products. The apprentice's role is to lay the cable infrastructure (CT clamps, comms cables, network sockets) that the HEMS needs to function. Most failed integrations trace to missing comms wiring at first fix.",
  },
  {
    id: "l3-m2-s1-sub5-diversity",
    question:
      "On a property with PV, a 13.5 kWh battery, a 7 kW heat pump and a 7.4 kW EV charger, what is the apprentice's contribution to the diversity calculation?",
    options: [
      "Three acceptable methods. (1) The charge point includes built-in PEN-fault detection-and-disconnection — most modern UK domestic units (Zappi, Ohme, Hypervolt, Wallbox, GivEnergy) include this and the manufacturer's spec confirms compliance. (2) The EV side is on a dedicated TT earth electrode separate from the property's TN-C-S earth — used where the unit does not include built-in detection or where the install configuration favours TT. (3) An external PEN-fault detection device (separate enclosure) is fitted upstream of the unit. Method 1 is the dominant approach in 2024-2026; Method 2 is still common; Method 3 is the historical approach that pre-dates built-in detection and is now uncommon. A4:2026 has refined the technical detail of each method.",
      "Recognise that the diversity calculation is more complex than a simple sum and flag the constraint to the MCS-certified designer. The headline maximum could be heat pump (7 kW) plus EV (7.4 kW) plus shower (9.5 kW) plus oven (4 kW) = around 28 kW = around 122 A on single-phase 230 V — well above any typical UK domestic main fuse. The diversity calculation accounts for: (1) which loads can run concurrently in practice; (2) the heat pump's actual draw being typically below nameplate (compressor modulates); (3) the dynamic load management on the EV charger; (4) the battery's ability to time-shift loads away from peak; (5) the PV's contribution to net property draw during the day. The MCS-certified designer runs the calculation per the IET On-Site Guide. The apprentice's job is to flag the constraint and not just bolt the loads on without checking.",
      "Five-step. (1) MAKE SAFE immediately — isolate the affected circuit / component if you can do so within your competence. (2) LABEL the fault prominently — 'OUT OF SERVICE — DO NOT RE-ENERGISE' — with date and your name. (3) INFORM CUSTOMER in writing — Dangerous Condition Notification (DCN) form describing the hazard, action taken, recommended remedial work, urgency. (4) ESCALATE to supervisor immediately — phone call, not email. (5) DOCUMENT on job sheet — what found, what done, customer brief delivered, supervisor informed. The make-safe action is non-negotiable; the customer's permission is not required for emergency safety action.",
      "MWC (Minor Works Certificate) — for additions or alterations to an existing circuit that don't constitute a new circuit. Single-page form, covers one circuit. Used for socket additions, light-fitting swaps, repair of damaged terminations, replacement of single accessories or devices. EIC (Electrical Installation Certificate) — for new installations or major works including new circuits, full CU upgrades, substantial rewires. Multi-page form with full Schedule of Inspections and Schedule of Test Results. For a single-circuit fault repair, MWC is the right form. Issuing an EIC would be over-certification (and may misrepresent the scope of work to the customer / scheme provider).",
    ],
    correctIndex: 1,
    explanation:
      "Diversity has become much more complex with the modern domestic load mix. A property with all four major electrified loads (heat pump, EV, battery, PV) needs careful calculation to live behind a typical 80-100 A main fuse. Load management, time-shifting via battery, and the controllable nature of the heat pump all factor in. The IET On-Site Guide is the practical reference; the MCS designer signs off; the apprentice should recognise when the load mix needs attention.",
  },
  {
    id: "l3-m2-s1-sub5-comms",
    question:
      "What is the comms infrastructure an integrated system typically needs and where should it be installed at first fix?",
    options: [
      "It time-shifts PV-generated energy. PV typically over-generates at midday when nobody is in (export to grid at the SEG rate, often 5-15p/kWh) and under-generates at evening peak when the family is in (import from grid at 25-35p/kWh). The battery captures the midday surplus and discharges it across the evening load. Net effect: much higher self-consumption of the PV (typically 70-90% with battery vs 25-40% without), much lower grid import, much shorter PV payback. The battery doesn't generate anything — it shifts when the customer uses what the PV makes.",
      "All batteries store DC. The difference is where the conversion happens. In DC-coupled, the PV array, the battery and the inverter share a common DC bus inside a hybrid inverter; PV energy charges the battery directly with one DC-DC conversion (high efficiency). In AC-coupled, the PV inverter is independent and converts PV DC to AC; a separate battery inverter then converts AC back to DC to charge, and DC back to AC to discharge — two extra conversions, lower round-trip efficiency, but easier to retrofit because the existing PV install stays untouched.",
      "Because the standard's enforcement and interpretation hinges on the precise definitions. 'Exposed-conductive-part' (a conductive part of equipment that can be touched and which is liable to become live in fault conditions) and 'extraneous-conductive-part' (a conductive part liable to introduce a potential, generally Earth, not forming part of the electrical installation) are different categories with different bonding rules. Mis-classify one as the other and you mis-bond, you fail the EICR, you potentially leave the customer unprotected. Definitions ARE the technical content.",
      "Most integrated systems use a mix of WiFi, Cat5e/Cat6 wired Ethernet, Modbus RS485 between specific pairs of devices, and CAN bus between battery BMS and inverter. At first fix the apprentice should run Cat5e/Cat6 cable to: (1) the consumer unit / metering location (for the HEMS and any smart meter interface), (2) the battery and inverter location (for BMS comms and remote monitoring), (3) the heat pump indoor controller location, (4) the EV charger location. CT clamps on the supply tail need a comms / signal cable back to whichever device is consuming the measurement (charger, HEMS, battery inverter — varies by system). Skipping the wired infrastructure at first fix and relying on WiFi alone is the most common reason integrated systems become unreliable later.",
    ],
    correctIndex: 3,
    explanation:
      "Comms infrastructure at first fix is much cheaper than retrofitting it after the walls are closed. WiFi alone is unreliable for safety-critical functions like load management. Wired Ethernet to each control location, CT clamp signal cable run as part of the supply-side wiring, and BMS comms cable between battery and inverter — all should be planned and installed at first fix. The MCS designer specifies; the apprentice executes.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is meant by the term integrated system in the context of a modern UK domestic environmental install?",
    options: [
      "Smoke Control Areas (SCAs) are defined under the Clean Air Act 1993 — almost every UK urban / suburban area is in an SCA. In an SCA it is an offence to emit smoke from a domestic chimney unless burning an authorised fuel in an authorised appliance (the Defra exempt appliance list). For biomass this means new installs must use Defra-approved Ecodesign-compliant boilers / stoves burning approved pellets / logs. Many older biomass installs in SCAs do not meet current Ecodesign and may be operating in breach. Local Authorities have enforcement powers including fixed-penalty notices. The L3 apprentice does not enforce SCAs but should recognise that 'just fitting a wood-burning stove' is regulated in most populated areas — the customer needs to verify the unit and the fuel are SCA-compliant.",
      "A property where PV, battery, heat pump and EV charging (and sometimes MVHR, smart heating controls and load monitoring) are designed and commissioned to behave as a coordinated whole. The PV charges the battery; the battery powers the heat pump and the EV at off-peak times or from stored solar; the EV charger throttles to keep the property within its main-fuse limit; the heat pump shifts run-time toward cheap-rate windows when possible. Coordinated by a Home Energy Management System (HEMS) that reads tariff, weather forecast, property load and dispatches the controllable assets accordingly. Increasingly the design intent on new-build and major retrofit projects.",
      "REPAIRABLE: cable terminations, accessory faceplates, individual lampholders, switch modules, dimmer cores, individual MCBs / RCBOs (within a CU), circuit cables (mid-run patch with junction box). REPLACEMENT-ONLY (typically): consumer units (sealed enclosures, integrated busbar), transformers and ballasts (factory-sealed), most LED drivers (sealed pots), AFDDs (electronic devices), most modern accessories (one-piece moulded). The boundary is usually 'is the failed item a single field-replaceable unit?'. Sealed devices are replacement-only; assembled devices with field-accessible components are repairable.",
      "SEG is a regulated payment scheme requiring electricity suppliers to pay domestic generators for electricity exported to the grid. Replaced the Feed-in Tariff (FiT) which closed to new entrants in 2019. SEG tariffs vary by supplier (typically 5-15p/kWh in 2026); customers shop around for the best rate. To qualify, the install must be MCS-certified and the meter must be capable of recording export (most modern smart meters are). The customer signs up for SEG with their chosen supplier; it isn't automatic.",
    ],
    correctAnswer: 1,
    explanation:
      "The integrated-system framing is increasingly the default on new domestic environmental work. Customer is no longer asking for 'a heat pump' or 'solar' — they are asking for a whole-house energy package, often funded by Octopus / Boiler Upgrade Scheme / EV grants together. The apprentice should expect to encounter integrated installs and recognise the coordination layer.",
  },
  {
    id: 2,
    question:
      "Why does PV self-consumption rise dramatically when battery storage is added to an existing PV array?",
    options: [
      "Collective bargaining is the process where worker representatives (Unite + GMB) and employer representatives (ECA) sit down each year to negotiate the JIB Working Rule Agreement — pay rates, hours, holidays, sick pay, pension, overtime, allowances. The agreed rates apply across all JIB-graded contracts. The mechanism is voluntary (no statute compels it) but the outcomes set the industry-standard floor.",
      "Do not transport it in your vehicle without specialist packaging. A swollen battery is a damaged battery and is classed as dangerous goods for transport (UN 3480/3481, Class 9). Photograph the unit, isolate it from other equipment, ventilate the area, and either contact the original manufacturer take-back scheme or arrange collection by a specialist hazardous-waste carrier. Many domestic solar battery manufacturers operate a free end-of-life take-back. The customer holds the Duty of Care for their own household waste; you can advise but should not transport a damaged unit unpackaged.",
      "Without storage, surplus PV (generated when the property is not consuming it — typically midday) exports to the grid at the Smart Export Guarantee rate (typically 5-15 p/kWh). With storage, surplus PV charges the battery and discharges to the property in the evening, displacing import at the much higher import rate (typically 25-35 p/kWh). The PV-to-property utilisation rate rises from typically 20-40 percent self-consumption (PV-only) to 60-90 percent (PV plus battery). This is the single biggest financial driver for adding battery storage to an existing PV install.",
      "Standard placement: on the case, near the model / serial number, where it's visible during normal use. Should show: lab name, calibration date, next-due date (typically 1 year for MFT/multimeter, 2 years for two-pole), unique certificate reference. Some labs include a barcode that links to the digital certificate. The sticker is the operative's quick check that the instrument is in date — no need to dig out the certificate. Stickers must be replaced after each calibration cycle; old stickers should be removed (multiple stickers cause confusion about which is current).",
    ],
    correctAnswer: 2,
    explanation:
      "Self-consumption is the headline metric for PV plus battery economics. Pre-2019 the export tariff (FiT) was high enough that exporting paid almost as much as self-consuming; post-FiT, self-consumption is much more valuable than export. Battery storage captures the spread between import and export rates.",
  },
  {
    id: 3,
    question:
      "How does an integrated heat pump plus battery system reduce the property's peak grid demand?",
    options: [
      "The programme tells you the sequence and the deadline — miss it and your firm is at risk of liquidated damages. The snag list is your end-of-job homework. Variations and delay notices are how additional work or extra time is recorded so the firm can claim it. Your firm's cash flow — and ultimately your wages — depend on this paperwork being right. Even as an apprentice, learning to read the programme and the snag list is part of becoming a tradesperson.",
      "A statutory certificate issued by an F-Gas certification body that authorises a company to carry out installation, maintenance, repair, decommissioning or leak checking on stationary refrigeration, AC and heat pump equipment containing fluorinated greenhouse gases. The company must also employ enough F-Gas Category I (or equivalent) certified individuals to cover the work. Without the company certificate, the firm cannot legally carry out refrigerant work even if individual engineers are certified.",
      "Indirectly but significantly. (1) The 30-year extended limitation period for residential defect claims applies. (2) The competence framework drives certification body requirements upwards. (3) Building Regs amendments (especially Approved Doc B fire safety) tighten requirements that affect electrical installations. (4) The general regulatory direction emphasises traceability — EIC, EICR, designer competence, signed certificates — for all residential work, not just HRRBs.",
      "The HEMS schedules the heat pump's main run-time toward cheap off-peak windows where possible (e.g. overnight on Octopus Go). The battery charges during the same off-peak window. During the expensive peak window (typically 16:00-19:00) the battery discharges to cover the property load, including any heat pump running, while the grid import drops to near zero. Net peak grid demand from the property falls; the customer's bill falls; the grid stress falls. Some smart tariffs explicitly reward this — Octopus Cosy, for example, has dedicated cheap windows aligned with heat-pump run preferences.",
    ],
    correctAnswer: 3,
    explanation:
      "Demand-shifting via battery and HEMS is a key part of modern integrated design. The customer benefits financially; the grid benefits operationally. The apprentice's role is to install the load-management and comms infrastructure that enables it.",
  },
  {
    id: 4,
    question:
      "Why does an integrated install require a single coherent commissioning sequence rather than commissioning each product independently?",
    options: [
      "Each product's commissioning depends on the others being in a known state. The battery commissioning needs the inverter live; the inverter needs the PV strings energised; the EV charger's load management needs the CT clamp reading correctly; the heat pump's smart controller needs network access to the HEMS; the HEMS needs all four products visible before it can configure dispatch logic. Doing them in the wrong order produces commissioning faults that are hard to diagnose because each individual product 'works' but the integrated behaviour fails. The MCS-certified designer should provide a commissioning sequence; the apprentice follows it.",
      "An earth-loop tester is a dedicated instrument (Megger LRCD-M, Kewtech KT200) that measures earth fault loop impedance ONLY — typically faster, more accurate at low impedance values, and with higher injected test current than the EFLI function on a general MFT. Used by 2391 / 2394 testers and by commissioning engineers who need to verify many EFLI values quickly. The MFT's EFLI function is fine for L3 fault-diagnosis use; dedicated loop testers are improver-level kit.",
      "Resolve it informally first where possible. The ACAS Code recommends informal resolution as the starting point, then a written grievance under the employer's documented grievance procedure, then a meeting with management with the right to be accompanied by a colleague or trade-union representative, then a written outcome with a right of appeal. ACAS conciliation is available if the internal procedure fails. Employment tribunal is the last resort and tribunals will assess whether both parties followed the Code reasonably.",
      "The supervision is appropriate when the supervisor is themselves competent for the task, has direct visibility of the work AND the trainee, can intervene before a danger materialises, and the degree of supervision is matched to BOTH the task danger AND the trainee's experience level. A second-year on socket extensions is light supervision; a first-year on a CU change is direct, hands-on supervision throughout. Token oversight from elsewhere on site doesn't meet the regulation.",
    ],
    correctAnswer: 0,
    explanation:
      "Commissioning sequence is one of the most under-appreciated parts of integrated installs. Each product's installation manual assumes it is being commissioned in isolation; the integrated behaviour is the responsibility of the system designer. The apprentice should ask for the commissioning sequence rather than improvise — improvising on an integrated install is the most reliable way to spend an extra day on troubleshooting.",
  },
  {
    id: 5,
    question:
      "On the consumer unit of an integrated install, what is the typical layout the apprentice should expect to see?",
    options: [
      "That all systems shall, so far as is reasonably practicable, be of such construction as to prevent danger; that they be maintained so as to prevent (so far as is reasonably practicable) such danger; that work activities on or near systems be carried out so as not to give rise to danger; and that protective equipment be suitable for the use, properly maintained and properly used.",
      "A larger consumer unit (often 16-24 way) with dedicated RCBOs / AFDDs for the PV inverter AC connection, the battery inverter AC connection, the EV charger circuit, the heat pump circuit, plus the existing house circuits. Sometimes a separate sub-board for the PV / battery / heat pump cluster and a CT clamp on the main supply tail back to the EV charger or HEMS. Cable management at the CU becomes a real consideration — main tails plus PV export plus battery in/out plus heat pump and EV feeds is a lot of cable in one box.",
      "Three criteria. (1) Safety — dead tests before live, low-energy before high-energy. (2) Discrimination — choose the test whose result will most narrow the candidate hypotheses (e.g. an IR test that distinguishes 'short circuit' from 'open circuit' is more useful than a continuity test that only distinguishes one). (3) Cost — quick tests before slow tests, free tests before tests that cost the customer (e.g. visual inspection before opening the CU). The order is safety first, then discrimination, then cost. Most efficient diagnostic path is shortest sequence of tests that distinguishes between the surviving hypotheses.",
      "Customer name and address; installer name and MCS certification number; install date; technology and rating (e.g. 5 kWp PV with 10 kWh battery); manufacturer and model details for the major components; performance estimate (annual generation kWh, SCOP, etc.); MCS Installation Standard reference (e.g. MIS 3002 v6.0); Workmanship Warranty period and what it covers; aftercare contact details. The certificate is the customer's proof of MCS-certified installation, used for BUS grant, SEG enrolment, manufacturer warranty registration and future house sale.",
    ],
    correctAnswer: 1,
    explanation:
      "Modern integrated CUs are physically larger, more populated and require careful planning. AFDDs (Reg 421.1.7 recommends; mandatory in HRRBs via Building Safety Act 2022) add another layer. The MCS-certified designer specifies the layout; the apprentice executes; both should agree the labelling so the customer can identify each circuit at handover.",
  },
  {
    id: 6,
    question:
      "What is the role of CT clamps in an integrated install and how many might a typical property have?",
    options: [
      "(1) Strict liability — pollution incidents are offences regardless of intent; (2) duty of care under EPA 1990 s.34 + the Polluter Pays principle; (3) MHSWR Reg 14 (employee duty to report shortcomings); (4) operator's environmental permit conditions; (5) reputational and commercial consequences of an undetected pollution event downstream; (6) personal liability under HASAWA s.7 if the environmental hazard also creates a worker safety hazard.",
      "MCS certificate; Electrical Installation Certificate (BS 7671); G98 or G99 DNO notification copy; manufacturer commissioning record(s); MCS performance estimate (SCOP, kWh / kWp / yr, payback, etc.); warranty documentation for all major components; user instruction manuals; maintenance schedule and service intervals; F-Gas record (where refrigerant work was carried out); contact details for fault reporting; and the MCS Code complaints process. Pack is provided in physical or durable digital form on handover day.",
      "Multiple — typically one or more CT clamps on the main supply tails (live and sometimes neutral) feeding the EV charger's load management, the battery inverter's grid-export control, the HEMS's whole-property monitoring, and sometimes the heat pump's load-shifting logic. On a fully integrated install you may have 3-4 CT clamps in or near the consumer unit, each reading the same physical conductor and feeding a different consumer of that data. The apprentice's job is to install each clamp around the correct conductor in the correct orientation per the manufacturer's instructions for each consuming device.",
      "Modern crystalline silicon modules typically have a Voc (open-circuit voltage) of 40-50 V per module. A residential string of 8-12 modules in series produces a string Voc of 350-600 V DC under standard conditions, with voltages running higher in cold conditions (Voc rises as temperature falls — the temperature-corrected maximum is what determines the inverter input rating). String inverters operate at these voltages; microinverters convert DC to AC at module level so the cable run between modules and the rest of the system is at AC; module-level DC optimisers raise or lower module voltage to keep the string at MPPT regardless of shading on individual modules. The architecture choice affects the cable type, the protective measures and the rapid-shutdown options.",
    ],
    correctAnswer: 2,
    explanation:
      "CT-clamp proliferation is a feature of modern integrated installs. Each device that needs to know property total or net export needs its own measurement. Some HEMS solutions consolidate multiple readings into one CT and distribute the data over Modbus or Ethernet; others insist on a dedicated CT per device. Read each install manual carefully.",
  },
  {
    id: 7,
    question:
      "Why is documentation and labelling more important on an integrated install than on a single-product install?",
    options: [
      "Fire alarm panels under BS 5839-1 monitor the system for earth faults on the detection / sounder circuits. An EARTH FAULT indication means there's a connection (typically high-resistance) between one of the system conductors and earth — could be water ingress at a detector / sounder, damaged cable, contaminated terminal. The fault doesn't immediately stop the alarm working but it compromises the system's ability to operate reliably and may mask other faults. L3 action: (1) Document the fault on the fire log book. (2) Isolate the affected zone (panel will let you do this) so you can investigate. (3) IR test each loop / circuit on the affected zone. (4) Find and rectify; retest; restore. (5) Inform the customer's responsible person under RR(FS)O 2005.",
      "F-Gas Regulations require refrigerant recovery — into a calibrated cylinder, by an F-Gas-certified engineer. Venting fluorinated refrigerants is a criminal offence. The recovered refrigerant goes back to the supplier or a specialist recycling stream. Records are kept of every refrigerant transaction (charge, recovery) under the F-Gas register requirements. As the L3 electrician you don't handle refrigerant — but you should recognise that the F-Gas engineer's recovery activity is the regulated step at decommissioning. Improper venting attracts criminal prosecution under the Environmental Permitting Regulations.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      "An integrated install has multiple inverters, multiple isolation points, multiple comms cables, multiple control devices and multiple service requirements. Without clear labelling and documentation, the next electrician arriving on site (perhaps to fix a fault years later, perhaps in an emergency) cannot quickly identify which isolator does what, which circuit feeds which device, which comms cable goes where. Section 514 of BS 7671 specifies the labelling minimum; the IET Codes of Practice for PV, battery and EV add specific requirements for each technology; the MCS Code of Practice requires customer-facing handover documentation. The apprentice should expect to label more, document more and brief the customer more thoroughly than on a single-product install.",
    ],
    correctAnswer: 3,
    explanation:
      "Labelling and documentation are non-glamorous but critical. The cost of skipping them lands on the next electrician (and the customer) years later. Section 514 of BS 7671 covers identification; the various IET Codes of Practice and MCS Codes add product-specific requirements; the customer handover pack ties it together.",
  },
  {
    id: 8,
    question:
      "What is the apprentice's contribution on an integrated install where multiple MCS-certified specialists (PV, battery, heat pump, EV) are involved?",
    options: [
      "Be the person who keeps the install coherent across the trade interfaces. The apprentice typically assists with the cable infrastructure that all the specialists rely on (Cat5e/Cat6 to control locations, mains supply to inverter / heat pump / EV charger locations, CT clamp wiring at the consumer unit, supplementary bonding where required). The apprentice flags conflicts where one specialist's design decision would block another's (e.g. a CU layout that does not leave room for the planned EV RCBO; a heat pump location that conflicts with the PV cable routing). The apprentice contributes to commissioning checks under the supervision of each specialist. The MCS-certified specialists sign off their respective scope; the apprentice's contribution is the connective tissue between them.",
      "Battery hazards are different from AC hazards: (1) DC shock — once your hand is on a DC busbar, your muscles can't release because there's no zero-crossing — DC at 60 V upward is treated as a let-go hazard; (2) hydrogen gas — lead-acid cells gas during charge, hydrogen accumulates in poorly-ventilated rooms, explosive at 4% LEL — battery rooms have forced ventilation for this reason; (3) electrolyte — sulphuric acid contact with skin / eyes — face shield, acid-resistant gloves, eye-wash station; (4) thermal runaway — a damaged or shorted cell can catch fire, with toxic fumes; (5) short-circuit current — a 100 Ah lead-acid string can deliver 5–10 kA short-circuit, enough to weld a spanner.",
      "Raise the question constructively in writing through line management, citing the rising customer expectations (PPN 06/21 flow-down from prime contractors, BREEAM and net-zero specifications on commercial work, customer sustainability questionnaires) as the commercial driver. Suggest a starter step such as collecting fuel card data and electricity bills for a pilot scope 1 and scope 2 inventory, or enrolling staff in Carbon Literacy training. Frame the conversation as commercial competitiveness rather than personal advocacy. Document the suggestion. Many medium-sized electrical contractors have moved from no carbon reporting to a published CRP within twelve months when the commercial case was made clearly.",
      "Anti-islanding requires a grid-connected generator (PV inverter, wind inverter, battery export inverter, micro-CHP, micro-hydro) to disconnect when the public distribution grid fails — even though it might still have local source energy and could in principle continue exporting. The safety reason: if the inverter continued exporting into a network the DNO had isolated for fault repair, line workers could be exposed to live conductors they thought were dead. ENA G98/G99 specifies the loss-of-mains detection settings (vector shift, ROCOF, voltage and frequency limits) and the maximum disconnection time.",
    ],
    correctAnswer: 0,
    explanation:
      "Integrated installs are the future of UK domestic electrical work. The L3 apprentice's role is real and significant — first-fix infrastructure, second-fix wiring, commissioning support, customer handover assistance. The MCS-2399, 2919, 2920, 2921 specialists sign off their own scope; the apprentice keeps the whole project coherent across the trade interfaces.",
  },
];

const faqs = [
  {
    question: "Is integrated PV plus battery plus heat pump plus EV actually common in UK domestic now?",
    answer:
      "Increasingly yes. New-build estates from major developers in 2024-2026 commonly include some combination of these (PV plus EV is near-universal on Future Homes Standard-compliant new-build; heat pump on most non-gas-grid new builds; battery sometimes optional). Major retrofit projects in homes worth investing in (e.g. Boiler Upgrade Scheme grants for heat pumps, OZEV grants for EV charging where eligible) often add multiple technologies at once because the customer is in the right mindset and the trades are already on site. The apprentice should expect this as the default trajectory of UK domestic electrical work over the next decade.",
  },
  {
    question: "What happens if the customer adds technologies one at a time over several years rather than all at once?",
    answer:
      "Slightly more complex but very common. The first install (often PV) sets the baseline. The second (often battery) is bolted on, requiring G98/G99 re-notification because the export profile changes. The third (often EV) needs a diversity check against the new combined load. The fourth (often heat pump) needs another diversity check and possibly a main-fuse upgrade. Each installer needs to be told what is already there and what is planned. The MCS-certified designer for each new addition should reference the existing installs. The customer ends up with a coherent integrated system over time rather than at one big bang — the cost is more visits and more individual sign-offs.",
  },
  {
    question: "Does the customer need a single 'system designer' or can each technology be specified independently?",
    answer:
      "On larger or more complex integrated installs, a single system designer with overview of all technologies is far more reliable. Each MCS-certified specialist tends to optimise for their own product; without a coordinator the integrated behaviour can fall apart (PV inverter that does not talk to the battery inverter; heat pump that does not respond to HEMS dispatch; EV charger that does not see the battery state). For simple installs (PV plus battery) the same MCS-certified designer often holds both certifications and handles both. For complex installs (PV plus battery plus heat pump plus EV) a coordinating role becomes valuable.",
  },
  {
    question: "How does a smart meter fit into an integrated install?",
    answer:
      "The smart meter is the supplier's import/export measurement device — it is not part of the customer's installation. But it produces a half-hourly reading that the supplier uses to bill the customer, which on a time-of-use tariff means correct billing depends on the smart meter being installed and operational. Some HEMS solutions also read the smart meter's local consumer access device (CAD) interface for real-time property total — useful where the integrated system does not have its own dedicated CT clamp. The apprentice's role on the smart meter is normally limited to ensuring the meter location is accessible and the local network/WiFi works for the supplier's commissioning visit.",
  },
  {
    question: "What is the typical lifetime mismatch between technologies on an integrated install?",
    answer:
      "Different technologies have different design lives. PV panels — 25-30 years with declining output. PV inverter — 10-15 years (typically replaced once during PV panel life). Battery pack — 10-15 years calendar / cycle limited. Heat pump — 15-20 years for the outdoor unit, longer for the indoor pipework. EV charger — 10-15 years. The customer should expect to replace the inverter and the battery roughly mid-life of the PV panels; the heat pump roughly at PV end-of-life; the EV charger somewhere in the middle. Plan the comms infrastructure to be re-usable across replacements — Cat5e/Cat6 to control locations is a long-term investment that survives multiple product replacements.",
  },
  {
    question: "Are there grants that cover integrated installs as a single package?",
    answer:
      "Some — and the landscape changes frequently. The Boiler Upgrade Scheme covers heat pumps; the EV Chargepoint Grant covers EV chargers for renters / flat-dwellers / landlords; the Smart Export Guarantee (SEG) is the export tariff for PV and battery (not a grant but a payment route). Local authority and devolved-administration schemes sometimes bundle multiple technologies. The MCS-certified installer handles grant applications; the customer should be referred to the current GOV.UK guidance for what is available at the time of install. As an apprentice you do not need to know the grant landscape in detail — but recognise that the customer's financial decision is often grant-dependent.",
  },
];

export default function Sub5() {
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
            eyebrow="Module 2 · Section 1 · Subsection 5"
            title="Whole-system integration"
            description="How PV, battery, heat pump and EV charging are coordinated as one system on a modern UK domestic project — Home Energy Management Systems, the consumer unit layout, the comms infrastructure, the diversity calculation across the full load mix, and the apprentice's role across the trade interfaces."
            tone="emerald"
          />

          <TLDR
            points={[
              "An integrated install coordinates PV, battery, heat pump and EV charging as one system rather than four separate products. Increasingly the default on new-build and major retrofit.",
              "A Home Energy Management System (HEMS) is the supervisory layer that reads tariff, weather, property load and dispatches the controllable assets. Without a HEMS the products do not talk to each other.",
              "Diversity calculation across the full load mix (heat pump plus EV plus shower plus oven plus rest of house) often shows the property's main fuse is constrained — load management or fuse upgrade required.",
              "Comms infrastructure (Cat5e/Cat6 to control locations, BMS comms cable, CT clamps) installed at first fix is far cheaper than retrofitting after the walls are closed.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define an integrated environmental technology install and list the typical components.",
              "Describe the role of a Home Energy Management System (HEMS) and identify common UK products.",
              "Explain why diversity calculation across the full load mix matters more on an integrated install than on a single-product install.",
              "Identify the comms infrastructure (Cat5e/Cat6, CAN bus, Modbus, CT clamps) typically required on an integrated install.",
              "Describe the typical consumer unit layout and labelling requirements on an integrated install.",
              "Identify the apprentice's contribution across the trade interfaces between MCS-certified specialists on an integrated install.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What integrated means</ContentEyebrow>

          <ConceptBlock
            title="Four products that behave as one coordinated system"
            plainEnglish="An integrated environmental install coordinates PV, battery storage, heat pump and EV charging (sometimes plus MVHR and smart heating controls) so that the whole property behaves as one optimised energy system. The PV charges the battery and the property; the battery time-shifts solar surplus to evening loads or covers peak-rate windows; the heat pump shifts run-time toward cheap windows where possible; the EV charger throttles to keep the property within its main-fuse limit. The Home Energy Management System (HEMS) is the supervisory layer that orchestrates the dispatch."
            onSite="On site this means more cables, more comms, more isolators and more careful labelling than a single-product install. The MCS-certified designer should produce a single integrated drawing showing all four (or more) technologies and the comms infrastructure between them. The apprentice's contribution is the cable infrastructure (mains plus comms), the consumer-unit layout, the CT clamp wiring, the supplementary bonding, and assistance with the coordinated commissioning sequence."
          >
            <p>
              Typical components of an integrated UK domestic install in 2024-2026:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV array</strong> — typically 4-8 kWp on the south-facing roof. MCS MIS 3002 governs install. ENA G98 covers grid notification.
              </li>
              <li>
                <strong>Battery storage</strong> — typically 5-20 kWh LFP wall-mounted unit. BS 7671 Section 826 plus IET Code of Practice for EESS. MCS MIS 3012 governs.
              </li>
              <li>
                <strong>Air-source heat pump</strong> — typically 5-12 kW outdoor unit plus indoor cylinder and controls. MCS MIS 3005 governs install. F-Gas Regulations cover refrigerant work.
              </li>
              <li>
                <strong>EV charge point</strong> — typically 7.4 kW Mode 3 wall unit. BS 7671 Section 722 plus IET Code of Practice for EV Charging Equipment Installation. OZEV Smart Charge Points Regulations 2021.
              </li>
              <li>
                <strong>HEMS</strong> — supervisory controller. May be a discrete unit (Loxone, GivEnergy GivEcoLink) or supplier-side aggregator (Octopus Intelligent, ev.energy).
              </li>
              <li>
                <strong>MVHR (sometimes)</strong> — Building Regs Part F. Standard on Future Homes Standard new-build.
              </li>
              <li>
                <strong>Smart heating controls (sometimes)</strong> — TRVs, programmable thermostats, weather compensation. Integrates with HEMS dispatch.
              </li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.inverter.url}
            title={videos.inverter.title}
            channel={videos.inverter.channel}
            duration={videos.inverter.duration}
            topic="The inverter — central component in a whole-system install"
            caption="In an integrated PV + battery + heat-pump + EV property the inverter (or inverters) is the shared component that ties DC harvest and storage to the AC consumer unit. Understanding the inverter is foundational to reading the whole system."
          />

          <SectionRule />

          <ContentEyebrow>The HEMS supervisory layer</ContentEyebrow>

          <ConceptBlock
            title="A HEMS is the brain that lets four products behave as one system"
            plainEnglish="Each individual product (PV inverter, battery inverter, heat pump controller, EV charger) has its own controller and its own app. Without a supervisory layer, those four controllers operate independently — they do not coordinate. A Home Energy Management System (HEMS) sits above them, reads the property's net flow at the meter or via dedicated CT clamps, knows the time-of-use tariff schedule, knows the weather forecast (so it knows the predicted PV output), and dispatches the controllable loads to optimise across all of them."
            onSite="HEMS solutions vary. Some are discrete on-site controllers (Loxone, Home Assistant, GivEnergy GivEcoLink). Some are cloud-side aggregators run by the energy supplier (Octopus Intelligent for combined EV plus heat pump plus battery dispatch; ev.energy for managed EV charging). Some are built into one product's controller and orchestrate the others (Tesla Powerwall app, GivEnergy app). The apprentice's role is the wiring infrastructure — mains supply, network sockets, CT clamp signal cables, BMS comms — that the HEMS needs to function. The HEMS commissioning itself is normally done by the system designer remotely or on site."
          >
            <p>
              What a HEMS optimises:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tariff-aware dispatch</strong> — battery charges during cheap windows, discharges during expensive windows. Heat pump shifts run-time toward cheap windows where possible.
              </li>
              <li>
                <strong>PV self-consumption</strong> — battery charges from PV surplus before exporting; EV charger uses PV surplus where the customer's car is plugged in during the day.
              </li>
              <li>
                <strong>Weather-aware forecasting</strong> — predicts tomorrow's PV output and pre-charges or pre-discharges the battery accordingly.
              </li>
              <li>
                <strong>Property load management</strong> — when concurrent loads approach the main-fuse limit, throttles or pauses the controllable loads (EV, heat pump compressor) to keep the property below the cut-out.
              </li>
              <li>
                <strong>Backup mode</strong> — on grid loss, isolates from the grid and feeds selected backup circuits from the battery (subject to inverter capability).
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

          <ContentEyebrow>Diversity across the full load mix</ContentEyebrow>

          <ConceptBlock
            title="A constrained main fuse is the single biggest design constraint on an integrated install"
            plainEnglish="A typical UK domestic single-phase supply is 60, 80 or 100 A. At 230 V that is 13.8, 18.4 or 23 kVA respectively. A modern fully-integrated property with heat pump (5-7 kW), EV charger (7.4 kW), shower (9.5 kW) and oven (4 kW) plus the rest of the house can headline well above any of those limits. The diversity calculation determines what the realistic concurrent maximum is and whether the property's main fuse can take it."
            onSite="The MCS-certified designer runs the calculation per the IET On-Site Guide. Common mitigations: (1) dynamic load management on the EV charger via CT clamp; (2) heat pump compressor modulation that keeps it below nameplate most of the time; (3) battery storage to time-shift load; (4) HEMS dispatch to avoid concurrent peaks; (5) main-fuse upgrade by the DNO (free in many areas, takes weeks). The apprentice's role is to flag the constraint when the headline maximum looks suspicious and not just bolt the loads on without checking."
          >
            <p>
              Worked example — typical 1990s 4-bed semi:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Existing</strong> — 9.5 kW shower, 4 kW oven, 3 kW immersion (rarely used). Main fuse 80 A. Headline maximum around 16.5 kW = 72 A. Fits.
              </li>
              <li>
                <strong>Add EV charger 7.4 kW</strong> — headline rises to 24 kW = 104 A. Exceeds 80 A. Without load management, would trip cut-out under concurrent draw.
              </li>
              <li>
                <strong>Add load management</strong> — EV charger throttles when shower or oven runs. Realistic concurrent maximum drops to around 80 A. Fits.
              </li>
              <li>
                <strong>Add heat pump 7 kW (compressor peak)</strong> — heat pump rarely runs at full load; modulates to typically 2-4 kW. With load management on EV and heat pump scheduling via HEMS, realistic concurrent maximum stays near 80 A. Fits.
              </li>
              <li>
                <strong>Add battery storage</strong> — battery covers peak-window concurrent draw, further reducing grid import during expensive windows. Effective grid demand drops below main-fuse limit even during cooking + showering + EV charging.
              </li>
            </ul>
            <p>
              The pattern: each new technology added without coordination would push past the main fuse; with coordination and load management, the same property absorbs them all. The MCS-certified designer is the person who makes the calculation work; the apprentice's contribution is to install the load-management infrastructure correctly.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Comms infrastructure at first fix</ContentEyebrow>

          <ConceptBlock
            title="Cable comms infrastructure into every control location is non-negotiable"
            plainEnglish="Modern integrated systems use a mix of wired Ethernet, WiFi, Modbus RS485, CAN bus and proprietary serial protocols to coordinate. Wired infrastructure installed at first fix is far cheaper than retrofitting after the walls are closed and far more reliable than depending on WiFi for safety-critical functions like load management."
            onSite="At first fix the apprentice should run Cat5e or Cat6 cable to: (1) the consumer unit / metering location; (2) the battery and inverter location; (3) the heat pump indoor controller; (4) the EV charge point. Plus dedicated comms cable runs that the install manuals specify (BMS-to-inverter CAN bus is usually a short run inside one enclosure; longer Modbus RS485 between battery inverter and heat pump may be specified by some HEMS designs; CT clamp signal cables back to whichever device consumes the data). The MCS-certified designer should produce a comms drawing alongside the mains drawing — if they do not, ask for it."
          >
            <p>
              Comms cable types and where they go:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cat5e / Cat6</strong> — to control locations for IP-based comms, smart meter CAD interface, HEMS controller. Future-proof; replace easily from one end if a connector goes bad.
              </li>
              <li>
                <strong>BMS-to-inverter CAN bus</strong> — usually a short manufacturer-supplied cable inside the battery enclosure or between battery and adjacent inverter. Critical for safe operation.
              </li>
              <li>
                <strong>Modbus RS485</strong> — sometimes specified between battery inverter and heat pump or HEMS. Twisted-pair, terminated at both ends, polarity-sensitive. Read the manual.
              </li>
              <li>
                <strong>CT clamp signal cables</strong> — usually low-voltage shielded twisted pair from CT clamp at supply tail back to the consuming device. Each device that needs the measurement may want its own CT clamp.
              </li>
              <li>
                <strong>WiFi only</strong> — acceptable for non-safety-critical functions (e.g. customer app monitoring). Not acceptable for load management or PEN-fault detection signalling. Wired-with-WiFi-backup is the safer architecture.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 514 (Identification and notices)"
            clause={
              <>
                "Each protective device, switch, isolator and item of equipment shall be appropriately labelled to indicate its purpose. For installations including environmental technology systems, the labelling shall identify supply origins, isolation points, the type of earthing arrangement and any specific emergency operation instructions."
              </>
            }
            meaning={
              <>
                Section 514 of BS 7671 covers identification and notices for the whole installation. On an integrated environmental install, the labelling burden is significantly larger — multiple inverters, multiple isolators, multiple comms cables, multiple service requirements. A4:2026 has refined the requirements alongside the broader updates. The IET Codes of Practice for PV, battery and EV charging add product-specific labelling requirements; the MCS Code of Practice requires customer-facing handover documentation. The apprentice should expect to label more, document more and brief the customer more thoroughly than on a single-product install.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 514 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 514 (Identification and notices) — revisions"
            clause={
              <>
                Section 514 (Identification and notices) of BS 7671:2018+A4:2026 has been
                updated with a number of significant changes. These changes affect requirements
                for identification and notices within the Wiring Regulations and replace or
                modify prior illustrations and examples. Illustrations of notices that
                previously appeared in Section 514 have been removed; designers and installers
                shall use Appendix 11 for examples of notices.
              </>
            }
            meaning={
              <>
                On an integrated PV + battery + EV install you&apos;ll need notices for every
                origin, isolation point and unique earthing arrangement. The notice
                illustrations now live in Appendix 11 — don&apos;t go looking for them in
                Section 514 itself. The wording requirements are unchanged in substance; only
                the location of the example layouts has moved.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 514."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 133.1.3 (Selection of equipment — equipment usage on certification)"
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
                Integrated systems make this rule bite — you&apos;ll have a hybrid inverter, a
                battery, an EV charger and a HEMS controller all selected for specific functions.
                Where BS 7671 asks the role to be recorded, the EIC is where it goes. The
                inspector reading your certificate later relies on these entries to verify the
                protective measures match the equipment you actually installed.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 133.1.3."
          />

          <SectionRule />

          <ContentEyebrow>The UK HEMS market landscape</ContentEyebrow>

          <ConceptBlock
            title="Three flavours of HEMS — supplier-side, manufacturer-side and open-source"
            plainEnglish="HEMS solutions in the UK split into three approaches. Supplier-side aggregators (Octopus Intelligent, ev.energy, OVO Charge Anytime) sit at the energy supplier and dispatch the property&apos;s controllable loads in exchange for a tariff discount. Manufacturer-side controllers (GivEnergy app, Tesla Powerwall app, SolarEdge ONE, Sungrow iSolarCloud) come built into one product and orchestrate that vendor&apos;s ecosystem. Open-source / agnostic controllers (Home Assistant, Loxone, evcc) work across vendors but require commissioning skill and ongoing maintenance."
            onSite="The L3 apprentice does not pick the HEMS — that is the customer&apos;s decision (often steered by the energy supplier or the system designer). What you do need to know is which HEMS the customer has bought, because that determines the comms infrastructure, the device settings and the commissioning sequence. Supplier-side aggregators usually need only a smart meter CAD interface and the right tariff signed up to. Manufacturer-side controllers usually need everything to be from that vendor and may not play nicely with mixed kit. Open-source controllers need wired Ethernet to every controllable device and are the strongest fit for fully-mixed-vendor installs."
          >
            <p>
              The three approaches and where each fits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supplier-side (Octopus Intelligent Octopus Go, ev.energy, OVO Charge Anytime)</strong>
                — cloud aggregator dispatches the customer&apos;s EV charger and increasingly
                heat pump and battery in exchange for a discounted tariff. Minimal
                on-site infrastructure required; depends on the customer staying with that
                supplier.
              </li>
              <li>
                <strong>Manufacturer-side (GivEnergy GivEcoLink, Tesla app, SolarEdge ONE,
                Sungrow iSolarCloud)</strong> — one vendor&apos;s controller orchestrates that
                vendor&apos;s products. Smooth integration within ecosystem; brittle when
                customer mixes vendors.
              </li>
              <li>
                <strong>Open-source / agnostic (Home Assistant, Loxone, evcc)</strong> —
                vendor-neutral; works with mixed kit via Modbus, MQTT, REST APIs. Requires
                a competent installer and ongoing maintenance. Strongest fit for
                whole-house integration where customer values flexibility over
                single-supplier convenience.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fault-finding on an integrated install</ContentEyebrow>

          <ConceptBlock
            title="Layered fault-finding — separate the products before blaming the integration"
            plainEnglish="When something goes wrong on an integrated install, the temptation is to blame &apos;the system&apos; rather than isolating which layer is at fault. The disciplined approach is to peel the layers apart — confirm each individual product is functioning standalone, then confirm the comms between them, then confirm the HEMS dispatch. Most integrated faults trace to a comms link or a HEMS configuration setting rather than to a hardware failure."
            onSite="A typical fault report is &apos;the EV charger is not using my solar surplus&apos;. Layered diagnostic: (1) Is the PV array generating? Check the PV inverter app or the generation meter. (2) Is the surplus actually flowing? Check the smart meter or a clamp meter on the supply tail. (3) Is the EV charger seeing the surplus? Check the CT clamp orientation and the charger&apos;s app reading. (4) Is the HEMS telling the charger to use surplus? Check the HEMS dispatch setting and tariff schedule. (5) Is the car accepting the throttled charge rate? Some EVs reject very low charge rates and pause until the surplus is high enough. Each layer takes a minute to check; the fault almost always falls out of the sequence."
          >
            <p>
              Common integrated-install fault categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CT clamp wrong orientation or wrong tail</strong> — the device
                thinks the property is exporting when it is importing or vice versa.
                Most common cause of &quot;the charger is not respecting load
                management&quot;.
              </li>
              <li>
                <strong>BMS comms cable wrong type or wrong port</strong> — the inverter
                cannot read battery state. Most common cause of &quot;battery shows full
                but inverter shows empty&quot;.
              </li>
              <li>
                <strong>HEMS dispatch setting not enabled</strong> — the device is wired
                correctly but the HEMS profile is set to &quot;manual&quot; or
                &quot;eco&quot; rather than &quot;PV surplus&quot;. Customer hears
                &quot;the system is broken&quot;; the install is fine, the setting needs a
                change.
              </li>
              <li>
                <strong>WiFi dropouts on safety-critical signalling</strong> — load
                management fails intermittently. Cure: pull wired Ethernet, do not depend
                on WiFi for safety-critical signalling.
              </li>
              <li>
                <strong>Tariff schedule out of date</strong> — the customer changed
                tariff six months ago and the HEMS is still using the old schedule.
                Battery charges at the wrong time. Easy fix once spotted.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Customer handover — the make-or-break of the install</ContentEyebrow>

          <ConceptBlock
            title="A good handover is what turns a complex install into a happy customer"
            plainEnglish="An integrated environmental install is significantly more complex than the customer realises. They have bought four products, four apps, multiple isolators, a labelled consumer unit, a HEMS controller, a comms infrastructure, and a tariff arrangement. Without a structured handover they will not know what is normal, what is a fault, what to do in a power cut, what to expect from each technology and who to call when something looks wrong."
            onSite="The handover should cover: (1) the labelled consumer unit and how to isolate any of the four systems; (2) what each app does and which is the &apos;main&apos; one; (3) what backup mode actually delivers (which sockets, how long); (4) what the customer should expect day-to-day (the EV charger pausing under load, the heat pump running quietly most of the time, the battery cycling daily); (5) how to read the smart meter / HEMS app to confirm savings; (6) the maintenance schedule for each product; (7) the warranty contacts for each product; (8) the next inspection / EICR date. A printed handover pack plus a 20-minute walk-through is the minimum. Many MCS contractors offer a 6-month follow-up call to verify operation and tweak settings."
          >
            <p>
              Handover pack contents — what every integrated install should ship with:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-line schematic</strong> — laminated, fixed inside the
                consumer-unit door, showing PV, battery, heat pump, EV and the property
                supply with all isolation points marked.
              </li>
              <li>
                <strong>Labelled circuit list</strong> — every breaker and RCBO labelled
                with its function and any backup behaviour.
              </li>
              <li>
                <strong>Each product&apos;s install certificate</strong> — MCS PV (MIS
                3002), MCS BESS (MIS 3012), MCS heat pump (MIS 3005), EV (Section 722
                certificate). Each is registered with MCS and the certificate generated
                by the certified installer.
              </li>
              <li>
                <strong>BS 7671 Electrical Installation Certificate</strong> — for any new
                circuits installed.
              </li>
              <li>
                <strong>HEMS commissioning report</strong> — confirming dispatch settings,
                CT clamp orientations, comms link status.
              </li>
              <li>
                <strong>User guides and app credentials</strong> — for each product.
                Customers regularly forget which app does what; collated guide is
                appreciated.
              </li>
              <li>
                <strong>Backup-mode brief</strong> — written, with a sticker on the CU
                identifying which sockets stay live in a power cut.
              </li>
              <li>
                <strong>DNO connection paperwork</strong> — G98 / G99 confirmation.
              </li>
              <li>
                <strong>Warranty schedule and emergency contacts</strong> — who to call
                for what, in priority order.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where the market is heading</ContentEyebrow>

          <ConceptBlock
            title="The 2030 trajectory — every install will be integrated by default"
            plainEnglish="UK domestic electrical work is changing fast. The Future Homes Standard (expected 2025+ for new build) takes fossil-fuel boilers off new construction, mandates fabric performance, and effectively assumes heat pump plus PV plus EV ready as the baseline. The Smart Export Guarantee, dynamic time-of-use tariffs, V2G pilots, OZEV grants and the broader net-zero pathway all point in the same direction. By 2030 the &apos;non-integrated&apos; install will be the unusual one."
            onSite="For the L3 apprentice this is the career-defining trend. The skills that matter post-2030 — comms infrastructure design, multi-vendor integration, HEMS commissioning, load-management commissioning, customer-facing handover of complex systems — are exactly the skills covered by Unit 301 plus the MCS standalone qualifications layered on top. Treat L3 Module 2 as the foundation, not the destination. The MCS quals (2399 PV, 2919 ASHP, 3012 BESS, 2921 EV) build on top of the foundation; specialist commercial work (workplace fleet charging, large commercial BESS, integrated commercial HEMS) builds on top of those. The market is rewarding electricians who treat environmental integration as core competence rather than an optional extra."
          >
            <p>
              Five trends shaping the 2026-2030 UK environmental electrical market:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Future Homes Standard mainstreaming</strong> — heat pumps and PV
                become the default on new build; gas boilers off new build by 2025+. EV
                charging cabling pre-installed at construction.
              </li>
              <li>
                <strong>Dynamic tariff penetration</strong> — Octopus Agile, Cosy,
                Intelligent and equivalent products at other suppliers reshape the
                customer&apos;s economic case. Battery storage payback drops into 6-8 year
                range on dynamic tariffs.
              </li>
              <li>
                <strong>V2H first, V2G next</strong> — bidirectional charging starts in
                pilots and small-scale deployments by 2026; mainstream by late 2020s as
                vehicle support grows and units become affordable.
              </li>
              <li>
                <strong>Heat pump scale-up</strong> — Boiler Upgrade Scheme (BUS),
                Clean Heat Market Mechanism on manufacturers, and rising gas prices push
                heat pump volumes upward sharply through to 2030.
              </li>
              <li>
                <strong>EICR scope expansion</strong> — periodic inspection of
                environmental tech is becoming part of the standard EICR scope. The L3
                electrician is the typical inspector — competence in environmental
                interfaces will be priced into the EICR market.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping wired comms infrastructure at first fix and relying on WiFi alone"
            whatHappens={
              <>
                Apprentice runs the mains supply to inverter, heat pump and EV charger but skips the Cat5e runs to each location, on the basis that 'each device has WiFi'. Six months later the customer reports that the EV charger sometimes does not respect the load-management limit; the heat pump sometimes does not enter eco mode when the battery is full; the HEMS dispatch is unreliable. Investigation: the WiFi signal in the garage and the loft is poor, the connections drop, and the safety-critical load-management signalling is missing key updates. Retrofit of Cat5e through a finished wall costs more than the whole comms run would have at first fix.
              </>
            }
            doInstead={
              <>
                Pull Cat5e or Cat6 to every control location at first fix as a matter of course. Network sockets cost pennies; cable and labour are cheap when the walls are open. Even if the chosen HEMS happens to use WiFi at commission, the customer (or the next system upgrade) will benefit from having wired infrastructure available. Plan the cable routes alongside the mains, not as an afterthought.
              </>
            }
          />

          <CommonMistake
            title="Independent commissioning of each product without a coordinated sequence"
            whatHappens={
              <>
                Each MCS specialist commissions their own product on their own visit. The PV inverter is commissioned before the battery is on site; the battery is commissioned before the EV charger CT clamp is installed; the heat pump is commissioned before the HEMS knows the rest of the system exists. Each individual product passes its own commissioning checks, but the integrated behaviour fails — the EV charger does not see the battery state, the battery does not respond to HEMS dispatch, the heat pump does not get the signal to defer. Customer reports 'nothing works as advertised' even though every product is individually 'working'.
              </>
            }
            doInstead={
              <>
                Insist on a coordinated commissioning sequence from the system designer. Each product's commissioning depends on the others being in a known state. The sequence typically goes: existing baseline checks → PV install and energise → battery install (DC side, BMS comms, AC side, commissioning) → EV charger install (mains, CT clamp, PEN-fault test, OZEV-compliance settings) → heat pump electrical commissioning (refrigerant work is F-Gas, separate scope) → HEMS commissioning that pulls all four into one system → integrated test → customer handover. The apprentice should be familiar with the sequence and flag if it is being skipped.
              </>
            }
          />

          <Scenario
            title="Apprentice on a fully integrated retrofit — 1980s 4-bed detached"
            situation={
              <>
                You are the apprentice on a multi-week retrofit. The customer is fitting 6 kWp PV, a 13.5 kWh LFP battery (AC-coupled retrofit because PV is being installed and the inverter is bought as a hybrid for a future DC upgrade), a 7 kW air-source heat pump replacing a 30-year-old gas boiler, and a 7.4 kW EV charger. Existing 80 A main fuse. Existing 9.5 kW shower and 4 kW oven. The MCS-certified designer has produced an integrated drawing showing the comms infrastructure (Cat6 to four locations plus CT clamp signal cables to the consumer unit), the consumer unit layout (new 18-way CU with dedicated RCBOs / AFDDs for each of the four new circuits plus the existing house circuits), and a coordinated commissioning sequence.
              </>
            }
            whatToDo={
              <>
                First fix: pull mains supply cables to PV inverter location, battery inverter location, heat pump outdoor unit location, EV charger location. Pull Cat6 to all four control locations plus to the metering location. Pull CT clamp signal cable from the consumer unit to the EV charger, the battery inverter and the HEMS controller (three CT clamps to install on the supply tail in the orientation each manual specifies). Install the new 18-way consumer unit with the labelled RCBOs / AFDDs in the agreed layout. Second fix: terminate at each device per the manufacturer's wiring diagrams; install CT clamps in the correct orientation; landing all the comms cables. Coordinated commissioning: assist the PV specialist with the PV side, the battery specialist with the battery side, the heat pump specialist with the heat pump electrical side, the EV specialist with the charger side; assist the HEMS commissioning at the end to bring the four products into one integrated system. Customer handover: the labelled CU, the integrated documentation pack, a five-minute brief on the HEMS app and what to expect from each technology.
              </>
            }
            whyItMatters={
              <>
                This is the future of UK domestic electrical work. The L3 apprentice's role is real and significant — first-fix infrastructure, second-fix wiring, commissioning support across multiple specialists, customer handover assistance. Each MCS specialist signs off their own scope; the apprentice keeps the integrated install coherent across the trade interfaces. Recognising this scope at L3 is part of being employable in the post-2030 UK domestic electrical market.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "An integrated install coordinates PV, battery, heat pump and EV charging as one system rather than four separate products. Increasingly the default on UK new-build and major retrofit.",
              "A Home Energy Management System (HEMS) is the supervisory layer that orchestrates the dispatch — without it, the four products operate independently and miss the integrated behaviour the customer was sold.",
              "Diversity calculation across the full load mix matters more than ever. A typical 80 A main fuse can absorb heat pump plus EV plus shower plus oven only with load management and HEMS dispatch.",
              "Comms infrastructure (Cat5e/Cat6 to every control location, BMS comms cable, CT clamp signal cables) installed at first fix is far cheaper than retrofitting and far more reliable than WiFi-only.",
              "The consumer unit on an integrated install is typically larger (16-24 way), more populated and requires careful planning of cable management, RCBOs / AFDDs and labelling per BS 7671 Section 514.",
              "Multiple CT clamps on the same supply tail are common — one per consuming device (EV charger, battery inverter, HEMS) each in the correct orientation per its own manual.",
              "Coordinated commissioning sequence (PV → battery → EV → heat pump electrical → HEMS) is essential. Independent commissioning produces individual products that 'work' but integrated behaviour that fails.",
              "The L3 apprentice's role on an integrated install is real — first-fix infrastructure, second-fix wiring, commissioning support across MCS specialists, customer handover. Each MCS specialist signs off their own scope; the apprentice keeps the install coherent.",
            ]}
          />

          <Quiz title="Whole-system integration — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 EV charging deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — Standards and statutory framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
