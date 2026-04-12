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
  { label: 'Rewire Cost Bristol', href: '/rewire-cost-bristol' },
];

const tocItems = [
  { id: 'bristol-pricing', label: 'Bristol Rewire Pricing' },
  { id: 'property-types', label: 'Bristol Property Types' },
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
  "A full house rewire in Bristol costs between £2,500 and £8,000+ in 2025, running 10–15% above the national average. Electrician day rates in Bristol are typically £300 to £420 — above the South West average, reflecting the city's strong economy and property values.",
  'Bristol has extensive Victorian and Edwardian terraced housing in Clifton, Redland, Totterdown, Montpelier, and Bedminster. Lath-and-plaster walls take longer to chase than modern plasterboard, adding time and cost.',
  'A full rewire is notifiable under Part P of the Building Regulations (England). Use a NICEIC, NAPIT, or ELECSA-registered electrician to self-certify and avoid building control inspection fees.',
  'A typical rewire takes 3–5 days for a 2-bed house and 5–8 days for a 3-bed property. Expect wall chasing, replastering, and temporary loss of power during first fix.',
  'An Electrical Installation Certificate (EIC) is mandatory on completion of every rewire, confirming compliance with BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Bristol in 2025?',
    answer:
      'A full rewire in Bristol in 2025 typically costs £2,500–£4,000 for a 2-bed terraced house, £3,500–£5,500 for a 3-bed semi-detached, and £5,000–£8,000 for a 4-bed detached property. Bristol prices run 10–15% above the national average, driven by higher electrician day rates (£300 to £420) and the complexity of Victorian terraces with lath-and-plaster walls in areas such as Clifton, Totterdown, and Montpelier. Making good (plastering and decoration) is typically quoted separately.',
  },
  {
    question: 'Why are Bristol rewire costs higher than the national average?',
    answer:
      'Bristol commands higher electrician rates than much of England outside London and the South East due to its high cost of living and strong property market. The city also has a high proportion of Victorian and Edwardian terraced housing with lath-and-plaster walls, which takes significantly longer to rewire than modern plasterboard construction. Hilly terrain in areas such as Clifton, Totterdown, Southville, and Kingsdown can affect site access and cable routing complexity.',
  },
  {
    question: 'How long does a rewire take in a Bristol Victorian terrace?',
    answer:
      'A typical 2-bedroom Victorian terraced house in Bristol (Clifton, Redland, Totterdown, Montpelier, Bedminster) takes 4 to 6 working days to rewire. First fix — chasing walls, running cables, fitting back boxes — takes 2 to 4 days due to lath-and-plaster construction. Second fix — fitting accessories, connecting the consumer unit, and testing — takes 1 to 2 days. Modern semis and detached houses in suburban Bristol (Henleaze, Westbury-on-Trym, Fishponds) complete faster, typically 3 to 5 days for a 3-bed.',
  },
  {
    question: 'Do I need to notify Bristol City Council for a rewire?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations (England). If your electrician is registered with NICEIC, NAPIT, or ELECSA, they will self-certify the work and notify Bristol City Council Building Control on your behalf — you will receive a compliance certificate within 30 days. If the electrician is not registered, you must notify Bristol City Council Building Control before work starts and pay a building control inspection fee of £200 to £350.',
  },
  {
    question: 'What are the signs my Bristol property needs a rewire?',
    answer:
      'Key warning signs include: fabric-covered or rubber-insulated wiring (common in Bristol properties built before 1960), a wooden-backed rewirable fuse board with wire fuses, sockets or switches that feel warm or show scorch marks, repeatedly tripping circuit breakers or blown fuses, no earth connection at sockets, and a burning smell from outlets or the consumer unit. An EICR carried out by a qualified electrician will confirm whether a full or partial rewire is needed.',
  },
  {
    question: 'What happens to the walls after a rewire in a Bristol period property?',
    answer:
      'After the first fix phase, chased channels in lath-and-plaster walls need to be filled and replastered. In period Bristol properties, the making good is a specialist job — standard plasterers may not be experienced with lime plaster or heritage finishes common in Clifton and Redland. The electrician is responsible for the electrical work only; plastering and decoration are typically quoted separately. Budget £500 to £1,500 for making good after a full rewire in a Bristol Victorian terrace, depending on the extent of wall chasing.',
  },
  {
    question: 'Are there grants for rewiring a house in Bristol?',
    answer:
      "Bristol City Council operates a private sector housing scheme that in some circumstances covers essential home repairs including electrical work, targeting older or disabled homeowners in poor housing conditions. The national ECO4 scheme may fund some electrical work linked to energy efficiency improvements. Contact Bristol City Council's housing options team to check current availability and eligibility criteria.",
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
    href: '/guides/rewire-cost-london',
    title: 'Rewire Cost London',
    description: 'London rewire costs for comparison — the most expensive region in the UK.',
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
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate Guide',
    description: 'When an EICR reveals your property needs a rewire — what to expect.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
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
    id: 'bristol-pricing',
    heading: 'Bristol Rewire Pricing (2025)',
    content: (
      <>
        <p>
          Bristol is the most expensive city in the South West for electrical work. Electrician day
          rates of £300 to £420 place it above the national average, and the prevalence of Victorian
          and Edwardian terraced housing means labour hours per property are typically higher than
          in newer housing stock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Bristol Rewire Costs by Property Type (2025)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> £2,500–£4,000 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £3,500–£5,500 (5–7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £5,000–£8,000 (7–10 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large period property (5-bed+):</strong> £8,000–£13,000+ (10–15 days)
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include all materials, labour, a new consumer unit with RCBOs and SPD,
          initial verification testing, the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          , and Part P notification. Making good (plastering and decoration) is quoted separately —
          budget an additional £500 to £1,500 for a standard Bristol Victorian terrace.
        </p>
        <p>
          Inner Bristol Victorian terraces (Clifton, Redland, Totterdown, Montpelier, Kingsdown) sit
          at the upper end of each range. Suburban Bristol properties (Henleaze, Fishponds,
          Westbury-on-Trym) and modern estates are at the lower end.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Bristol Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Bristol's housing stock spans Georgian grandeur, Victorian terraces, inter-war semis, and
          post-war estates. Each era brings its own rewire challenges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (1860s–1900s):</strong> Clifton, Redland, Totterdown,
                Montpelier, Bedminster, Southville, and Kingsdown. Lath-and-plaster walls, solid
                ground floors in many, and split-level layouts on hillside plots make cable routing
                more complex. Ad-hoc wiring additions from previous decades are common — an EICR
                often reveals circuits from multiple different eras.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian semis (1900s–1910s):</strong> Common in Horfield, Filton,
                Brislington, and Knowle. Slightly easier to rewire than Victorian terraces due to
                accessible loft spaces and lighter wall construction, but similarly likely to have
                original VIR (vulcanised india rubber) wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s–1950s semis and detached:</strong> Found across Henleaze,
                Westbury-on-Trym, Bishopsworth, and Nailsea. Accessible loft spaces and moderate
                wall depths. Many still have original PVC wiring from the 1950s–1960s without
                earthing on lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1960s–1980s council and private estates:</strong> Hartcliffe, Withywood,
                Lockleaze, Southmead. Plasterboard or large-panel construction — relatively
                straightforward to rewire. Consumer units often have BS 3036 rewirable fuses or
                early single-RCD boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted flats (Victorian houses):</strong> Common across Clifton, Cotham,
                and Redland. Quality varies enormously — many have shared circuits, undersized
                sub-mains, and wiring from multiple different eras. An EICR is essential before
                scoping any rewire in a converted flat.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Bristol Property Needs a Rewire',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is the
          definitive way to assess whether a rewire is required. These warning signs indicate urgent
          attention is needed:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fabric-covered or rubber-insulated wiring</strong> — pre-1960s wiring that
                is beyond its safe service life and common in older Bristol terraces.
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
                <strong>Repeatedly tripping circuit breakers</strong> — indicates overloaded
                circuits or deteriorating cable insulation that can no longer handle normal loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or scorch marks near sockets</strong> — signs of overheating
                connections, which represent an immediate fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sockets without an earth connection</strong> — older Bristol properties
                sometimes have 2-wire wiring with no circuit protective conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR with C1 or C2 observations</strong> — a qualified inspection has
                identified dangerous or potentially dangerous conditions requiring urgent action.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Rewire Take in Bristol?',
    content: (
      <>
        <p>
          Rewire timescales in Bristol depend on property type, age, and location. Hillside
          properties in Clifton, Totterdown, and Kingsdown can add complexity due to split-level
          layouts and awkward cable routes.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls, running cables through floors and ceiling voids, installing back boxes,
              fitting containment. The most disruptive phase — dust, noise, and power off during
              working hours. In a Bristol Victorian terrace: 2–4 days. In a modern semi: 1–3 days.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting sockets, switches, light fittings, connecting the consumer unit, and testing
              every circuit. Much less disruptive — power is restored progressively. In a Bristol
              3-bed: 2–3 days. The EIC and Part P notification are completed at the end of second
              fix.
            </p>
          </div>
        </div>
        <p>
          Allow additional time if asbestos is present (common in Bristol properties from the 1950s
          to 1970s — artex ceilings and floor tiles are the most common sources), or if a supply
          upgrade from National Grid Electricity Distribution is needed, which can take 2 to 6 weeks
          to schedule.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Bristol Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive rewire quote should itemise every element of the work. Be cautious of
          single-figure quotes without a detailed breakdown — they make comparison impossible.
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
                connection units. Standard white plastic is included; upgraded finishes are charged
                extra.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — main earth conductor, main bonding
                conductors to gas, water, and oil pipework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and certification</strong> — initial verification testing of every
                circuit, the Electrical Installation Certificate, and Part P notification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          What is typically NOT included: making good (plastering and decoration), skip hire for
          waste, asbestos removal if encountered, and supply upgrades via National Grid Electricity
          Distribution.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Bristol Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Bristol Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England). This
          means the work must be carried out by an electrician registered with a competent person
          scheme — such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA — or
          the homeowner must notify Bristol City Council Building Control before the work starts.
        </p>
        <p>
          Using a registered electrician is strongly recommended. They will self-certify the work,
          submit notification to Bristol City Council, and you will receive a Building Regulations
          Compliance Certificate within 30 days of completion. An unregistered electrician means you
          pay for a building control inspection (£200–£350) and the process takes longer.
        </p>
        <p>
          On completion, the electrician must issue an{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          documenting the design, construction, inspection, and testing of the entire new
          installation, confirming compliance with BS 7671:2018+A3:2024.
        </p>
      </>
    ),
  },
  {
    id: 'disruption',
    heading: 'Disruption and Replastering After a Bristol Rewire',
    content: (
      <>
        <p>
          A full rewire is a significant undertaking. Understanding what to expect helps you plan
          accommodation, timing, and budget for the full project — not just the electrical work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall chasing creates dust and debris</strong> — electricians use angle
                grinders or chasing tools to cut channels for cables. In a Victorian Bristol terrace
                with lath-and-plaster, this generates significant dust that spreads throughout the
                property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power is off during first fix</strong> — the supply is isolated while new
                circuits are installed. Plan for no cooking, heating, or power for several days.
                Many Bristol residents stay with friends or family during this phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replastering is a separate cost</strong> — after the chases are filled,
                plastering is typically done by a separate plasterer. In period Bristol properties,
                lime plaster matching is a specialist skill. Budget £500 to £1,500 for making good
                on a full rewire, plus decoration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access to all rooms required</strong> — the electrician needs access to
                every room throughout the job. Clear furniture and valuables away from walls and
                cover items that cannot be moved.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Bristol',
    content: (
      <>
        <p>
          Bristol has a well-established pool of qualified electricians. Use these criteria to
          identify a reliable, registered contractor for your rewire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> — search by Bristol
                postcode on the scheme's online register. Non-negotiable for Part P compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about Bristol Victorian terrace experience</strong> — hillside terraces
                in Clifton, Totterdown, and Kingsdown require specific knowledge. Ask for references
                from similar Bristol properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get at least three comparable quotes</strong> — compare on a like-for-like
                basis. Ensure each quote specifies consumer unit type, number of circuits, and
                whether making good is included.
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
                <strong>Check that EIC and Part P notification are included</strong> — mandatory for
                all rewires in England. If absent from the quote, the quote is incomplete.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage Bristol rewire projects with Elec-Mate"
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

export default function RewireCostBristolPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Bristol 2025 | Full Rewire Prices Bristol"
      description="How much does a house rewire cost in Bristol in 2025? Real prices for 2-bed, 3-bed, and 4-bed properties — Victorian terraces in Clifton and Totterdown, Part P notification, disruption, replastering, and finding a NICEIC-registered electrician in Bristol."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Bristol: <span className="text-yellow-400">2025 Price Guide</span>
        </>
      }
      heroSubtitle="Bristol rewire costs in 2025 — from Victorian hillside terraces in Clifton and Totterdown to inter-war semis in Henleaze. Real prices by property size, Part P explained, and what to expect from wall chasing and replastering."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Bristol"
      relatedPages={relatedPages}
      ctaHeading="Quote Bristol Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
