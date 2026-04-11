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
  Zap,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Bradford', href: '/eicr-bradford' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements in Bradford' },
  { id: 'bradford-enforcement', label: 'Bradford Council Enforcement' },
  { id: 'eicr-costs-bradford', label: 'EICR Costs in Bradford' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Bradford' },
  { id: 'common-findings', label: 'Common EICR Findings in Bradford' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician in Bradford' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Bradford private landlords to hold a valid EICR and provide it to tenants before every new tenancy and at least every five years.',
  'Bradford Council (City of Bradford Metropolitan District Council) enforces the regulations and can impose civil penalties of up to £30,000 per breach.',
  'Bradford has one of the largest private rented sectors in West Yorkshire, with high concentrations of HMOs and student accommodation in Bradford city centre and around the University of Bradford.',
  'EICR costs in Bradford typically range from £150 to £280 for a standard two-bedroom property, reflecting Yorkshire labour rates.',
  'Many Bradford properties date from the Victorian and Edwardian eras, meaning EICR inspectors frequently encounter old wiring systems that attract C1 or C2 observations.',
];

const faqs = [
  {
    question: 'Is an EICR legally required for rental properties in Bradford?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply throughout England, including all areas of Bradford. Private landlords must arrange for the electrical installation to be inspected and tested by a qualified person at least every five years. A copy of the EICR must be provided to tenants within 28 days of the inspection and to Bradford Council within seven days if requested.',
  },
  {
    question: 'How much does an EICR cost in Bradford?',
    answer:
      'In Bradford, an EICR typically costs £150 to £190 for a one-bedroom flat, £180 to £260 for a two-bedroom property, £220 to £300 for a three-bedroom house, and £300 to £500 for larger properties or HMOs. Yorkshire labour rates are lower than in London or the South East, making Bradford EICR costs relatively affordable. Always obtain quotes from NICEIC or NAPIT registered electricians.',
  },
  {
    question: 'What happens if a Bradford landlord ignores the EICR requirements?',
    answer:
      'Bradford Council can impose civil financial penalties of up to £30,000 per breach. Each separate failure — not obtaining an EICR, not providing it to tenants, not supplying it to the council on request, and not completing remedial work — is a separate breach. Landlords who repeatedly ignore the regulations can face escalating penalties and may be placed on the rogue landlord database.',
  },
  {
    question: 'How often should I get an EICR for my Bradford rental property?',
    answer:
      'At least every five years under the 2020 Regulations. A new inspection is also required when a new tenancy begins if the current EICR has expired. For HMO licensed properties in Bradford, the licence conditions may specify a shorter inspection interval. The inspector may also recommend a shorter interval in the EICR report if they identify issues that should be monitored.',
  },
  {
    question: 'Do Bradford student lets need an EICR?',
    answer:
      'Yes. Student lets are private rented sector properties and are subject to the full 2020 Regulations. Student properties that are also HMOs — common around the University of Bradford — require both a mandatory HMO licence (for which a valid EICR is a condition) and compliance with the 2020 Regulations. Student tenants have the right to request a copy of the EICR before moving in.',
  },
  {
    question: 'What qualifications must an EICR inspector have in Bradford?',
    answer:
      'The inspector must be qualified and competent. For landlord compliance purposes this means registration with NICEIC, NAPIT, or ELECSA. The inspector should hold City and Guilds 2391 (Inspection and Testing) or an equivalent qualification, plus a current 18th Edition BS 7671 certificate. You can verify registration on the NICEIC or NAPIT websites before booking.',
  },
  {
    question: 'Can a Bradford tenant report their landlord for not having an EICR?',
    answer:
      "Yes. Tenants can report non-compliance to Bradford Council's housing enforcement team. The council can investigate the complaint, request the EICR from the landlord, and — if it cannot be produced — issue a remedial notice and ultimately impose a financial penalty. Tenants also have the right to request the EICR from their landlord directly and must receive it within 28 days of their written request.",
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
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what landlords must do.',
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
    id: 'what-is-eicr',
    heading: 'What Is an Electrical Installation Condition Report?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is produced by a qualified electrician
          after carrying out a thorough visual inspection and electrical testing of the fixed
          electrical installation in a property. The installation includes the consumer unit (fuse
          board), all fixed wiring, sockets, switches, light fittings, earthing arrangements, and
          main and supplementary bonding conductors.
        </p>
        <p>
          The inspection is carried out in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 18th Edition
          </SEOInternalLink>
          , the national standard for electrical installations in the UK. The electrician checks the
          condition of the installation against the requirements of the current edition and records
          any deviations or defects using standardised observation codes.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present:</strong> Immediate risk of injury exists. The inspector
                may recommend that the affected circuit is isolated. Emergency remedial action is
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous:</strong> Not immediately dangerous but urgent
                attention is required. Landlords must complete rectification within 28 days under
                the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended:</strong> Does not meet current standards but
                not classified as dangerous. No mandatory action under the regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation required:</strong> An issue has been identified
                that requires further investigation to fully assess. The landlord should arrange
                this investigation promptly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An EICR is Satisfactory if it contains no C1 or C2 observations. An Unsatisfactory EICR
          requires remedial work before the landlord is compliant. Once remedial work is complete,
          written confirmation must be provided to the tenant and the council.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICR in Bradford',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          require all private landlords in Bradford to ensure their rental properties have a valid
          EICR at all times. The regulations came into force for new tenancies on 1 June 2020 and
          for all existing tenancies on 1 April 2021.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy:</strong> A valid EICR must be provided to new tenants
                before they take up occupation. If no current EICR exists, the inspection must be
                arranged and the report obtained before the tenancy begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing tenants:</strong> A copy must be provided to existing tenants
                within 28 days of the inspection being carried out. All tenants in the property must
                receive a copy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council supply:</strong> Bradford Council can request a copy and the
                landlord must provide it within seven days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work:</strong> Where the EICR is Unsatisfactory (contains C1 or C2
                observations), all required remedial work must be completed within 28 days. Written
                confirmation of completed work must then be provided to tenants and the council.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to assured shorthold tenancies, assured tenancies, and regulated
          tenancies in England. Owner-occupied properties and social housing are not covered.
        </p>
      </>
    ),
  },
  {
    id: 'bradford-enforcement',
    heading: 'Bradford Council Enforcement',
    content: (
      <>
        <p>
          City of Bradford Metropolitan District Council is the local housing authority for
          Bradford, Keighley, Ilkley, Shipley, and surrounding areas. The council's environmental
          health and housing standards teams enforce the 2020 Regulations and deal with complaints
          about the condition of private rented properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="flex flex-col gap-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties up to £30,000:</strong> Each breach of the regulations
                attracts a separate penalty. Bradford Council has the power to impose these
                penalties and to pursue landlords through the Rent Repayment Order tribunal process
                for related offences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial notices:</strong> Where a landlord fails to carry out required
                remedial work, the council can serve a remedial notice. If the notice is ignored,
                the council can arrange for the work to be carried out and recover costs from the
                landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restriction:</strong> A landlord in Bradford cannot serve a valid
                Section 21 notice without having first provided the current EICR to the tenant. This
                is a practical consequence that can prevent a landlord regaining possession of their
                property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO enforcement:</strong> Bradford has a significant HMO market,
                particularly around the University of Bradford. The council enforces HMO licensing
                rigorously, and an EICR is a mandatory condition of every HMO licence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs-bradford',
    heading: 'EICR Costs in Bradford (2026 Prices)',
    content: (
      <>
        <p>
          Bradford benefits from West Yorkshire labour rates, which are lower than in London and
          many other major cities, making EICRs reasonably priced. The exact cost depends on the
          size and age of the property, the number of circuits, and the electrician's qualifications
          and scheme registration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £150 to £190. Modern purpose-built flats in the
                city centre or Manningham area typically fall in this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £180 to £260. Victorian terraced houses in
                areas such as Great Horton, Thornton Road corridor, or Laisterdyke may be at the
                higher end due to the age of the wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £220 to £300. Semi-detached properties in
                Bingley, Shipley, or Keighley typically fall here.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or large property</strong> — £300 to £500+. Student HMOs around the
                University of Bradford with multiple circuits and fire alarm systems cost more due
                to extended inspection time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of quotes significantly below these ranges. A thorough EICR on a Bradford
          terraced house takes at least two to three hours and requires properly calibrated test
          equipment. An inadequate inspection may not satisfy Bradford Council's requirements.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Bradford',
    content: (
      <>
        <p>
          Bradford has a large HMO market driven by the University of Bradford and Bradford College.
          HMO landlords in Bradford face additional obligations over and above the standard 2020
          Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing:</strong> Applies to properties with five or more
                occupants in two or more households. A valid EICR is a mandatory condition of the
                licence. Operating without a licence is a criminal offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter inspection intervals:</strong> Bradford Council HMO licence
                conditions may require EICRs more frequently than the standard five years. Always
                check your specific licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm inspection:</strong> The fire alarm system installed in Bradford
                HMOs forms part of the fixed electrical installation and is within the scope of the
                EICR inspection. Interlinked smoke detectors and heat detectors must be tested as
                part of the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing:</strong> Some areas of Bradford may be subject to
                additional HMO licensing schemes that cover smaller HMOs. Check with Bradford
                Council whether your property falls within an additional licensing area.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Bradford Properties',
    content: (
      <>
        <p>
          Bradford has a significant stock of Victorian and Edwardian terraced housing, as well as
          back-to-back houses that are unique to the Bradford and Leeds area. These property types
          frequently generate EICR findings that landlords should be prepared for.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection:</strong> Older consumer units in Bradford's terraced
                housing stock frequently lack RCD protection on socket circuits. This is one of the
                most common C2 findings and typically requires a consumer unit upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aged wiring systems:</strong> Rubber-insulated wiring from the pre-1960s and
                early PVC wiring that has degraded over decades are common in Bradford's older
                housing stock. Cracked or perished insulation attracts C2 or C1 codes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate main bonding:</strong> Missing or undersized protective bonding
                to gas and water services is frequently found in Bradford properties, particularly
                in older back-to-back houses where the service entry arrangements are unusual.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-standard DIY wiring:</strong> In Bradford's older rental stock,
                unskilled additions by previous occupants or landlords are a recurring finding.
                Non-standard or unsafe additions to circuits attract C1 or C2 observations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Bradford',
    content: (
      <>
        <p>
          Bradford and the wider West Yorkshire area has a large number of qualified electricians.
          When commissioning an EICR, verify the electrician's qualifications and scheme membership
          before booking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify scheme membership:</strong> Search NICEIC, NAPIT, or ELECSA registers
                by postcode for Bradford-based approved contractors. Registration ensures the
                electrician has been assessed for competence and holds the correct qualifications
                and insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check qualifications:</strong> The inspector should hold City and Guilds
                2391 (Inspection and Testing) or equivalent, plus a current 18th Edition BS 7671
                qualification (C&G 2382). Both must be current, as 18th Edition updates have been
                introduced in recent years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get multiple quotes:</strong> Two or three quotes allow you to compare
                pricing and approach. Be cautious of very low quotes — a proper EICR on a Bradford
                terrace takes at least two hours and requires calibrated instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about experience with older properties:</strong> Bradford's housing
                stock is predominantly Victorian and Edwardian. An electrician familiar with the
                wiring systems and construction methods of this era will carry out a more thorough
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
    heading: 'For Electricians: EICR Work in Bradford',
    content: (
      <>
        <p>
          Bradford's large private rented sector, significant HMO market, and stock of older housing
          all generate strong demand for EICR inspections and associated remedial work. Bradford
          electricians who specialise in inspection and testing can build a consistent income stream
          from landlord compliance work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site in Bradford</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full inspection report on your phone while on site. AI board
                  scanning, voice test entry, and instant PDF export mean the landlord receives a
                  professional report before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Consumer Unit Upgrades On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Consumer unit replacements are one of the most common remedial jobs following an
                  EICR in Bradford's older housing stock. Quote immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  while the landlord is already thinking about the 28-day deadline — your conversion
                  rate will be significantly higher.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EICR business in Bradford with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to complete EICRs on site, scan boards with AI, and export instant PDFs. Complete more inspections per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRBradfordPage() {
  return (
    <GuideTemplate
      title="EICR Bradford | Electrical Installation Condition Report Bradford"
      description="EICR requirements for Bradford landlords and homeowners. Legal obligations under the 2020 Regulations, Bradford Council enforcement, costs £150–300, HMO requirements, common findings in Bradford's Victorian housing stock, and finding qualified electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Bradford:{' '}
          <span className="text-yellow-400">Electrical Installation Condition Report</span>
        </>
      }
      heroSubtitle="Everything Bradford landlords and homeowners need to know about EICR — legal requirements under the 2020 Regulations, Bradford Council enforcement, inspection costs, HMO obligations, common findings in Bradford's Victorian housing stock, and finding a qualified electrician."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR in Bradford"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Site — Anywhere in West Yorkshire"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
