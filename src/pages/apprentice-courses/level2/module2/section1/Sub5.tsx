/**
 * Module 2 · Section 1 · Sub 5 — Electrical instruments
 * Maps to City & Guilds 2365-02 / Unit 202 / LO2 / AC 2.3
 *   "identify appropriate electrical instruments for the measurement of
 *    different electrical quantities"
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

const TITLE = 'Electrical instruments | Level 2 Module 2.1.5 | Elec-Mate';
const DESCRIPTION =
  'The instruments a working spark uses — multimeter, clamp meter, insulation tester, MFT, voltage indicator — what each measures, when to pick which, and the GS38 rules that keep you alive.';

const checks = [
  {
    id: 'instr-current-pick',
    question:
      "You need to measure the running current of a 230 V single-phase pump motor without breaking the circuit. Which instrument do you reach for?",
    options: [
      'A multimeter set to current mode',
      'A clamp meter (AC current)',
      'An insulation resistance tester',
      'A voltage indicator',
    ],
    correctIndex: 1,
    explanation:
      'A clamp meter measures current by sensing the magnetic field round one conductor — no need to break the circuit. A multimeter on current mode would mean isolating, breaking the circuit, and inserting the meter in series. Risky, slow, and on a load that big the meter fuse would blow.',
  },
  {
    id: 'instr-prove-dead',
    question:
      'Which device is suitable for proving a circuit is dead before working on it?',
    options: [
      "A multimeter set to AC volts",
      'A non-contact voltage stick',
      'A two-pole voltage indicator (e.g. CAT III/IV) compliant with GS38',
      "Any of the above is fine",
    ],
    correctIndex: 2,
    explanation:
      'GS38 requires a two-pole detector with the right CAT rating, proven on a known live source before AND after use. Non-contact "stick" testers can identify live cables but should NOT be used for proving dead — they can miss certain conditions. Multimeters are not the recommended tool for proving dead.',
  },
  {
    id: 'instr-IR-test-voltage',
    question:
      'You\'re testing insulation resistance on a standard 230 V lighting circuit. What test voltage and minimum acceptance reading does BS 7671 Table 64 require?',
    options: [
      '250 V DC, minimum 0.5 MΩ',
      '500 V DC, minimum 1.0 MΩ',
      '1000 V DC, minimum 1.0 MΩ',
      '500 V AC, minimum 0.5 MΩ',
    ],
    correctIndex: 1,
    explanation:
      'For circuits up to and including 500 V (other than SELV/PELV) — which covers normal 230 V — Table 64 requires testing at 500 V DC with a minimum reading of 1.0 MΩ.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A multimeter switched to AC volts (V~) and connected across L and N at a UK socket should read approximately:',
    options: ['12 V', '110 V', '230 V', '400 V'],
    correctAnswer: 2,
    explanation:
      "230 V single-phase is the UK nominal. Real readings sit between ~216 V and ~253 V (ESQCR ±10%). Anything outside that is a supply problem.",
  },
  {
    id: 2,
    question:
      "What does 'CAT III' on a multimeter mean?",
    options: [
      'It can measure 3 phases at once',
      'It is rated for measurements on fixed installations including distribution boards',
      'It has 3 input jacks',
      'It is a category 3 fire-resistant device',
    ],
    correctAnswer: 1,
    explanation:
      'CAT III rating covers measurements on fixed installations like distribution boards. CAT IV is for the supply origin/incomer, CAT II for plug-in appliances. Use the wrong CAT rating and an internal arc-flash event becomes a real risk.',
  },
  {
    id: 3,
    question: 'Which instrument is used to measure earth fault loop impedance (Zs)?',
    options: [
      'A clamp meter',
      'A multifunction tester (MFT) on the loop impedance setting',
      'An insulation tester only',
      'A non-contact voltage indicator',
    ],
    correctAnswer: 1,
    explanation:
      'A multifunction tester (MFT) has a dedicated loop impedance test that injects a small current and measures the resulting voltage drop to calculate Zs. Standard multimeters cannot do this.',
  },
  {
    id: 4,
    question:
      'You set a multimeter to current (A) mode and connect the leads across a 230 V socket. What happens?',
    options: [
      'You get a current reading in amps',
      'The display shows 0.00',
      "The meter's internal fuse blows almost instantly because you've created a near-short across the supply",
      'Nothing — multimeters are protected',
    ],
    correctAnswer: 2,
    explanation:
      "Current mode has very low internal resistance. Putting low resistance across 230 V creates a huge fault current, which the HBC fuse inside is designed to interrupt. With no fuse / wrong CAT rating, the meter explodes.",
  },
  {
    id: 5,
    question: 'Per HSE GS38, before using a voltage indicator to prove dead you must:',
    options: [
      'Wipe the leads with cleaner',
      'Prove it on a known live source (or proving unit) BEFORE and AFTER the dead test',
      'Test the battery only',
      'Wear safety glasses (no other check needed)',
    ],
    correctAnswer: 1,
    explanation:
      'Prove the device works on a known live source before AND after the dead test. Catches faulty leads, flat batteries and damaged probes — anything that could give a false "dead" indication.',
  },
  {
    id: 6,
    question: "What's a clamp meter best at, that a normal multimeter can't easily do?",
    options: [
      'Measuring DC voltage',
      'Measuring resistance',
      'Measuring current without breaking the circuit',
      'Measuring frequency',
    ],
    correctAnswer: 2,
    explanation:
      "Clamp meters sense the magnetic field around a single conductor — clamp round it, read the current, no isolation or circuit-breaking needed. Essential for live load surveys.",
  },
  {
    id: 7,
    question:
      'Insulation resistance must NOT be measured on a live circuit because:',
    options: [
      "It will give an inaccurate reading and may damage the meter or the circuit",
      'It would make the lights flicker',
      'It is illegal',
      "There's no reason — you can do it live",
    ],
    correctAnswer: 0,
    explanation:
      'Insulation testers apply 250/500/1000 V DC and assume there is nothing else live in the circuit. Running an IR test on a live AC circuit damages the instrument, gives a meaningless reading, and can damage connected equipment.',
  },
  {
    id: 8,
    question:
      'A two-pole voltage indicator (Martindale, Drummond, Megger MTL etc.) is preferred over a multimeter for proving dead because:',
    options: [
      'It looks more professional',
      'It cannot be set to the wrong function — it only does voltage detection, with built-in current limiting per GS38',
      'It is cheaper',
      'It has more features',
    ],
    correctAnswer: 1,
    explanation:
      'Two-pole indicators are single-purpose: they detect voltage between two points with built-in current limiting and the correct CAT rating. Multimeters can be set to the wrong function (current, ohms) which is a common cause of test-equipment incidents.',
  },
];

const faqs = [
  {
    question: "What's the minimum kit list for an apprentice in their first year?",
    answer:
      "Two things, properly bought and looked after: a CAT III/IV-rated two-pole voltage indicator (Martindale VI13700 or similar), and a proving unit (Martindale PD440 or similar). Borrow the firm's MFT for testing days. Don't waste your money on a cheap eBay multimeter — it'll have wrong/missing CAT ratings and could hurt you.",
  },
  {
    question: "Multimeter or two-pole — which one for proving dead?",
    answer:
      "Two-pole, every time. Multimeters can be set to the wrong function (current, ohms) which means you might think you're reading volts when you're actually shorting the circuit through the meter. A two-pole indicator does one job — voltage detection — and can't be misset.",
  },
  {
    question: "What's the difference between a multimeter and a multifunction tester (MFT)?",
    answer:
      "A multimeter measures basic stuff: V, A (small), Ω, continuity. A multifunction tester is the bigger, more expensive box that does the BS 7671 verification suite — insulation resistance, earth fault loop impedance (Zs), prospective fault current (PFC), RCD trip times. You need an MFT to issue an EIC or EICR. Megger MFT1741+, Fluke 1664/1665, Kewtech KT64DL — all common.",
  },
  {
    question: 'Do I need a True RMS multimeter?',
    answer:
      'For modern installations — yes, basically always. True RMS reads non-sinusoidal waveforms (LED drivers, VFDs, switched-mode supplies) accurately. Average-responding meters undercount on those by up to 30%. The price difference is small and you\'ll meet non-sine loads on every job.',
  },
  {
    question: 'How often does test gear need calibrating?',
    answer:
      "Industry standard is annual calibration with a UKAS-traceable certificate. Most insurance and Part P scheme rules require it. Between calibrations, you also do site checks — a multimeter that suddenly disagrees with another meter on the same socket is telling you something. Tag the suspect one and get it back to the lab.",
  },
  {
    question: 'Why does the CAT rating matter so much?',
    answer:
      "Because of fault current. Test gear sits at the boundary between you and the supply. If a fault happens during a measurement, the energy that the meter has to absorb depends on how much current the supply can deliver at that point. CAT IV is rated for the highest fault energies (supply origin), CAT III for distribution circuits, CAT II for plug-in appliances. Using a CAT II meter on a distribution board is how meters explode in your hand.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 5"
            title="Electrical instruments"
            description="Multimeter, clamp meter, insulation tester, multifunction tester, voltage indicator — what each one measures, when to pick which, and the HSE GS38 rules that keep them (and you) safe."
            tone="emerald"
          />

          <TLDR
            points={[
              "Five core instruments: voltage indicator (prove dead), multimeter (V/A/Ω basic checks), clamp meter (live current without breaking the circuit), insulation tester (IR in MΩ), MFT (the BS 7671 verification suite — Zs, PFC, RCD).",
              "Match the instrument to the quantity AND the CAT rating to the location. CAT III for distribution, CAT IV for the supply origin.",
              "GS38 governs probes, leads and proving dead. Always prove your tester on a known live source BEFORE and AFTER. No exceptions.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the appropriate instrument for each electrical quantity (V, A, Ω, IR, Zs, RCD trip).',
              'Distinguish between a multimeter, clamp meter, insulation tester and multifunction tester (MFT).',
              'Explain the role of a two-pole voltage indicator in safe isolation and why it is preferred over a multimeter.',
              "State the CAT rating required for distribution-board work and explain why CAT rating matters.",
              'Apply the HSE GS38 prove-before / prove-after routine when proving dead.',
              'Recognise when calibration is out of date and the implications for certificate validity.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The instrument family</ContentEyebrow>

          <ConceptBlock
            title="Five tools cover almost everything a Level 2 spark does"
            plainEnglish="Each instrument is good at one or two things. Stop trying to use a multimeter for everything — it'll either give you a bad reading or get you hurt."
            onSite="On most days you'll use the voltage indicator the most (every isolation), the clamp meter often (load surveys), and the MFT on test/EICR days. The multimeter is for bench work and basic continuity. This is the start of a thread — the same multimeter, MFT, clamp meter and two-pole tester will reappear in Sub3.5 (cable temperature checks), Sub4.6 (KVL/KCL sanity checks on real circuits), Sub5.6 (when to switch to True-RMS), and Sub6.6 (RCD/AFDD verification). Keep them in mind."
          >
            <p>
              The five instruments you'll meet in your first two years and what each is FOR:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Two-pole voltage indicator</strong> — proves dead. The single most important
                tool you own. Build the habit of using it on every isolation, every time.
              </li>
              <li>
                <strong>Multimeter</strong> — handheld V / A / Ω / continuity. Bench work, basic
                checks, fault diagnosis on small loads. Not the right tool for proving dead.
              </li>
              <li>
                <strong>Clamp meter</strong> — measures current without breaking the circuit. Essential
                for load surveys, motor running currents, balancing three-phase distribution.
              </li>
              <li>
                <strong>Insulation resistance tester</strong> — applies 250/500/1000 V DC and reads
                IR in MΩ. Used dead, never live. Often built into the MFT.
              </li>
              <li>
                <strong>Multifunction tester (MFT)</strong> — the certification box. Does IR, Zs,
                PFC, RCD trip times, continuity. You need one to issue an EIC or EICR.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 — Section 13 (voltage detectors)"
            clause="Two types of voltage detector are recognised: illuminated indicators (test lamps with HBC fuses) and 2-pole detectors with independent indicating systems. Test lamps require 500 mA HBC fuse protection. 2-pole detectors have built-in current limiting. All voltage detectors must be proved before and after use."
            meaning={
              <>
                Two-pole detectors win because they're built for one job and have built-in current
                limiting. Either way, the rule is the same: prove the device works on a known live
                source (a proving unit or a known live circuit) <strong>before and after</strong>{' '}
                the dead test. Catches a flat battery, a broken probe, or a damaged lead — any of
                which could give you a false "dead" reading.
              </>
            }
            cite="Reference: HSE GS38 — Electrical test equipment for use on low voltage electrical systems (4th edition)"
          />

          <SectionRule />

          <ContentEyebrow>The two-pole voltage indicator — proving dead</ContentEyebrow>

          <ConceptBlock
            title="The single most-used instrument on the tools — and the most safety-critical"
            plainEnglish="Two probes, one job: tells you whether the circuit between them is live or dead. No function dial, no maths."
            onSite="Routine: prove on the proving unit → test the circuit → prove on the proving unit AGAIN. If the second prove fails, your dead test was meaningless and the circuit might still be live."
          >
            <p>
              A two-pole indicator (often called a "Martindale" after the most common UK brand) is
              specifically designed for proving dead. Why it's preferred over a multimeter:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single function.</strong> Can't be set to current/ohms by mistake. One job.
              </li>
              <li>
                <strong>Built-in current limiting.</strong> If something goes wrong it limits the
                fault current to safe levels per GS38.
              </li>
              <li>
                <strong>Correct CAT rating from the box</strong> (CAT III 1000 V or CAT IV 600 V on
                most modern units).
              </li>
              <li>
                <strong>Indicates BOTH visually and audibly</strong> when live — LEDs and a beeper.
                You can't miss the signal.
              </li>
              <li>
                <strong>Tip-shrouded probes with finger guards</strong> — meets the GS38 requirements
                on probe design (max 4 mm exposed tip).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 — Sections 9 / 10 (probes, leads and CAT ratings)"
            clause="Test probes, clips and leads should conform to BS EN 61010-031 or BS EN 61243-3. They must be marked with rated installation category (CAT II, III, or IV) and manufacturer identification. Probes should have finger barriers, shrouded connectors, minimum exposed metal (max 4 mm tip), HBC fuses or current limitation, and robust flexible insulated leads."
            meaning={
              <>
                CAT III for distribution board work (the typical Level 2 install). CAT IV for the
                supply origin (cut-out, meter tails). Probes must have finger barriers and a
                maximum 4 mm of exposed tip — anything longer is a shock hazard. If your kit
                doesn't meet GS38, it doesn't go on the job.
              </>
            }
            cite="Reference: HSE GS38 — Electrical test equipment for use on low voltage electrical systems (4th edition)"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The multimeter — the all-rounder</ContentEyebrow>

          <ConceptBlock
            title="V, A (small), Ω, continuity — basic measurements only"
            onSite="Use it for bench work, fault diagnosis on a dead circuit, low-current readings on appliances. Don't use it for proving dead and don't try to measure tens of amps with one — that's what the clamp meter is for."
          >
            <p>
              A digital multimeter measures voltage, current (typically up to 10 A through a fused
              input), resistance and continuity. Some add capacitance, frequency, diode testing and
              temperature.
            </p>
            <p>
              The classic multimeter incidents come from one of three things:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wrong function setting.</strong> Set to amps, leads connected across a
                voltage source = near-short circuit through the meter. HBC fuse blows in best case;
                meter explodes in worst case if CAT rating is wrong.
              </li>
              <li>
                <strong>Wrong CAT rating for the location.</strong> Cheap CAT II meter on a
                distribution board = no margin for fault energy.
              </li>
              <li>
                <strong>Damaged or non-GS38 leads.</strong> Exposed tips, frayed insulation, no
                finger barriers. Replace immediately, don't bodge.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Function settings you'll actually use"
            plainEnglish="V~ for AC volts. V⎓ for DC volts. A for amps. Ω for resistance. Beeper symbol for continuity."
          >
            <p>
              The dial markings on every multimeter follow the same conventions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V~</strong> — AC voltage (the wavy line is the universal AC symbol). Use for
                mains.
              </li>
              <li>
                <strong>V⎓ or V−</strong> — DC voltage. Batteries, control circuits, PV panel
                outputs.
              </li>
              <li>
                <strong>A~ / A⎓</strong> — current (AC or DC). Limited to ~10 A on most handhelds.
              </li>
              <li>
                <strong>Ω</strong> — resistance. Auto-ranges on modern units.
              </li>
              <li>
                <strong>Beeper / arrow-through-diode symbol</strong> — continuity. Beeps when
                resistance is below ~50 Ω, tells you a circuit is closed without needing to read the
                actual value.
              </li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.multimeter.url}
            title={videos.multimeter.title}
            channel={videos.multimeter.channel}
            duration={videos.multimeter.duration}
            topic={videos.multimeter.topic}
            caption="Multimeter walkthrough — function selection, lead placement, common pitfalls. Useful if you've never picked one up before."
          />

          <CommonMistake
            title="Setting the multimeter to AMPS, then probing across a socket"
            whatHappens={
              <>
                Current mode has near-zero internal resistance. Across a 230 V socket that's a near
                short circuit — fault current rushes through the meter, the HBC fuse blows in
                milliseconds. If the meter's CAT rating is wrong for the location, the energy
                exceeds what the case can contain and the meter can rupture in your hand.
              </>
            }
            doInstead={
              <>
                Get into the habit of glancing at the dial before EVERY connection. V~ for an AC
                socket. Always. If you've just been measuring current and switch to volts, double-
                check before plugging in. Better still, use a two-pole indicator for live testing
                where you can — no dial to mis-set.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The clamp meter — current without breaking the circuit</ContentEyebrow>

          <ConceptBlock
            title="A jaw that opens, clamps round one conductor, reads the current"
            plainEnglish="The clamp senses the magnetic field around the conductor. Bigger field = more current. No need to break the circuit and put the meter in series."
            onSite="Always clamp around ONE conductor only. Clamp round live and neutral together and the fields cancel — you'll read zero or close to it. Useful trick: that's how you find an earth leakage, by clamping all conductors of a circuit and seeing what doesn't sum to zero."
          >
            <p>
              Clamp meters come in AC-only and AC+DC (Hall-effect) flavours. For most UK domestic
              and commercial work, an AC clamp meter does the job. Typical uses:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load surveys</strong> — what's each circuit actually drawing right now?
                Useful for checking diversity assumptions and chasing nuisance trips.
              </li>
              <li>
                <strong>Motor running currents</strong> — compare against the nameplate FLC to
                catch overloaded motors.
              </li>
              <li>
                <strong>Three-phase balance checks</strong> — clamp each phase in turn at the board
                and verify the loads are roughly even.
              </li>
              <li>
                <strong>Earth leakage</strong> — clamp all conductors of a circuit (L+N, or L1+L2+L3
                for three-phase) and read the residual. Healthy circuit reads near zero; leakage
                shows up as anything significant.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Insulation tester and MFT — the certification kit</ContentEyebrow>

          <ConceptBlock
            title="Insulation resistance tester — applies a high DC voltage, reads MΩ"
            onSite="Used on a DEAD circuit only. Disconnect electronics first (switched-mode PSUs, dimmers, RCDs in some cases) — the test voltage will damage them. Standard test for 230 V circuits is 500 V DC, looking for ≥ 1 MΩ between conductors and to earth."
          >
            <p>
              An insulation resistance tester applies a known DC voltage (250 V for SELV/PELV, 500
              V for normal LV, 1000 V for above 500 V) and measures the leakage current to
              calculate insulation resistance in MΩ. The whole point: confirm that the cable
              insulation, accessory bodies and all connected gear are properly isolating live
              conductors from each other and from earth.
            </p>
            <p>
              You'll find the IR test built into every multifunction tester — most sparks don't
              carry a separate IR-only instrument unless they specialise in maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Multifunction tester (MFT) — the BS 7671 verification suite"
            plainEnglish="One box that does every test required by BS 7671 Part 6. Continuity, IR, loop impedance, prospective fault current, RCD trip time and current. You need one to issue an EIC, EICR or MWC."
          >
            <p>
              A modern MFT (Megger MFT1741+, Fluke 1664/1665, Kewtech KT64DL etc.) bundles every
              certification test into one device, with results that can be downloaded into the cert
              software. It is not optional kit — without an MFT you cannot issue an Electrical
              Installation Certificate (EIC) or Electrical Installation Condition Report (EICR).
            </p>
            <p>
              Annual UKAS-traceable calibration is the industry expectation. Out-of-cal kit
              invalidates the certificate, your insurance and your scheme membership.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 643.3.1 (insulation resistance testing)"
            clause="The insulation resistance shall be measured between live conductors; and between live conductors and the protective conductor connected to the earthing arrangement. Test voltages and minimum acceptance values are specified in Table 64 of Part 6."
            meaning={
              <>
                Translation: on every new installation or addition, the insulation resistance test
                isn't a tick-box exercise — it's a specific procedure with a defined test voltage
                and a defined minimum reading. For a normal 230 V circuit, that's 500 V DC and ≥
                1 MΩ between live conductors and between live and earth. Below that, the
                installation fails verification.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Regulation 643.3.1 and Table 64"
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Calibration and care</ContentEyebrow>

          <ConceptBlock
            title="Calibration is non-negotiable for certification kit"
            onSite="Most schemes (NICEIC, NAPIT, Stroma) audit calibration certs. Out-of-cal kit means every cert issued during the lapse can be challenged. The annual UKAS calibration is cheap insurance."
          >
            <p>
              The rule of thumb across the trade: calibrate your MFT and any instrument used to
              issue certificates annually, with a UKAS-traceable certificate. Between calibrations,
              do informal site checks — if your meter starts reading noticeably differently from a
              colleague's on the same circuit, tag it out and send it back to the lab.
            </p>
          </ConceptBlock>

          <Scenario
            title="The MFT that's three months out of calibration"
            situation={
              <>
                You're booked to do an EICR on a 1980s shop. You go to grab the firm's MFT and notice
                the calibration sticker says 'Recal due 2026-01-31'. Today is 2026-04-25. The
                calibration lapsed three months ago and nobody booked it in.
              </>
            }
            whatToDo={
              <>
                Don't use it for the EICR. Tell the supervisor — they'll need to either send the kit
                in for an emergency calibration (24-48 h turnaround at most labs), borrow a calibrated
                set from another spark, or reschedule the job. Anything you certified today on
                out-of-cal kit could be challenged later — and your scheme membership relies on you
                spotting this.
              </>
            }
            whyItMatters={
              <>
                The whole BS 7671 verification regime relies on the readings being trustworthy. If
                the kit isn't proven trustworthy via calibration, the certificate is too. Same logic
                that backs your duties under EAWR Reg 4 — using untested kit creates the same legal
                exposure as not testing at all.
              </>
            }
          />

          <Scenario
            title="Voltage normal but the lights dim — triangulating a loose neutral"
            situation={
              <>
                A customer reports the kitchen lights going dim every time the kettle or microwave
                kicks in. You arrive, switch the lights off, and probe a nearby socket: L-N reads
                245 V. Looks fine — well within the ESQCR ±10% window. But the moment the kettle
                comes on, the lights visibly dip and you can hear a slight buzz from the CU.
              </>
            }
            whatToDo={
              <>
                With the kettle running, take three readings at the suspect socket and write them
                down: <strong>L-N drops to roughly 222 V</strong> (looks low but not flagged),
                <strong> L-E stays around 245 V</strong> (the line is fine relative to true earth),
                <strong> N-E reads ~8 V</strong> — and that last reading is the smoking gun. The
                three voltages have to add up consistently: if N has lifted 8 V above earth under
                load, that's voltage being dropped across a high-resistance joint somewhere on the
                neutral path. Switch the load off and N-E falls back to near zero. Trace back from
                socket → CU neutral bar → main neutral → cut-out: retorque each connection, looking
                for a loose neutral terminal, a discoloured screw or a corroded service-head joint.
                If the fault is on the supply (DNO) side of the cut-out, it's their problem — call
                it in.
              </>
            }
            whyItMatters={
              <>
                A floating neutral is one of the most-Googled apprentice faults precisely because
                the line voltage looks normal at idle — it only misbehaves under load. Left
                unfound, the load on one circuit causes voltage to lift on every other circuit
                sharing that neutral; lights flicker, electronics fail prematurely, and on a
                three-phase install with a broken neutral you can end up with 400 V across a 230 V
                appliance. The N-E reading under load is the diagnostic — same three probes you've
                always carried, just used to triangulate where the bad joint is hiding.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Five core instruments: two-pole voltage indicator (prove dead), multimeter (basic V/A/Ω), clamp meter (live current without breaking the circuit), insulation tester (IR in MΩ, DEAD only), multifunction tester (the BS 7671 verification suite).",
              "Two-pole voltage indicators beat multimeters for proving dead — single function, built-in current limiting, GS38-compliant by design.",
              "CAT rating must match the location: CAT III for distribution boards, CAT IV for the supply origin. CAT II is for plug-in appliances only.",
              "Per HSE GS38: prove your tester on a known live source BEFORE and AFTER every dead test. No exceptions.",
              "An MFT is mandatory for certification work. UKAS-traceable annual calibration keeps you and the certs valid.",
              "Match the instrument to the quantity. Reaching for a multimeter on every job is how meters explode.",
            ]}
          />

          <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-cyan-400/40 pl-4 italic">
            <span className="not-italic font-semibold text-cyan-300 mr-1.5">You'll see this again in:</span>
            Sub3.5 (cable temperature checks with a clamp/IR camera and the multimeter), Sub4.6
            (KVL/KCL sanity checks on real circuits using the multimeter and clamp meter) and
            Sub6.6 (the MFT and two-pole indicator used to verify RCD and AFDD performance). Same
            five instruments, deeper jobs.
          </p>

          <Quiz title="Electrical instruments knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                SI prefixes and conversions
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Basic mechanics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
