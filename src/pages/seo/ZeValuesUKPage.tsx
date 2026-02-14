import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Shield,
  Activity,
  Gauge,
  AlertTriangle,
  Calculator,
  FileCheck2,
  GraduationCap,
  Mic,
  ShieldCheck,
  Phone,
  HelpCircle,
  CircuitBoard,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/electrical-testing-guide' },
  { label: 'Ze Values UK', href: '/guides/ze-values-uk' },
];

const tocItems = [
  { id: 'what-is-ze', label: 'What Is Ze?' },
  { id: 'tns-ze', label: 'TN-S — Expected Ze: 0.80 ohms Maximum' },
  { id: 'tncs-ze', label: 'TN-C-S (PME) — Expected Ze: 0.35 ohms Maximum' },
  { id: 'tt-ze', label: 'TT — Expected Ze: 21 ohms Maximum' },
  { id: 'measuring-ze', label: 'How to Measure Ze' },
  { id: 'what-affects-ze', label: 'What Affects Ze' },
  { id: 'high-ze', label: 'When Ze Is Higher Than Expected' },
  { id: 'querying-the-dno', label: 'When to Query the DNO' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Ze (external earth fault loop impedance) is the impedance of the fault loop path outside the installation — from the supply transformer, through the line conductor, and back via the earth return path.',
  'Expected maximum Ze values by earthing arrangement: TN-S = 0.80 ohms, TN-C-S (PME) = 0.35 ohms, TT = 21 ohms. These are the maximum assumed values from BS 7671.',
  'Ze directly affects every Zs reading on the installation — a high Ze pushes up Zs on every circuit, potentially causing widespread compliance failures.',
  'If measured Ze significantly exceeds the maximum assumed value for the earthing arrangement, the DNO (Distribution Network Operator) should be queried because the supply earth may be defective.',
  'Elec-Mate records Ze at the origin on the EICR, validates it against expected values for the declared earthing arrangement, and uses it to cross-check every Zs reading in the schedule of test results.',
];

const faqs = [
  {
    question: 'What is a normal Ze reading for a TN-C-S (PME) supply?',
    answer:
      'For a TN-C-S (PME) supply, the maximum assumed Ze in BS 7671 is 0.35 ohms. In practice, typical measured values range from 0.10 to 0.35 ohms. Most modern PME installations in urban areas measure between 0.15 and 0.25 ohms. A reading at the lower end (0.10 to 0.15 ohms) indicates a short distance to the supply transformer with good connections. A reading approaching or at 0.35 ohms is at the upper limit but still acceptable. If the reading exceeds 0.35 ohms, the supply earth may be compromised — possibly due to a poor neutral connection in the supply cable or a fault on the DNO network. Query the DNO if Ze exceeds the maximum assumed value.',
  },
  {
    question: 'Why is TN-S Ze typically higher than TN-C-S?',
    answer:
      'In a TN-C-S (PME) system, the earth return path uses the combined neutral and earth conductor (PEN conductor) of the supply cable. This is a large-cross-section conductor specifically designed to carry both neutral current and earth fault current — it has very low impedance. In a TN-S system, the earth return path uses the metallic sheath or armour of the supply cable. This sheath was primarily designed as mechanical protection, not as an electrical conductor, and has a higher impedance than a dedicated PEN conductor. The sheath is also subject to corrosion at joints over time, which can further increase its impedance. This is why TN-S systems have a higher maximum assumed Ze (0.80 ohms) compared to TN-C-S (0.35 ohms).',
  },
  {
    question: 'Can I measure Ze without disconnecting the main earthing conductor?',
    answer:
      'The standard procedure for measuring Ze requires temporarily disconnecting the main earthing conductor from the main earthing terminal (MET) to isolate the installation earth from the supply earth. This ensures you measure only the external loop, not the external loop in parallel with the installation earth paths. However, disconnecting the earthing conductor leaves the entire installation without an earth connection — which is a safety risk, even briefly. An alternative method is to measure the loop impedance at the origin with the earthing conductor connected (which gives a reading close to Ze but slightly lower due to parallel earth paths through gas and water bonds), then verify the result. Some electricians use this approach and record it as "Ze measured with bonds connected" on the certificate. The IET Guidance Note 3 recommends the disconnection method for accuracy.',
  },
  {
    question: 'What does a very low Ze indicate?',
    answer:
      'A very low Ze reading (for example, 0.05 ohms on a TN-C-S supply) typically indicates that the supply transformer is very close to the installation, or that the supply cable has a very large cross-sectional area. In urban areas with underground substations serving a small number of properties, Ze values below 0.10 ohms are not unusual. A very low Ze is not a problem — in fact, it is beneficial because it provides more headroom for R1+R2 within the Zs budget, making it easier for all circuits to achieve compliant loop impedance values. However, an extremely low Ze also means higher prospective fault current (PFC) at the origin, which must be checked to ensure it does not exceed the breaking capacity of the protective devices in the consumer unit.',
  },
  {
    question: 'How does Ze affect the prospective fault current (PFC)?',
    answer:
      "Ze and PFC are directly related through Ohm's law. The prospective fault current at the origin of the installation is calculated as the supply voltage divided by the supply impedance. For a single-phase supply at 230V, PFC = 230 / Ze (approximately, ignoring the small contribution of the internal wiring to the main switch). A lower Ze means a higher PFC: at Ze = 0.10 ohms, PFC is approximately 2,300A. At Ze = 0.80 ohms, PFC is approximately 288A. The PFC must not exceed the rated breaking capacity of the protective devices — typically 6kA or 10kA for domestic MCBs and RCBOs. In practice, even at very low Ze values, the PFC in domestic installations is well within the breaking capacity of modern devices. PFC must be measured and recorded on the EICR at the origin of the installation.",
  },
  {
    question: 'Is the Ze value recorded on the EICR?',
    answer:
      'Yes. Ze is a mandatory recording on the EICR (Electrical Installation Condition Report). It is recorded in the "Supply Characteristics and Earthing Arrangements" section, along with the earthing arrangement (TN-S, TN-C-S, or TT), the supply voltage, the prospective fault current, and the type of supply (single-phase or three-phase). The measured Ze value is used as a reference point for verifying the Zs readings throughout the installation — each Zs should approximately equal Ze plus the R1+R2 measured during continuity testing on that circuit. A significant discrepancy between the measured Zs and the calculated Zs (Ze + R1+R2) indicates a problem such as a parallel earth path or a high-resistance connection.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description:
      'Complete guide to Zs — what it is, how to measure it, and how Ze contributes to the total.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/maximum-zs-values-bs-7671',
    title: 'Maximum Zs Values BS 7671',
    description:
      'Table 41.3 and 41.4 maximum Zs values by protective device — Ze determines how much R1+R2 headroom you have.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description:
      'TT systems with high Ze rely on RCDs for fault protection — understand which type to specify.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/mcb-types-b-c-d-explained',
    title: 'MCB Types B, C and D',
    description:
      'MCB type determines maximum Zs — with a high Ze, you may need to use Type B for maximum headroom.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Record Ze, Zs, and PFC digitally with automatic cross-referencing and BS 7671 validation.',
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
    id: 'what-is-ze',
    heading: 'What Is Ze (External Earth Fault Loop Impedance)?',
    content: (
      <>
        <p>
          Ze stands for external earth fault loop impedance. It is the impedance of the earth fault
          loop path that is external to the electrical installation — the part you, as the
          electrician, cannot modify. It represents the impedance of the supply system from the
          transformer to the origin of the installation and back.
        </p>
        <p>
          Ze comprises three main components: the impedance of the supply transformer winding, the
          impedance of the line conductor from the transformer to the installation, and the
          impedance of the earth return path from the installation back to the transformer. The
          earth return path is what varies most between earthing arrangements — and this is why Ze
          differs significantly between TN-S, TN-C-S, and TT systems.
        </p>
        <p>
          The importance of Ze is straightforward: it sets the baseline for every{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
            Zs measurement
          </SEOInternalLink>{' '}
          in the installation. Since Zs = Ze + (R1+R2), a high Ze means less headroom for the
          circuit's own impedance (R1+R2) within the{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum permitted Zs
          </SEOInternalLink>
          . If Ze is unusually high, it can push every circuit in the installation towards or beyond
          the maximum, causing widespread compliance failures.
        </p>
      </>
    ),
  },
  {
    id: 'tns-ze',
    heading: 'TN-S Systems — Expected Ze: 0.80 Ohms Maximum',
    content: (
      <>
        <p>
          A TN-S (terre neutre separate) earthing arrangement provides a separate earth conductor
          from the supply transformer to the installation. In practice, this earth return path is
          the metallic sheath or armour of the supply cable — typically lead sheath on older cables
          or steel wire armour on newer ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="flex items-start gap-3">
            <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">TN-S Ze Characteristics</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>
                  <strong>Maximum assumed value (BS 7671):</strong> 0.80 ohms
                </li>
                <li>
                  <strong>Typical measured range:</strong> 0.20 to 0.80 ohms
                </li>
                <li>
                  <strong>Common in:</strong> Older properties (pre-1970s), properties with
                  underground lead-sheathed supply cables
                </li>
                <li>
                  <strong>Earth terminal location:</strong> Separate earth terminal at the supply
                  cutout, connected to the cable sheath
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          TN-S systems tend to have higher Ze values than TN-C-S because the cable sheath has a
          smaller effective cross-sectional area and higher resistance than a dedicated PEN
          conductor. Older installations with ageing lead-sheathed cables can have Ze values
          approaching or exceeding 0.80 ohms, especially if there are corroded joints in the cable
          sheath. If Ze exceeds 0.80 ohms on a TN-S supply, the cable sheath may have deteriorated
          and the DNO should be queried.
        </p>
        <p>
          With a Ze of 0.60 to 0.80 ohms, the available R1+R2 headroom for a B32 circuit (maximum
          corrected Zs of 1.10 ohms) is only 0.30 to 0.50 ohms. This limits the permissible cable
          length and may require larger conductor sizes than would be needed on a lower-Ze supply.
          Always check Ze first when testing an older TN-S installation — if it is high, expect some
          circuits to fail Zs testing.
        </p>
      </>
    ),
  },
  {
    id: 'tncs-ze',
    heading: 'TN-C-S (PME) Systems — Expected Ze: 0.35 Ohms Maximum',
    content: (
      <>
        <p>
          A TN-C-S (terre neutre combined-separate) system, commonly called PME (Protective Multiple
          Earthing), is the most common earthing arrangement for modern domestic installations in
          the UK. The earth return path is via the combined neutral and earth (PEN) conductor in the
          supply cable. The PEN conductor is earthed at multiple points along the DNO network and at
          the supply transformer.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">TN-C-S (PME) Ze Characteristics</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>
                  <strong>Maximum assumed value (BS 7671):</strong> 0.35 ohms
                </li>
                <li>
                  <strong>Typical measured range:</strong> 0.10 to 0.35 ohms
                </li>
                <li>
                  <strong>Common in:</strong> Modern domestic installations (post-1970s), most new
                  builds and housing estates
                </li>
                <li>
                  <strong>Earth terminal location:</strong> Earth terminal at the supply cutout,
                  provided by the DNO as part of the PME arrangement
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          The low Ze of a PME supply provides excellent headroom for Zs compliance. With a typical
          Ze of 0.20 ohms, a B32 circuit has 0.90 ohms of R1+R2 headroom (corrected maximum Zs of
          1.10 ohms minus Ze of 0.20). This allows comfortably long cable runs even with smaller
          conductor sizes.
        </p>
        <p>
          However, PME systems have a specific limitation: if the PEN conductor is lost (for
          example, due to a DNO cable fault), the installation's earth potential can rise to a
          dangerous level. This is why BS 7671 imposes restrictions on bonding, extraneous
          conductive parts, and the use of PME earthing in certain locations (bathrooms in caravan
          parks, marinas, construction sites). These restrictions are separate from the Ze value
          itself but are important considerations when assessing a PME installation.
        </p>
      </>
    ),
  },
  {
    id: 'tt-ze',
    heading: 'TT Systems — Expected Ze: 21 Ohms Maximum',
    content: (
      <>
        <p>
          A TT (terre terre) earthing arrangement has no metallic earth connection between the
          installation and the supply transformer. Instead, the installation has its own earth
          electrode (typically a driven rod, plate, or tape buried in the ground), and the earth
          fault current returns to the supply transformer via the general mass of earth. The
          transformer has its own separate earth electrode.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <CircuitBoard className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">TT Ze Characteristics</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>
                  <strong>Maximum assumed value (BS 7671):</strong> 21 ohms
                </li>
                <li>
                  <strong>Typical measured range:</strong> 10 to 200+ ohms (highly variable)
                </li>
                <li>
                  <strong>Common in:</strong> Rural properties, farms, outbuildings, properties
                  where the DNO does not provide an earth
                </li>
                <li>
                  <strong>Earth terminal location:</strong> Connected to the installation's own
                  earth electrode (rod, plate, or tape)
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          The very high Ze of a TT system means that the fault current during an earth fault is far
          too low to trip an MCB within the required disconnection time. For example, with a Ze of
          50 ohms, the fault current at 230V is only 4.6A — not enough to trip even a 6A Type B MCB
          within 0.4 seconds. This is why TT systems absolutely require{' '}
          <SEOInternalLink href="/guides/rcd-types-explained">RCD protection</SEOInternalLink> on
          all circuits. The RCD trips on the residual current (30mA) rather than the fault current
          magnitude, bypassing the Zs limitation.
        </p>
        <p>
          For TT systems, BS 7671 Regulation 411.5.3 requires that the product of the earth
          electrode resistance (RA) and the RCD operating current (I delta n) does not exceed 50V.
          For a 30mA RCD: RA must not exceed 50 / 0.030 = 1667 ohms. This is easily achieved with
          any reasonable earth electrode. However, the lower the electrode resistance, the better —
          aim for below 200 ohms as a practical target.
        </p>
        <SEOAppBridge
          title="Ze validation against earthing arrangement"
          description="Elec-Mate validates your measured Ze against the expected maximum for the declared earthing arrangement (TN-S, TN-C-S, or TT). If Ze exceeds the maximum, the app flags it immediately. Combined with 50+ calculators and voice test entry, you complete the EICR faster and more accurately."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'measuring-ze',
    heading: 'How to Measure Ze at the Origin',
    content: (
      <>
        <p>
          Ze is measured at the origin of the installation — typically at the consumer unit or main
          distribution board. The procedure is a live test and requires care.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Ensure the installation is safe to work on.</strong> Complete a visual
              inspection and all dead tests before performing live tests. Confirm the supply voltage
              is within normal limits (216V to 253V).
            </li>
            <li>
              <strong>
                Disconnect the main earthing conductor from the main earthing terminal (MET).
              </strong>{' '}
              This isolates the installation earth from the supply earth, ensuring you measure only
              the external loop. While disconnected, the entire installation has no earth connection
              — this must be done as quickly as possible.
            </li>
            <li>
              <strong>Set your multifunction tester to loop impedance (Ze) mode.</strong> Connect
              the test leads between the incoming line terminal and the disconnected end of the
              earthing conductor at the MET.
            </li>
            <li>
              <strong>Press the test button and record the reading.</strong> The instrument displays
              the external earth fault loop impedance in ohms.
            </li>
            <li>
              <strong>Reconnect the main earthing conductor to the MET immediately.</strong> Verify
              the connection is tight and secure.
            </li>
            <li>
              <strong>Compare the reading against the expected maximum</strong> for the earthing
              arrangement: 0.35 ohms for TN-C-S, 0.80 ohms for TN-S, 21 ohms for TT.
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Safety Warning</h4>
              <p className="text-white text-sm leading-relaxed">
                While the main earthing conductor is disconnected, every exposed metallic part in
                the installation is unearthed. If a fault develops during this period, there is no
                earth path and no automatic disconnection. Minimise the disconnection time. Ensure
                no one uses the installation during the measurement. Some electricians prefer to
                leave all circuit MCBs off during Ze measurement to reduce the risk.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Voice entry for Ze and all test results"
          description="Speak your Ze reading — 'Ze, 0.24 ohms' — and Elec-Mate records it on the EICR. Continue speaking Zs, R1+R2, insulation resistance, and RCD trip times as you test. The app validates everything against BS 7671 in real time. No clipboards, no double-handling."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'what-affects-ze',
    heading: 'What Affects Ze',
    content: (
      <>
        <p>
          Ze is determined by factors that are entirely outside the electrician's control — they are
          characteristics of the supply network. Understanding what affects Ze helps explain why
          readings vary between installations and why some properties consistently have higher
          values.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distance from the supply transformer.</strong> The further the property is
                from the nearest substation, the longer the supply cable, and the higher the line
                conductor resistance — increasing Ze. Rural properties at the end of long supply
                runs typically have higher Ze values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply cable cross-sectional area.</strong> Larger cables have lower
                resistance per metre. Properties served by older, smaller-gauge supply cables will
                have higher Ze values than those with modern, larger-gauge cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition of the cable sheath (TN-S).</strong> Corroded or damaged joints in
                the cable sheath increase the earth return path impedance. Old lead-sheathed cables
                with deteriorating joints are a common cause of high Ze on TN-S supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quality of PEN conductor connections (TN-C-S).</strong> Loose or corroded
                connections at joints in the PEN conductor can increase Ze. However, because the PEN
                conductor is also the neutral return path, a poor connection would likely also cause
                voltage fluctuation complaints, prompting the DNO to investigate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soil conditions (TT).</strong> For TT systems, Ze is dominated by the earth
                electrode resistance, which depends on soil type, moisture content, temperature, and
                electrode depth. Sandy or rocky soil gives high resistance; clay or loam gives lower
                resistance. Ze on TT systems can vary by an order of magnitude depending on these
                factors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Because Ze is outside the electrician's control, it must be measured and accepted as a
          given. The installation design must work within the Ze constraints — selecting appropriate{' '}
          <SEOInternalLink href="/guides/mcb-types-b-c-d-explained">MCB types</SEOInternalLink>,
          cable sizes, and circuit lengths to achieve compliant Zs values on every circuit.
        </p>
      </>
    ),
  },
  {
    id: 'high-ze',
    heading: 'When Ze Is Higher Than Expected',
    content: (
      <>
        <p>
          If your measured Ze exceeds the maximum assumed value for the earthing arrangement, it is
          a significant finding that requires action. A Ze above the expected maximum means the
          supply earth may be compromised, and every circuit in the installation is affected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify the measurement.</strong> Retest to confirm the reading. Check that
                the test leads are in good condition and the connections are clean and tight. Null
                the test leads before measuring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the earthing arrangement.</strong> Confirm the earthing type. It is
                possible that the installation has been incorrectly recorded as TN-C-S when it is
                actually TN-S, or vice versa. Inspect the supply cutout and earthing terminal to
                verify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the earthing conductor connections.</strong> A loose or corroded
                connection between the earthing terminal and the MET will add resistance to the Ze
                measurement. Inspect and remake connections if necessary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the finding on the EICR.</strong> If Ze remains above the expected
                maximum after verification, record it as an observation. The code depends on the
                severity: C2 (Potentially Dangerous) if the high Ze causes Zs to exceed maximum
                values on circuits without RCD protection, or C3 (Improvement Recommended) with a
                note to query the DNO.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A high Ze on a TN-S installation is particularly concerning because it may indicate that
          the cable sheath is deteriorating. In the worst case, the earth path could become
          completely open, leaving the installation with no effective earth connection. This is a C1
          (Danger Present) defect if discovered.
        </p>
      </>
    ),
  },
  {
    id: 'querying-the-dno',
    heading: 'When to Query the DNO',
    content: (
      <>
        <p>
          The Distribution Network Operator (DNO) owns and maintains the supply cable, including the
          earth terminal. If you measure a Ze that exceeds the expected maximum for the earthing
          arrangement, or if you observe visible damage or deterioration to the supply earthing, you
          should query the DNO.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">When to Contact the DNO</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ze exceeds the maximum assumed value</strong> — for the declared earthing
                arrangement (above 0.35 ohms for TN-C-S, above 0.80 ohms for TN-S).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visible damage to the supply earth terminal</strong> — corroded earthing
                clamp, damaged cable sheath at the cutout, or signs of overheating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No earth terminal at the cutout</strong> — the property may need the DNO to
                provide a PME earth connection, or the installation may need a TT arrangement with
                an earth electrode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suspected loss of PEN conductor</strong> — on a PME supply, symptoms include
                voltage fluctuations between line and neutral, high voltage on the earthing
                conductor, and unexplained tripping. This is an emergency — the DNO should be
                contacted immediately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The UK DNOs have different names depending on the region: UK Power Networks (UKPN) in
          London and the South East, Western Power Distribution (now part of National Grid) in the
          South West and Midlands, Northern Powergrid in the North East, SP Energy Networks in
          Central and Southern Scotland, and Scottish and Southern Electricity Networks (SSEN) in
          the North of Scotland and South of England. Contact details are on the electricity meter
          or on the DNO's website.
        </p>
        <p>
          Record the DNO query on the{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink> under
          "Observations" with a note of the measured Ze value and the action taken.
        </p>
        <SEOAppBridge
          title="Record Ze, PFC, and all supply characteristics digitally"
          description="Elec-Mate captures the full supply characteristics section of the EICR — earthing arrangement, Ze, PFC, supply voltage, and supply type — with automatic validation against BS 7671 expected values. AI agents help with observation coding when Ze is out of range. 50+ calculators for every test."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ZeValuesUKPage() {
  return (
    <GuideTemplate
      title="Ze Values UK | External Earth Loop Impedance"
      description="Complete guide to expected Ze (external earth fault loop impedance) values for UK electricians. TN-S maximum 0.80 ohms, TN-C-S (PME) maximum 0.35 ohms, TT maximum 21 ohms. How to measure Ze, what affects it, what to do when Ze is too high, and when to query the DNO."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CircuitBoard}
      heroTitle={
        <>
          Ze Values UK:{' '}
          <span className="text-yellow-400">External Earth Loop Impedance by Earthing Type</span>
        </>
      }
      heroSubtitle="Ze is the starting point for every Zs reading in the installation. TN-S: 0.80 ohms maximum. TN-C-S (PME): 0.35 ohms maximum. TT: 21 ohms maximum. This guide explains what Ze is, how to measure it, what affects it, and what to do when the reading exceeds the expected maximum."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Ze Values"
      relatedPages={relatedPages}
      ctaHeading="Validate Ze and Every Test Result Automatically"
      ctaSubheading="Elec-Mate validates Ze against expected values, cross-checks Zs with Ze + R1+R2, and flags any discrepancies. Voice test entry records readings hands-free. 50+ calculators built in. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
