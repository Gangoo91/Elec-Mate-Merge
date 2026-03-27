import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  Building2,
  CheckCircle2,
  Info,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Consumer Unit Guides', href: '/guides/consumer-unit-replacement' },
  { label: 'Consumer Unit Replacement Liverpool', href: '/consumer-unit-replacement-liverpool' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'metal-enclosure', label: 'Metal Enclosure Requirement' },
  { id: 'rcd-protection', label: 'RCD Protection — BS 7671 Reg 411.3.3' },
  { id: 'part-p-liverpool', label: 'Part P in Liverpool' },
  { id: 'bs-en-61439', label: 'BS EN 61439-3 Standard' },
  { id: 'costs-liverpool', label: 'Costs in Liverpool (2026)' },
  { id: 'liverpool-housing', label: 'Liverpool Housing Stock' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Since July 2016, BS 7671 Regulation 421.1.201 has required all replacement consumer units in domestic premises to use a non-combustible (metal) enclosure. Plastic consumer units are no longer compliant for new or replacement installations in Liverpool.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations in England. An NICEIC, NAPIT, or ELECSA registered electrician in Liverpool self-certifies and notifies Liverpool City Council building control on your behalf.',
  'Liverpool and Merseyside have large amounts of Victorian and Edwardian terraced housing in areas such as Toxteth, Wavertree, Anfield, and Everton where outdated consumer units are very common.',
  'Average consumer unit replacement costs in Liverpool are £400 to £750 for a standard domestic property, including supply, installation, testing, and certification.',
  'BS EN 61439-3 governs the design and construction of consumer units sold in the UK. Only units from reputable manufacturers bearing UKCA marking should be installed.',
];

const faqs = [
  {
    question: 'Why must a replacement consumer unit in Liverpool have a metal enclosure?',
    answer:
      'BS 7671 Regulation 421.1.201, introduced by Amendment 2 in July 2016, requires that consumer units in domestic premises be installed in an enclosure made of non-combustible material. Metal steel enclosures meet this requirement; plastic ones do not. The change was introduced following evidence from electrical fire investigations showing that plastic consumer unit enclosures could ignite and spread a fault into the surrounding structure. Any consumer unit installed or replaced in a Liverpool property since July 2016 must use a compliant metal enclosure.',
  },
  {
    question: 'Is consumer unit replacement notifiable under Part P in Liverpool?',
    answer:
      'Yes. Consumer unit replacement is explicitly listed as notifiable work under Part P of the Building Regulations in England. This applies to all Liverpool properties. In practice, the simplest route is to engage an electrician registered with NICEIC, NAPIT, ELECSA, or another government-approved competent person scheme. They self-certify the work, notify Liverpool City Council building control on your behalf, and issue you a Building Regulations Compliance Certificate. You do not need to contact the council separately. The electrician must also issue an Electrical Installation Certificate and Schedule of Test Results.',
  },
  {
    question: 'How much does a consumer unit replacement cost in Liverpool?',
    answer:
      'Consumer unit replacement in Liverpool typically costs £400 to £750 for a standard domestic property. A small terraced house or flat (very common in L1, L4, L6, L7, and L8 postcodes) is likely to cost £380 to £520. A larger semi-detached or detached property with more circuits may cost £600 to £800. Merseyside labour rates are competitive and generally lower than Manchester city centre or London. All quotes should include supply of the metal consumer unit, installation, all circuit testing, and issue of the Electrical Installation Certificate and compliance documentation.',
  },
  {
    question: 'What RCD protection does my new Liverpool consumer unit need?',
    answer:
      'BS 7671 Regulation 411.3.3 requires 30mA RCD protection for all socket-outlet circuits rated up to 32A and for all circuits in locations containing a bath or shower (Regulation 701). Modern consumer units achieve this through a dual-RCD arrangement (circuits split into two groups each on a 30mA RCD) or through individual RCBOs (Residual Current Circuit Breakers with Overcurrent protection) for each circuit. RCBOs are the preferred option because a fault on one circuit trips only that circuit rather than an entire group, maintaining power to the rest of the property. Your Liverpool electrician should advise on the most appropriate arrangement.',
  },
  {
    question: 'My Liverpool terrace has old wiring — does that affect the consumer unit job?',
    answer:
      'It may. Many Liverpool terraces in areas such as Wavertree, Toxteth, and Anfield retain old wiring, including rubber-insulated cables or pre-PVC thermoplastic wiring from the 1950s and 1960s. A new consumer unit with modern MCB and RCD protection cannot fully protect old wiring from insulation failure — the wiring itself is the hazard. If your property has rubber-sheathed or other visibly aged wiring, a full rewire may be necessary alongside the consumer unit replacement. An EICR carried out before the consumer unit job will identify the condition of the existing wiring.',
  },
  {
    question: 'How long does a consumer unit replacement take in Liverpool?',
    answer:
      'A straightforward consumer unit replacement in a typical Liverpool terrace takes four to six hours for one qualified electrician. During this time the electricity supply to all or part of the property will be isolated. More complex jobs — those involving earthing system issues, TT installations, multiple sub-boards, or significant amounts of wiring inspection — can take longer. Your electrician should be able to give you a realistic time estimate based on the survey.',
  },
  {
    question: 'What documentation should I receive after a consumer unit replacement in Liverpool?',
    answer:
      'You should receive three documents. First, an Electrical Installation Certificate (EIC) detailing the new consumer unit installation, signed by the designer, installer, and inspector (often the same person for a straightforward replacement). Second, a Schedule of Test Results recording the measured values for each circuit (insulation resistance, earth fault loop impedance, RCD test times, etc.). Third, a Building Regulations Compliance Certificate from the competent person scheme (NICEIC, NAPIT, or ELECSA), confirming notification to Liverpool City Council building control. Keep all three documents safely — they are required for property sales and insurance claims.',
  },
  {
    question: 'Can a Liverpool landlord be required to upgrade a consumer unit?',
    answer:
      'Yes. If a periodic inspection (EICR) of a rental property in Liverpool identifies C1 (danger present) or C2 (potentially dangerous) observations relating to the consumer unit, circuit protection, or RCD provision, the landlord is required by the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 to complete remedial work within 28 days. Consumer unit replacement is one of the most common remedial actions following an unsatisfactory EICR in older Liverpool rental properties. Liverpool City Council has enforcement powers and can impose civil penalties of up to £30,000 for non-compliance.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description: 'Complete UK guide to fuse box and consumer unit replacement costs, regulations, and process.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'The IET Wiring Regulations explained — key requirements, amendments, and compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/consumer-unit-replacement-sheffield',
    title: 'Consumer Unit Replacement Sheffield',
    description: 'Consumer unit and fuse box replacement in Sheffield — costs, regulations, and qualified electricians.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on your phone with AI assistance and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Consumer Unit Replacement in Liverpool — What You Need to Know',
    content: (
      <>
        <p>
          A consumer unit replacement is one of the most significant electrical upgrades a Liverpool
          homeowner or landlord can make. The consumer unit — often called a fuse box — is the
          heart of a domestic electrical installation. It distributes power to every circuit in
          the property and provides the overcurrent and fault protection that keeps occupants safe.
          When a consumer unit fails, becomes outdated, or no longer meets current regulations,
          replacement is the appropriate action.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current standard</strong> — new and replacement consumer units must comply
                with both{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (the IET Wiring Regulations) and BS EN 61439-3 (the product standard for
                distribution boards). Regulation 421.1.201 requires a metal (non-combustible)
                enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — consumer unit replacement must be notified
                under Part P of the Building Regulations. The easiest route is to use an NICEIC,
                NAPIT, or ELECSA registered electrician who handles the notification for you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Liverpool context</strong> — Liverpool and Merseyside have large amounts
                of older housing stock, particularly in inner-city areas such as Toxteth, Wavertree,
                Anfield, and Kensington. Consumer unit replacement demand is high across all these
                postcodes and the surrounding areas of Wirral, Knowsley, and Sefton.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-enclosure',
    heading: 'The Metal Enclosure Requirement — Regulation 421.1.201',
    content: (
      <>
        <p>
          The requirement for non-combustible consumer unit enclosures in domestic premises was
          introduced by Amendment 2 to BS 7671:2008, effective 1 July 2016. It is carried forward
          unchanged in BS 7671:2018+A3:2024, which is the current edition applicable to all work
          in Liverpool and across England.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety basis</strong> — arc flash events inside a consumer unit
                during a short circuit release intense heat. A metal enclosure contains this
                energy and prevents ignition of surrounding materials. A plastic enclosure can
                melt, ignite, and propagate a fire into joists, wall cavities, and other structural
                elements of a Liverpool terrace where fire spread can be very rapid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applies at point of replacement</strong> — existing plastic consumer units
                in Liverpool properties are not subject to mandatory immediate replacement. The
                requirement applies when a replacement is carried out for any reason. At that
                point, a compliant metal unit is required — you cannot replace a plastic unit
                with another plastic unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR coding</strong> — a plastic consumer unit installed before July 2016
                is typically coded C3 (improvement recommended) on an EICR, not C2, as it was
                compliant at the time of installation. However, any heat damage or deterioration
                to the enclosure would attract a more serious code.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection — BS 7671 Regulation 411.3.3',
    content: (
      <>
        <p>
          RCD (Residual Current Device) protection is a critical element of any new consumer unit
          installation in Liverpool. Regulation 411.3.3 of BS 7671 sets out the minimum RCD
          protection requirements for domestic installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlet circuits</strong> — all socket-outlet circuits rated up to
                32A must have 30mA RCD protection. This applies to ring final circuits and radial
                socket circuits throughout the dwelling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom and shower circuits</strong> — Regulation 701 requires 30mA RCD
                protection for all circuits serving locations containing a bath or shower. In
                Liverpool terraces with upstairs bathrooms and separate shower rooms, this typically
                covers the lighting and shaver socket circuits serving those areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-RCD vs RCBO</strong> — the choice between a dual-RCD consumer unit
                and an all-RCBO consumer unit affects both cost and resilience. RCBOs cost more
                per device but provide individual circuit protection, preventing a single fault
                from tripping an entire group of circuits. For Liverpool rental properties, RCBOs
                reduce tenant disruption when a fault occurs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p-liverpool',
    heading: 'Part P Building Regulations in Liverpool',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England) makes consumer unit replacement notifiable
          work. Liverpool City Council is the local building control authority, though self-certified
          work by registered competent persons bypasses the need for direct council involvement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person route</strong> — the standard route for consumer unit
                replacement in Liverpool. An NICEIC, NAPIT, or ELECSA registered electrician
                notifies Liverpool City Council building control and issues a Building Regulations
                Compliance Certificate. No action required from the householder other than
                retaining the paperwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — the electrician must issue
                a completed{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                with a Schedule of Test Results. This is separate from the Building Regulations
                compliance certificate but equally important for property records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property transactions</strong> — solicitors acting on Liverpool property
                sales routinely request Part P compliance certificates for consumer unit
                replacements. Replacing a consumer unit without Part P notification is a latent
                legal issue that can delay or complicate property sales. Always use a registered
                competent person.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-61439',
    heading: 'BS EN 61439-3 — The Consumer Unit Product Standard',
    content: (
      <>
        <p>
          BS EN 61439-3 is the product standard for distribution boards (including domestic consumer
          units) intended for use by ordinary persons. Any consumer unit installed in a Liverpool
          property must conform to this standard as well as the installation requirements of
          BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design verification</strong> — manufacturers must demonstrate that the
                consumer unit assembly meets its rated values through testing or calculation. This
                includes the prospective short-circuit current (PSCC) rating, which must be
                adequate for the fault level at the Liverpool installation address.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKCA marking</strong> — consumer units placed on the UK market must carry
                UKCA marking. Liverpool electricians should only install units from established
                manufacturers such as Hager, Schneider Electric, Wylex, or Contactum that carry
                this marking and comply with BS EN 61439-3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine verification</strong> — each consumer unit unit is tested by the
                manufacturer during production. Site testing by your electrician under BS 7671
                Part 6 then verifies the installed condition of all circuits, with results recorded
                in the Schedule of Test Results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs-liverpool',
    heading: 'Consumer Unit Replacement Costs in Liverpool (2026)',
    content: (
      <>
        <p>
          Liverpool offers competitive pricing for consumer unit replacement relative to other major
          English cities. Labour rates on Merseyside are generally lower than Manchester or London,
          and many Liverpool electricians provide fixed-price quotes for consumer unit work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat or terrace (1–2 bed)</strong> — £380 to £520. Common across
                L1, L4, L6, and L8 postcodes. Typically 6 to 10 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom terrace or semi</strong> — £480 to £680. The most common
                property type in Liverpool. Up to 12 circuits, full testing included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger detached property</strong> — £650 to £900. More ways, potentially
                RCBO arrangement, longer installation and testing time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional work</strong> — earthing upgrades, main bonding conductors,
                or meter tails replacement can add £100 to £350 depending on the scope identified
                during the survey.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Obtain at least two or three written quotes from NICEIC or NAPIT registered Liverpool
          electricians. All quotes should explicitly state that testing, certification, and
          Part P notification are included — these are not optional extras.
        </p>
      </>
    ),
  },
  {
    id: 'liverpool-housing',
    heading: 'Liverpool Housing Stock — Consumer Unit Considerations',
    content: (
      <>
        <p>
          Liverpool's housing stock presents specific considerations for consumer unit replacement.
          The city's rich industrial heritage means large areas of Victorian and Edwardian terracing,
          along with post-war council estates and more recent new-builds, each presenting different
          electrical challenges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (L1, L4, L6, L7, L8)</strong> — some retain
                rubber-insulated wiring or round-pin sockets indicating very old wiring. In these
                properties, a consumer unit replacement alone may not be sufficient — the condition
                of the existing wiring should be assessed via a full EICR first.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO properties</strong> — Liverpool has a large student population due
                to the University of Liverpool and Liverpool John Moores University. Student HMOs
                in Wavertree, Kensington, and Toxteth frequently require consumer unit upgrades
                as landlords bring properties into EICR compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wirral and Knowsley</strong> — properties on the Wirral peninsula (CH44
                to CH48) and in Knowsley are covered by different local authorities but the same
                Part P and BS 7671 requirements apply. Consumer unit replacement in these areas
                follows identical regulations to Liverpool proper.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work Across Merseyside',
    content: (
      <>
        <p>
          Consumer unit replacement is consistently high-demand across Liverpool and Merseyside,
          driven by large numbers of older private rented sector properties and active landlord
          compliance requirements. Efficient documentation tools help Liverpool electricians
          complete more jobs per week and avoid the administrative backlog that comes with paper
          certificates.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICs On Site in Liverpool</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the full Electrical Installation Certificate and Schedule of Test
                  Results while still at the Liverpool property. Record insulation resistance,
                  earth fault loop impedance, and RCD test values directly. Generate and send
                  the PDF before you leave. No paper, no evening admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When you discover old wiring, bonding deficiencies, or additional circuits needed,
                  use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting tool
                  </SEOInternalLink>{' '}
                  to quote the additional work on site. Liverpool landlords are far more likely
                  to approve additional work while you are there to explain what you have found.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Liverpool electrical business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, instant PDF export, and professional quoting. Eliminate paperwork and complete more jobs per day. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementLiverpoolPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Liverpool | Fuse Box Upgrade Liverpool"
      description="Consumer unit replacement in Liverpool — metal enclosure rules since 2016, costs £400–750, BS EN 61439, Part P Building Regulations, NICEIC electricians on Merseyside. Complete guide 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Liverpool:{' '}
          <span className="text-yellow-400">Fuse Box Upgrade Guide 2026</span>
        </>
      }
      heroSubtitle="Everything Liverpool homeowners and landlords need to know about consumer unit replacement — metal enclosure requirements, Part P Building Regulations, RCD protection, costs of £400 to £750, and how to find a qualified NICEIC or NAPIT registered electrician on Merseyside."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Liverpool"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion with instant PDF export and schedule of test results. 7-day free trial, cancel anytime."
    />
  );
}
