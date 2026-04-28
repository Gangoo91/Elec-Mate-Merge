/**
 * Module 6 · Section 2 · Subsection 5 — Industrial load assessment
 * Maps to C&G 2365-03 / Unit 305 / LO2 / AC 2.6
 *   AC 2.6 — "Determine the maximum demand and design current of industrial installations"
 *
 * Layered depth: 2366-03 Unit 304 / AC 2.5; 5393-03 Unit 104 / AC 2.5
 *
 * Small / medium industrial site — workshop with motor circuits, process
 * equipment, welders, compressors. Motor starting current, sequenced starts,
 * harmonic loading from VSDs, and the bigger Reg 311 picture for industrial.
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

const TITLE = 'Industrial load assessment (2.6) | Level 3 Module 6.2.5 | Elec-Mate';
const DESCRIPTION =
  "Industrial load assessment for small / medium workshop and process sites. Motor starting currents, sequenced starts, VSD harmonic loading, welder and compressor diversity, and the broader Reg 311 picture for industrial.";

const checks = [
  {
    id: 'motor-start',
    question:
      "A 22 kW three-phase induction motor with full-load current 41 A direct-on-line starting. Approximate starting current and duration?",
    options: [
      "41 A continuous — DOL motors do not have a starting transient.",
      "Around 6-8 x FLC = 250-330 A peak for ~1-3 seconds (motor-dependent), decaying as the motor accelerates. Heavy enough to dim other circuits and to overload protection if not coordinated.",
      "10 x FLC indefinitely.",
      "Half FLC at start.",
    ],
    correctIndex: 1,
    explanation:
      "Direct-on-line (DOL) starting draws 6-8 times the full-load current as the motor accelerates from rest. The duration is short (typically 1-5 seconds for fan and pump loads, longer for high-inertia loads like centrifuges and conveyors) but the magnitude is enough to cause voltage dips on the supply, dim lighting on the same line and require coordinated protection (typically a contactor + thermal overload set above starting current). For motors over 5-7 kW DOL, consider soft-start or VSD to reduce starting transient and harmonic impact.",
  },
  {
    id: 'motor-diversity',
    question:
      "An industrial workshop has five 11 kW motors (FLC 21 A each). Running diversity and starting coordination assumption?",
    options: [
      "All five at 100 percent demand simultaneously.",
      "Largest motor at 100 percent + 50-75 percent of remaining motors running, plus check that the supply can handle the largest motor starting on top of the others running. Sequence starts to avoid concurrent transients.",
      "Apply 30 percent to all motors.",
      "Motors do not need diversity.",
    ],
    correctIndex: 1,
    explanation:
      "Industrial motor diversity considers two things: running diversity (which motors run simultaneously?) and starting coordination (the largest starting transient on top of the running others). Typical: largest motor at 100 percent + 50-75 percent of others (running), plus check that the supply can handle the largest motor DOL transient added to the others running. For larger workshops use sequence starting (motors start one at a time with a delay) to avoid concurrent starts, or specify soft-starts / VSDs.",
  },
  {
    id: 'vsd-harmonics',
    question:
      "A 30 kW motor on a six-pulse VSD. Impact on the supply that the diversity calc must account for?",
    options: [
      "No impact — VSD is just a controller.",
      "Harmonic injection (5th, 7th, 11th, 13th orders) raises supply RMS current above the calc figure; reduces the soft-start benefit at the supply level. Specify 12-pulse VSD, line reactor, or active filter for sites with multiple VSDs to keep total harmonic distortion within ENA EREC G5/5 limits.",
      "VSD doubles the supply demand.",
      "VSD eliminates power factor correction need.",
    ],
    correctIndex: 1,
    explanation:
      "Six-pulse VSDs (most economy units) inject significant harmonics back into the supply — 5th, 7th, 11th, 13th orders predominantly. On a single small VSD this is manageable; on multiple VSDs in one site the cumulative harmonic distortion can exceed ENA EREC G5/5 limits and require mitigation: 12-pulse VSDs (much lower harmonics), line reactors (reduces harmonic by 40-50 percent), passive harmonic filters (tuned to specific orders), or active filters (broad-spectrum suppression). The diversity calc page on a VSD-heavy site needs a harmonic loading row.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Industrial load assessment differs from commercial primarily because of:',
    options: [
      'Different lighting requirements.',
      'Motor starting transients, process load coincidence, harmonic loading from VSDs and rectifiers, and welder / cyclic load profile.',
      'Higher voltage.',
      'No diversity allowed.',
    ],
    correctAnswer: 1,
    explanation:
      "Industrial load profile is dominated by motors (DOL or via VSD), process equipment with cyclic demand, welders with brief high transient, compressors with start-stop cycle. The diversity calc must consider running coincidence and starting coordination. Harmonic loading from VSDs raises RMS current above the active-power figure. Welders and other intermittent loads use lower diversity factors but require attention to peak transients.",
  },
  {
    id: 2,
    question: 'Direct-on-line starting current for a typical induction motor is:',
    options: [
      '0.5-1 x FLC',
      '6-8 x FLC for 1-5 seconds',
      'Same as full load',
      '20 x FLC continuous',
    ],
    correctAnswer: 1,
    explanation:
      "DOL starting: 6-8 times full-load current. Duration depends on load inertia — fans and pumps 1-3 seconds, conveyors 3-10 seconds, centrifuges and presses up to 30+ seconds. The motor protection (contactor + thermal overload) must allow starting current to pass for the starting duration without tripping; this is set per motor data sheet.",
  },
  {
    id: 3,
    question: 'Soft-start vs DOL starting current reduction is typically:',
    options: [
      'No reduction.',
      '50 percent reduction (3-4 x FLC instead of 6-8 x).',
      '99 percent reduction.',
      'Same as DOL.',
    ],
    correctAnswer: 1,
    explanation:
      "Soft-starters typically reduce starting current to 3-4 x FLC instead of 6-8 x DOL. Full VSD soft-start can reduce further to 1.5-2 x FLC. The trade-off: soft-starters cost more, can have shorter motor life if mis-tuned, and (for VSDs) inject harmonics. For motors over 5-7 kW the soft-start is usually justified by the supply impact reduction.",
  },
  {
    id: 4,
    question: 'A welding circuit with 80 A peak transient lasting 0.5-2 seconds per weld, intermittent 30 percent duty cycle. Diversity for the welder on the design pack:',
    options: [
      '100 percent of peak.',
      '50-75 percent of peak nameplate (intermittent duty cycle reduces RMS demand) but ensure cable and protection coordinate with the peak transient.',
      '0 percent (welders have no diversity).',
      '10 percent of peak.',
    ],
    correctAnswer: 1,
    explanation:
      "Welder diversity reflects intermittent duty cycle. RMS demand at typical 30 percent duty is roughly 0.55 x peak (since I_RMS for intermittent load = I_peak × √duty_cycle). Sub-main and supply sizing typically uses 50-75 percent of peak as the design current. But the cable and protection on the welder circuit must accept the peak transient — fast-acting protection set above peak, cable sized for thermal capacity over the duty cycle.",
  },
  {
    id: 5,
    question: 'ENA EREC G5/5 (current edition) addresses:',
    options: [
      'Cable colour coding.',
      'Harmonic distortion limits at the point of common coupling — limits on individual harmonic orders and total harmonic distortion (THD) for connections to the public network.',
      'Motor speed control.',
      'Welding arc safety.',
    ],
    correctAnswer: 1,
    explanation:
      "ENA Engineering Recommendation G5/5 (latest issue replaces G5/4) sets harmonic distortion limits at the point of common coupling (PCC) for connections to the public distribution network. Individual harmonic order limits (typically 4-5 percent for low-order, 1-3 percent for higher orders) and a THD limit (typically 5-8 percent voltage). Sites with multiple VSDs, large rectifiers or significant non-linear load must demonstrate compliance.",
  },
  {
    id: 6,
    question: 'Compressor with on-off cycling typical diversity for sub-main calc:',
    options: [
      '100 percent always.',
      'Per duty cycle — typical industrial air compressor on a 50 percent duty cycle gives RMS current ~0.7 x peak. Sub-main typically sized at 70-100 percent of FLC; protection coordinated with starting transient if DOL.',
      '0 percent.',
      '30 percent of nameplate.',
    ],
    correctAnswer: 1,
    explanation:
      "Compressor cyclic load: when the air receiver is below set pressure the compressor runs at FLC; when at pressure it stops. Duty cycle depends on demand. RMS current for cyclic load ~ I_peak × √duty. For 50 percent duty, RMS ~0.7 x FLC. Sub-main sizing at 70-100 percent of FLC is typical (depending on duty cycle and number of compressors). Starting transient coordination per DOL motor rules.",
  },
  {
    id: 7,
    question: 'Reg 132.3 special conditions for industrial typically include:',
    options: [
      'Just the main connected load.',
      'Harmonics from non-linear loads (VSDs, rectifiers, IT), inrush from large motors and transformers, voltage flicker from welders and arc furnaces, daily and yearly demand variation per process schedule.',
      'No special conditions for industrial.',
      'Only lighting.',
    ],
    correctAnswer: 1,
    explanation:
      "Industrial sites have multiple Reg 132.3 special conditions: harmonics (VSDs, rectifiers, IT load), inrush (large motors, transformers, capacitor banks), voltage flicker (arc welders, large motor starts), daily and yearly variation (shift patterns, seasonal product mix). Document each on the design pack and reference the mitigation (PFC, harmonic filters, sequence starting, supply pre-energisation).",
  },
  {
    id: 8,
    question: 'A small industrial site with multiple motors, welders, compressors and VSDs needs:',
    options: [
      'Same diversity calc as a domestic dwelling.',
      'A multi-row diversity calc with motor running diversity, motor starting coordination check, welder peak vs RMS, harmonic loading allowance, and PFC / supply transient assumptions documented per source.',
      'Just the largest motor at 100 percent.',
      'No calc needed.',
    ],
    correctAnswer: 1,
    explanation:
      "Industrial diversity calc has more rows than domestic or small commercial: per-motor running diversity, starting coordination matrix (which motor on top of which others), welder duty cycle, compressor cycle, harmonic loading at the supply, PFC pre/post calculation, sequence-start delays. The page is a small spreadsheet but it is what the supply rating depends on. The L3 designer who specs an industrial site without this calc is guessing.",
  },
];

const faqs = [
  {
    question: "How do I size the protective device for a DOL motor circuit?",
    answer:
      "Motor protection has two parts: short-circuit protection (typically motor-rated MCB or fuse, sized to allow starting current to pass for the starting duration without operating — often gM characteristic for fuses, type C or D for MCBs) and overload protection (thermal overload set to 1.0-1.15 x motor FLC, depending on duty cycle and ambient). Refer to the motor manufacturer datasheet for the recommended protection coordination. The breaker In is typically 2-2.5 x motor FLC for DOL, less for soft-start, much less for VSD (which has internal protection). BS EN 60947-4-1 (contactor + overload coordination) is the underlying product standard.",
  },
  {
    question: "What is the difference between Type C and Type D MCB and when do I use each?",
    answer:
      "Type C MCB: instantaneous trip at 5-10 x In, suitable for moderate inrush loads (small motors, fluorescent lighting clusters, transformer secondary). Type D MCB: instantaneous trip at 10-20 x In, for high inrush (large motors, welders, large transformers, capacitor switching). Type B (3-5 x In) is the domestic default but trips on motor starts. For an industrial workshop with motors and welders, expect a mix of Type C (moderate) and Type D (heavy inrush) on motor circuits, with Type B reserved for general-purpose circuits without inrush.",
  },
  {
    question: "How do I handle the harmonic loading on a site with multiple VSDs?",
    answer:
      "Three things to consider: (1) cable and supply sizing on RMS current (which is higher than active-power calc with significant harmonic content); (2) ENA EREC G5/5 compliance at the point of common coupling — measure or calculate THD and individual harmonic orders, compare to limits; (3) mitigation if needed — line reactors (cheap, 40-50 percent reduction), passive filters (tuned to dominant orders), active filters (broad-spectrum, expensive but most flexible), 12-pulse or 18-pulse VSDs (intrinsic harmonic reduction). For sites under ~100 kVA with 1-2 small VSDs, line reactors usually suffice. Larger or more VSD-heavy sites need active filters.",
  },
  {
    question: "What is sequence starting and when do I specify it?",
    answer:
      "Sequence starting (also called interlocked starting) prevents two or more large motors from starting at the same time. A control sequence delays the second motor start until the first has reached running speed (or until a fixed time delay has elapsed). This avoids the supply transient of two concurrent DOL starts (which can exceed the supply rating briefly). Specify sequence starting whenever multiple motors over ~5 kW could plausibly start simultaneously — typical of compressors, conveyor lines, refrigeration plant. The sequence is implemented in the motor control centre (MCC) or by a programmable logic controller (PLC).",
  },
  {
    question: "Do I include welder duty cycle on the diversity calc?",
    answer:
      "Yes. Welder peak demand is short-duration high-current; RMS demand over a typical work pattern is much lower. RMS = peak × √duty_cycle. For a welder rated 200 A peak at 30 percent duty cycle, RMS = 200 × √0.3 = 110 A. Sub-main and supply sized on RMS (110 A); but the welder circuit cable and protection sized to handle the 200 A peak transient without nuisance trip. Both peak and RMS rows go on the diversity calc page; cable sizing references the peak; supply sizing references the RMS.",
  },
  {
    question: "How does load curtailment fit into industrial design?",
    answer:
      "Load curtailment (some plant being shut down or reduced when total demand approaches supply rating) is a Reg 311 / Reg 536.4.202 consideration. Reg 536.4.202 explicitly requires coordination between the LV switchgear and the overload protection during load curtailment events, with documentation showing the curtailment scheme will not cause unexpected trips or failures. For industrial sites where curtailment is part of the design (e.g. demand-response contract with the DNO), document the curtailment logic, the resulting maximum demand under all foreseeable curtailment states, and the failure-mode demand (curtailment scheme fails, full load draws). This is the same Reg 311.2 (A4:2026) failure-mode requirement applied to industrial.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 5"
            title="Industrial load assessment"
            description="Small / medium industrial workshop with motor circuits, process equipment, welders and compressors. Motor starting currents, sequenced starts, VSD harmonic loading and the broader Reg 311 picture for industrial sites."
            tone="amber"
          />

          <TLDR
            points={[
              "Industrial load assessment adds three layers to the commercial workflow: motor starting transients (6-8 x FLC for DOL, 3-4 x for soft-start, 1.5-2 x for VSD), running coincidence + starting coordination across multiple motors, and harmonic loading from VSDs and rectifiers.",
              "Welders and compressors use intermittent / cyclic duty — sub-main and supply sized on RMS demand (peak × √duty_cycle), but circuit cable and protection sized for peak transient.",
              "ENA EREC G5/5 sets harmonic distortion limits at the point of common coupling. VSD-heavy sites must measure or calculate THD and individual harmonic orders and demonstrate compliance — line reactors, harmonic filters or 12-pulse VSDs as mitigation.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Build an industrial connected load schedule covering motor circuits, process equipment, welders, compressors, lighting, sockets and HVAC.',
              'Apply IET GN1 Section 7 industrial diversity factors and motor running coincidence; check starting coordination across multiple motors.',
              'Calculate motor starting current for direct-on-line, soft-start and VSD configurations and select appropriate protection (Type C / Type D MCB, motor-rated fuses).',
              'Calculate welder and compressor cyclic duty RMS demand (RMS = peak × √duty_cycle) and apply on the diversity calc.',
              'Recognise harmonic loading from VSDs and rectifiers, calculate THD, demonstrate ENA EREC G5/5 compliance and specify mitigation (line reactors, passive / active filters, 12-pulse VSDs).',
              'Document the industrial diversity calc with motor running diversity, starting coordination matrix, welder duty, harmonic loading and PFC assumptions per source.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Motor starting transients — the dominant industrial design driver"
            plainEnglish="DOL motors draw 6-8 x FLC for seconds at start. The supply has to absorb that without dropping voltage; the protection has to allow it without nuisance trip."
            onSite="The most common industrial design failure is sizing the supply on the running diversity and forgetting the largest motor starting transient. The 100 A supply that handles steady-state runs fine until the chiller starts on a Monday morning and pulls 350 A for 2 seconds, blowing the cut-out fuse."
          >
            <p>
              Three motor start types and their transient profile:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct-on-line (DOL)</strong> — full voltage applied at start. Starting current = 6-8 x full-load current (FLC). Duration: 1-5 seconds for typical fan / pump loads, 5-30+ seconds for high-inertia loads. Cheapest option, most disruptive on supply. Suitable for motors up to ~5-7 kW on most supplies.</li>
              <li><strong>Soft-starter (electronic)</strong> — voltage ramped up over 5-30 seconds. Starting current reduced to 3-4 x FLC. Duration similar but transient lower. Mid-cost. Used for motors 5-50 kW and for any motor where DOL transient causes supply problems.</li>
              <li><strong>Variable-speed drive (VSD)</strong> — full electronic control of motor speed. Starting current 1.5-2 x FLC. Duration controlled by ramp setting. Highest cost but lowest transient and additional benefit of running speed control. Used for 5-1000+ kW motors and for any motor where speed control adds process value (variable air volume, variable pump flow).</li>
            </ul>
            <p>
              Worked example: 22 kW three-phase induction motor, FLC = 41 A.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DOL: starting current 7 × 41 = 287 A for 2-3 seconds. Supply must absorb this transient on top of running other loads. Type D MCB or motor-rated fuse coordinated with thermal overload.</li>
              <li>Soft-starter: starting current 3.5 × 41 = 144 A over 10-20 seconds ramp. Less peak but longer duration; thermal overload sees more I²t. Type C MCB.</li>
              <li>VSD: starting current 1.8 × 41 = 74 A over 5-30 seconds ramp. Minimal supply transient; VSD has internal protection so external MCB just for upstream isolation (Type B or C).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation into circuits)"
            clause="Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance (see also Chapter 46 and Section 537); (c) take account of hazards that may arise from the failure of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances (see also Chapter 44); (f) prevent the indirect energizing of a circuit intended to be isolated."
            meaning={
              <>
                Motor starting, welder transients, capacitor switching and other industrial inrush events drive circuit-division decisions under Reg 314.1(e) — mitigate the effects of electromagnetic disturbances. The design must show the supply can absorb the transients without causing voltage flicker on neighbouring loads (lighting, IT, sensitive equipment). Sequence starting, soft-starts, VSDs and segregated sub-mains all sit under the Reg 314.1 framework. The L3 designer documents the inrush profile and the chosen mitigation for each significant transient source.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
          />

          <SectionRule />

          <ContentEyebrow>Motor running diversity + starting coordination</ContentEyebrow>

          <ConceptBlock
            title="Two checks: which motors run together, and which can start when others are running"
            plainEnglish="Running diversity is steady-state. Starting coordination is the transient on top of steady-state."
          >
            <p>
              Industrial motor diversity has two layers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Running diversity</strong> — across n motors that may run simultaneously, what percentage of the FLC sum is the realistic running peak? Typical: largest motor at 100 percent + 50-75 percent of remaining motors. For a workshop with 5 x 11 kW motors (FLC 21 A each, sum 105 A), running peak: 21 + 4 × 21 × 0.6 = 21 + 50.4 = 71 A.</li>
              <li><strong>Starting coordination</strong> — when the largest motor starts on top of the others running, can the supply absorb the transient? For DOL of the 11 kW (transient 7 × 21 = 147 A) on top of 4 others running (50 A): peak transient = 147 + 50 = 197 A for 2-3 seconds. The supply rating must absorb this; the supply main and the motor circuit protection must coordinate.</li>
            </ul>
            <p>
              Sequence starting prevents concurrent starts. A typical workshop with 5 motors might allow only one motor to start at any given time — the second motor waits 5-10 seconds after the first reaches running speed. This contains the transient to a single motor at a time, manageable on a smaller supply. Sequence logic implemented in the motor control centre (MCC) or via PLC.
            </p>
            <p>
              For sites with very large motors (above 50 kW), a soft-start or VSD on the largest motor is usually justified — reduces the starting transient by 50-75 percent and removes the supply impact issue. The VSD also adds running speed control which often pays for itself in process savings.
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

          <ContentEyebrow>Welders, compressors, cyclic loads — RMS vs peak</ContentEyebrow>

          <ConceptBlock
            title="Intermittent / cyclic loads: RMS for sub-main, peak for circuit"
            plainEnglish="Welder is on for 0.5 seconds, off for 1.5 seconds. RMS current is much less than peak. Sub-main on RMS; circuit on peak."
          >
            <p>
              Welders, compressors, presses, conveyors with stop-start and other cyclic loads have a fundamentally different load profile from continuous motors. The peak demand is brief; the RMS demand over a work cycle is much lower.
            </p>
            <p>
              RMS for intermittent / cyclic load:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I_RMS = I_peak × √duty_cycle</li>
              <li>Welder 200 A peak at 30 percent duty: I_RMS = 200 × √0.3 = 110 A.</li>
              <li>Compressor 35 A peak at 50 percent duty: I_RMS = 35 × √0.5 = 25 A.</li>
              <li>Press 80 A peak at 10 percent duty: I_RMS = 80 × √0.1 = 25 A.</li>
            </ul>
            <p>
              Two design implications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sub-main and supply sizing</strong> — use RMS. Welder appears on the diversity calc as 110 A, not 200 A. Compressor appears as 25 A. Sub-main and origin coincidence then applied as normal.</li>
              <li><strong>Circuit cable and protection</strong> — must accept the peak transient. Cable sized for thermal capacity over the full duty cycle (RMS heating equivalent); protection set to allow peak through without nuisance trip (Type D MCB or motor-rated fuse with appropriate I²t rating).</li>
            </ul>
            <p>
              Both the peak and RMS values go on the diversity calc page. The design pack flags the two values explicitly so the future maintainer knows the cable is sized for RMS and the protection for peak.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Harmonic loading from VSDs and rectifiers</ContentEyebrow>

          <ConceptBlock
            title="Non-linear loads inject harmonics — the supply current is higher than the active-power calc"
            plainEnglish="VSDs, rectifiers, IT power supplies and LED drivers draw distorted current. RMS exceeds the kW / V calc. Total harmonic distortion (THD) needs to stay within ENA limits."
          >
            <p>
              Non-linear loads draw current in pulses rather than smooth sinusoids. The RMS current includes the fundamental + the harmonic components. For a typical six-pulse VSD without mitigation, the input current THD is 30-80 percent — the RMS is 1.05-1.30 times the active-power calc would predict.
            </p>
            <p>
              Three impacts on the diversity calc:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable and supply sizing</strong> — use RMS, not active-power. For VSD-heavy sites, multiply the active-power calc Ib by a harmonic factor (typically 1.10-1.25 depending on VSD count and mitigation).</li>
              <li><strong>Neutral conductor sizing</strong> — triplen harmonics (3rd, 9th, 15th) from each phase add in the neutral instead of cancelling. For heavy IT load, neutral current can equal or exceed line current. Reg 524 covers neutral sizing for harmonic loading.</li>
              <li><strong>ENA EREC G5/5 compliance</strong> — at the point of common coupling, individual harmonic order and total THD limits apply. Sites that exceed must mitigate.</li>
            </ul>
            <p>
              Mitigation options (in order of cost):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Line reactor</strong> — series inductor on VSD input. 40-50 percent harmonic reduction. Cheap. Suitable for 1-2 small VSDs.</li>
              <li><strong>Passive harmonic filter</strong> — LC tuned to dominant harmonic orders (typically 5th and 7th). 60-80 percent reduction. Mid-cost. Per VSD or per group.</li>
              <li><strong>12-pulse VSD</strong> — phase-shifted transformer feeds two 6-pulse rectifiers in series; lower-order harmonics cancel. Higher cost but very low harmonics intrinsic.</li>
              <li><strong>Active harmonic filter</strong> — power electronic device that injects compensating current. Broad-spectrum suppression. Highest cost but most flexible. Single unit can mitigate multiple VSDs.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="DNO contract demand — kVA, ToU tariffs and triad on industrial supplies"
            plainEnglish="An industrial customer typically holds a contract demand with the DNO — an agreed maximum kVA the supply will deliver. Exceeding it triggers an excess capacity charge (often 1.5x the standing rate). Below it leaves money on the table because the DNO charges for the contracted kVA whether it is used or not. The diversity calc feeds straight into the contract-demand sizing — get it wrong and the customer pays for years."
            onSite="Pull historic half-hourly data from the supplier (or a PQ logger left on for a fortnight) to see the actual kVA peaks and pattern. Compare to the contract demand. Most sites can drop their contract demand by 10-20 percent based on what they actually use; some need to increase to avoid excess charges. Time-of-use (ToU) tariffs add another dimension — kWh price varies by half-hour band, with the November-February evening peak (the old 'triad' window) typically the most expensive. Demand-shifting (run the compressor at night, charge the EV fleet overnight) cuts bills."
          >
            <p>
              The L3 designer's contribution to demand-side optimisation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Half-hourly meter</strong> — every site over 100 kW peak demand
                is on half-hourly metering. The data is available from the supplier or
                directly from the meter via the meter operator.
              </li>
              <li>
                <strong>Contract demand review</strong> — typically every 3-5 years.
                The diversity calc plus historic data argues the case for an increase
                or decrease.
              </li>
              <li>
                <strong>Demand response contracts</strong> — for large sites,
                aggregators (Limejump, Flexitricity, Octopus Flex) pay the customer to
                curtail load during system stress. Curtailable load needs to be
                identified — bulk freezers, EV fleet charging, non-critical compressors.
              </li>
              <li>
                <strong>On-site generation</strong> — PV plus battery shifts the
                customer's kVA peak away from the grid peak. The DNO sees a smoother
                profile; the customer sees a lower bill. The L3 designer covers the
                load assessment; the MCS-certified team designs the PV / battery
                installation.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.3(c) (Daily and yearly variation of demand)"
            clause="Designers shall account for daily and yearly variation of demand when determining circuit numbers and types. Seasonal or diurnal variations that affect loading and diversity shall be included in the design calculations and documented."
            meaning={
              <>
                For industrial sites, daily and yearly variation can be substantial — three-shift operation gives a different demand profile from single-shift; seasonal product mix changes the motor running pattern; maintenance shutdowns change the supply demand. The L3 designer documents the demand profile (typical, peak, low-season, shift-change transient) on the diversity calc page. This affects supply sizing, contract demand with the DNO, time-of-use tariff selection, and any demand-response contract.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.3(c)."
          />

          <Scenario
            title="Small machine workshop — 200 A three-phase service"
            situation={
              <>
                Workshop fit-out: 5 x 11 kW machine motors (DOL), 1 x 22 kW compressor (soft-start), 1 x 30 kW MIG welder (200 A peak, 30 percent duty), shop lighting 8 kW, sockets 12 kW, small office 5 kW. Existing 200 A three-phase service. Single-shift 08:00-17:00 typical; occasional weekend overtime. Customer expects production growth in year 2-3.
              </>
            }
            whatToDo={
              <>
                Diversity calc per category. Motors: largest 22 kW soft-start at FLC 41 A + 5 x 11 kW at running diversity 21 + 4 × 21 × 0.6 = 71 A. Total motor running ~112 A across all phases (37 A per phase if balanced). Compressor cyclic 50 percent duty: I_RMS = 41 × √0.5 = 29 A across phases (~10 A per phase). Welder 200 A peak at 30 percent duty: I_RMS = 110 A on welder phase (assume single-phase 230 V; if three-phase welder, distribute across phases). Lighting 8 kW = ~12 A per phase balanced. Sockets 12 kW × 0.6 (workshop typical) = 7.2 kW = ~10 A per phase. Office 5 kW × 0.7 = ~5 A per phase.
                {"\n\n"}
                Sum per phase (assume single-phase welder on L1): L1 = 37 + 10 + 110 + 12 + 10 + 5 = 184 A; L2 = 37 + 10 + 12 + 10 + 5 = 74 A; L3 = 37 + 10 + 12 + 10 + 5 = 74 A. Massive imbalance — welder dominates L1.
                {"\n\n"}
                Better: specify three-phase welder with rotating phase distribution OR move other loads to balance. With three-phase welder distributed: each line carries 37 A welder share added to motor, lighting and socket: L1 = L2 = L3 = ~110 A. Within 200 A service with 90 A margin — healthy.
                {"\n\n"}
                Starting coordination: largest motor (22 kW soft-start) starts. Soft-start limits to 144 A on the soft-start phase mix — acceptable. DOL of any 11 kW motor: 147 A peak. With sequence starting (one motor at a time), peak transient added to running ~110 A = 257 A for 2-3 seconds. Service rated 200 A — transient briefly exceeds. Either: (a) accept as transient (cut-out fuse will not blow on 30 percent over-rating for 2 seconds, but lighting may flicker); (b) soft-start the larger machine motors too; (c) upgrade to 250 A service for headroom. Recommend (b) — soft-start on the two largest machine motors, accept DOL on smaller. Sequence-start interlocked.
                {"\n\n"}
                Harmonic loading: soft-starts contribute moderate harmonics during the start ramp only; no continuous harmonic load. No mitigation needed. ENA G5/5 compliance assumed satisfactory based on no continuous VSD load. (Future state if VSD is added on large motor, revisit.)
                {"\n\n"}
                Growth: customer expects 20-30 percent growth in year 2-3. Current diversified Ib at 110 A per phase on 200 A service = 55 percent of rating. Growth to 145 A per phase still leaves 55 A margin. HOLD — service supports growth without upgrade. Document growth path.
              </>
            }
            whyItMatters={
              <>
                Industrial diversity calcs separate good designers from average ones. The above scenario has 4-5 different load profiles (continuous motor running, motor starting transient, cyclic compressor, cyclic welder, mixed lighting and socket) all interacting. Get the welder phase wrong and L1 trips on overload while L2 / L3 sit at half-load. Get the starting coordination wrong and the supply trips at every Monday morning warm-up. Get the growth allowance wrong and the customer pays for a rebuild in year 3. The L3 designer's diversity calc is what makes the difference.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Sizing supply on running diversity, forgetting starting transient"
            whatHappens={
              <>
                A designer calculates motor running diversity (5 motors × 0.6 coincidence × FLC), gets a sub-main Ib of 71 A, sizes the 80 A breaker and 25 mm² SWA. The first cold morning the largest motor starts DOL on top of the others running — peak transient of 200+ A for 3 seconds. The 80 A breaker trips, the 100 A cut-out blows, production stops for the morning.
              </>
            }
            doInstead={
              <>
                Always run the starting coordination check. For each significant motor (above ~5 kW), calculate the DOL or soft-start transient on top of the others running. The supply must absorb the worst-case transient briefly without tripping. Mitigations: sequence starting, soft-starts on the larger motors, supply upgrade. Document the chosen mitigation on the diversity calc page.
              </>
            }
          />

          <CommonMistake
            title="Putting a single-phase welder on one phase without balancing"
            whatHappens={
              <>
                A designer puts a 200 A peak welder on L1 of the workshop three-phase service, no balancing of other loads. RMS demand ~110 A on L1 alone; L2 and L3 carry 60-70 A. Heavy imbalance overloads L1 fuse during heavy welding day; voltage on L1 sags noticeably affecting other equipment.
              </>
            }
            doInstead={
              <>
                For heavy single-phase loads: (1) specify three-phase equivalent if available (three-phase welder, three-phase compressor); (2) if single-phase only, balance other loads by allocating heavy single-phase items to under-loaded phases; (3) for very large single-phase loads on a three-phase service, consider supply upgrade or contractual transfer of unbalanced load to the DNO. Show the per-phase balance on the design pack and target under-10-percent imbalance.
              </>
            }
          />

          <ConceptBlock
            title="Power factor — kW vs kVA, the two numbers the DNO bills on"
            plainEnglish="Industrial loads are rarely unity power factor. Motors run at 0.85 lagging when fully loaded, lower when lightly loaded. The supply has to deliver the apparent power (kVA = kW / cos φ), not just the active power (kW). The DNO bills industrial sites on capacity (kVA) plus consumption (kWh), so a poor power factor wastes both supply capacity and money. Power factor correction (PFC) capacitor banks bring the displaced reactive power closer to unity at the supply origin."
            onSite="Read the kW and kVA off the meter on a representative working day. Power factor = kW / kVA. Below 0.95 is worth correcting on commercial / industrial supplies. Bulk PFC at the main switchboard is typical; per-motor PFC for the largest machines reduces cable losses too. Sizing the PFC bank on a VSD-heavy site needs care — capacitors and harmonics interact and can resonate, amplifying voltage spikes. Detuned filter banks (capacitor + reactor) handle the harmonic interaction safely."
          >
            <p>
              Why power factor correction matters at the diversity calc:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply capacity</strong> — a 200 kVA service at 0.75 power factor
                delivers only 150 kW of active power. Correcting to 0.95 frees up 40 kW of
                useful capacity at no DNO cost.
              </li>
              <li>
                <strong>DNO availability charge</strong> — billed in kVA. Reducing the kVA
                drawn (without changing kW) cuts the standing charge each quarter.
              </li>
              <li>
                <strong>Cable and switchgear sizing</strong> — sized on amps which equal
                kVA / V. Reactive current heats the cable for no useful work; PFC reduces
                cable size on the next refurb.
              </li>
              <li>
                <strong>VSD interaction</strong> — VSDs draw distorted current at near
                unity power factor on the input. Mixing PFC capacitors with VSD-heavy sites
                without detuning reactors invites resonance — investigate with a PQ logger
                before specifying.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Voltage drop on industrial sub-mains — motor starting tightens the limit"
            plainEnglish="BS 7671 Appendix 4 typical voltage drop limits (3 percent for lighting, 5 percent for power) apply at running load. Industrial sub-mains have to deliver acceptable voltage during motor starting too — 6-8x FLC for a few seconds dragging the volts down at the motor terminals. If the running drop is at 4 percent and the starter pulls another 4 percent, the motor sees 92 percent of nominal and the contactor may chatter or the inverter may trip on undervolt."
            onSite="Compute voltage drop at running load and again at starting peak for the largest motor in the worst case. Round-trip impedance = R + jX of the sub-main + transformer Zps; multiply by starting current. If the starting drop pushes terminal voltage below 90 percent, mitigate — heavier cable, reduced-voltage starter (soft-start, star-delta, autotransformer), local capacitor support, or upstream supply upgrade. The L3 designer documents the worst-case starting drop on the design pack alongside the running drop."
          >
            <p>
              Common voltage-drop traps on industrial sub-mains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Long runs to remote plant</strong> — yard pumps, gatehouse,
                outbuilding compressors. 100 m of 35 mm² SWA on a 100 A sub-main loses
                more volts than the on-site DNO transformer impedance.
              </li>
              <li>
                <strong>DOL on a borderline supply</strong> — first motor of the day
                sees its own starting drop; the third motor in sequence sees the
                cumulative running drop plus its own starting drop.
              </li>
              <li>
                <strong>Welder strikes</strong> — instantaneous step from idle to full
                weld current causes a 5-15 percent dip on the welder phase. Adjacent
                circuits flicker; sensitive electronics may reset.
              </li>
              <li>
                <strong>Transformer Zps</strong> — small transformers (200-500 kVA) have
                4-6 percent impedance. The starting drop at the LV terminals is
                effectively the upstream motor inrush divided into the transformer
                impedance — bigger transformer, smaller drop.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Phase balancing on a three-phase install — design rules of thumb"
            plainEnglish="Three-phase loads are inherently balanced. Single-phase loads on a three-phase service have to be allocated across the three phases by the designer. The aim is to keep per-phase load imbalance under 10% — beyond that, neutral currents rise, voltage regulation across phases worsens, and protective device coordination becomes harder. Document the phase allocation on the design pack so the next designer (or a future extension) can preserve the balance."
            onSite="Group the single-phase loads by current draw, then deal them out three-at-a-time across L1 / L2 / L3. Bias the heaviest single-phase item to whichever phase has the lowest existing total. The layout is a Sudoku puzzle solved at design stage; getting it right at the start is far easier than re-balancing live."
          >
            <p>Phase-balance design heuristics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate per-phase total in amps after diversity.</li>
              <li>Target imbalance under 10% of the highest phase load.</li>
              <li>Allocate heavy single-phase loads (large welders, single-phase EV chargers) first to whichever phase is otherwise lightest.</li>
              <li>Distribute lighting and small-power circuits to fill remaining capacity per phase.</li>
              <li>Document the phase-by-phase schedule so future extensions can extend the balance rather than break it.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation)"
            clause="Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance (see also Chapter 46 and Section 537); (c) take account of hazards that may arise from the failure of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances (see also Chapter 44); (f) prevent the indirect energizing of a circuit intended to be isolated."
            meaning={
              <>
                Phase balancing aligns with Reg 314.1 — splitting and arranging circuits to
                contain fault impact and limit electromagnetic disturbance. A badly imbalanced
                three-phase install can produce neutral currents that disturb sensitive
                electronics and trigger nuisance protective-device operation. The regulation
                framework ties physical phase allocation back to the design objectives.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Industrial load assessment adds three layers: motor starting transients (DOL 6-8x FLC, soft-start 3-4x, VSD 1.5-2x), running coincidence + starting coordination across multiple motors, and harmonic loading from VSDs and rectifiers.",
              "Welders and compressors use cyclic / intermittent duty: I_RMS = I_peak × √duty_cycle. Sub-main and supply sized on RMS; circuit cable and protection sized for peak transient.",
              "Type B MCB nuisance-trips on motor inrush. Type C (5-10x In trip) for moderate inrush. Type D (10-20x In) for heavy inrush (large motors, welders, capacitor banks). Motor-rated fuses (gM) for DOL motor protection.",
              "Sequence starting prevents concurrent motor starts. Specify whenever multiple motors above ~5 kW could plausibly start simultaneously. Implement in MCC or via PLC.",
              "ENA EREC G5/5 sets harmonic distortion limits at the point of common coupling. VSD-heavy sites must measure or calculate THD and demonstrate compliance — line reactors, passive / active filters, or 12-pulse VSDs as mitigation.",
              "Reg 132.5 (Compatibility) covers supply impact of motor starting, welder transients and capacitor switching. Reg 132.3 covers daily and yearly variation, special conditions like harmonics. Both belong in the industrial diversity calc.",
              "Reg 311.2 (A4:2026) failure-mode requirement applies to industrial load curtailment, sequence starting and PFC schemes — assess the demand if the curtailment / sequencing fails.",
              "Industrial diversity calc page has more rows than commercial: motor running diversity per motor, starting coordination matrix, welder duty cycle (peak and RMS), compressor cycle, harmonic loading allowance, PFC pre/post and supply transient assumptions per source citation.",
            ]}
          />

          <Quiz title="Industrial load assessment — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Commercial load assessment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.6 Documentation + Reg 132.13
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
