import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building2,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Wrench,
  GraduationCap,
  ClipboardCheck,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Commercial EICR Guide', href: '/guides/eicr-commercial-property' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'intervals', label: 'Inspection Intervals' },
  { id: 'scope', label: 'Scope vs Domestic EICR' },
  { id: 'qualifications', label: 'Qualifications Required' },
  { id: 'distribution', label: 'Distribution Boards and Three-Phase' },
  { id: 'fire-emergency', label: 'Fire Alarms and Emergency Lighting' },
  { id: 'costs', label: 'Commercial EICR Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial EICRs do not have a single legally mandated interval — BS 7671 recommends that the interval is determined by the risk level, occupancy, and use of the premises. In practice, 5 years is the maximum for most commercial premises, with higher-risk environments (industrial, healthcare) requiring more frequent inspection.',
  'Commercial EICRs are significantly more complex than domestic inspections: they cover distribution boards, three-phase supplies, sub-mains, protective devices, earth electrode testing, and potentially fire alarm and emergency lighting circuits.',
  'The inspector must be competent to assess the specific installation type — commercial, industrial, or healthcare installations require knowledge of standards beyond BS 7671, including BS 5266 (emergency lighting) and BS 5839-1 (fire alarms).',
  'Typical costs for a commercial EICR range from £500 to £3,000+ depending on the size of the premises, number of distribution boards, complexity of the installation, and whether specialist circuits (fire alarm, UPS, data) are included in scope.',
  'Landlords of commercial premises have a duty of care under the Electricity at Work Regulations 1989 and the Health and Safety at Work Act 1974 to maintain electrical installations in a safe condition — a periodic EICR is the primary means of demonstrating compliance.',
];

const faqs = [
  {
    question: 'How often does a commercial property need an EICR?',
    answer:
      'There is no single legally mandated interval for commercial EICRs — unlike the private rented sector (5-year statutory requirement) or domestic premises. BS 7671 Appendix 6 provides recommended maximum intervals based on the type of installation: commercial premises — 5 years or change of occupancy; industrial — 3 years; offices — 5 years; retail — 5 years; educational — 5 years; hotels and guesthouses — 5 years; healthcare — 1 year for fixed installation, as determined by the authorised person for electrical. These are maximum intervals — risk assessment may justify shorter intervals. Higher-risk environments, older installations, or those that have experienced physical damage or flooding should be inspected more frequently.',
  },
  {
    question: 'Who can carry out a commercial EICR?',
    answer:
      'A commercial EICR must be carried out by a "competent person" — an electrician who is qualified to inspect and test the specific type of installation. For commercial premises, this means an electrician who holds a relevant inspection and testing qualification (typically C&G 2391-52 or the equivalent NVQ Level 3 unit), has experience of commercial and industrial installations, and is registered with a competent person scheme such as NICEIC, NAPIT, or ECA. For specialist environments (healthcare, hazardous areas, data centres), additional qualifications or scheme registrations may be required. The inspector must be able to assess the installation against the correct edition of BS 7671 and relevant industry standards.',
  },
  {
    question: 'What is the difference between a domestic and commercial EICR?',
    answer:
      'A domestic EICR covers a single dwelling — consumer unit, final circuits, earthing and bonding, and RCD protection. A commercial EICR covers a much wider scope: LV (low voltage) intake arrangements, metering, main distribution board, sub-distribution boards, three-phase circuits, sub-mains (busbar trunking or large cables between distribution boards), protective devices (MCBs, MCCBs, ACBs), earth electrode testing, power factor correction equipment, and all final circuits on each distribution board. In addition, the commercial EICR assessor must consider fire alarm circuits, emergency lighting circuits, UPS systems, and standby generator connections where present. The test results for a commercial EICR are significantly more extensive than a domestic report.',
  },
  {
    question: 'Does a commercial EICR cover fire alarm and emergency lighting systems?',
    answer:
      'This depends on the scope agreed with the client. BS 7671 governs the electrical installation — the power supply to the fire alarm panel, the power supply to emergency lighting units, and the earthing and bonding. The fire alarm system itself is governed by BS 5839-1 and is typically inspected under a separate service contract by a fire alarm specialist. Emergency lighting is governed by BS 5266-1 and similarly inspected separately. An EICR can include the power supplies to these systems within its scope, but a full BS 5839-1 or BS 5266-1 inspection requires specific qualifications and test procedures beyond the standard EICR. Make the scope of the EICR clear in writing before starting the inspection.',
  },
  {
    question: 'What observation codes are used in a commercial EICR?',
    answer:
      'Commercial EICRs use the same four observation codes as domestic reports: C1 (danger present — immediate remedial action required), C2 (potentially dangerous — urgent remedial action required), C3 (improvement recommended), and FI (further investigation required without delay). The overall outcome of the inspection is either "Satisfactory" (no C1 or C2 codes) or "Unsatisfactory" (one or more C1 or C2 codes). An unsatisfactory EICR means that the installation has defects that require rectification before the premises can be considered safe to occupy. Common commercial C2 codes include: absence of main equipotential bonding, overloaded cables, missing earth connections to metalwork, and missing RCD protection on circuits supplying portable equipment.',
  },
  {
    question: 'How much does a commercial EICR cost?',
    answer:
      'Commercial EICR costs vary significantly with premises size and complexity. Typical ranges: small commercial unit (up to 200m², single-phase supply, one distribution board) — £500 to £800; medium commercial premises (200 to 1,000m², three-phase supply, 2 to 4 distribution boards) — £800 to £1,800; large commercial building (1,000m²+, multiple floors, numerous distribution boards, sub-mains) — £2,000 to £5,000+; industrial unit with specialist equipment or hazardous areas — £3,000 to £8,000+. Costs include the inspection and testing time, the report preparation, and the issue of the EICR document. Remedial works are priced separately.',
  },
  {
    question: 'Does a commercial landlord need to provide an EICR to the tenant?',
    answer:
      'Commercial landlords do not have the same statutory obligation to provide EICRs as private residential landlords under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — those regulations apply to assured shorthold tenancies (residential), not commercial leases. However, commercial landlords have duties under the Electricity at Work Regulations 1989 and the Health and Safety at Work Act 1974 to maintain the electrical installation in a safe condition. In practice, most commercial lease agreements include a landlord\'s obligation to maintain the structure and services (including electrical installations). Many commercial tenants request an EICR as part of the pre-lease due diligence. During the tenancy, the landlord remains responsible for the condition of the electrical installation in the common parts.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete commercial EICR reports on your phone with multiple distribution board schedules.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote commercial EICR and remedial works packages for commercial landlords.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size sub-main cables and distribution board feeds for commercial installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'C&G 2391 study modules covering commercial installation inspection and testing.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/holiday-let-electrical-requirements',
    title: 'Holiday Let Electrical Requirements',
    description: 'EICR and compliance requirements for holiday let and short let properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the 18th Edition wiring regulations.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Commercial EICR: What Is Different from a Domestic Inspection',
    content: (
      <>
        <p>
          An EICR (Electrical Installation Condition Report) for a commercial property is
          fundamentally different from a domestic EICR — in scope, complexity, time, and cost.
          Commercial installations often include three-phase supplies, multiple distribution boards,
          sub-main cables, motor circuits, power factor correction, UPS systems, and specialist
          circuits for fire alarms, emergency lighting, and data infrastructure.
        </p>
        <p>
          The legal framework for commercial EICRs draws from the Electricity at Work Regulations
          1989, the Health and Safety at Work Act 1974, and the specific requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . Unlike the domestic private rented sector, there is no single piece of legislation that
          mandates a 5-year inspection interval for commercial premises — the interval is risk-based.
          However, BS 7671 Appendix 6 recommends a maximum of 5 years for most commercial premises.
        </p>
        <p>
          This guide covers inspection intervals, scope differences, the qualifications required,
          typical costs, and how to build a commercial EICR business using Elec-Mate.
        </p>
      </>
    ),
  },
  {
    id: 'intervals',
    heading: 'Commercial EICR Inspection Intervals',
    content: (
      <>
        <p>
          BS 7671 Appendix 6 (Table A6.1) recommends maximum inspection intervals by premises type:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Offices, retail, and general commercial</strong> — maximum 5 years</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Industrial premises</strong> — maximum 3 years</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Hotels and guesthouses</strong> — maximum 5 years</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Educational establishments</strong> — maximum 5 years</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Healthcare (fixed installation)</strong> — maximum 1 year (as determined by authorised person for electrical)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Change of occupancy</strong> — inspection required regardless of when the previous inspection was carried out</span>
            </li>
          </ul>
        </div>
        <p>
          These are maximum intervals — if the inspector specifies a shorter interval on the EICR,
          the shorter interval applies. A commercial installation that is older, has had physical
          damage, or is in a wet or corrosive environment should be inspected more frequently than
          the table maximum.
        </p>
        <SEOAppBridge
          title="Complete commercial EICRs efficiently with Elec-Mate"
          description="Elec-Mate's EICR app handles multiple distribution boards, three-phase installations, and generates professional commercial EICR reports on your phone. Issue the PDF to the client before you leave site."
          icon={Building2}
        />
      </>
    ),
  },
  {
    id: 'scope',
    heading: 'Scope: Commercial vs Domestic EICR',
    content: (
      <>
        <p>
          A commercial EICR must cover all accessible parts of the electrical installation. The
          scope differences from a domestic EICR are significant:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Domestic EICR Scope</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Single consumer unit</li>
              <li>Final circuits (lighting, sockets, heating)</li>
              <li>Main earthing and bonding</li>
              <li>RCD protection</li>
              <li>Smoke alarm circuits</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Commercial EICR Additional Scope</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>LV intake and metering</li>
              <li>Main switchgear (ACBs, MCCBs)</li>
              <li>Sub-main cables and busbar trunking</li>
              <li>Multiple distribution boards</li>
              <li>Three-phase circuits and motor circuits</li>
              <li>Earth electrode testing</li>
              <li>Power factor correction equipment</li>
              <li>UPS and standby generation (power supply assessment)</li>
              <li>Fire alarm power supply (scope-dependent)</li>
              <li>Emergency lighting power supply (scope-dependent)</li>
            </ul>
          </div>
        </div>
        <p>
          The scope of the inspection must be agreed in writing before the inspection begins. Where
          specialist systems (fire alarm, emergency lighting, data) are excluded from scope, this
          must be clearly stated on the EICR front page.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'Qualifications Required for Commercial EICRs',
    content: (
      <>
        <p>
          Commercial EICRs require a higher level of competence than domestic inspections. The
          inspector must be able to assess the specific installation type and must hold relevant
          qualifications:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2391-52 (Inspection, Testing and Certification)</strong> — the standard
                qualification for inspection and testing in the UK. Covers both domestic and
                commercial/industrial installations. Required by most competent person schemes for
                EICR sign-off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience of commercial installations</strong> — qualifications alone are
                not sufficient. The inspector must have demonstrable experience of the type of
                installation being inspected. An electrician who has only worked on domestic
                properties should not be signing off a complex commercial three-phase installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist qualifications for specialist environments</strong> — healthcare
                (Authorised Person for Electrical), hazardous areas (Ex certification), data centres
                (BICSI or similar) may require additional scheme registration or qualifications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'distribution',
    heading: 'Distribution Boards and Three-Phase Installations',
    content: (
      <>
        <p>
          Commercial installations typically have a three-phase supply (400V, 50Hz, TN-S or TN-C-S
          earthing system) feeding a main distribution board (MDB), with sub-distribution boards
          (SDBs) on each floor or in each section of the building. Key inspection points:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase balance</strong> — check that the load is reasonably balanced across
                the three phases at the MDB. Severe phase imbalance (more than 20%) can cause
                overheating of the neutral conductor and transformer damage. Record phase currents
                under normal load in the EICR notes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-main cable condition</strong> — inspect the condition of sub-main
                cables between the MDB and SDBs. Cable insulation degradation, mechanical damage,
                or inadequate support are common C2 or C3 observations in older commercial
                buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance on each phase</strong> — Zs must be measured
                on each phase at each distribution board and compared against the maximum permitted
                for the protective device. Three-phase values must be recorded separately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-emergency',
    heading: 'Fire Alarms and Emergency Lighting',
    content: (
      <>
        <p>
          Commercial buildings are required to have fire detection systems (BS 5839-1) and emergency
          lighting (BS 5266-1). The EICR assessor should note any visible deficiencies in the power
          supply arrangements for these systems:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm panel power supply</strong> — the mains supply to the fire alarm
                panel is part of the electrical installation and is within EICR scope. It should be
                a dedicated, unswitched spur from a way in the distribution board clearly labelled
                "Fire Alarm — Do Not Switch Off". If the supply is taken from a switched circuit or
                shares with other equipment, record as a C2 observation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting power supply</strong> — similarly, the supply to the
                central battery system or to self-contained emergency luminaire final circuits is
                within EICR scope. Check that emergency lighting circuits are clearly labelled and
                not on time-switch or dimmer controls.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A full inspection of the fire alarm system to BS 5839-1 or the emergency lighting system
          to BS 5266-1 is outside the scope of an EICR — but the EICR should note if a fire risk
          assessment or specialist service inspection is recommended.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Commercial EICR Costs',
    content: (
      <>
        <p>
          Commercial EICR pricing is typically based on the number of distribution boards, the number
          of circuits, and the time required. Typical day rates for qualified commercial electrical
          inspectors are £350 to £600 per day. Indicative costs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small commercial unit (under 200m², 1 distribution board)</strong> — £500
                to £800. Half-day inspection, report same day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium commercial premises (200–1,000m², 2–4 distribution boards)</strong> —
                £800 to £1,800. Full day inspection, report within 2 to 5 working days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large commercial building (1,000m²+, 5+ distribution boards)</strong> — £2,000
                to £3,500+. Multi-day inspection with a team of inspectors, report with full schedule
                of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial premises or specialist environments</strong> — £3,000 to £8,000+.
                Specialist qualifications, additional test equipment, and detailed reporting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building a Commercial EICR Business',
    content: (
      <>
        <p>
          Commercial EICRs are high-value work. A single large commercial EICR can generate more
          revenue than a week of domestic EICRs. Building relationships with commercial property
          managers, facilities managers, and landlords creates recurring revenue from periodic
          inspections and remedial works.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Agree Scope Before You Start</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always agree the inspection scope in writing — which distribution boards, which
                  floors, whether fire alarm and emergency lighting power supplies are included.
                  Out-of-scope items must be noted on the EICR. A clear scope agreement protects
                  you and manages client expectations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Reports Quickly</h4>
                <p className="text-white text-sm leading-relaxed">
                  Commercial clients need reports quickly — for insurance renewals, lease completions,
                  and health and safety documentation. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR app
                  </SEOInternalLink>{' '}
                  to complete and issue reports on site or within 24 hours. Fast turnaround is a
                  significant differentiator in the commercial market.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Works at the Same Time</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to quote remedial works immediately after identifying C1 and C2 defects. Sending the
                  remedial quote with the EICR report converts a one-off inspection into a repair job
                  — and positions you as the natural choice to carry out the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Build a commercial EICR business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for commercial EICR reports, remedial works quoting, and professional documentation. Issue EICR reports on site and remedial quotes the same day. 7-day free trial."
          icon={Building2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRCommercialPage() {
  return (
    <GuideTemplate
      title="Commercial EICR Guide UK | Intervals, Scope, Qualifications and Cost"
      description="Complete guide to commercial property EICRs in the UK. Inspection intervals, scope vs domestic EICR, qualifications required, three-phase installations, fire alarm and emergency lighting, and typical costs £500–£3,000+."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Inspection Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Commercial EICR Guide:{' '}
          <span className="text-yellow-400">Intervals, Scope, Qualifications and Cost</span>
        </>
      }
      heroSubtitle="Commercial EICRs are more complex and higher-value than domestic inspections. This guide covers inspection intervals for different premises types, scope differences, required qualifications, three-phase and distribution board considerations, and typical costs."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial EICRs"
      relatedPages={relatedPages}
      ctaHeading="Complete Commercial EICRs and Issue Reports on Site"
      ctaSubheading="Elec-Mate's EICR app handles commercial inspections with multiple distribution board schedules, three-phase test results, and professional PDF reports. 7-day free trial, cancel anytime."
    />
  );
}
