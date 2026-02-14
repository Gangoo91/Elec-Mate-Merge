import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ZapOff,
  Activity,
  FileCheck2,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Gauge,
  GraduationCap,
  Mic,
  ListOrdered,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/testing-sequence-guide' },
  { label: 'Dead vs Live Testing', href: '/guides/dead-vs-live-testing' },
];

const tocItems = [
  { id: 'why-sequence-matters', label: 'Why the Sequence Matters' },
  { id: 'safe-isolation', label: 'Safe Isolation Before Dead Testing' },
  { id: 'dead-tests', label: 'Dead Tests Explained' },
  { id: 'live-tests', label: 'Live Tests Explained' },
  { id: 'test-sequence', label: 'Full Test Sequence' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Dead tests are performed with the supply isolated and include continuity of protective conductors (R1+R2), continuity of ring final circuit conductors, insulation resistance, and polarity.',
  'Live tests are performed with the supply energised and include earth fault loop impedance (Zs), prospective fault current (PSCC/PEFC), RCD operation, and functional checks.',
  'Dead tests must always be completed before live tests — you cannot safely energise a circuit until you have confirmed its insulation is sound and its protective conductors are continuous.',
  'Safe isolation must be carried out and verified before any dead testing begins, following the procedure in GS38 and BS 7671.',
  'Elec-Mate guides you through the correct test sequence automatically and records results by voice — no risk of testing in the wrong order.',
];

const faqs = [
  {
    question: 'Why must dead tests be done before live tests?',
    answer:
      'Dead tests verify the fundamental safety of the circuit before it is energised. Continuity testing confirms that protective conductors are connected and will carry fault current. Insulation resistance testing confirms that there are no short circuits between live conductors or between live conductors and earth. If you skip dead testing and energise a circuit with a short circuit or a broken earth, you could cause a fault, a fire, or an electric shock. The sequence is not optional — it is a requirement of BS 7671 Chapter 64, which specifies that dead tests (Section 643) must be completed before the installation is energised for live testing (Section 644). GN3 (Guidance Note 3) reinforces this sequence and provides the detailed procedures for each test.',
  },
  {
    question: 'What counts as a dead test?',
    answer:
      'The dead tests specified in BS 7671 Section 643 are: continuity of protective conductors including main and supplementary bonding (643.2), continuity of ring final circuit conductors (643.2), insulation resistance between live conductors and between live conductors and earth (643.3), separation of circuits such as SELV and PELV (643.4), insulation resistance or impedance of non-conducting floors and walls (643.5), polarity verification (643.6), and earth electrode resistance for TT systems (643.7). These tests are all performed with the supply isolated and the circuits de-energised. The instrument used depends on the test — a low-resistance ohmmeter for continuity, a 500 V DC insulation resistance tester for IR, and a dedicated earth electrode tester for RA.',
  },
  {
    question: 'What counts as a live test?',
    answer:
      'The live tests specified in BS 7671 Section 644 are: earth fault loop impedance Zs (644.3), prospective fault current — both prospective short-circuit current (PSCC) and prospective earth fault current (PEFC) (644.4), RCD operation including trip time and trip current (643.10), verification of phase sequence for three-phase supplies (644.5), and functional testing of switchgear, controls, interlocks, and other devices (643.10). These tests require the supply to be energised. A multifunction tester (MFT) can perform Zs, PSCC/PEFC, and RCD tests. Functional testing is done manually by operating each device and confirming correct operation.',
  },
  {
    question: 'Can I do live testing without completing all dead tests first?',
    answer:
      'No. BS 7671 requires that every installation is inspected and tested during erection and on completion, before being put into service. The sequence in Part 6 is prescriptive: inspection first (Section 641), then dead testing (Section 643), then live testing (Section 644). Energising a circuit without completing dead tests is dangerous and non-compliant. If you are doing a periodic inspection and the installation is already energised, you should still follow the correct procedure: isolate each circuit before performing dead tests on it, then re-energise for live tests. In practice, some electricians perform live tests first on a periodic inspection to minimise supply disruption — this is accepted by some scheme providers but carries risk and should only be done where the electrician is confident the circuit is safe.',
  },
  {
    question: 'Do I need to do dead and live tests on every circuit during a periodic inspection?',
    answer:
      'For a periodic inspection (EICR), IET Guidance Note 3 (GN3) allows sampling — you do not have to test every circuit if the results from a representative sample indicate the installation is in good condition. However, certain tests must be done on every circuit regardless: earth fault loop impedance, RCD operation (where RCDs are installed), and polarity. Continuity and insulation resistance can be sampled, but if any sample fails, the scope must be extended to include all circuits. GN3 recommends a minimum sample size of 10% of similar circuits, increasing to 100% if faults are found. The decision on sampling should be justified and recorded on the EICR. For initial verification, every circuit must be fully tested — no sampling is permitted.',
  },
  {
    question: 'What instrument settings do I need for dead tests vs live tests?',
    answer:
      'For dead tests, you need: a low-resistance ohmmeter (typically part of a multifunction tester) set to continuity mode for R1+R2 and ring circuit testing, and a 500 V DC insulation resistance tester for IR testing on standard circuits (250 V DC for SELV circuits, 1000 V DC for circuits over 500 V). For live tests, you need: an earth fault loop impedance tester (Zs mode on your MFT), a prospective fault current meter (PSCC/PEFC mode — usually automatic on modern MFTs), an RCD tester set to the correct rating (30 mA, 100 mA, 300 mA) and trip time (x1 and x5 for general RCDs), and a voltage indicator for functional checks. Always check your instrument calibration is in date before testing.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/testing-sequence-guide',
    title: 'Full Testing Sequence Guide',
    description:
      'Step-by-step guide to the complete test sequence for initial verification and periodic inspection.',
    icon: ListOrdered,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'The GS38-compliant procedure for safely isolating circuits before dead testing.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description:
      'How to perform IR testing at 500 V DC and interpret minimum values for EICR certificates.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description:
      'Measuring R1+R2 values for radial and ring circuits to confirm protective conductor continuity.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-sequence-matters',
    heading: 'Why the Dead-Before-Live Sequence Matters',
    content: (
      <>
        <p>
          Electrical testing is not a pick-and-choose exercise. BS 7671 Chapter 61 prescribes a
          specific order: visual inspection first, then dead tests, then live tests. This sequence
          exists for one reason — safety.
        </p>
        <p>
          Dead tests verify that the circuit is fundamentally sound before you energise it.{' '}
          <SEOInternalLink href="/guides/continuity-testing-r1-r2">
            Continuity testing
          </SEOInternalLink>{' '}
          confirms that the protective conductor (the earth wire) is connected throughout the
          circuit and will carry fault current to the protective device. Insulation resistance
          testing confirms there are no short circuits or insulation breakdowns between conductors.
          Polarity testing confirms that line and neutral are not transposed.
        </p>
        <p>
          If you skip dead tests and go straight to live testing, you are energising a circuit
          without knowing whether the earth is connected, the insulation is intact, or the polarity
          is correct. A circuit with a broken earth will not trip the protective device during a
          fault. A circuit with damaged insulation may cause a short circuit when energised. A
          circuit with reversed polarity may leave exposed metalwork live. Each of these scenarios
          can cause injury or death.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>{' '}
          is not guidance — it is a requirement. Follow it every time.
        </p>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safe Isolation: The First Step Before Any Dead Test',
    content: (
      <>
        <p>
          Before performing any dead test, the circuit or installation must be safely isolated. This
          means the supply is disconnected, locked off, and proven dead using an approved voltage
          indicator. The full{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedure
          </SEOInternalLink>{' '}
          follows GS38 (HSE Guidance Note 38) and involves:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Identify the circuit</strong> to be isolated using circuit charts, labels, and
              tracing.
            </li>
            <li>
              <strong>Select an approved voltage indicator</strong> that meets GS38 requirements.
              Two-pole testers (such as the Fluke T150 or Megger TPT420) are preferred over
              non-contact voltage detectors for proving dead.
            </li>
            <li>
              <strong>Test the voltage indicator</strong> on a known live source (or a proving unit)
              to confirm it is working correctly.
            </li>
            <li>
              <strong>Isolate the circuit</strong> at the appropriate point of isolation (MCB, RCBO,
              isolator switch, or main switch).
            </li>
            <li>
              <strong>Lock off the point of isolation</strong> using a lock and personal danger tag.
              Only you should hold the key.
            </li>
            <li>
              <strong>Test between all conductors</strong> — line-neutral, line-earth, and
              neutral-earth — at the point of work to confirm the circuit is dead.
            </li>
            <li>
              <strong>Re-test the voltage indicator</strong> on the known live source to confirm it
              is still working.
            </li>
          </ol>
        </div>
        <p>
          Only when the circuit is confirmed dead should you proceed with dead testing. This
          procedure applies whether you are doing initial verification or periodic inspection. On a
          periodic inspection of an existing installation, you isolate each circuit in turn, perform
          the dead tests, then re-energise for live tests.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white">
              <strong>Never assume a circuit is dead.</strong> Always prove dead with an approved
              voltage indicator before touching any conductor. "I turned it off at the board" is not
              proof of isolation — the circuit could be back-fed, the MCB could be mislabelled, or
              the wrong circuit could be isolated.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dead-tests',
    heading: 'Dead Tests: What They Are and How to Do Them',
    content: (
      <>
        <p>
          Dead tests are performed with the circuit de-energised (isolated). They are specified in
          BS 7671 Section 643 and must be completed before the circuit is energised for live
          testing. The dead tests are:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ZapOff className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Continuity of Protective Conductors (R1+R2)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Uses a low-resistance ohmmeter to measure the resistance of the circuit protective
                  conductor (CPC) from the distribution board to the furthest point. This confirms
                  the earth wire is connected and will carry fault current. The measured R1+R2 value
                  is also used to calculate the expected Zs (R1+R2 + Ze = Zs). See the{' '}
                  <SEOInternalLink href="/guides/continuity-testing-r1-r2">
                    continuity testing guide
                  </SEOInternalLink>{' '}
                  for the full procedure.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ZapOff className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Continuity of Ring Final Circuit Conductors
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Specific to ring circuits. The three conductors (line, neutral, CPC) are tested
                  individually to confirm they form a continuous ring with no breaks or
                  interconnections. This involves measuring end-to-end resistance of each conductor,
                  then cross-connecting and measuring at each socket to verify the ring is complete.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <ZapOff className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Insulation Resistance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Uses a 500 V DC test voltage to measure the resistance between live conductors and
                  between live conductors and earth. The minimum acceptable value is 1.0 megohm for
                  standard circuits. Values below this indicate insulation breakdown — a potential
                  fault path that could cause leakage current, nuisance RCD tripping, or a short
                  circuit. See the{' '}
                  <SEOInternalLink href="/guides/insulation-resistance-testing">
                    insulation resistance testing guide
                  </SEOInternalLink>{' '}
                  for detailed procedures.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ZapOff className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Polarity</h4>
                <p className="text-white text-sm leading-relaxed">
                  Confirms that single-pole switching devices are connected in the line conductor
                  only (not the neutral), that socket outlets are correctly wired (line on the right
                  when viewed from the front), and that the centre contact of Edison screw
                  lampholders is connected to line. Polarity can be verified using the continuity
                  tester as part of the R1+R2 test.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ZapOff className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Earth Electrode Resistance (TT Systems Only)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  For TT systems, the{' '}
                  <SEOInternalLink href="/guides/earth-electrode-testing">
                    earth electrode resistance
                  </SEOInternalLink>{' '}
                  must be measured using the fall of potential method. This confirms the electrode
                  provides a low enough resistance path for the RCD to operate within disconnection
                  times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'live-tests',
    heading: 'Live Tests: What They Are and How to Do Them',
    content: (
      <>
        <p>
          Live tests are performed with the supply energised. They are specified in BS 7671 Section
          644 and must only be carried out after all dead tests have been completed satisfactorily.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Earth Fault Loop Impedance (Zs)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measures the total impedance of the earth fault loop for each circuit — from the
                  point of the fault, through the CPC, back through the MET, and through the supply
                  transformer. The measured Zs must be less than the maximum value in BS 7671 Table
                  41.2, 41.3, or 41.4 for the protective device rating and type. If Zs is too high,
                  the protective device will not disconnect within the required time (0.4 s for
                  socket circuits, 5 s for fixed equipment in a TN system). See the{' '}
                  <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
                    earth fault loop impedance guide
                  </SEOInternalLink>{' '}
                  for full details.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Prospective Fault Current (PSCC / PEFC)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Measures the maximum current that would flow during a short circuit (PSCC) or an
                  earth fault (PEFC) at the origin of the installation. The protective devices must
                  have a breaking capacity equal to or greater than the prospective fault current. A
                  typical domestic supply has a PSCC of 2 to 6 kA at the origin. The measurement is
                  taken at the main distribution board. Use the{' '}
                  <SEOInternalLink href="/tools/prospective-fault-current-calculator">
                    prospective fault current calculator
                  </SEOInternalLink>{' '}
                  to verify.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RCD Operation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Tests each RCD at its rated residual current (x1) and five times rated current
                  (x5) to confirm it trips within the required time. A 30 mA RCD must trip within
                  300 ms at x1 (30 mA) and within 40 ms at x5 (150 mA). The ramp test (gradually
                  increasing current until the RCD trips) confirms the actual trip current. The test
                  is done using the RCD test function on a multifunction tester, connected at a
                  socket or accessory on the protected circuit. See the{' '}
                  <SEOInternalLink href="/guides/rcd-testing-guide">
                    RCD testing guide
                  </SEOInternalLink>{' '}
                  for detailed procedures.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Functional Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Manual operation of each switchgear device, interlock, and control to confirm
                  correct function. This includes operating every MCB, RCBO, and RCD manually,
                  testing isolator switches, checking that interlocked devices operate in the
                  correct sequence, and verifying emergency switching (such as fireman's switches or
                  emergency stop buttons).
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Voice-enter all your test results"
          description="Whether you are doing dead tests or live tests, speak your readings into Elec-Mate: 'Ring 1, R1+R2 0.32, IR 200 meg, Zs 0.89, RCD 18 milliseconds.' The schedule fills in while your hands stay on the probes."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'test-sequence',
    heading: 'Full Test Sequence: Dead Then Live',
    content: (
      <>
        <p>
          Here is the complete test sequence as specified by BS 7671 Chapter 61 and GN3. Follow this
          order for every initial verification. For periodic inspections, the same sequence applies
          per circuit (isolate, dead test, re-energise, live test).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Phase 1: Inspection (Before Testing)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                Visual inspection of the installation — correct cable types, routing, terminations,
                labelling, enclosures, and protective devices.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Phase 2: Dead Tests (Supply Isolated)
          </h3>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>Continuity of protective conductors (R1+R2)</li>
            <li>Continuity of ring final circuit conductors</li>
            <li>Insulation resistance (line-neutral, line-earth, neutral-earth)</li>
            <li>Polarity verification</li>
            <li>Earth electrode resistance (TT systems only)</li>
            <li>Separation of circuits (SELV/PELV if applicable)</li>
          </ol>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Phase 3: Live Tests (Supply Energised)
          </h3>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>Earth fault loop impedance (Zs) at each circuit</li>
            <li>Prospective fault current (PSCC and PEFC) at the origin</li>
            <li>RCD operation (x1 and x5 trip times)</li>
            <li>Phase sequence verification (three-phase supplies)</li>
            <li>Functional testing of all switchgear and controls</li>
          </ol>
        </div>
        <p>
          If any dead test fails, do not energise the circuit. Investigate the fault, rectify it,
          and re-test before proceeding. A failed insulation resistance test could indicate a short
          circuit that will trip the protective device (or worse) when energised. A failed
          continuity test means the earth is not connected and the circuit has no fault protection.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes When Testing',
    content: (
      <>
        <p>
          Even experienced electricians can fall into bad habits with the test sequence. These are
          the most common mistakes:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skipping dead tests on a periodic inspection.</strong> Some electricians go
                straight to live testing on an existing energised installation to avoid disrupting
                the supply. This is risky — you should isolate each circuit in turn and perform dead
                tests before live testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting to null the test leads.</strong> Before continuity testing, short
                the test leads together and subtract the lead resistance from your readings. Lead
                resistance of 0.2 to 0.5 ohms can make a significant difference to R1+R2 values on
                short circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not disconnecting electronic devices before IR testing.</strong> The 500 V
                DC test voltage used for insulation resistance testing can damage electronic
                equipment (dimmers, smart switches, USB sockets, smoke alarms). Disconnect or bypass
                them before testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing RCDs from the test button only.</strong> The test button on the RCD
                only confirms the mechanical trip mechanism works — it does not measure trip time or
                trip current. You must use an instrument to measure the actual trip time at x1 and
                x5 rated current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not recording all results.</strong> Every test result must be recorded on
                the schedule of test results. A blank field on the certificate is a red flag for
                scheme assessors and could indicate that the test was not performed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Dead and Live Test Results',
    content: (
      <>
        <p>
          All test results — both dead and live — are recorded on the schedule of test results that
          accompanies the <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>. Each circuit has a
          row on the schedule with columns for every required test value.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead test results:</strong> R1+R2 (ohms), r1+rn (ohms for ring circuits),
                insulation resistance (megohms), polarity (tick/cross).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live test results:</strong> Zs (ohms), PSCC/PEFC (kA), RCD trip time (ms at
                x1 and x5), functional test (tick/cross).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum permitted values:</strong> Record the maximum permitted Zs for each
                circuit (from BS 7671 tables) alongside the measured value so the reader can see at
                a glance whether the result passes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The AI in Elec-Mate automatically compares your measured values against BS 7671 maximum
          permitted values and flags any that exceed the limit. If a value fails, it suggests the
          correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>{' '}
          (C1, C2, C3, or FI) and the matching regulation number.
        </p>
        <SEOAppBridge
          title="Elec-Mate handles the test sequence for you"
          description="The app guides you through dead tests then live tests in the correct order. Voice-enter your readings, and the schedule of test results populates automatically. AI flags any failed values and suggests the right observation code."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DeadVsLiveTestingPage() {
  return (
    <GuideTemplate
      title="Dead Testing vs Live Testing | What's the Difference?"
      description="Complete guide to dead testing and live testing in electrical installations. Which tests are dead, which are live, the correct sequence from BS 7671, safe isolation procedure, and how to record results on EICR and EIC certificates."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Dead Testing vs Live Testing:{' '}
          <span className="text-yellow-400">What Every Electrician Must Know</span>
        </>
      }
      heroSubtitle="Dead tests first, live tests second. That sequence is not optional — it is a BS 7671 requirement. Dead tests confirm the circuit is safe to energise. Live tests confirm the protective devices will operate correctly under fault conditions. This guide explains every test, the correct order, and common mistakes."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Dead and Live Testing"
      relatedPages={relatedPages}
      ctaHeading="Follow the Correct Test Sequence Every Time"
      ctaSubheading="Elec-Mate guides you through dead tests then live tests in order. Voice-enter results, auto-flag failures, and export professional EICR or EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
