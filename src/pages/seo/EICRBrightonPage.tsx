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
  Search,
  Clock,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Brighton', href: '/guides/eicr-brighton' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'brighton-costs', label: 'EICR Cost in Brighton' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Brighton Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Section 631). It produces a condition assessment using C1, C2, C3 and FI observation codes.",
  'Brighton EICR costs are above the national average due to high local demand and elevated property values. Expect to pay between £130 and £240 for a two-bedroom flat and £200 to £360 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it every five years. Brighton & Hove City Council enforces the regulations and can fine non-compliant landlords up to £30,000 per breach.',
  'Brighton has a high proportion of Regency, Victorian, and Edwardian properties — many converted into flats. These conversions frequently have mixed-era wiring and absent RCD protection, leading to C2 observations on most EICRs.',
  'Brighton & Hove has one of the most active private rented sectors outside London, with strong HMO demand driven by the University of Brighton and University of Sussex. Council enforcement of EICR compliance is consistent.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Brighton?',
    answer:
      'EICR prices in Brighton are above the national average, reflecting the high cost of living and strong demand for qualified electricians in the area. A one-bedroom flat typically costs £110 to £200. A two-bedroom flat costs £130 to £240. A three-bedroom house costs £200 to £360. Converted Regency and Victorian properties with complex layouts cost more. Prices also vary depending on whether the inspector is based in Brighton or travelling from elsewhere in East or West Sussex.',
  },
  {
    question: 'Is an EICR a legal requirement for Brighton landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Brighton & Hove to obtain an EICR before a new tenancy and to renew it at least every five years. The EICR must be carried out by a qualified person registered with NICEIC, NAPIT, ELECSA, or another approved competent person scheme. Copies must be provided to tenants within 28 days and to Brighton & Hove City Council within seven days if requested. Fines of up to £30,000 per breach apply.',
  },
  {
    question: 'What are the most common EICR findings in Brighton properties?',
    answer:
      "Brighton's housing stock is dominated by Regency and Victorian properties converted into flats. Common EICR findings include absent or inadequate RCD protection on socket circuits (C2 under BS 7671 Section 411), deteriorated rubber-insulated wiring in original parts of conversions, inadequate earthing and bonding in older flats, mixed-era wiring from different renovation phases, and overloaded circuits in converted properties where the original wiring was not designed for modern appliance loads. Damp ingress in basement flats can also cause insulation deterioration.",
  },
  {
    question: 'How long does an EICR take in Brighton?',
    answer:
      "Duration depends on the size of the property and its wiring complexity. A studio or one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Victorian and Regency conversions frequently take longer because the wiring from different eras must be carefully traced, circuit identification is often poor, and access to concealed wiring may be restricted by listed building status or tenants' belongings. The inspector needs access to every room, the consumer unit, and the meter position.",
  },
  {
    question: 'Do Brighton landlords need an EICR for listed buildings?',
    answer:
      'Yes — the obligation to obtain an EICR applies regardless of listing status. However, listed building consent may be needed before remedial work can be carried out in Grade I or Grade II* listed properties. In practice, most Brighton properties are Grade II listed, which does not automatically prevent electrical remedial work, but some methods (such as surface-mounted conduit or chasing into plasterwork) may require consent. Landlords with listed buildings should use an electrician experienced in working with the local conservation team.',
  },
  {
    question: 'Does Brighton & Hove City Council actively enforce EICR requirements?',
    answer:
      'Yes. Brighton & Hove City Council has a dedicated Private Sector Housing team that investigates complaints about rented property conditions, conducts proactive inspections, and issues civil penalties for non-compliance with electrical safety standards. The council operates selective licensing schemes in parts of Brighton and mandatory HMO licensing city-wide. EICR compliance is a condition of all HMO licences. The council publishes enforcement data and has issued significant fines to non-compliant landlords.',
  },
  {
    question: 'What happens after an EICR in Brighton returns C1 or C2 observations?',
    answer:
      'The landlord must arrange for remedial work to be completed within 28 days of receiving the EICR, or sooner if the inspector specifies. The work must be carried out by a qualified electrician. Once complete, the electrician provides a Minor Electrical Installation Works Certificate or an Electrical Installation Certificate (for larger works), and the original inspector or another qualified person confirms the defects have been remedied. A copy of this confirmation must be provided to the tenant and to Brighton & Hove City Council if requested.',
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
          (Section 631), which specifies that an Electrical Installation Condition Report must be
          used for periodic inspection of existing installations. It is not a simple pass or fail —
          it is a detailed condition assessment with standardised observation codes.
        </p>
        <p>
          The inspector conducts a visual inspection and a programme of electrical tests. All
          results are recorded on Schedules of Circuit Details and Test Results. Each observation is
          classified as C1, C2, C3, or FI depending on its severity. The overall assessment is
          either Satisfactory or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'brighton-costs',
    heading: 'EICR Cost in Brighton (2026 Prices)',
    content: (
      <>
        <p>
          Brighton EICR prices are above the national average, reflecting high local demand,
          elevated labour rates, and the prevalence of older and more complex properties. Below are
          typical 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £110 to £200. Very common in Brighton
                due to the high proportion of converted Victorian terraces in the city centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £130 to £240. Regency and Victorian conversions
                take longer to inspect than purpose-built modern flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £200 to £360. Larger Victorian and Edwardian
                terraced houses in Hanover, Preston Park, and similar areas often take four or more
                hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £320 to £520+. Larger properties or those
                with multiple consumer units, outbuildings, or three-phase supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £380 to £700+. Brighton's large student HMO market means high
                demand. HMOs have broader inspection scope including fire alarm and emergency
                lighting systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Remedial work is quoted and charged
          separately. Converted Regency properties in the seafront areas may attract premium rates
          due to complexity.
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
          apply to all private rented properties in Brighton & Hove. The key requirements are:
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
                years, or sooner if the inspector specifies. BS 7671 Regulation 134.2 requires
                periodic inspection regimes to confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to the
                tenant within 28 days. New tenants must receive it before they move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within 28
                days. Written confirmation must be provided to the tenant and to Brighton & Hove
                City Council if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Brighton & Hove City Council can issue civil penalties
                of up to £30,000 per breach. The council's Private Sector Housing team actively
                investigates complaints and conducts proactive enforcement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Brighton Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Brighton & Hove has one of the highest concentrations of Regency and Victorian period
          properties in England. The city centre and seafront areas contain large numbers of
          properties built between 1800 and 1910, many converted into flats. This shapes the typical
          EICR findings:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — BS 7671 requires 30 mA RCD protection for
                socket circuits and concealed cables. Older consumer units in converted Brighton
                flats commonly lack this protection, resulting in a C2 observation on most EICRs in
                pre-1980 properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixed-era wiring in conversions</strong> — Regency and Victorian houses
                converted at different times have wiring from multiple eras. Original rubber-
                insulated cables alongside later PVC additions are common. Identifying circuits and
                establishing safe inspection sample sizes is more complex than in purpose-built
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp-related insulation failure</strong> — Brighton's coastal location and
                the prevalence of basement and ground-floor flats means damp ingress is common.
                Moisture penetration into electrical installations causes insulation resistance
                failure, which may present as an FI or C2 observation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing in converted flats</strong> — conversions of large
                Victorian houses into flats often result in inadequate earthing arrangements. Shared
                earthing systems between flats, undersized protective conductors, and absent main
                protective bonding are frequent C2 findings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in Brighton's Kemptown, Hanover, Seven Dials, and seafront areas
          should allow extra time for EICRs and expect a higher than average remedial work
          conversion rate.
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
              Risk of injury exists. Immediate remedial action required. The inspector may recommend
              disconnecting the dangerous circuit. Examples include exposed live conductors and
              missing consumer unit covers.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. The most common C2 finding in
              Brighton is absent RCD protection on socket circuits (BS 7671 Section 411), followed
              by inadequate earthing and deteriorated insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous but improvement would enhance safety. C3 alone does not make
              the report Unsatisfactory. Common examples in Brighton include older but functional
              accessories in Regency conversions.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. Common in Brighton
              conversions where cables run through original structural elements that cannot be
              disturbed.
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
          Power will be isolated during dead testing — typically 30 to 60 minutes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — consumer unit, protective devices, cable
                condition, socket outlets, light fittings, switches, and earthing and bonding
                connections.
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
                <strong>HMO</strong> — every 5 years minimum. Brighton & Hove City Council may
                specify a shorter interval as a condition of the HMO licence for properties with
                older wiring or higher occupancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented property, even if the previous EICR has not expired.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Brighton',
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
                registers for Brighton-based inspectors. Brighton & Hove City Council accepts
                reports from registered competent persons as evidence of compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 (Inspection and Testing) or the
                2394/2395 combination, plus a current 18th Edition (C&G 2382) qualification.
                Experience with Victorian and Regency conversions is a significant advantage in
                Brighton.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — the inspector should carry professional indemnity
                insurance. Electricians registered with competent person schemes are required to
                maintain adequate cover.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Brighton's high property values mean that EICR-related disputes can be significant. Using
          a scheme-registered inspector with professional indemnity insurance provides protection
          for both landlords and tenants.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Brighton',
    content: (
      <>
        <p>
          Brighton's dense private rented sector, large student population, and high proportion of
          older properties create strong and consistent demand for EICR work. The high remedial work
          conversion rate in period conversions means Brighton EICRs are commercially attractive for
          thorough inspectors.
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
                  to complete reports on your phone while still on site. AI board scanning reads the
                  consumer unit, voice entry records test results, and instant PDF export delivers
                  the report to landlords before you leave.
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
                  . Brighton landlords must act within 28 days — the electrician who quotes on the
                  day of the EICR is most likely to win the follow-on work.
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

export default function EICRBrightonPage() {
  return (
    <GuideTemplate
      title="EICR Brighton | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Brighton for 2026. Landlord legal requirements, Brighton & Hove City Council enforcement, Regency and Victorian housing findings, observation codes, and how to find a qualified inspector. Prices from £110 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Brighton:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Brighton — costs by property type, landlord legal requirements, council enforcement, Regency and Victorian housing findings, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Brighton"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
