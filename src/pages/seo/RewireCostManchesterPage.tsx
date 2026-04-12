import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  Clock,
  Zap,
  FileCheck2,
  Calculator,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Building2,
  MapPin,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Rewire Cost UK', href: '/guides/rewire-cost-uk' },
  { label: 'Rewire Cost Manchester', href: '/guides/rewire-cost-manchester' },
];

const tocItems = [
  { id: 'manchester-pricing', label: 'Manchester Rewire Pricing' },
  { id: 'property-types', label: 'Manchester Property Types' },
  { id: 'signs-rewire-needed', label: 'Signs a Rewire Is Needed' },
  { id: 'how-long', label: 'How Long Does It Take' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'whats-included', label: 'What Is Included in a Quote' },
  { id: 'building-control', label: 'Manchester Building Control' },
  { id: 'find-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Manchester costs between £2,500 and £10,000+ in 2026, broadly in line with the national average — significantly cheaper than London but reflecting the North West market rate.',
  'Manchester has a huge stock of Victorian and Edwardian terraced housing, particularly in Levenshulme, Chorlton, Didsbury, Fallowfield, and Longsight, many with original or outdated wiring.',
  'Rewires are notifiable under Part P of the Building Regulations. Your electrician must be registered with NICEIC, NAPIT, or ELECSA to self-certify the work.',
  'An Electrical Installation Certificate (EIC) must be issued on completion, confirming compliance with BS 7671:2018+A3:2024.',
  'Electrician day rates in Greater Manchester range from £250 to £370 in 2026.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Manchester in 2026?',
    answer:
      'A full rewire in Manchester in 2026 typically costs £2,500–£4,000 for a 1-bed flat, £3,500–£5,500 for a 2-bed terraced house, £5,000–£7,500 for a 3-bed semi-detached, and £7,500–£10,000+ for a 4-bed detached property. Manchester prices are broadly in line with the national average, though specific areas like the city centre (apartment blocks) and affluent suburbs (Didsbury, Altrincham) may command slightly higher rates.',
  },
  {
    question: 'Are Manchester rewire costs cheaper than London?',
    answer:
      'Yes, significantly. Manchester rewire costs are typically 20-30% lower than London. This reflects lower electrician day rates (£250-£370 versus £350-£500 in London), lower overheads (no congestion charge, cheaper parking, lower commercial rents), and a more competitive market with a large pool of qualified electricians across Greater Manchester. A 3-bed rewire that costs £7,000-£10,000 in London would typically cost £5,000-£7,500 in Manchester.',
  },
  {
    question: 'How long does a rewire take in a Manchester terraced house?',
    answer:
      'A typical 2-3 bedroom Victorian or Edwardian terraced house in Manchester takes 6-9 working days to rewire. Many Manchester terraces have been partially modernised over the decades — plasterboard over lath-and-plaster, solid floors in kitchen extensions — which can both help and hinder the process. First fix (chasing, cabling) takes 4-6 days, and second fix (fitting accessories, testing) takes 2-3 days. Properties with cellar access benefit from easier cable routing at ground floor level, potentially reducing the timeline.',
  },
  {
    question: 'Do Manchester terraces with cellars cost less to rewire?',
    answer:
      'Properties with cellars (common in Manchester Victorian terraces, particularly in Chorlton, Levenshulme, and Longsight) can be cheaper and faster to rewire because the cellar provides an accessible route for ground-floor circuit cables. Instead of lifting floorboards or chasing ground-floor walls extensively, cables can run through the cellar ceiling void. This can save 1-2 days of labour, reducing the overall cost by £300-£600. However, some cellars are damp, have low headroom, or contain asbestos-insulated pipes, which may offset this advantage.',
  },
  {
    question: 'Who is the DNO for Manchester?',
    answer:
      'The Distribution Network Operator (DNO) for Manchester and Greater Manchester is Electricity North West (ENW). If your rewire identifies that the incoming supply fuse, meter tails, or earthing arrangement need upgrading, ENW must carry out the supply-side work. ENW supply upgrades can take 2-6 weeks to schedule, so discuss this with your electrician early in the planning process. There is no charge for a standard service fuse upgrade, but more complex supply work may incur costs.',
  },
  {
    question: 'Is there any financial help for rewiring in Manchester?',
    answer:
      'Manchester City Council and some neighbouring authorities (Salford, Stockport, Tameside) offer discretionary home improvement grants or loans for essential repairs, including electrical rewiring. These are typically means-tested and targeted at older or vulnerable homeowners. The Home Improvement Agency operating in your area can advise on eligibility. Additionally, landlords letting properties in Manchester must ensure the electrical installation is safe — the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require a satisfactory EICR, which may trigger a rewire if serious defects are found.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description: 'National rewire pricing guide with average costs by property size.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Consumer unit costs — usually included in a full rewire quote.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate Guide',
    description: 'When an EICR reveals your property needs a rewire.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC certificates on site after a rewire.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description: 'Step-by-step guide to what happens during a house rewire.',
    icon: Home,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'manchester-pricing',
    heading: 'Manchester Rewire Pricing (2026)',
    content: (
      <>
        <p>
          Manchester and Greater Manchester offer rewire prices broadly in line with the national
          average. Electrician day rates across the region range from £250 to £370, with the higher
          end found in city centre apartment work and affluent suburbs like Didsbury, Altrincham,
          and Hale.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Manchester Rewire Costs by Property Type (2026)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>1-bed flat:</strong> £2,500–£4,000 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> £3,500–£5,500 (5–7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £5,000–£7,500 (6–9 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £7,500–£10,000+ (8–12 days)
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include materials, labour, a new{' '}
          <SEOInternalLink href="/guides/consumer-unit-replacement-cost">
            consumer unit
          </SEOInternalLink>{' '}
          with RCBOs and SPD, testing, the EIC, and Part P notification. Making good (plastering and
          decoration) is typically quoted separately.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Manchester Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Greater Manchester has one of the largest concentrations of Victorian and Edwardian
          terraced housing outside London. The region also has significant 1930s suburban
          development and a growing stock of converted warehouse apartments in the city centre.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (1860s–1900s):</strong> Dominant across Levenshulme,
                Longsight, Rusholme, Chorlton, Whalley Range, and parts of Salford. Many were built
                for mill and factory workers and are now being renovated by young families and
                landlords. Common issues include original VIR wiring, no earth connection, and
                rewirable fuse boards. Cellars are common and useful for cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian semis (1900s–1930s):</strong> Found in Didsbury, Chorlton,
                Withington, Prestwich, and Sale. Larger than Victorian terraces, with bay windows
                and more spacious layouts. Many have had extensions and conversions that added
                circuits without upgrading the main installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s–1950s council and private estates:</strong> Extensive across
                Wythenshawe, Gorton, Moston, and parts of Stockport and Tameside. Many still have
                original PVC wiring from the 1950s–1960s, approaching or exceeding its design life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City centre apartments:</strong> Converted warehouses and mills in the
                Northern Quarter, Ancoats, and Castlefield. Some early conversions (1990s–2000s)
                used budget electrical installations that are now showing their age. Access for
                rewiring can be complicated by communal areas and building management restrictions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Manchester Property Needs a Rewire',
    content: (
      <>
        <p>
          Book an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> with a
          qualified electrician to get a definitive assessment. However, these signs indicate you
          should arrange an inspection promptly:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Round-pin sockets or fabric-covered cables</strong> — pre-1960s wiring that
                is far beyond its safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board</strong> — wooden-backed boards with wire fuses offer
                no RCD protection and are a fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flickering lights or frequent tripping</strong> — indicates overloaded
                circuits, deteriorating insulation, or loose connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or discolouration at sockets</strong> — an immediate fire risk
                that requires urgent investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp cellar with exposed wiring</strong> — common in Manchester Victorian
                terraces. Water ingress combined with aged wiring is extremely dangerous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR with C1 or C2 codes</strong> — a professional inspection has identified
                dangerous or potentially dangerous conditions requiring remedial work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Rewire Take in Manchester?',
    content: (
      <>
        <p>
          Rewire timescales in Manchester are typical for the North of England. Many Manchester
          terraces benefit from cellar access which speeds up ground-floor cable routing.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls, running cables, installing back boxes and containment. The most
              disruptive phase with dust, noise, and power interruptions. For a typical 3-bed
              Manchester semi: 4–6 days. Properties with cellars may be quicker at ground level.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting sockets, switches, light fittings, consumer unit connection, and full testing.
              Less disruptive — power is restored circuit by circuit. For a typical 3-bed: 2–3 days.
            </p>
          </div>
        </div>
        <p>
          Total timescale for a 3-bed semi-detached in Manchester: 6–9 working days. Allow
          additional time if the property has solid concrete floors (common in 1960s council
          properties across Wythenshawe and Gorton), if significant making good is needed, or if
          coordination with the DNO (Electricity North West) is required for supply upgrades.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Manchester Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England and
          Wales). The electrician must be registered with a competent person scheme —{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA — to
          self-certify the work and notify Manchester City Council (or the relevant borough council
          for Greater Manchester areas).
        </p>
        <p>
          Under BS 7671:2018+A3:2024, Regulation 411.3.3 requires RCD protection with a rated
          residual operating current not exceeding 30 mA for socket outlets with a rated current not
          exceeding 32 A. All new rewires must comply with this requirement. The electrician must
          issue an{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          on completion, documenting the design, construction, inspection, and testing of the
          installation.
        </p>
        <p>
          If the electrician is not registered with a competent person scheme, you must notify
          Manchester City Council Building Control before starting the work and pay for their
          inspection (typically £250–£350). This is slower and more expensive than using a
          registered electrician.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Manchester Rewire Quote',
    content: (
      <>
        <p>
          A proper rewire quote should itemise every element. Watch out for single-figure quotes
          that bundle everything with no breakdown — they make comparison impossible and often
          exclude essential items.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer unit</strong> — metal enclosure with RCBOs or dual-RCD
                arrangement, SPD, and main switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All circuit cables</strong> — T&E cable for ring finals, radials, lighting,
                and dedicated appliance circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories</strong> — sockets, switches, ceiling roses, connection units.
                Standard white plastic included; upgraded finishes are extra.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — main earth conductor, bonding to gas, water,
                and oil pipework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing, EIC, and Part P</strong> — initial verification testing of every
                circuit, the Electrical Installation Certificate, and Part P notification to the
                local authority.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Not typically included: making good (plastering, decoration), skip hire, asbestos removal,
          and DNO supply upgrades through Electricity North West.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials, cable quantities, labour hours, and margin — built from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'building-control',
    heading: 'Manchester Building Control',
    content: (
      <>
        <p>
          Greater Manchester comprises ten metropolitan boroughs, each with its own building control
          department: Manchester, Salford, Trafford, Stockport, Tameside, Oldham, Rochdale, Bury,
          Bolton, and Wigan. Your electrician's competent person scheme notification will go to the
          relevant borough council automatically.
        </p>
        <p>
          If you need to notify building control directly (because your electrician is not
          registered), contact the building control department for the borough where the property is
          located. Inspection fees vary between boroughs but typically range from £200 to £350 for
          domestic electrical work.
        </p>
        <p>
          Manchester has several conservation areas (Castlefield, Ancoats, Victoria Park, Albert
          Park) where additional planning considerations may apply. If your property is listed or in
          a conservation area, check with your borough planning department before starting any work
          that affects the building fabric.
        </p>
        <p>
          The DNO for Greater Manchester is Electricity North West (ENW). Supply upgrades through
          ENW typically take 2-6 weeks to schedule. If your rewire requires a supply upgrade (common
          in older properties with undersized service fuses), plan this early to avoid delays.
        </p>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Manchester',
    content: (
      <>
        <p>
          Greater Manchester has a competitive market for domestic electricians. Here is how to find
          reliable, qualified professionals for your rewire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check competent person registration</strong> — search NICEIC, NAPIT, or
                ELECSA registers by your Manchester postcode. This is essential for Part P
                self-certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three itemised quotes</strong> — compare consumer unit type, number of
                circuits, whether RCBOs are specified, and whether making good is included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about local experience</strong> — an electrician who regularly rewires
                Manchester Victorian terraces will work faster and more efficiently than one
                unfamiliar with the property type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify insurance</strong> — minimum £2 million public liability. Ask for
                proof before work starts.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage rewire projects with Elec-Mate"
          description="Electricians: quote rewires with AI cost engineering, track projects, complete EIC certificates on your phone, and send professional invoices. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

export default function RewireCostManchesterPage() {
  return (
    <GuideTemplate
      title="Rewire Cost Manchester 2026 | Manchester House Rewire Prices"
      description="How much does a house rewire cost in Manchester in 2026? Complete Manchester rewire pricing guide covering terraces, semis, flats, Part P notification, and finding a qualified electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Rewire Cost Manchester: <span className="text-yellow-400">2026 Price Guide</span>
        </>
      }
      heroSubtitle="Manchester rewire costs are broadly in line with the national average — significantly lower than London. This guide covers realistic pricing for Manchester's Victorian terraces, Edwardian semis, city centre apartments, and suburban estates."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Manchester"
      relatedPages={relatedPages}
      ctaHeading="Quote Manchester Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
