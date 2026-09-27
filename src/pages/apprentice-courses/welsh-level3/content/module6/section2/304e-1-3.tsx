/**
 * Ported from the English course, combining:
 *   level2/module3/section3/Sub4.tsx
 *   level3/module3/section6/Sub2.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';

const checks = [
  {
    id: 'mcb-type-check',
    question:
      'A small workshop with 3-phase induction motors that draw heavy starting currents — which MCB type best avoids nuisance trips on inrush?',
    options: ['No MCB — fuses only', 'Type D (10–20× In)', 'Type B (3–5× In)', 'Type C (5–10× In)'],
    correctIndex: 1,
    explanation:
      'Type D — magnetic trip at 10 to 20 × In. Used where heavy inrush currents (motor starting, large transformer energising) would nuisance-trip a Type B or C. Trade-off — higher Zs requirement to ensure thermal disconnection.',
  },
  {
    id: 'rcd-type-check',
    question:
      'A modern EV charger or solar PV inverter draws a residual current with DC components. Which RCD type is appropriate at the AC side?',
    options: [
      'Type B (full DC sensitivity)',
      'Type AC (sinusoidal AC residual currents only)',
      'Type A (AC plus pulsing DC residual currents)',
      'Type F (AC, pulsing DC and frequencies up to 1 kHz)',
    ],
    correctIndex: 0,
    explanation:
      'Type B RCDs are sensitive to AC, pulsing DC and smooth DC residual currents. Required where the load can produce smooth DC fault currents the upstream RCD wouldn’t see — EV chargers without internal Type A+6 mA DC detection, large PV inverters, variable speed drives. Type A handles AC + pulsing DC + small (6 mA) DC.',
  },
  {
    id: 'afdd-where-check',
    question: 'BS 7671 421.1.7 (the AFDD regulation) recommends AFDDs in dwellings on:',
    options: [
      'All circuits without exception, including lighting and cooker circuits',
      'AC final circuits supplying socket-outlets ≤ 32 A',
      'Only circuits feeding fixed equipment such as immersions and boilers',
      'Three-phase distribution circuits rated above 100 A',
    ],
    correctIndex: 1,
    explanation:
      'AFDDs are recommended for AC final circuits supplying socket-outlets ≤ 32 A in dwellings (per BS 7671 Reg 421.1.7). The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs, sleeping accommodation and care homes, supporting fire-safety guidance treats them as effectively required practice.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A BS 88 series HRC fuse has its main advantage over a BS EN 60898 MCB in:',
    options: [
      'Lower cost per device than an equivalent MCB',
      'Higher breaking capacity (typically 80 kA+ vs 6–10 kA for domestic MCBs)',
      'The ability to reset after a fault without replacement',
      'A faster trip on small overloads than any MCB',
    ],
    correctAnswer: 1,
    explanation:
      'BS 88 cartridge fuses can interrupt very high prospective fault currents — typically 80 kA or higher — making them the right choice at industrial supply intakes where MCBs would be destroyed. They’re sacrificial (one-shot) but the breaking capacity headroom is unmatched.',
  },
  {
    id: 2,
    question: 'A BS EN 60898 Type C MCB has its magnetic trip threshold at:',
    options: ['10 to 20 × In', '3 to 5 × In', '5 to 10 × In', '20 to 50 × In'],
    correctAnswer: 2,
    explanation:
      'Type C MCBs trip magnetically at 5 to 10 × In. Used for moderate inrush loads — fluorescent banks, small motors, transformer energising. Type B (3–5×) is for general resistive / household; Type D (10–20×) for heavy inrush like welders and induction motors.',
  },
  {
    id: 3,
    question: 'An RCBO (BS EN 61009-1) provides:',
    options: [
      'Residual current (earth-fault) protection only, with no overcurrent function',
      'Combined overload, fault current and residual current (earth-fault) protection in a single module',
      'Overload and fault current protection only, the same as a standard MCB',
      'Surge protection against transient overvoltages from lightning',
    ],
    correctAnswer: 1,
    explanation:
      'RCBO = Residual Current Breaker with Overload. Combines an MCB (overload + short-circuit) with an RCD (residual / earth-fault) into one DIN module. Standard domestic kit now — gives every circuit its own 30 mA RCD without the all-circuits-trip-together problem of a shared RCD.',
  },
  {
    id: 4,
    question:
      'A standard domestic socket circuit on a TN-S system would typically use which RCD type for additional protection?',
    options: [
      'Type A (sensitive to AC + pulsing DC up to 6 mA)',
      'Type B (full smooth-DC sensitivity)',
      'Type AC (sinusoidal AC residual currents only)',
      'Type F (single-phase variable speed drives)',
    ],
    correctAnswer: 0,
    explanation:
      'Type A is the modern domestic standard — covers AC waveforms AND pulsing DC residual currents (which Type AC misses). Type AC is no longer recommended for new installs because most modern equipment (LED drivers, computer power supplies) produces some DC residual.',
  },
  {
    id: 5,
    question: 'A Type 1 SPD installed at the origin of an installation primarily protects against:',
    options: [
      'Induced and switching surges only (8/20 µs waveform)',
      'Direct lightning strike currents (10/350 µs waveform) and equipotential bonding',
      'Point-of-use fine clamping for sensitive electronic equipment',
      'Earth-fault residual currents on the final circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Type 1 SPDs handle direct lightning strike currents — they’re tested with the 10/350 µs waveform and act as equipotential bonding SPDs at the origin. Type 2 SPDs handle indirect / induced surges (8/20 µs); Type 3 SPDs are point-of-use for sensitive equipment.',
  },
  {
    id: 6,
    question: 'Reg 421.1.7 (BS 7671:2018+A4:2026) recommends AFDDs in dwellings on:',
    options: [
      'Provide evidence of ongoing professional development',
      'Delays, poor workmanship, or failed inspections',
      'AC final circuits supplying socket-outlets ≤ 32 A',
      'Direct sunlight or heat sources affecting the sensor',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 421.1.7 recommends AFDDs for AC final circuits supplying socket-outlets ≤ 32 A in dwellings. The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs, sleeping accommodation and care homes, supporting fire-safety guidance treats them as effectively required practice.',
  },
  {
    id: 7,
    question:
      'BS 7671 411.3.3 requires additional protection by 30 mA RCD on socket-outlets up to 32 A in:',
    options: [
      'Dwellings only — non-dwellings are completely exempt',
      'Outdoor socket-outlets only, regardless of building type',
      'Only socket-outlets intended to supply portable equipment used outdoors',
      'All installations, with an exception for non-dwellings where a documented risk assessment determines it is not necessary',
    ],
    correctAnswer: 3,
    explanation:
      'Revised 411.3.3 applies to socket-outlets ≤ 32 A. Exception: in non-dwellings, a documented risk assessment can determine RCD additional protection isn’t necessary. Domestic dwellings have no such opt-out — all sockets ≤ 32 A get 30 mA RCD additional protection.',
  },
  {
    id: 8,
    question: 'BS 7671 443.4.1 requires SPD protection where:',
    options: [
      'The consequence of an overvoltage could result in serious injury to, or loss of, human life, or significant financial / data loss',
      'The installation is supplied by an overhead line only, never an underground cable',
      'The prospective fault current at the origin exceeds the breaking capacity of the main switch',
      'The earth-fault loop impedance is too high for automatic disconnection in 0.4 s',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 443.4 requires SPDs where the consequence of a transient overvoltage could result in serious injury to, or loss of, human life, or in significant financial / commercial / data loss. For all other cases SPDs are still required unless the owner declares the risk acceptable in writing.',
  },
];

const faqs = [
  {
    question: 'Why are RCBOs replacing the old ‘RCD-protected dual-bank’ consumer unit?',
    answer:
      'Old design — a single 30 mA RCD protects half the circuits; a fault on any one circuit trips ALL of them. Customer comes home to no fridge, no freezer, no lights on half the house, just because the bathroom shaver socket had a transient. RCBOs put the 30 mA RCD on each circuit individually — a fault on one circuit only kills that one circuit. Required for compliance with 314.1 (minimise inconvenience) and increasingly the standard spec for new builds and rewires.',
  },
  {
    question: 'What’s the deal with Type B RCDs and EV chargers?',
    answer:
      'Modern EV chargers can produce smooth DC residual currents under fault — the on-board electronics rectify AC into DC for the battery. A standard Type AC or Type A RCD gets ‘blinded’ by the DC and won’t trip on a real fault. Two solutions: (1) install an upstream Type B RCD (full DC sensitivity), or (2) use a charger with built-in 6 mA DC residual current detection that lets you keep a Type A on the supply side. The charger manual will tell you which option applies.',
  },
  {
    question: 'When does an AFDD ‘earn its keep’ vs just adding cost?',
    answer:
      'AFDDs detect arc faults — the kind of low-current chattering arc you get from a damaged cable insulation, loose terminal or rodent-chewed lead. RCDs don’t see these (no earth path); MCBs don’t see them (current is below trip threshold). Arc faults are a leading cause of electrical fires. In a sleeping-occupancy building (HRRB, student accommodation, care home), the time between arc start and fire is long enough that an AFDD trip can save lives. BS 7671 Reg 421.1.7 itself recommends AFDDs on AC final circuits supplying socket-outlets ≤ 32 A in dwellings; that recommendation strengthens to a requirement in HRRBs under the Building Safety Act 2022 framework, and in HMOs / sleeping accommodation / care homes supporting fire-safety guidance treats them as effectively required practice.',
  },
  {
    question: 'Type 1 + 2 vs Type 2 SPD — which do I install?',
    answer:
      'Type 1 + 2 (or just Type 1 followed by Type 2) at the origin if the building has external lightning protection (LPS) or is exposed to direct strikes. Type 2 alone at the origin if there’s no LPS and lightning isn’t a major concern (most domestic and small-commercial). Type 3 is downstream, near sensitive equipment, as a final clamp. Reg 534.4.1.1 names the layout — Type 1 OR Type 2 at the origin; Type 2 OR Type 3 close to sensitive equipment.',
  },
  {
    question: 'Why is BS 3036 still in BS 7671 if it’s old technology?',
    answer:
      'Existing installs. There are still Victorian housing stock, lock-up garages and farm outbuildings with original BS 3036 rewireable fuses on the DB. BS 7671 has to accommodate them when you’re working on the existing circuit. The Cf = 0.725 derating covered in the cable-sizing lesson is the BS 7671 mechanism for keeping cables compliant when a BS 3036 fuse is the protective device. New install? Always BS EN 60898 / 61009. BS 3036 is legacy-only.',
  },
  {
    question:
      'How do I tell the difference between an MCB and an RCBO at a glance in the consumer unit?',
    answer:
      'Three things. (1) Width — RCBOs are usually slightly wider than MCBs (often 18 mm vs 17.5 mm) and may take up two slots or one wider slot. (2) Test button — RCBOs have a small test button (T) on the face; MCBs don’t. (3) Label — RCBOs are marked with a residual current symbol and the trip current (e.g., ‘30 mA Type A’) on the body. If in doubt, look at the model number against the manufacturer’s catalogue.',
  },
];

const checks2 = [
  {
    id: 'l3-m3-6-2-mcb',
    question: 'A Type B MCB instantaneous trip range:',
    options: ['3-5× rated', '10-20× rated', '1.13-1.45× rated', '5-10× rated'],
    correctIndex: 0,
    explanation:
      'BS EN 60898: Type B trips magnetically at 3-5× rated current. Type C: 5-10×. Type D: 10-20×. Type B for resistive loads (lights), C for motors and small inrush.',
  },
  {
    id: 'l3-m3-6-2-rcd',
    question: 'A 30 mA RCD must operate within:',
    options: [
      'Secure connection and cleanliness',
      'BS 1192 / AEC (UK) layer naming',
      'All switches and the light fitting',
      '300 ms at 30 mA, 40 ms at 5×',
    ],
    correctIndex: 3,
    explanation:
      'BS EN 61008-1 trip times: at I_Δn (30 mA) → ≤300 ms; at 5× I_Δn (150 mA) → ≤40 ms. Faster at higher currents.',
  },
  {
    id: 'l3-m3-6-2-rcbo',
    question: 'An RCBO is:',
    options: [
      'Where continuity is lost indicating the fault location',
      'High-frequency components and specialised detection equipment',
      'Combined RCD + MCB in one device on a single circuit',
      'Mechanical support preventing cable pull from reaching the fibre',
    ],
    correctIndex: 2,
    explanation:
      "RCBO = Residual Current Breaker with Overcurrent. Both protections in one — replaces a circuit's MCB while adding RCD function. Per-circuit RCD protection without grouping.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'A BS 1361 cartridge fuse is used in:',
    options: [
      'The plug top of a 13 A BS 1363 appliance lead',
      'Domestic supply cut-out (service fuse) and old-style fused boards',
      'High-voltage transmission switchgear at the substation',
      'Low-voltage signalling and control panels only',
    ],
    correctAnswer: 1,
    explanation:
      'BS 1361 (now superseded by BS 88-3) HRC fuses in DNO cut-outs and old fused boards. Standard ratings 60, 80, 100 A.',
  },
  {
    id: 2,
    question: 'BS 88 fuses are characterised as:',
    options: [
      'Low breaking capacity re-wireable fuses for domestic use',
      'Glass-bodied fuses for electronic equipment',
      'High-rupturing-capacity (HRC) cartridge fuses for industrial use',
      'Resettable thermal trips rather than fuses',
    ],
    correctAnswer: 2,
    explanation:
      'BS 88 = HRC industrial fuses, ratings 2-1250 A, breaking capacity up to 80 kA. Used in commercial/industrial DBs and for motor protection.',
  },
  {
    id: 3,
    question: 'Type C MCB instantaneous trip:',
    options: ['10-20× rated', '3-5× rated', '20× rated', '5-10× rated'],
    correctAnswer: 3,
    explanation:
      'Type C: 5-10× rated current. Standard for motor circuits and inrush loads (LED transformers, switching PSUs).',
  },
  {
    id: 4,
    question: 'RCD types: which detects DC residual current?',
    options: ['Type B', 'Type A', 'Type AC', 'Type F'],
    correctAnswer: 0,
    explanation:
      'Type AC: AC sinusoidal residual only. Type A: AC + pulsing DC. Type B: full DC + AC + high-frequency. Required for VFDs, EV chargers, modern PV inverters.',
  },
  {
    id: 5,
    question: 'Disconnection time for a 32 A circuit on TN system per BS 7671 §411.3.2:',
    options: ['0.1 s', '0.4 s', 'No limit', '5 s'],
    correctAnswer: 1,
    explanation:
      'For final circuits ≤32 A on TN systems: 0.4 s. For circuits >32 A and distribution circuits: 5 s.',
  },
  {
    id: 6,
    question: 'Re-wireable fuses (BS 3036) compared with cartridge fuses (BS 88):',
    options: [
      'Higher breaking capacity and more precise rating',
      'Faster operation with a sealed, tamper-proof element',
      'Lower breaking capacity, slower operation, less precise',
      'Identical performance but cheaper to manufacture',
    ],
    correctAnswer: 2,
    explanation:
      'Re-wireable = wire melts when overloaded. Imprecise rating, can be re-wired with wrong gauge wire by user. BS 3036 use largely deprecated; cartridge or MCB is the standard now.',
  },
  {
    id: 7,
    question: 'BS 7671 A4:2026 §411.3.3 RCD coverage:',
    options: [
      'Required only for socket-outlets above 32 A',
      'Required only in bathrooms and other special locations',
      'Required only where a TT earthing system is used',
      'Mandatory for socket-outlets ≤32 A, with limited risk-assessed exceptions outside dwellings',
    ],
    correctAnswer: 3,
    explanation:
      '§411.3.3 was revised at A4:2026 — applies to socket-outlets with rated current ≤32 A. Exception only for non-dwelling premises where a documented risk assessment determines RCD protection is not necessary.',
  },
  {
    id: 8,
    question: 'AFDD requirement under BS 7671 A4:2026 §421.1.7:',
    options: [
      'Recommended (the regulation uses "recommending" wording); mandatory in HRRBs via Building Safety Act 2022',
      'Mandatory on every final circuit in all dwellings without exception',
      'Required only on three-phase distribution circuits',
      'Prohibited in domestic installations and permitted only in industry',
    ],
    correctAnswer: 0,
    explanation:
      '§421.1.7 was introduced at A2:2022 and carried forward at A4:2026 — wording is "recommending" the installation of AFDDs. Mandatory status comes from the Building Safety Act 2022 framework for High-Risk Residential Buildings (HRRBs), not from BS 7671 itself.',
  },
];

const faqs2 = [
  {
    question: 'When do I use a fuse vs an MCB?',
    answer:
      'Fuses: HRC (BS 88) for high breaking capacity needed in industrial DBs, motor isolators, and DNO supply cut-out. MCBs: domestic and commercial lighting/sockets, easier to reset, more selective overload curves. RCBOs: where per-circuit RCD is wanted.',
  },
  {
    question: 'Why is Type B insufficient for VFD circuits?',
    answer:
      'Type B detects all waveforms — sinusoidal AC, pulsed DC, smooth DC, high-frequency. VFDs leak DC and high-frequency to earth via internal EMC capacitors. Type AC and Type A get blinded by these and may fail to trip on a real AC fault. Hence Type B mandatory for VFDs and EV chargers.',
  },
  {
    question: 'What is "discrimination" between protective devices?',
    answer:
      'Lower-rated downstream device should trip first on a fault — leaving upstream feeders intact. E.g. a 6 A circuit MCB should trip before the 100 A main switch. Achieved by careful selection of trip curves or using Type S (selective) RCDs upstream.',
  },
  {
    question: 'How is RCBO better than RCD + MCB combinations?',
    answer:
      'RCBO gives per-circuit RCD protection. Fault on one circuit only trips that circuit, not the whole RCD-grouped half of the consumer unit. Best practice for new installs even though more expensive.',
  },
  {
    question: 'How long does an MCB last?',
    answer:
      "BS EN 60898 spec: 4000 mechanical operations + 4000 electrical at rated current. In domestic service that's decades. Most failures come from regularly tripping at high fault currents (which counts as harder duty).",
  },
  {
    question: 'Are AFDDs required for all houses now?',
    answer:
      'BS 7671 §421.1.7 uses "recommending" wording — strongly advised but not mandated by BS 7671 itself. The Building Safety Act 2022 makes AFDDs mandatory in HRRBs (high-risk residential buildings — typically 18 m / 7 storeys+). Industry best practice is to fit AFDDs in any sleeping accommodation and HMOs.',
  },
];

export default function Lesson304E_1_3() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        BS 88, BS EN 60898, RCBO, RCD, AFDD, SPD — six device families, each for a specific job.
        Pick the wrong one and you’re either on fire or unable to plug in.
      </p>

      <TLDR
        points={[
          'Six device families: BS 88 fuses, MCBs (BS EN 60898), RCBOs (BS EN 61009), RCDs (BS EN 61008), AFDDs (BS EN 62606), SPDs (BS EN 61643).',
          'Each has a specific protection job — overload, fault current, earth fault, arc fault, transient overvoltage. Layered together to cover every fault mode.',
          'Selection isn’t arbitrary — BS 7671 411 / 421 / 433 / 443 / 531 each push you to a specific device for a specific scenario.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the application of BS 88 series HRC fuses (high breaking capacity, industrial supply intakes).',
          'Distinguish between BS EN 60898 MCB Types B, C and D by magnetic trip range and typical loads.',
          'Describe an RCBO and explain why it dominates modern domestic consumer units.',
          'Distinguish between RCD Types AC, A, F and B by waveform sensitivity, with practical examples.',
          'Describe AFDD operation and identify where Reg 421.1.7 recommends them (and where the Building Safety Act 2022 framework / fire-safety guidance strengthens that to an effective requirement).',
          'Distinguish between SPD Types 1, 2 and 3 by lightning waveform, location and equipment protected.',
        ]}
        initialVisibleCount={3}
      />

      <ConsumerUnit caption="A modern split-load CU. Main switch, RCDs and a stack of MCBs / RCBOs. Add an SPD module at the origin and an AFDD per circuit (in HRRBs etc) and you’ve got every device family in this lesson on one DIN rail." />

      <SectionRule />

      <ContentEyebrow>1 — BS 88 series fuses (HRC)</ContentEyebrow>

      <ConceptBlock
        title="High-rupturing-capacity cartridge fuses for industrial supply intakes"
        plainEnglish="A sealed cartridge with a fusible element inside, surrounded by quartz sand. When a fault current melts the element, the sand quenches the resulting arc almost instantly. Sacrificial — one-shot — but with breaking capacities far above any MCB."
        onSite="Industrial supply intakes (DNO cut-out fuses are BS 88-3), sub-distribution boards on factories, switchfuse units. You’ll meet them at the origin of any commercial install — the supply company’s service fuse is almost always a BS 88-3 / BS 88-5 cartridge."
      >
        <p>Defining characteristics:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Breaking capacity</strong>: typically 50 kA to 100 kA, well beyond the 6 to 10
            kA of domestic MCBs. Essential where prospective fault current is high.
          </li>
          <li>
            <strong>Inverse time / current</strong>: fast on heavy faults, slow on small
            overloads. Designed to coordinate with downstream MCBs (selectivity).
          </li>
          <li>
            <strong>Sacrificial</strong>: blown fuse must be replaced — no resetting. Pros: no
            contact wear, very compact. Cons: stock spares, replacement requires isolation.
          </li>
          <li>
            <strong>Series rating</strong>: gG (general purpose), gM (motor circuit), aM (motor
            circuit, no overload protection — must be paired with an overload device).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>2 — BS EN 60898 MCBs (Type B / C / D)</ContentEyebrow>

      <ConceptBlock
        title="Resettable miniature circuit-breakers — the everyday device"
        plainEnglish="A combined thermal trip (slow, for overloads) and magnetic trip (fast, for short circuits) in a single DIN-rail module. Resettable. Standard for every domestic and most commercial final-circuit applications."
        onSite="Open any modern consumer unit and 80% of the modules are MCBs or RCBOs. They’re the workhorse — pick the right Type for the load, set the In to satisfy 433.1.1, fit, test, walk away."
      >
        <p>Type defines the magnetic trip threshold (in × In):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Type B</strong> — magnetic trip 3 to 5 × In. General domestic and resistive
            loads (lighting, sockets, immersion). Most common type by volume.
          </li>
          <li>
            <strong>Type C</strong> — magnetic trip 5 to 10 × In. Moderate inrush — fluorescent
            banks, small motors, transformer energising. Common in commercial.
          </li>
          <li>
            <strong>Type D</strong> — magnetic trip 10 to 20 × In. Heavy inrush — welders,
            induction motors, large transformers. Less common; used where lower types
            nuisance-trip on starting.
          </li>
        </ul>
        <p>
          <strong>Trade-off</strong>: the higher the magnetic trip threshold, the lower the
          maximum permitted Zs (earth-fault loop impedance) for thermal disconnection in the
          required time. A Type D MCB needs a much lower Zs than a Type B at the same In to ensure
          ADS in 0.4 s. Designers balance load type against earthing system to choose the right
          Type.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 533.1.1 (Selection of devices for protection against overcurrent)"
        clause="The time/current characteristics of an overcurrent protective device shall comply with those specified in BS 88 series, BS 3036, BS EN 60898, BS EN 60947-2 or BS EN 61009-1. The use of another device is not precluded provided that its time/current characteristics provide a level of protection not less than that given by the devices listed above."
        meaning={
          <>
            Translation: BS 7671 names the device families that ‘count’ for overcurrent protection
            — BS 88 series, BS 3036 rewireable fuses (legacy), BS EN 60898 MCBs, BS EN 60947-2
            industrial breakers and BS EN 61009-1 RCBOs. Anything else has to prove equivalent
            time/current performance.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 533.1.1."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />

      <ContentEyebrow>3 — RCBOs (BS EN 61009-1)</ContentEyebrow>

      <ConceptBlock
        title="MCB + RCD in one module — the modern domestic standard"
        plainEnglish="A single DIN-rail device that combines overload protection, fault-current protection AND residual-current (earth-fault) protection. Each circuit has its own 30 mA RCD with its own thermal trip — no shared-RCD nuisance trips."
        onSite="Modern domestic consumer units are now ‘all-RCBO’ as standard. Old-style split-load (one main switch + two RCDs feeding banks of MCBs) still appears on rewires, but new installs default to RCBOs because they satisfy 314.1 (minimise inconvenience) much more cleanly."
      >
        <p>Why RCBOs win on modern installs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Selective by circuit</strong> — a fault on one circuit only kills that
            circuit, not half the house.
          </li>
          <li>
            <strong>Simpler fault-finding</strong> — the tripped device IS the faulty circuit. No
            need to reset a shared RCD and wait for the offending circuit to trip again.
          </li>
          <li>
            <strong>Type-A as standard</strong> — modern RCBOs are predominantly Type A, catching
            pulsing DC residuals from LED drivers and switching power supplies that a Type AC
            misses.
          </li>
          <li>
            <strong>Fits the AFDD-RCBO combo</strong> — many manufacturers now offer combined
            AFDD/RCBO modules for HRRBs etc, satisfying 421.1.7 in one slot.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>4 — RCDs (BS EN 61008 / 61009 / 62423) — Type AC, A, F, B</ContentEyebrow>

      <ConceptBlock
        title="Residual current devices — picking the right type for the waveform"
        plainEnglish="An RCD trips on imbalance between line and neutral currents (‘residual current’). The Type tells you which fault-current waveforms it can detect."
        onSite="The Type matters more than ever in modern installs because EV chargers, PV inverters, variable-speed drives and even some LED dimmers produce DC residual components that older Type AC devices simply can’t see."
      >
        <p>The four types in increasing waveform coverage:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Type AC</strong> — sinusoidal AC residual currents only. Cheapest. Now
            deprecated for new installs because it misses pulsing DC.
          </li>
          <li>
            <strong>Type A</strong> — AC + pulsing DC residual currents (up to 6 mA smooth DC
            permitted). Modern domestic standard; covers LED drivers, computer PSUs, most ordinary
            household equipment.
          </li>
          <li>
            <strong>Type F</strong> — AC + pulsing DC + frequencies up to 1 kHz. Used with
            single-phase variable speed drives.
          </li>
          <li>
            <strong>Type B</strong> — AC + pulsing DC + smooth DC residual currents. Required for
            installations with smooth DC fault potential (EV chargers without internal 6 mA DC
            monitoring, large PV inverters, three-phase VSDs).
          </li>
        </ul>
        <p>
          <strong>A Type B can do everything a Type A can — but it costs more</strong>, so you
          spec the cheapest type that handles the actual load profile. Manufacturer instructions
          for the equipment will state the minimum RCD type acceptable.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 531.3.4.1 (RCDs operated by ordinary persons)"
        clause="In AC installations having RCDs that are intended to be operated by ordinary persons, the RCDs shall comply with: (a) BS EN 61008 series for Type AC and Type A RCCBs; or (b) BS EN 61009 series for Type AC and Type A RCBOs; or (c) BS EN 62423 for Type F and Type B RCCBs and RCBOs; or (d) BS 7288 for Type AC and Type A SRCDs and FCURCDs."
        meaning={
          <>
            Translation: the RCD must be of a recognised standard for the Type chosen — Type AC
            and Type A under BS EN 61008/61009, Type F and Type B under BS EN 62423. ‘Ordinary
            persons’ = users who aren’t electrically skilled, which is almost everyone you install
            for. Industrial installs with skilled operators have slightly different rules in
            531.3.5 onwards.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 531.3.4.1."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (RCD additional protection on socket-outlets) (paraphrased)"
        clause="411.3.3 has been revised and now applies to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary."
        meaning={
          <>
            Headline domestic rule: every socket-outlet with In ≤ 32 A in a dwelling must have 30
            mA RCD additional protection. Non-dwellings can omit it ONLY if a documented risk
            assessment concludes it’s not necessary — and you’d better be able to defend that
            assessment.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.3."
      />

      <InlineCheck {...checks[1]} />

      <SectionRule />

      <ContentEyebrow>5 — AFDDs (BS EN 62606) — arc fault detection</ContentEyebrow>

      <ConceptBlock
        title="The newest device family — catches the faults RCDs and MCBs miss"
        plainEnglish="An AFDD watches for the electrical signature of an arc fault — small, chattering, intermittent arcs caused by damaged cable insulation, loose terminals, rodent-chewed leads, deteriorated joints. Trips before the arc develops into a full fire."
        onSite="Recommended for AC final circuits supplying socket-outlets ≤ 32 A in dwellings (per BS 7671 Reg 421.1.7). The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs, sleeping accommodation and care homes, supporting fire-safety guidance treats them as effectively required practice. Costs noticeably more than a plain RCBO but has saved measurable numbers of fires in countries where they have been used widely for longer (Germany, US)."
      >
        <p>What an AFDD detects that other devices don’t:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Series arc faults</strong> — a loose terminal or fractured strand. Current
            draw stays normal; an MCB never trips. No earth path; an RCD never trips. Heat builds
            locally → fire.
          </li>
          <li>
            <strong>Parallel arc faults</strong> — between line and neutral inside damaged cable.
            Current may be limited by carbon tracking, well below MCB instantaneous trip
            threshold.
          </li>
          <li>
            <strong>Earth arc faults</strong> — line to earth via degraded insulation. RCD MAY
            trip but not always (intermittent, low residual, &lt; 30 mA).
          </li>
        </ul>
        <p>
          The AFDD uses signal processing on the line current waveform to recognise the
          characteristic frequency content of an arc and trips. Combined AFDD/RCBO modules
          integrate the lot in one DIN slot.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices)"
        clause="The regulation recommends the installation of arc fault detection devices (AFDDs) for AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in dwellings. (BS 7671 itself uses 'recommending' wording — strengthening to a requirement in Higher-Risk Residential Buildings comes from the Building Safety Act 2022 framework, and supporting fire-safety guidance treats AFDDs as effectively required practice in HMOs, sleeping accommodation and care homes.)"
        meaning={
          <>
            BS 7671 421.1.7 itself <em>recommends</em> AFDDs on AC final circuits supplying
            socket-outlets ≤ 32 A in dwellings. The recommendation strengthens to a requirement in
            Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022
            framework. In HMOs, sleeping accommodation and care homes, supporting fire-safety
            guidance treats them as effectively required practice. Expect the AFDD scope to expand
            further in future amendments.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 421.1.7 (as revised in A4:2026); Building Safety Act 2022 framework for HRRBs."
      />

      <InlineCheck {...checks[2]} />

      <SectionRule />

      <ContentEyebrow>6 — SPDs (BS EN 61643) — Type 1 / 2 / 3</ContentEyebrow>

      <ConceptBlock
        title="Surge protection devices — clamping transient overvoltages"
        plainEnglish="An SPD is a clamping device — when the voltage spikes above a set threshold (lightning, switching transient), it conducts the surge to earth before it can damage downstream equipment. Then it closes again, ready for the next surge."
        onSite="Goes in the consumer unit at the origin (Type 1 or 2). Sometimes added near sensitive equipment downstream (Type 3). Reg 443.4.1 has expanded the cases where SPDs are mandatory — almost every new install now needs at least a Type 2 at the origin unless the customer signs off the risk in writing."
      >
        <p>The three SPD types by application:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Type 1</strong> — direct lightning current (10/350 µs waveform). Used at the
            origin of installations with external lightning protection (LPS), or exposed buildings
            (rural, hilltop, farms with overhead lines).
          </li>
          <li>
            <strong>Type 2</strong> — induced / indirect surge (8/20 µs waveform). Standard origin
            device for buildings without direct strike risk. Most domestic / commercial installs.
          </li>
          <li>
            <strong>Type 3</strong> — point-of-use, fine clamping near sensitive equipment. Server
            cabinets, audio-visual racks, medical equipment. Coordinated downstream of Type 1 or
            2.
          </li>
        </ul>
        <p>
          <strong>Combo devices</strong>: Type 1+2 modules are common — a single SPD that handles
          both direct lightning and induced surges. Useful when DB space is tight.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 443.4.1 (Risk assessment for transient overvoltage protection)"
        clause="Protection against transient overvoltages shall be provided where the consequence caused by the overvoltage could result in: (a) serious injury to, or loss of, human life; (b) [Deleted by BS 7671:2018+A2:2022, Corrigendum (May 2023)]; (c) significant financial or data loss. For all other cases, protection against transient overvoltages shall be provided unless the owner of the installation declares it is not required due to any loss or damage being tolerable and they accept the risk of damage to equipment and any consequential loss."
        meaning={
          <>
            Two mandatory cases remain — (a) serious injury to, or loss of, human life, and (c)
            significant financial / data loss. Limb (b) was deleted by the BS 7671:2018+A2:2022
            Corrigendum (May 2023). ALL other cases also require SPDs UNLESS the owner declares
            acceptance of the risk in writing. Effectively, default is now ‘fit SPDs’ unless the
            customer opts out on paper.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 443.4.1."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 534.4.1.1 (SPD location and type)"
        clause="Where SPDs are required: (a) SPDs installed at the origin of the electrical installation shall be Type 1 or Type 2; (b) SPDs installed close to sensitive equipment to further protect against switching transients originating within the building shall be Type 2 or Type 3."
        meaning={
          <>
            Translation of placement: at the origin → Type 1 OR Type 2. Close to sensitive kit →
            Type 2 OR Type 3. The note in the regulation also points out that Type 1 SPDs are
            equipotential bonding SPDs — they alone won’t protect sensitive electronics; Type 2 /
            3 downstream is needed for that.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 534.4.1.1."
      />

      <SectionRule />

      <ContentEyebrow>Where it bites you on site</ContentEyebrow>

      <CommonMistake
        title="Specifying Type AC RCDs on a new install in 2026"
        whatHappens={
          <>
            The wholesaler had Type AC RCBOs on shelf and they were cheaper than Type A. You
            fitted them. Customer’s LED downlight drivers and laptop chargers all produce small
            pulsing DC residuals — under 6 mA each, but cumulatively enough to ‘blind’ the Type AC
            RCBO. Six months in, you get a callback for an intermittent socket fault. The Type AC
            isn’t tripping on a real fault because the DC component has desensitised it. The fault
            current is leaking to earth via somebody’s exposed- conductive-part — and the RCD that
            should protect them isn’t doing its job.
          </>
        }
        doInstead={
          <>
            Type A as the absolute minimum for new domestic installs. Costs a few quid more per
            RCBO, completely defensible against modern equipment. Type AC is now effectively
            deprecated — most manufacturers have stopped offering it for domestic-spec consumer
            units. If you need to retrofit, swap out Type AC for Type A on first opportunity.
          </>
        }
      />

      <Scenario
        title="The HRRB rewire — AFDDs were left out of the original quote"
        situation={
          <>
            You’re sub-contracted on a rewire of a 4-storey HMO converted from a Victorian
            terrace. The main contractor’s schedule of materials lists 18 standard Type A RCBOs
            and a Type 2 SPD. Customer expects to move tenants back in next week. You spot the
            building is clearly in scope of Reg 421.1.7 (HMO, sleeping accommodation) — every
            socket circuit needs an AFDD.
          </>
        }
        whatToDo={
          <>
            Stop and flag. BS 7671 Reg 421.1.7 <em>recommends</em> AFDDs on AC final circuits
            supplying socket-outlets ≤ 32 A in dwellings — and that recommendation strengthens to
            a requirement in HRRBs under the Building Safety Act 2022 framework. In HMOs, sleeping
            accommodation and care homes, supporting fire-safety guidance treats AFDDs as
            effectively required practice — so on this HMO rewire you should fit them. Two
            practical options. (1) Order combined AFDD/RCBO modules to swap in for the 18 RCBOs
            (compact, one slot per circuit). (2) Order separate AFDDs (some manufacturers offer
            them as 1-module add-ons upstream of an RCBO) — needs more DB space. Better to delay
            the tenant move-in by a week than to issue an EIC the wider fire-safety regime would
            treat as non-compliant.
          </>
        }
        whyItMatters={
          <>
            AFDDs are recommended for AC final circuits supplying socket-outlets ≤ 32 A in
            dwellings (per BS 7671 Reg 421.1.7). The recommendation strengthens to a requirement
            in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022
            framework. In HMOs, sleeping accommodation and care homes, supporting fire-safety
            guidance treats them as effectively required practice. Tenants in HMO-style sleeping
            accommodation are the highest-risk demographic for electrical fires (long hours
            asleep, often-unfamiliar electrics, sometimes damaged equipment). Sign off without
            AFDDs and your name is on the EIC when the worst happens.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Six device families: BS 88 fuses (industrial supply), BS EN 60898 MCBs (B/C/D), RCBOs (combined MCB + RCD), RCDs (Type AC/A/F/B), AFDDs (arc fault), SPDs (Type 1/2/3 surge).',
          'MCB Type B/C/D differ by magnetic trip threshold — pick to match inrush profile, balance against Zs requirement.',
          'RCBOs dominate modern domestic — one circuit per device with combined overload + 30 mA earth-fault, satisfying 314.1 selectivity.',
          'RCD Type matters: Type AC is deprecated; Type A is modern domestic minimum; Type B for EV / PV / VSD with smooth DC residual.',
          'Reg 421.1.7 (revised) recommends AFDDs on AC final circuits supplying socket-outlets ≤ 32 A in dwellings; the recommendation strengthens to a requirement in HRRBs under the Building Safety Act 2022 framework, and in HMOs / sleeping accommodation / care homes supporting fire-safety guidance treats them as effectively required.',
          'Reg 443.4.1 expands SPD requirements — default is now ‘fit SPDs’ unless owner declares acceptance of risk in writing.',
          'Reg 534.4.1.1 places SPDs: Type 1 or 2 at the origin; Type 2 or 3 near sensitive equipment.',
          'Reg 411.3.3 mandates 30 mA RCD additional protection on socket-outlets ≤ 32 A in all dwellings; non-dwellings can omit only with documented risk assessment.',
        ]}
      />

      <Quiz title="Protective device applications — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Fuses (BS 88, BS 1361, BS 3036), MCBs (BS EN 60898), RCDs (BS EN 61008), RCBOs (BS EN
        61009), AFDDs (BS EN 62606) under BS 7671:2018+A4:2026.
      </p>

      <TLDR
        points={[
          'Fuses (BS 88/1361/3036): wire or element melts on overcurrent. Cheap, reliable, but single-shot.',
          'MCB (BS EN 60898): magnetic + thermal protection. Types B/C/D for different inrush profiles.',
          'RCD (BS EN 61008): senses imbalance between L and N — trips on earth leakage > I_Δn.',
          'RCBO (BS EN 61009): combined MCB + RCD — per-circuit protection.',
          'AFDD (BS EN 62606): A4:2026 §421.1.7 recommends them; mandatory in HRRBs via Building Safety Act 2022.',
          'A4:2026 §411.3.3 covers all socket-outlets ≤32 A; exception only outside dwellings via documented risk assessment.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify fuse types (BS 88, BS 1361, BS 3036) and where each is used.',
          'Distinguish MCB types B, C, D and select the right one for the load.',
          'Distinguish RCD types AC, A, B and specify Type B for VFD/EV circuits.',
          'Calculate disconnection times required by BS 7671 §411.3.2.',
          'Identify when AFDDs are required — BS 7671 §421.1.7 recommendation vs HRRB mandate.',
          'Specify per-circuit RCBOs vs grouped RCD strategies.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Fuses</ContentEyebrow>

      <ConceptBlock
        title="The simplest protective device"
        plainEnglish="A wire or element designed to melt at a known current, breaking the circuit. Single-shot — replace once blown."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>BS 1361 (now BS 88-3)</strong> HRC cartridge — domestic supply cut-out (60-100
            A typical).
          </li>
          <li>
            <strong>BS 88-2/3</strong> HRC industrial — 2 A to 1250 A, breaking capacity 33-80 kA.
          </li>
          <li>
            <strong>BS 3036</strong> re-wireable (semi-enclosed) — older domestic boards. Lower
            breaking capacity, less precise. Largely replaced.
          </li>
          <li>
            <strong>BS 1362</strong> plug-top fuse — 3, 5, 13 A in BS 1363 plugs.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard {...videos.fuses} />

      <ConceptBlock
        title="Fuse characteristics — gG, gM, aM and the time-current curve"
        plainEnglish="Industrial HRC fuses (BS 88-2 / IEC 60269) carry letter codes that tell you what they're designed to protect. 'g' means general purpose (full protection from minor overload to short circuit). 'a' means short-circuit only (back-up — needs another device for overload). The second letter tells you the load type: G general, M motor, R semiconductor, etc."
      >
        <p>
          <strong>gG fuses</strong> are the all-purpose industrial cable protector — used in
          distribution boards, sub-mains, lighting and small power circuits. The time-current
          characteristic is gentle: a 100 A gG fuse takes about an hour to blow at 130 A, four
          seconds at 500 A, and 10 ms at 5000 A.
        </p>
        <p>
          <strong>gM fuses</strong> have two ratings printed on them (e.g. "32 M 50") — the first
          is the rated continuous current (32 A, sets thermal protection of the wiring), the
          second is the design current of the device they protect (50 A, sets behaviour under
          overload). Used for motor circuits where the cable is sized for FLA but the motor itself
          draws much higher inrush.
        </p>
        <p>
          <strong>aM fuses</strong> protect motors against short-circuit only — they will NOT trip
          on a sustained overload. They must be paired with a thermal overload relay for
          full protection. Fast clearance on a fault, gentle on motor inrush. Rare in modern UK
          installs (MCBs and contactors with electronic overloads dominate) but still found in
          heritage industrial sites.
        </p>
        <p>
          <strong>aR fuses</strong> are extremely fast (sub-cycle) for protecting power
          semiconductors — VFD and rectifier input fuses. Will blow in microseconds on a thyristor
          or IGBT failure to limit cascade damage.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>MCBs (BS EN 60898)</ContentEyebrow>

      <ConceptBlock
        title="Magnetic + thermal trip in one resettable unit"
        plainEnglish="MCB has two trip mechanisms: thermal bimetallic strip for sustained overload, and magnetic for instantaneous fault. Trip curves let you pick by inrush."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Type B</strong> instantaneous 3-5× I_n. Resistive loads (lighting, sockets
            without inrush).
          </li>
          <li>
            <strong>Type C</strong> 5-10× I_n. Mixed loads, motor circuits, LED arrays with
            switching PSUs.
          </li>
          <li>
            <strong>Type D</strong> 10-20× I_n. High-inrush loads (transformers, X-ray, large
            motors).
          </li>
        </ul>
        <p>
          <strong>Breaking capacity Icn:</strong> 6 kA standard domestic; 10 kA / 25 kA / higher
          for industrial.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Inside an MCB — bimetallic strip, magnetic plunger, arc chute and spring latch"
        plainEnglish="Cut an MCB in half (you'll never need to, but it's instructive) and you find: a series-connected bimetallic strip that bends with sustained current and trips a mechanical latch (the thermal element); a solenoid coil with a spring-loaded iron plunger that fires the same latch on a high fault current (the magnetic element); a stretched-spring contact mechanism that flings the contacts apart violently when the latch releases; and an arc chute identical in concept to a contactor's that splits and extinguishes the resulting arc."
      >
        <p>
          <strong>Thermal element</strong> handles sustained overload — say, 1.45× rated current
          for a few minutes. The bimetallic strip warms, bends, and eventually trips the latch.
          The trip time depends on the I²t energy delivered. This is the protection that stops a
          32 A circuit from running at 50 A indefinitely and slowly cooking the cable insulation.
        </p>
        <p>
          <strong>Magnetic element</strong> handles instantaneous fault — a short-circuit between
          line and neutral or line and earth. Current jumps to many times rated almost instantly;
          the solenoid plunger pulls in within milliseconds, fires the same latch, and the
          contacts open before the I²t energy can damage the cable or downstream equipment. The
          3–5× / 5–10× / 10–20× thresholds you memorise as Type B/C/D are the magnetic plunger
          trip points.
        </p>
        <p>
          <strong>Breaking capacity</strong> is the maximum prospective short-circuit current the
          MCB can safely interrupt without exploding or welding shut. A domestic 6 kA MCB is fine
          in a typical TT or TN-C-S house where prospective fault current at the CU is usually 1–4
          kA. Commercial sites with bigger transformers and shorter feeders can see 10–25 kA —
          needs 10 kA or 25 kA MCBs, or back-up fusing upstream.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks2[0]} />

      <SectionRule />

      <ContentEyebrow>RCDs and RCBOs</ContentEyebrow>

      <ConceptBlock
        title="Detect imbalance to earth"
        plainEnglish="RCD measures the vector sum of all live conductors (line + neutral, plus other lines on 3-phase). Healthy circuit = sum is zero. Fault to earth = current escapes via earth path → sum is non-zero → trip."
      >
        <p>
          <strong>Common ratings:</strong> 30 mA (life safety), 100 mA (fire risk), 300 mA
          (high-current circuits, sub-mains). Time-delay (Type S) for upstream selectivity.
        </p>
        <p>
          <strong>Types:</strong> AC (basic AC sinusoidal only), A (AC + pulsed DC, modern default
          for most loads), B (full DC + AC + HF — for VFDs, EV chargers, modern PV).
        </p>
        <p>
          RCBO combines MCB + RCD on one device, occupying one DIN slot per circuit (plus one
          neutral). Standard for new installs to give per-circuit RCD.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Inside an RCD — the toroidal core, sensing coil and trip mechanism"
        plainEnglish="Every RCD is built around a small toroidal (ring-shaped) ferromagnetic core. All the live conductors of the protected circuit (line and neutral on a single-phase RCD; L1, L2, L3 and N on a four-pole) pass straight through the centre of the ring. A sensing coil wound on the toroid delivers a voltage to the trip electronics whenever the magnetic flux in the toroid is non-zero."
      >
        <p>
          In normal operation, the line current going OUT through the toroid exactly equals the
          neutral current coming BACK through it. The two equal-and-opposite ampere-turns produce
          zero net flux in the core. The sensing coil sees nothing. RCD stays closed.
        </p>
        <p>
          If a fault leaks some current to earth (e.g. via a person touching a live conductor, or
          insulation breakdown to a metallic case bonded to earth), the line current is now
          greater than the returning neutral current — the difference is the residual current. Net
          ampere-turns in the toroid become non-zero, flux appears in the core, sensing coil
          generates an output voltage, trip electronics fires the spring-loaded contact mechanism
          within ~10–40 ms, contacts open, fault disconnected.
        </p>
        <p>
          <strong>The 'no overcurrent protection' part.</strong> A pure RCD has no thermal or
          magnetic overcurrent element. It will pass 1000 A short-circuit current straight through
          itself for as long as the fault lasts, without tripping, until the upstream MCB or fuse
          interrupts the circuit. Always pair an RCD with appropriate overcurrent protection —
          that's why an RCBO (which combines both into one device) is the modern preferred unit.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Discrimination, selectivity and the case for RCBOs"
        plainEnglish="Discrimination (also called 'selectivity') means: when a fault occurs, only the single device closest to the fault should trip. Upstream devices should stay closed so the rest of the installation keeps running. A correctly discriminated installation isolates the smallest possible portion of the circuit on any fault."
      >
        <p>
          <strong>Overcurrent discrimination</strong> is achieved by current ratio. A 6 A MCB
          downstream of a 100 A main switch will always trip first on a fault, because the 6 A
          device's magnetic threshold (e.g. 30 A on Type B) is far below the 100 A main switch's
          lowest trip threshold. Easy.
        </p>
        <p>
          <strong>RCD discrimination</strong> is harder. Two RCDs of equal sensitivity in series
          can both trip simultaneously on a fault — neither one is faster. The fix is either (a)
          higher sensitivity downstream and lower sensitivity upstream (e.g. 30 mA at the final
          circuit, 100 mA on the sub-main, 300 mA on the incoming) PLUS time delay on the upstream
          device (Type S — 'selective', delays trip by 130–500 ms to give downstream device time
          to clear); or (b) per-circuit RCBOs so there's only one RCD between the load and the
          supply — no series RCD problem at all.
        </p>
        <p>
          This is the single biggest practical reason RCBOs have replaced 'split-load' RCD-grouped
          consumer units in new installs. With RCBOs, a fault on the kitchen ring trips only the
          kitchen ring; lights, sockets, EV charger and shower stay on. With grouped RCDs, the
          same fault dropped half the house out — and could leave occupants in darkness on a
          winter evening.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks2[1]} />
      <InlineCheck {...checks2[2]} />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (RCD on socket-outlets)"
        clause="Regulation 411.3.3 has been revised and now applies to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary."
        meaning={
          <>
            Effectively all socket-outlets ≤32 A now require 30 mA RCD additional protection.
            Exception is only available outside dwellings, requires a documented risk assessment,
            and the assessment must show RCD protection is not needed for safety. In dwellings
            (homes, flats, HMOs) there is no exception — every socket on a final circuit gets RCD
            protection.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.3."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs)"
        clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
        meaning={
          <>
            The wording is "recommending" — BS 7671 itself does not mandate AFDDs in any specific
            occupancy. The mandatory status comes externally: the Building Safety Act 2022
            framework for High-Risk Residential Buildings (HRRBs, broadly buildings ≥18 m / 7
            storeys with sleeping accommodation) sets AFDDs as a requirement for final circuits
            feeding sockets. Industry best practice is to fit AFDDs in any sleeping accommodation,
            HMOs, residential care and other higher-risk premises regardless of HRRB status.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 421.1.7; Building Safety Act 2022."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.4 (RCD on luminaire circuits)"
        clause="Regulation 411.3.4 requires that, within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
        meaning={
          <>
            In any domestic premises, every lighting circuit must now have 30 mA RCD protection.
            This is a hard requirement — there's no risk-assessment exception in dwellings.
            Practically, every consumer unit in a new domestic install needs RCBOs (per-circuit)
            or RCD-grouped MCBs covering the lighting circuits.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.4."
      />

      <SectionRule />

      <CommonMistake
        title="Replacing a Type B 30 mA RCD with Type AC on an EV charger circuit"
        whatHappens={
          <>
            Type AC unit doesn't detect DC residual. The EV charger's on-board electronics
            generate DC components. Type AC RCD's sensing core saturates, blinding it. Real AC
            fault doesn't trip — and worst case, the user gets a shock from a live conductor in
            the charging cable.
          </>
        }
        doInstead={
          <>
            EV chargers MUST be protected by Type B RCD (or have integrated DC fault current
            monitoring per IEC 62752). Same applies to PV inverters and any VFD-fed load. Read the
            equipment data sheet for the required RCD type and §531.3.3 for the BS 7671 framing.
          </>
        }
      />

      <CommonMistake
        title="Saying 'AFDDs are now mandatory' on every quotation"
        whatHappens={
          <>
            Apprentice tells customer AFDDs are recommended (Reg 421.1.7) in their detached house.
            Customer pays the AFDD premium. Competitor electrician quotes without AFDDs. Customer
            feels misled and leaves a bad review.
          </>
        }
        doInstead={
          <>
            Be precise: §421.1.7 wording is "recommending". AFDDs are recommended (Reg 421.1.7) in
            HRRBs under the Building Safety Act 2022 (typically buildings ≥18 m / 7 storeys with
            sleeping accommodation). For an ordinary detached house they're a recommendation —
            strongly advised in sleeping accommodation, but not legally required. Quote them as an
            option, explain the fire-risk benefit, let the customer decide.
          </>
        }
      />

      <ConceptBlock
        title="AFDDs — what an arc fault detector actually detects"
        plainEnglish="An arc fault is a sustained electrical arc that doesn't draw enough current to trip an MCB and doesn't leak enough to earth to trip an RCD — but releases enough heat to ignite combustibles. Damaged twin-and-earth pinched under a floorboard, a loose terminal in a back box, a chafed flex behind a TV unit. House fires of unknown electrical origin are mostly these. AFDDs detect the unique high-frequency current signature an arc creates and trip the circuit before ignition."
      >
        <p>
          <strong>How they work:</strong> the AFDD continuously samples the load current at high
          speed (typically &gt; 100 kHz) and feeds it through a digital signal processor that
          looks for the broadband noise and characteristic spectral fingerprint of arcing. To
          avoid nuisance tripping it must distinguish a real fault arc from harmless arcing in
          motors, switches, dimmers, brushed appliances and welders. False positive avoidance is
          the hard engineering — first-generation AFDDs from the early 2010s tripped constantly;
          modern (2020+) units are reliable.
        </p>
        <p>
          <strong>Two arc types covered:</strong> series arcs (loose terminal — current is normal,
          voltage is wrong) and parallel arcs (cable damage L-N or L-PE — current is elevated but
          below MCB threshold). Modern AFDDs detect both. Some early-generation units only covered
          parallel arcs; verify product datasheet against BS EN 62606.
        </p>
        <p>
          <strong>Where to fit them:</strong> mandatory in HRRBs via the Building Safety Act 2022;
          strongly recommended in HMOs, residential care, school dormitories, places where escape
          may be impeded; recommended (not mandatory under BS 7671) elsewhere. Most reputable CU
          manufacturers now offer a combined AFDD + RCBO + MCB device that occupies a single DIN
          slot — the practical default for new builds in any sleeping accommodation.
        </p>
      </ConceptBlock>

      <Scenario
        title="Choosing protection for a kitchen ring final circuit in a new build"
        situation={
          <>
            32 A B32 ring final circuit, three double-sockets, one cooker hood, one
            fridge-freezer, one microwave on the same ring. Customer wants modern protection.
          </>
        }
        whatToDo={
          <>
            RCBO 32 A Type A 30 mA per circuit — gives per-circuit protection without taking the
            whole RCD half of the CU offline on a fault. Type A is the default for modern loads
            (mixed AC + pulsed DC).
            <br />
            If the dwelling falls under HRRB scope (or customer wants best-practice fire safety):
            combined AFDD+RCBO single device per §421.1.7 recommendation and Building Safety Act
            2022 mandate.
            <br />
            For a standard owner-occupied house: AFDD recommended but not mandatory. Recommend it
            on the spec; let the customer decide.
            <br />
            Lighting circuit: must have 30 mA RCD per §411.3.4 (no exception in dwellings).
          </>
        }
        whyItMatters={
          <>
            A4:2026 has tightened RCD coverage substantially — sockets ≤32 A and lighting circuits
            in dwellings both mandatory. AFDD wording is "recommending" but HRRB framework makes
            it a hard requirement in scope. Get the regulatory framing right in your quote and the
            customer trusts your advice.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Fuses: BS 88 (industrial HRC), BS 1361/88-3 (DNO cut-out), BS 1362 (plug-top), BS 3036 (re-wireable, deprecated).',
          'MCB types: B (3-5× resistive), C (5-10× motors), D (10-20× transformers).',
          'RCD types: AC (basic — restricted to no-DC loads), A (modern default), B (mandatory for VFD/EV).',
          'RCBO = MCB + RCD on one device. Standard for new installs.',
          'A4:2026 §411.3.3: socket-outlets ≤32 A — RCD mandatory in dwellings, exception via risk assessment outside dwellings.',
          'A4:2026 §411.3.4: lighting circuits in domestic premises — 30 mA RCD mandatory, no exception.',
          'A4:2026 §421.1.7: AFDDs recommended; mandatory in HRRBs via Building Safety Act 2022.',
        ]}
      />

      <Quiz title="Protective devices knowledge check" questions={quizQuestions2} />
    </div>
  );
}
