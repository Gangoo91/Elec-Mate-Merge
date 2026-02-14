import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Activity,
  Shield,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  BookOpen,
  ToggleRight,
  Tag,
  CheckCircle,
  Power,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Functional Testing Guide | What to Check After Installation';
const PAGE_DESCRIPTION =
  'Complete guide to functional testing for UK electricians. RCD test button checks, switching devices, isolators, interlocking, circuit identification, labelling requirements. BS 7671 compliant procedures with Elec-Mate.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Functional Testing', href: '/guides/functional-testing' },
];

const tocItems = [
  { id: 'what-is-functional-testing', label: 'What Is Functional Testing?' },
  { id: 'when-to-carry-out', label: 'When to Carry Out Functional Testing' },
  { id: 'rcd-test-button', label: 'RCD Test Button Verification' },
  { id: 'switching-devices', label: 'Switching Devices' },
  { id: 'isolators-and-interlocking', label: 'Isolators and Interlocking' },
  { id: 'circuit-identification', label: 'Circuit Identification and Labelling' },
  { id: 'other-functional-checks', label: 'Other Functional Checks' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'elec-mate', label: 'Functional Testing with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Functional testing is the final stage of verification after dead and live tests, confirming that switchgear, controls, and protective devices operate correctly under normal service conditions.',
  'The RCD test button must be checked on every RCD and RCBO — pressing the test button should cause immediate disconnection. This is distinct from the instrument RCD trip time test.',
  'Every switching device, isolator, and interlock must be operated to confirm correct mechanical function, correct circuit disconnection, and that the device controls the intended circuit.',
  'Circuit identification and labelling must be verified — every circuit must be uniquely identified, labelled at the distribution board, and the labelling must be durable and legible.',
  'Elec-Mate includes a functional testing checklist built into every certificate, ensuring no check is missed before the certificate is issued.',
];

const faqs = [
  {
    question: 'What is the difference between functional testing and the other BS 7671 tests?',
    answer:
      'The BS 7671 verification process has three main stages: dead tests (continuity, insulation resistance, polarity), live tests (earth fault loop impedance, PFC, RCD trip times), and functional testing. Dead and live tests use instruments to measure electrical values. Functional testing is the final stage and involves physically operating equipment to confirm it works correctly — pressing RCD test buttons, operating switches, checking interlocks, verifying labelling. It does not require test instruments. It is about confirming that the installation will function safely and correctly under normal service conditions.',
  },
  {
    question: 'Is functional testing required for an EICR as well as new installations?',
    answer:
      'Yes. Functional testing is required during both initial verification (new installation or alteration) and periodic inspection (EICR). During an EICR, the inspector must check that RCD test buttons operate correctly, that switching devices function, that isolators disconnect the correct circuits, and that labelling is present, accurate, and legible. If the labelling is missing, incorrect, or illegible, this is recorded as an observation — typically a C3 (improvement recommended) or C2 (potentially dangerous) if it could lead to someone working on the wrong circuit.',
  },
  {
    question: 'What happens if the RCD test button does not trip the RCD?',
    answer:
      'If the RCD test button does not cause the RCD to trip, the RCD is faulty and must be replaced. The test button is a built-in functional check that passes a small current through the RCD trip coil, simulating an earth leakage fault. If pressing the button does not cause disconnection, the RCD mechanism has failed — the device cannot be relied upon to disconnect in the event of a genuine earth fault. This is a serious safety issue. On an EICR, a non-functional RCD test button would typically be recorded as a C1 (danger present) or C2 (potentially dangerous) observation code depending on the circumstances.',
  },
  {
    question: 'Do I need to check every single circuit label during functional testing?',
    answer:
      'Yes. Regulation 514.9.1 of BS 7671 requires that every circuit is identified at its origin (the distribution board). During functional testing, you must verify that every MCB, RCBO, or fuse is labelled with a unique circuit designation, that the label accurately describes the circuit it protects, and that the label is durable and legible. For EICRs, you should also check that the circuit chart is present and up to date. Missing, incorrect, or illegible labels are a common observation on EICRs. On a new installation, incomplete labelling means the installation does not comply with BS 7671.',
  },
  {
    question: 'What interlocking devices need to be checked during functional testing?',
    answer:
      'Interlocking devices prevent equipment from being operated in an unsafe sequence. Common examples include: consumer unit or distribution board covers that cannot be removed while the main switch is on (preventing exposure to live busbars), changeover switches that prevent a generator and mains supply being connected simultaneously, and interlocks on motor starters that prevent a motor running until guards or covers are in place. During functional testing, you must operate the interlock mechanism and confirm it works correctly — for example, try to remove the DB cover with the main switch on (it should be physically prevented), or try to switch both sides of a changeover switch simultaneously (it should be mechanically blocked).',
  },
  {
    question: 'What should I check on switching devices during functional testing?',
    answer:
      'For every switching device (light switch, fused spur, timer, dimmer, contactor, etc.), you should confirm: the device switches on and off correctly, the device controls the intended circuit (not a different one), the device makes and breaks cleanly without arcing, sticking, or mechanical resistance, the device is correctly orientated (for standard plate switches, down should be off), and any indicator lamps or neons function correctly. For circuit breakers and RCBOs, confirm they switch on and trip off smoothly. For isolators, confirm they fully disconnect all live conductors from the downstream circuit.',
  },
  {
    question: 'How does Elec-Mate help with functional testing?',
    answer:
      'Elec-Mate includes a functional testing checklist integrated into every EIC, EICR, and Minor Works certificate. The checklist covers RCD test button verification, switching device operation, isolator checks, interlocking, circuit identification, and labelling. Each item has a pass/fail/not applicable selector. The app will not allow you to mark a certificate as complete if mandatory functional test items are left blank, ensuring nothing is missed. The 8 Elec-AI agents can answer questions about functional testing requirements in real time on site.',
  },
];

const sections = [
  {
    id: 'what-is-functional-testing',
    heading: 'What Is Functional Testing?',
    content: (
      <>
        <p>
          Functional testing is the final stage of the verification process defined in BS 7671. It
          comes after the dead tests (continuity, insulation resistance, polarity) and the live
          tests (earth fault loop impedance, prospective fault current, RCD trip times). Where dead
          and live tests measure electrical values with instruments, functional testing involves
          physically operating equipment to confirm it works correctly under normal service
          conditions.
        </p>
        <p>
          Regulation 643.10 of BS 7671:2018+A2:2022 states that assemblies such as switchgear,
          controlgear, interlocks, and similar equipment shall be subjected to a functional test to
          verify that they are properly mounted, adjusted, and installed in accordance with the
          relevant requirements of the Regulations. This means every switch, every isolator, every
          RCD test button, every interlock, and every circuit label must be checked.
        </p>
        <p>
          Functional testing is often treated as a tick-box exercise, but it is genuinely important.
          An installation can pass every dead and live test and still be unsafe if a switching
          device controls the wrong circuit, if an{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCD</SEOInternalLink> test button
          does not work, or if circuit labelling is missing or incorrect. These are the issues that
          functional testing catches.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-carry-out',
    heading: 'When to Carry Out Functional Testing',
    content: (
      <>
        <p>
          Functional testing is carried out in two main situations: during initial verification of a
          new installation or alteration, and during periodic inspection and testing (EICR). In both
          cases, functional testing is performed after all dead and live tests have been completed
          and passed.
        </p>
        <p>
          For initial verification, functional testing confirms that everything has been installed
          correctly and operates as intended before the installation is energised for normal use.
          For an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, functional
          testing assesses whether the existing installation continues to operate safely and whether
          any deterioration or changes have affected the function of switchgear, controls, and
          protective devices.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>{' '}
          defined in IET Guidance Note 3 (GN3) places functional testing after all instrument-based
          tests. This is deliberate — there is no point checking whether a switch operates correctly
          if the circuit behind it has not passed its dead and live tests.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-test-button',
    heading: 'RCD Test Button Verification',
    content: (
      <>
        <p>
          Every RCD and RCBO has a built-in test button. Pressing this button passes a small current
          through the device's trip coil, simulating an earth leakage fault. The device should
          disconnect immediately. This test confirms that the mechanical tripping mechanism inside
          the RCD is functioning — it does not measure the trip time or the trip current, which are
          measured separately during live testing with an RCD tester.
        </p>
        <p>
          During functional testing, you must press the test button on every RCD and RCBO in the
          installation. The device must trip. After confirming the trip, reset the device and
          confirm it re-engages correctly. If the test button does not cause the RCD to trip, the
          device is faulty and must be replaced — this is a serious safety defect.
        </p>
        <p>
          Note that the RCD test button check is in addition to the instrument-based{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCD trip time test</SEOInternalLink>{' '}
          carried out during live testing. The instrument test measures the actual trip time and
          verifies it is within the BS 7671 limits. The test button check simply confirms the
          mechanical function of the device. Both are required.
        </p>
        <p>
          It is good practice to advise the client that they should press the RCD test button
          themselves at regular intervals (typically quarterly) as an ongoing safety check. Many
          domestic clients are unaware that the test button exists or what it does.
        </p>
      </>
    ),
  },
  {
    id: 'switching-devices',
    heading: 'Switching Devices',
    content: (
      <>
        <p>
          Every switching device in the installation must be functionally tested. This includes
          light switches, fused connection units, timer switches, dimmer switches, fan isolators,
          cooker switches, contactors, and any other device that makes or breaks a circuit. For each
          device, you must confirm the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Switching Device Checks</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Correct operation:</strong> The device switches
                on and off cleanly without sticking, arcing, or excessive mechanical resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Correct circuit:</strong> The device controls
                the intended circuit — the correct light, the correct appliance, the correct fan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Correct orientation:</strong> For standard plate
                switches, down should be off. Two-way and intermediate switches should operate
                logically from all positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Indicator lamps:</strong> Any neon indicators or
                LED indicators on switches, fused spurs, or control panels must illuminate
                correctly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For circuit breakers at the distribution board, confirm each MCB and RCBO switches on and
          trips off smoothly. Any device that is stiff, difficult to operate, or does not latch in
          the on position may have a mechanical fault and should be investigated or replaced.
        </p>
        <SEOAppBridge
          title="Board scanner reads your MCB/RCBO ratings automatically"
          description="Point your phone at the distribution board and Elec-Mate's AI reads the device ratings, types, and circuit references. The functional test checklist is pre-populated with the correct device information for each circuit."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'isolators-and-interlocking',
    heading: 'Isolators and Interlocking',
    content: (
      <>
        <p>
          Isolators are devices designed to disconnect a circuit from the supply so that work can be
          carried out safely. Unlike switches, isolators are not intended for making or breaking
          load current — they are used for isolation only. During functional testing, you must
          confirm that every isolator fully disconnects all live conductors from the downstream
          circuit when operated.
        </p>
        <p>
          Common isolators that require functional testing include: the main switch on the consumer
          unit or distribution board, local isolators for fixed equipment (cooker isolators, boiler
          isolators, immersion heater switches), and isolators for motors or other plant equipment.
        </p>
        <p>
          Interlocking is a mechanism that prevents equipment from being operated in an unsafe
          sequence. The most common domestic example is the consumer unit cover interlock — the
          cover should not be removable while the main switch is in the on position. This prevents
          accidental contact with live busbars. During functional testing, you must confirm that the
          interlock mechanism works correctly. Try to remove the cover with the main switch on — it
          should be physically prevented. For commercial installations, interlocks on changeover
          switches, motor starters, and access panels must all be tested.
        </p>
        <p>
          If an interlock mechanism has been defeated or bypassed (for example, a consumer unit
          cover that can be removed with the main switch on because the locking tab has been
          broken), this is a deficiency that must be recorded. On an EICR, a defeated interlock
          would typically attract a C2 or C3 observation code.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-identification',
    heading: 'Circuit Identification and Labelling',
    content: (
      <>
        <p>
          Regulation 514.9.1 of BS 7671 requires that a durable label or arrangement of labels shall
          be provided at each distribution board or consumer unit, indicating the purpose of each
          circuit and the area it serves. Every MCB, RCBO, or fuse must be identified with a unique
          circuit designation, and the designation must be recorded on a circuit chart.
        </p>
        <p>During functional testing, you must verify the following for every circuit:</p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Labelling Requirements</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Unique identification:</strong> Every circuit
                has a unique designation (e.g., "Ring 1 — Ground Floor Sockets", "Lighting 2 — First
                Floor").
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Accuracy:</strong> The label correctly describes
                the circuit and the area it serves. The label matches the actual circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Durability:</strong> Labels are durable and will
                remain legible for the life of the installation. Handwritten labels on masking tape
                do not meet this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Circuit chart:</strong> A circuit chart is
                present inside or adjacent to the distribution board, listing all circuits with
                their designations, protective device types and ratings, and cable sizes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Incorrect or missing labelling is one of the most common observations on EICRs. It may
          seem like a minor issue, but incorrect labelling can have serious consequences — if an
          electrician isolates the wrong circuit because the labels are wrong, they could be working
          on a live circuit they believe is dead. Labelling accuracy is a safety issue, not just a
          paperwork issue.
        </p>
      </>
    ),
  },
  {
    id: 'other-functional-checks',
    heading: 'Other Functional Checks',
    content: (
      <>
        <p>
          Beyond switching devices, isolators, interlocks, and labelling, functional testing may
          also include the following checks depending on the type of installation:
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Smoke and heat detectors</h3>
                <p className="text-white text-sm leading-relaxed">
                  Test each detector using the test button or approved test method. Confirm that the
                  alarm sounds and that interconnected detectors also sound.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Emergency lighting</h3>
                <p className="text-white text-sm leading-relaxed">
                  Confirm that emergency luminaires illuminate when the mains supply is
                  disconnected. Check that charging indicators show normal operation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Time switches and programmers</h3>
                <p className="text-white text-sm leading-relaxed">
                  Verify that time switches are set to the correct time and that they switch
                  circuits on and off at the programmed times. Check manual override functions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Ventilation and extract fans</h3>
                <p className="text-white text-sm leading-relaxed">
                  Confirm that fans operate when triggered (by light switch, humidity sensor, or
                  manual switch). Check overrun timers function correctly. Verify correct direction
                  of airflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Functional Test Results',
    content: (
      <>
        <p>
          Functional test results are recorded on the inspection schedule of the{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>. The inspection
          schedule includes a section for functional testing where each item is recorded as
          satisfactory, unsatisfactory, or not applicable.
        </p>
        <p>
          For an EICR, any unsatisfactory functional test results are recorded as observations with
          the appropriate{' '}
          <SEOInternalLink href="/guides/bs7671-observation-codes">
            observation code
          </SEOInternalLink>
          . For example, a non-functional RCD test button might be C1 (danger present), missing
          circuit labels might be C3 (improvement recommended), and a defeated interlock might be C2
          (potentially dangerous).
        </p>
        <p>
          For an EIC or Minor Works, unsatisfactory functional test results indicate that the
          installation does not comply with BS 7671 and the certificate should not be issued until
          the deficiency is rectified.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Functional Testing with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate includes a comprehensive functional testing checklist integrated into every EIC,
          EICR, and{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">Minor Works</SEOInternalLink>{' '}
          certificate. The checklist covers RCD test button verification, switching device
          operation, isolator checks, interlocking, circuit identification, labelling, and all other
          functional test items required by BS 7671.
        </p>
        <SEOAppBridge
          title="Never miss a functional test item"
          description="Elec-Mate's functional testing checklist is built into every certificate. Each item has a pass/fail/N/A selector. The app will not let you issue a certificate until all mandatory functional test items have been completed — no more missed checks."
          icon={Shield}
        />
        <p>
          The app also auto-generates the circuit schedule from the{' '}
          <SEOInternalLink href="/tools/electrical-testing-calculators">
            board scanner
          </SEOInternalLink>
          , so your functional test checklist is already populated with the correct circuit
          references, device types, and ratings. The 8 Elec-AI agents can answer questions about
          functional testing requirements in real time while you are on site.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description:
      'The correct dead and live testing order per GN3. Functional testing is the final stage.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-procedure',
    title: 'RCD Testing Procedure',
    description:
      'Instrument-based RCD trip time testing — the live test that complements the functional RCD test button check.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/bs7671-observation-codes',
    title: 'BS 7671 Observation Codes',
    description:
      'C1, C2, C3, FI codes explained. How to classify functional testing deficiencies on an EICR.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Create professional EICRs with auto-validated test results, functional test checklist, and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'The prove-test-prove method. Safe isolation must be completed before functional testing on de-energised circuits.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description:
      'Zs verification, cable sizing, voltage drop, PFC, and dozens more. All built to BS 7671.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FunctionalTestingGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ToggleRight}
      heroTitle={
        <>
          Functional Testing:{' '}
          <span className="text-yellow-400">What to Check After Installation</span>
        </>
      }
      heroSubtitle="The complete guide to functional testing for UK electricians. RCD test button checks, switching devices, isolators, interlocking, circuit identification, and labelling — the final stage of BS 7671 verification."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Never miss a functional test check"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing, certification, and compliance. Functional test checklists built into every certificate. 7-day free trial, cancel anytime."
    />
  );
}
