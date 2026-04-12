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
  Droplets,
  Landmark,
  GraduationCap,
  ClipboardCheck,
  Microscope,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Location Guides', href: '/guides/electrician-near-me' },
  { label: 'Cambridge', href: '/guides/electrician-cambridge' },
];

const tocItems = [
  { id: 'overview', label: 'Electrical Work in Cambridge' },
  { id: 'dno', label: 'UKPN as DNO' },
  { id: 'university-colleges', label: 'University College Maintenance' },
  { id: 'listed-buildings', label: 'Listed Buildings & Conservation' },
  { id: 'biotech-commercial', label: 'Biotech & Commercial Work' },
  { id: 'fen-flooding', label: 'Fen Flooding Risk' },
  { id: 'pricing', label: 'Pricing Guide' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cambridge is served by UK Power Networks (UKPN) as the Distribution Network Operator. All new connections, service upgrades, and G98/G99 notifications go through UKPN Eastern Power Networks.',
  'The University of Cambridge comprises 31 colleges, many occupying Grade I and Grade II* listed buildings dating from the 13th century. Electrical maintenance, rewiring, and upgrades in college buildings require specialist heritage skills and close liaison with college bursars and conservation architects.',
  'Cambridge has over 1,500 listed buildings concentrated in the city centre. Listed Building Consent is required for any electrical work affecting the character of the building — including surface-mounted wiring, external cable routes, and consumer unit positions.',
  'The Cambridge biotech corridor (centred on the Cambridge Biomedical Campus, Granta Park, and the Science Park) generates high-value commercial electrical work including clean room power, UPS systems, laboratory fit-outs, and data centre installations.',
  'Low-lying Fen areas around Cambridge (Chesterton, Riverside, Fen Ditton, and Waterbeach) are susceptible to groundwater flooding, requiring consideration of socket outlet heights and consumer unit positioning in at-risk properties.',
];

const faqs = [
  {
    question: 'Who is the DNO for Cambridge?',
    answer:
      'UK Power Networks (UKPN) is the Distribution Network Operator for Cambridge and the surrounding Cambridgeshire area, operating under the Eastern Power Networks licence. UKPN manages the electricity distribution network from 132kV down to 230V. All new connections, disconnections, service upgrades, and G98/G99 notifications for solar PV, battery storage, or EV charger installations must go through UKPN. Their connections portal handles new applications online. The UKPN Eastern region covers Cambridgeshire, Norfolk, Suffolk, Essex, and parts of Bedfordshire and Hertfordshire.',
  },
  {
    question: 'How do I get electrical maintenance work with Cambridge colleges?',
    answer:
      'Each of the 31 Cambridge colleges manages its own maintenance independently — there is no central procurement. The route in is through the college domestic bursar or estates manager. Most colleges maintain an approved contractor list and require evidence of competent person scheme membership (NICEIC, NAPIT, or similar), appropriate insurance (typically £5 million public liability minimum), and experience with listed building electrical work. Start by approaching smaller colleges that may not have long-standing contractor relationships. Work quality, reliability, and sensitivity to the historic environment are what keep you on the approved list. Some colleges also use the University Estates Division framework for larger projects, which has its own tender process.',
  },
  {
    question: 'What electrical work is available in the Cambridge biotech corridor?',
    answer:
      'The Cambridge biotech corridor is one of the largest life sciences clusters in Europe, with over 400 companies employing more than 20,000 people. Electrical work includes: clean room and laboratory fit-outs requiring dedicated power supplies, isolated earth systems, and EMC-compliant installations; UPS (uninterruptible power supply) systems for critical laboratory and data equipment; three-phase power distribution for scientific instruments and manufacturing equipment; data centre power and cooling infrastructure; emergency lighting and fire alarm systems to commercial standards; and general electrical fit-outs for new office and laboratory buildings. The Cambridge Biomedical Campus, Granta Park, Babraham Research Campus, and Cambridge Science Park are the main sites. This is high-value work — commercial fit-out rates in Cambridge are among the highest outside London.',
  },
  {
    question: 'How much does a rewire cost in Cambridge?',
    answer:
      'A full domestic rewire in Cambridge typically costs £4,000 to £7,000 for a standard 3-bedroom Victorian or Edwardian terraced house, including a new consumer unit, full circuit rewire, testing, certification, and making good. Cambridge rates are above the national average due to the high cost of living and strong demand. For larger properties (4 to 5 bedrooms), expect £6,000 to £10,000. Listed building rewires in the city centre attract a 25% to 45% premium — a Grade II listed 3-bedroom townhouse might cost £5,500 to £9,500 due to concealed routing requirements, heritage fixings, and the slower pace of work required to protect original fabric. Areas with high rewire demand include the Victorian terraces of Romsey Town, Mill Road, and the Kite.',
  },
  {
    question: 'Is there flood risk for electrical work in Cambridge?',
    answer:
      'Cambridge sits on the edge of the Fens, and several areas are at risk of groundwater and river flooding. The River Cam and its tributaries can flood properties in Chesterton, Riverside, Fen Ditton, Stourbridge Common, and parts of Newnham. Waterbeach and other villages north of Cambridge are in Fen flood risk zones. For electrical work in these areas, consider raising socket outlets above typical flood levels on ground floors, positioning the consumer unit at a higher level where possible, and using IP-rated accessories in areas prone to dampness. After any flooding event, a full inspection and insulation resistance testing of all affected circuits is required before re-energisation. The IET guidance on electrical installations after flooding applies.',
  },
  {
    question: 'Do Cambridge landlords need an EICR?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Cambridge to obtain an Electrical Installation Condition Report at least every 5 years (or at the start of each tenancy). The report must be carried out by a qualified and competent person and provided to tenants and to South Cambridgeshire District Council or Cambridge City Council on request. Cambridge has a large student rental market across Mill Road, Romsey Town, and the Kite, where older Victorian terraces frequently present C2 defects including inadequate RCD protection and deteriorated cable insulation. HMOs — of which Cambridge has a very large number — are subject to additional mandatory licensing and electrical safety conditions on top of the EICR requirement.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on site for college buildings, commercial premises, and landlord compliance.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for domestic rewires and commercial fit-outs. Automatic derating and voltage drop calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for new circuits, rewires, and commercial installations.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Guide',
    description:
      'Complete guide to Electrical Installation Condition Reports — intervals, coding, and commercial requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, commercial fit-outs, and maintenance contracts with professional itemised PDFs.',
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
    heading: 'Electrical Work in Cambridge: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Cambridge is one of the most rewarding and demanding markets for electricians in the UK.
          The city combines an extraordinarily high concentration of listed buildings and heritage
          properties with a fast-growing biotech and technology sector that demands
          high-specification commercial electrical work. The result is a market where skilled
          electricians can command premium rates across both domestic and commercial sectors.
        </p>
        <p>
          The University of Cambridge, with 31 colleges and hundreds of university buildings, is one
          of the largest property estates in the city. Many college buildings date from the 13th to
          17th centuries and require specialist electrical work that respects their historic fabric
          whilst meeting modern safety standards. Beyond the university, Cambridge's booming life
          sciences sector at the Cambridge Biomedical Campus, Science Park, and surrounding research
          parks generates substantial commercial electrical demand.
        </p>
        <p>
          This guide covers the DNO arrangements, university and college work, listed building
          requirements, commercial opportunities in the biotech corridor, flood risk considerations,
          and realistic pricing for electricians in Cambridge.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'UK Power Networks: Your DNO in Cambridge',
    content: (
      <>
        <p>
          Cambridge and the wider Cambridgeshire area are served by{' '}
          <strong>UK Power Networks (UKPN)</strong>, operating under the Eastern Power Networks
          licence. UKPN manages the distribution network from 132kV down to the 230V supply at
          domestic and commercial premises.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key DNO Information for Cambridge</h3>
          <div className="space-y-3 text-white text-sm leading-relaxed">
            <p>
              <strong>DNO:</strong> UK Power Networks (Eastern Power Networks plc)
            </p>
            <p>
              <strong>MPAN prefix:</strong> 20 (Eastern region)
            </p>
            <p>
              <strong>New connections:</strong> Apply via the UKPN connections portal for new
              supplies, upgrades (single-phase to three-phase), service alterations, temporary
              builder supplies, and meter relocations.
            </p>
            <p>
              <strong>G98/G99 notifications:</strong> Solar PV, battery storage, and any generation
              or storage connected to the network requires G98 (up to 16A per phase) or G99 (larger
              systems) notification to UKPN before energisation. UKPN has an online portal for G98
              notifications.
            </p>
            <p>
              <strong>Earthing:</strong> Most of Cambridge is PME (TN-C-S). Older properties in the
              city centre may have TN-S (separate neutral and earth via lead sheath cable) or, in
              rare cases, TT earthing. Always verify the earthing arrangement at the service head.
              Some older college buildings have complex earthing arrangements that have been
              modified over many decades — do not assume.
            </p>
          </div>
        </div>
        <p>
          UKPN Eastern region tends to have good response times for new connections in the Cambridge
          area due to the high volume of development. However, three-phase upgrades and network
          reinforcement for larger commercial sites can still take 3 to 6 months — factor this into
          project planning for biotech and laboratory fit-outs.
        </p>
      </>
    ),
  },
  {
    id: 'university-colleges',
    heading: 'University College Electrical Maintenance',
    content: (
      <>
        <p>
          The University of Cambridge comprises 31 colleges, each an independent institution that
          manages its own buildings and maintenance. The oldest colleges — Peterhouse (1284), Clare
          (1326), and Pembroke (1347) — occupy buildings that span nearly 750 years of construction.
          Even newer colleges such as Robinson (1977) and Murray Edwards (1954) have substantial
          electrical maintenance requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student accommodation</strong> — each college provides accommodation for
                hundreds of students. Rooms require periodic inspection, PAT testing of provided
                appliances, smoke detector maintenance, and regular upgrades to socket provision
                (modern students expect USB charging points and multiple sockets). Summer vacation
                is the primary window for major electrical work in student rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchens and catering</strong> — college kitchens serve hundreds of meals
                daily during term. Commercial kitchen electrical work includes three-phase cooking
                equipment, extract ventilation, cold room circuits, dishwasher supplies, and
                emergency lighting. Many college kitchens have been progressively upgraded over
                decades, resulting in complex distribution systems that require careful survey.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chapels and historic halls</strong> — college chapels (King's College Chapel
                is Grade I listed and a Scheduled Ancient Monument) and dining halls require
                specialist lighting, often with dimming systems for atmospheric effect. Wiring in
                these spaces must be completely concealed, and any work requires Listed Building
                Consent. Fire alarm and emergency lighting in large historic spaces need careful
                design to avoid visual intrusion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Laboratories and IT</strong> — university departments and college libraries
                have significant power and data requirements. Server rooms, teaching laboratories,
                and research facilities need dedicated circuits, UPS provision, and regular thermal
                imaging surveys of distribution boards under load.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Getting onto a college approved contractor list requires patience, quality, and
          reliability. Start with smaller colleges, deliver exceptional work, and let your
          reputation build. Once established, college maintenance work provides stable, long-term
          revenue.
        </p>
      </>
    ),
  },
  {
    id: 'listed-buildings',
    heading: 'Listed Buildings and Conservation Areas in Cambridge',
    content: (
      <>
        <p>
          Cambridge has over 1,500 listed buildings, including a remarkable number of Grade I and
          Grade II* structures associated with the university. The entire city centre is within a
          conservation area, and additional conservation areas cover Newnham, De Freville, Castle
          Hill, Storeys Way, and other historic neighbourhoods.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade I challenges</strong> — Cambridge has an exceptionally high number of
                Grade I listed buildings (the highest category, buildings of exceptional interest).
                Work on Grade I buildings requires Listed Building Consent and typically involves
                Historic England consultation. The bar for approval is very high — all cables must
                be completely concealed, no fixings into original fabric, and reversibility of
                installations is preferred. Expect longer planning timescales (12+ weeks) and the
                need for a heritage impact assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clunch and Cambridge brick</strong> — many historic Cambridge buildings are
                constructed from clunch (a soft chalk stone) or Cambridge brick (a distinctive
                yellowish-white brick). Clunch is extremely soft and crumbles easily — never chase
                into clunch walls. Cambridge brick is also relatively soft compared to engineering
                brick. Cable routes through these materials require careful core drilling through
                mortar joints rather than the masonry units themselves.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concealment techniques</strong> — in Cambridge listed buildings, common
                concealment approaches include routing through existing floor and ceiling voids,
                running cables behind existing skirting boards and architraves (without removing
                them), using shallow skirting trunking painted to match the existing woodwork, and
                routing through existing service ducts where previous electrical or plumbing work
                created pathways. The key principle is minimal intervention — do as little as
                possible to the historic fabric whilst achieving a safe, compliant installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Heritage electrical work in Cambridge is a specialist niche with limited competition and
          strong demand. The{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            correct certification
          </SEOInternalLink>{' '}
          must document any heritage constraints and the installation methods used to protect the
          building fabric.
        </p>
      </>
    ),
  },
  {
    id: 'biotech-commercial',
    heading: 'Biotech Corridor and Commercial Electrical Work',
    content: (
      <>
        <p>
          The Cambridge biotech corridor is one of Europe's leading life sciences clusters. The
          Cambridge Biomedical Campus (Europe's largest biomedical research campus), Cambridge
          Science Park, Granta Park, Babraham Research Campus, and numerous smaller parks generate
          continuous demand for high-specification commercial electrical work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Microscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Laboratory fit-outs</strong> — research and pharmaceutical laboratories
                require clean power supplies, isolated earth systems to prevent interference with
                sensitive equipment, dedicated circuits for centrifuges, mass spectrometers, and
                other scientific instruments, and emergency power arrangements. Power quality is
                critical — voltage fluctuations and harmonics can compromise experimental results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Microscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean rooms</strong> — pharmaceutical and biotech manufacturing clean rooms
                require HEPA-filtered air handling with dedicated electrical supplies, lighting that
                meets clean room classification requirements, and interlocked power and ventilation
                systems. The electrical installation must not compromise the clean room integrity —
                all penetrations must be sealed, and cable management must allow for regular
                cleaning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Microscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS and resilience</strong> — many biotech facilities require
                uninterruptible power supply systems to protect biological samples, ongoing
                experiments, and data. UPS sizing, battery maintenance, and automatic transfer
                switch installation are regular requirements. Critical freezers storing biological
                samples at -80 degrees C often have dual power feeds and dedicated monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Microscope className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Office and mixed-use</strong> — the broader Cambridge commercial market
                includes office fit-outs, retail units (particularly on the rapidly developing North
                East Cambridge site), and mixed-use developments. Standard commercial electrical
                work — lighting, small power, data, fire alarm, and emergency lighting — forms a
                steady base of work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Commercial rates in Cambridge are among the highest outside London. Day rates for
          commercial fit-out work range from £300 to £450, and laboratory specialist work can
          command £400 to £550 per day. The volume of development shows no signs of slowing.
        </p>
      </>
    ),
  },
  {
    id: 'fen-flooding',
    heading: 'Fen Flooding Risk in Cambridge',
    content: (
      <>
        <p>
          Cambridge sits on the southern edge of the Fens — the low-lying, artificially drained
          landscape of eastern England. Several areas of Cambridge and the surrounding villages are
          at risk of groundwater flooding, surface water flooding, and river flooding from the River
          Cam and its tributaries.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>At-risk areas</strong> — Chesterton, Riverside, Stourbridge Common, and Fen
                Ditton are particularly vulnerable to River Cam flooding. Waterbeach, Cottenham, and
                other villages to the north sit in Fen flood risk zones where land drainage pump
                failure or extreme rainfall can cause widespread surface water flooding. Parts of
                Newnham and Grantchester Meadows are also in flood zone 2 and 3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Groundwater flooding</strong> — a particular issue in the Cambridge area,
                where the chalk aquifer can rise to near surface level after prolonged rainfall.
                This causes damp cellars and basements rather than dramatic river flooding, but the
                effect on electrical installations at low level is the same — corrosion, insulation
                degradation, and safety risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resilient installation practices</strong> — for properties in flood risk
                areas, raise socket outlets to 1,200mm on ground floors, position the consumer unit
                above the known flood level, use IP-rated accessories at low level, and ensure the
                main switch is accessible for quick isolation. These measures do not prevent flood
                damage entirely but significantly reduce the cost and time of reinstatement.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When working on properties in known flood risk areas, advise the customer of resilient
          installation options and document the discussion. The{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR certificate app</SEOInternalLink> can
          record flood-related observations and recommendations.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Pricing Guide for Cambridge',
    content: (
      <>
        <p>
          Cambridge is one of the most expensive cities in the UK outside London, and electrical
          work pricing reflects this. High demand from the university, biotech sector, and affluent
          residential areas (Newnham, Trumpington, Great Shelford) supports premium rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Domestic Rewire (3-bed)</h4>
                <p className="text-white text-2xl font-bold">£4,000 – £7,000</p>
                <p className="text-white text-sm mt-1">Standard Victorian or Edwardian terrace</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Listed Building Rewire</h4>
                <p className="text-white text-2xl font-bold">£5,500 – £9,500</p>
                <p className="text-white text-sm mt-1">25–45% premium for heritage constraints</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Consumer Unit Upgrade</h4>
                <p className="text-white text-2xl font-bold">£500 – £850</p>
                <p className="text-white text-sm mt-1">Dual RCD or RCBO board, testing, cert</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EICR (Domestic)</h4>
                <p className="text-white text-2xl font-bold">£200 – £350</p>
                <p className="text-white text-sm mt-1">3-bed property, full report</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EV Charger Install</h4>
                <p className="text-white text-2xl font-bold">£850 – £1,500</p>
                <p className="text-white text-sm mt-1">Supply and fit, DNO notification</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Day Rate</h4>
                <p className="text-white text-2xl font-bold">£280 – £400</p>
                <p className="text-white text-sm mt-1">Qualified electrician, Cambridge area</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          These rates reflect 2026 Cambridge market conditions. Commercial and biotech work commands
          significantly higher rates — laboratory fit-out day rates of £400 to £550 are common. Use
          Elec-Mate's{' '}
          <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> to
          produce accurate, itemised quotes that reflect Cambridge pricing levels.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Your Business in Cambridge',
    content: (
      <>
        <p>
          Cambridge offers some of the best earning potential for electricians outside London. The
          combination of high-value heritage work, booming biotech commercial demand, university
          maintenance contracts, and affluent residential areas creates a diverse and profitable
          market. Competition exists but demand consistently outstrips supply, particularly for
          electricians with heritage and commercial skills.
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
                  for college periodic inspections, landlord compliance in the student rental
                  market, and commercial premises. AI-assisted observation coding and instant PDF
                  export.
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
                  Size cables for domestic rewires and commercial installations with the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Factor in derating for concealed routes in listed buildings and long cable runs
                  in commercial premises.
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
                  Quote heritage rewires, laboratory fit-outs, and maintenance contracts with
                  Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Itemised PDF quotes with your branding, sent from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional certification for Cambridge electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Heritage, commercial, or biotech — certify it all on site. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCambridgePage() {
  return (
    <GuideTemplate
      title="Electrician in Cambridge | Local Electrical Guide"
      description="Complete guide for electricians working in Cambridge. UKPN DNO, university college electrical maintenance, listed building work, biotech corridor commercial opportunities, Fen flood risk, and realistic Cambridge pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Cambridge:{' '}
          <span className="text-yellow-400">Local Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Cambridge's world-famous university, thriving biotech corridor, and concentration of listed buildings create exceptional opportunities for skilled electricians. This guide covers the DNO, college work, heritage requirements, commercial demand, and realistic pricing."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Work in Cambridge"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Electrical Work in Cambridge — On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Heritage, biotech, or new builds — certify it all on site. 7-day free trial."
    />
  );
}
