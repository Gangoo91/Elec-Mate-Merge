import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ListOrdered,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Mic,
  Camera,
  Brain,
  BookOpen,
  GraduationCap,
  Activity,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Testing Sequence BS 7671 | Dead & Live Testing Order';
const PAGE_DESCRIPTION =
  'Complete guide to the correct electrical testing sequence per BS 7671 and IET Guidance Note 3 (GN3). Continuity, insulation resistance, polarity, earth electrode resistance, earth fault loop impedance, prospective fault current, functional testing including RCD operation. Why the order matters, pass/fail criteria, common mistakes. For UK electricians.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Testing Sequence', href: '/guides/testing-sequence-guide' },
];

const tocItems = [
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

const keyTakeaways = [
  'Dead tests (continuity, insulation resistance, polarity, earth electrode resistance) must always be completed before live tests (loop impedance, PFC, functional testing) — this is a safety-critical requirement, not a suggestion.',
  'The testing sequence follows IET Guidance Note 3 (GN3), 9th Edition, aligned with BS 7671:2018+A3:2024 Part 6.',
  'Each test depends on the satisfactory result of the previous test — if continuity fails, you cannot rely on insulation resistance or loop impedance results.',
  'Functional testing (test 8) is often overlooked but is required to confirm that all switching, interlocking, and control devices operate correctly.',
  'Elec-Mate auto-validates every test result against BS 7671 maximum permitted values and supports voice-to-test-result entry so you can speak values while holding probes.',
];

const faqs = [
  {
    question: 'Why does the testing sequence matter?',
    answer:
      'The testing sequence matters because each test builds on the results of the previous test and, critically, each test relies on the safety conditions established by the previous test. For example, you must confirm that the insulation resistance is satisfactory (test 3) before you energise the circuit to carry out earth fault loop impedance testing (test 6). If you performed loop impedance testing without first verifying insulation resistance, you could energise a circuit with a fault to earth, causing a dangerous short circuit, damaging the test instrument, or injuring yourself. Similarly, you must verify continuity of the protective conductor (test 1) before relying on the earth path for loop impedance testing. The IET Guidance Note 3 (GN3) specifies the testing sequence precisely because it is the safe order — deviating from it introduces risk to both the electrician and the installation.',
  },
  {
    question: 'What is the difference between R1+R2 and R2 continuity tests?',
    answer:
      'The R1+R2 test measures the total resistance of the line conductor (R1) and the circuit protective conductor (R2) connected together at the furthest point. This serves two purposes: it verifies the continuity of the CPC, and the measured R1+R2 value is used to calculate the expected earth fault loop impedance (Zs) by adding it to the external earth fault loop impedance (Ze). The formula is Zs = Ze + (R1+R2). The R2-only test measures the resistance of the circuit protective conductor alone, from the distribution board to the furthest point. This is used for some circuit types and in situations where you need to confirm the CPC is continuous independently of the line conductor. Both tests are carried out with the circuit de-energised using a low-reading ohmmeter (typically the continuity function on a multifunction tester) at a test voltage between 4 and 24 V DC.',
  },
  {
    question: 'What is the minimum acceptable insulation resistance?',
    answer:
      'BS 7671 Table 61 specifies the minimum insulation resistance values. For installations operating at voltages up to and including 500 V AC (which covers all standard domestic and commercial installations at 230 V and 400 V), the test voltage is 500 V DC and the minimum acceptable insulation resistance is 1.0 megohm (1 MR). For SELV and PELV circuits (separated extra-low voltage and protective extra-low voltage, typically 12 V or 24 V circuits), the test voltage is 250 V DC and the minimum acceptable insulation resistance is 0.5 megohm (500 kR). In practice, the insulation resistance of a healthy circuit in good condition is typically much higher than the minimum — readings of 50 MR to 200 MR or more are common for new installations. Low but passing readings (for example, 2 to 5 MR) may indicate deteriorating insulation that should be monitored. Readings below 1 MR are failures that must be investigated and rectified before the circuit is energised.',
  },
  {
    question: 'Can I use a multifunction tester for all the tests in the sequence?',
    answer:
      'A modern multifunction test instrument (MFT) can perform all of the primary tests in the GN3 sequence: continuity (using the low-reading ohmmeter function), insulation resistance (using the insulation resistance function at 250 V or 500 V DC), polarity (confirmed during continuity testing and visual inspection), earth fault loop impedance (using the loop impedance function), prospective fault current (calculated automatically from the loop impedance measurement or measured directly), and RCD testing (using the RCD test function at various multiples of the rated current). However, you also need a separate voltage indicator that complies with HSE Guidance Note GS 38 for safe isolation — proving circuits dead before testing. This is not a function of the MFT. Some tests, such as earth electrode resistance on TT systems using the fall-of-potential method, may require a dedicated earth electrode resistance tester, although the MFT loop impedance function can provide a working value.',
  },
  {
    question: 'How do I test a ring final circuit for continuity?',
    answer:
      'Ring final circuit continuity testing has three stages. First, measure the end-to-end resistance of each conductor in the ring: Line-to-Line (r1), Neutral-to-Neutral (rn), and CPC-to-CPC (r2). For a healthy ring with no cross-connections or breaks, r1 and rn should be approximately equal (since the conductors are the same size), and r2 may be different if the CPC is a different size (for example, 1.5 mm squared CPC in 2.5 mm squared twin-and-earth cable). Second, cross-connect the Line and Neutral conductors at one end of the ring (connecting L1 to N2 and N1 to L2, where subscripts indicate the two ends) and measure the resistance between Line and Neutral at each socket outlet on the ring. The readings should form a consistent pattern, rising to a maximum at the midpoint of the ring and then falling back — this is the figure-of-eight test. The maximum reading should be approximately (r1 + rn) / 4. Third, cross-connect the Line and CPC conductors and repeat the measurements at each socket outlet. The maximum reading should be approximately (r1 + r2) / 4. This final set of readings gives you the R1+R2 value at the furthest point of the ring for Zs calculation purposes.',
  },
  {
    question: 'What prospective fault current values make an installation unacceptable?',
    answer:
      'There is no single unacceptable prospective fault current value — the requirement is that the prospective fault current at every relevant point in the installation must not exceed the rated breaking capacity of the protective devices installed. If the prospective fault current exceeds the breaking capacity of a device, the device may not be able to safely interrupt the fault, potentially resulting in an explosion or fire. Standard domestic MCBs to BS EN 60898 have a rated breaking capacity of 6 kA (6,000 amps) as a minimum. Some have higher ratings of 10 kA or 15 kA. For most domestic installations, the prospective fault current at the consumer unit is typically between 1 kA and 4 kA, well within the 6 kA rating. However, installations close to the supply transformer or with very short mains tails can have much higher prospective fault currents — occasionally exceeding 6 kA. In these cases, devices with higher breaking capacity ratings (10 kA or 16 kA) must be installed.',
  },
  {
    question: 'What are the RCD trip time limits?',
    answer:
      'RCD trip time limits are specified in BS EN 61008 (RCCBs) and BS EN 61009 (RCBOs). For a standard 30 mA general-type RCD: at half-rated current (0.5x IΔn = 15 mA) the device must NOT trip; at rated current (1x IΔn = 30 mA) the device must trip within 300 milliseconds; at five-times rated current (5x IΔn = 150 mA) the device must trip within 40 milliseconds. For a Type S (time-delayed) RCD: at rated current the device must trip between 130 and 500 milliseconds; at five-times rated current the device must trip between 50 and 200 milliseconds. Tests must be carried out on both positive (0 degrees) and negative (180 degrees) half-cycles of the supply waveform, and the worst-case (longest) trip time from either half-cycle is the value recorded on the certificate.',
  },
];

const howToSteps = [
  {
    name: 'Carry out safe isolation',
    text: 'Before any dead tests, carry out full safe isolation per HSE GS 38. Prove your voltage indicator on a known live source, isolate the circuit, lock off with your personal padlock, test all conductor combinations at the point of work (L-N, L-E, N-E), and prove the voltage indicator still works. Safe isolation is the prerequisite for all dead testing.',
  },
  {
    name: 'Test 1: Continuity of protective conductors',
    text: 'Using the low-reading ohmmeter function on your MFT, measure the resistance of the circuit protective conductor (CPC) from the distribution board to the furthest point of each circuit. For radial circuits, this gives the R1+R2 value. Record the reading — it will be used later to verify Zs. A reading of infinity indicates a break in the CPC. Unexpected readings require investigation.',
  },
  {
    name: 'Test 2: Continuity of ring final circuit conductors',
    text: 'For ring circuits only. Measure end-to-end resistance of L, N, and CPC conductors (r1, rn, r2). Cross-connect L and N at one end and measure at each socket (figure-of-eight test). Cross-connect L and CPC and repeat. Maximum readings should be approximately (r1+rn)/4 and (r1+r2)/4 respectively. Anomalies indicate breaks, cross-connections, or spurs.',
  },
  {
    name: 'Test 3: Insulation resistance',
    text: 'Using the insulation resistance function at 500 V DC, test between all live conductors connected together and earth (L+N to E), and between live conductors (L to N). Minimum acceptable value: 1.0 MΩ. Disconnect all electronic equipment and SPDs before testing. Remove lamps and disconnect RCDs if necessary. Typical healthy values are 50 to 200+ MΩ.',
  },
  {
    name: 'Test 4: Polarity',
    text: 'Verify that all single-pole switching devices are in the line conductor, all socket outlets are correctly wired (L right, N left, E top), and Edison-screw lampholders have line to centre contact. Much of this is confirmed during continuity testing. Final verification may require brief energisation — safe because insulation resistance has been confirmed.',
  },
  {
    name: 'Test 5: Earth electrode resistance (where applicable)',
    text: 'On TT installations, measure the earth electrode resistance using the fall-of-potential method or obtain a working value from the loop impedance test. The electrode resistance (RA) multiplied by the rated residual operating current of the RCD (IΔn) must not exceed 50 V. For a 30 mA RCD, this gives a maximum RA of 1667 ohms. This test is not required on TN-S or TN-C-S systems.',
  },
  {
    name: 'Test 6: Earth fault loop impedance (Zs and Ze)',
    text: 'Energise the circuit. Measure Ze at the origin with the main earthing conductor disconnected. Measure Zs at the furthest point of each circuit. Compare against BS 7671 maximum permitted values for the protective device type and rating. Apply the 80% rule of thumb for temperature correction. Verify that Zs ≈ Ze + (R1+R2) — if not, investigate.',
  },
  {
    name: 'Test 7: Prospective fault current (Ipf)',
    text: 'Measure or calculate the prospective fault current at the origin. Most MFTs calculate Ipf from the loop impedance automatically. The highest value (typically line-neutral short circuit) must not exceed the rated breaking capacity of the protective devices. Standard domestic MCBs have a minimum breaking capacity of 6 kA.',
  },
  {
    name: 'Test 8: Functional testing (including RCD operation)',
    text: 'Test all RCDs: push-button test first, then instrument tests — 0.5x IΔn on both half-cycles (must NOT trip), 1x IΔn on both half-cycles (must trip within 300 ms), 5x IΔn on both half-cycles (must trip within 40 ms). Type S RCDs have different limits (130-500 ms at 1x, 50-200 ms at 5x). Then test all switching devices, interlocks, isolators, fireman switches, time clocks, PIR sensors, dimmer switches, and other controls for correct operation. This test is often overlooked but is required by BS 7671.',
  },
];

const sections = [
  {
    id: 'why-order-matters',
    heading: 'Why the Testing Order Matters',
    content: (
      <>
        <p>
          The electrical testing sequence is not arbitrary — it follows a logical and
          safety-critical order defined in IET Guidance Note 3: Inspection and Testing (currently
          the 9th Edition, aligned with the 18th Edition of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>).
          Each test in the sequence serves a specific purpose, and many tests depend on the
          satisfactory completion of previous tests to be both safe and meaningful.
        </p>
        <p>
          The fundamental principle is that dead tests (carried out with the installation
          de-energised) must be completed before live tests (carried out with the installation
          energised). This is because the dead tests verify the basic integrity of the wiring —
          continuity, insulation, and polarity — before you apply mains voltage to the circuits. If
          you energised a circuit without first checking its insulation resistance, you could be
          applying 230 V to a circuit with a short-circuit or earth fault, with potentially
          catastrophic results.
        </p>
        <p>
          The sequence also follows a logical progression from the simplest tests to the most
          complex. Continuity testing requires only a low-voltage ohmmeter. Insulation resistance
          testing requires a 500 V DC test voltage. Earth fault loop impedance testing requires the
          circuit to be energised at mains voltage. RCD testing requires both mains voltage and a
          specific test current. Each step introduces more energy into the system, and the preceding
          tests ensure that the system is safe to receive that energy.
        </p>
        <SEOAppBridge
          title="Guided testing sequence built into the app"
          description="Elec-Mate walks you through the correct GN3 testing sequence step by step. Enter results for each test and the app validates them against BS 7671 maximum permitted values automatically. Never miss a test or do them in the wrong order."
          icon={ListOrdered}
        />
      </>
    ),
  },
  {
    id: 'dead-tests',
    heading: 'Dead Tests (De-energised)',
    content: (
      <>
        <p>
          Dead tests are carried out with the circuit de-energised and isolated. Before beginning
          any dead testing, you must carry out{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>{' '}
          per HSE Guidance Note GS 38 — proving your voltage indicator works, isolating the circuit,
          locking off with your personal padlock, testing all conductor combinations at the point of
          work, and proving the indicator still works. Safe isolation is the prerequisite for all
          dead testing.
        </p>
        <p>
          The dead tests are: continuity of protective conductors (test 1), continuity of ring final
          circuit conductors (test 2), insulation resistance (test 3), polarity verification (test
          4), and earth electrode resistance where applicable (test 5). These five tests establish
          that the wiring is intact, the insulation is sound, the connections are correct, and the
          earthing arrangement is adequate — the fundamental conditions that must be met before the
          circuit is energised for live testing.
        </p>
      </>
    ),
  },
  {
    id: 'test-1',
    heading: 'Test 1: Continuity of Protective Conductors',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">1</span>
            </div>
            <h3 className="font-bold text-white text-xl">Continuity of Protective Conductors</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That the circuit protective
            conductor (CPC) — the earth wire — is continuous from the distribution board to the
            furthest point of every circuit. This confirms that in the event of an earth fault,
            there is a complete low-impedance path for fault current to flow back to the source,
            allowing the protective device to operate and disconnect the supply.
          </p>
          <p>
            <strong className="text-yellow-400">Method:</strong> Using a low-reading ohmmeter (the
            continuity function on a multifunction tester at 4 to 24 V DC), measure the resistance
            between the earth terminal at the distribution board and the earth terminal at each
            point on the circuit. For radial circuits, the measurement at the last accessory gives
            the R1+R2 value — the combined resistance of the line conductor (R1) and the CPC (R2) in
            series. This value is recorded on the schedule of test results and used later to verify
            the earth fault loop impedance.
          </p>
          <p>
            <strong className="text-yellow-400">Pass/fail:</strong> There is no single pass/fail
            value — the reading must be consistent with the expected value based on the cable
            length, conductor size, and conductor material. A reading of infinity (open circuit)
            indicates a break in the CPC. An unexpectedly high reading may indicate a loose
            connection or damaged conductor. Values should be cross-referenced against the published
            resistance-per-metre values in BS 7671 tables.
          </p>
          <p>
            <strong className="text-yellow-400">Why it is first:</strong> The earth path must be
            confirmed before any other test because the earth path is the primary safety mechanism.
            If the earth path is broken, the installation is immediately dangerous — a fault to
            earth would not be cleared by the protective device, leaving metalwork live.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'test-2',
    heading: 'Test 2: Continuity of Ring Final Circuit Conductors',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">2</span>
            </div>
            <h3 className="font-bold text-white text-xl">
              Continuity of Ring Final Circuit Conductors
            </h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That the ring final circuit
            is a complete ring — all three conductors (line, neutral, and CPC) leave the
            distribution board, travel around the ring, and return without any breaks. It also
            identifies cross-connections (where two rings are interconnected), bootleg rings (where
            a radial has been disguised as a ring), and broken rings that are operating as two
            radial circuits.
          </p>
          <p>
            <strong className="text-yellow-400">Method:</strong> The three-step method: (1) Measure
            end-to-end resistance of each conductor — r1 (line), rn (neutral), r2 (CPC). For a
            healthy ring, r1 and rn should be approximately equal. r2 may differ if the CPC is a
            different size. (2) Cross-connect line and neutral at one end of the ring and measure
            between L and N at each socket — readings should rise to a maximum at the midpoint of
            approximately (r1 + rn) / 4, then fall back. (3) Cross-connect line and CPC and repeat —
            the maximum reading gives the R1+R2 value at the furthest point, approximately (r1 + r2)
            / 4.
          </p>
          <p>
            <strong className="text-yellow-400">Pass/fail:</strong> Readings must follow the
            expected pattern. Anomalies indicate problems: readings that do not rise and fall
            symmetrically suggest cross-connections; a very high reading at one socket suggests a
            high-resistance joint; inconsistent readings suggest spurs or breaks in the ring.
          </p>
          <p>
            <strong className="text-yellow-400">Why it is second:</strong> Ring circuit testing is
            an extension of protective conductor continuity testing. It is still a dead test and
            must be completed before insulation resistance testing because a break in the ring could
            cause problems that would be masked by other tests if done out of order.
          </p>
        </div>
        <SEOAppBridge
          title="70+ calculators for Zs, Ze, R1+R2 and more"
          description="Elec-Mate has dedicated calculators for verifying ring circuit test results, calculating expected R1+R2 values from cable data, and checking Zs against BS 7671 maximum permitted values. All built to the current standard."
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
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">3</span>
            </div>
            <h3 className="font-bold text-white text-xl">Insulation Resistance</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That the insulation between
            live conductors and between live conductors and earth is in good condition and can
            withstand the normal operating voltage without allowing leakage current to flow. Poor
            insulation can cause earth leakage (tripping RCDs), short circuits (tripping MCBs),
            electric shock hazards, and fire risk from tracking currents.
          </p>
          <p>
            <strong className="text-yellow-400">Method:</strong> Using an insulation resistance
            tester set to 500 V DC, test between all live conductors connected together and earth
            (L+N to E), and between live conductors (L to N). All switches must be closed (ON
            position), all loads disconnected, and all lamps removed. Electronic equipment, SPDs,
            and RCDs may need to be disconnected to prevent damage from the 500 V DC test voltage.
          </p>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              BS 7671 Table 61 — Minimum Insulation Resistance
            </h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>SELV/PELV circuits (up to 50 V):</strong> Test at 250 V DC — minimum 0.5
                  MR
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Up to 500 V AC (standard 230 V / 400 V):</strong> Test at 500 V DC —
                  minimum 1.0 MR
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Over 500 V AC:</strong> Test at 1000 V DC — minimum 1.0 MR
                </span>
              </li>
            </ul>
          </div>
          <p>
            <strong className="text-yellow-400">Why it is third:</strong> Insulation resistance must
            be verified before any live tests. If insulation is compromised and you energise the
            circuit, fault current will flow — potentially damaging equipment, tripping devices
            unexpectedly, or creating a shock hazard.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'test-4',
    heading: 'Test 4: Polarity (Where Not Already Confirmed)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">4</span>
            </div>
            <h3 className="font-bold text-white text-xl">Polarity Verification</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That all single-pole
            switching devices (light switches, MCBs, fuse carriers) are connected in the line
            conductor only, that socket outlets are correctly wired (line right, neutral left, earth
            top), and that Edison-screw lampholders have line connected to the centre contact.
            Incorrect polarity can leave metalwork live when a switch is turned off, or render an
            MCB ineffective because it is in the neutral.
          </p>
          <p>
            <strong className="text-yellow-400">Method:</strong> Polarity is largely verified during
            the continuity tests — by measuring continuity between specific conductors, you confirm
            which conductor is connected to which terminal. It is also confirmed by visual
            inspection (checking wiring at accessories). Final verification may require brief
            energisation — which is safe because insulation resistance has already been confirmed.
          </p>
          <p>
            <strong className="text-yellow-400">Pass/fail:</strong> All single-pole devices must be
            in the line conductor. All socket outlets must have correct L-N-E connections. Any
            incorrect polarity is a failure that must be corrected before the installation is put
            into service.
          </p>
          <p>
            <strong className="text-yellow-400">Why it is fourth:</strong> Polarity verification
            bridges the dead tests and the live tests. Much of the confirmation comes from
            continuity tests already completed. Where energisation is needed for final verification,
            this is safe because insulation resistance has been confirmed.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'test-5',
    heading: 'Test 5: Earth Electrode Resistance (Where Applicable)',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">5</span>
            </div>
            <h3 className="font-bold text-white text-xl">Earth Electrode Resistance</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That the resistance of the
            earth electrode (on TT systems) is low enough to allow sufficient fault current to flow
            for the protective device to operate. On TT systems, where the installation relies on
            its own earth electrode rather than the supply company earth, this test confirms the
            electrode provides an adequate connection to the general mass of earth.
          </p>
          <p>
            <strong className="text-yellow-400">Method:</strong> The earth electrode resistance can
            be measured using the dedicated earth electrode resistance function on an MFT or a
            dedicated earth electrode resistance tester using the fall-of-potential method.
            Alternatively, a working value can be obtained from the loop impedance test — the
            measured Ze on a TT system is approximately equal to the earth electrode resistance plus
            the resistance of the supply transformer earthing. This test applies to TT installations
            and is not required on TN-S or TN-C-S systems where the earth is provided by the supply
            company.
          </p>
          <p>
            <strong className="text-yellow-400">Pass/fail:</strong> The earth electrode resistance
            (RA) multiplied by the rated residual operating current of the RCD (IΔn) must not exceed
            50 V (the touch voltage limit). For a 30 mA RCD: RA x IΔn must be no greater than 50 V,
            giving a maximum RA of 1667 ohms. In practice, values below 200 ohms are preferred for
            reliability.
          </p>
          <p>
            <strong className="text-yellow-400">Why it is fifth:</strong> Earth electrode resistance
            is the final dead test. It must be confirmed before energising the installation for live
            tests on TT systems because the earth electrode is the sole means of earthing — if it is
            inadequate, energising could create a shock hazard.
          </p>
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
          Live tests are carried out with the circuit energised at mains voltage. They can only be
          performed safely after all dead tests have been completed satisfactorily — meaning
          continuity of the protective conductor is confirmed, the ring (if applicable) is intact,
          insulation resistance meets the minimum values, polarity is correct, and earth electrode
          resistance is adequate (where applicable). Energising a circuit that has not passed all
          dead tests is dangerous and must never be done.
        </p>
        <p>
          Before energising for live testing, remove all lock-off devices and warning labels. Ensure
          all test leads are disconnected. Restore the circuit to its normal operating condition
          (reconnect loads, replace fuses, close covers). Then energise the circuit and proceed with
          live testing in order.
        </p>
      </>
    ),
  },
  {
    id: 'test-6',
    heading: 'Test 6: Earth Fault Loop Impedance (Zs and Ze)',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">6</span>
            </div>
            <h3 className="font-bold text-white text-xl">Earth Fault Loop Impedance</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That the total impedance of
            the earth fault loop — from the point of the fault, through the CPC, through the main
            earthing terminal, through the external earth path back to the supply transformer, and
            through the transformer winding back to the point of the fault — is low enough for the
            protective device to operate within the required disconnection time. This is the Zs test
            — the single most important electrical safety verification.
          </p>
          <p>
            <strong className="text-yellow-400">Method:</strong> Measure Ze at the origin of the
            installation with the main earthing conductor temporarily disconnected from the main
            earthing terminal. Then measure Zs at the furthest point of each circuit using the loop
            impedance function on the MFT. Compare the measured Zs against the maximum permitted
            value from{' '}
            <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
            tables for the type and rating of the protective device.
          </p>
          <p>
            <strong className="text-yellow-400">Pass/fail:</strong> The measured Zs must not exceed
            the maximum value tabulated in BS 7671. The "80% rule" — that measured values at ambient
            temperature should not exceed 80% of the tabulated maximum — is a design guideline to
            allow for conductor temperature rise during normal operation. Values exceeding the
            tabulated maximum are failures. For example, a B32 MCB has a maximum tabulated Zs of
            1.37 ohms; the 80% design value is 1.10 ohms.
          </p>
          <p>
            <strong className="text-yellow-400">Verification:</strong> Check that Zs is
            approximately equal to Ze + (R1+R2). If the measured Zs is significantly higher than the
            calculated value, there may be a high-resistance connection in the earth path that was
            not detected during continuity testing.
          </p>
        </div>
        <SEOAppBridge
          title="Voice-to-test-results — speak values while holding probes"
          description="On site with probes in hand? Just speak: 'Ring 1, R1+R2 0.32, Zs 0.89, insulation 200 meg.' Elec-Mate fills in the schedule of test results for you. Hands-free data entry designed for how electricians actually work."
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
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">7</span>
            </div>
            <h3 className="font-bold text-white text-xl">Prospective Fault Current</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That the maximum fault
            current that could flow under a short-circuit or earth fault condition does not exceed
            the rated breaking capacity (kA rating) of the protective devices installed. If the
            fault current exceeds the device rating, the device may not safely interrupt the fault,
            potentially causing it to explode or catch fire.
          </p>
          <p>
            <strong className="text-yellow-400">Method:</strong> Prospective fault current is
            measured or calculated at the origin of the installation. Most MFTs calculate Ipf
            automatically from the loop impedance measurement. For a line-earth fault, Ipf = Uo/Zs.
            For a line-neutral short circuit, Ipf = Uo/Zline-neutral. The highest value (typically
            the line-neutral short circuit) is the one that must not exceed the device breaking
            capacity.
          </p>
          <p>
            <strong className="text-yellow-400">Pass/fail:</strong> The prospective fault current
            must not exceed the rated breaking capacity of the protective device. Standard domestic
            MCBs have a minimum breaking capacity of 6 kA. Ipf exceeding 6 kA requires devices with
            higher ratings. The Ipf is recorded on the{' '}
            <SEOInternalLink href="/guides/electrical-certificate-types-uk">
              EIC or EICR
            </SEOInternalLink>
            .
          </p>
          <p>
            <strong className="text-yellow-400">Why it is seventh:</strong> It follows naturally
            from the loop impedance test — in many cases, the Ipf is calculated from the same
            measurements. It is a live test that requires the circuit to be energised.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'test-8',
    heading: 'Test 8: Functional Testing (Including RCD Operation)',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
              <span className="font-bold text-yellow-400">8</span>
            </div>
            <h3 className="font-bold text-white text-xl">Functional Testing</h3>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <p>
            <strong className="text-yellow-400">What it proves:</strong> That all assemblies,
            switchgear, controlgear, interlocks, controls, and RCDs function correctly as intended.
            This is the final test in the sequence and includes RCD operation testing — confirming
            that every RCD in the installation (RCCBs, RCBOs, and socket-outlet RCDs) trips at the
            correct current and within the required time. It also verifies that all switching
            devices, isolators, and interlocking arrangements operate as designed. This test is
            often the most overlooked, but it is required by BS 7671 Regulation 643.10. For a
            detailed guide to RCD testing, see our{' '}
            <SEOInternalLink href="/guides/rcd-testing-guide">RCD testing guide</SEOInternalLink>.
          </p>
          <p>
            <strong className="text-yellow-400">RCD testing method:</strong> For each RCD, carry out
            the following tests using the RCD test function on the MFT:
          </p>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Push-button test:</strong> Confirm the mechanical trip mechanism works
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>0.5x IΔn (half-rated):</strong> Test on both half-cycles — must NOT trip
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>1x IΔn (rated current):</strong> Test on both half-cycles — must trip
                  within 300 ms (general type) or 130 to 500 ms (Type S)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>5x IΔn (five times rated):</strong> Test on both half-cycles — must trip
                  within 40 ms (general type) or 50 to 200 ms (Type S)
                </span>
              </li>
            </ul>
          </div>
          <p>
            <strong className="text-yellow-400">Other functional tests:</strong> All switching
            devices (isolators, circuit breakers, switches) for correct operation and mechanical
            integrity. All interlocking devices for correct sequencing. Time switches, photoelectric
            cells, and PIR sensors for correct activation. Dimmer switches for smooth operation.
            Emergency switching devices (fireman switches, emergency stop buttons) for correct
            operation. Any automation, BMS controls, or smart switching.
          </p>
          <p>
            <strong className="text-yellow-400">Why it is last:</strong> Functional testing is the
            final test because it requires the installation to be fully energised and operating in
            its normal state. RCD testing deliberately injects fault current through the earth path.
            All previous tests must have confirmed that the earth path is continuous (test 1), the
            ring is complete (test 2), the insulation is sound (test 3), the polarity is correct
            (test 4), the earth electrode resistance is adequate where applicable (test 5), the loop
            impedance is acceptable (test 6), and the fault current is within device ratings (test
            7). Only then is it safe to deliberately inject fault current and test all functional
            aspects of the installation.
          </p>
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
          Even experienced electricians make testing errors. These are the most common mistakes and
          why they matter.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Testing loop impedance before insulation resistance
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Performing the Zs test before verifying insulation resistance means energising a
                  circuit that may have a fault to earth. This could cause a short circuit, trip
                  protective devices, damage the test instrument, or create an electric shock or arc
                  flash hazard.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Not disconnecting loads for insulation resistance testing
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Leaving appliances connected during insulation resistance testing gives
                  misleadingly low readings (the appliance impedance is in parallel with the cable
                  insulation) and can damage sensitive electronic equipment — the 500 V DC test
                  voltage can destroy electronic controllers, LED drivers, and dimmer switches.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Skipping the half-rated RCD test</h3>
                <p className="text-white text-sm leading-relaxed">
                  Some electricians skip the 0.5x IΔn test and go straight to the 1x test. This
                  means an overly sensitive RCD (one that trips below its rated current) would not
                  be detected. An overly sensitive RCD is a nuisance tripping risk — the occupant
                  may disable it, leaving the circuit unprotected.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Not testing RCDs on both half-cycles</h3>
                <p className="text-white text-sm leading-relaxed">
                  RCDs must be tested on both positive (0 degrees) and negative (180 degrees)
                  half-cycles. An RCD that passes on one half-cycle but fails on the other has
                  failed the test. The worst-case (longest) trip time from either half-cycle is the
                  value recorded on the certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Using uncalibrated instruments</h3>
                <p className="text-white text-sm leading-relaxed">
                  All test instruments must be calibrated and within their calibration date.
                  Uncalibrated instruments may give inaccurate readings — passing circuits that
                  should fail or failing circuits that should pass. Calibration is typically
                  required annually and must be recorded on the certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Forgetting functional testing</h3>
                <p className="text-white text-sm leading-relaxed">
                  Functional testing (test 8) is required by BS 7671 but is frequently omitted or
                  done superficially. Switching devices that do not operate correctly, time clocks
                  that are not set, and interlocks that do not function represent real defects that
                  should be recorded and rectified.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Board scanner populates circuit data from a photo"
          description="Point your phone at the distribution board and Elec-Mate's AI reads MCB/RCBO ratings, circuit details, and board layout. No more squinting at faded labels. Start the schedule of tests with the data already filled in."
          icon={Camera}
        />
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
    href: '/guides/how-to-test-insulation-resistance',
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
    href: '/guides/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'Complete guide to RCD testing — trip times, half-cycle testing, Type A vs Type AC.',
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
    href: '/training/inspection-and-testing',
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
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ListOrdered}
      heroTitle={
        <>
          Electrical Testing Sequence:{' '}
          <span className="text-yellow-400">Dead and Live Testing Order</span>
        </>
      }
      heroSubtitle="The correct electrical testing sequence per BS 7671 and IET Guidance Note 3 (GN3, 9th Edition). Continuity, insulation resistance, polarity, earth electrode resistance, earth fault loop impedance, prospective fault current, and functional testing (including RCD operation) — why the order matters, what each test measures, pass/fail criteria, and common mistakes."
      readingTime={22}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="The Complete Testing Sequence: Step by Step"
      howToDescription="The full BS 7671 / GN3 testing sequence from safe isolation through to functional testing, with pass/fail criteria for each test."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Record test results digitally, validated automatically"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Voice test entry, auto BS 7671 validation, board scanner, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
