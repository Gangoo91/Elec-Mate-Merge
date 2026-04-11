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
  { label: 'EICR Plymouth', href: '/guides/eicr-plymouth' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'plymouth-costs', label: 'EICR Cost in Plymouth' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Plymouth Housing Stock' },
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
  'Plymouth EICR costs are among the most affordable in England, reflecting lower South West labour rates outside of Bristol and Bath. Expect to pay between £90 and £170 for a two-bedroom flat and £140 to £260 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it every five years. Plymouth City Council enforces the requirements and can fine non-compliant landlords up to £30,000 per breach.',
  'Like Southampton and Coventry, Plymouth was heavily bombed during the Second World War and much of the city was rebuilt in the post-war period. The post-war and 1960s housing stock frequently returns C2 EICR findings for ageing wiring and absent RCD protection.',
  'The University of Plymouth generates significant student HMO demand in the Mutley, Greenbank, and Lipson areas. Plymouth City Council operates mandatory HMO licensing and has an active private sector housing enforcement team.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Plymouth?',
    answer:
      "Plymouth EICR prices are among the most affordable in England. A one-bedroom flat typically costs £75 to £150. A two-bedroom flat costs £90 to £170. A three-bedroom house costs £140 to £260. Larger properties or HMOs with multiple consumer units cost more. Plymouth's post-war housing stock is generally more straightforward to inspect than the Victorian and Georgian properties found in Bath or London, which contributes to lower average prices. Obtain at least two or three quotes.",
  },
  {
    question: 'Is an EICR a legal requirement for Plymouth landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Plymouth to obtain an EICR before a new tenancy begins and to renew it at least every five years. The inspector must be registered with an approved competent person scheme such as NICEIC, NAPIT, or ELECSA. Copies must be provided to tenants within 28 days and to Plymouth City Council within seven days if requested. Fines of up to £30,000 per breach apply.',
  },
  {
    question: 'What are the most common EICR findings in Plymouth properties?',
    answer:
      "Plymouth's post-war rebuilt housing stock produces characteristic EICR findings. Absent RCD protection on socket circuits (a C2 finding under Regulation 411.3.3 of BS 7671) is the most common finding in pre-1990s properties. Ageing PVC wiring from the 1950s to 1970s with degraded insulation, inadequate earthing and bonding, and overloaded circuits in student HMOs are all common. Properties in Devonport and the waterfront areas that predate the wartime bombing and survived may have older wiring types requiring replacement. Damp ingress in coastal properties can cause insulation resistance failure.",
  },
  {
    question: 'How long does an EICR take in Plymouth?',
    answer:
      "A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Student HMOs in Mutley, Greenbank, and Lipson with multiple consumer units and fire alarm systems may take a full day. Plymouth's post-war properties generally have more straightforward wiring layouts than Victorian and Georgian stock elsewhere, but 1950s and 1960s properties may still have poor circuit documentation. Ensure the inspector has clear access to all rooms, the consumer unit, and the meter.",
  },
  {
    question: 'Does Plymouth City Council actively enforce EICR requirements?',
    answer:
      'Yes. Plymouth City Council has a Housing Standards team that enforces electrical safety requirements. The council operates mandatory HMO licensing for qualifying properties and EICR compliance is a condition of all licences. The council investigates tenant complaints about electrical safety and conducts proactive inspections. Non-compliant landlords risk civil penalties of up to £30,000 per breach and HMO licence refusal or revocation.',
  },
  {
    question: 'Are there any Plymouth-specific considerations for EICR inspections?',
    answer:
      "Plymouth's coastal location means that damp ingress is a more significant concern than in inland cities. Coastal properties, particularly those near the Hoe, Stonehouse, and Barbican areas, may experience moisture penetration into electrical installations that causes insulation resistance test failures. The inspector may identify this as an FI observation or, in severe cases, a C2. Properties with electric heating systems — more common in the South West than other regions — have additional circuits that must be included in the inspection sample.",
  },
  {
    question: 'What happens after an Unsatisfactory EICR in Plymouth?',
    answer:
      'The landlord must arrange for remedial work to be completed within 28 days of receiving the report, or sooner if the inspector specifies. The work must be carried out by a qualified electrician. Written confirmation that the defects have been remedied must be provided to the tenant and to Plymouth City Council if requested. If C1 observations are present, the affected circuit should be isolated immediately until repaired. Failure to complete remedial work within the timeframe can result in a civil penalty of up to £30,000.',
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
    id: 'plymouth-costs',
    heading: 'EICR Cost in Plymouth (2026 Prices)',
    content: (
      <>
        <p>
          Plymouth EICR prices are among the most affordable in England. Below are typical 2026
          prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £75 to £150. Common in the city centre
                and student areas near the University of Plymouth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £90 to £170. Post-war purpose-built flats are
                common across Plymouth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £140 to £260. Post-war semi-detached and
                terraced properties are the most common house type in Plymouth's private rented
                sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house / HMO</strong> — £240 to £450+. Student HMOs in Mutley
                and Greenbank have a broader inspection scope including fire alarm and emergency
                lighting systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted separately.
          Some Plymouth electricians offer combined EICR and remedial packages for portfolio
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
          apply to all private rented properties in Plymouth:
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
                years or sooner if the inspector recommends it.
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
                days. Written confirmation must be provided to the tenant and to Plymouth City
                Council if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Plymouth City Council can issue civil penalties of up
                to £30,000 per breach and may revoke HMO licences.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Plymouth Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Plymouth was extensively bombed during the Second World War and the city centre was
          largely rebuilt in the post-war period to a planned design by Patrick Abercrombie. The
          housing stock outside the city centre retains more Victorian character, particularly in
          Mutley, Greenbank, St Judes, and Stonehouse:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket circuits not exceeding 20A. This is the most common C2 finding
                across Plymouth's pre-1990s housing stock, both post-war rebuilds and Victorian
                survivals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ageing post-war wiring</strong> — Plymouth's 1950s and 1960s rebuilt
                properties have wiring that is now 60 to 70 years old. Degraded insulation, brittle
                PVC sheathing, and overloaded circuits are common findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coastal damp ingress</strong> — Plymouth's maritime location means that
                coastal properties near the Hoe, Stonehouse Creek, and Sutton Harbour can experience
                damp ingress affecting electrical installations. This may cause insulation
                resistance failures recorded as FI or C2 observations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing and bonding</strong> — post-war properties in Plymouth
                commonly have undersized main protective bonding conductors and absent bonding to
                gas and water services. These are frequent C2 findings.
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
              Risk of injury exists. Immediate remedial action required. In Plymouth, this most
              commonly relates to severely deteriorated wiring in unmodernised post-war properties
              or exposed live conductors.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. Absent RCD protection
              (Regulation 411.3.3) and ageing wiring insulation are the most common C2 findings in
              Plymouth.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 alone does not make the EICR Unsatisfactory. Common in
              Plymouth properties where accessories are older but still functional.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. Common in Plymouth
              where coastal damp may have affected concealed cables that cannot be accessed during
              the inspection.
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
                <strong>Owner-occupied domestic</strong> — every 10 years recommended. Plymouth's
                post-war housing stock is now over 60 years old — the 5-year interval is appropriate
                for these properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years minimum under Plymouth City Council HMO
                licensing conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented Plymouth property, even if the current EICR has not
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
    heading: 'Finding a Qualified EICR Inspector in Plymouth',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search NICEIC, NAPIT, or ELECSA
                registers for Plymouth-based inspectors accepted by Plymouth City Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 or the 2394/2395 combination,
                plus a current 18th Edition (C&G 2382) qualification. Experience with post-war
                housing and coastal properties is an advantage in Plymouth.
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
    heading: 'For Electricians: EICR Work in Plymouth',
    content: (
      <>
        <p>
          Plymouth's large private rented sector, University of Plymouth student population, and
          substantial stock of aging post-war housing create consistent demand for EICR work. The
          city's relatively low EICR prices mean that efficiency matters — completing reports on
          site rather than back in the office makes a significant difference to profitability.
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
                  leave — no evening admin.
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Plymouth landlords face a 28-day deadline — quoting immediately is the most
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

export default function EICRPlymouthPage() {
  return (
    <GuideTemplate
      title="EICR Plymouth | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Plymouth for 2026. Landlord legal requirements, Plymouth City Council enforcement, post-war housing stock findings, coastal property considerations, observation codes, and how to find a qualified inspector. Prices from £75 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Plymouth:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Plymouth — costs by property type, landlord legal requirements, council enforcement, post-war housing stock findings, coastal property considerations, and how to find a qualified inspector."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Plymouth"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
