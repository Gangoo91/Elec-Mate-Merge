/**
 * Module 4 · Section 5 · Subsection 1 — Repair vs replace — factors affecting fault correction
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.1
 *   AC 5.1 — "identify factors which can affect repair or replacement of equipment"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.1 — identify and explain factors
 * which can affect fault correction, repair or replacement.
 *
 * Frame: the practical decision framework for repair vs replace — cost,
 * availability, compliance, schedule, customer constraints, environmental
 * factors. Brand-realism on what's typically repairable vs what isn't.
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
  'Repair vs replace (5.1) | Level 3 Module 4.5.1 | Elec-Mate';
const DESCRIPTION =
  'The practical decision framework for repair vs replace — cost, availability, compliance, schedule, customer constraints, environmental factors. Brand-realism on what is typically repairable vs not.';

const checks = [
  {
    id: 'mod4-s5-sub1-cost',
    question:
      "What's the typical 'cost-of-repair vs cost-of-replacement' threshold that should trigger the 'replace' decision?",
    options: [
      "60–70% of replacement cost. If the repair (parts + labour) is more than 60–70% of a new replacement, lean to replace. Reasoning: the repair retains the existing component's age + wear; the replacement gives full warranty + lifetime expectation. The threshold is approximate; other factors (lead time, customer urgency, availability) move the line. For high-reliability requirements (commercial / industrial / safety-critical), the threshold may shift lower (40–50%) — replacement preferred. For one-off / low-budget repairs, may shift higher (80%) — repair preferred.",
      "Because the heat-loss calc determines what flow temperature the system will run at, which in turn determines what size emitters (radiators / underfloor) the property needs. If the existing radiators are small (sized for 70-80°C flow from a gas boiler) and the heat-loss calc shows the property needs 8 kW design heat output, the radiators may need to grow to deliver 8 kW at 45°C flow. Emitter design is downstream of heat-loss calc. Skipping the calc and reusing existing radiators is the headline cause of disappointing UK heat-pump SCOP figures.",
      "Three scenarios. (1) Original device doesn't meet current standards — a 1990s 6 kA MCB in an installation now requiring 10 kA breaking capacity needs replacement. (2) A4:2026 has introduced new requirements that the original device can't satisfy — older RCBOs may not meet AFDD requirements for HMO bedrooms. (3) Building Regs change has made the original installation non-compliant — older lighting circuits may need RCD protection that the existing CU can't provide. In all three, repair perpetuates non-compliance; replacement brings the installation up to current spec. BS 7671 doesn't normally REQUIRE retrofit, but failures and alterations should bring the affected work to current spec.",
      "Self-Awareness: notice your own stress response to the urgent call and any defensive thoughts (\\\\\\\"my installation was fine\\\\\\\"). Self-Regulation: manage the stress, resist defensiveness, and stay calm and professional. Motivation: connect to your core purpose — client safety and quality of service. Empathy: genuinely understand the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s fear (they do not have technical knowledge; to them, buzzing = danger) and validate it. Social Skills: communicate reassuringly (\\\\\\\"I understand this is worrying — you are right to call\\\\\\\"), ask clear diagnostic questions, arrange a prompt visit, and follow up after resolution to rebuild confidence. Every domain contributes to the response",
    ],
    correctIndex: 0,
    explanation:
      "60–70% is the trade rule of thumb. Above the threshold, replacement makes economic sense; below it, repair is reasonable. The L3 apprentice's role is to know the threshold and apply it; the supervisor / customer makes the final call on borderline cases.",
  },
  {
    id: 'mod4-s5-sub1-avail',
    question:
      "What does 'parts availability' mean for the repair decision and how do you check?",
    options: [
      "Three checks. (1) Manufacturer still produces the part — check manufacturer website (Hager, Schneider, Wylex, MK, Crabtree all list current ranges). (2) Local trade counter has stock — call your usual wholesaler (Edmundson, City Electrical Factors, Rexel, Newey & Eyre). (3) Lead time if not local — typical UK 1–3 days for standard items, 2–6 weeks for older / specialist items. Discontinued parts (older Crabtree, MEM, Dorman Smith) may be available second-hand only — not recommended for safety-critical applications. If parts unavailable, replacement of the parent assembly may be the only option.",
      "Common causes (in approximate frequency order): (1) physical damage — nail / screw through cable during DIY, mouse damage in lofts, abrasion against sharp metalwork. (2) thermal damage — cable run alongside a heating pipe, conductors derated by enclosed installation method, prolonged overload heating. (3) moisture / contamination — water ingress into ceiling void, condensation in unheated buildings, salt-air corrosion in coastal properties. (4) UV degradation — exterior cables exposed to sunlight without UV protection. (5) ageing — polymer insulation breakdown after 30+ years (rubber-insulated cables from pre-1970s installations). (6) chemical attack — cables in contact with PVC pipes, certain adhesives, hydrocarbon spills.",
      "Half-split = at each step you eliminate half the remaining circuit. Step 1: open the ring at a socket roughly half-way around the ring; test continuity from the DB to that point on each leg; if both legs read continuity, the break is between this socket and the OTHER end of the ring; if one leg reads OL, the break is between this socket and the DB on that leg. Step 2: pick the half that contains the break, repeat at its mid-point. With a 12-socket ring you locate the break in 4 measurements (log&#8322;12 &asymp; 3.6, rounded up). Random walking would take 6 measurements on average. The technique is from logarithmic search algorithms — formalised diagnostic discipline beats random.",
      "PNB stands for Protective Neutral Bonded — it is the updated terminology for the earthing arrangement historically called TN-C-S or PME (Protective Multiple Earthing) in UK practice. The terminology change is aligned with international standards and clarifies the protective bonding role of the combined PEN conductor at the property. The technical arrangement is the same as before; the name is new. A4:2026 has updated cross-references throughout BS 7671 — including in Section 722 — to use PNB alongside the older PME term during the transition. As an L3 apprentice from 2026 onwards you should recognise both terms and understand they refer to the same arrangement.",
    ],
    correctIndex: 0,
    explanation:
      "Parts availability is one of the L3 engineering decision factors. A repair that needs a discontinued part may be impossible or take weeks; the customer's downtime cost may exceed the replacement cost. Check before quoting.",
  },
  {
    id: 'mod4-s5-sub1-warranty',
    question:
      "How does manufacturer warranty affect the repair / replace decision?",
    options: [
      "A statutory cost-recovery scheme (Health and Safety (Fees) Regulations) that allows the HSE to charge dutyholders for inspector time spent investigating 'material breaches' of H&S law. Charged at an hourly rate (currently around £170/hr — check HSE for the latest figure). Triggered when an inspector identifies a material breach and writes a letter, notice or report. The fee is for inspector time only, separate from any prosecution costs or fines.",
      "Significantly. (1) New components have manufacturer warranty (Hager 5 years on RCBOs, Schneider 5–10 years on Acti9, BG 10 years on accessories). Repaired components typically don't carry the warranty into the repair life. (2) Some manufacturers explicitly void warranty if the device has been opened / repaired — repairs DIY void the cover. (3) For domestic appliances, the customer's home insurance / appliance warranty may cover replacement but not repair, or vice versa. The L3 apprentice should ask 'is this still under warranty?' before quoting any repair — an in-warranty issue is the manufacturer's problem, not the firm's.",
      "Three reasons. (1) Verbatim records the customer's actual experience — useful if the fault recurs and the customer reports it slightly differently second time. (2) Protects the firm if the customer later claims they reported something else (e.g. they said 'lights flicker', you wrote 'one bulb intermittent', they later claim they reported a serious shock hazard). (3) Helps future diagnosis if a different engineer attends — the original symptom in the customer's words is more useful than your interpretation. Standard practice — quote the customer in inverted commas on the job sheet, then your interpretation underneath.",
      "You don't have to break the circuit — the clamp meter senses the magnetic field around the conductor and reads the current without electrical contact. Faster, safer (no need to disconnect), and possible on energised circuits without isolation. Standard for measuring load currents at distribution boards, on submains, on motor circuits, and for energy auditing. Most modern clamp meters also have voltage and continuity functions, making them effectively a multimeter + clamp in one.",
    ],
    correctIndex: 1,
    explanation:
      "Warranty is a free fix. Always check before quoting paid work. Check the customer's purchase records if available; check the manufacturer's serial-number warranty database; check the customer's home insurance / appliance warranty. The 'free fix' option satisfies the customer better than a paid one.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "List the major factors that affect the repair-vs-replace decision.",
    options: [
      "Fail at first glance (< 1 MΩ). But long parallel cables behave like resistors in parallel — three 200 m runs in parallel reduce the apparent IR by approximately 1/3. Each individual run could be reading roughly 2.4 MΩ. Test each parallel run independently to localise; document per-run IR. Long damp runs of underground cable show lower IR than short dry indoor runs — context matters.",
      "Six factors. (1) COST — repair vs replace (60–70% threshold). (2) PARTS AVAILABILITY — current production, stock, lead time. (3) RELIABILITY — repaired vs new component long-term performance. (4) COMPLIANCE — replacement may be required to meet current standards (A4:2026 may demand newer specification). (5) SCHEDULE — customer's downtime cost; emergency vs planned. (6) WARRANTY / INSURANCE — in-warranty repair is free; out-of-warranty paid. The decision is multi-factor; quote both options when not obvious.",
      "Resolve it informally first where possible. The ACAS Code recommends informal resolution as the starting point, then a written grievance under the employer's documented grievance procedure, then a meeting with management with the right to be accompanied by a colleague or trade-union representative, then a written outcome with a right of appeal. ACAS conciliation is available if the internal procedure fails. Employment tribunal is the last resort and tribunals will assess whether both parties followed the Code reasonably.",
      "Section 4 — First aid measures. The SDS section 4 will tell you the immediate first aid response (typically: irrigate copiously with running water for at least 15 minutes, remove contaminated clothing, seek medical advice if irritation persists or if the skin is broken). The other sections matter but the response time on a corrosive spill is measured in seconds — Section 4 is the one you need first.",
    ],
    correctAnswer: 1,
    explanation:
      "The six-factor framework covers the L3 decision space. Each factor pulls in a direction; the right answer depends on which factors dominate for the specific situation. Customer's commercial constraints often decide.",
  },
  {
    id: 2,
    question: "Which of these are typically REPAIRABLE and which are typically REPLACEMENT-ONLY?",
    options: [
      "5-day course at an accredited training centre. Covers ATEX/UKEX directives, hazardous-area zone classification (zones 0/1/2 for gas, 20/21/22 for dust), Ex equipment marking and selection, installation methods (cable glanding, conduit, sealing), inspection regimes (visual / close / detailed). Mix of classroom and practical lab. Assessment includes written exam and practical inspection task. Cost typically £1,000-1,500 plus any travel/accommodation.",
      "Professional Indemnity (PI) — covers the firm against claims arising from errors, omissions or negligent advice in their professional capacity (design, specification, recommendation). PL covers physical damage / injury from the contractor's activities; PI covers economic loss caused by bad advice or design. Increasingly relevant as installers move into design-and-build, EV charging design, solar PV design and prosumer's installations under BS 7671 Part 8.",
      "REPAIRABLE: cable terminations, accessory faceplates, individual lampholders, switch modules, dimmer cores, individual MCBs / RCBOs (within a CU), circuit cables (mid-run patch with junction box). REPLACEMENT-ONLY (typically): consumer units (sealed enclosures, integrated busbar), transformers and ballasts (factory-sealed), most LED drivers (sealed pots), AFDDs (electronic devices), most modern accessories (one-piece moulded). The boundary is usually 'is the failed item a single field-replaceable unit?'. Sealed devices are replacement-only; assembled devices with field-accessible components are repairable.",
      "Treat the DC side as live until proven dead with a meter rated for the voltage. The DC isolator at the array end and the DC isolator at the inverter end must both be operated and locked-off, then verify dead with a meter at both ends of the string. Even with the inverter AC-side isolated and switched off, the array continues to generate as long as light hits the panels. Covering the panels reduces but does not eliminate the DC output. Inverter manufacturer's instructions usually require a dwell time after isolation to allow internal capacitors to discharge.",
    ],
    correctAnswer: 2,
    explanation:
      "The repair / replace distinction often comes down to manufacturer design. Some devices are designed to be field-serviced (older fluorescent fittings with replaceable starters / ballasts); modern devices are increasingly sealed for cost / reliability / safety reasons.",
  },
  {
    id: 3,
    question: "What's the L3 apprentice's role in the repair-vs-replace decision?",
    options: [
      "Pre-construction information (PC info from client/principal designer) → construction phase plan (principal contractor) → RAMS for each work package (contractor) → toolbox talks each shift (supervisor) → permit-to-work for specific high-risk activities (issued before, closed after). Each layer references the one above it. After an incident the inspector traces backwards from the incident to find the gap.",
      "Annual calibration to a UKAS-traceable standard, with a calibration certificate kept in the firm's instrument register. Test instruments drift over time — a multimeter that reads 235 V on a 230 V supply, or an insulation tester that reads 200 MΩ on a 100 MΩ test, will produce wrong test results that fail BS 7671 612.x. Most certification schemes (NICEIC, NAPIT) require evidence of in-date calibration as part of audit. Sub 1.5 covers test instruments in detail.",
      "A protective device opens a fault circuit by interrupting fault current. The breaking capacity (Icn) is the maximum current the device can safely interrupt without damage to the device or risk of the fault current continuing across the device contacts. If the actual fault current (PFC) exceeds Icn, the device may fail to clear the fault — contacts may weld together, the device case may rupture, the fault may persist. For a typical Type B 32 A MCB the Icn is typically 6 kA; for a CU the busbar Icn is typically 16 kA. Both must exceed the PFC at their installation point.",
      "Two responsibilities. (1) Identify the option set — what are the realistic repair / replace / redesign options for the specific fault? (2) Quantify the trade-offs — cost, lead time, reliability for each option. The DECISION is typically made by the senior / supervisor for non-trivial cases, OR by the customer based on the apprentice's options brief. The apprentice doesn't normally commit the firm to a specific repair / replace path on their own initiative — escalation to senior is the L3 expectation for commercial-impact decisions.",
    ],
    correctAnswer: 3,
    explanation:
      "Engineering decisions on repair / replace are professional judgment calls. The L3 apprentice supports the decision by providing the option set and trade-offs; the senior / customer makes the call. Building this judgment over years is the path to senior-level competence.",
  },
  {
    id: 4,
    question: "Why might 'compliance' force a replacement even when repair is technically possible?",
    options: [
      "Three scenarios. (1) Original device doesn't meet current standards — a 1990s 6 kA MCB in an installation now requiring 10 kA breaking capacity needs replacement. (2) A4:2026 has introduced new requirements that the original device can't satisfy — older RCBOs may not meet AFDD requirements for HMO bedrooms. (3) Building Regs change has made the original installation non-compliant — older lighting circuits may need RCD protection that the existing CU can't provide. In all three, repair perpetuates non-compliance; replacement brings the installation up to current spec. BS 7671 doesn't normally REQUIRE retrofit, but failures and alterations should bring the affected work to current spec.",
      "Reportable diseases (Reg 8 + Schedule 3) are work-related ill-health diagnoses — carpal tunnel syndrome from repetitive work, occupational asthma, hand-arm vibration syndrome, certain cancers attributable to a known carcinogen at work. Reportable dangerous occurrences (Reg 7 + Schedule 2) are events that COULD have caused injury — collapse of lifting equipment, escape of dangerous substances, electrical short circuit causing 24+ hours plant stoppage, structural collapse, certain hazardous-area incidents.",
      "Rented domestic properties in England — including most assured shorthold tenancies, licences to occupy, and HMOs. Excludes social housing tenancies under separate regulation, lodger arrangements where the landlord shares the dwelling, long leases (7+ years), student halls of residence under separate regimes, and accommodation provided to family members. Wales has its own equivalent (Renting Homes Wales Act 2016 plus the Renting Homes — Fitness for Human Habitation Regulations 2022); Scotland has the Housing (Scotland) Act 2006 plus tolerable standard / repairing standard guidance; Northern Ireland follows similar requirements via the Housing (Northern Ireland) Order 2003.",
      "Both are predominantly single-phase domestic in the UK. The differences are in the install scope, not the electrical interface. Air-source has an outdoor unit on the property exterior — a single electrical supply, refrigerant pipework to the indoor cylinder/buffer, controls cabling. Ground-source has either horizontal slinky coils in trenches or vertical boreholes — much larger civils scope, ground-loop pumps that are themselves loads on the electrical supply, and an indoor unit that contains the compressor (so no outdoor unit). Electrical sizing is similar (5-12 kW typical); cable runs are different (ground-source indoor unit is fed from the CU; air-source has cable to the outdoor unit). MCS MIS 3005 covers both.",
    ],
    correctAnswer: 0,
    explanation:
      "Compliance-driven replacement is the regulator's lever. The L3 apprentice's role is recognising when the repair option doesn't bring the installation to compliance. The customer makes the commercial decision on whether to upgrade; the firm has a duty to advise on compliance gaps.",
  },
  {
    id: 5,
    question: "What's the typical lead time for ordering specialised electrical components in the UK?",
    options: [
      "Significant. A south-facing roof at 30-40° pitch is the optimal UK orientation, posting 100% of reference yield. East-facing or west-facing roofs typically produce 80-85% of optimal. North-facing produces 50-65% (still positive but with much longer payback). Steeper pitches favour winter performance; shallower pitches favour summer performance. Flat roofs get an A-frame mount to set a target pitch and azimuth. The MCS Yield Calculator handles all of this — produces the kWh figure for the SAP and the customer handover.",
      "Standard items (MCBs, RCBOs, accessories from common brands): next-day from major wholesalers (Edmundson, CEF, Rexel) within working hours. Specialist items (commercial three-phase devices, specific fire-alarm modules, KNX components, EV charger spares): 2–10 working days from manufacturer or distributor. Discontinued items: weeks to months, sometimes second-hand only. International items: 2–6 weeks if available. The lead time goes into the customer's expectation-setting; some firms keep emergency stocks of common items to enable next-day repairs.",
      "Reg 722.410.3.5 prohibits obstacles and placing out of reach (Section 417 measures). Reg 722.410.3.6 prohibits non-conducting location and earth-free local equipotential bonding. Designers must select alternative protective measures permitted within Chapter 72 and elsewhere in BS 7671 — typically ADS with appropriate RCDs, SELV / PELV where applicable, and double or reinforced insulation.",
      "Hazardous-area work (ATEX zones, confined spaces, working at height in remote locations, work near live HV) carries higher risk than standard work. The 'lone working' precautions of Sub 1.2 are NOT enough — the risk profile demands two-person working as default. EAWR Reg 14(c) suitable precautions and HSE INDG73 + HSG85 + Confined Spaces Regulations 1997 + Work at Height Regulations 2005 all combine to require: documented permit-to-work, named authorised person, second person stationed within sight or comms, defined rescue procedure, dedicated emergency response. L3 apprentice never works hazardous-area solo; firm policy will explicitly forbid.",
    ],
    correctAnswer: 1,
    explanation:
      "Lead time matters for the customer brief. 'I can have you back in service tomorrow' sells better than 'maybe next month'. The firm's stocking strategy and supplier relationships determine the practical lead times. Most established firms have a stock policy that covers 80% of common faults at next-day.",
  },
  {
    id: 6,
    question: "How do environmental factors (humidity, temperature, dust, vibration) affect the repair / replace decision?",
    options: [
      "Around 10% of the UK population is estimated to have dyslexia (British Dyslexia Association figure), with research suggesting prevalence may be materially higher in trade roles where visual-spatial reasoning is favoured. That means in a typical apprentice cohort of 20, two to four people are likely to be dyslexic. Plain English briefings, visual aids, audio material, extra time on written assessments and the option of practical demonstration are the standard reasonable adjustments — and they help non-dyslexic learners too.",
      "MCS MIS 3002 is the installer-competence and installation-quality standard for solar PV. BS 7671 Section 712 is the electrical-design standard for the wiring, protection, isolation and labelling. Both apply on every install. MIS 3002 references BS 7671 explicitly for the electrical detail; BS 7671 applies regardless of whether the install is MCS-certified. MCS certification is required if the customer wants Smart Export Guarantee payments; BS 7671 compliance is required because it's the electrical regulation.",
      "Significantly. A repair that's exposed to harsh environment (outdoor, kitchen, plant room, washroom) may not last as long as the same repair in benign environment. The repair-vs-replace decision should consider: (a) what's the IP / environmental rating of the repaired vs replacement component? (b) Will the repair retain the original IP rating? (c) Is the new component IP-rated for the actual environment? Replacement often comes with current IP / environmental ratings; repair preserves the existing rating (which may have degraded). For harsh environments, replacement is usually the right call.",
      "You can't make someone seek help, but you can keep listening, keep checking in, and keep signposting gently. Suggest the Lighthouse Club 24/7 helpline (0345 605 1956) — confidential, no referral needed, no qualifying period. Mention Samaritans (116 123). Mention Mates in Mind resources. Don't break their confidence without asking, but if you genuinely believe they're at imminent risk of harm to themselves, the right thing is to call 999 or take them to A&E — that's a safeguarding step, not a betrayal. Look after yourself too — supporting a peer can be heavy. The same charities are available to you.",
    ],
    correctAnswer: 2,
    explanation:
      "Environmental factors affect long-term reliability of any electrical component. Outdoor-rated, kitchen-rated, plant-room-rated devices have specific design choices that benign-environment versions don't. Environment is one of the engineering decision factors.",
  },
  {
    id: 7,
    question: "What's the customer's role in the repair / replace decision?",
    options: [
      "A PCR is a published rulebook that defines the methodology for preparing an EPD for a specific product category — for example installation cable, luminaires, switchgear or insulation. It specifies the functional unit (e.g. one metre of cable of given specification), the system boundary, the data requirements, the calculation methodology and the reporting format. All manufacturers preparing EPDs for that product category follow the same PCR, ensuring like-for-like comparability across competing products. PCRs are managed by EPD programme operators such as EPD International, IBU and INIES.",
      "The EIC carries the standard schedule of inspections and schedule of test results for the new circuit(s). For a PV install that includes the DC string circuits (with DC voltages and DC IR test results), the AC isolator and AC final connection back into the consumer unit, the labelling and signage at every isolation point, and the dual-supply warning at the consumer unit. Section 712 of BS 7671 (extensively revised in A4:2026) drives the inspection items. The 'designer' / 'constructor' / 'inspector and tester' boxes on the EIC may all be the MCS-certified installer's lead engineer; signatures still have to be physically present.",
      "ATEX zones (Zone 0 / 1 / 2 for gas, Zone 20 / 21 / 22 for dust) require all equipment in the zone — including test instruments — to be ATEX-rated for the zone. Standard kit: intrinsically-safe two-pole tester (Martindale VI-15800 or Megger DET14C with Ex marking), no mobile phones in zone, no battery tools without Ex rating, no smoking, no metal tools that could spark on contact with steel. The fault diagnosis approach is — bring everything to a non-zoned area where possible, isolate at the boundary, only work in-zone with intrinsically-safe instruments and a hot-work permit.",
      "The customer makes the COMMERCIAL decision (cost / convenience trade-off). The firm makes the SAFETY / COMPLIANCE decision (which options satisfy BS 7671 + current standards). Apprentice presents options with trade-offs in plain English; customer chooses; firm executes the chosen option within the safety constraint. Customer cannot choose 'below BS 7671' — that's the firm's professional duty floor. The boundary: customer chooses between compliant options; firm refuses non-compliant requests.",
    ],
    correctAnswer: 3,
    explanation:
      "The customer / firm decision split is critical. Commercial choices (which compliant option) are the customer's; safety choices (which options are compliant) are the firm's. Confusing the two leads to disputes — the customer pressuring the firm to bypass compliance, or the firm dictating the customer's commercial choice.",
  },
  {
    id: 8,
    question: "When is 'replace the entire system' the right answer rather than repair / replace individual components?",
    options: [
      "Five conditions. (1) Cumulative repair cost approaching system replacement cost (cumulative repairs at 70%+ of new system). (2) System at end-of-life (CU 25+ years old, multiple aging components). (3) Code 1 / Code 2 EICR findings affecting multiple aspects of the system. (4) Building work or change-of-use happening; opportunity to upgrade. (5) New regulatory requirements (A4:2026 or future) that the existing system can't meet without major rework. The decision is normally the senior / customer's; the L3 apprentice identifies the indicators and escalates.",
      "Building Regulations Part L (Conservation of Fuel and Power) applies to new build, extensions and major renovations. Heat pump installs in those contexts must demonstrate compliance with the relevant Part L primary energy and carbon emissions targets, typically through SAP (Standard Assessment Procedure) for dwellings. The Future Homes Standard expected to bring fossil-fuel boilers off new-build from 2025 elevates heat pumps to the default route for new-build. MCS MIS 3005 sits alongside Part L — MCS proves the installer is competent, Part L sets the building energy targets, and the SAP calculation that informs Part L compliance uses MCS-style heat-loss and SCOP methodology.",
      "The Duty of Care under section 34 of the Environmental Protection Act 1990. The waste producer must take all reasonable steps to ensure waste is contained, transferred only to authorised persons, properly described in a waste transfer note (or hazardous waste consignment note where applicable), and ultimately recovered or disposed of by an authorised facility. Duty of Care applies regardless of whether the waste is also covered by WEEE, Hazardous Waste Regulations or other regimes.",
      "Stop and verify before testing. Unusual supply arrangements suggest either (a) the property is genuinely TT (rural, older, or specifically designed) which may need different fault-diagnosis approach, OR (b) the customer's installation isn't what you expected from the booking (e.g. an older commercial site with three-phase supply you weren't briefed on). Either way, the test plan needs to match the actual supply. Escalate to supervisor if unsure; update the RAMS to reflect the actual installation; brief the customer if the work scope changes. Never just push ahead with the test plan you arrived with if it doesn't match what you find.",
    ],
    correctAnswer: 0,
    explanation:
      "System replacement is a major commercial decision. The L3 apprentice's role is identifying the indicators (cumulative cost, age, EICR codes, change-of-use, regulatory) and escalating to senior. The decision is rarely an apprentice-level call.",
  },
];

const faqs = [
  {
    question: "How do I know what a replacement RCBO costs vs the labour to repair the existing one?",
    answer:
      "RCBO replacement cost: typical UK trade £18–35 for Hager / Wylex / MK ranges. Labour to swap an RCBO: 30–60 minutes (isolation, removal, install, retest, restoration). Trade hourly rate: £45–75 for L3-supervised work. So replacement of a single RCBO: £40–80 parts + £25–75 labour = £65–155 total. Repair (e.g. cleaning oxidised contact, re-torquing) is rarely possible on a sealed device — most 'repairs' on RCBOs are actually replacements. The 60–70% threshold rarely applies to RCBO; almost always replacement.",
  },
  {
    question: "Should I always quote both repair and replace options to the customer?",
    answer:
      "Yes when both are realistic. If repair is impossible (sealed device, discontinued part), don't waste customer's time. If replacement is overkill (simple loose terminal), don't suggest it. The L3 apprentice's judgment is to identify the realistic option set first, then quote those. A two-option quote (cheap option + recommended option) often serves the customer best.",
  },
  {
    question: "What if the customer demands a repair that you don't think is the right call?",
    answer:
      "Document and discuss. Explain why you think repair isn't the right call (safety, reliability, compliance reasons). If after discussion the customer still wants the repair AND the repair is BS 7671 compliant, you can do the repair with documented customer agreement. If the requested repair is below BS 7671, decline and document. The line: customer can choose between compliant options; cannot demand non-compliant work.",
  },
  {
    question: "How do I price a repair when the labour time is uncertain?",
    answer:
      "Two approaches. (1) Time + materials with a documented estimated range — 'expected 1–3 hours; we'll keep you updated; final cost based on actual time'. (2) Fixed quote with a defined scope — 'we'll do X for £Y; if scope changes we'll re-quote'. Most firms use time + materials for fault diagnosis (you don't know what you'll find) and fixed quotes for installation (scope is defined). Brief the customer on the pricing model upfront.",
  },
  {
    question: "Are there manufacturer training programmes that improve my knowledge of what's repairable?",
    answer:
      "Yes — Hager, Schneider, Wylex, MK, Aurora, Megger and Fluke all run manufacturer training (mostly free for trade customers). Hager Academy, Schneider Energy University, Megger University. The training covers product range, installation, fault diagnosis, and which faults are field-repairable vs require replacement. Worth attending in your first 2 years; builds the brand knowledge that speeds diagnosis and repair decisions.",
  },
  {
    question: "What if a repair fails — can the customer claim against the firm?",
    answer:
      "If the repair was workmanlike and BS 7671 compliant, no. If the repair was below standard or the firm should have recommended replacement instead, possibly yes. Documentation is the firm's defence — the customer's signed acceptance of the repair option, the firm's clear statement of the limitations, the post-repair retest evidence. A repair that fails because the underlying issue wasn't addressed is more defensible than a repair that fails because of poor workmanship. The L3 apprentice's role is doing the work to standard; the senior reviews the firm's overall approach.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 1"
            title="Repair vs replace — factors affecting fault correction"
            description="The practical decision framework for repair vs replace — cost (60–70% threshold), parts availability, reliability, compliance (A4:2026 layer), schedule, warranty / insurance. Brand-realism on what's typically repairable vs replacement-only."
            tone="emerald"
          />

          <TLDR
            points={[
              "Six factors: cost, parts availability, reliability, compliance, schedule, warranty / insurance. Each pulls in a direction; right answer depends on which dominate.",
              "Cost threshold: repair &gt; 60–70% of replacement = lean to replace. Sealed devices (RCBOs, drivers, AFDDs) are typically replacement-only.",
              "Customer makes the COMMERCIAL decision (cost / convenience between compliant options); firm makes the SAFETY / COMPLIANCE decision (which options are compliant).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the six-factor framework to repair vs replace decisions: cost, availability, reliability, compliance, schedule, warranty.",
              "Use the 60–70% cost threshold as a rule of thumb; adjust for high-reliability or low-budget contexts.",
              "Identify what's typically REPAIRABLE (terminations, faceplates, switch modules) vs REPLACEMENT-ONLY (RCBOs, drivers, AFDDs, sealed devices).",
              "Recognise compliance-driven replacement triggers — A4:2026 requirements, Building Regs changes, original device below current spec.",
              "Identify in-warranty / insurance fixes that may be free for the customer; check before quoting paid work.",
              "Distinguish customer's commercial decision (between compliant options) from firm's safety decision (which options are compliant).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The six-factor framework</ContentEyebrow>

          <ConceptBlock
            title="Repair vs replace is a multi-factor engineering decision"
            plainEnglish="Once the fault is diagnosed, the next decision is what to do about it. Six factors pull in different directions; the right answer depends on which factors dominate for this specific situation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. COST</strong> — repair vs replace (parts + labour). 60–70% threshold rule of thumb.</li>
              <li><strong>2. PARTS AVAILABILITY</strong> — current production, local stock, lead time, discontinued items.</li>
              <li><strong>3. RELIABILITY</strong> — repaired component long-term performance vs new component warranty + life.</li>
              <li><strong>4. COMPLIANCE</strong> — replacement may be required to meet current standards (A4:2026, Building Regs).</li>
              <li><strong>5. SCHEDULE</strong> — customer's downtime cost; emergency vs planned; lead time impact.</li>
              <li><strong>6. WARRANTY / INSURANCE</strong> — in-warranty repair may be free; check before quoting paid work.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 132.16 (Existing installations and additions or alterations)"
            clause={<>"No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances."</>}
            meaning={<>Reg 132.16 means any alteration must verify the existing supports the altered work. For fault correction this often means: a repair that brings the installation back to its previous state may need additional alteration to also bring it to current standards. Engineering decision — repair to original state, or upgrade to current spec.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 132.16."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>What\'s repairable vs replacement-only</ContentEyebrow>

          <ConceptBlock
            title="The boundary is usually \'is this a single field-replaceable unit?'"
            onSite="Sealed devices (RCBOs, drivers, AFDDs, electronic boards) are replacement-only. Assembled devices with field-accessible components (cable terminations, accessory faceplates, switch modules) are repairable. Manufacturer\'s design choice typically determines the boundary."
          >
            <p>Typically REPAIRABLE:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable terminations (re-strip, re-terminate).</li>
              <li>Accessory faceplates (replace front panel only, retain back box / wiring).</li>
              <li>Individual lampholders within fittings (some).</li>
              <li>Switch modules within plates.</li>
              <li>Mid-run cable patches (with proper junction box).</li>
              <li>Individual MCBs / RCBOs within a CU (replacement of single device, not full CU).</li>
            </ul>
            <p>Typically REPLACEMENT-ONLY:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consumer units (sealed enclosures, integrated busbar).</li>
              <li>Transformers and ballasts (factory-sealed).</li>
              <li>LED drivers (most are sealed pots).</li>
              <li>AFDDs and other electronic protective devices.</li>
              <li>Modern moulded accessories (one-piece construction).</li>
              <li>EV charger internal modules (factory-replaced as units).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Customer vs firm decision boundaries</ContentEyebrow>

          <ConceptBlock
            title="Commercial choice vs safety duty"
            plainEnglish="The customer makes the commercial decision (which compliant option fits their budget / convenience). The firm makes the safety decision (which options satisfy BS 7671 and current standards). Confusing the two leads to disputes."
          >
            <p>Decision boundary in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Firm:</strong> identifies which options are BS 7671 compliant. Refuses requests for non-compliant work.</li>
              <li><strong>Customer:</strong> chooses between compliant options based on cost / convenience / preference.</li>
              <li><strong>Joint:</strong> agreement on scope, cost, timeline, and any limitations of the chosen option.</li>
              <li><strong>Documented:</strong> the chosen option, the recommendation if the customer chose a less-preferred option, the customer\'s signed acceptance.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Spares strategy and like-for-like sourcing</ContentEyebrow>

          <ConceptBlock
            title="Repair only works if you can source the right part"
            plainEnglish="A repair-route decision rests on getting the matching part within the customer's tolerable downtime. The L3 apprentice carries enough common spares (RCBOs, accessories, terminals) to handle 80% of repairs same-visit; the rest go on a parts-ordering ticket."
            onSite="Common stocked spares to carry on the van: matched-brand B6 / B16 / B32 RCBOs (Hager, Wylex, Schneider, MK), 13 A sockets and 5 A switches in white moulded plus screwless flat-plate, 2.5 mm² and 4 mm² T+E offcuts, brown / blue / green-and-yellow sleeving, Wago 221 lever connectors. Spares that need ordering: full consumer units, ECPI-rated DIN-rail accessories, brand-matched proprietary components (e.g. Niglon Connex, Tigris)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Matched-brand replacement</strong> &mdash; Wylex Standard RCBOs do not fit a Hager Design 50 board; mixing brands inside a CU voids the manufacturer&apos;s type-test.</li>
              <li><strong>Discontinued lines</strong> &mdash; many older accessories (Crabtree Capital, MEM Memera, MK Sentry early models) are out of production. Sourcing through CEF / Edmundson / specialist reclaim, or accept that the repair route closes and replacement is the only option.</li>
              <li><strong>Lead-time tracking</strong> &mdash; commercial customers will accept a 24&nbsp;h delay if you commit to a return slot; an open-ended &ldquo;we&apos;re waiting for parts&rdquo; loses the relationship.</li>
              <li><strong>Reclaimed components</strong> &mdash; not used on safety-critical fault repairs. The temptation on a discontinued line is real; the BS 7671 case for using a second-hand RCBO is weak.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Documenting the decision and the reasoning</ContentEyebrow>

          <ConceptBlock
            title="Why the &lsquo;why&rsquo; matters as much as the &lsquo;what&rsquo;"
            plainEnglish="Every repair-vs-replace call generates a small piece of installation history. A future sparks (or a future you) needs to know not just what was done but why &mdash; especially when the choice was a budget compromise rather than the textbook answer."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Job sheet entry</strong> &mdash; identified fault, root cause, options offered, customer choice, work completed, retest results.</li>
              <li><strong>Advisory note</strong> &mdash; if the customer declined the recommended option, write it up, sign and counter-sign. Photo of signed advisory uploaded to the job record.</li>
              <li><strong>Certificate / Minor Works</strong> &mdash; the formal record under Reg 644.4. Customer keeps a copy; the firm keeps a copy on the job record.</li>
              <li><strong>Photographic evidence</strong> &mdash; before / during / after photos at the work point and at the CU. A well-photographed repair is the cheapest defence against a later complaint.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Total cost of ownership — looking past the day-one quote"
            plainEnglish="The headline repair quote is one number; the total cost of ownership is the truer figure. A cheap repair on a 25-year-old consumer unit might cost £75 today, but if the next failure follows in six months and the customer pays the call-out fee plus another repair, the cumulative cost passes the upgrade quote within a year. Engineering decisions framed as 'cost over five years' rather than 'cost today' produce honest customer recommendations and protect the firm's reputation."
            onSite="Walk the customer through the cost picture verbally. 'Today's repair is £75; based on the age of the rest of the board, you can probably expect another similar issue inside 18 months at a similar cost. The full upgrade is £450 today and removes the recurring failures.' Most customers appreciate the framing — they get to make the commercial decision with the relevant information. Some still pick the cheaper today figure; that is their right and you document it."
          >
            <p>
              TCO factors to surface in a customer conversation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Recurrence likelihood</strong> — age of equipment, history
                of similar failures, manufacturer reliability data on the
                affected component family.
              </li>
              <li>
                <strong>Call-out cost</strong> — every future visit carries the
                firm's call-out fee plus labour minimum; that adds up.
              </li>
              <li>
                <strong>Downtime cost</strong> — for a domestic customer, no
                power on a winter evening is unwelcome; for a commercial
                customer, every hour of downtime has a measurable lost-revenue
                figure.
              </li>
              <li>
                <strong>Energy efficiency</strong> — older lighting, older
                heating controls, older motors all run at lower efficiency than
                modern equivalents; the upgrade can pay for itself in saved
                energy over its life.
              </li>
              <li>
                <strong>Insurance and conveyancing</strong> — a modern
                installation supports lower buildings insurance and easier
                conveyancing; the upgrade has resale value.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Manufacturer support, EOL and the discontinued-line problem"
            plainEnglish="Electrical manufacturers cycle their product lines. A consumer unit family in production today may be discontinued in five years, with replacement parts available for another five then unavailable. End-of-life (EOL) status changes the repair-vs-replace calculus — a discontinued accessory means the next failure on the same line forces a different family of replacement, often with a non-trivial install cost."
            onSite="Check manufacturer EOL status before quoting a repair. Wylex, Hager, Crabtree, Schneider, BG, MK and Fusebox all publish EOL announcements; trade wholesalers (Edmundson, CEF, Newey & Eyre, Rexel) flag EOL on their catalogue search. If the line is EOL or the manufacturer is winding down support, factor that into the quote — the customer needs to know that today's repair is the last cheap one on this board. The L3 apprentice carrying that EOL knowledge sounds informed and protects the customer from a worse surprise next year."
          >
            <p>
              EOL signs to watch for and what to do:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manufacturer EOL announcement</strong> — published on the
                manufacturer's professional site; typically gives a year of
                continued spares support before stock dries up.
              </li>
              <li>
                <strong>Wholesaler back-order</strong> — if the trade counter
                cannot get a part within a week, that is the early warning of
                EOL; the manufacturer is winding the line down.
              </li>
              <li>
                <strong>Limited compatibility families</strong> — some CU lines
                will accept generic 60898 MCBs; others have proprietary modules
                only. Check before quoting.
              </li>
              <li>
                <strong>Customer brief on EOL</strong> — explain plainly that
                future repairs may force a board upgrade; let the customer
                decide whether to pre-empt now or wait for the next failure.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Spares strategy — what to carry on the van and what to source on demand"
            plainEnglish="The firm's spares strategy controls how fast a repair completes. Every-day stock on the van — 32 A B-curve RCBO, 16 A B-curve RCBO, double socket, single switch, 1.5/1.0 mm² T&E offcut — covers the majority of domestic faults same-day. Less common items — Type C MCBs, AFDDs, three-phase RCBOs, specific manufacturer accessories — get sourced from the trade counter or back-ordered from the manufacturer. The L3 apprentice plans the visit knowing what is on the van vs what needs sourcing."
            onSite="Before leaving the depot, scan the van inventory for the parts the day's job list calls for. If the morning's first job is a Wylex NHX RCBO replacement and the van only has Hager spares, divert to the wholesaler before the customer site. Customer call-outs that finish in one visit get five-star reviews; visits that need a return trip cost the firm a slot of the next day's diary and feel slow to the customer. Maintain the van inventory weekly; replenish what was used; flag low-stock to the office."
          >
            <p>
              Typical L3 van spares stock items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RCBOs</strong> — common ratings (6 A, 16 A, 20 A, 32 A
                B-curve) in the manufacturer families the firm services most
                (Wylex, Hager, Crabtree, BG).
              </li>
              <li>
                <strong>MCBs</strong> — same ratings, B and C curves, in the
                same manufacturer families.
              </li>
              <li>
                <strong>Common accessories</strong> — single and double sockets,
                light switches (1, 2 and 3 gang), pendant lampholders, 13 A
                fused connection units.
              </li>
              <li>
                <strong>Cable</strong> — 1.5/1.0, 2.5/1.5, 4.0/1.5, 6.0/2.5 mm²
                T&E in 5 m offcuts; flex 0.75 mm² and 1.0 mm² for fittings.
              </li>
              <li>
                <strong>Bonding</strong> — 10 mm² and 16 mm² green-and-yellow,
                bonding clamps for gas and water meters.
              </li>
              <li>
                <strong>Low-volume or specialist parts</strong> — sourced same
                day from the trade counter; the L3 apprentice knows the local
                wholesaler's stock and opening hours.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.5"
            clause={
              <>
                "For an addition or alteration to an existing installation, it shall be verified that the addition or alteration complies with BS 7671 and does not impair the safety of the existing installation."
              </>
            }
            meaning={
              <>
                Most fault repairs sit under Reg 641.5 because they alter the existing installation. The dual test &mdash; the new bit complies AND the existing safety case isn&apos;t worsened &mdash; frames the repair-vs-replace decision. A repair that puts the installation back to the state it failed in might leave the safety case impaired and trigger replacement instead.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.5, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 644.4"
            clause={
              <>
                "The person or persons responsible for the design, construction and verification of the installation shall issue the Certificate, which takes account of their respective responsibilities, to the person ordering the work, together with the records mentioned in Regulation 644.3."
              </>
            }
            meaning={
              <>
                The repair generates a certificate &mdash; either an EIC for a new circuit or distribution board, or a Minor Electrical Installation Works Certificate (MEIWC) for circuit alterations. The Regulation makes certificate issue the responsibility of the person who did the work, not optional and not contingent on customer request.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 644.4, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting one option without explaining alternatives"
            whatHappens={<>Apprentice diagnoses a fault and quotes only the most expensive solution (full CU replacement). Customer feels overcharged; gets second opinion from another firm; second firm quotes the cheaper compliant option (single RCBO replacement). Customer dismisses the original firm; bad reputation; lost work. The original quote wasn\'t wrong — but presenting only one option felt like upsell to the customer.</>}
            doInstead={<>For non-trivial decisions, quote 2–3 options with trade-offs explained. Customer feels respected as a decision-maker; firm preserves trust; commercial relationship continues. Multi-option quoting takes 5 more minutes and prevents the \'they tried to upsell me' complaint.</>}
          />

          <CommonMistake
            title="Accepting a customer\'s request for non-compliant repair"
            whatHappens={<>Customer can't afford the recommended fix and asks the apprentice to \'just patch it' below BS 7671 spec. Apprentice (under pressure) does the patch. Six months later the patch fails, causes a fire. Insurance investigates; finds the work was below BS 7671; firm\'s professional indemnity refuses cover; the apprentice is named in the prosecution alongside the firm.</>}
            doInstead={<>Below BS 7671 is non-compliance, not engineering. If the customer can\'t afford the right fix: (1) Decline the work (better than installing unsafe). (2) Quote a smaller compliant scope. (3) Escalate to senior to make the call. The customer\'s budget is not your professional duty; BS 7671 is.</>}
          />

          <Scenario
            title="25-year-old CU with a failing RCD"
            situation={<>You\'re at a property to investigate an RCD that\'s failing the trip-time test (350 ms at I∆n vs 300 ms maximum). The CU is a 25-year-old Wylex Standard. Customer asks about repair vs replace.</>}
            whatToDo={<>Apply the six-factor framework. (1) Cost: replacement RCD ~£30 + 1 hr labour = £75 total. Repair impossible (sealed device). (2) Parts: Wylex Standard RCDs still in production; available next-day. (3) Reliability: 25-year-old RCD failing the test; replacement gives full warranty + life. (4) Compliance: replacement RCD must satisfy current Type A requirement (existing may be Type AC under A2:2022 retrofit guidance); discuss with customer. (5) Schedule: same-day replacement available. (6) Warranty: existing RCD out of warranty (way past 5-year manufacturer warranty). Decision: replace the RCD AND consider broader CU upgrade given age. Quote two options to customer: (A) £75 replace single RCD — addresses immediate fault; CU still 25 years old; further failures likely soon. (B) £450 full CU replacement to all-RCBO Wylex NHX — addresses fault + future-proofs for next 25 years; upgrades to A4:2026 compliant configuration. Customer chooses A (budget constraint). Document recommendation B as advisory; customer signs acceptance of A. Complete the work; retest; document.</>}
            whyItMatters={<>The structured six-factor analysis gives the customer a defensible engineering decision. Both options are BS 7671 compliant; the customer\'s commercial choice is informed; the firm has documented its recommendation for future reference. The L3 apprentice\'s role is option presentation + trade-off explanation; the customer makes the commercial call.</>}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Six factors for repair-vs-replace: cost, parts availability, reliability, compliance, schedule, warranty / insurance.",
              "Cost threshold: repair &gt; 60–70% of replacement = lean to replace. Adjust for high-reliability or low-budget contexts.",
              "Repairable: terminations, faceplates, switch modules, individual MCBs / RCBOs (within CU), mid-run cable patches.",
              "Replacement-only: consumer units (sealed), drivers, AFDDs, modern moulded accessories, electronic protective devices.",
              "Compliance can force replacement: A4:2026 requirements, Building Regs changes, original device below current spec.",
              "Check warranty / insurance before quoting paid work — in-warranty fix is free for the customer.",
              "Customer makes commercial decision (which compliant option); firm makes safety decision (which options are compliant). Don't confuse.",
              "Quote 2–3 options with trade-offs. Customer feels respected; firm preserves trust; commercial relationship continues.",
            ]}
          />

          <Quiz title="Repair vs replace — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.4 Root cause</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.2 Verification + retesting</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
