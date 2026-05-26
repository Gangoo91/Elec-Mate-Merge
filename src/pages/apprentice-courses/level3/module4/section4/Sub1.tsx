/**
 * Module 4 · Section 4 · Subsection 1 — Logical stages of fault diagnosis
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.2
 *   AC 4.2 — "explain the logical stages of fault diagnosis"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.2 — interpret and apply the
 * logical stages of fault diagnosis and correction work that should be
 * followed.
 *
 * Frame: the seven-stage fault diagnostic procedure — collect symptoms,
 * formulate hypothesis, plan tests, execute tests, analyse results,
 * formulate fix, execute fix. The discipline that makes diagnosis a
 * process rather than guesswork.
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
  'Logical stages of fault diagnosis (4.1) | Level 3 Module 4.4.1 | Elec-Mate';
const DESCRIPTION =
  'The seven-stage fault diagnostic procedure — collect symptoms, formulate hypothesis, plan tests, execute, analyse, formulate fix, execute fix. The discipline that turns diagnosis into a process rather than guesswork.';

const checks = [
  {
    id: 'mod4-s4-sub1-stages',
    question:
      "What are the seven logical stages of fault diagnosis used in industry?",
    options: [
      "SEG is a regulated payment scheme requiring electricity suppliers to pay domestic generators for electricity exported to the grid. Replaced the Feed-in Tariff (FiT) which closed to new entrants in 2019. SEG tariffs vary by supplier (typically 5-15p/kWh in 2026); customers shop around for the best rate. To qualify, the install must be MCS-certified and the meter must be capable of recording export (most modern smart meters are). The customer signs up for SEG with their chosen supplier; it isn't automatic.",
      "(1) COLLECT SYMPTOMS — customer interview + visual inspection. (2) FORMULATE HYPOTHESIS — what fault types match the symptoms? Narrow to 2–3 candidates. (3) PLAN TESTS — which tests will distinguish the candidates? Order them safely (dead before live). (4) EXECUTE TESTS — using the right instruments per Sub 2.x. (5) ANALYSE RESULTS — do the readings confirm or refute each hypothesis? Update hypothesis based on findings. (6) FORMULATE FIX — what action corrects the confirmed fault? Consider repair vs replace. (7) EXECUTE FIX — make safe, repair / replace, verify with retest, document. The stages turn diagnosis into a structured process; skipping a stage almost always returns to bite you.",
      "The heat-loss calc determines the unit size, the flow temperature, the emitter design, the SCOP estimate and ultimately whether the customer is warm and the running costs match the quote. MCS MIS 3005 mandates a room-by-room heat-loss calculation per BS EN 12831 — fabric-by-fabric, with U-values for each wall / window / floor / roof element, ventilation losses by air change rate, design outdoor temperature for the location, design indoor temperature for each room. The result is the design heat load (kW) which sizes the unit. Skip it or fudge it and the system either oversizes (cycles inefficiently, premature compressor wear, poor SCOP) or undersizes (cannot meet load on cold days, customer freezes, complaint city). The L3 apprentice does not run the heat-loss calc but should recognise it as the foundation document of the whole install.",
      "Because the JIB rules require you to hold the practical assessment (AM2 or equivalent) before they'll grade you as Electrician. After college and 2365-03 you remain on the final-year Apprentice (or Adult Trainee) rate — qualifications complete, AM2 not yet passed (colloquially called the 'Improver' stage, though that is NOT a formal JIB grade). After AM2 your employer applies to JIB to upgrade you to Electrician grade, which carries the full Electrician pay rate (around £19-20/hr in 2024 outside London). The jump to Electrician is the biggest single pay rise in the apprenticeship.",
    ],
    correctIndex: 1,
    explanation:
      "The seven-stage model is the standard industrial fault-finding discipline. Variants exist (some use 5 or 6 stages, some 8) but the principle is the same — structured progression from symptom to fix with explicit hypothesis testing. The L3 expectation is to follow the discipline; the senior electrician does it without thinking about it.",
  },
  {
    id: 'mod4-s4-sub1-hypothesis',
    question:
      "Why is FORMULATE HYPOTHESIS (stage 2) the most important stage and what happens when you skip it?",
    options: [
      "Because the hypothesis drives the test plan; without a hypothesis, you're randomly testing and hoping. With a clear hypothesis (or two competing hypotheses), each test is designed to confirm or refute a specific candidate. Skipping the hypothesis stage = running every test on every circuit = 4 hours of testing instead of 30 minutes of targeted testing. The 'just test everything' approach also misses faults that don't show on standard tests (HRJ needs voltage drop on load, not just continuity). Hypothesis-driven testing is faster, more accurate, and the L3 step-up.",
      "Both are batteries under the Waste Batteries and Accumulators Regulations 2009 — separate stream from WEEE, separate Take-Back Scheme via wholesalers and battery distributors. Lead-acid (older emergency lighting, alarm panels) — non-spillable but contains lead and sulphuric acid; route via the wholesaler battery bin or a licensed battery recycler. Lithium-ion (newer fittings, including some LED emergency packs) — fire risk if punctured, short-circuited or thermally abused; tape the terminals, transport in a non-conductive container, never bin. Both routes are free at the wholesaler; both are legal requirements.",
      "Eye protection (impact-rated, EN 166 F minimum — chop saws produce hot metal sparks at speed), hearing protection (chop saws regularly exceed 100 dB), cut-resistant gloves (sharp edges on the cut tray), respiratory protection if cutting indoors with no extraction (galvanised steel coating produces zinc oxide fume at cutting temperature — the cause of metal-fume fever, sometimes called 'zinc shakes'), and sturdy boots with toe protection. Long sleeves to protect arms from sparks.",
      "The certificate references the edition in force on the date of installation (e.g. BS 7671:2018+A4:2026). Subsequent amendments don't make the install non-compliant retrospectively, but they DO change what's required for any future addition / alteration / EICR you do on the same installation. Periodic inspection (EICR) is carried out to the standard in force at the time of the inspection — so a 2026 install will be EICR'd against whatever amendment is current in 2031.",
    ],
    correctIndex: 0,
    explanation:
      "The hypothesis stage is what turns electrical fault-finding into engineering. Without a working hypothesis, the apprentice is doing data collection without a purpose. With one, each test answers a specific question. The shift from 'I'll just test things' to 'I think it's X — let me test that' is the L3 mental model.",
  },
  {
    id: 'mod4-s4-sub1-iterate',
    question:
      "What happens at stage 5 (ANALYSE RESULTS) if your test results don't match the hypothesis?",
    options: [
      "You loop back to stage 2 and update the hypothesis. The results have eliminated one hypothesis and may have suggested another. Re-plan tests based on the updated hypothesis (stage 3), execute (stage 4), re-analyse (stage 5). The diagnosis loops between stages 2–5 until you reach a hypothesis that explains all the test results. This iterative loop is normal — first hypotheses are usually partial. The discipline is to keep iterating with structured tests rather than abandon the process and guess.",
      "Four dead-test functions on the MFT: (1) Continuity of protective conductors (R1+R2 / R2), low-resistance ohms range; (2) Insulation resistance, 500 V DC test (250 V for SELV / 1000 V for over 500 V circuits); (3) Polarity, by continuity check from origin to accessory; (4) Earth electrode resistance (where TT system or earth electrode used). The live-test sequence then adds Ze, Zs, PFC and RCD time/current. Sub 6.x covers the full sequence in detail.",
      "When (a) the fault is on the supply / cut-out / tails / main switch / busbar itself, OR (b) you can't reliably identify which circuit feeds the fault location, OR (c) the work involves removing or refitting the consumer unit cover where the busbar is exposed, OR (d) the fault has compromised the integrity of the CU (water ingress, burnt terminal block, melted enclosure). Full isolation has bigger customer impact (whole property loses supply) so weigh it against the alternative of working live or working with limited isolation — but if the safety case requires full isolation, the customer impact doesn't change the answer.",
      "Stay calm. Don't take it personally. Acknowledge the customer's frustration without agreeing with the substance ('I can see this isn't what you expected — I'm sorry it's frustrating'). Don't argue, don't explain at length, don't get defensive. Offer to call your supervisor immediately so they can come to site or speak to the customer directly. Document the interaction in your job pack — date, time, exact words, your response — and let the supervisor handle the conversation about scope and quality. Carry on with the work in a non-confrontational way until the supervisor arrives.",
    ],
    correctIndex: 0,
    explanation:
      "Real diagnoses iterate. The first hypothesis is usually wrong or incomplete; the test results refine it. The L3 apprentice's competence is partly recognising 'the results don't match — what's the new hypothesis?' rather than forcing the data to fit. Senior electricians may iterate several times on a complex fault.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "How does the structured 7-stage approach differ from 'just looking around until something obvious shows up'?",
    options: [
      "Six standard items. (1) Bonding plaster (Knauf bonding or Thistle Bonding, 5 kg bag) — for filling small chases. (2) Filler (Polycell, Tetrion) — for very small holes and screw holes. (3) Plasterboard offcuts — for patching plasterboard holes. (4) Scrim tape — for plasterboard joins. (5) Fire-stop sealant (FireFly, Hilti CP series) — for cable penetrations through fire-rated walls. (6) Touch-up paint (white emulsion small tin, customer-supplied paint where possible) — for minor wall finishing where the customer is unlikely to repaint. Cost £40–60 for the kit; lasts months.",
      "Structured approach: hypothesis-driven, targeted tests, documented progression, finds the actual root cause, consistent across operatives. Look-around approach: opportunistic, finds the obvious but misses the subtle, no documentation, dependent on the operative's intuition, inconsistent across visits. The look-around approach can solve simple faults quickly (which is why apprentices learn it first) but breaks down on complex / intermittent / multi-symptom faults. The structured approach scales to any fault complexity and produces defensible documentation. L3 expectation is structured.",
      "Treat it as 'asbestos suspect until proven otherwise'. Buildings constructed before 2000 (and refurbished before 2000) can contain asbestos in textured ceilings, insulation board, cement products, floor tiles and pipe lagging. Stop and check the asbestos register if the building has one (commercial buildings are required to have one under the Control of Asbestos Regulations 2012). For a domestic property without a register, assume suspect material is present and avoid disturbance until you can verify or arrange a survey.",
      "Hold the line on the coding — explain the BPG4 logic for C2 (single foreseeable fault scenario), reference the specific risk in plain terms, document the conversation. The absence of harm to date does not change the risk; it means the foreseeable fault has not yet occurred. The professional duty under EAWR Reg 16 (competence) and the inspector's continuing Reg 4 duty both require honest coding, not customer-pleasing coding.",
    ],
    correctAnswer: 1,
    explanation:
      "The look-around approach works for the easy 50% of faults — broken switch, blown bulb, tripped breaker. The structured approach is needed for the harder 50% — intermittent, multi-symptom, complex root cause. L3 fault diagnosis at the qualification level requires the structured approach because the assessor needs to see the discipline.",
  },
  {
    id: 2,
    question: "What documentation should accompany each stage of the diagnostic process?",
    options: [
      "(1) Confirm with the panel display whether it's a system fault (resolved by a panel reset) or a circuit fault (suggests your work has caused damage). (2) If a system fault — reset the panel, confirm restoration, document. (3) If a circuit fault — STOP, isolate again, retest the affected circuit (continuity, IR, polarity), find and rectify the cause. (4) During the period the alarm was in fault — the building's fire-safety arrangements have been compromised; the customer's responsible person under the RR(FS)O 2005 should have been notified BEFORE the work and a fire watch should have been in place during the work. Document the period of fault on the alarm log book. Inform the alarm-receiving centre.",
      "Plain English at slow pace, supplemented by visual demonstration where appropriate, written translated handouts (HSE provides multilingual safety leaflets), use of a bilingual co-worker as informal interpreter, back-briefing to confirm understanding ('show me what you'd do if you saw a fire'), and provision of safety signage and PPE labels in the relevant languages where the workforce is consistently multilingual. The duty under MHSWR Reg 10 is for information to be 'comprehensible' — that's a statutory standard, not a courtesy.",
      "(1) Symptoms — customer's words in quotes, timeline, conditions, what they've tried. (2) Hypothesis — what you think is wrong and why. (3) Test plan — which tests, in which order, what each will distinguish. (4) Test results — readings, with timestamps and instrument IDs. (5) Analysis — what the results confirm or refute, updated hypothesis if needed. (6) Fix plan — repair / replace decision, materials needed, expected duration. (7) Fix execution — what was done, post-fix retest readings, customer hand-back. The documentation creates the diagnostic narrative on the job sheet — defensible record of what was found and done.",
      "Thermal runaway is a self-sustaining exothermic chemical reaction inside the cell. Once it starts in one cell (typically triggered by internal short circuit, mechanical damage, overcharge, or sustained over-temperature) the heat from that cell propagates to the next cell, which also enters runaway, and so on through the pack. The reaction releases flammable and toxic gases (including hydrogen fluoride and carbon monoxide) and can reach 600+ degC. Standard CO2 or dry-powder extinguishers do not stop a runaway battery — water is used to cool surrounding cells and limit propagation, but the cell itself burns until its energy is spent. This is why siting, fire separation and the BMS exist — to prevent and contain runaway.",
    ],
    correctAnswer: 2,
    explanation:
      "Documentation is the audit trail that makes the diagnosis defensible. Modern firms use job-sheet apps (simPRO, BigChange, Joblogic) that prompt for each stage's information. The discipline is the same on paper or app — capture each stage, attach the readings, build the narrative.",
  },
  {
    id: 3,
    question: "When is it acceptable to skip the formal stages and just do the obvious fix?",
    options: [
      "A manufacturer-specific EPD reports the actual life-cycle impacts of a specific product manufactured at a specific factory by a specific producer. An industry-average EPD reports the average impacts across all members of an industry association making a similar product. Manufacturer-specific EPDs allow real comparison between competing products; industry-average EPDs only allow comparison between product categories. BREEAM gives more weight to manufacturer-specific EPDs because they reward producers that genuinely outperform their peers, not those that simply benefit from a category average.",
      "Explain clearly that refrigerant work is restricted by law to F-Gas-certified persons under the F-Gas Regulation. If the unit feels less effective they should call the original installer or an F-Gas certified service company who will leak-test and re-charge as needed. Topping up a refrigerant circuit DIY is illegal, dangerous (some refrigerants are A2L mildly flammable and R-290 is A3 flammable), and would void the warranty. The cost of professional service is small relative to the cost of an uncovered failure.",
      "Currently £90,000 of VAT-taxable turnover in any rolling 12-month period (£85,000 was the long-standing figure, raised to £90,000 in April 2024). When you cross the threshold you must register for VAT within 30 days and start charging VAT (currently 20% standard rate) on your invoices. Quarterly VAT returns. You can reclaim VAT paid on business purchases. For a busy electrical firm crossing the threshold is a significant administrative event.",
      "When the fault is obvious AND the obvious fix is risk-free AND the customer has been informed. Example: a blown bulb in an emergency-bulb socket — replace the bulb, verify operation, document. No need for full hypothesis. But — even the 'obvious' fix benefits from a quick stage check: is the customer's report consistent with the fix (yes, blown bulb explains 'no light'); is the bulb the correct rating; is the lampholder undamaged. The 5-second mental check catches the cases where 'obvious' wasn't actually right. Apprentices who skip even the mental check create comeback work.",
    ],
    correctAnswer: 3,
    explanation:
      "Even simple jobs benefit from a quick mental run-through of the stages. The full formal documentation isn't needed for trivial fixes; the mental discipline is. Apprentices who 'just do the obvious' on every job miss the cases where 'obvious' is wrong; the structured-thinking discipline catches them.",
  },
  {
    id: 4,
    question: "What's the difference between a 'symptom' and a 'fault' in diagnostic vocabulary?",
    options: [
      "SYMPTOM — what the customer / observer notices (lights flicker, breaker trips, smell of burning). FAULT — the underlying engineering condition that causes the symptom (HRJ at terminal, earth leakage from appliance, broken conductor at junction). One fault can produce multiple symptoms (HRJ at consumer unit incoming tail causes flickering on every circuit when high-current loads cycle); one symptom can result from multiple possible faults (RCD trip can be earth leakage, smooth DC residual, or device failure). Diagnosis is the process of going from symptoms to the actual fault.",
      "IEC 62446-1 is the international standard for grid-connected PV system documentation, commissioning tests and inspection. It defines the test procedure for PV strings: Voc, Isc, polarity, insulation resistance, with pass/fail thresholds. MCS MGD 003 is the UK MCS-flavoured equivalent — it adopts the IEC 62446-1 method and adds UK-specific requirements (MCS-eligible product list, installer competence, customer pack contents). Modern multifunction PV test instruments are calibrated against IEC 62446-1; the resulting test record satisfies both IEC and MCS requirements. The L3 apprentice on a PV install will use a test instrument that automates the IEC 62446-1 sequence.",
      "A manufacturer-specific EPD reports the actual life-cycle impacts of a specific product manufactured at a specific factory by a specific producer. An industry-average EPD reports the average impacts across all members of an industry association making a similar product. Manufacturer-specific EPDs allow real comparison between competing products; industry-average EPDs only allow comparison between product categories. BREEAM gives more weight to manufacturer-specific EPDs because they reward producers that genuinely outperform their peers, not those that simply benefit from a category average.",
      "Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, in 1.5 mm² T&E to the unit location (utility room, loft, plant cupboard). Local DP isolator. Boost wiring from kitchens and bathrooms — sometimes via humidity sensors or PIR, sometimes via pull-cord switches in bathrooms or push-buttons in kitchens. Some units include a low-voltage commissioning interface (e.g. for installer-set air-flow rates). The unit's nameplate is typically 50-300 W on full load — modest demand. The bulk of the electrical work is the boost wiring network, not the unit supply.",
    ],
    correctAnswer: 0,
    explanation:
      "Symptom vs fault is foundational vocabulary. The customer reports symptoms; the engineer identifies faults. The diagnostic process maps from symptoms to faults — which is hard because the mapping is many-to-many.",
  },
  {
    id: 5,
    question: "How do you decide which test to run first when you have multiple competing hypotheses?",
    options: [
      "Section 2 requires the BSR to facilitate improvement of competence of those working on building safety and standards. Industry-led 'Competence Steering Group' has produced sector competence frameworks (engineers, fire engineers, principal designers, principal contractors, electrical installers among others). Mandatory competence is being introduced gradually for specified roles on HRRBs and is moving towards being mandatory more broadly.",
      "Three criteria. (1) Safety — dead tests before live, low-energy before high-energy. (2) Discrimination — choose the test whose result will most narrow the candidate hypotheses (e.g. an IR test that distinguishes 'short circuit' from 'open circuit' is more useful than a continuity test that only distinguishes one). (3) Cost — quick tests before slow tests, free tests before tests that cost the customer (e.g. visual inspection before opening the CU). The order is safety first, then discrimination, then cost. Most efficient diagnostic path is shortest sequence of tests that distinguishes between the surviving hypotheses.",
      "It binds whoever is the duty-holder for the system at the time — most often the duty-holder under HASAWA who controls the premises (employer, dutyholder, landlord). The duty-holder discharges the maintenance obligation by arranging periodic inspection (an EICR) to a recommended frequency, acting on the resulting condition codes (C1 / C2 / FI), and keeping records. The electrician carrying out the EICR is the technical evidence the duty-holder is meeting Reg 4(2).",
      "Because the standard's enforcement and interpretation hinges on the precise definitions. 'Exposed-conductive-part' (a conductive part of equipment that can be touched and which is liable to become live in fault conditions) and 'extraneous-conductive-part' (a conductive part liable to introduce a potential, generally Earth, not forming part of the electrical installation) are different categories with different bonding rules. Mis-classify one as the other and you mis-bond, you fail the EICR, you potentially leave the customer unprotected. Definitions ARE the technical content.",
    ],
    correctAnswer: 1,
    explanation:
      "Test ordering is part of the diagnostic plan. Information-theory framing: each test result should ideally halve the remaining hypothesis space. The most-discriminating test goes first; tests that don't help much go last or get cut. Safety constraints overlay this — never run a high-energy live test before establishing the basics with dead tests.",
  },
  {
    id: 6,
    question: "What's the role of the 'visual inspection' in the logical stages, and what should you look for?",
    options: [
      "BS 7671 Part 6 643 requires verification testing of any circuit that has been worked on, regardless of how minor the work. The MWC test panel records: continuity of CPC and protective conductors, insulation resistance, polarity, R1+R2, Zs, RCD trip-time at I&Delta;n where RCD-protected. The L3 apprentice carries out the tests with the Megger MFT1741 (or equivalent) and records the readings on the certificate. The point is — if the work has affected the circuit electrically (and replacing a protective device certainly has), verification is mandatory. 'It looks fine' is not a substitute for measured test results.",
      "The HEMS schedules the heat pump's main run-time toward cheap off-peak windows where possible (e.g. overnight on Octopus Go). The battery charges during the same off-peak window. During the expensive peak window (typically 16:00-19:00) the battery discharges to cover the property load, including any heat pump running, while the grid import drops to near zero. Net peak grid demand from the property falls; the customer's bill falls; the grid stress falls. Some smart tariffs explicitly reward this — Octopus Cosy, for example, has dedicated cheap windows aligned with heat-pump run preferences.",
      "Visual inspection happens at stage 1 (collect symptoms) and is structured. Look for: (1) Signs of past faults — scorched terminals, blackened insulation, soot marks, melted plastic, replaced fuses, taped joints. (2) Workmanship issues — over-stripped conductors visible at terminals, exposed conductors past the insulation, unfinished connections. (3) Environmental factors — water marks, condensation, dust accumulation, evidence of vermin, damaged cable runs. (4) System integrity — covers in place, accessories secured, signage current. The visual catches the easy 30% of faults before any instrument is used; the rest requires testing.",
      "Four hypotheses to walk through. (1) Run capacitor failed open or shorted — single-phase induction motors need the run cap to develop starting torque; a failed cap means the motor draws stalled-rotor current (5–8 × FLA) until the MCB trips. Test cap with a meter on capacitance range or a dedicated cap tester; replace if outside ±10% of rated value. (2) Bearings seized or stiff — manually rotate the rotor; if it doesn't spin freely, replace bearings or motor. (3) Centrifugal switch contacts welded (older motors) — keeps the start winding in circuit constantly, drawing high current. (4) Wiring fault on the motor terminal block (loose or wrong connection). The L3 apprentice walks the tree in order; the cap is the first thing to check because it's the most common fault and the cheapest fix.",
    ],
    correctAnswer: 2,
    explanation:
      "Structured visual inspection is the cheapest diagnostic test you have. It costs nothing, catches obvious faults, and informs the hypothesis. Most experienced electricians develop a 'walking inspection' habit — they note things wrong as they walk to the work area. The L3 apprentice builds the same habit through deliberate practice.",
  },
  {
    id: 7,
    question: "What if the diagnosis takes longer than the time the customer is willing to pay for?",
    options: [
      "Without storage, surplus PV (generated when the property is not consuming it — typically midday) exports to the grid at the Smart Export Guarantee rate (typically 5-15 p/kWh). With storage, surplus PV charges the battery and discharges to the property in the evening, displacing import at the much higher import rate (typically 25-35 p/kWh). The PV-to-property utilisation rate rises from typically 20-40 percent self-consumption (PV-only) to 60-90 percent (PV plus battery). This is the single biggest financial driver for adding battery storage to an existing PV install.",
      "Prefabrication off-site (e.g. pre-terminating SWA tails to length, pre-building consumer units, pre-assembling cable trays in a workshop) reduces on-site cuts and offcuts. Off-site cutting can be measured precisely; on-site cuts under time pressure tend to leave more wastage. Less waste = lower material cost = smaller skip = less environmental impact. Relevant to environmental tech because: (a) the customer is by definition committed to sustainability so resource-efficient installation matches their values; (b) the trade is increasingly held to evidence-based environmental claims; (c) it's a 2357 Unit 312 AC 2.1 explicit requirement. Plus prefabrication gives faster on-site install times.",
      "Because the install is a long-lived asset that will outlast the original installer's involvement. Notices communicate critical information — main earth location, RCD test interval, mixed supplies, isolator function — to whoever interacts with the install in future, including the customer in an emergency, the next electrician on a fault visit, and the EICR engineer in five years' time. The labels are how the install talks to people when the original installer isn't there.",
      "Three options. (1) Time-box the investigation: agree with customer 'I'll spend up to 90 minutes on initial diagnosis, after which we'll review the findings and decide next steps'. (2) Stage the work: complete the make-safe at the agreed time, schedule a return visit for full diagnosis. (3) Escalate to senior or specialist if the fault is beyond your competence. NEVER skip stages to fit a time budget — that creates the comeback work that's more expensive than honest extra time. Document the time-boxing decision and the customer's acceptance.",
    ],
    correctAnswer: 3,
    explanation:
      "Time pressure is a real constraint and the structured approach helps you manage it. Agreeing a time-box upfront with the customer protects everyone — the customer knows the cost ceiling, the apprentice has a clear scope, the firm has a defensible billing position. Skipping stages to save time is the worst trade — creates more time later.",
  },
  {
    id: 8,
    question: "What's the purpose of the post-fix RETEST stage and why is it non-negotiable?",
    options: [
      "Three reasons. (1) Verify the fix actually worked — a repair you think is good can fail under live conditions; the retest catches the failure before the customer's reset goes wrong. (2) Verify the fix didn't introduce a new fault — terminal screw over-tightened can crack; cable repositioned can chafe; new component can be DOA. (3) Generate the documented evidence of compliance — the post-fix retest readings on the job sheet are the proof that BS 7671 643 requirements are met. Skipping the retest = no evidence of correct repair = comeback risk + regulatory exposure.",
      "Both can be held liable. The individual harasser is personally liable under s.110 (helping a discriminatory act). The employer is vicariously liable under s.109 for acts done by the employee 'in the course of employment'. The employer's defence is to show they took 'all reasonable steps' to prevent the conduct — i.e. proper policies, training, monitoring and enforcement. A claimant can name both the individual and the employer in the same claim.",
      "3 percent for lighting circuits, 5 percent for other circuits (sockets, fixed loads). Measured from the origin of the installation to the load. Verified by calculation during design (cable size + length + load) and confirmed by measurement under load during commissioning if there\\\\\\\\'s any doubt. On long runs (above 30-40 m), voltage drop becomes the limiting factor in cable size selection — often requiring a larger cable than overcurrent protection alone would dictate.",
      "MCS MIS 3002 is the installer-competence and installation-quality standard for solar PV. BS 7671 Section 712 is the electrical-design standard for the wiring, protection, isolation and labelling. Both apply on every install. MIS 3002 references BS 7671 explicitly for the electrical detail; BS 7671 applies regardless of whether the install is MCS-certified. MCS certification is required if the customer wants Smart Export Guarantee payments; BS 7671 compliance is required because it's the electrical regulation.",
    ],
    correctAnswer: 0,
    explanation:
      "The retest is what closes the diagnostic loop. Without it, you have a hypothesis that was confirmed by symptom + tests + visual finding, then a fix — but no evidence the fix actually worked. The retest provides that evidence. Standard L3 practice includes the relevant BS 7671 643 tests on the affected circuit after rectification.",
  },
];

const faqs = [
  {
    question: "How do I know when my diagnosis is 'good enough' to act on?",
    answer:
      "When the hypothesis explains ALL the symptoms AND test results, AND the proposed fix has a clear logical link to the diagnosed fault. If you have unexplained symptoms or test results that don't fit your hypothesis, the diagnosis is incomplete — keep iterating. If the proposed fix doesn't directly address the diagnosed fault (e.g. 'replace the socket because we found an HRJ at the upstream junction box' — wrong fix), reconsider. The 'good enough' bar is not 'I think this might be it' — it's 'this hypothesis explains everything I've observed AND the fix logically corrects it'.",
  },
  {
    question: "What if there's no clear single hypothesis at the end of testing?",
    answer:
      "Then you have either incomplete information OR a multi-fault scenario OR a fault that's outside your competence to diagnose. Options: (1) Run additional tests if there are more questions to answer (PQ analyser for intermittents, motor analyser for motor issues, oscilloscope for waveform issues). (2) Escalate to senior or specialist. (3) Time-box and stage — agree make-safe and return-visit with the customer. Pretending a vague hypothesis is enough leads to wrong fixes and comebacks.",
  },
  {
    question: "Do I need to write down the hypothesis or can I just hold it in my head?",
    answer:
      "Write it down. Two reasons: (1) The act of writing forces you to articulate it precisely — vague mental hypotheses become clear when you have to write them as one sentence. (2) Documentation supports the diagnostic narrative on the job sheet — the customer / supervisor can see the reasoning chain. Mental hypotheses are fine for trivial obvious faults; written hypotheses are needed for any non-trivial diagnosis.",
  },
  {
    question: "How do experienced electricians do this so quickly — they don't seem to follow stages?",
    answer:
      "They do follow them — they just compress them into seconds because the patterns are familiar. The senior who 'just knows' it's a HRJ at the consumer-unit busbar is running the seven stages mentally in 30 seconds because they've seen the symptom pattern dozens of times. The L3 apprentice runs the stages explicitly and slowly because the patterns aren't yet familiar. Over years the stages become internalised; until they are, follow them deliberately.",
  },
  {
    question: "What if the customer thinks they know what's wrong and pressures me to just fix that?",
    answer:
      "Acknowledge their input but don't be bound by it. Customer suggestions are usually based on partial information — they may have heard a friend describe a similar symptom, or read something online. Run the structured diagnosis; if their suggestion turns out to match the diagnosis, fine. If it doesn't, the structured diagnosis gives you the evidence to explain why their suggestion isn't the right fix. 'I appreciate the suggestion; I've tested and the actual fault is X — let me explain' is a defensible, professional response.",
  },
  {
    question: "Is there a textbook on this seven-stage approach?",
    answer:
      "Several. The IET 'On-Site Guide' covers the basics; IET 'Guidance Note 3 — Inspection and Testing' covers the testing side in depth; the City & Guilds 2391/2394 syllabus materials cover the full diagnostic discipline at higher level. Online: TLC-Direct, Trade-Skills 4 U, and various YouTube channels (Joe Robinson Electrical, Gary Does Stuff, Eficheck) demonstrate the approach in real fault scenarios. Building the seven-stage habit comes from doing the diagnosis with the discipline, not from reading about it.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 1"
            title="Logical stages of fault diagnosis"
            description="The seven-stage fault diagnostic procedure — collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix. The discipline that turns diagnosis into a structured process rather than guesswork."
            tone="emerald"
          />

          <TLDR
            points={[
              "Seven stages: collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix. Iterative loop between stages 2–5 until hypothesis explains all evidence.",
              "Hypothesis stage (2) is the most important — drives the test plan. Without a hypothesis, you're randomly testing and hoping. Skipping it = 4 hours instead of 30 minutes.",
              "Even 'obvious' fixes benefit from a quick mental run-through of the stages. Apprentices who 'just do the obvious' miss the cases where obvious is wrong.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the seven-stage logical fault diagnostic procedure: collect symptoms, formulate hypothesis, plan tests, execute, analyse, formulate fix, execute fix.",
              "Distinguish symptoms from faults — symptoms are what the customer notices, faults are the underlying engineering conditions.",
              "Iterate the hypothesis–test–analyse loop (stages 2–5) until findings explain all observed evidence.",
              "Order tests by safety (dead before live), discrimination (most-narrowing first), and cost (free / quick before slow / expensive).",
              "Apply structured visual inspection to catch the easy 30% of faults before any instrument is used.",
              "Document each stage on the job sheet to create a defensible diagnostic narrative.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The seven stages</ContentEyebrow>

          <ConceptBlock
            title="Diagnosis as a structured process, not a guess"
            plainEnglish="Apprentices first learn fault-finding as 'look around until you see what's wrong'. That works for simple faults. For anything complex, intermittent, or multi-symptom, you need a structured approach. The seven stages are the standard discipline."
            onSite="The L3 expectation is to follow the stages explicitly. The senior electrician compresses them into seconds because the patterns are familiar; the apprentice runs them slowly and deliberately because the patterns aren't yet built. Over years it becomes muscle memory."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. COLLECT SYMPTOMS</strong> — customer interview (Sub 3.2 six-question framework) + structured visual inspection.</li>
              <li><strong>2. FORMULATE HYPOTHESIS</strong> — what fault types match the symptoms? Narrow to 2–3 candidates with reasons.</li>
              <li><strong>3. PLAN TESTS</strong> — which tests will distinguish the candidates? Order by safety (dead before live), discrimination (most-narrowing first), cost.</li>
              <li><strong>4. EXECUTE TESTS</strong> — using the right instruments per Sub 2.x.</li>
              <li><strong>5. ANALYSE RESULTS</strong> — do the readings confirm or refute each hypothesis? Update hypothesis if needed; loop back to stage 2.</li>
              <li><strong>6. FORMULATE FIX</strong> — what action corrects the confirmed fault? Repair vs replace decision (Sub 5.1).</li>
              <li><strong>7. EXECUTE FIX</strong> — make safe, repair / replace, verify with retest, document.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 (Inspection and Testing) — fault diagnosis framework (paraphrased)"
            clause={<>Paraphrased framework summary: diagnosis of faults takes a systematic approach — start from the reported symptoms, work through inspection of the system, instrument verification, and only then formulate an action plan. Premature action without diagnosis risks harm to operative, customer and equipment.</>}
            meaning={<>The framework endorses the systematic approach. The 'symptom → inspection → test → action' chain is the structural backbone of the seven-stage model. Premature action (skipping stages 2–5) is explicitly identified as a risk source.</>}
            cite="Source: IET Guidance Note 3 (Inspection and Testing) — fault diagnosis framework, paraphrased."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Why hypothesis-driven testing wins</ContentEyebrow>

          <ConceptBlock
            title="The single biggest L3 step-up from L2 fault-finding"
            plainEnglish="Without a hypothesis, you\'re running tests randomly and hoping a result jumps out. With a hypothesis, each test is designed to confirm or refute a specific candidate. The difference between 4 hours of testing and 30 minutes of testing."
          >
            <p>
              The hypothesis stage is the reasoning step. You take the symptoms and ask 'what fault types could produce this pattern?'. Narrow to 2–3 candidates with reasons. Each candidate predicts what the test results should look like. The next stage (plan tests) chooses tests that will distinguish the predictions.
            </p>
            <p>Example for a 'lights flicker when fridge cycles' symptom:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hypothesis A:</strong> HRJ on the supply path to the lighting circuit. Predicted reading: voltage drop &gt;5% on lighting during fridge inrush; thermal hotspot at the HRJ location.</li>
              <li><strong>Hypothesis B:</strong> Undersized supply tail. Predicted reading: voltage drop on entire installation during fridge inrush, not just lighting; no localised hotspot.</li>
              <li><strong>Hypothesis C:</strong> Cheap LED lamps incompatible with circuit. Predicted reading: no voltage drop on multimeter; substituting a known-good lamp eliminates flicker.</li>
            </ul>
            <p>Each hypothesis predicts different test results; the tests that distinguish them go first.</p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The iterative loop — stages 2 to 5</ContentEyebrow>

          <ConceptBlock
            title="Real diagnoses iterate"
            onSite="First hypotheses are usually wrong or incomplete. The test results refine them. Loop back to stage 2 with updated hypothesis based on what the tests revealed. Keep iterating until hypothesis explains all the evidence."
          >
            <p>
              The iterative loop is normal and expected. The L3 apprentice\'s competence is partly recognising \'the results don\'t match — what\'s the new hypothesis?' rather than forcing the data to fit. Senior electricians may iterate several times on a complex fault.
            </p>
            <p>What stops the loop:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hypothesis explains all the symptoms AND all the test results.</li>
              <li>Proposed fix has a direct logical link to the diagnosed fault.</li>
              <li>No unexplained anomalies left in the data.</li>
            </ul>
            <p>What signals you should keep iterating:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Some symptoms not explained by current hypothesis.</li>
              <li>Test results that don't fit the prediction.</li>
              <li>Proposed fix that doesn\'t logically address what\'s been found.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.1"
            clause={
              <>
                "Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
              </>
            }
            meaning={
              <>
                Stage 1 (symptom collection) and stage 2 (hypothesis) are inspection work. Reg 642.1 fixes the order: inspection comes first, normally with the part under inspection dead. Most failed diagnoses skip the inspection stage and dive into testing &mdash; the Regulation explicitly tells you not to.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 642.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.2"
            clause={
              <>
                "The inspection shall be made to verify that the installed electrical equipment is: (a) in compliance with the requirements of Section 511; (b) correctly selected and erected in accordance with BS 7671, taking into account manufacturers&apos; instructions; and (c) not visibly damaged or defective so as to impair safety."
              </>
            }
            meaning={
              <>
                The inspection in stage 1 is a structured three-part check &mdash; product standard compliance, correct selection / erection, and visible damage. That&apos;s the framework you carry into the customer&apos;s house. Skipping any of the three is how a fault gets missed at the inspection stage and only shows up when somebody comes back to a bigger fault later.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 642.2."
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Running every test without a hypothesis"
            whatHappens={<>Apprentice arrives at a \'something\'s wrong with the wiring' job. Without forming a hypothesis, they isolate the whole installation and run every BS 7671 643 test on every circuit. Three hours later they have a stack of readings, all within tolerance, and no diagnosis. Customer is impatient; supervisor is on the phone. Real fault was a single failing LED driver on one circuit — would have been identified in 10 minutes with a customer interview + targeted clamp meter test on that circuit.</>}
            doInstead={<>Always form a hypothesis before testing. Even a wrong first hypothesis is better than no hypothesis — it gives the testing direction. The discipline of asking 'what fault types could cause this symptom?' before opening any enclosure is the L3 step-up.</>}
          />

          <CommonMistake
            title="Forcing the data to fit the first hypothesis"
            whatHappens={<>Apprentice\'s first hypothesis is HRJ at the consumer unit. They run continuity tests; readings are all normal. Instead of updating the hypothesis, they conclude \'it must be intermittent HRJ' and start torque-testing every busbar terminal anyway. Two hours later, no fault found at the busbar. Real fault was an earth leakage from a degraded outdoor socket gasket — visible on the clamp meter but never tested because the apprentice was committed to the busbar hypothesis.</>}
            doInstead={<>Treat hypotheses as falsifiable. If the test results don't match the prediction, the hypothesis is wrong (or incomplete) — update it, don\'t force it. The professional discipline is to follow the evidence, not your initial guess.</>}
          />

          <Scenario
            title="Diagnosing \'the kitchen lights flicker but only sometimes'"
            situation={<>Customer reports kitchen LED downlights flicker intermittently. They can't predict when. They've tried replacing one of the bulbs without effect.</>}
            whatToDo={<>Stage 1 — collect symptoms. Customer interview reveals: flicker started 3 months ago, no building work, but they did add a smart hub for their lights about then. Visual: kitchen has 8 LED downlights on a Lutron dimmer connected to a smart hub. Stage 2 — hypothesis. Three candidates: (A) dimmer / smart hub incompatibility with the LED drivers, (B) cumulative leakage from smart hub causing brief RCD-edge events, (C) marginal HRJ at one of the downlight terminations. Stage 3 — plan tests. Most discriminating test: substitute known-good non-dimmable LED on a non-dimmed circuit; if flicker stops, it\'s the dimmer/hub. If flicker persists with substituted lamp, escalate to clamp meter for cumulative leakage check; thermal imaging for HRJ. Stage 4 — execute. Substitute test eliminates flicker. Stage 5 — analyse. Hypothesis A confirmed; the smart hub\'s PWM signal isn't compatible with the cheap LED drivers used. Stage 6 — formulate fix. Replace LED downlight drivers with units rated for smart-hub compatibility (Lutron-certified or similar). Stage 7 — execute. Customer agrees, drivers replaced, smart-hub control restored, flicker eliminated. Document on job sheet.</>}
            whyItMatters={<>The structured approach finds the root cause (driver-hub incompatibility) rather than the symptom (one bulb flicker). The fix is a one-time replacement; the customer's smart-hub investment is preserved. Without the structured approach, the apprentice might have replaced bulbs (no fix), replaced the hub (expensive, didn't fix), or replaced wiring (massive cost, didn't fix). The seven stages prevent the wrong fix.</>}
          />

          <SectionRule />

          <ContentEyebrow>Stage 1 — symptom collection in depth</ContentEyebrow>

          <ConceptBlock
            title="The six-question customer interview that drives the diagnosis"
            plainEnglish="The customer interview is the most data-rich stage. Six questions reliably extract the diagnostic information: WHAT exactly happens; WHEN did it start; WHERE in the property does it happen; WHY do you think it's happening; WHAT'S CHANGED recently; WHAT'S WORKED in the past."
            onSite="Document each answer in the job sheet — verbatim quotes are valuable. Use prompts to draw out detail: 'When you say it flickers, what does it look like — slow pulsing, fast strobing, or just dimming briefly?' Customer language is often vague; the apprentice's job is to translate vague-words into engineering-words."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WHAT exactly happens</strong> — translates customer-language to engineering-categories. 'Lights go funny' becomes 'flicker', 'dim brief', 'flash off-on', 'colour shift' — each maps to different fault hypotheses.</li>
              <li><strong>WHEN did it start</strong> — gradual onset (HRJ developing, water ingress progressing) vs sudden (component failure, vermin damage, lightning event).</li>
              <li><strong>WHERE in the property</strong> — single circuit (focus there), multiple circuits but one phase (phase issue), all circuits (supply issue), correlated with specific room (load issue).</li>
              <li><strong>WHY do you think</strong> — customer's hypothesis. Often wrong but contains useful clues ('it started after the storm' = consider transient damage; 'it only happens when the kettle boils' = voltage drop / cumulative load).</li>
              <li><strong>WHAT'S CHANGED</strong> — recent building work, new appliances, recent EICR / repair work, new neighbours' equipment. The change is often the cause.</li>
              <li><strong>WHAT'S WORKED</strong> — previous fixes attempted, by whom, when. Avoids repeating dead-ends.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 2 — hypothesis formulation</ContentEyebrow>

          <ConceptBlock
            title="The candidate-hypothesis approach — three to five competing explanations"
            plainEnglish="Don't lock onto one hypothesis too early. List three to five candidates that could explain the symptoms; design tests to discriminate between them. The right answer often isn't the most obvious one."
            onSite="The L3 apprentice's discipline: write out the candidates explicitly (on the job sheet, in the head, in a notebook) before testing. Each candidate gets ranked for prior probability (based on customer info, visual inspection, symptom pattern). Then design the most-discriminating test — the one whose result eliminates the most candidates."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>List candidates</strong> — minimum 3, maximum 5. Each must be a plausible cause of the observed symptoms.</li>
              <li><strong>Rank by prior</strong> — based on age of installation, customer info, recent changes, visual signs. Highest-prior candidate gets first test.</li>
              <li><strong>Most-discriminating test</strong> — pick the test whose result divides the candidates fastest. Avoid tests where every candidate gives the same result.</li>
              <li><strong>Update on result</strong> — Bayesian update: a positive result strongly supporting candidate A reduces probability of B, C, D. Re-rank after each test.</li>
              <li><strong>Confirmation bias trap</strong> — don't only test what would CONFIRM your favourite candidate. Always include at least one test that would FALSIFY it.</li>
              <li><strong>Document the reasoning</strong> — write down hypotheses and test plan before testing. Forces the discipline.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 3 — test planning and instrument selection</ContentEyebrow>

          <ConceptBlock
            title="Choosing tests by speed, cost and discrimination"
            plainEnglish="Tests have different costs (time, customer impact, equipment cost) and different discriminating power. Cheap tests first, expensive tests later, but only if needed."
            onSite="Standard test ladder for fault diagnosis: (1) visual + customer interview (free, takes minutes); (2) live tests with multimeter / clamp meter (low cost, no isolation, low risk); (3) thermal imaging (low cost if firm has the camera, no isolation, non-invasive); (4) targeted live MFT tests like EFLI Hi-Z (low risk, no isolation needed); (5) dead tests requiring isolation (continuity, R1+R2, IR — modest customer impact); (6) PQ analyser deployment (significant equipment, multi-day); (7) specialist tests (motor analyser, low-resistance ohmmeter)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Test ranking</strong> — speed × discriminating-power. Fast and discriminating wins (e.g. clamp meter for cumulative leakage).</li>
              <li><strong>Customer-impact factor</strong> — tests requiring isolation have customer impact; weigh against discriminating power.</li>
              <li><strong>Equipment availability</strong> — thermal camera, PQ analyser, motor analyser may need booking from firm's tool store.</li>
              <li><strong>Stop-criteria</strong> — define before testing what result means 'fault confirmed' vs 'continue investigation'. Prevents over-testing.</li>
              <li><strong>Documentation plan</strong> — what readings to record, in what units, on what form. Job sheets / certificates.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stage 4 — execute tests safely under Reg 643</ContentEyebrow>

          <ConceptBlock
            title="The dead-then-live test sequence and what it tells you"
            plainEnglish="Stage 4 is the test execution. BS 7671 Reg 643.7.1 (TN systems verification of automatic disconnection) sets the principle: confirm fault protection by measuring earth fault loop impedance and verifying the protective device characteristics. The dead-then-live order is non-negotiable — visual, continuity, IR at 500 V (or 250 V with electronics connected per the A4:2026 redraft of Reg 643.3), polarity, then live for Zs and RCD operation. Skipping a step or running them out of order leaves gaps in the diagnostic evidence."
            onSite="On a fault job the test sequence is targeted by the hypothesis from stage 2. If your hypothesis is 'HRJ at the consumer unit', the test ladder runs: visual at the CU, continuity of the suspect circuit, IR at 500 V with the load disconnected, polarity, then a load test with a clamp meter to find the voltage drop under high current. If your hypothesis is 'failed RCD on the EV charger circuit', the ladder runs: A4:2026 single AC test at 1×IΔn on the RCBO, leakage clamp at L+N to find the steady-state residual, then circuit-by-circuit isolation to localise."
          >
            <p>
              The Reg 643 test ladder applied to fault diagnosis:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection (Reg 642.2)</strong> — three-part check: BS / EN
                product compliance, correct selection and erection per manufacturer's
                instructions, no visible damage that impairs safety. Free, fast,
                discriminating.
              </li>
              <li>
                <strong>Continuity tests</strong> — CPC continuity end-to-end with a
                low-resistance ohmmeter; ring final continuity if the circuit is a ring.
                Catches broken CPCs and incomplete rings before any energisation.
              </li>
              <li>
                <strong>Insulation resistance (Reg 643.3)</strong> — 500 V on isolated
                wiring (electronics disconnected), 250 V on the same circuit with
                electronics reconnected. Two-stage test catches both wiring degradation
                and as-installed equipment leakage.
              </li>
              <li>
                <strong>Polarity</strong> — line and neutral correct at every point.
                Polarity errors are typically C2 on EICR.
              </li>
              <li>
                <strong>Earth fault loop impedance (Zs)</strong> — measured with a loop
                tester at the furthest point of each final circuit. Compared to Table 41.3
                / 41.4 maximum for the protective device. The B32 max is 1.37 Ω in A4:2026.
              </li>
              <li>
                <strong>RCD operating time (Reg 643.7.3)</strong> — single AC test at
                1×IΔn per the A4:2026 redraft. Operating time recorded against BS EN 61008
                / 61009 limits. Drifted RCDs replaced regardless of other findings.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Stages 5-7 — analysis, fix design, execution</ContentEyebrow>

          <ConceptBlock
            title="From test results to corrective action — the analysis-design-execute loop"
            plainEnglish="Test results tell you what's wrong. Designing the fix means weighing repair vs replace, considering compliance impact, planning customer communication, scheduling parts and time. Execution is the physical work — but it's the design step that determines whether the fix lasts."
            onSite="The L3 apprentice's analysis stage looks at: what does this reading tell me about the system? Does it match my hypothesis? Are there any results that contradict? Can I confirm the root cause with one more test? The fix-design stage looks at: what's the minimum scope of work to fix this? What's compliant under BS 7671? What's economic? What does the customer expect? What documentation will the firm need?"
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Result interpretation</strong> — read against expected (BS 7671 limits, design values, manufacturer specs). Document any out-of-range readings.</li>
              <li><strong>Root cause vs symptom</strong> — confirm you've found the cause, not just an effect. Test by predicting what fixing the root cause will do.</li>
              <li><strong>Repair vs replace</strong> — Sub 5.1 covers this in depth. Repair is usually cheaper; replace is usually more reliable; depends on age, accessibility, compliance.</li>
              <li><strong>Compliance check</strong> — does the fix bring the installation up to current BS 7671? Or just restore to prior state? A4:2026 may force upgrades (AFDD, SPD, Type A/B RCD).</li>
              <li><strong>Customer brief</strong> — explain the fault, the fix, the cost, the timeline. Get customer agreement before starting.</li>
              <li><strong>Execution</strong> — isolation, work, retest, restore, document. Then the certification (Minor Works Cert for single-circuit, EICR if multi-circuit work was done).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Seven stages: collect symptoms, formulate hypothesis, plan tests, execute tests, analyse results, formulate fix, execute fix.",
              "Hypothesis stage (2) is the most important — drives the test plan; targeted tests vs random testing is 30 minutes vs 4 hours.",
              "Iterative loop between stages 2–5: update hypothesis when test results don't match; keep iterating until hypothesis explains all evidence.",
              "Symptoms are what customer notices; faults are underlying engineering conditions. Diagnosis is the mapping process.",
              "Test ordering: safety (dead before live), discrimination (most-narrowing first), cost (quick / free before slow / expensive).",
              "Visual inspection at stage 1 catches the easy 30% of faults — scorched terminals, water marks, signs of past faults — before any instrument used.",
              "Document each stage on the job sheet — symptoms, hypothesis, test plan, results, analysis, fix plan, fix execution. Defensible diagnostic narrative.",
              "Even 'obvious' fixes benefit from a mental run-through of the stages. Apprentices who skip find the cases where obvious was wrong.",
            ]}
          />

          <Quiz title="Logical stages of diagnosis — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.5 Special precautions</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.2 Identifying supply + tests</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
