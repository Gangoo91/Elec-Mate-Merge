import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplets,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Wrench,
  Cable,
  ClipboardCheck,
  Waves,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Swimming Pool Electrical Installation', href: '/guides/swimming-pool-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'zones', label: 'BS 7671 Zones 0, 1 and 2' },
  { id: 'selv', label: 'SELV for Luminaires' },
  { id: 'bonding', label: 'Supplementary Equipotential Bonding' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'filtration-heating', label: 'Filtration and Heat Pump Circuits' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Swimming pool and paddling pool electrical installations are governed by BS 7671 Section 702, which defines zones 0, 1, and 2 with progressively relaxed requirements moving away from the water.',
  'Zone 0 (inside the water) requires SELV (Safety Extra Low Voltage, maximum 12V AC or 30V DC) for any electrical equipment; IPX8 ingress protection is mandatory.',
  'Zone 1 (within 2m horizontally and 2.5m vertically from the pool edge) permits SELV or Class II equipment with IPX4 protection minimum (IPX5 for public pools or where jets are used).',
  'Supplementary equipotential bonding is required under Section 702 to connect all simultaneously accessible exposed and extraneous conductive parts — pool shell reinforcement, metallic ladders, heat exchangers, pump housings, and water treatment equipment.',
  'A typical domestic swimming pool electrical installation costs £2,500 to £8,000, depending on pool size, filtration system, heating, lighting, and whether a new consumer unit or sub-board is required.',
];

const faqs = [
  {
    question: 'What does BS 7671 Section 702 say about swimming pool electrical installations?',
    answer:
      'BS 7671 Section 702 is the special installation requirement for swimming pools, paddling pools, garden fountains, and similar water features. Section 702 defines three zones around the pool: Zone 0 (inside the pool), Zone 1 (within 2m horizontally and 2.5m vertically from the pool boundary), and Zone 2 (within 1.5m beyond Zone 1, or within 2.5m vertically above Zone 1). The regulations specify the minimum IP rating, the type of equipment permitted (SELV, Class II, or standard), the required RCD protection, and the supplementary bonding requirements for each zone. Section 702 applies to both indoor and outdoor pools, spa baths, and whirlpool baths.',
  },
  {
    question: 'What IP rating is required for swimming pool equipment?',
    answer:
      'The minimum IP ratings specified in BS 7671 Section 702 are: Zone 0 — IPX8 (continuous immersion in water), as the equipment is submerged; Zone 1 — IPX4 (splashing from any direction) for domestic pools, IPX5 (water jets) where cleaning jets are used; Zone 2 — IPX4 for domestic pools. IPX8 equipment suitable for Zone 0 includes underwater luminaires (pool lights) and submersible pumps. IPX4 equipment suitable for Zone 1 includes poolside sockets (which should be avoided where possible), pool pump motors, and UV treatment units when mounted within Zone 1.',
  },
  {
    question: 'Why is SELV required for swimming pool lighting?',
    answer:
      'SELV (Safety Extra Low Voltage) is required for luminaires in Zone 0 and Zone 1 of a swimming pool because the risk of electric shock is elevated — wet skin has significantly lower resistance than dry skin, and contact with a live conductor while immersed in water can be fatal even at voltages that would be survivable in a dry environment. SELV limits the voltage to a maximum of 12V AC (RMS) or 30V DC under BS 7671, and the SELV circuit must be electrically separated from all other circuits (no functional earth, no connection to the main earthing system). The SELV transformer (safety isolating transformer) must be installed outside Zones 0, 1, and 2 where possible, or in Zone 2 in an IP54 enclosure.',
  },
  {
    question: 'What supplementary bonding is required for a swimming pool?',
    answer:
      'Section 702 of BS 7671 requires supplementary equipotential bonding to connect all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts around the pool. This includes: the metallic shell of the pool (or the reinforcing steel of a concrete pool), metallic ladders and handrails, metallic pipe-work (water supply, heating, filtration), heat exchanger bodies, pump motor casings, and any other metallic structure within or adjacent to the pool that could become live due to a fault. The bonding conductor must be connected to the main equipotential bonding bar or to the main earthing terminal, and the connection to the pool reinforcing steel must be made at a point accessible for inspection. The bonding is in addition to the CPC (circuit protective conductor) of each circuit.',
  },
  {
    question: 'Can standard 230V sockets be installed near a swimming pool?',
    answer:
      'No standard 13A sockets should be installed within Zone 1 (within 2m of the pool edge). Within Zone 2 (between 2m and 3.5m from the pool edge), sockets with RCD protection are permitted but should be avoided where practicable. Where a socket is needed within Zone 2 — for example, for pool cleaning equipment — it must be a specialist outdoor-rated socket (IP44 minimum) on a dedicated circuit with 30mA RCD protection. The preferred approach is to locate all general-purpose sockets outside Zone 2 entirely and to use SELV-powered or low-voltage portable equipment near the pool.',
  },
  {
    question: 'What RCD protection is required for a swimming pool?',
    answer:
      'All circuits supplying equipment in Zone 0, Zone 1, and Zone 2 must be protected by a 30mA RCD. This applies to SELV circuits (where the RCD protects the primary side of the SELV transformer), to filtration pump circuits, to pool lighting circuits, and to any socket circuits within Zone 2. In addition, where the pool pump or filtration system has a large inductive load, a Type A RCD is recommended to detect the pulsed DC fault currents that can occur with variable-speed pump drives. Type F RCDs may be specified where the filtration system uses an inverter-driven motor.',
  },
  {
    question: 'How much does swimming pool electrical installation cost?',
    answer:
      'A domestic outdoor pool electrical installation typically costs £2,500 to £5,000 for a standard setup: filtration pump circuit, SELV pool lighting, poolside bonding, and RCD protection from the house consumer unit. For a larger pool with a heat pump, UV treatment, automated chemical dosing, and a separate pool house or changing room, the electrical cost rises to £5,000 to £8,000. An indoor pool with full HVAC controls, automated cover motor, heating controls, and multiple SELV luminaires can cost £8,000 to £15,000 or more. A new consumer unit or sub-board dedicated to the pool equipment adds £600 to £1,200.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for pool filtration pump circuits, heat pump supplies, and SELV transformer feeds.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for swimming pool installations on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Price swimming pool electrical packages including bonding, SELV lighting, and filtration circuits.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/heat-pump-electrical-requirements',
    title: 'Heat Pump Electrical Requirements',
    description: 'Dedicated circuits and DNO notification for pool heat pumps.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/outdoor-entertaining-area-electrical',
    title: 'Outdoor Entertaining Area Electrical',
    description: 'IP ratings, outdoor circuits, and garden electrical installation guide.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the 18th Edition wiring regulations including special locations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Swimming Pool Electrical Installation: BS 7671 Section 702',
    content: (
      <>
        <p>
          Swimming pool electrical installations are one of the highest-risk environments in domestic
          and commercial electrical work. Water, wet surfaces, and the body's reduced electrical
          resistance when wet create the potential for fatal shock at voltages that would be
          survivable in dry conditions. BS 7671 Section 702 provides specific requirements that go
          well beyond the standard domestic installation requirements.
        </p>
        <p>
          Section 702 applies to: swimming pools, paddling pools, ornamental garden pools, garden
          water features, spa pools and whirlpools, and indoor pools. The requirements are
          consistent whether the pool is domestic or commercial, though the application of specific
          rules (particularly Zone 2 socket requirements) varies.
        </p>
        <p>
          Electricians working on swimming pool installations must be familiar with Section 702 and
          the zone definitions before undertaking any design or installation work. This guide covers
          the key requirements including zones, SELV, supplementary bonding, RCD protection, and
          the filtration and heating circuits that make up the bulk of the electrical package.
        </p>
      </>
    ),
  },
  {
    id: 'zones',
    heading: 'BS 7671 Section 702: Zones 0, 1 and 2',
    content: (
      <>
        <p>
          Section 702 defines three zones around a swimming pool, each with specific requirements for
          electrical equipment:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-600/20 border border-blue-600/30 p-5">
            <Waves className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Zone 0</h3>
            <p className="text-white text-sm leading-relaxed">
              Inside the pool itself — the water volume. Only SELV equipment at maximum 12V AC or
              30V DC. IPX8 protection mandatory. No standard mains voltage equipment permitted.
              Underwater luminaires and submersible pumps must be specifically rated for Zone 0.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/15 border border-blue-500/25 p-5">
            <Droplets className="w-6 h-6 text-blue-300 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Zone 1</h3>
            <p className="text-white text-sm leading-relaxed">
              Within 2m horizontally from the pool edge, or 2.5m vertically above the pool floor.
              Permitted: SELV equipment, Class II 230V equipment with IPX4 (or IPX5 where jets
              are used). No standard 230V socket outlets. Filtration pumps in Zone 1 must be
              Class II or SELV.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-400/10 border border-blue-400/20 p-5">
            <Droplets className="w-6 h-6 text-blue-200 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Zone 2</h3>
            <p className="text-white text-sm leading-relaxed">
              Between 2m and 3.5m from the pool edge (1.5m beyond Zone 1), or within 2.5m
              vertically above Zone 1. Standard 230V equipment with IPX4 protection is permitted.
              Socket outlets may be installed (with 30mA RCD) but should be avoided. AFDD
              recommended for circuits in this zone.
            </p>
          </div>
        </div>
        <p>
          For an outdoor pool with a plant room beyond 3.5m from the pool edge, the plant room is
          outside all zones and can house standard mains voltage equipment without the Section 702
          IP requirements. This is the preferred location for filtration pumps, heat pumps, and
          electrical distribution equipment.
        </p>
      </>
    ),
  },
  {
    id: 'selv',
    heading: 'SELV for Pool Luminaires',
    content: (
      <>
        <p>
          Safety Extra Low Voltage (SELV) is mandatory for all luminaires in Zone 0 and Zone 1.
          SELV operates at maximum 12V AC (RMS) or 30V DC, which is below the threshold at which
          a shock current through wet skin becomes dangerous in most circumstances.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety isolating transformer</strong> — the SELV circuit is supplied via a
                safety isolating transformer (to BS EN 61558-2-6) installed outside Zones 0 and 1.
                The transformer secondary (SELV) winding has no connection to earth — it is floating.
                This means that a single fault to earth on the SELV circuit does not produce a shock
                current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring the SELV circuit</strong> — SELV wiring must be physically or
                electrically separated from other circuits (no shared conduit or trunking with 230V
                circuits). The SELV cable runs from the transformer to each pool luminaire position,
                concealed in the pool shell or pool surround during construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED pool luminaires</strong> — modern pool lights are LED, consuming 10 to
                35W each. A 12V AC SELV system typically uses a 100VA or 150VA transformer to supply
                4 to 8 pool lights. Consult the luminaire manufacturer's maximum cable length
                guidance — voltage drop on 12V circuits is significant over runs exceeding 10m.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bonding',
    heading: 'Supplementary Equipotential Bonding',
    content: (
      <>
        <p>
          Supplementary equipotential bonding is one of the most critical elements of a pool
          electrical installation. Its purpose is to reduce the potential difference between all
          conductive parts in and around the pool to a safe level, even in the event of a fault.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>What must be bonded</strong> — all simultaneously accessible exposed and
                extraneous conductive parts: pool reinforcing steel (rebar in concrete pools),
                metallic pool shell, stainless steel or chrome ladders and handrails, metallic water
                pipework (supply and return), heat exchanger body, pump motor casing, water treatment
                equipment (UV, dosing pumps), metallic pool surround (coping stones with metal
                fixings), and any structural steelwork adjacent to the pool.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding conductor size</strong> — the supplementary bonding conductor
                must be sized in accordance with BS 7671 Section 702 requirements. A minimum of
                4mm² copper is typically used. For connections to pool rebar (which may have a
                large mass), the connection must be made by a purpose-designed clamp and the
                conductor must be accessible for periodic inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connection to MET</strong> — the bonding ring is connected to the main
                earthing terminal (MET) of the installation. This ensures that in the event of a
                fault that raises the potential of the pool structure, the main protective device
                (RCD or fuse) operates to disconnect the fault.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Supplementary bonding must be installed during construction, before the pool shell is
          rendered or tiled. Access to the rebar bonding connection point must be maintained. Coordinate
          with the pool builder before the shell is complete.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Pool Circuits',
    content: (
      <>
        <p>
          All circuits supplying equipment associated with the pool (in any zone) must have 30mA
          RCD protection. The type of RCD matters:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type AC RCD</strong> — detects sinusoidal AC fault currents only. Not
                suitable for variable speed pump drives or electronic pool equipment that can
                produce pulsed DC residual currents. Type AC RCDs may fail to operate with some
                modern pool equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A RCD (recommended)</strong> — detects both sinusoidal AC and pulsed
                DC residual currents. Suitable for all pool equipment including variable speed pump
                drives and electronic pool control systems. Type A should be used as the minimum
                for any pool circuit with electronic equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type F RCD</strong> — detects AC, pulsed DC, and high-frequency residual
                currents. Recommended where the pool uses inverter-driven pumps or multi-phase
                control equipment. Provides the broadest protection and is the safest choice for
                commercial pools.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'filtration-heating',
    heading: 'Filtration and Heat Pump Circuits',
    content: (
      <>
        <p>
          The filtration pump and heat pump are the highest-current loads in a pool electrical
          installation. Circuit sizing depends on the pool volume and equipment specification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Filtration pump circuit</strong> — a single-phase filtration pump for a
                domestic pool (6m × 3m, 40,000 litres) is typically 0.75kW to 1.5kW, requiring a
                10A or 16A circuit on 2.5mm cable. Variable speed pumps (which are more energy
                efficient) may have higher starting current — check the manufacturer's specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pool heat pump circuit</strong> — an air-source heat pump for pool heating
                (6kW to 12kW output, COP 5 to 6) has a compressor input of 1kW to 2.5kW single-
                phase, requiring a 16A or 32A circuit on 2.5mm or 6mm cable. Larger heat pumps
                (over 10kW input) may be three-phase. A dedicated MCB or RCBO for the heat pump
                is required — do not share with other pool equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pool control panel</strong> — most pool systems include an automated
                control panel managing the pump programme, heating, chemical dosing, and lighting.
                The control panel is typically located in the plant room and supplied from a
                dedicated circuit. Allow for a 13A or 16A circuit for the control panel itself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Where the plant room is more than 10m from the house consumer unit, consider installing a
          dedicated pool sub-board in the plant room. This simplifies discrimination, reduces voltage
          drop on individual circuit cables, and makes the pool system independently isolatable for
          maintenance and winterisation.
        </p>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for Swimming Pool Electrical Installation',
    content: (
      <>
        <p>
          Indicative costs for a domestic outdoor swimming pool electrical installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic installation (filtration pump, SELV lighting, bonding)</strong> —
                £2,500 to £4,000. Single pump circuit, SELV transformer and 4 underwater luminaires,
                supplementary bonding, 30mA RCD protection, EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full installation (heat pump, controls, pool house)</strong> — £4,000 to
                £8,000. All of the above plus a heat pump circuit, automated control panel circuit,
                UV treatment unit, pool house lighting and sockets, and a dedicated pool sub-board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Indoor pool or commercial pool</strong> — £8,000 to £20,000+. Full
                Section 702 compliance, HVAC controls integration, automated cover motor, emergency
                stop provision, and potentially three-phase supply.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Price your swimming pool electrical installation"
          description="Use Elec-Mate's quoting app to itemise pool electrical packages: SELV lighting, filtration circuits, bonding, heat pump supply, and Section 702 compliance. Professional quotes from the survey."
          icon={Droplets}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Swimming Pool Installations',
    content: (
      <>
        <p>
          Swimming pool electrical installations are specialist work commanding higher rates than
          standard domestic work. The key differentiators are knowledge of Section 702 and the
          ability to design and install a compliant, fully documented installation. Points to note:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pre-construction Coordination</h4>
                <p className="text-white text-sm leading-relaxed">
                  Supplementary bonding connections to pool rebar and conduit sleeves for SELV
                  cabling must be installed before the pool shell is rendered. Coordinate with the
                  pool builder at the design stage — not after the concrete is poured.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and Section 702 Declaration</h4>
                <p className="text-white text-sm leading-relaxed">
                  The{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  must reference Section 702 compliance. Note the zone boundaries, SELV transformer
                  details, bonding connections made, and the RCD type on the relevant circuits.
                  A thorough EIC demonstrates competence and is essential for a specialist installation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify swimming pool electrical installations on your phone"
          description="Elec-Mate's EIC Certificate app handles specialist installations including Section 702 pools. Complete the certificate on site, add notes on zone compliance and bonding, and issue the PDF before you leave."
          icon={Droplets}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SwimmingPoolElectricalCostPage() {
  return (
    <GuideTemplate
      title="Swimming Pool Electrical Installation UK | BS 7671 Section 702 Guide"
      description="Complete guide to swimming pool electrical installation in the UK. BS 7671 Section 702 zones, SELV lighting, supplementary bonding, RCD protection, filtration and heat pump circuits. Typical costs £2,500–£8,000."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Swimming Pool Electrical Installation:{' '}
          <span className="text-yellow-400">BS 7671 Section 702 Guide</span>
        </>
      }
      heroSubtitle="Swimming pool electrical installations are governed by BS 7671 Section 702. This guide covers zones 0, 1 and 2, SELV lighting, supplementary bonding, RCD protection types, filtration and heat pump circuits, and typical installation costs."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Swimming Pool Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Swimming Pool Electrical Installations"
      ctaSubheading="Elec-Mate gives UK electricians the tools to price, install, and certify specialist pool electrical work including Section 702 compliance documentation. 7-day free trial."
    />
  );
}
