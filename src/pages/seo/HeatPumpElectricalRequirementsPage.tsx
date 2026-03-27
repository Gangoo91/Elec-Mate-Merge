import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Wrench,
  Cable,
  ClipboardCheck,
  Thermometer,
  Leaf,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Heat Pump Electrical Requirements', href: '/guides/heat-pump-electrical-requirements' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'circuit-sizing', label: 'Circuit Sizing for ASHP' },
  { id: 'dno-notification', label: 'DNO Notification' },
  { id: 'immersion', label: 'Immersion Backup Circuit' },
  { id: 'ufh-controls', label: 'UFH Manifold and Controls' },
  { id: 'mcs-bus', label: 'MCS Certification and BUS Grant' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An air source heat pump (ASHP) requires a dedicated circuit sized to the compressor electrical input — typically 32A to 63A single-phase for a 5kW to 16kW output heat pump.',
  'Heat pumps do not export to the grid, so DNO G99 approval (for export above 3.68kW) does not apply. However, some DNOs require notification for large single-phase loads — check with the relevant DNO.',
  'An immersion heater backup circuit (typically 16A on a 2.5mm cable) is often included in the heat pump installation to provide domestic hot water when the heat pump is in defrost mode or under service.',
  'UFH (underfloor heating) manifold wiring for a heat pump system involves low-voltage wiring between zone valves, room thermostats, and the heat pump controller — a task that requires careful coordination with the plumber.',
  'MCS (Microgeneration Certification Scheme) certification is required for the heat pump installer for the homeowner to access the Boiler Upgrade Scheme (BUS) grant — currently up to £7,500 for an ASHP.',
];

const faqs = [
  {
    question: 'What size circuit does an air source heat pump need?',
    answer:
      'The circuit size depends on the heat pump compressor electrical input, not the thermal output. A 5kW output ASHP with a COP of 3 has an electrical input of approximately 1.7kW — a 10A circuit is sufficient. A 12kW output ASHP with a COP of 3 has an electrical input of approximately 4kW — a 20A or 25A circuit is required. Larger ASHPs (16kW to 20kW output) may have electrical inputs of 5kW to 8kW, requiring a 32A or 40A single-phase circuit, or a three-phase connection. Always check the heat pump manufacturer\'s electrical specification before designing the circuit — the compressor rated current and the starting current (which may be significantly higher) are both relevant. Cable sizing must account for both the rated current and the voltage drop over the cable run from the consumer unit to the outdoor unit location.',
  },
  {
    question: 'Do I need to notify the DNO before installing an air source heat pump?',
    answer:
      'Heat pumps are consumers, not generators — they do not export electricity to the grid, so DNO G99 (generation above 3.68kW) does not apply. However, a large ASHP (over 16A single-phase continuous load) may trigger a DNO load notification requirement under the Distribution Code or the specific DNO\'s connection agreement. In practice, most domestic ASHPs up to 12kW output can be connected without DNO pre-approval, but it is good practice to notify the local DNO for larger installations. Check the DNO\'s self-connection criteria for your region — these are available on the DNO website. Always confirm that the existing supply fuse (typically 60A, 80A, or 100A) has adequate capacity for the additional ASHP load.',
  },
  {
    question: 'Why is MCS certification needed for the Boiler Upgrade Scheme?',
    answer:
      'The Boiler Upgrade Scheme (BUS) grant — currently up to £7,500 for an air source heat pump — is administered by Ofgem and is available only where the heat pump is installed by an MCS-certified installer using MCS-certified products. MCS (Microgeneration Certification Scheme) certification provides quality assurance for the installation — the installer must follow MCS installation standards, use products on the MCS product register, and issue an MCS certificate to the homeowner. Without MCS certification, the homeowner cannot claim the BUS grant. Electricians working on heat pump installations do not need to be MCS-certified independently — MCS certification applies to the heat pump installer (typically a heating engineer or specialist renewables company) who takes overall responsibility for the system. The electrical sub-contractor installs the dedicated circuit and issues an EIC, but the MCS certificate is issued by the lead installer.',
  },
  {
    question: 'Does an air source heat pump require a three-phase supply?',
    answer:
      'Most domestic ASHPs (up to approximately 16kW output) operate on a single-phase 230V supply. Larger commercial or industrial heat pumps may require a three-phase supply. For a domestic installation, it is unusual to need three-phase for the heat pump alone — but if the property already has three-phase and has a large ASHP (12kW to 20kW output), three-phase connection may be more practical and allows better load balancing. If a property needs a three-phase supply upgraded or installed to accommodate a heat pump, this is a significant additional cost (£1,500 to £5,000+ for the DNO service connection upgrade) and requires a new consumer unit or distribution board.',
  },
  {
    question: 'What is the immersion heater backup circuit for?',
    answer:
      'Most heat pump hot water cylinders (typically a Samsung, Vaillant, or Mitsubishi Ecodan-compatible cylinder) include an electric immersion heater element as a backup. The immersion heater is used: (a) during defrost cycles when the heat pump is temporarily unable to heat the cylinder, (b) during servicing or maintenance of the heat pump, (c) to reach pasteurisation temperature for Legionella protection (typically a weekly anti-Legionella cycle at 60°C, which most heat pumps cannot reach in cold weather). The immersion heater is typically 3kW and requires a dedicated 16A circuit on 2.5mm cable with a switched fused connection unit (SFCU) at the cylinder and appropriate labelling. The heat pump controller usually manages the immersion heater automatically via a relay output.',
  },
  {
    question: 'How are UFH zone valves wired for a heat pump system?',
    answer:
      'A heat pump system with underfloor heating typically uses wet UFH (warm water circulated through pipes in the floor) rather than electric UFH. The wiring involved is low-voltage controls wiring — room thermostats (typically 24V or 230V), zone valve actuators on the UFH manifold, and wiring back to the heat pump controller or a separate heating controls hub. The electrician installs the wiring between room thermostats and the manifold, and from the manifold to the heat pump controller. The zone valves are typically 24V or 230V motorised valves that open and close based on the room thermostat demand signal. The wiring diagram for the heat pump controls is supplied by the heat pump manufacturer — follow it precisely and commission the controls according to the manufacturer procedure.',
  },
  {
    question: 'What certificates are required for a heat pump electrical installation?',
    answer:
      'An Electrical Installation Certificate (EIC) must be issued for the heat pump dedicated circuit and any other new circuits (immersion heater, UFH controls wiring). The EIC covers the work carried out by the electrician — the electrical connections, cable sizing, protection, earthing and bonding, and test results. The heat pump installer (if MCS-certified) issues a separate MCS installation certificate that covers the whole system (heat pump, cylinder, controls, commissioning). The homeowner needs both documents: the EIC for the electrical work (and Part P compliance) and the MCS certificate for the BUS grant application.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size the dedicated circuit cable for ASHP compressor supply including starting current considerations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for heat pump circuits on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote heat pump electrical packages including dedicated circuit, immersion, and controls wiring.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/electric-underfloor-heating-cost',
    title: 'Electric Underfloor Heating Cost',
    description: 'Electric UFH as an alternative to wet UFH for heat pump systems.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/battery-storage-installation',
    title: 'Battery Storage Installation Guide',
    description: 'Pair heat pump with battery storage for smart tariff optimisation.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'EV charger and heat pump frequently installed together — manage supply capacity.',
    icon: Cable,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Heat Pump Electrical Requirements: What UK Electricians Need to Know',
    content: (
      <>
        <p>
          Air source heat pumps (ASHPs) are the central technology in the UK's heat decarbonisation
          programme. Government grant funding (the Boiler Upgrade Scheme), rising gas prices, and
          the heat pump installation target of 600,000 per year by 2028 mean that heat pump
          electrical work is a significant and growing opportunity for UK electricians.
        </p>
        <p>
          The electrician's role in a heat pump installation typically covers: the dedicated circuit
          from the consumer unit to the outdoor unit, the immersion heater backup circuit to the
          hot water cylinder, the controls wiring for UFH zone valves and room thermostats, and the
          testing and certification of all electrical work under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
        <p>
          This guide covers circuit sizing, DNO notification, immersion backup circuits, UFH
          controls wiring, MCS certification and the BUS grant, and the testing and certification
          requirements for heat pump electrical installations.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-sizing',
    heading: 'Circuit Sizing for Air Source Heat Pumps',
    content: (
      <>
        <p>
          The dedicated circuit for an ASHP must be sized for the compressor electrical input, not
          the thermal output. The COP (Coefficient of Performance) determines the relationship
          between thermal output and electrical input:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5kW to 8kW output ASHP (COP 3)</strong> — electrical input 1.7kW to 2.7kW.
                Recommended circuit: 16A RCBO, 2.5mm twin and earth. Maximum cable run approximately
                30m before voltage drop requires 4mm upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10kW to 12kW output ASHP (COP 3)</strong> — electrical input 3.3kW to 4kW.
                Recommended circuit: 20A to 25A RCBO, 4mm twin and earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>16kW to 20kW output ASHP (COP 3)</strong> — electrical input 5.3kW to
                6.7kW. Recommended circuit: 32A to 40A RCBO, 6mm twin and earth. Verify starting
                current with manufacturer — may require a time-delay device at the consumer unit
                if starting current is high.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always request the electrical specification sheet from the heat pump manufacturer before
          sizing the circuit. The rated current, maximum current, and starting current are all
          relevant. Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to confirm the cable size for the actual run length from the consumer unit to the outdoor
          unit position.
        </p>
        <SEOAppBridge
          title="Size heat pump circuits and quote electrical packages"
          description="Elec-Mate's cable sizing calculator and quoting app help UK electricians design and price heat pump electrical packages. Get the circuit sizing right on the survey, not after installation. 7-day free trial."
          icon={Leaf}
        />
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'DNO Notification for Heat Pump Installations',
    content: (
      <>
        <p>
          Heat pumps consume electricity — they do not generate or export. This means that the DNO
          notification requirements that apply to solar PV and battery storage (G98, G99) do not
          directly apply. However, there are still DNO considerations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply fuse capacity</strong> — the existing DNO supply fuse (typically
                60A, 80A, or 100A) must have adequate capacity for the additional ASHP load. For
                a house with an existing 60A fuse, adding a 10kW ASHP (4kW electrical input) on
                top of the existing heating, hot water, and general loads may approach or exceed
                the fuse capacity during a cold snap. Assess the maximum demand carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO load notification</strong> — some DNOs require notification of new
                large loads connected to the LV network. Check the relevant DNO's guidance for
                your region. EDF Energy, National Grid, and UKPN all have self-connection
                criteria — large single-phase loads over 11kVA may require notification.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'immersion',
    heading: 'Immersion Heater Backup Circuit',
    content: (
      <>
        <p>
          Heat pump cylinders include a 3kW immersion heater element as a backup. The electrical
          installation for the immersion heater must include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — a 16A circuit on 2.5mm twin and earth from
                the consumer unit to the cylinder position, with a switched fused connection unit
                (SFCU) adjacent to the cylinder. The SFCU allows local isolation for maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Anti-Legionella cycle</strong> — the heat pump controller typically manages
                a weekly anti-Legionella cycle at 60°C, activating the immersion heater. This must
                be enabled during commissioning — confirm with the heat pump engineer that the
                anti-Legionella function is active and that the immersion element is correctly
                wired to the controller relay output.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labelling</strong> — label the SFCU and the consumer unit MCB/RCBO clearly:
                "Immersion Heater — Heat Pump Backup". This helps the homeowner and future
                electricians understand the function of the circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ufh-controls',
    heading: 'UFH Manifold and Zone Controls Wiring',
    content: (
      <>
        <p>
          Where the heat pump heats the property via underfloor heating (wet UFH), the controls
          wiring is a significant element of the electrical installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Room thermostats</strong> — one per heating zone (typically one per room
                or floor). The thermostat signals demand to the manifold zone valve actuator or
                to the heating controls hub. Wire according to the heat pump manufacturer's controls
                schematic — wiring conventions vary between brands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manifold zone valve actuators</strong> — motorised actuators (typically
                24V or 230V) fitted to the manifold ports. They open or close to allow or prevent
                flow to each zone based on the room thermostat signal. Actuators must be wired in
                accordance with the manifold manufacturer's wiring diagram.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat pump enable signal</strong> — when at least one zone calls for heat,
                a demand signal (volt-free contact or specific signal type depending on the heat
                pump brand) is sent to the heat pump controller to start the compressor. Coordinate
                the wiring of this signal with the heat pump installer.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The controls wiring for a heat pump UFH system is low-voltage and is excluded from the
          BS 7671 EIC scope in terms of circuit testing, but the mains supply to the controls hub
          or room thermostats (if mains-powered) is included in the EIC scope.
        </p>
      </>
    ),
  },
  {
    id: 'mcs-bus',
    heading: 'MCS Certification and the Boiler Upgrade Scheme',
    content: (
      <>
        <p>
          The Boiler Upgrade Scheme (BUS) provides a grant of up to £7,500 for an ASHP installation
          (2024/25 rates — check GOV.UK for current rates). To access the grant:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS-certified installer</strong> — the heat pump installer must be
                MCS-certified and must install an MCS-registered heat pump product. The
                electrician sub-contractor does not need to be MCS-certified — their role is
                to supply the EIC for the electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EPC requirement</strong> — the property must have an Energy Performance
                Certificate (EPC) with a rating of A to D (not E, F, or G) to be eligible for the
                BUS grant. The EPC must be current (less than 10 years old). If the property has
                a low EPC rating, insulation improvements may be required before the heat pump
                installation proceeds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant application</strong> — the MCS-certified installer applies for the
                BUS grant on behalf of the homeowner before installation begins. The grant is
                deducted from the installation cost — the homeowner pays the net price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The electrical installation for a heat pump must be tested and certified in accordance
          with BS 7671. The test schedule for the dedicated ASHP circuit includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductor (CPC) from MET to heat pump enclosure earth terminal</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance (500V DC, minimum 1 megohm) — with the heat pump disconnected at the local isolator</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity at the local isolator and at the heat pump supply terminals</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) at the heat pump supply terminals</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation on the ASHP circuit RCBO (30mA, maximum 300ms trip time)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Functional test — energise the ASHP and verify that the compressor starts and runs correctly</span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          must be issued covering all new circuits. The EIC should note the heat pump model,
          the dedicated circuit rating, and the local isolator position. A copy of the EIC is
          provided to the MCS-certified heat pump installer for inclusion in the commissioning
          documentation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Growing Your Heat Pump Business',
    content: (
      <>
        <p>
          Heat pump installations are a growing market and the electrical package — dedicated circuit,
          immersion backup, and controls wiring — is typically worth £500 to £1,500 per installation
          as a sub-contract element. Building relationships with MCS-certified heat pump installers
          generates recurring referrals.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Check Supply Capacity First</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before agreeing to connect the heat pump, check the DNO supply fuse rating and
                  the existing consumer unit maximum demand. If the supply fuse is undersized for
                  the additional ASHP load, a supply fuse upgrade is required — this involves the
                  DNO and takes time. Flag this on the survey to avoid programme delays.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EIC Promptly</h4>
                <p className="text-white text-sm leading-relaxed">
                  The heat pump installer needs the EIC to complete their MCS commissioning
                  documentation and to register the BUS grant. A prompt EIC — issued the same day
                  using the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    EIC Certificate app
                  </SEOInternalLink>{' '}
                  — makes you the preferred electrical sub-contractor for heat pump installers who
                  care about their customer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify heat pump electrical installations"
          description="Join 430+ UK electricians using Elec-Mate for heat pump circuit sizing, professional quoting, and on-site EIC certification. Everything needed for heat pump electrical sub-contract work. 7-day free trial."
          icon={Leaf}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HeatPumpElectricalRequirementsPage() {
  return (
    <GuideTemplate
      title="Heat Pump Electrical Requirements UK | ASHP Circuit Sizing and Installation"
      description="Complete guide to air source heat pump electrical requirements in the UK. ASHP circuit sizing (32A–63A), DNO notification, immersion backup circuit, UFH zone controls, MCS certification, and BUS grant up to £7,500."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Leaf}
      heroTitle={
        <>
          Heat Pump Electrical Requirements:{' '}
          <span className="text-yellow-400">ASHP Circuits, Controls and MCS</span>
        </>
      }
      heroSubtitle="Air source heat pumps require a dedicated circuit sized to the compressor input, typically 32A to 63A. This guide covers ASHP circuit sizing, DNO notification, immersion backup circuits, UFH zone controls wiring, MCS certification, and the Boiler Upgrade Scheme grant."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Heat Pump Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Heat Pump Electrical Installations"
      ctaSubheading="Elec-Mate gives UK electricians cable sizing, professional quoting, and on-site EIC certification for heat pump electrical sub-contract work. 7-day free trial, cancel anytime."
    />
  );
}
