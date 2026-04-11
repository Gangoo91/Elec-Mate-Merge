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
  Users,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR for HMO Properties', href: '/eicr-for-hmo' },
];

const tocItems = [
  { id: 'hmo-eicr-law', label: 'Legal Requirement for HMOs' },
  { id: 'licensed-hmo-requirements', label: 'Licensed HMO Requirements' },
  { id: 'what-inspectors-check', label: 'What Inspectors Look For' },
  { id: 'common-c2-codes', label: 'Common C2 Codes in HMOs' },
  { id: 'remediation-costs', label: 'Remediation Costs' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All HMO landlords must obtain an EICR at least every five years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'Mandatory licensed HMOs (five or more occupants, two or more households) must have a valid EICR as a condition of their licence — without it, the licence cannot be issued or renewed.',
  'HMO inspections are more complex than standard rentals because fire detection wiring, emergency lighting, communal area circuits, and multiple consumer units all fall within scope.',
  'Overloaded circuits are among the most common findings in HMOs, as multiple occupants sharing sockets on circuits designed for single-family use exceed the designed load.',
  'C1 observations (danger present) require immediate action; C2 observations (potentially dangerous) must be remedied within 28 days under the 2020 Regulations.',
  'Penalties for HMO electrical non-compliance can reach £30,000 per breach — on top of potential licence revocation and unlimited fines for unlicensed operation.',
];

const faqs = [
  {
    question: 'Do HMOs legally need an EICR?',
    answer:
      "Yes. All HMOs are covered by the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, which require an EICR at least every five years. Mandatory licensed HMOs (five or more occupants, two or more households) also need a valid EICR as a condition of their HMO licence. Some local authorities require EICRs every three years for licensed HMOs — check your specific council's licence conditions.",
  },
  {
    question: 'What does an EICR inspector check in an HMO?',
    answer:
      'In an HMO, the inspector checks all fixed electrical installations including the main consumer unit(s), any sub-distribution boards, all socket-outlet circuits, lighting circuits, cooker circuits, and any circuits serving communal areas. They also inspect and test fire alarm wiring, emergency lighting circuits, and any external circuits. Each circuit is tested for continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation where applicable.',
  },
  {
    question: 'How much does an HMO EICR cost?',
    answer:
      'HMO EICRs cost more than standard rental property EICRs because of their greater complexity. A small three-bedroom HMO typically costs £300 to £500. A larger licensed HMO with six or more bedrooms and multiple consumer units can cost £600 to £1,000 or more. These prices cover the inspection and report only — remedial work identified is quoted and charged separately.',
  },
  {
    question: 'What are the most common EICR failures in HMOs?',
    answer:
      'The most common C2 (potentially dangerous) findings in HMOs are: absence of RCD protection on socket-outlet circuits (required under Regulation 411.3.3 of BS 7671); overloaded circuits where multiple occupants share a single ring circuit; inadequate earthing and bonding, particularly in properties that have had rooms converted; damaged or deteriorated wiring in communal areas; and fire alarm circuits that are not correctly wired or tested.',
  },
  {
    question: 'Can my HMO EICR fail because of the fire alarm?',
    answer:
      'Yes. The fire detection and alarm system is part of the fixed electrical installation in an HMO and falls within the scope of the EICR. If the fire alarm wiring is not installed correctly, is not functioning, or does not meet the requirements for the property (typically a Grade A LD2 or LD3 system), this can result in C1 or C2 observations. In the most serious cases, a C1 observation may lead the inspector to recommend immediate action.',
  },
  {
    question: 'What happens if I operate an HMO without a valid EICR?',
    answer:
      'Operating a licensable HMO without a valid EICR means you are likely operating without a valid licence, which is a criminal offence carrying an unlimited fine. Separately, the Electrical Safety Standards Regulations 2020 allow the local authority to impose a civil penalty of up to £30,000 for failing to have a current EICR. Both penalties can apply simultaneously.',
  },
  {
    question: 'Who can carry out an EICR on an HMO?',
    answer:
      'The inspector must be a qualified and competent person. For HMOs, this means a fully qualified electrician registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA, holding City and Guilds 2391, 2394/2395 (Inspection and Testing), and a current 18th Edition BS 7671 qualification (C&G 2382). Experience with HMO-specific requirements, including fire alarm systems and multiple consumer units, is strongly advisable.',
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
    href: '/eicr-frequency-guide',
    title: 'EICR Frequency Guide',
    description: 'How often EICRs are needed for different property types and tenancies.',
    icon: Clock,
    category: 'Guide',
  },
  {
    href: '/eicr-remediation',
    title: 'EICR Remediation Work',
    description: 'Understanding C1, C2, C3 and FI codes and what remedial work is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/eicr-tenant-rights',
    title: 'Tenant Rights for EICR',
    description: "Tenants' rights to electrical safety records and how to enforce them.",
    icon: ShieldCheck,
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
    id: 'hmo-eicr-law',
    heading: 'Legal Requirement: EICRs for HMO Properties',
    content: (
      <>
        <p>
          Houses in Multiple Occupation (HMOs) are subject to the same fundamental electrical safety
          legislation as all private rented properties: the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020. These regulations require landlords to
          have the electrical installation inspected and tested and to obtain an Electrical
          Installation Condition Report (EICR) at least every five years, or at every change of
          tenancy if sooner.
        </p>
        <p>
          However, HMOs face additional and stricter requirements layered on top of the 2020
          Regulations. For mandatory licensed HMOs — broadly, those with five or more occupants
          forming two or more separate households — a valid, in-date EICR is a condition of the HMO
          licence itself. The local housing authority cannot issue or renew a licence without sight
          of a satisfactory EICR.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Safety Standards Regulations 2020</strong> — all HMO landlords
                must obtain an EICR at least every five years. C1 and C2 observations must be
                remedied within 28 days (or sooner if specified). Copies must be provided to tenants
                within 28 days and to the local authority within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO Licensing Conditions</strong> — a valid EICR is a mandatory licence
                condition for all mandatory licensed HMOs. Many councils also run additional HMO
                licensing schemes covering smaller HMOs, with the same EICR condition attached. Some
                councils require a three-year EICR interval for licensed HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The Housing Health and Safety Rating System (HHSRS)</strong> — local
                authorities can use HHSRS powers to require electrical safety improvements in HMOs
                independent of the EICR regulations. A defective electrical installation is a
                Category 1 hazard under HHSRS.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Scotland, Wales, and Northern Ireland have their own HMO and electrical safety
          legislation. This guide covers England only. Scottish HMO landlords should refer to the
          Housing (Scotland) Act 2006 and associated regulations.
        </p>
      </>
    ),
  },
  {
    id: 'licensed-hmo-requirements',
    heading: 'Additional Requirements for Licensed HMOs',
    content: (
      <>
        <p>
          Mandatory HMO licensing applies to properties occupied by five or more persons forming two
          or more separate households. Additional HMO licensing, operated at the discretion of
          individual councils, can extend these requirements to smaller HMOs. Both types of licence
          carry electrical safety conditions beyond the baseline 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter EICR intervals</strong> — many local authorities specify in their
                licence conditions that HMOs must have an EICR every three years rather than the
                standard five. This is common in London boroughs, Birmingham, Manchester, and Leeds.
                Always read your specific licence conditions carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portable Appliance Testing (PAT)</strong> — many HMO licence conditions also
                require annual PAT testing of all landlord-supplied electrical appliances. PAT
                testing is separate from an EICR (which covers fixed installations only) but is
                often required in the same licence renewal documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection system standards</strong> — licensed HMOs typically require a
                mains-powered, interlinked fire detection system. The grade and category (e.g.,
                Grade A LD2) depends on the property type and risk assessment. Fire alarm wiring is
                part of the fixed electrical installation and is inspected during the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — larger HMOs, particularly those converted from
                commercial buildings or with multiple floors, may be required to have emergency
                lighting in communal corridors and stairwells. Emergency lighting circuits are
                tested as part of the EICR and separately serviced under BS 5266-1.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The HMO licence conditions in your local authority area are the definitive source for what
          is required. If you are unsure, contact your council's private rented sector team or HMO
          licensing team directly.
        </p>
      </>
    ),
  },
  {
    id: 'what-inspectors-check',
    heading: 'What Inspectors Look For in HMO Properties',
    content: (
      <>
        <p>
          An EICR in an HMO is significantly more involved than an inspection of a standard
          single-tenancy property. The inspector must assess the entire fixed electrical
          installation across all units, communal areas, and any outbuildings or external circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer units and distribution boards</strong> — the main consumer unit and
                any sub-boards serving individual rooms or communal areas are inspected and tested.
                The inspector checks that consumer units are correctly rated, that all circuits are
                correctly labelled, that RCD protection is present on appropriate circuits
                (Regulation 411.3.3 of BS 7671), and that the boards are in good physical condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit loading</strong> — inspectors assess whether ring circuits are
                overloaded relative to their design capacity. HMOs with multiple occupants using
                high-power devices (electric heaters, kettles, microwaves) simultaneously can exceed
                the current-carrying capacity of circuits designed for a single family, causing
                overheating and fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection wiring</strong> — fire alarm cables must be correctly
                installed, supported, and protected. The inspector tests that the alarm system
                operates correctly from each detector and call point, and that the system is
                correctly interfaced with the mains supply and any fire-resistant cabling
                requirements are met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — main protective bonding to gas and water
                services, and supplementary bonding in bathrooms and kitchens shared by multiple
                occupants, is checked. Bonding conductors in older HMOs are often undersized or
                missing where rooms have been converted from other uses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal area wiring</strong> — hallways, stairwells, and communal kitchens
                often have wiring that has been subject to repeated modification. Inspectors look
                for amateur additions, non-standard connections, and wiring that does not comply
                with BS 7671.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspection is carried out in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and documented using the Schedule of Inspections and Schedule of Test Results. The
          inspector records all observations using the C1, C2, C3, and FI classification system.
        </p>
      </>
    ),
  },
  {
    id: 'common-c2-codes',
    heading: 'Common C2 Observation Codes in HMO Properties',
    content: (
      <>
        <p>
          A C2 (potentially dangerous) observation makes the EICR Unsatisfactory and triggers the
          28-day remediation requirement. HMOs generate more C2 observations on average than
          standard rental properties, largely because of the higher electrical demand from multiple
          occupants and the greater likelihood of amateur modifications.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket-outlet circuits</strong> — required under
                Regulation 411.3.3 of BS 7671 for socket-outlet circuits rated up to 32A. One of the
                most common C2 observations in older HMOs where the consumer unit has not been
                upgraded. Remedy: replace consumer unit with an RCD-protected board, typically £600
                to £1,200.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded ring circuits</strong> — a ring circuit serving too many socket
                outlets across multiple bedrooms can exceed its designed current rating. Remedy: add
                additional circuits from the consumer unit, separating bedrooms onto their own
                dedicated circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate or missing main protective bonding</strong> — main bonding
                conductors must connect gas and water installation pipework to the main earthing
                terminal. Missing or undersized bonding is a common C2 in HMOs where kitchens and
                bathrooms have been added or modified. Remedy: install correct cross-section bonding
                conductors, typically £150 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged or deteriorated cables</strong> — cables in communal areas subject
                to foot traffic, cables passing through walls without bushings, and cables with
                damaged sheathing are recorded as C2. Cables showing evidence of overheating are
                often upgraded to C1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compliant socket outlets in bathrooms</strong> — standard 13A socket
                outlets in rooms containing a bath or shower are not permitted under BS 7671 (the
                only permitted outlets are shaver supply units to BS EN 61558-2-5). This is commonly
                found in en-suite rooms in converted houses.
              </span>
            </li>
          </ul>
        </div>
        <p>
          C1 observations (danger present) may include live parts accessible without tools, broken
          consumer unit enclosures, exposed cable cores, or fire alarm cables incorrectly run
          through fire compartments. C1 observations require immediate remedial action — the
          inspector may recommend disconnecting the affected circuit on the day of inspection.
        </p>
      </>
    ),
  },
  {
    id: 'remediation-costs',
    heading: 'Typical HMO Remediation Costs',
    content: (
      <>
        <p>
          Remediation costs in HMOs are typically higher than in standard rental properties because
          the work is more extensive and must accommodate occupied rooms. Costs below are indicative
          for 2026 and will vary by location, HMO size, and the complexity of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade (RCD protection)</strong> — £600 to £1,500 for a
                standard property. In a large HMO with multiple sub-boards, full RCD protection
                upgrades can cost £2,000 to £4,000. This is the most common and most costly single
                remediation item.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional circuits</strong> — separating an overloaded ring circuit into
                two or more dedicated circuits costs £300 to £800 per circuit, depending on cable
                run lengths and ease of access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding</strong> — installing or replacing main bonding
                conductors to gas and water typically costs £150 to £400 for a standard property. In
                a large HMO with multiple water supplies and gas meter locations, this can be
                higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm upgrade</strong> — upgrading a Grade D to a Grade A mains-wired
                interlinked fire alarm system in a three-storey HMO typically costs £1,500 to £3,500
                depending on the number of detectors, heat detectors, and call points required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable repairs and replacements</strong> — replacing damaged cable sections
                typically costs £100 to £500 per repair. Full rewires of individual rooms or
                communal areas cost more — budget £800 to £2,000 per room depending on size.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrician who carries out the EICR is well placed to quote for remedial work
          immediately after completing the inspection. Getting a quote on the day reduces delays and
          helps the landlord meet the 28-day deadline under the 2020 Regulations.
        </p>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for HMO Electrical Non-Compliance',
    content: (
      <>
        <p>
          HMO landlords who fail to comply with electrical safety requirements face penalties from
          two separate legislative frameworks, and in serious cases from both simultaneously.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalty up to £30,000</strong> — under the Electrical Safety Standards
                Regulations 2020, failing to obtain an EICR, failing to complete remedial work, or
                failing to provide copies to tenants are each separate breaches attracting a civil
                penalty of up to £30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence revocation</strong> — operating an HMO without a valid EICR
                breaches licence conditions. The local authority can revoke the licence, require the
                HMO to cease operation, and issue a civil penalty of up to £30,000 for the licence
                breach separately from the electrical safety penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlimited fine for unlicensed operation</strong> — operating a licensable
                HMO without a licence is a criminal offence under the Housing Act 2004. On
                conviction, courts can impose an unlimited fine. Local authorities can also apply
                for a Rent Repayment Order recovering up to 12 months' rent from the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 invalidity</strong> — landlords who have not provided tenants
                with a copy of the current EICR cannot serve a valid Section 21 notice (no-fault
                eviction). This applies to HMOs as to all other assured shorthold tenancies.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The combined maximum financial exposure from a single HMO with multiple breaches can
          exceed £90,000. The cost of an EICR every three to five years — typically £400 to £800 for
          a licensed HMO — is negligible by comparison.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: HMO EICR Work',
    content: (
      <>
        <p>
          HMO EICRs are some of the most lucrative and technically interesting inspection work
          available. They pay more than standard rental EICRs, often include follow-on remediation
          contracts, and reward electricians with strong organisational skills and detailed
          knowledge of BS 7671 and fire safety requirements.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete HMO EICRs on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to build the schedule of inspections and test results on your phone as you work
                  through each circuit. AI board scanning reads the consumer unit label at the
                  start, and voice test entry means you never have to stop and type. Landlords get
                  the PDF before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build an HMO Client Base</h4>
                <p className="text-white text-sm leading-relaxed">
                  HMO landlords need reliable electricians who understand their compliance
                  obligations. An electrician who can handle the EICR, quote for remedials
                  immediately, and provide documentation suitable for the licensing authority
                  becomes invaluable to an HMO portfolio landlord. Use Elec-Mate to manage recurring
                  inspection schedules and reminders automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete HMO EICRs faster with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion. AI board scanning, voice test entry, and instant PDF export. Complete complex HMO EICRs without evening paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRForHMOPage() {
  return (
    <GuideTemplate
      title="EICR for HMO Properties UK | Houses in Multiple Occupation Electrical"
      description="Mandatory EICR requirements for HMO properties explained. Licensed HMO conditions, what inspectors check, common C2 codes, remediation costs, and penalties of up to £30,000 for non-compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="HMO Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          EICR for HMO Properties: <span className="text-yellow-400">What Landlords Must Know</span>
        </>
      }
      heroSubtitle="HMO landlords face stricter electrical safety requirements than standard landlords. This guide covers the mandatory EICR obligation, licensed HMO licence conditions, what inspectors look for, the most common C2 observation codes, typical remediation costs, and the penalties for getting it wrong."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: EICR for HMO Properties"
      relatedPages={relatedPages}
      ctaHeading="Complete HMO EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
