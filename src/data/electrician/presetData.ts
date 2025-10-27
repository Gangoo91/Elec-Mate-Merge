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
    subcategories: ["Twin & Earth", "3-Core & Earth", "Armoured Cable", "Flex Cable", "Single Core", "Data Cable", "Coaxial Cable", "Meter Tails", "Earth Cable", "Fire Resistant Cable", "Fire Alarm Cable", "Telephone Cable", "Alarm Cable", "Speaker Cable", "Multicore Cable"]
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
    defaultPrice: 0.42,
    code: "TE0.5"
  },
  {
    id: "cable-te-1.0",
    name: "1.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.65,
    code: "TE1.0"
  },
  {
    id: "cable-te-1.5",
    name: "1.5mm² Twin & Earth Cable", 
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.82,
    code: "TE1.5"
  },
  {
    id: "cable-te-2.5",
    name: "2.5mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.05,
    code: "TE2.5"
  },
  {
    id: "cable-te-4.0",
    name: "4.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.92,
    code: "TE4.0"
  },
  {
    id: "cable-te-6.0",
    name: "6.0mm² Twin & Earth Cable",
    category: "cables", 
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 2.82,
    code: "TE6.0"
  },
  {
    id: "cable-te-10.0",
    name: "10.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth", 
    unit: "metre",
    defaultPrice: 4.85,
    code: "TE10.0"
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
    defaultPrice: 3.15,
    code: "SWA2.5"
  },
  {
    id: "cable-swa-4.0",
    name: "4.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 4.42,
    code: "SWA4.0"
  },
  {
    id: "cable-swa-6.0",
    name: "6.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 6.75,
    code: "SWA6.0"
  },
  {
    id: "cable-swa-10.0",
    name: "10.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 11.35,
    code: "SWA10.0"
  },
  {
    id: "cable-swa-16.0",
    name: "16.0mm² 3 Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable", 
    unit: "metre",
    defaultPrice: 18.05,
    code: "SWA16.0"
  },

  // Flex Cables
  {
    id: "cable-flex-0.75",
    name: "0.75mm² 2 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.42,
    code: "FLEX0.75-2C"
  },
  {
    id: "cable-flex-1.0",
    name: "1.0mm² 3 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.70,
    code: "FLEX1.0-3C"
  },
  {
    id: "cable-flex-1.5",
    name: "1.5mm² 3 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.85,
    code: "FLEX1.5-3C"
  },
  {
    id: "cable-flex-2.5",
    name: "2.5mm² 3 Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.18,
    code: "FLEX2.5-3C"
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
    defaultPrice: 0.42,
    code: "CAT6"
  },
  {
    id: "cable-cat6a",
    name: "Cat6a Data Cable (305m Box)",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box", 
    defaultPrice: 168.00,
    code: "CAT6A"
  },
  {
    id: "cable-fibre-om3",
    name: "OM3 Fibre Optic Cable",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre", 
    defaultPrice: 3.45,
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
    defaultPrice: 0.82,
    code: "ALM6C"
  },
  {
    id: "cable-speaker-2.5mm",
    name: "2.5mm² Speaker Cable",
    category: "cables",
    subcategory: "Speaker Cable",
    unit: "metre",
    defaultPrice: 1.15,
    code: "SPK2.5MM"
  },

  // Coaxial Cables
  {
    id: "cable-coax",
    name: "RG6 Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.58,
    code: "RG6"
  },
  {
    id: "cable-sat",
    name: "Satellite Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.72,
    code: "SATCX"
  },

  // =============== 300 NEW CABLES - SEPTEMBER 2025 PRICING ===============
  
  // Twin & Earth - Coils & Drums
  {
    id: "cable-te-1.0-100m",
    name: "1.0mm² Twin & Earth 100m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 58.00,
    code: "TE1.0-100M"
  },
  {
    id: "cable-te-1.0-50m",
    name: "1.0mm² Twin & Earth 50m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 30.50,
    code: "TE1.0-50M"
  },
  {
    id: "cable-te-1.0-25m",
    name: "1.0mm² Twin & Earth 25m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 15.85,
    code: "TE1.0-25M"
  },
  {
    id: "cable-te-1.5-100m",
    name: "1.5mm² Twin & Earth 100m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 75.00,
    code: "TE1.5-100M"
  },
  {
    id: "cable-te-1.5-50m",
    name: "1.5mm² Twin & Earth 50m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 39.50,
    code: "TE1.5-50M"
  },
  {
    id: "cable-te-1.5-25m",
    name: "1.5mm² Twin & Earth 25m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 20.25,
    code: "TE1.5-25M"
  },
  {
    id: "cable-te-2.5-100m",
    name: "2.5mm² Twin & Earth 100m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 95.00,
    code: "TE2.5-100M"
  },
  {
    id: "cable-te-2.5-50m",
    name: "2.5mm² Twin & Earth 50m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 50.00,
    code: "TE2.5-50M"
  },
  {
    id: "cable-te-2.5-25m",
    name: "2.5mm² Twin & Earth 25m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 25.50,
    code: "TE2.5-25M"
  },
  {
    id: "cable-te-4.0-100m",
    name: "4.0mm² Twin & Earth 100m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 175.00,
    code: "TE4.0-100M"
  },
  {
    id: "cable-te-4.0-50m",
    name: "4.0mm² Twin & Earth 50m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 92.00,
    code: "TE4.0-50M"
  },
  {
    id: "cable-te-4.0-25m",
    name: "4.0mm² Twin & Earth 25m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 47.50,
    code: "TE4.0-25M"
  },
  {
    id: "cable-te-6.0-100m",
    name: "6.0mm² Twin & Earth 100m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 260.00,
    code: "TE6.0-100M"
  },
  {
    id: "cable-te-6.0-50m",
    name: "6.0mm² Twin & Earth 50m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 138.00,
    code: "TE6.0-50M"
  },
  {
    id: "cable-te-6.0-25m",
    name: "6.0mm² Twin & Earth 25m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 70.00,
    code: "TE6.0-25M"
  },
  {
    id: "cable-te-10.0-100m",
    name: "10.0mm² Twin & Earth 100m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 450.00,
    code: "TE10.0-100M"
  },
  {
    id: "cable-te-10.0-50m",
    name: "10.0mm² Twin & Earth 50m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 240.00,
    code: "TE10.0-50M"
  },
  {
    id: "cable-te-10.0-25m",
    name: "10.0mm² Twin & Earth 25m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 121.50,
    code: "TE10.0-25M"
  },
  {
    id: "cable-te-0.75-100m",
    name: "0.75mm² Twin & Earth 100m Coil",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "coil",
    defaultPrice: 48.00,
    code: "TE0.75-100M"
  },
  {
    id: "cable-te-0.75",
    name: "0.75mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.55,
    code: "TE0.75"
  },

  // LSF/LSZH Twin & Earth
  {
    id: "cable-te-1.5-lszh",
    name: "1.5mm² LSZH Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.15,
    code: "TE1.5-LSZH"
  },
  {
    id: "cable-te-2.5-lszh",
    name: "2.5mm² LSZH Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.45,
    code: "TE2.5-LSZH"
  },
  {
    id: "cable-te-4.0-lszh",
    name: "4.0mm² LSZH Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 2.65,
    code: "TE4.0-LSZH"
  },
  {
    id: "cable-te-6.0-lszh",
    name: "6.0mm² LSZH Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 3.95,
    code: "TE6.0-LSZH"
  },
  {
    id: "cable-te-10.0-lszh",
    name: "10.0mm² LSZH Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 6.85,
    code: "TE10.0-LSZH"
  },
  {
    id: "cable-te-1.5-lsf",
    name: "1.5mm² LSF Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.05,
    code: "TE1.5-LSF"
  },
  {
    id: "cable-te-2.5-lsf",
    name: "2.5mm² LSF Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.35,
    code: "TE2.5-LSF"
  },
  {
    id: "cable-te-4.0-lsf",
    name: "4.0mm² LSF Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 2.45,
    code: "TE4.0-LSF"
  },
  {
    id: "cable-te-6.0-lsf",
    name: "6.0mm² LSF Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 3.65,
    code: "TE6.0-LSF"
  },
  {
    id: "cable-te-10.0-lsf",
    name: "10.0mm² LSF Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 6.35,
    code: "TE10.0-LSF"
  },

  // Coloured Twin & Earth
  {
    id: "cable-te-1.0-white",
    name: "1.0mm² White Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.72,
    code: "TE1.0-WHT"
  },
  {
    id: "cable-te-1.5-white",
    name: "1.5mm² White Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.92,
    code: "TE1.5-WHT"
  },
  {
    id: "cable-te-2.5-white",
    name: "2.5mm² White Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.18,
    code: "TE2.5-WHT"
  },
  {
    id: "cable-te-1.0-brown",
    name: "1.0mm² Brown Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.75,
    code: "TE1.0-BRN"
  },
  {
    id: "cable-te-1.5-brown",
    name: "1.5mm² Brown Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.95,
    code: "TE1.5-BRN"
  },
  {
    id: "cable-te-2.5-brown",
    name: "2.5mm² Brown Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.22,
    code: "TE2.5-BRN"
  },
  {
    id: "cable-te-1.0-black",
    name: "1.0mm² Black Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.75,
    code: "TE1.0-BLK"
  },
  {
    id: "cable-te-1.5-black",
    name: "1.5mm² Black Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 0.95,
    code: "TE1.5-BLK"
  },
  {
    id: "cable-te-2.5-black",
    name: "2.5mm² Black Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.22,
    code: "TE2.5-BLK"
  },
  {
    id: "cable-te-4.0-white",
    name: "4.0mm² White Twin & Earth",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 2.15,
    code: "TE4.0-WHT"
  },

  // 3-Core & Earth Cables
  {
    id: "cable-3ce-1.0",
    name: "1.0mm² 3-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 0.92,
    code: "3CE1.0"
  },
  {
    id: "cable-3ce-1.5",
    name: "1.5mm² 3-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 1.18,
    code: "3CE1.5"
  },
  {
    id: "cable-3ce-2.5",
    name: "2.5mm² 3-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 1.62,
    code: "3CE2.5"
  },
  {
    id: "cable-3ce-4.0",
    name: "4.0mm² 3-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 2.82,
    code: "3CE4.0"
  },
  {
    id: "cable-3ce-6.0",
    name: "6.0mm² 3-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 4.45,
    code: "3CE6.0"
  },
  {
    id: "cable-3ce-1.0-100m",
    name: "1.0mm² 3-Core & Earth 100m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 85.00,
    code: "3CE1.0-100M"
  },
  {
    id: "cable-3ce-1.5-100m",
    name: "1.5mm² 3-Core & Earth 100m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 108.00,
    code: "3CE1.5-100M"
  },
  {
    id: "cable-3ce-2.5-100m",
    name: "2.5mm² 3-Core & Earth 100m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 148.00,
    code: "3CE2.5-100M"
  },
  {
    id: "cable-3ce-4.0-50m",
    name: "4.0mm² 3-Core & Earth 50m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 130.00,
    code: "3CE4.0-50M"
  },
  {
    id: "cable-3ce-6.0-50m",
    name: "6.0mm² 3-Core & Earth 50m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 210.00,
    code: "3CE6.0-50M"
  },
  {
    id: "cable-3ce-1.0-50m",
    name: "1.0mm² 3-Core & Earth 50m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 44.50,
    code: "3CE1.0-50M"
  },
  {
    id: "cable-3ce-1.5-50m",
    name: "1.5mm² 3-Core & Earth 50m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 56.50,
    code: "3CE1.5-50M"
  },

  // LSZH 3-Core & Earth
  {
    id: "cable-3ce-1.5-lszh",
    name: "1.5mm² LSZH 3-Core & Earth",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 1.58,
    code: "3CE1.5-LSZH"
  },
  {
    id: "cable-3ce-2.5-lszh",
    name: "2.5mm² LSZH 3-Core & Earth",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 2.15,
    code: "3CE2.5-LSZH"
  },
  {
    id: "cable-3ce-4.0-lszh",
    name: "4.0mm² LSZH 3-Core & Earth",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 3.65,
    code: "3CE4.0-LSZH"
  },
  {
    id: "cable-3ce-1.5-lszh-100m",
    name: "1.5mm² LSZH 3C&E 100m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 145.00,
    code: "3CE1.5-LSZH-100M"
  },
  {
    id: "cable-3ce-2.5-lszh-100m",
    name: "2.5mm² LSZH 3C&E 100m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 198.00,
    code: "3CE2.5-LSZH-100M"
  },
  {
    id: "cable-3ce-4.0-lszh-50m",
    name: "4.0mm² LSZH 3C&E 50m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 172.00,
    code: "3CE4.0-LSZH-50M"
  },
  {
    id: "cable-3ce-1.0-white",
    name: "1.0mm² White 3-Core & Earth",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 1.05,
    code: "3CE1.0-WHT"
  },
  {
    id: "cable-3ce-1.5-white",
    name: "1.5mm² White 3-Core & Earth",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 1.32,
    code: "3CE1.5-WHT"
  },

  // 4-Core & Earth
  {
    id: "cable-4ce-1.5",
    name: "1.5mm² 4-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 1.58,
    code: "4CE1.5"
  },
  {
    id: "cable-4ce-2.5",
    name: "2.5mm² 4-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 2.15,
    code: "4CE2.5"
  },
  {
    id: "cable-4ce-4.0",
    name: "4.0mm² 4-Core & Earth Cable",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "metre",
    defaultPrice: 3.68,
    code: "4CE4.0"
  },
  {
    id: "cable-4ce-1.5-50m",
    name: "1.5mm² 4-Core & Earth 50m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 75.00,
    code: "4CE1.5-50M"
  },
  {
    id: "cable-4ce-2.5-50m",
    name: "2.5mm² 4-Core & Earth 50m Coil",
    category: "cables",
    subcategory: "3-Core & Earth",
    unit: "coil",
    defaultPrice: 102.00,
    code: "4CE2.5-50M"
  },

  // 2-Core SWA Additional
  {
    id: "cable-swa-1.0-2c",
    name: "1.0mm² 2-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 1.95,
    code: "SWA1.0-2C"
  },
  {
    id: "cable-swa-2.5-2c",
    name: "2.5mm² 2-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 2.75,
    code: "SWA2.5-2C"
  },
  {
    id: "cable-swa-4.0-2c",
    name: "4.0mm² 2-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 3.45,
    code: "SWA4.0-2C"
  },
  {
    id: "cable-swa-6.0-2c",
    name: "6.0mm² 2-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 5.15,
    code: "SWA6.0-2C"
  },
  {
    id: "cable-swa-10.0-2c",
    name: "10.0mm² 2-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 8.35,
    code: "SWA10.0-2C"
  },
  {
    id: "cable-swa-16.0-2c",
    name: "16.0mm² 2-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 14.25,
    code: "SWA16.0-2C"
  },
  {
    id: "cable-swa-25.0-2c",
    name: "25.0mm² 2-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 22.50,
    code: "SWA25.0-2C"
  },
  {
    id: "cable-swa-1.5-2c-50m",
    name: "1.5mm² 2-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 98.00,
    code: "SWA1.5-2C-50M"
  },
  {
    id: "cable-swa-2.5-2c-50m",
    name: "2.5mm² 2-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 130.00,
    code: "SWA2.5-2C-50M"
  },
  {
    id: "cable-swa-4.0-2c-50m",
    name: "4.0mm² 2-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 165.00,
    code: "SWA4.0-2C-50M"
  },
  {
    id: "cable-swa-6.0-2c-25m",
    name: "6.0mm² 2-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 125.00,
    code: "SWA6.0-2C-25M"
  },
  {
    id: "cable-swa-10.0-2c-25m",
    name: "10.0mm² 2-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 202.00,
    code: "SWA10.0-2C-25M"
  },
  {
    id: "cable-swa-1.0-2c-100m",
    name: "1.0mm² 2-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 182.00,
    code: "SWA1.0-2C-100M"
  },
  {
    id: "cable-swa-1.5-2c-100m",
    name: "1.5mm² 2-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 195.00,
    code: "SWA1.5-2C-100M"
  },

  // 3-Core SWA Additional
  {
    id: "cable-swa-1.0-3c",
    name: "1.0mm² 3-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 2.18,
    code: "SWA1.0-3C"
  },
  {
    id: "cable-swa-1.5-3c",
    name: "1.5mm² 3-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 2.42,
    code: "SWA1.5-3C"
  },
  {
    id: "cable-swa-25.0-3c",
    name: "25.0mm² 3-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 28.50,
    code: "SWA25.0-3C"
  },
  {
    id: "cable-swa-35.0-3c",
    name: "35.0mm² 3-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 42.00,
    code: "SWA35.0-3C"
  },
  {
    id: "cable-swa-50.0-3c",
    name: "50.0mm² 3-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 65.00,
    code: "SWA50.0-3C"
  },
  {
    id: "cable-swa-1.5-3c-50m",
    name: "1.5mm² 3-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 115.00,
    code: "SWA1.5-3C-50M"
  },
  {
    id: "cable-swa-2.5-3c-50m",
    name: "2.5mm² 3-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 150.00,
    code: "SWA2.5-3C-50M"
  },
  {
    id: "cable-swa-4.0-3c-50m",
    name: "4.0mm² 3-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 212.00,
    code: "SWA4.0-3C-50M"
  },
  {
    id: "cable-swa-6.0-3c-50m",
    name: "6.0mm² 3-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 325.00,
    code: "SWA6.0-3C-50M"
  },
  {
    id: "cable-swa-10.0-3c-25m",
    name: "10.0mm² 3-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 275.00,
    code: "SWA10.0-3C-25M"
  },
  {
    id: "cable-swa-16.0-3c-25m",
    name: "16.0mm² 3-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 440.00,
    code: "SWA16.0-3C-25M"
  },
  {
    id: "cable-swa-1.0-3c-100m",
    name: "1.0mm² 3-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 205.00,
    code: "SWA1.0-3C-100M"
  },
  {
    id: "cable-swa-1.5-3c-100m",
    name: "1.5mm² 3-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 228.00,
    code: "SWA1.5-3C-100M"
  },
  {
    id: "cable-swa-2.5-3c-100m",
    name: "2.5mm² 3-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 298.00,
    code: "SWA2.5-3C-100M"
  },
  {
    id: "cable-swa-4.0-3c-100m",
    name: "4.0mm² 3-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 418.00,
    code: "SWA4.0-3C-100M"
  },

  // 4-Core SWA
  {
    id: "cable-swa-1.0-4c",
    name: "1.0mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 2.52,
    code: "SWA1.0-4C"
  },
  {
    id: "cable-swa-1.5-4c",
    name: "1.5mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 2.85,
    code: "SWA1.5-4C"
  },
  {
    id: "cable-swa-2.5-4c",
    name: "2.5mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 3.75,
    code: "SWA2.5-4C"
  },
  {
    id: "cable-swa-4.0-4c",
    name: "4.0mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 5.45,
    code: "SWA4.0-4C"
  },
  {
    id: "cable-swa-6.0-4c",
    name: "6.0mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 8.45,
    code: "SWA6.0-4C"
  },
  {
    id: "cable-swa-10.0-4c",
    name: "10.0mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 14.15,
    code: "SWA10.0-4C"
  },
  {
    id: "cable-swa-16.0-4c",
    name: "16.0mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 22.35,
    code: "SWA16.0-4C"
  },
  {
    id: "cable-swa-25.0-4c",
    name: "25.0mm² 4-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 35.50,
    code: "SWA25.0-4C"
  },
  {
    id: "cable-swa-1.5-4c-50m",
    name: "1.5mm² 4-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 137.00,
    code: "SWA1.5-4C-50M"
  },
  {
    id: "cable-swa-2.5-4c-50m",
    name: "2.5mm² 4-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 180.00,
    code: "SWA2.5-4C-50M"
  },
  {
    id: "cable-swa-4.0-4c-50m",
    name: "4.0mm² 4-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 262.00,
    code: "SWA4.0-4C-50M"
  },
  {
    id: "cable-swa-6.0-4c-25m",
    name: "6.0mm² 4-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 205.00,
    code: "SWA6.0-4C-25M"
  },
  {
    id: "cable-swa-10.0-4c-25m",
    name: "10.0mm² 4-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 345.00,
    code: "SWA10.0-4C-25M"
  },
  {
    id: "cable-swa-1.0-4c-100m",
    name: "1.0mm² 4-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 238.00,
    code: "SWA1.0-4C-100M"
  },
  {
    id: "cable-swa-1.5-4c-100m",
    name: "1.5mm² 4-Core SWA 100m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 270.00,
    code: "SWA1.5-4C-100M"
  },

  // 5-Core SWA
  {
    id: "cable-swa-1.5-5c",
    name: "1.5mm² 5-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 3.35,
    code: "SWA1.5-5C"
  },
  {
    id: "cable-swa-2.5-5c",
    name: "2.5mm² 5-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 4.45,
    code: "SWA2.5-5C"
  },
  {
    id: "cable-swa-4.0-5c",
    name: "4.0mm² 5-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 6.65,
    code: "SWA4.0-5C"
  },
  {
    id: "cable-swa-6.0-5c",
    name: "6.0mm² 5-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 10.25,
    code: "SWA6.0-5C"
  },
  {
    id: "cable-swa-10.0-5c",
    name: "10.0mm² 5-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 17.50,
    code: "SWA10.0-5C"
  },
  {
    id: "cable-swa-16.0-5c",
    name: "16.0mm² 5-Core SWA Cable",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "metre",
    defaultPrice: 27.50,
    code: "SWA16.0-5C"
  },
  {
    id: "cable-swa-1.5-5c-50m",
    name: "1.5mm² 5-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 162.00,
    code: "SWA1.5-5C-50M"
  },
  {
    id: "cable-swa-2.5-5c-50m",
    name: "2.5mm² 5-Core SWA 50m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 215.00,
    code: "SWA2.5-5C-50M"
  },
  {
    id: "cable-swa-4.0-5c-25m",
    name: "4.0mm² 5-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 162.00,
    code: "SWA4.0-5C-25M"
  },
  {
    id: "cable-swa-6.0-5c-25m",
    name: "6.0mm² 5-Core SWA 25m Drum",
    category: "cables",
    subcategory: "Armoured Cable",
    unit: "drum",
    defaultPrice: 250.00,
    code: "SWA6.0-5C-25M"
  },

  // 2-Core Flex
  {
    id: "cable-flex-0.5-2c",
    name: "0.5mm² 2-Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.35,
    code: "FLEX0.5-2C"
  },
  {
    id: "cable-flex-1.0-2c",
    name: "1.0mm² 2-Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.52,
    code: "FLEX1.0-2C"
  },
  {
    id: "cable-flex-1.5-2c",
    name: "1.5mm² 2-Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.68,
    code: "FLEX1.5-2C"
  },
  {
    id: "cable-flex-2.5-2c",
    name: "2.5mm² 2-Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.95,
    code: "FLEX2.5-2C"
  },
  {
    id: "cable-flex-0.5-2c-100m",
    name: "0.5mm² 2-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 32.00,
    code: "FLEX0.5-2C-100M"
  },
  {
    id: "cable-flex-0.75-2c-100m",
    name: "0.75mm² 2-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 38.50,
    code: "FLEX0.75-2C-100M"
  },
  {
    id: "cable-flex-1.0-2c-100m",
    name: "1.0mm² 2-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 48.00,
    code: "FLEX1.0-2C-100M"
  },
  {
    id: "cable-flex-1.5-2c-50m",
    name: "1.5mm² 2-Core Flex 50m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 32.50,
    code: "FLEX1.5-2C-50M"
  },
  {
    id: "cable-flex-2.5-2c-50m",
    name: "2.5mm² 2-Core Flex 50m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 45.00,
    code: "FLEX2.5-2C-50M"
  },
  {
    id: "cable-flex-0.5-2c-white",
    name: "0.5mm² 2-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.38,
    code: "FLEX0.5-2C-WHT"
  },
  {
    id: "cable-flex-0.75-2c-white",
    name: "0.75mm² 2-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.45,
    code: "FLEX0.75-2C-WHT"
  },
  {
    id: "cable-flex-1.0-2c-white",
    name: "1.0mm² 2-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.55,
    code: "FLEX1.0-2C-WHT"
  },
  {
    id: "cable-flex-1.5-2c-white",
    name: "1.5mm² 2-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.72,
    code: "FLEX1.5-2C-WHT"
  },
  {
    id: "cable-flex-2.5-2c-white",
    name: "2.5mm² 2-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.02,
    code: "FLEX2.5-2C-WHT"
  },

  // 3-Core Flex Additional
  {
    id: "cable-flex-0.5-3c",
    name: "0.5mm² 3-Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.45,
    code: "FLEX0.5-3C"
  },
  {
    id: "cable-flex-0.75-3c",
    name: "0.75mm² 3-Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.55,
    code: "FLEX0.75-3C"
  },
  {
    id: "cable-flex-4.0-3c",
    name: "4.0mm² 3-Core Flex Cable",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.92,
    code: "FLEX4.0-3C"
  },
  {
    id: "cable-flex-0.5-3c-100m",
    name: "0.5mm² 3-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 41.00,
    code: "FLEX0.5-3C-100M"
  },
  {
    id: "cable-flex-0.75-3c-100m",
    name: "0.75mm² 3-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 50.00,
    code: "FLEX0.75-3C-100M"
  },
  {
    id: "cable-flex-1.0-3c-100m",
    name: "1.0mm² 3-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 64.00,
    code: "FLEX1.0-3C-100M"
  },
  {
    id: "cable-flex-1.5-3c-100m",
    name: "1.5mm² 3-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 78.00,
    code: "FLEX1.5-3C-100M"
  },
  {
    id: "cable-flex-2.5-3c-100m",
    name: "2.5mm² 3-Core Flex 100m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 108.00,
    code: "FLEX2.5-3C-100M"
  },
  {
    id: "cable-flex-4.0-3c-50m",
    name: "4.0mm² 3-Core Flex 50m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 92.00,
    code: "FLEX4.0-3C-50M"
  },
  {
    id: "cable-flex-0.75-3c-white",
    name: "0.75mm² 3-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.60,
    code: "FLEX0.75-3C-WHT"
  },
  {
    id: "cable-flex-1.0-3c-white",
    name: "1.0mm² 3-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.75,
    code: "FLEX1.0-3C-WHT"
  },
  {
    id: "cable-flex-1.5-3c-white",
    name: "1.5mm² 3-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.92,
    code: "FLEX1.5-3C-WHT"
  },
  {
    id: "cable-flex-2.5-3c-white",
    name: "2.5mm² 3-Core White Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.25,
    code: "FLEX2.5-3C-WHT"
  },
  {
    id: "cable-flex-0.75-3c-black",
    name: "0.75mm² 3-Core Black Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.58,
    code: "FLEX0.75-3C-BLK"
  },
  {
    id: "cable-flex-1.0-3c-black",
    name: "1.0mm² 3-Core Black Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.72,
    code: "FLEX1.0-3C-BLK"
  },
  {
    id: "cable-flex-1.5-3c-black",
    name: "1.5mm² 3-Core Black Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.88,
    code: "FLEX1.5-3C-BLK"
  },
  {
    id: "cable-flex-2.5-3c-black",
    name: "2.5mm² 3-Core Black Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.22,
    code: "FLEX2.5-3C-BLK"
  },

  // Heat Resistant Flex
  {
    id: "cable-flex-0.75-2c-heat",
    name: "0.75mm² 2-Core Heat Resistant Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.82,
    code: "FLEX0.75-2C-HR"
  },
  {
    id: "cable-flex-1.0-2c-heat",
    name: "1.0mm² 2-Core Heat Resistant Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.95,
    code: "FLEX1.0-2C-HR"
  },
  {
    id: "cable-flex-1.5-2c-heat",
    name: "1.5mm² 2-Core Heat Resistant Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.15,
    code: "FLEX1.5-2C-HR"
  },
  {
    id: "cable-flex-0.75-3c-heat",
    name: "0.75mm² 3-Core Heat Resistant Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 0.98,
    code: "FLEX0.75-3C-HR"
  },
  {
    id: "cable-flex-1.0-3c-heat",
    name: "1.0mm² 3-Core Heat Resistant Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.18,
    code: "FLEX1.0-3C-HR"
  },
  {
    id: "cable-flex-1.5-3c-heat",
    name: "1.5mm² 3-Core Heat Resistant Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.42,
    code: "FLEX1.5-3C-HR"
  },
  {
    id: "cable-flex-2.5-3c-heat",
    name: "2.5mm² 3-Core Heat Resistant Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.98,
    code: "FLEX2.5-3C-HR"
  },
  {
    id: "cable-flex-0.75-3c-heat-100m",
    name: "0.75mm² 3C Heat Resist 100m",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 90.00,
    code: "FLEX0.75-3C-HR-100M"
  },
  {
    id: "cable-flex-1.0-3c-heat-100m",
    name: "1.0mm² 3C Heat Resist 100m",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 108.00,
    code: "FLEX1.0-3C-HR-100M"
  },
  {
    id: "cable-flex-1.5-3c-heat-100m",
    name: "1.5mm² 3C Heat Resist 100m",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 130.00,
    code: "FLEX1.5-3C-HR-100M"
  },

  // Arctic/Outdoor Flex
  {
    id: "cable-flex-1.0-3c-arctic",
    name: "1.0mm² 3-Core Arctic Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.05,
    code: "FLEX1.0-3C-ARC"
  },
  {
    id: "cable-flex-1.5-3c-arctic",
    name: "1.5mm² 3-Core Arctic Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.35,
    code: "FLEX1.5-3C-ARC"
  },
  {
    id: "cable-flex-2.5-3c-arctic",
    name: "2.5mm² 3-Core Arctic Flex",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "metre",
    defaultPrice: 1.85,
    code: "FLEX2.5-3C-ARC"
  },
  {
    id: "cable-flex-1.5-3c-arctic-50m",
    name: "1.5mm² 3C Arctic Flex 50m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 65.00,
    code: "FLEX1.5-3C-ARC-50M"
  },
  {
    id: "cable-flex-2.5-3c-arctic-50m",
    name: "2.5mm² 3C Arctic Flex 50m Coil",
    category: "cables",
    subcategory: "Flex Cable",
    unit: "coil",
    defaultPrice: 89.00,
    code: "FLEX2.5-3C-ARC-50M"
  },

  // Single Core 6491X - 1.5mm²
  {
    id: "cable-single-1.5-brown",
    name: "1.5mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.38,
    code: "SGL1.5-BRN"
  },
  {
    id: "cable-single-1.5-blue",
    name: "1.5mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.38,
    code: "SGL1.5-BLU"
  },
  {
    id: "cable-single-1.5-grey",
    name: "1.5mm² Grey Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.38,
    code: "SGL1.5-GRY"
  },
  {
    id: "cable-single-1.5-black",
    name: "1.5mm² Black Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.38,
    code: "SGL1.5-BLK"
  },
  {
    id: "cable-single-1.5-red",
    name: "1.5mm² Red Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.40,
    code: "SGL1.5-RED"
  },
  {
    id: "cable-single-1.5-yellow",
    name: "1.5mm² Yellow Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.40,
    code: "SGL1.5-YLW"
  },
  {
    id: "cable-single-1.5-earth",
    name: "1.5mm² Green/Yellow Earth",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.35,
    code: "SGL1.5-GY"
  },
  {
    id: "cable-single-1.5-white",
    name: "1.5mm² White Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.40,
    code: "SGL1.5-WHT"
  },

  // Single Core 2.5mm²
  {
    id: "cable-single-2.5-brown",
    name: "2.5mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.52,
    code: "SGL2.5-BRN"
  },
  {
    id: "cable-single-2.5-blue",
    name: "2.5mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.52,
    code: "SGL2.5-BLU"
  },
  {
    id: "cable-single-2.5-grey",
    name: "2.5mm² Grey Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.52,
    code: "SGL2.5-GRY"
  },
  {
    id: "cable-single-2.5-black",
    name: "2.5mm² Black Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.52,
    code: "SGL2.5-BLK"
  },
  {
    id: "cable-single-2.5-red",
    name: "2.5mm² Red Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.55,
    code: "SGL2.5-RED"
  },
  {
    id: "cable-single-2.5-yellow",
    name: "2.5mm² Yellow Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.55,
    code: "SGL2.5-YLW"
  },
  {
    id: "cable-single-2.5-earth",
    name: "2.5mm² Green/Yellow Earth",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.48,
    code: "SGL2.5-GY"
  },
  {
    id: "cable-single-2.5-white",
    name: "2.5mm² White Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.55,
    code: "SGL2.5-WHT"
  },

  // Single Core 4.0mm²
  {
    id: "cable-single-4.0-brown",
    name: "4.0mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.82,
    code: "SGL4.0-BRN"
  },
  {
    id: "cable-single-4.0-blue",
    name: "4.0mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.82,
    code: "SGL4.0-BLU"
  },
  {
    id: "cable-single-4.0-grey",
    name: "4.0mm² Grey Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.82,
    code: "SGL4.0-GRY"
  },
  {
    id: "cable-single-4.0-black",
    name: "4.0mm² Black Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.82,
    code: "SGL4.0-BLK"
  },
  {
    id: "cable-single-4.0-red",
    name: "4.0mm² Red Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.85,
    code: "SGL4.0-RED"
  },
  {
    id: "cable-single-4.0-yellow",
    name: "4.0mm² Yellow Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.85,
    code: "SGL4.0-YLW"
  },
  {
    id: "cable-single-4.0-earth",
    name: "4.0mm² Green/Yellow Earth",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.78,
    code: "SGL4.0-GY"
  },
  {
    id: "cable-single-4.0-white",
    name: "4.0mm² White Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 0.85,
    code: "SGL4.0-WHT"
  },

  // Single Core 6.0mm²
  {
    id: "cable-single-6.0-brown",
    name: "6.0mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 1.32,
    code: "SGL6.0-BRN"
  },
  {
    id: "cable-single-6.0-blue",
    name: "6.0mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 1.32,
    code: "SGL6.0-BLU"
  },
  {
    id: "cable-single-6.0-black",
    name: "6.0mm² Black Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 1.32,
    code: "SGL6.0-BLK"
  },
  {
    id: "cable-single-6.0-earth",
    name: "6.0mm² Green/Yellow Earth",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 1.25,
    code: "SGL6.0-GY"
  },

  // Single Core 10mm²
  {
    id: "cable-single-10.0-brown",
    name: "10.0mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 2.18,
    code: "SGL10.0-BRN"
  },
  {
    id: "cable-single-10.0-blue",
    name: "10.0mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 2.18,
    code: "SGL10.0-BLU"
  },
  {
    id: "cable-single-10.0-black",
    name: "10.0mm² Black Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 2.18,
    code: "SGL10.0-BLK"
  },
  {
    id: "cable-single-10.0-earth",
    name: "10.0mm² Green/Yellow Earth",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 2.05,
    code: "SGL10.0-GY"
  },

  // Single Core 16mm²
  {
    id: "cable-single-16.0-brown",
    name: "16.0mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 3.45,
    code: "SGL16.0-BRN"
  },
  {
    id: "cable-single-16.0-blue",
    name: "16.0mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 3.45,
    code: "SGL16.0-BLU"
  },
  {
    id: "cable-single-16.0-black",
    name: "16.0mm² Black Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 3.45,
    code: "SGL16.0-BLK"
  },
  {
    id: "cable-single-16.0-earth",
    name: "16.0mm² Green/Yellow Earth",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 3.25,
    code: "SGL16.0-GY"
  },

  // Single Core 25mm² & 35mm²
  {
    id: "cable-single-25.0-brown",
    name: "25.0mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 5.50,
    code: "SGL25.0-BRN"
  },
  {
    id: "cable-single-25.0-blue",
    name: "25.0mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 5.50,
    code: "SGL25.0-BLU"
  },
  {
    id: "cable-single-35.0-brown",
    name: "35.0mm² Brown Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 8.25,
    code: "SGL35.0-BRN"
  },
  {
    id: "cable-single-35.0-blue",
    name: "35.0mm² Blue Single Core",
    category: "cables",
    subcategory: "Single Core",
    unit: "metre",
    defaultPrice: 8.25,
    code: "SGL35.0-BLU"
  },

  // Data Cables - CAT5e
  {
    id: "cable-cat5e-305m",
    name: "CAT5e UTP 305m Box",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 78.00,
    code: "CAT5E-305M"
  },
  {
    id: "cable-cat5e-metre",
    name: "CAT5e UTP Cable per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.32,
    code: "CAT5E-M"
  },
  {
    id: "cable-cat5e-100m",
    name: "CAT5e UTP 100m Pull Box",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 28.00,
    code: "CAT5E-100M"
  },
  {
    id: "cable-cat5e-ftp-305m",
    name: "CAT5e FTP Shielded 305m",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 95.00,
    code: "CAT5E-FTP-305M"
  },
  {
    id: "cable-cat5e-ftp-metre",
    name: "CAT5e FTP per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.38,
    code: "CAT5E-FTP-M"
  },
  {
    id: "cable-cat5e-outdoor-305m",
    name: "CAT5e Outdoor UV 305m",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 112.00,
    code: "CAT5E-OUT-305M"
  },
  {
    id: "cable-cat5e-outdoor-metre",
    name: "CAT5e Outdoor per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.45,
    code: "CAT5E-OUT-M"
  },
  {
    id: "cable-cat5e-burial",
    name: "CAT5e External Direct Burial",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.58,
    code: "CAT5E-BUR"
  },

  // CAT6 Additional
  {
    id: "cable-cat6-305m",
    name: "CAT6 UTP 305m Box",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 108.00,
    code: "CAT6-305M"
  },
  {
    id: "cable-cat6-100m",
    name: "CAT6 UTP 100m Pull Box",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 38.00,
    code: "CAT6-100M"
  },
  {
    id: "cable-cat6-ftp-305m",
    name: "CAT6 FTP Shielded 305m",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 145.00,
    code: "CAT6-FTP-305M"
  },
  {
    id: "cable-cat6-ftp-metre",
    name: "CAT6 FTP per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.58,
    code: "CAT6-FTP-M"
  },
  {
    id: "cable-cat6-outdoor-305m",
    name: "CAT6 External UV 305m",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 165.00,
    code: "CAT6-OUT-305M"
  },
  {
    id: "cable-cat6-outdoor-metre",
    name: "CAT6 External per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.65,
    code: "CAT6-OUT-M"
  },
  {
    id: "cable-cat6-burial",
    name: "CAT6 Direct Burial",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.78,
    code: "CAT6-BUR"
  },
  {
    id: "cable-cat6-plenum",
    name: "CAT6 Plenum Rated",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.85,
    code: "CAT6-PLEN"
  },
  {
    id: "cable-cat6-patch-0.5m",
    name: "CAT6 Patch Cable 0.5m",
    category: "cables",
    subcategory: "Data Cable",
    unit: "each",
    defaultPrice: 1.85,
    code: "CAT6-PCH-0.5"
  },

  // CAT6A
  {
    id: "cable-cat6a-305m",
    name: "CAT6A UTP 305m Box",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 168.00,
    code: "CAT6A-305M"
  },
  {
    id: "cable-cat6a-metre",
    name: "CAT6A UTP per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.68,
    code: "CAT6A-M"
  },
  {
    id: "cable-cat6a-stp-305m",
    name: "CAT6A STP Shielded 305m",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 215.00,
    code: "CAT6A-STP-305M"
  },
  {
    id: "cable-cat6a-stp-metre",
    name: "CAT6A STP per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.85,
    code: "CAT6A-STP-M"
  },
  {
    id: "cable-cat6a-plenum",
    name: "CAT6A Plenum Rated",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 1.05,
    code: "CAT6A-PLEN"
  },
  {
    id: "cable-cat6a-outdoor",
    name: "CAT6A External UV",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 0.95,
    code: "CAT6A-OUT"
  },

  // CAT7
  {
    id: "cable-cat7-305m",
    name: "CAT7 S/FTP 305m Box",
    category: "cables",
    subcategory: "Data Cable",
    unit: "box",
    defaultPrice: 285.00,
    code: "CAT7-305M"
  },
  {
    id: "cable-cat7-metre",
    name: "CAT7 S/FTP per Metre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 1.15,
    code: "CAT7-M"
  },
  {
    id: "cable-cat7-patch-2m",
    name: "CAT7 Patch Cable 2m",
    category: "cables",
    subcategory: "Data Cable",
    unit: "each",
    defaultPrice: 8.50,
    code: "CAT7-PCH-2"
  },

  // Fibre Optic
  {
    id: "cable-fibre-om4",
    name: "OM4 Fibre 4-Core",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 4.25,
    code: "FBR-OM4"
  },
  {
    id: "cable-fibre-os2",
    name: "OS2 Single Mode Fibre",
    category: "cables",
    subcategory: "Data Cable",
    unit: "metre",
    defaultPrice: 2.85,
    code: "FBR-OS2"
  },

  // Coaxial - Standard
  {
    id: "cable-coax-rg6-100m",
    name: "RG6 Coax 100m Drum",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "drum",
    defaultPrice: 48.00,
    code: "RG6-100M"
  },
  {
    id: "cable-coax-rg59",
    name: "RG59 Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.52,
    code: "RG59"
  },
  {
    id: "cable-coax-ct100",
    name: "CT100 Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.55,
    code: "CT100"
  },
  {
    id: "cable-coax-ct100-100m",
    name: "CT100 Coax 100m Drum",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "drum",
    defaultPrice: 48.00,
    code: "CT100-100M"
  },
  {
    id: "cable-coax-wf100",
    name: "WF100 Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.68,
    code: "WF100"
  },
  {
    id: "cable-coax-wf100-100m",
    name: "WF100 Coax 100m Drum",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "drum",
    defaultPrice: 62.00,
    code: "WF100-100M"
  },
  {
    id: "cable-coax-triax",
    name: "Triax Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 1.85,
    code: "TRIAX"
  },
  {
    id: "cable-coax-twin",
    name: "Twin Coaxial Cable",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 1.15,
    code: "COAX-TWIN"
  },
  {
    id: "cable-coax-quad-rg6",
    name: "Quad Shield RG6",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.75,
    code: "RG6-QUAD"
  },

  // Satellite Cable
  {
    id: "cable-sat-double",
    name: "Satellite Coax Double Screened",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.72,
    code: "SAT-DBL"
  },
  {
    id: "cable-sat-100m",
    name: "Satellite Coax 100m Drum",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "drum",
    defaultPrice: 65.00,
    code: "SAT-100M"
  },
  {
    id: "cable-sat-white",
    name: "Satellite Coax White",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.78,
    code: "SAT-WHT"
  },
  {
    id: "cable-sat-black",
    name: "Satellite Coax Black",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.75,
    code: "SAT-BLK"
  },
  {
    id: "cable-sat-quad",
    name: "Satellite Quad Screen",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.95,
    code: "SAT-QUAD"
  },
  {
    id: "cable-sat-shotgun",
    name: "Satellite Shotgun Twin",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 1.48,
    code: "SAT-SHOT"
  },
  {
    id: "cable-sat-outdoor",
    name: "Satellite Outdoor UV",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.88,
    code: "SAT-OUT"
  },
  {
    id: "cable-sat-webro",
    name: "Satellite Webro WF100",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.72,
    code: "SAT-WEBRO"
  },
  {
    id: "cable-sat-sky",
    name: "Sky-Compatible Coax",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.68,
    code: "SAT-SKY"
  },
  {
    id: "cable-sat-freesat",
    name: "Freesat Coax",
    category: "cables",
    subcategory: "Coaxial Cable",
    unit: "metre",
    defaultPrice: 0.68,
    code: "SAT-FREE"
  },

  // Fire Alarm Cable
  {
    id: "cable-firealarm-2c",
    name: "Fire Alarm 2-Core Cable",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "metre",
    defaultPrice: 0.45,
    code: "FA-2C"
  },
  {
    id: "cable-firealarm-4c",
    name: "Fire Alarm 4-Core Cable",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "metre",
    defaultPrice: 0.85,
    code: "FA-4C"
  },
  {
    id: "cable-firealarm-6c",
    name: "Fire Alarm 6-Core Cable",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "metre",
    defaultPrice: 1.25,
    code: "FA-6C"
  },
  {
    id: "cable-firealarm-8c",
    name: "Fire Alarm 8-Core Cable",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "metre",
    defaultPrice: 1.68,
    code: "FA-8C"
  },
  {
    id: "cable-firealarm-2c-100m",
    name: "Fire Alarm 2-Core 100m",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "coil",
    defaultPrice: 40.00,
    code: "FA-2C-100M"
  },
  {
    id: "cable-firealarm-4c-100m",
    name: "Fire Alarm 4-Core 100m",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "coil",
    defaultPrice: 78.00,
    code: "FA-4C-100M"
  },
  {
    id: "cable-firealarm-2c-lszh",
    name: "LSZH Fire Alarm 2-Core",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "metre",
    defaultPrice: 0.58,
    code: "FA-2C-LSZH"
  },
  {
    id: "cable-firealarm-4c-lszh",
    name: "LSZH Fire Alarm 4-Core",
    category: "cables",
    subcategory: "Fire Alarm Cable",
    unit: "metre",
    defaultPrice: 1.05,
    code: "FA-4C-LSZH"
  },

  // Telephone/Telecoms
  {
    id: "cable-telephone-2pair",
    name: "Telephone Cable 2-Pair",
    category: "cables",
    subcategory: "Telephone Cable",
    unit: "metre",
    defaultPrice: 0.25,
    code: "TEL-2P"
  },
  {
    id: "cable-telephone-4pair",
    name: "Telephone Cable 4-Pair",
    category: "cables",
    subcategory: "Telephone Cable",
    unit: "metre",
    defaultPrice: 0.42,
    code: "TEL-4P"
  },
  {
    id: "cable-telephone-6pair",
    name: "Telephone Cable 6-Pair",
    category: "cables",
    subcategory: "Telephone Cable",
    unit: "metre",
    defaultPrice: 0.58,
    code: "TEL-6P"
  },
  {
    id: "cable-telephone-2pair-100m",
    name: "Telephone 2-Pair 100m",
    category: "cables",
    subcategory: "Telephone Cable",
    unit: "coil",
    defaultPrice: 22.00,
    code: "TEL-2P-100M"
  },
  {
    id: "cable-bt-dropwire",
    name: "BT Drop Wire",
    category: "cables",
    subcategory: "Telephone Cable",
    unit: "metre",
    defaultPrice: 0.38,
    code: "BT-DROP"
  },

  // Speaker Cable Additional
  {
    id: "cable-speaker-0.75mm",
    name: "Speaker Cable 2x0.75mm²",
    category: "cables",
    subcategory: "Speaker Cable",
    unit: "metre",
    defaultPrice: 0.45,
    code: "SPK0.75"
  },
  {
    id: "cable-speaker-1.5mm",
    name: "Speaker Cable 2x1.5mm²",
    category: "cables",
    subcategory: "Speaker Cable",
    unit: "metre",
    defaultPrice: 0.75,
    code: "SPK1.5"
  },
  {
    id: "cable-speaker-4.0mm",
    name: "Speaker Cable 2x4.0mm²",
    category: "cables",
    subcategory: "Speaker Cable",
    unit: "metre",
    defaultPrice: 1.68,
    code: "SPK4.0"
  },
  {
    id: "cable-speaker-ofc",
    name: "Speaker Cable OFC High-End",
    category: "cables",
    subcategory: "Speaker Cable",
    unit: "metre",
    defaultPrice: 2.85,
    code: "SPK-OFC"
  },

  // Alarm Cable Additional
  {
    id: "cable-alarm-4c",
    name: "Alarm 4-Core Cable",
    category: "cables",
    subcategory: "Alarm Cable",
    unit: "metre",
    defaultPrice: 0.55,
    code: "ALM4C"
  },
  {
    id: "cable-alarm-8c",
    name: "Alarm 8-Core Cable",
    category: "cables",
    subcategory: "Alarm Cable",
    unit: "metre",
    defaultPrice: 1.15,
    code: "ALM8C"
  },
  {
    id: "cable-alarm-4c-100m",
    name: "Alarm 4-Core 100m",
    category: "cables",
    subcategory: "Alarm Cable",
    unit: "coil",
    defaultPrice: 48.00,
    code: "ALM4C-100M"
  },
  {
    id: "cable-alarm-6c-100m",
    name: "Alarm 6-Core 100m",
    category: "cables",
    subcategory: "Alarm Cable",
    unit: "coil",
    defaultPrice: 75.00,
    code: "ALM6C-100M"
  },

  // Multicore Cable
  {
    id: "cable-multicore-12c",
    name: "12-Core Multicore 1.5mm²",
    category: "cables",
    subcategory: "Multicore Cable",
    unit: "metre",
    defaultPrice: 8.50,
    code: "MC-12C"
  },
  {
    id: "cable-multicore-16c",
    name: "16-Core Multicore 1.5mm²",
    category: "cables",
    subcategory: "Multicore Cable",
    unit: "metre",
    defaultPrice: 11.50,
    code: "MC-16C"
  },

  // Meter Tails
  {
    id: "cable-metertails-16mm-red",
    name: "16mm² Meter Tails Red",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 3.25,
    code: "MT16-RED"
  },
  {
    id: "cable-metertails-16mm-black",
    name: "16mm² Meter Tails Black",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 3.25,
    code: "MT16-BLK"
  },
  {
    id: "cable-metertails-16mm-grey",
    name: "16mm² Meter Tails Grey",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 3.25,
    code: "MT16-GRY"
  },
  {
    id: "cable-metertails-25mm-red",
    name: "25mm² Meter Tails Red",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 5.15,
    code: "MT25-RED"
  },
  {
    id: "cable-metertails-25mm-black",
    name: "25mm² Meter Tails Black",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 5.15,
    code: "MT25-BLK"
  },
  {
    id: "cable-metertails-25mm-grey",
    name: "25mm² Meter Tails Grey",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 5.15,
    code: "MT25-GRY"
  },
  {
    id: "cable-metertails-35mm-red",
    name: "35mm² Meter Tails Red",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 7.85,
    code: "MT35-RED"
  },
  {
    id: "cable-metertails-35mm-black",
    name: "35mm² Meter Tails Black",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 7.85,
    code: "MT35-BLK"
  },
  {
    id: "cable-metertails-50mm-red",
    name: "50mm² Meter Tails Red",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 12.50,
    code: "MT50-RED"
  },
  {
    id: "cable-metertails-50mm-black",
    name: "50mm² Meter Tails Black",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "metre",
    defaultPrice: 12.50,
    code: "MT50-BLK"
  },
  {
    id: "cable-metertails-16mm-pair-3m",
    name: "16mm² Meter Tails Pair 3m",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "pair",
    defaultPrice: 19.50,
    code: "MT16-PAIR-3M"
  },
  {
    id: "cable-metertails-25mm-pair-3m",
    name: "25mm² Meter Tails Pair 3m",
    category: "cables",
    subcategory: "Meter Tails",
    unit: "pair",
    defaultPrice: 31.00,
    code: "MT25-PAIR-3M"
  },

  // Earth Cable
  {
    id: "cable-earth-6mm",
    name: "6mm² Earth Cable Green/Yellow",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "metre",
    defaultPrice: 1.18,
    code: "EARTH6"
  },
  {
    id: "cable-earth-10mm",
    name: "10mm² Earth Cable Green/Yellow",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "metre",
    defaultPrice: 1.95,
    code: "EARTH10"
  },
  {
    id: "cable-earth-16mm",
    name: "16mm² Earth Cable Green/Yellow",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "metre",
    defaultPrice: 3.15,
    code: "EARTH16"
  },
  {
    id: "cable-earth-25mm",
    name: "25mm² Earth Cable Green/Yellow",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "metre",
    defaultPrice: 5.05,
    code: "EARTH25"
  },
  {
    id: "cable-earth-35mm",
    name: "35mm² Earth Cable Green/Yellow",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "metre",
    defaultPrice: 7.65,
    code: "EARTH35"
  },
  {
    id: "cable-earth-6mm-50m",
    name: "6mm² Earth Cable 50m Coil",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "coil",
    defaultPrice: 56.00,
    code: "EARTH6-50M"
  },
  {
    id: "cable-earth-10mm-50m",
    name: "10mm² Earth Cable 50m Coil",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "coil",
    defaultPrice: 93.00,
    code: "EARTH10-50M"
  },
  {
    id: "cable-earth-16mm-25m",
    name: "16mm² Earth Cable 25m Coil",
    category: "cables",
    subcategory: "Earth Cable",
    unit: "coil",
    defaultPrice: 76.00,
    code: "EARTH16-25M"
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
    defaultPrice: 4.85,
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
    defaultPrice: 12.95,
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
    defaultPrice: 165.00,
    code: "CU6W"
  },
  {
    id: "consumer-unit-8w",
    name: "8 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 185.00,
    code: "CU8W"
  },
  {
    id: "consumer-unit-10w",
    name: "10 Way Consumer Unit (Metal)",
    category: "distribution", 
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 145.00,
    code: "CU10W"
  },
  {
    id: "consumer-unit-12w",
    name: "12 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 245.00,
    code: "CU12W"
  },
  {
    id: "consumer-unit-14w",
    name: "14 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 275.00,
    code: "CU14W"
  },
  {
    id: "consumer-unit-16w",
    name: "16 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 305.00,
    code: "CU16W"
  },
  {
    id: "consumer-unit-18w",
    name: "18 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 335.00,
    code: "CU18W"
  },
  {
    id: "consumer-unit-20w",
    name: "20 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 365.00,
    code: "CU20W"
  },
  {
    id: "mcb-6a-b",
    name: "6A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 12.50,
    code: "MCB6B"
  },
  {
    id: "mcb-16a-b",
    name: "16A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each", 
    defaultPrice: 15.50,
    code: "MCB16B"
  },
  {
    id: "mcb-20a-b",
    name: "20A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 16.50,
    code: "MCB20B"
  },
  {
    id: "mcb-32a-b",
    name: "32A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each", 
    defaultPrice: 8.95,
    code: "MCB32B"
  },
  {
    id: "mcb-40a-b",
    name: "40A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 22.00,
    code: "MCB40B"
  },
  {
    id: "mcb-50a-b",
    name: "50A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 25.50,
    code: "MCB50B"
  },
  {
    id: "rcd-30ma-63a",
    name: "30mA 63A RCD",
    category: "distribution",
    subcategory: "RCDs",
    unit: "each",
    defaultPrice: 75.00,
    code: "RCD30-63"
  },
  {
    id: "rcd-30ma-100a",
    name: "30mA 100A RCD",
    category: "distribution",
    subcategory: "RCDs",
    unit: "each",
    defaultPrice: 85.00,
    code: "RCD30-100"
  },
  {
    id: "rcbo-20a",
    name: "20A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs",
    unit: "each",
    defaultPrice: 45.00,
    code: "RCBO20"
  },
  {
    id: "rcbo-32a",
    name: "32A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs", 
    unit: "each",
    defaultPrice: 52.00,
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
    defaultPrice: 14.95,
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