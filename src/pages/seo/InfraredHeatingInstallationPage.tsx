import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  PoundSterling,
  Settings,
  FileCheck2,
  ShieldCheck,
  TrendingUp,
  Thermometer,
  Home,
  LayoutGrid,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Infrared Heating Installation', href: '/infrared-heating-installation' },
];

const tocItems = [
  { id: 'how-infrared-works', label: 'How Infrared Heating Works' },
  { id: 'panel-sizes', label: 'Panel Sizes and Power' },
  { id: 'circuit-wiring', label: 'Dedicated Circuit vs Plug-In' },
  { id: 'thermostat-options', label: 'Thermostat Options' },
  { id: 'zone-control', label: 'Zone Control' },
  { id: 'mounting', label: 'Ceiling vs Wall Mounting' },
  { id: 'costs', label: 'Costs and Comparison' },
  { id: 'vs-convection', label: 'Infrared vs Convection Heating' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Infrared heating panels emit long-wave infrared radiation (far infrared, wavelength 8–14 microns) that heats objects and people directly rather than heating the air, which then heats occupants indirectly as with convection heaters.',
  'Infrared panels range from 300 W for small rooms and bathrooms to 1,800 W for large open-plan spaces. A common rule of thumb is 60–80 W per square metre for a well-insulated UK room with 2.4 m ceiling height.',
  'Panels above 2 kW should be wired to a dedicated radial circuit. Panels under 2 kW can typically be connected via a fused connection unit on an existing ring main circuit, subject to load assessment. Plug-in versions (13 A plug) are available for panels up to 1,200 W.',
  'Infrared panels should be controlled by a room thermostat or programmable timer rather than running continuously. Without a thermostat, running costs are significantly higher than necessary and the efficiency advantage over convection heating is lost.',
  'Installed costs range from £200–£600 per panel (supply and installation), depending on panel wattage, brand, and whether a new circuit is required. Whole-house infrared systems for a 3-bedroom property typically cost £3,000–£7,000 installed.',
  'Infrared heating is most effective in well-insulated spaces, rooms with high air change rates (workshops, garages, conservatories), and as supplementary heating for specific zones rather than as the sole heating system in a poorly insulated property.',
];

const faqs = [
  {
    question: 'Is infrared heating cheaper to run than other electric heating?',
    answer:
      'Infrared panels convert close to 100% of electrical energy to heat, as do all other direct electric heaters. The running cost per kWh is the same as any other electric heater at the same tariff rate. The claimed efficiency advantage comes from the ability to heat a person or specific zone directly without first warming all the room air — meaning you can feel comfortable at a lower air temperature with infrared, potentially running at lower output for shorter periods. However, these savings are highly dependent on usage patterns and room insulation quality. Infrared is not a substitute for a heat pump in terms of running costs.',
  },
  {
    question: 'Do infrared heating panels need planning permission?',
    answer:
      'No. Infrared panel heaters are domestic appliances and do not require planning permission. Installation of permanent fixed panels wired to the electrical system does require compliance with Part P of the Building Regulations (electrical work notification or self-certification via a registered competent person scheme), but no planning application is needed.',
  },
  {
    question: 'How high should infrared heating panels be mounted?',
    answer:
      'Wall-mounted panels are typically positioned at 1.9–2.1 m above the floor — high enough to be out of reach but low enough to direct radiant energy effectively at occupants. Ceiling-mounted panels should be mounted at 2.4–3.5 m — they work best where people are mostly stationary (offices, dining rooms, home gyms) and can be directed at specific seating or working areas by angling the panel if it has a frame mount. Panels mounted too high lose effectiveness because the inverse square law reduces intensity rapidly with distance.',
  },
  {
    question: 'Can infrared panels be installed in bathrooms?',
    answer:
      'Yes, infrared panels are suitable for bathrooms when correctly specified and installed. The panel must be rated for the bathroom zone in which it will be installed (BS 7671 Section 701 zone requirements). IP44-rated infrared panels are suitable for Zone 2 and outside zones in bathrooms. The circuit must be protected by a 30 mA RCD. A wall-mounted panel positioned outside the spray area above the wash basin or on the wall opposite the shower is a popular installation. Infrared panels can replace traditional bathroom heated towel rails in some configurations.',
  },
  {
    question: 'How long do infrared heating panels last?',
    answer:
      'Quality infrared panels (Herschel, Infralia, Redwell, Stelrad infrared range) typically have a design life of 20–30 years with no moving parts and minimal maintenance requirements. The heating element is a resistive carbon or ceramic element that does not degrade significantly with normal use. The main failure mode is mechanical damage to the panel or connector, or thermostat failure — both of which are repairable. A 10-year manufacturer warranty is standard from reputable brands.',
  },
  {
    question: 'What thermostat is best for infrared heating panels?',
    answer:
      'Smart thermostats with learning capability (Google Nest, Drayton Wiser, Hive) work well with infrared panels — they learn occupancy patterns and pre-heat accordingly, reducing the total on-time compared to simple timers. For simpler installations, a programmable 7-day room thermostat (Honeywell T6, Salus RT520) provides adequate control. Wireless thermostats avoid the need to run a separate control cable from the panel to the preferred thermostat position. Each infrared panel should ideally have its own thermostat for zone control.',
  },
  {
    question: 'Can infrared panels be connected to a solar PV system?',
    answer:
      'Yes. Infrared panels are compatible with solar PV self-consumption systems. A power diverter (Eddi, myenergi) can direct surplus solar generation that would otherwise be exported to the grid into infrared heating panels or other resistive loads. This is particularly effective in rooms that benefit from daytime heating (conservatories, home offices, living rooms) during the solar generation hours of 08:00–16:00. For maximum solar self-consumption, ensure the thermostat setpoint is reachable during solar generation hours.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electric-storage-heater-installation',
    title: 'Storage Heater Installation',
    description: 'Modern electric storage heaters, Economy 7 wiring, and replacement costs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote infrared heating installations accurately with AI-assisted pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement',
    description: 'Consumer unit upgrades when installing dedicated heating circuits.',
    icon: Settings,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'how-infrared-works',
    heading: 'How Infrared Heating Works',
    content: (
      <>
        <p>
          Infrared heating panels emit electromagnetic radiation in the long-wave infrared spectrum
          (far infrared, approximately 8–14 microns wavelength). Unlike visible light, this
          radiation is absorbed by solid objects — furniture, walls, floors, and people — raising
          their surface temperature without first heating the air.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radiant vs convective heat</strong> — traditional panel heaters and
                radiators warm the air, which then circulates by convection to warm occupants.
                Infrared panels warm objects and occupants directly. This means a person sitting
                near an infrared panel feels warm even if the air temperature is relatively low — a
                useful characteristic in draughty or high-ceiling spaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal mass effect</strong> — walls, floors, and furniture absorb infrared
                radiation and re-radiate heat over time, creating a gentle thermal mass effect.
                Rooms heated by infrared tend to feel warm more quickly after the panel switches on
                and retain warmth slightly longer after it switches off compared to pure convection
                heaters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No air movement</strong> — infrared panels have no fans and create no forced
                air circulation. This makes them popular in environments where dust circulation is a
                concern (allergy sufferers, server rooms, precision environments) and in quiet
                spaces such as home offices and bedrooms.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'panel-sizes',
    heading: 'Panel Sizes and Power Ratings',
    content: (
      <>
        <p>
          Infrared panels are available in a wide range of power ratings and physical sizes. Correct
          panel selection is essential for comfort and efficiency.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>300–500 W</strong> — suitable for small bedrooms (up to 6 m²), bathrooms,
                and hallways. Physical size approximately 60 × 60 cm to 60 × 90 cm. Can typically be
                connected to an existing ring main via a fused connection unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>600–900 W</strong> — suitable for average bedrooms (8–12 m²) and smaller
                living rooms in well-insulated properties. Physical size approximately 60 × 120 cm.
                Suitable for ring main connection below 2 kW total load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1,000–1,400 W</strong> — typical living room or open-plan kitchen/dining
                specification (15–20 m²). Physical size 60 × 150 cm to 90 × 120 cm. May require
                dedicated circuit at upper end of range depending on existing ring main load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1,600–1,800 W</strong> — large rooms, open-plan spaces, conservatories, and
                workshops (25–30 m²). Physical size 90 × 150 cm to 120 × 120 cm. Dedicated radial
                circuit recommended. These panels are often ceiling-mounted for maximum coverage
                area.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As a sizing guide, use 60–80 W per square metre for rooms with good insulation and 2.4 m
          ceiling height. Increase to 80–100 W/m² for older properties with less insulation, high
          ceilings, or significant glazing areas.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-wiring',
    heading: 'Dedicated Circuit vs Plug-In',
    content: (
      <>
        <p>
          The electrical connection method for infrared panels depends primarily on the panel's
          power rating and the existing circuit loading.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plug-in (13 A socket)</strong> — panels up to approximately 1,200 W are
                available with a standard 13 A plug. Suitable for temporary or portable use. For
                permanent installations, a fused connection unit (FCU) with appropriate fuse rating
                provides a neater and more professional connection than a socket and plug
                arrangement. Ensure the ring main circuit load budget is not exceeded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused connection unit (FCU)</strong> — for permanent wiring of panels up to
                2 kW onto an existing ring main or radial circuit. The FCU is wired from the nearest
                available socket or junction, with appropriate fuse rating (3 A for panels up to 700
                W, 5 A for panels 700 W–1,100 W, 13 A for higher ratings). The FCU provides local
                isolation for the panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated radial circuit</strong> — required for panels above 2 kW, for
                installations in zones where the existing ring main is at or near full load, and for
                any bathroom infrared installation. A 2.5 mm² radial circuit with a 16 A or 20 A MCB
                and 30 mA RCD protection is appropriate for most infrared panel applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P compliance</strong> — any fixed wiring of infrared panels (fused
                connection unit or dedicated circuit) is notifiable work under Part P of the
                Building Regulations. The work must be self-certified by a registered competent
                person or notified to building control.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'thermostat-options',
    heading: 'Thermostat Options for Infrared Panels',
    content: (
      <>
        <p>
          Running an infrared panel without a thermostat is wasteful — the panel runs continuously
          regardless of room temperature, eliminating the energy savings achievable through
          temperature-based switching.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Built-in thermostats</strong> — some panels include a built-in thermostat
                and timer. Convenient for single-panel rooms but less accurate than a separate room
                thermostat positioned at head height away from the panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless room thermostats</strong> — a wireless thermostat and receiver can
                control one or more panels in a zone without running control wiring from the
                thermostat position to each panel. Salus iT500, Honeywell Evohome wireless zones,
                and Hive wireless receivers are all compatible with infrared panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart thermostats</strong> — Google Nest, Drayton Wiser, and tado° can
                control infrared panels via wireless receivers, providing scheduling, geofencing,
                and learning capabilities. Compatible receivers must be rated for the panel's
                current draw.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat wiring</strong> — when wiring a wired thermostat to an infrared
                panel, the thermostat switches the live supply to the panel. The thermostat must be
                rated for the panel's full current. A 16 A thermostat is appropriate for panels up
                to 3.5 kW.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'zone-control',
    heading: 'Zone Control for Infrared Heating',
    content: (
      <>
        <p>
          One of the practical advantages of infrared heating is the ease of implementing true
          room-by-room zone control, unlike wet central heating systems that require thermostatic
          radiator valves or zone valves.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual panel control</strong> — each panel controlled by its own
                thermostat provides perfect zone control. A bedroom panel can be set to 17°C while a
                living room panel is at 21°C, with different schedules for each room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-zone smart systems</strong> — platforms like Drayton Wiser, Honeywell
                Evohome, and tado° support multiple independent zones on a single app. Each zone has
                a wireless receiver controlling the panel(s) in that room. Up to 12–16 zones can be
                managed on a single hub.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open window detection</strong> — smart thermostats with open window
                detection (tado°, Wiser) reduce or eliminate heating when a window is opened,
                preventing wasted energy from heating outdoor air. Particularly useful in rooms with
                frequent ventilation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mounting',
    heading: 'Ceiling vs Wall Mounting',
    content: (
      <>
        <p>
          Both ceiling and wall mounting are suitable for infrared panels, and the choice depends on
          room geometry, ceiling height, and the primary occupancy pattern.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall mounting</strong> — positioned high on the wall (1.9–2.1 m) directing
                radiant energy across the room. Best where occupants are mobile (hallways, kitchens)
                or where ceiling access is impractical. Side-wall mounting angles energy toward
                seating or working areas. Most domestic installations use wall mounting for bedrooms
                and living rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling mounting</strong> — provides the largest effective coverage area
                from a single panel. Best for rooms where occupants are stationary (home offices,
                dining rooms) and for commercial applications (workshops, factories). Ceiling height
                2.4–4.5 m is optimal. Mounting above 4.5 m significantly reduces intensity at floor
                level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structural considerations</strong> — ceiling-mounted panels must be fixed to
                structural joists or adequately rated plasterboard fixings rated for the panel
                weight (3–8 kg typical). Do not fix to plasterboard with standard plasterboard plugs
                — use dedicated hollow wall anchors rated for the panel weight or fix through the
                plasterboard into joists.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Infrared Panel Costs (2025)',
    content: (
      <>
        <p>
          Infrared heating has lower upfront installation costs than wet central heating but higher
          running costs than a heat pump. The economics depend heavily on electricity tariff and
          usage pattern.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel supply only</strong> — 300 W panel: £80–£150; 600 W: £130–£220; 900 W:
                £180–£280; 1,200 W: £220–£350; 1,800 W: £320–£500. Premium brands (Herschel,
                Redwell) command a price premium over budget manufacturers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation per panel (existing circuit)</strong> — £100–£200 per panel to
                supply, fix, wire to FCU or existing circuit, and test. More for ceiling mounting
                requiring access to loft or floor void.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation per panel (new circuit)</strong> — £200–£400 per panel when a
                new dedicated radial circuit is required from the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Whole-house infrared system (3-bedroom, 6 panels)</strong> — £3,000–£6,500
                installed, including panels, wiring, thermostats, and consumer unit additions if
                required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'vs-convection',
    heading: 'Infrared vs Convection Heating',
    content: (
      <>
        <p>
          Understanding how infrared compares to convection heating helps electricians advise
          customers on the most suitable heating technology for their property and lifestyle.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Speed of warming</strong> — infrared panels feel warm almost immediately
                (within 1–2 minutes). Convection heaters warm the air first, which then warms
                occupants — this takes longer, particularly in large rooms. For rooms used
                intermittently, infrared has a practical advantage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air quality</strong> — infrared heating creates no air movement and does not
                dry the air or circulate dust. Convection heaters create air circulation that can
                dry mucous membranes and distribute airborne allergens. Infrared is preferred in
                bedrooms and spaces occupied by allergy sufferers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-ceiling and draughty spaces</strong> — in high-ceiling rooms, warm air
                rises to the ceiling where it provides no benefit to occupants. Infrared heats
                objects at the level where people are present, regardless of ceiling height.
                Workshops, conservatories, and period properties with high ceilings benefit
                significantly from infrared over convection heating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat pump comparison</strong> — an air-source heat pump achieves 200–300%
                efficiency (coefficient of performance) compared to 100% for infrared. Running costs
                for infrared are 2–3 times higher than a heat pump for the same heat output. For
                properties where a heat pump is feasible, it is the economically superior choice.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Infrared Panel Installation',
    content: (
      <>
        <p>
          Infrared panel installation is straightforward domestic electrical work with good margins.
          Most residential jobs are half-day to full-day installations, and the growing interest in
          electric-only heating makes this a recurring enquiry source.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-certificates">
                    Elec-Mate certificates app
                  </SEOInternalLink>{' '}
                  to complete Minor Works Certificates or Electrical Installation Certificates for
                  infrared panel installations on your phone. Clients receive Part P compliance
                  documentation before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Multi-Room Systems</h4>
                <p className="text-white text-sm leading-relaxed">
                  Single-panel enquiries often convert to multi-room systems when you present a
                  clear whole-house proposal. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised quotes for each room and present the total system cost
                  professionally.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage infrared heating installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for Minor Works Certificates, EIC certificates, and professional multi-room heating quotes. 7-day free trial, cancel anytime."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InfraredHeatingInstallationPage() {
  return (
    <GuideTemplate
      title="Infrared Heating Installation UK | Infrared Panel Heater Guide"
      description="Complete guide to infrared heating installation in the UK. How infrared heating works (radiant heat), panel sizes 300W–1800W, dedicated circuit vs plug-in, thermostat options, zone control, ceiling vs wall mounting, costs £200–£600 per panel installed, and comparison with convection heating."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Heating Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Infrared Heating Installation UK:{' '}
          <span className="text-yellow-400">Infrared Panel Heater Guide</span>
        </>
      }
      heroSubtitle="A complete guide to infrared heating installation in the UK — how radiant heat differs from convection, panel sizes and power ratings from 300 W to 1,800 W, dedicated circuit requirements, thermostat and zone control options, ceiling versus wall mounting, 2025 installation costs, and comparison with traditional heating."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Infrared Heating Installation"
      relatedPages={relatedPages}
      ctaHeading="Certificate Infrared Heating Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for Minor Works Certificates, EIC certificates, and professional heating system quotes. 7-day free trial, cancel anytime."
    />
  );
}
