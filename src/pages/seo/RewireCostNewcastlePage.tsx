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
  { label: 'Rewire Cost Newcastle', href: '/rewire-cost-newcastle' },
];

const tocItems = [
  { id: 'newcastle-pricing', label: 'Newcastle Rewire Pricing' },
  { id: 'property-types', label: 'North East Property Types' },
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
  'A full house rewire in Newcastle upon Tyne costs between £2,000 and £7,000+ in 2025. The North East has some of the most competitive electrician rates in England, with day rates of £250 to £360, making Newcastle one of the most affordable major cities for rewiring.',
  'Newcastle and the wider North East have substantial Victorian and Edwardian terraced and semi-detached housing in areas such as Jesmond, Heaton, Fenham, and the West End. Solid stone or brick construction with lath-and-plaster adds time to rewires in these areas.',
  'A full rewire is notifiable under Part P of the Building Regulations (England). Use a NICEIC, NAPIT, or ELECSA-registered electrician to self-certify and avoid building control inspection fees from Newcastle City Council.',
  'A typical rewire takes 3–5 days for a 2-bed property and 5–7 days for a 3-bed. Expect wall chasing, replastering, and periods without power during the first fix phase.',
  'An Electrical Installation Certificate (EIC) is mandatory on completion of every rewire, confirming compliance with BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Newcastle in 2025?',
    answer:
      'A full rewire in Newcastle in 2025 typically costs £2,000–£3,200 for a 2-bed terraced house, £3,000–£4,800 for a 3-bed semi-detached, and £4,200–£7,000 for a 4-bed detached property. The North East has some of the most competitive electrician rates in England, with day rates of £250 to £360. Victorian terraces in Heaton, Fenham, Walker, and Byker take longer to rewire due to lath-and-plaster construction, bringing their costs closer to the middle of the national range.',
  },
  {
    question: 'How long does a rewire take in a Newcastle terraced house?',
    answer:
      'A typical 2-bedroom terraced house in Newcastle (Heaton, Fenham, Walker, Byker, Elswick) takes 3 to 5 working days to rewire. First fix — chasing lath-and-plaster or brick walls, running cables, fitting back boxes — takes 2 to 3 days. Second fix — fitting accessories, consumer unit, and testing — takes 1 to 2 days. Larger Victorian semis in Jesmond or Gosforth take 5 to 7 days for a 3-bed, and modern detached houses in the outer suburbs (Ponteland, Dinnington, Wide Open) complete in 4 to 6 days.',
  },
  {
    question: 'Do I need to notify Newcastle City Council for a rewire?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations (England). If your electrician is registered with NICEIC, NAPIT, or ELECSA, they will self-certify and notify Newcastle City Council Building Control on your behalf — you will receive a compliance certificate within 30 days. If the electrician is not registered, you must notify Newcastle City Council Building Control before work starts and pay an inspection fee of typically £150 to £280.',
  },
  {
    question: 'What are the signs my Newcastle property needs a rewire?',
    answer:
      'Key warning signs include: fabric-covered or rubber-insulated wiring (common in Newcastle terraced houses built before 1960), a wooden-backed rewirable fuse board with wire fuses, sockets or switches that feel warm or show scorch marks, circuit breakers that trip repeatedly or fuses that blow, no earth connection at sockets, and a burning smell from outlets or the consumer unit. An EICR carried out by a qualified electrician will confirm whether a full or partial rewire is needed.',
  },
  {
    question: 'Are there any grants for rewiring in Newcastle or the North East?',
    answer:
      "The North East has historically had access to above-average government energy efficiency funding. The national ECO4 scheme funds energy efficiency improvements for eligible households, which can include electrical work. The Warm Homes Fund and various local authority schemes have also operated in the North East. Northumbrian Water's Warm Homes Discount and various North East councils' empty homes schemes may offer support. Contact the national Home Energy helpline (0300 123 1234) or Newcastle City Council's housing improvement team for current options.",
  },
  {
    question: 'What does a full Newcastle rewire include?',
    answer:
      'A comprehensive Newcastle rewire quote should include: new consumer unit (metal enclosure with RCBOs or dual-RCD arrangement and SPD), all circuit cables (twin and earth for ring finals, radials, lighting, cooker, shower, immersion heater), all accessories (sockets, switches, ceiling roses, FCUs), earthing and bonding conductors, initial verification testing of every circuit, the Electrical Installation Certificate, and Part P notification. Making good (plastering chased walls), skip hire, asbestos removal if encountered, and supply upgrades via Northern Powergrid are typically quoted separately.',
  },
  {
    question: 'How much does replastering cost after a Newcastle rewire?',
    answer:
      'Replastering costs after a Newcastle rewire depend on property type. In a Victorian terraced house with lath-and-plaster walls (Heaton, Fenham, Walker), budget £300 to £800 for making good. Post-war semis and bungalows with plasterboard walls cost significantly less — typically £100 to £300. Properties in conservation areas (Jesmond Dene, parts of Gosforth, the Grainger Town area) may require heritage finishes if listed, adding cost.',
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
    href: '/rewire-cost-sheffield',
    title: 'Rewire Cost Sheffield',
    description:
      'Sheffield rewire costs — another affordable North of England city for comparison.',
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
    id: 'newcastle-pricing',
    heading: 'Newcastle Rewire Pricing (2025)',
    content: (
      <>
        <p>
          Newcastle upon Tyne and the wider North East region offer some of the most competitive
          electrician rates in England. Day rates of £250 to £360 are typically 20–30% below London
          and 10–15% below the national average, making the North East one of the most affordable
          regions for a full house rewire. Victorian and Edwardian properties in central Newcastle
          areas take longer to rewire and sit closer to the national average cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Newcastle Rewire Costs by Property Type (2025)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> £2,000–£3,200 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £3,000–£4,800 (4–7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £4,200–£7,000 (6–9 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large period property (5-bed+):</strong> £7,000–£11,000+ (9–14 days)
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
          budget an additional £300 to £800 for a standard Newcastle Victorian terrace.
        </p>
        <p>
          Victorian and Edwardian terraces in Jesmond, Heaton, Fenham, and the West End sit at the
          higher end of each range. Post-war semis and detached houses in Ponteland, Cramlington,
          Dinnington, and modern estates are at the lower end.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'North East Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Newcastle and the surrounding North East region have a varied housing stock, from
          Victorian stone and brick terraces to post-war council housing and modern new builds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces and semis (1870s–1910s):</strong> Heaton, Fenham, Walker,
                Byker, Elswick, and Scotswood. Brick with lath-and-plaster interiors. Many have had
                piecemeal wiring additions over decades and contain circuits from different eras. An
                EICR commonly finds rubber-insulated wiring and rewirable fuse boards in these
                areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian villas and semis (1900s–1920s):</strong> Jesmond, Gosforth,
                Sandyford, and South Gosforth. Larger properties with accessible loft spaces. Many
                have original wiring or 1960s/1970s partial upgrades. Often easier to rewire than
                the older Victorian terraces, but considerable cable quantities are needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inter-war semis and bungalows (1920s–1940s):</strong> Denton Burn, Benwell,
                Westerhope, and Kingston Park. Cavity brick construction with accessible lofts. Many
                have VIR wiring approaching the end of its safe service life or early PVC wiring
                without earthing on lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war council estates (1950s–1970s):</strong> Kenton, Newbiggin Hall,
                Blakelaw, and Walker. Plasterboard or concrete panel construction — the most
                straightforward to rewire. Consumer units commonly have BS 3036 rewirable fuses or
                early single-RCD boards needing replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted flats (Jesmond and Heaton):</strong> Victorian houses subdivided
                into flats, particularly prevalent in Jesmond and Heaton. Quality of electrical
                installation varies considerably. Shared sub-mains, undersized consumer units, and
                multi-era wiring are common findings on EICR.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Newcastle Property Needs a Rewire',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> is the
          definitive method to confirm rewire need. These warning signs indicate urgent attention is
          required:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fabric-covered or rubber-insulated wiring</strong> — pre-1960s wiring beyond
                its safe service life, very common in Newcastle's Victorian terrace areas.
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
                connections are an immediate fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sockets without an earth connection</strong> — older Newcastle properties
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
    heading: 'How Long Does a Rewire Take in Newcastle?',
    content: (
      <>
        <p>
          Newcastle rewire timescales depend on property type. Victorian terraces with
          lath-and-plaster are the most time-consuming; modern plasterboard construction is
          quickest.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls, running cables through floors and ceiling voids, fitting back boxes. In
              a Newcastle Victorian terrace: 2–3 days. In a modern semi: 1–2 days. Power is off
              during working hours. Significant dust in lath-and-plaster properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting accessories, consumer unit, testing every circuit. In a Newcastle 3-bed: 2–3
              days. Power is restored progressively as circuits are completed and tested. The EIC
              and Part P notification are completed at the end of second fix.
            </p>
          </div>
        </div>
        <p>
          Allow extra time if asbestos is present (common in North East properties from the 1950s
          and 1960s), or if Northern Powergrid need to be contacted for a supply upgrade — this
          typically takes 4 to 10 weeks to schedule in the North East.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Newcastle Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive rewire quote should itemise every element. Be cautious of single-figure
          quotes — they make it impossible to compare proposals properly.
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
          Typically NOT included: making good (plastering and decoration), skip hire, asbestos
          removal if encountered, and supply upgrades via Northern Powergrid.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Newcastle Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Newcastle Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England). The
          work must be carried out by an electrician registered with a competent person scheme —
          such as <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA — or
          the homeowner must notify Newcastle City Council Building Control before work starts.
        </p>
        <p>
          A registered electrician self-certifies the work, notifies Newcastle City Council, and you
          receive a Building Regulations Compliance Certificate within 30 days. Using an
          unregistered electrician means a building control inspection fee of £150–£280 and a longer
          process. On completion, the electrician must issue an{' '}
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
    heading: 'Disruption and Replastering After a Newcastle Rewire',
    content: (
      <>
        <p>
          A full rewire causes significant disruption, particularly in Victorian terraces with
          lath-and-plaster walls. Plan accommodation and budget for the full project cost — not just
          the electrical work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall chasing creates dust and noise</strong> — cutting channels in
                lath-and-plaster or brick generates significant dust. Cover furniture and seal off
                rooms during first fix.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power is off during first fix</strong> — the electricity supply is isolated
                while new circuits are installed. Many residents stay elsewhere during the first fix
                phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replastering is a separate cost</strong> — after chases are filled, a
                plasterer reinstates the wall surfaces. Budget £300 to £800 for a Victorian
                Newcastle terrace. Post-war properties with plasterboard: £100 to £300.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Decoration follows plastering</strong> — once the plaster has dried
                (typically 2 to 4 weeks for new plaster), the walls can be painted. Budget for this
                as part of the total project cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Newcastle',
    content: (
      <>
        <p>
          Newcastle and Tyne and Wear have a strong pool of qualified electricians. Use these
          criteria to identify a reliable contractor:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> — search by Newcastle
                or Tyne and Wear postcode on the scheme's online register. Non-negotiable for Part P
                compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about local terrace and semi experience</strong> — rewiring a Heaton or
                Fenham Victorian terrace differs from a Ponteland modern detached. Ask for
                references from similar North East properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get at least three comparable quotes</strong> — ensure each specifies
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
          title="Manage Newcastle rewire projects with Elec-Mate"
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

export default function RewireCostNewcastlePage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Newcastle 2025 | Rewire Prices North East"
      description="How much does a house rewire cost in Newcastle in 2025? Real prices for 2-bed, 3-bed, and 4-bed properties — Victorian terraces in Heaton and Jesmond, Part P notification, disruption, replastering costs, and finding a NICEIC-registered electrician in the North East."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Newcastle:{' '}
          <span className="text-yellow-400">2025 North East Price Guide</span>
        </>
      }
      heroSubtitle="Newcastle rewire costs in 2025 — one of England's most competitive cities for electrical work. Real prices from Victorian terraces in Heaton and Fenham to modern detached houses in Ponteland and Cramlington."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Newcastle"
      relatedPages={relatedPages}
      ctaHeading="Quote Newcastle Rewires with Real Trade Pricing"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
