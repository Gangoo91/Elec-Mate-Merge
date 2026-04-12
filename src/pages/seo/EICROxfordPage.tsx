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
  Zap,
  Search,
  Clock,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Oxford', href: '/guides/eicr-oxford' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'oxford-costs', label: 'EICR Cost in Oxford' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Oxford Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, carried out in accordance with BS 7671:2018+A3:2024 (Section 631). It produces a detailed condition assessment using C1, C2, C3 and FI observation codes.",
  'Oxford EICR costs are among the highest outside London, driven by extremely high property values, strong demand, and elevated local labour rates. Expect to pay between £150 and £270 for a two-bedroom flat and £220 to £380 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it every five years. Oxford City Council enforces these requirements with fines of up to £30,000 for non-compliance.',
  'Oxford has one of the highest proportions of Victorian and Edwardian terraced housing in England, much of it converted into student HMOs. The city also contains a significant number of listed buildings in and around the city centre.',
  'Oxford City Council operates one of the most proactive HMO licensing and enforcement regimes in England. The council actively investigates complaints and has issued substantial civil penalties to non-compliant landlords.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Oxford?',
    answer:
      'Oxford EICR prices are among the highest outside London. A one-bedroom flat typically costs £130 to £220. A two-bedroom flat costs £150 to £270. A three-bedroom house costs £220 to £380. Student HMOs with multiple consumer units cost significantly more. Victorian terraced properties common in Jericho, Cowley, Headington, and East Oxford can take longer to inspect than modern properties, adding to the cost. Obtain at least two or three quotes and be cautious of prices significantly below these ranges.',
  },
  {
    question: 'Is an EICR a legal requirement for Oxford landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Oxford to obtain an EICR before a new tenancy begins and to renew it at least every five years. The inspector must be registered with an approved competent person scheme such as NICEIC, NAPIT, or ELECSA. Copies must be provided to tenants within 28 days and to Oxford City Council within seven days if requested. Fines of up to £30,000 per breach apply.',
  },
  {
    question: 'What are the most common EICR findings in Oxford properties?',
    answer:
      "Oxford's large stock of Victorian terraced properties converted into student HMOs produces characteristic EICR findings. Absent RCD protection on socket circuits is the most common C2 finding under Regulation 411.3.3 of BS 7671. Rubber-insulated cables in unmodernised properties are a C1 or C2 concern. Multi-era wiring in Victorian conversions, inadequate earthing and bonding, overloaded circuits, and poorly documented circuit arrangements are all common findings. Properties in East Oxford, Cowley, and Headington with 1960s and 1970s wiring may have ageing PVC insulation showing signs of degradation.",
  },
  {
    question: 'How long does an EICR take in Oxford?',
    answer:
      'A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Student HMOs with multiple consumer units, fire alarm systems, and emergency lighting may take five hours or more. Victorian terraced houses in Jericho, East Oxford, and Headington frequently have poor circuit documentation and wiring from multiple eras, which extends inspection time. Ensure the inspector has clear access to all rooms, the consumer unit, and the meter before they arrive.',
  },
  {
    question: 'Does Oxford City Council actively enforce EICR requirements?',
    answer:
      'Yes. Oxford City Council has a well-resourced Private Sector Housing team with one of the most active enforcement programmes in England. The council operates mandatory HMO licensing for qualifying properties, selective licensing in designated areas, and additional licensing for smaller HMOs. EICR compliance is a condition of all HMO licences. The council investigates tenant complaints proactively and has issued significant civil penalties to non-compliant landlords. Oxford landlords should treat EICR compliance as a matter of priority.',
  },
  {
    question: 'Do Oxford University and college-owned properties need an EICR?',
    answer:
      "University-owned accommodation managed by the university or colleges for students is generally exempt from the private rented sector regulations. However, properties let by colleges to non-students, staff, or other third parties may fall within the regulations. Private landlords operating near the university — the vast majority of Oxford's rental market — have no exemption and must comply fully. College accommodation offered to contractors or non-academic staff should be assessed against the regulations on a case-by-case basis.",
  },
  {
    question: 'What happens after an Unsatisfactory EICR in Oxford?',
    answer:
      "The landlord must arrange for remedial work to be completed within 28 days of receiving the report, or sooner if the inspector specifies. The work must be carried out by a qualified electrician. Written confirmation of completion must be provided to the tenant and to Oxford City Council if requested. Given the council's active enforcement stance, failure to complete remedial work within the required timeframe is likely to result in a formal investigation and potentially a civil penalty of up to £30,000.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK',
    description: 'National EICR pricing guide with breakdowns by property type and region.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-fail-rented-property',
    title: 'EICR Fail — Rented Property',
    description: 'What to do when a rented property receives an unsatisfactory EICR.',
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
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering periodic inspection.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eicr',
    heading: 'What Is an EICR?',
    content: (
      <>
        <p>
          An EICR (Electrical Installation Condition Report) is a formal inspection and test of a
          property's fixed electrical installation. It covers the wiring, consumer unit, protective
          devices, earthing and bonding, socket outlets, light fittings, and all fixed electrical
          equipment.
        </p>
        <p>
          The report is produced in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631). It is a detailed condition assessment using standardised C1, C2, C3, and FI
          observation codes — not a simple pass or fail. The overall outcome is either Satisfactory
          or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'oxford-costs',
    heading: 'EICR Cost in Oxford (2026 Prices)',
    content: (
      <>
        <p>
          Oxford EICR prices are among the highest outside London, reflecting the city's high
          property values and strong demand for qualified electricians. Below are typical 2026
          prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £130 to £220. Common in the city centre
                and Cowley Road area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £150 to £270. Victorian conversions near the
                city centre take longer to inspect than modern purpose-built flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £220 to £380. Victorian terraced houses in
                Jericho, East Oxford, and Headington are the backbone of Oxford's private rented
                sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house / HMO</strong> — £350 to £650+. Oxford's student HMO
                market is one of the densest in England. HMOs require broader inspection scope
                including fire alarm and emergency lighting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted separately.
          Some Oxford electricians offer combined EICR and remedial packages for portfolio landlords
          managing multiple student lets.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICRs in England',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          apply to all private rented properties in Oxford. The key requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — landlords must obtain an EICR before a new
                tenant moves in. This applies to all new tenancies from 1 July 2020 and all existing
                tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years or sooner if the inspector recommends it. BS 7671 Regulation 134.2 requires
                periodic inspection regimes to confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy must be provided to tenants within 28
                days. New tenants must receive a copy before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within 28
                days. Written confirmation must be provided to the tenant and to Oxford City Council
                if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Oxford City Council can issue civil penalties of up to
                £30,000 per breach and may revoke HMO licences for persistent non-compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Oxford Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Oxford's housing stock is characterised by a high concentration of Victorian and Edwardian
          terraced properties, many converted into student HMOs, alongside some of England's finest
          examples of listed and conservation area buildings:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket circuits not exceeding 20A. This is the most common C2 finding
                in Oxford's large stock of pre-1990s rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-era wiring in Victorian HMOs</strong> — student houses in Jericho,
                East Oxford, and Cowley have wiring installed and modified over many decades.
                Identifying circuits and establishing safe inspection sample sizes is complex.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing in conversions</strong> — Victorian houses split into
                student flats frequently have shared or inadequate earthing, undersized protective
                conductors, and absent main protective bonding. These are common C2 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building constraints on remedial work</strong> — Oxford city centre
                contains a high density of listed buildings. Where remedial work is needed in listed
                properties, listed building consent may be required before work can proceed. This
                can extend the timeline for landlord compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'observation-codes',
    heading: 'EICR Observation Codes Explained',
    content: (
      <>
        <p>
          Every observation on an EICR is classified using one of four codes defined in{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            BS 7671 and the associated model forms
          </SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate remedial action required. Common in Oxford properties
              with crumbling rubber-insulated cables or exposed live conductors in poorly maintained
              HMOs.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. Absent RCD protection
              (Regulation 411.3.3) and inadequate earthing are the most frequent C2 findings in
              Oxford's private rented sector.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 alone does not make the EICR Unsatisfactory. Common in
              Oxford properties where older accessories are functional but dated.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. Common in Oxford
              listed properties where cables cannot be traced without potentially damaging historic
              fabric.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During an EICR',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — consumer unit, protective devices, cable
                condition, socket outlets, light fittings, switches, and earthing and bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — continuity of protective conductors, ring final
                circuit continuity, and insulation resistance (minimum 1 megohm at 500V DC).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — earth fault loop impedance, prospective fault
                current, RCD operation times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR including
                Schedules of Circuit Details and Test Results as required by Section 631, with
                observation codes and an overall Satisfactory or Unsatisfactory assessment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-often',
    heading: 'How Often Is an EICR Needed?',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented property</strong> — at least every 5 years (legal requirement
                under the 2020 Regulations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied domestic</strong> — every 10 years recommended. Properties
                over 25 years old should be inspected every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years minimum under Oxford City Council HMO licensing
                conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented Oxford property, even if the current EICR has not
                expired.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Oxford',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search NICEIC, NAPIT, or ELECSA
                registers for Oxford-based inspectors accepted by Oxford City Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 or the 2394/2395 combination,
                plus a current 18th Edition (C&G 2382) qualification. Experience with Victorian HMOs
                and listed buildings is an advantage in Oxford.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — the inspector should carry professional indemnity
                insurance. Scheme-registered electricians are required to maintain adequate cover.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Oxford',
    content: (
      <>
        <p>
          Oxford's enormous student HMO market, high private rented sector density, and active
          council enforcement create very strong and consistent demand for EICR work. The high
          proportion of Victorian terraced HMOs with older wiring means that EICRs frequently
          identify substantial remedial opportunities.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete reports on your phone while still on site. AI board scanning, voice
                  test entry, and instant PDF export mean the landlord has the report before you
                  leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Instantly</h4>
                <p className="text-white text-sm leading-relaxed">
                  When the EICR identifies C1 or C2 observations, quote the remedial work on the day
                  using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Oxford landlords face a 28-day deadline — quoting on the day is the most
                  effective way to win the follow-on work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICROxfordPage() {
  return (
    <GuideTemplate
      title="EICR Oxford | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Oxford for 2026. Landlord legal requirements, Oxford City Council enforcement, Victorian HMO housing stock findings, observation codes, and how to find a qualified inspector. Prices from £130 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Oxford:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Oxford — costs by property type, landlord legal requirements, active council enforcement, Victorian and HMO housing stock findings, observation codes, and how to find a qualified inspector."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Oxford"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
