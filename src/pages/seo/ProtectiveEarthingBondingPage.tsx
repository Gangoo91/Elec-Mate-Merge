import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Brain,
  Shield,
  Zap,
  Calculator,
  Search,
  Link2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Earthing & Bonding', href: '/guides/protective-earthing-bonding' },
];

const tocItems = [
  { id: 'why-earthing-matters', label: 'Why Earthing Matters' },
  { id: 'earthing-arrangements', label: 'Earthing Arrangements' },
  { id: 'main-earthing-terminal', label: 'Main Earthing Terminal' },
  { id: 'main-bonding', label: 'Main Protective Bonding' },
  { id: 'bonding-conductor-sizes', label: 'Bonding Conductor Sizes' },
  { id: 'extraneous-conductive-parts', label: 'Extraneous-Conductive-Parts' },
  { id: 'circuit-protective-conductors', label: 'Circuit Protective Conductors' },
  { id: 'testing-earthing', label: 'Testing Earthing and Bonding' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Protective earthing connects all exposed-conductive-parts to the main earthing terminal, ensuring that fault current can flow and protective devices can operate within the required disconnection time.',
  'Main protective bonding conductors connect extraneous-conductive-parts (water pipes, gas pipes, oil pipes, structural steelwork) to the main earthing terminal — typically 10 mm or 6 mm copper depending on the supply.',
  'The main earthing terminal is the central connection point where all earthing and bonding conductors meet — it must be accessible and labelled with a permanent BS 951 safety label.',
  'Regulation 411.3.1.1 requires disconnection within 0.4 seconds for socket outlet circuits and 5 seconds for fixed equipment circuits in TN systems — earthing must be adequate to achieve these times.',
  'Elec-Mate includes calculators for earth fault loop impedance, protective conductor sizing, and bonding requirements to help electricians verify compliance on site.',
];

const faqs = [
  {
    question: 'What is the difference between earthing and bonding?',
    answer:
      'Earthing and bonding serve related but different purposes. Earthing connects exposed-conductive-parts (the metal casings of electrical equipment such as consumer units, light fittings, and socket faceplates) to the general mass of earth via the main earthing terminal and the earthing conductor. The purpose is to provide a path for fault current to flow back to the supply transformer so that the protective device (MCB, RCD, or fuse) can disconnect the circuit quickly in the event of an earth fault. Bonding connects extraneous-conductive-parts (metallic services that are not part of the electrical installation but could introduce a potential from outside — such as water pipes, gas pipes, oil pipes, and structural steelwork) to the main earthing terminal. The purpose is to ensure that these metallic services are at the same potential as the earthing system, preventing a dangerous potential difference that could cause electric shock if a person touches both an earthed appliance and an unbonded pipe simultaneously. In summary: earthing protects against faults in the electrical installation; bonding equalises potentials between the electrical installation and other metallic services.',
  },
  {
    question: 'What size bonding conductor do I need?',
    answer:
      'The size of the main protective bonding conductor depends on the size of the supply neutral conductor. Under BS 7671 Table 54.8, for a supply with a copper neutral conductor up to 35 mm cross-section, the main bonding conductor must be at least 10 mm copper (or 16 mm aluminium). For a supply with a neutral conductor larger than 35 mm, the bonding conductor must be at least half the cross-section of the neutral, with a minimum of 6 mm copper. In practice, for a typical domestic installation with a single-phase 100A supply and 25 mm tails, a 10 mm copper bonding conductor is the standard requirement. For three-phase supplies or larger commercial installations, the bonding conductor size may need to increase. The bonding conductor must run in a continuous length from the main earthing terminal to the point of connection on the service pipe — it must not pass through any intermediate connection or junction box. Where the conductor is liable to mechanical damage, it must be protected with conduit, trunking, or mechanical protection.',
  },
  {
    question: 'Where should the main bonding connection be made on a water pipe?',
    answer:
      'The main bonding connection to a water pipe should be made as close as practicable to the point of entry of the pipe into the building — and on the consumer side of the stopcock and any meter. This ensures that the bonding is effective regardless of whether the meter or stopcock is removed for maintenance. The connection is typically made using a BS 951 bonding clamp (the green and yellow type with a permanent safety label). The clamp must make a reliable, gas-tight connection to the pipe. If the water supply includes a section of plastic pipe (which is increasingly common with modern installations using plastic service pipes), the bonding may not be required for that service if there is no metal pipe entering the building. However, if there are internal copper pipes (even if the service pipe is plastic), these pipes may need to be bonded if they are classed as extraneous-conductive-parts — this requires assessment of whether they introduce an earth potential from outside the equipotential zone. In practice, if in doubt, bond it. The cost of a bonding clamp and a short run of 10 mm cable is negligible compared to the risk of not bonding a service that should be bonded.',
  },
  {
    question: 'Do I need to bond the gas pipe?',
    answer:
      'Yes. Gas pipes are extraneous-conductive-parts and must be connected to the main earthing terminal via a main protective bonding conductor. The bonding connection should be made within 600 mm of the gas meter on the consumer side — this is a requirement set by the gas industry (IGEM/UP/7) as well as BS 7671. The bonding must be on the consumer side of the meter so that the bonding is not broken when the meter is removed or replaced. Use a BS 951 bonding clamp fitted to a clean section of pipe, with the permanent safety label attached. The bonding conductor runs from this clamp to the main earthing terminal in a continuous length. Do not remove or disconnect the gas bonding for any reason without providing alternative protective measures — removing the gas bonding from a live installation can create a dangerous situation where the gas pipe rises to the supply voltage in the event of a neutral fault (particularly in TN-C-S systems where the neutral carries the earth return current).',
  },
  {
    question: 'What is a TN-C-S supply and why does earthing matter more?',
    answer:
      'A TN-C-S (also called Protective Multiple Earthing or PME) supply is the most common earthing arrangement in the UK. In this system, the supply neutral conductor also serves as the earth return path — the combined neutral and earth conductor is called the PEN (Protective Earth and Neutral) conductor. At the consumer intake point, the PEN is split into separate neutral and earth connections. The advantage of TN-C-S is that it provides a reliable, low-impedance earth without needing a separate earth electrode at the property. However, there is a specific risk: if the PEN conductor breaks (an open PEN fault), the metalwork of the installation — and any bonded services — could rise to a dangerous voltage. This is why main bonding is so critical in TN-C-S systems. The bonding ensures that all metallic services are at the same potential, reducing the touch voltage in the event of an open PEN fault. BS 7671 and the Electricity Safety, Quality and Continuity Regulations (ESQCR) 2002 set specific requirements for TN-C-S earthing, including bonding conductor sizes and restrictions on using TN-C-S earthing for certain applications (such as caravans, petrol stations, and construction sites).',
  },
  {
    question: 'Can I use the water pipe as the sole means of earthing?',
    answer:
      'No. Under BS 7671, a metallic water pipe must not be used as the sole means of earthing. While water pipes were historically used as earth electrodes (the metal pipe in the ground provided a connection to earth), the increasing use of plastic service pipes and plastic pipe sections within the supply network means that the continuity of the metallic water pipe to earth can no longer be relied upon. The main earthing terminal must be connected to the supply earth (provided by the DNO for TN-S and TN-C-S systems) or to a dedicated earth electrode (for TT systems). The water pipe is bonded to the main earthing terminal as an extraneous-conductive-part — it is bonded, not used as the earth. If you encounter an older installation where the water pipe is the only earth connection (no supply earth from the DNO, no earth electrode), this is a serious defect. It should be recorded as a C1 (Danger Present) observation on the EICR, and arrangements should be made to provide a proper earth — either by requesting a supply earth from the DNO or by installing a TT earth electrode.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/supplementary-bonding',
    title: 'Supplementary Bonding Guide',
    description:
      'When supplementary bonding is required, bathroom bonding rules, and when it can be omitted.',
    icon: Link2,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT systems — how each earthing arrangement works and testing requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Earth Loop Impedance Calculator',
    description:
      'Calculate Zs values and verify disconnection times for any circuit configuration.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of the IET Wiring Regulations covering earthing, bonding, and protection.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description:
      'Step-by-step guide to completing every section of the EICR, including earthing and bonding checks.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with modules on earth fault loop impedance, continuity, and bonding tests.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-earthing-matters',
    heading: 'Why Protective Earthing and Bonding Matter',
    content: (
      <>
        <p>
          Protective earthing and bonding form the foundation of electrical safety in every
          installation. Without effective earthing, protective devices (MCBs, RCDs, fuses) cannot
          operate correctly in the event of an earth fault. Without bonding, dangerous voltage
          differences can develop between the electrical installation and metallic services such as
          water pipes, gas pipes, and structural steelwork.
        </p>
        <p>
          When an earth fault occurs — for example, a live conductor touches the metal casing of an
          appliance — fault current must flow through the protective conductor back to the supply
          transformer. This fault current must be high enough to trip the protective device within
          the required disconnection time (0.4 seconds for socket circuits, 5 seconds for fixed
          equipment in TN systems). If the earthing path has too much impedance (resistance), the
          fault current will be too low to trip the device quickly, and the metalwork will remain
          live — creating a risk of electric shock.
        </p>
        <p>
          Bonding complements earthing by ensuring that metallic services entering the building are
          at the same electrical potential as the earthing system. Without bonding, a person
          simultaneously touching an earthed appliance and an unbonded water pipe could experience
          an electric shock if there is any potential difference between them. Main protective
          bonding eliminates this risk by connecting all extraneous-conductive-parts to the main
          earthing terminal.
        </p>
        <p>
          These are not theoretical concerns.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          devotes Chapter 41 (Protection against electric shock) and Chapter 54 (Earthing
          arrangements and protective conductors) to these requirements, and earthing defects are
          among the most common C1 and C2 observations recorded on{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR reports
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'earthing-arrangements',
    heading: 'UK Earthing Arrangements: TN-S, TN-C-S, and TT',
    content: (
      <>
        <p>
          The earthing arrangement of an installation describes how the exposed-conductive-parts are
          connected to the general mass of earth. The three arrangements used in the UK are:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">TN-S — Separate Neutral and Earth</h4>
                <p className="text-white text-sm leading-relaxed">
                  The supply has a separate earth conductor (typically the lead sheath of the
                  underground supply cable). This provides a reliable, low-impedance earth path. The
                  earthing terminal at the consumer intake is connected to the cable sheath. TN-S is
                  common in older urban areas with lead-sheathed cables. External earth fault loop
                  impedance (Ze) is typically 0.35 to 0.8 ohms.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  TN-C-S — Combined Neutral and Earth (PME)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The most common arrangement in the UK. The supply uses a combined PEN (Protective
                  Earth and Neutral) conductor, which is separated into individual neutral and earth
                  connections at the consumer intake. This provides very low earth impedance (Ze
                  typically 0.2 to 0.35 ohms) but carries the risk of open PEN faults. Main bonding
                  is critical in TN-C-S systems to limit touch voltages in the event of a PEN
                  conductor failure.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">TT — Earth Electrode</h4>
                <p className="text-white text-sm leading-relaxed">
                  The installation has its own earth electrode (typically a driven rod or buried
                  plate) that provides the connection to earth. TT is used where the DNO does not
                  provide an earth terminal — common in rural areas with overhead supply lines. The
                  earth electrode resistance is typically much higher than a supply earth (often 20
                  to 200 ohms), so RCD protection is essential for fault disconnection in TT
                  systems. Ze is typically much higher and an RCD is the primary means of shock
                  protection.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Identifying the{' '}
          <SEOInternalLink href="/guides/earthing-arrangements-explained">
            earthing arrangement
          </SEOInternalLink>{' '}
          is one of the first steps in any inspection. It determines the expected earth fault loop
          impedance values, the bonding requirements, and the type of fault protection that should
          be in place. Record the earthing arrangement on the EICR and verify it by measuring Ze at
          the origin.
        </p>
      </>
    ),
  },
  {
    id: 'main-earthing-terminal',
    heading: 'The Main Earthing Terminal (MET)',
    content: (
      <>
        <p>
          The main earthing terminal (MET) is the central connection point for the earthing system.
          Every earthing conductor, bonding conductor, and circuit protective conductor ultimately
          connects back to the MET. It is the single point where the installation earthing system
          meets the supply earth or earth electrode.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location.</strong> The MET is normally located at or near the consumer unit,
                close to the incoming supply position. It must be accessible for inspection,
                testing, and maintenance — do not bury it behind plasterboard or conceal it in an
                inaccessible void.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connections.</strong> The MET receives the earthing conductor from the
                supply (or earth electrode), the main bonding conductors (water, gas, oil,
                structural steelwork), and the circuit protective conductors from all circuits. All
                connections must be secure, accessible, and made with appropriate terminals or
                connectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnecting means.</strong> Regulation 542.4.2 requires that the earthing
                conductor (the connection between the MET and the supply earth or earth electrode)
                can be disconnected for testing purposes. This is typically achieved with a
                removable link or a bolted connection that can be opened with a tool. The link
                allows the electrician to measure Ze (external earth fault loop impedance) by
                disconnecting the installation earth and testing the supply earth independently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labelling.</strong> The MET must bear a permanent safety label stating:
                "Safety Electrical Connection — Do Not Remove." This is a BS 951 requirement and
                ensures that anyone working near the MET understands that the connection is safety
                critical.
              </span>
            </li>
          </ul>
        </div>
        <p>
          During a periodic inspection, check the MET for security of connections, signs of
          corrosion or overheating, presence of the safety label, and accessibility. A corroded or
          loose MET connection is a common C2 (Potentially Dangerous) observation on{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR reports</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'main-bonding',
    heading: 'Main Protective Bonding Conductors',
    content: (
      <>
        <p>
          Main protective bonding conductors connect extraneous-conductive-parts to the main
          earthing terminal. Their purpose is to maintain equipotential bonding — ensuring that all
          metallic services in the building are at the same potential as the earthing system,
          eliminating dangerous touch voltages.
        </p>
        <p>
          Under BS 7671 Regulation 411.3.1.2 and Section 544, the following services must be bonded
          to the MET:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water service pipe.</strong> Bond as close as practicable to the point of
                entry into the building, on the consumer side of the stopcock and meter. Use a BS
                951 bonding clamp on a clean section of metallic pipe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas service pipe.</strong> Bond within 600 mm of the gas meter, on the
                consumer side. This is both a BS 7671 requirement and a gas industry requirement
                (IGEM/UP/7).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oil supply pipe.</strong> Where a property has an oil-fired heating system
                with a metallic oil supply pipe, this pipe must be bonded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structural steelwork.</strong> If the building has exposed structural
                steelwork that is accessible and could introduce an earth potential, it must be
                bonded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central heating system.</strong> Where the central heating system has
                metallic pipework that is accessible and could introduce a potential from outside
                the equipotential zone, it should be bonded. In practice, if the water service is
                bonded and the heating system connects to the bonded water supply, the heating is
                effectively bonded through that connection — but a separate bonding connection is
                often installed for belt-and-braces protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each bonding connection must be made with a BS 951 bonding clamp, fitted to a clean
          section of pipe, and bear a permanent safety label: "Safety Electrical Connection — Do Not
          Remove." The conductor must run in a continuous length from the MET to the bonding clamp —
          no intermediate joints.
        </p>
        <SEOAppBridge
          title="Verify bonding requirements with AI"
          description="Describe the installation to Elec-Mate's AI regulations assistant — supply type, services present, pipe materials — and get a clear answer on what needs bonding, conductor sizes, and clamp positions. No more guesswork."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'bonding-conductor-sizes',
    heading: 'Bonding Conductor Sizes: 10 mm vs 6 mm',
    content: (
      <>
        <p>
          The size of main protective bonding conductors is determined by BS 7671 Table 54.8. The
          key rule is:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10 mm copper</strong> — the standard requirement for most domestic
                installations. This applies where the supply neutral conductor is up to 35 mm
                cross-section (which covers virtually all single-phase domestic supplies with 16 mm
                or 25 mm tails).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6 mm copper</strong> — permitted where the supply is TN-S with a supply
                neutral of 16 mm or less, and the bonding conductor is mechanically protected. In
                practice, 6 mm is used in some older installations and smaller flats, but 10 mm is
                now the standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most domestic work, the answer is simple: <strong>use 10 mm copper</strong>. It is the
          default size for TN-C-S (PME) supplies, which account for the majority of UK domestic
          installations. Using 10 mm eliminates any doubt about compliance and provides a robust
          connection.
        </p>
        <p>
          The bonding conductor can be single-core green/yellow cable or twin-core with a
          green/yellow sheath. Where it is clipped to the surface, it should be run neatly and
          protected from mechanical damage. Where it passes through walls or floors, use grommets or
          suitable bushings to protect the cable. The conductor must not be reduced in size at any
          point along its length.
        </p>
        <p>
          For larger installations (three-phase supplies, commercial premises), refer to Table 54.8
          and calculate the bonding conductor size based on the supply neutral conductor size. The
          minimum is always 6 mm copper, and for TN-C-S systems with a supply neutral over 35 mm,
          the bonding conductor must be at least half the cross-section of the neutral.
        </p>
      </>
    ),
  },
  {
    id: 'extraneous-conductive-parts',
    heading: 'Identifying Extraneous-Conductive-Parts',
    content: (
      <>
        <p>
          One of the most debated topics in electrical inspection is: what constitutes an
          extraneous-conductive-part? Getting this right determines what needs bonding and what does
          not.
        </p>
        <p>
          BS 7671 defines an extraneous-conductive-part as: "A conductive part liable to introduce a
          potential, generally earth potential, and not forming part of the electrical
          installation." The key phrase is "liable to introduce a potential" — the part must be
          capable of conducting a voltage from outside the equipotential zone into the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Is an extraneous-conductive-part:</strong> Metallic water pipes entering the
                building from the mains supply, metallic gas pipes entering from the street, oil
                supply pipes from an external tank, structural steelwork connected to the ground,
                metallic ventilation ducting connected to external building fabric.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Is NOT an extraneous-conductive-part:</strong> Internal copper pipework
                connected only to a plastic cold water supply pipe (no metallic connection to earth
                outside the building), a metal kitchen sink (if only connected to plastic waste
                pipes), a metal bath (if only connected to plastic waste pipes and the water supply
                is plastic), metal window frames that are isolated from the building fabric.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical test is: can this metallic part introduce a potential from outside the
          equipotential zone? If the service pipe is plastic from the street to the house, the
          internal copper pipework is not connected to external earth and may not be an
          extraneous-conductive-part. However, this requires careful assessment — if there is any
          doubt, bond it. The cost is minimal and the safety benefit is significant.
        </p>
        <p>
          During an{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR inspection</SEOInternalLink>, you
          must assess whether all extraneous-conductive-parts are correctly bonded. Missing bonding
          on a gas or water pipe is a C2 (Potentially Dangerous) observation. Missing bonding on a
          service that is not actually an extraneous-conductive-part (for example, internal copper
          connected only to plastic mains) may be recorded as C3 or noted as not required — but you
          must document your reasoning.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-protective-conductors',
    heading: 'Circuit Protective Conductors (CPCs)',
    content: (
      <>
        <p>
          Every circuit in the installation has a circuit protective conductor (CPC) that connects
          the exposed-conductive-parts on that circuit back to the main earthing terminal. The CPC
          is the green/yellow conductor in a twin-and-earth cable, or a separate green/yellow
          conductor in conduit or trunking systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sizing CPCs.</strong> The CPC must be sized according to BS 7671 Table 54.7
                or by calculation using the adiabatic equation. For cables with an integral CPC
                (twin and earth), the CPC size is determined by the cable manufacturer — for
                example, a 2.5 mm twin and earth cable has a 1.5 mm CPC, and a 6 mm cable has a 2.5
                mm CPC. For separate CPCs in conduit or trunking, use Table 54.7 or the{' '}
                <SEOInternalLink href="/tools/adiabatic-equation-calculator">
                  adiabatic equation calculator
                </SEOInternalLink>{' '}
                to verify the CPC is adequate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity.</strong> The CPC must be continuous from the earthing terminal
                in the consumer unit to every exposed-conductive-part on the circuit. Continuity is
                tested during initial verification (R1+R2 test) and during periodic inspection. A
                break in the CPC means the circuit has no earth fault protection — a C1 (Danger
                Present) defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identification.</strong> CPCs must be identified with green/yellow colouring
                throughout their length. Where a bare CPC is used (as in the uninsulated earth
                conductor of twin-and-earth cable), it must be sleeved with green/yellow sleeving at
                every termination point.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Unsleeved CPCs at termination points are one of the most common observations during
          periodic inspections. While this is typically a C3 (Improvement Recommended) observation,
          it indicates a lack of attention to detail during the original installation or subsequent
          alterations. Always sleeve bare CPCs when working on an installation — it takes seconds
          and demonstrates professional workmanship.
        </p>
      </>
    ),
  },
  {
    id: 'testing-earthing',
    heading: 'Testing Earthing and Bonding',
    content: (
      <>
        <p>
          Testing earthing and bonding is a core part of both initial verification and periodic
          inspection. The key tests are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of protective conductors (R1+R2).</strong> This dead test
                verifies that the CPC on each circuit provides a continuous path from the earthing
                terminal to every point on the circuit. Use a low-resistance ohmmeter. The measured
                value contributes to the Zs calculation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of main bonding conductors.</strong> Verify that each main
                bonding conductor provides a continuous, low-resistance path from the MET to the
                bonding clamp on the service pipe. The resistance should be very low (typically less
                than 0.05 ohms for 10 mm copper over a short run).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External earth fault loop impedance (Ze).</strong> Measured at the origin
                with the installation earthing conductor disconnected at the MET. This gives the
                impedance of the supply earth path and confirms the earthing arrangement type (the
                Ze value indicates whether the supply is TN-S, TN-C-S, or TT).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance at each point (Zs).</strong> Measured at each
                socket outlet and fixed equipment point. Zs must be low enough to ensure the
                protective device operates within the required disconnection time. Compare measured
                values against the maximum Zs tables in BS 7671. Use the{' '}
                <SEOInternalLink href="/tools/earth-loop-impedance-calculator">
                  Zs calculator
                </SEOInternalLink>{' '}
                to verify compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record all test results on the schedule of test results for the EICR or EIC. Any earthing
          or bonding defects found during testing should be classified according to the observation
          code system: C1 for absent or disconnected earthing, C2 for deteriorated or inadequate
          earthing/bonding, and C3 for missing earth sleeving or recommendations for improvement.
        </p>
        <SEOAppBridge
          title="Record earthing and bonding test results by voice"
          description="Probes in hand? Speak your Ze, Zs, R1+R2 results to Elec-Mate and the schedule of test results fills itself in. No putting the probes down to type. Complete the EICR faster and more accurately."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ProtectiveEarthingBondingPage() {
  return (
    <GuideTemplate
      title="Protective Earthing & Bonding | BS 7671 Guide"
      description="Complete guide to protective earthing and bonding under BS 7671. Covers the main earthing terminal, main bonding conductors, 10mm and 6mm requirements, extraneous-conductive-parts, earthing arrangements, and testing methods."
      datePublished="2025-05-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Protective Earthing and Bonding:{' '}
          <span className="text-yellow-400">The Complete BS 7671 Guide</span>
        </>
      }
      heroSubtitle="Earthing and bonding are the foundation of electrical safety. This guide covers the main earthing terminal, bonding conductor sizes (10 mm and 6 mm), extraneous-conductive-part identification, UK earthing arrangements, and every test you need to carry out."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earthing and Bonding"
      relatedPages={relatedPages}
      ctaHeading="Verify Earthing Compliance on Site"
      ctaSubheading="Elec-Mate gives you earth loop impedance calculators, protective conductor sizing tools, AI regulations lookup, and digital EICR certificates — everything you need to verify and document earthing and bonding. 7-day free trial."
    />
  );
}
