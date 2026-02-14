import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  Camera,
  Brain,
  Mic,
  Receipt,
  Send,
  FileCheck2,
  AlertTriangle,
  Home,
  Clock,
  ShieldCheck,
  Search,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EICR for Landlords', href: '/guides/eicr-for-landlords' },
];

const tocItems = [
  { id: 'what-is-eicr-landlords', label: 'What Landlords Need to Know' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'timeframes', label: 'Timeframes and Deadlines' },
  { id: 'scotland-wales', label: 'Scotland and Wales' },
  { id: 'unsatisfactory-result', label: 'Unsatisfactory Result' },
  { id: 'what-to-tell-tenants', label: 'What to Tell Tenants' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians Doing Landlord EICRs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All privately rented properties in England must have a valid EICR under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'The EICR must be renewed at least every 5 years and provided to tenants before they move in or within 28 days of the inspection.',
  'Non-compliance can result in civil penalties of up to £30,000 per breach, enforced by the local authority.',
  'If the EICR is Unsatisfactory (any C1 or C2 codes), landlords must complete remedial work within 28 days and obtain written confirmation.',
  'Elec-Mate lets electricians complete the EICR on site, turn defects into a priced remedial quote, and send the certificate and invoice to the landlord by email or WhatsApp before leaving.',
];

const faqs = [
  {
    question: 'How often does a landlord need an EICR?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must obtain an EICR at least every 5 years. However, the inspector may recommend a shorter interval based on the condition of the installation — for example, 3 years for an older property with ageing wiring. The date of the next inspection is recorded on the EICR itself, and the landlord must arrange the next inspection before that date. For Houses in Multiple Occupation (HMOs), a 5-year interval is also the standard requirement under the Housing Act 2004 and associated HMO licensing conditions. If a landlord sells and buys a new rental property, the existing EICR (if any) transfers with the property, but the landlord should check the date and arrange a new one if it is close to expiry or if they have any concerns about the installation.',
  },
  {
    question: 'What happens if a landlord ignores the EICR requirement?',
    answer:
      'The local authority has enforcement powers under the 2020 Regulations. They can serve a remedial notice requiring the landlord to arrange an inspection and provide the report within 28 days. If the landlord fails to comply, the local authority can arrange the inspection themselves (at the landlord expense) and can issue a civil penalty of up to £30,000 per breach. The penalty is per breach, not per property — so a landlord who fails to obtain an EICR and also fails to carry out remedial work could face two separate penalties. Local authorities can also issue urgent remedial notices for C1 (Danger Present) defects, requiring immediate action. In serious cases, repeated non-compliance can be considered evidence of an unfit property under the Housing Health and Safety Rating System (HHSRS), which can lead to further enforcement action including improvement notices, prohibition orders, or prosecution.',
  },
  {
    question: 'Can a landlord carry out the EICR themselves?',
    answer:
      'The Regulations require the EICR to be carried out by a "qualified and competent person." In practice, this means the inspector must hold a current edition qualification (18th Edition IET Wiring Regulations, C&G 2382), an inspection and testing qualification (C&G 2391 or equivalent), and ideally be registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A landlord who is not a qualified electrician cannot carry out their own EICR. Even a landlord who is a qualified electrician should consider whether self-certifying their own rental property creates a conflict of interest — some scheme providers and insurers prefer independent third-party inspections for rented properties. The key point is competence: the person carrying out the inspection must be able to demonstrate sufficient knowledge, skill, and experience to carry out the work safely and produce an accurate report.',
  },
  {
    question: 'Does the EICR need to be provided to the local authority?',
    answer:
      'The landlord must supply a copy of the most recent EICR to the local authority within 7 days of receiving a written request. The landlord must also provide a copy to new tenants before they occupy the property and to existing tenants within 28 days of the inspection date. If the property is managed by a letting agent, the landlord should ensure the agent has a copy of the EICR and is aware of these obligations. Local authorities are increasingly proactive in requesting EICRs, particularly for HMOs and properties where other issues have been identified. Failure to provide the report on request can result in a separate civil penalty. In practice, many landlords now provide the EICR as standard during the tenancy agreement process, alongside the gas safety certificate and energy performance certificate.',
  },
  {
    question: 'What is the difference between Satisfactory and Unsatisfactory on an EICR?',
    answer:
      'The overall assessment on an EICR is either Satisfactory or Unsatisfactory. Satisfactory means the installation is safe for continued use — there are no C1 (Danger Present) or C2 (Potentially Dangerous) defects. There may be C3 (Improvement Recommended) observations, which are advisory — they indicate areas where the installation does not meet the current edition of BS 7671 but is not dangerous. An Unsatisfactory result means one or more C1 or C2 defects have been found. The landlord must then arrange for the remedial work to be completed within 28 days (or sooner if the inspector specifies a shorter period for C1 defects). After the remedial work is done, a qualified person must confirm in writing that the work has been completed satisfactorily. The landlord must then provide this confirmation to the local authority and the tenant within 28 days. An FI (Further Investigation) code means the inspector could not fully assess part of the installation — further investigation is needed before a final classification can be given.',
  },
  {
    question: 'Does the EICR apply to lodgers or live-in landlords?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to privately rented properties with an assured shorthold tenancy (AST) or similar arrangement. If you are a live-in landlord taking a lodger who shares your living accommodation, the regulations do not apply because the arrangement is a licence rather than a tenancy. However, if you let a self-contained unit within your property (for example, a converted garage flat with its own entrance), the regulations would apply to that unit. For HMOs (Houses in Multiple Occupation), the EICR requirement applies under both the 2020 Regulations and the separate HMO licensing conditions. Social housing is also covered — registered social housing providers must ensure their properties have a valid EICR. The regulations do not apply to long leases (21 years or more), student halls of residence managed by educational institutions, or properties occupied under certain agricultural tenancies.',
  },
  {
    question: 'How much does an EICR cost for a landlord?',
    answer:
      'The cost of an EICR depends on the size of the property, the number of circuits, the age and condition of the wiring, and your location. As a rough guide, expect to pay £120 to £180 for a 1-bedroom flat, £150 to £250 for a 2 to 3-bedroom house, and £250 to £450 for a larger property or HMO with multiple distribution boards. These prices are for the inspection only — remedial work is priced separately. Some electricians include a follow-up visit in their EICR price if minor remedials are needed. Others price the EICR and remedials independently. When choosing an electrician, check they are registered with a competent person scheme (NICEIC, NAPIT, or ELECSA), hold C&G 2391 or equivalent, and can provide the EICR in the correct format. The cheapest quote is not always the best — an incomplete or rushed EICR can cause problems later.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description: 'Average EICR prices by property type and guidance on what to charge.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Step-by-step guide to completing every section of the EICR form correctly.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-commercial-premises',
    title: 'EICR for Commercial Premises',
    description:
      'Health and Safety at Work Act obligations, inspection intervals, and employer duties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eicr-landlords',
    heading: 'What Is an EICR and Why Do Landlords Need One?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is a formal document produced by a
          qualified electrician following a periodic inspection and testing of the fixed electrical
          installation in a property. It records the condition of the wiring, distribution boards,
          protective devices, earthing, bonding, and all fixed electrical equipment — from the meter
          to the sockets, switches, and light fittings.
        </p>
        <p>
          The EICR replaced the older Periodic Inspection Report (PIR) and follows the model forms
          set out in Appendix 6 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition with Amendment 3). It involves both dead testing
          (with the supply isolated) and live testing, covering continuity of protective conductors,
          insulation resistance, polarity, earth fault loop impedance, prospective fault current,
          and RCD operation.
        </p>
        <p>
          For landlords in England, having a valid EICR is not optional. Since 1 April 2021, the{' '}
          <strong>
            Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          </strong>{' '}
          make it a legal requirement for all privately rented properties. The regulation applies to
          all new tenancies from 1 July 2020 and all existing tenancies from 1 April 2021. A
          landlord who fails to comply can be fined up to £30,000 per breach.
        </p>
        <p>
          The purpose is straightforward: electrical faults are a leading cause of accidental house
          fires in the UK, and ageing or poorly maintained wiring in rented properties poses a
          significant risk to tenants. The EICR provides an independent assessment of the
          installation's safety and identifies any defects that need remedial work.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements Under the 2020 Regulations',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          impose four key obligations on landlords:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain an EICR</strong> — ensure the electrical installation is inspected
                and tested by a qualified and competent person at intervals of no more than 5 years
                (or sooner if recommended by the inspector).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carry out remedial work</strong> — if the EICR identifies C1 or C2 defects
                (making it Unsatisfactory), complete the remedial work within 28 days or the shorter
                period specified by the inspector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide the report to tenants</strong> — give a copy of the EICR to new
                tenants before they move in and to existing tenants within 28 days of the
                inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide the report to the local authority</strong> — supply a copy within 7
                days of receiving a written request.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all assured shorthold tenancies (ASTs), assured tenancies, and
          regulated tenancies. They also apply to HMOs (Houses in Multiple Occupation) under both
          the 2020 Regulations and separate HMO licensing conditions. Social housing providers are
          included. Long leases of 21 years or more are excluded.
        </p>
        <p>
          The first EICR must be obtained before a new tenancy begins. For existing tenancies that
          were in place before 1 April 2021, landlords should already have obtained their first
          EICR. If you have not, you are already non-compliant and should arrange one immediately.
        </p>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance: Up to £30,000',
    content: (
      <>
        <p>
          The penalties for failing to comply with the 2020 Regulations are severe. Local
          authorities in England have the power to:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Issue civil penalties of up to £30,000 per breach.</strong> This is per
                breach, not per property. A landlord who fails to obtain an EICR and also fails to
                carry out remedial work could face two separate penalties — potentially £60,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arrange the inspection themselves</strong> and recover the costs from the
                landlord. The local authority can instruct a qualified electrician to carry out the
                EICR and charge the landlord for it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carry out remedial work themselves</strong> if the landlord fails to act on
                an Unsatisfactory report, and recover the costs from the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use repeated non-compliance as evidence</strong> under the Housing Health
                and Safety Rating System (HHSRS), which can lead to improvement notices, prohibition
                orders, or prosecution.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Local authorities set the penalty amount based on the severity of the breach, the
          landlord's compliance history, the landlord's financial means, and whether the
          non-compliance was deliberate. A first offence with prompt remediation may attract a lower
          penalty, but persistent non-compliance or a failure to act on a C1 (Danger Present) defect
          is likely to result in the maximum fine.
        </p>
        <p>
          Beyond the financial penalty, non-compliance can also affect a landlord's ability to serve
          a Section 21 "no-fault" eviction notice. If the landlord has not provided the tenant with
          a valid EICR, the Section 21 notice may be invalid.
        </p>
      </>
    ),
  },
  {
    id: 'timeframes',
    heading: 'Timeframes and Deadlines You Cannot Miss',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5 years maximum between inspections.</strong> The EICR must be renewed at
                least every 5 years. The inspector may recommend a shorter interval (for example, 3
                years for older wiring) — if so, the landlord must follow the shorter
                recommendation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy begins.</strong> The first EICR must be obtained before
                a new tenant moves in. If the property already has a valid EICR that is within its
                5-year validity, a new one is not required for a new tenancy — but the existing
                report must be given to the new tenant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days to complete remedial work.</strong> If the EICR is Unsatisfactory
                (any C1 or C2 defects), the landlord must arrange and complete the remedial work
                within 28 days of the inspection date. For C1 (Danger Present) defects, the
                inspector may specify a shorter deadline — potentially requiring immediate action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days to provide the report to existing tenants.</strong> The EICR must be
                supplied to existing tenants within 28 days of the inspection date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7 days to provide the report to the local authority.</strong> If the local
                authority requests a copy of the EICR in writing, the landlord must supply it within
                7 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days to provide written confirmation of remedial work.</strong> After
                remedial work is completed, the landlord must obtain written confirmation from a
                qualified person that the work has been done satisfactorily, and provide this
                confirmation to the tenant and (if requested) the local authority within 28 days.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Missing any of these deadlines can trigger enforcement action. The 28-day remedial
          deadline is the one most commonly breached — particularly where the remedial work involves
          a consumer unit replacement or a partial rewire that requires scheduling and materials. If
          you know the work will take longer than 28 days, communicate this to the local authority
          proactively.
        </p>
        <SEOAppBridge
          title="Send the EICR to the landlord instantly"
          description="Finished the inspection? Send the completed EICR as a professional PDF by email or WhatsApp directly from Elec-Mate — before you leave the property. The landlord has the report within minutes, not days."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'scotland-wales',
    heading: 'Scotland and Wales: Different Rules',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          apply only to England. Scotland and Wales have their own regulatory frameworks, and the
          requirements differ.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Scotland</h3>
            <p className="text-white text-sm leading-relaxed">
              Scotland was ahead of England on this. The Housing (Scotland) Act 2006 and the
              Repairing Standard require landlords to ensure the electrical installation is in a
              reasonable state of repair and in proper working order. An EICR is the standard method
              of demonstrating compliance. Scottish Government guidance recommends an EICR every 5
              years. HMO licensing in Scotland also requires a valid EICR as a condition of the
              licence. The Scottish Housing Regulator can take enforcement action against
              non-compliant landlords, and tenants can apply to the First-tier Tribunal for Scotland
              (Housing and Property Chamber) if they believe the electrical installation is unsafe.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Wales</h3>
            <p className="text-white text-sm leading-relaxed">
              Wales enacted the Renting Homes (Wales) Act 2016, which came fully into force on 1
              December 2022. Under this Act, landlords must ensure that the electrical installation
              is safe and in good repair. The Welsh Government has issued guidance recommending
              regular EICR inspections, and Rent Smart Wales (the registration and licensing body
              for private landlords in Wales) includes electrical safety as part of its compliance
              requirements. The Act introduces "fitness for human habitation" requirements that
              include electrical safety. While the specific 5-year EICR requirement and £30,000
              penalty structure from the English regulations do not apply identically in Wales, the
              practical expectation is the same: get an EICR, keep it current, and act on any
              defects.
            </p>
          </div>
        </div>
        <p>
          Regardless of which country in the UK the property is located in, the practical advice is
          the same: arrange a periodic EICR from a qualified electrician registered with a competent
          person scheme, act on any defects promptly, and keep records. The standard that governs
          the inspection itself — BS 7671 — is the same across the entire UK.
        </p>
      </>
    ),
  },
  {
    id: 'unsatisfactory-result',
    heading: 'What Happens When an EICR Is Unsatisfactory',
    content: (
      <>
        <p>
          An EICR is classified as Unsatisfactory if the inspector records any{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            C1 (Danger Present) or C2 (Potentially Dangerous) observation codes
          </SEOInternalLink>
          . This means the electrical installation has defects that pose a risk of injury and
          require remedial action.
        </p>
        <p>When a landlord receives an Unsatisfactory EICR, the following must happen:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Review the observations.</strong> Each C1 and C2 observation will describe the
              defect, its location, and the urgency of the required action. C1 defects require
              immediate action — the inspector should have made the installation safe before leaving
              (for example, by isolating a dangerous circuit).
            </li>
            <li>
              <strong>Arrange remedial work within 28 days.</strong> The landlord must instruct a
              qualified electrician to carry out the necessary remedial work. This could range from
              replacing a faulty socket or fitting an RCD to a full consumer unit upgrade or partial
              rewire. The 28-day deadline runs from the date of the inspection, not the date the
              landlord receives the report.
            </li>
            <li>
              <strong>Obtain written confirmation.</strong> After the remedial work is completed, a
              qualified person must confirm in writing that the work has been done to a satisfactory
              standard. This could be the same electrician who carried out the remedial work or a
              different qualified person. An Electrical Installation Certificate (EIC) or Minor
              Works Certificate should be issued for the remedial work itself.
            </li>
            <li>
              <strong>Provide confirmation to the tenant and local authority.</strong> The landlord
              must supply the written confirmation to the tenant and (if requested) the local
              authority within 28 days of the remedial work being completed.
            </li>
          </ol>
        </div>
        <p>
          C3 (Improvement Recommended) observations do not make the report Unsatisfactory and do not
          require mandatory remedial action. However, they indicate areas where the installation
          does not meet the current edition of BS 7671. A sensible landlord addresses C3 items too,
          as they may become C2 issues over time as the installation ages.
        </p>
        <SEOAppBridge
          title="Turn every defect into a priced remedial quote"
          description="Elec-Mate's remedial works estimator takes every C1, C2, and FI observation from the EICR and prices the fix — materials, labour, and margin. Hand the landlord the report and the quote in the same visit. No second trip."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'what-to-tell-tenants',
    heading: 'What to Tell Tenants About the EICR',
    content: (
      <>
        <p>
          Tenants often have questions about the EICR process. As a landlord (or a letting agent
          acting on behalf of a landlord), it helps to communicate clearly and proactively.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before the inspection:</strong> Notify the tenant in advance (at least 24
                hours notice is good practice) that a qualified electrician will attend to inspect
                the electrical installation. Explain that the electrician will need access to the
                consumer unit (fuse box), all rooms, and any outbuildings with electrical supplies.
                The power will need to be switched off for parts of the inspection (typically 1 to 2
                hours for dead testing). The tenant should make sure the consumer unit is accessible
                and not blocked by furniture or stored items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After a Satisfactory result:</strong> Provide the tenant with a copy of the
                EICR within 28 days. Explain that the installation has been inspected and is in
                satisfactory condition. Note the date of the next recommended inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After an Unsatisfactory result:</strong> Explain that some issues have been
                found and that remedial work will be arranged promptly. Reassure the tenant that any
                immediate dangers (C1 defects) have been made safe by the inspector. Provide a
                timeline for the remedial work and notify the tenant when the work is complete.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Tenants have the right to request a copy of the EICR at any time. Refusing to provide one
          is a breach of the Regulations and can trigger enforcement action by the local authority.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'How to Find a Qualified Electrician for a Landlord EICR',
    content: (
      <>
        <p>
          Not every electrician is qualified to carry out an EICR. The Regulations require a
          "qualified and competent person" — which in practice means:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered with a competent person scheme</strong> — NICEIC, NAPIT, ELECSA,
                or BRE Certification. You can search for registered electricians on each scheme's
                website.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holds C&G 2391 or equivalent</strong> — the inspection and testing
                qualification. This is the specific qualification for periodic inspection work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holds the 18th Edition qualification</strong> — C&G 2382 (IET Wiring
                Regulations). This confirms knowledge of the current edition of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Has public liability insurance</strong> — at least £2 million cover is
                standard for domestic work. Check the certificate is current.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When getting quotes for an EICR, ask what is included. Some electricians quote a fixed
          price for the inspection and a separate day rate for any remedial work. Others offer a
          combined package. Make sure the quote includes the full inspection (not just a visual
          check), the EICR report in the correct format, and a PDF copy that can be provided to
          tenants and the local authority.
        </p>
        <p>
          Beware of extremely cheap EICR quotes. An electrician who quotes £60 for a 3-bedroom house
          is either cutting corners (not testing every circuit) or not spending enough time on site.
          A thorough EICR for a typical house takes 2 to 4 hours — the price should reflect that
          level of work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Making Landlord EICRs More Profitable',
    content: (
      <>
        <p>
          Landlord EICRs are bread-and-butter work for many electricians. The recurring 5-year cycle
          creates a steady pipeline of repeat work, and every Unsatisfactory result generates
          remedial work on top. The key to profitability is efficiency: get in, complete the
          inspection thoroughly, produce the report, generate the remedial quote, and send
          everything to the landlord — all before you leave the property.
        </p>
        <p>
          This is exactly what Elec-Mate is built for. Here is how the app transforms the landlord
          EICR workflow:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Point your phone camera at the consumer unit. Elec-Mate reads the MCB/RCBO
                  ratings, circuit details, and board layout from the photo. Half the EICR data is
                  filled in before you pick up the test leads.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Mic className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Probes in hand? Speak your results: "Ring circuit 1, R1+R2 0.32, Zs 0.89,
                  insulation resistance 200 megohms." Elec-Mate fills in the schedule of test
                  results while you work. No putting the probes down to type.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Defect Code AI</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe a defect in plain English — "no RCD protection on socket circuit in
                  bathroom" — and the AI returns the correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation code
                  </SEOInternalLink>{' '}
                  with the matching BS 7671 regulation number. No more second-guessing between C2
                  and C3.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Remedial Estimator: Defects to a Priced Quote
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds into the remedial works estimator. It
                  prices each fix — materials, labour, margin — and generates a professional quote.
                  Hand the landlord the EICR and a quote for the remedial work in the same visit. No
                  second trip, no desk time, no chasing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Send EICR + Quote + Invoice from Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  The finished EICR exports as a professional PDF. Send it to the landlord by email
                  or WhatsApp with a single tap. Attach the remedial quote. Send an invoice for the
                  inspection. The landlord has everything before you leave the driveway.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The result: you complete the entire landlord EICR workflow — inspection, report, defect
          classification, remedial quote, certificate delivery, and invoicing — in a single site
          visit. No going home to type up the report. No separate email for the quote. No chasing
          for payment. That is how Elec-Mate makes landlord EICRs more profitable.
        </p>
        <SEOAppBridge
          title="Start doing landlord EICRs the fast way"
          description="Join 430+ UK electricians completing EICR certificates on their phones. Board scanner, voice entry, AI defect coding, remedial quoting, and instant delivery. 7-day free trial."
          icon={Camera}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRForLandlordsPage() {
  return (
    <GuideTemplate
      title="EICR for Landlords 2026 | Legal Requirements UK"
      description="Complete guide to EICR requirements for UK landlords. Legal obligations under Electrical Safety Standards 2020, penalties up to £30,000, 5-year inspection cycle, remedial work deadlines, and tenant notification rules."
      datePublished="2025-01-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          EICR for Landlords:{' '}
          <span className="text-yellow-400">The Legal Requirements You Cannot Ignore</span>
        </>
      }
      heroSubtitle="Every privately rented property in England must have a valid EICR. Penalties are up to £30,000. The inspection must be renewed every 5 years. Remedial work must be completed within 28 days. This guide explains everything landlords and electricians need to know."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR for Landlords"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional EICR certificates with AI board scanning, voice test entry, and instant delivery to landlords. 7-day free trial, cancel anytime."
    />
  );
}
