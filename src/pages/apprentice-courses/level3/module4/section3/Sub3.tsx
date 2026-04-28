/**
 * Module 4 · Section 3 · Subsection 3 — Likely fault locations in wiring systems
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.2
 *   AC 3.2 — "describe typical types of faults and their likely locations in wiring systems and equipment"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.5 — fault locations in wiring
 * systems, terminations and connections, equipment / accessories (switches,
 * luminaries, switchgear and control equipment), instrumentation / metering.
 *
 * Frame: WHERE faults appear, by location category — tied to BS 7671 526.1
 * (terminations) and brand-specific failure modes (Hager / Schneider / Wylex
 * / MK / Crabtree / BG). Apprentice-level pattern recognition for 'where to
 * look first'.
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
  'Likely fault locations (3.3) | Level 3 Module 4.3.3 | Elec-Mate';
const DESCRIPTION =
  'Where faults appear, by category — terminations (BS 7671 526.1), wiring systems, accessories, switchgear, instrumentation. Brand-specific failure modes for Hager / Schneider / Wylex / MK / Crabtree / BG.';

const checks = [
  {
    id: 'mod4-s3-sub3-terms',
    question:
      "BS 7671 526.1 covers terminations. Where do most termination faults appear in domestic installations and why?",
    options: [
      "At the supply.",
      "Three locations dominate: (1) Consumer unit busbar terminations — under-torqued by the original installer, oxidised over time, exposed under high inrush loads. Hager / Schneider / Wylex CUs typically. (2) Socket terminals — back-of-socket screw terminals on ring final loop-in, particularly on cheap accessories where the screw stops short of fully clamping the conductor. MK / Crabtree / BG. (3) Junction boxes — particularly Wago push-fit on solid copper conductors (intermittent contact issue) and old porcelain/screw boxes (loose over time). The common factor: terminations are where two conductors meet, mechanical contact is the only thing maintaining electrical contact, and any disturbance loosens the contact.",
      "At the loads.",
      "At the cables.",
    ],
    correctIndex: 1,
    explanation:
      "Terminations are the weakest link in any installation. BS 7671 526.1 ('durable electrical continuity AND adequate mechanical strength AND protection') captures all three failure modes — electrical continuity loss, mechanical loosening, and physical exposure. The vast majority of in-service faults trace back to a termination somewhere on the affected circuit.",
  },
  {
    id: 'mod4-s3-sub3-luminaire',
    question:
      "Where do faults typically appear in luminaires and what's the L3-relevant pattern?",
    options: [
      "Bulbs only.",
      "Three categories. (1) Lampholder terminals — for incandescent / halogen, the spring contacts oxidise / fatigue; for compact GU10 fittings, the spring clip arcs under poor contact. (2) Driver / control gear failure — LED drivers, fluorescent ballasts have finite life (5–10 years typically), fail open or short, often take the lamp with them. (3) Internal wiring degradation — flex inside fittings degrades from heat over years, especially in enclosed pendant fittings. Brand patterns: cheap GU10 downlighters (£5 unbranded) fail at 2–3 years; LED downlighters from established brands (Aurora, Ansell, JCC) typically last 10+ years; fluorescent fittings from Thorlux / Crompton last 20+ years before driver replacement.",
      "Just the wiring.",
      "Random.",
    ],
    correctIndex: 1,
    explanation:
      "Luminaires fail at predictable points — lampholder, driver, internal wiring. Brand quality directly affects failure rate; cheap fittings fail early, mid-tier and premium fittings last decades. The L3 fault investigator learns to distinguish 'fitting at end of life' from 'wiring fault upstream of fitting' — the diagnostic is whether the same model fitting works elsewhere on the same circuit.",
  },
  {
    id: 'mod4-s3-sub3-rcbo',
    question:
      "Where do faults appear in switchgear (MCBs, RCBOs, RCDs) and how do you tell?",
    options: [
      "Switchgear never fails.",
      "Three failure modes. (1) Mechanical wear — toggle, contacts, internal mechanism after thousands of operations; symptom is sluggish operation, doesn't latch on, doesn't trip when tested. (2) Electrical wear — contacts pitted from arc erosion after multiple fault clearances; symptom is high contact resistance under load (HRJ at the breaker itself). (3) RCD-specific — toroidal coil saturation from years of unbalanced load, electronic detection circuit drift; symptom is slow trip-time on the BS 7671 643.7 test. Tested with the MFT trip-time function. Brand patterns: Hager 6 kA RCBOs — typical 15-20 year life. Wylex NHX / MK Sentry — similar. Premium switchgear (Schneider Acti9, Eaton Memshield) — 25+ years.",
      "Just visual.",
      "Just trip.",
    ],
    correctIndex: 1,
    explanation:
      "Switchgear has finite life and fails in predictable ways. The MFT trip-time test (Sub 2.4) reveals slow-tripping RCDs that are approaching failure; visual inspection reveals pitted contacts and signs of overheating. BS 7671 651 (periodic inspection) captures the periodic check cycle that catches switchgear before it fails in service.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the diagnostic value of knowing the brand of a CU when investigating a fault?",
    options: [
      "Brand doesn't matter.",
      "Each brand has known failure modes that point you to likely fault locations. Hager 6 kA RCBOs (popular UK domestic) — known for thermal element drift after 15+ years, busbar terminations need annual re-torque. Wylex NHX — known for plastic enclosure stress fractures around the busbar after thermal cycling. Schneider Acti9 — generally robust, known for incoming terminal block failures on the larger 100 A units. MK Sentry — known for poor manufacturer warranty support but generally reliable hardware. Crabtree Starbreaker — older series, RCBO trip-time slows significantly past 12 years. The brand tells you where to look first.",
      "All same.",
      "Cosmetic only.",
    ],
    correctAnswer: 1,
    explanation:
      "Brand-specific knowledge is what separates an experienced fault diagnostician from a beginner. Trade publications (Professional Electrician, Electrical Times), manufacturer technical bulletins, and industry forums (ElectriciansForums.co.uk, IET Engineering Communities) document these patterns. The L3 apprentice builds the knowledge base over time; the senior carries it as standard.",
  },
  {
    id: 2,
    question: "Where do faults appear most often on a domestic ring final circuit?",
    options: [
      "At the breaker.",
      "In approximate frequency order: (1) Socket terminals — back-of-socket screw terminals on the loop-in conductors; loosen over time; expose under load. (2) The ring break — at any point a previous installer cut the ring and rejoined into a JB, that joint is the weak point; particularly common when a kitchen extension was added and the ring was extended. (3) Spurs — single-socket spurs from the ring; the join into the ring is in a JB or behind the spur socket and is often wired with insufficient cable length. (4) The ring continuity itself — undersized or damaged cable through walls, particularly where chased cables have been re-plastered over and the chase has been dampened, accelerating insulation degradation.",
      "Random.",
      "All at the breaker.",
    ],
    correctAnswer: 1,
    explanation:
      "Ring final fault locations are predictable because the ring topology has known weak points — every loop-in termination, every junction, every cable transition. The diagnostic approach (Sub 2.4 ring continuity test) localises the fault to a branch; visual / thermal inspection of that branch finds the specific point.",
  },
  {
    id: 3,
    question: "Where do faults typically appear in metal-clad SWA installations on commercial sites?",
    options: [
      "At the cable.",
      "Three locations. (1) SWA gland terminations — the brass gland's earth path through the armour to the gland body is critical and often poorly made (insufficient compression on the armour, missing earth tag, paint between gland and box). Causes intermittent earth faults. (2) Compound seal at gland — over years the seal hardens / shrinks, water ingress to the cable cores. (3) The cable run itself only when physically damaged (forklift impact, settlement, vermin). Brand patterns: CMP industrial glands and Pratley sealing compound are the trade standard; cheap gland kits (Vinco, generic OEM) often fail at the earth-tag connection.",
      "Always at glands.",
      "Always at cores.",
    ],
    correctAnswer: 1,
    explanation:
      "SWA fault locations cluster at the glands because the gland is the only point where the armour (the CPC) makes mechanical contact with earth. Bad gland = bad CPC = no earth fault clearance. Sub 5.3 covers the gland-rectification techniques; the diagnostic at this stage is recognising the gland as the most likely fault location.",
  },
  {
    id: 4,
    question: "Where do faults appear in instrumentation and metering circuits?",
    options: [
      "Never.",
      "Three categories. (1) Smart meter / utility meter failures — internal electronic failure (the meter itself stops measuring); diagnosis: voltage on the consumer side normal, customer reports billing issues; DNO call to replace meter. (2) Sub-metering installations (kWh meters at apartment level) — internal CT failure, terminal corrosion, comms link failure to BMS. (3) Specific instrument circuits in commercial buildings — temperature sensors, level sensors, flow meters; usually low-voltage SELV but with sensitive signal levels easily disrupted by EMI from nearby high-current cables. Diagnostic approach: substitute the suspect sensor with a known-good unit; if symptom moves, the sensor was at fault.",
      "Always cable.",
      "Always meter.",
    ],
    correctAnswer: 1,
    explanation:
      "Instrumentation and metering have their own fault patterns. Smart meters fail internally (DNO replacement); sub-meters fail at terminations (electrician fix); building instrumentation fails at the sensor or in EMI-coupled signal wiring (substitution diagnosis). The L3 apprentice meets these on commercial sites and needs the basic categorisation.",
  },
  {
    id: 5,
    question: "Why are control panels (motor starters, BMS controllers, fire alarm panels) common fault locations and how should they be approached?",
    options: [
      "They never fail.",
      "Three reasons. (1) Density — many terminations in a small space; many opportunities for one to be wrong. (2) Heat — control electronics generate heat; cooling is often inadequate; thermal cycling stresses components. (3) Vibration — panels in plant rooms and on walls near equipment vibrate; vibration loosens terminations over time. Approach: always work on de-energised, isolated panels under permit-to-work where applicable; identify each component's function from the panel schedule; check terminations with thermal imaging while running; replace components by part number from the schedule; retest each output to verify correct operation.",
      "Just visual.",
      "Random failure.",
    ],
    correctAnswer: 1,
    explanation:
      "Control panels are concentrated fault zones because density + heat + vibration combine. The L3 apprentice doesn't normally LEAD control-panel fault investigation but does support a senior who's working on one. The supporting role includes documentation, isolation, retest, restoration.",
  },
  {
    id: 6,
    question: "Where do faults appear in EV charger installations (Zappi, Ohme, Pod Point, Tesla Wall Connector)?",
    options: [
      "Never.",
      "Five locations in approximate frequency order. (1) The CP (control pilot) signal between charger and EV — corroded connector, moisture in J1772 / Type 2 socket; intermittent charge fail. (2) The 6 mA DC RCM (residual current monitoring) within the charger — often the cause of 'charger won't start' symptoms; sometimes a real fault, sometimes a glitch. (3) The supply tail to the charger — if installed alongside an existing CU, the tail termination can loosen under high load (32 A continuous for 5+ hours per charge cycle). (4) The earth electrode for TT-converted installations — Reg 722.411 sometimes requires a dedicated electrode; degradation causes earth-fault timing issues. (5) The charger's internal contactor — wears after 5+ years of daily switching at 32 A.",
      "Always cable.",
      "Always plug.",
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers are increasingly common in domestic installations and bring their own fault patterns. The L3 apprentice will increasingly meet them; understanding the characteristic fault locations speeds diagnosis. Manufacturer technical bulletins (Zappi, Ohme) document the typical fail modes and replacement procedures.",
  },
  {
    id: 7,
    question: "Where do faults appear in fluorescent and LED lighting installations on commercial sites?",
    options: [
      "Just the bulb.",
      "Five categories. (1) FLUORESCENT BALLAST FAILURE — magnetic ballasts hum, electronic ballasts go silent and the lamp flashes; replacement standard. (2) STARTER FAILURE (older fluorescent) — the lamp tries to start repeatedly, eventually fails. (3) LED DRIVER FAILURE — fitting goes dark or starts flickering; many drivers are specific to the fitting (Aurora, Ansell, Bell, Forest Lighting); replacement requires matching driver to fitting. (4) LAMPHOLDER OXIDATION (especially GU10) — spring contacts arc, lamp fails to start; clean and re-seat or replace lampholder. (5) OVERLOADED CIRCUIT — too many LED drivers on a circuit designed for fluorescent; LED inrush causes nuisance trips.",
      "Random.",
      "Just the cable.",
    ],
    correctAnswer: 1,
    explanation:
      "Lighting is one of the most-common fault categories on commercial sites because the installations are large (hundreds of fittings) and the components have finite life (5–10 years for drivers, 20+ for fittings). Knowing the failure modes lets you replace components (driver, lampholder) rather than entire fittings, saving cost and time.",
  },
  {
    id: 8,
    question: "Where do faults appear on outdoor / external electrical installations?",
    options: [
      "Random.",
      "Five high-frequency locations. (1) Outdoor sockets (BG / MK weatherproof) — gasket degradation, water ingress at the unused socket, RCD trip on rain. (2) Garden lighting transformers / converters — internal moisture from condensation; replacement standard. (3) Outdoor lighting fittings (security lights, post lights) — sealed fittings break their seal over years; water gets in, IR fails. (4) Conduit / containment — UV degradation of PVC, frost cracking, rodent damage. (5) Cable runs underground — settlement, root damage, archaeological dig damage; rare but significant. Brand patterns: BG / MK weatherproof outdoor sockets typically last 10 years before gasket replacement; cheap unbranded outdoor sockets fail in 2–3 years.",
      "Always cable.",
      "Random.",
    ],
    correctAnswer: 1,
    explanation:
      "Outdoor installations face environmental stress that indoor wiring doesn't. Water, UV, frost, vermin, settlement — all attack the installation. Knowing the specific failure modes by location category helps the L3 apprentice predict where to look first.",
  },
];

const faqs = [
  {
    question: "Why do socket terminals loosen over time even when they were properly tightened at installation?",
    answer:
      "Three factors. (1) Thermal cycling — every load on the socket heats the conductor at the terminal; cooling contracts the conductor; the screw doesn't follow the contraction perfectly, gap forms, contact resistance rises, more heat next cycle. (2) Vibration — building vibration over years (footfall, traffic, machinery) loosens marginally-tight screws. (3) Conductor creep — copper under sustained pressure deforms slowly; the conductor cross-section under the screw flattens, the screw effectively backs out. Modern push-fit terminals (Wago lever clamps, Click Smart spring terminals) avoid the screw-loosening problem but introduce other failure modes (intermittent contact on solid copper).",
  },
  {
    question: "Which brand of CU is most reliable for the long term?",
    answer:
      "Schneider Acti9 and Hager — both at the top of trade preference for long-term reliability. Wylex NHX is good mid-market. MK Sentry is reliable hardware but the manufacturer's warranty support has been criticised. Crabtree Starbreaker is older but still in service in many properties. The 6 kA fault current rating is standard; 10 kA rating (Schneider, Hager premium ranges) gives more headroom for properties near substation or with high PSCC. Avoid: anything unbranded, anything below 6 kA rated.",
  },
  {
    question: "What's the most-likely fault location on a 1990s rubber-cable installation?",
    answer:
      "The cables themselves. Rubber-insulated cables degrade — the rubber hardens, cracks, the cores eventually short or earth. Standard finding on EICRs of 1980s and earlier installations. The fault locations on these aren't terminations or accessories — they're entire cable runs. Rectification is rewire of the affected circuits, not patch repair. The L3 apprentice meets these on heritage / older property surveys; the recommendation is usually 'recommend full rewire — Code 2 (improvement recommended)' on EICR.",
  },
  {
    question: "How do I know if a fault is at a junction box rather than at a socket?",
    answer:
      "Sequential testing. Disconnect the suspected socket and IR test from the DB end. If the fault clears, the issue is downstream of the socket (likely the socket itself or a downstream connection). If it persists, the fault is upstream — likely a junction box on the cable run between the socket and the DB. Re-check at each accessible junction box back to the DB. Modern installations have fewer junction boxes (most use accessible accessories or Wago in-line connectors); older installations have many hidden JBs in lofts, ceiling voids, under floors.",
  },
  {
    question: "What's the difference between a 'spur' and a branch on a ring final, and why does it affect fault diagnosis?",
    answer:
      "A SPUR is a single-socket extension from a ring, drawing from one point only (one conductor pair from the ring). A BRANCH is a deviation from the main ring topology (loop-in, loop-out, possibly to multiple sockets). Spurs are limited to one accessory under BS 7671 433.1.5 and have no return path — fault diagnosis on a spur is straightforward (open / short / leak in or to the spur). A branch becomes a sub-ring or radial — fault diagnosis depends on the topology, which often isn't documented. The customer's 'we added that socket years ago' often signals a spur or branch that's the fault location.",
  },
  {
    question: "Where do faults appear in newer Smart Home installations (Hue, smart switches, KNX, Loxone)?",
    answer:
      "Smart Home installations have all the standard fault locations plus three new categories. (1) Comms failure — wireless signal loss (Hue Hub disconnected, Zigbee mesh broken), wired bus failure (KNX bus damaged), router issues. (2) Power supply failure — many Smart Home systems run on 12 V or 24 V DC PSUs which fail. (3) Configuration drift — software updates change behaviour, devices get re-paired, settings get lost. The L3 apprentice deals with the electrical layer (mains supply, power supply, hard-wired switches); the smart-home configuration is usually the integrator's responsibility (Crestron, Loxone partner, Hue support).",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 3"
            title="Likely fault locations"
            description="Where faults appear, by category — terminations (BS 7671 526.1), wiring systems, accessories, switchgear, instrumentation. Brand-specific failure modes for Hager / Schneider / Wylex / MK / Crabtree / BG / Aurora / JCC."
            tone="emerald"
          />

          <TLDR
            points={[
              "Most faults are at terminations — busbar, socket back-terminal, junction box. BS 7671 526.1 is the regulation; thermal cycling, vibration and conductor creep are the mechanisms.",
              "Each brand has known failure modes — Hager busbar drift, Wylex enclosure stress, Schneider terminal blocks. Brand knowledge speeds diagnosis.",
              "SWA glands fail at the earth-tag connection. EV chargers fail at the CP signal, the DC RCM, or the supply tail termination. Outdoor sockets fail at the gasket.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the three high-frequency termination locations — busbar, socket back-terminal, junction box — and explain why each fails.",
              "Recognise brand-specific failure modes for common UK CU brands (Hager, Schneider, Wylex, MK, Crabtree).",
              "Locate faults on ring final circuits — sockets, spurs, branches, ring breaks — using sequential testing.",
              "Identify SWA gland failure modes (earth-tag, compound seal) and locate them as common commercial fault sites.",
              "Recognise EV charger fault locations — CP signal, DC RCM, supply tail, earth electrode, internal contactor.",
              "Apply brand and category knowledge to predict where to look first when investigating a fault.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Terminations — the dominant fault location</ContentEyebrow>

          <ConceptBlock
            title="Three high-frequency termination locations"
            plainEnglish="Most faults are at terminations because terminations are where two conductors meet and mechanical contact is the only thing maintaining electrical contact. Any disturbance loosens the contact; loose contact is HRJ; HRJ is fire risk."
            onSite="The L3 apprentice's mental model: 'where would a previous installer have made a connection?' is usually the right answer to 'where's the fault?'. CU busbar, back-of-socket terminals, junction boxes — investigate in that order."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Consumer unit busbar terminations</strong> — under-torqued at install, oxidised over time, exposed under high inrush. Common in Hager / Schneider / Wylex CUs.</li>
              <li><strong>Socket back-terminals</strong> — particularly on ring final loop-in conductors; cheap accessories where the screw stops short of fully clamping the conductor. MK / Crabtree / BG.</li>
              <li><strong>Junction boxes</strong> — old porcelain/screw boxes (loose over time), Wago push-fit on solid copper conductors (intermittent contact issue), unidentified JBs hidden in lofts.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 526.1 (Connections)"
            clause={<>"Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."</>}
            meaning={<>Three requirements: durable continuity (low resistance over time), mechanical strength (doesn't loosen), protection (doesn\'t expose live parts). The L3 fault diagnostician\'s most-often-cited regulation — every HRJ is a 526.1 failure on at least one of the three legs.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 526.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Brand-specific failure modes</ContentEyebrow>

          <ConceptBlock
            title="Each brand has known weaknesses — knowing them speeds diagnosis"
            onSite="Brand knowledge separates an experienced fault diagnostician from a beginner. The trade press, manufacturer technical bulletins and forums document the patterns. The L3 apprentice builds the knowledge over time; the senior carries it as standard."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hager 6 kA RCBOs</strong> — thermal element drift after 15+ years; busbar terminations need annual re-torque. Look at the busbar first.</li>
              <li><strong>Wylex NHX</strong> — plastic enclosure stress fractures around the busbar after thermal cycling. Look for cracks, then terminations.</li>
              <li><strong>Schneider Acti9</strong> — generally robust; known for incoming terminal block failures on the larger 100 A units.</li>
              <li><strong>MK Sentry</strong> — reliable hardware; warranty support criticised. Look at standard termination locations.</li>
              <li><strong>Crabtree Starbreaker</strong> — older series; RCBO trip-time slows significantly past 12 years. Test trip-time first.</li>
              <li><strong>Aurora downlighters</strong> — driver failure at 7–10 years typical; replace driver, retain fitting.</li>
              <li><strong>JCC LED panels</strong> — internal driver / LED failure; manufacturer warranty good for 5 years.</li>
              <li><strong>BG outdoor sockets</strong> — gasket degrades at 8–10 years; replace gasket, retain socket if otherwise sound.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Wiring systems — ring finals, radials, SWA</ContentEyebrow>

          <ConceptBlock
            title="Where faults appear by circuit topology"
          >
            <p><strong>Ring final fault locations</strong> in approximate frequency order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Socket back-terminals (loop-in conductors loosen over time).</li>
              <li>The ring break point (where a previous installer cut and rejoined the ring).</li>
              <li>Spur joins (1-socket spurs from the ring; the join is in a JB).</li>
              <li>Cable damage from chasing-and-replastering, particularly where chases got dampened.</li>
            </ul>
            <p><strong>SWA fault locations</strong>:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Gland earth-tag — armour-to-earth path through the gland body.</li>
              <li>Compound seal — hardens / shrinks over years, water ingress.</li>
              <li>Cable run only when physically damaged (forklift, settlement, vermin).</li>
            </ul>
            <p><strong>Radial circuit fault locations</strong>:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Terminal at the load (the end-point under highest stress).</li>
              <li>Cable damage along the run.</li>
              <li>Breaker terminal at the DB.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Accessories, switchgear, instrumentation</ContentEyebrow>

          <ConceptBlock
            title="Where faults appear in equipment beyond cable + terminal"
          >
            <p><strong>Switches and accessories</strong>:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switch contacts pit / oxidise over years of operation; click-and-hold operation suggests contact issue.</li>
              <li>Plastic switch plates crack from over-tightening at install or thermal stress in service.</li>
              <li>Combined switch+socket faceplates concentrate failure points (switch contact + socket terminal in one).</li>
            </ul>
            <p><strong>Switchgear (MCBs, RCBOs, RCDs)</strong>:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mechanical wear of toggle / contacts after thousands of operations.</li>
              <li>Electrical wear from repeated fault clearance (pitted contacts).</li>
              <li>RCD coil saturation, electronic detection drift — slow trip-time on MFT test.</li>
            </ul>
            <p><strong>Instrumentation and metering</strong>:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Smart meter internal failure (DNO replacement).</li>
              <li>Sub-meter terminal corrosion and CT failure.</li>
              <li>Building instrumentation sensor failure, EMI on signal cabling.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 522.6.202"
            clause={
              <>
                "A cable installed in a wall or partition shall comply with the requirements set out in Table 52.1: (a) be installed in a prescribed zone; and (b) be provided with additional protection by means of an RCD having the characteristics specified in Regulation 415.1.1; or (c) comply with Regulation 522.6.204."
              </>
            }
            meaning={
              <>
                Likely fault locations include cables that aren&apos;t where you expect them. The Regulation defines the prescribed zones (vertical/horizontal lines from accessories) and gives the alternative routes &mdash; RCD plus zone, or a 522.6.204 covering (earthed metallic, conduit, trunking, mechanical protection). A cable found outside any of these is itself a defect to record.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 522.6.202 / Table 52.1, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 514.1.2"
            clause={
              <>
                "So far as is reasonably practicable, wiring shall be so arranged or marked that it can be identified for inspection, testing, repair or alteration of the installation."
              </>
            }
            meaning={
              <>
                When tracing a fault back through a building you depend on the original installer&apos;s identification &mdash; cable colours, sleeving, junction-box labels, schedule of circuits. The Regulation puts that identification duty on whoever installed it. If the wiring you&apos;re investigating isn&apos;t identifiable, that&apos;s a 514.1.2 finding to log alongside the fault itself.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 514.1.2, verbatim."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Replacing the accessory without investigating upstream"
            whatHappens={<>Apprentice finds a melted socket. Replaces socket. Retests, all fine, leaves. Three months later same socket melts again. Real fault: the upstream cable has an HRJ inside the wall (where it joins a previous extension) that\'s progressively damaging the downstream socket terminal. The accessory was the symptom; the cable joint was the cause. Replacing accessories without finding the upstream fault creates a repeating call-out cycle.</>}
            doInstead={<>For any termination-failure fault, ask \'why?' before replacing. Inspect the upstream cable end for signs of heat damage. If the conductor is discoloured, the heat is coming from upstream. Trace back along the circuit (sequential continuity / IR / thermal) until you find the source of the heat.</>}
          />

          <CommonMistake
            title="Assuming all CU brands fail in the same way"
            whatHappens={<>Apprentice arrives at a 25-year-old Wylex Standard CU with a tripped MCB. They focus on the MCB without checking the busbar — the Wylex Standard plastic enclosure has stress fractures around the busbar, exposing one of the busbar terminations. The MCB was tripping because of an HRJ at the busbar, not because of an MCB fault. They replace the MCB; problem returns in two days; they replace again; problem persists; eventually they realise the issue is the enclosure, not the MCB. The brand-specific failure mode would have pointed them to the busbar first.</>}
            doInstead={<>Build brand knowledge through experience and reference materials (manufacturer technical bulletins, ElectriciansForums, IET communities). Each common UK brand has 2–3 typical failure modes; knowing them gives you a 'where to look first' map.</>}
          />

          <Scenario
            title="Diagnosing a recurring fault on a SWA-fed garage"
            situation={<>Customer reports the garage RCD trips two or three times per month. The garage is fed by a 25 m run of 16 mm² SWA from the main house CU to a sub-DB in the garage. Investigation has been done twice before by other firms; both replaced the RCD; problem returned within weeks each time.</>}
            whatToDo={<>Knowing SWA fault locations cluster at glands: (1) Visual inspection of both glands (house end and garage end). At the garage end, find the gland\'s earth-tag is loose — corrosion between the brass gland body and the steel adapter back-box has reduced the armour-earth path. (2) Test continuity from the SWA armour to the garage CU\'s CPC bar — reads 8 Ω instead of expected near zero. (3) Diagnose: bad earth-tag at gland; the armour is providing intermittent CPC return; on certain fault conditions the path opens entirely and the RCD trips on residual current that has no return path. (4) Rectification: clean and re-make the earth-tag, re-torque the gland, retest continuity (now 0.05 Ω). (5) Verify with EFLI test at the garage sub-DB — Zs now within Table 41.3 limits. Fault corrected; RCD will not trip on the same fault mode again.</>}
            whyItMatters={<>Two previous firms replaced the wrong component because they didn\'t recognise the SWA gland as the most likely fault location. The brand and category knowledge (\'SWA glands fail at the earth-tag') would have led to the right diagnosis on visit one. Building this kind of pattern recognition is what separates the L3 apprentice's diagnostic speed from a beginner\'s hit-and-miss approach.</>}
          />

          <SectionRule />

          <ContentEyebrow>Consumer unit failure modes — by brand</ContentEyebrow>

          <ConceptBlock
            title="Hager / Schneider / Wylex / MK — what fails on each"
            plainEnglish="Different CU brands have different characteristic failure modes. Knowing the patterns lets you check the most likely location first instead of running through every possibility."
            onSite="UK domestic CU market: Hager (largest market share), Schneider Electric (Acti9 / Easy9), Wylex (Amendment 3 onwards has metal enclosures), MK (Sentry, Echo, K series), Crabtree, BG, Lewden. Each has distinct switchgear, terminal designs, and known failure modes. Use the brand label on the front of the CU to focus your diagnostic effort."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hager VML / VMLS / Design 50</strong> — common failures: RCBO won't reset (internal trip latch worn), busbar tab failure where a 2-pole RCBO has been forced into a wrong-pitch busbar, neutral bar grub-screw loose under thermal cycling.</li>
              <li><strong>Schneider Acti9</strong> — failures: incomer cable terminal browning under continuous full load (replace incomer with copper bar), iC60 RCBOs with tripped indicator stuck (mechanical), MGN bar (neutral) loose at end terminations.</li>
              <li><strong>Wylex NM range</strong> — older plastic enclosures, post-Amendment 3 metal. Failures: incomer screw vibrating loose (1.5 Nm typical, often left at 0.8 Nm), B-curve MCBs nuisance-tripping on large inrush, shared neutrals across RCBOs causing misdiagnosis.</li>
              <li><strong>MK Sentry / Echo</strong> — failures: 2-pole RCBO neutral terminal failure (the coupling between the L pole and the N pole loosens), older Sentry models pre-2010 had stuck mechanical interlocks.</li>
              <li><strong>BG Fortress / Compact</strong> — failures: incomer connection burning under sustained heavy load, RCBO trip lever cracked from rough operation, neutral bar terminal stripped from over-torque.</li>
              <li><strong>Surge protective devices</strong> — Hager SPN302D, Schneider iPRD40r, Wylex SPDs all use replaceable cartridges. Status indicator (red flag = operated, replace).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Wiring system failure points</ContentEyebrow>

          <ConceptBlock
            title="Where cables and containment fail — predictable locations"
            plainEnglish="Wiring system failures cluster at predictable points: terminations (the most common location for any fault), penetrations (cables passing through walls / floors / ceilings), bends and pull points (mechanical stress), supports (clip / cleat / stud points), expansion joints, and where rodents and pests can access."
            onSite="Standard UK wiring systems and their failure modes: Twin-and-earth (T&E) PVC — terminations and accessory back-boxes; SWA — glands and bends, especially at SWA-to-CU entries; FP200 fire-rated — terminations into fire-rated accessories; LSF (low smoke and fume) — same as T&E plus more brittle insulation in old age; PVC singles in conduit — pull points and conduit bend pressure; flat MICC (mineral insulated copper-clad) — moisture ingress at terminations."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>T&E in joist voids</strong> — staple/clip damage (driven through cable), nail damage from later trades, rodent gnawing on insulation.</li>
              <li><strong>SWA at glands</strong> — earth-tag failure (broken contact between armour and gland), gland not torqued (water ingress around the cable bedding), SWA cut and re-terminated badly.</li>
              <li><strong>Cable in conduit</strong> — pulling damage at install (insulation scuffed against bushed entries), excessive bend radius cracking conductor, conduit corroded at bends causing earth path issues.</li>
              <li><strong>Cable in trunking</strong> — segregation issues (Cat 5 alongside mains), trunking lid removed and not refitted, capacity oversubscribed leading to overheating.</li>
              <li><strong>Outdoor wiring</strong> — UV degradation of PVC over 10+ years; cable jacket cracks; sun-side of cable runs more vulnerable.</li>
              <li><strong>Cellar / under-stair runs</strong> — damp ingress, vermin access, fall damage from tools or stored items.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Accessory failure modes — sockets, switches, light fittings</ContentEyebrow>

          <ConceptBlock
            title="MK / Crabtree / BG / Click / Hager Sollysta — accessory failures"
            plainEnglish="Wiring accessories fail in predictable ways depending on brand and design. Knowing the typical failure mode for each brand speeds diagnosis."
            onSite="UK accessory market: MK Logic Plus (premium), Crabtree (Capital, Platinum), BG Nexus, Click Mode, Hager Sollysta. Each has typical failure modes that the L3 apprentice should recognise. Common across all brands: terminal screw loose under thermal cycling; multi-strand conductor with strands escaping the terminal; back-box overcrowded preventing cover seating; broken cover from impact damage."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MK Logic Plus</strong> — premium quality; failures rare but: terminal screw vibration on circuits with heavy contactor cycling; switch mechanism wear after 50,000+ operations.</li>
              <li><strong>Crabtree Capital / Platinum</strong> — sometimes seen with terminal block discolouration on appliance circuits; switch rocker mechanism wear on lighting circuits with heavy cycling.</li>
              <li><strong>BG Nexus</strong> — value-priced; common failures include socket shutters jamming (resists insertion), terminal screw stripping under over-torque, USB-A/USB-C charger sockets failing prematurely.</li>
              <li><strong>Click Mode</strong> — modular dimmer plates have known compatibility issues with cheap LED drivers; specify Aurora Enlite or LightwaveRF compatible drivers.</li>
              <li><strong>Hager Sollysta</strong> — terminal screws with anti-rotation feature; failures rare; tend to fail at the cable strain reliever rather than the terminal.</li>
              <li><strong>Lampholders</strong> — pendant fittings: brass fittings corrode in damp environments; ceramic E27 holders crack from over-torque; GU10 spring contacts lose tension after repeated lamp swaps.</li>
              <li><strong>Downlights (Aurora, Collingwood, JCC)</strong> — driver failure (SMPS aging in hot ceiling voids), connector failure between driver and lamp, IP rating compromised by overspray of paint or plaster.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Switchgear failure modes</ContentEyebrow>

          <ConceptBlock
            title="MCB / RCD / RCBO / MCCB — predictable failure modes"
            plainEnglish="Protective switchgear ages mechanically and electrically. Failures cluster at end-of-life or after multiple high-current trips. The L3 apprentice recognises the symptoms and knows when to recommend replacement."
            onSite="Switchgear failure modes by category: MCB — won't reset (internal trip mechanism damage from high fault current); RCD — won't trip on test (contamination, internal corrosion, ageing); RCBO — combined failure of either function; MCCB — terminal pitting from arcing under repeated overload, mechanism wear after thousands of operations."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MCB won't reset</strong> — internal trip latch damaged after high fault. Replace, don't try to reset by force. Common on B6/B16 MCBs that have cleared a short.</li>
              <li><strong>MCB nuisance trips</strong> — wrong type curve (B-curve on a circuit with high inrush, e.g. large LED drivers, motors). Upgrade to C or D curve or upsize the MCB.</li>
              <li><strong>RCD won't trip on test button</strong> — internal mechanism corroded (humid environment), contacts welded after high-current event, or the test button itself is mechanically broken. Replace.</li>
              <li><strong>RCD over-sensitive</strong> — Megger MFT1741+ ramp test shows trip below 15 mA on a 30 mA device. Common after years of service; replace.</li>
              <li><strong>RCBO won't reset after trip</strong> — combined latch / electronic detection fault. Replace; don't attempt repair.</li>
              <li><strong>MCCB (Schneider NSX, ABB Tmax, Eaton xEffect)</strong> — terminal pitting visible under cover; mechanism wear after 5000+ operations; thermal-magnetic settings drift over decades.</li>
              <li><strong>AFDD nuisance trips</strong> — Type AFDD detects arc-fault signatures; nuisance trips from VSDs, dimmers, switching power supplies. A4:2026 expanded AFDD requirements; matching device type to load is critical.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Most faults are at terminations — CU busbar, socket back-terminals, junction boxes. BS 7671 526.1 is the regulation.",
              "Each CU brand has known failure modes — Hager busbar drift, Wylex enclosure stress, Schneider terminal block. Brand knowledge speeds diagnosis.",
              "Ring final faults cluster at socket loop-in terminals, ring break points, and spur joints. Sequential testing localises to a branch; visual / thermal finds the point.",
              "SWA glands fail at the earth-tag connection (most common) and the compound seal (water ingress). Visual + continuity testing diagnoses.",
              "EV chargers have specific fault locations — CP signal, DC RCM, supply tail termination, earth electrode (TT), internal contactor.",
              "Lighting faults cluster at lampholders, drivers and internal wiring. Brand quality directly affects failure rate (cheap GU10 fails at 2 years, mid-tier at 10+).",
              "Switchgear ages — mechanical wear, electrical wear, RCD coil saturation. MFT trip-time test catches slow-tripping RCDs before failure.",
              "Outdoor installations face environmental stress — water at gaskets, UV on PVC, frost cracking, vermin. Each location category has predictable failure modes.",
            ]}
          />

          <Quiz title="Likely fault locations — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.2 Common symptoms</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.4 RCD / AFDD nuisance trips</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
