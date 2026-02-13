import type {
  RawlPlug,
  BoltNutSize,
  BoltType,
  CableGland,
  ConduitSize,
  TrunkingSize,
  SurfaceFixing,
  ScrewHeadType,
  ScrewCategory,
} from "./types";

// ─── 1. Rawl Plugs / Wall Plugs ─────────────────────────────────────────────

export const rawlPlugs: RawlPlug[] = [
  {
    colour: "Yellow",
    colourHex: "#EAB308",
    drillBit: "5mm",
    screwSize: "#4-8 (3.0-4.0mm)",
    loadBrick: "15kg",
    loadBlock: "5kg",
    wallTypes: "Brick, lightweight block",
  },
  {
    colour: "Red",
    colourHex: "#EF4444",
    drillBit: "6mm",
    screwSize: "#6-10 (3.5-5.0mm)",
    loadBrick: "25kg",
    loadBlock: "10kg",
    wallTypes: "Brick, block, concrete",
  },
  {
    colour: "Brown",
    colourHex: "#92400E",
    drillBit: "7mm",
    screwSize: "#8-14 (4.0-6.0mm)",
    loadBrick: "40kg",
    loadBlock: "20kg",
    wallTypes: "Brick, block, concrete",
  },
  {
    colour: "Blue",
    colourHex: "#3B82F6",
    drillBit: "10mm",
    screwSize: "#14-18 (6.0-8.0mm)",
    loadBrick: "60kg",
    loadBlock: "30kg",
    wallTypes: "Brick, block, concrete",
  },
  {
    colour: "Grey",
    colourHex: "#6B7280",
    drillBit: "12mm",
    screwSize: "#18+ (8.0mm+)",
    loadBrick: "80kg+",
    loadBlock: "—",
    wallTypes: "Concrete, dense block",
  },
];

export const rawlPlugTip =
  "Always drill deeper than the plug length — debris at the bottom prevents the plug seating properly. Clear the hole with a blow-out bulb or compressed air before inserting.";

// ─── 2. Bolt & Nut Sizes (Metric) ───────────────────────────────────────────

export const boltNutSizes: BoltNutSize[] = [
  {
    metric: "M4",
    spannerSize: "7mm",
    pitch: "0.7mm",
    commonUses: "CU covers, small enclosures, socket faceplates",
  },
  {
    metric: "M5",
    spannerSize: "8mm",
    pitch: "0.8mm",
    commonUses: "Light brackets, switch plates, small junction boxes",
  },
  {
    metric: "M6",
    spannerSize: "10mm",
    pitch: "1.0mm",
    commonUses: "Earth clamps, cable tray, mounting brackets, DB covers",
  },
  {
    metric: "M8",
    spannerSize: "13mm",
    pitch: "1.25mm",
    commonUses: "Trunking brackets, larger equipment mounts, cable ladder",
  },
  {
    metric: "M10",
    spannerSize: "17mm",
    pitch: "1.5mm",
    commonUses: "Heavy equipment, cable ladder, busbar connections",
  },
  {
    metric: "M12",
    spannerSize: "19mm",
    pitch: "1.75mm",
    commonUses: "Transformer fixings, large enclosures, switchgear",
  },
  {
    metric: "M16",
    spannerSize: "24mm",
    pitch: "2.0mm",
    commonUses: "Heavy switchgear, foundation bolts, large structural fixings",
  },
  {
    metric: "M20",
    spannerSize: "30mm",
    pitch: "2.5mm",
    commonUses: "Large structural fixings, base plates, transformer mounting",
  },
];

export const boltNutTip =
  "If someone asks for an M8, grab a 13mm spanner. Learn the metric-to-spanner mapping — you will use it every day.";

// ─── 3. Bolt Types ──────────────────────────────────────────────────────────

export const boltTypes: BoltType[] = [
  {
    name: "Hex Bolt",
    headType: "Hexagonal",
    description:
      "Standard bolt with a hexagonal head. The most common bolt type in electrical installations.",
    whenToUse:
      "General purpose fixing — cable tray, trunking brackets, equipment mounting. Use with a flat washer and nut.",
    commonSizes: "M6, M8, M10, M12",
  },
  {
    name: "Coach Bolt",
    headType: "Dome / square neck",
    description:
      "Smooth dome head with a square section under it that grips into timber or soft material to prevent spinning.",
    whenToUse:
      "Fixing through timber — cable routes through joists, outdoor mounting to wooden posts. The dome head also looks neat for visible fixings.",
    commonSizes: "M6, M8, M10",
  },
  {
    name: "Roofing Bolt",
    headType: "Mushroom / square neck",
    description:
      "Low-profile mushroom head with a square neck. Designed for thin sheet materials where you cannot hold the bolt head.",
    whenToUse:
      "Cable tray and basket connections, trunking joints, any sheet metal work where you cannot access the head side.",
    commonSizes: "M6 x 12mm, M6 x 25mm, M6 x 40mm",
  },
  {
    name: "Machine Screw",
    headType: "Pan / countersunk",
    description:
      "Precision threaded bolt with a consistent thread pitch. Designed for tapped holes or use with a nut.",
    whenToUse:
      "Electrical enclosures, CU/DB covers, equipment with threaded inserts. Often used with a shake-proof washer.",
    commonSizes: "M3.5, M4, M5, M6",
  },
  {
    name: "Threaded Rod",
    headType: "None (full thread)",
    description:
      "Fully threaded rod cut to length. Used with nuts and washers at each end.",
    whenToUse:
      "Suspended cable tray, drop rod hangers for conduit, long through-fixings. Cut to length with a hacksaw or bolt croppers.",
    commonSizes: "M6, M8, M10, M12 (sold in 1m or 3m lengths)",
  },
  {
    name: "U-Bolt",
    headType: "U-shaped, two threaded legs",
    description:
      "U-shaped bolt that wraps around pipes or conduit. Both legs are threaded for nuts.",
    whenToUse:
      "Clamping conduit or pipes to cable tray, securing cable bundles to unistrut.",
    commonSizes: "20mm, 25mm, 32mm (matched to conduit size)",
  },
  {
    name: "Anchor Bolt / Throughbolt",
    headType: "Hex (expansion sleeve)",
    description:
      "Expansion bolt with a sleeve that grips inside masonry when tightened. Very high pull-out resistance.",
    whenToUse:
      "Heavy-duty fixing into concrete — DB boards, cable ladder, heavy switchgear, generator bases.",
    commonSizes: "M8, M10, M12, M16",
  },
];

export const boltTypesTip =
  "Always use the correct washer — flat washers spread the load, spring washers prevent loosening from vibration, and penny washers spread load on soft materials.";

// ─── 4. Cable Glands ────────────────────────────────────────────────────────

export const cableGlands: CableGland[] = [
  {
    size: "16mm",
    cableODRange: "4.5-8.0mm",
    commonCables: "1.5/2.5mm 2C+E flat cable",
    material: "Brass / Nylon",
    ipRating: "IP68",
  },
  {
    size: "20mm",
    cableODRange: "6.0-12.0mm",
    commonCables: "2.5/4mm 3C SWA",
    material: "Brass / Nylon",
    ipRating: "IP68",
  },
  {
    size: "25mm",
    cableODRange: "11.0-17.0mm",
    commonCables: "6/10mm 3C SWA",
    material: "Brass / Nylon",
    ipRating: "IP68",
  },
  {
    size: "32mm",
    cableODRange: "16.0-24.0mm",
    commonCables: "16/25mm 3C SWA",
    material: "Brass / Nylon",
    ipRating: "IP68",
  },
  {
    size: "40mm",
    cableODRange: "23.0-32.0mm",
    commonCables: "35/50mm 3C SWA",
    material: "Brass",
    ipRating: "IP68",
  },
  {
    size: "50mm",
    cableODRange: "32.0-40.0mm",
    commonCables: "70/95mm 3C SWA",
    material: "Brass",
    ipRating: "IP68",
  },
  {
    size: "63mm",
    cableODRange: "40.0-52.0mm",
    commonCables: "120mm+ SWA",
    material: "Brass",
    ipRating: "IP68",
  },
];

export const cableGlandTip =
  "Brass glands are mandatory for outdoor and IP-rated installations. Nylon is lighter and cheaper for indoor use. Always fit the indoor/outdoor shroud for the full IP rating. Use a BW gland for SWA to maintain the armour as the CPC.";

// ─── 5. Conduit Sizes ───────────────────────────────────────────────────────

export const conduitSizes: ConduitSize[] = [
  {
    size: "20mm",
    cableCapacity: "Up to 3x 2.5mm singles or 2x 4mm singles",
    commonAccessories: "Saddles, bends (90/135), tees, couplers, through boxes, terminal boxes",
    standard: "BS 4568 / BS EN 61386",
  },
  {
    size: "25mm",
    cableCapacity: "Up to 4x 4mm singles or 3x 6mm singles",
    commonAccessories: "Saddles, bends (90/135), tees, couplers, through boxes, terminal boxes, reducers",
    standard: "BS 4568 / BS EN 61386",
  },
  {
    size: "32mm",
    cableCapacity: "Up to 4x 10mm singles or 3x 16mm singles",
    commonAccessories: "Saddles, bends (90), tees, couplers, through boxes, adaptable boxes",
    standard: "BS 4568 / BS EN 61386",
  },
];

export const conduitTip =
  "The 45% fill rule applies — never fill conduit more than 45% of its internal cross-sectional area. This allows cables to be drawn through without damage. Use cable lubricant on long runs.";

// ─── 6. Trunking Sizes ──────────────────────────────────────────────────────

export const trunkingSizes: TrunkingSize[] = [
  {
    size: "16x16mm",
    cableCapacity: "2-3 data cables or 2x 1.5mm flat",
    commonUses: "Surface mini trunking for socket drops, data cabling, neat surface wiring",
    accessories: "Internal/external angles, flat tees, end caps, couplers, adaptor boxes",
  },
  {
    size: "25x16mm",
    cableCapacity: "3-4 singles or 2x 2.5mm flat",
    commonUses: "Surface wiring in offices, socket extensions, spur connections",
    accessories: "Internal/external angles, flat tees, end caps, couplers, adaptor boxes",
  },
  {
    size: "40x16mm",
    cableCapacity: "4-6 singles or 3x 2.5mm flat",
    commonUses: "Multiple socket drops, dado trunking, horizontal runs in offices",
    accessories: "Internal/external angles, flat tees, end caps, couplers, dado accessories",
  },
  {
    size: "40x25mm",
    cableCapacity: "6-8 singles or 4x 2.5mm flat",
    commonUses: "Power and data segregation, commercial surface wiring",
    accessories: "Internal/external angles, flat tees, end caps, couplers, dividers",
  },
  {
    size: "50x50mm",
    cableCapacity: "10-15 singles depending on size",
    commonUses: "Main distribution runs, rising mains, commercial and industrial",
    accessories: "Internal/external angles, flat tees, end caps, couplers, dividers, earth bars",
  },
  {
    size: "75x50mm",
    cableCapacity: "15-25 singles depending on size",
    commonUses: "Large distribution runs, server rooms, main cable routes",
    accessories: "Internal/external angles, flat tees, crossovers, end caps, dividers",
  },
  {
    size: "100x50mm",
    cableCapacity: "25-40 singles depending on size",
    commonUses: "Main cable routes, switchroom runs, heavy distribution",
    accessories: "Internal/external angles, flat tees, crossovers, end caps, dividers, earth bars",
  },
  {
    size: "150x50mm",
    cableCapacity: "40-60 singles depending on size",
    commonUses: "Switchroom main runs, large commercial builds, data centre cable routes",
    accessories: "Internal/external angles, flat tees, crossovers, risers, dividers, earth bars",
  },
  {
    size: "150x150mm",
    cableCapacity: "Large cable bundles",
    commonUses: "Heavy industrial runs, large power distribution, busbar alternatives",
    accessories: "Angles, tees, reducers, end caps, earth bars, fire barriers",
  },
];

export const trunkingTip =
  "Always use the 45% fill rule for trunking too. Maintain segregation between power and data cables — use dividers or separate compartments. BS 7671 Regulation 528.1 requires separation of Band I and Band II circuits.";

// ─── 7. Fixings by Surface Type ─────────────────────────────────────────────

export const surfaceFixings: SurfaceFixing[] = [
  {
    surface: "Brick / Block",
    colour: "text-red-400",
    methods: [
      {
        name: "Rawl Plugs",
        maxLoad: "5-80kg",
        description: "Standard expansion plug — drill, insert plug, drive screw. The most common fixing in electrical work.",
        tip: "Match the plug colour to the load. Red plugs handle most electrical work.",
      },
      {
        name: "Chemical Anchors",
        maxLoad: "200kg+",
        description: "Two-part resin injected into a drilled hole with a threaded stud. Bonds chemically to the masonry.",
        tip: "Essential for hollow blocks and aircrete. Allow full cure time (typically 24h at 20C) before loading.",
      },
      {
        name: "Spring Toggles",
        maxLoad: "25kg",
        description: "Spring-loaded wings that open behind hollow blocks. For when standard plugs spin in the cavity.",
        tip: "Drill a large enough hole for the folded toggle to pass through. Cannot be removed and re-used.",
      },
      {
        name: "Frame Fixings / Hammer Fixings",
        maxLoad: "30-50kg",
        description: "One-piece plug and screw driven through the item being fixed and into the wall. Very fast to install.",
        tip: "Brilliant for cable tray and basket brackets. Pre-drill through the bracket and wall in one operation.",
      },
    ],
  },
  {
    surface: "Plasterboard",
    colour: "text-blue-400",
    methods: [
      {
        name: "Spring Toggles",
        maxLoad: "25kg",
        description: "Wings spring open behind the plasterboard and spread load over a large area.",
        tip: "Best for medium loads. The toggle drops inside the wall if removed — not reusable.",
      },
      {
        name: "Hollow Wall Anchors (Molly Bolts)",
        maxLoad: "15kg",
        description: "Metal sleeve that expands behind plasterboard when tightened, creating a solid anchor point.",
        tip: "Better than rawl plugs in plasterboard as they grip the back face. Can be removed and reused.",
      },
      {
        name: "GripIt Fixings",
        maxLoad: "113kg (M8 blue)",
        description: "Innovative UK design — wings rotate behind the board and distribute load over 8x the area of a toggle.",
        tip: "The best plasterboard fixing available. Colour coded: yellow (M6 - 71kg), red (M6 - 74kg), brown (M8 - 93kg), blue (M8 - 113kg).",
      },
      {
        name: "Direct to Noggin",
        maxLoad: "Structural",
        description: "Find the timber noggin behind the plasterboard using a stud finder or magnet, and screw directly into it.",
        tip: "Always the strongest option. Use a magnet to find drywall screws which indicate noggin positions.",
      },
    ],
  },
  {
    surface: "Concrete",
    colour: "text-amber-400",
    methods: [
      {
        name: "Rawl Plugs (Light Duty)",
        maxLoad: "15-80kg",
        description: "Standard expansion plugs. Require an SDS hammer drill for the hole.",
        tip: "Use brown or blue plugs for concrete — yellow and red may not grip well in hard concrete.",
      },
      {
        name: "Drop-in Anchors",
        maxLoad: "100kg+",
        description: "Flush-mounted female thread set into concrete. A setting tool expands the anchor in the hole.",
        tip: "Ideal for threaded rod hangers and suspended cable tray. Must be set flush with the concrete surface.",
      },
      {
        name: "Throughbolts (Expansion Anchors)",
        maxLoad: "200kg+",
        description: "Heavy-duty expansion bolt that grips concrete by expanding a cone against a sleeve when tightened.",
        tip: "The go-to for heavy loads — DB boards, cable ladder, switchgear. Drill depth must match bolt length exactly.",
      },
      {
        name: "Chemical Anchors",
        maxLoad: "500kg+",
        description: "Highest strength available. Resin bonded threaded studs for maximum pull-out resistance.",
        tip: "Used for critical fixings — generator bases, transformer mounts, structural supports. Ensure the hole is clean and dry.",
      },
    ],
  },
  {
    surface: "Steel",
    colour: "text-cyan-400",
    methods: [
      {
        name: "TEK Screws (Self-Drilling)",
        maxLoad: "20-50kg",
        description: "Hardened screws with a drill-point tip that drill, tap and fasten in one operation through steel.",
        tip: "Match the TEK point length to the steel thickness. Use a hex head for maximum torque.",
      },
      {
        name: "Blind Rivets (Pop Rivets)",
        maxLoad: "10-20kg",
        description: "Permanent fastener installed from one side using a rivet gun. Creates a clean, flush fixing.",
        tip: "Use aluminium rivets for thin sheet, steel rivets for structural. Drill hole must match rivet body size exactly.",
      },
      {
        name: "Rivnuts / Nutserts",
        maxLoad: "50-100kg",
        description: "Threaded insert installed into a drilled hole from one side. Creates a permanent captive nut.",
        tip: "Excellent for adding bolt points to steel cable tray or enclosures. Requires a rivnut tool to install.",
      },
      {
        name: "Bolts Through Drilled Holes",
        maxLoad: "Structural",
        description: "Traditional bolt-through with nut and washer. Requires drilling through the steelwork.",
        tip: "Use a step drill (Unibit) for clean holes in thin steel. Use cutting fluid and low speed for thick steel.",
      },
      {
        name: "Beam Clamps",
        maxLoad: "100kg+",
        description: "Clamp-on fixings that grip steel beams without drilling. Available in various sizes for different flange widths.",
        tip: "No hot work or drilling needed — just clamp and tighten. Essential for fixing to structural steelwork where you cannot drill.",
      },
    ],
  },
  {
    surface: "Wood / Timber",
    colour: "text-green-400",
    methods: [
      {
        name: "Woodscrews",
        maxLoad: "10-30kg",
        description: "Standard pointed screws with a coarse thread designed to grip timber fibres.",
        tip: "Always pilot drill in hardwood to prevent splitting. No pilot needed for softwood with modern screws.",
      },
      {
        name: "Coach Screws",
        maxLoad: "50-100kg",
        description: "Large hex-headed woodscrews (M8-M12) for heavy-duty timber fixings. Driven with a socket or spanner.",
        tip: "Always use a washer under the head. Pre-drill with a bit slightly smaller than the core diameter.",
      },
      {
        name: "Decking Screws (Outdoor)",
        maxLoad: "10-20kg",
        description: "Stainless steel or coated screws designed for outdoor use. Resist corrosion from moisture and treated timber.",
        tip: "Use stainless A4 screws near the coast. Standard zinc-plated screws corrode quickly outdoors.",
      },
      {
        name: "Cable Clips / P-Clips",
        maxLoad: "N/A (cable support)",
        description: "Nail-on or screw-on clips for securing cables to timber surfaces.",
        tip: "Use the correct clip size for the cable. Space at 300mm horizontal, 400mm vertical for flat cables per BS 7671.",
      },
    ],
  },
];

export const surfaceFixingsTip =
  "When unsure of wall construction, drill a small pilot hole first. The dust colour tells you: red = brick, grey = block, white = plasterboard, sandy = lightweight block.";

// ─── 8. Screw Head Types ────────────────────────────────────────────────────

export const screwHeadTypes: ScrewHeadType[] = [
  {
    name: "Slotted",
    driverSizes: "3mm, 4mm, 5.5mm, 6.5mm, 8mm",
    identificationTip: "Single straight slot across the head. The oldest screw drive type.",
    commonUses: "Older installations, brass screws, electrical accessories (BS 1363 socket faceplates). VDE insulated screwdriver required for electrical work.",
  },
  {
    name: "Phillips (#)",
    driverSizes: "#0, #1, #2, #3",
    identificationTip: "Simple cross shape with slightly rounded corners. Designed to cam out (slip) at a set torque to prevent over-tightening.",
    commonUses: "Machine screws, some consumer unit covers, imported equipment. Less common in UK electrical work.",
  },
  {
    name: "Pozidriv (PZ)",
    driverSizes: "PZ0, PZ1, PZ2, PZ3",
    identificationTip: "Cross shape WITH extra marks (tick lines) between the cross arms at 45 degrees. This is the key difference from Phillips.",
    commonUses: "The dominant screw type in UK electrical accessories — sockets, switches, back boxes, isolators. PZ2 is used most.",
  },
  {
    name: "Torx (T / TX)",
    driverSizes: "T10, T15, T20, T25, T30, T40",
    identificationTip: "Six-pointed star shape. Much better torque transfer and virtually no cam-out.",
    commonUses: "Modern switch plates, MCBs, some consumer unit bus bar screws. Becoming more common in new electrical products.",
  },
  {
    name: "Hex (Allen)",
    driverSizes: "2mm, 2.5mm, 3mm, 4mm, 5mm, 6mm",
    identificationTip: "Hexagonal hole in the head. Used with Allen keys or hex bit drivers.",
    commonUses: "Grub screws, set screws in cable glands, busbar connections, terminal blocks in industrial equipment.",
  },
  {
    name: "Robertson (Square)",
    driverSizes: "#1 (yellow), #2 (red), #3 (black)",
    identificationTip: "Square recess in the head. Excellent grip — the screw stays on the driver without holding it.",
    commonUses: "Less common in UK. Found on some North American equipment and decking screws. Very popular in Canada.",
  },
];

export const screwHeadTip =
  "Phillips and Pozidriv look similar but are NOT interchangeable. Pozidriv has extra marks between the cross arms at 45 degrees. Using a Phillips driver in a Pozidriv screw will strip the head. Invest in a quality VDE PZ2 — you will use it more than any other driver.";

// ─── 9. Screw Categories ────────────────────────────────────────────────────

export const screwCategories: ScrewCategory[] = [
  {
    name: "Self-Tapping Screws",
    description: "Hardened screws that cut their own thread into pre-drilled holes in metal or plastic. Thread-forming or thread-cutting types available.",
    whenToUse: "Fixing into sheet metal enclosures, plastic junction boxes, thin metal brackets. Pre-drill a pilot hole first.",
    commonSizes: "#6 x 13mm, #8 x 19mm, #10 x 25mm",
  },
  {
    name: "Self-Drilling (TEK) Screws",
    description: "Screws with a drill-point tip that drill, tap and fasten in one operation through steel. The point length determines the maximum steel thickness.",
    whenToUse: "Fixing directly to steel — cable tray to brackets, enclosures to steel frames. No pre-drilling needed.",
    commonSizes: "#10 x 16mm (TEK 1 for 1mm steel), #12 x 25mm (TEK 3 for 3mm steel), #14 x 38mm (TEK 5 for 5mm steel)",
  },
  {
    name: "Woodscrews",
    description: "Coarse-threaded pointed screws designed to grip timber fibres. Available in countersunk or round head, various materials.",
    whenToUse: "Fixing cable clips, back boxes, brackets to timber joists and battens. Countersunk for flush finish.",
    commonSizes: "#6 x 25mm, #8 x 32mm, #8 x 40mm, #10 x 50mm",
  },
  {
    name: "Machine Screws",
    description: "Precision screws with a consistent thread pitch (fine or coarse). Designed for tapped holes or use with a nut.",
    whenToUse: "Electrical equipment, consumer unit covers, switch mechanisms, terminal connections. Often found in M3.5 and M4.",
    commonSizes: "M3.5 x 25mm, M4 x 16mm, M4 x 25mm, M5 x 20mm",
  },
  {
    name: "Coach Screws",
    description: "Large hex-headed screws (M8-M12) driven with a socket or spanner. Very high pull-out resistance in timber.",
    whenToUse: "Heavy-duty fixing to timber — DB boards, heavy cable tray brackets, outdoor equipment mounting.",
    commonSizes: "M8 x 60mm, M10 x 80mm, M10 x 100mm, M12 x 100mm",
  },
  {
    name: "Chipboard Screws",
    description: "Deep-threaded screws with a sharp point. Coarser thread than woodscrews for better grip in chipboard, MDF and softwood.",
    whenToUse: "Fixing to chipboard, MDF, OSB, softwood battens. The deep thread gives good grip in manufactured boards.",
    commonSizes: "3.5 x 25mm, 4.0 x 40mm, 4.5 x 50mm, 5.0 x 60mm",
  },
  {
    name: "Drywall Screws",
    description: "Fine-threaded black phosphate screws with a bugle head. Designed for plasterboard to timber or metal stud.",
    whenToUse: "Fixing plasterboard (not common in electrical work, but useful to know for identifying noggin positions).",
    commonSizes: "3.5 x 25mm (single board), 3.5 x 42mm (double board), 3.5 x 55mm (triple board)",
  },
];

export const screwCategoriesTip =
  "Keep a mixed box of red rawl plugs, #8 x 40mm woodscrews, M4 x 25mm machine screws, and PZ2 screws in your van — they cover 80% of day-to-day fixings work.";

// ─── Van Stock Essentials ────────────────────────────────────────────────

export interface VanStockItem {
  item: string;
  quantity: string;
  approxCost: string;
  notes: string;
}

export const vanStockEssentials: VanStockItem[] = [
  {
    item: "Red rawl plugs (6mm)",
    quantity: "Box of 100",
    approxCost: "£3-5",
    notes: "Your most-used plug. Go through these fast.",
  },
  {
    item: "Brown rawl plugs (7mm)",
    quantity: "Box of 100",
    approxCost: "£4-6",
    notes: "For heavier fixings — back boxes, cable tray brackets.",
  },
  {
    item: "#8 x 40mm woodscrews (PZ2)",
    quantity: "Box of 200",
    approxCost: "£5-8",
    notes: "Goes with red rawl plugs. The most common screw on domestic jobs.",
  },
  {
    item: "M4 x 25mm machine screws",
    quantity: "Box of 100",
    approxCost: "£3-5",
    notes: "For CU covers and back boxes. Always carry spares.",
  },
  {
    item: "M3.5 x 25mm machine screws",
    quantity: "Box of 100",
    approxCost: "£3-5",
    notes: "Socket and switch faceplates. The screws that come with accessories are often poor quality.",
  },
  {
    item: "Cable clips (assorted)",
    quantity: "Mixed box",
    approxCost: "£8-15",
    notes: "Flat clips for T&E in various sizes — 1.0mm, 1.5mm, 2.5mm, 4mm, 6mm.",
  },
  {
    item: "Cable ties (assorted)",
    quantity: "Pack of 500",
    approxCost: "£5-10",
    notes: "Mixed sizes. Black for outdoor, natural for indoor.",
  },
  {
    item: "Self-tapping screws (mixed)",
    quantity: "Box of 100",
    approxCost: "£4-8",
    notes: "#8 and #10 in 13mm and 19mm lengths. For metal enclosures and junction boxes.",
  },
  {
    item: "Spring toggles",
    quantity: "Pack of 20",
    approxCost: "£5-10",
    notes: "For plasterboard fixings. Carry M4 and M5 sizes.",
  },
  {
    item: "Insulation tape (mixed colours)",
    quantity: "10 pack",
    approxCost: "£5-8",
    notes: "Brown, black, grey, blue (BS 7671 colours), green/yellow (earth), red, white.",
  },
];
