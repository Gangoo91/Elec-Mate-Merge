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
  Building2,
  Zap,
  Search,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/tools/eicr-certificate' },
  { label: 'EICR Dundee', href: '/eicr-dundee' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'scottish-law', label: 'Scottish Legal Requirements' },
  { id: 'dundee-property', label: 'Dundee Property & Wiring' },
  { id: 'eicr-process', label: 'The EICR Process' },
  { id: 'observation-codes', label: 'Observation Codes' },
  { id: 'costs', label: 'EICR Costs in Dundee' },
  { id: 'finding-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Private landlords in Dundee must comply with Scotland's Repairing Standard under the Housing (Scotland) Act 2006, which requires a valid EICR (maximum five years old) for all privately rented properties.",
  'Dundee has a significant stock of pre-war tenement properties, many of which retain original rubber-insulated wiring that degrades with age and is frequently found to be C1 or C2 on EICR inspection.',
  'EICR costs in Dundee typically range from £95 to £190 for a one-bedroom flat and £160 to £320 for a three-bedroom house, making Dundee one of the more affordable Scottish cities for inspection work.',
  'All EICR inspections must be carried out by a qualified and competent person — in practice, someone registered with NICEIC, NAPIT, or ELECSA and holding City and Guilds 2391 or equivalent.',
  'Dundee City Council operates a private landlord registration scheme; failure to maintain electrical compliance can result in registration sanctions as well as tenant enforcement action through the Housing and Property Chamber.',
];

const faqs = [
  {
    question: 'Is an EICR required for rented properties in Dundee?',
    answer:
      "Yes. Under the Housing (Scotland) Act 2006 and Scotland's Repairing Standard, private landlords in Dundee must ensure the electrical installation in their rental property is in a reasonable state of repair and safe. A valid EICR, no more than five years old, is the accepted means of demonstrating compliance. Dundee City Council can take enforcement action against landlords who fail to comply, including sanctions on their landlord registration.",
  },
  {
    question: 'How much does an EICR cost in Dundee?',
    answer:
      'Dundee EICR costs are among the more affordable in Scotland. A one-bedroom flat typically costs £95 to £190, a two-bedroom property £140 to £260, and a three-bedroom house £160 to £320. Older tenement properties with complex or degraded wiring may cost more due to the additional time required for a thorough inspection. These figures cover the inspection and report only; any remedial work identified is quoted separately.',
  },
  {
    question: 'How long does an EICR take in Dundee?',
    answer:
      'A one or two-bedroom Dundee flat typically takes two to three hours. A three-bedroom house takes three to five hours. Older properties with original rubber-insulated wiring or non-standard installations may take longer, as the inspector must proceed more carefully and may need to take additional measurements to reach a safe conclusion about the condition of the wiring.',
  },
  {
    question: 'What are common EICR findings in Dundee properties?',
    answer:
      "Dundee's older tenement stock frequently presents rubber-insulated wiring (which perishes with age), the absence of RCD protection on socket-outlet circuits (a C2 observation under BS 7671 Regulation 411.3.3), inadequate earthing and bonding, overloaded or obsolete consumer units, and unprotected cables in roof spaces. Many Dundee properties also show evidence of unpermitted electrical work carried out by unqualified persons, which creates a range of additional inspection findings.",
  },
  {
    question: 'What happens if a Dundee rental property fails the EICR?',
    answer:
      'An EICR containing C1 or C2 observations is classified as Unsatisfactory. Landlords in Scotland must complete all remedial work within 28 days of the inspection date, or sooner if the inspector specifies. Written confirmation from a qualified electrician must be obtained once the work is complete and provided to the tenant. Failure to complete remedial work is a breach of the Repairing Standard and can result in enforcement action by the Housing and Property Chamber.',
  },
  {
    question: 'Do I need an EICR for my Dundee owner-occupied home?',
    answer:
      "Owner-occupiers are not legally required to obtain an EICR, but BS 7671 recommends periodic inspection at a maximum of ten years or on change of occupancy for domestic properties. Given Dundee's stock of older properties, many electricians recommend shorter intervals — particularly for properties over 30 years old or where there have been no previous inspection records. An EICR provides valuable peace of mind and can identify safety issues before they cause harm.",
  },
  {
    question: 'What qualifications should an EICR inspector in Dundee have?',
    answer:
      'The inspector should hold City and Guilds 2391 (Inspection and Testing of Electrical Installations) or the equivalent C&G 2395 qualification, plus a current BS 7671 18th Edition qualification (C&G 2382). Registration with NICEIC, NAPIT, or ELECSA provides independent assurance of qualifications, insurance, and regular technical assessment. Always verify registration before commissioning an EICR.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Explained',
    description:
      'A complete guide to Electrical Installation Condition Reports — what they check, what the codes mean, and what happens next.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Full guide to landlord EICR obligations, Scottish regulations, compliance deadlines, and managing multiple properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description:
      'What C1, C2, C3 and FI codes mean, what action is required, and real-world examples from Scottish properties.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete EICRs on your phone with AI board scanning, voice test entry, and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eicr',
    heading: 'What Is an Electrical Installation Condition Report?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is a formal assessment of the safety
          and condition of a fixed electrical installation in an existing building. It is the
          standard method used by qualified electricians to evaluate whether an existing
          installation is safe and fit for continued use, and whether it complies with current
          standards set out in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024 (the IET Wiring Regulations, 18th Edition)
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope</strong> — the EICR covers all fixed electrical installations:
                consumer unit, wiring, socket outlets, switches, light fittings, earthing and
                bonding arrangements, and any fixed electrical equipment. It does not cover portable
                appliances (which are assessed by Portable Appliance Testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection and testing</strong> — the inspection combines a thorough
                visual examination with a series of electrical tests using calibrated instruments.
                Test results are recorded in the Schedule of Test Results, which forms part of the
                completed{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR document</SEOInternalLink>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overall outcome</strong> — the EICR is classified as Satisfactory or
                Unsatisfactory. An Unsatisfactory result means the installation contains C1 or C2
                coded observations that must be rectified. C3 observations (improvement recommended)
                do not make the EICR Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Next inspection date</strong> — the EICR states a recommended date for the
                next inspection. For private rented properties in Scotland, this is typically five
                years (or as specified by the installer, whichever is sooner).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scottish-law',
    heading: 'Legal Requirements for EICRs in Scotland',
    content: (
      <>
        <p>
          Scotland has its own legislative framework for electrical safety in the private rented
          sector, distinct from the regulations that apply in England and Wales. Dundee landlords
          must comply with Scottish law.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repairing Standard (Housing (Scotland) Act 2006)</strong> — private
                landlords must ensure that the electrical installation and any electrical fixtures,
                fittings, and appliances provided under the tenancy are in a reasonable state of
                repair and in proper working order. A valid EICR (no more than five years old) is
                the standard means of demonstrating compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private Housing (Tenancies) (Scotland) Act 2016</strong> — strengthened
                tenant rights and landlord obligations in the private rented sector. Landlords
                cannot lawfully let a property that does not meet the Repairing Standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration</strong> — all private landlords in Dundee must be
                registered with Dundee City Council. Electrical non-compliance can result in
                registration sanctions, preventing the landlord from legally letting properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant enforcement</strong> — tenants can apply to the First-tier Tribunal
                (Housing and Property Chamber) if a landlord fails to comply with the Repairing
                Standard. The tribunal can order the landlord to carry out required work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dundee-property',
    heading: 'Dundee Property Stock and Electrical Wiring',
    content: (
      <>
        <p>
          Dundee has a diverse housing stock that shapes the nature of EICR work in the city. The
          private rented sector includes pre-war tenement buildings, post-war local authority
          housing (much of which has since been sold), and newer purpose-built developments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-war tenements</strong> — Dundee's older tenement blocks frequently
                retain original rubber-insulated wiring or early PVC wiring. Rubber insulation
                degrades with age, becoming brittle and cracking, creating serious insulation
                failure risks. Such wiring is typically coded C2 or C1 depending on its condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — properties wired or last rewired before the
                mid-1990s frequently lack RCD protection on socket-outlet circuits. BS 7671
                Regulation 411.3.3 requires RCD protection (not exceeding 30mA rated operating
                current) on socket-outlet circuits. Absence is coded C2 and makes the EICR
                Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war social housing stock</strong> — much of Dundee's post-war housing
                was built between 1950 and 1975. These properties may have been rewired at some
                point but can still present earthing and bonding deficiencies, or dated consumer
                units without RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newer developments</strong> — properties built or comprehensively rewired
                after 2000 are generally compliant with the then-current edition of BS 7671 but may
                require assessment against the current 18th Edition requirements. Consumer units in
                older new-builds may lack arc fault detection or updated RCD protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-process',
    heading: 'The EICR Process in Dundee',
    content: (
      <>
        <p>
          Understanding the EICR process helps property owners and tenants know what to expect and
          how to prepare.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before the inspection</strong> — ensure all rooms, cupboards, and the loft
                hatch (if relevant) are accessible. The consumer unit must be reachable throughout.
                Notify tenants in advance that power may be briefly interrupted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector examines all accessible parts of
                the fixed installation, checking for damage, deterioration, non-compliant wiring,
                and the general condition of accessories and the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical testing</strong> — individual circuits are tested in turn,
                typically involving de-energising each circuit to carry out tests including earth
                continuity, insulation resistance, polarity, earth fault loop impedance, and RCD
                operating time. Results are recorded in the Schedule of Test Results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR (ideally on
                site using a digital tool) and provides the report to the client. The report states
                Satisfactory or Unsatisfactory, lists all observations with codes, and recommends
                the next inspection date.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'observation-codes',
    heading: 'EICR Observation Codes',
    content: (
      <>
        <p>
          Every finding noted during an EICR is assigned a classification code. The four codes used
          are defined in BS 7671 and its guidance notes.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present</strong> — immediate risk of injury. Requires immediate
                remedial action. May require disconnection of the affected circuit. Always makes the
                EICR Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous</strong> — urgent action required. The defect is
                potentially dangerous but not an immediate risk. Always makes the EICR
                Unsatisfactory. Common C2 findings in Dundee: absence of RCD protection, degraded
                rubber insulation, inadequate bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended</strong> — the installation does not fully meet
                current standards but is not unsafe. Does not make the EICR Unsatisfactory on its
                own.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-white mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation required</strong> — a potential issue has been
                identified that cannot be assessed without further investigation. Makes the EICR
                Unsatisfactory until resolved.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Dundee (2026 Prices)',
    content: (
      <>
        <p>
          Dundee offers some of the most competitive EICR pricing in Scotland, reflecting the city's
          lower overall labour rates compared with Edinburgh or Glasgow.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £95 to £190. Most Dundee flats have 3 to 5
                circuits and a single consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £140 to £260. Tenement conversions may be
                more complex than purpose-built flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £160 to £320. Older properties with degraded
                wiring will be at the higher end of the range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or larger property</strong> — £280 to £550+. Multiple consumer units,
                fire alarm systems, and communal area circuits increase scope and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remedial work identified during an EICR is quoted separately. A consumer unit upgrade to
          provide full RCD protection — one of the most common remedial requirements in Dundee —
          typically costs £350 to £650 including materials and labour.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspector',
    heading: 'Finding a Qualified EICR Inspector in Dundee',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme membership</strong> — use the NICEIC, NAPIT, or
                ELECSA online registers to find electricians operating in Dundee. Scheme membership
                confirms qualifications, public liability and professional indemnity insurance, and
                regular technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing qualifications</strong> — verify that the electrician
                holds City and Guilds 2391 or C&G 2395 (Inspection and Testing) and a current BS
                7671 18th Edition qualification (C&G 2382). Not all electricians hold these
                qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with local property types</strong> — prefer electricians with
                proven experience of Dundee's tenement and post-war housing stock. They will be more
                familiar with the wiring issues commonly encountered and better placed to assess
                them accurately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Beware very cheap quotes</strong> — a thorough EICR for a Dundee
                three-bedroom property takes three to five hours and requires expensive calibrated
                instruments. Quotes significantly below market rate may indicate a superficial
                inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Dundee',
    content: (
      <>
        <p>
          Dundee's private rented sector creates consistent demand for landlord EICRs. Building a
          reputation for reliable, thorough inspection work can generate a significant volume of
          repeat business from landlords managing multiple Dundee properties.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site in Dundee</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete reports on your phone while still at the Dundee property. AI board
                  scanning, voice test entry, and instant PDF export mean landlords get the report
                  before you even leave the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Dundee Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When you identify C1 or C2 observations, quote the remedial work immediately using
                  the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Scottish landlords must act within 28 days — the electrician who quotes on the
                  day wins the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Dundee EICR business with Elec-Mate"
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

export default function EICRDundeePage() {
  return (
    <GuideTemplate
      title="EICR Dundee | Electrical Inspection Dundee"
      description="EICR Dundee — costs, Scottish legal requirements, and what to expect from an electrical inspection in Dundee. Guide for landlords, homeowners, and electricians covering Dundee's tenement properties, Scottish Repairing Standard, and 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Dundee: <span className="text-yellow-400">Electrical Inspection Guide 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about Electrical Installation Condition Reports in Dundee — Scottish legal requirements, costs, what inspectors look for in Dundee's tenement properties, finding qualified inspectors, and guidance for electricians."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Dundee"
      relatedPages={relatedPages}
      ctaHeading="Complete Dundee EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
