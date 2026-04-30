import { ArrowLeft, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'BS EN 61243-3 is the product standard for which piece of safe-isolation equipment?',
    options: [
      'Insulation resistance testers',
      'Two-pole voltage detectors (the proprietary &ldquo;test lamp&rdquo; type — the device you use to prove dead)',
      'MCB lock-off devices',
      'Padlocks',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Reg 10.1 (b) names BS EN 61243-3 explicitly as the standard for two-pole voltage detectors used in safe isolation. These are the proprietary devices designed to be applied to live conductors with shrouded probes and integral indication — and they are the device class that the JIB nine-step procedure assumes you are using to prove dead.',
  },
  {
    id: 2,
    question:
      'A multimeter on the V AC range can read voltage. Why is it not the appropriate instrument for proving dead in safe isolation?',
    options: [
      'It is too accurate',
      'A multimeter is a measuring instrument, not a voltage detector. It typically lacks shrouded GS38-compliant probes, has a high input impedance that can show induced phantom voltages on dead conductors, and has no integral test-loaded indication. BS EN 61243-3 voltage detectors are purpose-designed with low impedance to clear phantom voltages and shrouded probes for the prove-dead duty',
      'A multimeter cannot read above 230 V',
      'A multimeter requires calibration every six months',
    ],
    correctAnswer: 1,
    explanation:
      'The high input impedance of a multimeter is the killer: an induced or capacitively-coupled phantom voltage on a dead conductor can read 100 V or more on a multimeter and cause the operative to wrongly conclude the conductor is live, or — far worse — to conclude that the multimeter is faulty and the conductor is dead when in fact it is genuinely live but loaded by something. A two-pole detector to BS EN 61243-3 is designed for the prove-dead duty: shrouded probes, low impedance, integral indication.',
  },
  {
    id: 3,
    question:
      'Reg 537.2.3 sets the overvoltage category requirement for isolation devices. What does it require, and why does the same logic apply to your test leads?',
    options: [
      'Devices for isolation shall be designed for overvoltage category III or IV. The same requirement applies to test leads / probes used in safe isolation: GS38 and BS EN 61010 require CAT III or CAT IV rating depending on where in the installation you are working',
      'CAT II is sufficient everywhere',
      'CAT I for any test under 50 V',
      'Overvoltage category does not apply to test equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 537.2.3 requires isolation devices to be designed for overvoltage category III or IV. The parallel requirement for test equipment, leads and probes is in BS EN 61010 / GN3 Table 1.1: CAT III for fixed installations downstream of the consumer unit, CAT IV at or near the origin (between the building entrance and the primary distribution board). Mismatched CAT rating is one of the most common compliance failures and one of the most dangerous.',
  },
  {
    id: 4,
    question:
      'According to GS38, the maximum exposed conductor at the tip of a test probe should be:',
    options: [
      'No more than 25 mm',
      'No more than 4 mm (typically 2 mm)',
      'No more than 10 mm',
      'Whatever the manufacturer specifies',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 sets the exposed-tip limit at no more than 4 mm (typically around 2 mm). The point is to prevent inadvertent simultaneous contact between probe tip and an adjacent live part — a longer exposed tip increases the chance of bridging line-to-line or line-to-earth and creating a short-circuit at the probe. Probes with retractable shrouds or finger-guards beyond the GS38 minimum are common on modern kit.',
  },
  {
    id: 5,
    question: 'A proving unit is best described as:',
    options: [
      'A small mains-powered transformer that outputs 230 V to test indicators',
      'A purpose-built, battery-powered or self-contained device that produces a known voltage to drive the indicator&apos;s detection circuit, used to prove the indicator works immediately before and after the dead-test',
      'A live socket on a known circuit',
      'A multimeter on continuity range',
    ],
    correctAnswer: 1,
    explanation:
      'A proving unit is a self-contained device — typically battery-powered with an internal step-up — that produces a known test voltage at the indicator&apos;s rating. It is the trusted live source for the bracketing prove-test-prove. Crucially, it is not connected to the installation under test, which removes the ambiguity that proving on a nearby socket introduces. GN3 Reg 10.1 (c) names the proving unit alongside leads and probes as something to inspect before each use.',
  },
  {
    id: 6,
    question:
      'Why is a screwed-in MCB lock-off device preferred over a tie-wrap or tape across the toggle?',
    options: [
      'It looks more professional on photos',
      'It mechanically prevents the toggle from being moved to the closed position. A tie-wrap or tape is easily defeated by accident or intent and provides no positive mechanical lock against accidental closure — failing Reg 462.3 / 537.2.4&apos;s &ldquo;prevent unintentional closure&rdquo; requirement',
      'It is required by BS 7671',
      'It is the only method permitted by the manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'The duty in Reg 462.3 and Reg 537.2.4 is to prevent unintentional or inadvertent closure. A purpose-designed MCB lock-off has a captive screw or jaw that physically prevents the toggle moving and accepts a padlock through a hole — that is mechanical lock-off. Tape, tie-wraps and warning notices alone are not lock-off, they are deterrents. The padlock must be the operative&apos;s personal lock, with one key, on their person.',
  },
  {
    id: 7,
    question:
      'On a multi-operative job, three operatives need to apply lock-off to the same isolator. What is the correct device?',
    options: [
      'One padlock with three keys, distributed',
      'A multi-hasp (lockable bar with multiple holes) onto which each operative applies their own personal padlock with their own single key. The isolator remains locked until the last operative removes their lock',
      'A combination lock',
      'A single padlock with the supervisor as keyholder',
    ],
    correctAnswer: 1,
    explanation:
      'The multi-hasp is the textbook solution. Each operative carries personal accountability for their own work — they apply their own lock and tag, and they remove it only when their part of the work is complete. The chain of custody is preserved, and the isolation cannot be undone until every individual operative has signed off. One key per padlock, one operative per padlock, on their person at all times.',
  },
  {
    id: 8,
    question:
      'When does PPE for safe isolation typically need to include arc-rated clothing, insulated gloves to a defined class, and a face shield?',
    options: [
      'Whenever working on any electrical installation',
      'When working on switchgear with significant prospective fault current — typically distribution boards and switchboards above defined breaking-capacity / fault-current thresholds, where the energy released by an arc-flash event would exceed unprotected-skin tolerance. Risk-assess against the prospective fault current at the point of work',
      'Only on three-phase systems',
      'Only when proving dead on a busbar',
    ],
    correctAnswer: 1,
    explanation:
      'Arc-rated PPE is risk-driven, not blanket. The key inputs are prospective fault current (Ipf), upstream protection clearing time, and gap distance. On a domestic CU with a 16 kA breaking-capacity main switch and a fast-clearing upstream fuse, the arc energy at the operative is below the threshold where AR clothing materially helps. On a 400 V industrial switchboard with 35 kA Ipf and a 250 ms clearing time, an unprotected operative is at risk of severe burns from a fault. The competent person carries out the assessment and selects PPE accordingly, with insulating gloves to the appropriate class (BS EN 60903) for the system voltage.',
  },
  {
    id: 9,
    question:
      'The proving unit is a separate, dedicated device. Why not use the &ldquo;test on a known live socket&rdquo; method as a proving step?',
    options: [
      'Because BS 7671 prohibits it',
      'Because the &ldquo;known&rdquo; live source is rarely as known as it sounds: it could be on the same circuit you have just isolated (proving via a backfeed), it could share a borrowed neutral with the work circuit, it could trip an upstream RCD and isolate something you did not intend, and the source is at 230 V which is unnecessarily energetic for the prove. A dedicated proving unit removes every one of those failure modes',
      'Because GS38 explicitly prohibits proving on sockets',
      'Because it would void instrument calibration',
    ],
    correctAnswer: 1,
    explanation:
      'Every safe-isolation course teaches the proving unit because it removes the ambiguity. A proving unit produces a known voltage on demand from a battery, with no connection to the installation under investigation. The &ldquo;test on a nearby socket&rdquo; shortcut introduces unknowns at exactly the moment you need certainty. GN3 Reg 10.1 names the proving unit specifically.',
  },
  {
    id: 10,
    question:
      'EaWR 1989 reg 16 sets the competence floor. For routine safe isolation on a domestic final circuit, who is allowed to perform the procedure as the named operative?',
    options: [
      'Anyone with safety training',
      'Only a person with the technical knowledge or experience to prevent danger, or who is under appropriate supervision. In practice, a qualified electrician (e.g. 2365 / 2356 with 18th Edition certification, or an inspector with a recognised inspection-and-testing qualification). An apprentice can perform parts of the procedure under direct supervision but cannot be the named operative for the work',
      'Only Approved Electricians registered with NICEIC',
      'Anyone over the age of 18 with PPE',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 16 of EaWR is competence-based, not certification-based. The court asks: did this person have the knowledge or experience to prevent danger? GN3 Reg 1.2 sets the practical floor: a recognised qualification, current 18th Edition, and relevant experience for the installation type. Apprentice work under direct supervision is permitted; an apprentice acting solo as the named operative on safe isolation is a reg 16 failure.',
  },
];

const inlineChecks = [
  {
    id: 'mod2-s2-phantom-voltage',
    question:
      'A long dead T&E run sits in the same trunking as a parallel live circuit. Your multimeter reads 75 V on the L conductor. Your BS EN 61243-3 detector reads 0 V. Which is correct, and why?',
    options: [
      'The multimeter — the conductor is live and the detector is faulty.',
      "The detector — the 75 V is a capacitively-coupled phantom voltage. The detector's lower input impedance and small internal load burn off the phantom; the multimeter's 10 MΩ input impedance lets the phantom show. Treat the conductor as dead.",
      'Both — average them, the conductor is at 37.5 V.',
      'Neither — re-isolate and start over.',
    ],
    correctIndex: 1,
    explanation:
      'Phantom voltages from capacitive coupling are the textbook reason a multimeter is the wrong tool for prove-dead. A two-pole detector to BS EN 61243-3 is built with the load to clear them; a multimeter is not. GN3 Reg 10.1 (b) names BS EN 61243-3 specifically — this is why.',
  },
  {
    id: 'mod2-s2-cat-rating',
    question:
      'You are about to investigate a fault at the meter tails of a domestic intake. Your instrument is marked CAT III 1000 V / CAT IV 600 V. Your leads are marked CAT III 1000 V. Are you compliant for this point of work?',
    options: [
      'Yes — the instrument is CAT IV, that is the controlling rating.',
      'Yes — meter tails are CAT III work.',
      'No. The system rating is the lowest CAT in the chain — your CAT III leads downgrade the whole arrangement to CAT III. Meter tails are CAT IV territory (between the building entrance and the primary distribution board, per GN3 Table 1.1). You need CAT IV-rated leads.',
      'No — CAT II leads are required at the origin.',
    ],
    correctIndex: 2,
    explanation:
      'GN3 Table 1.1 puts equipment between the building entrance and the primary distribution board into CAT IV — meter tails / cut-out / origin. The CAT rating of the system is the lowest CAT in the chain, so CAT III leads on a CAT IV instrument is a CAT III system. This is one of the most common — and most dangerous — kit-selection mistakes.',
  },
  {
    id: 'mod2-s2-lockoff-mechanical',
    question:
      'You arrive at a board where the previous electrician has wrapped insulation tape around the MCB toggle and stuck a "DO NOT SWITCH" label on the cover. The MCB is in the off position. Which BS 7671 reg(s) does this fail and what do you do?',
    options: [
      'It complies — the label satisfies Reg 514.',
      'It fails Reg 462.3 and Reg 537.2.4 — both require devices to be designed or installed to prevent unintentional or inadvertent closure. Tape and a label are deterrents, not mechanical lock-off. Replace with a brand-matched MCB lock-off device + personal padlock before relying on the isolation.',
      'It fails only Reg 537.2.7 (identification).',
      'It complies in domestic premises only.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 462.3 and Reg 537.2.4 want a physical barrier to closure, not a deterrent. A purpose-designed MCB lock-off mechanically prevents the toggle moving and accepts a personal padlock. Tape can be brushed off by accident; a label changes nothing about the physics of the toggle.',
  },
  {
    id: 'mod2-s2-arc-rated-when',
    question:
      'You are quoting safe isolation across two boards in one day: a 6 kA domestic CU on TN-C-S, and a 35 kA industrial 400 V switchboard with 250 ms upstream clearing. You only own one set of arc-rated coveralls. Where do you wear them, and what duty justifies the call?',
    options: [
      'Wear them on both jobs — better safe than sorry.',
      'Wear them on the domestic CU; the industrial switchboard has a slow-clearing fuse that limits arc energy.',
      'Wear them on the industrial switchboard only. Arc-rated PPE is risk-driven against prospective fault current and clearing time — 35 kA × 250 ms is in the energy band where unprotected skin is at risk; 6 kA on a fast-clearing service fuse is not. EaWR reg 14(c) requires precautions to be "suitable" — proportionate to the risk.',
      'Wear them on neither; arc-rated PPE is only for arc-flash specialists.',
    ],
    correctIndex: 2,
    explanation:
      'EaWR reg 14(c) calls for suitable — meaning proportionate — precautions. The competent person calculates incident energy from prospective fault current, gap distance and clearing time (IEEE 1584 method), and selects PPE against that calculation. 35 kA at 250 ms on a 400 V board is a different energy class to a 6 kA domestic CU with a fast-clearing service fuse.',
  },
];

const InspectionTestingModule2Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Isolation equipment and PPE | I&T Module 2.2 | Elec-Mate',
    description:
      'BS EN 61243-3 voltage detectors, GS38 leads and probes, MCB lock-offs and multi-hasps, overvoltage category III/IV, insulating gloves to BS EN 60903 and arc-rated PPE for switchgear above defined fault-current thresholds.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2"
            title="Isolation equipment and PPE"
            description="The kit that turns the legal duty into a defensible system of work — BS EN 61243-3 voltage detectors, GS38 leads, MCB lock-offs, multi-hasps, and risk-driven PPE for the energised approach to switchgear."
            tone="yellow"
          />

          <TLDR
            points={[
              'A two-pole voltage detector to BS EN 61243-3 is the prove-dead instrument — purpose-designed with shrouded GS38 probes, integral indication and low input impedance that clears phantom voltages. A multimeter is a measuring instrument, not a voltage detector, and is the wrong tool for the duty.',
              'Test leads and probes follow HSE GS38: maximum 4 mm exposed tip (typically 2 mm), shrouded barrels, integral fusing or in-built electrical protection, finger-guards. Leads and instruments must match the overvoltage category at the point of test — CAT III for fixed-installation work, CAT IV at or near the origin.',
              'Reg 537.2.3 requires isolation devices to be designed for overvoltage category III or IV. The same logic applies to your test kit: a CAT III instrument is not appropriate at the meter tails or main intake.',
              'Lock-off is mechanical, personal, and accountable. MCB lock-off devices, padlockable hasps, retained fuses and multi-hasps are the kit. Tape, tie-wraps and verbal undertakings are not lock-off — Reg 462.3 / 537.2.4 require the device to be physically prevented from re-closing.',
              'PPE for safe isolation is graduated: GS38-compliant probes and leads on every job; insulating gloves (BS EN 60903) and an arc-rated layer for switchgear above defined fault-current and clearing-time thresholds. The competent person assesses prospective fault current and selects PPE accordingly under EaWR reg 14(c).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify a BS EN 61243-3 two-pole voltage detector and explain why it — not a multimeter — is the correct instrument for proving dead',
              'Apply GS38 requirements to leads, probes and accessories: exposed-tip length, shrouding, fusing and CAT rating',
              'Select test instruments by overvoltage category against the point of work, using GN3 Table 1.1 and Reg 537.2.3 logic',
              'Specify mechanical lock-off equipment for the device class in front of you (MCB / RCBO / fuse-switch / isolator) and explain why tape and tie-wraps fail Reg 462.3',
              'Run a multi-operative isolation using a multi-hasp and personal padlocks, with documented chain of custody',
              'Carry out a risk-driven PPE selection for the energised approach: GS38 probes, insulating gloves to BS EN 60903 class, AR clothing where prospective fault current and clearing time justify',
              'Explain the EaWR reg 16 competent-person duty and where it bites in practical kit selection',
            ]}
          />

          <ContentEyebrow>The proving instrument — BS EN 61243-3</ContentEyebrow>

          <ConceptBlock
            title="Two-pole voltage detectors vs &ldquo;test lamps&rdquo; vs multimeters"
            plainEnglish="The proper tool for proving dead is a two-pole voltage detector to BS EN 61243-3 — sometimes called a proprietary test lamp because the indication is integral to the device. A multimeter is a measuring instrument, not a voltage detector, and is the wrong class of tool for the duty."
            onSite="The visual cue: a two-pole detector has two probes joined by a fixed lead, with the indicator on the probe body itself. A multimeter has separate banana-plug leads and a display on the meter body. Different classes, different purposes."
          >
            <p>
              GN3 Reg 10.1 (b) names BS EN 61243-3 specifically as the standard for two-pole voltage
              detectors used in safe isolation. The standard sets requirements for impulse
              withstand, shrouding, indication, and the input impedance that distinguishes a voltage
              detector from a measuring instrument.
            </p>
            <p>The technical reasons a multimeter fails the prove-dead duty:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Phantom voltage (induced / capacitively coupled):</strong> a multimeter has
                a high input impedance, typically 10 MΩ. On a long cable run that is dead but runs
                parallel to live conductors, capacitive coupling induces a voltage on the dead
                conductor that the multimeter reads as 50–150 V — a phantom. A two-pole detector to
                BS EN 61243-3 has a lower input impedance and a small internal load that
                &ldquo;burns off&rdquo; the phantom, reading 0 V correctly.
              </li>
              <li>
                <strong>Integral indication:</strong> the detector lights / vibrates / beeps at the
                probe end. The operative does not have to look away from the probe contacts to read
                the result. A multimeter requires reading a remote display, which on a cluttered DB
                or in poor light invites contact errors.
              </li>
              <li>
                <strong>Shrouded GS38 probes by design:</strong> the probes are part of the device
                construction, not a separately-bought lead set that may or may not meet GS38. A BS
                EN 61243-3 detector is sold ready-compliant.
              </li>
              <li>
                <strong>Robust fault behaviour:</strong> the detector is designed for the prove-dead
                duty, including correct response if applied to a live conductor by accident.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Reg 10.1 · Safety and equipment (verbatim)"
            clause={
              <>
                Checking that the test instrumentation is made in accordance with the appropriate
                safety standards such as BS EN 61243-3 for two-pole voltage detectors and BS EN
                61010 or BS EN 61557 for instruments. Checking before each use that all leads,
                probes, accessories (including all devices such as crocodile clips used to attach to
                conductors) and instruments including the proving unit are clean, undamaged and
                functioning, also checking that isolation can be safely effected and that any locks
                or other means necessary for securing the isolation are available and functional.
              </>
            }
            meaning="Three named standards: BS EN 61243-3 for the detector, BS EN 61010 for instrument safety, BS EN 61557 for the protective-measure verification function. The proving unit is named alongside leads and probes as a check-before-use item — not an afterthought."
          />

          <ConceptBlock
            title="The proving unit — the trusted live source"
            plainEnglish="A proving unit is a self-contained, typically battery-powered device that produces a known voltage to drive the indicator's detection circuit. It is the third party in prove-test-prove: the trusted live source you bracket the dead-test against."
            onSite="A good proving unit: pocket-sized, battery-powered, with the detector contact pattern matched to the brand of detector. It is not connected to the installation under test, which removes the ambiguity that &ldquo;test on a nearby socket&rdquo; introduces."
          >
            <p>The proving unit is what makes the bracketing work. The discipline is:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Apply the detector to the proving unit. Confirm correct indication at the rated
                voltage. The detector is now &ldquo;known good&rdquo; at this exact moment.
              </li>
              <li>
                Apply the detector to every relevant conductor combination at the point of work.
                Confirm zero indication on each.
              </li>
              <li>
                Apply the detector to the proving unit a second time. Confirm correct indication
                again. The detector is &ldquo;known good&rdquo; immediately after the dead-test as
                well as before. The dead readings are now evidence.
              </li>
            </ol>
            <p>
              If step 3 fails — the detector that read zero on the conductor now reads zero on the
              proving unit too — the dead readings are unreliable. The detector failed somewhere
              between step 1 and step 3 and the conductor status is unknown. Re-isolate, replace the
              detector, and start over.
            </p>
          </ConceptBlock>

          {/* Voltage detector + proving unit diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Prove · Test · Prove — the BS EN 61243-3 detector and the proving unit
            </h4>
            <svg
              viewBox="0 0 800 420"
              className="w-full h-auto"
              role="img"
              aria-label="Schematic of a two-pole voltage detector being used in the prove-test-prove sequence. Step 1 the detector is applied to a proving unit and reads the rated voltage. Step 2 the same detector is applied to the conductor under test and reads zero. Step 3 the detector is re-applied to the proving unit and confirms the rated voltage again."
            >
              {/* Detector — central */}
              <g>
                <rect
                  x="320"
                  y="160"
                  width="160"
                  height="100"
                  rx="14"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.8"
                />
                <text
                  x="400"
                  y="186"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  TWO-POLE VOLTAGE
                </text>
                <text
                  x="400"
                  y="202"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  DETECTOR (BS EN 61243-3)
                </text>
                <text x="400" y="226" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  CAT III / CAT IV — match the
                </text>
                <text x="400" y="240" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  point of test (GN3 Table 1.1)
                </text>
                {/* Probes */}
                <line x1="345" y1="260" x2="345" y2="290" stroke="#EF4444" strokeWidth="3" />
                <line x1="455" y1="260" x2="455" y2="290" stroke="#3B82F6" strokeWidth="3" />
                {/* Probe tips — GS38 max 4 mm exposed */}
                <circle cx="345" cy="296" r="3" fill="#EF4444" />
                <circle cx="455" cy="296" r="3" fill="#3B82F6" />
                <text x="345" y="318" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                  shrouded
                </text>
                <text x="455" y="318" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                  shrouded
                </text>
              </g>

              {/* STEP 1 — Prove (left) */}
              <g>
                <rect
                  x="20"
                  y="40"
                  width="220"
                  height="120"
                  rx="10"
                  fill="rgba(34,197,94,0.08)"
                  stroke="rgba(34,197,94,0.5)"
                  strokeWidth="1.5"
                />
                <text
                  x="130"
                  y="64"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  STEP 1 — PROVE
                </text>
                <text
                  x="130"
                  y="84"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  Proving unit
                </text>
                <text
                  x="130"
                  y="104"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="14"
                  fontWeight="bold"
                >
                  reads 230 V
                </text>
                <text x="130" y="126" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  Detector confirmed working
                </text>
                <text x="130" y="142" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  on a known live source
                </text>
              </g>

              {/* Arrow from Step 1 to detector */}
              <line
                x1="240"
                y1="100"
                x2="320"
                y2="200"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
              <polygon points="320,200 314,194 318,202" fill="rgba(255,255,255,0.5)" />

              {/* STEP 2 — Test (centre below) */}
              <g>
                <rect
                  x="290"
                  y="340"
                  width="220"
                  height="70"
                  rx="10"
                  fill="rgba(239,68,68,0.08)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth="1.5"
                />
                <text
                  x="400"
                  y="362"
                  textAnchor="middle"
                  fill="#F87171"
                  fontSize="10"
                  fontWeight="bold"
                >
                  STEP 2 — TEST AT POINT OF WORK
                </text>
                <text
                  x="400"
                  y="382"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="13"
                  fontWeight="bold"
                >
                  reads 0 V on every combination
                </text>
                <text x="400" y="400" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  L-N, L-E, N-E (single phase) or full ten-combination set (three phase)
                </text>
              </g>

              {/* Probes go down to step 2 */}
              <line
                x1="345"
                y1="299"
                x2="345"
                y2="340"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <line
                x1="455"
                y1="299"
                x2="455"
                y2="340"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />

              {/* STEP 3 — Prove again (right) */}
              <g>
                <rect
                  x="560"
                  y="40"
                  width="220"
                  height="120"
                  rx="10"
                  fill="rgba(34,197,94,0.08)"
                  stroke="rgba(34,197,94,0.5)"
                  strokeWidth="1.5"
                />
                <text
                  x="670"
                  y="64"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  STEP 3 — RE-PROVE
                </text>
                <text
                  x="670"
                  y="84"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                >
                  Same proving unit
                </text>
                <text
                  x="670"
                  y="104"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="14"
                  fontWeight="bold"
                >
                  reads 230 V again
                </text>
                <text x="670" y="126" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  Detector still working
                </text>
                <text x="670" y="142" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  → dead readings now evidence
                </text>
              </g>

              {/* Arrow from detector to Step 3 */}
              <line
                x1="480"
                y1="200"
                x2="560"
                y2="100"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
              <polygon points="560,100 552,98 556,106" fill="rgba(255,255,255,0.5)" />

              {/* Caption */}
              <text x="400" y="20" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">
                If Step 3 fails (detector now also reads 0 on the proving unit), the Step 2 dead
                readings are unreliable. Re-isolate and replace the detector.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            HSE GS38 — leads, probes, and the &ldquo;exposed tip&rdquo; rule
          </ContentEyebrow>

          <ConceptBlock
            title="The four GS38 essentials"
            plainEnglish="GS38 is HSE guidance on test equipment for low-voltage systems. It sets the floor for leads, probes and accessories: shrouding, exposed-tip length, fusing or in-built electrical protection, and overvoltage category. Failing GS38 makes a reg 14(c) &lsquo;suitable precautions&rsquo; defence very hard to mount."
            onSite="GS38 is not law — it is HSE guidance. But the courts treat it as the standard of care. If your test leads do not meet GS38, your method statement does not meet reg 14(c). Treat it as mandatory."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Shrouded barrels:</strong> the probe shaft past the tip is insulated. The
                operative cannot inadvertently bridge probe-tip-to-finger to a live part.
              </li>
              <li>
                <strong>Maximum 4 mm exposed tip (typically 2 mm):</strong> only a short conducting
                tip is exposed. This prevents the tip bridging line-to-line or line-to-earth on
                closely-spaced terminals — a common cause of arc-flash incidents.
              </li>
              <li>
                <strong>Integral fusing or in-built electrical protection:</strong> for instruments
                that do not have their own protection, fused leads (typically 500 mA to 1 A for
                voltage measurement) limit the consequence of a probe slip. Some instruments have
                in-built fusing — note that &ldquo;in-built electrical protection does not extend to
                the probes and leads&rdquo; per GN3 Reg 10.1.
              </li>
              <li>
                <strong>Overvoltage category match:</strong> CAT II for plug-connected appliance
                work, CAT III for fixed-installation work downstream of the consumer unit, CAT IV at
                or near the origin (between the building entrance and the primary distribution
                board). Reg 537.2.3 sets the same logic for isolation devices: III or IV.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Table 1.1 · Overvoltage category markings (verbatim)"
            clause={
              <>
                CAT II: Equipment intended to be supplied from the building wiring. This overvoltage
                category applies to both plug-connected equipment and permanently connected
                equipment. CAT IV: As CAT III, plus equipment installed at or near the origin of the
                electricity supply to a building, between the building entrance and the primary
                distribution board (consumer unit). Such equipment may include electricity meters
                and primary overcurrent protective devices.
              </>
            }
            meaning="The CAT marking on the lead is the lowest CAT in the test arrangement. A CAT IV instrument with CAT III leads is a CAT III system. Match the highest CAT you might encounter on the job — at the meter / cut-out / origin, that is CAT IV."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lock-off equipment — mechanical, personal, accountable</ContentEyebrow>

          <ConceptBlock
            title="The lock-off device classes"
            plainEnglish="Reg 462.3 / 537.2.4 require devices to be designed or installed to prevent unintentional or inadvertent closure. Lock-off equipment is the kit that achieves it. Different device classes need different lock-off equipment."
            onSite="The principle is the same in every case: a physical barrier that prevents the device closing, plus a personal padlock that only the operative can remove. The brand of lock-off matters less than the discipline."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>MCB lock-off device:</strong> a moulded plastic insert that clamps over the
                MCB body and toggle, with a hole for a padlock. Brand-specific (single-pole and
                triple-pole versions for different MCB ranges) — the wrong brand fits poorly and
                does not satisfy &ldquo;prevent unintentional closure&rdquo;.
              </li>
              <li>
                <strong>RCBO lock-off:</strong> as MCB lock-off but matched to the RCBO body and the
                test-button location. Some manufacturers ship lock-offs as part of the product
                range.
              </li>
              <li>
                <strong>Padlockable hasp on a main switch / isolator:</strong> built-in on most
                commercial isolators. The hasp is moved to the &ldquo;open&rdquo; position only when
                the device is in the open position — closing the hasp on a closed switch is not
                lock-off.
              </li>
              <li>
                <strong>Retained fuse (BS 88 / cartridge):</strong> for fuse-switches, the operative
                removes and retains the fuse on their person. The hasp on the fuse-carrier is then
                padlocked. The fuse cannot be replaced without the operative returning. This is
                robust lock-off but it is single-operative-only — see multi-hasps below.
              </li>
              <li>
                <strong>Multi-hasp (lockable bar with multiple holes):</strong> for multi-operative
                jobs. Each operative applies their own personal padlock; the device cannot be closed
                until every padlock is removed. The hasp is removed only when no more padlocks are
                attached.
              </li>
              <li>
                <strong>Personal padlock:</strong> small, branded to the operative (name etched or
                colour-coded), single-key, key on the operative&apos;s person. Combination locks are
                inappropriate — they break the &ldquo;only the operative can remove&rdquo;
                discipline.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Multi-operative isolation — three contractors on a 400 V cabinet"
            situation="A 400 V machine-control cabinet at a packaging plant needs maintenance during a planned shutdown. Three operatives (a controls engineer, a mechanical fitter and an electrical contractor) all need access. The single isolator at the cabinet has a padlockable hasp."
            whatToDo="At isolation: open the isolator, prove dead via prove-test-prove, fit a multi-hasp through the isolator's lock hole. Each operative applies their own personal padlock with their own single key. Each tags their lock with their name, date, and the work activity. Each operative carries out their own prove-test-prove on the conductors they will work on (do not assume the previous operative's prove still stands). At completion: each operative removes only their own lock when their part of the work is signed off. The isolator stays locked until the last operative removes the last padlock. Only then is the multi-hasp removed and the isolator authorised for re-energisation under the re-energisation procedure (Section 2.6)."
            whyItMatters="The chain of personal accountability is the legal anchor. EaWR reg 14 / 16 puts the duty on each operative individually for the work they are doing. A single padlock with shared keys breaks the chain — if one operative declares their part done, the lock comes off, but the other operatives may still be working on conductors they have not personally re-proven. The multi-hasp keeps the chain intact."
          />

          <CommonMistake
            title="Using tape, cable ties or a warning label as &ldquo;lock-off&rdquo;"
            whatHappens="The MCB toggle is taped over with insulation tape and a sticker reads &ldquo;DO NOT SWITCH ON&rdquo;. A cleaner brushes past, the tape flexes, the toggle moves, the MCB closes. You are working on a conductor you proved dead twenty minutes ago and is now live. Or: a colleague genuinely thinks the breaker is off because of the label, presses the test button on an adjacent RCBO, and the toggle moves under finger pressure."
            doInstead="Reg 462.3 / 537.2.4 require devices to be designed or installed so as to prevent unintentional or inadvertent closure. Tape and labels are deterrents, not prevention. Use a purpose-designed MCB lock-off device with a padlock; remove and retain the fuse on a fuse-carrier; or open the device and apply a multi-hasp via the integral lock-hole. The mechanical barrier is the legal compliance — the label is for the avoid-confusion duty under Reg 514 / 537.2.7."
          />

          <CommonMistake
            title="Probing with bare-tip jumper leads instead of GS38 probes"
            whatHappens="A multimeter is used with old-stock test leads that have 25 mm exposed tip and no shrouding. A probe slip on a 230 V busbar causes a phase-to-phase short across two adjacent terminals — instant arc-flash, copper plasma at the operative's hand, severe burns, and the multimeter is destroyed. The investigation finds the leads were never replaced with GS38-compliant kit because they &ldquo;still worked&rdquo;."
            doInstead="GS38 sets the maximum exposed tip at no more than 4 mm (typically 2 mm), with shrouding back to the cable. Discard non-compliant leads — they are not &lsquo;cheap insurance&rsquo;, they are uninsured liability. A leads-and-probes set that meets GS38 and matches the CAT rating of the instrument is a fixed cost; an arc-flash injury is not."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PPE — graduated by risk, not by rule of thumb</ContentEyebrow>

          <ConceptBlock
            title="The PPE hierarchy for safe isolation"
            plainEnglish="Personal protective equipment for safe isolation is graduated. Probes and leads to GS38 every time. Insulating gloves to BS EN 60903 of the right class for the system voltage when there is a defined approach to live conductors. Arc-rated outer layer when prospective fault current and clearing time mean an arc-flash event would exceed unprotected-skin tolerance. Eye / face protection scaled to the same risk."
            onSite="The competent person assesses prospective fault current at the point of work, looks at the upstream protective device's clearing time, and selects PPE accordingly. Blanket rules don't work — a 6 kA domestic CU does not need the same PPE as a 35 kA industrial switchboard."
          >
            <p>The risk-driven layers, in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Layer 0 — instruments and accessories:</strong> BS EN 61243-3 detector, BS
                EN 61010 / 61557 instruments, GS38 leads and probes, proving unit. This is the base
                layer for any work, energised or not. Reg 537.2.3 / GN3 Reg 10.1.
              </li>
              <li>
                <strong>Layer 1 — insulating gloves to BS EN 60903:</strong> for the energised
                approach (probing live, working in close proximity to live exposed parts). Class 00,
                0, 1, 2, 3, 4 — class is selected against the system voltage. Class 0 is rated for
                use up to 1000 V AC. Periodic re-test (typically 6-monthly) and a visual / inflation
                check before each use.
              </li>
              <li>
                <strong>Layer 2 — arc-rated outer layer (clothing):</strong> for switchgear above
                defined fault-current / clearing-time thresholds. Arc rating (cal/cm²) selected
                against the calculated incident energy at the point of work. Risk-assess each board
                / switchboard against prospective fault current.
              </li>
              <li>
                <strong>Layer 3 — face / eye protection:</strong> safety glasses to BS EN 166 as a
                minimum on every job; arc-rated face shield where Layer 2 applies. The face shield
                is graduated like the clothing — cal/cm² rating against incident energy.
              </li>
              <li>
                <strong>Layer 4 — insulated tools:</strong> 1000 V insulated screwdrivers / pliers
                to BS EN 60900. The grip of the tool stays insulated even if the tip slips against a
                live part.
              </li>
            </ul>
            <p>
              The competent person duty under EaWR reg 16 sits on top of all of this: the operative
              must have the technical knowledge to assess the risk, select the layer set, and use
              each item correctly. PPE without competence is a false comfort.
            </p>
          </ConceptBlock>

          <Scenario
            title="When does Layer 2 (arc-rated clothing) actually bite?"
            situation="You are quoting safe isolation across two sites. Site A is a domestic refurbishment with a 16 kA breaking-capacity main switch on a TN-C-S supply, fast-clearing 100 A BS 1361 service fuse upstream. Site B is a 400 V industrial switchboard with 35 kA prospective fault current and a 250 ms upstream clearing time."
            whatToDo="Site A: prospective fault current at the operative is well below the threshold where AR clothing materially helps; the upstream fuse clears any fault in milliseconds. Layers 0, 1 (Class 0 insulating gloves for any energised approach), 3 (safety glasses) and 4 are appropriate; Layer 2 is not required by the risk profile. Site B: 35 kA at 250 ms is in the energy band where a fault arc could cause severe burns to unprotected skin. Layer 2 (arc-rated clothing rated against the calculated incident energy) plus arc-rated face shield are required for any energised approach. Get the calculation done — incident energy is calculable from prospective fault current, gap distance and clearing time, and the answer determines the cal/cm² rating you need."
            whyItMatters="EaWR reg 14(c) requires &lsquo;suitable&rsquo; precautions — proportionate to the risk. Wearing AR clothing on a domestic CU is unnecessary; not wearing it on a 35 kA switchboard is potentially fatal. The competent person carries out the assessment; the apprentice or unqualified operative does not have the knowledge to make this call alone, which is why reg 16 sits on top."
          />

          <CommonMistake
            title="Buying CAT II instruments and using them at the meter tails"
            whatHappens="A budget multimeter rated CAT II 600 V is used to investigate a meter-tail issue at the cut-out. A transient on the supply (lightning surge, switching event) propagates back to the instrument. The instrument's impulse withstand is rated for the building-wiring environment, not the origin. The instrument arcs internally, vents, and the operative receives a high-energy plasma burn at the hand."
            doInstead="The CAT marking is the highest energy environment the instrument is rated for. CAT IV at the origin (intake / meter / primary DB), CAT III in fixed installations downstream, CAT II for plug-connected equipment work. Reg 537.2.3 sets the same logic for isolation devices: III or IV. A CAT IV instrument is the safe choice if you are unsure where in the installation you might end up. The leads must match — the system rating is the lowest CAT in the chain."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The competent person duty in equipment selection</ContentEyebrow>

          <ConceptBlock
            title="EaWR reg 16 — what competence looks like in kit choices"
            plainEnglish="Reg 16 sets the legal floor: knowledge or experience to prevent danger, or proper supervision. In kit selection, that means the operative knows why a CAT III lead is wrong at a CAT IV point of work, why a multimeter is the wrong tool for prove-dead, and why a tie-wrap is not lock-off. None of these are matters of preference — they are matters of statutory competence."
            onSite="The court test is &lsquo;did the operative have the knowledge or experience to prevent danger&rsquo;. An operative who cannot articulate why their kit is appropriate for the job has, by default, failed the test."
          >
            <p>
              GN3 Reg 1.2 sets the practical evidence of competence: a recognised inspection-and-
              testing qualification, current 18th Edition, and relevant experience. GN3 Reg 4.1 ties
              this to the instruments: &ldquo;Manufacturers may provide multifunction test
              instruments to BS EN IEC 61557-10 that combine more than one, or all, of the functions
              listed&rdquo; — competence includes knowing which functions of a multifunction tester
              are appropriate for the job at hand, and which are not.
            </p>
            <p>Practical examples of the reg 16 duty in kit choice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Selecting a BS EN 61243-3 detector — not a multimeter — for prove-dead, because the
                operative knows the difference in input impedance and indication method.
              </li>
              <li>
                Matching the CAT rating of leads and instrument to the highest CAT environment
                expected on the job (CAT IV at meter tails, CAT III in fixed installation).
              </li>
              <li>
                Selecting MCB lock-off devices brand-matched to the breaker range, not generic
                tape-and-tie alternatives.
              </li>
              <li>
                Carrying out a prospective-fault-current / clearing-time assessment to decide
                whether arc-rated clothing is required for the energised approach to a switchboard,
                rather than applying the same PPE on every job.
              </li>
              <li>
                Verifying the proving unit, detector, leads and locks before each use — not at
                weekly intervals, before each use, per GN3 Reg 10.1 (c).
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Two-pole voltage detector to BS EN 61243-3 is the prove-dead instrument. A multimeter is a measuring instrument — wrong class of tool for the duty.',
              'GS38: maximum 4 mm exposed tip (typically 2 mm), shrouded barrels, fused leads or in-built electrical protection. Failing GS38 fails reg 14(c).',
              'CAT III for fixed-installation work, CAT IV at or near the origin. Reg 537.2.3 sets the same logic for isolation devices: III or IV. The system CAT rating is the lowest CAT in the chain.',
              'Proving unit is the trusted live source for prove-test-prove. Inspect before each use — leads, probes, accessories, instrument, proving unit, locks (GN3 Reg 10.1 (c)).',
              'Lock-off is mechanical, personal and accountable. MCB lock-off devices, padlockable hasps, retained fuses, multi-hasps and personal padlocks. Tape and tie-wraps are not lock-off.',
              'Multi-operative jobs use a multi-hasp — each operative applies their own personal padlock and removes only their own. Chain of custody preserved.',
              'PPE is graduated by risk: GS38 base layer always, BS EN 60903 insulating gloves for the energised approach, arc-rated clothing for switchgear above defined fault-current / clearing-time thresholds.',
              'EaWR reg 16 — competent-person duty — sits on top of every kit choice. The operative must have the knowledge to justify the kit they are using for the job at hand.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My multimeter is rated CAT III 1000 V and CAT IV 600 V. Can I use it for prove-dead?',
                answer:
                  'You can use it for measurement at those CAT ratings, but it is still a measuring instrument, not a voltage detector to BS EN 61243-3. The high input impedance means it can read phantom voltages on dead conductors and convince you the conductor is live when it is not — or, more dangerously, mask a genuine voltage that a low-impedance detector would have shown. Use the multimeter for measurement (Zs, IR, voltage values where you need a number) and use the BS EN 61243-3 detector for the prove-dead step. Different tools, different duties.',
              },
              {
                question:
                  'Do I need a separate proving unit for every detector, or can I share one across the team?',
                answer:
                  'A proving unit can be shared, but each operative must use it as part of their own prove-test-prove sequence — not assume a colleague&apos;s proving step covers their work. The proving unit is a check on the detector at the moment of use; if the detector fails between Operative A&apos;s prove and Operative B&apos;s test, only Operative B&apos;s own re-prove will catch it. In practice, many electricians carry their own pocket proving unit so the kit is always to hand.',
              },
              {
                question:
                  'My MCB lock-off does not fit the breaker exactly. It holds the toggle but rocks slightly. Is it OK?',
                answer:
                  'No — replace it. Reg 462.3 / 537.2.4 require the device to be prevented from unintentional or inadvertent closure. A lock-off that rocks is not preventing closure, it is making it difficult. Brand-matched lock-offs exist for almost every MCB range; if you are working on an unusual board, source the correct lock-off before the job rather than adapting a near-fit. The cost difference is negligible and the legal exposure of using the wrong device is significant.',
              },
              {
                question:
                  'Insulating gloves — do I really need to inflate-test them before each use?',
                answer:
                  'Yes for the energised approach. The roll-and-trap inflation test (roll the glove from the cuff to trap air, then squeeze and watch for leaks) catches pinholes, surface damage and contamination that has degraded the glove since the last formal test. BS EN 60903 gloves are formally re-tested at 6-monthly intervals (typically) but use damage between formal tests is the dominant failure mode — a tiny puncture from a screwdriver shaft or a fingernail compromises the rated voltage withstand. Sixty seconds of inflation testing has prevented countless shocks. Skipping it is a Reg 16 / GS38 failure.',
              },
              {
                question:
                  'What is the difference between BS EN 60900 insulated tools and ordinary tools with rubber handles?',
                answer:
                  'BS EN 60900 sets a 1000 V AC dielectric withstand for the entire insulated portion of the tool, with manufacturing controls on coverage, thickness and adhesion. Ordinary &ldquo;cushion-grip&rdquo; tools are not voltage-rated — the rubber is for comfort, not for insulation. Visually they can look similar; functionally they are different classes. For any energised approach, the tool must be marked &ldquo;1000 V&rdquo; with the BS EN 60900 double-triangle symbol, and the insulation must be intact (no cuts, no gouges to the metal, no melting).',
              },
              {
                question: 'Arc-rated clothing — how do I know what cal/cm² rating I need?',
                answer:
                  'It is calculated from incident energy at the point of work, which depends on prospective fault current (Ipf), the upstream device&apos;s clearing time, and the working distance from the arc source. Standard methods (IEEE 1584 is the most common) take those inputs and return an incident energy in cal/cm². Your AR clothing rating must equal or exceed that number. A typical &ldquo;everyday&rdquo; AR layer is 8 cal/cm² which covers most fixed-installation work; switchboard work with high Ipf and slow clearing can demand 25 cal/cm² or higher. Get the calculation done — guessing the rating is unsafe and wastes money.',
              },
              {
                question: 'Is it safe to keep one set of insulating gloves for emergency use only?',
                answer:
                  'Only if they are inspected, inflation-tested and within their re-test date at the moment they are picked up — not at the moment they were last put away. Gloves degrade in storage (UV, ozone, contamination). The cleanest discipline is: gloves issued to an operative, carried in a labelled pouch, inflation-tested before each use, formally re-tested per BS EN 60903 (6-monthly typical), retired at the date marked on the cuff. &ldquo;Just-in-case&rdquo; gloves in a cupboard fail this discipline.',
              },
              {
                question:
                  'Do I need a separate written PPE risk assessment for every job, or is a generic site PPE policy enough?',
                answer:
                  'EaWR reg 14(c) requires &ldquo;suitable precautions&rdquo; for the work being done. A generic policy can establish the floor (always GS38 leads, always Class 0 gloves for energised approach below 1000 V) but the prospective-fault-current / arc-flash assessment is point-of-work specific. On a domestic refurbishment the floor is usually enough. On switchgear or industrial installations, a written PPE risk assessment for the specific equipment and task is the proportionate response — and is what a tribunal expects to see after a serious incident.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Isolation equipment and PPE — Module 2.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-2/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Lock-off and tag-out procedures
              </div>
            </button>
          </div>

          <div className="hidden">
            <Lock />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule2Section2;
