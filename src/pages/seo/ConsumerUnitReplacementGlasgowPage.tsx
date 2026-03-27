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
  { label: 'Glasgow', href: '/guides/consumer-unit-replacement-glasgow' },
];

const tocItems = [
  { id: 'overview', label: 'Consumer Unit Replacement in Glasgow' },
  { id: 'glasgow-pricing', label: 'Glasgow Pricing' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'scotland-regulations', label: 'Scottish Building Regulations' },
  { id: 'what-to-expect', label: 'What to Expect During Replacement' },
  { id: 'how-long', label: 'How Long Does It Take?' },
  { id: 'choosing-electrician', label: 'Choosing a Glasgow Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in Glasgow typically costs between £300 and £550, which is competitive relative to other major UK cities and reflects lower labour overheads in central Scotland.',
  'Under Regulation 421.1.201 of BS 7671:2018+A3:2024, all domestic consumer units must be a type-tested coordinated assembly housed in a non-combustible (metal) enclosure — this applies equally in Scotland.',
  'In Scotland, consumer unit replacement is notifiable work under the Building (Scotland) Regulations 2004. It must be carried out by a registered person or notified to the local authority verifier (typically Glasgow City Council).',
  'BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits up to 32 A and for cables concealed in walls at a depth less than 50 mm — covering virtually every circuit in a modern domestic installation.',
  'Glasgow has a large stock of tenement flats and inter-war council housing in areas such as Govan, Pollokshields, and Maryhill — many still have original consumer units or split-load boards without individual RCBO protection.',
];

const faqs = [
  {
    question: 'How much does a consumer unit replacement cost in Glasgow in 2026?',
    answer:
      'A consumer unit replacement in Glasgow in 2026 typically costs between £300 and £550 for most domestic properties. A 6-way board in a tenement flat typically costs £300 to £400. A 10-way board with RCBOs and SPD in a terraced or semi-detached house costs £400 to £550. Larger properties may cost £600 to £850. Glasgow prices are generally among the most competitive of any major UK city.',
  },
  {
    question: 'Are building regulations different for consumer unit replacement in Scotland?',
    answer:
      'Yes. Scotland has its own building regulations under the Building (Scotland) Regulations 2004, separate from the Part P regime in England and Wales. Consumer unit replacement is notifiable work. The work must either be carried out by a registered person (for example, a SELECT or NICEIC-registered electrician who is also registered under the Scottish Certifier of Construction scheme) or notified to the local authority building standards verifier before work begins. Glasgow City Council is the local authority verifier for properties in Glasgow.',
  },
  {
    question: 'Do I need RCD protection when replacing a consumer unit in Glasgow?',
    answer:
      'Yes. BS 7671:2018+A3:2024 requires 30 mA RCD protection for socket-outlet circuits rated up to 32 A and for cables concealed in walls at a depth less than 50 mm. BS 7671 applies in Scotland as the national standard. Fitting individual RCBOs on every circuit is the modern approach and is strongly recommended.',
  },
  {
    question: 'Do I need an SPD when replacing a consumer unit in Glasgow?',
    answer:
      'In most cases, yes. The risk assessment under Regulation 443.4 of BS 7671 almost always results in surge protection device (SPD) installation being required for domestic consumer unit replacements. A Type 2 SPD adds approximately £60 to £110 to the material cost. Your electrician must document the assessment on the Electrical Installation Certificate.',
  },
  {
    question: 'What is SELECT and do I need a SELECT-registered electrician in Glasgow?',
    answer:
      'SELECT (the Electrical Contractors\' Association of Scotland) is the trade association for the Scottish electrical contracting industry. SELECT-registered electricians have demonstrated competence and are assessed regularly. In Scotland, electricians must be registered under the Scottish Certifier of Construction (Electrical Installations) scheme to self-certify notifiable work. SELECT registration can support this, but NICEIC and NAPIT also have schemes accepted in Scotland. Always verify the specific certification with your electrician.',
  },
  {
    question: 'How long does a consumer unit replacement take in a Glasgow tenement flat?',
    answer:
      'A consumer unit replacement in a Glasgow tenement flat typically takes 4 to 6 hours. Tenement flats often have relatively few circuits (lighting, ring main, cooker, and immersion heater) which keeps the work straightforward. Older properties with rubber-insulated wiring or inadequate earthing arrangements may require a full day.',
  },
  {
    question: 'Can a landlord in Glasgow be forced to upgrade a consumer unit?',
    answer:
      'Yes. Under the Housing (Scotland) Act 2006 Repairing Standard, private landlords in Scotland must ensure that the electrical installation in a let property is in a reasonable state of repair and in proper working order. An EICR identifying C1 or C2 observations at the consumer unit triggers an obligation to carry out remedial work. Tenants can refer non-compliant landlords to the First-tier Tribunal for Scotland (Housing and Property Chamber). Glasgow City Council also has enforcement powers through local authority licensing of HMOs.',
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
    heading: 'Consumer Unit Replacement in Glasgow',
    content: (
      <>
        <p>
          Glasgow is Scotland's largest city, with a housing stock ranging from Victorian tenement
          flats in the West End and Southside to post-war council housing in Castlemilk, Drumchapel,
          and Pollok. Many properties — particularly tenements and inter-war houses — still have
          electrical installations that predate current requirements, including rewirable fuse boards
          and early plastic consumer units.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises be a type-tested
          coordinated assembly housed in a non-combustible (metal) enclosure. BS 7671 also requires
          30 mA RCD protection for socket-outlet circuits and cables concealed in walls. BS 7671 is
          the national standard and applies equally in Scotland.
        </p>
        <p>
          This guide covers everything you need to know about consumer unit replacement costs and
          requirements in Glasgow — including how Scottish Building Regulations differ from the
          Part P regime in England and Wales.
        </p>
      </>
    ),
  },
  {
    id: 'glasgow-pricing',
    heading: 'Glasgow Consumer Unit Replacement Pricing',
    content: (
      <>
        <p>
          Glasgow electricians typically charge day rates of £220 to £300 — among the most
          competitive of any major UK city. Lower commercial rents, operating costs, and living
          expenses in central Scotland are reflected in these rates. Most domestic consumer unit
          replacements in Glasgow are completed within a single day.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Glasgow Pricing Breakdown (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenement flat (6-way board)</strong> — £300 to £400 total. The most
                common domestic job in central Glasgow. Materials: £110 to £190. Labour: £180 to
                £200. EIC: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard terraced or semi (10-way with RCBOs and SPD)</strong> — £380 to
                £550 total. Materials: £230 to £340. Labour: £220 to £250. EIC and certification:
                £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger detached (14-way high-integrity with SPD)</strong> — £500 to £780
                total. For properties with 12+ circuits, EV charger, or solar PV. Materials: £320
                to £480. Labour: £250 to £300. EIC and certification: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase property</strong> — £1,000 to £1,600+ total. Required for
                larger homes or commercial premises with three-phase supply. Materials: £420 to
                £700. Labour: £380 to £500. EIC and certification: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Areas within the Glasgow city centre (G1 to G5) may carry minor parking surcharges.
          Outer areas such as Paisley, East Kilbride, and Motherwell have similar or slightly
          lower rates. Always obtain at least three itemised quotes.
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
          In Glasgow, these warning signs are particularly common across the city's tenement stock
          and older inter-war housing:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (BS 3036)</strong> — still found in many pre-1970s Glasgow
                tenements and council houses. These provide no RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — Regulation 421.1.201 of BS 7671 requires
                non-combustible (metal) enclosures. Plastic enclosures are a fire risk in the
                event of an internal arc fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — BS 7671 requires 30 mA RCD protection on
                socket circuits and concealed cables. A board without RCDs or RCBOs is a significant
                electric shock hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR C1 or C2 observation</strong> — under the Housing (Scotland) Act 2006
                Repairing Standard, Glasgow landlords must ensure the electrical installation is
                safe. A C1 or C2 observation triggers mandatory remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adding new circuits</strong> — EV charger, loft conversion, kitchen
                renovation, or solar PV requiring additional consumer unit capacity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scotland-regulations',
    heading: 'Scottish Building Regulations for Consumer Unit Replacement',
    content: (
      <>
        <p>
          Scotland has its own building regulations framework under the Building (Scotland)
          Regulations 2004, which is administered separately from the Part P regime in England
          and Wales. Consumer unit replacement is notifiable work in Scotland.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — consumer unit replacement must be notified to
                Glasgow City Council's Building Standards department (as local authority verifier)
                before work begins, unless the work is carried out by a registered certifier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered certifiers</strong> — electricians registered under the Scottish
                Certifier of Construction (Electrical Installations) scheme can self-certify their
                work. SELECT-registered and NICEIC-registered electricians may hold this
                certification — always verify with your individual electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — an EIC must be issued for
                the consumer unit replacement under BS 7671. This documents the design, construction,
                inspection, and testing of the installation and must be retained by the property
                owner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 applies in Scotland</strong> — whilst building regulations differ,
                BS 7671:2018+A3:2024 is the national standard for electrical installations and
                applies equally in Scotland. All requirements for non-combustible consumer unit
                enclosures (Regulation 421.1.201) and RCD protection requirements apply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For landlords in Glasgow: the Housing (Scotland) Act 2006 Repairing Standard requires
          that electrical installations in private rented properties be safe and in proper working
          order. Disputes are handled by the First-tier Tribunal for Scotland (Housing and Property
          Chamber), not the local council.
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
          Here is what happens during a typical consumer unit replacement in a Glasgow property:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Survey and isolation</strong> — circuits are identified, the mains
                is isolated at the DNO cutout, and all power to the property is switched off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Remove old board</strong> — the existing consumer unit is
                disconnected and removed. Ageing cables or earthing issues may be identified.
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
                <strong>Step 4: Testing</strong> — all circuits are tested to BS 7671: insulation
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
                and submits the relevant Scottish building warrant notification.
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
          A standard consumer unit replacement in a Glasgow property typically takes 4 to 6 hours.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Like-for-like replacement with adequate wiring and earthing. 4 to 6 hours. Common
              in post-1970s Glasgow housing and modern flats.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Where earthing requires upgrading, meter tails need replacing, or cables require
              extending. 6 to 10 hours. Common in Glasgow Victorian tenements with original
              rubber-insulated wiring.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician in Glasgow',
    content: (
      <>
        <p>
          Glasgow has a large pool of qualified electricians. Here is what to look for when
          selecting one for a consumer unit replacement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT or NICEIC/NAPIT registration</strong> — verify the electrician holds
                the appropriate Scottish certification to self-certify notifiable electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — materials, labour, certification, and VAT should
                all be listed separately. Avoid single-figure quotes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC included</strong> — confirm the Electrical Installation Certificate
                and building regulations notification are included in the price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with tenement properties</strong> — tenement flats in Glasgow
                present specific challenges including communal earthing systems and limited cupboard
                space. Choose an electrician with relevant local experience.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Find registered electricians for consumer unit replacement in Glasgow"
          description="Elec-Mate connects you with NICEIC and SELECT-registered electricians across Glasgow and central Scotland. Get itemised quotes, track your job, and receive your EIC digitally."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementGlasgowPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Glasgow | Fuse Board Upgrade Cost 2026"
      description="How much does a consumer unit replacement cost in Glasgow in 2026? Local pricing, Scottish building regulations, what to expect, and how to choose a registered electrician in Glasgow."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Glasgow Price Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Consumer Unit Replacement Glasgow:{' '}
          <span className="text-yellow-400">Cost Guide 2026</span>
        </>
      }
      heroSubtitle="Consumer unit replacement in Glasgow typically costs £300 to £550, making it one of the most affordable major UK cities for fuse board upgrades. This guide covers local pricing, Scottish Building Regulations, what to expect during the work, and how to choose a registered electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements in Glasgow"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
