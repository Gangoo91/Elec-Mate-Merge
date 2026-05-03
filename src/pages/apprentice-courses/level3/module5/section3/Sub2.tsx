/**
 * Module 5 · Section 3 · Subsection 2 — Continuity of protective conductors (R1+R2 and R2-only)
 * Maps to C&G 2365-03 / Unit 304 / LO5 / AC 5.1, 5.2, 5.3
 *   AC 5.1 — "state why it is necessary to verify continuity of protective bonding conductors, circuit protective conductors, and ring final circuit conductors"
 *   AC 5.2 — "state the methods for verifying continuity of protective conductors and ring final circuit conductors"
 *   AC 5.3 — "explain factors that affect conductor resistance values"
 * Layered: 2357 ELTK06 / continuity testing
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

const TITLE = 'Continuity of protective conductors — R1+R2 and R2-only | Level 3 Module 5.3.2 | Elec-Mate';
const DESCRIPTION =
  'The two methods for verifying continuity of protective conductors per Reg 643.2.1 — R1+R2 (line plus CPC end-to-end at every accessory) and R2-only (CPC alone via a wander lead from the MET). Instrument requirements, expected values from GN3 Table B1, and how the result feeds the Zs calc.';

const checks = [
  {
    id: 'm5-s3-sub2-method-choice',
    question: 'You are testing a final circuit on a TN-C-S domestic install. The CU is in the cupboard under the stairs and the furthest accessory is a ceiling rose in the back bedroom. Which method is usually quicker for that single circuit?',
    options: [
      'R2-only with a wander lead — faster because you only test the CPC.',
      'R1+R2 — temporarily link the line and CPC at the CU and measure between them at every accessory in turn. One trip out, one trip back, no wander lead to drag through the house, and the reading directly equals R1+R2 for the Zs calc.',
      'Insulation resistance test instead.',
      'Visual inspection only.',
    ],
    correctIndex: 1,
    explanation:
      'For a single radial final circuit on a domestic install, R1+R2 is normally the practical choice. Link L and CPC at the CU with a temporary jumper, then measure resistance between the L and CPC terminals at every accessory. The reading at the furthest point IS the R1+R2 used in Zs = Ze + (R1+R2). No wander lead, no second person required. R2-only with a wander lead becomes attractive on commercial sites where the CU is far from the work area, where R1 access is awkward, or where you specifically want to isolate the CPC test.',
  },
  {
    id: 'm5-s3-sub2-temperature-correction',
    question: 'You measure R1+R2 = 0.85 Ω on a Type B 32 A radial socket circuit. Ze = 0.30 Ω. Cable was at roughly 15 °C in an unheated loft when measured. A4:2026 Table 41.3 max Zs (B32) = 1.37 Ω. What do you compare against?',
    options: [
      'Compare measured Zs of 1.15 Ω directly against 1.37 Ω — pass.',
      'Apply the 0.8 rule of thumb: Zs(measured) must be ≤ 0.8 × Zs(table). For B32: 0.8 × 1.37 = 1.10 Ω. Measured Zs = 0.30 + 0.85 = 1.15 Ω. 1.15 &gt; 1.10 — FAIL the rule-of-thumb check. Either correct properly using GN3 Appendix B factors or investigate the high R1+R2.',
      'Subtract Ze from the limit and compare.',
      'No correction needed for cold cable.',
    ],
    correctIndex: 1,
    explanation:
      'Table 41.3 values are stated at conductor operating temperature (typically 70 °C for thermoplastic-insulated cable). When you measure cold cable the resistance is lower than it will be in service. The standard correction is the 0.8 rule of thumb (or the GN3 Appendix B per-degree correction). Always test the corrected value: Zs(measured) ≤ 0.8 × Zs(table). 1.15 Ω against 1.10 Ω is a fail — investigate. Common causes: poor termination at an accessory, undersized CPC, longer cable run than expected.',
  },
  {
    id: 'm5-s3-sub2-bonding-test',
    question: 'Per Reg 643.2.1 you must also verify continuity of main protective bonding conductors. The expected reading on the bond from the MET to an incoming gas service pipe (10 mm² Cu, ≈ 4 m run) is approximately:',
    options: [
      '0 Ω exactly.',
      'Around 0.01-0.03 Ω. 10 mm² Cu has roughly 1.83 mΩ/m at 20 °C; 4 m × 1.83 = 7.3 mΩ ≈ 0.007 Ω, plus terminations. Anything above ~0.05 Ω means a poor termination at the BS 951 clamp or the MET — investigate.',
      'Around 1 Ω.',
      'Anything below 100 Ω is fine.',
    ],
    correctIndex: 1,
    explanation:
      'Main protective bonding to extraneous-conductive-parts (gas, water, oil pipework, structural steel) must be electrically continuous from the MET to the bonding clamp. 10 mm² Cu = ~1.83 mΩ/m. A 4 m run = ~7 mΩ of cable, plus the resistance of the BS 951 clamp itself and the MET terminal. Total expected: 0.01-0.03 Ω. Higher readings = poor termination, corrosion at the clamp, or paint/coating between clamp and pipe. The point is not "low enough to pass" — it is "consistent with cable resistance plus good terminations".',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Reg 643.2.1 requires continuity testing of:',
    options: [
      'Live conductors only.',
      'All protective conductors — main protective bonding, supplementary bonding, circuit protective conductors (CPCs) — and the live conductors of ring final circuits. The test confirms the protective path from every exposed-conductive-part back to the MET is electrically intact.',
      'Just the main earthing conductor.',
      'Only the bond to the gas pipe.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.2.1 covers all protective conductors AND the live conductors of ring finals (the latter because a ring depends on both legs being intact for current sharing). The protective conductor coverage is comprehensive: main bonding (MET to extraneous-conductive-parts), supplementary bonding (in special locations), CPCs (within every final and distribution circuit). Each conductor verified independently — a missed bond can mean an extraneous-conductive-part rises to dangerous voltage during a fault.',
  },
  {
    id: 2,
    question: 'The continuity instrument output must be:',
    options: [
      'Mains voltage.',
      'A current of at least 200 mA at a no-load voltage between 4 V and 24 V — sufficient to burn through light surface oxidation at terminations and reveal intermittent contacts, but low enough to avoid energising potential faults if the conductor is unexpectedly partly live.',
      'Microamps only.',
      'Whatever the meter happens to deliver.',
    ],
    correctAnswer: 1,
    explanation:
      'Per Reg 643.2.1 and GN3 Section 4.3 — minimum 200 mA at 4-24 V no-load. The current is the working part: 200 mA pushes through the kind of poor contact that would give a misleading high reading at 1 mA from a basic multimeter. The voltage is deliberately limited so a partly-live conductor will not deliver dangerous current through the test leads. Modern multifunction testers (MFTs) like the Megger MFT1741+, Fluke 1664FC, or Kewtech KT64+ comply by default.',
  },
  {
    id: 3,
    question: 'For a 30 m run of 1.5 mm² Cu CPC at 20 °C, the expected R2 from GN3 Table B1 is approximately:',
    options: [
      '30 Ω.',
      'Around 0.36 Ω. 1.5 mm² Cu = approximately 12.10 mΩ/m at 20 °C. 30 × 0.01210 = 0.363 Ω. The R1+R2 for a 2.5/1.5 T&E 30 m circuit would be approximately 0.21 (R1) + 0.36 (R2) = 0.57 Ω at 20 °C, before the 0.8 correction for service temperature.',
      '3.6 Ω.',
      '0.036 Ω.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Table B1 lists "Resistance/metre or (R1 + R2)/metre (mΩ/m)" by csa and material. For 1.5 mm² Cu: ~12.10 mΩ/m at 20 °C. For 2.5 mm² Cu: ~7.41 mΩ/m. So 30 m of 1.5 mm² CPC reads ~0.36 Ω, and 30 m of 2.5/1.5 T&E reads ~0.57 Ω at the meter (R1+R2). Service temperature (typically 70 °C) raises these by ~20 % — hence the 0.8 measured-vs-tabulated correction.',
  },
  {
    id: 4,
    question: 'Setting up the R1+R2 test on a single radial circuit:',
    options: [
      'Leave everything connected and read between L and earth at the CU.',
      'Safely isolate. At the CU, identify the line and CPC of the circuit under test. Disconnect the line from the protective device and the CPC from the earth bar. Link the disconnected L and CPC together at the CU end with a low-resistance jumper. Test between L and CPC (or L and earth at the accessory) at the furthest accessory — the reading is R1+R2 for the circuit.',
      'Cut the cable to make a clean test point.',
      'Only test at the CU end.',
    ],
    correctAnswer: 1,
    explanation:
      'The standard R1+R2 method. The temporary CU-end link makes the L and CPC of the circuit a single loop the meter can measure end-to-end. The reading at the furthest accessory IS R1+R2 — feed it directly into Zs = Ze + (R1+R2). Test at every accessory on the way to spot intermittent breaks. Remove the link before re-energising and double-check polarity at the CU.',
  },
  {
    id: 5,
    question: 'R2-only with a wander lead is preferred when:',
    options: [
      'Always — never use R1+R2.',
      'The line conductor is not easily accessible at the CU end (e.g. busbar trunking systems), the circuit is part of a complex distribution network where you want to isolate the CPC verification, or the wander lead is more practical on a large commercial site (one person at the MET, radio contact with the tester at the accessory).',
      'When you forgot to bring a jumper.',
      'For domestic only.',
    ],
    correctAnswer: 1,
    explanation:
      'R2-only — connect a long wander lead from the MET to the meter, then read CPC continuity from the accessory back to the MET via the wander lead. The reading is R2 alone (subtract the wander lead resistance, which the MFT can null). Useful where R1 access is awkward, where you want a clean CPC test, or on a large site where running from CU to accessory is impractical. Both methods satisfy Reg 643.2.1 — choose by site practicality.',
  },
  {
    id: 6,
    question: 'A factor that significantly affects conductor resistance values:',
    options: [
      'Day of the week.',
      'Temperature. Copper has a temperature coefficient of approximately 0.004 / °C. A 1.5 mm² CPC reading 0.36 Ω at 20 °C will read approximately 0.43 Ω at 70 °C (full operating temperature) — a 20 % rise. This is why measured R1+R2 must be corrected (or the 0.8 factor applied to the table limit) before judging compliance against Table 41.3.',
      'Wire colour.',
      'Time of day.',
    ],
    correctAnswer: 1,
    explanation:
      'Temperature, conductor material, csa, and length. Copper resistivity rises with temperature (~0.4 % per °C). Aluminium is roughly 1.6 × the resistance of copper for the same csa. Length is linear: doubling the run doubles R. csa is inverse: doubling csa halves R. GN3 Section 1.5 details the corrections — the 0.8 rule of thumb covers the typical 20 °C measured to 70 °C operating temperature shift.',
  },
  {
    id: 7,
    question: 'If a CPC continuity reading on a 20 m radial 2.5/1.5 mm² T&E circuit comes in at 0.85 Ω at 20 °C, you should:',
    options: [
      'Sign it off — anything below 1 Ω is fine.',
      'Investigate. Expected R2 for 20 m of 1.5 mm² Cu is approximately 0.24 Ω. 0.85 Ω is roughly 3.5 × the expected value — strongly suggests a poor termination (loose terminal at an accessory, oxidised connection in a junction box) or a partly broken CPC. Trace through the circuit, retighten or replace the suspect connection, retest.',
      'Move the meter to a different range.',
      'Repeat the test until you get a lower value.',
    ],
    correctAnswer: 1,
    explanation:
      'Sanity-check every reading against the expected value from GN3 Table B1 (resistance per metre × length × correction factor). A reading 3-4 × higher than expected is a finding to investigate, not an acceptable result. Common causes: backed-off terminal screws, oxidised crimp lugs, poor MET termination, broken cable strand. The fix is mechanical — tighten or remake the connection — and retest until the reading is consistent with first-principles calculation.',
  },
  {
    id: 8,
    question: 'GN3 notes that where accessory boxes are NOT connected to the fabric of the building or other earthed elements, the continuity reading represents:',
    options: [
      'R2 only.',
      'The sum of line and CPC resistance — R1 + R2 — i.e. the standard interpretation. Where accessory boxes ARE in contact with earthed metalwork (a metal back-box screwed to a metal stud, for example), parallel earth paths can lower the apparent R2, masking the true CPC resistance.',
      'Insulation resistance.',
      'Loop impedance.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 explains: the R1+R2 method assumes the circuit is the only earth path. In all-insulated installations with accessories not in contact with earthed metalwork, the reading equals R1+R2 cleanly. If accessories contact earthed metalwork (steel conduit, metal back-boxes touching steel studs), parallel paths develop and the reading can be lower than the true R1+R2. This is one reason supplementary bonding in special locations needs careful, separate verification.',
  },
];

const faqs = [
  {
    question: 'When do I use R1+R2 versus R2-only?',
    answer:
      'R1+R2 is the default for typical radial circuits — quick, gives the value you need for the Zs calc directly, no wander lead. R2-only is preferred when you need to verify the CPC alone (e.g. on a TT installation where the earth path matters specifically), where R1 is hard to access (busbar trunking, sealed CUs), or on large commercial sites where running between CU and accessory is impractical and a wander lead from the MET is more efficient. Both methods satisfy Reg 643.2.1; the choice is practical.',
  },
  {
    question: 'Why does the continuity reading have to come from a 200 mA-capable instrument?',
    answer:
      'Because low-current meters can show a misleading low resistance through a poor contact. A loose terminal might pass 1 mA happily and read 0.5 Ω, but at 200 mA the same contact heats, the apparent resistance climbs, and you see a real 5 Ω. The 200 mA test current burns through light oxidation and reveals intermittent contacts that would otherwise pass a casual ohmmeter check. Reg 643.2.1 mandates the capability; modern MFTs comply by default.',
  },
  {
    question: 'How do I null the test leads before measuring?',
    answer:
      'Every MFT has an auto-null function under the continuity range. Touch the two test probes together (or short them at the wander lead end), press the null button — the meter stores the lead resistance and subtracts it from subsequent readings. Without nulling, your readings include the lead resistance (typically 0.05-0.15 Ω) which on short circuit lengths can be a significant fraction of the actual R1+R2. Re-null whenever you change leads or swap to a wander lead.',
  },
  {
    question: 'What about the bonding test — do I follow the same method?',
    answer:
      'Bonding continuity is the same instrument, same prove-test ritual. Connect one probe at the MET, the other at the bonding clamp on the extraneous-conductive-part (gas pipe BS 951 clamp, water pipe clamp, structural steel). Read continuity. Expected value is the cable resistance per metre (10 mm² Cu = ~1.83 mΩ/m) times length, plus terminations — typically under 0.05 Ω for a short run. Anything significantly higher means a poor clamp, paint between the clamp and the pipe, or a deteriorated MET terminal. Document on the schedule.',
  },
  {
    question: 'How do I correct for temperature when comparing against Table 41.3?',
    answer:
      'Two options. (1) Rule of thumb: measured Zs must be ≤ 0.8 × table Zs. The 0.8 factor accounts for conductors at ambient measurement temperature (~20 °C) versus the Table 41.3 limit which assumes operating temperature (~70 °C for thermoplastic-insulated cable). (2) Full correction: GN3 Appendix B gives per-material temperature coefficients. For Cu, multiply measured R by (1 + 0.004 × (T_op − T_measured)). Most apprentices use the 0.8 rule for routine work and reserve the full correction for borderline cases.',
  },
  {
    question: 'What if the reading drifts during the test?',
    answer:
      'Drift means an unstable connection somewhere in the loop — a loose terminal, a stranded conductor with a few broken strands carrying intermittent contact, or a lead probe not making solid contact with the test point. Press the probes firmly. If the drift continues, work back through the circuit checking terminations. A stable reading is the prerequisite for documenting it on the schedule. An unstable reading documented as a single value is misleading verification.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 2"
            title="Continuity of protective conductors — R1+R2 and R2-only"
            description="The two methods for verifying continuity of CPCs and bonding per Reg 643.2.1. Instrument requirements (200 mA at 4-24 V), expected values from GN3 Table B1, the 0.8 temperature correction, and how the result feeds the Zs calc."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 643.2.1 mandates continuity testing of every protective conductor — main bonding, supplementary bonding, every CPC. Test instrument: 200 mA at 4-24 V no-load (Reg 643.2.1).',
              'R1+R2 method: link L and CPC at the CU, read between L and CPC at every accessory. The reading at the furthest point IS R1+R2 for the Zs calc.',
              'R2-only method: wander lead from the MET, read CPC alone at every accessory. Used where R1 access is awkward or you want the CPC isolated.',
              'Sanity-check every reading against GN3 Table B1 (mΩ/m) × length. Apply the 0.8 rule when comparing measured Zs against A4:2026 Table 41.3 limits.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State why continuity testing of protective bonding conductors, CPCs and ring final live conductors is required (AC 5.1).',
              'Describe the R1+R2 method and the R2-only wander lead method, and choose appropriately for the site (AC 5.2).',
              'Identify factors that affect conductor resistance values — temperature, csa, material, length — and apply the 0.8 correction (AC 5.3).',
              'Set up the continuity test instrument: lead null, 200 mA range, prove-test-prove of the underlying isolation.',
              'Sanity-check measured continuity against GN3 Table B1 expected values for the cable size and route length.',
              'Diagnose poor terminations, broken strands, and parallel earth paths from anomalous readings.',
              'Document R1, R2 and R1+R2 columns on the Schedule of Test Results (Appendix 6).',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Why continuity matters</ContentEyebrow>

          <ConceptBlock
            title="The CPC is the protective path — verify or it is just a wire"
            plainEnglish="The protective conductor is the route by which fault current returns to source so the protective device sees the fault and disconnects. If the CPC is broken anywhere — loose terminal at a back-box, oxidised crimp in a JB, wrongly terminated at the MET — fault current has nowhere to go, exposed metal stays live, and the protective device never sees the fault."
            onSite="Continuity is the mechanical proof that the CPC is intact and the bonding paths are continuous. It is the foundation under every later test — Zs depends on the CPC; ADS depends on Zs being low enough; RCD operation depends on a fault being detectable as residual current. None of that works if the CPC is broken."
          >
            <p>
              The Reg 643.2.1 continuity test verifies three categories of protective conductor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main protective bonding conductors.</strong> From the MET to every
                extraneous-conductive-part (gas service pipe, water service pipe, oil pipework,
                structural steel, lightning protection earthing). Sized per Reg 544.1 — for
                TN-C-S typically 10 mm² Cu (or larger if the supply earth is bigger).
              </li>
              <li>
                <strong>Supplementary protective bonding conductors.</strong> In special locations
                (bathrooms before the additional protection exemption applied, swimming pools,
                medical locations). Bonds simultaneously-accessible exposed and extraneous parts
                local to the location.
              </li>
              <li>
                <strong>Circuit protective conductors (CPCs).</strong> The earth conductor in
                every final and distribution circuit, from the MET out to every
                exposed-conductive-part on that circuit (every metal accessory, every Class I
                appliance termination point).
              </li>
            </ul>
            <p>
              Each is tested independently — a broken bond will not be revealed by a CPC test
              and vice versa. Document each on the relevant schedule: bonding on the Schedule of
              Inspections, CPC R1+R2 (or R2) per circuit on the Schedule of Test Results.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.2.1 (Continuity of conductors) and IET GN3 Section 4.3 (instrument requirements)"
            clause="The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors. The continuity test instrument shall have a no-load voltage between 4 V and 24 V and a short-circuit current of not less than 200 mA."
            meaning={
              <>
                Sub-clause (a) is the mandate for continuity testing of every protective
                conductor. The instrument capability — 200 mA at 4-24 V — is the practical
                requirement that distinguishes a verification-grade tester from a basic multimeter.
                The current is enough to detect intermittent contacts; the voltage is low enough
                to be safe if a conductor is unexpectedly partly live.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.1, with instrument capability per IET GN3 Section 4.3."
          />

          <SectionRule />

          <ContentEyebrow>Method 1 — R1+R2 (the default for radial circuits)</ContentEyebrow>

          <ConceptBlock
            title="Link L and CPC at the CU, read between them at every accessory"
            plainEnglish="Disconnect the line and CPC of the circuit at the CU. Bridge them together with a low-resistance jumper. Walk the circuit. At every accessory, measure resistance between L and CPC. The reading at the furthest accessory is R1+R2 for the circuit — exactly the value you need for Zs."
            onSite="A short copper bar or a piece of stout 4 mm² conductor with crimped ferrules makes a reliable jumper. A wander piece of 1 mm² T&E with bare ends does not — the jumper resistance becomes a significant error on short circuits."
          >
            <p>Step-by-step R1+R2:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Verify safe isolation per the prove-test-prove ritual (Sub 1).
              </li>
              <li>
                At the CU: identify the line and CPC of the circuit under test. Disconnect L
                from the protective device terminal; disconnect CPC from the earth bar. Tag both
                so they are not re-landed in the wrong terminal at the end.
              </li>
              <li>
                Bridge L and CPC together at the CU end with a low-resistance jumper. The jumper
                makes one continuous loop out of the circuit's L and CPC.
              </li>
              <li>
                Null the MFT continuity leads — touch the probes together, press the null button.
                The meter zeroes the lead resistance.
              </li>
              <li>
                At every accessory in turn (start at the nearest, work to the furthest), connect
                the MFT probes to the L and CPC (or earth) terminals. Press TEST. Note the
                reading.
              </li>
              <li>
                The reading at the furthest accessory is R1+R2 for the circuit. Document on the
                Schedule of Test Results in the R1+R2 column.
              </li>
              <li>
                After testing: remove the jumper, re-land L into the protective device terminal,
                CPC into the earth bar. Visual check polarity. Then proceed to insulation
                resistance (Sub 4).
              </li>
            </ol>
            <p>
              <strong>Sanity check the reading against expected.</strong> Use GN3 Table B1
              (resistance per metre by csa and material). For 2.5/1.5 mm² T&E at 20 °C: R1
              ≈ 0.00741 Ω/m, R2 ≈ 0.01210 Ω/m. So a 25 m radial run reads
              R1+R2 ≈ 25 × (0.00741 + 0.01210) = 0.49 Ω. If your reading is significantly
              higher (1 Ω+), there is a poor termination or a broken strand somewhere — investigate
              before signing off.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET GN3 9th Ed:2022 — Section 1.5 / Appendix B (interpretation of R1+R2 readings)"
            clause="Where the installation has all-insulated wiring and the cable accessories are not in contact with earth, then the described continuity test measures (R1 + R2), i.e. the resistance of the line conductor R1 plus the resistance of the protective conductor R2 for that circuit. Where accessory boxes and similar are not connected to the fabric of the building or other earthed elements, the measured continuity readings shall be interpreted as the sum of line and protective conductor resistances. The measured Ze can be added to circuit (R1 + R2) values to determine Zs for verification of disconnection times."
            meaning={
              <>
                GN3 explains the interpretation. In a clean all-insulated install with no parallel
                earth paths, the R1+R2 reading is exactly that — the sum of line and CPC
                resistance for the circuit. Add Ze and you have Zs for compliance against Table
                41.3. Where parallel earth paths exist (metal back-boxes touching earthed steel,
                conduit systems, structural earthing), the reading can be lower than the true
                R1+R2 — a known limitation that makes verification of the CPC alone (R2-only)
                more reliable in certain installations.
              </>
            }
            cite="Source: IET Guidance Note 3, 9th Edition (2022, A4 corrected), Section 1.5 and Appendix B."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Method 2 — R2-only with a wander lead</ContentEyebrow>

          <ConceptBlock
            title="Wander lead from the MET, read CPC alone at every accessory"
            plainEnglish="Connect a long lead from the meter to the MET. Walk to each accessory with the meter. Touch the meter's other probe to the CPC at the accessory. The reading is R2 for that accessory — the resistance of the CPC alone, from MET to that point."
            onSite="The wander lead has its own resistance. Null the lead AT THE FAR END before testing — touch the wander probe back to the meter probe at the accessory and zero. That removes the lead from the reading."
          >
            <p>Step-by-step R2-only:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Verify safe isolation. Connect a long wander lead (typically 30-50 m, suitable
                gauge to keep its resistance low) between one MFT probe terminal and the MET.
              </li>
              <li>
                Walk the wander lead's free end to the first accessory.
              </li>
              <li>
                Null the leads — touch the wander lead probe to the local MFT probe at the
                accessory, press null. The meter zeroes the wander lead resistance plus the
                second probe lead.
              </li>
              <li>
                Connect the local MFT probe to the CPC at the accessory. Press TEST. Reading is
                R2 from MET to that accessory.
              </li>
              <li>
                Move to the next accessory. Re-null if leads have changed contact. Continue.
              </li>
              <li>
                Document each R2 in the R2 column on the Schedule of Test Results, or note the
                highest as the circuit R2 if recording one value per circuit.
              </li>
            </ol>
            <p>
              <strong>When to choose R2-only:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                CU is in an awkward location (sealed busbar trunking termination, locked meter
                room) and you cannot easily set up the R1+R2 jumper.
              </li>
              <li>
                Large commercial site where running between CU and far accessories on every
                circuit is impractical — one technician at the MET, one walking with the meter.
              </li>
              <li>
                You want to verify the CPC in isolation — for example on a TT installation where
                the earth path is the focus.
              </li>
              <li>
                Periodic inspection where you are sampling and the wander lead is the practical
                tool for the day's work pattern.
              </li>
            </ul>
            <p>
              <strong>Limitation:</strong> R2-only does not give you R1+R2 directly. To compute
              Zs you would need R1 separately (or measure Zs by live test in Section 4). On a
              TN system R1+R2 is the cleaner workflow; on TT or where CPC isolation is the
              priority, R2-only is the better tool.
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

          <ContentEyebrow>Bonding continuity — the same instrument, the MET as one probe point</ContentEyebrow>

          <ConceptBlock
            title="Verify every main and supplementary bond from MET to clamp"
            plainEnglish="Bonding tests use the same MFT in continuity mode. One probe at the MET, the other at the BS 951 clamp on the gas pipe, water pipe or structural steel. Reading should be tiny — 10 mm² Cu has approximately 1.83 mΩ/m, so a 4 m bond reads under 0.03 Ω. Anything higher is a poor termination."
            onSite="Look at the clamp itself. BS 951 clamps need clean metal-to-metal contact. Pipe paint, corrosion, plumber's tape between clamp and pipe — all cause poor continuity. The cable to the MET is rarely the problem; the clamp termination almost always is."
          >
            <p>Bonding continuity workflow:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Verify safe isolation (the MET should already be at earth potential, but the
                circuits feeding the MET should be isolated for the test).
              </li>
              <li>
                Identify each main bonding conductor at the MET and trace to its clamp on the
                extraneous-conductive-part. Look at the BS 951 clamp — clean? Tight? Pipe
                conductive at the clamp point?
              </li>
              <li>
                Null the leads. One MFT probe firmly on the MET busbar / earth block. Other probe
                on the bonding clamp itself (not on the cable — the clamp termination is the
                potential failure point).
              </li>
              <li>
                Press TEST. Note the reading. Expected: under 0.05 Ω for a typical 4-6 m run of
                10 mm² Cu, including terminations.
              </li>
              <li>
                Repeat for every main bond (gas, water, oil, structural steel, lightning earthing).
                Document each on the Schedule of Inspections.
              </li>
              <li>
                Supplementary bonds in special locations (older bathroom installations etc.):
                same method, both ends of the bond should be on simultaneously-accessible
                conductive parts.
              </li>
            </ol>
            <p>
              <strong>Expected readings (10 mm² Cu, 20 °C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 m bond: ~0.002 Ω cable + clamp ≈ 0.01-0.02 Ω total</li>
              <li>4 m bond: ~0.007 Ω cable + clamp ≈ 0.02-0.04 Ω total</li>
              <li>10 m bond: ~0.018 Ω cable + clamp ≈ 0.03-0.06 Ω total</li>
            </ul>
            <p>
              Anything significantly higher than these ranges signals a clamp problem, a poor MET
              termination, or a damaged cable. Investigate, remediate, retest.
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

          <ContentEyebrow>Factors that affect conductor resistance</ContentEyebrow>

          <ConceptBlock
            title="Temperature, csa, material, length — and how to correct"
            plainEnglish="Conductor resistance changes with temperature (copper rises ~0.4 % per °C), drops with bigger csa (inverse), is higher for aluminium than copper for the same csa, and scales linearly with length. Test readings are taken at ambient (cold) — Table 41.3 limits are stated at operating temperature (warm). The correction is the 0.8 rule of thumb, or full per-degree calc per GN3 Appendix B."
          >
            <p>The four factors and their practical effect:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Temperature.</strong> Copper temperature coefficient ≈ 0.004 / °C. A
                cable at 20 °C measured reads ~20 % lower resistance than the same cable at
                70 °C operating temperature. Hence the 0.8 multiplier on Table 41.3 limits when
                comparing to a measured value: Zs(measured) ≤ 0.8 × Zs(table).
              </li>
              <li>
                <strong>Cross-sectional area (csa).</strong> Inverse-proportional. 1.5 mm² Cu has
                ~12.10 mΩ/m; 2.5 mm² has ~7.41 mΩ/m; 4 mm² has ~4.61 mΩ/m. Doubling csa roughly
                halves the resistance per metre.
              </li>
              <li>
                <strong>Material.</strong> Copper is the standard. Aluminium has ~1.6 × the
                resistivity of copper — a 16 mm² Al CPC has roughly the same resistance as a
                10 mm² Cu CPC. Watch for Al on older or larger installations.
              </li>
              <li>
                <strong>Length.</strong> Linear. Doubling the cable run doubles the resistance.
                For long runs (commercial distribution, sub-mains over 50 m) the cable resistance
                dominates the R1+R2 calculation and may push Zs close to the Table 41.3 limit
                even with a healthy Ze.
              </li>
            </ul>
            <p>
              <strong>Worked correction example.</strong> 30 m of 2.5/1.5 mm² T&E radial.
              Expected R1+R2 at 20 °C from GN3 Table B1: 30 × (0.00741 + 0.01210) = 0.585 Ω.
              At 70 °C operating: 0.585 × (1 + 0.004 × 50) = 0.585 × 1.20 = 0.702 Ω. Ze on
              TN-C-S say 0.30 Ω. Operating Zs = 0.30 + 0.70 = 1.00 Ω. Table 41.3 limit for
              Type B 32 A = 1.37 Ω. Pass. Equivalent rule-of-thumb check: measured Zs (cold)
              = 0.30 + 0.585 = 0.885 Ω, against 0.8 × 1.37 = 1.10 Ω — pass.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Parallel earth paths — when R1+R2 reads lower than reality"
            plainEnglish="If a circuit's accessories are in contact with other earthed metalwork (metal back-boxes against steel studs, conduit systems, structural steel touching the CU enclosure), some of the test current finds an alternative path back through the building fabric. Your meter sees a lower R1+R2 than the cable alone would give — which sounds good but masks the true CPC condition."
            onSite="On steel-conduit installations or commercial sites with extensive structural steel, R2-only with a wander lead removes the parallel-path ambiguity for the CPC test. Worth using as the verification method on those jobs even if R1+R2 is the day-to-day default."
          >
            <p>
              The classical R1+R2 interpretation assumes the cable is the only path from L to
              CPC at the test point. In real installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Metal back-boxes touching earthed metalwork.</strong> The back-box bonds
                via its mounting screws to a metal stud, which connects to the building's
                structural steel, which earths via the lightning protection MET tail. Test
                current splits between the cable CPC and this parallel route.
              </li>
              <li>
                <strong>Steel conduit systems.</strong> The conduit itself acts as a parallel
                CPC, often with very low resistance for short runs — masking a broken or
                undersized cable CPC.
              </li>
              <li>
                <strong>Cable trays and ladder racks.</strong> Where the tray is bonded at the
                MET (per Reg 542.4), every cable terminating into a tray-mounted accessory has
                a parallel path via the tray.
              </li>
            </ul>
            <p>
              The fix in verification work: use R2-only with a wander lead on installations where
              parallel paths are likely. The wander lead's path is dedicated and known. The
              reading is the CPC alone, regardless of what the building fabric is doing.
              Document the method on the test record so the next inspector knows which technique
              gave the value.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Supplementary bonding continuity — the Ra check for the bonded zone"
            plainEnglish="In a special location (older bathroom installations, swimming pool zones, agricultural buildings), supplementary bonding ties simultaneously-accessible exposed and extraneous parts together. The continuity test is the same MFT in continuity mode — but the pass criterion shifts to the resistance-of-bond formula in Reg 415.2.2 (R ≤ 50 V / Ia)."
            onSite="On a pre-2008 bathroom that retains supplementary bonding, you'll see a 4 mm² Cu bond clamping the bath frame, the radiator pipework, the metal shower screen and the CPC of the lighting circuit at the local junction. The test is between any two points in that bonded set — should be a fraction of an ohm, well under the formula limit."
          >
            <p>
              Reg 415.2.2 sets the continuity criterion for supplementary bonding:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">R ≤ 50 V / Ia</p>
            <p>
              Where R is the resistance between the simultaneously-accessible parts and Ia is the current causing automatic operation of the protective device within 5 s (or 0.4 s for final circuits up to 32 A). Worked example for a B32 on a 2.5 mm² ring final:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ia for B32</strong> = 5 × 32 = 160 A (top of the magnetic instantaneous range).
              </li>
              <li>
                <strong>R limit</strong> = 50 / 160 = 0.31 Ω. Any reading below 0.31 Ω passes.
              </li>
              <li>
                <strong>Typical reading</strong> for a 2 m run of 4 mm² Cu plus two BS 951 clamps ≈ 0.02 Ω. Three orders of magnitude below the limit — substantial headroom.
              </li>
            </ul>
            <p>
              Document the supplementary bonding result on the Schedule of Inspections (the visual / continuity outcome line) and reference the calculated Ra limit. Where Reg 701.415.2 omits supplementary bonding because ADS conditions are met, record that decision and the verification readings (Zs at the affected sockets, RCD trip-time test) that support it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What gets recorded on the Schedule of Test Results"
            plainEnglish="The Appendix 6 schedule has a row per circuit. The continuity columns are R1+R2 (typically the value at the furthest point on the circuit) and R2 if the R2-only method was used. For ring finals: r1, rn, r2 end-to-end plus the R1+R2 derived from the cross-connection (Sub 3 of this section). Each value has units (Ω) and is documented with sufficient precision (typically 2 decimal places at the Ω level)."
          >
            <p>
              The data captured per circuit in the continuity section of the schedule:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R1+R2 (Ω)</strong> — value at furthest point on the circuit, end-to-end
                line plus CPC. Used directly in Zs = Ze + (R1+R2).
              </li>
              <li>
                <strong>R2 (Ω)</strong> — CPC alone, if R2-only method used. Useful as a
                cross-check or for circuits where R2 is the only verifiable parameter.
              </li>
              <li>
                <strong>For ring finals:</strong> r1, rn, r2 from end-to-end Part 1 (with the
                ring open). R1+R2 from the Part 3 cross-connection. See Sub 3 of this section.
              </li>
              <li>
                <strong>Polarity</strong> — tick or pass mark, recorded per circuit (Sub 5).
              </li>
            </ul>
            <p>
              The instrument used and its calibration date should be recorded once on the
              certificate (under Section J of an EIC, the test instruments declaration). The
              R1+R2 / R2 values appear per circuit. The pass / fail judgement is made by
              comparing measured Zs against Table 41.3 — recorded in the Zs column.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Forgetting to null the test leads before recording the reading"
            whatHappens={
              <>
                Test leads have resistance — typically 0.05-0.15 Ω for standard MFT leads, more
                if you have a long wander lead. You measure R1+R2 at an accessory and read 0.45
                Ω. You write it down. The actual cable resistance was 0.32 Ω; the rest was lead
                resistance. You have over-stated R1+R2 by 40 %, which on a borderline circuit
                could be the difference between pass and fail at Table 41.3.
              </>
            }
            doInstead={
              <>
                Null the leads at the start of every test session and whenever you change leads
                or swap to a wander lead. Touch the probes together (or to the wander lead end
                if using a wander), press the null button on the MFT. The meter stores the lead
                resistance and subtracts it from subsequent readings. Re-null every time you
                change leads. The null status is usually shown on the display — verify before
                each circuit.
              </>
            }
          />

          <Scenario
            title="Continuity testing a flat refurbishment kitchen radial — Megger MFT1741+"
            situation={
              <>
                Two-bedroom flat refurbishment in Manchester. Kitchen has been re-wired: a single
                radial 4 mm² T&E circuit feeds a built-in oven via a 32 A connection unit, route
                length approximately 18 m from the new metal-clad CU on the wall to the oven
                position behind the cabinet. TN-C-S supply, you have already measured Ze
                = 0.28 Ω at the CU during commissioning prep. Time to verify the circuit's
                continuity before insulation resistance.
              </>
            }
            whatToDo={
              <>
                Safe isolation per the JIB sequence, lock off the kitchen circuit RCBO, prove the
                voltage indicator on a Martindale VI-13800 proving unit before AND after testing
                the isolated point — the unit reads zero on the L-N at the CU. Proceed with
                R1+R2. At the CU: identify the kitchen circuit's L (lift from the RCBO terminal)
                and CPC (lift from the earth bar). Bridge them with a 4 mm² ferruled jumper. On
                the Megger MFT1741+, select continuity mode, touch the probes together, press
                the auto-null button — display shows 0.00 Ω. Walk to the oven connection unit,
                remove the front plate, connect probes to L and CPC at the accessory. Reading
                comes in at 0.32 Ω. Sanity check: 4 mm² Cu = ~4.61 mΩ/m; 18 m × (4.61 + 4.61)
                = 0.166 Ω at 20 °C (since 4 mm² T&E has 4 mm² CPC for some grades; if 4/1.5 then
                R1+R2 ≈ 18 × (4.61 + 12.10) = 0.301 Ω). The 0.32 Ω is consistent with 4/1.5 T&E
                plus terminations. Compute Zs = Ze + R1+R2 = 0.28 + 0.32 = 0.60 Ω. A4:2026
                Table 41.3 limit for Type B 32 A = 1.37 Ω; 0.8 × 1.37 = 1.10 Ω. 0.60 is comfortably
                below 1.10 → pass. Document on the Schedule of Test Results: R1+R2 = 0.32, Zs
                (calc) = 0.60. Remove the jumper, re-land L into the RCBO, CPC into the earth
                bar, double-check polarity by visual inspection. Proceed to insulation resistance
                test.
              </>
            }
            whyItMatters={
              <>
                Every step traceable, every reading sanity-checked against first-principles
                calculation, the result documented with clear units and headroom against the
                regulatory limit. This is what verification looks like on the schedule — not
                just a number scribbled in a column, but a number that ties to the cable size,
                the route length, and the disconnection time the protective device needs to
                achieve under fault. The next inspector picking up this EIC in five or ten years
                can re-test, get a similar reading, and trust the chain of evidence. That trust
                is the entire point of Reg 643.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (insulation resistance with connected equipment)"
            clause={
              <>
                Regulation 643.3 has been redrafted. The redraft clarifies requirements for
                testing insulation resistance where connected equipment is likely to influence
                the verification test or be damaged by the test. Where equipment is connected
                and the equipment is likely to influence the insulation resistance verification
                test or be damaged by other test voltages, a 250 V DC insulation resistance test
                following connection of the equipment shall be used.
              </>
            }
            meaning={
              <>
                Continuity testing comes before IR — and Reg 643.3 now gives explicit
                instruction for the IR step where electronic equipment cannot be
                disconnected: drop to 250 V DC. Older test schedules that fixed 500 V DC for
                everything risk damaging connected kit and producing misleading readings.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 643.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 643.2.1 mandates continuity testing of every protective conductor — main bonding, supplementary bonding, every CPC. Plus live conductors of ring finals.',
              'Test instrument capability: 200 mA at 4-24 V no-load. Modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) comply by default.',
              'R1+R2 method: link L and CPC at the CU, read between L and CPC at every accessory. Reading at furthest point IS R1+R2 for the Zs calc.',
              'R2-only method: wander lead from the MET, read CPC alone at every accessory. Use where R1 access is awkward, on large sites, or when isolating the CPC verification.',
              'Sanity-check every reading against GN3 Table B1 (mΩ/m × length). 1.5 mm² Cu = 12.10 mΩ/m; 2.5 mm² = 7.41 mΩ/m; 4 mm² = 4.61 mΩ/m at 20 °C.',
              'Apply the 0.8 rule when comparing measured Zs against A4:2026 Table 41.3 limits — accounts for cold cable measurement vs operating temperature.',
              'Null the test leads before every session and whenever leads change. Without nulling, lead resistance over-states R1+R2 by 0.05-0.15 Ω.',
              'Bonding continuity: same instrument, MET as one probe, BS 951 clamp as the other. Expected: under 0.05 Ω for typical 4-6 m of 10 mm² Cu. Higher = poor clamp termination.',
            ]}
          />

          <Quiz title="Continuity of protective conductors — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 The dead-test sequence
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Ring final 3-step test
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
