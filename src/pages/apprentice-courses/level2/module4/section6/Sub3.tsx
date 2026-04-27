/**
 * Module 4 · Section 6 · Sub 3 — Test insulation resistance
 * Maps to City & Guilds 2365-02 / Unit 204 / LO6 / AC 6.3
 *   AC 6.3 — "Test insulation resistance"
 *
 * Frame: insulation resistance is a 500 V DC test (250 V for SELV/PELV or
 * electronic-sensitive circuits per A4:2026 Reg 643.3.2/.3.3) that proves the
 * insulation between live conductors and between live conductors and earth is
 * intact. Minimum acceptance per Table 64 = 1.0 MΩ for LV circuits, but
 * anything below 100 MΩ deserves investigation. Disconnect electronic loads
 * before the test or they will fail or be damaged.
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

const TITLE = 'Test insulation resistance | Level 2 Module 4.6.3 | Elec-Mate';
const DESCRIPTION =
  '500 V DC insulation test between live conductors and to earth — Table 64 minimum 1 MΩ for 230 V circuits, the 250 V option for SELV/PELV/electronic-sensitive systems per BS 7671 A4:2026, and the disconnection rules that stop you frying surge devices and LED drivers.';

const checks = [
  {
    id: 'm4-s6-sub3-test-voltage',
    question:
      'A standard domestic 230 V circuit. Which test voltage and minimum acceptance value does BS 7671 A4:2026 Table 64 specify?',
    options: [
      '250 V DC, minimum 0.5 MΩ.',
      '500 V DC, minimum 1.0 MΩ.',
      '1000 V DC, minimum 1.0 MΩ.',
      '230 V AC, minimum 100 MΩ.',
    ],
    correctIndex: 1,
    explanation:
      'Table 64 — for circuits "up to and including 500 V (with the exception of SELV/PELV)": test voltage 500 V DC, minimum insulation resistance 1.0 MΩ. SELV/PELV uses 250 V DC at 0.5 MΩ. Above 500 V uses 1000 V DC at 1.0 MΩ. The 500 V/1.0 MΩ figures cover almost everything you will test on a domestic or small commercial install.',
  },
  {
    id: 'm4-s6-sub3-disconnect-electronics',
    question:
      'Before testing insulation resistance on a circuit feeding LED dimmers, surge protection devices and an EV charger control board, you should:',
    options: [
      'Just press the button — they are designed to handle 500 V.',
      'Disconnect the electronic loads before the 500 V DC test, since they will be damaged or give a false low reading; reconnect them and apply the 250 V DC test per Reg 643.3.3, which must read at least 1.0 MΩ between live conductors and the protective conductor.',
      'Test at 1000 V DC.',
      'Use an AC voltmeter instead of an MFT.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 A4:2026 Reg 643.3.3 covers exactly this case. Where connected equipment is likely to influence the test or be damaged, disconnect the equipment, run the test at the table voltage (500 V DC for 230 V circuits) per Reg 643.3.2, then reconnect the equipment and apply a 250 V DC test between live conductors and the protective conductor connected to the earthing arrangement, which must read at least 1.0 MΩ. SPDs clamp at low voltages and will short the test if left in; LED drivers with capacitive input filters will read low or be destroyed; some EV chargers have isolation monitoring that triggers on the test.',
  },
  {
    id: 'm4-s6-sub3-result-interpretation',
    question:
      'You measure IR on a domestic ring final at 500 V DC. Combined L+N to E reading is 18 MΩ. What action?',
    options: [
      'Pass — well above 1 MΩ, no further action.',
      'Acceptable per Table 64 (well above 1 MΩ) but worth investigating because a value of 18 MΩ on a typical T&E circuit is much lower than the >100 MΩ you would expect from healthy insulation. Look for moisture in a back-box, slightly nicked sheath at a clip or staple, or a degrading connection.',
      'Fail — must be exactly infinite.',
      'Fail — repeat at 1000 V DC.',
    ],
    correctIndex: 1,
    explanation:
      'Table 64 minimum acceptance is 1 MΩ but that is the absolute floor — pristine new T&E should read in the gigaohm range, MFT readings of >100 MΩ (or "OL" on the IR range, meaning above the meter range) are normal for a sound circuit. 18 MΩ is technically a pass under the regulation but the order of magnitude says something is degrading insulation: moisture, surface contamination, a partial breakdown at a termination. Find and fix before sign-off.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 A4:2026 Reg 643.3.1 — insulation resistance shall be measured between:',
    options: [
      'Live conductors only.',
      '(a) live conductors; and (b) live conductors and the protective conductor connected to the earthing arrangement. During the test of (b), line and neutral may be connected together.',
      'Earth and the building structure.',
      'Phase and the meter tails only.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.1 verbatim — IR is measured between (a) live conductors (L-N on a single-phase circuit, all line-to-line and line-to-neutral combinations on three-phase) and (b) live conductors and the CPC connected to earth. The regulation explicitly permits L and N to be linked together for the live-to-earth test, which is the common practical method on domestic installs.',
  },
  {
    id: 2,
    question: 'You are testing IR on a circuit that includes a single-pole switch. The switch is in the OFF position. Which conductors does the test cover?',
    options: [
      'Only the cable up to the switch.',
      'Only the cable up to the switch — because the switch is open, the conductor downstream of the switch is isolated from the test signal and will not be tested.',
      'The whole circuit including downstream of the switch.',
      'Doesn\'t matter, the switch position is irrelevant.',
    ],
    correctAnswer: 1,
    explanation:
      'Single-pole switches in the OFF position will exclude the downstream cable from the IR test because the test signal cannot reach that section. Best practice: turn every functional switch in the circuit ON during IR testing so the entire installation is included. For two-way switches, set both throws to a position that closes the circuit. Double-pole switches still need to be ON. Document any sections that cannot be tested (e.g. integral-switched fittings) on the schedule.',
  },
  {
    id: 3,
    question: 'On a 12-circuit domestic CU you have completed circuit-by-circuit IR testing. Each circuit reads >100 MΩ. You then test the whole installation as one (everything connected). Reading: 5 MΩ. Why?',
    options: [
      'There is a fault.',
      'Parallel paths — every circuit\'s insulation appears in parallel between the same L+N+E conductors at the CU. Twelve circuits each at 100 MΩ in parallel give 100/12 ≈ 8.3 MΩ. The reading is low because of summed leakage paths, not because of an insulation fault. Per-circuit testing is more diagnostically useful and is the recommended method.',
      'The MFT is broken.',
      'CPC continuity failed.',
    ],
    correctAnswer: 1,
    explanation:
      'When you test multiple circuits in parallel, the leakage paths add up — twelve circuits each with say 80 nA of leakage at 500 V give 12 × 80 = 960 nA total, which the meter reports as 500 V ÷ 960 nA ≈ 520 kΩ. (Or in resistance terms, the parallel combination drops the reading.) Test each circuit separately; the per-circuit reading is what matters for diagnostics. Reg 643.3.2 explicitly says each distribution circuit should be tested separately.',
  },
  {
    id: 4,
    question: 'BS 7671 A4:2026 Reg 643.3.3 introduced an extra test step. What is it?',
    options: [
      'A 1500 V DC flash test.',
      'Where equipment was disconnected to allow the standard 500 V DC test, after the equipment is reconnected a 250 V DC test must be applied between live conductors and the protective conductor — minimum 1 MΩ. Confirms the equipment itself does not present an unacceptable insulation defect.',
      'No additional test, just the 500 V remains.',
      'AC voltage test at 240 V.',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 Reg 643.3.3 added the post-reconnection 250 V DC test. The thinking: if you had to disconnect electronics to do the main 500 V DC test, you have not actually tested those electronics. The 250 V DC follow-up is gentle enough not to damage them but high enough to detect a serious insulation defect within the equipment. Acceptance is the same 1 MΩ minimum.',
  },
  {
    id: 5,
    question: 'You are testing a SELV circuit (12 V LED downlights with a transformer). Which test voltage do you use and what is the minimum acceptance per Table 64?',
    options: [
      '500 V DC, 1.0 MΩ.',
      '250 V DC, minimum 0.5 MΩ.',
      '1000 V DC, 1.0 MΩ.',
      'No IR test required for SELV.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64: SELV and PELV → test voltage 250 V DC, minimum insulation resistance 0.5 MΩ. Lower test voltage because SELV/PELV equipment is generally not designed to withstand a 500 V DC stress on its insulation system; lower acceptance because the lower test voltage drives less leakage current through the same imperfections. Test the SELV side with the transformer included; test the LV primary side (mains) separately at 500 V DC.',
  },
  {
    id: 6,
    question: 'Combined L+N to earth test on a typical 230 V circuit reads 0.45 MΩ. What does this mean?',
    options: [
      'Pass.',
      'Below the 1.0 MΩ minimum from Table 64 → fail. Investigate: damaged cable insulation, water ingress at a back-box, a wired-up neutral that is touching earth somewhere, a trapped conductor under a pinch screw. Do not energise.',
      'Pass marginally — energise but record on STR.',
      'Test again at 1000 V DC to confirm.',
    ],
    correctAnswer: 1,
    explanation:
      'Anything below 1.0 MΩ on a 500 V DC test for a 230 V circuit is a fail per Table 64. 0.45 MΩ is below the minimum and indicates a real insulation defect somewhere. Common causes: a back-box where the cable sheath has been pinched against a sharp metal edge causing minor but persistent leakage; moisture in an outdoor accessory; a neutral conductor touching the CPC at a terminal; a connector block misassembled. Find the fault, fix it, retest. Do not energise an installation that fails IR — the leakage path will heat up under load and may eventually develop into a full insulation breakdown.',
  },
  {
    id: 7,
    question: 'Why does BS 7671 require disconnection of equipment "likely to influence the test or be damaged" before the IR test?',
    options: [
      'For convenience.',
      'Because electronics with capacitive or low-impedance protection paths (SPDs, LED driver capacitors, EMC filters in inverters) will either short the test signal (giving a false low reading) or be destroyed by the 500 V DC stress they were never designed to withstand.',
      'To save battery life on the MFT.',
      'Required by RoHS.',
    ],
    correctAnswer: 1,
    explanation:
      'The 500 V DC test pumps current through any leakage path. A surge protective device (SPD) connected line-to-earth will short the test almost completely — its very purpose is to clamp transient over-voltages by conducting briefly to earth. A 500 V DC stress applied for several seconds is well within its sacrificial range and will either trip its disconnect mechanism or damage the MOV. LED driver electronics include input EMC filter capacitors that conduct DC test current readily. The Reg 643.3.3 disconnect-and-retest procedure exists precisely to handle these cases without false readings or equipment damage.',
  },
  {
    id: 8,
    question: 'A circuit reads >999 MΩ (off the top of the MFT scale, often shown as OL or > 999 MΩ) on the IR test. Pass or fail?',
    options: [
      'Fail — anything above the scale is suspect.',
      'Pass — the reading is above the meter\'s measurement range, which means the actual IR is at least the top of scale. Healthy new T&E and similar wiring should always read like this. Document on the STR as ">999 MΩ" or the equivalent symbol the form specifies.',
      'Indeterminate — repeat with another instrument.',
      'Fail — meter must be calibrated.',
    ],
    correctAnswer: 1,
    explanation:
      'A reading above the MFT scale (typically 999 MΩ or 200 GΩ depending on instrument range) is exactly what you want to see. It means the leakage current through the insulation is below the meter\'s detection threshold — i.e. the insulation is doing its job perfectly. On the schedule of test results record it as ">999 MΩ" or ">200 GΩ" or whatever the form requires for "above range". Do not record it as "0" or "infinite" — both are misleading for any future inspector reading the form.',
  },
];

const faqs = [
  {
    question: 'Why DC and not AC for an insulation test?',
    answer:
      'A DC test simplifies the measurement. AC would introduce capacitive reactance through every cable\'s natural capacitance to earth — a long T&E run has measurable capacitance and at 50 Hz that capacitive coupling would dominate the reading and mask any actual resistive leakage. DC eliminates the capacitive component (after a brief settling time) and lets the meter see only the genuine ohmic leakage path. The 500 V DC level is high enough to drive current through any partial breakdown but low enough to be safe to handle and to not damage well-designed mains-rated insulation systems.',
  },
  {
    question: 'What about combined L+N versus separate L-E and N-E tests?',
    answer:
      'BS 7671 Reg 643.3.1 explicitly permits combining L and N for the live-to-earth test ("During this measurement, line and neutral conductors may be connected together"). Combining is faster on a multi-circuit install: link L and N at the CU, run one test to E. If you get a pass everywhere, you are done. If you get a fail, then split L-E and N-E to localise. For three-phase, separate tests of L1-L2, L2-L3, L1-L3 (live-to-live) and L1-E, L2-E, L3-E, N-E (live-to-earth) are normally taken — six readings per circuit.',
  },
  {
    question: 'How long do I hold the TEST button on the MFT?',
    answer:
      'Until the reading stabilises. On a healthy circuit that is one or two seconds — the meter charges the cable\'s capacitance and the reading then settles at the resistive value. On a circuit with significant capacitance (long runs, or runs with surge devices left in by accident), the reading may climb for several seconds as the capacitor charges. Wait until the reading is stable before recording. Some MFTs have a hold or capture function that stores the steady-state value automatically.',
  },
  {
    question: 'Do I need to test IR on every periodic inspection or only on initial verification?',
    answer:
      'Initial verification — yes, on every circuit, before first energisation. Periodic inspection (EICR) — yes, on a sample basis (typically the C2 or C3 limiting cases identified during inspection, plus a sample of circuits to check overall integrity). Sample percentages depend on the type of installation and the inspector\'s judgement; the IET Guidance Note 3 gives detailed guidance. For higher-risk installations (industrial, swimming pools, agricultural) full circuit-by-circuit testing is normal. Keep a record of which circuits were tested at each inspection so the next inspector knows.',
  },
  {
    question: 'Why is the limit 1 MΩ when modern cable insulation reads in the gigohms?',
    answer:
      'The 1 MΩ limit in Table 64 is a hard pass/fail threshold below which the installation is unsafe — at 1 MΩ leakage on a 230 V circuit you have 230 µA of constant earth leakage which would trip a 30 mA RCD only after 130 of them combined, but is enough to be a slow-burning insulation degradation that gets worse over time. Healthy new wiring should read >100 MΩ comfortably. The 1 MΩ threshold is pragmatic — it accepts that some equipment (capacitive loads, residual moisture in newly installed concrete, etc.) can pull readings below pristine but the installation is still safe to operate. Anything between 1 MΩ and 100 MΩ should be investigated even though it passes the regulation.',
  },
  {
    question: 'My MFT IR test won\'t initiate — it shows a voltage warning. What\'s happening?',
    answer:
      'The MFT detects voltage on the circuit and refuses to apply the 500 V DC test (correctly — applying DC to a live circuit is dangerous and can damage the meter). Causes: you forgot to fully isolate the circuit; you have a back-fed feed from another circuit (e.g. a borrowed neutral); the MFT is reading capacitive coupling from an adjacent live circuit. Re-verify safe isolation, double-check that nothing is back-feeding into the circuit (a common defect on retrofits), and re-test. Modern MFTs have a "lockout" feature for exactly this safety case.',
  },
];

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 3"
            title="Test insulation resistance"
            description="The 500 V DC test that proves cable insulation is intact between live conductors and to earth. Disconnect electronics first, retest at 250 V DC after reconnection per the A4:2026 update."
            tone="emerald"
          />

          <TLDR
            points={[
              'Insulation resistance is a 500 V DC test (250 V for SELV/PELV) between (a) live conductors and (b) live conductors to the earthed protective conductor — required by BS 7671 A4:2026 Reg 643.3.1 and Table 64.',
              'Minimum acceptance per Table 64: 1.0 MΩ for circuits up to 500 V; 0.5 MΩ for SELV/PELV; 1.0 MΩ for circuits above 500 V (1000 V test). Healthy new wiring should read >100 MΩ.',
              'Disconnect electronics (SPDs, LED drivers, dimmers, EV charger control boards) before the test or they will fail or be damaged. After reconnection, apply the A4:2026 follow-up 250 V DC test per Reg 643.3.3 — also 1.0 MΩ minimum.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Set up a multifunction tester to apply the correct insulation test voltage for the circuit type.',
              'Carry out the IR test between live conductors and between live conductors and earth, per Reg 643.3.1.',
              'Apply the disconnect-and-retest procedure for circuits with electronic equipment per A4:2026 Reg 643.3.3.',
              'Read Table 64 acceptance values for different system types (SELV, LV, above 500 V).',
              'Interpret IR readings: > 1 MΩ pass; 1-100 MΩ pass but investigate; > 100 MΩ healthy.',
              'Diagnose IR failures by separating combined L+N tests into individual L-E and N-E tests.',
              'Cite Reg 643.3.1, 643.3.2 and 643.3.3 (introduced/redrafted in A4:2026) and quote Table 64 from memory.',
            ]}
            initialVisibleCount={4}
          />

          <VideoCard
            url={videos.insulationResistanceAmd2.url}
            title={videos.insulationResistanceAmd2.title}
            channel={videos.insulationResistanceAmd2.channel}
            duration={videos.insulationResistanceAmd2.duration}
            topic="Insulation resistance per A4:2026 · Unit 204 AC 6.3"
            caption="Craig Wiltshire walks the full IR test sequence under the A4:2026 update — 500 V DC between live conductors and to earth, the disconnect-and-retest discipline for SPDs / LED drivers, and the 250 V DC follow-up test introduced by Reg 643.3.3."
          />

          <ContentEyebrow>What you are testing and why</ContentEyebrow>

          <ConceptBlock
            title="The point of the IR test"
            plainEnglish="Cable insulation degrades over time and can be damaged during installation. The IR test stresses the insulation with a high DC voltage and measures the leakage current. A high leakage = low resistance = failing insulation."
            onSite="On a fresh install, IR confirms you didn\'t damage the cable during routing — no nicks against sharp edges, no pinched conductors at back-boxes, no twisted-pair shorts at terminations. On periodic inspection it tracks insulation aging."
          >
            <p>
              Insulation systems on a typical UK cable include the conductor sheath (the
              thermoplastic or thermosetting compound around each core) and the outer sheath of
              the cable itself. Both are designed to withstand the rated voltage of the cable plus
              a margin — typically 450/750 V for T&E, well above the 230 V working voltage.
            </p>
            <p>
              The IR test applies 500 V DC between conductors that should be isolated from each
              other (L-N, L-E, N-E) and measures the resistance of the insulation between them.
              Healthy insulation: leakage current is in nanoamps, resistance reads as gigohms or
              "above range" on the MFT. Damaged insulation: leakage is in microamps to milliamps,
              resistance drops to megohms or kilohms.
            </p>
            <p>
              The test catches three classes of defect:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Installation damage</strong> — a cable sheath nicked by a clip, a conductor
                pinched at a back-box terminal, a stripped insulation that has gone too far.
              </li>
              <li>
                <strong>Wiring errors</strong> — a neutral terminated on the earth bar, two
                conductors swapped at a junction box, a borrowed neutral from another circuit.
              </li>
              <li>
                <strong>Aging and environmental damage</strong> — moisture ingress at outdoor
                accessories, UV degradation on exposed cables, vermin damage, heat damage from
                chronic over-current.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3.1 (Insulation resistance — what to measure)"
            clause="The insulation resistance shall be measured between: (a) live conductors; and (b) live conductors and the protective conductor connected to the earthing arrangement. During this measurement, line and neutral conductors may be connected together."
            meaning={
              <>
                The IR test has two parts — between live conductors (L-N on single-phase, all
                line-to-line and line-to-neutral on three-phase) and between live conductors and
                earth. The regulation explicitly permits combining L and N for the test to earth
                — this is the standard quick-pass method on a multi-circuit domestic install.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.3.1."
          />

          <SectionRule />

          <ContentEyebrow>Test voltages and acceptance — Table 64</ContentEyebrow>

          <ConceptBlock
            title="Table 64 verbatim — every value you need"
            plainEnglish="Three rows. SELV/PELV at 250 V test, 0.5 MΩ minimum. Up to 500 V (the LV catchall) at 500 V test, 1.0 MΩ minimum. Above 500 V at 1000 V test, 1.0 MΩ minimum."
            onSite="For 99 % of UK domestic and small commercial work the row that matters is the middle one: 500 V DC, 1.0 MΩ minimum. Memorise it."
          >
            <p>BS 7671 A4:2026 Table 64 — Minimum values of insulation resistance:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Circuit nominal voltage</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Test voltage DC</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Minimum IR</div>

                <div>SELV and PELV</div><div>250 V</div><div>0.5 MΩ</div>
                <div>Up to and including 500 V (with the exception of the above)</div><div>500 V</div><div>1.0 MΩ</div>
                <div>Above 500 V</div><div>1000 V</div><div>1.0 MΩ</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                { v: 'SELV and PELV', test: '250 V DC', min: '0.5 MΩ' },
                { v: 'Up to and including 500 V (with the exception of SELV/PELV)', test: '500 V DC', min: '1.0 MΩ' },
                { v: 'Above 500 V', test: '1000 V DC', min: '1.0 MΩ' },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Circuit voltage</div>
                  <div className="text-white/90 mt-0.5">{row.v}</div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <div className="text-elec-yellow text-[10.5px] uppercase tracking-wide">Test V</div>
                      <div className="text-white/80">{row.test}</div>
                    </div>
                    <div>
                      <div className="text-elec-yellow text-[10.5px] uppercase tracking-wide">Min IR</div>
                      <div className="text-white/80">{row.min}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p>
              <strong>FELV circuits</strong> are tested at the same test voltage as that applied to
              the primary side of the source and shall meet all the test requirements for low
              voltage circuits — Table 64 footnote.
            </p>

            <p>
              <strong>Real-world expectations:</strong> a healthy 500 V DC test on new T&E should
              read in the high megohms or gigohms. A reading right at 1.0 MΩ is acceptable per
              Table 64 but indicates significant insulation degradation that warrants
              investigation before sign-off.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3.2 (Test voltages and acceptance) — selected text"
            clause="The insulation resistance measured with the test voltages indicated in Table 64 shall be considered satisfactory if the main switchboard and each distribution circuit tested separately, with all its final circuits connected but with current-using equipment disconnected, has an insulation resistance not less than the appropriate value given in Table 64."
            meaning={
              <>
                Test each distribution circuit separately — testing the whole installation as one
                gives a false low reading because every circuit\'s leakage adds in parallel. For
                each test, all final circuits should be connected but current-using equipment
                (appliances) disconnected. Modern A4:2026 also references the 250 V DC follow-up
                test under Reg 643.3.3 for cases where electronics had to be disconnected.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.3.2 and Table 64."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The disconnect-and-retest rule (A4:2026 update)</ContentEyebrow>

          <ConceptBlock
            title="Why you can\'t leave the electronics in"
            plainEnglish="500 V DC will damage or false-trigger most modern electronic devices that rely on internal capacitive coupling, surge clamping, or isolation monitoring. Disconnect them, test the cabling, then reconnect and run a gentler 250 V test."
            onSite="The disconnect list grew significantly with A4:2026: SPDs, AFDDs, LED drivers, dimmers, smart switches, EV charger control modules, induction hob driver boards, fixed-wire EMC filters."
          >
            <p>
              Equipment that requires disconnection before the 500 V DC IR test:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Surge protective devices (SPDs)</strong> — by design these clamp at a few
                hundred volts. 500 V DC across one will trigger the disconnect mechanism (sacrificing
                the SPD) or pull the test reading to near-zero by conducting the test current to
                earth.
              </li>
              <li>
                <strong>LED dimmers and LED driver electronics</strong> — input EMC filter
                capacitors conduct DC test current readily, giving a false low reading. Dimmers
                with electronic switch elements may be destroyed by the test voltage.
              </li>
              <li>
                <strong>EV charger control boards</strong> — most have isolation monitoring
                circuitry that will trigger or be damaged by the test signal.
              </li>
              <li>
                <strong>AFDDs (Arc Fault Detection Devices)</strong> — internal electronics
                vulnerable to DC stress.
              </li>
              <li>
                <strong>Smart switches, smart sockets, building management interfaces</strong> —
                anything with a microprocessor and a transformer or capacitor coupling to mains.
              </li>
              <li>
                <strong>Induction hob driver boards, smart appliances</strong> — disconnect at
                the spur or isolator before testing the circuit.
              </li>
            </ul>
            <p>The A4:2026 procedure (Reg 643.3.3):</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Identify equipment that needs disconnection. Disconnect at the most appropriate isolator (spur, FCU, plug-in connection).</li>
              <li>Run the standard 500 V DC test per Reg 643.3.2. Confirm the cabling itself meets the 1.0 MΩ minimum (and ideally reads in the high megohms / gigohms).</li>
              <li>Reconnect the equipment.</li>
              <li>Apply a 250 V DC test between live conductors and the protective conductor. Minimum acceptance: 1.0 MΩ.</li>
              <li>Document both test results — note which equipment was disconnected for the main test, and the 250 V follow-up reading.</li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3.3 (Equipment likely to influence the test or be damaged) — verbatim"
            clause="Where connected equipment is likely to influence the measurement or result of the test, or be damaged, the test shall be applied prior to the connection of such equipment, in accordance with Table 64. Following connection of the equipment, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement. The insulation resistance shall have a value of at least 1 MΩ."
            meaning={
              <>
                The two-step test was added in A4:2026 to close a gap: previously, you would
                disconnect electronics, test the cabling, reconnect, and walk away — the
                electronics themselves were never tested. Now, after reconnection, the gentler
                250 V DC test confirms the equipment\'s own insulation between live and CPC is
                sound. 1 MΩ minimum applies to both tests.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.3.3."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Method on site — single-phase domestic</ContentEyebrow>

          <ConceptBlock
            title="The IR test step by step"
            plainEnglish="Verify isolation. Identify and disconnect electronics. Set the MFT to 500 V IR. Combine L and N at the CU. Test L+N to E. Then test L to N. Record. Reconnect electronics, run the 250 V follow-up."
            onSite="Per circuit, not whole-installation. Each protective device taken in turn. Linking L and N saves time but you can test L-E and N-E separately if you need to localise a fault."
          >
            <p>The standard sequence for a domestic CU IR test:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify safe isolation.</strong> Per JIB sequence — circuit isolated, locked
                off, proven dead at the point of work.
              </li>
              <li>
                <strong>Identify electronics.</strong> Walk the circuit. Note: SPDs in the CU,
                LED dimmers in living areas, the EV charger isolator, integral electronic switches.
                Disconnect by unplugging, switching off at FCUs, or lifting from terminals as
                appropriate.
              </li>
              <li>
                <strong>Switch every functional switch ON</strong> so the entire downstream cable
                is included in the test. Two-way switches: set both throws to the closed position.
              </li>
              <li>
                <strong>Set the MFT to the 500 V IR range.</strong> Connect leads.
              </li>
              <li>
                <strong>Test L to E:</strong> probe to L of the protective device, probe to the
                earth bar (or to the CPC of the circuit if isolated). Press TEST. Hold until reading
                stabilises. Record.
              </li>
              <li>
                <strong>Test N to E:</strong> probe to the N terminal of the circuit, probe to
                earth. Press TEST. Record.
              </li>
              <li>
                <strong>Test L to N:</strong> probe to L, probe to N. Press TEST. Record.
              </li>
              <li>
                <em>Optional shortcut for the live-to-earth tests:</em> link L and N at the CU,
                then probe to the linked node and to earth. Single test reading. Faster on
                multi-circuit boards but loses some diagnostic detail if it fails.
              </li>
              <li>
                <strong>Reconnect electronics.</strong> Verify each device is correctly back in
                circuit.
              </li>
              <li>
                <strong>Apply 250 V DC follow-up test</strong> per Reg 643.3.3 between L+N (linked)
                and earth. Record reading — minimum 1.0 MΩ.
              </li>
              <li>
                <strong>Move to next circuit.</strong> Do not skip — every circuit gets its own
                set of readings.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Pre-test prep — what to disconnect and why"
            plainEnglish="Before the 500 V DC test, walk the circuit with a checklist and identify every electronic device. Each one needs lifting, isolating or unplugging. Forgetting just one device gives a false low reading or destroys the device."
            onSite="Build a per-circuit disconnect checklist into your test pack. SPDs, AFDDs, LED drivers, dimmers, RCDs that fail at 500V (rare but exists), smart switches, EV charger control boards — all on the list."
          >
            <p>
              The disconnect-required equipment list has grown significantly with A4:2026 because
              of the proliferation of electronics in modern installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SPD (Surge Protective Device) modules.</strong> Almost universal in
                modern UK CUs since A2. Pull the module from its base before any 500 V DC IR
                testing — the SPD's internal MOV will clamp the test voltage to a few hundred
                volts, giving a false low reading and either tripping the SPD's disconnect
                mechanism or sacrificing the MOV.
              </li>
              <li>
                <strong>AFDD (Arc Fault Detection Device) units.</strong> Required on certain
                higher-risk installations under A4:2026. Internal electronics vulnerable to DC
                stress.
              </li>
              <li>
                <strong>LED drivers and dimmer modules.</strong> Input EMC filter capacitors
                conduct DC test current readily, giving false low readings. Many dimmers will
                not survive a 500 V DC stress on the input. Lift these at the FCU or remove
                from the lighting circuit before testing.
              </li>
              <li>
                <strong>EV charger control boards.</strong> Most have isolation monitoring
                circuitry (PME fault detection) that will trigger or be damaged. Disconnect at
                the charger's own isolator, not just at the CU.
              </li>
              <li>
                <strong>Smart switches and smart sockets.</strong> Anything with a microprocessor
                and a transformer or capacitor coupling to mains.
              </li>
              <li>
                <strong>Some types of RCD/RCBO.</strong> Rare but exists — certain electronic
                RCDs have an internal electronics path that the 500 V test can trigger. Check
                manufacturer data; if in doubt, disconnect at the RCD's load side.
              </li>
            </ul>
            <p>
              <strong>Workflow:</strong> walk the circuit (or whole CU) before testing, list
              every electronic device by location, disconnect each one, tick off the list. Run
              the 500 V DC tests. Reconnect everything. Apply the A4:2026 250 V DC follow-up
              test. Document the disconnections on the STR notes column.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Result interpretation — the 1 MΩ vs 100 MΩ judgement call"
            plainEnglish="Table 64 says ≥ 1 MΩ is a pass. But healthy new wiring should read in the high megohms or above 999 MΩ. Anything between 1 MΩ and 100 MΩ technically passes but tells you something is degrading insulation — investigate before sign-off."
            onSite="A 1.2 MΩ reading on a brand-new install is a red flag, not a pass. The Table 64 minimum is the absolute floor for installation safety, not a target for new work."
          >
            <p>The interpretation framework for IR readings:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>&gt; 999 MΩ (off scale, or "OL" on the IR range).</strong> Healthy
                insulation. The leakage current is below the meter's detection threshold.
                Document as "&gt;999 MΩ" or "&gt;200 GΩ" depending on the instrument range. This
                is what new T&E should read in normal conditions.
              </li>
              <li>
                <strong>100-999 MΩ.</strong> Acceptable. Some leakage is being detected — common
                in slightly damp environments, with some classes of electronic load left in, or
                where there's been brief surface contamination. Worth a moment to consider but
                not a defect.
              </li>
              <li>
                <strong>10-100 MΩ.</strong> Pass per Table 64 but warrants a quick investigation.
                Most likely cause on a domestic install: residual moisture in newly installed
                walls, a slightly compromised back-box, or surface contamination. Identify and
                fix before sign-off if you can.
              </li>
              <li>
                <strong>1-10 MΩ.</strong> Pass per Table 64 but a real concern. Real insulation
                degradation is happening — water ingress, a damaged cable sheath, a partial
                breakdown at a termination. Find and fix before sign-off; if you cannot identify
                the cause, document fully on the STR notes column with recommendation for early
                periodic re-inspection.
              </li>
              <li>
                <strong>&lt; 1 MΩ.</strong> FAIL. Do not energise. Real insulation breakdown
                somewhere in the circuit. Common causes: pinched cable in a back-box, water
                ingress at an outdoor accessory, neutral conductor touching CPC at a terminal.
                Find, fix, retest.
              </li>
            </ul>
            <p>
              The 1 MΩ pragmatic threshold dates back to the 17th edition era when more
              installations had genuinely degraded insulation than today. With modern PVC
              insulation systems and dry installations, anything below 100 MΩ is unusual on a
              new install and should be investigated even though it passes the regulation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="When to use 250 V vs 500 V vs 1000 V"
            plainEnglish="Table 64 has three rows. SELV/PELV (extra-low voltage protected systems) → 250 V test. Up to 500 V (the LV catchall covering 230 V single-phase and 400 V three-phase) → 500 V test. Above 500 V → 1000 V test."
            onSite="For 95% of UK domestic and small commercial work the answer is 500 V DC. SELV is for 12 V LED drivers and similar; 1000 V is for sub-mains feeders above 500 V — rarely seen in standard work."
          >
            <p>The test voltage decision matrix per BS 7671 Reg 643.3.2 and Table 64:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SELV (Separated Extra Low Voltage) and PELV (Protective Extra Low
                Voltage):</strong> 250 V DC test, minimum 0.5 MΩ. Use for 12 V LED downlight
                circuits (transformer side downstream), shaver socket SELV side, marine /
                outdoor low-voltage lighting. The lower test voltage protects the SELV
                equipment which is not designed for 500 V DC stress.
              </li>
              <li>
                <strong>Circuits up to and including 500 V (excluding the SELV/PELV row):</strong>
                500 V DC test, minimum 1.0 MΩ. The catchall for standard 230 V single-phase and
                400 V three-phase circuits. This is the row that covers the vast majority of UK
                installation work — domestic, commercial, light industrial.
              </li>
              <li>
                <strong>Circuits above 500 V:</strong> 1000 V DC test, minimum 1.0 MΩ. Sub-mains
                feeders at higher voltages, certain industrial supplies. Rarely encountered in
                standard work — when you do meet them, the higher test voltage matches the
                higher operating voltage of the cable's insulation system.
              </li>
            </ul>
            <p>
              The principle: test voltage is roughly twice the rated voltage of the circuit
              (within the band). Higher test voltage stresses the insulation more, revealing
              partial breakdowns that lower-voltage tests would miss. But test too high and you
              can damage equipment or the insulation itself — Table 64 is the calibrated balance
              of those two pressures.
            </p>
            <p>
              <strong>Note on FELV (Functional Extra Low Voltage):</strong> not covered by the
              SELV/PELV row of Table 64 — FELV must be tested at the test voltage applied to its
              primary side and meet the LV requirements. Most installers don't encounter pure
              FELV systems often, but it's the catch — a FELV circuit gets tested at 500 V DC,
              not 250 V DC.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Common IR fault patterns and what they mean"
            plainEnglish="A failing IR reading isn't random — it has a pattern that points to specific causes. Knowing the patterns lets you go straight to the likely fault location instead of tracing the whole circuit."
            onSite="Most IR failures on real jobs come from a small set of repeat causes: pinched cable at a back-box, water ingress at an outdoor accessory, a wet plaster wall around a freshly chased cable, a misterminated neutral touching the CPC."
          >
            <p>The classic IR fault patterns and where to look:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steady reading around 0.4-0.8 MΩ on L-E or N-E.</strong> Most likely a
                pinched cable at a back-box or junction box where the sheath has been compressed
                against a sharp metal edge. Trace by isolating sections — disconnect at one
                accessory at a time and re-test until the reading jumps. The pinched accessory
                is the one that fixes it.
              </li>
              <li>
                <strong>Reading climbs slowly during the test (e.g. 0.3 MΩ rising to 5 MΩ over
                15 seconds).</strong> Capacitive coupling — usually because an electronic device
                was left in. Most common cause: a forgotten LED driver or SPD. Stop the test,
                identify the device, disconnect, retest.
              </li>
              <li>
                <strong>Reading varies wildly between repeat tests on the same circuit.</strong>
                Intermittent contact — typically a damaged conductor strand making and breaking
                contact at a terminal. Often associated with vibration (e.g. circuits near
                refrigerator compressors or HVAC plant). Re-make the suspect terminal.
              </li>
              <li>
                <strong>Failing reading only on N-E, not L-E.</strong> Strong indication of a
                wired-up neutral that's touching the earth bar or earth conductor somewhere — a
                "borrowed neutral" or a misterminated N at the consumer unit. Check the CU
                terminations first.
              </li>
              <li>
                <strong>Failing reading on outdoor or bathroom circuits in damp conditions.</strong>
                Water ingress at an outdoor accessory (junction box, garden socket) or at a
                bathroom IP-rated fitting that's been incorrectly sealed. Inspect and re-seal.
                Often improves over a few hours of dry weather but doesn't fix permanently
                without a re-seal.
              </li>
              <li>
                <strong>Failing reading on a brand-new circuit through freshly plastered walls.</strong>
                Residual moisture in the plaster carrying leakage. Often improves significantly
                over a few weeks as the plaster dries. Best practice: don't sign off until the
                plaster is fully dry, or re-test on a follow-up visit and amend the STR.
              </li>
            </ul>
            <p>
              Method of investigation: when an IR fault is found, work the circuit in halves —
              isolate at the midpoint, test each half. The half that still fails contains the
              defect. Halve again until you've localised to a single accessory or cable section.
              On a long radial this takes 10-15 minutes; on a short circuit, 3-5 minutes.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Leaving the SPD module connected and reading 0.05 MΩ across the board"
            whatHappens={
              <>
                You start the IR test on a CU with an SPD installed at the incoming side. You forget
                to lift the SPD module out of its base. Every circuit reading comes in at around
                0.05 MΩ — well below the 1.0 MΩ minimum. You panic, suspect every cable in the
                house is failing, start tracing faults that don\'t exist. Eventually somebody notices
                the SPD and you remove it, retest, and every circuit reads above 999 MΩ.
              </>
            }
            doInstead={
              <>
                Always identify and disconnect the SPD before any IR testing. Most domestic CU SPD
                modules are designed to lift out of a base for exactly this reason — pull the
                module, set it aside, run the tests, refit when done. After refitting apply the
                A4:2026 250 V DC follow-up to confirm the SPD itself is sound. Same routine for
                AFDDs, smart-switch modules and any other SPD-style protection in the CU.
              </>
            }
          />

          <CommonMistake
            title="Testing the whole CU as one and getting a low reading"
            whatHappens={
              <>
                On a 12-circuit CU you decide to save time by linking all the L and N conductors
                at the bus and running one test L+N to E. Reading: 6 MΩ. You think there is a
                fault. You spend 30 minutes localising and find that every individual circuit reads
                above 800 MΩ. The 6 MΩ was just twelve good circuits in parallel — Ohm\'s law on
                paralleled leakage paths.
              </>
            }
            doInstead={
              <>
                Test every distribution circuit separately, as Reg 643.3.2 explicitly states. The
                per-circuit reading is what matters and is what goes on the schedule of test
                results. Twelve good circuits at above 100 MΩ each is twelve passes; combined as a
                whole-installation reading the same circuits look like a single failing reading.
                Per-circuit testing is also more diagnostic when a real fault appears.
              </>
            }
          />

          <Scenario
            title="IR test on a domestic CU swap-out — 12 circuits with SPD and dimmers"
            situation={
              <>
                You are commissioning a new CU on a kitchen-and-rewire job. Twelve circuits all on
                Type B RCBOs, an integral SPD module on the incoming side, three lighting circuits
                with electronic dimmers in living areas, a kitchen ring with no electronic loads,
                a separate cooker circuit, an EV charger sub-circuit, and the usual mix of
                non-electronic radials and lighting. You need to get the IR phase signed off and
                progress to polarity testing.
              </>
            }
            whatToDo={
              <>
                Pre-test prep: verify isolation across the whole CU; identify the SPD module and
                lift it out of its base; identify the three dimmers and switch them at the wall
                so they are in the off position (or remove and replace with temporary blanks if
                they are removable); identify the EV charger sub-circuit and isolate at the
                charger\'s own isolator; switch every functional switch on so all downstream
                cabling is included.
                <br />
                <br />
                Per-circuit tests: 500 V DC, link L and N at the protective device, probe to
                earth bar — record. Probe L to N (with the link removed) — record. Repeat for
                every circuit. Document anything below 100 MΩ for further investigation.
                <br />
                <br />
                Reconnect electronics: SPD module back in base; dimmers re-fitted; EV charger
                isolator returned. Apply 250 V DC follow-up test per Reg 643.3.3 between linked
                L+N and earth at the incoming side of the CU — record this single
                whole-installation reading; confirm ≥ 1.0 MΩ. Document on STR with note "Initial
                500 V test with SPD/dimmers/EV control disconnected per Reg 643.3.3; 250 V
                follow-up reading taken at incoming side after reconnection: X MΩ."
              </>
            }
            whyItMatters={
              <>
                The two-step procedure is mandatory under A4:2026 for installations with
                disconnect-required equipment — which now covers most domestic CUs because of the
                near-universal SPD requirement and the prevalence of LED dimmers. Recording both
                the 500 V cabling test and the 250 V whole-installation follow-up gives the next
                inspector a complete picture and proves you followed the regulation correctly.
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

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 A4:2026 Reg 643.3.1 requires IR measurement (a) between live conductors and (b) between live conductors and the earthed protective conductor. L and N may be linked for the live-to-earth test.',
              'Table 64: SELV/PELV at 250 V DC, 0.5 MΩ minimum. Up to 500 V at 500 V DC, 1.0 MΩ minimum. Above 500 V at 1000 V DC, 1.0 MΩ minimum. Memorise the middle row.',
              'Healthy new wiring should read >100 MΩ on a 500 V DC test. 1.0 MΩ is the absolute pass-threshold; anything between 1 and 100 MΩ passes the regulation but warrants investigation.',
              'Disconnect SPDs, LED dimmers, smart switches, EV charger control boards, AFDDs and similar electronics before the 500 V DC test or they will be damaged or give false low readings.',
              'A4:2026 Reg 643.3.3 introduced the 250 V DC follow-up test after reconnection — minimum 1 MΩ — to confirm the equipment\'s own insulation is sound.',
              'Test each distribution circuit separately, not the whole installation in parallel. Parallel testing of multiple healthy circuits gives a falsely low aggregate reading.',
              'Switch every functional switch ON during testing so the full downstream cable is included. Note any sections that cannot be tested on the schedule of test results.',
              'A 0.45 MΩ reading is a fail. Find the fault (damaged sheath, pinched conductor, water ingress, mis-terminated neutral) and fix before energising — never sign off an installation that fails IR.',
            ]}
          />

          <Quiz title="Insulation resistance — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 Test ring final circuit
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 Test polarity
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
