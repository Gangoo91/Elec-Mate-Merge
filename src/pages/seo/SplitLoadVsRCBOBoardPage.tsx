import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  Calculator,
  FileCheck2,
  AlertTriangle,
  Zap,
  Wrench,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Split Load vs RCBO Consumer Unit', href: '/guides/split-load-vs-rcbo-consumer-unit' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'split-load', label: 'Split Load Consumer Units' },
  { id: 'rcbo-board', label: 'RCBO Consumer Units' },
  { id: 'bs7671-requirements', label: 'BS 7671 Requirements' },
  { id: 'nuisance-tripping', label: 'Nuisance Tripping and Discrimination' },
  { id: 'cost-comparison', label: 'Cost and Installation Comparison' },
  { id: 'which-to-choose', label: 'Which to Choose?' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A split load consumer unit has two or more RCDs protecting groups of circuits. All circuits in each group share a single RCD — if a fault occurs on any circuit in the group, the RCD trips and all circuits in the group lose power.',
  'An RCBO (Residual Current Breaker with Overcurrent) consumer unit uses individual RCBOs for every circuit. Each circuit has its own combined overcurrent and residual current protection — a fault on one circuit trips only that circuit.',
  'BS 7671:2018+A3:2024 Regulation 314.1 requires that the consumer unit is divided into circuits to avoid danger and inconvenience in the event of a fault. The RCBO approach provides superior circuit independence and fault discrimination.',
  'Nuisance tripping — where an RCD trips due to accumulated earth leakage current from multiple healthy circuits — is a significant problem with split load consumer units. RCBO boards eliminate this problem by isolating fault current to a single circuit.',
  'RCBO consumer units cost more in materials but provide better protection, easier fault finding, and greater resilience. They are the preferred choice for new domestic installations and replacements under BS 7671:2018+A3:2024.',
];

const faqs = [
  {
    question: 'What is the difference between a split load and an RCBO consumer unit?',
    answer:
      'A split load consumer unit contains two or more 30mA RCDs, each protecting a group of circuits. The MCBs within each group provide overcurrent protection, whilst the common RCD provides residual current (earth fault) protection for all circuits in that group. If a fault occurs on any circuit, the common RCD trips, cutting power to every circuit in the group. An RCBO consumer unit uses individual RCBOs — Residual Current Breakers with Overcurrent — for each circuit. Each RCBO provides both overcurrent protection (like an MCB) and residual current protection (like an RCD) for that individual circuit only. A fault on any circuit trips only that circuit\'s RCBO, leaving all other circuits unaffected.',
  },
  {
    question: 'What does BS 7671 Regulation 314.1 require about consumer unit circuit division?',
    answer:
      'BS 7671:2018+A3:2024 Regulation 314.1 states that every installation shall be divided into circuits as necessary to: (a) avoid danger and minimise inconvenience in the event of a fault; (b) facilitate safe inspection, testing, and maintenance; (c) take account of danger that may arise from the failure of a single circuit (such as a lighting circuit supplying a stairway). The RCBO approach — providing individual protection per circuit — better satisfies requirement (a): avoiding inconvenience in the event of a fault. A split load board where a fault on the kitchen circuit also kills the hallway lighting satisfies the regulation technically but not in the spirit of best practice.',
  },
  {
    question: 'What causes nuisance tripping on a split load consumer unit?',
    answer:
      'Nuisance tripping occurs when the accumulated earth leakage current from multiple healthy circuits exceeds the trip threshold of the shared RCD. Every circuit has a small inherent leakage to earth from cable capacitance, appliance EMC filters, and other sources. A single circuit may leak 1–3mA; perfectly healthy. But a group of 10 circuits sharing one RCD may have a combined leakage of 10–30mA — enough to approach or exceed the 30mA trip threshold. Any additional leakage (from an ageing appliance, a damp environment, or a long cable run) can cause the RCD to trip even though no actual fault exists. An RCBO board eliminates this problem: each circuit\'s individual RCBO only sees the leakage from that one circuit.',
  },
  {
    question: 'Is a split load consumer unit still acceptable under BS 7671?',
    answer:
      'Yes, a split load consumer unit remains compliant with BS 7671:2018+A3:2024. The regulations do not mandate RCBO protection for every circuit — they require appropriate RCD protection for the circuits that need it (Regulation 411.3.3 and 411.3.4). A split load board with the circuits allocated correctly across the RCD groups (critical circuits such as freezer and security alarm on separate RCD groups from general circuits) meets the requirements. However, BS 7671 Appendix 15 and the guidance in the On-Site Guide note that RCBO protection per circuit is the preferred approach for new installations due to the improved selectivity (discrimination) and fault isolation.',
  },
  {
    question: 'How many ways should circuits be split in a split load consumer unit?',
    answer:
      'There is no single prescribed maximum number of circuits per RCD in BS 7671 — the limit is practical: the combined earth leakage current from all circuits on one RCD must not approach the RCD trip threshold under normal operating conditions. As a practical limit, most installers use a maximum of 8–10 circuits per RCD in a split load board. For properties with high earth leakage (many appliances with EMC filters, long cable runs, old appliances), fewer circuits per RCD is advisable to reduce the risk of nuisance tripping. Circuits that must not lose supply unexpectedly — freezer, security alarm, medical equipment — should be on a dedicated RCD group or individual RCBO regardless of the board type.',
  },
  {
    question: 'What happens when an RCBO trips?',
    answer:
      'When an RCBO trips — either on overcurrent or residual current — the lever moves to a mid position (between on and off), indicating a trip rather than a manual off. The affected circuit loses supply whilst all other circuits remain energised. To reset: investigate and resolve the fault, then push the RCBO lever to the off position fully before switching it back on. An RCBO cannot be reset whilst the fault condition persists — if the RCBO immediately re-trips after reset, the fault is still present on the circuit and must be investigated further using insulation resistance testing (500V DC, minimum 1MΩ between all live conductors and earth).',
  },
  {
    question: 'What is the cost difference between a split load and an RCBO consumer unit?',
    answer:
      'An RCBO consumer unit costs more in materials than a split load equivalent because individual RCBOs are more expensive than MCBs. A 10-way RCBO consumer unit from a reputable manufacturer (Hager, Schneider, Legrand) costs approximately £180–£350 in materials. The equivalent split load (2-way RCD + MCBs) costs approximately £80–£150. The material cost difference is typically £100–£200 for a standard domestic consumer unit. However, the RCBO option reduces call-back costs when nuisance tripping occurs, simplifies fault finding, and is more likely to satisfy a periodic inspection. Most electricians now install RCBO boards as standard for all new domestic consumer units — the marginal material cost is justified by the better performance and reduced nuisance tripping complaints.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for all circuits in the consumer unit with correct RCBO protection.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC certificates for consumer unit installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to BS 7671:2018+A3:2024 including consumer unit requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study consumer unit testing, RCD and RCBO testing for C&G 2391.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Split Load vs RCBO Consumer Unit: Which Should You Install?',
    content: (
      <>
        <p>
          Consumer unit specification is one of the most common design decisions for UK domestic
          electricians. The choice between a split load consumer unit (with grouped RCDs) and a
          full RCBO consumer unit (with individual RCBOs per circuit) affects fault protection,
          nuisance tripping, cost, and how the installation performs for the customer over its
          lifetime.
        </p>
        <p>
          Both types meet the requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , but the industry trend is firmly towards RCBO boards for all new domestic consumer
          unit installations. This guide explains why — and when a split load board may still
          be the appropriate choice.
        </p>
      </>
    ),
  },
  {
    id: 'split-load',
    heading: 'Split Load Consumer Units: How They Work',
    content: (
      <>
        <p>
          A split load consumer unit divides circuits into two or more groups, each protected
          by a shared 30mA RCD. Within each group, individual MCBs provide overcurrent protection.
          The RCD provides residual current (earth fault) protection for all circuits in that group.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">Typical Split Load Layout</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• <strong>Main switch:</strong> 100A double pole isolator</li>
            <li>• <strong>RCD 1:</strong> 30mA 80A, protecting circuits 1–6 (e.g. ring final, cooker, immersion)</li>
            <li>• <strong>RCD 2:</strong> 30mA 80A, protecting circuits 7–12 (e.g. lighting, garage, boiler)</li>
            <li>• <strong>MCBs:</strong> Individual overcurrent protection within each group</li>
            <li>• Fault on any circuit in RCD 1 group → all RCD 1 circuits lose supply</li>
          </ul>
        </div>
        <p>
          The split load approach was the standard for UK consumer units from the introduction
          of the 17th Edition (2008) until RCBO boards became more cost-competitive. It remains
          a valid and compliant approach, but nuisance tripping and poor fault discrimination
          are well-recognised limitations.
        </p>
      </>
    ),
  },
  {
    id: 'rcbo-board',
    heading: 'RCBO Consumer Units: Individual Protection Per Circuit',
    content: (
      <>
        <p>
          An RCBO (Residual Current Breaker with Overcurrent) combines the functions of an MCB
          and an RCD in a single device. Each circuit in the consumer unit has its own RCBO,
          providing both overcurrent protection (MCB function) and 30mA residual current
          protection (RCD function) independently.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">RCBO Consumer Unit Advantages</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Fault on one circuit trips only that circuit — all others remain live</li>
            <li>• Eliminates nuisance tripping from accumulated leakage across multiple circuits</li>
            <li>• Easier fault finding — the tripped RCBO identifies the faulty circuit immediately</li>
            <li>• Better compliance with BS 7671 Regulation 314.1 (circuit independence)</li>
            <li>• Preferred approach recommended in BS 7671 and the On-Site Guide</li>
          </ul>
        </div>
        <SEOAppBridge
          title="Complete EIC certificates for consumer unit replacements"
          description="Elec-Mate's EIC certificate app captures all board details: RCBO specifications, circuit descriptions, test results, and board photos. Generate compliant PDF certificates on site."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Requirements for Consumer Units',
    content: (
      <>
        <p>
          The key BS 7671 regulations governing consumer unit design are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 314.1</strong> — every installation shall be divided into
                circuits as necessary to avoid danger and minimise inconvenience in the event
                of a fault. RCBO boards better satisfy this requirement than split load boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.4</strong> — in domestic (household) premises, all
                socket outlet circuits not exceeding 32A and all circuits in bathrooms must
                be protected by a 30mA RCD. RCBO boards comply automatically; split load
                boards must ensure these circuits are in an RCD group.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 531.3</strong> — RCDs shall be selected and installed to
                minimise the risk of unwanted tripping and to ensure that only the protective
                device associated with the fault operates. This is the discrimination requirement
                — RCBO boards provide inherently better discrimination than split load boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 421.1.201</strong> — consumer units in domestic premises
                must have a non-combustible enclosure (metal or thermoplastic with a metal
                insert). Applies to both split load and RCBO board types.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nuisance-tripping',
    heading: 'Nuisance Tripping and Discrimination',
    content: (
      <>
        <p>
          Nuisance tripping is the most common complaint about split load consumer units. It
          occurs when healthy circuits have combined earth leakage current approaching the 30mA
          trip threshold of the shared RCD:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-2">Common Causes of Nuisance Tripping</p>
              <ul className="space-y-1 text-white text-sm">
                <li>• Long cable runs — capacitive leakage increases with cable length</li>
                <li>• Appliances with EMC filter capacitors (washing machines, dishwashers, computers)</li>
                <li>• Older appliances with degraded insulation — increased leakage without actual fault</li>
                <li>• Damp environments — higher leakage through cable insulation</li>
                <li>• Solar PV inverters and EV chargers — may have significant leakage by design</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          An RCBO board eliminates nuisance tripping from accumulated leakage because each
          RCBO only measures the leakage from its own single circuit. The leakage from a
          healthy washing machine (2–3mA) is far below the 30mA trip threshold of its
          individual RCBO, even if 20 other circuits have similar leakage.
        </p>
      </>
    ),
  },
  {
    id: 'cost-comparison',
    heading: 'Cost and Installation Comparison',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 pr-4 font-bold">Factor</th>
                <th className="text-left py-2 pr-4 font-bold">Split Load</th>
                <th className="text-left py-2 font-bold">RCBO Board</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Material cost (10-way)</td>
                <td className="py-2 pr-4">£80–£150</td>
                <td className="py-2">£180–£350</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Installation time</td>
                <td className="py-2 pr-4">Similar</td>
                <td className="py-2">Similar</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Nuisance tripping risk</td>
                <td className="py-2 pr-4 text-red-400">Higher</td>
                <td className="py-2 text-green-400">Minimal</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Fault discrimination</td>
                <td className="py-2 pr-4 text-red-400">Group level only</td>
                <td className="py-2 text-green-400">Individual circuit</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Preferred by BS 7671</td>
                <td className="py-2 pr-4">Compliant</td>
                <td className="py-2 text-green-400">Preferred</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'which-to-choose',
    heading: 'Which Consumer Unit to Choose?',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Consider Split Load When:</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Budget is very tight and client declines RCBO upgrade</li>
              <li>• Extending an existing split load board (matching protection type)</li>
              <li>• Simple low-circuit-count installation with low leakage risk</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Choose RCBO Board For:</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• All new domestic consumer unit installations</li>
              <li>• Properties with EV chargers, solar PV, heat pumps (high leakage)</li>
              <li>• Older properties where nuisance tripping is likely</li>
              <li>• Clients who work from home (cannot afford power loss)</li>
              <li>• All rewires — best practice and standard specification</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Consumer Unit Replacement Best Practice',
    content: (
      <>
        <p>
          Consumer unit replacement is one of the most common domestic electrical jobs. Always
          carry out an EICR condition check on the existing installation before fitting a new
          consumer unit — defects in the existing circuits (particularly high Zs values or
          failed insulation resistance tests) must be rectified before the new board is
          energised. The EIC for the new consumer unit is your certification of the new work,
          not the existing wiring.
        </p>
        <SEOAppBridge
          title="Complete EIC certificates for consumer unit replacements"
          description="Elec-Mate's EIC app is optimised for consumer unit replacements: board scan to capture circuit details, schedule of test results for all circuits, and professional PDF certificate for the customer. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SplitLoadVsRCBOBoardPage() {
  return (
    <GuideTemplate
      title="Split Load vs RCBO Consumer Unit | BS 7671 Guide UK"
      description="Complete guide to split load vs RCBO consumer units for UK electricians. BS 7671 Regulation 314.1 requirements, nuisance tripping causes and solutions, cost comparison, and when to specify each type for domestic installations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Consumer Unit Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Split Load vs RCBO Consumer Unit:{' '}
          <span className="text-yellow-400">Which to Install and Why</span>
        </>
      }
      heroSubtitle="RCBO boards provide individual circuit protection — a fault on one circuit trips only that circuit. Split load boards protect circuits in groups — one fault can kill multiple circuits. This guide explains the technical differences, BS 7671 requirements, nuisance tripping, and cost comparison."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Split Load vs RCBO Consumer Unit"
      relatedPages={relatedPages}
      ctaHeading="Certify Consumer Unit Replacements on Your Phone"
      ctaSubheading="Elec-Mate's EIC app handles consumer unit replacement certificates: board scan, circuit schedules, test results, and PDF export. 7-day free trial, cancel anytime."
    />
  );
}
