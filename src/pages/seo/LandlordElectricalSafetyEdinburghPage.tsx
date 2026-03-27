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
  { label: 'Landlord Electrical Safety Edinburgh', href: '/guides/landlord-electrical-safety-edinburgh' },
];

const tocItems = [
  { id: 'repairing-standard', label: 'The Repairing Standard (Scotland)' },
  { id: 'edinburgh-enforcement', label: 'Edinburgh Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Edinburgh' },
  { id: 'tribunal', label: 'First-tier Tribunal for Scotland' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Edinburgh' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Scottish landlords are governed by the Housing (Scotland) Act 2006 Repairing Standard — NOT the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, which applies only in England.',
  'Under the Repairing Standard, Edinburgh landlords must ensure the electrical installation in a let property is in a reasonable state of repair and in proper working order. An EICR (or Electrical Installation Condition Report) is the standard means of demonstrating compliance.',
  'Disputes and enforcement relating to the Repairing Standard are handled by the First-tier Tribunal for Scotland (Housing and Property Chamber) — NOT by City of Edinburgh Council, which handles HMO licensing separately.',
  'RCD protection is required on socket-outlet circuits under Regulation 411.3.3 of BS 7671. Absence of RCD protection is a common finding that renders an EICR Unsatisfactory, triggering the Repairing Standard obligation to carry out remedial work.',
  'Edinburgh\'s private rented sector is one of the largest in Scotland, with a high concentration of tenement flats that frequently have ageing electrical installations requiring attention.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety requirements in Edinburgh?',
    answer:
      'In Edinburgh — and across Scotland — landlords are governed by the Housing (Scotland) Act 2006 Repairing Standard, not the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. The Repairing Standard requires that the electrical installation in a let property is in a reasonable state of repair and in proper working order throughout the tenancy. An EICR carried out by a qualified person is the standard means of demonstrating compliance. Landlords of HMOs in Edinburgh must also comply with City of Edinburgh Council\'s HMO licensing conditions, which include specific EICR requirements.',
  },
  {
    question: 'Who enforces electrical safety for landlords in Edinburgh?',
    answer:
      'Enforcement of the Repairing Standard is not handled by City of Edinburgh Council in the same way that English councils enforce the 2020 Regulations. Instead, tenants can apply to the First-tier Tribunal for Scotland (Housing and Property Chamber) if they believe the landlord has failed to meet the Repairing Standard. The Tribunal can issue a Repairing Standard Enforcement Order requiring the landlord to carry out specific work within a set timescale. City of Edinburgh Council has separate powers relating to HMO licensing and can take action against unlicensed HMOs or those failing licence conditions.',
  },
  {
    question: 'What happens if my Edinburgh rental property fails the EICR?',
    answer:
      'If an EICR returns C1 (danger present) or C2 (potentially dangerous) observations, the installation is classified as Unsatisfactory. Under the Repairing Standard, this indicates the electrical installation is not in a reasonable state of repair and the landlord has an obligation to carry out remedial work. If the landlord fails to act and the tenant applies to the First-tier Tribunal for Scotland, the Tribunal can issue a Repairing Standard Enforcement Order and, ultimately, a Rent Relief Order if the order is not complied with.',
  },
  {
    question: 'Do Edinburgh landlords need to obtain an EICR?',
    answer:
      'While the Housing (Scotland) Act 2006 does not specify an EICR by name, an EICR carried out by a qualified electrician is the recognised means of demonstrating that the Repairing Standard is met for the electrical installation. For HMOs licensed by City of Edinburgh Council, an EICR is an explicit condition of the licence. It is strongly recommended that all Edinburgh landlords obtain an EICR at least every five years or at change of tenancy.',
  },
  {
    question: 'Do I need an EICR for my Edinburgh HMO?',
    answer:
      'Yes. City of Edinburgh Council operates mandatory HMO licensing, and an EICR is a condition of the HMO licence. The EICR must cover all fixed electrical installations, including communal areas, fire alarm systems, and emergency lighting. HMO licences in Edinburgh typically require EICRs every three years rather than five. Operating an unlicensed HMO in Edinburgh is a criminal offence.',
  },
  {
    question: 'How much does a landlord EICR cost in Edinburgh?',
    answer:
      'EICR costs in Edinburgh reflect the city\'s elevated labour rates. A one-bedroom tenement flat typically costs £130 to £220. A two-bedroom flat runs from £180 to £300. A three-bedroom house costs around £250 to £420. HMOs cost £350 to £700 or more, depending on the number of consumer units and circuits. Edinburgh prices are generally higher than Glasgow but lower than London.',
  },
  {
    question: 'What is the First-tier Tribunal for Scotland and how does it relate to landlords?',
    answer:
      'The First-tier Tribunal for Scotland (Housing and Property Chamber) is the body that handles Repairing Standard disputes in Scotland. If a tenant believes their landlord has failed to meet the Repairing Standard — including by failing to ensure the electrical installation is safe — they can make a referral to the Tribunal. The Tribunal can issue a Repairing Standard Enforcement Order requiring specific remedial work within a set period. If the landlord does not comply, the Tribunal can issue a Rent Relief Order reducing rent by up to 90 per cent.',
  },
  {
    question: 'What qualifications must an EICR inspector have in Edinburgh?',
    answer:
      'The inspector must be qualified and competent. In practice this means holding City and Guilds 2391 (Inspection and Testing) or equivalent, and a current BS 7671 qualification (C&G 2382 18th Edition). Registration with SELECT (the Electrical Contractors\' Association of Scotland), NICEIC, or NAPIT provides assurance of qualifications and regular assessment. Professional indemnity insurance is also required.',
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
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'repairing-standard',
    heading: 'The Housing (Scotland) Act 2006 — Repairing Standard',
    content: (
      <>
        <p>
          Scottish landlords are governed by the Housing (Scotland) Act 2006 Repairing Standard —
          NOT the Electrical Safety Standards in the Private Rented Sector (England) Regulations
          2020, which applies only to landlords in England. This is a critical distinction for
          Edinburgh landlords and the electricians who work with them.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repairing Standard obligation</strong> — the Housing (Scotland) Act 2006
                requires private landlords to ensure that the electrical installation in a let
                property is in a reasonable state of repair and in proper working order throughout
                the tenancy. This duty is ongoing — not just at the start of a tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR as evidence of compliance</strong> — an Electrical Installation
                Condition Report (EICR) carried out by a qualified person, documented in accordance
                with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing), is the recognised means of
                demonstrating compliance with the Repairing Standard for electrical installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended frequency</strong> — although the Act does not specify a
                mandatory inspection interval, an EICR every five years or at change of tenancy
                is the widely accepted best practice and the standard recommended by SELECT and
                NICEIC. Edinburgh HMO licences require inspections at the intervals specified
                in the licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration</strong> — all private landlords in Scotland must
                register with their local council under the landlord registration scheme. Edinburgh
                landlords must register with City of Edinburgh Council. Failure to comply with the
                Repairing Standard can affect landlord registration status.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Repairing Standard applies to all private residential tenancies in Scotland including
          short-term lets (subject to Scottish Government licensing). It does not apply to social
          housing, which has separate obligations under the Scottish Social Housing Charter.
        </p>
      </>
    ),
  },
  {
    id: 'edinburgh-enforcement',
    heading: 'Enforcement in Edinburgh',
    content: (
      <>
        <p>
          Enforcement of landlord electrical safety obligations in Edinburgh operates differently
          from the English council-led model. Understanding who enforces what is essential for
          Edinburgh landlords and their electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First-tier Tribunal for Scotland</strong> — the Housing and Property
                Chamber of the First-tier Tribunal is the primary enforcement body for Repairing
                Standard disputes. Tenants who believe the electrical installation does not meet
                the Repairing Standard can apply to the Tribunal without cost. The Tribunal can
                issue Repairing Standard Enforcement Orders requiring specific remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City of Edinburgh Council — HMO licensing</strong> — the Council has
                significant powers through HMO licensing. EICR compliance is a condition of
                the HMO licence. The Council can refuse to grant or renew a licence, or impose
                licence conditions, where electrical safety requirements are not met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration</strong> — City of Edinburgh Council administers
                the landlord registration scheme. Persistent failure to meet Repairing Standard
                obligations can result in refusal to register or removal from the register,
                which makes renting property illegal in Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No council-issued fixed penalties</strong> — unlike in England, there are
                no fixed civil penalties of up to £30,000 per breach issued by the council for
                failure to obtain an EICR. The Scottish system operates through the Tribunal,
                with Rent Relief Orders as the main financial sanction against non-compliant
                landlords.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh has one of the UK's largest proportional HMO sectors, driven by its large
          student population at the University of Edinburgh and Edinburgh Napier University. City
          of Edinburgh Council operates mandatory HMO licensing and takes compliance seriously.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — all HMOs in Edinburgh (properties
                occupied by three or more persons from more than one family, sharing facilities)
                must be licensed by City of Edinburgh Council. A valid EICR is a standard licence
                condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — Edinburgh HMO licence conditions typically
                require EICRs at shorter intervals than the standard five years. Check your
                specific licence conditions for the required frequency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal areas and fire safety systems</strong> — the EICR must cover all
                fixed electrical installations in an HMO, including communal corridors, stair
                lighting, fire alarm systems, and emergency lighting. Regulation 411.3.3 applies
                to all circuits including those in communal areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequences of non-compliance</strong> — operating an unlicensed HMO
                in Edinburgh is a criminal offence. Failure to comply with EICR requirements
                can result in licence refusal or revocation. The Council actively monitors
                the student and private rented sector.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tribunal',
    heading: 'First-tier Tribunal for Scotland',
    content: (
      <>
        <p>
          The First-tier Tribunal for Scotland (Housing and Property Chamber) is the judicial body
          that handles Repairing Standard disputes in Scotland. It is a no-cost process for tenants,
          making it accessible and increasingly used.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant application</strong> — any tenant in a private rented property in
                Scotland can apply to the Tribunal if they believe the landlord has failed to
                comply with the Repairing Standard. The application is free and can be made online.
                The tenant does not need legal representation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repairing Standard Enforcement Order</strong> — if the Tribunal finds in
                favour of the tenant, it can issue a Repairing Standard Enforcement Order (RSEO)
                requiring the landlord to carry out specific remedial work within a set timescale.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent Relief Order</strong> — if a landlord fails to comply with an RSEO,
                the Tribunal can issue a Rent Relief Order (RRO) reducing the rent by up to 90
                per cent. This is a significant financial sanction for non-compliant landlords.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration impact</strong> — a finding against a landlord at
                the Tribunal can affect their registration status with City of Edinburgh Council,
                potentially preventing them from renting property in Scotland.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tenant-rights',
    heading: 'Tenant Rights Under the Repairing Standard',
    content: (
      <>
        <p>
          Tenants in Edinburgh's private rented sector have rights under the Housing (Scotland)
          Act 2006 Repairing Standard. These rights apply throughout the tenancy — not just at
          the start.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a safe electrical installation</strong> — tenants have the right
                to a property where the electrical installation is in a reasonable state of repair
                and in proper working order throughout the tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to request the EICR</strong> — tenants can ask their landlord for
                a copy of the current EICR. If the landlord cannot provide one, or if the report
                shows C1 or C2 observations that have not been addressed, the tenant can apply to
                the First-tier Tribunal for Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to apply to the Tribunal</strong> — tenants can apply to the
                First-tier Tribunal for Scotland (Housing and Property Chamber) at no cost if they
                believe the Repairing Standard is not being met. Guidance is available from
                Shelter Scotland and Citizens Advice Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliation</strong> — landlords cannot lawfully evict a
                tenant in retaliation for exercising Repairing Standard rights. Private residential
                tenancies in Scotland (under the Private Housing (Tenancies) (Scotland) Act 2016)
                cannot be ended by a 'no-fault' notice to quit, providing tenants with greater
                security than their English counterparts.
              </span>
            </li>
          </ul>
        </div>
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
          Edinburgh landlords have an obligation to carry out remedial work promptly under the
          Repairing Standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No fixed statutory deadline</strong> — unlike the 28-day rule in England,
                Scotland's Repairing Standard does not specify a fixed timescale for completing
                remedial work. However, landlords should act as quickly as possible, particularly
                for C1 (danger present) observations which require immediate action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action required</strong> — where a C1 (danger
                present) observation is recorded, the affected circuit may need to be disconnected
                immediately. Edinburgh landlords should arrange emergency remedial work without
                delay. Failure to act on a C1 observation is a clear breach of the Repairing
                Standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written evidence of remedial work</strong> — once remedial work is
                completed, the landlord should obtain written confirmation from a qualified
                electrician that the work has been done satisfactorily. Keep this evidence —
                it may be needed if the tenant makes a Tribunal application or at HMO licence
                renewal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Edinburgh remedial work</strong> — typical remedial work in
                Edinburgh rental properties includes fitting RCD protection (Regulation 411.3.3),
                replacing outdated plastic consumer units with metal enclosures, upgrading earthing
                and bonding, and replacing deteriorated rubber-insulated cables common in the
                tenement stock.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh has a good supply of qualified electricians capable of carrying out EICRs.
          Landlords should verify qualifications and certification before commissioning an inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT, NICEIC, or NAPIT registration</strong> — search the online
                registers for Edinburgh-based inspectors. SELECT is the Scottish trade association
                and its register is a good starting point for landlords in Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector should hold City and
                Guilds 2391 (Inspection and Testing) or equivalent, a current BS 7671 qualification
                (C&G 2382), and ideally experience with Edinburgh's tenement and Victorian
                property stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — verify that the inspector
                carries professional indemnity insurance. Required for competent person scheme
                membership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid unusually cheap quotes</strong> — a thorough EICR for a
                two-bedroom Edinburgh tenement flat requires 2 to 4 hours and calibrated test
                equipment. Prices substantially below £130 for a one-bedroom flat may indicate
                inadequate testing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Edinburgh (2026 Prices)',
    content: (
      <>
        <p>
          Edinburgh EICR costs reflect the city's higher labour rates relative to other Scottish
          cities, though they remain below London prices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom tenement flat</strong> — £130 to £220. The most common EICR
                in Edinburgh, typically 3 to 5 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £180 to £300. Usually 5 to 8 circuits.
                Victorian tenement conversions may take longer than modern flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house or flat</strong> — £250 to £420. Older Edinburgh
                properties can take longer to inspect due to complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £350 to £700+. Multiple consumer units, fire alarm systems,
                and emergency lighting increase the inspection scope significantly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover inspection and report only. Remedial work is quoted and charged
          separately. Some Edinburgh electricians offer combined EICR and remedial packages
          which can be cost-effective for landlords with multiple properties.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh's large private rented sector — dominated by tenement flats housing students
          and young professionals — creates consistent demand for landlord EICRs. Electricians
          who understand the Scottish Repairing Standard framework and its differences from the
          English 2020 Regulations are well-placed to advise Edinburgh landlords.
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
                  to complete the report on your phone while still on site. AI board scanning,
                  voice test entry, and instant PDF export mean no evening paperwork. Send the
                  report to the landlord before you leave the property.
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
                  . Edinburgh landlords are motivated to act quickly given the Tribunal process —
                  the electrician who quotes on the day of the EICR wins the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business in Edinburgh with Elec-Mate"
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

export default function LandlordElectricalSafetyEdinburghPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Edinburgh | Repairing Standard & EICR 2026"
      description="Landlord electrical safety requirements in Edinburgh. Scotland's Housing (Scotland) Act 2006 Repairing Standard explained, First-tier Tribunal enforcement, HMO requirements, tenant rights, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide — Scotland"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Edinburgh:{' '}
          <span className="text-yellow-400">Repairing Standard 2026</span>
        </>
      }
      heroSubtitle="Edinburgh landlords are governed by Scotland's Housing (Scotland) Act 2006 Repairing Standard — not the England 2020 Regulations. This guide explains the Scottish framework, First-tier Tribunal enforcement, HMO requirements, tenant rights, and EICR costs for Edinburgh in 2026."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
