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
  { label: 'Consumer Unit Replacement Nottingham', href: '/consumer-unit-replacement-nottingham' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'metal-enclosure', label: 'Metal Enclosure — Regulation 421.1.201' },
  { id: 'rcd-protection', label: 'RCD and RCBO Protection' },
  { id: 'part-p-nottingham', label: 'Part P in Nottingham' },
  { id: 'bs-en-61439', label: 'BS EN 61439-3' },
  { id: 'costs-nottingham', label: 'Costs in Nottingham (2026)' },
  { id: 'nottingham-housing', label: 'Nottingham Housing Stock' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Regulation 421.1.201 (effective July 2016) requires all replacement consumer units in domestic premises to use a non-combustible (metal) enclosure. Any consumer unit replacement in Nottingham must comply with this requirement.',
  'Consumer unit replacement is notifiable under Part P of the Building Regulations in England. Nottingham City Council is the local building control authority. An NICEIC, NAPIT, or ELECSA registered electrician self-certifies on your behalf.',
  'Consumer unit replacement in Nottingham costs approximately £380 to £700 for a standard domestic property — one of the more affordable major cities in the East Midlands.',
  'Nottingham has a large private rented sector driven by two major universities, creating consistent demand for consumer unit replacement as landlords comply with the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'BS EN 61439-3 governs the design and manufacture of consumer units sold in the UK. Only UKCA-marked units from reputable manufacturers should be installed.',
];

const faqs = [
  {
    question: 'Why must a replacement consumer unit in Nottingham have a metal casing?',
    answer:
      'Amendment 2 to BS 7671:2008, which came into force on 1 July 2016, introduced Regulation 421.1.201. This requires that consumer units in domestic premises be enclosed in a cabinet or enclosure made of non-combustible material. Steel (metal) enclosures meet this requirement; plastic ones do not. The change was made because electrical fire investigations found that plastic consumer unit enclosures could melt and ignite during arcing faults, spreading fire into the building structure. Any consumer unit replacement in Nottingham carried out since July 2016 must use a compliant metal enclosure. This is also carried forward in the current BS 7671:2018+A3:2024.',
  },
  {
    question: 'Is a consumer unit replacement in Nottingham notifiable under Part P?',
    answer:
      'Yes. Consumer unit replacement is explicitly listed as notifiable work under Part P of the Building Regulations in England. In Nottingham, the most practical route to compliance is to engage an electrician registered with a government-approved competent person scheme such as NICEIC, NAPIT, or ELECSA. They self-certify the work, notify Nottingham City Council building control on your behalf, and issue a Building Regulations Compliance Certificate. You do not need to contact the council separately. The electrician must also issue an Electrical Installation Certificate and Schedule of Test Results for the installation.',
  },
  {
    question: 'How much does a consumer unit replacement cost in Nottingham?',
    answer:
      'Consumer unit replacement in Nottingham typically costs £380 to £700, reflecting competitive East Midlands labour rates. A small flat or two-bedroom terrace is likely to cost £360 to £480. A three-bedroom semi-detached or detached property — the most common Nottingham job — will typically cost £450 to £650. Larger properties or those requiring additional earthing, bonding, or wiring work may cost more. All prices should include supply of the compliant metal consumer unit, installation, full circuit testing, and issue of the Electrical Installation Certificate and Building Regulations compliance certificate.',
  },
  {
    question: 'What RCD protection is needed in a new Nottingham consumer unit?',
    answer:
      'BS 7671 Regulation 411.3.3 requires 30mA RCD protection for all socket-outlet circuits rated up to 32A in domestic premises, and for all circuits serving bathroom and shower locations (Regulation 701). Modern consumer units achieve this through a dual-RCD arrangement (circuits on two groups each protected by a 30mA RCD) or an all-RCBO arrangement (each circuit has an individual RCBO combining MCB and RCD). RCBOs are more expensive but preferred because a fault on one circuit only trips that circuit rather than an entire group. For Nottingham rental properties with multiple tenants, RCBOs significantly reduce disruption when a fault occurs.',
  },
  {
    question: 'How long does a consumer unit replacement take in Nottingham?',
    answer:
      'A standard consumer unit replacement in a three-bedroom Nottingham property typically takes four to six hours. You will be without power to all or most of the property for the majority of this time. Properties in older Nottingham areas — such as Radford, Lenton, Forest Fields, or St Ann\'s — may have more complex wiring or earthing arrangements that add time to the job. Properties with solid stone or brick construction can also make cable routing and inspection more time-consuming. Your electrician should provide a time estimate after a survey visit.',
  },
  {
    question: 'Nottingham has a lot of student rental properties — do landlords need to upgrade consumer units?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Nottingham to have a valid EICR (Electrical Installation Condition Report) for their rental properties. If the EICR produces C1 (danger present) or C2 (potentially dangerous) observations — which are common in older Nottingham rental properties due to absent RCD protection or aged consumer units — the landlord must complete remedial work within 28 days. Consumer unit replacement is one of the most common C2 remedial actions in the Nottingham private rented sector. Nottingham City Council actively enforces these regulations and can impose civil penalties of up to £30,000.',
  },
  {
    question: 'What certificates will I receive after a consumer unit replacement in Nottingham?',
    answer:
      'Your electrician should provide three documents. First, an Electrical Installation Certificate (EIC) detailing the installation, signed by the designer, installer, and inspector. Second, a Schedule of Test Results recording measured test values for each circuit including insulation resistance, earth fault loop impedance, and RCD operating times. Third, a Building Regulations Compliance Certificate from the competent person scheme (NICEIC, NAPIT, or ELECSA) confirming notification to Nottingham City Council building control. Store all three documents securely — they are required for property sales and may be needed for insurance claims.',
  },
  {
    question: 'Can I replace the consumer unit in my Nottingham property myself?',
    answer:
      'Consumer unit replacement is notifiable work under Part P of the Building Regulations. While the regulations do not technically prohibit a competent householder from carrying out electrical work in their own home, consumer unit replacement must be notified to building control before it begins if carried out by a non-registered person. In practice, a non-specialist carrying out a consumer unit replacement cannot self-certify the work, and Nottingham City Council building control would need to inspect the completed installation. The risk of incorrect installation — with potential for electric shock, fire, or equipment damage — is significant. Always use a qualified, NICEIC or NAPIT registered electrician in Nottingham.',
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
    description: 'Consumer unit replacement in Sheffield — costs, regulations, and qualified electricians.',
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
    heading: 'Consumer Unit Replacement in Nottingham — Overview',
    content: (
      <>
        <p>
          Nottingham is one of England's largest cities, with housing stock spanning Victorian
          back-to-back terraces in Radford, Lenton, and Forest Fields, post-war council estates
          in Clifton and Bulwell, and modern city-centre apartments. Consumer unit replacement
          demand is high across all these property types, driven particularly by Nottingham's
          very large private rented sector — one of the biggest in England outside London —
          which is subject to the Electrical Safety Standards in the Private Rented Sector
          (England) Regulations 2020.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What the regulations require</strong> — all new and replacement consumer
                units in domestic premises must comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                , including Regulation 421.1.201 (metal enclosure) and Regulation 411.3.3 (RCD
                protection). The work must be notified under Part P of the Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nottingham's rental market</strong> — the University of Nottingham and
                Nottingham Trent University together generate one of the largest student
                populations in England. Student rental properties in Lenton, Dunkirk, and
                Beeston are subject to the same landlord electrical safety regulations as
                all other private rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Costs</strong> — consumer unit replacement in Nottingham is among the
                more affordable in England, typically £380 to £700 for standard domestic
                properties, reflecting competitive East Midlands labour rates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-enclosure',
    heading: 'Metal Enclosure Requirement — BS 7671 Regulation 421.1.201',
    content: (
      <>
        <p>
          Regulation 421.1.201 of BS 7671 requires that consumer units in domestic premises
          be installed in enclosures made of non-combustible material. This requirement was
          introduced by Amendment 2 to BS 7671:2008, effective 1 July 2016, and is retained
          in the current standard BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why metal enclosures are safer</strong> — arc flash events inside a
                consumer unit during a short circuit generate extreme heat. A metal (steel)
                enclosure contains this event, preventing fire spread to surrounding materials.
                A plastic enclosure can melt and ignite, turning a contained electrical fault
                into a structural fire — a particularly serious risk in Nottingham's large
                stock of terraced and semi-detached housing with timber construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Triggered at replacement</strong> — existing plastic consumer units
                in Nottingham properties are not required to be proactively replaced. However,
                at the point of any replacement — for any reason — the new unit must be metal.
                Replacing a plastic unit with another plastic unit does not comply with
                Regulation 421.1.201.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR coding for plastic units</strong> — a plastic consumer unit in
                an existing installation is typically coded C3 (improvement recommended) rather
                than C2 or C1 on an EICR, because it was compliant at the time of original
                installation. The EICR overall may still be Satisfactory if there are no C1
                or C2 findings. However, additional deficiencies (such as absent RCD protection)
                would attract C2 codes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD and RCBO Protection',
    content: (
      <>
        <p>
          Regulation 411.3.3 of BS 7671 is one of the most consequential requirements for
          consumer unit replacement in Nottingham. It mandates 30mA RCD protection for
          socket-outlet circuits and bathroom circuits, and in practice most modern installations
          provide RCD or RCBO protection across all circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-RCD consumer unit</strong> — splits circuits into two groups, each
                on a 30mA RCD. Economic option but a fault on any circuit in a group trips all
                circuits in that group. Common in many Nottingham rental properties but less
                favoured for new installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All-RCBO consumer unit</strong> — each circuit has an individual RCBO
                combining MCB and RCD functions in one device. A fault on one circuit trips
                only that circuit. More expensive but provides better fault discrimination
                and is the preferred option for new consumer unit installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legacy wiring and nuisance tripping</strong> — Nottingham rental
                properties with older wiring may experience nuisance RCD tripping due to
                deteriorated cable insulation or appliances with high earth leakage. Fitting
                RCBOs limits each trip to a single circuit. Persistent tripping should be
                investigated to identify the root cause.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p-nottingham',
    heading: 'Part P Building Regulations in Nottingham',
    content: (
      <>
        <p>
          Consumer unit replacement is notifiable work under Part P of the Building Regulations
          in England. Nottingham City Council is the local building control authority. However,
          registered competent person electricians in Nottingham handle the entire notification
          process without requiring the householder to contact the council.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — an NICEIC, NAPIT, or
                ELECSA registered electrician notifies Nottingham City Council building control
                on your behalf within 30 days of completion and issues a Building Regulations
                Compliance Certificate. You receive the certificate directly from the scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — the electrician must
                issue a full{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                together with a Schedule of Test Results recording measured values for all
                circuits. This documentation is separate from (but complementary to) the
                Building Regulations compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord obligations</strong> — Nottingham City Council actively
                enforces the Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020 and can impose civil penalties of up to £30,000 for
                non-compliance. Landlords carrying out consumer unit replacements must ensure
                the work is properly notified and certified.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-61439',
    heading: 'BS EN 61439-3 — Product Standard for Consumer Units',
    content: (
      <>
        <p>
          BS EN 61439-3 is the British and European Standard for distribution boards, including
          domestic consumer units, intended for use by ordinary persons. Consumer units installed
          in Nottingham properties must comply with this standard as well as the installation
          requirements of BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design verification</strong> — BS EN 61439-3 requires manufacturers to
                verify through testing or calculation that the assembly meets rated values for
                voltage, current, and prospective short-circuit current. The PSCC rating must
                be adequate for the fault level present at the Nottingham installation address.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKCA marking</strong> — consumer units placed on the UK market since
                January 2022 must carry UKCA marking. Nottingham electricians should only
                install units from reputable manufacturers such as Hager, Schneider Electric,
                Wylex, or Contactum, all of which produce UKCA-marked metal consumer units
                compliant with BS EN 61439-3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-site testing</strong> — factory verification under BS EN 61439-3
                is complemented by site testing under BS 7671 Part 6. All test results are
                recorded in the Schedule of Test Results forming part of the EIC.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs-nottingham',
    heading: 'Consumer Unit Replacement Costs in Nottingham (2026)',
    content: (
      <>
        <p>
          Nottingham offers some of the most competitive pricing for consumer unit replacement
          in England. East Midlands labour rates are generally lower than London, the south-east,
          and many other major cities. The following 2026 guide prices include all elements of
          the job.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small flat or terrace (1–2 bed)</strong> — £360 to £500. Very common
                across Lenton, Radford, Forest Fields, and St Ann's. Typically 6 to 10 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi or terrace</strong> — £450 to £630. The most common
                Nottingham property type. Up to 12 circuits, full testing included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger detached property</strong> — £600 to £850. Wollaton, Beeston,
                and West Bridgford detached properties typically have more circuits and may
                require RCBO-per-circuit arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional work</strong> — earthing upgrades, main equipotential bonding,
                smoke alarm installation, or meter tails replacement can add £100 to £350
                depending on scope identified at survey.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nottingham-housing',
    heading: 'Nottingham Housing Stock and Consumer Unit Considerations',
    content: (
      <>
        <p>
          Nottingham's housing stock is diverse, ranging from Victorian terraces in the inner
          city to 1930s semi-detached properties in West Bridgford, Beeston, and Wollaton, and
          modern city-centre apartments. Each era and property type presents specific consumer
          unit replacement considerations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces (NG1, NG2, NG7)</strong> — some
                properties in inner Nottingham retain rubber-insulated or aluminium wiring from
                pre-1970s rewires. Where this is present, the condition of the existing wiring
                is as important as the consumer unit itself. An EICR should be carried out
                first to assess the full installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student letting market</strong> — Lenton and Dunkirk have extremely
                dense concentrations of student letting properties serving the University of
                Nottingham. These properties frequently require consumer unit replacements as
                part of EICR remedial programmes. Landlords with multiple properties in these
                areas often develop ongoing relationships with local electricians for consumer
                unit upgrade programmes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing (rural fringe)</strong> — properties on the rural fringes
                of the Nottingham urban area (Lambley, Woodborough, Calverton) may use TT earthing
                with an earth electrode rather than the PME (TN-C-S) arrangement common in urban
                areas. TT installations require RCD protection at the origin. Your electrician
                must identify the earthing arrangement before specifying the consumer unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Work in Nottingham',
    content: (
      <>
        <p>
          Nottingham offers consistent, high-volume consumer unit replacement demand driven by
          the large private rented sector, active EICR compliance enforcement, and older housing
          stock. Electricians who streamline certification and on-site quoting can significantly
          increase the number of jobs they complete per week.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Paperless EICs in Nottingham</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate and Schedule of Test Results
                  on your phone while still on site. Record all circuit test values, generate
                  the PDF, and send it to your Nottingham customer before you leave. No clipboards,
                  no evening paperwork, no transcription errors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Follow-On Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When your consumer unit replacement job reveals old wiring, missing bonding,
                  or a need for smoke alarms, use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting tool
                  </SEOInternalLink>{' '}
                  to quote additional work on the day. Nottingham landlords with multiple
                  properties are particularly receptive to package proposals covering their
                  whole portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Nottingham electrical business with Elec-Mate"
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

export default function ConsumerUnitReplacementNottinghamPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Nottingham | Fuse Box Nottingham"
      description="Consumer unit replacement in Nottingham — metal enclosure rules, Part P Building Regulations, costs £380–700, BS EN 61439, NICEIC electricians in the East Midlands. Complete guide 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Nottingham:{' '}
          <span className="text-yellow-400">Fuse Box Guide 2026</span>
        </>
      }
      heroSubtitle="Everything Nottingham homeowners and landlords need to know about consumer unit replacement — the metal enclosure requirement, Part P Building Regulations, RCD protection, costs of £380 to £700, and how to find a qualified NICEIC or NAPIT registered electrician in the East Midlands."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Nottingham"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion with instant PDF export and schedule of test results. 7-day free trial, cancel anytime."
    />
  );
}
