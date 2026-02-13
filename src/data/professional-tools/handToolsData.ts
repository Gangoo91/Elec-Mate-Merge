import type { ToolSubSection } from "./types";

export const handToolSections: ToolSubSection[] = [
  {
    id: "screwdrivers",
    title: "Screwdrivers",
    tools: [
      {
        name: "VDE Insulated Screwdriver Set",
        description:
          "1000V rated insulated screwdrivers — the absolute first buy. Must include PZ1, PZ2, slotted 3mm, 4mm, 5.5mm, 6.5mm. VDE certification means individually tested to 10,000V and rated for 1000V AC.",
        price: "£30-55",
        priority: "essential",
        standard: "BS EN 60900, VDE",
        brands: ["Wera", "Wiha", "Knipex", "C.K"],
        apprenticeTip:
          "Your VDE set is your most important safety tool. Replace any driver showing cracks or damage to the insulation immediately. Never use non-VDE drivers on live work.",
      },
      {
        name: "Terminal Screwdriver (VDE)",
        description:
          "Small 3mm or 3.5mm VDE screwdriver for tightening terminal screws in sockets, switches, MCBs, and RCBOs. The thin blade reaches recessed terminals.",
        price: "£5-10",
        priority: "essential",
        standard: "VDE",
        brands: ["Wera", "Wiha", "C.K"],
        apprenticeTip:
          "Keep one in your top pocket — you will use it on every single job. Carry a spare as they are easy to lose.",
      },
      {
        name: "Stubby Screwdrivers (VDE)",
        description:
          "Short-shaft VDE screwdrivers for tight spaces — behind consumer units, inside enclosures, deep back boxes.",
        price: "£8-15",
        priority: "recommended",
        standard: "VDE",
        brands: ["Wera", "Wiha"],
        apprenticeTip:
          "Stubby PZ2 and slotted 5.5mm cover most tight-access situations.",
      },
      {
        name: "Torx Driver Set",
        description:
          "T10, T15, T20, T25, T30 Torx drivers for modern MCBs, RCBOs, and switch plates that increasingly use Torx screws.",
        price: "£10-25",
        priority: "recommended",
        brands: ["Wera", "Wiha", "C.K"],
        apprenticeTip:
          "More MCB manufacturers are switching to Torx. A T20 VDE is becoming essential for modern consumer units.",
      },
      {
        name: "Voltage Tester Screwdriver",
        description:
          "Neon indicator screwdriver that lights up when touching a live conductor. Useful for quick presence/absence checks but NOT a substitute for a proper two-pole tester.",
        price: "£3-8",
        priority: "nice-to-have",
        brands: ["C.K", "Draper", "Faithfull"],
        apprenticeTip:
          "Only use as a quick indicator — these can give false results. NEVER rely on a neon screwdriver for safe isolation. Always use a proper GS38-compliant two-pole tester.",
      },
    ],
  },
  {
    id: "pliers-cutters",
    title: "Pliers & Cutters",
    tools: [
      {
        name: "VDE Combination Pliers (180mm)",
        description:
          "All-purpose VDE pliers for gripping, cutting, and bending cable. The flat jaws grip, the cutting edge cuts, and the rounded nose bends.",
        price: "£20-35",
        priority: "essential",
        standard: "BS EN 60900, VDE",
        brands: ["Knipex", "NWS", "C.K"],
        apprenticeTip:
          "Knipex are the industry standard. The 180mm size fits most hands. Never use for cutting hardened steel wire.",
      },
      {
        name: "VDE Side Cutters (160mm)",
        description:
          "Precision cutting pliers for cleanly cutting cable to length. Better cutting action than combination pliers for most cable work.",
        price: "£15-28",
        priority: "essential",
        standard: "BS EN 60900, VDE",
        brands: ["Knipex", "NWS", "C.K"],
        apprenticeTip:
          "Keep these sharp — replace when they start crushing cable rather than cutting it cleanly.",
      },
      {
        name: "VDE Long Nose Pliers (200mm)",
        description:
          "Narrow tapered jaws for reaching into enclosures, bending wire, and holding small components. Essential for termination work.",
        price: "£12-25",
        priority: "essential",
        standard: "BS EN 60900, VDE",
        brands: ["Knipex", "NWS", "C.K"],
        apprenticeTip:
          "Use these for forming conductor loops for screw terminals. The long reach is invaluable inside consumer units.",
      },
      {
        name: "Cable Strippers (Auto-Adjusting)",
        description:
          "Self-adjusting strippers that automatically grip and strip insulation without nicking the conductor. Works on 0.5mm to 6mm cables.",
        price: "£20-42",
        priority: "essential",
        brands: ["Knipex", "Jokari", "C.K"],
        apprenticeTip:
          "Auto-adjusting types are faster and safer than fixed-jaw strippers. The Knipex 12 62 180 is the industry favourite.",
      },
      {
        name: "SWA Cable Strippers",
        description:
          "Specialist tool for stripping the outer sheath and armour of steel wire armoured cable without damaging inner insulation.",
        price: "£25-50",
        priority: "recommended",
        brands: ["C.K", "Knipex", "Intercable"],
        apprenticeTip:
          "Practice on offcuts before working on live jobs. Incorrect stripping can nick inner insulation and cause faults.",
      },
      {
        name: "Crimping Tool",
        description:
          "Ratchet crimper for crimp lugs and bootlace ferrules. Essential for terminating flexible cables into MCBs and junction boxes.",
        price: "£15-40",
        priority: "recommended",
        brands: ["Knipex", "Weidmuller", "C.K"],
        apprenticeTip:
          "BS 7671 requires ferrules on multi-strand conductors in screw terminals. A proper crimper is not optional — pliers will not give a reliable crimp.",
      },
      {
        name: "Knipex Cobra Pliers (250mm)",
        description:
          "Self-gripping water pump pliers with push-button adjustment. Grips pipes, nuts, cable glands, and conduit fittings. The most versatile plier you will own.",
        price: "£25-40",
        priority: "recommended",
        brands: ["Knipex"],
        apprenticeTip:
          "These replace traditional water pump pliers. The push-button adjustment is much faster. Brilliant for tightening cable glands and conduit fittings.",
      },
      {
        name: "Wire Strippers (Fixed Jaw)",
        description:
          "Traditional stripping pliers with preset notches for common cable sizes. Backup to your auto-strippers — simpler mechanism means less to go wrong.",
        price: "£8-15",
        priority: "nice-to-have",
        brands: ["C.K", "Knipex", "Stanley"],
        apprenticeTip:
          "Keep a pair as a backup. Some electricians actually prefer these for precision work on smaller cables.",
      },
    ],
  },
  {
    id: "spanners-wrenches",
    title: "Spanners & Wrenches",
    tools: [
      {
        name: "Adjustable Spanner (200mm + 300mm)",
        description:
          "Two adjustable spanners cover most electrical work. 200mm for general use, 300mm for larger glands and fittings.",
        price: "£15-35 each",
        priority: "essential",
        brands: ["Bahco", "Knipex", "Stanley"],
        apprenticeTip:
          "Always pull the spanner towards you (adjustable jaw facing you). Pushing away risks the jaw slipping and rounding the nut.",
      },
      {
        name: "Combination Spanner Set (7-19mm)",
        description:
          "Ring and open-ended spanner set covering M4 to M12 bolt sizes. The ring end gives a positive grip, the open end is for quick access.",
        price: "£20-45",
        priority: "recommended",
        brands: ["Bahco", "Stahlwille", "Gedore"],
        apprenticeTip:
          "A 10mm and 13mm spanner (M6 and M8 bolts) handle 70% of electrical work. Keep these in your tool belt.",
      },
      {
        name: "Socket Set (1/4 and 3/8 drive)",
        description:
          "Ratchet socket set for fast bolt work. 1/4 drive for small fixings, 3/8 drive for general electrical work.",
        price: "£25-60",
        priority: "recommended",
        brands: ["Bahco", "Wera", "Teng Tools"],
        apprenticeTip:
          "A 1/4 drive ratchet with a 7mm and 8mm socket handles most consumer unit and accessory work. Much faster than a screwdriver.",
      },
      {
        name: "Allen Key Set (Hex Keys)",
        description:
          "Metric hex key set from 1.5mm to 10mm. Essential for grub screws, set screws, and industrial equipment.",
        price: "£8-20",
        priority: "essential",
        brands: ["Wera", "Bondhus", "Bahco"],
        apprenticeTip:
          "Ball-end Allen keys allow up to 25 degrees of approach angle — invaluable for cable gland grub screws in tight spaces.",
      },
    ],
  },
  {
    id: "measuring-marking",
    title: "Measuring & Marking",
    tools: [
      {
        name: "Tape Measure (5m or 8m)",
        description:
          "Quality tape measure with a magnetic tip. 5m for domestic work, 8m for commercial. Must have metric and imperial markings.",
        price: "£10-25",
        priority: "essential",
        brands: ["Stanley FatMax", "Milwaukee", "Hultafors"],
        apprenticeTip:
          "The magnetic tip sticks to steel cable tray and trunking — invaluable when measuring alone.",
      },
      {
        name: "Spirit Level (230mm + 600mm)",
        description:
          "Torpedo level (230mm) for back boxes and small items. 600mm level for trunking runs and consumer units.",
        price: "£10-30 each",
        priority: "essential",
        brands: ["Stabila", "Stanley FatMax", "Hultafors"],
        apprenticeTip:
          "Nothing looks worse than a wonky socket. Even a small torpedo level in your belt makes every installation look professional.",
      },
      {
        name: "Laser Level",
        description:
          "Self-levelling cross-line laser for straight trunking runs, socket heights, and switch lines across walls.",
        price: "£30-100",
        priority: "nice-to-have",
        brands: ["DeWalt", "Bosch", "Stanley"],
        apprenticeTip:
          "A laser level turns a 2-person job into a 1-person job. Essential for long trunking runs and getting socket heights consistent.",
      },
      {
        name: "Stud / Pipe / Cable Detector",
        description:
          "Multi-scanner that detects timber studs, metal pipes, and live cables behind walls before drilling. Prevents hitting services.",
        price: "£30-80",
        priority: "essential",
        brands: ["Bosch", "Zircon", "C.Scope"],
        apprenticeTip:
          "ALWAYS scan before drilling. Hitting a water pipe or live cable is dangerous and expensive. Calibrate the detector on a clear area of wall first.",
      },
      {
        name: "Marker Pens & Pencils",
        description:
          "Permanent markers for cable labelling, carpenter pencils for wall marking, chalk line for long straight lines.",
        price: "£3-10",
        priority: "essential",
        brands: ["Sharpie", "Stabilo", "Stanley"],
        apprenticeTip:
          "Always label cables at both ends during first fix. Future you (or the next electrician) will thank you.",
      },
      {
        name: "Digital Multimeter",
        description:
          "General-purpose meter for measuring voltage, current, resistance, and continuity. Not a substitute for a proper MFT, but useful for everyday fault finding and diagnostics.",
        price: "£30-80",
        priority: "recommended",
        brands: ["Fluke", "Klein", "C.K"],
        apprenticeTip:
          "A Fluke 115 or 117 is the electrician's go-to multimeter. The 117 has non-contact voltage detection built in. Always check leads before use.",
      },
      {
        name: "Cable Label Printer",
        description:
          "Handheld label printer for professional cable identification. Prints durable labels that withstand heat, moisture, and UV. Required for proper cable identification per BS 7671.",
        price: "£40-120",
        priority: "nice-to-have",
        brands: ["Brother", "Dymo", "Brady"],
        apprenticeTip:
          "Printed labels look far more professional than handwritten ones. Worth the investment when you start doing your own jobs. The Brother P-Touch is the industry favourite.",
      },
    ],
  },
  {
    id: "hammers-chisels",
    title: "Hammers & Chisels",
    tools: [
      {
        name: "Claw Hammer (16oz / 450g)",
        description:
          "General purpose hammer for cable clips, rawl plugs, and light demolition. Fibreglass or steel shaft for durability.",
        price: "£10-25",
        priority: "essential",
        brands: ["Estwing", "Stanley", "Roughneck"],
        apprenticeTip:
          "A 16oz hammer is the right weight for electrical work — heavy enough for cable clips but light enough for all-day use.",
      },
      {
        name: "Club Hammer (2.5lb / 1.1kg)",
        description:
          "Heavy short-handled hammer for use with cold chisels and bolster chisels when cutting chases or breaking out masonry.",
        price: "£8-15",
        priority: "recommended",
        brands: ["Estwing", "Roughneck", "Faithfull"],
        apprenticeTip:
          "Always wear safety glasses when using a club hammer and chisel. Spalling masonry is a common eye injury.",
      },
      {
        name: "Cold Chisel & Bolster Set",
        description:
          "Cold chisels (12mm, 19mm, 25mm) for cutting metal and breaking out small areas. Bolster chisel (75mm) for cutting chases in brick and plaster.",
        price: "£10-25",
        priority: "recommended",
        brands: ["Roughneck", "Faithfull", "Draper"],
        apprenticeTip:
          "Use a bolster and club hammer for short chases. For anything longer than 1m, use an SDS chaser or grinder.",
      },
    ],
  },
  {
    id: "cutting",
    title: "Cutting Tools",
    tools: [
      {
        name: "Junior Hacksaw",
        description:
          "Small hacksaw for cutting conduit, mini trunking, and threaded rod in tight spaces.",
        price: "£5-10",
        priority: "essential",
        brands: ["Stanley", "Bahco", "Irwin"],
        apprenticeTip:
          "Keep spare blades in your tool bag. A blunt blade makes a rough cut and takes three times as long.",
      },
      {
        name: "Full-Size Hacksaw",
        description:
          "300mm hacksaw for cutting larger conduit, trunking, cable tray, and threaded rod.",
        price: "£10-20",
        priority: "recommended",
        brands: ["Bahco", "Irwin", "Stanley"],
        apprenticeTip:
          "Use a 24 TPI (teeth per inch) blade for conduit and thin materials, 18 TPI for thicker materials like cable tray.",
      },
      {
        name: "Stanley Knife / Utility Knife",
        description:
          "Retractable blade knife for stripping cable sheaths, cutting insulation tape, trimming trunking, and general cutting.",
        price: "£5-15",
        priority: "essential",
        brands: ["Stanley", "Milwaukee", "Irwin"],
        apprenticeTip:
          "Always retract the blade when not in use. Use a hooked blade for stripping flat T&E cable — less risk of nicking conductors.",
      },
      {
        name: "Pipe / Conduit Cutter",
        description:
          "Rotary cutter for clean burr-free cuts on conduit and small pipes. Much neater than a hacksaw.",
        price: "£10-20",
        priority: "nice-to-have",
        brands: ["Monument", "Bahco", "Ridgid"],
        apprenticeTip:
          "Clean cuts mean better connections. A pipe cutter gives a professional finish on exposed conduit runs.",
      },
    ],
  },
];
