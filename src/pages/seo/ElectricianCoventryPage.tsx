import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Building2,
  GraduationCap,
  ClipboardCheck,
  Car,
  Home,
  Factory,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Location Guides', href: '/guides/electrician-near-me' },
  { label: 'Coventry', href: '/guides/electrician-coventry' },
];

const tocItems = [
  { id: 'overview', label: 'Electrical Work in Coventry' },
  { id: 'dno', label: 'NGED as DNO' },
  { id: 'post-war-housing', label: 'Post-War Housing Stock' },
  { id: 'ring-radial', label: 'Ring Main vs Radial in Post-War Housing' },
  { id: 'student-area', label: 'University Student Area' },
  { id: 'ev-gigafactory', label: 'EV Battery Gigafactory & Demand' },
  { id: 'pricing', label: 'Pricing Guide' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Coventry is served by National Grid Electricity Distribution (NGED, formerly Western Power Distribution) as the Distribution Network Operator. All new connections, service upgrades, and G98/G99 notifications go through NGED West Midlands.',
  'Coventry was heavily bombed in World War II and rebuilt in the 1950s and 1960s. The majority of the city\'s housing stock dates from this post-war rebuilding period, and much of it still has original or first-generation replacement wiring that is now 60 to 70 years old and due for replacement.',
  'Post-war Coventry housing commonly uses ring final circuits wired in imperial-sized cables. Electricians must understand the specific challenges of rewiring these properties, including asbestos-containing materials in some ceiling tiles and partition walls, and the differences between ring main and radial circuit design choices for replacement installations.',
  'Coventry University and the surrounding student area (Hillfields, Gosford Green, Stoke) generate demand for HMO conversions, fire alarm installations, and EICR compliance work similar to other university cities.',
  'The new EV battery gigafactory at the Coventry Airport site and the wider West Midlands EV manufacturing corridor are driving significant demand for commercial and industrial electrical contractors, as well as domestic EV charger installations as the local workforce transitions to electric vehicles.',
];

const faqs = [
  {
    question: 'Who is the DNO for Coventry?',
    answer:
      'National Grid Electricity Distribution (NGED), formerly known as Western Power Distribution (WPD), is the Distribution Network Operator for Coventry and the surrounding West Midlands area. NGED manages the electricity distribution network from 132kV down to 230V under the West Midlands licence area. All new connections, disconnections, service upgrades, meter relocations, and G98/G99 notifications for solar PV, battery storage, or EV charger installations must go through NGED. Their connections portal handles applications online. Some existing paperwork and meter labels may still show the WPD name — they are the same organisation following the National Grid acquisition.',
  },
  {
    question: 'What is the typical wiring in a 1950s Coventry house?',
    answer:
      'A typical 1950s Coventry house has ring final circuits for socket outlets wired in 2.5mm imperial cable (slightly different dimensions to modern metric 2.5mm), a lighting circuit wired in 1.0mm or 1.5mm cable, a cooker circuit on a dedicated radial, and possibly an immersion heater circuit. The consumer unit is usually a surface-mounted metal box with rewirable fuses (BS 3036) — often a Wylex or MEM unit. The cables may be rubber-insulated (TRS or VIR) in the earliest properties, or early PVC-insulated in houses built after about 1955. Rubber insulation becomes brittle and crumbles when disturbed, creating a serious risk of short circuits and fire. The earthing is often via the lead sheath of the supply cable (TN-S) and may be supplemented by a separate earth electrode. Main bonding to gas and water may be absent or inadequate by modern standards.',
  },
  {
    question: 'Should I use ring final circuits or radials when rewiring in Coventry?',
    answer:
      'When rewiring a post-war Coventry house, you have the choice of replacing the existing ring final circuits with new ring finals or switching to radial circuits. Both are acceptable under BS 7671. Ring finals (30A/32A, 2.5mm cable) remain the standard choice for most domestic socket circuits and are what most homeowners and landlords expect. Radials can be more suitable for smaller areas — a 20A radial on 2.5mm cable can serve a floor area up to 50 square metres, or a 32A radial on 4.0mm cable for larger areas. In practice, many Coventry electricians use ring finals for main living areas and radials for extensions, garages, and loft conversions. The key consideration is that the existing post-war ring circuits may have spurs that do not comply with modern standards — map the existing circuit before deciding the replacement topology.',
  },
  {
    question: 'How much does a rewire cost in Coventry?',
    answer:
      'A full domestic rewire in Coventry typically costs £3,000 to £5,000 for a standard 3-bedroom semi-detached house, including a new consumer unit, full circuit rewire, testing, certification, and making good. Coventry rates are at or slightly below the national average, reflecting the lower cost of living compared to southern cities. For larger properties (4 to 5 bedrooms), expect £4,500 to £7,500. Post-war properties are generally straightforward to rewire — the construction is simple, ceiling voids are accessible, and floor voids are adequate. The main complications are asbestos-containing materials (ceiling tiles, textured coatings, and some partition walls), which require professional asbestos removal before electrical work can proceed. Always carry out an asbestos assessment before starting work on 1950s and 1960s properties.',
  },
  {
    question: 'What impact is the EV gigafactory having on electrical work in Coventry?',
    answer:
      'The EV battery gigafactory planned for the Coventry Airport site, along with the established Jaguar Land Rover and other automotive manufacturing in the region, is driving increased demand for electrical contractors at multiple levels. Commercial and industrial demand includes the factory construction itself (high-voltage power distribution, three-phase manufacturing equipment, battery charging and testing systems, and building services), plus the supply chain of component manufacturers setting up facilities in the area. Domestic demand is growing as the local automotive workforce transitions to electric vehicles — EV charger installations across Coventry suburbs are increasing rapidly. The broader West Midlands battery and EV corridor (including the UK Battery Industrialisation Centre at nearby Hams Hall) is creating a sustained, multi-year demand increase for electricians with both industrial and domestic EV charging skills.',
  },
  {
    question: 'Do landlords in Coventry need an EICR?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Coventry to obtain an Electrical Installation Condition Report at least every 5 years or at the start of each new tenancy. Coventry City Council can request a copy of the EICR and has powers to issue remedial notices and civil penalty notices of up to £30,000 for non-compliance. The report must be carried out by a qualified person and provided to tenants within 28 days of the inspection. Given the large number of 1950s to 1970s post-war properties in the Coventry rental market, many EICRs in the city record C2 defects including deteriorated rubber-insulated wiring, absent RCD protection, and inadequate bonding. Coventry also has a significant HMO market around the universities that requires additional mandatory electrical safety conditions.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete EICRs on site for post-war housing, HMO licensing, and landlord compliance in Coventry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for rewires and EV charger installations. Ring final and radial circuit calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Complete guide to domestic EV charger installation — growing fast in Coventry with the gigafactory workforce.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for rewires, new circuits, and EV charger installations.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, EV charger installations, and HMO conversions with professional itemised PDFs.',
    icon: Wrench,
    category: 'Tool',
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
    heading: 'Electrical Work in Coventry: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Coventry has a unique electrical landscape shaped by its history. The city centre was
          devastated by bombing in November 1940 and almost entirely rebuilt in the 1950s and 1960s.
          This means that Coventry's housing stock is overwhelmingly post-war — and much of it is
          now reaching the age where the original electrical installations need complete replacement.
        </p>
        <p>
          The city is experiencing a renaissance driven by its automotive heritage. The planned EV
          battery gigafactory at the former Coventry Airport site, the existing Jaguar Land Rover
          operations, and the growing electric vehicle supply chain are creating sustained demand
          for both industrial and domestic electrical work. The UK City of Culture 2021 designation
          also triggered significant investment in the city centre infrastructure.
        </p>
        <p>
          Coventry University, with over 30,000 students, generates substantial HMO demand in the
          Hillfields, Gosford Green, and Stoke areas. Student housing requires regular EICR
          inspections, fire alarm compliance, and ongoing maintenance.
        </p>
        <p>
          This guide covers the DNO arrangements, post-war housing rewiring, ring main versus
          radial considerations, university area work, the EV gigafactory impact, and realistic
          pricing for electricians in Coventry.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'National Grid Electricity Distribution: Your DNO in Coventry',
    content: (
      <>
        <p>
          Coventry and the wider West Midlands are served by{' '}
          <strong>National Grid Electricity Distribution (NGED)</strong>, formerly Western Power
          Distribution (WPD). NGED manages the distribution network from 132kV down to the 230V
          supply at properties under the West Midlands licence area.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key DNO Information for Coventry</h3>
          <div className="space-y-3 text-white text-sm leading-relaxed">
            <p>
              <strong>DNO:</strong> National Grid Electricity Distribution (West Midlands) —
              formerly Western Power Distribution
            </p>
            <p>
              <strong>MPAN prefix:</strong> 21 (West Midlands region)
            </p>
            <p>
              <strong>New connections:</strong> Apply via the NGED connections portal for new
              supplies, service upgrades, meter relocations, and temporary supplies. The post-war
              housing in Coventry typically has adequate single-phase supplies, but properties
              adding EV chargers, heat pumps, or battery storage may need a service upgrade from
              the older 60A fuse to a modern 80A or 100A cut-out.
            </p>
            <p>
              <strong>G98/G99 notifications:</strong> Solar PV, battery storage, and EV charger
              installations that export to the grid require G98 (up to 16A per phase) or G99
              (larger systems) notification to NGED before energisation.
            </p>
            <p>
              <strong>Earthing:</strong> Post-war Coventry housing is predominantly TN-S (earth via
              lead sheath cable) or PME (TN-C-S) where the supply has been modernised. Older
              properties that have not had a service upgrade may still rely on a lead sheath earth
              that is deteriorating — test the Ze carefully. Some properties have been converted to
              PME by NGED during street works but the customer may not be aware. Always verify at
              the service head.
            </p>
          </div>
        </div>
        <p>
          The anticipated increase in electrical demand from the EV gigafactory and wider
          electrification is prompting NGED to invest in network reinforcement across Coventry. This
          may benefit electricians by reducing the wait times for service upgrades as network capacity
          improves.
        </p>
      </>
    ),
  },
  {
    id: 'post-war-housing',
    heading: 'Post-War Housing Stock: Rewiring Coventry',
    content: (
      <>
        <p>
          Coventry's defining characteristic for electricians is its post-war housing stock. The city
          was rebuilt at speed in the 1950s and 1960s, producing large estates of semi-detached
          houses, terraces, and low-rise flats. These properties now form the backbone of Coventry's
          housing and present a massive, ongoing rewiring market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age and condition</strong> — properties built between 1950 and 1965 are now
                60 to 75 years old. The original wiring — whether rubber-insulated (TRS/VIR) in the
                earliest properties or early PVC in later ones — is approaching or past its expected
                lifespan. Rubber insulation becomes brittle and crumbles when disturbed, creating
                exposed conductors and a serious fire risk. Even early PVC insulation from the 1950s
                is degrading, becoming stiff and prone to cracking at termination points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer units</strong> — the original consumer units are typically surface-
                mounted metal boxes with rewirable fuses (BS 3036) — Wylex, MEM, or Crabtree units.
                Many have been partially upgraded over the decades with MCBs or additional ways, but
                the underlying wiring remains original. A common finding is a relatively modern
                consumer unit connected to 60-year-old cables — the consumer unit upgrade masked the
                underlying wiring condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos awareness</strong> — post-war Coventry houses commonly contain
                asbestos-containing materials: Artex textured coatings on ceilings, asbestos cement
                ceiling tiles in kitchens and bathrooms, asbestos insulation boards in some partition
                walls, and asbestos cement flue pipes. Before starting any rewiring work, carry out
                an asbestos assessment. If you suspect asbestos, stop work and arrange professional
                testing. Never drill, cut, or disturb suspected asbestos materials. A referable
                asbestos survey is a legal requirement before demolition or refurbishment work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction simplicity</strong> — the upside of post-war housing is that it
                is straightforward to work on. Cavity walls with plasterboard and skim on the inner
                leaf, timber suspended floors on the ground floor (or solid concrete in some later
                properties), and accessible ceiling voids make cable routing relatively simple
                compared to period or listed buildings. A competent electrician can rewire a standard
                3-bedroom Coventry semi in 4 to 5 days.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The scale of the rewiring market in Coventry is significant. Entire estates — Tile Hill,
          Canley, Cheylesmore, Stoke Aldermoor, Willenhall — were built in the same period and will
          need rewiring within the same timeframe. This provides a concentrated, predictable pipeline
          of work for local electricians.
        </p>
      </>
    ),
  },
  {
    id: 'ring-radial',
    heading: 'Ring Main vs Radial in Post-War Housing',
    content: (
      <>
        <p>
          When rewiring Coventry's post-war housing, the choice between ring final circuits and
          radial circuits is a practical decision that affects cable quantities, installation time,
          and long-term performance. Both are fully compliant with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>
          .
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ring Final Circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              The traditional UK approach: a continuous loop of 2.5mm cable from the consumer unit,
              around all socket outlets, and back to the same MCB/RCBO. Protected by a 32A device.
              Serves a floor area up to 100 square metres. Advantages: uses less copper per socket
              because the load is shared across two paths; well-understood by all UK electricians;
              permits unfused spurs. Disadvantages: ring continuity must be verified at every
              inspection (a broken ring looks like two radials); interconnected spurs can create
              complex circuits that are difficult to fault-find; and the ring topology is unique to
              the UK, meaning some imported accessories and guidance do not account for it.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Radial Circuit</h3>
            <p className="text-white text-sm leading-relaxed">
              A single cable run from the consumer unit to the socket outlets in sequence. A 20A
              radial on 2.5mm cable serves up to 50 square metres; a 32A radial on 4.0mm cable
              serves up to 75 square metres. Advantages: simpler topology — easier to fault-find
              and understand; no ring continuity testing required; no risk of hidden ring breaks.
              Disadvantages: uses more copper for the same number of sockets (each socket is served
              by a single cable path); requires more circuits to cover the same floor area; and the
              32A radial option needs 4.0mm cable, which is stiffer and harder to route through
              post-war floor voids.
            </p>
          </div>
        </div>
        <p>
          For a typical Coventry 3-bedroom semi-detached, a practical approach is: two ring final
          circuits (ground floor and first floor) for the main socket outlets, with radials for the
          kitchen (dedicated 32A ring or 20A radials for individual appliances), garage, and any
          extension or loft conversion. This balances efficiency, simplicity, and compliance. The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          can verify the cable sizes for both ring and radial options.
        </p>
      </>
    ),
  },
  {
    id: 'student-area',
    heading: 'Coventry University Student Area',
    content: (
      <>
        <p>
          Coventry University, with over 30,000 students, creates a substantial private rented
          sector concentrated in Hillfields, Gosford Green, Stoke, and parts of Earlsdon. Many
          properties in these areas have been converted to HMOs (Houses in Multiple Occupation) to
          accommodate students and young professionals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing requirements</strong> — Coventry City Council operates
                mandatory and additional HMO licensing schemes. Licensed HMOs require a satisfactory{' '}
                <SEOInternalLink href="/guides/eicr-guide">EICR</SEOInternalLink> (maximum 5 years
                old), a fire alarm system to BS 5839-6 (typically LD2 minimum, LD1 for higher-risk
                properties), emergency lighting in escape routes, and adequate socket provision in
                each letting room. The EICR requirement alone generates regular, recurring work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm installations</strong> — converting a house to an HMO typically
                requires upgrading from domestic smoke alarms to an LD2 or LD1 fire alarm system
                with interlinked smoke detectors, heat detectors in kitchens, and a mains-powered
                control panel with battery backup. The fire alarm installation is often the single
                most important electrical job in an HMO conversion. Coventry Building Control and
                the fire service inspect these installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional circuits</strong> — HMO conversions often require additional
                circuits for individual room heaters (where central heating is not provided to each
                letting room), additional socket outlets (minimum 4 per letting room is typical),
                shared kitchen appliance circuits, and coin-operated or communal laundry equipment.
                The existing consumer unit may need upgrading or a second board installed to
                accommodate the additional circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Building relationships with Coventry landlords and letting agents who manage multiple
          student properties provides stable, recurring revenue. A landlord with 10 HMOs needs
          EICRs every 5 years, annual fire alarm servicing, and reactive maintenance — that
          represents a steady annual contract worth £3,000 to £6,000.
        </p>
      </>
    ),
  },
  {
    id: 'ev-gigafactory',
    heading: 'EV Battery Gigafactory and Growing Demand',
    content: (
      <>
        <p>
          Coventry's automotive heritage is evolving into an electric future. The planned EV battery
          gigafactory at the former Coventry Airport site, combined with the existing Jaguar Land
          Rover operations, the UK Battery Industrialisation Centre at Hams Hall (near Birmingham),
          and a growing network of EV component suppliers, is creating a sustained increase in
          electrical demand across the region.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial electrical demand</strong> — the gigafactory and its supply chain
                require massive electrical infrastructure: high-voltage power distribution, three-
                phase manufacturing equipment, battery testing and charging systems, clean room
                environments, automated production line controls, and extensive building services.
                While much of this work goes to specialist industrial contractors, it creates
                subcontracting opportunities and upskilling pathways for local electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic EV charger demand</strong> — as the local automotive workforce
                transitions to electric vehicles (many manufacturers offer employee EV schemes), the
                demand for domestic{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV charger installations
                </SEOInternalLink>{' '}
                across Coventry's suburbs is growing rapidly. A typical domestic EV charger
                installation (7kW single-phase) requires a dedicated 32A circuit from the consumer
                unit, earthing verification, and G98 notification to NGED. In many post-war
                properties, the existing 60A service fuse may need upgrading to 80A or 100A to
                accommodate the additional load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial EV infrastructure</strong> — workplace EV charging is expanding
                rapidly. Office parks, industrial estates, and retail car parks across Coventry are
                installing multiple EV charge points, requiring three-phase supplies, load management
                systems, and cable infrastructure. The Coventry Very Light Rail project and other
                transport electrification schemes add further demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skills pipeline</strong> — the EV sector is creating demand for electricians
                with specific skills: EV charger installation (C&G 2919 or equivalent), three-phase
                power distribution, battery storage systems, and smart energy management. Electricians
                who invest in these qualifications now will be well-positioned as the Coventry EV
                ecosystem grows over the next decade.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EV transition is not a distant prospect for Coventry — it is happening now. Domestic
          EV charger installations are already one of the fastest-growing job types in the area, and
          this will accelerate as the gigafactory workforce grows.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Pricing Guide for Coventry',
    content: (
      <>
        <p>
          Coventry pricing is at or slightly below the national average for domestic work, reflecting
          the West Midlands cost of living. However, EV charger installations and commercial work
          command competitive rates, and the volume of available work compensates for lower per-job
          pricing compared to southern cities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Domestic Rewire (3-bed)</h4>
                <p className="text-white text-2xl font-bold">£3,000 – £5,000</p>
                <p className="text-white text-sm mt-1">Post-war semi-detached, standard</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Consumer Unit Upgrade</h4>
                <p className="text-white text-2xl font-bold">£400 – £650</p>
                <p className="text-white text-sm mt-1">Dual RCD or RCBO board, testing, cert</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EICR (Domestic)</h4>
                <p className="text-white text-2xl font-bold">£160 – £260</p>
                <p className="text-white text-sm mt-1">3-bed property, full report</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EV Charger Install</h4>
                <p className="text-white text-2xl font-bold">£750 – £1,300</p>
                <p className="text-white text-sm mt-1">Supply and fit, DNO notification</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">HMO Conversion (Electrical)</h4>
                <p className="text-white text-2xl font-bold">£2,000 – £4,000</p>
                <p className="text-white text-sm mt-1">Fire alarm, extra circuits, EICR, cert</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Day Rate</h4>
                <p className="text-white text-2xl font-bold">£220 – £320</p>
                <p className="text-white text-sm mt-1">Qualified electrician, Coventry area</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Coventry's strength is volume. The sheer number of post-war properties needing rewires,
          the growing HMO market, and the accelerating EV charger demand mean that a well-organised
          electrician can achieve strong turnover at these rates. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
          produce accurate quotes quickly and convert more surveys into confirmed jobs.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Your Business in Coventry',
    content: (
      <>
        <p>
          Coventry is a volume market with growing specialist opportunities. The combination of
          mass post-war rewiring demand, a healthy HMO sector, and the accelerating EV transition
          means there is more work than the current number of local electricians can handle.
          Efficiency and professional systems are the key to maximising revenue.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs on site</SEOInternalLink>{' '}
                  for HMO licensing, landlord compliance, and pre-rewire condition reporting. AI-
                  assisted observation coding speeds up the most time-consuming part of the EICR.
                  Essential for the Coventry student HMO market.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size cables for rewires and EV charger installations with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Verify ring final and radial circuit designs. Check voltage drop on long EV
                  charger cable runs from the consumer unit to detached garages.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quote rewires, EV charger installations, and HMO conversions with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Professional PDF quotes with clear itemisation help you convert more surveys into
                  confirmed work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional certification for Coventry electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Rewires, EV chargers, or HMOs — certify it all on site. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCoventryPage() {
  return (
    <GuideTemplate
      title="Electrician in Coventry | Local Electrical Guide"
      description="Complete guide for electricians working in Coventry. NGED DNO, post-war housing rewiring, ring main vs radial circuits, university student HMOs, EV battery gigafactory demand, and realistic Coventry pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Coventry:{' '}
          <span className="text-yellow-400">Local Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Coventry's post-war housing stock needs rewiring, the student HMO market needs EICRs, and the EV gigafactory is driving new demand. This guide covers the DNO, rewiring challenges, ring vs radial circuits, and realistic pricing for electricians in Coventry."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Work in Coventry"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Electrical Work in Coventry — On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Rewires, EV chargers, or HMOs — certify it all on site. 7-day free trial."
    />
  );
}
