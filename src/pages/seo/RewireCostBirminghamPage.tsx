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
  { label: 'Rewire Cost Birmingham', href: '/guides/rewire-cost-birmingham' },
];

const tocItems = [
  { id: 'birmingham-pricing', label: 'Birmingham Rewire Pricing' },
  { id: 'property-types', label: 'Birmingham Property Types' },
  { id: 'signs-rewire-needed', label: 'Signs a Rewire Is Needed' },
  { id: 'how-long', label: 'How Long Does It Take' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'whats-included', label: 'What Is Included in a Quote' },
  { id: 'find-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Birmingham costs between £2,800 and £12,000+ in 2026, broadly in line with the Midlands average. Electrician day rates in Birmingham typically run from £280 to £380 per day.',
  "Birmingham's housing stock includes large numbers of 1930s and 1950s semi-detached houses — particularly across Bournville, Stirchley, Kings Heath, and Erdington — where original VIR wiring is still encountered.",
  'Victorian back-to-back terraces in the inner ring — Handsworth, Saltley, Sparkbrook, and Digbeth — present the same challenges as any Victorian property: lath-and-plaster walls, limited void access, and ad-hoc wiring additions over the decades.',
  'Birmingham rewires are notifiable under Part P of the Building Regulations. Use a registered electrician (NICEIC, NAPIT, or ELECSA) to self-certify and avoid costly building control inspection fees.',
  'An Electrical Installation Certificate (EIC) is mandatory on completion, documenting design, construction, inspection, and testing to BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Birmingham in 2026?',
    answer:
      'A full rewire in Birmingham in 2026 typically costs £2,800–£4,500 for a 2-bed terraced house, £4,000–£6,500 for a 3-bed semi-detached, £6,000–£9,500 for a 4-bed detached, and £9,500–£13,000+ for a large 5-bed or period property. Prices reflect Midlands electrician day rates of £280 to £380 and include all materials, labour, a new consumer unit, initial verification testing, the EIC, and Part P notification. Making good (plastering and decoration) is typically quoted separately.',
  },
  {
    question: 'Why might a Birmingham rewire cost more or less than average?',
    answer:
      'Birmingham rewire costs vary based on property age and construction. 1930s and 1950s semis — which dominate much of inner and outer Birmingham — are relatively straightforward to rewire: plasterboard or sand-and-cement render walls, accessible loft spaces, and straightforward cable routes. Victorian terraces in inner Birmingham are more challenging: lath-and-plaster walls, solid ground floors, and limited access. Properties in Edgbaston, Moseley, and Solihull with large floor areas, multiple storeys, or complex layouts push costs towards the top of the range.',
  },
  {
    question: 'How long does a rewire take in Birmingham?',
    answer:
      'A 2-bed terraced house in Birmingham takes 4 to 6 working days. A 3-bed semi takes 5 to 8 days. A 4-bed detached takes 7 to 10 days. Victorian terraces with lath-and-plaster walls in areas such as Handsworth, Saltley, and Sparkbrook take longer due to the time needed for careful chasing and making good. Modern 1980s or 1990s houses in outer Birmingham (Sutton Coldfield, Solihull outskirts, Great Barr) are faster to rewire due to plasterboard construction and easier void access.',
  },
  {
    question: 'Do I need to notify the council for a rewire in Birmingham?',
    answer:
      'Yes. A full rewire is notifiable under Part P of the Building Regulations. If your electrician is registered with NICEIC, NAPIT, or ELECSA, they will self-certify the work and notify Birmingham City Council building control on your behalf. If the electrician is not registered, you must notify Birmingham City Council Building Control before the work starts and pay for a building control inspection (typically £200 to £350). Always use a registered electrician to avoid this cost and delay.',
  },
  {
    question: 'Can I stay in my Birmingham house during a rewire?',
    answer:
      'It is possible but uncomfortable during the first fix phase. You will experience noise and dust from wall chasing, and the power will be off during working hours. Many Birmingham homeowners choose to stay elsewhere for the duration of first fix (typically 3 to 6 days) and return for second fix. If you have young children, elderly family members, or anyone with health conditions that are sensitive to dust, staying elsewhere during first fix is strongly recommended.',
  },
  {
    question: 'Are there any grants for rewiring a house in Birmingham?',
    answer:
      "Birmingham City Council has in the past operated Disabled Facilities Grants and home improvement loans through its private sector housing team, which can sometimes cover electrical upgrading work where it is needed for safety or disability access reasons. The national ECO4 scheme may fund some electrical work if linked to energy efficiency improvements. Birmingham Metropolitan Housing Trust and other registered social landlords in the city also have upgrade programmes for their tenants. Contact Birmingham City Council's housing team to check current availability.",
  },
  {
    question: 'What is included in a Birmingham rewire quote?',
    answer:
      'A comprehensive Birmingham rewire quote should include: new consumer unit (metal enclosure, RCBOs or dual-RCD arrangement, SPD), all circuit cables (twin and earth for rings, radials, lighting, and dedicated appliance circuits), all accessories (sockets, switches, ceiling roses), earthing and bonding conductors, initial verification testing of every circuit, the Electrical Installation Certificate, and Part P notification. Making good (plastering), skip hire, asbestos removal (if encountered), and supply upgrades via Western Power Distribution are typically excluded.',
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
    href: '/guides/rewire-cost-london',
    title: 'Rewire Cost London',
    description: 'London rewire prices — the most expensive region in the UK for electrical work.',
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
    id: 'birmingham-pricing',
    heading: 'Birmingham Rewire Pricing (2026)',
    content: (
      <>
        <p>
          Birmingham and the wider West Midlands region sit in the mid-range for UK rewire costs.
          Electrician day rates in Birmingham are typically £280 to £380 — significantly below
          London rates but comparable with Manchester, Leeds, and other major English cities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Birmingham Rewire Costs by Property Type (2026)
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
                <strong>2-bed terraced house:</strong> £2,800–£4,500 (4–6 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £4,000–£6,500 (5–8 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £6,000–£9,500 (7–10 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>5-bed or large period property:</strong> £9,500–£14,000+ (10–15 days)
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
          separately — budget an additional £500–£2,000 for a standard Birmingham property.
        </p>
        <p>
          Properties in Edgbaston, Solihull, and Sutton Coldfield tend to be larger and sometimes
          attract slightly higher labour costs due to the scale and complexity of the work. Inner
          Birmingham Victorian terraces (Handsworth, Sparkbrook, Saltley) attract higher costs due
          to lath-and-plaster construction. Modern estates across Great Barr, Erdington, and
          Northfield are at the lower end due to easier access and modern construction methods.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Birmingham Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Birmingham has one of the most varied housing stocks of any UK city, reflecting its rapid
          growth during the industrial revolution, inter-war expansion, and post-war redevelopment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian back-to-backs and terraces (1860s–1900s):</strong> Found in
                Handsworth, Saltley, Sparkbrook, Bordesley, and Digbeth. Many have had ad-hoc
                electrical additions over the decades without proper circuit design.
                Lath-and-plaster walls and solid floors make rewiring time-consuming.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s–1950s semis:</strong> Dominant across Kings Heath, Bournville,
                Stirchley, Erdington, and Moseley. Many still have original VIR (vulcanised india
                rubber) wiring. While easier to rewire than Victorian properties, the wiring is well
                past its safe service life and lacks modern protective devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1960s–1980s council and private estates:</strong> Found extensively across
                outer Birmingham — Northfield, Great Barr, Quinton, Sheldon. PVC-insulated wiring in
                these properties may still be original. Consumer units often have BS 3036 rewirable
                fuses. Rewiring is relatively straightforward due to plasterboard walls and
                accessible lofts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large period detached (Edgbaston, Moseley, Harborne):</strong> Victorian and
                Edwardian detached properties with high ceilings, multiple storeys, extensive
                lighting circuits, and large floor areas. These take the longest to rewire and
                attract the highest costs, but the scale is reflected in the price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Birmingham Property Needs a Rewire',
    content: (
      <>
        <p>
          Book an <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> with a
          qualified electrician for a definitive assessment. These warning signs suggest urgent
          action:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Round-pin sockets or fabric-sheathed wiring</strong> — pre-1960s wiring that
                is almost certainly beyond its safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board</strong> — a wooden-backed consumer unit with wire
                fuses offers no RCD protection and is a fire and shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent circuit trips or blown fuses</strong> — overloaded circuits or
                deteriorating cable insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or scorch marks near sockets</strong> — signs of overheating
                connections, which is a fire risk requiring immediate attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No earth connection to sockets</strong> — common in older Birmingham
                properties where the original wiring had no circuit protective conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR with C1 or C2 observations</strong> — a professional inspection has
                identified dangerous or potentially dangerous conditions requiring urgent remedial
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
    heading: 'How Long Does a Rewire Take in Birmingham?',
    content: (
      <>
        <p>
          Rewire timescales in Birmingham depend primarily on property age and construction type.
          Older properties with lath-and-plaster walls take longer; modern plasterboard construction
          is significantly faster.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls, running cables through floor and ceiling voids, installing back boxes
              and containment. This is the most disruptive phase — noise, dust, and power off during
              working hours. In a Birmingham 1930s semi: 3–5 days. In a Victorian terrace: 4–7 days.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting sockets, switches, light fittings, connecting the consumer unit, testing every
              circuit. Much less disruptive — power restored progressively. In a Birmingham 3-bed
              semi: 1–3 days. Power is usually restored to most circuits during second fix.
            </p>
          </div>
        </div>
        <p>
          Additional time may be needed where asbestos is present (common in Birmingham properties
          from the 1950s–1970s, particularly artex ceilings and floor tiles), or where the supply
          fuse needs upgrading by Western Power Distribution (National Grid Electricity
          Distribution). Supply upgrades can take 2–6 weeks to schedule.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Birmingham Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England). This
          means the work must be carried out by a registered electrician — such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA
          registered — or the homeowner must notify Birmingham City Council Building Control before
          work begins.
        </p>
        <p>
          Using a registered electrician is strongly recommended. They will self-certify the work,
          submit notification to Birmingham City Council, and you will receive a Building
          Regulations Compliance Certificate within 30 days. Unregistered electricians require a
          building control inspection (£200–£350 in Birmingham) and cause delays to the project.
        </p>
        <p>
          Under BS 7671:2018+A3:2024, Regulation 411.3.3 requires RCD protection for all socket
          outlets rated up to 32A. The electrician must issue an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          on completion.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Birmingham Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive rewire quote for a Birmingham property should itemise every element. Be
          cautious of single-figure quotes with no breakdown.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer unit</strong> — metal enclosure with RCBOs or dual-RCD
                arrangement, SPD, and main switch. The heart of the new installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All circuit cables</strong> — twin and earth cable for ring finals, radials,
                lighting circuits, cooker, shower, and immersion heater. Quantities depend on
                property size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories</strong> — sockets, switches, ceiling roses, fused connection
                units. Standard white plastic is included; upgraded finishes cost extra.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — main earth conductor and main bonding
                conductors to gas, water, and oil pipework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and certification</strong> — initial verification of every circuit,
                EIC, and Part P notification.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="AI Cost Engineer for Birmingham Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin calculated from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Birmingham',
    content: (
      <>
        <p>
          Birmingham has a large number of electricians, but quality varies. Use these steps to find
          a reliable, qualified electrician for your rewire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> — search by postcode
                on the relevant register. Non-negotiable for Part P compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get at least three quotes</strong> — compare on a like-for-like basis.
                Ensure each quote specifies consumer unit type, number of circuits, and whether
                making good is included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about experience with your property type</strong> — Victorian Birmingham
                terraces and 1930s semis require different approaches. Ask for references from
                similar local properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm EIC and Part P notification are included</strong> — these are not
                optional extras; they are legal requirements.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage Birmingham rewire projects with Elec-Mate"
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

export default function RewireCostBirminghamPage() {
  return (
    <GuideTemplate
      title="Rewire Cost Birmingham 2026 | House Rewire Prices West Midlands"
      description="How much does a house rewire cost in Birmingham in 2026? Complete pricing guide for 2-bed, 3-bed, and 4-bed properties in Birmingham and the West Midlands, covering Victorian terraces, 1930s semis, Part P notification, and finding a qualified electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Rewire Cost Birmingham: <span className="text-yellow-400">2026 Price Guide</span>
        </>
      }
      heroSubtitle="Birmingham rewire costs in 2026 across all property types — from Victorian back-to-backs in the inner ring to 1930s semis across Kings Heath and Bournville. Real prices, Part P guidance, and what to look for in a Birmingham electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Quote Birmingham Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
