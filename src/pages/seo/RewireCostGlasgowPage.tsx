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
  { label: 'Rewire Cost Glasgow', href: '/rewire-cost-glasgow' },
];

const tocItems = [
  { id: 'glasgow-pricing', label: 'Glasgow Rewire Pricing' },
  { id: 'scottish-building-standards', label: 'Scottish Building Standards' },
  { id: 'property-types', label: 'Glasgow Property Types' },
  { id: 'signs-rewire-needed', label: 'Signs a Rewire Is Needed' },
  { id: 'how-long', label: 'How Long Does It Take' },
  { id: 'whats-included', label: 'What Is Included in a Quote' },
  { id: 'disruption', label: 'Disruption and Replastering' },
  { id: 'find-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Glasgow costs between £2,200 and £8,000+ in 2025. Glasgow electrician day rates of £280 to £400 are competitive within Scotland, making Glasgow slightly more affordable than Edinburgh for comparable property types.',
  'Scotland operates its own Building Standards system. Glasgow rewires are notified to Glasgow City Council Building Standards, not under Part P as in England. The completion certificate process differs from the English competent person scheme approach.',
  'Glasgow\'s tenement stock — particularly in the West End, Southside, and the Victorian suburbs — presents rewire challenges similar to Edinburgh, with solid sandstone construction, high ceilings, and shared stairwells.',
  'A typical rewire takes 3–5 days for a 2-bed tenement flat and 5–8 days for a 3-bed villa. Wall chasing in sandstone generates significant debris and replastering is a separate cost.',
  'On completion of any Glasgow rewire, the electrician must issue an Electrical Installation Certificate confirming compliance with BS 7671:2018+A3:2024 and submit a completion certificate to Building Standards.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Glasgow in 2025?',
    answer:
      'A full rewire in Glasgow in 2025 typically costs £2,200–£3,800 for a 2-bed tenement flat or terraced house, £3,500–£5,500 for a 3-bed semi-detached or villa, and £5,000–£8,000 for a 4-bed detached property. Glasgow prices are generally 5–10% lower than Edinburgh for equivalent properties, with electrician day rates of £280 to £400. Tenement flats in the West End (Partick, Hyndland, Dowanhill) and Victorian properties in the Southside cost more due to sandstone construction and higher ceilings.',
  },
  {
    question: 'Do I need Building Warrant approval for a rewire in Glasgow?',
    answer:
      'In Scotland, electrical rewiring that involves alterations to fixed electrical installations is regulated under the Building (Scotland) Regulations 2004 by Glasgow City Council Building Standards. There is no Part P system in Scotland — instead, the electrician submits a completion certificate to Building Standards on completion. A Building Warrant may be required for the work before it starts, depending on the scope. Your electrician should be familiar with the Scottish Building Standards process and will advise accordingly.',
  },
  {
    question: 'How long does a rewire take in a Glasgow West End tenement?',
    answer:
      'A typical Glasgow West End tenement flat (2-bed, sandstone construction) takes 3 to 6 working days to rewire. First fix — chasing sandstone walls, running cables, fitting back boxes — takes 2 to 4 days. Second fix — fitting accessories, consumer unit, testing — takes 1 to 2 days. Larger tenement flats with multiple bedrooms, high ceilings, and original ornate plasterwork take longer. Post-war council flats in Drumchapel or Pollok with plasterboard construction complete faster — typically 3 to 4 days for a 2-bed.',
  },
  {
    question: 'What are the signs my Glasgow property needs a rewire?',
    answer:
      'Key warning signs include: fabric-covered or rubber-insulated wiring (common in Glasgow tenements built before the 1960s), a wooden-backed rewirable fuse board with wire fuses, sockets or switches that feel warm or show scorch marks, repeatedly tripping circuit breakers or blown fuses, a burning smell from outlets or the consumer unit, and no earth connection at sockets. Some Glasgow tenements also have aluminium wiring installed in 1970s upgrades, which must be fully replaced. An EICR will confirm the extent of work required.',
  },
  {
    question: 'What does a full Glasgow rewire include?',
    answer:
      'A comprehensive Glasgow rewire quote should include: new consumer unit (metal enclosure with RCBOs or dual-RCD arrangement and SPD), all circuit cables (twin and earth for ring finals, radials, lighting, cooker, shower, immersion heater), all accessories (sockets, switches, ceiling roses), earthing and bonding conductors, initial verification testing of every circuit, and the Electrical Installation Certificate. Making good (plastering sandstone chases), skip hire, and any supply upgrade via SP Energy Networks are typically excluded and priced separately.',
  },
  {
    question: 'How much does replastering cost after a Glasgow rewire?',
    answer:
      'Replastering costs after a Glasgow rewire depend on the property type. In a sandstone West End tenement flat, expect to budget £600 to £1,500 for making good the chased channels. Victorian villas in the Southside (Shawlands, Langside, Pollokshields) are similar. Post-war flats with plasterboard walls cost significantly less — typically £200 to £500. If the property is listed (several areas of Glasgow\'s West End and Merchant City have listed building designations), heritage lime plaster matching may be required, adding cost.',
  },
  {
    question: 'Are there grants for rewiring in Glasgow?',
    answer:
      'Glasgow City Council and Home Energy Scotland (the Scottish Government\'s advice service) offer grants and loans for essential home improvements, including electrical work, for eligible homeowners and private tenants. The Warmer Homes Scotland scheme provides free energy efficiency improvements (including some electrical work) for homeowners and private tenants on qualifying benefits. ECO4 funding may also apply to electrical work linked to energy efficiency improvements. Contact Home Energy Scotland (0808 808 2282) or Glasgow City Council\'s housing improvement team for current eligibility information.',
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
    href: '/rewire-cost-edinburgh',
    title: 'Rewire Cost Edinburgh',
    description: 'Edinburgh rewire costs — how they compare with Glasgow pricing.',
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
    id: 'glasgow-pricing',
    heading: 'Glasgow Rewire Pricing (2025)',
    content: (
      <>
        <p>
          Glasgow is Scotland's largest city and has competitive electrician day rates of £280 to
          £400 — generally 5–10% below Edinburgh but above the rest of Scotland. The city's
          extensive tenement stock, particularly in the West End and Southside, means many rewires
          involve the additional complexity of solid sandstone walls and high-ceilinged Victorian
          flats.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Glasgow Rewire Costs by Property Type (2025)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-bed tenement flat:</strong> £2,200–£3,800 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached or villa:</strong> £3,500–£5,500 (5–7 days)
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
                <strong>Large stone-built villa (5-bed+):</strong> £8,000–£13,000+ (10–15 days)
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
          , and Building Standards completion certificate submission. Making good (plastering and
          decoration) is quoted separately — budget £600 to £1,500 for a sandstone West End flat
          and £200 to £500 for a post-war property with plasterboard walls.
        </p>
        <p>
          West End Glasgow properties (Partick, Hyndland, Dowanhill, Kelvinside) sit at the upper
          end of each range. Post-war estates (Drumchapel, Easterhouse, Castlemilk) and modern
          new-build areas are at the lower end.
        </p>
      </>
    ),
  },
  {
    id: 'scottish-building-standards',
    heading: 'Scottish Building Standards — How Glasgow Rewires Are Regulated',
    content: (
      <>
        <p>
          Scotland operates a separate Building Standards system from England and Wales. Glasgow
          rewires fall under the Building (Scotland) Regulations 2004, administered by Glasgow
          City Council Building Standards. The process differs from England's Part P system:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Warrant</strong> — significant electrical alterations may require
                a building warrant from Glasgow City Council before work starts. Your electrician
                will advise whether a warrant is needed for your specific scope of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion Certificate</strong> — on completion, the electrician (or the
                building owner) submits a completion certificate to Building Standards confirming
                compliance with the Building (Scotland) Regulations. Building Standards may
                inspect the work before accepting the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance still required</strong> — the technical standard for
                electrical installations in Scotland is the same: BS 7671:2018+A3:2024 (the IET
                Wiring Regulations). An EIC is issued on completion in the same format.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT membership</strong> — SELECT (the Electrical Contractors Association
                of Scotland) is the main Scottish trade body. Many Glasgow electricians are SELECT
                members, which provides additional assurance alongside NICEIC or NAPIT registration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always use a Glasgow-based electrician who is familiar with Scottish Building Standards
          procedures. An electrician who usually works in England may not understand the
          completion certificate process or Building Warrant requirements.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Glasgow Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Glasgow has one of the UK's most distinctive housing stocks, dominated by sandstone
          tenements in the inner city and a wide range of villa and semi-detached properties in
          the suburbs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>West End tenements (1880s–1910s):</strong> Partick, Hyndland, Dowanhill,
                Hillhead, Kelvinside. Red or blonde sandstone, high ceilings (3 to 4 metres),
                shared sandstone stairwells, and original wiring in varying states. Many tenement
                flats have had piecemeal electrical additions over the decades with no coherent
                design. An EICR often finds circuits from two or three different eras.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Southside tenements and villas (1870s–1910s):</strong> Shawlands, Langside,
                Pollokshields, Govanhill, and Queen's Park. Mix of tenement flats and larger
                detached sandstone villas. Victorian villas in Pollokshields East and West often
                have substantial grounds and complex original layouts. Some have Category B listed
                building designation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inter-war semis and bungalows (1920s–1940s):</strong> Bearsden, Bishopbriggs,
                Newton Mearns, Clarkston. Rendered brick or harl construction. Accessible loft
                spaces and less challenging cable routes than sandstone properties. Many have
                original wiring approaching the end of its safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war council estates (1950s–1970s):</strong> Drumchapel, Easterhouse,
                Castlemilk, Pollok, and Cranhill. High-rise blocks, deck-access flats, and terraced
                houses. Plasterboard or concrete panel construction — the most straightforward to
                rewire. Many have outdated consumer units and aluminium wiring from 1970s upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted tenement flats:</strong> Throughout inner Glasgow. Quality of
                conversion varies considerably. Shared sub-mains, undersized consumer units, and
                wiring from different decades are common. Always obtain an EICR before scoping a
                rewire in a converted tenement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Glasgow Property Needs a Rewire',
    content: (
      <>
        <p>
          An{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> is the definitive
          way to confirm whether a rewire is needed. These warning signs indicate an urgent
          inspection is required:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fabric-covered or rubber-insulated wiring</strong> — pre-1960s wiring
                beyond its safe service life, very common in Glasgow's tenement stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aluminium wiring from the 1970s</strong> — installed in some Glasgow
                tenements as a cheaper alternative to copper. Connection failures and overheating
                risks require full replacement with copper conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board</strong> — wooden-backed board with wire fuses.
                No RCD protection and a serious fire and electric shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeatedly tripping circuit breakers</strong> — overloaded circuits or
                cable insulation that has deteriorated and can no longer safely carry load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or scorch marks near sockets</strong> — overheating
                connections are an immediate fire risk requiring emergency attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR with C1 or C2 observations</strong> — a qualified inspection has
                identified dangerous or potentially dangerous conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Rewire Take in Glasgow?',
    content: (
      <>
        <p>
          Glasgow rewire timescales are largely driven by property type. Sandstone tenement flats
          take longer per square metre than post-war properties due to harder walls and higher
          ceilings.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing sandstone walls, running cables through floor and ceiling voids, installing
              back boxes. In a West End tenement flat: 2–4 days. In a post-war semi: 1–2 days.
              Power is off during working hours. Significant dust and debris in sandstone properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting accessories, consumer unit, testing every circuit. In a Glasgow 3-bed: 2–3
              days. Power is restored progressively as circuits are completed. The EIC and Building
              Standards completion certificate are submitted at the end of second fix.
            </p>
          </div>
        </div>
        <p>
          Allow additional time if the tenement has shared electrical risers requiring coordination
          with other flat owners or the factors (property managers), or if SP Energy Networks need
          to be contacted for a supply upgrade — this can take 3 to 8 weeks to schedule.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in a Glasgow Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive Glasgow rewire quote should itemise every element. Single-figure quotes
          without a breakdown make it impossible to compare proposals.
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
                circuit, EIC, and Building Standards completion certificate submission.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Typically NOT included: making good (plastering sandstone chases, decoration), skip hire,
          supply upgrades via SP Energy Networks, and any Building Warrant application fee.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Glasgow Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'disruption',
    heading: 'Disruption and Replastering After a Glasgow Rewire',
    content: (
      <>
        <p>
          Rewiring a Glasgow tenement or sandstone villa is a significant undertaking. Planning
          accommodation, protecting belongings, and budgeting for making good are all essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sandstone chasing is noisy and dusty</strong> — angle grinding sandstone
                walls generates considerably more dust and debris than cutting modern plasterboard
                or brick. Plan to cover all furniture, seal off rooms, and expect cleaning
                throughout and after the first fix phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power is off during first fix</strong> — the electricity supply is
                isolated while new circuits are installed. Plan for no cooking, heating, or power
                for several days. Many Glasgow residents stay with friends or family during the
                first fix phase, particularly in smaller tenement flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replastering is a separate cost</strong> — after chases are filled, a
                plasterer is needed to reinstate the wall surfaces. In listed properties or where
                the original plaster is lime-based, a specialist is required. Budget £600 to
                £1,500 for making good in a West End tenement flat. Post-war properties with
                plasterboard: £200 to £500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared stairwells in tenements</strong> — if cables need to route through
                the common stairwell or across other flats' areas, coordination with fellow owners
                and the factors (property managers) may be required before work starts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Glasgow',
    content: (
      <>
        <p>
          Glasgow has a large and well-qualified electrician workforce. Use these criteria to find
          a reliable contractor experienced in Glasgow's distinctive housing stock:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or SELECT registration</strong> — SELECT is the
                Electrical Contractors Association of Scotland. Search by Glasgow postcode on
                any of these online registers. Non-negotiable for Building Standards compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about sandstone tenement experience</strong> — rewiring a West End
                sandstone flat is very different from rewiring a post-war semi. Ask for references
                from similar Glasgow properties before committing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm Scottish Building Standards knowledge</strong> — your electrician
                must understand the completion certificate process used in Scotland, not just the
                Part P process used in England.
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
                <strong>Confirm EIC and minimum £2 million public liability insurance</strong>
                {' '}— both are mandatory. Ask for copies before work starts.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage Glasgow rewire projects with Elec-Mate"
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

export default function RewireCostGlasgowPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Glasgow 2025 | Full Rewire Glasgow"
      description="How much does a house rewire cost in Glasgow in 2025? Real prices for tenement flats, semis, and period properties — Scottish Building Standards explained, sandstone replastering costs, and finding a NICEIC or SELECT-registered electrician in Glasgow."
      datePublished="2025-01-01"
      dateModified="2025-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Glasgow:{' '}
          <span className="text-yellow-400">2025 Price Guide</span>
        </>
      }
      heroSubtitle="Glasgow rewire costs in 2025 — from West End sandstone tenements and Victorian Southside villas to post-war estates. Scotland's Building Standards system explained, real prices by property type, and what rewiring a sandstone flat actually involves."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Quote Glasgow Rewires with Real Trade Pricing"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
