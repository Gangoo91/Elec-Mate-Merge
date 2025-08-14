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
  // Cables & Wiring - 2025 UK Prices
  {
    id: "cable-te-1.0",
    name: "1.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.15,
    code: "TE1.0"
  },
  {
    id: "cable-te-1.5",
    name: "1.5mm² Twin & Earth Cable", 
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.35,
    code: "TE1.5"
  },
  {
    id: "cable-te-2.5",
    name: "2.5mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 2.05,
    code: "TE2.5"
  },
  {
    id: "cable-te-4.0",
    name: "4.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 3.25,
    code: "TE4.0"
  },
  {
    id: "cable-te-6.0",
    name: "6.0mm² Twin & Earth Cable",
    category: "cables", 
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 4.85,
    code: "TE6.0"
  },
  {
    id: "cable-te-10.0",
    name: "10.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth", 
    unit: "metre",
    defaultPrice: 8.50,
    code: "TE10.0"
  },
  {
    id: "cable-swa-2.5",
    name: "2.5mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 5.25,
    code: "SWA2.5"
  },
  {
    id: "cable-swa-4.0",
    name: "4.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 7.85,
    code: "SWA4.0"
  },
  {
    id: "cable-flex-1.5",
    name: "1.5mm² 3 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.85,
    code: "FLEX1.5"
  },
  {
    id: "cable-cat6",
    name: "Cat6 Data Cable",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre", 
    defaultPrice: 0.85,
    code: "CAT6"
  },
  {
    id: "cable-coax",
    name: "RG6 Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 1.25,
    code: "RG6"
  },

  // Accessories - 2025 UK Prices
  {
    id: "socket-13a-sp",
    name: "13A Single Pole Socket",
    category: "accessories",
    subcategory: "Sockets",
    unit: "each",
    defaultPrice: 6.50,
    code: "SKT13SP"
  },
  {
    id: "socket-13a-dp",
    name: "13A DP Switched Socket",
    category: "accessories",
    subcategory: "Sockets",
    unit: "each",
    defaultPrice: 9.25,
    code: "SKT13DP"
  },
  {
    id: "socket-13a-usb",
    name: "13A Socket with USB Charging",
    category: "accessories",
    subcategory: "USB Outlets", 
    unit: "each",
    defaultPrice: 18.50,
    code: "SKT13USB"
  },
  {
    id: "socket-usb-c",
    name: "USB-C Fast Charging Socket",
    category: "accessories",
    subcategory: "USB Outlets",
    unit: "each",
    defaultPrice: 25.50,
    code: "SKTUSBCFC"
  },
  {
    id: "switch-1g-1w",
    name: "1 Gang 1 Way Light Switch",
    category: "accessories",
    subcategory: "Switches", 
    unit: "each",
    defaultPrice: 5.25,
    code: "SW1G1W"
  },
  {
    id: "switch-1g-2w",
    name: "1 Gang 2 Way Light Switch",
    category: "accessories", 
    subcategory: "Switches",
    unit: "each",
    defaultPrice: 6.85,
    code: "SW1G2W"
  },
  {
    id: "switch-2g-2w",
    name: "2 Gang 2 Way Light Switch",
    category: "accessories",
    subcategory: "Switches",
    unit: "each",
    defaultPrice: 9.50,
    code: "SW2G2W"
  },
  {
    id: "dimmer-1g",
    name: "1 Gang LED Dimmer Switch",
    category: "accessories",
    subcategory: "Dimmers",
    unit: "each",
    defaultPrice: 15.25,
    code: "DIM1G"
  },
  {
    id: "dimmer-2g",
    name: "2 Gang LED Dimmer Switch", 
    category: "accessories",
    subcategory: "Dimmers",
    unit: "each",
    defaultPrice: 22.50,
    code: "DIM2G"
  },
  {
    id: "smart-switch",
    name: "Smart Light Switch (WiFi)",
    category: "accessories",
    subcategory: "Switches",
    unit: "each",
    defaultPrice: 35.00,
    code: "SWSMART"
  },
  {
    id: "spur-fused-13a",
    name: "13A Fused Connection Unit",
    category: "accessories",
    subcategory: "Spurs",
    unit: "each",
    defaultPrice: 8.50,
    code: "FCU13A"
  },

  // Distribution - 2025 UK Prices  
  {
    id: "consumer-unit-6w",
    name: "6 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 85.00,
    code: "CU6W"
  },
  {
    id: "consumer-unit-10w",
    name: "10 Way Consumer Unit (Metal)",
    category: "distribution", 
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 125.00,
    code: "CU10W"
  },
  {
    id: "consumer-unit-18w",
    name: "18 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 185.00,
    code: "CU18W"
  },
  {
    id: "mcb-6a-b",
    name: "6A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 8.50,
    code: "MCB6B"
  },
  {
    id: "mcb-16a-b",
    name: "16A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each", 
    defaultPrice: 9.25,
    code: "MCB16B"
  },
  {
    id: "mcb-20a-b",
    name: "20A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 9.75,
    code: "MCB20B"
  },
  {
    id: "mcb-32a-b",
    name: "32A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each", 
    defaultPrice: 13.50,
    code: "MCB32B"
  },
  {
    id: "mcb-40a-b",
    name: "40A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 15.25,
    code: "MCB40B"
  },
  {
    id: "mcb-50a-b",
    name: "50A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 18.50,
    code: "MCB50B"
  },
  {
    id: "rcd-30ma-63a",
    name: "30mA 63A RCD",
    category: "distribution",
    subcategory: "RCDs",
    unit: "each",
    defaultPrice: 52.00,
    code: "RCD30-63"
  },
  {
    id: "rcd-30ma-100a",
    name: "30mA 100A RCD",
    category: "distribution",
    subcategory: "RCDs",
    unit: "each",
    defaultPrice: 65.00,
    code: "RCD30-100"
  },
  {
    id: "rcbo-20a",
    name: "20A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs",
    unit: "each",
    defaultPrice: 28.50,
    code: "RCBO20"
  },
  {
    id: "rcbo-32a",
    name: "32A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs", 
    unit: "each",
    defaultPrice: 32.50,
    code: "RCBO32"
  },
  {
    id: "isolator-100a",
    name: "100A DP Isolator Switch",
    category: "distribution",
    subcategory: "Isolators",
    unit: "each",
    defaultPrice: 45.00,
    code: "ISO100DP"
  },

  // Lighting - 2025 UK Prices
  {
    id: "led-downlight-8w",
    name: "8W LED Downlight (Dimmable)",
    category: "lighting",
    subcategory: "LED Downlights",
    unit: "each",
    defaultPrice: 12.50,
    code: "LED8W"
  },
  {
    id: "led-downlight-12w",
    name: "12W LED Downlight (Dimmable)",
    category: "lighting",
    subcategory: "LED Downlights",
    unit: "each",
    defaultPrice: 18.50,
    code: "LED12W"
  },
  {
    id: "led-downlight-fire",
    name: "Fire Rated LED Downlight 10W",
    category: "lighting",
    subcategory: "LED Downlights",
    unit: "each",
    defaultPrice: 25.00,
    code: "LEDFIRE10W"
  },
  {
    id: "ceiling-rose",
    name: "Ceiling Rose (White)",
    category: "lighting",
    subcategory: "Ceiling Lights",
    unit: "each",
    defaultPrice: 4.50,
    code: "ROSE"
  },
  {
    id: "pendant-set",
    name: "Pendant Light Set",
    category: "lighting",
    subcategory: "Ceiling Lights",
    unit: "each",
    defaultPrice: 15.50,
    code: "PENDANT"
  },
  {
    id: "emergency-bulkhead",
    name: "LED Emergency Bulkhead 3W",
    category: "lighting",
    subcategory: "Emergency Lighting",
    unit: "each",
    defaultPrice: 35.00,
    code: "EMBULK3W"
  },
  {
    id: "exit-sign",
    name: "LED Exit Sign",
    category: "lighting",
    subcategory: "Emergency Lighting",
    unit: "each",
    defaultPrice: 28.50,
    code: "EXITSIGN"
  },
  {
    id: "outdoor-wall-light",
    name: "Outdoor Wall Light (PIR)",
    category: "lighting",
    subcategory: "Outdoor Lighting",
    unit: "each",
    defaultPrice: 42.00,
    code: "WALLPIR"
  },

  // Containment - 2025 UK Prices
  {
    id: "conduit-20mm",
    name: "20mm PVC Conduit",
    category: "containment",
    subcategory: "Conduit",
    unit: "metre",
    defaultPrice: 2.25,
    code: "CON20PVC"
  },
  {
    id: "conduit-25mm",
    name: "25mm PVC Conduit",
    category: "containment",
    subcategory: "Conduit",
    unit: "metre",
    defaultPrice: 2.85,
    code: "CON25PVC"
  },
  {
    id: "trunking-50x50",
    name: "50x50mm PVC Trunking",
    category: "containment",
    subcategory: "Trunking",
    unit: "metre",
    defaultPrice: 4.50,
    code: "TRK5050"
  },
  {
    id: "trunking-100x50",
    name: "100x50mm PVC Trunking",
    category: "containment",
    subcategory: "Trunking", 
    unit: "metre",
    defaultPrice: 7.25,
    code: "TRK10050"
  },
  {
    id: "cable-clips",
    name: "Cable Clips (Pack of 100)",
    category: "containment",
    subcategory: "Clips & Fixings",
    unit: "pack",
    defaultPrice: 12.50,
    code: "CLIPS100"
  },
  {
    id: "back-box-25mm",
    name: "25mm Metal Back Box",
    category: "containment",
    subcategory: "Clips & Fixings",
    unit: "each",
    defaultPrice: 2.85,
    code: "BB25M"
  },
  {
    id: "back-box-35mm",
    name: "35mm Metal Back Box",
    category: "containment", 
    subcategory: "Clips & Fixings",
    unit: "each",
    defaultPrice: 3.25,
    code: "BB35M"
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