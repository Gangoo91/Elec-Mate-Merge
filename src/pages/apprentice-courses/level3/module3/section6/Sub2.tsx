/**
 * Module 3 · Section 6 · Subsection 2 — Protective devices: fuses, MCBs, RCDs, RCBOs, AFDDs
 * Maps to C&G 2365-03 / Unit 302 / LO4 / AC 4.1
 *   AC 4.1 — "specify the main types and operating principles of electrical components"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 9.1, 9.2
 *
 * BS 1361 / BS 88 / BS 3036 / BS 1362 fuses; BS EN 60898 MCBs; BS EN 61008 RCDs; BS EN 61009
 * RCBOs; BS EN 62606 AFDDs. BS 7671:2018+A4:2026 §411.3.3 RCD coverage and §421.1.7 AFDD
 * recommendation (mandatory in HRRBs via Building Safety Act 2022).
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

const TITLE = 'Protective devices — fuses, MCBs, RCDs, RCBOs | Level 3 Module 3.6.2 (AC 4.1) | Elec-Mate';
const DESCRIPTION =
  'BS 88, BS EN 60898 (MCB), BS EN 61008/61009 (RCD/RCBO), BS EN 62606 (AFDD). What each protects, how they trip, where to fit them under BS 7671:2018+A4:2026.';

const checks = [
  {
    id: 'l3-m3-6-2-mcb',
    question: 'A Type B MCB instantaneous trip range:',
    options: ['1.13-1.45× rated', '3-5× rated', '5-10× rated', '10-20× rated'],
    correctIndex: 1,
    explanation:
      'BS EN 60898: Type B trips magnetically at 3-5× rated current. Type C: 5-10×. Type D: 10-20×. Type B for resistive loads (lights), C for motors and small inrush.',
  },
  {
    id: 'l3-m3-6-2-rcd',
    question: 'A 30 mA RCD must operate within:',
    options: ['10 ms', '40 ms', '300 ms at 30 mA, 40 ms at 5×', 'Up to 5 s'],
    correctIndex: 2,
    explanation:
      'BS EN 61008-1 trip times: at I_Δn (30 mA) → ≤300 ms; at 5× I_Δn (150 mA) → ≤40 ms. Faster at higher currents.',
  },
  {
    id: 'l3-m3-6-2-rcbo',
    question: 'An RCBO is:',
    options: [
      'RCD only',
      'MCB only',
      'Combined RCD + MCB in one device on a single circuit',
      'Master switch',
    ],
    correctIndex: 2,
    explanation:
      "RCBO = Residual Current Breaker with Overcurrent. Both protections in one — replaces a circuit's MCB while adding RCD function. Per-circuit RCD protection without grouping.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A BS 1361 cartridge fuse is used in:',
    options: [
      'Modern consumer units',
      'Domestic supply cut-out (service fuse) and old-style fused boards',
      'EV chargers only',
      'Lightning protection',
    ],
    correctAnswer: 1,
    explanation:
      'BS 1361 (now superseded by BS 88-3) HRC fuses in DNO cut-outs and old fused boards. Standard ratings 60, 80, 100 A.',
  },
  {
    id: 2,
    question: 'BS 88 fuses are characterised as:',
    options: [
      'Re-wireable',
      'High-rupturing-capacity (HRC) cartridge fuses for industrial use',
      'Glass cartridge for vehicles',
      'Domestic only',
    ],
    correctAnswer: 1,
    explanation:
      'BS 88 = HRC industrial fuses, ratings 2-1250 A, breaking capacity up to 80 kA. Used in commercial/industrial DBs and for motor protection.',
  },
  {
    id: 3,
    question: 'Type C MCB instantaneous trip:',
    options: ['3-5× rated', '5-10× rated', '10-20× rated', '20× rated'],
    correctAnswer: 1,
    explanation:
      'Type C: 5-10× rated current. Standard for motor circuits and inrush loads (LED transformers, switching PSUs).',
  },
  {
    id: 4,
    question: 'RCD types: which detects DC residual current?',
    options: ['Type AC', 'Type A', 'Type B', 'Type F'],
    correctAnswer: 2,
    explanation:
      'Type AC: AC sinusoidal residual only. Type A: AC + pulsing DC. Type B: full DC + AC + high-frequency. Required for VFDs, EV chargers, modern PV inverters.',
  },
  {
    id: 5,
    question: 'Disconnection time for a 32 A circuit on TN system per BS 7671 §411.3.2:',
    options: ['0.1 s', '0.4 s', '5 s', 'No limit'],
    correctAnswer: 1,
    explanation:
      'For final circuits ≤32 A on TN systems: 0.4 s. For circuits >32 A and distribution circuits: 5 s.',
  },
  {
    id: 6,
    question: 'Re-wireable fuses (BS 3036) compared with cartridge fuses (BS 88):',
    options: [
      'Same performance',
      'Lower breaking capacity, slower operation, less precise',
      'Faster operation',
      'Higher breaking capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Re-wireable = wire melts when overloaded. Imprecise rating, can be re-wired with wrong gauge wire by user. BS 3036 use largely deprecated; cartridge or MCB is the standard now.',
  },
  {
    id: 7,
    question: 'BS 7671 A4:2026 §411.3.3 RCD coverage:',
    options: [
      'Optional',
      'Mandatory for socket-outlets ≤32 A, with limited risk-assessed exceptions outside dwellings',
      'Only for outdoor circuits',
      'Only for sockets in dwellings',
    ],
    correctAnswer: 1,
    explanation:
      '§411.3.3 was revised at A4:2026 — applies to socket-outlets with rated current ≤32 A. Exception only for non-dwelling premises where a documented risk assessment determines RCD protection is not necessary.',
  },
  {
    id: 8,
    question: 'AFDD requirement under BS 7671 A4:2026 §421.1.7:',
    options: [
      'Mandatory in all final circuits',
      'Recommended (the regulation uses "recommending" wording); mandatory in HRRBs via Building Safety Act 2022',
      'Mandatory in HMOs only',
      'Not mentioned',
    ],
    correctAnswer: 1,
    explanation:
      '§421.1.7 was introduced at A2:2022 and carried forward at A4:2026 — wording is "recommending" the installation of AFDDs. Mandatory status comes from the Building Safety Act 2022 framework for High-Risk Residential Buildings (HRRBs), not from BS 7671 itself.',
  },
];

const faqs = [
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

export default function Sub2() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 2"
            title="Protective devices — fuses, MCBs, RCDs, RCBOs"
            description="Fuses (BS 88, BS 1361, BS 3036), MCBs (BS EN 60898), RCDs (BS EN 61008), RCBOs (BS EN 61009), AFDDs (BS EN 62606) under BS 7671:2018+A4:2026."
            tone="yellow"
          />

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
                <strong>BS 1361 (now BS 88-3)</strong> HRC cartridge — domestic supply cut-out
                (60-100 A typical).
              </li>
              <li>
                <strong>BS 88-2/3</strong> HRC industrial — 2 A to 1250 A, breaking capacity
                33-80 kA.
              </li>
              <li>
                <strong>BS 3036</strong> re-wireable (semi-enclosed) — older domestic boards.
                Lower breaking capacity, less precise. Largely replaced.
              </li>
              <li>
                <strong>BS 1362</strong> plug-top fuse — 3, 5, 13 A in BS 1363 plugs.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Fuse characteristics — gG, gM, aM and the time-current curve"
            plainEnglish="Industrial HRC fuses (BS 88-2 / IEC 60269) carry letter codes that tell you what they're designed to protect. 'g' means general purpose (full protection from minor overload to short circuit). 'a' means short-circuit only (back-up — needs another device for overload). The second letter tells you the load type: G general, M motor, R semiconductor, etc."
          >
            <p>
              <strong>gG fuses</strong> are the all-purpose industrial cable protector — used in
              distribution boards, sub-mains, lighting and small power circuits. The time-current
              characteristic is gentle: a 100 A gG fuse takes about an hour to blow at 130 A,
              four seconds at 500 A, and 10 ms at 5000 A.
            </p>
            <p>
              <strong>gM fuses</strong> have two ratings printed on them (e.g. "32 M 50") — the
              first is the rated continuous current (32 A, sets thermal protection of the
              wiring), the second is the design current of the device they protect (50 A, sets
              behaviour under overload). Used for motor circuits where the cable is sized for
              FLA but the motor itself draws much higher inrush.
            </p>
            <p>
              <strong>aM fuses</strong> protect motors against short-circuit only — they will NOT
              trip on a sustained overload. They must be paired with a thermal overload relay
              (Sub 6.1) for full protection. Fast clearance on a fault, gentle on motor inrush.
              Rare in modern UK installs (MCBs and contactors with electronic overloads
              dominate) but still found in heritage industrial sites.
            </p>
            <p>
              <strong>aR fuses</strong> are extremely fast (sub-cycle) for protecting power
              semiconductors — VFD and rectifier input fuses. Will blow in microseconds on a
              thyristor or IGBT failure to limit cascade damage.
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
                <strong>Type B</strong> instantaneous 3-5× I_n. Resistive loads (lighting,
                sockets without inrush).
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
              <strong>Breaking capacity Icn:</strong> 6 kA standard domestic; 10 kA / 25 kA /
              higher for industrial.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Inside an MCB — bimetallic strip, magnetic plunger, arc chute and spring latch"
            plainEnglish="Cut an MCB in half (you'll never need to, but it's instructive) and you find: a series-connected bimetallic strip that bends with sustained current and trips a mechanical latch (the thermal element); a solenoid coil with a spring-loaded iron plunger that fires the same latch on a high fault current (the magnetic element); a stretched-spring contact mechanism that flings the contacts apart violently when the latch releases; and an arc chute identical in concept to a contactor's that splits and extinguishes the resulting arc."
          >
            <p>
              <strong>Thermal element</strong> handles sustained overload — say, 1.45× rated
              current for a few minutes. The bimetallic strip warms, bends, and eventually trips
              the latch. The trip time depends on the I²t energy delivered. This is the
              protection that stops a 32 A circuit from running at 50 A indefinitely and slowly
              cooking the cable insulation.
            </p>
            <p>
              <strong>Magnetic element</strong> handles instantaneous fault — a short-circuit
              between line and neutral or line and earth. Current jumps to many times rated
              almost instantly; the solenoid plunger pulls in within milliseconds, fires the
              same latch, and the contacts open before the I²t energy can damage the cable or
              downstream equipment. The 3–5× / 5–10× / 10–20× thresholds you memorise as Type
              B/C/D are the magnetic plunger trip points.
            </p>
            <p>
              <strong>Breaking capacity</strong> is the maximum prospective short-circuit current
              the MCB can safely interrupt without exploding or welding shut. A domestic 6 kA MCB
              is fine in a typical TT or TN-C-S house where prospective fault current at the CU
              is usually 1–4 kA. Commercial sites with bigger transformers and shorter feeders
              can see 10–25 kA — needs 10 kA or 25 kA MCBs, or back-up fusing upstream.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

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
              <strong>Types:</strong> AC (basic AC sinusoidal only), A (AC + pulsed DC, modern
              default for most loads), B (full DC + AC + HF — for VFDs, EV chargers, modern PV).
            </p>
            <p>
              RCBO combines MCB + RCD on one device, occupying one DIN slot per circuit (plus
              one neutral). Standard for new installs to give per-circuit RCD.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Inside an RCD — the toroidal core, sensing coil and trip mechanism"
            plainEnglish="Every RCD is built around a small toroidal (ring-shaped) ferromagnetic core. All the live conductors of the protected circuit (line and neutral on a single-phase RCD; L1, L2, L3 and N on a four-pole) pass straight through the centre of the ring. A sensing coil wound on the toroid delivers a voltage to the trip electronics whenever the magnetic flux in the toroid is non-zero."
          >
            <p>
              In normal operation, the line current going OUT through the toroid exactly equals
              the neutral current coming BACK through it. The two equal-and-opposite ampere-turns
              produce zero net flux in the core. The sensing coil sees nothing. RCD stays closed.
            </p>
            <p>
              If a fault leaks some current to earth (e.g. via a person touching a live
              conductor, or insulation breakdown to a metallic case bonded to earth), the line
              current is now greater than the returning neutral current — the difference is the
              residual current. Net ampere-turns in the toroid become non-zero, flux appears in
              the core, sensing coil generates an output voltage, trip electronics fires the
              spring-loaded contact mechanism within ~10–40 ms, contacts open, fault disconnected.
            </p>
            <p>
              <strong>The 'no overcurrent protection' part.</strong> A pure RCD has no thermal or
              magnetic overcurrent element. It will pass 1000 A short-circuit current straight
              through itself for as long as the fault lasts, without tripping, until the
              upstream MCB or fuse interrupts the circuit. Always pair an RCD with appropriate
              overcurrent protection — that's why an RCBO (which combines both into one device)
              is the modern preferred unit.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Discrimination, selectivity and the case for RCBOs"
            plainEnglish="Discrimination (also called 'selectivity') means: when a fault occurs, only the single device closest to the fault should trip. Upstream devices should stay closed so the rest of the installation keeps running. A correctly discriminated installation isolates the smallest possible portion of the circuit on any fault."
          >
            <p>
              <strong>Overcurrent discrimination</strong> is achieved by current ratio. A 6 A
              MCB downstream of a 100 A main switch will always trip first on a fault, because
              the 6 A device's magnetic threshold (e.g. 30 A on Type B) is far below the 100 A
              main switch's lowest trip threshold. Easy.
            </p>
            <p>
              <strong>RCD discrimination</strong> is harder. Two RCDs of equal sensitivity in
              series can both trip simultaneously on a fault — neither one is faster. The fix is
              either (a) higher sensitivity downstream and lower sensitivity upstream (e.g. 30
              mA at the final circuit, 100 mA on the sub-main, 300 mA on the incoming) PLUS time
              delay on the upstream device (Type S — 'selective', delays trip by 130–500 ms to
              give downstream device time to clear); or (b) per-circuit RCBOs so there's only
              one RCD between the load and the supply — no series RCD problem at all.
            </p>
            <p>
              This is the single biggest practical reason RCBOs have replaced 'split-load'
              RCD-grouped consumer units in new installs. With RCBOs, a fault on the kitchen
              ring trips only the kitchen ring; lights, sockets, EV charger and shower stay on.
              With grouped RCDs, the same fault dropped half the house out — and could leave
              occupants in darkness on a winter evening.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (RCD on socket-outlets)"
            clause="Regulation 411.3.3 has been revised and now applies to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary."
            meaning={
              <>
                Effectively all socket-outlets ≤32 A now require 30 mA RCD additional protection.
                Exception is only available outside dwellings, requires a documented risk
                assessment, and the assessment must show RCD protection is not needed for safety.
                In dwellings (homes, flats, HMOs) there is no exception — every socket on a
                final circuit gets RCD protection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
            meaning={
              <>
                The wording is "recommending" — BS 7671 itself does not mandate AFDDs in any
                specific occupancy. The mandatory status comes externally: the Building Safety
                Act 2022 framework for High-Risk Residential Buildings (HRRBs, broadly buildings
                ≥18 m / 7 storeys with sleeping accommodation) sets AFDDs as a requirement for
                final circuits feeding sockets. Industry best practice is to fit AFDDs in any
                sleeping accommodation, HMOs, residential care and other higher-risk premises
                regardless of HRRB status.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 421.1.7; Building Safety Act 2022."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.4 (RCD on luminaire circuits)"
            clause="Regulation 411.3.4 requires that, within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning={
              <>
                In any domestic premises, every lighting circuit must now have 30 mA RCD
                protection. This is a hard requirement — there's no risk-assessment exception
                in dwellings. Practically, every consumer unit in a new domestic install needs
                RCBOs (per-circuit) or RCD-grouped MCBs covering the lighting circuits.
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
                generate DC components. Type AC RCD's sensing core saturates, blinding it. Real
                AC fault doesn't trip — and worst case, the user gets a shock from a live
                conductor in the charging cable.
              </>
            }
            doInstead={
              <>
                EV chargers MUST be protected by Type B RCD (or have integrated DC fault
                current monitoring per IEC 62752). Same applies to PV inverters and any VFD-fed
                load. Read the equipment data sheet for the required RCD type and §531.3.3 for
                the BS 7671 framing.
              </>
            }
          />

          <CommonMistake
            title="Saying 'AFDDs are now mandatory' on every quotation"
            whatHappens={
              <>
                Apprentice tells customer AFDDs are recommended (Reg 421.1.7) in their detached house. Customer
                pays the AFDD premium. Competitor electrician quotes without AFDDs. Customer
                feels misled and leaves a bad review.
              </>
            }
            doInstead={
              <>
                Be precise: §421.1.7 wording is "recommending". AFDDs are recommended (Reg 421.1.7) in HRRBs
                under the Building Safety Act 2022 (typically buildings ≥18 m / 7 storeys with
                sleeping accommodation). For an ordinary detached house they're a recommendation
                — strongly advised in sleeping accommodation, but not legally required. Quote
                them as an option, explain the fire-risk benefit, let the customer decide.
              </>
            }
          />

          <ConceptBlock
            title="AFDDs — what an arc fault detector actually detects"
            plainEnglish="An arc fault is a sustained electrical arc that doesn't draw enough current to trip an MCB and doesn't leak enough to earth to trip an RCD — but releases enough heat to ignite combustibles. Damaged twin-and-earth pinched under a floorboard, a loose terminal in a back box, a chafed flex behind a TV unit. House fires of unknown electrical origin are mostly these. AFDDs detect the unique high-frequency current signature an arc creates and trip the circuit before ignition."
          >
            <p>
              <strong>How they work:</strong> the AFDD continuously samples the load current at
              high speed (typically &gt; 100 kHz) and feeds it through a digital signal processor
              that looks for the broadband noise and characteristic spectral fingerprint of
              arcing. To avoid nuisance tripping it must distinguish a real fault arc from
              harmless arcing in motors, switches, dimmers, brushed appliances and welders.
              False positive avoidance is the hard engineering — first-generation AFDDs from
              the early 2010s tripped constantly; modern (2020+) units are reliable.
            </p>
            <p>
              <strong>Two arc types covered:</strong> series arcs (loose terminal — current is
              normal, voltage is wrong) and parallel arcs (cable damage L-N or L-PE — current is
              elevated but below MCB threshold). Modern AFDDs detect both. Some early-generation
              units only covered parallel arcs; verify product datasheet against BS EN 62606.
            </p>
            <p>
              <strong>Where to fit them:</strong> mandatory in HRRBs via the Building Safety Act
              2022; strongly recommended in HMOs, residential care, school dormitories, places
              where escape may be impeded; recommended (not mandatory under BS 7671) elsewhere.
              Most reputable CU manufacturers now offer a combined AFDD + RCBO + MCB device that
              occupies a single DIN slot — the practical default for new builds in any sleeping
              accommodation.
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
                RCBO 32 A Type A 30 mA per circuit — gives per-circuit protection without taking
                the whole RCD half of the CU offline on a fault. Type A is the default for
                modern loads (mixed AC + pulsed DC).
                <br />
                If the dwelling falls under HRRB scope (or customer wants best-practice fire
                safety): combined AFDD+RCBO single device per §421.1.7 recommendation and
                Building Safety Act 2022 mandate.
                <br />
                For a standard owner-occupied house: AFDD recommended but not mandatory.
                Recommend it on the spec; let the customer decide.
                <br />
                Lighting circuit: must have 30 mA RCD per §411.3.4 (no exception in dwellings).
              </>
            }
            whyItMatters={
              <>
                A4:2026 has tightened RCD coverage substantially — sockets ≤32 A and lighting
                circuits in dwellings both mandatory. AFDD wording is "recommending" but HRRB
                framework makes it a hard requirement in scope. Get the regulatory framing right
                in your quote and the customer trusts your advice.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

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

          <Quiz title="Protective devices knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.1 Contactors and relays
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Electronic components
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
