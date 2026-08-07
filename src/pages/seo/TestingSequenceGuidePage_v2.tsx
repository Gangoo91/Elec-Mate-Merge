import type { ReactNode } from 'react';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { CARD_PADDED, LABEL } from '@/components/seo/seoSurface';
import {
  ListOrdered,
  ShieldCheck,
  Calculator,
  FileCheck2,
  Mic,
  GraduationCap,
  Activity,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Local presentation helpers
//
// Every test section repeats the same four beats — what it proves, the
// method, pass/fail, and why it sits where it does in the order. One
// component instead of eight hand-rolled copies keeps them identical and
// stops the accent colour from creeping onto every line.
// -------------------------------------------------------------------

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-white/[0.08] pt-4 first:border-t-0 first:pt-0">
      <p className={`${LABEL} text-white`}>{label}</p>
      <p className="mt-2 text-white leading-relaxed">{children}</p>
    </div>
  );
}

function TestMeta({ state, reg }: { state: 'Dead test' | 'Live test'; reg: string }) {
  return (
    <p className="text-white text-[13px] font-semibold tracking-tight">
      {state} <span className="px-2">·</span> BS 7671 Reg {reg}
    </p>
  );
}

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Testing Sequence: 8 Tests in Order (BS 7671)';
const PAGE_DESCRIPTION =
  'The BS 7671 testing sequence in order: continuity, ring, insulation resistance, polarity, earth electrode — then loop impedance, PFC and functional testing. Reg 643.1 makes the order a requirement.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Testing Sequence', href: '/guides/testing-sequence-guide' },
];

const tocItems = [
  { id: 'sequence', label: 'The Sequence at a Glance' },
  { id: 'why-order-matters', label: 'Why the Order Matters' },
  { id: 'dead-tests', label: 'Dead Tests (De-energised)' },
  { id: 'test-1', label: '1. Continuity of Protective Conductors' },
  { id: 'test-2', label: '2. Ring Circuit Continuity' },
  { id: 'test-3', label: '3. Insulation Resistance' },
  { id: 'test-4', label: '4. Polarity' },
  { id: 'test-5', label: '5. Earth Electrode Resistance' },
  { id: 'live-tests', label: 'Live Tests (Energised)' },
  { id: 'test-6', label: '6. Earth Fault Loop Impedance' },
  { id: 'test-7', label: '7. Prospective Fault Current' },
  { id: 'test-8', label: '8. Functional Testing (incl. RCDs)' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const answerBox = {
  question: 'What is the correct electrical testing sequence?',
  answer:
    'Dead first, live second. 1. Continuity of protective conductors. 2. Continuity of ring final circuit conductors. 3. Insulation resistance. 4. Polarity. 5. Earth electrode resistance, where there is one. Then energise for 6. earth fault loop impedance, 7. prospective fault current and 8. functional testing, including RCD operation.',
  detail:
    'The order is not a convention or a training-centre habit. BS 7671 Regulation 643.1 requires the tests of Regulations 643.2 to 643.6 to be carried out in that order before the installation is energised, and where the installation incorporates an earth electrode, the test of Regulation 643.7.2 must also be done before energising.',
};

const keyTakeaways = [
  'The order is a requirement, not a recommendation: Regulation 643.1 states the tests of Regulations 643.2 to 643.6 shall be carried out in that order before the installation is energised.',
  'Where the installation has an earth electrode, the electrode resistance test (Regulation 643.7.2) must also be completed before energising — so it belongs with the dead tests, not the live ones.',
  'Insulation resistance is measured against Table 64: 500 V DC and 1.0 MΩ minimum for circuits up to and including 500 V. Amendment 4 added a second-stage 250 V DC test at 1 MΩ minimum after sensitive equipment is reconnected (Regulation 643.3.3).',
  'RCD verification changed at Amendment 4. Table 3A of Appendix 3 has been deleted; regardless of RCD type, an alternating current test at IΔn verifies effectiveness — 300 ms maximum for a general non-delay device.',
  'If any test shows a failure to comply, Regulation 643.1 requires that test — and every preceding test whose result the fault could have influenced — to be repeated after the fault is rectified.',
];

const faqs = [
  {
    question: 'Why does the testing sequence matter?',
    answer:
      'Because BS 7671 makes it a requirement, and because each test relies on the safety conditions the previous one established. Regulation 643.1 states that the tests of Regulations 643.2 to 643.6 shall be carried out in that order before the installation is energised, and that where an earth electrode is present the test of Regulation 643.7.2 shall also be carried out before energising. The reasoning is practical. You must confirm that insulation resistance is satisfactory (test 3) before you energise for earth fault loop impedance testing (test 6) — energising a circuit with an undetected fault to earth risks a short circuit, a damaged instrument, or injury. You must verify continuity of the protective conductor (test 1) before relying on the earth path for loop impedance testing; Regulation 643.7.3.1 says so explicitly, requiring a continuity test to Regulation 643.2 before the loop impedance measurement. Regulation 643.1 also requires that where any test indicates a failure to comply, that test and any preceding test whose result may have been influenced by the fault are repeated once the fault is rectified.',
  },
  {
    question: 'What is the difference between R1+R2 and R2 continuity tests?',
    answer:
      'The R1+R2 test measures the total resistance of the line conductor (R1) and the circuit protective conductor (R2) connected together at the furthest point. This serves two purposes: it verifies the continuity of the CPC, and the measured R1+R2 value is used to calculate the expected earth fault loop impedance (Zs) by adding it to the external earth fault loop impedance (Ze). The formula is Zs = Ze + (R1+R2). The R2-only test measures the resistance of the circuit protective conductor alone, from the distribution board to the furthest point. This is used for some circuit types and in situations where you need to confirm the CPC is continuous independently of the line conductor. Both tests are carried out with the circuit de-energised using a low-reading ohmmeter — typically the continuity function on a multifunction tester, at a test voltage in the 4 to 24 V DC range recommended by IET Guidance Note 3. Note that Regulation 643.2.1(a) covers protective conductors including protective bonding conductors, so main and supplementary bonding continuity is part of this test, not a separate exercise.',
  },
  {
    question: 'What is the minimum acceptable insulation resistance?',
    answer:
      'BS 7671 Table 64 specifies the minimum insulation resistance values. For circuits with a nominal voltage up to and including 500 V — which covers all standard domestic and commercial installations at 230 V and 400 V — the test voltage is 500 V DC and the minimum acceptable insulation resistance is 1.0 MΩ. For SELV and PELV circuits (separated extra-low voltage and protective extra-low voltage), the test voltage is 250 V DC and the minimum is 0.5 MΩ. Above 500 V, the test voltage is 1000 V DC and the minimum is again 1.0 MΩ. Regulation 643.3.2 sets the acceptance condition: the main switchboard and each distribution circuit tested separately, with all its final circuits connected but current-using equipment disconnected, must not fall below the Table 64 value. Amendment 4 added Regulation 643.3.3: where connected equipment is likely to influence the result or be damaged, the Table 64 test is applied before that equipment is connected, and a further test at 250 V DC between live conductors and the protective conductor is applied afterwards, with a minimum of 1 MΩ. In practice a healthy new circuit reads far above the minimum — 50 MΩ to 200 MΩ or more is common. Low but passing readings suggest deteriorating insulation worth monitoring; readings below the Table 64 minimum are failures.',
  },
  {
    question: 'Can I use a multifunction tester for all the tests in the sequence?',
    answer:
      'A modern multifunction test instrument (MFT) can perform all of the primary tests in the sequence: continuity (using the low-reading ohmmeter function), insulation resistance (at 250 V, 500 V or 1000 V DC), polarity (confirmed during continuity testing and visual inspection), earth fault loop impedance, prospective fault current (calculated from the loop impedance measurement or measured directly), and RCD testing. Regulation 643.1 requires measuring instruments to be chosen in accordance with the relevant parts of BS EN 61557, or to provide no lesser degree of performance and safety — and Regulations 643.7.1 and 643.8 name BS EN 61557-6 specifically for RCD testing. You also need a separate voltage indicator complying with HSE Guidance Note GS 38 for safe isolation, to prove circuits dead before testing; that is not a function of the MFT. Earth electrode resistance on TT systems using the fall-of-potential method may need a dedicated electrode tester, although Regulation 643.7.2 notes that where a measurement of RA is not practicable, the measured value of external earth fault loop impedance may be used.',
  },
  {
    question: 'How do I test a ring final circuit for continuity?',
    answer:
      'Regulation 643.2.1(b) requires the continuity of the live conductors of a ring final circuit to be verified by measurement of resistance. The established three-stage method works as follows. First, measure the end-to-end resistance of each conductor in the ring: line-to-line (r1), neutral-to-neutral (rn), and CPC-to-CPC (r2). For a healthy ring with no cross-connections or breaks, r1 and rn should be approximately equal (the conductors are the same size), and r2 will differ where the CPC is a smaller size — for example a 1.5 mm² CPC in 2.5 mm² twin-and-earth. Second, cross-connect the line and neutral conductors at one end of the ring and measure between line and neutral at each socket outlet. The readings should form a consistent pattern, rising to a maximum around the midpoint and falling back — the figure-of-eight test — with the maximum approximately (r1 + rn) / 4. Third, cross-connect the line and CPC conductors and repeat at each socket outlet, where the maximum should be approximately (r1 + r2) / 4. That final set gives you the R1+R2 value at the furthest point of the ring for the Zs calculation.',
  },
  {
    question: 'What prospective fault current values make an installation unacceptable?',
    answer:
      'There is no single unacceptable figure. Regulation 643.7.3.201 requires the prospective short-circuit current and prospective earth fault current to be measured, calculated or otherwise determined at the origin and at other relevant points; Appendix 14 gives further information on determining them. The requirement they are checked against is Regulation 432.3: a protective device shall be capable of breaking — and, for a circuit-breaker, making — the fault current up to and including the maximum prospective fault current at its point of installation. If the prospective fault current exceeds what the device can interrupt, the device may fail destructively. The one documented exception is Regulation 434.5.1, which permits a device with a lower rated breaking capacity than the prospective short-circuit current where combined short-circuit protection with an upstream device is used, strictly in accordance with the manufacturers’ instructions — Regulation 536.6 sets out that arrangement. In most domestic installations the prospective fault current at the consumer unit sits comfortably below the rating of the devices fitted, but a property close to the supply transformer or with very short mains tails can measure much higher, and that is where the device rating needs checking rather than assuming.',
  },
  {
    question: 'What are the RCD trip time limits?',
    answer:
      'Two different things get muddled here, so it is worth separating them. What BS 7671 requires you to verify: Amendment 4 deleted Table 3A of Appendix 3, and the notes to Regulations 643.7.1 and 643.8 now say that regardless of RCD type, effectiveness is deemed verified where the device disconnects within the stated time under an alternating current test at the rated residual operating current (IΔn). For a general non-delay type that is 300 ms maximum. For a delay Type S device, Regulation 643.7.1 gives a window of between 130 ms minimum and 500 ms maximum. That is the test, and that is the figure recorded on the certificate. What the product standards say about the device: BS EN 61008 (RCCBs) and BS EN 61009 (RCBOs) include a 40 ms limit at five times rated current for a general device. That is a device characteristic verified by the manufacturer, not an installation verification — the ½x and 5x tests are no longer part of the required sequence, though 5x remains useful when fault-finding a nuisance-tripping device.',
  },
];

const howToSteps = [
  {
    name: 'Carry out safe isolation',
    text: 'Before any dead tests, carry out full safe isolation per HSE GS 38. Prove your voltage indicator on a known live source, isolate the circuit, lock off with your personal padlock, test all conductor combinations at the point of work (L-N, L-E, N-E), and prove the voltage indicator still works. Safe isolation is the prerequisite for all dead testing.',
  },
  {
    name: 'Test 1: Continuity of protective conductors (Reg 643.2.1(a))',
    text: 'Using the low-reading ohmmeter function on your MFT, measure the resistance of the circuit protective conductor (CPC) from the distribution board to the furthest point of each circuit, and of the main and supplementary protective bonding conductors — Regulation 643.2.1(a) covers protective conductors including protective bonding conductors. For radial circuits this gives the R1+R2 value. Record the reading; it is used later to verify Zs. A reading of infinity indicates a break in the CPC.',
  },
  {
    name: 'Test 2: Continuity of ring final circuit conductors (Reg 643.2.1(b))',
    text: 'For ring circuits only. Measure end-to-end resistance of L, N, and CPC conductors (r1, rn, r2). Cross-connect L and N at one end and measure at each socket (figure-of-eight test). Cross-connect L and CPC and repeat. Maximum readings should be approximately (r1+rn)/4 and (r1+r2)/4 respectively. Anomalies indicate breaks, cross-connections, or spurs.',
  },
  {
    name: 'Test 3: Insulation resistance (Reg 643.3)',
    text: 'Using the insulation resistance function at 500 V DC, test between live conductors, and between live conductors and the protective conductor connected to the earthing arrangement — line and neutral may be joined for the second of these. Minimum acceptable value from Table 64: 1.0 MΩ. Where connected equipment would influence the result or be damaged, Regulation 643.3.3 requires the Table 64 test before that equipment is connected, then a 250 V DC test afterwards with a minimum of 1 MΩ.',
  },
  {
    name: 'Test 4: Polarity (Reg 643.6)',
    text: 'Verify the polarity of the supply at the origin before the installation is energised. Confirm every fuse and single-pole control and protective device is connected in the line conductor only; that centre-contact bayonet and Edison screw lampholders have the outer or screwed contacts connected to the neutral, except for E14 and E27 lampholders to BS EN 60238; and that wiring is correctly connected throughout. Much of this is confirmed during continuity testing and visual inspection.',
  },
  {
    name: 'Test 5: Earth electrode resistance, where applicable (Reg 643.7.2)',
    text: 'Where the earthing system incorporates an earth electrode, measure its resistance to Earth. Regulation 643.1 requires this test before energising, so it belongs with the dead tests. Where a measurement of RA is not practicable, the measured external earth fault loop impedance may be used. Regulation 411.5.3(b) requires RA x IΔn to not exceed 50 V; Table 41.5 tabulates this as a maximum Zs of 1667 Ω for a 30 mA RCD.',
  },
  {
    name: 'Test 6: Earth fault loop impedance (Reg 643.7.3)',
    text: 'Energise the circuit. Regulation 643.7.3.1 requires a continuity test to Regulation 643.2 to have been carried out before the loop impedance measurement. Measure Ze at the origin with the main earthing conductor disconnected, then Zs at the furthest point of each circuit. The measured earth fault loop impedance shall comply with Chapter 41 — Table 41.3 for circuit-breakers. Verify that Zs is approximately Ze + (R1+R2); if not, investigate.',
  },
  {
    name: 'Test 7: Prospective fault current (Reg 643.7.3.201)',
    text: 'Measure, calculate or otherwise determine the prospective short-circuit current and prospective earth fault current at the origin and at other relevant points. Most MFTs derive it from the loop impedance measurement. Appendix 14 gives further information. The device must be capable of breaking the fault current up to the maximum prospective fault current at its point of installation (Regulation 432.3), except where combined short-circuit protection under Regulation 434.5.1 applies.',
  },
  {
    name: 'Test 8: Functional testing, including RCD operation (Reg 643.10)',
    text: 'Test all RCDs: integral test button first, then the instrument test. Under BS 7671:2018+A4:2026 that is a single alternating current test at IΔn, whatever the RCD type — a general non-delay device must operate within 300 ms; Regulation 643.7.1 gives 130 to 500 ms for a delay Type S. Amendment 4 deleted Table 3A of Appendix 3, so the ½x and 5x IΔn tests are no longer part of the required sequence. Then functionally test switchgear and controlgear assemblies, drives, controls and interlocks, emergency switching off and emergency stopping systems, and insulation monitoring. Where an AFDD is installed, verify its manual test facility per the manufacturers’ recommendations.',
  },
];

const SEQUENCE_ROWS: Array<{
  n: string;
  test: string;
  reg: string;
  state: string;
}> = [
  {
    n: '1',
    test: 'Continuity of protective conductors, including protective bonding',
    reg: '643.2.1(a)',
    state: 'Dead',
  },
  { n: '2', test: 'Continuity of ring final circuit conductors', reg: '643.2.1(b)', state: 'Dead' },
  { n: '3', test: 'Insulation resistance (Table 64)', reg: '643.3', state: 'Dead' },
  { n: '4', test: 'Polarity', reg: '643.6', state: 'Dead' },
  { n: '5', test: 'Earth electrode resistance, where fitted', reg: '643.7.2', state: 'Dead' },
  { n: '6', test: 'Earth fault loop impedance (Ze, Zs)', reg: '643.7.3', state: 'Live' },
  { n: '7', test: 'Prospective fault current', reg: '643.7.3.201', state: 'Live' },
  { n: '8', test: 'Functional testing, including RCD operation', reg: '643.10', state: 'Live' },
];

const sections = [
  {
    id: 'sequence',
    heading: 'The Sequence at a Glance',
    content: (
      <>
        <p>
          Eight tests, in this order. Tests 1 to 5 are carried out with the installation
          de-energised; tests 6 to 8 with it live. Regulation 643.1 fixes the order of the first
          four and requires the earth electrode test before energising too, which is why the
          electrode sits at position 5 rather than with the live tests.
        </p>
        <div className={`${CARD_PADDED} mt-6`}>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.14]">
                  <th className="py-2 pr-3 font-semibold text-white">#</th>
                  <th className="py-2 pr-3 font-semibold text-white">Test</th>
                  <th className="py-2 pr-3 font-semibold text-white">BS 7671</th>
                  <th className="py-2 font-semibold text-white">State</th>
                </tr>
              </thead>
              <tbody>
                {SEQUENCE_ROWS.map((row) => (
                  <tr key={row.n} className="border-b border-white/[0.08] last:border-b-0">
                    <td className="py-3 pr-3 align-top font-bold text-elec-yellow">{row.n}</td>
                    <td className="py-3 pr-3 align-top text-white leading-relaxed">{row.test}</td>
                    <td className="py-3 pr-3 align-top text-white whitespace-nowrap tabular-nums">
                      {row.reg}
                    </td>
                    <td className="py-3 align-top text-white whitespace-nowrap">{row.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          These eight are the tests that apply to nearly every job, but Chapter 64 runs from
          Regulation 643.2 to 643.11. The ones not listed above are conditional: Regulation 643.4
          (protection by SELV, PELV or electrical separation), Regulation 643.5 (insulation
          resistance or impedance of floors and walls, where Regulation 418.1 applies), Regulation
          643.9 (check of phase sequence, for polyphase circuits) and Regulation 643.11
          (verification of voltage drop, which the regulation notes is not normally required during
          initial verification).
        </p>
      </>
    ),
  },
  {
    id: 'why-order-matters',
    heading: 'Why the Testing Order Matters',
    content: (
      <>
        <p>
          The electrical testing sequence is not arbitrary, and it is not merely good practice.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Regulation 643.1 states that the tests of Regulations 643.2 to 643.6 shall, where
          relevant, be carried out in that order before the installation is energised — and that
          where the installation incorporates an earth electrode, the test of Regulation 643.7.2
          shall also be carried out before energising. IET Guidance Note 3: Inspection and Testing
          (9th Edition) sets out how to perform each of those tests, but the order itself comes from
          the standard.
        </p>
        <p>
          The reasoning is that the dead tests verify the basic integrity of the wiring — continuity,
          insulation and polarity — before mains voltage is applied. Energise a circuit without first
          checking its insulation resistance and you may be applying 230 V to a short circuit or an
          earth fault. The dependency also runs the other way: Regulation 643.7.3.1 explicitly
          requires a continuity test to Regulation 643.2 to have been carried out before the earth
          fault loop impedance measurement, because a loop impedance reading taken through a broken
          or high-resistance CPC is meaningless.
        </p>
        <p>
          Regulation 643.1 closes the loop on failures: if any test indicates a failure to comply,
          that test and any preceding test whose result may have been influenced by the fault shall
          be repeated after the fault has been rectified. Finding a broken CPC at test 6 does not
          just mean re-testing the CPC — it means going back and repeating whatever earlier results
          that break could have distorted.
        </p>
      </>
    ),
  },
  {
    id: 'dead-tests',
    heading: 'Dead Tests (De-energised)',
    content: (
      <>
        <p>
          Dead tests are carried out with the circuit de-energised and isolated. Before beginning any
          dead testing, you must carry out{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>{' '}
          per HSE Guidance Note GS 38 — proving your voltage indicator works, isolating the circuit,
          locking off with your personal padlock, testing all conductor combinations at the point of
          work, and proving the indicator still works.
        </p>
        <p>
          The dead tests are: continuity of protective conductors (test 1, Regulation 643.2.1(a)),
          continuity of ring final circuit conductors (test 2, Regulation 643.2.1(b)), insulation
          resistance (test 3, Regulation 643.3), polarity (test 4, Regulation 643.6) and earth
          electrode resistance where applicable (test 5, Regulation 643.7.2). Together they establish
          that the wiring is intact, the insulation is sound, the connections are correct and the
          earthing arrangement is adequate.
        </p>
        <p>
          Regulation 643.1 also requires measuring instruments and monitoring equipment to be chosen
          in accordance with the relevant parts of BS EN 61557, or otherwise to provide no lesser
          degree of performance and safety.
        </p>
      </>
    ),
  },
  {
    id: 'test-1',
    heading: 'Test 1: Continuity of Protective Conductors',
    content: (
      <>
        <TestMeta state="Dead test" reg="643.2.1(a)" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            That the circuit protective conductor (CPC) is continuous from the distribution board to
            the furthest point of every circuit, so that an earth fault has a complete low-impedance
            path back to the source and the protective device can operate. Regulation 643.2.1(a)
            covers protective conductors <em>including protective bonding conductors</em>, so main
            and supplementary bonding continuity is part of this test rather than a separate one.
          </Fact>
          <Fact label="Method">
            Using a low-reading ohmmeter — the continuity function on a multifunction tester —
            measure the resistance between the earth terminal at the distribution board and the earth
            terminal at each point on the circuit. For radial circuits, the measurement at the last
            accessory gives the R1+R2 value: the combined resistance of the line conductor (R1) and
            the CPC (R2) in series. This value goes on the schedule of test results and is used later
            to verify the earth fault loop impedance.
          </Fact>
          <Fact label="Pass or fail">
            There is no single tabulated pass value — the reading must be consistent with the value
            expected from the cable length, conductor size and conductor material. A reading of
            infinity means an open circuit in the CPC. An unexpectedly high reading points to a loose
            connection or a damaged conductor.
          </Fact>
          <Fact label="Why it is first">
            Regulation 643.1 places 643.2 at the head of the sequence, and Regulation 643.7.3.1
            requires it to be complete before the loop impedance measurement. Beyond the ordering,
            the earth path is the primary safety mechanism: if it is broken, a fault to earth will
            not be cleared and metalwork can stay live.
          </Fact>
        </div>
      </>
    ),
  },
  {
    id: 'test-2',
    heading: 'Test 2: Continuity of Ring Final Circuit Conductors',
    content: (
      <>
        <TestMeta state="Dead test" reg="643.2.1(b)" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            That the ring final circuit is a complete ring — line, neutral and CPC all leave the
            distribution board, travel round and return without a break. It also exposes
            cross-connections between two rings, bootleg rings where a radial has been dressed up as
            a ring, and broken rings running as two radials.
          </Fact>
          <Fact label="Method">
            Three stages. First, measure end-to-end resistance of each conductor: r1 (line), rn
            (neutral), r2 (CPC). On a healthy ring r1 and rn are approximately equal; r2 differs
            where the CPC is a smaller size. Second, cross-connect line and neutral at one end and
            measure between L and N at each socket — readings should rise to a maximum of roughly
            (r1 + rn) / 4 around the midpoint, then fall back. Third, cross-connect line and CPC and
            repeat; the maximum, roughly (r1 + r2) / 4, is the R1+R2 value at the furthest point.
          </Fact>
          <Fact label="Pass or fail">
            Readings must follow the expected pattern. Readings that do not rise and fall
            symmetrically suggest cross-connections; a single very high reading suggests a
            high-resistance joint; inconsistent readings suggest spurs or breaks.
          </Fact>
          <Fact label="Why it is second">
            Regulation 643.2.1 lists protective conductors at (a) and ring final circuit live
            conductors at (b), and the whole of 643.2 precedes insulation resistance testing under
            Regulation 643.1. It is still a dead test.
          </Fact>
        </div>
        <SEOAppBridge
          title="70+ calculators for Zs, Ze, R1+R2 and more"
          description="Elec-Mate has dedicated calculators for verifying ring circuit test results, calculating expected R1+R2 values from cable data…"
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'test-3',
    heading: 'Test 3: Insulation Resistance',
    content: (
      <>
        <TestMeta state="Dead test" reg="643.3" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            That the insulation between live conductors, and between live conductors and the
            protective conductor connected to the earthing arrangement, is sound. Poor insulation
            causes earth leakage that trips RCDs, short circuits that trip MCBs, shock hazards and a
            fire risk from tracking.
          </Fact>
          <Fact label="Method">
            Regulation 643.3.1 requires the measurement between (a) live conductors, and (b) live
            conductors and the protective conductor connected to the earthing arrangement — for the
            second, line and neutral may be connected together. Regulation 643.3.2 sets the
            condition: the main switchboard and each distribution circuit tested separately, with all
            its final circuits connected but current-using equipment disconnected, must not fall
            below the Table 64 value.
          </Fact>
        </div>
        <div className={`${CARD_PADDED} mt-4`}>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Table 64 — Minimum values of insulation resistance
          </h3>
          <div className="-mx-4 mt-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[460px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.14]">
                  <th className="py-2 pr-3 font-semibold text-white">Circuit nominal voltage</th>
                  <th className="py-2 pr-3 font-semibold text-white">Test voltage DC</th>
                  <th className="py-2 font-semibold text-white">Minimum insulation resistance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/[0.08]">
                  <td className="py-3 pr-3 text-white">SELV and PELV</td>
                  <td className="py-3 pr-3 text-white tabular-nums">250 V</td>
                  <td className="py-3 text-white tabular-nums">0.5 MΩ</td>
                </tr>
                <tr className="border-b border-white/[0.08]">
                  <td className="py-3 pr-3 text-white">
                    Up to and including 500 V, with the exception of the above systems
                  </td>
                  <td className="py-3 pr-3 text-white tabular-nums">500 V</td>
                  <td className="py-3 text-white tabular-nums">1.0 MΩ</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 text-white">Above 500 V</td>
                  <td className="py-3 pr-3 text-white tabular-nums">1000 V</td>
                  <td className="py-3 text-white tabular-nums">1.0 MΩ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-white text-sm leading-relaxed">
            Table 64 also applies when verifying insulation resistance between non-earthed protective
            conductors and Earth. FELV circuits are tested at the same voltage as that applied to the
            primary side of the source and must meet all the test requirements for low voltage
            circuits.
          </p>
        </div>
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="New at Amendment 4 — the two-stage test">
            Regulation 643.3.3 was redrafted at A4. Where connected equipment is likely to influence
            the measurement or be damaged, the Table 64 test is applied <em>before</em> that
            equipment is connected. Following connection, a test at 250 V DC is applied between live
            conductors and the protective conductor connected to the earthing arrangement, and the
            insulation resistance shall be at least 1 MΩ. The note adds that manufacturers&rsquo;
            instructions may recommend some equipment is disconnected even for the 250 V DC test.
          </Fact>
          <Fact label="Why it is third">
            Insulation resistance must be verified before any live test. If insulation is compromised
            and you energise, fault current flows — damaging equipment, tripping devices, or creating
            a shock hazard.
          </Fact>
        </div>
      </>
    ),
  },
  {
    id: 'test-4',
    heading: 'Test 4: Polarity',
    content: (
      <>
        <TestMeta state="Dead test" reg="643.6" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            Regulation 643.6 requires that, where relevant, the polarity of the supply at the origin
            of the installation is verified <em>before the installation is energised</em>. Where
            single-pole switching devices are not permitted in the neutral, a test is made to verify
            that all such devices are connected in the line conductor(s) only. Incorrect polarity can
            leave metalwork live when a switch is off, or render a protective device useless because
            it sits in the neutral.
          </Fact>
          <Fact label="What must be verified">
            Regulation 643.6 lists three things: (a) every fuse and single-pole control and
            protective device is connected in the line conductor only; (b) except for E14 and E27
            lampholders to BS EN 60238, in circuits having an earthed neutral conductor,
            centre-contact bayonet and Edison screw lampholders have the outer or screwed contacts
            connected to the neutral conductor; and (c) wiring has been correctly connected
            throughout the installation.
          </Fact>
          <Fact label="Method">
            Polarity is largely verified during the continuity tests — measuring continuity between
            specific conductors confirms which conductor lands on which terminal — and by visual
            inspection at accessories. It is a dead test: Regulation 643.1 puts 643.6 inside the
            group that must be completed before the installation is energised.
          </Fact>
          <Fact label="Why it is fourth">
            643.6 is the last of the regulations named in the fixed pre-energisation order of
            Regulation 643.1. Much of the evidence comes free with the continuity tests already
            completed, which is why it sits at the end of that group rather than the start.
          </Fact>
        </div>
      </>
    ),
  },
  {
    id: 'test-5',
    heading: 'Test 5: Earth Electrode Resistance (Where Applicable)',
    content: (
      <>
        <TestMeta state="Dead test" reg="643.7.2" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            That the resistance of the earth electrode is low enough for the protective device to
            operate. Regulation 643.7.2 requires that where the earthing system incorporates an earth
            electrode as part of the installation, the electrode resistance to Earth shall be
            measured. On a TT system the installation relies on its own electrode rather than a
            distributor&rsquo;s earth, so this is the whole earthing arrangement.
          </Fact>
          <Fact label="Method">
            Measure with the earth electrode resistance function on an MFT, or a dedicated tester
            using the fall-of-potential method. The note to Regulation 643.7.2 allows that where a
            measurement of RA is not practicable, the measured value of external earth fault loop
            impedance may be used instead. The test does not apply where the installation has no
            electrode of its own.
          </Fact>
          <Fact label="Pass or fail">
            Regulation 411.5.3(b) requires RA x IΔn to not exceed 50 V, where RA is the sum of the
            resistances of the earth electrode and the protective conductor connecting it to the
            exposed-conductive-parts. Table 41.5 tabulates the equivalent maximum earth fault loop
            impedance: 1667 Ω for a 30 mA RCD, 500 Ω at 100 mA, 167 Ω at 300 mA and 100 Ω at 500 mA.
            The note to that table warns that the electrode resistance should be as low as
            practicable and that a value exceeding 200 Ω may not be stable.
          </Fact>
          <Fact label="Why it is fifth — and why it is a dead test">
            Regulation 643.7.2 sits in the 643.7 group with the live tests, but Regulation 643.1
            singles it out: where the installation incorporates an earth electrode, this test shall
            also be carried out before the installation is energised. That is what puts it at the end
            of the dead tests rather than with loop impedance.
          </Fact>
        </div>
      </>
    ),
  },
  {
    id: 'live-tests',
    heading: 'Live Tests (Energised)',
    content: (
      <>
        <p>
          Live tests are carried out with the circuit energised at mains voltage, and only once all
          the pre-energisation tests have been completed satisfactorily — continuity of the
          protective conductor confirmed, the ring intact, insulation resistance at or above the
          Table 64 minimum, polarity correct, and earth electrode resistance measured where there is
          an electrode.
        </p>
        <p>
          Before energising, remove all lock-off devices and warning labels, disconnect all test
          leads, and restore the circuit to its normal operating condition — reconnect loads, replace
          fuses, close covers. Then energise and work through tests 6 to 8 in order.
        </p>
      </>
    ),
  },
  {
    id: 'test-6',
    heading: 'Test 6: Earth Fault Loop Impedance (Zs and Ze)',
    content: (
      <>
        <TestMeta state="Live test" reg="643.7.3" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            That the total impedance of the earth fault loop — from the fault, through the CPC and
            the main earthing terminal, out through the external earth path to the supply
            transformer, through the transformer winding and back — is low enough for the protective
            device to disconnect within the required time. Maximum disconnection times are set by
            Regulation 411.3.2.2 and Table 41.1.
          </Fact>
          <Fact label="Method">
            Regulation 643.7.3.1 requires a continuity test to Regulation 643.2 to have been carried
            out before the loop impedance measurement. Measure Ze at the origin with the main
            earthing conductor temporarily disconnected from the main earthing terminal, then measure
            Zs at the furthest point of each circuit. Note 1 to the regulation warns that readings
            taken with a loop impedance instrument may be adversely affected by power converting
            equipment such as inverters.
          </Fact>
          <Fact label="Pass or fail">
            The measured earth fault loop impedance shall comply with Chapter 41 — Table 41.3 for
            circuit-breakers, Table 41.2 for fuses, Table 41.5 for RCDs. A B32 circuit-breaker has a
            tabulated maximum Zs of 1.37 Ω. The widely used industry rule of thumb applies a 0.8
            factor to allow for conductor temperature rise, giving a design target of 1.10 Ω for the
            same device — but the tabulated value is the compliance limit, not the 80% figure. Where
            the requirements of the regulation are not satisfied and
            supplementary protective equipotential bonding is provided, the effectiveness of that
            bonding shall be verified.
          </Fact>
          <Fact label="Cross-check">
            Zs should be approximately Ze + (R1+R2). A measured Zs significantly above the calculated
            value suggests a high-resistance connection in the earth path that continuity testing did
            not catch.
          </Fact>
        </div>
        <SEOAppBridge
          title="Voice-to-test-results — speak values while holding probes"
          description="On site with probes in hand? Just speak: 'Ring 1, R1+R2 0.32, Zs 0.89, insulation 200 meg.' Elec-Mate fills in the schedule of test results for you."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'test-7',
    heading: 'Test 7: Prospective Fault Current (Ipf)',
    content: (
      <>
        <TestMeta state="Live test" reg="643.7.3.201" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            That the maximum current which could flow under short-circuit or earth fault conditions
            does not exceed what the protective devices can safely interrupt. Regulation 432.3
            requires a device to be capable of breaking — and, for a circuit-breaker, making — the
            fault current up to and including the maximum prospective fault current.
          </Fact>
          <Fact label="Method">
            Regulation 643.7.3.201 requires the prospective short-circuit current and prospective
            earth fault current to be measured, calculated or determined by another method, at the
            origin and at other relevant points in the installation. Most MFTs derive it from the
            loop impedance measurement: for a line-earth fault, Ipf = Uo/Zs; for a line-neutral short
            circuit, Ipf = Uo/Z(line-neutral). The higher of the two is the figure that matters. The
            note to the regulation points to Appendix 14 for further information.
          </Fact>
          <Fact label="Pass or fail">
            The prospective fault current at a device must be within its rated breaking capacity. The
            one documented exception is Regulation 434.5.1, which permits a device with a lower rated
            breaking capacity where combined short-circuit protection with an upstream device is
            used; Regulation 536.6 requires this to follow the downstream device
            manufacturer&rsquo;s instructions, and states that where no such information is
            available, combined short-circuit protection shall not be used. The Ipf is recorded on
            the{' '}
            <SEOInternalLink href="/guides/electrical-certificate-types-uk">
              EIC or EICR
            </SEOInternalLink>
            .
          </Fact>
          <Fact label="Why it is seventh">
            It shares a regulation group and, in most cases, the same measurement as the loop
            impedance test — Regulation 643.7.3 covers earth fault loop impedance and prospective
            fault current together.
          </Fact>
        </div>
      </>
    ),
  },
  {
    id: 'test-8',
    heading: 'Test 8: Functional Testing (Including RCD Operation)',
    content: (
      <>
        <TestMeta state="Live test" reg="643.10" />
        <div className={`${CARD_PADDED} mt-4 space-y-4`}>
          <Fact label="What it proves">
            Regulation 643.10 requires equipment to be subjected to functional testing, as
            appropriate, to verify that it is properly mounted, adjusted and installed and operates
            correctly. The regulation gives three examples — switchgear and controlgear assemblies,
            drives, controls and interlocks; systems for emergency switching off and emergency
            stopping; and insulation monitoring — and notes the list is not exhaustive. Protective
            devices shall be submitted to a test of their function, and where fault protection or
            additional protection is provided by an RCD, the effectiveness of any test facility
            incorporated in the device shall be verified. Where an AFDD is installed, the
            effectiveness of any manually operated test facility shall be verified per the
            manufacturers&rsquo; recommendations. For a detailed guide to RCD testing, see our{' '}
            <SEOInternalLink href="/rcd-testing-guide">RCD testing guide</SEOInternalLink>.
          </Fact>
          <Fact label="RCD verification — what A4:2026 asks for">
            Regulations 643.7.1 and 643.8 require the effectiveness of automatic disconnection by
            RCDs to be verified using test equipment to BS EN 61557-6. Their notes state that
            regardless of RCD type, effectiveness is deemed verified where the RCD disconnects within
            the stated time under an alternating current test at the rated residual operating current
            (IΔn): 300 ms maximum for a general non-delay type, and — per the note to 643.7.1 —
            between 130 ms minimum and 500 ms maximum for a delay Type S device. Start with the
            integral test button, then take the instrument reading at IΔn.
          </Fact>
          <Fact label="What changed at Amendment 4">
            Table 3A of Appendix 3, which gave time/current performance criteria for RCDs, has been
            deleted. The ½x and 5x IΔn tests are no longer part of the required sequence. The 5x test
            remains useful when fault-finding a nuisance-tripping device, and 40 ms at 5x IΔn is
            still a device characteristic under BS EN 61008 and BS EN 61009 — but it is not what BS
            7671 now asks you to verify or record.
          </Fact>
          <Fact label="Other functional tests">
            Switching devices — isolators, circuit-breakers, switches — for correct operation and
            mechanical integrity. Interlocking devices for correct sequencing. Time switches,
            photoelectric cells and PIR sensors for correct activation. Dimmer switches for smooth
            operation. Emergency switching and emergency stopping devices. Any automation, BMS
            controls or smart switching.
          </Fact>
          <Fact label="Why it is last">
            Functional testing needs the installation fully energised and running in its normal
            state, and RCD testing deliberately injects residual current through the earth path. Only
            once the earth path is proven continuous (test 1), the ring complete (test 2), the
            insulation sound (test 3), the polarity correct (test 4), the electrode adequate where
            fitted (test 5), the loop impedance within limits (test 6) and the fault current within
            device ratings (test 7) is that a reasonable thing to do.
          </Fact>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Testing Mistakes',
    content: (
      <>
        <p>
          Even experienced electricians make testing errors. These are the ones that come up most
          often, and why they matter.
        </p>
        <div className="mt-6 space-y-4">
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Testing loop impedance before insulation resistance
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              Taking the Zs test before verifying insulation resistance means energising a circuit
              that may have a fault to earth. That risks a short circuit, nuisance tripping, a
              damaged instrument, or a shock or arc flash hazard — and it reverses the order
              Regulation 643.1 requires.
            </p>
          </div>
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Leaving current-using equipment connected for insulation resistance testing
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              Regulation 643.3.2 sets the acceptance condition with final circuits connected but
              current-using equipment disconnected. Leaving appliances in circuit gives misleadingly
              low readings, because the appliance impedance sits in parallel with the cable
              insulation, and the 500 V DC test voltage can destroy electronic controllers, LED
              drivers and dimmers. Where equipment cannot practically be disconnected, Regulation
              643.3.3 sets out the two-stage approach.
            </p>
          </div>
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Still testing RCDs to the old Table 3A sequence
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              The ½x, 1x and 5x routine is deeply ingrained, and plenty of instruments still default
              to it. Amendment 4 deleted Table 3A of Appendix 3, and the notes to Regulations 643.7.1
              and 643.8 now verify an RCD with a single alternating current test at IΔn, whatever the
              device type. Running the old sequence is not dangerous — but recording a 5x result as
              the certified figure, or failing a device against a criterion BS 7671 no longer
              applies, is a real error. Record the trip time at IΔn.
            </p>
          </div>
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Treating the earth electrode test as a live test
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              Regulation 643.7.2 sits in the 643.7 group alongside loop impedance, so it is easy to
              assume it happens after energising. Regulation 643.1 says otherwise: where the
              installation incorporates an earth electrode, that test shall also be carried out
              before the installation is energised.
            </p>
          </div>
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Not testing RCDs on both half-cycles
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              IET Guidance Note 3 has electricians test on both the positive (0 degree) and negative
              (180 degree) half-cycles. A device that passes on one and fails on the other has
              failed. The worst-case, longest trip time from either half-cycle is the value recorded
              on the certificate.
            </p>
          </div>
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Using uncalibrated instruments
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              Regulation 643.1 requires measuring instruments to be chosen in accordance with the
              relevant parts of BS EN 61557, or to provide no lesser degree of performance and
              safety. An out-of-calibration instrument can pass circuits that should fail and fail
              circuits that should pass. Calibration is typically annual and the instrument details
              are recorded on the certificate.
            </p>
          </div>
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Forgetting functional testing
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              Functional testing is required by Regulation 643.10 but is frequently omitted or done
              superficially. Switching devices that do not operate correctly, time clocks that are
              not set and interlocks that do not function are real defects that should be recorded
              and rectified.
            </p>
          </div>
          <div className={CARD_PADDED}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Not repeating earlier tests after a fault is found
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              Regulation 643.1 requires that where a test indicates a failure to comply, that test
              and any preceding test whose result may have been influenced by the fault are repeated
              after the fault has been rectified. Fixing the fault and moving on leaves earlier
              results on the certificate that the fault may have distorted.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Complete GS 38 safe isolation guide — prove-test-prove, lock-off, LOTO.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Guide',
    description:
      'In-depth guide to insulation resistance testing — methods, limits, troubleshooting.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Earth Loop Impedance Calculator',
    description: 'Calculate and verify Zs values against BS 7671 maximum permitted values.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description: 'Complete guide to RCD testing — trip times, half-cycle testing, Type A vs Type AC.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create professional EICRs with auto-validated test results on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/inspection-testing-course',
    title: 'Inspection and Testing Course',
    description: 'Study for the C&G 2391 exam with practice questions and AI study assistant.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TestingSequenceGuidePage_v2() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-09-15"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ListOrdered}
      heroTitle={
        <>
          Electrical Testing Sequence:{' '}
          <span className="text-elec-yellow">Dead and Live Testing Order</span>
        </>
      }
      heroSubtitle="The eight tests in the order BS 7671:2018+A4:2026 requires — continuity, ring final circuit continuity, insulation resistance, polarity and earth electrode resistance before energising, then earth fault loop impedance, prospective fault current and functional testing. Regulation numbers, pass criteria and the mistakes that show up most often on site."
      answerBox={answerBox}
      readingTime={22}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="The Complete Testing Sequence: Step by Step"
      howToDescription="The full BS 7671 testing sequence from safe isolation through to functional testing, with the regulation and pass criteria for each test."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Record test results digitally, validated automatically"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site testing and certification. Voice test entry, auto BS 7671 validation, board scanner, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
