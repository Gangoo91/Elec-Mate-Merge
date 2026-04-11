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
  Building2,
  Zap,
  Clock,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Remediation Work', href: '/eicr-remediation' },
];

const tocItems = [
  { id: 'observation-codes', label: 'Understanding C1, C2, C3 and FI Codes' },
  { id: 'what-must-be-fixed', label: 'What Must Be Fixed and By When' },
  { id: 'common-remediation', label: 'Common Remediation Work' },
  { id: 'typical-costs', label: 'Typical Remediation Costs' },
  { id: 'getting-quotes', label: 'Getting Quotes for Remediation' },
  { id: 'same-or-different', label: 'Same or Different Electrician?' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'C1 (danger present) observations require immediate remedial action — the inspector may recommend disconnecting the affected circuit on the day of inspection.',
  'C2 (potentially dangerous) observations make the EICR Unsatisfactory and must be remedied within 28 days under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'C3 (improvement recommended) observations do not make the EICR Unsatisfactory and are not legally required to be addressed within 28 days — but addressing them is good practice and prevents future C2 classification.',
  'FI (further investigation required) observations must be investigated promptly — the inspector cannot classify the observation further until the investigation is complete. The EICR will be Unsatisfactory if FI items remain unresolved.',
  'Remediation must be carried out by a qualified person and confirmed in writing. The written confirmation must be provided to the tenant and to the local authority within 28 days of completion.',
  'The most common and costly remediation item is consumer unit replacement to provide RCD protection, typically £600 to £1,200.',
];

const faqs = [
  {
    question: 'What does a C1 observation mean on an EICR?',
    answer:
      'C1 means "Danger Present — risk of injury; immediate remedial action required." A C1 observation indicates that the electrical installation poses an immediate danger. The inspector will record C1 for items such as live exposed conductors, missing enclosure covers on live terminals, severely damaged cables with exposed cores, or faulty protective devices. A C1 observation makes the EICR Unsatisfactory. The inspector may recommend immediate disconnection of the affected circuit. Remediation must be completed as a matter of urgency — do not wait the full 28 days for a genuine C1.',
  },
  {
    question: 'What does a C2 observation mean on an EICR?',
    answer:
      'C2 means "Potentially Dangerous — urgent remedial action required." C2 observations indicate that whilst the installation does not present an immediate danger, it could become dangerous and must be remedied urgently. C2 makes the EICR Unsatisfactory. Under the Electrical Safety Standards Regulations 2020, landlords must complete all C2 remediation within 28 days of the EICR (or sooner if specified by the inspector). Common C2 items include absence of RCD protection on socket-outlet circuits, inadequate earthing and bonding, and overloaded circuits.',
  },
  {
    question: 'What does a C3 observation mean on an EICR?',
    answer:
      'C3 means "Improvement Recommended." A C3 observation does not make the EICR Unsatisfactory and is not legally required to be addressed within 28 days. C3 items are things that do not meet current BS 7671 requirements but do not present an immediate or potential danger. They typically relate to installations that were compliant when installed but do not meet the current edition. C3 items should be noted and addressed at the next inspection or when convenient — left too long, they can deteriorate into C2 observations.',
  },
  {
    question: 'What does FI mean on an EICR?',
    answer:
      'FI means "Further Investigation Required." FI is recorded where the inspector is unable to complete an assessment of a particular item without further investigation — for example, cables that are not accessible, concealed junction boxes that cannot be opened during the inspection, or test results that suggest a fault but cannot be traced without additional work. The EICR will be Unsatisfactory if FI observations remain. The FI investigation should be completed promptly, after which the affected items can be properly classified.',
  },
  {
    question: 'Do I have to use the same electrician who did the EICR for the remediation?',
    answer:
      'No. You are not obliged to use the same electrician for the remediation work. You can get quotes from multiple qualified electricians and choose the best offer. The remediation work must be carried out by a qualified and competent person, and you must obtain written confirmation that the work has been satisfactorily completed. This confirmation (which may be in the form of an Electrical Installation Certificate or Minor Works Certificate) must then be provided to the tenant and to the local authority within 28 days of completion.',
  },
  {
    question: 'What happens if I cannot complete the remediation within 28 days?',
    answer:
      'The 28-day deadline is set by the Electrical Safety Standards Regulations 2020 and applies to all C1 and C2 observations in the private rented sector. There is no formal process for extending the 28-day deadline. If you are facing delays due to supply chain issues or contractor availability, document your efforts to arrange the work promptly. The local authority has discretion in how they enforce the regulations, but failing to complete remediation on time is a separate breach that can attract a penalty of up to £30,000.',
  },
  {
    question: 'How much does EICR remediation typically cost?',
    answer:
      'Remediation costs vary widely depending on what needs to be done. The most common and most expensive single item is consumer unit replacement for RCD protection, which typically costs £600 to £1,200 for a standard domestic property. Main protective bonding costs £150 to £400. Adding supplementary bonding in a bathroom costs £100 to £300. Cable repairs cost £100 to £500 per repair depending on access and length. Full rewires are rare as an EICR remediation item and cost £3,000 to £10,000+ depending on property size.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eicr-for-hmo',
    title: 'EICR for HMO Properties',
    description: 'HMO-specific EICR requirements, common C2 codes, and remediation costs.',
    icon: Building2,
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
    href: '/eicr-tenant-rights',
    title: 'Tenant Rights for EICR',
    description: "Tenants' rights to electrical safety records and how to enforce them.",
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
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
    id: 'observation-codes',
    heading: 'Understanding C1, C2, C3 and FI Observation Codes',
    content: (
      <>
        <p>
          When an EICR inspector identifies a defect or departure from BS 7671, they classify it
          using a standardised observation code. These codes determine whether the EICR is
          Satisfactory or Unsatisfactory and what action is required. Understanding the codes is
          essential for landlords, tenants, and property professionals who receive or act on EICR
          reports.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger Present</strong> — "Risk of injury; immediate remedial action
                required." C1 is the most serious classification. The inspector records C1 where the
                installation presents an immediate risk of electric shock, fire, or burns. A single
                C1 observation makes the entire EICR Unsatisfactory. The inspector may recommend
                immediate disconnection of the affected circuit. Examples: live exposed conductors,
                missing consumer unit covers, severely degraded cable insulation with exposed cores.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially Dangerous</strong> — "Urgent remedial action required." C2
                is recorded where the installation does not present an immediate danger but could do
                so if left unaddressed. A C2 makes the EICR Unsatisfactory. Under the 2020
                Regulations, landlords must complete remediation within 28 days. Examples: absence
                of RCD protection on socket-outlet circuits, inadequate earthing, overloaded
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement Recommended</strong> — "Improvement recommended." C3 does
                not make the EICR Unsatisfactory and is not legally required to be addressed within
                28 days. C3 items are typically non-compliances with the current edition of BS 7671
                that do not present a danger — for example, absence of arc fault detection (AFDD)
                which is recommended but not required for existing installations, or cable routes
                that are not marked but are not damaged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further Investigation Required</strong> — "Further investigation
                required without delay." FI is recorded where the inspector cannot assess the
                condition of part of the installation during the inspection — for example, because
                cables are concealed and inaccessible, or because test results suggest a fault that
                cannot be located without further investigation. FI makes the EICR Unsatisfactory.
                The investigation must be completed and the affected observations reclassified as
                C1, C2, C3, or cleared.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An EICR is assessed as <strong>Satisfactory</strong> only if it contains no C1, C2, or FI
          observations. The presence of C3 observations alone does not make an EICR Unsatisfactory.
          An EICR is <strong>Unsatisfactory</strong> if it contains one or more C1, C2, or FI
          observations.
        </p>
      </>
    ),
  },
  {
    id: 'what-must-be-fixed',
    heading: 'What Must Be Fixed and By When',
    content: (
      <>
        <p>
          The remediation obligations for landlords under the Electrical Safety Standards
          Regulations 2020 are clear and legally enforceable. Different observation codes carry
          different timescales.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — immediately</strong> — the 2020 Regulations require remediation within
                28 days, but C1 observations represent immediate danger and should not be left that
                long. Where the inspector recommends disconnection of the affected circuit, act on
                that recommendation immediately. Arrange emergency remedial work as soon as
                possible. Do not allow tenants to use the affected circuit until it is made safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — within 28 days</strong> — the 28-day clock starts from the date of the
                EICR, not from when the landlord receives the report. Arrange remediation promptly;
                28 days is not much time if specialist work is needed or contractors are busy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — promptly, then reclassify</strong> — FI items should be investigated as
                soon as possible. Until they are resolved and reclassified, the EICR is
                Unsatisfactory, which means the landlord is not compliant with the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — no legal deadline</strong> — C3 items are not legally required to be
                addressed within 28 days and do not make the EICR Unsatisfactory. However, they
                should be addressed at the next convenient opportunity to prevent deterioration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Once remediation is complete, the landlord must obtain written confirmation from a
          qualified electrician that the work has been satisfactorily completed. This confirmation
          must be provided to the tenant within 28 days of the work being finished, and to the local
          authority within seven days if requested.
        </p>
      </>
    ),
  },
  {
    id: 'common-remediation',
    heading: 'Common EICR Remediation Work',
    content: (
      <>
        <p>
          The following types of remediation work are the most commonly required following an
          Unsatisfactory EICR in a domestic rental property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — the most common remediation item. Where
                an older consumer unit lacks RCD protection on socket-outlet circuits (required
                under Regulation 411.3.3 of BS 7671), the entire consumer unit is typically replaced
                with a modern dual-RCD or RCBO board. This satisfies the requirement and also
                modernises overcurrent protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding</strong> — the main earthing terminal must be
                connected to all incoming metallic services (gas, water, oil). Missing or undersized
                bonding conductors are a common C2. The remediation involves installing correctly
                sized bonding conductors (typically 10mm² for a TN-S or TN-C-S supply) from the main
                earthing terminal to the gas and water meter pipework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding in bathrooms</strong> — where a bathroom has exposed
                metalwork (metal baths, pipes, waste fittings) that is not covered by the main
                bonding, supplementary bonding conductors (typically 4mm²) must be installed between
                simultaneously accessible metal parts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable repairs and replacements</strong> — damaged, overheated, or
                deteriorated cables must be repaired or replaced. For small sections, a splice in an
                accessible enclosure is acceptable. For longer runs or cables showing widespread
                deterioration, replacement is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correcting amateur additions</strong> — non-professional additions to the
                electrical installation (DIY sockets, junction boxes not in accessible positions,
                non-standard cable types) are commonly found in older rental properties and must be
                corrected by a qualified electrician.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Remediation Costs (2026)',
    content: (
      <>
        <p>
          The cost of EICR remediation varies significantly depending on the work required, the
          region, and the property. The costs below are indicative for 2026. Labour rates are
          typically higher in London and the South East.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement (standard house)</strong> — £600 to £1,200. This
                is the most commonly required and most costly single remediation item. The price
                includes the new consumer unit, installation, testing, and an Electrical
                Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding (gas + water)</strong> — £150 to £400. Depends on
                the length of bonding conductor runs and ease of access to the meter locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding (bathroom)</strong> — £100 to £300 per bathroom.
                Typically involves installing bonding conductors to bath, basin, and pipe
                connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable repair (short section)</strong> — £100 to £300. Replacing a damaged
                section of cable in an accessible location. More complex repairs with difficult
                access or chased cables cost more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional circuit (from consumer unit)</strong> — £200 to £500 per circuit.
                Adding a dedicated circuit for a cooker, EV charger, or to separate an overloaded
                ring main.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (2-bed house)</strong> — £3,000 to £6,000. Rarely required
                purely as EICR remediation but sometimes the most cost-effective option when an
                installation has multiple serious defects. Includes new consumer unit, all circuit
                wiring, sockets, and lighting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always obtain at least two quotes for significant remediation work. The 28-day deadline
          creates urgency, but you are still entitled to compare prices and ensure quality.
        </p>
      </>
    ),
  },
  {
    id: 'getting-quotes',
    heading: 'Getting Quotes for Remediation Work',
    content: (
      <>
        <p>
          The 28-day deadline creates time pressure for landlords, but it is still worth getting at
          least two quotes for significant remediation work — especially for a consumer unit
          replacement costing £600 to £1,200 or more.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get the quote on the day of the EICR</strong> — the electrician who carries
                out the EICR is already on site, already understands the installation, and is best
                placed to quote for remediation immediately. This avoids the need for a second site
                visit and can significantly reduce the total time taken. Many electricians offer
                competitive pricing for combined EICR and remediation work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use registered electricians</strong> — for remediation work on a rental
                property, use an electrician registered with a competent person scheme (NICEIC,
                NAPIT, ELECSA, or equivalent). This ensures the completed work is self-certified
                under Part P and that you receive proper documentation (EIC or Minor Works
                Certificate) for your records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide the EICR to each electrician quoting</strong> — share the full EICR
                with any electrician providing a remediation quote. This ensures they quote for all
                items identified and prevents disputes about scope later. The electrician should
                confirm in writing which observations they are addressing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'same-or-different',
    heading: 'Same or Different Electrician for Remediation?',
    content: (
      <>
        <p>
          There is no legal requirement to use the same electrician who carried out the EICR for the
          remediation work. Both options have advantages and disadvantages.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Same electrician — advantages</strong> — they already know the installation.
                They can start the remediation immediately after the inspection (if the work is
                straightforward). No need for a second site visit. They are accountable for both the
                inspection findings and the remediation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Different electrician — advantages</strong> — you may get a more competitive
                price. An independent electrician carries out a second-opinion check on the work.
                For significant remediation work (consumer unit replacement, partial rewires),
                competitive quotes can save hundreds of pounds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation requirements</strong> — whichever electrician carries out the
                remediation, you must obtain written confirmation that the work has been done
                satisfactorily. For notifiable work (consumer unit replacement or new circuits),
                this will be an Electrical Installation Certificate. For minor work (replacing a
                socket, adding a bonding conductor), a Minor Works Certificate is appropriate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          After remediation is complete, the EICR is not automatically updated. If you want a new
          Satisfactory EICR to show full compliance, you must commission a new inspection of the
          installation. Some landlords choose to do this immediately after remediation; others rely
          on the written confirmation from the remediation electrician until the next scheduled
          EICR.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning the Remediation Work',
    content: (
      <>
        <p>
          Electricians who carry out EICRs are in the best possible position to win the remediation
          work. The landlord needs to act within 28 days, they trust you because you found the
          defects, and you already understand the installation. Providing a clear, professional
          quote on the day of the EICR is the single most effective way to win follow-on remediation
          contracts.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote on Site, Win the Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting tool
                  </SEOInternalLink>{' '}
                  to produce a professional remediation quote while you are still on site. Landlords
                  under 28-day pressure will almost always accept a professional same-day quote from
                  the inspector rather than going through the process of finding and briefing a
                  different electrician.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Remediation Correctly</h4>
                <p className="text-white text-sm leading-relaxed">
                  After completing remediation, use Elec-Mate to produce the correct documentation —
                  EIC for notifiable work, Minor Works Certificate for smaller jobs. Send the PDF
                  directly to the landlord from site. The landlord has 28 days from completion to
                  provide this to the tenant and local authority.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs and win remediation work with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to complete on-site EICRs, quote for remediation work instantly, and produce all required certificates. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRRemediationPage() {
  return (
    <GuideTemplate
      title="EICR Remediation Work UK | Fixing EICR Failures Guide"
      description="Complete guide to EICR remediation work. Understand C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended) and FI (further investigation) codes, the 28-day deadline, typical remediation costs, and whether to use the same or a different electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Remediation Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          EICR Remediation Work:{' '}
          <span className="text-yellow-400">C1, C2, C3 and FI Explained</span>
        </>
      }
      heroSubtitle="When an EICR comes back Unsatisfactory, landlords must act fast. This guide explains every observation code — C1, C2, C3 and FI — what legally must be fixed and by when, typical remediation costs, how to get quotes, and whether you must use the same electrician."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: EICR Remediation"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs and Remediation Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, instant remediation quotes, and all required certificate documentation. 7-day free trial."
    />
  );
}
