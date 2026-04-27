/**
 * Module 1 · Section 5 · Subsection 4 — Safe isolation in different scenarios
 *
 * Unit 201, LO3, AC 3.8 — apprentice has to be able to apply the procedure
 * to different installation types and work activities, not just a textbook
 * single-phase final circuit.
 *
 * Walks through how the same 7-step procedure adapts for: single-phase final
 * circuits, three-phase circuits and sub-mains, fault-finding (where you
 * legitimately have to energise to diagnose), and PV / EV / generator sites
 * where backfeeds are real.
 *
 * Cross-references: §5.2 (the procedure), §5.3 (kit), §5.5 (failure modes).
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

const TITLE = 'Safe isolation in different scenarios | Level 2 Module 1.5.4 | Elec-Mate';
const DESCRIPTION =
  'How the safe isolation procedure adapts for single-phase, three-phase, sub-mains, fault-finding, and sites with PV, EV chargers, generators or UPS. Backfeed paths, conductor combinations, and when live working is genuinely allowed.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 's5-4-three-phase-combinations-check',
    question: 'How many conductor combinations should you test on a 400 V three-phase circuit (with neutral and earth)?',
    options: [
      'Three (L1-L2, L2-L3, L1-L3)',
      'Six (the three line-line plus L1-N, L2-N, L3-N)',
      'Ten (line-line, line-N, line-E for each line, plus N-E)',
      'Just one — line to earth on any phase',
    ],
    correctIndex: 2,
    explanation:
      "On three-phase TN with N: L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E — ten combinations. Misses any one and a backfeed or borrowed neutral can hide. Some electricians tally them on the back of the hand.",
  },
  {
    id: 's5-4-pv-isolation-check',
    question: 'You’re isolating a CU on a domestic install with rooftop PV. The DNO main switch is off. Are you safe?',
    options: [
      'Yes — the main switch isolates everything',
      'No — the PV is a SECOND source. The PV DC and AC sides both need their own dedicated isolation',
      'Yes if the inverter LED is off',
      'Only at night',
    ],
    correctIndex: 1,
    explanation:
      "PV is a generator. With sunlight on the panels the inverter can backfeed AC into the AC bus, AND the DC strings between the panels and the inverter are live whenever the panels are illuminated. You isolate the AC side at the dedicated PV AC isolator AND the DC side at the dedicated PV DC isolator. Both must be locked off independently.",
  },
  {
    id: 's5-4-fault-finding-check',
    question: 'Reg 14 of EAWR allows live working when three tests are met. What does this look like for fault-finding?',
    options: [
      'You can work live whenever isolation is inconvenient',
      'Genuine diagnostic work that cannot be done dead, by a competent person, with appropriate PPE/test kit and a justified plan — and even then, isolate as much as possible',
      'Apprentices can do it under supervision',
      'It’s never allowed under any circumstances',
    ],
    correctIndex: 1,
    explanation:
      "Live working is an exception, not a routine. Even when fault-finding genuinely needs the supply on (e.g. measuring volt drop under load), you isolate everything you can, only expose the minimum, use insulated tools, GS38 leads, appropriate PPE, often a permit-to-work, and ideally a competent person watching with the means to disconnect.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'You’re changing a single 13 A socket on a 230 V ring. Which combinations do you prove dead at the back box?',
    options: [
      'Just L-N',
      'L-N and L-E',
      'L-N, L-E and N-E',
      'Whichever feels right at the time',
    ],
    correctAnswer: 2,
    explanation:
      "All three on single-phase. L-N catches the line. L-E catches a broken neutral or borrowed earth. N-E catches a borrowed neutral that’s been raised by another circuit. Skip any one and you can be working on a conductor at line potential.",
  },
  {
    id: 2,
    question: 'You’re isolating a 400 V three-phase distribution board for a sub-main change. Where is your point of isolation?',
    options: [
      'The MCBs on the outgoing ways of the board itself',
      "The switch-disconnector on the supply side of THIS board (or, if it has none, on the upstream board)",
      "Any of the three line conductors with insulated cable cutters",
      'Pulling the meter tails',
    ],
    correctAnswer: 1,
    explanation:
      "The point of isolation must remove ALL supply to the board. That’s a switch-disconnector upstream of the busbar — either on the board itself (if fitted) or at the parent device. Outgoing MCBs only isolate downstream loads, not the busbar you’re working on.",
  },
  {
    id: 3,
    question: 'On a TN-S installation, do you need to isolate the neutral as well as the lines?',
    options: [
      'Always',
      "BS 7671 537.2.4 lets you not isolate N where it can be reliably regarded as at earth potential — common for TN-S/TN-C-S, but isolate everything if you’re in any doubt",
      'Never',
      'Only if the customer asks',
    ],
    correctAnswer: 1,
    explanation:
      "On TN-S and most TN-C-S (PNB) systems the neutral is bonded back to the supply transformer earth and sits very close to 0 V — so 537.2.4 permits leaving it un-isolated. On TT and IT systems you MUST isolate the neutral too. When in doubt (older installs, suspected DNO neutral problem), isolate it anyway.",
  },
  {
    id: 4,
    question: 'A factory has a UPS that holds essential circuits up for 30 minutes. You isolate the relevant DB. What might still be live downstream?',
    options: [
      'Nothing — main switch off means everything’s dead',
      'Any final circuits fed from the UPS, until the UPS itself is isolated and proved dead',
      'Only the lighting',
      'Only the data circuits',
    ],
    correctAnswer: 1,
    explanation:
      "UPS-fed circuits can stay live for whatever the UPS battery time is (often 10-30 minutes, sometimes hours). You have to identify which downstream circuits are UPS-backed, isolate the UPS itself (usually a dedicated maintenance bypass switch), prove dead at the UPS output as well, and only then treat the DB as fully dead.",
  },
  {
    id: 5,
    question: 'You arrive to fault-find on an EV charger that keeps tripping. The customer wants it tested live. What’s your approach?',
    options: [
      'Test it live — that’s what fault-finding is',
      "Isolate first, do every test that can be done dead (insulation resistance, continuity, polarity), THEN if a live test is genuinely required, plan it under EAWR Reg 14",
      'Refuse the job',
      'Test live in the customer’s presence so you have a witness',
    ],
    correctAnswer: 1,
    explanation:
      "Default to dead. Most fault-finding (insulation resistance, continuity, polarity, R1+R2, Zs by calculation) can be done dead. Only if those don’t identify the fault do you escalate to a live test, with a plan, the right kit, PPE, and a permit if the site requires one. Live working is the EAWR Reg 14 exception, not the starting point.",
  },
  {
    id: 6,
    question: 'On a domestic install with a 6 kW PV system, the homeowner says ‘I’ve put the inverter into shutdown mode, you’re fine’. Are you?',
    options: [
      'Yes — the inverter handles everything',
      'No — even in shutdown, the DC side from panels to inverter is live whenever the panels see daylight. You need to operate the dedicated PV DC isolator (and AC isolator)',
      'Yes if the LED is red',
      'Only after dusk',
    ],
    correctAnswer: 1,
    explanation:
      "Inverter shutdown stops the AC export but does NOT make the DC side dead. The strings from the modules to the inverter remain live whenever the panels see light — and DC at PV string voltages (often 400-1000 V) is genuinely dangerous, with no zero-crossings to interrupt an arc. Operate the dedicated PV DC isolator AND the PV AC isolator, lock both off, prove dead.",
  },
  {
    id: 7,
    question: 'A site has a backup generator with auto-start on mains failure. You isolate the DB at the switchroom. What additional risk?',
    options: [
      'Nothing — generators don’t affect isolation',
      'When you take the mains off, the changeover may auto-start the generator and re-energise the bus from the other side. Isolate the generator output (and disable auto-start) before you start work',
      'Only diesel generators are a risk',
      'Only at night',
    ],
    correctAnswer: 1,
    explanation:
      "Auto-changeover is exactly what it sounds like — losing mains triggers the generator to start and feed the essential bus. You have to isolate AND lock off the generator output (or place the changeover into a maintenance / manual position with the generator output isolated) before the bus can be considered dead. Disable auto-start, post warning notices, brief the responsible person.",
  },
  {
    id: 8,
    question: 'Working live because ‘it’s only 230 V’ — what does the law say?',
    options: [
      '230 V is treated as low-risk and live working is allowed',
      "230 V is exactly where most UK electrical fatalities occur — EAWR Reg 14 applies the same three-test requirement regardless of voltage",
      'It’s allowed in domestic but not commercial',
      'Only on Sundays',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 14 doesn’t scale with voltage. 230 V kills more people in the UK than any other voltage. ‘It’s only 230’ is the sentence the HSE quotes back at people in court. Same three tests — unreasonable to be dead, reasonable to do live, suitable precautions — apply.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Does the procedure change at all between domestic and commercial work?",
    answer:
      "The seven steps don’t. What changes is the kind of devices you’re isolating (smaller MCBs vs switch-disconnectors), how many possible sources of supply there are (commercial sites have UPS, PV, generators, multiple incomers more often), and the paperwork (commercial often requires permits-to-work). But identify → switch off → secure → prove → test → re-prove → notice is the same on every site.",
  },
  {
    question: "How do I know if a circuit is fed from more than one source?",
    answer:
      "Read the schedule first — modern boards label the source clearly (‘fed from main switch’, ‘fed from UPS’, ‘fed from PV inverter’). On older or undocumented installs, look for clues: a separate AC isolator near a PV inverter, a UPS bypass switch in a comms cupboard, a generator changeover panel near the meter. If in doubt, ask the responsible person, and TEST every conductor combination — backfeeds show up on N-E or L-E even when L-N reads zero.",
  },
  {
    question: "Is it ever OK to isolate one phase of a three-phase circuit?",
    answer:
      "Almost never on the same installation. ‘Single-pole isolating a three-phase circuit’ — switching off one MCB on a three-phase load and treating the equipment as dead — is a textbook killer. The other two phases are still live in the contactor / motor / busbar. Isolate at a switch-disconnector that breaks all three lines simultaneously. The only common ‘single-phase isolation on a three-phase board’ situation is when a single-phase final circuit is fed from one phase only — and even then, the point of isolation must remove all live conductors from that final circuit.",
  },
  {
    question: "What’s a ‘maintenance bypass’ on a UPS and why does it matter?",
    answer:
      "A maintenance bypass switch lets you take the UPS itself out of service while keeping the downstream essential circuits energised from the mains. For safe isolation of a downstream circuit fed via UPS: put the UPS in maintenance bypass (so it’s no longer in the supply chain), then isolate at the downstream device, prove dead. For work on the UPS itself, you’ll typically isolate the input AND the bypass AND the battery — three separate sources. Big UPSes are competent-person work; don’t take this on as an apprentice.",
  },
  {
    question: "If a job genuinely needs live testing, what extra precautions does EAWR want?",
    answer:
      "Reg 14’s ‘suitable precautions’ — interpreted by HSG85 — typically means: a written work plan or permit, GS38 test kit only, insulated tools, appropriate PPE (insulating gloves, arc-rated clothing for higher fault levels), barriers to keep others away, a competent person nearby with the means to disconnect, and limiting the live exposure to the absolute minimum needed for the test. ‘Just have a quick look while it’s on’ is not a Reg 14 plan.",
  },
  {
    question: "What about three-phase motors with starter contactors and overloads?",
    answer:
      "The starter is a control device, not an isolator. Switching the starter to ‘off’ does not isolate the motor — the contactor coil drops out, but the supply is still on the contactor terminals. To work safely on the motor or the starter, isolate at the upstream switch-disconnector (which breaks all three lines), lock that off, prove dead at the motor terminals AND at the starter terminals. Some motor circuits also have a local rotary isolator within sight of the motor — use that AS WELL as the upstream isolation if the motor itself is being worked on.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 1 · Section 5 · Subsection 4"
            title="Safe isolation in different scenarios"
            description="The same seven steps adapt for the rest of the trade — three-phase distribution, sub-mains, fault-finding, PV, EV, generators, UPS. The places people get caught out are usually places where there’s a SECOND source of supply nobody mentioned."
            tone="emerald"
          />

          <TLDR
            points={[
              "Single-phase 230 V: three combinations to prove (L-N, L-E, N-E). Three-phase 400 V with N: ten combinations.",
              "Multiple supplies = multiple isolations. PV (AC and DC), EV, generators, UPS, dual incomers — each one is its own ‘point of isolation’ and each one needs locking off independently.",
              "Live working is the EAWR Reg 14 exception, not the starting point — even for fault-finding. Default to dead, exhaust dead tests first, only escalate to live with a plan.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the safe isolation procedure to a single-phase final circuit and identify the conductor combinations to prove dead.",
              "Apply the procedure to a three-phase circuit or sub-main, including the conductor combinations and the BS 7671 537.2.4 rule on isolating the neutral.",
              "Identify backfeed sources on real sites — PV inverters, EV charge points, generators, UPS, dual incomers, borrowed neutrals.",
              "Distinguish dead diagnostic tests (IR, continuity, polarity) from live diagnostic tests, and explain when escalation to live is justified under EAWR Reg 14.",
              "Recognise hazards specific to PV DC strings (no zero-crossings, sustained arcing) and to motor circuits (starter is not an isolator).",
              "Know when an installation’s isolation is competent-person work and not an apprentice job.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Single-phase final circuits</ContentEyebrow>

          <ConceptBlock
            title="The 80% case — and the one most apprentices learn first"
            plainEnglish="One MCB or RCBO at the CU, one outlet or accessory at the other end. Three conductors to test (L, N, E) and three combinations to prove."
            onSite="Bread and butter. Most days you’ll do this 5-10 times — socket changes, accessory swaps, light fittings, FCU work, fixed appliance changes."
          >
            <p>The procedure mapped onto a 230 V single-phase final circuit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify:</strong> the MCB or RCBO at the CU. Cross-check by switching off
                and confirming the load (socket, light) actually dies.
              </li>
              <li>
                <strong>Switch off, lock off:</strong> universal MCB lockout, personal padlock,
                tag, key in pocket.
              </li>
              <li>
                <strong>Prove – test – prove:</strong> at the actual point of work (the back box,
                the rose, the FCU). Three combinations: <strong>L-N</strong>,{' '}
                <strong>L-E</strong>, <strong>N-E</strong>. All three must read 0 V (or whatever
                the indicator shows for ‘dead’).
              </li>
              <li>
                <strong>Notice:</strong> ‘DO NOT OPERATE’ on the CU door, brief the customer.
              </li>
            </ul>
            <p>
              The N-E combination is the one most often skipped — and the one that catches
              borrowed neutrals. On older properties (1960s-80s) that have been part-rewired,
              borrowed neutrals are not rare. Always test N-E.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Three-phase circuits and sub-mains</ContentEyebrow>

          <ConceptBlock
            title="More conductors, more combinations, same procedure"
            plainEnglish="Three lines instead of one means more combinations to prove dead. Three-phase isolators (switch-disconnectors) break all three lines simultaneously — that’s why ‘single-pole isolating a three-phase circuit’ is a sackable mistake."
            onSite="Carry a VI rated to 690 V if you do industrial / commercial work. The 400 V band is well within most modern indicators’ range, but check before you start."
          >
            <p>
              On a 400 V three-phase circuit with neutral and earth, the conductor combinations
              you should prove dead at the point of work are:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L1-L2, L2-L3, L1-L3</strong> — the three line-line combinations.</li>
              <li><strong>L1-N, L2-N, L3-N</strong> — each line to neutral.</li>
              <li><strong>L1-E, L2-E, L3-E</strong> — each line to earth.</li>
              <li><strong>N-E</strong> — neutral to earth.</li>
            </ul>
            <p>
              Ten combinations. Sounds like a lot; takes about a minute with a half-decent
              indicator. Skip any of them and you can be working on a conductor sitting at line
              potential — particularly common on systems where one phase has been left in
              service to feed a different load via the same enclosure.
            </p>
            <p>
              <strong>Point of isolation:</strong> always a switch-disconnector capable of
              breaking ALL live conductors simultaneously. Outgoing MCBs on a board only
              isolate downstream loads — not the busbar. For sub-main work, isolate at the
              switch-disconnector on the supply side of the board you’re working on (or upstream
              if the board has no incoming switch).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 461.2 (Isolation of neutral)"
            clause="Subject to the exception of Regulation 461.2, every circuit shall be provided with a means of isolation from all live supply conductors by a linked switch or a linked circuit-breaker. Provision may be made for isolation of a group of circuits by a common means, if the service conditions allow this."
            meaning={
              <>
                In A4:2026 the neutral-isolation requirement sits in Chapter 46 (Reg 461.2), not
                Section 537 anymore. On TN-S / TN-C-S the neutral can usually be left in service
                (it’s bonded close to earth potential at the supply transformer). On TT (your own
                earth electrode) and IT (no system earth) the neutral has to be isolated too.
                When in doubt — older installs, suspected DNO neutral problem, anywhere the
                system earth is suspect — isolate the neutral as well. ‘Belt and braces’ is
                rarely wrong here.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4 Chapter 46 Regulation 461.2."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Multiple sources — PV, EV, generators, UPS</ContentEyebrow>

          <ConceptBlock
            title="If there’s more than one supply, there’s more than one isolation"
            plainEnglish="The DNO main switch isolates the DNO supply. It does NOT isolate anything else that can put voltage on the same conductors — PV inverters, EV chargers with V2G, generators, UPS, dual incomers."
            onSite="First job on any unfamiliar site: walk the supply chain. Where does the power come from? Are there inverters, generators, UPS, batteries on the wall? Each one is a separate ‘main switch’ from your point of view."
          >
            <p>The most common multi-source situations on UK installs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV (rooftop solar):</strong> a SECOND source feeding the same AC bus.
                The inverter has a dedicated AC isolator (between inverter and CU) AND a
                dedicated DC isolator (between inverter and panels). Both must be operated and
                locked off independently. The DC side is live whenever the panels see daylight —
                including diffuse light on a cloudy day.
              </li>
              <li>
                <strong>Battery storage / home batteries:</strong> often paired with PV. Same
                pattern — separate AC and DC isolators. Battery DC is dangerous in its own right
                (high discharge current, sustained arcing on DC).
              </li>
              <li>
                <strong>EV charge points (especially V2G/V2H capable):</strong> can theoretically
                export back to the AC bus. Most current UK domestic chargers don’t, but
                commercial / fleet chargers increasingly do. Isolate at the charger’s dedicated
                isolator AS WELL as at the supplying CU.
              </li>
              <li>
                <strong>Standby generators:</strong> auto-start on mains failure. Isolate the
                generator output AND disable auto-start before opening any switchgear that the
                generator can feed.
              </li>
              <li>
                <strong>UPS:</strong> holds essential circuits up for 5-30 minutes (sometimes
                longer). Use the maintenance bypass switch to take the UPS out of the supply
                chain, then isolate the downstream circuit normally. UPS internal work is
                competent-person territory, not apprentice work.
              </li>
              <li>
                <strong>Dual incomers (large commercial / industrial):</strong> a board fed
                from two transformers via a bus-tie or auto-changeover. Both incomers need
                isolating before the busbar is dead.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 537.1.5 (Isolation with multiple sources of supply)"
            clause="Where an installation is supplied from more than one source of energy, one of which requires a means of earthing independent of the means of earthing of other sources and it is necessary to provide that not more than one means of earthing is applied at any time, a switching device may be inserted in the connection between the neutral point and the means of earthing, provided that the device is: (a) a multipole, linked switching device arranged to disconnect and connect the earthing conductor for the appropriate source at substantially the same time as the related live conductors; or (b) a switching device interlocked with a multipole, linked switching device inserted in the related live conductors such that the earthing conductor for the appropriate source shall not be interrupted before the live conductors."
            meaning={
              <>
                Each source = one isolating device. Each isolation = a discrete operation. And
                the regulation specifically requires that the earthing arrangement is properly
                managed so that anyone operating ONE isolator can rely on the system being safe.
                On a domestic PV install you’ll typically see warning labels at the CU saying
                ‘DUAL SUPPLY — isolate at PV AC isolator AND PV DC isolator before working on
                the AC bus’.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5 Chapter 53 Regulation 537.1.5."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fault-finding — when ‘live’ is genuinely needed</ContentEyebrow>

          <ConceptBlock
            title="Default to dead. Exhaust dead tests first. Escalate to live only with a plan."
            plainEnglish="Most fault-finding can be done dead — insulation resistance, continuity, polarity, R1+R2, calculated Zs. Only when those fail to identify the fault do you consider live testing, and only with a written plan and the right kit."
            onSite="‘Quick look while it’s on’ is not a fault-finding strategy. Properly diagnosed faults are usually faster than guessing live, AND legal."
          >
            <p>The ladder for fault-finding:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Symptom triage</strong> — what trips, when, what was the customer doing?
                Often this alone narrows the circuit to one or two candidates.
              </li>
              <li>
                <strong>Visual inspection</strong> — burn marks, smell, loose connections,
                chewed cable in the loft. Eyes first.
              </li>
              <li>
                <strong>Dead tests</strong> — isolate the suspect circuit (full safe isolation
                procedure), then insulation resistance, continuity, polarity. About 80% of faults
                show up here.
              </li>
              <li>
                <strong>Live measurements (if dead tests are inconclusive)</strong> — under
                EAWR Reg 14: written plan, GS38 kit, insulated tools, PPE, only the minimum
                exposure needed for the measurement, ideally a competent person watching with
                the means to disconnect quickly.
              </li>
            </ol>
            <p>
              The key thing: live testing is the last step, not the first. An electrician who walks up
              to a CU, opens it and starts probing live with their multimeter is breaking
              EAWR Reg 14 — and skipping the dead tests that would have found the fault faster
              anyway.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Single-pole isolating a three-phase circuit"
            whatHappens={
              <>
                Three-phase contactor, controlling a three-phase motor. The contactor is fed from
                the busbar via three single-pole MCBs (one per phase). You want to work on the
                contactor terminals. You snap the three MCBs to off ‘one at a time, all three off
                now’, lock off… two of them, because the third lockout doesn’t fit cleanly. Tell
                yourself ‘all three are off, the lock’s on most of them, that’s fine’. The
                un-locked breaker gets nudged back on by someone closing the CU door — you’ve
                still got 230 V on one phase of the contactor.
              </>
            }
            doInstead={
              <>
                Isolate at a switch-disconnector that breaks ALL three lines in one operation.
                THAT device gets locked off. If the only available isolation is three separate
                single-pole devices (which is poor design but exists on older boards), each ONE
                gets its own lock-off, individually, and you don’t start work until all three are
                physically locked. Better still — isolate further upstream at a single
                three-phase switch.
              </>
            }
          />

          <CommonMistake
            title="Forgetting the post-test prove on the voltage indicator"
            whatHappens={
              <>
                You prove the indicator on the proving unit (good). You test L-E / L-N / N-E
                at the conductor — all three combinations read dead (good). You start work
                without re-proving the indicator on the proving unit afterwards. Two hours
                later, the indicator's internal fuse has failed silently — most likely because
                it took a hit when you tested across a borrowed neutral and didn't realise.
                The 'dead' reading you trusted at 09:30 was a 'can't indicate anything' reading
                by 09:31. Every conductor you worked on after that point you treated as dead
                with no working indicator behind the call.
              </>
            }
            doInstead={
              <>
                Prove – test – PROVE. The post-test prove is the half of the procedure that
                people skip because the test already showed dead. That's exactly when it
                matters most — it confirms the indicator was still functional at the moment of
                the test, not just at the start. Skip the post-test prove and you remove the
                only safety net GS38 builds in for indicator failure during the test sequence.
              </>
            }
          />

          <Scenario
            title="The shop with the PV that wasn’t on the schedule"
            situation={
              <>
                A retail unit calls you out for an intermittent fault on the lighting ring. You
                turn up, switch off the main switch on the CU, lock it off, prove dead at the
                light fitting — all three combinations read 0 V. Start work. Halfway through
                pulling a fitting down, you notice the LED indicator on a small enclosure above
                the CU door is glowing — labelled ‘PV INVERTER 4kW’.
              </>
            }
            whatToDo={
              <>
                Stop. The PV is a second source. The fact that you proved dead at the moment of
                isolation only tells you the PV wasn’t producing AT THAT INSTANT — clouds passed,
                inverter was in night mode, whatever. The moment the sun comes back, the
                inverter can re-energise the bus. Get the fitting back together, re-prove, then
                operate the dedicated PV AC isolator (it’ll be near the inverter), lock it off,
                operate the dedicated PV DC isolator at the same enclosure, lock that off too.
                Re-prove all combinations dead. Then resume work. Update the schedule and the CU
                label so the next electrician knows.
              </>
            }
            whyItMatters={
              <>
                ‘Proved dead’ is a moment-in-time test. With a generator on the system (PV,
                battery, UPS, standby genset), a circuit can become live again at any point
                after you proved it dead. Hence the rule: each source gets its own isolation,
                each isolation gets locked off, the SET is what makes the bus dead.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What’s NOT an apprentice job</ContentEyebrow>

          <ConceptBlock
            title="Some isolations are competent-person work"
            plainEnglish="Anything where the isolation involves HV, large UPS systems, complex industrial switchgear with arc-flash risk, or supply-side meter/incomer work is not apprentice territory. Even with supervision, you’re an instructed person under EAWR Reg 16 — you assist, you observe, you don’t lead."
          >
            <p>Examples of work where the isolation itself is beyond apprentice scope:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Anything HV (above 1000 V AC) — substations, distribution transformers, feeders.
                Specific HV authorisation required.
              </li>
              <li>
                Pulling DNO seals or working on the supply side of the meter — that’s the DNO’s
                or the supplier’s job, not yours.
              </li>
              <li>
                Large UPS systems with battery isolation (battery banks at 400+ V DC carry their
                own arc and burn risks).
              </li>
              <li>
                Industrial switchboards with high prospective fault currents — arc-flash PPE and
                competence required.
              </li>
              <li>
                Critical-environment work (data centres, hospital theatres, chemical plant) where
                the permit-to-work system is the actual control and the procedure is heavily
                customised.
              </li>
            </ul>
            <p>
              EAWR Reg 16 (technical knowledge or experience) is the regulation behind this.
              You can ASSIST a competent person on this work — you can’t LEAD it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Same seven steps, different scenarios. The procedure scales; the conductor count and number of sources changes.",
              "Single-phase 230 V: three combinations to prove (L-N, L-E, N-E). Three-phase 400 V with N: ten combinations.",
              "Multiple supplies = multiple isolations. PV (AC + DC), EV, generators, UPS, dual incomers — each is its own ‘main switch’ from your perspective.",
              "BS 7671 537.2.4: TN-S/TN-C-S can usually skip neutral isolation; TT and IT must isolate the neutral. When in doubt, isolate it.",
              "Single-pole isolating a three-phase circuit is a textbook fatal mistake. Use switch-disconnectors that break all live conductors together.",
              "Live working is the EAWR Reg 14 exception, not the default. Even fault-finding starts with dead tests; live tests escalate only with a plan.",
            ]}
          />

          <Quiz title="Safe isolation in different scenarios knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lock-off, tag-out and prove–test–prove
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                When safe isolation goes wrong
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
