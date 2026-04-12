import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Settings,
  Info,
  ClipboardCheck,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Wiring Guides', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Circuit Breaker Types UK', href: '/circuit-breaker-types' },
];

const tocItems = [
  { id: 'what-is-circuit-breaker', label: 'What Is a Circuit Breaker?' },
  { id: 'mcb', label: 'MCB — Miniature Circuit Breaker' },
  { id: 'mccb', label: 'MCCB — Moulded Case Circuit Breaker' },
  { id: 'rccb', label: 'RCCB — Residual Current Circuit Breaker' },
  { id: 'rcbo', label: 'RCBO — Combined MCB and RCD' },
  { id: 'mcb-types', label: 'MCB Curve Types: B, C and D' },
  { id: 'breaking-capacity', label: 'Breaking Capacity and Fault Levels' },
  { id: 'selecting', label: 'Selecting the Right Device' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'MCBs (Miniature Circuit Breakers) provide overcurrent protection for individual circuits in domestic and light commercial consumer units — they do not provide earth-fault (RCD) protection.',
  'MCCBs (Moulded Case Circuit Breakers) are used in larger commercial and industrial installations where higher fault current ratings and adjustable trip settings are required.',
  'RCCBs (Residual Current Circuit Breakers) provide earth-fault protection only — they must always be used with separate MCBs for complete circuit protection.',
  'RCBOs combine MCB and RCD functions in one device, providing both overcurrent and 30mA earth-fault protection for a single circuit.',
  'MCB curve type (B, C or D) determines the instantaneous trip threshold — Type B for domestic, Type C for commercial/light industrial, Type D for high inrush loads.',
  'Breaking capacity must exceed the prospective fault current at the point of installation — always measure with a PFC meter before specifying devices.',
];

const faqs = [
  {
    question: 'What is the difference between an MCB and a fuse?',
    answer:
      'Both MCBs and fuses provide overcurrent protection, but they work differently and have different characteristics. A fuse operates by melting a fusible element when the current exceeds a threshold — once blown, it must be replaced. An MCB uses an electromagnetic trip (for short-circuit protection) and a bimetallic strip (for overload protection) and can be reset by hand after the fault is cleared. MCBs are preferred in modern installations because they are resettable, have more predictable trip characteristics, and allow the cause of the trip to be investigated before resetting.',
  },
  {
    question: 'What does MCB curve type B, C or D mean?',
    answer:
      'The MCB curve type defines the instantaneous magnetic trip threshold — the multiple of rated current at which the device trips almost instantaneously (within milliseconds) to handle short-circuit conditions. Type B trips instantaneously at 3 to 5 times rated current, making it suitable for domestic circuits with resistive loads (lighting, sockets). Type C trips at 5 to 10 times rated current, suitable for commercial circuits with moderate inrush loads (fluorescent lighting, small motors). Type D trips at 10 to 20 times rated current, used for high inrush loads such as transformers, large motors, and welding equipment.',
  },
  {
    question: 'When is an MCCB used instead of an MCB?',
    answer:
      'MCCBs are used where the fault current or load current exceeds the ratings available in MCB format, or where adjustable trip settings are required. Standard domestic MCBs are available up to 125A and have fixed breaking capacities typically up to 10kA. MCCBs are available from 16A to 1,600A or more, with breaking capacities up to 150kA, and often feature adjustable thermal and magnetic trip settings. They are common as main incoming protective devices in commercial distribution boards, sub-main isolators, and industrial motor control.',
  },
  {
    question: 'Does an MCB provide RCD (earth-fault) protection?',
    answer:
      'No. A standard MCB provides overcurrent protection only — it will trip on overload and short-circuit conditions but cannot detect earth faults (current leaking to earth through a person or fault path). RCD protection requires a separate RCCB, an RCBO (which combines MCB and RCD), or a socket-outlet RCD (SRCD). BS 7671 18th Edition requires 30mA RCD additional protection for socket-outlet circuits rated up to 20A, so MCBs alone are not sufficient for those circuits.',
  },
  {
    question: 'What breaking capacity do I need for a domestic consumer unit?',
    answer:
      'For most domestic consumer units in the UK, a breaking capacity of 6kA is sufficient. UK prospective fault currents at the meter position are typically in the range of 1kA to 6kA for most domestic supplies. However, on large commercial sites, near substations, or on TN-S systems with low earth loop impedance, fault currents can exceed 6kA. Always measure the prospective fault current (PFC) at the incoming supply and select devices with a breaking capacity at least equal to or greater than the measured PFC.',
  },
  {
    question: 'Can I mix MCB brands in a consumer unit?',
    answer:
      'Generally, no. MCBs in a consumer unit must be compatible with the busbar system and the board manufacturer\'s specifications. Mixing manufacturers within the same board is not recommended and can void certifications and warranties. Some manufacturers produce "compatible" MCBs that fit rival boards, but these should only be used if explicitly confirmed as compatible. When replacing individual MCBs, always use the same manufacturer and range as the existing board, or replace the entire board.',
  },
  {
    question: 'What is the difference between a 6kA and 10kA MCB?',
    answer:
      'These figures refer to the rated short-circuit breaking capacity — the maximum fault current the device can safely interrupt without damage or hazard. A 6kA MCB can safely clear fault currents up to 6,000 amperes, while a 10kA MCB can clear up to 10,000 amperes. For domestic installations with measured prospective fault currents below 6kA (which covers the vast majority of UK homes), 6kA MCBs are adequate. On commercial supplies, substation-adjacent sites, or where PFC measurements exceed 6kA, 10kA or higher devices must be specified.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/rcd-types-guide',
    title: 'RCD Types UK Guide',
    description:
      'RCCB, RCBO, SRCD and RCDM explained with BS 7671 requirements and selection guidance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/earthing-systems-guide',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing systems explained with practical examples.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and common defects.',
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
    id: 'what-is-circuit-breaker',
    heading: 'What Is a Circuit Breaker?',
    content: (
      <>
        <p>
          A circuit breaker is an automatically operated electrical switch designed to protect a
          circuit from damage caused by excess current, typically resulting from an overload or a
          short circuit. Unlike a fuse, which must be replaced after it operates, a circuit breaker
          can be reset — either manually or automatically — to resume normal operation after the
          fault has been identified and cleared.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overload protection</strong> — a circuit breaker will trip after a sustained
                period of overcurrent (e.g. too many appliances on one circuit), protecting cables
                from overheating. The thermal element of the breaker heats up proportionally to the
                excess current and trips when the temperature threshold is reached.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short-circuit protection</strong> — the electromagnetic element of a circuit
                breaker trips almost instantaneously (within milliseconds) when a short-circuit
                current is detected, preventing damage to wiring and equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not RCD protection</strong> — standard circuit breakers (MCBs and MCCBs) do
                not detect earth-fault currents. RCD protection must be provided separately unless
                an RCBO is used. See the{' '}
                <SEOInternalLink href="/rcd-types-guide">RCD types guide</SEOInternalLink> for full
                details.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In UK electrical installations governed by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>, the
          main types of circuit breaker used are MCBs, MCCBs, RCCBs, and RCBOs. Each has specific
          applications and characteristics that determine where it should be used.
        </p>
      </>
    ),
  },
  {
    id: 'mcb',
    heading: 'MCB — Miniature Circuit Breaker',
    content: (
      <>
        <p>
          The MCB (Miniature Circuit Breaker) is the standard protective device for individual final
          circuits in UK domestic and light commercial consumer units. MCBs are compact
          single-module devices that provide both overload and short-circuit protection for a single
          circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current ratings</strong> — MCBs for domestic use are typically available in
                6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A, and 100A. Standard final circuits use:
                6A for lighting, 32A for ring final circuits (sockets), 32A to 40A for cookers, 16A
                or 20A for dedicated circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Breaking capacity</strong> — standard domestic MCBs have a breaking capacity
                of 6kA, which is sufficient for most UK domestic supplies. Higher breaking capacity
                MCBs (10kA) are available for commercial applications or where prospective fault
                current is higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD function</strong> — MCBs provide overcurrent protection only. For
                circuits requiring 30mA additional protection (socket outlets, bathrooms, outdoor
                circuits), either an RCBO must replace the MCB, or an upstream RCCB must be used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 60898</strong> — UK MCBs are manufactured to BS EN 60898, which
                defines the performance requirements, trip characteristics, and marking for
                miniature circuit breakers for household and similar installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mccb',
    heading: 'MCCB — Moulded Case Circuit Breaker',
    content: (
      <>
        <p>
          An MCCB (Moulded Case Circuit Breaker) is a larger, more powerful circuit breaker used in
          commercial, industrial, and large residential installations. MCCBs can handle higher
          current ratings, have greater breaking capacities, and often feature adjustable trip
          settings that make them suitable as main incoming protection or sub-main protection in
          large distribution systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher current ratings</strong> — MCCBs are available from around 16A up to
                1,600A or more, making them suitable as main switches for commercial distribution
                boards, sub-main circuit protection for large loads, and incoming protection for
                industrial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adjustable trip settings</strong> — unlike fixed MCBs, MCCBs often have
                adjustable thermal and magnetic trip settings. This allows the protection
                characteristic to be tailored to the connected load, improving selectivity and
                reducing nuisance tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher breaking capacity</strong> — MCCBs are available with breaking
                capacities from 16kA up to 150kA, essential for installations near transformer
                secondary sides where fault currents can be very high.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase versions</strong> — MCCBs are commonly available in three-pole
                (three-phase) and four-pole (three-phase plus neutral) configurations, making them
                essential for three-phase commercial and industrial distribution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rccb',
    heading: 'RCCB — Residual Current Circuit Breaker',
    content: (
      <>
        <p>
          An RCCB (Residual Current Circuit Breaker) provides earth-fault protection for a group of
          circuits. It does not provide overcurrent protection and must always be used in
          conjunction with individual MCBs. In a split-load consumer unit, an RCCB typically
          protects half the board's circuits from earth faults while individual MCBs on each way
          provide overcurrent protection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth-fault protection only</strong> — the RCCB detects residual current
                (the difference between live and neutral currents) and trips when the imbalance
                exceeds the rated threshold. It does not respond to overload or short-circuit
                conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping</strong> — because one RCCB may protect 8 or more
                circuits, a fault on any single circuit trips all protected circuits. This is a
                significant disadvantage compared to individual RCBOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sensitivity ratings</strong> — RCCBs are available at 30mA (personal
                protection), 100mA, and 300mA (fire protection). For domestic socket-outlet
                circuits, 30mA is required by BS 7671 18th Edition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a detailed explanation of all RCD types including SRCDs and RCDMs, see the{' '}
          <SEOInternalLink href="/rcd-types-guide">RCD types UK guide</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'rcbo',
    heading: 'RCBO — Combined MCB and RCD in One Device',
    content: (
      <>
        <p>
          An RCBO (Residual Current Breaker with Overcurrent protection) is a single-module device
          that combines the functions of an MCB and a 30mA RCD. Each RCBO provides both overcurrent
          protection and earth-fault protection for one individual circuit, eliminating the need for
          a separate upstream RCCB for that circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per-circuit isolation</strong> — a fault on one circuit trips only that
                RCBO, leaving all other circuits unaffected. This eliminates the nuisance tripping
                problem inherent in RCCB-based designs and is a major benefit for domestic
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher cost per device</strong> — an RCBO costs three to five times more
                than an equivalent MCB. However, when the cost of the RCCB is removed from the
                calculation, an all-RCBO board is typically only £150 to £300 more expensive than a
                split-load RCCB/MCB board for a typical domestic installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD type selection</strong> — RCBOs come in Type AC, Type A, and Type B
                variants. Type A is now recommended as standard for domestic installations. Type B
                is required for certain EV charging circuits and equipment with smooth DC residual
                current components.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcb-types',
    heading: 'MCB Curve Types: B, C and D Explained',
    content: (
      <>
        <p>
          The MCB curve type defines the instantaneous magnetic trip threshold — the multiple of the
          rated current at which the device trips almost instantaneously to clear a short circuit.
          Choosing the correct curve type is essential: too sensitive and the breaker nuisance-trips
          on inrush currents; not sensitive enough and the breaker fails to provide adequate
          protection against shock and fire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B — 3 to 5 × In</strong> — trips instantaneously at 3 to 5 times rated
                current. Used for domestic circuits with resistive and slightly inductive loads:
                lighting circuits, socket-outlet circuits, immersion heaters, electric showers. The
                standard choice for most domestic final circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type C — 5 to 10 × In</strong> — trips instantaneously at 5 to 10 times
                rated current. Used for commercial circuits with moderate inrush loads: fluorescent
                and LED lighting banks, small motors, power supplies, and HVAC equipment. Common in
                commercial and light industrial distribution boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type D — 10 to 20 × In</strong> — trips instantaneously at 10 to 20 times
                rated current. Used for high inrush loads: large motors (star-delta starting),
                transformers, welding equipment, and UPS systems where the inrush current at
                switch-on would otherwise trip a Type B or C breaker.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Impact on earth loop impedance</strong> — higher curve types require a lower
                earth loop impedance (Zs) to ensure the breaker trips within the required
                disconnection time under fault conditions. Always verify that the measured Zs meets
                the maximum Zs value for the MCB type and rating in use.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'breaking-capacity',
    heading: 'Breaking Capacity and Prospective Fault Current',
    content: (
      <>
        <p>
          Breaking capacity is the maximum fault current a circuit breaker can safely interrupt
          without damage, expressed in kiloamperes (kA). Selecting a device with insufficient
          breaking capacity can result in catastrophic failure during a fault — the device may be
          unable to clear the fault, leading to arc flash, fire, or explosion.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Measure before specifying</strong> — always measure the prospective fault
                current (PFC) at the supply origin before specifying protective devices. For
                domestic consumer units this is typically done at the meter tails / incoming
                terminals. Record the result on the Electrical Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kA for most domestic</strong> — the vast majority of UK domestic supplies
                will have a PFC below 6kA, making standard 6kA MCBs adequate. However, properties
                close to a substation, on TN-S systems, or on large commercial developments may
                exceed this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial installations</strong> — 10kA MCBs are standard for commercial
                distribution boards. For installations at or near transformer secondaries, MCCBs
                with breaking capacities of 25kA, 36kA, or higher may be required. The network
                operator's technical standards and site measurements determine the requirement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'selecting',
    heading: 'Selecting the Right Circuit Breaker for Your Installation',
    content: (
      <>
        <p>
          Circuit breaker selection involves assessing the load current, the prospective fault
          current, the earth loop impedance, the circuit's disconnection time requirements, and any
          specific load characteristics such as inrush current. The following practical guidance
          covers the most common UK scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic consumer unit replacement</strong> — specify an all-RCBO board with
                Type A, 30mA, 6kA RCBOs. Use Type B curve for all final circuits. This eliminates
                nuisance tripping, provides BS 7671 18th Edition compliant additional protection,
                and simplifies certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial distribution board</strong> — specify MCCBs for incoming
                protection (with appropriate breaking capacity based on measured PFC), Type C MCBs
                for general circuits, and Type D for motor circuits. Add 30mA RCDs or RCBOs for
                socket-outlet circuits as required by BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging circuit</strong> — use a Type A or Type B RCBO (not Type AC).
                Check the charge point manufacturer's documentation — some units have built-in Type
                B RCD protection, in which case a Type A upstream RCBO is acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrofit where Zs is marginal</strong> — if measured Zs is close to the
                maximum for the existing MCB, consider replacing with an RCBO of the same rating and
                curve type to add RCD protection without changing the overcurrent characteristic. Do
                not use a lower-rated MCB to improve Zs compliance — always consult the tables in BS
                7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Certification and Testing',
    content: (
      <>
        <p>
          Consumer unit replacements and new circuit installations are notifiable work in England
          and Wales under Part P of the Building Regulations. Electricians registered with a
          competent person scheme (NICEIC, NAPIT, ELECSA, or similar) can self-certify without
          involving building control.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and Test Results Required</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every consumer unit replacement requires an Electrical Installation Certificate
                  (EIC) and a complete Schedule of Test Results including PFC measurement, Zs
                  measurements for each circuit, and RCD test results where applicable. Use the{' '}
                  <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete certification on site with no evening admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  During an EICR, circuit breaker type, rating, and breaking capacity must be
                  verified against the installation's requirements. MCBs without RCD protection on
                  circuits requiring 30mA additional protection are a C2 observation. Devices with
                  insufficient breaking capacity relative to the measured PFC are a C2 or C1 finding
                  depending on the severity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete consumer unit certificates on your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC and EICR completion with AI board scanning, test result recording, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CircuitBreakerTypesPage() {
  return (
    <GuideTemplate
      title="Types of Circuit Breakers UK | MCB, MCCB, RCCB Guide"
      description="Complete guide to circuit breaker types used in UK electrical installations. MCB, MCCB, RCCB and RCBO explained with curve types, breaking capacity, BS 7671 requirements and selection guidance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Types of Circuit Breakers UK:{' '}
          <span className="text-yellow-400">MCB, MCCB, RCCB and RCBO Explained</span>
        </>
      }
      heroSubtitle="A complete practical guide to circuit breaker types used in UK electrical installations — MCB, MCCB, RCCB and RCBO explained with curve types, breaking capacity requirements, BS 7671 compliance, and guidance on selecting the right device for every application."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Circuit Breaker Types"
      relatedPages={relatedPages}
      ctaHeading="Complete Circuit Certificates and EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC and EICR completion with AI board scanning, test result recording, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
