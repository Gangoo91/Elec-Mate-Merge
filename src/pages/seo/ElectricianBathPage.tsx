import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Building2,
  Landmark,
  GraduationCap,
  ClipboardCheck,
  Flame,
  ThermometerSun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Location Guides', href: '/guides/electrician-near-me' },
  { label: 'Bath', href: '/guides/electrician-bath' },
];

const tocItems = [
  { id: 'overview', label: 'Electrical Work in Bath' },
  { id: 'dno', label: 'NGED as DNO' },
  { id: 'unesco-conservation', label: 'UNESCO World Heritage & Conservation' },
  { id: 'georgian-rewiring', label: 'Georgian Townhouse Rewiring' },
  { id: 'bath-stone', label: 'Bath Stone Properties' },
  { id: 'underfloor-heating', label: 'Underfloor Heating in Listed Buildings' },
  { id: 'pricing', label: 'Pricing Guide' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Bath is served by National Grid Electricity Distribution (NGED, formerly Western Power Distribution) as the Distribution Network Operator. All new connections, service upgrades, and G98/G99 notifications go through NGED South West.',
  'Bath is a UNESCO World Heritage Site — the only entire city in the UK with this status. Conservation controls are among the strictest in the country, and Listed Building Consent is required for virtually any electrical alteration that affects the character of a listed building.',
  'Georgian townhouse rewiring in Bath requires exceptional care. The city is defined by its Palladian and Georgian architecture — the Royal Crescent, the Circus, Lansdown Crescent — where original plasterwork, cornicing, and joinery are protected. Cable routes must be completely concealed without damaging original fabric.',
  'Bath stone (a honey-coloured oolitic limestone) is the defining building material but is extremely soft and porous. Never chase into Bath stone — it will crumble. All cable penetrations must go through mortar joints, and external fixings require non-ferrous screws to prevent iron staining.',
  'Electric underfloor heating is increasingly popular in Bath listed buildings where radiators are inappropriate, but installation requires Listed Building Consent and careful design to avoid damaging original stone or timber floors.',
];

const faqs = [
  {
    question: 'Who is the DNO for Bath?',
    answer:
      'National Grid Electricity Distribution (NGED), formerly known as Western Power Distribution (WPD), is the Distribution Network Operator for Bath and the surrounding area. NGED manages the electricity distribution network from 132kV down to 230V under the South West licence area. All new connections, disconnections, service upgrades, meter relocations, and G98/G99 notifications for solar PV, battery storage, or EV charger installations must go through NGED. Their connections portal handles applications online. The NGED South West region covers Somerset, Devon, Cornwall, Dorset, and parts of Wiltshire and Gloucestershire. Note that the name changed from WPD to NGED in 2024 following the National Grid acquisition — some local paperwork and meter labels may still show WPD.',
  },
  {
    question: 'How strict are conservation controls in Bath?',
    answer:
      'Bath has the strictest conservation controls of any city in the UK. As a UNESCO World Heritage Site, the entire city centre and many surrounding areas are subject to rigorous planning control. Bath and North East Somerset Council (BANES) has a dedicated conservation team that actively enforces. Listed Building Consent is required for any work that alters the character of a listed building — in Bath, this includes surface-mounted trunking or conduit on any original wall, chasing into original plaster (Bath lime plaster is historically significant in its own right), relocating meters or consumer units where visible externally, any external cable routes or fixings, and even the style of light switches and socket outlets in significant rooms. Applications take 8 to 12 weeks minimum. For Grade I buildings (and Bath has many), Historic England consultation extends this further. The key principle is that Bath must look like Bath — anything that detracts from the Georgian or Roman character will be refused.',
  },
  {
    question: 'Can I install solar panels in Bath?',
    answer:
      'Solar PV installation in Bath is heavily restricted by conservation and heritage controls. Within the World Heritage Site, solar panels on any listed building require Listed Building Consent, which is frequently refused for street-facing roof slopes. Panels on rear roof slopes may be approved if they are not visible from any public viewpoint. In the wider conservation area, solar panels require planning permission rather than benefiting from permitted development rights. BANES has specific guidance on solar panels within the World Heritage Site — consult this before quoting any solar work. For properties outside the conservation areas (Twerton, Weston, Odd Down), standard permitted development rights apply. When solar PV is approved, G98/G99 notification to NGED is still required.',
  },
  {
    question: 'How much does a Georgian townhouse rewire cost in Bath?',
    answer:
      'A full rewire of a Georgian townhouse in Bath is one of the most expensive domestic electrical jobs in the UK outside London. A typical 3-storey Georgian terraced house (3 to 4 bedrooms) costs £7,000 to £14,000 to rewire, depending on the level of heritage constraint. The premium over a standard rewire reflects several factors: the need for completely concealed cable routing through narrow Georgian floor voids and behind original joinery; the prohibition on chasing into original lime plaster or Bath stone; the requirement for heritage-style accessories (brass or period switches and sockets); the slower pace of work required to protect original cornicing, panelling, and plasterwork; and the potential need for a specialist heritage plasterer to make good after electrical work. The iconic properties — Royal Crescent, the Circus, Lansdown Crescent — are at the very top of this range. Always survey thoroughly and quote specifically — there is no standard price for Bath heritage work.',
  },
  {
    question: 'What is the demand for electricians in Bath?',
    answer:
      'Bath has strong demand for skilled electricians, particularly those with heritage and conservation experience. The domestic market is driven by the ongoing need to rewire and upgrade the Georgian, Victorian, and Edwardian housing stock, much of which is listed. The tourism and hospitality sector — Bath has over 80 hotels and 200+ restaurants — requires regular EICR inspections, emergency lighting, and fire alarm maintenance. The University of Bath and Bath Spa University generate institutional electrical work. Commercial demand comes from the growing business and technology sectors at Bath Quays and the Enterprise Zone. The combination of heritage skill requirements and strong demand means that electricians who can work competently on listed buildings are in short supply and can command premium rates.',
  },
  {
    question: 'Do landlords in Bath need an EICR?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Bath to have the electrical installation inspected and tested at least every 5 years (or at the start of each new tenancy), and to provide a valid Electrical Installation Condition Report (EICR) to tenants and to Bath and North East Somerset Council on request. The inspection must be carried out by a qualified and competent person. If the report is Unsatisfactory, the landlord must arrange all remedial work within 28 days (or sooner if specified). Bath properties — particularly Georgian and Victorian lettings — frequently receive C2 observations due to the age of wiring, absence of RCD protection, and inadequate earthing. HMOs in the student areas (Oldfield Park, Westmoreland) face additional licensing conditions on top of the EICR requirement.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete EICRs on site for listed buildings, hospitality premises, and landlord compliance in Bath.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for Georgian townhouse rewires and underfloor heating installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for rewires and new circuits in listed properties.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-guide',
    title: 'EICR Guide',
    description:
      'Complete guide to EICRs — inspection intervals, coding, and commercial requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote heritage rewires and commercial maintenance with professional itemised PDFs.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrical Work in Bath: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Bath is unique in the UK. As the only entire city designated a UNESCO World Heritage Site,
          it presents the most challenging conservation environment for electrical work anywhere in
          the country. The city's defining Georgian architecture — the Royal Crescent, the Circus,
          Pulteney Bridge, the Assembly Rooms — sets the standard that conservation officers enforce
          across thousands of listed properties.
        </p>
        <p>
          For electricians, Bath is both a challenge and an opportunity. The heritage constraints
          mean that electrical work takes longer, requires more skill, and costs more. But it also
          means that electricians who develop genuine heritage competence can command premium rates
          and build a reputation that generates consistent referral work from architects,
          conservation officers, and property owners.
        </p>
        <p>
          Beyond the heritage market, Bath has a thriving tourism and hospitality sector, two
          universities, and growing commercial development at Bath Quays and the Enterprise Zone.
          This guide covers the DNO, UNESCO and conservation requirements, Georgian rewiring
          techniques, Bath stone considerations, underfloor heating in listed buildings, and
          realistic pricing.
        </p>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'National Grid Electricity Distribution: Your DNO in Bath',
    content: (
      <>
        <p>
          Bath and the surrounding area are served by{' '}
          <strong>National Grid Electricity Distribution (NGED)</strong>, formerly Western Power
          Distribution (WPD). NGED manages the distribution network from 132kV down to the 230V
          supply at properties under the South West licence area.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key DNO Information for Bath</h3>
          <div className="space-y-3 text-white text-sm leading-relaxed">
            <p>
              <strong>DNO:</strong> National Grid Electricity Distribution (South West) — formerly
              Western Power Distribution
            </p>
            <p>
              <strong>MPAN prefix:</strong> 22 (South West region)
            </p>
            <p>
              <strong>New connections:</strong> Apply via the NGED connections portal for new
              supplies, service upgrades, meter relocations, and temporary supplies. The name change
              from WPD to NGED means some online resources and local contacts may still reference
              WPD — they are the same organisation.
            </p>
            <p>
              <strong>G98/G99 notifications:</strong> Solar PV, battery storage, and any generation
              or storage connected to the network requires G98 (up to 16A per phase) or G99
              (larger systems) notification. Note that solar PV installations in Bath conservation
              areas face planning restrictions in addition to DNO notification requirements.
            </p>
            <p>
              <strong>Earthing:</strong> Most of Bath is PME (TN-C-S). Some older Georgian and
              Victorian properties in the city centre may have TN-S earthing via the original lead
              sheath cable, particularly those that have not had a service upgrade. A small number of
              properties on the hills above Bath (Lansdown, Bathwick Hill) may be TT. Always verify
              the earthing arrangement at the service head.
            </p>
          </div>
        </div>
        <p>
          Service upgrades in Bath city centre can be complicated by the conservation restrictions on
          external cable routes and meter positions. Coordinate with NGED and the BANES conservation
          team early if a service upgrade involves any external changes to a listed building.
        </p>
      </>
    ),
  },
  {
    id: 'unesco-conservation',
    heading: 'UNESCO World Heritage Site: Conservation Controls',
    content: (
      <>
        <p>
          Bath was inscribed as a UNESCO World Heritage Site in 1987, recognising the city's
          outstanding universal value as an example of Georgian town planning, Roman engineering, and
          the integration of architecture with landscape. The World Heritage Site designation
          underpins the strictest conservation controls in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed Building Consent</strong> — Bath has over 5,000 listed buildings,
                including 170 Grade I and over 500 Grade II* structures. Any electrical work that
                alters the character of a listed building requires LBC. In Bath, the BANES
                conservation team interprets this broadly — even replacing visible switches and
                sockets with modern white plastic types in significant rooms has been challenged.
                For any work beyond simple like-for-like replacement, apply for LBC before starting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Article 4 directions</strong> — BANES has Article 4 directions that remove
                permitted development rights within the World Heritage Site. This means that
                external changes which would normally be permitted development (satellite dishes,
                external lighting, EV charger mounting, solar panels, external cable routes) require
                planning permission in Bath. This catches many electricians by surprise — check
                before installing anything externally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uniform character</strong> — Bath's Georgian terraces were designed as
                unified compositions. The Royal Crescent, for example, is a single curved facade
                designed by John Wood the Younger — any alteration to one property affects the
                integrity of the whole composition. This means external electrical work (meter
                positions, cable entries, lighting) must be consistent with the established pattern
                across the terrace. You cannot simply choose the most convenient cable route.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Working within these constraints is time-consuming but rewarding. The BANES conservation
          team publishes guidance notes for work within the World Heritage Site — read these before
          quoting heritage work. Building a good working relationship with the conservation officers
          makes the consent process smoother and leads to referrals.
        </p>
      </>
    ),
  },
  {
    id: 'georgian-rewiring',
    heading: 'Georgian Townhouse Rewiring in Bath',
    content: (
      <>
        <p>
          Rewiring a Georgian townhouse in Bath is one of the most technically demanding domestic
          electrical jobs in the UK. The properties are typically 3 to 5 storeys, with basements,
          high ceilings (3 to 3.6 metres), original lime plaster with elaborate cornicing, and
          timber-framed internal partitions over Bath stone external walls.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor voids</strong> — Georgian houses have timber suspended floors with
                reasonable voids (typically 150 to 250mm). Cables can be run through floor voids
                between storeys, but the joists are often irregular and the voids may contain
                original lath-and-plaster ceiling below. Never cut through lath-and-plaster to
                route cables — it is original fabric and often includes decorative cornicing on
                the room below. Use flexible draw rods and route cables alongside joists.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vertical risers</strong> — Georgian townhouses are narrow and tall.
                Vertical cable routes are the main challenge. Use existing chimney flue voids
                (many Georgian fireplaces are blocked up with voids accessible from the basement or
                loft), existing service risers from previous electrical or plumbing work, or carefully
                created routes in internal partition walls (timber stud with lath and plaster — check
                for significance before opening up). External walls are Bath stone and must not be
                chased.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lime plaster</strong> — Bath Georgian plaster is lime-based and historically
                significant. It is softer than modern gypsum plaster and cracks easily if disturbed.
                Never chase lime plaster for cable routes. Where cables must cross a plastered wall,
                route them behind original skirting boards, dado rails, or picture rails — these
                are often deep enough to conceal a cable. If making good is required after electrical
                work, it must be done with lime plaster (not gypsum) by a specialist heritage
                plasterer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories</strong> — in the principal rooms of a listed Georgian
                townhouse, white plastic switches and sockets are usually inappropriate. Period brass
                or nickel accessories are expected. Some conservation officers have approved specific
                ranges of slim, discreet modern accessories in muted colours for less significant
                rooms. Agree the accessory specification with the homeowner and, if necessary, the
                conservation officer before ordering.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A thorough survey is essential before quoting a Bath Georgian rewire. Lift floorboards to
          check void depths and existing routes. Inspect the loft space for potential cable routes.
          Identify all original features that must be protected. The quote should reflect the actual
          complexity — underquoting Georgian rewires is the most common pricing mistake in Bath.
        </p>
      </>
    ),
  },
  {
    id: 'bath-stone',
    heading: 'Working with Bath Stone Properties',
    content: (
      <>
        <p>
          Bath stone is the city's signature building material — the warm, honey-coloured oolitic
          limestone that gives Bath its distinctive appearance. Understanding Bath stone is essential
          for any electrician working in the city, because it directly affects how you route cables,
          make fixings, and protect the building.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never chase Bath stone</strong> — Bath stone is soft, porous, and fractures
                along bedding planes. Chasing a cable route into Bath stone will cause the face to
                spall and crumble. There is no acceptable way to chase Bath stone for electrical
                cables. All cable routes through Bath stone walls must use existing openings (windows,
                doors, service holes) or carefully drilled cores through mortar joints.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Core drilling</strong> — when a cable penetration through Bath stone is
                unavoidable, core drill through the mortar joint (not the stone). Use a diamond core
                at low speed with water suppression to prevent dust and heat damage. The hole should
                be just large enough for the cable and grommet — oversized holes in listed buildings
                will be challenged by the conservation officer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-ferrous fixings</strong> — iron and steel fixings cause rust staining on
                Bath stone that is virtually impossible to remove. All external fixings into Bath
                stone must be stainless steel or brass. Use stainless steel wall plugs and screws
                for mounting consumer units, cable clips, or any accessories on Bath stone walls.
                This applies to internal Bath stone walls as well as external.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Moisture and damp</strong> — Bath stone is highly porous and many Bath
                properties have rising damp or penetrating damp issues, particularly at basement and
                ground floor level. Electrical accessories and distribution boards in damp areas must
                be appropriately IP-rated. Cable insulation in persistently damp conditions should be
                monitored via regular insulation resistance testing. Recommend that the homeowner
                addresses the damp issue alongside the electrical work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Understanding Bath stone is a genuine differentiator. Electricians who can demonstrate
          competent, sympathetic work on Bath stone properties will be recommended by conservation
          officers, heritage architects, and satisfied homeowners.
        </p>
      </>
    ),
  },
  {
    id: 'underfloor-heating',
    heading: 'Electric Underfloor Heating in Listed Buildings',
    content: (
      <>
        <p>
          Electric underfloor heating (UFH) is increasingly requested in Bath listed buildings.
          Georgian and Regency properties often have elegant proportions that are compromised by
          radiators, and underfloor heating offers an invisible solution. However, installing UFH
          in a listed building requires careful planning and Listed Building Consent.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stone floors</strong> — many Bath properties have original Bath stone
                flagstone floors, particularly in hallways, kitchens, and basements. These floors
                are often historically significant and must not be disturbed. UFH can be installed
                on top of an existing stone floor using ultra-thin heating mats (3 to 4mm) with a
                levelling compound overlay, but this raises the floor level and may affect door
                thresholds and step heights. LBC is required for any work that alters the floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timber floors</strong> — Georgian suspended timber floors can accommodate
                UFH mats between the floorboards and a new floor covering, or foil heating elements
                stapled to the underside of floorboards accessed from the void below. The latter
                approach avoids disturbing the floor surface but requires adequate access to the
                underfloor void. Insulation below the heating element is essential for efficiency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical requirements</strong> — electric UFH in a domestic setting is
                a notifiable alteration under Part P. The heating circuit must be protected by a
                dedicated RCBO (30mA, typically 16A or 20A depending on the system size). The{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671
                </SEOInternalLink>{' '}
                requirements for floor heating systems (Section 753) apply, including maximum floor
                surface temperature limits and the correct selection of heating cable type for the
                installation method.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Running costs</strong> — advise customers on the running cost implications.
                Electric UFH in a Bath stone property can be expensive to run as the primary heating
                system due to the thermal mass of stone walls and floors. It works best as a
                supplementary or comfort heating system in specific rooms (bathrooms, hallways)
                rather than whole-house heating. Smart thermostats with programmable schedules help
                manage running costs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          UFH installation in listed buildings is a growing niche in Bath. Partnering with a flooring
          specialist and heritage architect allows you to offer a complete service from design through
          LBC application to installation and certification.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Pricing Guide for Bath',
    content: (
      <>
        <p>
          Bath has some of the highest domestic electrical rates outside London, reflecting the
          heritage skill requirements, affluent customer base, and strong tourism economy. Heritage
          work commands significant premiums over standard domestic rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Standard Rewire (3-bed)</h4>
                <p className="text-white text-2xl font-bold">£4,000 – £6,500</p>
                <p className="text-white text-sm mt-1">Non-listed property, Twerton/Weston area</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Georgian Townhouse Rewire</h4>
                <p className="text-white text-2xl font-bold">£7,000 – £14,000</p>
                <p className="text-white text-sm mt-1">3–5 storey listed, city centre</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Consumer Unit Upgrade</h4>
                <p className="text-white text-2xl font-bold">£500 – £850</p>
                <p className="text-white text-sm mt-1">Dual RCD or RCBO board, testing, cert</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">EICR (Domestic)</h4>
                <p className="text-white text-2xl font-bold">£200 – £350</p>
                <p className="text-white text-sm mt-1">3-bed property, full report</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Underfloor Heating (per room)</h4>
                <p className="text-white text-2xl font-bold">£600 – £1,200</p>
                <p className="text-white text-sm mt-1">Supply and install, excl. floor finish</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <h4 className="font-bold text-white mb-2">Day Rate</h4>
                <p className="text-white text-2xl font-bold">£280 – £400</p>
                <p className="text-white text-sm mt-1">Qualified electrician, Bath area</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Heritage work pricing reflects the genuine additional time and skill required — do not
          discount. The Royal Crescent and Lansdown Crescent areas command the highest rates.
          Properties outside the conservation areas (Twerton, Odd Down, Weston) are priced closer
          to national averages. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
          produce accurate, itemised quotes that reflect the true cost of Bath heritage work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Your Business in Bath',
    content: (
      <>
        <p>
          Bath is a premium market for electricians who invest in heritage skills. The combination of
          UNESCO-grade conservation work, affluent homeowners, a busy tourism sector, and growing
          commercial development at Bath Quays makes it one of the most attractive cities to work in
          for skilled electricians in the south west.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs on site</SEOInternalLink>{' '}
                  for listed buildings, hotel periodic inspections, and landlord compliance. AI-
                  assisted observation coding and instant PDF export. Document heritage-specific
                  observations clearly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size cables for Georgian rewires and underfloor heating installations with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Factor in derating for routes through insulated voids in period properties.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quote Georgian rewires, UFH installations, and commercial maintenance with
                  Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Itemised PDF quotes with heritage-specific line items, sent from the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional certification for Bath electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Georgian rewires, UFH, or commercial — certify it all on site. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBathPage() {
  return (
    <GuideTemplate
      title="Electrician in Bath | Local Electrical Guide"
      description="Complete guide for electricians working in Bath. NGED DNO, UNESCO World Heritage conservation controls, Georgian townhouse rewiring, Bath stone properties, underfloor heating in listed buildings, and realistic Bath pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Bath:{' '}
          <span className="text-yellow-400">Local Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Bath's UNESCO World Heritage status means the strictest conservation controls in the UK. This guide covers the DNO, Georgian rewiring, Bath stone challenges, underfloor heating in listed buildings, and realistic pricing for electricians in Bath."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Work in Bath"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Electrical Work in Bath — On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, EICRs, EICs, and professional quoting. Georgian rewires, heritage work, or commercial — certify it all on site. 7-day free trial."
    />
  );
}
