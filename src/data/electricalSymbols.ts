/**
 * Electrical Symbol Library — BS EN 60617 reference
 *
 * Source of truth for the 114 SVG symbols at /public/symbols/<category>/<file>.svg.
 *
 * Used by:
 *   - <SymbolGallery> — renders the full chart on /guides/electrical-symbols-chart
 *   - per-category subpages (e.g. /guides/electrical-switch-symbols)
 *   - per-symbol pages (e.g. /guides/two-way-switch-symbol)
 *   - sitemap-images.xml generator
 *   - ImageObject JSON-LD schema generator
 *
 * Every symbol has:
 *   id         — unique short ID, used as URL slug for per-symbol pages
 *   name       — display name (also used as ImageObject.name)
 *   category   — one of: switch | socket | lighting | distribution | safety
 *                | containment | equipment | mechanical | renewables | controls
 *                | architectural
 *   file       — path inside /public/symbols/ (e.g. switches/2way.svg)
 *   altText    — image alt text (SEO-targeted phrase, includes "symbol")
 *   description — 1-3 sentence explanation of what the symbol represents
 *                  and when it is used in UK electrical drawings
 *   useContext — 1-line summary of where you encounter this on site
 *   bs60617    — BS EN 60617 reference number where applicable (optional)
 */

export type SymbolCategory =
  | 'switch'
  | 'socket'
  | 'lighting'
  | 'distribution'
  | 'safety'
  | 'containment'
  | 'equipment'
  | 'mechanical'
  | 'renewables'
  | 'controls'
  | 'architectural';

export interface ElectricalSymbol {
  id: string;
  name: string;
  category: SymbolCategory;
  file: string;
  altText: string;
  description: string;
  useContext: string;
  bs60617?: string;
}

export const SYMBOL_CATEGORIES: Array<{
  id: SymbolCategory;
  label: string;
  slug: string;
  description: string;
}> = [
  {
    id: 'switch',
    label: 'Switch Symbols',
    slug: 'electrical-switch-symbols',
    description:
      'One-way, two-way, intermediate, dimmer, key, PIR, pull-cord, timer, emergency stop, isolator and fan-isolator switch symbols to BS EN 60617.',
  },
  {
    id: 'socket',
    label: 'Socket Outlet Symbols',
    slug: 'electrical-socket-symbols',
    description:
      'Single 13A, double 13A, fused spur, switched fused spur, cooker, shaver, USB, data, telephone, TV, EV charger and outdoor IP66 socket symbols.',
  },
  {
    id: 'lighting',
    label: 'Lighting Symbols',
    slug: 'electrical-lighting-symbols',
    description:
      'Pendant, ceiling, downlight, wall, bulkhead, high bay, fluorescent, LED strip, emergency, twin-emergency, exit sign, outside light and PIR sensor symbols.',
  },
  {
    id: 'distribution',
    label: 'Distribution Board Symbols',
    slug: 'electrical-distribution-symbols',
    description:
      'Consumer unit, distribution board, sub-main, MCB, MCCB, RCD, RCBO, SPD, meter, contactor, main isolator, busbar chamber, changeover and generator changeover symbols.',
  },
  {
    id: 'safety',
    label: 'Safety + Fire + Security Symbols',
    slug: 'electrical-safety-symbols',
    description:
      'Smoke detector, heat detector, CO detector, fire alarm, sounder beacon, break-glass, emergency call point, CCTV, access control, door entry, motion detector, junction box symbols.',
  },
  {
    id: 'containment',
    label: 'Containment Symbols',
    slug: 'electrical-containment-symbols',
    description:
      'Conduit, trunking, busbar trunking, cable tray, cable tray drop, floor trunking, underfloor trunking, riser and floor box symbols.',
  },
  {
    id: 'equipment',
    label: 'Equipment Symbols',
    slug: 'electrical-equipment-symbols',
    description:
      'Motor, transformer, UPS, generator, fan, pump, AHU, lift, sub-main and panel board symbols for installation drawings.',
  },
  {
    id: 'mechanical',
    label: 'Mechanical + HVAC Symbols',
    slug: 'electrical-mechanical-symbols',
    description:
      'Boiler, water heater, panel heater, air conditioning, fan coil unit, towel rail, heater and hand dryer symbols where electrical supply is required.',
  },
  {
    id: 'renewables',
    label: 'Solar PV + Renewables Symbols',
    slug: 'electrical-renewables-symbols',
    description:
      'Solar panel, inverter, battery storage, generator and EV distribution symbols for prosumer installations (BS 7671 Section 712).',
  },
  {
    id: 'controls',
    label: 'Controls + BMS Symbols',
    slug: 'electrical-controls-symbols',
    description:
      'BMS controller, control panel, lighting control, sensor and humidity sensor symbols for smart building installations.',
  },
  {
    id: 'architectural',
    label: 'Architectural Symbols',
    slug: 'electrical-architectural-symbols',
    description:
      'Door (left/right/double), window, stairs and north arrow symbols used on electrical installation drawings to show building context.',
  },
];

export const SYMBOLS: ElectricalSymbol[] = [
  // -------- SWITCHES (13) --------
  {
    id: '1way-switch',
    name: 'One-Way Switch',
    category: 'switch',
    file: 'switches/1way.svg',
    altText: 'One-way switch electrical symbol BS EN 60617',
    description:
      'A single switch that breaks or makes the live conductor to a load from one position. The most common domestic switch — used for a single lighting circuit controlled from one location.',
    useContext: 'Most lighting circuits, fans, immersion heaters, fixed loads with single control.',
  },
  {
    id: '2way-switch',
    name: 'Two-Way Switch',
    category: 'switch',
    file: 'switches/2way.svg',
    altText: 'Two-way switch electrical symbol BS EN 60617',
    description:
      'A switch with two fixed contacts and one common, allowing control of the same load from two locations. Always used in pairs with a second 2-way switch (e.g. staircase, hall-and-landing).',
    useContext:
      'Staircases, halls with two entries, long corridors, bedrooms with both door and bedhead switches.',
  },
  {
    id: 'intermediate-switch',
    name: 'Intermediate Switch',
    category: 'switch',
    file: 'switches/intermediate.svg',
    altText: 'Intermediate switch electrical symbol BS EN 60617',
    description:
      'A four-terminal switch wired between two 2-way switches to give control from three or more locations. The strappers cross over inside the switch.',
    useContext:
      'Long corridors with three or more entries, large open-plan areas, stairs with mid-landing switch.',
  },
  {
    id: 'dimmer-switch',
    name: 'Dimmer Switch',
    category: 'switch',
    file: 'switches/dimmer.svg',
    altText: 'Dimmer switch electrical symbol BS EN 60617',
    description:
      'A switch with a variable resistor or electronic dimming module that controls light output. Specify type — leading-edge for incandescent, trailing-edge or LED-rated for modern LED drivers.',
    useContext:
      'Living areas, dining rooms, bedrooms; check the dimmer is compatible with the driver type.',
  },
  {
    id: 'double-switch',
    name: 'Double Switch (Two-Gang)',
    category: 'switch',
    file: 'switches/double-switch.svg',
    altText: 'Double two-gang switch electrical symbol BS EN 60617',
    description:
      'Two switches in one plate, each controlling a separate circuit. Often shown as a single symbol with two action lines or as two adjacent switch symbols on the drawing.',
    useContext:
      'Bathrooms (light + extractor fan), kitchens (main light + over-cooker light), living rooms (two zones).',
  },
  {
    id: 'pull-cord-switch',
    name: 'Pull-Cord Switch',
    category: 'switch',
    file: 'switches/pull-cord.svg',
    altText: 'Pull-cord switch electrical symbol BS EN 60617',
    description:
      'A ceiling-mounted switch operated by a hanging cord. Required in zone 1 and zone 2 of bathrooms where wall switches inside the room are not permitted under BS 7671 Section 701.',
    useContext:
      'Bathrooms (BS 7671 701.512.3 compliant), shower rooms, en-suites; also used for high-level switches.',
  },
  {
    id: 'fan-isolator',
    name: 'Fan Isolator (3-Pole)',
    category: 'switch',
    file: 'switches/fan-isolator.svg',
    altText: 'Fan isolator three-pole switch electrical symbol BS EN 60617',
    description:
      'A 3-pole isolating switch that disconnects live, neutral and switched-live to a bathroom extractor fan. Required for safe maintenance — must be accessible but outside the bathroom zones.',
    useContext:
      'Outside bathroom door, above the fan or in an adjacent room; needed on every extractor fan installation.',
  },
  {
    id: 'pir-switch',
    name: 'PIR Switch (Occupancy Sensor)',
    category: 'switch',
    file: 'switches/pir-switch.svg',
    altText: 'PIR occupancy sensor switch electrical symbol BS EN 60617',
    description:
      'A switch incorporating a passive infrared movement sensor. Turns the load on when motion is detected and off after a programmed time-out. Often combined with a manual override.',
    useContext:
      'Toilets, corridors, stairwells, loft hatches, security lighting; reduces energy use in low-occupancy areas.',
  },
  {
    id: 'timer-switch',
    name: 'Timer Switch',
    category: 'switch',
    file: 'switches/timer-switch.svg',
    altText: 'Timer switch electrical symbol BS EN 60617',
    description:
      'A switch that controls load duration — either a momentary push-to-time or a 24-hour/weekly programmable timer. Common for immersion heaters, towel rails, and outdoor lighting.',
    useContext:
      'Hot water tanks, towel rails, security lights, irrigation systems, signage lighting.',
  },
  {
    id: 'key-switch',
    name: 'Key Switch',
    category: 'switch',
    file: 'switches/key-switch.svg',
    altText: 'Key-operated switch electrical symbol BS EN 60617',
    description:
      'A switch operated only with a key — used where unauthorised operation must be prevented. Common in schools, retail, plant rooms and emergency override circuits.',
    useContext:
      'School halls, server rooms, retail shutters, emergency overrides, alarm bypass switches.',
  },
  {
    id: 'emergency-stop',
    name: 'Emergency Stop (E-Stop)',
    category: 'switch',
    file: 'switches/emergency-stop.svg',
    altText: 'Emergency stop button electrical symbol BS EN 60617',
    description:
      'A latching push-button that immediately disconnects supply to dangerous equipment. Mushroom head, red on yellow background. Must be reset deliberately — twist-release or key-reset.',
    useContext:
      'Workshops, kitchens (cooker isolation), production lines, lifts, swimming pool plant rooms.',
  },
  {
    id: 'isolator-switch',
    name: 'Isolator (Switch-Disconnector)',
    category: 'switch',
    file: 'switches/isolator.svg',
    altText: 'Isolator switch-disconnector electrical symbol BS EN 60617',
    description:
      'A switching device that fully isolates a circuit or item of equipment for maintenance. Must be lockable in the OFF position per BS 7671 Section 537. Different from a functional switch.',
    useContext:
      'Boilers, immersion heaters, EV chargers, solar PV DC isolators, sub-mains, plant equipment.',
  },
  {
    id: 'heater-switch',
    name: 'Heater Switch (45A DP)',
    category: 'switch',
    file: 'switches/heater-switch.svg',
    altText: 'Heater 45A double-pole switch electrical symbol BS EN 60617',
    description:
      'A 45A double-pole switch with a neon indicator, used for high-load fixed appliances. Switches both live and neutral. Often labelled with the load it controls.',
    useContext:
      'Electric showers, panel heaters, immersion tanks, towel rails — anything above 13A.',
  },

  // -------- SOCKETS (15) --------
  {
    id: 'single-13a-socket',
    name: 'Single 13A Socket Outlet',
    category: 'socket',
    file: 'sockets/single-13a.svg',
    altText: 'Single 13A switched socket outlet electrical symbol BS EN 60617',
    description:
      'A single 13A switched socket to BS 1363. The basic socket symbol — a semicircle with a line indicating switched. UK standard for general-purpose socket circuits.',
    useContext:
      'General-purpose outlets, behind appliances, individual radial circuits, kitchen specifics.',
  },
  {
    id: 'double-13a-socket',
    name: 'Double 13A Socket Outlet',
    category: 'socket',
    file: 'sockets/double-13a.svg',
    altText: 'Double 13A switched socket outlet electrical symbol BS EN 60617',
    description:
      'A twin 13A switched socket — two outlets on one back box. Drawn as two semicircles back-to-back. Standard outlet for living spaces, bedrooms and offices.',
    useContext:
      'Bedrooms (typically 2-4 doubles), living rooms, kitchens, offices — the workhorse outlet.',
  },
  {
    id: 'fused-spur',
    name: 'Fused Spur (Unswitched)',
    category: 'socket',
    file: 'sockets/fused-spur.svg',
    altText: 'Fused connection unit unswitched electrical symbol BS EN 60617',
    description:
      'A Fused Connection Unit (FCU) with internal fuse providing local protection for a fixed appliance. Unswitched version — no front rocker. Used where switching is not needed at the spur.',
    useContext:
      'Boilers, extractor fans, central heating pumps, doorbells, fixed wireless access points.',
  },
  {
    id: 'switched-fused-spur',
    name: 'Switched Fused Spur',
    category: 'socket',
    file: 'sockets/switched-fused-spur.svg',
    altText: 'Switched fused connection unit FCU electrical symbol BS EN 60617',
    description:
      'A Fused Connection Unit with a front-panel switch + neon indicator. Allows local isolation of the fixed appliance without resorting to the consumer unit. Most common FCU type.',
    useContext: 'Towel rails, immersion heaters, garden lighting, alarms, garage door operators.',
  },
  {
    id: 'unswitched-spur',
    name: 'Unswitched Spur (Non-Fused)',
    category: 'socket',
    file: 'sockets/unswitched-spur.svg',
    altText: 'Unswitched spur outlet electrical symbol BS EN 60617',
    description:
      'A connection outlet without integral fuse — relies on the upstream circuit fuse or breaker for protection. Often a flex outlet plate for permanently-wired flex-connected appliances.',
    useContext:
      'Flex outlets behind built-in ovens (separately fused), wall-hung TVs, fixed kitchen kit.',
  },
  {
    id: 'cooker-45a-socket',
    name: 'Cooker Outlet (45A)',
    category: 'socket',
    file: 'sockets/cooker-45a.svg',
    altText: 'Cooker 45A outlet electrical symbol BS EN 60617',
    description:
      'A 45A cooker connection point — usually a 45A DP switch with optional 13A socket above the worktop, feeding the cooker outlet plate behind the appliance.',
    useContext:
      'Electric range cookers, double ovens, hobs over 7.2 kW; supplied on its own radial circuit.',
  },
  {
    id: 'shaver-socket',
    name: 'Shaver Socket',
    category: 'socket',
    file: 'sockets/shaver.svg',
    altText: 'Shaver socket isolating transformer electrical symbol BS EN 60617',
    description:
      'A bathroom-compliant socket with built-in isolating transformer to BS EN 61558-2-5. Permitted in bathroom zone 2 because the transformer galvanically isolates the user from earth.',
    useContext:
      'Bathrooms, en-suites, hotel rooms — the only socket type permitted in bathroom zones.',
  },
  {
    id: 'usb-socket',
    name: 'USB Socket',
    category: 'socket',
    file: 'sockets/usb-socket.svg',
    altText: 'USB charging socket outlet electrical symbol BS EN 60617',
    description:
      'A 13A socket outlet with integrated USB-A or USB-C charging ports. Combines mains and low-voltage charging in one back box. Specify USB-C PD for modern devices.',
    useContext:
      'Bedside, desks, hotel rooms, kitchen islands — anywhere phones and tablets need charging.',
  },
  {
    id: 'data-socket',
    name: 'Data Socket (RJ45)',
    category: 'socket',
    file: 'sockets/data-socket.svg',
    altText: 'Data RJ45 ethernet socket electrical symbol BS EN 60617',
    description:
      'A structured cabling outlet to BS EN 50173. Cat 5e (1 Gb/s), Cat 6 (1 Gb/s longer reach), or Cat 6A (10 Gb/s). Terminated in an RJ45 module.',
    useContext:
      'Office desks, WiFi access points, CCTV camera locations, hard-wired smart home devices.',
  },
  {
    id: 'telephone-socket',
    name: 'Telephone Socket',
    category: 'socket',
    file: 'sockets/telephone.svg',
    altText: 'Telephone master socket electrical symbol BS EN 60617',
    description:
      'A telephone master or extension socket. UK master socket has BT engineer test socket; extensions are wired to the master. Increasingly replaced by RJ45 data sockets.',
    useContext: 'Legacy phone wiring, fax machines, alarm phone diallers, FTTC modems.',
  },
  {
    id: 'tv-aerial-socket',
    name: 'TV Aerial Socket',
    category: 'socket',
    file: 'sockets/tv-aerial.svg',
    altText: 'TV aerial coaxial socket electrical symbol BS EN 60617',
    description:
      'A coaxial outlet for TV aerial, FM/DAB radio or satellite. Multi-output back boxes can combine TV + FM + satellite in one face plate.',
    useContext:
      'Living rooms, bedrooms, kitchens; satellite outlets need separate F-type connectors.',
  },
  {
    id: 'comms-cabinet',
    name: 'Comms Cabinet Outlet',
    category: 'socket',
    file: 'sockets/comms-cabinet.svg',
    altText: 'Communications cabinet rack electrical symbol BS EN 60617',
    description:
      'A communications/networking cabinet — typically a 12U or 18U wall-mounted rack housing the patch panel, network switch, router and structured-cabling termination.',
    useContext:
      'Loft, plant room, under-stairs; central termination point for all data sockets in a building.',
  },
  {
    id: 'ev-charger-socket',
    name: 'EV Charger Outlet',
    category: 'socket',
    file: 'sockets/ev-charger.svg',
    altText: 'EV charger outlet point electrical symbol BS EN 60617',
    description:
      'An electric vehicle charge point to BS 7671 Section 722. Typically 7.2 kW single-phase or 22 kW three-phase, with Type 2 (Mennekes) socket or tethered lead.',
    useContext:
      'Driveways, car parks, fleet depots; needs dedicated circuit + Type A RCD or RDC-DD per 722.531.',
  },
  {
    id: 'outdoor-ip66-socket',
    name: 'Outdoor IP66 Socket',
    category: 'socket',
    file: 'sockets/outdoor-ip66.svg',
    altText: 'Outdoor weatherproof IP66 socket electrical symbol BS EN 60617',
    description:
      'A weatherproof socket to IP66 ingress protection. Hinged cover seals against dust and powerful water jets. Must be RCD protected per BS 7671.',
    useContext:
      'Gardens, sheds, outdoor power tools, Christmas lights, pond pumps, EV charging from a standard socket.',
  },
  {
    id: 'floor-socket',
    name: 'Floor Socket (Floor Box)',
    category: 'socket',
    file: 'sockets/floor-socket.svg',
    altText: 'Floor socket floor box outlet electrical symbol BS EN 60617',
    description:
      'A flush-mounted socket installed in the floor — typically a floor box with two 13A sockets and data outlets. Used in open-plan offices where wall outlets are too distant.',
    useContext: 'Open-plan offices, conference rooms, retail floor displays, exhibition halls.',
  },

  // -------- LIGHTING (13) --------
  {
    id: 'pendant-light',
    name: 'Pendant Light',
    category: 'lighting',
    file: 'lighting/pendant.svg',
    altText: 'Pendant light fitting electrical symbol BS EN 60617',
    description:
      'A ceiling-mounted light suspended on a flex or chain from a rose. The most common domestic light fitting — drawn as a circle with a cross.',
    useContext:
      'Living rooms, bedrooms, dining rooms, hallways; the default UK domestic light point.',
  },
  {
    id: 'ceiling-light',
    name: 'Ceiling Light (Flush)',
    category: 'lighting',
    file: 'lighting/ceiling-light.svg',
    altText: 'Flush ceiling light electrical symbol BS EN 60617',
    description:
      'A flush-mounted ceiling light — the fitting sits directly against the ceiling rather than suspended. Common in kitchens, bathrooms and low-ceiling rooms.',
    useContext: 'Kitchens, bathrooms, hallways with low ceilings, loft conversions.',
  },
  {
    id: 'downlight',
    name: 'Downlight (Recessed)',
    category: 'lighting',
    file: 'lighting/downlight.svg',
    altText: 'Recessed downlight electrical symbol BS EN 60617',
    description:
      'A recessed downlight set into the ceiling void. Fire-rated downlights are required where they breach a fire-rated ceiling (e.g. flats, loft conversions, above habitable rooms).',
    useContext:
      'Kitchens, bathrooms (zone-rated), corridors, retail; the modern UK lighting default.',
  },
  {
    id: 'wall-light',
    name: 'Wall Light',
    category: 'lighting',
    file: 'lighting/wall-light.svg',
    altText: 'Wall mounted light fitting electrical symbol BS EN 60617',
    description:
      'A wall-mounted light fitting. Symbol drawn against the wall line of the plan. Often used with dimming or two-way switching for ambience.',
    useContext: 'Bedrooms (bedside), living rooms, hallways, staircases, restaurants.',
  },
  {
    id: 'bulkhead',
    name: 'Bulkhead Light',
    category: 'lighting',
    file: 'lighting/bulkhead.svg',
    altText: 'Bulkhead light fitting electrical symbol BS EN 60617',
    description:
      'A robust enclosed light fitting designed for outdoor or utility use. Typically IP65 with a polycarbonate diffuser. Common with integrated PIR sensor for security.',
    useContext: 'External walls, garages, sheds, plant rooms, communal stairwells.',
  },
  {
    id: 'outside-light',
    name: 'Outside Light',
    category: 'lighting',
    file: 'lighting/outside-light.svg',
    altText: 'Outside light external fitting electrical symbol BS EN 60617',
    description:
      'An external light fitting, typically IP44 or higher. Includes wall lights, post lights, ground-mounted spike spots, soffit downlights and porch lights.',
    useContext:
      'Front and rear of houses, gardens, pathways, garages; usually with PIR or photocell control.',
  },
  {
    id: 'pir-sensor',
    name: 'PIR Sensor (Lighting)',
    category: 'lighting',
    file: 'lighting/pir-sensor.svg',
    altText: 'PIR motion sensor for lighting control electrical symbol BS EN 60617',
    description:
      'A passive infrared sensor that detects movement and switches connected lights on. Separate from a PIR switch — the sensor is the input to a relay or control module.',
    useContext:
      'Security lighting, corridors with extended throw, large rooms with multiple zones.',
  },
  {
    id: 'emergency-light',
    name: 'Emergency Light',
    category: 'lighting',
    file: 'lighting/emergency-light.svg',
    altText: 'Emergency light non-maintained electrical symbol BS EN 60617',
    description:
      'A non-maintained emergency light to BS 5266. Off in normal use; switches on automatically when the mains supply fails. Tested monthly and annually per BS 5266-1.',
    useContext: 'Escape routes, stairwells, plant rooms, kitchens, places of assembly.',
  },
  {
    id: 'twin-emergency',
    name: 'Twin Emergency Spot',
    category: 'lighting',
    file: 'lighting/twin-emergency.svg',
    altText: 'Twin emergency spotlight electrical symbol BS EN 60617',
    description:
      'A self-contained emergency luminaire with two adjustable spotlights and an internal battery. Provides high-output emergency illumination of escape routes on mains failure.',
    useContext: 'Open-plan offices, retail floors, plant rooms, warehouses, large halls.',
  },
  {
    id: 'exit-sign',
    name: 'Exit Sign',
    category: 'lighting',
    file: 'lighting/exit-sign.svg',
    altText: 'Emergency exit sign electrical symbol BS EN 60617',
    description:
      'A maintained or non-maintained emergency exit sign to BS EN 1838. Indicates the direction of escape; runs on battery during mains failure for at least 3 hours per BS 5266.',
    useContext: 'Above doors on escape routes, change-of-direction points, top of staircases.',
  },
  {
    id: 'fluorescent',
    name: 'Fluorescent Fitting (Batten)',
    category: 'lighting',
    file: 'lighting/fluorescent.svg',
    altText: 'Fluorescent batten light fitting electrical symbol BS EN 60617',
    description:
      'A linear fluorescent or LED-batten fitting. Most modern installations now use LED battens — same symbol applies. Lamp length specified separately (typically 1.2 m or 1.5 m).',
    useContext:
      'Garages, plant rooms, workshops, kitchens, commercial corridors, retail back-of-house.',
  },
  {
    id: 'led-strip',
    name: 'LED Strip Lighting',
    category: 'lighting',
    file: 'lighting/led-strip.svg',
    altText: 'LED strip light electrical symbol BS EN 60617',
    description:
      'A linear LED tape or strip light. Requires a constant-voltage driver (usually 12 V or 24 V DC). Often dimmable via the driver or via 0-10V / DALI control.',
    useContext:
      'Under-cabinet kitchens, cove lighting, stairs, bathroom mirrors, retail display shelves.',
  },
  {
    id: 'high-bay',
    name: 'High Bay Light',
    category: 'lighting',
    file: 'lighting/high-bay.svg',
    altText: 'High bay industrial light fitting electrical symbol BS EN 60617',
    description:
      'A high-output LED or HID light fitting designed for high-ceiling industrial spaces (typically 6-15 m mounting height). Wide-beam or narrow-beam reflectors depending on layout.',
    useContext: 'Warehouses, factories, gymnasiums, indoor sports halls, large retail spaces.',
  },

  // -------- DISTRIBUTION (14) --------
  {
    id: 'consumer-unit',
    name: 'Consumer Unit',
    category: 'distribution',
    file: 'distribution/consumer-unit.svg',
    altText: 'Consumer unit fuseboard electrical symbol BS EN 60617',
    description:
      'A domestic consumer unit (fuseboard) to BS EN 61439-3. Houses the main switch, RCD/RCBO/MCB protective devices, and (since 2018) SPD and AFDD where required.',
    useContext:
      'Domestic origin of the installation — typically meter cupboard, under-stairs, garage or hallway.',
  },
  {
    id: 'distribution-board',
    name: 'Distribution Board',
    category: 'distribution',
    file: 'distribution/distribution-board.svg',
    altText: 'Commercial distribution board electrical symbol BS EN 60617',
    description:
      'A three-phase or single-phase distribution board to BS EN 61439-3 (commercial). Holds MCBs, RCBOs and MCCBs serving final circuits in commercial and industrial buildings.',
    useContext:
      'Commercial buildings, offices, schools, retail; one per floor or department typically.',
  },
  {
    id: 'sub-main-board',
    name: 'Sub-Main Board',
    category: 'distribution',
    file: 'distribution/sub-main-board.svg',
    altText: 'Sub-main distribution board electrical symbol BS EN 60617',
    description:
      'A distribution board fed by a sub-main from the main switchboard. Sub-divides the installation into manageable zones; reduces voltage drop on long runs.',
    useContext: 'Large buildings, multi-tenant offices, plant rooms, lift motor rooms, sub-zones.',
  },
  {
    id: 'mcb',
    name: 'MCB (Miniature Circuit Breaker)',
    category: 'distribution',
    file: 'distribution/mcb.svg',
    altText: 'MCB miniature circuit breaker electrical symbol BS EN 60617',
    description:
      'A Miniature Circuit Breaker to BS EN 60898. Protects against overload and short-circuit fault current. Types B, C and D differentiate by magnetic trip characteristic.',
    useContext:
      'Every domestic + commercial final circuit; standard protection device on distribution boards.',
  },
  {
    id: 'mccb',
    name: 'MCCB (Moulded Case CB)',
    category: 'distribution',
    file: 'distribution/mccb.svg',
    altText: 'MCCB moulded case circuit breaker electrical symbol BS EN 60617',
    description:
      'A Moulded Case Circuit Breaker to BS EN 60947-2. Higher current ratings (typically 100-1600 A) and higher breaking capacity than MCBs. Used as main incomers or for large feeders.',
    useContext:
      'Main switchgear, sub-main feeders, large motor circuits, three-phase distribution.',
  },
  {
    id: 'rcd',
    name: 'RCD (Residual Current Device)',
    category: 'distribution',
    file: 'distribution/rcd.svg',
    altText: 'RCD residual current device electrical symbol BS EN 60617',
    description:
      'A Residual Current Device to BS EN 61008. Detects imbalance between live and neutral (earth-fault leakage) and trips. 30 mA RCDs provide additional protection against electric shock.',
    useContext:
      'Bathrooms, kitchens, outdoor sockets, EV chargers — anywhere BS 7671 requires additional protection.',
  },
  {
    id: 'rcbo',
    name: 'RCBO (RCD + MCB Combined)',
    category: 'distribution',
    file: 'distribution/rcbo.svg',
    altText: 'RCBO residual current breaker with overcurrent electrical symbol BS EN 60617',
    description:
      'A Residual Current Breaker with Overcurrent protection to BS EN 61009. Combines RCD + MCB in one device. Each circuit has individual earth fault and overload protection.',
    useContext:
      'Modern consumer units — preferred to split-load RCD arrangements; one trip = one circuit affected only.',
  },
  {
    id: 'spd',
    name: 'SPD (Surge Protection Device)',
    category: 'distribution',
    file: 'distribution/spd.svg',
    altText: 'SPD surge protection device electrical symbol BS EN 60617',
    description:
      'A Surge Protective Device to BS EN 61643-11. Type 1 (lightning current), Type 2 (transient overvoltage), Type 3 (point of use). BS 7671 443.4 risk assessment usually requires Type 2 at origin.',
    useContext:
      'New installations + rewires — Type 2 at consumer unit origin; Type 1 where lightning protection is fitted.',
  },
  {
    id: 'contactor',
    name: 'Contactor',
    category: 'distribution',
    file: 'distribution/contactor.svg',
    altText: 'Electrical contactor electrical symbol BS EN 60617',
    description:
      'An electromagnetically-operated switch for high-current loads. Coil energised = contacts close. Used to control motors, heating, lighting circuits and timed loads remotely.',
    useContext:
      'Immersion heaters with off-peak timer, motor starters, large lighting banks, HVAC plant.',
  },
  {
    id: 'main-isolator',
    name: 'Main Switch / Isolator',
    category: 'distribution',
    file: 'distribution/main-isolator.svg',
    altText: 'Main switch isolator electrical symbol BS EN 60617',
    description:
      'A main switch-disconnector at the origin of the installation. Disconnects all live conductors (including neutral on TT/IT) and must be lockable in OFF position.',
    useContext:
      'Origin of every installation — domestic consumer unit, commercial main switchboard.',
  },
  {
    id: 'meter',
    name: 'Electricity Meter',
    category: 'distribution',
    file: 'distribution/meter.svg',
    altText: 'Electricity meter electrical symbol BS EN 60617',
    description:
      'The utility electricity meter — point of supply, owned by the meter operator. Modern smart meters communicate consumption to the supplier automatically.',
    useContext:
      'Meter cupboard, garage external wall, riser cupboard; the boundary of utility responsibility.',
  },
  {
    id: 'changeover-switch',
    name: 'Changeover Switch',
    category: 'distribution',
    file: 'distribution/changeover-switch.svg',
    altText: 'Changeover switch transfer switch electrical symbol BS EN 60617',
    description:
      'A switch that transfers a load between two sources (typically mains and generator). Manual or automatic (ATS). Always break-before-make to prevent backfeeding the grid.',
    useContext: 'Standby generators, UPS bypass, dual-supply critical loads, farms, remote homes.',
  },
  {
    id: 'generator-changeover',
    name: 'Generator Changeover (ATS)',
    category: 'distribution',
    file: 'distribution/generator-changeover.svg',
    altText: 'Generator automatic transfer switch ATS electrical symbol BS EN 60617',
    description:
      'An Automatic Transfer Switch that detects mains failure and switches to a standby generator without manual intervention. Synchronised return-to-mains when supply restored.',
    useContext: 'Hospitals, data centres, telecoms, agricultural sites with standby plant.',
  },
  {
    id: 'busbar-chamber',
    name: 'Busbar Chamber',
    category: 'distribution',
    file: 'distribution/busbar-chamber.svg',
    altText: 'Busbar chamber electrical symbol BS EN 60617',
    description:
      'A metal enclosure containing busbars to interconnect multiple sub-main cables — typically at the main switchboard. Allows tap-offs to feed distribution boards without joint boxes.',
    useContext: 'Main switchboards, riser shafts, multi-tenant feeder distribution.',
  },

  // -------- SAFETY / FIRE / SECURITY (17) --------
  {
    id: 'smoke-detector',
    name: 'Smoke Detector',
    category: 'safety',
    file: 'safety/smoke-detector.svg',
    altText: 'Smoke detector electrical symbol BS EN 60617',
    description:
      'An optical or ionisation smoke detector to BS EN 14604 (single-station, domestic) or BS 5839-1 (fire alarm system). Interlinked types signal one another via wire or RF.',
    useContext:
      'Every level of a domestic property, escape routes, places of assembly per regulations.',
  },
  {
    id: 'heat-detector',
    name: 'Heat Detector',
    category: 'safety',
    file: 'safety/heat-detector.svg',
    altText: 'Heat detector electrical symbol BS EN 60617',
    description:
      'A fire detector that triggers on a fixed temperature (typically 58°C) or rate-of-rise. Used where smoke detectors would false-alarm (kitchens, garages, dusty areas).',
    useContext:
      'Kitchens, garages, lofts, plant rooms, smoking areas; never in dwellings without an SD elsewhere.',
  },
  {
    id: 'co-detector',
    name: 'CO Detector',
    category: 'safety',
    file: 'safety/co-detector.svg',
    altText: 'Carbon monoxide CO detector electrical symbol BS EN 60617',
    description:
      'A carbon monoxide detector to BS EN 50291. Required in rooms with combustion appliances under the Smoke and CO Alarm Regs 2022 (England) and similar in Wales/Scotland.',
    useContext:
      'Living rooms with gas fires, bedrooms above garages, rooms with solid-fuel stoves or boilers.',
  },
  {
    id: 'fire-alarm',
    name: 'Fire Alarm Sounder',
    category: 'safety',
    file: 'safety/fire-alarm.svg',
    altText: 'Fire alarm sounder electrical symbol BS EN 60617',
    description:
      'A fire alarm sounder to BS EN 54-3. Produces minimum 65 dB at the bedhead per BS 5839-1, with the fire-alarm tone defined in BS 5839 Annex E.',
    useContext: 'Commercial premises, HMOs, places of assembly; covered by fire risk assessment.',
  },
  {
    id: 'sounder-beacon',
    name: 'Sounder + Beacon',
    category: 'safety',
    file: 'safety/sounder-beacon.svg',
    altText: 'Combined sounder and beacon fire alarm electrical symbol BS EN 60617',
    description:
      'A combined audible + visual alarm device to BS EN 54-23. The visual indicator is required for the hearing impaired and in high-noise environments where audible signals alone may not be heard.',
    useContext: 'WCs, plant rooms, factories, schools, disabled refuge areas, swimming pools.',
  },
  {
    id: 'break-glass',
    name: 'Manual Call Point (Break Glass)',
    category: 'safety',
    file: 'safety/break-glass.svg',
    altText: 'Manual call point break glass fire alarm electrical symbol BS EN 60617',
    description:
      'A manual call point to BS EN 54-11. The break-glass/press-glass element used to manually trigger the fire alarm system. Sited near exits and on escape routes.',
    useContext: 'Every fire-alarm system; on escape routes, at exits, at landing levels.',
  },
  {
    id: 'emergency-call-point',
    name: 'Emergency Call Point (Disabled WC)',
    category: 'safety',
    file: 'safety/emergency-call-point.svg',
    altText: 'Emergency call point disabled WC alarm electrical symbol BS EN 60617',
    description:
      'A disabled-toilet emergency assistance alarm to BS 8300. Pull-cord activator + reset button + indicator outside the WC. Required under Building Regs Part M.',
    useContext: 'Accessible WCs in commercial buildings, hospitality, public buildings.',
  },
  {
    id: 'disabled-alarm',
    name: 'Disabled Refuge Alarm',
    category: 'safety',
    file: 'safety/disabled-alarm.svg',
    altText: 'Disabled refuge alarm communication point electrical symbol BS EN 60617',
    description:
      'A two-way emergency voice communication point at a disabled refuge to BS 5839-9. Allows people awaiting evacuation to communicate with the main control room.',
    useContext: 'Stairwells in multi-storey commercial buildings, evacuation lift lobbies.',
  },
  {
    id: 'motion-detector',
    name: 'Motion Detector (Security)',
    category: 'safety',
    file: 'safety/motion-detector.svg',
    altText: 'Motion detector intruder alarm electrical symbol BS EN 60617',
    description:
      'A PIR or microwave motion detector for an intruder alarm system to BS EN 50131. Typically wall-mounted at 2.0-2.4 m with coverage of 12 m × 12 m for standard PIR.',
    useContext: 'Hallways, large rooms, garages; works with door contacts to form a complete zone.',
  },
  {
    id: 'cctv',
    name: 'CCTV Camera',
    category: 'safety',
    file: 'safety/cctv.svg',
    altText: 'CCTV security camera electrical symbol BS EN 60617',
    description:
      'A CCTV camera — typically IP (PoE-powered, RJ45) or analogue HD. Modern installations are IP cameras over Cat 6 with PoE+ for pan-tilt-zoom models.',
    useContext:
      'Building entrances, car parks, retail floors, secure perimeters; data + power on one Cat 6 cable.',
  },
  {
    id: 'access-control',
    name: 'Access Control Reader',
    category: 'safety',
    file: 'safety/access-control.svg',
    altText: 'Access control card reader electrical symbol BS EN 60617',
    description:
      'A proximity card, fob or biometric reader controlling a maglock or electric strike. Networked to a central controller. Often integrated with the fire alarm for auto-release on alarm.',
    useContext:
      'Office entrances, server rooms, restricted-access plant rooms, multi-tenant lobbies.',
  },
  {
    id: 'door-entry',
    name: 'Door Entry Panel',
    category: 'safety',
    file: 'safety/door-entry.svg',
    altText: 'Door entry intercom panel electrical symbol BS EN 60617',
    description:
      'An audio or video door entry panel at a main entrance. Connects to handset stations inside the building. Modern systems are IP-based over Cat 6.',
    useContext: 'Flats, apartments, gated developments, offices with controlled entry.',
  },
  {
    id: 'door-release',
    name: 'Door Release Button',
    category: 'safety',
    file: 'safety/door-release.svg',
    altText: 'Door release button green exit button electrical symbol BS EN 60617',
    description:
      'A green push-button that releases an electrically-locked door from inside (the egress side). Required where access control restricts movement out of a space.',
    useContext: 'Inside doors with maglocks/strikes, server rooms, secure office areas.',
  },
  {
    id: 'bell',
    name: 'Bell / Door Chime',
    category: 'safety',
    file: 'safety/bell.svg',
    altText: 'Bell door chime electrical symbol BS EN 60617',
    description:
      'A domestic bell or chime triggered by a push-button at the door. Often supplied via a 12 V transformer in modern wired systems, or battery for wireless.',
    useContext: 'Front door, back door, tradesperson entrance; symbol used on domestic drawings.',
  },
  {
    id: 'extractor-fan',
    name: 'Extractor Fan',
    category: 'safety',
    file: 'safety/extractor-fan.svg',
    altText: 'Extractor fan electrical symbol BS EN 60617',
    description:
      'A wall- or ceiling-mounted extract fan. Bathroom fans typically interlocked with the light circuit and overrun timer; kitchen fans on a separate switch.',
    useContext:
      'Bathrooms, kitchens, WCs, utility rooms; needs 3-pole isolator for safe maintenance.',
  },
  {
    id: 'thermostat',
    name: 'Thermostat',
    category: 'safety',
    file: 'safety/thermostat.svg',
    altText: 'Wall thermostat electrical symbol BS EN 60617',
    description:
      'A room thermostat controlling heating. Mechanical, electronic or smart (Wi-Fi). Wired thermostats need a 230 V supply or a low-voltage transformer.',
    useContext: 'Living room or hallway typically; one zone per heating loop.',
  },
  {
    id: 'junction-box',
    name: 'Junction Box',
    category: 'safety',
    file: 'safety/junction-box.svg',
    altText: 'Junction box wiring electrical symbol BS EN 60617',
    description:
      'A wiring junction box where cables are joined. Must be accessible per BS 7671 526.3 unless maintenance-free (MF) type. Modern MF boxes use spring terminals.',
    useContext: 'Loft cables, behind sockets, lighting circuits, above accessible ceilings.',
  },

  // -------- CONTAINMENT (9) --------
  {
    id: 'conduit',
    name: 'Conduit',
    category: 'containment',
    file: 'containment/conduit.svg',
    altText: 'Electrical conduit containment symbol BS EN 60617',
    description:
      'A round metal or PVC conduit containing cables. Sizes 16, 20, 25, 32 mm OD per BS EN 61386. Symbol drawn as a single line, often labelled with size and number of cables.',
    useContext:
      'Surface or buried; commercial wiring, plant rooms, industrial, where cables need protection.',
  },
  {
    id: 'trunking',
    name: 'Trunking',
    category: 'containment',
    file: 'containment/trunking.svg',
    altText: 'Cable trunking containment symbol BS EN 60617',
    description:
      'A rectangular cable enclosure with removable lid. PVC, metal or compartmented. Higher fill capacity than conduit; allows easy cable additions without rewiring.',
    useContext:
      'Offices, commercial corridors, server rooms; mini-trunking for surface-wired domestic installations.',
  },
  {
    id: 'busbar-trunking',
    name: 'Busbar Trunking',
    category: 'containment',
    file: 'containment/busbar-trunking.svg',
    altText: 'Busbar trunking distribution containment symbol BS EN 60617',
    description:
      'A factory-built busbar system to BS EN 61439-6. Tap-off boxes connect distribution boards or large loads along the run. High current capacity, low impedance.',
    useContext:
      'High-rise risers, factories, large commercial buildings — replaces multiple sub-main cables.',
  },
  {
    id: 'cable-tray',
    name: 'Cable Tray',
    category: 'containment',
    file: 'containment/cable-tray.svg',
    altText: 'Cable tray containment symbol BS EN 60617',
    description:
      'A perforated metal tray supporting cables along its length. Open-top, allowing heat dissipation. Common sizes 50-600 mm wide.',
    useContext:
      'Plant rooms, service corridors, ceiling voids in commercial; supports SWA and multi-core cables.',
  },
  {
    id: 'cable-tray-drop',
    name: 'Cable Tray Drop',
    category: 'containment',
    file: 'containment/cable-tray-drop.svg',
    altText: 'Cable tray drop riser containment symbol BS EN 60617',
    description:
      'A vertical section of cable tray dropping from a horizontal run to floor level or equipment. Drawn as a tray with directional indication of descent.',
    useContext:
      'Drops from ceiling-mounted tray to equipment, riser corners, multi-storey transitions.',
  },
  {
    id: 'floor-trunking',
    name: 'Floor Trunking',
    category: 'containment',
    file: 'containment/floor-trunking.svg',
    altText: 'Floor trunking surface containment symbol BS EN 60617',
    description:
      'Trunking installed on the floor surface, typically with a low-profile ramp section. Used where furniture layouts demand power and data at floor level.',
    useContext: 'Open-plan offices with fixed desk grids, exhibition halls, retail floor displays.',
  },
  {
    id: 'underfloor-trunking',
    name: 'Underfloor Trunking',
    category: 'containment',
    file: 'containment/underfloor-trunking.svg',
    altText: 'Underfloor trunking buried containment symbol BS EN 60617',
    description:
      'Trunking cast into the floor screed with periodic outlet boxes for floor sockets. Allows discrete power and data delivery without surface-mounted runs.',
    useContext:
      'Open-plan offices, conference rooms, retail concourses — installed at the screed pour.',
  },
  {
    id: 'riser',
    name: 'Vertical Riser',
    category: 'containment',
    file: 'containment/riser.svg',
    altText: 'Vertical electrical riser containment symbol BS EN 60617',
    description:
      'A vertical shaft containing sub-main cables, busbar trunking, and other services running between floors. Fire-stopped at every floor penetration.',
    useContext: 'Multi-storey commercial buildings, hotels, hospitals, residential blocks.',
  },
  {
    id: 'floor-box-multi',
    name: 'Floor Box (Multi-Service)',
    category: 'containment',
    file: 'containment/floor-box-multi.svg',
    altText: 'Floor box multi-service outlet electrical symbol BS EN 60617',
    description:
      'A flush-mounted floor outlet housing two 13A sockets, one or two RJ45 data outlets, and optional audio/video connections. Hinged lid keeps the floor flush.',
    useContext:
      'Open-plan offices, conference rooms, restaurant floors — discreet desk-level access.',
  },

  // -------- EQUIPMENT (9) --------
  {
    id: 'motor',
    name: 'Electric Motor',
    category: 'equipment',
    file: 'equipment/motor.svg',
    altText: 'Electric motor electrical symbol BS EN 60617',
    description:
      'An electric motor — typically three-phase induction. Symbol shows a circle with "M" inside. Specify phase, voltage, kW and starter type (DOL, star-delta, soft starter, VFD).',
    useContext: 'HVAC fans, pumps, lift drives, escalators, industrial machinery.',
  },
  {
    id: 'transformer',
    name: 'Transformer',
    category: 'equipment',
    file: 'equipment/transformer.svg',
    altText: 'Electrical transformer step-down electrical symbol BS EN 60617',
    description:
      'A two-winding transformer — symbol shows two coupled coils. Step-up or step-down depending on turns ratio. Used for LV-LV (e.g. 230-12V) or HV-LV (e.g. 11kV-415V).',
    useContext:
      'Doorbells, garden lighting (low voltage), 11 kV-415 V substations, isolating transformers.',
  },
  {
    id: 'ups',
    name: 'UPS (Uninterruptible Power Supply)',
    category: 'equipment',
    file: 'equipment/ups.svg',
    altText: 'UPS uninterruptible power supply electrical symbol BS EN 60617',
    description:
      'An online or line-interactive UPS. Maintains supply to critical loads during mains failure (typically 10-30 minutes) until generator starts or supply restored.',
    useContext: 'Data centres, server rooms, hospital ITU, telephone exchanges, security systems.',
  },
  {
    id: 'sub-main',
    name: 'Sub-Main',
    category: 'equipment',
    file: 'equipment/sub-main.svg',
    altText: 'Sub-main supply cable electrical symbol BS EN 60617',
    description:
      'A sub-main supply — a cable feeding a distribution board from a higher-level board. Sized to handle the maximum demand of all downstream final circuits.',
    useContext:
      'Multi-storey commercial, large dwellings, outbuildings, garages; sized for voltage drop on long runs.',
  },
  {
    id: 'fan',
    name: 'Industrial Fan',
    category: 'equipment',
    file: 'equipment/fan.svg',
    altText: 'Industrial extraction fan electrical symbol BS EN 60617',
    description:
      'A large-volume fan — axial, centrifugal or in-line. Drawn on plans where the electrical supply termination is shown. Often supplied via local isolator.',
    useContext:
      'Mechanical extract, HVAC plant rooms, smoke ventilation, industrial process exhaust.',
  },
  {
    id: 'pump',
    name: 'Pump',
    category: 'equipment',
    file: 'equipment/pump.svg',
    altText: 'Electrical pump motor electrical symbol BS EN 60617',
    description:
      'A pump driven by an electric motor — water, heating circulator, condensate, sewage. Symbol typically shows pump body with electrical termination point.',
    useContext:
      'Boiler plant, water boosting, pond / pool plant, lift hydraulics, fire-fighting wet risers.',
  },
  {
    id: 'ahu',
    name: 'Air Handling Unit (AHU)',
    category: 'equipment',
    file: 'equipment/ahu.svg',
    altText: 'Air handling unit AHU electrical symbol BS EN 60617',
    description:
      'An air handling unit containing fans, filters, coils and dampers. Electrically intensive — fan motors, heating/cooling coil pumps, controls all need supply.',
    useContext: 'Plant rooms serving HVAC for commercial buildings, hospitals, retail, hotels.',
  },
  {
    id: 'lift',
    name: 'Lift / Elevator',
    category: 'equipment',
    file: 'equipment/lift.svg',
    altText: 'Lift elevator electrical symbol BS EN 60617',
    description:
      'A lift drive — supplied from a dedicated three-phase circuit with its own isolation per BS 7671 Section 530. Lift motor rooms require lockable disconnection.',
    useContext:
      'Multi-storey commercial + residential; needs locked main isolator inside motor room.',
  },
  {
    id: 'panel-board',
    name: 'Panel Board (Motor Control Centre)',
    category: 'equipment',
    file: 'equipment/panel-board.svg',
    altText: 'Motor control centre MCC panel board electrical symbol BS EN 60617',
    description:
      'A motor control centre or control panel housing multiple motor starters, contactors, and overload protection. PLC-controlled in modern installations.',
    useContext:
      'Industrial plant rooms, water treatment, factory production lines, large HVAC plant.',
  },

  // -------- MECHANICAL (8) --------
  {
    id: 'boiler',
    name: 'Boiler',
    category: 'mechanical',
    file: 'mechanical/boiler.svg',
    altText: 'Gas oil boiler electrical supply symbol BS EN 60617',
    description:
      'A heating boiler — gas, oil, or electric. Even gas/oil boilers need a 230 V supply for pumps, controls, and ignition. Supplied via switched fused spur.',
    useContext:
      'Kitchens, utility rooms, garages, lofts; needs local 3A fused isolation per BS 7671.',
  },
  {
    id: 'water-heater',
    name: 'Water Heater (Immersion)',
    category: 'mechanical',
    file: 'mechanical/water-heater.svg',
    altText: 'Electric water heater immersion electrical symbol BS EN 60617',
    description:
      'An electric water heater — usually a 3 kW immersion in a hot water cylinder, or instantaneous undersink/handwash unit. Supplied from a dedicated radial.',
    useContext:
      'Hot water cylinders (in airing cupboard), under sinks, point-of-use in remote washrooms.',
  },
  {
    id: 'panel-heater',
    name: 'Panel Heater',
    category: 'mechanical',
    file: 'mechanical/panel-heater.svg',
    altText: 'Electric panel heater wall heater electrical symbol BS EN 60617',
    description:
      'A wall-mounted electric panel heater — convection, fan-assisted, or radiant. Sizes typically 0.5-2.5 kW. Often timer/thermostat controlled.',
    useContext:
      'Offices, holiday lets, supplementary heating, garages — wherever wet heating is impractical.',
  },
  {
    id: 'air-conditioning',
    name: 'Air Conditioning Unit',
    category: 'mechanical',
    file: 'mechanical/air-conditioning.svg',
    altText: 'Air conditioning unit split system electrical symbol BS EN 60617',
    description:
      'An air conditioning unit — split system or VRV/VRF. Indoor unit + outdoor condenser. Electrical supply usually fed to the outdoor unit which powers the indoor head.',
    useContext:
      'Server rooms, offices, retail; needs F-gas certified installer; isolator local to outdoor unit.',
  },
  {
    id: 'fan-coil-unit',
    name: 'Fan Coil Unit (FCU)',
    category: 'mechanical',
    file: 'mechanical/fan-coil-unit.svg',
    altText: 'Fan coil unit FCU HVAC electrical symbol BS EN 60617',
    description:
      'A fan coil unit — local fan + heating/cooling coil supplied from a central plant. Provides zone-level temperature control in commercial HVAC.',
    useContext:
      'Offices, hotels, hospitals; typically ceiling-mounted with low-voltage controls + 230 V fan supply.',
  },
  {
    id: 'towel-rail',
    name: 'Electric Towel Rail',
    category: 'mechanical',
    file: 'mechanical/towel-rail.svg',
    altText: 'Electric towel rail bathroom electrical symbol BS EN 60617',
    description:
      'A heated towel rail with an integral element. Typically 100-600 W. Supplied via switched fused spur outside the bathroom; must be RCD-protected.',
    useContext:
      'Bathrooms, en-suites, utility rooms; FCU outside the bathroom or zone 3 with IPX4.',
  },
  {
    id: 'heater',
    name: 'Heater (General)',
    category: 'mechanical',
    file: 'mechanical/heater.svg',
    altText: 'Electric heater electrical symbol BS EN 60617',
    description:
      'A general-purpose electric heater symbol — covers radiant, convection, fan and oil-filled portable heaters. Supplied via switched fused spur or socket.',
    useContext: 'Domestic supplementary heating, offices, workshops, garages.',
  },
  {
    id: 'hand-dryer',
    name: 'Hand Dryer',
    category: 'mechanical',
    file: 'mechanical/hand-dryer.svg',
    altText: 'Electric hand dryer electrical symbol BS EN 60617',
    description:
      'A commercial hand dryer — typically 1.5-2.5 kW. Supplied via switched fused spur with local isolation. RCD protected per BS 7671 411.3.3.',
    useContext:
      'Commercial WCs, restaurants, schools, hospitality; needs 2.5 kW supply on its own spur.',
  },

  // -------- RENEWABLES (5) --------
  {
    id: 'solar-panel',
    name: 'Solar PV Panel',
    category: 'renewables',
    file: 'renewables/solar-panel.svg',
    altText: 'Solar photovoltaic PV panel electrical symbol BS EN 60617',
    description:
      'A solar photovoltaic panel. Typical residential modules 360-450 W. Arrays wired in series strings (matching inverter MPPT voltage window) and parallel to scale capacity.',
    useContext:
      'Roof-mounted residential + commercial PV; BS 7671 Section 712 + MCS standards apply.',
  },
  {
    id: 'inverter',
    name: 'PV Inverter',
    category: 'renewables',
    file: 'renewables/inverter.svg',
    altText: 'Solar PV inverter DC-AC electrical symbol BS EN 60617',
    description:
      'A solar PV inverter converting DC from the array to AC for grid synchronisation. Single-phase up to ~3.68 kW (G98), three-phase above (G99). Hybrid types include battery interface.',
    useContext: 'Loft, plant room, garage wall; close to consumer unit for short AC tails.',
  },
  {
    id: 'battery',
    name: 'Battery Storage',
    category: 'renewables',
    file: 'renewables/battery.svg',
    altText: 'Battery energy storage system BESS electrical symbol BS EN 60617',
    description:
      'A battery energy storage system (BESS) — typically lithium iron phosphate (LFP). Sizes 5-15 kWh domestic, up to MWh commercial. AC-coupled or DC-coupled to PV.',
    useContext:
      'Domestic time-shifting, off-grid systems, commercial peak-shaving; MCS Battery Storage required.',
  },
  {
    id: 'ev-distribution',
    name: 'EV Distribution Board',
    category: 'renewables',
    file: 'renewables/ev-distribution.svg',
    altText: 'EV charger distribution board electrical symbol BS EN 60617',
    description:
      'A dedicated distribution board for one or more EV chargers — usually with load management, dynamic load balancing, and Type A RCDs or RDC-DD per BS 7671 722.531.',
    useContext:
      'Multi-bay car parks, fleet depots, apartment block charging; serves 3-100+ chargers.',
  },
  {
    id: 'generator',
    name: 'Generator',
    category: 'renewables',
    file: 'renewables/generator.svg',
    altText: 'Generator backup power electrical symbol BS EN 60617',
    description:
      'An on-site generator — diesel, gas or biogas. Used as standby for grid failure or as primary supply off-grid. Symbol shows a circle with "G".',
    useContext:
      'Standby for hospitals, data centres; primary for remote off-grid sites; CHP for industrial.',
  },

  // -------- CONTROLS (5) --------
  {
    id: 'bms-controller',
    name: 'BMS Controller',
    category: 'controls',
    file: 'controls/bms-controller.svg',
    altText: 'Building management system BMS controller electrical symbol BS EN 60617',
    description:
      'A Building Management System (BMS) controller — central or distributed unit that schedules HVAC, lighting and other plant. BACnet, Modbus or proprietary protocols.',
    useContext:
      'Commercial offices, hospitals, schools; centralises control of all building services.',
  },
  {
    id: 'control-panel',
    name: 'Control Panel',
    category: 'controls',
    file: 'controls/control-panel.svg',
    altText: 'Electrical control panel electrical symbol BS EN 60617',
    description:
      'A local control panel — typically housing a PLC, contactors, overloads, and HMI for a discrete piece of plant or process line.',
    useContext: 'Industrial plant, water treatment, packaging lines, kitchen extract control.',
  },
  {
    id: 'lighting-control',
    name: 'Lighting Control Module',
    category: 'controls',
    file: 'controls/lighting-control.svg',
    altText: 'Lighting control module DALI KNX electrical symbol BS EN 60617',
    description:
      'A lighting control module — DALI gateway, KNX dimmer, Lutron QS module, or wireless mesh controller. Schedules, scenes, daylight harvesting and occupancy linkage.',
    useContext:
      'Offices, retail, hospitality, schools; smart lighting saves 30-50% on energy vs static control.',
  },
  {
    id: 'sensor',
    name: 'Generic Sensor',
    category: 'controls',
    file: 'controls/sensor.svg',
    altText: 'BMS sensor occupancy temperature electrical symbol BS EN 60617',
    description:
      'A generic BMS sensor input — temperature, CO2, occupancy, light level. Wired back to a BMS controller or PLC. 0-10 V, 4-20 mA or digital bus.',
    useContext:
      'Above ceiling, in ducts, on walls; BMS scheduling depends on accurate sensor placement.',
  },
  {
    id: 'humidity-sensor',
    name: 'Humidity Sensor',
    category: 'controls',
    file: 'controls/humidity-sensor.svg',
    altText: 'Humidity sensor electrical symbol BS EN 60617',
    description:
      'A relative humidity sensor — typically 0-100% RH range. Used to control extract fans, HVAC dampers, dehumidifiers; common in bathrooms, swimming pools, archives.',
    useContext: 'Bathroom fan control, indoor air quality monitoring, art gallery + archive HVAC.',
  },

  // -------- ARCHITECTURAL (6) --------
  {
    id: 'door-left',
    name: 'Door (Hinged Left)',
    category: 'architectural',
    file: 'architectural/door-left.svg',
    altText: 'Door left-hinged architectural symbol electrical drawing',
    description:
      'An architectural door symbol showing a left-hinged swing. Used on electrical layout drawings to show building context — wall switch positions relate to door swing.',
    useContext: 'Electrical layout plans, fire alarm zone plans, emergency lighting drawings.',
  },
  {
    id: 'door-right',
    name: 'Door (Hinged Right)',
    category: 'architectural',
    file: 'architectural/door-right.svg',
    altText: 'Door right-hinged architectural symbol electrical drawing',
    description:
      'An architectural door symbol showing a right-hinged swing. Used to indicate the door swing direction relative to electrical accessories on the drawing.',
    useContext:
      'All electrical layout drawings; tells the installer which side of the door switches go.',
  },
  {
    id: 'door-double',
    name: 'Double Door',
    category: 'architectural',
    file: 'architectural/door-double.svg',
    altText: 'Double door architectural symbol electrical drawing',
    description:
      'A double-door symbol — both leaves shown. Used for main entrances, large reception doors, fire exits and accessible-width openings.',
    useContext: 'Main entrances, lobbies, fire escapes, accessible refuge points.',
  },
  {
    id: 'window',
    name: 'Window',
    category: 'architectural',
    file: 'architectural/window.svg',
    altText: 'Window architectural symbol electrical drawing',
    description:
      'A window symbol shown on the wall line. Helps the installer locate fittings relative to natural light, identify external walls, and avoid cabling routes through openings.',
    useContext: 'External walls on layout drawings, daylight-harvesting lighting plans.',
  },
  {
    id: 'stairs',
    name: 'Stairs',
    category: 'architectural',
    file: 'architectural/stairs.svg',
    altText: 'Stairs architectural symbol electrical drawing',
    description:
      'An architectural stairs symbol showing tread direction. Two-way switching at top and bottom of stairs is the textbook BS 7671 use case for the symbol.',
    useContext: 'Stairwells; emergency lighting + two-way switching are the obvious requirements.',
  },
  {
    id: 'north-arrow',
    name: 'North Arrow',
    category: 'architectural',
    file: 'architectural/north-arrow.svg',
    altText: 'North arrow compass orientation drawing symbol',
    description:
      'A compass north indicator. Critical on solar PV drawings (orientation determines yield), CCTV camera plans (sun glare avoidance), and general drawing orientation.',
    useContext:
      'Solar PV system designs, CCTV / external lighting plans, all professional electrical drawings.',
  },
];
