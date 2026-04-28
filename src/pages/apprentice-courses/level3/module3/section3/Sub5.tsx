/**
 * Module 3 · Section 3 · Subsection 5 — Neutral current, balancing and harmonics (AC 2.7)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.7
 *   AC 2.7 — "determine the neutral current in a three-phase and neutral supply and why systems should be balanced"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 7.5, 7.7
 *
 * Why balancing matters, how to calculate neutral current vectorially, and why
 * triplen harmonics from non-linear loads add (not cancel) in the neutral.
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
  'Neutral current, balancing and harmonics | Level 3 Module 3.3.5 (AC 2.7) | Elec-Mate';
const DESCRIPTION =
  'Vector sum of unbalanced phase currents = neutral current. Triplen harmonics add in the neutral. Why heavy LED/VFD installs need oversized neutrals.';

const checks = [
  {
    id: 'l3-m3-3-5-balanced',
    question: 'Three balanced single-phase loads (each 30 A, pf 1.0) on a 3-phase + N supply. Neutral current is:',
    options: ['10 A', '30 A', '52 A', '0 A'],
    correctIndex: 3,
    explanation:
      'Balanced loads = three currents 120° apart = vector sum exactly zero. The neutral carries no current.',
  },
  {
    id: 'l3-m3-3-5-imbalance',
    question:
      'L1 = 30 A, L2 = 0 A, L3 = 0 A (single-phase load on L1 only). Neutral current is:',
    options: ['0 A', '10 A', '30 A', '52 A'],
    correctIndex: 2,
    explanation:
      'With only L1 loaded, all the return current must flow through the neutral. I_N = I_L1 = 30 A.',
  },
  {
    id: 'l3-m3-3-5-triplen',
    question:
      'Three balanced 30 A loads, each with 30 % third-harmonic content. Approximate neutral current is:',
    options: ['0 A', '9 A', '27 A', '90 A'],
    correctIndex: 2,
    explanation:
      'Fundamentals balance to zero. But 3rd harmonics on each phase are IN PHASE in the neutral — they add. 3 × (30 × 0.3) = 27 A of triplen current in the neutral, even though the load is "balanced" at the fundamental.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Three perfectly balanced phase currents 120° apart sum to:',
    options: ['I × 3', 'I × √3', 'Zero', 'I'],
    correctAnswer: 2,
    explanation: 'Vector sum of three equal magnitudes 120° apart = zero. That\'s why balanced loads need no neutral.',
  },
  {
    id: 2,
    question: 'For a 3-phase 4-wire supply, the neutral conductor must be sized for:',
    options: [
      'Half the line current',
      'Full line current at minimum (and oversized for harmonic-rich loads)',
      'No current — it never carries any',
      'Twice the line current',
    ],
    correctAnswer: 1,
    explanation:
      'The neutral might carry full line current under fault or extreme imbalance, plus triplen harmonics that add. BS 7671 §523 may require neutral upsizing where 3rd harmonic content &gt; 15 %.',
  },
  {
    id: 3,
    question: 'Triplen harmonics (3rd, 9th, 15th, …) in a 3-phase neutral:',
    options: [
      'Cancel out',
      'Sum to three times the per-phase value',
      'Reduce by √3',
      'Cause negative current',
    ],
    correctAnswer: 1,
    explanation:
      'All three phases produce the same triplen harmonic in phase with each other (because 3 × 120° = 360° = full cycle). They add directly in the neutral.',
  },
  {
    id: 4,
    question:
      'Most non-linear single-phase loads (LED, computer PSU, EV charger) draw harmonics dominated by:',
    options: ['Even harmonics (2, 4, 6)', 'Triplens (3, 9, 15)', '5th and 7th only', 'No harmonics'],
    correctAnswer: 1,
    explanation:
      'Single-phase rectifier loads draw mostly 3rd, 5th and 7th. Triplens dominate at lower kVA loads. Hence neutrals on LED-heavy lighting installs run hot.',
  },
  {
    id: 5,
    question: 'A 3-phase RCD operates by detecting:',
    options: [
      'Overcurrent on one phase',
      'Imbalance between line currents and neutral (sum ≠ 0 = leakage to earth)',
      'Voltage drop',
      'Frequency variation',
    ],
    correctAnswer: 1,
    explanation:
      'RCD adds the vector sum of all live conductors (3 lines + neutral). On healthy circuit, sum = 0. Any imbalance = leakage to earth = trip when above I_Δn.',
  },
  {
    id: 6,
    question:
      'A site has L1 = 50 A, L2 = 30 A, L3 = 50 A (single-phase loads, in phase). Neutral current (approximated as scalar imbalance):',
    options: ['0 A', '10 A', '20 A', '50 A'],
    correctAnswer: 2,
    explanation:
      'Vector sum of three currents 120° apart with magnitudes 50, 30, 50: I_N = √(50² + 30² + 50² − 50×30 − 30×50 − 50×50) = √(2500 + 900 + 2500 − 1500 − 1500 − 2500) = √400 = 20 A.',
  },
  {
    id: 7,
    question:
      'Why is balancing 3-phase loads important?',
    options: [
      'Looks neat',
      'Reduces neutral current; minimises losses; allows full transformer use',
      'Required by BS 7671 explicitly',
      'Reduces voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Balancing minimises the wasted current in the neutral and unloads the supply transformer evenly. Each phase can be loaded to capacity instead of one being saturated.',
  },
  {
    id: 8,
    question:
      'On a heavily LED-loaded retail install, BS 7671 §523 may require:',
    options: [
      'No special action',
      'Upsizing the neutral conductor relative to the lines',
      'Removing the neutral',
      'Extra phase conductor',
    ],
    correctAnswer: 1,
    explanation:
      'When 3rd harmonic content &gt; 15 % of fundamental, BS 7671 requires factoring the neutral as a current-carrying conductor in cable sizing. Practically: neutral CSA ≥ line CSA; sometimes 1.5× for very harmonic-rich loads.',
  },
];

const faqs = [
  {
    question: "What's a triplen harmonic and why does it act differently?",
    answer:
      "Triplens are the 3rd, 9th, 15th — odd multiples of 3. Because each phase's triplen is 3 × 120° = 360° = same as 0°, all three triplens are IN PHASE with each other. They don't cancel in the neutral; they add. Other harmonics (5th, 7th, 11th, 13th) DO cancel because they remain 120° apart.",
  },
  {
    question: 'How do I measure triplen content in practice?',
    answer:
      "A power-quality analyser shows harmonic spectrum and individual harmonic %. Look at the THD (Total Harmonic Distortion) figure plus the 3rd harmonic %. THD up to 5 % is normal. THD &gt; 8 % or 3rd &gt; 15 % is when you start needing neutral upsizing or active filtering.",
  },
  {
    question: 'Why does a server room need a 200 % neutral?',
    answer:
      "Server PSUs are full of single-phase rectifier loads with significant 3rd harmonic. Three balanced racks at 50 A each can drive a neutral current of 100+ A (twice each phase). Hence data centres specify oversized neutral busbars and cabling — 200 % neutral CSA is common.",
  },
  {
    question: 'How do I balance a 3-phase install in practice?',
    answer:
      "List every single-phase final circuit and its expected current. Distribute them across L1, L2, L3 so each line carries roughly the same total. Use a clamp meter on each line at the DB to verify after commissioning. Re-balance if any one is consistently &gt;10% above average.",
  },
  {
    question: 'Will a 3-phase RCD trip on harmonic neutral current?',
    answer:
      "No — the RCD measures the SUM of all four conductors. Triplen harmonics in the neutral are matched by triplens in the lines (out and back paths), so the sum stays zero. RCDs only see ACTUAL leakage to earth, not internal imbalance.",
  },
  {
    question: 'What standard covers harmonic limits for equipment?',
    answer:
      "BS EN 61000-3-2 (single-phase ≤ 16 A) and BS EN 61000-3-12 (3-phase ≤ 75 A). Equipment manufacturers must limit emissions per harmonic to fixed values. Modern LED drivers and switching PSUs include active PFC at the device level partly to comply.",
  },
];

export default function Sub5() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 5"
            title="Neutral current, balancing and harmonics"
            description="Why a balanced 3-phase load needs no neutral — and why a balanced LED-heavy install does. Triplen harmonics that add instead of cancelling."
            tone="yellow"
          />

          <TLDR
            points={[
              'Balanced 3-phase loads (equal magnitude, 120° apart) → vector sum = zero → no neutral current.',
              'Imbalance creates neutral current = vector sum of unequal phase currents.',
              'Triplen harmonics (3rd, 9th, 15th) are in phase across all three lines → ADD in the neutral.',
              'On heavily non-linear loads (LED, IT, EV charging), neutral can carry > line current.',
              'BS 7671 §523 may require oversized neutral when 3rd harmonic &gt; 15 % of fundamental.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate the neutral current in a 3-phase 4-wire supply with unbalanced single-phase loads.',
              'Explain why balanced fundamental currents cancel but triplen harmonics add in the neutral.',
              'Decide when a neutral conductor needs upsizing on harmonic-rich installations.',
              'Distribute single-phase loads across L1, L2 and L3 to minimise imbalance.',
              'Cite BS 7671 and BS EN harmonic-related requirements.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why balancing matters</ContentEyebrow>

          <ConceptBlock
            title="Three reasons to keep the loads balanced"
            plainEnglish="(1) Uses the supply transformer evenly — each phase delivers its share. (2) Minimises neutral current — less loss, less heating. (3) Reduces voltage imbalance, which 3-phase motors hate."
            onSite="Walk into a small commercial install and clamp each line at the DB. If one phase is at 60 A and the others at 20 A, the install is unbalanced. Move circuits between phases at the next visit so each line carries roughly equal load."
          >
            <p>
              The neutral conductor on a 4-wire star supply only carries the IMBALANCE between
              phases. Balanced load = no neutral current. Maximum imbalance (one phase fully
              loaded, others empty) = neutral current equals the loaded phase current.
            </p>
            <p>
              The maths: I_N is the vector sum of the three line currents. For pf-1 loads with
              magnitudes I_1, I_2, I_3 phase 120° apart:
            </p>
            <p>
              <strong>I_N = √(I_1² + I_2² + I_3² − I_1×I_2 − I_2×I_3 − I_3×I_1)</strong>
            </p>
            <p>
              This simplifies to 0 when all three are equal.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Triplen harmonics — the trap</ContentEyebrow>

          <ConceptBlock
            title="Why 3rd harmonics ADD instead of cancelling"
            plainEnglish="The three phase fundamentals are 120° apart. The 3rd harmonic of each phase shifts by 3 × 120° = 360° = ZERO. So all three 3rd harmonics are IN PHASE with each other in the neutral. They add directly instead of cancelling."
            onSite="In an office with 200 fluorescent fittings (or 200 LED panels), each draws ~30 % third harmonic. Line current 20 A per phase, but neutral carries 3 × (20 × 0.3) = 18 A of triplen current ON TOP of any imbalance. Neutral runs as hot as the lines."
          >
            <p>The same pattern for higher-order triplens:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3rd: 3 × 120° = 360° → in phase → adds.</li>
              <li>5th: 5 × 120° = 600° = 240° → STILL 120° apart → cancels.</li>
              <li>7th: 7 × 120° = 840° = 120° → 120° apart → cancels.</li>
              <li>9th: 9 × 120° = 1080° = 0° → in phase → adds.</li>
              <li>11th: cancels. 13th: cancels. 15th: adds. And so on.</li>
            </ul>
            <p>
              Triplens are the family of 3rd, 9th, 15th, 21st… all add in the neutral. Hence the
              concern over neutral current in modern installs full of single-phase non-linear
              loads.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 523.6.3 (Neutral conductors)"
            clause="Where the third harmonic content of the line currents is greater than 15 %, the neutral conductor shall not be smaller than the line conductors. Where it is between 15 % and 33 %, the neutral conductor must be sized for the equivalent line current. Above 33 %, the neutral conductor shall be considered to carry the same current as the line conductors and may need to be larger than the lines."
            meaning={
              <>
                A4:2026 retains the harmonic-derating treatment. For modern installs (LED panels,
                computer rooms, EV charger banks) the 15 % triggers a derate, and 33 % means the
                neutral CSA effectively becomes the limiting factor for cable sizing — sometimes
                you size up by one CSA from the line.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 523.6.3 and Appendix 4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 523.6.201 (Tabulated CCC and harmonics)"
            clause="The tabulated current-carrying capacities in Appendix 4 are based on the fundamental frequency only and do not take account of the effect of harmonics."
            meaning={
              <>
                Triplen harmonics (3rd, 9th, 15th) add in the neutral instead of cancelling — a
                "balanced" three-phase load made up of single-phase LED drivers can drive
                neutral RMS currents 1.5–1.7× the line currents. The Appendix 4 column gives you
                the fundamental-only capacity; on harmonic-rich installs apply Appendix 4 §C
                factors before comparing against the protective device rating.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 523.6.201; Appendix 4 §C."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 444.4.1 (Cable separation in three dimensions)"
            clause="The minimum separation between the information technology cables and mains power cables includes all allowances for cable movement between their fixing points or other restraints. The minimum separation requirement applies in three dimensions."
            meaning={
              <>
                Harmonic-rich power cables radiate magnetic fields at multiples of 50 Hz that
                couple straight into nearby data cabling. Reg 444.4.1 mandates a true 3-D
                separation — same tray, parallel runs and adjacent risers all count. On
                three-phase plant feeders carrying VFD output you may need 200 mm separation or
                full screened containment to keep BMS, fire-alarm and Ethernet quiet.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 444.4.1."
          />

          <SectionRule />

          <CommonMistake
            title="Sizing the neutral the same as the lines on a heavily-LED retrofit"
            whatHappens={
              <>
                Office retrofit: 4 mm² 4-core SWA serving 3-phase + N to a sub-DB. Old fluorescent
                replaced with 200 LED panels, each at ~30 % 3rd harmonic. Line currents balanced
                at 22 A. Neutral now carries 3 × (22 × 0.3) ≈ 20 A of triplens AND any imbalance.
                Smell of burning insulation in the riser six months later.
              </>
            }
            doInstead={
              <>
                For LED-heavy installs, derate the cable per Appendix 4 grouping factor for
                harmonic loading or upsize the neutral. Common practice: 6 mm² lines, 10 mm²
                neutral; or use a 5-core cable with the spare core paralleled with the neutral.
                Better: install at install — much harder to retrofit later.
              </>
            }
          />

          <Scenario
            title="Sizing the neutral for a server room"
            situation={
              <>
                Data hall: 50 server cabinets, each drawing 8 kW single-phase (32 A line). Loaded
                roughly evenly across L1 (17), L2 (16), L3 (17). Server PSUs draw 35 % third
                harmonic. What is the neutral current and how should the supply cable be sized?
              </>
            }
            whatToDo={
              <>
                Per phase line current at fundamental: ~ 32 × 17 = 544 A on each line.
                <br />
                Imbalance neutral (vector calc): one cab difference, around 32 A only.
                <br />
                Triplen neutral: 3 × (544 × 0.35) = 3 × 190 = 571 A in the neutral.
                <br />
                Total neutral RMS ≈ √(32² + 571²) ≈ 572 A — slightly bigger than each line!
                <br />
                Cable: line conductor sized for 544 A. Neutral sized for 572 A — practically the
                same CSA (one standard size up). Most data centre busbar runs use 200 %
                neutral as a safety margin.
              </>
            }
            whyItMatters={
              <>
                On harmonic-rich loads the neutral CAN carry more than each line. A
                "balanced" install at the fundamental can still have a hot neutral. Sizing rules
                in BS 7671 §523 exist precisely because of this — and ignoring them ends in
                fires.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — neutral current on real installs</ContentEyebrow>

          <ConceptBlock
            title="The vector imbalance formula explained step by step"
            plainEnglish="When phase currents are not equal but are still 120° apart at the fundamental, the neutral carries their vector sum. The formula is built from the cosine rule applied to the phasor diagram of three vectors of unequal length."
            onSite="Memorise the simplified scalar formula for unity-pf single-phase loads on a 3-phase + N install: I_N = √(I_1² + I_2² + I_3² − I_1·I_2 − I_2·I_3 − I_3·I_1). Plug in clamp readings and you get the expected neutral current. If your clamp on the neutral reads MORE than the formula predicts, you have either harmonics in the load or you have not got pf 1.0 on every circuit."
          >
            <p>Worked example — three-phase office DB, mixed single-phase loads:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1 = 40 A, L2 = 25 A, L3 = 35 A.</li>
              <li>I_N = √(40² + 25² + 35² − 40·25 − 25·35 − 35·40)</li>
              <li>= √(1600 + 625 + 1225 − 1000 − 875 − 1400)</li>
              <li>= √(3450 − 3275) = √175 = 13.2 A.</li>
              <li>Neutral clamp on healthy install should read ~13 A. If it reads 25+ A, suspect harmonic content or pf variation.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reading harmonic content on a clamp meter"
            plainEnglish="A modern true-RMS clamp meter (Fluke 374 FC, Megger DCM340, etc.) shows you both the RMS current AND the THD% if you have a harmonics-capable model. The simpler check: compare RMS reading vs the displayed fundamental — the gap is the harmonic content."
            onSite="On a quick survey, set the clamp to RMS and note the reading. Then set to 'fundamental only' (50 Hz filter) — most TRMS clamps offer this. The difference between the two readings is harmonic content. RMS 32 A, fundamental 27 A → THD ≈ √((32/27)² − 1) × 100 ≈ 53 % — heavily distorted; suspect rectifier loads, expect hot neutral."
          >
            <p>What to do with what you find:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>THD &lt; 5 %</strong> → no special action; standard cable sizing.</li>
              <li><strong>THD 5-15 %</strong> → flag in test sheet; recommend PQ logger if cable runs hot.</li>
              <li><strong>THD 15-33 %</strong> → BS 7671 §523.6.3 derate triggers; specify neutral ≥ line.</li>
              <li><strong>THD &gt; 33 %</strong> → neutral becomes limiting factor; consider 200 % neutral, derate cable, or fit harmonic filter.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Lost-neutral fault — why a broken neutral is dangerous"
            plainEnglish="If the neutral conductor breaks on a 3-phase + N install with single-phase loads, the loads on each phase end up in series across L1-L2-L3 instead of L1-N-N-L2 etc. Voltages on the more-lightly-loaded phases can rise from 230 V to nearly 400 V. Equipment fries."
            onSite="Classic symptom of lost neutral on a small commercial install: customer reports 'half the lights blew at once', some sockets dead, others delivering odd voltages, computer PSUs popping. Test L-N voltages on each phase; if any reads &gt; 270 V or wildly unequal, you have lost neutral somewhere upstream. Switch off main switch immediately — every minute means more damage."
          >
            <p>
              How to find a lost neutral systematically:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switch off main isolator. Identify any obvious damage at the cut-out, MET or main switch.</li>
              <li>Test continuity from neutral bar at DB back to MET, MET to cut-out N. Identify break.</li>
              <li>If continuity is good back to cut-out, suspect DNO PEN fault (PME systems are most exposed) — call DNO emergency.</li>
              <li>NEVER restore supply until neutral is proven solid end-to-end. Half-fixed neutral kills loads twice.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Practical balancing — the 'load schedule' approach"
            plainEnglish="On any new 3-phase + N install, draw up a one-page load schedule listing every final circuit, its expected steady current, and which phase you have allocated it to. Tally the totals per phase. Aim for &lt; 10 % imbalance between L1, L2, L3. Adjust before pulling the cables."
            onSite="On a refurb where the existing balance is poor, start by clamping each line at the DB during typical operating hours (lunch, mid-morning, end of day). Identify the heaviest single-phase circuits on the most-loaded phase. Move those circuits to the lightest phase at the next planned downtime. Re-clamp. Iterate."
          >
            <p>
              Single-phase load distribution example — 36 final circuits across 3 phases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 12 ckts × ~3 A each = 36 A total → 4 ckts per phase = 12 A each.</li>
              <li>Sockets: 18 ckts × ~10 A typical = 180 A total → 6 per phase = 60 A each.</li>
              <li>Heating: 6 dedicated ckts × 13 A = 78 A → 2 per phase = 26 A each.</li>
              <li>Per-phase total: 98 A. Imbalance &lt; 5 % → balanced design.</li>
            </ul>
            <p>
              Use a spreadsheet — most NICEIC and ECA contractors have a standard one. Your own
              learning: build one and use it on every install.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="K-rated transformers and the K-factor explained"
            plainEnglish="A K-rated transformer is one designed and rated for harmonic-rich loads. The K-factor (K=4, K=13, K=20, K=30) tells you how much harmonic content the transformer can handle without overheating. Standard distribution transformers are K=1 — fine for linear loads, undersized for IT/LED loads."
            onSite="Specify K-rated transformer for: data centres (K=13 typical), commercial offices with mostly LED + IT loads (K=4), industrial sites with VFDs (K=4 to K=13). Standard distribution transformers will work but derate them by 20-40 % for the same harmonic content. K-rated is more efficient and runs cooler — pays back over the 30-year life."
          >
            <p>K-factor selection guide:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>K=1</strong> — purely linear loads (motors, heaters, incandescent).</li>
              <li><strong>K=4</strong> — mixed commercial: some LED, some IT, mostly conventional. Standard for new offices.</li>
              <li><strong>K=13</strong> — heavy IT load, high LED density, server room. Standard for data centres.</li>
              <li><strong>K=20 / K=30</strong> — pure data centre, hospital, broadcast facility.</li>
            </ul>
            <p>
              K-rated transformers cost ~15-30 % more than standard but avoid the 30-50 % derating
              you would have to apply to a standard transformer. Net cost is similar; reliability
              is much better.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why double-pole isolation matters on TT systems but not TN"
            plainEnglish="On TT supplies, the neutral is NOT bonded to earth at the supply transformer (DNO does not provide an earth). A neutral conductor can therefore sit at non-zero voltage above true earth. Double-pole isolation (breaking line AND neutral) is mandatory at the main switch. On TN systems, neutral is bonded to earth at source — single-pole switching of just the line is acceptable for non-final isolation."
            onSite="Always check what you are isolating before you assume the neutral is dead. On TT: even with the line MCB off, the neutral can still be live relative to the earth rod due to load current flowing through other circuits sharing the neutral path. ALWAYS use double-pole isolation on TT installs — and prove dead with an approved tester L-PE AND N-PE."
          >
            <p>L3 implications for safe isolation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TT main switch: must be 4-pole on a 3-phase supply (3 × line + neutral).</li>
              <li>TN main switch: 3-pole acceptable but 4-pole common for consistency.</li>
              <li>Final circuit isolators on TT: minimum 2-pole (line + neutral) on single-phase circuits.</li>
              <li>Always prove dead L-N, L-PE AND N-PE on TT before working — neutral may surprise you.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Balanced 3-phase loads → vector sum = 0 → no neutral current.',
              'Unbalanced loads → neutral carries the vector difference.',
              'Triplen harmonics (3rd, 9th, 15th) are in phase across all three lines → add in neutral.',
              'Heavily non-linear loads can drive neutral current higher than line current.',
              'BS 7671 §523.6.3: neutral ≥ line where 3rd &gt; 15 %; size for full line current where &gt; 33 %.',
              'Always balance loads at design and verify with clamp meter at commissioning.',
              'Data centres and LED-heavy commercial installs typically use 200 % neutral.',
            ]}
          />

          <Quiz title="Neutral current and harmonics knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 Power factor correction
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4 — Magnetism and transformers
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
