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
  { label: 'London', href: '/guides/consumer-unit-replacement-london' },
];

const tocItems = [
  { id: 'overview', label: 'Consumer Unit Replacement in London' },
  { id: 'london-pricing', label: 'London Pricing' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'what-to-expect', label: 'What to Expect During Replacement' },
  { id: 'how-long', label: 'How Long Does It Take?' },
  { id: 'choosing-electrician', label: 'Choosing a London Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in London typically costs between £550 and £2,800, reflecting a 15% to 30% premium over the national average due to higher overheads, parking, congestion charges, and operating costs.',
  'Under Regulation 421.1.201 of BS 7671:2018+A3:2024, all domestic consumer units must be a type-tested coordinated assembly housed in a non-combustible (metal) enclosure.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations (England and Wales). A registered electrician will self-certify through NICEIC, NAPIT, or ELECSA.',
  'BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits up to 32 A and for cables concealed in walls — making RCBOs the preferred choice in modern boards.',
  'London properties often have unique challenges: Victorian terraced houses with ageing lead-sheathed cables, limited cupboard space for boards, and shared risers in mansion blocks.',
];

const faqs = [
  {
    question: 'How much does a consumer unit replacement cost in London in 2026?',
    answer:
      'A consumer unit replacement in London in 2026 typically costs between £550 and £2,800. A basic 6-way board in a small flat costs around £550 to £800. The most common job — a 10 to 12-way board with RCBOs and SPD in a terraced house — runs from £900 to £1,500. Larger properties or three-phase installations can reach £2,800 or more. London prices are 15% to 30% higher than the national average.',
  },
  {
    question: 'Why is a consumer unit replacement more expensive in London?',
    answer:
      'London electricians face higher overheads including commercial rent, congestion charges (£15 per day in the ULEZ zone), expensive parking, longer travel times between jobs, and higher insurance premiums. These costs are reflected in labour rates, which typically range from £350 to £500 per day compared to £250 to £350 elsewhere in England.',
  },
  {
    question: 'Is a fuse board upgrade notifiable under Part P in London?',
    answer:
      'Yes. Consumer unit replacement is notifiable work under Part P of the Building Regulations in England and Wales. Your electrician must be registered with a competent person scheme (NICEIC, NAPIT, or ELECSA) to self-certify the work, or you must notify your local Building Control body before the work begins. Failure to notify can cause issues when selling the property.',
  },
  {
    question: 'Do I need RCD protection when replacing a consumer unit?',
    answer:
      'Yes. BS 7671:2018+A3:2024 requires 30 mA RCD protection for socket-outlet circuits rated up to 32 A and for cables concealed in walls at a depth less than 50 mm. In practice, fitting individual RCBOs on every circuit is the preferred approach as it provides both overcurrent and earth leakage protection per circuit.',
  },
  {
    question: 'How long does a fuse board replacement take in a London flat?',
    answer:
      'A straightforward consumer unit replacement in a London flat typically takes 4 to 6 hours. However, older properties — particularly Victorian and Edwardian conversions — may take a full day if the wiring is in poor condition, cables need extending, or the earthing arrangements require upgrading. Your electrician should give you a time estimate after surveying the existing installation.',
  },
  {
    question: 'Can I get a consumer unit replaced in a London leasehold flat?',
    answer:
      'Yes, but you should check your lease first. Most leases allow internal electrical work including consumer unit replacement without freeholder consent, provided the work is carried out by a registered electrician and properly certified. If the consumer unit is in a shared cupboard or riser, you may need to coordinate access with the building management company.',
  },
  {
    question: 'Do I need an SPD fitted during a consumer unit replacement in London?',
    answer:
      'Since Amendment 2 to BS 7671:2018, surge protection devices (SPDs) are required in most new installations and consumer unit replacements. The risk assessment under Regulation 443.4 almost always results in SPD installation being necessary. London properties are not exempt. An SPD adds approximately £80 to £150 to the material cost.',
  },
  {
    question: 'What areas of London do electricians typically cover for fuse board replacements?',
    answer:
      'Most London electricians cover a specific region — North, South, East, or West London — rather than the entire city. When getting quotes, choose electricians based nearby to minimise travel charges. Zones 1 and 2 may attract additional parking surcharges. Electricians in outer boroughs such as Bromley, Croydon, Barnet, and Havering often offer lower rates than central London contractors.',
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
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate Guide',
    description:
      'Everything about Electrical Installation Condition Reports — when you need one and what to expect.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for consumer unit replacements on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
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
    heading: 'Consumer Unit Replacement in London',
    content: (
      <>
        <p>
          London is home to some of the oldest domestic electrical installations in the country.
          From Georgian townhouses in Islington to post-war council blocks in Lewisham, the
          capital's housing stock presents unique challenges for consumer unit replacement. Many
          properties still have original rewirable fuse boards, plastic consumer units, or
          split-load RCD boards that no longer meet current standards.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises be a type-tested
          coordinated assembly housed in a non-combustible (metal) enclosure. BS 7671 also requires
          30 mA RCD protection for socket-outlet circuits and cables concealed in walls — making
          modern RCBO-fitted boards essential for London homes.
        </p>
        <p>
          Whether you are a homeowner in Hackney looking to upgrade an old fuse board, or a landlord
          in Croydon preparing a property for new tenants, this guide covers everything you need to
          know about consumer unit replacement costs in London — including why prices here are
          higher than the rest of the UK.
        </p>
      </>
    ),
  },
  {
    id: 'london-pricing',
    heading: 'London Consumer Unit Replacement Pricing',
    content: (
      <>
        <p>
          London electricians charge a premium compared to the national average. Day rates in the
          capital range from £350 to £500, compared to £250 to £350 in most other English cities.
          This reflects higher operating costs including commercial rent, vehicle insurance, ULEZ
          and congestion charges, parking, and longer travel times between jobs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">London Pricing Breakdown (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat (6-way board, split-load RCDs)</strong> — £550 to £800 total.
                Common in purpose-built flats across zones 2 to 6. Materials: £150 to £250. Labour:
                £300 to £450. Part P and EIC: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard terraced house (10-way with RCBOs and SPD)</strong> — £900 to
                £1,500 total. The most common domestic job in London. Materials: £350 to £550.
                Labour: £400 to £600. Part P and EIC: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large detached or semi (14-way high-integrity with SPD)</strong> — £1,400 to
                £2,200 total. For properties with 12+ circuits, EV charger, and smart home systems.
                Materials: £650 to £950. Labour: £500 to £750. Part P and EIC: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase property</strong> — £2,000 to £2,800+ total. Required for larger
                homes with three-phase supply, workshops, or commercial conversions. Materials: £800
                to £1,200. Labour: £700 to £1,000. Part P and EIC: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Central London postcodes (W1, WC1, EC1, SW1) typically sit at the upper end due to parking
          restrictions, congestion charges, and the complexity of period buildings. Outer boroughs
          such as Bromley, Havering, Sutton, and Enfield are generally 10% to 15% cheaper.
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
          London's housing stock means many of these warning signs are common across the capital:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (BS 3036)</strong> — still common in pre-1970s London
                properties. These provide no RCD protection and rely on correctly rated fuse wire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — since January 2016, domestic consumer units
                must be metal (non-combustible). A plastic enclosure is a fire risk.
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
                <strong>Signs of overheating</strong> — discolouration, burning smell, or melted
                plastic. Common in older London boards where connections have loosened over decades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR C2 observation</strong> — if an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> has
                identified a C2 (potentially dangerous) observation at the consumer unit,
                replacement is strongly recommended. London landlords are legally required to have a
                valid EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adding circuits</strong> — EV charger installation, loft conversion, kitchen
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
    heading: 'Part P Notification in London',
    content: (
      <>
        <p>
          Consumer unit replacement is classified as notifiable work under Part P of the Building
          Regulations in England and Wales. In London, this means the work must either be carried
          out by an electrician registered with a competent person scheme (such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA), or
          the homeowner must notify their local council's Building Control department before the
          work starts.
        </p>
        <p>
          Regulation 421.1.201 of BS 7671 confirms that an Electrical Installation Certificate (EIC)
          must be issued for consumer unit replacements. The EIC documents the design, construction,
          inspection, and testing of the installation. A registered electrician will self-certify
          the work and submit notification to the relevant London borough council through their
          scheme provider.
        </p>
        <p>
          Each London borough has its own Building Control department. If you use a non-registered
          electrician, you will need to apply directly to your borough's Building Control for
          inspection — this typically costs £200 to £400 and involves delays. Using a registered
          electrician avoids this entirely.
        </p>
        <p>
          You should receive a copy of the EIC and a Building Regulations Compliance Certificate
          within 30 days of the work being completed. Keep these documents — they are required when
          selling the property and may be requested by mortgage lenders.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During a Consumer Unit Replacement',
    content: (
      <>
        <p>Here is what happens during a typical consumer unit replacement in a London property:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Survey and isolation</strong> — the electrician surveys the existing
                board, identifies all circuits, and safely isolates the mains supply at the DNO
                cutout. All power to the property is switched off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Remove old board</strong> — the existing consumer unit is
                disconnected and removed. In older London properties, this may reveal ageing cables
                that need attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Install new consumer unit</strong> — the new metal consumer unit is
                mounted, fitted with RCBOs and SPD, and all circuits reconnected and labelled.
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
                <SEOInternalLink href="/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                and submits Part P notification through their competent person scheme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In London flats, the consumer unit is often located in a hallway cupboard or near the
          front door. In Victorian terraced houses, it may be under the stairs or in the cellar.
          Access arrangements should be discussed before the work starts.
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
          A straightforward like-for-like consumer unit replacement typically takes 4 to 6 hours.
          This includes isolation, removal, installation, reconnection, labelling, testing, and
          certification.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Like-for-like replacement in a property with adequate wiring and earthing. 4 to 6
              hours. Common in post-1970s London housing and modern flats.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Where meter tails need replacing, earthing requires upgrading, cables need extending,
              or additional circuits are being added. 6 to 10 hours — a full day. Common in
              Victorian and Edwardian London properties.
            </p>
          </div>
        </div>
        <p>
          London-specific factors that add time include: accessing boards in tight cupboards under
          stairs, coordinating with building management in mansion blocks, dealing with
          lead-sheathed cables in pre-war properties, and working around asbestos (which requires a
          separate specialist if disturbed).
        </p>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician in London',
    content: (
      <>
        <p>
          London has thousands of registered electricians. Here is how to choose the right one for
          your consumer unit replacement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — verify they are registered
                with NICEIC, NAPIT, or ELECSA. Check their registration number on the scheme's
                website. This is essential for Part P self-certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local to your area</strong> — choose an electrician based in your part of
                London. A Bromley-based electrician working in Barnet will add travel time and cost.
                Most London electricians specialise in a cluster of boroughs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — the quote should break down materials, labour,
                Part P notification, and VAT separately. Be wary of single-figure quotes with no
                breakdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC included</strong> — confirm the quote includes an Electrical
                Installation Certificate and Part P notification. Some cheaper quotes exclude these
                essentials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reviews and reputation</strong> — check Google reviews, Checkatrade, or
                Trustpilot. London has a high volume of electricians and unfortunately some
                unregistered operators. Verify before booking.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Find registered electricians for consumer unit replacement"
          description="Elec-Mate connects you with NICEIC and NAPIT registered electricians in your area of London. Get itemised quotes, track your job, and receive your EIC digitally."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementLondonPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement London | Fuse Board Upgrade Cost 2026"
      description="How much does a consumer unit replacement cost in London in 2026? Local pricing for fuse board upgrades, Part P notification, what to expect, and how to choose a registered electrician in London."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="London Price Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Consumer Unit Replacement London: <span className="text-yellow-400">Cost Guide 2026</span>
        </>
      }
      heroSubtitle="London consumer unit replacement costs are 15% to 30% higher than the national average. This guide covers local pricing for fuse board upgrades across the capital, from zone 1 flats to outer borough houses — including Part P notification, what to expect during the work, and how to choose a registered electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in London"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements in London"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
