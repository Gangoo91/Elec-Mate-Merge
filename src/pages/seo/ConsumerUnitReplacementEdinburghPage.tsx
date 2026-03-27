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
  { label: 'Edinburgh', href: '/guides/consumer-unit-replacement-edinburgh' },
];

const tocItems = [
  { id: 'overview', label: 'Consumer Unit Replacement in Edinburgh' },
  { id: 'edinburgh-pricing', label: 'Edinburgh Pricing' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'scotland-regulations', label: 'Scottish Building Regulations' },
  { id: 'what-to-expect', label: 'What to Expect During Replacement' },
  { id: 'how-long', label: 'How Long Does It Take?' },
  { id: 'choosing-electrician', label: 'Choosing an Edinburgh Electrician' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in Edinburgh typically costs between £350 and £600 for most domestic properties — slightly higher than Glasgow due to elevated labour rates in the Scottish capital.',
  'Under Regulation 421.1.201 of BS 7671:2018+A3:2024, all domestic consumer units must be a type-tested coordinated assembly housed in a non-combustible (metal) enclosure — this applies equally in Scotland.',
  'In Scotland, consumer unit replacement is notifiable work under the Building (Scotland) Regulations 2004. It must be certified by a registered certifier or notified to City of Edinburgh Council as the local authority verifier.',
  'BS 7671:2018+A3:2024 requires 30 mA RCD protection for all socket-outlet circuits up to 32 A and for cables concealed in walls at a depth less than 50 mm — covering virtually every circuit in a modern domestic installation.',
  'Edinburgh has a significant stock of Georgian and Victorian tenement properties in areas such as Leith, Morningside, and Marchmont — many of which have electrical installations that predate current standards.',
];

const faqs = [
  {
    question: 'How much does a consumer unit replacement cost in Edinburgh in 2026?',
    answer:
      'A consumer unit replacement in Edinburgh in 2026 typically costs between £350 and £600. A 6-way board in a tenement flat typically costs £350 to £450. A 10-way board with RCBOs and SPD in a terraced house costs around £450 to £600. Larger detached properties may reach £650 to £900. Edinburgh prices are slightly higher than Glasgow due to elevated labour rates in the capital, but remain lower than London.',
  },
  {
    question: 'Are building regulations different for consumer unit replacement in Edinburgh?',
    answer:
      'Yes. Scotland uses the Building (Scotland) Regulations 2004, which is separate from the Part P regime in England and Wales. Consumer unit replacement is notifiable work. The work must be carried out by a registered certifier under the Scottish Certifier of Construction (Electrical Installations) scheme, or notified to City of Edinburgh Council\'s Building Standards department before work begins. City of Edinburgh Council is the local authority verifier for Edinburgh properties.',
  },
  {
    question: 'Do I need RCD protection when replacing a consumer unit in Edinburgh?',
    answer:
      'Yes. BS 7671:2018+A3:2024 requires 30 mA RCD protection for socket-outlet circuits rated up to 32 A and for cables concealed in walls. BS 7671 is the national standard and applies equally in Edinburgh. Individual RCBOs on each circuit is the preferred modern approach.',
  },
  {
    question: 'Do I need an SPD when replacing a consumer unit in Edinburgh?',
    answer:
      'In most cases, yes. The risk assessment under Regulation 443.4 of BS 7671 almost always results in surge protection device (SPD) installation being required for domestic consumer unit replacements. A Type 2 SPD typically adds £70 to £120 to the material cost. Your electrician must document this assessment on the Electrical Installation Certificate.',
  },
  {
    question: 'What Scottish certifier registration should an Edinburgh electrician hold?',
    answer:
      'For notifiable work such as consumer unit replacement, the electrician must be registered under the Scottish Certifier of Construction (Electrical Installations) scheme to self-certify the work. SELECT (the Electrical Contractors\' Association of Scotland) members may hold this certification, as may NICEIC and NAPIT registered electricians who have specifically registered under the Scottish scheme. Always ask the electrician to confirm their specific Scottish certification before booking.',
  },
  {
    question: 'How long does a consumer unit replacement take in an Edinburgh tenement?',
    answer:
      'A like-for-like consumer unit replacement in a standard Edinburgh tenement flat typically takes 4 to 6 hours. Edinburgh\'s Georgian and Victorian tenements can present additional challenges including original rubber-insulated wiring, inadequate earthing, and limited access to consumer unit locations within shared cupboards. Properties requiring earthing upgrades or cable extensions may take a full day.',
  },
  {
    question: 'Can an Edinburgh landlord be required to upgrade a consumer unit?',
    answer:
      'Yes. Under the Housing (Scotland) Act 2006 Repairing Standard, private landlords in Scotland must ensure the electrical installation in a let property is safe and in proper working order. An EICR identifying C1 or C2 observations at the consumer unit creates an obligation to carry out remedial work. Tenants can refer non-compliant landlords to the First-tier Tribunal for Scotland (Housing and Property Chamber). City of Edinburgh Council also enforces HMO licensing conditions, which include EICR requirements.',
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
    heading: 'Consumer Unit Replacement in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh is Scotland's capital city and one of the UK's most popular places to live,
          with a housing stock dominated by Georgian and Victorian tenements in areas such as
          Marchmont, Morningside, Leith, and Stockbridge. Many of these properties still have
          electrical installations that predate current regulations, with rewirable fuse boards or
          early plastic consumer units common in the older private rented sector.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises be a type-tested
          coordinated assembly housed in a non-combustible (metal) enclosure. BS 7671 also requires
          30 mA RCD protection for socket-outlet circuits and cables concealed in walls. These
          requirements apply equally in Scotland.
        </p>
        <p>
          This guide covers everything you need to know about consumer unit replacement costs and
          requirements in Edinburgh — including how Scottish Building Regulations differ from the
          Part P framework in England and Wales, and what landlords need to know under the Housing
          (Scotland) Act 2006.
        </p>
      </>
    ),
  },
  {
    id: 'edinburgh-pricing',
    heading: 'Edinburgh Consumer Unit Replacement Pricing',
    content: (
      <>
        <p>
          Edinburgh electricians typically charge day rates of £250 to £330 — higher than Glasgow
          due to elevated costs in the Scottish capital, but significantly lower than London.
          Edinburgh's high concentration of tenement flats means that many consumer unit
          replacements are relatively straightforward, but older properties with ageing wiring
          can add to the overall cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Edinburgh Pricing Breakdown (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenement flat (6-way board)</strong> — £350 to £450 total. Common across
                Edinburgh's private rented sector. Materials: £120 to £200. Labour: £210 to £230.
                EIC: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard terraced or semi (10-way with RCBOs and SPD)</strong> — £430 to
                £600 total. Materials: £240 to £360. Labour: £240 to £270. EIC and certification:
                £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger detached (14-way high-integrity with SPD)</strong> — £540 to £820
                total. For properties with 12+ circuits, EV charger, or solar PV. Materials: £340
                to £500. Labour: £260 to £320. EIC and certification: £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase property</strong> — £1,100 to £1,700+ total. Required for
                larger homes or commercial properties. Materials: £440 to £720. Labour: £390 to
                £520. EIC and certification: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Properties in the Old Town and New Town conservation areas may carry additional
          considerations for accessing the property and locating consumer units within listed
          buildings. Always discuss any conservation area implications with your electrician
          before work begins.
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
          In Edinburgh, these warning signs are particularly common in the Georgian and Victorian
          tenement stock that makes up a large proportion of the city's housing:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses (BS 3036)</strong> — still found in many pre-1970s
                Edinburgh tenements. These provide no RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic consumer unit</strong> — Regulation 421.1.201 of BS 7671 requires
                non-combustible (metal) enclosures. A plastic enclosure poses a fire risk in the
                event of an internal arc fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — BS 7671 requires 30 mA RCD protection on
                socket circuits and concealed cables. A board without RCDs or RCBOs is a significant
                electric shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repairing Standard failure</strong> — under the Housing (Scotland) Act 2006,
                Edinburgh landlords must ensure their electrical installation meets the Repairing
                Standard. An EICR with C1 or C2 observations triggers mandatory remedial action.
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
          Scotland operates under the Building (Scotland) Regulations 2004, administered by the
          Scottish Government and enforced by local authority building standards departments. This
          is distinct from the Part P framework in England and Wales.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work in Edinburgh</strong> — consumer unit replacement is
                notifiable work. City of Edinburgh Council's Building Standards department is
                the local authority verifier. The work must be certified by a registered certifier
                or notified before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish Certifier of Construction</strong> — electricians registered under
                the Scottish Certifier of Construction (Electrical Installations) scheme can
                self-certify notifiable work. SELECT-registered and NICEIC/NAPIT-registered
                electricians may hold this certification. Always verify with your electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 applies in Scotland</strong> — BS 7671:2018+A3:2024 is the national
                standard for electrical installations and applies in Edinburgh as it does across the
                UK. Requirements for non-combustible enclosures (Regulation 421.1.201) and RCD
                protection requirements are not relaxed north of the border.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord obligations</strong> — under the Housing (Scotland) Act 2006
                Repairing Standard, Edinburgh landlords must ensure electrical installations are
                safe. Disputes regarding compliance are handled by the First-tier Tribunal for
                Scotland (Housing and Property Chamber).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During a Consumer Unit Replacement',
    content: (
      <>
        <p>
          Here is what happens during a typical consumer unit replacement in an Edinburgh property:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Survey and isolation</strong> — circuits are identified, the mains
                is isolated at the DNO cutout, and all power is switched off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Remove old board</strong> — the existing consumer unit is
                disconnected and removed. Ageing cables or earthing issues may be found at
                this stage.
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
                and submits the relevant Scottish building regulations notification.
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
          A standard consumer unit replacement in an Edinburgh property typically takes 4 to 6
          hours, including all testing and certification.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Like-for-like replacement with adequate wiring and earthing. 4 to 6 hours. Common
              in post-1970s Edinburgh housing and modern developments.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Where earthing requires upgrading, meter tails need replacing, or cables require
              extending. 6 to 10 hours. Common in Edinburgh's Georgian and Victorian tenements
              with original rubber-insulated wiring.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh has a strong local electrical contracting sector. Here is what to look for
          when selecting an electrician for a consumer unit replacement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish certifier registration</strong> — verify the electrician holds
                the Scottish Certifier of Construction (Electrical Installations) registration
                to self-certify the work in Edinburgh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — materials, labour, certification, and VAT
                should all be listed separately. Avoid vague single-figure quotes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC and building regulations notification included</strong> — confirm
                both are included in the quoted price before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with Edinburgh tenements</strong> — Edinburgh's tenement
                properties have specific characteristics. Choose an electrician familiar with
                the local housing stock.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Find registered electricians for consumer unit replacement in Edinburgh"
          description="Elec-Mate connects you with SELECT and NICEIC-registered electricians across Edinburgh and the Lothians. Get itemised quotes, track your job, and receive your EIC digitally."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementEdinburghPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Edinburgh | Fuse Board Upgrade Cost 2026"
      description="How much does a consumer unit replacement cost in Edinburgh in 2026? Local pricing, Scottish building regulations, what to expect, and how to choose a registered electrician in Edinburgh."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Edinburgh Price Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Consumer Unit Replacement Edinburgh:{' '}
          <span className="text-yellow-400">Cost Guide 2026</span>
        </>
      }
      heroSubtitle="Consumer unit replacement in Edinburgh typically costs £350 to £600. This guide covers local pricing, how Scotland's Building Regulations differ from Part P in England, what to expect during the work, and how to choose a certified electrician in Edinburgh."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements in Edinburgh"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
