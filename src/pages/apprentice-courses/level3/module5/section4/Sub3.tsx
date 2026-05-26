/**
 * Module 5 · Section 4 · Subsection 3 — RCD trip-time testing per A4:2026
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.4
 *   AC 6.4 — "state the methods for verifying protection by automatic disconnection of supply"
 * Layered: GN3 RCD test methodology, BS EN 61557-6 instrument standard
 *
 * CRITICAL A4:2026 CHANGE:
 *   Reg 643.7.3 — RCD test simplified to a SINGLE AC test at 1 x I delta n.
 *   The older multi-test sequence at multiples of I delta n (1/2, 1, 5) is
 *   DELETED. The 5 x I delta n test no longer exists in BS 7671 — it was
 *   removed in A4:2026.
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

const TITLE = 'RCD trip-time testing (A4:2026 single AC at 1 x I delta n) | Level 3 Module 5.4.3 | Elec-Mate';
const DESCRIPTION =
  'A4:2026 Reg 643.7.3 simplified the RCD verification to a single AC test at 1 x I delta n. The multi-test sequence at multiples of I delta n is DELETED. Covers RCD types AC / A / F / B / time-delayed, the 300 ms general limit, the Ra x I delta n less than or equal to 50 V test on TT, and the manufacturer test button as a separate functional check.';

const checks = [
  {
    id: 'm5-s4-sub3-single-test',
    question: 'Under A4:2026 Reg 643.7.3, the in-service RCD test for a 30 mA RCD is:',
    options: [
      'No — the STR is the regulatory document. The instrument download is a useful audit trail and a way to capture test data at the point of testing, but the completed STR with all required fields and signatures is what satisfies Reg 642.4 and Section 644. Most professionals use the download to populate the STR rather than as a standalone replacement.',
      'A single AC test at 1 x I delta n (i.e. 30 mA for a 30 mA RCD). The trip time must be within 300 ms for a general-purpose 30 mA RCD per Table 41.1. The older multi-test sequence (1/2 to confirm no nuisance trip, 1 to confirm operation within 300 ms, 5 to confirm fast operation) was removed in A4:2026 and is no longer required for verification. Modern MFTs still offer the older test as a menu option but it is NOT required.',
      'Wide investigative powers — enter any premises (without warrant) at any reasonable time, take measurements / photographs / samples, inspect documents, require people to answer questions, take statements, take possession of articles or substances they think pose a risk, and seek a magistrate\\\'s warrant if entry is refused. Failure to co-operate is itself a separate criminal offence under s.33.',
      'Section 722 of BS 7671 (Electric vehicle charging installations) is the regulation anchor. It applies in addition to the rest of BS 7671 and covers the supply, the charging point, the protective measures (especially the PEN-fault and additional protection requirements), the cable rating and the means of isolation. A4:2026 has refined Section 722 alongside the broader updates around TN-C-S systems (now PNB) and AFDD requirements.',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 simplified RCD verification to a single AC test at 1 x I delta n. The trip time recorded against the Table 41.1 limit (typically 300 ms for general-purpose 30 mA RCDs, 40 ms for time-delayed S type at 1 x I delta n) is the verification result. Some MFT menus still default to the old multi-test sequence — switch to single-test mode for compliance with current BS 7671. The simplification reflects that modern RCD designs are reliably within their declared performance envelope; multi-test was redundant.',
  },
  {
    id: 'm5-s4-sub3-types',
    question: 'A 30 mA RCD on a circuit feeding a single-phase variable-speed drive (VSD) should be type:',
    options: [
      'Five locations in approximate frequency order. (1) The CP (control pilot) signal between charger and EV — corroded connector, moisture in J1772 / Type 2 socket; intermittent charge fail. (2) The 6 mA DC RCM (residual current monitoring) within the charger — often the cause of \\\'charger won\\\'t start\\\' symptoms; sometimes a real fault, sometimes a glitch. (3) The supply tail to the charger — if installed alongside an existing CU, the tail termination can loosen under high load (32 A continuous for 5+ hours per charge cycle). (4) The earth electrode for TT-converted installations — Reg 722.411 sometimes requires a dedicated electrode; degradation causes earth-fault timing issues. (5) The charger\\\'s internal contactor — wears after 5+ years of daily switching at 32 A.',
      'The MCS-certified installer (or, for non-MCS installs, the contractor energising the system). The duty is set out in the Distribution Connection and Use of System Agreement (DCUSA) and is enforced via the licensee framework Ofgem oversees. Failure to notify is a breach of the connection conditions and can result in disconnection and loss of any export tariff. As an apprentice you do not sign the notification — but you should recognise that on the install team the duty has a named owner and a 28-day clock from energisation.',
      'You loop back to stage 2 and update the hypothesis. The results have eliminated one hypothesis and may have suggested another. Re-plan tests based on the updated hypothesis (stage 3), execute (stage 4), re-analyse (stage 5). The diagnosis loops between stages 2–5 until you reach a hypothesis that explains all the test results. This iterative loop is normal — first hypotheses are usually partial. The discipline is to keep iterating with structured tests rather than abandon the process and guess.',
      'Type A or Type F minimum, ideally Type B for a true VSD with rectified DC content. Type AC RCDs only detect pure sinusoidal AC residual current — they\\\\\\\'re blind to DC components or pulsed DC. Modern electronic loads (LED drivers, switch-mode PSUs, EV chargers, VSDs, induction hobs) generate residual currents with DC components that Type AC cannot see. A4:2026 leans heavily toward Type A as the default for general use, with Type B mandatory for EV charging (Section 722) and certain industrial applications. Schedule of Test Results column for RCD type accepts AC / A / F / B with (S) suffix for time-delayed.',
    ],
    correctIndex: 3,
    explanation:
      'RCD type selection follows the load. AC = pure sinusoidal AC only. A = AC + pulsating DC. F = A + composite waveforms (motor drives). B = A + F + smooth DC up to 6 mA. Modern installations should default to Type A or higher. Pure Type AC is now considered obsolete for new installations with electronic loads — Reg 531.3.3 (A4:2026) clarifies the selection criteria.',
  },
  {
    id: 'm5-s4-sub3-test-button',
    question: 'The manufacturer test button on an RCD verifies:',
    options: [
      'Five questions. (1) IS PARTS AVAILABLE? Older MCBs may be obsolete; replacement requires new model. (2) IS REPAIR EVEN POSSIBLE? Most MCBs are sealed units; \\\'repair\\\' usually means swap. (3) IS THE EXISTING DESIGN STILL APPROPRIATE? Modern installations may need RCBO (RCD + MCB combined) instead of MCB-only. (4) WILL THE NEW COMPONENT FIT THE BUSBAR? Some old CUs need full CU replacement to fit modern devices. (5) WHAT\\\'S THE OVERALL CU AGE / CONDITION? If the CU itself is approaching end of life (typical 25–30 years), full CU replacement may be the right call. Engineering decision is rarely just \\\'repair vs replace one device\\\'.',
      'The mechanical operation of the device — the test button injects a small simulated residual current through an internal resistor that bypasses the load side, exercising the trip mechanism. It does NOT verify trip time or trip current accuracy. The instrument test (single AC at 1 x I delta n) is the verification of trip current and time. Both are part of the test set: instrument test for performance verification, manufacturer test button as a periodic functional check that the customer can perform between professional inspections.',
      'Sunlight → silicon cells → DC voltage in panel → DC string conductors (panels in series) → DC string isolator at the array → inverter (MPPT, DC-AC conversion) → AC isolator at the inverter → MID-compliant generation meter → AC isolator at the consumer unit (or directly into a dedicated MCB) → consumer unit / DNO supply. Earth-bonding of the array frame to MET; labels at each isolator; manufacturer\\\'s signage at the meter position. Battery storage adds a DC battery and BMS in parallel with the inverter (hybrid topology) or a separate AC-coupled battery inverter.',
      'Minimum £5 million cover (most policies are written at £10m as standard). The certificate must be displayed at each place of business — historically a printed certificate on the wall; the 2008 amendment regulations allow electronic display provided employees can readily access it. Failure to insure is a criminal offence with daily-rate fines up to £2,500 for each day uninsured.',
    ],
    correctIndex: 1,
    explanation:
      'The test button is a functional check, not a calibration check. Pressing it confirms the device operates mechanically; it does not measure performance. The customer is expected to test their RCDs quarterly using the test button — this is the Reg 132.13 documentation handover. The professional inspection at EICR intervals uses the instrument test for the actual performance verification.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A4:2026 made a major simplification to in-service RCD testing. What was deleted from the test set?',
    options: [
      'A standard grid-tied inverter is required to shut down on loss of mains because of anti-islanding rules. Continuous operation through a power cut needs a hybrid inverter with explicit islanded-mode capability, paired with a battery and a changeover arrangement that first electrically isolates the property from the failed grid before re-energising selected circuits. The MCS designer specifies which loads stay alive, the battery sizing, and the transfer time.',
      'The multi-test sequence at multiples of I delta n was deleted. Specifically: the 1/2 x I delta n no-trip test, the 1 x I delta n trip-within-300ms test, and the 5 x I delta n trip-within-40ms test were the older three-test sequence. A4:2026 Reg 643.7.3 simplified this to a SINGLE AC test at 1 x I delta n, with the trip time compared against Table 41.1. The 5 x I delta n test in particular is gone — not just optional, deleted from the verification requirement. Some textbooks, instrument menus and older training materials still reference it; be aware of the change and use the single-test method.',
      'Customer-management overhead. Domestic = single homeowner, conversational, dust sheets, agreed working hours, kids and pets to consider. Commercial = sign-in/sign-out, contractor induction, principal contractor coordination, working out-of-hours where the business operates during the day, retail floor lifts and office desk-shifts to plan around. The wiring may be similar; the choreography around the work is wildly different.',
      '(1) Eliminate — can the chase be avoided entirely (surface mount, alternative route)? (2) Substitute — can a less dust-producing tool be used (resin-bonded chase saw with extraction vs hammer-and-bolster)? (3) Engineer — on-tool extraction connected to an M-class vacuum, water suppression. (4) Administrative — limit duration, rotate operatives, restrict access. (5) PPE — FFP3 mask as the LAST line, not the first. RPE alone is not COSHH-compliant for routine silica work.',
    ],
    correctAnswer: 1,
    explanation:
      'The A4:2026 simplification reflects modern RCD design reliability — multi-test was redundant. The single AC test at 1 x I delta n is the verification. The 5 x I delta n test, which used to confirm fast operation under high fault current, is no longer required. Be alert to this when using older instruments or following older procedures — switch to single-test mode and document the result against Table 41.1.',
  },
  {
    id: 2,
    question: 'The Schedule of Test Results column for RCD type accepts the following codes:',
    options: [
      'Realistic optimism acknowledges genuine difficulties and negative emotions while maintaining evidence-based belief in the possibility of positive outcomes. Toxic positivity dismisses or invalidates negative emotions ("Just think positive!"), which actually increases suffering by adding shame about feeling bad on top of the original difficulty.',
      'A pro forma is a quote-style document that looks like an invoice but doesn\\\\\\\'t trigger a tax point — typically used for upfront payment requests before work begins (e.g. materials deposit). Once the customer pays the pro forma, you issue the actual VAT invoice. Useful for cash-flow management on jobs where you need materials money upfront. Doesn\\\\\\\'t count toward turnover until converted to a real invoice.',
      'AC, A, F or B — and a time-delayed device adds (S) suffix for devices to BS EN 61008, BS EN 61009 or BS EN 62423. So a time-delayed Type A device is recorded as "A (S)". The type code reflects the residual-current waveform sensitivity: AC = pure sinusoidal AC; A = AC + pulsating DC; F = A + composite (motor drives); B = A + F + smooth DC. Time-delayed (S) means selective tripping coordination — typically used as an upstream device with downstream non-delayed RCDs on individual circuits.',
      'Annual visual inspection by the user (cable condition, no damage to connector, no signs of overheating). Periodic BS 7671 EICR every 5 years (or change of tenancy for landlord properties under the Electrical Safety Standards Regulations 2020). EV-specific tests: RCD operation (Type B or RDC-DD), open-PEN protection function (where fitted), Zs at the charge point. Manufacturer-recommended firmware updates as available. Where the charger has been involved in a fault event (known surge, vehicle-side incident) bring forward the inspection.',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 retained the four-type taxonomy. Recording the type accurately on the schedule is part of compliance — it lets future inspectors and any specialist verifying compatibility check that the RCD type matches the load characteristics. Type AC is increasingly considered obsolete for new installations with electronic loads; new domestic installations should default to Type A minimum.',
  },
  {
    id: 3,
    question: 'Table 41.1 (A4:2026) maximum disconnection times for a 230 V final circuit not exceeding 32 A:',
    options: [
      'A damaged or over-charged lithium cell can heat itself by internal short-circuit. Above a chemistry-dependent threshold (around 200 °C for NMC, around 270 °C for LFP) the cell\\\\\\\\\\\\\\\'s internal materials decompose exothermically — releasing more heat that propagates to neighbouring cells. The reaction is self-sustaining and standard water-based extinguishers do not stop it. Hence the emphasis on chemistry, BMS, segregation and detection.',
      'Accountability structures are important because EI development involves changing habitual patterns, which is difficult without external support. An effective structure might include: a development partner (colleague or mentor who checks in regularly), a reflective journal (tracking specific incidents and responses), regular self-assessments, and scheduled review points to evaluate progress against goals',
      'C&I is a specialised electrical-technician discipline covering process control systems, instrumentation, PLCs, SCADA and DCS. Typical route: Approved Electrician + HNC/HND in Electrical/Electronic or Process Control + employer-specific training (Siemens, Rockwell, Schneider PLC training). Common employers: process industries (food, pharma, water utilities), petrochemical, large manufacturing.',
      '0.4 seconds (400 ms) for TN, 0.2 seconds (200 ms) for TT — these are the maximum disconnection times specified in Table 41.1 for the supply system and final-circuit type. For a 30 mA general-purpose RCD operated by a 30 mA residual current (1 x I delta n), the manufacturer\\\\\\\\\\\\\\\'s declared maximum trip time is 300 ms (per BS EN 61008 / BS EN 61009 product standards) — well within the Table 41.1 system requirement. The verification is the Table 41.1 limit; the 300 ms is the product spec.',
    ],
    correctAnswer: 3,
    explanation:
      'Table 41.1 is the system-level disconnection time requirement; the product spec (300 ms for general-purpose 30 mA RCD) is the device-level performance. The two interlock — a device meeting its product spec also satisfies the system requirement. For TN final circuits up to 32 A: 0.4 s. For TT final circuits up to 32 A: 0.2 s. Distribution circuits have longer permitted times (up to 5 s on TN, 1 s on TT).',
  },
  {
    id: 4,
    question: 'On a TT installation with Ra = 100 Omega and a 30 mA RCD, the Ra x I delta n test gives:',
    options: [
      '3 V — pass. Calculation: Ra x I delta n = 100 x 0.030 = 3 V. The acceptance criterion (Reg 411.5.3(b)) is Ra x I delta n less than or equal to 50 V (the conventional touch-voltage limit). 3 V is well within 50 V — the RCD will operate well before the touch-voltage approaches dangerous level. For the same Ra with a 100 mA RCD: 100 x 0.100 = 10 V — still pass. With a 300 mA RCD: 100 x 0.300 = 30 V — still pass but tighter. The Ra x I delta n calculation is the TT-specific acceptance test.',
      '(1) Take the tool out of service immediately — don\\\'t try to use it \\\'gently\\\'. (2) Apply the firm\\\'s quarantine tag (\\\'do not use\\\', signed and dated). (3) Move the tool to the firm\\\'s quarantine area (or, on site, to the supervisor\\\'s box). (4) Log the defect in the firm\\\'s tool register or defect log. (5) Tell the supervisor — verbally as well as written. (6) Get an alternative tool to continue the work. The fix happens later by a competent person; the apprentice\\\'s job ends at quarantine + report.',
      'Schedule 1 Part P of the Building Regulations 2010 sets the legal requirement that \\\'reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury\\\'. The Approved Document P guidance then names BS 7671 as the recognised way to meet that requirement. So in a dwelling in England, BS 7671 compliance is the practical route to legal compliance.',
      'Three crimpers — (1) ratchet H-die crimper for bootlace ferrules and small insulated lugs (0.5 to 6 mm² covers 90% of domestic / small commercial work, e.g. Knipex 97 53 04). (2) Hex-die ratchet crimper for compression lugs 10 to 25 mm² (e.g. Knipex 97 51 19). (3) Hydraulic crimper for compression lugs and bushings 25 to 240 mm² (e.g. Klauke EK 50 cordless or hand-pump units for one-off work). Layered range, each tool sized to its job.',
    ],
    correctAnswer: 0,
    explanation:
      'Ra x I delta n is the TT acceptance test for RCD-based ADS. The product (in volts) tells you the touch-voltage that would appear on exposed-conductive-parts during a fault, before the RCD operates. Less than or equal to 50 V is the acceptance criterion. Higher Ra or higher I delta n pushes the touch-voltage up. Real TT installations typically have Ra of 30-200 Omega and 30 mA RCDs, giving Ra x I delta n of 0.9-6 V — comfortable pass.',
  },
  {
    id: 5,
    question: 'You measure RCD trip time at 1 x I delta n = 35 ms on a 30 mA RCD. Compliance per A4:2026 / Table 41.1?',
    options: [
      'Any deliberate deviation from a BS 7671 requirement that the designer judges acceptable for the specific installation, with justification — for example, omitting an RCD on a non-dwelling socket-outlet under the Reg 411.3.3 risk-assessment exception. Each departure must be documented with reasoning and accepted by the duty-holder.',
      'Pass. The maximum trip time at 1 x I delta n for a general-purpose 30 mA RCD is 300 ms per the product standard, and the system disconnection time is 400 ms (TN) or 200 ms (TT) per Table 41.1. 35 ms is well under all limits. A trip time of 35 ms is typical for a healthy modern RCD; older RCDs may give 80-200 ms — also within limits. Trip times near or exceeding 300 ms suggest the RCD is approaching end of life and should be replaced.',
      'A witness-by-assessor practical in a controlled environment (lab or training centre with realistic installation rigs). Candidate completes a full test sequence on a sample installation: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD operation, prospective fault current. Then completes the relevant certificate (EIC or EICR) accurately. Time-pressured but realistic.',
      'MCS now covers battery storage as a separate technology category (alongside PV, solar thermal, heat pumps, biomass, wind). Battery installation typically pairs with PV (combined PV+battery system) or as a standalone retrofit. MCS battery certification follows MIS 3012 install standard and requires installer competence in DC battery systems, BMS commissioning, and grid-tie inverter integration.',
    ],
    correctAnswer: 1,
    explanation:
      'Healthy RCDs trip well within their declared limits. 35 ms is fast and indicates a device in good condition. The Table 41.1 limits give system-level safety margin; the device-level spec gives the device-level margin. Both should comfortably pass on a healthy installation. Drift toward the limit is the warning sign — replace the RCD before it actually fails.',
  },
  {
    id: 6,
    question: 'On an installation with all-RCBO consumer unit (e.g. 12 RCBOs), how many RCD tests do you carry out for verification?',
    options: [
      'Voltage drop on the upstairs lighting circuit, OR a problem at the upstairs lighting tap-off. Most likely causes: (1) HRJ at a junction box upstream of the upstairs lights, (2) loose terminal at the lighting RCBO, (3) high-resistance neutral on the upstairs circuit (broken or partially connected), (4) under-sized cable retrofit (someone replaced cable with smaller cross-section). Test: measure voltage at an upstairs lampholder under normal load; compare to nominal 230 V. If significantly low (&lt;220 V), trace upstream for the HRJ. Thermal imaging at the suspected location.',
      'Isolate AC and DC sides, lock-off, prove dead. Disconnect strings panel by panel. Remove panels using safe roof-access procedures. Recover the panels for recycling — established PV recycling streams in the UK take aluminium frames, glass, copper wiring and silicon cells separately. Inverter and any battery component handled as WEEE (electronics) and hazardous waste (battery) respectively. Roof penetrations made good. Update the EIC to reflect the removal. The MCS-certified installer (or successor) typically arranges the decommissioning chain through authorised waste carriers.',
      'One per RCBO. Each RCBO is an independent RCD device. Test each at 1 x I delta n, record trip time on the Schedule of Test Results against the circuit number. Standard MFT workflow: select RCD test mode, set I delta n to 30 mA (or other rating per device), AC test, plug into the circuit\\\\\\\\\\\\\\\'s socket or test from the RCBO load terminals, press TEST, record trip time, move to next circuit. 12 RCBOs = 12 tests + 12 readings on the schedule. Modern MFTs auto-fill the schedule when they\\\\\\\\\\\\\\\'re paired with certification software.',
      'Brings the installed systems to life — energising, testing, setting parameters, demonstrating compliance, and signing the system over to the client. On a commercial project commissioning is a distinct phase after the install: the Commissioning Engineer runs the test sequence, configures the BMS, programmes the panels, sets the protection settings and produces the commissioning records that go in the O&M manual.',
    ],
    correctAnswer: 2,
    explanation:
      'Each RCBO is its own RCD. Verification requires testing each individually. The schedule has a row per circuit; the RCD test result goes in the appropriate column. Skipping circuits because "the others passed" is a verification gap. Most modern MFTs auto-pair with certification software (Megger CertSuite, Fluke FlukeView, Kewtech KEWPRO) and prompt for each circuit\'s test in turn.',
  },
  {
    id: 7,
    question: 'A 30 mA RCD on a kitchen socket circuit fails the trip-time test (reads 380 ms, limit 300 ms). What\'s the appropriate response?',
    options: [
      'Over-torquing crushes the conductor strands, deforms the terminal, can crack the device housing, and reduces the long-term mechanical and electrical reliability of the connection. It also voids the manufacturer\\\\\\\'s warranty (most warranties are explicitly conditional on the specified torque) and creates a Reg 526.1 risk because a damaged connection is no longer \\\\\\\'durable\\\\\\\'.',
      '(1) T+E shears or rotary cable stripper to crop the conductor square and to the right length. (2) Auto-stripper or preset 4 mm² stripper to remove insulation cleanly without nicking strands. (3) (Optional but preferred) — slip a grey 4 mm² bootlace ferrule on, ratchet-crimp it. (4) Insert into terminal. (5) Tighten with preset torque driver to manufacturer\\\\\\\'s value (typically 2–3 Nm for Schneider isolators).',
      'Although the PD\\\\\\\'s primary duty is during the pre-construction phase (gathering and providing pre-construction information), they often make periodic visits during construction to verify that the design assumptions held up and that the pre-construction H&S information is being used. This is especially common on complex projects where design changes during construction.',
      'Fail the device. Issue a Code C2 (potentially dangerous) on the EICR if applicable, document on the Schedule of Test Results, replace the RCD or RCBO. A trip time exceeding the 300 ms manufacturer\\\\\\\\\\\\\\\'s declared limit means the device cannot be relied upon to disconnect within the Table 41.1 system requirement. The RCD is approaching end of life and may fail to operate at all on the next fault. Replace, retest, document the remediation. Do not leave the installation in service relying on a failed RCD.',
    ],
    correctAnswer: 3,
    explanation:
      'A failed RCD is not a borderline pass — it\'s a defect that needs remediation. The 300 ms product limit is the floor; readings above it mean the device no longer meets its declared performance. EICR coding C2 (potentially dangerous) is the standard for a failed RCD on a circuit that relies on it for ADS. Replace the device, retest, document. Customer briefing should explain that the RCD has reached end of life and needed replacement.',
  },
  {
    id: 8,
    question: 'The manufacturer\'s test button on a domestic RCD is intended to be operated by:',
    options: [
      'The customer / occupier as a periodic functional check, typically quarterly. Reg 132.13 requires the documentation handover to include test instructions for the customer. The test button verifies mechanical operation only — it does NOT verify trip time. The professional verification (instrument test at 1 x I delta n) happens at EICR intervals (typically 5 years residential rented, 10 years owner-occupied). The two tests are complementary — frequent functional checks by the customer + periodic performance verification by the inspector.',
      'Resolve it informally first where possible. The ACAS Code recommends informal resolution as the starting point, then a written grievance under the employer\\\\\\\'s documented grievance procedure, then a meeting with management with the right to be accompanied by a colleague or trade-union representative, then a written outcome with a right of appeal. ACAS conciliation is available if the internal procedure fails. Employment tribunal is the last resort and tribunals will assess whether both parties followed the Code reasonably.',
      'Because a ladder is a personal access platform that doesn\\\\\\\'t have a guardrail and depends on the user\\\\\\\'s three-point contact and footing for stability. It provides minimal collective protection. INDG401 and INDG402 (HSE guidance) limit ladder use to short-duration tasks (typically up to 30 minutes at one location), light work (one-handed work where reasonably practicable, with a free hand for grip) and where a higher control isn\\\\\\\'t reasonably practicable.',
      'Micro-hydro can deliver excellent baseload renewable electricity if the site has the head (vertical drop) and flow rate to support it. Unlike wind and PV, hydro runs 24/7 and tracks demand reasonably well. Practical issues: Environment Agency / Natural Resources Wales abstraction licensing, fish protection requirements, weir and intake construction cost, and connection to the property (often hundreds of metres of buried cable). The right site is rare; where it exists, micro-hydro is one of the best-performing renewables per pound spent.',
    ],
    correctAnswer: 0,
    explanation:
      'The test button is the customer\'s tool for ongoing assurance. The handover documentation under Reg 132.13 should include the test method ("press T quarterly, breaker should trip; reset by switching back on") and a note to call an electrician if the RCD fails to trip. The instrument test at EICR intervals is the inspector\'s verification — different role, different tool. Both are needed for full lifecycle assurance.',
  },
];

const faqs = [
  {
    question: 'Why was the 5 x I delta n test removed in A4:2026?',
    answer:
      'The 5 x I delta n test was a legacy from older RCD designs where fast tripping at high fault current needed separate verification. Modern RCDs (BS EN 61008 / BS EN 61009 compliant) have reliable performance across the residual-current range — if the device passes at 1 x I delta n, it will reliably trip faster at higher residual currents. The 5 x I delta n test was redundant and added test time without adding safety margin. A4:2026 simplified to a single test based on this design maturity.',
  },
  {
    question: 'My MFT defaults to the old multi-test sequence. Should I use single-test mode instead?',
    answer:
      'Yes. The single AC test at 1 x I delta n is the A4:2026 requirement. Most modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) have a "single test" mode in the RCD test menu — switch to it. The multi-test sequence will still pass / fail correctly but produces three readings where one is sufficient, and the 5 x I delta n test in particular is no longer required. For documentation simplicity and A4:2026 alignment, use single-test mode.',
  },
  {
    question: 'How do I test a time-delayed (S) RCD?',
    answer:
      'Same single AC test at 1 x I delta n, but the trip time will be longer because the device is intentionally delayed. Typical S-type at 1 x I delta n trips in 130-500 ms (within the device\'s rated delay). Table 41.1 / 41.5 give the system-level requirements for time-delayed devices. The MFT may have a separate "S" test mode that adjusts the timing window — check the manual. The principle is the same as standard RCD test, just with longer permitted trip time.',
  },
  {
    question: 'What about Type B RCDs — different test method?',
    answer:
      'Type B RCDs detect smooth DC, AC, and pulsating DC. The verification at 1 x I delta n AC is still the primary test (per Reg 643.7.3). Some MFTs also offer a DC test specifically for Type B devices — useful for full verification on installations with significant DC content (EV chargers, large PV systems). For routine verification the AC test is sufficient and is what BS 7671 requires; the DC test is an additional check. Always document the test type used.',
  },
  {
    question: 'Can I test the RCD with the load connected, or do I need to disconnect the load?',
    answer:
      'Test with the load connected — that\'s the in-service test condition. The MFT applies its test current to the L-E loop on the load side of the RCD; the RCD sees the test as a residual current and trips. Pre-existing leakage currents on the circuit (from electronic loads, motor windings, etc.) sum with the test current — typically not enough to affect the trip time materially, but can on heavily-leaking circuits. If the trip time looks anomalous, disconnect non-essential loads and retest. The RCD test method assumes normal in-service conditions.',
  },
  {
    question: 'What if the RCD fails the test mid-EICR?',
    answer:
      'Document the failure, explain to the duty holder, and recommend immediate replacement. EICR coding C2 (potentially dangerous) is the standard for a failed RCD on a circuit relying on it for ADS. The duty holder is informed of the C2; under EAWR Reg 4(2) they have a duty to act. Most firms fit a replacement during the same visit if the customer agrees (additional MWC for the device swap), or quote for a return visit. Leaving a failed RCD in service with the customer informed is the duty holder\'s decision — but the inspector\'s record of the C2 and the recommendation is the protection if anything goes wrong.',
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 3"
            title="RCD trip-time testing (A4:2026 single AC at 1 x I delta n)"
            description="A4:2026 Reg 643.7.3 simplified the RCD verification to a single AC test at 1 x I delta n. The multi-test sequence at multiples of I delta n is DELETED. Covers RCD types AC / A / F / B / time-delayed, the 300 ms general limit, the Ra x I delta n less than or equal to 50 V test on TT, and the manufacturer test button as a separate functional check."
            tone="emerald"
          />

          <TLDR
            points={[
              "A4:2026 Reg 643.7.3: single AC test at 1 x I delta n. The older multi-test (1/2, 1, 5 x I delta n) is DELETED. The 5 x I delta n test no longer exists in BS 7671.",
              "Trip time compared against Table 41.1 system limits (TN final 0.4 s, TT final 0.2 s) and the device product spec (300 ms typical for general-purpose 30 mA RCD).",
              "RCD types — AC (sinusoidal only, obsolescent), A (AC + pulsating DC, modern default), F (motor drives), B (smooth DC up to 6 mA, mandatory for EV charging). Time-delayed adds (S) suffix.",
              "TT installations: Ra x I delta n less than or equal to 50 V verifies RCD-based ADS. For 100 Omega Ra and 30 mA RCD: 3 V — comfortable pass.",
              "Manufacturer test button verifies mechanical operation only, NOT trip time. Customer-operated quarterly per Reg 132.13. Instrument test at EICR is the performance verification.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the A4:2026 single AC test at 1 x I delta n per Reg 643.7.3 — the multi-test at multiples of I delta n is deleted.",
              "Compare measured RCD trip time against Table 41.1 system limits and the device product spec (300 ms general-purpose).",
              "Identify RCD types AC / A / F / B and time-delayed (S) per device labelling and select appropriately for the load.",
              "Carry out the Ra x I delta n less than or equal to 50 V acceptance test on TT installations for RCD-based ADS verification.",
              "Distinguish the manufacturer test button (mechanical functional check, customer-operated) from the instrument trip-time test (performance verification, inspector-operated).",
              "Test each RCBO on an all-RCBO consumer unit individually and record trip time per circuit on the Schedule of Test Results.",
              "Apply EICR coding (C2 typically) for an RCD failing the trip-time test and document recommended remediation.",
              "Brief the customer on quarterly test-button operation per Reg 132.13 documentation handover.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The A4:2026 simplification — what changed</ContentEyebrow>

          <ConceptBlock
            title="Single AC test at 1 x I delta n — and that\'s it"
            plainEnglish="A4:2026 simplified the in-service RCD test from a three-test sequence (1/2, 1, 5 x I delta n) to a single AC test at 1 x I delta n. The trip time recorded against Table 41.1 system limits and the device product spec (typically 300 ms for general-purpose 30 mA RCD) is the verification. The older multi-test sequence is deleted from BS 7671 — including the 5 x I delta n test, which no longer exists in the standard."
            onSite="Be alert to the change. Older textbooks, training materials and instrument menus still reference the multi-test sequence. Switch your MFT to single-test mode. Document the result against Table 41.1 and the product spec — that\'s the A4:2026-aligned verification."
          >
            <p>The simplification in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Old test set (pre-A4:2026):</strong> 1/2 x I delta n (no-trip confirmation), 1 x I delta n (trip within 300 ms), 5 x I delta n (trip within 40 ms). Three tests per RCD.
              </li>
              <li>
                <strong>New test set (A4:2026):</strong> 1 x I delta n AC. Single test. Trip time recorded.
              </li>
              <li>
                <strong>Why simplified:</strong> Modern RCDs (BS EN 61008 / BS EN 61009) have reliable performance across the residual-current range. If the device passes at 1 x I delta n, it will reliably trip faster at higher residual currents. The multi-test was redundant.
              </li>
              <li>
                <strong>What got removed:</strong> The 5 x I delta n test in particular is gone — not just optional, deleted. The 1/2 x I delta n no-trip confirmation also removed.
              </li>
              <li>
                <strong>What still applies:</strong> Trip time at 1 x I delta n must be within Table 41.1 system limit (TN final 0.4 s, TT final 0.2 s) AND the device manufacturer\'s declared limit (typically 300 ms for general-purpose 30 mA RCD).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.7.3 (RCD verification under ADS)"
            clause={`The effectiveness of automatic disconnection of supply by RCDs shall be verified using suitable test equipment according to BS EN 61557-6 (see Regulation 643.1) to confirm that the relevant requirements of Chapter 41 are met, taking into account the operating characteristic of the device.

NOTE: Regardless of RCD Type, effectiveness is deemed to have been verified where an RCD disconnects within the time stated below with an alternating current test at rated residual operating current (IΔn):
(a) for general non-delay type, 300 ms maximum;
(b) for delay 'S' type RCD, between 130 ms minimum and 500 ms maximum.`}
            meaning={
              <>
                Single AC test at the rated residual operating current (IΔn). The acceptance
                limits live in the regulation NOTE: 300 ms maximum for general non-delay RCDs;
                130 ms minimum to 500 ms maximum for time-delayed 'S' type. The earlier multi-test
                sequence (½, 1, 5 × IΔn) is no longer required by A4:2026 — verification is the
                single AC test at IΔn, with the device deemed effective if it trips within the
                NOTE limits. Verification instrument must comply with BS EN 61557-6.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.7.3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>RCD types — AC, A, F, B and time-delayed</ContentEyebrow>

          <ConceptBlock
            title="The four RCD type codes and their residual-current sensitivity"
            plainEnglish="RCD types are categorised by the waveform of residual current they can detect. Type AC — pure sinusoidal AC only. Type A — AC plus pulsating DC. Type F — A plus composite waveforms (single-phase motor drives). Type B — A plus F plus smooth DC up to 6 mA. Modern installations should default to Type A minimum; Type B is mandatory for EV charging and certain other applications."
            onSite="Type AC is increasingly considered obsolescent for new installations because nearly every modern load (LED drivers, switch-mode PSUs, EV chargers, hobs, drives) generates residual currents with DC components Type AC cannot detect. A4:2026 leans toward Type A as the default. Schedule of Test Results column for RCD type accepts the four codes plus (S) suffix for time-delayed."
          >
            <p>The four RCD types in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type AC.</strong> Detects pure sinusoidal AC residual current only. Blind to DC and pulsating DC. Suitable only for circuits with purely resistive / inductive loads — increasingly rare in modern installations. Often replaced by Type A in upgrades.
              </li>
              <li>
                <strong>Type A.</strong> Detects AC plus pulsating DC. The modern default for general use. Suitable for circuits with electronic loads producing pulsating DC residual currents (LED drivers, dimmers, PCs, single-phase motor controllers).
              </li>
              <li>
                <strong>Type F.</strong> Detects A waveforms plus high-frequency composite waveforms typical of single-phase variable-speed drives. Used where motor drives are present.
              </li>
              <li>
                <strong>Type B.</strong> Detects A and F waveforms plus smooth DC up to 6 mA. Mandatory for EV charging (Section 722) and required wherever significant smooth DC residual current is possible (large PV inverters, three-phase VSDs, certain industrial loads).
              </li>
              <li>
                <strong>Time-delayed (S) suffix.</strong> Devices with intentional delay for selectivity coordination. Typically used as upstream RCD with downstream non-delayed RCDs on individual circuits. (S) designation per BS EN 61008 / 61009 / 62423 series.
              </li>
            </ul>
            <p>Selection guidance from A4:2026:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General domestic / commercial:</strong> Type A minimum. Type AC effectively obsolete for new work.
              </li>
              <li>
                <strong>Motor drives (single-phase):</strong> Type F or higher.
              </li>
              <li>
                <strong>EV charging:</strong> Type B (Section 722.531.3.101).
              </li>
              <li>
                <strong>PV inverters with significant smooth DC:</strong> Type B per manufacturer guidance.
              </li>
              <li>
                <strong>Three-phase industrial:</strong> Type B for circuits with significant DC content.
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

          <ContentEyebrow>Table 41.1 — disconnection time limits</ContentEyebrow>

          <ConceptBlock
            title="The system-level disconnection time requirements"
            plainEnglish="Table 41.1 specifies the maximum disconnection times that the protective device (overcurrent or RCD) must achieve under fault conditions. The values depend on the supply system (TN or TT), the circuit type (final or distribution), and the system voltage. For a 230 V final circuit up to 32 A: TN = 0.4 s, TT = 0.2 s. The RCD\'s actual trip time at 1 x I delta n (typically under 100 ms for a healthy device) easily satisfies these limits."
            onSite="Table 41.1 is the system-level requirement; the device product spec (300 ms typical for general-purpose 30 mA RCD per BS EN 61008) is the device-level performance. Both should be satisfied for a compliant installation. The verification compares measured trip time against both, with the tighter limit being the binding constraint."
          >
            <p>Table 41.1 max disconnection times (key values):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN final circuit, up to 32 A, 230 V:</strong> 0.4 s (400 ms).
              </li>
              <li>
                <strong>TN distribution circuit, or final greater than 32 A:</strong> 5 s.
              </li>
              <li>
                <strong>TT final circuit, up to 32 A, 230 V:</strong> 0.2 s (200 ms).
              </li>
              <li>
                <strong>TT distribution circuit, or final greater than 32 A:</strong> 1 s.
              </li>
            </ul>
            <p>RCD product spec (BS EN 61008 / BS EN 61009 general-purpose):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maximum trip time at 1 x I delta n:</strong> 300 ms.
              </li>
              <li>
                <strong>Typical trip time on a healthy device:</strong> 20-100 ms.
              </li>
              <li>
                <strong>Time-delayed (S) at 1 x I delta n:</strong> 130-500 ms (per device spec — check manufacturer).
              </li>
              <li>
                <strong>Drift toward 300 ms:</strong> Warning sign — replace before failure.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>TT-specific — the Ra x I delta n acceptance test</ContentEyebrow>

          <ConceptBlock
            title="Why TT installations need the Ra x I delta n test"
            plainEnglish="On TT installations the loop impedance is dominated by the soil resistance — typically 30-200+ Omega. Overcurrent ADS is not feasible at that impedance, so RCDs are mandatory. The Ra x I delta n test verifies that the touch-voltage during a fault stays below 50 V — the conventional safe touch-voltage limit. For a 100 Omega Ra and a 30 mA RCD: Ra x I delta n = 3 V, well within 50 V."
            onSite="TT verification has two RCD-related tests: the trip-time test at 1 x I delta n (same as TN) AND the Ra x I delta n calculation. Both must pass. Modern MFTs measure Ra (earth electrode resistance) directly; the calculation is then a quick mental sum."
          >
            <p>The Ra x I delta n test in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measure Ra.</strong> The earth electrode resistance, measured with the MFT\'s earth electrode resistance test mode (3-terminal fall-of-potential method or 2-terminal stake-less for typical UK soils). Reading typically 30-200 Omega for a single rod electrode in average soil.
              </li>
              <li>
                <strong>Multiply by RCD I delta n.</strong> 0.030 A for a 30 mA RCD, 0.100 A for 100 mA, 0.300 A for 300 mA.
              </li>
              <li>
                <strong>Compare against 50 V limit.</strong> Result must be less than or equal to 50 V per Reg 411.5.3(b).
              </li>
              <li>
                <strong>If Ra x I delta n is greater than 50 V:</strong> The arrangement does not meet the regulation. Options: reduce Ra (additional electrodes, longer / better-coupled rods), reduce I delta n (smaller RCD where possible), or recognise the system is unfit for purpose.
              </li>
            </ul>
            <p>Worked examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ra = 100 Omega, 30 mA RCD:</strong> 100 x 0.030 = 3 V. Pass — comfortable.
              </li>
              <li>
                <strong>Ra = 200 Omega, 30 mA RCD:</strong> 200 x 0.030 = 6 V. Pass.
              </li>
              <li>
                <strong>Ra = 300 Omega, 100 mA RCD:</strong> 300 x 0.100 = 30 V. Pass — but tighter.
              </li>
              <li>
                <strong>Ra = 500 Omega, 100 mA RCD:</strong> 500 x 0.100 = 50 V. Borderline — at the limit. Investigate.
              </li>
              <li>
                <strong>Ra = 800 Omega, 30 mA RCD:</strong> 800 x 0.030 = 24 V. Pass — but Ra is high enough to warrant investigation of the electrode condition.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3(b) (TT systems, RCD-based ADS)"
            clause="The product Ra x I delta n shall not exceed 50 V, where Ra is the resistance of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms) and I delta n is the rated residual operating current of the protective device (in amperes)."
            meaning={
              <>
                The TT acceptance test for RCD-based ADS. The product Ra x I delta n is the
                touch-voltage that would briefly appear on exposed-conductive-parts during a fault
                before the RCD operates. 50 V is the conventional safe touch-voltage limit for
                normal dry conditions. Verifying Ra x I delta n less than or equal to 50 V
                confirms the RCD will operate before the touch-voltage reaches dangerous level.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 41, Regulation 411.5.3(b)."
          />

          <SectionRule />

          <ContentEyebrow>The manufacturer test button — what it does and doesn\'t verify</ContentEyebrow>

          <ConceptBlock
            title="Test button = mechanical functional check, NOT performance verification"
            plainEnglish="The manufacturer test button on every RCD / RCBO injects a small simulated residual current through an internal resistor that bypasses the load side. Pressing it exercises the trip mechanism and confirms the device operates mechanically. It does NOT measure trip time or trip current accuracy. The instrument test at 1 x I delta n is the performance verification; the test button is the periodic functional check."
            onSite="Reg 132.13 documentation should brief the customer to operate the test button quarterly. If the device fails to trip on the button, call an electrician. The customer\'s test-button discipline + the inspector\'s instrument test at EICR intervals = the complete lifecycle assurance for the RCD."
          >
            <p>The two-test discipline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Test button (customer, quarterly).</strong> Mechanical functional check. Verifies the device can trip. Does not measure trip time or current accuracy.
              </li>
              <li>
                <strong>Instrument test (inspector, EICR intervals).</strong> Performance verification. Single AC test at 1 x I delta n per A4:2026. Measures trip time against Table 41.1 system limits and the device product spec.
              </li>
              <li>
                <strong>Why both:</strong> Test button catches a stuck mechanism between EICR visits; instrument test catches gradual performance drift that the test button can\'t detect (a device may operate mechanically on the test button but be too slow under fault conditions).
              </li>
              <li>
                <strong>Documentation handover (Reg 132.13):</strong> Brief the customer on test-button operation, recommended frequency (quarterly), and what to do if the test fails.
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

          <RegsCallout
            source="IET Guidance Note 3 — Tests confirm Chapter 41 disconnection times"
            clause="The tests carried out during periodic inspection and testing are mainly to confirm that the disconnection times stated in Chapter 41 of BS 7671 are met. This places emphasis on loop impedance, RCD operating times and related verification tests appropriate to the earthing system and circuits concerned."
            meaning={
              <>
                GN3 frames the verification programme around Chapter 41 disconnection times.
                Loop impedance (Zs) and RCD trip-time tests are the headline verifications.
                Each test feeds into confirming the protective devices will disconnect within
                the Table 41.1 limits for the earthing system and circuit type. Skipping or
                under-doing these tests undermines the verification\'s core purpose.
              </>
            }
            cite="Source: IET Guidance Note 3 — Inspection and Testing, periodic inspection emphasis."
          />

          <ConceptBlock
            title="The Schedule of Test Results — what to record per circuit"
            plainEnglish="Each RCD test produces one row of data on the Schedule of Test Results. Standard fields: circuit identification, RCD type (AC/A/F/B with optional S suffix), rated I delta n, measured trip time at 1 x I delta n, pass against Table 41.1 system limit, pass against device product spec (300 ms typical). Modern certification software auto-populates from the MFT data."
            onSite="Modern MFTs paired with certification software (Megger CertSuite, Fluke FlukeView, Kewtech KEWPRO) upload trip times directly into the schedule, removing transcription errors. For older instruments, transcribe manually and double-check against the meter display before saving."
          >
            <p>Schedule of Test Results — RCD test fields:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit identification.</strong> Number and label.
              </li>
              <li>
                <strong>Protective device manufacturer / model.</strong> Identifies the specific
                RCD / RCBO / AFDD-RCBO. Enables traceability if a fault is later found.
              </li>
              <li>
                <strong>RCD type.</strong> AC, A, F or B. Add (S) suffix if time-delayed.
              </li>
              <li>
                <strong>Rated I delta n.</strong> The RCD\'s rated residual operating current —
                30 mA for general-purpose additional protection, 100 mA / 300 mA for
                fire-protection devices, etc.
              </li>
              <li>
                <strong>Measured trip time at 1 x I delta n.</strong> The single AC test result
                in milliseconds.
              </li>
              <li>
                <strong>Test method.</strong> "Single AC at 1 x I delta n per A4:2026 Reg
                643.7.3" — or equivalent wording confirming the simplified method was used.
              </li>
              <li>
                <strong>Pass against Table 41.1 system limit.</strong> 400 ms TN final, 200 ms
                TT final, 5 s TN distribution, 1 s TT distribution.
              </li>
              <li>
                <strong>Pass against device product spec.</strong> Typically 300 ms for
                general-purpose 30 mA RCD per BS EN 61008 / 61009.
              </li>
              <li>
                <strong>Notes.</strong> Test button confirmed; functional check passed; any
                observations.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Time-delayed (S) RCDs — selectivity and longer trip times"
            plainEnglish="Time-delayed (S type) RCDs have an intentional delay built in for selectivity coordination — they wait briefly to give downstream non-delayed RCDs time to clear faults on their own circuits. Typical S-type at 1 x I delta n trips in 130-500 ms (within the device\'s rated delay band). Used as upstream RCD with downstream non-delayed RCDs on individual circuits."
            onSite="S-type RCDs are common on TT installations as the main switch upstream of split RCDs or RCBOs. They give the downstream devices a chance to clear circuit faults before the upstream device trips the entire installation. Verify the S-type trip time against the device product spec — typically longer than general-purpose but still within the system requirement (1 s for TT distribution)."
          >
            <p>Time-delayed (S) RCD verification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Same single AC test at 1 x I delta n</strong> per A4:2026 Reg 643.7.3.
                Trip time will be longer because of the intentional delay.
              </li>
              <li>
                <strong>Compare against device product spec.</strong> Manufacturer datasheet
                quotes the rated trip time at 1 x I delta n — typically 130-500 ms for S-type
                devices.
              </li>
              <li>
                <strong>Compare against system limit.</strong> Table 41.5 gives the system
                disconnection times for distribution circuits — 1 s for TT, 5 s for TN.
                Time-delayed devices are typically used as distribution circuit protection.
              </li>
              <li>
                <strong>Selectivity verification.</strong> The downstream non-delayed RCDs
                should trip first on a fault on their circuits. Test by faulting a downstream
                circuit and confirming only the downstream device trips, not the upstream S-type.
                This is a coordination check, separate from the A4:2026 trip-time verification.
              </li>
              <li>
                <strong>Documentation.</strong> "S" in the type column on the Schedule of Test
                Results — e.g. "A (S)" for a time-delayed Type A device. Trip time recorded as
                normal.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Type B RCDs for EV charging — additional verification"
            plainEnglish="Type B RCDs detect smooth DC residual current up to 6 mA in addition to AC and pulsating DC. They are mandatory for EV charging per Section 722 because EV chargers can produce smooth DC fault current that lower-type RCDs cannot detect. Verification at 1 x I delta n AC is the primary BS 7671 test (Reg 643.7.3); some MFTs offer an additional DC test specifically for Type B devices."
            onSite="Section 722.531.3.101 requires Type B (or Type B-equivalent via DC residual current monitoring) for EV charge points. Some EV chargers have a built-in DC residual current monitoring device (RDC-DD) that allows a Type A upstream RCD; the manufacturer\'s instructions specify which combination is acceptable. Document the chosen approach on the EIC."
          >
            <p>Type B RCD verification specifics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Primary verification: AC at 1 x I delta n.</strong> Per A4:2026 Reg
                643.7.3 — same single test as any other RCD type. Trip time recorded against
                Table 41.1 and the device product spec.
              </li>
              <li>
                <strong>Optional additional DC verification.</strong> Some MFTs offer a DC
                residual current test specifically for Type B devices. Useful for full
                verification on installations with significant smooth DC content (EV chargers,
                large PV inverters).
              </li>
              <li>
                <strong>EV charging specific (Section 722).</strong> Type B RCD OR Type A with
                manufacturer-declared RDC-DD in the EV charge point. Verify whichever
                arrangement is installed.
              </li>
              <li>
                <strong>PV inverters.</strong> Some grid-tie inverters have transformerless
                designs that can produce smooth DC fault current. Manufacturer\'s installation
                manual specifies the required RCD type — typically Type B for transformerless,
                Type A acceptable for transformer-isolated.
              </li>
              <li>
                <strong>Documentation.</strong> "B" in the type column on the schedule. Note any
                manufacturer-specific RDC-DD coordination in the test method notes.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using the old multi-test sequence and recording the 5 x I delta n result"
            whatHappens={
              <>
                You\'re testing RCDs on a domestic and your MFT defaults to the legacy multi-test
                sequence. You run all three tests and record all three readings on the schedule.
                The audit picks up the 5 x I delta n result and queries why you\'re using a test
                that was deleted in A4:2026. The answer is "habit" — but the firm now has to
                explain to the scheme provider why current test methodology wasn\'t followed. The
                certificate may be flagged for re-issue with the correct single-test result.
                Inconvenience plus reputation hit.
              </>
            }
            doInstead={
              <>
                Switch your MFT to single-test mode. The single AC test at 1 x I delta n is the
                A4:2026-aligned method per Reg 643.7.3. Document the trip time once against Table
                41.1 and the device product spec (300 ms general-purpose). Done. The legacy
                multi-test mode still exists in instrument menus but is no longer required by BS
                7671 — using it isn\'t wrong, but it\'s redundant and out of step with current
                practice.
              </>
            }
          />

          <CommonMistake
            title="Pressing the test button and treating it as a verification"
            whatHappens={
              <>
                Apprentice arrives at a domestic for an EICR. Walks to the consumer unit, presses
                the test button on each RCBO, sees them all trip, ticks "RCD verified" on the
                schedule, leaves. Six months later one of the RCBOs fails to operate under a real
                fault — trip time had drifted to 800 ms, well beyond the 300 ms limit. The test
                button worked but the device was too slow. Customer or family member at risk; the
                EICR record is wrong; the firm is exposed.
              </>
            }
            doInstead={
              <>
                Always do the instrument test at 1 x I delta n for every RCD on the EICR. The
                test button is not a substitute. The instrument test measures trip time against
                Table 41.1 and the product spec; the test button only confirms the device can
                trip mechanically. The two tests serve different purposes and the EICR
                verification needs the instrument test.
              </>
            }
          />

          <Scenario
            title="RCD verification across an all-RCBO domestic CU — Fluke 1664FC"
            situation={
              <>
                Same 3-bed semi from Sub2. 12-way all-RCBO consumer unit, all 30 mA Type A
                devices except the EV charger which is 30 mA Type B (per Section 722). TN-C-S
                supply. Zs verification complete. Time for RCD trip-time tests across the board.
              </>
            }
            whatToDo={
              <>
                Brief the customer — "I\'ll be testing each RCBO in turn. Each will briefly trip
                and I\'ll reset it. Takes about a minute per circuit, total 12-15 minutes." Set
                the Fluke 1664FC to RCD test mode, single test (A4:2026 method) at 1 x I delta n,
                AC waveform, 30 mA. Test each RCBO in label order: kitchen ring 28 ms, kitchen
                lights 32 ms, upstairs sockets 25 ms, downstairs sockets 27 ms, upstairs lights
                30 ms, downstairs lights 28 ms, immersion 24 ms, cooker 26 ms, smoke alarm 35 ms.
                All well within 300 ms product limit and 400 ms Table 41.1 TN final limit. EV
                charger Type B — same single test at 1 x I delta n AC, 30 ms. Pass. Reset all
                RCBOs. Document on the Schedule of Test Results: RCD type column "A" for the
                ten general circuits and "B" for the EV charger; trip time column with the
                measured ms reading per circuit; verification method "single AC test at 1 x I
                delta n per A4:2026 Reg 643.7.3" in the test method notes. Brief the customer —
                "All RCDs operate well within the required time. I recommend you press the T
                button on each RCD quarterly to keep verifying mechanical operation between
                inspections; if any fails to trip on the button, call us." Hand over the
                documentation pack including the test-button instructions per Reg 132.13. Move
                on to PFC / PSCC measurement in Sub 5.
              </>
            }
            whyItMatters={
              <>
                The sequence demonstrates current A4:2026 practice — single test per RCBO, fast
                and clean, results well within limits, customer briefed on the ongoing test-button
                discipline. The EV charger Type B verification follows the same method (the AC
                test at 1 x I delta n is the BS 7671 verification; a separate DC test is optional
                for additional assurance on Type B devices). The schedule documents type and trip
                time per circuit; the test method note cites Reg 643.7.3. Scheme provider audit
                will pick up the A4:2026-aligned method as compliant. The customer leaves with
                quarterly test-button instructions and a clear understanding of when to call.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "A4:2026 Reg 643.7.3 simplifies RCD verification to a single AC test at 1 x I delta n. The multi-test sequence (1/2, 1, 5 x I delta n) is DELETED. The 5 x I delta n test no longer exists.",
              "Trip time compared against Table 41.1 system limits (TN final 0.4 s, TT final 0.2 s) AND device product spec (300 ms typical for general-purpose 30 mA RCD per BS EN 61008).",
              "RCD types: AC (sinusoidal only, obsolescent), A (modern default), F (motor drives), B (smooth DC, mandatory for EV). Time-delayed adds (S) suffix.",
              "TT installations: Ra x I delta n less than or equal to 50 V is the RCD-based ADS acceptance test. For 100 Omega Ra and 30 mA RCD: 3 V — comfortable pass.",
              "Manufacturer test button verifies mechanical operation only. Customer-operated quarterly per Reg 132.13. NOT a substitute for the instrument trip-time test at EICR intervals.",
              "On all-RCBO consumer unit, test each RCBO individually. Record type and trip time per circuit on the Schedule of Test Results.",
              "Failed RCD (trip time exceeds 300 ms) = EICR Code C2 (potentially dangerous). Replace, retest, document. Don't leave a failed RCD in service.",
              "Healthy modern RCDs trip in 20-100 ms at 1 x I delta n. Drift toward 300 ms is the warning sign — replace before actual failure.",
            ]}
          />

          <Quiz title="RCD trip-time testing (A4:2026)" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.2 Zs — no-trip vs trip techniques
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 AFDD test sequence + Reg 421.1.7
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
