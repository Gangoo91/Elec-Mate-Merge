/**
 * Module 4 · Section 3 · Subsection 4 — Discrimination and Coordination
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Full vs partial discrimination, time discrimination via MCCB STD settings, current
 *   discrimination using cable impedance reduction, energy let-through (I²t),
 *   selectivity tables, cascade (back-up) protection and Zone Selective Interlocking.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Discrimination and Coordination - HNC Module 4 Section 3.4';
const DESCRIPTION =
  'Master protection discrimination and coordination for building services: time discrimination, current discrimination, energy let-through, cascade coordination, and selectivity tables.';

const quickCheckQuestions = [
  {
    id: 'discrimination-purpose',
    question:
      'What is the primary purpose of discrimination (selectivity) between protective devices?',
    options: [
      'To reduce installation costs',
      'To ensure only the device nearest the fault operates',
      'To increase fault current levels',
      'To allow higher cable ratings',
    ],
    correctIndex: 1,
    explanation:
      'Discrimination ensures only the protective device immediately upstream of a fault operates, leaving the rest of the installation energised. This minimises disruption and aids fault location.',
  },
  {
    id: 'time-discrimination',
    question: 'For time discrimination to work, the upstream device must have:',
    options: [
      'Lower current rating',
      'Shorter operating time',
      'Longer operating time',
      'Same characteristics',
    ],
    correctIndex: 2,
    explanation:
      'Time discrimination requires the upstream (supply-side) device to have a longer operating time than the downstream device, allowing the downstream device to clear the fault first.',
  },
  {
    id: 'current-discrimination',
    question: 'Current discrimination relies on the fact that:',
    options: [
      'All devices have the same rating',
      'Fault current is higher at the origin than downstream',
      'Cables limit current equally throughout',
      'RCDs provide current limiting',
    ],
    correctIndex: 1,
    explanation:
      "Current discrimination uses the natural reduction in fault current along cable runs. The upstream device sees lower fault current and doesn't reach its instantaneous trip threshold.",
  },
  {
    id: 'cascade-backup',
    question: 'What is cascade (back-up) protection?',
    options: [
      'Devices operate in sequence',
      'Upstream device assists downstream device in fault clearance',
      'Multiple RCDs in series',
      'Time-delayed tripping',
    ],
    correctIndex: 1,
    explanation:
      "Cascade protection allows an upstream device with higher breaking capacity to assist a downstream device in clearing faults that exceed the downstream device's breaking capacity.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the typical time discrimination ratio required between MCBs in series?',
    options: ['No discrimination possible', '1.5:1', '2:1', '3:1'],
    correctAnswer: 0,
    explanation:
      'Standard MCBs typically cannot achieve reliable discrimination in the magnetic (instantaneous) region due to similar operating times. This is why fuse-MCB or MCCB-MCB combinations are preferred.',
  },
  {
    id: 2,
    question:
      'When using BS 88 fuses for discrimination, what current ratio is typically required?',
    options: ['1.2:1', '1.6:1', '2:1', '3:1'],
    correctAnswer: 2,
    explanation:
      'BS 88 fuses typically achieve discrimination at a 2:1 current ratio across most of their operating range. This makes them excellent for distribution system discrimination.',
  },
  {
    id: 3,
    question: 'What does I²t represent in protective device coordination?',
    options: [
      'Device rating squared',
      'Energy let-through during fault clearance',
      'Installation test current',
      'Inrush current multiplier',
    ],
    correctAnswer: 1,
    explanation:
      "I²t (I-squared-t) represents the energy let-through during fault clearance. For discrimination, the downstream device must clear the fault with lower I²t than the upstream device's withstand capability.",
  },
  {
    id: 4,
    question: 'Partial discrimination means:',
    options: [
      'Discrimination only works at low currents',
      'Only some devices discriminate',
      'Discrimination is achieved up to a specific fault level only',
      'Half the devices trip on any fault',
    ],
    correctAnswer: 2,
    explanation:
      'Partial discrimination occurs when devices discriminate up to a specific current level. Above this limit, both devices may operate. Full discrimination means discrimination at all fault levels.',
  },
  {
    id: 5,
    question: 'Which device combination typically provides the best discrimination?',
    options: ['MCB - MCB', 'MCCB - MCCB', 'HRC fuse - MCB', 'RCD - RCD'],
    correctAnswer: 2,
    explanation:
      "HRC fuse upstream with MCB downstream provides excellent discrimination. The fuse's different time-current characteristic and current-limiting ability allows reliable selectivity.",
  },
  {
    id: 6,
    question: 'In a distribution system, where is discrimination most critical?',
    options: [
      'At final circuits only',
      'Between the incomer and first distribution tier',
      'At socket outlets',
      'At lighting circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Discrimination is most critical at the main incomer level, where a fault causing the main device to trip would affect the entire installation. Loss of discrimination here has maximum impact.',
  },
  {
    id: 7,
    question: "What information do manufacturers' selectivity tables provide?",
    options: [
      'Cable sizing data',
      'Combinations of devices that achieve discrimination and to what fault level',
      'RCD test intervals',
      'Voltage drop calculations',
    ],
    correctAnswer: 1,
    explanation:
      'Selectivity (coordination) tables show which device combinations achieve discrimination and specify the maximum fault current for which discrimination is guaranteed.',
  },
  {
    id: 8,
    question: 'An MCCB with short-time delay (STD) setting achieves discrimination by:',
    options: [
      'Reducing its breaking capacity',
      'Increasing its current rating',
      'Intentionally delaying operation to allow downstream devices to clear first',
      'Operating faster than downstream devices',
    ],
    correctAnswer: 2,
    explanation:
      "Short-time delay deliberately delays the MCCB's operation (typically 100-500ms) allowing downstream devices time to clear faults within their zones before the MCCB operates.",
  },
  {
    id: 9,
    question: 'Zone selective interlocking (ZSI) improves discrimination by:',
    options: [
      'Reducing fault current',
      'Using communication between devices to identify fault location',
      'Increasing cable sizes',
      'Adding more protective devices',
    ],
    correctAnswer: 1,
    explanation:
      'ZSI uses communication (typically hardwired) between devices. If a downstream device detects a fault, it signals the upstream device to delay. If no signal is received, the upstream device trips instantly.',
  },
  {
    id: 10,
    question: 'For cascade protection to be valid, what must be verified?',
    options: [
      'Cable lengths are equal',
      'Both devices have same manufacturer',
      "Combined let-through energy doesn't exceed downstream cable withstand",
      'Devices have matching current ratings',
    ],
    correctAnswer: 2,
    explanation:
      "Cascade protection is only valid if the combined let-through energy (I²t) of both devices operating together doesn't exceed the thermal withstand (k²S²) of the downstream cable.",
  },
];

const faqs = [
  {
    question: "What's the difference between discrimination and cascade protection?",
    answer:
      "Discrimination (selectivity) ensures only the device nearest the fault operates - the upstream device should not operate at all. Cascade (back-up) protection deliberately uses the upstream device to assist fault clearance when the downstream device's breaking capacity is insufficient. With cascade, both devices may operate together but safely clear the fault.",
  },
  {
    question: "Why can't two MCBs in series achieve reliable discrimination?",
    answer:
      "Standard MCBs have very similar magnetic trip characteristics (operating within milliseconds at high fault currents). Both devices 'see' the same fault current and operate almost simultaneously. The small manufacturing tolerance differences mean neither consistently operates first. For reliable discrimination, different device types (e.g., HRC fuse upstream) or MCCB with time delay are needed.",
  },
  {
    question: 'How do I use manufacturer selectivity tables?',
    answer:
      "Selectivity tables show the maximum fault current (in kA) for which discrimination is achieved between specific device combinations. Find the upstream device in rows and downstream device in columns. The table value indicates the discrimination limit. Values marked 'T' indicate total (full) discrimination at all fault levels. Values below the installation's prospective fault current confirm adequate discrimination.",
  },
  {
    question: 'When is partial discrimination acceptable?',
    answer:
      'Partial discrimination may be acceptable for non-critical circuits where occasional wider tripping is tolerable. However, for critical systems (hospitals, data centres, continuous processes), full discrimination at the maximum prospective fault current is required. Building services engineers should assess the consequences of discrimination failure for each application.',
  },
  {
    question: 'What is the benefit of HRC fuses for discrimination?',
    answer:
      "HRC fuses have excellent discrimination properties: they follow a consistent inverse-time characteristic across their range; they achieve reliable 2:1 ratio discrimination; their current-limiting action reduces let-through energy; they have very high breaking capacity (80kA+); and they discriminate well with downstream MCBs. However, they require replacement after operation and don't indicate trip cause.",
  },
  {
    question: 'How does energy let-through (I²t) relate to discrimination?',
    answer:
      "For the upstream device not to operate, the downstream device must clear the fault with less energy (I²t) than would cause the upstream device to operate. Manufacturers provide I²t values for comparison. Additionally, the let-through I²t must not exceed the cable's thermal withstand (k²S²). Current-limiting devices like HRC fuses have very low let-through I²t, aiding discrimination.",
  },
];

const HNCModule4Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 4"
            title="Discrimination and Coordination"
            description="Achieving selective protection to minimise disruption and maintain supply continuity."
            tone="purple"
          />

          <TLDR
            points={[
              'Discrimination (selectivity) ensures only the device closest to a fault operates — the upstream stays in, only the affected circuit loses supply.',
              'Three discrimination methods: time (delayed upstream trip), current (different rated currents), energy (current-limiting upstream — fuse vs MCB I²t).',
              'Rule-of-thumb: 2:1 current ratio between upstream and downstream for fuse-fuse, 3:1 for fuse-MCB, manufacturer tables for MCB-MCB and MCCB-MCB.',
              'Cascade (back-up) protection: a device with lower breaking capacity is &lsquo;backed up&rsquo; by an upstream higher-capacity device — accept loss of discrimination at high fault levels.',
              'BS 7671 Reg 536.4.202 (redrafted in A4:2026) explicitly covers coordination between LV switchgear and overload protective device, including discrimination.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 536.4.202 (Coordination of overload protective devices)"
            clause="Coordination under Regulation 536.4.202 shall include the sequence of operation and discrimination (selectivity) between upstream and downstream overload protective devices so that disconnection is restricted to the smallest possible part of the installation."
            meaning={
              <>
                Reg 536.4.202 was redrafted in BS 7671:2018+A4:2026 and now explicitly requires
                coordination between LV switchgear and overload protective devices, including
                discrimination, so that fault disconnection is restricted to the smallest
                possible part of the installation. As designer you must demonstrate the
                coordination — typically using manufacturer selectivity tables, time-current
                characteristic overlays, or computed I²t comparisons. Document the analysis
                alongside the cable schedule.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 536.4.202; manufacturer selectivity / discrimination tables; BEAMA Guide to Discrimination."
          />

          <LearningOutcomes
            outcomes={[
              'Explain the importance of discrimination in building services',
              'Apply time and current discrimination principles',
              "Use manufacturers' selectivity tables for device coordination",
              'Understand cascade (back-up) protection and its applications',
              'Calculate energy let-through for cable protection verification',
              'Specify devices for full or partial discrimination',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Discrimination Fundamentals">
            <p>
              Discrimination (or selectivity) ensures that when a fault occurs, only the
              protective device immediately upstream of the fault operates. This maintains supply
              to unaffected circuits and minimises disruption.
            </p>
            <p>
              <strong>Benefits of good discrimination:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimises extent of supply interruption during faults</li>
              <li>Aids rapid fault location (affected circuit is obvious)</li>
              <li>Maintains supply to critical loads during downstream faults</li>
              <li>Reduces system restoration time after faults</li>
              <li>Required for essential services (hospitals, data centres)</li>
            </ul>
            <p>
              <strong>Full (total) discrimination:</strong> The downstream device always operates
              before the upstream device, regardless of fault current level up to the system
              maximum.
            </p>
            <p>
              <strong>Partial discrimination:</strong> Discrimination achieved up to a specific
              fault current level. Above this, both devices may operate together.
            </p>
            <p>
              <strong>Discrimination study hierarchy (level / typical devices / discrimination priority):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Utility incomer — DNO fuse/ACB — critical, affects entire supply</li>
              <li>Main switchboard — MCCB/ACB — high, affects building section</li>
              <li>Sub-distribution — MCCB/HRC — medium, affects floor/zone</li>
              <li>Final circuits — MCB/RCBO — lower, single circuit only</li>
            </ul>
            <p>
              <strong>Key principle:</strong> Invest most discrimination effort at higher levels
              where fault impact is greatest.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Time Discrimination">
            <p>
              Time discrimination relies on the upstream device having a longer operating time
              than the downstream device at the same fault current. The downstream device clears
              the fault before the upstream device has time to operate.
            </p>
            <p>
              <strong>Time discrimination requirement:</strong> t<sub>upstream</sub> &gt; t
              <sub>downstream</sub> + Δt — where Δt is a margin for tolerance (typically 50-100ms).
            </p>
            <p>
              <strong>Achieving time discrimination (method / device type / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inherent time grading — HRC fuses (2:1 ratio) — distribution boards</li>
              <li>Short-time delay (STD) — MCCBs, ACBs — main switchboards</li>
              <li>Zone selective interlock — electronic trip MCCBs — critical systems</li>
              <li>
                Different characteristics — fuse + MCB combination — sub-distribution to finals
              </li>
            </ul>
            <p>
              <strong>MCCB time settings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Instantaneous (I):</strong> no intentional delay
              </li>
              <li>
                <strong>Short-time (S):</strong> 50-500ms delay
              </li>
              <li>
                <strong>Long-time (L):</strong> overload timing
              </li>
              <li>
                <strong>Ground (G):</strong> earth fault timing
              </li>
            </ul>
            <p>
              <strong>Typical time steps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Final circuit MCB: instantaneous</li>
              <li>Sub-board MCCB: 100ms</li>
              <li>Main board MCCB: 200ms</li>
              <li>Incomer: 300-500ms</li>
            </ul>
            <p>
              <strong>Caution:</strong> Time delays allow fault current to flow longer, requiring
              equipment to withstand the thermal stress. Verify Icw (short-time withstand) rating
              of MCCBs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Current Discrimination and Energy Let-Through">
            <p>
              Current discrimination exploits the natural reduction in fault current along cable
              runs. The upstream device is set to operate at a current higher than the maximum
              fault current downstream.
            </p>
            <p>
              <strong>Current discrimination principle:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fault current is highest at the supply source</li>
              <li>Cable impedance reduces fault current along the run</li>
              <li>Downstream fault current may be below upstream instantaneous setting</li>
              <li>Upstream device operates on thermal characteristic (slower)</li>
            </ul>
            <p>
              <strong>Example — current discrimination:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main board MCCB: 100A, Im = 10 × Ir = 800A</li>
              <li>Sub-board after 30m 35mm² cable: Ipf at sub-board = 5kA</li>
              <li>Sub-board MCB: 32A Type C (Im at 320A)</li>
              <li>Final circuit fault at end: 400A</li>
              <li>MCB operates magnetically at 400A (instant)</li>
              <li>MCCB sees 400A — below 800A threshold</li>
              <li>MCCB stays closed — discrimination achieved</li>
            </ul>
            <p>
              <strong>Energy let-through (I²t):</strong> I²t represents the energy passing through
              a device during fault clearance. For discrimination, the downstream device must
              clear with lower I²t than the upstream device's let-through threshold.
            </p>
            <p>
              <strong>Typical I²t values (device / I²t A²s / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>32A MCB Type B — 15,000 — let-through at 6kA fault</li>
              <li>63A BS 88 fuse — 35,000 — prearcing at 6kA fault</li>
              <li>100A MCCB — 80,000 — withstand capability</li>
            </ul>
            <p>
              <strong>Remember:</strong> For cable protection, the device I²t let-through must not
              exceed the cable's thermal withstand: I²t ≤ k²S².
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Cascade Protection and Selectivity Tables">
            <p>
              Cascade (back-up) protection allows a downstream device with lower breaking capacity
              to be used where the prospective fault current exceeds its rating, provided an
              upstream device with adequate capacity assists in fault clearance.
            </p>
            <p>
              <strong>Cascade protection requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Upstream device must have adequate breaking capacity for maximum Ipf</li>
              <li>Combined let-through I²t must not exceed downstream cable k²S²</li>
              <li>Manufacturer must confirm the cascade combination is valid</li>
              <li>Both devices may operate — coordination, not discrimination</li>
              <li>Devices should be from same manufacturer for validated combinations</li>
            </ul>
            <p>
              <strong>Reading selectivity tables (table entry / meaning):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>T</strong> — total discrimination at all fault levels
              </li>
              <li>
                <strong>15</strong> — discrimination up to 15kA
              </li>
              <li>
                <strong>—</strong> — no discrimination / not tested
              </li>
              <li>
                <strong>P</strong> — partial discrimination (see notes)
              </li>
            </ul>
            <p>
              <strong>Example selectivity table — simplified (upstream / 16A Type B / 32A Type B / 32A Type C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>100A HRC — T — T — T</li>
              <li>63A HRC — T — 15kA — 10kA</li>
              <li>40A MCB — 3kA — — — —</li>
            </ul>
            <p>Example only — always use actual manufacturer data.</p>
            <p>
              <strong>Best practice device combinations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HRC fuse → MCB:</strong> excellent discrimination, 2:1 ratio typically
                sufficient
              </li>
              <li>
                <strong>MCCB (STD) → MCB:</strong> good discrimination with time delay setting
              </li>
              <li>
                <strong>ACB → MCCB → MCB:</strong> multi-tier with progressive time settings
              </li>
              <li>
                <strong>MCB → MCB:</strong> poor discrimination in magnetic region, avoid
              </li>
            </ul>
            <p>
              <strong>Design note:</strong> Always verify discrimination using manufacturer's
              specific tables for the actual devices specified. Generic guidance may not apply to
              all combinations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — discrimination check:</strong> A 100A BS 88 fuse protects a
              sub-board with 32A Type B MCBs. Ipf at sub-board is 8kA. Verify discrimination.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From manufacturer selectivity table:</li>
              <li>
                100A HRC vs 32A Type B = <strong>"T" (Total)</strong>
              </li>
              <li>This means full discrimination at all fault levels</li>
              <li>Verify Ipf (8kA) is within device ratings:</li>
              <li>100A HRC: 80kA breaking — pass</li>
              <li>32A MCB: 6kA (with cascade from fuse) — pass</li>
              <li>Full discrimination achieved</li>
            </ul>
            <p>
              <strong>Example 2 — time discrimination setting:</strong> Set time discrimination
              between main MCCB (400A) and sub-board MCCB (100A). Sub-board MCBs operate
              instantaneously.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Final circuit MCBs: instantaneous (~10ms)</li>
              <li>Sub-board 100A MCCB settings: STD = 100ms (allows MCBs to clear first); Im = 10 × Ir</li>
              <li>Main 400A MCCB settings: STD = 250ms (allows sub-board to clear); Im = 8 × Ir</li>
              <li>Time margin: 250 - 100 = 150ms</li>
              <li>Adequate margin for tolerance</li>
            </ul>
            <p>
              <strong>Example 3 — cascade back-up verification:</strong> A 6kA MCB is used where
              Ipf = 10kA. Verify cascade protection with 80A HRC fuse upstream. Cable is 4mm²
              PVC/copper.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Check cascade table: 80A HRC + 32A MCB at 10kA</li>
              <li>
                Combined I²t let-through = <strong>25,000 A²s</strong>
              </li>
              <li>Cable thermal withstand:</li>
              <li>
                k²S² = 115² × 4² = 13,225 × 16 = <strong>211,600 A²s</strong>
              </li>
              <li>25,000 &lt; 211,600 — pass</li>
              <li>Cascade protection valid; cable protected from thermal damage</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Discrimination design steps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> calculate Ipf at all distribution levels
              </li>
              <li>
                <strong>Step 2:</strong> select device types (fuse, MCB, MCCB)
              </li>
              <li>
                <strong>Step 3:</strong> check manufacturer selectivity tables
              </li>
              <li>
                <strong>Step 4:</strong> verify discrimination limit exceeds Ipf
              </li>
              <li>
                <strong>Step 5:</strong> confirm cable thermal withstand if using cascade
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                HRC fuse ratio: <strong>2:1</strong> for discrimination
              </li>
              <li>
                Time margin: <strong>≥50ms</strong> between levels
              </li>
              <li>
                MCB-MCB: <strong>no reliable discrimination</strong> (magnetic region)
              </li>
              <li>
                MCCB STD typical: <strong>100-500ms</strong>
              </li>
              <li>
                Cable thermal: <strong>I²t ≤ k²S²</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Assuming MCBs discriminate</strong> — they don't in magnetic region
                </li>
                <li>
                  <strong>Ignoring fault level changes</strong> — check at each board location
                </li>
                <li>
                  <strong>Using generic tables</strong> — use specific manufacturer data
                </li>
                <li>
                  <strong>Forgetting Icw</strong> — MCCB must withstand fault during STD
                </li>
              </ul>
            }
            doInstead="Use HRC fuse / MCCB STD upstream of MCBs rather than relying on MCB-MCB selectivity, recompute Ipf at each board level, look up the actual device combination in the manufacturer's selectivity table, and confirm the upstream MCCB's Icw rating covers the chosen short-time delay."
          />

          <SectionRule />

          <Scenario
            title="Hospital — discrimination in a ward DB to prevent cascade tripping"
            situation={
              <>
                A 200&nbsp;A 400&nbsp;V three-phase sub-main feeds a ward DB carrying critical
                medical equipment. The DB has 20 × MCBs (mostly C16 and C20). The current design
                has a 200&nbsp;A Type B MCCB upstream. A short on a single C16 has tripped both
                the C16 and the upstream MCCB — taking out the entire ward including
                life-support equipment.
              </>
            }
            whatToDo={
              <>
                Apply Reg 536.4.202: coordination must restrict disconnection to the smallest
                possible part of the installation. Replace the upstream MCCB with one that has
                an adjustable instantaneous trip set above the maximum let-through of the
                downstream C16 / C20 (typically 10–12 × I_n_downstream = ≈ 200&nbsp;A on the
                C20). Or specify an HRC fuse upstream (BS 88) — HRC discriminates more reliably
                with downstream MCBs because of its sharply current-limiting let-through. Verify
                with the manufacturer&rsquo;s selectivity table for the actual device pairing.
                Document the discrimination analysis in the design submission.
              </>
            }
            whyItMatters={
              <>
                In a hospital, loss of supply to critical care is a life-safety event. Reg
                536.4.202 explicitly requires coordination so that disconnection is restricted
                to the smallest possible part. A discrimination analysis is design evidence, not
                a nice-to-have, and forms part of the Part 6 verification.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Discrimination (selectivity) restricts disconnection to the smallest possible part of the installation — Reg 536.4.202 (redrafted A4:2026).',
              'Three methods: time (delayed upstream trip), current (different rated currents), energy (current-limiting upstream like HRC fuse).',
              'Rule-of-thumb ratios: 2:1 for fuse-fuse, 3:1 for fuse-MCB. For MCB-MCB and MCCB-MCB, use manufacturer selectivity tables.',
              'HRC fuses (BS 88) discriminate most reliably with downstream MCBs — sharply current-limiting let-through reduces I²t to the upstream.',
              'Cascade (back-up) protection is the deliberate trade-off: lower-capacity downstream backed up by higher-capacity upstream — accept loss of discrimination at high fault levels.',
              'Discrimination analysis is design evidence — overlay time-current curves, compare I²t, or use manufacturer selectivity tables.',
              'Critical installations (hospitals, data centres, continuous processes) need full discrimination at the maximum prospective fault current.',
              'Reg 536.5 requires documentation of device-coordination selection in the design documentation per Reg 132.13.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fault current calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Earth fault protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section3_4;
