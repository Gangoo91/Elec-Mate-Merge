export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  brands: string[];
  specifications?: {
    [key: string]: string;
  };
  features?: string[];
  ukStandards?: string[];
  imageUrl?: string;
  suppliers: {
    [key: string]: {
      price: number;
      availability: "in-stock" | "low-stock" | "out-of-stock";
      delivery: string;
      productUrl?: string;
    };
  };
  rating?: number;
  reviewCount?: number;
  priority: "essential" | "recommended" | "optional";
  apprenticeLevel?: "new" | "intermediate" | "advanced";
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subCategories: string[];
  essentialCount: number;
  totalCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  popularBrands: string[];
  topTools: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: "hand-tools",
    name: "Hand Tools",
    description: "Essential hand tools for electrical work",
    icon: "Wrench",
    subCategories: ["Screwdrivers", "Pliers", "Wire Strippers", "Spanners", "Measuring"],
    essentialCount: 12,
    totalCount: 45,
    priceRange: { min: 5, max: 150 },
    popularBrands: ["Wera", "Klein", "Wiha", "CK Tools"],
    topTools: ["Insulated screwdriver set", "Long nose pliers", "Wire strippers"]
  },
  {
    id: "test-equipment",
    name: "Test Equipment",
    description: "Testing and measurement equipment",
    icon: "Calculator", 
    subCategories: ["Multifunction Testers", "Socket Testers", "Voltage Testers", "Clamp Meters", "Insulation Testers"],
    essentialCount: 8,
    totalCount: 32,
    priceRange: { min: 15, max: 2500 },
    popularBrands: ["Fluke", "Megger", "Martindale", "Kewtech"],
    topTools: ["Socket tester", "Voltage tester", "Multifunction tester"]
  },
  {
    id: "power-tools",
    name: "Power Tools",
    description: "Power tools and accessories",
    icon: "Zap",
    subCategories: ["Drills", "Saws", "Grinders", "Torches", "Vacuum Cleaners"],
    essentialCount: 6,
    totalCount: 28,
    priceRange: { min: 25, max: 800 },
    popularBrands: ["Makita", "DeWalt", "Milwaukee", "Bosch"],
    topTools: ["Cordless drill", "SDS drill", "LED work light"]
  },
  {
    id: "safety-equipment",
    name: "Safety Equipment",
    description: "PPE and safety equipment",
    icon: "Shield",
    subCategories: ["Hard Hats", "Safety Boots", "Hi-Vis", "Gloves", "Eye Protection"],
    essentialCount: 8,
    totalCount: 24,
    priceRange: { min: 8, max: 200 },
    popularBrands: ["JSP", "Portwest", "3M", "Uvex"],
    topTools: ["Hard hat", "Safety boots", "Hi-vis vest"]
  },
  {
    id: "specialist-tools",
    name: "Specialist Tools",
    description: "Specialist electrical tools",
    icon: "Wrench",
    subCategories: ["Cable Pullers", "Conduit Benders", "Fish Tapes", "Knockout Sets", "Threading Tools"],
    essentialCount: 4,
    totalCount: 18,
    priceRange: { min: 30, max: 600 },
    popularBrands: ["Greenlee", "Klein", "Ridgid", "CK Tools"],
    topTools: ["Fish tape", "Conduit bender", "Cable puller"]
  },
  {
    id: "tool-storage",
    name: "Tool Storage",
    description: "Tool bags, boxes and storage",
    icon: "Package",
    subCategories: ["Tool Bags", "Tool Boxes", "Van Storage", "Belt Pouches", "Cases"],
    essentialCount: 3,
    totalCount: 15,
    priceRange: { min: 20, max: 400 },
    popularBrands: ["Stanley", "DeWalt", "Makita", "CK Tools"],
    topTools: ["Tool bag", "Tool box", "Belt pouch"]
  }
];

export const tools: Tool[] = [
  // Hand Tools
  {
    id: "insulated-screwdriver-set",
    name: "Insulated Screwdriver Set",
    description: "VDE tested screwdriver set for live electrical work",
    category: "hand-tools",
    subCategory: "Screwdrivers",
    price: { min: 25, max: 85, currency: "GBP" },
    brands: ["Wera", "Wiha", "CK Tools", "Klein"],
    specifications: {
      "Voltage Rating": "1000V",
      "Standard": "VDE 0682-201",
      "Pieces": "6-8 pieces"
    },
    features: ["VDE tested", "Ergonomic handles", "Colour coded tips"],
    ukStandards: ["BS EN 60900"],
    suppliers: {
      "screwfix": { price: 32.99, availability: "in-stock", delivery: "Next day" },
      "toolstation": { price: 29.99, availability: "in-stock", delivery: "Next day" },
      "rs-components": { price: 45.50, availability: "in-stock", delivery: "2 days" }
    },
    rating: 4.6,
    reviewCount: 127,
    priority: "essential",
    apprenticeLevel: "new"
  },
  {
    id: "long-nose-pliers",
    name: "Long Nose Pliers",
    description: "Insulated long nose pliers for precision work",
    category: "hand-tools",
    subCategory: "Pliers",
    price: { min: 15, max: 45, currency: "GBP" },
    brands: ["Klein", "CK Tools", "Knipex", "Bahco"],
    specifications: {
      "Length": "160-200mm",
      "Insulation": "VDE tested",
      "Jaw Type": "Serrated"
    },
    suppliers: {
      "screwfix": { price: 18.99, availability: "in-stock", delivery: "Next day" },
      "cef": { price: 22.50, availability: "low-stock", delivery: "3 days" }
    },
    rating: 4.4,
    reviewCount: 89,
    priority: "essential",
    apprenticeLevel: "new"
  },
  {
    id: "wire-strippers",
    name: "Automatic Wire Strippers",
    description: "Professional wire strippers for multiple cable sizes",
    category: "hand-tools",
    subCategory: "Wire Strippers",
    price: { min: 12, max: 35, currency: "GBP" },
    brands: ["Klein", "CK Tools", "Wiha", "Wera"],
    specifications: {
      "Cable Range": "0.5-6mm²",
      "Type": "Automatic",
      "Material": "Hardened steel"
    },
    suppliers: {
      "screwfix": { price: 16.99, availability: "in-stock", delivery: "Next day" },
      "toolstation": { price: 14.99, availability: "in-stock", delivery: "Next day" }
    },
    rating: 4.3,
    reviewCount: 156,
    priority: "essential",
    apprenticeLevel: "new"
  },

  // Test Equipment
  {
    id: "socket-tester",
    name: "Socket Tester",
    description: "13A socket tester for quick polarity and earth checks",
    category: "test-equipment",
    subCategory: "Socket Testers",
    price: { min: 8, max: 25, currency: "GBP" },
    brands: ["Martindale", "Kewtech", "Socket & See", "Fluke"],
    specifications: {
      "Voltage": "230V AC",
      "Tests": "Polarity, Earth, RCD",
      "Display": "LED indicators"
    },
    ukStandards: ["BS 7909"],
    suppliers: {
      "screwfix": { price: 12.99, availability: "in-stock", delivery: "Next day" },
      "rs-components": { price: 18.50, availability: "in-stock", delivery: "Next day" },
      "cef": { price: 15.99, availability: "in-stock", delivery: "Same day" }
    },
    rating: 4.5,
    reviewCount: 203,
    priority: "essential",
    apprenticeLevel: "new"
  },
  {
    id: "voltage-tester",
    name: "Non-Contact Voltage Tester",
    description: "Safe voltage detection without contact",
    category: "test-equipment",
    subCategory: "Voltage Testers",
    price: { min: 15, max: 60, currency: "GBP" },
    brands: ["Fluke", "Klein", "Martindale", "Kewtech"],
    specifications: {
      "Range": "12V-1000V AC",
      "Detection": "Non-contact",
      "Audio": "Audible and visual alerts"
    },
    suppliers: {
      "screwfix": { price: 24.99, availability: "in-stock", delivery: "Next day" },
      "toolstation": { price: 22.99, availability: "in-stock", delivery: "Next day" }
    },
    rating: 4.7,
    reviewCount: 178,
    priority: "essential",
    apprenticeLevel: "new"
  },

  // Power Tools
  {
    id: "cordless-drill",
    name: "Cordless Drill/Driver",
    description: "18V cordless drill with hammer function",
    category: "power-tools",
    subCategory: "Drills",
    price: { min: 60, max: 250, currency: "GBP" },
    brands: ["Makita", "DeWalt", "Milwaukee", "Bosch"],
    specifications: {
      "Voltage": "18V Li-ion",
      "Chuck": "13mm keyless",
      "Torque": "40-60 Nm"
    },
    suppliers: {
      "screwfix": { price: 89.99, availability: "in-stock", delivery: "Next day" },
      "toolstation": { price: 95.99, availability: "in-stock", delivery: "Next day" }
    },
    rating: 4.6,
    reviewCount: 342,
    priority: "essential",
    apprenticeLevel: "new"
  },

  // Safety Equipment
  {
    id: "hard-hat",
    name: "Safety Hard Hat",
    description: "EN397 approved safety helmet",
    category: "safety-equipment",
    subCategory: "Hard Hats",
    price: { min: 8, max: 35, currency: "GBP" },
    brands: ["JSP", "Portwest", "3M", "Uvex"],
    specifications: {
      "Standard": "EN 397",
      "Material": "HDPE",
      "Adjustment": "Ratchet or pin-lock"
    },
    ukStandards: ["EN 397"],
    suppliers: {
      "screwfix": { price: 12.99, availability: "in-stock", delivery: "Next day" },
      "toolstation": { price: 11.99, availability: "in-stock", delivery: "Next day" }
    },
    rating: 4.2,
    reviewCount: 89,
    priority: "essential",
    apprenticeLevel: "new"
  }
];

export const suppliers = {
  "screwfix": {
    name: "Screwfix",
    website: "https://www.screwfix.com",
    logo: "/suppliers/screwfix-logo.png",
    description: "Trade electrical supplies and tools",
    deliveryOptions: ["Next day", "Click & collect"],
    paymentMethods: ["Trade account", "Credit card", "PayPal"]
  },
  "toolstation": {
    name: "Toolstation", 
    website: "https://www.toolstation.com",
    logo: "/suppliers/toolstation-logo.png",
    description: "Tools and electrical supplies",
    deliveryOptions: ["Next day", "Click & collect"],
    paymentMethods: ["Trade account", "Credit card", "PayPal"]
  },
  "rs-components": {
    name: "RS Components",
    website: "https://uk.rs-online.com",
    logo: "/suppliers/rs-logo.png",
    description: "Professional electrical equipment",
    deliveryOptions: ["Next day", "Same day"],
    paymentMethods: ["Trade account", "Credit card", "Purchase order"]
  },
  "cef": {
    name: "City Electrical Factors",
    website: "https://www.cef.co.uk",
    logo: "/suppliers/cef-logo.png", 
    description: "Electrical wholesaler nationwide",
    deliveryOptions: ["Same day", "Next day", "Click & collect"],
    paymentMethods: ["Trade account", "Credit card"]
  }
};

export const buyingGuides = [
  {
    id: "essential-toolkit",
    title: "Essential Tool Kit for New Electricians",
    description: "Complete guide to building your first professional toolkit",
    category: "getting-started",
    estimatedCost: { min: 500, max: 1200 },
    timeToRead: "8 min",
    lastUpdated: "2024-08-20"
  },
  {
    id: "test-equipment-guide",
    title: "Choosing the Right Test Equipment", 
    description: "Comprehensive guide to selecting testing instruments",
    category: "test-equipment",
    estimatedCost: { min: 100, max: 3000 },
    timeToRead: "12 min",
    lastUpdated: "2024-08-15"
  },
  {
    id: "tool-maintenance",
    title: "Tool Maintenance & Care",
    description: "Keep your tools in perfect working condition",
    category: "maintenance",
    estimatedCost: { min: 50, max: 200 },
    timeToRead: "6 min",
    lastUpdated: "2024-08-10"
  },
  {
    id: "budget-shopping",
    title: "Budget Tool Shopping Strategies",
    description: "Get professional tools without breaking the bank",
    category: "budget",
    estimatedCost: { min: 200, max: 800 },
    timeToRead: "10 min",
    lastUpdated: "2024-08-18"
  }
];