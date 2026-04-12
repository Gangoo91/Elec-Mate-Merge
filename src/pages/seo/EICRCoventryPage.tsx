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
  { label: 'EICR Coventry', href: '/guides/eicr-coventry' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'coventry-costs', label: 'EICR Cost in Coventry' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Coventry Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, carried out in accordance with BS 7671:2018+A3:2024 (Section 631). It produces a condition assessment using C1, C2, C3 and FI observation codes.",
  'Coventry EICR costs are broadly in line with the Midlands average. Expect to pay between £100 and £200 for a two-bedroom flat and £160 to £280 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it every five years. Coventry City Council enforces these requirements and can fine non-compliant landlords up to £30,000 per breach.',
  'Coventry has a high proportion of post-war rebuilt housing following extensive wartime bombing, alongside 1960s and 1970s social housing and Victorian terraced properties that survived the Blitz. Post-war and mid-century housing commonly returns C2 EICR findings for ageing wiring and absent RCD protection.',
  'The University of Warwick and Coventry University generate strong HMO demand in the city. Coventry City Council operates mandatory HMO licensing and has an active private sector housing enforcement team.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Coventry?',
    answer:
      'Coventry EICR prices are broadly in line with the West Midlands average. A one-bedroom flat typically costs £85 to £165. A two-bedroom flat costs £100 to £200. A three-bedroom house costs £160 to £280. Larger properties or HMOs with multiple consumer units cost more. The age and condition of the installation affects how long the inspection takes — 1960s and 1970s properties may take longer than modern builds. Obtain two or three quotes and be cautious of prices significantly below the typical range.',
  },
  {
    question: 'Is an EICR a legal requirement for Coventry landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Coventry to obtain an EICR before a new tenancy begins and to renew it at least every five years. The inspector must be registered with an approved competent person scheme such as NICEIC, NAPIT, or ELECSA. Copies must be provided to tenants within 28 days and to Coventry City Council within seven days if requested. Fines of up to £30,000 per breach apply.',
  },
  {
    question: 'What are the most common EICR findings in Coventry properties?',
    answer:
      "Coventry's post-war rebuilt housing stock produces characteristic EICR findings. Absent RCD protection on socket circuits is the most common C2 finding under Regulation 411.3.3 of BS 7671. Ageing PVC wiring from the 1960s and 1970s with degraded insulation, inadequate earthing and bonding, overloaded circuits in student HMOs, and consumer units that are inadequate for modern load demands are all common findings. Victorian properties in the Spon End, Chapelfields, and Earlsdon areas that survived wartime bombing may also have older wiring types requiring replacement.",
  },
  {
    question: 'How long does an EICR take in Coventry?',
    answer:
      'A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Post-war and 1960s properties often have reasonable circuit documentation but may still take additional time if wiring is in poor condition or there are multiple consumer units. HMOs near Coventry University or Warwick University campus with multiple consumer units, fire alarm systems, and emergency lighting may take a full day. Ensure the inspector has clear access to all rooms, the consumer unit, and the meter.',
  },
  {
    question: 'Does Coventry City Council actively enforce EICR requirements?',
    answer:
      'Yes. Coventry City Council has a Housing Standards team that enforces electrical safety requirements in the private rented sector. The council operates mandatory HMO licensing for qualifying properties and EICR compliance is a condition of all licences. The council investigates tenant complaints and conducts proactive inspections. Non-compliant landlords risk civil penalties of up to £30,000 per breach and HMO licence refusal or revocation.',
  },
  {
    question: 'Do Coventry student landlords need an EICR?',
    answer:
      'Yes. Landlords renting to students have exactly the same EICR obligations as any other private landlord. The 2020 Regulations make no distinction between student tenancies and other private tenancies. Student HMOs near Coventry University and the University of Warwick campuses must have a valid EICR as a condition of their HMO licence. Given the high occupancy levels and the heavy use of electrical appliances typical of student accommodation, EICRs in this sector often identify overloaded circuits and other issues requiring remedial work.',
  },
  {
    question: 'What happens if a Coventry rental property has an Unsatisfactory EICR?',
    answer:
      'The landlord must arrange for remedial work to be completed within 28 days of receiving the report, or sooner if the inspector specifies. The work must be carried out by a qualified electrician. Written confirmation of completion must be provided to the tenant and to Coventry City Council if requested. If C1 observations are present, the affected circuit should be isolated immediately until repaired. Failure to complete remedial work within the required timeframe can result in a civil penalty of up to £30,000.',
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
          observation codes. The overall assessment is either Satisfactory or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'coventry-costs',
    heading: 'EICR Cost in Coventry (2026 Prices)',
    content: (
      <>
        <p>
          Coventry EICR prices are broadly in line with the West Midlands average. Below are typical
          2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £85 to £165. Common in the city centre
                and student areas near Coventry University.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £100 to £200. Post-war and 1960s purpose- built
                flats are common across Coventry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £160 to £280. Post-war rebuilt and 1960s
                semi-detached properties are the most common house type in Coventry's private rented
                sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house / HMO</strong> — £260 to £500+. Student HMOs near
                Coventry University and the University of Warwick have broader inspection scope
                including fire alarm and emergency lighting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted separately.
          Some Coventry electricians offer combined EICR and remedial packages for portfolio
          landlords.
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
          apply to all private rented properties in Coventry:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — landlords must obtain an EICR before a new
                tenant moves in. This has applied to all new tenancies from 1 July 2020 and all
                existing tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years, or sooner if the inspector recommends it. BS 7671 Regulation 134.2 requires
                periodic inspection regimes to confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy must be provided to tenants within 28
                days. New tenants must receive it before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within 28
                days. Written confirmation must be provided to the tenant and to Coventry City
                Council if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Coventry City Council can issue civil penalties of up
                to £30,000 per breach and may revoke HMO licences for persistent non-compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Coventry Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Coventry was heavily bombed during the Second World War and much of the city centre was
          rebuilt in the post-war period. The housing stock reflects this history: much of inner
          Coventry consists of 1950s, 1960s, and 1970s construction, alongside surviving Victorian
          terraces in areas like Earlsdon, Chapelfields, and Spon End:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket circuits not exceeding 20A. This is the most common C2 finding
                across Coventry's large stock of pre-1990s properties, both post-war rebuilds and
                Victorian survivals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ageing 1960s and 1970s wiring</strong> — Coventry's post-war housing is now
                50 to 70 years old. PVC wiring installed during this period is reaching the end of
                its design life. Brittle insulation, overloaded circuits, and outdated consumer
                units are common findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing and bonding</strong> — many post-war Coventry properties
                have undersized protective conductors and absent main protective bonding to gas and
                water services. These are frequent C2 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded student HMOs</strong> — student properties near Coventry
                University and the University of Warwick are often heavily loaded with appliances.
                Extension leads and adapters used in lieu of additional socket outlets create
                overloading conditions that inspectors should assess carefully.
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
              Risk of injury exists. Immediate remedial action required. The inspector may recommend
              disconnecting the circuit. Common in Coventry properties with severely deteriorated
              wiring or exposed live conductors.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. Absent RCD protection
              (Regulation 411.3.3) and ageing wiring insulation are the most common C2 findings in
              Coventry.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 alone does not make the EICR Unsatisfactory. Common in
              Coventry properties where accessories are older but still functional.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. Common in Coventry
              properties where cables run beneath solid concrete floors or behind fixed fitted
              kitchen units.
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
                <strong>Owner-occupied domestic</strong> — every 10 years recommended. Coventry
                properties with 1960s or 1970s wiring should be inspected every 5 years given their
                age.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years minimum under Coventry City Council HMO
                licensing conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented Coventry property, even if the current EICR has not
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
    heading: 'Finding a Qualified EICR Inspector in Coventry',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search NICEIC, NAPIT, or ELECSA
                registers for Coventry-based inspectors accepted by Coventry City Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 or the 2394/2395 combination,
                plus a current 18th Edition (C&G 2382) qualification. Experience with post-war
                housing stock and student HMOs is an advantage in Coventry.
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
    heading: 'For Electricians: EICR Work in Coventry',
    content: (
      <>
        <p>
          Coventry's large private rented sector, two universities, and substantial stock of aging
          post-war housing create consistent demand for EICR work. The high proportion of 1960s and
          1970s wiring that is now approaching the end of its design life means that EICRs
          frequently identify remedial work.
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
                  . Coventry landlords face a 28-day deadline — quoting immediately gives you the
                  best chance of winning the follow-on work.
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

export default function EICRCoventryPage() {
  return (
    <GuideTemplate
      title="EICR Coventry | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Coventry for 2026. Landlord legal requirements, Coventry City Council enforcement, post-war housing stock findings, observation codes, and how to find a qualified inspector. Prices from £85 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Coventry:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Coventry — costs by property type, landlord legal requirements, council enforcement, post-war and mid-century housing stock findings, observation codes, and how to find a qualified inspector."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Coventry"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
