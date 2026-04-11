import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  FileCheck2,
  Home,
  ClipboardCheck,
  Settings,
  Info,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Wiring Guides', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'RCD Types UK Guide', href: '/rcd-types-guide' },
];

const tocItems = [
  { id: 'what-is-rcd', label: 'What Is an RCD?' },
  { id: 'rccb', label: 'RCCB — Residual Current Circuit Breaker' },
  { id: 'rcbo', label: 'RCBO — Combined MCB and RCD' },
  { id: 'srcd', label: 'SRCD — Socket Outlet RCD' },
  { id: 'rcdm', label: 'RCDM — RCD Module' },
  { id: 'sensitivity', label: '30mA, 100mA and 300mA Ratings' },
  { id: 'bs7671-requirements', label: 'BS 7671 Requirements' },
  { id: 'choosing', label: 'Choosing the Right RCD Type' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'RCDs (Residual Current Devices) detect earth leakage currents and disconnect the circuit within milliseconds, protecting people from electric shock and reducing fire risk.',
  'BS 7671 18th Edition requires additional protection by 30mA RCDs for socket-outlet circuits rated up to 20A in most installations — this is one of the most commonly cited requirements during EICRs.',
  'RCCBs protect multiple circuits but provide no overcurrent protection — they must be used with MCBs upstream or downstream.',
  'RCBOs combine MCB overcurrent protection and RCD earth-fault protection in a single device, eliminating nuisance tripping between circuits.',
  'SRCDs (socket-outlet RCDs) provide protection at the point of use and are suitable for retrofit situations where a full board upgrade is not practical.',
  'Fire-protection RCDs rated at 100mA or 300mA are used where 30mA would cause nuisance tripping but earth-fault protection is still required.',
];

const faqs = [
  {
    question: 'What is the difference between an RCD and an RCCB?',
    answer:
      'An RCD (Residual Current Device) is the broad term for any device that detects earth leakage and disconnects the circuit. An RCCB (Residual Current Circuit Breaker) is one specific type of RCD — a stand-alone device that provides earth-fault protection only, with no built-in overcurrent protection. RCCBs must always be used in combination with MCBs (Miniature Circuit Breakers) to provide complete circuit protection. RCBO, SRCD, and RCDM are also types of RCD.',
  },
  {
    question: 'Why does BS 7671 require 30mA RCDs on socket outlets?',
    answer:
      'BS 7671 18th Edition requires additional protection by a 30mA RCD for socket-outlet circuits rated up to 20A because these circuits are used to connect portable equipment — including equipment that may have deteriorated insulation or be used in damp conditions. The 30mA threshold was chosen because currents above 30mA can cause ventricular fibrillation (cardiac arrest) if they pass through the body. At 30mA, disconnection within the required time limits prevents a lethal dose of current from being sustained.',
  },
  {
    question: 'What is the difference between an RCBO and an RCCB?',
    answer:
      'An RCCB provides only earth-fault (residual current) protection and must be used with separate MCBs for overcurrent protection. An RCBO (Residual Current Breaker with Overcurrent protection) combines both functions in a single device — it will trip on both overcurrent (like a standard MCB) and earth faults (like an RCD). RCBOs are significantly more expensive than RCCBs but eliminate nuisance tripping: if one circuit faults, only that RCBO trips rather than the whole RCCB group going down.',
  },
  {
    question: 'Can I use an SRCD instead of upgrading the consumer unit?',
    answer:
      'Yes, in certain circumstances. An SRCD (Socket-outlet RCD) provides 30mA RCD protection at the point of use and can be installed in an existing single-gang back box as a socket replacement. This is a practical solution for retrofitting RCD protection on individual circuits without replacing the entire consumer unit. However, it only protects the equipment plugged into that specific socket — it does not provide circuit protection in the same way as a consumer unit upgrade with RCCBs or RCBOs.',
  },
  {
    question: 'What does 30mA, 100mA, and 300mA mean on an RCD?',
    answer:
      'These ratings (also written IΔn) refer to the rated residual operating current — the leakage current at which the device is guaranteed to trip. A 30mA RCD provides personal protection and must disconnect within 40ms at rated current. A 100mA or 300mA RCD provides fire protection only — it will not reliably prevent electrocution but will detect sustained earth faults that could cause arcing and fire. Fire-protection RCDs are used on circuits where a 30mA device would cause nuisance tripping, such as large industrial loads with high leakage capacitance.',
  },
  {
    question: 'What is an RCDM and when is it used?',
    answer:
      'An RCDM (RCD Module) is a plug-in or add-on device that fits into a spare way in a consumer unit or distribution board to add RCD protection without replacing the entire board. RCDMs are used in retrofit situations where the existing board is otherwise in good condition but lacks RCD protection on specific circuits. They are also used to provide additional protection for individual final circuits when only certain circuits need upgrading.',
  },
  {
    question: 'Do all circuits need 30mA RCD protection under BS 7671?',
    answer:
      'No. BS 7671 18th Edition specifically requires additional protection by 30mA RCDs for socket-outlet circuits rated up to 20A, mobile equipment circuits up to 32A for use outdoors, and circuits in locations with increased risk (bathrooms, swimming pools, construction sites, agricultural premises). Other circuits — such as dedicated cooker circuits, dedicated EV charging circuits, and immersion heater circuits — may not require 30mA additional protection unless they fall into one of the specified categories. The designer and inspector must assess each circuit individually.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and common RCD defects.',
    icon: Home,
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
    href: '/earthing-systems-guide',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing systems explained with practical examples.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/bonding-conductors-guide',
    title: 'Bonding Conductors Guide',
    description: 'Main and supplementary bonding explained — sizing, routing and common mistakes.',
    icon: Settings,
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
    id: 'what-is-rcd',
    heading: 'What Is an RCD?',
    content: (
      <>
        <p>
          A Residual Current Device (RCD) is a protective device that monitors the balance of
          current flowing in the live and neutral conductors of a circuit. Under normal conditions,
          the current flowing out through the live conductor equals the current returning through
          the neutral conductor. If a fault develops — for example, because someone touches a live
          conductor and current flows through their body to earth — the balance is disrupted and a
          residual current flows.
        </p>
        <p>
          When the RCD detects a residual current above its rated threshold, it disconnects the
          circuit within milliseconds. This rapid disconnection is what makes RCDs effective at
          preventing electrocution: a standard 30mA RCD must trip within 40 milliseconds at rated
          current, well within the time needed to cause cardiac arrest.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Personal protection</strong> — 30mA RCDs protect against electric shock from
                direct or indirect contact. They are the primary means of additional protection
                required by{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 18th Edition
                </SEOInternalLink>{' '}
                for socket-outlet circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire protection</strong> — 100mA and 300mA RCDs detect sustained earth
                faults that generate sufficient heat to start a fire, even where 30mA protection
                would cause nuisance tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not overcurrent protection</strong> — RCDs detect earth leakage only. They
                do not provide protection against overload or short-circuit currents. Separate MCBs
                or fuses must be provided for overcurrent protection (unless an RCBO is used).
              </span>
            </li>
          </ul>
        </div>
        <p>
          There are four main types of RCD used in UK domestic and commercial installations: RCCB,
          RCBO, SRCD, and RCDM. Each has different applications, advantages, and limitations.
        </p>
      </>
    ),
  },
  {
    id: 'rccb',
    heading: 'RCCB — Residual Current Circuit Breaker',
    content: (
      <>
        <p>
          The RCCB (Residual Current Circuit Breaker) is the most familiar type of RCD in UK
          domestic installations. It is a stand-alone device installed in the consumer unit that
          provides earth-leakage protection for a group of circuits. RCCBs come in 2-pole versions
          (for single-phase circuits) and 4-pole versions (for three-phase circuits).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No overcurrent protection</strong> — an RCCB provides only earth-fault
                protection. Individual MCBs must be provided for each circuit downstream (or
                upstream, depending on the board design). In a typical split-load consumer unit, the
                RCCB covers one half of the board while individual MCBs protect each circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping risk</strong> — because one RCCB protects multiple
                circuits, an earth fault on any one circuit trips protection for all circuits on
                that RCCB. This is the main practical disadvantage compared to individual RCBOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost-effective for new installations</strong> — RCCBs are significantly
                cheaper than RCBOs. In a new consumer unit, using an RCCB to protect a group of
                circuits with individual MCBs is a cost-effective approach, particularly where
                circuits are unlikely to cause individual nuisance tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Types</strong> — Type AC (responds to sinusoidal AC residual currents), Type
                A (responds to AC and pulsating DC residual currents), and Type B (responds to AC,
                pulsating DC, and smooth DC). Type A is now standard for most domestic
                installations. Type B is required for some EV chargers and inverter-connected
                equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcbo',
    heading: 'RCBO — Combined MCB and RCD Protection',
    content: (
      <>
        <p>
          An RCBO (Residual Current Breaker with Overcurrent protection) combines the functions of a
          Miniature Circuit Breaker (MCB) and a Residual Current Device (RCD) in a single device.
          Each RCBO provides overcurrent protection and 30mA earth-fault protection for one
          individual circuit, fitting in a single-module consumer unit slot.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No nuisance tripping between circuits</strong> — because each circuit has
                its own RCBO, an earth fault on one circuit only trips that circuit. Other circuits
                remain live. This is the principal advantage of the all-RCBO consumer unit,
                particularly in domestic properties where a tripped RCCB at 2am can be extremely
                disruptive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher cost</strong> — RCBOs cost three to five times more per unit than a
                comparable MCB. An all-RCBO consumer unit is typically £150 to £300 more expensive
                than an equivalent split-load RCCB/MCB board, though this gap has narrowed as RCBOs
                have become more common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preferred for new consumer unit installations</strong> — many electricians
                now specify all-RCBO boards as standard for new domestic consumer unit replacements,
                as the additional cost is modest relative to the labour and the customer experience
                benefit is significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO types</strong> — like RCCBs, RCBOs come in Type AC, Type A, and Type B
                variants. BS 7671 18th Edition (as amended) requires Type A or Type B RCDs for
                circuits supplying EV charge points and equipment with electronic power conversion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'srcd',
    heading: 'SRCD — Socket-Outlet Residual Current Device',
    content: (
      <>
        <p>
          An SRCD (Socket-outlet RCD) is a socket outlet with a built-in 30mA RCD. It fits in a
          standard single-gang or double-gang back box and provides additional protection at the
          point of use. SRCDs are identifiable by their test and reset buttons on the socket face.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrofit solution</strong> — SRCDs are particularly useful for retrofitting
                30mA additional protection on individual sockets without replacing the consumer
                unit. They are commonly used to provide RCD protection on a single socket where a
                specific risk exists, such as a garage or outdoor socket on an older installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Point-of-use protection only</strong> — an SRCD protects only the equipment
                plugged into that socket. It does not protect the cable feeding the socket, other
                sockets on the same circuit, or provide any overcurrent protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Depth consideration</strong> — SRCDs are thicker than standard sockets due
                to the built-in electronics. A 35mm back box is usually required (standard sockets
                often use 25mm boxes). This must be checked before ordering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly testing</strong> — like all RCDs, SRCDs should be tested monthly
                using the integral test button to verify correct operation. The test button must be
                pressed and the socket must disconnect. This is particularly important in rental
                properties where the equipment is used by tenants unfamiliar with electrical safety.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcdm',
    heading: 'RCDM — RCD Module',
    content: (
      <>
        <p>
          An RCDM (RCD Module) is a modular device that plugs into a spare way in a consumer unit or
          distribution board to add RCD protection for a specific circuit or group of circuits.
          RCDMs are used in retrofit situations where individual circuit protection needs to be
          added to an existing board without full replacement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Board compatibility</strong> — RCDMs are manufacturer-specific and must be
                compatible with the consumer unit they are installed in. They cannot be mixed
                between brands in most cases. Always check the manufacturer's compatibility list
                before specifying an RCDM for a retrofit installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requires a spare way</strong> — an RCDM occupies one or more ways in the
                consumer unit. If the board is already full, an RCDM cannot be added without first
                freeing up a way or replacing the board with a larger unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical use case</strong> — RCDMs are particularly useful in commercial
                and industrial distribution boards where individual circuits need RCD protection
                added without replacing the entire board. They are also used in older domestic
                consumer units where a full replacement is not justified but one or two circuits
                require additional protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sensitivity',
    heading: '30mA, 100mA and 300mA — Understanding RCD Sensitivity',
    content: (
      <>
        <p>
          RCDs are available in different sensitivity ratings, expressed as the rated residual
          operating current (IΔn). The sensitivity rating determines both the level of protection
          provided and the susceptibility to nuisance tripping from normal circuit leakage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA — Personal protection</strong> — the standard sensitivity for
                additional protection in domestic and commercial installations. A 30mA RCD must
                disconnect within 40ms at rated current. At 150mA (5 × IΔn), it must disconnect
                within 40ms. The 30mA threshold was established as the level below which ventricular
                fibrillation is extremely unlikely in healthy adults, assuming rapid disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>100mA — Fire protection (medium sensitivity)</strong> — used where 30mA
                would cause nuisance tripping but earth-fault protection against fire risk is
                required. Common in commercial and industrial installations with large numbers of
                connected appliances that have inherent leakage capacitance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>300mA — Fire protection (low sensitivity)</strong> — used for the main
                incoming protection on large installations or where significant normal leakage makes
                100mA impractical. A 300mA RCD will not provide personal protection but will
                disconnect on sustained earth faults that could start a fire. Often used as the
                upstream RCD in a selective discrimination scheme with downstream 30mA devices.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Selective coordination (discrimination) between RCDs is achieved by ensuring that the
          upstream device has a higher sensitivity rating and/or a time delay. For example, a 300mA
          time-delayed RCD upstream of multiple 30mA RCDs ensures that a single-circuit fault only
          trips the 30mA device, not the entire installation.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Requirements for RCD Protection',
    content: (
      <>
        <p>
          BS 7671 18th Edition (as amended) sets out where RCD additional protection is required.
          Understanding these requirements is essential for{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR inspections</SEOInternalLink> and new
          installation design alike.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlet circuits ≤20A</strong> — BS 7671 18th Edition requires
                additional protection by a 30mA RCD for all socket-outlet circuits with a rated
                current not exceeding 20A. This is one of the most commonly cited requirements
                during EICR inspections of older properties, where sockets on ring final circuits
                may have no RCD protection at all.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mobile equipment circuits ≤32A outdoors</strong> — circuits supplying mobile
                equipment for use outdoors require 30mA additional protection. This includes garden
                sockets, garage sockets, and outdoor supplies for garden equipment, power tools, and
                similar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Locations with increased risk</strong> — bathrooms, shower rooms, swimming
                pools, agricultural premises, construction sites, and caravans all require enhanced
                RCD protection under their specific BS 7671 chapters. Bathroom circuits require 30mA
                RCD protection for all circuits within the room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables buried in walls</strong> — cables buried in walls at a depth less
                than 50mm that are not protected by earthed metallic covering, mechanical
                protection, or a 30mA RCD must be installed in a zone above or beside an accessory.
                This requirement ensures that anyone drilling into a wall is protected if they
                strike a cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The absence of RCD protection on socket-outlet circuits is a C2 observation (potentially
          dangerous) on an EICR for most domestic and commercial properties, making the report
          Unsatisfactory. Landlords and property owners must arrange for RCD protection to be
          installed as a remedial action.
        </p>
      </>
    ),
  },
  {
    id: 'choosing',
    heading: 'Choosing the Right RCD Type for Your Installation',
    content: (
      <>
        <p>
          Selecting the correct RCD type depends on the installation type, the number of circuits,
          the budget, and the sensitivity to nuisance tripping. The following guidance covers the
          most common UK domestic and light commercial scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New domestic consumer unit</strong> — specify an all-RCBO board with Type A
                RCBOs as standard. The additional cost over a split-load RCCB/MCB board is modest
                and eliminates nuisance tripping completely. Where budget is constrained, a
                split-load board with two RCCBs (one for lighting, one for power) provides
                acceptable protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging circuit</strong> — EV charger circuits require a Type A or Type
                B RCD (not Type AC). If the EV charger has built-in Type B protection, a Type A
                upstream RCD is acceptable. Check the charger manufacturer's specifications
                carefully, as requirements vary between products.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrofit on existing board</strong> — where the existing board is in good
                condition, individual RCBOs can replace MCBs for circuits requiring additional
                protection. Alternatively, an RCDM can be added for grouped circuit protection, or
                SRCDs can provide point-of-use protection for individual sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial installation with high leakage</strong> — consider 100mA or 300mA
                RCDs as the upstream device with 30mA RCDs downstream. Design the system for
                selective coordination so that downstream faults trip only the local 30mA device.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: RCD Work and Certification',
    content: (
      <>
        <p>
          Consumer unit replacements to install RCD or RCBO protection are notifiable work in
          England and Wales under Part P of the Building Regulations. The work must be carried out
          by a competent person registered with an approved scheme (NICEIC, NAPIT, ELECSA, or
          similar) or notified to the local building control authority.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate and Test Results</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every consumer unit replacement or new circuit installation requires an Electrical
                  Installation Certificate (EIC) with a Schedule of Test Results. Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete certification on site and export a compliant PDF instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR RCD Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  During an EICR, RCDs must be tested using a calibrated RCD tester. The test
                  verifies trip time at IΔn (rated current) and at 5 × IΔn. The integral test button
                  test alone is not sufficient for an EICR. Record all RCD test results on the
                  Schedule of Test Results.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete RCD certificates and EICRs with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site certification, AI board scanning, and instant PDF export. EIC, EICR, and Minor Works certificates in one app. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RCDTypesGuidePage() {
  return (
    <GuideTemplate
      title="RCD Types UK Guide | RCCB vs RCBO vs SRCD Explained"
      description="Complete guide to RCD types in UK electrical installations. RCCB, RCBO, SRCD and RCDM explained with BS 7671 requirements, 30mA vs 100mA vs 300mA ratings, and how to choose the right device."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          RCD Types UK Guide:{' '}
          <span className="text-yellow-400">RCCB, RCBO, SRCD and RCDM Explained</span>
        </>
      }
      heroSubtitle="Everything electricians and property owners need to know about RCD types in UK installations — RCCB, RCBO, SRCD, and RCDM explained with BS 7671 18th Edition requirements, sensitivity ratings, and practical selection guidance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About RCD Types"
      relatedPages={relatedPages}
      ctaHeading="Complete RCD Certificates and EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC and EICR completion with AI board scanning, RCD test recording, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
