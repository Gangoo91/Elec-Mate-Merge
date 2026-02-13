import type { Supplier, BuyingGuide } from "./types";

export const suppliers: Supplier[] = [
  {
    name: "CEF (City Electrical Factors)",
    url: "https://www.cef.co.uk",
    description:
      "The UK's largest independent electrical wholesaler with 400+ branches nationwide. Trade-only — you need to open a trade account. Best prices on cable, consumer units, and accessories.",
    bestFor: "Cable, consumer units, MCBs/RCBOs, wiring accessories, trunking, conduit",
    tradeAccount: true,
    deliveryInfo: "Branch collection or next-day delivery on most items",
  },
  {
    name: "Edmundson Electrical",
    url: "https://www.edmundson-electrical.co.uk",
    description:
      "Second-largest UK electrical wholesaler. Part of the Sonepar group. Strong range of industrial and commercial products. Excellent technical support.",
    bestFor: "Cable, industrial switchgear, containment systems, lighting, fire alarm",
    tradeAccount: true,
    deliveryInfo: "Branch collection or delivery — varies by branch",
  },
  {
    name: "Rexel UK",
    url: "https://www.rexel.co.uk",
    description:
      "Global electrical distributor with a strong UK presence. Good online ordering system and project pricing. Part of the Rexel Group.",
    bestFor: "Cable, switchgear, automation products, lighting, project quotations",
    tradeAccount: true,
    deliveryInfo: "Branch collection, next-day delivery, project deliveries",
  },
  {
    name: "Screwfix",
    url: "https://www.screwfix.com",
    description:
      "Trade counter and online retailer. No trade account needed — open to everyone. Brilliant for tools, fixings, consumables, and last-minute items. Click & collect in 1 minute.",
    bestFor: "Tools, fixings, consumables, PPE, power tools, small accessories",
    tradeAccount: false,
    deliveryInfo: "Click & collect in 1 minute, next-day delivery, same-day delivery in some areas",
  },
  {
    name: "Toolstation",
    url: "https://www.toolstation.com",
    description:
      "Screwfix competitor with similar range and pricing. Growing branch network. Often slightly cheaper than Screwfix on equivalent items.",
    bestFor: "Tools, fixings, consumables, PPE, power tools, electrical accessories",
    tradeAccount: false,
    deliveryInfo: "Click & collect, next-day delivery, branches open 7 days",
  },
  {
    name: "TLC Direct (The Lamp Company)",
    url: "https://www.tlc-direct.co.uk",
    description:
      "Online electrical wholesaler with excellent prices, especially on wiring accessories, consumer units, and testing equipment. No minimum order.",
    bestFor: "Test equipment, consumer units, wiring accessories, LED lighting, cable",
    tradeAccount: false,
    deliveryInfo: "Next-day delivery on orders before 4pm, free delivery over £50",
  },
  {
    name: "RS Components",
    url: "https://www.rs-online.com",
    description:
      "Massive catalogue of electrical, electronic, and industrial components. Best for specialist items you cannot find elsewhere. Higher prices but unrivalled range.",
    bestFor: "Specialist components, industrial control gear, connectors, cable glands, test leads",
    tradeAccount: false,
    deliveryInfo: "Next-day delivery, same-day delivery available, free delivery over £40",
  },
  {
    name: "Amazon UK",
    url: "https://www.amazon.co.uk",
    description:
      "Useful for tools, PPE, and general items. Be cautious of counterfeit products — only buy from reputable sellers with good reviews. Check for genuine VDE/CE markings.",
    bestFor: "Tools, PPE, cable ties, consumables, books, study materials",
    tradeAccount: false,
    deliveryInfo: "Prime next-day delivery, often same-day in cities",
  },
  {
    name: "Rapid Online",
    url: "https://www.rapidonline.com",
    description:
      "Electronic and electrical components supplier. Good range of enclosures, terminals, connectors, and specialist fixings. Competitive prices on components.",
    bestFor: "Enclosures, terminals, connectors, cable management, electronic components",
    tradeAccount: false,
    deliveryInfo: "Next-day delivery, free delivery over £30",
  },
];

export const buyingGuides: BuyingGuide[] = [
  {
    category: "Cable & Wiring",
    bestSuppliers: ["CEF", "Edmundson", "Rexel"],
    tip: "Always buy cable from an electrical wholesaler — they stock genuine BS 6004/6724 rated cable. Negotiate project pricing for large orders. Check the CPR (Construction Products Regulation) classification.",
  },
  {
    category: "Consumer Units & MCBs",
    bestSuppliers: ["CEF", "TLC Direct", "Edmundson"],
    tip: "Stick to main brands: Hager, Schneider, MK, or Wylex. TLC Direct often has the best online prices for consumer units. Always check BS EN 61439 compliance.",
  },
  {
    category: "Tools & Power Tools",
    bestSuppliers: ["Screwfix", "Toolstation", "Amazon UK"],
    tip: "Wait for sales — Screwfix and Toolstation run regular promotions. Screwfix Trade Club and Toolstation loyalty points add up. Compare prices before buying.",
  },
  {
    category: "Test Equipment",
    bestSuppliers: ["TLC Direct", "RS Components", "CEF"],
    tip: "TLC Direct often has the best prices on MFTs and testers. Check for calibration certificates included. Some suppliers offer calibration packages.",
  },
  {
    category: "Fixings & Sundries",
    bestSuppliers: ["Screwfix", "Toolstation", "Rapid Online"],
    tip: "Buy fixings in bulk — a box of 100 rawl plugs is much cheaper per unit than a pack of 10. Keep your van stocked with common sizes.",
  },
  {
    category: "Cable Tray & Trunking",
    bestSuppliers: ["CEF", "Edmundson", "Rexel"],
    tip: "Buy from a wholesaler for the best prices on long lengths. Get project pricing for commercial jobs. Ensure correct fire rating for the application.",
  },
  {
    category: "Lighting & LEDs",
    bestSuppliers: ["TLC Direct", "CEF", "Screwfix"],
    tip: "TLC Direct has an excellent LED range at good prices. Check lumen output, colour temperature (3000K warm / 4000K cool), and IP rating for the location.",
  },
  {
    category: "PPE & Workwear",
    bestSuppliers: ["Screwfix", "Toolstation", "Amazon UK"],
    tip: "Do not skimp on boots — buy the best you can afford. Safety glasses and gloves are cheap — buy in bulk. Check standards markings are genuine.",
  },
];

export const apprenticeBudgetGuide = [
  {
    phase: "Year 1 — The Basics",
    budget: "£300-500",
    items: [
      "VDE screwdriver set (PZ1, PZ2, slotted 3mm-6.5mm)",
      "VDE combination pliers, side cutters, long nose pliers",
      "Auto cable strippers",
      "Allen key set",
      "Adjustable spanner (200mm)",
      "Tape measure, spirit level, stud detector",
      "Stanley knife, junior hacksaw",
      "Claw hammer",
      "Head torch",
      "Safety boots, glasses, gloves, knee pads",
      "Voltage indicator + proving unit",
      "Tool bag or belt",
    ],
    tip: "Focus on quality VDE hand tools first. Your employer should provide power tools and test equipment for the first year.",
  },
  {
    phase: "Year 2 — Building Up",
    budget: "£500-800",
    items: [
      "18V combi drill + impact driver (twin pack)",
      "Spare batteries (2x 5.0Ah)",
      "SDS drill (corded is fine to start)",
      "Drill bit sets (masonry + HSS)",
      "Socket tester",
      "Crimping tool + ferrules",
      "Cable rods (Super Rod or similar)",
      "Extra PPE (ear defenders, dust masks)",
      "Knipex Cobra pliers",
    ],
    tip: "Watch for sales — Screwfix and Toolstation regularly discount power tool kits. Buy a twin pack combi + impact and save 20-30%.",
  },
  {
    phase: "Year 3+ — Professional Kit",
    budget: "£800-1500",
    items: [
      "Multifunction tester (MFT)",
      "PAT tester (if doing PAT work)",
      "Clamp meter",
      "Angle grinder",
      "Reciprocating saw",
      "Laser level",
      "Inspection camera",
      "Full SDS bit set",
      "Cable label printer",
    ],
    tip: "Your MFT is your biggest purchase. Do not buy the cheapest option — buy the best you can afford and get it calibrated before your first job.",
  },
];

export const suppliersTip =
  "Open a trade account at your nearest CEF or Edmundson — the prices are significantly better than retail. Ask about apprentice discounts — many wholesalers offer them. Build relationships with your local branch staff — they will look after you.";
