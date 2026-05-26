/**
 * Module 4 · Section 5 · Subsection 5 — Reporting + handover documentation
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.4 + AC 5.5
 *   AC 5.4 — "specify the procedures for the safe disposal of waste materials"
 *   AC 5.5 — "specify the procedures for informing relevant persons about the
 *             rectification work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.6 — specify the procedures for
 * informing relevant persons; AC 5.7 — appropriate documentation.
 *
 * Frame: rectification is not finished until the documentary trail is closed.
 * Minor Works Certificate, EIC, EICR + Schedule of Remedial Works, Duty
 * Holder briefing, Building Control / Building Regs notification under Part P
 * for notifiable work, customer warranty handover, internal job sheet update.
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
  "Reporting + handover documentation (5.4/5.5) | Level 3 Module 4.5.5 | Elec-Mate";
const DESCRIPTION =
  "Closing the documentary trail on a rectification job — Minor Works Certificate, EIC, EICR + Schedule of Remedial Works, Building Control under Part P for notifiable work, customer warranty, BS 7671 A4:2026 currency on every certificate field.";

const checks = [
  {
    id: "mod4-s5-sub5-cert-choice",
    question:
      "You've replaced a failed 32 A RCBO on a domestic kitchen ring. The original installation was certificated to BS 7671 18th Edition Amendment 2 (2022). Which certificate do you issue for the rectification?",
    options: [
      "Section 826 of BS 7671 covers Electrical Energy Storage Systems (EESS) and was added at the 18th Edition. It applies in addition to the rest of BS 7671 and to any product-specific standards (such as the IEC 62619 cell standard). The IET Code of Practice for Electrical Energy Storage Systems supplements Section 826 with practical guidance on siting, ventilation, fire separation, signage and emergency isolation. A4:2026 has refined parts of this framework as the technology has matured.",
      "Minor Works Certificate (MWC). Replacement of an existing protective device on an existing circuit, no extension to the installation, no new circuits — that's the textbook MWC scope under BS 7671 Part 6 631.4. The MWC records the work done, the test results on the affected circuit (continuity of CPC, IR, polarity, R1+R2, Zs, RCD trip-time), the Designer / Constructor / Inspector signature, and the BS 7671 edition you've tested to (BS 7671:2018+A4:2026 in 2026). EIC is for new circuits or significant additions; EICR is for the periodic inspection report, not for rectification.",
      "Both check Building Regulations compliance, but LABC inspectors work for the Local Authority and follow the public-sector route; Approved Inspectors are private-sector firms registered with CICAIR (Construction Industry Council Approved Inspectors Register) who can be appointed in place of LABC. The choice is the client's. Both have the same statutory authority and the same Building Regulations to enforce.",
      "Part L (Conservation of Fuel and Power) requires every new build and every notifiable refurbishment to demonstrate compliance via a SAP calculation that meets the Target Emission Rate (TER) and Target Fabric Energy Efficiency (TFEE) for the property type. A heat pump's contribution to the SAP calculation depends on its SCOP and the carbon intensity of grid electricity. Modern heat pumps in well-designed homes pass Part L comfortably. The Future Homes Standard (in force from 2025) effectively rules out fossil-fuel boilers from new-build because the SAP calculation cannot reach compliance with a gas boiler under the tightening targets. The MCS designer's SCOP estimate feeds the SAP calculation.",
    ],
    correctIndex: 1,
    explanation:
      "Cert-type selection is part of L3 competence. Like-for-like replacement on an existing circuit = Minor Works Certificate. New circuit or significant addition = Electrical Installation Certificate. Periodic check = Electrical Installation Condition Report. Choosing wrong undermines the documentary trail.",
  },
  {
    id: "mod4-s5-sub5-part-p",
    question:
      "Domestic kitchen, you've replaced a failed RCBO. Is this notifiable under Part P?",
    options: [
      "MIS 3002 is the MCS installer-competence and product-certification standard required for the customer to claim Smart Export Guarantee payments and demonstrate quality assurance. The IET Code of Practice is the practical implementation guide that walks through how to apply BS 7671 Section 712 on a real install — system architecture, cable selection, protective devices, labelling, commissioning. Both reference each other; both should be on the bench when the MCS designer is producing the install drawings. Neither replaces BS 7671 — Section 712 is the legal floor; MIS 3002 and the IET CoP build on top.",
      "No. Part P (Building Regulations Approved Document P) makes NEW circuits in dwellings notifiable to Building Control. Replacement of an existing protective device is NOT a new circuit — it's maintenance. Notifiable work is: new circuits in dwellings; consumer unit replacements; any work in special locations (bathroom Zone 0/1/2 work, swimming pools, saunas). For non-notifiable work, the Minor Works Certificate is the documentary record but no Building Control submission is required. For notifiable work, the contractor must be a registered competent person (NICEIC, NAPIT, ELECSA, STROMA) and the Building Control notification goes via the scheme's online portal.",
      "COP 4.5 at A7/W35 is the manufacturer's number at outdoor 7°C and flow temperature 35°C — a mild day driving low-temperature underfloor heating. Real seasonal performance (SCOP) averages across the cold snaps and is typically 3.0-3.8 for properly designed UK installs, lower for marginal installs on undersized old radiators. The MCS-certified design produces the SCOP estimate based on the actual building heat loss and emitter design — that's the figure to discuss running costs with. Quoting COP as if it's SCOP overpromises and the customer feels misled when the bills come in.",
      "The UPS battery has been substantially discharged during the period of mains isolation. Modern UPS units run on battery during outage; if your isolation lasted longer than the UPS battery capacity (typical 10–20 minutes for office units, hours for server-room units), the battery is depleted. After mains restoration, the UPS recharges over 4–24 hours depending on capacity. During the recharge period the UPS may be unable to provide full backup if a second outage occurs. Brief the customer / IT contact on the recharge timeline; recommend they avoid further isolation work until recharged. Document in the job sheet.",
    ],
    correctIndex: 1,
    explanation:
      "Part P is one of the most-misunderstood regulations on small domestic work. Like-for-like replacement is NOT notifiable. New circuits and CU replacements ARE. The L3 apprentice's job is to know the difference and to make sure notifiable work goes through the firm's competent-person scheme.",
  },
  {
    id: "mod4-s5-sub5-eicr-update",
    question:
      "The original fault was found during an EICR — a C2 (Potentially Dangerous) coded against the kitchen ring for a failing RCD. You've now rectified it. What's the documentary closure?",
    options: [
      "Schedule of Remedial Works (or 'Remedial Action Notice') referenced back to the original EICR + Minor Works Certificate for the rectification work itself. The Schedule of Remedial Works lists each EICR-coded item, what was done to rectify, the new test result, the date and signature. Combined with the MWC, it's the documentary proof that the C2 has been cleared. The Duty Holder (the customer, employer or landlord) keeps the EICR + the Schedule + the MWC together — that's the bundle they hand to the next inspector at the next periodic inspection (typically 5 years for domestic, 1 year for commercial / landlord).",
      "CALIBRATION — formal laboratory measurement of an instrument's accuracy against UKAS-traceable reference standards, results documented in a certificate, performed at fixed intervals (annually for MFT, every 24 months for two-pole). VERIFICATION — comparison of two instruments under field conditions to confirm they agree (e.g. MFT EFLI reading agreed within 5% of a known reference loop). FUNCTION CHECK — pre-use confirmation that the instrument operates at all (powers on, indicates on a known source, returns to zero on a known dead source). Each is a different level of confidence; calibration is the formal baseline, verification confirms field agreement, function is the daily go/no-go.",
      "ENA Engineering Recommendation G98 applies — generation up to and including 16 A per phase per inverter is a fit-and-inform connection. The MCS-certified installer must notify the DNO within 28 days of energising the system, using the standard G98 notification form, including site details, inverter make / model / capacity, type-test reference and the installation date. The DNO does not need to consent before energisation under G98 (that's the difference vs G99). The MCS certificate, the EIC and the G98 notification together unlock the Smart Export Guarantee application with the customer's electricity supplier.",
      "Half-split = at each step you eliminate half the remaining circuit. Step 1: open the ring at a socket roughly half-way around the ring; test continuity from the DB to that point on each leg; if both legs read continuity, the break is between this socket and the OTHER end of the ring; if one leg reads OL, the break is between this socket and the DB on that leg. Step 2: pick the half that contains the break, repeat at its mid-point. With a 12-socket ring you locate the break in 4 measurements (log&#8322;12 &asymp; 3.6, rounded up). Random walking would take 6 measurements on average. The technique is from logarithmic search algorithms — formalised diagnostic discipline beats random.",
    ],
    correctIndex: 0,
    explanation:
      "The Schedule of Remedial Works is the documentary bridge between an EICR finding and the rectification proof. Without it, the next inspector can't tell whether the original C2 was ever closed. The MWC documents the rectification work; the Schedule documents the closure of the EICR finding; together they're the audit trail.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "BS 7671:2018+A4:2026 changed the model forms. What's the most visible change on the Minor Works Certificate that the L3 apprentice needs to be aware of in 2026?",
    options: [
      "Six questions in order. (1) WHAT exactly happens? (in customer's own words). (2) WHEN does it happen — time of day, day of week, season, weather, after specific activity? (3) WHERE in the property — single room, multiple rooms, only when specific accessories used? (4) HOW LONG has it been happening — first noticed when, getting worse / better / same? (5) WHAT have you tried — reset breakers, unplug appliances, anything else? (6) WHAT CHANGED recently — new appliance, building work, leak, anything? The answers narrow the fault hypothesis from infinity to a small set. Most apprentices skip the interview; the senior who built habits saves an hour per call-out by spending 5 minutes on it.",
      "A4:2026 introduced AFDD (Arc Fault Detection Device) acknowledgement on the model forms — where AFDD is fitted, the form records the type, location and test result; where AFDD is not fitted (most existing installations), the form records an explicit 'AFDD not present' note rather than a blank field. A4 also tightened the supply earthing arrangement field (TN-S, TN-C-S / PNB, TT) and added explicit Protective Equipotential Bonding (PEB) verification fields. The MWC field for 'departures from BS 7671' is unchanged but now references A4:2026 by edition. Always check the latest model form from the IET — the field set has moved.",
      "Direct discrimination (s.13) is treating someone less favourably BECAUSE OF a protected characteristic — e.g. refusing to hire someone because they're female. Indirect discrimination (s.19) is applying a 'provision, criterion or practice' that looks neutral but puts people sharing a protected characteristic at a particular disadvantage and can't be objectively justified — e.g. requiring all apprentices to be over 6ft tall would indirectly discriminate against women on average. Both are unlawful.",
      "Test instruments drift over time — components age, shock and vibration cause small errors. A drifted instrument produces wrong test results that fail BS 7671 Chapter 61 verification. Annual calibration to a UKAS-traceable standard (with a calibration certificate) is the standard requirement. NICEIC, NAPIT and ELECSA all check for in-date calibration certificates at scheme audit; an out-of-date instrument used to demonstrate compliance invalidates the certificate it was used to produce.",
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 (effective from January 2026) is the current edition of BS 7671. The model forms in Appendix 6 changed visibly — AFDD acknowledgement, TN-C-S terminology shift to PNB (Protective Neutral Bonding) where appropriate, PEB verification fields. Using a pre-A4 form in 2026 is technically a non-current document and undermines the certificate's evidential weight.",
  },
  {
    id: 2,
    question:
      "Who are the 'relevant persons' that need to be informed of a rectification under AC 5.5 / ELTK07 5.6?",
    options: [
      "Hazardous-area work (ATEX zones, confined spaces, working at height in remote locations, work near live HV) carries higher risk than standard work. The 'lone working' precautions of Sub 1.2 are NOT enough — the risk profile demands two-person working as default. EAWR Reg 14(c) suitable precautions and HSE INDG73 + HSG85 + Confined Spaces Regulations 1997 + Work at Height Regulations 2005 all combine to require: documented permit-to-work, named authorised person, second person stationed within sight or comms, defined rescue procedure, dedicated emergency response. L3 apprentice never works hazardous-area solo; firm policy will explicitly forbid.",
      "No, for several reasons. The refrigerant work requires F-Gas certification (criminal offence to do without). The Building Regulations Part L compliance pathway requires installation by an MCS-certified installer for the customer to claim Smart Export Guarantee or similar incentives. The Boiler Upgrade Scheme grant requires MCS sign-off. Manufacturer warranties typically require certified installation. The MCS install pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule, commissioning records — all required for the system to perform as designed. DIY heat-pump install is unsafe and uneconomic.",
      "Five categories. (1) THE DUTY HOLDER — the customer for domestic, the employer for commercial, the landlord for rented. They get the certificate and the verbal hand-back. (2) THE ORIGINAL DESIGNER if it's their installation and a design change has been made (informational courtesy). (3) BUILDING CONTROL via the competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA) for notifiable work under Part P in England / Wales (slightly different in Scotland and Northern Ireland). (4) THE FIRM's INTERNAL JOB SYSTEM — job sheet update, photos, certificate copy filed. (5) THE NEXT PERIODIC INSPECTOR — implicit, served by leaving the certificate bundle (EICR + Schedule of Remedial Works + MWC) on file with the Duty Holder.",
      "An F-Gas log entry recording the refrigerant type, the charge weight added or removed, the date, and the F-Gas-certified engineer's name and certificate number. The engineer logs the entry in their own F-Gas register and provides a copy or extract to the customer / installer for the handover pack. Required at every refrigerant transaction (initial commissioning charge, top-up, recovery at decommissioning). Required by the F-Gas Regulations and central to demonstrating compliance during any future enforcement check.",
    ],
    correctAnswer: 2,
    explanation:
      "The 'relevant persons' framing is broader than just the paying customer. The Duty Holder, the regulator (via the scheme), the firm's internal records, and the next inspector all have a legitimate interest in the documentary trail. A rectification done with no documentary closure means the next inspector starts from scratch, the firm carries no proof of work, and the Duty Holder can't show insurance / sale / Building Regs compliance.",
  },
  {
    id: 3,
    question:
      "What's the difference between an EIC, an EICR and a Minor Works Certificate, and which one fits a typical fault rectification?",
    options: [
      "The electrical scope: dedicated final circuit from the consumer unit (typical 32 A radial on 6 mm cable for 5-7 kW unit, 40 A on 10 mm for 9-12 kW; Type C MCB or RCBO because of compressor inrush); local means of isolation outside near the outdoor unit (rotary isolator with weatherproof enclosure to BS EN 60947-3); controls cabling between outdoor unit, indoor controller, room thermostats, weather compensation sensor, zone valves, hot water cylinder thermostat; immersion heater wiring on the cylinder (programmable thermostat for legionella protection); bonding of the outdoor chassis where the manufacturer specifies or where it is an extraneous-conductive-part; certification on the EIC. The refrigerant pipework, charge weighing, leak test and commissioning of the refrigeration circuit are F-Gas certified personnel territory and outside the L3 electrical scope.",
      "Head is the vertical distance the water falls through the turbine — measured in metres. Head times flow rate (cubic metres per second) times gravity gives the available power. Different turbine technologies suit different head ranges: Pelton wheel (impulse turbine) for high head 50-300 m typical UK upland; Turgo (impulse) for medium-high head 30-200 m; Crossflow (impulse / reaction hybrid) for medium head 5-50 m; Kaplan or propeller (reaction) for low head under 10 m typical lowland river. Archimedes screw for very low head 1-5 m and high flow — popular on canal and river weir sites because it is fish-friendly. The MCS-certified hydro designer picks the turbine based on the head and flow at the specific site. The L3 electrician handles the grid connection regardless of the turbine choice.",
      "Run the customer through: how the system operates (continuous low-temperature heating, not on-off cycles like a gas boiler); how to set the room thermostat (set and forget at desired temperature, modest setbacks only); how to use the hot water schedule (typically once or twice a day); when to expect higher running costs (cold spells push up consumption); what the smart controls do; what the warning lights / app notifications mean; who to call for support (warranty contact, manufacturer support, installer aftercare); annual service requirement. Five-to-ten minutes that prevents months of customer confusion.",
      "Three separate certificate types. (1) EIC (Electrical Installation Certificate) — issued for new installations, new circuits or significant additions. Three signature panels: Designer, Constructor, Inspector. Records the design, the construction, the verification. (2) EICR (Electrical Installation Condition Report) — periodic inspection of an existing installation. Records observations and codes (C1 Danger Present, C2 Potentially Dangerous, C3 Improvement Recommended, FI Further Investigation). NOT a certificate of work done — a snapshot of the existing condition. (3) MWC (Minor Works Certificate) — alterations or additions that don't constitute a new circuit. Replacement of accessories, replacement of a protective device, addition of a single point. Most fault rectifications are MWC because the work is on an existing circuit, not a new one.",
    ],
    correctAnswer: 3,
    explanation:
      "Cert-type selection is a frequent L3 exam question and a frequent real-world mistake. EIC for new work; EICR for periodic check; MWC for like-for-like replacement and small additions. The wrong cert-type still records the work done, but it muddles the documentary trail and can confuse the next inspector.",
  },
  {
    id: 4,
    question:
      "Why does the Minor Works Certificate require test results on the AFFECTED circuit even when the work was a simple replacement?",
    options: [
      "BS 7671 Part 6 643 requires verification testing of any circuit that has been worked on, regardless of how minor the work. The MWC test panel records: continuity of CPC and protective conductors, insulation resistance, polarity, R1+R2, Zs, RCD trip-time at I&Delta;n where RCD-protected. The L3 apprentice carries out the tests with the Megger MFT1741 (or equivalent) and records the readings on the certificate. The point is — if the work has affected the circuit electrically (and replacing a protective device certainly has), verification is mandatory. 'It looks fine' is not a substitute for measured test results.",
      "Plain English is writing or speaking that the intended audience can understand on first reading or hearing. Common standards include short sentences (15-20 words on average), common words rather than technical jargon, active voice rather than passive, one idea per sentence, and a reading age around 9-11 (that's not patronising — most UK adults read most comfortably at that level for safety-critical information). The Plain English Campaign provides guidance and the Crystal Mark accreditation. For safety briefings, RAMS summaries, customer-facing letters and apprentice-training material, plain English isn't 'dumbing down' — it's 'comprehensible' under MHSWR 1999 Reg 10.",
      "Professional ethics code binding on IET members and Engineering Council registrants. Covers integrity and honesty, public safety and interest, working within professional competence limits, maintaining and developing competence through CPD, treating colleagues, clients and the public with respect, reporting concerns about safety or unethical conduct. Failure to comply can lead to disciplinary action and ultimately removal from membership/register.",
      "Self-Awareness: notice your own stress response to the urgent call and any defensive thoughts (\\\"my installation was fine\\\"). Self-Regulation: manage the stress, resist defensiveness, and stay calm and professional. Motivation: connect to your core purpose — client safety and quality of service. Empathy: genuinely understand the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s fear (they do not have technical knowledge; to them, buzzing = danger) and validate it. Social Skills: communicate reassuringly (\\\"I understand this is worrying — you are right to call\\\"), ask clear diagnostic questions, arrange a prompt visit, and follow up after resolution to rebuild confidence. Every domain contributes to the response",
    ],
    correctAnswer: 0,
    explanation:
      "BS 7671 Part 6 (Inspection and Testing) is the verification framework. Every certificate type — EIC, MWC, EICR — has a test panel because the measurement is the proof. Skipping the tests because the work was 'simple' undermines the certificate; the tests are not an optional polish, they are the substance of the verification.",
  },
  {
    id: 5,
    question:
      "What's the L3 apprentice's role in the certificate signing — Designer, Constructor, Inspector?",
    options: [
      "Three-part brief in plain English. (1) WHAT WAS HAPPENING — 'Your kitchen RCBO was tripping because there was a small earth leak from a damaged terminal in the ceiling rose'. (2) WHAT WE DID — 'We replaced the damaged terminal, re-tested the circuit, and confirmed the leak is gone'. (3) WHAT TO WATCH FOR — 'If the breaker trips again in the next month, give us a call straight away — that would suggest a related issue we should investigate'. Plus a written summary on the job sheet / certificate. The customer leaves understanding the fault, the fix, and what to do if it returns.",
      "It depends on competence and supervision. An L3 apprentice typically signs the Constructor panel under supervision (the work was done under the supervisor's oversight). The Inspector panel requires verification competence — the supervisor or a JIB Approved Electrician usually signs that for an apprentice's work. The Designer panel requires design competence, normally a fully-qualified electrician or engineer, not an apprentice. The C&G 2391 / 2394 / 2395 inspection-and-testing qualifications are the typical step that lets a qualified electrician sign Inspector. EAWR Reg 16 (competence) is the underlying duty — sign only what you are competent to sign.",
      "Standard Section 514 identification — the heat pump final circuit at the consumer unit clearly identified; the local isolator labelled and the location of the upstream RCBO referenced; any controls cabling identified at termination points. Where Section 753 applies (e.g. integrated trim heaters) the relevant section signage applies. The MCS-certified designer's commissioning paperwork includes a SCOP estimate, the system design parameters, and a customer-facing handover document. The label is for the customer (so they know which isolator does what), the next electrician (so they understand the install years later), and the service engineer (so they can isolate safely).",
      "The supervision is appropriate when the supervisor is themselves competent for the task, has direct visibility of the work AND the trainee, can intervene before a danger materialises, and the degree of supervision is matched to BOTH the task danger AND the trainee's experience level. A second-year on socket extensions is light supervision; a first-year on a CU change is direct, hands-on supervision throughout. Token oversight from elsewhere on site doesn't meet the regulation.",
    ],
    correctAnswer: 1,
    explanation:
      "Signature authority is a competence question, not a courtesy. Signing a panel you don't have the competence for is an EAWR Reg 16 breach and undermines the certificate's evidential weight if challenged. The L3 apprentice's typical role is Constructor under supervision; Designer and Inspector come after the apprentice qualifies and undertakes the inspection-and-testing qualifications.",
  },
  {
    id: 6,
    question:
      "A landlord has had an EICR with a C1 (Danger Present) finding on a kitchen socket — burnt back-box, exposed live conductors. You're sent to rectify. What's the documentary urgency?",
    options: [
      "The compressor in a heat pump produces a substantial inrush current at start-up — typically 5-10x the steady-state running current for a fraction of a second. A Type B MCB (3-5x trip threshold) can nuisance-trip on this inrush; a Type C MCB (5-10x trip threshold) is more tolerant and is the standard recommendation. Modern inverter-driven heat pumps with soft-start typically have lower inrush than older fixed-speed units, but Type C is still the typical specification. The MCS-certified designer specifies the protective device per the manufacturer's installation manual.",
      "Three criteria. (1) Safety — dead tests before live, low-energy before high-energy. (2) Discrimination — choose the test whose result will most narrow the candidate hypotheses (e.g. an IR test that distinguishes 'short circuit' from 'open circuit' is more useful than a continuity test that only distinguishes one). (3) Cost — quick tests before slow tests, free tests before tests that cost the customer (e.g. visual inspection before opening the CU). The order is safety first, then discrimination, then cost. Most efficient diagnostic path is shortest sequence of tests that distinguishes between the surviving hypotheses.",
      "C1 is the most serious EICR code — Danger Present, immediate action required. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (and equivalent regulations in Wales / Scotland / NI) require landlords to act on C1 findings within 28 days, and IMMEDIATELY where the danger is live-and-present. The rectification, certificate (MWC), Schedule of Remedial Works closing the C1, and confirmation back to the landlord need to be turned around within the regulation timeline. A landlord who fails to act on a C1 within 28 days faces a fine of up to £30,000 per breach. The L3 apprentice's job is to do the work, document it, and ensure the landlord has the proof of closure to file.",
      "Self-Awareness: notice your own stress response to the urgent call and any defensive thoughts (\\\\\\\"my installation was fine\\\\\\\"). Self-Regulation: manage the stress, resist defensiveness, and stay calm and professional. Motivation: connect to your core purpose — client safety and quality of service. Empathy: genuinely understand the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s fear (they do not have technical knowledge; to them, buzzing = danger) and validate it. Social Skills: communicate reassuringly (\\\\\\\"I understand this is worrying — you are right to call\\\\\\\"), ask clear diagnostic questions, arrange a prompt visit, and follow up after resolution to rebuild confidence. Every domain contributes to the response",
    ],
    correctAnswer: 2,
    explanation:
      "C1 findings carry a legal timeline under the Private Rented Sector Regulations 2020. The rectification must be done and documented within 28 days for routine C1, immediately for live-danger C1. The MWC + Schedule of Remedial Works is the landlord's proof of compliance and their defence against the £30,000 per-breach fine. Speed of documentary turnaround matters as much as speed of physical rectification.",
  },
  {
    id: 7,
    question:
      "What's the practical workflow for issuing a Minor Works Certificate on site in 2026?",
    options: [
      "Classic capacitor failure. The run capacitor on a single-phase induction motor provides the phase shift between the run winding and the start winding that creates the rotating field needed to start the motor. If the capacitor degrades (electrolytic dries out, paper-and-foil constructions go open) the motor energises but can't start — it draws stalled-rotor current, hums, and trips on thermal overload after 10&ndash;30 seconds. Diagnostic: ISOLATE; PROVE DEAD; DISCHARGE the cap through a 5&ndash;10 k&Omega; resistor (live-storage hazard); MEASURE the cap with the MFT capacitance function (should read within ±10% of marked value, e.g. 16 µF reads 14.4&ndash;17.6 µF; failed caps read near zero or open). CORRECTION: replace the cap with same μF value, same voltage rating (typically 250 V AC), same physical size to fit the bracket. Verify the motor starts immediately on energise.",
      "Anti-islanding requires a grid-connected generator (PV inverter, wind inverter, battery export inverter, micro-CHP, micro-hydro) to disconnect when the public distribution grid fails — even though it might still have local source energy and could in principle continue exporting. The safety reason: if the inverter continued exporting into a network the DNO had isolated for fault repair, line workers could be exposed to live conductors they thought were dead. ENA G98/G99 specifies the loss-of-mains detection settings (vector shift, ROCOF, voltage and frequency limits) and the maximum disconnection time.",
      "BUS provides £7,500 for ASHP / GSHP and £5,000 for biomass — but the biomass strand is restricted to properties that are not connected to the gas grid AND in defined rural categories AND meet Ecodesign emission limits. The intent: heat pumps are the policy default, biomass is a fallback for properties where heat pumps are not viable (very high heat load, no electrical capacity for the heat pump, off-gas-grid rural) and where the air-quality impact is minimal (rural distance from neighbours, Defra-approved Ecodesign appliance). For a typical suburban property the BUS biomass strand is closed. For a rural off-gas-grid farmhouse with a 30 kW heat load, BUS biomass is sometimes the only viable grant route. The L3 electrician sees biomass overwhelmingly in rural settings.",
      "Most firms now use digital MWC apps — Elec-Mate's MWC builder, NICEIC Online, ElectricalCertifyPro, iCertifi. The workflow: (1) Open the app on the van laptop or phone. (2) Pull customer + installation details from the existing job (or scan the previous EIC's QR code). (3) Fill in the work-done description, the test results panel (entered as you measure with the MFT), Designer / Constructor / Inspector signatures (digital signature pad). (4) Customer signs receipt on the device. (5) PDF emailed to the customer; copy filed in the firm's job system; QR code printed for the DB sticker if the firm uses them. The whole process takes 5&ndash;10 minutes if the data is pre-loaded. Paper certificates are still valid but increasingly rare.",
    ],
    correctAnswer: 3,
    explanation:
      "Digital certificate workflows are now the norm, supported by NICEIC, NAPIT, ELECSA and the Elec-Mate platform. The L3 apprentice should be familiar with at least one digital cert app and the manual paper-MWC route as a fallback. The digital workflow saves time, reduces transcription error, and enables instant customer hand-back via email.",
  },
  {
    id: 8,
    question:
      "If the customer challenges the certificate at a later date — saying 'the fault came back, your rectification was wrong' — what does the documentary record protect?",
    options: [
      "Three layers of protection. (1) The MWC test results show the circuit was electrically sound at the time of hand-back — measured Zs, IR, R1+R2, RCD trip-time all within BS 7671 limits. If the fault has since recurred, the cause is post-rectification (new fault, customer modification, environmental change, latent equipment failure) not the rectification itself. (2) The signed Designer / Constructor / Inspector panels evidence competence and the firm's QA process. (3) The customer's signed receipt evidences hand-back acceptance. Without the certificate, the firm has no defence to a 'your rectification was wrong' claim and may have to redo the work free of charge or face legal action. The certificate is insurance for the firm and proof of competence for the customer.",
      "CALIBRATION — measurement of the instrument's response against reference standards, with results documented in a certificate. The instrument is unchanged; you get a certificate that says 'at the time of test, this instrument read X when measuring Y'. ADJUSTMENT — physical or software adjustment of the instrument to bring it into specification. Some calibration labs do both (calibrate, then adjust if out of spec, then re-calibrate); some do calibration-only (and you make the decision whether to adjust based on the report). The calibration certificate normally states whether adjustment was performed and the as-found vs as-left readings.",
      "Circuits supplying heating units shall have additional protection by the use of RCDs in accordance with the characteristics specified in Regulation 415.1.1. Where a resistive fault may cause a fire, for example for overhead heating with heating film elements, the rated residual operating current shall not exceed 30 mA. All underfloor heating installations shall have additional protection by an RCD rated at 30 mA irrespective of location. In areas where occupants are not expected to be completely wet, a circuit supplying heating equipment of Class II construction (or equivalent insulation) shall be provided with additional protection by the use of an RCD with a rated residual operating current not exceeding 30 mA.",
      "The apprentice typically contributes the cable run from the consumer unit to the charge-point location (often a 6 mm or 10 mm meter-tails route through a wall), the supplementary bonding (where required), the supply-side termination at the consumer unit including any new RCBO or AFDD, the CT clamp installation around the supply tail, the labelling, and assists with first-fix mounting of the unit enclosure. The MCS-certified person handles the design, the OZEV-compliant unit selection, the commissioning and the regulatory paperwork (including the DNO notification under ENA G98 if export is enabled, and registration with OZEV for any grant claim).",
    ],
    correctAnswer: 0,
    explanation:
      "The certificate is the evidential record that the work was done correctly to BS 7671 at the time of hand-back. It protects the firm against later complaints, supports the customer's own insurance / sale / Building Regs records, and gives the next inspector a baseline to work from. The 5&ndash;10 minute investment in completing the certificate properly is the firm's primary protection against post-work disputes.",
  },
];

const faqs = [
  {
    question: "When does an EICR need to be issued instead of a Minor Works Certificate?",
    answer:
      "EICR is the periodic inspection report, not a certificate of new work. It records the condition of an existing installation at a point in time, with coded observations (C1 Danger Present, C2 Potentially Dangerous, C3 Improvement Recommended, FI Further Investigation). A rectification job is not an EICR — it's a Minor Works (small scope) or EIC (new circuit / significant addition). The EICR comes around on a periodic cycle (5 years domestic owner-occupied, 5 years rented under Private Rented Sector Regulations 2020, 1 year commercial typical). If a rectification is part of closing an EICR finding, the MWC + Schedule of Remedial Works references back to the EICR but does not replace it.",
  },
  {
    question: "What does BS 7671 A4:2026 mean and do I need to use new forms?",
    answer:
      "A4:2026 is Amendment 4 to BS 7671:2018, effective January 2026. It updates several technical sections (AFDD provisions in Section 421, TN-C-S terminology shift to PNB where appropriate, supplementary requirements in Section 722 for EV charging, updated bonding requirements) and updates the model forms in Appendix 6. From January 2026, certificates should reference 'BS 7671:2018+A4:2026' in the edition field, and the model forms should be the A4 versions with the AFDD acknowledgement and PEB verification fields. Pre-A4 forms are still mechanically valid but technically out-of-date and should be replaced as soon as the firm's stock allows.",
  },
  {
    question: "What's a Schedule of Remedial Works and when do I issue one?",
    answer:
      "Schedule of Remedial Works (sometimes 'Remedial Action Notice') is the documentary bridge between an EICR finding and the rectification work that closes it. It lists each coded item from the EICR, the action taken, the date, the new test result, and the contractor signature. It accompanies the Minor Works Certificate (or EIC) for the actual rectification work. Together the EICR + Schedule + MWC form the audit bundle the Duty Holder retains. The Schedule is not a replacement for the cert — both are needed, the cert proves the work was done correctly, the Schedule proves it closed the EICR finding.",
  },
  {
    question: "Is consumer unit replacement always notifiable under Part P?",
    answer:
      "Yes — full consumer unit replacement is on the list of notifiable work in Part P (Approved Document P, England and Wales). The contractor must be a registered competent person under one of the schemes (NICEIC, NAPIT, ELECSA, STROMA, NETWORKING, BSI Kitemark) and notify Building Control via the scheme's online portal within 30 days. Notification fee is normally bundled with the scheme membership; the customer gets a Building Regulations Compliance Certificate from the scheme that confirms the work meets Part P. If you replace just an MCB or RCBO inside the existing CU (not the whole unit), that's NOT notifiable — it's like-for-like maintenance.",
  },
  {
    question: "Can the customer refuse to sign the certificate?",
    answer:
      "The customer's signature on the MWC / EIC is a receipt of hand-back, not approval of the work itself. They're acknowledging they've received the certificate and the work has been demonstrated. If a customer refuses to sign, the certificate is still valid — the contractor should note 'customer declined to sign on hand-back' on the certificate and email a copy to the customer's recorded email address. The contractor's signed Designer / Constructor / Inspector panels are the evidential weight of the certificate; the customer's signature is a record of receipt only. Most refusals come from misunderstanding ('I don't want to sign anything until I've checked the work') and a 30-second explanation of the receipt-vs-approval distinction usually resolves them.",
  },
  {
    question: "How long does the firm need to keep certificate copies?",
    answer:
      "Recommended retention is the lifetime of the installation (potentially 25&ndash;40 years for domestic). Practical minimum under Companies Act 2006 (statutory records) and HMRC VAT records is six to seven years. Professional indemnity insurance often requires longer retention (commonly the policy lifetime plus a tail for run-off claims). For Part P notifiable work, the competent-person scheme retains a copy via the notification record. The L3 apprentice's job is to ensure every certificate gets filed in the firm's job system; the firm's retention policy then handles the period. Lost certificates can be reissued by the original contractor if their records are intact, otherwise the customer needs a new EICR.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 5"
            title="Reporting + handover documentation"
            description="Closing the documentary trail — Minor Works Certificate, EIC, EICR + Schedule of Remedial Works, Building Control under Part P, customer warranty, A4:2026 form changes. The certificate is the firm's protection and the customer's proof; the L3 apprentice's job is to make sure it gets done right."
            tone="emerald"
          />

          <TLDR
            points={[
              "Certificate-type selection is part of L3 competence — Minor Works Certificate for like-for-like replacement, EIC for new circuits, EICR for periodic inspection.",
              "BS 7671 A4:2026 model forms include AFDD acknowledgement, PNB terminology, PEB verification fields — use the current forms, not pre-A4 stock.",
              "Part P (Approved Document P) makes new circuits, CU replacements, and special-location work notifiable to Building Control via the firm's competent-person scheme.",
              "Schedule of Remedial Works closes EICR findings — the documentary bridge between the original report and the rectification certificate.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Select the correct certificate type for a given rectification — MWC for like-for-like, EIC for new circuit, EICR for periodic inspection.",
              "Apply BS 7671 A4:2026 model forms with AFDD acknowledgement, PNB terminology and PEB verification fields.",
              "Apply Part P (Approved Document P) notifiability tests — new circuits, CU replacements and special locations notifiable; like-for-like replacement not notifiable.",
              "Issue a Schedule of Remedial Works that closes an EICR-coded finding and references the rectification certificate.",
              "Identify the relevant persons under AC 5.5 / ELTK07 5.6 — Duty Holder, Building Control, internal records, next inspector.",
              "Understand the legal timeline for landlord rectification under Electrical Safety Standards in the Private Rented Sector Regulations 2020 — 28 days for C1/C2, immediate for live danger.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Choosing the right certificate type</ContentEyebrow>

          <ConceptBlock
            title="EIC, EICR, MWC — three different documents for three different purposes"
            plainEnglish="The wrong certificate type still records the work but muddles the documentary trail. The L3 apprentice's first decision on closing a rectification is which form to use — and the choice depends on what was done, not what was found."
            onSite="Most fault rectifications are Minor Works Certificate jobs because the work is on an existing circuit and is like-for-like replacement. Confusion typically arises when a rectification grows in scope mid-job — a kitchen socket replacement that turns into a new circuit because the original ring was unsafe. The cert-type changes from MWC to EIC at the moment the work crosses the new-circuit boundary."
          >
            <p>The three certificate types in scope:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIC (Electrical Installation Certificate)</strong> — new installations, new circuits, significant additions. Three signature panels (Designer, Constructor, Inspector). Test panel for the new work.</li>
              <li><strong>EICR (Electrical Installation Condition Report)</strong> — periodic inspection of an existing installation. Coded observations (C1, C2, C3, FI). Snapshot of condition, NOT a certificate of work done.</li>
              <li><strong>MWC (Minor Works Certificate)</strong> — alterations or additions that do not constitute a new circuit. Replacement of accessories or protective devices, addition of a single point. Most rectifications.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulations 644.1.1 (Defects to be corrected before Certificate issued) and 651.4 (Recording defects in a report)"
            clause={
              <>
                "644.1.1 For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued. 651.4 Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                Reg 644.1.1 is the rectification duty &mdash; defects revealed during inspection and testing must be corrected before the Certificate is issued. Reg 651.4 is the reporting duty &mdash; damage, deterioration, defects or dangerous conditions get recorded in a report. Together they bracket the post-verification work: rectify what you can before issuing the cert; record what you can&apos;t (or what was outside scope) on the report. For minor works the MWC is the form; the test schedules accompany it. Without the certificate and any associated report, the verification under BS 7671 has not been documentarily closed.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Regulations 644.1.1 and (where applicable) 651.4."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Part P notifiability — what triggers Building Control</ContentEyebrow>

          <ConceptBlock
            title="When the work needs Building Control notification (and when it does not)"
            plainEnglish="Part P (Building Regulations Approved Document P, England and Wales) sets out which electrical work in dwellings is notifiable to Building Control. The L3 apprentice's job is to know the trigger — and to make sure notifiable work goes through the firm's competent-person scheme. Doing notifiable work without notification is a Building Regulations breach and creates problems at house sale, insurance claim or regulatory inspection."
            onSite="The competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA) handles the notification on behalf of the contractor — typically via an online portal within 30 days of the work. The scheme issues a Building Regulations Compliance Certificate to the customer. The contractor pays the scheme membership fee annually; per-job notification is normally included or low cost."
          >
            <p>Part P trigger summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>NEW CIRCUITS in dwellings</strong> — notifiable. Includes a new ring final, new lighting circuit, new shower circuit, new EV charger circuit.</li>
              <li><strong>CONSUMER UNIT REPLACEMENTS</strong> — notifiable.</li>
              <li><strong>SPECIAL LOCATIONS work</strong> — notifiable. Bathroom Zone 0/1/2, swimming pools, saunas, agricultural locations.</li>
              <li><strong>LIKE-FOR-LIKE replacement</strong> of existing accessories or protective devices on existing circuits — NOT notifiable. Maintenance, not new work.</li>
              <li><strong>ADDITIONS to existing circuits</strong> outside special locations — NOT normally notifiable (e.g. adding a single socket to an existing ring).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>Closing an EICR finding — the Schedule of Remedial Works</ContentEyebrow>

          <ConceptBlock
            title="The documentary bridge between an EICR observation and a closed rectification"
            onSite="When a fault rectification is the closure action for an EICR-coded item, the documentary trail is — original EICR (records the C1/C2/C3/FI), Schedule of Remedial Works (lists the closure action and the test result), Minor Works Certificate (formal cert of the rectification work). The Duty Holder retains all three together. The next periodic inspector picks up the bundle and can see exactly what was found, what was done and when."
          >
            <p>The Schedule of Remedial Works contents:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Original EICR reference</strong> — date, certificate number, inspector.</li>
              <li><strong>Each coded item closed</strong> — the original observation, the action taken, the new test result.</li>
              <li><strong>Date of rectification</strong> — for landlord work this also evidences compliance with the Private Rented Sector Regulations 2020 timeline.</li>
              <li><strong>Contractor signature</strong> — Constructor or Inspector competence as appropriate.</li>
              <li><strong>Cross-reference to the MWC / EIC</strong> for the rectification work itself.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — Reg 3"
            clause={
              <>
                "A private landlord who grants or intends to grant a specified tenancy must &mdash; (a) ensure that the electrical safety standards are met during any period when the residential premises are occupied under a specified tenancy; (b) ensure every electrical installation in the residential premises is inspected and tested at regular intervals by a qualified person; AND (c) ensure the first inspection and testing is carried out before the tenancy commences, in relation to a new specified tenancy, OR by 1st April 2021, in relation to an existing specified tenancy."
              </>
            }
            meaning={
              <>
                Landlords must have an EICR every five years (or sooner if the previous EICR specified an earlier re-inspection date), and must rectify any C1, C2 or FI finding within 28 days (or sooner if the report specifies). Failure carries a fine of up to &pound;30,000 per breach. The Schedule of Remedial Works + Minor Works Certificate is the landlord's proof of compliance and their defence against the fine. For an L3 apprentice rectifying landlord work, documentary turnaround speed matters as much as physical rectification speed.
              </>
            }
            cite="Source: Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, Reg 3."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Schedule of Test Results behind the certificate</ContentEyebrow>

          <ConceptBlock
            title="The certificate is the headline; the schedule is the evidence"
            plainEnglish="An EIC or MEIWC without a Schedule of Test Results is half a certificate. The schedule captures the readings that justify the &lsquo;satisfactory&rsquo; declaration and is what auditors and competent-person scheme assessors actually inspect."
            onSite="A4:2026 changed several Schedule of Test Results columns &mdash; AFDD column on the schedule, RCD trip-time entries reflect the single AC test (no 5&times;I&Delta;n column), TN-C-S identification now includes PNB. Use up-to-date model forms (2026 issue) rather than older A2:2022 templates."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Continuity of conductors</strong> &mdash; R1+R2 or end-to-end ring values per circuit.</li>
              <li><strong>Insulation resistance</strong> &mdash; L&ndash;L, L&ndash;N, L&ndash;E, N&ndash;E values per circuit; record the test voltage used (250&nbsp;V or 500&nbsp;V).</li>
              <li><strong>Polarity</strong> &mdash; tick column, with note where polarity verification was by other means than direct test.</li>
              <li><strong>Earth fault loop impedance</strong> &mdash; Zs per circuit, compared against the 80% Table 41.3 limit (32&nbsp;A B-curve = 1.37&nbsp;&Omega; on 230&nbsp;V under A4:2026).</li>
              <li><strong>RCD operation</strong> &mdash; trip current and trip time at I&Delta;n, single AC test under A4:2026.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Photographs, sketches and the wider record pack</ContentEyebrow>

          <ConceptBlock
            title="What goes alongside the certificate at handover"
            plainEnglish="The certificate is the formal piece of paper. The wider record pack is what makes the work defensible six months later when a question comes up &mdash; or six years later when the property changes hands."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Job sheet</strong> &mdash; chronological narrative of what was found, what was done, who authorised what.</li>
              <li><strong>Photographs</strong> &mdash; before / during / after at the work point and at the CU. Wide and close, time-stamped on the phone.</li>
              <li><strong>Sketches</strong> &mdash; cable routes, depth-from-surface, identification of any 522.6.204 covering used.</li>
              <li><strong>Customer correspondence</strong> &mdash; signed quote, signed advisory if a recommended option was declined, signed sign-off at handover.</li>
              <li><strong>Manufacturer documentation</strong> &mdash; data sheets for replacement devices retained on the job record, particularly for AFDDs and DC-capable RCDs.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Digital certificate platforms — NICEIC Online, Easycert and the audit trail"
            plainEnglish="Most rectification work in 2026 produces digital certificates rather than paper. NICEIC Online, NAPIT Online, Easycert, ElectricalCertificate.co.uk and similar platforms produce signed PDFs, store the certificate against the property's address, push notifiable work to Building Control through the competent-person scheme, and email the customer copy. The platform is the audit trail — retrieving a certificate years later relies on the platform's storage, not on the contractor's filing cabinet."
            onSite="Use the platform's BS 7671 A4:2026 model forms; older form templates may still be available in the dropdown but should not be used for current work. Customer details, certificate number, test data and signatures all live in the platform. The contractor signs digitally (typed name plus a credential check); some schemes also support drawn signature on tablet. The customer receives a PDF copy by email; the original sits in the platform indefinitely."
          >
            <p>
              What the digital platform handles automatically:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Building Control notification</strong> — for notifiable
                Part P work, the scheme submits the BCCC (Building Control
                Compliance Certificate) on the customer's behalf within 30 days.
              </li>
              <li>
                <strong>Customer copy delivery</strong> — emailed PDF to the
                address on file. Customer can download replacements at any
                point.
              </li>
              <li>
                <strong>Property history</strong> — addresses with multiple
                certificates accumulate a property-level history that
                conveyancing solicitors and future inspectors can pull.
              </li>
              <li>
                <strong>Scheme assessor sample</strong> — the competent-person
                scheme assessor pulls a random sample of certificates each
                quarter for the firm's QA review.
              </li>
              <li>
                <strong>Certificate retrieval</strong> — replacement copies for
                lost paper certificates available on demand from the platform.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Verbal handover — confirming with the customer at the doorstep"
            plainEnglish="The certificate is the documentary record; the verbal handover is what the customer remembers. Two minutes at the front door — explain what was done, where the new device sits, what the test results mean, what the certificate will arrive as. Customers who feel informed do not call back with anxious questions a week later. Customers who feel rushed call back, write reviews, or escalate to the firm's complaints team."
            onSite="Walk the customer to the consumer unit, point out the new device, demonstrate that the relevant circuit works (kitchen socket if the work was on the kitchen ring; lights if the work was on the lighting). Explain the test buttons (RCD test button, AFDD test button if fitted) and how often to press them (typically quarterly). Hand over the email copy of the certificate; explain that the paper copy will follow if the customer requested one. Confirm any aftercare (return visit, manufacturer warranty registration). Two minutes well spent."
          >
            <p>
              Verbal handover talking points after a rectification visit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What was found and what was done</strong> — plain English,
                no jargon. "The RCD on your kitchen ring had failed; I've fitted
                a new one and tested the circuit; everything's safe and working."
              </li>
              <li>
                <strong>Test results in plain terms</strong> — "the RCD trips in
                under 30 milliseconds at fault current; that's well within the
                BS 7671 limit."
              </li>
              <li>
                <strong>Test button demonstration</strong> — show how to press
                the test button; how often (quarterly is typical); what to do if
                it does not trip.
              </li>
              <li>
                <strong>Certificate delivery</strong> — "the certificate will
                arrive by email today; the paper copy posts within five working
                days if you wanted one."
              </li>
              <li>
                <strong>Aftercare contact</strong> — leave a card; explain when
                to call back (any odd behaviour, repeated trips, smell of
                burning).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Internal job sheet update — closing the loop with the office"
            plainEnglish="Beyond the certificate, the firm's internal record needs updating. Job sheet status moves from open to complete; materials used go onto the invoice; time spent updates the productivity record; any out-of-scope work or upsell opportunity is flagged for the office to follow up. The L3 apprentice who closes the office loop cleanly is the apprentice the office assigns the next job to."
            onSite="Most firms use a CRM or job-management platform (ServiceM8, Tradify, Powered Now, Joblogic, Simpro). The phone app captures the job-complete status, the materials used (scanned barcodes or selected from the catalogue), photos of the work, the customer signature on the visit-complete form. The office sees the update in real time; the invoice goes out same day; the customer's next periodic inspection date goes into the diary. The certificate from the certification platform is attached to the customer record alongside the invoice."
          >
            <p>
              The internal record items that often get missed:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Materials used</strong> — every device, every metre of
                cable, every fitting. Drives the invoice and the stock count.
              </li>
              <li>
                <strong>Time on site</strong> — start and finish stamped;
                drives the labour line on the invoice.
              </li>
              <li>
                <strong>Photos</strong> — before, during, after; goes onto the
                customer record and protects the firm if a question arises
                later.
              </li>
              <li>
                <strong>Out-of-scope findings</strong> — the dodgy lighting
                circuit you noticed but were not paid to fix; the missing
                bonding at the gas meter; the plastic CU; flagged for the office
                to follow up with the customer.
              </li>
              <li>
                <strong>Upsell opportunities</strong> — surge protection,
                AFDDs, EV charger, smart controls, periodic inspection due in
                six months. The office decides whether to offer.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.4"
            clause={
              <>
                "Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                Whatever you discovered alongside the headline fault &mdash; the borderline IR reading on a different circuit, the missing label at the MET, the two breakers in the wrong slots &mdash; goes on the report. Reg 651.4 is the regulation that converts &ldquo;noticed it but it wasn&apos;t my call-out&rdquo; into &ldquo;recorded it on the customer&apos;s record&rdquo;.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Issuing an EIC for a like-for-like RCBO replacement"
            whatHappens={
              <>
                Apprentice has replaced a failed Hager 32&nbsp;A RCBO. Defaults to the EIC form
                because that's the one they're most familiar with. The EIC says "new installation /
                new circuit" at the top; the work was neither. The customer's Duty Holder records
                now contain a misleading certificate &mdash; the next inspector reading the EIC will
                assume a new circuit was added on that date and may look for evidence of the new
                circuit on the installation. Documentary noise that's avoidable.
              </>
            }
            doInstead={
              <>
                Like-for-like replacement on an existing circuit is a Minor Works Certificate every
                time. The MWC has its own field set, its own test panel, its own evidential weight.
                Choose the right form at the start of the cert build.
              </>
            }
          />

          <CommonMistake
            title="Skipping the Schedule of Remedial Works after closing an EICR finding"
            whatHappens={
              <>
                Apprentice rectifies a C2 finding from a recent EICR &mdash; replaces a failing RCD on
                the kitchen ring. Issues an MWC for the rectification. Doesn't issue a Schedule of
                Remedial Works back-referencing the EICR. Six months later the landlord faces a
                routine compliance check from the local authority's housing standards team and has
                the EICR (showing a C2) and the MWC (showing a rectification) but no documentary
                bridge between them. The C2 looks open; the landlord faces a notice of intent to
                fine.
              </>
            }
            doInstead={
              <>
                Always issue a Schedule of Remedial Works alongside the MWC when the rectification
                closes an EICR finding. Reference the original EICR cert number, list the coded
                item, state the action taken, attach the test result. Five extra minutes; eliminates
                the audit-trail gap.
              </>
            }
          />

          <Scenario
            title="Closing an EICR C1 on a landlord property"
            situation={
              <>
                A landlord's EICR (issued by another firm last week) has a C1 (Danger Present)
                against a kitchen socket &mdash; burnt MK Logic Plus K2747 back-box, exposed live
                conductors due to a long-running loose connection. The landlord has 28 days under
                the Private Rented Sector Regulations 2020 to rectify; their letting agent has
                booked you in for tomorrow. You arrive with a new MK socket, a new back-box, the
                Megger MFT1741 and an MWC pad on the laptop.
              </>
            }
            whatToDo={
              <>
                (1) Isolate at the Wylex DB; lock-off; prove dead at the socket with the Martindale
                VI-13800. (2) Remove the burnt socket and back-box; check the cable terminations
                for heat damage upstream &mdash; if the ring conductors are heat-damaged beyond the
                back-box, the rectification grows scope and you escalate to the supervisor. In this
                case the cable is undamaged. (3) Fit the new MK back-box, terminate the ring
                conductors with proper torque (1.2&nbsp;Nm typical for 2.5&nbsp;mm&sup2;), fit the
                new MK Logic Plus front. (4) Verify with the MFT1741 &mdash; continuity of CPC,
                IR at 500&nbsp;V, polarity, R1+R2, Zs, RCD trip-time. All within BS 7671 limits.
                (5) Issue the Minor Works Certificate via the laptop app &mdash; pre-load customer
                details, fill the work-done description, enter test results, sign Designer /
                Constructor / Inspector (Inspector panel under supervisor remote sign-off as needed
                for an apprentice). (6) Issue the Schedule of Remedial Works back-referencing the
                EICR cert number, the C1 observation, the action taken, the new test result, the
                date. (7) Email the bundle (MWC + Schedule) to the letting agent and the landlord;
                file copy in the firm's job system; verbal hand-back to the tenant on the way out.
                The landlord now has documentary proof of compliance within the 28-day window.
              </>
            }
            whyItMatters={
              <>
                C1 closure on landlord work is the documentary scenario where speed and accuracy
                BOTH matter. The 28-day timeline is legal, not advisory; the documentary bundle
                (MWC + Schedule + EICR) is the landlord's defence against the &pound;30,000
                per-breach fine; the next periodic inspector will pick up the bundle and rely on
                it. The L3 apprentice's role is to do the work, document it correctly, and turn it
                around in the time available. The case is the canonical illustration of why the
                certificate is not optional polish &mdash; it's the substance of compliance.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Minor Works Certificate for like-for-like replacement; EIC for new circuit / significant addition; EICR for periodic inspection.",
              "BS 7671 A4:2026 model forms include AFDD acknowledgement, PNB terminology, PEB verification fields — use current forms.",
              "Part P notifiable: new circuits, CU replacements, special-location work. Routed via competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA) within 30 days.",
              "Schedule of Remedial Works closes an EICR finding — the documentary bridge between EICR and the rectification MWC / EIC.",
              "Landlord work under Private Rented Sector Regulations 2020 — C1 / C2 rectification within 28 days; £30,000 per breach for failure.",
              "BS 7671 643 verification testing is mandatory on any worked-on circuit — the test panel on the cert is the substance, not the polish.",
              "Signature competence: Constructor under supervision for an apprentice; Designer and Inspector require fully-qualified status.",
              "Digital cert apps (Elec-Mate MWC builder, NICEIC Online, ElectricalCertifyPro) take 5–10 minutes; instant customer hand-back via email.",
            ]}
          />

          <Quiz title="Reporting + handover documentation — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section5-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.4 Safe disposal + leave area safe</div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Section 6 — Apply rectification techniques</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
