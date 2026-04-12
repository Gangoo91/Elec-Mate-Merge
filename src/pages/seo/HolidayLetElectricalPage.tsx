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
  Scale,
  Building2,
  Zap,
  Users,
  BellRing,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Holiday Let Electrical Safety', href: '/holiday-let-electrical' },
];

const tocItems = [
  { id: 'legal-position', label: 'Legal Position — No Mandatory EICR' },
  { id: 'occupiers-liability', label: 'Occupiers Liability Act Duty of Care' },
  { id: 'recommended-eicr', label: 'Recommended 5-Yearly EICR' },
  { id: 'pat-testing', label: 'PAT Testing for Portable Appliances' },
  { id: 'smoke-co-detection', label: 'Smoke & CO Detection' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'safety-certificate', label: 'Safety Certificate for Marketing' },
  { id: 'insurance-implications', label: 'Insurance Implications' },
  { id: 'landlord-checklist', label: 'Holiday Let Electrical Checklist' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'There is currently no mandatory EICR requirement for holiday lets in England — unlike residential lettings, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 do not apply to holiday accommodation.',
  'Holiday let owners still owe a duty of care to guests under the Occupiers Liability Act 1957. If a guest is injured by a defective electrical installation, the owner can be held liable regardless of whether an EICR was obtained.',
  'A five-yearly EICR is strongly recommended by industry bodies and many insurers. Some holiday let insurance policies now require a current EICR as a policy condition.',
  'PAT testing of all portable appliances is recommended annually or at each deep clean. Guests bring and use unfamiliar appliances — portable appliance safety is a significant risk area for holiday lets.',
  'Smoke alarms and carbon monoxide alarms are not currently mandated by statute for holiday lets in England, but the Regulatory Reform (Fire Safety) Order 2005 may apply to larger properties. Smoke and CO alarms are considered essential duty-of-care measures.',
  'Having a current EICR certificate and PAT testing records is a significant marketing advantage on platforms such as Airbnb, Booking.com, and holiday cottage directories, where guests increasingly ask about safety credentials.',
];

const faqs = [
  {
    question: 'Do holiday lets require an EICR in England?',
    answer:
      'There is currently no statutory requirement for a mandatory EICR in holiday lets in England. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply only to properties let under assured shorthold tenancies, assured tenancies, and regulated tenancies — not holiday lets. However, the absence of a legal obligation does not remove the duty of care owed to guests under the Occupiers Liability Act 1957. A five-yearly EICR is strongly recommended and is becoming a standard insurance and marketing requirement.',
  },
  {
    question: 'What duty of care do holiday let owners owe to guests?',
    answer:
      "Under the Occupiers Liability Act 1957, holiday let owners owe a common duty of care to all guests — visitors invited onto the premises for a purpose connected with the owner's business. This duty requires the owner to take such care as is reasonable in all circumstances to ensure that visitors are reasonably safe for the purposes of their visit. In practice, this means the electrical installation must be maintained in a safe condition, and the owner must take reasonable steps to identify and remedy defects. Failure to obtain an EICR is strong evidence of failure to take reasonable care.",
  },
  {
    question: 'How often should a holiday let have an EICR?',
    answer:
      'Industry bodies including NICEIC and NAPIT recommend a five-yearly EICR for holiday lets — the same interval as for residential rental properties. Many holiday let insurance policies also specify five years as the maximum interval. Where the property is older, has had significant electrical work carried out, or has not been previously inspected, an immediate EICR is advisable before guests are admitted.',
  },
  {
    question: 'Is PAT testing a legal requirement for holiday lets?',
    answer:
      'PAT testing is not specifically required by statute for holiday lets, but the general duty of care under the Occupiers Liability Act 1957 extends to portable appliances provided for guest use. HSE guidance suggests that portable appliance testing is a reasonable precaution for business premises including holiday lets. Annual PAT testing of all portable appliances — kettles, toasters, televisions, lamps, hairdryers, and kitchen equipment — is strongly recommended.',
  },
  {
    question: 'Do I need smoke alarms in my holiday let?',
    answer:
      'There is no specific statutory requirement mandating smoke alarms in holiday lets in England under residential tenancy legislation. However, the Regulatory Reform (Fire Safety) Order 2005 may apply to larger properties or those operating more commercially. As a duty-of-care measure under the Occupiers Liability Act 1957, fitting interlinked smoke alarms on every floor and carbon monoxide alarms in rooms with solid fuel or gas appliances is strongly recommended. Absence of smoke alarms would be strong evidence of failure to take reasonable care if a fire causes injury.',
  },
  {
    question: 'Does my holiday let insurance require an EICR?',
    answer:
      'Many specialist holiday let insurance policies now require a current EICR as a policy condition. Policies from providers such as Hiscox, Zurich, and specialist holiday let insurers commonly ask for confirmation that the electrical installation has been inspected within the past five years. Failure to disclose that an EICR has not been carried out, or failure to carry out an EICR required by the policy, can result in a claim being declined or the policy being voided. Always check your specific policy wording.',
  },
  {
    question: 'Can I use a current EICR to market my holiday let?',
    answer:
      'Yes, and this is strongly encouraged. Platforms including Airbnb, Booking.com, and UK holiday cottage directories are increasingly allowing — and in some cases requiring — safety credentials in listings. A current EICR certificate, combined with a PAT testing record, smoke and CO alarm certification, and a gas safety certificate where applicable, provides strong reassurance to guests and can improve booking rates. Some directories display safety credential badges prominently in search results.',
  },
  {
    question: 'What does a holiday let EICR inspection cover?',
    answer:
      'A holiday let EICR covers the entire fixed electrical installation: the consumer unit (fuse board), all fixed wiring, socket outlets, switches, light fittings, and any fixed electrical heating or cooking equipment. The inspector will test insulation resistance, earth continuity, RCD trip times, and prospective fault current, and will produce an EICR classified as satisfactory or unsatisfactory under BS 7671:2018. The report does not cover portable appliances, which are covered separately by PAT testing.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/airbnb-electrical-safety',
    title: 'Airbnb Electrical Safety',
    description: 'Host guide to electrical compliance for Airbnb and short-let properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide-uk',
    title: 'PAT Testing Guide',
    description: 'When PAT testing is required, what it covers, and how often it should be done.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'legal-position',
    heading: 'The Legal Position — No Mandatory EICR for Holiday Lets',
    content: (
      <>
        <p>
          Unlike residential rental properties, holiday lets in England are not currently subject to
          the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.
          Those regulations apply only to properties let under assured shorthold tenancies, assured
          tenancies, and regulated tenancies. A holiday let — defined as accommodation let for a
          short period to guests who are not occupying the property as their main or only home —
          falls outside the scope of these regulations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not caught by the 2020 Regulations</strong> — the mandatory EICR regime for
                landlords does not apply to holiday accommodation, short-term holiday lets, or
                properties let through platforms such as Airbnb where guests are tourists or
                short-stay visitors rather than tenants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate fire safety obligations may apply</strong> — larger holiday
                properties operated on a more commercial basis may be subject to the Regulatory
                Reform (Fire Safety) Order 2005, which applies to non-domestic premises and premises
                to which members of the public have access. A fire risk assessment may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The absence of a legal duty does not remove liability</strong> — the
                Occupiers Liability Act 1957 imposes a duty of care on all owners of premises to
                which they invite visitors for a business purpose. A holiday let is a business use
                of the property and this duty applies fully.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The position for Wales differs — the Renting Homes (Wales) Act 2016 and associated
          regulations impose electrical safety obligations on some Welsh holiday lets. Scottish law
          also differs. This guide focuses on England.
        </p>
      </>
    ),
  },
  {
    id: 'occupiers-liability',
    heading: 'Duty of Care Under the Occupiers Liability Act 1957',
    content: (
      <>
        <p>
          The Occupiers Liability Act 1957 imposes a common duty of care on occupiers — which
          includes property owners who let their property for holiday use — to ensure that visitors
          are reasonably safe while using the premises for the purposes for which they were invited.
          This duty is not removed by the absence of a specific EICR regulation.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Liability for electrical defects</strong> — if a guest is injured or killed
                by an electrical fault — electric shock, fire caused by a wiring defect, or
                malfunction of a fixed appliance — the holiday let owner may face civil liability
                under the 1957 Act. Compensation claims can be substantial, particularly where
                injuries are serious or fatal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failure to inspect as evidence of negligence</strong> — courts will consider
                whether the owner took reasonable steps to identify and remedy electrical hazards.
                Having no EICR, no PAT testing records, and no inspection history is strong evidence
                of failure to take reasonable care. Having a current EICR significantly strengthens
                the owner's position in any claim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Liability to children</strong> — the Occupiers Liability Act 1984 also
                applies in relation to trespassers, including children. Where a holiday let has a
                garden or outbuildings accessible to children, the owner must take reasonable steps
                to protect children from electrical hazards in those areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recommended-eicr',
    heading: 'Recommended Five-Yearly EICR for Holiday Lets',
    content: (
      <>
        <p>
          Industry bodies including NICEIC, NAPIT, and the UK Holiday Letting Association recommend
          that holiday let owners obtain an EICR at least every five years — the same interval as
          for residential rental properties. This recommendation reflects the duty of care owed to
          guests and the requirements of most specialist holiday let insurance policies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five years — standard recommended interval</strong> — consistent with the
                residential landlord EICR requirement and with BS 7671 guidance on periodic
                inspection of domestic and similar premises. Properties with older wiring or a
                history of defects may warrant a shorter interval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On acquisition of a new holiday let</strong> — commission an EICR
                immediately when purchasing a property for holiday letting, before the first guests
                are admitted. Do not rely on any EICR commissioned by the previous owner for a
                different purpose without confirming its scope and validity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After significant electrical work</strong> — any rewire, consumer unit
                replacement, or significant circuit addition should be followed by a fresh EICR to
                confirm the installation remains safe and compliant. The contractor carrying out the
                work should issue an Electrical Installation Certificate (EIC) for notifiable work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep the report on file</strong> — retain every EICR carried out on the
                property. In the event of a claim, these records demonstrate the history of
                inspection and the steps taken to maintain electrical safety.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pat-testing',
    heading: 'PAT Testing for Portable Appliances',
    content: (
      <>
        <p>
          Holiday lets typically contain a large number of portable electrical appliances — kitchen
          equipment, televisions, lamps, hairdryers, electric blankets, and garden tools. Portable
          appliance testing (PAT testing) is a practical way to identify defective appliances before
          they injure guests.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual PAT testing recommended</strong> — test all portable appliances
                provided for guest use at least once a year, typically at the end of the main
                letting season or as part of an annual safety review. High-use items in busy holiday
                lets may warrant more frequent testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What PAT testing covers</strong> — visual inspection of plugs, cables, and
                appliance casings plus electrical testing of insulation resistance and earth
                continuity. Each tested appliance receives a pass or fail label with the test date
                and next test due date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric blankets — additional risk</strong> — electric blankets are one of
                the highest-risk portable appliances in holiday lets. They should be tested annually
                and replaced every ten years regardless of condition. Consider removing electric
                blankets from holiday lets entirely and substituting with good-quality duvets to
                eliminate the risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep a PAT testing register</strong> — maintain a record of every appliance
                tested, the test date, result, and tester's details. This register is evidence of
                reasonable care in any liability claim and is often requested by insurers on
                renewal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smoke-co-detection',
    heading: 'Smoke and Carbon Monoxide Detection',
    content: (
      <>
        <p>
          Whilst there is currently no statutory requirement mandating smoke alarms specifically in
          holiday lets in England under residential tenancy legislation, the duty of care under the
          Occupiers Liability Act 1957 makes fitting them effectively obligatory in practice.
          Absence of smoke alarms would be very difficult to defend in a personal injury or fatality
          claim following a fire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke alarms on every floor</strong> — fit an interlinked smoke alarm on
                every floor of the holiday let, positioned in hallways and at the top of stairwells.
                Mains-powered alarms with battery back-up are preferred over battery-only alarms.
                Test alarms at every changeover clean.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide alarms</strong> — fit a CO alarm in every room containing a
                solid fuel burning appliance (log burner, open fire) and in any room adjacent to a
                gas boiler or gas cooking appliance. CO poisoning is a significant risk in holiday
                lets where guests may use log burners or solid fuel fires incorrectly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat detectors in kitchens</strong> — install a heat detector rather than a
                smoke detector in the kitchen to avoid false alarms from cooking. The heat detector
                should be interlinked with the smoke alarm network.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guest information — what to do in a fire</strong> — post clear instructions
                in each bedroom and in the hallway explaining the fire exit route, the location of
                the fire assembly point, and instructions for raising the alarm. This is a basic
                duty-of-care requirement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection in Holiday Lets',
    content: (
      <>
        <p>
          RCD (Residual Current Device) protection is a fundamental electrical safety measure.
          Regulation 411.3.3 of BS 7671:2018 requires 30mA RCD protection on socket-outlet circuits
          — a requirement that applies to new and replacement installations regardless of property
          type.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection on all socket circuits</strong> — all socket-outlet circuits
                rated up to 32A must be protected by a 30mA RCD under Regulation 411.3.3. If the
                holiday let's consumer unit does not provide this, an EICR will record a C2
                observation and a consumer unit upgrade will be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor circuits — higher risk in holiday lets</strong> — guests frequently
                use outdoor areas: gardens, patios, hot tubs, and outbuildings. All outdoor circuits
                must have 30mA RCD protection. Consider installing additional outdoor socket outlets
                with integrated RCD protection for safety and guest convenience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot tubs and swimming pools</strong> — if the holiday let includes a hot tub
                or swimming pool, the electrical supply must comply with BS 7671 Part 7 special
                locations (Section 702 for swimming pools and Section 709 for marinas and similar).
                These areas require additional protection measures including supplementary
                equipotential bonding and specific circuit arrangements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'safety-certificate',
    heading: 'Safety Certificate for Marketing Your Holiday Let',
    content: (
      <>
        <p>
          A current EICR certificate is increasingly used as a marketing tool by holiday let owners
          to differentiate their property and reassure prospective guests. Safety credentials are
          becoming an expected feature of professionally managed holiday lets.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listing on booking platforms</strong> — platforms including Airbnb, Vrbo,
                and Booking.com allow or encourage owners to display safety certificates. Airbnb has
                expanded its safety requirements for UK hosts. A current EICR, combined with a gas
                safety certificate and PAT testing record, can be highlighted in the listing
                description to increase guest confidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday cottage directory accreditation</strong> — directories such as
                Cottages.com, Sykes Cottages, and VisitBritain's quality assurance schemes
                increasingly ask about electrical safety certificates. Some require confirmation of
                a current EICR as a condition of listing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reassurance for families with children</strong> — families booking holiday
                accommodation are increasingly aware of electrical safety risks. Displaying a
                current EICR certificate is a straightforward way to provide reassurance and may tip
                a booking decision in your favour.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'insurance-implications',
    heading: 'Insurance Implications for Holiday Let Owners',
    content: (
      <>
        <p>
          Holiday let insurance is a specialist product that differs significantly from standard
          home insurance. Many specialist holiday let insurers now include electrical safety
          requirements in their policy conditions, and failure to comply can affect coverage.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR as a policy condition</strong> — specialist holiday let insurers
                including Hiscox, Zurich, and various Lloyd's market providers commonly require a
                current EICR (typically within the past five years) as a condition of cover. Failure
                to disclose the absence of an EICR, or failure to carry out an EICR required by the
                policy, may result in a claim being declined or the policy being voided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability claims — uninsured exposure</strong> — if an EICR is
                required by your policy and has not been obtained, a public liability claim arising
                from an electrical injury may not be covered. The costs of an uninsured personal
                injury claim can be catastrophic for a property owner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contents and building claims</strong> — an electrical fire caused by a
                defective installation without a current EICR may give the insurer grounds to
                dispute a buildings or contents claim on the basis of failure to maintain the
                property in a safe condition. Check your policy wording carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT testing records — often required</strong> — many policies also require
                evidence of PAT testing for portable appliances. Keep testing records available and
                present them to your insurer on renewal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'landlord-checklist',
    heading: 'Holiday Let Electrical Safety Checklist',
    content: (
      <>
        <p>
          Use this checklist to assess the electrical safety of your holiday let and identify
          actions required before admitting guests.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR within the past five years</strong> — if you do not have a current
                EICR, commission one from a{' '}
                <SEOInternalLink href="/guides/competent-person-scheme-guide">
                  NICEIC, NAPIT, or ELECSA registered electrician
                </SEOInternalLink>{' '}
                before the next letting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT testing of all portable appliances</strong> — test annually and keep a
                register of all appliances, test dates, and results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke alarms on every floor</strong> — mains-powered with battery back-up,
                interlinked. Test at every changeover clean.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide alarms</strong> — in every room with a solid fuel or gas
                appliance. Test at every changeover clean.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection on all socket circuits</strong> — check the consumer unit
                provides 30mA RCD protection on all socket-outlet circuits. If not, arrange upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor circuits protected</strong> — garden sockets, outbuilding supplies,
                hot tub connections, and outdoor lighting all require appropriate RCD protection and
                weatherproof fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance policy reviewed</strong> — check policy wording for EICR and PAT
                testing requirements. Ensure all certificates are available for inspection by the
                insurer on renewal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Holiday Let Inspection Work',
    content: (
      <>
        <p>
          Holiday lets represent a growing and underserved market for electricians specialising in
          inspection and testing. Owners are often unaware of their duty-of-care obligations, many
          have no EICR on record, and the seasonal nature of the market creates recurring inspection
          and remedial work opportunities.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs and PAT Tests On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full report on your phone while on site, then send the PDF
                  directly to the property owner. Combined EICR and PAT testing visits maximise
                  revenue per trip and give owners everything they need in a single appointment.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build Recurring Relationships</h4>
                <p className="text-white text-sm leading-relaxed">
                  Holiday let owners need annual PAT testing, five-yearly EICRs, and ongoing
                  remedial work. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to provide professional quotes on the day and convert inspection clients into
                  long-term maintenance relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your holiday let electrical business with Elec-Mate"
          description="Complete EICRs and PAT tests on site, quote remedial works immediately, and build recurring relationships with holiday let owners. 7-day free trial for UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HolidayLetElectricalPage() {
  return (
    <GuideTemplate
      title="Holiday Let Electrical Safety UK | Airbnb & Holiday Cottage Guide"
      description="Holiday let electrical safety guide for UK property owners. No mandatory EICR but duty of care under Occupiers Liability Act 1957. Recommended five-yearly EICR, PAT testing, smoke and CO detection, RCD protection, insurance implications, and marketing your safety credentials."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Holiday Let Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Holiday Let Electrical Safety UK:{' '}
          <span className="text-yellow-400">Airbnb & Holiday Cottage Guide 2026</span>
        </>
      }
      heroSubtitle="Holiday lets are not subject to mandatory EICR legislation, but owners still owe a duty of care to guests under the Occupiers Liability Act 1957. This guide explains your legal position, the recommended five-yearly EICR, PAT testing, smoke and CO detection, RCD protection, insurance implications, and how to use safety certificates for marketing."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Holiday Let Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Complete Holiday Let EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
