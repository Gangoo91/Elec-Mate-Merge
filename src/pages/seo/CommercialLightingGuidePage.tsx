import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Cable,
  GraduationCap,
  Calculator,
  Gauge,
  CheckCircle,
  Zap,
  ClipboardCheck,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Commercial Lighting', href: '/guides/commercial-lighting-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Commercial Lighting Overview' },
  { id: 'lux-levels', label: 'Lux Levels by Area (CIBSE LG7)' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Requirements' },
  { id: 'led-retrofits', label: 'LED Retrofit Projects' },
  { id: 'lighting-controls', label: 'Lighting Controls and Sensors' },
  { id: 'dali', label: 'DALI Protocol and Digital Lighting' },
  { id: 'compliance', label: 'Compliance and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Commercial Lighting Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'CIBSE Lighting Guide LG7 specifies minimum maintained illuminance levels for commercial premises: 500 lux for general office areas, 300 lux for circulation spaces, and 200 lux for storage areas.',
  'Emergency lighting must comply with BS 5266-1 and provide at least 1 lux along escape routes and 0.5 lux in open areas for a minimum of 3 hours.',
  'LED retrofit projects in commercial premises typically reduce energy consumption by 50-70% and are a major revenue stream for electricians, with payback periods of 2-4 years.',
  'DALI (Digital Addressable Lighting Interface) is the standard protocol for digital lighting control in commercial buildings, enabling individual luminaire addressing, dimming, and automated scene control.',
  'Elec-Mate calculators, circuit design tools, and certificates let electricians design, verify, and certify commercial lighting installations on site.',
];

const faqs = [
  {
    question: 'What lux level is required for a commercial office?',
    answer:
      'CIBSE Lighting Guide LG7 (Office Lighting) and the SLL Code for Lighting recommend a maintained illuminance of 500 lux on the working plane for general office areas where continuous desk-based tasks are performed. This is measured at the horizontal working plane, typically 720mm above finished floor level. The uniformity ratio (minimum illuminance divided by average illuminance) should be at least 0.6 for the task area and 0.4 for the immediate surrounding area. Other commercial areas have different requirements: circulation corridors require 100-200 lux, reception areas 200-300 lux, meeting rooms 300-500 lux, drawing offices and CAD workstations 500-750 lux, and retail showrooms 300-500 lux general with up to 1,000 lux on feature displays. These are minimum maintained levels — the actual installed lux will be higher initially, as luminaire output degrades over time (the maintenance factor).',
  },
  {
    question: 'What are the emergency lighting requirements for commercial buildings?',
    answer:
      'Emergency lighting in commercial premises must comply with BS 5266-1 (Code of Practice for Emergency Lighting) and the Regulatory Reform (Fire Safety) Order 2005. The system must provide: (1) at least 1 lux along the centre line of defined escape routes; (2) at least 0.5 lux in open areas (anti-panic lighting); (3) illumination of fire safety signs and fire fighting equipment locations; (4) minimum 3-hour duration from the battery backup; and (5) illumination within 5 seconds of mains failure. Emergency luminaires must be positioned at every change of direction, every exit door, every intersection, at stairway landings, and near fire alarm call points and fire extinguishers. The system requires monthly functional testing (briefly switching to battery mode) and annual 3-hour duration testing, with all tests documented in a log book. A BS 5266 emergency lighting certificate must be issued for new installations and periodic inspections.',
  },
  {
    question: 'How much can LED retrofits save on electricity bills?',
    answer:
      'LED retrofits typically reduce lighting energy consumption by 50 to 70 percent compared to fluorescent tube (T8 or T5) systems, and by 70 to 85 percent compared to older metal halide, sodium, or tungsten halogen fittings. For a typical 500m2 open-plan office with 200 recessed T8 fluorescent fittings (each consuming 72W with ballast losses), the total lighting load is approximately 14.4kW. Replacing these with LED panels consuming 30W each reduces the load to 6kW — a saving of 8.4kW. At 12 hours of operation per day, 250 working days per year, and an electricity cost of 30p/kWh, the annual saving is approximately £7,560. With a typical installation cost of £15,000 to £25,000 for materials and labour, the payback period is 2 to 3 years. Additional savings come from reduced maintenance (LED panels last 50,000 hours vs 15,000 for T8 tubes) and improved lighting quality (higher CRI, reduced flicker, uniform light distribution).',
  },
  {
    question: 'What is DALI and why is it used in commercial lighting?',
    answer:
      'DALI (Digital Addressable Lighting Interface) is a standardised digital communication protocol for lighting control, defined by IEC 62386. It allows individual luminaires (or groups of luminaires) to be addressed, dimmed, and switched via a two-wire control bus that runs alongside the mains supply. DALI is the dominant protocol for commercial lighting control because it offers several advantages over traditional switching: (1) individual luminaire control without needing separate switched circuits for each luminaire; (2) smooth dimming from 0.1% to 100% output; (3) daylight harvesting (automatic dimming based on ambient light sensors); (4) occupancy sensing (automatic on/off or dimming based on room occupancy); (5) scene setting (pre-programmed lighting scenes for different activities); and (6) centralised monitoring (fault reporting, energy logging, lamp hour tracking). DALI requires a DALI controller (gateway) connected to a building management system (BMS) or standalone lighting controller. Each DALI bus can address up to 64 luminaires (or 64 groups in DALI-2), and multiple buses can be networked together for large installations.',
  },
  {
    question: 'Do I need a fire alarm certificate for emergency lighting?',
    answer:
      'Emergency lighting has its own certification requirements separate from the fire alarm system. A new emergency lighting installation requires an Emergency Lighting Completion Certificate to BS 5266-1, which confirms the system design, installation, and commissioning comply with the standard. For existing systems, a Periodic Inspection and Test Certificate for Emergency Lighting is required at intervals recommended by the fire risk assessment (typically annually for the full 3-hour duration test). Emergency lighting certificates are different from the Electrical Installation Certificate (EIC) or EICR, although the electrical circuits supplying the emergency luminaires are included in the general electrical certification. Elec-Mate generates emergency lighting certificates on your phone, with the test schedule and compliance details pre-formatted.',
  },
  {
    question: 'What cable size is needed for commercial lighting circuits?',
    answer:
      'Commercial lighting circuits are typically wired in 1.5mm2 cable (for circuits up to 10A on a Type B MCB) or 2.5mm2 cable (for longer runs or higher loads). The cable size calculation follows standard BS 7671 methodology: determine the design current from the total luminaire load on the circuit, select the MCB rating, apply correction factors (ambient temperature, grouping, thermal insulation), and verify voltage drop. In commercial installations, lighting cables are often run in containment (trunking or cable tray) above a suspended ceiling, which means the installation reference method and grouping factors differ from domestic installations. The number of luminaires per circuit is limited by the MCB rating and the voltage drop limit. For a typical circuit of 30W LED panels on a 6A MCB with 1.5mm2 cable, you can connect approximately 20 luminaires per circuit (600W total) before reaching the current limit. Voltage drop on long runs in large commercial buildings is the limiting factor — always calculate before finalising the circuit design.',
  },
  {
    question: 'What regulations apply to commercial lighting installations?',
    answer:
      'Commercial lighting installations must comply with multiple regulatory frameworks: (1) BS 7671:2018+A3:2024 (IET Wiring Regulations) for all electrical aspects of the installation; (2) BS 5266-1 for emergency lighting design, installation, and testing; (3) The Building Regulations Part L (Conservation of Fuel and Power) for energy efficiency — new and refurbished commercial buildings must meet minimum lighting efficacy standards (typically 60-95 luminaire lumens per circuit watt depending on the space type); (4) The Regulatory Reform (Fire Safety) Order 2005 for emergency lighting as part of fire safety; (5) CIBSE Lighting Guides (particularly LG7 for offices) for lighting design standards; (6) The Workplace (Health, Safety and Welfare) Regulations 1992 for minimum lighting levels in workplaces. An Electrical Installation Certificate (EIC) is required for new circuits, and an EICR is required for periodic inspection of existing installations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for commercial lighting installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description: 'BS 5266 compliant emergency lighting certificates for commercial premises.',
    icon: AlertTriangle,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size commercial lighting circuits with full correction factors for containment and grouping.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Verify voltage drop on long commercial lighting circuit runs before installation.',
    icon: Gauge,
    category: 'Calculator',
  },
  {
    href: '/guides/eicr-for-commercial-premises',
    title: 'EICR for Commercial Premises',
    description: 'Periodic inspection requirements for commercial electrical installations.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study BS 7671:2018+A3:2024 with structured training modules on the Elec-Mate platform.',
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
    heading: 'Commercial Lighting Installation: What Electricians Need to Know',
    content: (
      <>
        <p>
          Commercial lighting installation is one of the highest-value areas of electrical work.
          From office fit-outs and retail refurbishments to warehouse LED upgrades and car park
          lighting, the scope and revenue potential is significantly greater than domestic work. The
          technical complexity is also higher — commercial lighting involves detailed lux-level
          design, emergency lighting compliance, digital control systems, and energy efficiency
          regulations.
        </p>
        <p>
          This guide covers the key technical areas that electricians need to understand for
          commercial lighting work: required lux levels by area type, emergency lighting standards,
          LED retrofit projects, lighting control systems including{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">DALI</SEOInternalLink>, and the
          certification and compliance requirements under BS 7671 and the Building Regulations.
        </p>
        <p>
          Whether you are fitting out a new office, upgrading a warehouse from fluorescent to LED,
          or designing a lighting control system for a retail space, this guide provides the
          technical foundation you need.
        </p>
      </>
    ),
  },
  {
    id: 'lux-levels',
    heading: 'Lux Levels by Area: CIBSE LG7 and the SLL Code',
    content: (
      <>
        <p>
          The Chartered Institution of Building Services Engineers (CIBSE) and the Society of Light
          and Lighting (SLL) publish lighting guides that specify the minimum maintained illuminance
          (in lux) for different types of commercial space. The most commonly referenced is CIBSE
          Lighting Guide LG7 for offices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General offices and open-plan workspaces:</strong> 500 lux on the working
                plane (720mm above floor level). Uniformity ratio of at least 0.6 in the task area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meeting and conference rooms:</strong> 300 to 500 lux, with dimming
                capability for presentations and video conferencing. Avoid direct glare on screens.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reception and entrance areas:</strong> 200 to 300 lux. Higher accent
                lighting on feature walls and signage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corridors and circulation areas:</strong> 100 to 200 lux. Consistent
                illumination with no dark spots.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warehouses and storage:</strong> 200 lux for general warehouse areas, 300
                lux for picking and packing zones, 500 lux for quality inspection areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retail showrooms:</strong> 300 to 500 lux general, up to 1,000 lux on
                display areas and feature products. Colour rendering index (CRI) of 80 or above,
                with 90+ for fashion and food retail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Car parks (covered):</strong> 75 lux general, 300 lux at entry and exit
                ramps, 100 lux at payment machines.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are minimum maintained levels — meaning the illuminance at the end of the luminaire
          maintenance cycle, after light output has degraded and dirt has accumulated on the
          fitting. The maintenance factor (typically 0.7 to 0.8 for clean commercial environments)
          must be applied during the lighting design to ensure the initial installation provides
          enough light to remain above the minimum throughout the maintenance period.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Requirements',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement in all commercial premises under the Regulatory
          Reform (Fire Safety) Order 2005. The system must provide illumination of escape routes,
          exit signs, and open areas in the event of a mains power failure.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape routes:</strong> Minimum 1 lux along the centre line of defined
                escape routes. Luminaires positioned at every change of direction, every exit door,
                and every intersection of corridors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open areas (anti-panic):</strong> Minimum 0.5 lux across the floor area of
                open spaces larger than 60m2. This prevents panic in large rooms when the lights go
                out and helps occupants locate escape routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration:</strong> Minimum 3 hours on battery backup. The emergency
                luminaires must reach full output within 5 seconds of mains failure (or within 0.5
                seconds for high-risk areas).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing:</strong> Monthly functional tests (brief switch to battery mode —
                often automated with self-test luminaires) and annual 3-hour duration tests. All
                results must be recorded in a log book. An{' '}
                <SEOInternalLink href="/tools/emergency-lighting-certificate">
                  emergency lighting certificate
                </SEOInternalLink>{' '}
                is required for new installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency lighting can be provided by self-contained luminaires (each with its own
          battery) or by a central battery system (a single battery unit powering multiple
          luminaires via a dedicated wiring system). Self-contained units are more common in smaller
          installations, while central battery systems are used in large commercial buildings,
          hospitals, and public venues.
        </p>
      </>
    ),
  },
  {
    id: 'led-retrofits',
    heading: 'LED Retrofit Projects: The Business Case',
    content: (
      <>
        <p>
          LED retrofit projects are one of the most profitable areas of commercial electrical work.
          The combination of significant energy savings, reduced maintenance costs, improved
          lighting quality, and fast payback periods makes LED upgrades an easy sell for commercial
          clients.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy savings:</strong> LED panels and tubes consume 50 to 70 percent less
                energy than the fluorescent fittings they replace. A 600x600 LED panel typically
                draws 30 to 40W versus 72W for a comparable T8 fluorescent recessed fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance reduction:</strong> LED luminaires last 50,000 to 100,000 hours
                versus 15,000 to 20,000 hours for fluorescent tubes. This eliminates the cost of
                regular tube replacements and reduces the need for access equipment and maintenance
                labour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting quality:</strong> Modern LED panels provide superior uniformity,
                reduced flicker (important for screen-based work), and better colour rendering (CRI
                80+) compared to older fluorescent systems. Tuneable white LED panels allow colour
                temperature adjustment for wellbeing and productivity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> Typical 2 to 4 years depending on energy costs and
                operating hours. After payback, the savings go straight to the client's bottom line.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When quoting an LED retrofit, include a detailed cost-benefit analysis showing the energy
          savings, maintenance savings, and payback period. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> lets
          you build a professional quote with materials, labour, and projected savings — and send it
          to the client from your phone.
        </p>
        <SEOAppBridge
          title="Quote LED retrofit projects professionally"
          description="Build detailed LED retrofit quotes with materials, labour, energy savings calculations, and payback analysis. Send professional PDF quotes from your phone — before you leave the survey. Elec-Mate quoting tools, 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
  {
    id: 'lighting-controls',
    heading: 'Lighting Controls and Sensors',
    content: (
      <>
        <p>
          Modern commercial lighting installations almost always include some form of automated
          control. The Building Regulations Part L requires lighting controls in new and refurbished
          commercial buildings to minimise energy waste. Beyond regulatory compliance, intelligent
          lighting control can reduce energy consumption by an additional 30 to 50 percent on top of
          the LED savings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Occupancy sensors:</strong> Passive infrared (PIR) or microwave sensors that
                detect room occupancy and switch lights on when people are present, off (or dim)
                when the space is unoccupied. Common in meeting rooms, toilets, corridors, and
                individual offices. Absence detection (manual on, automatic off) is preferred for
                energy savings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daylight sensors:</strong> Photocells that measure ambient daylight and dim
                the electric lighting to maintain the required lux level. In a perimeter office zone
                with good natural light, daylight harvesting can reduce lighting energy by 40 to 60
                percent during daytime hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time scheduling:</strong> Automatic on/off at programmed times. Typically
                used for out-of-hours shut-off in offices, with override switches for late workers.
                Ensures lights are not left on overnight or at weekends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scene control:</strong> Pre-set lighting scenes that can be recalled with a
                single button press or automatically triggered by time, occupancy, or daylight
                level. Common in meeting rooms (presentation mode, video call mode, full brightness)
                and retail spaces (daytime trading, evening display, cleaning).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Part L of the Building Regulations requires that new and refurbished commercial lighting
          includes at least occupancy detection in areas with intermittent use (toilets, meeting
          rooms, store rooms) and daylight dimming in perimeter zones with significant natural
          light. The specific requirements depend on the building type and the non-domestic building
          services compliance guide.
        </p>
      </>
    ),
  },
  {
    id: 'dali',
    heading: 'DALI Protocol and Digital Lighting Control',
    content: (
      <>
        <p>
          DALI (Digital Addressable Lighting Interface) is the industry standard protocol for
          commercial lighting control. Understanding DALI is increasingly important for electricians
          working in commercial fit-outs and refurbishments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-wire control bus:</strong> DALI uses a dedicated two-wire control cable
                (typically 1.5mm2) that runs alongside the mains supply cable to each luminaire. The
                DALI bus carries digital control signals — it is not a mains power supply. The bus
                is polarity-insensitive and can be wired in any topology (bus, star, tree, or ring).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual addressing:</strong> Each DALI luminaire (or DALI driver) has a
                unique address on the bus. Up to 64 individual addresses per bus, with the option to
                assign luminaires to up to 16 groups and 16 scenes. This allows individual luminaire
                control without dedicated switched circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI-2:</strong> The latest version of the DALI standard (IEC 62386 Part
                103) extends the protocol to include input devices (sensors, switches) as well as
                output devices (luminaires). This allows sensors and switches to communicate
                directly on the DALI bus without requiring a separate sensor network.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BMS integration:</strong> DALI controllers (gateways) can connect to a
                Building Management System (BMS) via BACnet, Modbus, or KNX, allowing the lighting
                system to be monitored and controlled centrally alongside HVAC, access control, and
                other building services.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, the key practical point is that DALI installations require a dedicated
          DALI control cable in addition to the standard mains supply cable. The DALI cable must be
          run to every luminaire on the bus, and the DALI driver in each luminaire must be
          DALI-compatible (not every LED driver supports DALI — check the specification). During
          commissioning, each luminaire is assigned an address using DALI commissioning software,
          and the groups, scenes, and control logic are programmed.
        </p>
      </>
    ),
  },
  {
    id: 'compliance',
    heading: 'Compliance and Certification',
    content: (
      <>
        <p>
          Commercial lighting installations must comply with multiple regulatory frameworks. The
          certification requirements are more extensive than domestic work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC):</strong> Required for all new
                lighting circuits. Must record circuit details, test results, and compliance with BS
                7671. For large installations, the EIC may have an extensive schedule of test
                results covering dozens of lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency Lighting Certificate:</strong> A separate certificate to{' '}
                <SEOInternalLink href="/tools/emergency-lighting-certificate">
                  BS 5266-1
                </SEOInternalLink>{' '}
                for the emergency lighting system. This covers the design, installation,
                commissioning, and testing of the emergency luminaires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part L compliance:</strong> For new buildings and major refurbishments, the
                lighting installation must meet the energy efficiency requirements of Part L. This
                includes minimum luminaire efficacy (lumens per circuit watt), lighting power
                density limits (W/m2), and the provision of lighting controls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (periodic):</strong> Existing commercial installations require periodic
                inspection. The recommended interval for commercial premises is typically 5 years
                (or less for high-risk environments). The{' '}
                <SEOInternalLink href="/guides/eicr-for-commercial-premises">
                  EICR for commercial premises
                </SEOInternalLink>{' '}
                covers all circuits including lighting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Commercial Lighting as a Revenue Stream',
    content: (
      <>
        <p>
          Commercial lighting work is high-value, technically interesting, and provides a clear
          pathway to repeat business. A single LED retrofit project can generate more revenue than
          several months of domestic work, and the energy monitoring and maintenance aspects create
          ongoing service contracts.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Circuit Design Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculators
                  </SEOInternalLink>{' '}
                  to design commercial lighting circuits. Check cable capacity, voltage drop on long
                  runs, and circuit protection — all on your phone during the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificates on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the EIC and emergency lighting certificate on your phone. Enter test
                  results directly into the schedule, export as professional PDFs, and send to the
                  client, building manager, and Building Control.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Build detailed commercial lighting quotes with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Itemise luminaires, cables, controls, labour, and projected energy savings. Send
                  professional PDF quotes from site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Design, certify, and quote commercial lighting on your phone"
          description="Cable sizing, voltage drop, EIC and emergency lighting certificates, quoting, and invoicing — all in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CommercialLightingGuidePage() {
  return (
    <GuideTemplate
      title="Commercial Lighting Installation | Design & Compliance"
      description="Complete guide to commercial lighting installation for UK electricians. CIBSE LG7 lux levels, emergency lighting BS 5266, LED retrofit projects, DALI lighting controls, Part L compliance, and certification requirements."
      datePublished="2025-09-05"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Commercial Lighting Installation:{' '}
          <span className="text-yellow-400">Design, Controls, and Compliance</span>
        </>
      }
      heroSubtitle="Commercial lighting is one of the most profitable areas of electrical work. This guide covers CIBSE lux levels, emergency lighting requirements, LED retrofit business cases, DALI digital control systems, and the certification you need to deliver compliant installations."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial Lighting Installation"
      relatedPages={relatedPages}
      ctaHeading="Quote, Design, and Certify Commercial Lighting on Your Phone"
      ctaSubheading="Cable sizing, voltage drop, EIC and emergency lighting certificates, professional quoting — all in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
