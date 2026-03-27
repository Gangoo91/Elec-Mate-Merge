import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
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
  { label: 'Manchester', href: '/guides/consumer-unit-replacement-manchester' },
];

const tocItems = [
  { id: 'overview', label: 'Consumer Unit Replacement in Manchester' },
  { id: 'manchester-pricing', label: 'Manchester Pricing' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'what-to-expect', label: 'What to Expect During Replacement' },
  { id: 'how-long', label: 'How Long Does It Take?' },
  { id: 'choosing-electrician', label: 'Choosing a Manchester Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in Manchester typically costs between £450 and £2,300, generally 5% to 10% below London prices but in line with the national average for major cities.',
  'Under Regulation 421.1.201 of BS 7671:2018+A3:2024, all domestic consumer units must be a type-tested coordinated assembly housed in a non-combustible (metal) enclosure.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations. A registered electrician will self-certify through NICEIC, NAPIT, or ELECSA.',
  'BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits up to 32 A and for cables concealed in walls — covering virtually every circuit in a modern domestic installation.',
  'Greater Manchester has a mix of Victorian terraces, inter-war semis, and post-war estates — each presenting different challenges for fuse board replacement.',
];

const faqs = [
  {
    question: 'How much does a consumer unit replacement cost in Manchester in 2026?',
    answer:
      'A consumer unit replacement in Manchester in 2026 typically costs between £450 and £2,300. A basic 6-way board in a small flat costs around £450 to £650. A standard 10 to 12-way board with RCBOs and SPD in a terraced house costs £750 to £1,200. Larger properties with 14+ ways can reach £1,800 or more.',
  },
  {
    question: 'Is a fuse board upgrade notifiable under Part P in Manchester?',
    answer:
      'Yes. Consumer unit replacement is notifiable work under Part P of the Building Regulations in England and Wales. Your electrician must be registered with a competent person scheme (NICEIC, NAPIT, or ELECSA) to self-certify the work, or you must notify Manchester City Council Building Control before the work begins.',
  },
  {
    question: 'Do I need RCD protection when replacing a consumer unit in Manchester?',
    answer:
      'Yes. BS 7671:2018+A3:2024 requires 30 mA RCD protection for socket-outlet circuits rated up to 32 A and for cables concealed in walls at a depth less than 50 mm. Fitting individual RCBOs on every circuit is the preferred approach.',
  },
  {
    question: 'How long does a fuse board replacement take in Manchester?',
    answer:
      'A straightforward consumer unit replacement takes 4 to 6 hours. Older Manchester properties — particularly Victorian terraces in areas like Didsbury, Chorlton, or Withington — may take a full day if cables need extending or earthing needs upgrading.',
  },
  {
    question: 'Are electrician rates cheaper in Manchester than London?',
    answer:
      'Yes. Manchester electrician day rates typically range from £280 to £380, compared to £350 to £500 in London. This means a standard consumer unit replacement in Manchester is usually £100 to £300 less than the equivalent job in London.',
  },
  {
    question: 'Do I need an SPD when replacing a consumer unit in Manchester?',
    answer:
      'Since Amendment 2 to BS 7671:2018, surge protection devices (SPDs) are required in most new installations and consumer unit replacements. The risk assessment under Regulation 443.4 almost always results in SPD installation being necessary. An SPD adds approximately £80 to £150 to the material cost.',
  },
  {
    question: 'What areas of Greater Manchester do electricians cover?',
    answer:
      'Most Manchester electricians cover the Greater Manchester area including Bolton, Bury, Oldham, Rochdale, Salford, Stockport, Tameside, Trafford, and Wigan. Electricians based in the city centre may charge slightly more than those in outer boroughs. Choose an electrician local to your area to minimise travel costs.',
  },
  {
    question: 'Can my landlord refuse to replace a dangerous consumer unit in Manchester?',
    answer:
      'No. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must ensure electrical installations are inspected every 5 years and any C1 (danger present) or C2 (potentially dangerous) observations are rectified within 28 days. A dangerous consumer unit identified on an EICR must be replaced.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost UK',
    description: 'National price guide with material costs, labour rates, and trade pricing data.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations UK',
    description: 'Detailed guide to the regulations governing consumer units including Amendment 3.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate Guide',
    description: 'Everything about Electrical Installation Condition Reports.',
    icon: FileCheck2,
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
    description: 'Quote consumer unit replacements with itemised materials and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'When and why to upgrade, including signs of an outdated board.',
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
    heading: 'Consumer Unit Replacement in Manchester',
    content: (
      <>
        <p>
          Greater Manchester is the UK's second-largest metropolitan area, with over 2.8 million
          residents and a housing stock that ranges from Victorian mill workers' terraces in Ancoats
          to modern apartments in MediaCityUK. Many properties across the region still rely on
          outdated fuse boards that fail to meet current safety standards.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises be a type-tested
          coordinated assembly housed in a non-combustible (metal) enclosure. BS 7671 also requires
          30 mA RCD protection for socket-outlet circuits and cables concealed in walls.
        </p>
        <p>
          Whether you live in a terraced house in Salford, a semi-detached in Stockport, or a new
          build in Trafford, this guide covers the full cost of consumer unit replacement in the
          Manchester area — from materials and labour to Part P notification and certification.
        </p>
      </>
    ),
  },
  {
    id: 'manchester-pricing',
    heading: 'Manchester Consumer Unit Replacement Pricing',
    content: (
      <>
        <p>
          Manchester electrician day rates typically range from £280 to £380, making consumer unit
          replacement more affordable than in London but broadly in line with other major English
          cities such as Birmingham and Leeds. Trade material prices are consistent across the UK
          as most wholesalers operate nationally.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Manchester Pricing Breakdown (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat (6-way board, split-load RCDs)</strong> — £450 to £650 total.
                Materials: £150 to £250. Labour: £250 to £350. Part P and EIC: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard terraced house (10-way with RCBOs and SPD)</strong> — £750 to
                £1,200 total. The most common job in Manchester. Materials: £350 to £550. Labour:
                £300 to £500. Part P and EIC: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large semi or detached (14-way high-integrity with SPD)</strong> — £1,200 to
                £1,800 total. Materials: £650 to £950. Labour: £400 to £650. Part P and EIC: £50 to
                £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase property</strong> — £1,800 to £2,300+ total. Materials: £800 to
                £1,200. Labour: £600 to £900. Part P and EIC: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Areas closer to the city centre (Manchester M1-M4, Salford M5-M7) may attract slightly
          higher labour rates due to parking and access challenges. Outer areas including Wigan,
          Bolton, and Rochdale are generally at the lower end of the price range.
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
          Many Manchester properties — particularly the red-brick terraces built during the
          industrial era — still have outdated electrical installations. Here are the key signs:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (BS 3036)</strong> — common in pre-1970s Manchester terraces.
                No RCD protection, relying on correctly rated fuse wire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — must be replaced with a non-combustible
                metal enclosure under current regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — BS 7671 requires 30 mA RCD protection on
                socket circuits and concealed cables. Boards without RCDs or RCBOs are a
                significant shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR C2 observation</strong> — if an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> has flagged
                a C2 (potentially dangerous) issue at the board, replacement is strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overheating or burning smell</strong> — loose connections over decades
                can cause overheating. This requires immediate attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adding circuits</strong> — EV charger, extension, loft conversion, or solar
                PV requiring additional ways on the board.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification in Manchester',
    content: (
      <>
        <p>
          Consumer unit replacement is notifiable work under Part P of the Building Regulations in
          England and Wales. In Manchester, this means the work must be carried out by an electrician
          registered with a competent person scheme (such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA), or
          the homeowner must notify Manchester City Council Building Control before the work starts.
        </p>
        <p>
          Regulation 421.1.201 of BS 7671 confirms that an Electrical Installation Certificate (EIC)
          must be issued for consumer unit replacements. The registered electrician submits
          notification to the local authority through their scheme provider.
        </p>
        <p>
          For properties in other Greater Manchester boroughs — Salford, Stockport, Tameside,
          Trafford, Bolton, Bury, Oldham, Rochdale, or Wigan — notification is submitted to the
          relevant borough council. The competent person scheme handles this automatically when the
          electrician registers the work.
        </p>
        <p>
          You should receive a copy of the EIC and a Building Regulations Compliance Certificate
          within 30 days. Keep these documents — they are needed when selling the property.
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
          Here is the typical process for a consumer unit replacement in a Manchester property:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Survey and isolation</strong> — the electrician identifies all circuits and
                safely isolates the mains supply. All power to the property is switched off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remove old board</strong> — the existing consumer unit is disconnected and
                removed. In older Manchester terraces, expect some remedial cable work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Install new consumer unit</strong> — the new metal board is mounted, fitted
                with RCBOs and SPD, and all circuits reconnected and labelled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full testing</strong> — every circuit tested to BS 7671 including insulation
                resistance, earth fault loop impedance, RCD trip times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — the electrician completes the{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> and submits
                Part P notification through their competent person scheme.
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
          A standard consumer unit replacement takes 4 to 6 hours. More complex installations can
          take a full day.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Like-for-like replacement with adequate existing wiring and earthing. 4 to 6 hours.
              Common in 1950s to 1990s Manchester housing stock.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Meter tail replacement, earthing upgrade, cable extensions, or additional circuits.
              6 to 10 hours. Typical in Victorian and Edwardian Manchester properties where wiring
              may be in poor condition.
            </p>
          </div>
        </div>
        <p>
          Manchester-specific factors that add time include: old lead-sheathed cabling in pre-war
          terraces, boards located in damp cellars common to the area, and properties where the DNO
          cutout needs Electricity North West to attend first.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician in Manchester',
    content: (
      <>
        <p>
          Greater Manchester has a large pool of registered electricians. Here is how to find the
          right one:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — verify NICEIC, NAPIT, or
                ELECSA registration. Essential for Part P self-certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local to your borough</strong> — choose an electrician in your part of
                Greater Manchester to minimise travel costs. A Bolton electrician working in Stockport
                will add travel time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — materials, labour, Part P, and VAT listed
                separately. Get at least three quotes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC and Part P included</strong> — confirm the quote covers the Electrical
                Installation Certificate and Building Regulations notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — minimum £2 million. Ask for proof
                before work begins.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Find registered electricians in Manchester"
          description="Elec-Mate connects you with NICEIC and NAPIT registered electricians across Greater Manchester. Get itemised quotes and receive your EIC digitally."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementManchesterPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Manchester | Fuse Board Upgrade Cost 2026"
      description="How much does a consumer unit replacement cost in Manchester in 2026? Local pricing for fuse board upgrades across Greater Manchester, Part P notification, and how to choose a registered electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Manchester Price Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Consumer Unit Replacement Manchester:{' '}
          <span className="text-yellow-400">Cost Guide 2026</span>
        </>
      }
      heroSubtitle="What does a fuse board upgrade cost in Manchester? This guide covers local pricing across Greater Manchester — from city centre flats to Victorian terraces in Didsbury and Chorlton — including Part P notification, what to expect during the work, and how to choose a registered electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Manchester"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements in Manchester"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
