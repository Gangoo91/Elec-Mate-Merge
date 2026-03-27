import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
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
  { label: 'Earthing System Fault Finding', href: '/guides/earthing-system-fault-finding' },
];

const tocItems = [
  { id: 'overview', label: 'Earthing System Basics' },
  { id: 'open-earth', label: 'Open Circuit Earth' },
  { id: 'poor-main-earth', label: 'Poor Main Earth Connection' },
  { id: 'corroded-electrode', label: 'Corroded Earth Electrode' },
  { id: 'electrode-resistance', label: 'Measuring Earth Electrode Resistance (BS 7430)' },
  { id: 'pme-lost-neutral', label: 'PME Supply Issues — Lost Neutral Dangers' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The earthing system comprises the main earthing terminal (MET), the earthing conductor connecting the MET to the earth electrode or PME terminal, the earth electrode (on TT installations), and the main protective bonding conductors to metallic services.',
  'An open circuit earth conductor leaves the installation without effective protection — any fault to exposed metalwork creates a shock hazard and the protective device may not operate within the required disconnection time.',
  'Earth electrode resistance can be measured using the three-electrode fall-of-potential method (BS 7430) or using a dedicated earth loop tester. The maximum electrode resistance for a TT installation depends on the RCD trip current: R × I_Δn ≤ 50V (typically 1667Ω for a 30mA RCD).',
  'On PME (TN-C-S) supplies, the protective earth and neutral are combined in the distributor\'s network. If the combined PEN conductor breaks upstream, the voltage on the PME earth terminal and all bonded metalwork in the premises can rise to a dangerous level — potentially approaching phase voltage (230V). This is known as a lost neutral event.',
  'BS 7430 (Code of practice for protective earthing of electrical installations) is the UK standard governing the design and testing of earthing systems. It specifies measurement methods for earth electrode resistance and requirements for buried electrode installations.',
];

const faqs = [
  {
    question: 'How do I test for an open circuit earth in an installation?',
    answer:
      'An open circuit earth can occur in the earthing conductor (between the MET and the earth electrode or PME terminal), in the main bonding conductors (between the MET and bonded services), or in a circuit protective conductor (between the consumer unit and an accessory). To test for open circuit earth in the earthing conductor: carry out a continuity test between the MET and a known-good external earth reference (such as an electrode driven into the ground at a different location from the installation electrode). A reading of infinity or very high resistance indicates an open circuit. For main bonding conductors: continuity test between the MET and the bonded service (gas meter, water pipe, structural steel). For circuit CPCs: continuity test between the MET and the earth terminal at each accessory on the circuit.',
  },
  {
    question: 'What is the maximum acceptable earth electrode resistance?',
    answer:
      'For a TT installation protected by an RCD, the maximum permissible earth electrode resistance is determined by the formula: Ra × IΔn ≤ 50V, where Ra is the electrode resistance and IΔn is the rated residual operating current of the RCD in amperes. For a 30mA (0.03A) RCD, the maximum Ra is 50 ÷ 0.03 = 1667Ω. For a 100mA RCD, the maximum Ra is 500Ω. In practice, a lower electrode resistance is better — target below 200Ω for a TT installation with a 30mA RCD to provide adequate margin. For earthing systems where the electrode provides the main fault current return path (such as some agricultural or caravan park installations), much lower electrode resistances (below 20Ω) are required. BS 7430 provides detailed guidance on electrode resistance requirements for different applications.',
  },
  {
    question: 'How does the three-electrode fall-of-potential method work?',
    answer:
      'The fall-of-potential method (also called the three-electrode method) is the standard technique for measuring earth electrode resistance specified in BS 7430. It uses three connections: the electrode under test (E), a current electrode (C) driven into the ground at a distance of approximately 10 times the electrode length from the test electrode (for a typical 1.2m earth rod, approximately 12m away), and a potential electrode (P) driven into the ground at approximately 62% of the distance between E and C (at approximately 7.4m from E). The earth resistance tester injects a test current between E and C, and measures the voltage between E and P. The ratio V/I gives the electrode resistance. The 62% rule gives a reliable measurement for most electrode configurations. The measurement is repeated with P at 52% and 72% of EC distance to verify consistency — if the three readings are within 10% of each other, the result is reliable.',
  },
  {
    question: 'What signs indicate a corroded or failing earth electrode?',
    answer:
      'Signs of a corroded or failing earth electrode include: measured Ze (external earth fault loop impedance) significantly higher than expected for the supply type; earth fault loop impedance tests that fail the Appendix 3 table limits on circuits that previously passed; RCDs that take longer to trip (or fail to trip) under test; and visual signs of corrosion at the electrode clamp or connection where it emerges from the ground. On TT systems, a rising electrode resistance is often the first sign of electrode deterioration. Check the electrode connection clamp — this is frequently the weakest point. Stainless steel or copper-clad steel electrodes resist corrosion better than plain steel rods. In corrosive soils (high salt content, acid soils), electrode life is shorter and more frequent testing is required.',
  },
  {
    question: 'What is a PME (TN-C-S) supply and why is the lost neutral dangerous?',
    answer:
      'PME (Protective Multiple Earthing) is the most common supply arrangement in the UK. The distributor\'s network uses a combined Protective Earth and Neutral (PEN) conductor rather than separate PE and N conductors. At the intake point, the PEN is split into a separate PE and N — the PE connects to the main earthing terminal and the N connects to the neutral bar of the consumer unit. The safety of the PME earthing depends entirely on the integrity of the PEN conductor between the premises and the transformer. If the PEN conductor breaks (due to cable damage, a loose neutral joint in a feeder pillar, or a network fault), the protective earth terminal in the premises is no longer connected to the transformer neutral. Under load, the voltage on the PE terminal rises — potentially approaching the phase voltage of 230V. All metalwork bonded to the PE (gas pipes, water pipes, appliance chassis, structural steel) rises to this dangerous voltage. Anyone touching bonded metalwork while standing on a different earth potential (the true earth potential outside) risks a severe or fatal electric shock.',
  },
  {
    question: 'How is the main earthing terminal inspected and tested?',
    answer:
      'The main earthing terminal (MET) is the central connection point for the earthing system. It should be accessible for inspection and testing. On inspection: verify the MET label is present and correct; check all connections are tight and show no signs of corrosion or overheating; verify the earthing conductor is correctly sized for the supply (typically 16mm² or 25mm² for domestic PME supplies, depending on the supply conductor size per Table 54.7 of BS 7671); verify that all main protective bonding conductors are connected (gas, water, oil, other metallic services as applicable). On testing: measure continuity between the MET and each bonded service — resistance should typically be below 0.05Ω. Measure Ze at the MET to verify the external earth fault loop impedance and confirm the PME or TN-S earthing arrangement is intact.',
  },
  {
    question: 'When should I recommend upgrading from TT to PME earthing?',
    answer:
      'Recommending a change from TT to PME earthing is not straightforward because it requires the agreement and involvement of the distributor. TT installations are common in rural areas and properties remote from the distributor\'s PME network. TT earthing has inherent limitations — the electrode resistance can be high (particularly in dry or rocky soils), requiring RCD protection throughout the installation, and the electrode can deteriorate over time. However, PME earthing is not always superior — in some locations (particularly near rivers, in areas with significant metallic pipework, or where there is a history of neutral faults on the network), PME carries its own risks. The decision to upgrade from TT should be made in consultation with the distributor, and the new PME earthing arrangement must comply with BS 7671 and the distributor\'s network requirements.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earth-fault-loop-impedance-testing',
    title: 'Earth Fault Loop Impedance Testing',
    description: 'Ze vs Zs, testing procedure, and Appendix 3 table values.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding-methodology',
    title: 'Electrical Fault Finding Methodology',
    description: 'Systematic fault finding approach including safe isolation.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-electricians-guide',
    title: 'Continuity Testing Guide',
    description: 'CPC continuity, main bonding continuity, and R1+R2 measurement.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Record earthing system test results and coded observations on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/partial-power-loss-fault-finding',
    title: 'Partial Power Loss Fault Finding',
    description: 'Including open circuit neutral and PME lost neutral dangers.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'C&G 2391 training covering earthing systems and testing methods.',
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
    heading: 'Earthing System Basics',
    content: (
      <>
        <p>
          The earthing system of an electrical installation provides the return path for fault
          current in the event of a live-to-earth fault, ensuring that the fault current is
          sufficient to operate the protective device within the required time. Without an effective
          earthing system, fault current may be too low to trip the MCB or fuse, exposed metalwork
          remains at a dangerous voltage, and electric shock risk is not adequately controlled.
        </p>
        <p>
          The earthing system comprises several interconnected components:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Earth electrode</strong> — a buried conductor (typically a copper-clad steel rod) that makes electrical contact with the general mass of earth. Required on TT installations; not used as the primary earth on PME (TN-C-S) supplies.</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Earthing conductor</strong> — connects the main earthing terminal to the earth electrode (TT) or to the PME terminal provided by the distributor (TN-C-S).</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Main earthing terminal (MET)</strong> — the central connection point in the installation to which all protective conductors, bonding conductors, and the earthing conductor connect.</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Main protective bonding conductors</strong> — connect metallic services entering the building (gas, water, oil pipes) to the MET.</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Circuit protective conductors (CPCs)</strong> — run with each circuit and connect exposed metalwork of equipment and accessories back to the MET.</span>
            </li>
          </ul>
        </div>
        <p>
          Faults in any part of this system can compromise the protection of the entire installation.
          Earthing system fault finding requires a systematic check of each component, from the
          electrode through the earthing conductor to the MET and then throughout the circuit CPCs.
        </p>
      </>
    ),
  },
  {
    id: 'open-earth',
    heading: 'Open Circuit Earth — Detecting a Broken Earthing Conductor',
    content: (
      <>
        <p>
          An open circuit in the earthing conductor (between the MET and the earth electrode or PME
          terminal) is one of the most serious faults an electrician can find on a periodic
          inspection. If the earthing conductor is broken, the entire installation may have no
          effective earth connection — depending on the supply arrangement.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>On a TN-C-S (PME) supply</strong> — the PME earthing depends on the
                distributor's combined PEN conductor. If the internal earthing conductor is broken
                but the external PEN is intact, the installation may still have some earth
                connection via residual paths (bonded metalwork in contact with external metalwork).
                However, this is not reliable and the fault must be repaired immediately. Coded C1
                on an EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>On a TT supply</strong> — if the earthing conductor to the electrode is
                broken, the installation has no earth connection at all. All fault protection relies
                on the integrity of a conductor that is broken. This is an immediate danger (C1)
                requiring the installation to be taken out of service or the fault repaired before
                re-energising.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To detect an open circuit earthing conductor: measure{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-testing">
            Ze at the origin
          </SEOInternalLink>{' '}
          — if Ze is very high (or the tester shows an error indicating no earth path), the earthing
          conductor or external PME/TT earth is compromised. Follow up with continuity testing
          between the MET and the electrode rod connection.
        </p>
        <SEOAppBridge
          title="Record earthing system findings on your phone"
          description="Elec-Mate's EICR app captures earthing system test results, Ze values, and electrode resistance measurements, and generates coded observations for any deficiencies found."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'poor-main-earth',
    heading: 'Poor Main Earth Connection',
    content: (
      <>
        <p>
          Even without an open circuit, a high-resistance connection at any point in the earthing
          system raises the measured Ze and can cause circuits to exceed their Appendix 3 maximum
          Zs. Common locations for poor connections are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MET connections</strong> — corroded or loose connections at the main
                earthing terminal. Inspect and retighten all connections. Clean any corrosion with
                emery cloth before reassembling. Check that the earthing conductor is correctly
                terminated (lugged or effectively crimped — not just wrapped around a terminal bolt).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrode rod connection clamp</strong> — the brass or stainless steel
                clamp connecting the earthing conductor to the electrode rod can corrode,
                particularly in damp soil. Inspect the clamp and re-make the connection if
                necessary. Use corrosion-resistant compound (such as Denso paste) around the
                connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME terminal connection</strong> — the connection at the distributor's
                cut-out (the sealed fuse unit) includes a PME earthing terminal. The earthing
                conductor from the MET connects here. This connection can loosen over time. Note
                that the cut-out itself is the distributor's property — if the PME terminal appears
                damaged or loose, contact the distributor, do not work inside the sealed cut-out.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'corroded-electrode',
    heading: 'Corroded Earth Electrode',
    content: (
      <>
        <p>
          On TT installations, the earth electrode is the sole earth connection for the installation.
          Electrode corrosion progressively increases its resistance, eventually exceeding the
          maximum permissible value for the RCD protection to operate within the required time.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Signs of Corrosion</h3>
            <p className="text-white text-sm leading-relaxed">
              Visual signs at the electrode connection point (where it emerges from the ground):
              green or white oxide deposits on copper conductors; rust and pitting on steel rods;
              loose or detached connection clamp; conductor insulation that has degraded at the
              soil interface. Measured sign: electrode resistance significantly higher than previous
              test results (tracked on EICR records).
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Remediation</h3>
            <p className="text-white text-sm leading-relaxed">
              A corroded electrode that has high resistance should be supplemented or replaced.
              Drive a new electrode adjacent to the existing one and connect them in parallel —
              parallel electrodes reduce total resistance. Alternatively, if the existing electrode
              has only surface corrosion, excavate, clean, apply corrosion protection, and check the
              connection. Deep-driven copper-clad steel rods resist corrosion better than surface
              rods.
            </p>
          </div>
        </div>
        <p>
          The electrode resistance must be re-measured after any remediation to confirm it now meets
          the BS 7430 and BS 7671 requirements for the installation. Record the before and after
          values on the EICR.
        </p>
      </>
    ),
  },
  {
    id: 'electrode-resistance',
    heading: 'Measuring Earth Electrode Resistance — BS 7430 Methods',
    content: (
      <>
        <p>
          BS 7430 (Code of practice for protective earthing of electrical installations) specifies
          the test methods for measuring earth electrode resistance. The primary method is the
          three-electrode fall-of-potential method:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">1</span>
              <span>
                <strong>Disconnect the electrode</strong> from the installation (disconnect the
                earthing conductor at the MET). This ensures you are measuring only the electrode
                resistance, not a parallel path via the installation earthing system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">2</span>
              <span>
                <strong>Drive a current electrode (C)</strong> approximately 30m from the test
                electrode in the direction of the supply cable (away from the building). For a
                1.2m rod, 30m is a typical distance to ensure the resistance areas do not overlap.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">3</span>
              <span>
                <strong>Drive a potential electrode (P)</strong> at 62% of the C distance from the
                test electrode — approximately 18 to 19m from the test electrode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">4</span>
              <span>
                <strong>Connect the earth resistance tester</strong> and take the reading. Repeat
                with P at 52% and 72% of EC distance. If the three readings are within 10% of each
                other, the middle reading (62%) is the electrode resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">5</span>
              <span>
                <strong>Reconnect the earthing conductor</strong> and verify Ze at the installation
                origin. A high Ze relative to the measured electrode resistance indicates a poor
                connection in the earthing conductor.
              </span>
            </li>
          </ol>
        </div>
        <p>
          An alternative method available on many modern loop testers is the two-electrode method —
          measuring the loop impedance at the origin with the incoming supply disconnected and the
          electrode connected. This gives an approximation of electrode resistance but is less
          accurate than the three-electrode method.
        </p>
      </>
    ),
  },
  {
    id: 'pme-lost-neutral',
    heading: 'PME Supply Issues — The Lost Neutral Danger',
    content: (
      <>
        <p>
          The PME (Protective Multiple Earthing) arrangement is inherently safe when the
          distributor's PEN conductor is intact. However, if the PEN conductor breaks upstream of
          the premises — in the street cable, at a joint, or in a feeder pillar — the consequences
          are severe and occur without warning.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>What happens when PME neutral is lost</strong> — the protective earth
                terminal in the premises rises to a voltage determined by the load sharing between
                the remaining phases. In a severely unbalanced case, the PE terminal can rise to
                near phase voltage (230V). All bonded metalwork — gas pipes, water pipes, appliance
                bodies, structural steel — rises to this voltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why PME is prohibited in certain locations</strong> — BS 7671 prohibits the
                use of PME earthing for caravan parks, marina berths, and similar locations where
                users may be standing on true earth potential (outdoor ground) while touching
                metalwork connected to the PME earth. In these locations, a TT system or a separate
                TN-S earth is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to do if you suspect a lost neutral</strong> — if appliances across
                the premises are failing or behaving erratically, and if touching bonded metalwork
                gives a tingle or shock, suspect a lost neutral. Do not enter the premises — evacuate
                immediately and call the distributor's emergency number. Do not touch any metalwork.
                This is a network emergency.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Lost neutral protection devices (LNPDs) are available for PME premises at high risk —
          they monitor the PME voltage and disconnect the installation if the earth voltage rises
          above a safe threshold. These are used in marinas and some industrial premises as an
          additional safeguard.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Earthing System Checks on Every EICR',
    content: (
      <>
        <p>
          The earthing system should be checked systematically on every EICR, not only when a fault
          is suspected. Here is a practical checklist:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Measure Ze at the Origin Every Time</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ze is the single most informative test for the earthing system as a whole. A
                  Ze reading consistent with the supply type (below 0.35Ω for PME, below 0.8Ω for
                  TN-S) confirms the external earth path is intact. An unexpectedly high Ze triggers
                  further investigation of the earthing conductor and connections.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Test Main Bonding on Every EICR</h4>
                <p className="text-white text-sm leading-relaxed">
                  Main protective bonding conductors to gas and water services are frequently
                  missing, undersized, or disconnected — often as a result of plumbing work where
                  a section of metal pipe was replaced with plastic. Test continuity between the
                  MET and the gas/water service entry points. A reading above 0.05Ω warrants
                  investigation. Missing bonding is a C2 observation.
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

export default function EarthingSystemFaultFindingPage() {
  return (
    <GuideTemplate
      title="Earthing System Fault Finding | Earth Electrode, Open Circuit Earth, PME"
      description="Complete guide to earthing system fault finding for UK electricians. Covers open circuit earth, poor main earth connections, corroded earth electrodes, measuring electrode resistance (BS 7430 methods), and PME lost neutral dangers."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Earthing System Fault Finding:{' '}
          <span className="text-yellow-400">Open Circuit Earth, Electrode Resistance, and PME Dangers</span>
        </>
      }
      heroSubtitle="A complete guide to diagnosing earthing system faults for UK electricians. Covers open circuit earth, poor main earth connections, corroded earth electrodes, measuring electrode resistance using BS 7430 methods, and the dangers of a lost PME neutral."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earthing System Fault Finding"
      relatedPages={relatedPages}
      ctaHeading="Record Earthing System Test Results and Complete EICRs on Your Phone"
      ctaSubheading="Elec-Mate's EICR app captures Ze, electrode resistance, and bonding test results, and generates coded observations for any earthing deficiencies. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
