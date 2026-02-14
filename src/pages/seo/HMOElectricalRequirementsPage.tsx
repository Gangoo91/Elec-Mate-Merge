import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building2,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Home,
  Search,
  Flame,
  Lightbulb,
  Zap,
  Send,
  Receipt,
  Clock,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'HMO Requirements', href: '/guides/hmo-electrical-requirements' },
];

const tocItems = [
  { id: 'what-is-hmo', label: 'What Is an HMO?' },
  { id: 'hmo-licensing', label: 'HMO Licensing Requirements' },
  { id: 'eicr-requirements', label: 'EICR Requirements for HMOs' },
  { id: 'fire-alarm-requirements', label: 'Fire Alarm Requirements (BS 5839-6)' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Requirements' },
  { id: 'rcd-and-afdd-protection', label: 'RCD and AFDD Protection' },
  { id: 'common-hmo-defects', label: 'Common HMO Electrical Defects' },
  { id: 'landlord-responsibilities', label: 'Landlord Responsibilities' },
  { id: 'local-authority-enforcement', label: 'Local Authority Enforcement and Penalties' },
  { id: 'best-practice-electricians', label: 'Best Practice for Electricians Servicing HMOs' },
  { id: 'elec-mate-for-hmos', label: 'Elec-Mate for HMO Electrical Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'HMOs (Houses in Multiple Occupation) have stricter electrical requirements than standard rented properties — a valid EICR every 5 years is mandatory, plus fire alarm and emergency lighting systems that must comply with specific British Standards.',
  'Fire alarm systems in HMOs must comply with BS 5839-6, with the required grade and category depending on the HMO size and risk level — from Grade D Category LD3 for small HMOs to Grade A systems for larger or higher-risk properties.',
  'Emergency lighting is required in all HMOs with common escape routes, complying with BS 5266 — this includes corridors, stairways, and any area that forms part of the escape route from the building.',
  'RCD protection is required on all socket circuits in HMOs, and AFDDs (Arc Fault Detection Devices) are increasingly recommended by local authorities as an additional fire safety measure, particularly in older converted properties.',
  'Elec-Mate covers all HMO certification needs — EICR, fire alarm certificate (BS 5839), and emergency lighting certificate (BS 5266). All in one app. Track multiple properties and send certificates to the landlord.',
];

const faqs = [
  {
    question: 'What makes a property an HMO?',
    answer:
      'A House in Multiple Occupation (HMO) is a property rented out by at least 3 people who are not from a single household (for example, not a family), forming 2 or more separate households, and sharing basic amenities such as a bathroom, toilet, or kitchen. The definition comes from the Housing Act 2004. A "household" is typically a single person, a couple, or a family living together. So a house rented to 3 unrelated individuals, each with their own tenancy agreement, sharing a kitchen and bathroom, is an HMO. A house rented to a single family is not an HMO, regardless of size. Under mandatory licensing (which applies in England), an HMO must be licensed if it is occupied by 5 or more people forming 2 or more separate households. Below this threshold, the property may still be classed as an HMO (for regulatory purposes, including electrical safety requirements) but may not require a mandatory licence. However, many local authorities operate additional licensing schemes that cover smaller HMOs — check with your local authority to see if additional licensing applies in your area.',
  },
  {
    question: 'How often does an HMO need an EICR?',
    answer:
      'An EICR for an HMO must be renewed at least every 5 years. This requirement comes from two overlapping sets of regulations. First, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require a valid EICR for all privately rented properties, including HMOs. Second, HMO licensing conditions (whether mandatory, additional, or selective) typically include a specific requirement for a current EICR as a condition of the licence. The inspector may recommend a shorter interval based on the condition of the installation — for example, 3 years for an older HMO with ageing wiring or a history of electrical issues. The landlord must follow the shorter recommendation. When an HMO licence is being applied for or renewed, the local authority will require a copy of the current EICR as part of the application. An expired or unsatisfactory EICR can be grounds for refusing or revoking an HMO licence.',
  },
  {
    question: 'What grade of fire alarm does an HMO need?',
    answer:
      'The required fire alarm grade depends on the size and risk level of the HMO, as assessed by the local authority. BS 5839-6 provides the framework, and local authority licensing conditions specify the required grade. For small HMOs (up to 2 storeys, low risk), a Grade D Category LD3 system is typically sufficient — this means mains-powered interconnected smoke alarms with battery backup, fitted in escape routes (hallways and landings). For larger HMOs (3 or more storeys, or properties with more complex layouts), a Grade D Category LD2 system is typically required — this extends the coverage to include high-risk rooms (kitchens, living rooms where doors open onto escape routes) as well as escape routes. For the largest or highest-risk HMOs, a Grade A system may be required — this is a full fire alarm system with a dedicated control panel, manual call points, automatic detectors throughout, and sounders providing a minimum sound level in all areas. The local authority fire safety officer or licensing officer will specify the required grade as part of the licensing conditions. Always check the specific requirements for the authority area where the HMO is located, as requirements vary between councils.',
  },
  {
    question: 'Does an HMO need emergency lighting?',
    answer:
      'Yes, emergency lighting is required in all HMOs where there are common escape routes — corridors, stairways, hallways, and any shared area that forms part of the means of escape. The emergency lighting must comply with BS 5266 and must operate automatically when the normal lighting fails (typically through a power cut or circuit fault). The system must provide sufficient illumination on the escape route for occupants to find their way to a place of safety. For smaller HMOs, self-contained maintained or non-maintained emergency luminaires are usually sufficient. For larger HMOs, a central battery system may be more appropriate. The emergency lighting must be tested regularly — a monthly 30-second function test and an annual 3-hour full-duration test are the standard requirements under BS 5266. Records of all tests must be maintained and are typically required as part of the HMO licensing conditions. The landlord is responsible for arranging the testing and maintaining the records, though many landlords delegate this to their electrician through a maintenance contract.',
  },
  {
    question: 'Are AFDDs required in HMOs?',
    answer:
      'AFDDs (Arc Fault Detection Devices) are not currently mandatory for all HMO installations, but the position is evolving. BS 7671:2018+A2:2022 introduced Regulation 421.1.7, which recommends (but does not require) AFDDs for certain situations — particularly in premises where occupants are at higher risk (including HMOs, care homes, and sheltered accommodation) and in buildings with combustible construction. Amendment 3 (A3:2024) did not make AFDDs mandatory but reinforced the recommendation. Some local authorities are now including AFDDs as a condition of HMO licences, particularly for larger HMOs and those in older converted buildings where the fire risk is higher. Others recommend them but do not mandate them. If you are installing a new consumer unit in an HMO, fitting AFDDs is a prudent precaution — the additional cost is modest (approximately £50 to £80 per AFDD), and they provide genuine additional protection against electrical fires caused by arc faults in ageing wiring. When advising HMO landlords, recommend AFDDs even if the local authority does not currently mandate them — the direction of travel is clearly towards wider adoption.',
  },
  {
    question: 'What are the penalties for HMO electrical non-compliance?',
    answer:
      'The penalties for failing to maintain electrical safety in an HMO are severe and come from multiple enforcement routes. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, civil penalties of up to £30,000 per breach can be issued for failing to obtain an EICR or failing to carry out remedial work. Under the Housing Act 2004, operating an HMO without a licence (or breaching licence conditions, including electrical safety conditions) is a criminal offence punishable by an unlimited fine. The local authority can also issue civil penalties as an alternative to prosecution — up to £30,000 per offence. If the HMO is found to have serious electrical hazards, the local authority can take action under the Housing Health and Safety Rating System (HHSRS), including issuing improvement notices, prohibition orders (preventing occupation until the hazards are remedied), or emergency prohibition orders for imminent risks. In the most serious cases — where electrical defects cause injury or death — the landlord could face prosecution under the Health and Safety at Work Act 1974 or the Corporate Manslaughter and Corporate Homicide Act 2007. The maximum penalty for a health and safety offence committed by an individual is 2 years imprisonment and an unlimited fine.',
  },
  {
    question: 'Can I use the same EICR form for HMOs as for normal domestic properties?',
    answer:
      'Yes, the EICR form is the same — it follows the model forms in Appendix 6 of BS 7671, regardless of whether the property is a standard domestic dwelling or an HMO. However, the inspection of an HMO is typically more complex and takes longer than a standard domestic property. HMOs often have multiple distribution boards (sometimes one per floor or one per letting room), shared circuits serving common areas, separate metering for individual rooms, fire alarm systems that need separate testing and certification (BS 5839-6), emergency lighting that needs separate testing and certification (BS 5266), and more circuits overall. The EICR should cover the entire fixed electrical installation in the HMO — including common areas, individual letting rooms (as far as accessible), and any landlord-supplied equipment. If parts of the installation cannot be accessed (for example, because a tenant is not available), this should be recorded as a limitation on the EICR. For large HMOs with multiple distribution boards, a digital EICR tool like Elec-Mate is particularly valuable — it handles unlimited circuits and multiple boards, whereas paper forms become unwieldy very quickly.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements — 2020 Regulations, penalties, deadlines, and compliance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-fail-rented-property',
    title: 'EICR Fail on Rented Property',
    description:
      'What happens when an EICR fails — landlord obligations, 28-day deadline, and remedial work requirements.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'BS 5839 compliance, system grades and categories, and digital fire alarm certification.',
    icon: Flame,
    category: 'Certificate',
  },
  {
    href: '/guides/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description:
      'BS 5266 requirements, testing schedules, and emergency lighting certification on your phone.',
    icon: Lightbulb,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI codes explained with real examples from HMO and domestic inspections.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-guide',
    title: 'Consumer Unit Change Guide',
    description:
      'Consumer unit replacement with RCBOs, AFDDs, and SPDs — the most common HMO electrical upgrade.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-hmo',
    heading: 'What Is an HMO?',
    content: (
      <>
        <p>
          A House in Multiple Occupation (HMO) is a property rented out by at least 3 people who are
          not from a single household, forming 2 or more separate households, and sharing basic
          amenities such as a bathroom, toilet, or kitchen. The definition is set out in the Housing
          Act 2004 and applies across England and Wales.
        </p>
        <p>
          Common examples of HMOs include shared houses (3 or more unrelated tenants sharing a
          kitchen and bathroom), bedsits (individual rooms rented out with shared facilities),
          converted buildings (large houses subdivided into self-contained or non-self-contained
          units), and purpose-built HMOs (buildings designed from the start to house multiple
          separate households).
        </p>
        <p>
          HMOs present unique electrical safety challenges. They typically have higher occupancy
          than standard domestic dwellings, more diverse usage patterns, shared circuits serving
          common areas, and fire safety systems that standard houses do not require. The electrical
          installation in an HMO must be maintained to a higher standard than an ordinary rented
          property, with additional requirements for fire alarm systems, emergency lighting, and
          protective devices.
        </p>
        <p>
          For electricians, HMOs represent a significant and growing market. The UK HMO sector
          continues to expand, driven by housing demand and the growth of the private rented sector.
          Each HMO requires a valid EICR, fire alarm certification, emergency lighting
          certification, and ongoing maintenance — creating recurring work for electricians who
          build relationships with HMO landlords and managing agents.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-licensing',
    heading: 'HMO Licensing Requirements',
    content: (
      <>
        <p>
          HMO licensing operates at three levels in England, each with implications for electrical
          safety requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory licensing</strong> — applies to HMOs occupied by 5 or more people
                from 2 or more separate households, regardless of the number of storeys. Since the
                Licensing of Houses in Multiple Occupation (Mandatory Conditions of Licences)
                (England) Regulations 2018, this applies nationwide. The licence conditions include
                electrical safety requirements: a current EICR, appropriate fire alarm system, and
                adequate means of escape.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — local authorities can designate specific
                areas where all HMOs (or certain types of HMOs that fall below the mandatory
                threshold) require a licence. This captures smaller HMOs — for example, a 3-person
                shared house in a designated area. Licence conditions typically mirror mandatory
                licensing conditions, including electrical safety requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — local authorities can designate areas where
                all privately rented properties (not just HMOs) require a licence. While selective
                licensing focuses on general property management standards, the licence conditions
                typically include a requirement for a current EICR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regardless of whether an HMO is licensed, the property must comply with the Electrical
          Safety Standards in the Private Rented Sector (England) Regulations 2020, which require a
          valid EICR for all privately rented properties. Licensing adds additional conditions —
          particularly around fire alarm systems and emergency lighting — that go beyond the basic
          EICR requirement.
        </p>
        <p>
          When applying for or renewing an HMO licence, the local authority will require evidence of
          electrical compliance — typically a copy of the current EICR, fire alarm certificate, and
          emergency lighting certificate. An expired EICR or missing fire safety certificates can be
          grounds for refusing a licence or attaching additional conditions.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-requirements',
    heading: 'EICR Requirements for HMOs',
    content: (
      <>
        <p>
          A valid EICR is mandatory for all HMOs under both the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020 and HMO licensing conditions. The
          requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency:</strong> at least every 5 years, or sooner if
                recommended by the inspector. Some local authorities specify a shorter interval for
                certain types of HMO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope:</strong> the EICR must cover the entire fixed electrical installation
                — landlord supplies, common areas, individual letting rooms (as far as accessible),
                and any external installations. Where tenants have their own metered supplies, these
                are typically excluded from the landlord's EICR but should have their own
                arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person:</strong> the EICR must be carried out by a qualified and
                competent electrician, ideally registered with a competent person scheme (NICEIC,
                NAPIT, or ELECSA) and holding the C&G 2391 inspection and testing qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work:</strong> if the EICR is Unsatisfactory (any{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  C1 or C2 observation codes
                </SEOInternalLink>
                ), the landlord must arrange remedial work within 28 days. For licensed HMOs, the
                local authority may impose additional conditions or shorter deadlines.
              </span>
            </li>
          </ul>
        </div>
        <p>
          HMO EICRs are typically more complex than standard domestic EICRs. HMOs often have
          multiple consumer units or distribution boards (sometimes one per floor or per letting
          room), shared circuits for common area lighting and power, older wiring from conversions
          that may not meet current standards, and a higher total number of circuits. The inspection
          may take longer and cost more than a standard domestic EICR — this should be reflected in
          the pricing.
        </p>
        <SEOAppBridge
          title="Multi-board EICR for HMOs"
          description="Elec-Mate handles HMO EICRs with multiple distribution boards and unlimited circuits. AI board scanner works on every board in the building. Complete the full EICR on your phone and send it to the landlord from site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'fire-alarm-requirements',
    heading: 'Fire Alarm Requirements for HMOs (BS 5839-6)',
    content: (
      <>
        <p>
          Fire alarm systems in HMOs must comply with{' '}
          <SEOInternalLink href="/guides/fire-alarm-certificate">BS 5839-6</SEOInternalLink> (Fire
          detection and fire alarm systems for dwellings — code of practice for the design,
          installation, commissioning, and maintenance of systems in dwellings). The required grade
          and category depend on the HMO size, layout, and risk level.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D, Category LD3</strong> — the minimum standard for small, low-risk
                HMOs (typically up to 2 storeys, up to 4 occupants). Mains-powered interlinked smoke
                alarms with integral battery backup, fitted in the escape routes (hallways,
                landings, and stairways). A heat detector in the kitchen is also typically required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D, Category LD2</strong> — the standard requirement for most HMOs.
                Extends coverage beyond escape routes to include high-risk rooms — kitchens (heat
                detector), living rooms (smoke detector), and any room where a fire could start and
                develop undetected. Required for HMOs with 3 or more storeys or where the local
                authority fire risk assessment identifies higher risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D, Category LD1</strong> — full coverage. Smoke detectors in all rooms
                (except kitchens and bathrooms, where heat detectors are used) plus escape routes.
                Sometimes required for larger or higher-risk HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade A</strong> — a full fire alarm system with a dedicated fire alarm
                control panel, manual call points at each floor level, automatic detectors
                throughout, sounders providing a minimum sound level in all areas, and
                fire-resistant cabling (to BS 7629 or BS 8434). Required for the largest HMOs
                (typically 4+ storeys or 20+ occupants) and those with complex layouts where the
                local authority determines a Grade D system is insufficient.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The local authority licensing officer or fire safety officer will specify the required
          grade as part of the HMO licence conditions. Always check the specific requirements for
          the local authority area — requirements vary between councils, and some are more
          prescriptive than others. If in doubt, install to a higher grade than the minimum — it
          provides better protection for the occupants and reduces the risk of the local authority
          requiring an upgrade later.
        </p>
        <p>
          The fire alarm system must be tested regularly and a fire alarm certificate issued on
          completion of the installation and after each annual service. The certificate should
          confirm compliance with BS 5839-6 and state the grade and category of the system.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Requirements for HMOs',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/emergency-lighting-certificate">
            Emergency lighting
          </SEOInternalLink>{' '}
          is required in all HMOs where there are common escape routes. The system must comply with
          BS 5266 and provide sufficient illumination for occupants to safely evacuate the building
          when the normal lighting fails.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where required:</strong> all common escape routes — corridors, stairways,
                hallways, and landings. Also required at changes of direction, changes of floor
                level, intersections of corridors, near fire alarm call points, near fire-fighting
                equipment, at final exits, and near any other safety equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Illumination levels:</strong> a minimum of 1 lux at floor level along the
                centre line of the escape route, with a minimum of 0.5 lux across the full width.
                Higher levels (5 lux) are required in high-risk areas such as plant rooms and
                generator rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration:</strong> the emergency lighting must maintain illumination for at
                least 3 hours (1 hour for some specific applications). Self-contained luminaires
                with integral batteries are the most common type in HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing:</strong> monthly function tests (brief operation to confirm the
                luminaire works on battery) and an annual full-duration test (3 hours on battery).
                Test records must be maintained and are typically checked as part of the HMO
                licensing inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For small HMOs, self-contained non-maintained emergency luminaires (which only illuminate
          when the normal lighting fails) are usually sufficient. For larger HMOs or those with more
          complex escape routes, maintained luminaires (which are always illuminated and switch to
          battery backup when the mains fails) may be required. Exit signs with emergency lighting
          are required at all final exits and where the direction of travel is not obvious.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-and-afdd-protection',
    heading: 'RCD and AFDD Protection in HMOs',
    content: (
      <>
        <p>
          Protective device requirements for HMOs follow{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          with additional considerations specific to multi-occupancy dwellings:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all socket circuits in HMOs should have 30mA RCD
                protection. This is a requirement of BS 7671 for all new installations and is a
                common C2 observation on older HMO installations that pre-date RCD requirements.
                RCBOs (combined MCB and RCD in a single device) are preferred over a shared RCD
                protecting multiple circuits, as a fault on one circuit does not trip the protection
                for all circuits — reducing nuisance tripping in shared facilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AFDD protection</strong> — Arc Fault Detection Devices provide additional
                protection against electrical fires caused by arc faults in cables and connections.
                While not currently mandatory for all HMO installations, BS 7671 Regulation 421.1.7
                recommends AFDDs for premises where occupants are at higher risk — which includes
                HMOs. Some local authorities now include AFDDs as a condition of HMO licences,
                particularly for larger properties and those with older wiring. When fitting a new
                consumer unit in an HMO, adding AFDDs is a prudent investment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD protection</strong> — Surge Protective Devices (SPDs) are required where
                the consequences of an overvoltage event would be serious. In HMOs, where a surge
                could affect multiple households simultaneously, SPDs are recommended practice. They
                are relatively low cost to fit when installing a new consumer unit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When advising HMO landlords on consumer unit upgrades, the best practice is to install a
          modern consumer unit with individual RCBOs for each circuit, AFDDs on circuits supplying
          sleeping areas and high-risk locations, and a Type 2 SPD. This provides the highest level
          of protection for the occupants and future-proofs the installation against increasingly
          stringent requirements.
        </p>
      </>
    ),
  },
  {
    id: 'common-hmo-defects',
    heading: 'Common HMO Electrical Defects',
    content: (
      <>
        <p>
          HMOs, particularly older converted properties, are prone to specific electrical defects
          that electricians should look for during inspections. Here are the most common issues
          found during HMO EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket circuits</strong> — common in older HMOs with
                rewirable fuse boards or early MCB boards. Classified as C2 (Potentially Dangerous).
                The fix is typically a consumer unit replacement with RCBOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing and bonding</strong> — older converted properties may
                have incomplete main bonding, missing supplementary bonding, or earth connections
                that have deteriorated over time. Can be C1 or C2 depending on severity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits</strong> — tenants in individual rooms may use
                high-power appliances (heaters, cooking equipment) on circuits not designed for that
                load. Undersized cables and inadequate protection are common findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poorly executed conversions</strong> — when a house is converted to an HMO,
                the electrical work is not always done to the required standard. Additional circuits
                added without proper installation, improvised wiring in converted rooms, and
                distribution boards added without appropriate design are all common issues.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system deficiencies</strong> — detectors missing, not working,
                not interconnected, wrong type (smoke detector in kitchen instead of heat detector),
                or not covering the required areas. Fire alarm defects are taken very seriously by
                local authorities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting failures</strong> — luminaires with dead batteries,
                missing emergency lighting in required locations, no test records, and systems that
                have never been tested to full duration. Common in HMOs where maintenance has been
                neglected.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A thorough HMO EICR should identify all of these issues. Where defects are found, the
          electrician should classify them correctly (C1, C2, C3, or FI) and provide clear guidance
          to the landlord on the required remedial action and priority.
        </p>
      </>
    ),
  },
  {
    id: 'landlord-responsibilities',
    heading: 'Landlord Responsibilities for HMO Electrical Safety',
    content: (
      <>
        <p>
          HMO landlords have a broader set of electrical safety responsibilities than landlords of
          standard rented properties. These come from multiple regulatory sources:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR every 5 years</strong> — obtain and maintain a current EICR for the
                entire electrical installation. Provide a copy to tenants before they move in and to
                the local authority on request. Carry out remedial work within 28 days if the EICR
                is unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system</strong> — install, maintain, and regularly test the fire
                alarm system to the grade and category specified by the local authority. Obtain a
                fire alarm certificate on installation and after each annual service. Keep test
                records available for inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — install and maintain emergency lighting in all
                common escape routes. Carry out monthly function tests and annual full-duration
                tests. Keep test records. Obtain an emergency lighting certificate on installation
                and after each annual service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire risk assessment</strong> — carry out and regularly review a fire risk
                assessment for the HMO under the Regulatory Reform (Fire Safety) Order 2005. The
                electrical installation condition is a key factor in the fire risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licence conditions</strong> — comply with all conditions attached to the HMO
                licence, including any specific electrical safety requirements set by the local
                authority. Licence conditions may go beyond the minimum legal requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For landlords with multiple HMO properties, managing all of these requirements across
          multiple sites requires organisation. Each property has its own EICR cycle, fire alarm
          testing schedule, emergency lighting testing programme, and licence renewal date. Missing
          a deadline on any single property can trigger enforcement action. A systematic approach —
          supported by good record-keeping and a reliable electrician — is essential.
        </p>
      </>
    ),
  },
  {
    id: 'local-authority-enforcement',
    heading: 'Local Authority Enforcement and Penalties',
    content: (
      <>
        <p>
          Local authorities take HMO electrical compliance seriously. The combination of multiple
          occupants, shared facilities, and fire risk means that enforcement action for electrical
          non-compliance in HMOs is typically swift and severe.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties up to £30,000 per breach</strong> — under the 2020
                Regulations for failing to obtain an EICR, failing to carry out remedial work, or
                failing to provide documentation. Per breach, not per property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlimited fines for licensing offences</strong> — operating an HMO without a
                required licence is a criminal offence under the Housing Act 2004, punishable by an
                unlimited fine. Breaching licence conditions (including electrical safety
                conditions) is also a criminal offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Improvement and prohibition notices</strong> — under the Housing Health and
                Safety Rating System (HHSRS), the local authority can issue improvement notices
                requiring specific remedial action or prohibition orders preventing occupation until
                hazards are remedied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — tenants (or the local authority on their
                behalf) can apply for a rent repayment order requiring the landlord to repay up to
                12 months' rent if the HMO was unlicensed. This is in addition to any fine or civil
                penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Banning orders</strong> — for the most serious or persistent offenders, the
                local authority can apply for a banning order preventing the landlord from letting
                properties for a specified period.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Local authorities are increasingly proactive in identifying non-compliant HMOs. Tenant
          complaints, fire incidents, and routine licensing inspections all trigger investigations.
          Many authorities use data-sharing agreements, council tax records, and other sources to
          identify unlicensed HMOs and target enforcement activity. For landlords, the cost of
          compliance is trivial compared to the cost of enforcement.
        </p>
      </>
    ),
  },
  {
    id: 'best-practice-electricians',
    heading: 'Best Practice for Electricians Servicing HMOs',
    content: (
      <>
        <p>
          HMO electrical work is a lucrative niche for electricians who understand the specific
          requirements. Here is best practice for building a profitable HMO service offering:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offer a complete HMO package</strong> — EICR, fire alarm certificate,
                emergency lighting certificate, and PAT testing in a single visit (or a scheduled
                programme). Landlords prefer dealing with one electrician who handles everything
                rather than coordinating multiple contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know the local authority requirements</strong> — fire alarm grades and
                emergency lighting requirements vary between local authorities. Research the
                specific requirements for each authority area where you work, and keep up to date
                with any changes to licensing conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Build landlord relationships</strong> — an HMO landlord with a portfolio of
                5 to 10 properties represents a steady pipeline of work: 5-yearly EICRs, annual fire
                alarm servicing, emergency lighting testing, remedial work, and consumer unit
                upgrades. One good landlord relationship can sustain a significant part of your
                business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide clear documentation</strong> — HMO landlords need clear,
                professional certificates that satisfy the local authority licensing team.
                Handwritten or incomplete certificates create problems for the landlord and reflect
                poorly on you. Use digital certification tools that produce professional, compliant
                PDFs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advise proactively</strong> — HMO landlords often do not fully understand
                the electrical requirements. A good electrician advises on fire alarm upgrades,
                consumer unit improvements, AFDD installation, and other measures that improve
                safety and compliance. This positions you as a trusted adviser, not just a
                contractor.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The HMO market rewards electricians who provide a comprehensive, reliable service. The
          recurring nature of the work (5-yearly EICRs, annual fire alarm and emergency lighting
          servicing) creates predictable revenue, and the landlord relationship provides a platform
          for additional work (remedials, upgrades, new installations).
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-for-hmos',
    heading: 'Elec-Mate for HMO Electrical Work',
    content: (
      <>
        <p>
          Elec-Mate covers every certificate and tool that an electrician needs for HMO work. One
          app handles the entire HMO compliance package:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR with Multi-Board Support</h4>
                <p className="text-white text-sm leading-relaxed">
                  HMOs often have multiple distribution boards. Elec-Mate handles them all — add as
                  many boards and circuits as the installation has. The AI board scanner works on
                  each board, and the schedule of test results stays organised across the entire
                  installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Flame className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fire Alarm Certificate (BS 5839)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/guides/fire-alarm-certificate">
                    fire alarm certificates
                  </SEOInternalLink>{' '}
                  to BS 5839-6 on your phone. Record the system grade and category, detector
                  schedule, zone plan, and test results. Export as a professional PDF that satisfies
                  the local authority licensing team.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Emergency Lighting Certificate (BS 5266)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/guides/emergency-lighting-certificate">
                    emergency lighting certificates
                  </SEOInternalLink>{' '}
                  to BS 5266 on your phone. Record luminaire locations, test results (monthly
                  function tests and annual full-duration tests), and system details. Professional
                  PDF output.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Send All Certs to the Landlord</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the EICR, fire alarm certificate, and emergency lighting certificate on
                  site. Send all three to the landlord by email or WhatsApp in one go. Include the
                  invoice. The landlord has the complete HMO compliance package before you leave the
                  building.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          For electricians servicing multiple HMO properties for the same landlord, Elec-Mate keeps
          all certificates organised and accessible. Track which properties are due for renewal,
          which have outstanding remedial work, and which are fully compliant. One app for the
          entire HMO portfolio.
        </p>
        <SEOAppBridge
          title="All HMO certs in one app"
          description="EICR, fire alarm (BS 5839), emergency lighting (BS 5266), and PAT testing. Complete every HMO certificate on your phone and send the full compliance package to the landlord. 7-day free trial."
          icon={Building2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HMOElectricalRequirementsPage() {
  return (
    <GuideTemplate
      title="HMO Electrical Requirements | Licensing & Safety UK"
      description="Complete guide to HMO electrical requirements in the UK. EICR, fire alarm (BS 5839-6), emergency lighting (BS 5266), RCD and AFDD protection, licensing conditions, common defects, enforcement, and how Elec-Mate handles all HMO certificates."
      datePublished="2025-07-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Compliance Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          HMO Electrical Requirements:{' '}
          <span className="text-yellow-400">Full Compliance Guide for UK 2026</span>
        </>
      }
      heroSubtitle="HMOs have stricter electrical requirements than standard rented properties — mandatory EICRs, fire alarm systems to BS 5839-6, emergency lighting to BS 5266, and RCD protection on all circuits. This guide covers every requirement, common defects, enforcement penalties, and how Elec-Mate handles all HMO certificates in one app."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About HMO Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Every HMO Certificate on Your Phone"
      ctaSubheading="EICR, fire alarm (BS 5839), emergency lighting (BS 5266), and PAT testing. Complete the full HMO compliance package on site and send it to the landlord. 7-day free trial, cancel anytime."
    />
  );
}
