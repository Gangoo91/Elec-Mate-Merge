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
  { label: 'Rewire Cost Brighton', href: '/rewire-cost-brighton' },
];

const tocItems = [
  { id: 'rewire-costs-brighton', label: 'Rewire Costs in Brighton' },
  { id: 'brighton-housing-stock', label: "Brighton's Housing Stock" },
  { id: 'signs-you-need-rewire', label: 'Signs You Need a Rewire' },
  { id: 'what-rewire-involves', label: 'What a Rewire Involves' },
  { id: 'timescales-disruption', label: 'Timescales and Disruption' },
  { id: 'part-p-compliance', label: 'Part P Compliance' },
  { id: 'choosing-contractor', label: 'Choosing a Contractor' },
  { id: 'guarantees-certification', label: 'Guarantees and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "A full house rewire in Brighton typically costs £3,000 to £7,000 depending on property size. Brighton and Hove labour rates are among the higher in the South of England, reflecting the city's proximity to London and strong local property market.",
  'All rewiring work must comply with BS 7671:2018+A3:2024 and be notified under Part P of the Building Regulations 2010.',
  'NICEIC and NAPIT registered contractors can self-certify rewiring work in Brighton — they notify Brighton and Hove City Council building control on your behalf.',
  'Brighton has an exceptionally high proportion of Regency, Victorian, and Edwardian properties. The characteristic Brighton terrace with solid brick party walls and narrow rooms presents specific challenges for cable routing.',
  'The HMO and student rental market in Brighton and Hove is large. Landlords must hold a current EICR every five years under the 2020 Electrical Safety Standards Regulations.',
  'On completion, your electrician must issue an Electrical Installation Certificate (EIC) — a legal document required when selling a Brighton property.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Brighton?',
    answer:
      'A full rewire in Brighton typically costs £2,200 to £3,200 for a one-bedroom flat, £3,000 to £4,500 for a two-bedroom terrace, £4,000 to £5,800 for a three-bedroom semi-detached, and £5,000 to £7,000 for a four-bedroom detached. Brighton and Hove labour rates are among the higher in the South East, reflecting a strong local economy and proximity to London. These prices include materials, labour, and the Electrical Installation Certificate.',
  },
  {
    question: 'How long does a house rewire take in Brighton?',
    answer:
      'A two-bedroom flat or terrace in Brighton typically takes 2 to 4 days. Three-bedroom properties take 4 to 6 days. Regency and Victorian properties in areas such as Kemp Town, Seven Dials, and the Lanes present particular challenges — narrow rooms, solid brick party walls, and complex layouts often add 1 to 3 days compared with post-war properties of the same size. Larger detached properties can take 6 to 8 days.',
  },
  {
    question: 'Does rewiring in Brighton need Part P notification?',
    answer:
      "Yes. A full rewire is notifiable work under Part P of the Building Regulations 2010. NICEIC, NAPIT, and ELECSA registered electricians can self-certify the work and notify Brighton and Hove City Council building control on your behalf. If the electrician is not scheme registered, you must notify the council's building control department before work begins.",
  },
  {
    question: 'Why are Brighton rewire costs higher than elsewhere?',
    answer:
      "Brighton and Hove labour rates are elevated due to the city's strong economy, proximity to London, and relatively high cost of living. Parking restrictions in central Brighton can also add to the overall cost. Additionally, Brighton's large stock of Regency and Victorian properties is more complex to rewire than modern housing — solid walls, restricted access, and conservation area requirements can all add time and cost.",
  },
  {
    question: 'Do Brighton landlords need to rewire rental properties?',
    answer:
      'Not automatically, but landlords must have a valid EICR every five years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. If the EICR identifies C1 or C2 observations, remedial work must be completed within 28 days. Brighton and Hove City Council has an active private rented sector enforcement team and can impose civil penalties of up to £30,000 for non-compliance. If remedial work is extensive, a full rewire may be more cost-effective.',
  },
  {
    question: 'Are there conservation area restrictions on rewiring in Brighton?',
    answer:
      "Conservation area designation in Brighton (which covers much of the Regency and Victorian seafront area and parts of the Lanes) affects external alterations to properties but does not directly restrict internal electrical rewiring. However, listed building consent may be required for work to listed buildings, including internal alterations if they affect the character of the building. Consult Brighton and Hove City Council's planning department if your property is listed.",
  },
  {
    question: 'How do I find a qualified rewire electrician in Brighton?',
    answer:
      "Use the NICEIC or NAPIT online registers to find registered contractors in Brighton and East Sussex. Registration confirms qualifications, insurance, and regular technical assessment. Obtain at least three detailed written quotes, check Google and Checkatrade reviews, and confirm the contractor will provide an EIC and manage Part P notification. Experience with Brighton's Regency and Victorian properties is a useful additional qualification.",
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
    href: '/rewire-cost-southampton',
    title: 'Rewire Cost Southampton',
    description: 'House rewire costs in Southampton and Hampshire with local contractor guidance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description:
      'Issue EICs on your phone. Auto-populated test schedules, instant PDF, and Part P ready.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'rewire-costs-brighton',
    heading: 'House Rewire Costs in Brighton (2026 Prices)',
    content: (
      <>
        <p>
          Brighton and Hove has some of the highest rewire costs in the South of England outside
          London. Strong labour rates, parking restrictions in central Brighton, and a housing stock
          that is heavily weighted towards older properties all contribute to above-average costs.
          However, Brighton's property values also mean a rewire typically offers a strong return on
          investment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £2,200 to £3,200. Purpose-built blocks and
                converted Regency or Victorian houses throughout the city and Hove.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £3,000 to £4,500. Victorian terraces
                common in Hanover, Elm Grove, Roundhill, and Queens Park. Typically 8 to 14
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached or townhouse</strong> — £4,000 to £5,800. Common
                in Hove, Portslade, and the newer areas of Moulsecoomb and Whitehawk. Typically 12
                to 18 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached or large terrace</strong> — £5,000 to £7,000. Larger
                properties in Hove, Patcham, and Saltdean.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regency and early Victorian properties</strong> — add 30 to 50 per cent for
                pre-1850 properties in the Regency Square area, Kemp Town, and Seven Dials. Solid
                brick construction, multiple floors, and complex layouts significantly increase the
                rewire programme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include stripping existing wiring, installing new PVC twin-and-earth cables,
          fitting a modern consumer unit with RCD protection, installing new accessories, and
          issuing the Electrical Installation Certificate. Redecoration and plastering are separate
          costs and can be significant in Brighton's period properties.
        </p>
      </>
    ),
  },
  {
    id: 'brighton-housing-stock',
    heading: "Brighton's Housing Stock and Rewiring Challenges",
    content: (
      <>
        <p>
          Brighton and Hove has one of the highest concentrations of pre-1919 housing in England.
          This creates particular challenges and considerations for rewiring that are specific to
          the city.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regency terraces and townhouses</strong> — the iconic white stucco terraces
                of Brunswick Town, Kemp Town, and the seafront are typically four to six storeys.
                Long cable runs, solid construction, and basement kitchens make rewiring complex and
                expensive. Rewires in these properties regularly cost £8,000 to £15,000 or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces</strong> — the dense terraces of Hanover, Elm Grove, and
                Roundhill are two to three storeys with solid brick walls. Surface-run mini trunking
                or conduit is often the most practical solution for cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edwardian houses in Hove</strong> — large detached and semi-detached
                properties in central Hove with bay windows and complex room layouts. These are
                typically easier to rewire than central Brighton terraces but still take longer than
                post-war housing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conversions and HMOs</strong> — a significant proportion of Brighton's
                housing has been converted to flats or HMOs. These present additional complexity,
                particularly where the conversion involved non-standard electrical arrangements. A
                thorough survey before quoting is essential.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians with experience of Brighton's period housing stock are better placed to plan
          efficient cable routes and avoid problems during first fix. When choosing a contractor,
          ask specifically about their experience with properties of your type and era.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-rewire',
    heading: 'Signs Your Brighton Property Needs a Rewire',
    content: (
      <>
        <p>
          Given Brighton's large stock of pre-war properties and the significant HMO market, the
          city has a higher than average proportion of properties with wiring defects. These are the
          key warning signs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated or fabric-braided cables</strong> — pre-1960s wiring that
                is now cracked and deteriorated. Recorded as C1 (danger present) on any EICR,
                requiring immediate remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Original lead-sheathed wiring</strong> — found in some of Brighton's older
                Regency and Victorian properties. Lead sheathing is itself hazardous and the wiring
                will be severely deteriorated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse box</strong> — ceramic fuse holders with fuse wire, still
                found in some of Brighton's older rental properties. No modern overcurrent or RCD
                protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — absence of residual current device protection
                on socket circuits is a C2 (potentially dangerous) finding under BS 7671 Regulation
                411.3.3. Very common in pre-1990s Brighton properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory EICR</strong> — C1 or C2 observations that cannot be
                economically resolved through targeted repairs. In older Brighton properties, a full
                rewire often proves more cost-effective than piecemeal remediation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are buying a Brighton property, commission a{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            periodic inspection and EICR
          </SEOInternalLink>{' '}
          as part of your pre-purchase survey. This is particularly important for Regency and
          Victorian properties where the cost of electrical remediation can be significant.
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
          A full rewire replaces all fixed electrical wiring from the incoming mains connection
          throughout the property. In Brighton's older housing, this process often requires more
          planning and creativity than in modern housing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix</strong> — removal of existing wiring, routing new cables through
                the building fabric. In Brighton's solid-wall Victorian and Regency properties, this
                typically means surface-run conduit or trunking rather than chased cables. Sensitive
                handling of original plasterwork and cornicing is important.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix</strong> — fitting the consumer unit, connecting all circuits,
                installing sockets, switches, and light fittings. Power is restored at the end of
                this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> — comprehensive circuit testing to BS 7671
                Chapter 64 including insulation resistance, earth continuity, and RCD operation.
                Test results recorded on schedules forming part of the EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and Part P</strong> — EIC issued and work notified to Brighton
                and Hove City Council building control or via the competent person scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'timescales-disruption',
    heading: 'Timescales and Disruption',
    content: (
      <>
        <p>
          Rewire timescales in Brighton are typically longer than the national average due to the
          prevalence of complex, solid-wall period properties. Allow extra time and plan thoroughly
          before work begins.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat in a conversion</strong> — 2 to 3 days. Shorter cable runs
                but potentially complex shared-area wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom Victorian terrace</strong> — 3 to 5 days. Solid walls and narrow
                rooms in Hanover and Elm Grove add time compared with cavity wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached in Hove</strong> — 4 to 6 days. Larger Edwardian
                properties in central Hove with more circuits and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regency townhouse or large terrace</strong> — 6 to 10 days or more. Four to
                six storeys, long vertical cable runs, complex room layouts, and sensitive original
                features all add to the programme duration significantly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The property will be without mains power during working hours each day. Parking for the
          electrician's van can be challenging in central Brighton — discuss this with your
          contractor before work begins and allow for any parking costs in the overall budget.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-compliance',
    heading: 'Part P Compliance in Brighton',
    content: (
      <>
        <p>
          Part P of the Building Regulations 2010 applies across England including Brighton and
          Hove. A full rewire is notifiable work and must comply with BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification</strong> — NICEIC, NAPIT, and ELECSA registered
                electricians can self-certify rewiring work in Brighton and Hove. They notify
                Brighton and Hove City Council building control on your behalf and issue a
                compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control route</strong> — for non-scheme electricians, notify
                Brighton and Hove City Council building control before work begins. An inspector may
                check the installation before issuing a completion notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — if the property is listed, internal works may
                require listed building consent in addition to Part P compliance. Consult Brighton
                and Hove City Council's planning and conservation team before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC mandatory</strong> — an Electrical Installation Certificate must be
                issued on completion. This is required for property sales and is particularly
                important given the active Brighton property market.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-contractor',
    heading: 'Choosing a Rewire Contractor in Brighton',
    content: (
      <>
        <p>
          Brighton and Hove has a good range of qualified electrical contractors, though demand
          often exceeds supply, particularly in summer. Plan ahead and book early for rewire work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — confirm current registration using
                the online registers. Verify the contractor's scope covers full domestic rewiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Period property experience</strong> — ask specifically about experience with
                Brighton's Victorian and Regency housing. A contractor familiar with surface-run
                conduit solutions and sensitive plasterwork will produce a better result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three written quotes</strong> — itemised quotes covering circuits, consumer
                unit specification, accessories, EIC, and Part P notification. Compare like for like
                — a lower price may reflect fewer circuits or cheaper components.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Parking and access</strong> — discuss parking for the work vehicle before
                confirming the appointment. Central Brighton parking costs can be significant and
                are sometimes not included in quotes from contractors who are not familiar with the
                area.
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
          After your Brighton rewire, keep the following documents safely. In Brighton's active
          property market, missing certificates are a common cause of delays and renegotiation at
          sale.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — primary BS 7671
                compliance document including signed schedules of inspections and test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Compliance Certificate</strong> — confirms Part P
                compliance, issued by Brighton and Hove City Council or the competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workmanship guarantee</strong> — typically 1 to 5 years from reputable
                contractors. Confirm scope and duration before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Next inspection date</strong> — owner-occupied: EICR in 10 years. Rental
                properties: EICR every 5 years under the Electrical Safety Standards in the Private
                Rented Sector (England) Regulations 2020. Brighton and Hove enforces these
                regulations actively.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Rewire Work in Brighton and East Sussex',
    content: (
      <>
        <p>
          Brighton's large stock of period properties, active HMO market, and strong property prices
          make it one of the most rewarding markets for skilled domestic electricians in the South
          of England. Reputation and quality certification drive repeat business in this competitive
          market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete your Electrical Installation Certificate on your phone before leaving
                  the property. Auto-populated test schedules, instant PDF export, and same-day
                  delivery to the client — no evening paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Brighton Rewires Professionally</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate detailed, itemised rewire quotes in minutes with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . In Brighton's competitive market, a professional quote with clear circuit
                  breakdowns and Part P inclusions wins work over cheaper-looking alternatives.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Brighton rewire business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, professional quoting, and job management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RewireCostBrightonPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Brighton 2026 | Rewire East Sussex"
      description="House rewire costs in Brighton for 2026. Prices for all property sizes including Regency and Victorian terraces, Part P compliance, NICEIC and NAPIT contractors, signs you need a rewire, timescales, and certification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Rewire Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Brighton:{' '}
          <span className="text-yellow-400">2026 Prices & East Sussex Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about house rewire costs in Brighton and East Sussex — property size price breakdowns including Regency and Victorian properties, Part P compliance, finding NICEIC and NAPIT registered contractors, signs your property needs rewiring, and the certification you should receive."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Rewiring in Brighton"
      relatedPages={relatedPages}
      ctaHeading="Issue Electrical Installation Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, auto-populated test schedules, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
