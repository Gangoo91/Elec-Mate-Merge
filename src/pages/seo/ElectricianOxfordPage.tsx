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
  Landmark,
  GraduationCap,
  ClipboardCheck,
  Home,
  ShoppingBag,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Location Guides', href: '/guides/electrician-near-me' },
  { label: 'Oxford', href: '/guides/electrician-oxford' },
];

const tocItems = [
  { id: 'overview', label: 'Electrical Work in Oxford' },
  { id: 'dno', label: 'SSEN as DNO' },
  { id: 'university-buildings', label: 'University & College Buildings' },
  { id: 'listed-buildings', label: 'Listed Buildings & Conservation' },
  { id: 'cowley-new-builds', label: 'Cowley & East Oxford New Builds' },
  { id: 'westgate-commercial', label: 'Westgate & Commercial Development' },
  { id: 'pricing', label: 'Pricing Guide' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Oxford is served by Scottish and Southern Electricity Networks (SSEN) as the Distribution Network Operator. All new connections, service upgrades, and G98/G99 notifications go through SSEN Southern Electric Power Distribution.',
  'The University of Oxford comprises 39 colleges and over 200 university buildings. Many are Grade I or Grade II* listed, requiring specialist heritage electrical skills and close liaison with college bursars, university estates, and conservation architects.',
  'Oxford has over 1,600 listed buildings and extensive conservation areas. The city centre, Jericho, North Oxford, Headington Hill, and Iffley are all within conservation areas with strict controls on external electrical work and alterations to listed properties.',
  'East Oxford and Cowley are undergoing significant new-build residential development, driven by the Oxford Local Plan targets and the redevelopment of former industrial sites. This provides steady domestic electrical work for first-fix and second-fix contractors.',
  'The Westgate Oxford shopping centre redevelopment and ongoing commercial projects in the city centre and Oxford Science Park generate substantial commercial electrical demand, from retail fit-outs to laboratory and office installations.',
];

const faqs = [
  {
    question: 'Who is the DNO for Oxford?',
    answer:
      'Scottish and Southern Electricity Networks (SSEN), operating as Southern Electric Power Distribution (SEPD), is the Distribution Network Operator for Oxford and the surrounding Oxfordshire area. SSEN manages the electricity distribution network from 132kV down to 230V. All new connections, disconnections, service upgrades, meter relocations, and G98/G99 notifications for solar PV, battery storage, or EV charger installations must go through SSEN. Their connections portal handles applications online. The SSEN Southern region covers Oxfordshire, Berkshire, Hampshire, Dorset, Wiltshire, Gloucestershire, and parts of surrounding counties.',
  },
  {
    question: 'How do I get electrical work with Oxford University colleges?',
    answer:
      'Oxford University has 39 colleges, each independently managed with its own estates and maintenance teams. The approach is similar to Cambridge: contact the college domestic bursar or estates manager to express interest. Most colleges maintain approved contractor lists requiring evidence of competent person scheme membership, public liability insurance (£5 million minimum, some colleges require £10 million), and demonstrated experience with listed building electrical work. The University Estates Services department manages university-owned buildings separately and has its own framework contracts — these are typically tendered and larger in scope. Smaller colleges such as Harris Manchester, Regent Park, and St Cross may be more accessible starting points. Colleges value reliability and sensitivity to the historic environment above all else.',
  },
  {
    question: 'What is different about electrical work in Cowley and East Oxford?',
    answer:
      'Cowley and East Oxford represent a different market to the historic city centre. The former BMW Mini factory site and surrounding areas are being redeveloped with new residential and mixed-use schemes. The existing housing stock is predominantly 1930s to 1960s semi-detached and terraced houses, many of which still have original wiring requiring full rewires. The HMO (House in Multiple Occupation) market is significant — Oxford Brookes University students and young professionals create demand for HMO conversions, each requiring additional fire alarm systems (typically LD2 or LD1 to BS 5839-6), additional socket outlets, and sometimes new submains to individual letting rooms. HMO licensing in Oxford requires a satisfactory EICR.',
  },
  {
    question: 'How much does electrical work cost in Oxford?',
    answer:
      'Oxford pricing is among the highest outside London, driven by the strong economy, university demand, and high cost of living. A full domestic rewire for a standard 3-bedroom house costs £4,000 to £6,500. Listed building rewires in the city centre or North Oxford attract a 25% to 40% premium — expect £5,500 to £9,000 for a Grade II listed 3-bedroom property. Consumer unit upgrades range from £500 to £800. Domestic EICRs cost £200 to £320 for a 3-bedroom property. EV charger installations range from £850 to £1,500 supply and fit. Day rates for qualified electricians in Oxford range from £280 to £380 for domestic work and £320 to £450 for commercial. The Summertown, North Oxford, and Headington areas command the highest domestic rates.',
  },
  {
    question: 'What commercial electrical opportunities exist in Oxford?',
    answer:
      'Oxford has a diverse commercial electrical market. The Westgate Oxford shopping centre and surrounding retail streets require ongoing maintenance, fit-outs, and periodic inspection. The Oxford Science Park and Harwell Science and Innovation Campus (south of the city) generate laboratory, office, and research facility electrical work. The hospital sector — the John Radcliffe, Churchill, and Nuffield Orthopaedic Centre — provides healthcare electrical maintenance and upgrade work. The growing film and TV production industry at Oxford Studios also creates demand for temporary and permanent power installations. The Oxford to Cambridge Arc development corridor is driving long-term growth in commercial construction across the region.',
  },
  {
    question: 'Do I need any extra qualifications to work on Oxford University buildings?',
    answer:
      'Working on Oxford University college and university buildings does not require qualifications beyond the standard for your type of work, but you will need to demonstrate a strong track record with heritage and listed building electrical work. Most colleges require: NICEIC, NAPIT, or ELECSA registration as a competent person; public liability insurance of at least £5 million (some colleges require £10 million); CSCS card for access to university-managed sites; and evidence of experience with similar historic properties. For laboratory work in the science departments, familiarity with fume cupboard interlocks, dedicated instrument circuits, and emergency power arrangements is expected. Asbestos awareness training is also essential — many Oxford university buildings contain asbestos in pipe lagging, floor tiles, and ceiling materials. For contract work through University Estates Services, health and safety documentation including method statements and risk assessments will be required for every project.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete EICRs on site for HMO licensing, college inspections, and landlord compliance in Oxford.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for rewires in period properties and new-build installations across Oxford.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for new circuits, rewires, and HMO conversions.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-guide',
    title: 'EICR Guide',
    description:
      'Complete guide to EICRs — inspection intervals, coding, and HMO licensing requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, HMO conversions, and commercial work with professional itemised PDFs.',
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
    heading: 'Electrical Work in Oxford: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Oxford is one of the most diverse electrical markets in the south of England. The city
          centre is dominated by the University of Oxford's 39 colleges and hundreds of university
          buildings, many dating from the 12th century onwards and heavily protected by listing and
          conservation area status. At the same time, East Oxford and Cowley are experiencing
          significant new-build development, and the city's growing technology and science sectors
          drive high-value commercial work.
        </p>
        <p>
          The HMO (House in Multiple Occupation) market is particularly strong in Oxford, driven by
          Oxford Brookes University, the large hospital workforce, and young professionals who
          cannot afford Oxford house prices. HMO electrical work — additional fire alarms, extra
          circuits, and licensing-compliant EICRs — is a steady revenue stream.
        </p>
        <p>
          This guide covers the DNO arrangements, university and college electrical work, listed
          building requirements, new-build opportunities, commercial development, and realistic
          pricing for electricians working in Oxford and the surrounding area.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'SSEN: Your DNO in Oxford',
    content: (
      <>
        <p>
          Oxford and the wider Oxfordshire area are served by{' '}
          <strong>Scottish and Southern Electricity Networks (SSEN)</strong>, operating under the
          Southern Electric Power Distribution (SEPD) licence. SSEN manages the distribution
          network from 132kV down to the 230V supply at properties.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key DNO Information for Oxford</h3>
          <div className="space-y-3 text-white text-sm leading-relaxed">
            <p>
              <strong>DNO:</strong> Scottish and Southern Electricity Networks (Southern Electric
              Power Distribution plc)
            </p>
            <p>
              <strong>MPAN prefix:</strong> 22 (Southern region)
            </p>
            <p>
              <strong>New connections:</strong> Apply via the SSEN connections portal for new
              supplies, service upgrades (single-phase to three-phase), meter relocations, and
              temporary supplies. SSEN Southern typically has reasonable turnaround times for
              standard domestic connections.
            </p>
            <p>
              <strong>G98/G99 notifications:</strong> Solar PV, battery storage, and EV charger
              installations that export to the grid require G98 (up to 16A per phase) or G99
              (larger systems) notification to SSEN before energisation.
            </p>
            <p>
              <strong>Earthing:</strong> Most of Oxford is PME (TN-C-S) earthing. Some older
              properties in the city centre may still have TN-S earthing via lead sheath cable.
              Properties in North Oxford and Headington built in the 1920s and 1930s may have TN-S
              earthing that has not been converted. Always verify the earthing arrangement at the
              service head before starting work.
            </p>
          </div>
        </div>
        <p>
          SSEN is rolling out smart meter and network monitoring upgrades across Oxfordshire. For
          large commercial connections (three-phase or high-demand) at the Oxford Science Park or
          hospital sites, early engagement with SSEN's connections team is essential as network
          capacity constraints can cause delays.
        </p>
      </>
    ),
  },
  {
    id: 'university-buildings',
    heading: 'University of Oxford Electrical Work',
    content: (
      <>
        <p>
          The University of Oxford is one of the largest property owners in the city, with 39
          colleges and over 200 university-owned buildings. The oldest colleges — University
          College (1249), Balliol (1263), and Merton (1264) — have buildings spanning nearly 800
          years. The electrical requirements are both vast and varied.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student accommodation</strong> — each college houses hundreds of students.
                Rooms need periodic inspection, socket upgrades (USB charging is now standard),
                smoke detector compliance, and summer vacation rewiring programmes. The vacation
                window (late June to September) is when major electrical work is scheduled —
                plan capacity accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Libraries and archives</strong> — the Bodleian Library, Radcliffe Camera, and
                individual college libraries have stringent environmental control requirements.
                Electrical work in these spaces often involves specialist lighting (UV-filtered for
                preservation), humidity control systems, and fire suppression rather than sprinkler
                systems to protect irreplaceable collections. All work must be silent during reading
                hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Laboratories</strong> — the university's science departments (Chemistry,
                Physics, Engineering Science, and the Pathology building) have extensive laboratory
                electrical requirements including fume cupboard interlocks, dedicated instrument
                circuits, three-phase power, and emergency power arrangements. The Biochemistry and
                Structural Genomics buildings at the Science Area are among the most electrically
                intensive buildings in Oxford.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conference and events</strong> — colleges host conferences, weddings, and
                events outside term time. Temporary power, outdoor lighting, marquee supplies, and
                event-specific electrical work provide seasonal income. Some colleges invest
                significantly in upgrading their event facilities — new kitchen equipment, PA
                systems, and architectural lighting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          University Estates Services manages the larger university buildings and runs framework
          contracts for electrical maintenance and capital projects. Individual colleges manage
          their own approved contractor lists. Both require proven heritage skills and reliability.
        </p>
      </>
    ),
  },
  {
    id: 'listed-buildings',
    heading: 'Listed Buildings and Conservation Areas in Oxford',
    content: (
      <>
        <p>
          Oxford has over 1,600 listed buildings, including some of the most significant historic
          structures in England. The city centre, Jericho, St Clements, North Oxford (the area of
          large Victorian houses between Banbury Road and Woodstock Road), Headington Hill, and
          Iffley are all within conservation areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cotswold stone properties</strong> — many Oxford buildings use Headington
                stone or Cotswold limestone, which is relatively soft and porous. Never chase cable
                routes into Cotswold stone — it will crack and crumble. Route cables through mortar
                joints where necessary, or preferably through existing voids, under floors, and
                behind existing joinery. Surface fixings into stone require stainless steel or brass
                screws in pre-drilled holes to avoid cracking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North Oxford Victorian villas</strong> — the large Victorian and Edwardian
                houses of North Oxford (Norham Gardens, Park Town, Bardwell Road) are predominantly
                Grade II listed. These properties have high ceilings, deep ceiling voids, and
                substantial floor voids that make rewiring relatively straightforward despite the
                listing — the challenge is in the visible accessories and surface finishes rather
                than cable routing. Heritage brass switches and sockets are typically expected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area controls</strong> — in Oxford's conservation areas,
                external changes require planning permission. This affects external cable routes,
                meter box positions, satellite dishes, external lighting, and EV charger mounting.
                The Oxford City Council conservation team is active and will enforce — do not assume
                external electrical work can proceed without checking.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Heritage electrical work in Oxford is a premium market. The{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            correct certification
          </SEOInternalLink>{' '}
          should document heritage constraints and the methods used to protect the building fabric.
          Photography of completed concealed routes before closing up is good practice for both your
          records and the building's maintenance history.
        </p>
      </>
    ),
  },
  {
    id: 'cowley-new-builds',
    heading: 'Cowley and East Oxford: New Builds and HMOs',
    content: (
      <>
        <p>
          East Oxford and Cowley present a completely different market to the historic city centre.
          The area is characterised by 1930s to 1960s housing stock, former industrial sites being
          redeveloped for residential use, and a large HMO sector serving Oxford Brookes University
          students and hospital workers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New-build developments</strong> — the Oxford Local Plan allocates significant
                housing development in East Oxford, Cowley, Barton Park, and the Oxpens site. New-
                build residential electrical work (first-fix and second-fix) provides volume work for
                contractors. The Barton Park development alone comprises over 800 homes. New builds
                in Oxford increasingly require EV charger pre-wiring to meet Building Regulations
                Part S.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO electrical requirements</strong> — Oxford City Council operates a
                mandatory HMO licensing scheme. Licensed HMOs require a satisfactory EICR (maximum 5
                years old), fire alarm system to BS 5839-6 (typically LD2 or LD1 depending on risk
                assessment), emergency lighting in escape routes, and adequate socket provision in
                each letting room. Converting a house to an HMO is a common job in Cowley, Iffley
                Road, and Headington — typically involving new distribution boards, fire alarm
                installation, additional circuits, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1950s–60s rewiring</strong> — Cowley's post-war housing estates (Rose Hill,
                Blackbird Leys, Greater Leys) were built in the 1950s and 1960s. Many still have
                original wiring — rubber-insulated cables, surface-mounted metal consumer units
                with rewirable fuses, and ring finals run in imperial-sized conduit. These properties
                are now 60 to 75 years old and approaching or past the point where a full rewire is
                necessary. This is steady, bread-and-butter rewiring work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The HMO market alone provides significant recurring work — EICRs every 5 years, fire alarm
          servicing, and reactive maintenance for landlords who manage multiple properties. Building
          relationships with Oxford letting agents and landlords is a reliable business strategy.
        </p>
      </>
    ),
  },
  {
    id: 'westgate-commercial',
    heading: 'Westgate and Commercial Development in Oxford',
    content: (
      <>
        <p>
          Oxford's commercial electrical market is growing, driven by retail development, the
          expanding science and technology sector, and the healthcare infrastructure around the
          John Radcliffe and Churchill hospitals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Westgate Oxford</strong> — the redeveloped Westgate shopping centre is one of
                the largest retail destinations in the south of England. Ongoing tenant fit-outs,
                food court installations, cinema and leisure electrical work, and building management
                system maintenance create regular commercial opportunities. Retail fit-out work
                typically involves lighting design, small power, data cabling, fire alarm
                integration, and emergency lighting — all to commercial timescales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oxford Science Park and Harwell</strong> — the Oxford Science Park
                (Littlemore) and Harwell Science and Innovation Campus (south of Didcot) are major
                employers generating laboratory, cleanroom, and office electrical work. The Diamond
                Light Source at Harwell has specialist power requirements. These sites are accessible
                from Oxford and provide high-value commercial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Healthcare</strong> — the Oxford University Hospitals NHS Foundation Trust
                operates the John Radcliffe, Churchill, Horton, and Nuffield Orthopaedic Centre
                hospitals. Healthcare electrical work includes medical gas alarm panels, nurse call
                systems, theatre lighting, and critical power infrastructure. NHS framework contracts
                are competitive but provide long-term, reliable income.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oxford to Cambridge Arc</strong> — the government-backed Ox-Cam development
                corridor is driving long-term growth in commercial and residential construction
                across Oxfordshire. Major infrastructure projects, new settlements, and commercial
                development will generate electrical work for years to come.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Commercial electrical work in Oxford requires CSCS card, asbestos awareness training, and
          often SSSTS or SMSTS certification for site access. Build these qualifications into your
          business plan if targeting the commercial sector.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Pricing Guide for Oxford',
    content: (
      <>
        <p>
          Oxford pricing reflects the high cost of living and strong demand across all sectors. Rates
          are comparable to outer London boroughs in many cases, particularly for heritage and
          commercial work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Domestic Rewire (3-bed)</h4>
                <p className="text-white text-2xl font-bold">£4,000 – £6,500</p>
                <p className="text-white text-sm mt-1">Standard terraced or semi-detached</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Listed Building Rewire</h4>
                <p className="text-white text-2xl font-bold">£5,500 – £9,000</p>
                <p className="text-white text-sm mt-1">25–40% premium for heritage constraints</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Consumer Unit Upgrade</h4>
                <p className="text-white text-2xl font-bold">£500 – £800</p>
                <p className="text-white text-sm mt-1">Dual RCD or RCBO board, testing, cert</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EICR (Domestic)</h4>
                <p className="text-white text-2xl font-bold">£200 – £320</p>
                <p className="text-white text-sm mt-1">3-bed property, full report</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">HMO Conversion (Electrical)</h4>
                <p className="text-white text-2xl font-bold">£2,500 – £5,000</p>
                <p className="text-white text-sm mt-1">Fire alarm, extra circuits, EICR, cert</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Day Rate</h4>
                <p className="text-white text-2xl font-bold">£280 – £380</p>
                <p className="text-white text-sm mt-1">Qualified electrician, Oxford area</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          These rates are indicative for 2026. North Oxford and Summertown command the highest
          domestic rates; Cowley and Blackbird Leys are more price-sensitive. Commercial rates vary
          significantly by sector — retail fit-outs at £300 to £400 per day, laboratory work at
          £380 to £500. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
          produce accurate, itemised quotes tailored to the Oxford market.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Your Business in Oxford',
    content: (
      <>
        <p>
          Oxford rewards electricians who can work across multiple sectors — heritage domestic,
          new-build, HMO, and commercial. The city has enough work to specialise, but the most
          successful Oxford electricians maintain a diverse client base that provides stability.
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
                  for HMO licensing, college periodic inspections, and landlord compliance. AI-
                  assisted observation coding and instant PDF export. Essential for the Oxford HMO
                  market.
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
                  Size cables for rewires, new builds, and HMO conversions with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Factor in derating for concealed routes in listed buildings and long cable runs
                  in large North Oxford villas.
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
                  Quote heritage rewires, HMO conversions, and commercial fit-outs with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Itemised PDF quotes with your branding, sent from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional certification for Oxford electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Heritage, HMO, or commercial — certify it all on site. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianOxfordPage() {
  return (
    <GuideTemplate
      title="Electrician in Oxford | Local Electrical Guide"
      description="Complete guide for electricians working in Oxford. SSEN DNO, university college electrical work, listed building challenges, Cowley new builds, HMO conversions, Westgate commercial development, and realistic Oxford pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Oxford:{' '}
          <span className="text-yellow-400">Local Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Oxford's world-class university, booming science sector, and thriving HMO market offer diverse opportunities for electricians. This guide covers the DNO, college work, heritage requirements, new builds, commercial development, and realistic pricing."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Work in Oxford"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Electrical Work in Oxford — On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Heritage, HMO, or commercial — certify it all on site. 7-day free trial."
    />
  );
}
