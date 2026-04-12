import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Building2,
  Lightbulb,
  Cable,
  FileCheck2,
  Calculator,
  GraduationCap,
  Wrench,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Siren,
  Network,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Shop Fit-Out Cost', href: '/guides/shop-fit-out-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Shop Fit-Out Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'power-supply', label: 'Power Supply and Distribution' },
  { id: 'commercial-lighting', label: 'Commercial Lighting' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'fire-alarm', label: 'Fire Alarm Systems' },
  { id: 'data-cabling', label: 'Data Cabling and EPOS' },
  { id: 'regulations', label: 'Regulations and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Commercial Fit-Out Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A shop fit-out electrical installation in the UK typically costs between £3,000 and £15,000+ depending on the size of the unit, the power supply requirements, and the complexity of the lighting, fire alarm, and data cabling.',
  'Commercial premises may require a 3-phase supply from the DNO if the single-phase supply is insufficient for the projected load — this can add £1,000 to £3,000+ for the supply upgrade.',
  'Emergency lighting and fire alarm systems are mandatory in commercial premises and must comply with BS 5266 (emergency lighting) and BS 5839 (fire detection and alarm systems).',
  'An EICR (Electrical Installation Condition Report) is required for commercial premises under the Electricity at Work Regulations 1989, typically every 5 years or at change of tenancy.',
  'Data cabling (Cat6 for EPOS, WiFi, CCTV, and back-office connectivity) should be installed during the fit-out to avoid costly retrospective work once fixtures and fittings are in place.',
];

const faqs = [
  {
    question: 'How much does a shop fit-out electrical installation cost?',
    answer:
      'The cost varies enormously depending on the size and type of shop. A small retail unit (50 to 100 square metres) with basic lighting, a few power circuits, emergency lighting, and a simple fire alarm typically costs £3,000 to £6,000 for the electrical package. A medium unit (100 to 250 square metres) with designed lighting schemes, multiple power circuits, comprehensive fire alarm, emergency lighting, data cabling, and CCTV preparation costs £6,000 to £10,000. A large unit (250+ square metres) or a unit requiring a 3-phase supply upgrade, extensive commercial lighting, elaborate fire detection, and structured data cabling can cost £10,000 to £15,000 or more. These prices cover the electrical installation only — fixtures, fittings, and decorative finishes are separate.',
  },
  {
    question: 'Do I need a 3-phase supply for a shop?',
    answer:
      'It depends on the total electrical load. A small retail shop with LED lighting, a few socket circuits, an air conditioning unit, and EPOS equipment may operate perfectly well on a single-phase 100A supply. However, if the shop has significant loads — commercial catering equipment, multiple air conditioning units, industrial refrigeration, or large display lighting — a 3-phase supply may be necessary. The electrician calculates the maximum demand during the design stage. If the existing supply is insufficient, a new supply or upgrade must be requested from the DNO (Distribution Network Operator). This involves an application, a site survey, and installation by the DNO — the process typically takes 6 to 12 weeks and costs £1,000 to £3,000+.',
  },
  {
    question: 'Is emergency lighting required in a shop?',
    answer:
      'Yes. Emergency lighting is a legal requirement in all commercial premises under the Regulatory Reform (Fire Safety) Order 2005 (England and Wales) and equivalent legislation in Scotland and Northern Ireland. The system must provide sufficient illumination for occupants to evacuate safely in the event of a mains power failure. Emergency lighting must comply with BS 5266-1 and be tested monthly (function test) and annually (full rated duration test). The fire risk assessment determines the extent and type of emergency lighting required. Typical cost for emergency lighting in a small to medium shop: £500 to £2,000 depending on the number of luminaires and exit signs.',
  },
  {
    question: 'What fire alarm does a shop need?',
    answer:
      'The fire alarm system category depends on the fire risk assessment. Most retail shops require a Category L3 or L2 system under BS 5839-1. Category L3 provides detection and warning in escape routes. Category L2 adds detection in rooms opening onto escape routes and in high-risk areas. Some shops (particularly those with sleeping accommodation above, or shops selling high-value goods requiring overnight protection) may need Category L1 (detection throughout all areas). The fire risk assessment determines the appropriate category. A basic Category L3 system for a small shop costs £800 to £1,500. A Category L2 system for a medium shop costs £1,500 to £3,000. Fire alarm call points at trade price start from approximately £3 for a grid switch plate.',
  },
  {
    question: 'How long does a shop electrical fit-out take?',
    answer:
      'A small shop fit-out (first fix, second fix, testing, and commissioning) typically takes 3 to 5 days. A medium shop takes 5 to 10 days. A large or complex fit-out can take 2 to 4 weeks. The first fix (cable routing, back box installation, containment) is done before the shopfitter installs walls, ceilings, and fixtures. The second fix (fitting sockets, switches, light fittings, commissioning fire alarm and emergency lighting) is done after the shopfitter has finished. The electrician needs to coordinate closely with the shopfitter, plumber, and air conditioning installer to avoid delays. A clear programme of works with coordinated access is essential.',
  },
  {
    question: 'Do I need an EICR for a commercial property?',
    answer:
      'Yes. The Electricity at Work Regulations 1989 require that electrical installations in commercial premises are maintained in a safe condition. An EICR (Electrical Installation Condition Report) is the formal inspection and testing that demonstrates compliance. Commercial EICRs are typically required every 5 years, at change of tenancy, or when there is reason to believe the installation may be unsafe. The landlord is usually responsible for the supply and distribution up to the tenant demarcation point. The tenant is responsible for the installation beyond that point. The EICR must be carried out by a competent person and the report retained for the premises fire safety file.',
  },
  {
    question: 'Can I use domestic-rated accessories in a shop?',
    answer:
      'Domestic-rated accessories (white plastic socket outlets and switches) are technically acceptable in commercial premises provided they meet the required current and voltage ratings. However, commercial environments typically use metal-clad accessories (MK Logic Plus, Schneider GU range, or similar) because they are more durable, comply more readily with commercial insurance requirements, and present a more professional appearance. In back-of-house areas (stockrooms, offices, staff kitchens), domestic-rated accessories are common. In customer-facing areas, the shop designer may specify decorative or branded accessories. The electrician should clarify the accessory specification with the client or interior designer before ordering materials.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-eicr',
    title: 'Commercial EICR Guide',
    description: 'Full guide to commercial EICRs — frequency, scope, and reporting requirements.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-lighting-guide',
    title: 'Commercial Lighting Guide',
    description: 'Lighting design principles for commercial premises including retail spaces.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for commercial distribution boards and sub-mains.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create detailed, itemised quotes for commercial fit-out projects.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for commercial fit-outs on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering commercial installations.',
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
    heading: 'Shop Fit-Out Electrical Work: What It Costs in the UK',
    content: (
      <>
        <p>
          Commercial shop fit-outs are among the most complex and rewarding electrical projects.
          They combine power distribution, commercial lighting design, emergency lighting, fire
          alarm systems, data cabling, and EPOS infrastructure — all to a tight programme and
          coordinated with shopfitters, plumbers, and mechanical services.
        </p>
        <p>
          The typical cost range for a shop electrical fit-out is{' '}
          <strong>£3,000 to £15,000+</strong> depending on the size of the unit, the complexity of
          the installation, and whether a supply upgrade is required. Small retail units at the
          lower end, large or specialist units at the higher end.
        </p>
        <p>
          This guide breaks down the costs by element, explains the regulatory requirements for
          commercial premises, and covers the key systems that must be installed.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Shop Fit-Out Electrical Cost Breakdown (2026 UK Prices)',
    content: (
      <>
        <p>
          The following table shows typical costs for the electrical elements of a commercial shop
          fit-out. Prices include materials and labour.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Small shop (50–100m²)</p>
                <p className="text-white text-sm">
                  Basic lighting, power, emergency lighting, simple fire alarm
                </p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£3,000 – £6,000</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Medium shop (100–250m²)</p>
                <p className="text-white text-sm">
                  Designed lighting, multiple circuits, fire alarm, data cabling
                </p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£6,000 – £10,000</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Large shop (250m²+)</p>
                <p className="text-white text-sm">
                  3-phase distribution, extensive lighting, full fire alarm, structured cabling
                </p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£10,000 – £15,000+</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">3-phase supply upgrade (DNO application)</p>
                <p className="text-white text-sm">
                  Application, survey, installation by DNO, new main switchgear
                </p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£1,000 – £3,000+</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Emergency lighting system</p>
                <p className="text-white text-sm">
                  Maintained/non-maintained luminaires, exit signs, testing system
                </p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£500 – £2,000</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Fire alarm system (Category L3)</p>
                <p className="text-white text-sm">
                  Detection in escape routes, manual call points, sounders, panel
                </p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£800 – £1,500</p>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white">Data cabling (Cat6 infrastructure)</p>
                <p className="text-white text-sm">
                  EPOS points, back-office, WiFi APs, CCTV preparation, patch panel
                </p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£800 – £2,500</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'Power Supply and Distribution',
    content: (
      <>
        <p>
          The first step in any shop fit-out is assessing the existing power supply and determining
          whether it is adequate for the projected load. This involves a maximum demand calculation
          based on the equipment schedule:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase supply (up to 100A)</strong> — suitable for small retail units
                with LED lighting, EPOS systems, a small amount of heating or cooling, and standard
                socket outlets. A single-phase 100A supply provides approximately 23kW of available
                power. Most units under 100m² can operate on single-phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-phase supply</strong> — required for larger units, premises with
                commercial catering equipment, multiple air conditioning units, or heavy machinery.
                A 3-phase supply provides three times the power capacity. The distribution board
                must be designed to balance the load across all three phases. 3-phase distribution
                boards cost £300 to £800 at trade price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution</strong> — larger shops may have multiple distribution
                boards (sub-mains) serving different areas — for example, a main board feeding a
                lighting board, a power board, and a kitchen board. Sub-mains must be correctly
                sized for the load and protected against overcurrent and earth faults.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If a new or upgraded supply is needed, the electrician submits an application to the DNO
          (Distribution Network Operator). The DNO will survey the site, issue a quotation, and
          schedule the connection works. This process typically takes 6 to 12 weeks and must be
          factored into the project programme.
        </p>
      </>
    ),
  },
  {
    id: 'commercial-lighting',
    heading: 'Commercial Lighting Design',
    content: (
      <>
        <p>
          Lighting is one of the most visible and impactful elements of a shop fit-out. Good
          commercial lighting design combines ambient lighting, accent lighting (for products and
          displays), and task lighting (for tills, stockrooms, and work areas):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED panels and downlights</strong> — the workhorse of retail lighting.
                Recessed LED panels (600mm x 600mm for suspended ceilings) provide uniform ambient
                light. LED downlights provide focused lighting for specific areas. Trade price: LED
                panels from £20 to £50, downlights from £5 to £15 each.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Track lighting</strong> — adjustable spotlights on a track system, ideal for
                product displays and window displays. Track lighting can be repositioned as the shop
                layout changes. Track and spotlights from £100 to £300 per 2-metre section with 4 to
                6 spotlights.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting control</strong> — dimming, zoning, and scheduling systems allow
                different lighting scenes for trading hours, cleaning, and displays. DALI (Digital
                Addressable Lighting Interface) systems provide individual luminaire control and are
                standard in modern retail. Basic DALI control adds £500 to £1,500 to the lighting
                package.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Retail lighting must also meet energy efficiency requirements under{' '}
          <SEOInternalLink href="/guides/building-regulations-electrical">
            Part L of the Building Regulations
          </SEOInternalLink>
          . The maximum lighting power density depends on the building type and activity — for
          retail display areas, the allowance is typically 12 to 15 W/m² for LED installations.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement in all commercial premises. It must provide
          sufficient illumination for safe evacuation when the normal lighting fails. The system
          must comply with{' '}
          <SEOInternalLink href="/guides/bs-5266-emergency-lighting-standard">BS 5266-1</SEOInternalLink> and
          be specified based on the fire risk assessment:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-maintained luminaires</strong> — operate only when the mains supply
                fails. Suitable for areas where the normal lighting is always on during occupation.
                The most common type for retail premises. Trade price: emergency exit blade signs
                from approximately £7 to £10 each, emergency bulkheads from £15 to £30.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained luminaires</strong> — the emergency lamp is illuminated at all
                times (both on mains and during a mains failure). Required for exit signs and in
                areas where the normal lighting may be dimmed or switched off while the area is
                occupied (such as a cinema or restaurant).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration</strong> — most commercial premises require a 3-hour rated
                emergency lighting system. This means the battery backup in each luminaire must
                maintain illumination for a minimum of 3 hours after a mains failure. The luminaires
                must be tested monthly (function test) and annually (full duration test), with
                records maintained in a logbook.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Systems',
    content: (
      <>
        <p>
          A fire alarm system is required in all commercial premises under the Regulatory Reform
          (Fire Safety) Order 2005. The system category depends on the fire risk assessment and is
          specified under{' '}
          <SEOInternalLink href="/guides/bs-5839-fire-alarm-standard">BS 5839-1</SEOInternalLink>:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Category L3</h3>
            <p className="text-white text-sm leading-relaxed">
              Detection and warning in escape routes only. Manual call points at exits. Sounders
              audible throughout the premises. This is the minimum category for most small to medium
              retail shops with straightforward layouts and no sleeping risk. Typical cost: £800 to
              £1,500 installed.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Category L2</h3>
            <p className="text-white text-sm leading-relaxed">
              Adds detection in rooms opening onto escape routes and in high-risk areas (such as
              kitchens, electrical switch rooms, and storerooms). Required for larger shops and
              premises with higher fire risk. Typical cost: £1,500 to £3,000 installed.
            </p>
          </div>
        </div>
        <p>
          The fire alarm system must be designed, installed, and commissioned by a competent person.
          The system must be maintained in accordance with BS 5839-1, with weekly tests, quarterly
          inspections, and annual servicing. The maintenance contract is a recurring revenue
          opportunity for electricians qualified in fire alarm work.
        </p>
      </>
    ),
  },
  {
    id: 'data-cabling',
    heading: 'Data Cabling and EPOS Infrastructure',
    content: (
      <>
        <p>
          Modern retail relies on connectivity. EPOS (Electronic Point of Sale) terminals, card
          payment machines, stock management systems, digital signage, CCTV, and staff WiFi all
          require a structured data cabling infrastructure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat6 cabling</strong> — the standard for commercial data cabling. Cat6
                supports 1Gbps over 100 metres. Each EPOS position, back-office workstation, WiFi
                access point location, and CCTV camera position should have at least one Cat6 run to
                the central patch panel. Cat6 RJ45 data modules cost approximately £10.50 each at
                trade price. Cable costs £0.30 to £0.50 per metre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EPOS positions</strong> — each till position needs power (double socket plus
                data), Cat6 for the EPOS terminal, and possibly a separate Cat6 for the card
                machine. Some EPOS systems use WiFi, but a wired connection is more reliable in a
                busy retail environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>WiFi access points</strong> — ceiling-mounted access points provide customer
                WiFi and staff device connectivity. Commercial access points (Ubiquiti UniFi, Cisco
                Meraki, TP-Link Omada) are powered via PoE from the network switch. One access point
                per 100 to 150m² of open retail space is typical. Cost: £80 to £200 per access point
                plus Cat6 run and installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Data cabling should be installed during the first-fix stage alongside the electrical
          cabling. This avoids costly retrospective work once ceilings and walls are finished. A
          typical data cabling package for a small to medium shop (4 to 8 EPOS points, 2 WiFi APs, 4
          CCTV runs, back-office connectivity) costs £800 to £2,500.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Certification',
    content: (
      <>
        <p>
          Commercial electrical installations must comply with a broader set of regulations than
          domestic work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671</strong> — the wiring regulations apply to all electrical
                installations in commercial premises. The installation must be designed, installed,
                inspected, and tested in accordance with the current edition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — the employer or premises
                controller has a duty to ensure the electrical installation is maintained in a safe
                condition. An EICR demonstrates compliance. Commercial EICRs are typically carried
                out every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — the responsible person
                must carry out a fire risk assessment and ensure appropriate fire detection,
                warning, and emergency lighting systems are installed and maintained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part L</strong> — energy efficiency requirements for
                new commercial installations, including maximum lighting power densities and
                controls.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An Electrical Installation Certificate (EIC) must be issued for all new commercial
          installations. The certificate confirms compliance with BS 7671 and should be retained in
          the premises fire safety file. An EICR should be carried out at handover and subsequently
          at intervals specified in the IET Guidance Note 3 (typically every 5 years for commercial
          premises).
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Commercial Fit-Out Revenue',
    content: (
      <>
        <p>
          Commercial shop fit-outs are among the highest-value projects available to electrical
          contractors. A single fit-out can be worth £3,000 to £15,000+ for the electrical package,
          with ongoing maintenance contracts for emergency lighting testing, fire alarm servicing,
          and periodic EICR inspections.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing and Maximum Demand</h4>
                <p className="text-white text-sm leading-relaxed">
                  Calculate sub-mains and distribution board sizing with the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Verify 3-phase balance and voltage drop on longer sub-mains runs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Commercial Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Create detailed, itemised commercial quotes with Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Lighting, power, emergency lighting, fire alarm, data cabling — all broken down
                  with materials, labour, and your margins. Present a professional quotation to the
                  main contractor or tenant.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate after commissioning. AI board
                  scanning captures all distribution board details. Voice test entry speeds up the
                  schedule of test results for multi-board commercial installations. Issue the
                  certificate package to the client before handover.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify commercial fit-outs"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, commercial quoting, and on-site EIC certification. Price shop fit-outs accurately with itemised professional documentation. 7-day free trial."
          icon={Building2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ShopFitOutElectricalCostPage() {
  return (
    <GuideTemplate
      title="Shop Fit-Out Electrical Cost UK 2026 | Commercial Pricing"
      description="How much does a shop fit-out electrical installation cost in the UK? Typical prices from £3,000 to £15,000+. 3-phase supply, commercial lighting, emergency lighting, fire alarm, data cabling, and EICR requirements explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Shop Fit-Out Electrical Cost:{' '}
          <span className="text-yellow-400">UK Commercial Pricing 2026</span>
        </>
      }
      heroSubtitle="How much does a shop electrical fit-out cost in the UK? This guide covers typical prices from £3,000 to £15,000+, 3-phase supply, commercial lighting design, emergency lighting, fire alarm systems, and data cabling."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Shop Fit-Out Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Commercial Fit-Outs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, commercial quoting, and on-site EIC certification. 7-day free trial, cancel anytime."
    />
  );
}
