import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Calculator,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Single Phase vs Three Phase', href: '/guides/single-phase-vs-three-phase' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'single-phase', label: 'Single Phase Supply' },
  { id: 'three-phase', label: 'Three Phase Supply' },
  { id: 'when-three-phase-needed', label: 'When Three Phase is Needed' },
  { id: 'dno-upgrade', label: 'DNO Supply Upgrade Process and Costs' },
  { id: 'load-balancing', label: 'Load Balancing Across Phases' },
  { id: 'wiring-differences', label: 'Wiring and Protection Differences' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A standard UK domestic single phase supply provides 230V between line and neutral (L-N). A three phase supply provides 230V between each line and neutral, and 400V between any two lines (L-L). The three phases are 120° apart.',
  'Single phase supplies are standard for domestic properties with a 60A or 100A cut-out fuse. Three phase supplies are available where the connected load exceeds what a single phase supply can provide — typically above 15kW for continuous loads.',
  'Three phase motors are more efficient and have better starting characteristics than single phase motors. Three phase is standard for commercial kitchen equipment, large air handling units, lifts, and industrial machinery.',
  'Upgrading from single phase to three phase supply requires a DNO supply upgrade application. Costs range from £2,000 to £10,000+ depending on the distance from the nearest three phase network and the work required.',
  'In a three phase installation, loads must be balanced as evenly as possible across the three phases. Unbalanced loading causes increased neutral current, voltage imbalance, and reduced efficiency in three phase motors.',
];

const faqs = [
  {
    question: 'What is the voltage of a UK three phase supply?',
    answer:
      'A UK three phase supply provides three line voltages, each 230V from line to neutral (L1-N, L2-N, L3-N). Between any two lines, the voltage is 400V (L1-L2, L2-L3, L1-L3) — this is the three phase line-to-line voltage. The relationship is: line-to-line voltage = √3 × line-to-neutral voltage = 1.732 × 230V = 398V, rounded to 400V in standard usage. The three phases are 120° apart in time. Single phase equipment (socket outlets, lighting) connects between a single line and neutral (230V). Three phase equipment (motors, three phase machinery) connects across all three lines (400V) or all three lines and neutral.',
  },
  {
    question: 'How do I know if a property needs three phase power?',
    answer:
      'A property needs three phase power when the connected load cannot be supplied adequately from a standard single phase service (typically limited to 60A or 100A cut-out). The practical threshold where three phase becomes necessary is typically above 15kW of continuous electrical load. Examples that commonly require three phase: three phase motors above 2.2kW; large commercial kitchen equipment (combination ovens, bratt pans); large air source heat pumps above 12kW; fast EV chargers (22kW DC chargers); commercial air handling units; welding equipment above 25A input; and large workshop machinery. Calculate the total connected load with diversity applied, and compare to the single phase supply capacity.',
  },
  {
    question: 'How much does it cost to upgrade from single phase to three phase?',
    answer:
      'The cost of a three phase supply upgrade depends entirely on how far the property is from the nearest three phase network. If the nearest three phase cable is in the street outside the property, the cost may be £2,000 to £4,000 for the DNO to extend the supply. If the nearest three phase network is 500m away along an overhead line route, the cost can exceed £10,000 — sometimes significantly more for rural properties. The process requires a formal application to the DNO (your local electricity distributor — UK Power Networks, Northern Powergrid, Western Power Distribution, etc.), who will carry out a site survey and provide a formal quotation. There is a first reasonable requirement (FRR) under which the DNO must provide the supply if you agree to pay the difference between the standard connection cost and the actual cost.',
  },
  {
    question: 'Can I install a three phase consumer unit in a single phase property?',
    answer:
      'You can install a consumer unit with three phase capability — for example, a 3-phase RCBO board — in a property with a single phase supply, in anticipation of a future three phase upgrade. However, you can only energise circuits from the single phase supply that is actually available. You cannot create three phase power from a single phase supply (without a specialist phase converter, which is inefficient and not generally used in UK installations). A three phase consumer unit in a single phase building is useful when planning for future three phase — it allows the consumer unit to stay in place when the supply is upgraded. Clearly label which phases are energised and which are not.',
  },
  {
    question: 'How do I calculate load balancing for a three phase installation?',
    answer:
      'Load balancing distributes connected loads as evenly as possible across the three phases. To calculate: (1) List all loads and their phase connection. (2) Sum the load on each phase (kVA or kW at the supply power factor). (3) Calculate the imbalance as the difference between the most loaded and least loaded phase, expressed as a percentage of the average phase load. (4) Aim for less than 10% imbalance in practice. For single phase loads connected to a three phase supply (such as socket outlet circuits), cycle the phase allocation: phase 1 for circuits 1, 4, 7; phase 2 for circuits 2, 5, 8; phase 3 for circuits 3, 6, 9. Fixed three phase loads (motors, large equipment) provide inherent balance across all three phases.',
  },
  {
    question: 'Does a three phase motor need all three phases to run?',
    answer:
      'A three phase induction motor requires all three phases to operate normally. If one phase is lost (a condition called single phasing), the motor will continue to rotate due to inertia but will draw excessive current on the remaining two phases as it tries to maintain speed. The excessive current causes overheating and will burn out the motor windings within minutes if not stopped. Three phase motors must be protected by a motor starter with overload protection and, preferably, phase failure protection. Phase monitoring relays that trip the motor contactor on phase failure are available and should be used for critical motor installations. A motor that has been single-phased must be inspected by a motor rewinder before being returned to service.',
  },
  {
    question: 'What size supply is typically available for commercial premises?',
    answer:
      'Commercial premises typically have access to larger supplies than domestic. A small retail unit or office may be supplied with a single phase 100A service (23kVA). A medium commercial premises (restaurant, small factory) may have a three phase 100A service per phase (69kVA total). Large commercial and industrial premises can have three phase 200A, 400A, or larger services, or even high-voltage (HV) supplies with an on-site transformer where the demand exceeds around 200kVA. The available supply must be confirmed with the DNO before designing any installation with significant electrical load. Requesting a supply that exceeds the available network capacity will require DNO network reinforcement, which can add significant cost and delay.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for single phase and three phase circuits with voltage drop calculation.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC certificates for single and three phase installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/earthing-systems-tns-tncs-tt-explained',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing explained — essential knowledge for any supply type.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study three phase testing, load calculations, and supply characteristics.',
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
    heading: 'Single Phase vs Three Phase Supply: A Complete Guide for UK Electricians',
    content: (
      <>
        <p>
          Understanding the difference between single phase and three phase electrical supplies
          is essential for designing, installing, and certifying electrical systems. The choice
          of supply type determines the maximum load available, the equipment that can be
          connected, the wiring and protection requirements, and the cost and complexity of
          the installation.
        </p>
        <p>
          In the UK, most domestic properties are supplied with single phase 230V. Commercial and
          industrial premises routinely use three phase 400V supplies to power larger loads more
          efficiently.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          covers both supply types, and the designer must confirm the available supply
          characteristics with the DNO before commencing the installation design.
        </p>
      </>
    ),
  },
  {
    id: 'single-phase',
    heading: 'Single Phase Supply: Standard UK Domestic and Small Commercial',
    content: (
      <>
        <p>
          A single phase supply consists of one line conductor (L) and one neutral conductor (N),
          providing 230V between L and N. The standard UK domestic service is provided via a
          60A or 100A DNO cut-out fuse. The maximum continuous load is:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">Single Phase Supply Characteristics</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Voltage: 230V line to neutral (L-N)</li>
            <li>• Standard cut-out fuse: 60A or 100A</li>
            <li>• Maximum continuous load at 100A: 23kW (23kVA at unity power factor)</li>
            <li>• Standard for all UK domestic properties</li>
            <li>• Small commercial premises (offices, small retail): single phase 100A common</li>
            <li>• RCD requirement: Regulation 411.3.4 — 30mA RCD for all socket outlet circuits in domestic installations</li>
          </ul>
        </div>
        <p>
          A 100A single phase supply can power: a full domestic installation with EV charger
          (7.4kW), heat pump (5–12kW), and all standard domestic loads simultaneously. When the
          total connected load (after diversity) approaches or exceeds 100A, a three phase supply
          upgrade should be considered.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three Phase Supply: Commercial, Industrial, and High-Load Domestic',
    content: (
      <>
        <p>
          A three phase supply consists of three line conductors (L1, L2, L3) and a neutral
          conductor (N), providing 230V from each line to neutral and 400V between any two
          lines. The three phases are 120° apart in time, so the combined power flow is smooth
          and continuous — unlike single phase which pulsates at twice the supply frequency.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">Three Phase Supply Characteristics</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Voltage: 230V line to neutral (L-N), 400V line to line (L-L)</li>
            <li>• Standard commercial cut-out: 100A per phase (69kVA total capacity)</li>
            <li>• Maximum continuous load at 100A per phase: 69kW</li>
            <li>• More efficient than single phase for motors — lower current for same power</li>
            <li>• Three phase induction motors: simpler, more reliable, better starting torque</li>
            <li>• Required for most commercial kitchen equipment, large chillers, lifts</li>
          </ul>
        </div>
        <SEOAppBridge
          title="Design three phase installations with AI circuit designer"
          description="Elec-Mate's AI circuit designer can calculate three phase load schedules, balance loads across phases, size cables and protection, and check earth fault loop impedance for three phase systems."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'when-three-phase-needed',
    heading: 'When Three Phase is Needed: The 15kW Threshold',
    content: (
      <>
        <p>
          Three phase supply becomes necessary when the connected electrical load exceeds what
          a single phase supply can reasonably provide. The practical threshold is approximately
          15kW of continuous electrical load, though this depends on the diversity of the
          installation. Specific applications that typically require three phase:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three phase motors above 2.2kW:</strong> Electric motors above 2.2kW
                are typically three phase because single phase motors of this size have poor
                efficiency and starting characteristics. Motors for large air handling units,
                commercial refrigeration compressors, industrial machinery, and lifts are
                almost always three phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large EV charging:</strong> 22kW AC EV chargers require three phase
                (3 × 32A). 7.4kW chargers can be single phase. DC rapid chargers (50kW, 150kW)
                require a three phase supply at the charge point operator's premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial catering:</strong> Combination ovens, commercial dishwashers,
                bratt pans, and large commercial ovens are typically three phase. A fully equipped
                commercial kitchen can easily require 50–100kW of electrical capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large heat pumps and HVAC:</strong> Air source heat pumps above 12kW
                output and large commercial HVAC systems typically require three phase. Some
                domestic heat pumps (16kW and above) may require three phase.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-upgrade',
    heading: 'DNO Supply Upgrade: Process and Costs',
    content: (
      <>
        <p>
          Upgrading from single phase to three phase requires a formal application to the DNO
          (Distribution Network Operator). The process and cost depend on the proximity to the
          nearest three phase network:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-2">Typical DNO Upgrade Costs</p>
              <ul className="space-y-1 text-white text-sm">
                <li>• Three phase network in the street: £2,000–£4,000</li>
                <li>• Three phase network 100m away: £3,000–£6,000</li>
                <li>• Three phase network 500m away (urban): £8,000–£15,000</li>
                <li>• Rural property, nearest three phase &gt;1km: £15,000–£30,000+</li>
                <li>• Timeline: 8–26 weeks from application to energisation</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          The application process: (1) Submit a new connection application to the DNO. (2) The
          DNO carries out a network study and provides a quotation. (3) Accept the quotation and
          pay the connection charge. (4) DNO carries out the network works (new cable, transformer
          upgrade if required). (5) DNO installs the new service head and meter position equipment.
          (6) The electrician installs the new consumer unit and three phase wiring. (7) DNO
          energises the supply.
        </p>
      </>
    ),
  },
  {
    id: 'load-balancing',
    heading: 'Load Balancing Across Phases',
    content: (
      <>
        <p>
          In a three phase installation, loads must be distributed as evenly as possible across
          the three phases. Unbalanced loading has several negative consequences:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Increased neutral current:</strong> With single phase loads, the neutral
                carries the vector sum of the three phase currents. A perfectly balanced three
                phase load has zero neutral current. An unbalanced load causes neutral current that
                can approach line current in severely unbalanced installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage imbalance:</strong> Unbalanced loading causes voltage imbalance —
                the voltage on the heavily loaded phase is lower and the lightly loaded phase is
                higher. Even a 2% voltage imbalance can reduce three phase motor efficiency by
                up to 8% and significantly reduce motor life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduced transformer efficiency:</strong> Unbalanced loading reduces the
                efficiency of the transformer supplying the installation and can cause transformer
                overheating in severe cases.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As a practical guide for distributing single phase circuits: cycle phase allocation
          across circuits — L1 for circuit 1, L2 for circuit 2, L3 for circuit 3, then repeat.
          For large single phase loads (EV chargers, storage heaters), assign the heaviest single
          loads to different phases.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-differences',
    heading: 'Wiring and Protection Differences',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Single Phase Wiring</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Two-core cable (L + N) for single phase circuits</li>
              <li>• Three-core cable (L + N + PE) for protected circuits</li>
              <li>• Single pole MCBs for most circuit protection</li>
              <li>• Consumer unit: single phase busbars</li>
              <li>• Line conductor: brown; neutral: blue; CPC: green/yellow</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Three Phase Wiring</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• Four-core cable (L1+L2+L3+N) for three phase circuits</li>
              <li>• Five-core cable (L1+L2+L3+N+PE) for protected circuits</li>
              <li>• Triple pole MCBs for three phase circuit protection</li>
              <li>• Distribution board: three phase busbars (L1, L2, L3)</li>
              <li>• Phase colours: L1 brown, L2 black, L3 grey; neutral blue; CPC green/yellow</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Three Phase Installations in Practice',
    content: (
      <>
        <p>
          Three phase installations require careful load schedule design, phase allocation,
          protection co-ordination, and testing. The earth fault loop impedance must be measured
          on all three phases, and the voltage between all phase combinations (L1-L2, L2-L3,
          L1-L3) must be verified at commissioning.
        </p>
        <SEOAppBridge
          title="Certificate three phase installations on your phone"
          description="Elec-Mate's EIC app supports three phase installations: record Ze on all three phases, complete the schedule of test results for three phase circuits, and generate compliant PDF certificates instantly."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SinglePhaseVsThreePhasePage() {
  return (
    <GuideTemplate
      title="Single Phase vs Three Phase Power | UK Electrician's Guide"
      description="Complete guide to single phase vs three phase electrical supplies for UK electricians. When three phase is needed (above 15kW), DNO upgrade costs (£2,000–£10,000+), load balancing, and wiring differences."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Supply Systems Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Single Phase vs Three Phase:{' '}
          <span className="text-yellow-400">When to Upgrade and What It Costs</span>
        </>
      }
      heroSubtitle="Three phase supply is needed when the connected load exceeds 15kW. A DNO upgrade costs £2,000 to £10,000+ depending on network proximity. This guide covers when three phase is required, the upgrade process, load balancing, and wiring differences."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Single Phase vs Three Phase"
      relatedPages={relatedPages}
      ctaHeading="Design and Certificate Three Phase Installations"
      ctaSubheading="Elec-Mate's AI circuit designer handles three phase load schedules and phase balancing. EIC app supports three phase test results. 7-day free trial, cancel anytime."
    />
  );
}
