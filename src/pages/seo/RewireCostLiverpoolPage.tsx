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
  { label: 'Rewire Cost Liverpool', href: '/rewire-cost-liverpool' },
];

const tocItems = [
  { id: 'liverpool-pricing', label: 'Liverpool Rewire Pricing' },
  { id: 'property-types', label: 'Liverpool Property Types' },
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
  "A full house rewire in Liverpool costs between £2,200 and £7,500+ in 2025. Electrician day rates of £270 to £380 are below the national average, reflecting Merseyside's lower cost of living compared with London and the South East.",
  'Liverpool has extensive Victorian and Edwardian terraced housing across areas such as Toxteth, Wavertree, Kensington, Anfield, and the Georgian Quarter. These properties have lath-and-plaster walls and are more time-consuming to rewire than modern plasterboard construction.',
  'A full rewire is notifiable under Part P of the Building Regulations (England). Use a NICEIC, NAPIT, or ELECSA-registered electrician to self-certify and avoid building control inspection fees.',
  'A typical rewire takes 3–5 days for a 2-bed terraced house and 5–8 days for a 3-bed property. Wall chasing, replastering, and temporary power loss are all part of the process.',
  'An Electrical Installation Certificate (EIC) is mandatory on completion of every rewire, confirming compliance with BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Liverpool in 2025?',
    answer:
      'A full rewire in Liverpool in 2025 typically costs £2,200–£3,500 for a 2-bed terraced house, £3,200–£5,000 for a 3-bed semi-detached, and £4,500–£7,500 for a 4-bed detached property. Liverpool prices are generally below the national average, driven by competitive electrician day rates of £270 to £380 on Merseyside. Victorian terraced houses in Toxteth, Wavertree, Kensington, and Anfield take longer to rewire than modern properties due to lath-and-plaster construction, which brings the cost of these properties closer to the national average.',
  },
  {
    question: 'How long does a rewire take in a Liverpool Victorian terrace?',
    answer:
      'A typical 2-bedroom Victorian terraced house in Liverpool (Toxteth, Wavertree, Kensington, Edge Hill) takes 4 to 6 working days to rewire. First fix — chasing lath-and-plaster walls, running cables, fitting back boxes — takes 2 to 4 days. Second fix — fitting accessories, consumer unit, and testing — takes 1 to 2 days. Modern semis in suburban Liverpool (Huyton, Halewood, Speke, Maghull) complete faster, typically 3 to 5 days for a 3-bed.',
  },
  {
    question: 'Do I need to notify Liverpool City Council for a rewire?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations (England). If your electrician is registered with NICEIC, NAPIT, or ELECSA, they will self-certify the work and notify Liverpool City Council Building Control on your behalf — you will receive a compliance certificate within 30 days. If the electrician is not registered, you must notify Liverpool City Council Building Control before work starts and pay a building control inspection fee of £180 to £300.',
  },
  {
    question: 'What are the signs my Liverpool property needs a rewire?',
    answer:
      'Key warning signs include: fabric-covered or rubber-insulated wiring (common in Liverpool properties built before 1960), a wooden-backed rewirable fuse board with wire fuses, sockets or switches that feel warm or show scorch marks, circuit breakers that trip repeatedly or fuses that blow, no earth connection at sockets, and a burning smell from outlets or the consumer unit. Many Liverpool terraced properties also have had ad-hoc circuit extensions added over the decades without a coherent design — an EICR will confirm the full picture.',
  },
  {
    question: 'Are there any grants for rewiring in Liverpool?',
    answer:
      "Liverpool City Council and Merseycare NHS Trust operate schemes to improve housing conditions for vulnerable residents, which may cover electrical work in certain circumstances. The national ECO4 (Energy Company Obligation) scheme can fund some electrical work linked to energy efficiency improvements for eligible households. The Warmer Homes Merseyside scheme may offer support. Contact Liverpool City Council's private housing team or call the national Home Energy Scotland / Warm Homes helpline for guidance on what is available.",
  },
  {
    question: 'What does a full Liverpool rewire include?',
    answer:
      'A comprehensive Liverpool rewire includes: new consumer unit (metal enclosure with RCBOs or dual-RCD arrangement and SPD), all circuit cables (twin and earth for ring finals, radials, lighting, cooker, shower, immersion heater), all accessories (sockets, switches, ceiling roses, FCUs), earthing and bonding conductors, initial verification testing of every circuit, the Electrical Installation Certificate, and Part P notification. Making good (plastering chased walls), skip hire, asbestos removal if encountered, and supply upgrades via Electricity North West are typically quoted separately.',
  },
  {
    question: 'How much does replastering cost after a Liverpool rewire?',
    answer:
      'Replastering costs after a Liverpool rewire depend on property type. In a Victorian terraced house with lath-and-plaster walls (Toxteth, Wavertree, Edge Hill), budget £400 to £1,000 for making good. Post-war semis and bungalows with plasterboard walls cost significantly less — typically £150 to £400. Properties in conservation areas (the Georgian Quarter, Huskisson Street, or parts of Aigburth) may require heritage lime plaster matching if the property is listed, which adds cost.',
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
    href: '/rewire-cost-manchester',
    title: 'Rewire Cost Manchester',
    description: 'Manchester rewire costs — how they compare with Liverpool pricing.',
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
    id: 'liverpool-pricing',
    heading: 'Liverpool Rewire Pricing (2025)',
    content: (
      <>
        <p>
          Liverpool is one of the more affordable major UK cities for electrical work. Electrician
          day rates of £270 to £380 are competitive within the North West, generally below
          Manchester but above most rural North West areas. The city's large stock of Victorian
          terraced housing means rewires in older areas involve more labour time than equivalent
          modern properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Liverpool Rewire Costs by Property Type (2025)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed terraced house:</strong> £2,200–£3,500 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached:</strong> £3,200–£5,000 (5–7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £4,500–£7,500 (7–10 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large period property (5-bed+):</strong> £7,500–£12,000+ (10–14 days)
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
          budget an additional £400 to £1,000 for a standard Liverpool Victorian terrace.
        </p>
        <p>
          Victorian terraces in Toxteth, Wavertree, Kensington, Anfield, and the Georgian Quarter
          sit at the higher end of each range. Post-war semis in Huyton, Halewood, Speke, and
          Maghull are at the lower end.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Liverpool Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Liverpool has a diverse housing stock shaped by Victorian expansion, inter-war growth, and
          post-war redevelopment. Each era presents different rewire challenges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (1860s–1900s):</strong> Toxteth, Wavertree, Kensington,
                Edge Hill, Anfield, and parts of Aigburth. Brick construction with lath-and-plaster
                internal walls, solid ground floors in many, and limited void access. These
                properties often have wiring from multiple different eras as circuits have been
                extended without proper design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Georgian Quarter properties (late 18th–early 19th century):</strong>
                Huskisson Street, Canning Street, and Falkner Square. Many are listed and have been
                converted into flats. High ceilings, deep solid walls, and ornate plasterwork.
                Listed building consent may be required for any external works.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian semis (1900s–1910s):</strong> Mossley Hill, Allerton, Childwall,
                and West Derby. Brick construction with accessible loft spaces. Slightly easier to
                rewire than Victorian terraces, but many still have VIR wiring approaching the end
                of its safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inter-war council and private housing (1920s–1940s):</strong> Norris Green,
                Croxteth, Huyton, and Walton. Cavity brick with accessible lofts. Many have original
                PVC wiring from 1950s–1960s upgrades without earthing on lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war estates (1950s–1970s):</strong> Halewood, Speke, Cantril Farm, and
                Kirkby. Plasterboard or large-panel construction — the most straightforward to
                rewire. Consumer units often have BS 3036 rewirable fuses or early single-RCD
                boards.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Liverpool Property Needs a Rewire',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> is the
          definitive way to confirm whether a rewire is needed. These warning signs indicate urgent
          inspection is required:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fabric-covered or rubber-insulated wiring</strong> — pre-1960s wiring beyond
                its safe service life, very common in Liverpool's Victorian terrace stock.
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
                <strong>Sockets without an earth connection</strong> — older Liverpool properties
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
    heading: 'How Long Does a Rewire Take in Liverpool?',
    content: (
      <>
        <p>
          Liverpool rewire timescales depend primarily on property type and age. Victorian terraces
          with lath-and-plaster walls take longer than modern properties; post-war plasterboard
          construction is the quickest.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls, running cables through floors and ceiling voids, installing back boxes.
              In a Liverpool Victorian terrace: 2–4 days. In a modern semi: 1–2 days. Power is off
              during working hours. Significant dust and debris in lath-and-plaster properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting accessories, consumer unit, testing every circuit. In a Liverpool 3-bed: 2–3
              days. Power is restored progressively as circuits are completed and tested. The EIC
              and Part P notification are completed at the end of second fix.
            </p>
          </div>
        </div>
        <p>
          Allow additional time if asbestos is present (common in Liverpool properties from the
          1950s and 1960s — artex ceilings and floor tiles are the most frequent sources), or if a
          supply upgrade from Electricity North West is needed (3 to 8 weeks to schedule).
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Liverpool Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive Liverpool rewire quote should itemise every element. Be cautious of
          single-figure quotes without a detailed breakdown — they make it impossible to compare
          proposals on a like-for-like basis.
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
                connection units. Standard white plastic included; upgraded finishes are extra.
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
                <strong>Testing and certification</strong> — initial verification testing of every
                circuit, the EIC, and Part P notification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Typically NOT included: making good (plastering and decoration), skip hire for waste,
          asbestos removal if encountered, and supply upgrades via Electricity North West.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Liverpool Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Liverpool Rewires',
    content: (
      <>
        <p>
          A full rewire is notifiable work under Part P of the Building Regulations (England). The
          work must be carried out by an electrician registered with a competent person scheme —
          such as <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA — or
          the homeowner must notify Liverpool City Council Building Control before work starts.
        </p>
        <p>
          Using a registered electrician is strongly recommended. They self-certify the work, notify
          Liverpool City Council, and you receive a Building Regulations Compliance Certificate
          within 30 days. An unregistered electrician means a building control inspection fee of
          £180–£300 and a longer process.
        </p>
        <p>
          On completion, the electrician must issue an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          documenting the design, construction, inspection, and testing of the new installation,
          confirming compliance with BS 7671:2018+A3:2024.
        </p>
      </>
    ),
  },
  {
    id: 'disruption',
    heading: 'Disruption and Replastering After a Liverpool Rewire',
    content: (
      <>
        <p>
          A full rewire involves significant disruption, particularly in Victorian terraced houses
          with lath-and-plaster walls. Understanding what to expect helps you plan accommodation and
          the total project budget.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall chasing creates dust and debris</strong> — cutting channels in
                lath-and-plaster generates significant dust that spreads throughout the property.
                Cover furniture and seal off rooms during first fix wherever possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power is off during first fix</strong> — the supply is isolated while new
                circuits are installed. Plan for no cooking, heating, or power for several days
                during first fix.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replastering is a separate cost</strong> — after chases are filled by the
                electrician, a plasterer is needed to reinstate the wall surfaces. Budget £400 to
                £1,000 for making good in a Liverpool Victorian terrace. Post-war properties with
                plasterboard walls: £150 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access to all rooms required throughout</strong> — clear furniture and
                valuables away from walls before the electrician starts. The entire property needs
                to be accessible for the duration of the job.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Liverpool',
    content: (
      <>
        <p>
          Liverpool and Merseyside have a strong pool of qualified electricians. Use these criteria
          to find a reliable, registered contractor for your rewire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or ELECSA registration</strong> — search by Liverpool
                or Merseyside postcode on the scheme's online register. Non-negotiable for Part P
                compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about Victorian terrace experience</strong> — rewiring a Toxteth or
                Wavertree terrace with lath-and-plaster requires specific knowledge. Ask for
                references from similar Liverpool properties.
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
          title="Manage Liverpool rewire projects with Elec-Mate"
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

export default function RewireCostLiverpoolPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Liverpool 2025 | Rewire Prices Merseyside"
      description="How much does a house rewire cost in Liverpool in 2025? Real prices for 2-bed, 3-bed, and 4-bed properties — Victorian terraces in Toxteth and Wavertree, Part P notification, disruption, replastering costs, and finding a NICEIC-registered electrician in Liverpool."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Liverpool: <span className="text-yellow-400">2025 Price Guide</span>
        </>
      }
      heroSubtitle="Liverpool rewire costs in 2025 — from Victorian terraces in Toxteth and Wavertree to post-war semis in Huyton and Halewood. Real prices by property size, Part P explained, and what to expect from wall chasing and replastering on Merseyside."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Liverpool"
      relatedPages={relatedPages}
      ctaHeading="Quote Liverpool Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
