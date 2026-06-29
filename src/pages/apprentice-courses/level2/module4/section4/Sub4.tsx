/**
 * Module 4 · Section 4 · Sub 4 — Test continuity
 * Maps to City & Guilds 2365-02 / Unit 204 / LO4 / AC 4.4
 *   AC 4.4 — "Test continuity"
 *
 * Frame: Reg 643.2.1 — protective conductor continuity is a mandatory
 * initial verification test. Low-resistance ohmmeter, leads nulled, reading
 * documented. < 0.05 ohm is the practical bond target.
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

const TITLE = 'Test continuity of main bonds | Level 2 Module 4.4.4 | Elec-Mate';
const DESCRIPTION =
  'Continuity testing of main protective bonding conductors per BS 7671 Reg 643.2.1 — low-resistance ohmmeter, lead null, reading recorded on the Schedule of Test Results. The test that proves the bond actually does its job.';

const checks = [
  {
    id: 'm4-s4-sub4-instrument',
    question:
      'Which instrument and range do you use to test main bonding continuity?',
    options: [
      'A standard digital multimeter on the 200 ohm resistance range with its standard probe leads.',
      'A multifunction tester or low-resistance ohmmeter on the continuity range with 200 mA test current.',
      'An insulation resistance tester on the 500 V DC range, reading across the bond conductor ends.',
      'A GS38 two-pole voltage indicator, checking for any standing voltage along the bond conductor.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Reg 643.2.1 says "by measurement of resistance" — you need an instrument that injects a controlled test current (typically 200 mA) and resolves down to milliohm range. Megger MFT1741, Fluke 1664FC, Kewtech KT64+, Metrel MI3155 are common trade choices. A standard multimeter on 200 ohm doesn\'t resolve the small differences that matter — bond readings are typically 0.01 to 0.10 ohm.',
  },
  {
    id: 'm4-s4-sub4-null',
    question:
      'You have your test leads connected to the MFT. The instrument reads 0.13 ohm before you start the test. Why?',
    options: [
      'The instrument is faulty and should be sent for calibration before any testing continues.',
      'It is the resistance of your test leads — null/zero them so later readings exclude it.',
      'The bond conductor is already connected and carrying a small leakage current that offsets the reading.',
      'The 0.13 ohm is the minimum any continuity test can display, so it is simply the instrument floor.',
    ],
    correctIndex: 1,
    explanation:
      'Test leads have their own resistance — typically 0.10 to 0.20 ohm depending on length and connector type. Every continuity reading you take includes the lead resistance plus the actual circuit you\'re testing. The null function (sometimes labelled "ZERO", "REL" or "NULL") subtracts the current reading so the displayed value is the bond resistance only. Always null before testing a new circuit.',
  },
  {
    id: 'm4-s4-sub4-isolate',
    question:
      'Before testing continuity of a main bonding conductor from the MET to a gas BS 951 clamp, you should:',
    options: [
      'Leave the entire installation connected and energised so the test reflects real operating conditions.',
      'Isolate, prove dead, then disconnect the bond at one end so the test current flows only through it.',
      'Disconnect every other bond and CPC from the MET, but leave the one under test connected at both ends.',
      'Apply the test only at the BS 951 clamp end, without touching the MET connection at the other end.',
    ],
    correctIndex: 1,
    explanation:
      'Bonding continuity should be tested with the cable disconnected at one end so the measurement is the bond conductor only — not a parallel-path measurement that includes the earthing conductor, the supply earth, other bonds, etc. Isolate first (Module 1 §3 covers safe isolation), prove dead, then disconnect the bond at the MET end (or the clamp end), test, reconnect, retest in-circuit if you want to verify the fully reconnected installation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671 Reg 643.2.1 requires continuity verification of which conductors at initial verification?',
    options: [
      'Only the line and neutral conductors of every final circuit, never the protective conductors.',
      'Protective conductors, including protective bonding conductors; and in the case of ring final circuits, live conductors.',
      'Only the main earthing conductor between the MET and the earth electrode.',
      'Only the meter tails between the supplier cut-out and the consumer unit.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.2.1 verbatim — "The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors." Bonding continuity is a mandatory initial verification test. Document the result on the Schedule of Test Results.',
  },
  {
    id: 2,
    question:
      'What is the practical "good bond" continuity reading for a main protective bonding conductor from the MET to a BS 951 clamp on a typical domestic install (10 mm² G/Y, 4-5 m run, well-terminated)?',
    options: [
      'Around 2 ohm — bonding conductors are expected to read in the low single-figure ohms.',
      'Exactly 1 ohm — BS 7671 sets a fixed 1 ohm pass figure for all main protective bonding.',
      'Below 0.05 ohm — a healthy 10 mm² bond of 4-5 m typically reads 0.02 to 0.05 ohm.',
      'Around 0.5 ohm — anything below this figure indicates the test leads were not nulled.',
    ],
    correctAnswer: 2,
    explanation:
      'Industry rule of thumb: a healthy main bond reads under 0.05 ohm. Calculation: 10 mm² Cu conductor has resistance of about 1.83 mOhm/m, so 5 m run = ~9 mOhm = 0.009 ohm. Add termination contact resistance (a few mOhm at each end) and you typically see 0.02 to 0.05 ohm on a clean install. Above 0.10 ohm suggests a problem — loose terminations, oxidised contact, undersized cable.',
  },
  {
    id: 3,
    question:
      'You "null" your MFT test leads and the instrument shows "0.00 ohm". You then probe the bonding cable from MET to gas clamp and read 0.04 ohm. What does this reading represent?',
    options: [
      'The resistance of the test leads, which the null function failed to subtract correctly.',
      'The combined resistance of the bond plus every parallel earth path in the installation.',
      'The insulation resistance between the bond conductor and the surrounding bonded metalwork.',
      'The resistance of the bond conductor and its two end terminations only.',
    ],
    correctAnswer: 3,
    explanation:
      'Null = subtract the lead resistance. Subsequent reading = circuit under test only. 0.04 ohm represents the 10 mm² Cu cable resistance plus the contact resistance at the MET terminal and the BS 951 clamp. Healthy reading. Document on the Schedule of Test Results.',
  },
  {
    id: 4,
    question:
      'You\'re testing continuity from the MET to a BS 951 clamp on the gas service, but you forgot to disconnect the bond at the MET end first. The reading is 0.001 ohm — much lower than expected. What\'s happening?',
    options: [
      'Test current is finding parallel earth paths, so the reading is all paths combined, not the bond alone.',
      'The bond conductor is oversized for the run, which artificially lowers the reading below the cable resistance.',
      'The MFT test current is too low to register the true resistance, so it reads near zero by default.',
      'The leads were nulled twice, which subtracts the lead resistance from the reading a second time.',
    ],
    correctAnswer: 0,
    explanation:
      'On a fully connected installation, fault current at the bond clamp can return via several paths: the bond under test, the earthing conductor through the MET, the supplier earth network, other bonds. The MFT sees all paths in parallel and reports a much lower combined resistance. To measure THE BOND ONLY, disconnect at one end so the test current can only flow through the bond cable.',
  },
  {
    id: 5,
    question:
      'After testing continuity successfully and reconnecting the bond, where do you record the result?',
    options: [
      'In your personal day log only — bond readings do not form part of the certification documents.',
      'On the Schedule of Test Results that accompanies the EIC, against each main bonding conductor.',
      'On the warning label fitted to the BS 951 clamp itself, written on in permanent marker pen.',
      'Only on the consumer unit circuit chart, next to the relevant final circuit it serves.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 644 requires every initial verification test result to be recorded on the test schedule that forms part of the certification. The Schedule of Test Results has a section for protective conductor continuity — record the measured value (e.g. 0.04 ohm) for each main bonding conductor, the earthing conductor, and each circuit\'s CPC. The certificate is signed declaring all values comply.',
  },
  {
    id: 6,
    question:
      'Your continuity reading from MET to water bond clamp is 0.85 ohm — much higher than expected for a 10 mm² cable on a 4 m run. What\'s the most likely fault?',
    options: [
      'The 10 mm² cable is simply too long for the run, so the resistance is normal for this length.',
      'The test leads were not nulled, adding their resistance to an otherwise healthy reading.',
      'A poor or loose termination at one end — oxidised face, screw not torqued, or damaged ferrule.',
      'The water in the pipe is raising the reading because water is a relatively poor conductor.',
    ],
    correctAnswer: 2,
    explanation:
      'A 4 m run of 10 mm² Cu has cable resistance of about 7 mOhm = 0.007 ohm. A reading of 0.85 ohm means there\'s an extra 0.84 ohm of resistance somewhere — almost certainly a contact issue at one termination. Disconnect, inspect, re-make the joint at the MET end first (most common location); if still high, check the BS 951 clamp; if still high, check for damage to the cable strands.',
  },
  {
    id: 7,
    question:
      'Which BS 7671 regulation cross-references the continuity testing of ring final circuit live conductors (the test you might perform alongside protective conductor continuity)?',
    options: [
      'Reg 411.3.2 — maximum disconnection times for final circuits under fault conditions.',
      'Reg 514.13.1 — the warning notice requirement at bonding and earthing connections.',
      'Reg 643.3.1 — insulation resistance testing of the whole completed installation.',
      'Reg 643.2.2 — ring final circuit continuity testing under the same Section 643.',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.2.2 covers ring final circuit continuity (the loop tests for r1, rn, r2 of the ring). Same family of tests under Section 643 as the protective conductor continuity in Reg 643.2.1. On an EICR or initial verification, you typically do all the continuity tests in one pass with the same MFT.',
  },
  {
    id: 8,
    question:
      'A bond reads 0.04 ohm at initial verification. Three years later at a periodic inspection (EICR) the same bond reads 1.2 ohm. What probable mechanism caused the rise?',
    options: [
      'A loose termination has oxidised over the three years — joint resistance climbs while the cable stays put.',
      'The copper conductor has corroded along its full length, raising the resistance of the cable itself.',
      'The supply voltage has changed over three years, which alters the measured continuity reading.',
      'The MFT used at the EICR was a different model, so the two readings cannot be compared at all.',
    ],
    correctAnswer: 0,
    explanation:
      'Loose termination + time + thermal cycling = oxide film growth at the contact face. Cable resistance stays put (Cu has stable conductivity); the joint resistance climbs from a few mOhm to a few hundred mOhm. Same root cause as the loose-terminal failures covered in Sub 2. Solution: open the bad termination, clean both contact faces, re-make per Sub 2 procedure, torque to spec, retest. The 1.2 ohm reading is a Code C2 finding on the EICR until rectified.',
  },
];

const faqs = [
  {
    question: 'Does BS 7671 give an absolute maximum continuity value for main bonding?',
    answer:
      'Not directly. Reg 643.2.1 says "verified by a measurement of resistance" — it requires the test but doesn\'t set a numerical limit. The trade rule of thumb is < 0.05 ohm for a typical domestic main bond; readings above 0.10 ohm warrant investigation. Where the bond is part of an earth fault loop, the relevant limit is the maximum Zs from Tables 41.3 or 41.5 — the bond contributes to Zs and an excessive bond resistance pushes Zs above the limit.',
  },
  {
    question: 'Why null the test leads — surely the lead resistance is small?',
    answer:
      'Lead resistance is typically 0.10 to 0.20 ohm for a 1 m pair of croc-clip leads. A "good bond" reading of 0.04 ohm is dwarfed by 0.20 ohm of lead resistance — without nulling, every measurement reads ~0.24 ohm regardless of bond quality. Nulling is essential for the readings to be meaningful. Re-null if you change leads, change croc clips, or any time the leads are physically disturbed.',
  },
  {
    question: 'Can I test bonding continuity with the supply live?',
    answer:
      'No. Always isolate first per Module 1 Section 3 safe isolation procedure. (1) Disconnect, lock off, prove dead. (2) Disconnect the bond at one end (usually the MET) to break parallel paths. (3) Test. (4) Reconnect the bond. (5) Restore supply. Testing live carries shock risk and gives misleading readings (parallel paths everywhere).',
  },
  {
    question: 'What\'s the difference between R1+R2 and main bond continuity?',
    answer:
      'R1+R2 is a circuit-level test on a final circuit — line conductor + CPC end-to-end of one circuit. Main bond continuity is a separate test on each main bonding conductor — MET to BS 951 clamp on each extraneous-conductive-part. Different conductors, different test setups, both required at initial verification, both recorded on the Schedule of Test Results. R1+R2 feeds into Zs for the circuit; main bond continuity confirms each bond is intact.',
  },
  {
    question: 'How often should bonding continuity be retested after the initial verification?',
    answer:
      'On every periodic inspection (EICR) — typical intervals: 10 years for owner-occupied domestic, 5 years for rented domestic, 5 years for commercial, 3 years for industrial. Plus whenever any work is done that touches the bonding system (refurb, plumbing changes, gas meter replacement). Loose terminations and oxidised contacts can develop slowly, and a periodic continuity check is the only way to catch them before they become a fault.',
  },
  {
    question: 'My MFT has different test current options (200 mA vs 10 mA). Which do I use for continuity?',
    answer:
      'Use the higher test current (typically 200 mA) for protective conductor continuity. Higher current "burns through" surface oxide on terminations and gives a more reliable reading of the actual joint resistance. The lower-current ranges are for sensitive equipment testing (won\'t damage electronic components) but are less suited to bonding continuity where you want to confirm the joint can carry real fault current.',
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 4"
            title="Test continuity of main bonds"
            description="Reg 643.2.1 mandatory initial verification test. Low-resistance ohmmeter, leads nulled, reading recorded on the Schedule of Test Results. The test that proves the bond actually does its job."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 643.2.1 — protective bonding conductor continuity is a mandatory initial verification test. Use a low-resistance ohmmeter (MFT continuity range, 200 mA test current).',
              'Always null/zero the test leads first to subtract lead resistance. Always isolate the supply and disconnect the bond at one end to eliminate parallel paths.',
              'Industry "good bond" benchmark: < 0.05 ohm on a typical domestic 10 mm² bond of 4-5 m. > 0.10 ohm warrants investigation. Document on the Schedule of Test Results.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite Reg 643.2.1 and identify which conductors require continuity verification at initial verification.',
              'Select the right test instrument (MFT continuity range, 200 mA test current) and configure it for bonding continuity testing.',
              'Null/zero the test leads correctly and explain why this is essential.',
              'Isolate the supply and disconnect the bond at one end before testing to eliminate parallel paths.',
              'Interpret continuity readings against the industry < 0.05 ohm benchmark and identify when a reading indicates a poor termination.',
              'Record continuity values on the Schedule of Test Results and identify the relevant cross-references on the EIC.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why we test — Reg 643.2.1</ContentEyebrow>

          <ConceptBlock
            title="Continuity testing proves the bond is electrically sound"
            plainEnglish="A bond that looks fine visually can still be electrically broken — loose screw, oxidised contact, damaged conductor strand inside the insulation. The continuity test puts a known current through the conductor and measures the resistance. Low resistance = sound joint. High resistance = problem."
            onSite="On every initial verification (new install, alteration, addition) and every periodic inspection (EICR) — bond continuity gets tested. The reading goes on the certificate. Anything anomalous gets investigated before sign-off."
          >
            <p>
              The bond can fail visually-undetectable in three ways. (1) Loose terminal screw —
              looks tightened from outside but isn\'t actually pressing the conductor against the
              terminal. (2) Oxidised contact face — paint or scale or oxide between the clamp jaw
              and the pipe. (3) Damaged conductor inside the insulation — strands nicked during
              stripping, cable crushed during installation. None of these show on a visual
              inspection but all of them produce a high continuity reading.
            </p>
            <p>
              The continuity test is also the verification that protective bonding actually
              exists across the installation — not just that someone fitted a clamp on the gas
              pipe but that the bonding cable physically connects from the MET to the clamp with
              an unbroken metallic path. Without the test, an installation could pass visual
              inspection with bonds that don\'t actually connect anywhere.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.2.1 (Continuity of protective conductors)"
            clause="The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors."
            meaning={
              <>
                Mandatory continuity verification at initial verification for: every CPC (final
                circuit protective conductor), every main protective bonding conductor (to gas,
                water, oil, structural steel etc.), and the ring legs of every ring final
                circuit. The test method is "by measurement of resistance" — meaning a
                low-resistance ohmmeter, not a buzzer continuity check. Document each result on
                the Schedule of Test Results.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.1."
          />

          <SectionRule />

          <ContentEyebrow>The test instrument</ContentEyebrow>

          <ConceptBlock
            title="Multifunction tester (MFT) — continuity range, 200 mA test current"
            plainEnglish="A combined test instrument for the routine BS 7671 verification suite — continuity, insulation resistance, loop impedance, RCD operation, polarity. The continuity range is what you use for bonding."
            onSite="Common trade choices: Megger MFT1741, Fluke 1664FC, Kewtech KT64+, Metrel MI3155. All have a continuity range that injects a controlled 200 mA test current and resolves down to milliohm range. All have a null/zero function for the test leads."
          >
            <p>The instrument requirements for bonding continuity:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Test current:</strong> 200 mA (not the lower 10 mA "no-trip" range).
                Higher current burns through surface oxide and gives a real measure of joint
                resistance.
              </li>
              <li>
                <strong>Resolution:</strong> 0.01 ohm or better. Typical bond readings are 0.02
                to 0.10 ohm — you need an instrument that can resolve those small differences
                meaningfully.
              </li>
              <li>
                <strong>Range:</strong> 0-2 ohm or 0-20 ohm autoranging. Some MFTs have a
                dedicated "continuity" range (with audible buzzer) and a "low ohm" range; use
                the low ohm range for bonding measurements as the buzzer continuity is typically
                less precise.
              </li>
              <li>
                <strong>Null/zero function:</strong> labelled "NULL", "ZERO" or "REL" depending
                on manufacturer. Subtracts the current reading so subsequent measurements exclude
                lead resistance.
              </li>
              <li>
                <strong>Calibration certificate:</strong> in date. BS 7671 Reg 643.1 requires
                test instruments to be appropriate for the test, and trade practice plus most
                Approved Contractor schemes require calibration on a 12-month cycle.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Test leads — keep them short, keep them tidy, null them every time"
            plainEnglish="Bondable test leads with sharp tip probes at one end and croc clips at the other. Keep the lead length short (1 m typical) — longer leads = more lead resistance to null out and more handling resistance variance."
          >
            <p>
              Lead resistance is the silent enemy of accurate continuity measurement. A 1 m pair
              of croc-clip leads typically reads 0.10 to 0.20 ohm with the clips touched
              together. A 5 m extension lead pair can read 0.50 ohm or more. Without nulling,
              every bond reading is corrupted by this baseline.
            </p>
            <p>The right setup:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Short test leads (1-2 m) with secure crocodile clips or 4 mm probe tips.
              </li>
              <li>
                Inspect the clip jaws — clean copper contact, no corrosion. Replace the leads
                if any sign of damage.
              </li>
              <li>
                Touch the clips together at the start of every test session and check the
                instrument reads near zero (after a small null adjustment).
              </li>
              <li>
                Re-null whenever you change leads, change clip type, or after any rough
                handling.
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

          <ContentEyebrow>The test sequence</ContentEyebrow>

          <ConceptBlock
            title="Step-by-step — testing a main bond from MET to BS 951 clamp"
            plainEnglish="Isolate, prove dead, disconnect one end of the bond, null the leads, take the reading, reconnect, retest in-circuit, document."
            onSite="Total time: about 5 minutes per bond once practiced. Worth doing carefully — the reading you record on the Schedule is the legal record of the bond\'s condition at sign-off."
          >
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolate the supply</strong> at the main switch. Lock off if possible.
                Prove dead at the MET using a GS38 voltage tester confirmed against a known live
                source first.
              </li>
              <li>
                <strong>Disconnect the bond at one end</strong> — typically the MET end. Loosen
                the terminal screw, withdraw the conductor, position it clear of the MET busbar.
                This breaks any parallel paths.
              </li>
              <li>
                <strong>Set up the MFT</strong> — continuity range, 200 mA test current. Connect
                the test leads.
              </li>
              <li>
                <strong>Null the leads</strong> — touch the clips together and press the NULL
                button. Confirm the instrument now reads 0.00 ohm with the clips together.
              </li>
              <li>
                <strong>Connect across the bond</strong> — one clip on the disconnected MET end
                of the bond conductor, the other clip on the conductor end at the BS 951 clamp
                (or on the BS 951 clamp body if the cable end isn\'t accessible).
              </li>
              <li>
                <strong>Read and record</strong> — note the value. Healthy bond on 10 mm² Cu over
                4-5 m: 0.02 to 0.05 ohm. Anything above 0.10 ohm — investigate.
              </li>
              <li>
                <strong>Reconnect the bond</strong> at the MET end. Strip if necessary, ferrule,
                land, torque per Sub 2 procedure.
              </li>
              <li>
                <strong>Optional in-circuit retest</strong> — with the bond reconnected, you can
                re-measure to confirm the in-circuit reading (will be slightly lower due to
                parallel paths via earthing conductor). Useful as a sanity check on the
                installation as a whole.
              </li>
              <li>
                <strong>Restore supply</strong> — unlock the main switch, energise.
              </li>
              <li>
                <strong>Document</strong> — record the disconnected continuity value on the
                Schedule of Test Results against the relevant bond ("Main bonding to gas",
                "Main bonding to water" etc.).
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="What a healthy reading looks like — typical values"
            plainEnglish="10 mm² Cu has a resistance of about 1.83 mOhm/m. A 5 m bond cable has 9 mOhm of cable resistance. Add a few mOhm at each termination = 0.02-0.05 ohm typical."
          >
            <p>
              Cable resistance per metre at 20 °C from BS 7671 Appendix 4 / IET On-Site Guide:
            </p>
            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[14px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-white/90">
                <div className="font-semibold text-emerald-300">Conductor CSA</div>
                <div className="font-semibold text-emerald-300 hidden sm:block">R per metre</div>

                <div>6 mm² Cu</div>
                <div className="text-white/70 sm:text-white/90">3.08 mOhm/m</div>

                <div>10 mm² Cu</div>
                <div className="text-white/70 sm:text-white/90">1.83 mOhm/m</div>

                <div>16 mm² Cu</div>
                <div className="text-white/70 sm:text-white/90">1.15 mOhm/m</div>

                <div>25 mm² Cu</div>
                <div className="text-white/70 sm:text-white/90">0.727 mOhm/m</div>
              </div>
            </div>
            <p>
              Worked examples — disconnected bond continuity readings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>10 mm² Cu, 5 m run</strong> — cable: 5 × 1.83 = 9.15 mOhm = 0.009 ohm.
                Plus terminations (typically 5-15 mOhm each): expected reading 0.02-0.05 ohm.
              </li>
              <li>
                <strong>10 mm² Cu, 10 m run</strong> — cable: 10 × 1.83 = 18.3 mOhm = 0.018 ohm.
                Plus terminations: expected reading 0.03-0.06 ohm.
              </li>
              <li>
                <strong>16 mm² Cu, 5 m run</strong> — cable: 5 × 1.15 = 5.75 mOhm = 0.006 ohm.
                Plus terminations: expected reading 0.02-0.04 ohm.
              </li>
              <li>
                <strong>25 mm² Cu, 8 m run</strong> — cable: 8 × 0.727 = 5.8 mOhm = 0.006 ohm.
                Plus terminations: expected reading 0.02-0.04 ohm.
              </li>
            </ul>
            <p>
              Anything dramatically above these expected ranges flags a contact resistance
              problem at one of the terminations. Use the disconnected-end method, then visually
              inspect each termination, then re-make if necessary.
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

          <ContentEyebrow>Recording the result — Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="The Schedule of Test Results captures every bond continuity value"
            plainEnglish="The Schedule of Test Results that accompanies the EIC has a section for protective conductor continuity. Record each main bond reading against its description (gas, water, structural steel etc.). Sign and date."
            onSite="On the front-end EIC software (Elec-Mate, AmTech, Easy-Cert) the Schedule of Test Results is a structured form — populate the bonding section, the values flow through to the printed certificate."
          >
            <p>
              Section 644 of BS 7671 sets out the certification requirements. The Schedule of
              Test Results is the test data that supports the EIC — every value measured at
              initial verification gets a row. For main protective bonding conductors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Description of the bond — e.g. "Main bonding to gas service", "Main bonding to
                water service", "Main bonding to structural steel", etc.
              </li>
              <li>Continuity value measured (in ohms or mOhm).</li>
              <li>Date of test, name and signature of the person testing.</li>
              <li>Instrument identifier (serial number of the MFT used).</li>
              <li>
                Pass/fail (or comment) — a typical 0.02-0.05 ohm reading is a clear pass; a
                reading above 0.10 ohm would warrant a comment and investigation before sign-off.
              </li>
            </ul>
            <p>
              The completed Schedule is part of the legal record of the installation. If a
              future EICR engineer (or insurance assessor or court) ever queries the bonding,
              the Schedule shows the as-built state at handover.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.2.2 (Continuity of ring final circuit conductors)"
            clause="The continuity of every ring final circuit conductor, including the protective conductor, shall be verified by a measurement of resistance."
            meaning={
              <>
                Same family of continuity tests as the main bonding tests of Reg 643.2.1.
                Mentioned here as a cross-reference — when you\'re doing initial verification
                you typically work through every continuity test on the installation in one
                pass with the same MFT. Ring final circuits get the additional r1, rn, r2 loop
                measurements covered separately in Section 6 of this Module.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.2."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Test instrument null/zero technique — why test-lead resistance matters"
            plainEnglish="Your leads have resistance. Healthy bond resistance is in milliohms. Without nulling, the lead resistance dwarfs the bond reading and every measurement is wrong by 0.10 to 0.30 ohm. Specific MFTs have specific null routines — they're not all the same."
            onSite="Make nulling the first action of every test session. Touch the clips together, press NULL/ZERO/REL, confirm the instrument reads 0.00 ohm with the clips together. Re-null whenever you change leads, swap clips, or after rough handling."
          >
            <p>
              The reason this matters in numbers. A 1 m pair of standard croc-clip MFT leads
              measures around 0.13 to 0.18 ohm with the clips touched together. A 5 m extension
              lead pair can hit 0.40 ohm. Healthy main bond resistance on 10 mm² Cu over 4-5 m
              is 0.02 to 0.05 ohm. Without nulling, every reading is corrupted: a 0.04 ohm bond
              looks like 0.18 ohm, a 0.15 ohm faulty bond looks like 0.30 ohm — both above the
              0.10 ohm trade alarm threshold but not in a way that distinguishes good from bad.
            </p>
            <p>The null routine on the major UK trade MFTs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Megger MFT1741 / MFT1731 series.</strong> Continuity range selected.
                Touch clips together. Press the TEST button — instrument measures and stores
                the lead resistance. Display shows "NULL" indicator. Subsequent readings have
                lead resistance subtracted.
              </li>
              <li>
                <strong>Fluke 1664FC / 1663 series.</strong> Continuity (Ω) range. Touch clips,
                press the TEST button or hold ZERO for two seconds depending on model. ZERO
                indicator appears. Some models also store lead resistance per-test profile so
                a multi-conductor test sequence keeps the null between measurements.
              </li>
              <li>
                <strong>Kewtech KT64+ / KT63.</strong> Low-Ω range. Press and hold the NULL
                button while clips are touched together; release when ZERO appears. Re-null any
                time you change clips.
              </li>
              <li>
                <strong>Metrel MI3155 EurotestXC.</strong> Continuity menu, R LOW sub-test. Press
                COMP (compensation). Touch clips. Press TEST. Display reads "Compensation OK"
                and stores the lead value.
              </li>
            </ul>
            <p>
              All four behave the same logically — they store the lead resistance and subtract
              it from subsequent readings. They differ in button labels and exact sequence. Read
              the manual for the specific MFT on your van; the technique only takes a minute
              to learn but skipping it corrupts every reading you take that day.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Identifying and isolating parallel earth paths during the bonding continuity test"
            plainEnglish="On a fully-connected installation, your test current at the bond clamp can return to the MFT via the bond cable AND via the earthing conductor through the MET AND via the supplier earth network AND via every other bond. Disconnect the bond at one end so the test current is forced through the bond cable only."
            onSite="Standard sequence. (1) Isolate at the main switch, lock off, prove dead. (2) Open the meter cabinet. (3) Loosen the MET terminal screw on the bond conductor under test. (4) Withdraw the conductor and position it clear of the busbar. (5) Test from the disconnected MET end down to the BS 951 clamp. (6) Reconnect to the MET, torque to spec, retest in-circuit (lower reading expected — that's the parallel paths showing up)."
          >
            <p>
              The physics. The MFT injects a controlled test current (typically 200 mA) at one
              clip and measures the voltage drop across the test loop. On a disconnected bond
              cable the loop is "MFT lead → MET-end conductor → bond cable → clamp-end
              conductor → MFT other lead". The reading is the bond cable + termination
              resistance only — what you want.
            </p>
            <p>
              On a fully-connected installation the loop has multiple parallel paths: the bond
              cable itself, the earthing conductor back through the MET to the supplier earth
              and round through the supplier neutral / electrode network, plus every other bond
              from gas / structural steel / etc. The MFT sees all paths in parallel and reports
              the combined resistance — typically 1/4 to 1/10 of the bond-cable-only value.
              You'd see, say, 0.005 ohm where the disconnected reading would be 0.04 ohm.
              Misleading: the bond looks better than it is.
            </p>
            <p>
              The disconnect-at-one-end procedure isolates the bond under test:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Isolate, lock off, prove dead at the MET using a GS38 voltage tester verified
                against a known live source (see Module 1 §3 safe isolation).
              </li>
              <li>
                Identify the bond conductor under test at the MET. Trace the cable from the MET
                terminal to the BS 951 clamp visually so you're confident which conductor is
                which (mis-identification under a live install is a real risk).
              </li>
              <li>
                Loosen the MET terminal screw and withdraw the bond conductor only. Leave every
                other CPC and bond connected — they're not under test.
              </li>
              <li>
                Position the disconnected end clear of the MET busbar and clear of any other
                bonded metalwork. Tape it to the cabinet wall with insulating tape if it's
                springy and wants to flop back onto the busbar.
              </li>
              <li>
                Connect the MFT clip to the disconnected MET end of the bond. Connect the other
                clip to the BS 951 clamp body or the conductor at the clamp end.
              </li>
              <li>
                Take the reading. Healthy: 0.02-0.05 ohm on 10 mm² Cu over 4-5 m.
              </li>
              <li>
                Reconnect at the MET — ferrule the strands, torque to spec per Sub 2 procedure.
              </li>
              <li>
                Optional but useful: retest in-circuit. Reading will be lower (parallel paths).
                The difference between disconnected and in-circuit confirms the parallel path
                is functional — i.e. the rest of the bonding system is sound. A disconnected of
                0.04 ohm and an in-circuit of 0.03 ohm tells you the bond and the parallel
                earthing system are both healthy.
              </li>
            </ol>
            <p>
              Never test bonding continuity with the supply live. Multiple safety reasons (shock
              risk if you touch the wrong terminal) and multiple measurement reasons (parallel
              paths corrupt the reading, transient noise on the supply earth corrupts MFT
              accuracy). Isolate, disconnect, test, reconnect, restore — every time.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where the test goes wrong</ContentEyebrow>

          <CommonMistake
            title="Forgetting to null the test leads — every bond reads 0.20 ohm"
            whatHappens={
              <>
                You\'ve set up your MFT, connected the leads, started testing every bond on the
                install. Every reading comes back at about 0.20 to 0.25 ohm — well above the
                0.05 ohm trade benchmark. You start chasing nonexistent contact issues, opening
                bonds, re-making terminations, retesting, getting the same readings. Eventually
                you realise you never nulled the leads — the 0.20 ohm baseline IS the lead
                resistance, not a bond fault.
              </>
            }
            doInstead={
              <>
                Make nulling the first action of every continuity test session. Touch the clips
                together, press NULL, confirm the instrument reads 0.00 ohm with the clips
                together. NOW your subsequent readings reflect actual bond resistance. Re-null
                whenever you change leads or after rough handling. Make a habit of "click clips,
                check zero, take reading" — three steps, every time.
              </>
            }
          />

          <Scenario
            title="Testing main bond continuity from MET to gas BS 951 clamp under the kitchen sink"
            situation={
              <>
                You\'re commissioning a domestic install. The main bonding cable to the gas
                service runs 4.5 m from the MET in the meter cabinet under the stairs to a BS
                951 clamp on the steel pipe under the kitchen sink. You\'re ready to do the
                continuity test. Walk the procedure end-to-end and identify what reading would
                make you happy and what would prompt investigation.
              </>
            }
            whatToDo={
              <>
                (1) Isolate at the main switch in the consumer unit, lock off, prove dead at the
                MET using a GS38 voltage tester. (2) Open the meter cabinet, disconnect the gas
                bonding conductor at the MET — loosen the terminal screw, withdraw the
                conductor, position it clear of the busbar. (3) Set MFT to continuity range
                (200 mA test current, low-ohm scale). (4) Touch test lead clips together, press
                NULL, confirm 0.00 ohm. (5) Connect one clip to the disconnected MET end of the
                gas bonding conductor; second clip to the BS 951 clamp body or conductor end
                under the sink. (6) Read: expecting ~0.02-0.05 ohm for a healthy 4.5 m run on
                10 mm² Cu (cable resistance 4.5 × 1.83 = 8.2 mOhm + ~10-30 mOhm at the two
                terminations). (7a) HAPPY RESULT: 0.04 ohm — within expected band, bond is
                sound, document on Schedule. (7b) RED FLAG: 0.50 ohm — way above the 0.06 ohm
                upper expected band. Investigate: visually inspect the BS 951 clamp (clean? bare
                metal? torque?), inspect the MET end (was the conductor damaged?), re-tug-test
                both ends. Re-make whichever joint looks suspect. Retest. (8) When passing,
                reconnect the bond at the MET — ferrule, land, torque to spec, retest in-circuit
                (should read slightly lower due to parallel paths). (9) Restore supply,
                document the disconnected reading on the Schedule of Test Results.
              </>
            }
            whyItMatters={
              <>
                The continuity test is the moment the bond proves itself. Up to this point the
                bond exists physically — cable in place, clamp on the pipe, label fitted —
                but you don\'t know it\'s electrically sound until the MFT confirms it. A
                disciplined test routine (isolate, disconnect one end, null, measure, document)
                gives you a reliable reading every time. Skip any step and you\'re either
                getting a misleading reading (parallel paths) or a corrupted reading (lead
                resistance not nulled) or risking a shock (not isolated).
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 643.2.1 mandates continuity verification of every protective bonding conductor at initial verification — not optional.',
              'Use a multifunction tester (MFT) on the continuity range with 200 mA test current. Megger, Fluke, Kewtech, Metrel — all suitable.',
              'Always null/zero the test leads first. Lead resistance can be 0.10-0.20 ohm — overwhelms the actual bond reading without nulling.',
              'Always isolate the supply, prove dead, then disconnect the bond at one end (typically the MET) to break parallel paths. Test the bond conductor only.',
              'Industry "good bond" benchmark: < 0.05 ohm on a typical domestic 10 mm² bond of 4-5 m. > 0.10 ohm warrants investigation of the terminations.',
              'Cable resistance from BS 7671 Appendix 4: 10 mm² Cu = 1.83 mOhm/m, 16 mm² Cu = 1.15 mOhm/m. Calculate the expected cable contribution and compare to the measured reading.',
              'Document every continuity value on the Schedule of Test Results — description of the bond, measured value, date, instrument serial, signature.',
              'Re-test bonding continuity at every periodic inspection (EICR). Loose terminations and oxidised contacts develop slowly — periodic test catches them before fault.',
            ]}
          />

          <Quiz title="Test continuity — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Connect bonding clamps
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Main vs supplementary bonding
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
