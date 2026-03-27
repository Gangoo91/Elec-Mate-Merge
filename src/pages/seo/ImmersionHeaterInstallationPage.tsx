import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Thermometer,
  Zap,
  ShieldCheck,
  Clock,
  PoundSterling,
  AlertTriangle,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides' },
  { label: 'Immersion Heater Installation', href: '/immersion-heater-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'circuit-requirements', label: 'Dedicated 20A Circuit Requirement' },
  { id: 'element-types', label: 'Element Types & Selection' },
  { id: 'thermostat-settings', label: 'Thermostat Settings & Legionella' },
  { id: 'controls', label: 'Timer, Boost & Smart Controls' },
  { id: 'solar-diverter', label: 'Solar Diverter Compatibility' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'installation-steps', label: 'Installation Steps' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An immersion heater must be supplied from a dedicated 20A radial circuit protected by a 20A MCB or fuse. It must not be shared with any other circuit or appliance. A double-pole isolating switch rated at 20A must be located within reach of the cylinder.',
  'Thermostats must be set to at least 60°C (and ideally 60–65°C) to prevent the growth of Legionella bacteria in the stored water. Regular heat cycling — heating to 60°C at least once per week — is recommended even when economy tariffs are used.',
  'Immersion heaters are available with top-entry elements (heat the whole tank), bottom-entry elements (heat a smaller volume for economy use), and dual-element configurations (one element at each position for flexible control).',
  'A 3kW immersion element at 60°C takes approximately 2–3 hours to heat a standard 120-litre cylinder. Running costs depend on the electricity tariff: at 25p/kWh, a full heat cycle costs approximately 22–27p per cycle on a 3kW element.',
  'Solar PV diverters (such as myenergi Eddi or Immersun) can route surplus solar generation to the immersion heater, significantly reducing water heating costs for properties with solar PV systems.',
];

const faqs = [
  {
    question: 'Does an immersion heater need its own circuit?',
    answer:
      'Yes. An immersion heater must be connected to a dedicated radial circuit — it must not share a circuit with any other appliance. The circuit must be rated at 20A and protected by a 20A MCB (Type B or C) or equivalent fuse. The circuit cable must be sized for the current and the run length — 2.5mm² twin and earth is standard for most domestic installations where the cable is clipped directly or in conduit. A 4mm² cable may be required for long runs or where the cable is thermally insulated.',
  },
  {
    question: 'What temperature should an immersion heater thermostat be set to?',
    answer:
      'The thermostat should be set to a minimum of 60°C. At this temperature, Legionella bacteria (which causes Legionnaires\' disease) cannot survive in stored hot water. The Health and Safety Executive (HSE) recommends that stored hot water is maintained at 60°C or above. Setting the thermostat below 60°C to save energy creates a genuine health risk, particularly in properties with vulnerable occupants. For most domestic installations, 60–65°C is the recommended setting. A thermostatic blending valve (TMV) at the point of use can reduce the hot water delivered to taps to a safe temperature.',
  },
  {
    question: 'What is the difference between a top and bottom immersion heater?',
    answer:
      'A top-entry immersion element heats water from the top of the cylinder downward, eventually heating the entire volume. It is used to heat the full cylinder and is the standard element for a primary immersion heater. A bottom-entry element heats from the base of the cylinder upward. On its own it heats the entire tank slowly and less efficiently. In dual-element cylinders, the bottom element is used for economy heating (e.g., overnight on an Economy 7 tariff) to heat the full cylinder at a lower rate, while the top element provides a quick boost to the upper portion of the tank.',
  },
  {
    question: 'How long does an immersion heater take to heat a cylinder?',
    answer:
      'Heating time depends on the element wattage, the cylinder volume, and the starting water temperature. For a standard 3kW element heating a 120-litre cylinder from cold (approximately 10°C) to 60°C: energy required = 120 litres × 4.18 J/g°C × 50°C = 25,080 kJ = approximately 6.97 kWh. At 3kW this takes approximately 2 hours 20 minutes. In practice, heat losses during the heating cycle mean slightly longer times — typically 2.5–3 hours. A 2kW element takes approximately 3.5–4 hours for the same cylinder.',
  },
  {
    question: 'Can I use an immersion heater with solar panels?',
    answer:
      'Yes. A solar PV diverter device (such as the myenergi Eddi, Immersun, or iBoost) monitors the property\'s grid connection and diverts surplus solar generation that would otherwise be exported to the grid into the immersion heater. This allows solar electricity that would otherwise be earned at the SEG (Smart Export Guarantee) rate to be used for water heating instead. For properties with solar PV, a solar diverter significantly reduces water heating costs. The diverter is wired between the consumer unit and the immersion heater circuit.',
  },
  {
    question: 'Does immersion heater installation need to be certified?',
    answer:
      'Yes. Installing a new immersion heater on a new circuit is notifiable work under Building Regulations Part P. A registered competent person (NICEIC, NAPIT, or ELECSA) can self-certify and notify the work automatically. Non-registered persons must submit a building notice to the local authority. On completion, an Electrical Installation Certificate must be issued. Replacing a like-for-like element on an existing circuit (with no wiring changes) is generally not notifiable, but best practice is to issue a Minor Works Certificate confirming the work has been tested.',
  },
  {
    question: 'What causes an immersion heater element to fail?',
    answer:
      'The most common cause of immersion heater element failure is limescale buildup on hard water areas, which insulates the element and causes it to overheat. Elements in hard water areas (most of southern England) typically last 3–8 years before requiring replacement. Setting the thermostat too high (above 65°C) accelerates limescale deposition. Other causes include corrosion of the element sheath and electrical failure of the element windings. When an element fails, the cylinder usually continues to hold water safely — the element can be replaced without draining the cylinder if a proper immersion heater spanner and element cap seal are used.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/thermostat-wiring-guide',
    title: 'Thermostat Wiring Guide',
    description: 'Room thermostat, cylinder thermostat, and programmer wiring for S-Plan and Y-Plan systems.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-protection-explained',
    title: 'RCD Protection Explained',
    description: 'How RCDs work, where they are required, and how to test them.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical inspection requirements and compliance deadlines.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'Electrical Certificate App',
    description: 'Complete electrical certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/led-lighting-upgrade',
    title: 'LED Lighting Upgrade',
    description: 'Replacing fluorescent and halogen lights with LED — energy savings and costs.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Immersion Heater Installation: Overview',
    content: (
      <>
        <p>
          An immersion heater is an electric resistance heating element installed directly into
          a hot water cylinder. It heats stored water in the same way as a kettle element,
          providing hot water independently of (or as backup to) a central heating boiler.
          Immersion heaters are found in properties without gas boilers, as backup systems in
          gas-heated properties, and increasingly alongside solar PV diverter systems.
        </p>
        <p>
          From an electrical perspective, immersion heater installation involves a dedicated
          20A radial circuit, correct thermostat setting (critical for Legionella prevention),
          and appropriate controls. All installation work must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and is notifiable under Building Regulations Part P for new circuits.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — new immersion heater circuits are
                notifiable under Building Regulations Part P. Registered competent persons
                self-certify automatically. Non-registered persons must submit a building
                notice and have the work inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — the circuit must comply with all
                relevant sections of the IET Wiring Regulations, including circuit
                protection, cable sizing, earthing and bonding, and RCD protection
                requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'circuit-requirements',
    heading: 'Dedicated 20A Radial Circuit Requirement',
    content: (
      <>
        <p>
          A standard domestic immersion heater draws 3kW (13A at 240V). BS 7671 requires the
          circuit to be sized for the load and the installation method. A dedicated 20A radial
          circuit is the standard specification for immersion heater supply in UK domestic premises.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB rating</strong> — a 20A Type B or Type C MCB at the consumer
                unit. A 16A MCB is acceptable for a 3kW element (13A continuous load) but
                20A provides more headroom for inrush current and is standard practice.
                Do not use a 13A fused spur — a dedicated circuit to the consumer unit is
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — 2.5mm² twin and earth for most domestic
                runs where the cable is clipped to a surface or in conduit (current capacity
                23A in free air, 18.5A clipped to surface, 18A in conduit). For runs where
                cable passes through insulation, 4mm² twin and earth is required (thermal
                insulation significantly dereates cable capacity).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolating switch</strong> — a 20A double-pole switch with a pilot
                light (to indicate when the element is energised) must be installed adjacent
                to the cylinder and accessible without moving the cylinder. The switch must
                be within reach of the element for safe isolation. A flex outlet plate
                connecting the switch to the element is the standard arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — Regulation 411.3.3 requires 30mA RCD
                protection for socket-outlet circuits. For fixed appliance circuits such
                as immersion heaters, an RCBO providing both overcurrent and RCD protection
                is the preferred solution and provides the highest level of shock protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'element-types',
    heading: 'Element Types & Selection',
    content: (
      <>
        <p>
          Immersion heater elements are available in a range of lengths, wattages, and
          connection configurations. Selecting the correct element for the cylinder is
          essential — the wrong element length will not heat the cylinder correctly and
          may damage the element.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Top-entry (long) element</strong> — enters the cylinder from the
                top and extends most of the way down the tank. Heats the entire cylinder
                contents. Available in various lengths (typically 11", 14", 18", 27") to
                suit different cylinder depths. This is the standard element for single-element
                cylinders. Supply and fit cost: £50–£120.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bottom-entry (short) element</strong> — enters the cylinder from
                the side near the bottom. Available in short lengths (typically 11"). Used
                as the primary element in dual-element cylinders to provide economy heating
                on overnight tariffs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-element cylinders</strong> — fitted with both a top (short,
                typically 1kW or 1.5kW) and a bottom (long, typically 3kW) element.
                The bottom element is used for full overnight heating on an Economy 7 tariff;
                the top element provides a daytime boost to the upper portion of the tank only
                (more economical than heating the entire cylinder for a small hot water demand).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Titanium elements</strong> — standard copper-sheathed elements in
                hard water areas accumulate limescale rapidly. Titanium or Incoloy elements
                resist limescale significantly better and are recommended for hard water
                areas. They cost more (£30–£80 vs £15–£40 for copper) but last considerably
                longer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'thermostat-settings',
    heading: 'Thermostat Settings & Legionella Prevention',
    content: (
      <>
        <p>
          The immersion heater thermostat setting is not merely a comfort or economy choice —
          it is a health and safety requirement. Incorrect thermostat settings create conditions
          that allow Legionella bacteria to proliferate in stored hot water.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legionella risk — minimum 60°C</strong> — Legionella bacteria
                proliferate in water stored between 20°C and 45°C and are killed at
                temperatures above 60°C. The HSE recommends stored hot water be maintained
                at 60°C or above. Setting the thermostat to 50°C or lower creates a
                genuine risk of Legionella growth, particularly in cylinders that are
                not frequently used or have stagnant sections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended setting: 60–65°C</strong> — this temperature kills
                Legionella and all other waterborne pathogens while not being so high as
                to cause excessive limescale deposition or create a scalding risk at
                unblended outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostatic mixing valves (TMVs)</strong> — where the hot water
                is stored at 60°C+ but outlets (particularly baths and showers accessible
                to children or elderly people) must deliver water at a safe temperature,
                a TMV rated to TMV2 or TMV3 should be fitted at the point of use to limit
                delivered hot water to 43°C (bath/shower) or 38°C (bidet/wash basin where
                required).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly heat cycling</strong> — for properties using economy tariffs
                where the cylinder may not reach 60°C every day, the HSE recommends
                heating to 60°C at least once per week. A timer boost circuit set for
                weekly pasteurisation is the cleanest solution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'controls',
    heading: 'Timer, Boost & Smart Controls',
    content: (
      <>
        <p>
          Appropriate controls significantly improve the efficiency and running cost of an
          immersion heater installation. At minimum, a timer should be fitted to prevent
          the heater running continuously.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>24-hour mechanical or digital timer</strong> — programmes the
                immersion heater to operate during off-peak tariff periods (e.g., Economy 7
                overnight periods). Typically fitted at the isolating switch position using
                a combined timer/switch plate (e.g., Timeguard TRT035 or equivalent).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Boost facility</strong> — a timer with a manual boost override
                allows the immersion to be turned on for a set period (typically 30 or
                60 minutes) for on-demand hot water heating between scheduled periods.
                Essential for any installation that relies on off-peak heating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart controls</strong> — Wi-Fi-connected immersion heater
                controllers (such as the Sunamp or myenergi Eddi app-controlled units)
                allow remote monitoring and control, automatic response to dynamic tariff
                pricing (Octopus Agile, etc.), and integration with solar diverter systems.
                The wiring is identical to a standard isolating switch; the intelligence is
                in the controller.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'solar-diverter',
    heading: 'Solar Diverter Compatibility',
    content: (
      <>
        <p>
          Solar PV diverter devices offer an elegant way to reduce water heating costs for
          properties with solar PV systems. Instead of exporting surplus generation to the
          grid at the Smart Export Guarantee rate (typically 3–15p/kWh), the diverter routes
          this surplus to the immersion heater, effectively converting solar electricity to
          hot water at no cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How diverters work</strong> — a current transformer (CT clamp)
                monitors current at the grid connection. When the PV system generates
                more than the household is consuming (surplus generation), the diverter
                begins routing current to the immersion heater in proportion to the surplus.
                The heater effectively absorbs the exact surplus — neither wasting it nor
                drawing from the grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Popular UK diverters</strong> — myenergi Eddi, Marlec Rutland Windcharger
                iBoost+, Immersun, and Power Diverter Pro are the most common UK solar diverter
                products. All work on the same principle but vary in features, app connectivity,
                and compatibility with home energy management systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation note</strong> — the diverter is wired between the
                consumer unit and the immersion heater isolating switch. The CT clamp
                is installed on the grid import/export cable at the consumer unit. The
                immersion thermostat must still be set to 60°C minimum, as the diverter
                controls the duration but not the temperature of heating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Immersion Heater Costs (2026)',
    content: (
      <>
        <p>
          Immersion heater installation and replacement costs depend on whether a new circuit
          is required and the accessibility of the cylinder. The following are typical costs
          for UK electrical contractors in 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion element only (supply)</strong> — copper element:
                £15–£40; Incoloy/titanium element: £30–£80. Premium dual immersion
                thermostats: £10–£25.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Like-for-like element replacement (labour)</strong> — £80–£150
                depending on access. Includes draining sufficient water, removing old
                element, fitting new element with a new sealing washer, refilling, and
                testing. Minor Works Certificate recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New immersion heater circuit (materials + labour)</strong> — £200–£400
                for a straightforward domestic installation: consumer unit to cylinder,
                20A RCBO, 20A double-pole switch with pilot light, flex outlet, element,
                and timer. Electrical Installation Certificate included. Longer cable runs
                or difficult access adds to cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar diverter installation</strong> — myenergi Eddi supply and
                installation: £400–£600 including CT clamp installation, wiring to
                immersion circuit, and commissioning. Payback typically 1–3 years
                depending on solar generation profile and hot water usage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-steps',
    heading: 'Installation Steps',
    content: (
      <>
        <p>
          The following steps cover a typical new immersion heater circuit installation in
          a domestic property. Always isolate and prove dead before working on any live circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1. Isolate and lock off</strong> — isolate the consumer unit main
                switch before any wiring work. Use a lock-off device and prove dead with
                an approved voltage indicator before commencing work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2. Install the circuit cable</strong> — run 2.5mm² (or 4mm² where
                passing through insulation) twin and earth from the consumer unit to the
                cylinder location. Route to avoid contact with hot water pipes. Clip
                or enclose in conduit throughout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3. Install the isolating switch and timer</strong> — mount the
                20A double-pole switch (with timer if required) adjacent to the cylinder.
                Connect the circuit cable to the switch and run heat-resistant flex from
                the switch outlet to the immersion element boss.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4. Install the element</strong> — ensure the cylinder is
                sufficiently drained or that the element boss is above the water line.
                Fit the element with a new fibre sealing washer, tighten to the
                manufacturer's torque specification, connect the flex, and set the
                thermostat to 60–65°C.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5. Connect at consumer unit</strong> — install the 20A RCBO or MCB
                and connect the circuit cable. Restore power, test continuity, insulation
                resistance, polarity, and RCD operation. Record results and issue an
                Electrical Installation Certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Immersion Heater Work',
    content: (
      <>
        <p>
          Immersion heater installation and element replacement is straightforward domestic
          work with a low parts cost and a short time on site. Solar diverter installations
          (particularly myenergi Eddi, which integrates with their EV charger ecosystem) are
          an increasingly common upsell for electricians already working on solar PV or
          EV charger installations.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue an Electrical Installation Certificate for new immersion heater
                  circuits and a Minor Works Certificate for element replacements. PDF
                  sent to the client before you leave — fully Part P compliant.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Upsell Solar Diverters</h4>
                <p className="text-white text-sm leading-relaxed">
                  Any client with a solar PV system and a hot water cylinder is a candidate
                  for a solar diverter installation. At £400–£600 fitted, with a typical
                  payback of 1–3 years, these are easy to justify. A myenergi Eddi can also
                  integrate with a myenergi Zappi EV charger if the client has or is
                  considering an EV charger installation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify immersion heater installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate to issue Electrical Installation Certificates and Minor Works Certificates on site. Part P compliant certification with instant PDF export and automatic notification. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ImmersionHeaterInstallationPage() {
  return (
    <GuideTemplate
      title="Immersion Heater Installation UK | Electrical Requirements & Costs"
      description="Complete guide to immersion heater installation in the UK. Dedicated 20A circuit, thermostat at 60-65°C for Legionella prevention, element types, timer and boost controls, solar diverter compatibility, and typical costs (element £30-80, installation £100-200)."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Immersion Heater Installation UK:{' '}
          <span className="text-yellow-400">Electrical Requirements & Costs</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about immersion heater installation — dedicated 20A circuit requirements, thermostat settings for Legionella prevention, element types, timer controls, solar diverter compatibility, and 2026 costs."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Immersion Heater Installation"
      relatedPages={relatedPages}
      ctaHeading="Certify Immersion Heater Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to issue Electrical Installation Certificates and Minor Works Certificates on site. Instant PDF export, Part P compliant. 7-day free trial, cancel anytime."
    />
  );
}
