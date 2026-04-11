import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  ClipboardCheck,
  FileCheck2,
  Search,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Rewire Cost Guides', href: '/guides/house-rewire-cost' },
  { label: 'Rewire Cost Cardiff', href: '/rewire-cost-cardiff' },
];

const tocItems = [
  { id: 'rewire-costs-cardiff', label: 'Rewire Costs in Cardiff' },
  { id: 'wales-regulations', label: 'Welsh Building Regulations' },
  { id: 'signs-you-need-rewire', label: 'Signs You Need a Rewire' },
  { id: 'what-rewire-involves', label: 'What a Rewire Involves' },
  { id: 'timescales-disruption', label: 'Timescales and Disruption' },
  { id: 'part-p-wales', label: 'Part P in Wales' },
  { id: 'choosing-contractor', label: 'Choosing a Contractor' },
  { id: 'guarantees-certification', label: 'Guarantees and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Cardiff typically costs £2,800 to £6,500 depending on property size. Wales uses the same BS 7671:2018+A3:2024 wiring regulations as England.',
  'Electrical installation work in dwellings in Wales is notifiable under Part P of the Building Regulations 2010, which applies in Wales as well as England.',
  'NICEIC and NAPIT registered contractors can self-certify rewiring work in Cardiff — they notify Building Control Wales on your behalf.',
  'Cardiff has a significant stock of Victorian and Edwardian terraces in areas such as Roath, Cathays, and Canton that may retain original or interwar wiring requiring a full rewire.',
  'On completion, your electrician must issue an Electrical Installation Certificate (EIC) confirming compliance with BS 7671 — this is required for property sales.',
  'Welsh Government building policy supports the same technical standards as England for electrical safety. Approved Document P applies in Wales under the Building Regulations 2010.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Cardiff?',
    answer:
      'A full rewire in Cardiff typically costs £2,000 to £3,000 for a one-bedroom flat, £2,800 to £4,000 for a two-bedroom terrace, £3,500 to £5,000 for a three-bedroom semi-detached, and £4,500 to £6,500 for a four-bedroom detached. Cardiff labour rates are broadly similar to other major Welsh cities and slightly below the England national average. Prices include materials, labour, and the Electrical Installation Certificate but exclude redecoration.',
  },
  {
    question: 'Do Welsh homes use the same wiring regulations as England?',
    answer:
      'Yes. BS 7671:2018+A3:2024 (the IET Wiring Regulations, 18th Edition) applies across the United Kingdom including Wales. All fixed electrical installation work in Cardiff and across Wales must comply with BS 7671. Building Regulations in Wales also require electrical installation work in dwellings to be carried out by a competent person or notified to Building Control Wales.',
  },
  {
    question: 'Does Part P apply to rewiring work in Cardiff?',
    answer:
      'Yes. The Building Regulations 2010 and Approved Document P apply in Wales as well as England. A full rewire is notifiable work and must be either self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA registered) or notified to Building Control Wales or Cardiff Council building control before work begins. The requirements are identical to England.',
  },
  {
    question: 'How long does a house rewire take in Cardiff?',
    answer:
      'A two-bedroom terrace in Cardiff — common in areas such as Roath, Splott, and Llanrumney — typically takes 2 to 3 days. A three-bedroom semi-detached takes 3 to 5 days. Victorian and Edwardian properties with solid stone or brick walls in Cathays, Canton, and Pontcanna may take longer as cable routes are more complex. Larger detached properties can take up to 7 days.',
  },
  {
    question: 'What certificate should I receive after a rewire in Cardiff?',
    answer:
      'Your electrician must issue an Electrical Installation Certificate (EIC) signed by the installer and inspector. This confirms the rewire complies with BS 7671. If the work was self-certified under Part P, you will also receive a Building Regulations Compliance Certificate from Building Control Wales or the competent person scheme. Both documents are required when selling the property and should be kept with your deeds.',
  },
  {
    question: 'Can I get a rewire grant in Wales?',
    answer:
      'Welsh Government Warm Homes programmes have historically provided grants for electrical improvements in low-income households. The Nest scheme and Optimised Retrofit Programme may cover rewiring as part of broader energy efficiency works. Eligibility depends on income, property ownership status, and energy performance rating. Contact Warm Wales or the Welsh Government directly for current grant availability.',
  },
  {
    question: 'How do I find a qualified rewire electrician in Cardiff?',
    answer:
      'Use the NICEIC or NAPIT online registers to find registered contractors in Cardiff and the Vale of Glamorgan. Both registers confirm current registration status, qualifications, and insurance coverage. Obtain at least three detailed written quotes, check Google and Checkatrade reviews, and confirm the contractor will provide an EIC and handle Part P notification. The Electrical Contractors Association (ECA) also maintains a contractor register.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/house-rewire-cost',
    title: 'House Rewire Cost Guide',
    description:
      "National rewire cost guide covering all property sizes, what's included, and how to compare quotes.",
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What Part P means for homeowners and electricians — notifiable work, self-certification, and compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description:
      'Issue EICs on your phone. Auto-populated test schedules, instant PDF, and Part P ready.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/rewire-cost-bristol',
    title: 'Rewire Cost Bristol',
    description: 'House rewire costs in Bristol and the South West with contractor guidance.',
    icon: Home,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'rewire-costs-cardiff',
    heading: 'House Rewire Costs in Cardiff (2025 Prices)',
    content: (
      <>
        <p>
          Cardiff rewire costs reflect Welsh labour market rates, which are broadly similar to the
          English Midlands and significantly below London. Material costs are consistent across the
          UK. The prices below are based on typical Cardiff properties and include all labour,
          materials, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £1,800 to £2,800. Apartment blocks and
                conversions in Cardiff Bay, Roath, and the city centre are common at this size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £2,800 to £4,000. The classic Cardiff
                terrace found across Roath, Adamsdown, Splott, Llanrumney, and Ely. Typically 8 to
                12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £3,500 to £5,000. Widespread across
                suburbs such as Rhiwbina, Whitchurch, Llandaff, and Pontprennau. Typically 12 to 16
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — £4,500 to £6,500. Larger properties in
                Lisvane, Cyncoed, and Radyr command the higher end of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian properties</strong> — add 20 to 35 per cent for
                pre-1940 properties in Cathays, Canton, Pontcanna, and Llandaff North, where solid
                stone or brick walls complicate cable routing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include stripping out existing wiring, installing new PVC twin-and-earth cables,
          fitting a new consumer unit with RCD protection, installing new accessories, and issuing
          the Electrical Installation Certificate. Redecoration and plastering are not included and
          should be budgeted separately — typically £500 to £2,000 depending on the extent of work.
        </p>
      </>
    ),
  },
  {
    id: 'wales-regulations',
    heading: 'Building Regulations and Electrical Standards in Wales',
    content: (
      <>
        <p>
          Wales uses the same electrical safety technical standards as England. BS 7671:2018+A3:2024
          (the IET Wiring Regulations, 18th Edition) applies across all of the United Kingdom.
          Building Regulations for dwellings in Wales are approved by the Welsh Government under the
          Building Regulations 2010.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024</strong> — the current edition of the Wiring
                Regulations applies in Wales. All rewiring work in Cardiff must comply with its
                requirements including RCD protection (Regulation 411.3.3), consumer unit standards,
                earthing and bonding, and circuit protective devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Document P</strong> — applies in Wales under the Building
                Regulations 2010. It requires that electrical installation work in dwellings is
                designed and installed to the standard of BS 7671 and carried out by a competent
                person or notified to Building Control Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh Government support</strong> — the Welsh Government has energy
                efficiency and warm homes programmes that may fund electrical improvements for
                eligible homeowners. BS 7671 compliance is a requirement of any funded work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cardiff homeowners can be confident that NICEIC and NAPIT registered contractors operating
          in Wales work to exactly the same standards and certification requirements as anywhere
          else in Great Britain.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-rewire',
    heading: 'Signs Your Cardiff Property Needs a Rewire',
    content: (
      <>
        <p>
          Cardiff's housing stock includes a large number of Victorian and Edwardian terraces, 1930s
          semi-detached houses, and post-war council properties. Many of these may retain wiring
          that is past its safe service life. Look out for these warning signs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated or fabric-braided cables</strong> — pre-1960s wiring with
                rubber insulation that has dried, cracked, and degraded. A C1 (danger present)
                finding on an EICR requiring immediate action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse box</strong> — ceramic fuse holders with fuse wire indicate a
                pre-1970s installation with no modern overcurrent or RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Round-pin sockets</strong> — original pre-1947 sockets indicate a very old
                installation that will require a full rewire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — a consumer unit without residual current device
                protection on socket circuits is a C2 (potentially dangerous) observation under BS
                7671 Regulation 411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory EICR</strong> — a periodic inspection identifying C1 or C2
                observations that require remedial work. If the cost of repairs approaches or
                exceeds the cost of a rewire, a full rewire is usually the better investment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you have any concerns about the wiring in your Cardiff property, commission a{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            periodic inspection and EICR
          </SEOInternalLink>{' '}
          from a qualified electrician before purchasing or before undertaking renovation work.
        </p>
      </>
    ),
  },
  {
    id: 'what-rewire-involves',
    heading: 'What a Full House Rewire Involves',
    content: (
      <>
        <p>
          A full rewire replaces all fixed wiring from the incoming mains supply throughout the
          property. The process follows a consistent sequence regardless of location.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix</strong> — removal of existing wiring, cable routing through
                floors, walls, and ceiling voids, installation of back boxes and containment. The
                most disruptive stage involving lifted floorboards and chased or surface-run cable
                routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix</strong> — fitting the consumer unit, connecting all circuits,
                installing sockets, switches, and luminaires, and making off the mains connection.
                Power is restored at the end of this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> — full testing of all circuits per BS 7671
                Chapter 64 including insulation resistance, earth continuity, and RCD operation.
                Test results are recorded on schedules forming part of the EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — EIC issued and Part P notification submitted. You
                receive both the EIC and the compliance certificate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The new installation will include a modern consumer unit with RCD or RCBO protection on
          all circuits, meeting current BS 7671 requirements for protection against electric shock
          and electrical fire.
        </p>
      </>
    ),
  },
  {
    id: 'timescales-disruption',
    heading: 'Timescales and Disruption',
    content: (
      <>
        <p>
          Rewire timescales in Cardiff depend primarily on property size and construction type. The
          city's mix of modern new-builds and older terraces creates a wide range of typical project
          durations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terrace</strong> — 2 to 3 days. Cardiff terraces in Roath,
                Splott, and Adamsdown are generally straightforward with accessible timber floors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — 3 to 5 days. The standard duration
                for the most common Cardiff rewire project.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — 5 to 7 days. More circuits, longer cable
                runs, and additional floors increase the programme duration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian stone-built properties</strong> — add 2 to 4 days. Cathays,
                Canton, and Pontcanna properties with solid stone walls often require surface-run
                conduit rather than chased cables.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The property will be without mains power during working hours. Plan for this disruption
          and make arrangements for any medical equipment, vulnerable occupants, or business use of
          the property. Many Cardiff electricians can arrange a phased power-off schedule to
          minimise inconvenience.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-wales',
    heading: 'Part P Compliance in Wales',
    content: (
      <>
        <p>
          Part P of the Building Regulations applies in Wales under the Building Regulations 2010.
          The requirements are identical to England — a full rewire is notifiable work and must be
          certified to BS 7671.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification in Wales</strong> — NICEIC, NAPIT, and ELECSA registered
                contractors can self-certify rewiring work throughout Wales. They notify Building
                Control Wales on your behalf and you receive a compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiff Council building control</strong> — if the electrician is not scheme
                registered, notify Cardiff Council's building control service before work begins. An
                inspector may visit to check the installation before sign-off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC mandatory</strong> — an Electrical Installation Certificate must be
                issued on completion regardless of the notification route. The EIC is a legal
                document required for property sales.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-contractor',
    heading: 'Choosing a Rewire Contractor in Cardiff',
    content: (
      <>
        <p>
          Cardiff has a strong pool of qualified electrical contractors serving the city and the
          broader South Wales region. Follow these steps to appoint a reliable electrician for your
          rewire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check NICEIC or NAPIT registration</strong> — use the online registers to
                confirm current registration status. Both schemes assess technical competence,
                qualifications, and insurance coverage annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three written quotes</strong> — obtain detailed itemised quotes from at
                least three contractors. Each should confirm the number of circuits, consumer unit
                specification, accessories, EIC, and Part P notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify insurance</strong> — confirm the contractor holds public liability
                insurance of at least £1 million. Scheme members are required to maintain cover as a
                condition of registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Read recent reviews</strong> — check Google, Checkatrade, and Which? Trusted
                Traders for independent reviews from Cardiff customers. Recent reviews from rewire
                projects are the most relevant.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'guarantees-certification',
    heading: 'Guarantees and Certification',
    content: (
      <>
        <p>
          On completion of your Cardiff rewire, ensure you receive and store the following documents
          safely. They are required for property sales and remortgaging.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — the primary BS 7671
                compliance document including schedules of inspections and test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Compliance Certificate</strong> — from Building Control
                Wales or the competent person scheme confirming Part P compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workmanship guarantee</strong> — most reputable Cardiff contractors offer 1
                to 5 years. Confirm the scope and duration in your written contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Next inspection date</strong> — for owner-occupied properties, a new
                installation typically requires a next periodic inspection in 10 years. For rental
                properties, an EICR is required every 5 years.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Rewire Work in Cardiff',
    content: (
      <>
        <p>
          Cardiff and South Wales offer strong demand for rewiring work driven by an ageing housing
          stock. Electricians who issue professional certification on site and quote promptly win
          more work and build stronger reputations.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete and sign off your Electrical Installation Certificate on your phone
                  before you leave the property. Auto-populated test schedules and instant PDF
                  export mean the customer receives their certificate the same day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Rewire Quotes</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate detailed, itemised rewire quotes in minutes using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Win more Cardiff rewire jobs with professional quotes that clearly break down
                  materials, labour, and Part P notification.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Cardiff rewire business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, professional quoting, and job management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RewireCostCardiffPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Cardiff 2025 | Rewire Prices Wales"
      description="House rewire costs in Cardiff for 2025. Prices for all property sizes, Part P compliance in Wales, NICEIC and NAPIT contractors, signs you need a rewire, timescales, and certification explained."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Rewire Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Cardiff:{' '}
          <span className="text-yellow-400">2025 Prices & Wales Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about house rewire costs in Cardiff and Wales — property size price breakdowns, BS 7671 and Part P compliance, finding NICEIC and NAPIT registered contractors, signs your property needs rewiring, and what certification you should receive."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Rewiring in Cardiff"
      relatedPages={relatedPages}
      ctaHeading="Issue Electrical Installation Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, auto-populated test schedules, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
