import { WorkerType, MaterialItem, EquipmentItem } from "@/types/quote";
import { additionalMaterials } from "./materialsExpansion";

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
    subcategories: ["Twin & Earth", "Armoured Cable", "Flex Cable", "Data Cable", "Coaxial Cable", "MICC Cable", "Fire Resistant Cable", "Alarm Cable", "Speaker Cable", "Multicore Cable"]
  },
  {
    id: "accessories",
    name: "Accessories",
    subcategories: ["Sockets", "Switches", "Dimmers", "USB Outlets", "Spurs", "Smart Switches", "Sensor Switches", "Outdoor Sockets", "Industrial Sockets"]
  },
  {
    id: "distribution",
    name: "Distribution",
    subcategories: ["Consumer Units", "MCBs", "RCDs", "RCBOs", "Isolators", "Surge Protectors", "Time Clocks", "Contactors", "Phase Monitors", "Distribution Boards"]
  },
  {
    id: "lighting",
    name: "Lighting",
    subcategories: ["LED Downlights", "Ceiling Lights", "Wall Lights", "Emergency Lighting", "Outdoor Lighting", "Smart Lighting", "Track Lighting", "Festoon Lighting", "Strip Lighting", "Decorative Fittings"]
  },
  {
    id: "containment",
    name: "Containment",
    subcategories: ["Conduit", "Trunking", "Cable Tray", "Traywork", "Clips & Fixings", "Steel Conduit", "Flexible Conduit", "Dado Trunking", "Floor Boxes", "Cable Glands"]
  },
  {
    id: "heating",
    name: "Heating & HVAC",
    subcategories: ["Electric Radiators", "Underfloor Heating", "Storage Heaters", "Towel Rails", "Thermostats", "Electric Boilers", "Immersion Heaters", "Heat Pumps", "Fan Controllers", "Heating Controls"]
  },
  {
    id: "fire-safety",
    name: "Fire Safety & Detection",
    subcategories: ["Smoke Alarms", "Heat Detectors", "Fire Alarm Panels", "Emergency Lighting", "Fire Exit Signs", "Sounders & Strobes", "Call Points", "Fire Cables", "Smoke Detectors", "CO Detectors"]
  },
  {
    id: "security",
    name: "Security & Access Control",
    subcategories: ["Door Entry Systems", "CCTV Systems", "Burglar Alarms", "Access Keypads", "Intercom Systems", "Security Lighting", "PIR Sensors", "Magnetic Locks", "Door Contacts", "Control Panels"]
  },
  {
    id: "ev-charging",
    name: "EV Charging",
    subcategories: ["EV Charge Points", "Type 1 Cables", "Type 2 Cables", "Dedicated Supplies", "EV Isolators", "Earth Electrodes", "Load Management", "Smart Chargers", "Commercial Chargers", "Charging Pedestals"]
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy",
    subcategories: ["Solar Panels", "Inverters", "Battery Storage", "PV Switches", "Generation Meters", "DC Isolators", "Monitoring Systems", "Mounting Systems", "AC Isolators", "String Monitors"]
  },
  {
    id: "industrial",
    name: "Industrial & Commercial",
    subcategories: ["Contactors", "Motor Starters", "Transformers", "Busbar Systems", "Industrial Sockets", "DOL Starters", "Star Delta Starters", "Variable Speed Drives", "Power Factor Correction", "Switchgear"]
  },
  {
    id: "data-comms",
    name: "Data & Communications",
    subcategories: ["Network Equipment", "Fibre Optic Cables", "Telephone Systems", "Wi-Fi Access Points", "Network Cabinets", "Patch Panels", "RJ45 Connectors", "HDMI Systems", "AV Equipment", "Structured Cabling"]
  },
  {
    id: "specialist",
    name: "Specialist Systems",
    subcategories: ["Swimming Pool Equipment", "Garden Lighting", "Temporary Supplies", "Stage Lighting", "Agricultural Systems", "Caravan Supplies", "Boat Electrics", "Workshop Equipment", "Garage Supplies", "Shed Electrics"]
  },
  {
    id: "testing",
    name: "Testing & Certification",
    subcategories: ["Testing Equipment", "Certificates", "Inspection Tools", "PAT Testing", "RCD Testing", "Insulation Testing", "Earth Loop Testing", "Calibration", "Test Labels", "Compliance Documents"]
  },
  {
    id: "safety-ppe",
    name: "Safety & PPE",
    subcategories: ["Hard Hats", "Safety Boots", "High Vis Clothing", "Voltage Testers", "Lockout Devices", "Safety Signs", "First Aid Kits", "Protective Gloves", "Safety Glasses", "Rescue Equipment"]
  }
];

const baseMaterials: MaterialItem[] = [
  // =============== CABLES & WIRING (80 items) ===============
  // Twin & Earth Cables
  {
    id: "cable-te-0.5",
    name: "0.5mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.95,
    code: "TE0.5"
  },
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
    id: "cable-te-16.0",
    name: "16.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth", 
    unit: "metre",
    defaultPrice: 14.50,
    code: "TE16.0"
  },
  {
    id: "cable-te-25.0",
    name: "25.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth", 
    unit: "metre",
    defaultPrice: 22.50,
    code: "TE25.0"
  },

  // SWA Cables
  {
    id: "cable-swa-1.5-2c",
    name: "1.5mm² 2 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 3.85,
    code: "SWA1.5-2C"
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
    id: "cable-swa-6.0",
    name: "6.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 11.50,
    code: "SWA6.0"
  },
  {
    id: "cable-swa-10.0",
    name: "10.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 18.50,
    code: "SWA10.0"
  },
  {
    id: "cable-swa-16.0",
    name: "16.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 28.50,
    code: "SWA16.0"
  },

  // Flex Cables
  {
    id: "cable-flex-0.75",
    name: "0.75mm² 2 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.25,
    code: "FLEX0.75"
  },
  {
    id: "cable-flex-1.0",
    name: "1.0mm² 3 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.55,
    code: "FLEX1.0"
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
    id: "cable-flex-2.5",
    name: "2.5mm² 3 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 2.85,
    code: "FLEX2.5"
  },

  // Data Cables
  {
    id: "cable-cat5e",
    name: "Cat5e Data Cable (305m Box)",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box", 
    defaultPrice: 85.00,
    code: "CAT5E"
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
    id: "cable-cat6a",
    name: "Cat6a Data Cable (305m Box)",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box", 
    defaultPrice: 185.00,
    code: "CAT6A"
  },
  {
    id: "cable-fibre-om3",
    name: "OM3 Fibre Optic Cable",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre", 
    defaultPrice: 3.50,
    code: "FBR-OM3"
  },

  // Fire Resistant Cables
  {
    id: "cable-fire-1.5",
    name: "1.5mm² Fire Resistant Cable",
    category: "cables",
    subcategory: "Fire Resistant Cable",
    unit: "metre",
    defaultPrice: 4.25,
    code: "FRC1.5"
  },
  {
    id: "cable-fire-2.5",
    name: "2.5mm² Fire Resistant Cable",
    category: "cables",
    subcategory: "Fire Resistant Cable",
    unit: "metre",
    defaultPrice: 6.85,
    code: "FRC2.5"
  },

  // Alarm & Speaker Cables
  {
    id: "cable-alarm-6c",
    name: "6 Core Alarm Cable",
    category: "cables",
    subcategory: "Alarm Cable",
    unit: "metre",
    defaultPrice: 1.85,
    code: "ALM6C"
  },
  {
    id: "cable-speaker-4mm",
    name: "4mm² Speaker Cable",
    category: "cables",
    subcategory: "Speaker Cable",
    unit: "metre",
    defaultPrice: 2.25,
    code: "SPK4MM"
  },

  // Coaxial Cables
  {
    id: "cable-coax",
    name: "RG6 Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 1.25,
    code: "RG6"
  },
  {
    id: "cable-sat",
    name: "Satellite Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 1.85,
    code: "SATCX"
  },

  // =============== ACCESSORIES (90 items) ===============
  // Standard Sockets
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
    id: "socket-13a-dp-metal",
    name: "13A DP Socket (Brushed Steel)",
    category: "accessories",
    subcategory: "Sockets",
    unit: "each",
    defaultPrice: 18.50,
    code: "SKT13DPMTL"
  },
  {
    id: "socket-double-13a",
    name: "Double 13A Socket Switched",
    category: "accessories",
    subcategory: "Sockets",
    unit: "each",
    defaultPrice: 12.50,
    code: "SKT2G13A"
  },
  {
    id: "socket-double-usb",
    name: "Double Socket with Twin USB",
    category: "accessories",
    subcategory: "Sockets",
    unit: "each",
    defaultPrice: 22.50,
    code: "SKT2GUSB"
  },

  // USB Outlets
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
    id: "socket-usb-only",
    name: "Twin USB Charging Point",
    category: "accessories",
    subcategory: "USB Outlets",
    unit: "each",
    defaultPrice: 15.50,
    code: "SKTUSBONLY"
  },
  {
    id: "socket-usb-c-pd",
    name: "USB-C PD 65W Charging Socket",
    category: "accessories",
    subcategory: "USB Outlets",
    unit: "each",
    defaultPrice: 42.50,
    code: "SKTUSBCPD"
  },

  // Switches
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
    id: "switch-1g-int",
    name: "1 Gang Intermediate Switch",
    category: "accessories", 
    subcategory: "Switches",
    unit: "each",
    defaultPrice: 8.50,
    code: "SW1GINT"
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
    id: "switch-3g-2w",
    name: "3 Gang 2 Way Light Switch",
    category: "accessories",
    subcategory: "Switches",
    unit: "each",
    defaultPrice: 14.50,
    code: "SW3G2W"
  },
  {
    id: "switch-4g-2w",
    name: "4 Gang 2 Way Light Switch",
    category: "accessories",
    subcategory: "Switches",
    unit: "each",
    defaultPrice: 18.50,
    code: "SW4G2W"
  },

  // Smart Switches
  {
    id: "smart-switch",
    name: "Smart Light Switch (WiFi)",
    category: "accessories",
    subcategory: "Smart Switches",
    unit: "each",
    defaultPrice: 35.00,
    code: "SWSMART"
  },
  {
    id: "smart-switch-2g",
    name: "2 Gang Smart Switch (WiFi)",
    category: "accessories",
    subcategory: "Smart Switches",
    unit: "each",
    defaultPrice: 55.00,
    code: "SWSMART2G"
  },
  {
    id: "smart-dimmer",
    name: "Smart Dimmer Switch (WiFi)",
    category: "accessories",
    subcategory: "Smart Switches",
    unit: "each",
    defaultPrice: 45.00,
    code: "DIMMSMART"
  },

  // Dimmers
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
    id: "dimmer-rotary",
    name: "Rotary LED Dimmer 400W",
    category: "accessories",
    subcategory: "Dimmers",
    unit: "each",
    defaultPrice: 18.50,
    code: "DIMROT400"
  },

  // Spurs
  {
    id: "spur-fused-13a",
    name: "13A Fused Connection Unit",
    category: "accessories",
    subcategory: "Spurs",
    unit: "each",
    defaultPrice: 8.50,
    code: "FCU13A"
  },
  {
    id: "spur-fused-20a",
    name: "20A Fused Connection Unit",
    category: "accessories",
    subcategory: "Spurs",
    unit: "each",
    defaultPrice: 12.50,
    code: "FCU20A"
  },
  {
    id: "spur-unfused",
    name: "Unfused Connection Unit",
    category: "accessories",
    subcategory: "Spurs",
    unit: "each",
    defaultPrice: 6.50,
    code: "FCUUNF"
  },

  // Outdoor Sockets
  {
    id: "socket-outdoor-13a",
    name: "IP66 Outdoor 13A Socket",
    category: "accessories",
    subcategory: "Outdoor Sockets",
    unit: "each",
    defaultPrice: 28.50,
    code: "SKTOUT13A"
  },
  {
    id: "socket-commando-16a",
    name: "16A Commando Socket Blue",
    category: "accessories",
    subcategory: "Industrial Sockets",
    unit: "each",
    defaultPrice: 35.00,
    code: "SKTCOM16A"
  },
  {
    id: "socket-commando-32a",
    name: "32A Commando Socket Red",
    category: "accessories",
    subcategory: "Industrial Sockets",
    unit: "each",
    defaultPrice: 55.00,
    code: "SKTCOM32A"
  },

  // Sensor Switches
  {
    id: "switch-pir",
    name: "PIR Motion Sensor Switch",
    category: "accessories",
    subcategory: "Sensor Switches",
    unit: "each",
    defaultPrice: 25.50,
    code: "SWPIR"
  },
  {
    id: "switch-microwave",
    name: "Microwave Sensor Switch",
    category: "accessories",
    subcategory: "Sensor Switches",
    unit: "each",
    defaultPrice: 32.50,
    code: "SWMWAVE"
  },

  // =============== DISTRIBUTION (60 items) ===============
  // Consumer Units
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

// Merge base materials with additional materials to create comprehensive database (400+ items)
// Ensure unique IDs by suffixing duplicates with variant info from name or '-v2'
const createUniqueMaterials = (base: MaterialItem[], extras: MaterialItem[]): MaterialItem[] => {
  const existing = new Set(base.map(m => m.id));

  const makeUniqueId = (origId: string, name: string) => {
    const packaging = name.match(/\(([^)]+)\)/)?.[1]?.replace(/\s+/g, '').toLowerCase() || 'v2';
    let newId = `${origId}-${packaging}`;
    let i = 2;
    while (existing.has(newId)) {
      newId = `${origId}-${packaging}-${i++}`;
    }
    return newId;
  };

  const adjustedExtras = extras.map(m => {
    let id = m.id;
    if (existing.has(id)) {
      id = makeUniqueId(id, m.name);
    }
    existing.add(id);
    return { ...m, id };
  });

  return [...base, ...adjustedExtras];
};

const allMaterials = createUniqueMaterials(baseMaterials, additionalMaterials);

// Export the comprehensive materials list
export { allMaterials as commonMaterials };