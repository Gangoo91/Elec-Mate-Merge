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
  'Overloads, Short Circuits and Arcing | Level 2 Module 1.2.2 | Elec-Mate';
const DESCRIPTION =
  "Three things that turn a healthy circuit into a fire — too much current, conductors touching, or a sustained arc. What causes them, what they do to a cable, and how the protective device clears them.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'overcurrent-three-types-check',
    question: 'Which of these is NOT one of the three overcurrent conditions?',
    options: [
      'Overload — current above rating, circuit otherwise intact',
      'Short circuit — line touching neutral or another line',
      'Earth fault — line touching the protective conductor or earthed metalwork',
      'Voltage drop — long cable run pulling the volts down',
    ],
    correctIndex: 3,
    explanation:
      "Voltage drop isn’t an overcurrent — it’s a separate design issue (BS 7671 limits it to 3% lighting / 5% other). The three overcurrents are overload, short circuit and earth fault. All three put more current down the cable than it’s rated for.",
  },
  {
    id: 'cable-temperature-check',
    question: 'What’s the maximum continuous operating temperature for standard PVC cable insulation?',
    options: [
      '40°C',
      '70°C',
      '90°C',
      '120°C',
    ],
    correctIndex: 1,
    explanation:
      "Standard PVC tops out at 70°C continuous. Past that, the insulation degrades — it goes brittle, then it cracks, then it burns. That’s why Reg 433.1.1 limits the device operating current to 1.45 × the cable’s capacity.",
  },
  {
    id: 'afdd-purpose-check',
    question: 'What’s an AFDD actually for?',
    options: [
      'Detecting earth faults the RCD might miss',
      'Detecting series and parallel arcing that an MCB or RCD can’t see',
      'Replacing the main switch in a consumer unit',
      'Measuring prospective fault current at the origin',
    ],
    correctIndex: 1,
    explanation:
      "AFDDs spot the high-frequency signature of an arc — a loose terminal cooking away, or insulation breaking down. An MCB only sees overcurrent; an RCD only sees imbalance. Neither catches a series arc. A4:2026 mandates AFDDs in HMOs and high-rise dwellings.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What’s the difference between an overload and a short circuit?',
    options: [
      'No difference — same fault, different name',
      'Overload = current above rating with circuit intact; short circuit = direct L-N or L-L connection bypassing the load',
      'Overload affects the neutral; short circuit affects the line',
      'Overload trips the RCD; short circuit trips the MCB',
    ],
    correctAnswer: 1,
    explanation:
      "Overload current is usually a few times the rating — cooks the cable slowly. Short circuit current is hundreds or thousands of times higher — needs the device to break instantly before the cable lets go.",
  },
  {
    id: 2,
    question: 'Why does cable insulation matter when a circuit is overloaded?',
    options: [
      'It changes colour so you can see it',
      'PVC degrades above 70°C — then it cracks, then it burns',
      'It improves conductivity at high temperatures',
      'It absorbs the extra current',
    ],
    correctAnswer: 1,
    explanation:
      "Standard PVC is rated for 70°C continuous. Cook it past that and the insulation goes brittle, exposing live conductors and feeding any fire that starts. That’s the actual hazard with overload — not the current itself, but the heat.",
  },
  {
    id: 3,
    question: 'A nail through a buried cable in a wall causes which fault type?',
    options: [
      'Always an earth fault only',
      'Always an overload',
      "Could be a short circuit (L-N), an earth fault (L-PE), or both — depends what the nail bridges",
      'Voltage drop',
    ],
    correctAnswer: 2,
    explanation:
      "Depends what the nail hits. Line to neutral = short circuit. Line to the cpc or to a metal box = earth fault. Often it’s both at once. Either way, the device should clear it instantly — that’s why we use 50mm safe zones and capping.",
  },
  {
    id: 4,
    question: 'What’s a series arc, and why is it dangerous?',
    options: [
      'A short between two phase conductors — instant MCB trip',
      "An arc across a loose terminal in line with the load — current stays low, MCB doesn’t see it, but it generates intense heat",
      'An arc only seen on three-phase systems',
      'An arc that only happens during testing',
    ],
    correctAnswer: 1,
    explanation:
      "A loose terminal arcs as the load draws current — the current is normal, so the MCB has no reason to trip, but the arc temperature is thousands of degrees. Classic kitchen fire cause. AFDDs are the only protection that catches it.",
  },
  {
    id: 5,
    question: "What does Regulation 433.1.1 require about the operating current of an overload device?",
    options: [
      'It must equal the cable’s current-carrying capacity exactly',
      "It must not exceed 1.45 × the lowest current-carrying capacity (Iz) of the circuit conductors",
      'It must be at least double the design current',
      'It must trip within 0.4 seconds at any current',
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 433.1.1(c). The current that actually trips the device must stay at or below 1.45 × Iz — otherwise the cable could sit cooking forever before the device decides to do anything. It’s why MCB rating selection isn’t free choice.",
  },
  {
    id: 6,
    question: 'What’s breaking capacity, and why does it matter?',
    options: [
      'How long the device takes to reset — longer is safer',
      "The maximum fault current the device can safely interrupt without exploding or welding shut",
      'The current the device trips at during normal operation',
      'A measurement only used on industrial sites',
    ],
    correctAnswer: 1,
    explanation:
      "Every protective device has a breaking capacity (e.g. 6 kA for a domestic MCB). If the prospective fault current at that point exceeds it, the device can fail catastrophically when it tries to break the fault. PFC test at the origin proves you’re inside the limit.",
  },
  {
    id: 7,
    question: 'Where does A4:2026 require AFDDs?',
    options: [
      'Every domestic socket circuit, no exceptions',
      "Single-phase socket-outlet circuits up to 32 A in HMOs and high-rise residential buildings (and recommended elsewhere)",
      'Only on three-phase industrial circuits',
      'Only on lighting circuits in commercial buildings',
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 makes AFDDs mandatory for socket-outlet final circuits ≤ 32 A in HMOs and HRRBs. They’re recommended elsewhere (and increasingly being specified). Note: AFDDs are NOT permitted in medical group 0/1/2 locations.",
  },
  {
    id: 8,
    question: 'You’re on site and notice scorch marks around a connector block in a junction box. What does that tell you?',
    options: [
      'Normal sign of a healthy connection — ignore it',
      "There’s been arcing at a loose or high-resistance termination — isolate, investigate and remake the connection",
      'The cable needs uprating to a bigger size',
      "It’s only a problem if it’s been there over 12 months",
    ],
    correctAnswer: 1,
    explanation:
      "Scorching = past arcing. Loose terminal, dry joint, undersized terminal for the conductor — something’s been sparking. Don’t just retighten and walk away. Isolate, find the cause, replace the connector if it’s damaged. Note it on the next inspection.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "Why doesn’t the MCB just trip the moment current goes over its rating?",
    answer:
      "Because most loads pull a brief surge when they start — motors, transformers, even an old fluorescent fitting. If the MCB tripped on every inrush you’d never keep the lights on. So MCBs have a time-current curve: small overcurrents take seconds or minutes to trip; massive overcurrents (short circuits) trip in milliseconds. That’s the difference between the thermal element (overload) and the magnetic element (short circuit) in the same device.",
  },
  {
    question: "What’s the difference between Type B, C and D MCBs?",
    answer:
      "Same overload behaviour, different magnetic trip thresholds. Type B trips at 3–5 × In — standard for domestic/lighting/socket circuits. Type C trips at 5–10 × In — for circuits with bigger inrush (small motors, banks of fluorescents). Type D trips at 10–20 × In — for transformers, X-ray gear, big motors. Pick the wrong one and you’ll either get nuisance tripping or you won’t clear a fault fast enough for shock protection.",
  },
  {
    question: "What’s an RCBO and how is it different from an MCB?",
    answer:
      "An RCBO is an MCB plus an RCD in one device. You get overload + short-circuit protection AND earth-fault/residual-current protection on a single circuit. Modern consumer units use them on every final circuit — a fault on one circuit only takes that circuit out, not half the board (which is what happens with the older split-load RCD setup).",
  },
  {
    question: "Why do we need to know the prospective fault current (PFC)?",
    answer:
      "Because every protective device has a maximum fault current it can safely break. A standard 6 kA domestic MCB will explode if you ask it to interrupt 25 kA. The PFC test at the origin tells you the worst-case fault current at that point — you then prove the devices you’re fitting can handle it. Reg 132.2(c)(iv) says you have to record it on the certificate.",
  },
  {
    question: "Will an AFDD replace an RCBO?",
    answer:
      "No — they detect different things. RCBOs see overcurrent and earth/residual leakage. AFDDs see the high-frequency signature of an arc. You usually fit them together (often as a combined AFDD+RCBO module). One protects you from shock and standard overcurrent; the other catches the loose-terminal, hidden-arcing fires that the others miss.",
  },
  {
    question: 'What does “discrimination” actually mean on site?',
    answer:
      "Only the device closest to the fault should trip. If a fault on a single socket trips the main switch and kills the whole building, that’s no discrimination. Done properly, the RCBO on the affected circuit trips, every other circuit stays live, and the fault is isolated. Achieved through the right ratings and time-current curves up the chain (final circuit → distribution → main).",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · Subsection 2"
            title="Overloads, short circuits and arcing"
            description="Three things that turn a healthy circuit into a fire — too much current, conductors touching, or a sustained arc. What causes them, what they do to the cable, and how the protective device is meant to clear them before anyone gets hurt."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three overcurrent conditions: overload (too much current, circuit intact), short circuit (L-N or L-L direct), earth fault (L-PE).",
              "The hazard isn’t the current — it’s the heat. PVC dies at 70°C, and an arc burns at thousands of degrees.",
              "Different devices clear different faults: MCBs/fuses for overload + short circuit, RCDs for earth/residual, AFDDs for arcing the others can’t see.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Name the three overcurrent conditions and describe how each one starts.",
              "Explain why heat — not current — is what actually causes the damage.",
              "Tell the difference between a series arc and a parallel arc, and say which one AFDDs are designed to catch.",
              "State what BS 7671 Regulation 433.1.1 limits the operating current of an overload device to (1.45 × Iz).",
              "Match the right protective device to the right fault — fuse, MCB, RCBO, AFDD.",
              "Spot the on-site warning signs of overheating, loose terminations and past arcing.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three overcurrent conditions</ContentEyebrow>

          <ConceptBlock
            title="Overload, short circuit, earth fault — same family, different fault"
            plainEnglish="Three ways a circuit ends up carrying current it shouldn’t. Each one starts differently. Each one needs the device to react in a different timeframe."
          >
            <p>
              An <strong>overload</strong> is when the circuit is wired correctly but you’re pulling
              more current than it was designed for. Cable’s intact, terminations are sound — you’ve
              just plugged too much in. Current might be 1.5 to 5 times the rating. The cable starts to
              heat up.
            </p>
            <p>
              A <strong>short circuit</strong> is line touching neutral (or line touching another line
              on three-phase). The load gets bypassed entirely. Almost no resistance, so the current
              can hit hundreds or thousands of amps in a few milliseconds. That’s a fault current,
              and it has to be cleared instantly.
            </p>
            <p>
              An <strong>earth fault</strong> is line touching the cpc, or live metalwork, or anything
              earthed. Same idea as a short circuit but the return path is through the protective
              conductor instead of the neutral. This is where RCDs come in — a tiny earth leakage
              (30 mA) doesn’t trip the MCB, but it’ll kill someone holding the metalwork.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What actually causes overloads day-to-day"
            onSite="The classic offender: a four-way extension feeding a kettle, a microwave and a portable heater on a 13 A spur. All it takes is them all to draw at once."
          >
            <p>
              The textbook examples are usually:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Too much load on the circuit</strong> — several high-power appliances
                stacked on one socket circuit, or extension leads daisy-chained off each other.
              </li>
              <li>
                <strong>Motor stalled or stuck</strong> — a jammed pump or fan keeps drawing
                locked-rotor current (which can be 6–8 × the running current) until something
                gives.
              </li>
              <li>
                <strong>Cable undersized for the load</strong> — someone fitted 1.5 mm² where
                2.5 mm² was needed. The MCB’s sized for the cable, but the load was sized for the
                appliance. They don’t match.
              </li>
              <li>
                <strong>Bad design call</strong> — wrong diversity factor used at the design stage,
                so the actual real-world load exceeds what was assumed.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.1(c)"
            clause="The current (I) causing effective operation of the protective device shall not exceed 1.45 times the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit."
            meaning={
              <>
                In English: the device that’s protecting the cable has to actually trip at no more
                than <strong>1.45 × the cable’s capacity</strong>. So a 2.5 mm² cable with an
                Iz of 24 A can’t be sat behind anything that takes more than 34.8 A to trip —
                otherwise the cable would cook for ages before the device decided there was a problem.
                It’s why MCB rating selection isn’t a free choice.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What causes a short circuit</ContentEyebrow>

          <ConceptBlock
            title="L touching N. L touching L. Almost zero resistance, massive current."
            onSite="Most short circuits are mechanical — something physical brought two conductors together. Damage, water, vermin, or a screw."
          >
            <p>
              A short circuit happens when something bridges line to neutral (or line to line) directly,
              with no load in between. The usual culprits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Damaged insulation</strong> — cable nicked when it was pulled in, or
                degraded over time from heat or UV.
              </li>
              <li>
                <strong>Stray strands at terminations</strong> — a couple of strands of the line
                conductor flicked across to the neutral terminal during a busy second-fix.
              </li>
              <li>
                <strong>Water ingress</strong> — a leaking soil pipe drips into a junction box.
                Water is conductive enough to bridge terminals.
              </li>
              <li>
                <strong>Vermin</strong> — mice love chewing through cable insulation. So do
                squirrels in lofts.
              </li>
              <li>
                <strong>Screws, nails, drill bits through buried cable</strong> — the classic
                renovation nightmare. Hence the 50 mm safe zones in BS 7671 522.6.
              </li>
            </ul>
            <p>
              The current shoots up because there’s nothing limiting it except the impedance of the
              cables and the supply transformer. In a typical domestic property the prospective short
              circuit current can reach 2–6 kA at the consumer unit. Industrial settings can be
              25 kA or more.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Arcing — the third hazard</ContentEyebrow>

          <ConceptBlock
            title="Arcing: a sustained spark between conductors"
            plainEnglish="An arc is electricity jumping a gap through ionised air. Once it starts, it heats the air around it to thousands of degrees and feeds itself."
            onSite="The crackle of a loose terminal in a junction box. The buzz of an under-tightened MCB. Both are arcing in slow motion. Both can start a fire."
          >
            <p>
              An arc is a sustained electrical discharge through ionised gas — effectively a
              localised plasma between two conductors. Temperature in the arc itself can hit
              19,000°C. That’s hotter than the surface of the sun. Even a tiny arc will scorch
              metalwork and ignite anything combustible nearby (cable insulation, dust, sawdust,
              cardboard).
            </p>
            <p>Two flavours, both bad:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Series arc</strong> — happens at a loose connection that’s in series
                with the load. The load still works, the current looks normal, the MCB sees nothing
                wrong. But the loose terminal cooks away in the background. Classic cause of fires
                that start in junction boxes weeks after an installation. The MCB and RCD will both
                miss it.
              </li>
              <li>
                <strong>Parallel arc</strong> — happens between conductors when insulation breaks
                down. Acts like a high-resistance short circuit. May or may not draw enough current
                to trip the MCB depending on the contact area.
              </li>
            </ul>
            <p>
              <strong>AFDDs</strong> (Arc Fault Detection Devices) are the only standard protective
              device designed to spot the high-frequency electrical signature of arcing and
              disconnect before a fire starts.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (HMOs)"
            clause="Arc fault detection devices (AFDD) conforming to BS EN 62606 shall be provided for single-phase AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in houses in multiple occupation (HMOs)."
            meaning={
              <>
                A4:2026 turned what used to be a recommendation into a hard requirement for HMOs and
                high-rise residential buildings. So if you’re wiring or rewiring a house in
                multiple occupation, every standard socket-outlet circuit needs an AFDD on it.
                Same applies to dwellings in buildings with a top occupied storey above 18 m
                (high-rise residential). Recommended (not yet mandatory) everywhere else.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why overcurrent is actually dangerous</ContentEyebrow>

          <ConceptBlock
            title="The current isn’t what kills the cable. The heat does."
            plainEnglish="Run a cable above its rated current and it heats up. Heat degrades the insulation. Degraded insulation cracks, exposes live conductors, and feeds any fire that starts."
          >
            <p>
              Standard PVC-insulated cable is rated to <strong>70°C continuous operating
              temperature</strong>. Past that, the insulation starts to lose its mechanical
              properties. It goes brittle. It cracks. Eventually it ignites. Higher-spec thermosetting
              insulation (XLPE, LSF/LSZH) handles 90°C, but even that has a hard ceiling.
            </p>
            <p>The chain of damage usually goes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Cable insulation degrades</strong> — first sign on site is discoloured
                cable sheath at terminations, or a faint smell of hot plastic.
              </li>
              <li>
                <strong>Equipment damage</strong> — connected appliances run on degraded supply,
                often shortening their life.
              </li>
              <li>
                <strong>Voltage drop affects the rest of the circuit</strong> — lights dim, motors
                struggle to start, electronics behave erratically.
              </li>
              <li>
                <strong>Fire ignition</strong> — either from the cable itself, or from arcing
                where the insulation has finally broken down.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The protective devices, and what they do</ContentEyebrow>

          <ConceptBlock
            title="Different fault, different device"
            onSite="A modern domestic consumer unit usually has an RCBO per circuit (and AFDD+RCBOs in HMOs and high-rise). The days of one big RCD covering half the board are gone."
          >
            <p>The main families:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fuses</strong> (BS 88, BS 1361, BS 3036) — simple, cheap, very high
                breaking capacity. Used for the main supply fuse and on industrial distribution. Once
                blown, they’re replaced, not reset.
              </li>
              <li>
                <strong>MCBs</strong> (BS EN 60898) — reusable. Types B (3–5 × In), C
                (5–10 × In) and D (10–20 × In) cover different inrush profiles.
                Protect against overload AND short circuit.
              </li>
              <li>
                <strong>RCDs</strong> (BS EN 61008) — detect residual current (line-neutral
                imbalance), trip at 30 mA in 40 ms for additional shock protection. Don’t protect
                against overload or short circuit on their own.
              </li>
              <li>
                <strong>RCBOs</strong> (BS EN 61009) — MCB and RCD in one. The standard final
                circuit device in modern boards.
              </li>
              <li>
                <strong>AFDDs</strong> (BS EN 62606) — detect the high-frequency signature of
                series and parallel arcs. Often combined with RCBO functionality.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 435.1"
            clause="A protective device providing protection against both overload current and fault current shall fulfil the requirements of the relevant regulations in Sections 433 and 434."
            meaning={
              <>
                If one device is doing both jobs (which is what an MCB or RCBO does), it has to satisfy
                BOTH the overload rules (Section 433 — the 1.45 × Iz limit, the In ≥ Ib
                rule) AND the fault current rules (Section 434 — disconnection times, breaking
                capacity, energy let-through). Not a pick-and-choose.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43"
          />

          <SectionRule />

          <ContentEyebrow>Breaking capacity — the bit you can’t skip</ContentEyebrow>

          <ConceptBlock
            title="Every device must safely break the worst-case fault current at its location"
            plainEnglish="If 12 kA could flow through that MCB during a fault, the MCB’s breaking capacity has to be at least 12 kA — otherwise it can’t actually clear the fault and may explode trying."
          >
            <p>
              Every protective device has a <strong>rated breaking capacity</strong> printed on it
              (e.g. "6000" or "6 kA" for a typical domestic MCB; 10 kA or 25 kA for
              higher-spec ones). That’s the maximum fault current it can safely interrupt without
              the contacts welding shut, the casing rupturing, or the device disintegrating.
            </p>
            <p>
              The <strong>prospective fault current (PFC)</strong> at any point in the installation is
              the worst-case current that would flow if a perfect short circuit happened there. It’s
              highest at the origin (close to the supply transformer) and reduces with cable length.
              You measure it with a loop tester at the origin during initial verification.
            </p>
            <p>
              The rule: every protective device’s breaking capacity must be at least equal to the
              PFC at its installed location. Get this wrong and the device fails when you actually
              need it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iv)"
            clause="The documentation shall include prospective fault current."
            meaning={
              <>
                The PFC isn’t just nice-to-know — it’s a mandatory entry on the
                Electrical Installation Certificate. You measure it at the origin and you record it.
                That’s how anyone working on the installation in future knows what devices it can
                safely accept.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13"
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Spotting trouble on site</ContentEyebrow>

          <ConceptBlock
            title="What past or building overcurrent looks like — and smells like"
            onSite="Use your eyes, your nose and your hands. A cooked terminal often gives itself away long before it’s ignited anything."
          >
            <p>
              Plenty of fault conditions warn you they’re coming if you know what to look for:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Discoloured terminations</strong> — brown or black around the screw of a
                connector that should look pristine. Past arcing.
              </li>
              <li>
                <strong>Scorch marks inside accessories</strong> — sockets, switches, junction
                boxes, MCB shrouds. Open one up and look.
              </li>
              <li>
                <strong>Smell of hot insulation</strong> — distinctive burnt-plastic smell. If
                the customer mentions it, treat it seriously.
              </li>
              <li>
                <strong>Repeated tripping</strong> — not nuisance tripping, but the same MCB
                going every time the same load runs. Something’s wrong on that circuit.
              </li>
              <li>
                <strong>Melted shrouds or distorted plastic</strong> — around terminations on
                the busbar in a consumer unit.
              </li>
              <li>
                <strong>Crackling or buzzing</strong> from a board, junction box or accessory —
                series arcing in real time.
              </li>
              <li>
                <strong>Warm cables, sockets or switch plates</strong> — they shouldn’t be
                warm to touch. Resistive heating.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Resetting a tripped device without finding out why"
            whatHappens={
              <>
                Customer rings up: "my upstairs sockets keep tripping". You drive over,
                push the RCBO back up, it stays in. Job done? No. The fault is still there, you just
                left it armed. Next time something draws current it’ll trip again — or worse,
                this time it doesn’t trip and the cable cooks until it ignites.
              </>
            }
            doInstead={
              <>
                A device tripped for a reason. Isolate, do an IR test, check accessories for damage,
                check terminations for scorching or looseness, look for what’s changed since it
                last worked. Find the cause. EAWR Regulation 4 says no work should be carried out on
                or near live conductors unless it’s unreasonable for them to be dead — by
                extension, you don’t leave a known-faulty circuit live.
              </>
            }
          />

          <Scenario
            title="The kitchen socket that keeps getting warm"
            situation={
              <>
                Customer’s kitchen has a double socket on the worktop next to the fridge. They’ve
                noticed the socket faceplate gets warm when the kettle and the air-fryer run together.
                MCB hasn’t tripped. They want a second socket fitted for a coffee machine.
              </>
            }
            whatToDo={
              <>
                Don’t just add the socket. Isolate, take the existing one off and inspect it.
                Look for discoloured terminals (past arcing), loose conductors, undersized cable, or
                a back-box full of stretched-out terminations. Check the circuit design — if it’s
                a 32 A radial in 4 mm² you may be fine; if it’s a spur off a ring fed by 1.5
                mm² you’re already over the cable rating. Test the circuit properly before
                adding any more load to it.
              </>
            }
            whyItMatters={
              <>
                A socket warm enough to feel through the faceplate is already operating outside spec.
                Adding more load to it doesn’t fix the problem — it accelerates it. This is
                exactly the kind of overcurrent condition that turns into a kitchen fire six months
                later, and the certificate has your name on it.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three overcurrents: overload (current above rating, circuit intact), short circuit (L-N or L-L direct), earth fault (L-PE).",
              "PVC dies at 70°C continuous. The cable damage is from heat, not from current itself.",
              "Reg 433.1.1 limits the device operating current to 1.45 × the cable’s Iz — it’s why MCB rating isn’t a free choice.",
              "Series arcs (loose terminations) are the silent fire-starter. MCBs and RCDs miss them — only AFDDs catch them.",
              "A4:2026 makes AFDDs mandatory for socket circuits ≤ 32 A in HMOs and high-rise residential buildings.",
              "Every protective device must have a breaking capacity at or above the prospective fault current at its installed location.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz
            title="Overloads, short circuits and arcing knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Electric shock and burns
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fire and explosion hazards
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
