/**
 * Module 4 · Section 1 · Subsection 5 — Test instruments overview
 * SUPPLEMENTARY content — sets up the LO6 deep-dive subs to come (continuity,
 * insulation resistance, polarity, RCD, ring final). No direct AC tag.
 *
 * Frame: the family of test instruments an electrician carries — multimeter,
 * MFT, clamp meter, proving unit + voltage tester, insulation tester, socket
 * tester. Apprentice-grade brand realism (Fluke 117, Megger MFT1741, Kewtech
 * KT64+, Martindale VI-13800 + GVD2, Fluke 376FC). GS38 finger guards and
 * BS 7671 612 cross-references for what comes next.
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

const TITLE =
  'Test instruments overview (supplementary) | Level 2 Module 4.1.5 | Elec-Mate';
const DESCRIPTION =
  'The test instruments an electrician carries — multimeter, MFT, clamp meter, proving unit + voltage tester, insulation tester, socket tester. What each does, the GS38 finger-guard requirement, calibration intervals, and how this primes the LO6 inspect / test deep dives in §5 and §6.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod4-s1-sub5-safe-isolation',
    question:
      "You're about to work on a domestic CU. The supervisor reminds you to follow the JIB safe isolation procedure. Which test instrument(s) confirm the circuit is dead before you touch it?",
    options: [
      "A neon screwdriver — the bulb lights when the tip touches a live conductor and stays dark when the circuit is dead, giving an instant single-handed check at the terminal.",
      "A GS38-compliant two-pole voltage tester paired with an associated proving unit, proving the tester both before and after the dead test.",
      "A multimeter set to AC volts — sweep each conductor against earth and against each other; a reading near zero on every combination confirms the circuit is dead before you touch it.",
      "A socket tester plugged into the nearest outlet — if all three LEDs stay off, the circuit feeding that socket is isolated and safe to work on.",
    ],
    correctIndex: 1,
    explanation:
      "Safe isolation is a three-step proving routine — prove the tester on a known live source (or the proving unit), test the circuit (should read dead), prove the tester again on the known live source / proving unit. A two-pole voltage tester with an associated proving unit is the standard kit for this. HSE GS38 'Electrical test equipment for use on low-voltage electrical systems' sets the requirements. Multimeters and neon screwdrivers don't meet the GS38 standard and should never be used to prove dead.",
  },
  {
    id: 'mod4-s1-sub5-mft',
    question:
      "What is a Multifunction Tester (MFT) and what's the apprentice-grade brand realism?",
    options: [
      "An MFT is a high-accuracy multimeter with extra current ranges — it reads volts, amps and ohms to laboratory precision but does not perform the dedicated installation tests. Typical kit: Fluke 87V, Megger AVO410.",
      "An MFT is the proving-unit-and-voltage-tester combination used for safe isolation — the only instrument GS38 permits for proving dead, measuring no insulation or loop impedance. Typical kit: Martindale VI-13800, Drummond DTL10.",
      "An MFT (Multifunction Tester) is the dedicated installation-test instrument combining continuity, insulation resistance, loop impedance, RCD and earth-electrode tests in one. Typical kit: Megger MFT1741+, Fluke 1664FC.",
      "An MFT is a clamp-based current logger used for energy auditing — it clamps round a conductor to record load current over time but cannot perform any of the dead tests. Typical kit: Fluke 376FC, Megger DCM330.",
    ],
    correctIndex: 2,
    explanation:
      "MFTs are the workhorse of installation testing. They package the four-or-five separate test functions BS 7671 Chapter 64 (initial verification) and Chapter 65 (periodic inspection) require into a single instrument. Megger and Fluke dominate the UK market; Kewtech and Martindale are the budget-leaning options. All deliver the same set of tests; the differences are screen quality, auto-sequence functions, data storage and download to PC for cert generation. Sub 6.x of this Module covers the test sequences in detail.",
  },
  {
    id: 'mod4-s1-sub5-socket-tester',
    question:
      "A socket tester (the small plug-in unit with the three LEDs) shows 'wiring correct' on a domestic socket. Can you rely on it as confirmation the socket is safe?",
    options: [
      "No — socket testers are first-pass screening only; they confirm L-N-E presence and approximate polarity but miss borrowed neutrals, supply-side reversal, undersized earths and RCD trip-time failure.",
      "Yes — a 'wiring correct' result confirms line, neutral and earth are all present and in the right pin positions, which is exactly what BS 7671 requires for a socket, so it is acceptable evidence to sign off.",
      "Yes, provided the unit also has the RCD-trip test button — pressing it and seeing the supply drop proves the protective device works, which together with 'wiring correct' covers the full verification.",
      "Only if it is a metered socket tester showing the actual earth-loop figure in ohms — the three-LED type alone is unreliable, but a metered model gives a Zs reading you can record on the certificate.",
    ],
    correctIndex: 0,
    explanation:
      "Socket testers (Kewtech KT1717, Martindale CP501) are useful for rapid first-pass screening on a CU change — plug into every socket on the consumer unit, look for 'wiring correct', flag anything else for investigation. But the BS 7671 Chapter 64 verification needs proper instrument-based testing for R1+R2, IR, Zs, RCD time, polarity. Don't sign anything off based on a green socket-tester light alone.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "HSE GS38 'Electrical test equipment for use on low-voltage electrical systems' sets requirements for test probes. What are the key features of a GS38-compliant probe?",
    options: [
      "One feature only — the probe tip must be spring-loaded so it retracts into the body unless pressed firmly against a terminal; lead insulation and exposed-tip length are not part of GS38.",
      "Three features — finger guards on the probe body, a limited exposed metal tip (4 mm maximum), and insulated leads rated for the working voltage (often with in-line fuses).",
      "The probe must expose at least 19 mm of bare metal so it can reach into recessed terminals, and the leads must be coiled rather than straight so they retract out of the way during testing.",
      "The probe must be fitted with a crocodile clip at one end so it can be left attached hands-free, and the leads must be colour-coded brown and blue to match line and neutral on the circuit under test.",
    ],
    correctAnswer: 1,
    explanation:
      "GS38 (the HSE guidance note) sets the safety requirements for test probes used on energised low-voltage equipment. The three features — finger guards, limited exposed tip (4 mm max), insulated leads — together prevent shock from accidental finger contact with the metal tip and from accidental shorting between probes. Modern Fluke / Megger / Martindale leads are GS38-compliant out of the box; older or budget leads sometimes aren't and must be replaced.",
  },
  {
    id: 2,
    question:
      "What's the difference between a multimeter and an MFT (Multifunction Tester)?",
    options: [
      "There is no real difference — 'multimeter' and 'MFT' are two trade names for the same instrument; Fluke call theirs a multimeter, Megger an MFT, but both do the identical installation tests.",
      "A multimeter is the higher-spec tool — it does everything an MFT does plus oscilloscope and power-quality functions, so a good multimeter makes a separate MFT unnecessary for installation testing.",
      "A multimeter is a general-purpose fault-finding tool (volts, current, resistance, continuity); an MFT is a dedicated BS 7671 verification instrument for continuity, IR, loop impedance and RCD tests.",
      "A multimeter is the dead-test instrument and an MFT is the live-test instrument — you use the multimeter for continuity and insulation before energising, then the MFT only for loop and RCD tests after.",
    ],
    correctAnswer: 2,
    explanation:
      "Different instruments for different jobs. A multimeter (Fluke 117, Megger TPT320) is a fault-finding and equipment-test tool — what's the voltage at this terminal, is this fuse continuous, what's the current draw of this motor. An MFT (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) is an installation-test tool — does this circuit comply with BS 7671 Chapter 64. Most apprentices end up carrying both; the firm will have one or two MFTs shared across the team and each operative carries their own multimeter.",
  },
  {
    id: 3,
    question:
      "Why is calibration of test instruments mandatory for installation work, and what's the typical interval?",
    options: [
      "Calibration is a one-off factory check before the instrument leaves the maker; once an MFT has its original certificate it never needs re-calibrating unless physically damaged, with no recurring interval.",
      "Calibration is only required for instruments used on commercial or industrial installations; domestic-only testers are exempt because the voltages are lower, and where it applies the interval is five-yearly.",
      "Calibration means resetting the instrument to zero at the start of each test (nulling the leads) — done by the operative on every job, so there is no external interval and no certificate is involved.",
      "Instruments drift with age and shock, producing wrong results that fail BS 7671 verification, so annual UKAS-traceable calibration is the standard and out-of-date kit invalidates any cert it produces.",
    ],
    correctAnswer: 3,
    explanation:
      "Annual calibration with a UKAS-traceable certificate is the universal standard. Manufacturers (Megger, Fluke, Kewtech, Martindale) all offer in-house calibration services; third-party UKAS labs do too. Cost is typically £40–80 per instrument per year. The certificate goes in the firm's instrument register and is checked at every scheme audit. An EIC issued with results from an out-of-date instrument is technically invalid — and the firm has to re-test and reissue.",
  },
  {
    id: 4,
    question:
      "When using a clamp meter (Fluke 376FC, Megger DCM330) to measure load current, what's the key advantage over breaking the circuit and inserting an in-line ammeter?",
    options: [
      "You don't break the circuit — the clamp senses the magnetic field around the conductor and reads current without electrical contact, so it works on energised circuits without isolation.",
      "The clamp meter is far more accurate — clamping round the conductor eliminates the lead-resistance error an in-line ammeter introduces, so it is the preferred method when precision matters most.",
      "The clamp meter measures both line and neutral current at once when you clamp round the whole cable, giving the load and the earth-leakage figure in a single reading an in-line ammeter cannot provide.",
      "The clamp meter reads currents far higher than any in-line ammeter — site ammeters top out at about 13 A, whereas a clamp reads into the thousands of amps, which is why it is used at distribution boards.",
    ],
    correctAnswer: 0,
    explanation:
      "Clamp meters work on the principle that a current-carrying conductor produces a magnetic field around it. The clamp jaws are a magnetic core; opening them, placing them around the conductor, and closing them lets the meter sense the field strength and convert it to a current reading. No need to disconnect, no need to insert anything in-line. Standard kit for any electrician working on commercial / industrial systems where load measurement is routine.",
  },
  {
    id: 5,
    question:
      "What's a 'proving unit' (Martindale GVD2, Drummond Lite, Fluke PRV240) and why do you need one alongside a voltage tester?",
    options: [
      "A proving unit is the battery pack that powers the voltage tester — without it the tester has no internal supply, so you fit a fresh one before each isolation and it lasts about a day's testing.",
      "A small portable AC source used to verify the voltage tester works before and after the dead test — prove tester, test circuit, prove tester again — so a 'dead' reading can be trusted.",
      "A proving unit is a continuity device that confirms the test leads themselves are unbroken — you touch the probes onto its contacts and a buzzer sounds if the leads are intact, separate from any circuit check.",
      "A proving unit is the lock-off kit used during isolation — it holds the breaker open and carries the warning tag, so the circuit cannot be re-energised while you prove the tester on the dead conductors.",
    ],
    correctAnswer: 1,
    explanation:
      "The proving unit is the second leg of safe isolation. Voltage testers can fail (battery flat, internal fault, broken probe) and a faulty tester can read 'dead' on a live circuit — that's how electricians get killed. The proving unit removes the doubt: prove the tester works, test the circuit, prove the tester still works. If the tester proved at both ends, the 'dead' reading is trustworthy. Standard kit pairs Martindale VI-13800 + GVD2 or Drummond DTL10 + Lite; both packages cost about £100 and are mandatory for any apprentice working on energised circuits.",
  },
  {
    id: 6,
    question:
      "BS 7671 Chapter 64 requires initial verification of a new installation. Which test functions on an MFT are used during the dead-test sequence?",
    options: [
      "Two dead-test functions only: insulation resistance at 500 V DC and earth fault loop impedance (Zs). Continuity and polarity are live tests done after energising, so they are not part of the dead sequence.",
      "Three dead-test functions: RCD operating time, prospective fault current and loop impedance (Ze) — all measured with the supply on but the load off. Continuity and insulation are done with a multimeter.",
      "Four dead-test functions — continuity (R1+R2 / R2), insulation resistance at 500 V DC, polarity from origin to accessory, and earth electrode resistance where a TT system or electrode is used.",
      "One dead-test function only: insulation resistance at 500 V DC across the whole installation. Everything else — continuity, polarity, earth electrode resistance — is verified by inspection, not by an MFT.",
    ],
    correctAnswer: 2,
    explanation:
      "Chapter 64 splits into dead tests (done before energising — continuity, IR, polarity, earth electrode resistance) and live tests (done after energising — earth fault loop impedance, RCD operation, prospective fault current). The MFT does all of them on a single instrument. Sub 6.x of this Module unpacks the test sequence in detail; this Sub is the orientation showing where each instrument fits.",
  },
  {
    id: 7,
    question:
      "Why do most modern test instruments now include data storage and download to PC?",
    options: [
      "To extend battery life — storing readings means the screen can be switched off between tests, so a single charge lasts a full week of testing instead of a single day.",
      "Because BS 7671 now requires every test result to be encrypted at the point of measurement; an instrument without onboard storage and PC download cannot meet the data-security clause for certification.",
      "So the instrument can compare today's readings against the manufacturer's database over the internet and automatically tell you pass or fail — without the link the MFT cannot decide whether a reading complies.",
      "Auditability and cert generation — readings stored against a circuit ID and timestamp give tamper-evident evidence, and download straight into cert software to auto-fill the schedule.",
    ],
    correctAnswer: 3,
    explanation:
      "Data storage and PC download are now standard on mid-range and above MFTs. The benefit isn't just convenience — it's evidence integrity. A handwritten test schedule can be challenged; an MFT log download with timestamps and circuit IDs is much harder to dispute. NICEIC's PartnerNet and most modern cert platforms (including Elec-Mate's own EIC / EICR forms) accept direct uploads from common MFTs.",
  },
  {
    id: 8,
    question:
      "Which is the right instrument for each of these tasks? (1) Confirming a circuit is dead before working on it. (2) Measuring the current draw of a motor. (3) Verifying R1+R2 on a ring final. (4) First-pass screening of a domestic socket.",
    options: [
      "(1) Two-pole voltage tester with proving unit. (2) Clamp meter. (3) MFT in continuity range. (4) Socket tester — first pass only, not for sign-off.",
      "(1) Socket tester. (2) MFT in current range. (3) Multimeter on resistance. (4) Two-pole voltage tester. Each of the four tasks is covered by whichever instrument is nearest to hand.",
      "(1) Multimeter on AC volts. (2) MFT in loop-impedance range. (3) Clamp meter. (4) Proving unit. The same four instruments cover all electrical work, just selected in a different order for each task.",
      "(1) Clamp meter. (2) Socket tester. (3) Two-pole voltage tester. (4) MFT in insulation range. Any of these instruments will do any of the four jobs, so the choice comes down to which is calibrated.",
    ],
    correctAnswer: 0,
    explanation:
      "Right tool for the right test. Voltage tester + proving unit for safe isolation (the only safe combination). Clamp meter for non-invasive current measurement. MFT for BS 7671 verification tests. Socket tester for first-pass screening only. A typical apprentice's instrument loadout grows as they progress — multimeter and proving kit in year 1; MFT and clamp meter borrowed from the firm during testing work; their own MFT around year 2–3 once they're doing test sign-off independently.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Do I need to buy my own MFT, or does the firm provide one?",
    answer:
      "Most firms provide MFTs as shared kit, especially for first-year apprentices. As you progress and start doing test sign-off independently you'll likely buy your own — Megger MFT1741+ or Fluke 1664FC are the apprentice-friendly options at around £700–900 new. The firm's MFT will have the firm's calibration cycle and instrument-register entry; if you buy your own you take on those responsibilities yourself. Most apprentices wait until year 2 or 3 before investing in their own.",
  },
  {
    question: "What's the difference between a Megger and a Fluke MFT — does it matter which one I learn on?",
    answer:
      "Functionally they do the same set of BS 7671 verification tests. Differences are user interface, screen quality, auto-sequence shortcuts, and how data downloads to PC software. Megger MFT1741+ has the larger UK installer-base (especially in NICEIC contractor land) and the most familiar layout for ex-Megger users. Fluke 1664FC has a brighter screen and slightly faster auto-sequence but a higher price. Kewtech KT64+ is the budget choice — cheaper but fewer features. Learn on whatever your firm has; the test sequence is the same regardless of brand.",
  },
  {
    question: "Why can't I use my multimeter to prove a circuit dead instead of a voltage tester?",
    answer:
      "Three reasons. (1) GS38 — multimeter probes typically don't meet GS38 finger-guard and exposed-tip requirements; voltage tester probes are designed to. (2) High-impedance reading — multimeters on the volts range have very high input impedance and can show 'phantom' voltages from capacitive coupling on disconnected circuits, giving you a false LIVE reading. (3) No proving sequence — a multimeter doesn't have a paired proving unit, so you can't reliably prove the tester is functioning before and after the test. Voltage testers (Martindale VI-13800, Drummond DTL10) are designed specifically for safe-isolation use.",
  },
  {
    question: "My socket tester says 'wiring correct' — can I sign off the EIC?",
    answer:
      "No. Socket testers are first-pass screening only — they confirm L, N and E are present and in roughly the right positions but they don't detect borrowed neutrals, reversed polarity at the origin, undersized or shared protective conductors, high-impedance earths, or RCD failure to trip within the required time. The BS 7671 Chapter 61 verification needs MFT-based testing for R1+R2, IR, Zs, RCD operating time and polarity at every accessory. Use the socket tester as a first sweep; complete the full verification with the MFT before signing.",
  },
  {
    question: "What's a 'CAT rating' on a multimeter and why does it matter?",
    answer:
      "CAT (Category) ratings classify the instrument by where in the electrical system it's safe to use. CAT II — appliances, plug-in equipment (300 V typical). CAT III — distribution boards, fixed installations (600 V typical). CAT IV — supply origin, primary side (1000 V typical). The number after CAT is the maximum transient voltage the instrument can survive at that location. Using a CAT II instrument at a CAT IV location (e.g. measuring at the cut-out / DNO equipment) risks the instrument exploding. Apprentice-grade kit — Fluke 117 is CAT III 600 V / CAT IV 300 V; Megger TPT320 is CAT IV 600 V / CAT III 1000 V. Match the rating to the location.",
  },
  {
    question: "Where does this Sub fit in the bigger picture of LO6?",
    answer:
      "This Sub is the orientation. LO6 (Be able to test a dead electrical installation) is unpacked across §5 (inspection) and §6 (testing) of this Module — continuity, ring final, insulation resistance, polarity, functionality, recording test results. Each one of those AC's gets its own Sub with the test-procedure detail, instrument settings, expected results, and BS 7671 612.x cross-reference. This Sub gives you the instrument vocabulary so the §5 and §6 Subs can dive into procedure without stopping to introduce each tool.",
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
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 1.5 · Supplementary"
            title="Test instruments overview"
            description="The family of test instruments an electrician carries — multimeter, MFT, clamp meter, proving unit + voltage tester, insulation tester, socket tester. What each does, the GS38 finger-guard requirement, calibration intervals, and how this primes the LO6 inspect / test deep dives in §5 and §6."
            tone="emerald"
          />

          <TLDR
            points={[
              "Six test-instrument families — multimeter, MFT, clamp meter, voltage tester (with proving unit), insulation tester, socket tester. Each engineered for a specific job; not interchangeable.",
              "HSE GS38 sets the safety requirements for test probes — finger guards, max 4 mm exposed tip, insulated leads. Modern Fluke / Megger / Martindale kit is GS38-compliant; budget kit sometimes isn't.",
              "Annual calibration with a UKAS-traceable certificate is the universal standard. NICEIC / NAPIT / ELECSA all check for in-date calibration at audit; results from an out-of-date instrument invalidate the cert.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding beyond the formal AC scope.",
              "Identify the six families of test instrument an electrician carries — multimeter, MFT (Multifunction Tester), clamp meter, voltage tester (with proving unit), insulation tester, socket tester.",
              "Match each test instrument to the task it is designed for — fault-finding (multimeter), BS 7671 verification (MFT), non-invasive current measurement (clamp meter), safe isolation (voltage tester + proving unit), first-pass screening (socket tester).",
              "Apply HSE GS38 'Electrical test equipment for use on low-voltage electrical systems' to the selection of test probes — finger guards, max 4 mm exposed tip, insulated leads.",
              "Recognise the four MFT dead-test functions used in BS 7671 Chapter 61 initial verification — continuity (R1+R2), insulation resistance, polarity, earth electrode resistance.",
              "Identify the requirement for annual UKAS-traceable calibration of test instruments and the consequence of using out-of-date instruments to demonstrate BS 7671 compliance.",
              "Recognise CAT (category) ratings on multimeters and match the rating to the location in the electrical system.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub matters</ContentEyebrow>

          <ConceptBlock
            title="Six instruments, six jobs — and the orientation for LO6"
            plainEnglish="LO6 of Unit 204 ('Be able to test a dead electrical installation') is unpacked across §5 and §6 of this Module — six AC's worth of inspection and testing detail. Before you can dive into 'how to test a ring final' you need to know which instruments do which job. This Sub is the orientation; the §5 / §6 Subs are the procedural deep dives."
            onSite="Walk into a tidy electrician's van and you'll see roughly the same six instruments, regardless of brand — multimeter on the dash, MFT in a hard case in the back, clamp meter in a pouch, proving unit + voltage tester on the work belt, sometimes a separate insulation tester for high-voltage work, socket tester in a pocket. The six families are stable; the brands vary."
          >
            <p>
              The six test-instrument families:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multimeter</strong> &mdash; general fault-finding; DC volts, AC volts, current, resistance, continuity. Apprentice-grade: Fluke 117, Megger TPT320, Martindale MM45.
              </li>
              <li>
                <strong>MFT (Multifunction Tester)</strong> &mdash; BS 7671 verification; continuity (R1+R2), IR, loop impedance (Zs / Ze / PFC), RCD time and current, earth electrode resistance. Apprentice-grade: Megger MFT1741+, Fluke 1664FC, Kewtech KT64+, Martindale ET4500.
              </li>
              <li>
                <strong>Clamp meter</strong> &mdash; non-invasive AC current measurement on energised circuits. Apprentice-grade: Fluke 376FC, Megger DCM330, Kewtech KT200.
              </li>
              <li>
                <strong>Voltage tester + proving unit</strong> &mdash; safe isolation (prove tester &rarr; test circuit &rarr; prove tester again). Apprentice-grade: Martindale VI-13800 + GVD2, Drummond DTL10 + Lite, Fluke T130 + PRV240.
              </li>
              <li>
                <strong>Insulation tester</strong> &mdash; standalone 500 V / 1000 V DC IR test (built into MFT but standalone units exist for HV work). Apprentice-grade: Megger MIT2500, Fluke 1577.
              </li>
              <li>
                <strong>Socket tester</strong> &mdash; first-pass screening of domestic sockets (L-N-E presence and approximate polarity). Apprentice-grade: Kewtech KT1717, Martindale CP501.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>HSE GS38 — test probe safety</ContentEyebrow>

          <ConceptBlock
            title="Why your test leads matter as much as the instrument"
            plainEnglish="HSE GS38 'Electrical test equipment for use on low-voltage electrical systems' sets the safety requirements for the probes and leads attached to test instruments. The instrument can be perfect; if the probes don't meet GS38 you can still get killed. Modern Fluke / Megger / Martindale kits ship with GS38-compliant leads; older or budget leads sometimes don't."
            onSite="The visible GS38 features are the finger guard (a moulded plastic flange that stops your fingers sliding down the probe shaft to the metal tip) and the limited exposed metal tip (4 mm maximum, originally 2 mm in older versions of the guidance). Pick up a probe — finger guard present, exposed tip short and neat = GS38 compliant. Bare metal back to the handle, no flange = pre-GS38 or non-compliant, replace immediately."
          >
            <p>
              The three GS38 requirements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Finger guards</strong> &mdash; moulded flange or barrier on the probe body that prevents fingers contacting the metal tip during use. Stops accidental finger-to-tip contact when reaching into a confined terminal.
              </li>
              <li>
                <strong>Limited exposed metal</strong> &mdash; the conductive tip exposes a maximum of 4 mm (older GS38 versions specified 2 mm). Limits the chance of accidental shorting between probes when working in confined spaces.
              </li>
              <li>
                <strong>Insulated leads + optional fuse</strong> &mdash; the leads themselves are insulated and rated for the working voltage (typically 1000 V CAT III / IV). Some sets include in-line fuses (HRC, typically 500 mA) that limit fault current if the probes do short.
              </li>
            </ul>
            <p>
              Modern Fluke / Megger / Martindale lead sets are GS38-compliant out of the box. If you inherit older kit, replace the leads &mdash; they&apos;re not expensive (&pound;30&ndash;50 a set) and they&apos;re the difference between a tidy test and a hospital trip.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 — Electrical test equipment for use on low-voltage electrical systems (paraphrased)"
            clause={
              <>
                &quot;Test probes and leads should be selected to be suitable for the work and the
                environment in which they are used. Probes should incorporate finger barriers or be
                shaped to guard against inadvertent hand contact with live conductors under test.
                The metal tip should expose no more than 4 mm of conductor. Leads should be
                adequately insulated, colour-coded for polarity where appropriate, and protected
                against mechanical damage. The use of fused leads is recommended where reasonably
                practicable.&quot;
              </>
            }
            meaning={
              <>
                GS38 is HSE guidance, not statute &mdash; but under PUWER Reg 4 (suitability) and
                EAWR Reg 4 (safe systems), test equipment that doesn&apos;t meet GS38 is treated
                as unsuitable for use on energised LV systems. Any incident where non-GS38 leads
                are involved gets the firm a hard time. The cost of GS38-compliant leads is small;
                the cost of a Reg 4 prosecution is not.
              </>
            }
            cite="Source: HSE Guidance Note GS38 'Electrical test equipment for use on low-voltage electrical systems' — paraphrased from hse.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Multimeter — the everyday fault-finder</ContentEyebrow>

          <ConceptBlock
            title="Fluke 117, Megger TPT320 — the apprentice-grade workhorses"
            onSite="Most apprentices end up with a Fluke 117 or a Megger TPT320 as their first multimeter — both around £200 and both genuinely good kit. Carries on the tool belt, lives in the pocket of the work bag, comes out for every voltage check, every continuity test, every motor-current measurement that doesn't need the MFT."
          >
            <p>
              Standard ranges on an apprentice-grade multimeter:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AC volts</strong> &mdash; 0&ndash;600 V or 0&ndash;1000 V auto-ranging. For voltage checks at terminals, sockets, switches.
              </li>
              <li>
                <strong>DC volts</strong> &mdash; 0&ndash;600 V or 0&ndash;1000 V auto-ranging. For battery checks, control-circuit work.
              </li>
              <li>
                <strong>Resistance / continuity</strong> &mdash; 0&ndash;40 M&Omega; auto-ranging plus an audible continuity beep below ~30 &Omega;.
              </li>
              <li>
                <strong>Diode test</strong> &mdash; checks PN junctions, useful for solid-state circuits.
              </li>
              <li>
                <strong>Current (where built in)</strong> &mdash; in-line current measurement. Some multimeters include current; others rely on a separate clamp meter.
              </li>
            </ul>
            <p>
              CAT rating on the body tells you where in the system it&apos;s safe to use. Fluke 117 is CAT III 600 V / CAT IV 300 V &mdash; safe for distribution-board work but NOT at the supply origin. For supply-side work you need CAT IV 600 V or higher (Fluke 87V or Megger TPT320 CAT IV 600V).
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.multimeter.url}
            title={videos.multimeter.title}
            channel={videos.multimeter.channel}
            duration={videos.multimeter.duration}
            topic="How to use a multimeter like a pro · Unit 204 LO1"
            caption="The Engineering Mindset walks the everyday multimeter functions an electrician relies on — AC/DC volts, continuity beep, resistance, current — and the CAT rating logic that decides where on the system you can safely use the meter."
          />

          <SectionRule />

          <ContentEyebrow>MFT — the BS 7671 verification tool</ContentEyebrow>

          <ConceptBlock
            title="The dedicated installation-test instrument"
            plainEnglish="An MFT (Multifunction Tester) is the dedicated tool for BS 7671 Chapter 61 (initial verification) and Chapter 62 (periodic inspection). It packages the four-or-five separate test functions those chapters require into a single instrument. Apprentices typically meet MFTs from year 1 onwards as they shadow seniors on test work."
            onSite="The big four UK MFT brands are Megger, Fluke, Kewtech and Martindale. All do the same set of tests. The Megger MFT1741+ is probably the most common in NICEIC contractor land; Fluke 1664FC has a brighter screen and slightly faster auto-sequence; Kewtech KT64+ is the budget choice; Martindale ET4500 sits in the middle. Whichever your firm has, the test sequence is the same."
          >
            <p>
              The standard MFT functions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity (low-resistance ohms)</strong> &mdash; 0&ndash;200 &Omega; range. Used for R1+R2 (line + protective conductor end-to-end), R2 (protective conductor only), and bonding tail continuity.
              </li>
              <li>
                <strong>Insulation resistance</strong> &mdash; 250 V DC (SELV / control), 500 V DC (standard LV), 1000 V DC (over 500 V). Limit typically &gt;&nbsp;1 M&Omega; for new installations.
              </li>
              <li>
                <strong>Loop impedance (Zs / Ze / PFC)</strong> &mdash; live test, measures the phase-to-earth fault loop impedance and the prospective fault current.
              </li>
              <li>
                <strong>RCD operating time and trip current</strong> &mdash; live test, applies a controlled fault current at multiples of the rated trip and measures the operating time. Limits: 30 mA RCD must trip within 300 ms at 1&times; In and within 40 ms at 5&times; In.
              </li>
              <li>
                <strong>Earth electrode resistance</strong> &mdash; for TT systems and earth electrodes. Three-wire test at the electrode.
              </li>
            </ul>
            <p>
              All five tests in one instrument. Sub 6.x of this Module unpacks each test in detail with procedure, instrument settings, expected results, and the BS 7671 612.x cross-reference.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Voltage tester + proving unit — safe isolation</ContentEyebrow>

          <ConceptBlock
            title="Two pieces of kit that always travel together"
            onSite="Safe isolation is the routine that keeps you alive. The kit for it is a two-pole voltage tester (Martindale VI-13800, Drummond DTL10, Fluke T130) paired with a proving unit (Martindale GVD2, Drummond Lite, Fluke PRV240). Both pieces of kit always travel together — using one without the other defeats the safety logic."
          >
            <p>
              The three-step prove-dead routine:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Prove the tester on the proving unit</strong>. Touch the probes to the proving unit&apos;s terminals; the tester should read the proving voltage (typically 240 V or 110 V AC). Confirms the tester is functioning.
              </li>
              <li>
                <strong>2. Test the circuit</strong>. Touch the probes to the conductors at the point of work. Should read 0 V (or below the tester&apos;s threshold). Confirms the circuit is dead.
              </li>
              <li>
                <strong>3. Prove the tester on the proving unit again</strong>. Touch the probes to the proving unit&apos;s terminals again; should still read the proving voltage. Confirms the tester is still functioning &mdash; so the &apos;dead&apos; reading in step 2 was real, not a tester fault.
              </li>
            </ul>
            <p>
              Without step 3 you can&apos;t be sure the tester didn&apos;t fail BETWEEN step 1 and step 2 &mdash; in which case the &apos;dead&apos; reading in step 2 would be a false negative on a live circuit. That&apos;s how electricians get killed. The proving unit removes the doubt.
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

          <ContentEyebrow>Clamp meter — non-invasive current</ContentEyebrow>

          <ConceptBlock
            title="Reading load current without breaking the circuit"
            plainEnglish="A clamp meter measures AC current by sensing the magnetic field around a conductor — no electrical contact, no need to disconnect anything, no need to insert anything in-line. Open the jaws, place them around a single conductor (not the whole cable), close the jaws, read the current."
            onSite="Standard for measuring load currents on energised distribution boards, sub-mains, motor circuits and any time you need to know what's actually flowing. Modern clamp meters (Fluke 376FC, Megger DCM330) include voltage, continuity and even some IR functions — effectively a multimeter + clamp meter in one. Bluetooth versions log readings to a phone app for energy auditing."
          >
            <p>
              Two important safety notes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single conductor only</strong> &mdash; the clamp must go around ONE conductor (line OR neutral, not both). Clamping around both gives a near-zero reading because the magnetic fields cancel.
              </li>
              <li>
                <strong>CAT rating still matters</strong> &mdash; clamping around a 400 V three-phase sub-main needs a CAT IV-rated clamp; clamping at a 230 V socket-feeder is CAT III territory. Match the rating to the location.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Socket tester — first-pass only</ContentEyebrow>

          <ConceptBlock
            title="Useful for screening, never for sign-off"
            onSite="Socket testers (Kewtech KT1717, Martindale CP501) are pocket-sized plug-in units with three LEDs that show 'wiring correct' / 'no earth' / 'reverse polarity' / etc. They're useful for first-pass screening on a CU change — plug into every socket, look for green, flag anything that's not green for full investigation. They are NOT a substitute for full BS 7671 verification."
          >
            <p>
              What a socket tester does NOT detect:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Borrowed neutrals</strong> &mdash; where a circuit&apos;s neutral has been cross-connected to another circuit&apos;s neutral somewhere upstream.
              </li>
              <li>
                <strong>Reversed polarity at the supply</strong> &mdash; if L and N are swapped at the cut-out, the socket tester reads as &apos;wiring correct&apos; because it can&apos;t see beyond the consumer unit.
              </li>
              <li>
                <strong>Undersized or shared protective conductors</strong> &mdash; the tester sees earth presence but not its size, route or impedance.
              </li>
              <li>
                <strong>High-impedance earths</strong> &mdash; an earth path that exists but is too high in impedance to clear a fault in time.
              </li>
              <li>
                <strong>RCD failure to trip in time</strong> &mdash; the tester may have an RCD-trip button that confirms the RCD trips, but doesn&apos;t measure the trip TIME against BS 7671 limits.
              </li>
            </ul>
            <p>
              Use the socket tester as a first sweep. Use the MFT for the actual verification. Sign nothing based on a green light alone.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Calibration and the audit trail</ContentEyebrow>

          <ConceptBlock
            title="Annual UKAS calibration is non-negotiable"
            plainEnglish="Test instruments drift. A Megger MFT that read perfectly accurate when bought might be 5% off after a year of bouncing around in a van. A 5% error on a 100 MΩ insulation reading is 5 MΩ — not enough to fail BS 7671's 1 MΩ minimum, but enough to cause confusion on a borderline test. Annual calibration with a UKAS-traceable certificate keeps the instrument honest."
          >
            <p>
              The calibration story:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Interval</strong> &mdash; annual is the universal standard. Some firms shorten to 6-monthly for daily-use MFTs.
              </li>
              <li>
                <strong>Provider</strong> &mdash; manufacturer (Megger, Fluke, Kewtech, Martindale all offer in-house cal) or third-party UKAS-accredited lab. Cost &pound;40&ndash;80 per instrument.
              </li>
              <li>
                <strong>Certificate</strong> &mdash; UKAS-traceable, listing the instrument serial number, the tests carried out, the as-found readings, the as-left readings, and the next-due date.
              </li>
              <li>
                <strong>Register</strong> &mdash; firm keeps a register of calibrated instruments and their next-due dates. NICEIC, NAPIT and ELECSA all check this at scheme audit.
              </li>
              <li>
                <strong>Consequence of out-of-date</strong> &mdash; an EIC issued with results from an out-of-date instrument is technically invalid. The firm has to re-test (with a calibrated instrument) and reissue.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using a multimeter to prove a circuit dead"
            whatHappens={
              <>
                Apprentice grabs a Fluke multimeter from the dash, isolates a circuit, sticks the
                probes on the conductors, reads &apos;0 V&apos;. Starts work. The multimeter has a
                very high input impedance and was reading capacitive coupling from a parallel live
                circuit, NOT the absence of voltage. The apprentice then handles a conductor
                that&apos;s actually still live at supply potential. Hopefully an RCD on the
                circuit catches the fault current; not always.
              </>
            }
            doInstead={
              <>
                Use a two-pole voltage tester (Martindale VI-13800, Drummond DTL10, Fluke T130) with
                its associated proving unit. The voltage tester has the right input impedance,
                the right GS38 finger guards, the right insulated leads, and works as a pair with
                the proving unit so you can prove the tester at both ends of the test. Multimeters
                belong in fault-finding, not safe-isolation. Same lesson the senior electrician
                will teach you on day one of testing work.
              </>
            }
          />

          <CommonMistake
            title="Signing off an EIC based on a green socket-tester light"
            whatHappens={
              <>
                Apprentice plugs a Kewtech KT1717 into every socket on a domestic CU change, gets
                green &apos;wiring correct&apos; on all of them, and signs the EIC test schedule.
                Three months later the customer reports tingles when touching the metal cooker.
                Investigation shows a borrowed neutral on one of the ring-final spurs &mdash;
                socket tester didn&apos;t see it, MFT R2 / IR test would have. The cert is
                technically false; the firm faces a NICEIC re-issue and a customer complaint.
              </>
            }
            doInstead={
              <>
                Socket tester for first-pass screening only. Full BS 7671 Chapter 61 verification
                with the MFT &mdash; R1+R2 on every circuit, IR between L-N / L-E / N-E, polarity
                check at every accessory, RCD operating time at every RCD, Zs at the furthest
                point of every circuit. Fill in the test schedule from the MFT readings, not from
                a green LED. The socket tester is a useful screening tool; it&apos;s never the
                evidence basis for a sign-off.
              </>
            }
          />

          <Scenario
            title="First test job — shadow on a CU change"
            situation={
              <>
                You&apos;re shadowing the senior electrician on a domestic CU change. The new
                Hager 6 kA board is in, terminations are torqued to spec, all circuits are
                connected. Time to verify before energising. The senior electrician lays out
                their kit on the worktop &mdash; Megger MFT1741+ in a hard case, Fluke 376FC clamp
                meter, Martindale VI-13800 voltage tester + GVD2 proving unit, Kewtech KT1717
                socket tester, Fluke 117 multimeter. Walks you through which instrument does what
                at which step.
            </>
            }
            whatToDo={
              <>
                The sequence: (1) Multimeter and voltage tester both used during the
                safe-isolation routine before any test work begins (verify supply isolated, prove
                via tester + proving unit). (2) MFT runs the dead-test sequence on every new
                circuit &mdash; continuity (R1+R2, R2), insulation resistance (L-N, L-E, N-E at 500
                V DC), polarity check from origin to accessory. (3) Energise the supply. (4) MFT
                runs the live-test sequence &mdash; Ze at the origin, Zs at the furthest point of
                each circuit, RCD operating time at each RCD. (5) Clamp meter checks load currents
                on each circuit during functional testing. (6) Socket tester does a final
                first-pass sweep on every socket as a sanity check. (7) Senior electrician
                transcribes (or downloads) the readings into the EIC test schedule. Six
                instruments, one verification, fully BS 7671 Chapter 61 compliant.
              </>
            }
            whyItMatters={
              <>
                The first time you watch a full verification done properly is when the LO6
                content of this Module makes sense. The instruments in this Sub aren&apos;t
                academic &mdash; they&apos;re the kit you&apos;ll spend a third of your testing
                career holding. Knowing which one does which test BEFORE you get to the
                procedural Subs in &sect;5 / &sect;6 means those Subs can dive into procedure
                without stopping to introduce each tool. This Sub is the orientation; the deep
                dives start after.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Six test-instrument families — multimeter (fault-finding), MFT (BS 7671 verification), clamp meter (non-invasive current), voltage tester + proving unit (safe isolation), insulation tester (HV / standalone IR), socket tester (first-pass screening). Not interchangeable.",
              "HSE GS38 sets the safety requirements for test probes — finger guards, max 4 mm exposed metal tip, insulated leads. Modern Fluke / Megger / Martindale kits are GS38-compliant; older kit may not be.",
              "Safe isolation requires a TWO-POLE voltage tester paired with a PROVING UNIT. Multimeters and neon screwdrivers do NOT meet GS38 and should NEVER be used to prove dead.",
              "MFTs deliver the BS 7671 Chapter 61 verification tests in one instrument — continuity, insulation resistance, loop impedance, RCD time/current, earth electrode resistance. Megger MFT1741+ and Fluke 1664FC are the apprentice-grade defaults.",
              "Socket testers are first-pass screening only. They don't detect borrowed neutrals, reversed polarity at supply, undersized earths, high-impedance earths, or RCD trip-time failures. Sign nothing on a green light alone.",
              "Annual UKAS-traceable calibration is the universal standard. Instruments drift; calibration keeps them honest; certificates live in the firm's instrument register; out-of-date instruments invalidate any cert they're used to produce.",
              "CAT (category) ratings classify the instrument by where in the system it's safe to use. Match the rating to the location — CAT III for distribution boards, CAT IV for supply origin.",
              "This Sub is the orientation for LO6 — the procedural deep dives (continuity, ring final, IR, polarity, functionality, recording) sit in §5 and §6 of this Module.",
            ]}
          />

          <Quiz title="Test instruments knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 Cable-prep tools
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Preparing for installation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
