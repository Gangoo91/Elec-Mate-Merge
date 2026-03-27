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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing Guides', href: '/guides/electrical-testing' },
  { label: 'Insulation Resistance Testing Guide', href: '/insulation-resistance-testing-guide' },
];

const tocItems = [
  { id: 'what-is-ir-testing', label: 'What Is IR Testing?' },
  { id: 'test-voltages', label: 'Test Voltages — BS 7671 Requirements' },
  { id: 'minimum-values', label: 'Minimum Acceptable Values' },
  { id: 'disconnecting-components', label: 'Disconnecting Electronic Components' },
  { id: 'test-method', label: 'Test Method Step by Step' },
  { id: 'interpreting-results', label: 'Interpreting Results' },
  { id: 'common-failures', label: 'Common Failures and Causes' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Table 61 specifies test voltage by circuit nominal voltage: 500V DC for circuits up to 500V, and 1000V DC for circuits above 500V up to 1000V.',
  'The minimum acceptable insulation resistance value is 1MΩ per BS 7671 Table 61. In practice, a healthy circuit should read significantly higher — often hundreds of megaohms on a new installation.',
  'All electronic components susceptible to damage from test voltage must be disconnected before testing. This includes dimmers, electronic timers, RCDs, surge protective devices (SPDs), and some luminaire control gear.',
  'A declining result on repeated tests — or a reading that is borderline at 1MΩ — warrants investigation even if the test technically passes. IR testing reveals insulation condition at the moment of test only.',
  'On EICR work, insulation resistance is tested between live conductors and earth, and between live conductors (line and neutral), with all circuit breakers closed and lamps removed.',
];

const faqs = [
  {
    question: 'What test voltage is used for insulation resistance testing?',
    answer:
      'BS 7671 Table 61 specifies 500V DC for circuits with a nominal voltage up to and including 500V (which covers all standard 230V single-phase and 400V three-phase circuits). 1000V DC is used for circuits with a nominal voltage above 500V up to 1000V. The test voltage must be maintained for at least 1 minute before the result is recorded, or until the reading stabilises.',
  },
  {
    question: 'What is the minimum insulation resistance value to pass?',
    answer:
      'The minimum acceptable insulation resistance value per BS 7671 Table 61 is 1MΩ for circuits up to 500V. However, this is a minimum pass threshold for an existing installation — a reading close to 1MΩ on an otherwise healthy-looking installation warrants further investigation. New installations should read substantially higher. A reading of 1MΩ on a new installation would indicate a fault.',
  },
  {
    question: 'Which components must be disconnected before IR testing?',
    answer:
      'Any component that could be damaged by the test voltage or that could give a false low reading must be disconnected or switched out of circuit. This includes: dimmer switches (thyristor or triac-based), electronic timers, electronic transformers, RCDs (test between live conductors with RCD removed from circuit or bypassed), surge protective devices (SPDs), and some types of electronic luminaire control gear. Standard incandescent and halogen lamps should be removed. LED and fluorescent luminaires with electronic ballasts must also be disconnected.',
  },
  {
    question: 'Why might insulation resistance readings be low?',
    answer:
      'Low IR readings can result from: moisture ingress into cables or accessories (particularly in bathrooms and outdoor circuits), damaged cable insulation (mechanical damage, rodent attack, overheating), deteriorated rubber insulation on older wiring, contaminated accessories (damp junction boxes, corroded terminals), parallel current paths through connected equipment that was not fully disconnected, carbon tracking from previous arcing or overheating, and unsuitable cables used in high-temperature environments.',
  },
  {
    question: 'Can you test insulation resistance with circuits energised?',
    answer:
      'No. Insulation resistance testing must be performed on de-energised circuits. The installation or circuit under test must be isolated and proved dead using an approved voltage indicator before connecting the IR tester. The high DC test voltage (500V or 1000V) applied by the instrument would be dangerous if applied to an energised circuit and would damage test instruments.',
  },
  {
    question: 'How is insulation resistance testing recorded on the schedule of test results?',
    answer:
      'On the Schedule of Test Results (part of the EICR or EIC), insulation resistance results are recorded in columns for: IR between line and neutral (L-N), IR between line and earth (L-E), and IR between neutral and earth (N-E), all in megaohms (MΩ). The test voltage used (500V DC or 1000V DC) should also be noted. Where a test cannot be carried out — for example because a circuit cannot be isolated — this should be noted with a reason.',
  },
  {
    question: 'What does a falling insulation resistance reading indicate?',
    answer:
      'If the IR reading falls progressively during the test (rather than rising or stabilising), this indicates a significant leakage path — often moisture in the insulation. The reading should stabilise within one minute on a healthy circuit. A steadily falling reading, or a reading that cannot stabilise above 1MΩ, indicates a fault requiring investigation. On very long cable runs, the reading may take longer to stabilise due to capacitance effects.',
  },
];

const relatedPages: RelatedPage[] = [
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
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description: 'Half-rated, rated, and 5× current RCD test procedures.',
    icon: ShieldCheck,
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
    id: 'what-is-ir-testing',
    heading: 'What Is Insulation Resistance Testing?',
    content: (
      <>
        <p>
          Insulation resistance (IR) testing verifies that the insulation of cables and accessories
          is in a satisfactory condition — that it is preventing current leakage between conductors,
          and between conductors and earth. It is one of the mandatory tests specified in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Chapter 61) and must be carried out on every new installation and as part of every
          periodic inspection and testing (EICR).
        </p>
        <p>
          The test works by applying a high direct current (DC) voltage between conductors — far
          higher than the circuit's operating voltage — and measuring the resistance of the current
          path through the insulation. Good insulation has extremely high resistance (hundreds or
          thousands of megaohms), so virtually no current flows. Deteriorated or damaged insulation
          allows current to leak, reducing the measured resistance. The instrument displays the
          result in megaohms (MΩ).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Why DC and not AC?</strong> DC is used because it does not charge and
              discharge capacitances in the cable insulation as AC would. AC would give unstable,
              misleadingly low readings due to capacitive current rather than true resistive leakage.
              A quality IR instrument applies a stable DC voltage and waits for the capacitance to
              fully charge before the reading stabilises.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'test-voltages',
    heading: 'Test Voltages — BS 7671 Table 61 Requirements',
    content: (
      <>
        <p>
          BS 7671 Table 61 (Minimum values of insulation resistance) specifies both the test voltage
          to be applied and the minimum acceptable result. The test voltage is selected based on the
          nominal voltage of the circuit under test.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>500V DC — circuits up to 500V nominal</strong>: This covers the vast
                majority of domestic and commercial electrical installations — standard 230V
                single-phase circuits (socket outlets, lighting, cookers) and 400V three-phase
                circuits (motors, three-phase supplies). All circuits in a typical domestic property
                will be tested at 500V DC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1000V DC — circuits above 500V and up to 1000V nominal</strong>: Applied to
                higher-voltage industrial and commercial circuits. Uncommon in domestic work but
                found in industrial premises, some commercial installations, and certain renewable
                energy system circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>250V DC — SELV and PELV circuits</strong>: Separated extra-low voltage and
                protected extra-low voltage circuits (typically below 50V AC or 120V ripple-free DC)
                are tested at 250V DC rather than the full 500V, to avoid damaging equipment
                designed for low-voltage operation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The test voltage must be applied for a sufficient duration to allow the reading to
          stabilise — a minimum of one minute is standard practice. On long cable runs with
          significant capacitance, it may take longer for the reading to stabilise. Always record
          the stabilised value, not the initial deflection.
        </p>
      </>
    ),
  },
  {
    id: 'minimum-values',
    heading: 'Minimum Acceptable Insulation Resistance Values',
    content: (
      <>
        <p>
          BS 7671 Table 61 sets a minimum insulation resistance of <strong>1MΩ</strong> for all
          circuits up to 500V (including both 230V and 400V circuits). For SELV and PELV circuits
          tested at 250V DC, the minimum is also 1MΩ.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1MΩ is a pass/fail threshold — not a target</strong>: A reading of exactly
                1MΩ on a new or recently rewired installation is a fault, not an acceptable result.
                New cable insulation in good condition will typically read well above 200MΩ, often
                approaching or exceeding the maximum range of the instrument (frequently 2000MΩ or
                "infinite" on most instruments). A result just above 1MΩ on a new installation
                requires investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Context matters on EICRs</strong>: On a periodic inspection of an older
                installation, a reading of 2MΩ to 5MΩ on wiring that is 30 to 40 years old may
                merit a C3 observation (improvement recommended) even though it technically passes
                the 1MΩ threshold. Compare results circuit by circuit — one circuit reading
                significantly lower than others indicates a localised fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple circuits tested together</strong>: Where all circuits in a
                distribution board are tested simultaneously (all breakers closed, all neutrals
                connected), the measured resistance is the parallel combination of all circuit
                resistances. A low result may indicate a problem on one specific circuit. Isolate
                and test circuits individually to locate the fault.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'disconnecting-components',
    heading: 'Disconnecting Electronic Components Before Testing',
    content: (
      <>
        <p>
          This is one of the most critical steps in IR testing and a common source of errors.
          Electronic components can be damaged by the test voltage (500V DC applied to a component
          rated for 230V AC), and they can also provide a current path that gives a false low
          reading. Every connected item must be assessed before applying the test voltage.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dimmer switches</strong>: All dimmer switches must be disconnected or
                bypassed. Modern dimmers use thyristors (SCRs) or triacs — the test voltage will
                damage these semiconductors. On a lighting circuit with multiple dimmers, disconnect
                the load terminal of each dimmer and bridge with a wire link to maintain circuit
                continuity for the test, or remove the dimmer from the wall plate entirely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs</strong>: RCDs contain electronic components and electronic test
                circuits. When testing the wiring of an RCD-protected circuit, the RCD should be
                bridged (line and load terminals linked on both line and neutral) or the test should
                be conducted with the RCD disconnected. Never apply the IR test voltage through an
                RCD without bridging it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge protective devices (SPDs)</strong>: SPDs contain metal oxide varistors
                (MOVs) that clamp voltage above a threshold. They will clamp the 500V DC test
                voltage and give a very low IR reading, whilst being themselves damaged by the test.
                Disconnect SPDs before testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electronic transformers and control gear</strong>: Low-voltage halogen
                transformers, LED drivers, and fluorescent ballasts contain semiconductor components
                and must be disconnected. Remove lamps and disconnect or isolate control gear.
                Standard filament lamps may be left in their holders as they present a purely
                resistive load, but should ideally be removed to avoid parallel paths affecting
                results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electronic timers and occupancy sensors</strong>: PIR sensors, electronic
                timers, and photocell controls all contain semiconductor components. Disconnect or
                bypass these before testing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Where it is not practical to disconnect all equipment — for example, permanently wired
          luminaires with integral drivers — record the limitation on the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">schedule of test results</SEOInternalLink>{' '}
          and note that equipment was left connected, and any effect this may have had on the result.
        </p>
      </>
    ),
  },
  {
    id: 'test-method',
    heading: 'Insulation Resistance Test Method — Step by Step',
    content: (
      <>
        <p>
          The following procedure covers IR testing for a standard domestic or commercial circuit
          during a periodic inspection (EICR). For initial verification of a new installation, the
          same principles apply but all circuits are tested before the supply is connected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Isolate and prove dead</strong>: Switch off the main switch at the consumer
              unit. Use an approved voltage indicator (to GS38) to prove the installation is dead at
              the consumer unit. Lock off or apply warning notices.
            </li>
            <li>
              <strong>Identify and disconnect susceptible equipment</strong>: Walk the circuit and
              disconnect dimmers, SPDs, electronic control gear, and any other semiconductor
              devices. Bridge RCDs if testing the circuit wiring. Make a note of everything
              disconnected for later reconnection.
            </li>
            <li>
              <strong>Remove lamps and portable appliances</strong>: Remove lamps from all holders.
              Ensure all socket outlets are clear of plugged-in equipment (or test with sockets
              switched off and unfused spur units isolated).
            </li>
            <li>
              <strong>Close all circuit breakers</strong>: For a whole-board IR test, close all MCBs
              or fuses. This connects all outgoing circuit conductors together so the test covers
              the entire installation.
            </li>
            <li>
              <strong>Connect the IR tester</strong>: Connect the instrument between the conductors
              being tested. For L-N testing, connect between the line and neutral busbars. For L-E
              testing, connect between the line busbar and the main earth terminal. For N-E testing,
              connect between the neutral busbar and earth.
            </li>
            <li>
              <strong>Apply the test voltage and record</strong>: Apply 500V DC (for 230/400V
              circuits). Allow the reading to stabilise — at least one minute. Record the stabilised
              value in MΩ on the schedule of test results.
            </li>
            <li>
              <strong>Discharge the circuit</strong>: After each test, allow the circuit to fully
              discharge before handling conductors. Quality IR testers include a discharge function.
            </li>
            <li>
              <strong>Reconnect all disconnected equipment</strong>: Methodically reconnect
              everything that was disconnected. Check off each item on your list.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'interpreting-results',
    heading: 'Interpreting Insulation Resistance Results',
    content: (
      <>
        <p>
          A single number on its own has limited meaning. Good interpretation of IR results requires
          context — the type of installation, its age, the ambient conditions, and comparisons
          between circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Above 200MΩ (or "OL" — over limit)</strong>: Excellent. Typical of new or
                recently rewired circuits in dry conditions. No action required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>2MΩ to 200MΩ on an existing installation</strong>: Satisfactory. Circuit
                passes. However, if a circuit reads consistently lower than others, note this and
                investigate if trending down on subsequent inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1MΩ to 2MΩ on an existing installation</strong>: Marginally passes but
                warrants investigation. Consider a C3 observation. Inspect for moisture, damaged
                cables, or deteriorated accessories on this circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Below 1MΩ</strong>: Fails BS 7671 Table 61. The circuit has a significant
                insulation fault. Locate and remedy before re-testing. Record as C2 (potentially
                dangerous) on the EICR if the low reading indicates a fire or shock risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Temperature and humidity both affect IR readings. A damp or cold cable will read lower
          than the same cable when warm and dry. If testing in cold or damp conditions, note the
          ambient conditions in the test record.
        </p>
      </>
    ),
  },
  {
    id: 'common-failures',
    heading: 'Common IR Test Failures and Their Causes',
    content: (
      <>
        <p>
          Understanding the most common causes of low insulation resistance readings helps
          electricians locate and remedy faults efficiently.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Moisture ingress</strong>: The most common cause. Affects outdoor circuits,
                bathroom circuits, and circuits near leaks. Water provides a conductive path between
                conductors. Result often improves when the installation dries out but the underlying
                entry point must be found and rectified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated rubber insulation</strong>: Older installations with
                vulcanised rubber (VIR) or lead-sheathed cables are particularly susceptible.
                Rubber becomes brittle and cracks with age, especially where cables run close to
                heat sources. Touching or flexing these cables during inspection can cause further
                insulation breakdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable damaged by mechanical means</strong>: Cables routed through wall
                cavities or beneath floors are sometimes caught by nails, staples, or screws — or
                crushed by subsequent building work. The insulation is breached but may not be
                immediately visible. IR testing locates these faults before they cause fires or
                electric shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overheated cables</strong>: Cables run in thermal insulation, bundled
                excessively, or overloaded for extended periods suffer insulation degradation. The
                insulation may appear intact visually but is chemically degraded and has reduced
                resistivity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed or disconnected equipment left in circuit</strong>: A failed
                semiconductor, carbon-tracked switch, or corroded accessory in circuit during
                testing will give a low IR reading that correctly reflects the fault. Identify and
                replace the faulty component.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Insulation Resistance Results',
    content: (
      <>
        <p>
          Insulation resistance results form part of the Schedule of Test Results, which is a
          mandatory document for both Electrical Installation Certificates (EICs) and{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Condition Reports (EICRs)
          </SEOInternalLink>
          . The schedule must record:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test voltage used</strong>: Record "500V DC" or "1000V DC" as applicable.
                This is required information — the result without the test voltage applied is
                meaningless.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Results per circuit</strong>: L-N, L-E, and N-E values in MΩ for each
                circuit. Where all circuits were tested together at the board, record the combined
                result and note that circuits were tested collectively.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations</strong>: Note any circuits that could not be fully isolated or
                any equipment that could not be disconnected. State the reason and any effect on the
                result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment disconnected</strong>: A brief note of significant items
                disconnected for the test — for example, "3 × dimmer switches bypassed" — is good
                practice and assists the inspector on any future periodic inspection.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record test results on site with Elec-Mate"
          description="The Elec-Mate testing app lets you enter IR results, continuity, loop impedance, and RCD test data directly on your phone. Auto-populates the schedule of test results and exports a compliant PDF instantly. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: IR Testing in Practice',
    content: (
      <>
        <p>
          Efficient IR testing is a skill that separates a competent inspector from an experienced
          one. Preparation before applying the test voltage saves time and avoids damage to
          equipment or instruments.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Results On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate schedule of tests
                  </SEOInternalLink>{' '}
                  to enter IR values directly as you test each circuit. No manual transfer later —
                  results go straight into the report and the PDF is ready before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Keep Your Instrument Calibrated</h4>
                <p className="text-white text-sm leading-relaxed">
                  Insulation resistance instruments must be calibrated annually and in current
                  calibration at the time of use. Record the instrument make, model, serial number,
                  and calibration due date on the EICR or EIC. An uncalibrated instrument is
                  non-compliant with BS 7671 Appendix 14.
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

export default function InsulationResistanceTestingGuidePage() {
  return (
    <GuideTemplate
      title="Insulation Resistance Testing Guide | IR Testing BS 7671"
      description="Complete guide to insulation resistance (IR) testing. Test voltages per BS 7671 Table 61, minimum values, disconnecting electronic components, interpreting results, and common failures."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Insulation Resistance Testing Guide:{' '}
          <span className="text-yellow-400">IR Testing to BS 7671</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about insulation resistance testing — test voltages (500V DC and 1000V DC), minimum acceptable values (1MΩ per BS 7671 Table 61), disconnecting dimmers and RCDs, interpreting results, and locating common failures."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Insulation Resistance Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Test Results On Site with Elec-Mate"
      ctaSubheading="Enter IR, continuity, loop impedance, and RCD results on your phone. Auto-populates the schedule of test results and exports a compliant PDF instantly. 7-day free trial."
    />
  );
}
