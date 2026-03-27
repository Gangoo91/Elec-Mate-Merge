import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Wind,
  PoundSterling,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Air Source Heat Pump Electrical', href: '/guides/air-source-heat-pump-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'ASHP Electrical Overview' },
  { id: 'supply-requirements', label: 'Electrical Supply Requirements' },
  { id: 'circuit-design', label: 'Circuit Design and Sizing' },
  { id: 'outdoor-unit-wiring', label: 'Outdoor Unit Cable Routing' },
  { id: 'controller-wiring', label: 'Controller and Zone Wiring' },
  { id: 'backup-immersion', label: 'Backup Immersion Heater Circuit' },
  { id: 'mcs-bus-grant', label: 'MCS Certification and BUS Grant' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'costs', label: 'Typical Electrical Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most domestic air source heat pumps draw 3 to 6kW and run on a single-phase supply with a dedicated 20A or 32A circuit from the consumer unit. Larger systems (above 8kW) or properties with existing high electrical demand may require a three-phase supply upgrade.',
  'The outdoor unit requires UV-resistant, weather-rated cable (typically SWA or armoured) run from the consumer unit to the external mounting position. Cable sizing must account for the compressor starting current, which can be 3 to 5 times the running current.',
  'A dedicated MCB or RCBO is required for the heat pump circuit. Type C MCBs are typically specified to accommodate the compressor inrush current without nuisance tripping.',
  'MCS (Microgeneration Certification Scheme) certification is mandatory for the installer if the homeowner wants to claim the Boiler Upgrade Scheme (BUS) grant of up to £7,500.',
  'Typical electrical installation costs for an ASHP range from £500 to £1,500, covering the dedicated circuit, outdoor cable run, controller wiring, backup immersion circuit, and certification.',
];

const faqs = [
  {
    question: 'Does an air source heat pump need a dedicated electrical circuit?',
    answer:
      'Yes. An air source heat pump must have its own dedicated circuit from the consumer unit, protected by an appropriately rated MCB or RCBO. The circuit must not be shared with other appliances. A typical domestic ASHP (3 to 6kW) requires a 20A or 32A circuit depending on the unit full load current and starting current. The manufacturer installation manual specifies the exact circuit rating required. The circuit must include a local isolator adjacent to the outdoor unit for safe servicing.',
  },
  {
    question: 'Do I need a three-phase supply for an air source heat pump?',
    answer:
      'Most domestic ASHPs up to about 8kW run on a single-phase supply. The key consideration is whether the existing supply has sufficient capacity for the heat pump in addition to the existing loads. A typical UK domestic single-phase supply has a 60A or 80A main fuse (sometimes 100A). If the heat pump draws 25A at full load and the existing peak demand is already 50A, the combined demand may exceed the supply capacity — in which case either a supply upgrade (to 100A single-phase) or a three-phase supply is needed. Larger ASHPs (above 10kW), particularly those serving bigger properties, are often three-phase models. Check the DNO supply capacity before quoting.',
  },
  {
    question: 'Why is a Type C MCB recommended for heat pump circuits?',
    answer:
      'Air source heat pump compressors have a high starting (inrush) current — typically 3 to 5 times the normal running current. A Type B MCB (which trips at 3 to 5 times rated current) may nuisance-trip on compressor start-up. A Type C MCB (which trips at 5 to 10 times rated current) accommodates the inrush without tripping, while still providing overcurrent protection. The manufacturer installation manual specifies the required MCB type and rating. If in doubt, use the manufacturer recommendation.',
  },
  {
    question: 'What cable type should I use for the outdoor unit?',
    answer:
      'The cable from the consumer unit (or local isolator) to the outdoor heat pump unit must be suitable for outdoor installation. Steel Wire Armoured (SWA) cable is the standard choice — it provides mechanical protection and UV resistance. If the cable run is entirely indoors and through conduit, standard twin and earth may be acceptable, but the final section to the outdoor unit must be suitably protected. The cable must be UV-resistant if exposed to sunlight. The cable size is determined by the full load current, starting current, voltage drop, and installation method. A typical 5kW single-phase ASHP requires 4.0mm or 6.0mm SWA depending on the cable run length.',
  },
  {
    question: 'Does the backup immersion heater need its own circuit?',
    answer:
      'Most ASHP installations include a backup immersion heater in the hot water cylinder (either as part of the cylinder or as a separate element). If the immersion heater is 3kW (the standard domestic rating), it draws approximately 13A and requires its own dedicated circuit — typically a 16A MCB with 2.5mm cable, or a 20A MCB with 2.5mm cable for longer runs. The immersion heater circuit is separate from the heat pump circuit. Some systems also include a supplementary electric heater (often called a booster or weather compensation heater) integrated into the heat pump unit — this is powered from the heat pump circuit and does not need a separate supply.',
  },
  {
    question: 'What is the BUS grant and how does it affect the electrician?',
    answer:
      'The Boiler Upgrade Scheme (BUS) provides a government grant of up to £7,500 towards the cost of an air source heat pump installation (£5,000 for biomass boilers). To qualify, the installation must be carried out by an MCS-certified installer using MCS-certified equipment, and the property must have a valid EPC. The electrician does not need to be MCS-certified themselves if they are working as a subcontractor to an MCS-certified heating installer, but the electrical work must comply with BS 7671 and be covered by an EIC. If you are the lead installer, you need MCS certification to access the grant for your customers.',
  },
  {
    question: 'What testing is required after the electrical installation?',
    answer:
      'The electrical installation for an ASHP must be tested in accordance with BS 7671. This includes continuity of protective conductors, insulation resistance (500V DC, minimum 1 megohm), polarity, earth fault loop impedance on the heat pump circuit and immersion heater circuit, and RCD/RCBO operation if applicable. An Electrical Installation Certificate (EIC) must be issued for the new circuits. The certificate should note the heat pump installation and reference the manufacturer and model. If a consumer unit modification was required (such as adding ways or upgrading the board), a full EIC for the consumer unit is appropriate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ground-source-heat-pump-electrical',
    title: 'Ground Source Heat Pump Electrical',
    description:
      'Ground source systems have higher power demands and often require three-phase supplies.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size the dedicated circuit cable for heat pump installations with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on longer cable runs to outdoor heat pump units.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for heat pump installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/battery-storage-installation',
    title: 'Battery Storage Installation',
    description:
      'Battery storage paired with heat pumps and solar PV maximises self-consumption and reduces running costs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
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
    heading: 'Air Source Heat Pump Electrical Installation: What Electricians Need to Know',
    content: (
      <>
        <p>
          Air source heat pumps (ASHPs) are the leading low-carbon heating technology in the UK. With
          the government phasing out new gas boiler installations and providing grants of up to £7,500
          through the Boiler Upgrade Scheme, ASHP installations are growing rapidly — and every one
          of them needs electrical work.
        </p>
        <p>
          The electrical scope of an ASHP installation typically includes a dedicated circuit from the
          consumer unit to the outdoor unit, cable routing through the property, a local isolator
          adjacent to the outdoor unit, controller wiring, and often a backup immersion heater
          circuit. This is distinct from the heating and plumbing work (which is carried out by the
          MCS-certified heating installer) and represents a significant revenue stream for
          electricians.
        </p>
        <p>
          This guide covers the electrical supply requirements, circuit design, cable routing,
          controller wiring, regulations, MCS considerations, and typical costs.
        </p>
      </>
    ),
  },
  {
    id: 'supply-requirements',
    heading: 'Electrical Supply Requirements: Single Phase vs Three Phase',
    content: (
      <>
        <p>
          The first consideration is whether the existing electrical supply can accommodate the heat
          pump. Most domestic ASHPs draw 3 to 6kW at full load, which equates to 13 to 26A on a
          single-phase 230V supply.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Single Phase (Most Homes)</h3>
            <p className="text-white text-sm leading-relaxed">
              Suitable for ASHPs up to approximately 8kW. The existing single-phase supply must
              have sufficient spare capacity — check the main fuse rating (typically 60A, 80A, or
              100A) and the peak demand of the existing installation. A 5kW ASHP on a 100A supply
              with moderate existing demand is straightforward. On a 60A supply with an electric
              shower and EV charger already installed, a supply upgrade may be needed.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Three Phase (Larger Systems)</h3>
            <p className="text-white text-sm leading-relaxed">
              Required for larger ASHPs (above 8 to 10kW) and for properties where the single-phase
              supply cannot accommodate the additional load. Three-phase ASHPs distribute the load
              across three phases, reducing the current per phase. A three-phase supply upgrade
              involves a DNO application and can take 8 to 16 weeks. Factor this into the project
              timeline and quote the supply upgrade separately.
            </p>
          </div>
        </div>
        <p>
          Always carry out a{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">
            maximum demand assessment
          </SEOInternalLink>{' '}
          during the site survey to confirm the existing supply is adequate. If the supply needs
          upgrading, inform the customer early — it adds cost and time to the project.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-design',
    heading: 'Circuit Design and Sizing',
    content: (
      <>
        <p>
          The heat pump outdoor unit requires a dedicated radial circuit from the consumer unit.
          The circuit design must account for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full load current</strong> — the manufacturer specifies the full load
                current (FLC) for the compressor and any integrated electric heaters. A typical 5kW
                single-phase ASHP draws 20 to 22A at full load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Starting current</strong> — compressor inrush current is typically 3 to 5
                times the FLC. This determines the MCB type (Type C recommended) and influences
                cable sizing if the cable run is long.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — size the cable for the FLC, applying correction
                factors for ambient temperature, grouping, and installation method per BS 7671
                Appendix 4. A typical 5kW ASHP on a 15m cable run requires 4.0mm or 6.0mm SWA.
                Check voltage drop does not exceed 5% (or the manufacturer specified maximum).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB/RCBO selection</strong> — Type C MCB or RCBO, rated to suit the cable
                and the manufacturer specification. Typically 20A or 32A for domestic ASHPs. Type A
                RCD protection is normally sufficient unless the manufacturer specifies Type B.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolator</strong> — a switched isolator must be installed adjacent to
                the outdoor unit (within sight, typically within 2m) to allow safe servicing. The
                isolator must be lockable and rated for the full load current.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to determine the correct cable size for the specific installation, accounting for all
          relevant correction factors and voltage drop.
        </p>
      </>
    ),
  },
  {
    id: 'outdoor-unit-wiring',
    heading: 'Outdoor Unit Cable Routing',
    content: (
      <>
        <p>
          The cable route from the consumer unit to the outdoor heat pump unit is often the most
          labour-intensive part of the electrical installation. Planning the route during the site
          survey avoids surprises on installation day.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable type</strong> — SWA (Steel Wire Armoured) cable is the standard
                choice for runs that pass through external walls or are exposed externally. The
                armour provides mechanical protection and the cable is UV-resistant. For short runs
                entirely within the building, standard twin and earth in conduit may be acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall penetrations</strong> — core through external walls with a slight
                downward slope to prevent water ingress. Seal the penetration with fire-rated
                intumescent sealant. Use a gland on the SWA cable at the outdoor unit isolator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum cable lengths</strong> — some ASHP manufacturers specify a minimum
                interconnection cable length (to provide a minimum circuit impedance for the
                compressor soft-start). Check the installation manual — running a shorter cable than
                specified can cause compressor protection trips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Segregation</strong> — keep the power cable separated from any
                communications or control cables by at least 50mm (or as specified by the
                manufacturer) to avoid electromagnetic interference.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'controller-wiring',
    heading: 'Controller and Zone Wiring',
    content: (
      <>
        <p>
          Most ASHP systems include a controller that manages heating zones, hot water production,
          and weather compensation. The controller wiring is typically low-voltage signal cabling,
          but the electrician must connect it correctly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Room thermostat</strong> — wired or wireless connection to the ASHP
                controller. If replacing an existing boiler, the existing thermostat wiring may be
                reusable. Wireless thermostats avoid new cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone valves</strong> — motorised zone valves (typically 230V) control the
                flow of hot water to different heating zones. The electrician wires the zone valves
                to the ASHP controller wiring centre. Follow the manufacturer wiring diagram
                exactly — incorrect zone valve wiring is one of the most common commissioning faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor temperature sensor</strong> — mounted on a north-facing wall
                (shaded from direct sunlight) and wired back to the controller. This enables weather
                compensation — the system adjusts the flow temperature based on the outdoor
                temperature for maximum efficiency. The sensor cable is typically 2-core signal cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flow sensor</strong> — some systems require a flow temperature sensor on the
                heating flow pipe, wired to the controller. This is a low-voltage connection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'backup-immersion',
    heading: 'Backup Immersion Heater Circuit',
    content: (
      <>
        <p>
          Most ASHP systems heat domestic hot water via a hot water cylinder. A backup immersion
          heater is installed in the cylinder to provide hot water if the heat pump is off (for
          servicing) or during periods of extreme cold when the heat pump alone cannot maintain the
          required water temperature.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heater rating</strong> — standard domestic immersion heaters are
                3kW (13A at 230V). Some cylinders have two immersion heaters — an upper (for quick
                boost) and a lower (for full cylinder heating). Each requires its own circuit if they
                can operate simultaneously, or a single circuit if interlocked.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — a 16A or 20A MCB with 2.5mm twin and earth
                cable is the standard arrangement for a 3kW immersion heater. The circuit must
                include a local switched fused connection unit (FCU) or double-pole switch adjacent
                to the cylinder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timer control</strong> — the immersion heater is typically controlled by the
                ASHP controller (which energises it only when the heat pump cannot meet demand) or by
                a separate time clock. If the customer has a smart tariff, the immersion heater can
                be scheduled to run during off-peak hours for additional savings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs-bus-grant',
    heading: 'MCS Certification and the Boiler Upgrade Scheme (BUS) Grant',
    content: (
      <>
        <p>
          The Boiler Upgrade Scheme (BUS) provides a government grant of up to £7,500 towards the
          cost of an air source heat pump installation. This grant has made ASHPs financially
          competitive with gas boilers and is driving the growth in installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certification required</strong> — the lead installer must be
                MCS-certified to access the BUS grant. MCS covers the design, installation, and
                commissioning of the heat pump system. Electricians working as subcontractors to an
                MCS-certified heating installer do not need their own MCS certification for the
                electrical work, but the work must comply with BS 7671 and be certificated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EPC requirement</strong> — the property must have a valid Energy Performance
                Certificate (EPC) with no outstanding loft or cavity wall insulation recommendations
                (or evidence that insulation is not feasible). The EPC must be in place before the
                BUS application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — the MCS installer must provide a heat loss
                calculation, system design, commissioning record, and handover documentation. The
                electrician's EIC is part of this documentation package.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are considering becoming an MCS-certified ASHP installer (rather than just the
          electrical subcontractor), you need training in heat pump system design and installation,
          plus MCS registration via a certification body such as NICEIC, NAPIT, or Elmhurst.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Standards',
    content: (
      <>
        <p>
          The electrical installation for an air source heat pump must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and the manufacturer installation manual. Key regulations from the RAG intelligence
          include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 542.1.3</strong> — covers earthing arrangements for electric
                heating systems and heat pumps, including protective bonding, RCD selection and
                discrimination, avoidance of nuisance trips, and verification of earth continuity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 710.415.2.1</strong> — addresses residual currents from electric
                heating equipment (including heat pumps) returning via protective conductors, with
                implications for main protective bonding conductor sizing and RCD coordination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 704.537</strong> — requires local service isolators for heating
                circuits and heat pumps to permit safe servicing without isolating unrelated circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 512.1.3</strong> — electric heating controls, thermostats, and
                motorised valves must match the declared frequency rating to ensure accurate control
                and safe operation with heat pumps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 753.522.1.3</strong> — in plant rooms, consider increased ambient
                temperatures from heat pumps and compressors when specifying cables and control
                wiring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The installation is notifiable under Part P of the Building Regulations (new circuit from
          the consumer unit). Notify through your competent person scheme (NICEIC, NAPIT, etc.) or
          via Building Control.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrical Costs: £500 to £1,500',
    content: (
      <>
        <p>
          The electrical installation cost varies depending on the complexity of the cable route,
          the distance from the consumer unit to the outdoor unit, and whether the consumer unit
          needs modification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (£500 to £800)</strong> — consumer unit adjacent to the
                outdoor unit location, short cable run (under 10m), no consumer unit upgrade needed,
                no immersion heater circuit. Straightforward SWA run through one wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (£800 to £1,200)</strong> — 10 to 20m cable run, one
                or two wall penetrations, local isolator, backup immersion heater circuit, zone
                valve wiring, and controller connections. This is the most common scope for a
                domestic ASHP.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (£1,200 to £1,500+)</strong> — long cable run (20m+),
                consumer unit upgrade or additional ways needed, multiple zone valve circuits,
                external cable routing with SWA and glands, three-phase connection, or supply
                capacity issues requiring DNO application.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These costs are for the electrical work only — the heat pump unit, cylinder, pipework, and
          plumbing are separate. When quoting, itemise the electrical scope clearly so the MCS
          installer and homeowner can see exactly what is included.
        </p>
        <SEOAppBridge
          title="Quote ASHP electrical work accurately"
          description="Elec-Mate's quoting app lets you itemise dedicated circuits, SWA cable runs, isolators, immersion circuits, and controller wiring. Professional PDF quotes sent from the survey."
          icon={Wrench}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Growing Your Heat Pump Business',
    content: (
      <>
        <p>
          Air source heat pump installations are one of the fastest-growing segments of domestic
          electrical work. Every ASHP needs electrical work, and the typical value of £500 to £1,500
          per installation makes it a reliable revenue stream — particularly when you build
          relationships with MCS-certified heating installers who subcontract the electrical work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the dedicated ASHP circuit with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Account for compressor starting current, cable run length, and installation
                  method. Get it right on the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price ASHP electrical work with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Dedicated circuit, SWA, isolator, immersion, controller wiring — all itemised.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate for the ASHP circuits on site.
                  AI board scanning, voice test entry, and instant PDF export for the MCS
                  documentation package.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify heat pump electrical work"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for heat pump electrical installations. 7-day free trial."
          icon={Wind}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AirSourceHeatPumpElectricalPage() {
  return (
    <GuideTemplate
      title="Air Source Heat Pump Electrical Installation | Guide UK"
      description="Complete guide to air source heat pump electrical installation in the UK. Supply requirements, circuit sizing, dedicated MCB/RCBO, outdoor unit cable routing, controller wiring, backup immersion circuit, MCS certification, BUS grant, and typical electrical costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emerging Technology"
      badgeIcon={Wind}
      heroTitle={
        <>
          Air Source Heat Pump Electrical Installation:{' '}
          <span className="text-yellow-400">UK Electrician Guide</span>
        </>
      }
      heroSubtitle="Every air source heat pump needs electrical work. This guide covers supply requirements, circuit sizing, outdoor unit cable routing, controller wiring, backup immersion circuits, MCS certification, BUS grant implications, and typical costs of £500 to £1,500."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Heat Pump Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Heat Pump Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for heat pump installations. 7-day free trial, cancel anytime."
    />
  );
}
