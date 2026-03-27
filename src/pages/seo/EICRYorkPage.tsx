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
  { label: 'EICR York', href: '/guides/eicr-york' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'york-costs', label: 'EICR Cost in York' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'York Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR (Electrical Installation Condition Report) is a formal inspection of a property\'s fixed electrical installation, carried out in accordance with BS 7671:2018+A3:2024 (Section 631). It produces a detailed condition assessment using C1, C2, C3 and FI observation codes.',
  'York EICR costs are broadly in line with the Yorkshire average. Expect to pay between £110 and £210 for a two-bedroom flat and £170 to £300 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it every five years. City of York Council enforces these requirements and can fine non-compliant landlords up to £30,000 per breach.',
  'York has a uniquely high proportion of historic properties, including Medieval, Georgian, and Victorian buildings. Many are listed and require special consideration for both the EICR and any subsequent remedial work.',
  'The University of York and York St John University generate strong HMO demand. York has a large and active student lettings market, and City of York Council operates HMO licensing with EICR compliance as a core condition.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in York?',
    answer:
      'EICR prices in York are broadly in line with the Yorkshire regional average. A one-bedroom flat typically costs £90 to £180. A two-bedroom flat costs £110 to £210. A three-bedroom house costs £170 to £300. Historic York city centre properties, particularly those with listed building status or original period features, may cost more due to the additional complexity of the inspection. HMOs with multiple consumer units cost significantly more. Obtain at least two or three quotes, but be cautious of very low prices that may indicate a rushed inspection.',
  },
  {
    question: 'Is an EICR a legal requirement for York landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in York to obtain an EICR before a new tenancy begins and to renew it at least every five years. The EICR must be carried out by a qualified person registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A copy must be provided to tenants within 28 days and to City of York Council within seven days if requested. Fines of up to £30,000 per breach can be imposed.',
  },
  {
    question: 'What are the most common EICR findings in York properties?',
    answer:
      'York\'s historic housing stock produces distinctive EICR findings. Absent RCD protection on socket circuits is the most common C2 finding, particularly in pre-1990s properties. Rubber-insulated and lead-sheathed cables in Georgian and Victorian properties are frequently identified as C1 or C2 observations. Inadequate earthing and bonding, poor circuit identification in properties with wiring from multiple eras, and overloaded circuits in converted historic buildings are also common. Medieval and early modern buildings in the city centre can present unusual challenges such as concealed timber-frame wiring routes.',
  },
  {
    question: 'Do listed buildings in York need an EICR?',
    answer:
      'Yes — the legal obligation to obtain an EICR applies regardless of listing status. However, remedial work in listed buildings in York may require listed building consent before work can proceed, particularly where the work affects historic fabric such as original plasterwork, timber panelling, or masonry. City of York Council\'s conservation team should be consulted before planning remedial work in Grade I or Grade II* listed properties. In practice, most work that can be completed without affecting historic fabric (such as replacing consumer units or adding RCD protection) does not require consent.',
  },
  {
    question: 'How long does an EICR take in York?',
    answer:
      'The duration depends on property size and complexity. A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Historic York city centre properties frequently take longer because circuit identification is poor, cables may run through timber-framed walls and original plasterwork, and the inspector may need to record FI (Further Investigation) observations where concealed areas cannot be accessed. Georgian townhouses in the city centre can take four to five hours or more.',
  },
  {
    question: 'Does City of York Council actively enforce EICR requirements?',
    answer:
      'Yes. City of York Council has a Private Sector Housing team that enforces electrical safety standards in the private rented sector. The council operates mandatory HMO licensing for qualifying properties, and EICR compliance is a condition of all HMO licences. The council investigates complaints from tenants about electrical safety and conducts proactive inspections. Non-compliant landlords risk civil penalties of up to £30,000 per breach and may have their HMO licence refused or revoked.',
  },
  {
    question: 'Can the EICR report be issued on the same day as the inspection in York?',
    answer:
      'Yes, where the electrician uses mobile reporting software. An EICR completed using a phone-based app such as Elec-Mate can be exported as a PDF and sent to the landlord before the inspector leaves the property. This is particularly useful for York landlords with student lets who need to demonstrate compliance quickly at the start of the academic year. Electricians using paper-based reporting may take several days to issue the final report.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
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
    description: 'Study for C&G 2391 with structured training modules covering periodic inspection.',
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
          (Section 631), which requires that an Electrical Installation Condition Report is used for
          periodic inspection of existing installations. It is not a simple pass or fail — it is a
          detailed condition assessment using standardised observation codes.
        </p>
        <p>
          The inspector carries out a visual inspection followed by a programme of electrical tests.
          Results are recorded on Schedules of Circuit Details and Test Results. Each observation is
          classified as C1, C2, C3, or FI depending on its severity. The overall assessment is
          either Satisfactory or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'york-costs',
    heading: 'EICR Cost in York (2026 Prices)',
    content: (
      <>
        <p>
          York EICR prices are broadly in line with the Yorkshire average, though historic city
          centre properties may attract higher rates due to their complexity. Below are typical
          2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £90 to £180. Common in the student
                areas around the University of York and York St John University.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £110 to £210. Georgian and Victorian
                conversions in the city centre take longer to inspect than modern purpose-built
                flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £170 to £300. Victorian terraced properties
                in areas like Bishopthorpe Road and Holgate are common in the private rented
                sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £270 to £430+. Larger properties or those
                with multiple consumer units, outbuildings, or complex historic wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £320 to £600+. York's student HMO market is large. HMOs
                have a broader inspection scope including fire alarm and emergency lighting systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted and charged
          separately. Listed building properties may incur additional charges for the additional
          care and time required during inspection.
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
          apply to all private rented properties in York. The key requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — landlords must obtain an EICR before a
                new tenant moves in. This applies to all new tenancies from 1 July 2020 and all
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
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to
                the tenant within 28 days. New tenants must receive it before they move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within
                28 days. Written confirmation must be provided to the tenant and to City of York
                Council if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — City of York Council can issue civil penalties of
                up to £30,000 per breach and may revoke HMO licences for persistent non-compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'York Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          York is unique among UK cities for the density and quality of its historic built
          environment. The city contains a higher proportion of listed buildings per capita than
          almost any other local authority in England. This creates distinctive challenges for
          EICR inspectors:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated cables in period properties</strong> — Georgian and
                Victorian properties in York's city centre frequently retain original or early
                wiring. Rubber-insulated cables with braided sheathing degrade over time and
                are typically classified as C1 or C2 depending on their condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — BS 7671 requires additional protection
                by RCD on socket circuits. Properties with pre-1990s
                consumer units very commonly lack this protection, which is the most frequent
                C2 finding across York's private rented sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex wiring routes in historic buildings</strong> — cables in York's
                Medieval, Tudor, and Georgian buildings may run through original timber-frame
                structures, beneath ancient stone floors, or within walls that cannot be disturbed.
                FI observations are common where these cables cannot be inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing in conversions</strong> — many of York's historic
                townhouses have been converted into flats. These conversions often result in
                inadequate earthing arrangements, with shared earthing systems, undersized
                protective conductors, and absent main protective bonding.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in the city centre, Micklegate, Gillygate, The Mount, and Bootham
          areas should allow extra time for EICRs and be familiar with the constraints of working
          in listed and conservation area properties.
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
              Risk of injury exists. Immediate remedial action required. The inspector may
              recommend disconnecting the dangerous circuit. In York properties this most
              commonly relates to crumbling rubber-insulated cables or exposed live conductors.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. Absent RCD protection
              is the most common C2 finding in York, followed by inadequate
              earthing and deteriorated cable insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 alone does not make the report Unsatisfactory.
              Common in York properties where older accessories remain functional but would
              benefit from replacement.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              Particularly common in York's historic properties where cables run through inaccessible
              voids, beneath stone floors, or within timber-frame structures that cannot be disturbed
              without specialist consent.
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
        <p>
          The EICR process involves a visual inspection followed by a programme of testing. The
          inspector needs access to all rooms, the consumer unit, the meter, and any outbuildings.
          Power will be isolated during dead testing.
        </p>
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
                <strong>Live testing</strong> — earth fault loop impedance (Ze and Zs), prospective
                fault current, RCD operation times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR including
                Schedules of Circuit Details and Test Results as required by Section 631 of BS 7671,
                with observation codes and an overall Satisfactory or Unsatisfactory assessment.
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
                <strong>Private rented property</strong> — at least every 5 years (legal
                requirement under the 2020 Regulations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied domestic</strong> — every 10 years recommended. York
                properties over 25 years old (the vast majority of the city centre stock) should
                be inspected every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years minimum under City of York Council HMO
                licensing conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented property, even if the current EICR has not expired.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in York',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person
          registered with an approved competent person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                registers for York-based inspectors. City of York Council accepts reports from
                scheme-registered competent persons as evidence of compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 (Inspection and Testing) or
                the 2394/2395 combination, plus a current 18th Edition (C&G 2382) qualification.
                Experience with historic York properties is a significant advantage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with listed buildings</strong> — for city centre properties,
                choose an inspector who understands the constraints of working in listed and
                conservation area buildings and can advise on remedial options that respect
                historic fabric.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in York',
    content: (
      <>
        <p>
          York's historic city centre, large student population, and strong private rented sector
          create consistent demand for EICR work. The high proportion of period properties with
          older wiring means that EICRs frequently identify remedial work, creating follow-on
          revenue for thorough inspectors.
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
                  to complete reports on your phone while still on site. AI board scanning reads
                  the consumer unit, voice entry records test results, and instant PDF export
                  delivers the report to landlords before you leave.
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
                  When the EICR identifies C1 or C2 observations, quote the remedial work on
                  the day using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . York landlords must act within 28 days — quoting on the day wins the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRYorkPage() {
  return (
    <GuideTemplate
      title="EICR York | Electrical Safety Certificate Cost 2026"
      description="EICR costs in York for 2026. Landlord legal requirements, City of York Council enforcement, historic housing stock challenges, listed building considerations, observation codes, and how to find a qualified inspector. Prices from £90 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR York:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in York — costs by property type, landlord legal requirements, council enforcement, historic housing stock challenges, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in York"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
