/**
 * Module 2 · Section 4 · Subsection 4 — BS 7671 Section 722 EV + Open-PEN + Reg 722.411.4
 * Maps to C&G 2365-03 / Unit 301 / LO2 / AC 2.1
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and non-statutory
 *             requirements for the installation and maintenance of environmental technology
 *             systems"
 * Layered: 2357 Unit 312 ELTP02 / AC 3.1 (provide information on operational requirements
 * and benefits of environmental technology systems) and 2357 Unit 602 ELTK02 / AC 3.3
 * (Local Authority Building Control requirements which apply to the installation of
 * environmental technology systems).
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
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Section 722 EV charging, Open-PEN and Reg 722.411.4 (4.4) | Level 3 Module 2.4.4 | Elec-Mate';
const DESCRIPTION =
  'A regulatory deep dive into electric vehicle charging — BS 7671:2018+A4:2026 Section 722, the open-PEN problem on PME (TN-C-S) supplies for outdoor charge points, the four compliance routes of Reg 722.411.4, AFDD exemption per Reg 722.421.1.7.201, and the documentation chain for an MCS-track EV charger install.';

const checks = [
  {
    id: 'l3-m2-s4-sub4-pme-prohibition',
    question:
      "A customer has a TN-C-S (PME) domestic supply and wants a 7 kW EV charger fitted on the outside wall of the house, with a tethered cable used to charge the car parked on the driveway. Can you simply use the property's PME earthing facility for the charge point's protective conductor contact?",
    options: [
      "Not directly. Reg 722.411.4 applies to TN systems and addresses requirements where a PME earthing facility would otherwise be used as the means of earthing for the protective conductor contact(s) of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors. It sets alternative methods (b) to (e) that shall be used instead of using the PME facility directly. The four routes are an installation earth electrode, a device that disconnects on out-of-window utilisation voltage between line and neutral within 5 s, an alternative device or equivalent functionality within charging equipment that electrically disconnects the vehicle from the live conductors and from protective earth, or other compliant arrangements.",
      "Adding a battery changes the maximum potential export from the property and changes the inverter behaviour as seen from the network. ENA G98 (single-phase up to 16 A per phase) and G99 (above 16 A or three-phase) require the combined system to be notified. For a connect-and-notify install (G98) the installer notifies the DNO within 28 days of energising. For G99 the installer applies in advance and the DNO returns connection conditions before energising. The MCS-certified installer handles the paperwork; the apprentice should understand that the existing PV notification does not cover the added storage.",
      "Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, in 1.5 mm² T&E to the unit location (utility room, loft, plant cupboard). Local DP isolator. Boost wiring from kitchens and bathrooms — sometimes via humidity sensors or PIR, sometimes via pull-cord switches in bathrooms or push-buttons in kitchens. Some units include a low-voltage commissioning interface (e.g. for installer-set air-flow rates). The unit's nameplate is typically 50-300 W on full load — modest demand. The bulk of the electrical work is the boost wiring network, not the unit supply.",
      "A 1-page document in plain English: (1) WHAT YOU REPORTED — customer's symptom in their words. (2) WHAT WE FOUND — the fault, in plain English. (3) WHAT WE DID — the fix, in plain English. (4) WHAT WE TESTED — the verification, in plain English. (5) RECOMMENDATIONS — anything further the customer should consider. (6) WARRANTY — what's covered for what period. (7) NEXT STEPS — any follow-up work, retest schedule, contact info. Most modern firms have a customer summary template; the apprentice fills it in at the end of each job. Customer keeps the summary; firm keeps the technical job sheet.",
    ],
    correctIndex: 0,
    explanation:
      "The open-PEN risk is the rationale. On a TN-C-S supply the PEN conductor combines neutral and protective earth between the substation and the cut-out. If the PEN breaks open between the substation and the property, the property's earthing rises toward line voltage (depending on load balance on neighbouring properties). For an EV charging on a driveway the touch-voltage between the car body and the surrounding ground (concrete, soil, gravel) becomes potentially lethal because the ground is not at PME potential. Reg 722.411.4 requires one of methods (b) to (e) — an installation earth electrode (with maximum resistance per Annex A722.3 to keep MET-to-earth voltage at most 70 V RMS under PEN open-circuit), a 207 to 253 V utilisation-voltage detection device with disconnection within 5 s, or equivalent functionality built into the charging equipment.",
  },
  {
    id: 'l3-m2-s4-sub4-afdd-exemption',
    question:
      "An installer has skipped the AFDD on a final circuit feeding a 22 kW three-phase EV charger. The charger conforms to the BS EN 61851 series and the connector conforms to BS EN IEC 62196-2. Is this Section 722 compliant?",
    options: [
      "Directly — every tool in the cable-prep kit (auto strippers, ratchet crimpers, preset torque drivers, calibrated test instruments) exists to deliver consistent, repeatable, manufacturer-spec terminations. 'Good workmanship' is delivered through the tools as much as through the operative's skill. An apprentice using the right tool the right way produces 134.1.1-compliant work; using the wrong tool (knife strip, plier crimp, eyeballed torque) produces work that fails 134.1.1 even if it tests OK on the day.",
      "Yes — Reg 722.421.1.7.201 states that AFDDs are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series. The verifier should confirm by manufacturer declaration, marking, datasheet or test report that the equipment conforms to BS EN 61851 and that any socket-outlet or vehicle connector conforms to BS EN IEC 62196-2. Where evidence is present, the AFDD exemption applies legitimately.",
      "Yes — apprentices are workers and Reg 15 applies in full. The competence duty in Reg 15(1)(a) is satisfied because apprentices are 'in the process of obtaining' the competence (which is why they're always supervised). The report-hazards duty (Reg 15(1)(b)) and the co-operation duty (Reg 15(1)(c)) apply identically to apprentices and to fully-qualified electricians.",
      "The topology of the installation — supply origin, every sub-main, every distribution board, every protective device, every final-circuit group — represented in single-line form (one line per cable regardless of how many conductors it actually has). Plus annotations: ratings, cable sizes, fault levels, Ze, PSCC, Zs, breaker types.",
    ],
    correctIndex: 1,
    explanation:
      "Section 722 carves out a specific AFDD exemption for EV charging equipment that meets the BS EN 61851 series. The acceptance rules are explicit — the exemption applies only where the equipment conforms (verify by documentation) and where the connector conforms to BS EN IEC 62196-2. A verifier should never accept the exemption on verbal assurance — the documentary evidence must be present in the install file. The reasoning is that the BS EN 61851 series imposes its own protective measures within the charging equipment, including arc-fault detection mechanisms appropriate to the EV charging duty cycle.",
  },
  {
    id: 'l3-m2-s4-sub4-protective-measures',
    question:
      "A designer proposes using a non-conducting location and earth-free local equipotential bonding as the protective measures for an EV charging area. Section 722 — accept or reject?",
    options: [
      "Give as much advance notice as possible of the day's plan, the week's plan and any expected changes. Provide written or visual schedules where possible. When changes are unavoidable, explain the reason calmly and give the apprentice a moment to adjust. Provide clear, unambiguous instructions ('start at the kitchen, do the back-boxes first, the cable will be in the loft'). Avoid unwritten rules and 'common sense' assumptions. Many autistic workers thrive on predictability and clear structure — giving that structure costs nothing and improves performance.",
      "Take ALL adequate precautions: secure isolation (lock-off + key in pocket, not left in lock); a warning notice at the point of isolation; in some installations a separate caution at the point of work; voltage proving on a known live source before AND after testing the isolation; all to prevent the equipment becoming live again whilst work is in progress. Talking to the customer about not touching it is part of the precaution chain.",
      "Verify polarity LIVE during the energised testing in Section 4 — confirm at the supply origin that L and N are correctly identified per the supply provider, and verify single-pole switches at every accessory really do interrupt the line as designed. The dead test catches static wiring errors; the live test catches errors at the supply or hidden swaps further upstream.",
      "Reject. Reg 722.410.3.6 prohibits the use of non-conducting location and earth-free local equipotential bonding within Chapter 72 (EV charging installations). The designer must select alternative protective measures permitted within Chapter 72 and elsewhere in BS 7671 — typically protective earthing with ADS, RCDs at the rated residual operating current required by Section 722, and where applicable SELV / PELV. Reg 722.410.3.5 separately prohibits obstacles and placing out of reach within Section 722 scope.",
    ],
    correctIndex: 3,
    explanation:
      "Section 722 explicitly prohibits four specific protective measures — obstacles, placing out of reach (722.410.3.5), non-conducting location, and earth-free local equipotential bonding (722.410.3.6). The reasoning is that EV charging brings members of the public (and their vehicles) into electrical contact with the installation in conditions that those four measures cannot safely manage. The acceptable protective measures are the conventional Part 4 set — ADS with appropriate RCDs, SELV / PELV where applicable, and double or reinforced insulation. The required action is direct — any design proposing non-conducting location or earth-free bonding in an EV charging context shall be revised.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the scope of BS 7671:2018+A4:2026 Section 722, and which configuration triggers it?",
    options: [
      "They have a continuing duty under EAWR Reg 4 (system in safe condition) AND a contractual duty to put the work right. Failure to act on discovery, especially if anyone could be exposed to the danger, could be a criminal offence under EAWR. Notify the client immediately, isolate the affected circuit if necessary, return to remedy.",
      "Section 722 applies to circuits intended to supply electric vehicles for charging purposes. Applicability is based on circuit intent at design and installation, not on whether the circuit is being used at any given moment for EV charging. Domestic, commercial, public, dedicated and shared circuits all fall within scope where the intent is EV charging.",
      "Socket 12 is on a spur off the ring. The extra resistance (0.36 - 0.19 = 0.17 Ω) is the round-trip length of the spur cable in series with the ring midpoint reading. One unfused spur per outlet on the ring is permitted; document the spur cable size and length on the schedule.",
      "Because L3 starts to be looked to as a quasi-supervisor and starts to influence others. Knowing where YOU sit in the duty stack — and where ELSE the duty sits — lets you make accurate decisions, escalate correctly, and avoid being unwittingly drawn into a duty cascade you didn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t recognise.",
    ],
    correctAnswer: 1,
    explanation:
      "The applicability test is precise — the circuit must be intended to supply EVs for charging. A general-purpose 13 A socket sometimes used for granny-charging is in scope only if the circuit design intent includes EV charging. A dedicated EV charging final circuit is always in scope. Section 722 is one of the most actively revised sections of BS 7671 — A1:2020 introduced significant changes, and A4:2026 incorporated A1:2020 alongside further changes affecting EV charging installations.",
  },
  {
    id: 2,
    question:
      "What does Reg 722.411.4 require where a PME (TN-C-S) earthing facility would otherwise be used for the protective conductor contact of an outdoor EV charging point?",
    options: [
      "The Apprentice, the College Tutor and the Workplace Mentor (with the Employer's training lead or HR sometimes attending as a fourth voice). The three-way review is the formal sit-down where progress is calibrated, gaps identified, and the next month's targets agreed. It's the structural mechanism that stops academic and practical sides drifting apart.",
      "A dutyholder named under BSA 2022 for an occupied higher-risk residential building. The Accountable Person is responsible for the building's safety case, for managing building safety risks, and for maintaining the golden thread of information. The Principal Accountable Person is the lead AP where multiple APs exist.",
      "Reg 722.411.4 applies to TN systems and addresses requirements where a PME earthing facility would otherwise be used as the means of earthing for the protective conductor contact(s) of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors. It sets alternative methods (b) to (e) that shall be used instead of using the PME facility directly as the charging-point protective-earth connection.",
      "It marks the entry as absolute hazardous waste — always hazardous regardless of concentration or test result. Non-asterisked entries are non-hazardous; entries with mirror codes (one starred, one not) require a hazardous-property assessment on the specific waste before deciding which code applies. The List of Waste regulations and the Environment Agency technical guidance set out the assessment methodology.",
    ],
    correctAnswer: 2,
    explanation:
      "The scope of Reg 722.411.4 makes the rule and the rationale clear. The PME (Protective Multiple Earthing) arrangement is fine for the property as long as the PEN remains intact, but a broken PEN raises the property's earth potential toward line voltage. For an EV on a driveway the surrounding ground stays at true earth potential while the car body sits at the elevated PME potential — the touch voltage can be lethal. The four alternative routes manage that risk in different ways.",
  },
  {
    id: 3,
    question:
      "How does Reg 722.411.4(b) propose to manage the open-PEN risk for an outdoor EV charger?",
    options: [
      "Pass. The maximum trip time at 1 x I delta n for a general-purpose 30 mA RCD is 300 ms per the product standard, and the system disconnection time is 400 ms (TN) or 200 ms (TT) per Table 41.1. 35 ms is well under all limits. A trip time of 35 ms is typical for a healthy modern RCD; older RCDs may give 80-200 ms — also within limits. Trip times near or exceeding 300 ms suggest the RCD is approaching end of life and should be replaced.",
      "A \\\\\\\"skilled person (electrically)\\\\\\\" as defined in BS 7671 Part 2 — typically evidenced by membership of a competent person scheme (NICEIC, NAPIT, ELECSA, Stroma) and current 2391/2394/2395 (or equivalent) inspection and testing qualification. The duty-holder is liable if they appoint someone not competent.",
      "Investigate. Expected R2 for 20 m of 1.5 mm² Cu is approximately 0.24 Ω. 0.85 Ω is roughly 3.5 × the expected value — strongly suggests a poor termination (loose terminal at an accessory, oxidised connection in a junction box) or a partly broken CPC. Trace through the circuit, retighten or replace the suspect connection, retest.",
      "By providing an installation earth electrode connected to the main earthing terminal of the installation by a protective conductor complying with Regulation 544.1.1, used as the means of earthing for the charging point protective conductor contact. The earth electrode resistance is determined per Annex A722.3 to ensure the MET-to-earth voltage does not exceed 70 V RMS under a PEN open-circuit fault.",
    ],
    correctAnswer: 3,
    explanation:
      "Method (b) creates a true earth reference at the property by driving an installation earth electrode and using that as the earthing reference for the charge point. Annex A722 Item A722.3 gives guidance on the maximum resistance for that electrode — set so that, even under a PEN open-circuit fault, the MET-to-earth voltage does not exceed 70 V RMS. That 70 V threshold is below the touch-voltage hazard limit. The earth electrode and the PME earthing remain bonded together in the property, so the difference between the car body and the surrounding ground stays inside the safe envelope.",
  },
  {
    id: 4,
    question:
      "How does Reg 722.411.4(d) propose to manage the open-PEN risk through a utilisation-voltage detection device?",
    options: [
      "Protection against electric shock shall be provided by a device which electrically disconnects the vehicle from the live conductors of the supply and from protective earth in accordance with Regulation 543.3.3.101(b) within 5 s in the event of the utilisation voltage at the charging point, between the line and neutral conductors, being greater than 253 V RMS or less than 207 V RMS. The device shall provide isolation and be selected in accordance with Table 537.4.",
      "No — there's a London weighting (typically £2-3/hr extra for work inside the M25), a separate set of SJIB rates for Scotland, and travel allowances vary. The headline JIB hourly rate is the national minimum for the grade; London-weighted rates apply on top for inner-London work. Always check your contract for which rate applies.",
      "It means the local LV cable, transformer or upstream HV network can’t safely accept the additional export without reinforcement (typically a transformer upgrade or cable replacement). The customer either pays for the reinforcement (often £10,000+), accepts an export-limited install (the inverter is throttled to a lower export rating), or chooses not to proceed.",
      "Because the retail trading hours can't be disrupted. Floor lifts, ceiling tile removal, dust generation and circuit isolation all interfere with shoppers and staff. Out-of-hours work (typically 8pm to 6am for high-street retail) lets the work proceed without affecting trade. Prep includes agreed access times, security pass arrangements, fire-alarm coordination (if temporary detector covers are needed) and a formal hand-back at end of shift.",
    ],
    correctAnswer: 0,
    explanation:
      "Method (d) detects the open-PEN condition indirectly through its effect on utilisation voltage. When a PEN opens, the property's neutral floats relative to true earth and the line-to-neutral voltage at the property either rises or falls depending on the load balance on neighbouring properties on the same PEN. The 207 V to 253 V window (231 V plus or minus 10 percent — the standard tolerance for nominal 230 V) is the test — outside that window, the device disconnects the vehicle within 5 seconds, electrically separating it from both live conductors and from protective earth. Many modern dedicated EV chargers integrate this detection internally — Reg 722.411.4(e) covers the 'alternative device or equivalent functionality within charging equipment' route on that basis.",
  },
  {
    id: 5,
    question:
      "What does Reg 722.421.1.7.201 say about AFDDs on EV charging circuits, and what evidence does the verifier need?",
    options: [
      "Code it on the EICR (C1 immediate danger / C2 potentially dangerous / C3 improvement recommended / FI further investigation). Inform the customer / dutyholder. Recommend remedial action with timescales appropriate to the code. C1 requires immediate action — make safe on the day. The EICR itself is the formal report; it goes to the dutyholder.",
      "AFDDs are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series. Acceptance of the exemption requires verification that the EV charging equipment conforms to the BS EN 61851 series (manufacturer declaration, marking, datasheet or test report) and that any socket-outlet or vehicle connector incorporated in the EV charging equipment conforms to BS EN IEC 62196-2.",
      "No fixed minimum in regulations — driven by needs assessment. HSE ACOP L74 gives indicative numbers (low-hazard: 1 appointed person for &lt;25 employees; 1 EFAW for 25-50; 1 FAW for &gt;50; high-hazard: more demanding). Construction and electrical work generally falls in higher-hazard band.",
      "Gather and preserve facts at the scene; provide a contemporaneous written account; notify the responsible person immediately; assist with form completion if asked; provide witness information; preserve evidence; cooperate with any HSE follow-up. The operative isn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t normally the report-maker but is the source of the facts.",
    ],
    correctAnswer: 1,
    explanation:
      "Section 722 carves out a specific AFDD exemption for compliant EV charging equipment because the BS EN 61851 series imposes its own arc-detection regime within the charging equipment. The acceptance rules are explicit — the exemption applies only with documentary evidence of conformity. A verifier accepting the exemption without documentation is operating outside Section 722.",
  },
  {
    id: 6,
    question:
      "Which protective measures does Section 722 explicitly prohibit for EV charging installations?",
    options: [
      "When the circuit supplies multiple loads that will not all run simultaneously at full power. Apply diversity to the connected load before deriving Ib. For a dedicated single-load circuit (single shower, single hob), no diversity applies — Ib equals the rated current of the load.",
      "Establish a full exclusion zone with barriers minimum 6 metres from the base, deploy adequate task and area lighting, station banksmen at all access points, display warning signs, ensure all personnel wear enhanced high-visibility clothing, have a traffic management plan approved by the local authority, and confirm the rescue plan accounts for reduced visibility",
      "Reg 722.410.3.5 prohibits obstacles and placing out of reach (Section 417 measures). Reg 722.410.3.6 prohibits non-conducting location and earth-free local equipotential bonding. Designers must select alternative protective measures permitted within Chapter 72 and elsewhere in BS 7671 — typically ADS with appropriate RCDs, SELV / PELV where applicable, and double or reinforced insulation.",
      "Yes — properly so. Lighthouse, Samaritans, EIC, Mind all operate strict confidentiality. Calls are not recorded for sharing; staff are bound by confidentiality agreements; details are not shared with employers or any third party (except in specific circumstances of immediate risk to life under safeguarding rules). You can call anonymously if you prefer. The fear of being identified is one of the things that keeps people from calling — but the confidentiality is real.",
    ],
    correctAnswer: 2,
    explanation:
      "The four prohibited measures are deliberately narrow. They are unsafe in EV charging contexts because members of the public (the customer, family, visitors) interact with the installation while connected to a vehicle that is itself connected to the surrounding ground. Obstacles and placing out of reach do not cope with a connected charging cable. Non-conducting location and earth-free bonding do not cope with the vehicle being inherently part of the protective system. The required action is direct — designs proposing those measures must be revised before installation.",
  },
  {
    id: 7,
    question:
      "What is the open-PEN problem on a TN-C-S supply, and why does it specifically threaten an outdoor EV charging point on a driveway?",
    options: [
      "STOP the original fault investigation. The disconnected CPC is a Code 1 (Danger Present — immediate action required) defect under the EICR coding system — the metal lampholders, ceiling roses and ceiling-mounted accessories on this circuit have NO earth fault path, so a fault to exposed metalwork won't operate the protective device and the metalwork will sit at phase voltage. Make the situation safe — either re-terminate the CPC properly OR isolate the circuit and label 'OUT OF SERVICE — CPC FAULT — do not re-energise'. Inform the customer in writing. Then resume original fault investigation if the customer agrees to the additional work.",
      "Propose a scope that includes everything that can be safely tested live (visual inspection, thermographic survey of switchgear, RCD test buttons, live tests on circuits where safe to do so) and clearly excludes what cannot be tested without isolation, recording the exclusion under Limitations with the recommendation that the duty holder schedule a planned outage for full testing within an agreed period. Note any FI for items the live-only inspection cannot fully verify.",
      "Because recycling preserves the material value (the metal, the polymer, the glass) for re-use in new manufacturing, whereas energy recovery destroys the material and recovers only the chemical energy. Under the waste hierarchy, keeping materials in productive use is preferred over extracting one-time energy from them. Energy from waste sits above landfill because at least some value (electricity / heat) is recovered, but it sits below recycling because the material is lost.",
      "On a TN-C-S supply the PEN conductor combines neutral and protective earth between the substation and the cut-out. If the PEN breaks open between the substation and the property, the property's earthing rises toward line voltage depending on the load balance on neighbouring properties on the same PEN. For an EV on a driveway, the car body sits at the elevated PME potential while the surrounding ground (concrete, soil, gravel) stays at true earth potential — the touch-voltage between the car body and the ground can be lethal.",
    ],
    correctAnswer: 3,
    explanation:
      "Open-PEN is the engineering term and it is the central rationale for Reg 722.411.4. Inside the property an open PEN raises every exposed-conductive-part to elevated PME potential simultaneously, so simultaneous-touch hazards within the property are largely managed by the bonding scheme. Outside the property the surrounding ground is not part of that bonded scheme — the driveway concrete sits at true earth potential while the bonded EV body sits at PME potential. That mismatch is the hazard. The four routes of Reg 722.411.4 manage it either by establishing a true earth reference at the property (route b), by detecting the open PEN through its voltage signature and disconnecting (route d), or by relying on equivalent functionality within the charging equipment (route e).",
  },
  {
    id: 8,
    question:
      "What is the role of Annex A722 Item A722.3 in applying Reg 722.411.4(b), and how does it determine acceptance?",
    options: [
      "Annex A722 Item A722.3 gives guidance on determining the maximum resistance required for the earth electrode in route (b). The resistance must be low enough to ensure that, under a PEN open-circuit fault, the MET-to-earth voltage does not exceed 70 V RMS. That keeps the touch voltage between the car body and the surrounding ground within the safe envelope. Acceptance on site requires the calculated maximum resistance, the measured electrode resistance, and a record showing the measured value is at or below the calculated maximum.",
      "Reg 722.410.3.5 prohibits obstacles and placing out of reach (Section 417 measures). Reg 722.410.3.6 prohibits non-conducting location and earth-free local equipotential bonding. Designers must select alternative protective measures permitted within Chapter 72 and elsewhere in BS 7671 — typically ADS with appropriate RCDs, SELV / PELV where applicable, and double or reinforced insulation.",
      "Five questions. (1) IS PARTS AVAILABLE? Older MCBs may be obsolete; replacement requires new model. (2) IS REPAIR EVEN POSSIBLE? Most MCBs are sealed units; 'repair' usually means swap. (3) IS THE EXISTING DESIGN STILL APPROPRIATE? Modern installations may need RCBO (RCD + MCB combined) instead of MCB-only. (4) WILL THE NEW COMPONENT FIT THE BUSBAR? Some old CUs need full CU replacement to fit modern devices. (5) WHAT'S THE OVERALL CU AGE / CONDITION? If the CU itself is approaching end of life (typical 25–30 years), full CU replacement may be the right call. Engineering decision is rarely just 'repair vs replace one device'.",
      "Cooperate fully with your employer's investigation. Provide a calm, factual account of what happened — what you did, when, with what materials, against what specification, with what test results, with what documentation. Don't speculate about the customer's motives. Don't post about it on social media. Don't approach the customer directly. The employer will manage the customer relationship; your job is to give your employer the evidence base they need to respond.",
    ],
    correctAnswer: 0,
    explanation:
      "The 70 V threshold is the touch-voltage limit set by the wider BS 7671 framework for these conditions. Annex A722 Item A722.3 lets the designer back-calculate the maximum permissible electrode resistance from the supply characteristics. Acceptance is by calculation plus measurement plus documentation — the design pack records the calculated maximum, the commissioning record records the measured value, and the EIC notes both.",
  },
];

const faqs = [
  {
    question: "Reg 722.411.4 talks about charging points 'located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors' — what does that catch in practice?",
    answer:
      "It catches the obvious case (a charge point mounted on the outside wall of a house, garage or carport with the vehicle parked on the driveway) and a slightly less obvious case (a charge point inside a garage with a tethered cable long enough to reach a vehicle parked outside the garage, or a charge point on a wall that opens onto a courtyard). The 'reasonably expected' wording means you cannot avoid the regulation by mounting a long-tethered charge point indoors and ignoring the fact that the cable is going to be used outdoors. If outdoor use is foreseeable, Reg 722.411.4 applies.",
  },
  {
    question: "If the property is on a TN-S (separate neutral and earth) supply rather than PME, does Reg 722.411.4 still apply?",
    answer:
      "Reg 722.411.4 specifically addresses TN systems where a PME earthing facility would otherwise be used. A genuine TN-S supply (with a separate metallic earth conductor from the substation) does not present the open-PEN problem because the earth path is independent of the neutral. On TN-S the standard ADS protective measures of Part 4 apply without the route (b) to (e) overlay. The same is true for TT (with its own installation earth electrode by definition) — TT installations satisfy the spirit of route (b) by their basic design. The challenge is identifying the supply type — many DNO records show TN-C-S where the actual installation is TN-S, and vice versa. Verify by inspection at the cut-out or by request to the DNO before relying on the supply-type analysis.",
  },
  {
    question: "Is the open-PEN risk a real-world hazard or a theoretical regulatory concern?",
    answer:
      "It is a real-world hazard. PEN faults do occur on UK distribution networks — typically from corrosion at joints, mechanical damage during third-party works, or thermal stress on overloaded service cables. Documented incidents exist of property earthing rising to dangerous voltages following PEN faults, with shocks and injury (and in rare cases fatalities) to people in contact with metalwork. The EV-on-driveway scenario amplifies the risk because the EV brings an exposed metallic mass into reliable contact with surrounding ground. Reg 722.411.4 exists because the IET and the DNOs concluded that the standard PME treatment was not safe enough for outdoor EV charging. A4:2026 strengthens the PEN-fault detection requirement further.",
  },
  {
    question: "What goes on the Section 722 documentation for an MCS-track EV charger install?",
    answer:
      "The Electrical Installation Certificate (EIC) covers the electrical install per BS 7671 with a Section 722 declaration. The OZEV / MCS / scheme certificate (depending on the funding route) covers competence and product-conformity. The G98 / G99 notification (where applicable for any V2G or microgeneration interaction) covers grid connection. The handover pack typically includes — Section 722 acceptance evidence (BS EN 61851 series conformity, BS EN IEC 62196-2 connector conformity, AFDD exemption justification), the chosen Reg 722.411.4 route documentation (for route b — earth electrode resistance calculation per Annex A722.3 plus measured value; for route d or e — device specification and trip-window evidence), RCD type and rating evidence, photos of the install and the labels, and the customer's user manual.",
  },
  {
    question: "Why does Section 722 prohibit non-conducting location and earth-free bonding when those measures are valid elsewhere in BS 7671?",
    answer:
      "Both measures rely on the assumption that the protected zone is electrically isolated from the surrounding world — non-conducting location uses insulating floors, walls and ceilings to prevent simultaneous contact between an exposed-conductive-part and earth; earth-free bonding uses a localised bonded zone with no connection to the building earthing scheme. EV charging breaks both assumptions. The vehicle is itself a large metallic mass standing on the surrounding ground, the user is in contact with both the vehicle and the charging cable, and the cable is connected to the property. There is no way to make the EV charging operation electrically isolated from earth — the EV is part of the earthing path by virtue of physics. Reg 722.410.3.6 prohibits the two measures because they cannot deliver protection in this context.",
  },
  {
    question: "Where do MCS / OZEV competence requirements sit relative to BS 7671 Section 722?",
    answer:
      "OZEV (the Office for Zero Emission Vehicles) requires installers funded under EV-charging grant schemes (Workplace Charging Scheme, EV chargepoint grant for renters and flat-owners, Electric Vehicle Homecharge Scheme historic) to be on the OZEV-authorised installer list. MCS-style competence schemes operate alongside and several IET / NICEIC competence routes exist for EV. BS 7671 Section 722 sets the electrical installation standard. The competence scheme proves the installer is competent to apply Section 722. The grant scheme requires both the competence and the Section 722-compliant install. As an apprentice your firm's accreditation is the bridge — work on EV chargers under the supervision of a competent qualified person on the firm's authorised installer record.",
  },
];

export default function Sub4() {
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
            eyebrow="Module 2 · Section 4 · Subsection 4"
            title="Section 722 EV charging, Open-PEN and Reg 722.411.4"
            description="The PME earthing arrangement that works inside the property cannot safely earth an outdoor EV charging point. Reg 722.411.4 sets four alternative routes for managing the open-PEN risk. Section 722 also carves out a specific AFDD exemption for BS EN 61851 conforming equipment, and prohibits four protective measures unsuitable for EV charging."
            tone="emerald"
          />

          <TLDR
            points={[
              "Section 722 of BS 7671:2018+A4:2026 covers every circuit intended to supply electric vehicles for charging — applicability is by design intent, not by current usage.",
              "Reg 722.411.4 prohibits direct use of PME earthing for outdoor EV charging on TN-C-S supplies. Four alternative routes (b) to (e) manage the open-PEN risk — installation earth electrode, utilisation-voltage detection (207 to 253 V window with 5 s disconnection), or equivalent functionality in the charging equipment.",
              "Reg 722.421.1.7.201 exempts BS EN 61851 conforming EV charging equipment from the AFDD requirement — but documentary evidence of conformity is required for acceptance.",
              "Reg 722.410.3.5 and 722.410.3.6 prohibit obstacles, placing out of reach, non-conducting location and earth-free local equipotential bonding for EV charging — alternative protective measures must be selected.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the relevant Building Regulations and other statutory and non-statutory requirements for the installation and maintenance of environmental technology systems (2365-03 Unit 301 / AC 2.1) — specifically BS 7671 Section 722 and the OZEV authorised installer scheme for EV charging.",
              "Provide information on the operational requirements and benefits of environmental technology systems (2357 Unit 312 ELTP02 / AC 3.1) — applied to EV charging points on TN-C-S supplies and the four routes of Reg 722.411.4.",
              "State the Local Authority Building Control requirements which apply to the installation of environmental technology systems (2357 Unit 602 ELTK02 / AC 3.3) — including the Part P (England and Wales) notification chain for EV chargers.",
              "Explain the open-PEN risk on a TN-C-S supply and why it specifically threatens an outdoor EV charging point on a driveway.",
              "Apply each of the four routes of Reg 722.411.4 (installation earth electrode, voltage-window detection, alternative device or equivalent functionality in the charging equipment) to a typical domestic install.",
              "Apply the AFDD exemption of Reg 722.421.1.7.201 correctly — verifying conformity of the EV charging equipment to the BS EN 61851 series and connector conformity to BS EN IEC 62196-2.",
              "Reject design proposals that use any of the four prohibited protective measures of Reg 722.410.3.5 / 722.410.3.6 in EV charging contexts and propose compliant alternatives.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Section 722 — scope and revision history</ContentEyebrow>

          <ConceptBlock
            title="Section 722 covers every circuit intended to supply EVs for charging"
            plainEnglish="BS 7671:2018+A4:2026 Section 722 is the electrical installation standard for electric vehicle charging installations. The scope test is the design intent of the circuit — if the circuit is intended at design or installation time to supply an EV for charging, Section 722 applies. That captures the dedicated 7 kW or 22 kW domestic charger, the workplace 22 kW destination charger, the multi-bay rapid charging hub on a forecourt, and the dedicated 13 A socket designed for granny-charging where the design intent is EV use."
            onSite="On site you treat Section 722 as additive to the general parts of BS 7671 — Parts 1 to 6 still apply, Section 722 layers EV-specific requirements on top. The competence scheme (OZEV authorised installer, MCS-style EV scheme, manufacturer training) proves the installer is competent. Section 722 sets the electrical standard. ENA G98 / G99 may also apply if the install includes V2G (vehicle-to-grid) export capability or if the EV charging is integrated with a microgeneration system."
          >
            <p>
              The A4:2026 revision history of Section 722 is significant — Amendment 1:2020
              (issued February 2020) made substantial changes to Section 722. A4:2026
              incorporates A1:2020 alongside further changes affecting EV charging
              installations. Anyone working from a pre-A1:2020 copy of BS 7671 is working
              from out-of-date guidance.
            </p>
            <p>
              Key clauses you will meet on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>722.31</strong> — Assessment requirement covering purposes, supplies
                and structure of the EV installation.
              </li>
              <li>
                <strong>722.41 / 722.410.3.5 / 722.410.3.6</strong> — Protection for safety
                and the prohibitions on obstacles, placing out of reach, non-conducting
                location and earth-free local equipotential bonding.
              </li>
              <li>
                <strong>722.411.4</strong> — TN system requirements where PME earthing would
                otherwise be used for outdoor charge point protective conductor contacts.
                The four alternative routes (b) to (e).
              </li>
              <li>
                <strong>722.413.1.2</strong> — Class I EV charging point supplied from a
                separated source (Annex A722 Item A example).
              </li>
              <li>
                <strong>722.421.1.7.201</strong> — AFDD exemption for BS EN 61851 conforming
                charging equipment.
              </li>
              <li>
                <strong>722.551.7.2</strong> — Normative references for the charging
                connector standards (BS EN IEC 62196-2 series), enclosures and IK ratings.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 722.411.4 (TN system scope, paraphrased)"
            clause={
              <>
                &quot;Regulation 722.411.4 applies to TN systems and addresses requirements
                where a PME earthing facility would otherwise be used as the means of
                earthing for the protective conductor contact(s) of a charging point located
                outdoors or that might reasonably be expected to be used to charge a vehicle
                outdoors. It sets alternative methods (b) to (e) that shall be used instead
                of using the PME facility directly as the charging-point protective-earth
                connection.&quot;
              </>
            }
            meaning={
              <>
                The scope is unambiguous. PME (Protective Multiple Earthing — the
                domestic name for the TN-C-S arrangement most UK distribution networks use)
                cannot be used directly as the charge point's protective-earth reference for
                outdoor charging on a TN supply. Routes (b) to (e) are the four alternative
                methods. The 'reasonably expected to be used to charge a vehicle outdoors'
                wording catches indoor-mounted chargers with tethered cables long enough to
                reach an outdoor parking position — outdoor use is the trigger.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 722.411.4 — IET Wiring Regulations 18th Edition A4:2026."
          />

          <EarthingSystemDiagram />

          <SectionRule />

          <ContentEyebrow>The open-PEN problem — why PME fails outdoors</ContentEyebrow>

          <ConceptBlock
            title="On a healthy TN-C-S supply the property earth follows the substation neutral"
            plainEnglish="A TN-C-S (PME) supply combines neutral and protective-earth functions in a single conductor (the PEN) between the substation and the property's cut-out. Inside the property, the PEN is split into a separate neutral (N) and a separate protective earth (PE) and the two functions stay separate from there onwards. Every exposed-conductive-part and every extraneous-conductive-part inside the property is bonded to that PE, which traces back through the cut-out and the PEN to the substation neutral and from there to the system earth. Healthy operation — every bonded mass inside the property sits at the PEN potential, which is approximately at true earth."
            onSite="The arrangement is well understood and widely used because it gives a low-impedance earth-fault loop and removes the need for an installation earth electrode at every property. The bonding scheme keeps everyone safe inside the property by ensuring all simultaneously-touchable metalwork is at the same potential. Whether that potential is exactly at true earth or slightly elevated from it does not matter for inside-the-property safety, because there is no inside-the-property contact route to true earth — the floor is bonded, the walls are bonded, the gas pipe is bonded, all the metalwork is bonded together."
          >
            <p>
              The arrangement works on one condition — that the PEN remains intact between
              the substation and the property. If the PEN breaks open between the substation
              and the property's cut-out, several things happen at once:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The neutral function is lost</strong> — the property's neutral now
                floats relative to the substation. Single-phase loads pull the floating
                neutral toward the line voltage of whichever phase is loaded most.
              </li>
              <li>
                <strong>The earth function is lost</strong> — the property's PE is bonded to
                that floating neutral, so the entire bonding scheme inside the property
                rises with it. Every exposed-conductive-part follows.
              </li>
              <li>
                <strong>Inside the property, simultaneous-touch is still managed</strong> —
                because everything inside is bonded together, every touchable surface is at
                the same elevated potential, and you cannot get a shock by touching two
                things at the same potential.
              </li>
              <li>
                <strong>Outside the property, simultaneous-touch is not managed</strong> —
                the surrounding ground (driveway, lawn, pavement) is at true earth potential.
                Any metalwork brought outside that is part of the property bonding scheme
                sits at the elevated PME potential. Touching the metalwork while standing on
                the ground exposes you to the difference.
              </li>
            </ul>
            <p>
              That last point is exactly the EV-on-driveway problem. The EV chassis is
              connected through the charging cable to the property's protective earth.
              Under an open-PEN fault the chassis sits at elevated potential while the
              driveway concrete sits at true earth. Touching the car body while standing on
              the driveway exposes you to the difference, which can be lethal.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Open-PEN faults are real-world events on UK distribution networks"
            plainEnglish="The open-PEN risk is not a theoretical regulatory concern. PEN faults occur on UK distribution networks every year, typically from corrosion at joint boxes, mechanical damage during third-party works (cable strikes during trenching), or thermal stress on overloaded service cables. Documented incidents exist of property earthing rising to dangerous voltages, with shocks and injuries to people in contact with metalwork. Pre-EV the risk was managed by the inside-the-property bonding scheme — most touchable metalwork was bonded together and the simultaneous-touch hazard was small. EVs change the analysis by bringing reliable outdoor metalwork at PME potential into routine contact with people standing on true earth."
            onSite="On the install you do not see the open-PEN fault directly — you see its consequences. The whole rationale of Reg 722.411.4 is that you cannot rely on the PEN remaining intact for the lifetime of the EV charging point. Reasonable foreseeability is the standard. The four routes of Reg 722.411.4 either remove the dependence on the PEN (route b — installation earth electrode) or detect the open-PEN condition through its voltage signature and disconnect the EV (route d — voltage-window detection). Either route delivers a charging point that stays safe even under an open-PEN fault."
          >
            <p>
              The numbers from Annex A722 Item A722.3:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>70 V RMS</strong> — the maximum permitted MET-to-true-earth voltage
                under a PEN open-circuit fault. That sets the touch-voltage envelope between
                the bonded car body and the surrounding ground.
              </li>
              <li>
                <strong>207 V to 253 V RMS</strong> — the line-to-neutral utilisation voltage
                window for route (d). Outside that window (which is 230 V plus or minus 10
                percent — the standard tolerance) the device disconnects within 5 seconds.
              </li>
              <li>
                <strong>5 seconds</strong> — the maximum disconnection time under route (d)
                from the trigger condition being met to the device electrically isolating
                the vehicle from the live conductors and from protective earth.
              </li>
              <li>
                <strong>Annex A722 Item A722.3</strong> — the calculation route for the
                maximum permissible electrode resistance under route (b). The number depends
                on the supply characteristics; the designer back-calculates from the 70 V
                threshold.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 722.411.4(b) (Installation earth electrode, paraphrased)"
            clause={
              <>
                &quot;The main earthing terminal of the installation shall be connected to an
                installation earth electrode by a protective conductor complying with
                Regulation 544.1.1 as the means of earthing for the charging point
                protective conductor contact when using method (b). The earth electrode and
                protective conductor are required alternatives to using the PME earthing
                facility directly.&quot;
              </>
            }
            meaning={
              <>
                Route (b) creates a true earth reference at the property by driving an
                installation earth electrode and bonding it to the MET. Annex A722 Item
                A722.3 gives the maximum-resistance guidance — the electrode shall be low
                enough resistance that, under a PEN open-circuit fault, MET-to-earth voltage
                does not exceed 70 V RMS. Acceptance is by calculation plus measurement plus
                documentation. The PME earthing remains in use for the rest of the
                installation; route (b) just adds an independent earth reference adequate
                to keep the EV charging point safe under PEN-fault conditions.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 722.411.4(b) — IET Wiring Regulations 18th Edition A4:2026."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 722.411.4(d) (Voltage-window detection, paraphrased)"
            clause={
              <>
                &quot;Protection against electric shock shall be provided by a device which
                electrically disconnects the vehicle from the live conductors of the supply
                and from protective earth in accordance with Regulation 543.3.3.101(b) within
                5 s in the event of the utilisation voltage at the charging point, between
                the line and neutral conductors, being greater than 253 V RMS or less than
                207 V RMS. The device shall provide isolation and be selected in accordance
                with Table 537.4.&quot;
              </>
            }
            meaning={
              <>
                Route (d) detects the open-PEN condition indirectly through its effect on
                line-to-neutral voltage at the charging point. Outside the 207 V to 253 V
                window (the standard plus or minus 10 percent tolerance on 230 V), the
                device disconnects within 5 seconds, electrically separating the EV from
                both the line conductors and from protective earth. Many modern dedicated EV
                chargers integrate this detection internally — Reg 722.411.4(e) covers the
                'alternative device or equivalent functionality within charging equipment'
                route on that basis. The device shall be selected per Table 537.4.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 722.411.4(d) — IET Wiring Regulations 18th Edition A4:2026."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four routes of Reg 722.411.4 in practice</ContentEyebrow>

          <ConceptBlock
            title="Route (b) — installation earth electrode at the property"
            plainEnglish="Drive an earth electrode (typically a copper-clad steel rod, sometimes an earth mat or buried plate, sized to the soil resistivity at the site) and bond it to the property's main earthing terminal with a protective conductor sized per Reg 544.1.1. The electrode resistance must be low enough that the MET-to-true-earth voltage stays at most 70 V RMS even if the PEN opens — Annex A722 Item A722.3 gives the calculation. The PME earthing remains for the rest of the installation; the electrode just adds an independent earth reference for the charging point."
            onSite="The practical work — locate the rod position (clear of buried services, away from concrete, in soil that will support a low-resistance electrode), drive the rod to depth, run the protective conductor back to the MET in compliant cable, terminate, label, test. The electrode resistance test is on the standard installation test schedule. Record the measured value against the calculated maximum on the EIC. Soil resistivity varies hugely across the UK — clay sites give low resistances easily, sandy or rocky sites can require multiple rods or alternative electrodes. The electrode is in the ground for the lifetime of the install — corrosion is the slow failure mode."
          >
            <p>
              Things that go wrong with route (b) installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrode resistance too high</strong> on sandy or rocky soil. Either
                drive multiple rods (and bond them together), use an earth mat or extended
                buried conductor, or treat the rod surroundings with bentonite or
                proprietary earth-enhancement material. Document the design choice.
              </li>
              <li>
                <strong>Cable run from MET to electrode</strong> shall be sized per Reg
                544.1.1 — main protective bonding conductor, not a thin earth wire.
                Mechanical protection is required where exposed to damage.
              </li>
              <li>
                <strong>Electrode termination</strong> shall be accessible for inspection and
                future re-test. Buried-with-no-marker terminations fail acceptance.
              </li>
              <li>
                <strong>PEN-fault detection still helpful</strong> — even with a route (b)
                electrode, many designers add route (e) functionality in the charging
                equipment as belt-and-braces.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Route (d) and route (e) — voltage-window detection"
            plainEnglish="Route (d) requires a discrete device that monitors line-to-neutral utilisation voltage at the charging point and disconnects the vehicle within 5 seconds if the voltage moves outside the 207 V to 253 V window. Route (e) allows the equivalent functionality to be built into the charging equipment itself — most modern dedicated EV chargers have this PEN-fault detection built in, and the manufacturer's documentation states which Reg 722.411.4 route the unit satisfies."
            onSite="Practically the route (e) approach is the most common in modern domestic installs. A typical dedicated EV charger from a mainstream manufacturer holds a declaration that the unit satisfies Reg 722.411.4(e) by built-in voltage-window detection. The installer mounts the unit, terminates the supply, commissions per the manufacturer instructions, and records the route (e) declaration on the EIC. Route (d) discrete devices are sometimes used where the charging equipment does not have built-in detection, or as a belt-and-braces overlay on equipment that does."
          >
            <p>
              How to verify route (e) acceptance on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manufacturer declaration</strong> — every compliant unit ships with a
                Declaration of Conformity stating the satisfied route. File the declaration
                in the install documentation.
              </li>
              <li>
                <strong>Voltage-window test</strong> — the manufacturer commissioning guide
                normally includes a self-test routine that verifies the PEN-fault detection
                circuit. Run the routine and record the pass.
              </li>
              <li>
                <strong>Trip simulation</strong> — some units allow an injected fault test
                during commissioning to verify the disconnection within 5 seconds. Where
                supported, run the test.
              </li>
              <li>
                <strong>Trip behaviour</strong> — confirm the unit electrically separates the
                vehicle from both line conductors and from protective earth on trip, not
                just from line. Reg 722.411.4(e) is explicit on the disconnection
                requirements.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD exemption — Reg 722.421.1.7.201</ContentEyebrow>

          <ConceptBlock
            title="EV charging equipment conforming to BS EN 61851 series is AFDD-exempt"
            plainEnglish="Arc-Fault Detection Devices (AFDDs) are required on certain final circuits in BS 7671 to detect series-arc and parallel-arc faults that conventional overcurrent and residual-current protection cannot catch. EV charging final circuits look on paper like exactly the kind of circuit AFDDs are designed for — long cables, plug-and-socket interfaces, frequent connections and disconnections. But Reg 722.421.1.7.201 specifically exempts EV charging circuits where the equipment conforms to the BS EN 61851 series."
            onSite="The exemption exists because BS EN 61851 imposes its own arc-detection regime within the charging equipment, tuned to the charging duty cycle. A conventional AFDD can nuisance-trip on the inrush and switching transients normal to EV charging. The Section 722 designers concluded that the BS EN 61851 internal arc protection plus the standard RCD protection delivers the required safety, and the AFDD adds nuisance-trip risk without proportionate benefit. Acceptance of the exemption requires documentary evidence — the manufacturer Declaration of Conformity to BS EN 61851 series, the connector conformity to BS EN IEC 62196-2, and the install file showing both."
          >
            <p>
              What the verifier checks to accept the AFDD exemption:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 61851 series conformity</strong> — manufacturer declaration,
                marking on the equipment, datasheet citation, or test report. Verbal
                assurance is not acceptance.
              </li>
              <li>
                <strong>BS EN IEC 62196-2 connector conformity</strong> — for any
                socket-outlet or vehicle connector incorporated in the EV charging
                equipment. Manufacturer documentation evidences the connector compliance.
              </li>
              <li>
                <strong>Documentation in the install file</strong> — both conformity
                declarations on file in the customer handover pack. A future verifier should
                be able to confirm the exemption from the file alone.
              </li>
              <li>
                <strong>Conventional protective measures still apply</strong> — RCD
                protection per Section 722 (Type A, Type B or equivalent depending on the
                charging duty cycle), overcurrent protection, automatic disconnection of
                supply. The AFDD exemption does not remove any other protection.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 722.421.1.7.201 (AFDD exemption, paraphrased)"
            clause={
              <>
                &quot;Regulation 722.421.1.7.201 states that AFDDs are not required for
                circuits supplying EV charging equipment conforming to the BS EN 61851
                series. In other words, where the EV charging equipment meets BS EN 61851
                requirements, the installation is exempt from the AFDD requirement
                referenced in this regulation.&quot;
              </>
            }
            meaning={
              <>
                The exemption is conditional. To accept the exemption under Reg
                722.421.1.7.201 the installer or verifier shall verify that the EV charging
                equipment conforms to the BS EN 61851 series and that any socket-outlet or
                vehicle connector incorporated in the EV charging equipment conforms to
                BS EN IEC 62196-2. Evidence may include manufacturer declaration of
                conformity, markings, datasheets or test reports demonstrating compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 722.421.1.7.201 — IET Wiring Regulations 18th Edition A4:2026."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Prohibited protective measures — Reg 722.410.3.5 / 722.410.3.6</ContentEyebrow>

          <ConceptBlock
            title="Four protective measures Section 722 forbids — and the alternatives"
            plainEnglish="Section 722 explicitly prohibits four protective measures inside its scope. Reg 722.410.3.5 prohibits obstacles and placing out of reach (the Section 417 measures). Reg 722.410.3.6 prohibits non-conducting location and earth-free local equipotential bonding. The reasoning in each case is that EV charging brings members of the public into electrical contact with the installation in conditions those four measures cannot safely manage. The acceptable measures are the conventional Part 4 set — automatic disconnection of supply with appropriate RCDs, SELV / PELV where applicable, double or reinforced insulation."
            onSite="On site you do not normally see designs that propose any of the four prohibited measures because most modern EV charger designs use ADS plus RCD by default. But on bespoke commercial installations, particularly retrofits in unusual locations, the prohibited measures occasionally appear in initial design proposals and need to be challenged. The required action is direct — if a design or installation proposal for a location within Chapter 72 includes non-conducting location or earth-free local equipotential bonding as protective measures, the installer or design team shall revise the proposal to use permitted protective measures."
          >
            <p>
              Why each prohibition exists:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Obstacles</strong> — work by physically preventing inadvertent
                contact with live parts. EV charging requires deliberate connection of a
                cable, so an obstacle that prevents inadvertent contact also prevents
                deliberate connection. The protection model fails.
              </li>
              <li>
                <strong>Placing out of reach</strong> — works by separating live parts from
                the user by distance. EV charging cables are designed to be reached and
                handled, often at ground level. The protection model fails.
              </li>
              <li>
                <strong>Non-conducting location</strong> — works by ensuring the floor,
                walls and ceiling are insulating so that simultaneous contact between an
                exposed-conductive-part and earth is impossible. EV charging happens on
                ordinary driveways and forecourts which are not non-conducting. The
                protection model fails.
              </li>
              <li>
                <strong>Earth-free local equipotential bonding</strong> — works by bonding a
                local zone with no connection to the building earthing scheme. EV charging
                requires the vehicle, the cable and the charging equipment to share a
                protective-earth reference, which is the opposite of earth-free. The
                protection model fails.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 722.410.3.6 (prohibition, paraphrased)"
            clause={
              <>
                &quot;Regulation 722.410.3.6 sits in Chapter 72 (Part 7 — Special
                Installations or Locations). The prohibition that 'non-conducting location'
                and 'earth-free local equipotential bonding' shall not be used applies
                within the scope of Chapter 72 where this clause is cited (special
                installations or locations covered by Chapter 72).&quot;
              </>
            }
            meaning={
              <>
                The prohibition applies wherever Reg 722.410.3 is invoked — in practice,
                wherever Section 722 governs an EV charging installation. Designers must
                select alternative protective measures permitted within Chapter 72 and
                elsewhere in BS 7671 — typically protective earthing with ADS, RCDs at the
                rated residual operating current required by Section 722, and where
                applicable SELV / PELV. Reg 722.410.3.5 separately prohibits obstacles and
                placing out of reach (Section 417 measures) on the same rationale.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 722.410.3.6 and 722.410.3.5 — IET Wiring Regulations 18th Edition A4:2026."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The competence chain — OZEV, MCS-style schemes, Section 722</ContentEyebrow>

          <ConceptBlock
            title="OZEV authorised installer plus Section 722 plus Building Control"
            plainEnglish="EV charging in the UK sits inside a layered competence chain. OZEV (the Office for Zero Emission Vehicles) maintains an authorised installer list for grant-funded installs (workplace charging scheme, EV chargepoint grant for renters and flat-owners, and historically the Electric Vehicle Homecharge Scheme). Several IET- and NICEIC-style competence schemes operate in parallel for non-grant installs. BS 7671 Section 722 sets the electrical installation standard. Building Control (Part P in England and Wales, equivalent regimes elsewhere in the UK) covers the notification and inspection of domestic electrical work."
            onSite="On a typical domestic 7 kW install you will see all three regimes touch the work. The installing firm is on the OZEV-authorised list (or operates outside the grant route under a competence scheme). The L3 electrician applies Section 722 on site under the supervision of the firm's qualified person. The work is notified through the firm's registered Competent Persons Scheme to Building Control. The customer receives the EIC (Section 722 declaration), the OZEV / scheme certificate, and the Building Regs compliance certificate."
          >
            <p>
              Documentation that should be in the customer handover pack on every EV
              charger install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical Installation Certificate (EIC)</strong> — covers the
                electrical install per BS 7671 with a Section 722 declaration.
              </li>
              <li>
                <strong>Section 722 acceptance evidence</strong> — BS EN 61851 series
                conformity, BS EN IEC 62196-2 connector conformity, AFDD exemption
                justification per Reg 722.421.1.7.201.
              </li>
              <li>
                <strong>Reg 722.411.4 route documentation</strong> — for route (b),
                installation earth electrode resistance calculation per Annex A722.3 plus
                measured value; for route (d) or (e), device specification and trip-window
                evidence.
              </li>
              <li>
                <strong>RCD type and rating evidence</strong> — Section 722 requires Type A
                RCD as a minimum, with Type B (or equivalent) where the charging equipment
                does not include DC fault current detection.
              </li>
              <li>
                <strong>OZEV or scheme certificate</strong> — competence evidence for the
                installing firm.
              </li>
              <li>
                <strong>Building Regs notification</strong> — Part P (England and Wales) or
                equivalent.
              </li>
              <li>
                <strong>Photos of install and labels</strong> — supply isolator, RCD, MCB,
                charger label, supply tails sizing label.
              </li>
              <li>
                <strong>User manual</strong> — manufacturer documentation for the charger,
                the user app (where applicable), troubleshooting and emergency disconnection
                procedure.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using PME earthing directly on an outdoor charge point because the property is on TN-C-S"
            whatHappens={
              <>
                The installer reasons that PME is the property's earthing arrangement so it
                must be fine for everything on the property. Reg 722.411.4 is missed and the
                charging point's protective conductor contact is bonded straight to the PME
                MET. Under a normal day the install works perfectly. Under an open-PEN fault
                — a PEN failure in the street, a corroded joint, a third-party cable strike
                — the EV chassis rises toward line voltage while the driveway concrete stays
                at true earth. The customer or a passer-by touches the car body while
                standing on the driveway and experiences a potentially fatal shock. The
                Section 722 acceptance was missed and a serious incident has resulted.
              </>
            }
            doInstead={
              <>
                Apply Reg 722.411.4 from the start of the design. Pick one of routes (b),
                (d) or (e) and document the choice. Route (e) — built-in PEN-fault detection
                in a modern dedicated EV charger — is the most common modern answer for
                domestic installs. Route (b) — installation earth electrode — is the answer
                where the equipment does not have built-in detection or where the design
                prefers an independent earth reference. The scope of Reg 722.411.4 is
                clear — PME may not be used directly for outdoor charging on TN systems.
              </>
            }
          />

          <CommonMistake
            title="Skipping the AFDD because 'EV chargers are exempt' without checking BS EN 61851 conformity"
            whatHappens={
              <>
                The installer hears that EV charger circuits are AFDD-exempt and skips the
                AFDD without verifying that the equipment actually conforms to BS EN 61851
                series. The verifier accepts the install on verbal assurance. A future
                inspector challenges the AFDD exemption, asks for the BS EN 61851
                conformity evidence, and finds none in the file. The exemption fails
                acceptance and the install is recorded as non-compliant.
              </>
            }
            doInstead={
              <>
                Verify the BS EN 61851 series conformity before accepting the AFDD
                exemption. The acceptance rule is explicit — manufacturer
                declaration, marking, datasheet or test report. Verify the connector
                conformity to BS EN IEC 62196-2. File both pieces of evidence in the
                customer handover pack. The exemption is real but conditional — without
                conformity evidence it does not apply, and the install needs an AFDD or it
                fails Section 722 acceptance.
              </>
            }
          />

          <Scenario
            title="Domestic 7 kW EV charger install on a TN-C-S supply, modern dedicated charger"
            situation={
              <>
                You are installing a 7 kW dedicated EV charger on the outside wall of a
                three-bed semi. The property is on a TN-C-S (PME) supply with a 100 A
                main fuse. The customer parks on the driveway. The charger is a
                mainstream modern unit with a Declaration of Conformity to BS EN 61851
                series, a Type 2 connector conforming to BS EN IEC 62196-2, built-in
                Type B RCD on the charging output, built-in DC fault current detection,
                and a manufacturer Declaration that the unit satisfies Reg 722.411.4(e)
                by built-in PEN-fault detection within the 5-second window. The supply
                cable from the consumer unit is sized for 32 A (10 mm² Twin and Earth on
                the recommended installation method).
              </>
            }
            whatToDo={
              <>
                Start with the document check — the manufacturer Declaration of
                Conformity to BS EN 61851 (acceptance evidence for Reg 722.421.1.7.201
                AFDD exemption), the connector conformity to BS EN IEC 62196-2, and the
                Reg 722.411.4(e) declaration. File all three in the install pack. Apply
                Section 722 — the supply circuit gets a Type A or Type B RCD per the
                manufacturer recommendation (here Type B is built into the charger so
                upstream is Type A 30 mA RCD per Section 722 default), the AFDD is
                omitted under the documented exemption, and protective earthing applies
                via the PME MET because route (e) is satisfied by the built-in detection
                rather than via a route (b) electrode. Run the supply cable, terminate
                at the charger, terminate at the consumer unit, label the new circuit.
                Commission per the manufacturer guide — power up, run the self-test,
                verify the PEN-fault detection self-test passes, simulate a connect /
                disconnect cycle, confirm the unit reaches the network and the customer
                app pairs. Run the standard Section 722 inspection — continuity,
                insulation resistance, polarity, Zs, RCD trip times. Issue the EIC with
                the Section 722 declaration. Notify Building Control through the firm's
                Competent Persons Scheme. Hand the customer the documentation pack
                including the OZEV grant paperwork.
              </>
            }
            whyItMatters={
              <>
                Modern dedicated EV chargers make Section 722 compliance straightforward
                because the manufacturer has done the regulatory work — built-in
                PEN-fault detection (route e), Type B internal DC fault detection,
                BS EN 61851 conformity (AFDD exemption), BS EN IEC 62196-2 connector
                conformity. The installer applies Section 722 by selecting compliant
                equipment, terminating it correctly, recording the conformity evidence
                and running the standard inspection. The customer ends up with a safe
                install on a TN-C-S supply, with the open-PEN risk managed by built-in
                detection and the documentation chain complete for any future audit.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Section 722 of BS 7671:2018+A4:2026 covers every circuit intended to supply electric vehicles for charging — applicability is by design intent, not by current usage.",
              "On a TN-C-S supply the open-PEN risk threatens outdoor EV charging because the EV body sits at PME potential while the surrounding ground stays at true earth — touch voltage between the two can be lethal.",
              "Reg 722.411.4 prohibits direct use of PME earthing for outdoor EV charging on TN systems and sets four alternative routes (b) to (e) — installation earth electrode, voltage-window detection, alternative device or equivalent functionality in the charging equipment.",
              "Annex A722 Item A722.3 sets the calculation route for the maximum permissible electrode resistance under route (b) — the electrode shall be low enough that MET-to-earth voltage stays at most 70 V RMS under PEN open-circuit.",
              "Route (d) requires a discrete device that monitors line-to-neutral voltage and disconnects within 5 seconds if voltage moves outside the 207 V to 253 V window.",
              "Reg 722.421.1.7.201 exempts BS EN 61851 conforming EV charging equipment from the AFDD requirement — but documentary evidence of conformity is required for acceptance.",
              "Reg 722.410.3.5 and 722.410.3.6 prohibit obstacles, placing out of reach, non-conducting location and earth-free local equipotential bonding for EV charging — alternative protective measures must be selected.",
              "OZEV authorised installer schemes and BS 7671 Section 722 work together — competence schemes prove the firm is competent, Section 722 sets the electrical standard, Building Control covers the notification chain.",
            ]}
          />

          <Quiz title="Section 722 EV charging, Open-PEN and Reg 722.411.4 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.3 Section 712 PV deep + G98/G99
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Section 753 heating + heat pump regulatory chain
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
