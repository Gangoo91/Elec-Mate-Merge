import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Zap, AlertTriangle, CheckCircle2, FileCheck2, Wrench, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electrical Fault Finding Guide', href: '/electrical-fault-finding-guide' },
];

const tocItems = [
  { id: 'fault-types', label: 'Types of Electrical Fault' },
  { id: 'test-sequence', label: 'Test Sequence' },
  { id: 'earth-faults', label: 'Earth Fault Diagnosis' },
  { id: 'open-circuit', label: 'Open Circuit Faults' },
  { id: 'high-resistance', label: 'High Resistance Faults' },
  { id: 'diagnostic-tools', label: 'Diagnostic Tools' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Electrical faults fall into four main categories: earth faults (line or neutral conductor in contact with earth), short circuits (line and neutral in contact with each other), open circuit faults (broken conductor or poor connection), and high resistance faults (partial connection causing heat generation).',
  'The systematic fault-finding sequence starts with continuity testing, proceeds to insulation resistance, then RCD performance, and finally loop impedance testing — working from safe low-voltage tests to energised tests.',
  'An insulation resistance (IR) test at 500V DC should read at least 1M\u03a9 between all live conductors and earth under BS 7671 Table 64. A reading below 0.5M\u03a9 indicates a significant insulation defect requiring immediate investigation.',
  'A Multifunction Tester (MFT) is the primary tool for fault finding on fixed installations. A clamp meter is used for measuring load currents without circuit interruption. A non-contact voltage tester (NCV) is used for safe initial verification of live conductors.',
  'Safe isolation must be carried out before any circuit testing. The safe isolation procedure requires a proving unit, an approved voltage indicator (not a simple neon screwdriver), and a lock-off device on the isolation point.',
  'High resistance connections are a leading cause of electrical fires in UK properties. They are typically caused by loose terminals, corroded contacts, or undersized conductors. IR testing alone will not detect high resistance faults — continuity testing with resistance measurement is required.',
];

const howToSteps = [
  {
    name: 'Gather information and assess the symptoms',
    text: 'Before testing, establish what the fault symptoms are: which circuits have tripped or failed; whether the problem is intermittent or permanent; when it started; and whether any work was recently carried out. Note whether the MCB trips immediately on reset (short circuit or earth fault), trips after a delay (overload or high resistance), or fails to trip at all (open circuit or RCD fault).',
  },
  {
    name: 'Carry out safe isolation',
    text: 'Isolate the affected circuit at the consumer unit. Prove dead with an approved voltage indicator (GS38 compliant). Lock off the MCB or remove the fuse. Apply a warning label. Do not rely on a neon screwdriver as the sole means of proving dead.',
  },
  {
    name: 'Continuity test — ring main or radial circuit',
    text: 'For a ring main, measure end-to-end continuity of line, neutral, and CPC (earth) conductors. For a radial circuit, measure from consumer unit to end of circuit. High resistance on the CPC compared to the line conductor (more than 1.67 times for same CSA) indicates a CPC fault. Use a low-resistance ohmmeter or the continuity range of your MFT. Record results and compare against calculated R1+R2.',
  },
  {
    name: 'Insulation resistance test',
    text: 'With all equipment disconnected from the circuit, apply 500V DC between line and earth, neutral and earth, and line and neutral. Record readings in M\u03a9. Readings must be at least 1M\u03a9 (BS 7671 Table 64). A reading below 0.5M\u03a9 indicates a serious defect. If a circuit shows low IR, systematically disconnect socket outlets and appliances to identify the faulty section.',
  },
  {
    name: 'RCD test',
    text: 'Using the MFT RCD test function: apply a ramp test to confirm the RCD trips at or below I\u0394n (30mA for 30mA RCDs). Apply x1 I\u0394n test and confirm disconnection within 300ms. Apply x5 I\u0394n test and confirm disconnection within 40ms. For Type S or time-delayed RCDs, confirm disconnection within 500ms at x1 I\u0394n. Record all test results.',
  },
  {
    name: 'Loop impedance test (Zs)',
    text: 'Re-energise the circuit and measure Zs at the furthest point. Compare against the maximum permitted Zs for the protective device (from BS 7671 tables). High Zs can indicate a broken CPC, a high-resistance joint, or a supply problem (high Ze). If Zs is too high, the circuit may not disconnect within the required time on a fault.',
  },
];

const faqs = [
  {
    question: 'What is the difference between an earth fault and a short circuit?',
    answer:
      "An earth fault occurs when a live conductor (line or neutral) comes into contact with the earthed metalwork of the installation or with earth itself. This creates a fault current path through the earth conductor. A short circuit occurs when the line and neutral conductors come into direct contact, bypassing the load entirely. Both create abnormally high fault currents, but they differ in their path: a short circuit returns via the neutral conductor, while an earth fault returns via the earth/CPC. Earth faults are particularly dangerous because the fault current path may include the building fabric, plumbing, or a person's body before reaching earth.",
  },
  {
    question: 'What insulation resistance reading indicates a fault on a circuit?',
    answer:
      'Under BS 7671 Table 64, the minimum acceptable insulation resistance is 1M\u03a9 for circuits operating at up to 500V (tested at 500V DC). A reading between 0.5M\u03a9 and 1M\u03a9 should be treated with caution and investigated further. A reading below 0.5M\u03a9 indicates a serious insulation defect. In practice, a new or recently installed circuit should read several hundred M\u03a9 or higher — readings in the single-digit M\u03a9 range on a new installation are worth investigating even if they exceed the 1M\u03a9 minimum.',
  },
  {
    question: 'What is a high resistance fault and why is it dangerous?',
    answer:
      'A high resistance fault (also called a high resistance joint or HRJ) occurs when a conductor has a partial connection rather than a clean metallic contact. This could be a loose terminal screw, a corroded junction box connector, or an overloaded screw terminal with strands missing. The resistance generates heat proportional to the square of the current (P = I\u00b2R). A joint with 1\u03a9 resistance carrying 13A will dissipate 169W — enough to char insulation and start a fire. High resistance faults will not necessarily trip an MCB or RCD because the fault current may be below the tripping threshold. They are detected by continuity testing (measuring resistance at each joint) or thermal imaging during a loaded circuit inspection.',
  },
  {
    question: 'How do I find an intermittent fault that does not show up during testing?',
    answer:
      'Intermittent faults are the most challenging to diagnose because they do not reproduce during static testing. Strategies include: thermal imaging camera inspection of the installation under load (hot spots indicate high-resistance connections); insulation resistance testing under mechanical stress (flexing cables while observing the IR meter); contact resistance measurement using a micro-ohmmeter at each junction box and accessory terminal; and customer observation — asking when, in what conditions, and in what sequence the fault occurs. Temperature-related faults (worse in summer or after the system has been running) often indicate thermal expansion causing a poor connection to open.',
  },
  {
    question: 'What is the correct safe isolation procedure?',
    answer:
      'The Health and Safety Executive GS38 guidance specifies the safe isolation procedure: (1) identify the circuit and the means of isolation; (2) switch off the circuit; (3) lock off (apply a lock or proprietary lock-off device to the MCB or distribution board); (4) prove that the tester works on a known live source before using it on the circuit; (5) prove dead — test the isolated circuit conductors with an approved voltage indicator; (6) prove the tester still works on the known live source after testing to confirm the tester did not fail during the test. This two-stage check is essential — a tester can fail to indicate voltage due to flat batteries or internal fault.',
  },
  {
    question: 'What tools do I need for electrical fault finding?',
    answer:
      'Essential tools: (1) Approved voltage indicator (AVI) — GS38 compliant, not a neon screwdriver. (2) Multifunction tester (MFT) — for IR testing, continuity, loop impedance, and RCD testing. Brands include Megger, Fluke, and Metrel. (3) Clamp meter — for measuring current on energised conductors without breaking the circuit. (4) Non-contact voltage tester (NCV) — for rapid identification of live cables in walls before cutting or drilling. Not a substitute for an AVI for safe isolation. (5) Proving unit — for confirming the AVI is working correctly. (6) Thermal imaging camera (optional but valuable) — for identifying hot spots from high-resistance connections under load.',
  },
  {
    question: 'What test should I do first when a circuit RCD keeps tripping?',
    answer:
      'When an RCD trips repeatedly: (1) First, reset the RCD with all loads disconnected from every socket on the circuit. If the RCD holds with no loads, the fault is in one of the connected appliances — reconnect appliances one by one to identify the faulty one. (2) If the RCD trips with no loads, the fault is in the fixed wiring. Carry out an insulation resistance test at 500V DC between line/earth and neutral/earth on the circuit with all accessories in place. A low IR reading confirms an insulation fault in the cables or accessories. (3) If the IR test is satisfactory but the RCD still trips under load, use a clamp meter to measure earth leakage current. Leakage above 30mA will trip the RCD even without a hard fault.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/sump-pump-electrical-installation',
    title: 'Sump Pump Electrical Installation',
    description: 'Wiring sump pumps correctly in damp locations.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/electrical-damp-proofing',
    title: 'Electrical Work in Damp Buildings',
    description: 'Electrical issues in damp buildings and rewiring after DPC works.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/fused-spur-installation-guide',
    title: 'Fused Spur Installation Guide',
    description: 'How to wire fused connection units correctly.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Generate EICR reports on your phone with Elec-Mate.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

const sections = [
  {
    id: 'fault-types',
    heading: 'Types of Electrical Fault',
    content: (
      <>
        <p>
          Understanding the type of fault before picking up test equipment saves time and reduces
          the risk of making the fault worse. The four main fault types are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault</strong> — live conductor (line or neutral) in contact with
                earth. Causes RCD tripping or MCB operation. Can present an electric shock hazard if
                the earth path is via metalwork rather than the CPC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short circuit</strong> — line and neutral conductors in direct contact.
                Creates very high fault currents, typically tripping the MCB immediately. The MCB
                trip characteristic (Type B, C, or D) determines the minimum short circuit current
                that must be present for instantaneous magnetic operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open circuit</strong> — broken conductor or open connection. The circuit
                does not trip but does not work. The fault appears as infinite resistance on a
                continuity test. Common causes: broken conductor within a flex, failed lamp holder
                contact, corroded socket terminal, or loose MCB terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High resistance fault</strong> — partial connection generating heat. May not
                trip any protective device but can cause fire. Detected by continuity resistance
                measurement or thermal imaging during operation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-sequence',
    heading: 'Test Sequence — Continuity → IR → RCD → Loop Impedance',
    content: (
      <>
        <p>
          The fault-finding test sequence follows a logical order that moves from safe de-energised
          tests to energised tests, only progressing if previous tests are satisfactory.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Continuity</strong> (de-energised): measures the resistance of
                conductors. Identifies open circuits, high-resistance joints, and broken CPCs. Safe
                to perform without energising the circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Insulation resistance</strong> (de-energised): applies 500V DC to
                identify insulation breakdown between conductors and earth. Identifies earth faults
                and short circuits between conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — RCD test</strong> (energised): confirms the RCD trips within the
                required time. The circuit must be energised for this test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Loop impedance (Zs)</strong> (energised): confirms the earth fault
                loop impedance is low enough to guarantee protective device operation within the
                required disconnection time under BS 7671.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation codes guide
          </SEOInternalLink>{' '}
          for how these test results translate into EICR codes and required remedial actions.
        </p>
      </>
    ),
  },
  {
    id: 'earth-faults',
    heading: 'Earth Fault Diagnosis',
    content: (
      <>
        <p>
          Earth faults are the most common cause of RCD tripping in domestic and commercial
          installations. The fault diagnosis approach depends on whether the RCD trips immediately
          on reset or only when a load is applied.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD trips immediately on reset</strong> — disconnect all loads from the
                circuit and retest. If the RCD holds with no loads, the fault is in an appliance. If
                it still trips, carry out IR testing on the circuit wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD trips only when a specific appliance is connected</strong>— the fault is
                in the appliance (insulation breakdown between live conductors and the appliance
                body). The appliance should be removed from service and repaired or replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Systematic IR testing</strong> — with the circuit de-energised and all loads
                disconnected, test IR between line/earth at each socket outlet in sequence. A socket
                that significantly reduces the IR reading compared to adjacent sockets indicates the
                fault is downstream of that point.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'open-circuit',
    heading: 'Open Circuit Fault Diagnosis',
    content: (
      <>
        <p>
          An open circuit fault means part or all of the circuit has no continuity — the conductor
          is broken, a terminal is disconnected, or a contact has failed. The circuit does not trip
          but simply does not work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage testing at the point of use</strong> — with the circuit energised,
                use a voltage indicator to test whether line, neutral, and earth voltages are
                present at the socket or lighting outlet. Absence of neutral with line present
                indicates an open neutral fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half-split method</strong> — for circuits with multiple outlets, test at the
                mid-point first. If continuity is present at the mid-point, the fault is in the
                second half. This binary search approach finds the fault location in the minimum
                number of tests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common causes</strong> — loose terminal screws (particularly in WAGO
                connectors not fully inserted), broken cores within flexes subject to repeated
                bending, corroded socket terminals, and failed MCB contacts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'high-resistance',
    heading: 'High Resistance Fault Detection',
    content: (
      <>
        <p>
          High resistance faults are the most dangerous because they typically do not cause
          protective devices to operate — yet they generate sufficient heat to ignite nearby
          materials.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High resistance joints cause electrical fires.</strong> A 1\u03a9 joint in a
                13A circuit dissipates 169W — enough to char insulation and ignite surrounding
                materials. Any joint with resistance exceeding 50m\u03a9 should be investigated and
                re-terminated.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity resistance measurement</strong> — measure the resistance of each
                section of the circuit. Expected values: 1.5mm\u00b2 copper conductor =
                12.1m\u03a9/m; 2.5mm\u00b2 = 7.41m\u03a9/m. Significantly higher readings at a
                junction indicate a high resistance connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal imaging</strong> — a thermal imaging camera used on the installation
                under normal load will show hot spots at high resistance connections. Particularly
                effective for spotting deteriorating consumer unit connections, socket back boxes,
                and overhead luminaire junction boxes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'diagnostic-tools',
    heading: 'Diagnostic Tools for Fault Finding',
    content: (
      <>
        <p>
          Having the right test equipment and knowing how to use it correctly is the foundation of
          effective fault finding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multifunction tester (MFT)</strong> — Megger MFT1741, Fluke 1664 FC, or
                Metrel MI3102 are popular choices. Essential for IR testing, continuity
                (low-resistance ohmmeter), loop impedance, and RCD testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved voltage indicator (AVI)</strong> — must comply with GS38 guidance:
                fused leads, shrouded probes, maximum 4mm probe exposure. Brands include Martindale
                and Kewtech.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clamp meter</strong> — for measuring current on energised conductors without
                interrupting the circuit. Useful for checking load balance and identifying
                unexpected earth leakage currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-contact voltage tester (NCV)</strong> — for rapid cable detection and
                initial live/dead indication. Not a substitute for an AVI but useful for scanning
                walls for hidden cables before cutting or drilling.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record Fault Finding Results with Elec-Mate"
          description="Log test results, generate EICRs, and share observation reports with clients directly from your phone. No paper, no desktop required."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
];

export default function ElectricalFaultFindingGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Fault Finding Guide — Systematic Approach for UK Electricians"
      description="A complete guide to electrical fault finding: earth faults, open circuits, short circuits, and high resistance faults. Test sequence, diagnostic tools, and safe isolation procedure under BS 7671."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electrical Fault Finding Guide{' '}
          <span className="text-yellow-400">— Systematic Diagnosis</span>
        </>
      }
      heroSubtitle="A complete guide to finding and diagnosing electrical faults — earth faults, open circuits, short circuits, and high resistance joints. Test sequence, tools, and safe isolation procedure."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="Fault Finding Procedure — Step by Step"
      howToDescription="Follow this systematic procedure to diagnose electrical faults safely and efficiently."
      faqs={faqs}
      faqHeading="Electrical Fault Finding — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Record Test Results with Elec-Mate"
      ctaSubheading="Generate EICRs and observation reports from your phone. Share results with clients instantly. No paper required."
    />
  );
}
