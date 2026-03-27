import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  Info,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing Guides', href: '/guides/electrical-testing' },
  { label: 'RCD Testing Guide', href: '/rcd-testing-guide' },
];

const tocItems = [
  { id: 'what-is-rcd-testing', label: 'What Is RCD Testing?' },
  { id: 'half-rated-test', label: 'Half-Rated Current Test (I\u0394n/2)' },
  { id: 'rated-current-test', label: 'Rated Current Test (I\u0394n)' },
  { id: 'five-times-test', label: '5\u00d7 Rated Current Test' },
  { id: 'ramp-test', label: 'Ramp Test' },
  { id: 'instrument-connection', label: 'Instrument Connection Method' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'nuisance-tripping', label: 'Nuisance Tripping Causes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Regulation 612.9 requires RCDs to be tested at the time of installation and periodically thereafter. The half-rated current test (at half rated current) must NOT cause the RCD to trip within 2 seconds.',
  'A 30mA RCD tested at its rated tripping current (30mA) must trip within 300ms (0.3 seconds) per BS EN 61008/61009. At 5 times rated current (150mA for a 30mA RCD), it must trip within 40ms.',
  'S-type (time-delayed) RCDs have different limits: they must not trip within 130ms at rated current, and must trip within 500ms. They are used in series with standard RCDs to provide discrimination.',
  'The test must be performed with the instrument connected between the line terminal (downstream of the RCD) and the main earth terminal. Never connect to the neutral — the instrument must drive current through the RCD sensing coil.',
  'All RCDs must be tested at 0 degrees (positive half-cycle) and 180 degrees (negative half-cycle) phase angles. Some instruments require manual phase selection; others cycle through both automatically.',
];

const faqs = [
  {
    question: 'What tests are required for RCDs under BS 7671?',
    answer:
      'BS 7671 Regulation 612.9 requires RCDs to be tested to confirm that they operate correctly. The required tests are: the half-rated current test (at half rated current — the RCD must NOT trip within 2 seconds), the rated current test (must trip within 300ms for a standard 30mA general type), and the 5 times rated current test (must trip within 40ms for a standard type). For S-type (time-delayed) RCDs, different limits apply. Many inspectors also perform a ramp test to determine the actual tripping current threshold.',
  },
  {
    question: 'What is the half-rated current test and what must the result be?',
    answer:
      'The half-rated current test applies a residual current equal to half the rated tripping current of the RCD — so 15mA for a 30mA RCD. At this current level, the RCD must NOT trip within 2 seconds. This confirms the RCD does not have an excessively low trip threshold that would cause nuisance tripping. If the RCD trips at half rated current, it is out of specification and must be replaced. The 2-second test duration is the standard used in UK practice and aligns with BS EN 61008 and BS EN 61009.',
  },
  {
    question: 'What is the maximum trip time for a 30mA RCD at rated current?',
    answer:
      'A 30mA RCD tested at its rated residual operating current (30mA) must trip within 300ms (0.3 seconds). This applies to general type (non-time-delayed) RCDs to BS EN 61008 and RCBOs to BS EN 61009. For S-type (selective or time-delayed) RCDs, the limit is 500ms at rated current, and they must NOT trip before 130ms — providing a delay that allows a downstream standard RCD to trip first.',
  },
  {
    question: 'At what phase angle should RCDs be tested?',
    answer:
      'RCDs must be tested at both 0 degrees (positive half-cycle of the supply waveform) and 180 degrees (negative half-cycle). This is because some RCD designs may have asymmetric sensitivity — responding differently to current in one direction versus the other. Both tests must pass within the required limits. On modern multifunction test instruments, the phase angle is selectable. Some instruments test both angles automatically. Record both results on the schedule of test results.',
  },
  {
    question: 'Can you use the test button on an RCD instead of an instrument test?',
    answer:
      'The test button on an RCD is a self-test function that checks the RCD mechanism is free and will operate — it does NOT test the RCD to the required current and time limits of BS 7671. The test button is suitable for a user monthly check (recommended in BS 7671 Regulation 514.12.2 notices), but it does not constitute a compliant inspection and testing procedure. A properly calibrated instrument must be used for the measured current and trip time tests required by BS 7671 Chapter 61.',
  },
  {
    question: 'What causes RCD nuisance tripping?',
    answer:
      'Nuisance tripping occurs when an RCD operates at a current level below its rated tripping current due to the cumulative earth leakage of all equipment connected to that RCD. Common causes include: long cable runs with significant cable capacitance; cookers and washing machines with internal filter capacitors and heating element earth leakage; some fluorescent luminaire ballasts with earth leakage; IT equipment power supplies; and multiple circuits protected by a single whole-board RCD. A 30mA RCD protecting many long circuits may see 10 to 20mA of standing leakage before any fault occurs.',
  },
  {
    question: 'What is an S-type (time-delayed) RCD and when is it used?',
    answer:
      'An S-type RCD (also called a selective or time-delayed RCD) is designed to provide discrimination in a two-level RCD system. Where a whole-board S-type RCD is installed upstream, and standard type RCDs protect individual circuits downstream, a fault on a circuit will trip the downstream standard RCD before the upstream S-type can operate. This means only the faulted circuit loses supply, not the whole board. S-type RCDs must not trip before 130ms and must trip within 500ms at rated current. They must not trip before 50ms and must trip within 200ms at 5 times rated current.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/insulation-resistance-testing-guide',
    title: 'Insulation Resistance Testing Guide',
    description: 'Test voltages, minimum values, disconnecting components, and interpreting IR results.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/continuity-testing-guide',
    title: 'Continuity Testing Guide',
    description: 'Ring final circuit, CPC, and bonding conductor continuity test methods.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/loop-impedance-testing-guide',
    title: 'Loop Impedance Testing Guide',
    description: 'Ze, Zs, and prospective fault current testing explained.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/polarity-test-guide',
    title: 'Polarity Testing Guide',
    description: 'Polarity test methods, common errors, and how to trace them.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Overview of the wiring regulations and key changes in Amendment 3.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-rcd-testing',
    heading: 'What Is RCD Testing and Why Is It Required?',
    content: (
      <>
        <p>
          A residual current device (RCD) protects against electric shock by detecting imbalance
          between the current in the line and neutral conductors — caused by current flowing to
          earth through a person or fault path. When the residual current (the imbalance) exceeds
          the rated sensitivity, the RCD must operate and disconnect the supply within the required
          time.
        </p>
        <p>
          RCDs are mechanical and electronic devices that can fail or degrade over time without
          any obvious external sign. A mechanically stuck or electrically degraded RCD may fail
          to trip when required, leaving connected equipment and persons unprotected.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>{' '}
          Regulation 612.9 therefore requires RCDs to be tested at the time of installation and
          as part of every periodic inspection and test.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>RCDs covered by this guide</strong>: This guide covers testing of 30mA
              general type RCDs (the most common type in UK domestic and commercial installations,
              required for socket outlets under Regulation 411.3.3), 100mA and 300mA RCDs used
              for fire protection, and S-type (time-delayed) RCDs. The same test principles apply
              to RCBOs (combined MCB and RCD in a single device).
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'half-rated-test',
    heading: 'Half-Rated Current Test — Must NOT Trip in 2 Seconds',
    content: (
      <>
        <p>
          The half-rated current test verifies that the RCD does not have an excessively low
          operating threshold that would cause it to trip on normal earth leakage currents. At
          half the rated tripping current, the RCD must remain closed for at least 2 seconds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test current</strong>: For a 30mA RCD, the test current is 15mA (half of
                30mA). For a 100mA RCD, the test current is 50mA. For a 300mA RCD, the test
                current is 150mA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required result</strong>: The RCD must NOT trip during the 2-second test
                period. If the RCD trips at half rated current, it is operating below its rated
                threshold. This is a fail — the RCD is defective and must be replaced. Record the
                actual trip time if the RCD does trip during the half-rated test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at both phase angles</strong>: Test at 0 degrees and 180 degrees.
                An RCD that passes at 0 degrees but trips at 180 degrees (or vice versa) has an
                asymmetric fault and must be replaced.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rated-current-test',
    heading: 'Rated Current Test — Maximum 300ms for 30mA General Type',
    content: (
      <>
        <p>
          The rated current test applies the full rated residual operating current and verifies
          that the RCD trips within the required time. This is the primary safety verification test.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard general type RCD (30mA)</strong>: Must trip within 300ms (0.3
                seconds) at 30mA. This is the maximum disconnection time at rated current per
                BS EN 61008-1 and BS EN 61009-1. A 30mA RCD that takes longer than 300ms to trip
                at rated current is defective and must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>100mA and 300mA RCDs (fire protection type)</strong>: Same maximum
                disconnection time of 300ms at rated current. These higher-sensitivity RCDs protect
                against fire risk from sustained low-level earth faults rather than personal
                protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>S-type (time-delayed) RCD</strong>: Must NOT trip before 130ms and must
                trip within 500ms at rated current. The intentional delay allows downstream standard
                RCDs to operate first. If an S-type RCD trips in less than 130ms, it is defective.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at both phase angles (0 and 180 degrees)</strong>: The trip time at
                both phase angles must be within the required limit. Record both results on the
                schedule of test results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'five-times-test',
    heading: '5 Times Rated Current Test — Maximum 40ms',
    content: (
      <>
        <p>
          The 5 times rated current test verifies that the RCD operates very rapidly under
          conditions simulating a severe direct contact fault. At 5 times the rated operating
          current, virtually all the current is flowing through a person in direct contact with a
          live part — the RCD must disconnect within 40ms to limit the energy delivered to the body.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test current</strong>: For a 30mA RCD, the 5 times test current is 150mA.
                For a 100mA RCD, it is 500mA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required result — general type</strong>: Must trip within 40ms. This is
                the maximum disconnection time at 5 times rated current for a standard
                (non-time-delayed) RCD per BS EN 61008 and BS EN 61009.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required result — S-type</strong>: An S-type RCD at 5 times rated current
                must NOT trip before 50ms and must trip within 200ms. The intentional delay is
                reduced at higher currents to prevent energy accumulation, but remains longer than
                the standard type to maintain discrimination.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Test sequencing</strong>: Perform the half-rated test first, then the rated
              current test, then the 5 times test. Running the 5 times test first may trip the RCD
              before the other tests can be performed. Always reset the RCD between each test and
              allow a brief settling period before the next test.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ramp-test',
    heading: 'Ramp Test — Finding the Actual Trip Threshold',
    content: (
      <>
        <p>
          The ramp test gradually increases the residual current from zero until the RCD trips,
          recording the actual trip current. This verifies that the RCD trips between 50% and 100%
          of its rated operating current — the acceptable operating range per BS EN 61008/61009.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Acceptable range for a 30mA RCD</strong>: The ramp test must show the RCD
                tripping at a current between 15mA and 30mA. A trip below 15mA indicates an
                excessively sensitive device prone to nuisance tripping. A trip above 30mA indicates
                a device that may not provide adequate personal protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to use the ramp test</strong>: The ramp test is most useful when
                investigating nuisance tripping complaints — to verify the RCD's actual threshold.
                It is not always mandated by BS 7671 as a standalone test, but many competent
                inspectors include it as good practice. Check whether your certification scheme
                requires it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the ramp trip current</strong>: Note the actual trip current on the
                schedule of test results alongside the standard test results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'instrument-connection',
    heading: 'Instrument Connection Method',
    content: (
      <>
        <p>
          Correct instrument connection is essential for valid RCD testing. The instrument must be
          connected so that the test current flows through the RCD sensing coil but not through the
          neutral conductor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Identify the test point</strong>: Connect the instrument at a socket outlet,
              accessory, or terminal box that is downstream (protected side) of the RCD being
              tested. The connection must be on the load side of the RCD — not at the source side.
            </li>
            <li>
              <strong>Connect line to line terminal</strong>: The instrument's line test lead
              connects to the line terminal at the test point.
            </li>
            <li>
              <strong>Connect earth to the main earthing terminal</strong>: The instrument's earth
              test lead connects to the main protective earth conductor — ideally at the main
              earthing terminal at the consumer unit, not at the local earth terminal of the socket
              outlet. This ensures the test current path is correct.
            </li>
            <li>
              <strong>Do NOT connect to neutral</strong>: The neutral terminal must NOT be used
              for the test connection. The instrument drives test current from line to earth —
              this creates the residual current imbalance that the RCD detects. Connecting via the
              neutral would bypass the RCD's current transformer and invalidate the test.
            </li>
            <li>
              <strong>Set the phase angle</strong>: Select 0 degrees for the first test, then
              180 degrees for the second. Record both results separately.
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Testing RCBOs</strong>: RCBOs (combined MCB and RCD) are tested using
              exactly the same method as RCDs. Connect downstream of the RCBO at the first
              protected outlet. Confirm the trip time at rated current and at 5 times rated
              current. The RCBO must be reset after each test.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording RCD Test Results',
    content: (
      <>
        <p>
          RCD test results are recorded on the Schedule of Test Results as part of the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            EICR or Electrical Installation Certificate
          </SEOInternalLink>
          . For each RCD, the following must be recorded:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD type and rated operating current</strong>: General type or S-type,
                and the rated operating current (e.g., 30mA, 100mA, 300mA).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half-rated test result</strong>: Pass (did not trip in 2 seconds) or
                Fail (tripped). If fail, record the actual trip time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rated current trip time at 0 and 180 degrees</strong>: Record actual
                trip times in milliseconds for both phase angles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5 times current trip time at 0 and 180 degrees</strong>: Record actual
                trip times in milliseconds for both phase angles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ramp test result (if performed)</strong>: Record the actual trip current
                in milliamps.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record RCD test results on site with Elec-Mate"
          description="Enter RCD trip times and phase angle results on your phone. The Elec-Mate testing app auto-checks results against BS EN 61008/61009 limits and flags failures instantly. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'nuisance-tripping',
    heading: 'Nuisance Tripping — Causes and Solutions',
    content: (
      <>
        <p>
          Nuisance tripping is when an RCD operates in the absence of a genuine dangerous fault,
          causing unnecessary loss of supply. It is a common complaint and one of the most frequent
          reasons for electricians to be called to domestic properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cumulative earth leakage</strong>: Every piece of equipment connected to
                an RCD-protected circuit has some degree of earth leakage — typically due to Y-class
                filter capacitors in switch-mode power supplies, cookers, and washing machines.
                Individually these are below the trip threshold, but collectively they may approach
                or exceed 30mA. Solution: split the load across multiple RCDs, or upgrade to RCBOs
                on individual circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transient overvoltages (lightning and switching)</strong>: Voltage transients
                can cause a momentary current imbalance that trips a sensitive RCD. Surge protective
                devices (SPDs) reduce this risk. BS 7671:2018+A2:2022 introduced mandatory SPD
                requirements for certain installation types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable runs with high capacitance</strong>: Underground cables, armoured
                cables, and long conduit runs have significant capacitance between line and earth.
                This capacitance causes a leakage current even on healthy circuits. Particularly
                relevant for outdoor and outbuilding circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD below specified sensitivity</strong>: An RCD with an actual trip
                threshold below 15mA (confirmed by the ramp test) will cause nuisance trips.
                Replace the RCD.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: RCD Testing in Practice',
    content: (
      <>
        <p>
          RCD testing is a straightforward but time-critical process on site. Testing every RCD
          and RCBO individually, at both phase angles, and for all three test conditions generates
          a significant number of data points per board.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Enter RCD Results On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  The{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate testing app
                  </SEOInternalLink>{' '}
                  lets you enter RCD trip times for each phase angle and test level as you go.
                  Auto-checks each result against BS EN 61008/61009 limits and flags any failures
                  before you reset the board and lose track.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Warn Clients Before Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  RCD testing will trip circuits and interrupt supply. Warn occupants before
                  starting. Check for medical equipment (dialysis machines, stairlifts, alarms)
                  that must not lose power, and plan the test sequence to isolate sensitive
                  circuits last or work with the client to temporarily relocate equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RCDTestingGuidePage() {
  return (
    <GuideTemplate
      title="RCD Testing Guide UK | RCD Test Procedures BS 7671"
      description="Complete guide to RCD testing for UK electricians. Half-rated current test, rated current trip time (300ms for 30mA type), 5 times current test (40ms), ramp test, instrument connection, recording results, and nuisance tripping causes."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          RCD Testing Guide:{' '}
          <span className="text-yellow-400">RCD Test Procedures to BS 7671</span>
        </>
      }
      heroSubtitle="The complete UK electrician's guide to RCD testing — half-rated current test, rated current trip time (300ms maximum for 30mA general type), 5 times current test (40ms maximum), ramp test, correct instrument connection, recording results, and diagnosing nuisance tripping."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About RCD Testing"
      relatedPages={relatedPages}
      ctaHeading="Record RCD Test Results On Site with Elec-Mate"
      ctaSubheading="Auto-check RCD trip times against BS EN 61008/61009 limits. Enter results on your phone and export a compliant schedule of test results. 7-day free trial."
    />
  );
}
