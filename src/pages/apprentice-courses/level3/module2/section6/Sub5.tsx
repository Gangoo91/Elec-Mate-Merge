/**
 * Module 2 · Section 6 · Subsection 5 — Scope 1 / 2 / 3 emissions for an electrical contractor and carbon literacy
 * City & Guilds 2365-03 / Unit 301 / Sustainable working practices
 *
 * Layered depth: 2357 Unit 602 ELTK02 / LO3 supplementary — GHG Protocol Corporate Standard
 * applied to a UK electrical contracting business, the rising tender requirement for a Carbon
 * Reduction Plan under PPN 06/21, and the Carbon Literacy Project framework for trade-level
 * awareness training.
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
  'Scope 1 / 2 / 3 emissions and carbon literacy (6.5) | Level 3 Module 2.6.5 | Elec-Mate';
const DESCRIPTION =
  'The Greenhouse Gas Protocol scope 1 (direct), scope 2 (purchased energy) and scope 3 (value chain) framework applied to a UK electrical contracting business. Carbon Reduction Plan requirements under PPN 06/21, the Carbon Literacy Project framework, and the practical inventory steps an apprentice can recognise on site.';

const checks = [
  {
    id: 'l3-m2-s6-sub5-scopes',
    question:
      "An electrical contracting firm runs ten diesel transit vans, owns the small workshop building it operates from, draws grid electricity for workshop lighting and small power, and buys cable, accessories and tools from a wholesaler. Allocate these emission sources to scope 1, 2 and 3 under the GHG Protocol.",
    options: [
      "Have a direct, private conversation with the co-worker first. State clearly that the comments aren't welcome and you'd like them to stop ('I know it's meant as banter, but the accent comments aren't landing as funny — I'd appreciate it if you stopped'). Keep it brief, don't argue. If the comments continue, raise it with your supervisor or your training-provider mentor. Repeated unwanted conduct related to a protected characteristic (race, in this case) is harassment under Equality Act 2010 s.26 — it doesn't have to be 'severe' to count, just unwanted, repeated and connected to a protected characteristic. Document the conversations in writing.",
      "WEEE removed during install or repair must be segregated from general waste and routed to an Approved Authorised Treatment Facility (AATF) for recovery and recycling. The waste producer (you or your employer) holds the Duty of Care under the Environmental Protection Act 1990 to ensure the waste is properly described, transferred to an authorised waste carrier, and accompanied by a waste transfer note that is retained for at least two years. Many electrical wholesalers operate as WEEE collection points under the Distributor Take-Back Scheme.",
      "Scope 1 (direct emissions from sources owned or controlled by the company): diesel combustion in the ten transit vans plus any natural gas burnt in the workshop heating boiler. Scope 2 (indirect emissions from purchased energy): grid electricity drawn for workshop lighting and small power. Scope 3 (other indirect emissions across the value chain): embodied carbon in the cable, accessories and tools purchased from the wholesaler, employee commuting, business travel by means other than company vehicles, waste disposal, and the use-phase emissions of the systems the contractor installs at customer sites.",
      "kWp (kilowatt-peak) is the array's nameplate output under Standard Test Conditions (1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum). It's a laboratory rating, not a real-world output. Annual yield in the UK is normally quoted as kWh per kWp per year — typically 800-1100 depending on roof orientation, pitch and shading. So a 4 kWp array on a south-facing roof in southern England might deliver 4 × 1000 = 4000 kWh per year; the same array on a north-facing roof might deliver 4 × 600 = 2400 kWh. The kWp tells you the size; the kWh per kWp tells you the real-world.",
    ],
    correctIndex: 2,
    explanation:
      "The three-scope framework comes from the GHG Protocol Corporate Standard and is the global default for corporate carbon accounting. Scope 1 is what the company burns directly; scope 2 is what the company buys as energy; scope 3 is everything else across the value chain — purchased goods and services, capital goods, employee commuting, business travel, waste, transport, use-phase emissions of sold products, end-of-life of sold products. For an electrical contractor scope 3 is typically the largest by a wide margin because purchased materials (especially cable, with its embodied copper) dominate.",
  },
  {
    id: 'l3-m2-s6-sub5-ppn',
    question:
      "What is PPN 06/21 and how does it affect electrical contractors bidding for UK government contracts?",
    options: [
      "Three acceptable methods. (1) The charge point includes built-in PEN-fault detection-and-disconnection — most modern UK domestic units (Zappi, Ohme, Hypervolt, Wallbox, GivEnergy) include this and the manufacturer's spec confirms compliance. (2) The EV side is on a dedicated TT earth electrode separate from the property's TN-C-S earth — used where the unit does not include built-in detection or where the install configuration favours TT. (3) An external PEN-fault detection device (separate enclosure) is fitted upstream of the unit. Method 1 is the dominant approach in 2024-2026; Method 2 is still common; Method 3 is the historical approach that pre-dates built-in detection and is now uncommon. A4:2026 has refined the technical detail of each method.",
      "Most firms now use digital MWC apps — Elec-Mate's MWC builder, NICEIC Online, ElectricalCertifyPro, iCertifi. The workflow: (1) Open the app on the van laptop or phone. (2) Pull customer + installation details from the existing job (or scan the previous EIC's QR code). (3) Fill in the work-done description, the test results panel (entered as you measure with the MFT), Designer / Constructor / Inspector signatures (digital signature pad). (4) Customer signs receipt on the device. (5) PDF emailed to the customer; copy filed in the firm's job system; QR code printed for the DB sticker if the firm uses them. The whole process takes 5&ndash;10 minutes if the data is pre-loaded. Paper certificates are still valid but increasingly rare.",
      "kWp (kilowatt-peak) is the array's nameplate output under Standard Test Conditions (1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum). It's a laboratory rating, not a real-world output. Annual yield in the UK is normally quoted as kWh per kWp per year — typically 800-1100 depending on roof orientation, pitch and shading. So a 4 kWp array on a south-facing roof in southern England might deliver 4 × 1000 = 4000 kWh per year; the same array on a north-facing roof might deliver 4 × 600 = 2400 kWh. The kWp tells you the size; the kWh per kWp tells you the real-world.",
      "Procurement Policy Note 06/21 (Taking account of Carbon Reduction Plans in the procurement of major government contracts) requires bidders for UK central government contracts above 5 million pounds per year to publish a Carbon Reduction Plan that confirms commitment to net-zero by 2050, sets out current emissions across scopes 1, 2 and a defined subset of scope 3, and identifies environmental management measures. The CRP must be published on the bidder website and updated annually. Contractors that cannot produce a compliant CRP are excluded from the tender. The threshold can flow down to subcontractors on smaller contracts where the prime requires it.",
    ],
    correctIndex: 3,
    explanation:
      "PPN 06/21 has changed the procurement landscape for any electrical contractor selling to UK central government. The CRP requirement is now bid-stage essential for the higher-value contracts, and prime contractors increasingly flow it down to their supply chain. Many medium-sized electrical firms now publish a CRP voluntarily even if they do not bid for direct government work, because the prime contractors they serve require it as a tier-2 supplier expectation. As an apprentice you may be asked to support the data collection (vehicle mileage, fuel cards, electricity bills, waste records) that feeds into the CRP.",
  },
  {
    id: 'l3-m2-s6-sub5-literacy',
    question:
      "What is the Carbon Literacy Project and why are major UK construction and electrical employers signing up their workforces?",
    options: [
      "BS 7671 527.2 + Building Regs Approved Document B require fire-stopping at the cable penetration. The hole around the cable must be sealed with intumescent material that maintains the fire rating of the wall / floor (typically 60 minutes for compartment walls, 30 minutes for protected escape routes). Standard products: Promat PROMASEAL, Hilti CP series, FireFly fire collars. The electrician fits the fire-stop; the customer's responsible person under RR(FS)O 2005 needs to know it's been done. Skipping fire-stopping creates a fire-spread path that defeats the building's compartmentation strategy. Code 1 (Danger Present) finding on EICR if not done.",
      "GN3 sets the practical method for Zs measurement and the interpretation of results. Key points: (1) Use the TWO-LEAD method on socket-outlets if possible (cleaner reading than the three-lead). (2) Read at the FURTHEST point of the circuit from the protective device, not at the DB. (3) Apply the temperature-correction factor (the measured Zs is at ambient, but the protective device must operate when conductors are at running temperature, normally taken as 70 &deg;C for general PVC); GN3 gives the multiplier (typically 1.20 for cables at 70 &deg;C from 20 &deg;C ambient). (4) Compare the corrected Zs against the BS 7671 maximum for the device type and rating in Tables 41.2 to 41.4 OR use the 0.8 rule of thumb. (5) RECORD the actual reading on the test schedule, not just the pass/fail.",
      "The Carbon Literacy Project is a UK accredited training framework (originated in Manchester in 2012) that provides workplace-level training to give every worker a working understanding of climate science, the carbon impact of their own role, and the practical steps they can take to reduce emissions at work and at home. Trainees become Certified Carbon Literate after completing eight hours of training and a documented commitment to action. Major UK construction firms (Balfour Beatty, Mace, ISG, Skanska) and increasingly larger electrical contractors are running Carbon Literacy training to build workforce-wide awareness, support CRP commitments, and meet the people-development credits in BREEAM, the UK Net-Zero Carbon Buildings Standard and similar schemes.",
      "Six-step. (1) Energise the RCD with all appliances disconnected on the protected circuits. (2) Clamp meter L+N together at the RCD output — note baseline leakage (typically 1–3 mA on healthy installation). (3) Connect appliances ONE AT A TIME, watching the clamp reading. (4) The appliance whose connection causes a sudden jump (e.g. baseline 2 mA, jumps to 18 mA on connecting the dishwasher) is the leaky one. (5) For confirmation, disconnect that appliance only — leakage drops back. (6) For appliances with intermittent leakage (e.g. heating element fails on heat cycle only), trigger the operating mode and watch for the leakage rise. Identifies the leaky appliance without needing to repeat the trip-and-reset cycle.",
    ],
    correctIndex: 2,
    explanation:
      "Carbon Literacy is the workforce equivalent of a basic first-aid course for climate competence. The training is short (typically a day), accredited, and explicitly action-oriented — every trainee commits to one personal and one workplace action. For an electrical contractor it builds the foundation for staff to engage meaningfully with the firm CRP, to spot waste reduction opportunities on site, and to talk to customers credibly about heat pumps, EV charging and PV. As an apprentice you may well be enrolled in a Carbon Literacy session early in your career.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the difference between scope 1, scope 2 and scope 3 emissions under the GHG Protocol Corporate Standard?",
    options: [
      "It recovers heat that would otherwise be lost in extracted ventilation air. Stale warm air from kitchens and bathrooms is drawn through one side of a counter-flow heat exchanger; fresh cold supply air is drawn through the other side. 80-90% of the heat in the extract air transfers to the supply air. The fan power consumed is small compared to the heat recovered, especially in well-insulated, airtight homes that need controlled ventilation anyway. Net effect: lower heat-loss bill.",
      "Scope 1 covers direct emissions from sources owned or controlled by the reporting company — fuel combustion in company vehicles and on-site boilers, fugitive emissions from refrigerant and similar. Scope 2 covers indirect emissions from the generation of purchased energy (electricity, steam, heat, cooling) consumed by the company. Scope 3 covers all other indirect emissions across the company value chain — purchased goods and services, capital goods, transport and distribution, employee commuting, business travel, waste, use of sold products, end-of-life of sold products and others. The GHG Protocol identifies fifteen scope 3 categories.",
      "(a) To use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided in accordance with any training in the use of that equipment and the instructions respecting that use; AND (b) to inform the employer of any work situation which a person with the training and instruction given to them would reasonably consider represented a serious and immediate danger to health and safety, AND of any matter which a person with the training given would reasonably consider represented a shortcoming in the employer's protection arrangements.",
      "Treat it as 'asbestos suspect until proven otherwise'. Buildings constructed before 2000 (and refurbished before 2000) can contain asbestos in textured ceilings, insulation board, cement products, floor tiles and pipe lagging. Stop and check the asbestos register if the building has one (commercial buildings are required to have one under the Control of Asbestos Regulations 2012). For a domestic property without a register, assume suspect material is present and avoid disturbance until you can verify or arrange a survey.",
    ],
    correctAnswer: 1,
    explanation:
      "The three-scope framework is the global default for corporate carbon accounting and underpins almost every climate disclosure regime. For an electrical contractor: scope 1 is mainly van diesel and any gas heating in workshops; scope 2 is grid electricity drawn at workshops and offices; scope 3 is everything else, dominated by purchased materials (cable, accessories, plant) and use-phase emissions of installed systems. The fifteen scope 3 categories are not all material for every business — most contractors focus on purchased goods, transport, employee commuting, business travel and waste as the material categories.",
  },
  {
    id: 2,
    question:
      "Why is scope 3 typically the largest emissions category by a wide margin for an electrical contractor?",
    options: [
      "Each product's commissioning depends on the others being in a known state. The battery commissioning needs the inverter live; the inverter needs the PV strings energised; the EV charger's load management needs the CT clamp reading correctly; the heat pump's smart controller needs network access to the HEMS; the HEMS needs all four products visible before it can configure dispatch logic. Doing them in the wrong order produces commissioning faults that are hard to diagnose because each individual product 'works' but the integrated behaviour fails. The MCS-certified designer should provide a commissioning sequence; the apprentice follows it.",
      "The IET CoP is the practical implementation guide that walks through how to apply Section 722 on a real install — supply assessment, earthing arrangement choice, protective device selection, cable sizing, isolation, labelling, commissioning. Currently in its 5th edition with regular updates to track BS 7671 amendments and OZEV regulation changes. Not legally mandatory in itself but referenced by reasonable-installer expectations and by MCS / OZEV scheme requirements. The apprentice should recognise it as a practical companion to Section 722 — Section 722 is the legal floor; the IET CoP is the practical playbook.",
      "Because scope 3 captures the embodied carbon of purchased materials, and an electrical contractor procures very large quantities of high-embodied-carbon material — copper cable in particular. The conductor in a single 100-metre drum of 16 mm two-core SWA cable can carry 20-30 kg of CO2 equivalent in embodied carbon. A contractor buying tens of thousands of metres of cable per year can easily have scope 3 purchased-goods emissions an order of magnitude larger than the combined diesel and electricity figures of scope 1 and scope 2. The use-phase emissions of installed systems (operational electricity drawn by lighting, power and HVAC over decades) can be larger still on commercial fit-outs.",
      "Three categories. (1) AC-side faults — supply voltage out of spec, grid frequency out of spec, lost neutral, RCD trip on the AC isolator. THESE ARE YOUR JOB — measure the AC supply at the inverter terminals, check the AC isolator and the dedicated RCBO, confirm the inverter is seeing a healthy AC supply within its spec. (2) DC-side faults — string voltage out of spec, isolation fault on a string, broken module. Diagnose with the MFT in PV mode (Megger MFT1741+ has PV functions, Kewtech KT64+ similar) — IR test on the DC string at the inverter's DC isolator, open-circuit voltage check on the string. (3) Inverter-internal faults (firmware, MPPT failure, internal IGBT fault) — the manufacturer's warranty / service engineer's job. The L3 apprentice rules out (1) and (2), then escalates (3) with documented test evidence.",
    ],
    correctAnswer: 2,
    explanation:
      "Scope 3 dominance is the norm not the exception for an electrical contractor. The implication for management is that cutting scope 3 (through EPD-backed procurement, recycled content, lifetime-extension and material reduction) usually delivers the largest absolute emissions reductions even though scope 1 and 2 are easier to measure and control. Most CRPs now address all three scopes precisely because scope 3 is where the material number sits.",
  },
  {
    id: 3,
    question:
      "What is a Carbon Reduction Plan and what does it have to contain to comply with PPN 06/21?",
    options: [
      "Loss of the ability to self-certify domestic notifiable work under Part P of the Building Regulations. Every notifiable job must then be notified to Local Authority Building Control (LABC) and inspected separately, which is slower and more expensive. Loss of the scheme membership badge that customers actively look for when choosing a contractor. Likely loss of insurance cover that depends on scheme membership. Significant reputational damage in trade directories and customer-facing search results. Many domestic contractors don't survive a scheme withdrawal.",
      "Section 826 of BS 7671 covers Electrical Energy Storage Systems (EESS) and was added at the 18th Edition. It applies in addition to the rest of BS 7671 and to any product-specific standards (such as the IEC 62619 cell standard). The IET Code of Practice for Electrical Energy Storage Systems supplements Section 826 with practical guidance on siting, ventilation, fire separation, signage and emergency isolation. A4:2026 has refined parts of this framework as the technology has matured.",
      "Five-yearly EICR (Electrical Installation Condition Report) covering the entire fixed electrical installation, including any PV, EV chargers, heat pump supplies, battery storage circuits and MVHR supplies that have been added. Landlord must provide the EICR to tenants and to the local authority on request. Any C1 (immediate danger) or C2 (potentially dangerous) findings must be remediated within 28 days. Environmental tech additions trigger an updated EICR; they don't escape the regime. The Regulations apply to private rented properties in England; equivalents in the devolved nations.",
      "A published document that confirms the supplier commitment to achieving net-zero by 2050, sets out the current annual emissions broken down by scope (with scope 3 covering at least the categories identified in the PPN 06/21 guidance), describes the environmental management measures in place, and is signed off by a director of the supplier organisation. The CRP must be published on the supplier website, updated at least annually, and provided as part of any in-scope tender submission. The format follows a standard template provided in the PPN 06/21 guidance.",
    ],
    correctAnswer: 3,
    explanation:
      "The CRP requirement applies to bidders for UK central government contracts above 5 million pounds annual contract value. The threshold is below the level at which most electrical contractors bid directly — but prime contractors increasingly flow the requirement down to their supply chain. The standard template makes compliance straightforward once the underlying emissions data is available. The harder problem is collecting accurate scope 3 data; most contractors start with scope 1 and 2 and build out scope 3 progressively.",
  },
  {
    id: 4,
    question:
      "What is the Streamlined Energy and Carbon Reporting (SECR) regime in the UK and which businesses fall in scope?",
    options: [
      "SECR is a statutory disclosure regime introduced in 2019 under the Companies (Directors Report) and Limited Liability Partnerships (Energy and Carbon Report) Regulations 2018. It requires large UK companies (typically meeting two of: turnover above 36 million pounds, balance sheet above 18 million pounds, or above 250 employees) to disclose their UK energy use and associated greenhouse gas emissions in their annual report. The disclosure covers scope 1, scope 2 and a defined subset of scope 3 (business travel in employee-owned vehicles), along with intensity metrics and a narrative on energy efficiency actions taken.",
      "'Building Management System' — the central control system that orchestrates a building's heating, ventilation, lighting, security and energy use. BMS work is one of the fastest-growing specialisms in building services because every modern commercial building has one. Electricians who learn BMS programming and commissioning (often via Trend, Tridium, Siemens or Schneider training) are in high demand and can move into BMS specialist roles paying significantly above standard electrician rates.",
      "An integrated install has multiple inverters, multiple isolation points, multiple comms cables, multiple control devices and multiple service requirements. Without clear labelling and documentation, the next electrician arriving on site (perhaps to fix a fault years later, perhaps in an emergency) cannot quickly identify which isolator does what, which circuit feeds which device, which comms cable goes where. Section 514 of BS 7671 specifies the labelling minimum; the IET Codes of Practice for PV, battery and EV add specific requirements for each technology; the MCS Code of Practice requires customer-facing handover documentation. The apprentice should expect to label more, document more and brief the customer more thoroughly than on a single-product install.",
      "Annual calibration to a UKAS-traceable standard, with a calibration certificate kept in the firm's instrument register. Test instruments drift over time — a multimeter that reads 235 V on a 230 V supply, or an insulation tester that reads 200 MΩ on a 100 MΩ test, will produce wrong test results that fail BS 7671 612.x. Most certification schemes (NICEIC, NAPIT) require evidence of in-date calibration as part of audit. Sub 1.5 covers test instruments in detail.",
    ],
    correctAnswer: 0,
    explanation:
      "SECR catches large electrical contractors directly and many medium-sized ones as part of their parent group reporting. The disclosure is in the audited annual report, so the data has to be defensible. Smaller electrical contractors below the SECR threshold may still disclose voluntarily because customers and primes increasingly expect it. SECR is the statutory floor; voluntary disclosure under PPN 06/21, the Carbon Disclosure Project (CDP) and other frameworks builds out from there.",
  },
  {
    id: 5,
    question:
      "Which scope 3 category is normally the largest for an electrical contractor and what is the practical lever to reduce it?",
    options: [
      "Section 753 'Heating cables and embedded heating systems' covers electric heating cables embedded in floors, walls or ceilings, plus surface heating systems and de-icing / frost-prevention applications. The A4:2026 amendment completely revised Section 753 — extending its scope, retitling it, and adding new requirements relocated from Chapter 53 covering impact protection and installation of heating cables. Industrial heating systems complying with BS EN 60519, BS EN 62395 and BS EN 60079 are excluded from Section 753.",
      "Purchased goods and services — dominated by copper cable, aluminium cable, switchgear and luminaires. The practical lever is procurement policy: specify EPD-backed products, set minimum recycled-content thresholds, prefer manufacturer-specific over industry-average EPDs, prefer products with longer expected service life, and reduce material use through more efficient design (smaller cable on shorter runs, lighting with higher lm/W avoiding over-specification). The fix sits at the order stage, before the material is on the van.",
      "A generic RAMS is template wording that could apply to any job — 'electrical hazards', 'working at height', 'use of PPE'. A site-specific RAMS names the actual site, the actual tasks, the hazards identified on the walk-round, the specific access kit, the specific controls and the specific steps. The HSE 'suitable and sufficient' test under MHSWR Reg 3 effectively requires site-specific content.",
      "STOP the original fault investigation. The disconnected CPC is a Code 1 (Danger Present — immediate action required) defect under the EICR coding system — the metal lampholders, ceiling roses and ceiling-mounted accessories on this circuit have NO earth fault path, so a fault to exposed metalwork won't operate the protective device and the metalwork will sit at phase voltage. Make the situation safe — either re-terminate the CPC properly OR isolate the circuit and label 'OUT OF SERVICE — CPC FAULT — do not re-energise'. Inform the customer in writing. Then resume original fault investigation if the customer agrees to the additional work.",
    ],
    correctAnswer: 1,
    explanation:
      "Purchased goods is normally the dominant scope 3 category for any business that consumes physical materials in volume. For an electrical contractor cable and switchgear together can represent 60-80% of total scope 3 in a typical year. The procurement decision is therefore the highest-leverage carbon decision the business makes. EPD requirements, recycled-content thresholds and design optimisation all hit purchased goods directly. As an apprentice you may not run procurement but recognising the material flows on your jobs feeds back into the firm carbon picture.",
  },
  {
    id: 6,
    question:
      "What does the Carbon Literacy Project certification involve and what does a Certified Carbon Literate worker commit to?",
    options: [
      "BS 7671 Part 6 643 verification — apply on every rectified circuit, every time. (1) CONTINUITY of CPC and ring conductors. (2) INSULATION RESISTANCE at 500 V (or 250 V if electronic loads can't be isolated). (3) POLARITY check (built-in to the other tests on most MFTs). (4) R1+R2 (if affecting a ring or radial). (5) Zs at the furthest accessible point on the affected circuit. (6) RCD TRIP-TIME at I&Delta;n where RCD-protected (300 ms typical, 40 ms at 5&times;I&Delta;n). (7) FUNCTIONAL test (load the circuit with a known appliance and verify it operates). (8) RECORD on the Minor Works Certificate test panel. The full Part 6 routine takes 20&ndash;30 minutes on a single circuit; non-negotiable.",
      "No. EAWR Reg 14(c) requires 'suitable precautions including where necessary the provision of suitable protective equipment'. The risk being 'low' doesn't dispense with the precaution — it informs which precaution. For 230 V live work, Class 0 insulated gloves (rated 1000 V AC) plus insulated tools are the standard precaution. The senior is exposing both themselves and the firm to liability under EAWR (failure to take suitable precautions) and HSWA Section 7 (employee duty to take reasonable care of own and others' safety). The apprentice's defence: 'I followed the firm's PPE matrix' — so make sure there IS one and it specifies gloves for live work.",
      "Around eight hours of accredited training (typically delivered as a one-day workshop or split over two half-days) covering climate science, the carbon impact of the trainee role and sector, individual and workplace action, and the social and economic context of the climate transition. To become Certified Carbon Literate the trainee must demonstrate understanding through assessment and commit in writing to one personal action and one workplace action. The Carbon Literacy Project (a Manchester-based registered charity) accredits training providers and issues the certifications. Major UK construction and engineering firms run rolling Carbon Literacy programmes for their workforces.",
      "Compliance-only — the firm does the work, issues the certificate, files the documentation, meets the regulations, repeats. Learning organisation — the firm does all of that PLUS captures lessons from each job (what worked, what didn't, what to change), feeds them back into training and procedure, and improves over time. The difference shows up in fault recurrence rates (learning firms have fewer comebacks), in apprentice progression speed (learning firms develop competence faster), in customer satisfaction (learning firms build patterns that customers come to trust). The L3 apprentice's job is to support the learning side — bring observations from visits back to the office, contribute to toolbox talks, suggest procedure improvements. Most firms aspire to be learning organisations; the apprentice's input is part of how they become one.",
    ],
    correctAnswer: 2,
    explanation:
      "Carbon Literacy is a workforce-scale climate competence baseline rather than a specialist qualification. The training is intentionally broad and action-focused. For an electrical contractor employer it builds the foundation for site-level engagement with the CRP, supports BREEAM and net-zero credits that reward organisational competence, and gives staff the language to talk credibly to customers about energy efficiency, heat pumps, EV charging and PV. As an apprentice you may be enrolled in a Carbon Literacy session early in your career.",
  },
  {
    id: 7,
    question:
      "What is the relationship between scope 2 emissions and the falling carbon intensity of the UK grid?",
    options: [
      "MCS certificate; Electrical Installation Certificate (BS 7671); G98 or G99 DNO notification copy; manufacturer commissioning record(s); MCS performance estimate (SCOP, kWh / kWp / yr, payback, etc.); warranty documentation for all major components; user instruction manuals; maintenance schedule and service intervals; F-Gas record (where refrigerant work was carried out); contact details for fault reporting; and the MCS Code complaints process. Pack is provided in physical or durable digital form on handover day.",
      "Head is the vertical distance the water falls through the turbine — measured in metres. Head times flow rate (cubic metres per second) times gravity gives the available power. Different turbine technologies suit different head ranges: Pelton wheel (impulse turbine) for high head 50-300 m typical UK upland; Turgo (impulse) for medium-high head 30-200 m; Crossflow (impulse / reaction hybrid) for medium head 5-50 m; Kaplan or propeller (reaction) for low head under 10 m typical lowland river. Archimedes screw for very low head 1-5 m and high flow — popular on canal and river weir sites because it is fish-friendly. The MCS-certified hydro designer picks the turbine based on the head and flow at the specific site. The L3 electrician handles the grid connection regardless of the turbine choice.",
      "Each product's commissioning depends on the others being in a known state. The battery commissioning needs the inverter live; the inverter needs the PV strings energised; the EV charger's load management needs the CT clamp reading correctly; the heat pump's smart controller needs network access to the HEMS; the HEMS needs all four products visible before it can configure dispatch logic. Doing them in the wrong order produces commissioning faults that are hard to diagnose because each individual product 'works' but the integrated behaviour fails. The MCS-certified designer should provide a commissioning sequence; the apprentice follows it.",
      "Scope 2 emissions for any UK business that draws grid electricity have fallen sharply over the last decade because the carbon intensity of the grid has fallen — from around 500 gCO2/kWh in 2012 to around 200 gCO2/kWh in recent years (varies year-to-year with weather, gas prices and renewables output). A business that has not changed its electricity consumption at all has nonetheless seen its scope 2 emissions roughly halve over that period, simply because the grid has decarbonised. Switching to a renewable electricity tariff (with verifiable certificates of origin) can drive scope 2 lower still under the market-based reporting method.",
    ],
    correctAnswer: 3,
    explanation:
      "The grid decarbonisation tailwind has done most of the scope 2 reduction work for UK businesses over the last decade — without any active intervention by the business itself. The remaining scope 2 reduction lever is procurement of renewable electricity with verifiable certificates of origin, or self-generation through PV. As the grid continues to decarbonise the marginal benefit of switching tariff narrows, but for now it remains a meaningful additional lever.",
  },
  {
    id: 8,
    question:
      "An apprentice notices the firm has no formal carbon reporting and the contracts manager dismisses the question. What is the appropriate professional response?",
    options: [
      "Raise the question constructively in writing through line management, citing the rising customer expectations (PPN 06/21 flow-down from prime contractors, BREEAM and net-zero specifications on commercial work, customer sustainability questionnaires) as the commercial driver. Suggest a starter step such as collecting fuel card data and electricity bills for a pilot scope 1 and scope 2 inventory, or enrolling staff in Carbon Literacy training. Frame the conversation as commercial competitiveness rather than personal advocacy. Document the suggestion. Many medium-sized electrical contractors have moved from no carbon reporting to a published CRP within twelve months when the commercial case was made clearly.",
      "Technically pass, practically marginal. The instrument has measurement uncertainty (typically ±5% or ±0.05 Ω on a Megger MFT1741+ EFLI test); a reading 'on the limit' is within the uncertainty band of failure. The L3 response: (1) Repeat the test — does the reading stabilise above the limit or drift below? (2) Verify with a second instrument if available. (3) Calculate the expected value; if measured >> expected, investigate the additional impedance. (4) Document the marginal pass on the job sheet; recommend follow-up investigation. (5) Discuss with supervisor whether to consider as fail (apply C2/C3 EICR coding) given the marginal nature. Marginal passes are diagnostic signals.",
      "Five conditions. (1) Cumulative repair cost approaching system replacement cost (cumulative repairs at 70%+ of new system). (2) System at end-of-life (CU 25+ years old, multiple aging components). (3) Code 1 / Code 2 EICR findings affecting multiple aspects of the system. (4) Building work or change-of-use happening; opportunity to upgrade. (5) New regulatory requirements (A4:2026 or future) that the existing system can't meet without major rework. The decision is normally the senior / customer's; the L3 apprentice identifies the indicators and escalates.",
      "Three readings in combination. (1) R1+R2 higher than calculated expected (a 50 m run of 2.5 mm² ring should give R1+R2 of 0.5 Ω; if it reads 1.4 Ω something is adding resistance). (2) EFLI Zs higher than expected for the same reason. (3) Voltage drop on full load greater than calculated — an in-service measurement with a clamp meter showing &gt;5% volt drop confirms IR² heating at a high-resistance joint. The thermal camera (Sub 2.3) then locates the joint by its heat signature. Diagnostic combination: high R1+R2 + high Zs + thermal hotspot = HRJ at the hotspot location.",
    ],
    correctAnswer: 0,
    explanation:
      "Carbon competence is increasingly a commercial requirement rather than a values position. As an apprentice raising it, the framing matters — the productive route is to identify a customer or tender that needed CRP evidence and to use that as the prompt for an internal process. The hostile route (calling out the firm publicly, refusing work) damages your career without changing the firm. The professional route documents the gap, suggests a proportionate first step, and lets management decide. Many firms move quickly once the commercial case is clear.",
  },
];

const faqs = [
  {
    question: "Where can I find the official UK government CRP template and PPN 06/21 guidance?",
    answer:
      "The Cabinet Office and the Crown Commercial Service publish PPN 06/21 and the standard CRP template on the gov.uk website (search for Procurement Policy Note 06/21 Carbon Reduction Plan). The standard template defines exactly what fields must be completed, the required scope coverage and the publication and update obligations. Any contractor preparing a first CRP should start from the official template rather than building one from scratch — the template is what the procurement teams expect to see.",
  },
  {
    question: "What carbon emission factors should I use for fuel and electricity calculations?",
    answer:
      "The UK Government Conversion Factors for Greenhouse Gas Reporting are published annually by the Department for Energy Security and Net Zero (DESNZ, formerly BEIS) and are the standard reference for UK scope 1 and 2 emission calculations. The conversion factor spreadsheet covers fuels (diesel, petrol, natural gas, LPG, biofuels), grid electricity (with separate factors for generation, transmission and distribution losses, and well-to-tank upstream emissions), refrigerants (with GWP values), waste, water and transport. The factors are updated each year to reflect grid decarbonisation and methodological updates. Always use the most recent factor set published for the reporting year.",
  },
  {
    question: "Is there a scope 4 in the GHG Protocol?",
    answer:
      "The GHG Protocol Corporate Standard formally recognises scopes 1, 2 and 3. The term scope 4 has been used informally by some practitioners to describe avoided emissions — emissions that would have happened but were prevented by the company products or services (e.g. CO2 saved when a heat pump replaces a gas boiler). Avoided emissions can be a useful additional metric for environmental technology companies including electrical contractors specialising in PV, heat pumps and EV charging — but they should be reported separately from the formal scope 1, 2 and 3 inventory and using a recognised methodology to avoid double counting and overclaiming. The GHG Protocol has published guidance on accounting for avoided emissions specifically to address misuse.",
  },
  {
    question: "If my employer does not yet measure carbon, how do I start as an individual?",
    answer:
      "Start with what you can measure cheaply. Personal vehicle mileage from fuel receipts, personal electricity consumption from the smart meter, business travel by means other than the company van (train tickets, hotel stays). The Carbon Literacy training course is a good starting point because it provides the framework for both personal and workplace action and accredits the commitment formally. Many UK trade unions and industry bodies (NICEIC, NAPIT, ECA, Joint Industry Board) now run Carbon Literacy or equivalent training for members. Building your individual carbon awareness puts you in a stronger position to influence the firm direction over time.",
  },
  {
    question: "How does the UK Net-Zero Carbon Buildings Standard relate to BREEAM?",
    answer:
      "The UK Net-Zero Carbon Buildings Standard (published in pilot form in 2024 and expected to formalise progressively) is a complementary standard to BREEAM that focuses specifically on whole-life carbon performance — operational and embodied — measured against an agreed industry net-zero trajectory. BREEAM is broader (covering health, water, ecology, materials, energy and management) but does not by itself define net-zero. The two are designed to work together: a building can target a BREEAM Outstanding rating and separately demonstrate compliance with the Net-Zero Carbon Buildings Standard. Both rely on EPD data for the embodied carbon calculation.",
  },
  {
    question: "Will the apprentice be expected to know any of this for the AM2 or NVQ?",
    answer:
      "The AM2 and NVQ assess core electrical competence rather than corporate carbon accounting. However Unit 301 includes the regulatory and policy framework around environmental technology, and the Carbon Literacy framing is increasingly cited in apprentice training material. As you progress through your career and into supervisory or buying roles you will encounter PPN 06/21, SECR, BREEAM and the Net-Zero Carbon Buildings Standard regularly on commercial projects. Carbon competence is now part of being a credible UK electrical contracting professional rather than a niche specialism — the floor is rising across the trade.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 5"
            title="Scope 1 / 2 / 3 emissions and carbon literacy"
            description="The Greenhouse Gas Protocol scope framework applied to a UK electrical contracting business. Carbon Reduction Plan requirements under PPN 06/21, the Streamlined Energy and Carbon Reporting (SECR) regime, and the Carbon Literacy Project framework for workforce-level climate competence. The vocabulary every apprentice now needs to be a credible part of the trade."
            tone="emerald"
          />

          <TLDR
            points={[
              "The GHG Protocol scope framework: scope 1 (direct emissions from owned sources — van diesel, workshop gas), scope 2 (purchased energy — grid electricity), scope 3 (value chain — purchased materials, business travel, waste, use-phase of installed systems).",
              "For an electrical contractor scope 3 is normally the largest by a wide margin because purchased materials (especially copper cable) dominate. The procurement decision is the highest-leverage carbon decision.",
              "Procurement Policy Note 06/21 requires bidders for UK central government contracts above 5 million pounds annually to publish a Carbon Reduction Plan covering scopes 1, 2 and a defined scope 3 subset. The requirement increasingly flows down to subcontractors.",
              "The Carbon Literacy Project provides accredited workforce-level training (around eight hours) that equips every worker with a basic understanding of climate science and practical action. Major UK construction firms run rolling Carbon Literacy programmes.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define scope 1, scope 2 and scope 3 emissions under the GHG Protocol Corporate Standard and allocate typical electrical-contractor emission sources to each scope.",
              "Identify why scope 3 is normally the largest emissions category for an electrical contractor and the role of purchased materials (especially copper cable) in driving that result.",
              "Describe Procurement Policy Note 06/21 and its requirement for a Carbon Reduction Plan covering scopes 1, 2 and a defined subset of scope 3 for bidders for UK central government contracts above the threshold.",
              "Recognise the Streamlined Energy and Carbon Reporting (SECR) statutory disclosure regime and the size thresholds that trigger inclusion.",
              "Describe the Carbon Literacy Project framework and the workplace value of accredited workforce-level climate competence training.",
              "Explain the impact of UK grid decarbonisation on scope 2 emissions and the diminishing marginal benefit of renewable electricity tariffs as the grid continues to decarbonise.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The GHG Protocol scope framework</ContentEyebrow>

          <ConceptBlock
            title="Scope 1, 2 and 3 — the global default for corporate carbon accounting"
            plainEnglish="The Greenhouse Gas Protocol Corporate Standard (a joint World Resources Institute and World Business Council for Sustainable Development publication, first issued in 2001 and revised since) is the global default methodology for corporate greenhouse gas accounting. It defines three scopes of emissions covering everything a company directly causes and everything it indirectly causes through its value chain. The scope framework underpins almost every climate disclosure regime worldwide — including the UK Streamlined Energy and Carbon Reporting (SECR) regime, the Carbon Disclosure Project (CDP), the Task Force on Climate-related Financial Disclosures (TCFD) and the Procurement Policy Note 06/21 Carbon Reduction Plan template."
            onSite="For an electrical contractor the three scopes resolve cleanly. Scope 1 is what the company burns directly — diesel in vans, gas in workshop heating, fugitive refrigerant from any company-owned AC plant. Scope 2 is what the company buys as energy — grid electricity for workshop and office, district heat where applicable. Scope 3 is everything else — purchased cable and accessories, capital plant, employee commuting, business travel, waste handling, transport in supplier vehicles, the use-phase electricity drawn by installed systems over their service life, the end-of-life processing of installed equipment when it eventually fails. As the apprentice you will not run the inventory but you should recognise the framework when it appears in the firm CRP, in tender questionnaires or in customer sustainability documentation."
          >
            <p>
              The fifteen scope 3 categories defined by the GHG Protocol, with notes on
              relevance to a typical UK electrical contractor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cat 1 Purchased goods and services</strong> — typically the
                largest scope 3 category. Cable, accessories, switchgear, luminaires,
                plant hire, professional services.
              </li>
              <li>
                <strong>Cat 2 Capital goods</strong> — vehicles, workshop equipment,
                computers, larger tools amortised over multi-year life.
              </li>
              <li>
                <strong>Cat 3 Fuel and energy related activities</strong> — upstream
                emissions for the fuel and electricity already counted in scopes 1 and 2.
              </li>
              <li>
                <strong>Cat 4 Upstream transportation and distribution</strong> —
                supplier delivery emissions, including wholesaler delivery vans.
              </li>
              <li>
                <strong>Cat 5 Waste generated in operations</strong> — waste
                transportation and treatment emissions.
              </li>
              <li>
                <strong>Cat 6 Business travel</strong> — train, plane, hotel, taxi,
                business mileage in employee personal vehicles.
              </li>
              <li>
                <strong>Cat 7 Employee commuting</strong> — emissions from staff
                commuting to workshop, office or first job of the day.
              </li>
              <li>
                <strong>Cat 8 Upstream leased assets</strong> — emissions from leased
                vehicles or buildings not already in scope 1 or 2.
              </li>
              <li>
                <strong>Cat 9 Downstream transportation and distribution</strong> —
                emissions from transporting sold products to customer; less relevant for
                contractors.
              </li>
              <li>
                <strong>Cat 10 Processing of sold products</strong> — relevant for
                manufacturers, less so for contractors.
              </li>
              <li>
                <strong>Cat 11 Use of sold products</strong> — for contractors, often
                the operational electricity drawn by the systems they install over their
                service life. Can be very large for lighting and HVAC fit-outs.
              </li>
              <li>
                <strong>Cat 12 End-of-life of sold products</strong> — emissions from
                treating installed kit at end of life.
              </li>
              <li>
                <strong>Cat 13 Downstream leased assets</strong> — emissions from
                leased-out assets (rare for contractors).
              </li>
              <li>
                <strong>Cat 14 Franchises</strong> — relevant for franchise operations.
              </li>
              <li>
                <strong>Cat 15 Investments</strong> — relevant for financial firms.
              </li>
            </ul>
            <p>
              Most electrical contractors focus on the material categories — Cat 1
              purchased goods (largest), Cat 2 capital goods, Cat 4 upstream transport,
              Cat 5 waste, Cat 6 business travel, Cat 7 employee commuting and Cat 11 use
              of sold products. The remaining categories are typically immaterial or
              not applicable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Greenhouse Gas Protocol Corporate Accounting and Reporting Standard (revised edition) — scope definitions"
            clause={
              <>
                Scope 1 emissions are direct GHG emissions from sources that are owned
                or controlled by the reporting company. Scope 2 emissions are indirect
                GHG emissions from the generation of purchased electricity, steam,
                heating and cooling consumed by the reporting company. Scope 3 emissions
                are all other indirect emissions occurring in the value chain of the
                reporting company, including both upstream and downstream emissions.
              </>
            }
            meaning={
              <>
                The scope definitions are the foundation of corporate GHG accounting
                worldwide. They appear directly in UK SECR regulations, in PPN 06/21 CRP
                templates, in CDP questionnaires and in BREEAM and Net-Zero Carbon
                Buildings Standard reporting. Knowing the definitions is the entry-level
                competence for any conversation about corporate carbon. The GHG Protocol
                Corporate Standard is freely downloadable from the GHG Protocol website
                (ghgprotocol.org) and is the authoritative methodology reference.
              </>
            }
            cite="Source: GHG Protocol Corporate Accounting and Reporting Standard (paraphrased); freely available from ghgprotocol.org."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>UK regulatory and procurement context</ContentEyebrow>

          <ConceptBlock
            title="SECR, PPN 06/21 and the rising tender expectation"
            plainEnglish="The UK has built a layered framework of carbon disclosure expectations on businesses over the last decade. The Streamlined Energy and Carbon Reporting (SECR) regime, in force since 2019, requires large UK companies to disclose energy use and associated emissions in their annual report. Procurement Policy Note 06/21, in force since 2021, requires bidders for UK central government contracts above 5 million pounds annually to publish a Carbon Reduction Plan committing to net-zero by 2050. Devolved administrations and large prime contractors flow these requirements down to their supply chains. The cumulative effect is that any medium or large electrical contractor in the UK now sits within the carbon-disclosure perimeter whether they trade with central government directly or indirectly through prime contractors."
            onSite="The practical effect on an electrical contractor is that customer questionnaires increasingly ask for carbon data, tender submissions increasingly require a CRP or equivalent, and the procurement teams of larger customers have dedicated sustainability staff who scrutinise the responses. As the apprentice you may be asked to support data collection — fuel card data, vehicle mileage logs, electricity bills, waste consignment notes. The data quality matters because the CRP and SECR disclosures are public documents that inform competitive tendering. Sloppy data feeds into a sloppy disclosure which loses tenders to competitors with cleaner numbers."
          >
            <p>
              The UK carbon disclosure regimes most relevant to electrical contractors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SECR (Streamlined Energy and Carbon Reporting)</strong> —
                statutory disclosure in the annual report for large UK companies meeting
                two of three thresholds (turnover above 36 million pounds, balance sheet
                above 18 million pounds, employees above 250). Covers scopes 1 and 2 plus
                a defined subset of scope 3 (business travel in employee vehicles).
              </li>
              <li>
                <strong>PPN 06/21 (Carbon Reduction Plan)</strong> — procurement
                requirement for bidders for UK central government contracts above 5
                million pounds annually. Requires a published CRP committing to
                net-zero by 2050 and disclosing scopes 1, 2 and a defined scope 3
                subset.
              </li>
              <li>
                <strong>PPN 03/21 and similar updates</strong> — broader sustainability
                considerations in central government procurement, including evaluation
                weight given to environmental performance.
              </li>
              <li>
                <strong>Devolved administration equivalents</strong> — Scotland, Wales
                and Northern Ireland operate their own procurement carbon expectations,
                broadly aligned with PPN 06/21 but with regional variation.
              </li>
              <li>
                <strong>Carbon Disclosure Project (CDP)</strong> — voluntary global
                disclosure framework used by many large UK companies and increasingly
                requested by their supply chain. CDP supplier questionnaires routinely
                land with electrical contractors selling to large customers.
              </li>
              <li>
                <strong>BREEAM Man 02 (Construction practices)</strong> — awards credits
                for contractor environmental management systems and carbon reporting
                competence, providing a project-level reward for the firm broader CRP
                investment.
              </li>
              <li>
                <strong>UK Net-Zero Carbon Buildings Standard</strong> — published in
                pilot form in 2024, sets project-level whole-life carbon performance
                requirements that align with the firm-level disclosure framework.
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

          <ContentEyebrow>Carbon literacy — the workforce baseline</ContentEyebrow>

          <ConceptBlock
            title="Why every electrician now benefits from a working understanding of carbon"
            plainEnglish="Carbon literacy at the workforce level is the foundation that makes the firm-level disclosure regimes actually deliver emissions reductions. A CRP signed by a director but not understood by the workforce is a paper exercise. A workforce that understands climate science at a working level can spot waste reduction opportunities on site, engage credibly with customer questions about heat pumps and PV, support data collection for the CRP, and contribute to the firm sustainability culture rather than treating it as someone else problem. The Carbon Literacy Project provides a UK-accredited training framework specifically designed for workplace delivery — typically a one-day workshop covering climate science, the carbon impact of the trainee role, individual and workplace action and the social and economic context of the transition."
            onSite="Major UK construction and engineering firms (Balfour Beatty, Mace, ISG, Skanska, Kier and many others) now run rolling Carbon Literacy programmes for their workforces, including subcontractors and apprentices. Larger electrical contractors are following suit. The training is short, accredited, action-focused and explicitly designed to be relevant to trades workers as well as office-based staff. As an apprentice you may be enrolled in a Carbon Literacy session early in your career; if you are not, you can self-enrol through the Carbon Literacy Project website (carbonliteracy.com) or through trade-body programmes (NICEIC, NAPIT, ECA, Joint Industry Board increasingly offer or partner on Carbon Literacy training)."
          >
            <p>
              What a typical Carbon Literacy course covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Climate science basics</strong> — greenhouse effect, the 1.5
                degC and 2 degC warming pathways, carbon budget, tipping points. Pitched
                at trade-worker level with no prior science assumed.
              </li>
                <li>
                <strong>Carbon impact of the trainee role and sector</strong> — for
                electrical contractors, the role of installed systems in operational
                emissions and the role of construction in embodied emissions.
              </li>
              <li>
                <strong>Individual action</strong> — practical steps the trainee can
                take in personal life (transport, home energy, diet, consumption).
              </li>
              <li>
                <strong>Workplace action</strong> — practical steps the trainee can take
                at work (waste reduction, energy efficiency, customer conversations,
                data collection, supplier choices).
              </li>
              <li>
                <strong>Social and economic context</strong> — climate justice, just
                transition, the political economy of decarbonisation. Builds a more
                resilient understanding than pure technical training.
              </li>
              <li>
                <strong>Action commitment</strong> — every trainee commits in writing to
                one personal action and one workplace action as a condition of
                certification. The commitment is followed up later to verify
                implementation.
              </li>
            </ul>
            <p>
              The certification is short-form (typically a digital badge plus a
              certificate) but the underlying training is genuinely substantive. Workers
              completing Carbon Literacy report sustained behaviour change in surveys,
              and accredited employers (Carbon Literate Organisations) report measurable
              reductions in scope 1 and 2 emissions over the years following a
              workforce-wide rollout.
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

          <ContentEyebrow>Building a first carbon inventory</ContentEyebrow>

          <ConceptBlock
            title="Where to start when the firm has no carbon data — the practical inventory"
            plainEnglish="Building a first scope 1 and scope 2 inventory for a small or medium electrical contractor is a straightforward exercise that takes a few days and uses data the business already holds. Scope 1 comes from fuel card statements (diesel and petrol consumed by company vehicles in the reporting year) and gas bills (where the firm has gas heating in workshops or offices). Scope 2 comes from electricity bills (kWh consumed at workshops and offices in the year). Multiplying each by the appropriate UK Government Conversion Factor for Greenhouse Gas Reporting (published annually by DESNZ) gives the kg CO2 equivalent for each source. Sum them up and the firm has a defensible first scope 1 and 2 inventory."
            onSite="Once the scope 1 and 2 inventory exists the firm can publish its first Carbon Reduction Plan, respond to customer questionnaires with real numbers, and start tracking year-on-year progress. Scope 3 is harder and usually built progressively starting with the most material category — for an electrical contractor that is purchased goods (cable, accessories, plant). Spend-based estimation (annual procurement spend by category multiplied by published emission factors per pound spent) gives a defensible first pass; supplier-specific data and EPDs refine it over time. The inventory is a working tool that improves each year as the underlying data quality improves."
          >
            <p>
              The data sources for a first scope 1 and scope 2 inventory:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fuel card statements</strong> — annual litres of diesel and
                petrol consumed by company vehicles. The fuel card provider supplies
                consumption data as a CSV download.
              </li>
              <li>
                <strong>Gas bills</strong> — annual kWh of gas consumed at workshops
                or offices, derived from utility bills.
              </li>
              <li>
                <strong>Electricity bills</strong> — annual kWh of electricity consumed
                at workshops and offices, similarly from utility bills.
              </li>
              <li>
                <strong>Refrigerant logs</strong> — for any company-owned AC or
                refrigeration plant, F-Gas top-up records identify fugitive refrigerant
                losses (multiply kg by GWP for CO2 equivalent).
              </li>
              <li>
                <strong>UK Government Conversion Factors</strong> — DESNZ publishes
                annual emission factors for fuels (diesel, petrol, gas), grid
                electricity (with separate factors for generation, transmission losses
                and upstream emissions) and refrigerants. Use the factors for the
                reporting year.
              </li>
              <li>
                <strong>Reporting boundary</strong> — define which legal entity, which
                sites and which time period the inventory covers. Annual UK financial
                year is the standard.
              </li>
            </ul>
            <p>
              The same inventory feeds the SECR statutory disclosure (where the firm
              is large enough to be in scope), the PPN 06/21 Carbon Reduction Plan,
              customer sustainability questionnaires and the firm internal management
              review. One inventory, multiple uses.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reduction levers — what actually moves the numbers</ContentEyebrow>

          <ConceptBlock
            title="The five biggest carbon reduction levers for an electrical contractor"
            plainEnglish="Once the inventory exists the next question is what to do about it. Five reduction levers typically deliver the largest absolute emissions reductions for a UK electrical contractor over a five-year horizon. Vehicle electrification cuts scope 1 by transitioning the diesel van fleet to electric. Workshop renewable electricity (rooftop PV with on-site consumption, or a renewable tariff with verifiable certificates of origin) cuts scope 2. EPD-backed and recycled-content procurement cuts the largest scope 3 category. Designed-out waste at order stage cuts both scope 3 purchased goods and scope 3 waste. Carbon Literacy training across the workforce embeds all four into daily decisions and unlocks the cumulative effect."
            onSite="As the apprentice you will see these levers in action over your career. Vehicle fleets are gradually transitioning to electric (with the chargepoint installation work itself a growth area for the trade). Workshop PV with on-site self-consumption is a visible signal to staff and customers. EPD-backed procurement is now the default on BREEAM and net-zero projects. Designed-out waste shows up as smarter ordering, modular accessories and reusable temporary fixings. Carbon Literacy training appears as a half-day workshop in your first or second year. Recognising these levers when you see them — and understanding why the firm is investing in them — makes you a more credible part of the trade conversation."
          >
            <p>
              The five biggest carbon reduction levers for a UK electrical contractor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Vehicle electrification</strong> — transition the van fleet
                from diesel to electric. The largest single scope 1 reduction available.
                Cuts costs over time as electricity per mile is cheaper than diesel per
                mile.
              </li>
              <li>
                <strong>2. Workshop renewable electricity</strong> — rooftop PV with
                on-site consumption (and optional battery storage for time-shifting),
                or a renewable tariff with verifiable certificates of origin. Cuts
                scope 2 toward zero.
              </li>
              <li>
                <strong>3. EPD-backed and recycled-content procurement</strong> —
                specify and source EPD-backed cable and accessories, prioritise
                recycled-content products, prefer manufacturers with documented
                sustainability commitments. Cuts the largest scope 3 category.
              </li>
              <li>
                <strong>4. Designed-out waste</strong> — accurate ordering, modular
                accessories, reusable temporary fixings, lifetime-extension of existing
                kit through repair rather than replacement. Cuts scope 3 purchased
                goods and scope 3 waste together.
              </li>
              <li>
                <strong>5. Carbon Literacy across the workforce</strong> — embeds the
                other four levers in daily decisions and unlocks the multiplier
                effect. Without workforce competence the technical changes underperform
                their potential.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The customer-facing carbon conversation</ContentEyebrow>

          <ConceptBlock
            title="Talking to customers about carbon — the credible apprentice voice"
            plainEnglish="Customers increasingly ask the trade about the carbon impact of the work being done — the heat pump install, the EV charger, the LED retrofit, the PV array. The questions range from rough comparisons (will this save me carbon?) to more specific (what is the embodied carbon of the cable you are using?). As the apprentice you will field some of these questions because you are the trade person on site and the customer trusts the answer that comes from you. Being able to give an honest, evidence-based response — including admitting where you do not know and offering to find out — builds credibility for both you personally and the firm."
            onSite="The credible voice rests on three things. First, knowing the basic numbers and the units (UK grid carbon intensity around 200 gCO2/kWh and falling, gas heating around 210 gCO2 per kWh of heat, ASHP at SCOP 3 around 67 gCO2 per kWh of heat). Second, knowing where to find the verified data (EPDs for embodied carbon of materials, DESNZ conversion factors for operational fuels, manufacturer SCOP figures for heat pumps, MCS yield calculations for PV). Third, knowing your own competence boundary — being clear about what you can answer and what you need to refer up to the project manager, the heat pump designer, the BREEAM assessor or the firm sustainability lead."
          >
            <p>
              Common customer carbon questions and how to handle them honestly:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Will this heat pump save me carbon?</strong> — Yes, on the
                current UK grid mix. A SCOP 3 ASHP delivers heat at around 67 gCO2 per
                kWh on a 200 gCO2/kWh grid, versus around 210 gCO2 per kWh from a 90%
                efficient gas boiler. Roughly three times cleaner today, and getting
                cleaner each year as the grid decarbonises.
              </li>
              <li>
                <strong>What about the embodied carbon of the heat pump itself?</strong>{' '}
                — The MCS heat pump installation guide and the manufacturer EPDs (where
                published) carry the embodied carbon figures. Carbon payback is typically
                2-4 years on UK grid mix; after that the unit is in net carbon credit
                for its 15-20 year service life.
              </li>
              <li>
                <strong>Are LED retrofits actually worth it?</strong> — Almost always
                yes. LED replaces halogen and fluorescent at typically 10-20% of the
                running energy. The embodied carbon of the LED itself is paid back in
                weeks to months by the operational saving. The Energy Saving Trust
                publishes independent payback figures.
              </li>
              <li>
                <strong>Should I get solar PV?</strong> — Depends on roof orientation,
                shading, hot water demand and EV ownership. UK PV typically pays back
                its own embodied carbon in 1-3 years and runs in net carbon credit for
                25+ years. The MCS yield calculation for the specific roof gives the
                honest expected output.
              </li>
              <li>
                <strong>Is the cable you are using sustainable?</strong> — Specific to
                the product. EPD-backed cable from a manufacturer with high
                recycled-content discloses the embodied carbon directly. Marketing
                claims without an EPD are not evidence; redirect the customer to the
                EPD if available, or refer to the project manager if not.
              </li>
              <li>
                <strong>What about end-of-life of all this kit?</strong> — Heat pumps,
                PV inverters, batteries and EV chargers all have manufacturer take-back
                or specialist recycling routes. WEEE Regulations apply. End-of-life
                processing is part of the whole-life carbon picture but typically a
                small fraction of operational and embodied carbon for these systems.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Net-zero by 2050 — the underlying legal anchor</ContentEyebrow>

          <ConceptBlock
            title="The Climate Change Act 2008 and the UK net-zero trajectory"
            plainEnglish="The Climate Change Act 2008 was amended in 2019 to commit the UK to net-zero greenhouse gas emissions by 2050. That single legal duty is the underlying anchor for every downstream carbon regulation an electrical contractor will encounter — Building Regulations Part L, the Future Homes Standard, the MCS scheme, ENA G98/G99 grid connection, PPN 06/21, SECR, the Net-Zero Carbon Buildings Standard. The Climate Change Committee (an independent statutory body) advises the government on the carbon budgets that map the trajectory from current emissions to net-zero, and reports annually on progress. The trajectory is steeply downward through the 2030s and 2040s with sharp implications for every UK business that consumes energy or produces emissions."
            onSite="As the apprentice you do not engage with the Climate Change Act directly in daily work. But recognising it as the underlying legal anchor explains why the regulatory framework keeps tightening. Every new Building Regs Part L iteration, every new MCS standard revision, every new procurement carbon expectation flows downstream from the 2050 net-zero duty. The trajectory through the carbon budgets is steeply downward — meaning the regulatory expectations will continue to rise across the trade for the rest of your career. Building carbon competence early positions you to thrive in that environment rather than being caught flat-footed by it."
          >
            <p>
              The UK carbon budget structure that maps the trajectory:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Carbon Budget 1 (2008-2012)</strong> — the first statutory
                five-year budget. Met.
              </li>
              <li>
                <strong>Carbon Budget 2 (2013-2017)</strong> — second budget. Met.
              </li>
              <li>
                <strong>Carbon Budget 3 (2018-2022)</strong> — third budget. Met.
              </li>
              <li>
                <strong>Carbon Budget 4 (2023-2027)</strong> — current period.
                Significantly more ambitious than the previous three. Tracking against
                the budget is reported annually by the Climate Change Committee.
              </li>
              <li>
                <strong>Carbon Budget 5 (2028-2032)</strong> — sets the cap on emissions
                during the late 2020s and early 2030s. Implies steep cuts in transport,
                heating and industry.
              </li>
              <li>
                <strong>Carbon Budget 6 (2033-2037)</strong> — first budget set after
                the net-zero amendment. Implies elimination of unabated fossil fuel use
                in most sectors by the end of the period.
              </li>
              <li>
                <strong>Carbon Budget 7 (2038-2042) and Budget 8 (2043-2047)</strong> —
                bring the UK to within touching distance of net-zero, with residual
                emissions in hard-to-abate sectors offset by removals.
              </li>
              <li>
                <strong>Net-zero target year (2050)</strong> — the statutory duty under
                the Climate Change Act 2008 (as amended 2019).
              </li>
            </ul>
            <p>
              Each budget is a legally binding cap on UK emissions over the period.
              Failure to meet a budget triggers parliamentary reporting and policy
              action by the government. The Climate Change Committee is the
              independent statutory body that recommends each budget and reports on
              progress.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The apprentice career arc and carbon competence</ContentEyebrow>

          <ConceptBlock
            title="Why building carbon competence early positions you for a 40-year career"
            plainEnglish="An apprentice starting in 2026 will work through the steepest portion of the UK net-zero trajectory and through the consequent transformation of the electrical trade. The work mix will shift dramatically — from diesel boilers being replaced by heat pumps, from petrol cars being replaced by EVs, from rooftop PV becoming standard new build, from battery storage moving from speciality to commodity, from electrical infrastructure scaling massively to support all of the above. The trade-off carbon competence early positions you to lead in the transformed trade rather than to play catch-up. The technical fundamentals (BS 7671, AM2, NVQ) remain the foundation; the additional carbon literacy is the differentiator that opens senior roles, business ownership opportunities and the higher-margin work."
            onSite="Practical steps an apprentice can take to build carbon competence in the first few years of trade: complete a Carbon Literacy course (often funded by the employer or through a trade body), keep a personal record of EPDs and sustainability documentation handled on each project, ask supervisors about the firm Carbon Reduction Plan and any customer carbon questionnaires, take on the data collection role where offered, build familiarity with the major UK regulatory framework (Climate Change Act, Building Regs Part L, MCS, BREEAM, Net-Zero Carbon Buildings Standard), and read the Climate Change Committee annual progress reports. None of this is a heavy lift; all of it compounds over a career. The apprentice who starts building carbon competence today is the contracts manager who can win net-zero tenders in five years and the business owner who can lead the trade transition in fifteen."
          >
            <p>
              Practical career-development steps for carbon competence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Complete Carbon Literacy training</strong> — a one-day workshop
                that delivers UK-accredited certification. Often funded by the
                employer or through a trade body (ECA, JIB, NICEIC, NAPIT).
              </li>
              <li>
                <strong>Build EPD literacy</strong> — keep a personal record of EPDs
                handled on each project, learn to read the modules and verify the
                programme operator.
              </li>
              <li>
                <strong>Engage with the firm CRP</strong> — ask supervisors what the
                CRP commits the firm to, where the data comes from and how progress is
                tracked.
              </li>
              <li>
                <strong>Learn the regulatory map</strong> — Climate Change Act,
                Building Regs Part L, MCS, BREEAM, Net-Zero Carbon Buildings Standard,
                PPN 06/21, SECR. Each is a self-contained body of knowledge.
              </li>
              <li>
                <strong>Pursue MCS qualifications</strong> — 2399 PV, 2919 ASHP/GSHP,
                2921 EV charging are the standalone competence standards for the
                environmental technology side of the trade.
              </li>
              <li>
                <strong>Read the CCC annual progress reports</strong> — the Climate
                Change Committee publishes accessible annual reports on UK progress
                toward net-zero. They give the strategic context for the trade
                direction.
              </li>
              <li>
                <strong>Track the technology shifts</strong> — heat pump refrigerants
                moving to R-290, EV charging moving to 7 kW and 22 kW domestic, battery
                storage moving from speciality to commodity, V2G beginning to scale.
                Each shift opens new work for the trade.
              </li>
              <li>
                <strong>Network within the trade</strong> — ECA, JIB, NICEIC, NAPIT
                events increasingly feature carbon and sustainability content. The
                conversations are where the trade strategic direction emerges.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating the firm CRP as a marketing document rather than a working management tool"
            whatHappens={
              <>
                A medium-sized electrical contractor publishes a CRP because a prime
                contractor has flowed the requirement down. The CRP is drafted by
                marketing, signed by a director, and posted on the website. The
                underlying emissions data was estimated rather than measured; the
                workforce never sees the document; no follow-up actions are taken; the
                annual update is forgotten. Twelve months later a customer questionnaire
                asks for evidence of progress against the published targets. The firm
                cannot evidence anything because nothing has happened. The customer
                downgrades the supplier rating; the contracts manager scrambles to
                produce something defensible at short notice; the firm reputation takes a
                quiet hit.
              </>
            }
            doInstead={
              <>
                Treat the CRP as a working management document. Collect actual
                emissions data (fuel card downloads, electricity bills, mileage logs,
                waste consignment notes) for scopes 1 and 2 from the start; build out
                scope 3 progressively with material categories first. Set realistic
                annual targets with named responsible managers. Update the CRP annually
                with verified data. Brief the workforce on the targets and the actions.
                Use the CRP as the basis for procurement decisions, vehicle choices and
                workshop energy investments. The CRP becomes a credible commercial asset
                rather than a marketing liability.
              </>
            }
          />

          <CommonMistake
            title="Ignoring scope 3 because the data is hard to collect"
            whatHappens={
              <>
                A contractor produces a CRP covering scopes 1 and 2 only because the data
                is easy to collect from fuel cards and electricity bills. Scope 3 is
                left blank with a note saying data not available. The headline emissions
                number looks reassuringly small. A prospective customer doing supplier
                due diligence reviews the CRP and recognises the omission — a contractor
                with no scope 3 disclosure is either a very small business or a business
                that has not done the work. The customer marks the supplier down on the
                sustainability evaluation. The contract goes to a competitor with a more
                complete disclosure even though the headline scope 1 and 2 number was
                higher.
              </>
            }
            doInstead={
              <>
                Build scope 3 disclosure progressively starting with the most material
                category — purchased goods and services. Use spend-based estimation as a
                first pass (annual procurement spend by category multiplied by published
                emission factors per pound spent) to produce a defensible first
                estimate; refine over time with supplier-specific data and EPDs as they
                become available. Disclose the scope and methodology transparently. A
                CRP with imperfect but transparent scope 3 estimates is far more
                credible than one with no scope 3 disclosure. Customers reward the
                disclosure effort over the headline number.
              </>
            }
          />

          <Scenario
            title="The customer sustainability questionnaire — apprentice asked for the data"
            situation={
              <>
                Your firm has been short-listed for a 200,000 pound electrical fit-out
                on a regional NHS estate. The customer procurement team has issued a
                sustainability questionnaire asking for scope 1, scope 2 and scope 3
                emissions for the last full year, the firm Carbon Reduction Plan, the
                proportion of fleet that is electric or hybrid, the proportion of
                purchased cable that is EPD-backed, and evidence of Carbon Literacy
                training for the project team. The contracts manager hands the
                questionnaire to you and says &quot;you are doing the green stuff,
                please fill this in by Friday&quot;.
              </>
            }
            whatToDo={
              <>
                Triage the questionnaire by what the firm can answer and what it
                cannot. Scope 1 (fuel consumption) can be derived from fuel card
                downloads. Scope 2 (workshop electricity) from electricity bills and
                published grid emission factors. Scope 3 is harder — start with
                purchased goods spend by category and use spend-based estimation as a
                first pass. The Carbon Reduction Plan, fleet composition and EPD
                procurement statistics need either an existing document or a
                straightforward stocktake. Carbon Literacy training certification for
                the project team is either there or it is not. Compile the answers
                honestly with caveats where data quality is limited; flag gaps to the
                contracts manager and recommend remedial action before submission. Do
                not invent data — false answers in a sustainability questionnaire are
                tender misrepresentation and can disqualify the bid and damage the firm
                reputation. A transparent partial answer beats a fabricated complete
                one. Use the exercise as a prompt to formalise the firm carbon
                management going forward.
              </>
            }
            whyItMatters={
              <>
                Sustainability questionnaires are now routine on commercial and public
                sector tenders and the data quality matters because the customer
                procurement teams scrutinise the responses. As an apprentice asked to
                support the response you can add real value by recognising the
                questions, sourcing the data accurately and flagging the gaps
                constructively. You are also building the competence that supports your
                own career as climate competence becomes a baseline expectation across
                the trade. The exercise is also where many medium-sized firms first
                realise they need a proper carbon management system — being the person
                who triggered the upgrade is a useful reputation to build early.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (design documentation framework)"
            clause={
              <>
                The information required as a basis for design is stated in Regulations 132.2 to
                132.5. The requirements to which the design shall conform are stated in
                Regulations 132.6 to 132.16. Designers shall therefore determine and record the
                information listed in 132.2–132.5 to demonstrate conformity with subsequent
                design requirements.
              </>
            }
            meaning={
              <>
                Design documentation is the regulatory home where carbon-relevant choices live —
                cable specification, equipment selection, supply characteristics. The Reg 132.1
                framework requires the designer to record the &quot;why&quot; behind each
                decision. Carbon-intensity reasoning fits naturally inside that record.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
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
                Self-generated PV is one of the most effective scope 2 carbon-reduction
                interventions a small contractor can make on its own premises. Section 712 (as
                rewritten in A4:2026) governs the electrical installation of that PV. Pre-A4
                training notes should be cross-checked against the current text.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "GHG Protocol scopes: scope 1 direct emissions from owned sources (van diesel, workshop gas), scope 2 purchased energy (grid electricity), scope 3 all other value-chain emissions (purchased materials, business travel, waste, use-phase of installed systems).",
              "For an electrical contractor scope 3 is normally the largest by a wide margin because purchased materials — especially copper cable — dominate. Procurement is the highest-leverage carbon decision.",
              "Procurement Policy Note 06/21 requires bidders for UK central government contracts above 5 million pounds annually to publish a Carbon Reduction Plan covering scopes 1, 2 and a defined scope 3 subset. The requirement increasingly flows down to subcontractors.",
              "The Streamlined Energy and Carbon Reporting (SECR) regime requires large UK companies (typically meeting two of: turnover above 36 million pounds, balance sheet above 18 million pounds, employees above 250) to disclose energy and emissions in the annual report.",
              "Use the UK Government Conversion Factors for Greenhouse Gas Reporting (published annually by DESNZ) for fuel and electricity emission calculations.",
              "UK grid carbon intensity has fallen from ~500 gCO2/kWh in 2012 to ~200 gCO2/kWh recently. Scope 2 emissions for unchanged consumption have roughly halved over the period as a result.",
              "The Carbon Literacy Project provides accredited workforce-level training (around eight hours) covering climate science, role-specific carbon impact, individual action and workplace action. Major UK construction firms run rolling Carbon Literacy programmes.",
              "Carbon competence is now a commercial requirement rather than a niche specialism. As an apprentice, building working familiarity with the framework supports both your firm tender position and your own career progression.",
            ]}
          />

          <Quiz title="Scope 1 / 2 / 3 and carbon literacy — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.4 EPDs and cable disclosures
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module 2 complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
