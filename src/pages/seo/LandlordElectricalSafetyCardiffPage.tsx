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
  Search,
  Clock,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Landlord Electrical Safety Cardiff', href: '/landlord-electrical-safety-cardiff' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'Welsh Landlord Electrical Law' },
  { id: 'wales-context', label: 'Cardiff Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Cardiff' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cardiff landlords are subject to the Renting Homes (Wales) Act 2022 — a separate and more comprehensive Welsh law than the England-only 2020 Regulations. All rental properties in Wales must have an up-to-date EICR, and Welsh Government has taken a more aggressive stance on rental property standards than England.',
  'Cardiff Council enforces landlord electrical safety through Shared Regulatory Services. Enforcement is active in Cathays — known as "Studentville" — Roath, Canton, and Pontcanna, where Victorian and Edwardian terraces house a large student HMO population.',
  'Cardiff University and Cardiff Metropolitan University generate significant demand for student HMOs, concentrated in Cathays and Roath. HMOs in these areas face mandatory licensing and EICR compliance obligations enforced by Cardiff Council.',
  'If an EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), Cardiff landlords must complete remedial work promptly. Cardiff Council can take enforcement action under the Housing Health and Safety Rating System (HHSRS) and the Renting Homes (Wales) Act 2022.',
  "Common defects in Cardiff's older stock include rubber-insulated cabling in pre-1970s Roath and Canton terraces, absent RCDs on socket circuits (Regulation 411.3.3), and TT earthing systems in some older Cardiff properties — all of which generate C2 findings and require remedial work.",
];

const faqs = [
  {
    question: 'What landlord electrical safety law applies in Cardiff?',
    answer:
      'Cardiff is in Wales, which has its own devolved legislation — the Renting Homes (Wales) Act 2022. This is a separate and more comprehensive law than the England-only Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Under the Renting Homes (Wales) Act 2022, all rental properties in Wales must have an up-to-date EICR. The Welsh Government has adopted a more rigorous approach to rental property standards than England, and Cardiff Council enforces compliance through Shared Regulatory Services using both the Act and the Housing Health and Safety Rating System (HHSRS). The EICR must be carried out to BS 7671 — the technical standard is identical in Wales and England.',
  },
  {
    question: 'Does Cardiff Council actively enforce landlord electrical safety?',
    answer:
      "Yes. Cardiff Council enforces housing standards through Shared Regulatory Services, investigating tenant complaints and carrying out proactive HMO inspections, particularly in Cathays, Roath, and Canton. The council can use the HHSRS to classify electrical hazards and issue improvement notices or prohibition orders. Electrical defects such as absent RCD protection are rated as Category 1 hazards in many older properties. The Welsh Government's more aggressive regulatory stance on rental standards compared with England gives Cardiff Council a strong enforcement mandate.",
  },
  {
    question:
      'What is the Renting Homes (Wales) Act 2022 and how does it affect Cardiff landlords?',
    answer:
      'The Renting Homes (Wales) Act 2022 replaced much of previous Welsh housing law and is more extensive than its English equivalent. It requires all landlords in Wales to ensure properties are fit for human habitation throughout the tenancy — and the fitness for human habitation duties under Welsh law are more extensive than the English equivalent. An up-to-date EICR is required, and landlords must provide tenants with a copy. The Welsh Government has been more aggressive on rental property standards than the UK Government has been in England, meaning Cardiff landlords face a stricter compliance environment.',
  },
  {
    question: 'Do I need an EICR for my Cardiff HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of mandatory HMO licensing in Cardiff (properties with five or more occupants in two or more households). Cardiff Council operates additional licensing schemes covering smaller HMOs in designated areas including parts of Cathays and Roath — the core "Studentville" zone. Student HMOs near Cardiff University and Cardiff Metropolitan University are subject to active licensing enforcement. Many Cardiff HMO licences specify EICR inspection intervals of three years rather than the standard five.',
  },
  {
    question: 'How much does a landlord EICR cost in Cardiff?',
    answer:
      'Cardiff EICR costs are generally slightly lower than equivalent English cities, reflecting South Wales labour rates. Expect to pay £140–£400 for most Cardiff landlord EICRs in 2026. A one-bedroom flat typically costs £140–£200, a two-bedroom terraced house £180–£280, a three-bedroom house £230–£400, and a student HMO £320–£600 or more. Pre-1970s properties in Roath and Canton with rubber-insulated wiring may cost more to inspect thoroughly.',
  },
  {
    question: 'Can a Cardiff tenant request an electrical safety check?',
    answer:
      "Yes. Under the Renting Homes (Wales) Act 2022 fitness for human habitation duty, tenants can raise concerns about electrical safety with their landlord. If the landlord does not respond, the tenant can report the matter to Cardiff Council's housing team via Shared Regulatory Services, which can inspect the property and take enforcement action. Tenants can also make applications to the Residential Property Tribunal Wales where landlords fail to meet their obligations.",
  },
  {
    question: 'What qualifications must an EICR inspector have in Cardiff?',
    answer:
      'The standard is the same as in England. The inspector must be a qualified and competent person, meaning registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA, holding City and Guilds 2391 (Inspection and Testing) or equivalent, and a current BS 7671 qualification (C&G 2382). They should also carry professional indemnity insurance. National Grid Electricity Distribution (formerly Western Power Distribution) is the DNO for Cardiff — inspectors should be familiar with both PME and TT earthing arrangements, as TT systems are found in some older Cardiff properties.',
  },
  {
    question: 'Are Victorian terraces in Roath and Canton more likely to fail an EICR?',
    answer:
      'Yes. Pre-1970s terraces in Roath, Canton, and Pontcanna frequently have rubber-insulated or fabric-covered wiring that has deteriorated with age. Common C2 findings include absent RCD protection (Regulation 411.3.3 of BS 7671), deteriorated rubber or fabric insulation, inadequate earthing and bonding, and in some cases TT earthing systems requiring specific assessment. Cardiff landlords acquiring older terraced properties should budget for potential remedial work after the first EICR.',
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
    href: '/guides/eicr-fail-rented-property',
    title: 'EICR Fail — Rented Property',
    description: 'What to do when a rented property receives an unsatisfactory EICR.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations explained — what changed and what it means for landlord compliance.',
    icon: Scale,
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
    id: 'regulations-overview',
    heading: 'Landlord Electrical Safety Law in Cardiff and Wales',
    content: (
      <>
        <p>
          Cardiff landlords operate under a distinct and more comprehensive legal framework than
          landlords in England. The Renting Homes (Wales) Act 2022 — not the England-only Electrical
          Safety Standards in the Private Rented Sector (England) Regulations 2020 — is the primary
          legislation governing rental property standards in Wales. The Welsh Government has
          consistently adopted a more aggressive regulatory stance on rental property standards than
          its English counterpart, and Cardiff landlords must understand what the Welsh framework
          specifically requires.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renting Homes (Wales) Act 2022</strong> — all rental properties in Wales
                must have an up-to-date EICR. The fitness for human habitation duties under Welsh
                law are more extensive than the English equivalent. Landlords must ensure properties
                are fit for habitation throughout the tenancy, and an EICR to{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                is the accepted standard for demonstrating electrical fitness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>More rigorous than England</strong> — the Welsh Government's approach to
                rental property standards is more comprehensive than the England Regulations. Welsh
                landlords face broader fitness for human habitation obligations, and Cardiff Council
                enforces these through Shared Regulatory Services alongside the Housing Health and
                Safety Rating System (HHSRS).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — landlords must provide tenants with a copy of
                the EICR. This is required as a condition of HMO licences issued by Cardiff Council
                and demonstrates compliance with the fitness for human habitation duty under the
                Act.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a qualified and
                competent person. In practice this means registration with NICEIC, NAPIT, ELECSA, or
                an equivalent competent person scheme. National Grid Electricity Distribution
                (formerly Western Power Distribution) is the local DNO for Cardiff.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cardiff landlords should obtain an EICR before each new tenancy and at least every five
          years, provide the report to tenants, and complete any remedial work identified promptly.
          For HMOs, three-yearly intervals are typically specified by licence conditions. This
          satisfies both the Renting Homes (Wales) Act 2022 duties and HMO licensing requirements.
        </p>
      </>
    ),
  },
  {
    id: 'wales-context',
    heading: 'Cardiff Council Enforcement',
    content: (
      <>
        <p>
          Cardiff Council is the local housing authority responsible for enforcing housing standards
          in Cardiff. The council operates through Shared Regulatory Services — a partnership
          covering Cardiff, the Vale of Glamorgan, and Bridgend — which runs a housing enforcement
          team that investigates tenant complaints, carries out proactive HMO inspections, and uses
          HHSRS to assess and act on hazards in private rented properties. The Senedd's more
          interventionist approach to rental standards gives Cardiff Council a strong enforcement
          mandate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"Studentville" — Cathays, Roath, and Canton</strong> — Cathays is informally
                known as Studentville due to its extraordinary density of student HMO properties
                around Cardiff University. Roath and Canton are similarly dense with Victorian and
                Edwardian terraces converted to rental use. Cardiff Council's enforcement activity
                is most concentrated in these areas, and landlords operating unlicensed HMOs face
                prosecution as well as civil penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared Regulatory Services enforcement</strong> — where an EICR identifies
                serious electrical defects (C1 or C2 observations), Cardiff Council acting through
                Shared Regulatory Services can classify these as Category 1 HHSRS hazards and issue
                an improvement notice requiring the work to be completed within a fixed period.
                Failure to comply can result in emergency remedial action and cost recovery from the
                landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Cardiff Council operates mandatory HMO licensing
                for properties with five or more occupants in two or more households. A valid EICR
                is a condition of the licence. The council also operates additional licensing in
                designated areas — including Cathays and Roath — covering smaller HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Residential Property Tribunal Wales</strong> — tenants can make applications
                to the Residential Property Tribunal Wales where landlords fail to meet their
                fitness for human habitation obligations. Electrical safety failures can support
                such applications, and Welsh tenants have broader remedies than their English
                counterparts under the 2022 Act.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cardiff landlords with properties in the Vale of Glamorgan or Rhondda Cynon Taf should
          note that while Shared Regulatory Services covers some cross-boundary enforcement, each
          council area has its own licensing and enforcement functions. Compliance in Cardiff does
          not cover neighbouring authority areas.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in Cardiff',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) in Cardiff face additional electrical safety
          requirements. Cardiff is home to Cardiff University and Cardiff Metropolitan University,
          with Cathays — nicknamed "Studentville" — being one of the UK's most densely
          student-populated neighbourhoods. Roath and Pontcanna also carry substantial student and
          young professional HMO stock in Victorian and Edwardian terraces, many of which have
          pre-1970s electrical installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR is a condition of the
                licence, covering all fixed electrical installations including communal areas, fire
                alarm systems, and emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-year inspection intervals</strong> — many Cardiff HMO licence
                conditions require EICRs every three years rather than the standard five years. This
                is particularly common in the Cathays and Roath additional licensing areas. Check
                your specific licence conditions carefully and diarise renewal dates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-war terraces and rubber wiring</strong> — the Victorian and Edwardian
                terraces dominant in Cathays, Roath, Canton, and Splott frequently contain
                rubber-insulated cabling installed before 1970. Rubber insulation deteriorates with
                age and heat, and its presence is typically recorded as a C2 observation. Landlords
                acquiring older Cardiff terraces should factor in rewiring costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection and TT earthing</strong> — Regulation 411.3.3 of BS 7671
                requires RCD protection on socket-outlet circuits rated up to 32A. Absent RCDs are a
                C2 finding and very common in first EICRs on Cathays and Roath terraces. Some older
                Cardiff properties also have TT earthing systems, which require specific assessment
                and appropriate RCD protection arrangements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Cardiff is a criminal offence. Cardiff Council has actively
          pursued unlicensed HMO operators through Shared Regulatory Services, and prosecution in
          the Magistrates' Court can result in an unlimited fine in addition to any civil penalties
          under housing enforcement powers.
        </p>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance',
    content: (
      <>
        <p>
          Cardiff landlords who fail to maintain electrical safety face enforcement action under the
          Renting Homes (Wales) Act 2022, the Housing Act 2004, and related legislation. The Welsh
          Government's more interventionist approach to rental property standards means Cardiff
          landlords face a stricter compliance environment than many English cities. Consequences
          include civil penalties, improvement notices, prohibition orders, and cost recovery.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HHSRS enforcement</strong> — Category 1 electrical hazards trigger mandatory
                enforcement action. Cardiff Council acting through Shared Regulatory Services can
                issue an improvement notice requiring remedial work within a fixed period. Failure
                to comply can result in emergency remedial action and recovery of all costs from the
                landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties up to £30,000</strong> — under powers conferred by the
                Housing and Planning Act 2016, Cardiff Council can impose civil penalties of up to
                £30,000 for housing offences including failure to licence an HMO and failure to
                comply with improvement notices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — tenants can apply to the Residential
                Property Tribunal Wales for rent repayment orders where a landlord has committed
                certain housing offences. Operating an unlicensed HMO — a common consequence of EICR
                non-compliance blocking licence applications — can trigger such orders. Welsh
                tenants have broader remedies under the 2022 Act than English tenants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prohibition orders</strong> — in severe cases, Cardiff Council can issue a
                prohibition order preventing the property from being used as a dwelling until
                specified work is completed. This results in loss of rental income in addition to
                the cost of remedial works.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of a five-yearly EICR (£140 to £400 depending on property size) is trivial
          compared to these potential consequences. Cardiff landlords should treat electrical safety
          as a core compliance obligation under Welsh law, not an optional extra.
        </p>
      </>
    ),
  },
  {
    id: 'tenant-rights',
    heading: 'Tenant Rights Under Welsh Law',
    content: (
      <>
        <p>
          The Renting Homes (Wales) Act 2022 gives Cardiff tenants the right to a property that is
          fit for human habitation throughout the tenancy. The fitness duties under Welsh law are
          more extensive than those in England, meaning Cardiff tenants have broader protections and
          more avenues for enforcement than their counterparts across the border.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — HMO tenants have the right to see the
                EICR as a condition of the licence. All tenants should request a copy from their
                landlord or letting agent before or at the start of the tenancy. Under the 2022 Act,
                landlords must proactively provide this documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your landlord has not obtained
                an EICR or has not completed required remedial work, report this to Cardiff
                Council's Shared Regulatory Services housing enforcement team. The team can inspect
                the property and take enforcement action on your behalf under both HHSRS powers and
                the Renting Homes (Wales) Act 2022.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — under the fitness for human habitation
                duty, landlords must remedy electrical hazards promptly. If the landlord fails to
                act, the tenant can apply to the Residential Property Tribunal Wales or report the
                matter to Cardiff Council for enforcement action. Welsh law gives tenants more
                extensive remedies than the English equivalent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — under the Renting Homes
                (Wales) Act 2022, tenants are protected from retaliatory eviction where they have
                raised legitimate complaints about the condition of their property, including
                electrical safety concerns.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cardiff tenants can contact Cardiff Council's Shared Regulatory Services housing team,
          Shelter Cymru, or Citizens Advice Cymru for guidance. Cardiff University and Cardiff
          Metropolitan University both provide accommodation advice services for students
          experiencing problems with private rented housing.
        </p>
      </>
    ),
  },
  {
    id: 'remedial-timescales',
    heading: 'Remedial Work Timescales',
    content: (
      <>
        <p>
          When an EICR identifies C1 or C2 observations (classified under BS 7671 Section 631),
          Cardiff landlords should complete remedial work within strict timescales — both to meet
          HHSRS compliance requirements, satisfy HMO licence conditions, and fulfil the fitness for
          human habitation duty under the Renting Homes (Wales) Act 2022.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days recommended maximum</strong> — following best practice aligned with
                the England 2020 Regulations, all remedial work should be completed within 28 days
                of the EICR unless the inspector specifies a shorter period. Cardiff Council
                improvement notices typically specify similar timescales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate</strong> — where a C1 (danger present)
                observation is recorded, the inspector may recommend immediate disconnection of the
                affected circuit. Landlords should arrange emergency remedial work as soon as
                possible and not wait the full 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — once remedial work is complete, the landlord
                should obtain written confirmation from a qualified person. This confirmation should
                be provided to the tenant and retained for HMO licence compliance purposes and as
                evidence of fitness under the Renting Homes (Wales) Act 2022.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Cardiff remedial work</strong> — typical remedial work in Cardiff
                rental properties includes fitting RCD protection (Regulation 411.3.3), replacing
                rubber-insulated wiring in pre-1970s Roath and Canton terraces, upgrading consumer
                units, addressing TT earthing system deficiencies, and adding supplementary bonding
                in bathrooms.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cardiff landlords should establish a relationship with a reliable local electrician who
          can respond promptly when remedial work is needed. Delays in completing remedial work risk
          enforcement action from Cardiff Council's Shared Regulatory Services team and can
          jeopardise HMO licence renewals.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Cardiff',
    content: (
      <>
        <p>
          Cardiff and South Wales have a strong electrical contracting sector. Landlords should
          verify qualifications and experience before commissioning an EICR — inspectors familiar
          with the older housing stock in Roath, Canton, and Cathays are best placed to deal with
          rubber-insulated wiring, TT earthing systems, and the other challenges common in Cardiff's
          Victorian and Edwardian terrace stock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                online registers for Cardiff-based inspectors. Registration provides assurance of
                qualifications, insurance, and regular assessment by the scheme body.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector should hold City and Guilds
                2391 (Inspection and Testing) or equivalent, plus a current BS 7671 qualification
                (C&G 2382 18th Edition). Experience with pre-1970s terraced properties in Roath,
                Canton, and Cathays is important, particularly familiarity with rubber-insulated
                wiring and TT earthing systems found in older Cardiff stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>National Grid Electricity Distribution familiarity</strong> — National Grid
                Electricity Distribution (formerly Western Power Distribution) is the DNO for
                Cardiff. Inspectors should be familiar with both PME and TT earthing arrangements in
                the Cardiff area, as TT systems require different bonding and RCD protection
                strategies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO experience</strong> — for Cardiff student HMOs in Cathays and Roath,
                choose an inspector with experience of multi-occupancy properties. HMO EICRs require
                testing of fire alarm systems, emergency lighting, and communal area circuits in
                addition to the standard domestic installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Cardiff (2026 Prices)',
    content: (
      <>
        <p>
          Cardiff EICR costs are generally slightly lower than equivalent English cities, reflecting
          South Wales labour rates. Wales overall tends to sit below England on electrician day
          rates, which feeds through into EICR pricing. However, the high density of older Victorian
          and Edwardian terraces in Roath, Canton, Cathays, and Splott means many inspections take
          longer than a modern property, with pre-1970s wiring and TT earthing systems adding to
          inspection time and cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £140 to £200. Typically 3 to 5 circuits with a
                single consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £180 to £280. Very common in Roath,
                Canton, and Cathays. Properties with rubber-insulated wiring or TT earthing systems
                may cost more to inspect thoroughly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom terraced house</strong> — £230 to £400. Victorian and
                Edwardian properties in Pontcanna, Roath, and Splott with aged wiring often require
                more time for thorough testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO</strong> — £320 to £600+. Multiple consumer units, fire alarm
                systems, and emergency lighting increase inspection scope and time. Cathays HMOs in
                particular — with a mix of rubber wiring and high-load circuits — often sit at the
                upper end of this range.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work identified during the
          EICR is quoted and charged separately. Some Cardiff electricians offer combined EICR and
          remedial packages, which can save landlords time and reduce overall costs.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Cardiff',
    content: (
      <>
        <p>
          Cardiff's large student rental sector — centred on Cathays ("Studentville") and Roath —
          combined with the density of pre-1970s terraced properties throughout Canton, Pontcanna,
          and Splott creates strong, year-round demand for landlord EICRs. The prevalence of
          rubber-insulated wiring, TT earthing systems, and absent RCDs in this stock means C2
          findings are common on first inspections, creating a consistent flow of remedial work
          alongside the initial EICR. Electricians who build relationships with Cardiff letting
          agents and student landlord portfolios can develop a reliable stream of inspection,
          testing, and remedial work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the report on your phone while still on site. AI board scanning, voice
                  test entry, and instant PDF export mean no evening paperwork. Send the report to
                  the landlord before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win the Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, quote the remedial work immediately using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Cardiff landlords need to act promptly under Welsh law — the electrician who
                  quotes on the day of the EICR wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business with Elec-Mate"
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

export default function LandlordElectricalSafetyCardiffPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Cardiff | EICR Wales Landlords"
      description="Landlord electrical safety requirements in Cardiff under the Renting Homes (Wales) Act 2022. Welsh law explained, Cardiff Council Shared Regulatory Services enforcement, HMO requirements for Cathays and Roath student properties, rubber wiring and TT earthing issues, tenant rights, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Cardiff:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Cardiff landlords need to know about electrical safety compliance under the Renting Homes (Wales) Act 2022 — Welsh law explained, Cardiff Council Shared Regulatory Services enforcement, HMO requirements in Cathays and Roath, common defects in older Cardiff stock, tenant rights, and EICR costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Cardiff"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
