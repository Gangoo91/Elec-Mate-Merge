import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  Activity,
  CheckCircle2,
  Search,
  Cable,
  FileText,
  Gauge,
  Wrench,
  SplitSquareVertical,
  Radio,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Nuisance Tripping | Why Your RCD Keeps Tripping';
const PAGE_DESCRIPTION =
  'Why does your RCD keep tripping for no apparent reason? Expert guide to nuisance tripping caused by cumulative earth leakage, Type AC RCD incompatibility with DC components, EMC interference from VFDs and LED drivers, moisture, shared neutral faults, and how to fix each cause with split load boards, Type A/F RCDs, and individual RCBOs.';

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides/troubleshooting' },
  { label: 'Nuisance Tripping', href: '/guides/nuisance-tripping' },
];

const tocItems = [
  { id: 'what-is-nuisance', label: 'What Is Nuisance Tripping?' },
  { id: 'causes', label: 'Causes of Nuisance Tripping' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'not-nuisance', label: 'When It Is Not Nuisance Tripping' },
  { id: 'elec-mate', label: 'Diagnose with Elec-Mate' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Nuisance tripping means the RCD trips without a genuine insulation fault — the total standing earth leakage from multiple healthy appliances exceeds the RCD sensitivity threshold, typically when cumulative leakage on a shared RCD exceeds approximately 10 mA (one-third of 30 mA).',
  "Upgrading from a split-load consumer unit (two RCDs) to a full RCBO board (individual RCBO per circuit) is the most effective permanent solution, as each circuit's standing leakage is isolated and well below the 30 mA threshold.",
  'A Type AC RCD on circuits supplying modern electronic equipment (LED drivers, VFDs, EV chargers, inverter appliances) can cause erratic tripping because Type AC cannot properly detect pulsating DC leakage — upgrading to Type A or Type F resolves this.',
  'Shared neutral faults (borrowed neutrals) can cause RCD tripping that appears to be nuisance tripping but is actually a wiring fault — always rule out shared neutrals before diagnosing nuisance tripping.',
  "Elec-Mate's EICR captures RCD type and trip times, the board scanner reads existing RCD/RCBO configuration, and the AI Fault Diagnosis tool helps distinguish genuine faults from nuisance tripping.",
];

const faqs = [
  {
    question: 'What is the difference between nuisance tripping and a genuine fault?',
    answer:
      'Nuisance tripping occurs when the RCD trips due to the normal standing earth leakage from multiple healthy appliances adding up to exceed the RCD sensitivity threshold. No single appliance is faulty and there is no insulation breakdown — the RCD is responding to the cumulative effect of many small, perfectly normal leakage currents. A genuine fault, by contrast, means there is actual insulation breakdown, moisture ingress, a damaged cable, or a faulty appliance creating a dangerous leakage path. The key diagnostic difference: with nuisance tripping, insulation resistance tests on all circuits will pass (above 1 MΩ), and the RCD holds with all appliances disconnected but trips when multiple appliances are reconnected. With a genuine fault, insulation resistance testing will reveal a specific circuit with a low reading, or the RCD trips with a specific single appliance connected.',
  },
  {
    question: 'How much standing leakage is normal for household appliances?',
    answer:
      'Every electrical appliance has a small amount of earth leakage during normal operation — this is called standing leakage and it is not a fault. BS EN 60335 permits standing leakage of up to 0.75 mA for Class I appliances and up to 3.5 mA for appliances with heating elements. In practice, typical standing leakage values are: washing machine 1.0 to 2.5 mA, dishwasher 1.0 to 2.0 mA, electric oven 1.5 to 3.0 mA, fridge-freezer 0.5 to 1.5 mA, tumble dryer 1.0 to 2.0 mA, computer/TV 0.5 to 1.0 mA, LED driver 0.1 to 1.0 mA. On a split-load board where one RCD protects four or five circuits, the standing leakage from all connected appliances can easily reach 10 to 15 mA. At this level, any transient event — a motor starting, a light switch being operated, a fridge compressor cycling — can push the total above 30 mA and trip the RCD.',
  },
  {
    question: 'Will upgrading to RCBOs stop nuisance tripping?',
    answer:
      'In the vast majority of cases, yes. Nuisance tripping occurs because the cumulative standing leakage from multiple circuits sharing one RCD exceeds the trip threshold. When you upgrade to individual RCBOs, each circuit has its own independent 30 mA residual current protection. The standing leakage from a single circuit — typically 1 to 5 mA — is well below the 30 mA threshold, so transient events no longer push the total over the trip point. An RCBO board also provides better discrimination: if a genuine fault develops on one circuit, only that single RCBO trips, leaving all other circuits operational. A full RCBO consumer unit upgrade typically costs between £500 and £1,200 including labour, the new board, and a full Electrical Installation Certificate (EIC) with Part P notification.',
  },
  {
    question: 'What is a Type A RCD and why does it help with nuisance tripping?',
    answer:
      'A Type A RCD detects both sinusoidal AC residual currents and pulsating DC residual currents. Modern electronic equipment — LED dimmers, inverter washing machines, computer power supplies, heat pumps, and EV chargers — can produce pulsating DC leakage during normal operation. A Type AC RCD (the older, basic type) can only detect pure sinusoidal AC leakage. When pulsating DC leakage is present, a Type AC RCD may behave unpredictably — it can fail to trip when it should, or it can trip erratically at currents below its rated sensitivity, which appears as nuisance tripping. Upgrading to a Type A RCD (now the standard for all new installations per BS 7671 Regulation 531.3.3) ensures the device can properly handle the leakage waveforms from modern electronic equipment, eliminating the erratic behaviour.',
  },
  {
    question: 'Can LED lights cause nuisance tripping?',
    answer:
      'Yes, LED lights and LED drivers are a common cause of nuisance tripping, for two reasons. First, many LED drivers have a small amount of standing earth leakage during normal operation (typically 0.1 to 1.0 mA each). On a lighting circuit with 10 to 20 LED downlighters, the cumulative leakage can reach 5 to 10 mA from the lighting circuit alone, adding significantly to the total standing leakage on the RCD. Second, some LED drivers generate high-frequency switching noise that can be interpreted as earth leakage by the RCD. Type AC RCDs are particularly susceptible to this because they respond to all AC waveforms, including high-frequency noise. Solutions include upgrading to a Type A RCD or RCBO (which is less sensitive to high-frequency noise), reducing the number of LED fittings on a single circuit, or selecting LED drivers with lower leakage specifications.',
  },
  {
    question: 'What is a shared neutral fault and can it cause nuisance tripping?',
    answer:
      "A shared neutral fault (also called a borrowed neutral or cross-connected neutral) occurs when the neutral conductor from one circuit is connected to the neutral bar or neutral conductor of a different circuit. This creates an imbalance in the current flowing through each circuit's live and neutral conductors. The RCD monitoring circuit A sees current flowing out on circuit A's live but some of it returning on circuit B's neutral — it interprets this as earth leakage and trips. Shared neutral faults are common in older installations, properties that have had multiple extensions or modifications, and DIY work. The tripping pattern is often specific — the RCD trips when certain combinations of circuits are used simultaneously. This is not nuisance tripping but a genuine wiring fault that must be corrected. See our dedicated guide on borrowed neutral faults for full diagnosis and repair instructions.",
  },
];

const sections = [
  {
    id: 'what-is-nuisance',
    heading: 'What Is Nuisance Tripping?',
    content: (
      <>
        <p>
          Nuisance tripping is the term used when a Residual Current Device (RCD) trips repeatedly
          even though there is no genuine insulation fault, no dangerous earth leakage, and no
          faulty appliance. The RCD is operating correctly — it is detecting a real imbalance
          between live and neutral currents — but the imbalance is caused by the normal standing
          leakage from multiple healthy appliances rather than a fault condition.
        </p>
        <p>
          Every electrical device leaks a tiny amount of current to earth during normal operation.
          This is called standing leakage and is entirely normal — it is caused by EMC filters,
          capacitors, and the inherent capacitance between live conductors and earthed metalwork.
          Individually, each appliance leaks far less than the 30 mA RCD threshold. However, on a
          typical split-load consumer unit where one RCD protects multiple circuits (perhaps a
          kitchen ring, a downstairs socket ring, a cooker circuit, and two or three lighting
          circuits), the standing leakage from all connected devices adds up.
        </p>
        <p>
          When the cumulative standing leakage reaches approximately 10 mA (one-third of the 30 mA
          trip threshold), the RCD becomes vulnerable to nuisance tripping. Any small transient
          event — a motor starting, a light switch being flicked, a fridge compressor cycling, an
          inrush current from a transformer — can push the instantaneous total above 30 mA for long
          enough to trigger the RCD. The occupant perceives this as "random" tripping because there
          is no consistent pattern and no single appliance causes it.
        </p>
      </>
    ),
  },
  {
    id: 'causes',
    heading: 'Causes of Nuisance Tripping',
    content: (
      <>
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SplitSquareVertical className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                1. Cumulative Earth Leakage from Multiple Circuits
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The most common cause. On a split-load consumer unit, one RCD typically protects four
              to eight circuits. Each circuit may have several appliances with standing leakage of
              0.5 to 3 mA each. With a washing machine (2 mA), dishwasher (1.5 mA), oven (2.5 mA),
              fridge-freezer (1 mA), several computers and TVs (2 mA total), and 15 LED downlighters
              (3 mA total), the cumulative standing leakage reaches approximately 12 mA — well above
              the 10 mA threshold at which nuisance tripping becomes likely. The RCD may hold for
              hours or even days, then trip when a transient event adds a few extra milliamps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                2. Type AC RCD on Circuits with DC Components
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              A Type AC RCD can only detect sinusoidal AC residual currents. Modern electronic
              equipment containing rectifiers, inverters, and switched-mode power supplies can
              produce pulsating DC or mixed-frequency residual currents during normal operation.
              When these non-sinusoidal leakage waveforms interact with a Type AC RCD, the device
              can behave unpredictably — tripping erratically at currents below its rated 30 mA, or
              failing to trip at all. Equipment that commonly causes this includes inverter washing
              machines, heat pumps, LED dimmers, variable frequency drives, computer power supplies,
              and EV chargers. BS 7671 Regulation 531.3.3 now requires Type A (or higher) RCDs for
              circuits supplying equipment likely to produce non-sinusoidal residual currents.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                3. EMC Interference from VFDs and LED Drivers
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Variable Frequency Drives (VFDs), inverter-driven motors, and some LED drivers
              generate high-frequency electrical noise as a byproduct of their switching operation.
              This noise can capacitively couple to the earth conductor, creating high-frequency
              leakage currents that the RCD interprets as genuine earth leakage. This is
              particularly common in commercial and industrial installations with large VFDs, but
              also occurs in domestic settings with inverter heat pumps, air conditioning units, and
              solar PV inverters. Solutions include using Type F RCDs (designed for
              frequency-controlled equipment), fitting EMC filters on the offending equipment, and
              ensuring proper EMC earthing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">4. Moisture</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Moisture inside electrical enclosures, junction boxes, or cable entries creates
              genuine earth leakage — but when the leakage is intermittent or just above the trip
              threshold, it can appear as nuisance tripping. The RCD may trip during rainy periods,
              in high humidity, or when condensation forms overnight in unheated spaces. This is
              technically a genuine fault (moisture creating a leakage path), not true nuisance
              tripping, but it is often misdiagnosed as nuisance tripping because the pattern seems
              random. Check all outdoor fittings, bathroom connections, and loft-mounted junction
              boxes for signs of moisture ingress.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Cable className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                5. Shared Neutral (Borrowed Neutral) Faults
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              A shared neutral fault — where the neutral from one circuit is connected to another
              circuit's neutral — causes a current imbalance that the RCD detects as earth leakage.
              The tripping typically occurs when specific combinations of circuits are used
              simultaneously (for example, the kitchen lights and the lounge sockets). This is not
              nuisance tripping but a genuine wiring fault. It is common in older installations,
              properties with extensions, and DIY work. A{' '}
              <SEOInternalLink href="/guides/borrowed-neutral-fault">
                borrowed neutral fault
              </SEOInternalLink>{' '}
              must be identified and corrected rather than masked by splitting circuits across RCDs.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'solutions',
    heading: 'Solutions for Nuisance Tripping',
    content: (
      <>
        <p>
          The correct solution depends on the cause. For cumulative leakage, the solution is to
          distribute circuits so that no single RCD carries excessive standing leakage. For RCD type
          mismatch, the solution is to upgrade the RCD type. Often, the most effective solution
          addresses both issues simultaneously.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                Upgrade to Individual RCBOs (Best Solution)
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Replacing the split-load consumer unit with a full RCBO board — where every circuit
              has its own individual RCBO — is the most effective permanent solution for nuisance
              tripping. Each circuit's standing leakage is isolated and typically well below the 30
              mA threshold (usually 1 to 5 mA per circuit). Transient events on one circuit cannot
              combine with standing leakage from other circuits to cause a trip. If a genuine fault
              does develop on one circuit, only that single RCBO trips — all other circuits remain
              operational. This also provides much better discrimination than a two-RCD split-load
              board. Cost is typically £500 to £1,200 including a new consumer unit, RCBOs, labour,
              and certification (EIC with Part P notification required).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SplitSquareVertical className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                Split Load Board — Redistribute Circuits
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If a full RCBO upgrade is not within budget, redistributing circuits across the
              existing two RCDs can reduce the cumulative leakage per RCD. Move high-leakage
              circuits (kitchen ring, washing machine radial) to spread them across both RCDs rather
              than having all high-leakage circuits on one side. Some consumer units allow a third
              RCD to be fitted, creating a three-way split that further distributes the load. This
              is a less effective solution than individual RCBOs but can resolve the immediate
              problem at lower cost.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Upgrade to Type A or Type F RCD</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If the nuisance tripping is caused by DC leakage from electronic equipment interacting
              with a Type AC RCD, upgrading to a Type A RCD (handles pulsating DC) or Type F RCD
              (handles frequency-controlled equipment) often resolves the problem completely. Type A
              is now the standard for all new domestic installations. Type F is recommended for
              circuits supplying heat pumps, inverter washing machines, and air conditioning units.
              This can be a simple swap if the consumer unit accepts the same form factor — no full
              rewire required.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Identify High-Leakage Appliances</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Using a clamp meter capable of measuring milliamp-level earth leakage (most modern
              clamp meters can do this), measure the standing leakage of each appliance
              individually. Identify which appliances contribute the most to cumulative leakage.
              Replacing a single high-leakage appliance (an old washing machine with 3 mA standing
              leakage, for example) can sometimes reduce the total below the nuisance tripping
              threshold. This is a diagnostic step rather than a permanent solution, but it can
              provide immediate relief while a board upgrade is planned.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'not-nuisance',
    heading: 'When It Is Not Nuisance Tripping — Genuine Intermittent Faults',
    content: (
      <>
        <p>
          Not every unexplained RCD trip is nuisance tripping. Some genuine faults produce
          intermittent symptoms that can be mistaken for nuisance tripping. Before concluding that
          the problem is cumulative leakage, rule out these genuine fault conditions:
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Intermittent earth faults.</strong> A cable with
              partially damaged insulation may only leak when it is under load (thermal expansion),
              when it is vibrated (by a washing machine or nearby traffic), or when conditions
              change (temperature, humidity). The leakage is real but intermittent — carry out{' '}
              <SEOInternalLink href="/guides/insulation-resistance-testing">
                insulation resistance testing
              </SEOInternalLink>{' '}
              on every circuit to check for borderline readings (1 to 2 MΩ) that may indicate
              deteriorating insulation.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Moisture ingress.</strong> As described above, moisture
              in outdoor fittings, bathroom connections, or loft-mounted junction boxes causes
              genuine earth leakage that varies with weather, season, and humidity. Check all
              external and damp-area connections.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Shared neutral (borrowed neutral).</strong> A{' '}
              <SEOInternalLink href="/guides/borrowed-neutral-fault">
                borrowed neutral
              </SEOInternalLink>{' '}
              causes current imbalance that the RCD detects as earth leakage. The tripping pattern
              is typically linked to specific combinations of circuits being used simultaneously —
              e.g., the RCD trips when the kitchen lights and lounge sockets are both in use, but
              holds when either is used alone. This is a wiring fault, not nuisance tripping.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Faulty RCD.</strong> The RCD itself can become
              oversensitive due to internal component degradation, tripping at currents well below
              30 mA. Test the RCD at half-rated current (15 mA) — if it trips at half-rated, the
              device is faulty and must be replaced.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="AI Fault Diagnosis"
          description="Describe the tripping pattern to Elec-Mate's AI diagnostic agent — when it happens, which circuits are in use, whether it correlates with weather — and the AI helps distinguish genuine intermittent faults from nuisance tripping. It cross-references your symptoms against known fault patterns to guide your diagnosis."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Diagnose and Document with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate provides several features that help electricians diagnose nuisance tripping,
          document findings, and recommend the appropriate solution.
        </p>
        <SEOAppBridge
          title="EICR — RCD Type and Trip Times"
          description="Elec-Mate's digital EICR form captures the RCD type (AC, A, F, B), rated residual current, and measured trip times at rated current and five times rated current. Non-compliant trip times are flagged automatically. The form also records the circuit configuration, making it easy to identify split-load boards with excessive circuits per RCD."
          icon={ClipboardCheck}
        />
        <SEOAppBridge
          title="Board Scanner — Read Existing RCD/RCBO Configuration"
          description="Point your phone at the consumer unit and Elec-Mate's AI reads every device — MCBs, RCDs, RCBOs — identifying types, ratings, and circuit allocations. Instantly see how circuits are distributed across RCDs and identify boards with too many circuits on a single RCD."
          icon={Gauge}
        />
        <p>
          The{' '}
          <SEOInternalLink href="/guides/ai-tools-for-electricians">Defect Code AI</SEOInternalLink>{' '}
          classifies nuisance tripping findings with the appropriate observation code and suggests
          remedial actions. The{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> documents the
          findings professionally, providing the client with clear evidence of why an upgrade is
          recommended.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description: 'Complete guide to RCD tripping — covers both nuisance and genuine fault causes.',
    icon: ShieldCheck,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/borrowed-neutral-fault',
    title: 'Borrowed Neutral Fault',
    description: 'How shared neutrals cause RCD tripping that mimics nuisance tripping.',
    icon: Cable,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/circuit-breaker-keeps-tripping',
    title: 'Circuit Breaker Keeps Tripping',
    description: 'When the MCB trips instead — overload and short circuit diagnosis.',
    icon: Zap,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description: 'Rule out genuine insulation faults before diagnosing nuisance tripping.',
    icon: Gauge,
    category: 'Testing',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate',
    description: 'Document nuisance tripping findings and recommended upgrades on the EICR.',
    icon: FileText,
    category: 'Certification',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'BS 7671 requirements for consumer units, RCD protection, and RCBO boards.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NuisanceTrippingPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-10-15"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Nuisance Tripping?
          <br />
          <span className="text-yellow-400">Why Your RCD Keeps Tripping for No Reason</span>
        </>
      }
      heroSubtitle="Your RCD trips repeatedly but there is no apparent fault — no faulty appliance, no damaged wiring, no moisture. This is nuisance tripping, and it is one of the most common complaints electricians encounter. This guide explains every cause and the solutions that actually work."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Diagnose RCD Issues Faster with Elec-Mate"
      ctaSubheading="Board scanner, AI fault diagnosis, RCD testing capture, and digital EICR forms. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
