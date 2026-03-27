import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Lock,
  CheckCircle,
  BarChart2,
  Settings,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charging Guides', href: '/ev-charger-grants' },
  { label: 'Tethered vs Untethered EV Charger', href: '/tethered-vs-untethered-ev-charger' },
];

const tocItems = [
  { id: 'what-is-tethered', label: 'What Is a Tethered Charger?' },
  { id: 'what-is-untethered', label: 'What Is an Untethered Charger?' },
  { id: 'cable-types', label: 'Cable Types — Type 2 & Type 1' },
  { id: 'pros-cons-tethered', label: 'Pros & Cons of Tethered' },
  { id: 'pros-cons-untethered', label: 'Pros & Cons of Untethered' },
  { id: 'theft-security', label: 'Theft & Security' },
  { id: 'future-proofing', label: 'Future-Proofing' },
  { id: 'recommendations', label: 'Recommendations by Scenario' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A tethered charger has a permanently attached cable — you plug directly into your vehicle. An untethered charger has a Type 2 socket and requires you to bring your own Mode 3 charging cable.',
  'Almost all EVs sold in the UK use a Type 2 (Mennekes) inlet, making a tethered Type 2 cable compatible with virtually every new car on UK roads as of 2025.',
  'Tethered chargers are more convenient for single-vehicle households — no cable to fetch, coil, or store. Untethered chargers offer more flexibility where multiple users or vehicle types need to share the same charger.',
  'Cable theft is a real concern for untethered chargers in exposed public or communal locations — cable locking mechanisms and cable management features reduce risk but do not eliminate it.',
  'For most domestic UK installations, a tethered 7.4kW charger is the recommended choice. For commercial, shared, or future-proofed installations, untethered with a socket is preferable.',
];

const faqs = [
  {
    question: 'What is the difference between a tethered and untethered EV charger?',
    answer:
      'A tethered EV charger has a Mode 3 charging cable permanently fixed to the charge point unit. You simply take the free end (the vehicle connector) and plug it into your car. An untethered EV charger has a Type 2 socket outlet on the charge point unit but no cable. You must provide your own Mode 3 cable (Type 2 to Type 2, or Type 2 to CCS if you have a DC-capable car and an AC-compatible cable), plug one end into the charge point socket, and the other into your vehicle. In the UK, the vast majority of home and workplace chargers are AC Mode 3 units operating at 7.4kW (single-phase) or 22kW (three-phase).',
  },
  {
    question: 'Which connector type do tethered UK chargers use?',
    answer:
      'Almost all tethered home and workplace AC chargers in the UK use a Type 2 (IEC 62196-2 Type 2, also known as Mennekes) vehicle connector. This is the European standard connector and is used by essentially every EV sold in the UK market since around 2013, including vehicles from Tesla (Models 3, Y, S, X), Volkswagen Group (VW, Audi, Seat, Skoda, Porsche), BMW Group, Mercedes, Hyundai, Kia, Nissan, Renault, Ford, Vauxhall, Peugeot, and all others. A small number of older imports (pre-2013 Nissan LEAF, some early Mitsubishi models) use Type 1 (SAE J1772) connectors, but these vehicles are becoming rare and purchasing a Type 2 tethered charger is safe for any new UK EV purchase.',
  },
  {
    question: 'Is an untethered or tethered charger better for a flat?',
    answer:
      'For a flat with a dedicated parking space, a tethered charger is generally the most convenient option — particularly if only one household uses that parking space. However, for a flat in a building with communal parking bays that multiple residents might use, an untethered charger (socket outlet) is preferable, as different residents can use the same charge point with their own cables. In communal settings, you will also need to consider access control (RFID or app authentication) and a management system so residents pay for the energy they use. If the flat has a car club bay or visitor parking that requires open access, the Public Charge Point Regulations 2023 may also apply.',
  },
  {
    question: 'Can I steal a cable from an untethered EV charger?',
    answer:
      'A Mode 3 charging cable (Type 2 to Type 2) costs approximately £150–350 for a quality 7.4kW cable. Cable theft from untethered chargers does occur, particularly in exposed car parks and on-street locations. Most modern untethered chargers have a cable locking feature: when a charging session starts, the IEC 62196-2 Type 2 connector locks into the charge point socket and the vehicle inlet, preventing removal until the session ends or the vehicle door is unlocked. This is a feature of the Mode 3 protocol, not just the charger hardware. However, the cable can still be cut or removed between sessions. If cable theft is a concern, a tethered charger eliminates the risk entirely.',
  },
  {
    question: 'Will my untethered charger still work with future EVs?',
    answer:
      'Type 2 AC charging is a European (and UK) standard that is not expected to change in the foreseeable future. All EVs sold in Europe must accept Type 2 AC charging under EU regulations, and the UK has maintained this standard post-Brexit. The Type 2 socket on an untethered charger will remain compatible with new EVs for many years. The main uncertainty is around DC fast charging, where multiple standards (CCS, CHAdeMO, Tesla Supercharger) currently coexist, but this does not affect AC home and workplace charging. An untethered AC charger installed today should remain usable for the life of the installation.',
  },
  {
    question: 'Can I switch a tethered charger to untethered (or vice versa)?',
    answer:
      'Some charger models are available in both tethered and untethered versions but are not field-convertible — the two versions have different internal wiring and housing. You cannot simply swap a tethered cable for a socket on most charger models. If your requirements change, you would need to replace the charger unit (though the circuit wiring, consumer unit breaker, and earthing arrangements can usually be reused). A few models (notably some Easee Charge variants) have been offered in configurations that make conversion easier, but this is not standard across the industry. When specifying, it is worth confirming with the manufacturer whether conversion is possible.',
  },
  {
    question: 'What length cable should I choose for a tethered charger?',
    answer:
      'Most tethered home chargers are available with a 5m or 8.5m cable. A 5m cable is sufficient for most domestic driveways where the car parks close to the charger and the vehicle inlet is on the driver\'s side or rear. An 8.5m cable provides more flexibility for longer vehicles, garages where the car enters nose-first, or where the charger must be mounted at one end of a bay with the vehicle inlet at the far end. For workplace installations with clearly defined bays, 5m is almost always adequate. Longer cables are heavier, more difficult to coil, and more susceptible to trip hazards — only choose 8.5m if 5m is genuinely insufficient for the installation layout.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-brand-comparison',
    title: 'EV Charger Brand Comparison',
    description: 'Zappi vs Ohme vs Pod Point vs Easee vs Wallbox — full 2025 comparison.',
    icon: BarChart2,
    category: 'Guide',
  },
  {
    href: '/smart-ev-charging',
    title: 'Smart EV Charging UK',
    description: 'Smart Charge Points Regulations, off-peak tariffs, solar integration.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/ev-charger-grants',
    title: 'EV Charger Grants UK',
    description: 'EVHS and WCS grant guide — £350 for homes and up to £14,000 for businesses.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/ev-charging-legislation',
    title: 'EV Charging Legislation UK',
    description: 'Smart Charge Points Regulations 2021, Part S, and BS 7671 Section 722.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/ev-charging-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete BS 7671 EV charging certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-tethered',
    heading: 'What Is a Tethered EV Charger?',
    content: (
      <>
        <p>
          A tethered EV charger has a Mode 3 AC charging cable permanently attached to the charge
          point unit. One end of the cable is hardwired or factory-fitted into the charger
          housing; the other end terminates in a vehicle connector (almost always Type 2 in the
          UK) that plugs directly into the vehicle's charging inlet. To charge, you simply
          lift the cable from its holster, walk to your car, and plug in.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mode 3 charging</strong> — all dedicated home and workplace AC EV
                chargers in the UK operate in Mode 3 (IEC 61851-1). This mode uses a
                Communication Pilot signal between the charger and vehicle to negotiate charge
                rate and confirm that both ends are safely connected before power flows.
                Mode 3 is distinct from Mode 2 (portable "granny charger" with in-cable control
                box) and Mode 4 (DC rapid charging).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable holster</strong> — tethered chargers include a cable management
                holster or bracket to store the cable neatly when not in use. The vehicle
                connector typically clips into a socket on the front or side of the unit to
                protect the pins from the elements and prevent trip hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed cable length</strong> — tethered cables are typically 5m or
                8.5m. The cable cannot be extended after installation. If the driveway
                layout changes (e.g., a second vehicle parks further away), a longer tethered
                cable or an additional charger may be needed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-untethered',
    heading: 'What Is an Untethered EV Charger?',
    content: (
      <>
        <p>
          An untethered EV charger (also called a socketed charger) has a Type 2 outlet socket
          on the charge point unit but no permanently attached cable. The user provides their
          own Mode 3 cable — plugging one end into the charge point socket and the other into
          the vehicle inlet. The cable is the user's property and travels with them (in the
          car boot, typically).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 2 socket</strong> — the IEC 62196-2 Type 2 (Mennekes) socket is
                the European standard for AC EV charging. It accepts Type 2 to Type 2 cables
                (used by all modern EVs in the UK). Some older EVs imported from North America
                or Japan use Type 1 (SAE J1772) inlets and require a Type 1 to Type 2 cable
                (Type 1 end into the vehicle, Type 2 end into the charger socket).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable rating</strong> — the user's cable must be rated for the maximum
                charge rate. A 32A (7.4kW) cable is required for a 7.4kW charger. Most
                quality Mode 3 cables are rated for 32A. Cheaper cables may only be rated
                for 16A or 20A, limiting charge speed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable locking</strong> — when a charging session is active, the
                Type 2 connector locks into the charge point socket via a mechanical latch
                (IEC 62196-2 specification). The connector cannot be removed without ending
                the session. This prevents accidental disconnection but not deliberate
                cable cutting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-types',
    heading: 'Cable Types — Type 2 and Type 1',
    content: (
      <>
        <p>
          Understanding cable types is important both for recommending the right charger
          configuration and for advising customers on which cable to purchase for untethered
          installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 2 to Type 2 (Mennekes to Mennekes)</strong> — the standard cable
                for all modern UK EVs. Both ends are 7-pin IEC 62196-2 Type 2 connectors.
                Used for: Tesla (Models 3/Y/S/X), Volkswagen Group vehicles, BMW, Mercedes,
                Hyundai, Kia, Nissan LEAF (2013+), Renault Zoe, Vauxhall, Peugeot, Ford
                Mustang Mach-E, and virtually all other EVs sold new in the UK. Prices range
                from approximately £100 (basic) to £350 (premium with data cable for
                reduced latency). A 7.5m Type 2 cable at 32A rating is the recommended
                length and rating for domestic use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 1 to Type 2 (SAE J1772 to Mennekes)</strong> — required for
                older EVs with a Type 1 inlet, primarily pre-2013 Nissan LEAF, early
                Mitsubishi Outlander PHEV, some Chevrolet Volt imports. The Type 1 end
                (5-pin round connector) goes into the vehicle; the Type 2 end goes into the
                charge point socket. These vehicles typically charge at a maximum of 7.4kW
                on single-phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCS (Combined Charging System)</strong> — used for DC fast charging,
                not AC home charging. A CCS inlet includes a Type 2 AC section (upper pins)
                plus two additional DC pins (lower section). For home AC charging, the vehicle
                uses the Type 2 upper section only with a standard Type 2 cable. CCS is not
                relevant to the tethered vs untethered decision for AC chargers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pros-cons-tethered',
    heading: 'Pros and Cons of Tethered Chargers',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <p className="font-semibold text-white mb-3">Advantages of tethered chargers</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Convenience</strong> — no cable to retrieve from the boot, plug in
                both ends, and coil away afterwards. Simply take the tethered cable and
                plug into the car. Particularly appreciated during cold, wet, or dark winter
                evenings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>No additional cable cost</strong> — the cable is included with the
                charger. No need to purchase a separate Mode 3 cable (£100–350).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable always on-site</strong> — the cable cannot be accidentally left
                at home, in the car, or forgotten. It is always ready to use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>No cable theft</strong> — the cable is permanently attached and cannot
                be removed between sessions.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <p className="font-semibold text-white mb-3">Disadvantages of tethered chargers</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single cable type</strong> — a Type 2 tethered cable will not work
                with older Type 1 vehicles (pre-2013 Nissan LEAF, etc.) without an adapter,
                which is not recommended for Mode 3 charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed cable length</strong> — if the car is parked at an unexpected
                angle or distance, the cable may not reach. Cannot be extended after installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable degradation</strong> — the permanently attached cable is exposed
                to weather, UV, and wear for the life of the charger. Cable replacement
                (if available) is a manufacturer service job, not a quick swap.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not ideal for shared bays</strong> — in communal parking, multiple
                users sharing one charger with different vehicles and potentially different
                connector needs makes untethered more practical.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pros-cons-untethered',
    heading: 'Pros and Cons of Untethered Chargers',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <p className="font-semibold text-white mb-3">Advantages of untethered chargers</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple users, multiple vehicles</strong> — any user with a Type 2
                cable (or Type 1 to Type 2 adapter) can use the same charger socket. Ideal
                for shared bays, communal car parks, and visitor charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Future-proof</strong> — if cable standards change, the charger socket
                remains useful (a new cable type is all that is needed, not a new charger).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>No cable degradation at the charger</strong> — the charger housing
                contains only the socket; the cable wears normally as a user-replaceable item.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <p className="font-semibold text-white mb-3">Disadvantages of untethered chargers</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requires a separate cable</strong> — the user must purchase and maintain
                a Mode 3 cable (£100–350). The cable must be stored (usually in the boot) and
                handled at each charging session.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable theft risk</strong> — cables left connected to an untethered
                charger between sessions can be stolen. Cable locking during sessions reduces
                (but does not eliminate) this risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Convenience</strong> — handling a charging cable in poor weather is
                less convenient than picking up a tethered connector. The cable can be heavy
                (a 7.5m 32A Type 2 cable weighs approximately 3–4kg).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'theft-security',
    heading: 'Theft & Security Considerations',
    content: (
      <>
        <p>
          Cable theft and charge point vandalism are genuine concerns for EV charger
          installations in exposed or communal locations. Understanding the security features
          of different charger types helps installers advise customers appropriately.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tethered cable security</strong> — the cable is an integral part of
                the charge point unit and cannot be removed by users. The connection between
                the cable and the charger housing is typically covered by the enclosure.
                Cable cutting is possible but uncommon for a tethered unit as the cable has
                no resale value without the charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Untethered cable locking</strong> — IEC 62196-2 Type 2 connectors
                include a mechanical locking actuator that engages when a session starts.
                The connector is locked at both the charge point socket and the vehicle inlet
                until the session ends. A cable left plugged in but with no active session
                (between sessions) is not locked and can be removed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charger housing security</strong> — all quality chargers have
                tamper-resistant housing with security screws. Some commercial chargers
                include alarmed enclosures and remote monitoring that alerts the operator
                to physical tampering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommendation for communal areas</strong> — in communal car parks
                and exposed locations, tethered chargers eliminate cable theft risk. If
                untethered chargers are required for access flexibility, choose chargers with
                a socket guard (a lockable cover over the socket when not in use) and advise
                users not to leave their cable plugged into the socket between sessions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'future-proofing',
    heading: 'Future-Proofing Your Installation',
    content: (
      <>
        <p>
          The question of future-proofing often leads customers to favour untethered chargers,
          on the assumption that connector standards may change. In practice, the risk of
          obsolescence is low for AC Type 2 charging, and other future-proofing considerations
          are more important.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 2 stability</strong> — the Type 2 connector is mandated by
                EU Directive 2014/94/EU and is the UK standard (retained post-Brexit). All
                EVs sold new in the UK accept Type 2 AC charging. No change to this standard
                is anticipated in the foreseeable future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart functionality</strong> — a more relevant future-proofing
                consideration is ensuring the charger supports OCPP (Open Charge Point
                Protocol) and can receive firmware updates, enabling it to benefit from
                improvements to smart charging, demand response, and vehicle API integration
                over its lifetime. All OZEV-approved smart chargers support these features.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load management headroom</strong> — if the property may add
                additional chargers in future, installing a dynamic load management system
                from the start (even for a single charger) means additional chargers can
                be added without supply upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase readiness</strong> — if the property has or may gain a
                three-phase supply, installing a three-phase-capable charger (or conduit that
                could accommodate three-phase cabling in future) allows upgrading from 7.4kW
                to 22kW without additional groundworks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recommendations',
    heading: 'Recommendations by Installation Scenario',
    content: (
      <>
        <p>
          The right choice between tethered and untethered depends on the specific installation
          context. The following recommendations cover the most common UK installation scenarios.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detached house, single EV household</strong> — tethered 7.4kW, 5m
                cable. Maximum convenience; no shared access needed; cable theft not a concern.
                Specify Zappi if solar PV is installed; Pod Point or Ohme if smart tariff
                optimisation is the priority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flat, private parking bay</strong> — tethered 7.4kW (most convenient
                for the resident); or untethered if visitor access to the bay is occasionally
                needed. Ohme ePod or Pod Point Solo 3 popular choices for flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal car park, multiple residents</strong> — untethered with
                access control (RFID or app). Each resident uses their own cable. Load
                management essential. Easee Charge or Pod Point Solo 3 (socket version)
                with a management platform.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace, employee parking</strong> — untethered (employees bring
                their own cables) with RFID access control and fleet management portal.
                Easee Charge with Equalizer or Pod Point Pro for multi-charger sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fleet depot, commercial vehicles</strong> — untethered 22kW three-phase
                (for vans with 11–22kW onboard chargers) with load management. Easee Charge
                (22kW) or Wallbox Commander 2 with fleet management software.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visitor or public access</strong> — untethered (visitors have their
                own cables) with contactless payment to comply with Public Charge Point
                Regulations 2023. Pod Point network chargers or similar payment-enabled units.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Advising Customers Confidently',
    content: (
      <>
        <p>
          The tethered vs untethered question is one of the first things customers ask when
          enquiring about EV charger installation. Being able to give a clear, informed
          recommendation — based on their specific situation — builds trust and positions
          you as a knowledgeable installer rather than just a fitter.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate Every Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Whether tethered or untethered, every EV charger installation requires a BS
                  7671 Section 722 electrical installation certificate. Use the{' '}
                  <SEOInternalLink href="/tools/ev-charging-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete the certificate on site and send the PDF to the customer before
                  you leave. For OZEV grant-funded installations, the certificate must be
                  submitted with the grant claim.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Add Cable as an Upsell for Untethered</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you're installing an untethered charger, offer to supply a quality
                  32A Type 2 to Type 2 cable (7.5m) as a chargeable add-on. A quality cable
                  is worth £150–250 to the customer and a useful margin item for you.
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to add it as a line item on the quote.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional EV charger installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for EV certificates, quoting, and job management. Complete every installation professionally. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TetheredUntetheredEVChargePage() {
  return (
    <GuideTemplate
      title="Tethered vs Untethered EV Charger UK | Which Should You Choose?"
      description="Complete guide to tethered vs untethered EV chargers in the UK. Pros and cons of each, cable types (Type 2, Type 1), theft and security, future-proofing, aesthetic considerations, and clear recommendations for domestic, workplace, and fleet installations."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charger Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Tethered vs Untethered EV Charger UK:{' '}
          <span className="text-yellow-400">Which Should You Choose?</span>
        </>
      }
      heroSubtitle="A complete guide to the differences between tethered and untethered EV chargers — pros, cons, cable types (Type 2 and Type 1), theft and security, future-proofing, and clear scenario-by-scenario recommendations for homes, flats, workplaces, and fleet depots."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Tethered and Untethered EV Chargers"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Charging Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EV certificates, quoting, and job management. Tethered, untethered, domestic, or commercial — every installation done right. 7-day free trial."
    />
  );
}
