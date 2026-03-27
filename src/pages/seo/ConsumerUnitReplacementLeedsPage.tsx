import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  FileCheck2,
  PoundSterling,
  MapPin,
  Clock,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Consumer Unit Replacement Cost', href: '/guides/consumer-unit-replacement-cost' },
  { label: 'Leeds', href: '/guides/consumer-unit-replacement-leeds' },
];

const tocItems = [
  { id: 'overview', label: 'Consumer Unit Replacement in Leeds' },
  { id: 'leeds-pricing', label: 'Leeds Pricing' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'what-to-expect', label: 'What to Expect During Replacement' },
  { id: 'how-long', label: 'How Long Does It Take?' },
  { id: 'choosing-electrician', label: 'Choosing a Leeds Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in Leeds typically costs between £350 and £550 for most domestic properties, which is in line with Yorkshire averages and competitive compared to other major UK cities.',
  'Under Regulation 421.1.201 of BS 7671:2018+A3:2024, all domestic consumer units must be a type-tested coordinated assembly housed in a non-combustible (metal) enclosure.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations (England and Wales). A registered electrician will self-certify through NICEIC, NAPIT, or ELECSA.',
  'BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits up to 32 A and for cables concealed in walls at a depth less than 50 mm — covering virtually every circuit in a modern domestic installation.',
  'Leeds has a large stock of Victorian back-to-back terraced housing in areas such as Headingley, Hyde Park, and Beeston — many still have original or early consumer units that require replacement.',
];

const faqs = [
  {
    question: 'How much does a consumer unit replacement cost in Leeds in 2026?',
    answer:
      'A consumer unit replacement in Leeds in 2026 typically costs between £350 and £550. A 6-way board in a small flat or terraced house costs around £350 to £450. A 10-way board with RCBOs and SPD in a semi-detached house typically costs £450 to £550. Larger detached properties may cost £600 to £850. Leeds prices are generally lower than London and broadly in line with other Yorkshire cities.',
  },
  {
    question: 'Is consumer unit replacement notifiable under Part P in Leeds?',
    answer:
      'Yes. Consumer unit replacement is notifiable work under Part P of the Building Regulations in England and Wales. Your electrician must be registered with NICEIC, NAPIT, or ELECSA to self-certify the work, or you must notify Leeds City Council\'s Building Control before work begins. Failure to notify can cause complications when selling the property.',
  },
  {
    question: 'Do I need RCD protection when replacing a consumer unit in Leeds?',
    answer:
      'Yes. BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits rated up to 32 A and for cables concealed in walls at a depth less than 50 mm. In a modern installation, individual RCBOs on every circuit are the preferred solution, providing both overcurrent and residual current protection without nuisance tripping.',
  },
  {
    question: 'Why do many Leeds properties need a fuse board upgrade?',
    answer:
      'Leeds has a large concentration of Victorian and Edwardian back-to-back terraced houses in areas such as Headingley, Hyde Park, Chapeltown, and Harehills. Many of these properties still have original rewirable fuse boards (BS 3036) or early plastic consumer units installed in the 1960s to 1980s. These provide no meaningful RCD protection and use combustible enclosures that breach Regulation 421.1.201 of BS 7671:2018+A3:2024.',
  },
  {
    question: 'Do I need a surge protection device (SPD) during a consumer unit replacement in Leeds?',
    answer:
      'In most cases, yes. Since Amendment 2 to BS 7671:2018, the risk assessment under Regulation 443.4 almost always results in SPD installation being required for domestic consumer unit replacements. A Type 2 SPD adds approximately £60 to £120 to the material cost. Your electrician must carry out the assessment and document the outcome on the EIC.',
  },
  {
    question: 'How long does a consumer unit replacement take in a Leeds property?',
    answer:
      'A like-for-like replacement in a standard Leeds terraced or semi-detached house typically takes 4 to 6 hours, including isolation, removal, installation, reconnection, labelling, testing, and certification. Properties with ageing rubber-insulated wiring or earthing that requires upgrading may require a full day.',
  },
  {
    question: 'What paperwork should I receive after a consumer unit replacement in Leeds?',
    answer:
      'You should receive an Electrical Installation Certificate (EIC) documenting the design, construction, inspection, and testing of the new consumer unit. Where your electrician is registered with a competent person scheme, you will also receive a Building Regulations Compliance Certificate within 30 days. Both documents should be kept safely as they are required when selling the property.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost UK',
    description:
      'National price guide with material costs, labour rates, and trade pricing data.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations UK',
    description:
      'Detailed guide to the regulations governing consumer units including Amendment 3 changes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate Guide',
    description:
      'Everything about Electrical Installation Condition Reports — when you need one and what to expect.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for consumer unit replacements on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote consumer unit replacements with itemised materials, labour, and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description:
      'When and why to upgrade a consumer unit, including signs of an outdated board.',
    icon: Settings,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Consumer Unit Replacement in Leeds',
    content: (
      <>
        <p>
          Leeds is one of the fastest-growing cities in the UK, with a housing stock that spans
          Victorian back-to-back terraces in Hyde Park and Harehills, Edwardian semis in Chapel
          Allerton, inter-war housing in Morley and Pudsey, and modern developments in Kirkstall
          and the city centre. Many older properties across the city still have electrical
          installations that predate current regulations.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises be a type-tested
          coordinated assembly housed in a non-combustible (metal) enclosure. BS 7671 also requires
          30 mA RCD protection for socket-outlet circuits and cables concealed in walls — making
          modern metal consumer units with RCBOs the standard across Leeds.
        </p>
        <p>
          This guide covers everything you need to know about consumer unit replacement costs and
          requirements in Leeds — whether you are a homeowner in Headingley, a landlord managing
          HMO properties near the universities, or an electrician working across West Yorkshire.
        </p>
      </>
    ),
  },
  {
    id: 'leeds-pricing',
    heading: 'Leeds Consumer Unit Replacement Pricing',
    content: (
      <>
        <p>
          Leeds electricians typically charge day rates of £250 to £320 — competitive within the
          Yorkshire region and well below the London premium. Most domestic consumer unit
          replacements in Leeds are completed within a single working day, keeping total project
          costs manageable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Leeds Pricing Breakdown (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat or bedsit (6-way board)</strong> — £350 to £440 total.
                Common in purpose-built student flats and converted terraces near the universities.
                Materials: £120 to £200. Labour: £200 to £210. EIC: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard terraced house (10-way with RCBOs and SPD)</strong> — £430 to
                £550 total. The most common domestic job in Leeds. Materials: £240 to £360.
                Labour: £240 to £260. EIC and Part P: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger semi or detached (14-way high-integrity with SPD)</strong> — £550 to
                £800 total. For properties with 12+ circuits or new EV charger. Materials: £350
                to £500. Labour: £260 to £320. EIC and Part P: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase property</strong> — £1,100 to £1,700+ total. Required for
                larger homes with three-phase supply, workshops, or commercial premises.
                Materials: £450 to £750. Labour: £400 to £550. EIC and Part P: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          City centre postcodes (LS1 to LS3) may attract parking surcharges. Properties in
          outer suburbs such as Wetherby, Otley, and Garforth are served by a range of local
          electricians with competitive rates. Always request itemised quotes from at least three
          registered electricians.
        </p>
      </>
    ),
  },
  {
    id: 'when-needed',
    heading: 'When Is a Consumer Unit Replacement Needed?',
    content: (
      <>
        <p>
          In Leeds, the following warning signs are particularly common in the older housing stock
          found across the inner suburbs:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (BS 3036)</strong> — common in pre-1970s Leeds terraces.
                These provide no RCD protection and depend on correctly rated fuse wire to operate
                safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — since January 2016, Regulation 421.1.201
                of BS 7671 requires non-combustible (metal) enclosures for domestic consumer units.
                Plastic enclosures pose a fire risk in the event of an internal arc fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — BS 7671 requires 30 mA RCD protection on
                socket circuits and concealed cables. Boards without RCDs or RCBOs present a
                significant electric shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR C2 observation</strong> — if an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> has
                returned a C2 (potentially dangerous) observation relating to the consumer unit,
                replacement is strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adding new circuits</strong> — EV charger, loft conversion, kitchen
                renovation, or solar PV connection requiring additional ways on the board.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification in Leeds',
    content: (
      <>
        <p>
          Consumer unit replacement is classified as notifiable work under Part P of the Building
          Regulations in England and Wales. In Leeds, this means the work must either be carried
          out by an electrician registered with a competent person scheme — such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA —
          or the homeowner must notify Leeds City Council's Building Control department before
          work starts.
        </p>
        <p>
          An Electrical Installation Certificate (EIC) must be issued for the work under
          Regulation 421.1.201 of BS 7671. The EIC documents the design, construction, inspection,
          and testing of the installation. A registered electrician will self-certify the work and
          submit Part P notification automatically through their scheme provider.
        </p>
        <p>
          You should receive a copy of the EIC and a Building Regulations Compliance Certificate
          within 30 days. Keep these for conveyancing purposes.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During a Consumer Unit Replacement',
    content: (
      <>
        <p>
          Here is what happens during a typical consumer unit replacement in a Leeds property:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Survey and isolation</strong> — the electrician surveys the existing
                board, identifies all circuits, and safely isolates the mains at the DNO cutout.
                All power is off for the duration of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Remove old board</strong> — the existing consumer unit is
                disconnected and removed. Ageing cables or deteriorated connections may be
                identified at this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Install new consumer unit</strong> — the new metal consumer unit
                is mounted, fitted with RCBOs and SPD, and all circuits reconnected and labelled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Testing</strong> — every circuit is tested to BS 7671 standards:
                insulation resistance, earth fault loop impedance, RCD trip times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5: Certification</strong> — the electrician completes the{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                and submits Part P notification through their competent person scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Consumer Unit Replacement Take?',
    content: (
      <>
        <p>
          A standard like-for-like consumer unit replacement in a Leeds property typically takes
          4 to 6 hours, including all testing and certification.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Like-for-like replacement with adequate wiring and earthing. 4 to 6 hours. Common
              in post-1970s Leeds housing, modern flats, and purpose-built student accommodation.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Where earthing requires upgrading, meter tails need replacing, or additional circuits
              are being added. 6 to 10 hours. Common in Leeds back-to-backs and Victorian terraces
              with original rubber-insulated wiring.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician in Leeds',
    content: (
      <>
        <p>
          Leeds has a well-established pool of registered electricians serving the city and wider
          West Yorkshire. Here is what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — verify NICEIC, NAPIT, or
                ELECSA registration on the scheme's online register before booking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — materials, labour, Part P notification, and VAT
                should all be listed separately. Avoid single-figure quotes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC included in the quote</strong> — confirm the Electrical Installation
                Certificate and Part P notification are included in the price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reviews and reputation</strong> — check Google reviews and Checkatrade.
                Verify scheme membership before booking.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Find registered electricians for consumer unit replacement in Leeds"
          description="Elec-Mate connects you with NICEIC and NAPIT registered electricians across Leeds and West Yorkshire. Get itemised quotes, track your job, and receive your EIC digitally."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementLeedsPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Leeds | Fuse Board Upgrade Cost 2026"
      description="How much does a consumer unit replacement cost in Leeds in 2026? Local pricing for fuse board upgrades, Part P notification, what to expect, and how to choose a registered electrician in Leeds."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Leeds Price Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Consumer Unit Replacement Leeds:{' '}
          <span className="text-yellow-400">Cost Guide 2026</span>
        </>
      }
      heroSubtitle="Consumer unit replacement in Leeds typically costs £350 to £550. This guide covers local pricing for fuse board upgrades across the city — from Victorian back-to-backs in Hyde Park to semis in Chapel Allerton — including Part P notification, what to expect, and how to choose a registered electrician."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Leeds"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements in Leeds"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
