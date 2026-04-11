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
  { label: 'Rewire Cost Leeds', href: '/guides/rewire-cost-leeds' },
];

const tocItems = [
  { id: 'leeds-pricing', label: 'Leeds Rewire Pricing' },
  { id: 'property-types', label: 'Leeds Property Types' },
  { id: 'signs-rewire-needed', label: 'Signs a Rewire Is Needed' },
  { id: 'how-long', label: 'How Long Does It Take' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'whats-included', label: 'What Is Included in a Quote' },
  { id: 'find-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Leeds costs between £2,500 and £11,000+ in 2026, reflecting Yorkshire labour rates of £280 to £380 per day and the range of property types across the city.',
  'Leeds has a large stock of Victorian and Edwardian back-to-back terraces and through-terraces in inner-city areas including Headingley, Hyde Park, Beeston, and Holbeck — these present the most complex rewire jobs in terms of access and timescales.',
  'New-build and inter-war semis dominate the outer suburbs of Leeds (Roundhay, Horsforth, Morley, Garforth) and represent the most straightforward rewire jobs.',
  'Leeds rewires are notifiable under Part P of the Building Regulations. Use a NICEIC, NAPIT, or ELECSA-registered electrician to self-certify and avoid costly building control inspection fees.',
  'An Electrical Installation Certificate (EIC) is mandatory on completion of every rewire, confirming the installation complies with BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Leeds in 2026?',
    answer:
      'A full rewire in Leeds in 2026 typically costs £2,500–£4,000 for a 2-bed terraced house, £3,800–£6,000 for a 3-bed semi-detached, £5,500–£9,000 for a 4-bed detached, and £9,000–£13,000+ for a large period property. These prices include all materials, labour, a new consumer unit, initial verification testing, the EIC, and Part P notification. Making good (plastering and decoration) is quoted separately — budget an additional £500–£2,000 depending on the extent of wall chasing.',
  },
  {
    question: 'Are Leeds rewire costs lower than London?',
    answer:
      'Yes, significantly. Electrician day rates in Leeds (£280 to £380) are typically 20 to 40% lower than in London (£350 to £500+). A 3-bed semi rewire in Leeds costs roughly £3,800 to £6,000 versus £7,000 to £10,000 in London for a comparable property. The gap narrows slightly for complex Victorian properties, where the lath-and-plaster construction adds similar time costs regardless of location, but the labour rate differential still applies.',
  },
  {
    question: 'How long does a rewire take in a Leeds Victorian terrace?',
    answer:
      'A typical 2-bedroom Victorian terraced house in Leeds (Headingley, Hyde Park, Beeston, Meanwood) takes 5 to 8 working days to rewire. First fix — chasing walls, running cables, fitting back boxes — takes 3 to 5 days in a Victorian terrace due to lath-and-plaster walls and limited void access. Second fix — fitting accessories, connecting the consumer unit, testing — takes 2 to 3 days. Back-to-back terraces, which lack a rear access and may have no loft, can take longer. Modern semis in outer Leeds (Roundhay, Horsforth) take 4 to 6 days for a 3-bed.',
  },
  {
    question: 'Do I need to notify Leeds City Council for a rewire?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations. If your electrician is registered with NICEIC, NAPIT, or ELECSA, they will self-certify the work and submit notification to Leeds City Council Building Control on your behalf. If the electrician is not registered, you must notify Leeds City Council Building Control before the work begins and pay for a building control inspection (typically £200 to £350). Always use a registered electrician to avoid the additional cost and delay.',
  },
  {
    question: 'Can I stay in my Leeds house during a rewire?',
    answer:
      'You can, but first fix is disruptive. During first fix you will experience noise and dust from wall chasing, and power will be off during working hours. Many Leeds homeowners choose to stay with family or use short-term accommodation during the first fix phase (typically 3 to 5 days), then return for the quieter second fix. For smaller Leeds flats (student lets in Headingley, Hyde Park) rewiring can be completed more quickly, making staying elsewhere for the full duration more practical.',
  },
  {
    question: 'Are there grants for house rewiring in Leeds?',
    answer:
      "Leeds City Council operates a private sector housing assistance programme that in some circumstances provides grants or interest-free loans for essential home repairs, including electrical work, for older or disabled homeowners. These are means-tested. The national ECO4 scheme may fund some electrical work where it is linked to energy efficiency improvements. Contact Leeds City Council's housing options team to check current availability for your situation.",
  },
  {
    question: 'What happens to walls after a rewire in a Leeds back-to-back terrace?',
    answer:
      'After first fix, chased channels need to be filled and skimmed. In lath-and-plaster walls — common in Leeds Victorian terraces — specialist making good is needed, as standard plasterboard techniques do not apply. The electrician is responsible for the electrical work only; making good is typically arranged separately with a plasterer. Budget £600 to £1,500 for plastering after a full rewire in a Leeds Victorian terrace, depending on the number of chases and the wall finish required.',
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
    description: 'London rewire prices for comparison with Leeds costs.',
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
    id: 'leeds-pricing',
    heading: 'Leeds Rewire Pricing (2026)',
    content: (
      <>
        <p>
          Leeds is one of the major regional centres for electrical work in the North of England.
          Electrician day rates in Leeds are typically £280 to £380 — below London and the South
          East, and broadly comparable with Manchester, Sheffield, and Bradford.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Leeds Rewire Costs by Property Type (2026)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>1-bed flat:</strong> £2,200–£3,500 (3–4 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> £2,500–£4,000 (4–6 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £3,800–£6,000 (5–7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £5,500–£9,000 (7–10 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large period property (5-bed+):</strong> £9,000–£13,000+ (10–15 days)
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
          , and Part P notification. Making good is quoted separately — budget £500–£1,500 for a
          standard Leeds property.
        </p>
        <p>
          Inner Leeds (Headingley, Hyde Park, Beeston, Holbeck) Victorian terraces attract costs
          towards the higher end due to lath-and-plaster construction and limited access. Outer
          Leeds suburbs (Roundhay, Morley, Garforth, Wetherby) with inter-war and modern housing sit
          at the lower end.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Leeds Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Leeds has diverse housing stock reflecting over 150 years of urban growth, from the
          Victorian inner city to modern edge-of-city development.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian back-to-backs and through-terraces (1860s–1900s):</strong> Highly
                concentrated in Headingley, Hyde Park, Beeston, Holbeck, and Harehills.
                Back-to-backs are a distinctive Leeds building type — no rear access, no loft in
                many cases. Cable routing is challenging and takes longer than in conventional
                terraces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian through-terraces (1900s–1910s):</strong> Found in Burley, Armley,
                Bramley, and Chapel Allerton. Larger than back-to-backs, with rear gardens and more
                accessible cable routes, but still lath-and-plaster construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s–1950s semis:</strong> Dominant across Roundhay, Moortown, Horsforth,
                and Morley. Many still have original VIR wiring with no earth on lighting circuits.
                Relatively easy to rewire due to plasterboard or render walls and accessible loft
                space. Very common rewire job type in Leeds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1960s–1980s estates:</strong> Widespread across outer Leeds — Seacroft,
                Gipton, Belle Isle, Middleton. Consumer units often have BS 3036 rewirable fuses.
                Rewiring is relatively straightforward.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Leeds Property Needs a Rewire',
    content: (
      <>
        <p>
          The definitive assessment requires an{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>. These warning
          signs indicate you should arrange an inspection promptly:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fabric-covered or rubber-insulated wiring visible</strong> — pre-1960s
                wiring beyond its safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board with wire fuses</strong> — no RCD protection, fire and
                shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sockets with no earth pin</strong> — round-pin sockets or 2-pin outlets
                indicate pre-earthing era wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent tripping or blown fuses</strong> — overloaded circuits or
                deteriorating insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR with C1 or C2 observations</strong> — dangerous or potentially
                dangerous conditions identified by a professional inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Rewire Take in Leeds?',
    content: (
      <>
        <p>
          Rewire timescales in Leeds depend heavily on property age. Victorian terraces and
          back-to-backs take the longest; modern estates and new-builds are the quickest.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing, cabling, back boxes, containment. In a Leeds Victorian terrace: 3–5 days. In
              a 1930s Leeds semi: 2–3 days. In a back-to-back with no loft: add 1–2 extra days for
              more complex routing. Power is off during working hours throughout first fix.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Accessories, consumer unit connection, testing. In a Leeds 3-bed: 2–3 days. Power is
              restored progressively as circuits are connected and tested. The EIC and Part P
              notification are completed at the end of second fix.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Leeds Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England). Use
          an electrician registered with{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA.
          They will self-certify the work and notify Leeds City Council Building Control on your
          behalf, and you receive a Building Regulations Compliance Certificate within 30 days.
        </p>
        <p>
          Unregistered electricians require a Leeds City Council building control inspection (£200
          to £350) and cause project delays. Every rewire must also produce an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          documenting design, construction, inspection, and testing of the full installation.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Leeds Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive rewire quote should itemise every element. Single-figure quotes with no
          breakdown make it impossible to compare fairly.
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
                <strong>All circuit cables</strong> — twin and earth for ring finals, radials,
                lighting, cooker, shower, and immersion heater circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories</strong> — sockets, switches, ceiling roses, FCUs. Standard
                white plastic included; upgrades extra.
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
          title="AI Cost Engineer for Leeds Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials, labour hours, and profit margin calculated from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Leeds',
    content: (
      <>
        <p>
          Leeds has many electricians. Use these steps to identify a reliable, registered contractor
          for your rewire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> — search by Leeds
                postcode on the relevant register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three comparable quotes</strong> — specify the same scope (property
                size, number of circuits, consumer unit type) to compare like with like.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about Leeds housing stock experience</strong> — back-to-backs and
                Victorian terraces require specific expertise. Ask for references from similar Leeds
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm EIC and Part P are included</strong> — non-negotiable. If absent
                from the quote, the quote is incomplete.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage Leeds rewire projects with Elec-Mate"
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

export default function RewireCostLeedsPage() {
  return (
    <GuideTemplate
      title="Rewire Cost Leeds 2026 | House Rewire Prices Yorkshire"
      description="How much does a house rewire cost in Leeds in 2026? Pricing for 2-bed, 3-bed, and 4-bed properties in Leeds and West Yorkshire — Victorian terraces, back-to-backs, 1930s semis, Part P notification, and finding a qualified electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Rewire Cost Leeds: <span className="text-yellow-400">2026 Price Guide</span>
        </>
      }
      heroSubtitle="Leeds rewire costs in 2026 across all property types — from Victorian back-to-backs in Headingley and Hyde Park to 1930s semis in Roundhay and Horsforth. Realistic Yorkshire prices, Part P guidance, and what to expect from a Leeds electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Leeds"
      relatedPages={relatedPages}
      ctaHeading="Quote Leeds Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
