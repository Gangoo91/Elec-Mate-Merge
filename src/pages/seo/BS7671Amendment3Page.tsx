import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  BookOpen,
  Shield,
  AlertTriangle,
  FileCheck2,
  GraduationCap,
  Calculator,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  Brain,
  Camera,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Amendment 3 Changes', href: '/guides/bs-7671-amendment-3-changes' },
];

const tocItems = [
  { id: 'what-is-amendment-3', label: 'What Is Amendment 3?' },
  { id: 'regulation-530-3-201', label: 'Regulation 530.3.201' },
  { id: 'bidirectional-devices', label: 'Bidirectional Devices' },
  { id: 'unidirectional-devices', label: 'Unidirectional Devices' },
  { id: 'practical-impact', label: 'Practical Impact for Electricians' },
  { id: 'solar-battery-storage', label: 'Solar PV and Battery Storage' },
  { id: 'certification-implications', label: 'Certification Implications' },
  { id: 'how-elec-mate-helps', label: 'How Elec-Mate Helps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A3:2024 was issued on 31 July 2024 as a free PDF supplement — it does not replace the main standard and does not require buying a new book.',
  'The primary change is the addition of Regulation 530.3.201, which addresses bidirectional and unidirectional protective and switching devices in installations with multiple sources of supply.',
  'Electricians working on solar PV, battery storage, EV charger, and generator installations must understand the distinction between bidirectional and unidirectional devices to ensure correct device selection.',
  'Existing installations that are safe and compliant with BS 7671:2018+A2:2022 do not need to be retrospectively upgraded to meet A3:2024 requirements.',
  'Elec-Mate includes updated regulation references for A3:2024, and the AI circuit designer accounts for bidirectional device requirements when designing solar PV and battery storage circuits.',
];

const faqs = [
  {
    question: 'Do I need to buy a new copy of BS 7671 for Amendment 3?',
    answer:
      'No. Amendment 3 (A3:2024) was issued as a free PDF supplement by the IET on 31 July 2024. You can download it from the IET website at no cost. It is designed to be read alongside your existing copy of BS 7671:2018+A2:2022 (the "brown book"). The supplement adds Regulation 530.3.201 and its associated guidance notes. You do not need to purchase a new edition of the standard. When Amendment 4 is eventually published (expected 2026), that may involve a more substantial update, but for now A3 is a minor, targeted addition.',
  },
  {
    question: 'What does Regulation 530.3.201 actually require?',
    answer:
      'Regulation 530.3.201 requires that where an installation includes multiple sources of supply (for example, the mains supply plus a solar PV inverter or battery storage system), the protective and switching devices must be suitable for the direction of current flow they will experience. Specifically, devices that can only interrupt current flowing in one direction (unidirectional devices) must not be installed where current may flow in both directions. This means the designer must verify that every protective device in the circuit path is rated for bidirectional operation if the installation topology allows reverse current flow. The regulation is accompanied by guidance notes that explain how to identify whether a device is bidirectional or unidirectional.',
  },
  {
    question: 'Does Amendment 3 affect domestic installations without solar panels?',
    answer:
      'For a standard domestic installation with a single supply from the Distribution Network Operator (DNO) and no embedded generation (no solar PV, no battery storage, no generator), Amendment 3 has minimal practical impact. The existing protective devices — MCBs, RCDs, RCBOs, and AFDDs — in a conventional single-source installation only experience current flowing in one direction, so the bidirectional/unidirectional distinction does not arise. However, if you are carrying out a consumer unit change or rewire on a property that already has (or plans to add) solar PV or battery storage, you must consider the A3:2024 requirements when selecting devices.',
  },
  {
    question: 'How do I know if an MCB or RCBO is bidirectional?',
    answer:
      'The manufacturer datasheet and product marking will indicate whether the device is rated for bidirectional operation. Most modern MCBs conforming to BS EN 60898-1 are bidirectional — they can interrupt fault current flowing in either direction through the device. However, some moulded case circuit breakers (MCCBs) and certain specialist devices are unidirectional only. RCBOs and RCDs should also be checked — most RCDs detect current imbalance regardless of direction, but the overcurrent element of an RCBO may be unidirectional. Always check the manufacturer documentation. If in doubt, contact the manufacturer technical support team. Elec-Mate AI agents can also help identify bidirectional compatibility for common device ranges.',
  },
  {
    question: 'When does Amendment 4 come into effect?',
    answer:
      'Amendment 4 to BS 7671 is expected in 2026, though the IET has not confirmed a precise publication date. Amendment 4 is anticipated to be more substantial than Amendment 3, potentially addressing areas such as energy storage systems, electric vehicle charging infrastructure, smart home installations, and updates reflecting the latest harmonised European standards. When Amendment 4 is published, there will typically be a transition period during which both the current and amended versions are acceptable. Elec-Mate will update its regulation references, AI agents, and training content as soon as Amendment 4 is officially published.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition IET Wiring Regulations including all amendments and key regulation changes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-amendment-4-2026',
    title: 'BS 7671 Amendment 4 2026',
    description:
      'What we know about the upcoming Amendment 4, expected changes, and how to prepare.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/solar-panel-installation-guide',
    title: 'Solar PV Installation Guide',
    description:
      'Complete guide to solar panel installation including certification, Part P notification, and DNO requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations-uk',
    title: 'Consumer Unit Regulations UK',
    description:
      'Amendment 3 consumer unit regulations, device selection, and Part P compliance for board changes.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'EIC, EICR, Minor Works — which certificate is required for each type of electrical work.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study for the C&G 2382 18th Edition qualification with structured training modules and mock exams.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-amendment-3',
    heading: 'What Is BS 7671 Amendment 3 (A3:2024)?',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 is the third amendment to the 18th Edition of the IET Wiring
          Regulations. It was issued by the Institution of Engineering and Technology (IET) on{' '}
          <strong>31 July 2024</strong> as a free PDF supplement. Unlike a new edition of the
          standard, Amendment 3 is a targeted addition — it does not replace the existing brown book
          (BS 7671:2018+A2:2022) but adds to it.
        </p>
        <p>
          The amendment addresses a specific technical gap that became increasingly important as the
          UK transitioned to renewable energy sources and embedded generation. With more homes and
          commercial premises installing solar PV arrays, battery energy storage systems (BESS), and
          other forms of distributed generation, the electrical installation now commonly includes
          multiple sources of supply. This creates the possibility of current flowing in both
          directions through protective and switching devices — a scenario that the previous edition
          of <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          did not explicitly address.
        </p>
        <p>
          The core of Amendment 3 is the addition of <strong>Regulation 530.3.201</strong>, which
          sets out requirements for the selection and installation of protective and switching
          devices where bidirectional current flow may occur. The amendment also includes associated
          guidance notes to help designers and installers understand the practical implications.
        </p>
        <p>
          For electricians, the key message is straightforward: if you work on any installation that
          has, or may have in the future, more than one source of supply (solar PV, battery storage,
          generator, EV vehicle-to-grid), you need to understand this amendment and ensure the
          devices you select are suitable for the direction of current flow they will experience.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-530-3-201',
    heading: 'Regulation 530.3.201: The Core Requirement',
    content: (
      <>
        <p>
          Regulation 530.3.201 sits within Chapter 53 of BS 7671, which deals with switching and
          control devices. The regulation states that where an installation includes one or more
          sources of supply that can cause current to flow in more than one direction through a
          protective or switching device, the device must be suitable for that bidirectional current
          flow.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identify all sources of supply</strong> — the mains DNO supply, any solar PV
                inverters, battery storage systems, generators, or vehicle-to-grid (V2G) EV
                chargers. Each source can potentially feed current back into the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Determine the direction of current flow</strong> — at each protective device
                in the circuit path, establish whether current can flow in one direction only (from
                supply to load) or in both directions (supply to load and load to supply).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Select suitable devices</strong> — if bidirectional current flow is
                possible, the protective device must be rated for bidirectional operation. If a
                unidirectional device is used where bidirectional flow can occur, it may fail to
                interrupt a fault safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document the design decision</strong> — the choice of bidirectional or
                unidirectional devices should be recorded in the design documentation. This is
                particularly important for{' '}
                <SEOInternalLink href="/guides/electrical-certificate-types-uk">
                  Electrical Installation Certificates
                </SEOInternalLink>{' '}
                where the design is verified.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulation does not mandate that all devices in every installation must be
          bidirectional. It is targeted: only where the installation topology creates the
          possibility of reverse current flow does the requirement apply. A standard domestic
          installation with a single DNO supply and no embedded generation is unaffected.
        </p>
      </>
    ),
  },
  {
    id: 'bidirectional-devices',
    heading: 'Bidirectional Devices: What They Are and When You Need Them',
    content: (
      <>
        <p>
          A bidirectional protective device can safely interrupt fault current flowing in either
          direction through the device. Most miniature circuit breakers (MCBs) conforming to BS EN
          60898-1 are inherently bidirectional — they use a thermal-magnetic trip mechanism that
          responds to overcurrent regardless of the direction of flow.
        </p>
        <p>You need bidirectional devices in the following scenarios:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV installations</strong> — the PV inverter feeds current back through
                the consumer unit into the grid. Any MCB, RCBO, or switching device in the path
                between the inverter connection point and the meter must be bidirectional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery energy storage systems (BESS)</strong> — the battery charges from
                the supply (current flowing in) and discharges to the installation (current flowing
                out). The protective devices must handle both directions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle-to-grid (V2G) EV chargers</strong> — these chargers can both draw
                power from the grid to charge the vehicle and feed power from the vehicle battery
                back into the installation. The protective devices must be bidirectional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator installations with grid paralleling</strong> — where a standby
                generator operates in parallel with the mains supply, current can flow in both
                directions at the point of connection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The good news is that most standard MCBs used in UK consumer units are already
          bidirectional. The issue arises more commonly with moulded case circuit breakers (MCCBs),
          isolators, and certain specialist switching devices that may only be rated for
          unidirectional operation.
        </p>
      </>
    ),
  },
  {
    id: 'unidirectional-devices',
    heading: 'Unidirectional Devices: The Risk of Getting It Wrong',
    content: (
      <>
        <p>
          A unidirectional protective device is designed to interrupt current flowing in one
          direction only — typically from the supply (line) terminal to the load terminal. If fault
          current flows in the reverse direction through a unidirectional device, it may not trip
          correctly. In the worst case, the device could fail to disconnect the fault at all,
          leading to:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sustained fault current</strong> — the device does not trip, so the fault
                current continues to flow. This can cause overheating, cable damage, and fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damage to the protective device</strong> — a unidirectional device subjected
                to reverse current may suffer internal arcing, contact welding, or mechanical
                failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loss of supply isolation</strong> — if the device cannot open under reverse
                current, it becomes impossible to safely isolate the circuit for maintenance or
                emergency disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Invalidation of the installation certificate</strong> — using a
                unidirectional device where bidirectional operation is required is a design
                deficiency that would be recorded as a{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  C2 (Potentially Dangerous) observation
                </SEOInternalLink>{' '}
                on an EICR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical lesson is simple: before installing any protective or switching device in a
          circuit that includes embedded generation, check the manufacturer documentation to confirm
          whether the device is bidirectional or unidirectional. If the datasheet does not
          explicitly state bidirectional capability, assume it is unidirectional and either choose a
          different device or contact the manufacturer for clarification.
        </p>
      </>
    ),
  },
  {
    id: 'practical-impact',
    heading: 'Practical Impact for Working Electricians',
    content: (
      <>
        <p>
          For the majority of day-to-day domestic electrical work — socket additions, lighting
          circuits, consumer unit changes on single-supply installations — Amendment 3 does not
          change your working practices. The requirement is specifically triggered by installations
          with multiple sources of supply.
        </p>
        <p>
          However, the proportion of installations with embedded generation is growing rapidly. The
          UK government's net zero targets, the Smart Export Guarantee (SEG), and falling solar PV
          prices mean that more domestic and commercial properties are adding solar, battery
          storage, and V2G EV charging every year. As an electrician, you will increasingly
          encounter these installations, and you need to be prepared.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>During design</strong> — when designing an installation with embedded
                generation, identify every protective device in the circuit path and confirm it is
                suitable for the direction(s) of current flow. Record your design decisions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>During installation</strong> — verify that the devices supplied match the
                design specification. Check product markings and datasheets. Do not substitute a
                device without confirming its directional rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>During inspection and testing</strong> — when carrying out an{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink> or
                verifying a new installation, check that the devices installed are appropriate for
                any embedded generation present. A unidirectional device in a bidirectional circuit
                path should be recorded as a defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>During certification</strong> — the{' '}
                <SEOInternalLink href="/guides/how-to-fill-in-eicr">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                should record that the design accounts for bidirectional current flow where
                applicable. Reference Regulation 530.3.201 in the observations if relevant.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are studying for your{' '}
          <SEOInternalLink href="/guides/city-guilds-2391-guide">
            C&G 2391 inspection and testing qualification
          </SEOInternalLink>
          , expect questions on Amendment 3 to appear in exam papers. The examiners will be looking
          for your understanding of when bidirectional devices are required and how to identify
          installations that are affected.
        </p>
      </>
    ),
  },
  {
    id: 'solar-battery-storage',
    heading: 'Solar PV and Battery Storage: The Primary Use Case',
    content: (
      <>
        <p>
          The driving force behind Amendment 3 is the rapid growth of solar PV and battery storage
          installations in the UK. When a{' '}
          <SEOInternalLink href="/guides/solar-panel-installation-guide">
            solar PV system
          </SEOInternalLink>{' '}
          is connected to a domestic consumer unit via an AC-coupled inverter, the inverter
          generates AC current that flows back through the consumer unit and into the grid. This
          reverse current flow passes through the main switch, the meter tails, and potentially
          through other protective devices depending on the connection arrangement.
        </p>
        <p>
          Battery energy storage systems add another layer of complexity. A BESS can charge from the
          grid (drawing current from the supply), charge from solar PV (drawing current from the
          inverter), and discharge to the installation (supplying current to loads). The direction
          of current flow through the protective devices changes dynamically depending on whether
          the battery is charging, discharging, or idle.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key Design Considerations</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The main switch (isolator) at the consumer unit must be bidirectional if the
                installation exports to the grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Any MCB or RCBO protecting the circuit that connects the inverter or BESS to the
                consumer unit must be confirmed as bidirectional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                RCDs in the circuit path must detect earth leakage current regardless of the
                direction of current flow — most standard RCDs do, but always verify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The DNO may have additional requirements for the type and rating of protective
                devices at the point of connection. Check the G98/G99 application requirements.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="AI circuit designer for solar PV installations"
          description="Elec-Mate's AI circuit designer handles bidirectional device selection automatically. Describe the installation — solar PV capacity, battery storage, EV charger — and the AI designs the circuit with the correct protective devices, cable sizes, and A3:2024 compliance built in."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'certification-implications',
    heading: 'Certification and Compliance Implications',
    content: (
      <>
        <p>
          Amendment 3 has direct implications for how you complete electrical certificates. When
          issuing an Electrical Installation Certificate (EIC) for a new installation or alteration
          that includes embedded generation, you must confirm that the design complies with
          Regulation 530.3.201.
        </p>
        <p>
          On the EIC, the design section should note that bidirectional current flow has been
          considered and that all protective and switching devices in the circuit path are suitable.
          If you are using Elec-Mate to produce the certificate, the app prompts you to record
          embedded generation details and flags any device compatibility issues.
        </p>
        <p>
          When carrying out periodic inspection and testing (EICR), you should check whether the
          existing installation includes any embedded generation. If it does, verify that the
          protective devices are suitable for bidirectional operation. If a unidirectional device is
          found in a bidirectional circuit path, record it as a C2 (Potentially Dangerous)
          observation with a reference to Regulation 530.3.201.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New installations with solar PV/BESS</strong> — the EIC must confirm
                compliance with Regulation 530.3.201. Record the inverter model, battery system
                model, and confirm bidirectional device suitability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alterations adding embedded generation</strong> — if you are adding solar PV
                or battery storage to an existing installation, check that the existing consumer
                unit devices are bidirectional. If not, they must be replaced as part of the
                alteration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR on existing installations</strong> — if the installation has embedded
                generation that was installed before A3:2024, check device suitability during the
                periodic inspection. Record any non-compliant devices in the observations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember that Amendment 3 is not retrospective. An installation that was compliant with BS
          7671:2018+A2:2022 at the time of installation is still compliant. However, if you identify
          a genuine safety issue (a unidirectional device in a bidirectional circuit path that could
          fail to disconnect a fault), that should be recorded as a defect regardless of the
          regulation edition in force at the time of installation.
        </p>
      </>
    ),
  },
  {
    id: 'how-elec-mate-helps',
    heading: 'How Elec-Mate Keeps You Up to Date',
    content: (
      <>
        <p>
          Keeping track of regulation changes is one of the biggest challenges for working
          electricians. Amendment 3 is a relatively small change, but it is easy to miss — and
          getting it wrong on a solar PV or battery storage installation could result in a serious
          safety issue and a defective certificate.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Circuit Designer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the installation and the AI designs the circuit with A3:2024 compliance.
                  It automatically selects bidirectional devices where required and flags any
                  incompatibilities in the design.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Scan an existing consumer unit with your phone camera. The AI identifies the
                  installed devices and can flag potential unidirectional devices in installations
                  with embedded generation — helping you catch issues during an EICR.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">46+ Training Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  The Elec-Mate training library includes modules on BS 7671 amendments, solar PV
                  installation, battery storage, and EV charging. Stay current with regulation
                  changes through structured CPD content, flashcards, and mock exams.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">50+ Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cable sizing, voltage drop, earth fault loop impedance, prospective fault current,
                  maximum demand — all the calculations you need for solar PV and battery storage
                  design, with BS 7671 compliance built in.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Stay ahead of regulation changes"
          description="Elec-Mate updates its regulation references, AI agents, and training content with every BS 7671 amendment. Stop worrying about missing changes — the app keeps you compliant. 7-day free trial, cancel anytime."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BS7671Amendment3Page() {
  return (
    <GuideTemplate
      title="BS 7671 Amendment 3 (A3:2024) | Changes Explained"
      description="Complete guide to BS 7671:2018+A3:2024 Amendment 3 changes. Regulation 530.3.201 explained — bidirectional and unidirectional devices, solar PV and battery storage implications, issued 31 July 2024 as a free PDF supplement."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations"
      badgeIcon={Scale}
      heroTitle={
        <>
          BS 7671 Amendment 3:{' '}
          <span className="text-yellow-400">What Changed and Why It Matters</span>
        </>
      }
      heroSubtitle="Amendment 3 (A3:2024) was issued on 31 July 2024 as a free PDF supplement. It adds Regulation 530.3.201 covering bidirectional and unidirectional protective devices — essential for any installation with solar PV, battery storage, or other embedded generation. This guide explains every detail."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About BS 7671 Amendment 3"
      relatedPages={relatedPages}
      ctaHeading="Design Solar PV Circuits with A3:2024 Compliance"
      ctaSubheading="Elec-Mate's AI circuit designer selects bidirectional devices automatically. Plus 50+ calculators, AI board scanner, voice test entry, and 46+ training courses. 7-day free trial, cancel anytime."
    />
  );
}
