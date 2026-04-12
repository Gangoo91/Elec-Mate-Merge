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
  { label: 'Consumer Unit Guides', href: '/guides/consumer-unit-replacement-cost' },
  { label: 'Consumer Unit Replacement Newcastle', href: '/consumer-unit-replacement-newcastle' },
];

const tocItems = [
  { id: 'what-is-consumer-unit', label: 'What Is a Consumer Unit?' },
  { id: 'metal-enclosure-requirement', label: 'Metal Enclosure Requirement' },
  { id: 'part-p-building-regulations', label: 'Part P Building Regulations' },
  { id: 'bs-en-61439', label: 'BS EN 61439 Standard' },
  { id: 'signs-replacement-needed', label: 'Signs You Need a Replacement' },
  { id: 'costs-newcastle', label: 'Costs in Newcastle (2026)' },
  { id: 'choosing-electrician', label: 'Choosing a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Since the 2016 Amendment to BS 7671 (Amendment 2), all new and replacement consumer units installed in domestic premises must use a metal enclosure to reduce the risk of fire spread. Plastic consumer units in dwellings are no longer compliant for new installations.',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations in England. The work must be either carried out by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to the local building control authority.',
  'BS EN 61439-3 is the standard for distribution boards (including domestic consumer units). It specifies design verification, construction, and performance requirements that compliant consumer units must meet.',
  'The average cost of consumer unit replacement in Newcastle is £400 to £800 for a standard domestic property, though larger properties or those requiring additional circuit protection can cost more.',
  'RCD and RCBO protection under BS 7671 Regulation 411.3.3 is required for all socket-outlet circuits rated up to 32A and all circuits in locations containing a bath or shower.',
];

const faqs = [
  {
    question: 'Why do consumer units now have to be metal in Newcastle and across England?',
    answer:
      'The 2016 Amendment (Amendment 2) to BS 7671:2008 introduced Regulation 421.1.201, which requires consumer units in domestic premises to have an enclosure made of non-combustible material or be installed in a cabinet made of non-combustible material. Metal consumer unit enclosures meet this requirement. The change was prompted by evidence that plastic consumer unit enclosures could contribute to fire spread during electrical faults. Metal enclosures contain arcing faults much more effectively, limiting fire risk. Any consumer unit replacement in Newcastle carried out after this amendment must use a compliant metal enclosure.',
  },
  {
    question: 'Is consumer unit replacement notifiable under Part P Building Regulations?',
    answer:
      'Yes. Consumer unit replacement is listed as notifiable electrical work under Part P of the Building Regulations in England. This means the work must either be carried out by a registered competent person (such as an NICEIC, NAPIT, or ELECSA registered electrician) who self-certifies the work, or it must be notified to the local building control authority before work starts. A registered competent person will issue a Building Regulations Compliance Certificate (Minor Works Certificate or Electrical Installation Certificate) upon completion. This documentation is important for property sales and insurance purposes.',
  },
  {
    question: 'What does BS EN 61439-3 require for consumer units?',
    answer:
      'BS EN 61439-3 is the British and European Standard for low-voltage switchgear and controlgear assemblies, specifically Part 3 covering distribution boards intended for use by ordinary persons. It requires that consumer units undergo design verification to confirm they meet rated voltage, current, and short-circuit requirements. It also specifies construction requirements for enclosures, busbars, wiring, and protective devices. Consumer units sold in the UK for domestic use must comply with BS EN 61439-3 and carry the CE or UKCA mark. Your Newcastle electrician should only install consumer units from reputable manufacturers that comply with this standard.',
  },
  {
    question: 'How much does a consumer unit replacement cost in Newcastle?',
    answer:
      'In Newcastle, consumer unit replacement typically costs £400 to £800 for a standard domestic property with a single consumer unit. This includes removing the old unit, supplying and fitting a compliant metal consumer unit with appropriate RCD or RCBO protection, testing the installation, and issuing the required Building Regulations compliance certificate. Larger properties with more circuits, or those requiring additional work such as earthing upgrades, can cost £700 to £1,200 or more. Newcastle labour rates are generally lower than London and south-east England, making this one of the more affordable regions for electrical work.',
  },
  {
    question: 'How long does a consumer unit replacement take in Newcastle?',
    answer:
      'A standard consumer unit replacement on a three-bedroom house in Newcastle typically takes four to six hours for one electrician. This includes isolating the supply, removing the old unit, fitting the new metal consumer unit, reconnecting and labelling all circuits, testing each circuit against BS 7671 requirements, and completing the certification paperwork. More complex jobs — such as properties with large numbers of circuits, older wiring requiring repair, or split-load arrangements — can take a full day or extend into a second visit.',
  },
  {
    question: 'What RCD protection is required in the new consumer unit?',
    answer:
      'BS 7671 Regulation 411.3.3 requires RCD protection with a rated residual operating current not exceeding 30mA for all socket-outlet circuits rated up to 32A in domestic premises, all circuits in locations containing a bath or shower (Regulation 701), and in practice most other circuits in a modern domestic installation. The current standard approach is to use a dual RCD consumer unit (protecting circuits in two groups) or — preferably — individual RCBOs (Residual Current Circuit Breakers with Overcurrent protection) for each circuit. RCBOs provide superior protection because a fault on one circuit does not trip others, maintaining power to the rest of the property.',
  },
  {
    question:
      'Will I need to notify Tyne and Wear building control for a consumer unit replacement?',
    answer:
      'If you use a registered competent person (NICEIC, NAPIT, ELECSA, or equivalent scheme member) to carry out the replacement, they will notify building control on your behalf as part of the self-certification process. You do not need to contact building control separately. The electrician will issue you a Building Regulations Compliance Certificate within 30 days of completion. If for any reason you use a non-registered electrician, you or they must notify building control (Newcastle City Council or the relevant authority) before the work begins, and an approved inspector must certify the work on completion.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Guide',
    description:
      'Complete UK guide to fuse box and consumer unit replacement costs, regulations, and process.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The IET Wiring Regulations explained — key requirements, amendments, and compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-newcastle',
    title: 'EICR Newcastle',
    description:
      'Electrical Installation Condition Reports in Newcastle — costs, requirements, and finding inspectors.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Notifiable electrical work in England — what requires notification and how the process works.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on your phone with AI assistance and instant PDF export.',
    icon: Zap,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-consumer-unit',
    heading: 'What Is a Consumer Unit and When Does It Need Replacing?',
    content: (
      <>
        <p>
          A consumer unit — commonly called a fuse box — is the main distribution board in a
          domestic property. It receives the incoming electricity supply from the meter, distributes
          it to individual circuits via circuit breakers or fuses, and provides the primary
          overcurrent and fault protection for the installation. In modern installations the
          consumer unit also provides RCD (Residual Current Device) protection against electric
          shock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age</strong> — consumer units in Newcastle properties built before the 1990s
                may contain rewirable fuse wire holders rather than modern circuit breakers. These
                offer significantly less protection and do not meet the requirements of the current
                edition of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure</strong> — if the existing consumer unit has a white or
                grey plastic enclosure, it does not meet the current requirement for non-combustible
                enclosures introduced by the 2016 Amendment to BS 7671. Replacement with a compliant
                metal unit is required when the unit is replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — older consumer units may have no RCD protection
                at all, or only partial protection. This is frequently identified as a C2
                observation (potentially dangerous) on an EICR, requiring remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient capacity</strong> — adding an electric vehicle charger, heat
                pump, or additional circuits may require a larger consumer unit with more ways than
                the existing installation can provide.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Consumer unit replacement is one of the most common electrical jobs carried out in
          Newcastle. Properties in areas such as Jesmond, Gosforth, and Gateshead with Victorian or
          Edwardian housing stock frequently have outdated consumer units that benefit from
          replacement.
        </p>
      </>
    ),
  },
  {
    id: 'metal-enclosure-requirement',
    heading: 'The Metal Enclosure Requirement — BS 7671 Regulation 421.1.201',
    content: (
      <>
        <p>
          The requirement for non-combustible consumer unit enclosures in domestic premises was
          introduced by Amendment 2 to BS 7671:2008, which took effect on 1 July 2016. It is now
          carried forward in BS 7671:2018 including Amendment 3 (2024). Regulation 421.1.201 states
          that in domestic premises, a consumer unit or similar switchgear assembly shall be
          installed in a cabinet or enclosure constructed of non-combustible material.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why metal?</strong> — arc flash events inside a consumer unit during a short
                circuit can reach temperatures of several thousand degrees Celsius. A plastic
                enclosure can melt and ignite, spreading fire into the surrounding structure. A
                metal enclosure contains the arc and the resulting heat, dramatically reducing the
                risk of fire propagation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applies on replacement</strong> — if an existing property in Newcastle has a
                plastic consumer unit, there is no mandatory requirement to replace it immediately.
                However, the moment a replacement is carried out — for any reason — the new unit
                must comply with Regulation 421.1.201, meaning a metal enclosure is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not retrofit</strong> — fitting a metal fascia to an existing plastic
                consumer unit does not achieve compliance. The entire enclosure must be
                non-combustible. Only a full replacement with a compliant metal consumer unit
                satisfies the regulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR implications</strong> — a plastic consumer unit in a domestic property
                is typically coded C3 (improvement recommended) on an EICR, as existing
                installations are not required to be upgraded retrospectively. However, if C1 or C2
                faults are found elsewhere that require consumer unit replacement, the replacement
                must be to metal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p-building-regulations',
    heading: 'Part P Building Regulations — Notification and Certification',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England) sets the safety standard for electrical
          installations in dwellings. Consumer unit replacement is explicitly listed as notifiable
          work under Schedule 1 of the Building Regulations and the Electrical Safety (Buildings)
          Approved Document P.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered competent person route</strong> — the simplest and most common
                route to compliance. An electrician registered with a government-approved competent
                person scheme (NICEIC, NAPIT, ELECSA, or equivalent) can self-certify the work. They
                notify building control on your behalf and issue a compliance certificate. There is
                no need to contact Newcastle City Council building control separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control route</strong> — if the electrician is not a registered
                competent person, the work must be notified to Newcastle City Council building
                control before it begins. An approved inspector or the local authority building
                control will inspect and certify the work. This route is slower and typically more
                expensive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification documentation</strong> — upon completion, the electrician must
                issue an{' '}
                <SEOInternalLink href="/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                together with a Schedule of Test Results. For a consumer unit replacement that is
                part of a larger installation, a Minor Works Certificate may suffice for connected
                minor additions, but a full EIC is required for the consumer unit itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property sales</strong> — solicitors routinely request Part P compliance
                documentation during property conveyancing. A consumer unit replacement without
                proper certification can delay or complicate the sale of a property in Newcastle.
                Always retain the EIC and compliance certificate.
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
          BS EN 61439-3 (Low-voltage switchgear and controlgear assemblies — Part 3: Distribution
          boards intended to be operated by ordinary persons) is the product standard that consumer
          units sold and installed in the UK must meet. This is distinct from BS 7671, which is the
          installation standard. Together they form the regulatory framework for consumer unit
          replacement in Newcastle and across England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design verification</strong> — BS EN 61439-3 requires that the consumer unit
                manufacturer demonstrates through testing or calculation that the assembly meets its
                rated values for voltage, current, and prospective short-circuit current (PSCC). The
                PSCC rating is particularly important: the consumer unit must be rated to handle the
                fault level at the point of installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine verification</strong> — each consumer unit must be inspected and
                tested during manufacture to verify wiring, markings, and protective conductor
                continuity before despatch. This factory testing provides the baseline for site
                installation testing under BS 7671 Part 6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKCA marking</strong> — since January 2022, consumer units placed on the UK
                market must carry the UKCA (UK Conformity Assessed) mark rather than the EU CE mark.
                Reputable manufacturers such as Hager, Schneider Electric, Wylex, and Contactum
                supply fully compliant UKCA-marked metal consumer units for the UK domestic market.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When specifying a consumer unit for a Newcastle installation, your electrician should
          select a unit with an appropriate number of ways for the circuits required, adequate PSCC
          rating for the supply at that address, and the necessary RCD or RCBO protection layout to
          meet BS 7671 requirements.
        </p>
      </>
    ),
  },
  {
    id: 'signs-replacement-needed',
    heading: 'Signs Your Consumer Unit Needs Replacing',
    content: (
      <>
        <p>
          Several indicators suggest that a consumer unit in a Newcastle property is due for
          replacement. If you recognise any of the following, arrange a survey with a qualified
          local electrician.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse wire</strong> — if the board contains ceramic or porcelain
                fuse holders with fuse wire rather than modern miniature circuit breakers (MCBs),
                replacement is strongly recommended. Fuse wire can be replaced with incorrect
                ratings, creating a serious fire and shock risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequently tripping breakers</strong> — occasional tripping is normal, but
                breakers that trip repeatedly indicate either an overloaded circuit or a faulty
                breaker. Persistent tripping warrants investigation and may indicate the consumer
                unit or wiring needs attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — if there are no RCD or RCBO devices visible in
                the consumer unit, the installation lacks the shock protection required by BS 7671
                Regulation 411.3.3. This is commonly found in properties built or last rewired
                before the mid-1990s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discolouration or burning smell</strong> — any evidence of heat damage,
                scorching, or a burning smell near the consumer unit indicates a potentially
                dangerous condition requiring immediate attention from a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR C1 or C2 finding</strong> — if a periodic inspection (EICR) has
                identified C1 (danger present) or C2 (potentially dangerous) observations relating
                to the consumer unit or circuit protection, replacement is required within 28 days.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs-newcastle',
    heading: 'Consumer Unit Replacement Costs in Newcastle (2026)',
    content: (
      <>
        <p>
          Newcastle and the wider Tyne and Wear area offer competitive rates for consumer unit
          replacement compared to London and the south-east. Costs depend on the size of the
          property, the number of circuits, the type of consumer unit selected, and whether any
          additional work is required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £350 to £500. Typically 6 to 8 circuits. A
                straightforward replacement with a metal dual-RCD or RCBO consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two to three-bedroom house</strong> — £450 to £650. The most common job type
                in Newcastle. Usually 8 to 12 circuits. Includes full testing and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom or larger house</strong> — £600 to £900. More circuits,
                potentially a larger consumer unit with additional ways. Some older properties in
                Jesmond and Gosforth may have split consumer units requiring more time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional work</strong> — earthing upgrades (TT systems requiring earth
                electrode testing, or TN-C-S systems with defective PME earthing) can add £100 to
                £300. Supply tails replacement or meter tails upgrade where required adds a further
                £150 to £400 depending on the length involved.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include removal and responsible disposal of the old consumer unit, supply and
          installation of the new compliant metal consumer unit, all necessary circuit testing, and
          issue of the Electrical Installation Certificate and Building Regulations compliance
          documentation. Always obtain at least two or three written quotes from NICEIC or NAPIT
          registered electricians in Newcastle before proceeding.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing a Qualified Electrician in Newcastle',
    content: (
      <>
        <p>
          Consumer unit replacement is a complex, notifiable job that must be carried out by a
          competent and qualified electrician. In Newcastle there are many electricians to choose
          from, but verifying credentials before commissioning the work is essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — search the NICEIC online register or
                NAPIT register for approved contractors based in Newcastle or the wider Tyne and
                Wear area. Registration requires annual assessment of competence, insurance, and
                quality of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds 2382</strong> — the electrician should hold a current 18th
                Edition (BS 7671:2018) qualification (City and Guilds 2382-18) and be familiar with
                Amendment 3 (2024) requirements. The metal enclosure and RCD requirements are
                examined in this qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — verify that the electrician carries
                public liability insurance of at least £2 million. Reputable Newcastle electricians
                will be able to provide evidence of this on request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quote</strong> — always obtain a written, itemised quote that
                clearly states the scope of work, the make and model of consumer unit to be
                installed, and confirmation that all testing and certification is included in the
                price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Replacement in Newcastle',
    content: (
      <>
        <p>
          Consumer unit replacement is a bread-and-butter job for electricians across Newcastle and
          Tyne and Wear. With older housing stock throughout the city, demand is consistent
          year-round. Using the right tools to complete certification quickly and accurately helps
          you turn over more jobs per day and win follow-on work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate and Schedule of Test Results
                  on your phone while still on site. Record all circuit test values directly,
                  generate the PDF, and send it to the client before you leave. No evening
                  paperwork, no errors from transcribing notes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Additional Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When you find earthing deficiencies, defective wiring, or additional circuits
                  needed, quote them immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting tool
                  </SEOInternalLink>
                  . Customers are most likely to approve additional work while you are on site and
                  they can see the issue firsthand.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your consumer unit replacement business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, instant PDF export, and professional quoting. Complete more jobs per day and eliminate paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementNewcastlePage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Newcastle | Fuse Box Upgrade Newcastle"
      description="Consumer unit replacement in Newcastle — metal enclosure requirements since 2016, costs £400–800, BS EN 61439, Part P Building Regulations, NICEIC registered electricians. Complete guide for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Replacement Newcastle:{' '}
          <span className="text-yellow-400">Fuse Box Upgrade Guide 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about consumer unit replacement in Newcastle — the metal enclosure requirement, Part P Building Regulations, BS EN 61439, costs of £400 to £800, and how to find a qualified NICEIC or NAPIT registered electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement in Newcastle"
      relatedPages={relatedPages}
      ctaHeading="Complete Consumer Unit Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion with instant PDF export and built-in schedule of test results. 7-day free trial, cancel anytime."
    />
  );
}
