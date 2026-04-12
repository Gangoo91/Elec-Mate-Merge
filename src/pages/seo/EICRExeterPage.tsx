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
  { label: 'EICR Exeter', href: '/guides/eicr-exeter' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'exeter-costs', label: 'EICR Cost in Exeter' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Exeter Housing Stock' },
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
  'Exeter EICR costs are broadly in line with the South West average. Expect to pay between £95 and £180 for a two-bedroom flat and £150 to £270 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it every five years. Exeter City Council enforces these requirements and can fine non-compliant landlords up to £30,000 per breach.',
  "Exeter has a mixed housing stock: a historic city centre with Medieval, Georgian, and Victorian properties, alongside inter-war suburbs and post-war estates. The University of Exeter generates strong student HMO demand in the St David's and Heavitree areas.",
  'Exeter City Council operates mandatory HMO licensing and has an active private sector housing enforcement team. The large student rental market means EICR demand is particularly high in the September to October period at the start of each academic year.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Exeter?',
    answer:
      "Exeter EICR prices are broadly in line with the South West average. A one-bedroom flat typically costs £80 to £160. A two-bedroom flat costs £95 to £180. A three-bedroom house costs £150 to £270. Georgian and Victorian properties in the city centre and St David's area take longer to inspect than post-war properties and may cost more. Student HMOs with multiple consumer units and fire alarm systems cost significantly more. Obtain at least two or three quotes.",
  },
  {
    question: 'Is an EICR a legal requirement for Exeter landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Exeter to obtain an EICR before a new tenancy begins and to renew it at least every five years. The inspector must be registered with an approved competent person scheme such as NICEIC, NAPIT, or ELECSA. Copies must be provided to tenants within 28 days and to Exeter City Council within seven days if requested. Fines of up to £30,000 per breach apply.',
  },
  {
    question: 'What are the most common EICR findings in Exeter properties?',
    answer:
      "Exeter's mixed housing stock produces a range of EICR findings. Absent RCD protection on socket circuits (a C2 finding under Regulation 411.3.3 of BS 7671) is the most common finding across the city's pre-1990s stock. Victorian and Edwardian properties in St David's, Heavitree, and the city centre may have rubber-insulated cables in unmodernised sections. Inadequate earthing and bonding, poor circuit documentation in converted properties, and overloaded circuits in student HMOs are also frequent findings. Inter-war and post-war properties on the Whipton and Pinhoe estates may have ageing PVC wiring approaching the end of its design life.",
  },
  {
    question: 'How long does an EICR take in Exeter?',
    answer:
      "A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Georgian and Victorian properties in Exeter's conservation areas can take longer due to concealed wiring in original construction. Student HMOs with multiple consumer units and fire alarm systems may take a full day. Ensure the inspector has clear access to all rooms, the consumer unit, and the meter before they arrive.",
  },
  {
    question: 'Does Exeter City Council actively enforce EICR requirements?',
    answer:
      'Yes. Exeter City Council has a Housing Standards team that enforces electrical safety requirements in the private rented sector. The council operates mandatory HMO licensing and EICR compliance is a condition of all licences. The council investigates tenant complaints and conducts proactive inspections. Non-compliant landlords risk civil penalties of up to £30,000 per breach and HMO licence refusal or revocation.',
  },
  {
    question: "Are there specific EICR considerations for Exeter's cathedral quarter?",
    answer:
      "Yes. Exeter's cathedral close and surrounding historic city centre contain properties with listed building status. Remedial work in listed properties may require listed building consent from Exeter City Council's heritage team before it can proceed. The EICR obligation itself applies regardless of listing status — landlords must obtain the report — but the process of completing identified remedial work may take longer if consent is required. Using an electrician experienced in working with Exeter's conservation officers is advisable for city centre properties.",
  },
  {
    question: 'What happens when an Exeter rental property receives an Unsatisfactory EICR?',
    answer:
      'The landlord must arrange for remedial work to be completed within 28 days of receiving the EICR, or sooner if the inspector specifies. The work must be carried out by a qualified electrician. Written confirmation that the defects have been remedied must be provided to the tenant and to Exeter City Council if requested. If C1 (immediate danger) observations are present, the affected circuit should be isolated immediately. Failure to comply within the required timeframe can result in a civil penalty of up to £30,000.',
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
    id: 'exeter-costs',
    heading: 'EICR Cost in Exeter (2026 Prices)',
    content: (
      <>
        <p>
          Exeter EICR prices are broadly in line with the South West average. Below are typical 2026
          prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £80 to £160. Common in the city centre
                and student areas near the University of Exeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £95 to £180. Victorian and Edwardian conversions
                in St David's and Heavitree take longer to inspect than modern purpose-built flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £150 to £270. Victorian terraced houses in St
                Thomas, Heavitree, and Pinhoe are common in Exeter's private rented sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house / HMO</strong> — £250 to £480+. Student HMOs in St
                David's and Heavitree have a broader inspection scope including fire alarm and
                emergency lighting systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted separately.
          Historic city centre properties may attract higher rates for the additional time required
          during inspection.
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
          apply to all private rented properties in Exeter:
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
                years or sooner if the inspector recommends it. BS 7671 Regulation 134.2 requires
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
                days. Written confirmation must be provided to the tenant and to Exeter City Council
                if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Exeter City Council can issue civil penalties of up to
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
    heading: 'Exeter Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Exeter has a varied housing stock. The historic city centre retains Medieval, Tudor,
          Georgian, and Victorian buildings. The inner suburbs of St David's, Heavitree, and St
          Thomas contain dense Victorian and Edwardian terraced housing that forms the backbone of
          the student rental market. Outer suburbs include inter-war and post-war housing:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket circuits not exceeding 20A. This is the most common C2 finding
                across Exeter's pre-1990s housing stock, including the large stock of Victorian
                terraced houses used as student lets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated cables in Victorian properties</strong> — properties in St
                David's, Heavitree, and the city centre that have not been fully rewired may retain
                rubber-insulated cables from mid-20th century wiring. These degrade over time and
                are typically C1 or C2 observations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing and bonding</strong> — Victorian terraced houses
                converted into student flats commonly have shared or undersized earthing
                arrangements and absent main protective bonding to gas and water services. These are
                frequent C2 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits in student HMOs</strong> — high occupancy levels and
                heavy appliance use in student lets can overload circuits designed for domestic use.
                Extension leads used in lieu of sufficient socket outlets are a common source of
                concern during inspections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in St David's, Heavitree, and the city centre should allow extra time
          for EICRs in Victorian terraces and should be familiar with the requirements for working
          in Exeter's conservation areas.
        </p>
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
              Risk of injury exists. Immediate remedial action required. In Exeter, this most
              commonly relates to crumbling rubber-insulated cables in unmodernised Victorian
              properties or exposed live conductors.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. Absent RCD protection
              (Regulation 411.3.3) and inadequate earthing are the most common C2 findings in
              Exeter's private rented sector.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 alone does not make the EICR Unsatisfactory. Common in
              Exeter properties where older accessories are still functional but dated.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. Common in Exeter's
              Victorian properties where cables run beneath solid floors or through lath-and-
              plaster walls that cannot be disturbed.
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
                <strong>Owner-occupied domestic</strong> — every 10 years recommended. Exeter's
                Victorian properties are well over 25 years old — the 5-year interval is more
                appropriate for these.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years minimum under Exeter City Council HMO licensing
                conditions. A shorter interval may be required for properties with older wiring or
                high occupancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented Exeter property, even if the current EICR has not
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
    heading: 'Finding a Qualified EICR Inspector in Exeter',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search NICEIC, NAPIT, or ELECSA
                registers for Exeter-based inspectors accepted by Exeter City Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 or the 2394/2395 combination,
                plus a current 18th Edition (C&G 2382) qualification. Experience with Victorian
                terraced properties and student HMOs is an advantage in Exeter.
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
        <p>
          For properties in Exeter's conservation area or listed buildings, look for an inspector
          who has experience working with Exeter City Council's heritage and conservation team and
          understands the constraints of remedial work in historic buildings.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Exeter',
    content: (
      <>
        <p>
          Exeter's University of Exeter student population, strong private rented sector, and mixed
          Victorian and post-war housing stock create consistent demand for EICR work. The start of
          the academic year in September and October brings a surge in EICR requests as landlords
          rush to comply before new tenants move in.
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
                  leave. During the busy academic year start, this efficiency is critical.
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
                  . Exeter landlords face a 28-day deadline and are under pressure to comply before
                  students arrive — quoting immediately gives you the best chance of winning the
                  remedial work.
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

export default function EICRExeterPage() {
  return (
    <GuideTemplate
      title="EICR Exeter | Electrical Installation Condition Report Exeter"
      description="EICR Exeter — costs, legal requirements, and what to expect from an Electrical Installation Condition Report in Exeter. Guide for landlords and electricians covering the 2020 Regulations, student HMOs, Victorian wiring, and 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Exeter:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Exeter — costs by property type, landlord legal requirements, council enforcement, Victorian and student HMO findings, observation codes, and how to find a qualified inspector."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Exeter"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
