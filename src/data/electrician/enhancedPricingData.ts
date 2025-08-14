// Enhanced Electrical Materials Pricing System
// Practical improvements without external APIs

export interface EnhancedMaterialItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  defaultPrice: number;
  code?: string;
  brand?: string;
  
  // Enhanced pricing features
  priceHistory?: {
    date: string;
    price: number;
    source: string;
  }[];
  priceSource: string;
  lastUpdated: string;
  confidenceLevel: 'high' | 'medium' | 'low';
  regionalMarkup?: {
    london: number;
    southeast: number;
    southwest: number;
    midlands: number;
    north: number;
    scotland: number;
    wales: number;
    ni: number;
  };
  
  // Quantity-based pricing
  quantityTiers?: {
    minQty: number;
    discount: number; // percentage
  }[];
  
  // Installation & specs
  installationDifficulty: 'easy' | 'medium' | 'hard';
  estimatedInstallTime: number; // minutes
  wasteFactor: number; // percentage (e.g., 0.1 = 10%)
  weight?: number; // kg per unit
  
  // Alternatives & recommendations
  alternatives?: string[]; // IDs of alternative items
  commonlyBoughtWith?: string[]; // IDs of frequently paired items
  
  // Business features
  isFavourite?: boolean;
  lastUsed?: string;
  notes?: string;
}

export interface PricingSettings {
  defaultMarkup: number; // percentage
  bulkDiscountThreshold: number; // quantity
  bulkDiscountRate: number; // percentage
  wasteBudgetAllowance: number; // percentage
  regionalMultiplier: number; // based on postcode
  vatRate: number;
  tradeAccountDiscount: number; // percentage
  lastPriceUpdate: string;
}

// Standard quantity discount tiers
export const standardQuantityTiers = [
  { minQty: 1, discount: 0 },
  { minQty: 10, discount: 5 },
  { minQty: 25, discount: 8 },
  { minQty: 50, discount: 12 },
  { minQty: 100, discount: 15 },
  { minQty: 250, discount: 18 }
];

// Regional pricing multipliers (base = 1.0)
export const regionalMultipliers = {
  london: 1.15,
  southeast: 1.08,
  southwest: 1.02,
  midlands: 1.0,
  north: 0.95,
  scotland: 1.05,
  wales: 0.98,
  ni: 1.03
};

// Installation time estimates (minutes per unit)
export const installationTimes = {
  'socket': 30,
  'switch': 25,
  'light_fitting': 45,
  'mcb': 15,
  'consumer_unit': 240,
  'cable_per_metre': 2,
  'downlight': 35,
  'rcd': 20,
  'conduit_per_metre': 3
};

// Waste factors by material type
export const wastageFactors = {
  cables: 0.15, // 15% waste
  accessories: 0.05, // 5% waste
  distribution: 0.02, // 2% waste
  lighting: 0.08, // 8% waste
  containment: 0.12, // 12% waste
  heating: 0.05 // 5% waste
};

// Enhanced materials database with pricing intelligence
export const enhancedMaterials: EnhancedMaterialItem[] = [
  // Cables & Wiring - Enhanced with pricing data
  {
    id: "cable-te-1.0",
    name: "1.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 1.15,
    code: "TE1.0",
    brand: "Generic Trade",
    priceSource: "CEF/Rexel average trade pricing",
    lastUpdated: "2025-01-15",
    confidenceLevel: "high",
    quantityTiers: [
      { minQty: 1, discount: 0 },
      { minQty: 50, discount: 8 },
      { minQty: 100, discount: 12 }
    ],
    installationDifficulty: "easy",
    estimatedInstallTime: 2,
    wasteFactor: 0.15,
    weight: 0.08,
    alternatives: ["cable-te-1.0-premium"],
    commonlyBoughtWith: ["socket-13a-dp", "switch-1g-2w"]
  },
  {
    id: "cable-te-2.5",
    name: "2.5mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 2.05,
    code: "TE2.5",
    brand: "Generic Trade",
    priceSource: "CEF/Rexel average trade pricing",
    lastUpdated: "2025-01-15",
    confidenceLevel: "high",
    quantityTiers: [
      { minQty: 1, discount: 0 },
      { minQty: 50, discount: 10 },
      { minQty: 100, discount: 15 }
    ],
    installationDifficulty: "easy",
    estimatedInstallTime: 2,
    wasteFactor: 0.15,
    weight: 0.15,
    alternatives: ["cable-te-2.5-premium"],
    commonlyBoughtWith: ["socket-13a-dp", "mcb-20a-b"]
  },
  {
    id: "cable-te-4.0",
    name: "4.0mm² Twin & Earth Cable",
    category: "cables",
    subcategory: "Twin & Earth",
    unit: "metre",
    defaultPrice: 3.25,
    code: "TE4.0",
    brand: "Generic Trade",
    priceSource: "CEF/Rexel average trade pricing",
    lastUpdated: "2025-01-15",
    confidenceLevel: "high",
    quantityTiers: standardQuantityTiers,
    installationDifficulty: "medium",
    estimatedInstallTime: 3,
    wasteFactor: 0.15,
    weight: 0.25,
    alternatives: ["cable-te-4.0-premium"],
    commonlyBoughtWith: ["mcb-32a-b", "rcbo-32a"]
  },

  // Accessories - Enhanced with smart pricing
  {
    id: "socket-13a-dp",
    name: "13A DP Switched Socket",
    category: "accessories",
    subcategory: "Sockets",
    unit: "each",
    defaultPrice: 9.25,
    code: "SKT13DP",
    brand: "MK Logic Plus",
    priceSource: "Wholesaler average Jan 2025",
    lastUpdated: "2025-01-15",
    confidenceLevel: "high",
    quantityTiers: [
      { minQty: 1, discount: 0 },
      { minQty: 10, discount: 5 },
      { minQty: 25, discount: 10 },
      { minQty: 50, discount: 15 }
    ],
    installationDifficulty: "easy",
    estimatedInstallTime: 30,
    wasteFactor: 0.05,
    weight: 0.2,
    alternatives: ["socket-13a-sp", "socket-13a-usb"],
    commonlyBoughtWith: ["cable-te-2.5", "socket-box-1g"]
  },
  {
    id: "socket-13a-usb",
    name: "13A Socket with USB Charging",
    category: "accessories",
    subcategory: "USB Outlets",
    unit: "each",
    defaultPrice: 18.50,
    code: "SKT13USB",
    brand: "MK Logic Plus",
    priceSource: "Wholesaler average Jan 2025",
    lastUpdated: "2025-01-15",
    confidenceLevel: "high",
    quantityTiers: [
      { minQty: 1, discount: 0 },
      { minQty: 5, discount: 5 },
      { minQty: 10, discount: 8 },
      { minQty: 20, discount: 12 }
    ],
    installationDifficulty: "easy",
    estimatedInstallTime: 35,
    wasteFactor: 0.05,
    weight: 0.25,
    alternatives: ["socket-usb-c", "socket-13a-dp"],
    commonlyBoughtWith: ["cable-te-2.5", "socket-box-1g-deep"]
  },

  // Distribution - Enhanced with comprehensive data
  {
    id: "consumer-unit-10w",
    name: "10 Way Consumer Unit (Metal)",
    category: "distribution",
    subcategory: "Consumer Units",
    unit: "each",
    defaultPrice: 125.00,
    code: "CU10W",
    brand: "Hager Design 30",
    priceSource: "CEF/Rexel trade pricing",
    lastUpdated: "2025-01-15",
    confidenceLevel: "high",
    quantityTiers: [
      { minQty: 1, discount: 0 },
      { minQty: 3, discount: 8 },
      { minQty: 5, discount: 12 }
    ],
    installationDifficulty: "hard",
    estimatedInstallTime: 240,
    wasteFactor: 0.02,
    weight: 8.5,
    alternatives: ["consumer-unit-12w", "consumer-unit-8w"],
    commonlyBoughtWith: ["rcd-30ma-63a", "mcb-32a-b", "mcb-6a-b"]
  },
  {
    id: "mcb-32a-b",
    name: "32A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 13.50,
    code: "MCB32B",
    brand: "Hager MTN132",
    priceSource: "Trade wholesaler pricing",
    lastUpdated: "2025-01-15",
    confidenceLevel: "high",
    quantityTiers: [
      { minQty: 1, discount: 0 },
      { minQty: 6, discount: 5 },
      { minQty: 12, discount: 10 },
      { minQty: 24, discount: 15 }
    ],
    installationDifficulty: "easy",
    estimatedInstallTime: 15,
    wasteFactor: 0.02,
    weight: 0.3,
    alternatives: ["mcb-32a-c", "rcbo-32a"],
    commonlyBoughtWith: ["consumer-unit-10w", "cable-te-4.0"]
  },

  // Lighting - Enhanced with LED focus
  {
    id: "led-downlight-fire",
    name: "Fire Rated LED Downlight 10W",
    category: "lighting",
    subcategory: "LED Downlights",
    unit: "each",
    defaultPrice: 25.00,
    code: "LEDFIRE10W",
    brand: "JCC Fireguard",
    priceSource: "Lighting specialist pricing",
    lastUpdated: "2025-01-15",
    confidenceLevel: "medium",
    quantityTiers: [
      { minQty: 1, discount: 0 },
      { minQty: 6, discount: 8 },
      { minQty: 12, discount: 15 },
      { minQty: 24, discount: 20 }
    ],
    installationDifficulty: "medium",
    estimatedInstallTime: 45,
    wasteFactor: 0.08,
    weight: 0.4,
    alternatives: ["led-downlight-12w", "led-downlight-8w"],
    commonlyBoughtWith: ["cable-te-1.5", "switch-1g-2w"]
  }
];

// Smart pricing calculator
export class SmartPricingCalculator {
  static calculatePrice(
    material: EnhancedMaterialItem,
    quantity: number,
    settings: Partial<PricingSettings> = {}
  ) {
    const defaultSettings: PricingSettings = {
      defaultMarkup: 30,
      bulkDiscountThreshold: 50,
      bulkDiscountRate: 10,
      wasteBudgetAllowance: 5,
      regionalMultiplier: 1.0,
      vatRate: 20,
      tradeAccountDiscount: 0,
      lastPriceUpdate: "2025-01-15"
    };

    const config = { ...defaultSettings, ...settings };
    
    // Base price
    let basePrice = material.defaultPrice;
    
    // Apply quantity discounts
    const applicableTier = material.quantityTiers
      ?.filter(tier => quantity >= tier.minQty)
      .sort((a, b) => b.minQty - a.minQty)[0];
    
    if (applicableTier) {
      basePrice *= (1 - applicableTier.discount / 100);
    }
    
    // Apply regional multiplier
    basePrice *= config.regionalMultiplier;
    
    // Apply trade discount
    if (config.tradeAccountDiscount > 0) {
      basePrice *= (1 - config.tradeAccountDiscount / 100);
    }
    
    // Calculate waste
    const wasteQuantity = quantity * material.wasteFactor;
    const totalQuantity = quantity + wasteQuantity;
    
    // Apply markup
    const markedUpPrice = basePrice * (1 + config.defaultMarkup / 100);
    
    // Calculate totals
    const subtotal = markedUpPrice * totalQuantity;
    const vatAmount = subtotal * (config.vatRate / 100);
    const total = subtotal + vatAmount;
    
    return {
      basePrice,
      unitPrice: markedUpPrice,
      quantity: totalQuantity,
      originalQuantity: quantity,
      wasteQuantity,
      subtotal,
      vatAmount,
      total,
      discountApplied: applicableTier?.discount || 0,
      estimatedInstallTime: material.estimatedInstallTime * quantity
    };
  }
  
  static suggestOptimalQuantity(material: EnhancedMaterialItem, requestedQty: number) {
    if (!material.quantityTiers) {
      return { suggested: requestedQty, saving: 0, extraUnits: 0, reason: "" };
    }
    
    // Find the next discount tier
    const nextTier = material.quantityTiers
      .find(tier => tier.minQty > requestedQty && tier.discount > 0);
    
    if (nextTier) {
      const currentCost = this.calculatePrice(material, requestedQty).total;
      const nextTierCost = this.calculatePrice(material, nextTier.minQty).total;
      const extraUnits = nextTier.minQty - requestedQty;
      const costPerExtraUnit = (nextTierCost - currentCost) / extraUnits;
      
      // Suggest if cost per extra unit is reasonable (less than 50% of normal price)
      if (costPerExtraUnit < material.defaultPrice * 0.5) {
        return {
          suggested: nextTier.minQty,
          saving: (material.defaultPrice * requestedQty) - currentCost,
          extraUnits,
          reason: `Buy ${extraUnits} more units for ${nextTier.discount}% discount`
        };
      }
    }
    
    return { suggested: requestedQty, saving: 0, extraUnits: 0, reason: "" };
  }
}

// Popular material combinations for quick adding
export const materialCombinations = {
  "kitchen_rewire": [
    { id: "socket-13a-dp", quantity: 12 },
    { id: "cable-te-2.5", quantity: 80 },
    { id: "mcb-32a-b", quantity: 2 },
    { id: "led-downlight-fire", quantity: 8 }
  ],
  "living_room_lighting": [
    { id: "led-downlight-fire", quantity: 6 },
    { id: "cable-te-1.0", quantity: 30 },
    { id: "switch-1g-2w", quantity: 2 },
    { id: "mcb-6a-b", quantity: 1 }
  ],
  "garage_supply": [
    { id: "cable-te-4.0", quantity: 25 },
    { id: "consumer-unit-10w", quantity: 1 },
    { id: "rcd-30ma-63a", quantity: 1 },
    { id: "mcb-32a-b", quantity: 3 }
  ]
};

export default enhancedMaterials;