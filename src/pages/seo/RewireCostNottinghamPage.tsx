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
  { label: 'Rewire Cost Nottingham', href: '/rewire-cost-nottingham' },
];

const tocItems = [
  { id: 'rewire-costs-nottingham', label: 'Rewire Costs in Nottingham' },
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
  'A full house rewire in Nottingham typically costs £2,500 to £6,500 depending on property size, with East Midlands labour rates sitting slightly below the national average.',
  'All rewiring work must comply with BS 7671:2018+A3:2024 (the 18th Edition Wiring Regulations) and be notified to the local authority under Part P of the Building Regulations.',
  'NICEIC and NAPIT registered contractors can self-certify rewiring work, meaning they notify Part P on your behalf — you do not need to apply for building control separately.',
  'Signs that a Nottingham property needs rewiring include rubber-insulated wiring (pre-1960s), a fuse box with rewirable fuses, single-core aluminium cables, lack of RCD protection, or a periodic inspection report with C1 or C2 observations.',
  'A typical rewire of a three-bedroom semi-detached house in Nottingham takes three to five days. Older Victorian and Edwardian properties in areas such as The Meadows, Lenton, and Mapperley may take longer.',
  'On completion, the electrician must issue an Electrical Installation Certificate (EIC) confirming compliance with BS 7671 — this is a legal document required for property sales.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Nottingham?',
    answer:
      'A full rewire in Nottingham typically costs £2,500 to £3,500 for a two-bedroom terrace, £3,500 to £5,000 for a three-bedroom semi-detached, and £4,500 to £6,500 or more for a four-bedroom detached property. East Midlands labour rates are generally 10 to 15 per cent below London rates, making Nottingham one of the more affordable major UK cities for rewiring work. These prices include materials, labour, and the Electrical Installation Certificate but exclude redecoration.',
  },
  {
    question: 'Do I need a rewire or just a consumer unit upgrade?',
    answer:
      'A consumer unit upgrade replaces only the fuse box and adds modern RCD protection. It is suitable when the existing wiring is in good condition (PVC-insulated cables, sound accessories) but the fuseboard is outdated. A full rewire is required when the cables themselves are deteriorated — rubber-insulated, lead-sheathed, or aluminium — or when an EICR has identified C1 or C2 observations relating to the wiring condition. A qualified electrician should carry out a periodic inspection to determine which is needed.',
  },
  {
    question: 'How long does a full rewire take in Nottingham?',
    answer:
      'A three-bedroom semi-detached house in Nottingham typically takes three to five working days for a full rewire. Two-bedroom terraces common in areas such as Radford and Sneinton can often be completed in two to three days. Larger detached properties or those with complicated layouts — including Victorian properties in areas such as West Bridgford — may take five to seven days or more. The property should be unoccupied during the rewire where possible.',
  },
  {
    question: 'Does a rewire need to be notified under Part P in Nottingham?',
    answer:
      "Yes. A full rewire is notifiable work under Part P of the Building Regulations in England. The work must be carried out by a competent person who is either registered with a Part P self-certification scheme (such as NICEIC or NAPIT) or the work must be notified to Nottingham City Council or the relevant district council's building control department. NICEIC and NAPIT registered contractors self-certify the work and notify building control on your behalf.",
  },
  {
    question: 'What certificate should I receive after a rewire in Nottingham?',
    answer:
      'On completion of a rewire, your electrician must issue an Electrical Installation Certificate (EIC) in accordance with BS 7671. The EIC should include schedules of inspections and test results for all circuits. If the work was self-certified under Part P, you should also receive a Building Regulations Compliance Certificate from the Local Authority Building Control (LABC) or Nottingham City Council. Keep both documents safely — they will be required when selling the property.',
  },
  {
    question: 'Can I live in my house during a rewire in Nottingham?',
    answer:
      'It is generally possible to remain in the property during a rewire, but it can be significantly disruptive. Electricians will need to lift floorboards, chase walls for cables, and there will be extended periods with no power to parts of the property. Many homeowners choose to stay elsewhere for the duration, particularly for larger properties. Your electrician should discuss the programme of works and agree a daily switching-off schedule before starting.',
  },
  {
    question: 'How do I find a reliable rewire electrician in Nottingham?',
    answer:
      'Use the NICEIC or NAPIT online registers to find registered contractors in Nottingham and the surrounding East Midlands area. Registration confirms qualifications, insurance, and regular technical assessment. Always obtain at least three quotes, check reviews on Google or Checkatrade, and verify that the contractor will provide an EIC and handle Part P notification. Avoid contractors who quote significantly below market rate or suggest the work does not need to be notified.',
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
    href: '/rewire-cost-leicester',
    title: 'Rewire Cost Leicester',
    description:
      'House rewire costs in Leicester and Leicestershire with local contractor guidance.',
    icon: Home,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'rewire-costs-nottingham',
    heading: 'House Rewire Costs in Nottingham (2025 Prices)',
    content: (
      <>
        <p>
          Rewire costs in Nottingham reflect East Midlands labour rates, which are generally 10 to
          15 per cent below the national average and around 20 to 30 per cent below inner London
          prices. Material costs are broadly consistent across the UK, so the main variable is
          labour.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat or studio</strong> — £1,800 to £2,800. Smaller properties
                in Nottingham city centre conversions and apartment blocks commonly fall in this
                range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £2,500 to £3,500. Common in areas such
                as Radford, Sneinton, Bulwell, and Basford. Typical 8 to 12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £3,500 to £5,000. The most common
                property type across suburbs such as Arnold, Carlton, and Beeston. Typically 12 to
                16 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — £4,500 to £6,500. Larger properties in West
                Bridgford, Edwalton, and Ruddington with complex layouts command the higher end of
                this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian properties</strong> — add 20 to 40 per cent for
                properties built before 1940. Solid walls require surface-run conduit rather than
                chased cables, and access is more difficult.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include stripping out the existing wiring, installing new PVC twin-and-earth
          cables, fitting a new consumer unit with RCD protection, installing new accessories
          (sockets, switches, light fittings), and issuing the Electrical Installation Certificate.
          Redecoration, plastering of chased walls, and floorboard replacement are not included and
          should be budgeted separately.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-rewire',
    heading: 'Signs Your Nottingham Property Needs a Rewire',
    content: (
      <>
        <p>
          Many properties in Nottingham — particularly Victorian and Edwardian terraces in The
          Meadows, Lenton, Sneinton, and Radford — retain original or mid-century wiring that is now
          beyond its safe service life. The following are clear indicators that a rewire is
          necessary.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated or fabric-braided cables</strong> — wiring installed before
                the 1960s uses rubber insulation that degrades, cracks, and exposes live conductors.
                This is a C1 (danger present) finding on any EICR and requires urgent remedial
                action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse box</strong> — an old fuse box with ceramic fuse holders and
                fuse wire indicates a pre-1970s installation. These provide very limited overcurrent
                protection and have no RCD protection for shock prevention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-core aluminium wiring</strong> — installed in some properties during
                the 1960s and 1970s as a cheaper alternative to copper. Aluminium wiring requires
                specialist assessment as it can cause overheating at connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — absence of residual current device protection
                on socket circuits is a C2 (potentially dangerous) observation under Regulation
                411.3.3 of BS 7671. An EICR will record this as requiring remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent circuit trips or blown fuses</strong> — persistent overcurrent
                events suggest the installation is overloaded or that cables are deteriorating. This
                should always be investigated by a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory EICR</strong> — a periodic inspection report containing C1 or
                C2 observations that cannot be resolved by targeted repairs indicates the
                installation is beyond economic repair and a rewire is more cost-effective.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are unsure whether your property needs a rewire, commission a{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            periodic inspection and EICR
          </SEOInternalLink>{' '}
          from a qualified Nottingham electrician. This will identify all defects and allow you to
          make an informed decision.
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
          A full rewire replaces all fixed electrical wiring from the incoming mains supply
          throughout the property. Understanding the process helps homeowners plan and set realistic
          expectations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix</strong> — removal of existing wiring, installation of new
                consumer unit position, running cables through floors and walls, installing back
                boxes for sockets and switches. This stage is the most disruptive, involving lifting
                floorboards and chasing or surface-running cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix</strong> — fitting the consumer unit, connecting all circuits,
                installing sockets, switches, and light fittings, making off the mains connection.
                The property regains full power at the end of this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> — comprehensive testing of all circuits
                including insulation resistance, earth continuity, and RCD operation in accordance
                with BS 7671 Chapter 64. Results are recorded on the test schedules forming part of
                the Electrical Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and notification</strong> — the electrician issues the
                Electrical Installation Certificate and notifies the work to the relevant authority
                under Part P. You receive a Building Regulations Compliance Certificate by post
                within a few weeks.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The new installation will include a modern consumer unit with Type A or Type B RCDs or
          RCBOs protecting all circuits, meeting current BS 7671 requirements. This provides
          significantly better protection against electric shock and electrical fires than older
          installations.
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
          The duration of a rewire depends on property size, construction type, and the condition of
          existing wiring. Nottingham properties span a wide range — from 1990s new-build estates in
          Clifton and Chilwell to Victorian terraces in the inner city.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terrace</strong> — 2 to 3 days. Straightforward cavity wall
                construction with timber floors allows efficient cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — 3 to 5 days. The most common rewire
                in Nottingham suburbs. A team of two electricians working efficiently can complete
                first and second fix within this timeframe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — 5 to 7 days. More circuits, longer cable
                runs, and additional floors add time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian solid-wall property</strong> — add 1 to 3 days. Surface-run
                mini-trunking or conduit is often more practical than chasing solid brick walls, and
                access to ceiling voids requires careful planning.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The property will have no mains power during the rewire, typically from approximately 8am
          until late afternoon each day. Some electricians can provide a temporary supply
          arrangement. Plan for no cooking, heating, or refrigeration during working hours, and make
          arrangements for pets and any vulnerable occupants accordingly.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-compliance',
    heading: 'Part P Compliance in Nottingham',
    content: (
      <>
        <p>
          Part P of the Building Regulations 2010 applies to all fixed electrical installation work
          in dwellings in England. A full rewire is notifiable work under Part P and must comply
          with BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification</strong> — electricians registered with a competent
                person scheme (NICEIC, NAPIT, ELECSA, or STROMA) can self-certify rewiring work.
                They notify the work to the local authority on your behalf and you receive a
                compliance certificate. This is the most common route for rewires in Nottingham.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control notification</strong> — if the electrician is not scheme
                registered, the work must be notified to Nottingham City Council building control
                (or the relevant district council) before work begins. A building control officer
                may inspect the work before sign-off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC required</strong> — all rewiring work must be accompanied by an
                Electrical Installation Certificate issued by the electrician. The EIC confirms the
                installation complies with BS 7671 and is a legal document. It is required for
                property sales and mortgage applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequence of non-compliance</strong> — rewiring work that has not been
                properly notified is a breach of Building Regulations. This can create difficulties
                when selling the property and may require a retrospective inspection report at
                additional cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-contractor',
    heading: 'Choosing a Rewire Contractor in Nottingham',
    content: (
      <>
        <p>
          Nottingham has a healthy pool of qualified electrical contractors. The following checks
          will help you appoint a reliable, competent electrician for your rewire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — use the online registers to confirm
                the contractor is currently registered and their scope covers domestic
                installations. Registration confirms qualifications, insurance, and regular
                technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get three quotes</strong> — obtain at least three detailed written quotes.
                Each quote should specify the number of circuits, consumer unit type, accessories
                included, and confirm that an EIC and Part P notification are included. Do not
                compare quotes that differ significantly in scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — verify the contractor carries a
                minimum of £1 million public liability insurance. This protects you if damage occurs
                during the rewire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local references</strong> — ask for references from recent rewire customers
                in the Nottingham area. A reputable local contractor will be happy to provide these.
                Check Google, Checkatrade, or Which? Trusted Traders for independent reviews.
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
          On completion of your rewire, you should receive the following documentation. Keep all
          certificates in a safe place as they will be required when selling the property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — the primary legal
                document confirming the rewire complies with BS 7671. Must include schedules of
                inspections and test results signed by the electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Compliance Certificate</strong> — issued by the
                competent person scheme or Nottingham City Council building control confirming Part
                P notification and compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manufacturer guarantees</strong> — the consumer unit and accessories should
                come with manufacturer guarantees, typically 5 to 10 years for quality components.
                Ask your electrician for these documents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workmanship guarantee</strong> — most reputable Nottingham contractors offer
                a workmanship guarantee of 1 to 5 years. Confirm this in writing before work begins
                and check what it covers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A new wiring installation in good condition should not require a periodic inspection for
          10 years in an owner-occupied property (5 years for rental properties). Keep the EIC and
          compliance certificate with your property deeds.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Rewire Work in Nottingham',
    content: (
      <>
        <p>
          The Nottingham and East Midlands market for rewiring work is strong, driven by a large
          stock of older housing. Electricians who work efficiently and produce professional
          paperwork win repeat business and referrals.
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
                  to complete your Electrical Installation Certificate and test schedules on your
                  phone while still at the property. Auto-populated circuit data, instant PDF
                  export, and no evening paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Faster, Win More Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional rewire quotes in minutes with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include materials, labour, and Part P fees in a clear, itemised format that
                  builds customer confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Nottingham rewire business with Elec-Mate"
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

export default function RewireCostNottinghamPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Nottingham 2025 | Rewire Prices East Midlands"
      description="House rewire costs in Nottingham for 2025. Prices for all property sizes, Part P compliance, NICEIC and NAPIT contractors, signs you need a rewire, timescales, and what certificate you should receive."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Rewire Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Nottingham:{' '}
          <span className="text-yellow-400">2025 Prices & East Midlands Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about house rewire costs in Nottingham and the East Midlands — property size price breakdowns, Part P compliance, finding NICEIC and NAPIT registered contractors, signs your property needs rewiring, timescales, and the certification you should receive."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Rewiring in Nottingham"
      relatedPages={relatedPages}
      ctaHeading="Issue Electrical Installation Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, auto-populated test schedules, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
