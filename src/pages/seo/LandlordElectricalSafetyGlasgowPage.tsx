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
  Clock,
  Search,
  Users,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Landlord Electrical Safety Glasgow', href: '/guides/landlord-electrical-safety-glasgow' },
];

const tocItems = [
  { id: 'scotland-regulations', label: 'Scottish Regulations (Not England 2020)' },
  { id: 'repairing-standard', label: 'The Repairing Standard' },
  { id: 'glasgow-enforcement', label: 'Glasgow Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Glasgow' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Scotland does NOT use the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Glasgow landlords are governed by the Housing (Scotland) Act 2006 and the Repairing Standard.',
  'The Repairing Standard requires landlords to ensure the electrical installation is in a reasonable state of repair and proper working order. An EICR every five years is the standard means of demonstrating compliance.',
  'Enforcement in Scotland is through the First-tier Tribunal for Scotland (Housing and Property Chamber), NOT the local council. Tenants apply directly to the Tribunal if the landlord fails to meet the Repairing Standard.',
  'Glasgow City Council enforces HMO licensing separately. HMOs in Glasgow require an EICR as a mandatory condition of their HMO licence, typically every three years.',
  'RCD protection on socket-outlet circuits is required under Regulation 411.3.3 of BS 7671. Many Glasgow tenement flats have aged wiring without RCD protection, resulting in C2 observations.',
];

const faqs = [
  {
    question: 'Does the England 2020 electrical safety regulations apply in Glasgow?',
    answer:
      'No. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 do NOT apply in Scotland. Glasgow landlords are governed by the Housing (Scotland) Act 2006 Repairing Standard. This is a fundamental difference — the enforcement body, complaint process, and legal framework are all different from England.',
  },
  {
    question: 'What is the Repairing Standard for Glasgow landlords?',
    answer:
      'The Repairing Standard is set out in Section 13 of the Housing (Scotland) Act 2006. It requires landlords to ensure the house is wind and watertight, the structure and exterior are in a reasonable state of repair, installations for water, gas, electricity, heating, and sanitation are in a reasonable state of repair and proper working order, and any fixtures and fittings provided are in a reasonable state of repair. For electrical safety, this means the fixed electrical installation must be safe and functional.',
  },
  {
    question: 'Who enforces landlord electrical safety in Glasgow?',
    answer:
      'The First-tier Tribunal for Scotland (Housing and Property Chamber) enforces the Repairing Standard, not Glasgow City Council. Tenants apply directly to the Tribunal if they believe the landlord is failing to meet the standard. The Tribunal can order the landlord to carry out specific work within a set timescale. Glasgow City Council enforces HMO licensing separately.',
  },
  {
    question: 'How much does an EICR cost in Glasgow?',
    answer:
      'Glasgow EICR costs are generally lower than London and broadly in line with the Scottish average. A one-bedroom flat typically costs £100 to £180, a two-bedroom tenement flat £150 to £250, a three-bedroom house £220 to £360, and an HMO £300 to £600. Glasgow tenement flats with older wiring may take longer to inspect.',
  },
  {
    question: 'Do I need an EICR for a Glasgow HMO?',
    answer:
      'Yes. Glasgow City Council requires a valid EICR as a condition of HMO licensing. HMOs must have adequate fire detection, emergency lighting, and electrical safety. The EICR must cover all fixed electrical installations including communal areas. Many Glasgow HMO licences require EICRs every three years.',
  },
  {
    question: 'What happens if a Glasgow landlord ignores electrical safety issues?',
    answer:
      'The tenant can apply to the First-tier Tribunal for Scotland. The Tribunal can issue a Repairing Standard Enforcement Order (RSEO) requiring the landlord to carry out specific work within a set timescale. Failure to comply with an RSEO can result in the landlord being reported to the local authority and potentially having their landlord registration revoked. Without landlord registration, it is a criminal offence to let property in Scotland.',
  },
  {
    question: 'Is landlord registration required in Glasgow?',
    answer:
      'Yes. All private landlords in Scotland must be registered on the Scottish Landlord Register. Operating without registration is a criminal offence. Glasgow City Council can refuse or revoke registration for landlords who fail to maintain properties to the Repairing Standard. A pattern of electrical safety failures could result in loss of registration.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements across the UK.',
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
    href: '/guides/landlord-electrical-safety-edinburgh',
    title: 'Landlord Electrical Safety Edinburgh',
    description: 'Edinburgh landlord electrical safety under the Scottish Repairing Standard.',
    icon: Building2,
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

const sections = [
  {
    id: 'scotland-regulations',
    heading: 'Scottish Regulations — NOT the England 2020 Regulations',
    content: (
      <>
        <p>
          This is a critical distinction for Glasgow landlords. The Electrical Safety Standards
          in the Private Rented Sector (England) Regulations 2020 do <strong>not</strong> apply
          in Scotland. Glasgow is governed by entirely different legislation: the Housing
          (Scotland) Act 2006 and its associated Repairing Standard.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Different legislation</strong> — Scotland uses the Housing (Scotland)
                Act 2006, not the England 2020 Regulations. The legal requirements, enforcement
                mechanisms, and penalties are all different.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Different enforcement body</strong> — in England, local councils enforce
                the regulations. In Scotland, the First-tier Tribunal for Scotland (Housing and
                Property Chamber) handles enforcement. Tenants apply directly to the Tribunal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No £30,000 civil penalty regime</strong> — Scotland does not have the
                same civil penalty framework as England. Instead, the Tribunal can issue
                enforcement orders, and landlords risk losing their landlord registration (which
                is a criminal matter in Scotland).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords who own properties in both England and Scotland must understand that the
          compliance requirements are fundamentally different in each jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: 'repairing-standard',
    heading: 'The Repairing Standard',
    content: (
      <>
        <p>
          The Repairing Standard is set out in Section 13 of the Housing (Scotland) Act 2006.
          It requires landlords to ensure that the property meets a minimum standard of repair
          and functionality, including the electrical installation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical installations</strong> — must be in a reasonable state of
                repair and proper working order. An EICR documented in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631) every five years is the standard way to demonstrate compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory EICR</strong> — an EICR with no C1 or C2 observations
                demonstrates that the installation is in a reasonable state. An Unsatisfactory
                EICR indicates the landlord may be failing to meet the Repairing Standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish Landlord Register</strong> — all private landlords in Scotland
                must be registered. Consistent failure to maintain the Repairing Standard can
                result in removal from the register, making it illegal to let the property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          While there is no explicit statutory requirement in Scotland for an EICR every five
          years (unlike England), the practical reality is that a current EICR is the only
          reliable way to demonstrate that the electrical installation meets the Repairing
          Standard. Most letting agents and insurers in Glasgow require one.
        </p>
      </>
    ),
  },
  {
    id: 'glasgow-enforcement',
    heading: 'Glasgow Enforcement',
    content: (
      <>
        <p>
          Enforcement of the Repairing Standard in Glasgow works differently from England. The
          primary enforcement body is the First-tier Tribunal for Scotland, not Glasgow City
          Council.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First-tier Tribunal for Scotland</strong> — tenants apply directly to the
                Housing and Property Chamber. The Tribunal inspects the property, determines
                whether the Repairing Standard is met, and can issue a Repairing Standard
                Enforcement Order (RSEO) requiring specific work within a set timescale.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement orders</strong> — an RSEO specifies what work must be done
                and by when. Failure to comply can be reported to the local authority and can
                affect the landlord's registration status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glasgow City Council role</strong> — while the Tribunal handles Repairing
                Standard enforcement, Glasgow City Council manages landlord registration, HMO
                licensing, and can take action under other housing legislation. The council can
                also refer persistent offenders for prosecution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glasgow tenement stock</strong> — Glasgow has a large stock of Victorian
                and Edwardian tenement flats. These properties commonly have aged wiring,
                inadequate earthing, and lack of RCD protection (Regulation 411.3.3). The
                Tribunal regularly deals with cases involving electrical defects in Glasgow
                tenements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in Glasgow',
    content: (
      <>
        <p>
          HMO licensing in Scotland is governed by the Housing (Scotland) Act 2006 (Part 5).
          Glasgow City Council is the licensing authority for HMOs in the city.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — in Scotland, an HMO is defined as a property
                occupied by three or more unrelated persons as their only or main residence. This
                is a lower threshold than England's mandatory licensing (five persons). A valid
                EICR is a licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student areas</strong> — the West End (around the University of Glasgow),
                Partick, Hillhead, and areas near Glasgow Caledonian University have high
                concentrations of student HMOs. These properties must have valid EICRs covering
                all fixed installations, fire alarm systems, and emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — Glasgow City Council typically requires
                EICRs every three years for HMOs, more frequent than the standard five-year
                recommendation for domestic properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance in Scotland',
    content: (
      <>
        <p>
          Scotland's penalty framework differs from England. There is no £30,000 civil penalty
          regime for electrical safety specifically, but the consequences can be equally severe.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement orders</strong> — the Tribunal can order specific work within
                a set timescale. Non-compliance can be referred to the local authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loss of landlord registration</strong> — persistent failure to meet the
                Repairing Standard can result in removal from the Scottish Landlord Register.
                Letting property without registration is a criminal offence with fines of up
                to £50,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing penalties</strong> — operating an unlicensed HMO in Scotland
                is a criminal offence. Glasgow City Council can prosecute, and fines are
                unlimited on conviction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent penalty orders</strong> — under the Private Housing (Tenancies)
                (Scotland) Act 2016, unregistered landlords face having rental income seized
                by the local authority.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tenant-rights',
    heading: 'Tenant Rights in Scotland',
    content: (
      <>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apply to the Tribunal</strong> — tenants can apply directly to the
                First-tier Tribunal for Scotland if they believe the Repairing Standard is not
                being met. There is no cost to the tenant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tribunal inspection</strong> — the Tribunal will arrange an inspection
                of the property and make a determination. If the standard is not met, an
                enforcement order is issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No retaliatory eviction</strong> — the Private Housing (Tenancies)
                (Scotland) Act 2016 provides strong protection against retaliatory eviction.
                Landlords cannot evict tenants for exercising their rights under the Repairing
                Standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shelter Scotland and Citizens Advice Scotland</strong> — provide free
                advice to tenants on exercising their rights.
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
          In Scotland, remedial timescales are set by the Tribunal in the enforcement order,
          rather than the fixed 28-day period used in England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tribunal-set timescales</strong> — the Tribunal specifies a reasonable
                timescale for completion of remedial work in the enforcement order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent safety issues</strong> — C1 (danger present) observations should
                be addressed immediately regardless of any formal timescale. Landlords have a
                common law duty of care.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Glasgow remedial work</strong> — RCD protection (Regulation
                411.3.3), consumer unit replacements in tenement flats, earthing upgrades,
                rewiring of deteriorated rubber-insulated cables.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Glasgow',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search NICEIC, NAPIT, SELECT
                (Scotland's trade association for the electrical industry), or ELECSA for
                Glasgow-based inspectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT membership</strong> — SELECT is the Scottish Joint Industry Board
                (SJIB) trade association. Many Scottish electricians are SELECT members rather
                than NICEIC or NAPIT. SELECT membership provides equivalent assurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SP Energy Networks</strong> — the DNO for Glasgow is SP Energy Networks
                (part of Scottish Power). Inspectors should be familiar with their earthing
                provisions and supply arrangements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Glasgow (2026 Prices)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>One-bedroom flat</strong> — £100 to £180.</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom tenement flat</strong> — £150 to £250. Glasgow's tenement
                stock often requires extra time due to older wiring and limited access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Three-bedroom house</strong> — £220 to £360.</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>HMO</strong> — £300 to £600+.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Glasgow',
    content: (
      <>
        <p>
          Glasgow's large private rented sector and extensive tenement stock create consistent
          demand for EICR work. Electricians familiar with Glasgow tenement wiring, communal
          supply arrangements, and SP Energy Networks earthing provisions are well positioned.
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
                  for on-site completion with AI board scanning and instant PDF export.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EICR business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

export default function LandlordElectricalSafetyGlasgowPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Glasgow | Scottish Repairing Standard 2026"
      description="Landlord electrical safety requirements in Glasgow under Scottish law. Housing (Scotland) Act 2006 Repairing Standard, First-tier Tribunal enforcement, HMO licensing, and EICR costs for 2026. NOT the England 2020 Regulations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide — Scotland"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Glasgow:{' '}
          <span className="text-yellow-400">Scottish Repairing Standard 2026</span>
        </>
      }
      heroSubtitle="Glasgow landlord electrical safety under Scottish law — the Housing (Scotland) Act 2006 Repairing Standard, First-tier Tribunal enforcement, HMO licensing, and finding qualified inspectors. Note: Scotland uses different legislation from England."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
