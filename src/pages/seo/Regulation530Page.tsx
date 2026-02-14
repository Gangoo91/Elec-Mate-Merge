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
  { id: 'amendment-3-context', label: 'BS 7671 Amendment 3 Context' },
  { id: 'bidirectional-vs-unidirectional', label: 'Bidirectional vs Unidirectional' },
  { id: 'solar-pv-impact', label: 'Impact on Solar PV Installations' },
  { id: 'battery-storage-impact', label: 'Impact on Battery Storage' },
  { id: 'practical-compliance', label: 'Practical Compliance' },
  { id: 'device-selection', label: 'Device Selection Guide' },
  { id: 'certification-requirements', label: 'Certification Requirements' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Regulation 530.3.201 was introduced by BS 7671:2018+A3:2024 (Amendment 3, issued 31 July 2024). It requires that switching devices installed in installations with bidirectional power flow must be rated for bidirectional operation or otherwise proven suitable.',
  'Bidirectional power flow occurs in installations with solar PV, battery storage, vehicle-to-grid (V2G) EV chargers, or other embedded generation where current can flow both from the supply to the installation and from the installation back to the supply.',
  'Standard MCBs and RCDs are designed and tested for unidirectional current flow only. Using a unidirectional device where bidirectional flow occurs may result in the device failing to operate correctly under fault conditions or failing to break the circuit safely.',
  'Manufacturers are now producing bidirectional-rated MCBs, RCBOs, and isolators specifically for solar PV, battery storage, and other prosumer installations. Check the device datasheet or IEC marking for bidirectional suitability.',
  'Elec-Mate solar PV and battery storage certificates include fields for confirming bidirectional device selection in compliance with Regulation 530.3.201. The app references A3:2024 requirements on relevant certificates.',
];

const faqs = [
  {
    question: 'What is Regulation 530.3.201 in BS 7671?',
    answer:
      'Regulation 530.3.201 is a new requirement introduced by Amendment 3 (A3:2024) to BS 7671:2018. It states that where an installation includes a source of supply that can cause current to flow in both directions through switching devices (bidirectional power flow), those switching devices must be suitable for bidirectional operation. This regulation was added specifically to address the growing number of installations with solar PV panels, battery energy storage systems, and vehicle-to-grid EV chargers, where power can flow from the installation back towards the supply network. The regulation ensures that protective and switching devices will function correctly regardless of the direction of current flow during both normal operation and fault conditions.',
  },
  {
    question: 'What is the difference between bidirectional and unidirectional devices?',
    answer:
      'A unidirectional switching device is designed and tested to interrupt current flowing in one direction only — from the supply to the load. Standard MCBs, RCBOs, and isolators are typically unidirectional. When current flows in the intended direction, the arc-quenching mechanism operates correctly and the device safely interrupts the circuit. A bidirectional device is designed and tested to interrupt current flowing in either direction — both from supply to load and from load to supply. The arc-quenching mechanism works equally well regardless of current direction. Bidirectional devices are marked accordingly on their rating plate or datasheet, often with a specific IEC symbol or the marking "bidirectional" in the technical documentation.',
  },
  {
    question: 'Does Amendment 3 apply to existing solar PV installations?',
    answer:
      'Amendment 3 (A3:2024) applies to new installations and alterations carried out after its publication date of 31 July 2024. It does not retrospectively require existing solar PV installations to be upgraded. However, during an EICR of an existing installation with solar PV, the inspector should note whether unidirectional devices are being used where bidirectional flow occurs. This might be raised as a C3 (improvement recommended) observation. If significant alterations are being made to an existing solar PV or battery storage installation, the altered parts should comply with the current edition of BS 7671 including Amendment 3. Any new switching devices installed as part of the alteration should be bidirectional-rated where bidirectional power flow is present.',
  },
  {
    question: 'Which devices in a solar PV installation need to be bidirectional?',
    answer:
      'In a solar PV installation, the devices that may experience bidirectional current flow depend on the system configuration. The AC isolator between the inverter and the consumer unit or distribution board must be suitable for bidirectional operation because current can flow from the inverter to the grid. Any MCB, RCBO, or RCD protecting the PV circuit on the AC side must be bidirectional-rated. The main switch of the consumer unit may also experience bidirectional flow if the PV system exports to the grid through the main distribution board. Devices on circuits that do not carry PV-generated current (such as a standard lighting or socket circuit) do not need to be bidirectional, provided they are not in the path of the exported current.',
  },
  {
    question: 'Where can I find A3:2024 and is it free?',
    answer:
      'BS 7671:2018+A3:2024 (Amendment 3) was issued on 31 July 2024 by the IET. Unlike the main standard (the "brown book"), Amendment 3 is available as a free PDF supplement from the IET website. It is not a full new edition — it is an amendment document that contains only the changed and added regulations. You need the base standard (BS 7671:2018+A2:2022) to use it, as the amendment cross-references the existing regulation structure. Amendment 3 adds Regulation 530.3.201 (bidirectional devices) along with some other minor clarifications. Amendment 4 is expected in 2026 and will likely incorporate larger changes.',
  },
  {
    question: 'Do V2G (vehicle-to-grid) EV chargers require bidirectional devices?',
    answer:
      'Yes. Vehicle-to-grid (V2G) chargers allow energy stored in an electric vehicle battery to be discharged back into the installation and potentially exported to the grid. This creates bidirectional power flow on the EV charging circuit. Under Regulation 530.3.201, the MCB or RCBO protecting the V2G charger circuit, the isolator for the charger, and any upstream switching devices in the path of the bidirectional current must be rated for bidirectional operation. Standard V2G charger installation guides from manufacturers now specify bidirectional-rated protective devices. Standard Mode 3 chargers that only charge the vehicle (unidirectional) do not create this requirement.',
  },
];

const relatedPages = [
  {
    href: '/guides/bs7671-amendment-3',
    title: 'BS 7671 Amendment 3',
    description: 'Complete overview of all changes in A3:2024.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
  {
    href: '/guides/bs7671-eighteenth-edition',
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
    href: '/guides/battery-storage-guide',
    title: 'Battery Storage Guide',
    description: 'Battery energy storage installation and certification.',
    icon: Battery,
    category: 'Guide' as const,
  },
  {
    href: '/tools/solar-pv-certificate',
    title: 'Solar PV Certificate',
    description: 'Digital solar PV installation certificate with A3:2024 compliance fields.',
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
          <SEOInternalLink href="/guides/bs7671-amendment-3">Amendment 3 (A3:2024)</SEOInternalLink>{' '}
          to BS 7671:2018. It addresses a specific safety concern: the use of switching and
          protective devices in installations where electrical current can flow in both directions
          through those devices.
        </p>
        <p>
          The regulation states that where an installation includes a source of energy that can
          cause current to flow from the installation towards the supply (bidirectional power flow),
          all switching devices in the path of that bidirectional current must be suitable for
          operation in both directions. This means the device must be able to safely make, carry,
          and break current regardless of whether it flows from supply to load or from load to
          supply.
        </p>
        <p>
          This regulation was added because the UK is seeing rapid growth in domestic and commercial
          installations that include embedded generation (solar PV), battery energy storage systems
          (BESS), and vehicle-to-grid (V2G) EV chargers. All of these technologies can cause current
          to flow "backwards" through devices that were historically designed only for
          unidirectional current flow.
        </p>
        <p>
          Prior to Amendment 3, there was no explicit regulation in BS 7671 requiring switching
          devices to be rated for bidirectional operation. Electricians and designers relied on
          manufacturer guidance and good practice, but there was no regulatory framework requiring
          it. Regulation 530.3.201 fills this gap.
        </p>
      </>
    ),
  },
  {
    id: 'amendment-3-context',
    heading: 'BS 7671 Amendment 3 (A3:2024) Context',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 was issued on 31 July 2024 by the IET. It is a supplementary
          amendment to the base standard (BS 7671:2018, commonly known as the 18th Edition) and to
          Amendment 2 (A2:2022). A3:2024 is available as a free PDF document from the IET website —
          it is not a new book.
        </p>
        <p>
          Amendment 3 is relatively small in scope compared to previous amendments. Its primary
          addition is Regulation 530.3.201 concerning bidirectional switching devices. It also
          includes some minor editorial corrections and clarifications to existing regulations.
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
              <span className="text-yellow-400 font-bold shrink-0">2024</span>
              <span className="text-white">
                Amendment 3 (A3:2024) — Regulation 530.3.201 (bidirectional devices)
              </span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-bold shrink-0">2026</span>
              <span className="text-white">Amendment 4 expected</span>
            </div>
          </div>
        </div>
        <p>
          The current full citation for the standard is BS 7671:2018+A3:2024. When referencing the
          standard on certificates and documentation, use this full citation to confirm compliance
          with the latest amendment. The{' '}
          <SEOInternalLink href="/guides/bs7671-eighteenth-edition">
            18th Edition guide
          </SEOInternalLink>{' '}
          covers the base standard in detail.
        </p>
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
          essential for compliance with Regulation 530.3.201.
        </p>
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
          The key devices that experience bidirectional current in a typical domestic solar PV
          installation are:
        </p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">AC isolator at the inverter</strong> — current
              flows from the inverter to the consumer unit. This device must be bidirectional as
              current flows through it in the generation direction.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">MCB or RCBO for the PV circuit</strong> — the
              protective device for the AC output circuit of the inverter carries bidirectional
              current. During generation, current flows from the inverter through this device to the
              consumer unit busbars.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Main switch</strong> — if the installation exports
              surplus PV generation to the grid, the main switch of the consumer unit carries
              bidirectional current (import and export). The main switch must be rated for
              bidirectional operation.
            </span>
          </li>
        </ul>
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
          <SEOInternalLink href="/guides/battery-storage-guide">battery storage</SEOInternalLink>{' '}
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
          title="A3:2024 Compliance on Certificates"
          description="Elec-Mate solar PV and battery storage certificates include fields for confirming bidirectional device selection per Regulation 530.3.201. The app references BS 7671:2018+A3:2024 on all relevant certificates, ensuring your documentation reflects the current standard."
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
          Major switchgear manufacturers now produce specific bidirectional-rated devices. Here is
          guidance on selecting the right devices for prosumer installations:
        </p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Main switches</strong> — look for main switches
              specifically marketed for prosumer or generation applications. Many consumer unit
              manufacturers now offer main switch versions rated for bidirectional operation. Check
              that the breaking capacity is rated in both directions.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">MCBs and RCBOs</strong> — some standard MCBs and
              RCBOs are already tested for bidirectional operation but not marketed as such. Contact
              the manufacturer to confirm. Dedicated bidirectional MCBs and RCBOs are available from
              Hager, Schneider, ABB, and others.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">AC isolators</strong> — rotary isolators for PV
              and battery installations should be specifically rated for the application.
              Solar-rated AC isolators from manufacturers such as IMO and Socomec are designed for
              bidirectional operation.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">RCDs</strong> — if an RCD is in the bidirectional
              current path, it must detect residual current in both directions. Most modern{' '}
              <SEOInternalLink href="/guides/rcd-types-explained">Type A RCDs</SEOInternalLink> are
              inherently bidirectional in their detection capability, but the switching mechanism
              must also be rated for bidirectional breaking.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'certification-requirements',
    heading: 'Certification Requirements',
    content: (
      <>
        <p>
          When issuing an <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink> for
          an installation with bidirectional power flow, the certificate should reference compliance
          with BS 7671:2018+A3:2024 (not just BS 7671:2018 or A2:2022). This confirms that the
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
          For <SEOInternalLink href="/guides/eicr-certificate">EICRs</SEOInternalLink> on existing
          installations with solar PV or battery storage, check whether the installed devices are
          bidirectional-rated. If unidirectional devices are found in the bidirectional current
          path, raise a C3 observation recommending replacement with bidirectional-rated devices.
        </p>
        <SEOAppBridge
          title="Certificates Reference A3:2024 Automatically"
          description="Elec-Mate certificates for solar PV, battery storage, and EV installations automatically reference BS 7671:2018+A3:2024. Bidirectional device confirmation fields are included on relevant certificate types, ensuring full compliance documentation."
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
      title="Regulation 530.3.201 BS 7671 | Bidirectional Devices Explained"
      description="Complete guide to Regulation 530.3.201 from BS 7671:2018+A3:2024 (Amendment 3). Bidirectional vs unidirectional switching devices, impact on solar PV, battery storage, and V2G EV charger installations. Compliance requirements and device selection for UK electricians."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Amendment 3"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Regulation 530.3.201
          <br />
          <span className="text-yellow-400">Bidirectional Devices — BS 7671 A3:2024</span>
        </>
      }
      heroSubtitle="Amendment 3 to BS 7671 introduces Regulation 530.3.201, requiring switching devices in installations with bidirectional power flow to be rated for bidirectional operation. This guide explains what it means, which installations are affected, and how to comply."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Stay Current with BS 7671 Amendments"
      ctaSubheading="Elec-Mate certificates reference BS 7671:2018+A3:2024 automatically. Bidirectional device fields are built into solar PV and battery storage certificates. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
