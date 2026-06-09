import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Lightbulb,
  BookOpen,
  Home,
  ShieldCheck,
  Network,
  Cable,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Grounded in BS EN 62386 (Digital Addressable Lighting Interface — DALI),
// BS 7671:2018+A4:2026 (18th Edition), BS EN 60598 (Luminaires), BS 5266
// (emergency lighting) and the IET On-Site Guide. Every BS 7671 regulation
// number/section cited has been verified against the published standard text.
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'DALI Lighting Control Wiring',
    href: '/guides/dali-lighting-control-wiring-bs-en-62386',
  },
];

const tocItems = [
  { id: 'what-is-dali', label: 'What is DALI?' },
  { id: 'dali-1-vs-dali-2-vs-d4i', label: 'DALI-1 / DALI-2 / D4i' },
  { id: 'bus-topology', label: 'Bus topology' },
  { id: 'bus-power-supply', label: 'Bus power supply' },
  { id: 'cable-selection', label: 'Cable selection' },
  { id: 'section-528-segregation', label: 'Section 528 segregation' },
  { id: 'wiring-practices', label: 'Wiring practices' },
  { id: 'commissioning', label: 'Commissioning' },
  { id: 'emergency-lighting-integration', label: 'Emergency lighting' },
  { id: 'master-slave-broadcast', label: 'Architecture modes' },
  { id: 'fault-isolation', label: 'Fault isolation' },
  { id: 'comparison-with-other-protocols', label: 'Comparison' },
  { id: 'certification-handover', label: 'Certification' },
  { id: 'how-to', label: 'How to install & commission' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related pages' },
];

const keyTakeaways = [
  'DALI is defined by the BS EN 62386 series — Part 101 covers the physical bus, Part 102 covers control gear, Part 103 covers control devices, and the Part 2xx range covers application extensions such as emergency lighting (Part 202) and colour control (Part 209).',
  'The DALI bus is a polarity-insensitive two-wire bus, nominal 16V DC, up to 250mA. It supports 64 short addresses, 16 groups and 16 scenes per line, with a maximum cable length of 300 metres at 1.5mm² conductor cross-section.',
  'DALI-2 introduced certified interoperability between gear and control devices from different manufacturers. D4i extends DALI-2 with intra-luminaire power and data on the same pair for IoT-enabled luminaires.',
  'Under BS 7671:2018+A4:2026 the DALI bus is a Band I (ELV) signalling circuit. Section 528 governs how it may share trunking, conduit and luminaires with the Band II mains supply powering the drivers.',
  'A short circuit on the DALI bus disables the whole line — every luminaire on that bus holds at its last-known or fail-safe brightness. Fault isolation and short-circuit-proof bus power supplies are essential.',
  'Commissioning is where DALI delivers value — addressing, grouping, scene programming and sensor binding are done with vendor software or vendor-neutral DALI-2 tools.',
];

// -------------------------------------------------------------------
// Reusable card primitives matching the design system
// -------------------------------------------------------------------

function SpecRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
      <span className="text-white font-medium text-sm">{label}</span>
      <span className="text-yellow-400 font-bold text-sm text-right">{value}</span>
    </div>
  );
}

const sections = [
  {
    id: 'what-is-dali',
    heading: 'What DALI Actually Is',
    content: (
      <>
        <p>
          DALI stands for Digital Addressable Lighting Interface — the open international standard
          for digital communication between lighting control gear (drivers, ballasts, emergency
          converters) and control devices (sensors, push-button panels, scene controllers, BMS). It
          is published in the BS EN 62386 series and is the dominant protocol for commercial
          lighting control on UK fit-out, retrofit and new-build projects.
        </p>
        <p>
          Where 0-10V analogue offers one brightness channel per dimming line, and relay contactors
          switch only pre-wired groups, a DALI bus addresses up to 64 individual devices per line,
          commands each independently, queries each for status (lamp failure, energy, hours run),
          and reorganises groupings in software. For the UK electrician this changes the wiring:
          permanent live to every driver, plus a two-wire DALI bus to every controllable device.
          Switching happens in software during commissioning, not in copper at first fix.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-blue-300 mb-2">DALI is digital signalling, not power</h3>
          <p className="text-white text-sm leading-relaxed">
            The DALI bus carries data at approximately 1200 baud as a Manchester-encoded signal
            around a 16V DC nominal level. It does not power the luminaire — every driver still
            needs its own 230V AC mains supply.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'dali-1-vs-dali-2-vs-d4i',
    heading: 'DALI-1 vs DALI-2 vs D4i',
    content: (
      <>
        <p>
          DALI has evolved through three generations, often mixed within the same building. Knowing
          which generation you have changes the commissioning tools you need and how the bus is
          powered.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-1">DALI-1</h3>
            <p className="text-yellow-400 text-xs font-semibold mb-3">Original — mid-2000s</p>
            <p className="text-white text-sm leading-relaxed">
              Defined the bus, the 16V DC physical layer and the 64-address command set. Vendor
              interoperability was uneven, so commissioning typically required vendor-specific tools.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="font-bold text-yellow-400 text-lg mb-1">DALI-2</h3>
            <p className="text-yellow-400 text-xs font-semibold mb-3">
              Certified interoperability — administered by DiiA
            </p>
            <p className="text-white text-sm leading-relaxed">
              Gear (Part 102) and control devices (Part 103) carrying the DALI-2 logo are guaranteed
              to interoperate at protocol level. DALI-2 also formalised the single bus power supply
              (one PSU per line).
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-1">D4i</h3>
            <p className="text-yellow-400 text-xs font-semibold mb-3">
              DALI-2 extension — IoT-ready
            </p>
            <p className="text-white text-sm leading-relaxed">
              Requires intra-luminaire DALI: the driver can supply bus power, exposes standardised
              energy and diagnostic data, and accepts IoT sensor nodes plugged directly into the
              luminaire. The foundation for connected-luminaire IoT in offices and warehouses.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <h3 className="font-bold text-red-300 mb-2">Specify DALI-2 throughout where possible</h3>
          <p className="text-white text-sm leading-relaxed">
            New specifications almost universally call for DALI-2 gear, frequently with D4i where
            future IoT sensors are anticipated. Retrofits often splice into DALI-1 — interoperable in
            principle but proprietary extensions and older firmware can create commissioning issues.
            Where mixing, allow contingency for vendor-specific troubleshooting.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'bus-topology',
    heading: 'DALI Bus Topology and Limits',
    content: (
      <>
        <p>
          The DALI bus is exceptionally permissive about topology. There is no required daisy-chain,
          no terminating resistor, no trunk-and-spur layout. The standard calls this "free topology"
          — branches, stars, trees and mixed arrangements are all permitted, provided cumulative
          cable length and electrical loading stay within limits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Per-line limits (one DALI bus)</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <SpecRow label="Devices (short addresses)" value="64 (0–63)" />
            <SpecRow label="Groups" value="16 (0–15)" />
            <SpecRow label="Scenes" value="16 (0–15)" />
            <SpecRow label="Nominal bus voltage" value="16V DC" />
            <SpecRow label="Max bus supply current" value="250mA" />
            <SpecRow label="Max cable length (1.5mm²)" value="300 m" />
            <SpecRow label="Max bus voltage drop" value="2V at full load" />
            <SpecRow label="Topology / termination" value="Free / none" />
          </div>
          <p className="text-white/60 text-xs mt-4 leading-relaxed">
            A multi-channel driver (e.g. 4-channel RGBW) consumes one address per channel. Typical
            control gear draws around 2mA from the bus, so a fully populated line of 64 devices sits
            well under the 250mA budget — but sensors and control panels also draw bus current, so
            count the load in design.
          </p>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-blue-300 mb-2">Plan addresses before you wire</h3>
          <p className="text-white text-sm leading-relaxed">
            A common first-fix mistake is to wire more than 64 controllable devices onto a single
            bus. Multi-channel drivers, emergency converters, sensors and panels all consume
            addresses. Count the address budget in design — not at commissioning when re-pulling
            cable is expensive.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'bus-power-supply',
    heading: 'Bus Power Supply',
    content: (
      <>
        <p>
          Every DALI line needs a bus power supply — a small DIN-rail or surface unit providing 16V
          DC nominal and current for the bus. Without it, no signalling occurs, although every
          driver still receives mains and delivers light at its last-known level.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Bus PSU specification</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <SpecRow label="Nominal bus voltage" value="16V DC" />
            <SpecRow label="Permitted bus range" value="9.5V – 22.5V" />
            <SpecRow label="Max bus current" value="250mA per line" />
            <SpecRow label="Short-circuit protection" value="Required (DALI-2)" />
            <SpecRow label="PSUs per line" value="Exactly one (DALI-2)" />
            <SpecRow label="D4i in-luminaire PSU" value="Driver-sourced" />
          </div>
          <p className="text-white/60 text-xs mt-4 leading-relaxed">
            DALI-2 mandates exactly one bus PSU per line. Legacy DALI-1 installations with parallel
            PSUs should be corrected during refurbishment. D4i drivers can supply bus power on the
            same pair within the luminaire boundary, useful for modular ceiling tiles where the
            driver and sensor share a connector.
          </p>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <h3 className="font-bold text-red-300 mb-2">Sizing the PSU is not optional</h3>
          <p className="text-white text-sm leading-relaxed">
            A common commissioning fault is an under-rated bus PSU. The bus works at first fix and
            during initial addressing — then drops devices intermittently once all 64 are powered up.
            Sum the maximum bus current from datasheets and size with at least 20% margin.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'cable-selection',
    heading: 'Cable Selection for the DALI Bus',
    content: (
      <>
        <p>
          The DALI bus is intentionally tolerant of cable choice — no impedance spec, no shielding
          or twisted-pair requirement, no polarity. The two conductors are interchangeable:
          connecting them the wrong way causes no damage and does not stop the bus working. A
          deliberate decision to make DALI installable by general electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Conductor cross-section vs maximum line length
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-900/30 border border-green-700/40">
              <span className="text-white font-bold">1.5mm²</span>
              <span className="text-yellow-400 font-bold">~300 m</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-900/30 border border-amber-700/40">
              <span className="text-white font-bold">0.75mm²</span>
              <span className="text-yellow-400 font-bold">~150 m</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-900/30 border border-amber-700/40">
              <span className="text-white font-bold">0.5mm²</span>
              <span className="text-yellow-400 font-bold">~100 m</span>
            </div>
          </div>
          <p className="text-white/60 text-xs mt-4 leading-relaxed">
            The limiting factor is voltage drop on the bus (2V at full load), not current rating.
            Smaller conductors de-rate the maximum length roughly linearly.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-base mb-3">What the bus needs</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <span className="text-yellow-400 font-semibold">Cable:</span> standard mains cable,
                commonly 1.5mm² twin LSZH or two cores of a 5-core mains cable.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Polarity:</span> insensitive — the
                two cores terminate either way at every device.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Shielding:</span> not required;
                useful only on noisy industrial sites near motors or VSDs.
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="font-bold text-yellow-400 text-base mb-3">Combined mains + DALI cable</h3>
            <p className="text-white text-sm leading-relaxed">
              Using 5-core mains cable for L, N, CPC and the DALI pair together is permitted under{' '}
              <SEOInternalLink href="/guides/section-715-elv-lighting-a4-2026">
                BS 7671:2018+A4:2026 Section 528
              </SEOInternalLink>{' '}
              provided every core carries insulation rated for the highest voltage present.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 my-4">
          <h3 className="font-bold text-emerald-300 mb-2">
            Standardise on 5-core for clean installation
          </h3>
          <p className="text-white text-sm leading-relaxed">
            On any DALI fit-out larger than a single room, standardising on a 5-core 1.5mm²
            mains-rated cable between luminaires is the cleanest approach. One cable per drop, no
            segregation problem inside the cable, every conductor rated for full mains insulation.
            Mark the DALI cores at every termination.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'section-528-segregation',
    heading: 'Section 528 — Segregation Under BS 7671:2018+A4:2026',
    content: (
      <>
        <p>
          Section 528 of BS 7671:2018+A4:2026 governs the proximity of wiring systems of different
          voltage bands. The DALI bus is a Band I (ELV) signalling circuit — Band I explicitly
          covers signalling and control installations — and the mains supply to the drivers is Band
          II. Regulation 528.1 sets out when these may share a wiring system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-1">
            Reg 528.1 — permitted methods to combine Band I and Band II
          </h3>
          <p className="text-white/60 text-xs mb-4">
            A Band I circuit shall not share a wiring system with a Band II circuit unless one of
            these methods is used:
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-blue-900/30 border border-blue-700/40">
              <span className="text-yellow-400 font-bold text-sm">528.1 (a)/(b)</span>
              <p className="text-white text-sm mt-1">
                Every cable (or every core of a multicore cable) is insulated for the highest voltage
                present. This is the basis for the 5-core mains-rated cable approach.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-yellow-400 font-bold text-sm">528.1 (c)</span>
              <p className="text-white text-sm mt-1">
                Cables are installed in a separate compartment of a cable ducting or trunking system.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-yellow-400 font-bold text-sm">528.1 (d)/(e)</span>
              <p className="text-white text-sm mt-1">
                A cable tray with a physical partition, or a separate conduit, trunking or ducting
                system for the DALI bus.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-yellow-400 font-bold text-sm">528.1 (f)</span>
              <p className="text-white text-sm mt-1">
                For a multicore cable, the Band I cores are separated from the Band II cores by an
                earthed metal screen of equivalent current-carrying capacity to the largest Band II
                core.
              </p>
            </div>
          </div>
        </div>
        <p>
          Within the luminaire, the requirements of Section 559 (luminaires and lighting
          installations) apply alongside Section 528 — the DALI bus terminals and the mains terminals
          must be appropriately separated within the gear tray, or the bus cable must carry
          mains-rated insulation up to the driver. Where the bus serves Part 202 emergency
          converters, BS 5266 and BS 8519 may impose fire-rated cable requirements on that segment;
          528.1 itself references BS 5266, BS 5839 and BS 8519 for safety-service separation. Check
          the project fire engineering brief.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-blue-300 mb-2">Section 715 ELV lighting interaction</h3>
          <p className="text-white text-sm leading-relaxed">
            Where the lighting itself is extra-low voltage (e.g. SELV LED strip on a 24V output),
            Section 715 of BS 7671:2018+A4:2026 governs the SELV output side. The DALI bus
            controlling the SELV driver remains a Band I signalling circuit subject to Section 528.
            See the{' '}
            <SEOInternalLink href="/guides/section-715-elv-lighting-a4-2026">
              Section 715 ELV lighting under A4:2026 guide
            </SEOInternalLink>
            .
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-practices',
    heading: 'Practical Wiring on Site',
    content: (
      <>
        <p>
          First-fix follows a consistent pattern, and doing it the same way every time pays off at
          commissioning.
        </p>
        <ol className="space-y-3 my-4 pl-6 list-decimal text-white">
          <li>
            Run permanent live, neutral and CPC to every driver from the lighting MCB or RCBO — as
            you would for an uncontrolled mains-switched luminaire. There is no switched live in a
            DALI installation.
          </li>
          <li>
            Run the DALI bus pair (two cores, polarity-insensitive) to every device — every driver,
            every sensor, every control panel, every emergency converter. Free topology: branch, star
            or daisy-chain as suits.
          </li>
          <li>
            Terminate the bus pair at the driver's DA / DA terminals (sometimes labelled D+ / D-, but
            polarity-insensitive). Tighten to the driver's specified torque.
          </li>
          <li>
            Run the DALI bus back to the lighting control panel where the bus PSU sits. Terminate on
            the PSU output and power up.
          </li>
          <li>
            For multi-line systems, each line has its own PSU and bus pair. Lines may share trunking
            but must not share bus cores — each line is a separate two-wire pair with independent
            address space.
          </li>
          <li>
            Document the bus topology on the as-installed drawing — every drop, every drive, every
            sensor. Commissioning relies on knowing which physical luminaire corresponds to which
            discovered short address.
          </li>
        </ol>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <h3 className="font-bold text-red-300 mb-2">Permanent live to every driver</h3>
          <p className="text-white text-sm leading-relaxed">
            The single most common DALI first-fix mistake is wiring one core as a switched live.
            Every driver receives permanent mains 24/7. If you wire a switched live from a wall
            plate, DALI commands cannot wake the driver because it is unpowered. The wall plate is
            itself a DALI control device on the bus — not a mains switch.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'commissioning',
    heading: 'Commissioning — Addressing, Grouping, Scenes',
    content: (
      <>
        <p>
          Commissioning is where DALI delivers its value. Out of the box, every driver responds to
          the broadcast address — every luminaire reacts identically until commissioning gives each
          its own identity.
        </p>
        <ol className="space-y-3 my-4 pl-6 list-decimal text-white">
          <li>
            Power up the bus and confirm every driver is alive — broadcast a fade-to-100% command and
            walk the building. If a luminaire does not respond, it is unpowered, unwired, or faulty.
          </li>
          <li>
            Run automatic short address assignment from the commissioning tool. The tool assigns
            addresses 0 to (N-1) to every device. The assignment is effectively random, so
            identification comes next.
          </li>
          <li>
            Identify each address against the physical luminaire — by flashing each address in turn
            and walking the space. Record the mapping on the as-installed drawing.
          </li>
          <li>
            Assign devices to groups (e.g. Group 0 = perimeter, Group 1 = central, Group 2 =
            corridor). A device may belong to multiple groups; commands target groups efficiently.
          </li>
          <li>
            Program scenes (Scene 0 = Meeting, Scene 1 = Presentation, Scene 2 = Cleaning, Scene 15 =
            Off). Each device stores its own brightness for each scene.
          </li>
          <li>
            Bind control devices to groups or addresses — push-buttons and PIR sensors get their
            group and scene mappings here. This is where DALI replaces traditional wired switching
            entirely in software.
          </li>
        </ol>
        <p>
          Tridonic masterCONFIGURATOR, Helvar Designer and Lunatone DALI Cockpit are common
          manufacturer tools. DALI-2 certified components also work with vendor-neutral tools such as
          DALI Cockpit. A USB-to-DALI interface (typically £100–£300) connects the laptop to the bus.
        </p>
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 my-4">
          <h3 className="font-bold text-emerald-300 mb-2">Hand the commissioning file to the client</h3>
          <p className="text-white text-sm leading-relaxed">
            The commissioning file (a backup of every address, group, scene and binding on the bus)
            is the most valuable handover document on a DALI project. Save to project records, email
            a copy to the client, and store a backup off-site.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting-integration',
    heading: 'Emergency Lighting Integration (BS EN 62386-202)',
    content: (
      <>
        <p>
          BS EN 62386-202 defines the DALI command set for self-contained emergency lighting. Under
          BS 5266, self-contained luminaires must be tested at defined intervals: a short functional
          test (typically monthly) and a full-rated-duration discharge test (annually). DALI Part 202
          automates this.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <ul className="space-y-3 text-white text-sm">
            <li>
              <span className="text-yellow-400 font-semibold">Addressing:</span> each emergency
              converter takes a DALI short address on the bus, consuming one of the 64 addresses.
            </li>
            <li>
              <span className="text-yellow-400 font-semibold">Functional test:</span> triggered on
              any addressed converter at any time, individually or in groups.
            </li>
            <li>
              <span className="text-yellow-400 font-semibold">Discharge test:</span> scheduled
              outside occupation hours, with results (pass / fail / battery duration) logged
              automatically.
            </li>
            <li>
              <span className="text-yellow-400 font-semibold">Audit trail:</span> test logs pushed to
              the BMS over a BACnet or Modbus gateway, aligned to the BS 5266 logbook requirement.
            </li>
            <li>
              <span className="text-yellow-400 font-semibold">Self-reporting:</span> failed
              converters or batteries report over the bus — facilities get an automatic alert rather
              than waiting for the next walk-test.
            </li>
          </ul>
        </div>
        <p>
          DALI-driven emergency testing is one of the strongest commercial arguments for the protocol
          on buildings larger than a small office — labour saving on monthly and annual testing
          repays the system cost within a few maintenance cycles. See the{' '}
          <SEOInternalLink href="/guides/bs5266-emergency-lighting-standard">
            BS 5266 emergency lighting standard guide
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-blue-300 mb-2">
            Emergency cabling still follows BS 5266 / BS 8519
          </h3>
          <p className="text-white text-sm leading-relaxed">
            The DALI bus delivers test commands and collects results, but the emergency luminaire
            itself is still subject to BS 5266 maintained / non-maintained classification, three-hour
            duration, and any fire-rated cabling required by the building's fire strategy.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'master-slave-broadcast',
    heading: 'Master/Slave Architecture vs Broadcast Mode',
    content: (
      <>
        <p>
          A DALI line can operate in three architectural modes, which determine commissioning effort
          and flexibility.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-base mb-2">Broadcast</h3>
            <p className="text-white text-sm leading-relaxed">
              Every device listens to every command. No addressing, groups or scenes — the whole bus
              dims and switches as one. The factory default, occasionally specified for very simple
              applications.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-base mb-2">Master/slave</h3>
            <p className="text-white text-sm leading-relaxed">
              A single master control device (a DALI-2 wall panel, sensor or application controller)
              issues commands to a defined set of addressed slaves. Common for small commercial
              spaces — meeting rooms, retail bays.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="font-bold text-yellow-400 text-base mb-2">Managed (controller-based)</h3>
            <p className="text-white text-sm leading-relaxed">
              A central application controller or routing gateway orchestrates groups, scenes,
              schedules and sensor logic — often a node on a higher-level BACnet / Modbus / KNX
              network. Typical for whole-building lighting management.
            </p>
          </div>
        </div>
        <p>
          The managed architecture is dominant on commercial fit-outs: a line controller sits on each
          line, runs schedules and scene logic, and connects to the BMS over BACnet/IP. See the{' '}
          <SEOInternalLink href="/guides/commercial-lighting-guide">
            commercial lighting guide
          </SEOInternalLink>{' '}
          for whole-building integration.
        </p>
      </>
    ),
  },
  {
    id: 'fault-isolation',
    heading: 'Fault Isolation on the Bus',
    content: (
      <>
        <p>
          A short circuit on the DALI bus disables the entire line. Every device drops to its
          configured bus-failure state — typically last-scene, sometimes a fail-safe level. The
          fault-finding sequence is different from a conventional lighting circuit.
        </p>
        <ol className="space-y-3 my-4 pl-6 list-decimal text-white">
          <li>
            Confirm the bus PSU is delivering 16V DC across the PSU output terminals with the bus
            disconnected. If the PSU is dead, the line is unpowered.
          </li>
          <li>
            Reconnect the bus and re-measure. If voltage reads near 0V with the PSU trying to source,
            there is a short somewhere on the line. The PSU's current-limiter is preventing damage but
            no signalling can occur.
          </li>
          <li>
            Bisect the bus — disconnect at a known midpoint and measure each half independently. The
            half that still reads low contains the short.
          </li>
          <li>
            Repeat the bisection until the short is localised. Common causes: a bus core touching a
            mains core or CPC inside a driver, a damaged cable at a containment penetration, a failed
            driver with internally shorted DA terminals.
          </li>
          <li>
            For repeated bus failures, fit a short-circuit-proof bus PSU (most DALI-2 PSUs are) and
            surge protection on the bus side of the PSU — particularly on outdoor or industrial sites
            with heavy switching.
          </li>
        </ol>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <h3 className="font-bold text-red-300 mb-2">Lights still work without bus signalling</h3>
          <p className="text-white text-sm leading-relaxed">
            With the bus disabled, every driver still has mains and outputs light at its last-known
            level. The system has lost control but not power. The failure mode is lit, not dark — a
            feature, but it can mask a bus fault for days until someone notices the controls have
            stopped working.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'comparison-with-other-protocols',
    heading: 'DALI vs KNX vs 0-10V Analogue vs DMX',
    content: (
      <>
        <p>
          DALI is not the only lighting control protocol. The most common alternatives are KNX, 0-10V
          analogue, DMX, and increasingly Power over Ethernet (PoE) lighting.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-white/15 text-left">
                <th className="p-3 text-yellow-400 font-bold">Protocol</th>
                <th className="p-3 text-yellow-400 font-bold">Addressing</th>
                <th className="p-3 text-yellow-400 font-bold">Status feedback</th>
                <th className="p-3 text-yellow-400 font-bold">Typical use</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/10 bg-yellow-500/5">
                <td className="p-3 font-semibold">DALI</td>
                <td className="p-3">64 per line, groups + scenes</td>
                <td className="p-3">Yes (lamp fail, energy, hours)</td>
                <td className="p-3">General commercial lighting</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-semibold">KNX</td>
                <td className="p-3">Building-wide, multi-service</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Whole-building backbone</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-semibold">0-10V</td>
                <td className="p-3">None (single analogue channel)</td>
                <td className="p-3">No</td>
                <td className="p-3">Simple zoned dimming</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-semibold">DMX512</td>
                <td className="p-3">Channel-based, broadcast</td>
                <td className="p-3">No</td>
                <td className="p-3">Theatre, studio, feature lighting</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">PoE lighting</td>
                <td className="p-3">IP address per luminaire</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Data-centre / high-density office</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="space-y-3 text-white text-sm my-4">
          <li>
            <span className="text-yellow-400 font-semibold">DALI vs KNX</span> — many projects use
            DALI for lighting and KNX as the building backbone, bridged by DALI/KNX gateways. See the{' '}
            <SEOInternalLink href="/guides/knx-wiring-installation-guide-uk">
              KNX wiring installation guide
            </SEOInternalLink>
            .
          </li>
          <li>
            <span className="text-yellow-400 font-semibold">DALI vs 0-10V</span> — DALI replaces
            0-10V where individual control, energy reporting, or future reconfigurability matters.
          </li>
          <li>
            <span className="text-yellow-400 font-semibold">DALI vs DMX</span> — DMX is faster and
            broadcast-only; it dominates entertainment, DALI dominates general commercial.
          </li>
          <li>
            <span className="text-yellow-400 font-semibold">DALI vs PoE</span> — PoE delivers power
            and Ethernet data on Cat6 to each luminaire as an IP device. See the{' '}
            <SEOInternalLink href="/guides/poe-lighting-vs-traditional-led-wiring">
              PoE lighting vs traditional LED wiring guide
            </SEOInternalLink>
            .
          </li>
          <li>
            <span className="text-yellow-400 font-semibold">DALI vs wireless</span> — for
            residential use, Zigbee and Matter often replace DALI. See the{' '}
            <SEOInternalLink href="/guides/smart-home-lighting-installation">
              smart home lighting installation guide
            </SEOInternalLink>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'certification-handover',
    heading: 'Certification and Handover',
    content: (
      <>
        <p>
          A DALI installation must be certified to BS 7671:2018+A4:2026 like any other. The mains
          side — permanent live feeds, the bus PSU mains feed, and the lighting MCB/RCBO — is recorded
          on the EIC or Minor Works Certificate, with test results in the schedule of test results.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-base mb-2">BS 7671 documentation</h3>
            <p className="text-white text-sm leading-relaxed">
              EIC or Minor Works Certificate for the mains side under BS 7671:2018+A4:2026, with the
              schedule of test results. Emergency lighting is separately recorded under BS 5266 with
              first test results as the logbook baseline.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-base mb-2">DALI-specific records</h3>
            <p className="text-white text-sm leading-relaxed">
              A commissioning report (every short address, its physical luminaire, programmed groups
              and scenes, control device bindings), the software configuration backup file, and
              as-installed drawings with every luminaire numbered against its DALI short address.
            </p>
          </div>
        </div>
        <p>
          On the Elec-Mate platform, the{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC tool</SEOInternalLink> covers the
          mains-side certification, and lighting commissioning record templates cover the DALI
          handover — both produced as PDFs aligned to BS 7671:2018+A4:2026.
        </p>
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 my-4">
          <h3 className="font-bold text-emerald-300 mb-2">Hand over the bus, not just the lights</h3>
          <p className="text-white text-sm leading-relaxed">
            A handover that consists only of "the lights work" is incomplete. Include the
            commissioning backup file, the address-to-luminaire mapping, the group and scene
            programming, and the emergency lighting test schedule.
          </p>
        </div>
        <SEOAppBridge
          title="Certify the mains side of your DALI install"
          description="Produce the EIC, EICR and Minor Works Certificate for the mains side of a DALI lighting installation — aligned to BS 7671:2018+A4:2026, with the schedule of test results built in."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

const howToSteps = [
  {
    name: 'Plan the bus topology and address budget',
    text: 'Count every controllable device — drivers (one address per dimmable channel), emergency converters, sensors and control panels. Stay within 64 addresses per line and split into multiple lines if needed. Confirm cable lengths are within 300m at 1.5mm². Mark the topology on the lighting drawing before first fix.',
  },
  {
    name: 'First-fix wiring',
    text: 'Run permanent live, neutral and CPC to every driver from the lighting MCB or RCBO. Run a two-core polarity-insensitive DALI bus pair to every controllable device. Standardise on a 5-core 1.5mm² mains-rated cable carrying mains and bus together to satisfy Section 528 of BS 7671:2018+A4:2026 in a single cable.',
  },
  {
    name: 'Install the bus power supply',
    text: 'Mount the DALI bus PSU in the lighting distribution panel or local control panel. Feed from a Band II mains supply. Connect the PSU output to the bus pair returning from the luminaires. Power up and confirm 16V DC on the bus.',
  },
  {
    name: 'Address every device on the bus',
    text: 'Connect a USB-to-DALI interface to the bus. Open the commissioning software (vendor-specific or DALI-2 vendor-neutral). Run automatic addressing to assign short addresses 0 to N-1. Walk the building flashing each address and record the mapping to physical luminaires on the as-installed drawing.',
  },
  {
    name: 'Configure groups, scenes and control devices',
    text: 'Assign devices to groups based on the zoning plan. Program scenes (Meeting, Presentation, Cleaning, etc) with the required brightness per device. Bind push-button panels and PIR sensors to the appropriate groups and scenes. Test every control path from operator action to luminaire response.',
  },
  {
    name: 'Commission emergency lighting and hand over',
    text: 'Run the first BS 5266 functional and discharge tests on Part 202 emergency converters via the DALI bus. Save the commissioning backup file. Produce the EIC under BS 7671:2018+A4:2026, the DALI commissioning report, and the as-installed drawing. Hand all three to the client along with the backup file.',
  },
];

const faqs = [
  {
    question: 'Is DALI a UK or an international standard?',
    answer:
      'DALI is international — published as IEC 62386 globally and BS EN 62386 in the UK. It is certified for interoperability by DiiA (Digital Illumination Interface Alliance) for the DALI-2 and D4i tiers. UK electricians work to BS EN 62386 alongside BS 7671:2018+A4:2026, BS EN 60598 and BS 5266.',
  },
  {
    question: 'Does the DALI bus need to be polarity-correct?',
    answer:
      'No. The DALI bus is polarity-insensitive by design — the two cores are interchangeable at every termination. Connecting them the other way round causes no damage and does not stop the bus working. A deliberate design choice that lets general electricians install DALI without specialist data cabling skills.',
  },
  {
    question: 'How long can a DALI bus run be?',
    answer:
      'Maximum total cable length per line is 300 metres at 1.5mm², set by the 2V voltage drop limit at full current draw. Smaller cross-sections reduce roughly linearly — around 150m at 0.75mm² and 100m at 0.5mm². Beyond 300m, split into multiple lines with their own PSUs and bridge them at a router or gateway.',
  },
  {
    question: 'Can I run the DALI bus in the same cable as the mains supply?',
    answer:
      'Yes, provided you comply with Section 528 of BS 7671:2018+A4:2026. The simplest route is a 5-core mains-rated cable (typically 1.5mm² LSZH) where every conductor is insulated for the highest voltage present. The DALI pair shares with L, N and CPC. Regulation 528.1 is satisfied because every core is mains-insulated.',
  },
  {
    question: 'What happens to the lights if the DALI bus fails?',
    answer:
      'They stay on at their last-known level. The bus carries commands and status, not power. Every driver still has its permanent mains supply, and on loss of signalling each driver holds at its last-received level or transitions to a configured fail-safe. A deliberate fail-lit design — the system loses control but does not plunge the building into darkness.',
  },
  {
    question: 'How many luminaires can I put on a single DALI line?',
    answer:
      'Up to 64 short addresses per line (0 to 63). A single dimmable driver uses one address; a multi-channel driver (e.g. RGBW) uses one per channel. Emergency converters, sensors and control panels also consume addresses. Plan the address budget in design — running out at commissioning usually means pulling additional cable.',
  },
  {
    question: 'Is DALI compatible with KNX or BACnet for whole-building integration?',
    answer:
      'Yes, via gateways. A DALI/KNX gateway translates between a DALI line and a KNX bus; a DALI/BACnet IP gateway puts the DALI configuration onto the BMS network. Common on UK commercial projects where lighting is on DALI but wider building services run on KNX or BACnet. Each gateway has its own commissioning step mapping DALI groups and scenes to KNX or BACnet objects.',
  },
  {
    question: 'How does Elec-Mate help with DALI projects?',
    answer:
      "Elec-Mate covers the BS 7671:2018+A4:2026 certification side — the EIC tool for the mains install, the Minor Works Certificate for smaller modifications, and the EICR tool for periodic inspection. The platform also includes lighting design guidance, BS 5266 emergency lighting calculations and commissioning record templates. The DALI bus commissioning itself is done with the manufacturer's software; the certification and handover documentation around it is produced in Elec-Mate.",
  },
];

const relatedPages = [
  {
    href: '/guides/knx-wiring-installation-guide-uk',
    title: 'KNX Wiring Installation Guide (UK)',
    description:
      'How KNX compares with DALI and how the two integrate via gateways on whole-building installations.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/guides/commercial-lighting-guide',
    title: 'Commercial Lighting Guide',
    description:
      'End-to-end design and installation of commercial lighting on UK fit-outs, with DALI control as the dominant choice.',
    icon: Lightbulb,
    category: 'Guide' as const,
  },
  {
    href: '/guides/smart-home-lighting-installation',
    title: 'Smart Home Lighting Installation',
    description:
      'Wireless and bus-based domestic lighting control — where DALI fits and where Zigbee/Matter take over.',
    icon: Home,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs5266-emergency-lighting-standard',
    title: 'BS 5266 Emergency Lighting Standard',
    description:
      'The UK code of practice for emergency lighting and how DALI Part 202 automates monthly and annual testing.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/poe-lighting-vs-traditional-led-wiring',
    title: 'PoE Lighting vs Traditional LED Wiring',
    description:
      'Power-over-Ethernet lighting as an alternative to DALI on data-centre and high-density office projects.',
    icon: Network,
    category: 'Guide' as const,
  },
  {
    href: '/guides/section-715-elv-lighting-a4-2026',
    title: 'Section 715 ELV Lighting under A4:2026',
    description:
      'SELV and PELV lighting requirements under BS 7671:2018+A4:2026 and how Section 528 segregation interacts.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DALILightingControlWiringPage() {
  return (
    <GuideTemplate
      title="DALI Lighting Control Wiring Guide (BS EN 62386) for UK"
      description="A UK electrician guide to DALI lighting control wiring under BS EN 62386 — DALI-1 vs DALI-2 vs D4i, bus topology, 16V DC power, cable selection and BS 7671 Section 528 segregation."
      datePublished="2026-05-17"
      dateModified="2026-06-09"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Lighting Control Systems"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          DALI Lighting Control Wiring Guide{' '}
          <span className="text-yellow-400">(BS EN 62386)</span> for UK Electricians
        </>
      }
      heroSubtitle="DALI (Digital Addressable Lighting Interface) is the open international standard for lighting control on UK commercial projects. This guide explains BS EN 62386, the differences between DALI-1, DALI-2 and D4i, how to wire the bus correctly under BS 7671:2018+A4:2026 (including Section 528 segregation), the commissioning workflow, and how DALI compares with KNX, 0-10V and DMX."
      readingTime={16}
      answerBox={{
        question: 'How do you wire a DALI lighting control system?',
        answer:
          'Run permanent live, neutral and CPC to every driver — there is no switched live. Then run a two-core, polarity-insensitive DALI bus (nominal 16V DC) to every device: up to 64 short addresses, 16 groups and 16 scenes per line, max 300m at 1.5mm². Each line needs one bus PSU. Switching, grouping and scenes are set in software at commissioning, not in copper. Under BS 7671:2018+A4:2026 the bus is a Band I circuit — Section 528 governs sharing cable/trunking with the Band II mains.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Install and Commission a DALI Lighting System"
      howToDescription="The end-to-end workflow from first-fix wiring to client handover for a DALI-2 lighting control system on a UK commercial fit-out, aligned to BS EN 62386 and BS 7671:2018+A4:2026."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Certify your DALI install to BS 7671:2018+A4:2026"
      ctaSubheading="The Elec-Mate platform produces the EIC, EICR, Minor Works Certificate and emergency lighting commissioning documentation that sit alongside a DALI installation — aligned to BS 7671:2018+A4:2026, BS EN 62386 and BS 5266. 7-day free trial, cancel anytime."
    />
  );
}
