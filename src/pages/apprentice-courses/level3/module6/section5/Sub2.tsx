/**
 * Module 6 · Section 5 · Subsection 2 — Calculating Zs at design stage (Cmin 0.95)
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.2, 5.3
 *
 * Layered depth: 2366-03 Unit 304 / AC 5.2; 5393-03 Unit 104 / AC 5.2
 *
 * The Cmin 0.95 voltage factor — what it is, where it comes from
 * (Appendix 14), how it propagates into Table 41.3, and how to apply
 * it on the design pack so the calc lines up with the regs.
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

const TITLE = 'Calculating Zs at design stage — Cmin 0.95 (5.2) | Level 3 Module 6.5.2 | Elec-Mate';
const DESCRIPTION =
  'The Cmin voltage factor minimum from BS 7671 Appendix 14. What it is, why A4:2026 made it explicit at 0.95, and how it propagates into the Reg 411.4.5 design check and the Table 41.3 max Zs values.';

const checks = [
  {
    id: 'cmin-physical-meaning',
    question:
      'The Cmin factor of 0.95 in Reg 411.4.5 represents:',
    options: [
      'Specific, predetermined grading criteria defined in the assessment plan — each component is assessed against descriptors for pass and distinction grades based on the KSBs demonstrated, and component grades combine according to defined rules for the overall result',
      'As a social skill, active listening builds trust, reduces misunderstanding, and creates the psychological safety needed for effective collaboration — the speaker feels genuinely heard, which strengthens the working relationship and increases the quality of information shared',
      'The voltage factor minimum — accounts for the fact that the supply voltage at the fault point during a heavy fault may be lower than the declared U0 of 230 V due to supply tolerance and source impedance, so the design uses U0 × Cmin = 230 × 0.95 = 218.5 V as the available driving voltage for the fault current.',
      'Cumulative DC residual current from the EV charger and other loads could exceed the AC-only RCD threshold, plus DC residual currents may blind a Type AC RCD; a Type A or Type B RCD is required (BS 7671 722.531.3.101 / Section 722)',
    ],
    correctIndex: 2,
    explanation:
      "Cmin (the voltage factor minimum) accounts for two real-world effects: (1) the UK supply tolerance is +10 / -6 percent (216 to 253 V), so the declared 230 V is only the nominal value; (2) during a heavy fault the voltage at the fault point drops further due to source impedance. BS 7671 incorporates Cmin = 0.95 to ensure the design provides margin against both effects — the available driving voltage for fault current is U0 × Cmin = 218.5 V, not 230 V. Reg 411.4.5 in A4:2026 makes this explicit; pre-A4 editions implied the same effect through other means but did not name Cmin in the regulation text.",
  },
  {
    id: 'cmin-table-impact',
    question:
      'A B32 MCB on TN had a Table 41.3 max Zs of 1.44 Ω in BS 7671:2018+A2:2022 (the pre-A4 edition). In A4:2026 the value is 1.37 Ω. Why did it change?',
    options: [
      'A4:2026 made Cmin = 0.95 explicit in the calculation. Old: max Zs = U0 / Ia = 230 / 160 = 1.44 Ω (no Cmin). New: max Zs = U0 × Cmin / Ia = 230 × 0.95 / 160 = 1.37 Ω. The 5 percent reduction is the Cmin factor working through.',
      'Both have valid positions — a quote is generally fixed, but genuinely unforeseeable work can constitute a valid variation, provided it is documented and agreed before proceeding',
      'The architect must consider how the glazing will be safely cleaned throughout the building\\\\\\\\\\\\\\\'s life and, where reasonably practicable, design in safe access solutions such as permanent davit systems, walkways, or access gantries',
      'Comprehensive condition monitoring (annual thermographic survey, scheduled IR testing of busbars), detailed PPM (annual inspection, torque checks, cleaning), priority spare parts holding, and documented failure investigation for any breakdown',
    ],
    correctIndex: 0,
    explanation:
      "A4:2026 brought BS 7671 into line with the harmonised European HD 60364-4-41 by making Cmin = 0.95 explicit in the equation and the lookup tables. The numerical impact is straightforward: every Table 41.3 Zs limit is multiplied by 0.95 compared to the pre-A4 value. B32 went from 1.44 Ω to 1.37 Ω. C32 went from 0.72 Ω to 0.68 Ω. D32 went from 0.36 Ω to 0.34 Ω. Borderline pre-A4 designs may now fail; designers using old Zs lookup apps will under-call non-compliance. Always confirm the edition.",
  },
  {
    id: 'design-zs-calc-method',
    question:
      'You are designing a 32 A B-curve RCBO on a 40 m radial in 4 mm² T+E (cpc 1.5 mm²). DNO Form 1 declares Ze = 0.30 Ω. OSG Table I1 mΩ/m at 20 degrees C: 4 mm² = 4.61 mΩ/m, 1.5 mm² = 12.10 mΩ/m. What is the design Zs at 70 degrees C operating temperature, and does it satisfy Reg 411.4.5 against the Table 41.3 max?',
    options: [
      'Use 250V test voltage where the equipment manufacturer permits, OR test live conductors connected together to earth (without between live and neutral), interpreting accordingly',
      'Cold (R1 + R2) = 40 × (4.61 + 12.10) / 1000 = 0.668 Ω. Hot at 70 degrees C: 0.668 × 1.20 = 0.802 Ω. Design Zs = 0.30 + 0.802 = 1.10 Ω. Table 41.3 max for B32 in A4:2026 = 1.37 Ω. Pass with 0.27 Ω margin.',
      'Washing facilities must include a supply of hot and cold (or warm) running water, soap or other suitable means of cleaning, and towels or other suitable means of drying',
      'The equipment must be made dead and isolated wherever possible; if live work is unavoidable, a specific risk assessment and method statement for live working must be produced',
    ],
    correctIndex: 1,
    explanation:
      "Method: cold (R1 + R2) from OSG Table I1 mΩ/m × route length / 1000 = 40 × 16.71 / 1000 = 0.668 Ω. Apply 70 degrees C correction × 1.20 = 0.802 Ω. Add Ze: 0.30 + 0.802 = 1.10 Ω. Compare against the A4:2026 Table 41.3 max Zs for B32 of 1.37 Ω. Margin = 0.27 Ω, design passes. Note the Cmin factor is already baked into the 1.37 Ω limit — do NOT also apply Cmin to your design Zs (that would double-count). Cmin appears once, in the regulation that derived the table value, not in the field calc.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671:2018+A4:2026 Appendix 14 deals with:',
    options: [
      'It provides a permanent record of the installation\\\\\\\'s condition, enables comparison between inspections, demonstrates compliance with regulations, and provides evidence of due diligence',
      'The voltage factors C used in the determination of fault currents and earth fault loop impedances — including Cmax (1.05 or 1.10) and Cmin (0.95) and the rationale for their use in Reg 411.4.5 and Reg 434.5 calculations.',
      'Isolate the entire board where reasonably practicable, or apply lock-off to every circuit that could become live within reach, and barrier off any remaining live parts to provide protection per HSE EAW Regulation 14',
      'Physical (electrical, mechanical, noise, vibration, height, slips, fire), chemical (substances, dust, fume), biological (bacteria, viruses, allergens), psychosocial (stress, violence, fatigue), ergonomic (manual handling, repetitive motion, posture).',
    ],
    correctAnswer: 1,
    explanation:
      "Appendix 14 of BS 7671:2018+A4:2026 is the home of the C voltage factors. Cmax (typically 1.05 for low voltage) is used in prospective fault current calculations (Reg 434 / 543) where the worst case is HIGH voltage — bigger fault current, bigger thermal stress on the cable. Cmin (0.95) is used in earth fault loop impedance calculations (Reg 411.4.5) where the worst case is LOW voltage — smaller driving voltage, smaller fault current, slower trip. Different worst cases for different calculations. Appendix 14 explains the harmonisation with IEC / HD 60364 and gives the rationale.",
  },
  {
    id: 2,
    question: 'The pre-A4 BS 7671 (e.g. A2:2022) Table 41.3 value for a B32 MCB on TN was 1.44 Ω. The A4:2026 value is:',
    options: [
      'De-escalate first (lower voice, acknowledge emotion, let them vent), then once calm use DESC model to address the issue',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
      '1.37 Ω — recalculated to incorporate Cmin = 0.95 explicitly. Designers using the old 1.44 Ω value for an A4:2026 design will under-call non-compliance.',
      'Remove the clothing carefully, avoiding further skin contact, and follow decontamination procedures in the COSHH assessment',
    ],
    correctAnswer: 2,
    explanation:
      "1.37 Ω = 230 × 0.95 / 160 (where 160 A is the worst-case magnetic trip threshold for a B32 MCB at 5 × In). The pre-A4 figure of 1.44 Ω = 230 / 160 (no Cmin in the calc). The change is 5 percent tighter — material for any borderline circuit. Always verify your Zs lookup app or spreadsheet is on the A4:2026 edition. If you find old design packs with 1.44 Ω limits cited, the safe assumption is they were designed under the old edition and a re-check at the A4 limit is prudent on any safety-critical or high-utilisation circuit.",
  },
  {
    id: 3,
    question: 'Cmax (the voltage factor maximum) is used in which type of calculation?',
    options: [
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ve identified some areas of the installation that do not meet current safety standards. I can provide a written report detailing the issues and recommended remedial work."',
      'Reviewed carefully, used to identify specific areas for improvement, incorporated into your revision plan, and addressed through targeted practice before the real assessment',
      'Trips within the required time when a fault current of the rated sensitivity (e.g., 30 mA) is applied — tests at 50%, 100% and 500% (5x) of the rated residual current, plus ramp tests',
      'Prospective fault current calculations — for Reg 434.5 (cable thermal withstand) and Section 543 (cpc adiabatic check). Cmax is typically 1.05 for low-voltage systems, lifting U0 for the worst-case current calc.',
    ],
    correctAnswer: 3,
    explanation:
      "Cmax is the upper voltage factor — used where the design worst case is HIGH voltage. Bigger driving voltage = bigger fault current = bigger I²t energy let-through = bigger thermal stress on the cable and cpc. So Cmax appears in: prospective fault current calculations under Reg 434 (cable thermal withstand) and Reg 543.1.3 (adiabatic equation for cpc selection). Cmin is the opposite — used where the design worst case is LOW voltage, giving smaller fault current and slower trip — so Cmin appears in Reg 411.4.5 (Zs satisfaction). Use Cmax 1.05 in fault-current calcs; use Cmin 0.95 in Zs calcs.",
  },
  {
    id: 4,
    question: 'When you calculate design Zs in the field for an A4:2026 design, where does Cmin appear in your numbers?',
    options: [
      'You do NOT explicitly multiply anything by Cmin in the field calc — Cmin is already incorporated into the Table 41.3 max Zs values you compare against. Your design Zs is just Ze + (R1 + R2) at 70 degrees C; you compare against the A4:2026 Table 41.3 limit which has Cmin baked in.',
      'Verification of correct cable terminations, torque checks on all connections, correct protective device ratings and settings, correct phase rotation, clean interior free of debris, secure panel fixings, and functional interlocks',
      'Ib = 7000 / 230 = 30.4 A — round up to 32 A for the charger circuit. EV charging is essentially resistive (charger is a switchmode converter with near-unity power factor at full power) and continuous at full rating during a charging cycle, so no diversity applies on a dedicated EV circuit.',
      'Lower electricity bills (offset import + earn SEG on export), reduced carbon footprint, partial grid-independence (with battery), a hedge against rising electricity prices, often a positive impact on house value, and government incentive schemes that vary by year. Real benefits — but not “free electricity”.',
    ],
    correctAnswer: 0,
    explanation:
      "Cmin appears once, in the derivation of the Table 41.3 limit. The field calc is unchanged: design Zs = Ze + (R1 + R2) at 70 degrees C operating temperature. Compare against Table 41.3 max for the device fitted (which is the A4:2026 value with Cmin already applied). Do NOT also apply Cmin to your design Zs — that would double-count and tighten the design beyond what the regs require. Where you DO use Cmin explicitly is in the prospective fault current sanity check: Ipf = U0 × Cmin / Zs = 230 × 0.95 / Zs. The Ipf you calculate is then compared against the device magnetic threshold to confirm fast disconnection.",
  },
  {
    id: 5,
    question: 'You calculate design Zs for a circuit and find it is at 1.40 Ω against an A4:2026 Table 41.3 max of 1.37 Ω for the B32 device fitted. The design has failed by 0.03 Ω. What is the most appropriate first response?',
    options: [
      'Reg 4(1) is about system construction — building it safe. Reg 4(2) is about system maintenance — keeping it safe. A firm can install correctly (4(1)) and still breach (4(2)) by failing to inspect, test and maintain. EICR work is the legal mechanism for discharging Reg 4(2) on installations after the initial verification.',
      'Redesign — options include increasing the cpc CSA (e.g. from 1.5 mm² to 2.5 mm² as a separate cpc on a single-cable run), shortening the route by relocating the device or the load, dropping to a lower-rated device (B25 max Zs = 1.75 Ω), or fitting a 30 mA RCD as the alternative path under Reg 411.4.204 if the circuit type allows it.',
      'Unwanted conduct related to a relevant protected characteristic (age, race, sex, gender reassignment, religion or belief, sexual orientation, disability, marriage and civil partnership, pregnancy and maternity) that has the purpose or effect of violating the person\\\\\\\'s dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment for them. Section 26 of the Act.',
      'A pro forma is a quote-style document that looks like an invoice but doesn\\\\\\\'t trigger a tax point — typically used for upfront payment requests before work begins (e.g. materials deposit). Once the customer pays the pro forma, you issue the actual VAT invoice. Useful for cash-flow management on jobs where you need materials money upfront. Doesn\\\\\\\'t count toward turnover until converted to a real invoice.',
    ],
    correctAnswer: 1,
    explanation:
      "A failed design must be redesigned. Common options: (1) larger cpc to reduce R2 (often the dominant contributor); (2) shorter route to reduce both R1 and R2; (3) lower-rated device — B25 has a more permissive max Zs of 1.75 Ω, but check Ib ≤ In is still satisfied; (4) Type B is already the most permissive curve — moving to Type A only helps for very specific cases, and Type C / D are tighter; (5) 30 mA RCD as additional / alternative protection path under Reg 411.4.204 (this is also already mandatory for socket outlets up to 32 A under Reg 411.3.3 in most cases). Never round, never use the pre-A4 limit on an A4:2026 design.",
  },
  {
    id: 6,
    question: 'The reason BS 7671 uses different voltage factors for fault current calc (Cmax) and Zs calc (Cmin) is:',
    options: [
      'Three reasons. (1) Speed of selection — colour-coded ferrules let you grab the right size at a glance from a sorted ferrule kit. (2) Inspection — supervisor or QA can check at a glance that the ferrule colour matches the conductor CSA on every termination. (3) Standardisation — DIN 46228-4 is recognised across Europe, so any supplier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s ferrules match any other\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s. The colour code IS the inspection mechanism.',
      'Most providers run 5-10 days of taught content (often a mix of classroom and practical lab) plus the exam and practical assessment at the end. Some intensive 5-day courses; some part-time evening or weekend formats over 10-12 weeks. Self-study is possible but rare because the practical assessment requires specific equipment and witness-by-assessor.',
      'Each calculation has a different worst case. Fault current worst case is HIGH voltage (more energy, more thermal stress on cable) → use Cmax. Zs worst case is LOW voltage (smaller driving voltage, smaller fault current, slower trip) → use Cmin. Each factor pushes the calculation in the conservative direction for that specific design check.',
      'Under the Equality Act 2010, an employer can be held liable if they knew or could reasonably have been expected to know about the employee\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s disability, and the duty to make reasonable adjustments can arise even without formal disclosure if there were indicators that the employer should have noticed',
    ],
    correctAnswer: 2,
    explanation:
      "The principle is simple: each calc uses the voltage that gives the conservative answer for that check. Fault current calcs assume HIGH voltage (Cmax 1.05) so the calculated Ipf is the worst case for cable thermal withstand and adiabatic cpc sizing. Zs calcs assume LOW voltage (Cmin 0.95) so the calculated fault current is the worst case for trip time. Same supply, two different worst cases for two different calculations. Appendix 14 explains this with worked examples. Both factors derive from the harmonised IEC / HD 60364-4-41 / EN 60909 fault current standards.",
  },
  {
    id: 7,
    question: 'For a TN-S supply with assumed Ze = 0.80 Ω (no Form 1 available), you design a 16 A B-curve MCB on a 50 m run of 1.5 mm² T+E (cpc 1.0 mm²). OSG Table I1: 1.5 mm² = 12.10 mΩ/m, 1.0 mm² = 18.10 mΩ/m. Will it pass the design Zs check?',
    options: [
      'CPS-registered firms can self-certify notifiable Part P work and issue compliance certificates direct to the Local Authority on the homeowner\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s behalf. The LABC route requires a Building Notice or Building Regulations application before work starts, plus an LABC inspection during/after work — typically £150-300 per job and several weeks of LABC scheduling delay. Self-certification removes the cost and the delay.',
      'Gateway 1 — at planning, considers fire safety and access. Gateway 2 — before construction, the BSR reviews the design and construction control plan; no construction can start without approval. Gateway 3 — before occupation, the BSR signs off the as-built building against the approved design and the golden thread; no occupation without approval.',
      'Per CAR 2012 Reg 6 (assessment) + Reg 8 (licensed work) + HSE guidance L143. Considers: type of asbestos (chrysotile/amosite/crocidolite); friability; quantity; nature of work (removal vs encapsulation vs observation); duration; exposure level.',
      'Cold (R1 + R2) = 50 × (12.10 + 18.10) / 1000 = 1.51 Ω. Hot at 70 degrees C: 1.51 × 1.20 = 1.812 Ω. Design Zs = 0.80 + 1.812 = 2.61 Ω. Table 41.3 max for B16 in A4:2026 = 2.73 Ω. Just passes (margin only 0.12 Ω) — design is borderline and any route-length error during install will push it over. Reconsider cable size or route.',
    ],
    correctAnswer: 3,
    explanation:
      "The numbers add up to a marginal pass: 2.61 Ω against a 2.73 Ω limit, only 0.12 Ω of margin. That is too tight for a real install — any of the following would push the circuit over: actual route comes in at 55 m instead of 50 m; ambient temperature lifts above the assumed 30 degrees C; an additional grouping factor reduces the effective CCC (slightly raising operating temperature). Best practice is to redesign with more margin — go to 2.5 mm² T+E (line 7.41 + cpc 12.10 = 19.51 mΩ/m × 50 × 1.20 = 1.17 Ω; design Zs = 0.80 + 1.17 = 1.97 Ω; margin 0.76 Ω from the 2.73 limit) which is comfortably safe. The 50 m TN-S 1.5 mm² circuit is a classic borderline case under A4:2026 where the pre-A4 design (limit 2.87 Ω) would have looked safer.",
  },
  {
    id: 8,
    question: 'Documenting the design Zs on the design pack should include:',
    options: [
      'Ze source (Form 1 cited or BS 7671 assumed maximum cited); cable type, line CSA and cpc CSA; route length; OSG Table I1 mΩ/m at 20 degrees C cited; temperature factor applied (1.20 for 70-deg PVC, 1.28 for 90-deg thermosetting) cited; calculated cold (R1 + R2); calculated hot (R1 + R2); Ze + hot (R1 + R2) = design Zs; Table 41.3 max Zs cited (A4:2026 edition) for the device fitted; calculated margin; verification target (0.8 × Table 41.3 max for measured cold Zs).',
      'The manufacturer\\\\\\\'s instructions — BS 7671 Reg 510.3 explicitly requires equipment to be selected and erected taking account of those instructions. \\\\\\\'How it\\\\\\\'s always been done\\\\\\\' isn\\\\\\\'t a defence under BS 7671 or in a warranty claim. If you genuinely think the instructions are wrong (rare), the right response is to contact the manufacturer in writing and seek written clarification before deviating.',
      'Only when the demonstration would put the customer at risk (e.g. testing a high-voltage three-phase circuit where the customer shouldn\\\\\\\'t be in the work area). For domestic and most commercial work, the demonstration is the moment that confirms to the customer that the work is done. Skipping it leaves the customer uncertain — \\\\\\\'is it really fixed?\\\\\\\' — and creates the doubt that turns into complaints. The 5-second \\\\\\\'try plugging in your kettle now — see, no trip\\\\\\\' is worth the time.',
      'The right of access under UK GDPR Article 15 (a \\\\\\\'subject access request\\\\\\\' or SAR). The firm has one calendar month to respond, free of charge in most cases. The response must include the personal data being processed, the purposes, the categories, the recipients, the retention period, and the source of the data if not from the data subject.',
    ],
    correctAnswer: 0,
    explanation:
      "Full traceability is the audit trail that makes the design defensible. Each input is cited to its source. Each step shows the working. The verification target ties the design to what the inspector will measure at first inspection. The discipline takes a few extra minutes per circuit but pays off the first time a customer challenge or an EICR audit asks 'how did you arrive at this Zs?' — and you have the line-by-line answer in the design pack.",
  },
];

const faqs = [
  {
    question: 'Why did A4:2026 introduce Cmin 0.95 explicitly when previous editions seemed to work without it?',
    answer:
      "Pre-A4 BS 7671 used Table 41.3 limits derived from U0 / Ia without an explicit voltage factor — the implicit assumption was that the supply tolerance (approximately +10 / -6 percent) and the practical margin built into the device characteristic provided enough safety. In practice this worked, but it diverged from the harmonised IEC / HD 60364-4-41 method which has used Cmin explicitly for years. A4:2026 brought BS 7671 into formal alignment with the harmonised standard. The numerical impact is a 5 percent tightening of every Table 41.3 limit. Designers who never had a problem with the old method may not see any new failures (because most designs had margin); but borderline pre-A4 designs may now fail.",
  },
  {
    question: 'Where does the value Cmin = 0.95 actually come from?',
    answer:
      "From IEC 60909-0 and the harmonised HD 60364-4-41. The IEC family of fault-current standards uses C voltage factors to model real-world voltage variation: Cmax = 1.05 (low voltage, network in the upper part of its tolerance band) and Cmin = 0.95 (low voltage, network in the lower part of the band). The choice of 0.95 specifically is a calibration exercise — it gives a conservative Zs limit without being so tight that practical installation work fails routinely. Higher Cmin (like 0.90) would have made designs much harder for marginal cases; lower Cmin (closer to 1.00) would have provided less margin. 0.95 is the European-harmonised compromise. BS 7671 Appendix 14 explains the harmonisation route.",
  },
  {
    question: 'Does Cmin apply to all systems (TN, TT, IT) or just TN?',
    answer:
      "Cmin appears in Reg 411.4.5 (TN systems) and Reg 411.5.3 (TT systems) — the same 0.95 factor. On TN it modifies the overcurrent device Zs check (Table 41.3 limits). On TT it modifies the touch voltage calculation (RA × IΔn ≤ 50 V × Cmin = 47.5 V — though most designers still use the round 50 V figure as conservative). On IT systems Reg 411.6 has its own treatment; Cmin still applies in principle but IT installations are rare in UK practice. The key point: Cmin is the universal voltage factor minimum across all earthed systems for the Zs check, derived once in Appendix 14, applied consistently.",
  },
  {
    question: 'How do I check whether my Zs spreadsheet or app is on the A4:2026 edition?',
    answer:
      "Look at the published Table 41.3 limit for any common device. B32 max Zs should be 1.37 Ω in A4:2026 (was 1.37 Ω pre-A4); C32 should be 0.69 Ω (was 0.72 Ω); D32 should be 0.34 Ω (was 0.36 Ω). If your tool gives the higher pre-A4 numbers it is out of date. Many free Zs lookup websites are still on the pre-A4 values. Trusted current sources: Megger / Fluke / Kewtech app updates, IET OSG online (current edition), the BS 7671 itself in print or PDF. If in doubt, calculate from first principles: max Zs = U0 × Cmin / Ia = 230 × 0.95 / (5 × In) for a Type B MCB. For B32: 230 × 0.95 / 160 = 1.366 Ω → rounded to 1.37 Ω.",
  },
  {
    question: 'What does Cmin do for a circuit protected by a fuse rather than an MCB?',
    answer:
      "Same principle, applied to the fuse characteristic. Table 41.2 in BS 7671 gives max Zs for fuses (BS 88-3 rewireable, BS 1361, BS 88 series) at the relevant disconnection time (0.4 s for final ≤ 32 A on TN; 5 s for distribution and final &gt; 32 A). The fuse Ia is read off the time-current curve at the disconnection time. A4:2026 recalculated all Table 41.2 limits with Cmin = 0.95. Example: BS 88 fuse 32 A at 5 s on TN — the 5 s prearcing current is around 130 A; max Zs = 230 × 0.95 / 130 = 1.68 Ω. The principle is identical; only the device Ia differs between MCB and fuse.",
  },
  {
    question: 'If Cmin appears in Table 41.3, do I also need to use Cmin in my prospective fault current Ipf calculation?',
    answer:
      "Yes — Ipf for the disconnection time check uses U0 × Cmin / Zs (the same Cmin = 0.95). This is the worst-case smallest Ipf, used to confirm the device trips fast enough. It is different from the Ipf used for cable thermal withstand under Reg 434.5 — for that calc you want the worst-case BIGGEST Ipf, which uses U0 × Cmax (1.05 typically). The same circuit therefore has TWO different Ipf values for two different design checks: a small Ipf with Cmin (for trip time) and a large Ipf with Cmax (for cable thermal withstand and cpc adiabatic check). Document both on the design pack — the lower one drives the disconnection-time discussion, the higher one drives the cable / cpc thermal discussion.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 2"
            title="Calculating Zs at design stage — Cmin 0.95"
            description="The voltage factor minimum from BS 7671 Appendix 14. What it represents, why A4:2026 made it explicit at 0.95, how it propagates into the Reg 411.4.5 design check and the Table 41.3 max Zs values, and how to apply the design method end-to-end on the pack."
            tone="amber"
          />

          <TLDR
            points={[
              "Cmin 0.95 is the voltage factor minimum — accounts for supply tolerance and source-impedance voltage drop during fault. The available driving voltage in the Zs design check is U0 × Cmin = 230 × 0.95 = 218.5 V, not 230 V.",
              "BS 7671:2018+A4:2026 made Cmin explicit in Reg 411.4.5 and recalculated all Table 41.3 / 41.2 / 41.4 max Zs values to incorporate it. Every Table 41.3 limit is approximately 5 percent tighter than the pre-A4 value (e.g. B32 was 1.44 Ω, now 1.37 Ω).",
              "In the field design calc, Cmin appears once — already baked into the Table 41.3 limit. Do NOT also apply Cmin to your design Zs (that double-counts). Design Zs = Ze + (R1 + R2) at 70 degrees C, compared against the A4:2026 Table 41.3 limit.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State that Cmin = 0.95 is the voltage factor minimum from BS 7671:2018+A4:2026 Appendix 14, derived from harmonised IEC / HD 60364-4-41.',
              'Explain why Cmin is used in earth fault loop impedance calculations (Reg 411.4.5) and Cmax (1.05) is used in prospective fault current calculations (Reg 434 / 543) — different worst cases for different checks.',
              'Recalculate any Table 41.3 maximum Zs value from first principles using max Zs = U0 × Cmin / Ia for the device fitted.',
              'Apply the design Zs method end-to-end: source Ze, calculate cold (R1 + R2), apply temperature correction, sum to design Zs, compare against Table 41.3.',
              'Identify when a pre-A4 Zs lookup app is being used and recalculate to the A4:2026 limits to avoid under-calling non-compliance.',
              'Document the design Zs calculation with full traceability — every input cited, every working step shown, the verification target (0.8 × Table 41.3 max) recorded for first-inspection comparison.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Cmin 0.95 — the voltage factor minimum"
            plainEnglish="The supply voltage during a fault is lower than the declared 230 V. Cmin 0.95 is the design assumption — use 218.5 V as the available driving voltage when calculating fault current."
            onSite="Two things make the voltage at the fault point lower than 230 V: (1) the UK supply tolerance is +10 / -6 percent — the network can be at 216 V on a bad day; (2) during a heavy fault, the source impedance (transformer + cable) drops the voltage at the fault point further. Cmin packages both into a single 0.95 multiplier."
          >
            <p>
              The Reg 411.4.5 design check is:
            </p>
            <p className="text-base font-semibold text-elec-yellow">
              Zs × Ia ≤ U0 × Cmin
            </p>
            <p>
              Rearranged for the maximum permissible Zs:
            </p>
            <p className="text-base font-semibold text-elec-yellow">
              max Zs = (U0 × Cmin) / Ia = (230 × 0.95) / Ia = 218.5 / Ia
            </p>
            <p>
              Where:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>U0</strong> = nominal AC line voltage to earth = 230 V single-phase in the UK.</li>
              <li><strong>Cmin</strong> = voltage factor minimum = 0.95 (from BS 7671 Appendix 14, harmonised with IEC 60909-0 / HD 60364-4-41).</li>
              <li><strong>Ia</strong> = current in amperes causing automatic operation of the protective device within the time required by Reg 411.3.2.2 (Table 41.1: 0.4 s for final ≤ 32 A on TN; 5 s for distribution and final &gt; 32 A on TN).</li>
            </ul>
            <p>
              For a Type B BS EN 60898 MCB at 32 A, Ia = 5 × In = 160 A (the worst-case magnetic threshold). max Zs = 218.5 / 160 = 1.366 Ω → rounded to 1.37 Ω in Table 41.3. That is exactly the published limit. The same calculation applies for every other rating and curve type.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.6 (Cross-sectional area of conductors)"
            clause="The cross-sectional area (csa) of conductors shall be determined for both normal operating conditions and, where appropriate, for fault conditions according to: (a) the admissible maximum temperature; (b) the admissible voltage drop; (c) the electromechanical stresses likely to occur due to short-circuit and earth fault currents; (d) other mechanical stresses to which the conductors are likely to be exposed; (e) the maximum impedance for correct operation of short-circuit and earth fault protection; (f) the method of installation; (g) harmonics; (h) thermal insulation."
            meaning={
              <>
                Reg 132.6(e) is the regulatory hook for the whole max Zs calculation: the conductor csa must be selected so that the loop impedance stays low enough for the protective device to operate within its required disconnection time. The U0 × Cmin / Ia formula is the maths that turns "maximum impedance for correct operation" into a number — Cmin = 0.95 is the conservative voltage assumption built into Table 41.3, ensuring the cable still trips the breaker at the worst credible supply voltage. Get the csa wrong against 132.6(e) and the install fails ADS regardless of how clean the install looks visually.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.6."
          />

          <SectionRule />

          <ContentEyebrow>How Cmin propagates into Table 41.3</ContentEyebrow>

          <ConceptBlock
            title="Recalculating any Table 41.3 limit from first principles"
            plainEnglish="Pick the device. Find Ia (the magnetic trip threshold for an MCB, or the time-current pre-arcing current for a fuse). Apply max Zs = U0 × Cmin / Ia. That gives you the published Table 41.3 number."
          >
            <p>
              Worked examples for common BS EN 60898 MCBs at U0 = 230 V, Cmin = 0.95:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>B6:</strong> Ia = 5 × 6 = 30 A. Max Zs = 218.5 / 30 = 7.28 Ω.</li>
              <li><strong>B10:</strong> Ia = 5 × 10 = 50 A. Max Zs = 218.5 / 50 = 4.37 Ω.</li>
              <li><strong>B16:</strong> Ia = 5 × 16 = 80 A. Max Zs = 218.5 / 80 = 2.73 Ω.</li>
              <li><strong>B20:</strong> Ia = 5 × 20 = 100 A. Max Zs = 218.5 / 100 = 2.19 Ω.</li>
              <li><strong>B25:</strong> Ia = 5 × 25 = 125 A. Max Zs = 218.5 / 125 = 1.75 Ω.</li>
              <li><strong>B32:</strong> Ia = 5 × 32 = 160 A. Max Zs = 218.5 / 160 = 1.37 Ω.</li>
              <li><strong>B40:</strong> Ia = 5 × 40 = 200 A. Max Zs = 218.5 / 200 = 1.09 Ω.</li>
              <li><strong>B50:</strong> Ia = 5 × 50 = 250 A. Max Zs = 218.5 / 250 = 0.87 Ω.</li>
              <li><strong>B63:</strong> Ia = 5 × 63 = 315 A. Max Zs = 218.5 / 315 = 0.69 Ω.</li>
            </ul>
            <p>
              Type C MCBs use 10 × In for the magnetic threshold:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              {/* Zs values from canonical source: src/lib/calculators/bs7671-data/protectiveDevices.ts (BS 7671:2018+A4:2026 Table 41.3) */}
              <li><strong>C16:</strong> Ia = 10 × 16 = 160 A. Max Zs = 218.5 / 160 = 1.37 Ω (interesting — a C16 has the same Zs limit as a B32).</li>
              <li><strong>C32:</strong> Ia = 10 × 32 = 320 A. Max Zs = 218.5 / 320 = 0.683 Ω → 0.68 Ω (Table 41.3).</li>
              <li><strong>C40:</strong> Ia = 10 × 40 = 400 A. Max Zs = 218.5 / 400 = 0.55 Ω.</li>
            </ul>
            <p>
              Type D MCBs use 20 × In for the magnetic threshold:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>D16:</strong> Ia = 20 × 16 = 320 A. Max Zs = 218.5 / 320 = 0.683 Ω → 0.68 Ω (Table 41.3).</li>
              <li><strong>D32:</strong> Ia = 20 × 32 = 640 A. Max Zs = 218.5 / 640 = 0.341 Ω → rounded to 0.34 Ω.</li>
            </ul>
            <p>
              The pattern: tighter trip curves (B → C → D) need lower Zs to guarantee fast disconnection, because they need a bigger fault current to enter the magnetic region. Type B is the most permissive (5 × In threshold) and Type D is the tightest (20 × In threshold). For a given route length and cable, swapping a Type C for a Type B is a common way to bring a borderline circuit inside the limit — but check the inrush characteristic of the connected load does not nuisance-trip the more sensitive Type B.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 → A4:2026 — change record for Table 41.3"
            clause="Maximum Zs values in Tables 41.2, 41.3 and 41.4 have been recalculated to incorporate the voltage factor minimum Cmin = 0.95 in accordance with Appendix 14. The previous values in BS 7671:2018+A2:2022 (which did not explicitly apply Cmin) are no longer applicable for a design under A4:2026. Designers and inspectors should ensure they are using the current edition limits."
            meaning={
              <>
                This is the formal change note that explains why the Table 41.3 numbers shifted between A2 and A4:2026. Pre-A4: max Zs = U0 / Ia = 230 / Ia. Post-A4: max Zs = U0 × Cmin / Ia = 230 × 0.95 / Ia = 218.5 / Ia. The 5 percent reduction is the Cmin factor working through. Designs done under A2 with the old (more permissive) limits are not automatically non-compliant — the old limits were valid at the time of design — but any new design or any redesign as part of an EICR remedial must use the A4:2026 numbers. The pre-A4 values like B32 max Zs = 1.37 Ω should now be regarded as obsolete for design purposes.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Tables 41.2, 41.3, 41.4. See also Appendix 14 for the Cmin derivation and the harmonisation rationale with HD 60364-4-41."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic={videos.zeTest.topic}
          />

          <SectionRule />

          <ContentEyebrow>The end-to-end design Zs method</ContentEyebrow>

          <ConceptBlock
            title="The six-step design Zs calc, every time"
            plainEnglish="One method, applied identically to every circuit. Source the inputs, calculate (R1+R2) cold, correct to operating temperature, sum to Zs, compare against Table 41.3, document the trace."
          >
            <p>
              <strong>Step 1 — Source Ze.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From DNO Form 1 if available (use the declared figure; cite the document on the design pack).</li>
              <li>If no Form 1, use BS 7671 assumed maximum: 0.35 Ω TN-C-S; 0.80 Ω TN-S; 21 Ω TT (TT relies on RCD; Zs limit governed by Reg 411.5).</li>
            </ul>
            <p>
              <strong>Step 2 — Identify cable and route.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable type (T+E, SWA, MI, singles in conduit). Line conductor CSA. cpc CSA. Cable construction reference (BS 6004, BS 6346, BS EN 60702-1 etc).</li>
              <li>Actual installed route length (not as-the-crow-flies). Allow vertical runs, route deviations, connection tails, pulling allowance.</li>
            </ul>
            <p>
              <strong>Step 3 — Calculate cold (R1 + R2).</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cold (R1 + R2) = route length × (line mΩ/m + cpc mΩ/m) / 1000, with mΩ/m values from IET OSG Table I1 (or GN1 Table B5 for industrial cable types).</li>
            </ul>
            <p>
              <strong>Step 4 — Apply temperature correction to operating temperature.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>× 1.20 for 70-deg PVC thermoplastic operating at 70 degrees C.</li>
              <li>× 1.28 for 90-deg thermosetting (XLPE / EPR) operating at 90 degrees C.</li>
              <li>For special cases (ambient above 30 degrees C, grouping pushing temperature above standard), use OSG Appendix B detailed correction matrix.</li>
            </ul>
            <p>
              <strong>Step 5 — Sum and compare.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design Zs = Ze + hot (R1 + R2).</li>
              <li>Look up Table 41.3 max Zs for the device fitted (A4:2026 edition with Cmin 0.95 baked in).</li>
              <li>Confirm design Zs ≤ Table 41.3 max. Calculate margin.</li>
            </ul>
            <p>
              <strong>Step 6 — Document the trace.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record on the design pack: Ze source citation, cable spec, route length, OSG citation for mΩ/m, temperature factor and reason, cold (R1 + R2), hot (R1 + R2), design Zs, Table 41.3 max cited (A4:2026), margin.</li>
              <li>Record verification target for first inspection: measured cold Zs at every accessible end ≤ 0.8 × Table 41.3 max.</li>
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

          <ContentEyebrow>Worked example — TN-C-S domestic with EV charger circuit</ContentEyebrow>

          <Scenario
            title="EV charger on a 100 A TN-C-S domestic supply, 25 mm² tails, 32 A B-curve RCBO"
            situation={
              <>
                A semi-detached 1985-built dwelling with an existing 100 A BS 1361 service fuse cut-out and 25 mm² tails feeding a 2010 dual-RCD CU. The customer wants a 7.4 kW (32 A) home EV charger fitted in the porch. Run is 28 m of 6 mm² T+E (with 2.5 mm² cpc) from the existing CU through the loft and down the porch wall to the EV charger isolator. Protected by a new 32 A Type B RCBO (BS EN 61009) added to a spare way in the existing CU. The DNO has no Form 1 on file (as is common for an older supply); design uses the BS 7671 assumed maximum for TN-C-S of Ze = 0.35 Ω.
              </>
            }
            whatToDo={
              <>
                Step 1 — Ze. No Form 1 available. Use BS 7671 assumed maximum for TN-C-S: Ze = 0.35 Ω. Cite on design pack: 'BS 7671:2018+A4:2026 / IET GN3 assumed maximum Ze for TN-C-S.'\n\nStep 2 — Cable and route. 6 mm² T+E to BS 6004 with 2.5 mm² cpc. Route length 28 m (loft + porch wall). OSG Table I1 mΩ/m at 20 degrees C: 6 mm² line = 3.08 mΩ/m; 2.5 mm² cpc = 7.41 mΩ/m. Loop = 10.49 mΩ/m at 20 degrees C.\n\nStep 3 — Cold (R1 + R2). 28 × 10.49 / 1000 = 0.294 Ω.\n\nStep 4 — Temperature correction. 70-deg thermoplastic, operating at 70 degrees C → factor 1.20 from OSG Appendix B. Hot (R1 + R2) = 0.294 × 1.20 = 0.353 Ω.\n\nStep 5 — Design Zs. Ze + hot (R1 + R2) = 0.35 + 0.353 = 0.703 Ω. Table 41.3 max Zs for B32 in A4:2026 = 1.37 Ω. Margin = 1.37 - 0.703 = 0.67 Ω. Pass with very comfortable margin (50 percent of the limit, design is robust).\n\nStep 6 — Sanity check Ipf. Ipf = U0 × Cmin / Zs = 230 × 0.95 / 0.703 = 311 A. Type B RCBO magnetic threshold = 5 × 32 = 160 A. 311 A is well above 160 A — disconnection is in the magnetic region of the curve, well under 100 ms — comfortably within the 0.4 s required.\n\nStep 7 — Document on the design pack. Full trace recorded as listed above. Verification target for first inspection: measured cold Zs at the EV charger isolator ≤ 0.8 × 1.37 = 1.10 Ω. Note: 25 mm² tails to the existing CU contribute almost zero additional impedance to Zs (R1 contribution roughly 1.5 m × 0.727 mΩ/m × 1.20 = 1.3 mΩ — negligible) so the design Zs at the EV charger isolator is effectively the value calculated above with full margin.
              </>
            }
            whyItMatters={
              <>
                This is the canonical 2026 domestic EV install — TN-C-S supply, 100 A service, 25 mm² tails, dedicated 32 A B-curve RCBO. The design Zs of 0.703 Ω against a 1.37 Ω limit gives 0.67 Ω of margin — enough that a 10 m route extension during install (e.g. if the route turns out longer than surveyed) still leaves safe margin. The 25 mm² tails being effectively negligible in the (R1+R2) sum is worth noting — for typical domestic supplies, the dominant contributors are Ze and the final-circuit cable, not the tails. The discipline of citing the BS 7671 assumed Ze (because no Form 1 exists) is good professional practice — the inspector at first verification will measure actual Ze (typically 0.20-0.30 Ω in built-up areas — comfortably under the 0.35 assumption); the design holds up regardless.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Using a pre-A4 Zs lookup app on an A4:2026 design"
            whatHappens={
              <>
                Designer uses a free online Zs lookup app (or an old PDF cheat-sheet, or an old spreadsheet) that gives B32 max Zs = 1.44 Ω. Calculates a design Zs of 1.40 Ω — looks like a pass with 0.04 Ω margin. Submits the EIC. Next year an EICR with an updated lookup tool flags the same circuit at 1.40 Ω against the A4:2026 limit of 1.37 Ω — non-compliance with margin failure. The customer is now told their year-old install needs remedial work.
              </>
            }
            doInstead={
              <>
                Verify your Zs lookup tool is on the A4:2026 edition. Spot check: the published B32 max Zs should read 1.37 Ω, NOT 1.37 Ω. C32 should read 0.69 Ω, NOT 0.72 Ω. D32 should read 0.34 Ω, NOT 0.36 Ω. If the tool gives the higher pre-A4 numbers it is out of date. Use a current Megger / Fluke / Kewtech app, or the printed BS 7671:2018+A4:2026, or calculate from first principles every time (max Zs = 218.5 / Ia for any device). The 5-second check protects the design from being non-compliant the day it lands.
              </>
            }
          />

          <CommonMistake
            title="Double-counting Cmin — applying it to both the design Zs and the lookup limit"
            whatHappens={
              <>
                Designer reads about Cmin 0.95 and conscientiously multiplies their calculated design Zs by 0.95 'to apply Cmin' — getting 0.703 × 0.95 = 0.668 Ω. Compares against Table 41.3 max of 1.37 Ω. The apparent margin is now bigger than reality. The design is over-conservative — fine in this case (still passes) but in a borderline case the Cmin double-count could mask a fail by making it look like a pass.
              </>
            }
            doInstead={
              <>
                Cmin is applied ONCE — in the derivation of the Table 41.3 limit (which is U0 × Cmin / Ia). Your design Zs in the field is just Ze + (R1 + R2) at 70 degrees C, no Cmin multiplier. Compare your raw design Zs against the A4:2026 Table 41.3 limit which already has Cmin baked in. Where you DO apply Cmin separately is in the Ipf calc (Ipf = U0 × Cmin / Zs = 218.5 / Zs) for the disconnection-time sanity check — a different calc with a different purpose.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Protective earthing)"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. Conductors for protective earthing shall comply with Chapter 54. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning={
              <>
                Reg 411.3.1.1 is the underlying duty that the Reg 411.4.5 Zs check verifies.
                Every exposed-conductive-part must connect to a protective conductor; a CPC
                must run to every point; the CPC sizing (calculated under Reg 543.1.3) must
                survive the fault. The design Zs calc you do at the desk is the proof that
                the CPC, chosen against this duty, will let the device operate inside the
                Table 41.1 disconnection time. If the design Zs fails, you cannot meet
                411.3.1.1 by virtue of the device being too slow at the actual fault current.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1."
          />

          <SectionRule />

          <ContentEyebrow>Two more pieces of the design picture</ContentEyebrow>

          <ConceptBlock
            title="Temperature correction in detail — why 1.20 and when it shifts"
            plainEnglish="The 1.20 multiplier on cold (R1 + R2) reflects copper's resistance rise from 20 to 70 degrees C. It is not a guess — it comes from copper's temperature coefficient of resistance, α = 0.00393 per degree C. The factor matters because the design must hold up at the conductor's worst-case operating temperature, not the showroom-cold reading on the test instrument."
            onSite="If your cable insulation is 90 degrees C thermosetting (XLPE) rather than 70 degrees C thermoplastic, the multiplier is higher — typically 1.28 for a starting temperature of 20 degrees C and operating at 90 degrees C. Pick the right factor for the cable family or the design Zs is wrong."
          >
            <p>
              The temperature correction factor is derived from R(T) = R20 × [1 + α (T − 20)],
              where α for soft-annealed copper is 0.00393 per degree C. Plugging in:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>20 to 70 degrees C (PVC thermoplastic operating point):</strong> factor =
                1 + 0.00393 × 50 = 1.20. This is the OSG Appendix B figure used for the
                everyday domestic / commercial design.
              </li>
              <li>
                <strong>20 to 90 degrees C (XLPE thermosetting operating point):</strong> factor =
                1 + 0.00393 × 70 = 1.28. Use this on industrial sub-mains where the cable family
                is XLPE rather than PVC.
              </li>
              <li>
                <strong>20 to 60 degrees C (mineral insulated cable, lower-rated termination):</strong>{' '}
                factor = 1 + 0.00393 × 40 = 1.16. Less common, but worth knowing.
              </li>
            </ul>
            <p>
              The design Zs must hold at the conductor's actual operating temperature, because
              that is the temperature the conductor will reach under the steady-state design
              current Ib before any fault occurs. A fault that arrives when the cable is already
              at 70 degrees C sees a higher loop impedance than a fault at 20 degrees C, and the
              device sees a lower If — slower clearance, longer touch-voltage exposure. The
              temperature factor bakes that worst case into the design.
            </p>
            <p>
              The 0.8 acceptance criterion at verification (Sub 5.3) is the inverse of this
              temperature factor — measured cold ≤ 0.8 × hot limit means the cold reading,
              when scaled up by 1.20 to the operating temperature, will still sit at or below
              the Table 41.3 limit. The two factors fit together cleanly: design with 1.20
              applied (cold to hot), accept measured with 0.8 applied (hot to cold).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where Ze actually comes from — Form 1 vs assumed maxima vs measured"
            plainEnglish="Ze is the supply-side earth-fault loop impedance, from the supply transformer star point through the PEN/PE conductor and back to the consumer's main earthing terminal. It is the starting value for any Zs design. There are three legitimate sources at design stage: a DNO Form 1 declaration, a BS 7671 assumed maximum, or a measured value from a previous test."
            onSite="On a new connection the DNO Form 1 is the gold standard. On an existing supply with no Form 1 on file, the BS 7671 assumed maxima are the documented fall-back. On a refurbishment where the previous EIC has a measured Ze, you can carry that figure into the new design — but cite it and re-measure on completion to confirm the assumption still holds."
          >
            <p>
              The three legitimate sources for Ze at design stage:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DNO Form 1 (the connection agreement):</strong> the DNO declares Ze
                for the specific supply position. Typical figures: TN-C-S 0.20–0.35 Ω,
                TN-S 0.30–0.80 Ω. The Form 1 is contractually binding on the DNO; the design
                stands or falls on this number.
              </li>
              <li>
                <strong>BS 7671 assumed maxima (no Form 1):</strong> for a TN-C-S supply with
                no Form 1, use Ze = 0.35 Ω as the assumed maximum. For a TN-S supply, use
                Ze = 0.80 Ω. These are the published "if you have nothing else to go on" figures
                — IET Guidance Note 3 carries the same values. Cite the source on the design pack.
              </li>
              <li>
                <strong>Measured Ze from a previous EIC:</strong> on a refurbishment, the
                previous EIC's Ze measurement is a reasonable design starting point — the
                supply Ze does not change unless the DNO has reconfigured the network.
                Cite the source EIC and re-measure at first verification to confirm.
              </li>
            </ul>
            <p>
              Ze is not the same as Zdb (the loop impedance at the distribution board) or
              Zs (the loop impedance at the load). Ze is supply-side only — Zs = Ze + (R1 + R2)
              for the final circuit. Always be precise about which value you mean on the design
              pack; the EIC schedule has separate boxes for Ze, Zdb and Zs at the furthest
              accessible point of every circuit, and the values must reconcile.
            </p>
            <p>
              For TT supplies the "Ze" figure is the soil-electrode loop impedance, typically
              hundreds of ohms — completely different design regime, RCD-driven rather than
              MCB-driven (Reg 411.5 and Sub 5.4 cover TT in detail).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="OSG Table I1 — looking up cold (R1+R2) per metre"
            plainEnglish="The cold resistance per metre of the line and CPC conductors of common cable types is tabulated in the IET On-Site Guide Table I1. For a 2.5/1.5 mm² flat T&E cable, the line resistance is roughly 7.41 milliohm per metre and the CPC is 12.10 milliohm per metre. The two are added to give the round-trip cold resistance per metre — for that cable about 19.51 milliohm per metre. Multiply by the cable run in metres and you have the cold (R1+R2) for the circuit, which feeds straight into the design Zs calc."
            onSite="The OSG carries the table on its inside cover for fast reference; have a printed copy in the van or use the IET app. Common cable resistances every L3 designer carries in their head: 1.5/1.0 mm² approx 30 milliohm per metre, 2.5/1.5 mm² approx 19.5 milliohm per metre, 4.0/1.5 mm² approx 17 milliohm per metre, 6.0/2.5 mm² approx 10 milliohm per metre, 10/4 mm² approx 6 milliohm per metre. Pick the cable from the design schedule, multiply by length, apply the temperature factor, add to Ze. The whole calc fits on one line."
          >
            <p>
              Quick-reference cold (R1+R2) per metre for common T&E:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1.5/1.0 mm² flat T&E (lighting)</strong> — ~30 milliohm/m round-trip cold.
              </li>
              <li>
                <strong>2.5/1.5 mm² flat T&E (sockets, ring final)</strong> — ~19.5 milliohm/m.
              </li>
              <li>
                <strong>4.0/1.5 mm² flat T&E (radial socket / immersion)</strong> — ~17 milliohm/m.
              </li>
              <li>
                <strong>6.0/2.5 mm² flat T&E (cooker / shower)</strong> — ~10 milliohm/m.
              </li>
              <li>
                <strong>10/4 mm² flat T&E (heavy radial)</strong> — ~6 milliohm/m.
              </li>
              <li>
                <strong>16/6 mm² (sub-main)</strong> — ~3.7 milliohm/m.
              </li>
              <li>
                <strong>SWA cables</strong> — different table; use the OSG SWA section
                or manufacturer data. SWA is heavier and the steel armour can
                contribute to the protective conductor on certain installations.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Designing for the worst case — supply tolerance, network reinforcement and cable derating"
            plainEnglish="The Zs design check is a worst-case calculation. The Cmin = 0.95 voltage factor handles the supply tolerance worst case. Network reinforcement (DNO swapping a transformer or a feeder cable) can shift Ze in either direction; design with margin so a future Ze change of 20-30 percent does not invalidate the certificate. Cable derating (multiple cables in a conduit, high ambient, thermal insulation) raises the operating temperature above the design 70 degrees C — the temperature multiplier may need to be higher than 1.20."
            onSite="Always work to the worst-case Ze (use the assumed maximum unless you have a Form 1 with a lower figure). Apply the cable derating from BS 7671 Appendix 4 if the cable runs in conditions outside the standard reference (grouped with others, embedded in insulation, in hot ceiling voids). On safety-critical circuits — domestic showers on a 32 A circuit, EV chargers, large heat pumps — leave 10-20 percent extra margin on Zs so a future Ze rise or a thermal-derating recalculation does not push the circuit over."
          >
            <p>
              Where the worst-case design margins come from:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply tolerance</strong> — Cmin 0.95 already in the
                Table 41.3 limit; do not double-count.
              </li>
              <li>
                <strong>Network change</strong> — assume Ze can rise 20 percent
                over the install life; design to leave that margin.
              </li>
              <li>
                <strong>Cable grouping</strong> — multiple circuits in a single
                conduit or trunking run hotter; cable rating drops by the
                Appendix 4 grouping factor.
              </li>
              <li>
                <strong>Thermal insulation</strong> — cable embedded in or under
                insulation runs hotter; rating drops by the Appendix 4 insulation
                factor.
              </li>
              <li>
                <strong>Ambient temperature</strong> — design ambient is 30
                degrees C; ceiling voids in summer can hit 50-60 degrees C;
                rating drops by the Appendix 4 ambient factor.
              </li>
              <li>
                <strong>Periodic re-verification</strong> — measured Zs at every
                EICR; the 0.8 acceptance criterion catches drift before it
                becomes a defect.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="C-Type and D-Type devices — when the Table 41.3 limit becomes very tight"
            plainEnglish="Type C and Type D MCBs trip at higher multiples of In than Type B (5-10x for Type C, 10-20x for Type D). The higher Ia means a lower max Zs is required to hit the 0.4 second disconnection target. A C32 device's Table 41.3 max Zs at 230 V is around 0.69 ohms — half the B32 figure. A D32 device drops to about 0.34 ohms. On any circuit with motor inrush, welder duty or capacitor switching, the protective device shifts to Type C or D and the Zs design tightens accordingly."
            onSite="Industrial circuits, commercial kitchens with heavy contactor loads, EV charging banks with capacitor-style power supplies — all common Type C / D applications. The L3 designer flags these at the design stage and either accepts a tighter Zs (heavier cable, shorter run) or finds a different protection strategy (motor-rated fuse plus thermal overload, soft-start, VSD). Document the device type on the EIC schedule and the Table 41.3 max it was sized to — the next inspector needs to know which limit applies."
          >
            <p>
              Table 41.3 maxima per device type at 230 V (A4:2026 figures):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>B32 (BS EN 60898)</strong> — max Zs 1.37 ohms.
              </li>
              <li>
                <strong>C32 (BS EN 60898)</strong> — max Zs 0.68 ohms.
              </li>
              <li>
                <strong>D32 (BS EN 60898)</strong> — max Zs 0.34 ohms.
              </li>
              <li>
                <strong>B16 / C16 / D16</strong> — limits scale roughly inversely
                with In; B16 around 2.74 ohms, C16 around 1.37 ohms, D16 around
                0.69 ohms.
              </li>
              <li>
                <strong>Type-selection logic</strong> — Type B for general
                domestic, Type C for moderate inrush (small motors, fluorescent
                ballast), Type D for heavy inrush (welders, capacitor banks,
                large motors).
              </li>
              <li>
                <strong>Cite the type on the EIC</strong> — the schedule has a
                column for device type alongside rating. Future inspectors and
                designers rely on the explicit citation.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Cmin = 0.95 is the voltage factor minimum from BS 7671:2018+A4:2026 Appendix 14. It accounts for supply tolerance and source-impedance voltage drop during fault — the available driving voltage in the Zs check is U0 × Cmin = 218.5 V, not 230 V.",
              "Reg 411.4.5 (TN systems): Zs × Ia ≤ U0 × Cmin. Rearranged: max Zs = U0 × Cmin / Ia = 218.5 / Ia. Table 41.3 is this equation pre-solved for common BS EN 60898 MCBs.",
              "A4:2026 made Cmin explicit and recalculated all Tables 41.2 / 41.3 / 41.4 — every limit is approximately 5 percent tighter than pre-A4. B32 went from 1.44 Ω to 1.37 Ω. C32 went from 0.72 Ω to 0.68 Ω. D32 went from 0.36 Ω to 0.34 Ω.",
              "Cmin appears ONCE — in the derivation of the Table 41.3 limit. Do NOT multiply your field design Zs by Cmin (that double-counts). Design Zs = Ze + (R1 + R2) at 70 degrees C, compared against the A4:2026 Table 41.3 limit.",
              "Cmin applies to Zs calcs (low-voltage worst case); Cmax (1.05) applies to fault current calcs for thermal withstand (high-voltage worst case). Same supply, different worst cases for different design checks.",
              "The six-step design Zs method: source Ze → identify cable and route → cold (R1+R2) from OSG Table I1 → apply temperature factor → sum and compare against Table 41.3 → document the trace with citations.",
              "Pre-A4 Zs lookup apps and cheat-sheets that give the higher (e.g. 1.44 Ω B32) limits are now obsolete for design. Always confirm the tool you use is on the A4:2026 edition with the lower (1.37 Ω B32) values.",
              "For TN-C-S domestic supplies with no Form 1, use Ze = 0.35 Ω as the BS 7671 assumed maximum. Document the citation on the design pack so the EIC trace is intact.",
            ]}
          />

          <Quiz title="Calculating Zs at design stage — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 EFLI framework
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Max vs measured Zs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
