/**
 * Module 4 · Section 4 · Subsection 5 — Rectification reporting, variation orders, repair certs + customer comms
 * Maps to C&G 2365-03 / Unit 303 / LO6 / AC 6.4 + LO7 / AC 7.1, 7.2
 *   AC 6.4 — "report on diagnostic findings using appropriate documentation"
 *   AC 7.1 — "explain the purpose of variation orders / repair certificates"
 *   AC 7.2 — "communicate findings, repairs and recommendations to the customer"
 *
 * Frame: once the fault is diagnosed and the engineering decision is made,
 * the work has to be documented, varied (if it differs from the original
 * brief), certificated (Minor Works or amended EIC), and explained back to
 * the customer in language they can use to make further decisions. This is
 * the closing-out discipline that turns a diagnostic visit into a
 * defensible record + a satisfied customer.
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
  'Rectification reporting + variation orders + repair certs (4.5) | Level 3 Module 4.4.5 | Elec-Mate';
const DESCRIPTION =
  'Closing out a fault diagnosis job — write up the rectification, raise a variation order if scope has changed, issue the right certificate (Minor Works or amended EIC), and brief the customer in language they can act on. The discipline that turns a diagnostic visit into a defensible record.';

const checks = [
  {
    id: 'mod4-s4-sub5-rectification-record',
    question:
      "What's the minimum content of a rectification report after a fault diagnosis job?",
    options: [
      "A rotary cable stripper (Jokari Quadro, Knipex 16 95 02, BAHCO 4490) — sized to the SWA outer diameter, runs around the sheath cleanly and removes a length to expose the armour without scoring the inner cores. Stanley knives can do it but the risk of scoring the inner is high; rotary strippers are the standard. For the armour itself — separate tool (armour shears for smaller, angle grinder for bigger) covered in Sub 1.2.",
      "Without storage, surplus PV (generated when the property is not consuming it — typically midday) exports to the grid at the Smart Export Guarantee rate (typically 5-15 p/kWh). With storage, surplus PV charges the battery and discharges to the property in the evening, displacing import at the much higher import rate (typically 25-35 p/kWh). The PV-to-property utilisation rate rises from typically 20-40 percent self-consumption (PV-only) to 60-90 percent (PV plus battery). This is the single biggest financial driver for adding battery storage to an existing PV install.",
      "Six items: (1) the customer's reported symptom in their own words, (2) the diagnostic steps taken with instrument readings, (3) the root cause identified, (4) the rectification carried out (parts replaced, terminations re-made, settings adjusted), (5) the post-rectification verification readings (R1+R2, IR, Zs, RCD trip times as applicable to the work), (6) any residual concerns or recommendations for further work. Without those six, the record won't defend the firm if the customer later disputes or if the issue recurs.",
      "AFDDs offered per Reg 421.1.7 advisory wording. Customer accepted on bedroom socket ring, lounge socket ring and kitchen socket ring (engineering benefit strongest on socket circuits with mixed appliance use and aged flex). Customer declined on dedicated single-load circuits (shower, EV, heat pump) and lighting (LED on fixed wiring, no flex). Documented in the design pack.",
    ],
    correctIndex: 2,
    explanation:
      "The rectification record is your evidence that the work was diagnosed properly, fixed competently, and verified before leaving site. Skipping any of the six items leaves a gap a future complaint will exploit. The post-rectification readings are particularly important because they prove the fix actually worked — not just that something was changed.",
  },
  {
    id: 'mod4-s4-sub5-variation-order',
    question:
      "When does a variation order (VO) need to be raised mid-job?",
    options: [
      "The incongruence between calm words and stressed body language suggests the client is suppressing significant frustration or anxiety. The project manager should: acknowledge the difficulty of the situation empathically (\\\\\\\"I can see this is a stressful situation, and I understand why\\\\\\\"), address the emotional undercurrent rather than just the facts, and create space for the client to express genuine concerns — because unaddressed suppressed emotions often escalate",
      "PNB stands for Protective Neutral Bonded — it is the updated terminology for the earthing arrangement historically called TN-C-S or PME (Protective Multiple Earthing) in UK practice. The terminology change is aligned with international standards and clarifies the protective bonding role of the combined PEN conductor at the property. The technical arrangement is the same as before; the name is new. A4:2026 has updated cross-references throughout BS 7671 — including in Section 722 — to use PNB alongside the older PME term during the transition. As an L3 apprentice from 2026 onwards you should recognise both terms and understand they refer to the same arrangement.",
      "Whenever the work scope departs from the original quote or instruction. Examples — quote was for replacing one tripping RCBO but on investigation you find the upstream cable has a HRJ that needs splicing too; quote was for kitchen socket fault but you discover the ring is broken in two places; quote was £180 and the actual fix is £450. The VO captures (a) what changed and why, (b) the new cost, (c) customer authorisation in writing or text. No VO = no authority = customer can refuse to pay the difference and the firm wears the loss.",
      "Section 7(a) — to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work. Section 7(b) — to co-operate with their employer (and any other person under a duty) so far as is necessary to enable that duty to be performed. These are personal statutory duties that apply to every operative on site, including apprentices.",
    ],
    correctIndex: 2,
    explanation:
      "VOs protect the firm commercially and the customer practically. They prevent the 'I never agreed to that' dispute. The standard format is short — what changed, why it changed, new price, customer signature or text confirmation. On a domestic call-out, a quick 'OK to proceed?' text from the customer is enough; on a commercial job, a signed VO form is the norm.",
  },
  {
    id: 'mod4-s4-sub5-cert-choice',
    question:
      "You replaced one tripping RCBO and re-made two terminations on a kitchen radial. What certificate do you issue?",
    options: [
      "Minor Works Certificate (MWC) — the work is an alteration / addition to an existing circuit (re-terminations, device swap) that doesn't constitute a new circuit. MWC covers the circuit altered, the tests performed (continuity of CPC and ring conductors as applicable, IR, Zs, RCD trip time on the replaced device), the conclusion that the circuit complies with BS 7671 after the work. If your work had been a new circuit you'd issue an EIC; if you were re-inspecting an existing installation you'd issue an EICR; for an alteration to one circuit, MWC is the right choice.",
      "BS 5266-1 monthly self-test (push the panel test button) AND annual 3-hour discharge test (simulate mains failure for 3 hours, verify illumination throughout). The 3-hour test is the definitive functional verification — confirms battery capacity, lamp operation, switching circuit. After fault rectification on an EL system, perform a 1-hour discharge test as minimum (verifies switching + lamp operation; full battery capacity confirmed at next annual test). Document on the EL log book.",
      "Propose a scope that includes everything that can be safely tested live (visual inspection, thermographic survey of switchgear, RCD test buttons, live tests on circuits where safe to do so) and clearly excludes what cannot be tested without isolation, recording the exclusion under Limitations with the recommendation that the duty holder schedule a planned outage for full testing within an agreed period. Note any FI for items the live-only inspection cannot fully verify.",
      "The type-test certificate is the manufacturer's evidence — issued by an accredited test lab — that the inverter model has been tested to the EREC G98 / G99 / EN 50549 protection requirements. It records the LoM detection method (ROCOF, vector shift, hybrid), the trip thresholds for over-voltage / under-voltage / over-frequency / under-frequency, the disconnection time, and the recovery delay. The DNO accepts the type-test certificate at face value — they do not retest each inverter on each install. Without a current type-test certificate, the DNO will refuse to accept G98 / G99 notification and the install cannot legally export.",
    ],
    correctIndex: 0,
    explanation:
      "BS 7671 Reg 644.1 makes the certificate mandatory after any work that alters or extends an installation. The MWC is the right form for single-circuit alterations / additions / repairs. The EIC is for new installations; the EICR is for periodic inspection. Issuing the wrong form (or none) is a Reg 644 breach and a scheme provider compliance issue.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Why does the rectification report need to capture the customer's reported symptom verbatim, not paraphrased?",
    options: [
      "The EIC carries the standard schedule of inspections and schedule of test results for the new circuit(s). For a PV install that includes the DC string circuits (with DC voltages and DC IR test results), the AC isolator and AC final connection back into the consumer unit, the labelling and signage at every isolation point, and the dual-supply warning at the consumer unit. Section 712 of BS 7671 (extensively revised in A4:2026) drives the inspection items. The 'designer' / 'constructor' / 'inspector and tester' boxes on the EIC may all be the MCS-certified installer's lead engineer; signatures still have to be physically present.",
      "Three reasons. (1) Verbatim records the customer's actual experience — useful if the fault recurs and the customer reports it slightly differently second time. (2) Protects the firm if the customer later claims they reported something else (e.g. they said 'lights flicker', you wrote 'one bulb intermittent', they later claim they reported a serious shock hazard). (3) Helps future diagnosis if a different engineer attends — the original symptom in the customer's words is more useful than your interpretation. Standard practice — quote the customer in inverted commas on the job sheet, then your interpretation underneath.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      "The refrigerant charge weight in CO2-equivalent tonnes (calculated as charge weight in kg multiplied by the refrigerant's global warming potential, divided by 1000). Under the F-Gas Regulations, equipment containing 5 tonnes CO2e or more requires a mandatory annual leak check; 50 tonnes or more requires six-monthly; 500 tonnes or more requires three-monthly. Most domestic ASHPs running R-32 or R-290 sit below the 5-tonne CO2e mandatory threshold (R-290 propane has a GWP of just 3, so even substantial charges fall well short). Manufacturer warranty often requires annual checks regardless of the regulatory threshold.",
    ],
    correctAnswer: 1,
    explanation:
      "The customer's words are the only objective record of what they actually reported. Your interpretation is an inference; their words are evidence. On any dispute that lands in court or insurance, the verbatim record is what the firm relies on. Quote them; date and time the entry; include the medium (phone call, on-site, text).",
  },
  {
    id: 2,
    question:
      "A customer authorises extra work verbally on site but refuses to sign anything. What do you do?",
    options: [
      "Scope 2 emissions for any UK business that draws grid electricity have fallen sharply over the last decade because the carbon intensity of the grid has fallen — from around 500 gCO2/kWh in 2012 to around 200 gCO2/kWh in recent years (varies year-to-year with weather, gas prices and renewables output). A business that has not changed its electricity consumption at all has nonetheless seen its scope 2 emissions roughly halve over that period, simply because the grid has decarbonised. Switching to a renewable electricity tariff (with verifiable certificates of origin) can drive scope 2 lower still under the market-based reporting method.",
      "The BUS is the current main UK government grant for low-carbon heating retrofits — currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and lower amounts toward biomass boilers in eligible properties. The grant is administered by Ofgem and paid to the MCS-certified installer who passes it through to the customer as a price reduction. Eligible properties: existing dwellings (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC. The grant has been extended several times and is currently confirmed through the late 2020s.",
      "Three-step protection. (1) Do the work only if you're satisfied the verbal authorisation is genuine and you have a witness or recorded confirmation. (2) Send the customer a text or email immediately summarising — 'You authorised the additional repair to the kitchen ring at £180, total job now £350, please reply YES to confirm'. (3) If they don't reply within a reasonable time, follow up by phone and document the conversation. The combination of in-person authorisation + written summary + customer reply gives the firm enough evidence to invoice and defend the charge. If you can't get any written trail, walk away from the extra scope.",
      "Load management is doing its job. The CT clamp on the main supply detects the rising property total when the heat pump enters defrost cycle or fast-heat mode (drawing 3-7 kW) and the charger throttles its own draw to keep the total below the configured limit (typically the main-fuse rating). This is the design intent — better to throttle the charger temporarily than to trip the cut-out. The customer should be briefed on this at handover so the slowdown is not interpreted as a fault.",
    ],
    correctAnswer: 2,
    explanation:
      "Verbal authorisation alone is risky. The text-summary protocol turns a verbal agreement into a defensible written record without requiring the customer to sign anything formal — which many domestic customers resist. The customer's reply (even a thumbs-up emoji) is enough evidence. Keep the messaging within professional channels (firm phone, business email) — personal WhatsApp loses you evidential weight.",
  },
  {
    id: 3,
    question:
      "After repairing a single faulty switch on an existing lighting circuit, what tests do you carry out before issuing the MWC?",
    options: [
      "Because it covers the whole work activity (not just the install), it covers operation, use AND maintenance, AND it covers work NEAR a system as well as on it. So it's the legal hook for safe-isolation procedures, lock-off, voltage-proving, and the way you organise the work around live equipment that you're not directly working on. Reg 4(3) is what the HSE charges most often after an electrical incident.",
      "Stop, raise the conflict politely, and ask for the change in writing. The method statement is the documented safe system of work. A verbal instruction to depart from it needs a documented reason, ideally a revised method statement signed off by whoever owns the original. If the supervisor refuses to put it in writing, that itself is a red flag — escalate via your employer's safety route. HASAWA s.7 makes you personally responsible for following the safe system; 'I was told to' is not a defence to a prosecution.",
      "Clamping around BOTH conductors (L AND N together) when measuring LOAD current. The clamp reads imbalance — for load current you want one conductor only (L OR N, not both). Reading shows zero or near-zero, apprentice assumes 'no load', misses the actual current. Conversely, when measuring earth leakage, you DO clamp L AND N together (the imbalance IS the leakage). The two use cases are mutually exclusive — load = one conductor, leakage = both conductors. Apprentices learn this in week one and re-learn it every time they pick up a clamp.",
      "Standard MWC test set on the affected circuit: (a) continuity of CPC at the switch (R2 or R1+R2 if accessible), (b) IR L–E and N–E with switch closed and lamps removed (or 250 V test if electronics present and you can't remove them), (c) polarity at the switch and at the lamp positions, (d) Zs at the switch (or at the lamp position with no-trip mode if RCD-protected), (e) RCD trip time at the upstream RCD if the lighting circuit is RCD-protected. Record each on the MWC. The work was small but the verification has to confirm the affected circuit is still BS 7671 compliant.",
    ],
    correctAnswer: 3,
    explanation:
      "The MWC test set is proportionate to the work — but always includes continuity, IR, polarity, Zs and (where applicable) RCD trip time on the affected circuit. The principle is — verify the work hasn't introduced or left a fault. A swap that looks trivial may have disturbed an adjacent termination; the test set catches it.",
  },
  {
    id: 4,
    question:
      "The customer is non-technical and wants to understand 'what was wrong' after a fault repair. What's the right way to brief them?",
    options: [
      "Three-part brief in plain English. (1) WHAT WAS HAPPENING — 'Your kitchen RCBO was tripping because there was a small earth leak from a damaged terminal in the ceiling rose'. (2) WHAT WE DID — 'We replaced the damaged terminal, re-tested the circuit, and confirmed the leak is gone'. (3) WHAT TO WATCH FOR — 'If the breaker trips again in the next month, give us a call straight away — that would suggest a related issue we should investigate'. Plus a written summary on the job sheet / certificate. The customer leaves understanding the fault, the fix, and what to do if it returns.",
      "Because primary copper smelting from ore is one of the most energy-intensive industrial processes globally. Recycled copper requires roughly 15-20% of the energy of primary copper to produce, which translates to a corresponding reduction in embodied carbon for the conductor portion of the cable. Cable is overwhelmingly copper by mass (or aluminium for some larger sizes), so the conductor dominates the embodied carbon calculation. A high-recycled-content conductor is therefore one of the largest single levers for reducing cable embodied carbon at specification stage.",
      "Annual service is the standard, with weekly to monthly customer-side tasks. Annual: full strip-down clean, ash compartment service, auger inspection, igniter check, fan check, flue inspection, controls firmware update, performance check. Monthly customer task: empty ash pan. Weekly customer task: top up pellet hopper, check fuel feed, visual check for blockages. Pellet quality matters — high-ash or wet pellets shorten component life. Some boilers need flue cleaning more frequently than annual; chimney sweep is a specialist trade.",
      "Hourly rates typically £30-50/hr depending on college and qualification level taught. Sessional contracts (paid by hour or by class) for non-DET-qualified specialists; salaried contracts for DET-qualified lecturers (typically college Band 4-6, equivalent £28-42k pro-rata). Many electricians do part-time evening teaching alongside day-job electrical work — supplementary income plus the satisfaction of teaching.",
    ],
    correctAnswer: 0,
    explanation:
      "Customer briefing is part of the L3 competence — Reg 132.13 documentation is one half, the verbal brief is the other. Plain English means no jargon ('Type B 32 A RCBO with Z_s of 0.6 ohms' becomes 'the breaker that protects your kitchen circuit'). Tell them what to watch for so they can spot recurrence early. The written summary backs up the verbal brief.",
  },
  {
    id: 5,
    question:
      "What goes wrong if you skip the variation order on a job that grows in scope?",
    options: [
      "Structured cabling is the standardised installation of data cabling (typically Cat 6/Cat 6A copper, plus single-mode and multi-mode fibre) supporting IT and telephony in commercial buildings. Key standards: BS EN 50173 series, TIA-568. Specific competence in cable termination (RJ45, fibre splicing), patch panels, cabinet installation and certification testing (Fluke DTX-CableAnalyzer or similar). BICSI training is the international standard route.",
      "Five things. (1) Customer disputes the extra charge — firm has no signed authority and may have to write off the additional work. (2) Customer claims you did work they didn't authorise — even safety work the firm correctly deemed necessary. (3) Insurance dispute if the additional work later contributes to a problem — without authorisation paperwork, scope is ambiguous. (4) Scheme provider audit picks up the discrepancy between original quote and final invoice. (5) The relationship breaks down — customer feels stitched up, firm feels unappreciated, future work goes elsewhere. The 5-minute VO conversation prevents all five.",
      "Most HASAWA offences are triable either way — the prosecution chooses Magistrates' (summary) or Crown (indictment). Magistrates' Court can impose unlimited fines on H&S offences (since 2015) and up to 6 months imprisonment. Crown Court can impose unlimited fines and up to 2 years imprisonment for individuals (longer for some related offences like Corporate Manslaughter — life). The Sentencing Council Definitive Guideline applies in both courts.",
      "Building Control is the local-authority enforcement of the Building Regulations. For most environmental tech installs the route is via a competent-person scheme (the installer's firm is registered with NICEIC / NAPIT / similar, and self-certifies the work) — Building Control is notified by the scheme but doesn't visit. For non-notifiable work (e.g. some maintenance) Building Control isn't involved. For installs that fall outside competent-person schemes, or for major works, Building Control may inspect on-site. The customer receives a Building Regs compliance certificate — either from the competent-person scheme or from Building Control directly.",
    ],
    correctAnswer: 1,
    explanation:
      "VOs are 5 minutes of awkward conversation that prevent hours of dispute later. The standard format is short — 'while I was investigating I found X, which needs Y, additional cost £Z, OK to proceed?'. Customer says yes or no. Document the conversation. Proceed or revert. Skipping the VO is the most common cause of small-job disputes.",
  },
  {
    id: 6,
    question:
      "What's the difference between an MWC and an EIC, and why does that matter for a repair job?",
    options: [
      "Explain clearly that refrigerant work is restricted by law to F-Gas-certified persons under the F-Gas Regulation. If the unit feels less effective they should call the original installer or an F-Gas certified service company who will leak-test and re-charge as needed. Topping up a refrigerant circuit DIY is illegal, dangerous (some refrigerants are A2L mildly flammable and R-290 is A3 flammable), and would void the warranty. The cost of professional service is small relative to the cost of an uncovered failure.",
      "This is a strong micro-hydro site. With 30 m head and 100 l/s flow, theoretical hydraulic power is approximately ρ × g × h × Q = 1000 × 9.81 × 30 × 0.1 ≈ 29 kW. After turbine and generator efficiency (typically 70-85%) the realistic output is 20-25 kW continuous — significant baseload renewable energy. Practical issues: SEPA (Scottish equivalent of Environment Agency) abstraction licensing, fish-friendly intake design, civils for weir / intake / penstock / power-house, grid connection (G99 for an installation of this size), and the cost of a buried cable from the power-house to the property. The right site is rare; where it exists, micro-hydro outperforms PV and wind by a wide margin on capacity factor.",
      "MWC (Minor Works Certificate) — for additions or alterations to an existing circuit that don't constitute a new circuit. Single-page form, covers one circuit. Used for socket additions, light-fitting swaps, repair of damaged terminations, replacement of single accessories or devices. EIC (Electrical Installation Certificate) — for new installations or major works including new circuits, full CU upgrades, substantial rewires. Multi-page form with full Schedule of Inspections and Schedule of Test Results. For a single-circuit fault repair, MWC is the right form. Issuing an EIC would be over-certification (and may misrepresent the scope of work to the customer / scheme provider).",
      "Two possibilities. (1) Active arc fault on the circuit — there's a real arc happening that the AFDD is correctly detecting and refusing to ignore. Investigate as a real fault: visual inspection, IR test, thermal imaging. (2) AFDD itself has failed in the 'trip' state — internal electronics fault. Test by removing the AFDD from the busbar (load disconnected) and trying to latch it; if it still won't latch, the AFDD is faulty and needs replacement. The L3 apprentice's protocol: investigate as real fault first; only if no fault is found, consider AFDD failure and substitute with known-good unit.",
    ],
    correctAnswer: 2,
    explanation:
      "Choosing the right certificate matters for legal and practical reasons. MWC is fit-for-purpose for repairs and small alterations; EIC is for substantive new work. Issuing the wrong form mis-describes the scope and may invalidate warranty / insurance / scheme registration. Reg 644.1 makes certification mandatory after any installation work; the choice of form follows the nature of the work.",
  },
  {
    id: 7,
    question:
      "A customer asks you to write 'no fault found' on the certificate after you've genuinely been unable to reproduce a reported intermittent fault. What's the professional response?",
    options: [
      "Battery hazards are different from AC hazards: (1) DC shock — once your hand is on a DC busbar, your muscles can't release because there's no zero-crossing — DC at 60 V upward is treated as a let-go hazard; (2) hydrogen gas — lead-acid cells gas during charge, hydrogen accumulates in poorly-ventilated rooms, explosive at 4% LEL — battery rooms have forced ventilation for this reason; (3) electrolyte — sulphuric acid contact with skin / eyes — face shield, acid-resistant gloves, eye-wash station; (4) thermal runaway — a damaged or shorted cell can catch fire, with toxic fumes; (5) short-circuit current — a 100 Ah lead-acid string can deliver 5–10 kA short-circuit, enough to weld a spanner.",
      "Three layers. (1) The Regulatory Reform (Fire Safety) Order 2005 makes the 'responsible person' (usually the building owner or appointed M&E manager) the only person who can authorise putting the alarm panel into 'engineer test' or 'isolated' mode — you cannot do it on your own initiative. (2) BS 5839-1 requires a fire watch be in place during the isolation to maintain life-safety cover, and the work is logged in the fire log book. (3) BS 5266 / BS EN 50172 require emergency lights have a 3-hour duration AND a 24-hour recharge after a full discharge — if your isolation drains the lights, you've left the building outside its compliance for the recharge window, which is a separate notifiable event.",
      "Stop them and verify they understand what's locked off and why. Show them your padlock and tag. Confirm they're not about to remove your lock or restore your circuit. If they need to do work that affects YOUR isolation (e.g. they're investigating the busbar), the work must coordinate — both operatives' locks stay on, both operatives complete their work, both operatives remove their own locks. The 'multi-lock hasp' (Brady 65681 takes 6 padlocks) is designed for this — multiple operatives, one device, no operative removes their lock until they're personally finished.",
      "Document honestly and helpfully. The certificate / report should say something like — 'Reported intermittent symptom: customer reports lighting circuit dimming when kettle is used. On site investigation today: no fault reproduced under current conditions, all tests within BS 7671 limits, full readings as Schedule. Recommendation: customer to record date / time / conditions of any future occurrence and contact us; we will return for further investigation under fault conditions if necessary. No charge for this visit.' That's honest, defensible, and leaves the door open. 'No fault found' alone is too brief and may be challenged later.",
    ],
    correctAnswer: 3,
    explanation:
      "Intermittent faults are the hardest to diagnose precisely because they may not present during the visit. The professional response is to document what you DID find (all tests within limits) AND what you DIDN'T find (the reported symptom didn't reproduce), recommend the customer captures recurrence data, and invite them back if it returns. That's a defensible record and a fair customer relationship.",
  },
  {
    id: 8,
    question:
      "Why does a repair certificate need to identify the specific instrument used (make, model, serial number, last calibration date)?",
    options: [
      "Three reasons. (1) BS 7671 Reg 643.2 requires the test instruments to be appropriate to the test and in calibration — you have to be able to evidence that. (2) If the test result is later disputed (insurance, EICR follow-up, court), the instrument identification lets independent verification of calibration certificate and instrument capability. (3) Scheme providers (NICEIC, NAPIT, Stroma) audit certificates and look for instrument identification as evidence of competent practice. The standard fields are make + model + serial + last calibration date — usually pre-printed onto the certificate template by the firm's certification software.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712 plus MCS MIS 3002 plus the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property before they start touching things.",
      "No, for several reasons. The refrigerant work requires F-Gas certification (criminal offence to do without). The Building Regulations Part L compliance pathway requires installation by an MCS-certified installer for the customer to claim Smart Export Guarantee or similar incentives. The Boiler Upgrade Scheme grant requires MCS sign-off. Manufacturer warranties typically require certified installation. The MCS install pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule, commissioning records — all required for the system to perform as designed. DIY heat-pump install is unsafe and uneconomic.",
      "Visual inspection happens at stage 1 (collect symptoms) and is structured. Look for: (1) Signs of past faults — scorched terminals, blackened insulation, soot marks, melted plastic, replaced fuses, taped joints. (2) Workmanship issues — over-stripped conductors visible at terminals, exposed conductors past the insulation, unfinished connections. (3) Environmental factors — water marks, condensation, dust accumulation, evidence of vermin, damaged cable runs. (4) System integrity — covers in place, accessories secured, signage current. The visual catches the easy 30% of faults before any instrument is used; the rest requires testing.",
    ],
    correctAnswer: 0,
    explanation:
      "The instrument record is the audit trail behind the test result. Without it, the result is your word against the world. Modern certification software (NICEIC Online, Easy Certs, ElectricalCert.app) auto-fills instrument data from the firm's instrument register so the apprentice doesn't have to remember — but you should still verify the right instrument is recorded for the work you actually did.",
  },
];

const faqs = [
  {
    question: "Do I have to issue a certificate for every repair, even tiny ones?",
    answer:
      "Yes, in principle. BS 7671 Reg 644.1 requires certification for any addition or alteration to an installation. A repair that involves disturbing terminations, swapping a device, or otherwise altering the installation falls within that — and the right form is usually a Minor Works Certificate. The exception is genuinely like-for-like maintenance on equipment (e.g. swapping a blown lamp) which doesn't alter the installation. If in doubt, issue an MWC — over-certification is a minor inconvenience, under-certification is a Reg 644 breach.",
  },
  {
    question: "What's the practical difference between a verbal customer brief and a written one?",
    answer:
      "Both are needed. Verbal brief — happens at the end of the visit, customer present, plain English explanation of what was wrong, what you did, what to watch for. Helps the customer understand and feel informed. Written brief — typically the back of the MWC or a separate job summary, captures the same content for the customer's records and for the firm's audit trail. Verbal alone forgets within hours; written alone feels impersonal. The combination — verbal at handover, written on the certificate / job sheet — is professional standard.",
  },
  {
    question: "How do I price additional work mid-job without sounding like I'm gouging?",
    answer:
      "Honest, transparent, and timed before doing the work. 'I've had a look and the fault is more involved than the quote — instead of just the RCBO swap, I need to investigate the upstream cable. Best estimate is another £180 for the investigation; if it leads to additional work I'll quote that separately before doing it. OK to proceed?' Customer says yes or no, you proceed or revert. The transparency removes the gouging perception. Quoting after the fact is what creates disputes; quoting before is what builds trust.",
  },
  {
    question: "What if the customer refuses to authorise additional work that's actually a safety issue?",
    answer:
      "Document the refusal carefully and consider escalation. Standard wording for the certificate: 'Additional remedial work recommended: [describe]. Customer declined to authorise on date [X]. Customer briefed on the implications, including [briefly the risk]. Existing installation remains in service at customer's election.' If the issue is C1 (immediate danger), the firm should consider whether to make safe (isolate the affected circuit) regardless of the customer's preference — and document why. EAWR Reg 4(2) puts the duty on the duty holder, but the firm has its own EAWR Reg 16 competence duty if it leaves a known danger in service.",
  },
  {
    question: "Can a customer's text reply count as authorisation for a variation?",
    answer:
      "Yes, in most domestic and small commercial contexts. The legal test is whether the customer made an informed agreement to the additional work. A clear text — 'You authorised the additional kitchen ring repair at £180, total now £350, please reply YES to confirm' followed by 'YES' from the customer — is contractually sound. Larger commercial contracts may require a formal signed VO form per the contract terms. For everything else, a clear text exchange archived on a business phone is sufficient evidence.",
  },
  {
    question: "What if I find another fault while fixing the one I was called for?",
    answer:
      "Three options depending on the seriousness. (1) Trivial finding (e.g. a cracked accessory plate) — note on the job sheet, brief the customer verbally, no immediate action. (2) Significant finding (e.g. an undersized CPC on an adjacent circuit) — stop, brief the customer, raise a VO if they want it addressed now or a separate quote if they want it later, document either way. (3) Immediate danger (e.g. a live exposed conductor in a junction box) — make safe immediately (isolate the circuit, don't leave the danger in service), brief the customer urgently, document the make-safe and the recommended remediation, escalate to your supervisor. The L3 apprentice is competent to identify and report; the supervisor / qualified electrician makes the final call on what to do beyond making safe.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 5"
            title="Rectification reporting + variation orders + repair certs + customer comms"
            description="Closing out a fault diagnosis job — write up the rectification, raise a variation order if scope has grown, issue the right certificate (Minor Works or amended EIC), and brief the customer in language they can act on. The discipline that turns a diagnostic visit into a defensible record + a satisfied customer."
            tone="emerald"
          />

          <TLDR
            points={[
              "A rectification record needs six items: customer's verbatim symptom, diagnostic steps with readings, root cause, work done, post-work verification readings, residual concerns. Skipping any leaves a defence gap.",
              "Variation orders are mandatory whenever scope departs from the original quote. Text-message authorisation is fine for domestic; signed VO for commercial. No VO = no authority = customer can refuse to pay.",
              "Single-circuit alterations / repairs need a Minor Works Certificate. EIC is for new installations; EICR is for periodic inspection. Wrong form = Reg 644 breach.",
              "Customer brief is verbal at handover + written on the certificate. Plain English: what was wrong, what we did, what to watch for. Reg 132.13 documentation is the legal half; the verbal brief is the relationship half.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Produce a rectification report covering symptom, diagnosis, root cause, work performed, verification readings, and residual recommendations.",
              "Raise a variation order when work scope departs from the original quote and capture customer authorisation in a defensible form.",
              "Select the appropriate certificate (Minor Works Certificate, amended EIC, EICR) based on the nature of the work performed.",
              "Carry out the proportionate test set after a repair (continuity, IR, polarity, Zs, RCD trip times) and record results on the certificate.",
              "Brief the customer verbally at handover in plain English — what was wrong, what was done, what to watch for.",
              "Document customer refusal to authorise recommended work, with brief on implications and escalation route where the issue is a safety risk.",
              "Apply Reg 132.13 documentation duties to repair work — circuit chart updates, test method notices, recommended next inspection date.",
              "Identify the instrument used on the certificate (make / model / serial / last calibration) per Reg 643.2 and scheme provider audit requirements.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The rectification record — what good looks like</ContentEyebrow>

          <ConceptBlock
            title="Six items, every rectification, every time"
            plainEnglish="The job's not done when the fault is fixed — it's done when the record is complete. A rectification record that defends the firm in any future dispute and supports any future engineer attending the same installation has six fixed items. Skip any one and the record's got a hole."
            onSite="Use a job-sheet template that prompts for all six. Most firms' diagnostic software (ServiceM8, Tradify, ElectricalCert.app, Powered Now) builds them into the workflow so you can't forget. If you're on paper, write a six-row template at the top of every job sheet and tick off as you go."
          >
            <p>The six items in order:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reported symptom — verbatim.</strong> The customer's own words in inverted commas. "Lights flicker when fridge starts" not "intermittent lighting issue".
              </li>
              <li>
                <strong>Diagnostic steps with readings.</strong> What you did, in order, with the instrument readings. "1. Visual inspection at CU — RCBO 4 (kitchen ring) labelled tripped; 2. R1+R2 at furthest socket = 0.62 Omega expected; 3. IR L-E = greater than 200 MOhm; 4. Zs at furthest socket = 0.65 Omega — pass."
              </li>
              <li>
                <strong>Root cause identified.</strong> What the actual fault was, why it caused the symptom. "Marginal crimp on CPC at socket position 3 — high R2 contribution under load caused breaker overload trip during fridge inrush."
              </li>
              <li>
                <strong>Rectification carried out.</strong> What you replaced / re-made / adjusted. "Re-made socket position 3 termination with hydraulic crimp tool. Replaced damaged grommet. Closed up enclosure."
              </li>
              <li>
                <strong>Post-rectification verification readings.</strong> The proof the fix worked. "Post-fix: R1+R2 at socket 3 = 0.55 Omega (was 0.85 Omega), Zs at furthest = 0.58 Omega (was 0.65 Omega), RCBO held under fridge inrush x 5 cycles."
              </li>
              <li>
                <strong>Residual concerns / recommendations.</strong> Anything you noticed but didn't fix. "Customer to monitor; if breaker trips again within 30 days, contact us. Recommend EICR within next 12 months — installation is 22 years old and other circuits not within scope of today's visit."
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1 (Initial verification certification)"
            clause="On completion of any installation work, the person responsible for the work shall provide an Electrical Installation Certificate (EIC) or, in the case of an addition or alteration to an existing installation, a Minor Electrical Installation Works Certificate (MWC), to the person ordering the work."
            meaning={
              <>
                Reg 644.1 is the legal source of the certification duty. Any addition or alteration —
                including fault repair work — triggers the requirement to issue a certificate.
                The MWC is the right form for single-circuit alterations / repairs. The EIC is for
                new installations or significant new circuits. Issuing nothing — even on a small
                repair — is a Reg 644 breach.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Variation orders — protecting both sides</ContentEyebrow>

          <ConceptBlock
            title="When the job grows, the paperwork has to grow with it"
            plainEnglish="A variation order (VO) is a short written record that captures (a) what changed from the original quote, (b) why it changed, (c) what the new cost is, (d) the customer's agreement to proceed. Without a VO, the firm has no authority for the additional work and the customer can legitimately refuse to pay. With a VO, both sides are protected."
            onSite="Most disputes on small jobs come from missing VOs. The 5-minute conversation feels awkward at the time but prevents hours of argument later. Standard format is short — a sentence or two on what changed, the new price, customer's text reply confirming. On a domestic job, a quick text exchange is enough; on commercial, the firm's contract usually mandates a signed VO form."
          >
            <p>The standard VO content set:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Original scope and price.</strong> "Original quote: replace tripping RCBO on
                kitchen circuit, GBP 95 plus parts."
              </li>
              <li>
                <strong>Variation — what changed.</strong> "On investigation found high resistance
                joint on upstream cable at junction box J3, which is the underlying cause of the
                RCBO trip. Recommended additional work: re-make joint at J3."
              </li>
              <li>
                <strong>New scope and price.</strong> "Additional work: 1 hour labour plus parts =
                GBP 85. Total revised price: GBP 180 plus parts."
              </li>
              <li>
                <strong>Customer authorisation.</strong> Signature, text reply, or email confirming
                "OK to proceed". Date / time / medium recorded.
              </li>
              <li>
                <strong>Schedule impact.</strong> If the additional work pushes the job past the
                original time slot, note it (and re-confirm with the customer if it affects them).
              </li>
            </ul>
            <p>
              For the customer's text reply to count as authorisation, the firm's text needs to be
              clear and complete — not just "extra work needed?" but "[describe], additional cost
              GBP X, total now GBP Y, please reply YES to authorise". The explicit yes / no makes
              the contract sound.
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

          <ContentEyebrow>Choosing the right certificate</ContentEyebrow>

          <ConceptBlock
            title="MWC vs EIC vs EICR — the three certificate decision"
            plainEnglish="There are three core BS 7671 certificate forms, and choosing the right one matters for legal, scheme-compliance, and customer-record reasons. MWC for single-circuit alterations and repairs. EIC for new installations or major new work. EICR for periodic inspection of an existing installation. Each has its place and they're not interchangeable."
            onSite="Most fault diagnosis work generates an MWC because you're altering an existing circuit (re-terminating, swapping a device, repairing a damaged section). New circuits or major rewires generate an EIC. Inspection visits generate an EICR. The form follows the nature of the work, not the firm's preference."
          >
            <p>Decision matrix for the typical fault-diagnosis outputs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-circuit fault repair (re-terminate, swap device, replace damaged section).</strong>
                Minor Works Certificate. Single-page form. Tests on the affected circuit only.
              </li>
              <li>
                <strong>Multiple-circuit repair on the same visit (e.g. two RCBOs failed).</strong>
                Multiple MWCs (one per circuit) OR a single MWC with both circuits referenced —
                check your firm's standard practice. Some scheme providers prefer one MWC per
                circuit for clarity.
              </li>
              <li>
                <strong>New circuit added (e.g. dedicated kitchen radial added during the repair visit).</strong>
                EIC for the new circuit. The new circuit is a fresh installation, not an alteration.
                MWC alongside if other existing circuits were also altered.
              </li>
              <li>
                <strong>Full CU upgrade (replacement of the consumer unit, new RCBOs, all circuits re-tested).</strong>
                EIC for the new CU and re-verified circuits. The CU upgrade is a substantive
                installation event.
              </li>
              <li>
                <strong>Inspection-only visit (no installation work, just verifying condition).</strong>
                EICR. Records condition with C1 / C2 / C3 codes. No installation work is permitted
                under an EICR scope without separate certification.
              </li>
              <li>
                <strong>"Make safe" only (isolated a dangerous circuit, no remediation yet).</strong>
                Job sheet with the make-safe described, plus an MWC if you altered the circuit
                (e.g. fitted a temporary blanking plate). Recommend EICR or further investigation
                in writing.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 651.3 (Periodic inspection and testing — safety and instruments)"
            clause="Periodic inspection and testing shall not cause danger to persons or livestock and shall not cause damage to property or equipment even if the circuit is defective. Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no less a degree of performance and safety."
            meaning={
              <>
                Reg 651.3 puts a positive duty on the inspector to use suitable instruments per BS EN 61557 (or equivalent), and to ensure inspection and testing does not cause danger or damage even if the circuit is defective. The certificate has to identify the specific instrument used — make,
                model, serial number, last calibration date. This is what lets the test results be
                trusted and audited. Most firms use certification software that auto-fills the
                instrument fields from the firm's instrument register; verify the right instrument
                is recorded for the actual work.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 65, Regulation 651.3."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                A repair is an alteration in scope of Reg 132.16. The documentation handed to
                the user — MWC, an updated circuit chart if anything changed, the customer brief
                in writing, manufacturer literature for new devices fitted — is the evidence that
                the rating and condition of the existing equipment was ascertained to be adequate
                for the altered circumstances. Without that pack, the user cannot discharge their
                ongoing EAWR Reg 4(2) maintenance duty and the next contractor cannot discharge
                their Reg 132.16 duty on the next change.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 — full text from published amendment."
          />

          <SectionRule />

          <ContentEyebrow>The customer brief — verbal + written</ContentEyebrow>

          <ConceptBlock
            title="The three-part plain-English handover"
            plainEnglish="The customer paid for a job and a story. The job is the fix; the story is what was wrong, what you did, and what they should watch for. A clear three-part brief at the end of the visit — in language the customer can repeat to a partner / family member — turns a transactional visit into a relationship."
            onSite="Standard structure: WHAT WAS HAPPENING (in their language), WHAT WE DID (in their language), WHAT TO WATCH FOR (one or two specific things). Two minutes at the end of the job. Then back it up with a written summary on the certificate or job sheet they get to keep."
          >
            <p>The three-part brief in worked example form:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>WHAT WAS HAPPENING.</strong> "Your kitchen breaker — the one labelled
                'kitchen ring' on the consumer unit — was tripping because there was a small earth
                leak from a damaged terminal in the ceiling rose at the back of the room. Once the
                fridge motor kicked in, the extra current pushed it over the edge and the breaker
                cut out for safety."
              </li>
              <li>
                <strong>WHAT WE DID.</strong> "We replaced the damaged terminal, re-tested the
                whole kitchen circuit, and confirmed the leak is gone. The breaker should now hold
                with all your normal kitchen appliances running."
              </li>
              <li>
                <strong>WHAT TO WATCH FOR.</strong> "If the breaker trips again in the next month —
                even just once — give us a call straight away. That would suggest there's a related
                issue we should look at. After 30 days without a trip, you can treat it as fully
                fixed."
              </li>
            </ul>
            <p>
              Add a written summary to the job sheet / MWC the customer keeps. Same three points,
              one line each. Reg 132.13 calls for the documentation to support the customer's
              ongoing safe use of the installation; the verbal + written brief is how that gets
              done in practice.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 132.13 documentation — what the customer leaves with"
            plainEnglish="Reg 132.13 puts a duty on the installer / inspector to give the user the information they need to operate, maintain, inspect and test the installation safely. After a repair this typically means a small documentation pack — the certificate, an updated circuit chart if anything changed, and the customer brief."
            onSite="Most domestic customers won't actively read the documentation pack but they will keep it. The duty is discharged by giving them the information; what they do with it is their EAWR Reg 4(2) ongoing-duty problem. Hand the pack over physically or email it as a PDF — get a confirmation either way."
          >
            <p>Standard documentation pack after a fault repair:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The MWC (or EIC).</strong> Including all required test results, instrument
                identification, signatory and date.
              </li>
              <li>
                <strong>Updated circuit chart, if applicable.</strong> If the repair changed
                anything about the circuit identification, RCD coverage, or device rating, update
                the chart at or near the consumer unit per Reg 514.9.
              </li>
              <li>
                <strong>Job summary / customer brief.</strong> The three-part brief in writing —
                what was happening, what we did, what to watch for.
              </li>
              <li>
                <strong>Recommended next inspection date.</strong> If the installation is
                approaching its next EICR (typically 10 years for owner-occupied domestic, 5 years
                for rented), note it and recommend timing.
              </li>
              <li>
                <strong>Any safety observations.</strong> Things you noticed but didn't fix,
                anything that warrants a follow-up quote, anything the customer should know about
                the wider installation.
              </li>
              <li>
                <strong>Manufacturer literature.</strong> If you fitted a new device (RCBO, AFDD,
                surge protector), include the manufacturer's user information. Most are downloadable
                PDFs you can email straight from the device datasheet page.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Doing extra work without raising a variation order"
            whatHappens={
              <>
                You're on a quoted fault repair (GBP 95 to swap a tripping RCBO). Mid-job you
                discover the upstream cable has a high-resistance joint that's the actual root
                cause. You think — "I'm already here, I'll just sort it out, it's only another
                hour" — and do the additional work without telling the customer. You invoice GBP
                180. Customer disputes, says they only authorised GBP 95. You can't evidence the
                authorisation for the extra work. Firm has to write off GBP 85. Worse — customer
                tells friends they got "an unexpected bill" and the firm loses two more potential
                jobs from the network effect. The 5-minute VO conversation would have prevented all
                of it.
              </>
            }
            doInstead={
              <>
                The moment you realise the scope has grown, stop and have the conversation. "I've
                had a look and the fault is more involved than the original quote. Instead of just
                the RCBO swap I need to re-make a joint upstream — best estimate is another GBP 85,
                total job GBP 180. OK to proceed?". Customer says yes or no. If yes, send a
                confirmation text from the firm phone "You authorised additional kitchen ring
                repair at GBP 85, total now GBP 180" and ask them to reply YES. Then proceed. The
                3 minutes of conversation + 1 minute of texting protects everyone.
              </>
            }
          />

          <CommonMistake
            title="Issuing no certificate because 'it was only a small repair'"
            whatHappens={
              <>
                You re-terminated a damaged socket. Hand over to the customer, take payment, leave.
                No certificate issued — "it's only a re-termination, not worth the paperwork". Six
                months later the socket fails again, customer claims you never repaired it
                properly, demands a refund. You have no evidence the repair was carried out
                competently — no test results, no instrument record, no description of work. Firm
                is on the back foot in any dispute. Scheme provider audit later picks up the
                missing certificate and the firm gets a non-conformance against its registration.
                Reg 644.1 was breached.
              </>
            }
            doInstead={
              <>
                Issue an MWC for any installation work. Modern certification software (NICEIC
                Online, Easy Certs, ElectricalCert.app, Stroma EasyCert) makes the MWC a 5-minute
                exercise — pre-fills installer / instrument / standard text, you fill in the test
                results and circuit details, customer signs (or you email them the PDF), done. The
                MWC is your evidence the work was carried out, tested, and verified. Without it,
                you have nothing.
              </>
            }
          />

          <Scenario
            title="Closing out a kitchen ring repair — the full handover"
            situation={
              <>
                Domestic call-out — customer reported "kitchen breaker trips when I use the kettle
                and toaster together". You arrived this morning, diagnosed a high-resistance joint
                on the kitchen ring at junction box behind the cooker, raised a variation order
                because the original quote was just for an RCBO swap (GBP 95) and the actual fix
                needed an extra hour of investigation and re-jointing (additional GBP 85, total
                GBP 180), customer agreed by text, you completed the work. Time to close out.
              </>
            }
            whatToDo={
              <>
                Five-step close-out. (1) Run the post-rectification test set — continuity of CPC
                from CU to furthest socket = R1+R2 0.55 Omega (was 0.85 Omega before fix), IR L-E
                greater than 200 MOhm, polarity correct at all sockets, Zs at furthest socket =
                0.58 Omega (well within Type B 32 A measured limit of 1.10 Omega), RCBO trip time
                at 1 x I delta n = 25 ms (well within 300 ms limit). Functional check — fridge,
                kettle and toaster all run together for 3 minutes without trip. (2) Issue the MWC
                — pre-fill from firm's certification software, instrument identification (Megger
                MFT1741+, last calibration date from instrument register), test results in the
                schedule, customer name, address, date, signatory. Email the PDF to the customer
                while still on site. (3) Update the firm's record — invoice now GBP 180 (matching
                the VO), MWC reference number, photos of the repaired joint, photos of the
                pre-fix and post-fix MFT readings. (4) Brief the customer verbally — three-part
                plain English: what was happening (high resistance at junction box overheated
                under load and pushed the breaker over), what we did (re-made the joint, re-tested
                the whole circuit), what to watch for (call us if it trips again in the next 30
                days). (5) Hand over the documentation pack — printed MWC + job summary +
                recommendation that the next EICR is due in approximately 6 years (installation is
                4 years from last EICR per the customer's records). Customer signs the job sheet
                acknowledging receipt of documentation and brief. Take payment. Leave site.
              </>
            }
            whyItMatters={
              <>
                The five steps turn a diagnostic visit into a closed-out job — defensible record,
                paid invoice, satisfied customer, scheme-compliant certification. Skipping any one
                step opens a gap. Skip the test set and you don't know the fix worked. Skip the
                MWC and you breach Reg 644. Skip the firm record update and the next engineer
                attending has no history. Skip the verbal brief and the customer doesn't
                understand. Skip the documentation handover and you breach Reg 132.13. Each step
                takes a minute or two; the combination is what L3 competence looks like at the
                close-out stage.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Refusal, escalation, intermittent faults</ContentEyebrow>

          <ConceptBlock
            title="When the customer refuses your recommendation"
            plainEnglish="Sometimes the customer says no — to additional work, to a recommended remediation, to the cost of a proper fix. Your job is to brief them on the implications, document the refusal, and decide whether the residual risk is acceptable to leave in service. For minor matters, document and move on. For safety risks, you may need to escalate or even decline to leave the installation in service."
            onSite="The standard wording on the certificate / job sheet captures the recommendation, the customer's response, and your professional position. This is your protection if anything goes wrong later."
          >
            <p>The standard refusal documentation pattern:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Recommendation made.</strong> "Recommended replacement of damaged junction
                box and re-routing of cable to current best practice."
              </li>
              <li>
                <strong>Customer's response.</strong> "Customer declined on cost grounds, requested
                like-for-like repair only."
              </li>
              <li>
                <strong>Implications briefed.</strong> "Customer briefed that the like-for-like
                repair restores function but the underlying installation issue (cable damage from
                previous DIY work) remains. Risk of recurrence cannot be eliminated without the
                recommended additional work."
              </li>
              <li>
                <strong>Decision and justification.</strong> "Like-for-like repair carried out as
                requested. Installation tested as functional and within BS 7671 limits at point of
                handover. Customer accepts ongoing risk and waives recommendation."
              </li>
              <li>
                <strong>Escalation if applicable.</strong> If the residual risk is C1 (immediate
                danger), the firm should not leave the installation in service even on customer
                request — make safe, document, escalate to senior. The customer's commercial
                preference does not override the firm's EAWR Reg 4 / 16 duties.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Photographic evidence — the audit trail that defends the firm"
            plainEnglish="Photos taken before, during and after a repair are the firm's strongest evidence in any dispute. They cost nothing to take, take seconds, and turn a verbal account into a documented record. Most modern certification software lets you attach photos directly to the job record."
            onSite="Standard photo set: pre-fix condition (the fault as you found it), instrument readings during diagnosis (MFT screen showing the bad reading), the fault component close-up (burnt terminal, damaged cable), the rectification in progress (re-made joint, replaced device), post-fix verification readings (MFT screen showing the good reading), and the final tidied state."
          >
            <p>What to photograph and why:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-fix condition.</strong> Establishes the starting state of the work.
                Useful if the customer later disputes what the installation looked like before
                you arrived.
              </li>
              <li>
                <strong>Instrument readings during diagnosis.</strong> Photo of the MFT screen
                showing the reading that identified the fault. Time-stamped evidence the test
                was actually carried out.
              </li>
              <li>
                <strong>Component fault close-up.</strong> Burnt terminal, broken conductor,
                damaged accessory — proves the fault existed and required the action you took.
              </li>
              <li>
                <strong>Rectification in progress.</strong> Re-made joint, replaced device,
                mid-installation. Demonstrates competent work practice.
              </li>
              <li>
                <strong>Post-fix verification readings.</strong> MFT screen showing the readings
                that confirm the fix worked. Pairs with the pre-fix instrument photos for a
                before / after evidential trail.
              </li>
              <li>
                <strong>Final tidied state.</strong> Closed-up enclosure, restored building
                fabric, cleaned work area. Shows the customer received a finished job.
              </li>
            </ul>
            <p>
              Store photos in the firm's job record system, not on personal phones. Most
              certification software (NICEIC Online, Easy Certs, ElectricalCert.app, ServiceM8)
              supports photo attachments. Photos taken on personal phones lose evidential weight
              and create data-protection issues.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The intermittent fault — when 'no fault found' is the honest answer"
            plainEnglish="Some faults won't reproduce during the visit. The honest professional response is to document the investigation, confirm what tests passed, recommend the customer captures any future occurrence with date / time / conditions, and offer a return visit if it recurs. 'No fault found' alone is too brief and may be challenged later — back it up with what you DID find."
            onSite="Intermittent faults are the L3 apprentice's hardest call. The temptation is to find SOMETHING to fix so the customer feels they got value. The professional discipline is to resist that urge — fixing the wrong thing may make the actual fault harder to diagnose later, and the customer ends up paying for unnecessary work."
          >
            <p>The intermittent-fault job-sheet wording:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reported symptom — verbatim.</strong> "Customer reports kitchen lighting
                circuit dims briefly when kettle is used. Symptom intermittent — not every kettle
                use, more common in evening."
              </li>
              <li>
                <strong>Investigation.</strong> "On site investigation between 10:00 and 12:00 today.
                Visual inspection of CU, kitchen lighting circuit and kettle circuit. Continuity
                tests on lighting CPC. IR tests. Zs at furthest lighting fitting. Functional test
                with kettle in use under typical load conditions."
              </li>
              <li>
                <strong>Findings.</strong> "All tests within BS 7671 limits. Symptom did not
                reproduce during the test period. No defect identified."
              </li>
              <li>
                <strong>Recommendation.</strong> "Customer to record date, time and conditions of
                any future occurrence and contact us. Recommend return visit during reported peak
                occurrence (typically evening) if symptom recurs. Suggest also monitoring whether
                symptom correlates with neighbour activity (shared supply transformer) — pattern
                may indicate supply-side voltage drop rather than a customer-side defect."
              </li>
              <li>
                <strong>Charge.</strong> Most firms charge a reduced "investigation only" fee for
                no-fault-found visits, or no charge if the customer reports recurrence within an
                agreed period.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Six items in every rectification record: verbatim symptom, diagnostic steps with readings, root cause, work done, post-rectification verification, residual concerns.",
              "Variation orders capture every scope change. Domestic — text exchange is fine. Commercial — signed VO form. Without a VO the firm has no authority for the additional work.",
              "Choose the right certificate: MWC for single-circuit alterations / repairs, EIC for new installations or major works, EICR for periodic inspection. Reg 644.1 makes certification mandatory.",
              "Post-repair test set is proportionate to the work — typically continuity, IR, polarity, Zs and (where applicable) RCD trip time on the affected circuit. Record on the certificate.",
              "Customer brief is verbal + written. Three-part plain English: what was happening, what we did, what to watch for. Reg 132.13 backs it up with the documentation pack.",
              "Reg 643.2 mandates calibrated instruments and instrument identification on the certificate. Modern software auto-fills from the firm's register but verify the right instrument is recorded.",
              "Document customer refusal with recommendation made, response, implications briefed, professional position. For C1 issues the firm's duty overrides customer preference — make safe and escalate.",
              "Intermittent faults: document what you DID find, recommend customer captures recurrence data, offer return visit. Resist the temptation to fix something just to feel like you got value for the visit.",
            ]}
          />

          <Quiz title="Rectification + variation orders + certs — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.4 5-Whys + engineering decision
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — Rectification + retesting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
