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
  { label: 'Rewire Cost Edinburgh', href: '/rewire-cost-edinburgh' },
];

const tocItems = [
  { id: 'edinburgh-pricing', label: 'Edinburgh Rewire Pricing' },
  { id: 'scottish-building-standards', label: 'Scottish Building Standards' },
  { id: 'property-types', label: 'Edinburgh Property Types' },
  { id: 'signs-rewire-needed', label: 'Signs a Rewire Is Needed' },
  { id: 'how-long', label: 'How Long Does It Take' },
  { id: 'whats-included', label: 'What Is Included in a Quote' },
  { id: 'disruption', label: 'Disruption and Replastering' },
  { id: 'find-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "A full house rewire in Edinburgh costs between £2,800 and £9,000+ in 2025. Edinburgh electrician day rates of £320 to £450 are above the Scottish average, reflecting the capital's higher cost of living and property values.",
  "Scotland operates its own Building Standards system — Edinburgh rewires are notified to the City of Edinburgh Council's Building Standards department, not under Part P as in England. The process is similar but uses Scottish warrant procedures.",
  "Edinburgh's New Town Georgian terraces, Old Town tenements, and Victorian villas in Morningside and Marchmont are complex to rewire due to sandstone construction, high ceilings, and listed building designations in many areas.",
  'A typical rewire takes 3–5 days for a 2-bed property and 5–8 days for a 3-bed. Wall chasing in sandstone Edinburgh properties generates significant debris, and replastering is a separate cost.',
  'On completion of any rewire in Scotland, the electrician must issue an Electrical Installation Certificate confirming compliance with BS 7671:2018+A3:2024 and submit a completion certificate to Building Standards.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Edinburgh in 2025?',
    answer:
      "A full rewire in Edinburgh in 2025 typically costs £2,800–£4,500 for a 2-bed flat or terraced house, £4,000–£6,500 for a 3-bed semi-detached, and £5,500–£9,000 for a 4-bed detached property. Edinburgh prices are above the Scottish average and slightly above the England average outside London, driven by higher electrician day rates (£320 to £450) and the complexity of the city's Georgian and Victorian housing stock with solid sandstone walls.",
  },
  {
    question: 'Do I need Building Warrant approval for a rewire in Edinburgh?',
    answer:
      'In Scotland, electrical rewiring that involves alterations to fixed electrical installations typically requires notification under the Building (Scotland) Regulations 2004. Unlike England, Scotland does not use Part P or competent person schemes in the same way — instead, the electrician submits a completion certificate to City of Edinburgh Council Building Standards on completion. Your electrician should be familiar with Scottish Building Standards procedures and will advise you on the notification requirements for your specific project.',
  },
  {
    question: 'How long does a rewire take in an Edinburgh New Town flat?',
    answer:
      'An Edinburgh New Town Georgian flat typically takes 4 to 7 working days to rewire. New Town properties have extremely high ceilings (3.5 to 4.5 metres), solid sandstone walls with no cavity, ornate cornicing, and listed building status that restricts surface cable routing. First fix — chasing the sandstone, running cables, fitting back boxes — takes 3 to 5 days. Second fix — fitting accessories, consumer unit, testing — takes 1 to 2 days. Victorian stone-built properties in Marchmont, Morningside, and Bruntsfield take similar time.',
  },
  {
    question: 'What are the signs my Edinburgh property needs a rewire?',
    answer:
      'Key warning signs include: old rubber or fabric-covered wiring (common in Edinburgh tenements built before the 1960s), a wooden-backed rewirable fuse board with wire fuses, sockets or switches that feel warm or show scorch marks, circuit breakers that trip repeatedly or fuses that blow frequently, a burning smell from outlets or the consumer unit, and no earth connection at sockets. An EICR carried out by a qualified electrician will confirm whether a full or partial rewire is needed.',
  },
  {
    question: 'Are Edinburgh New Town properties listed, and how does this affect rewiring?',
    answer:
      'Much of the Edinburgh New Town is a UNESCO World Heritage Site and many individual buildings are Category A or B listed. Listed building status in Scotland (under the Historic Environment Scotland system) means any works affecting the character of the building require Listed Building Consent from City of Edinburgh Council. Internally, rewiring chases in sandstone walls are often acceptable, but surface cable routes and any external works require careful negotiation with the planning authority. Your electrician should flag potential listed building issues before starting work.',
  },
  {
    question: 'What does a full Edinburgh rewire include?',
    answer:
      'A comprehensive Edinburgh rewire quote should include: new consumer unit (metal enclosure with RCBOs or dual-RCD arrangement and SPD), all circuit cables (twin and earth for ring finals, radials, lighting, cooker, shower, immersion heater), all accessories (sockets, switches, ceiling roses), earthing and bonding conductors, initial verification testing of every circuit, and an Electrical Installation Certificate. Making good (plastering sandstone chases), skip hire, and any supply upgrade via SP Energy Networks are typically excluded and priced separately.',
  },
  {
    question: 'How much does replastering cost after an Edinburgh rewire?',
    answer:
      'Replastering costs after a full Edinburgh rewire depend on the property type and number of chases. In a New Town flat with solid sandstone walls, expect to budget £800 to £2,000 for making good, as sandstone requires specialist lime-based plasters and the chases may be deeper than in brick or plasterboard construction. Victorian stone-built villas in Marchmont or Morningside are similar. Post-war flats and houses with plasterboard walls cost less — typically £300 to £700 for making good.',
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
    href: '/rewire-cost-glasgow',
    title: 'Rewire Cost Glasgow',
    description: 'Glasgow rewire costs — how they compare with Edinburgh prices.',
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
    id: 'edinburgh-pricing',
    heading: 'Edinburgh Rewire Pricing (2025)',
    content: (
      <>
        <p>
          Edinburgh is the most expensive Scottish city for electrical work, with electrician day
          rates of £320 to £450 reflecting higher living costs, the capital's competitive labour
          market, and the complexity of the city's older housing stock. Prices are slightly above
          the England average outside London, partly due to the difficulties of working in
          Edinburgh's distinctive sandstone tenements and Georgian terraces.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Edinburgh Rewire Costs by Property Type (2025)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>1–2 bed flat (tenement or purpose-built):</strong> £2,800–£4,500 (3–5 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>3-bed semi-detached or villa:</strong> £4,000–£6,500 (5–8 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>4-bed detached:</strong> £5,500–£9,000 (7–11 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large stone-built villa (5-bed+):</strong> £9,000–£15,000+ (11–16 days)
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
          , and Building Standards completion certificate submission. Making good (plastering and
          decoration) is quoted separately — budget an additional £800 to £2,000 for a sandstone New
          Town flat, and £400 to £1,000 for a post-war property.
        </p>
      </>
    ),
  },
  {
    id: 'scottish-building-standards',
    heading: 'Scottish Building Standards — How Edinburgh Rewires Are Regulated',
    content: (
      <>
        <p>
          Scotland operates a separate Building Standards system from England and Wales. Edinburgh
          rewires are governed by the Building (Scotland) Regulations 2004, administered by City of
          Edinburgh Council Building Standards. There is no Part P equivalent in Scotland — instead,
          the regulatory process works as follows:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Warrant</strong> — significant electrical work (full rewires, major
                alterations to fixed installations) may require a building warrant from City of
                Edinburgh Council before work starts. Your electrician will advise whether a warrant
                is needed for your specific project.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion Certificate</strong> — on completion, the electrician (or the
                building owner) submits a completion certificate to Building Standards confirming
                the work meets the requirements of the Building (Scotland) Regulations. Building
                Standards may inspect the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — despite Scotland's separate regulatory system,
                the technical standard for electrical installations is still BS 7671:2018+A3:2024
                (the IET Wiring Regulations). An EIC is issued on completion in the same way as in
                England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — Edinburgh has an exceptionally high number of
                Category A and B listed buildings (Historic Environment Scotland designations).
                Additional consents may be required for works affecting the character of a listed
                building, separate from the Building Standards process.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always use an Edinburgh-based electrician familiar with Scottish Building Standards
          procedures. An electrician who normally works in England may not be aware of the
          differences in notification and completion certification requirements.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Edinburgh Property Types That Need Rewiring',
    content: (
      <>
        <p>
          Edinburgh's housing stock is architecturally distinctive and presents specific rewire
          challenges that differ markedly from other UK cities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New Town Georgian flats (1770s–1840s):</strong> Stockbridge, the West End,
                and the New Town itself. Extremely high ceilings (3.5 to 4.5 metres), solid
                sandstone walls with no cavity, ornate plasterwork cornicing and ceiling roses, and
                Category A listing in most cases. The most complex and expensive Edinburgh
                properties to rewire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian stone tenements (1860s–1900s):</strong> Marchmont, Bruntsfield,
                Dalry, Leith, and Gorgie. Solid sandstone construction with shared stairwells. Many
                tenement flats retain original wiring in poor condition, sometimes with aluminium
                conductors from 1970s upgrades. Communal areas require coordination with the factors
                (property management companies) common in Scottish tenement ownership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian villas and semis (1880s–1910s):</strong> Morningside, Newington,
                Grange, and Trinity. Stone-built with plaster on lathe or stone directly. Accessible
                loft spaces and generally more straightforward cable routes than tenements, but
                solid external walls remain a challenge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s–1960s semis and bungalows:</strong> Corstorphine, Liberton,
                Portobello, and Sighthill. Cavity brick construction — lighter and faster to rewire
                than stone properties. Many have VIR wiring approaching the end of its service life
                or early PVC wiring with no earthing on lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war estates (1960s–1980s):</strong> Craigmillar, Wester Hailes,
                Oxgangs, and Clermiston. Plasterboard or large-panel construction — the most
                straightforward to rewire. Consumer units often have BS 3036 rewirable fuses or
                early single-RCD boards.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-rewire-needed',
    heading: 'Signs Your Edinburgh Property Needs a Rewire',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is the
          definitive method to confirm rewire need. These warning signs indicate an inspection is
          urgent:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fabric-covered or rubber-insulated wiring</strong> — pre-1960s wiring beyond
                its safe service life, extremely common in Edinburgh tenements and Victorian villas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aluminium wiring from the 1970s</strong> — some Edinburgh properties were
                rewired using aluminium conductors in the 1960s and 1970s. These require full
                replacement with copper due to connection failure risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board</strong> — wooden-backed board with wire fuses. No RCD
                protection — a serious fire and electric shock risk.
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
                connections represent an immediate fire risk.
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
    heading: 'How Long Does a Rewire Take in Edinburgh?',
    content: (
      <>
        <p>
          Edinburgh rewire timescales are typically longer than properties of equivalent size in
          other UK cities, due to the city's predominance of solid sandstone construction and the
          complexity of high-ceilinged Georgian and Victorian properties.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">First Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Chasing sandstone walls, running cables, installing back boxes. The hardest phase
              physically — sandstone is harder to chase than brick or plasterboard and generates
              considerable debris. In a New Town Georgian flat: 3–5 days. In a Victorian terrace
              villa: 2–4 days. Power is off during working hours.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Second Fix</h3>
            <p className="text-white text-sm leading-relaxed">
              Fitting accessories, connecting the consumer unit, testing every circuit. In an
              Edinburgh 3-bed: 2–3 days. Power is restored progressively as circuits are completed.
              The EIC and Building Standards completion certificate are submitted at the end of
              second fix.
            </p>
          </div>
        </div>
        <p>
          Allow additional time if the property has original lead-encased wiring with cloth
          insulation (occasionally found in pre-1930 Edinburgh buildings), or if Listed Building
          Consent is required for any aspect of the work before starting.
        </p>
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in an Edinburgh Rewire Quote',
    content: (
      <>
        <p>
          A comprehensive Edinburgh rewire quote should itemise every element. Be cautious of
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
                connection units. Standard white plastic is included; upgraded finishes are extra.
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
                Building Standards completion certificate submission.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Typically NOT included: making good (plastering sandstone chases, decoration), skip hire,
          any supply upgrade via SP Energy Networks (the Edinburgh DNO), and any Building Warrant
          application fee.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for Edinburgh Rewire Quotes"
          description="Electricians: describe the job and get a detailed rewire quote with materials breakdown, cable quantities, labour hours, and profit margin from real UK trade pricing data."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'disruption',
    heading: 'Disruption and Replastering After an Edinburgh Rewire',
    content: (
      <>
        <p>
          Rewiring an Edinburgh property — particularly a stone-built tenement flat or Victorian
          villa — involves significant disruption. Understanding what to expect is essential for
          planning accommodation and the full project budget.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sandstone chasing is extremely dusty</strong> — cutting channels in
                sandstone walls with an angle grinder or chasing tool produces much more debris than
                brick or plasterboard. Plan to seal off rooms and cover all furniture.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power is off during first fix</strong> — the supply is isolated for extended
                periods. Many Edinburgh residents stay elsewhere during the first fix phase,
                particularly in smaller flats where space to escape the dust is limited.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replastering requires lime-based products</strong> — in Category A or B
                listed properties, heritage lime plaster must be used to match the original finish.
                This is specialist work and more expensive than standard plastering. Budget £800 to
                £2,000 for making good in a New Town flat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cornicing and ceiling roses must be preserved</strong> — in Georgian
                properties with ornate plasterwork, the electrician must work carefully around
                ceiling roses and cornicing. Damage to listed plasterwork can require specialist
                restoration at significant cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-electrician',
    heading: 'Finding a Qualified Electrician in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh has a strong pool of qualified electricians, but experience with the city's
          distinctive housing stock — sandstone tenements, Georgian flats, and listed buildings —
          varies considerably.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify NICEIC, NAPIT, or SELECT registration</strong> — SELECT is the
                Scottish electrical contractor trade association. Search by Edinburgh postcode on
                any of these registers. Non-negotiable for Building Standards compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about sandstone and listed building experience</strong> — rewiring a New
                Town Georgian flat requires specific expertise. Ask for references from similar
                Edinburgh properties, particularly if your flat is listed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm Scottish Building Standards knowledge</strong> — your electrician
                must be familiar with the completion certificate process used in Scotland, not just
                the Part P process used in England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three comparable quotes</strong> — ensure each quote specifies the
                consumer unit type, number of circuits, and whether making good is included. Quotes
                vary significantly for Edinburgh stone properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm EIC is included</strong> — the Electrical Installation Certificate
                is mandatory on completion of any rewire regardless of whether it is in Scotland or
                England.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage Edinburgh rewire projects with Elec-Mate"
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

export default function RewireCostEdinburghPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Edinburgh 2025 | Rewire Prices Scotland"
      description="How much does a house rewire cost in Edinburgh in 2025? Real prices for flats, semis, and period properties — Scottish Building Standards explained, sandstone replastering costs, listed buildings, and finding a qualified Edinburgh electrician."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Edinburgh:{' '}
          <span className="text-yellow-400">2025 Scotland Price Guide</span>
        </>
      }
      heroSubtitle="Edinburgh rewire costs in 2025 — from New Town Georgian flats and Victorian sandstone tenements to post-war semis. Scotland's Building Standards system explained, real prices by property type, and what sandstone rewiring actually involves."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Rewire Costs in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Quote Edinburgh Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered rewire quoting, on-site EIC certificates, and project management. 7-day free trial."
    />
  );
}
