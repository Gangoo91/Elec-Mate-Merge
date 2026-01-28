
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building,
  Building2,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  BadgePoundSterling,
  Users,
  Book,
  FileCheck,
  Briefcase,
  Store,
  UtensilsCrossed,
  Hotel,
  GraduationCap,
  Lightbulb,
  Server,
  Wind,
  Cable,
  CircuitBoard,
  Thermometer,
  ShoppingCart,
  CreditCard,
  Lock,
  Accessibility,
  Flame,
  Droplets,
  ChefHat,
  KeyRound,
  BedDouble,
  Sparkles,
  Info,
  ArrowUpRight,
  Network,
  Layers,
  MonitorSpeaker,
  Refrigerator,
  Wrench
} from "lucide-react";

const CommercialOverviewCards = () => {
  // ============================================
  // SECTION 1: WHAT IS COMMERCIAL ELECTRICAL WORK?
  // ============================================

  const workTypeComparison = [
    {
      type: "Domestic",
      description: "Houses, flats, and residential properties",
      voltage: "Single-phase 230V",
      scale: "1-20 circuits typically",
      regulations: "Part P, BS 7671",
      examples: ["Houses", "Flats", "Bungalows", "Maisonettes"]
    },
    {
      type: "Commercial",
      description: "Business premises, shops, offices, hospitality",
      voltage: "Single or three-phase 400V",
      scale: "20-200+ circuits",
      regulations: "BS 7671, Building Regs, Fire Safety Order",
      examples: ["Offices", "Shops", "Hotels", "Restaurants", "Schools"]
    },
    {
      type: "Industrial",
      description: "Factories, manufacturing, heavy industry",
      voltage: "Three-phase 400V, HV distribution",
      scale: "Hundreds of circuits, motor control",
      regulations: "BS 7671, ATEX, DSEAR, PUWER",
      examples: ["Factories", "Warehouses", "Processing plants"]
    }
  ];

  const commercialPremisesTypes = [
    {
      type: "Offices",
      icon: Briefcase,
      color: "blue",
      description: "Corporate headquarters, serviced offices, co-working spaces",
      keyFeatures: ["Data infrastructure", "Comfort cooling", "Raised floors", "Flexible layouts"]
    },
    {
      type: "Retail",
      icon: Store,
      color: "pink",
      description: "High street shops, shopping centres, supermarkets",
      keyFeatures: ["Display lighting", "POS systems", "Security", "Refrigeration"]
    },
    {
      type: "Restaurants",
      icon: UtensilsCrossed,
      color: "amber",
      description: "Restaurants, cafes, commercial kitchens, takeaways",
      keyFeatures: ["Three-phase equipment", "Extraction", "IP-rated fittings"]
    },
    {
      type: "Hotels",
      icon: Hotel,
      color: "purple",
      description: "Hotels, guest houses, B&Bs, serviced apartments",
      keyFeatures: ["Card key systems", "Guest comfort", "Back-of-house", "Emergency systems"]
    },
    {
      type: "Schools",
      icon: GraduationCap,
      color: "green",
      description: "Primary schools, secondary schools, colleges, universities",
      keyFeatures: ["IT suites", "Science labs", "Sports halls", "Safeguarding"]
    },
    {
      type: "Healthcare",
      icon: Building2,
      color: "red",
      description: "GP surgeries, dental practices, private clinics",
      keyFeatures: ["Medical equipment", "Clean power", "Emergency backup", "HTM compliance"]
    }
  ];

  const whyCommercialDifferent = [
    {
      factor: "Scale & Complexity",
      description: "Commercial projects involve larger installations with more circuits, higher loads, and three-phase distribution systems",
      icon: Layers
    },
    {
      factor: "Regulatory Requirements",
      description: "Additional regulations including Fire Safety Order, Workplace Regulations, DDA requirements, and industry-specific standards",
      icon: FileCheck
    },
    {
      factor: "Multiple Stakeholders",
      description: "Coordination with building managers, architects, other trades, and business operations is essential",
      icon: Users
    },
    {
      factor: "Business Continuity",
      description: "Work often needs to be scheduled around business hours with minimal disruption to operations",
      icon: Clock
    },
    {
      factor: "Specialist Systems",
      description: "Integration of fire alarms, emergency lighting, access control, CCTV, and building management systems",
      icon: Shield
    },
    {
      factor: "Documentation",
      description: "Comprehensive design, installation, and O&M documentation required for building handover",
      icon: Book
    }
  ];

  const careerProgression = [
    {
      level: "Apprentice (Years 1-4)",
      role: "Learning fundamentals on commercial sites",
      skills: ["Conduit bending", "Trunking installation", "Cable pulling", "Basic testing"],
      qualifications: ["Level 2/3 Diploma", "AM2 assessment"]
    },
    {
      level: "Qualified Electrician (Years 4-8)",
      role: "Working on commercial projects under supervision",
      skills: ["Distribution board installation", "Three-phase systems", "Emergency systems", "Inspection & testing"],
      qualifications: ["City & Guilds 2391", "18th Edition"]
    },
    {
      level: "Approved Contractor (Years 8-12)",
      role: "Running commercial projects, supervising others",
      skills: ["Project management", "Design verification", "Client liaison", "Team leadership"],
      qualifications: ["NICEIC/NAPIT approval", "Site management qualifications"]
    },
    {
      level: "Project Manager/Director (12+ Years)",
      role: "Managing large commercial contracts",
      skills: ["Contract management", "Business development", "Technical authority", "Health & safety management"],
      qualifications: ["HNC/HND/Degree", "SMSTS", "Professional memberships"]
    }
  ];

  // ============================================
  // SECTION 2: OFFICE FIT-OUTS
  // ============================================

  const officeLayoutTypes = [
    {
      type: "Open Plan",
      description: "Large open floor areas with workstations",
      electrical: "Floor boxes, underfloor distribution, flexible containment",
      considerations: [
        "Floor box positions based on desk layout",
        "Power poles for central workstations",
        "Underfloor busbar systems for flexibility",
        "Careful lighting design to avoid glare on screens"
      ]
    },
    {
      type: "Cellular",
      description: "Individual offices along perimeter with central core",
      electrical: "Perimeter trunking, dedicated circuits per office",
      considerations: [
        "Dado trunking for perimeter power/data",
        "Individual lighting control per office",
        "Sound-rated accessories for privacy",
        "Future partition flexibility"
      ]
    },
    {
      type: "Activity-Based",
      description: "Mix of spaces for different work types",
      electrical: "Zoned services, smart controls, variety of outlets",
      considerations: [
        "Different zones (focus, collaboration, social)",
        "Integrated AV systems in meeting rooms",
        "Wireless charging in breakout areas",
        "Smart lighting with scene control"
      ]
    }
  ];

  const officeLuxLevels = [
    { area: "General Offices", lux: "500 lux", standard: "BS EN 12464-1", notes: "Task lighting may supplement" },
    { area: "Open Plan Offices", lux: "500 lux", standard: "BS EN 12464-1", notes: "Avoid reflections on screens" },
    { area: "Drawing Offices/CAD", lux: "750 lux", standard: "BS EN 12464-1", notes: "Higher for detailed work" },
    { area: "Meeting Rooms", lux: "500 lux", standard: "BS EN 12464-1", notes: "Dimmable for presentations" },
    { area: "Reception Areas", lux: "300 lux", standard: "BS EN 12464-1", notes: "Feature lighting acceptable" },
    { area: "Corridors", lux: "100 lux", standard: "BS EN 12464-1", notes: "Emergency lighting required" },
    { area: "Toilets", lux: "200 lux", standard: "BS EN 12464-1", notes: "IP44 minimum in wet areas" },
    { area: "Server Rooms", lux: "500 lux", standard: "BS EN 12464-1", notes: "Emergency lighting essential" },
    { area: "Archives/Storage", lux: "200 lux", standard: "BS EN 12464-1", notes: "Switching for energy saving" }
  ];

  const officeContainmentSystems = [
    {
      system: "Dado Trunking",
      description: "Wall-mounted trunking at desk height (typically 450mm from floor)",
      uses: "Perimeter power, data, and telephone outlets",
      advantages: ["Easy access", "Flexible outlet positions", "Segregated compartments"],
      cables: "Twin and earth for power, Cat6/Cat6A for data"
    },
    {
      system: "Floor Boxes",
      description: "Recessed or raised floor outlets providing services at floor level",
      uses: "Workstation power and data in open plan areas",
      advantages: ["Clean appearance", "Flexible positioning", "Multiple services"],
      cables: "SWA or conduit under screed, LSF in raised floor voids"
    },
    {
      system: "Underfloor Busbar",
      description: "Pre-wired busbar track system installed below raised floors",
      uses: "High-flexibility office fit-outs requiring frequent changes",
      advantages: ["Rapid reconfiguration", "High capacity", "Future-proof"],
      cables: "Tap-off boxes connect to busbar, flexible tails to floor boxes"
    },
    {
      system: "Cable Tray/Basket",
      description: "Suspended tray systems above suspended ceilings",
      uses: "Main cable distribution runs, data cabling backbone",
      advantages: ["High capacity", "Good ventilation", "Easy inspection"],
      cables: "LSF cables, data cables on separate tray where possible"
    },
    {
      system: "Power Poles",
      description: "Vertical poles dropping from ceiling to workstation clusters",
      uses: "Central island workstations in open plan offices",
      advantages: ["No floor penetrations", "Visible cable management"],
      cables: "Flexible conduit from ceiling, power and data in pole"
    }
  ];

  const officeTypicalCircuits = [
    { circuit: "General Lighting", cable: "1.5mm LSF", protection: "6A/10A RCBO", notes: "Zoned with scene control" },
    { circuit: "Emergency Lighting", cable: "1.5mm FP200", protection: "6A MCB", notes: "Dedicated circuit, fire-rated cable" },
    { circuit: "Small Power (Offices)", cable: "2.5mm LSF", protection: "20A RCBO", notes: "Radial or ring, per floor area" },
    { circuit: "Server Room Power", cable: "6mm or 10mm LSF", protection: "32A RCBO", notes: "Dedicated, often UPS backed" },
    { circuit: "Server Room Cooling", cable: "2.5mm or 4mm LSF", protection: "20A/32A RCBO", notes: "Dedicated for each AC unit" },
    { circuit: "Kitchen Small Power", cable: "2.5mm LSF", protection: "20A RCBO", notes: "RCD protected, away from sinks" },
    { circuit: "Mechanical Services", cable: "2.5mm LSF", protection: "16A/20A MCB", notes: "AHU, FCU, extract fans" },
    { circuit: "Reception/Feature Lighting", cable: "1.5mm LSF", protection: "6A RCBO", notes: "Often dimmed, scene control" }
  ];

  const dataSegregation = {
    title: "Power & Data Segregation",
    requirements: [
      {
        category: "Physical Separation",
        detail: "Power and data cables must be separated or use screened cable",
        regulation: "BS EN 50174-2"
      },
      {
        category: "Minimum Distances",
        detail: "50mm parallel separation unscreened, or metal barrier",
        regulation: "Cable manufacturer guidance"
      },
      {
        category: "Crossing Points",
        detail: "Cables may cross at 90 degrees with minimal contact",
        regulation: "Best practice"
      },
      {
        category: "Segregated Trunking",
        detail: "Use multi-compartment trunking with metal dividers",
        regulation: "BS EN 50085-2-1"
      },
      {
        category: "Earth Bonding",
        detail: "Metallic containment and screens must be properly earthed",
        regulation: "BS 7671 Reg 411.3.1.2"
      }
    ]
  };

  // ============================================
  // SECTION 3: RETAIL & SHOP INSTALLATIONS
  // ============================================

  const retailLightingTypes = [
    {
      type: "Track Lighting",
      description: "Adjustable spotlights on electrified track for product displays",
      typical: "LED track spots 15-40W, 3000K/4000K",
      considerations: ["Adjustable focus", "Easy to add/remove fittings", "Heat from transformers"]
    },
    {
      type: "Display Case Lighting",
      description: "Integrated lighting within display cabinets and showcases",
      typical: "LED strip 14W/m, LED modules",
      considerations: ["Low heat output essential", "IP20 minimum", "Often 12V/24V SELV"]
    },
    {
      type: "General Ambient",
      description: "Overall store illumination, often recessed downlights",
      typical: "LED downlights 10-20W, recessed panels",
      considerations: ["Even coverage", "Colour rendering Ra>90", "Energy efficiency"]
    },
    {
      type: "Accent Lighting",
      description: "Feature lighting for window displays and promotional areas",
      typical: "Adjustable spots, LED flood, colour-changing",
      considerations: ["High impact areas", "Timer/automation", "Often separate circuit"]
    },
    {
      type: "Window Display",
      description: "High-output lighting for street-facing window displays",
      typical: "LED flood 50-150W or spot arrays",
      considerations: ["High lux levels 1000+", "Timer controlled", "UV filtered for products"]
    }
  ];

  const retailPOSCircuits = [
    { equipment: "Cash Registers/Tills", circuit: "Dedicated radial 20A", protection: "20A RCBO", notes: "UPS recommended" },
    { equipment: "Card Payment Terminals", circuit: "Small power or dedicated", protection: "Via till circuit", notes: "Data connection essential" },
    { equipment: "Barcode Scanners", circuit: "Via till circuit", protection: "N/A (USB powered)", notes: "Wireless units common" },
    { equipment: "Receipt Printers", circuit: "Via till circuit", protection: "N/A", notes: "Often integrated" },
    { equipment: "Customer Display", circuit: "Via till circuit", protection: "N/A", notes: "Low power USB/mains" }
  ];

  const retailSecuritySystems = [
    {
      system: "CCTV",
      power: "PoE preferred, or local 13A",
      cable: "Cat6 or RG59+power",
      notes: "NVR requires dedicated power, consider UPS"
    },
    {
      system: "EAS (Anti-theft)",
      power: "Dedicated 13A per pedestal pair",
      cable: "Manufacturer specific",
      notes: "Keep away from other electronics"
    },
    {
      system: "Intruder Alarm",
      power: "Dedicated spur to panel",
      cable: "6-core alarm cable",
      notes: "Battery backup, tamper protection"
    },
    {
      system: "Access Control",
      power: "PoE or local 12V PSU",
      cable: "Cat6 + door cable",
      notes: "Fire alarm integration for fail-safe"
    },
    {
      system: "Security Shutters",
      power: "Dedicated 20A per shutter",
      cable: "SWA to external motors",
      notes: "Key switch or remote control"
    }
  ];

  const retailRefrigerationCircuits = [
    { equipment: "Display Fridges (single)", rating: "500W-1.5kW", circuit: "Dedicated 13A spur", protection: "16A RCBO" },
    { equipment: "Multi-deck Chiller", rating: "2-5kW", circuit: "Dedicated 20A radial", protection: "20A RCBO" },
    { equipment: "Chest Freezers", rating: "200-500W", circuit: "Dedicated 13A spur", protection: "16A RCBO" },
    { equipment: "Walk-in Cold Room", rating: "3-10kW", circuit: "32A dedicated", protection: "32A RCBO or TP" },
    { equipment: "Ice Machine", rating: "1-3kW", circuit: "Dedicated 13A spur", protection: "16A RCBO" }
  ];

  const retailEmergencyLighting = [
    {
      area: "Sales Floor",
      requirement: "1 lux minimum on escape routes",
      type: "Maintained or non-maintained",
      duration: "3 hours minimum"
    },
    {
      area: "Checkout Areas",
      requirement: "High risk task areas 15 lux",
      type: "Maintained recommended",
      duration: "3 hours minimum"
    },
    {
      area: "Stockroom",
      requirement: "0.5 lux minimum, 1 lux on routes",
      type: "Non-maintained acceptable",
      duration: "3 hours minimum"
    },
    {
      area: "External Exits",
      requirement: "Illuminated exit signage",
      type: "Self-contained maintained",
      duration: "3 hours minimum"
    },
    {
      area: "Fire Equipment",
      requirement: "5 lux on fire alarm call points",
      type: "Spot illumination",
      duration: "3 hours minimum"
    }
  ];

  const accessibilityRequirements = [
    {
      requirement: "Socket Heights",
      detail: "Socket outlets 450-1200mm from floor level",
      reference: "Approved Document M"
    },
    {
      requirement: "Switch Heights",
      detail: "Light switches 750-1200mm from floor level",
      reference: "BS 8300"
    },
    {
      requirement: "Contrasting Accessories",
      detail: "Switches and sockets to contrast with background",
      reference: "BS 8300"
    },
    {
      requirement: "Wheelchair Accessible",
      detail: "Clear space in front of switches and sockets",
      reference: "Approved Document M"
    },
    {
      requirement: "Induction Loops",
      detail: "Hearing loop provision at service counters",
      reference: "Equality Act 2010"
    },
    {
      requirement: "Automatic Doors",
      detail: "Power supply and safety circuits for accessible entrance",
      reference: "BS EN 16005"
    }
  ];

  // ============================================
  // SECTION 4: RESTAURANT & COMMERCIAL KITCHEN
  // ============================================

  const kitchenEquipmentRatings = [
    { equipment: "Commercial Combi Oven", rating: "15-40kW", phase: "Three-phase", cable: "10mm or 16mm", protection: "40A/63A TP MCCB" },
    { equipment: "Commercial Range Cooker", rating: "20-50kW", phase: "Three-phase", cable: "16mm or 25mm", protection: "63A/80A TP MCCB" },
    { equipment: "Deep Fat Fryer (double)", rating: "15-25kW", phase: "Three-phase", cable: "6mm or 10mm", protection: "32A/40A TP MCCB" },
    { equipment: "Commercial Dishwasher", rating: "10-25kW", phase: "Three-phase", cable: "6mm or 10mm", protection: "32A/40A TP RCBO" },
    { equipment: "Pass-Through Dishwasher", rating: "7-15kW", phase: "Three-phase", cable: "4mm or 6mm", protection: "25A/32A TP RCBO" },
    { equipment: "Cold Room (walk-in)", rating: "3-8kW", phase: "Single/Three-phase", cable: "4mm or 6mm", protection: "32A RCBO" },
    { equipment: "Ice Machine", rating: "1-3kW", phase: "Single-phase", cable: "2.5mm", protection: "16A RCBO" },
    { equipment: "Salamander Grill", rating: "3-6kW", phase: "Single-phase", cable: "4mm or 6mm", protection: "32A RCBO" },
    { equipment: "Bain Marie", rating: "1-3kW", phase: "Single-phase", cable: "2.5mm", protection: "16A RCBO" },
    { equipment: "Microwave (commercial)", rating: "1.5-3kW", phase: "Single-phase", cable: "2.5mm", protection: "16A RCBO" }
  ];

  const kitchenIPRatings = [
    { zone: "General Kitchen", ipRating: "IP44", reason: "Splash from cooking and cleaning", fittingType: "IP44 luminaires, accessories" },
    { zone: "Above Cooking Equipment", ipRating: "IP65", reason: "Steam and grease vapour", fittingType: "IP65 enclosed luminaires" },
    { zone: "Pot Wash Area", ipRating: "IP65", reason: "Direct water spray during wash down", fittingType: "IP65 luminaires and switches" },
    { zone: "Cold Rooms", ipRating: "IP65", reason: "Condensation and cleaning", fittingType: "Cold-rated IP65 luminaires" },
    { zone: "Servery/Pass", ipRating: "IP44", reason: "Spillage risk, heat lamps", fittingType: "IP44 heat lamps, IP44 accessories" }
  ];

  const extractionSystemSupply = {
    components: [
      { component: "Kitchen Extract Fan", typical: "3-15kW", phase: "Three-phase", notes: "Variable speed drive common" },
      { component: "Make-Up Air Unit", typical: "5-20kW", phase: "Three-phase", notes: "Heating elements + fan" },
      { component: "Grease Filter Motor", typical: "0.5-1kW", phase: "Single-phase", notes: "If motorised UV/ESP" },
      { component: "Kitchen Canopy Lights", typical: "100-500W total", phase: "Single-phase", notes: "IP65 LEDs integrated" },
      { component: "Fire Damper Actuators", typical: "24V DC", phase: "From fire panel", notes: "Fail-safe operation" }
    ],
    interlock: [
      "Extract fan must interlock with gas cooking equipment",
      "Make-up air to balance with extract rate",
      "Fire dampers to close on fire alarm activation",
      "Gas isolation valve to close on fire alarm",
      "CO monitoring may be required for solid fuel"
    ]
  };

  const fireSuppressionIntegration = [
    {
      system: "Ansul/Kitchen Fire Suppression",
      electrical: "24V supply from dedicated PSU",
      integration: "Shunt trip for electrical isolation on activation",
      notes: "Gas isolation and fan shutdown interlocked"
    },
    {
      system: "Gas Solenoid Valve",
      electrical: "230V or 24V solenoid, fail-closed",
      integration: "Wired to fire panel and suppression system",
      notes: "Manual reset required after activation"
    },
    {
      system: "Emergency Stop",
      electrical: "Mushroom head E-stop at exit points",
      integration: "Shuts down extract, cooking, and gas",
      notes: "Red/yellow marked, easily accessible"
    },
    {
      system: "Fire Alarm Cause & Effect",
      electrical: "Volt-free contacts to fire panel",
      integration: "Triggers gas shut-off, damper close, extract off",
      notes: "Building-wide fire alarm coordination"
    }
  ];

  const haccpConsiderations = [
    "Electrical equipment must be cleanable and not harbour bacteria",
    "Cables and containment to be sealed or easily cleaned",
    "No exposed wiring above food preparation areas",
    "Socket outlets positioned away from contamination risk",
    "Lighting to be adequate for hygiene inspection (500 lux at prep areas)",
    "Emergency lighting for safe evacuation and food safety",
    "Temperature monitoring for cold storage equipment",
    "Pest-proof entry points for cables"
  ];

  // ============================================
  // SECTION 5: HOTELS & HOSPITALITY
  // ============================================

  const guestRoomCircuits = [
    { circuit: "Room Lighting", cable: "1.5mm LSF", protection: "6A RCBO", notes: "Controlled by card key system" },
    { circuit: "Socket Outlets", cable: "2.5mm LSF", protection: "16A RCBO", notes: "Bed side, desk, and vanity" },
    { circuit: "Bathroom Power", cable: "2.5mm LSF", protection: "16A RCBO", notes: "Shaver socket, heated mirror" },
    { circuit: "HVAC/FCU", cable: "2.5mm LSF", protection: "16A RCBO", notes: "Room thermostat control" },
    { circuit: "Minibar", cable: "2.5mm LSF", protection: "16A RCBO", notes: "Often on permanent power" },
    { circuit: "TV/Entertainment", cable: "2.5mm LSF", protection: "16A spur", notes: "Coax/HDMI/data infrastructure" }
  ];

  const cardKeySystemTypes = [
    {
      type: "Energy Saver Switch",
      description: "Card in slot enables room power (lights, sockets, HVAC)",
      technology: "Magnetic strip, RFID, or smart card",
      considerations: [
        "Permanent circuits for minibar, fire systems",
        "Time delay on exit to allow guest to leave",
        "Master override for housekeeping",
        "Integration with BMS for energy monitoring"
      ]
    },
    {
      type: "Smart Room Control",
      description: "Integrated control of lighting, HVAC, curtains, TV",
      technology: "KNX, DALI, or proprietary protocols",
      considerations: [
        "Scene setting capability",
        "Occupancy detection backup",
        "Guest preference memory",
        "Remote management capability"
      ]
    }
  ];

  const hotelCommonAreas = [
    { area: "Reception/Lobby", lux: "300 lux", control: "Scene control, daylight dimming", features: "Feature lighting, 24-hour operation" },
    { area: "Corridors", lux: "100 lux", control: "Presence detection, time clock", features: "Emergency lighting, quiet operation" },
    { area: "Restaurant", lux: "300 lux dining", control: "Scene control for meal periods", features: "Dimmable, warm colour temperature" },
    { area: "Conference Rooms", lux: "500 lux", control: "AV integration, scene control", features: "Dimmable, blackout capability" },
    { area: "Spa/Pool", lux: "200-300 lux", control: "Scene setting, waterproof control", features: "IP65+ fittings, SELV underwater" },
    { area: "Car Park", lux: "75-100 lux", control: "Daylight sensing, time clock", features: "Vandal-resistant, emergency lighting" },
    { area: "Back of House", lux: "300 lux", control: "Manual switching, occupancy", features: "Functional, energy-efficient" }
  ];

  const hotelEmergencySystems = [
    {
      system: "Emergency Lighting",
      requirement: "All escape routes, high-risk areas, 3 hours duration",
      type: "Central battery or self-contained",
      testing: "Monthly 1/3 function, annual 3-hour discharge"
    },
    {
      system: "Fire Detection",
      requirement: "L1 coverage (full building)",
      type: "Addressable analogue system",
      testing: "Weekly point test, annual service"
    },
    {
      system: "Voice Alarm (PAVA)",
      requirement: "Category A evacuation system",
      type: "EN 54-16 compliant",
      testing: "Weekly, with recorded message verification"
    },
    {
      system: "Emergency Voice Comms",
      requirement: "Fire telephone system at refuge areas",
      type: "BS 5839-9 compliant",
      testing: "Monthly with call verification"
    },
    {
      system: "Refuge Alarm",
      requirement: "Disabled refuge areas, lift lobbies",
      type: "Two-way voice communication",
      testing: "Monthly with reception/fire panel"
    }
  ];

  const backOfHouseVsFrontOfHouse = {
    frontOfHouse: {
      title: "Front of House",
      description: "Guest-facing areas requiring aesthetic consideration",
      items: [
        "Concealed wiring and containment",
        "Architectural lighting design",
        "Quiet electrical systems (no transformer hum)",
        "Coordinated accessory finishes",
        "Discreet fire detection (recessed)",
        "High-quality materials and finishes"
      ]
    },
    backOfHouse: {
      title: "Back of House",
      description: "Staff and service areas - functional over aesthetic",
      items: [
        "Surface-mounted trunking acceptable",
        "Robust industrial-grade accessories",
        "Clear labelling for maintenance",
        "Adequate lighting for tasks (500 lux)",
        "Three-phase distribution for laundry",
        "Commercial kitchen requirements"
      ]
    }
  };

  // ============================================
  // ORIGINAL OVERVIEW STATS AND DATA
  // ============================================

  const overviewStats = [
    { label: "Average Project Duration", value: "1-4 weeks", icon: Clock },
    { label: "Typical Budget Range", value: "5,000-50,000", icon: BadgePoundSterling },
    { label: "Skill Level Required", value: "Advanced", icon: Users },
    { label: "Certificates Required", value: "EIC + EICR", icon: Book }
  ];

  const projectTypes = [
    { type: "Office Fit-out", complexity: 70, duration: "1-2 weeks", cost: "8,000-25,000" },
    { type: "Retail Shop", complexity: 60, duration: "5-10 days", cost: "5,000-15,000" },
    { type: "Restaurant/Kitchen", complexity: 80, duration: "1-3 weeks", cost: "10,000-35,000" },
    { type: "Small Warehouse", complexity: 85, duration: "2-4 weeks", cost: "15,000-50,000" }
  ];

  const complianceRequirements = [
    { requirement: "Building Regulations", description: "Part P notification and compliance", level: "Legal" },
    { requirement: "Fire Safety", description: "Emergency lighting and fire alarm systems", level: "Critical" },
    { requirement: "Three-Phase Design", description: "Balanced loads and proper phase rotation", level: "Essential" },
    { requirement: "Workplace Regulations", description: "Health and safety in commercial premises", level: "Legal" }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/30 bg-white/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-4 w-4 text-elec-yellow" />
                <span className="text-xs text-neutral-300">{stat.label}</span>
              </div>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ============================================ */}
      {/* SECTION 1: WHAT IS COMMERCIAL ELECTRICAL WORK? */}
      {/* ============================================ */}

      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <Building className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-elec-yellow text-xl">What is Commercial Electrical Work?</CardTitle>
              <p className="text-neutral-300 text-sm mt-1">Understanding the differences between domestic, commercial, and industrial sectors</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Work Type Comparison Table */}
          <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700">
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-elec-yellow" />
              Domestic vs Commercial vs Industrial
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-600">
                    <th className="text-left py-2 text-elec-yellow font-medium">Sector</th>
                    <th className="text-left py-2 text-elec-yellow font-medium">Voltage</th>
                    <th className="text-left py-2 text-elec-yellow font-medium">Scale</th>
                    <th className="text-left py-2 text-elec-yellow font-medium hidden lg:table-cell">Key Regulations</th>
                  </tr>
                </thead>
                <tbody>
                  {workTypeComparison.map((sector, idx) => (
                    <tr key={idx} className="border-b border-neutral-700">
                      <td className="py-3">
                        <span className="font-medium text-white">{sector.type}</span>
                        <p className="text-xs text-neutral-400 mt-1">{sector.description}</p>
                      </td>
                      <td className="py-3 text-neutral-300">{sector.voltage}</td>
                      <td className="py-3 text-neutral-300">{sector.scale}</td>
                      <td className="py-3 text-neutral-300 hidden lg:table-cell">{sector.regulations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Types of Commercial Premises */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Store className="h-5 w-5 text-elec-yellow" />
              Types of Commercial Premises
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commercialPremisesTypes.map((premise, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    premise.color === 'blue' ? 'bg-blue-500/10 border-blue-500/30' :
                    premise.color === 'pink' ? 'bg-pink-500/10 border-pink-500/30' :
                    premise.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' :
                    premise.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30' :
                    premise.color === 'green' ? 'bg-green-500/10 border-green-500/30' :
                    'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <premise.icon className={`h-5 w-5 ${
                      premise.color === 'blue' ? 'text-blue-400' :
                      premise.color === 'pink' ? 'text-pink-400' :
                      premise.color === 'amber' ? 'text-amber-400' :
                      premise.color === 'purple' ? 'text-purple-400' :
                      premise.color === 'green' ? 'text-green-400' :
                      'text-red-400'
                    }`} />
                    <span className="font-medium text-white">{premise.type}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-3">{premise.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {premise.keyFeatures.map((feature, fidx) => (
                      <Badge key={fidx} variant="outline" className="text-xs border-neutral-600 text-neutral-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Commercial is Different */}
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Why Commercial Work is Different
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyCommercialDifferent.map((factor, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <factor.icon className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white text-sm">{factor.factor}</span>
                    <p className="text-xs text-neutral-400 mt-1">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Progression */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-elec-yellow" />
              Career Progression in Commercial Electrical Work
            </h4>
            <div className="space-y-4">
              {careerProgression.map((stage, idx) => (
                <div key={idx} className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                    <div>
                      <Badge variant="outline" className="border-elec-yellow text-elec-yellow mb-2">
                        {stage.level}
                      </Badge>
                      <p className="text-white font-medium">{stage.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-neutral-400">Key Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {stage.skills.map((skill, sidx) => (
                          <Badge key={sidx} variant="outline" className="text-xs border-green-500/50 text-green-400">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400">Qualifications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {stage.qualifications.map((qual, qidx) => (
                          <Badge key={qidx} variant="outline" className="text-xs border-blue-500/50 text-blue-400">
                            {qual}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================ */}
      {/* SECTION 2: OFFICE FIT-OUTS */}
      {/* ============================================ */}

      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-blue-300 text-xl">Office Fit-Outs</CardTitle>
              <p className="text-neutral-300 text-sm mt-1">Complete guide to electrical installations in office environments</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Office Layout Types */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-400" />
              Office Layout Types & Electrical Approaches
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {officeLayoutTypes.map((layout, idx) => (
                <div key={idx} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h5 className="font-medium text-blue-300 mb-2">{layout.type}</h5>
                  <p className="text-xs text-neutral-400 mb-3">{layout.description}</p>
                  <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs mb-3">
                    {layout.electrical}
                  </Badge>
                  <ul className="space-y-1">
                    {layout.considerations.map((point, pidx) => (
                      <li key={pidx} className="text-xs text-neutral-300 flex items-start gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Lighting Requirements */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <h4 className="font-semibold text-amber-300 mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Lighting Requirements (BS EN 12464-1)
            </h4>
            <Alert className="border-amber-500/50 bg-amber-500/10 mb-4">
              <Info className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200 text-sm">
                <strong>Key Standard:</strong> BS EN 12464-1 specifies minimum maintained illuminance levels for indoor workplaces. These are minimum values - actual design often exceeds these for quality lighting.
              </AlertDescription>
            </Alert>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Area</th>
                    <th className="text-left py-2 text-amber-200">Lux Level</th>
                    <th className="text-left py-2 text-amber-200 hidden md:table-cell">Standard</th>
                    <th className="text-left py-2 text-amber-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {officeLuxLevels.map((level, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white font-medium">{level.area}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs">
                          {level.lux}
                        </Badge>
                      </td>
                      <td className="py-2 text-neutral-300 hidden md:table-cell">{level.standard}</td>
                      <td className="py-2 text-neutral-400 text-xs">{level.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data and Power Segregation */}
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <Network className="h-5 w-5" />
              {dataSegregation.title}
            </h4>
            <Alert className="border-red-500/50 bg-red-500/10 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                <strong>Critical:</strong> Failure to segregate power and data cables can cause electromagnetic interference, data corruption, and equipment malfunction.
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              {dataSegregation.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-purple-600/10 p-3 rounded border border-purple-500/20">
                  <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs flex-shrink-0 mt-0.5">
                    {req.regulation}
                  </Badge>
                  <div>
                    <span className="font-medium text-white text-sm">{req.category}</span>
                    <p className="text-xs text-neutral-400 mt-1">{req.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Containment Systems */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Cable className="h-5 w-5 text-blue-400" />
              Trunking & Containment Systems
            </h4>
            <div className="space-y-4">
              {officeContainmentSystems.map((system, idx) => (
                <div key={idx} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                    <div>
                      <h5 className="font-medium text-blue-300">{system.system}</h5>
                      <p className="text-sm text-neutral-300 mt-1">{system.description}</p>
                    </div>
                    <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs flex-shrink-0">
                      {system.uses}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-neutral-400">Advantages:</span>
                      <ul className="mt-1 space-y-1">
                        {system.advantages.map((adv, aidx) => (
                          <li key={aidx} className="text-xs text-neutral-300 flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400">Cables:</span>
                      <p className="text-xs text-neutral-300 mt-1">{system.cables}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Office Circuits */}
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-300 mb-4 flex items-center gap-2">
              <CircuitBoard className="h-5 w-5" />
              Typical Office Circuits
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-500/30">
                    <th className="text-left py-2 text-green-200">Circuit</th>
                    <th className="text-left py-2 text-green-200">Cable</th>
                    <th className="text-left py-2 text-green-200">Protection</th>
                    <th className="text-left py-2 text-green-200 hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {officeTypicalCircuits.map((circuit, idx) => (
                    <tr key={idx} className="border-b border-green-500/20">
                      <td className="py-2 text-white font-medium">{circuit.circuit}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                          {circuit.cable}
                        </Badge>
                      </td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                          {circuit.protection}
                        </Badge>
                      </td>
                      <td className="py-2 text-neutral-400 text-xs hidden md:table-cell">{circuit.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Server Room Alert */}
          <Alert className="border-red-500/50 bg-red-500/10">
            <Server className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-sm">
              <strong>Server Room Considerations:</strong> Server rooms require dedicated circuits, UPS backup, adequate cooling capacity (often 2-3kW per rack), early warning fire detection, and emergency lighting. Consider dual utility feeds for critical applications.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* ============================================ */}
      {/* SECTION 3: RETAIL & SHOP INSTALLATIONS */}
      {/* ============================================ */}

      <Card className="border-pink-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Store className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <CardTitle className="text-pink-300 text-xl">Retail & Shop Installations</CardTitle>
              <p className="text-neutral-300 text-sm mt-1">Display lighting, POS systems, security, and accessibility requirements</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Display Lighting */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-pink-400" />
              Display Lighting & Track Systems
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {retailLightingTypes.map((lighting, idx) => (
                <div key={idx} className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                  <h5 className="font-medium text-pink-300 mb-2">{lighting.type}</h5>
                  <p className="text-xs text-neutral-400 mb-2">{lighting.description}</p>
                  <Badge variant="outline" className="border-pink-400 text-pink-300 text-xs mb-3">
                    {lighting.typical}
                  </Badge>
                  <ul className="space-y-1">
                    {lighting.considerations.map((point, pidx) => (
                      <li key={pidx} className="text-xs text-neutral-300 flex items-start gap-2">
                        <span className="w-1 h-1 bg-pink-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* POS & Till Circuits */}
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              POS & Till Circuits
            </h4>
            <Alert className="border-blue-500/50 bg-blue-500/10 mb-4">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200 text-sm">
                Point of Sale systems are business-critical. Consider UPS protection to prevent data loss during power failures and ensure adequate data connectivity for card payments.
              </AlertDescription>
            </Alert>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="text-left py-2 text-blue-200">Equipment</th>
                    <th className="text-left py-2 text-blue-200">Circuit</th>
                    <th className="text-left py-2 text-blue-200">Protection</th>
                    <th className="text-left py-2 text-blue-200 hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {retailPOSCircuits.map((item, idx) => (
                    <tr key={idx} className="border-b border-blue-500/20">
                      <td className="py-2 text-white font-medium">{item.equipment}</td>
                      <td className="py-2 text-neutral-300">{item.circuit}</td>
                      <td className="py-2 text-neutral-300">{item.protection}</td>
                      <td className="py-2 text-neutral-400 text-xs hidden md:table-cell">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Systems */}
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security Systems Integration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {retailSecuritySystems.map((system, idx) => (
                <div key={idx} className="bg-purple-600/10 p-3 rounded border border-purple-500/20">
                  <h5 className="font-medium text-purple-300 mb-2">{system.system}</h5>
                  <div className="space-y-1 text-xs">
                    <p className="text-neutral-300"><strong className="text-purple-200">Power:</strong> {system.power}</p>
                    <p className="text-neutral-300"><strong className="text-purple-200">Cable:</strong> {system.cable}</p>
                    <p className="text-neutral-400">{system.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refrigeration Circuits */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-300 mb-4 flex items-center gap-2">
              <Refrigerator className="h-5 w-5" />
              Refrigeration Circuits (Food Retail)
            </h4>
            <Alert className="border-cyan-500/50 bg-cyan-500/10 mb-4">
              <AlertTriangle className="h-4 w-4 text-cyan-400" />
              <AlertDescription className="text-cyan-200 text-sm">
                <strong>Food Safety:</strong> Refrigeration circuits must be on dedicated supplies to prevent accidental isolation. Consider alarm systems for temperature monitoring and power failure notification.
              </AlertDescription>
            </Alert>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 text-cyan-200">Equipment</th>
                    <th className="text-left py-2 text-cyan-200">Rating</th>
                    <th className="text-left py-2 text-cyan-200">Circuit</th>
                    <th className="text-left py-2 text-cyan-200">Protection</th>
                  </tr>
                </thead>
                <tbody>
                  {retailRefrigerationCircuits.map((item, idx) => (
                    <tr key={idx} className="border-b border-cyan-500/20">
                      <td className="py-2 text-white font-medium">{item.equipment}</td>
                      <td className="py-2 text-neutral-300">{item.rating}</td>
                      <td className="py-2 text-neutral-300">{item.circuit}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                          {item.protection}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Emergency Lighting */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <h4 className="font-semibold text-red-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Lighting for Public Areas
            </h4>
            <Alert className="border-red-500/50 bg-red-500/10 mb-4">
              <Shield className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                <strong>BS 5266-1:</strong> Emergency lighting is required in all premises to which the public has access. The system must provide adequate illumination for safe evacuation and highlight fire safety equipment.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {retailEmergencyLighting.map((area, idx) => (
                <div key={idx} className="bg-red-600/10 p-3 rounded border border-red-500/20">
                  <h5 className="font-medium text-red-300 mb-2">{area.area}</h5>
                  <div className="space-y-1 text-xs">
                    <p className="text-neutral-300"><strong className="text-red-200">Requirement:</strong> {area.requirement}</p>
                    <p className="text-neutral-300"><strong className="text-red-200">Type:</strong> {area.type}</p>
                    <p className="text-neutral-300"><strong className="text-red-200">Duration:</strong> {area.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Requirements */}
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-300 mb-4 flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility Requirements (DDA/Equality Act)
            </h4>
            <Alert className="border-green-500/50 bg-green-500/10 mb-4">
              <Info className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200 text-sm">
                <strong>Equality Act 2010:</strong> Service providers must make reasonable adjustments to ensure disabled people can access services. This includes consideration of electrical installation design.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {accessibilityRequirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-green-600/10 p-3 rounded border border-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white text-sm">{req.requirement}</span>
                    <p className="text-xs text-neutral-400 mt-1">{req.detail}</p>
                    <Badge variant="outline" className="border-green-400 text-green-300 text-xs mt-2">
                      {req.reference}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================ */}
      {/* SECTION 4: RESTAURANT & COMMERCIAL KITCHEN */}
      {/* ============================================ */}

      <Card className="border-amber-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <ChefHat className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-amber-300 text-xl">Restaurant & Commercial Kitchen</CardTitle>
              <p className="text-neutral-300 text-sm mt-1">Three-phase equipment, IP ratings, extraction, and fire suppression</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Commercial Kitchen Equipment Ratings */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              Commercial Kitchen Equipment Electrical Requirements
            </h4>
            <Alert className="border-amber-500/50 bg-amber-500/10 mb-4">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200 text-sm">
                <strong>High Power Demand:</strong> Commercial kitchens have significant electrical loads, often 50-150kW or more. Three-phase distribution and careful load balancing is essential.
              </AlertDescription>
            </Alert>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Equipment</th>
                    <th className="text-left py-2 text-amber-200">Rating</th>
                    <th className="text-left py-2 text-amber-200">Phase</th>
                    <th className="text-left py-2 text-amber-200 hidden md:table-cell">Cable</th>
                    <th className="text-left py-2 text-amber-200">Protection</th>
                  </tr>
                </thead>
                <tbody>
                  {kitchenEquipmentRatings.map((item, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white font-medium">{item.equipment}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-red-400 text-red-300 text-xs">
                          {item.rating}
                        </Badge>
                      </td>
                      <td className="py-2 text-neutral-300">{item.phase}</td>
                      <td className="py-2 text-neutral-300 hidden md:table-cell">{item.cable}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs">
                          {item.protection}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* IP Ratings for Commercial Kitchens */}
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-300 mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              IP Ratings for Commercial Kitchens
            </h4>
            <Alert className="border-cyan-500/50 bg-cyan-500/10 mb-4">
              <Shield className="h-4 w-4 text-cyan-400" />
              <AlertDescription className="text-cyan-200 text-sm">
                <strong>Minimum IP44:</strong> Commercial kitchen areas typically require IP44 minimum, with IP65 in areas subject to washdown, steam, or grease.
              </AlertDescription>
            </Alert>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 text-cyan-200">Zone</th>
                    <th className="text-left py-2 text-cyan-200">IP Rating</th>
                    <th className="text-left py-2 text-cyan-200 hidden md:table-cell">Reason</th>
                    <th className="text-left py-2 text-cyan-200">Fitting Type</th>
                  </tr>
                </thead>
                <tbody>
                  {kitchenIPRatings.map((zone, idx) => (
                    <tr key={idx} className="border-b border-cyan-500/20">
                      <td className="py-2 text-white font-medium">{zone.zone}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs">
                          {zone.ipRating}
                        </Badge>
                      </td>
                      <td className="py-2 text-neutral-400 text-xs hidden md:table-cell">{zone.reason}</td>
                      <td className="py-2 text-neutral-300 text-xs">{zone.fittingType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Extraction System Supplies */}
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <Wind className="h-5 w-5" />
              Extraction System Supplies
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-3">System Components</h5>
                <div className="space-y-2">
                  {extractionSystemSupply.components.map((comp, idx) => (
                    <div key={idx} className="bg-blue-600/10 p-3 rounded border border-blue-500/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-blue-200 text-sm">{comp.component}</span>
                        <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                          {comp.typical}
                        </Badge>
                      </div>
                      <p className="text-xs text-neutral-400">{comp.phase} - {comp.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-white mb-3">Interlock Requirements</h5>
                <Alert className="border-red-500/50 bg-red-500/10 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200 text-xs">
                    <strong>Gas Safety:</strong> Extraction must interlock with gas supplies - if extract fails, gas must isolate.
                  </AlertDescription>
                </Alert>
                <ul className="space-y-2">
                  {extractionSystemSupply.interlock.map((item, idx) => (
                    <li key={idx} className="text-sm text-neutral-300 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Fire Suppression Integration */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <h4 className="font-semibold text-red-300 mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Fire Suppression Integration
            </h4>
            <Alert className="border-red-500/50 bg-red-500/10 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                <strong>Critical Integration:</strong> Kitchen fire suppression systems (Ansul, Amerex, etc.) must integrate with electrical systems to isolate power and gas on activation.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fireSuppressionIntegration.map((system, idx) => (
                <div key={idx} className="bg-red-600/10 p-3 rounded border border-red-500/20">
                  <h5 className="font-medium text-red-300 mb-2">{system.system}</h5>
                  <div className="space-y-1 text-xs">
                    <p className="text-neutral-300"><strong className="text-red-200">Electrical:</strong> {system.electrical}</p>
                    <p className="text-neutral-300"><strong className="text-red-200">Integration:</strong> {system.integration}</p>
                    <p className="text-neutral-400">{system.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HACCP Compliance */}
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-300 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              HACCP Compliance Considerations
            </h4>
            <Alert className="border-green-500/50 bg-green-500/10 mb-4">
              <Info className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200 text-sm">
                <strong>HACCP:</strong> Hazard Analysis Critical Control Points - electrical installations must support food safety requirements and not create contamination risks.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {haccpConsiderations.map((item, idx) => (
                <div key={idx} className="text-sm text-neutral-300 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================ */}
      {/* SECTION 5: HOTELS & HOSPITALITY */}
      {/* ============================================ */}

      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Hotel className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-purple-300 text-xl">Hotels & Hospitality</CardTitle>
              <p className="text-neutral-300 text-sm mt-1">Guest room circuits, card key systems, and emergency requirements</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Guest Room Circuits */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-purple-400" />
              Guest Room Circuits
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="text-left py-2 text-purple-200">Circuit</th>
                    <th className="text-left py-2 text-purple-200">Cable</th>
                    <th className="text-left py-2 text-purple-200">Protection</th>
                    <th className="text-left py-2 text-purple-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {guestRoomCircuits.map((circuit, idx) => (
                    <tr key={idx} className="border-b border-purple-500/20">
                      <td className="py-2 text-white font-medium">{circuit.circuit}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                          {circuit.cable}
                        </Badge>
                      </td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                          {circuit.protection}
                        </Badge>
                      </td>
                      <td className="py-2 text-neutral-400 text-xs">{circuit.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card Key Systems */}
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h4 className="font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Card Key Systems
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cardKeySystemTypes.map((system, idx) => (
                <div key={idx} className="bg-purple-600/10 p-4 rounded border border-purple-500/20">
                  <h5 className="font-medium text-purple-300 mb-2">{system.type}</h5>
                  <p className="text-sm text-neutral-300 mb-2">{system.description}</p>
                  <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs mb-3">
                    {system.technology}
                  </Badge>
                  <ul className="space-y-1">
                    {system.considerations.map((point, pidx) => (
                      <li key={pidx} className="text-xs text-neutral-400 flex items-start gap-2">
                        <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Common Area Lighting */}
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <h4 className="font-semibold text-amber-300 mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Common Area Lighting Control
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Area</th>
                    <th className="text-left py-2 text-amber-200">Lux Level</th>
                    <th className="text-left py-2 text-amber-200">Control</th>
                    <th className="text-left py-2 text-amber-200 hidden md:table-cell">Features</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelCommonAreas.map((area, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white font-medium">{area.area}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs">
                          {area.lux}
                        </Badge>
                      </td>
                      <td className="py-2 text-neutral-300 text-xs">{area.control}</td>
                      <td className="py-2 text-neutral-400 text-xs hidden md:table-cell">{area.features}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back of House vs Front of House */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
              <h5 className="font-semibold text-pink-300 mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {backOfHouseVsFrontOfHouse.frontOfHouse.title}
              </h5>
              <p className="text-xs text-neutral-400 mb-3">{backOfHouseVsFrontOfHouse.frontOfHouse.description}</p>
              <ul className="space-y-2">
                {backOfHouseVsFrontOfHouse.frontOfHouse.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-neutral-300 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-700/30 p-4 rounded-lg border border-neutral-600">
              <h5 className="font-semibold text-neutral-300 mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                {backOfHouseVsFrontOfHouse.backOfHouse.title}
              </h5>
              <p className="text-xs text-neutral-400 mb-3">{backOfHouseVsFrontOfHouse.backOfHouse.description}</p>
              <ul className="space-y-2">
                {backOfHouseVsFrontOfHouse.backOfHouse.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-neutral-300 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Emergency Systems */}
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <h4 className="font-semibold text-red-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Systems Requirements
            </h4>
            <Alert className="border-red-500/50 bg-red-500/10 mb-4">
              <Shield className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                <strong>BS 5839 & BS 5266:</strong> Hotels require comprehensive fire detection, voice alarm, and emergency lighting systems due to sleeping accommodation and public access.
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              {hotelEmergencySystems.map((system, idx) => (
                <div key={idx} className="bg-red-600/10 p-3 rounded border border-red-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                    <h5 className="font-medium text-red-300">{system.system}</h5>
                    <Badge variant="outline" className="border-red-400 text-red-300 text-xs w-fit">
                      {system.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <p className="text-neutral-300"><strong className="text-red-200">Requirement:</strong> {system.requirement}</p>
                    <p className="text-neutral-300"><strong className="text-red-200">Testing:</strong> {system.testing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================ */}
      {/* ORIGINAL PROJECT TYPES AND COMPLIANCE */}
      {/* ============================================ */}

      {/* Project Types Guide */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Commercial Project Types</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectTypes.map((project, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                <h4 className="font-medium text-white">{project.type}</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                    {project.duration}
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    {project.cost}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300">Complexity Level</span>
                  <span className="text-blue-300">{project.complexity}%</span>
                </div>
                <Progress value={project.complexity} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Requirements */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Compliance Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {complianceRequirements.map((req, index) => (
            <div key={index} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-orange-200 mb-1">{req.requirement}</h4>
                  <p className="text-sm text-neutral-300">{req.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    req.level === 'Critical' ? 'border-red-500 text-red-400' :
                    req.level === 'Legal' ? 'border-purple-500 text-purple-400' :
                    'border-orange-500 text-orange-400'
                  }`}
                >
                  {req.level}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pre-Project Checklist */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Commercial Project Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Coordinate with building management and other trades",
            "Obtain all necessary permits and Building Control approval",
            "Complete detailed site survey including services coordination",
            "Design emergency lighting and fire alarm systems",
            "Calculate three-phase loads and diversity factors",
            "Plan installation phases to minimise business disruption",
            "Arrange inspection schedules with Building Control",
            "Prepare comprehensive testing and commissioning plan"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-neutral-300">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommercialOverviewCards;
