import { WorkerType, MaterialItem, EquipmentItem } from "@/types/quote";

export const workerTypes: WorkerType[] = [
  {
    id: "electrician",
    name: "Qualified Electrician",
    category: "labour",
    defaultHourlyRate: 45.00,
    description: "Fully qualified electrician with 18th Edition certification"
  },
  {
    id: "apprentice",
    name: "Apprentice Electrician",
    category: "labour", 
    defaultHourlyRate: 25.00,
    description: "Apprentice electrician under supervision"
  },
  {
    id: "labourer",
    name: "General Labourer",
    category: "labour",
    defaultHourlyRate: 20.00,
    description: "General building labourer for preparation work"
  },
  {
    id: "designer",
    name: "Electrical Designer",
    category: "labour",
    defaultHourlyRate: 65.00,
    description: "Electrical design and planning specialist"
  },
  {
    id: "owner",
    name: "Business Owner",
    category: "labour",
    defaultHourlyRate: 75.00,
    description: "Business owner / senior electrician"
  },
  {
    id: "testing",
    name: "Testing Engineer", 
    category: "labour",
    defaultHourlyRate: 55.00,
    description: "Electrical testing and inspection specialist"
  }
];

export const materialCategories = [
  {
    id: "cables",
    name: "Cables & Wiring",
    subcategories: ["Twin & Earth", "Armoured Cable", "Flex Cable", "Data Cable", "Coaxial Cable"]
  },
  {
    id: "accessories",
    name: "Accessories",
    subcategories: ["Sockets", "Switches", "Dimmers", "USB Outlets", "Spurs"]
  },
  {
    id: "distribution",
    name: "Distribution",
    subcategories: ["Consumer Units", "MCBs", "RCDs", "RCBOs", "Isolators"]
  },
  {
    id: "lighting",
    name: "Lighting",
    subcategories: ["LED Downlights", "Ceiling Lights", "Wall Lights", "Emergency Lighting", "Outdoor Lighting"]
  },
  {
    id: "containment",
    name: "Containment",
    subcategories: ["Conduit", "Trunking", "Cable Tray", "Traywork", "Clips & Fixings"]
  },
  {
    id: "heating",
    name: "Heating",
    subcategories: ["Electric Radiators", "Underfloor Heating", "Storage Heaters", "Towel Rails", "Thermostats"]
  }
];

export const commonMaterials: MaterialItem[] = [
  // Cables
  {
    id: "cable-te-2.5",
    name: "2.5mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.85,
    code: "TE2.5"
  },
  {
    id: "cable-te-1.5",
    name: "1.5mm² Twin & Earth Cable", 
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.25,
    code: "TE1.5"
  },
  {
    id: "cable-te-6.0",
    name: "6.0mm² Twin & Earth Cable",
    category: "cables", 
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 4.50,
    code: "TE6.0"
  },
  // Accessories
  {
    id: "socket-13a-dp",
    name: "13A DP Switched Socket",
    category: "accessories",
    subcategory: "Sockets",
    unit: "each",
    defaultPrice: 8.50,
    code: "SKT13DP"
  },
  {
    id: "switch-1g-2w",
    name: "1 Gang 2 Way Light Switch",
    category: "accessories", 
    subcategory: "Switches",
    unit: "each",
    defaultPrice: 6.25,
    code: "SW1G2W"
  },
  {
    id: "usb-socket",
    name: "USB Socket Outlet",
    category: "accessories",
    subcategory: "USB Outlets", 
    unit: "each",
    defaultPrice: 15.50,
    code: "USBSKT"
  },
  // Distribution
  {
    id: "mcb-32a-b",
    name: "32A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each", 
    defaultPrice: 12.50,
    code: "MCB32B"
  },
  {
    id: "rcd-30ma",
    name: "30mA RCD",
    category: "distribution",
    subcategory: "RCDs",
    unit: "each",
    defaultPrice: 45.00,
    code: "RCD30"
  },
  // Lighting
  {
    id: "led-downlight",
    name: "LED Downlight 10W",
    category: "lighting",
    subcategory: "LED Downlights",
    unit: "each",
    defaultPrice: 18.50,
    code: "LED10W"
  }
];

export const equipmentCategories = [
  {
    id: "testing",
    name: "Testing Equipment", 
    items: ["Multifunction Tester", "PAT Tester", "Insulation Tester", "Continuity Tester"]
  },
  {
    id: "power-tools", 
    name: "Power Tools",
    items: ["SDS Drill", "Core Drill", "Angle Grinder", "Reciprocating Saw", "Circular Saw"]
  },
  {
    id: "access",
    name: "Access Equipment",
    items: ["Tower Scaffold", "Ladder", "Platform Steps", "Cherry Picker", "Scaffolding"]
  },
  {
    id: "cable-tools",
    name: "Cable Tools", 
    items: ["Cable Puller", "Fish Tape", "Cable Drum Stand", "Cable Stripper", "Crimping Tool"]
  }
];

export const commonEquipment: EquipmentItem[] = [
  {
    id: "multifunction-tester",
    name: "Multifunction Tester",
    category: "testing",
    unit: "day",
    dailyRate: 25.00,
    weeklyRate: 125.00,
    monthlyRate: 400.00,
    description: "Megger or Kewtech multifunction tester"
  },
  {
    id: "sds-drill",
    name: "SDS Drill with Bits",
    category: "power-tools", 
    unit: "day",
    dailyRate: 15.00,
    weeklyRate: 75.00,
    monthlyRate: 250.00,
    description: "Heavy duty SDS drill with masonry bits"
  },
  {
    id: "core-drill",
    name: "Diamond Core Drill",
    category: "power-tools",
    unit: "day", 
    dailyRate: 35.00,
    weeklyRate: 175.00,
    monthlyRate: 600.00,
    description: "110V diamond core drill with bits"
  },
  {
    id: "tower-scaffold",
    name: "Mobile Tower Scaffold",
    category: "access",
    unit: "week",
    dailyRate: 45.00,
    weeklyRate: 200.00, 
    monthlyRate: 700.00,
    description: "3m working height mobile tower"
  },
  {
    id: "cable-puller",
    name: "Electric Cable Puller",
    category: "cable-tools",
    unit: "day",
    dailyRate: 20.00,
    weeklyRate: 100.00,
    monthlyRate: 350.00,
    description: "Electric cable pulling winch"
  }
];

export const labourPresets = [
  {
    description: "Socket installation (new circuit)",
    workerType: "electrician",
    hours: 3,
    notes: "Includes cable run and testing"
  },
  {
    description: "Consumer unit replacement",
    workerType: "electrician", 
    hours: 8,
    notes: "Full board change with testing and certification"
  },
  {
    description: "Light fitting installation",
    workerType: "electrician",
    hours: 1.5,
    notes: "Standard ceiling light with switch"
  },
  {
    description: "Kitchen ring circuit",
    workerType: "electrician",
    hours: 12,
    notes: "Complete kitchen ring with 6 sockets"
  },
  {
    description: "Electrical inspection (EICR)",
    workerType: "testing",
    hours: 6,
    notes: "Full property electrical inspection"
  }
];