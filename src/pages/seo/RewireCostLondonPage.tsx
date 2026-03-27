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

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Rewire Cost UK', href: '/guides/rewire-cost-uk' },
  { label: 'Rewire Cost London', href: '/guides/rewire-cost-london' },
];

const tocItems = [
  { id: 'london-pricing', label: 'London Rewire Pricing' },
  { id: 'property-types', label: 'London Property Types' },
  { id: 'signs-rewire-needed', label: 'Signs a Rewire Is Needed' },
  { id: 'how-long', label: 'How Long Does It Take' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'whats-included', label: 'What Is Included in a Quote' },
  { id: 'building-control', label: 'London Building Control' },
  { id: 'find-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in London costs between £3,500 and £15,000+, roughly 20-30% more than the national average due to higher labour rates, congestion charges, parking costs, and property complexity.',
  'Victorian and Edwardian terraced houses — the most common property type across inner London boroughs — often have lath-and-plaster walls and limited access, adding significant time and cost to a rewire.',
  'London rewires are notifiable under Part P of the Building Regulations. The electrician must be registered with a competent person scheme or the work must be inspected by your borough council building control team.',
  'An Electrical Installation Certificate (EIC) is mandatory on completion, confirming the new installation complies with BS 7671:2018+A3:2024.',
  'Electrician day rates in London range from £350 to £500+ in 2026, compared with £250-£350 in most other UK regions.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in London in 2026?',
    answer:
      'A full rewire in London in 2026 typically costs £3,500-£5,500 for a 1-bed flat, £5,000-£7,500 for a 2-bed terraced house, £7,000-£10,000 for a 3-bed semi-detached, and £10,000-£15,000+ for a 4-bed detached property. London prices are 20-30% higher than the national average, driven by higher electrician day rates (£350-£500), parking and congestion charge costs, and the complexity of older London housing stock with lath-and-plaster walls and limited void access.',
  },
  {
    question: 'Why are rewire costs higher in London than the rest of the UK?',
    answer:
      'London rewire costs are higher for several compounding reasons. Electrician labour rates are significantly higher (£350-£500 per day versus £250-£350 nationally) due to higher living costs and commercial overheads. Many London properties are Victorian or Edwardian with lath-and-plaster walls, solid floors, and limited cable route access — all of which add labour time. Parking in most London boroughs requires permits or meter fees, and the congestion charge applies if the electrician drives into the zone. Material delivery to London addresses is also more expensive, and skip hire for waste disposal costs more than in other regions.',
  },
  {
    question: 'How long does a rewire take in a London Victorian terrace?',
    answer:
      'A typical 2-3 bedroom Victorian terraced house in London takes 7-12 working days to rewire. The extended timeline compared with modern properties is due to lath-and-plaster walls that are more difficult and time-consuming to chase than modern plasterboard, limited floor void access (many Victorian houses have been refurbished with solid floors on the ground level), high ceilings that require scaffold towers or platform steps, and ornate cornicing or ceiling roses that must be worked around carefully. The first fix phase (chasing, cabling, back boxes) takes 5-8 days, and the second fix (fitting accessories, connecting, testing) takes 2-4 days.',
  },
  {
    question: 'Do I need to notify the council for a rewire in London?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA), they will self-certify the work and submit the notification to your borough council on your behalf. If the electrician is not registered, you must notify your borough council building control department before the work starts, and they will need to inspect the installation — this route costs £200-£400 in inspection fees and causes delays. Always use a registered electrician to avoid this.',
  },
  {
    question: 'Can I stay in my London flat during a rewire?',
    answer:
      'For a flat rewire, staying in the property is more feasible than in a house because the work area is smaller. However, during first fix you will experience significant noise and dust from wall chasing, and the power will be off for extended periods. Many London residents choose to stay with friends or family or use short-term accommodation during the 3-5 day first fix phase, then return for the quieter second fix phase. If you are in a leasehold flat, check your lease terms — some require notification to the freeholder or management company before major electrical work.',
  },
  {
    question: 'Are there any grants for rewiring in London?',
    answer:
      'Some London borough councils offer discretionary grants or loans for essential home repairs, including electrical rewiring, through their private sector housing teams. These are typically means-tested and aimed at older or vulnerable homeowners. The Greater London Authority does not run a specific rewiring grant scheme, but ECO4 (Energy Company Obligation) funding may cover some electrical upgrading work if it is linked to energy efficiency improvements such as new heating controls. Contact your borough council housing team to check what is available in your area.',
  },
  {
    question: 'What happens to the walls after a rewire in a London period property?',
    answer:
      'After the first fix phase, chased channels in the walls need to be filled and plastered. In period properties with lath-and-plaster walls, the making good is a specialist job — standard plasterers may not be experienced with lime plaster or heritage finishes. The electrician is responsible for the electrical work only; making good (plastering and decoration) is typically quoted separately. Budget £1,000-£3,000 for plastering after a full rewire in a London period property, depending on the number of chases and the finish required.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description: 'National rewire pricing guide with average costs by property size across the UK.',
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
    id: 'london-pricing',
    heading: 'London Rewire Pricing (2026)',
    content: (
      <>
        <p>
          London is consistently the most expensive region in the UK for electrical work, and rewires
          are no exception. Electrician day rates in the capital range from £350 to £500+, reflecting
          higher living costs, commercial rents, vehicle running costs (congestion charge, ULEZ,
          parking), and the general cost of doing business in London.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            London Rewire Costs by Property Type (2026)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>1-bed flat (conversion or purpose-built):</strong> £3,500–£5,500 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed Victorian/Edwardian terrace:</strong> £5,000–£7,500 (6–9 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £7,000–£10,000 (7–10 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £10,000–£15,000+ (10–15 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large period property (5-bed+):</strong> £15,000–£25,000+ (12–20 days)
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
          , and Part P notification. Making good (plastering and decoration) is typically quoted
          separately — budget an additional £1,000–£3,000 for a full house.
        </p>
        <p>
          Prices vary between boroughs. Inner London (Camden, Islington, Hackney, Southwark,
          Lambeth) tends to be at the upper end of these ranges, while outer London boroughs
          (Bromley, Croydon, Havering, Hillingdon) are closer to the lower end.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'London Property Types That Need Rewiring',
    content: (
      <>
        <p>
          London's housing stock is among the oldest in the UK. Many properties still have original
          or outdated wiring that presents a safety risk and needs replacing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (1850s–1900s):</strong> Found across inner London boroughs
                — Islington, Hackney, Camberwell, Fulham, Battersea. These properties often have
                original rubber-insulated wiring hidden behind lath-and-plaster walls, with lead
                cable sheaths and porcelain fuse holders. The narrow terrace layout makes cable
                routing challenging, and many have had ad-hoc electrical additions over the decades
                without proper circuits being designed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian semis (1900s–1910s):</strong> Common in Ealing, Walthamstow,
                Muswell Hill, and Lee Green. Slightly more spacious than Victorian terraces but
                similarly built with lath-and-plaster. Many have had ground-floor extensions
                (side returns) that were wired at different times, creating a patchwork of cable
                types and standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s–1950s semi-detached and terraced:</strong> Found extensively in outer
                London — Harrow, Enfield, Bexley, Sutton. Many still have original VIR
                (vulcanised india rubber) wiring. While less difficult to rewire than Victorian
                properties (plasterboard walls, accessible loft spaces), the wiring is well past its
                safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Purpose-built flats (1960s–1980s):</strong> Blocks across London, from
                council estates to private developments. Common issues include undersized PVC cables,
                shared risers, and consumer units with BS 3036 rewirable fuses. Rewiring a flat
                within a block often requires liaison with the freeholder and managing agent, and may
                need communal area access for cable routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted flats:</strong> Period houses split into flats are extremely common
                in London. These conversions vary wildly in quality — some have proper submains and
                individual consumer units, while others share circuits with other flats or have
                wiring that was never designed for the current layout.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your London Property Needs a Rewire',
    content: (
      <>
        <p>
          The definitive way to assess whether your property needs a rewire is to book an{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> with a qualified
          electrician. However, these warning signs suggest you should arrange an inspection
          promptly:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Round-pin sockets or fabric-covered wiring</strong> — these indicate
                pre-1960s wiring that is almost certainly beyond its safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board</strong> — a wooden-backed fuse board with wire fuses
                predates modern protective devices and has no RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent tripping or blown fuses</strong> — indicates overloaded circuits or
                deteriorating cable insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or scorch marks</strong> — signs of overheating connections,
                which is an immediate fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No earth connection to sockets</strong> — common in older London properties
                where the original wiring had no circuit protective conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR with C1 or C2 observations</strong> — a professional inspection has
                identified dangerous or potentially dangerous conditions that require urgent remedial
                work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Rewire Take in London?',
    content: (
      <>
        <p>
          Rewire timescales in London tend to be longer than the national average because of the age
          and construction of the housing stock. Lath-and-plaster walls take longer to chase than
          modern plasterboard, and limited void access means more surface routing or deeper chasing.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls, running cables through floor and ceiling voids, installing back boxes,
              fitting containment. This is the most disruptive phase — dust, noise, and no power for
              extended periods. In a London Victorian terrace: 5–8 days. In a modern property: 3–5
              days.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting sockets, switches, light fittings, connecting the consumer unit, and testing
              every circuit. Much less disruptive — power is restored progressively. In a London
              Victorian terrace: 2–4 days. In a modern property: 1–2 days.
            </p>
          </div>
        </div>
        <p>
          Allow additional time if the property has solid concrete floors (no access to run cables
          underneath), if asbestos is present (common in London properties from the 1950s–1970s and
          requiring specialist removal before electrical work), or if the work needs coordinating
          with a freeholder or managing agent in a flat conversion.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for London Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England and
          Wales). This means the work must either be carried out by an electrician registered with a
          competent person scheme — such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA — or
          the homeowner must notify their local authority building control department before the work
          starts.
        </p>
        <p>
          Using a registered electrician is strongly recommended. They will self-certify the work,
          submit notification to your borough council, and you will receive a Building Regulations
          Compliance Certificate within 30 days of completion. If the electrician is not registered,
          you must pay for a building control inspection (£200–£400 in most London boroughs) and the
          process takes longer.
        </p>
        <p>
          Under BS 7671:2018+A3:2024, Regulation 411.3.3 requires RCD protection with a rated
          residual operating current not exceeding 30 mA for socket outlets with a rated current not
          exceeding 32 A. This is a fundamental safety requirement for all new rewires. The
          electrician must issue an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          on completion, documenting the design, construction, inspection, and testing of the entire
          installation.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: "What Is Included in a London Rewire Quote",
    content: (
      <>
        <p>
          A comprehensive rewire quote should itemise every element of the work. Be wary of
          single-figure quotes with no breakdown — they make it impossible to compare like with like.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer unit</strong> — metal enclosure with RCBOs or dual-RCD
                arrangement, SPD (surge protection device), and main switch. The consumer unit is the
                heart of the new installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All circuit cables</strong> — Twin and earth (T&E) cable for ring finals,
                radials, lighting circuits, and dedicated appliance circuits (cooker, shower,
                immersion heater). Cable quantities depend on property size and layout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories</strong> — sockets, switches, ceiling roses, fused connection
                units, and any specialist outlets. Standard white plastic is included; upgraded
                finishes (brushed steel, chrome, brass) are charged extra.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — main earth conductor, main bonding
                conductors to gas, water, and oil pipework, and supplementary bonding where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and certification</strong> — initial verification testing of every
                circuit (continuity, insulation resistance, polarity, earth fault loop impedance, RCD
                operation) plus the EIC and Part P notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour</strong> — all first fix and second fix labour. Check whether the
                quote includes one or two electricians — larger London rewires often benefit from a
                team of two to reduce the number of days on site.
              </span>
            </li>
          </ul>
        </div>
        <p>
          What is typically NOT included: making good (plastering chased walls, decoration), skip
          hire for waste, asbestos removal if encountered, supply upgrades arranged through the DNO
          (UK Power Networks in London), and any structural work required for cable routes.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin calculated from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'building-control',
    heading: 'London Borough Building Control',
    content: (
      <>
        <p>
          Each of the 32 London boroughs plus the City of London has its own building control
          department. If your electrician is registered with a competent person scheme, you do not
          need to contact building control directly — the notification is handled automatically.
        </p>
        <p>
          If you are using a non-registered electrician or doing the work yourself, you must submit a
          building notice to your borough council before starting. Building control inspection fees
          for electrical work in London boroughs typically range from £200 to £400. The inspector
          will need to attend the property to inspect and test the installation before it is
          energised.
        </p>
        <p>
          In London, building control is particularly important for properties in conservation areas
          or listed buildings. If your property is listed, any work that affects the fabric of the
          building (including chasing walls for cables) may require Listed Building Consent from the
          borough planning department, in addition to the Part P notification. This is a separate
          process and failure to obtain consent is a criminal offence. Always check with your borough
          council before starting a rewire in a listed building.
        </p>
        <p>
          The main DNO for London is UK Power Networks (UKPN). If the rewire identifies that the
          supply fuse or meter tails need upgrading, UKPN must be contacted to carry out the supply
          side work. UKPN supply upgrades in London can take 4-8 weeks to schedule, so plan early
          if this is likely to be needed.
        </p>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in London',
    content: (
      <>
        <p>
          London has no shortage of electricians, but quality and pricing vary enormously. Here is
          how to find a reliable, qualified electrician for your rewire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify competent person registration</strong> — search the NICEIC, NAPIT, or
                ELECSA online registers by postcode to find registered electricians in your area.
                This is non-negotiable for Part P compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get at least three quotes</strong> — compare them on a like-for-like basis.
                Ensure each quote specifies the consumer unit type, whether RCBOs or RCDs are used,
                the number of circuits, and whether making good is included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about experience with your property type</strong> — rewiring a Victorian
                terrace requires different skills to rewiring a 1960s flat. Ask for references from
                similar properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm insurance</strong> — minimum £2 million public liability insurance.
                Ask for a copy of the certificate before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check EIC is included</strong> — the quote must include the Electrical
                Installation Certificate and Part P notification. If these are absent, the quote is
                not complete.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage rewire projects with Elec-Mate"
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

export default function RewireCostLondonPage() {
  return (
    <GuideTemplate
      title="Rewire Cost London 2026 | London House Rewire Prices"
      description="How much does a house rewire cost in London in 2026? Complete London rewire pricing guide covering Victorian terraces, flats, period properties, Part P, and finding a qualified electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Rewire Cost London:{' '}
          <span className="text-yellow-400">2026 Price Guide</span>
        </>
      }
      heroSubtitle="London rewire costs are the highest in the UK — driven by premium labour rates, complex period housing stock, and the cost of doing business in the capital. This guide breaks down realistic pricing for every London property type."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in London"
      relatedPages={relatedPages}
      ctaHeading="Quote London Rewires with Real Trade Pricing"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
