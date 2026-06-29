/**
 * Module 6 · Section 3 · Subsection 2 — Protective device selection
 * Maps to C&G 2365-03 / Unit 305 / LO3 / AC 3.2
 *   AC 3.2 — "Select an appropriate protective device for a given circuit
 *             considering type, rating, breaking capacity, characteristic
 *             and discrimination"
 *
 * Layered depth: 2366-03 Unit 304 / AC 3.2; 5393-03 Unit 104 / AC 3.2
 *
 * BS 88 HRC fuses, BS EN 60898 MCBs, BS EN 61009-1 RCBOs. Type B / C / D
 * trip-curve selection. Breaking capacity coordination, discrimination
 * with upstream devices, and the BS 7671 A4:2026 wording around device
 * selection for Table 41.3 max Zs values (B32 = 1.37 ohms).
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

const TITLE = 'Protective device selection (3.2) | Level 3 Module 6.3.2 | Elec-Mate';
const DESCRIPTION =
  "Selecting the right protective device for a circuit. BS 88 HRC fuses, BS EN 60898 MCBs, BS EN 61009-1 RCBOs. Type B / C / D characteristics, breaking capacity, discrimination and the BS 7671 A4:2026 Table 41.3 max Zs figures (including B32 = 1.37 ohms).";

const checks = [
  {
    id: 'device-type',
    question:
      "A 6 A lighting circuit serving LED downlights with electronic drivers. The driver in-rush is high (200 A peak for 100 microseconds at switch-on across the full circuit). The right protective device characteristic is:",
    options: [
      "Type B 10 A — bump the rating so the higher thermal threshold rides through the in-rush.",
      "Type D 6 A — the 10-20 x In magnetic threshold is the only one high enough for LED in-rush.",
      "Type C 6 A — the 5-10 x In magnetic threshold stays clear of the LED driver in-rush.",
      "Type B 6 A with a 100 mA time-delayed RCD — the RCD delay absorbs the in-rush.",
    ],
    correctIndex: 2,
    explanation:
      "LED driver in-rush is the classic Type B nuisance-trip case. Type B trips magnetically at 3-5 x In; on a 6 A device that is 18-30 A, easily exceeded by the 200 A in-rush even though it lasts only microseconds. Type C trips at 5-10 x In (30-60 A on a 6 A device), so the magnetic trip stays clear of the in-rush. Increasing the rating (Type B 10 A) breaks cable protection; Type D is unnecessarily harsh and needs a very low Zs; the RCD does not influence magnetic tripping. The thermal overload protection is unchanged between Type B and Type C.",
  },
  {
    id: 'device-bcap',
    question:
      "A small commercial unit with 100 A intake, declared PSCC at the intake of 16 kA. The consumer unit is fed by 25 mm² T&E (impedance about 0.0072 ohms / m, run 8 m). The PSCC at the consumer unit busbar is approximately 13.8 kA. What breaking capacity must the MCBs in the consumer unit be?",
    options: [
      "10 kA Icn minimum — the 13.8 kA busbar PSCC exceeds 6 kA, so use 10 kA or BS 88 cascade.",
      "6 kA Icn — the 8 m of 25 mm² T&E limits busbar fault current to within the 6 kA rating.",
      "3 kA Icn — domestic-spec devices are 3 kA and the cut-out fuse handles the rest.",
      "Breaking capacity is irrelevant — the RCD disconnects before the MCB sees the fault current.",
    ],
    correctIndex: 0,
    explanation:
      "BS EN 60898 MCBs are commonly available in 6 kA and 10 kA Icn ratings. Domestic CU swaps where intake PSCC is in the 1-3 kA range can use 6 kA. Commercial units where the PSCC at the consumer unit busbar can reach 13-25 kA need 10 kA Icn devices, or cascade-coordinated protection where an upstream BS 88 fuse limits let-through energy to within the downstream MCB's Icn. Reg 434.5.1 mandates that the breaking capacity is at least the PSCC at the device (or that backup protection is provided that limits the prospective fault current to within the device rating).",
  },
  {
    id: 'device-discrim',
    question:
      "A B40 RCBO in the consumer unit is fed via a 100 A BS 88-3 main switch and main fuse. A short-circuit fault on a final circuit downstream of the RCBO. The discrimination outcome you want is:",
    options: [
      "Both the RCBO and the 100 A main fuse operate together, isolating the whole building so the fault cannot spread.",
      "Only the RCBO trips; the 100 A BS 88-3 main fuse stays intact, leaving the rest of the building's circuits running.",
      "Only the 100 A main fuse blows, because the larger device always operates first on a heavy short-circuit fault.",
      "Neither device operates — the fault current is shared so each sees less than its own rating and rides through.",
    ],
    correctIndex: 1,
    explanation:
      "Discrimination (also called selectivity) means that on a downstream fault only the immediate upstream device operates — not its upstream device. For our case the B40 RCBO clears the fault and the 100 A BS 88-3 main fuse stays intact. The whole building keeps power except the affected circuit. Discrimination requires coordinated time-current characteristics between the device and its upstream backup; for fuse-MCB combinations the discrimination is usually ensured by the fuse being substantially larger than the MCB (typically 1.6 x or more) and by the let-through energy I²t curves not crossing in the fault range.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "BS EN 60898 MCB Type B trips magnetically (instantaneous) at:",
    options: [
      "1.45 times the rated current (In) — the same multiple as the thermal overload trip point.",
      "3 to 5 times the rated current (In), suited to resistive and standard domestic loads.",
      "5 to 10 times the rated current (In), the lowest of the three trip-curve thresholds.",
      "2 to 3 times the rated current (In), reserved for the most sensitive lighting circuits.",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 60898 Type B trip characteristic: magnetic instantaneous trip between 3 x In and 5 x In. Suited to domestic and small commercial circuits without significant in-rush — lighting (incandescent and most LED drivers below the in-rush threshold), socket-outlets, fixed appliances. Type B is the default choice for residential CU work because most domestic loads sit comfortably below 3 x In during normal operation, and its lower magnetic threshold gives the fastest fault clearance for a given Zs.",
  },
  {
    id: 2,
    question: "BS EN 60898 Type C MCB trips magnetically at:",
    options: [
      "3 to 5 times the rated current, used on general domestic lighting and socket circuits.",
      "10 to 20 times the rated current, reserved for transformers and welding plant with severe in-rush.",
      "5 to 10 times the rated current, used on circuits with moderate in-rush such as LED arrays and small motors.",
      "4 to 7 times the rated current, the mid-range curve used only on motor circuits below 5 kW.",
    ],
    correctAnswer: 2,
    explanation:
      "Type C: magnetic instantaneous trip between 5 x In and 10 x In. Tolerates higher in-rush than Type B without nuisance tripping. The trade-off: requires a lower Zs (higher fault current) to achieve the same disconnection time as a Type B of the same rating, since fault current must reach 5-10 x In rather than 3-5 x In. The Table 41.3 max Zs for a Type C is therefore lower (more demanding) than for a Type B of the same rating.",
  },
  {
    id: 3,
    question: "BS EN 60898 Type D MCB trips magnetically at:",
    options: [
      "5 to 10 times In, used for moderate in-rush such as fluorescent banks and small motors.",
      "20 to 40 times In, the highest available curve, reserved for X-ray equipment only.",
      "3 to 5 times In, the standard domestic curve, suitable for any fixed appliance.",
      "10 to 20 times In, used for very high in-rush such as large transformers and heavy DOL motor starts.",
    ],
    correctAnswer: 3,
    explanation:
      "Type D: magnetic instantaneous trip between 10 x In and 20 x In. Reserved for circuits with severe in-rush — large step-up transformers, welder primaries, heavy DOL motor starts, X-ray equipment. Requires very low Zs to achieve the disconnection time, often making Type D impractical at the end of long radial runs. For most domestic and commercial work, Type D is not the right answer; Type C plus careful coordination is.",
  },
  {
    id: 4,
    question: "What does Reg 434.5.1 require regarding protective device breaking capacity?",
    options: [
      "The rated breaking capacity shall be at least the prospective fault current at the device, unless cascade backup limits the let-through energy.",
      "The breaking capacity shall be at least the design current Ib, so the device can interrupt its own normal load.",
      "The breaking capacity shall be at least 1.45 times the cable's current-carrying capacity Iz, matching overload coordination.",
      "The breaking capacity shall be at least twice the rated current In, giving a margin against nuisance overload operation.",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 434.5.1 requires that the breaking capacity of a protective device equals or exceeds the prospective fault current at the point of installation, unless backup protection (a coordinated upstream device with let-through energy within the downstream device's rating) is provided. For domestic where intake PSCC is in the 1-3 kA range, 6 kA Icn MCBs are sufficient. For commercial where PSCC at the busbar can be 13-25 kA, either 10 kA Icn MCBs or a cascade scheme with an upstream BS 88 fuse is required.",
  },
  {
    id: 5,
    question: "BS 7671 A4:2026 Table 41.3 maximum Zs for a Type B 32 A MCB on a 230 V system (Cmin 0.95) is approximately:",
    options: [
      "2.30 ohms — the full nominal 230 V supply divided by the 100 A overload threshold.",
      "1.37 ohms — the A4:2026 figure with Cmin = 0.95 applied (older editions were higher).",
      "0.68 ohms — the figure for a Type C 32 A device, which shares the Type B max Zs.",
      "4.37 ohms — the disconnection-time value before the magnetic trip threshold is considered.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671:2018+A4:2026 Table 41.3 gives the maximum Zs for a Type B 32 A MCB at 1.37 ohms on a 230 V system, calculated with Cmin = 0.95 (worst-case low supply voltage allowance). The value derives from: minimum fault current to ensure 5 x In magnetic trip = 5 x 32 = 160 A; with Cmin x V = 0.95 x 230 = 218.5 V, max Zs = 218.5 / 160 = 1.366 ohms, rounded to 1.37. Older editions used Cmin near 1.0 and quoted around 1.44 ohms; A4:2026 hardened the figure. Always design to the current Table 41.3 from the active edition.",
  },
  {
    id: 6,
    question: "An RCBO (BS EN 61009-1) provides:",
    options: [
      "Residual current protection only, with no overcurrent function — it needs a separate MCB on the same circuit.",
      "Overcurrent protection only — effectively an MCB with higher breaking capacity and no residual current sensing.",
      "Combined overcurrent (like an MCB) and residual current protection (like an RCD) in a single device.",
      "Arc fault detection combined with overcurrent protection, replacing the need for a separate AFDD.",
    ],
    correctAnswer: 2,
    explanation:
      "BS EN 61009-1 RCBO = Residual Current Breaker with Overcurrent. Combines an MCB (BS EN 60898) with an RCD (BS EN 61008) in one module. Common ratings: 6, 10, 16, 20, 25, 32, 40, 50 A; Type B or C overcurrent characteristic; 30 mA Type A or Type F (UK domestic standard) or Type B (EV charging on TN-C-S). RCBOs are the modern domestic and small commercial standard because they isolate the affected circuit only on a residual current event, rather than a whole-board RCD trip taking down everything.",
  },
  {
    id: 7,
    question: "A BS 88 HRC fuse has the advantage over an MCB of:",
    options: [
      "Re-settability after a fault — the fuse can be reset by hand like an MCB, avoiding the need for spares.",
      "A built-in switching function, isolating the circuit for maintenance without a separate switch.",
      "Integrated residual current protection, removing the need for a separate RCD on the protected circuit.",
      "Substantially higher breaking capacity (typically 50-80 kA) with fast I²t let-through and clean cascade.",
    ],
    correctAnswer: 3,
    explanation:
      "BS 88 HRC (high-rupturing capacity) fuses have several real advantages: breaking capacity routinely 50-80 kA (vs 6-10 kA for BS EN 60898 MCBs), very fast I²t let-through on heavy faults (the fuse element vaporises in milliseconds, limiting downstream energy), and clean cascade coordination with downstream MCBs. Disadvantages: must be replaced after operation, no overcurrent re-set, no built-in switching function. The compromise on most modern installations is a BS 88 main fuse at the origin (provides high-PSCC fault clearance and cascade backup) with BS EN 60898 MCBs / RCBOs downstream (give per-circuit isolation and switching).",
  },
  {
    id: 8,
    question: "On the design schedule, the protective device row for a 32 A radial socket circuit on a 230 V TN-C-S supply should record:",
    options: [
      "Type, rating, breaking capacity, characteristic, RCD class if combined, design max Zs, and manufacturer / part number.",
      "The rating only (32 A) — type, breaking capacity and RCD class are chosen by the installer from whatever is in the van.",
      "The measured Zs and RCD trip time from testing — the design row is filled in only after installation and testing.",
      "The cable CSA and length only — the protective device is implied by the cable size and needs no separate spec.",
    ],
    correctAnswer: 0,
    explanation:
      "The protective device row on the cable schedule has to be specific enough that any future designer or inspector can verify the choice. Type, rating, breaking capacity, characteristic, RCD class if combined, max Zs design figure, manufacturer / part number. 'MCB 32 A' is a guess, not a specification. The same is true at construction stage: the installer needs the spec to order the right part, and the inspector needs it to verify the installed device matches the design.",
  },
];

const faqs = [
  {
    question: "Can I use a BS 3036 rewireable fuse on a new circuit design?",
    answer:
      "Almost never on new design work. BS 3036 rewireable (semi-enclosed) fuses are still permitted by BS 7671 in specific replacement contexts, but for new design work they are unsuitable: low and uncertain breaking capacity (typically 1-2 kA), poor coordination with downstream protection, slow operation on faults, and operator hazards (replacing wire while live is unsafe practice). Modern design uses BS 88 HRC for high-current, BS EN 60898 MCBs / BS EN 61009-1 RCBOs for distribution, and never BS 3036 rewireable. Periodic inspection of installations with surviving BS 3036 boards typically codes them C3 (improvement recommended) or C2 if other Code-2 issues compound.",
  },
  {
    question: "How do I choose between RCBO 30 mA Type A, F and B?",
    answer:
      "Type AC was the original (covers AC residual currents only) and is largely obsolete in BS 7671 A4:2026 — most modern installations require Type A as a minimum. Type A covers AC plus pulsating DC residual currents (essential for circuits with rectifier loads — most LED lighting, computers, kitchen appliances). Type F adds covering of mixed-frequency residual currents from single-phase VSDs and inverters (specified for circuits feeding washing machines, dishwashers, induction hobs). Type B covers smooth DC residual currents (essential for EV charging on TN-C-S supply per Reg 722.531.3.101 — either the charger has internal Type B equivalent monitoring or an external Type B RCD is fitted). Default for new domestic CU: Type A 30 mA across all final circuits, with Type B specifically on the EV charger circuit.",
  },
  {
    question: "What breaking capacity should I specify for a domestic CU upgrade?",
    answer:
      "Check the declared PSCC at the meter — if the DNO has not declared, treat it as 16 kA per the standard assumption for domestic supplies on PME (a conservative value; actual PSCC at most domestic intakes is in the 1-3 kA range). For a domestic CU served by a BS 88 cut-out fuse at the intake, a 6 kA Icn BS EN 60898 MCB / RCBO is normally sufficient because the cut-out fuse provides cascade backup and limits let-through energy to within the MCB's rating. For commercial work or for unusually short service-line installations where PSCC is high, specify 10 kA Icn or use BS 88 fuses for distribution. The schedule should record the assumed PSCC and the declared Icn alongside the device type.",
  },
  {
    question: "When is a Type C MCB the right choice over Type B?",
    answer:
      "Type C is right when in-rush exceeds the Type B 3-5 x In magnetic trip threshold but is well within the Type C 5-10 x In threshold. Common cases: LED arrays with high in-rush drivers (large warehouse / commercial lighting installs), fluorescent banks (older magnetic-ballast fittings or larger contactor-controlled banks), small motor circuits below 5 kW where the FLC plus starting transient sits in the Type C window, transformer-fed equipment (small distribution transformers, signage). Type C is not the default — use Type B for general domestic and small commercial unless a specific circuit needs the higher magnetic threshold. The trade-off is that Type C requires a lower Zs to meet the disconnection time, since fault current has to reach 5-10 x In rather than 3-5 x In.",
  },
  {
    question: "How does the BS 7671 A4:2026 Cmin 0.95 figure change my Table 41.3 design?",
    answer:
      "Cmin is the minimum supply voltage factor used in fault-current calculations to give a conservative (higher Zs / lower fault current) result. A4:2026 sets Cmin at 0.95 (so design fault voltage is 0.95 x 230 = 218.5 V). The Table 41.3 maximum Zs values are derived from this Cmin. Compared with older editions that used Cmin near 1.0, the A4:2026 figures are tighter — a Type B 32 A maximum Zs is 1.37 ohms in A4:2026 versus around 1.37 ohms in older editions. Always design to the current edition's Table 41.3 and document the Cmin assumption on the calc. Periodic inspection of older installations: code based on the edition in force at the time of design / installation, not retrospectively.",
  },
  {
    question: "Should I use RCBOs or a single board-mounted RCD with MCBs?",
    answer:
      "RCBOs (one per final circuit) are the modern standard for new domestic CUs and small commercial installations, for one substantial reason: discrimination and convenience on a residual current event. With board-mounted RCDs (one or two RCDs covering the whole board), a residual current event on any circuit takes down every circuit on that RCD — fridges, freezers, alarms, the whole floor of lights. With per-circuit RCBOs, the fault clears its own circuit and the rest stays alive. The cost difference is marginal on a new build; the user-experience and safety difference is large. Reg 314.1 (separation into circuits) effectively favours per-circuit RCD discrimination on any installation where circuit loss has real consequence.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 2"
            title="Protective device selection — fuse, MCB, RCBO"
            description="Selecting the right protective device for a circuit. BS 88 HRC fuses, BS EN 60898 MCBs, BS EN 61009-1 RCBOs. Type B / C / D characteristics, breaking capacity, discrimination, and the BS 7671 A4:2026 Table 41.3 max Zs figures (including B32 = 1.37 ohms)."
            tone="amber"
          />

          <TLDR
            points={[
              "Three protective device families dominate UK LV: BS 88 HRC fuses (high breaking capacity, cascade backup), BS EN 60898 MCBs (per-circuit overcurrent protection), and BS EN 61009-1 RCBOs (combined overcurrent + RCD).",
              "MCB / RCBO trip characteristics: Type B (3-5 x In magnetic) for general domestic; Type C (5-10 x In) for moderate in-rush; Type D (10-20 x In) for severe in-rush. Higher characteristic = higher fault current required = lower max Zs.",
              "BS 7671 A4:2026 Table 41.3 max Zs for a Type B 32 A on 230 V is 1.37 ohms (with Cmin 0.95). Older editions quoted around 1.44 ohms — design to the current edition's figure.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish the three principal UK LV protective device families — BS 88 HRC fuses, BS EN 60898 MCBs and BS EN 61009-1 RCBOs — by trip characteristic, breaking capacity and typical application.",
              "Select Type B, Type C or Type D MCB / RCBO based on the circuit's in-rush profile and the available Zs to achieve the required disconnection time.",
              "Verify protective device breaking capacity (Icn for MCBs, breaking capacity for fuses) against the prospective fault current at the device (Reg 434.5.1), and recognise when cascade backup is required.",
              "Look up and apply BS 7671 A4:2026 Table 41.3 maximum Zs values for ADS verification, including the current B32 = 1.37 ohms figure with Cmin 0.95.",
              "Coordinate downstream protective devices with their upstream backup to achieve discrimination on a fault and maintain supply to unaffected circuits.",
              "Specify protective devices on the cable schedule with type, rating, breaking capacity, characteristic, RCD class if combined, and the design maximum Zs — sufficient that any future designer or inspector can verify the choice.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The three device families and what they do"
            plainEnglish="A fuse is a sacrificial element that vaporises on fault. An MCB is a re-set magnetic-thermal switch. An RCBO is an MCB plus an RCD in one module."
            onSite="Modern UK domestic and small commercial work uses RCBOs almost exclusively for final circuits; BS 88 fuses dominate at the origin (DNO cut-out, supply intake) and on commercial distribution; MCBs without integrated RCD are increasingly relegated to circuits where RCD protection is not required."
          >
            <p>
              <strong>BS 88 HRC fuse</strong> — high-rupturing-capacity fuse standard used at
              installation origins, distribution boards and on commercial circuits. The element
              vaporises in milliseconds on a heavy fault, providing very high breaking capacity
              (commonly 50-80 kA for BS 88-3 / BS 88-2). One-shot device — must be replaced after
              operation. No switching function, no integrated RCD. Used for: DNO cut-out at the
              intake (typically 100 A BS 88-3), main switch fuses at distribution boards, motor
              circuit protection on industrial sites, cascade backup for downstream MCBs in
              high-PSCC environments.
            </p>
            <p>
              <strong>BS EN 60898 MCB</strong> — miniature circuit breaker with magnetic
              instantaneous trip and thermal overload trip in one module. Re-settable. Common
              ratings 6, 10, 16, 20, 25, 32, 40, 50, 63 A. Trip characteristics Type B (3-5 x In),
              Type C (5-10 x In), Type D (10-20 x In). Common breaking capacity (Icn) 6 kA or
              10 kA. Used for: per-circuit overcurrent on distribution boards where RCD protection
              is provided separately or not required.
            </p>
            <p>
              <strong>BS EN 61009-1 RCBO</strong> — combined RCD (residual current device) and MCB
              in one module. Same overcurrent ratings as MCBs, plus a residual current trip
              threshold (typically 30 mA for additional protection on socket-outlets and lighting).
              RCD types: AC (legacy), A (now minimum for most circuits), F (for mixed-frequency
              residual from single-phase inverters / VSDs), B (for smooth DC residual, required on
              EV charging without internal Type B monitoring per Reg 722). Used for: per-circuit
              combined overcurrent + RCD protection — modern domestic and small commercial
              standard.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.201 (Coordination with standard protective devices)"
            clause="Where the protective device is a general-purpose type (gG) fuse to BS 88-2, a fuse to BS 88-3, a circuit-breaker to BS EN 60898, a circuit-breaker to BS EN 60947-2 or a residual current circuit-breaker with integral overcurrent protection (RCBO) to BS EN 61009-1, compliance with conditions (a) and (b) also results in compliance with condition (c) of Regulation 433.1.1."
            meaning={
              <>
                Reg 433.1.201 is the practical short-cut that flows from 433.1.1: when the
                installed protective device is one of the listed standard types — BS 88 fuse,
                BS EN 60898 MCB, BS EN 60947-2 MCCB, or BS EN 61009-1 RCBO — meeting the
                In ≥ Ib and In ≤ Iz conditions automatically satisfies the I2 ≤ 1.45 × Iz
                rule. That is why the device standards listed in this Sub (BS EN 60898 MCB,
                BS EN 60947-2 MCCB, BS EN 61009-1 RCBO) dominate UK distribution boards: pick
                the standard device, size to In, and overload coordination falls out for free.
                A non-listed device or a BS 3036 semi-enclosed fuse needs the additional
                0.725 × Iz check from 433.1.202.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.201."
          />

          <SectionRule />

          <ContentEyebrow>Trip characteristics — Type B, C and D</ContentEyebrow>

          <ConceptBlock
            title="Type B — general domestic and small commercial"
            plainEnglish="Magnetic trip at 3-5 x In. Default choice for residential CU work — lighting, sockets, fixed appliances, immersions, EV chargers (paired with appropriate RCD)."
          >
            <p>
              Type B trip curve highlights:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Thermal overload — operates within the standard time-current envelope (1.13 x In = no trip in 1 hour, 1.45 x In = trip within 1 hour for In greater than 32 A or within 2 hours for In less than or equal to 32 A).</li>
              <li>Magnetic instantaneous — operates between 3 x In and 5 x In within 100 ms.</li>
              <li>Disconnection time at 5 x In on most Type B devices is in the order of 0.1 s, well within the 0.4 s requirement for socket-outlet final circuits up to 63 A on a 230 V system (Reg 411.3.1.2 and Table 41.1).</li>
            </ul>
            <p>
              Type B is the default for residential CU work because most domestic loads sit
              comfortably below 3 x In during normal operation. Lighting, socket-outlet rings,
              cooker, immersion, shower, EV charger (with appropriate RCD class) — all suited to
              Type B at the conventional ratings. The lower magnetic threshold also gives the
              fastest fault clearance for a given Zs, which means the maximum Zs for ADS
              compliance is the most permissive of the three characteristics.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Type C — moderate in-rush"
            plainEnglish="Magnetic trip at 5-10 x In. Used when in-rush would nuisance-trip a Type B but does not justify the harshness of Type D."
          >
            <p>
              Common Type C applications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LED arrays with high in-rush drivers (large commercial / warehouse lighting installations where multiple drivers all energise at once).</li>
              <li>Fluorescent banks with magnetic ballasts (legacy fittings, larger contactor-controlled installations).</li>
              <li>Small motor circuits below 5 kW where DOL starting transient pushes Type B threshold (for larger motors use motor protection circuit breakers, MPCBs, with adjustable thermal and magnetic settings).</li>
              <li>Transformer-fed equipment — small distribution transformers, signage with internal step-down transformers.</li>
            </ul>
            <p>
              The trade-off: Type C requires a lower Zs (higher fault current) to achieve the
              same disconnection time as a Type B of the same rating. Table 41.3 max Zs for a
              Type C 32 A is roughly half that of a Type B 32 A on the same supply. On long
              radial runs the lower max Zs can be the limiting design factor — sometimes forcing
              a larger cable than the thermal calc alone would require.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Type D — severe in-rush"
            plainEnglish="Magnetic trip at 10-20 x In. Industrial use only — large transformers, welders, X-ray plant, heavy DOL motor starts."
          >
            <p>
              Type D is reserved for circuits with severe in-rush — typically 10-20 x rated current
              for several cycles. Common applications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Large step-up / isolating transformers (10 kVA upwards).</li>
              <li>Welder primaries, particularly resistance welders with very heavy in-rush.</li>
              <li>X-ray equipment — pulsed loads with extreme peak demand.</li>
              <li>Heavy DOL motor starts on industrial machines with high inertia (larger compressors, pumps with reciprocating loads).</li>
            </ul>
            <p>
              Type D requires very low Zs to meet ADS. On most domestic and commercial supplies
              the Zs available cannot meet a Type D max Zs at the end of a radial run — Type D is
              effectively impractical outside short, low-impedance industrial distribution. For
              most heavy-in-rush applications outside of specialist industrial, the design answer
              is Type C plus careful cable / Zs design rather than Type D.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Breaking capacity and Reg 434.5.1</ContentEyebrow>

          <ConceptBlock
            title="Breaking capacity — Icn, Icu and Ics"
            plainEnglish="The fault current the device can interrupt without exploding. Get this wrong and the device fails violently on a real fault."
            onSite="Domestic 6 kA Icn is sufficient for almost all UK domestic installations because the DNO cut-out fuse provides cascade backup and limits PSCC at the consumer unit busbar to within the MCB rating. Commercial work needs to be checked properly."
          >
            <p>
              For BS EN 60898 MCBs there is one main rating: Icn — rated short-circuit breaking
              capacity. Common values 6 kA and 10 kA. The device is type-tested at this current and
              is guaranteed to interrupt it once. (After operating at Icn the device may be
              damaged and need replacing — distinct from operating at the lower 'service' rating
              where it remains usable.)
            </p>
            <p>
              For BS EN 60947-2 MCCBs (moulded-case circuit breakers, used at higher ratings on
              commercial / industrial distribution) there are two ratings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Icu — ultimate short-circuit breaking capacity. Device interrupts the fault but is then expected to be replaced.</li>
              <li>Ics — service short-circuit breaking capacity. Device interrupts the fault and remains in service. Typically Ics = 100 percent, 75 percent or 50 percent of Icu depending on device class.</li>
            </ul>
            <p>
              For BS 88 fuses the relevant rating is the rated breaking capacity, typically 50-80
              kA for BS 88-3 / BS 88-2 — comfortably above any LV PSCC encountered in practice.
              That high breaking capacity is why BS 88 fuses dominate at the origin: they handle
              the maximum credible PSCC and provide cascade backup for downstream lower-rated MCBs.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 434.5.1 (Breaking capacity)"
            clause="The rated short-circuit breaking capacity shall be not less than the prospective fault current at the point at which the device is installed, except where backup protection is provided. In the case where backup protection is provided, the characteristics of the devices shall be coordinated so that the energy let through by the upstream device does not exceed that which can be withstood without damage by the downstream device and the conductors protected by it."
            meaning={
              <>
                Reg 434.5.1 sets the breaking capacity rule: every protective device must either
                rate above the prospective fault current at its location, or be backed up by an
                upstream device whose let-through energy is within the downstream device's
                withstand. The cascade option lets a 6 kA Icn MCB sit downstream of a BS 88 main
                fuse on a circuit where the busbar PSCC is 13 kA, provided the manufacturer's
                cascade tables show the combination is type-tested. Without cascade, the device
                Icn must equal or exceed the PSCC.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 434.5.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Discrimination and Table 41.3</ContentEyebrow>

          <ConceptBlock
            title="Discrimination — clearing the smallest area on a fault"
            plainEnglish="On a fault, the immediate upstream device clears it. Devices further upstream stay closed. The unaffected circuits keep running."
          >
            <p>
              Discrimination (also called selectivity) is the design intent that on any downstream
              fault, only the immediate upstream device operates. The rest of the system stays
              alive. The opposite of discrimination is cascade tripping, where a downstream fault
              takes down its upstream feeder and possibly the whole board — bad for users, bad for
              fault diagnosis, bad for the periodic inspection report.
            </p>
            <p>
              Discrimination is achieved by coordinating time-current characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fuse upstream of MCB — typically discriminates if fuse rating is at least 1.6 x MCB rating, AND I²t curves do not cross in the fault range. Manufacturer's cascade tables confirm.</li>
              <li>MCB upstream of MCB — harder. Type-tested combinations are required for full discrimination at fault levels; partial discrimination at overload is typical.</li>
              <li>RCD time-delay (selective S-type 100 ms or general 30 ms) — for discrimination between RCDs in series, the upstream RCD is time-delayed (S-type) so the downstream 30 mA operates first.</li>
              <li>BS 88 fuse upstream of BS 88 fuse — typically discriminates if upstream fuse is at least 1.6 x downstream rating; manufacturer tables confirm.</li>
            </ul>
            <p>
              The L3 designer's job: identify the discrimination scheme on the design pack, cite
              the manufacturer's cascade tables for any non-obvious combination, and make sure the
              installation will behave as intended on a fault. On critical installations (data
              centres, hospitals, life-safety) a mis-coordinated cascade trip can be a notifiable
              event.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Table 41.3 — maximum Zs for ADS"
            plainEnglish="The maximum loop impedance at which the protective device clears a fault within the required disconnection time. Calculated from supply voltage, Cmin and the device's magnetic trip current."
            onSite="The single most-checked figure in design verification. If your calculated Zs at the end of a circuit exceeds the Table 41.3 max for the chosen device, ADS does not work — re-design with a larger cable, a different device characteristic or RCD-based ADS."
          >
            <p>
              Table 41.3 of BS 7671 gives the maximum measured / design Zs for each common
              protective device at which ADS is achieved within the Table 41.1 disconnection time
              (typically 0.4 s for socket-outlet circuits up to 63 A, 5 s for distribution and
              fixed-equipment circuits at the relevant rating). Selected current values in
              BS 7671:2018+A4:2026 (calculated with Cmin = 0.95):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS EN 60898 Type B 6 A — max Zs approx 7.28 ohms.</li>
              <li>BS EN 60898 Type B 16 A — max Zs approx 2.73 ohms.</li>
              <li>BS EN 60898 Type B 20 A — max Zs approx 2.18 ohms.</li>
              <li>BS EN 60898 Type B 32 A — max Zs approx 1.37 ohms (this is the A4:2026 value with Cmin 0.95; older editions quoted approx 1.44 ohms).</li>
              <li>BS EN 60898 Type B 40 A — max Zs approx 1.09 ohms.</li>
              <li>BS EN 60898 Type C 16 A — max Zs approx 1.37 ohms (Type C 16 A roughly equivalent to Type B 32 A in max Zs because of higher 5-10 x In magnetic threshold).</li>
              <li>BS EN 60898 Type C 32 A — max Zs approx 0.68 ohms.</li>
              <li>BS EN 60898 Type D 32 A — max Zs approx 0.34 ohms.</li>
            </ul>
            <p>
              Why A4:2026 changed the figures: Cmin was hardened from approximately 1.0 in older
              editions to 0.95 in A4:2026 to give a more conservative fault-current calculation.
              The maximum Zs reduces by the same ratio. Always design to the current edition's
              Table 41.3 — citing an out-of-date max Zs on a new design is a verification finding
              waiting to happen.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Automatic disconnection in case of a fault)"
            clause="A protective device shall automatically interrupt the supply to the line conductor of a circuit or equipment in the event of a fault of negligible impedance between the line conductor and an exposed-conductive-part or a protective conductor in the circuit or equipment within the disconnection time required by Regulation 411.3.2."
            meaning={
              <>
                Reg 411.3.1.1 mandates ADS — automatic disconnection of supply on an earth fault.
                The device that does the disconnecting must operate within the Table 41.1 time
                (0.4 s for socket-outlet circuits up to 63 A on 230 V, 5 s for distribution and
                fixed-equipment circuits at rated current up to 32 A). The Zs at the fault point
                must be low enough that fault current reaches the device's magnetic trip threshold
                — Table 41.3 gives the max Zs for each common device that satisfies this.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1. See also Regulations 411.3.1.2 and 411.3.2 for circuits in scope of Table 41.1 and disconnection times."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Specifying Type B on a circuit with high LED in-rush, then debugging nuisance trips for months"
            whatHappens={
              <>
                You spec Type B 6 A on a corridor lighting circuit serving twenty LED downlights.
                The drivers all energise simultaneously when the lighting circuit is switched on
                from the wall switch. Combined in-rush per driver typically 10-20 A peak for tens
                of microseconds; combined across twenty fittings this comfortably exceeds the
                Type B 6 A magnetic threshold of 18-30 A. The breaker trips on switch-on every
                third or fourth time. The customer demands a fix; you swap the breaker, the
                installer swaps the lamps, the fault persists.
              </>
            }
            doInstead={
              <>
                On any LED lighting circuit with more than a handful of drivers, calculate the
                aggregate in-rush from the manufacturer's per-driver in-rush figure. If the total
                in-rush exceeds the Type B threshold for the chosen rating, switch to Type C — the
                magnetic trip moves up to 5-10 x In, comfortably above the in-rush. Verify the
                Zs is low enough for Type C max Zs (about half the Type B figure) — if not, either
                upsize the cable or split the lighting circuit into smaller groups so each switched
                section has fewer drivers and lower aggregate in-rush.
              </>
            }
          />

          <CommonMistake
            title="Using a 6 kA Icn MCB at a commercial CU busbar where PSCC is actually 14 kA"
            whatHappens={
              <>
                You install a 6 kA Icn domestic-spec MCB on a commercial board, assuming intake
                fuse cascade is sufficient. The intake fuse is BS 88-3 100 A but the supply is a
                short-run dedicated cable from the substation, declared PSCC 14 kA at the busbar.
                On a downstream short-circuit fault the BS 88 fuse limits let-through but the
                actual fault current at the MCB peaks above 6 kA — the device fails violently
                rather than interrupting cleanly, sending the case across the panel.
              </>
            }
            doInstead={
              <>
                Always check the declared or measured PSCC at the device's installed point. If it
                exceeds the device's Icn, either upsize the device (10 kA Icn BS EN 60898 MCBs are
                widely available, 25 kA MCCBs available for higher-rated distribution) or use
                cascade-coordinated protection where the upstream device's let-through energy is
                proven by manufacturer cascade tables to be within the downstream device's
                withstand. The schedule must record the assumed PSCC, the device Icn, and the
                cascade table reference if applicable.
              </>
            }
          />

          <Scenario
            title="Domestic CU upgrade — protective device specification page-by-page"
            situation={
              <>
                Same brief as Sub 3.1. New consumer unit with shower (45 A circuit), EV charger
                (32 A circuit), heat pump (40 A circuit), existing lighting and sockets, kitchen
                ring final and cooker. TN-C-S supply with declared Ze 0.35 ohms, PSCC at intake
                approximately 6 kA after intake fuse cascade.
              </>
            }
            whatToDo={
              <>
                Spec each device explicitly on the schedule. Shower: BS EN 61009-1 RCBO 50 A Type
                B, 6 kA Icn, 30 mA Type A — design max Zs per Table 41.3 Type B 50 A approx
                0.87 ohms. EV charger: BS EN 61009-1 RCBO 32 A Type B, 6 kA Icn, 30 mA Type B
                (required for EV on TN-C-S per Reg 722.531.3.101 unless charger has internal Type
                B equivalent monitoring) — design max Zs Type B 32 A approx 1.37 ohms. Heat pump:
                BS EN 61009-1 RCBO 40 A Type C, 6 kA Icn, 30 mA Type A — Type C handles compressor
                inrush — design max Zs Type C 40 A approx 0.55 ohms. Lighting: BS EN 61009-1 RCBO
                6 A Type B (or Type C if LED-array circuit), 30 mA Type A. Sockets ring: RCBO
                32 A Type B, 30 mA Type A. Cooker: RCBO 32 A Type B, 30 mA Type A. Each row on the
                schedule names manufacturer / part number, breaking capacity, characteristic, RCD
                class and design max Zs.
              </>
            }
            whyItMatters={
              <>
                The schedule is the spec the installer orders to and the inspector verifies
                against. A vague 'MCB 32 A' line on the schedule is an inviting fit-anything-on-
                hand error. Specific lines — BS EN 61009-1 Type B 32 A 6 kA 30 mA Type A
                manufacturer X part Y — are how design discipline shows up in the installed
                product. The same discipline applies to commercial and industrial work; the
                ratings and types vary, the discipline does not.
              </>
            }
          />

          <ConceptBlock
            title="Special-case devices — AFDD, MPCB, fuse-switch combination"
            plainEnglish="Beyond the BS 88 / MCB / RCBO triangle there are specialised devices for specific design problems."
          >
            <p>
              <strong>AFDD (Arc Fault Detection Device, BS EN 62606)</strong> — detects series arc
              faults that an OPD or RCD does not see. Recommended (not yet mandatory in BS 7671)
              by Reg 421.1.7 in AC final circuits to mitigate fire risk. Available as standalone
              device or combined AFDD+RCBO module. See Sub 3.3 for full design treatment. HRRBs
              under Building Safety Act 2022 are likely to harden this recommendation into a
              requirement.
            </p>
            <p>
              <strong>MPCB (Motor Protection Circuit Breaker, BS EN 60947-2 / -4-1)</strong> —
              adjustable thermal overload (typically 0.7-1.0 x In adjustable) and adjustable
              magnetic trip (typically 12-13 x In fixed). Used on industrial motor circuits for
              fine-grain motor protection coordinated with the motor's thermal time constant.
              Often paired with a contactor for DOL switching, replacing the older
              fuse-plus-overload combination.
            </p>
            <p>
              <strong>Fuse switch / switch fuse</strong> — combination of BS 88 fuse and isolating
              switch in one enclosure. Main switch fuse at distribution boards, main intake fuses
              on commercial sites. Provides switching function (which a bare fuse does not),
              high breaking capacity (which an MCB at the same rating does not), and clean
              cascade for downstream MCBs.
            </p>
            <p>
              <strong>Earth fault relay (BS EN 60947-2 with shunt trip)</strong> — high-current
              circuit breaker with current transformer and earth fault relay providing summative
              earth fault protection at higher RCD thresholds (300 mA, 500 mA) on TT or large TN
              installations where 30 mA additional protection is provided per circuit downstream.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The 'design Zs' figure — calculating it for verification"
            plainEnglish="At design stage you calculate the worst-case Zs at the end of every circuit. The figure must be at or below the Table 41.3 max for the chosen device. The installation is then verified at handover by measurement."
          >
            <p>
              Design Zs at the end of a circuit:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              Zs = Ze + (R1 + R2) x correction factors
            </p>
            <p>
              Where:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ze = declared (or measured) external loop impedance at the supply origin (typically 0.35 ohms TN-C-S, up to 0.8 ohms TN-S, 100 ohms or higher TT).</li>
              <li>R1 = phase conductor resistance per metre x circuit length, looked up in OSG Table I1 / IET tables.</li>
              <li>R2 = CPC resistance per metre x circuit length, same source.</li>
              <li>Correction factor for conductor temperature at the time of fault — typically 1.20 for 70 deg C thermoplastic insulation (the cable warms during the fault before disconnection).</li>
              <li>(In some calculation methods Cmin x V is used in the disconnection-current calculation rather than as a Zs multiplier; the result is equivalent.)</li>
            </ul>
            <p>
              Worked example: a Type B 32 A RCBO on a 25 m run of 4 mm² T&E (2.5 mm² CPC) on a
              TN-C-S supply with declared Ze 0.35 ohms. R1 = 4.6 milliohm/m at 70 deg C x 25 = 0.115
              ohms. R2 = 7.4 milliohm/m at 70 deg C x 25 = 0.185 ohms. Zs = 0.35 + 0.115 + 0.185 =
              0.65 ohms. Table 41.3 max for Type B 32 A is 1.37 ohms. Zs design = 0.65 ohms,
              comfortably within max — ADS verified at design stage. Measured Zs at handover (cold
              cable, ambient) will be lower than 0.65 ohms, comfortably within the design figure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three protective device families dominate UK LV: BS 88 HRC fuses (high breaking capacity, cascade backup), BS EN 60898 MCBs (per-circuit overcurrent), and BS EN 61009-1 RCBOs (combined overcurrent + RCD).",
              "Type B (3-5 x In magnetic): default for residential and small commercial. Type C (5-10 x In): moderate in-rush — LED arrays, fluorescent banks, small motors. Type D (10-20 x In): industrial only — large transformers, welders, heavy DOL.",
              "Higher trip characteristic = higher fault current required = lower max Zs. A Type C 32 A has roughly half the max Zs of a Type B 32 A; a Type D requires very low Zs and is impractical at the end of long radials.",
              "BS 7671 A4:2026 Table 41.3 max Zs for Type B 32 A on 230 V is 1.37 ohms with Cmin 0.95. Older editions quoted approximately 1.44 ohms. Design to the current edition's figures.",
              "Reg 434.5.1: device breaking capacity must equal or exceed PSCC at its installed point, OR be backed up by a cascade-coordinated upstream device with proven let-through energy within the downstream device's withstand.",
              "RCD class for combined RCBOs: Type A is the modern minimum; Type F for circuits with single-phase inverters / VSDs; Type B mandatory for EV charging on TN-C-S without internal Type B equivalent monitoring (Reg 722.531.3.101).",
              "Discrimination — clearing the smallest area on a fault — requires coordinated time-current characteristics. Fuse upstream of MCB: typically discriminates if fuse is at least 1.6 x MCB rating; verify with manufacturer cascade tables.",
              "The schedule row for each device must state type, rating, breaking capacity, characteristic, RCD class if combined, and design max Zs — sufficient that any future designer or inspector can verify the choice without ringing you.",
            ]}
          />

          <Quiz title="Protective device selection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 Design current Ib
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 AFDD design considerations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
