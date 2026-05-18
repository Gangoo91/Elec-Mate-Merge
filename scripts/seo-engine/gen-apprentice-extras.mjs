#!/usr/bin/env node
/**
 * gen-apprentice-extras.mjs — Additional apprentice content batches:
 *   - 18th Edition Amendment 4:2026 exam prep by chapter (8 pages)
 *   - Apprentice career-path / JIB grading content (8 pages)
 *   - Off-the-job (OTJ) training content (4 pages)
 * Total: 20 pages.
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const FORCE = process.argv.includes('--force');

const ENTRIES = [
  // ============ 18th Edition Amendment 4:2026 exam prep ============
  {
    slug: '18th-edition-amendment-4-2026-exam-prep',
    badge: 'Exam Prep',
    badgeIcon: 'GraduationCap',
    title: '18th Edition Amendment 4:2026 Exam Prep',
    audience: 'qualified electricians taking or re-taking the 18th Edition (C&G 2382-23) exam',
    summary: 'A focused study guide for the City & Guilds 2382-23 (or equivalent) 18th Edition Amendment 4:2026 exam. Covers what changed from A3, where to focus revision, exam format, and the five chapters that dominate the question paper.',
    keyPoints: [
      'The 18th Edition Amendment 4:2026 exam (typically C&G 2382-23) is an open-book multiple-choice exam, BS 7671 in front of you',
      'Most exam questions come from Chapters 4, 5, 6 and 7 — plus Sections 411, 442, 443, 537 and Appendix 4',
      'A4:2026 key changes: expanded AFDD scope (HMOs, care homes, residential high-rise), updated SPD risk methodology, new TN-C-S / PNB earthing classification, schedule of tests new columns',
      'Pass mark is typically 60%, time pressure is 90-120 minutes for 60 questions',
      'Tab BS 7671 in advance — Chapter 41 / 43 / Section 537 / Appendix 4 are the most-referenced',
      'Practice 100+ mock questions before the real exam',
    ],
    sections: [
      { id: 'changes-from-a3', heading: 'Key Changes from A3:2024 to A4:2026', body: 'Amendment 4:2026 was published 15 April 2026 and introduces: significantly expanded AFDD requirements (now mandatory in HMOs, care homes, certain residential high-rise), updated SPD risk methodology in Chapter 443 (Calculated Risk Level replacing AQ classification), new TN-C-S (PNB) earthing classification in Chapter 312, EV charging Section 722 reorganisation (RDC-DD, PME exception updates), new Schedule of Inspections + Schedule of Test Results columns, and cable reaction-to-fire classification (Cca-s1b,d1,a1 etc) under Chapter 422.' },
      { id: 'exam-structure', heading: 'Exam Structure and Time Pressure', body: 'The C&G 2382-23 exam is 60 multiple-choice questions over 90-120 minutes (open-book — you have BS 7671 in front of you). Pass mark is typically 60% (36/60 correct). Time pressure is the single biggest killer — most candidates who fail run out of time rather than knowledge. Practice with a timer set to 90 minutes. Aim to complete the first pass in 60-70 minutes, leaving 20-30 minutes to review marked questions.' },
      { id: 'where-to-focus', heading: 'Where to Focus Your Revision', body: 'The exam content is heavily weighted toward: Chapter 41 (Protection Against Electric Shock — earth fault loop impedance, disconnection times, RCDs). Chapter 43 (Protection Against Overcurrent — protective device selection, discrimination). Chapter 53 / 537 (Isolation and Switching). Appendix 4 (Current Carrying Capacity, Voltage Drop, Correction Factors). Section 442 (Overvoltage Protection — Chapter 443 SPDs). Section 700-series special locations. Spend 70% of revision on these five areas.' },
      { id: 'chapter-4-priorities', heading: 'Chapter 4 Priorities (Protection)', body: 'Section 411 (Automatic Disconnection of Supply — by far the most-tested). Memorise the maximum Zs values for the common protective devices (BS 88-3, BS EN 60898 Type B, Type C, RCBOs). Section 415 (Additional Protection — RCDs, supplementary equipotential bonding). Section 421 (AFDD Reg 421.1.7.101 — A4:2026 expanded scope is high-priority). Section 422 (cable reaction to fire — A4:2026 introduces Cca classification).' },
      { id: 'chapter-5-priorities', heading: 'Chapter 5 Priorities (Selection and Erection)', body: 'Section 511 (compliance with standards). Section 522 (selection of cable type by external influences). Section 525 (voltage drop limits — 3% lighting, 5% other circuits). Section 528 (segregation — important for PoE / data crossover work). Section 537 (Isolation and Switching, especially the A4:2026 changes). Section 543 (cross-sectional area of protective conductors — adiabatic equation).' },
      { id: 'practice-strategy', heading: 'Practice Strategy That Works', body: 'Run 100+ mock questions before the real exam. Time the last 30 questions you do — if you cannot finish 30 questions in 45 minutes you are too slow. Mark every question you got wrong and re-revise that topic the next day. Build a personal "wrong answer" notebook — re-read it once a week. Elec-Mate\\u2019s 18th Edition mock exam mode tracks accuracy AND time per question — gives you a heat map of weak topics.' },
    ],
    related: [
      ['/guides/am2-section-a-application-of-knowledge', 'AM2 Section A — Application of Knowledge', 'BookOpen'],
      ['/guides/bs-7671-a4-2026-summary', 'BS 7671 A4:2026 Summary', 'ShieldCheck'],
      ['/guides/bs-7671-a4-2026-afdd-changes', 'AFDD Changes Under A4:2026', 'ShieldCheck'],
      ['/guides/spd-chapter-443-a4-2026', 'SPD Chapter 443 A4:2026', 'ShieldCheck'],
      ['/guides/mock-exams-electrician', 'Mock Exams', 'ClipboardCheck'],
      ['/guides/bs-7671-18th-edition-guide', '18th Edition Guide', 'BookOpen'],
    ],
  },
  {
    slug: '18th-edition-chapter-41-protection-against-electric-shock-exam',
    badge: 'Exam Prep',
    badgeIcon: 'GraduationCap',
    title: 'BS 7671 Chapter 41 — Protection Against Electric Shock (Exam Prep)',
    audience: 'electricians studying for the 18th Edition exam — Chapter 41 deep-dive',
    summary: 'Chapter 41 is the single most-tested chapter in the 18th Edition exam — Automatic Disconnection of Supply (ADS), maximum Zs values, RCD requirements, and the protective measures hierarchy.',
    keyPoints: [
      'ADS (Automatic Disconnection of Supply) under Section 411 is the primary protective measure for most installations',
      'Disconnection times: 0.4s for ≤32A final circuits on TN system, 0.2s on TT system. 5s for distribution circuits.',
      'Maximum Zs values are in Tables 41.3 (for protective devices in BS EN 60898 / BS EN 61009) — memorise the common ones',
      'Section 415 covers additional protection — 30mA RCDs for sockets up to 32A, supplementary equipotential bonding in special locations',
      'Section 411.3.3 — RCD additional protection for socket circuits (the famous "30mA RCD" rule)',
      'A4:2026 changes Chapter 41 slightly — clarifications on TN-C-S (PNB) earthing and RDC-DD for EV circuits',
    ],
    sections: [
      { id: 'ads-hierarchy', heading: 'The ADS Hierarchy', body: 'Chapter 41 establishes a protective hierarchy: (1) Basic protection — preventing contact with live parts (insulation, barriers). (2) Fault protection via ADS — disconnecting fault current within the required time. (3) Additional protection — 30mA RCD as a final safety net. Most exam questions test the ADS calculations. Memorise: Ohm\\u2019s Law applied to the fault circuit: I_fault = U_o / Z_fault, where Z_fault = R_phase + R_neutral + R_cpc (or Z_e + R_1 + R_2 in measurement terms).' },
      { id: 'disconnection-times', heading: 'Disconnection Times by Earthing System', body: 'Final circuits ≤32A: TN system 0.4s. TT system 0.2s. Distribution circuits and final circuits >32A: TN 5s, TT 1s. The exam tests whether you can identify which case applies. The Zs you measure must be ≤ the value in Table 41.3 for the protective device + nominal voltage. RCDs change the calculation — if the circuit has a 30mA RCD upstream, you can use the higher RCD-based Zs values in Table 41.5.' },
      { id: 'max-zs-tables', heading: 'Maximum Zs Tables (41.3, 41.4, 41.5)', body: 'Table 41.3 — fuses to BS 88-3 (common on industrial supplies). Table 41.4 — circuit breakers Type B / C / D to BS EN 60898 (most domestic / commercial). Table 41.5 — RCDs (1A operates within 1s, but for ADS purposes typically just need to confirm the 30mA RCD operates within the times). Memorise Type B 6A / 16A / 32A Zs values — they come up every exam.' },
      { id: 'section-415-additional-protection', heading: 'Section 415 — Additional Protection', body: '30mA RCD protection is mandatory for: sockets up to 32A in dwellings (Reg 411.3.3). Final circuits supplying mobile equipment ≤32A outdoors. Circuits supplying luminaires in dwellings (Reg 411.3.4). Special locations (700-series). A4:2026 added: Reg 421.1.7.101 — AFDD mandatory in HMOs, care homes, residential high-rise (also Chapter 4-related).' },
      { id: 'special-locations-link', heading: 'Cross-Reference: 700-Series Special Locations', body: 'Chapter 41 protection requirements extend through the Section 700-series (Section 701 bathrooms, 702 swimming pools, 705 agricultural, 706 caravan parks, 710 medical, 717 mobile units, 722 EV charging, 740 amusement parks, 753 floor and ceiling heating). The exam regularly asks "what additional protection is required in Section 70X?" — typically supplementary bonding + 30mA RCD + reduced Zs.' },
      { id: 'practice-questions', heading: 'Typical Exam Questions on Chapter 41', body: '"A 32A radial circuit in 4mm² has a measured Zs of 1.2Ω. Is this compliant for a Type B MCB?" (Look up Table 41.3 Type B 32A — typical limit 1.44Ω at 230V — compliant.) "What is the maximum disconnection time for a 16A socket circuit on a TT system?" (0.2s.) "Reg 411.3.3 requires RCD protection on what circuits?" (Sockets ≤32A in dwellings.) Practice 30+ of these.' },
    ],
    related: [
      ['/guides/18th-edition-amendment-4-2026-exam-prep', '18th Edition A4:2026 Exam Prep', 'GraduationCap'],
      ['/tools/earth-loop-impedance-calculator', 'Earth Loop Impedance Calculator', 'Calculator'],
      ['/tools/disconnection-time-calculator', 'Disconnection Time Calculator', 'Calculator'],
      ['/guides/bs-7671-a4-2026-afdd-changes', 'AFDD Changes A4:2026', 'ShieldCheck'],
      ['/guides/mock-exams-electrician', 'Mock Exams', 'ClipboardCheck'],
      ['/guides/bs-7671-18th-edition-guide', '18th Edition Guide', 'BookOpen'],
    ],
  },
  {
    slug: '18th-edition-chapter-43-overcurrent-protection-exam',
    badge: 'Exam Prep',
    badgeIcon: 'GraduationCap',
    title: 'BS 7671 Chapter 43 — Overcurrent Protection (Exam Prep)',
    audience: 'electricians studying for the 18th Edition exam — Chapter 43 deep-dive',
    summary: 'Chapter 43 covers overcurrent protection — protective device selection, discrimination, cable adiabatic. The second-most-tested chapter after 41.',
    keyPoints: [
      'Protective devices must operate before cable damage threshold — I_n ≤ I_b ≤ I_z (rated ≥ design ≥ tabulated)',
      'Discrimination: upstream device must operate AFTER downstream device for the same fault — critical in large installations',
      'Adiabatic equation: S ≥ √(I²t)/k for cable cross-section under short-circuit conditions',
      'Section 433 covers overload protection; Section 434 covers short-circuit protection',
      'Type B (3-5×In trip), Type C (5-10×In), Type D (10-20×In) — selection depends on the load inrush',
      'A4:2026 makes small adjustments — most Chapter 43 content remains unchanged from A3:2024',
    ],
    sections: [
      { id: 'device-selection', heading: 'Protective Device Selection (Section 433)', body: 'The fundamental rule: I_n ≤ I_b ≤ I_z, where I_n is the device rating, I_b is the design current, I_z is the cable\\u2019s current-carrying capacity at the installation method, ambient, grouping etc. Plus: I_2 ≤ 1.45 × I_z (the device must operate within the cable\\u2019s short-time overcurrent capability). Type B for resistive loads (lighting, sockets), Type C for inductive loads (motors, fluorescent), Type D for very high inrush (transformers, large motors).' },
      { id: 'discrimination', heading: 'Discrimination Between Devices', body: 'Critical when you have downstream devices feeding circuits. The upstream device must NOT operate when a downstream device clears a fault. Discrimination is achieved by: time-current characteristics (slower upstream device), current rating (substantially higher upstream), or specific manufacturer charts. The exam often shows a one-line diagram and asks "is discrimination achieved between the 32A Type B downstream and the 100A Type B upstream?" Look up the time-current curves.' },
      { id: 'adiabatic-equation', heading: 'Adiabatic Equation for Short-Circuit', body: 'For short-circuit protection of cable: S ≥ √(I²t) / k, where I is the short-circuit current, t is the device clearing time, k is the cable insulation constant (115 for thermoplastic copper, 76 for thermoplastic aluminium). The exam will give you I_pf and ask "what is the minimum cpc cross-section under fault conditions?" Compute S, compare against the actual cable cpc, confirm compliance. Practice 20+ of these.' },
      { id: 'fuses-vs-mcbs', heading: 'Fuses vs MCBs vs RCBOs', body: 'BS 88-3 fuses (still common on industrial supplies) — non-resettable, high breaking capacity. BS EN 60898 MCBs (most domestic / commercial) — resettable, lower breaking capacity. BS EN 61009 RCBOs — MCB + 30mA RCD combined. Exam questions often test which protective device is appropriate for a given application (e.g. "what device protects a 32A radial in a domestic kitchen?" — typical answer 32A RCBO Type A or B).' },
      { id: 'a4-2026-changes', heading: 'A4:2026 Changes to Chapter 43', body: 'Most Chapter 43 content is unchanged. A4:2026 clarifications: improved guidance on discrimination calculations, integration with Chapter 443 SPD coordination, and updated examples in the Appendices. The exam tests the same core principles as A3:2024.' },
      { id: 'practice-questions', heading: 'Typical Exam Questions on Chapter 43', body: '"A 32A circuit has measured I_pf of 1.5kA. With a Type B 32A MCB (clearing time 0.1s at fault current), what is the minimum cpc cross-section?" Calculate S = √(1500² × 0.1) / 115 = 4.13mm² — so minimum 4.0mm² cpc. "Type B vs Type C for a 3kW motor circuit — which is correct?" (Type C — motor inrush 5-7× In.) Practice these systematically.' },
    ],
    related: [
      ['/guides/18th-edition-amendment-4-2026-exam-prep', '18th Edition A4:2026 Exam Prep', 'GraduationCap'],
      ['/tools/adiabatic-equation-calculator', 'Adiabatic Equation Calculator', 'Calculator'],
      ['/tools/cable-sizing-calculator', 'Cable Sizing Calculator', 'Calculator'],
      ['/guides/spd-chapter-443-a4-2026', 'SPD Chapter 443 A4:2026', 'ShieldCheck'],
      ['/guides/mock-exams-electrician', 'Mock Exams', 'ClipboardCheck'],
      ['/guides/bs-7671-18th-edition-guide', '18th Edition Guide', 'BookOpen'],
    ],
  },
  {
    slug: '18th-edition-appendix-4-cable-current-rating-exam',
    badge: 'Exam Prep',
    badgeIcon: 'GraduationCap',
    title: 'BS 7671 Appendix 4 — Cable Current Rating (Exam Prep)',
    audience: 'electricians revising Appendix 4 for the 18th Edition exam',
    summary: 'Appendix 4 is the most-used part of BS 7671 in the exam — current-carrying capacity, installation methods, grouping factors, voltage drop. Master Appendix 4 navigation and you save minutes per question.',
    keyPoints: [
      'Appendix 4 tables: 4D1A to 4D5A cover most common cable types (twin and earth, SWA, single insulated)',
      'Installation Method (Reference Method A-G) is the column you look up first — wrong method = wrong reading',
      'Correction factors: ambient temperature (Ca), grouping (Cg), thermal insulation (Ci) — multiply all together',
      'Voltage drop is in mV/A/m — multiply by current and length to get total volt drop',
      'A4:2026 keeps Appendix 4 structure largely unchanged from A3:2024',
      'Tab the most-used tables (4D1A, 4D2A, 4D4A) in your physical book before the exam',
    ],
    sections: [
      { id: 'navigation', heading: 'Appendix 4 Navigation', body: 'Tables are organised: 4D1A / 4D1B — single-core thermoplastic (PVC) insulated. 4D2A / 4D2B — multi-core thermoplastic (twin and earth, three-core etc). 4D4A / 4D4B — single-core LSF (lower smoke). 4D5A / 4D5B — multi-core SWA armoured. The "A" tables give current-carrying capacity; the "B" tables give voltage drop. Plus Tables 4A — installation method (Reference Method) selection. Tables 4B / 4C — correction factors.' },
      { id: 'reference-methods', heading: 'Reference Methods (Tables 4A1, 4A2)', body: 'Method A — in conduit in a thermally insulated wall. Method B — in conduit on a wall. Method C — clipped direct. Method D — buried direct in ground. Method E — multi-core in free air. Method F — multi-core in free air with spacing. Method G — single-core in free air with spacing. Reference Method is the SINGLE biggest factor in cable current-carrying capacity — wrong method gives wildly wrong answers.' },
      { id: 'correction-factors', heading: 'Correction Factors (Tables 4B1, 4C)', body: 'Ambient temperature (Ca) — 30°C is the reference; higher ambient reduces capacity. Grouping (Cg) — Table 4C1 / 4C2 for multiple cables in containment. Thermal insulation (Ci) — Table 52.2; cables in or surrounded by insulation are reduced (e.g. 0.78 for cable above insulating ceiling). Multiply ALL applicable factors together: I_z_actual = I_z_tabulated × Ca × Cg × Ci.' },
      { id: 'voltage-drop', heading: 'Voltage Drop Calculation', body: 'Voltage drop = (mV/A/m × I_b × L) / 1000 in volts. Compare to the 3% / 5% limits in Reg 525.202 (3% for lighting, 5% for other circuits, both at 230V nominal). For example: 2.5mm² T&E Method C, 32A circuit, 30m length, mV/A/m = 18 (from Table 4D2B). Volt drop = (18 × 32 × 30) / 1000 = 17.3V = 7.5% — fails the 5% limit. Increase cable size.' },
      { id: 'three-phase-correction', heading: 'Three-Phase Voltage Drop', body: 'For three-phase, the voltage drop in mV/A/m tables is the per-phase value. The line-to-line voltage drop = √3 × per-phase drop. The 5% limit applies to the line-to-line nominal voltage (400V), so 5% = 20V line-to-line = 11.5V per phase. Get this mixed up and you under-size three-phase cables.' },
      { id: 'practice-strategy', heading: 'Appendix 4 Exam Strategy', body: 'Tab Table 4D2A (twin and earth current carrying), Table 4D2B (twin and earth voltage drop), Table 4A2 (installation method), Table 4C1 (grouping factors), and Table 4B1 (ambient correction). Practice 20+ cable-sizing scenarios before the exam — given the load, length, method, ambient and grouping, work out the cable size to comply with both current capacity AND voltage drop.' },
    ],
    related: [
      ['/guides/18th-edition-amendment-4-2026-exam-prep', '18th Edition A4:2026 Exam Prep', 'GraduationCap'],
      ['/tools/cable-sizing-calculator', 'Cable Sizing Calculator', 'Calculator'],
      ['/tools/cable-volt-drop-three-phase', 'Voltage Drop Calculator', 'Calculator'],
      ['/guides/correction-factors-guide', 'Correction Factors Guide', 'BookOpen'],
      ['/guides/mock-exams-electrician', 'Mock Exams', 'ClipboardCheck'],
      ['/guides/bs-7671-18th-edition-guide', '18th Edition Guide', 'BookOpen'],
    ],
  },
  // ============ Apprentice career-path ============
  {
    slug: 'ecs-gold-card-requirements-2026',
    badge: 'Career Path',
    badgeIcon: 'ShieldCheck',
    title: 'ECS Gold Card Requirements 2026',
    audience: 'apprentices who have just passed AM2 and are applying for full Electrician (ECS Gold Card) status',
    summary: 'The ECS Gold Card is the industry-recognised proof you are a fully-qualified electrician in the UK. This guide covers requirements, application process, costs, renewal cycle, and the JIB grading interview.',
    keyPoints: [
      'ECS Gold Card is held by ~150,000 UK electricians — the industry-standard qualification badge',
      'Requirements: Level 3 NVQ or equivalent + AM2 (or recognised equivalent) + ECS H&S assessment',
      'Initial application: ~£35-50 application fee + ID checks + qualification verification',
      'Card is valid 5 years; renewal fee ~£35-45 plus refresher H&S assessment',
      'Beyond the Gold Card, JIB grading interviews determine your industry-recognised level (Approved Electrician, Electrician, Senior Electrician, etc.)',
      'A current ECS Gold Card is required to work on most large commercial / industrial sites in the UK',
    ],
    sections: [
      { id: 'what-is-ecs', heading: 'What the ECS Gold Card Is', body: 'The Electrotechnical Certification Scheme (ECS) is the UK\\u2019s industry-recognised competence card scheme for the electrical industry. The Gold Card is for fully-qualified electricians — distinct from the trainee blue / red / green cards. Holding a Gold Card is essentially mandatory for working on most UK commercial and industrial construction sites; site managers won\\u2019t let you on without one. It is administered by the JIB on behalf of the industry.' },
      { id: 'requirements', heading: 'Requirements for the ECS Gold Card', body: 'You need: (1) A recognised Level 3 qualification — typically C&G 2365-03, 5357, 2357, 2366-03, or an EAL equivalent. (2) A recognised end-point assessment — the AM2 (or equivalent). (3) The ECS Health, Safety and Environmental Awareness assessment (~£25, 30-minute online test). (4) Photo ID and proof of identity. (5) Application fee (~£35-50). Apply via the ECS portal at ecscard.co.uk.' },
      { id: 'application-process', heading: 'The Application Process', body: 'Submit your qualification certificates and AM2 evidence through the ECS portal. Wait for verification (typically 2-4 weeks). Sit the ECS H&S assessment online. Once verified, the card arrives by post within 7-10 working days. First-time application typically takes 3-5 weeks total. If you fail the H&S assessment, you can re-sit immediately for a small fee.' },
      { id: 'jib-grading', heading: 'JIB Grading After the Gold Card', body: 'The ECS Gold Card confirms you are qualified. The JIB grading interview then determines your industry level: Approved Electrician (default for new Gold Card holders with AM2), Electrician (mid-career), Senior Electrician (with supervisory responsibility), Approved Senior Electrician (running teams). Higher grades carry higher JIB pay-scale entitlements — useful if your employer is a JIB member.' },
      { id: 'renewal', heading: 'Renewal Cycle', body: 'The Gold Card is valid for 5 years. To renew: pay the renewal fee (~£35-45), confirm continued employment in the trade, and re-sit the H&S assessment. If you let it lapse for more than 12 months, you may need to re-submit qualification evidence. Set a calendar reminder 6 months before the expiry date.' },
      { id: 'why-it-matters', heading: 'Why It Matters for Your Career', body: 'Without an ECS Gold Card you cannot work on most commercial / industrial sites — site security simply will not admit you. JIB pay-scale entitlement (if your employer is a JIB member) requires it. Competent person scheme membership (NICEIC, NAPIT, ELECSA, Stroma) typically asks for ECS as evidence of competence. Many electrical contractors will not hire you to lead a job without one.' },
    ],
    related: [
      ['/guides/am2-exam-tips', 'AM2 Exam Tips', 'GraduationCap'],
      ['/guides/electrical-apprentice-year-4-revision-plan', 'Year 4 Revision Plan', 'GraduationCap'],
      ['/guides/jib-grading-explained', 'JIB Grading Explained', 'ShieldCheck'],
      ['/guides/competent-person-scheme', 'Competent Person Scheme', 'FileCheck2'],
      ['/guides/apprentice-electrician-salary', 'Apprentice Salary', 'PoundSterling'],
      ['/guides/cg-2365-vs-5357-vs-2366', 'Qualification Comparison', 'GraduationCap'],
    ],
  },
  {
    slug: 'jib-pay-scales-2026',
    badge: 'Career Path',
    badgeIcon: 'PoundSterling',
    title: 'JIB Pay Scales 2026 — What Electricians Actually Earn',
    audience: 'qualified electricians, JIB members and apprentices benchmarking their pay',
    summary: 'The JIB (Joint Industry Board for the Electrical Contracting Industry) sets industry-wide pay scales for UK electricians employed by JIB-member firms. Updated annually, this guide covers the 2026 rates for every JIB grade plus context on which firms use them.',
    keyPoints: [
      'JIB pay scales apply to electricians employed by JIB-member firms — not all UK electrical employers are JIB members',
      'JIB grades (low to high): Apprentice → Electrician → Approved Electrician → Senior Electrician → Approved Senior Electrician',
      '2026 typical rates: Apprentice (year 1) ~£8.60/hour, Approved Electrician ~£18-22/hour, Senior Electrician ~£22-27/hour',
      'Travel time, daily fares, lodging allowance and overtime are all on the JIB rate card',
      'Non-JIB employers often pay BELOW JIB rates for junior staff and ABOVE for experienced staff',
      'Use the JIB rate as your floor when negotiating a non-JIB job',
    ],
    sections: [
      { id: 'what-is-jib', heading: 'What the JIB Is', body: 'The Joint Industry Board for the Electrical Contracting Industry (JIB) is the negotiating body for pay and conditions in the UK electrical contracting industry. Founded 1968, the JIB represents both employers (via ECA — the Electrical Contractors Association) and employees (via Unite the Union). Member firms agree to use JIB pay scales and follow JIB working rules. JIB membership is voluntary — many smaller firms are not JIB members.' },
      { id: '2026-rates', heading: '2026 JIB Rate Card (Summary)', body: 'Apprentice Year 1: ~£8.60/hour. Apprentice Year 2: ~£11.45/hour. Apprentice Year 3: ~£14.30/hour. Apprentice Year 4: ~£16.50/hour. Electrician: ~£17.80/hour. Approved Electrician: ~£19.50-22.00/hour. Senior Electrician: ~£22-25/hour. Approved Senior Electrician: ~£25-27.50/hour. Technician: ~£23-26/hour. These are base rates — overtime, weekend, bank holiday and lodging allowances are additional.' },
      { id: 'travel-and-fares', heading: 'Travel Time and Daily Fares', body: 'JIB members pay daily fares (typically £15-25/day for travel between your home and the site). Travel time over a defined distance (typically 15 miles each way) is paid at the agreed hourly rate. Lodging allowance applies when working away from home — typically £40-60/night plus subsistence. Get the current rates from your JIB Rep or the JIB rate card.' },
      { id: 'overtime-and-weekend', heading: 'Overtime and Weekend Working', body: 'JIB rates for over-time: time and a half for the first 4 hours, double time thereafter. Saturday: time and a half. Sunday: double time. Bank holidays: double time. These are minimums under the JIB agreement — many firms pay above. Confirm with your employer\\u2019s offer letter whether overtime rates apply automatically or only with prior agreement.' },
      { id: 'non-jib-comparison', heading: 'Non-JIB Employers vs JIB Rates', body: 'Many small electrical contractors and smaller firms are not JIB members. Their pay structures vary: some pay below JIB for junior staff (taking advantage of inexperience), some pay above JIB for senior staff (competing for talent). Use the JIB rate as your floor when negotiating: \"The JIB rate for an Approved Electrician is £19.50 — I need at least that.\"' },
      { id: 'self-employed-equivalent', heading: 'Self-Employed Equivalent of JIB Rates', body: 'Self-employed electricians need to earn 1.5-2× JIB hourly to match the equivalent net income (because self-employed absorb holiday, sick, pension, training, insurance, scheme fees and tools). A JIB Approved Electrician at £20/hour is equivalent to a self-employed charge-out rate of £55-75/hour to maintain similar net income. Use this when pricing self-employed work.' },
    ],
    related: [
      ['/guides/ecs-gold-card-requirements-2026', 'ECS Gold Card', 'ShieldCheck'],
      ['/guides/electrician-salary-uk', 'Electrician Salary UK', 'PoundSterling'],
      ['/guides/electrician-day-rates-uk', 'Electrician Day Rates UK', 'PoundSterling'],
      ['/guides/electrician-employee-vs-self-employed-decision', 'Employee vs Self-Employed', 'Briefcase'],
      ['/guides/electrical-business-pricing-strategy', 'Pricing Strategy', 'PoundSterling'],
      ['/guides/cg-2365-vs-5357-vs-2366', 'Qualification Comparison', 'GraduationCap'],
    ],
  },
  {
    slug: 'after-am2-what-happens-next',
    badge: 'Career Path',
    badgeIcon: 'GraduationCap',
    title: 'After AM2: What Happens Next?',
    audience: 'apprentices about to take or just-passed AM2',
    summary: 'A clear roadmap for the months after passing your AM2 end-point assessment. ECS Gold Card application, JIB grading, scheme membership, deciding employed vs self-employed, and the next 12 months.',
    keyPoints: [
      'AM2 pass certificate typically arrives within 2-3 weeks of the assessment day',
      'Apply for ECS Gold Card immediately — it takes 3-5 weeks to arrive and is needed for most commercial sites',
      'Talk to your JIB Rep (if your employer is a JIB member) about your grading interview',
      'Consider competent person scheme registration (NICEIC, NAPIT, ELECSA, Stroma) if going self-employed',
      'Decide: stay employed at your current firm, move to a different firm at a higher rate, or go self-employed',
      'Most newly-qualified electricians stay employed 2-3 years before considering self-employment',
    ],
    sections: [
      { id: 'pass-confirmation', heading: 'What Happens When You Pass AM2', body: 'The AM2 assessment day takes 2-3 days at an approved test centre. Your results are typically posted within 2-3 weeks. Pass: AM2 certificate arrives, plus a letter confirming completion of your Apprenticeship Standard. Fail: re-sit information for the failed sections only. The certificate is the official proof you are a qualified electrician — keep it safe, you will need scanned copies for ECS, JIB grading, and scheme application.' },
      { id: 'ecs-application', heading: 'Apply for ECS Gold Card Immediately', body: 'Apply within 7 days of receiving your AM2 certificate. The ECS Gold Card is your industry passport — without it most large commercial / industrial sites will not let you on. Process: upload qualifications + AM2 + ID to the ECS portal, sit the H&S assessment, pay the application fee, wait 3-5 weeks for the physical card. Set a calendar reminder for the 5-year renewal.' },
      { id: 'jib-grading', heading: 'JIB Grading Interview', body: 'If your employer is a JIB member, you are entitled to a JIB grading interview shortly after passing AM2. The default grading for a newly-qualified electrician with AM2 is "Approved Electrician" (the most common grade). Higher grades (Senior Electrician, Approved Senior Electrician) require additional experience and supervisory responsibility. Talk to your JIB Rep to schedule the interview — it costs you nothing and unlocks the JIB pay scale for your grade.' },
      { id: 'employed-vs-self-employed', heading: 'Employed vs Self-Employed Decision', body: 'You have three realistic options: (1) Stay at your current firm at the new pay rate. Typical for the first 2-3 years post-AM2 — gives you site experience, supervised work, and benefits. (2) Move to a different firm at a higher rate. Worth doing if your current employer won\\u2019t increase your pay to JIB levels. (3) Go self-employed. Best after 5+ years of post-AM2 experience. See our Employee vs Self-Employed guide for the detailed decision framework.' },
      { id: 'scheme-membership', heading: 'Competent Person Scheme Registration', body: 'If you plan to go self-employed (now or later), apply for scheme membership (NICEIC, NAPIT, ELECSA, Stroma). Initial assessment takes 6-12 weeks. Annual cost ~£500. Without scheme membership you cannot legally self-certify Part P notifiable work — every notifiable job must go via building control, adding cost and time. See our NICEIC vs NAPIT guide for the scheme choice.' },
      { id: 'first-year-plan', heading: 'Your First 12 Months as a Qualified Electrician', body: 'Months 1-3: ECS Gold Card application + JIB grading + first jobs at the new rate. Months 4-6: settle into your new role; build a personal portfolio of work for any future scheme application or self-employed move. Months 7-9: identify gaps (specialist qualifications: 2391 Inspection & Testing, EV charger installer, solar PV installer, etc.). Months 10-12: decide your 3-year career direction — site supervisor, estimator, specialist contractor, self-employed.' },
    ],
    related: [
      ['/guides/am2-exam-tips', 'AM2 Exam Tips', 'GraduationCap'],
      ['/guides/ecs-gold-card-requirements-2026', 'ECS Gold Card', 'ShieldCheck'],
      ['/guides/jib-pay-scales-2026', 'JIB Pay Scales 2026', 'PoundSterling'],
      ['/guides/niceic-vs-napit-registration', 'NICEIC vs NAPIT', 'FileCheck2'],
      ['/guides/electrician-employee-vs-self-employed-decision', 'Employee vs Self-Employed', 'Briefcase'],
      ['/guides/starting-an-electrical-business-uk', 'Starting an Electrical Business', 'Briefcase'],
    ],
  },
  {
    slug: 'electrician-career-progression-uk',
    badge: 'Career Path',
    badgeIcon: 'GraduationCap',
    title: 'Electrician Career Progression in the UK',
    audience: 'qualified electricians thinking about their next career step',
    summary: 'A practical map of UK electrician career progression — the recognised roles, what they pay, how to move between them, and the qualifications / experience needed at each level.',
    keyPoints: [
      'The career ladder: Apprentice → Electrician → Approved Electrician → Senior Electrician → Project / Site Manager → Estimator / Director',
      'Specialist routes branch off: Inspection & Testing (2391), EV Charging, Solar PV, Industrial Maintenance, Smart Building',
      'Typical earnings: Apprentice ~£18-32k, Approved Electrician £35-55k, Senior £45-65k, Project Manager £55-85k, Estimator £55-80k',
      'Self-employed gross revenue often exceeds employed PAYE — but net depends on costs, holiday, sick, pension',
      'Specialist qualifications (2391, 2393, EV charger installer) add £5-15k to earning potential',
      'Most electricians peak earnings in their 40s-50s in supervisory / estimator / director roles, not on the tools',
    ],
    sections: [
      { id: 'the-ladder', heading: 'The Standard Career Ladder', body: 'Apprentice (3-4 years, £18-32k). Newly Qualified Electrician (1-2 years, £30-40k). Approved Electrician (3-5 years post-AM2, £35-55k). Senior Electrician (5-10 years, £45-65k). Project Manager / Site Manager (8-15 years, £55-85k). Estimator (8-15 years, £55-80k). Director / Owner of a small electrical business (10+ years, highly variable £40-200k). Many electricians stay at Approved or Senior Electrician for their whole career and earn well; not everyone wants supervisory work.' },
      { id: 'specialist-routes', heading: 'Specialist Routes', body: 'Inspection & Testing specialist (C&G 2391 qualified) — £45-60k as employee, or £400-650/day as self-employed specialist. EV Charging specialist (OZEV-approved installer) — £40-55k employed; self-employed £75-110/hour for EV installs. Solar PV installer (MCS-certified) — £40-55k employed; self-employed £6-9k per installation. Industrial maintenance — £45-65k. Smart building / PoE / DALI / KNX specialist — £45-70k.' },
      { id: 'qualifications-to-advance', heading: 'Qualifications That Advance Your Career', body: 'C&G 2391 Inspection and Testing — opens periodic-inspection specialist work + EICR contracts. C&G 2393 Wiring Regulations Amendment (updated for each Amendment) — needed for current scheme membership. C&G 2356 Senior Electrician — formal recognition of supervisor competence. OZEV EV charging installer — opens EV charger work + grant-funded jobs. MCS Solar PV installer — opens microgeneration work. Each adds ~£25-100 to the daily / weekly rate.' },
      { id: 'self-employed-route', heading: 'Self-Employed Route', body: 'Many electricians transition from employed to self-employed sole trader, then limit company once revenue justifies it. Typical timeline: 5+ years post-AM2 before going self-employed (need site experience + customer relationships). 12-18 months to break even self-employed. 3-5 years to grow to multi-electrician firm (if that\\u2019s the goal). See our "Starting an Electrical Business" guide for the detailed roadmap.' },
      { id: 'project-management', heading: 'Project Management Route', body: 'Best for electricians who enjoy planning, customer-facing work, and team coordination. Typical path: Approved Electrician (3-5 years) → Senior with supervisor responsibility (5-7 years) → Project Manager (8-12 years). Additional qualifications useful: SSSTS or SMSTS (site supervisor / manager safety), Black Hat (NEBOSH), construction management courses. Peak earnings £55-85k employed.' },
      { id: 'estimator-route', heading: 'Estimator Route', body: 'Best for electricians who enjoy detail, BS 7671 knowledge, and quoting. Path: Senior Electrician → trainee estimator (£40-50k) → senior estimator (£55-80k). Most successful estimators have 8-15 years on the tools first. Useful qualifications: City & Guilds 2356 (Senior Electrician), HND in Electrical Engineering, AutoCAD for electrical drawings, Trimble Accubid or similar estimating software.' },
    ],
    related: [
      ['/guides/electrician-salary-uk', 'Electrician Salary UK', 'PoundSterling'],
      ['/guides/jib-pay-scales-2026', 'JIB Pay Scales 2026', 'PoundSterling'],
      ['/guides/ecs-gold-card-requirements-2026', 'ECS Gold Card', 'ShieldCheck'],
      ['/guides/electrician-employee-vs-self-employed-decision', 'Employee vs Self-Employed', 'Briefcase'],
      ['/guides/starting-an-electrical-business-uk', 'Starting an Electrical Business', 'Briefcase'],
      ['/guides/after-am2-what-happens-next', 'After AM2', 'GraduationCap'],
    ],
  },
  {
    slug: 'finding-an-electrical-apprenticeship-uk',
    badge: 'Career Path',
    badgeIcon: 'GraduationCap',
    title: 'How to Find an Electrical Apprenticeship in the UK',
    audience: 'school leavers, career-changers and parents researching electrical apprenticeships',
    summary: 'A practical guide to finding and securing an electrical apprenticeship in 2026. Application sites, what employers look for, interview preparation, the realistic timeline, and what to do if you don\\u2019t get an offer first time.',
    keyPoints: [
      'Apprenticeships are advertised on: gov.uk "Find an apprenticeship", local college websites, Indeed, regional electrical contractor websites, JIB site',
      'Application windows are mostly September-January for September starts — apply early, places fill fast',
      'Minimum entry: GCSE Maths and English at grade 4+ (or equivalent Functional Skills)',
      'Practical interview: most employers ask basic maths questions, electrical safety awareness, and motivation',
      'Realistic timeline: 6-12 months from first application to apprentice contract starting',
      'If you don\\u2019t get an offer, build experience: labouring with an electrician, college "introduction to electrical" courses, work-experience days',
    ],
    sections: [
      { id: 'where-to-apply', heading: 'Where to Apply', body: 'The official UK government apprenticeship site (gov.uk/apply-apprenticeship) lists every approved apprenticeship in the country. Local college websites (search "[your town] electrical apprenticeship") usually list employer partners directly. Indeed and Reed have decent electrical apprenticeship sections. JIB site (jib.org.uk) lists JIB-member firms hiring. LinkedIn for larger firms. Don\\u2019t ignore local Facebook groups — many small electrical contractors recruit there.' },
      { id: 'timing', heading: 'Timing and Application Windows', body: 'Most electrical apprenticeships start in September (aligned to college year). Application windows open: September-November of the previous year for September starts, with a smaller January-March intake for some employers. Apply EARLY — places fill by spring. If you miss the main intake, look at January starts at colleges, or non-college-led pathways (employer-direct hire with later college enrolment).' },
      { id: 'entry-requirements', heading: 'Entry Requirements', body: 'GCSE Maths and English at grade 4+ (old grade C). If you don\\u2019t have them, most colleges will let you enrol on a Level 2 Functional Skills course alongside your apprenticeship — speak to the college. Practical: aged 16+, eligible to work in the UK, willing to do 3-4 years of training. Most employers also want: a driving licence (or working toward one), basic physical fitness, willingness to start work early (typical site time 7:30am).' },
      { id: 'cv-and-application', heading: 'CV and Application', body: 'A one-page CV is enough. Lead with: any relevant work experience (even labouring or maintenance), GCSE grades (or expected grades), any practical skills (DIY, motor mechanics, woodwork — anything showing manual ability), motivation for electrical (why this specifically, not "any apprenticeship"). Cover letter: 200-300 words, addressed to a named person where possible, specific to that employer.' },
      { id: 'interview', heading: 'The Interview', body: 'Typical electrical apprenticeship interview format: practical maths questions (basic algebra, fractions, percentages — "what is 3/4 of 240?"), electrical safety awareness ("you see frayed cable on a job — what do you do?"), motivation ("why electrical?", "where do you see yourself in 5 years?"), and often a half-day shadowing on site. Dress smart (collar shirt + clean trousers + safety boots if asked); arrive 10 minutes early; bring questions to ask.' },
      { id: 'if-no-offer', heading: 'If You Don\\u2019t Get an Offer First Time', body: 'Three productive routes: (1) Take a Level 2 college course full-time ("Introduction to Electrical Installation") — proves commitment to next year\\u2019s application. (2) Get on-site experience as a labourer for an electrical contractor — most apprentice hires come from labourers who already know the firm. (3) Improve your maths and English to grade 4+ at evening college if missing. Most successful applicants who don\\u2019t get in first time DO get in second year. Persistence matters.' },
    ],
    related: [
      ['/guides/apprentice-electrician-salary', 'Apprentice Salary', 'PoundSterling'],
      ['/guides/cg-2365-vs-5357-vs-2366', 'Qualification Comparison', 'GraduationCap'],
      ['/guides/electrical-apprentice-year-1-revision-plan', 'Year 1 Revision Plan', 'GraduationCap'],
      ['/guides/how-to-hire-an-electrical-apprentice', 'How to Hire an Apprentice (Employer)', 'Briefcase'],
      ['/guides/off-the-job-training-hours', 'Off-The-Job Training Hours', 'ClipboardCheck'],
      ['/guides/electrician-career-progression-uk', 'Electrician Career Progression', 'GraduationCap'],
    ],
  },
  // ============ Off-the-job training content ============
  {
    slug: 'off-the-job-training-hours-tracking',
    badge: 'Apprenticeship',
    badgeIcon: 'ClipboardCheck',
    title: 'Off-The-Job (OTJ) Training Hours Tracking — Apprentice Guide',
    audience: 'electrical apprentices logging their off-the-job training hours',
    summary: 'A practical guide to off-the-job (OTJ) training hour tracking for UK electrical apprentices. What counts, what doesn\\u2019t, the 20% minimum rule, and how to keep evidence that satisfies ESFA audits.',
    keyPoints: [
      'OTJ training is a legal requirement of the Apprenticeship Standard — minimum 20% of working hours',
      'What counts: college day, supervised on-site learning of new skills, CPD events, reading technical material, simulation work, online courses',
      'What does NOT count: regular productive work, repeating known tasks, lunch breaks, travel time to college',
      'Track every hour with: activity, duration, what was learned, who supervised — typically logged weekly',
      'ESFA can audit your OTJ evidence; insufficient evidence means the apprenticeship funding can be clawed back',
      'Elec-Mate\\u2019s apprentice tier includes a built-in OJT logger that auto-categorises activities',
    ],
    sections: [
      { id: 'what-is-otj', heading: 'What OTJ Training Is and Why It Exists', body: 'Off-the-Job (OTJ) training is the formal learning component of the Apprenticeship Standard — distinct from on-the-job productive work. It exists because an apprenticeship is a training programme, not a cheap labour scheme. The Education and Skills Funding Agency (ESFA) requires a minimum 20% of the apprentice\\u2019s contracted hours to be OTJ — typically equivalent to one full day per week, though it can be distributed differently.' },
      { id: 'what-counts', heading: 'What Counts as OTJ', body: 'Activities that count: scheduled college days (full days credited). Supervised learning of new skills on site (e.g. shadowing a more experienced electrician on first-time work). CPD events / conferences. Reading technical material (BS 7671, IET On-Site Guide, manufacturer guides). Simulation / bench work practising new techniques. Online courses (manufacturer product training, scheme-led CPD). Time with your mentor reviewing your portfolio.' },
      { id: 'what-doesnt-count', heading: 'What Does NOT Count', body: 'Activities that do NOT count: regular productive work where you are doing the same task you can already do. Repeating routine jobs. Travel time to and from college / site. Lunch breaks and rest periods. Statutory holidays. Sick days. Time spent fixing your own mistakes on existing work. Be honest in your log — overstating OTJ is the single biggest reason apprentices get pulled up at the ESFA audit.' },
      { id: 'minimum-20-percent', heading: 'The 20% Minimum Rule', body: 'For a 40-hour working week, 20% is 8 hours OTJ per week. Over a 12-month apprenticeship year, ~400-450 hours OTJ. Some apprentices do more (especially in the early college-heavy years). The 20% can be distributed: front-loaded (more in Year 1), spread evenly, or block-released (multiple weeks of college at a time). Confirm your specific arrangement with your training provider.' },
      { id: 'logging-evidence', heading: 'Logging Your OTJ Evidence', body: 'For every OTJ activity, record: date, activity description (specific — not "training"), duration, what was learned (the new skill or knowledge), who supervised. Most colleges supply a paper logbook; many apprentices supplement with an app for ease of use. Submit weekly to your tutor. Get the supervisor / mentor / tutor signature where possible — un-signed evidence is harder to defend in an audit.' },
      { id: 'use-elec-mate', heading: 'Use Elec-Mate\\u2019s OJT Logger', body: 'The Elec-Mate apprentice tier includes a built-in OTJ hour logger. Auto-categorises activities (college, supervised learning, CPD, reading, simulation). Pre-populates from your calendar. Generates the audit-ready report your tutor and ESFA expect. Tutor dashboard view so your college can see your progress in real time. 7-day free trial — see how much faster OTJ logging is on a phone.' },
    ],
    related: [
      ['/guides/electrical-apprentice-year-1-revision-plan', 'Year 1 Revision Plan', 'GraduationCap'],
      ['/guides/finding-an-electrical-apprenticeship-uk', 'Finding an Apprenticeship', 'GraduationCap'],
      ['/guides/how-to-hire-an-electrical-apprentice', 'How to Hire (Employer)', 'Briefcase'],
      ['/guides/apprentice-electrician-salary', 'Apprentice Salary', 'PoundSterling'],
      ['/guides/cg-2365-vs-5357-vs-2366', 'Qualification Comparison', 'GraduationCap'],
      ['/guides/am2-exam-tips', 'AM2 Exam Tips', 'GraduationCap'],
    ],
  },
  {
    slug: 'off-the-job-training-employer-guide',
    badge: 'Employer Guide',
    badgeIcon: 'Briefcase',
    title: 'Off-The-Job Training for Electrical Employers',
    audience: 'electrical contractors and small business owners managing apprentice OTJ requirements',
    summary: 'A practical employer guide to OTJ training requirements. How to plan the 20% minimum, what activities count, the ESFA audit, and how to avoid the most common compliance traps.',
    keyPoints: [
      'You are legally responsible for ensuring your apprentice gets 20% of contracted hours as OTJ training',
      'Failure to meet 20% can result in apprenticeship funding being clawed back at the ESFA audit',
      'Cost the OTJ time into the apprentice\\u2019s wage — you pay for that time even though they\\u2019re not productively working',
      'Plan OTJ activities in advance — supervised learning on new skills, CPD events, scheme courses, reading time',
      'Document everything: the apprentice\\u2019s logbook is the audit evidence, but your contemporaneous records matter too',
      'Use Elec-Mate\\u2019s Employer tier — auto-tracks OTJ across your team and produces audit-ready reports',
    ],
    sections: [
      { id: 'legal-requirement', heading: 'Your Legal Obligation as Employer', body: 'Under the Apprenticeship Standard, the apprentice must spend a minimum 20% of their contracted hours on Off-the-Job training. This is a legal requirement. You are responsible for ensuring it happens AND for paying the apprentice during that time. Failure to meet 20% can result in: ESFA clawback of apprenticeship funding (~£15-27k per apprentice), loss of ESFA-approved employer status, and reputational damage with the training provider.' },
      { id: 'planning-the-20-percent', heading: 'Planning the 20%', body: 'For a 40-hour working week, plan 8 hours of OTJ per week. Most employers structure this as: 1 day per week at college (year 1-3), additional supervised on-site learning of new skills, scheduled CPD events. Build OTJ into your apprentice\\u2019s timetable from day one. Don\\u2019t leave it as "we\\u2019ll fit it in when we can" — that\\u2019s how apprentices end up short at year-end.' },
      { id: 'qualifying-activities', heading: 'Activities That Qualify', body: 'College attendance (full days credited). Supervised learning of new skills on site — your senior electrician explicitly mentoring the apprentice on a new technique. CPD events. Manufacturer training (Hager, Schneider, NICEIC sessions). Online courses (scheme-led, technical). Time with the apprentice reviewing their NVQ portfolio. Reading technical material in supervised time. Bench / simulation practice in your workshop.' },
      { id: 'non-qualifying-activities', heading: 'Activities That Don\\u2019t Qualify', body: 'Routine productive work the apprentice can already do. Lunch breaks. Travel time. Statutory holidays. Sick days. Time fixing the apprentice\\u2019s own mistakes. Time at college that\\u2019s not formal training (lunch breaks at college also don\\u2019t count). Be conservative — over-claiming creates audit risk.' },
      { id: 'esfa-audit', heading: 'The ESFA Audit Process', body: 'ESFA may audit your apprenticeship arrangements at any time during or after the apprenticeship. Audit typically reviews: the apprentice\\u2019s OTJ logbook, your contemporaneous training records, the training provider\\u2019s confirmation of college attendance, evidence of supervised learning (signed mentor notes). If insufficient evidence is presented, the ESFA can claw back the apprenticeship funding from the employer (you, not the apprentice).' },
      { id: 'use-elec-mate-employer', heading: 'Use the Elec-Mate Employer Tier', body: 'The Elec-Mate Employer tier auto-tracks OTJ hours across your apprentice team. Each apprentice logs activities on their phone; the employer dashboard aggregates and shows you exactly where each one is against the 20% target. Generates audit-ready reports in PDF. Integrates with the apprentice\\u2019s NVQ portfolio. 7-day free trial — see how much simpler OTJ tracking is when it\\u2019s on autopilot.' },
    ],
    related: [
      ['/guides/how-to-hire-an-electrical-apprentice', 'How to Hire an Apprentice', 'Briefcase'],
      ['/guides/off-the-job-training-hours-tracking', 'OTJ Apprentice Guide', 'ClipboardCheck'],
      ['/guides/starting-an-electrical-business-uk', 'Starting an Electrical Business', 'Briefcase'],
      ['/guides/electrical-contractor-marketing-guide', 'Marketing Guide', 'Briefcase'],
      ['/guides/cg-2365-vs-5357-vs-2366', 'Qualification Comparison', 'GraduationCap'],
      ['/guides/finding-an-electrical-apprenticeship-uk', 'Finding an Apprenticeship', 'GraduationCap'],
    ],
  },
];

function escSingle(s) { return String(s).replace(/'/g, "\\'"); }
function pascalCase(s) { return s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''); }

function configFor(e) {
  const ident = `${pascalCase(e.slug)}Config`;
  const kpBullets = e.keyPoints.map((kp) => `    '${escSingle(kp)}.',`).join('\n');
  const sectionBlocks = e.sections.map((s) => `    {
      id: '${escSingle(s.id)}',
      heading: '${escSingle(s.heading)}',
      tocLabel: '${escSingle(s.heading.length > 28 ? s.heading.slice(0, 25) + '...' : s.heading)}',
      blocks: [
        {
          type: 'paragraph',
          text: '${escSingle(s.body)}',
        },
      ],
    },`).join('\n');
  const related = e.related.map(([href, title, icon]) => `    {
      href: '${escSingle(href)}',
      title: '${escSingle(title)}',
      description: 'Related guide for ${escSingle(e.audience)}.',
      icon: '${icon}',
      category: 'Guide',
    },`).join('\n');

  return `import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// ${escSingle(e.title)} — apprentice / electrician / employer content.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ${ident}: GeneratedGuideConfig = {
  pagePath: '/guides/${e.slug}',
  title: '${escSingle(e.title)} — 2026 Guide',
  description: '${escSingle(e.summary)}',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: '${escSingle(e.badge)}',
  badgeIcon: '${e.badgeIcon}',
  breadcrumbLabel: '${escSingle(e.title.length > 35 ? e.title.slice(0, 32) + '...' : e.title)}',
  heroPrefix: '${escSingle(e.title)}:',
  heroHighlight: 'Complete 2026 Guide',
  heroSuffix: '— For UK Electrical Trade',
  heroSubtitle:
    '${escSingle(e.summary)} This guide is for ${escSingle(e.audience)}.',
  keyTakeaways: [
${kpBullets}
  ],
  sections: [
${sectionBlocks}
    {
      id: 'study-with-elec-mate',
      heading: 'Use Elec-Mate to Track and Study',
      tocLabel: 'Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate is built for UK electrical apprentices, qualified electricians, and business owners. Unit revision, AM2 mocks, OJT tracking, quoting, certification — all in one place. 7-day free trial.',
        },
      ],
    },
  ],
  faqs: [
    { question: 'Who is this guide for?', answer: 'This guide is written for ${escSingle(e.audience)}. The advice is practical, UK-specific, and based on current 2026 regulations.' },
    { question: 'How does Elec-Mate help with this?', answer: 'Elec-Mate covers every part of the UK electrical apprentice + electrician journey. Unit revision, AM2 mocks, OTJ tracking, quoting, certification, scheme paperwork. 7-day free trial.' },
    { question: 'Is the content updated for 2026?', answer: 'Yes — every page reflects 2026 regulatory thresholds, scheme fees, and market rates as of May 2026. We update annually as rules change.' },
    { question: 'What if I need specific advice for my situation?', answer: 'Speak to: your college tutor (apprentices), your scheme operator (NICEIC, NAPIT, ELECSA, Stroma for qualified electricians), your accountant (for business owners). Elec-Mate\\u2019s AI specialist can also answer specific scenario questions instantly.' },
    { question: 'How long does it take to act on this guide?', answer: 'Most actionable items can be completed within 1-12 weeks. Longer commitments (qualification, scheme membership) are noted explicitly in the text.' },
    { question: 'Where can I find more guides like this?', answer: 'See our full apprentice + qualification hub at elec-mate.com/guides — every unit revision page, AM2 deep-dive, year-by-year plan, and business owner guide is indexed there.' },
  ],
  howToHeading: 'Five-Step Action Plan',
  howToDescription: 'Based on the guide above.',
  howToSteps: [
    { name: 'Read the full guide above', text: 'Get familiar with every section. Details matter — skim then read carefully.' },
    { name: 'Identify your priority', text: 'Pick the single most important action for your situation today.' },
    { name: 'Take a concrete step within 7 days', text: 'Inertia is the biggest barrier. Do ONE concrete thing this week.' },
    { name: 'Track progress in Elec-Mate', text: 'Use the Elec-Mate dashboard for the relevant tier (apprentice, electrician, business owner).' },
    { name: 'Review in 90 days', text: 'Most decisions need a 90-day review. Did it work? Adjust and try the next thing.' },
  ],
  relatedPages: [
${related}
  ],
  ctaHeading: 'Start Free with Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK electrical apprentices, electricians, and business owners using Elec-Mate. 7-day free trial.',
};
`;
}

function wrapperFor(e) {
  const ident = `${pascalCase(e.slug)}Config`;
  const pname = `${pascalCase(e.slug)}Page`;
  return `import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { ${ident} } from '@/pages/seo/generated/${ident}';

export default function ${pname}() {
  return <GeneratedGuidePage config={${ident}} />;
}
`;
}

let generated = 0, skipped = 0;
const indexEntries = [];
for (const e of ENTRIES) {
  const ident = `${pascalCase(e.slug)}Config`;
  const pname = `${pascalCase(e.slug)}Page`;
  const configFile = join(GEN_DIR, `${ident}.ts`);
  const wrapperFile = join(SEO_DIR, `${pname}.tsx`);
  if (!FORCE && existsSync(configFile)) { skipped++; continue; }
  writeFileSync(configFile, configFor(e));
  writeFileSync(wrapperFile, wrapperFor(e));
  generated++;
  indexEntries.push({ pname, slug: `/guides/${e.slug}` });
}

const lazyLines = indexEntries.map((e) => `const ${e.pname} = lazy(() => import('@/pages/seo/${e.pname}'));`).join('\n');
const routeLines = indexEntries.map((e) => `      <Route path="${e.slug}" element={<LazyRoute><${e.pname} /></LazyRoute>} />`).join('\n');
writeFileSync(join(ROOT, 'reports/programmatic-routes-apprentice-extras.txt'), `// Lazy:\n${lazyLines}\n\n// Routes:\n${routeLines}\n`);
console.log(`Generated ${generated} pages, skipped ${skipped}.`);
