import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  MapPin,
  Clock,
  Home,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Consumer Unit Replacement Cost', href: '/guides/consumer-unit-replacement-cost' },
  { label: 'Birmingham', href: '/guides/consumer-unit-replacement-birmingham' },
];

const tocItems = [
  { id: 'overview', label: 'Consumer Unit Replacement in Birmingham' },
  { id: 'birmingham-pricing', label: 'Birmingham Pricing' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'what-to-expect', label: 'What to Expect During Replacement' },
  { id: 'how-long', label: 'How Long Does It Take?' },
  { id: 'choosing-electrician', label: 'Choosing a Birmingham Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in Birmingham typically costs between £350 and £600 for most domestic properties, which is broadly in line with the Midlands average and below the London premium.',
  'Under Regulation 421.1.201 of BS 7671:2018+A3:2024, all domestic consumer units must be a type-tested coordinated assembly housed in a non-combustible (metal) enclosure.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations (England and Wales). A registered electrician will self-certify through NICEIC, NAPIT, or ELECSA.',
  'BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits up to 32 A and for cables concealed in walls at a depth less than 50 mm — covering virtually every circuit in a modern domestic installation.',
  'Birmingham has a large stock of inter-war and post-war terraced housing — many still have original rewirable fuse boards or plastic consumer units that must be replaced to meet current standards.',
];

const faqs = [
  {
    question: 'How much does a consumer unit replacement cost in Birmingham in 2026?',
    answer:
      'A consumer unit replacement in Birmingham in 2026 typically costs between £350 and £600 for a standard domestic property. A basic 6-way board in a small flat or terraced house runs from around £350 to £450. A 10 to 12-way board with RCBOs and an SPD in a semi-detached house typically costs £450 to £600. Larger properties with more circuits may cost £650 to £900. Birmingham prices are generally lower than London but similar to other large Midlands cities.',
  },
  {
    question: 'Is a fuse board upgrade notifiable under Part P in Birmingham?',
    answer:
      "Yes. Consumer unit replacement is notifiable work under Part P of the Building Regulations in England and Wales. Your electrician must be registered with a competent person scheme (NICEIC, NAPIT, or ELECSA) to self-certify the work, or you must notify Birmingham City Council's Building Control department before the work begins. Failure to notify can cause problems when selling the property.",
  },
  {
    question: 'Do I need RCD protection when replacing a consumer unit in Birmingham?',
    answer:
      'Yes. BS 7671:2018+A3:2024 requires 30 mA RCD protection for socket-outlet circuits rated up to 32 A and for cables concealed in walls at a depth less than 50 mm. In practice, fitting individual RCBOs on every circuit is the preferred approach, as it provides both overcurrent and residual current protection per circuit without the nuisance tripping associated with split-load boards.',
  },
  {
    question: 'Why do many Birmingham properties need a consumer unit upgrade?',
    answer:
      'Birmingham has a substantial stock of inter-war terraced housing in areas such as Handsworth, Balsall Heath, Sparkbrook, and Erdington. Many of these properties still have original rewirable fuse boards (BS 3036) or early plastic consumer units installed in the 1970s and 1980s. These provide no RCD protection and use combustible plastic enclosures that no longer comply with Regulation 421.1.201 of BS 7671:2018+A3:2024.',
  },
  {
    question: 'Do I need an SPD fitted during a consumer unit replacement in Birmingham?',
    answer:
      'Since Amendment 2 to BS 7671:2018, surge protection devices (SPDs) are required in most new installations and consumer unit replacements. The risk assessment under Regulation 443.4 of BS 7671 almost always results in SPD installation being necessary for domestic premises. A Type 2 SPD adds approximately £60 to £120 to the material cost of a consumer unit replacement.',
  },
  {
    question: 'How long does a consumer unit replacement take in a Birmingham property?',
    answer:
      'A straightforward like-for-like replacement in a standard Birmingham terraced or semi-detached house typically takes 4 to 6 hours. This includes isolation, removal, installation, reconnection, labelling, testing, and completing the Electrical Installation Certificate. Older properties with deteriorated wiring or earthing that requires upgrading may take a full day.',
  },
  {
    question: 'What documents should I receive after a consumer unit replacement in Birmingham?',
    answer:
      'You should receive an Electrical Installation Certificate (EIC), which documents the design, construction, inspection, and testing of the new consumer unit. If your electrician is registered with a competent person scheme, you will also receive a Building Regulations Compliance Certificate within 30 days. Keep both documents safely — they are required when selling the property and may be requested by mortgage lenders or insurers.',
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
    description: 'When and why to upgrade a consumer unit, including signs of an outdated board.',
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
    heading: 'Consumer Unit Replacement in Birmingham',
    content: (
      <>
        <p>
          Birmingham is the UK's second largest city with a diverse housing stock spanning Victorian
          back-to-back terraces in Balsall Heath, inter-war semis in Sutton Coldfield, and large
          post-war council estates across Northfield and Castle Vale. Many of these properties still
          have ageing electrical installations with rewirable fuse boards or early plastic consumer
          units that no longer comply with current regulations.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises be a type-tested
          coordinated assembly housed in a non-combustible (metal) enclosure. BS 7671 also requires
          30 mA RCD protection for socket-outlet circuits and cables concealed in walls — making
          modern RCBO-fitted metal consumer units the standard for Birmingham homes.
        </p>
        <p>
          Whether you are a homeowner in Moseley upgrading an old fuse board, a landlord in
          Sparkbrook preparing a property for new tenants, or an electrician quoting work across the
          West Midlands, this guide covers everything you need to know about consumer unit
          replacement costs and requirements in Birmingham.
        </p>
      </>
    ),
  },
  {
    id: 'birmingham-pricing',
    heading: 'Birmingham Consumer Unit Replacement Pricing',
    content: (
      <>
        <p>
          Birmingham electricians charge day rates broadly in line with the Midlands average —
          typically £250 to £350 per day. This is significantly lower than London but reflects the
          city's higher costs compared to rural areas. Most consumer unit replacements in Birmingham
          are completed within a single day, keeping total costs competitive.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Birmingham Pricing Breakdown (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat or bedsit (6-way board)</strong> — £350 to £450 total. Common in
                purpose-built flats and converted terraces across Selly Oak and Edgbaston.
                Materials: £120 to £200. Labour: £200 to £220. EIC: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard terraced house (10-way with RCBOs and SPD)</strong> — £450 to £600
                total. The most common domestic job in Birmingham. Materials: £250 to £380. Labour:
                £250 to £280. EIC and Part P: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger semi or detached (14-way high-integrity with SPD)</strong> — £600 to
                £900 total. For properties with 12+ circuits, EV charger, or solar PV connection.
                Materials: £380 to £550. Labour: £280 to £350. EIC and Part P: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase property</strong> — £1,200 to £1,800+ total. Required for larger
                homes with three-phase supply, workshops, or commercial premises. Materials: £500 to
                £800. Labour: £450 to £600. EIC and Part P: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Properties in central Birmingham (B1 to B5) may attract slightly higher charges due to
          parking restrictions and congestion. Outer areas such as Solihull, Sutton Coldfield, and
          Bromsgrove offer similar or slightly lower rates. Always obtain at least three itemised
          quotes before proceeding.
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
          Birmingham's older housing stock means many of these warning signs appear regularly during
          electrical inspections across the city:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (BS 3036)</strong> — still found in many pre-1970s
                Birmingham properties. These provide no RCD protection and rely on correctly rated
                fuse wire. They are a significant fire and shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — since January 2016, domestic consumer units
                must use a non-combustible (metal) enclosure under Regulation 421.1.201 of BS 7671.
                A plastic enclosure is a fire risk in the event of an internal arc fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — BS 7671 requires 30 mA RCD protection for
                socket-outlet circuits and concealed cables. Boards without RCDs or RCBOs present a
                significant electric shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signs of overheating or damage</strong> — discolouration, burning smell, or
                visible damage to the consumer unit enclosure or connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR C2 observation</strong> — if an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> has
                identified a C2 (potentially dangerous) observation at the consumer unit,
                replacement is strongly recommended. Birmingham landlords are legally required to
                hold a valid EICR under the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adding new circuits</strong> — EV charger installation, loft conversion,
                kitchen renovation, or solar PV connection requiring additional ways on the board.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification in Birmingham',
    content: (
      <>
        <p>
          Consumer unit replacement is classified as notifiable work under Part P of the Building
          Regulations in England and Wales. In Birmingham, this means the work must either be
          carried out by an electrician registered with a competent person scheme — such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA — or
          the homeowner must notify Birmingham City Council's Building Control department before the
          work starts.
        </p>
        <p>
          Regulation 421.1.201 of BS 7671 confirms that an Electrical Installation Certificate (EIC)
          must be issued for consumer unit replacements. The EIC documents the design, construction,
          inspection, and testing of the installation. A registered electrician will self-certify
          the work and submit notification to Birmingham City Council through their scheme provider.
        </p>
        <p>
          If you use a non-registered electrician, you will need to apply to Birmingham City
          Council's Building Control for inspection before work begins — this typically costs £150
          to £300 and involves delays. Using a registered electrician avoids this process entirely
          and is strongly recommended.
        </p>
        <p>
          You should receive a copy of the EIC and a Building Regulations Compliance Certificate
          within 30 days of the work being completed. Keep these documents — they are required when
          selling the property.
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
          Here is what happens during a typical consumer unit replacement in a Birmingham property:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Survey and isolation</strong> — the electrician surveys the existing
                board, identifies all circuits, and safely isolates the mains supply at the DNO
                cutout. All power to the property is switched off for the duration of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Remove old board</strong> — the existing consumer unit is
                disconnected and removed. In older Birmingham properties, this may reveal ageing
                rubber-insulated cables that require attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Install new consumer unit</strong> — the new metal consumer unit is
                mounted, fitted with RCBOs and SPD, and all circuits are reconnected and clearly
                labelled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Testing</strong> — every circuit is tested to BS 7671 standards
                including insulation resistance, earth fault loop impedance, RCD trip times, and
                polarity checks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5: Certification</strong> — the electrician completes the{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                and submits Part P notification through their competent person scheme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In Birmingham terraced houses, the consumer unit is often located in the hallway or under
          the stairs. In inter-war semis, it may be in a cupboard near the front door or in the
          kitchen. Access arrangements and the location of the existing board should be confirmed
          with your electrician before work begins.
        </p>
      </>
    ),
  },
  {
    id: 'how-long',
    heading: 'How Long Does a Consumer Unit Replacement Take?',
    content: (
      <>
        <p>
          A straightforward like-for-like consumer unit replacement typically takes 4 to 6 hours in
          a standard Birmingham property. This includes isolation, removal, installation,
          reconnection, labelling, testing, and certification.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Like-for-like replacement in a property with adequate wiring and earthing. 4 to 6
              hours. Common in post-1970s Birmingham housing and modern flats.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Where meter tails need replacing, earthing requires upgrading, cables need extending,
              or additional circuits are being added. 6 to 10 hours — a full day. Common in pre-war
              Birmingham properties with rubber-insulated wiring.
            </p>
          </div>
        </div>
        <p>
          Birmingham-specific factors that can add time include dealing with ageing wiring in
          back-to-back terraces, upgrading earthing arrangements that do not meet current
          requirements, and accessing boards in tight understairs cupboards. Your electrician should
          give a clear time estimate after surveying the installation.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician in Birmingham',
    content: (
      <>
        <p>
          Birmingham has a large number of registered electricians. Here is how to choose the right
          one for your consumer unit replacement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — verify they are registered
                with NICEIC, NAPIT, or ELECSA. Check the scheme's online register. This is essential
                for Part P self-certification without the need for Building Control notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local to your area</strong> — choose an electrician based in your part of
                Birmingham or the West Midlands. Travel charges can add to the cost if the
                electrician is based far away.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — the quote should break down materials, labour,
                Part P notification, and VAT separately. Be cautious of single-figure quotes with no
                breakdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC included</strong> — confirm the quote includes an Electrical
                Installation Certificate and Part P notification. Some lower quotes exclude these.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reviews and reputation</strong> — check Google reviews, Checkatrade, or
                Trustpilot. Verify scheme registration before booking.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Find registered electricians for consumer unit replacement in Birmingham"
          description="Elec-Mate connects you with NICEIC and NAPIT registered electricians across Birmingham and the West Midlands. Get itemised quotes, track your job, and receive your EIC digitally."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementBirminghamPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Birmingham | Fuse Board Upgrade Cost 2026"
      description="How much does a consumer unit replacement cost in Birmingham in 2026? Local pricing for fuse board upgrades, Part P notification, what to expect, and how to choose a registered electrician in Birmingham."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Birmingham Price Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Consumer Unit Replacement Birmingham:{' '}
          <span className="text-yellow-400">Cost Guide 2026</span>
        </>
      }
      heroSubtitle="Consumer unit replacement in Birmingham typically costs £350 to £600 for a standard domestic property. This guide covers local pricing for fuse board upgrades across the city, from terraced houses in Handsworth to semis in Sutton Coldfield — including Part P notification, what to expect during the work, and how to choose a registered electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements in Birmingham"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
