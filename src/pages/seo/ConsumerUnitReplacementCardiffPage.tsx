import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  Building2,
  CheckCircle2,
  Info,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Consumer Unit Guides', href: '/guides/consumer-unit-replacement' },
  { label: 'Consumer Unit Replacement Cardiff', href: '/consumer-unit-replacement-cardiff' },
];

const tocItems = [
  { id: 'overview', label: 'Overview — Wales and Cardiff' },
  { id: 'metal-enclosure', label: 'Metal Enclosure — Regulation 421.1.201' },
  { id: 'rcd-protection', label: 'RCD and RCBO Protection' },
  { id: 'building-regulations-wales', label: 'Building Regulations in Wales' },
  { id: 'bs-en-61439', label: 'BS EN 61439-3' },
  { id: 'costs-cardiff', label: 'Costs in Cardiff (2026)' },
  { id: 'cardiff-housing', label: 'Cardiff Housing Stock' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Regulation 421.1.201 (effective July 2016) requires all replacement consumer units in domestic premises in Wales to use a non-combustible (metal) enclosure. This applies throughout Cardiff and across Wales.',
  'In Wales, consumer unit replacement is notifiable under Part P of the Building Regulations as applied in Wales. Cardiff Council is the local building control authority. Competent person scheme members (NICEIC, NAPIT, ELECSA) self-certify on your behalf.',
  'Consumer unit replacement costs in Cardiff range from £400 to £750 for standard domestic properties, broadly comparable to other large cities in Wales and the West of England.',
  'Wales has its own devolved building regulations framework (administered by Welsh Government) but adopts the same BS 7671 IET Wiring Regulations that apply across the UK.',
  'Cardiff\'s large student population — driven by Cardiff University and Cardiff Metropolitan University — creates consistent consumer unit replacement demand in private rented properties across Cathays, Roath, and Canton.',
];

const faqs = [
  {
    question: 'Does Welsh building regulations law differ from England for consumer unit replacement?',
    answer:
      'Wales has its own devolved building regulations framework. The Building Regulations 2010 (as amended) apply in Wales with certain modifications, and the Welsh Government issues its own Approved Documents (including Approved Document P for electrical safety in dwellings). However, the substantive electrical safety requirements are very similar to England — consumer unit replacement is notifiable work and must be carried out by a registered competent person or notified to Cardiff Council building control. The same competent person schemes (NICEIC, NAPIT, ELECSA) operate in Wales as in England. The technical standard — BS 7671 — is identical across England and Wales.',
  },
  {
    question: 'Why does a replacement consumer unit in Cardiff need a metal enclosure?',
    answer:
      'Amendment 2 to BS 7671:2008, in force since 1 July 2016, introduced Regulation 421.1.201. This requires that consumer units in domestic premises be enclosed in a cabinet or enclosure made of non-combustible material. Steel enclosures comply; plastic ones do not. The reason for the change was evidence from electrical fire investigations showing that plastic consumer unit enclosures could ignite during arcing faults and spread fire into the building structure. This requirement applies across the UK including Cardiff and all Welsh properties.',
  },
  {
    question: 'How much does a consumer unit replacement cost in Cardiff?',
    answer:
      'Consumer unit replacement in Cardiff typically costs £400 to £750 for a standard domestic property. A small flat or two-bedroom terrace in Cathays, Roath, or Canton is likely to cost £380 to £520. A three-bedroom semi-detached or detached property in Whitchurch, Llandaff, or Pontprennau may cost £500 to £700. Larger or more complex properties can cost up to £900 or more. Cardiff labour rates are broadly comparable to other large cities in the South West and Midlands — lower than London but slightly higher than more northern cities. All quotes should include supply of the compliant metal consumer unit, installation, testing, and certification.',
  },
  {
    question: 'What RCD protection does my Cardiff consumer unit need?',
    answer:
      'BS 7671 Regulation 411.3.3 requires 30mA RCD protection for all socket-outlet circuits rated up to 32A in domestic premises and for circuits serving locations containing a bath or shower (Regulation 701). Cardiff electricians install either a dual-RCD consumer unit (circuits in two groups each on a 30mA RCD) or an all-RCBO consumer unit (each circuit on its own RCBO combining MCB and RCD). RCBOs are generally recommended for new installations as they provide individual circuit protection — a fault on one circuit trips only that circuit, not an entire group.',
  },
  {
    question: 'Is there a requirement for Bilingual (Welsh and English) documentation for Cardiff consumer unit certificates?',
    answer:
      'Electrical Installation Certificates (EICs) and Building Regulations compliance certificates are not routinely required in Welsh as well as English. The standard IET model forms and NICEIC/NAPIT documentation are in English and are legally valid throughout Wales. However, some Cardiff electricians who are Welsh-speaking may be able to communicate in Welsh. The Welsh Language Standards apply to public bodies rather than to private electrical contractors, so there is no legal obligation on a private Cardiff electrician to provide Welsh-language documentation.',
  },
  {
    question: 'How long does a consumer unit replacement take in Cardiff?',
    answer:
      'A standard consumer unit replacement in a three-bedroom Cardiff property typically takes four to six hours. Properties in older Cardiff areas such as Roath, Cathays, or Splott may have more complex wiring arrangements that add time. Cardiff bay waterfront flats in modern blocks can be more straightforward. You should expect to be without mains power to some or all of the property for most of the working day. Your electrician should give a time estimate following a survey visit.',
  },
  {
    question: 'Do Cardiff landlords have to replace consumer units following an EICR?',
    answer:
      'Yes, if the EICR produces C1 (danger present) or C2 (potentially dangerous) observations relating to the consumer unit, circuit protection, or RCD provision. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply in England (not Wales), but Wales has equivalent obligations under housing legislation and licensing conditions. Cardiff landlords are required to ensure their properties meet electrical safety standards and must address C1 and C2 EICR findings within 28 days. Cardiff Council enforces selective licensing in parts of the city, making EICR compliance a licence condition for affected properties.',
  },
  {
    question: 'What certificates should I receive after a consumer unit replacement in Cardiff?',
    answer:
      'You should receive: an Electrical Installation Certificate (EIC) detailing the installation with a Schedule of Test Results recording all measured circuit values; and a Building Regulations Compliance Certificate from the competent person scheme (NICEIC, NAPIT, or ELECSA) confirming notification to Cardiff Council building control. Keep all documentation securely — Welsh solicitors acting on property sales in Cardiff routinely request these documents during conveyancing, and they may be needed for insurance purposes.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description: 'Complete UK guide to fuse box and consumer unit replacement costs, regulations, and process.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'The IET Wiring Regulations explained — key requirements, amendments, and compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/consumer-unit-replacement-southampton',
    title: 'Consumer Unit Replacement Southampton',
    description: 'Consumer unit replacement in Southampton — costs, regulations, and qualified electricians.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on your phone with AI assistance and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Consumer Unit Replacement in Cardiff — Overview',
    content: (
      <>
        <p>
          Cardiff is the capital city of Wales and one of the fastest-growing cities in the UK.
          The city has a diverse housing stock — from Victorian terraces in Cathays and Roath to
          Edwardian semis in Whitchurch and Llandaff, post-war housing in Ely and Llanrumney,
          and modern waterfront apartments in Cardiff Bay. Consumer unit replacement demand spans
          all these property types, with particularly high volumes in the large private rented
          sector that serves Cardiff's two major universities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Same BS 7671 standard</strong> — consumer unit replacement in Cardiff must
                comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , the IET Wiring Regulations. These apply identically across England and Wales.
                The metal enclosure requirement (Regulation 421.1.201) and RCD protection
                requirements (Regulation 411.3.3) apply in full.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh building regulations</strong> — Wales has its own devolved building
                regulations framework. Consumer unit replacement is notifiable work under the
                Building Regulations (Wales). The same competent person schemes (NICEIC, NAPIT,
                ELECSA) operate in Wales, allowing self-certification and Cardiff Council
                notification by the electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost range</strong> — consumer unit replacement in Cardiff typically costs
                £400 to £750 for a standard domestic property, broadly comparable with similar
                cities in England.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-enclosure',
    heading: 'Metal Enclosure Requirement — Regulation 421.1.201',
    content: (
      <>
        <p>
          Regulation 421.1.201 of BS 7671 requires consumer units in domestic premises to be
          installed in enclosures made of non-combustible material. This requirement has applied
          since 1 July 2016 (Amendment 2 to BS 7671:2008) and is carried forward in the current
          standard BS 7671:2018+A3:2024. It applies throughout Wales, including Cardiff.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire containment rationale</strong> — arc flash events during internal
                short circuits inside a consumer unit release intense energy. A steel enclosure
                contains this event and prevents ignition of surrounding building materials.
                Plastic enclosures can melt and ignite, which is a particular concern in Cardiff's
                Victorian terrace stock where consumer units are often installed in timber
                outbuildings, understairs cupboards, or close to timber joists.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applies at the point of replacement</strong> — existing plastic consumer
                units in Cardiff properties are not required to be proactively replaced. However,
                when any replacement takes place — for any reason — the new unit must have a metal
                (non-combustible) enclosure. No exceptions apply for like-for-like replacements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR coding for plastic units</strong> — in Welsh and English properties
                alike, an existing plastic consumer unit is typically coded C3 (improvement
                recommended) on an EICR — not an immediate failure code, but indicating that
                replacement is advisable. Additional deficiencies such as absent RCD protection
                attract their own C2 codes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD and RCBO Protection',
    content: (
      <>
        <p>
          Regulation 411.3.3 of BS 7671 requires 30mA RCD protection for all socket-outlet
          circuits rated up to 32A and for all circuits serving bathrooms and shower rooms
          (Regulation 701). This applies throughout Cardiff and Wales. Many older Cardiff
          properties — particularly those rewired in the 1970s and 1980s — lack adequate
          RCD protection and require a consumer unit upgrade to achieve compliance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-RCD consumer unit</strong> — circuits are split across two groups,
                each protected by a 30mA RCD. The limitation is that a fault on any circuit in
                a group trips all circuits in that group. This can be disruptive in Cardiff
                rental properties where tenants share circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All-RCBO consumer unit</strong> — each circuit has its own RCBO,
                combining MCB and 30mA RCD protection. A fault on one circuit trips only that
                circuit. Preferred for new installations and for Cardiff rental properties
                where maximum discrimination is important.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping in Cathays and Roath terraces</strong> — older wiring
                in Cardiff terraces can cause nuisance RCD tripping due to deteriorated cable
                insulation. RCBOs limit the impact to a single circuit. Recurring nuisance
                tripping should be investigated as it may indicate wiring requiring remedial
                attention.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-regulations-wales',
    heading: 'Building Regulations in Wales — Part P and Competent Person Schemes',
    content: (
      <>
        <p>
          Wales has a devolved building regulations framework administered by Welsh Government,
          separate from the Building Regulations in England. However, the requirements for
          electrical work in dwellings are substantively similar — consumer unit replacement
          is notifiable work and must be carried out by a competent person or notified to
          Cardiff Council building control.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification in Wales</strong> — NICEIC, NAPIT,
                and ELECSA registered electricians can self-certify electrical work in Wales.
                They notify Cardiff Council building control on your behalf and issue a Building
                Regulations Compliance Certificate. The scheme operates identically to England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — the electrician must issue a
                full{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                with a Schedule of Test Results. This documentation is required by Welsh solicitors
                during property transactions and by insurers following electrical incidents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiff selective licensing</strong> — Cardiff Council operates selective
                licensing for private rented properties in certain areas of the city. A valid EICR
                and, where required, evidence that C1 and C2 deficiencies have been remediated
                (which may include consumer unit replacement) are conditions of the licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent Smart Wales</strong> — landlords renting properties in Wales must
                be registered with Rent Smart Wales. Electrical safety compliance is part of
                the fitness-for-purpose standard expected of registered landlords. Consumer unit
                replacements should always be properly certified to support licence renewals.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-61439',
    heading: 'BS EN 61439-3 — Consumer Unit Product Standard',
    content: (
      <>
        <p>
          BS EN 61439-3 is the British and European Standard for distribution boards intended
          for use by ordinary persons, including domestic consumer units. It applies throughout
          the UK including Cardiff and Wales, setting requirements for design verification,
          construction, performance, and marking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design verification</strong> — manufacturers must verify through testing
                or calculation that the consumer unit assembly meets its rated voltage, current,
                and prospective short-circuit current (PSCC) values. The PSCC rating must be
                adequate for the fault level at the Cardiff installation address — your electrician
                measures this and confirms the selected unit is appropriately rated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKCA marking</strong> — consumer units placed on the UK market since
                January 2022 must carry UKCA marking. Cardiff electricians should only install
                units from reputable manufacturers such as Hager, Schneider Electric, Wylex,
                or Contactum that comply with BS EN 61439-3 and carry UKCA marking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site testing under BS 7671 Part 6</strong> — factory testing under
                BS EN 61439-3 is supplemented by on-site inspection and testing under BS 7671
                Part 6. All measured values are recorded in the Schedule of Test Results forming
                part of the Electrical Installation Certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs-cardiff',
    heading: 'Consumer Unit Replacement Costs in Cardiff (2026)',
    content: (
      <>
        <p>
          Cardiff's consumer unit replacement costs are broadly comparable to equivalent cities
          in the South West of England and the Midlands. Welsh labour rates are generally lower
          than London but similar to Bristol or Nottingham. The following 2026 guide prices are
          all-inclusive of supply, installation, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat or terrace (1–2 bed)</strong> — £380 to £530. Very common
                in Cathays, Roath, Canton, and Pontcanna. Typically 6 to 10 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi or terrace</strong> — £480 to £680. The most common
                Cardiff property type. Up to 12 circuits, full testing included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger detached property</strong> — £630 to £900. Common in Whitchurch,
                Llandaff, Pontprennau, and Radyr. More ways required, potentially RCBO arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional work</strong> — earthing upgrades, main bonding, smoke alarm
                installation, or meter tails replacement can add £100 to £400. Cardiff Bay
                waterfront flats may have specific earthing considerations depending on the
                building's electrical infrastructure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always obtain at least two or three written quotes from NICEIC or NAPIT registered
          electricians in Cardiff. Confirm that testing, certification, and building control
          notification are included in the price.
        </p>
      </>
    ),
  },
  {
    id: 'cardiff-housing',
    heading: 'Cardiff Housing Stock — Consumer Unit Considerations',
    content: (
      <>
        <p>
          Cardiff has experienced rapid population growth and significant property development
          since the 1990s, alongside a large stock of older Victorian, Edwardian, and post-war
          properties. Consumer unit replacement considerations vary across the city's distinct
          neighbourhoods.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cathays and Roath student terraces</strong> — high density of student
                lets with older wiring in Victorian and Edwardian terraces. Consumer unit
                upgrades are very common, often driven by EICR compliance requirements under
                Cardiff Council's Selective Licensing scheme and Rent Smart Wales obligations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiff Bay waterfront developments</strong> — modern apartment blocks
                in Butetown and Cardiff Bay typically have more modern electrical installations,
                but older converted properties and some 1990s blocks may have consumer units
                that require updating to current standards. Communal area electrical installations
                should also be considered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural Vale of Glamorgan fringe</strong> — properties on the Cardiff
                fringe in areas such as Dinas Powys, Penarth, or Barry may use TT earthing
                with an earth electrode rather than the PME (TN-C-S) arrangement common in
                Cardiff's urban areas. TT installations require RCD protection at the origin
                and different consumer unit specification. Your electrician must identify the
                earthing system before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh language considerations</strong> — while electrical certification
                documents are provided in English, many Cardiff electricians are Welsh speakers.
                If Welsh-language communication is preferred, ask the electrician at the
                quotation stage. There is no legal requirement for the EIC or compliance
                certificate to be in Welsh.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work Across South Wales',
    content: (
      <>
        <p>
          Cardiff and the wider South Wales region offer consistent demand for consumer unit
          replacement, driven by a large private rented sector, active Cardiff Council licensing
          enforcement, and Rent Smart Wales requirements. Electricians operating across Cardiff,
          Newport, Swansea, and the Valleys can build significant consumer unit replacement
          volumes with the right tools and processes.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Paperless EICs Across South Wales</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the full Electrical Installation Certificate and Schedule of Test
                  Results on your phone while still on site in Cardiff or across South Wales.
                  Record all test values, generate the PDF, and send it to your customer before
                  you leave. No clipboards, no evening admin, no paper.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Additional Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When you discover bonding deficiencies, old wiring, or additional circuits
                  required during a Cardiff consumer unit job, use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting tool
                  </SEOInternalLink>{' '}
                  to provide a quote on site. Cardiff landlords with multiple properties are
                  particularly receptive to planned upgrade programmes quoted at the time of
                  the first visit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Cardiff electrical business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, instant PDF export, and professional quoting. Eliminate paperwork and build a stronger South Wales electrical business. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementCardiffPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Cardiff | Fuse Box Wales"
      description="Consumer unit replacement in Cardiff — metal enclosure rules, Welsh building regulations, costs £400–750, BS EN 61439, NICEIC electricians in South Wales. Complete guide for Cardiff homeowners and landlords 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Cardiff:{' '}
          <span className="text-yellow-400">Fuse Box Guide Wales 2026</span>
        </>
      }
      heroSubtitle="Everything Cardiff homeowners and landlords need to know about consumer unit replacement — the metal enclosure requirement, Welsh building regulations, RCD protection, costs of £400 to £750, Rent Smart Wales obligations, and how to find a qualified NICEIC or NAPIT registered electrician in South Wales."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Cardiff"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion with instant PDF export and schedule of test results. 7-day free trial, cancel anytime."
    />
  );
}
