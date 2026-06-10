import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  BookOpen,
  Activity,
  Sun,
  Battery,
  Cable,
  ArrowLeftRight,
  ArrowRight as ArrowRightIcon,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Regulation 530.3.201', href: '/guides/regulation-530-3-201' },
];

const tocItems = [
  { id: 'what-is-530', label: 'What Is Regulation 530.3.201?' },
  { id: 'amendment-3-context', label: 'Amendment History: A3:2024 and A4:2026' },
  { id: 'bidirectional-vs-unidirectional', label: 'Bidirectional vs Unidirectional' },
  { id: 'solar-pv-impact', label: 'Impact on Solar PV Installations' },
  { id: 'battery-storage-impact', label: 'Impact on Battery Storage' },
  { id: 'practical-compliance', label: 'Practical Compliance' },
  { id: 'device-selection', label: 'Device Selection Guide' },
  { id: 'certification-requirements', label: 'Certification Requirements' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const answerBox = {
  question: 'What is Regulation 530.3.201 in BS 7671?',
  answer:
    'Regulation 530.3.201, introduced by BS 7671:2018+A3:2024, requires that the selection and erection of equipment for protection takes account of the appropriate use of either a unidirectional or a bidirectional protective device. It matters for solar PV, battery storage and V2G EV chargers, where current can flow back towards the supply. A NOTE adds that some devices are marked (in/out, line/load, arrows) to indicate direction.',
};

const keyTakeaways = [
  'Regulation 530.3.201 was introduced by BS 7671:2018+A3:2024 (Amendment 3, issued 31 July 2024). It requires that those selecting and erecting protective equipment take account of the appropriate use of either a unidirectional or bidirectional protective device — and follow any orientation marking (in/out, line/load, arrows) on the device.',
  'Bidirectional power flow occurs in installations with solar PV, battery storage, vehicle-to-grid (V2G) EV chargers, or other embedded generation where current can flow both from the supply to the installation and from the installation back to the supply.',
  'Standard MCBs and RCDs are designed and tested for unidirectional current flow only. Using a unidirectional device where bidirectional flow occurs may result in the device failing to operate correctly under fault conditions or failing to break the circuit safely.',
  'RCCBs, RCBOs, circuit-breakers, and AFDDs may carry orientation markings (such as "in"/"out", "line"/"load", or arrows) required by the relevant product standard listed in Appendix I of BS 7671. Installers must follow this marking when connecting the device.',
  'BS 7671:2018+A4:2026 (Amendment 4) introduced further changes including a redrafted Reg 421.1.7 — now requiring AFDDs (to BS EN 62606) on single-phase AC final circuits supplying socket-outlets rated up to 32 A in high rise residential buildings, HMOs, purpose-built student accommodation and care homes (and recommending them in all other premises) — plus a new Reg 411.6.5 and a new Regulation group 419 for where automatic disconnection is not feasible.',
  'Elec-Mate solar PV and battery storage certificates include fields for confirming bidirectional device selection in compliance with Regulation 530.3.201. The app references BS 7671:2018+A4:2026 on relevant certificates.',
];

const faqs = [
  {
    question: 'What is Regulation 530.3.201 in BS 7671?',
    answer:
      'Regulation 530.3.201 was introduced by Amendment 3 (A3:2024, issued 31 July 2024) to BS 7671:2018. It requires that those selecting and erecting protective equipment take account of the appropriate use of either a unidirectional or bidirectional protective device, and follow any orientation marking on the device. This regulation was added to address the growing number of installations with solar PV panels, battery energy storage systems, and vehicle-to-grid EV chargers, where power can flow from the installation back towards the supply network. The regulation ensures that protective and switching devices are selected correctly for the direction of current flow.',
  },
  {
    question: 'What is the difference between bidirectional and unidirectional devices?',
    answer:
      'A unidirectional switching device is designed and tested to interrupt current flowing in one direction only — from the supply to the load. Standard MCBs, RCBOs, and isolators are typically unidirectional. When current flows in the intended direction, the arc-quenching mechanism operates correctly and the device safely interrupts the circuit. A bidirectional device is designed and tested to interrupt current flowing in either direction — both from supply to load and from load to supply. The arc-quenching mechanism works equally well regardless of current direction. Bidirectional devices are marked accordingly on their rating plate or datasheet, often with a specific IEC symbol or the marking "bidirectional" in the technical documentation.',
  },
  {
    question: 'Does Regulation 530.3.201 apply to existing solar PV installations?',
    answer:
      'Amendment 3 (A3:2024) applies to new installations and alterations carried out after its publication date of 31 July 2024. It does not retrospectively require existing solar PV installations to be upgraded. However, during an EICR of an existing installation with solar PV, the inspector should note whether unidirectional devices are being used where bidirectional flow occurs. This might be raised as a C3 (improvement recommended) observation. If significant alterations are being made to an existing solar PV or battery storage installation, the altered parts should comply with the current edition of BS 7671 including BS 7671:2018+A4:2026. Any new switching devices installed as part of the alteration should be appropriate for the directional characteristics of the circuit.',
  },
  {
    question: 'Which devices in a solar PV installation need to be bidirectional?',
    answer:
      'In a solar PV installation, the devices that may experience bidirectional current flow depend on the system configuration. The AC isolator between the inverter and the consumer unit or distribution board must be suitable for bidirectional operation because current can flow from the inverter to the grid. Any MCB, RCBO, or RCD protecting the PV circuit on the AC side must be bidirectional-rated. The main switch of the consumer unit may also experience bidirectional flow if the PV system exports to the grid through the main distribution board. Devices on circuits that do not carry PV-generated current (such as a standard lighting or socket circuit) do not need to be bidirectional, provided they are not in the path of the exported current.',
  },
  {
    question: 'Where can I find A4:2026 and is it free?',
    answer:
      'BS 7671:2018+A3:2024 (Amendment 3) was issued on 31 July 2024 by the IET and introduced Regulation 530.3.201 (bidirectional devices) along with supporting definitions. It is available as a free PDF supplement from the IET website. BS 7671:2018+A4:2026 (Amendment 4) followed and introduced further changes, including a redrafted Reg 421.1.7 that now requires AFDDs on socket-outlet final circuits up to 32 A in certain higher-risk premises, plus a new Reg 411.6.5. The full current citation is BS 7671:2018+A4:2026 and should be used on certificates and documentation.',
  },
  {
    question: 'Do V2G (vehicle-to-grid) EV chargers require bidirectional devices?',
    answer:
      'Yes. Vehicle-to-grid (V2G) chargers allow energy stored in an electric vehicle battery to be discharged back into the installation and potentially exported to the grid. This creates bidirectional power flow on the EV charging circuit. Under Regulation 530.3.201, the MCB or RCBO protecting the V2G charger circuit, the isolator for the charger, and any upstream switching devices in the path of the bidirectional current must be rated for bidirectional operation. Standard V2G charger installation guides from manufacturers now specify bidirectional-rated protective devices. Standard Mode 3 chargers that only charge the vehicle (unidirectional) do not create this requirement.',
  },
];

const relatedPages = [
  {
    href: '/guides/bs-7671-amendment-4-2026',
    title: 'BS 7671 Amendment 4',
    description: 'Complete overview of all changes in A4:2026.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
  {
    href: '/guides/bs-7671-amendment-3-changes',
    title: 'BS 7671 Amendment 3',
    description: 'A3:2024 changes, including Regulation 530.3.201.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition',
    description: 'Complete guide to the current Wiring Regulations.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
  {
    href: '/guides/solar-panel-installation',
    title: 'Solar PV Installation Guide',
    description: 'Design, installation, and certification for solar PV systems.',
    icon: Sun,
    category: 'Guide' as const,
  },
  {
    href: '/guides/battery-storage-installation',
    title: 'Battery Storage Guide',
    description: 'Battery energy storage installation and certification.',
    icon: Battery,
    category: 'Guide' as const,
  },
  {
    href: '/tools/solar-pv-certificate',
    title: 'Solar PV Certificate',
    description: 'Digital solar PV installation certificate with A4:2026 compliance fields.',
    icon: FileCheck2,
    category: 'Certificate' as const,
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation',
    description: 'EV charger installation including V2G considerations.',
    icon: Cable,
    category: 'Guide' as const,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-530',
    heading: 'What Is Regulation 530.3.201?',
    content: (
      <>
        <p>
          Regulation 530.3.201 is a new regulation introduced by{' '}
          <SEOInternalLink href="/guides/bs-7671-amendment-3-changes">
            Amendment 3 (A3:2024)
          </SEOInternalLink>{' '}
          to BS 7671:2018. It addresses a specific safety concern: the selection and erection of
          protective devices in installations where electrical current can flow in both directions
          through those devices.
        </p>
        <p>
          The regulation requires that those selecting and erecting protective equipment take
          account of the appropriate use of either a unidirectional or a bidirectional protective
          device. The designer or installer shall determine which directional characteristic is
          appropriate for the application. Where a device is marked to indicate its orientation (for
          example "in"/"out", "line"/"load", or arrows), the installer shall connect it in
          accordance with that marking.
        </p>
        <p>
          This regulation was added because the UK is seeing rapid growth in domestic and commercial
          installations that include embedded generation (solar PV), battery energy storage systems
          (BESS), and vehicle-to-grid (V2G) EV chargers. All of these technologies can cause current
          to flow "backwards" through devices that were historically designed only for
          unidirectional current flow.
        </p>
        <p>
          Prior to Amendment 3 (A3:2024), there was no explicit regulation in BS 7671 requiring
          designers and installers to consider the directional characteristics of protective
          devices. Electricians relied on manufacturer guidance and good practice, but there was no
          regulatory framework mandating it. Regulation 530.3.201 fills this gap.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-yellow-400 text-sm uppercase tracking-wide mb-3">
            Regulation 530.3.201 — Verbatim (BS 7671:2018+A4:2026)
          </h4>
          <blockquote className="border-l-4 border-yellow-400 pl-4 text-white italic text-sm leading-relaxed">
            &ldquo;Selection and erection of equipment for protection shall take account of
            appropriate use of either a unidirectional protective device or a bidirectional
            protective device.&rdquo;
          </blockquote>
          <p className="text-white/70 text-xs leading-relaxed mt-3">
            NOTE: Product standards as listed in Appendix I, for some protective devices including
            RCCBs, RCBOs, circuit-breakers and AFDDs, require these devices to be marked to indicate
            if they are unidirectional &mdash; e.g. &ldquo;in&rdquo; and &ldquo;out&rdquo;,
            &ldquo;line&rdquo; and &ldquo;load&rdquo;, or arrows.
          </p>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Device Orientation Marking — Site Check</h4>
              <p className="text-white text-sm leading-relaxed">
                The NOTE to Regulation 530.3.201 states that product standards (listed in Appendix I
                of BS 7671) for some protective devices — including RCCBs, RCBOs, circuit-breakers,
                and AFDDs — require those devices to be marked to indicate if they are
                unidirectional (e.g. &ldquo;in&rdquo;/&ldquo;out&rdquo;,
                &ldquo;line&rdquo;/&ldquo;load&rdquo;, or arrows). Where such marking is present,
                connect the device in line with it. Before signing off a solar PV, battery storage,
                or V2G installation, check every protective device in the bidirectional current path
                for orientation markings and confirm they are installed accordingly.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'amendment-3-context',
    heading: 'BS 7671 Amendment History: A3:2024 and A4:2026',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 was issued on 31 July 2024 by the IET. It is a supplementary
          amendment to the base standard (BS 7671:2018, commonly known as the 18th Edition) and to
          Amendment 2 (A2:2022). A3:2024 is a small, focused document available as a free PDF from
          the IET website — it is not a new book. Its primary addition is Regulation 530.3.201
          (bidirectional and unidirectional protective devices), together with two supporting
          definitions.
        </p>
        <p>
          BS 7671:2018+A4:2026 (Amendment 4) followed in 2026. Amendment 4 is the current amendment
          and, among other changes, redrafted Reg 421.1.7 on arc fault detection devices (AFDDs),
          inserted a new Reg 411.6.5, and added a new Regulation group 419 for situations where
          automatic disconnection in accordance with Regulation 411.3.2 is not feasible. The full
          current citation for the standard is BS 7671:2018+A4:2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">BS 7671 Amendment Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-yellow-400 font-bold shrink-0">2018</span>
              <span className="text-white">
                BS 7671:2018 — 18th Edition published (the "brown book")
              </span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-yellow-400 font-bold shrink-0">2020</span>
              <span className="text-white">
                Amendment 1 (A1:2020) — corrections and clarifications
              </span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-yellow-400 font-bold shrink-0">2022</span>
              <span className="text-white">
                Amendment 2 (A2:2022) — SPD requirements, EV charging updates
              </span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <span className="text-yellow-400 font-bold shrink-0">Jul 2024</span>
              <span className="text-white">
                Amendment 3 (A3:2024) — Regulation 530.3.201 (bidirectional/unidirectional devices)
                + two new definitions
              </span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <span className="text-yellow-400 font-bold shrink-0">2026</span>
              <span className="text-white">
                Amendment 4 (A4:2026) — redrafted Reg 421.1.7 (AFDDs now required for socket-outlet
                circuits ≤32 A in higher-risk premises), new Reg 411.6.5, new group 419 — current
                standard
              </span>
            </div>
          </div>
        </div>
        <p>
          The current full citation for the standard is BS 7671:2018+A4:2026. When referencing the
          standard on certificates and documentation, use this full citation to confirm compliance
          with the latest amendment. The{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            18th Edition guide
          </SEOInternalLink>{' '}
          covers the base standard in detail.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h4 className="font-bold text-white mb-3">What Else Did A4:2026 Introduce?</h4>
          <p className="text-white text-sm leading-relaxed mb-3">
            Amendment 4 (A4:2026) extends beyond the bidirectional device rules introduced by
            A3:2024. Key additions in A4:2026 include:
          </p>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Reg 421.1.7 (AFDDs)</strong> — redrafted. AFDDs
                conforming to BS EN 62606 are now <strong>required</strong> on single-phase AC final
                circuits supplying socket-outlets rated up to 32 A in high rise residential
                buildings, houses in multiple occupation, purpose-built student accommodation and
                care homes. For all other premises, AFDDs are <strong>recommended</strong> on such
                circuits. Where used, the AFDD is placed at the origin of the circuit it protects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Reg 411.6.5</strong> — inserted as part of a
                reorganisation of the IT system requirements in Section 411.6 (Chapter 41,
                Protection Against Electric Shock).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">New Regulation group 419</strong> — inserted for
                installations where automatic disconnection in accordance with Regulation 411.3.2 is
                not feasible, such as electronic equipment with limited short-circuit current.
              </span>
            </li>
          </ul>
          <p className="text-white text-sm leading-relaxed mt-3">
            See the{' '}
            <SEOInternalLink href="/guides/bs-7671-amendment-4-2026">
              full A4:2026 changes guide
            </SEOInternalLink>{' '}
            for a complete overview.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'bidirectional-vs-unidirectional',
    heading: 'Bidirectional vs Unidirectional Devices',
    content: (
      <>
        <p>
          Understanding the difference between bidirectional and unidirectional switching devices is
          essential for compliance with Regulation 530.3.201. BS 7671 Part 2 (Definitions) defines
          both terms by reference to how the manufacturer intends the supply to be connected:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-yellow-400 text-sm uppercase tracking-wide mb-3">
            BS 7671 Part 2 — Definitions
          </h4>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white">
                <strong className="text-white">Unidirectional protective device.</strong> A
                protective device where it is intended by the manufacturer that a source of supply is
                only connected to one defined set of connection terminals.
              </p>
            </div>
            <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/20 p-4">
              <p className="text-white">
                <strong className="text-yellow-400">Bidirectional protective device.</strong> A
                protective device where it is intended by the manufacturer that a source of supply is
                connected to either or both sets of connection terminals.
              </p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <ArrowRightIcon className="w-6 h-6 text-white mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Unidirectional Devices</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Designed to interrupt current flowing in one direction only — from supply to load. The
              internal arc-quenching mechanism is optimised for this direction of current flow.
            </p>
            <p className="text-white text-sm leading-relaxed">
              Standard MCBs, most RCBOs, and many isolators are unidirectional. They will function
              as a switch in either direction, but the arc-interruption capability may not be
              guaranteed for reverse current flow. Under a high-energy fault in the reverse
              direction, the device may fail to extinguish the arc safely.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <ArrowLeftRight className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Bidirectional Devices</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Designed and tested to interrupt current flowing in either direction — from supply to
              load and from load to supply. The arc-quenching mechanism works equally well
              regardless of current direction.
            </p>
            <p className="text-white text-sm leading-relaxed">
              Bidirectional devices are specifically tested to IEC standards for both directions of
              current flow and are marked as suitable for bidirectional operation. They may carry a
              specific symbol or marking on the rating plate.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Check Device Datasheets</h4>
              <p className="text-white text-sm leading-relaxed">
                Not all devices clearly state whether they are bidirectional or unidirectional on
                their front plate. Check the manufacturer's technical datasheet or installation
                instructions for the specific device. If in doubt, contact the manufacturer. Major
                manufacturers (Hager, Schneider, Siemens, ABB) now clearly state bidirectional
                suitability in their product documentation.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'solar-pv-impact',
    heading: 'Impact on Solar PV Installations',
    content: (
      <>
        <p>
          Solar PV installations are the most common application of Regulation 530.3.201 in domestic
          work. A{' '}
          <SEOInternalLink href="/guides/solar-panel-installation">solar PV system</SEOInternalLink>{' '}
          with a grid-tied inverter generates AC power that can flow in two directions: to the
          property's loads (self-consumption) and to the grid (export).
        </p>
        <p>
          The key devices that experience bidirectional current in a typical domestic grid-tied
          solar PV installation are set out below:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
          <div className="grid grid-cols-12 gap-0 bg-white/[0.06] px-4 py-3 text-xs font-bold uppercase tracking-wide text-yellow-400">
            <div className="col-span-5">Device</div>
            <div className="col-span-7">Why current can flow both ways</div>
          </div>
          <div className="divide-y divide-white/10">
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm">
              <div className="col-span-5 font-semibold text-white">AC isolator at the inverter</div>
              <div className="col-span-7 text-white/90">
                Generated current flows from the inverter towards the consumer unit through this
                isolator, so it sits in the generation-direction path.
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm bg-white/[0.02]">
              <div className="col-span-5 font-semibold text-white">MCB / RCBO for the PV circuit</div>
              <div className="col-span-7 text-white/90">
                The protective device for the inverter's AC output circuit carries generated current
                from the inverter to the consumer unit busbars.
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm">
              <div className="col-span-5 font-semibold text-white">Consumer unit main switch</div>
              <div className="col-span-7 text-white/90">
                Where surplus generation is exported, the main switch sees both import and export
                current, so it must suit bidirectional operation.
              </div>
            </div>
          </div>
        </div>
        <p>
          When specifying protective devices for a{' '}
          <SEOInternalLink href="/tools/solar-pv-certificate">
            solar PV installation
          </SEOInternalLink>
          , confirm with the device manufacturer that each device in the bidirectional current path
          is rated for bidirectional operation. Document this on the installation certificate.
        </p>
      </>
    ),
  },
  {
    id: 'battery-storage-impact',
    heading: 'Impact on Battery Storage Systems',
    content: (
      <>
        <p>
          Battery energy storage systems (BESS) create bidirectional power flow because the battery
          charges from the grid or PV system (consuming power) and discharges to supply loads or
          export to the grid (generating power). This makes every switching device in the battery
          circuit path subject to Regulation 530.3.201.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/battery-storage-installation">
            battery storage
          </SEOInternalLink>{' '}
          system's AC connection to the consumer unit or distribution board carries current in both
          directions during normal operation — not just under fault conditions. This is a key
          distinction from some solar PV installations where reverse current flow occurs only during
          export. Battery systems routinely cycle between charge and discharge multiple times per
          day.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Devices Requiring Bidirectional Rating in BESS
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>AC isolator for the battery inverter</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>MCB or RCBO protecting the battery circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>Main switch if the battery system exports to the grid</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>Any upstream RCD in the path of bidirectional current</span>
            </li>
          </ul>
        </div>
        <p>
          Hybrid inverters that combine solar PV and battery storage in a single unit are
          particularly relevant — the single AC output circuit carries bidirectional current from
          both the PV generation and the battery discharge.
        </p>
      </>
    ),
  },
  {
    id: 'practical-compliance',
    heading: 'Practical Compliance',
    content: (
      <>
        <p>
          Achieving compliance with Regulation 530.3.201 is straightforward in practice, but it
          requires awareness and a change in procurement habits. Here is a practical workflow:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Identify bidirectional circuits</strong> — determine which circuits in the
              installation carry bidirectional current. This includes any circuit connected to a
              solar PV inverter, battery storage inverter, V2G charger, or other embedded generation
              source.
            </li>
            <li>
              <strong>Identify devices in the bidirectional path</strong> — trace the bidirectional
              current path from the generation source to the point of connection with the supply
              (typically the main switch or meter). Every switching and protective device in this
              path needs to be bidirectional.
            </li>
            <li>
              <strong>Check existing devices</strong> — if adding PV or battery storage to an
              existing installation, check whether the existing MCBs, RCBOs, isolators, and main
              switch are rated for bidirectional operation. If not, replace them.
            </li>
            <li>
              <strong>Specify bidirectional devices</strong> — when ordering new devices, explicitly
              request bidirectional-rated versions. Check the manufacturer datasheet before
              purchase.
            </li>
            <li>
              <strong>Document compliance</strong> — record the bidirectional suitability of each
              device on the installation certificate, referencing Regulation 530.3.201.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="A4:2026 Compliance on Certificates"
          description="Elec-Mate solar PV and battery storage certificates include fields for confirming bidirectional device selection per Regulation 530.3.201."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'device-selection',
    heading: 'Device Selection Guide',
    content: (
      <>
        <p>
          Major switchgear manufacturers now produce devices specified for prosumer (generation +
          storage) installations. Use the table below as a starting checklist, then confirm
          bidirectional suitability against the manufacturer's datasheet for the specific catalogue
          number before you order.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
          <div className="grid grid-cols-12 gap-0 bg-white/[0.06] px-4 py-3 text-xs font-bold uppercase tracking-wide text-yellow-400">
            <div className="col-span-4">Device</div>
            <div className="col-span-8">What to check before specifying</div>
          </div>
          <div className="divide-y divide-white/10">
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm">
              <div className="col-span-4 font-semibold text-white">Main switch</div>
              <div className="col-span-8 text-white/90">
                Choose a main switch suited to generation/prosumer applications and confirm the
                breaking capacity is rated for both directions of current flow.
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm bg-white/[0.02]">
              <div className="col-span-4 font-semibold text-white">MCBs &amp; RCBOs</div>
              <div className="col-span-8 text-white/90">
                Some standard devices are already tested for bidirectional operation but not
                marketed as such — confirm with the manufacturer. Check for any in/out or line/load
                marking and observe it.
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm">
              <div className="col-span-4 font-semibold text-white">AC isolators</div>
              <div className="col-span-8 text-white/90">
                Rotary isolators for PV and battery circuits should be rated for the application and
                for current flow in the generation direction.
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm bg-white/[0.02]">
              <div className="col-span-4 font-semibold text-white">RCDs</div>
              <div className="col-span-8 text-white/90">
                If an RCD sits in the bidirectional path, confirm both its residual-current detection
                and its switching/breaking capability are suitable for current in either direction.
                See{' '}
                <SEOInternalLink href="/guides/rcd-types-explained">RCD types</SEOInternalLink>.
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0 px-4 py-3 text-sm">
              <div className="col-span-4 font-semibold text-white">AFDDs</div>
              <div className="col-span-8 text-white/90">
                Per the NOTE to 530.3.201, AFDDs (BS EN 62606) may be marked for orientation. Where
                A4:2026 Reg 421.1.7 applies, place the AFDD at the origin of the circuit it protects.
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              Manufacturer names and ranges change frequently — always verify the current datasheet
              for the exact catalogue number rather than relying on a brand having a suitable device
              in the past.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'certification-requirements',
    heading: 'Certification Requirements',
    content: (
      <>
        <p>
          When issuing an <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> for an
          installation with bidirectional power flow, the certificate should reference compliance
          with BS 7671:2018+A4:2026 (not just BS 7671:2018 or A2:2022). This confirms that the
          installation has been designed and installed in accordance with the latest amendment,
          including Regulation 530.3.201.
        </p>
        <p>The certificate should specifically note:</p>
        <ul className="space-y-2 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">The presence of embedded generation or storage</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">Which circuits carry bidirectional current</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              Confirmation that all devices in the bidirectional path are rated for bidirectional
              operation
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              The make and model of bidirectional devices installed
            </span>
          </li>
        </ul>
        <p>
          For <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on existing
          installations with solar PV or battery storage, check whether the installed devices are
          bidirectional-rated. If unidirectional devices are found in the bidirectional current
          path, raise a C3 observation recommending replacement with bidirectional-rated devices.
        </p>
        <SEOAppBridge
          title="Certificates Reference A4:2026 Automatically"
          description="Elec-Mate certificates for solar PV, battery storage, and EV installations automatically reference BS 7671:2018+A4:2026."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Regulation530Page() {
  return (
    <GuideTemplate
      title="Regulation 530.3.201 BS 7671 | Bidirectional Devices"
      description="Complete guide to Regulation 530.3.201 from BS 7671:2018+A4:2026 (Amendment 4). Bidirectional vs unidirectional switching devices, impact on solar PV…"
      datePublished="2025-09-01"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Amendment 4"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Regulation 530.3.201
          <br />
          <span className="text-yellow-400">Bidirectional Devices — BS 7671 A4:2026</span>
        </>
      }
      heroSubtitle="Amendment 3 (A3:2024) to BS 7671 introduced Regulation 530.3.201, requiring designers and installers to take account of whether a unidirectional or bidirectional protective device is appropriate — and to follow any orientation marking on the device. This guide explains what it means, which installations are affected, and how to comply."
      readingTime={12}
      answerBox={answerBox}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Stay Current with BS 7671 Amendments"
      ctaSubheading="Elec-Mate certificates reference BS 7671:2018+A4:2026 automatically. Bidirectional device fields are built into solar PV and battery storage certificates. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
