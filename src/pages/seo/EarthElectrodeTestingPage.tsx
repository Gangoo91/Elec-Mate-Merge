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
  CircleDot,
  MapPin,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing Guides', href: '/guides/electrical-testing' },
  { label: 'Earth Electrode Testing Guide', href: '/earth-electrode-testing' },
];

const tocItems = [
  { id: 'types-of-earth-electrode', label: 'Types of Earth Electrode' },
  { id: 'when-testing-required', label: 'When Electrode Testing Is Required' },
  { id: 'bs7671-tt-requirements', label: 'BS 7671 TT System Requirements' },
  { id: 'fall-of-potential-method', label: 'Fall of Potential Method' },
  { id: 'stakeless-clamp-method', label: 'Stakeless Clamp Method' },
  { id: 'acceptable-values', label: 'Acceptable Electrode Resistance Values' },
  { id: 'seasonal-variation', label: 'Seasonal Variation in Soil Resistance' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Earth electrode testing measures the resistance of the electrode system to earth — the Ra value in BS 7671 notation. For TT systems, Ra must be sufficiently low that the product of Ra multiplied by the operating current of the RCD does not exceed 50V (Ra × I∆n ≤ 50V).',
  'The fall of potential method is the standard technique for earth electrode resistance measurement. It requires driving two temporary test stakes at defined distances from the electrode under test, and is specified in BS EN 61557-5.',
  'The stakeless clamp method (also called the clamp-on method) can measure electrode resistance without driving stakes — useful on multi-electrode systems where individual electrode resistance cannot be measured with stakes. Requires at least two parallel earth electrodes.',
  'Soil resistivity varies significantly with moisture content and temperature. An electrode tested in summer dry conditions will show a much higher resistance than the same electrode tested after prolonged rain. Testing during dry conditions gives a worst-case (highest) reading.',
  'BS 7671 Regulation 411.5.3 requires that for TT earthing systems, the RCD must operate at a residual current that satisfies Ra × I∆n ≤ 50V. A 30mA RCD permits a maximum Ra of 50 ÷ 0.03 = 1667Ω, but in practice electrode resistance should be well below this.',
];

const faqs = [
  {
    question: 'When is earth electrode testing required?',
    answer:
      'Earth electrode testing is required in the following circumstances: initial installation and commissioning of any TT earthing system (where the installation relies on its own earth electrode rather than a supply earth); periodic inspection and testing of TT system installations (every 5 years, or more frequently for high-risk premises); after any work that may have disturbed or damaged the electrode (excavation, ground works, flooding); when the measured earth fault loop impedance suggests the electrode resistance has increased; and when RCDs on a TT system are tripping more frequently than expected, which may indicate electrode resistance has increased. All new renewable energy installations (solar PV, EV charging) with TT earthing also require electrode testing.',
  },
  {
    question: 'What is the fall of potential method?',
    answer:
      'The fall of potential method is the principal technique for measuring earth electrode resistance to earth. The earth tester instrument is connected to the electrode under test (E), a current test stake (C) driven at a distance of at least 10 times the length of the electrode (typically 20 to 40 metres from a standard rod electrode), and a potential probe (P) driven at approximately 62% of the distance between E and C. The instrument passes a test current between E and C and measures the voltage at P. The ratio of voltage to current gives the electrode resistance. The 62% rule is derived from the geometry of the earth return current distribution.',
  },
  {
    question: 'What electrode resistance value is acceptable?',
    answer:
      'BS 7671 Regulation 411.5.3 requires that for TT earthing: Ra × I∆n ≤ 50V, where Ra is the electrode resistance and I∆n is the rated residual operating current of the RCD. For a 30mA RCD, this gives Ra ≤ 50 ÷ 0.030 = 1667Ω. For a 100mA RCD, Ra ≤ 500Ω. In practice, electrode resistance well below these limits is preferred to provide adequate margin for seasonal variation and electrode degradation. Values below 200Ω are typical targets for domestic TT installations with 30mA RCDs.',
  },
  {
    question: 'What types of earth electrode does BS 7671 recognise?',
    answer:
      'BS 7671 Regulation 542.2.1 lists the following types: earth rods or pipes (the most common for new domestic installations — steel-cored copper-bonded rods, typically 1.2m to 2.4m long, driven vertically or at an angle); earth tapes or wires (flat or round copper strip or wire buried horizontally in a trench, typically at least 0.5m deep); earth plates (flat copper or galvanised steel plates buried vertically, at least 0.5m below the surface); the metal sheath and armour of certain cables (where specifically approved and not the primary earthing means); welded metal reinforcement of concrete foundations (foundation electrodes); and other buried metalwork of sufficient extent.',
  },
  {
    question: 'Why does soil moisture affect electrode resistance?',
    answer:
      'Soil conducts electricity via dissolved salts and moisture. Dry soil has much higher resistivity than wet soil because there is less moisture to carry ionic current. In the UK, electrode resistance can vary by a factor of 2 to 5 between summer dry conditions and winter wet conditions on the same electrode. Testing during dry conditions gives the worst-case (highest) resistance reading — the most conservative result for compliance purposes. If the electrode meets the requirement during dry conditions, it will perform better during wet weather.',
  },
  {
    question: 'What is the stakeless clamp method and when is it used?',
    answer:
      'The stakeless (or clamp-on) method uses a clamp meter that applies a known test voltage to the electrode via a toroidal transformer, and measures the resulting current, deriving resistance from V/I. Unlike the fall of potential method, no test stakes are needed. It is accurate only when there are at least two parallel earth paths (two separate electrodes, or an electrode in parallel with a buried metal pipe or similar). On a system with a single electrode, the clamp method cannot give an accurate reading. It is particularly useful on multi-electrode systems at substations, industrial premises, and commercial buildings where driving test stakes is impractical.',
  },
  {
    question: 'How deep should earth rod electrodes be driven?',
    answer:
      'BS 7671 Regulation 542.2.3 requires that earth electrodes are installed so as to minimise the likelihood of drying out or freezing. In practice, this means the top of the electrode should be at least 0.5m below the surface. Standard copper-bonded steel earth rods are typically 1.2m long and can be coupled and driven to greater depths. In ground where the topsoil layer is thin or surface resistivity is high, driving to 2.4m or more using coupled rods can significantly reduce measured resistance. The full length of the rod contributes to current dispersal.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/loop-impedance-testing-guide',
    title: 'Loop Impedance Testing Guide',
    description: 'Ze, Zs, and prospective fault current testing including TT system considerations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description: 'Half-rated, rated, and 5 times current RCD test procedures — essential for TT systems.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/insulation-resistance-testing-guide',
    title: 'Insulation Resistance Testing Guide',
    description: 'Test voltages, minimum values, disconnecting components, and interpreting results.',
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
    id: 'types-of-earth-electrode',
    heading: 'Types of Earth Electrode',
    content: (
      <>
        <p>
          An earth electrode is a conductor that provides a low-resistance electrical connection
          between the installation's earthing system and the general mass of earth. BS 7671
          Regulation 542.2.1 recognises several types of earth electrode. The choice depends on
          the soil conditions, available space, and the required resistance value.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth rods (BS EN 62561-2)</strong>: The most common type for new
                domestic and commercial installations. Copper-bonded steel-cored rods, typically
                14mm to 20mm diameter and 1.2m long, driven vertically into the ground. Multiple
                rods can be coupled and driven to greater depths. Parallel multiple rods reduce
                the combined resistance. Standard for residential TT systems, outbuildings, and
                solar PV earthing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth plates</strong>: Flat copper or galvanised steel plates, minimum
                500mm × 500mm, buried vertically at a depth of at least 0.5m. Less common than
                rods for new installations but used where hard ground prevents rod driving, or
                where very low resistance is required. Both faces of the plate must be in contact
                with soil.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth tapes (strip electrodes)</strong>: Bare copper or tinned copper
                tape or round wire, buried horizontally in a trench at a minimum depth of 0.5m.
                Useful for sites with shallow soil over rock, where rods cannot be driven. The
                resistance decreases as the tape length increases. Sometimes used in a ring
                configuration around a building (ring earth electrode).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Foundation electrodes (concrete-embedded)</strong>: Steel reinforcement
                bars in concrete foundations can serve as an earth electrode where the concrete
                is in direct contact with soil and the reinforcement is electrically connected.
                Regulation 542.2.5 covers requirements. Provides a large electrode area and
                typically very low resistance. Common in new commercial and industrial buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sheaths and armour</strong>: The lead sheath or steel armour of
                certain buried cables may serve as an earth electrode where specifically approved.
                This use is becoming less common as it relies on maintaining the integrity of the
                cable throughout its life.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-testing-required',
    heading: 'When Earth Electrode Testing Is Required',
    content: (
      <>
        <p>
          Earth electrode testing is not required on every electrical installation — only on
          those that use an earth electrode as part of the earthing system. It is a mandatory
          test whenever an electrode forms part of the installation's protective earthing.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing system installations</strong>: Any installation where the
                earthing is provided by a local electrode rather than through the supply network
                (PME or TN-S). TT systems are common in rural areas, older properties in areas
                with overhead supplies, and properties where the DNO does not provide an earth
                terminal. All solar PV, wind turbine, and EV charging installations on TT systems
                require electrode testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>New electrode installations</strong>: Whenever an earth electrode is
                installed — for a new TT system, as supplementary earthing for a TN system,
                for lightning protection earthing, or for renewable energy system earthing —
                the electrode resistance must be measured and recorded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection of TT installations</strong>: Every periodic
                inspection (EICR) of a TT system installation must include electrode resistance
                measurement. If the measured value has increased significantly since the last
                test, investigate the electrode condition and connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>After physical disturbance</strong>: Ground works, excavation near the
                electrode, prolonged drought, or flooding can all affect electrode condition and
                resistance. Re-test after any such event.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671-tt-requirements',
    heading: 'BS 7671 TT System Earthing Requirements',
    content: (
      <>
        <p>
          A TT earthing system relies entirely on a local earth electrode for fault protection.
          There is no low-impedance metallic return path to the supply transformer, so fault
          currents through earth are limited by the combined resistance of the electrode and the
          soil. This is why RCDs are mandatory for all final circuits on TT systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.5.3 — the key requirement</strong>: For TT earthing
                systems, the earth fault loop impedance Zs must satisfy: Zs ≤ 50V ÷ I∆n, where
                I∆n is the rated residual operating current of the RCD protecting the circuit.
                This ensures that the voltage appearing on exposed-conductive-parts under fault
                conditions does not exceed 50V (the conventional touch voltage limit).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ra × I∆n ≤ 50V</strong>: This is equivalent to requiring that the
                electrode resistance Ra multiplied by the RCD operating current does not exceed
                50V. For a 30mA RCD: Ra ≤ 50 ÷ 0.030 = 1667Ω. For a 100mA RCD: Ra ≤ 500Ω.
                For a 300mA RCD: Ra ≤ 167Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs mandatory on TT systems</strong>: BS 7671 Regulation 411.5.2
                requires that all final circuits in a TT system are protected by an RCD.
                Overcurrent protective devices alone cannot provide adequate automatic
                disconnection on TT systems because the fault current is too low to operate
                MCBs or fuses within the required disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing conductor and main earth terminal</strong>: The electrode
                must be connected to the main earthing terminal (MET) via an earthing conductor
                sized in accordance with BS 7671 Table 54.1. The connection must be reliable,
                accessible, and labelled per Regulation 514.13.1 with a label reading
                "Safety Electrical Connection — Do Not Remove".
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fall-of-potential-method',
    heading: 'Fall of Potential Method — Step by Step',
    content: (
      <>
        <p>
          The fall of potential method is the definitive technique for earth electrode resistance
          measurement. It is specified in BS EN 61557-5 and BS 7671 Appendix 14. The method
          requires a dedicated earth resistance tester (sometimes called an earth megger or
          ground resistance meter) and two temporary test stakes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Disconnect the electrode</strong>: Temporarily disconnect the electrode
              under test from the main earthing terminal. If the installation is live and other
              earth electrodes remain connected, this may be safe to do. If the electrode is
              the sole earth connection, the installation must be de-energised first.
            </li>
            <li>
              <strong>Select the test layout</strong>: Drive the current stake (C) as far as
              practicable from the electrode under test — at least 10 times the length of the
              electrode rod, or at minimum 20 metres. For rod electrodes of 1.2m length, a
              spacing of 20 metres minimum is typical.
            </li>
            <li>
              <strong>Place the potential probe (P)</strong>: Drive the potential probe at
              approximately 62% of the distance between the electrode under test and the current
              stake. If E-to-C distance is 30 metres, drive P at approximately 18.6 metres from E.
            </li>
            <li>
              <strong>Connect the instrument</strong>: Connect the instrument terminals: E (or H)
              to the electrode under test, C (or S) to the current stake, and P to the potential
              probe. Use separate conductors for each connection — do not share connections.
            </li>
            <li>
              <strong>Take the reading at 62%</strong>: Record the resistance reading with the
              potential probe at the 62% position. This is the Ra value.
            </li>
            <li>
              <strong>Verify accuracy — take additional readings</strong>: Move the potential probe
              to 52% and 72% of the E-to-C distance. If all three readings are within approximately
              10% of each other, the 62% reading is reliable. If they differ significantly,
              increase the E-to-C separation and repeat.
            </li>
            <li>
              <strong>Reconnect the electrode</strong>: After testing, reconnect the electrode to
              the main earthing terminal. Verify the connection is secure.
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Sufficient separation is critical</strong>: If the current stake and the
              electrode under test are too close together, their resistance areas overlap and the
              reading is artificially low. If the 52% and 72% readings differ significantly from
              the 62% reading, the current stake must be moved further away. On constrained sites,
              the current stake can be placed at 90 degrees to the potential probe rather than
              in line with the electrode.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'stakeless-clamp-method',
    heading: 'Stakeless Clamp Method',
    content: (
      <>
        <p>
          The stakeless (or clamp-on) earth resistance method uses a specially designed clamp
          meter that measures electrode resistance without requiring test stakes to be driven.
          It is quicker to use than the fall of potential method and does not disturb the ground,
          making it suitable for finished sites and hard surfaces.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works</strong>: The clamp is placed around the earthing conductor
                connecting the electrode to the MET. The instrument injects a known voltage via
                a toroidal transmitter winding and measures the resulting current via a receiver
                winding. The ratio V/I gives the resistance of the electrode loop. The electrode
                loop must include at least one parallel earth path for the method to give an
                accurate reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum two parallel paths required</strong>: The clamp method measures
                the resistance of the electrode under test in parallel with all other earth
                paths in the circuit. If only one electrode exists, the clamp method gives an
                infinite or unstable reading. At least one other parallel earth path (a second
                electrode, a buried water pipe, or a supply earth) must exist.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where it is most useful</strong>: Multi-electrode systems at substations,
                industrial premises, telecommunications sites, and commercial buildings. Also
                useful for verifying individual rod resistance in a multi-rod domestic system.
                Not suitable as the sole method for a single-electrode TT installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interpretation</strong>: The clamp reading is the parallel combination of
                the electrode under test and all other parallel paths. If the parallel paths are
                significantly lower resistance than the electrode being tested, the reading
                approximates the parallel path resistance, not the electrode resistance.
                Mathematical correction can derive the individual electrode resistance if the
                parallel path resistance is known.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'acceptable-values',
    heading: 'Acceptable Earth Electrode Resistance Values',
    content: (
      <>
        <p>
          The required electrode resistance depends on the RCD protecting the installation. There
          is no single universal "pass" value for electrode resistance — the requirement is
          derived from the formula Ra × I∆n ≤ 50V.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD — maximum Ra 1667Ω</strong>: In theory a 30mA RCD permits up to
                1667Ω. In practice, values above 200Ω are concerning because seasonal variation
                could push the resistance higher during dry periods, and electrode degradation
                will increase resistance over time. A target of below 100Ω is good practice for
                domestic TT installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>100mA RCD — maximum Ra 500Ω</strong>: Used for fire protection or where
                a 30mA RCD would cause nuisance tripping. Higher operating current requires lower
                maximum electrode resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>300mA RCD — maximum Ra 167Ω</strong>: Where 300mA RCDs are used for
                upstream protection (discrimination), the electrode resistance must be
                significantly lower. Achieving 167Ω or less may require multiple electrodes
                in poor soil conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Improving high resistance</strong>: Where electrode resistance is too
                high, options include: driving additional rods in parallel (two rods with
                1.2m spacing in parallel reduces resistance by approximately 40%); driving rods
                to greater depth using coupled sections; using chemical earth electrodes
                (bentonite, conductive concrete, or electrode enhancement compounds around the
                rod); or using horizontal tape electrodes in a ring or grid configuration.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'seasonal-variation',
    heading: 'Seasonal Variation in Soil Resistance',
    content: (
      <>
        <p>
          Soil electrical resistivity — and therefore earth electrode resistance — varies
          significantly with soil moisture content and temperature. This variation is one of the
          most important factors in electrode design and testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Summer vs winter variation</strong>: In the UK, electrode resistance
                measured during a dry summer period may be 2 to 5 times higher than the same
                electrode measured after prolonged rainfall. Sandy and gravelly soils show the
                greatest variation; clay soils show less because they retain moisture better.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frost effects</strong>: Frozen soil has extremely high resistivity —
                ice does not conduct electricity. Shallow electrodes in cold climates can show
                very high resistance in winter. BS 7671 requires electrodes to be installed
                below the frost line where applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test during dry conditions</strong>: For the most conservative (highest)
                resistance reading that represents worst-case conditions, test during a dry period
                in summer. If the electrode meets the requirement under these conditions, it will
                perform better during wet weather. Note the weather conditions and recent rainfall
                at the time of testing on the test record.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deeper electrodes are more stable</strong>: Soil at depth retains moisture
                more consistently than the surface layer. Driving electrodes to 2.4m or more
                (using coupled rod sections) gives a more stable year-round resistance than a
                shallow 1.2m rod.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Earth Electrode Test Results',
    content: (
      <>
        <p>
          Earth electrode resistance results are recorded on the Schedule of Test Results as part
          of the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate or EICR
          </SEOInternalLink>
          . The following information should be recorded:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrode type and dimensions</strong>: Record whether the electrode is
                a rod, plate, tape, or other type; the material (copper-bonded steel, bare copper
                etc.); and the dimensions or depth (e.g., "2 × 1.2m coupled copper-bonded rods").
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test method</strong>: Record whether the fall of potential method or
                stakeless clamp method was used. Note the E-to-C and E-to-P distances used for
                the fall of potential method.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ra value</strong>: Record the measured electrode resistance in ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weather conditions at time of test</strong>: Note whether conditions were
                dry, wet, or after recent rainfall. This contextualises the reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD rating and Ra × I∆n calculation</strong>: Record the RCD rated
                current and the product Ra × I∆n to confirm compliance with BS 7671
                Regulation 411.5.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Instrument details</strong>: Record the earth tester make, model, serial
                number, and calibration due date.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record earth electrode test results on site with Elec-Mate"
          description="Enter Ra values, electrode details, and RCD compliance calculations on your phone. The Elec-Mate testing app exports a compliant schedule of test results instantly. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Earth Electrode Testing in Practice',
    content: (
      <>
        <p>
          Earth electrode testing requires specific equipment (an earth resistance tester and test
          stakes), and some planning about where the test stakes can be driven. On constrained
          sites — urban gardens, car parks, or industrial yards — finding space for the test
          layout can be challenging.
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
                    Elec-Mate testing app
                  </SEOInternalLink>{' '}
                  to record the electrode type, Ra value, RCD rating, and Ra × I∆n calculation
                  on site. The app checks compliance against BS 7671 Regulation 411.5.3
                  automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Alternative Stake Placement</h4>
                <p className="text-white text-sm leading-relaxed">
                  On constrained sites, the test stakes do not have to be in a straight line
                  with the electrode. Placing the current stake at 90 degrees to the potential
                  probe line is an accepted variation. The important requirement is maximum
                  separation — both between E and C, and between P and any other metallic
                  structure that might provide a parallel earth path.
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

export default function EarthElectrodeTestingPage() {
  return (
    <GuideTemplate
      title="Earth Electrode Testing Guide UK | Rod, Plate & Strip Electrodes"
      description="Complete guide to earth electrode testing for UK electricians. Types of earth electrode, fall of potential method, stakeless clamp method, acceptable resistance values, BS 7671 TT system requirements, and seasonal variation in soil resistance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CircleDot}
      heroTitle={
        <>
          Earth Electrode Testing Guide:{' '}
          <span className="text-yellow-400">Rod, Plate & Strip Electrodes</span>
        </>
      }
      heroSubtitle="The complete UK electrician's guide to earth electrode testing — types of electrode, BS 7671 TT system requirements, fall of potential method, stakeless clamp method, acceptable resistance values, and seasonal variation in soil resistivity."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earth Electrode Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Earth Electrode Test Results On Site with Elec-Mate"
      ctaSubheading="Enter Ra values, electrode details, and RCD compliance calculations on your phone. Auto-checks against BS 7671 Regulation 411.5.3 and exports a compliant schedule of test results. 7-day free trial."
    />
  );
}
