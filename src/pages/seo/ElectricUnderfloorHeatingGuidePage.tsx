import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electric Underfloor Heating Guide', href: '/electric-underfloor-heating-guide' },
];

const tocItems = [
  { id: 'mat-vs-loose-wire', label: 'Mat vs Loose Wire Systems' },
  { id: 'floor-constructions', label: 'Installation in Different Floor Constructions' },
  { id: 'thermostat-wiring', label: 'Thermostat Wiring and Temperature Limiting' },
  { id: 'circuit-sizing', label: 'Circuit Sizing and RCBO Protection' },
  { id: 'bathroom-requirements', label: 'Bathroom Zone Requirements' },
  { id: 'bs7671-reg753', label: 'BS 7671 Regulation 753 — Heating Systems' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electric underfloor heating (UFH) falls under BS 7671:2018+A3:2024 Section 753 (Heating Cables and Embedded Heating Systems), which imposes additional requirements beyond those for standard fixed heating circuits, including temperature limiting thermostats and specific installation depths.',
  'Mat systems (pre-spaced heating cable on a fibreglass mesh) are faster to install in regular-shaped rooms; loose wire systems are better suited to irregular spaces and provide greater control over watt density. Both types must be installed in accordance with the manufacturer instructions.',
  'A temperature limiting thermostat (floor sensor) is mandatory under BS 7671 Regulation 753.424 to prevent overheating of the floor construction and cable sheath. Standard air-sensing thermostats are insufficient on their own for floors containing UFH cable.',
  'Every electric UFH circuit must be protected by a 30mA RCD (typically an RCBO at the consumer unit) per BS 7671 Regulation 411.3.3. A separate dedicated circuit from the consumer unit is strongly recommended for UFH rather than connecting to an existing ring main.',
  'In bathroom zones (Zone 0, 1, and 2 per BS 7671 Section 701), electric UFH below the floor is permitted provided the heating element is covered by at least 50mm of material and the circuit is protected by a 30mA RCD. The thermostat controller must be outside zone 2 unless it is suitable for the zone.',
];

const faqs = [
  {
    question: 'What is BS 7671 Regulation 753 and why does it apply to underfloor heating?',
    answer:
      'BS 7671:2018+A3:2024 Section 753 covers heating cables, heating units, and embedded heating systems — a category that includes electric underfloor heating mats and loose wire systems. The section imposes requirements specifically for this type of installation because heating elements embedded in or beneath floor constructions present risks of overheating the floor, adjacent combustible materials, and the cable sheath itself. Key requirements include the use of temperature limiting devices (Regulation 753.424), minimum installation depths for different floor types, and that the system cannot be covered by fixed thermal insulation on the floor above the element. Regulation 753.2 also requires that the manufacturer instructions are followed, as these form part of the compliance evidence.',
  },
  {
    question: 'What is the difference between a mat system and a loose wire UFH system?',
    answer:
      'A mat system consists of a single or twin conductor heating cable pre-spaced and bonded to a fibreglass mesh at a fixed watt density (typically 100W/m\u00b2 to 200W/m\u00b2). The mat is rolled out over the floor and embedded in tile adhesive or self-levelling compound. Mat systems are quick to install in rectangular rooms but cannot easily be cut to fit around obstacles — only the mesh is cut, never the cable. A loose wire (twin conductor) system gives the installer full control over cable spacing, allowing different watt densities in different zones, easier routing around obstacles, and better coverage in irregular-shaped rooms. Loose wire systems take longer to install and require accurate planning to ensure uniform spacing.',
  },
  {
    question: 'Does electric underfloor heating need a dedicated circuit?',
    answer:
      'A dedicated radial circuit from the consumer unit is strongly recommended for electric UFH, and is required where the system load would overload an existing ring main or socket circuit. A typical bathroom UFH mat of 150W to 400W might be connected to a fused spur from the bathroom radial, but larger systems covering multiple rooms or a whole ground floor will draw 1,500W to 4,500W and require their own circuit. Each dedicated UFH circuit must be protected by an RCBO (combined overcurrent and 30mA RCD protection) at the consumer unit. Cable sizing follows BS 7671 Chapter 43 based on the design current and installation method.',
  },
  {
    question: 'Where should the thermostat be positioned in a bathroom?',
    answer:
      'In a bathroom, the controller/thermostat must be installed outside zone 2 (measured as greater than 600mm horizontally from the edge of the bath or shower tray) unless the device is specifically rated for the zone. Zone 2 extends from the bath or shower to 600mm horizontally and from the floor to a height of 2.25m. The floor temperature sensor probe is installed under the floor and is connected back to the thermostat with low-voltage wiring — the sensor itself can be within zones. The thermostat must include a floor limiting function to prevent the floor surface exceeding 40\u00b0C per BS 7671 Regulation 753.424.',
  },
  {
    question:
      'Can electric underfloor heating be installed under laminate or engineered wood floors?',
    answer:
      'Yes, but the floor covering must be compatible with underfloor heating. Laminate and engineered wood floors typically specify a maximum subfloor temperature of 27\u00b0C and have a combined tog rating requirement (the floor covering tog value plus the UFH mat tog) that should not exceed the heating system capacity. Always check the flooring manufacturer specification before installing UFH beneath. Loose wire systems installed in a screed are generally more suitable under timber floors than mat systems in tile adhesive, as the screed provides more even heat distribution and protects the cable from the movement of timber flooring. The temperature limiting thermostat floor sensor must be positioned to read subfloor temperature, not air temperature.',
  },
  {
    question: 'What insulation resistance value should I achieve when testing a UFH mat?',
    answer:
      'Before installing a UFH mat into tile adhesive or screed, test the insulation resistance at 500V DC between the conductors and earth (conductor to conductor for twin conductor systems). The minimum value specified by most manufacturers is 1M\u03a9, but in practice a new mat should read several hundred M\u03a9 or higher. Test again after the adhesive or screed has fully cured (typically 28 days for screed, 24 to 72 hours for flexible tile adhesive) and before the floor covering is laid. If the reading has dropped significantly, do not energise the system — this indicates cable damage or moisture in the mat that must be investigated. Document all readings per BS 7671 Chapter 64.',
  },
  {
    question: 'Does electric underfloor heating installation need to be notified under Part P?',
    answer:
      'Yes. Installing a new circuit for electric underfloor heating in a dwelling in England is notifiable work under Part P of the Building Regulations. This includes new consumer unit ways or new cable runs to UFH thermostats, even if the consumer unit is not replaced. A registered electrician from a competent person scheme (NICEIC, NAPIT, ELECSA) can self-certify and notify building control automatically. If you hire someone not registered, a full plans application or building notice must be submitted to the local authority. In bathrooms and kitchens, all electrical installation work — regardless of whether it involves a new circuit — is notifiable under Part P.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/night-storage-heater-replacement',
    title: 'Night Storage Heater Replacement Guide',
    description: 'Modern alternatives to night storage heaters, wiring requirements, and costs.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord obligations for electrical inspections in rented properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/fused-spur-installation-guide',
    title: 'Fused Spur Installation Guide',
    description: 'When and how to install fused connection units for fixed appliances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Generate compliant Electrical Installation Certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'mat-vs-loose-wire',
    heading: 'Mat vs Loose Wire Systems — Which to Choose?',
    content: (
      <>
        <p>
          Electric underfloor heating is available in two primary forms: heating mat systems and
          loose twin-conductor wire systems. Both types embed a resistive heating element in or
          beneath the floor construction, but differ in installation method, flexibility, and
          application suitability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">Heating Mat Systems</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Twin-conductor cable pre-attached to fibreglass mesh at a fixed spacing (typically
                50mm to 100mm between passes). Standard output: 100W/m\u00b2 to 200W/m\u00b2.
                Suitable for installation in tile adhesive, self-levelling compound, or thin-bed
                mortar. Total system height: 3mm to 6mm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Best for:</strong> Rectangular rooms, quick installation, tiled floors. The
                mat is cut and folded to navigate the room shape — only the mesh is cut, never the
                cable itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations:</strong> Fixed spacing means fixed watt density — no ability to
                increase output in colder areas. Less suitable for irregular-shaped rooms or areas
                with many obstacles.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">Loose Wire Systems</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Twin-conductor cable fixed to the floor substrate using clip rails or adhesive
                fixing clips. Spacing is set by the installer to achieve the required watt density.
                Typically embedded in a 50mm to 75mm sand-cement screed or self-levelling compound.
                Cold tail feeds back to thermostat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Best for:</strong> Irregular-shaped rooms, new-build screeded floors,
                whole-floor heating in living areas, variable watt density requirements (e.g. more
                output near external walls).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations:</strong> Slower to install, requires screeding (adds floor
                height), longer heat-up time due to screed thermal mass.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'floor-constructions',
    heading: 'Installation in Different Floor Constructions',
    content: (
      <>
        <p>
          The choice of UFH system and installation method depends significantly on the floor
          construction. Solid concrete, suspended timber, and dry screed floors each present
          different challenges and require different approaches.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solid concrete slab:</strong> Loose wire in screed is the standard approach.
                Lay insulation board (typically 25mm to 50mm PIR) first to prevent heat loss
                downward. Fix heating cable clips to the insulation at the required spacing. Pour 50
                to 75mm sand-cement screed or self-levelling compound over the cables. Allow 28 days
                full cure before commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suspended timber floor:</strong> UFH can be installed between joists
                (clipped to the underside of floorboards) using specialist between-joist heating
                elements, or above the subfloor using overlay panels. Standard mat systems in tile
                adhesive are not suitable directly on timber — the adhesive layer is too thin to
                protect the cable and the timber movement causes cracking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tiled floor (renovation):</strong> Heating mat in tile adhesive is the
                standard system for retrofitting UFH beneath tiles. The mat adds minimal floor
                height (3 to 6mm). Decouple the mat from the subfloor using a decoupling membrane
                where the substrate is subject to minor movement.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal insulation above cable:</strong> BS 7671 Regulation 753.424.3
                prohibits fixed thermal insulation being installed above embedded heating elements.
                Rugs and mats may be placed temporarily but should not cover the entire heated area
                continuously, as this causes overheating and trips the temperature limiter.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'thermostat-wiring',
    heading: 'Thermostat Wiring and Temperature Limiting',
    content: (
      <>
        <p>
          The thermostat is the control centre of an electric UFH system. Modern thermostats combine
          an air sensor and a floor sensor, providing dual-mode control. BS 7671 Regulation 753.424
          mandates a temperature limiting device to protect against overheating of the floor
          construction.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Wiring a UFH Thermostat</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply:</strong> Live, neutral, and earth from the consumer unit or fused
                spur to the thermostat backplate. The heating element (cold tail) connects to the
                load terminals. Confirm the thermostat load rating exceeds the heating element
                wattage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor sensor:</strong> A two-core sensor cable (typically 3m to 5m) runs
                from the thermostat back-box through conduit into the floor. The sensor tip sits
                within a conduit loop in the screed or adhesive layer, positioned between two cable
                passes midway across the heated area. The conduit allows sensor replacement without
                lifting the floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature limiting:</strong> Set the floor temperature limit to no more
                than 40\u00b0C for most floor constructions, or per the floor covering manufacturer
                specification (e.g. 27\u00b0C for engineered timber). The floor limiter takes
                priority over the air temperature setpoint — if the floor reaches the limit, the
                system shuts off regardless of air temperature.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'circuit-sizing',
    heading: 'Circuit Sizing and RCBO Protection',
    content: (
      <>
        <p>
          Correct circuit sizing for electric UFH is straightforward once the total installed
          wattage is known. Every UFH circuit in a domestic installation must be protected by a 30mA
          RCD — an RCBO at the consumer unit provides both overcurrent and RCD protection in a
          single device.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design current (Ib):</strong> Total wattage \u00f7 230V. A 1,500W bathroom
                heating mat: Ib = 1,500 \u00f7 230 = 6.5A. A 3,000W living room system: Ib = 3,000
                \u00f7 230 = 13A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overcurrent device (In):</strong> Select the RCBO rating above the design
                current. For 6.5A, use a 10A RCBO. For 13A, use a 16A RCBO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable size:</strong> 1.5mm\u00b2 twin and earth is suitable for most
                domestic UFH circuits up to 16A when run in standard conditions. For larger systems
                (20A+), use 2.5mm\u00b2. Apply installation method and grouping derating factors per
                BS 7671 Chapter 52.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection:</strong> BS 7671 Regulation 411.3.3 requires 30mA RCD
                protection for all socket outlets and for fixed equipment installed outdoors or in
                domestic premises. UFH in domestic premises requires 30mA RCD protection as a
                minimum.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bathroom-requirements',
    heading: 'Bathroom Zone Requirements for UFH',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Section 701 sets out special requirements for locations containing a
          bath or shower. Electric UFH in bathrooms is permitted but subject to specific zone
          restrictions.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating element position:</strong> The UFH element must be covered by at
                least 50mm of material (adhesive, screed, or tiles) and must not be reachable from
                zones 0 or 1 through the floor. Zone 0 is the inside of the bath or shower tray — no
                electrical equipment permitted here.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat position:</strong> The thermostat must be outside Zone 2 (more
                than 600mm horizontally from the bath rim) unless specifically rated for Zone 2
                (IPX4 minimum). Most standard thermostats are not rated for Zone 2 and must be
                positioned outside this area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection:</strong> All circuits supplying equipment in bathroom zones
                must be protected by a 30mA RCD (Regulation 701.411.3.3). An RCBO at the consumer
                unit satisfies this requirement for the UFH circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Before installing UFH in a bathroom, confirm the thermostat position, conduit routing, and
          consumer unit RCBO installation comply with Section 701. Bathroom electrical work is
          notifiable under Part P in England — use a registered competent person scheme. Document
          the completed installation on an{' '}
          <SEOInternalLink
            href="/tools/eic-certificate"
            label="Electrical Installation Certificate"
          />
          .
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-reg753',
    heading: 'BS 7671 Regulation 753 — Heating Cables and Embedded Systems',
    content: (
      <>
        <p>
          Section 753 of BS 7671:2018+A3:2024 is the primary standard for electric underfloor
          heating installations. It supplements the general requirements of the Wiring Regulations
          with specific provisions for embedded heating systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 753.2:</strong> Heating systems must be installed in accordance
                with the manufacturer instructions, which form part of the compliance evidence
                alongside the EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 753.424.1:</strong> Heating systems must be provided with
                automatic disconnection in the event of overheating. A temperature limiting device
                (floor sensor thermostat) satisfies this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 753.424.3:</strong> Embedded heating elements must not be covered
                by thermal insulation (fixed) above the element. Rugs may be placed temporarily but
                must not be permanently fixed over the heated zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 753.522.1:</strong> The heating element must be protected against
                mechanical damage throughout its installed life. A minimum screed or adhesive depth
                of 3mm above a heating mat element and 50mm above a loose wire element in screed is
                typical, but manufacturer instructions take precedence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Certifying UFH Installations',
    content: (
      <>
        <p>
          Electric underfloor heating installations require an EIC and Part P notification. Testing
          must include insulation resistance before and after installation, continuity, and RCBO
          operation. Elec-Mate provides mobile certificate tools for on-site completion.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge
                  href="/tools/eic-certificate"
                  label="Electrical Installation Certificate"
                />{' '}
                — record UFH circuit details, RCBO rating, floor sensor type, and all test results
                including pre- and post-installation IR readings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/minor-works" label="Minor Works Certificate" /> — issue a
                minor works certificate when connecting UFH to an existing suitable circuit without
                consumer unit modifications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricUnderfloorHeatingGuidePage() {
  return (
    <GuideTemplate
      title="Electric Underfloor Heating Installation Guide — Mat, Loose Wire, BS 7671 Section 753"
      description="Complete UK guide to electric underfloor heating: mat vs loose wire systems, thermostat wiring, BS 7671 Regulation 753, circuit sizing, RCBO protection, bathroom zone requirements, and testing."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Underfloor Heating"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Electric Underfloor Heating Guide{' '}
          <span className="text-yellow-400">— Mat, Loose Wire and BS 7671 Section 753</span>
        </>
      }
      heroSubtitle="Mat vs loose wire systems, thermostat wiring, temperature limiting under BS 7671 Regulation 753, circuit sizing, RCBO protection, bathroom zone requirements, and insulation testing."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electric Underfloor Heating — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate UFH installations instantly on your phone"
      ctaSubheading="Generate compliant EICs with pre-installation IR test records using Elec-Mate."
    />
  );
}
