/**
 * Module 2 · Section 4 · Subsection 2 — BS 7671 Section 712/722/753 + ENA G98/G99
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 + AC 2.2
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and
 *             non-statutory requirements for the installation and maintenance of
 *             environmental technology systems"
 *   AC 2.2 — "describe the impact of environmental legislation on electrical
 *             installation work"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 1.4 (Building Regulations and Code for
 * Sustainable Homes for electrical installations).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed BS 7671 application for PV / EV /
 * heating belongs in MCS standalone quals (2399 / 2921). This Sub gives the L3
 * electrician the regulatory map of which BS 7671 section applies to which
 * environmental tech, plus the ENA grid-connection framework.
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
  'BS 7671 Section 712/722/753 + ENA G98/G99 (4.2) | Level 3 Module 2.4.2 | Elec-Mate';
const DESCRIPTION =
  'BS 7671:2018+A4:2026 Section 712 (PV), Section 722 (EV charging) and Section 753 (heating cables and embedded heating systems) plus ENA Engineering Recommendation G98 / G99 for parallel-connected generators. The electrical regulatory map for environmental technology systems on UK installs.';

const checks = [
  {
    id: 'l3-m2-s4-sub2-section-712-scope',
    question:
      'A customer has a PV array that\'s grid-connected via a hybrid inverter with battery storage, with optional islanded operation in a power cut. Which BS 7671 section governs the electrical install?',
    options: [
      "Three-step matrix: (1) Culpability — Very High / High / Medium / Low; (2) Harm — Category 1 (death/permanent), 2 (serious), 3 (minor) with adjustments for risk of higher harm or multiple persons; (3) Turnover band — Large (£50m+), Medium (£10-£50m), Small (£2-£10m), Micro (under £2m). Cell in the matrix gives a starting point and a range. Adjusted up for aggravating factors, down for mitigating.",
      "An F-Gas log entry recording the refrigerant type, the charge weight added or removed, the date, and the F-Gas-certified engineer's name and certificate number. The engineer logs the entry in their own F-Gas register and provides a copy or extract to the customer / installer for the handover pack. Required at every refrigerant transaction (initial commissioning charge, top-up, recovery at decommissioning). Required by the F-Gas Regulations and central to demonstrating compliance during any future enforcement check.",
      "They apply together. Section 712 covers the PV-side electrical requirements (DC isolation, string protection, inverter compliance, AC connection). Section 826 covers the EESS aspects (battery isolation, BMS, fire safety, signage). The hybrid inverter is a single piece of equipment that has to comply with both — the manufacturer's certification typically demonstrates compliance with both sections. The IET Codes of Practice for Grid-Connected PV and for EESS both reference each other. A4:2026 has clarified the interaction in places where ambiguity existed in the 18th Edition.",
      "Section 712 of BS 7671:2018+A4:2026. Section 712 explicitly applies to PV installations whether they're not connected to public distribution, in parallel with public distribution, or as an alternative to public distribution. A hybrid inverter with battery and islanded mode falls within all three scopes at different operating moments. The A4:2026 amendment extensively revised and expanded Section 712 to address modern PV-plus-storage architectures. The general requirements of Parts 1-6 of BS 7671 also apply alongside Section 712.",
    ],
    correctIndex: 3,
    explanation:
      "Section 712 is the special-installation chapter for PV. It sits in Part 7 of BS 7671 (Special Installations or Locations) and applies in addition to the general requirements. The A4:2026 revision was significant — designers and installers must apply the current text. Detailed application is taught in MCS qualification 2399; Unit 301 requires you to recognise that Section 712 is the regulatory home for the electrical detail.",
  },
  {
    id: 'l3-m2-s4-sub2-section-722-pen-fault',
    question:
      'On a PME-supplied domestic property, what does Section 722 require regarding the EV charging point\'s earthing arrangement?',
    options: [
      "Polarity test confirms that the line conductor is connected to the line terminal at every accessory and switching device, AND that switches break the line conductor (not the neutral). BS 7671 643.6 requires polarity verification at every accessory and at the origin. Failed polarity findings: switch breaks neutral instead of line (entire fitting remains live when off — common older-installation fault); reversed polarity at a socket (line and neutral swapped — appliances work but earth/neutral references are wrong); two-way switching wired wrong (intermittent operation). MFT has a polarity test mode; socket testers do polarity-only on 13A sockets.",
      "SECR is a statutory disclosure regime introduced in 2019 under the Companies (Directors Report) and Limited Liability Partnerships (Energy and Carbon Report) Regulations 2018. It requires large UK companies (typically meeting two of: turnover above 36 million pounds, balance sheet above 18 million pounds, or above 250 employees) to disclose their UK energy use and associated greenhouse gas emissions in their annual report. The disclosure covers scope 1, scope 2 and a defined subset of scope 3 (business travel in employee-owned vehicles), along with intensity metrics and a narrative on energy efficiency actions taken.",
      "PME (TN-C-S) supplies present a specific risk for EV charging — if the supply's PEN conductor opens, the vehicle's exposed-conductive-part can rise toward the line voltage relative to true earth. Section 722 (significantly amended in A4:2026) requires either an open-PEN protection device (built into most modern charging units — disconnects the supply if PEN-fault is detected via voltage-rise sensing) OR an earth electrode for the vehicle's chassis (TT arrangement at the charge point). The decision is made by the certified installer based on the supply earthing arrangement and the manufacturer's guidance. Section 722 spells out the conditions under which each option applies.",
      "Section 712 of BS 7671:2018+A4:2026. Section 712 explicitly applies to PV installations whether they're not connected to public distribution, in parallel with public distribution, or as an alternative to public distribution. A hybrid inverter with battery and islanded mode falls within all three scopes at different operating moments. The A4:2026 amendment extensively revised and expanded Section 712 to address modern PV-plus-storage architectures. The general requirements of Parts 1-6 of BS 7671 also apply alongside Section 712.",
    ],
    correctIndex: 2,
    explanation:
      "The PEN-fault risk on EV charging is the specific Section 722 issue. Modern chargers from major manufacturers usually include the open-PEN protection function, which simplifies the install. Where the manufacturer's unit doesn't include it, the installer must provide an earth electrode and convert the EV chassis to a TT earthing arrangement. The 2025+ A4:2026 amendments refined the requirements; the certified installer applies them to each install.",
  },
  {
    id: 'l3-m2-s4-sub2-g98-vs-g99',
    question:
      'A property has an existing 4 kWp PV system on a G98-notified single-phase inverter. The customer wants to add 5 kWh of battery storage with a separate grid-connection inverter rated 3 kW single-phase. What\'s the connection notification path?',
    options: [
      "G99 pre-application. Even though each individual inverter (4 kW PV inverter + 3 kW battery inverter) is below the 16 A G98 threshold, G99 applies to all generators (regardless of size) at sites where pre-existing G98 or G99 generators already exist. Adding a second grid-connected generator triggers G99 because the combined export capacity now matters and the DNO needs to assess. The MCS-certified installer submits the G99 application; the connection cannot be commissioned until the DNO has approved.",
      "Purchased goods and services — dominated by copper cable, aluminium cable, switchgear and luminaires. The practical lever is procurement policy: specify EPD-backed products, set minimum recycled-content thresholds, prefer manufacturer-specific over industry-average EPDs, prefer products with longer expected service life, and reduce material use through more efficient design (smaller cable on shorter runs, lighting with higher lm/W avoiding over-specification). The fix sits at the order stage, before the material is on the van.",
      "Voltage DETECTOR — non-contact, capacitively senses presence of AC. Useful for first-pass live identification but does NOT confirm absence of voltage (high-impedance / dead conductor reads as 'no voltage'). NOT GS38-compliant for proving dead. Voltage INDICATOR — direct-contact, low-impedance, lamp + LED + audible. IS GS38-compliant for proving dead. Volt-sticks are first-look tools; two-pole testers are proving tools.",
      "Header (your business name, address, VAT number if registered, contact details), customer details (name, address), invoice number (sequential), invoice date and payment due date, work description (line items: labour days/hours, materials line items, any extras), subtotal, VAT (if applicable, 20%), total, payment terms (e.g. 'Net 30'), payment methods (BACS details, cheque). Invoices over £250 must include a statement of how to complain (Consumer Rights Act 2015 for domestic).",
    ],
    correctIndex: 0,
    explanation:
      "The 'first generator G98, second generator G99' rule catches a lot of installers out. Battery storage with grid-export capability is a generator under G98/G99, even though it doesn't generate energy itself. The combined export from PV + battery export inverter can exceed the 16 A G98 limit even if neither individual inverter does. The G99 application timeline (weeks to months depending on the DNO) needs to be factored into the customer's commissioning expectations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is BS 7671 Section 712 and what does it cover?',
    options: [
      "The RAMS is the documented safe system of work for the task. Substituting a step ladder for a podium is a deviation from the documented control. Either the podium gets sourced, or the RAMS gets formally amended and re-signed before any work proceeds. Verbally working around the document leaves you outside the safe system of work — and outside any legal protection if something goes wrong. WAHR 2005 Reg 6 puts the duty on the employer to use the most suitable equipment.",
      "Section 712 'Solar photovoltaic (PV) power supply systems' is the special-installations chapter of BS 7671 (Part 7) covering electrical requirements for PV installations. It applies to PV not connected to public distribution, PV in parallel with public distribution, and PV as an alternative to public distribution. Topics include array DC voltage and isolation, DC and AC overcurrent protection, additional protection by RCD, equipotential bonding of array frames, signage and labelling, anti-islanding requirements, and PV-specific inspection and test. The technical content was extensively revised and expanded in BS 7671:2018+A4:2026.",
      "BS 7671 recommends an EICR every five years for domestic installations regardless of env tech additions (every three years for tenanted property in Scotland; every five years in England under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020). The customer is responsible for commissioning the EICR. Insurers may require more frequent inspection for some property types or following modification. Env tech additions shift the inspection content but do not change the cadence — a property with PV plus EV plus heat pump still needs the five-year EICR, with extra observation lines for the env tech kit. The MCS Code suggests an annual visual inspection of PV (panel cleanliness, fixings, junction box integrity) — separate from the BS 7671 five-year EICR but a recommended customer check.",
      "Rarely, in the modern UK context. Micro-CHP burns gas to generate electricity locally and uses the waste heat to drive the wet system. It made sense when grid electricity was carbon-intensive (~500 gCO₂/kWh) and gas was cheap. As the grid decarbonises (~200 gCO₂/kWh now), the relative carbon advantage shrinks. Heat pumps deliver lower running carbon per kWh of heat. Micro-CHP is now mostly seen in larger commercial / institutional applications where heat demand is constant and high. For domestic UK new-build, the Future Homes Standard effectively rules it out.",
    ],
    correctAnswer: 1,
    explanation:
      "Section 712 is one of the special-installation chapters of BS 7671. It applies in addition to the general requirements of Parts 1-6. The A4:2026 amendment was significant — installers and designers must apply the current text. As an apprentice on Unit 301 you should recognise the section number and its scope; detailed application sits with the MCS-certified PV designer.",
  },
  {
    id: 2,
    question:
      'What is BS 7671 Section 722 and what does it cover?',
    options: [
      "Carbon payback for typical UK PV is 1-3 years (the time taken for operating CO₂ savings to offset the manufacturing CO₂ cost). Financial payback depends on system cost, self-consumption, export tariff and electricity price — typically 6-12 years for a standalone PV install in 2026, often shorter if a battery is added (improves self-consumption from 25-40% to 70-90%). After payback the system continues for the rest of its 25-year warranted life essentially as free energy. The carbon case is much stronger than the financial case in isolation; together they make PV the dominant UK domestic environmental tech.",
      "Three possibilities. (1) Lift control system needs a manual reset after power restoration — many older lift controllers don't auto-restart and need an engineer call. (2) Lift safety systems (pit alarm, emergency communications, brake monitoring) reset to fault state on power loss and need clearing. (3) BMS / building management system that interfaces with the lift hasn't fully restarted, leaving the lift in a 'no-comms' state. Action: contact the lift maintenance contractor (every commercial lift has a contracted maintainer per LOLER 1998) — they'll reset and recommission. The L3 apprentice doesn't fix lifts; the lift contractor does. Document the issue and the contractor call on the job sheet.",
      "Section 722 'Electric vehicle charging installations' is the special-installations chapter of BS 7671 covering electrical requirements for EV charging points. Topics include circuit design for the charging point, RCD selection (Type B or RDC-DD with DC fault detection), protection against the PEN-fault risk on PME supplies, isolation, and EV-specific inspection and test. Section 722 was significantly amended in BS 7671:2018+A4:2026 to reflect updated requirements for modern charging hardware and the smart-charging regulatory landscape.",
      "MIET (Member of the Institution of Engineering and Technology) is the standard professional membership grade of the IET. It's a membership grade, not an Engineering Council registration — so you can be MIET without being EngTech/IEng/CEng. Most engineers aim for MIET as the membership tier alongside their professional registration. Grants access to IET technical resources, member events, online journals.",
    ],
    correctAnswer: 2,
    explanation:
      "Section 722 is the BS 7671 home for EV charging. The A4:2026 amendment refined RCD requirements and PEN-fault protection. As an apprentice you'll see Section 722-compliant kit on every EV charging install; the certified installer makes the regulatory judgement calls and the install pack documents Section 722 compliance.",
  },
  {
    id: 3,
    question:
      'What is BS 7671 Section 753 and what does it cover?',
    options: [
      "CALIBRATION — measurement of the instrument's response against reference standards, with results documented in a certificate. The instrument is unchanged; you get a certificate that says 'at the time of test, this instrument read X when measuring Y'. ADJUSTMENT — physical or software adjustment of the instrument to bring it into specification. Some calibration labs do both (calibrate, then adjust if out of spec, then re-calibrate); some do calibration-only (and you make the decision whether to adjust based on the report). The calibration certificate normally states whether adjustment was performed and the as-found vs as-left readings.",
      "No. EAWR Reg 14(c) requires 'suitable precautions including where necessary the provision of suitable protective equipment'. The risk being 'low' doesn't dispense with the precaution — it informs which precaution. For 230 V live work, Class 0 insulated gloves (rated 1000 V AC) plus insulated tools are the standard precaution. The senior is exposing both themselves and the firm to liability under EAWR (failure to take suitable precautions) and HSWA Section 7 (employee duty to take reasonable care of own and others' safety). The apprentice's defence: 'I followed the firm's PPE matrix' — so make sure there IS one and it specifies gloves for live work.",
      "Several practical benefits: BS 7671 included with subscription; Wiring Matters magazine and IET Online for ongoing technical learning; IET Academy CPD content; networking with other electrical practitioners through regional events; access to professional registration (EngTech) for salary signal and credibility; eligibility for IET-affiliated insurance products. Tax-deductible. Most career-focused electrical practitioners find membership pays for itself.",
      "Section 753 'Heating cables and embedded heating systems' covers electric heating cables embedded in floors, walls or ceilings, plus surface heating systems and de-icing / frost-prevention applications. The A4:2026 amendment completely revised Section 753 — extending its scope, retitling it, and adding new requirements relocated from Chapter 53 covering impact protection and installation of heating cables. Industrial heating systems complying with BS EN 60519, BS EN 62395 and BS EN 60079 are excluded from Section 753.",
    ],
    correctAnswer: 3,
    explanation:
      "Section 753 is relevant where heating cables form part of the install — typical in electric underfloor heating (LWHS — low-watt heating systems), trace heating on outdoor pipework, de-icing on gutters and roofs. Heat-pump-fed wet underfloor heating typically uses water pipes (governed by general Part 4-6 requirements, not Section 753). Section 753's complete revision in A4:2026 is one of the major changes designers and installers need to apply.",
  },
  {
    id: 4,
    question:
      'What\'s the practical 16 A per phase boundary for ENA G98 vs G99?',
    options: [
      "G98 fast-track applies to fully-type-tested generators with output up to and including 16 A per phase per inverter — that's 16 A × 230 V = 3.68 kW single-phase per inverter. G99 pre-application applies above 16 A per phase, and to all generators (regardless of size) at sites where pre-existing G98 or G99 generators already exist. Most domestic 4 kW PV inverters are deliberately limited to 3.68 kW max output to stay G98-eligible. Anything above triggers G99 with associated DNO assessment timeline (weeks to months depending on local network).",
      "The technical lead for a project on the sub-contractor's side. The Project Engineer coordinates design (where applicable), procurement, programme, technical queries (RFIs), QA and the eventual handover. They are the sub-contractor's technical face to the main contractor and the M&E Consultant. Typically a Technician-grade or HNC-qualified electrician with several years on site, or a graduate engineer who has crossed in from design.",
      "Because primary copper smelting from ore is one of the most energy-intensive industrial processes globally. Recycled copper requires roughly 15-20% of the energy of primary copper to produce, which translates to a corresponding reduction in embodied carbon for the conductor portion of the cable. Cable is overwhelmingly copper by mass (or aluminium for some larger sizes), so the conductor dominates the embodied carbon calculation. A high-recycled-content conductor is therefore one of the largest single levers for reducing cable embodied carbon at specification stage.",
      "(1) Identify the customer's expectation — do they rely on the battery during outage (off-grid switchover via auto-transfer switch, ATS)? (2) If yes, isolation of the AC inverter side will defeat the ATS and the customer loses the backup function. Brief them. (3) For fault investigation that doesn't need to touch the inverter, isolate ONLY the affected circuit — leave PV / battery / ATS energised. (4) If you must isolate the inverter, coordinate the timing — outside times of expected supply disruption (avoid storms / planned DNO work). (5) After restoration: confirm ATS returns to standby state; verify battery and PV are charging normally; document.",
    ],
    correctAnswer: 0,
    explanation:
      "The 16 A per phase per inverter boundary is a fundamental design constraint on UK domestic generation. Inverter manufacturers split product ranges around it. Battery storage with grid-export capability counts toward the G98/G99 capacity. The MCS-certified installer manages the application; the apprentice should recognise which regime applies and the timeline implications.",
  },
  {
    id: 5,
    question:
      'What does anti-islanding mean in the context of grid-connected generators, and why is it a safety-critical requirement?',
    options: [
      "Five conditions. (1) Cumulative repair cost approaching system replacement cost (cumulative repairs at 70%+ of new system). (2) System at end-of-life (CU 25+ years old, multiple aging components). (3) Code 1 / Code 2 EICR findings affecting multiple aspects of the system. (4) Building work or change-of-use happening; opportunity to upgrade. (5) New regulatory requirements (A4:2026 or future) that the existing system can't meet without major rework. The decision is normally the senior / customer's; the L3 apprentice identifies the indicators and escalates.",
      "Anti-islanding requires a grid-connected generator (PV inverter, wind inverter, battery export inverter, micro-CHP, micro-hydro) to disconnect when the public distribution grid fails — even though it might still have local source energy and could in principle continue exporting. The safety reason: if the inverter continued exporting into a network the DNO had isolated for fault repair, line workers could be exposed to live conductors they thought were dead. ENA G98/G99 specifies the loss-of-mains detection settings (vector shift, ROCOF, voltage and frequency limits) and the maximum disconnection time.",
      "An MID-compliant generation meter measures the total electrical output of the PV array. Required by Smart Export Guarantee (the supplier needs accurate metering to pay the export tariff) and increasingly by BUS / SEG-equivalent schemes for performance monitoring. At commissioning the meter is verified to read correctly (display zero before energising, increment as the inverter delivers, accumulate accurately over the first day's run). The customer can read the meter themselves to verify ongoing performance. The smart meter at the property handles the import / export reading for the supplier.",
      "A statutory certificate issued by an F-Gas certification body that authorises a company to carry out installation, maintenance, repair, decommissioning or leak checking on stationary refrigeration, AC and heat pump equipment containing fluorinated greenhouse gases. The company must also employ enough F-Gas Category I (or equivalent) certified individuals to cover the work. Without the company certificate, the firm cannot legally carry out refrigerant work even if individual engineers are certified.",
    ],
    correctAnswer: 1,
    explanation:
      "Anti-islanding is one of the safety-critical requirements of grid-connected generation. Without it the grid could be 'islanded' by local generators after a DNO trip, putting line workers at risk during fault repair. Customers who want backup operation (lights stay on in a power cut) need either a hybrid inverter with deliberate islanded operation (which switches an internal Automatic Transfer Switch to disconnect from the grid before continuing to power local loads) or a separate ATS-and-battery arrangement. The certified installer handles both; the apprentice should recognise the limitation when explaining to customers.",
  },
  {
    id: 6,
    question:
      'What signage does BS 7671 Section 712 (and the MCS Code) require at the consumer unit / meter position on a PV-equipped property?',
    options: [
      "Because the standard's enforcement and interpretation hinges on the precise definitions. 'Exposed-conductive-part' (a conductive part of equipment that can be touched and which is liable to become live in fault conditions) and 'extraneous-conductive-part' (a conductive part liable to introduce a potential, generally Earth, not forming part of the electrical installation) are different categories with different bonding rules. Mis-classify one as the other and you mis-bond, you fail the EICR, you potentially leave the customer unprotected. Definitions ARE the technical content.",
      "Three things — battery life vs run time (a hard day on an SDS will drain a 5 Ah pack faster than you can charge spares), tool weight (cordless SDS with a 9 Ah pack on the back is noticeably heavier than a corded equivalent), and what supply is actually on site (no 110 V on site = corded 230 V is awkward, cordless wins). Most apprentices end up with a mixed loadout — cordless drill/driver + cordless impact for general work, corded SDS / grinder / recip on site supply for the heavy-duty jobs.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712 plus MCS MIS 3002 plus the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property before they start touching things.",
      "Dominated by Ra. The earth fault loop on TT is: line conductor + R1 + fault + R2 (CPC) + Ra (consumer\\\\\\\\'s electrode) + soil + Ra (transformer\\\\\\\\'s electrode) + transformer winding. The R1+R2 contribution is typically under 1 Omega; Ra dominates. Measured Zs will be approximately Ra + a small contribution from the cabling. With Ra = 150 Omega, Zs at any test point will be approximately 150-152 Omega. Overcurrent ADS is not feasible at that loop impedance — RCD ADS is mandatory on TT, verified by the Ra x I delta n less than or equal to 50 V calculation.",
    ],
    correctAnswer: 2,
    explanation:
      "Signage is a safety-critical requirement, not paperwork bureaucracy. A maintainer arriving without knowing about an on-site generator can expose themselves to live conductors after they've isolated the main switch. The signage convention is durable, visible, and at every isolation point. The MCS Code specifies the durable label format; BS 7671 Section 712 references the requirement; the DNO's connection conditions reinforce it.",
  },
  {
    id: 7,
    question:
      'What\'s the role of RDC-DD (Residual Direct Current Detecting Device) in EV charging, and where is it required under Section 722?',
    options: [
      "Three separate containers. New batteries in their original packaging or a dedicated lithium-safe storage box, separated from the others. Used but undamaged batteries in a metal container with terminals taped or with cell-tray separation to prevent short circuits. The damaged battery in a separate fire-resistant container (vermiculite, sand or a purpose-made Li-ion bag), stored away from the van interior and away from other batteries, and returned to a battery recycling collection point as soon as practical. Never stack damaged with undamaged.",
      "Where floor or ceiling heating units are installed, at least one of the measures listed in 753.424.201(a) to (c) shall be implemented to ensure the maximum temperature does not exceed 80 degrees Celsius. Reg 753.423 applies the surface temperature limit where contact with skin or footwear is possible — the obligation broadens application to include footwear contact, not only barefoot. Acceptance is by the documented presence of one of the three measures (thermostatic limit, embedded sensor cut-out, intrinsic element limitation) and by the commissioning record showing the installed cut-out responds at or below the design temperature.",
      "Client: visionary (redirect focus to the project outcome and shared goals), Apprentice: coaching combined with affiliative (develop their coping strategies while showing genuine care for their wellbeing), Subcontractors: democratic for initial conflict resolution (hearing both perspectives) shifting to commanding only if safety is at risk — demonstrating style-flexing based on situational needs",
      "Modern EV chargers can leak smooth DC current under fault conditions — and a Type AC RCD won't trip on smooth DC. So Section 722 requires either a Type B RCD (which detects AC, pulsating DC and smooth DC) OR a Type A RCD plus an RDC-DD (a separate device that adds smooth-DC detection to a Type A RCD). The RDC-DD route is often cheaper than fitting a Type B RCD because Type A RCDs are widely available and inexpensive. The certified installer chooses the architecture; the customer doesn't see the difference but the regulatory compliance requires one or the other.",
    ],
    correctAnswer: 3,
    explanation:
      "Smooth DC fault current is a specific issue for EV charging due to the topology of modern onboard chargers. Type B RCD or Type A + RDC-DD covers it. The cheaper Type AC RCD is not adequate. Section 722 in A4:2026 refined the requirements; the manufacturer's instructions for the EV charging unit usually specify exactly what protection arrangement is required.",
  },
  {
    id: 8,
    question:
      'How does the L3 electrician\'s role differ between an MCS-certified install and a non-MCS install, in terms of BS 7671 compliance?',
    options: [
      "BS 7671 applies regardless of whether the install is MCS-certified — it's the electrical safety regulation, not an MCS option. On both MCS and non-MCS installs the L3 electrician is responsible for BS 7671 compliance — design, installation, inspection and testing, certification (EIC). On MCS installs the certified installer additionally signs off the MCS install pack and accesses the funding incentives. On non-MCS installs there's no MCS sign-off and no incentive access, but BS 7671 compliance is unchanged. The distinction matters for the customer's funding access; it doesn't matter for the L3 electrician's electrical responsibility.",
      "Circuits supplying heating units shall have additional protection by the use of RCDs in accordance with the characteristics specified in Regulation 415.1.1. Where a resistive fault may cause a fire, for example for overhead heating with heating film elements, the rated residual operating current shall not exceed 30 mA. All underfloor heating installations shall have additional protection by an RCD rated at 30 mA irrespective of location. In areas where occupants are not expected to be completely wet, a circuit supplying heating equipment of Class II construction (or equivalent insulation) shall be provided with additional protection by the use of an RCD with a rated residual operating current not exceeding 30 mA.",
      "Heat-pump compressors have a high inrush current at start-up — typically 5 to 10 times the rated running current for a few cycles as the motor starts. A Type B MCB trips at 3 to 5 times rated current; the compressor inrush can nuisance-trip a Type B even on a healthy install, especially in cold weather when the motor starts hardest. A Type C MCB trips at 5 to 10 times rated current — comfortably above the inrush, still well below the prospective fault current, gives reliable nuisance-trip-free operation while preserving fault protection. Modern inverter-driven units have softer start profiles than older fixed-speed units but Type C remains the standard recommendation. RCBOs in Type C variant are also commonly used to provide both overcurrent and 30 mA earth leakage protection in one device.",
      "The Code for Sustainable Homes was a non-mandatory sustainability rating system (1 to 6 stars) for new-build dwellings, used between 2007 and 2015 in England. It was withdrawn for new applications in March 2015 and replaced by enhanced Part L of the Building Regulations and (for higher-rated developments) by local-authority-specific sustainability requirements. You may still meet the Code referenced on older properties (a Code Level 4 or Level 5 home from 2010-2014 will have been built to Code spec) but it isn't the current standard for new applications.",
    ],
    correctAnswer: 0,
    explanation:
      "The MCS / non-MCS split is a financial / quality scheme distinction. BS 7671 is the electrical safety regulation that applies always. The L3 electrician's electrical inspection-and-test responsibility is identical on either route. The customer-facing conversation about MCS is about funding access; the regulatory floor of BS 7671 compliance is the same.",
  },
];

const faqs = [
  {
    question: "Does the A4:2026 amendment of BS 7671 apply immediately or is there a transition period?",
    answer:
      "The A4:2026 amendment was published with an effective date that gives the industry a transition period before mandatory application — installations whose erection commenced before the effective date can be completed to the previous amendment. New installations from the effective date forward must comply with A4:2026. The IET publishes the effective dates and any transition arrangements; check the IET website for the current position. As an apprentice in 2026 you should be aware that A4:2026 includes significant changes to Sections 712 (PV), 722 (EV) and 753 (heating cables) — the three sections most relevant to environmental tech.",
  },
  {
    question: "If the manufacturer's instructions disagree with BS 7671, which wins?",
    answer:
      "BS 7671 is the regulatory floor — manufacturer instructions can be more restrictive than BS 7671 but cannot relax BS 7671 requirements. Where the manufacturer specifies (e.g.) a Type B RCD, that's binding even if BS 7671 in principle accepts a Type A. Where the manufacturer is silent on a point, BS 7671 fills the gap. Where the two genuinely conflict (rare) the safer / more restrictive requirement applies and you should refer the conflict to the certified installer / designer for written direction.",
  },
  {
    question: "What's the relationship between BS 7671 and the IET Wiring Regulations?",
    answer:
      "They are the same document. BS 7671 is the British Standard published jointly by the BSI and the IET; the IET publishes the user-facing version as the 'IET Wiring Regulations 18th Edition' (currently). Same content, different branding. Reference either as appropriate to the audience — 'BS 7671 Section 712' is the technical reference, 'the Wiring Regs' is the colloquial reference.",
  },
  {
    question: "Is the DNO a regulator?",
    answer:
      "The DNO (Distribution Network Operator — UK Power Networks, National Grid Electricity Distribution, etc.) is the operator of the local public distribution network at low and medium voltage. They are not a regulator (Ofgem is the regulator for the energy networks) but they enforce connection conditions on customers and generators connecting to their network — including ENA G98 / G99 for parallel generators. As the L3 electrician on a generation install you interact with the DNO via the certified installer's G98/G99 application; you don't typically deal with the DNO directly except for emergency / outage matters.",
  },
  {
    question: "What's the timeline impact of G99 on the customer's install date?",
    answer:
      "G99 pre-application timelines vary by DNO and by local network conditions. Simple connections (clear network capacity, standard inverter) can be approved in 2-4 weeks. Constrained networks, large systems or new substations can require months. The customer must be told this up front — the install can't commission until DNO approval. The MCS-certified installer manages the application and provides timeline expectations. As the apprentice you should never quote a commission date for a G99 install without confirmation from the certified installer.",
  },
  {
    question: "Does battery storage without grid-export capability still trigger G98/G99?",
    answer:
      "If the battery system is genuinely incapable of exporting to the grid (some inverters can be configured to charge from grid but never export; others have export-disable features), it doesn't trigger G98/G99. But many domestic battery systems are paired with a hybrid inverter that can export, so check the specific install configuration. The G98/G99 trigger is the export capability, not the storage itself. Where in doubt, the certified installer makes the assessment.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 2"
            title="BS 7671 Section 712/722/753 + ENA G98/G99"
            description="The electrical regulatory map for environmental tech — Section 712 (PV), Section 722 (EV), Section 753 (heating cables) of BS 7671:2018+A4:2026, plus ENA Engineering Recommendation G98/G99 for parallel-connected generators."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671:2018+A4:2026 has three special-installation chapters most relevant to environmental tech — Section 712 (PV, extensively revised), Section 722 (EV charging, significantly amended), Section 753 (heating cables, completely revised).",
              "Each special-installation chapter applies in addition to the general requirements of Parts 1-6 of BS 7671. They're not standalone — they layer on top.",
              "ENA Engineering Recommendation G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that — and for all generators at sites with pre-existing G98/G99 connections.",
              "Anti-islanding under G98/G99 requires the inverter to disconnect when the grid fails. Customer backup operation needs hybrid inverter with deliberate island mode or separate ATS-and-battery.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify BS 7671:2018+A4:2026 Section 712 as the special-installation chapter for solar PV electrical requirements.",
              "Identify BS 7671:2018+A4:2026 Section 722 as the special-installation chapter for EV charging electrical requirements, including the PEN-fault protection requirement on PME supplies.",
              "Identify BS 7671:2018+A4:2026 Section 753 as the special-installation chapter for heating cables and embedded heating systems.",
              "Distinguish ENA G98 fast-track notification (≤16 A per phase per inverter) from G99 pre-application (&gt;16 A per phase, or any second generator at a site with pre-existing G98/G99).",
              "Explain anti-islanding as a safety-critical requirement of grid-connected generators — protects line workers during DNO fault response.",
              "Recognise the signage requirements at consumer unit / meter position for environmental tech installs and their role in maintainer safety.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Section 712 — Solar PV</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 'Solar photovoltaic (PV) power supply systems'"
            clause={
              <>
                <p className="mb-2">
                  Section 712 has been extensively revised and expanded in the A4:2026
                  amendment. The scope is unambiguous: &quot;The requirements of this section
                  shall apply to PV installations:
                </p>
                <ul className="space-y-1 list-disc pl-5 mb-2">
                  <li>not connected to a system for distribution of electricity to the public;</li>
                  <li>in parallel with a system for distribution of electricity to the public; and</li>
                  <li>as an alternative to a system for distribution of electricity to the public.&quot;</li>
                </ul>
                <p>
                  Topics within Section 712 include array DC voltage and isolation, DC and
                  AC overcurrent protection, additional protection by RCD where required,
                  equipotential bonding of array frames, signage and labelling, anti-
                  islanding requirements at the AC interface, and PV-specific inspection
                  and test.
                </p>
              </>
            }
            meaning={
              <>
                Section 712 is the electrical regulatory home for every PV installation in
                the UK — grid-connected, off-grid, and hybrid with battery storage. The
                A4:2026 revision was material — designers and installers must apply the
                current text. Section 712 sits in Part 7 of BS 7671 (Special Installations
                or Locations) and applies in addition to the general requirements of Parts
                1-6. Detailed application is taught in MCS qualification 2399.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712 (paraphrased from the published amendment text — full content in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <VideoCard
            url={videos.inverter.url}
            title={videos.inverter.title}
            channel={videos.inverter.channel}
            duration={videos.inverter.duration}
            topic="The PV / hybrid inverter — what Section 712 actually regulates"
            caption={
              <>
                Section 712 is built around the inverter as the AC / DC interface. The Engineering
                Mindset opens an inverter and walks the IGBT bridge, MPPT and anti-islanding —
                useful context before you read the regs and the G98 / G99 grid-connection rules
                below.
              </>
            }
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Section 722 — EV charging</ContentEyebrow>

          <ConceptBlock
            title="The PEN-fault risk on PME supplies — Section 722's headline issue"
            plainEnglish="On a PME (TN-C-S) supply the supply earth is derived from the supply neutral via the PEN conductor in the service head. If the PEN conductor opens (broken, corroded, or DNO fault), the property's earth references rises toward line voltage relative to true earth. Any exposed-conductive-part inside the property — including an EV vehicle chassis connected to the property earth via the charger — can become live to true earth. Section 722 requires this risk to be managed, either via an open-PEN protection device built into the charger, or via a TT earth electrode for the EV chassis."
            onSite="Modern EV chargers from major manufacturers (Wallbox, Zappi, Hypervolt, Easee, etc.) usually include an integrated open-PEN protection function that disconnects the charger if PEN-fault is detected via voltage-rise sensing. Where the chosen unit doesn't include the function, the certified installer provides a local earth electrode and converts the EV to a TT earthing arrangement at the charge point. Section 722 (significantly amended in A4:2026) spells out the conditions; the certified installer applies them."
          >
            <p>
              The Section 722 specifics for an EV charging install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RCD selection</strong> — Type B RCD (detects AC, pulsating DC and
                smooth DC) OR Type A RCD plus RDC-DD (residual direct current detecting
                device that adds smooth-DC detection to a Type A RCD). Type AC RCD is not
                adequate for EV charging.
              </li>
              <li>
                <strong>PEN-fault protection</strong> — open-PEN protection device built
                into the charger, OR earth electrode for TT-earthed EV.
              </li>
              <li>
                <strong>Isolation</strong> — local accessible isolation at the charge point,
                dedicated MCB at the consumer unit.
              </li>
              <li>
                <strong>Cable selection</strong> — sized for sustained continuous load
                (charging sessions of hours), with thermal capacity the design constraint.
              </li>
              <li>
                <strong>Smart-charging compliance</strong> — the Smart Charge Point
                Regulations 2021 require demand-side response capability on units sold for
                installation. A separate regulation from BS 7671 but bites at the same
                install.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 'Electric vehicle charging installations'"
            clause={
              <>
                Section 722 has been significantly amended in A4:2026 to reflect updated
                requirements for EV charging installations, including refinements to RCD
                selection, open-PEN protection requirements for PME-supplied installations,
                and integration with smart-charging functionality. Regulation 715.524.201
                within Chapter 71 confirms that Section 722 covers electric vehicle charging
                installations.
              </>
            }
            meaning={
              <>
                Section 722 sits in Part 7 of BS 7671. The A4:2026 amendments are material —
                designers and installers must apply the current text. The PEN-fault risk
                management is the section&apos;s headline technical issue. As Unit 301 is
                overview level, recognise where Section 722 sits and what its main concerns
                are; detailed application is taught in EV-specific qualification 2921.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722 (paraphrased from the published amendment text)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Section 753 — Heating cables and embedded heating systems</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 753 'Heating cables and embedded heating systems'"
            clause={
              <>
                Section 753 has been completely revised and retitled in A4:2026. Its scope
                has been extended to apply to embedded electric heating systems for surface
                heating. The requirements apply to electric heating systems for de-icing,
                frost prevention and similar applications and cover both indoor and outdoor
                systems. New regulations have been added (relocated from Chapter 53)
                covering impact protection and the installation of heating cables.
                Industrial and commercial heating systems complying with BS EN 60519,
                BS EN 62395 and BS EN 60079 are not covered by this section.
              </>
            }
            meaning={
              <>
                Section 753 is the special-installation chapter for electric heating cables
                — typically used in electric underfloor heating, trace heating on outdoor
                pipework, and de-icing on gutters and roofs. Pure water-based underfloor
                heating fed by a heat pump uses water pipes (not heating cables) and is
                governed by general Part 4-6 requirements, not Section 753. Hybrid systems
                combining wet underfloor with electric trace heating fall within Section 753.
                The complete revision in A4:2026 is one of the major changes designers and
                installers need to apply.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 753 (paraphrased from the published amendment text)."
          />

          <SectionRule />

          <ContentEyebrow>ENA G98 / G99 — the grid-connection regime</ContentEyebrow>

          <ConceptBlock
            title="One framework, two thresholds, all parallel-connected generators"
            plainEnglish="Every parallel-connected generator in the UK — PV, wind, micro-hydro, micro-CHP, battery storage with grid-export — connects under one of two ENA Engineering Recommendations. G98 is a fast-track notification process for inverters at or below 16 A per phase per inverter (3.68 kW single-phase). G99 is a pre-application process for anything bigger. The DNO uses the G98/G99 application to assess the impact on the local network and confirm or qualify the connection."
            onSite="The MCS-certified installer submits the G98 / G99 paperwork. As an apprentice you should know which scheme applies (look at the inverter rating and check for any pre-existing on-site generation) and what the timeline is. G98 is essentially fit-and-tell; G99 can take weeks to months."
          >
            <p>
              The two thresholds in detail:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>G98 fast-track</strong> — applies to fully-type-tested generators
                with output up to and including 16 A per phase per inverter. Connection
                notification can be made after commissioning (within 28 days). The DNO does
                not pre-approve the connection. Most domestic 4 kW PV inverters quote 3.68
                kW max output to stay G98-eligible.
              </li>
              <li>
                <strong>G99 pre-application</strong> — applies to generators above 16 A per
                phase, and to all generators (regardless of size) at sites where pre-
                existing G98 or G99 generators already exist. Pre-application required;
                the DNO assesses local network capacity and confirms or qualifies the
                connection. Typical approval timeline 2-12 weeks depending on local
                conditions.
              </li>
              <li>
                <strong>Storage included</strong> — battery storage with grid-export
                capability falls under the same G98/G99 rules. The total combined export
                capacity matters, not just the PV inverter rating.
              </li>
              <li>
                <strong>Three-phase</strong> — the 16 A per phase limit is per-phase, so
                three-phase G98 limit is 16 A × 230 V × 3 = 11.04 kW total. Some installers
                split a larger system into multiple G98 inverters across phases to avoid
                the G99 timeline.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Anti-islanding — why the lights go out in a power cut"
            plainEnglish="A grid-connected generator must disconnect when the grid fails. This is anti-islanding. The reason: if the generator continued exporting into a network the DNO had isolated for fault repair, line workers could be exposed to live conductors they thought were dead. ENA G98/G99 specifies the loss-of-mains detection settings (vector shift, ROCOF, voltage and frequency limits) and the maximum disconnection time. The customer's lights go off in a power cut even though the PV / wind / micro-CHP could in principle keep running."
            onSite="Customers who want backup operation (lights stay on in a power cut) need either a hybrid inverter with deliberate islanded operation (which switches an internal Automatic Transfer Switch to disconnect from the grid before continuing to power local loads via battery) or a separate ATS-and-battery arrangement. Both add cost and complexity. The certified installer specifies and configures both. As an apprentice you should be able to explain the limitation to the customer who asks."
          >
            <p>
              Why anti-islanding is a hard safety requirement, not a configuration choice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Line workers respond to faults by isolating the affected section of the
                network. They expect the section to stay dead while they work on it.
              </li>
              <li>
                A local generator continuing to export into the isolated section creates a
                live conductor where the line worker expects no voltage. Result: shock
                risk, potentially fatal.
              </li>
              <li>
                The G98/G99 anti-islanding requirement protects line workers, not the
                customer. The customer&apos;s &quot;but I want power in a cut&quot; is
                addressed via deliberately-islanded hybrid inverters that disconnect from
                the grid first.
              </li>
              <li>
                Loss-of-mains detection settings (vector shift, ROCOF, voltage / frequency
                limits) are tested at commissioning and verified at periodic inspection.
                Tampering with the settings is a criminal offence under the Electricity
                Safety, Quality and Continuity Regulations 2002.
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

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming a battery-only install doesn't need G99 because 'it's just storage'"
            whatHappens={
              <>
                Customer has an existing G98-notified PV system. Installer adds a battery
                with a separate grid-connection inverter. Each inverter is below 16 A per
                phase, so installer assumes G98 covers it. The DNO disagrees — adding a
                second generator at a site with a pre-existing G98 connection triggers G99.
                The connection is non-compliant; the DNO may require disconnection until
                G99 application is approved retrospectively. Customer is unhappy; trade
                gets the blame.
              </>
            }
            doInstead={
              <>
                The G98/G99 rule is &quot;G98 applies to a single generator below 16 A;
                G99 applies above 16 A OR to any second generator at a pre-existing G98/G99
                site&quot;. Always check for pre-existing on-site generation before
                committing to a connection scheme. The MCS-certified installer manages the
                application; if you&apos;re first-fixing for the install, confirm with the
                installer which scheme applies before fitting any cable.
              </>
            }
          />

          <CommonMistake
            title="Missing the open-PEN protection requirement on a PME-supplied EV install"
            whatHappens={
              <>
                Apprentice fits an EV charger on a PME-supplied domestic property without
                checking the unit&apos;s open-PEN protection function or providing an
                earth electrode. PEN-fault eventually occurs (could be a DNO supply fault,
                could be corrosion at the cut-out neutral). The vehicle&apos;s exposed
                chassis rises toward line voltage relative to true earth; customer
                touching the vehicle while standing on the driveway gets a shock. The
                Section 722 / A4:2026 requirement was not satisfied.
              </>
            }
            doInstead={
              <>
                Always check the supply earthing arrangement before fitting an EV charger.
                On PME / TN-C-S, Section 722 requires either the unit&apos;s open-PEN
                protection function (most modern chargers include it) or a local earth
                electrode for the EV (TT-at-charge-point). Read the manufacturer&apos;s
                installation instructions — they usually specify exactly what protection
                arrangement is required. The certified installer signs off Section 722
                compliance; if you&apos;re first-fixing, follow the installer&apos;s
                design pack precisely.
              </>
            }
          />

          <Scenario
            title="Hybrid PV-and-battery install — full regulatory chain"
            situation={
              <>
                You&apos;re working on a 7 kWp PV install with 10 kWh battery storage on a
                hybrid inverter rated 5 kW single-phase. Customer wants the system
                operational in 8 weeks for the spring weather. The property has no
                pre-existing on-site generation. The DNO is UK Power Networks (London).
                The certified installer has confirmed the grid-connection application route.
                Customer asks &quot;what regulations does this lot fall under?&quot;.
              </>
            }
            whatToDo={
              <>
                Walk the customer through the regulatory chain: (1) BS 7671 Section 712 —
                the special-installation chapter for the PV electrical design, including
                DC and AC isolation, RCD, anti-islanding, signage, equipotential bonding;
                (2) MCS MIS 3002 (PV) and MIS 3012 (battery storage) — the installer
                competence and quality standards; (3) ENA G99 — pre-application required
                because the inverter is 5 kW (above the 16 A G98 limit). The DNO
                application is in. Approval timeline 4-8 weeks for a standard urban
                connection; (4) Building Regulations Part P — notifiable work, handled by
                the firm&apos;s competent-person scheme; (5) Building Regulations Part L —
                contributes to the property&apos;s SAP score, EPC will be re-issued; (6)
                Smart Export Guarantee — customer signs up with chosen supplier after
                commission for export tariff payment. Commission depends on G99 approval —
                so realistic commission date is when DNO clears the application, not when
                you finish first-fix.
              </>
            }
            whyItMatters={
              <>
                Customers ask &quot;what regulations apply?&quot; expecting a one-line
                answer. The honest answer is the chain — six different frameworks at
                different stages of the install. Walking the customer through it sets
                realistic expectations on the timeline (G99 is the long pole) and explains
                why the install pack is the size it is. As the L3 electrician you don&apos;t
                run any of these processes individually, but you should recognise where each
                sits and why the customer is paying for the certified install rather than
                a cheap non-MCS alternative.
              </>
            }
          />

          <ConceptBlock
            title="The certificate package — what the customer actually receives"
            plainEnglish="At the end of an MCS-certified install the customer receives a stack of paperwork. The MCS Installation Certificate is the headline document — it confirms the install meets the relevant MIS standard and is the key the customer uses to claim incentives. Alongside it comes the BS 7671 Electrical Installation Certificate (EIC), the manufacturer&apos;s commissioning records, the system handover pack with operating instructions, and any DNO confirmation (G98 deemed-acceptance reply or G99 connection agreement)."
            onSite="Hand the pack over in person. Walk the customer through the isolators, the labels, the inverter app and the &quot;what to do in a power cut&quot; logic. The certificates go in the customer&apos;s file; the labels go on the kit. A handover that is just &quot;here are the keys&quot; leaves a customer who can&apos;t use the system properly and ends up calling you back about non-faults."
          >
            <p>What the customer file should contain on day one:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCS Installation Certificate (the incentive-eligibility document).</li>
              <li>BS 7671 EIC plus any associated schedules of inspections and test results.</li>
              <li>Manufacturer commissioning records and warranty documents.</li>
              <li>System handover pack — operating instructions, isolation procedure, fault-finding flowcharts.</li>
              <li>DNO paperwork — G98 deemed acceptance or G99 connection agreement.</li>
              <li>Customer-facing quick-reference card with isolation steps and emergency contacts.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Where MCS sign-off fits with BS 7671 certification"
            plainEnglish="MCS and BS 7671 are complementary, not duplicative. The MCS Installation Certificate confirms the system meets the MIS standard for that technology — design, product selection, installer competence, commissioning. The BS 7671 EIC confirms the electrical installation meets the Wiring Regulations. Both are required on a typical PV / heat-pump / EV / battery install."
            onSite="As the L3 electrician you&apos;ll often produce the EIC; the MCS-certified installer (often the same firm, sometimes not) produces the MCS certificate. If the customer asks &quot;why two certificates?&quot;, the honest answer is that they cover different things — one for the technology-specific install standard, one for the BS 7671 electrical safety baseline."
          >
            <p>Practical division of certification responsibility:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCS Installation Certificate — issued by the MCS-certified installer / firm.</li>
              <li>BS 7671 EIC — issued by the competent person who designed, installed and tested the electrical works (often the same person on small jobs).</li>
              <li>BS 7671 Minor Works Certificate — used where the install is a small modification (rare on full PV / heat pump / EV jobs; common on small additions).</li>
              <li>EICR — periodic inspection report, issued by a competent person assessing an existing installation including any environmental tech additions.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 753 — heating cables and the underfloor heating special location"
            plainEnglish="BS 7671 Section 753 covers heating cables and embedded heating systems — underfloor heating mats and loose cable, freeze-protection trace heating, snow-melt for driveways and ramps. The section was completely revised in A4:2026. Key requirements include 30 mA RCD protection, conductor and cable type appropriate to the embedded environment, supply via dedicated circuit, and labelling of the heated area at the consumer unit and at any termination point."
            onSite="A typical electric underfloor heating retrofit on a kitchen / bathroom involves a heating mat (or loose cable) embedded in a self-levelling compound, a thermostat with floor sensor, a dedicated 16 A circuit on a 30 mA RCD, and a labelled isolation point. The L3 apprentice's scope: dedicated supply, RCD, thermostat, sensor cable. The heating mat install is normally by the heated-floor specialist or the bathroom installer; the electrician verifies the mat is bonded if metallic and that the controls are wired correctly. Document the heated area on the EIC schedule of inspections."
          >
            <p>
              Section 753 install considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dedicated final circuit</strong> — typically 16 A on
                a 30 mA RCD; sized to the mat's stated rating; do not share
                with adjacent socket circuits.
              </li>
              <li>
                <strong>RCD type</strong> — 30 mA general-purpose RCD or
                RCBO; Type AC adequate for resistive heating.
              </li>
              <li>
                <strong>Thermostat with floor sensor</strong> — sensor cable
                in conduit so the sensor is accessible for replacement
                without lifting the floor.
              </li>
              <li>
                <strong>Labelled isolation</strong> — at the consumer unit
                ('underfloor heating: kitchen') and at the local
                thermostat / isolator.
              </li>
              <li>
                <strong>Heated-area record</strong> — area of mat installed,
                manufacturer, mat reference, install date; goes on the
                customer pack so the future inspector can locate the mat
                without lifting the floor.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Diverters and battery export — the next-generation domestic energy install"
            plainEnglish="Beyond simple PV-and-battery, modern installs frequently include a power diverter that sends excess PV generation to the immersion heater (Solar iBoost, Eddi by myenergi) and a hybrid inverter that can do anything from charge the home battery to discharge to support the grid during peak. The L3 apprentice on these installs needs to understand the controls layer — which device is in charge of which output, what the export priority is, what the customer expects to see in the app."
            onSite="A typical 2026 install: PV array → hybrid inverter → home battery → consumer unit → priority diverter to immersion. The hybrid inverter's app shows live PV generation, battery state of charge, home demand, grid import / export. The customer expects: PV charges battery first, then meets demand, then exports to grid. Variations driven by tariffs (Octopus Agile, Octopus Flux, Intelligent Octopus Go for EVs). Document the priority strategy at handover so the customer can re-set it later."
          >
            <p>
              Common controls-layer arrangements in a diverter / battery install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV-first to battery</strong> — every PV kWh charges
                the home battery before any export. Battery becomes the
                buffer for the household.
              </li>
              <li>
                <strong>PV-first to immersion</strong> — power diverter
                (myenergi Eddi or similar) sends excess PV to the immersion
                heater; battery charges only after the immersion is
                satisfied.
              </li>
              <li>
                <strong>Tariff-aware battery</strong> — battery charges
                from grid during cheap tariff windows (Octopus Go 00:30-04:30,
                or Agile dynamic), discharges during expensive evening
                peak.
              </li>
              <li>
                <strong>EV-first charge</strong> — Intelligent Octopus Go
                tariff schedules the EV charger and home battery jointly to
                cheap windows.
              </li>
              <li>
                <strong>Customer override</strong> — most apps allow a
                'force charge' button for cold weather or guests; brief the
                customer at handover.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Surge protective devices — the A4:2026 SPD requirement landscape"
            plainEnglish="A4:2026 strengthened the SPD requirement on the consumer unit. Most modern UK installations now fit a Type 2 SPD at the consumer unit as standard practice (some Type 1+2 in rural / overhead-supply locations). The SPD diverts surge currents from lightning and switching events to earth, protecting connected electronics. The L3 apprentice's scope on a CU upgrade now routinely includes specifying and fitting the SPD."
            onSite="Type 2 SPD at the consumer unit — DIN-rail mounted plug-in module on its own dedicated MCB (typically 16 A), bonded to the MET via a short low-impedance conductor (typically 6-16 mm² copper). Module status indicator (green = OK, red = consumed and needing replacement). Customer brief at handover — explain the SPD, the indicator, and the replacement cost (~£40-80 module, fitted in a few minutes). Surge events in the UK are mostly switching surges from the supply network rather than direct lightning; the SPD silently absorbs them and saves connected electronics."
          >
            <p>
              SPD types and where each is appropriate:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type 1</strong> — direct-strike protection at the
                service entrance; for buildings with a structural lightning
                protection system per BS EN 62305.
              </li>
              <li>
                <strong>Type 2</strong> — switching surge and indirect
                lightning protection at the consumer unit; current standard
                practice for most UK installs.
              </li>
              <li>
                <strong>Type 3</strong> — equipment-end protection at
                sensitive accessories (server room, control panel,
                medical equipment); supplements Type 2.
              </li>
              <li>
                <strong>Type 1+2 combined</strong> — service-entrance
                location where the building lacks a lightning protection
                system but is at higher risk (rural, overhead supply,
                exposed location).
              </li>
              <li>
                <strong>End-of-life replacement</strong> — module-style SPDs
                are designed to be replaced when the indicator turns red;
                customer-friendly maintenance task.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671:2018+A4:2026 has three special-installation chapters most relevant to environmental tech — Section 712 (PV, extensively revised), Section 722 (EV, significantly amended), Section 753 (heating cables, completely revised).",
              "Each special-installation chapter applies in addition to the general requirements of Parts 1-6 of BS 7671 — they layer on top, they don't stand alone.",
              "Section 722's headline requirement is PEN-fault protection on PME-supplied EV charging — open-PEN protection device built into the charger, or TT earth electrode for the EV.",
              "Section 722 requires Type B RCD or Type A + RDC-DD for EV charging. Type AC RCD is not adequate.",
              "ENA G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that, and for all second generators at sites with pre-existing G98/G99.",
              "Battery storage with grid-export capability counts toward G98/G99 capacity — it's a generator under the framework, not just storage.",
              "Anti-islanding under G98/G99 protects DNO line workers during fault response. Customer backup operation requires hybrid inverter with deliberate island mode or separate ATS-and-battery.",
              "Signage at consumer unit / meter / inverter / DC isolators is required by BS 7671 Section 712 plus MCS Code plus DNO connection conditions — it's safety-critical for future maintainers, not paperwork.",
            ]}
          />

          <Quiz title="BS 7671 + ENA G98/G99 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.1 Building Regs + MCS framework
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — Installation, commissioning, maintenance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
