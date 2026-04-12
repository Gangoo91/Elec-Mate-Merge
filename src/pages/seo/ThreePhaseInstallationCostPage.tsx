import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  ClipboardCheck,
  Factory,
  Clock,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: '3-Phase Installation Cost', href: '/guides/three-phase-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'When Do You Need 3-Phase?' },
  { id: 'dno-application', label: 'DNO Application and Supply Cost' },
  { id: 'consumer-unit', label: '3-Phase Consumer Unit Costs' },
  { id: 'labour-costs', label: 'Labour and Installation Costs' },
  { id: 'total-costs', label: 'Total Cost Breakdown' },
  { id: 'timeline', label: 'DNO Timeline and Process' },
  { id: 'g99-notification', label: 'G99 Notification' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'for-electricians', label: 'For Electricians: Quoting 3-Phase Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 3-phase supply upgrade in the UK typically costs between £2,500 and £8,000+ depending on the distance from the existing network, DNO charges, and the complexity of the internal installation.',
  'The DNO application fee alone ranges from £1,000 to £3,000+ and can take 6 to 12 weeks from application to energisation. Distance from the nearest 3-phase network is the single biggest variable.',
  '3-phase consumer units cost £300 to £600 for a quality unit at trade prices, plus protective devices. A complete 3-phase distribution board with RCBOs and SPD can exceed £1,000.',
  'Common reasons for upgrading to 3-phase include large workshops, EV fleet charging, multiple heat pumps, commercial kitchens, and properties where single-phase capacity is insufficient.',
  'G99 notification to the DNO is required for 3-phase generation installations (solar PV, battery storage) above 3.68 kW per phase under the Engineering Recommendation G99.',
];

const faqs = [
  {
    question: 'How much does a 3-phase supply upgrade cost in the UK in 2026?',
    answer:
      'The total cost for a 3-phase supply upgrade ranges from approximately £2,500 for a straightforward installation where the 3-phase network is already at the boundary, to £8,000 or more where significant cable runs or network reinforcement are needed. The DNO application and connection fee is typically £1,000 to £3,000+. Internal installation (consumer unit, wiring, earthing, testing, and certification) adds £1,500 to £3,500 depending on the number of circuits and complexity.',
  },
  {
    question: 'How long does it take to get a 3-phase supply installed?',
    answer:
      'From initial application to energisation, a 3-phase supply upgrade typically takes 6 to 12 weeks. The DNO needs to survey the site, design the connection, and schedule the installation work. If network reinforcement is required — such as running new cables from a distant transformer — the timeline can extend to 16 weeks or more. The internal electrical installation can be prepared in advance and typically takes 1 to 2 days once the supply is available.',
  },
  {
    question: 'Do I need 3-phase for an EV charger?',
    answer:
      'A single domestic EV charger (7 kW) runs on single-phase and does not require a 3-phase supply. However, if you need multiple fast chargers, a commercial fleet charging installation, or a 22 kW 3-phase charger, you will need a 3-phase supply. Properties with heat pumps, EV chargers, and electric cooking on single-phase may also find their 100A supply is insufficient, in which case upgrading to 3-phase provides the additional capacity needed.',
  },
  {
    question: 'What is the difference between single-phase and 3-phase?',
    answer:
      'Single-phase provides one live conductor at 230V with a typical domestic capacity of 80A to 100A (18 kW to 23 kW). Three-phase provides three live conductors, each at 230V to neutral (400V between phases), with a typical capacity of 60A to 100A per phase (41 kW to 69 kW). Three-phase allows much higher total power capacity and is essential for large motors, high-power equipment, and installations where single-phase capacity is insufficient.',
  },
  {
    question: 'Can any electrician install a 3-phase consumer unit?',
    answer:
      'Any competent electrician can install a 3-phase consumer unit and internal wiring. However, the DNO connection work (the supply cable from the network to the meter position) must be carried out by the DNO or their approved contractor. The electrician is responsible for everything from the meter tails onwards — the consumer unit, distribution, circuit wiring, earthing, testing, and certification. An Electrical Installation Certificate (EIC) must be issued for the new installation.',
  },
  {
    question: 'Is 3-phase installation notifiable under Part P?',
    answer:
      'Yes. Installing a new 3-phase consumer unit and distribution system in a domestic property is notifiable work under Part P of the Building Regulations. The work must be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) who can self-certify, or Building Control must be notified before the work starts. An EIC is required upon completion.',
  },
  {
    question: 'What is G99 and does it apply to my 3-phase installation?',
    answer:
      'Engineering Recommendation G99 is the DNO requirement for connecting generation equipment (solar PV, wind turbines, battery storage) to the distribution network. If you are installing generation equipment above 3.68 kW per phase on a 3-phase supply, you must submit a G99 application to the DNO and receive approval before energising the system. For generation up to 3.68 kW per phase (total 11.04 kW on 3-phase), G98 notification applies instead, which is a simpler process.',
  },
  {
    question: 'Will a 3-phase supply reduce my electricity bills?',
    answer:
      'A 3-phase supply does not inherently reduce electricity costs — you pay the same per-unit rate. However, it enables more efficient operation of large motors and equipment designed for 3-phase, which can be more energy efficient than their single-phase equivalents. The main benefit is capacity: 3-phase allows you to run more high-power equipment simultaneously without overloading the supply.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description:
      'Complete pricing guide for domestic consumer unit replacements including materials and labour.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Installation requirements for EV chargers including supply capacity assessment.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for 3-phase installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote 3-phase installations with itemised materials, labour, and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/solar-panel-installation-electrical-cost',
    title: 'Solar Panel Electrical Cost',
    description: 'Electrical installation costs for solar PV including G98/G99 requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrical-installation',
    title: 'Commercial Electrical Installation',
    description: 'Guide to commercial electrical installations including 3-phase distribution.',
    icon: Building2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'When Do You Need a 3-Phase Supply?',
    content: (
      <>
        <p>
          Most UK homes run on a single-phase electricity supply — one live conductor at 230V
          providing a typical capacity of 80A to 100A (approximately 18 kW to 23 kW). For many
          properties, this is more than sufficient. But as electrical demand grows — heat pumps, EV
          chargers, electric cooking, and home workshops — some installations hit the limits of
          single-phase capacity.
        </p>
        <p>
          A 3-phase supply provides three live conductors, each carrying 230V to neutral (400V
          between phases), with a typical capacity of 60A to 100A per phase. This triples the
          available power, making it essential for certain applications and highly desirable for
          others.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Common Reasons for 3-Phase Upgrade</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large workshops and outbuildings</strong> — 3-phase motors, welders,
                compressors, and CNC machines require or benefit significantly from a 3-phase
                supply. Running large motors on single-phase is inefficient and limits the equipment
                you can use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV fleet charging</strong> — a single 7 kW charger works on single-phase,
                but multiple chargers or a 22 kW 3-phase charger require a 3-phase supply.
                Commercial premises with fleet vehicles almost always need 3-phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple heat pumps</strong> — a large property with air-source or
                ground-source heat pumps may exceed single-phase capacity, particularly when
                combined with other high-power loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial kitchens</strong> — 3-phase ovens, induction hobs, and commercial
                refrigeration require 3-phase power. Any commercial food premises will typically
                need a 3-phase supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exceeding single-phase capacity</strong> — if the maximum demand assessment
                shows the installation will regularly exceed the available single-phase capacity, a
                3-phase upgrade is the only solution. Overloading a single-phase supply causes
                voltage drop, nuisance tripping, and potential damage to equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-application',
    heading: 'DNO Application and Supply Cost',
    content: (
      <>
        <p>
          The largest and most variable element of a 3-phase installation cost is the DNO
          (Distribution Network Operator) connection charge. This covers the work the DNO must carry
          out to bring a 3-phase supply from their network to your meter position.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">DNO Connection Costs</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard connection (network at boundary)</strong> — £1,000 to £1,500. Where
                the existing 3-phase network already runs past the property, the DNO needs to
                install a service cable, cutout, and meter. This is the best-case scenario.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short cable run required</strong> — £1,500 to £3,000. If the nearest 3-phase
                network is within a few hundred metres but not at the boundary, the DNO must run
                additional cable. Cost increases with distance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Network reinforcement needed</strong> — £3,000 to £10,000+. In rural areas
                or locations far from the existing 3-phase network, significant infrastructure work
                may be needed. The DNO may need to install a new transformer or run cables over long
                distances. These costs can be substantial.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The DNO will provide a formal quotation after surveying the site. In England and Wales,
          the main DNOs are UK Power Networks (South and East), Western Power Distribution (Midlands
          and South West), Northern Powergrid (North East and Yorkshire), Electricity North West,
          Scottish Power Energy Networks, and Scottish and Southern Electricity Networks. Each has
          their own application process and pricing structure.
        </p>
        <p>
          The application is typically made online through the DNO's connections portal. You will
          need to provide the site address, maximum demand assessment, a site plan, and details of
          the proposed installation. Most DNOs charge a non-refundable application fee of £100 to
          £300 in addition to the connection charge.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: '3-Phase Consumer Unit Costs',
    content: (
      <>
        <p>
          A 3-phase consumer unit (also called a 3-phase distribution board or TP&N board) is
          significantly more expensive than its single-phase equivalent. It must accommodate three
          incoming phases plus neutral, and the protective devices are rated for 3-phase operation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">3-Phase Board Costs (Trade Prices)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic 3-phase distribution board (12-way)</strong> — £300 to £450 trade.
                Unpopulated metal enclosure with incoming 3-phase isolator. Suitable for small
                commercial or workshop installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-phase board with RCBOs and SPD (18 to 24-way)</strong> — £600 to £1,200
                trade. Populated with 3-phase RCBOs, single-phase RCBOs for individual circuits, and
                Type 2 SPD. Required for larger installations with mixed single and 3-phase loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-phase protective devices</strong> — 3-pole MCBs £25 to £50 each, 3-phase
                RCBOs £80 to £150 each, 4-pole RCD £80 to £120, 3-phase SPD £120 to £250. These
                costs add up quickly on a large installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional materials</strong> — 3-phase meter tails (25mm SWA typical) £80
                to £150, earthing conductor, equipotential bonding, cable glands, trunking, and
                labels: £100 to £250.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a typical 3-phase installation with a well-specified distribution board, protective
          devices, SPD, and sundries, total material cost to the electrician is approximately £800
          to £1,500.
        </p>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Installation Costs',
    content: (
      <>
        <p>
          3-phase installation is more complex and time-consuming than single-phase work. The
          electrician must install the distribution board, wire all circuits, ensure correct phase
          rotation, balance loads across phases, complete the earthing and bonding, and carry out
          comprehensive testing.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Straightforward 3-phase board installation in a workshop or commercial premises with
              good access, existing cable routes, and a clear layout. Typical labour time: 1 to 2
              days. Labour cost: £500 to £900.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              Large commercial installation with multiple sub-distribution boards, extensive cable
              runs, containment systems, and integration with existing single-phase circuits. May
              include upgrading earthing arrangements and bonding throughout the building. Labour
              time: 2 to 5 days. Labour cost: £900 to £2,500.
            </p>
          </div>
        </div>
        <p>
          In addition to installation labour, the cost should include comprehensive testing of all
          circuits on all three phases, completion of an{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          , and Part P notification (for domestic premises). Testing a 3-phase installation takes
          significantly longer than single-phase due to the additional measurements required.
        </p>
      </>
    ),
  },
  {
    id: 'total-costs',
    heading: 'Total Cost Breakdown',
    content: (
      <>
        <p>
          Here are realistic total costs for 3-phase installations in 2026, covering the DNO
          connection, materials, labour, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small workshop upgrade (network at boundary)</strong> — £2,500 to £4,000
                total. DNO connection: £1,000 to £1,500. Materials: £800 to £1,200. Labour: £500 to
                £900. Testing and certification: £200 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium commercial premises</strong> — £4,000 to £6,500 total. DNO
                connection: £1,500 to £3,000. Materials: £1,000 to £1,500. Labour: £900 to £1,500.
                Testing and certification: £300 to £500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large installation with network reinforcement</strong> — £6,500 to £12,000+
                total. DNO connection: £3,000 to £10,000+. Materials: £1,200 to £2,000. Labour:
                £1,500 to £2,500. Testing and certification: £400 to £600.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote 3-phase installations accurately"
          description="Elec-Mate's quoting app lets you itemise every component across all three phases, apply your margins, and send a professional PDF quote. AI cost engineering checks your prices against trade data."
          icon={Calculator}
        />
        <p>
          Note that the DNO connection cost is the single biggest variable and is largely outside
          the electrician's control. The internal installation cost is more predictable and can be
          quoted accurately once the specification is agreed.
        </p>
      </>
    ),
  },
  {
    id: 'timeline',
    heading: 'DNO Timeline and Process',
    content: (
      <>
        <p>
          The DNO connection process has several stages, and the timeline is often the most
          frustrating part of a 3-phase upgrade for customers. Setting realistic expectations from
          the outset is essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application submission</strong> — completed online via the DNO's connections
                portal. Requires site address, maximum demand assessment, site plan, and proposed
                installation details. Allow 1 to 2 weeks for the application to be processed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO survey and quotation</strong> — the DNO surveys the site and provides a
                formal quotation. This typically takes 2 to 4 weeks from application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Acceptance and payment</strong> — once the customer accepts the quotation
                and pays, the DNO schedules the installation work. Payment is usually required in
                full before work is scheduled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO installation</strong> — the DNO installs the service cable, cutout, and
                meter. This is typically scheduled 4 to 8 weeks after payment, depending on the
                DNO's workload and the complexity of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total timeline</strong> — 6 to 12 weeks from application to energisation is
                typical. Complex installations requiring network reinforcement can take 16 weeks or
                more. Plan the internal electrical installation to be ready before the DNO
                energisation date.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As the electrician, you should coordinate with the DNO and the customer to ensure the
          internal installation is complete and ready for commissioning on the day the supply is
          energised. This avoids unnecessary delays and return visits.
        </p>
      </>
    ),
  },
  {
    id: 'g99-notification',
    heading: 'G99 Notification for 3-Phase Generation',
    content: (
      <>
        <p>
          If the 3-phase installation includes generation equipment — solar PV, wind turbines, or
          battery storage — Engineering Recommendation G99 applies. This is the DNO's process for
          managing connections of generation equipment to the distribution network.
        </p>
        <p>
          For single-phase generation up to 3.68 kW, or 3-phase generation up to 3.68 kW per phase
          (11.04 kW total), the simpler G98 notification process applies. For anything above these
          thresholds, G99 application and approval is required before the system can be energised.
        </p>
        <p>
          G99 applications require detailed technical information about the generation equipment,
          inverter specifications, protection settings, and the proposed connection arrangement. The
          DNO will assess whether the local network can accommodate the generation and may require
          network upgrades or impose export limitations.
        </p>
        <p>
          For electricians installing 3-phase solar PV or battery storage systems, understanding the
          G99 process is essential. The application should be submitted early in the project
          timeline as DNO approval can take 4 to 8 weeks.
        </p>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors Affecting 3-Phase Installation Price',
    content: (
      <>
        <p>
          Every 3-phase installation is different. Here are the main factors that influence the
          total cost:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distance from 3-phase network</strong> — this is by far the biggest cost
                variable. If the 3-phase network runs past the property, the connection cost is
                minimal. If cables must be run hundreds of metres, the cost can exceed £10,000 for
                the DNO work alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required capacity</strong> — a 60A per phase supply is standard, but higher
                capacities (100A per phase or more) cost more from the DNO and require larger cables
                and distribution equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of circuits</strong> — more circuits mean a larger distribution
                board, more protective devices, and more testing time. A 12-way board for a workshop
                costs significantly less than a 36-way board for a commercial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable runs and containment</strong> — long cable runs between the meter and
                the distribution board, or between the main board and sub-distribution boards, add
                to material and labour costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements</strong> — a 3-phase installation requires adequate
                earthing. If the existing earthing is insufficient or needs upgrading, this adds
                cost. Under BS 7671 Regulation 411.3.3, RCD protection is required for socket-outlet
                circuits not exceeding 32A in all installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — London and the South East are 15% to 25% more expensive
                than the national average for both DNO charges and electrician labour rates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting 3-Phase Work',
    content: (
      <>
        <p>
          3-phase installations are higher-value jobs with good margins for competent electricians.
          They require more planning and coordination than domestic single-phase work, but the
          higher project values make them worthwhile. Here are tips for quoting 3-phase work
          effectively:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Maximum Demand Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always carry out a proper maximum demand assessment before quoting. This
                  determines the required supply capacity and informs the DNO application. Use
                  diversity factors from BS 7671 Table 1A or Appendix A of the On-Site Guide to
                  calculate the expected load per phase.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Separate DNO and Internal Costs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always quote the internal electrical installation separately from the DNO
                  connection cost. Make it clear to the customer that the DNO charge is set by the
                  DNO and is outside your control. Provide an estimate based on similar local
                  projects, but direct the customer to apply to the DNO for a formal quotation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification and Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in adequate time for testing a 3-phase installation. Phase rotation checks,
                  loop impedance on all three phases, RCD testing, insulation resistance on each
                  phase, and continuity testing all take longer on a 3-phase system. Use{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Elec-Mate's EIC app
                  </SEOInternalLink>{' '}
                  to complete the certification efficiently on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify 3-phase installations"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, cable sizing, and on-site EIC certification. Everything you need for 3-phase work. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ThreePhaseInstallationCostPage() {
  return (
    <GuideTemplate
      title="3-Phase Installation Cost UK 2026 | Supply Upgrade Guide"
      description="How much does a 3-phase installation cost in the UK in 2026? Complete guide covering DNO application costs, 3-phase consumer units, labour, G99 notification, and total project costs for workshops, commercial premises, and EV fleet charging."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          3-Phase Installation Cost:{' '}
          <span className="text-yellow-400">UK Supply Upgrade Guide 2026</span>
        </>
      }
      heroSubtitle="How much does a 3-phase supply upgrade cost? This guide covers DNO application fees, 3-phase consumer unit costs, labour rates, G99 notification, and the factors that determine the total price — whether you are a property owner planning an upgrade or an electrician quoting the work."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About 3-Phase Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote 3-Phase Installations with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI-powered cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
