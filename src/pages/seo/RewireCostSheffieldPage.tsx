import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  Zap,
  FileCheck2,
  Calculator,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Rewire Cost UK', href: '/guides/rewire-cost-uk' },
  { label: 'Rewire Cost Sheffield', href: '/rewire-cost-sheffield' },
];

const tocItems = [
  { id: 'sheffield-pricing', label: 'Sheffield Rewire Pricing' },
  { id: 'property-types', label: 'Sheffield Property Types' },
  { id: 'signs-rewire-needed', label: 'Signs a Rewire Is Needed' },
  { id: 'how-long', label: 'How Long Does It Take' },
  { id: 'whats-included', label: 'What Is Included in a Quote' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'disruption', label: 'Disruption and Replastering' },
  { id: 'find-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Sheffield costs between £2,100 and £7,200+ in 2025. Sheffield and South Yorkshire electrician day rates of £255 to £370 are competitive — broadly similar to Newcastle and below the national average.',
  "Sheffield has one of the most topographically varied housing stocks in England. The city's hilly terrain means properties in areas such as Broomhill, Crookes, Walkley, and Hillsborough often have split-level layouts that add complexity to cable routing.",
  'A full rewire is notifiable under Part P of the Building Regulations (England). Use a NICEIC, NAPIT, or ELECSA-registered electrician to self-certify and avoid Sheffield City Council building control inspection fees.',
  'A typical rewire takes 3–5 days for a 2-bed property and 5–8 days for a 3-bed. Wall chasing, replastering, and periods without power during first fix are all part of the process.',
  'An Electrical Installation Certificate (EIC) is mandatory on completion of every rewire, confirming compliance with BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Sheffield in 2025?',
    answer:
      'A full rewire in Sheffield in 2025 typically costs £2,100–£3,400 for a 2-bed terraced house, £3,100–£5,000 for a 3-bed semi-detached, and £4,400–£7,200 for a 4-bed detached property. Sheffield prices are competitive within the Yorkshire region, with electrician day rates of £255 to £370. Victorian terraces and semis in Walkley, Crookes, Broomhill, Hillsborough, and Heeley take longer to rewire due to lath-and-plaster construction and hilly terrain, bringing their costs towards the middle of the national range.',
  },
  {
    question: 'How long does a rewire take in a Sheffield terraced house?',
    answer:
      'A typical 2-bedroom terraced house in Sheffield (Walkley, Crookes, Broomhill, Heeley, Sharrow) takes 3 to 5 working days to rewire. First fix — chasing lath-and-plaster or brick walls, running cables, fitting back boxes — takes 2 to 3 days. Second fix — fitting accessories, consumer unit, and testing — takes 1 to 2 days. Hillside properties in Walkley, Crookes, and Fulwood can add complexity due to split-level layouts and awkward cable routes, so factor additional time for these. Modern detached houses in Dore, Totley, and Woodseats complete faster — typically 4 to 6 days for a 3-bed.',
  },
  {
    question: 'Do I need to notify Sheffield City Council for a rewire?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations (England). If your electrician is registered with NICEIC, NAPIT, or ELECSA, they will self-certify and notify Sheffield City Council Building Control on your behalf — you will receive a compliance certificate within 30 days. If the electrician is not registered, you must notify Sheffield City Council Building Control before work starts and pay a building control inspection fee of £160 to £290.',
  },
  {
    question: 'What are the signs my Sheffield property needs a rewire?',
    answer:
      "Key warning signs include: fabric-covered or rubber-insulated wiring (common in Sheffield properties built before 1960, particularly in the steel-industry workers' terraces in the inner west), a wooden-backed rewirable fuse board with wire fuses, sockets or switches that feel warm or show scorch marks, circuit breakers that trip repeatedly or fuses that blow, no earth connection at sockets, and a burning smell from outlets or the consumer unit. An EICR will confirm the full picture and the extent of work needed.",
  },
  {
    question: 'Are there any grants for rewiring in Sheffield or South Yorkshire?',
    answer:
      "The national ECO4 (Energy Company Obligation) scheme can fund some electrical work for eligible households linked to energy efficiency improvements. Sheffield City Council's private housing team has historically offered support for essential home improvements for vulnerable residents. The South Yorkshire Mayoral Combined Authority and local housing associations also operate various schemes. Contact Sheffield City Council's housing improvement team or the national Home Energy helpline (0300 123 1234) for current availability.",
  },
  {
    question: 'What does a full Sheffield rewire include?',
    answer:
      'A comprehensive Sheffield rewire quote should include: new consumer unit (metal enclosure with RCBOs or dual-RCD arrangement and SPD), all circuit cables (twin and earth for ring finals, radials, lighting, cooker, shower, immersion heater), all accessories (sockets, switches, ceiling roses, FCUs), earthing and bonding conductors, initial verification testing of every circuit, the Electrical Installation Certificate, and Part P notification. Making good (plastering chased walls), skip hire, asbestos removal if encountered, and supply upgrades via Northern Powergrid are typically quoted separately.',
  },
  {
    question: 'How much does replastering cost after a Sheffield rewire?',
    answer:
      'Replastering costs after a Sheffield rewire depend on property type. In a Victorian terraced house with lath-and-plaster walls (Walkley, Crookes, Broomhill, Heeley), budget £350 to £900 for making good. Post-war semis and bungalows with plasterboard walls in Gleadless, Arbourthorne, and Firth Park cost less — typically £120 to £350. Properties in conservation areas or listed buildings in areas such as Ecclesall Road South may require heritage finishes, adding cost. Hillside properties with split-level layouts may have more chases than equivalent-sized flat properties.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2025',
    description: 'National rewire pricing guide with average costs by property size across the UK.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/rewire-cost-leeds',
    title: 'Rewire Cost Leeds',
    description: 'Leeds rewire costs — how they compare with Sheffield pricing.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Consumer unit costs breakdown — usually included in a full rewire quote.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate Guide',
    description: 'When an EICR reveals your property needs a rewire — what to expect.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on site after a rewire.',
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

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'sheffield-pricing',
    heading: 'Sheffield Rewire Pricing (2025)',
    content: (
      <>
        <p>
          Sheffield and South Yorkshire offer competitive electrician rates for a major English
          city. Day rates of £255 to £370 are broadly similar to the North East and notably below
          London and the South East. The city's distinctive hilly terrain and large Victorian
          housing stock mean rewires in inner Sheffield areas often require more labour hours than
          equivalent-sized modern properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Sheffield Rewire Costs by Property Type (2025)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> £2,100–£3,400 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £3,100–£5,000 (5–7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £4,400–£7,200 (6–10 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large period property (5-bed+):</strong> £7,200–£11,500+ (10–15 days)
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include all materials, labour, a new consumer unit with RCBOs and SPD,
          initial verification testing, the{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          , and Part P notification. Making good (plastering and decoration) is quoted separately —
          budget an additional £350 to £900 for a standard Sheffield Victorian terrace.
        </p>
        <p>
          Hillside Victorian terraces in Walkley, Crookes, Broomhill, and Hillsborough sit at the
          higher end of each range. Post-war semis and modern detached houses in Dore, Totley,
          Gleadless, and Woodseats are at the lower end.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Sheffield Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Sheffield's housing stock reflects its industrial heritage — dense Victorian and Edwardian
          working-class terraces in the inner west and north, larger inter-war semis in the suburban
          south-west, and post-war estates throughout. The city's steep topography adds a unique
          dimension to rewire complexity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (1860s–1900s):</strong> Walkley, Crookes, Broomhill,
                Hillsborough, Heeley, Sharrow, and Meersbrook. Brick with lath-and-plaster
                interiors. Hillside plots often feature split-level layouts with awkward cable
                routes and limited void access. Many retain wiring from multiple eras.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian semis and villas (1900s–1920s):</strong> Nether Edge, Ecclesall,
                Ranmoor, and Endcliffe. Larger properties with accessible loft spaces. These areas
                contain some of Sheffield's most substantial period properties with extensive
                original wiring in need of full replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inter-war semis and bungalows (1920s–1940s):</strong> Woodseats, Norton,
                Greenhill, Dore, and Totley. Cavity brick construction with accessible lofts. Many
                have original VIR wiring or early PVC installations without adequate earthing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war estates (1950s–1970s):</strong> Gleadless Valley, Arbourthorne,
                Firth Park, and Parson Cross. Plasterboard or large-panel construction — the easiest
                to rewire. Consumer units commonly have BS 3036 rewirable fuses or early single-RCD
                boards needing replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted flats (Broomhill, Crookesmoor, Broomhall):</strong> Student and
                private rental market areas with many Victorian houses converted into flats. Quality
                of conversion varies — multi-era wiring, shared circuits, and undersized sub-mains
                are common EICR findings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Sheffield Property Needs a Rewire',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> is the
          definitive method to confirm rewire need. These warning signs indicate an inspection is
          urgently needed:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fabric-covered or rubber-insulated wiring</strong> — pre-1960s wiring beyond
                its safe service life, very common in Sheffield's Victorian terrace stock across
                Walkley, Crookes, and Heeley.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board</strong> — a wooden-backed board with wire fuses. No
                RCD protection — a serious fire and electric shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeatedly tripping circuit breakers</strong> — overloaded circuits or
                deteriorating cable insulation that can no longer safely carry load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or scorch marks near sockets</strong> — overheating
                connections are an immediate fire risk requiring urgent attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sockets without an earth connection</strong> — older Sheffield properties
                sometimes have 2-wire wiring with no circuit protective conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR with C1 or C2 observations</strong> — dangerous or potentially
                dangerous conditions confirmed by a qualified inspector.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Rewire Take in Sheffield?',
    content: (
      <>
        <p>
          Sheffield rewire timescales are influenced by both property age and the city's hilly
          terrain. Hillside properties in Walkley, Crookes, and Hillsborough often have split-level
          layouts that require more creative cable routing than flat-site properties.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls, running cables through floors and ceiling voids, installing back boxes.
              In a Sheffield Victorian terrace: 2–3 days. In a hillside split-level property: 3–4
              days. In a modern semi: 1–2 days. Power is off during working hours.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting accessories, consumer unit, testing every circuit. In a Sheffield 3-bed: 2–3
              days. Power is restored progressively as circuits are completed. The EIC and Part P
              notification are completed at the end of second fix.
            </p>
          </div>
        </div>
        <p>
          Allow additional time if asbestos is present (common in Sheffield properties from the
          1950s and 1960s — artex ceilings and vinyl floor tiles are the most frequent sources), or
          if Northern Powergrid need to be contacted for a supply upgrade (4 to 10 weeks to schedule
          in South Yorkshire).
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Sheffield Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive rewire quote should itemise every element. Single-figure quotes without a
          breakdown make it impossible to compare proposals properly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer unit</strong> — metal enclosure with RCBOs or dual-RCD
                arrangement, surge protection device (SPD), and main switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All circuit cables</strong> — twin and earth for ring finals, radials,
                lighting circuits, cooker, shower, and immersion heater circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories</strong> — sockets, switches, ceiling roses, and fused
                connection units. Standard white plastic included; upgraded finishes extra.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — main earth conductor, main bonding to gas,
                water, and oil pipework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and certification</strong> — initial verification testing, EIC, and
                Part P notification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Typically NOT included: making good (plastering and decoration), skip hire for waste,
          asbestos removal if encountered, and supply upgrades via Northern Powergrid.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Sheffield Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Sheffield Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England). The
          work must be carried out by an electrician registered with a competent person scheme —
          such as <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA — or
          the homeowner must notify Sheffield City Council Building Control before the work starts.
        </p>
        <p>
          A registered electrician self-certifies the work, notifies Sheffield City Council, and you
          receive a Building Regulations Compliance Certificate within 30 days. An unregistered
          electrician means a building control inspection fee of £160–£290 and a longer process. On
          completion, the electrician must issue an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          confirming compliance with BS 7671:2018+A3:2024.
        </p>
      </>
    ),
  },
  {
    id: 'disruption',
    heading: 'Disruption and Replastering After a Sheffield Rewire',
    content: (
      <>
        <p>
          A full rewire is a significant undertaking, particularly in Sheffield's Victorian hillside
          terraces. Understanding the full disruption and budget helps you plan properly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall chasing creates dust and noise</strong> — cutting channels in
                lath-and-plaster or brick generates significant debris. Cover furniture and seal off
                rooms during first fix wherever possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power is off during first fix</strong> — the electricity supply is isolated
                while new circuits are installed. Many Sheffield residents stay elsewhere during the
                first fix phase, particularly in smaller properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replastering is a separate cost</strong> — after chases are filled, a
                plasterer reinstates the wall surfaces. Budget £350 to £900 for making good in a
                Sheffield Victorian terrace. Post-war properties with plasterboard: £120 to £350.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hillside properties may require more chasing</strong> — split-level layouts
                in Walkley, Crookes, and Fulwood sometimes mean longer cable runs and more wall
                chasing than a flat-site property of the same size. Factor this into your planning
                and budget.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Sheffield',
    content: (
      <>
        <p>
          Sheffield and South Yorkshire have a strong pool of qualified electricians. Use these
          criteria to find a reliable, registered contractor for your rewire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> — search by Sheffield
                or South Yorkshire postcode on the scheme's online register. Non-negotiable for Part
                P compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about hillside terrace experience</strong> — rewiring a split-level
                Walkley terrace is different from a flat-site semi in Gleadless. Ask for references
                from similar Sheffield properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get at least three comparable quotes</strong> — ensure each specifies the
                consumer unit type, number of circuits, and whether making good is included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm minimum £2 million public liability insurance</strong> — ask for a
                copy of the certificate before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check EIC and Part P notification are included</strong> — mandatory for all
                rewires in England. If absent from the quote, the quote is incomplete.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage Sheffield rewire projects with Elec-Mate"
          description="Electricians: quote rewires with AI cost engineering, manage projects with task tracking, complete EIC certificates on your phone, and send professional invoices. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RewireCostSheffieldPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Sheffield 2025 | Rewire Prices South Yorkshire"
      description="How much does a house rewire cost in Sheffield in 2025? Real prices for 2-bed, 3-bed, and 4-bed properties — Victorian hillside terraces in Walkley and Crookes, Part P notification, disruption, replastering costs, and finding a NICEIC-registered electrician in Sheffield."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Sheffield:{' '}
          <span className="text-yellow-400">2025 South Yorkshire Price Guide</span>
        </>
      }
      heroSubtitle="Sheffield rewire costs in 2025 — from hillside Victorian terraces in Walkley and Crookes to inter-war semis in Dore and Totley. Real prices by property size, Part P explained, and what Sheffield's unique hilly terrain means for a rewire."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Sheffield"
      relatedPages={relatedPages}
      ctaHeading="Quote Sheffield Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
