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
  { label: 'EICR Glasgow', href: '/guides/eicr-glasgow' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'glasgow-costs', label: 'EICR Cost in Glasgow' },
  { id: 'scotland-law', label: 'Scottish Legal Requirements' },
  { id: 'england-vs-scotland', label: 'England vs Scotland Differences' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'tenement-challenges', label: 'Glasgow Tenement Challenges' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented per BS 7671:2018+A3:2024 (Section 631). It assesses the installation as Satisfactory or Unsatisfactory using observation codes C1, C2, C3, and FI.",
  'Glasgow EICR costs are competitive. Expect £110 to £190 for a two-bedroom flat, £160 to £260 for a three-bedroom house, and £220 to £360 for larger properties.',
  "Scotland has DIFFERENT legislation from England. The Housing (Scotland) Act 2006 and the Repairing Standard require landlords to ensure electrical installations are safe and have a valid EICR. The regulations have been in effect longer than England's 2020 regulations.",
  'Glasgow has a very high proportion of tenement flats — stone-built multi-storey buildings typically from the Victorian and Edwardian periods. These present unique EICR challenges including shared close (stairwell) supplies, aged wiring in thick stone walls, and common earthing issues.',
  'SP Energy Networks (SPEN, part of ScottishPower) is the DNO for the Glasgow area. Older tenement properties frequently have supply-side issues including deteriorated service cut-outs, aged service cables, and earthing deficiencies at the supply point.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Glasgow?',
    answer:
      'Glasgow EICR prices are competitive. A one-bedroom flat costs £90 to £150. A two-bedroom flat costs £110 to £190. A three-bedroom house costs £160 to £260. Larger properties cost £220 to £360+. HMOs with multiple consumer units cost £280 to £500+. Tenement flats in the city centre may cost slightly more due to parking and access constraints.',
  },
  {
    question: 'Is an EICR legally required for landlords in Scotland?',
    answer:
      "Yes. Under the Housing (Scotland) Act 2006 and the Repairing Standard, private landlords must ensure the electrical installation is in a reasonable state of repair and in proper working order. An EICR is the accepted method of demonstrating compliance. The Scottish Government guidance recommends an EICR at least every five years. Landlords must provide a copy to tenants. Scotland's requirements have been in effect since before England introduced its 2020 regulations.",
  },
  {
    question: 'How is Scottish EICR law different from England?',
    answer:
      'In England, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 are a specific statutory instrument with defined penalties (up to £30,000 per breach). In Scotland, the requirement comes from the Housing (Scotland) Act 2006 Repairing Standard, which is broader — it covers all aspects of property condition, not just electrical. Scottish tenants can apply to the First-tier Tribunal for Scotland (Housing and Property Chamber) if the landlord fails to maintain the electrical installation. The Tribunal can order the landlord to carry out work. The practical requirement is the same: a valid EICR every five years.',
  },
  {
    question: 'What happens if my Glasgow property fails an EICR?',
    answer:
      'If the EICR is Unsatisfactory (C1 or C2 observations), the landlord must arrange remedial work promptly. Under the Repairing Standard, the installation must be maintained in a reasonable state of repair. Tenants can apply to the First-tier Tribunal if the landlord fails to act. The Tribunal can issue a Repairing Standard Enforcement Order requiring the landlord to carry out the work within a specified timeframe. Failure to comply with a Tribunal order can result in further enforcement action.',
  },
  {
    question: 'What is a Glasgow tenement and why does it affect EICRs?',
    answer:
      'A tenement is a stone-built multi-storey residential building, typically three to five storeys, containing multiple flats arranged around a common stairwell (close). Glasgow has thousands of tenements, mostly built between 1850 and 1920. For EICRs, tenements present challenges: thick stone walls make cable tracing difficult, original lead-sheathed wiring may still be present, the close (common stairwell) may have a separate supply requiring a separate EICR, earthing arrangements are often complex or deficient, and access to meter cupboards in common areas requires coordination with factors (property managers) or other residents.',
  },
  {
    question: 'Who is the electricity supplier for Glasgow?',
    answer:
      'SP Energy Networks (SPEN), part of the ScottishPower group, is the Distribution Network Operator (DNO) for the Glasgow area. They maintain the electricity network including cables, substations, and service connections. If the EICR inspector identifies supply-side issues (deteriorated cut-out, damaged service cable, earth provision problems), these must be reported to SPEN. The inspector cannot work on DNO equipment. SPEN responds to faults via their 105 power cut number.',
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
          devices, earthing, bonding, sockets, switches, and all fixed electrical equipment.
        </p>
        <p>
          The report is documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which specifies that an EICR must be used for periodic inspection of
          existing installations. The inspector carries out a visual inspection and programme of
          testing, classifying each observation using codes (C1, C2, C3, FI). The overall
          installation is assessed as Satisfactory or Unsatisfactory.
        </p>
        <p>
          BS 7671 applies across the whole of the UK, including Scotland. The technical requirements
          for the EICR itself are identical whether the property is in Glasgow, London, or anywhere
          else in the UK. What differs is the legislation that makes EICRs a legal requirement for
          landlords — Scotland has its own legislation, separate from the English regulations.
        </p>
      </>
    ),
  },
  {
    id: 'glasgow-costs',
    heading: 'EICR Cost in Glasgow (2026 Prices)',
    content: (
      <>
        <p>
          Glasgow EICR prices are competitive and generally lower than London and the South East.
          Below are typical 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £90 to £150. Very common in Glasgow
                tenement buildings. Quick to inspect with 3 to 5 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £110 to £190. The most common property type in
                Glasgow. Victorian tenement flats may take longer than modern-build flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £160 to £260. Semi-detached and terraced
                houses in suburbs like Shawlands, Cathcart, and Bearsden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ detached house</strong> — £220 to £360+. Larger properties in
                the suburbs with multiple circuits and potentially multiple consumer units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £280 to £500+. HMO licensing in Scotland is mandatory for
                properties with three or more unrelated occupants (a lower threshold than England).
                Multiple consumer units, fire alarms, and emergency lighting increase the scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include the inspection, testing, and report. Remedial work is quoted separately.
          Tenement flat EICRs are sometimes priced lower per unit when a factor (property manager)
          books multiple flats in the same close for inspection on the same day.
        </p>
      </>
    ),
  },
  {
    id: 'scotland-law',
    heading: 'Scottish Legal Requirements for EICRs',
    content: (
      <>
        <p>
          Scotland has its own legislation governing electrical safety in rented properties,
          separate from the English regulations. The key Scottish legislation is:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing (Scotland) Act 2006 — Repairing Standard</strong> — this is the
                primary legislation. It requires private landlords to ensure that the property meets
                the Repairing Standard, which includes keeping the electrical installation in a
                reasonable state of repair and in proper working order. An EICR is the accepted
                method of demonstrating compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR every five years</strong> — Scottish Government guidance recommends
                that landlords obtain an EICR at least every five years. While the five-year
                interval is guidance rather than a rigid statutory deadline (unlike England's 2020
                Regulations), it is the accepted standard and is used by the Tribunal as a
                benchmark.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant redress</strong> — if a landlord fails to maintain the electrical
                installation, tenants can apply to the First-tier Tribunal for Scotland (Housing and
                Property Chamber). The Tribunal can issue a Repairing Standard Enforcement Order
                requiring the landlord to carry out remedial work within a specified timeframe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration</strong> — all private landlords in Scotland must be
                registered with the local authority. Glasgow City Council maintains its own landlord
                register. Failure to register is a criminal offence. Holding a valid EICR supports
                the landlord registration process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing (Scotland)</strong> — in Scotland, HMO licensing applies to
                properties with three or more unrelated occupants sharing facilities. This is a
                lower threshold than England (five occupants). A valid EICR is a mandatory condition
                of an HMO licence in Scotland.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Scottish landlords should note that the Repairing Standard is broader than electrical
          safety alone — it covers the structure, water supply, heating, and general condition of
          the property. However, electrical safety is a significant component and a valid EICR is
          the clearest way to demonstrate compliance with the electrical element.
        </p>
      </>
    ),
  },
  {
    id: 'england-vs-scotland',
    heading: 'England vs Scotland: Key Differences',
    content: (
      <>
        <p>
          While the technical EICR process is identical across the UK (BS 7671 applies everywhere),
          the legal framework differs significantly between England and Scotland:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legislation</strong> — England uses the Electrical Safety Standards in the
                Private Rented Sector (England) Regulations 2020. Scotland uses the Housing
                (Scotland) Act 2006 Repairing Standard. Wales has its own Renting Homes (Wales) Act
                2016.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement mechanism</strong> — in England, local authorities (such as
                London boroughs) enforce directly with civil penalties up to £30,000. In Scotland,
                tenants apply to the First-tier Tribunal, which can issue Repairing Standard
                Enforcement Orders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO threshold</strong> — England requires HMO licensing for five or more
                occupants forming two or more households. Scotland requires it for three or more
                unrelated occupants. Glasgow landlords must be aware of this lower threshold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration</strong> — Scotland requires all private landlords to
                register (Landlord Registration Scotland). England does not have an equivalent
                universal registration scheme (though selective licensing areas exist).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical outcome</strong> — the practical requirement is the same: a valid
                EICR every five years, carried out by a qualified and competent person. The
                technical standard (BS 7671) and the observation codes (C1, C2, C3, FI) are
                identical across all UK nations.
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
          Each defect is classified using one of four codes defined in the model forms accompanying{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">BS 7671</SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate action required. In Glasgow tenements, common C1
              findings include exposed live conductors in common close cupboards, severely degraded
              cable insulation, and dangerous DIY wiring in bathroom spaces.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent action needed. Common C2 findings include lack of RCD
              protection on socket circuits, absent or defective main bonding, and obsolete
              rewirable fuse boards without appropriate protection.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not dangerous but improvement would enhance safety. Does not make the EICR
              Unsatisfactory. Examples: older but functional accessories, absence of supplementary
              bonding where not required by current regulations.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              Cannot fully assess. Very common in Glasgow tenements where wiring is concealed in
              thick stone walls, under floorboards, or in common close areas that the inspector does
              not have authority to open.
            </p>
          </div>
        </div>
        <p>
          The EICR is <strong>Unsatisfactory</strong> if any C1 or C2 observations are present.
        </p>
      </>
    ),
  },
  {
    id: 'tenement-challenges',
    heading: 'Glasgow Tenement EICR Challenges',
    content: (
      <>
        <p>
          Glasgow's housing stock is dominated by tenement buildings — stone-built multi-storey
          residential blocks, typically three to five storeys, containing multiple flats arranged
          around a common stairwell (known as a close). These present specific challenges for EICR
          inspectors:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thick stone walls</strong> — tenement walls are solid stone, typically 450mm
                to 600mm thick. Cables are chased into the stone or run in surface-mounted conduit.
                Tracing concealed cables through stone walls is extremely difficult without
                specialist detection equipment, and even then results can be unreliable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common close supplies</strong> — the common stairwell (close) lighting and
                door entry system typically have their own electrical supply, separate from the
                individual flats. This common supply may need its own EICR. Responsibility for the
                common close supply usually lies with the factor (property manager) or the owners
                collectively.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing deficiencies</strong> — older tenement flats may have inadequate
                earthing. The original installation may have relied on gas or water pipes for earth,
                which is no longer acceptable. Some flats have TT earthing arrangements with earth
                rods that may not have been tested in decades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPEN supply issues</strong> — SP Energy Networks (SPEN, part of
                ScottishPower) is the DNO for Glasgow. Older tenement properties frequently have
                deteriorated service cut-outs (often located in shared meter cupboards within the
                close), aged service cables, and earthing provision that needs updating. Supply-side
                issues must be reported to SPEN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter cupboard access</strong> — in tenements, electricity meters are
                typically in a shared cupboard within the close. The inspector needs access to this
                cupboard to verify the earthing arrangement and test Ze. Coordinating access may
                require contacting the factor or other residents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixed-vintage wiring</strong> — many Glasgow tenements have been rewired at
                least once, but partial rewires are common. The inspector may find a modern consumer
                unit feeding circuits with original 1950s or 1960s cables in some rooms and modern
                cables in others. Each circuit must be assessed individually.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians quoting EICRs for Glasgow tenement flats should allow 2.5 to 3.5 hours for a
          two-bedroom flat (compared to 1.5 to 2.5 hours for a modern flat of the same size). The
          stone walls, access issues, and likelihood of FI observations all add time.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During an EICR',
    content: (
      <>
        <p>
          The EICR involves a visual inspection and electrical testing. The inspector needs access
          to every room, the consumer unit, meter position (which may be in the common close), and
          any storage spaces. The power will be off for 30 to 60 minutes during dead testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — consumer unit, protective devices, cable
                condition, sockets, lights, switches, earthing and bonding connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — continuity of protective conductors, ring final
                circuit continuity, insulation resistance (500V DC, minimum 1 megohm).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — earth fault loop impedance (Ze, Zs), prospective
                fault current, RCD operation times, polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report</strong> — EICR with Schedules of Circuit Details and Test Results
                per Section 631, observations with codes, overall assessment, and recommended next
                inspection date.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For tenement flats in Glasgow, ensure access to the common close meter cupboard is
          arranged in advance. If the factor manages the building, contact them to arrange access.
          If the cupboard is locked, the inspector cannot verify the earthing arrangement and may
          need to record an FI or limitation on the report.
        </p>
      </>
    ),
  },
  {
    id: 'how-often',
    heading: 'How Often Is an EICR Needed?',
    content: (
      <>
        <p>
          BS 7671 Section 6 requires periodic inspection at intervals suited to the property type.
          The Scottish Government recommends:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented (Scotland)</strong> — at least every 5 years. This is the
                accepted standard under the Repairing Standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied</strong> — every 10 years recommended, or 5 years for older
                tenement properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial</strong> — every 5 years (3 years for higher-risk).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — recommended whenever a property changes tenant.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Older tenement properties with multiple FI observations or known wiring issues may receive
          a recommended next inspection of 3 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Glasgow',
    content: (
      <>
        <p>
          The EICR must be carried out by a qualified and competent person. In Scotland, the same
          competent person schemes apply as in the rest of the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, SELECT (Scotland's trade
                association for the electrical industry), and ELECSA all maintain registers of
                qualified electricians. SELECT is particularly prominent in Scotland and many
                Glasgow-based electricians are SELECT-registered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — C&G 2391 (Inspection and Testing) or C&G
                2394/2395, plus current BS 7671 (C&G 2382). Scottish Vocational Qualifications
                (SVQs) in electrical installation are the Scottish equivalent of NVQs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenement experience</strong> — for Glasgow properties, an inspector
                experienced with tenement buildings, common close supplies, and SPEN supply
                arrangements will produce more accurate and efficient reports.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SELECT (the Scottish electrical trade body) is a good starting point for finding qualified
          Glasgow-based inspectors. Their website has a searchable directory of member contractors.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Glasgow',
    content: (
      <>
        <p>
          Glasgow has a massive private rented sector and thousands of tenement flats requiring
          regular EICRs. The combination of landlord registration requirements, HMO licensing (with
          Scotland's lower three-occupant threshold), and the Repairing Standard creates consistent
          demand for qualified inspectors.
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
                  to complete reports on your phone while on site. AI board scanning, voice test
                  entry, and instant PDF export. Finish the report before you leave the flat —
                  especially useful in tenements where return visits mean coordinating close access
                  again.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, quote the remedial work immediately with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . The landlord (or factor) needs a quote quickly to meet their Repairing Standard
                  obligations. The electrician who delivers the quote first wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRGlasgowPage() {
  return (
    <GuideTemplate
      title="EICR Glasgow | Electrical Safety Certificate 2026"
      description="EICR costs in Glasgow for 2026. Scottish landlord requirements (Housing Scotland Act), tenement flat challenges, observation codes, SPEN supply issues, and finding a qualified inspector. Prices from £90 for a flat to £360+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Glasgow: <span className="text-yellow-400">Electrical Safety Certificate 2026</span>
        </>
      }
      heroSubtitle="Complete guide to EICRs in Glasgow — costs, Scottish landlord requirements (different from England), tenement flat challenges, observation codes, and finding a qualified inspector."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
