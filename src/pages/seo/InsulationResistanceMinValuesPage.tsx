import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Cable,
  BookOpen,
  Activity,
  Gauge,
  ClipboardCheck,
  Calculator,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Insulation Resistance Minimum Values',
    href: '/guides/insulation-resistance-minimum-values',
  },
];

const tocItems = [
  { id: 'what-is-ir', label: 'What Is Insulation Resistance?' },
  { id: 'bs7671-requirements', label: 'BS 7671 Requirements' },
  { id: 'minimum-values-table', label: 'Minimum Values Table' },
  { id: 'test-voltages', label: 'Test Voltages by Circuit' },
  { id: 'when-values-too-low', label: 'When Values Are Too Low' },
  { id: 'factors-affecting-ir', label: 'Factors Affecting IR' },
  { id: 'recording-results', label: 'Recording IR Results' },
  { id: 'practical-tips', label: 'Practical Testing Tips' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'BS 7671 Table 61 specifies minimum insulation resistance values based on circuit voltage. For SELV and PELV circuits (up to 50V), the minimum is 0.5 megohms. For circuits up to 500V (including standard 230V domestic), the minimum is 1.0 megohms. For circuits above 500V, the minimum is 1.0 megohms.',
  'The test voltage must match the circuit voltage: 250V DC for SELV/PELV circuits, 500V DC for circuits up to 500V (standard domestic and commercial), and 1000V DC for circuits above 500V. Using the wrong test voltage gives unreliable results.',
  'While 1.0 megohm is the absolute minimum for a 230V circuit, a reading below 2.0 megohms on a domestic circuit should prompt further investigation. New installations typically produce readings of 200 megohms or higher. Low readings indicate deteriorating insulation.',
  'Low insulation resistance can be caused by moisture, damaged cable insulation, contamination, excessive cable age, rodent damage, or equipment connected to the circuit during testing. Always disconnect all loads and electronic equipment before testing.',
  'Elec-Mate auto-validates every insulation resistance reading against BS 7671 Table 61 minimum values. Readings below the minimum are flagged immediately, with the relevant regulation reference and guidance on further investigation.',
];

const faqs = [
  {
    question: 'What is the minimum insulation resistance for a 230V circuit?',
    answer:
      'The minimum acceptable insulation resistance for a 230V circuit is 1.0 megohm (1 million ohms) when tested at 500V DC. This is specified in BS 7671 Table 61. However, 1.0 megohm is the absolute minimum — any reading at or near this value on a standard domestic circuit should be investigated further, as new cable and accessories typically produce readings of 200 megohms or higher. A reading of 2 megohms or less on a domestic circuit suggests significant insulation deterioration that is likely to worsen over time. On an EICR, a reading at the minimum limit would typically warrant a C3 (improvement recommended) observation, while a reading below the minimum would be a C2 (potentially dangerous) or even C1 (danger present) depending on the circumstances.',
  },
  {
    question: 'What test voltage should I use for insulation resistance testing?',
    answer:
      'The test voltage depends on the nominal circuit voltage. For SELV and PELV circuits (up to 50V), use 250V DC test voltage. For standard circuits up to 500V nominal (which includes all standard 230V single-phase and 400V three-phase installations), use 500V DC test voltage. For circuits above 500V nominal, use 1000V DC test voltage. These test voltages are specified in BS 7671 Table 61. Using too low a test voltage may fail to reveal insulation defects. Using too high a test voltage could damage sensitive electronic equipment — which is why all electronic equipment must be disconnected before testing. Most multifunction testers have selectable test voltages of 250V, 500V, and 1000V DC.',
  },
  {
    question: 'Why is my insulation resistance reading low?',
    answer:
      'Low insulation resistance readings can be caused by several factors. Moisture is the most common cause — water or condensation on cable insulation, in junction boxes, or in accessories reduces the resistance between conductors. Physically damaged cable insulation (from nails, screws, rodent damage, or UV degradation) exposes the conductor and drastically reduces IR. Age-related deterioration of PVC insulation occurs over decades, especially in warm environments. Contamination from dust, chemicals, or building materials on cable terminations can provide a conductive path. Finally, the most common false reading comes from equipment left connected to the circuit during testing — electronic equipment, LED drivers, and dimmers all provide a parallel resistance path that gives a misleadingly low IR reading.',
  },
  {
    question: 'Do I need to disconnect equipment before insulation resistance testing?',
    answer:
      'Yes. All current-using equipment and accessories should be disconnected from the circuit before performing insulation resistance testing. This includes removing lamps from lamp holders, unplugging appliances from socket outlets, and disconnecting fixed equipment such as cookers, immersion heaters, and boilers. Electronic equipment is particularly important to disconnect because the 500V DC test voltage can damage sensitive electronic components, and the low impedance of electronic power supplies gives misleadingly low IR readings. LED drivers, dimmer switches, PIR sensors, and smart switches should all be disconnected. If disconnection is impractical, note this limitation on the schedule of test results and record the IR reading with the qualification that equipment was connected.',
  },
  {
    question: 'What is the difference between insulation resistance and continuity testing?',
    answer:
      'Continuity testing and insulation resistance testing serve opposite purposes. Continuity testing verifies that conductors that should be connected have a low-resistance path between them — for example, the R1+R2 test confirms that the line and earth conductors form a continuous loop. Insulation resistance testing verifies that conductors that should be insulated from each other have a high-resistance barrier between them — for example, confirming that the line conductor is not leaking current to the earth conductor through damaged insulation. Continuity uses a low test voltage and looks for low resistance. Insulation resistance uses a high test voltage (500V DC) and looks for high resistance. Both tests are performed during the dead testing phase of the GN3 sequence.',
  },
  {
    question: 'Can insulation resistance be too high?',
    answer:
      'In practical terms, no. Insulation resistance cannot be too high — higher values indicate better insulation quality. New cable typically reads in the hundreds of megohms range, and many modern multifunction testers display readings up to 999 megohms or show an over-range indication. A reading of 999 megohms or over-range is perfectly normal and indicates excellent insulation. The only concern with very high readings would be if the instrument is not making proper contact with the conductors (giving an open-circuit reading that does not reflect the actual insulation condition), but this would be evident from inconsistent or fluctuating readings rather than a steady high value.',
  },
];

const relatedPages = [
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Test Guide',
    description: 'Step-by-step procedure for performing insulation resistance tests.',
    icon: Activity,
    category: 'Guide' as const,
  },
  {
    href: '/guides/low-insulation-resistance',
    title: 'Low Insulation Resistance',
    description: 'Troubleshooting and fault-finding for low IR readings.',
    icon: Search,
    category: 'Guide' as const,
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description: 'The correct dead and live testing order per GN3.',
    icon: ClipboardCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/how-to-test-insulation-resistance',
    title: 'How to Test Insulation Resistance',
    description: 'Practical guide with step-by-step instrument setup and connections.',
    icon: Gauge,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current Wiring Regulations.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create EICRs with auto-validated insulation resistance results.',
    icon: FileCheck2,
    category: 'Certificate' as const,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-ir',
    heading: 'What Is Insulation Resistance?',
    content: (
      <>
        <p>
          Insulation resistance (IR) is a measurement of the resistance provided by the insulating
          material surrounding electrical conductors. In a healthy installation, the insulation
          prevents current from flowing between conductors that should be electrically separate —
          for example, between the line conductor and the earth conductor, or between the line and
          neutral conductors.
        </p>
        <p>
          Over time, insulation can deteriorate due to heat, moisture, mechanical damage, chemical
          exposure, or simple ageing. As the insulation resistance decreases, leakage current
          increases. This leakage current can cause RCDs to trip (nuisance tripping), can generate
          heat in the cable (fire risk), and in extreme cases can reduce the insulation to a point
          where a full short circuit or earth fault occurs.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/insulation-resistance-testing">
            insulation resistance test
          </SEOInternalLink>{' '}
          applies a DC voltage (typically 500V for standard circuits) between the conductors and
          measures the resulting leakage current. The instrument calculates and displays the
          resistance in megohms. A higher reading means better insulation; a lower reading indicates
          deterioration.
        </p>
        <p>
          BS 7671 Regulation 643.3 requires insulation resistance to be measured during initial
          verification and periodic inspection. The minimum acceptable values are specified in Table
          61 of BS 7671, and these values depend on the nominal voltage of the circuit.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Requirements for Insulation Resistance',
    content: (
      <>
        <p>
          BS 7671 Regulation 643.3.1 requires that the insulation resistance of every circuit is
          measured between live conductors (line and neutral connected together) and earth, and
          between line and neutral individually. The measurements must be taken with all loads
          disconnected, all switches closed (to include all wiring in the test), and all fuses in
          place or MCBs switched on.
        </p>
        <p>
          Regulation 643.3.2 specifies that where circuits include surge protective devices (SPDs)
          or other voltage-limiting devices connected between live conductors and earth, these
          devices may need to be disconnected before testing, as they can give misleadingly low
          readings. Similarly, electronic equipment with filter capacitors or EMC components can
          affect readings.
        </p>
        <p>
          The minimum acceptable values are defined in Table 61 of BS 7671. These are absolute
          minimum limits — any reading at or below these values indicates that the insulation has
          deteriorated to the point where further investigation is required. In practice, readings
          significantly above the minimum are expected for installations in good condition.
        </p>
        <p>
          During a{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            periodic inspection (EICR)
          </SEOInternalLink>
          , insulation resistance readings that are declining over successive inspections (even if
          still above the minimum) should be noted as this indicates progressive deterioration that
          may eventually lead to a fault.
        </p>
      </>
    ),
  },
  {
    id: 'minimum-values-table',
    heading: 'Minimum Insulation Resistance Values (BS 7671 Table 61)',
    content: (
      <>
        <p>
          The following table reproduces the minimum insulation resistance values from BS 7671 Table
          61. These are the values that your{' '}
          <SEOInternalLink href="/guides/multifunction-tester-guide">
            multifunction tester
          </SEOInternalLink>{' '}
          readings must meet or exceed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            BS 7671 Table 61 — Minimum Insulation Resistance
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <div>
                <span className="text-white font-bold">SELV and PELV</span>
                <span className="text-white text-sm block">Up to 50V nominal</span>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 font-bold">250V DC</span>
                <span className="text-white text-sm block">Min: 0.5 megohms</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <div>
                <span className="text-white font-bold">Low Voltage (up to 500V)</span>
                <span className="text-white text-sm block">Including 230V and 400V circuits</span>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 font-bold">500V DC</span>
                <span className="text-white text-sm block">Min: 1.0 megohms</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <div>
                <span className="text-white font-bold">Above 500V</span>
                <span className="text-white text-sm block">HV circuits</span>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 font-bold">1000V DC</span>
                <span className="text-white text-sm block">Min: 1.0 megohms</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Minimum Does Not Mean Acceptable</h4>
              <p className="text-white text-sm leading-relaxed">
                While 1.0 megohm is the minimum for a 230V circuit, a reading this low on a domestic
                installation almost certainly indicates a problem. New cable typically reads 200+
                megohms. Even older installations in good condition should read 10+ megohms per
                circuit. A reading below 2.0 megohms warrants further investigation to identify the
                cause of the low reading before it deteriorates further.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Auto-Validated IR Readings"
          description="Enter your insulation resistance readings into Elec-Mate and the app instantly compares them against BS 7671 Table 61 minimum values. Values below the minimum are highlighted in red with the relevant regulation reference. Values approaching the minimum are flagged as amber for investigation."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'test-voltages',
    heading: 'Test Voltages by Circuit Type',
    content: (
      <>
        <p>
          Selecting the correct test voltage is essential for obtaining meaningful insulation
          resistance readings. The test voltage must be high enough to stress the insulation and
          reveal defects, but not so high that it damages equipment or the insulation itself.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Test Voltage Selection</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">250V DC</strong> — used for SELV (Separated
                Extra Low Voltage) and PELV (Protective Extra Low Voltage) circuits. These include
                doorbell transformers, some LED lighting drivers, bathroom shaver socket supplies,
                and fire alarm circuits operating at 24V or 48V.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">500V DC</strong> — the standard test voltage for
                the vast majority of circuits in domestic and commercial installations. All 230V
                single-phase circuits, 400V three-phase circuits, and circuits up to 500V nominal
                use this test voltage. This covers lighting, power, cooker, shower, immersion
                heater,{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">EV charger</SEOInternalLink>
                , and distribution circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">1000V DC</strong> — used for circuits above 500V
                nominal. This is uncommon in domestic work but may be encountered in industrial
                installations, motor circuits with higher voltage ratings, or HV distribution
                systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always check your{' '}
          <SEOInternalLink href="/compare/fluke-vs-megger">multifunction tester</SEOInternalLink>{' '}
          settings before starting the test. Accidentally using 1000V on a 230V circuit with
          connected electronic equipment could damage sensitive components. This is another reason
          why all equipment must be disconnected before testing.
        </p>
      </>
    ),
  },
  {
    id: 'when-values-too-low',
    heading: 'When Insulation Resistance Values Are Too Low',
    content: (
      <>
        <p>
          If an insulation resistance reading falls below the minimum value in BS 7671 Table 61, or
          is significantly lower than expected for the age and type of installation, further
          investigation is required. The first step is to confirm that the low reading is genuine
          and not caused by testing error.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Troubleshooting Low IR Readings</h3>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Confirm all equipment is disconnected</strong> — connected electronic
              equipment is the most common cause of low readings. Check that all lamps are removed,
              all appliances unplugged, and all electronic accessories disconnected.
            </li>
            <li>
              <strong>Check for moisture</strong> — moisture in junction boxes, accessories, or
              cable routes drastically reduces IR. If the installation is in a damp environment or
              has recently been exposed to water, allow it to dry before retesting.
            </li>
            <li>
              <strong>Split the circuit</strong> — disconnect sections of the circuit at junction
              boxes or accessories to isolate the section with the low reading. This narrows down
              the location of the fault.
            </li>
            <li>
              <strong>Inspect cable routes</strong> — check for visible damage to cable insulation,
              particularly where cables pass through walls, floors, or ceilings. Look for nail or
              screw strikes, rodent damage, and UV degradation on exposed cables.
            </li>
            <li>
              <strong>Check terminations</strong> — loose or contaminated terminations can provide a
              conductive path between conductors. Tighten all connections and clean any contaminated
              terminals.
            </li>
          </ol>
        </div>
        <p>
          For guidance on diagnosing{' '}
          <SEOInternalLink href="/guides/low-insulation-resistance">
            low insulation resistance
          </SEOInternalLink>{' '}
          readings, including a systematic fault-finding methodology, see the dedicated
          troubleshooting guide.
        </p>
      </>
    ),
  },
  {
    id: 'factors-affecting-ir',
    heading: 'Factors Affecting Insulation Resistance',
    content: (
      <>
        <p>
          Understanding the factors that affect insulation resistance helps you interpret readings
          correctly and identify genuine faults versus testing artefacts.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-3">Temperature</h3>
            <p className="text-white text-sm leading-relaxed">
              Insulation resistance decreases as temperature increases. A circuit tested on a hot
              summer day will give lower readings than the same circuit tested in winter. BS 7671
              does not require temperature correction for IR testing, but be aware of this effect
              when comparing readings taken at different times of year during successive EICRs.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-3">Humidity and Moisture</h3>
            <p className="text-white text-sm leading-relaxed">
              Moisture on or within cable insulation significantly reduces IR readings.
              Installations in bathrooms, kitchens, outdoor locations, and basements are more
              susceptible. Allow cables and accessories to dry thoroughly before testing for
              accurate results.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-3">Cable Length</h3>
            <p className="text-white text-sm leading-relaxed">
              Longer circuits have lower insulation resistance because the total leakage area
              increases with length. A circuit with 100 metres of cable will typically have a lower
              IR reading than the same cable type in a 10 metre circuit. This is normal and
              expected.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-3">Cable Age</h3>
            <p className="text-white text-sm leading-relaxed">
              PVC insulation degrades over decades. Cables from the 1960s and 1970s using older
              insulation compounds may show lower readings than modern XLPE or LSF cables. This
              progressive deterioration is why periodic inspection is required.
            </p>
          </div>
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
          Insulation resistance readings are recorded in the schedule of test results on the EIC or
          EICR. The schedule includes columns for insulation resistance between line and earth
          (L-E), neutral and earth (N-E), and line and neutral (L-N).
        </p>
        <p>
          For initial verification ({' '}
          <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink>), all three
          measurements should be recorded for every circuit. For periodic inspection (EICR), the
          extent of IR testing depends on the agreed scope, but all circuits should ideally be
          tested.
        </p>
        <p>
          Record the actual measured value in megohms. Do not simply write "pass" or "satisfactory"
          — the actual value is needed for comparison with future inspections. If the instrument
          reads over-range (for example, displays greater than 999 megohms), record this as "&gt;
          999" or "OL" (overload/over-limit).
        </p>
        <p>
          Where a reading is below the minimum, raise an observation with the appropriate code. A
          reading just below the minimum with no other signs of deterioration might be C2
          (potentially dangerous). A very low reading with visible damage would be C1 (danger
          present). A reading that meets the minimum but is lower than expected for the installation
          type might warrant a C3 (improvement recommended) with a note to investigate further.
        </p>
        <SEOAppBridge
          title="Insulation Resistance Auto-Validation"
          description="Elec-Mate validates every insulation resistance reading against BS 7671 Table 61 as you enter it. The app compares your reading to the minimum value for the test voltage selected, flags readings below minimum in red, and auto-generates the observation code and regulation reference for the EICR."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'practical-tips',
    heading: 'Practical Testing Tips',
    content: (
      <>
        <p>
          Insulation resistance testing is straightforward in principle but requires care in
          practice to obtain accurate and meaningful results. Here are practical tips from
          experienced inspectors:
        </p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Discharge capacitance</strong> — after each IR
              test, allow the instrument to discharge the capacitance stored in the cable before
              disconnecting. Most modern MFTs do this automatically, but on longer cable runs the
              stored charge can give a noticeable jolt if you disconnect immediately.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Close all switches</strong> — ensure all switches
              on the circuit under test are in the closed (on) position. Open switches exclude the
              wiring downstream from the test, potentially masking a fault.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Remove lamps</strong> — lamp filaments (and
              especially LED driver circuits) provide a parallel path that reduces the IR reading.
              Remove all lamps from lamp holders before testing lighting circuits.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Disconnect SPDs</strong> — surge protective
              devices connected between live conductors and earth will give a low IR reading. Many
              SPDs have a disconnect feature for testing; others need to be physically disconnected.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Warn occupants</strong> — the 500V DC test voltage
              can give a significant electric shock. Ensure no one can access or touch any part of
              the circuit under test. Use warning notices at the{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                consumer unit
              </SEOInternalLink>{' '}
              and at accessible accessories.
            </span>
          </li>
        </ul>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InsulationResistanceMinValuesPage() {
  return (
    <GuideTemplate
      title="Insulation Resistance Minimum Values BS 7671 | Complete Reference"
      description="Complete reference for insulation resistance minimum values under BS 7671 Table 61. Test voltages by circuit type (250V, 500V, 1000V DC), minimum megohm values, what to do when values are too low, recording IR results on EIC and EICR schedules. UK electrician guide."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Essential Reference"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Insulation Resistance Minimum Values
          <br />
          <span className="text-yellow-400">BS 7671 Table 61 Complete Reference</span>
        </>
      }
      heroSubtitle="Know the minimum insulation resistance values for every circuit type under BS 7671. This guide covers test voltages, minimum acceptable values, what to do when readings are too low, factors that affect IR, and how to record results correctly on the schedule of test results."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Auto-Validate Every IR Reading"
      ctaSubheading="Elec-Mate compares every insulation resistance reading against BS 7671 Table 61 minimum values in real time. Readings below minimum are flagged instantly. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
