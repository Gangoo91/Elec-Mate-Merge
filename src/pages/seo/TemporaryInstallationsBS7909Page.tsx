import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  Shield,
  ShieldCheck,
  FileText,
  GraduationCap,
  ClipboardCheck,
  HardHat,
  Heart,
  Plug,
  BookOpen,
  Cable,
  TestTube,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-on-site' },
  { label: 'Temporary Installations', href: '/guides/temporary-installations-bs-7909' },
];

const tocItems = [
  { id: 'scope-bs7909', label: 'Scope of BS 7909' },
  { id: 'supply-design', label: 'Temporary Supply Design' },
  { id: 'earthing-bonding', label: 'Earthing and Bonding' },
  { id: 'protection-devices', label: 'Protection and Overcurrent Devices' },
  { id: 'testing-verification', label: 'Testing and Verification' },
  { id: 'documentation', label: 'Documentation Requirements' },
  { id: 'construction-vs-events', label: 'Construction Sites vs Events' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7909 is the Code of Practice for temporary electrical systems for entertainment and related purposes — it supplements BS 7671 with requirements specific to temporary installations.',
  'Temporary installations must have an effective earthing system, appropriate RCD protection (30mA for socket outlets), and be designed to withstand the environmental conditions on site.',
  'All temporary installations must be inspected and tested before first use and at regular intervals thereafter — typically every 3 months on construction sites.',
  'Comprehensive documentation is required including single-line diagrams, test certificates, risk assessments, and method statements for the installation.',
  'Elec-Mate generates electrical installation certificates, risk assessments, and RAMS documents for temporary installations — saving hours of paperwork per project.',
  'RCD type selection matters: Type A covers pulsating DC; Type F covers composite/mixed-frequency loads (variable-speed drives); Type B covers smooth DC components — Type AC (BS 7671 Reg 531.3.3) may now only serve fixed equipment where the load contains no DC components, so it cannot be the default on modern loads.',
  'Section 704 does not apply to administrative locations on construction sites (offices, canteens, welfare facilities) — those areas are subject to the general requirements of BS 7671 only (Reg 704.1.1).',
  'On construction and demolition sites a PME (TN-C-S) earthing facility must not be used unless every extraneous-conductive-part is reliably bonded to the main earthing terminal (BS 7671 Reg 704.411.3.1) — in practice TT with an earth electrode is the default.',
];

const faqs = [
  {
    question: 'What is the difference between BS 7909 and BS 7671?',
    answer:
      'BS 7671 (the IET Wiring Regulations, 18th Edition) is the national standard for electrical installations in the UK and applies to all electrical installations, including temporary ones. BS 7909 is a separate Code of Practice that specifically addresses temporary electrical systems for entertainment and related purposes — including outdoor events, concerts, festivals, exhibitions, and temporary structures. BS 7909 supplements BS 7671 with additional requirements that are specific to temporary installations, such as environmental protection (IP ratings for outdoor use), cable management in public areas, generator supply requirements, and the particular risks associated with temporary structures and outdoor events. Where BS 7909 applies, BS 7671 still forms the foundation — BS 7909 adds to it but does not replace it. For construction site temporary installations that are not entertainment-related, BS 7671 Section 704 (Construction and demolition site installations) applies directly.',
  },
  {
    question: 'Does a temporary installation need an electrical certificate?',
    answer:
      'Yes. Temporary installations must be inspected and tested in accordance with BS 7671, and the results must be recorded on the appropriate certificate. For a new temporary installation, an Electrical Installation Certificate (EIC) must be issued, confirming that the installation has been designed, constructed, inspected, and tested in accordance with BS 7671. For periodic re-testing (which should occur at least every 3 months on construction sites and before each event for entertainment installations), an Electrical Installation Condition Report (EICR) should be issued. Minor additions or alterations to an existing temporary installation may be covered by a Minor Electrical Installation Works Certificate (MEIWC). All certificates must be completed by a competent person and retained as part of the project documentation.',
  },
  {
    question: 'What earthing system is used for temporary installations?',
    answer:
      'The earthing system for a temporary installation depends on the supply source. If the temporary installation is supplied from the public distribution network (mains supply), the earthing arrangement will typically follow the DNO supply — TN-S, TN-C-S (PME), or TT. However, BS 7909 recommends against relying on a PME (TN-C-S) earth for temporary installations in outdoor or high-risk environments because a loss of the PEN conductor could put exposed metalwork at mains potential. In these cases, a TT earthing arrangement with earth electrodes is preferred. If the supply is from a generator, the earthing system will typically be either TN-S (with the generator star point earthed and a separate earth conductor) or IT (unearthed, with an insulation monitoring device). For outdoor events and festival installations, TT earthing with driven earth electrodes is the most common and safest arrangement. The earth electrode resistance must be tested and verified before the installation is energised.',
  },
  {
    question: 'How often should a temporary installation be inspected?',
    answer:
      'The inspection frequency depends on the type of temporary installation and the environment. BS 7671 Regulation 652 requires the interval to be determined by a competent person having regard to the type of installation, its use, and the external influences it is subjected to. Established industry practice (reflected in IET Guidance Note 3 and HSE guidance) is that construction site temporary installations are inspected and tested at intervals not exceeding 3 months. For entertainment and events, BS 7909 recommends inspection and testing before each event or season of use. If the installation remains in place for an extended period — for example, a long-running construction project — periodic inspection should continue at 3-monthly intervals throughout. Between formal inspections, visual checks should be carried out daily or weekly by a competent person — looking for cable damage, loose connections, water ingress, and signs of overheating. Any defects found during visual checks must be reported and rectified before the installation is used.',
  },
  {
    question: 'What IP rating is required for temporary outdoor electrical equipment?',
    answer:
      'For outdoor temporary installations, all electrical equipment must be protected against water ingress and dust to a level appropriate for the environment. The minimum IP rating for outdoor distribution equipment is typically IP44 (protected against splashing water from all directions and objects greater than 1mm). For equipment that may be exposed to heavy rain, hose-down cleaning, or water jets, IP55 or IP65 is recommended. Socket outlets used outdoors should be IP44 minimum when in use (with the flap closed over the plug). Equipment at ground level in areas prone to flooding or standing water should be IP67 (protected against temporary immersion). All connections, junction boxes, and cable terminations must be made using appropriate IP-rated enclosures — never use domestic-grade junction boxes or connector strips in outdoor temporary installations. The IP rating should be clearly marked on all equipment.',
  },
  {
    question: 'Can I use a domestic consumer unit for a temporary installation?',
    answer:
      'No. Domestic consumer units (metal or plastic, designed for permanent fixed installation in dry indoor environments) are not suitable for temporary installations on construction sites or at outdoor events. Temporary installations require distribution equipment that is designed for the environment — typically industrial-grade distribution boards in IP44 or higher enclosures, with BS 4343 (IEC 60309) industrial plugs and sockets. The distribution boards must be mechanically robust (able to withstand the knocks and impacts of a construction or event environment), environmentally protected (IP-rated for outdoor or wet conditions), and electrically appropriate (with adequate fault ratings, RCD protection, and cable entries). Pre-assembled temporary distribution boards ("panel boards" or "distro boards") specifically designed for construction or event use are widely available and should always be used in preference to domestic equipment.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-on-site',
    title: 'Electrical Safety on Site',
    description:
      'Complete guide to managing electrical risks on construction sites including 110V systems.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S, TT, and IT earthing systems explained with practical testing guidance.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'How to test RCDs correctly including trip times, test currents, and recording results.',
    icon: TestTube,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description:
      'Risk assessments for temporary installations covering environmental and electrical hazards.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The IET Wiring Regulations that underpin all temporary installation requirements.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/construction-site-electrical-safety',
    title: 'Construction Site Electrical Safety',
    description:
      'CDM duties, 110V systems, and construction-specific electrical safety requirements.',
    icon: HardHat,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'scope-bs7909',
    heading: 'What Does BS 7909 Cover?',
    content: (
      <>
        <p>
          BS 7909 is the British Standard Code of Practice for the design and installation of
          temporary electrical systems for entertainment and related purposes. It was developed to
          address the specific requirements of temporary electrical installations that go beyond
          what <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          covers for permanent installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Entertainment and events:</strong> Concerts, festivals, theatres, outdoor
                shows, exhibitions, conferences, and any temporary venue where electrical systems
                are installed for a limited period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary structures:</strong> Marquees, temporary stages, grandstands,
                hospitality areas, and any structure erected for a temporary purpose that requires
                an electrical supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction sites:</strong> While BS 7671 Section 704 specifically covers
                construction and demolition site installations, the principles in BS 7909 regarding
                temporary supply design, environmental protection, and cable management are also
                applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator-supplied installations:</strong> BS 7909 provides detailed
                guidance on using generators as supply sources, including earthing arrangements,
                voltage regulation, and fault protection for generator-fed systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7909 does not replace BS 7671 — it supplements it. Every temporary installation must
          comply with BS 7671 as the baseline, with BS 7909 adding additional requirements where the
          temporary nature of the installation creates specific risks (such as cable damage from
          foot traffic, water ingress from outdoor conditions, or the need for rapid assembly and
          disassembly).
        </p>
      </>
    ),
  },
  {
    id: 'supply-design',
    heading: 'Temporary Supply Design',
    content: (
      <>
        <p>
          Designing a temporary electrical supply requires careful planning. Unlike a permanent
          installation where the supply is established and the installation is built around it, a
          temporary installation often starts with the question: "Where is the power coming from,
          and how much do we need?"
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply sources:</strong> Temporary installations can be supplied from the
                public mains (via a temporary builder's supply from the DNO), a portable generator,
                or a combination of both. For large events, multiple generators may be used in
                parallel with automatic changeover from mains.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load assessment:</strong> Calculate the maximum demand for the temporary
                installation, applying diversity factors where appropriate. Include all loads:
                lighting, power tools (or stage equipment for events), heating, welfare facilities,
                and any specialist equipment. Size the supply, main cables, and protection devices
                to handle the maximum demand with adequate headroom.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution layout:</strong> Plan the distribution board layout to minimise
                cable runs and provide power where it is needed. Use sub-distribution boards to
                bring power to different areas of the site or event. Each distribution board must
                have its own main isolator, RCD protection, and circuit protection devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection:</strong> Cables for temporary installations must be
                suitable for the environment. Use SWA (Steel Wire Armoured) or equivalent for buried
                or semi-permanent runs. Use H07RN-F (heavy-duty rubber-sheathed flexible cable) for
                above-ground runs that may be subject to foot traffic or mechanical damage. All
                cables must be adequately rated for the current they will carry, taking into account{' '}
                <SEOInternalLink href="/guides/cable-sizing-guide-bs-7671">
                  cable sizing factors
                </SEOInternalLink>{' '}
                including ambient temperature and grouping.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4 overflow-x-auto">
          <h3 className="font-bold text-white text-lg mb-1">Minimum IP ratings by environment</h3>
          <p className="text-white/60 text-sm mb-4">
            Indicative guidance for distribution equipment, enclosures and connectors. Select for
            the worst conditions the equipment will actually see (rain, hose-down, ground water),
            not the conditions on a dry commissioning day.
          </p>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-white/70 border-b border-white/10">
                <th className="py-2 pr-3 font-semibold">Location</th>
                <th className="py-2 pr-3 font-semibold">Minimum IP</th>
                <th className="py-2 font-semibold">Protects against</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5">
                <td className="py-3 pr-3 align-top">Indoor / under cover, dry</td>
                <td className="py-3 pr-3 font-semibold align-top">IP2X – IP4X</td>
                <td className="py-3 align-top">Finger/solid-object contact; no specific water protection</td>
              </tr>
              <tr className="border-b border-white/5 bg-blue-900/20">
                <td className="py-3 pr-3 align-top">Outdoor, general exposure</td>
                <td className="py-3 pr-3 font-semibold align-top">IP44</td>
                <td className="py-3 align-top">Solid objects &gt;1mm and splashing water from any direction</td>
              </tr>
              <tr className="border-b border-white/5 bg-blue-900/20">
                <td className="py-3 pr-3 align-top">Heavy rain / hose-down cleaning</td>
                <td className="py-3 pr-3 font-semibold align-top">IP55 – IP65</td>
                <td className="py-3 align-top">Dust ingress and low-pressure water jets from any direction</td>
              </tr>
              <tr className="bg-blue-900/30">
                <td className="py-3 pr-3 align-top">Ground level, flood / standing water risk</td>
                <td className="py-3 pr-3 font-semibold align-top">IP67</td>
                <td className="py-3 align-top">Dust-tight and temporary immersion (up to 1m for 30 min)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-bonding',
    heading: 'Earthing and Bonding for Temporary Installations',
    content: (
      <>
        <p>
          Earthing is the single most critical safety element of a temporary installation. Without
          effective earthing, protective devices cannot operate in the event of a fault, and exposed
          metalwork can become live — creating a lethal shock hazard.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing is preferred for outdoor temporary installations.</strong> BS
                7909 recommends against relying on PME (TN-C-S) earthing for temporary installations
                in outdoor or high-risk environments. A loss of the PEN conductor in a PME system
                would put all exposed metalwork at mains potential — in an outdoor environment with
                wet conditions and metallic structures, this is extremely dangerous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrodes:</strong> For TT earthing, driven earth electrodes (copper
                clad steel rods) are used to establish an earth connection. The electrode resistance
                must be measured and verified — a value of 200 ohms or less is typically required to
                ensure RCD operation within the required disconnection time. Multiple electrodes may
                be needed to achieve this in poor soil conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding:</strong> All extraneous conductive parts within the temporary
                installation must be bonded to the main earthing terminal. This includes metal
                structures (scaffolding, staging, trusses), metallic water pipes, and any other
                metalwork that could introduce an earth potential. Main protective bonding
                conductors are sized per BS 7671 Reg 544.1.1 — not less than half the
                cross-sectional area of the earthing conductor, with an absolute minimum of 6mm²
                copper (or 10mm² copper where PME supply conditions apply, per Table 54.8).
                Supplementary bonding conductors (Reg 544.2) must be at least 2.5mm² copper where
                mechanically protected, or 4mm² copper where they are not.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4 overflow-x-auto">
          <h3 className="font-bold text-white text-lg mb-1">Earthing systems for temporary supplies</h3>
          <p className="text-white/60 text-sm mb-4">
            On construction and demolition sites, a PME (TN-C-S) earthing facility must not be used
            unless every extraneous-conductive-part is reliably bonded to the main earthing terminal
            (BS 7671 Reg 704.411.3.1) — in practice this is very difficult to maintain, so TT is the
            default.
          </p>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-white/70 border-b border-white/10">
                <th className="py-2 pr-3 font-semibold">System</th>
                <th className="py-2 pr-3 font-semibold">Source</th>
                <th className="py-2 font-semibold">Suitability for temporary work</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5 bg-green-900/20">
                <td className="py-3 pr-3 font-semibold align-top">TT</td>
                <td className="py-3 pr-3 align-top">Mains or generator with earth electrode</td>
                <td className="py-3 align-top">
                  Preferred outdoors and on sites. Fault protection relies on RCDs; electrode
                  resistance must be measured and stable.
                </td>
              </tr>
              <tr className="border-b border-white/5 bg-blue-900/20">
                <td className="py-3 pr-3 font-semibold align-top">TN-S</td>
                <td className="py-3 pr-3 align-top">DNO TN-S, or generator with earthed star point + separate PE</td>
                <td className="py-3 align-top">
                  Acceptable where a sound, dedicated earth conductor is available all the way back
                  to the source.
                </td>
              </tr>
              <tr className="border-b border-white/5 bg-red-900/20">
                <td className="py-3 pr-3 font-semibold align-top">TN-C-S (PME)</td>
                <td className="py-3 pr-3 align-top">DNO combined PEN</td>
                <td className="py-3 align-top">
                  Restricted on sites (Reg 704.411.3.1); a lost PEN puts metalwork at mains
                  potential — avoid outdoors.
                </td>
              </tr>
              <tr className="bg-amber-900/20">
                <td className="py-3 pr-3 font-semibold align-top">IT</td>
                <td className="py-3 pr-3 align-top">Unearthed generator</td>
                <td className="py-3 align-top">
                  Continues to run on a first fault, but requires an insulation monitoring device to
                  alarm before a second fault occurs.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For generator-supplied installations, the earthing arrangement depends on the generator
          configuration. A generator with an earthed star point typically operates as a TN-S system.
          An unearthed generator operates as an IT system, which requires an insulation monitoring
          device to detect first faults. The{' '}
          <SEOInternalLink href="/earthing-arrangements">earthing arrangement</SEOInternalLink> must
          be documented on the single-line diagram and verified by testing before the installation
          is energised.
        </p>
      </>
    ),
  },
  {
    id: 'protection-devices',
    heading: 'Protection and Overcurrent Devices',
    content: (
      <>
        <p>
          Temporary installations require the same level of overcurrent and fault protection as
          permanent installations — and often more, because the environmental conditions are harsher
          and the risk of damage is higher.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection:</strong> Socket-outlets with a rated current up to 32A
                require additional protection by a 30mA RCD (BS 7671 Reg 411.3.3), with limited
                exceptions permitted by that regulation. For TT earthing systems, RCD protection is
                essential for fault protection:
                earth fault loop impedance via driven electrodes is typically too high for
                overcurrent devices alone to achieve the required disconnection times, so RCDs are
                the primary means of achieving disconnection. The RCD type must be matched to the
                load it protects (BS 7671 Reg 531.3.3) — see the table below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCBs and RCBOs:</strong> Each circuit must be protected by an appropriately
                rated MCB or RCBO. The protective device must be selected to provide both overload
                protection and short-circuit protection. The breaking capacity of the protective
                device must be equal to or greater than the prospective fault current at the point
                of installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discrimination:</strong> Where multiple levels of RCD protection are used
                (for example, a 100mA time-delayed RCD at the main board and 30mA RCDs at
                sub-boards), discrimination must be achieved to ensure that a fault on one circuit
                only trips the nearest RCD, not the upstream one.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4 overflow-x-auto">
          <h3 className="font-bold text-white text-lg mb-1">RCD type selection (Reg 531.3.3)</h3>
          <p className="text-white/60 text-sm mb-4">
            Choose the lowest type that fully covers the residual-current waveform the load can
            produce. Type AC may only serve fixed equipment with no DC content.
          </p>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-white/70 border-b border-white/10">
                <th className="py-2 pr-3 font-semibold">Type</th>
                <th className="py-2 pr-3 font-semibold">Detects</th>
                <th className="py-2 font-semibold">Typical temporary-installation loads</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5 bg-red-900/20">
                <td className="py-3 pr-3 font-semibold align-top">AC</td>
                <td className="py-3 pr-3 align-top">Sinusoidal AC residual current only</td>
                <td className="py-3 align-top">
                  Fixed resistive loads with no DC content only (e.g. simple heaters, filament
                  lamps). Not suitable as a default for modern electronics.
                </td>
              </tr>
              <tr className="border-b border-white/5 bg-blue-900/20">
                <td className="py-3 pr-3 font-semibold align-top">A</td>
                <td className="py-3 pr-3 align-top">AC + pulsating DC residual current</td>
                <td className="py-3 align-top">
                  General socket outlets, single-phase tools, most LED and switch-mode loads — the
                  practical minimum for modern equipment.
                </td>
              </tr>
              <tr className="border-b border-white/5 bg-amber-900/20">
                <td className="py-3 pr-3 font-semibold align-top">F</td>
                <td className="py-3 pr-3 align-top">As Type A + composite/mixed-frequency residual currents</td>
                <td className="py-3 align-top">
                  Single-phase variable-speed drives, dimmers and stage equipment producing
                  mixed-frequency residual currents.
                </td>
              </tr>
              <tr className="bg-purple-900/20">
                <td className="py-3 pr-3 font-semibold align-top">B</td>
                <td className="py-3 pr-3 align-top">As Type F + smooth DC residual currents (incl. 3-phase rectified)</td>
                <td className="py-3 align-top">
                  Three-phase drives, EV charge points and other equipment that can produce smooth
                  DC fault current.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/rcd-types-explained">
            type and rating of RCD
          </SEOInternalLink>{' '}
          must be carefully selected for the loads being protected. Modern entertainment lighting
          and stage equipment often contain electronic drivers that produce pulsating DC or
          composite fault currents — a standard Type AC RCD will not detect these. Use Type A as a
          minimum for most modern equipment; Type F where variable-speed drives or mixed-frequency
          loads are present; and Type B where smooth DC components exist (Reg 531.3.3).
        </p>
      </>
    ),
  },
  {
    id: 'testing-verification',
    heading: 'Testing and Verification of Temporary Installations',
    content: (
      <>
        <p>
          Every temporary installation must be inspected and tested before it is energised for the
          first time. The testing regime is the same as for a permanent installation under BS 7671
          Chapter 64 (Initial Verification), with additional visual checks for the
          temporary-specific risks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Visual inspection:</strong> Check all cables for damage; verify all
              connections are tight and properly terminated; confirm IP ratings of enclosures are
              appropriate for the environment; check cable routing for trip hazards, water exposure,
              and mechanical damage risks; verify labelling of all circuits and distribution boards.
            </li>
            <li>
              <strong>Dead tests:</strong> Continuity of protective conductors (including main and
              supplementary bonding); continuity of ring final circuits (if applicable); insulation
              resistance per Reg 643.3 (for circuits up to and including 500V, test at 500V DC with
              a minimum acceptable value of 1.0 MΩ — BS 7671 Table 64); polarity checks at all
              points.
            </li>
            <li>
              <strong>Live tests:</strong> Earth fault loop impedance at the furthest point of each
              circuit (to verify disconnection times); prospective fault current at the origin;{' '}
              <SEOInternalLink href="/rcd-testing-guide">RCD testing</SEOInternalLink> (trip time at
              rated current, 5x rated current, and ramp test); voltage and frequency at the origin.
            </li>
            <li>
              <strong>Functional tests (Reg 643.10):</strong> Verify all switching and isolation
              devices operate correctly; test emergency stop buttons and emergency lighting (where
              installed); verify that generator changeover systems operate correctly (where
              installed).
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Complete electrical certificates on your phone"
          description="Elec-Mate lets you create EIC, EICR, and Minor Works certificates directly on site. AI board scanner reads distribution board details…"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation Requirements',
    content: (
      <>
        <p>
          Temporary installations require the same documentation as permanent installations, plus
          additional records specific to the temporary nature of the work. For event installations
          under BS 7909, the documentation requirements are particularly detailed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-line diagram:</strong> A schematic showing the supply source, main
                distribution, sub-distribution, cable types and sizes, protective devices, earthing
                arrangement, and all loads. This is the reference document for anyone working on or
                maintaining the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC):</strong> Issued for the initial
                installation, confirming compliance with BS 7671. Must be completed before the
                installation is energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of test results:</strong> All dead and live test results recorded
                in the standard format. Must accompany the EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk assessment and method statement (RAMS):</strong> Covering the
                installation, commissioning, operation, and decommissioning of the temporary
                electrical system. Must be completed before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection records:</strong> For installations that remain in place
                for extended periods, regular inspection and test records (EICR) at intervals not
                exceeding 3 months.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For entertainment events, BS 7909 also recommends a site-specific electrical safety
          policy, an emergency procedure document, and a handover document for the event organisers
          confirming that the installation is safe for use.
        </p>
        <SEOAppBridge
          title="Generate RAMS and certificates with AI"
          description="Elec-Mate's AI Health and Safety agent generates complete RAMS documents for temporary installations, while the certificate app produces EIC, EICR…"
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'construction-vs-events',
    heading: 'Construction Sites vs Events: Key Differences',
    content: (
      <>
        <p>
          While the fundamental principles of temporary installation design are the same, there are
          important differences between construction site installations and entertainment/event
          installations:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Construction Sites</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <HardHat className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>BS 7671 Section 704 applies directly</span>
              </li>
              <li className="flex items-start gap-2">
                <HardHat className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>110V CTE reduced low voltage strongly preferred for portable tools (Reg 704.410.3.10)</span>
              </li>
              <li className="flex items-start gap-2">
                <HardHat className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>3-month inspection intervals</span>
              </li>
              <li className="flex items-start gap-2">
                <HardHat className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>CDM 2015 duties apply</span>
              </li>
              <li className="flex items-start gap-2">
                <HardHat className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Users are trained electricians and trades</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Entertainment and Events</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>BS 7909 supplements BS 7671</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>230V and 400V commonly used for lighting rigs</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Inspection before each event</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Public safety is the primary concern</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Users may include untrained public</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          <strong>Note on Section 704 scope (Reg 704.1.1):</strong> The particular requirements of
          Section 704 do <em>not</em> apply to administrative locations on construction sites —
          offices, cloakrooms, meeting rooms, canteens, restaurants, dormitories, and toilets are
          explicitly excluded. Those areas are treated as ordinary installations under the general
          requirements of BS 7671.
        </p>
        <p>
          The public safety dimension of event installations cannot be overstated. On a construction
          site, the users of the electrical system are (or should be) trained workers who understand
          the risks. At an event, members of the public — including children — may come into
          proximity with the temporary electrical installation. This demands higher standards of
          cable protection, enclosure security, and signage. All accessible distribution equipment
          must be locked or secured to prevent public access.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TemporaryInstallationsBS7909Page() {
  return (
    <GuideTemplate
      title="Temporary Installations BS 7909 | Events & Construction"
      description="Complete guide to temporary electrical installations under BS 7909 and BS 7671. Covers supply design, earthing, protection devices, testing…"
      datePublished="2025-09-12"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Zap}
      answerBox={{
        question: 'What is BS 7909 and how does it relate to BS 7671?',
        answer:
          'BS 7909 is the UK Code of Practice for temporary electrical systems for entertainment and related purposes — outdoor events, concerts, festivals, exhibitions and temporary structures. It supplements BS 7671 (the IET Wiring Regulations) rather than replacing it: every temporary installation must still meet BS 7671 as the baseline. Temporary installations on construction and demolition sites are instead covered directly by BS 7671 Section 704.',
        detail:
          'Section 704 mandates that a PME (TN-C-S) earthing facility shall not be used on a construction site unless all extraneous-conductive-parts are reliably bonded (Reg 704.411.3.1), and that socket-outlets and hand-held equipment up to 32 A are protected by reduced low voltage, automatic disconnection with a 30 mA RCD, electrical separation or SELV/PELV (Reg 704.410.3.10).',
      }}
      heroTitle={
        <>
          Temporary Installations:{' '}
          <span className="text-yellow-400">BS 7909, Events, and Construction Sites</span>
        </>
      }
      heroSubtitle="Temporary electrical installations demand the same rigour as permanent ones — and often more. From construction site supplies to festival power systems, this guide covers supply design, earthing, RCD protection, testing, and the documentation that proves compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Temporary Installations"
      relatedPages={relatedPages}
      ctaHeading="Certificates and RAMS for Temporary Installations"
      ctaSubheading="Create EIC, EICR, and Minor Works certificates on your phone. Generate RAMS and risk assessments with AI. Designed for electricians working on temporary installations. 7-day free trial."
    />
  );
}
