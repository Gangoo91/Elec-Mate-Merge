/**
 * Module 6 · Section 5 · Subsection 1 — Earth fault loop impedance framework
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.1, 5.2
 *
 * Layered depth: 2366-03 Unit 304 / AC 5.1; 5393-03 Unit 104 / AC 5.1
 *
 * The Zs = Ze + (R1 + R2) framework. What each term physically means.
 * Where the numbers come from. Why this single equation drives every
 * disconnection-time decision on the design pack.
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
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Earth fault loop impedance — Ze + (R1 + R2) = Zs (5.1) | Level 3 Module 6.5.1 | Elec-Mate';
const DESCRIPTION =
  'The Zs framework. Ze from the supply, (R1 + R2) from the chosen cable, summed at 70 degrees C operating temperature, compared against Table 41.3 max Zs. The single equation that gates every ADS decision on the design pack.';

const checks = [
  {
    id: 'physical-meaning-zs',
    question:
      'In the equation Zs = Ze + (R1 + R2), each term represents the impedance of a different physical path. Which option correctly identifies the three?',
    options: [
      'The main contractor controls access, programme, payment, and future work opportunities, which can make subcontractors reluctant to raise legitimate disputes for fear of consequences',
      'Move the bond connection to a clean section of the same pipe (still consumer side, still before any branch, within 600 mm of point of entry where practicable per Reg 544.1.2). Clean to bare metal, apply paste, fit clamp.',
      'Ze = the external loop from the origin out through the supply transformer star point and back to the means of earthing; R1 = the line conductor from origin to the fault point; R2 = the protective conductor from the fault point back to the MET.',
      'They must not tamper with, remove, or bypass the meter without authority from the energy supplier — the meter is the property of the metering company, and interference is a criminal offence under the Theft Act 1968 and Electricity Act 1989',
    ],
    correctIndex: 2,
    explanation:
      "Ze is the supply-side external loop: starts at the origin (consumer cut-out), runs back through the supply cable to the local distribution transformer, through the transformer star-point earth and the supply neutral or earth back to your means of earthing terminal. R1 is the line conductor from the origin all the way out to the fault point on the far end of the final circuit. R2 is the circuit protective conductor (cpc) from the fault point all the way back to the MET. The three impedances are in series during a line-to-earth fault, so they sum to Zs — the total earth fault loop impedance the protective device sees.",
  },
  {
    id: 'temperature-correction',
    question:
      'You are calculating Zs for a 32 A radial in 4 mm² T+E (1.5 mm² cpc). The IET OSG resistance per metre at 20 degrees C is 12.10 + 12.10 = 24.20 mΩ/m for the loop. The cable is 35 m long. What is (R1 + R2) at the conductor operating temperature of 70 degrees C used for the design Zs check?',
    options: [
      'Apply a temperature factor of 1.20 (IET OSG Table I3 / Appendix B) to lift the 20 degrees C value to the 70 degrees C operating value: 0.847 × 1.20 ≈ 1.016 Ω.',
      'To manage, schedule, and record all maintenance activities, including work orders, asset history, spare parts inventory, and maintenance KPIs',
      'Energised continuously (or thermostatically controlled) to maintain the enclosure temperature above the dew point',
      'The fresh air intake must be positioned in an area free from contamination, away from exhausts, generators, or other sources of hazardous gases',
    ],
    correctIndex: 0,
    explanation:
      "(R1 + R2) values published in the OSG / GN1 are at 20 degrees C — convenient for cold-circuit measurement. The design Zs check has to be at the conductor operating temperature (70 degrees C for 70-deg PVC thermoplastic insulation) because copper resistance rises around 0.4 percent per degree C. The 1.20 multiplier (50 deg rise × 0.004) is the standard OSG correction for 70 degrees C. Thermosetting cable insulation rated 90 degrees C uses a slightly larger factor (~1.28). Use the right factor for the cable type. The calculation here gives 1.016 Ω at operating temperature.",
  },
  {
    id: 'ze-source',
    question:
      'For the design-stage Zs calc, where does the value of Ze legitimately come from?',
    options: [
      'A short briefing to site workers about specific ecological risks, protected species, and the mitigation measures they must follow',
      'Arc-rated clothing matched to the prospective incident energy, insulated gloves rated to the working voltage, eye/face protection, and insulated footwear',
      'The DNO declared figure on Form 1 (or assumed maximum if no Form 1 is available — TN-C-S typically 0.35 Ω, TN-S typically 0.80 Ω). Measured Ze is for verification, not design.',
      'The risk of recurrence, the severity of consequences, the availability of resources and the opportunity to implement (e.g., next planned shutdown)',
    ],
    correctIndex: 2,
    explanation:
      "Design uses the DNO declared Ze because it is the contractually-binding figure from the network operator and the only number guaranteed to remain valid as the network evolves. Where no Form 1 exists, BS 7671 lets you assume the maximum typical figure (0.35 Ω for PME / TN-C-S; 0.80 Ω for TN-S; 21 Ω for TT but TT relies on RCD). Measured Ze at verification confirms the supply still meets the assumption — if the measured figure exceeds the design assumption, the design Zs is invalid and the disconnection times need rechecking.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which BS 7671 regulation states that an earth fault must be cleared automatically within a defined disconnection time on a TN system?',
    options: [
      '7% words, 38% tone of voice, 55% body language — relevant when emotional content is at stake',
      'Reg 411.3.2.2 — for TN systems, a fault of negligible impedance shall be disconnected within the times stated in Table 41.1.',
      'The recency effect combined with sleep consolidation — the brain processes and consolidates newly learned material during sleep',
      'Re-prove dead independently using their own GS38 voltage indicator and known live proving unit',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 411.3.2.2 is the headline ADS requirement on TN systems — the protective device must clear a line-to-earth fault within the maximum disconnection time in Table 41.1 (0.4 s for final circuits up to and including 32 A on TN, 5.0 s for distribution circuits and final circuits exceeding 32 A). The Zs framework exists to make this regulation auditable: if Zs is at or below the Table 41.3 maximum then the disconnection time is satisfied by inspection.",
  },
  {
    id: 2,
    question: 'Reg 411.4.5 of BS 7671:2018+A4:2026 says, in essence:',
    options: [
      'Investigate the I/O signals using PLC monitoring software, check sensor outputs and wiring, review the PLC programme logic for timing issues, check for electrical noise from nearby VSDs, and examine the safety circuit for marginal switch contacts',
      'Focus targeted revision on that specific area, seek help from your training provider or mentor, practise explaining the topic in your own words, and prepare to be honest in the discussion if asked about an area you find challenging',
      'For each circuit on a TN system, the earth fault loop impedance Zs shall satisfy the equation Zs × Ia ≤ U0 × Cmin, where Ia is the current causing automatic operation in the required disconnection time and Cmin is 0.95.',
      'The apprentice is withholding information, possibly due to low trust. The mentor should build rapport and create psychological safety to encourage self-disclosure',
    ],
    correctAnswer: 2,
    explanation:
      "Reg 411.4.5 (TN systems) states that for each circuit the fault loop impedance Zs shall be such that Zs × Ia ≤ U0 × Cmin, where U0 is the nominal line-to-earth voltage (230 V), Cmin is the voltage minimum factor (0.95 in A4:2026), and Ia is the device operating current that produces disconnection within the required time from Table 41.1. The Table 41.3 maximum Zs values are the rearranged form of this equation pre-computed for common BS EN 60898 MCBs and BS EN 60947-2 MCCBs — they save you re-deriving the math for every circuit.",
  },
  {
    id: 3,
    question: 'On a TN-C-S (PME) supply with no Form 1 available, the assumed value of Ze used for design is:',
    options: [
      'Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help',
      'Working effectively with others, contributing to team objectives and supporting colleagues',
      'Interest typically continues to accrue, extending the agreement and increasing total cost',
      '0.35 Ω — the recognised maximum for PME systems used in design where no DNO declared figure is available.',
    ],
    correctAnswer: 3,
    explanation:
      "The recognised assumed maximum Ze for TN-C-S / PME is 0.35 Ω. For TN-S the assumed maximum is 0.80 Ω. For TT, BS 7671 assumes the RCD does the job and Zs requirements are governed by Reg 411.5 with the 200 Ω max RA touch-voltage rule. Always document on the design pack whether you used a declared figure (cite Form 1) or the assumed maximum (cite BS 7671 / IET GN3) so the EIC / EICR auditor can trace the assumption.",
  },
  {
    id: 4,
    question: 'A line-to-earth fault on the far end of a final circuit drives current through which physical path?',
    options: [
      'Through the line conductor (R1) from origin to fault, through the negligible arc resistance at the fault, back through the cpc (R2) to the MET, then through the external loop (Ze) back to the supply transformer and round to the line.',
      'During fault diagnosis you discover the agreed scope must change (additional cabling required, asbestos found, hidden defects) — written variation captures cost, time and consent before extra work proceeds',
      'Cover the wound and bone end with a sterile dressing without applying direct pressure over the protruding bone, build up padding around it, immobilise the limb, and call 999',
      'The written permit provides a formal record that hazards have been identified, precautions specified, and authorisation given — protecting both the workers and the organisation',
    ],
    correctAnswer: 0,
    explanation:
      "The fault loop is a complete electrical circuit: line conductor out, fault at the end, cpc back to the MET, external supply loop (transformer secondary, supply cable, supply earth or PEN) back to the line conductor at the origin. Each of those impedances is in series, so they add: Zs = Ze + R1 + R2. The fault current Ia = U0 / Zs (with U0 reduced by the Cmin factor 0.95 in the design check).",
  },
  {
    id: 5,
    question: 'Why does the design Zs check use (R1 + R2) at 70 degrees C, not at 20 degrees C?',
    options: [
      'Allows EVs to discharge stored battery energy back to the grid or building during peak demand periods — effectively using the EV battery as a distributed energy storage resource, providing grid services and reducing electricity costs for the vehicle owner',
      'Because at the moment the fault occurs the cable is already at its operating temperature (typically 70 degrees C for 70-deg thermoplastic insulation), and the resistance of copper rises with temperature — using the cold value would understate Zs and make the disconnection time look better than it actually is at full load.',
      'BS 7671 is non-statutory but compliance is treated by the courts as evidence of discharging the EAWR duty. It\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'safe harbour\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' — follow BS 7671 and the prosecution has to work much harder to prove you breached EAWR. Depart from BS 7671 and you have to demonstrate the alternative is at least as safe.',
      'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
    ],
    correctAnswer: 1,
    explanation:
      "Copper resistivity rises about 0.4 percent per degree C. A 50-deg rise from ambient to operating temperature lifts (R1 + R2) by about 20 percent. Designing at the cold value would understate Zs by 20 percent — and a circuit that is just inside the Table 41.3 max at 20 degrees C will be over the max at 70 degrees C. The IET OSG Table I3 / Appendix B factor of 1.20 (for 70-deg PVC) is the standard correction. Thermosetting (90-deg) cables use about 1.28.",
  },
  {
    id: 6,
    question: 'A 30 m run of 2.5 mm² T+E (line) with 1.5 mm² cpc has resistance per metre at 20 degrees C of 7.41 + 12.10 = 19.51 mΩ/m. The Ze is 0.35 Ω (TN-C-S declared). What is the design-stage Zs at 70 degrees C operating temperature?',
    options: [
      'Segregate at source — recyclable cable scrap, WEEE for accessories with electronics, mixed waste, and asbestos suspect material handled separately under CAR 2012 / HSG264',
      'Eliminate → Substitute → Engineering controls → Administrative controls → PPE. PPE is the LAST line. The hierarchy applies across H&S regs (COSHH Reg 7, MHSWR ACOP, HSG48).',
      '0.35 + (0.030 × 19.51 × 1.20) = 0.35 + 0.702 = 1.05 Ω (rounded). At 70 degrees C operating temperature, applying the 1.20 OSG correction.',
      'Records of who was trained, the training content and date, the trainer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s competence, competence assessment outcomes, and scheduled refresher dates',
    ],
    correctAnswer: 2,
    explanation:
      "Step 1: cold (R1 + R2) = 30 m × 19.51 mΩ/m = 585.3 mΩ = 0.585 Ω. Step 2: apply the 1.20 temperature factor for 70-deg thermoplastic operating at 70 degrees C: 0.585 × 1.20 = 0.702 Ω. Step 3: add Ze: 0.35 + 0.702 = 1.05 Ω. Compare against Table 41.3 max Zs for the device fitted. For a 32 A B-curve MCB on TN that limit is 1.37 Ω in A4:2026, so this circuit passes the design check with margin.",
  },
  {
    id: 7,
    question: 'What is the relationship between Ia (current causing automatic operation) and the device characteristic for a Type B BS EN 60898 MCB?',
    options: [
      'A poor termination somewhere along the circuit — a loose neutral block, a poorly tightened CPC, or a corroded joint adding extra resistance to the fault loop. Check every termination, retest after re-making.',
      'Report the death immediately to the HSE by telephone, follow up with a written report within 10 days, secure and preserve the scene, conduct a thorough investigation to establish root cause, and implement corrective actions to prevent recurrence',
      'A single incident commonly engages multiple statutory duties simultaneously — HASAWA s.2 (firm to employee) + s.3 (firm to non-employee) + s.7 (operative personal) + s.37 (director personal) + EAWR Regs + MHSWR Regs + specific daughter regs. Prosecution selects from the stack.',
      'Ia is the magnetic-trip threshold = 5 × In for Type B (3 × In for Type A; 10 × In for Type C; 20 × In for Type D); for the Table 41.3 maximum Zs this is the current that gives a sub-100 ms disconnection — the upper-bound trip current at the steep end of the I-t curve.',
    ],
    correctAnswer: 3,
    explanation:
      "MCB instantaneous (magnetic) trip thresholds per BS EN 60898: Type B 3-5 × In (use 5 × In for the Zs calc as the worst case); Type C 5-10 × In (use 10 × In); Type D 10-20 × In (use 20 × In). Below the magnetic threshold the device times out via the thermal element (slow). Above the threshold it trips in under 100 ms — well within the 0.4 s and 5 s requirements. Designing to keep the prospective fault current at or above the magnetic threshold is the whole point of the Zs check: it puts the trip in the fast region, not the slow region.",
  },
  {
    id: 8,
    question: 'Why is the design pack expected to record both the Ze used and the source of (R1 + R2)?',
    options: [
      'Because the EIC and any future EICR have to be able to trace the calculation back to a defensible source — DNO Form 1 or BS 7671 assumed maximum for Ze; OSG Table I1 / IET GN1 cable resistance tables for (R1 + R2) — and confirm the temperature correction was applied. Without the trace the design Zs is unverifiable.',
      'Three: Category 1 (visitable dwellings — accessible to visitors), Category 2 (accessible and adaptable dwellings), Category 3 (wheelchair user dwellings, with sub-categories 3a and 3b for adaptable and accessible respectively).',
      'The Construction Phase Plan is the Principal Contractor\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s plan for managing H&S throughout the construction phase (CDM 2015 Reg 12). It documents the controls, the welfare arrangements, the emergency procedures, the trade-clash management, the high-risk activities and the supervision arrangements. The PC writes it and updates it as the project evolves.',
      'Under Reg 443.4.1, protection against transient overvoltages shall be provided where the consequence could result in (a) serious injury to, or loss of, human life or (c) significant financial or data loss (limb (b) was deleted by the A2:2022 May 2023 corrigendum); for all other cases protection is provided unless the owner declares it not required and accepts the risk.',
    ],
    correctAnswer: 0,
    explanation:
      "Every Zs figure on the design pack must be traceable: Ze source (Form 1 / assumed); cable type and CSA; route length; OSG / GN1 mΩ/m table cited; temperature factor applied; resulting (R1 + R2); summed Zs. Without the trace, a future inspector cannot confirm the design satisfies Reg 411.4.5 or that the Table 41.3 max was the right number to compare against. The discipline is the difference between a defensible design and a paper exercise.",
  },
];

const faqs = [
  {
    question: 'Why call it Zs instead of Rs? The fault is a DC-style trip.',
    answer:
      "Zs is the symbol used in BS 7671 for the total earth fault loop impedance — impedance, not resistance, because at 50 Hz the cable inductance does contribute (small but non-zero on long runs of large cables). For typical final circuits the inductive component is negligible compared to the resistive component, so for hand calculation people often treat (R1 + R2) as a pure resistance. On large sub-mains (95 mm² and above) and on long runs (over 50 m) the inductance starts to matter — IET GN1 has the impedance values rather than just resistance for those cases. Use Z (impedance) on the formal design pack; use R (resistance) for everyday small-cable hand calcs.",
  },
  {
    question: 'Why does the regulation use Cmin 0.95 in the design check?',
    answer:
      "Cmin (the voltage factor minimum) accounts for the fact that the supply voltage at the fault point during a fault may be lower than the declared U0 of 230 V — supply tolerance is +10 / -6 percent in the UK (216 to 253 V), and during a heavy fault the voltage at the load drops further due to the source impedance. BS 7671:2018+A4:2026 introduced Cmin 0.95 explicitly into Reg 411.4.5 — the design Zs has to satisfy Zs × Ia ≤ U0 × 0.95 = 218.5 V, not 230 V. The Table 41.3 max Zs values in A4:2026 are recalculated to incorporate the 0.95 factor, which is why the B32 max changed from the old 1.37 Ω (A2) to 1.37 Ω (A4:2026). Cmin is covered in detail in Sub2.",
  },
  {
    question: 'What changed in Table 41.3 in A4:2026?',
    answer:
      "A4:2026 recalculated all the Table 41.3 maximum Zs values using Cmin = 0.95 from Appendix 14, replacing the previous practice that did not explicitly apply Cmin in the table. The new values are about 5 percent lower than the old ones — for example a B32 MCB on TN went from 1.37 Ω (A2 / pre-A4) to 1.37 Ω (A4:2026). If you have an old design pack or an old Zs lookup app, the limits are tighter now. Always confirm you are working from the A4:2026 edition. The regulation that mandates this is unchanged in principle but the number is now demonstrably the right one for the supply tolerance.",
  },
  {
    question: 'Does Zs apply to circuits on a TT system?',
    answer:
      "Yes, but the calculation is dominated by RA (the earth electrode resistance) rather than the supply Ze. On TT, the fault loop runs from the line conductor through the appliance cpc, through the building MET to the local earth electrode, then back through soil to the supply transformer earth. The soil path makes the loop impedance high (typical RA 50 to 200 Ω) — way above any MCB magnetic threshold. So TT relies on an RCD for ADS, with Reg 411.5.3 setting the touch-voltage rule (RA × IΔn ≤ 50 V — typically RA × 0.030 ≤ 50 V gives RA ≤ 1667 Ω, but a working design target is RA ≤ 200 Ω to keep the touch voltage well within limits). The Zs framework still applies but the answer is driven by the RCD spec, not the Table 41.3 limits.",
  },
  {
    question: 'How do I handle Zs on a buried cable that runs through a hot ambient (next to a heating pipe, in a roof void)?',
    answer:
      "Two corrections matter: ambient temperature derating during normal operation (which lifts the conductor operating temperature above the typical 70 degrees C used for the standard Zs correction), and a tighter ambient correction at fault. For a circuit where the cable is expected to operate at 90 degrees C (because of high ambient and / or grouping), apply the 1.28 temperature factor instead of the 1.20 factor. For thermosetting cable rated 90 degrees C insulation, also use 1.28 unless you know the actual operating temperature. The IET OSG Appendix B has the detailed correction matrix. When in doubt, design to the worst-case operating temperature you have specified — never use the cold value on the design pack.",
  },
  {
    question: 'How does the Zs design figure relate to the Zs measured at verification?',
    answer:
      "At verification the inspector measures Zs at every accessible end of every circuit using a low-current loop tester. The measured value is at ambient (cold) cable temperature — typically much lower than the design figure at 70 degrees C operating temperature. To bridge the gap the IET GN3 80-percent rule is applied: measured Zs at ambient should be at most 80 percent of the Table 41.3 max for the device, because the cable will rise about 25 percent in resistance when hot — the 80-percent measured figure leaves the headroom. So the design check is at 70 degrees C against the full Table 41.3 max; the verification check is at 20 degrees C against 80 percent of that max. Both have to pass independently. The 80-percent rule is covered in detail in Sub3.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 6 · Section 5 · Subsection 1"
            title="Earth fault loop impedance — Ze + (R1 + R2) = Zs"
            description="The single equation that gates every disconnection-time decision on the design pack. Ze from the supply, (R1 + R2) from the chosen cable corrected to operating temperature, summed and compared against the Table 41.3 maximum for the protective device fitted."
            tone="amber"
          />

          <TLDR
            points={[
              "Zs = Ze + (R1 + R2) is the total earth fault loop impedance the protective device sees during a line-to-earth fault. Ze is the supply external loop; R1 is the line conductor from origin to fault; R2 is the cpc from fault back to the MET.",
              "Design uses the DNO declared Ze (from Form 1) or the BS 7671 assumed maximum where no Form 1 exists — TN-C-S 0.35 Ω, TN-S 0.80 Ω. (R1 + R2) at 70 degrees C operating temperature uses OSG Table I1 cold values with the 1.20 temperature correction (or 1.28 for 90-deg thermosetting).",
              "BS 7671 Reg 411.4.5 (A4:2026) requires Zs × Ia ≤ U0 × Cmin where Cmin = 0.95. The Table 41.3 max Zs values are the pre-computed limits — for example B32 MCB on TN max Zs = 1.37 Ω in A4:2026 (was 1.44 Ω pre-A4 — recalculated to incorporate Cmin).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain what each term in Zs = Ze + (R1 + R2) physically represents in the earth fault loop.',
              'Cite Reg 411.3.2.2 (TN disconnection times) and Reg 411.4.5 (Zs satisfaction) as the two regulations that gate ADS on TN systems.',
              'Source Ze for design from a DNO Form 1 declared figure or, where unavailable, the BS 7671 assumed maximum (0.35 Ω TN-C-S; 0.80 Ω TN-S).',
              'Calculate (R1 + R2) at 70 degrees C operating temperature using OSG Table I1 cold values with the standard 1.20 temperature correction (or 1.28 for 90-deg thermosetting cables).',
              'Compare the calculated design Zs against the BS 7671 Table 41.3 maximum for the protective device fitted, applying the A4:2026 values that incorporate Cmin 0.95.',
              'Document the Zs calc on the design pack with full traceability — Ze source, cable type and CSA, route length, OSG mΩ/m citation, temperature factor applied, resulting Zs.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The earth fault loop is a series circuit — three impedances in series"
            plainEnglish="Line out, fault at the end, cpc back, supply loop closes the circuit. Each leg has impedance. Add them up. That is Zs."
            onSite="Picture the path. Origin to socket through the line conductor. Through the fault to the appliance metal. Back through the cpc to the MET. Through the supply earth or PEN back to the transformer. Through the transformer secondary. Out through the supply cable. Back to the origin. The whole path is in series. The impedance of the whole path is Zs."
          >
            <p>
              At the moment a line-to-earth fault occurs, current flows around a complete loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Line conductor (R1)</strong> — from the consumer unit origin out to the point of fault on the final circuit.</li>
              <li><strong>Arc / contact resistance at fault</strong> — typically negligible; BS 7671 assumes a fault of negligible impedance for the design check.</li>
              <li><strong>Circuit protective conductor (R2)</strong> — from the fault point back through the cpc of the final circuit to the consumer unit, then to the MET.</li>
              <li><strong>External supply loop (Ze)</strong> — from the MET out through the building earthing arrangement (PEN on TN-C-S; separate earth on TN-S; electrode on TT), through the supply cable, through the local distribution transformer star-point earth and the transformer secondary winding, back to the supply line conductor at the origin.</li>
            </ul>
            <p>
              All four legs are in series. The impedances add directly:
            </p>
            <p className="text-base font-semibold text-elec-yellow">
              Zs = Ze + R1 + R2
            </p>
            <p>
              Zs has units of ohms. The fault current that flows is Ia = U0 / Zs (with U0 reduced by the Cmin factor 0.95 in the design check — see Sub2). The protective device sees this fault current, which has to be at or above the device magnetic-trip threshold to disconnect within the required time.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Protective earthing)"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system either individually, in groups, or collectively."
            meaning={
              <>
                Reg 411.3.1.1 is the rule that creates the cpc and ties it to the MET via the earthing arrangement. Without the cpc connection there is no earth fault loop — the fault current would not have a return path and the protective device would never see the fault. Reg 411.3.1.1 is therefore the regulation that makes the Zs framework physically possible. Every cpc on the installation must be continuous and connected back to the MET; every exposed conductive part on a final circuit must be connected to the cpc of that circuit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Regulation 411.3.1.1. See also Section 543 (cpc selection) and Reg 411.3.1.2 (protective bonding)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.2 (Protective equipotential bonding)"
            clause="In each installation main protective bonding conductors complying with Chapter 54 shall connect to the main earthing terminal extraneous-conductive-parts including the following: water installation pipes; gas installation pipes; other installation pipework and ducting; central heating and air conditioning systems; exposed metallic structural parts of the building; lightning protection systems."
            meaning={
              <>
                Reg 411.3.1.2 is the bonding rule. By tying every extraneous-conductive-part to the MET, the equipotential zone is created — every metal item in the equipotential zone sits at the same potential as the cpc and the MET. During a line-to-earth fault, the touch voltage between the faulted appliance metal and any other bonded metal is limited to the voltage drop across R2 only, not the full Ze + R1 + R2. This is what makes the Zs framework safe under the 5 s disconnection time for distribution circuits — the touch voltage during the window before disconnection is held to a safe value by the bonding.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Regulation 411.3.1.2. See also Chapter 54 (selection and erection of earthing arrangements and protective conductors) and Section 415 (additional protection)."
          />

          <SectionRule />

          <ContentEyebrow>What Ze, R1 and R2 actually are</ContentEyebrow>

          <ConceptBlock
            title="Ze — the supply external loop, set by the DNO"
            plainEnglish="The bit you do not own. Starts at your origin, goes back through the supply cable, through the transformer star earth and the supply path, and ends back at the supply line at your origin."
          >
            <p>
              Ze is the external earth fault loop impedance — the bit between the origin terminals of your installation and the rest of the supply network. You do not control Ze; the DNO does. Your role is to use the right value at design and to verify it at first inspection.
            </p>
            <p>
              <strong>Source for design:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DNO Form 1 declared figure</strong> — the contractually-binding number from the network operator, valid for design and for the EIC declaration. Use this when available.</li>
              <li><strong>BS 7671 assumed maximum</strong> — where no Form 1 exists, the IET GN3 / BS 7671 assumed maximum applies: 0.35 Ω for TN-C-S (PME), 0.80 Ω for TN-S, 21 Ω for TT (where Zs is dominated by the electrode RA, not the supply Ze).</li>
              <li><strong>Measured Ze from a previous EICR</strong> — informational only. Do not use measured Ze as the design figure: the network may have changed (DNO upgrade, switching, transformer replacement) since the measurement.</li>
            </ul>
            <p>
              On a TN-C-S supply the external loop runs through the combined PEN conductor (protective earth and neutral on the same conductor) of the supply cable. This gives a low Ze (typically 0.20-0.35 Ω in built-up areas). On a TN-S supply it runs through a separate earth conductor in or alongside the supply cable, which historically had higher impedance (typical 0.40-0.80 Ω). On TT it runs through the soil between your electrode and the supply transformer earth — high and unpredictable, which is why TT relies on RCD-based ADS rather than overcurrent ADS.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="R1 — the line conductor from origin to fault"
            plainEnglish="The full length of the line conductor from your CU all the way to the far end of the circuit. The further the route, the bigger R1."
          >
            <p>
              R1 is the resistance of the line conductor from the origin (consumer unit terminal) all the way out to the fault point on the final circuit. For a radial circuit the fault point is the furthest accessible end (the last socket, the last luminaire, the end of the run). For a ring final circuit the worst case is the mid-point of the ring (where the two paths around the ring are roughly equal length).
            </p>
            <p>
              R1 is calculated from:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Line conductor CSA</strong> — typically 1.0, 1.5, 2.5, 4, 6, 10, 16, 25 mm² for final circuits and small sub-mains. The OSG Table I1 publishes mΩ/m at 20 degrees C for each CSA.</li>
              <li><strong>Route length</strong> — the actual installed length of the line conductor, not the as-the-crow-flies distance. Allow for vertical runs, route deviations and connection tails.</li>
              <li><strong>Temperature correction</strong> — multiply the cold mΩ/m figure by 1.20 for 70-deg thermoplastic operating at 70 degrees C (or 1.28 for 90-deg thermosetting at 90 degrees C).</li>
            </ul>
            <p>
              For a 30 m run of 2.5 mm² T+E (line conductor mΩ/m at 20 degrees C from OSG Table I1 = 7.41 mΩ/m): R1 cold = 30 × 7.41 = 222.3 mΩ = 0.222 Ω; R1 at 70 degrees C = 0.222 × 1.20 = 0.267 Ω.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="R2 — the cpc from fault back to the MET"
            plainEnglish="The protective conductor of the same cable, from fault point all the way back to your earth bar. Often a smaller CSA than R1, so R2 is usually the bigger contributor."
          >
            <p>
              R2 is the resistance of the cpc from the fault point back to the MET. In a typical T+E cable the cpc is significantly smaller than the line conductor (1.5 mm² cpc with 2.5 mm² line; 1.5 mm² cpc with 4 mm² line; 2.5 mm² cpc with 6 mm² line; 4 mm² cpc with 10 mm² line under the standard T+E construction). Smaller CSA = higher mΩ/m = R2 dominates the (R1 + R2) sum.
            </p>
            <p>
              Same calculation method:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>cpc CSA from the cable construction (or from the standalone cpc spec if a separate earth is used).</li>
              <li>Route length — same length as R1 for a single cable; longer if the cpc takes a different route (rare).</li>
              <li>Temperature correction — 1.20 for 70-deg PVC operating at 70 degrees C.</li>
            </ul>
            <p>
              For the same 30 m run of 2.5 mm² T+E (cpc 1.5 mm², mΩ/m at 20 degrees C from OSG Table I1 = 12.10 mΩ/m): R2 cold = 30 × 12.10 = 363.0 mΩ = 0.363 Ω; R2 at 70 degrees C = 0.363 × 1.20 = 0.436 Ω.
            </p>
            <p>
              Summing the worked example: (R1 + R2) at 70 degrees C = 0.267 + 0.436 = 0.703 Ω. With Ze = 0.35 Ω, design Zs = 0.35 + 0.703 = 1.05 Ω. Compare against Table 41.3 max for the device fitted.
            </p>
          </ConceptBlock>

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

          <EarthingSystemDiagram />

          <SectionRule />

          <ContentEyebrow>Why temperature correction matters</ContentEyebrow>

          <ConceptBlock
            title="Cold (R1 + R2) is what you measure; hot (R1 + R2) is what trips the device"
            plainEnglish="Resistance rises with temperature. If the cable is hot when the fault hits, Zs is bigger than the cold reading. The design has to use the hot value."
            onSite="The OSG / GN1 mΩ/m tables are at 20 degrees C — easy to use and easy to verify against a cold-circuit measurement. The 1.20 multiplier (for 70-deg thermoplastic) is the standard correction to lift the cold value to the operating-temperature value for the design check."
          >
            <p>
              Copper resistivity rises about 0.4 percent per degree C of temperature increase. A cable operating at 70 degrees C is about 50 deg above the 20 degrees C reference temperature, so the resistance is about 50 × 0.4 percent = 20 percent higher. Hence the standard correction factor of 1.20 used by the IET OSG and GN1 for design Zs at 70 degrees C operating temperature.
            </p>
            <p>
              The design check has to use the hot value because the worst case is a fault that occurs when the cable is already at operating temperature (full load, normal service). Using the cold value would understate Zs by 20 percent — a circuit that is just inside the Table 41.3 max at 20 degrees C would be over the max at 70 degrees C, and the disconnection time would be longer than the regulation allows.
            </p>
            <p>
              The cold value still has a use — it is what an inspector measures with a low-current loop tester at first inspection. The IET GN3 80-percent rule (covered in Sub3) bridges the gap: the measured cold Zs should be at most 80 percent of the Table 41.3 max for the device, leaving the 20 percent headroom for the temperature rise. The design Zs at 70 degrees C against the full Table 41.3 max, and the measured Zs at 20 degrees C against 80 percent of that max, are the two complementary checks.
            </p>
            <p>
              <strong>Temperature factors by cable type (IET OSG Appendix B summary):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>70-deg thermoplastic (PVC) operating at 70 degrees C:</strong> factor 1.20.</li>
              <li><strong>90-deg thermosetting (XLPE / EPR) operating at 90 degrees C:</strong> factor 1.28.</li>
              <li><strong>Mineral insulated (MI) at 70 degrees C sheath:</strong> factor 1.20.</li>
              <li><strong>Bare cpc (e.g. earthing conductor only) where ambient temperature applies, not operating:</strong> use 20 degrees C value with a small ambient-only correction if installed in a hot environment.</li>
            </ul>
            <p>
              Always cite the factor used on the design pack with the source (OSG Appendix B / GN1 reference table). Do not invent factors.
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

          <ContentEyebrow>How the Zs check ties to the disconnection-time regulation</ContentEyebrow>

          <ConceptBlock
            title="Zs is the gate — Reg 411.3.2.2 sets the time, Reg 411.4.5 sets the formula"
            plainEnglish="The protective device must trip in 0.4 s on a final circuit (TN, up to 32 A) or 5 s on a distribution circuit. The Zs check guarantees that by ensuring the fault current is high enough to put the trip in the magnetic region of the device curve."
          >
            <p>
              BS 7671 sets two related requirements that work together:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reg 411.3.2.2 — Maximum disconnection times.</strong> On TN systems the protective device must clear a line-to-earth fault within the times in Table 41.1: 0.4 s for final circuits up to and including 32 A; 5.0 s for distribution circuits and final circuits exceeding 32 A.</li>
              <li><strong>Reg 411.4.5 — Zs satisfaction.</strong> The earth fault loop impedance Zs at every point of utilisation shall satisfy Zs × Ia ≤ U0 × Cmin, where Ia is the current that causes automatic operation in the time specified by Reg 411.3.2.2 and Cmin is 0.95.</li>
            </ul>
            <p>
              Reg 411.3.2.2 says how fast you must trip. Reg 411.4.5 turns that into a Zs limit by working backwards from Ia (the current required to trip in that time, taken from the device characteristic — typically the magnetic threshold for an MCB) and the supply voltage U0 with the Cmin factor applied. Table 41.3 pre-computes the Zs limits for common BS EN 60898 MCBs and BS EN 60947-2 MCCBs so you do not have to re-derive them for every circuit.
            </p>
            <p>
              The chain of reasoning is therefore:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Choose protective device (rating, type, manufacturer / standard).</li>
              <li>Look up the magnetic trip threshold Ia from the device characteristic (5 × In for Type B; 10 × In for Type C; 20 × In for Type D).</li>
              <li>Apply Reg 411.4.5: max Zs = (U0 × Cmin) / Ia. Or look it up directly in Table 41.3.</li>
              <li>Calculate design Zs = Ze + (R1 + R2) at 70 degrees C operating temperature.</li>
              <li>Confirm design Zs ≤ Table 41.3 max. If not, redesign (larger cpc, shorter route, lower-rated device, change device type from C to B, or fit a 30 mA RCD as an alternative path under Reg 411.4.204).</li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Chapter 41 ADS framework (Regs 411.3.2.2, 411.4 and Table 41.3, with the A4:2026 explicit Cmin = 0.95)"
            clause="The Chapter 41 ADS verification expresses the relationship between fault loop impedance, device operating characteristic and supply voltage as: Zs × Ia ≤ U0 × Cmin, where Zs is the impedance in ohms of the fault loop, Ia is the current in amperes causing automatic operation of the disconnecting device within the time specified in Regulation 411.3.2.2, U0 is the nominal AC RMS line voltage to earth in volts (230 V on UK LV supplies), and Cmin is the voltage factor (0.95 in A4:2026) that accounts for ESQCR-permitted supply voltage variation. Table 41.3 publishes this relationship pre-solved as maximum Zs values for the common BS EN 60898 MCBs and BS EN 61009 RCBOs."
            meaning={
              <>
                This is the single most important relationship in the whole module. It binds Zs
                (which the design controls) to Ia (which the device choice controls) to
                U0 × Cmin (which the supply gives — 230 × 0.95 = 218.5 V). Rearranged:
                Zs ≤ (U0 × Cmin) / Ia. The Table 41.3 maximum Zs values are this equation
                pre-solved for common devices. A4:2026 made Cmin explicit at 0.95 — and that
                is what dropped the B32 maximum Zs from 1.44 Ω (pre-A4) to 1.37 Ω (A4:2026).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 41 — Regulations 411.3.2.2, 411.4 and Table 41.3."
          />

          <AppendixTable
            caption="Maximum earth fault loop impedance Zs — BS EN 60898 Type B circuit-breakers (U₀ = 230 V, Cmin = 0.95)"
            source="BS 7671:2018+A4:2026 — Table 41.3 (extract). Always cross-check against the current published table before use on a design pack."
            headers={['Device rating (A)', 'Max Zs (Ω)']}
            rows={[
              ['B6', '7.28'],
              ['B10', '4.37'],
              ['B16', '2.73'],
              ['B20', '2.19'],
              ['B25', '1.75'],
              ['B32', '1.37'],
              ['B40', '1.09'],
              ['B50', '0.87'],
              ['B63', '0.69'],
            ]}
            notes={
              <>
                These are the A4:2026 values, which incorporate Cmin = 0.95 explicitly.
                Pre-A4 lookup apps and old design packs may show 1.44 Ω for B32 (no Cmin) —
                that value is no longer valid for an A4:2026 design. Type C and Type D values
                are also tighter under A4:2026 (C32 max Zs = 0.68 Ω; D32 max Zs = 0.34 Ω).
                Tables 41.2 / 41.4 of BS 7671 cover fuses and other device types respectively.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How Cmin reshaped Table 41.3 in A4:2026</ContentEyebrow>

          <ConceptBlock
            title="Cmin = 0.95 — the supply-tolerance safety factor that tightened every Zs limit"
            plainEnglish="A4:2026 made the Cmin voltage minimum factor explicit at 0.95 in Reg 411.4.5. Pre-A4:2026 designs treated U0 as the full 230 V; A4:2026 designs treat the design voltage as 230 × 0.95 = 218.5 V. The Table 41.3 maximum Zs values were recalculated to incorporate Cmin, dropping each value by about 5%. Older Zs lookup apps and older design packs that did not apply Cmin are now out of date — confirm your tools are on the A4:2026 edition."
            onSite="The Cmin factor accounts for the fact that during a fault the voltage at the load is lower than the declared 230 V. UK supply tolerance is +10 / -6% (216 to 253 V) and the heavy fault itself drops voltage further across the source impedance. Designing at 230 V × 0.95 builds in headroom for the worst-case real voltage. Practical effect: a borderline B32 design that sat at 1.37 Ω under the old method now needs to sit at 1.37 Ω with margin under A4:2026 — usually achieved by a slightly larger cable, a shorter route, or a dedicated 30 mA RCBO that uses the Reg 411.4.204 alternative path."
          >
            <p>
              Where Cmin matters in your A4:2026 design check:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design Zs equation</strong> — Zs × Ia ≤ U0 × Cmin, with Cmin = 0.95.
                Effective design U0 is 218.5 V, not 230 V. Tighter ceiling on Zs.
              </li>
              <li>
                <strong>Table 41.3 B32 max</strong> — 1.37 Ω in A4:2026, applies for Type
                B BS EN 60898 MCB / RCBO at 32 A on TN. Cite the table and the edition on
                the design pack.
              </li>
              <li>
                <strong>Type C and D values tighter</strong> — C32 max = 0.68 Ω; D32 max =
                0.34 Ω. Higher-curve devices have less Zs headroom because their magnetic
                trip threshold is higher.
              </li>
              <li>
                <strong>Reg 411.4.204 alternative</strong> — fitting a 30 mA RCBO on the
                final circuit shifts the disconnection time to 0.04 s at 1×IΔn (per the
                A4:2026 redraft of Reg 643.7), which is well inside the Table 41.1 0.4 s
                requirement and gives the design room when the cable run pushes Zs close
                to the Table 41.3 ceiling.
              </li>
              <li>
                <strong>Tool check</strong> — your Zs lookup app, design spreadsheet or
                calculation software needs to be on the A4:2026 edition. Older tooling
                that does not apply Cmin gives optimistic answers — borderline designs
                that 'passed' with the old tool will fail with the new.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>From design Zs to the verification audit trail</ContentEyebrow>

          <ConceptBlock
            title="What goes on the design pack and why every line is traceable"
            plainEnglish="The design Zs calculation must be traceable line by line. Future inspectors and any auditor need to read the design pack and confirm that every Zs figure was derived from a defensible source — DNO Form 1 for Ze, OSG / GN1 for cable mΩ/m, the right temperature factor, the A4:2026 Table 41.3 limit. A Zs entry that just shows a final number with no derivation is a paper-exercise design that will not survive scrutiny."
            onSite="Practical L3 discipline: every Zs row on the design pack records seven pieces of information. The discipline takes a few seconds per circuit and protects your professional record. On a small domestic job the Zs calc fits in a spreadsheet; on a commercial fit-out it lives in the design package alongside the SLD, cable schedule and load schedule."
          >
            <p>
              The seven traceability items per Zs row:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ze source</strong> — DNO Form 1 declared figure with date and
                reference, OR BS 7671 assumed maximum (0.35 Ω TN-C-S; 0.80 Ω TN-S; 21 Ω
                TT) with citation to BS 7671 / IET GN3.
              </li>
              <li>
                <strong>Cable type and CSA</strong> — line and CPC sizes (e.g. 6 mm²
                line / 2.5 mm² cpc), insulation type (70-deg PVC or 90-deg thermosetting),
                manufacturer where the OSG figure does not apply.
              </li>
              <li>
                <strong>Route length</strong> — measured installed length, not as-the-crow
                distance. Allow for vertical drops, route deviations, connection tails.
              </li>
              <li>
                <strong>OSG / GN1 mΩ/m citation</strong> — Table I1 reference, line and
                cpc cold values at 20 °C. The published source is the contractually
                binding figure.
              </li>
              <li>
                <strong>Temperature factor</strong> — 1.20 for 70-deg PVC at 70 °C
                operating; 1.28 for 90-deg thermosetting at 90 °C. Cited from OSG
                Appendix B or GN1.
              </li>
              <li>
                <strong>Resulting Zs</strong> — Ze + (R1 + R2) at operating temperature.
                Single number to two or three decimal places.
              </li>
              <li>
                <strong>Table 41.3 max plus margin</strong> — A4:2026 maximum Zs for the
                fitted device, with the calculated headroom. Headroom under 10% should
                trigger a design review (cable, device or route change).
              </li>
            </ul>
            <p>
              At first inspection the verification side mirrors the design: measured Ze
              compared against the assumed value, measured Zs at each circuit end compared
              against the Table 41.3 max with the GN3 80% rule (since measurements are at
              cold cable temperature). The two checks together prove the install satisfies
              Reg 411.3.2.2 disconnection times throughout the working life of the
              installation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example — TN-C-S domestic EV charger circuit</ContentEyebrow>

          <Scenario
            title="Domestic EV charger — 32 A B-curve RCBO on a 25 m radial in 6 mm² T+E"
            situation={
              <>
                A new EV charger circuit on a 1980s semi with a TN-C-S (PME) supply. Existing 100 A BS 1361 service fuse, 25 mm² tails to a new dual-RCD CU. The EV charger is OZEV-compliant, fitted in the front porch. Run is 25 m of 6 mm² T+E (with 2.5 mm² cpc) from the CU through the loft and down the porch wall. Protected by a 32 A Type B RCBO (BS EN 61009). DNO Form 1 declares Ze = 0.20 Ω.
              </>
            }
            whatToDo={
              <>
                Step 1 — Source the inputs. Ze from Form 1 = 0.20 Ω. Cable: 6 mm² line conductor, 2.5 mm² cpc (standard T+E construction). OSG Table I1 mΩ/m at 20 degrees C: 6 mm² line = 3.08 mΩ/m; 2.5 mm² cpc = 7.41 mΩ/m. Loop = 3.08 + 7.41 = 10.49 mΩ/m at 20 degrees C. Route length = 25 m. Cable type 70-deg thermoplastic, operating at 70 degrees C → temperature factor 1.20.\n\nStep 2 — Calculate (R1 + R2). Cold value: 25 × 10.49 = 262.25 mΩ = 0.262 Ω. At 70 degrees C: 0.262 × 1.20 = 0.315 Ω.\n\nStep 3 — Calculate design Zs. Zs = Ze + (R1 + R2) = 0.20 + 0.315 = 0.515 Ω.\n\nStep 4 — Compare against Table 41.3. For 32 A Type B BS EN 61009 RCBO at U0 = 230 V Cmin 0.95: max Zs = 1.37 Ω. Design Zs 0.515 Ω is well within the limit. Margin = 1.37 - 0.515 = 0.86 Ω of headroom.\n\nStep 5 — Sanity check the disconnection time. Ia for a Type B RCBO = 5 × In = 5 × 32 = 160 A. Prospective fault current Ipf = U0 × Cmin / Zs = 230 × 0.95 / 0.515 = 424 A. 424 A is well above the 160 A magnetic threshold — disconnection is in the steep magnetic region of the curve, well under 100 ms — comfortably within the 0.4 s required by Table 41.1 for a final circuit ≤ 32 A on TN.\n\nStep 6 — Document on the design pack. Record Ze source (Form 1, value, date), cable spec, route length, OSG citation, temperature factor, resulting Zs, Table 41.3 limit applied, margin. Add a verification note: measured Zs at first inspection should be ≤ 0.8 × 1.37 = 1.10 Ω at ambient (cold) cable temperature.
              </>
            }
            whyItMatters={
              <>
                The design check confirms ADS works under fault before any cable is pulled. The 0.86 Ω of headroom means the design is robust against route-length error during install (even if the actual run comes in at 35 m instead of 25 m the design still passes), and against the future addition of one further EV charger off the same supply (which would increase Ze loading slightly during simultaneous fault). The discipline of recording Ze source, mΩ/m citation, temperature factor and the Table 41.3 limit in writing is what turns the calc from a paper exercise into a defensible design that survives EICR audit ten years from now. EV charger circuits in particular are scrutinised because they are high-current, high-utilisation circuits often added retrofit to an existing CU without the original designer realising the supply has been progressively loaded.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Using cold (R1 + R2) for the design Zs check"
            whatHappens={
              <>
                A designer reads OSG Table I1 mΩ/m, multiplies by route length, adds Ze, and compares against the Table 41.3 max — but forgets to apply the 1.20 temperature factor. The cold Zs comes in at 1.30 Ω against a 1.37 Ω limit, looks like a pass with margin. Hot Zs is actually 1.30 + 0.20 × 0.95 = 1.45 Ω (after temperature correction roughly applied to the (R1 + R2) portion only) — over the limit. The design is invalid. At first inspection the loop tester reads 1.30 Ω cold and the inspector ticks it off as compliant. Two years later, full load + ambient summer + a fault at the far end gives a slow trip and a damaged cable insulation. The investigation traces back to a missing temperature correction on the original design.
              </>
            }
            doInstead={
              <>
                Always apply the 1.20 temperature correction (or 1.28 for 90-deg thermosetting) to (R1 + R2) before adding Ze and comparing against Table 41.3. On the design pack, show the calc explicitly: cold (R1 + R2) from OSG Table I1, × 1.20 for 70 degrees C operating temperature, + Ze = design Zs. The discipline takes 30 seconds; the protection it gives to your professional record is permanent. Use a Zs spreadsheet or a competent-engineer Zs lookup app that incorporates the factor automatically — but verify the app is on the A4:2026 edition with Cmin 0.95.
              </>
            }
          />

          <CommonMistake
            title="Using a measured Ze from the previous EICR as the design Ze"
            whatHappens={
              <>
                The designer pulls Ze = 0.18 Ω off the previous EICR test sheet from 18 months ago and uses it for the new EV charger design. The DNO Form 1 actually declares Ze = 0.35 Ω (the assumed maximum for TN-C-S). Three months after install the DNO does an upgrade in the street; the new transformer raises the actual Ze to 0.32 Ω. The design Zs (which used the old measured 0.18) is still under the limit but only just; the new operating Zs is over the limit. Disconnection times are now non-compliant and the next EICR picks it up — at that point the customer is told the EV charger they spent £1200 on is on a non-compliant circuit and needs the cpc upsized or the run shortened. Avoidable.
              </>
            }
            doInstead={
              <>
                Use the DNO Form 1 declared Ze for design — it is the contractually-binding value and it remains valid even when the network changes. Where no Form 1 exists, use the BS 7671 assumed maximum (0.35 Ω TN-C-S; 0.80 Ω TN-S; or 21 Ω TT with the appropriate RCD compliance). Measured Ze at first inspection is your verification that the supply still meets the assumption — if measured exceeds the assumed maximum, that is a DNO issue (raise it with them); not a design issue. Document the source on the design pack so the EIC audit trail is intact.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Zs = Ze + (R1 + R2) is the single equation that gates every ADS decision. Ze is the supply external loop; R1 is the line conductor from origin to fault; R2 is the cpc from fault back to MET.",
              "Reg 411.3.1.1 makes the Zs framework physically possible (cpc connected back to MET); Reg 411.3.1.2 makes it safe under the disconnection time window (equipotential bonding limits touch voltage).",
              "Reg 411.3.2.2 sets the disconnection times — 0.4 s for final circuits ≤ 32 A on TN; 5 s for distribution circuits and final circuits &gt; 32 A.",
              "Reg 411.4.5 sets the Zs equation: Zs × Ia ≤ U0 × Cmin where Cmin = 0.95 in A4:2026. Table 41.3 is the pre-solved lookup for common BS EN 60898 MCBs.",
              "Design uses the DNO declared Ze (Form 1) or the BS 7671 assumed maximum (0.35 Ω TN-C-S; 0.80 Ω TN-S). Measured Ze is for verification, not design.",
              "(R1 + R2) at 70 degrees C operating temperature uses OSG Table I1 cold values × 1.20 (or × 1.28 for 90-deg thermosetting). Cold (R1 + R2) understates Zs by 20 percent — never use cold value on the design pack.",
              "A4:2026 changed Table 41.3 to incorporate Cmin 0.95 — for example B32 max Zs is now 1.37 Ω (was 1.44 Ω pre-A4). Confirm your Zs lookup app is on the A4:2026 edition.",
              "Document Ze source, cable type and CSA, route length, OSG mΩ/m citation, temperature factor and resulting Zs on every circuit in the design pack — without the trace the design is unverifiable.",
            ]}
          />

          <Quiz title="Earth fault loop impedance — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section landing
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 5 — EFLI &amp; Zs design
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Calculating Zs at design stage
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
