import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  Home,
  PoundSterling,
  FileCheck2,
  ShieldCheck,
  ClipboardCheck,
  Search,
  GraduationCap,
  Calculator,
  AlertTriangle,
  Receipt,
  Send,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/house-rewire-guide' },
  { label: 'Partial Rewire', href: '/guides/partial-rewire-guide' },
];

const tocItems = [
  { id: 'what-is-partial-rewire', label: 'What Is a Partial Rewire?' },
  { id: 'when-appropriate', label: 'When a Partial Rewire Is Appropriate' },
  { id: 'cost-comparison', label: 'Cost: Partial vs Full Rewire' },
  { id: 'connecting-old-new', label: 'Connecting Old and New Wiring' },
  { id: 'testing-requirements', label: 'Testing Requirements' },
  { id: 'certification', label: 'Certification and Part P' },
  { id: 'common-scenarios', label: 'Common Partial Rewire Scenarios' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Partial Rewires' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A partial rewire replaces only the sections of wiring that are defective, dangerous, or inadequate — not the entire installation. It is a practical middle ground between a full rewire and targeted repairs.',
  'Partial rewires typically cost 40-60% less than a full rewire, ranging from £1,500 to £5,000 for a typical house compared to £4,000 to £10,000+ for a full rewire.',
  'The key technical challenge is connecting new wiring to existing wiring safely. BS 7671 requires the entire installation (new and existing) to be safe, and the new work must not compromise the existing circuits.',
  'A partial rewire requires an Electrical Installation Certificate (EIC) for the new work and may trigger Part P notification if it involves new circuits or work in special locations.',
  'Elec-Mate helps electricians scope, price, certify, and deliver partial rewire projects efficiently — from the initial survey through to the final certificate and invoice.',
];

const faqs = [
  {
    question: 'How do I know if I need a partial rewire or a full rewire?',
    answer:
      'The decision depends on the age and condition of the existing wiring. If the wiring throughout the property is the same age and type (for example, all rubber-insulated from the 1950s), a full rewire is usually the right choice because the entire installation has reached the end of its life simultaneously. If the property has a mix of wiring ages — for example, original 1960s PVC wiring in some areas and newer wiring from a kitchen extension in the 2000s — a partial rewire targeting only the older sections may be appropriate. An EICR will identify which circuits have defects and which are satisfactory, providing the evidence needed to decide. Key indicators for a full rewire include: all rubber-insulated cables, lead-sheathed wiring, an old fuse box without RCD protection, and multiple C1/C2 defects across most circuits.',
  },
  {
    question: 'Can you mix old and new wiring in the same installation?',
    answer:
      'Yes, provided both the old and new wiring are safe and the connections between them are properly made. BS 7671 does not require all wiring in an installation to be the same age or type. However, the new work must not compromise the safety of the existing circuits, and the existing circuits must still be in a safe condition. The connection points between old and new wiring must be accessible for inspection and testing. When connecting new cables to existing circuits, the electrician must verify the condition of the existing cable (insulation resistance, continuity) and ensure the protective devices are appropriate for both the new and existing cable sizes and types.',
  },
  {
    question: 'Does a partial rewire need to be notified under Part P?',
    answer:
      'If the partial rewire involves installing new circuits, the work is notifiable under Part P of the Building Regulations (England and Wales). This means the electrician must either be registered with a competent person scheme (NICEIC, NAPIT, ELECSA) to self-certify, or the work must be notified to building control directly. If the partial rewire only involves replacing existing cables on the same circuits without adding new circuits, it may not be notifiable — but an EIC is still required for the work. Work in special locations (bathrooms, swimming pools, saunas) is always notifiable regardless of whether new circuits are involved.',
  },
  {
    question: 'How long does a partial rewire take?',
    answer:
      'A partial rewire typically takes 2 to 5 days for a domestic property, compared to 5 to 10 days for a full rewire. The duration depends on how many circuits are being replaced, the accessibility of the cable routes, and whether the property is occupied during the work. Replacing the downstairs circuits in a 3-bedroom house (typically 3 to 4 circuits) might take 2 to 3 days. Rewiring an entire floor (upstairs or downstairs) with 5 to 6 circuits might take 3 to 5 days. The work involves lifting floorboards, chasing walls, pulling new cables, making off connections, and carrying out first and second fix. The property can usually remain occupied, but the affected circuits will be without power during the work.',
  },
  {
    question: 'Will a partial rewire pass an EICR?',
    answer:
      'A properly carried out partial rewire should result in a Satisfactory EICR for the entire installation — both the new and existing sections. The EICR inspector will test all circuits, including the existing ones that were not rewired. If the existing circuits are in satisfactory condition, the overall assessment will be Satisfactory. If the existing circuits still have defects (for example, low insulation resistance), these will be noted on the EICR and may result in an Unsatisfactory report despite the new work. This is why the initial EICR survey is so important — it identifies all the defects and allows the scope of the partial rewire to be planned so that the resulting installation is fully compliant.',
  },
  {
    question: 'Is a partial rewire worth it, or should I just do a full rewire?',
    answer:
      'A partial rewire makes financial sense when a significant portion of the existing wiring is in good condition. If 60-70% of the wiring is satisfactory and only 30-40% needs replacement, a partial rewire can save thousands of pounds and several days of disruption. However, if 70% or more of the wiring needs replacement, a full rewire is usually better value — the marginal cost of replacing the remaining 30% is small compared to the total, and the result is a completely new installation with a clean slate. The break-even point varies by property, but as a rule of thumb: if the EICR shows C1 or C2 defects on more than half the circuits, a full rewire is likely the better option.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description: 'Full guide to domestic rewiring: cost, process, duration, and what to expect.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description: 'Average rewire costs by property type and region across the UK.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer unit replacement including Amendment 3 requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'C1, C2, C3, and FI codes with real examples and remedial guidance.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-size-cables-bs-7671',
    title: 'How to Size Cables',
    description: 'Step-by-step cable sizing guide following BS 7671 and Appendix 4.',
    icon: Cable,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-partial-rewire',
    heading: 'What Is a Partial Rewire?',
    content: (
      <>
        <p>
          A partial rewire is the replacement of specific sections of the electrical wiring in a
          property, rather than the entire installation. It targets the circuits, cables, or areas
          that are defective, dangerous, or no longer adequate — while leaving the satisfactory
          sections of wiring in place.
        </p>
        <p>
          This approach is common in properties where the wiring is a mix of different ages. For
          example, a 1970s house that had a kitchen extension added in 2005 might have original PVC
          wiring throughout the main house but modern twin-and-earth cable in the extension. If the
          original wiring in the main house is deteriorating but the extension wiring is fine, a
          partial rewire of the main house circuits makes more sense than a full rewire.
        </p>
        <p>
          A partial rewire can include replacing individual circuits (for example, all lighting
          circuits), replacing wiring in specific areas (for example, the ground floor only), or
          upgrading the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>{' '}
          and main distribution while retaining the final circuits.
        </p>
      </>
    ),
  },
  {
    id: 'when-appropriate',
    heading: 'When Is a Partial Rewire Appropriate?',
    content: (
      <>
        <p>
          The decision to carry out a partial rewire rather than a full rewire should be based on
          the findings of an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>.
          The report will identify which circuits have defects and which are satisfactory. A partial
          rewire is appropriate when:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Only some circuits have C1/C2 defects.</strong> If 3 out of 10 circuits have
                deteriorating insulation resistance but the other 7 are satisfactory, replacing only
                the 3 defective circuits is proportionate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The property has mixed-age wiring.</strong> Extensions, loft conversions,
                and previous alterations often use newer cable. These sections may have decades of
                serviceable life remaining.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Budget constraints.</strong> A full rewire of a 3-bedroom house costs £4,000
                to £8,000. A partial rewire targeting the worst circuits might cost £1,500 to £3,500
                and bring the installation to a Satisfactory condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimal disruption is needed.</strong> In an occupied property, rewiring
                specific rooms or circuits is less disruptive than a full rewire, which typically
                affects every room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not appropriate when:</strong> the entire installation is the same age and
                showing widespread deterioration (rubber insulation, lead sheathing), or when the
                consumer unit, earthing arrangement, and most circuits all need replacing — at that
                point, a full rewire is better value.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-comparison',
    heading: 'Cost: Partial Rewire vs Full Rewire',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Cost Comparison (3-Bedroom House)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire:</strong> £4,000 to £8,000. Includes new consumer unit, all new
                circuits, first and second fix throughout, full inspection and testing. Duration: 5
                to 10 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partial rewire (3-4 circuits):</strong> £1,500 to £3,500. Includes consumer
                unit upgrade (if needed), replacement of defective circuits, connection to existing
                satisfactory circuits, and inspection and testing. Duration: 2 to 4 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade only:</strong> £800 to £1,500. Includes new metal
                consumer unit with RCBOs or dual RCD split-load board, main switch, connection of
                existing circuits, and inspection and testing. Duration: 1 day.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost savings from a partial rewire come from reduced labour (fewer circuits to install
          and terminate), reduced materials (fewer cables, accessories, and back boxes), and less
          making good (fewer walls to chase, fewer floorboards to lift). The consumer unit is often
          the largest single cost item in any rewire — if the existing consumer unit is being
          replaced regardless, the marginal cost of connecting additional circuits is relatively
          small, which shifts the calculation towards a fuller scope of work.
        </p>
        <SEOAppBridge
          title="Price partial rewires accurately"
          description="Elec-Mate's AI Cost Engineer analyses the EICR defects, calculates materials and labour for each circuit, and generates a detailed quote. Stop guessing — price every partial rewire for profit."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'connecting-old-new',
    heading: 'Connecting Old and New Wiring',
    content: (
      <>
        <p>
          The technical challenge of a partial rewire is the interface between old and new wiring.
          Where new cables connect to existing circuits or where new circuits share a consumer unit
          with existing ones, the electrician must ensure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connection points are accessible.</strong> BS 7671 Regulation 526.3 requires
                that every connection is accessible for inspection, testing, and maintenance.
                Junction boxes must not be buried in walls or under insulation without an access
                point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable compatibility.</strong> When connecting new T&E cable to older cable
                types, the termination method must be appropriate for both conductor sizes and
                insulation types. Maintenance-free connectors (such as Wago lever connectors) in an
                accessible enclosure are commonly used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing cable condition verified.</strong> Before connecting new work to an
                existing cable, the electrician must verify the condition of the existing cable —
                continuity, insulation resistance, and correct polarity. This is part of the
                inspection and testing process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective devices are appropriate.</strong> The new consumer unit or
                existing protective devices must be rated for both the new and existing cable sizes.
                If a new RCBO protects a circuit with a mix of 2.5mm and 1.5mm cable, the rating
                must protect the smallest conductor.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A common approach is to install a new consumer unit and reconnect all circuits (both new
          and existing) to it. This ensures all circuits have RCD protection and modern MCBs or
          RCBOs, even if the final circuit cables are a mix of ages.
        </p>
      </>
    ),
  },
  {
    id: 'testing-requirements',
    heading: 'Testing Requirements for a Partial Rewire',
    content: (
      <>
        <p>
          A partial rewire requires full inspection and testing of the new work, and verification
          testing of the existing circuits that connect to or are affected by the new work. The{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>{' '}
          follows the standard order set out in BS 7671 and GN3:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Continuity of protective conductors (R1+R2)</strong> — all new circuits.
            </li>
            <li>
              <strong>Continuity of ring circuit conductors</strong> — any new ring circuits.
            </li>
            <li>
              <strong>
                <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
                  Insulation resistance
                </SEOInternalLink>
              </strong>{' '}
              — all new circuits and any existing circuits that were disturbed or reconnected.
            </li>
            <li>
              <strong>Polarity</strong> — all new circuits and connection points.
            </li>
            <li>
              <strong>Earth fault loop impedance (Zs)</strong> — all new circuits.
            </li>
            <li>
              <strong>Prospective fault current</strong> — at the origin of the installation.
            </li>
            <li>
              <strong>RCD operation</strong> — all RCDs protecting new circuits.
            </li>
          </ol>
        </div>
        <p>
          The electrician should also carry out a visual inspection of the existing circuits to
          confirm they have not been damaged during the partial rewire work. If the consumer unit
          has been replaced, all circuits (new and existing) should be tested from the new board.
        </p>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Certification and Part P Notification',
    content: (
      <>
        <p>
          A partial rewire requires an{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          for the new work. The EIC must include a schedule of inspections and a schedule of test
          results covering all new circuits and any existing circuits that were altered or
          reconnected.
        </p>
        <p>
          If the partial rewire includes new circuits (not just replacement of existing cables on
          existing circuits), the work is notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (England and Wales). The electrician must either self-certify through a competent person
          scheme or notify building control directly.
        </p>
        <p>
          A consumer unit replacement as part of a partial rewire is also notifiable. The EIC should
          cover the consumer unit and all circuits connected to it, including existing circuits that
          were reconnected.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Important:</strong> The EIC for a partial rewire should clearly describe the
              extent of the work — which circuits were replaced, which were retained, and where the
              connection points between old and new wiring are located. This information is
              essential for future inspections.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-scenarios',
    heading: 'Common Partial Rewire Scenarios',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Ground Floor Only</h4>
            <p className="text-white text-sm leading-relaxed">
              The most common partial rewire scenario. The ground floor circuits (ring main, kitchen
              circuit, lighting) are replaced with new cables run under the first-floor floorboards.
              Upstairs circuits are retained if in satisfactory condition. Consumer unit is
              typically replaced to provide RCD protection for all circuits.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Lighting Circuits Only</h4>
            <p className="text-white text-sm leading-relaxed">
              Older properties often have lighting circuits wired in 1.0mm cable with no CPC
              (circuit protective conductor) — a common C2 defect. Replacing only the lighting
              circuits with modern 1.5mm T&E cable (with CPC) addresses the defect while leaving
              satisfactory power circuits in place.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Consumer Unit and Main Tails</h4>
            <p className="text-white text-sm leading-relaxed">
              Upgrading an old fuse box to a modern consumer unit with RCBOs, plus replacing the
              main tails and meter tails if needed. This provides RCD protection for all existing
              circuits without rewiring the final circuits. Often the most cost-effective
              improvement.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Kitchen or Bathroom Circuit</h4>
            <p className="text-white text-sm leading-relaxed">
              Kitchens and bathrooms are special locations under BS 7671 and have specific
              requirements for circuit protection and IP ratings. Rewiring just the kitchen or{' '}
              <SEOInternalLink href="/guides/electrical-work-in-bathroom">
                bathroom circuits
              </SEOInternalLink>{' '}
              to meet current standards is a common partial rewire scope, particularly after a
              kitchen or bathroom refurbishment.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Partial Rewires',
    content: (
      <>
        <p>
          Partial rewires require careful scoping. Underquote and you lose money; overquote and you
          lose the job to someone recommending a full rewire. The key is a thorough initial survey
          with accurate defect identification.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR-to-Quote Pipeline</h4>
                <p className="text-white text-sm leading-relaxed">
                  Start with an EICR. Every C1 and C2 defect identifies a circuit or section that
                  needs work. Elec-Mate's remedial works estimator prices each defect — replacing a
                  circuit, upgrading a consumer unit, adding RCD protection — and generates a
                  detailed quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Accurate Material and Labour Pricing</h4>
                <p className="text-white text-sm leading-relaxed">
                  The AI Cost Engineer calculates exact material quantities (cable metres, back
                  boxes, accessories, consumer unit specification) and labour hours based on the
                  scope of work. It uses live trade pricing data and adjusts for your region.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate and Invoice on Completion</h4>
                <p className="text-white text-sm leading-relaxed">
                  When the partial rewire is complete, produce the EIC on site with voice test
                  entry, generate the invoice, and send everything to the client before leaving. No
                  desk time, no chasing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify partial rewires from your phone"
          description="Join 430+ UK electricians using Elec-Mate to turn EICR defects into priced quotes, complete EIC certificates on site, and send everything to the client instantly. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PartialRewireGuidePage() {
  return (
    <GuideTemplate
      title="Partial Rewire Guide | When Full Rewire Isn't Needed"
      description="Complete guide to partial rewires in the UK. When a partial rewire is appropriate vs a full rewire, cost comparison, connecting old and new wiring, testing requirements, Part P certification, and common scenarios."
      datePublished="2025-08-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          Partial Rewire: <span className="text-yellow-400">When a Full Rewire Is Not Needed</span>
        </>
      }
      heroSubtitle="Not every property needs a full rewire. A partial rewire targets only the defective circuits and saves 40-60% of the cost. This guide explains when a partial rewire is the right choice, how to connect old and new wiring safely, and what certification is required."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Partial Rewires"
      relatedPages={relatedPages}
      ctaHeading="Scope, Price, and Certify Rewires on Your Phone"
      ctaSubheading="From EICR survey through to EIC certificate and invoice — Elec-Mate handles the entire partial rewire workflow. AI cost engineering, voice test entry, and instant delivery. 7-day free trial."
    />
  );
}
