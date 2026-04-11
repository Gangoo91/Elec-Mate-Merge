import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Landmark,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Home,
  Paintbrush,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Listed Building Rewire Cost', href: '/guides/listed-building-rewire-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Why Listed Buildings Need Special Consideration' },
  { id: 'cost-ranges', label: 'Cost Ranges and What Drives Them' },
  { id: 'conservation-officer', label: 'Conservation Officer and Listed Building Consent' },
  { id: 'installation-methods', label: 'Surface Mount and Concealed Methods' },
  { id: 'heritage-accessories', label: 'Heritage Accessories and Period Fittings' },
  { id: 'lime-plaster', label: 'Lime Plaster, Lath, and Historic Fabric' },
  { id: 'regulations', label: 'Regulations and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Listed Building Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Rewiring a listed building in the UK typically costs £8,000 to £25,000 or more, depending on building size, grade of listing, installation method, and the extent of making good required.',
  'Listed Building Consent (LBC) is required before any work that alters the character of a listed building. This includes chasing walls, lifting floorboards, and installing new containment routes. Work without LBC is a criminal offence.',
  'Surface-mounted wiring on period-appropriate clips, mini trunking painted to match, or routing through existing voids are the primary methods used to minimise damage to historic fabric.',
  'Heritage accessories — period light switches, socket outlets in brass or bakelite finishes — add £30 to £80 per point over standard accessories but are often required to satisfy the conservation officer.',
  'Lime plaster repairs must be done with lime-based materials, not modern gypsum plaster. Allow £40 to £80 per square metre for specialist lime plaster making good.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a listed building in 2026?',
    answer:
      'Rewiring a listed building in 2026 typically costs £8,000 to £25,000 or more. A Grade II listed 3-bedroom cottage with straightforward access and surface-mount wiring might cost £8,000 to £12,000. A Grade I or Grade II* listed property with lath and plaster walls, ornate plasterwork, and strict conservation requirements could cost £18,000 to £25,000 or significantly more. The cost premium over a standard domestic rewire is typically 40% to 100% due to the specialist methods, heritage accessories, and making good requirements.',
  },
  {
    question: 'Do I need Listed Building Consent to rewire a listed building?',
    answer:
      'Yes. Any work that alters the character of a listed building requires Listed Building Consent (LBC) from the local planning authority. This includes chasing walls, lifting original floorboards, drilling through structural timbers, and installing surface-mounted containment. Carrying out work without LBC is a criminal offence under the Planning (Listed Buildings and Conservation Areas) Act 1990, punishable by an unlimited fine or imprisonment. Always consult the conservation officer before starting any electrical work.',
  },
  {
    question: 'Can you chase walls in a listed building?',
    answer:
      'Chasing walls in a listed building is generally not permitted, particularly where the walls have historic lime plaster, original render, or decorative plasterwork. The conservation officer will typically require surface-mounted wiring, routing through existing floor and ceiling voids, or concealment behind skirting boards and architraves. Where limited chasing is agreed, it must be done by hand (not with a mechanical chaser) and made good with lime plaster to match the existing finish.',
  },
  {
    question: 'What type of wiring is used in listed buildings?',
    answer:
      'The wiring method depends on the conservation requirements. Options include surface-mounted PVC cable on period-style clips (the cheapest option), surface-mounted mini trunking painted to match the wall colour, MICC (mineral-insulated copper-clad) cable which has a slim profile and can be painted, and concealed wiring routed through existing voids behind floorboards and above ceilings. The conservation officer will advise which methods are acceptable for the specific building.',
  },
  {
    question: 'What are heritage electrical accessories?',
    answer:
      'Heritage electrical accessories are light switches, socket outlets, and other wiring accessories designed to complement period properties. They are typically available in brass, antique brass, bronze, nickel, and bakelite-style finishes. Manufacturers such as Forbes & Lomax, Hamilton, and Jim Lawrence offer ranges specifically designed for listed buildings. Costs range from £30 to £80 per accessory compared to £3 to £8 for standard white plastic accessories. Toggle switches, dolly switches, and period-style round-pin sockets are popular choices.',
  },
  {
    question: 'Do I need a specialist electrician for a listed building?',
    answer:
      'Whilst there is no formal specialist qualification, you should use an electrician with proven experience of working on listed buildings. They need to understand the sensitivities of historic fabric, the requirements of conservation officers, and the techniques for routing cables without damaging original features. Ask for references from previous listed building projects. Some conservation officers maintain lists of approved contractors, and heritage organisations such as the SPAB (Society for the Protection of Ancient Buildings) can provide guidance.',
  },
  {
    question: 'How long does a listed building rewire take?',
    answer:
      'A listed building rewire takes significantly longer than a standard domestic rewire. Allow 3 to 6 weeks for a 3-bedroom listed cottage, compared to 1 to 2 weeks for an equivalent non-listed property. The additional time is required for careful routing of cables, surface-mount installation, working around original features, and the specialist making good that follows. If lime plaster repairs are extensive, additional drying time of 2 to 4 weeks may be needed before final decoration.',
  },
  {
    question: 'Can I install an EV charger on a listed building?',
    answer:
      'EV charger installation on a listed building requires Listed Building Consent if it affects the external appearance of the building. The conservation officer may require the charger to be positioned on a less prominent elevation, concealed behind landscaping, or mounted on a separate post rather than the building itself. The electrical supply work (cable routing, distribution board modifications) also needs careful consideration to avoid damage to historic fabric. Budget an additional £500 to £1,500 over the standard EV charger installation cost for the heritage-sensitive approach.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description: 'Standard domestic rewire costs for comparison.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Consumer unit costs that form part of any rewire project.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote heritage electrical work with itemised materials and specialist rates.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Listed Buildings Need Special Consideration',
    content: (
      <>
        <p>
          Rewiring a listed building is one of the most demanding jobs an electrician can undertake.
          The building's historic fabric — original plasterwork, timber framing, lime renders,
          decorative features — must be preserved whilst bringing the electrical installation up to
          modern safety standards.
        </p>
        <p>
          There are approximately 500,000 listed buildings in England and Wales, graded I, II*, or
          II depending on their significance. Grade II buildings (92% of all listings) have the
          least restrictive requirements, whilst Grade I buildings require the highest level of care
          and often the most expensive installation methods.
        </p>
        <p>
          The cost premium for rewiring a listed building over a standard domestic rewire is
          typically 40% to 100%. This premium reflects the specialist installation methods,
          heritage-appropriate accessories, conservation officer liaison, and the extensive making
          good required after the electrical work is complete.
        </p>
      </>
    ),
  },
  {
    id: 'cost-ranges',
    heading: 'Cost Ranges and What Drives Them',
    content: (
      <>
        <p>
          Listed building rewire costs vary enormously depending on the property size, grade of
          listing, conservation requirements, and the condition of the existing installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Cost Ranges (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade II 2-bed cottage</strong> — £8,000 to £12,000. Surface-mount wiring
                with period clips, basic heritage accessories, standard consumer unit with RCBOs and
                SPD, lime plaster making good to disturbed areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade II 4-bed period house</strong> — £14,000 to £20,000. Combination of
                surface-mount and concealed wiring through floor voids, heritage brass accessories
                throughout, larger consumer unit, making good to lime plaster and decorative
                cornicing, multiple lighting circuits with dimming.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade I / II* large property</strong> — £20,000 to £25,000+. Extensive
                conservation requirements, bespoke heritage accessories, MICC cable in sensitive
                areas, specialist lime plaster restoration, archaeologist or conservation specialist
                attendance, extended programme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These costs include materials, labour, heritage accessories, making good, consumer unit,
          testing, and the EIC. They do not include decoration after making good, which is typically
          the client's responsibility.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-officer',
    heading: 'Conservation Officer and Listed Building Consent',
    content: (
      <>
        <p>
          Before any electrical work begins on a listed building, the conservation officer at the
          local planning authority must be consulted. Listed Building Consent (LBC) is a legal
          requirement for any work that alters the character of a listed building — and this
          includes most rewiring work.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            What Requires Listed Building Consent
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Chasing walls for cable routes — even minor chasing can damage historic plaster and
                is almost always controlled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Lifting original floorboards — original boards may have archaeological or
                architectural significance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Drilling through structural timbers — joists, beams, and purlins in timber-framed
                buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Installing surface-mounted containment — visible trunking or conduit alters the
                building's appearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Installing a new consumer unit — the position and visibility of the board may be
                controlled.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Working without LBC is a criminal offence under the Planning (Listed Buildings and
          Conservation Areas) Act 1990. The penalty is an unlimited fine or up to 2 years
          imprisonment. As the electrician, you share responsibility — do not start work until
          consent is confirmed in writing.
        </p>
      </>
    ),
  },
  {
    id: 'installation-methods',
    heading: 'Surface Mount and Concealed Methods',
    content: (
      <>
        <p>
          The wiring method is the single biggest factor in the cost and complexity of a listed
          building rewire. The conservation officer will typically specify or approve the method for
          each area of the building.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mount on period clips</strong> — Round PVC or lead-sheathed cable
                fixed with brass or black japanned clips. The cheapest method at £8 to £15 per metre
                but the most visible. Acceptable in utility areas and less significant rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mini trunking painted to match</strong> — Small-section PVC trunking (16mm x
                16mm or similar) fixed to the surface and painted to match the wall colour. £12 to
                £20 per metre installed. A practical compromise between visibility and access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MICC (mineral-insulated) cable</strong> — Slim profile, can be surface
                mounted or buried in shallow chases. Paintable. £25 to £45 per metre installed.
                Excellent fire performance. More expensive and requires specialist termination
                skills.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concealed through existing voids</strong> — Routing cables through floor
                voids, above ceilings, behind skirting boards and architraves, and through existing
                conduit runs. The least visually intrusive but the most labour-intensive. Costs vary
                significantly depending on access.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'heritage-accessories',
    heading: 'Heritage Accessories and Period Fittings',
    content: (
      <>
        <p>
          Standard white plastic socket outlets and light switches are rarely acceptable in a listed
          building. The conservation officer will typically require accessories that complement the
          building's period and character.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Switches and Dimmers</h3>
            <p className="text-white text-sm leading-relaxed">
              Period toggle switches (£30 to £60 each), dolly switches (£40 to £70), rotary dimmers
              in brass or bronze (£50 to £80). Manufacturers: Forbes and Lomax, Hamilton Litestat,
              Jim Lawrence. Lead times of 2 to 6 weeks for non-stock items.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Socket Outlets</h3>
            <p className="text-white text-sm leading-relaxed">
              Brass or bronze double socket outlets (£35 to £65 each). Unswitched variants for a
              cleaner look (£30 to £55). USB-integrated sockets in heritage finishes (£50 to £80).
              Round-pin sockets for table lamps in period rooms (£40 to £70).
            </p>
          </div>
        </div>
        <p>
          Heritage accessories for a typical 3-bedroom listed property add £1,500 to £3,500 to the
          rewire cost — but attempting to use standard white accessories will almost certainly be
          rejected by the conservation officer, causing costly delays and rework.
        </p>
      </>
    ),
  },
  {
    id: 'lime-plaster',
    heading: 'Lime Plaster, Lath, and Historic Fabric',
    content: (
      <>
        <p>
          Making good after electrical work in a listed building is a specialist task. Original lime
          plaster, lath and plaster ceilings, and decorative plasterwork must be repaired with
          compatible materials — not modern gypsum-based products.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Paintbrush className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lime plaster repairs</strong> — £40 to £80 per square metre for a specialist
                plasterer using lime putty or hydraulic lime. Multiple coats with drying time
                between each. Budget 2 to 4 weeks drying time before decoration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Paintbrush className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lath and plaster ceiling repairs</strong> — £60 to £120 per square metre
                where ceiling lath has been disturbed. New lath must be oak or chestnut (not
                softwood) in many Grade I and II* buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Paintbrush className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Decorative plasterwork</strong> — Cornices, ceiling roses, and mouldings
                damaged during cable routing may require specialist repair at £80 to £200 per linear
                metre depending on complexity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As the electrician, you may not be responsible for the making good itself, but you must
          include it in your advice to the client and factor any coordination time into your quote.
          Many clients are unaware of the making good costs until they receive the plasterer's
          quotation.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Certification',
    content: (
      <>
        <p>
          Listed building rewires must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          in addition to the Planning (Listed Buildings and Conservation Areas) Act 1990. There is
          no exemption from electrical safety standards for listed buildings.
        </p>
        <p>
          The work is notifiable under Part P of the Building Regulations (it is a full rewire in a
          domestic dwelling). The electrician must be registered with a competent person scheme or
          the work must be inspected by Building Control.
        </p>
        <p>
          An Electrical Installation Certificate (EIC) must be issued on completion. RCD protection
          is required per Regulation 411.3.3 of BS 7671 — the listed status of the building does not
          provide an exemption from RCD requirements.
        </p>
        <p>
          Where the conservation officer's requirements conflict with BS 7671 recommendations (not
          regulations), a pragmatic approach is usually possible. For example, where surface-mount
          wiring is not visually acceptable but chasing is not permitted, routing through floor
          voids may satisfy both the conservation officer and the wiring regulations.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Listed Building Work',
    content: (
      <>
        <p>
          Listed building rewires are specialist work that commands premium rates. Here are
          practical tips for pricing these projects profitably:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Landmark className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey with the Conservation Officer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before quoting, attend a joint survey with the conservation officer and the
                  client. Agree the wiring method for each area of the building in writing. This
                  prevents costly changes after work has started.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Price the Unknowns</h4>
                <p className="text-white text-sm leading-relaxed">
                  Listed buildings always have surprises — hidden voids that do not go where
                  expected, original wiring that cannot be extracted without damage, plasterwork
                  that crumbles when disturbed. Add 15% to 20% contingency over your standard rates
                  and explain this to the client upfront.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Photographic Record</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph every stage of the work — before, during, and after. The conservation
                  officer may request evidence that the work was carried out in accordance with the
                  agreed method. Use Elec-Mate to attach site photos to your{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> and generate
                  a visual record of the installation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote listed building rewires with heritage pricing"
          description="Elec-Mate's quoting app handles specialist rates for heritage accessories, surface-mount installation methods, and making good allowances. Professional PDF quotes that demonstrate your expertise."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ListedBuildingRewireCostPage() {
  return (
    <GuideTemplate
      title="Listed Building Rewire Cost 2026 | UK Heritage Electrical Guide"
      description="How much does it cost to rewire a listed building in 2026? UK guide covering conservation officer requirements, surface mount wiring, heritage accessories, lime plaster, and realistic costs from £8,000 to £25,000+."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Listed Building Rewire Cost:{' '}
          <span className="text-yellow-400">UK Heritage Guide 2026</span>
        </>
      }
      heroSubtitle="What does it cost to rewire a listed building? This guide covers conservation officer requirements, surface-mount and concealed wiring methods, heritage accessories, lime plaster making good, and realistic pricing from £8,000 to £25,000+ — for homeowners and electricians."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Listed Building Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Heritage Electrical Work with Confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for specialist quoting, on-site EIC certificates, and photographic records of heritage installations. 7-day free trial."
    />
  );
}
