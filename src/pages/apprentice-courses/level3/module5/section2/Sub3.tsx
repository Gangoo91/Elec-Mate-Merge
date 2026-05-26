/**
 * Module 5 · Section 2 · Subsection 3 — Protective device inspection
 * Maps to C&G 2365-03 / Unit 304 / LO3 / AC 3.1
 *
 * Visual inspection of overcurrent and additional protection devices —
 * device type vs duty (BS EN 60898 / 61009 / 88), breaking capacity vs PFC
 * (Reg 432.1), RCD types (AC / A / F / B), AFDDs (Reg 421.1.7), SPDs
 * (Section 443), and the labelling / accessibility requirements.
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

const TITLE = 'Protective device inspection | Level 3 Module 5.2.3 | Elec-Mate';
const DESCRIPTION =
  'Visual inspection of overcurrent devices, RCDs, AFDDs and SPDs — device type vs duty, breaking capacity vs PFC, RCD types AC/A/F/B, A4:2026 AFDD recommendation under Reg 421.1.7, and Section 443 SPD requirements.';

const checks = [
  {
    id: 'm5-s2-sub3-rcd-types',
    question: 'For a circuit feeding a single-phase EV charger or modern variable-speed drive, the appropriate RCD type is:',
    options: [
      'When the work will last longer than 30 working days with more than 20 workers at any one time, or exceeds 500 person-days',
      'Type A as a minimum (or Type B where DC fault current can occur, e.g. some EVSE) — Type AC is not suitable for circuits with DC components or pulsating DC fault currents.',
      'A yellow warning triangle with the text \\\\\\\\\\\\\\\'Danger — 400 V\\\\\\\\\\\\\\\' (or the actual voltage) in accordance with the Health and Safety (Safety Signs and Signals) Regulations 1996',
      'Do NOT touch the tower; warn others to stay clear; call the network operator and emergency services; do not approach until confirmed safe',
    ],
    correctIndex: 1,
    explanation:
      'RCD types respond to different fault current waveforms. Type AC = sinusoidal AC only (legacy). Type A = AC + pulsating DC. Type F = AC + pulsating DC + frequencies up to 1 kHz (good for VFDs). Type B = AC + DC + mixed frequencies (required for many EVSE units, three-phase VFDs, and where smooth DC fault current can occur). Visual inspection confirms the installed type matches the load profile.',
  },
  {
    id: 'm5-s2-sub3-breaking-capacity',
    question: 'A consumer unit MCB is marked Icn = 6 kA. The PFC measured at the origin is 8 kA. The visual inspection records:',
    options: [
      'Cross — Reg 432.1 requires the breaking capacity of the protective device to equal or exceed the prospective fault current at the point of installation. 6 kA device on 8 kA PFC is undersized. Either upgrade the device (10 kA) or use cascaded back-up protection per device manufacturer documentation.',
      'A durable label complying with BS 951 stating "Safety Electrical Connection — Do Not Remove" shall be permanently fixed in a visible position at or near the point of connection of every earthing conductor to an earth electrode, every bonding conductor to extraneous-conductive-parts, and at the main earthing terminal where separated from the main switchgear.',
      'Mode 1 (domestic socket, no protection), Mode 2 (domestic socket with in-cable control device — ICCD), Mode 3 (dedicated EVSE with control pilot — the standard for home and workplace charging), and Mode 4 (DC rapid charging with the charger converting AC to DC externally)',
      'Acceptable per Table 64 (well above 1 MΩ) but worth investigating because a value of 18 MΩ on a typical T&E circuit is much lower than the >100 MΩ you would expect from healthy insulation. Look for moisture in a back-box, slightly nicked sheath at a clip or staple, or a degrading connection.',
    ],
    correctIndex: 0,
    explanation:
      "Reg 432.1 (verbatim) — every protective device shall be of adequate breaking capacity to interrupt any fault current that may flow at the point of its installation. 6 kA device on 8 kA PFC violates this. Common in older domestic CUs where DNO PFC has risen over time. Remediation: upgrade to 10 kA devices, or fit a cascaded back-up fuse if the device manufacturer's literature supports it. Cross on schedule, C2 on EICR.",
  },
  {
    id: 'm5-s2-sub3-afdd-reg',
    question: 'Per A4:2026 Reg 421.1.7, AFDDs are:',
    options: [
      'Recommended for all AC final circuits as a means of additional protection against fire from arc faults — and required for higher-risk residential buildings (HRRBs) under the Building Safety Act 2022. Visual inspection confirms presence on circuits where design specifies them.',
      '30 mA RCD at the pitch — TT installations require RCD protection because Ra x I-delta-n must satisfy the 50 V touch-voltage limit, and the high electrode resistance means an overcurrent device alone cannot achieve disconnection in the required time',
      'Both basic protection (insulation, barriers/enclosures, obstacles, placing out of reach) AND fault protection (ADS, double or reinforced insulation, electrical separation, ELV) — confirming both layers per Section 41.',
      'An Electrical Installation Certificate (EIC) signed by the responsible competent persons for design, construction and inspection/testing, accompanied by a Schedule of Inspections and a Schedule of Test Results, plus the documentation required by Regulation 132.13',
    ],
    correctIndex: 0,
    explanation:
      "Reg 421.1.7 (A4:2026) — AFDDs conforming to BS EN 62606 are recommended for AC final circuits to provide additional protection against fire from arc faults. The wording is 'recommended', not mandated in general use. HRRBs (per Building Safety Act 2022 — typically 18 m or 7 storeys with multiple residential units) require them through the building safety regime. Visual inspection confirms AFDD presence where the design has fitted them.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS EN 60898 covers:',
    options: [
      'Roles of employer/training provider/apprentice, off-the-job learning hours, end-point assessment plans and pay/conditions',
      'MCBs (miniature circuit-breakers) up to 125 A — the standard for the household and small commercial overcurrent device.',
      'It uses the large quadriceps and gluteal muscles while reducing the moment arm on the lumbar spine',
      'One terminal, one conductor — unless the terminal is specifically designed and approved for multiple conductors.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60898 — MCBs. BS EN 61009 — RCBOs (combined RCD + MCB). BS EN 60947 — industrial circuit breakers (MCCB / ACB). BS 88 — HRC fuses. BS EN 61008 — RCCBs (RCD-only, no overcurrent function). Visual inspection confirms each device is to the correct standard for its role and rating.',
  },
  {
    id: 2,
    question: 'A 30 mA RCD providing additional protection per Reg 415.1.1 is required on:',
    options: [
      'A low-resistance ohmmeter (continuity tester) measuring the resistance of the conduit between the distribution board earth terminal and the furthest accessory on each circuit, confirming it meets the R2 value used in cable calculations',
      'Because it has no starting torque of its own — the rotor must be brought close to synchronous speed before it can lock into step with the rotating field',
      'All socket outlets rated up to 32 A intended for general use, all mobile equipment used outdoors with current at most 32 A, and all final circuits supplying luminaires in domestic premises (per A4:2026 reaffirmation).',
      'It separates current and potential connections (C1/P1, C2/P2), reducing measurement error from lead resistance and giving a direct reading of the electrode-plus-soil resistance.',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 415.1.1 / 411.3.3 — 30 mA RCD additional protection on all general-use socket outlets up to 32 A, mobile equipment outdoors up to 32 A, and (A4:2026 reaffirmed) lighting circuits in domestic. Section 701 (bathrooms), 702 (pools), 705 (agricultural), and others have additional RCD requirements per Part 7. Visual inspection confirms RCD presence on all required circuits.',
  },
  {
    id: 3,
    question: 'A Type B RCD is required where:',
    options: [
      'It means preventing waste from being produced in the first place; it is the top priority because it avoids the environmental impacts of resource extraction, manufacturing, transport, and disposal entirely',
      'Insurance covering claims arising from professional advice, designs, specifications or instructions that cause financial loss. Electricians need it when providing design services, specifications, technical advice, or any advisory work beyond pure installation.',
      'The fire safety design and construction requirements for new buildings and building works, including means of escape, internal fire spread, external fire spread, and access for fire services',
      'Smooth DC fault current can occur — typically Mode 3 EVSE without integral DC protection, three-phase variable speed drives, and PV inverters where the device manufacturer specifies. Type AC and Type A can saturate and fail to trip on smooth DC residual current.',
    ],
    correctAnswer: 3,
    explanation:
      'Type B detects DC residual current, which Type AC / A / F cannot. Required where smooth DC fault current is plausible — three-phase VFDs, certain EVSE installations (Mode 3 without integral 6 mA DC RCD), some PV inverters, three-phase rectifiers. Manufacturer documentation specifies. Visual inspection checks for the Type B marking and the load served.',
  },
  {
    id: 4,
    question: 'Section 443 of BS 7671:2018+A4:2026 requires SPD protection where:',
    options: [
      'The consequence of overvoltage could result in serious injury or loss of life, interruption of public services, damage to cultural heritage, interruption of commercial or industrial activity, or affect a large number of co-located individuals — assessed by risk per Section 443.',
      'Signed employer and training provider declarations, evidence of mandatory qualifications achieved, confirmation of off-the-job hours completed, the portfolio of evidence, and any EPAO-specific gateway forms',
      'Tailored to the specific installation, agreed in writing in advance, signed by both parties (or evidenced via written quote acceptance), reproduced on the front of the EICR, and specific enough that anyone reading the report can understand exactly what was inspected and what was not.',
      'That pressing the emergency stop immediately de-energises all hazardous motion, that the stop is maintained (latched) until manually reset, and that the machine cannot restart until the stop is released and a deliberate start action is taken',
    ],
    correctAnswer: 0,
    explanation:
      "Section 443 sets the SPD requirement based on consequences. Where consequences are serious (life safety, public services, commercial loss, cultural heritage, many people affected) SPD is required. Otherwise risk-assessed per Section 443.5. Visual inspection confirms SPD presence at origin (Type 1 or 2 typically), the status indicator showing healthy, the upstream protective device matching the SPD manufacturer's specification.",
  },
  {
    id: 5,
    question: 'A consumer unit installed in a domestic property must have an enclosure made of:',
    options: [
      'The root cause analysis reveals a cause that could affect other equipment of the same type, in the same environment, or maintained to the same procedure',
      'Non-combustible material complying with the relevant ferrous metal / non-combustible test per Reg 421.1.201, OR be enclosed in a non-combustible cabinet per the regulation.',
      'Without delay and by the quickest practicable means (immediately by telephone, followed by written report within 10 days)',
      'Dry bulb is air temperature; wet bulb is the temperature measured by a thermometer with a wet wick, showing evaporative cooling effect',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 421.1.201 (UK national addition introduced post-Shepherds Bush fire) — domestic CUs must have a non-combustible enclosure or be enclosed in a non-combustible cabinet. Most modern domestic CUs are now metal-clad to comply. Visual inspection confirms the enclosure material and any required protective enclosure where a plastic CU was previously installed.',
  },
  {
    id: 6,
    question: "Reg 514.12.1 (post-A4:2026) inspection date notice requirement:",
    options: [
      "It highlights the critical moment of choice between an emotional trigger and our reaction — recognising and expanding this space is a core EI skill that separates reactive from intentional behaviour",
      "Records of all maintenance, inspection, and testing activities sufficient to demonstrate compliance, including test results, dates, and the competent person who carried out the work",
      "A notice shall be fixed in a prominent position at or near the origin of the installation indicating: the date of the next inspection, the name of the contractor or scheme, and contact details. The notice survives between EICs as a continuity record.",
      "Cumulative DC residual current from the EV charger and other loads could exceed the AC-only RCD threshold, plus DC residual currents may blind a Type AC RCD; a Type A or Type B RCD is required (BS 7671 722.531.3.101 / Section 722)",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 514.12 / 514.12.1 — inspection notice at origin. The notice records the recommended date of next inspection, the contractor / scheme details, and basic contact info. Provides continuity between EICR cycles for the duty holder and any future inspector. Visual inspection confirms the notice presence, legibility, and that the next inspection date has not lapsed.",
  },
  {
    id: 7,
    question: "An RCBO is:",
    options: [
      "The battery and the PV strings both connect to the DC side of one inverter. PV power can charge the battery without first being inverted to AC and back, giving roughly 3–5 % higher round-trip efficiency than AC-coupling. Best for new PV plus battery installs that go in together.",
      "An EIC (Electrical Installation Certificate) for the new circuit, the inverter manufacturer’s commissioning sheet, the DNO G98/G99 commissioning notice (filed with the DNO), the MCS certificate (issued by the MCS scheme), and the building regulations notification.",
      "A poor or loose termination at one end (most often the MET) or at the BS 951 clamp itself — oxidised contact face, screw not torqued, ferrule damaged. The cable resistance alone should be ~7 mOhm; 0.85 ohm means about 0.84 ohm of contact resistance somewhere.",
      "A combined RCD and MCB in a single device — provides both overcurrent (BS EN 60898 characteristics) and earth fault (BS EN 61009 characteristics) protection on a per-circuit basis. Used in modern consumer units to provide circuit-by-circuit RCD protection rather than RCD-banked CUs.",
    ],
    correctAnswer: 3,
    explanation:
      "RCBO (BS EN 61009) combines MCB + RCD. Each circuit gets its own RCD protection — a single fault on one circuit does not trip all circuits on a shared RCD bank. Modern domestic CUs increasingly use all-RCBO designs for selectivity. Visual inspection confirms each RCBO is to BS EN 61009, correct rating, and the test button operates.",
  },
  {
    id: 8,
    question: 'Per A4:2026 Reg 132.13, the documentation that must be made available with the installation includes:',
    options: [
      'Operating manuals, maintenance instructions, inspection and testing schedule, schematic diagrams, manufacturer instructions for installed equipment, and the means to identify circuits — sufficient to enable safe operation, maintenance, and future inspection.',
      'FAIL the verification — Icn < Ipf is C2 (potentially dangerous): MCBs cannot safely interrupt available fault current — replace devices or fit upstream backup fuse for energy limitation',
      '70-90 percent of cooking equipment aggregate (high coincidence at service times — multiple hobs, oven, grill running together at lunch and dinner peaks). Refrigeration is 100 percent (compressors cycle independently). Lighting is 100 percent for opening hours. EPOS / IT is low.',
      'Refrigerant must be recovered by an F-Gas-certified person and sent for recycling/destruction; the equipment is then dealt with under WEEE Regulations through an authorised treatment facility',
    ],
    correctAnswer: 0,
    explanation:
      "Reg 132.13 (renumbered from 132.13 in earlier editions) — comprehensive operating, maintenance, inspection and testing documentation must accompany the installation. The EIC is part of this pack but not the whole. Visual inspection confirms documentation is present on site (or arrangements made for delivery to duty holder) — its absence is a verification limitation.",
  },
];

const faqs = [
  {
    question: "What is the difference between an RCD, an RCBO, and an AFDD?",
    answer:
      "RCD (BS EN 61008) — earth-fault protection only, tripping on residual current (typically 30 mA additional protection). RCBO (BS EN 61009) — combined RCD + MCB, providing both overcurrent and earth-fault protection per circuit. AFDD (BS EN 62606) — arc fault detection device, trips on the signature of a series or parallel arc that can cause fire. Modern consumer units may combine RCBO + AFDD in a single device for compact installation.",
  },
  {
    question: "Why does Type AC RCD not work for EV chargers?",
    answer:
      "EV charger power electronics (Mode 3 AC charging) can produce a smooth DC residual current under fault. Type AC RCDs respond only to sinusoidal AC and can be saturated and blinded by smooth DC. Type B RCDs detect both AC and smooth DC. Where Type AC or A is used, the EVSE manufacturer must provide a 6 mA DC RCD inside the unit. Visual inspection confirms the RCD type and any integral protection.",
  },
  {
    question: "How do I know what breaking capacity an MCB needs?",
    answer:
      "Check the PFC at the point of installation (measured at the origin during initial verification). Reg 432.1 requires the device breaking capacity (Icn for MCBs to BS EN 60898) to equal or exceed the PFC. Domestic 6 kA is common; many sites need 10 kA. Where PFC exceeds the device rating, manufacturer back-up protection (cascaded fuse) may be permitted — check the device manufacturer's literature.",
  },
  {
    question: "When are AFDDs mandatory versus recommended?",
    answer:
      "Reg 421.1.7 (A4:2026) — recommended for AC final circuits as fire protection from arc faults. The Building Safety Act 2022 framework brings them into mandatory scope for higher-risk residential buildings (HRRBs — typically 18 m or 7 storeys with multiple residential units). Outside HRRBs, AFDDs remain a recommendation — though insurers and scheme providers increasingly favour them on bedroom circuits and circuits feeding hard-to-reach loads.",
  },
  {
    question: "Where does the SPD go in a typical domestic CU?",
    answer:
      "At or near the origin, downstream of the main switch but upstream of the final circuit MCBs. Type 1+2 combined units are common. The SPD has its own protective device (often a 32 A fuse / MCB upstream) per the manufacturer's specification — the upstream device clears any internal SPD failure without taking out the rest of the installation. Visual inspection confirms SPD presence, status indicator healthy, and upstream protection correctly rated.",
  },
  {
    question: "What is the difference between Icn and Ics on an MCB?",
    answer:
      "Icn — rated short-circuit breaking capacity (the maximum fault current the device can interrupt once, after which it may need replacement). Ics — service short-circuit breaking capacity (the maximum fault current the device can interrupt and continue in service). For BS EN 60898 MCBs, Ics is typically 75% of Icn for ratings up to 6 kA and 50% above. Visual inspection records Icn against PFC; design may consider Ics for repeated fault scenarios.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 3"
            title="Protective device inspection"
            description="Visual inspection of overcurrent devices, RCDs, AFDDs and SPDs — type matched to duty, breaking capacity matched to PFC, A4:2026 additions, and the labelling / accessibility requirements."
            tone="emerald"
          />

          <TLDR
            points={[
              "Reg 432.1 — every protective device must have breaking capacity equal to or greater than the PFC at its point of installation.",
              "RCD types AC / A / F / B detect different fault waveforms. Modern loads (EVSE, VFDs, PV inverters) often need Type A, F or B — Type AC is now legacy.",
              "Reg 421.1.7 (A4:2026) recommends AFDDs on AC final circuits. HRRBs require them via Building Safety Act 2022.",
              "Section 443 SPD — required where consequences of overvoltage are serious. Type 1, 2 or 1+2 at origin per the risk assessment.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the standard each protective device is built to — BS EN 60898 (MCB), BS EN 61009 (RCBO), BS EN 62606 (AFDD), Section 443 SPD types.",
              "Match RCD type (AC / A / F / B) to load characteristics — standard AC, pulsating DC, mixed frequency, smooth DC.",
              "Apply Reg 432.1 — verify device breaking capacity (Icn) at or above the measured PFC.",
              "Confirm AFDD presence per Reg 421.1.7 design intent and HRRB requirements.",
              "Confirm SPD presence per Section 443 risk assessment, including upstream protection sizing.",
              "Verify Reg 421.1.201 non-combustible CU enclosure requirement.",
              "Confirm Reg 514.12 inspection notice and Reg 514.9 circuit identification chart presence.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Overcurrent devices — type and rating</ContentEyebrow>

          <ConceptBlock
            title="The four common standards on a UK installation"
            plainEnglish="Visual inspection identifies the device type and verifies it matches the duty. Wrong type = wrong characteristics. Wrong rating = either unsafe (over-rated) or nuisance-tripping (under-rated). Wrong breaking capacity = the device cannot clear a fault at this PFC."
          >
            <p>The four standards you will encounter most often:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 60898 — MCB.</strong> Up to 125 A. Curve types B (3-5 In), C (5-10
                In), D (10-20 In), K (8-12 In), Z (2-3 In). Domestic and small commercial.
                Icn typically 6 kA or 10 kA.
              </li>
              <li>
                <strong>BS EN 61009 — RCBO.</strong> Combined MCB + RCD per circuit. Same MCB
                curves as BS EN 60898. RCD characteristic per the type marking (AC / A / F / B).
              </li>
              <li>
                <strong>BS EN 60947-2 — MCCB / ACB.</strong> Industrial moulded case / air
                circuit-breakers. Higher ratings, adjustable trip characteristics, often
                replaceable trip units.
              </li>
              <li>
                <strong>BS 88 — HRC fuses.</strong> High-rupture-capacity fuses. Used at supply
                origin (DNO cut-out fuse), in busbar trunking, and in industrial distribution.
                Defined characteristic per the manufacturer time/current curve.
              </li>
            </ul>
            <p>Visual inspection records, for each device:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard reference (BS EN ____)</li>
              <li>Type / curve (B, C, D for MCBs; AC, A, F, B for RCDs)</li>
              <li>Rated current (In)</li>
              <li>Breaking capacity (Icn / Ics) compared with measured PFC</li>
              <li>Manufacturer and model</li>
              <li>Test button operation (RCDs / RCBOs / AFDDs)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.201 (Coordination with standard protective devices)"
            clause="Where the protective device is a general-purpose type (gG) fuse to BS 88-2, a fuse to BS 88-3, a circuit-breaker to BS EN 60898, a circuit-breaker to BS EN 60947-2 or a residual current circuit-breaker with integral overcurrent protection (RCBO) to BS EN 61009-1, compliance with conditions (a) and (b) also results in compliance with condition (c) of Regulation 433.1.1."
            meaning={
              <>
                Visual inspection records the device standard reference (BS EN 60898 MCB,
                BS EN 60947-2 MCCB, BS EN 61009-1 RCBO, BS 88 fuse). When the installed
                device is one of these standard types, satisfying In ≥ Ib and In ≤ Iz
                automatically satisfies the I2 ≤ 1.45 × Iz overload coordination rule —
                which is why these standards dominate UK practice. A non-listed protective
                device (or a BS 3036 semi-enclosed fuse) needs the additional 0.725 × Iz
                check from 433.1.202.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.201."
          />

          <SectionRule />

          <ContentEyebrow>RCD types — choose the right one for the load</ContentEyebrow>

          <ConceptBlock
            title="AC, A, F, B — and why type matters"
            plainEnglish="Modern loads aren't pure sinusoidal AC. EVs, drives, inverters and electronics produce DC components and mixed frequencies that can blind older Type AC RCDs. Match the type to the load."
            onSite="When you see an EV charger, a heat pump inverter, or a VFD on a circuit fed by a Type AC RCD, that's a finding. Document the type mismatch and recommend the correct type."
          >
            <p>The four RCD types, fault waveforms detected, and typical loads:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type AC.</strong> Detects sinusoidal AC residual current only. Legacy.
                Suitable for purely resistive AC loads (lighting, basic socket circuits without
                inverter loads). Increasingly inadequate for modern domestic and commercial
                installations. A4:2026 effectively phases AC out of new general use.
              </li>
              <li>
                <strong>Type A.</strong> Detects AC + pulsating DC residual current. Suitable for
                most modern domestic and commercial circuits including general lighting and
                socket circuits with mixed electronic loads.
              </li>
              <li>
                <strong>Type F.</strong> Detects AC + pulsating DC + mixed frequencies up to about
                1 kHz. Designed for circuits with single-phase variable speed drives, modern
                appliances with inverter motors (washing machines, fridges, induction hobs).
              </li>
              <li>
                <strong>Type B.</strong> Detects AC + DC (smooth) + mixed frequencies. Required
                where smooth DC residual current can occur — three-phase VFDs, certain EV chargers
                (Mode 3 without integral 6 mA DC RCD), three-phase rectifiers, some PV inverters.
              </li>
            </ul>
            <p>
              Visual inspection confirms the type marking on each RCD / RCBO matches the design
              intent for the load. A consumer unit feeding a heat pump and an EV charger but
              fitted with all Type AC devices is a documentation issue (not what the design says)
              and a safety issue (smooth DC fault could go undetected).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 531.3.3 (RCD type selection)"
            clause="The type of RCD shall be selected in accordance with the type of residual current that can occur in the circuit. Where the equipment connected can produce DC residual current that may impair the operation of an AC-type or A-type RCD, an RCD of Type B shall be used unless the manufacturer has confirmed compatibility with another type."
            meaning={
              <>
                The selection duty sits on the designer but visual inspection verifies it.
                Where the load can produce DC fault current and the installed RCD is Type AC or
                Type A, that is non-compliant unless manufacturer documentation confirms
                compatibility (e.g. an EVSE with integral 6 mA DC RCD allows upstream Type A use).
                Cross on schedule, C2 on EICR for safety-critical mismatch.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53, Regulation 531.3.3."
          />

          <VideoCard
            url={videos.circuitBreakersDontProtectPeople.url}
            title={videos.circuitBreakersDontProtectPeople.title}
            channel={videos.circuitBreakersDontProtectPeople.channel}
            duration={videos.circuitBreakersDontProtectPeople.duration}
            topic="Why MCBs alone do not protect people — the case for the RCD"
            caption={
              <>
                The Engineering Mindset shows why an MCB will happily sit at 30 A while a person is
                being electrocuted at 100 mA — and how an RCD's residual-current sense coil catches
                it. The exact reason Type-A / F / B selection matters on inspection.
              </>
            }
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>AFDD and SPD — A4:2026 additions to verify</ContentEyebrow>

          <ConceptBlock
            title="AFDD per Reg 421.1.7 — recommended in general, mandatory in HRRBs"
            plainEnglish="An AFDD detects the electrical signature of an arc — the kind of fault that doesn't trip an MCB or RCD but starts fires. A4:2026 added a recommendation to fit them on AC final circuits. Building Safety Act 2022 made them mandatory in higher-risk residential buildings."
          >
            <p>What visual inspection of AFDDs covers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Presence on circuits where design specifies.</strong> The design
                documentation should identify which circuits get AFDDs. For HRRBs, all final
                circuits typically. For non-HRRB installations following the A4 recommendation,
                often bedrooms, circuits with concealed wiring in combustible structure, circuits
                feeding hard-to-reach loads.
              </li>
              <li>
                <strong>Standard — BS EN 62606.</strong> The marking must show this standard.
              </li>
              <li>
                <strong>Type — typically combined RCBO + AFDD.</strong> Visual confirms the
                combined device provides both fault types in one unit.
              </li>
              <li>
                <strong>Test button operation.</strong> Pressed at commissioning to confirm
                healthy. Some AFDDs have status LEDs that should show normal operation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="SPD per Section 443 — required where consequences are serious"
            plainEnglish="Section 443 sets when SPD protection is required based on what could happen in an overvoltage event. Life safety, public services, commercial/industrial activity, cultural heritage, many people affected — those trigger SPD requirement. Domestic where consequences are limited may rely on risk assessment."
          >
            <p>What visual inspection of SPDs covers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type at origin.</strong> Type 1 (lightning current arrester for direct
                strike), Type 2 (overvoltage limiter for indirect strike / switching surges),
                Type 1+2 combined. Domestic typically Type 2 or 1+2. Commercial / public services
                typically Type 1+2 or Type 1 + Type 2 cascaded.
              </li>
              <li>
                <strong>Status indicator.</strong> Most SPDs have a window or LED showing
                healthy / failed. Visual confirms healthy.
              </li>
              <li>
                <strong>Upstream protection.</strong> SPDs require upstream overcurrent protection
                per the manufacturer's specification (usually 32 A or 63 A fuse / MCB). Visual
                confirms presence and rating.
              </li>
              <li>
                <strong>Position.</strong> At or near origin, downstream of main switch, upstream
                of distribution. For sub-distribution, additional Type 2 or Type 3 SPDs may be
                installed near sensitive equipment per the design.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating Type AC as a default RCD choice on modern installs"
            whatHappens={
              <>
                Inspector sees an RCD on a circuit, ticks the schedule, moves on. Type AC was
                fitted by an installer who used what was on the van. The circuit feeds a heat
                pump with a single-phase inverter. Smooth DC fault current under fault would
                blind the Type AC. The protection is theoretical, not actual.
              </>
            }
            doInstead={
              <>
                Visual inspection of every RCD / RCBO checks the type marking AND the load served.
                Modern domestic socket / lighting circuits should be Type A as a minimum. Circuits
                feeding inverters, drives, EVSE need Type F or B per the load. Where Type AC is
                installed on a circuit needing higher type, cross on schedule, recommend
                replacement, code C2 on EICR if safety is materially compromised.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="MCB curves — B, C, D and where each fits"
            plainEnglish="MCB curves describe the magnetic trip threshold — how many multiples of rated current (In) trigger instantaneous trip. Type B (3-5 In) for resistive loads with low inrush. Type C (5-10 In) for moderate inductive loads (motors, transformers, fluorescent banks). Type D (10-20 In) for heavy inductive / transformer inrush. Get the curve right and nuisance trips disappear; get it wrong and the device either nuisance-trips or fails to clear faults at expected speed."
            onSite="Visual inspection confirms the curve marking on each MCB matches the load. A Type C 16 A on a domestic ring final isn't wrong but is overkill — Type B is standard. A Type B 32 A on a workshop circuit feeding a welding inverter will nuisance-trip under inrush. Match curve to duty."
          >
            <p>BS EN 60898 MCB curves and typical applications:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type B (3-5 In magnetic trip).</strong> Standard domestic and small
                commercial. Resistive loads, low inductive inrush. Lighting, ring finals, radial
                socket circuits, immersion heaters, electric showers.
              </li>
              <li>
                <strong>Type C (5-10 In).</strong> Moderate inductive loads. Fluorescent lighting
                banks, small motors, transformers up to a few kVA, computer / IT loads with
                moderate inrush.
              </li>
              <li>
                <strong>Type D (10-20 In).</strong> Heavy inductive loads. Large transformers,
                X-ray equipment, welding equipment, large motors with high starting current,
                discharge lighting.
              </li>
              <li>
                <strong>Type K (8-12 In).</strong> Industrial — high inductive loads where Type
                C is insufficient. Less common in UK domestic / commercial.
              </li>
              <li>
                <strong>Type Z (2-3 In).</strong> Sensitive electronic loads where fast trip is
                preferred. Less common — typically replaced by RCBO with appropriate
                characteristic.
              </li>
            </ul>
            <p>
              Implication for Zs: Type B has the highest tabulated max Zs for a given current
              rating (lowest fault current required to trip in 0.4 s), Type C lower, Type D lower
              still. Visual inspection of the curve marking ties to the Zs comparison from
              Table 41.3.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 421.1.201 — non-combustible CU enclosure"
            plainEnglish="Following the Shepherds Bush fire and other plastic-CU fire incidents, BS 7671 introduced Reg 421.1.201 requiring domestic CUs to have a non-combustible enclosure or be enclosed in a non-combustible cabinet. Modern metal-clad CUs comply by default. Pre-2016 plastic CUs are recordable observations."
            onSite="Look at the CU material. Steel / aluminium = compliant. Plastic = pre-Reg 421.1.201, recordable on EICR. Code depends on context: typically C3 in a remote location not on an escape route, C2 if the CU is in an escape route or where consequences of fire would be more serious."
          >
            <p>Reg 421.1.201 visual inspection items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CU enclosure material.</strong> Steel sheet, aluminium, or composite
                material that meets the non-combustible test (per the regulation). Plastic
                enclosures don't comply for new installs.
              </li>
              <li>
                <strong>Existing plastic CUs.</strong> Compliant when installed if pre-2016. On
                EICR, code depends on location and risk: C3 (improvement recommended) typical;
                C2 (potentially dangerous) where the CU is in an escape route, near combustible
                materials, or in a vulnerable location.
              </li>
              <li>
                <strong>Compromised metal CUs.</strong> Holes drilled through the enclosure for
                cable entry that aren't sealed, gland plates removed, missing hole grommets — all
                compromise the fire containment.
              </li>
              <li>
                <strong>Mounting environment.</strong> CUs near combustible cladding, in airing
                cupboards with combustible material adjacent, in escape routes — all elevate the
                risk profile and may push C3 to C2 on EICR.
              </li>
              <li>
                <strong>Alternative compliance.</strong> A plastic CU enclosed in a separate
                non-combustible cabinet meets the regulation. Visible as a metal cabinet
                surrounding the original CU.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="SPD coordination — Type 1, 2, 3 cascading"
            plainEnglish="SPDs coordinate to handle the energy of a surge. Type 1 (lightning current arrester) catches the bulk of a direct strike. Type 2 (overvoltage limiter) handles the residual. Type 3 (close to sensitive equipment) trims the final voltage. Cascading them gives layered protection. Section 443 sets when SPDs are required; manufacturer literature sets the coordination."
            onSite="Visual inspection at the supply intake should show a Type 1+2 (or Type 1 + Type 2 cascaded) where Section 443 requires SPD. Sub-distribution boards may have Type 2. Sensitive equipment (server rooms, medical equipment) may have local Type 3. All have status indicators showing healthy / failed."
          >
            <p>SPD types and their roles:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type 1.</strong> Lightning current arrester. Designed to handle 10/350 µs
                impulse waveform from direct lightning strike. Installed at origin where direct
                strike is plausible (buildings with lightning protection systems, isolated
                buildings, public services).
              </li>
              <li>
                <strong>Type 2.</strong> Overvoltage limiter. Handles 8/20 µs impulse from
                indirect strike, switching surges. Standard at origin for most non-rural
                installations. Or downstream of Type 1 in a cascaded arrangement.
              </li>
              <li>
                <strong>Type 1+2 combined.</strong> Single device handling both. Common on
                domestic and small commercial origin where both protections needed in one unit.
              </li>
              <li>
                <strong>Type 3.</strong> Local protection close to sensitive equipment. Handles
                residual surge after Type 1 / Type 2. Typically integrated into protective socket
                strips or installed adjacent to specific equipment.
              </li>
              <li>
                <strong>Status indicator.</strong> Window or LED on every SPD showing healthy
                (green) / replace (red). End of life of the MOV / GDT components after sufficient
                surges absorbed.
              </li>
              <li>
                <strong>Upstream protective device.</strong> Per manufacturer specification —
                typically 32 A or 63 A fuse / MCB upstream of the SPD. Clears any internal SPD
                failure without disrupting the rest of the installation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Test button operation — RCD, RCBO, AFDD"
            plainEnglish="Every RCD, RCBO and AFDD has a test button. Pressing it simulates the fault condition the device is designed to detect, confirming the mechanical / electronic operation. The test button does NOT confirm the trip threshold or trip time — those need instrument testing per Reg 643.7.3. But the button is the routine user-accessible test."
            onSite="At commissioning, press every test button and confirm trip + reset. Brief the customer on quarterly user testing — press the button, observe trip, reset. The test button is the customer's mechanism for ongoing assurance between EICRs. Document the commissioning button operation on the schedule."
          >
            <p>Test button purpose by device:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RCD test button.</strong> Applies a small simulated residual current to
                trigger the trip mechanism. Confirms the detection coil, electronic comparator,
                and trip mechanism all function. Does NOT confirm the actual IΔn threshold or
                trip time.
              </li>
              <li>
                <strong>RCBO test button.</strong> Same as RCD — tests the residual-current side
                of the device. The overcurrent (MCB) side does not have a user test button —
                tested via the actual fault current at commissioning if at all (Type-test
                certified at manufacture).
              </li>
              <li>
                <strong>AFDD test button.</strong> Initiates a self-test routine that simulates
                the arc signature the device looks for. Some AFDDs perform automatic periodic
                self-test in addition to the manual button.
              </li>
              <li>
                <strong>Customer routine.</strong> Quarterly user testing recommended — press,
                observe trip, reset. Demonstrates ongoing function. After significant electrical
                events (lightning, surge, fault) re-test to confirm no damage.
              </li>
              <li>
                <strong>Commissioning record.</strong> Document button operation on the Schedule
                of Test Results. Many schemes require this confirmation alongside the instrument-
                tested trip time.
              </li>
              <li>
                <strong>Periodic instrument testing.</strong> Reg 643.7.3 — single AC test at
                1×IΔn under A4:2026. The test button is for routine user check; the instrument
                test is for verification record.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Six-year-old domestic CU with rising PFC"
            situation={
              <>
                You are doing an EICR on a 2020 domestic install. The CU is plastic-bodied
                (pre-Reg 421.1.201 enforcement), all MCBs are 6 kA, the RCDs are Type AC. You
                measure PFC at the origin — 9.5 kA. The DNO has reinforced the local network
                since the install, raising PFC. The original install was compliant at 6 kA.
                Today it is not.
              </>
            }
            whatToDo={
              <>
                Document multiple findings on the EICR: (1) Reg 421.1.201 — plastic CU enclosure,
                C3 improvement recommended unless local risk factors elevate to C2 (e.g. CU in
                an escape route). Recommend metal-clad replacement or non-combustible enclosure.
                (2) Reg 432.1 — 6 kA devices on 9.5 kA PFC, C2 potentially dangerous. Devices
                cannot reliably clear a fault. Recommend upgrade to 10 kA. (3) Reg 531.3.3 — Type
                AC RCDs on circuits potentially feeding inverter loads (check appliances), C3
                improvement recommended unless safety-critical, C2 if so. Document, photograph
                each finding, prioritise C2 items for early remediation, agree with duty holder.
              </>
            }
            whyItMatters={
              <>
                A periodic catches changes in the operating environment that the original install
                could not foresee — DNO PFC rising, load profile changing, regulations advancing.
                The duty holder needs the EICR to surface these so they can act. Suppressing the
                findings to keep the report clean is a Reg 4 EAWR breach in waiting.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs in AC final circuits)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc
                fault detection devices (AFDDs) to mitigate the risk of fire in AC final
                circuits of a fixed installation due to the effects of arc fault currents. The
                regulation&apos;s wording uses &quot;recommending&quot; rather than mandatory
                phrasing.
              </>
            }
            meaning={
              <>
                Visual inspection should now identify whether AFDDs are fitted on AC final
                circuits and record their absence as a recommendation when the installation is
                in the &quot;should consider&quot; category. AFDDs are recommended (Reg 421.1.7) in high-rise
                residential buildings via the Building Safety Act 2022 framework — verify the
                building category before deciding whether absence is a C3 (improvement) or
                higher coding.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 432.1 — device breaking capacity (Icn) must be at or above the measured PFC at the point of installation. PFC rises over time as DNO networks reinforce.',
              'BS EN 60898 = MCB. BS EN 61009 = RCBO (combined MCB + RCD). BS EN 62606 = AFDD. BS 88 = HRC fuse. Each has its own visual inspection markings.',
              'RCD types AC / A / F / B detect different fault waveforms. Modern loads (EVSE, VFDs, PV) often need Type A, F or B. Type AC is now legacy for general use.',
              'Reg 421.1.7 (A4:2026) recommends AFDDs on AC final circuits. HRRBs require them via Building Safety Act 2022.',
              'Section 443 SPD — required where consequences of overvoltage are serious. Type 1, 2 or 1+2 at origin per design risk assessment, with upstream protection per manufacturer.',
              'Reg 421.1.201 (UK national addition) — domestic CUs must have non-combustible enclosure or be enclosed in non-combustible cabinet. Metal-clad CUs are the modern norm.',
              'Reg 514.12 inspection notice and Reg 514.9 circuit chart must be present at origin for compliance. Visual inspection confirms presence and legibility.',
              'Reg 132.13 (renumbered from 132.13) — full operating, maintenance, inspection and testing documentation accompanies the install. EIC is part of this pack, not the whole.',
            ]}
          />

          <Quiz title="Protective device inspection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 Earthing and bonding
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Cable installation inspection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
