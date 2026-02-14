import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Cable,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Droplets,
  Home,
  GraduationCap,
  ClipboardCheck,
  Sun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Outdoor Sockets', href: '/guides/outdoor-sockets-regulations' },
];

const tocItems = [
  { id: 'overview', label: 'Outdoor Sockets Overview' },
  { id: 'ip-rating-requirements', label: 'IP Rating Requirements' },
  { id: 'rcd-protection', label: '30mA RCD Protection' },
  { id: 'cable-burial-depth', label: 'Cable Burial Depth' },
  { id: 'special-locations', label: 'Special Locations (Part 7)' },
  { id: 'weatherproof-accessories', label: 'Weatherproof Accessories' },
  { id: 'installation-methods', label: 'Installation Methods' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Outdoor sockets must have an IP rating of at least IP65 (dust-tight and protected against water jets) or IP66 (protected against powerful water jets) to withstand UK weather conditions.',
  'All outdoor socket circuits must be protected by a 30mA RCD in accordance with BS 7671 Regulation 411.3.3, providing additional protection against electric shock in wet or damp locations.',
  'Underground cables to outdoor sockets must be buried at a minimum depth of 500mm (600mm under driveways) using SWA cable or cable-in-duct, with warning tape above.',
  'Outdoor electrical installations may fall within the scope of BS 7671 Part 7 (Special Installations or Locations), depending on the specific environment and proximity to water.',
  'An Electrical Installation Certificate (EIC) or Minor Works Certificate must be issued for new outdoor socket circuits, and the work is notifiable under Part P if it involves a new circuit.',
];

const faqs = [
  {
    question: 'What IP rating do outdoor sockets need?',
    answer:
      'Outdoor sockets in the UK should be at least IP65 rated — this means they are dust-tight (first digit 6) and protected against water jets from any direction (second digit 5). For locations exposed to heavy rain, pressure washing, or coastal conditions, IP66 is recommended (protected against powerful water jets). The IP rating applies to the complete accessory including the socket, the enclosure, and the cable entry points. A standard domestic socket (IP20) is not suitable for outdoor use even inside a covered porch — condensation, driving rain, and temperature changes will cause moisture ingress over time. Always check that the IP rating applies when the socket lid is closed and also when it is in use (some products have different IP ratings in the open and closed positions). BS 7671 requires the electrician to assess the external influences (AD classification in Appendix 5) at the installation location and select accessories accordingly.',
  },
  {
    question: 'Do outdoor sockets need RCD protection?',
    answer:
      'Yes. BS 7671 Regulation 411.3.3 requires that socket outlets with a rated current not exceeding 32A that are for use by ordinary persons and intended to supply equipment used outdoors must be protected by a 30mA RCD (Residual Current Device). This requirement applies regardless of whether the socket is in a weatherproof enclosure. The 30mA RCD provides additional protection against electric shock — this is critical in outdoor locations where the user may be standing on wet ground, using electrical equipment in the rain, or working in conditions where body resistance is reduced. The RCD should be a separate device (RCBO or RCD on the consumer unit) so that a trip does not affect indoor circuits. Type A is the standard specification; Type AC is acceptable for resistive loads only.',
  },
  {
    question: 'How deep should cables be buried for outdoor sockets?',
    answer:
      'Cables buried underground must be at a minimum depth of 500mm in a garden or open ground. Under a driveway, path, patio, or any area subject to vehicle traffic, the minimum depth is 600mm. The cable should be laid on a 50mm bed of fine sand, covered with fine sand, and a cable warning tape should be placed at approximately half the trench depth above the cable. For short runs (under 3 metres) from the house to an adjacent socket position, SWA cable or standard cable-in-duct can be used. For longer runs, SWA (Steel Wire Armoured) cable is recommended — it provides mechanical protection without the need for a separate duct. The trench route should be documented on a drawing (and photographed before backfilling) so that future garden work does not accidentally damage the cable.',
  },
  {
    question: 'Can I install an outdoor socket myself?',
    answer:
      'Adding a new circuit for an outdoor socket is notifiable work under Part P of the Building Regulations. This means the work must be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) who will self-certify and notify building control, or a building control application must be made before work starts. A homeowner who is not a qualified electrician should not attempt this work — outdoor electrical installations involve increased shock risk due to wet conditions, and incorrect installation can be dangerous. Even adding a spur from an existing circuit to create an outdoor socket point may be considered notifiable if it involves cable in a zone subject to water. The safest and most practical approach is to use a qualified electrician who understands the IP rating, RCD protection, and cable burial requirements.',
  },
  {
    question: 'What cable should I use for an outdoor socket?',
    answer:
      'For buried cable runs, use SWA (Steel Wire Armoured) cable — typically 2.5mm 3-core SWA for a single outdoor socket or 4.0mm for multiple sockets or longer runs. SWA cable can be buried directly without a duct (though a duct at the entry and exit points is recommended for protection). For surface-mounted cable runs along an external wall, use standard twin-and-earth cable inside PVC conduit (minimum IP55 rated), or use SWA cable clipped directly to the wall with saddle clips. Do not use standard PVC twin-and-earth cable without conduit outdoors — the PVC sheathing degrades in UV sunlight and is not mechanically protected. For cable in the ground, use cable-in-duct as an alternative to SWA — run the standard cable through a suitable duct (typically orange or black HDPE duct) buried at the correct depth.',
  },
  {
    question: 'Can I use an outdoor socket in the rain?',
    answer:
      'An IP65 or IP66 rated outdoor socket is designed to be used in wet conditions, including rain. However, common sense applies: do not use outdoor sockets during thunderstorms, do not leave plug-in equipment unattended outdoors in heavy rain unless the equipment itself is rated for outdoor use, and always ensure the socket lid closes properly when the socket is not in use. The RCD protection on the outdoor socket circuit provides additional safety — if a fault occurs (for example, water enters a damaged extension lead), the RCD will disconnect the supply within 40 milliseconds, significantly reducing the risk of electric shock. Regularly inspect the socket enclosure for damage, ensure the seals are intact, and replace the unit if the lid no longer closes properly or the IP rating is compromised.',
  },
  {
    question: 'How many outdoor sockets should I install?',
    answer:
      'Install at least two outdoor socket positions for a typical property: one near the rear of the house (for garden tools, barbecue lights, and patio heaters) and one near the front or side (for pressure washers, car cleaning, and seasonal lighting). For larger gardens, consider a weatherproof socket at the bottom of the garden for hedge trimmers and lawn equipment, avoiding the need for long extension leads. Each socket position should have a double socket to allow two devices to be plugged in simultaneously. If a hot tub, EV charger, or garden room is planned for the future, install additional circuits at the design stage — it is far cheaper to add an extra cable run during the initial installation than to excavate and lay cable later.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for outdoor circuits with burial depth derating and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on cable runs to outdoor sockets, especially long garden cable routes.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'Complete guide to Part P notification for outdoor and garden electrical work.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/garage-electrics',
    title: 'Garage Electrics Guide',
    description:
      'SWA cable and sub-board installation for garages — similar cable burial and IP rating requirements.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete digital Electrical Installation Certificates for outdoor socket installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S, and TT earthing systems and their implications for outdoor electrical work.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Outdoor Sockets: Regulations and Requirements',
    content: (
      <>
        <p>
          Outdoor sockets are one of the most common domestic electrical installations — and one of
          the most frequently done incorrectly. The combination of water, earth contact, and
          portable electrical equipment creates a significantly higher shock risk than indoor
          circuits. BS 7671 imposes specific requirements for outdoor installations that go beyond
          standard domestic wiring.
        </p>
        <p>
          The key requirements are an appropriate IP rating for the socket and enclosure, 30mA RCD
          protection for the circuit, correct cable selection and burial depth for underground runs,
          and compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          including the relevant sections of Part 7 (Special Installations or Locations) where
          applicable.
        </p>
        <p>
          This guide covers the regulations, the practical installation requirements, and the
          testing and certification needed for outdoor socket installations in UK domestic
          properties. Whether it is a single weatherproof socket on a patio wall or a comprehensive
          garden power supply with buried cable runs, the principles are the same.
        </p>
      </>
    ),
  },
  {
    id: 'ip-rating-requirements',
    heading: 'IP Rating Requirements for Outdoor Sockets',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating indicates the level of protection an electrical
          accessory provides against solid objects (first digit) and water (second digit). For
          outdoor installations in the UK, the minimum practical IP rating depends on the location
          and exposure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65 (minimum recommended)</strong> — dust-tight and protected against water
                jets from any direction. Suitable for most UK outdoor locations including patios,
                garden walls, and driveways. This is the standard specification for domestic outdoor
                sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP66 (recommended for exposed locations)</strong> — dust-tight and protected
                against powerful water jets. Suitable for locations exposed to driving rain, coastal
                spray, or areas that may be pressure-washed (such as driveways and patios).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 (minimum for sheltered locations)</strong> — protected against solid
                objects greater than 1mm and splashing water. This is the absolute minimum for an
                outdoor location that is fully sheltered from rain (for example, under a deep porch
                or covered carport). IP44 is not sufficient for an exposed location.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When selecting an outdoor socket, check that the IP rating applies both when the lid is
          closed (not in use) and when a plug is inserted. Some products have different ratings in
          different states. A socket that is IP66 when closed but IP44 when in use may not provide
          adequate protection during rainy conditions. Choose products from reputable manufacturers
          that clearly state the IP rating in both conditions.
        </p>
        <p>
          The cable entry points to the socket enclosure must also maintain the IP rating. Use
          correctly sized cable glands or IP-rated cable entries — do not drill oversize holes and
          fill them with silicone, as this degrades over time and compromises the seal.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: '30mA RCD Protection: A Non-Negotiable Requirement',
    content: (
      <>
        <p>
          BS 7671 Regulation 411.3.3 requires that socket outlets with a rated current not exceeding
          32A that are for use by ordinary persons and intended to supply equipment used outdoors
          must be protected by an RCD with a rated residual operating current not exceeding 30mA.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA sensitivity</strong> — the RCD must trip at or below 30mA earth leakage
                current. This level of sensitivity provides additional protection against electric
                shock — at 30mA, the current through the body is below the level that causes
                ventricular fibrillation in most adults. Without RCD protection, a fault on outdoor
                equipment could deliver a lethal shock, particularly if the user is standing on wet
                ground or touching earthed metalwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit recommended</strong> — install the outdoor socket on a
                dedicated circuit with its own RCBO at the consumer unit. This prevents outdoor
                faults from tripping indoor circuits, and prevents indoor faults from disabling the
                outdoor socket. If a shared circuit is unavoidable, ensure the outdoor socket is
                protected by its own RCD upstream of the connection point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — the RCD must be tested during initial verification and at
                every periodic inspection. The trip time at rated current (30mA) must not exceed
                300ms, and the trip time at 5 times rated current (150mA) must not exceed 40ms. Use
                the RCD test function on a multifunction tester — do not rely on the test button on
                the RCD alone (the test button only verifies the mechanical trip mechanism, not the
                sensitivity or timing).
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the property has an older consumer unit without RCD protection, adding an outdoor
          socket is a strong reason to upgrade the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>.
          Do not install an outdoor socket without 30mA RCD protection under any circumstances.
        </p>
      </>
    ),
  },
  {
    id: 'cable-burial-depth',
    heading: 'Cable Burial Depth and Underground Cable Routes',
    content: (
      <>
        <p>
          When the cable route to an outdoor socket runs underground (across a patio, along a garden
          path, or to a remote location), the cable must be protected against mechanical damage and
          buried at the correct depth.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>500mm minimum depth</strong> — in a garden, flower bed, or open ground. The
                cable must be laid on a 50mm bed of fine sand, covered with sand, and a cable
                warning tape placed at approximately half the trench depth above the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>600mm minimum depth</strong> — under a driveway, patio, path, or any area
                subject to vehicle traffic or frequent foot traffic with heavy loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cable</strong> — Steel Wire Armoured cable can be buried directly
                without a duct. The armour provides mechanical protection and also serves as the
                circuit protective conductor. Use 2.5mm or 4.0mm 3-core SWA for domestic outdoor
                socket supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable in duct</strong> — standard PVC twin-and-earth cable can be used
                underground if it is installed inside a protective duct (typically orange HDPE or
                black plastic duct). The duct protects the cable from mechanical damage and allows
                the cable to be replaced in the future without excavation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          At entry and exit points (where the cable emerges from the ground), protect the cable with
          a short length of galvanised steel conduit or PVC conduit to prevent damage from
          lawnmowers, spades, or foot traffic. Seal the top of the conduit to prevent water ingress.
        </p>
        <p>
          Record the cable route on a drawing and photograph the trench before backfilling. This
          documentation is invaluable for future garden work — it prevents accidental cable damage
          when digging fence posts, planting trees, or installing drainage.
        </p>
      </>
    ),
  },
  {
    id: 'special-locations',
    heading: 'Special Locations: BS 7671 Part 7',
    content: (
      <>
        <p>
          Some outdoor locations fall within the scope of BS 7671 Part 7 (Special Installations or
          Locations), which imposes additional requirements beyond the general rules. The most
          relevant Part 7 sections for outdoor socket installations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 702 — Swimming pools and fountains</strong> — if the outdoor socket
                is near a swimming pool, hot tub, or garden fountain, Section 702 imposes zone
                restrictions on socket outlet positions. Zone 0, 1, and 2 have specific IP rating,
                SELV, and equipment restrictions. A socket outlet must not be installed within Zone
                0 or Zone 1, and within Zone 2 it must be protected by a 30mA RCD and have at least
                IP44 (or higher depending on the zone).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 705 — Agricultural and horticultural premises</strong> — if the
                outdoor installation is on a farm or agricultural premises, Section 705 applies.
                This requires additional protection measures including supplementary bonding,
                increased IP ratings, and specific requirements for socket outlets in areas
                accessible to livestock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 708 — Caravan parks</strong> — outdoor sockets at caravan parks and
                camping sites must comply with Section 708, which specifies the socket type (BS EN
                60309-2 industrial connector, not a standard 13A socket), the height above ground
                (0.5m to 1.5m), and the RCD and overcurrent protection requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 722 — Electric vehicle charging</strong> — if the outdoor socket
                will be used for EV charging (even temporarily), Section 722 and the IET Code of
                Practice for EV charging apply. A standard 13A outdoor socket should not be used for
                regular EV charging — a dedicated{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">EV charger</SEOInternalLink>{' '}
                is required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most standard domestic outdoor socket installations do not fall within a Part 7 special
          location. However, the electrician must assess the environment and identify whether any
          special location requirements apply before designing the installation.
        </p>
      </>
    ),
  },
  {
    id: 'weatherproof-accessories',
    heading: 'Choosing Weatherproof Accessories',
    content: (
      <>
        <p>
          The quality and specification of weatherproof accessories varies enormously. Cheap
          products may claim an IP65 rating but use low-quality seals that degrade within 2 to 3
          years, allowing moisture ingress. Choose products from established manufacturers and check
          for independent certification of the IP rating.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket enclosures</strong> — choose enclosures with spring-loaded lids that
                close automatically when the socket is not in use. Screw-fixed lids that must be
                manually closed are less reliable — they are often left open by the user.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable entries</strong> — use IP-rated cable glands or compression fittings.
                Knock-out entries sealed with rubber grommets are acceptable if correctly sized.
                Never leave an unused cable entry open — seal it with a blanking plug.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mounting</strong> — mount the socket at a convenient height (typically 400mm
                to 1200mm above ground level) to avoid standing water and reduce the risk of damage
                from lawnmowers. Use stainless steel or galvanised screws to prevent rust staining
                on the wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolator switches</strong> — if the outdoor socket is remote from the
                consumer unit, install a local isolator switch (IP65 rated) adjacent to the socket.
                This allows the homeowner to isolate the outdoor supply without accessing the
                consumer unit inside the house.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Inspect the weatherproof seal on the socket enclosure after installation and periodically
          thereafter. UV exposure, temperature cycling, and physical use degrade seals over time.
          Replace the entire accessory if the seal is compromised — do not attempt to re-seal with
          silicone or mastic, as this is unreliable.
        </p>
      </>
    ),
  },
  {
    id: 'installation-methods',
    heading: 'Installation Methods for Outdoor Sockets',
    content: (
      <>
        <p>
          The installation method depends on the cable route, the wall construction, and the
          distance from the consumer unit to the outdoor socket position. The most common methods
          are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Through the wall</strong> — the simplest method for a socket on the external
                wall directly behind an internal socket or near the consumer unit. Drill through the
                wall, pass the cable through a length of conduit or sleeve, and seal both ends with
                mastic or intumescent sealant. This avoids any underground cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted on external wall</strong> — run the cable in UV-resistant
                PVC conduit (minimum IP55) along the external wall surface. Use saddle clips at
                regular intervals. This is suitable for short runs along the back wall of the house
                from the internal supply point to the external socket.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground SWA cable</strong> — for remote socket positions (garden walls,
                sheds, pergolas), run SWA cable underground at the correct burial depth. Terminate
                with SWA glands at both ends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spur from existing circuit</strong> — for a single outdoor socket close to
                the house, a fused spur from an existing ring circuit may be appropriate. Use a
                fused connection unit (13A fuse) inside the house as the connection point, and run
                the cable through the wall to the outdoor socket. The existing circuit must already
                have RCD protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regardless of the installation method, ensure the cable entry to the outdoor socket
          enclosure maintains the IP rating. Seal all wall penetrations against water ingress —
          water tracking along a cable and entering the house through an unsealed hole is a common
          complaint.
        </p>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          All outdoor socket installations must be tested in accordance with BS 7671 Chapter 6. The
          tests are the same as for any domestic circuit, with particular attention to RCD
          operation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors (including SWA armour if applicable)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance (500V DC, minimum 1 megohm)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity at the outdoor socket</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                RCD operation — 30mA trip test (must trip at or below 30mA) and trip time at 5 times
                rated current (150mA, must trip within 40ms)
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the outdoor socket is a new circuit, an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued and the work notified under Part P. If the socket is added as a spur from
          an existing circuit (without a new circuit at the consumer unit), a{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          is appropriate. In either case, test results must be documented and provided to the
          homeowner.
        </p>
        <SEOAppBridge
          title="Complete the certificate on site"
          description="Elec-Mate lets you complete the EIC or Minor Works Certificate on your phone. Voice test entry fills in results while you test. Export as a professional PDF and send to the homeowner instantly."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outdoor Sockets as an Upsell',
    content: (
      <>
        <p>
          Outdoor sockets are a quick, high-margin job that often leads to follow-on work. A single
          outdoor socket installation (through-the-wall, with RCBO at the board) takes 1 to 2 hours
          and is typically priced at £150 to £300 including materials. An underground SWA run to a
          garden socket takes half a day and is priced at £400 to £800.
        </p>
        <p>
          Outdoor sockets are also a natural upsell when you are already on site for other work —
          consumer unit upgrades, EV charger installations, garden office supplies, or periodic
          inspections. Ask the homeowner: "Would you like an outdoor socket while I am here? It
          saves you the cost of a separate visit."
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the cable for outdoor socket circuits with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Automatic derating for burial depth and voltage drop check on long garden runs.
                  Know the correct cable size before you quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quote outdoor socket installations with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Materials, cable, trenching, RCBO, testing, and certification — itemised with
                  your margins. Send a professional PDF quote on the spot.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Minor Works or EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Minor Works Certificate or EIC on site. Voice test entry, instant PDF
                  export, and send to the homeowner before you leave. Professional certification in
                  minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify outdoor socket installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Quick jobs, professional results. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutdoorSocketsGuidePage() {
  return (
    <GuideTemplate
      title="Outdoor Sockets Regulations | IP Rating & RCD Guide"
      description="Complete guide to outdoor socket regulations in the UK. IP65/IP66 requirements, 30mA RCD protection, cable burial depth, special locations under BS 7671 Part 7, weatherproof accessories, and certification requirements."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Outdoor Sockets Regulations:{' '}
          <span className="text-yellow-400">IP Rating and RCD Protection Guide</span>
        </>
      }
      heroSubtitle="Outdoor sockets need the right IP rating, 30mA RCD protection, and correctly buried cables. This guide covers the BS 7671 requirements for outdoor socket installations in UK domestic properties — from IP65 enclosures to cable burial depth and Part 7 special locations."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outdoor Sockets"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Outdoor Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC and Minor Works certificates. 7-day free trial, cancel anytime."
    />
  );
}
