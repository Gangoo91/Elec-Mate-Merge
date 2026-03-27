import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Zap,
  Wrench,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Insulation Resistance Testing', href: '/guides/insulation-resistance-testing-bs7671' },
];

const tocItems = [
  { id: 'overview', label: 'Why Test Insulation Resistance?' },
  { id: 'test-voltages', label: 'Test Voltages (250V, 500V, 1000V)' },
  { id: 'minimum-values', label: 'Minimum Values (≥1 MΩ)' },
  { id: 'new-circuits', label: 'Testing New Circuits' },
  { id: 'live-precautions', label: 'Live Circuit Precautions' },
  { id: 'regulation-643', label: 'Regulation 643.3 Explained' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Insulation resistance (IR) testing verifies that the insulation of conductors is intact and is not leaking current to earth or between conductors. BS 7671 Regulation 643.3 sets out the requirements.',
  'The test voltage applied depends on the circuit nominal voltage: 250V DC for circuits up to 50V (SELV/PELV), 500V DC for circuits up to 500V (most domestic and commercial circuits), and 1000V DC for circuits above 500V.',
  'The minimum acceptable insulation resistance value is 1 MΩ for all circuit types under BS 7671. In practice, values of 200 MΩ or higher are typical on a sound new installation.',
  'For new circuits, IR testing is carried out on the dead circuit before connection to the supply. All luminaires and appliances should be disconnected — many electronic devices are damaged by IR test voltages.',
  'On live circuit EICR work, IR testing requires safe isolation of the circuit under test and disconnection of sensitive electronic equipment before applying the test voltage.',
];

const faqs = [
  {
    question: 'What test voltage do I use for insulation resistance testing?',
    answer:
      'BS 7671 Regulation 643.3 specifies the test voltages based on the circuit nominal voltage. For SELV and PELV circuits with a nominal voltage up to 50V AC (or 120V DC), the test voltage is 250V DC and the minimum acceptable IR value is 0.5 MΩ. For circuits up to 500V nominal (which covers the vast majority of UK domestic and commercial circuits at 230V single phase and 400V three phase), the test voltage is 500V DC and the minimum acceptable IR is 1 MΩ. For circuits above 500V (high-voltage systems), the test voltage is 1000V DC and the minimum IR is 1 MΩ. In practice, most domestic and commercial IR testing uses 500V DC.',
  },
  {
    question: 'What is the minimum acceptable insulation resistance value?',
    answer:
      'Under BS 7671:2018+A3:2024 Regulation 643.3, the minimum acceptable insulation resistance is 1 MΩ for circuits up to 500V (tested at 500V DC). However, 1 MΩ is a pass-fail threshold, not a target. A healthy new installation should produce readings well above 200 MΩ — readings close to 1 MΩ on a new installation warrant further investigation even though they technically pass. On an EICR of an older installation, a reading between 1 MΩ and 2 MΩ may be a C3 (improvement recommended), particularly if there is a downward trend from previous inspection results. A reading below 1 MΩ is a clear failure and must be coded as C2 or C1 depending on the risk.',
  },
  {
    question: 'How do I carry out an insulation resistance test on a new circuit?',
    answer:
      'Ensure the circuit is de-energised and that all fuses or MCBs are removed or locked off. Link the line and neutral conductors together at the consumer unit or distribution board so the entire circuit (both conductors plus the CPC) is tested as a group. Disconnect all luminaires, switches, sockets, and appliances from the circuit — many contain electronic components (LED drivers, motor capacitors, SPDs) that will be damaged by the 500V test voltage. Connect the IR tester between the linked L+N conductors and earth, apply the test voltage for at least 1 minute (some instruments recommend a shorter stabilisation period — follow the manufacturer guidance), and record the reading. Also test between L and N with the link in place (or remove the link and test L to N separately) to verify insulation between conductors.',
  },
  {
    question: 'What electronic equipment is damaged by insulation resistance testing?',
    answer:
      'Many modern electrical components contain electronics that are rated for the circuit voltage (230V or lower) and will be damaged or destroyed by the 500V or 1000V IR test voltage. Items to always disconnect before IR testing include: LED luminaires and LED drivers, fluorescent light fittings with electronic ballasts, variable speed drives (VSDs) and inverters, surge protective devices (SPDs, also called surge protectors), programmable thermostats, occupancy sensors and presence detectors, socket outlets with USB charging ports, and any connected electronic appliances. Note that SPDs are particularly important to disconnect — they contain metal oxide varistors (MOVs) that conduct at voltages above their clamping voltage, which is typically well below the 500V test voltage. Failure to disconnect SPDs will give a spurious low IR reading and may permanently damage the SPD.',
  },
  {
    question: 'What does a low insulation resistance reading indicate?',
    answer:
      'A low IR reading (below 1 MΩ, or suspiciously low for the installation age) indicates that the insulation of a conductor is degraded and allowing current to leak to earth or to another conductor. Common causes include: moisture ingress into a junction box, conduit, or light fitting; physical damage to cable insulation from rodents, staples, or mechanical impact; insulation degradation due to excessive heat (cables near downlights or in loft spaces where temperatures are high in summer); carbon tracking in accessories following arcing or overheating; and the presence of a connected electronic device that was not disconnected before testing. If a low reading is found, disconnect loads and accessories one by one to isolate the section with the problem. A clamp meter can also be used to detect leakage current on energised circuits.',
  },
  {
    question: 'Can I test insulation resistance on a live circuit?',
    answer:
      'No. IR testing requires the circuit to be de-energised (dead) and safely isolated before the test voltage is applied. The 500V or 1000V DC test voltage applied to a live conductor is extremely dangerous. The correct procedure for EICR work is: identify the circuit to be tested, carry out safe isolation in accordance with the HSE GS38 guidance and the Electricity at Work Regulations 1989, verify the circuit is dead with an approved voltage indicator, then proceed with IR testing. After IR testing is complete, verify the circuit is still safe to re-energise before restoring the supply.',
  },
  {
    question: 'What does Regulation 643.3 require?',
    answer:
      'BS 7671:2018+A3:2024 Regulation 643.3 requires that insulation resistance testing is carried out on all new electrical installations and on existing installations during periodic inspection and testing. The regulation sets out the test voltages and minimum acceptable values tabulated in Table 64.1. The test must be carried out with all equipment connected (or representative of the installed conditions) except for equipment that would be damaged by the test voltage — which must be disconnected. Where electronic equipment cannot be disconnected, only a low-voltage continuity check may be possible. Regulation 643.3 also requires that where results approach (but do not fall below) the minimum value, further investigation is recommended to identify the cause of the relatively low reading.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earth-fault-loop-impedance-testing',
    title: 'Earth Fault Loop Impedance Testing',
    description: 'Zs testing procedure, Appendix 3 table values, and pass/fail assessment.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-electricians-guide',
    title: 'Continuity Testing Guide',
    description: 'R1+R2 measurement, ring circuit methods, and CPC continuity.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete Electrical Installation Condition Reports on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates with test schedules on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/rcd-testing-procedure-bs7671',
    title: 'RCD Testing Procedure',
    description: 'The 50%, 100%, and 5× RCD tests explained with BS 7671 Regulation 643.8.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules on all test methods.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Test Insulation Resistance?',
    content: (
      <>
        <p>
          Insulation resistance (IR) testing is one of the fundamental verification tests required
          by BS 7671:2018+A3:2024 as part of both the initial inspection and testing of a new
          installation and the periodic inspection and testing of an existing installation (EICR). The
          purpose of the test is to verify that the insulation surrounding the conductors is in good
          condition and is providing adequate electrical separation between live conductors and
          between live conductors and earth.
        </p>
        <p>
          Over time, electrical insulation degrades due to heat, moisture, mechanical damage, UV
          exposure, and chemical attack. As insulation degrades, its resistance decreases. At very
          low insulation resistance values, significant leakage current can flow through the
          insulation under normal operating conditions, causing energy loss, heating of the conductor
          insulation, and — if the leakage path is to earth — operation of residual current devices.
          In severe cases, low insulation resistance can lead to ignition of the insulation and
          electrical fire.
        </p>
        <p>
          IR testing detects these problems before they become dangerous. A single IR test of a
          circuit takes only a few minutes and provides a quantitative measure of insulation health
          that can be compared against the minimum value required by BS 7671 Regulation 643.3 and
          tracked over successive EICR intervals to identify progressive deterioration.
        </p>
      </>
    ),
  },
  {
    id: 'test-voltages',
    heading: 'Test Voltages — 250V, 500V, and 1000V DC',
    content: (
      <>
        <p>
          The test voltage for insulation resistance testing is specified in BS 7671 Table 64.1.
          Using the correct test voltage is essential — too low a voltage may not reveal insulation
          weaknesses, while too high a voltage can damage sensitive equipment.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">250V DC</h3>
            <p className="text-white text-sm leading-relaxed">
              Used for SELV and PELV circuits with a nominal voltage up to 50V AC. Minimum IR
              value: 0.5 MΩ. Applies to extra-low voltage circuits such as fire alarm wiring,
              security systems, and ELV lighting.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">500V DC</h3>
            <p className="text-white text-sm leading-relaxed">
              Used for circuits up to 500V nominal. This covers all standard UK domestic and
              commercial circuits (230V single phase, 400V three phase). Minimum IR value: 1 MΩ.
              This is the most commonly used test voltage for electricians.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">1000V DC</h3>
            <p className="text-white text-sm leading-relaxed">
              Used for circuits above 500V nominal (high-voltage systems). Minimum IR value: 1 MΩ.
              Rarely used in routine domestic or commercial electrical work; more common in
              industrial high-voltage installations and some specialist EV charging infrastructure.
            </p>
          </div>
        </div>
        <p>
          The test voltage is applied for a minimum period sufficient for the reading to stabilise.
          For most modern digital instruments, this stabilisation is indicated by a steady display.
          The traditional recommendation is to apply the test for 1 minute, but follow your
          instrument manufacturer's guidance.
        </p>
      </>
    ),
  },
  {
    id: 'minimum-values',
    heading: 'Minimum Acceptable Values — ≥1 MΩ',
    content: (
      <>
        <p>
          BS 7671 Table 64.1 sets the minimum acceptable insulation resistance values. For circuits
          up to 500V (tested at 500V DC), the minimum is 1 MΩ. This is a regulatory minimum, not a
          design target.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sound new installation</strong> — IR readings of 200 MΩ or greater are
                typical. Values above 100 MΩ indicate healthy insulation with substantial service
                life remaining.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Older installation — borderline</strong> — values between 2 MΩ and 10 MΩ
                on an existing installation may warrant a C3 observation on an EICR, noting that
                whilst technically compliant, the deterioration trend should be monitored.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failure — below 1 MΩ</strong> — the circuit fails the test. This is a C2
                (potentially dangerous) observation on an EICR if it represents a genuine insulation
                fault (rather than a connected electronic device that was not disconnected).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember that IR values can be temporarily reduced by moisture and humidity — a wet
          morning can cause surface tracking on cable insulation in outdoor or poorly ventilated
          locations. Where IR is borderline due to suspected moisture, allow the installation to dry
          out and retest before condemning the wiring.
        </p>
      </>
    ),
  },
  {
    id: 'new-circuits',
    heading: 'Testing New Circuits — Step by Step',
    content: (
      <>
        <p>
          For a new circuit, IR testing is carried out before connection to the supply. Here is the
          correct procedure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">1</span>
              <span>
                <strong>Disconnect all equipment</strong> — remove all luminaires, disconnect all
                appliances, and remove or disconnect electronic equipment from the circuit. Leave
                switches in the closed (on) position so the switch wiring is included in the test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">2</span>
              <span>
                <strong>Link L and N at the board</strong> — at the consumer unit, link the line and
                neutral terminals of the circuit together so both conductors are tested simultaneously.
                The CPC (earth) is left separate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">3</span>
              <span>
                <strong>Test L+N to E</strong> — connect the IR tester between the linked L+N
                conductors and the earth (CPC). Apply 500V DC and record the reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">4</span>
              <span>
                <strong>Test L to N</strong> — remove the link and test between L and N to check
                insulation between the two live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">5</span>
              <span>
                <strong>Record results</strong> — note the measured IR value, the test voltage, and
                the circuit designation on the schedule of test results.
              </span>
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Complete IR test records on your phone"
          description="Elec-Mate's EIC and EICR apps capture insulation resistance readings for every circuit, flag readings below the BS 7671 minimum, and generate professional test schedules. No paper — everything syncs instantly."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'live-precautions',
    heading: 'Live Circuit Precautions for EICR Work',
    content: (
      <>
        <p>
          When carrying out IR testing as part of an EICR on an occupied installation, additional
          precautions are required:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation first</strong> — always carry out safe isolation of the
                circuit before applying the IR test voltage. This is a legal requirement under the
                Electricity at Work Regulations 1989. Use an approved voltage indicator (GS38
                compliant) before and after isolation to confirm the circuit is dead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warn occupants</strong> — inform the building occupants that circuits will
                be isolated and equipment may be disconnected during testing. Agree on a programme
                of isolation to minimise disruption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identify and protect sensitive equipment</strong> — before isolating each
                circuit, identify all connected equipment. Do not apply IR test voltages to circuits
                with connected surge protective devices, LED drivers, motor drives, or any equipment
                with electronic components unless those components are physically disconnected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discharge the circuit after testing</strong> — the IR tester charges the
                circuit capacitance to the test voltage. After removing the test voltage, the
                instrument should discharge the circuit — confirm the instrument is doing this before
                reconnecting any equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulation-643',
    heading: 'Regulation 643.3 Explained',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Regulation 643.3 is the primary regulation governing insulation
          resistance testing. It requires that insulation resistance tests are carried out on all
          new installations before they are energised and on existing installations during periodic
          inspection and testing.
        </p>
        <p>
          The regulation specifies that the test must be carried out on each circuit with all
          equipment connected (or in a representative energised state), except for equipment that is
          liable to be damaged by the test voltage, which must be disconnected. This creates a
          practical challenge — modern installations have numerous electronic components that are
          damaged by IR test voltages, requiring them to be disconnected individually.
        </p>
        <p>
          Regulation 643.3 also notes that where IR testing cannot be carried out (for example,
          where a circuit cannot be isolated and electronic equipment cannot be disconnected), the
          inspector must record the limitation and the reason on the EICR. This is a genuine
          limitation that should be noted rather than a reason to skip the test entirely — where
          partial testing is possible (for example, testing the wiring by disconnecting equipment at
          accessories), this is preferable to no testing.
        </p>
        <p>
          The minimum acceptable IR values from Table 64.1 are the legal minimum under BS 7671.
          Where the inspector considers that a reading — although above the minimum — represents a
          deteriorating condition warranting monitoring, a C3 (improvement recommended) observation
          should be recorded on the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Practical IR Testing Tips',
    content: (
      <>
        <p>
          Efficient insulation resistance testing requires a systematic approach. Here are practical
          tips from experienced inspection electricians:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Always Check for SPDs Before Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Surge protective devices (SPDs) are now mandatory on most new installations under
                  BS 7671:2018+A3:2024 Amendment 3. They are easily missed during inspection. Before
                  applying any IR test voltage, check the consumer unit, distribution board, and
                  sub-boards for SPDs and disconnect them from the circuit. An SPD in circuit gives a
                  reading of virtually zero ohms — which can falsely condemn a sound installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Test by Section on Large Installations</h4>
                <p className="text-white text-sm leading-relaxed">
                  On large commercial or industrial installations, test one section at a time and
                  record the reading for each section. This makes it easier to identify which
                  section has a low reading, rather than testing the entire installation as a single
                  unit and getting a low combined result that is difficult to investigate.
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

export default function InsulationResistanceTestingPage() {
  return (
    <GuideTemplate
      title="Insulation Resistance Testing BS 7671 | IR Testing Guide UK"
      description="Complete guide to insulation resistance testing under BS 7671 for UK electricians. Covers test voltages (250V, 500V, 1000V), minimum values (≥1 MΩ), how to test new circuits, live circuit precautions, and Regulation 643.3."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Insulation Resistance Testing:{' '}
          <span className="text-yellow-400">BS 7671 Procedure and Minimum Values</span>
        </>
      }
      heroSubtitle="A complete guide to insulation resistance (IR) testing for UK electricians. Covers test voltages, the ≥1 MΩ minimum value, how to test new circuits, precautions on live circuits, and what Regulation 643.3 requires."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Insulation Resistance Testing"
      relatedPages={relatedPages}
      ctaHeading="Record IR Test Results and Complete EICRs on Your Phone"
      ctaSubheading="Elec-Mate automatically checks IR readings against the BS 7671 minimum and generates professional test schedules on site. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
