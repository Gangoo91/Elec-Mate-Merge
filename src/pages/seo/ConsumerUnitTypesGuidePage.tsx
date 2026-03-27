import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  PoundSterling,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Consumer Unit Types Guide', href: '/consumer-unit-types-guide' },
];

const tocItems = [
  { id: 'what-is-in-a-consumer-unit', label: 'What Is Inside a Consumer Unit' },
  { id: 'metal-clad', label: 'Metal-Clad Consumer Units — BS EN 61439-3' },
  { id: 'split-load', label: 'Split-Load Consumer Units' },
  { id: 'high-integrity', label: 'High-Integrity Consumer Units' },
  { id: 'rcbo-boards', label: 'RCBO Boards' },
  { id: 'upgrade-triggers', label: 'When to Upgrade Your Consumer Unit' },
  { id: 'costs', label: 'Costs — £300 to £900 Fitted' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Since January 2016, new and replacement consumer units installed in domestic premises in England and Wales must have a metal-clad enclosure to comply with Amendment 3 to BS 7671:2008 (now incorporated into BS 7671:2018+A3:2024). Plastic-clad consumer units are no longer acceptable for new installations in dwellings.',
  'The four main types of domestic consumer unit are: split-load (one or two RCDs protecting groups of MCBs), high-integrity (three sections: one main switch, plus two or more RCD-protected sections to prevent total supply loss from a single RCD trip), RCBO board (each circuit has its own RCBO providing individual protection), and dual RCD board (a simpler split-load variant).',
  'Upgrade triggers include: rubber-insulated wiring present in the property, rewirable fuse carriers (fuse wire), no RCD protection on any socket or outdoor circuit, a wooden consumer unit or backboard, and an EICR outcome of Unsatisfactory where the consumer unit condition is a primary cause.',
  'A consumer unit must contain at minimum: a main switch rated to isolate the entire installation, overcurrent protective devices (MCBs or RCBOs) for each circuit, and (in most domestic installations) residual current devices providing 30mA protection for socket outlet circuits under BS 7671 Regulation 411.3.3.',
  'Consumer unit replacement costs in 2024/2025 range from approximately £300 to £900 fitted for a typical domestic property, depending on the unit type, number of ways, and whether additional work (such as main bonding or earth electrode testing) is required. The cost includes the EIC and Part P Building Regulations compliance certificate.',
];

const faqs = [
  {
    question: 'Why must domestic consumer units be metal-clad?',
    answer:
      'The requirement for metal enclosures for consumer units in domestic premises was introduced by Amendment 3 to BS 7671:2008, which took effect on 1 January 2016. The requirement is now embedded in BS 7671:2018+A3:2024. The rationale is fire containment: a plastic-clad consumer unit, if an internal arc fault develops, can propagate and spread a fire. A metal-clad enclosure contains the arc and significantly reduces the risk of fire spread. The relevant standard for the consumer unit as a product is BS EN 61439-3.',
  },
  {
    question: 'What is the difference between a split-load board and an RCBO board?',
    answer:
      "A split-load consumer unit has a main switch and two RCDs (or sometimes one), each protecting a group of MCBs. If a fault occurs on any circuit in a group, all circuits in that group lose power. An RCBO board has a main switch only, with every circuit protected by its own RCBO (Residual Current Breaker with Overcurrent). If a fault occurs on one circuit, only that circuit's RCBO trips — all other circuits remain live. RCBO boards cost more than split-load boards but provide significantly better discrimination and convenience.",
  },
  {
    question: 'What is a high-integrity consumer unit?',
    answer:
      'A high-integrity consumer unit has three sections: a main switch section, and two or more RCD-protected sections. The critical circuits (usually the freezer, alarm, and heating) are placed on one RCD section and the general circuits on the other. If the general circuits RCD trips, the critical circuits section remains powered. This provides better resilience than a standard two-way split-load board where a single RCD trip can remove power from all circuits in its section. High-integrity boards are appropriate where maintaining certain circuits during a fault is a priority.',
  },
  {
    question: 'How long does a consumer unit replacement take?',
    answer:
      'A consumer unit replacement for a typical 3 to 4-bedroom domestic property takes approximately 4 to 8 hours for a qualified electrician. This includes: making the installation dead, removing the old unit, fitting the new unit, connecting all circuit cables, testing all circuits (insulation resistance, continuity, RCD trip times), and completing the Electrical Installation Certificate. Properties with many circuits, TT earthing systems, or defective wiring identified during testing will take longer. Power is off for the majority of this time.',
  },
  {
    question: 'Do I need to upgrade my consumer unit when buying a house?',
    answer:
      "You are not legally required to upgrade a consumer unit when buying a house unless a defect makes it immediately dangerous. However, if a pre-purchase EICR identifies the consumer unit as Unsatisfactory (C1 or C2 observations), remediation will be recommended or required. Many mortgage lenders and insurers now ask about the condition of the consumer unit and may require evidence of a satisfactory EICR. If the consumer unit is a rewirable fuse board with no RCD protection, upgrading it is strongly recommended on both safety and practicality grounds.",
  },
  {
    question: 'Can I do my own consumer unit replacement?',
    answer:
      "Consumer unit replacement is notifiable work under Part P of the Building Regulations in England. It can be carried out by a homeowner — Part P does not restrict who can carry out notifiable work — but it must either be notified to building control before work begins (and inspected afterwards) or carried out by a registered competent person who self-certifies the work. Consumer unit replacement involves working in close proximity to live meter tails (which the homeowner cannot de-energise), requires detailed knowledge of BS 7671, and requires appropriate test equipment and certification. In practice, this is specialist work for a qualified electrician.",
  },
  {
    question: 'What is the lifespan of a consumer unit?',
    answer:
      'A well-maintained consumer unit can last 25 to 40 years in service. However, the protective devices within it (MCBs, RCDs, RCBOs) should be tested regularly as part of an EICR programme. RCDs should be tested monthly using the integral test button and annually by a calibrated tester during EICR. Consumer units with rewirable fuse carriers, cast-iron fuse boxes, or wooden backboards are likely to be 40 to 80 years old and should be replaced regardless of apparent visual condition.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/rcbo-installation-guide',
    title: 'RCBO Installation Guide',
    description: 'Types A, B, and F RCBOs, nuisance tripping on LED circuits, and BS 7671 Regulation 531.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/smart-meter-installation',
    title: 'Smart Meter Installation',
    description: "SMETS1 vs SMETS2, DNO vs supplier roles, TT earthing, and the electrician's role.",
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description: 'Things to check when moving into a new property — RCDs, smoke detectors, meter registration.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
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
    id: 'what-is-in-a-consumer-unit',
    heading: 'What Is Inside a Consumer Unit?',
    content: (
      <>
        <p>
          A consumer unit (also called a fuse box, distribution board, or consumer control
          unit) is the central electrical distribution point for a domestic property. It
          receives the electricity supply from the meter and distributes it to individual
          circuits throughout the property. Every circuit has its own protective device within
          the consumer unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch</strong> — isolates the entire installation by
                disconnecting all live and neutral conductors simultaneously. Rated in amps
                (typically 63A or 80A for domestic) and must be accessible without tools
                for emergency use. The main switch does not disconnect the meter tails
                upstream — those remain live even with the main switch open.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs (Residual Current Devices)</strong> — in split-load consumer
                units, one or more RCDs protect groups of circuits. The RCD monitors the
                difference between the current in the live and neutral conductors; if more
                than 30mA flows to earth, it trips. RCDs are typically 30mA sensitivity
                for domestic use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs (Miniature Circuit Breakers)</strong> — one per circuit,
                providing overcurrent protection against overloads and short circuits. Rated
                in amps (typical domestic ratings: 6A lighting, 16A or 20A immersion heater,
                32A socket ring main, 32A to 40A cooker). Type B for most domestic circuits;
                Type C for high inrush loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBOs</strong> — in an RCBO board, each MCB is replaced with an
                RCBO that combines overcurrent and residual current protection. No separate
                RCDs are required. Each circuit is individually protected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Busbar</strong> — a copper conductor bar that distributes the supply
                from the main switch to all the protective devices. Each MCB or RCBO clips
                onto the busbar. Consumer units are designed around specific busbar systems
                and protective devices from the same manufacturer must be used.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-clad',
    heading: 'Metal-Clad Consumer Units — BS EN 61439-3',
    content: (
      <>
        <p>
          The requirement for metal enclosures in domestic consumer units was introduced in
          response to fire safety concerns. Internal arcing within a consumer unit — caused
          by loose connections, vermin damage, or component failure — can ignite a plastic
          enclosure. A steel or aluminium enclosure contains the arc and resists combustion.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory since January 2016</strong> — all new and replacement
                consumer units in domestic premises in England and Wales must be metal-clad.
                This requirement derives from Amendment 3 to BS 7671:2008 and is incorporated
                into BS 7671:2018+A3:2024 (the 18th Edition Wiring Regulations). Plastic
                consumer units installed before 2016 are not retrospectively illegal but
                should be replaced with a metal unit when renewal work is carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 61439-3 — the product standard</strong> — consumer units must
                comply with BS EN 61439-3 (Low-Voltage Switchgear and Controlgear Assemblies —
                Part 3: Distribution Boards Intended to be Operated by Ordinary Persons). This
                standard sets requirements for the design, construction, and testing of
                consumer units as complete assemblies. The standard also requires that protective
                devices fitted in the consumer unit are approved by the manufacturer for use
                in their specific enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Door interlocks</strong> — modern metal-clad consumer units typically
                include a cover interlock that prevents the cover being opened when the main
                switch is in the ON position, reducing the risk of accidental contact with
                live busbars. This is a safety feature for ordinary persons, not a BS 7671
                requirement but considered best practice.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate Electrical Installation Certificates for consumer unit replacements"
          description="Elec-Mate produces EICs, Minor Works Certificates, and EICRs on your phone at the job. PDF in seconds, stored in the cloud."
          ctaText="Start 7-day free trial"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'split-load',
    heading: 'Split-Load Consumer Units',
    content: (
      <>
        <p>
          The split-load consumer unit is the most common type found in UK domestic
          installations and has been the standard approach since the 17th Edition Wiring
          Regulations. It consists of a main switch, two RCDs (or occasionally one), and
          a series of MCBs divided between the two RCD sections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works</strong> — circuits are divided between two RCD
                sections. If a fault occurs on any circuit in section 1, the section 1 RCD
                trips, disconnecting all circuits in section 1. Section 2 circuits remain
                live. This is the "half-dark house" effect — a familiar problem in split-load
                boards when a faulty appliance trips one RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit allocation</strong> — the allocation of circuits between the
                two RCD sections should be planned to ensure that critical circuits (fridge,
                freezer, alarm, heating) are not all on the same RCD section. Spreading
                critical circuits across both sections reduces the impact of any single
                RCD trip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost advantage</strong> — split-load boards are cheaper than RCBO
                boards because they use standard MCBs rather than RCBOs. The materials cost
                saving is typically £50 to £150 for a domestic installation. For budget-
                conscious projects where individual circuit discrimination is not a priority,
                a split-load board remains a compliant and cost-effective solution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'high-integrity',
    heading: 'High-Integrity Consumer Units',
    content: (
      <>
        <p>
          A high-integrity consumer unit provides an additional level of protection against
          total supply loss compared with a standard split-load board. It achieves this by
          providing three sections: a main switch, and two or more RCD-protected sections
          with carefully allocated circuits so that critical loads are never all on the
          same RCD section.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical layout</strong> — Section 1 (main switch and no RCD):
                circuits that require continuous power and are not legally required to have
                30mA RCD protection (e.g. a hard-wired alarm on a dedicated circuit). In
                practice, most domestic circuits require RCD protection under Regulation
                411.3.3, so Section 1 is often just the main switch connection. Sections 2
                and 3 each have their own RCD protecting their group of MCBs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to specify a high-integrity board</strong> — for clients who
                prioritise resilience, work from home, or who have medical equipment that
                must remain live. A high-integrity board ensures that a fault on any single
                circuit leaves at least some circuits from every section live.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcbo-boards',
    heading: 'RCBO Boards — Individual Circuit Protection',
    content: (
      <>
        <p>
          An RCBO board replaces every MCB with an RCBO, eliminating the shared RCDs of
          a split-load or high-integrity board. The result is that each circuit has its
          own independent overcurrent and residual current protection. See the{' '}
          <SEOInternalLink href="/rcbo-installation-guide">
            RCBO installation guide
          </SEOInternalLink>{' '}
          for a full explanation of RCBO types and compatibility.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key advantage</strong> — a fault on any single circuit trips only
                that circuit's RCBO. Every other circuit remains unaffected. No "half-dark
                house" effect. Fault finding is straightforward — the tripped RCBO directly
                identifies the faulted circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher initial cost</strong> — RCBOs cost more than MCBs. A 10-way
                RCBO board will typically cost £80 to £150 more in materials than an
                equivalent split-load MCB board. Labour time is comparable. The operational
                advantage often justifies the additional cost, particularly for clients who
                have experienced nuisance trips affecting multiple circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specifying the correct RCBO type</strong> — Type A RCBOs for most
                domestic circuits; Type F for heat pump, EV charger supply, and inverter
                loads; Type B for specific EV charger and medical equipment applications.
                Refer to the{' '}
                <SEOInternalLink href="/rcbo-installation-guide">
                  RCBO installation guide
                </SEOInternalLink>{' '}
                for detailed type selection guidance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'upgrade-triggers',
    heading: 'When to Upgrade Your Consumer Unit',
    content: (
      <>
        <p>
          Consumer unit replacement is a significant but straightforward job for a qualified
          electrician. Several conditions make replacement strongly advisable or effectively
          mandatory.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse carriers present</strong> — old-style fuse boards with
                fuse wire are a strong indicator that the installation has not been
                significantly upgraded for 40 or more years. They provide no earth leakage
                protection and limited overcurrent protection. Always a recommendation for
                replacement on an EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated wiring throughout the property</strong> — if the
                property wiring is rubber-insulated (indicating installation pre-1970s), the
                consumer unit is almost certainly original and inadequate. A full rewire
                is likely to be required, of which consumer unit replacement is one element.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket or outdoor circuits</strong> — if none
                of the socket outlet circuits or outdoor circuits have RCD protection, the
                installation does not meet the requirements of BS 7671 Regulation 411.3.3.
                Consumer unit replacement with a split-load or RCBO board resolves this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wooden consumer unit or backboard</strong> — wooden boards were used
                in older properties and represent a fire risk. They are consistently rated
                C2 or C1 on EICR and should be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR Unsatisfactory outcome</strong> — where an EICR returns an
                Unsatisfactory result primarily because of the condition of the consumer
                unit, replacement is effectively required to restore the installation to
                a satisfactory condition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a full assessment of whether your consumer unit requires replacement, commission
          an{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR
          </SEOInternalLink>{' '}
          from a registered electrician. The EICR will identify all consumer unit deficiencies
          and recommend appropriate remediation.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Consumer Unit Replacement Costs — £300 to £900 Fitted',
    content: (
      <>
        <p>
          The cost of replacing a consumer unit depends on the unit type, the number of ways
          (circuits), and whether additional work is required such as main bonding conductor
          replacement, earth electrode testing, or remediation of identified deficiencies.
          The following are approximate 2024/2025 guide prices for England:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Split-load board (8 to 12 ways, domestic)</strong> — £300 to £500
                fitted. Includes metal-clad board, MCBs, two RCDs, main switch, EIC, and
                Part P compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO board (8 to 12 ways, domestic)</strong> — £450 to £700 fitted.
                Higher materials cost than split-load due to RCBOs replacing MCBs. Includes
                all RCBOs, metal-clad board, EIC, and Part P compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-integrity board (10 to 16 ways)</strong> — £500 to £900 fitted.
                Includes three sections, additional MCBs and RCDs, EIC, and Part P compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional works</strong> — main bonding conductor replacement (gas
                and water) adds £50 to £150. Earth electrode testing on TT systems adds £50
                to £100. Remediation of deficiencies identified during testing (e.g.
                circuit rewires, cable repairs) are priced separately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on consumer unit replacements should use{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Elec-Mate
          </SEOInternalLink>{' '}
          to generate their Electrical Installation Certificates at the job. The EIC,
          schedule of test results, and circuit chart can all be completed on a phone and
          exported to PDF for the client immediately on completion.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitTypesGuidePage() {
  return (
    <GuideTemplate
      title="Consumer Unit Types Guide — Split-Load, RCBO, High-Integrity | Elec-Mate"
      description="Complete UK guide to consumer unit types. Metal-clad enclosures required since 2016 under BS EN 61439-3, split-load, high-integrity, and RCBO boards explained. Upgrade triggers (rubber wiring, rewirable fuses, no RCD), what is inside a consumer unit, and costs of £300 to £900 fitted."
      datePublished="2024-07-01"
      dateModified="2025-03-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Types Guide{' '}
          <span className="text-yellow-400">— Split-Load, RCBO, and High-Integrity</span>
        </>
      }
      heroSubtitle="From rewirable fuse boards to modern RCBO consumer units, this guide explains every type of consumer unit found in UK domestic properties — what is inside them, when each type is appropriate, the metal-clad requirement introduced in 2016, and how much replacement costs."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Consumer Unit Types — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Generate EICs for consumer unit replacements at the job"
      ctaSubheading="Elec-Mate produces fully compliant Electrical Installation Certificates on your phone. PDF in seconds, stored in the cloud."
    />
  );
}
