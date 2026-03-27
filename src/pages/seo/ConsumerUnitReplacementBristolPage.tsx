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
  { label: 'Bristol', href: '/guides/consumer-unit-replacement-bristol' },
];

const tocItems = [
  { id: 'overview', label: 'Consumer Unit Replacement in Bristol' },
  { id: 'bristol-pricing', label: 'Bristol Pricing' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'what-to-expect', label: 'What to Expect During Replacement' },
  { id: 'how-long', label: 'How Long Does It Take?' },
  { id: 'choosing-electrician', label: 'Choosing a Bristol Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in Bristol typically costs between £380 and £650 for most domestic properties — towards the higher end of English regional cities, reflecting Bristol\'s elevated labour rates and strong economic activity.',
  'Under Regulation 421.1.201 of BS 7671:2018+A3:2024, all domestic consumer units must be a type-tested coordinated assembly housed in a non-combustible (metal) enclosure.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations (England and Wales). A registered electrician will self-certify through NICEIC, NAPIT, or ELECSA.',
  'BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits up to 32 A and for cables concealed in walls at a depth less than 50 mm — covering virtually every circuit in a modern domestic installation.',
  'Bristol has a significant stock of Victorian and Edwardian terraced housing in areas such as Easton, Totterdown, Bishopston, and Bedminster — many of which still have outdated consumer units or rewirable fuse boards.',
];

const faqs = [
  {
    question: 'How much does a consumer unit replacement cost in Bristol in 2026?',
    answer:
      'A consumer unit replacement in Bristol in 2026 typically costs between £380 and £650. A 6-way board in a small flat costs around £380 to £480. A 10-way board with RCBOs and SPD in a terraced house typically costs £480 to £650. Larger semi-detached or detached properties may reach £700 to £950. Bristol prices are among the higher of English regional cities outside London, reflecting strong demand and elevated labour rates.',
  },
  {
    question: 'Is consumer unit replacement notifiable under Part P in Bristol?',
    answer:
      'Yes. Consumer unit replacement is notifiable work under Part P of the Building Regulations in England and Wales. Your electrician must be registered with NICEIC, NAPIT, or ELECSA to self-certify the work, or you must notify Bristol City Council\'s Building Control department before work begins. Failing to notify can cause complications when selling the property.',
  },
  {
    question: 'Do I need RCD protection when replacing a consumer unit in Bristol?',
    answer:
      'Yes. BS 7671:2018+A3:2024 requires 30 mA RCD protection for socket-outlet circuits rated up to 32 A and for cables concealed in walls at a depth less than 50 mm. Individual RCBOs on each circuit are the preferred modern solution, providing overcurrent and residual current protection per circuit.',
  },
  {
    question: 'Why are consumer unit replacement costs higher in Bristol than some other cities?',
    answer:
      'Bristol\'s electricians face higher operating costs compared to many English regional cities. Bristol consistently records some of the highest wages outside London, and demand for skilled trades remains strong due to high levels of construction and renovation activity across the city. The Clean Air Zone may also add minor costs for tradespeople working in the city centre.',
  },
  {
    question: 'Do I need an SPD when replacing a consumer unit in Bristol?',
    answer:
      'In most cases, yes. The risk assessment under Regulation 443.4 of BS 7671 almost always results in surge protection device (SPD) installation being required for domestic consumer unit replacements. A Type 2 SPD typically adds £70 to £130 to the material cost. The assessment must be documented on the Electrical Installation Certificate.',
  },
  {
    question: 'How long does a consumer unit replacement take in a Bristol property?',
    answer:
      'A standard like-for-like consumer unit replacement in a Bristol terraced or semi-detached house typically takes 4 to 6 hours, including isolation, removal, installation, testing, and certification. Older Bristol properties with rubber-insulated wiring or inadequate earthing may require a full day.',
  },
  {
    question: 'What documents should I receive after a consumer unit replacement in Bristol?',
    answer:
      'You should receive an Electrical Installation Certificate (EIC) and, within 30 days, a Building Regulations Compliance Certificate from your electrician\'s competent person scheme. Keep both — they are required when selling the property and may be requested by mortgage lenders.',
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
    heading: 'Consumer Unit Replacement in Bristol',
    content: (
      <>
        <p>
          Bristol is one of England's most vibrant regional cities, with a housing stock that spans
          Victorian terraces in Totterdown and Easton, Edwardian semis in Bishopston and Horfield,
          Georgian townhouses in Clifton, and modern developments along the waterfront. The city's
          thriving population and active housing market mean that consumer unit replacements are
          among the most in-demand electrical jobs across Bristol.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises be a type-tested
          coordinated assembly housed in a non-combustible (metal) enclosure. BS 7671 also requires
          30 mA RCD protection for socket-outlet circuits and cables concealed in walls — making
          modern RCBO-fitted metal boards the standard for Bristol homes.
        </p>
        <p>
          Whether you are a homeowner in Clifton upgrading an ageing board, a landlord in Easton
          bringing a property up to standard, or an electrician quoting across the Bristol area,
          this guide covers costs, regulations, and what to expect during a consumer unit
          replacement in Bristol.
        </p>
      </>
    ),
  },
  {
    id: 'bristol-pricing',
    heading: 'Bristol Consumer Unit Replacement Pricing',
    content: (
      <>
        <p>
          Bristol electricians typically charge day rates of £280 to £380 — towards the upper
          end of English regional rates, reflecting the city's high wages, strong trade demand,
          and Clean Air Zone operating considerations. Most domestic consumer unit replacements
          are completed within a single working day.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Bristol Pricing Breakdown (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat (6-way board)</strong> — £380 to £480 total. Common in
                purpose-built flats and converted terraces in Bedminster, Easton, and Southville.
                Materials: £130 to £210. Labour: £220 to £260. EIC: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard terraced house (10-way with RCBOs and SPD)</strong> — £480 to
                £650 total. The most common domestic job in Bristol. Materials: £260 to £390.
                Labour: £260 to £310. EIC and Part P: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger semi or detached (14-way high-integrity with SPD)</strong> — £620 to
                £950 total. For properties with 12+ circuits, EV charger, or solar PV.
                Materials: £380 to £560. Labour: £300 to £380. EIC and Part P: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase property</strong> — £1,300 to £1,900+ total. Required for
                larger homes or commercial premises with three-phase supply. Materials: £520 to
                £820. Labour: £460 to £620. EIC and Part P: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Properties within Bristol's Clean Air Zone may attract a small surcharge from
          electricians operating diesel vans. Outer areas such as Yate, Keynsham, and Nailsea
          may offer slightly more competitive rates from local contractors. Always obtain at
          least three itemised quotes.
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
          Bristol's older housing stock means that these warning signs are commonly found during
          electrical inspections across the inner suburbs:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (BS 3036)</strong> — still found in many pre-1970s Bristol
                properties. These provide no RCD protection and carry a significant shock and fire
                risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — since January 2016, Regulation 421.1.201
                of BS 7671 requires non-combustible (metal) enclosures. A plastic enclosure is a
                fire risk in the event of an internal arc fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — BS 7671 requires 30 mA RCD protection on
                socket circuits and concealed cables. Boards without RCDs or RCBOs are a significant
                electric shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR C2 observation</strong> — if an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> has
                identified a C2 (potentially dangerous) observation at the consumer unit,
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
    heading: 'Part P Notification in Bristol',
    content: (
      <>
        <p>
          Consumer unit replacement is classified as notifiable work under Part P of the Building
          Regulations in England and Wales. In Bristol, the work must either be carried out by an
          electrician registered with a competent person scheme — such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA —
          or the homeowner must notify Bristol City Council's Building Control department before
          work begins.
        </p>
        <p>
          An Electrical Installation Certificate (EIC) must be issued under Regulation 421.1.201
          of BS 7671. A registered electrician self-certifies and submits Part P notification
          automatically through their scheme. You should receive a Building Regulations
          Compliance Certificate within 30 days of the work being completed.
        </p>
        <p>
          Keep both the EIC and the Compliance Certificate — they are required when selling the
          property and may be requested by mortgage lenders or home insurers.
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
          Here is what happens during a typical consumer unit replacement in a Bristol property:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Survey and isolation</strong> — the electrician surveys the board,
                identifies all circuits, and safely isolates the mains at the DNO cutout. All
                power is off for the duration of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Remove old board</strong> — the existing consumer unit is
                disconnected and removed. Ageing cables, earthing issues, or deteriorated
                connections may be identified at this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Install new consumer unit</strong> — a new metal consumer unit
                is mounted, fitted with RCBOs and SPD, all circuits reconnected and labelled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Testing</strong> — all circuits tested to BS 7671: insulation
                resistance, earth fault loop impedance, RCD trip times, and polarity checks.
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
          A standard like-for-like consumer unit replacement in a Bristol property typically takes
          4 to 6 hours, including all testing and certification.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Like-for-like replacement with adequate wiring and earthing. 4 to 6 hours. Common
              in post-1970s Bristol housing and modern waterfront developments.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Where earthing requires upgrading, meter tails need replacing, or cables need
              extending. 6 to 10 hours. Common in Bristol's Victorian and Edwardian terraces
              with original rubber-insulated wiring.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician in Bristol',
    content: (
      <>
        <p>
          Bristol has a strong pool of registered electricians. Here is what to look for when
          choosing one for a consumer unit replacement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — verify NICEIC, NAPIT, or
                ELECSA registration before booking. Essential for Part P self-certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — materials, labour, Part P notification, and VAT
                should all be itemised separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC included</strong> — confirm the Electrical Installation Certificate
                and Part P notification are included in the price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reviews and reputation</strong> — check Google reviews and Checkatrade.
                Verify scheme registration before booking.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Find registered electricians for consumer unit replacement in Bristol"
          description="Elec-Mate connects you with NICEIC and NAPIT registered electricians across Bristol and the South West. Get itemised quotes, track your job, and receive your EIC digitally."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementBristolPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Bristol | Fuse Board Upgrade Cost 2026"
      description="How much does a consumer unit replacement cost in Bristol in 2026? Local pricing for fuse board upgrades, Part P notification, what to expect, and how to choose a registered electrician in Bristol."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Bristol Price Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Consumer Unit Replacement Bristol:{' '}
          <span className="text-yellow-400">Cost Guide 2026</span>
        </>
      }
      heroSubtitle="Consumer unit replacement in Bristol typically costs £380 to £650 — among the higher of English regional cities, reflecting strong local demand. This guide covers local pricing, Part P notification, what to expect during the work, and how to choose a registered electrician in Bristol."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Bristol"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements in Bristol"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
