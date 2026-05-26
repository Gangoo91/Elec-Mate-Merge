/**
 * Module 3 · Section 3 · Subsection 3 — kW, kVAr, kVA and the power triangle (AC 2.3, 2.4)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.3, 2.4
 *   AC 2.3 — "explain the relationship between kW, kVAr, kVA and power factor"
 *   AC 2.4 — "calculate power factor"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 7.3, 7.4 (same)
 *
 * Three flavours of power, one right-angled triangle. Power factor as the cosine of
 * the angle between real and apparent power.
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
import { PowerTriangle } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'kW, kVAr, kVA and the power triangle | Level 3 Module 3.3.3 (AC 2.3, 2.4) | Elec-Mate';
const DESCRIPTION =
  'Real power kW, reactive kVAr, apparent kVA. Pythagoras gives S² = P² + Q². cos φ = pf = P/S. The triangle behind every PFC calculation.';

const checks = [
  {
    id: 'l3-m3-3-3-pythag',
    question:
      'P = 8 kW, Q = 6 kVAr. Apparent power S =',
    options: [
      '14 kVA',
      '10 kVA',
      '48 kVA',
      '7 kVA',
    ],
    correctIndex: 1,
    explanation: 'S = √(P² + Q²) = √(64 + 36) = √100 = 10 kVA. Pythagoras on the power triangle.',
  },
  {
    id: 'l3-m3-3-3-pf',
    question: 'Same load: power factor =',
    options: [
      '0.8',
      '1.25',
      '0.75',
      '0.6',
    ],
    correctIndex: 0,
    explanation: 'pf = cos φ = P / S = 8 / 10 = 0.8. Equivalently sin φ = Q/S = 0.6 → φ = 36.87°.',
  },
  {
    id: 'l3-m3-3-3-q',
    question:
      "A motor draws S = 15 kVA at pf 0.7. Reactive power Q is approximately:",
    options: [
      '22 kVAr',
      '10.5 kVAr',
      '15 kVAr',
      '7.5 kVAr',
    ],
    correctIndex: 1,
    explanation:
      'P = S × cos φ = 15 × 0.7 = 10.5 kW. Q = S × sin φ = 15 × √(1−0.49) = 15 × 0.714 = 10.71 kVAr ≈ 10.5 kVAr (rounded).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Real power is measured in:',
    options: [
      'VAr',
      'W',
      'VA',
      'Ω',
    ],
    correctAnswer: 1,
    explanation: 'Real power = watts (W) or kW. The energy actually consumed and turned into heat, motion or light.',
  },
  {
    id: 2,
    question: 'Reactive power is measured in:',
    options: [
      'Hz',
      'W',
      'VAr',
      'VA',
    ],
    correctAnswer: 2,
    explanation: 'Reactive power = volt-amperes reactive (VAr) or kVAr. Sloshes in/out of inductors and capacitors.',
  },
  {
    id: 3,
    question: 'Apparent power is measured in:',
    options: [
      'VAr',
      'W',
      'A',
      'VA',
    ],
    correctAnswer: 3,
    explanation: 'Apparent = volt-amperes (VA) or kVA. The product V × I (or √3 × V_L × I_L) regardless of phase angle.',
  },
  {
    id: 4,
    question: 'Power factor cos φ equals:',
    options: [
      'P / S',
      'P / Q',
      'Q / S',
      'S / P',
    ],
    correctAnswer: 0,
    explanation: 'pf = cos φ = real / apparent = P / S. Always between 0 and 1 for loads.',
  },
  {
    id: 5,
    question: 'A unity power factor (pf = 1.0) load has:',
    options: [
      'Ahead in the direction of travel',
      'No reactive power — purely resistive',
      '±0.01°C change over 2 minutes',
      'High ambient temperature or self-heating',
    ],
    correctAnswer: 1,
    explanation:
      'Unity pf means cos φ = 1 → φ = 0° → no phase angle between V and I → no reactive component. Pure resistance (heater, incandescent lamp).',
  },
  {
    id: 6,
    question: 'A 0.6 lagging power factor means:',
    options: [
      'Current leads voltage by 53°',
      'Voltage leads current by 60°',
      'Current lags voltage by 53° (inductive)',
      'Currents are 90° apart',
    ],
    correctAnswer: 2,
    explanation:
      'cos⁻¹(0.6) = 53.13°. Lagging = current behind voltage = inductive load. The bigger the angle, the worse the power factor.',
  },
  {
    id: 7,
    question:
      'A factory has P = 200 kW, pf 0.7 lagging. Apparent power S =',
    options: [
      '140 kVA',
      '200 kVA',
      '400 kVA',
      '286 kVA',
    ],
    correctAnswer: 3,
    explanation: 'S = P / pf = 200 / 0.7 = 285.7 kVA ≈ 286 kVA.',
  },
  {
    id: 8,
    question: 'Reactive power Q for the same load:',
    options: [
      '204 kVAr',
      '200 kVAr',
      '100 kVAr',
      '141 kVAr',
    ],
    correctAnswer: 0,
    explanation:
      'Q = √(S² − P²) = √(286² − 200²) = √(81 796 − 40 000) = √41 796 = 204.4 kVAr.',
  },
];

const faqs = [
  {
    question: "Why don't we just bill the customer for kVA?",
    answer:
      "Some industrial DNO contracts do — Maximum Demand contracts include a kVA or 'availability' charge. Domestic and most small commercial bills are kWh (real energy), but if pf is bad enough the DNO surcharge for kVAr can be significant. PFC saves both kVA capacity and reduces bills.",
  },
  {
    question: 'Can power factor ever be negative?',
    answer:
      "The cosine value is between 0 and 1, but it can be lagging (inductive, normal for motors) or leading (capacitive, e.g. over-corrected installations). 'Negative pf' would mean power flowing back to the supply — a generator, not a load. PV inverters can do this when feeding back.",
  },
  {
    question: 'Why does my multimeter read different W on a 1 kVA load?',
    answer:
      "Because the meter measures real power (W). On a load with poor pf, V × I shows kVA but only V × I × cos φ shows kW. They're different by the power factor — and that difference is exactly what creates the 'wasted current' that PFC fixes.",
  },
  {
    question: "What's reactive power actually doing if it doesn't get consumed?",
    answer:
      "It's the energy that swings back and forth between the magnetic field of an inductor (motor winding) and the supply, twice per cycle. Net energy per cycle is zero, but the current to support it still flows in the cables. Hence the cables and transformer carry it even though no work is done.",
  },
  {
    question: 'When is leading pf a problem?',
    answer:
      "When you over-correct with capacitors. Leading pf can cause voltage rise, capacitor over-currents and resonance with supply harmonics. Industrial PFC controllers automatically switch capacitor steps in/out to keep pf around 0.95-0.98 lagging — never above unity.",
  },
  {
    question: 'How does the power triangle apply to single-phase?',
    answer:
      "Identically. P = V × I × cos φ; S = V × I; Q = V × I × sin φ. The triangle is the same shape; you just don't have the √3 factor. Power factor is per-circuit, regardless of how many phases.",
  },
];

export default function Sub3() {
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
            eyebrow="Module 3 · Section 3 · Subsection 3"
            title="kW, kVAr, kVA and the power triangle"
            description="Three flavours of power, one right-angled triangle. Pythagoras and cosine to find anything from anything."
            tone="yellow"
          />

          <TLDR
            points={[
              'Real power P (W, kW) = energy actually consumed.',
              'Reactive power Q (VAr, kVAr) = energy oscillating in inductors/capacitors. Net zero, but real current.',
              'Apparent power S (VA, kVA) = V × I (or √3 × V_L × I_L). The cable and transformer "see" this.',
              'Power triangle: S² = P² + Q². pf = cos φ = P / S. sin φ = Q / S.',
              'pf = 1.0 → purely resistive (no Q). pf < 1 → inductive (lagging) or capacitive (leading).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define real (W), reactive (VAr) and apparent (VA) power and explain the difference.',
              'Sketch the power triangle and identify P, Q, S and the angle φ.',
              'Calculate any of P, Q, S, pf given the other two using Pythagoras and cosine.',
              'Explain lagging vs leading power factor and the type of load that causes each.',
              'Convert between pf, phase angle φ and tan φ for PFC calculations.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Three flavours of power</ContentEyebrow>

          <ConceptBlock
            title="Real, reactive, apparent — different measurements of the same circuit"
            plainEnglish="A heater has only real power. A pure capacitor or inductor has only reactive power. Real loads (motors, fluorescent gear) have both — and the apparent power (V × I) is bigger than the real power because of the phase angle between voltage and current."
            onSite="A 5 kVA UPS can supply 5 kW only if your loads are pf 1.0. With pf 0.6 (typical motor), the same UPS only delivers 3 kW of useful power — the other 2 kVA is going into the magnetic field and back."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Real (P, W or kW)</strong> — energy actually transferred to do work
                (heat, motion, light). The kWh meter charges for this.
              </li>
              <li>
                <strong>Reactive (Q, VAr or kVAr)</strong> — energy that flows into and out of
                magnetic fields (inductors) or electric fields (capacitors) twice per cycle. Net
                energy = 0 over a full cycle, but the current that supports it is real and
                heats the cables.
              </li>
              <li>
                <strong>Apparent (S, VA or kVA)</strong> — the product V × I (or √3 × V_L × I_L
                for 3-phase). What the cable, transformer and protective device see. Always the
                hypotenuse of the power triangle.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The power triangle</ContentEyebrow>

          <ConceptBlock
            title="A right-angled triangle in three quantities"
            plainEnglish="Draw a horizontal line for P. Draw a vertical line for Q (up if inductive/lagging, down if capacitive/leading). The hypotenuse is S. The angle between P and S is φ."
          >
            <p>The Pythagoras and cosine relationships:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>S² = P² + Q²</strong> (Pythagoras)</li>
              <li><strong>cos φ = P / S</strong> (power factor)</li>
              <li><strong>sin φ = Q / S</strong></li>
              <li><strong>tan φ = Q / P</strong></li>
            </ul>
            <p>
              Worked example: a load draws P = 24 kW with pf 0.8 lagging.
              <br />
              S = P / pf = 24 / 0.8 = 30 kVA.
              <br />
              φ = cos⁻¹(0.8) = 36.87°.
              <br />
              Q = S × sin φ = 30 × 0.6 = 18 kVAr (or √(30² − 24²) = √324 = 18 kVAr).
            </p>
          </ConceptBlock>

          <PowerTriangle />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Lagging vs leading</ContentEyebrow>

          <ConceptBlock
            title="The sign of the angle tells you the type of load"
            plainEnglish="Lagging pf = inductive load (current behind voltage). Leading pf = capacitive load (current ahead of voltage). Most installs are lagging because motors, transformers and fluorescent gear dominate."
            onSite="In an old factory, replacing all the fluorescent fittings with LED can take you from pf 0.7 lagging to pf 0.95 lagging without any PFC at all. The new switching supplies have built-in PFC at the unit level."
          >
            <p>
              Convention: Q is positive for inductive loads, negative for capacitive. Power factor
              is normally quoted as a number with "lagging" or "leading" attached. A bare number
              defaults to lagging on industrial documentation.
            </p>
            <p>
              Same triangle, just flipped: leading pf has Q drawn DOWNWARDS (negative). The
              cosine is the same number; you just remember which way the current is offset.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.capacitors.url}
            title={videos.capacitors.title}
            channel={videos.capacitors.channel}
            duration={videos.capacitors.duration}
            topic={videos.capacitors.topic}
          />

          <RegsCallout
            source="Engineering Recommendation P28/2 (DNO power factor requirement)"
            clause="Where loads on a consumer's installation are predominantly inductive, the power factor at the connection point should not be less than 0.95 lagging averaged over a 30-minute period during periods of high system demand."
            meaning={
              <>
                Most UK DNOs operate to P28/2. Below 0.95 the customer is told to fit power factor
                correction or face a kVAr or kVA charge. PFC banks pay for themselves in 18-36
                months on a typical industrial install.
              </>
            }
            cite="Source: ENA Engineering Recommendation P28/2."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage at terminals)"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning={
              <>
                Reactive current adds to apparent power without delivering useful work, but it
                still drops voltage along the cable. A motor at 0.7 pf lagging draws 1/0.7 the
                line current of the same kW at unity, so V<sub>drop</sub> rises proportionally.
                Reg 525.1 forces you to size the cable on apparent (kVA) current, not real (kW)
                current — apparent is what the conductor actually carries.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 525.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.2 (Motor overload protection)"
            clause="Every electric motor having a rating exceeding 0.37 kW shall be provided with control equipment incorporating means of protection against overload of the motor."
            meaning={
              <>
                kW vs kVA confusion bites at the motor protection step. The thermal overload
                relay setting must be matched to the FLC at the motor's rated voltage and pf —
                not to the input kVA at the supply transformer. Set the overload to nameplate
                FLC × service factor (typically 1.0–1.15). Wrong setting lets the motor cook on
                a stalled rotor or trips repeatedly on legitimate starts.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 552.1.2."
          />

          <SectionRule />

          <CommonMistake
            title="Reading kVA as kW on a transformer plate"
            whatHappens={
              <>
                Customer says "transformer is 1000 kW". Pasted on the plate is 1000 kVA. Designer
                sizes a 1000 kW load. Real power capacity is only 1000 × pf — at pf 0.85, that is
                850 kW. Customer trips the transformer overload at 90 % load.
              </>
            }
            doInstead={
              <>
                Read the unit. Transformers are rated in kVA (apparent power) because that is
                what limits the cable, the windings and the cooling. Real power capacity depends
                on the customer load mix. Do not size loads up to the kVA rating without
                accounting for pf.
              </>
            }
          />

          <Scenario
            title="Sizing a UPS for a server room with mixed loads"
            situation={
              <>
                Server room load: 12 kW IT (pf 0.95), 4 kW air-con (pf 0.75), 2 kW lighting (pf
                1.0). UPS rated 25 kVA. Will it cope?
              </>
            }
            whatToDo={
              <>
                Total real power P = 12 + 4 + 2 = 18 kW.
                <br />
                Per-load reactive Q:
                <br />
                — IT: pf 0.95 → φ = 18.2° → Q = 12 × tan 18.2° = 3.94 kVAr.
                <br />
                — Air-con: pf 0.75 → φ = 41.4° → Q = 4 × tan 41.4° = 3.53 kVAr.
                <br />
                — Lighting: pf 1.0 → Q = 0.
                <br />
                Total Q = 7.47 kVAr.
                <br />
                Total S = √(P² + Q²) = √(18² + 7.47²) = √(324 + 55.8) = √379.8 = 19.5 kVA.
                <br />
                Average pf = P / S = 18 / 19.5 = 0.92.
                <br />
                25 kVA UPS rating &gt; 19.5 kVA load → COMPLIANT, with ~5.5 kVA headroom.
              </>
            }
            whyItMatters={
              <>
                You cannot add power factors directly. You must add P and Q separately, then
                Pythagoras to find S. The average pf comes out as P/S — usually somewhere between
                the worst and best individual pf. This is exactly the maths a UPS designer or
                generator-set sizer does daily.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — getting confident with the triangle</ContentEyebrow>

          <ConceptBlock
            title="Why a poor pf costs the customer money even on a kWh tariff"
            plainEnglish="Even though the kWh meter only charges for real power, poor pf forces extra current through the transformer, the supply cable and the customer's switchgear. That current causes I²R losses (heat) inside the customer's installation — losses they pay for in higher kWh consumption."
            onSite="Worked: 100 kW load at pf 0.7 lagging draws S = 143 kVA. Same load at pf 0.95 draws 105 kVA. Current drops from 207 A to 152 A on a 400 V 3-phase line. I²R loss in the supply cable drops by (207/152)² = 1.85× — so cable losses fall by 46 %. Over a year that is real money on the customer's bill, before any DNO penalty."
          >
            <p>The two cost drivers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>I²R loss in customer cables</strong> — paid for as kWh consumption.
                Worse pf = more current = more loss.
              </li>
              <li>
                <strong>DNO availability charge / kVA charge / kVAr charge</strong> — extra line
                items on commercial bills when pf falls below 0.95.
              </li>
            </ul>
            <p>
              For a 200 kW factory at pf 0.7, typical PFC bank cost £8-15k, payback 18-30 months.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Converting pf to phase angle and back — calculator drill"
            plainEnglish="The maths only works in one direction on the calculator: cos⁻¹ converts pf to angle, cos converts angle to pf. tan φ converts angle to Q/P ratio — the most useful quantity for PFC sizing because it tells you how much capacitive Q to add."
            onSite="Standard PFC sizing problem: you know current pf, target pf, and current real power P. Q_C (capacitor kVAr) = P × (tan φ_old − tan φ_new). Always work in this order: 1) cos⁻¹ each pf to get the two angles. 2) tan each angle. 3) Subtract. 4) Multiply by P. The 'tan delta' approach is faster than working with kVAr directly."
          >
            <p>Standard L3 conversions you should be able to do without thinking:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>pf 1.0 → φ = 0° → tan φ = 0.</li>
              <li>pf 0.95 → φ = 18.2° → tan φ = 0.329.</li>
              <li>pf 0.9 → φ = 25.8° → tan φ = 0.484.</li>
              <li>pf 0.85 → φ = 31.8° → tan φ = 0.620.</li>
              <li>pf 0.8 → φ = 36.9° → tan φ = 0.750.</li>
              <li>pf 0.7 → φ = 45.6° → tan φ = 1.020.</li>
              <li>pf 0.6 → φ = 53.1° → tan φ = 1.333.</li>
              <li>pf 0.5 → φ = 60.0° → tan φ = 1.732.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When PFC capacitors do MORE harm than good"
            plainEnglish="Old fixed-step PFC banks were sized for the load they expected. If the load drops (factory shuts down for the weekend, lights only) but the capacitors stay on, the install over-corrects to leading pf — voltage rises, capacitor currents climb, harmonics resonate. That is why modern PFC controllers automatically switch capacitor steps in and out based on measured pf."
            onSite="If you find old static (un-controlled) PFC capacitors on a small commercial install, recommend swapping for an automatic controller (or removing entirely if loads have switched to LED/electronic supplies which already have unity pf). Static caps were designed for the era of fluorescent gear and motor loads — they often hurt modern installs."
          >
            <p>Symptoms of leading pf / over-correction:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitor cans hot, swollen or vented (over-current).</li>
              <li>Voltage at the bus higher than supply (capacitive boost).</li>
              <li>Audible buzzing from PFC contactors (chasing in/out).</li>
              <li>Harmonic distortion higher than expected (resonance with supply impedance).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reading a PQ analyser report — what each line means"
            plainEnglish="Power-quality reports always give you the same five-or-six numbers per phase: V_rms, I_rms, P, Q, S, pf, plus harmonic distortion (THD). Knowing how the numbers tie together via the triangle lets you spot wrong meter setups or genuine power issues."
            onSite="Quick sanity-check on a PQ report: V × I (per phase) should equal S (per phase). P / S should equal pf. P² + Q² should equal S² (within rounding). If any of these don't tie up, the meter is misconfigured (wrong CT ratio, missing voltage reference, swapped phase) — not a real fault. Flag it and re-survey."
          >
            <p>Worked example — analyser logs L1 reads:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>V_L1 = 232 V, I_L1 = 18.4 A.</li>
              <li>P = 3.4 kW, Q = 1.8 kVAr, S = 3.85 kVA, pf = 0.88.</li>
              <li>Check 1: V × I = 232 × 18.4 = 4269 VA = 4.27 kVA. ≠ 3.85 kVA reported.</li>
              <li>Check 2: P / S = 3.4 / 3.85 = 0.88 ✓ matches reported pf.</li>
              <li>Check 3: √(P² + Q²) = √(11.56 + 3.24) = √14.8 = 3.85 ✓ matches S.</li>
              <li>So pf is right, internal maths is right — but V × I disagrees. Likely CT polarity or voltage reference issue.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Per-phase vs total — single load, three numbers"
            plainEnglish="On an unbalanced 3-phase load each phase has its own P, Q, S, pf. The TOTAL P is the sum across phases (P_total = P_L1 + P_L2 + P_L3). Same for Q. But total S is NOT the simple sum — it is √(P_total² + Q_total²). Total pf = P_total / S_total, not the average of the three pfs."
            onSite="Common bill-checking task: customer says 'why is my total kVA so much higher than the average of my three phase kVAs?' Answer: because vector addition. Show them the per-phase numbers, sum P and Q separately, then Pythagoras for the total. Average of the three pfs would over-estimate true pf if the loading is uneven."
          >
            <p>Worked — small workshop, line readings:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1: P = 4 kW, Q = 3 kVAr → S = 5 kVA, pf = 0.8.</li>
              <li>L2: P = 6 kW, Q = 2 kVAr → S = 6.32 kVA, pf = 0.95.</li>
              <li>L3: P = 2 kW, Q = 1 kVAr → S = 2.24 kVA, pf = 0.89.</li>
              <li>Total P = 12 kW. Total Q = 6 kVAr. Total S = √(144 + 36) = √180 = 13.4 kVA.</li>
              <li>Total pf = 12 / 13.4 = 0.895.</li>
              <li>(Not the same as average of 0.8, 0.95, 0.89 = 0.88 — close but not identical.)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Real (W), reactive (VAr), apparent (VA) — three power quantities tied by Pythagoras.',
              'Power triangle: S² = P² + Q². pf = cos φ = P/S. sin φ = Q/S. tan φ = Q/P.',
              'Lagging pf = inductive load. Leading pf = capacitive (over-corrected).',
              'pf = 1.0 means purely resistive. UK DNO target ≥ 0.95 lagging at the supply.',
              "When summing mixed loads: add P separately, add Q separately, then Pythagoras for S.",
              'Transformers are rated kVA — real capacity = kVA × actual pf.',
            ]}
          />

          <Quiz title="Power triangle knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Star and delta calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Power factor correction — methods and sizing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
