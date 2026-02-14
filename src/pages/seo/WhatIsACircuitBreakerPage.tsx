import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  Activity,
  Cable,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Search,
  Thermometer,
  Magnet,
  Settings,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Circuit Breaker Explained', href: '/guides/what-is-a-circuit-breaker' },
];

const tocItems = [
  { id: 'what-is-circuit-breaker', label: 'What Is a Circuit Breaker?' },
  { id: 'how-mcbs-work', label: 'How MCBs Work' },
  { id: 'mcb-vs-fuse', label: 'MCB vs Fuse' },
  { id: 'type-b-c-d', label: 'Type B, C, and D Explained' },
  { id: 'common-ratings', label: 'Common MCB Ratings' },
  { id: 'why-mcbs-trip', label: 'Why MCBs Trip' },
  { id: 'testing-mcbs', label: 'Testing MCBs During an EICR' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A circuit breaker (MCB) is a protective device that automatically disconnects a circuit when the current exceeds a safe level — either from an overload or a short circuit.',
  'MCBs use two trip mechanisms: a thermal element (bimetallic strip) for sustained overloads and a magnetic element (solenoid) for instantaneous short circuit disconnection.',
  'Type B MCBs trip magnetically at 3-5 times rated current (domestic). Type C at 5-10 times (commercial, small motors). Type D at 10-20 times (heavy inductive loads, transformers).',
  'MCBs replaced rewirable fuses because they are safer (no exposed live parts during replacement), faster to reset, and more accurate in their trip characteristics.',
  "During an EICR, the prospective fault current (PFC) must not exceed the MCB's breaking capacity, and the earth fault loop impedance (Zs) must be low enough for the MCB to trip within the required time.",
];

const faqs = [
  {
    question: 'What is the difference between an MCB and a fuse?',
    answer:
      'Both MCBs and fuses protect circuits against overcurrent, but they work differently. A fuse contains a thin wire that melts when too much current flows, breaking the circuit. Once a fuse blows, it must be replaced with a new one of the correct rating. An MCB uses a mechanical mechanism — a bimetallic strip for overloads and an electromagnetic solenoid for short circuits — to trip a switch that can be reset. MCBs are safer (no exposed live parts when resetting), more convenient (no need to keep spare fuse wire), and more precise (their trip characteristics are more accurately defined). MCBs also trip faster than rewirable fuses under short circuit conditions. Modern consumer units in the UK use MCBs or RCBOs exclusively — rewirable fuses have not been installed in new work for decades.',
  },
  {
    question: 'Which type of MCB should I use — Type B, C, or D?',
    answer:
      'Type B is the standard choice for domestic circuits — lighting, socket outlets, immersion heaters, and general loads with no significant inrush current. Type B trips magnetically at 3 to 5 times its rated current. Type C is used where there is a moderate inrush current — small motors, fluorescent lighting banks, and some commercial loads. Type C trips at 5 to 10 times rated current, allowing the inrush to pass without nuisance tripping. Type D is used for heavy inductive loads with very high inrush currents — large motors, transformers, welding equipment, and X-ray machines. Type D trips at 10 to 20 times rated current. The key principle is: choose the type with the lowest magnetic trip threshold that will not nuisance trip on the normal inrush current of the connected load. Using a Type D where a Type B would suffice means higher fault currents are needed to achieve instantaneous disconnection, which could compromise safety.',
  },
  {
    question: 'Why does my circuit breaker keep tripping?',
    answer:
      'A circuit breaker trips for one of three reasons: overload, short circuit, or earth fault (if it is an RCBO or fed via an RCD). An overload trip happens when the total current drawn by connected appliances exceeds the MCB rating — for example, running a kettle, toaster, and microwave on the same 32A ring circuit simultaneously (unlikely to overload, but possible on a 20A radial). The MCB trips after a delay (the thermal element heats up gradually). A short circuit trip is instantaneous — the magnetic element reacts to a very high current caused by a direct contact between line and neutral or line and earth. This could be a faulty appliance, damaged cable, or water ingress. If the breaker trips immediately every time you reset it, suspect a short circuit. If it trips after a few minutes, suspect an overload or a partial fault. For persistent tripping, call a qualified electrician to fault-find — do not keep resetting without investigating.',
  },
  {
    question: 'What is the breaking capacity of an MCB?',
    answer:
      'The breaking capacity (also called rated short circuit capacity or Icn) is the maximum fault current the MCB can safely interrupt without damage. For domestic MCBs, this is typically 6kA (6,000 amps). For commercial and industrial MCBs, it can be 10kA, 15kA, or higher. During an EICR or initial verification, the electrician measures the prospective fault current (PFC) at the origin of the installation. If the PFC exceeds the breaking capacity of the MCBs, the installation is non-compliant — the MCBs could fail catastrophically under fault conditions (arcing, explosion, fire). This would be recorded as a C1 or C2 observation. In most domestic installations, the PFC is well below 6kA, but in commercial installations close to a transformer, the PFC can be significantly higher.',
  },
  {
    question: 'Can I replace a Type B MCB with a Type C to stop it tripping?',
    answer:
      "You should not swap to a Type C simply to stop tripping without understanding why the MCB is tripping. If the MCB is tripping because of an overload, changing the type will not help — Type B and Type C have the same thermal trip characteristics for sustained overloads. If it is tripping due to inrush current (for example, when a motor starts), then Type C may be appropriate — but you need to verify that the higher magnetic trip threshold is still compatible with the circuit's earth fault loop impedance. A Type C MCB needs a higher fault current to achieve instantaneous disconnection, which means the maximum permitted Zs value is lower. If the circuit's Zs is too high for a Type C to disconnect within the required time, you have created a safety hazard. Always check the Zs against the tables in BS 7671 (Appendix 3, Tables 41.3 and 41.4) before changing MCB type.",
  },
  {
    question: 'How does Elec-Mate help with MCB and protective device selection?',
    answer:
      'Elec-Mate includes built-in calculators and reference tools that help with protective device selection. The maximum Zs calculator lets you enter the MCB type and rating and instantly shows the maximum permitted Zs value from BS 7671. The prospective fault current calculator works out PFC from your measured Zs. The cable sizing tool factors in the protective device rating, cable type, installation method, and correction factors to recommend the correct cable size. The AI board scanner reads the existing MCB ratings from a photo of the consumer unit, so you can quickly verify that the protective devices match the installed cables. All of this is available on your phone, on site, without needing to carry the regulation book.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/what-is-an-rcd',
    title: 'What Is an RCD?',
    description:
      'How residual current devices detect earth leakage and protect against electric shock.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcbo-vs-rcd-mcb',
    title: 'RCBO vs RCD + MCB',
    description:
      'When to use an RCBO instead of a separate RCD and MCB — selectivity, cost, and board space.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/guides/mcb-types-b-c-d',
    title: 'MCB Types B, C, and D',
    description: 'Detailed breakdown of MCB trip curves and when to use each type.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/circuit-breaker-tripping',
    title: 'Circuit Breaker Keeps Tripping',
    description:
      'Fault-finding guide for persistent MCB and RCD tripping — overloads, short circuits, and earth faults.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change',
    title: 'Consumer Unit Change',
    description: 'When and why a consumer unit upgrade is needed, and what the job involves.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-acronyms-glossary',
    title: 'Electrical Acronyms Glossary',
    description: 'A-Z reference of every electrical acronym — MCB, RCD, RCBO, AFDD, SPD, and more.',
    icon: BookOpen,
    category: 'Guide',
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
          A circuit breaker is a switching device that automatically disconnects a circuit when the
          current flowing through it exceeds a safe level. Its job is to protect the cables and
          equipment on that circuit from damage caused by overcurrent — whether from an overload
          (too many appliances drawing too much current) or a short circuit (a direct fault between
          live conductors).
        </p>
        <p>
          In UK domestic and commercial installations, the most common type of circuit breaker is
          the <strong>MCB (Miniature Circuit Breaker)</strong>. Every modern consumer unit or
          distribution board contains MCBs — one for each circuit. You will see them labelled with
          ratings like B6, B16, B32, C32, or D63, where the letter indicates the type and the number
          is the current rating in amps.
        </p>
        <p>
          MCBs replaced the older rewirable fuses and cartridge fuses that were standard in UK
          installations for decades. While fuses still exist in some older properties, all new work
          uses MCBs (or <SEOInternalLink href="/guides/rcbo-vs-rcd-mcb">RCBOs</SEOInternalLink>,
          which combine MCB and RCD protection in one device).
        </p>
      </>
    ),
  },
  {
    id: 'how-mcbs-work',
    heading: 'How MCBs Work: Thermal and Magnetic Trip Mechanisms',
    content: (
      <>
        <p>
          An MCB contains two separate trip mechanisms, each designed to respond to a different type
          of fault:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Thermal Trip (Overload Protection)</h4>
                <p className="text-white text-sm leading-relaxed">
                  A bimetallic strip inside the MCB carries the circuit current. When the current
                  exceeds the rated value, the strip heats up and bends. The higher the overload,
                  the faster it bends. At a set deflection, the strip releases a mechanical latch
                  that opens the MCB contacts. This is an inverse time characteristic — a small
                  overload takes longer to trip than a large one. A 32A MCB carrying 40A might take
                  several minutes to trip. At 64A (twice rated), it trips much faster. This allows
                  for normal short-duration current spikes (like switching on a load) without
                  nuisance tripping.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Magnet className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Magnetic Trip (Short Circuit Protection)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  An electromagnetic solenoid (coil) surrounds the current path inside the MCB.
                  Under normal current, the magnetic field is too weak to move the plunger. Under
                  short circuit conditions — where the current is many times the rated value — the
                  magnetic field becomes strong enough to pull the plunger, which releases the latch
                  and opens the contacts almost instantaneously (typically within 10 milliseconds).
                  The threshold at which the magnetic trip operates depends on the MCB type (B, C,
                  or D).
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          When the MCB trips, an arc forms between the opening contacts. The MCB contains an{' '}
          <strong>arc chute</strong> — a stack of metal plates that splits the arc into smaller
          segments, cools it, and extinguishes it rapidly. This is critical for safely interrupting
          high fault currents.
        </p>
      </>
    ),
  },
  {
    id: 'mcb-vs-fuse',
    heading: 'MCB vs Fuse: Why MCBs Replaced Fuses',
    content: (
      <>
        <p>
          For most of the 20th century, UK homes were protected by rewirable fuses — a ceramic
          holder with a piece of fuse wire stretched between two terminals. When too much current
          flowed, the wire melted and broke the circuit. The homeowner then had to replace the fuse
          wire with a new piece of the correct rating before power could be restored.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety.</strong> Replacing fuse wire involves working near live parts. MCBs
                are reset by flipping a switch — no exposure to live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct rating.</strong> With rewirable fuses, people frequently fitted the
                wrong rating of fuse wire — using 30A wire in a 5A holder, for example, which
                defeated the protection entirely. MCBs cannot be fitted with the wrong rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Speed.</strong> MCBs trip faster than rewirable fuses, especially under
                short circuit conditions. Faster disconnection means less energy released into the
                fault, less cable damage, and reduced fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Convenience.</strong> A tripped MCB is reset in seconds. A blown fuse
                requires finding the correct fuse wire, threading it through the holder, and
                tightening the terminals — often in the dark with a torch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accuracy.</strong> The trip characteristics of an MCB are precisely defined
                by the manufacturer. Rewirable fuse wire has less predictable characteristics,
                especially if the wrong type or gauge is used.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you encounter a property with rewirable fuses during an{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink>, this alone is
          not a defect — but it is often accompanied by a C3 (Improvement Recommended) observation
          suggesting a{' '}
          <SEOInternalLink href="/guides/consumer-unit-change">
            consumer unit upgrade
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'type-b-c-d',
    heading: 'Type B, C, and D: Which MCB for Which Circuit?',
    content: (
      <>
        <p>
          The letter before the current rating (B32, C32, D63) indicates the{' '}
          <strong>instantaneous magnetic trip threshold</strong> — the multiple of rated current at
          which the solenoid trips the MCB without any delay.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Type B — 3 to 5 Times Rated Current</h4>
                <p className="text-white text-sm leading-relaxed">
                  The standard choice for domestic circuits. A B32 MCB trips magnetically between
                  96A and 160A. Suitable for resistive loads with no significant inrush — lighting
                  circuits, socket outlets, immersion heaters, electric showers, cooker circuits.
                  Type B is the default unless there is a specific reason to use C or D.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Type C — 5 to 10 Times Rated Current</h4>
                <p className="text-white text-sm leading-relaxed">
                  Used where loads have a moderate inrush current on startup. A C32 MCB trips
                  magnetically between 160A and 320A. Suitable for small motors, commercial
                  fluorescent lighting, air conditioning units, and some IT equipment. Also commonly
                  used for EV charger circuits where the charger electronics may have brief inrush.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Type D — 10 to 20 Times Rated Current</h4>
                <p className="text-white text-sm leading-relaxed">
                  Used for heavy inductive loads with very high inrush currents. A D63 MCB trips
                  magnetically between 630A and 1,260A. Suitable for large motors, transformers,
                  welding equipment, X-ray machines, and industrial discharge lighting. Rarely seen
                  in domestic work. Always verify the Zs is low enough for disconnection within the
                  required time when using Type D.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The critical point: as you move from Type B to C to D, the MCB needs progressively higher
          fault currents for instantaneous disconnection. This means the maximum permitted{' '}
          <SEOInternalLink href="/guides/maximum-zs-values">Zs values</SEOInternalLink> are
          progressively lower. A circuit that complies with a Type B MCB might not comply with a
          Type C, because the Zs is too high for the Type C to trip fast enough. Always check the
          tables in BS 7671 Appendix 3.
        </p>
        <SEOAppBridge
          title="Check maximum Zs values instantly"
          description="Enter the MCB type and rating in Elec-Mate and instantly see the maximum permitted Zs value from BS 7671. Compare it with your measured value on site — no need to carry the regulation book or flip through tables."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'common-ratings',
    heading: 'Common MCB Ratings in UK Domestic Installations',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>B6 — Lighting circuits.</strong> 6A is the standard rating for domestic
                lighting circuits wired in 1.0mm² or 1.5mm² twin-and-earth cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>B16 — Immersion heater, single socket spur.</strong> 16A is used for
                dedicated circuits supplying a fixed load up to 3.68kW, or for radial socket
                circuits in smaller areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>B20 — Radial socket circuit.</strong> 20A radials wired in 2.5mm² cable are
                used for areas serving up to 50m² floor area (Appendix 15 of the On-Site Guide).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>B32 — Ring final circuit, cooker circuit.</strong> 32A is the standard for
                ring final circuits (socket outlets) wired in 2.5mm² and for cooker circuits wired
                in 6mm² cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>B40 or B50 — Electric shower.</strong> High-power electric showers (9.5kW to
                10.8kW) require a dedicated circuit with a 40A or 50A MCB, wired in 10mm² cable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'why-mcbs-trip',
    heading: 'Why MCBs Trip: The Three Causes',
    content: (
      <>
        <p>
          When an MCB trips, it is doing its job — protecting the circuit. Understanding why it
          tripped is the first step in fixing the problem.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Overload</h4>
                <p className="text-white text-sm leading-relaxed">
                  The total current drawn by connected loads exceeds the MCB rating. The thermal
                  element heats up and trips after a delay. Symptoms: the MCB trips after running
                  for a while (minutes to hours), especially when multiple high-power appliances are
                  used simultaneously. Fix: reduce the load on the circuit or split it into two
                  circuits.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Short Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  A direct connection between line and neutral or line and earth, causing a very
                  high current. The magnetic element trips the MCB almost instantly. Symptoms: the
                  MCB trips immediately when switched on or when a specific appliance is plugged in.
                  Fix: identify and repair the fault — damaged cable, faulty appliance, water
                  ingress, or incorrect wiring.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Earth Fault (via RCD/RCBO)</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the MCB is actually an RCBO (or fed via an RCD), it may trip due to an earth
                  fault — current leaking to earth through damaged insulation, moisture, or a faulty
                  appliance. The RCD element detects the imbalance between line and neutral current
                  and trips. See{' '}
                  <SEOInternalLink href="/guides/what-is-an-rcd">What Is an RCD</SEOInternalLink>{' '}
                  for more detail on earth fault protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'testing-mcbs',
    heading: 'Testing MCBs During an EICR',
    content: (
      <>
        <p>
          During an <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink> or
          initial verification, several tests relate directly to the MCBs installed:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective Fault Current (PFC).</strong> Measured at the origin and at each
                distribution board. The PFC must not exceed the breaking capacity (Icn) of the MCBs.
                If it does, the MCBs could fail to safely interrupt a fault. Most domestic MCBs have
                a 6kA breaking capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth Fault Loop Impedance (Zs).</strong> Measured at the furthest point of
                each circuit. The measured Zs must be below the{' '}
                <SEOInternalLink href="/guides/maximum-zs-values">maximum value</SEOInternalLink>{' '}
                tabulated in BS 7671 for the MCB type and rating. This ensures the MCB will
                disconnect within the required time (0.4s for socket circuits, 5s for fixed
                equipment) under earth fault conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection.</strong> Check that the MCB type and rating match the
                cable size and circuit type. A B32 on a lighting circuit wired in 1.0mm² would be
                dangerous. Check for signs of overheating, discolouration, or burning at the MCB
                terminals.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the MCB type, rating, or breaking capacity is incorrect for the circuit, this is
          recorded as a C2 (Potentially Dangerous) or C1 (Danger Present) observation, depending on
          the severity.
        </p>
        <SEOAppBridge
          title="AI board scanner reads MCB ratings from a photo"
          description="Point your phone camera at the consumer unit. Elec-Mate reads every MCB type and rating from the photo — B6, B32, C32 — and cross-references them against the circuit details. Mismatches are flagged automatically."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WhatIsACircuitBreakerPage() {
  return (
    <GuideTemplate
      title="What Is a Circuit Breaker? | MCB Explained Simply"
      description="Plain English guide to circuit breakers (MCBs). How MCBs work with thermal and magnetic trip mechanisms, MCB vs fuse, Type B, C, and D explained, common ratings, and why circuit breakers trip."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Basics"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          What Is a Circuit Breaker? <span className="text-yellow-400">MCBs Explained Simply</span>
        </>
      }
      heroSubtitle="Circuit breakers protect every circuit in every installation. This guide explains how MCBs work, the difference between Type B, C, and D, why they replaced fuses, and what it means when one keeps tripping."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Circuit Breakers"
      relatedPages={relatedPages}
      ctaHeading="Complete Electrical Certificates on Your Phone"
      ctaSubheading="Elec-Mate includes AI board scanning, built-in Zs calculators, and instant MCB reference tables. Complete EICR and EIC certificates faster on site. 7-day free trial, cancel anytime."
    />
  );
}
